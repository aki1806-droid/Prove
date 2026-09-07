# prove

Bridge tra **WhatsApp Cloud API** e **Claude**: riceve i messaggi dei clienti su
un numero WhatsApp Business, genera la risposta con l'API Anthropic e la
rimanda in chat.

È pensato per un bot **di business** (assistenza, FAQ, stato ordini,
prenotazioni). Non è un assistente AI generico su WhatsApp: dal 15 gennaio 2026
i termini di Meta lo vietano. Il dettaglio è in
[`docs/whatsapp-setup.md`](docs/whatsapp-setup.md).

## Avvio rapido

```bash
npm install
npm run setup             # procedura guidata: chiede le credenziali e le verifica
npm run dev               # servizio su :3000
ngrok http 3000           # URL HTTPS per il webhook di Meta
```

`npm run setup` chiede una credenziale alla volta dicendo dove trovarla, la
verifica contro il servizio reale e scrive il `.env`. Se qualcosa non torna,
`npm run doctor` ricontrolla tutto e dice cosa correggere.

Poi registra `https://<tuo-host>/webhook` nel pannello Meta e sottoscrivi il
campo `messages`.

**Se non hai mai usato un terminale**, parti da [`GUIDA.md`](GUIDA.md): stessa
procedura spiegata clic per clic, senza dare niente per scontato. I dettagli
tecnici lato Meta sono in [`docs/whatsapp-setup.md`](docs/whatsapp-setup.md).

## Come funziona

```
WhatsApp  ──►  POST /webhook  ──►  verifica firma HMAC
                                      │
                                      ├─► 200 immediato (Meta non riconsegna)
                                      │
                                      └─► deduplica id  ──►  coda per contatto
                                                                  │
                                            storico ◄─────────────┤
                                                                  ▼
                                                          Messages API
                                                                  │
                                            Graph API  ◄──────────┘
```

Quattro scelte che vale la pena conoscere:

- **La firma si verifica sul body grezzo.** Riserializzare il JSON già parsato
  cambia spazi e ordine delle chiavi, e la firma non torna. Un `403` qui è
  quasi sempre `WHATSAPP_APP_SECRET` sbagliato.
- **Si risponde `200` prima di elaborare.** Meta riconsegna l'evento se
  l'endpoint tarda; la deduplica sugli id copre le riconsegne già partite.
- **I messaggi dello stesso contatto sono serializzati.** Due righe scritte di
  fila devono vedere lo stesso storico, in ordine. Contatti diversi procedono
  in parallelo.
- **Un turno fallito non entra nello storico.** Altrimenti il turno successivo
  leggerebbe una domanda rimasta senza risposta.

## Struttura

```
src/
├── index.ts              avvio, wiring, pulizia periodica, shutdown
├── config.ts             lettura e validazione dell'ambiente
├── server.ts             endpoint HTTP (/webhook, /health)
├── handler.ts            orchestrazione messaggio -> risposta
├── claude.ts             chiamata alla Messages API
├── conversation.ts       storico per contatto (in memoria, con TTL)
├── ttl-set.ts            deduplica degli id dei webhook
├── env.ts                caricamento del file .env
├── whatsapp/
│   ├── signature.ts      verifica X-Hub-Signature-256
│   ├── parse.ts          estrazione dei messaggi dal payload
│   ├── client.ts         invio via Graph API
│   └── types.ts          forma del payload webhook
└── setup/
    ├── wizard.ts         procedura guidata (npm run setup)
    ├── doctor.ts         diagnostica (npm run doctor)
    ├── validators.ts     verifiche delle credenziali e traduzione degli errori
    ├── env-file.ts       generazione del file .env
    └── ui.ts             colori a terminale
```

## Comandi

| Comando | Cosa fa |
|---|---|
| `npm run setup` | Procedura guidata: raccoglie e verifica le credenziali, scrive `.env`. |
| `npm run doctor` | Diagnostica: ricontrolla le credenziali e spiega cosa non va. |
| `npm run doctor -- --messaggio <numero>` | Invia un messaggio di prova per validare la catena in uscita. |
| `npm run dev` | Avvio in watch mode. |
| `npm test` | Suite vitest (79 test). |
| `npm run typecheck` | `tsc --noEmit` su sorgenti e test. |
| `npm run build` | Compila in `dist/`. |
| `npm start` | Esegue il build compilato. |

## Personalizzare il bot

Il comportamento vive quasi tutto nel prompt di sistema, in `src/config.ts`
(`DEFAULT_SYSTEM_PROMPT`) oppure sovrascritto da `CLAUDE_SYSTEM_PROMPT`. Il
default è volutamente generico: va riempito con i dati della tua attività —
orari, politica di reso, cosa il bot **non** deve promettere, quando passare
a un operatore umano.

Se ci agganci una base di conoscenza corposa (listino, FAQ), il prompt di
sistema supera la soglia minima di caching e il `cache_control` già impostato
in `src/claude.ts` inizia a ripagare, abbattendo il costo dei turni successivi.

## Limiti noti

- **Solo testo.** Immagini, audio e documenti ricevono una risposta di cortesia
  senza passare dal modello.
- **Stato in memoria.** Al riavvio le conversazioni ripartono; con più repliche
  ogni istanza ha il suo stato. `ConversationStore` è un'interfaccia proprio per
  poter passare a Redis senza toccare il resto.
- **Nessun rate limiting applicativo.** Un contatto può scrivere quanto vuole e
  ogni messaggio è una chiamata all'API a pagamento.
- **Nessun invio proattivo.** Si risponde solo a messaggi in arrivo. Scrivere
  per primi, o dopo 24 ore di silenzio, richiede i template approvati da Meta.
