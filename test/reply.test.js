import assert from 'node:assert/strict';
import { test } from 'node:test';

import { MESSAGE_TYPE } from '../src/constants.js';
import { contactReply, locationReply, mediaReply, noReply, textReply } from '../src/webhook/reply.js';

test('textReply produce il formato atteso dalla piattaforma', () => {
  assert.deepEqual(textReply('Ciao'), {
    'message-out': 'Ciao',
    delay: '0',
    type: '1',
  });
});

test('textReply accetta delay e reference number', () => {
  const reply = textReply('Ciao', { delay: 5, referenceNumber: 'ord-1' });
  assert.equal(reply.delay, '5');
  assert.equal(reply.reference_number, 'ord-1');
});

test('mediaReply include media-url e tipo', () => {
  const reply = mediaReply('https://example.org/a.jpg', {
    message: 'Ecco la foto',
    type: MESSAGE_TYPE.IMAGE,
  });
  assert.equal(reply['media-url'], 'https://example.org/a.jpg');
  assert.equal(reply['message-out'], 'Ecco la foto');
  assert.equal(reply.type, '2');
});

test('locationReply e contactReply rispettano la struttura documentata', () => {
  const loc = locationReply({ lat: 45.46, long: 9.19, name: 'Milano' });
  assert.equal(loc.type, '5');
  assert.equal(loc.location.lat, 45.46);

  const contact = contactReply({ first_name: 'Mario', phone: '+39 333 1234567' });
  assert.equal(contact.type, '7');
  assert.ok(Array.isArray(contact.contact));
  assert.equal(contact.contact.length, 1);
});

test('noReply restituisce un JSON vuoto valido', () => {
  assert.deepEqual(noReply(), {});
});
