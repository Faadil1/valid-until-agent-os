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
  return normalize({ symbol, book, depth, klines, time });
}

export function normalize({ symbol, book, depth, klines, time }) {
  const bid = Number(book.bidPrice);
  const ask = Number(book.askPrice);
  const mid = (bid + ask) / 2;
  const spreadBps = ((ask - bid) / mid) * 10000;
  const top5BidDepth = depth.bids.slice(0, 5).reduce((s, [p, q]) => s + Number(p) * Number(q), 0);
  const top5AskDepth = depth.asks.slice(0, 5).reduce((s, [p, q]) => s + Number(p) * Number(q), 0);
  const prevClose = Number(klines.at(-2)?.[4] ?? klines.at(-1)?.[1]);
  const lastClose = Number(klines.at(-1)?.[4]);
  const retBps = ((lastClose - prevClose) / prevClose) * 10000;
  const snapshot = {
    snapshot_version: 'valid-until.market.v1',
    symbol,
    server_time_ms: Number(time.serverTime),
    best_bid: round(bid),
    best_ask: round(ask),
    mid: round(mid),
    spread_bps: round(spreadBps),
    top5_bid_depth_usdt: round(top5BidDepth),
    top5_ask_depth_usdt: round(top5AskDepth),
    last_1m_return_bps: round(retBps),
    source: 'Binance Agent OS toolchain: binance-cli → data-api.binance.vision',
  };
  return { snapshot, snapshot_hash: sha256(snapshot) };
}

export function fromFixture(fixture) {
  const snapshot = { ...fixture };
  return { snapshot, snapshot_hash: sha256(snapshot) };
}

function round(n) { return Math.round(n * 1e8) / 1e8; }
