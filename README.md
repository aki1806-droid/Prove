# prove

Integrazione bidirezionale con **Picky Assist**: invio di messaggi tramite Push
API e ricezione dei messaggi in entrata tramite Global Webhook, con risposta
istantanea.

Nessuna dipendenza esterna: gira sul solo runtime Node.js (>= 20.12), usando
`fetch`, `node:http` e `process.loadEnvFile`.

## Avvio rapido

```bash
cp .env.example .env     # poi valorizza PICKY_API_TOKEN
npm run check            # verifica token e credito residuo
npm start                # avvia il server webhook sulla porta 3000
```

Invio di un messaggio di prova:

```bash
npm run send -- 393331234567 "Ciao dal bridge"
```

Test:

```bash
npm test
```

## Struttura

```
src/
  client.js           Client Push API: invio testo, media, bulk, template, saldo
  config.js           Lettura configurazione da .env con validazione
  constants.js        Codici di canale, tipo messaggio, stato ed errore
  handlers.js         Logica di risposta ai messaggi in entrata  <- da personalizzare
  index.js            Avvio del server webhook
  webhook/
    parse.js          Normalizzazione del payload in entrata
    reply.js          Costruzione delle risposte istantanee
    server.js         Server HTTP con segreto condiviso e IP allowlist
scripts/
  check-connection.mjs   Verifica il collegamento (nessun messaggio inviato)
  send-test-message.mjs  Invia un messaggio di prova
docs/
  pickyassist.md      Note operative, tabelle dei codici, limiti noti
```

## Come funziona

**In uscita** — il token viaggia nel body JSON, non negli header:

```js
import { createClient } from './src/client.js';

const client = createClient(config);
await client.sendText({ to: '+39 333 1234567', message: 'Ciao!' });
```

Il client normalizza i numeri, ritenta sugli errori di rete e sui 429, e
mantiene le chiamate sotto il limite di 90 richieste/minuto imposto dalla
piattaforma.

**In entrata** — la logica applicativa sta in `src/handlers.js`. Il valore
restituito diventa la risposta istantanea inviata all'utente:

```js
if (message.text.trim().toLowerCase() === 'ping') {
  return textReply('pong');
}
```

## Sicurezza

Picky Assist non firma le richieste webhook. Proteggi l'endpoint con
`WEBHOOK_SECRET` (e, se possibile, `WEBHOOK_ALLOWED_IPS`) prima di esporlo su
internet, e servilo solo via HTTPS. Il file `.env` non va committato: e' gia'
escluso dal `.gitignore`.

## Documentazione

Dettagli su endpoint, formati e limiti: [`docs/pickyassist.md`](docs/pickyassist.md).
Documentazione ufficiale: <https://help.pickyassist.com/api-documentation-v2/>

## Come si lavora

- Il branch principale è `main`.
- Ogni modifica in un branch dedicato, poi pull request su `main`.
