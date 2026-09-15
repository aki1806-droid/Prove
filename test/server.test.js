import assert from 'node:assert/strict';
import { after, test } from 'node:test';

import { createWebhookServer } from '../src/webhook/server.js';
import { textReply } from '../src/webhook/reply.js';

const silentLogger = { info() {}, warn() {}, error() {} };

const baseConfig = {
  webhookPath: '/webhook',
  webhookSecret: '',
  allowedIps: [],
  logRawPayload: false,
};

const servers = [];

/** Avvia un server su porta effimera e restituisce la sua base URL. */
async function start(handler, overrides = {}) {
  const server = createWebhookServer({
    handler,
    config: { ...baseConfig, ...overrides },
    logger: silentLogger,
  });
  servers.push(server);
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const { port } = server.address();
  return `http://127.0.0.1:${port}`;
}

after(() => {
  for (const server of servers) server.close();
});

test('un messaggio JSON viene consegnato all handler e la replica torna al chiamante', async () => {
  const ricevuti = [];
  const url = await start(async (message) => {
    ricevuti.push(message);
    return textReply(`ciao ${message.name}`);
  });

  const response = await fetch(`${url}/webhook`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      number: '393331234567',
      name: 'Mario',
      'message-in': 'buongiorno+a+tutti',
      type: 1,
      application: 8,
      'unique-id': '99',
    }),
  });

  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), {
    'message-out': 'ciao Mario',
    delay: '0',
    type: '1',
  });
  assert.equal(ricevuti[0].text, 'buongiorno a tutti');
  assert.equal(ricevuti[0].number, '393331234567');
});

test('il metodo query string (deprecato) viene comunque interpretato', async () => {
  let ricevuto;
  const url = await start(async (message) => {
    ricevuto = message;
    return null;
  });

  const response = await fetch(
    `${url}/webhook?number=963587413&message-in=test&type=1&application=1&unique-id=5672`,
    { method: 'POST' },
  );

  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), {}, 'senza replica si risponde con JSON vuoto');
  assert.equal(ricevuto.text, 'test');
  assert.equal(ricevuto.number, '963587413');
});

test('i body form-urlencoded vengono interpretati', async () => {
  let ricevuto;
  const url = await start(async (message) => {
    ricevuto = message;
    return null;
  });

  await fetch(`${url}/webhook`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ number: '1234567', 'message-in': 'ciao%20mondo' }).toString(),
  });

  assert.equal(ricevuto.text, 'ciao mondo');
});

test('senza il segreto corretto la richiesta viene respinta', async () => {
  let chiamato = false;
  const url = await start(
    async () => {
      chiamato = true;
      return null;
    },
    { webhookSecret: 'abc123' },
  );

  const senzaSegreto = await fetch(`${url}/webhook`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: '{"number":"1"}',
  });
  assert.equal(senzaSegreto.status, 401);

  const sbagliato = await fetch(`${url}/webhook?secret=xxx`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: '{"number":"1"}',
  });
  assert.equal(sbagliato.status, 401);
  assert.equal(chiamato, false);

  const corretto = await fetch(`${url}/webhook?secret=abc123`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: '{"number":"1"}',
  });
  assert.equal(corretto.status, 200);
  assert.equal(chiamato, true);
});

test('il segreto puo viaggiare anche come header', async () => {
  const url = await start(async () => null, { webhookSecret: 'abc123' });

  const response = await fetch(`${url}/webhook`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Webhook-Secret': 'abc123' },
    body: '{"number":"1"}',
  });
  assert.equal(response.status, 200);
});

test('il segreto non finisce nei dati passati all handler', async () => {
  let ricevuto;
  const url = await start(
    async (_message, raw) => {
      ricevuto = raw;
      return null;
    },
    { webhookSecret: 'abc123' },
  );

  await fetch(`${url}/webhook?secret=abc123&number=1`, { method: 'POST' });
  assert.equal(ricevuto.secret, undefined);
  assert.equal(ricevuto.number, '1');
});

test('GET e percorsi sconosciuti non attivano l handler', async () => {
  let chiamato = false;
  const url = await start(async () => {
    chiamato = true;
    return null;
  });

  assert.equal((await fetch(`${url}/webhook`)).status, 405);
  assert.equal((await fetch(`${url}/altro`, { method: 'POST' })).status, 404);
  assert.equal(chiamato, false);
});

test('/health risponde senza autenticazione', async () => {
  const url = await start(async () => null, { webhookSecret: 'abc123' });
  const response = await fetch(`${url}/health`);
  assert.equal(response.status, 200);
  assert.equal((await response.json()).status, 'ok');
});

test('un errore nell handler non fa fallire la consegna del webhook', async () => {
  const url = await start(async () => {
    throw new Error('boom');
  });

  const response = await fetch(`${url}/webhook`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: '{"number":"1"}',
  });

  assert.equal(response.status, 200, 'si risponde 200 per non innescare retry a raffica');
  assert.deepEqual(await response.json(), {});
});

test('un JSON malformato produce 400 senza invocare l handler', async () => {
  let chiamato = false;
  const url = await start(async () => {
    chiamato = true;
    return null;
  });

  const response = await fetch(`${url}/webhook`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: '{non-json',
  });

  assert.equal(response.status, 400);
  assert.equal(chiamato, false);
});

test('la lista di IP autorizzati blocca le altre origini', async () => {
  const url = await start(async () => null, { allowedIps: ['10.0.0.1'] });
  const response = await fetch(`${url}/webhook`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: '{"number":"1"}',
  });
  assert.equal(response.status, 403);
});
