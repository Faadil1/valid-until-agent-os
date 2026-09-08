import assert from 'node:assert/strict';
import { executeAllowedTestnetBuy, TESTNET_BASE } from '../src/testnet-executor.mjs';

const action = { symbol: 'BTCUSDT', side: 'BUY', notional_usdt: 10 };

let calls = [];
const fakeRunner = (args) => {
  calls.push(args);
  if (args[1] === 'POST') {
    return {
      symbol: 'BTCUSDT',
      orderId: 123,
      clientOrderId: args[args.indexOf('--newClientOrderId') + 1],
      status: 'FILLED',
      executedQty: '0.0001',
      cummulativeQuoteQty: '10.00',
      side: 'BUY',
      type: 'MARKET',
    };
  }
  return {
    symbol: 'BTCUSDT',
    orderId: 123,
    clientOrderId: args[args.indexOf('--origClientOrderId') + 1],
    status: 'FILLED',
    executedQty: '0.0001',
    cummulativeQuoteQty: '10.00',
    side: 'BUY',
    type: 'MARKET',
  };
};

const blocked = executeAllowedTestnetBuy({
  validityResult: { status: 'BLOCK' },
  action,
  confirmation: 'CONFIRM_TESTNET_WRITE',
  runner: fakeRunner,
});
assert.equal(blocked.order_sent, false);
assert.equal(blocked.execution_status, 'NOT_SENT');
assert.equal(calls.length, 0, 'BLOCK must never call Binance CLI');

assert.throws(() => executeAllowedTestnetBuy({
  validityResult: { status: 'ALLOW' },
  action,
  confirmation: 'NO',
  runner: fakeRunner,
}), /CONFIRM_TESTNET_WRITE/);
assert.equal(calls.length, 0);

const envAuthAllowed = executeAllowedTestnetBuy({
  validityResult: { status: 'ALLOW' },
  action,
  confirmation: 'CONFIRM_TESTNET_WRITE',
  runner: fakeRunner,
});
assert.equal(envAuthAllowed.order_sent, true);
assert.equal(envAuthAllowed.execution_status, 'TESTNET_ORDER_SENT_AND_QUERIED');
assert.equal(calls.length, 2);
assert.ok(calls.every((args) => args.some((value) => String(value).startsWith(TESTNET_BASE))));
assert.ok(calls.every((args) => !args.some((value) => String(value).includes('api.binance.com'))));
assert.ok(calls.every((args) => !args.includes('--profile')));
assert.ok(calls[0].includes('--signed'));
assert.ok(calls[0].includes('--quoteOrderQty'));
assert.equal(envAuthAllowed.order_response.status, 'FILLED');
assert.equal(envAuthAllowed.verification_response.status, 'FILLED');

calls = [];
const profileAllowed = executeAllowedTestnetBuy({
  validityResult: { status: 'ALLOW' },
  action,
  profile: 'demo-testnet',
  confirmation: 'CONFIRM_TESTNET_WRITE',
  runner: fakeRunner,
});
assert.equal(profileAllowed.order_sent, true);
assert.equal(calls.length, 2);
assert.ok(calls.every((args) => args.includes('--profile')));
assert.ok(calls.every((args) => args.includes('demo-testnet')));

assert.throws(() => executeAllowedTestnetBuy({
  validityResult: { status: 'ALLOW' },
  action: { ...action, side: 'SELL' },
  confirmation: 'CONFIRM_TESTNET_WRITE',
  runner: fakeRunner,
}), /BUY actions only/);

assert.throws(() => executeAllowedTestnetBuy({
  validityResult: { status: 'ALLOW' },
  action: { ...action, notional_usdt: 26 },
  confirmation: 'CONFIRM_TESTNET_WRITE',
  runner: fakeRunner,
}), /hard-capped at 25/);

console.log('PASS testnet execution boundary 7/7');
