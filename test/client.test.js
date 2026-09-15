import assert from 'node:assert/strict';
import { test } from 'node:test';

import { PickyAssistClient, PickyAssistError, normalizeNumber } from '../src/client.js';

/** fetch finto: registra le chiamate e restituisce risposte pilotate. */
function fakeFetch(responses) {
  const calls = [];
  const queue = Array.isArray(responses) ? [...responses] : [responses];
  const impl = async (url, options) => {
    calls.push({ url, options, body: JSON.parse(options.body) });
    const next = queue.length > 1 ? queue.shift() : queue[0];
    if (next instanceof Error) throw next;
    return {
      status: next.httpStatus ?? 200,
      text: async () => JSON.stringify(next.body),
    };
  };
  impl.calls = calls;
  return impl;
}

const okResponse = { body: { status: 100, push_id: '7478630', message: 'Success', data: [] } };

test('normalizeNumber ripulisce il numero nel formato richiesto', () => {
  assert.equal(normalizeNumber('+39 333 123 4567'), '393331234567');
  assert.equal(normalizeNumber('0039-333-1234567'), '393331234567');
  assert.equal(normalizeNumber(393331234567), '393331234567');
});

test('normalizeNumber rifiuta numeri troppo corti o mancanti', () => {
  assert.throws(() => normalizeNumber('123'), PickyAssistError);
  assert.throws(() => normalizeNumber(undefined), PickyAssistError);
});

test('il token viaggia nel body JSON, non negli header', async () => {
  const fetchImpl = fakeFetch(okResponse);
  const client = new PickyAssistClient({ token: 'segreto', fetchImpl });

  await client.sendText({ to: '+39 333 1234567', message: 'ciao' });

  const [call] = fetchImpl.calls;
  assert.equal(call.url, 'https://app.pickyassist.com/api/v2/push');
  assert.equal(call.body.token, 'segreto');
  assert.equal(call.options.headers['Content-Type'], 'application/json');
  assert.equal(call.options.headers.Authorization, undefined);
});

test('sendText costruisce il payload della Push API', async () => {
  const fetchImpl = fakeFetch(okResponse);
  const client = new PickyAssistClient({ token: 't', application: 8, fetchImpl });

  const result = await client.sendText({
    to: '393331234567',
    message: 'ciao',
    referenceNumber: 'ord-42',
  });

  const { body } = fetchImpl.calls[0];
  assert.equal(body.application, 8);
  assert.equal(body.priority, 0);
  assert.deepEqual(body.data, [
    { number: '393331234567', message: 'ciao', reference_number: 'ord-42' },
  ]);
  assert.equal(result.push_id, '7478630');
});

test('sendText rifiuta un messaggio vuoto senza chiamare la rete', async () => {
  const fetchImpl = fakeFetch(okResponse);
  const client = new PickyAssistClient({ token: 't', fetchImpl });

  await assert.rejects(() => client.sendText({ to: '393331234567', message: '  ' }), PickyAssistError);
  assert.equal(fetchImpl.calls.length, 0);
});

test('sendBulk accetta numeri semplici con messaggio globale', async () => {
  const fetchImpl = fakeFetch(okResponse);
  const client = new PickyAssistClient({ token: 't', fetchImpl });

  await client.sendBulk({
    recipients: ['+39 333 1234567', { to: '393339999999', message: 'personalizzato' }],
    globalMessage: 'avviso generale',
  });

  const { body } = fetchImpl.calls[0];
  assert.equal(body.globalmessage, 'avviso generale');
  assert.equal(body.data[0].number, '393331234567');
  assert.equal(body.data[0].message, undefined);
  assert.equal(body.data[1].message, 'personalizzato');
});

test('sendBulk pretende un testo globale o personalizzato', async () => {
  const fetchImpl = fakeFetch(okResponse);
  const client = new PickyAssistClient({ token: 't', fetchImpl });

  await assert.rejects(
    () => client.sendBulk({ recipients: ['393331234567'] }),
    /globalMessage/,
  );
});

test('uno status diverso da 100 diventa un errore parlante', async () => {
  const fetchImpl = fakeFetch({ body: { status: 403, message: 'Insufficient Balance' } });
  const client = new PickyAssistClient({ token: 't', fetchImpl, maxRetries: 0 });

  await assert.rejects(
    () => client.sendText({ to: '393331234567', message: 'ciao' }),
    (error) => {
      assert.ok(error instanceof PickyAssistError);
      assert.equal(error.status, 403);
      assert.match(error.message, /Insufficient Balance/);
      return true;
    },
  );
  assert.equal(fetchImpl.calls.length, 1, 'gli errori applicativi non si ritentano');
});

test('il 429 viene ritentato e poi propagato', async () => {
  const fetchImpl = fakeFetch({ httpStatus: 429, body: { status: 429, message: 'Too Many Requests' } });
  const client = new PickyAssistClient({ token: 't', fetchImpl, maxRetries: 1 });

  await assert.rejects(
    () => client.sendText({ to: '393331234567', message: 'ciao' }),
    /Rate limit/,
  );
  assert.equal(fetchImpl.calls.length, 2);
});

test('checkBalance usa l endpoint dedicato', async () => {
  const fetchImpl = fakeFetch({ body: { status: 100, message: 'Success', balance: '12.50' } });
  const client = new PickyAssistClient({ token: 't', fetchImpl });

  const result = await client.checkBalance();
  assert.equal(fetchImpl.calls[0].url, 'https://app.pickyassist.com/api/v2/check-balance');
  assert.equal(result.balance, '12.50');
});

test('deviceStatus resta sull host configurato', async () => {
  const fetchImpl = fakeFetch({ body: { status: 100, message: 'Success' } });
  const client = new PickyAssistClient({ token: 't', fetchImpl });

  await client.deviceStatus();
  assert.equal(fetchImpl.calls[0].url, 'https://app.pickyassist.com/api/v2/device-status');
});

test('deviceStatus accetta un host alternativo e poi ripristina la base url', async () => {
  const fetchImpl = fakeFetch({ body: { status: 100, message: 'Success' } });
  const client = new PickyAssistClient({ token: 't', fetchImpl });

  await client.deviceStatus({ baseUrl: 'https://pickyassist.com/app/api/v2' });
  assert.equal(fetchImpl.calls[0].url, 'https://pickyassist.com/app/api/v2/device-status');
  assert.equal(client.baseUrl, 'https://app.pickyassist.com/api/v2', 'la base url originale viene ripristinata');
});

test('il rate limiter interno non blocca sotto soglia', async () => {
  const fetchImpl = fakeFetch(okResponse);
  const client = new PickyAssistClient({ token: 't', fetchImpl, rateLimitPerMinute: 5 });

  const started = Date.now();
  for (let i = 0; i < 5; i += 1) {
    await client.sendText({ to: '393331234567', message: `m${i}` });
  }
  assert.ok(Date.now() - started < 1000);
  assert.equal(fetchImpl.calls.length, 5);
});

test('un client senza token non si crea', () => {
  assert.throws(() => new PickyAssistClient({}), PickyAssistError);
});
