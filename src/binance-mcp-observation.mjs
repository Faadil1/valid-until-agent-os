import { normalize } from './snapshot.mjs';

/**
 * Convert host-supplied Binance Agent OS MCP market observations into the
 * canonical Valid Until market snapshot. This module performs no network I/O.
 *
 * Expected input is an evidence packet assembled by the host agent from
 * read-only Binance market tools. The packet deliberately uses generic field
 * names rather than coupling Valid Until to one changing MCP tool name.
 */
export function normalizeBinanceMcpObservation(packet) {
  if (!packet || typeof packet !== 'object' || Array.isArray(packet)) {
    throw new Error('MCP observation packet must be an object');
  }

  const symbol = string(packet.symbol, 'symbol').toUpperCase();
  const book = object(packet.book ?? packet.bookTicker, 'book');
  const depth = object(packet.depth, 'depth');
  const klines = array(packet.klines, 'klines');
  const time = normalizeTime(packet.server_time ?? packet.time ?? packet.serverTime);

  const canonicalBook = {
    bidPrice: first(book.bidPrice, book.bid_price, book.bestBid, book.best_bid),
    askPrice: first(book.askPrice, book.ask_price, book.bestAsk, book.best_ask),
  };

  const canonicalDepth = {
    bids: normalizeDepthRows(depth.bids, 'bids'),
    asks: normalizeDepthRows(depth.asks, 'asks'),
  };

  const canonicalKlines = normalizeKlines(klines);

  return normalize({
    symbol,
    book: canonicalBook,
    depth: canonicalDepth,
    klines: canonicalKlines,
    time,
    source: 'Binance Agent OS MCP: host-supplied read-only market observation',
  });
}

function normalizeTime(value) {
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    return { serverTime: first(value.serverTime, value.server_time, value.server_time_ms, value.timestamp) };
  }
  return { serverTime: value };
}

function normalizeDepthRows(rows, label) {
  const value = array(rows, label);
  if (!value.length) throw new Error(`${label} must not be empty`);
  return value.map((row, index) => {
    if (Array.isArray(row)) {
      if (row.length < 2) throw new Error(`${label}[${index}] requires price and quantity`);
      return [row[0], row[1]];
    }
    if (row && typeof row === 'object') {
      return [first(row.price, row.p), first(row.quantity, row.qty, row.q)];
    }
    throw new Error(`${label}[${index}] must be an array or object`);
  });
}

function normalizeKlines(rows) {
  if (rows.length < 2) throw new Error('klines requires at least two bars');
  return rows.map((row, index) => {
    if (Array.isArray(row)) {
      if (row.length < 5) throw new Error(`klines[${index}] requires close at index 4`);
      return row;
    }
    if (row && typeof row === 'object') {
      const open = first(row.open, row.o, row.close, row.c);
      const close = first(row.close, row.c);
      return [
        first(row.openTime, row.open_time, row.t, 0),
        open,
        first(row.high, row.h, open),
        first(row.low, row.l, open),
        close,
      ];
    }
    throw new Error(`klines[${index}] must be an array or object`);
  });
}

function first(...values) {
  for (const value of values) {
    if (value !== undefined && value !== null && value !== '') return value;
  }
  return undefined;
}

function object(value, label) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error(`${label} must be an object`);
  return value;
}

function array(value, label) {
  if (!Array.isArray(value)) throw new Error(`${label} must be an array`);
  return value;
}

function string(value, label) {
  if (typeof value !== 'string' || !value.trim()) throw new Error(`${label} must be a non-empty string`);
  return value.trim();
}
