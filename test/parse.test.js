import assert from 'node:assert/strict';
import { test } from 'node:test';

import { APPLICATION, MESSAGE_TYPE } from '../src/constants.js';
import { decodeMessage, hasMedia, isFromGroup, parseIncoming, senderId } from '../src/webhook/parse.js';

test('decodeMessage decodifica il percent-encoding e i "+" come spazi', () => {
  assert.equal(decodeMessage('Not+Sure'), 'Not Sure');
  assert.equal(decodeMessage('ciao%20mondo'), 'ciao mondo');
  assert.equal(decodeMessage('perch%C3%A9+no'), 'perché no');
  assert.equal(decodeMessage(''), '');
  assert.equal(decodeMessage(undefined), '');
});

test('decodeMessage non esplode su percent-encoding malformato', () => {
  assert.equal(decodeMessage('100%+sicuro'), '100% sicuro');
});

test('parseIncoming normalizza un messaggio di testo con media', () => {
  const message = parseIncoming({
    number: '963587413',
    'message-in': 'test',
    type: '2',
    application: '1',
    'unique-id': '5642',
    'project-id': '27',
    'media-url': 'https://example.org/foto.jpg',
    'custom-variable': 'test',
  });

  assert.equal(message.number, '963587413');
  assert.equal(message.text, 'test');
  assert.equal(message.type, MESSAGE_TYPE.IMAGE);
  assert.equal(message.application, APPLICATION.WHATSAPP_PERSONAL);
  assert.equal(message.uniqueId, '5642');
  assert.equal(message.projectId, '27');
  assert.equal(message.mediaUrl, 'https://example.org/foto.jpg');
  assert.equal(message.raw['custom-variable'], 'test', 'i campi custom restano accessibili in raw');
  assert.ok(hasMedia(message));
});

test('parseIncoming preferisce message_in_raw quando presente', () => {
  const message = parseIncoming({
    number: '91940055074',
    'message-in': 'Not+Sure',
    message_in_raw: 'Not Sure',
    type: 9,
    application: '8',
    'context-msg-id': '30486936',
    payload: 'confirmbutton',
  });

  assert.equal(message.text, 'Not Sure');
  assert.equal(message.contextMsgId, '30486936');
  assert.equal(message.payload, 'confirmbutton');
  assert.equal(message.type, MESSAGE_TYPE.INTERACTIVE);
});

test('parseIncoming legge i pulsanti interattivi', () => {
  const message = parseIncoming({
    number: '93436707768',
    'message-in': 'choice1',
    type: 1,
    application: 8,
    interactive: { type: 1, id: 'ref1', description: 'choice description1' },
  });

  assert.deepEqual(message.interactive, { type: 1, id: 'ref1', description: 'choice description1' });
});

test('parseIncoming accetta location sia minuscola sia maiuscola', () => {
  const lower = parseIncoming({ number: '1', location: { lat: 1, long: 2 } });
  const upper = parseIncoming({ number: '1', Location: { lat: 1, long: 2 } });
  assert.deepEqual(lower.location, { lat: 1, long: 2 });
  assert.deepEqual(upper.location, { lat: 1, long: 2 });
});

test('parseIncoming normalizza i contatti sempre come array', () => {
  const singolo = parseIncoming({ number: '1', contact: { first_name: 'Test' } });
  const multipli = parseIncoming({ number: '1', contact: [{ first_name: 'A' }, { first_name: 'B' }] });
  const nessuno = parseIncoming({ number: '1' });

  assert.equal(singolo.contacts.length, 1);
  assert.equal(multipli.contacts.length, 2);
  assert.deepEqual(nessuno.contacts, []);
});

test('senderId usa messenger_id sul canale Facebook e il numero altrove', () => {
  const messenger = parseIncoming({ messenger_id: '123', application: APPLICATION.FACEBOOK_MESSENGER });
  const whatsapp = parseIncoming({ number: '393331234567', application: APPLICATION.WHATSAPP_OFFICIAL });

  assert.equal(senderId(messenger), '123');
  assert.equal(senderId(whatsapp), '393331234567');
});

test('isFromGroup riconosce i messaggi di gruppo', () => {
  assert.ok(isFromGroup(parseIncoming({ number: '1', 'group-id': 'abc' })));
  assert.ok(!isFromGroup(parseIncoming({ number: '1' })));
});
