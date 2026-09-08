import { execFileSync } from 'node:child_process';
import { sha256 } from './canonical.mjs';

function runBinanceCli(args) {
  try {
    const out = execFileSync('binance-cli', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
    return JSON.parse(out);
  } catch (err) {
    const stderr = err?.stderr?.toString?.() || err.message;
    throw new Error(`binance-cli failed: ${stderr.trim()}`);
  }
}

export function captureWithBinanceCli(symbol) {
  const base = 'https://data-api.binance.vision';
  const book = runBinanceCli(['request', 'GET', `${base}/api/v3/ticker/bookTicker`, '--symbol', symbol]);
  const depth = runBinanceCli(['request', 'GET', `${base}/api/v3/depth`, '--symbol', symbol, '--limit', '5']);
  const klines = runBinanceCli(['request', 'GET', `${base}/api/v3/klines`, '--symbol', symbol, '--interval', '1m', '--limit', '2']);
  const time = runBinanceCli(['request', 'GET', `${base}/api/v3/time`]);
  return normalize({
    symbol,
    book,
    depth,
    klines,
    time,
    source: 'Binance Agent OS toolchain: binance-cli → data-api.binance.vision',
  });
}

export function normalize({ symbol, book, depth, klines, time, source = 'Binance market observation' }) {
  if (!symbol || typeof symbol !== 'string') throw new Error('symbol is required');
  if (!book || !depth || !Array.isArray(klines) || !time) throw new Error('book, depth, klines and time are required');
  if (!Array.isArray(depth.bids) || !Array.isArray(depth.asks)) throw new Error('depth bids/asks are required');
  if (depth.bids.length < 1 || depth.asks.length < 1) throw new Error('depth must contain bids and asks');
  if (klines.length < 2) throw new Error('at least two klines are required');

  const bid = finite(book.bidPrice, 'book.bidPrice');
  const ask = finite(book.askPrice, 'book.askPrice');
  const serverTime = finite(time.serverTime, 'time.serverTime');
  if (bid <= 0 || ask <= 0 || ask < bid) throw new Error('invalid bid/ask');

  const mid = (bid + ask) / 2;
  const spreadBps = ((ask - bid) / mid) * 10000;
  const top5BidDepth = depth.bids.slice(0, 5).reduce((s, row) => s + depthNotional(row, 'bid'), 0);
  const top5AskDepth = depth.asks.slice(0, 5).reduce((s, row) => s + depthNotional(row, 'ask'), 0);
  const prevClose = finite(klines.at(-2)?.[4] ?? klines.at(-1)?.[1], 'previous close');
  const lastClose = finite(klines.at(-1)?.[4], 'last close');
  if (prevClose <= 0 || lastClose <= 0) throw new Error('invalid kline close');
  const retBps = ((lastClose - prevClose) / prevClose) * 10000;
  const snapshot = {
    snapshot_version: 'valid-until.market.v1',
    symbol: symbol.toUpperCase(),
    server_time_ms: serverTime,
    best_bid: round(bid),
    best_ask: round(ask),
    mid: round(mid),
    spread_bps: round(spreadBps),
    top5_bid_depth_usdt: round(top5BidDepth),
    top5_ask_depth_usdt: round(top5AskDepth),
    last_1m_return_bps: round(retBps),
    source,
  };
  return { snapshot, snapshot_hash: sha256(snapshot) };
}

export function fromFixture(fixture) {
  const snapshot = { ...fixture };
  return { snapshot, snapshot_hash: sha256(snapshot) };
}

function finite(value, label) {
  const number = Number(value);
  if (!Number.isFinite(number)) throw new Error(`${label} must be finite`);
  return number;
}

function depthNotional(row, side) {
  if (!Array.isArray(row) || row.length < 2) throw new Error(`invalid ${side} depth row`);
  const price = finite(row[0], `${side} depth price`);
  const qty = finite(row[1], `${side} depth quantity`);
  if (price < 0 || qty < 0) throw new Error(`invalid ${side} depth value`);
  return price * qty;
}

function round(n) { return Math.round(n * 1e8) / 1e8; }
