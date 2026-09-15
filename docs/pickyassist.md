# Integrazione Picky Assist

Note operative sull'integrazione: come configurarla, come funzionano le API e
quali sono i limiti da tenere presenti.

Documentazione ufficiale: <https://help.pickyassist.com/api-documentation-v2/>

## 1. Configurazione iniziale

1. **Genera il token API** dal pannello Picky Assist: `Settings -> Developers -> API`.
   Una volta creato il token non e' piu' visibile nella piattaforma: copialo subito.
2. Duplica `.env.example` in `.env` e valorizza `PICKY_API_TOKEN`.
3. Imposta `PICKY_DEFAULT_APPLICATION` sul canale che userai (vedi tabella sotto).
   Con piu' canali collegati, o con WhatsApp Cloud API, usa l'id canale che trovi
   in `Settings -> Channels`.
4. Verifica il collegamento: `npm run check`.

## 2. Invio messaggi (Push API)

| | |
|---|---|
| Endpoint | `POST https://app.pickyassist.com/api/v2/push` |
| Host legacy | `POST https://pickyassist.com/app/api/v2/push` |
| Autenticazione | campo `token` **nel body JSON**, non negli header |
| Limite | 90 richieste/minuto per progetto; oltre, HTTP 429 e messaggi scartati |

> **I due host non sono intercambiabili.** Il token e' legato alla versione
> dell'endpoint: un token generato sul pannello V4 funziona su
> `app.pickyassist.com/api/v2` e viene rifiutato con `401 Authentication Failed`
> su `pickyassist.com/app/api/v2` (verificato su un progetto reale). Se ricevi
> un 401 con un token che sai essere corretto, controlla `PICKY_BASE_URL` prima
> di rigenerare il token.

Esempio di payload:

```json
{
  "token": "IL_TUO_TOKEN",
  "application": "8",
  "priority": "0",
  "globalmessage": "Messaggio valido per tutti i destinatari",
  "globalmedia": "https://esempio.it/immagine.jpg",
  "data": [
    { "number": "393331234567", "message": "Testo personalizzato", "reference_number": "ord-42" }
  ]
}
```

Risposta in caso di successo:

```json
{
  "status": 100,
  "push_id": "7478630",
  "message": "Success",
  "data": [{ "msg_id": "9844217", "number": "393331234567", "credit": "0.005" }]
}
```

> **`status: 100` significa "accettato e messo in coda", non "consegnato".**
> La conferma di consegna arriva separatamente tramite Event Webhook
> (delivery report), che qui non e' ancora gestito.

Il `msg_id` restituito e' importante: quando l'utente risponde a quel
messaggio, il webhook lo riporta nel campo `context-msg-id`. E' il modo per
ricostruire il filo della conversazione.

### Formato dei numeri

Prefisso internazionale incluso, **senza** `+`, spazi o zeri iniziali:
`+39 333 123 4567` diventa `393331234567`. `normalizeNumber()` in
`src/client.js` fa la conversione.

## 3. Ricezione messaggi (Global Webhook)

Configurazione nel pannello: `Settings -> Developers -> Webhook -> Global Webhook`.
Va selezionato il **metodo JSON** (il metodo query string e' deprecato dal 2020,
ma questo server lo accetta comunque).

Attenzione: se sono attivi i webhook delle **Smart Replies**, il Global Webhook
non viene innescato.

Payload in arrivo (POST sul tuo endpoint):

```json
{
  "number": "393331234567",
  "name": "Mario",
  "message-in": "buongiorno+a+tutti",
  "message_in_raw": "buongiorno a tutti",
  "type": 1,
  "application": 8,
  "unique-id": "5642",
  "project-id": "27",
  "media-url": "https://esempio.it/foto.jpg",
  "context-msg-id": "30486936",
  "payload": "confirmbutton"
}
```

> `message-in` e' **URL-encoded** (con `+` al posto degli spazi). Quando
> presente, `message_in_raw` contiene gia' il testo in chiaro.
> `parseIncoming()` gestisce entrambi i casi.

### Risposta istantanea

Rispondendo al webhook con un JSON valido, Picky Assist invia subito la
replica senza bisogno di una seconda chiamata alla Push API:

```json
{ "message-out": "Testo della risposta", "delay": "0", "type": "1" }
```

Se la risposta non e' JSON valido, **la replica non viene inviata**.
`message-out` non va URL-encoded.

### Sicurezza

Picky Assist **non firma** le richieste webhook: non esiste un HMAC da
verificare. Le protezioni disponibili sono quindi:

- un segreto condiviso nell'URL (`WEBHOOK_SECRET`), confrontato a tempo costante;
- una lista di IP autorizzati (`WEBHOOK_ALLOWED_IPS`);
- HTTPS obbligatorio sull'endpoint pubblico.

## 4. Tabelle dei codici

### Canali (`application`)

| Codice | Canale |
|---|---|
| 1 | WhatsApp Personal (Phone Automation) |
| 2 | WhatsApp Business (Phone Automation) |
| 3 | SMS (Phone Automation) |
| 4 | Chiamata (Phone Automation) |
| 5 | Facebook Messenger (richiede `messenger_id`) |
| 6 | Telegram (nella doc: "Telegraph") |
| 7 | Web |
| 8 | WhatsApp Official |
| 101 | WhatsApp Cloud API |
| 121 | WhatsApp Business API |

### Tipo di messaggio (`type`)

| Codice | Tipo | Note |
|---|---|---|
| 1 | Testo | |
| 2 | Immagine | |
| 3 | Video | |
| 4 | Audio | `voice: 1` lo invia come nota vocale (solo WhatsApp Web Automation) |
| 5 | Posizione | non supportato in Phone Automation |
| 6 | Documento | |
| 7 | Contatto | non supportato in Phone Automation |
| 9 | Pulsanti interattivi | solo WhatsApp Official |

### Stati e errori (`status`)

| Codice | Significato |
|---|---|
| 100 | Success (accettato, in coda) |
| 101 | Service Unavailable (es. `device-status` senza dispositivo Phone Automation collegato) |
| 401 | Authentication Failed (token errato o assente) |
| 402 | Empty Number List |
| 403 | Insufficient Balance |
| 404 | Unable to Communicate with Your Phone |
| 405 | API Is Not Active For This Plan |
| 406 | Invalid Mobile Number |
| 407 | Message cannot be empty |
| 408 | Project is not Active |
| 409 | Invalid User |
| 410 | Invalid Request |

## 5. Esporre il webhook durante lo sviluppo

Picky Assist deve poter raggiungere il tuo server dall'esterno. In locale serve
un tunnel:

```bash
npx localtunnel --port 3000
# oppure: cloudflared tunnel --url http://localhost:3000
```

L'URL da inserire nel pannello sara' quindi
`https://<tuo-tunnel>/webhook?secret=IL_TUO_SEGRETO`.

Per testare la configurazione c'e' il pulsante **"Test"** nel pannello, che
invia un payload fittizio al tuo endpoint.

## 6. Credito

`check-balance` restituisce il credito residuo del progetto. Con `balance: 0`
gli invii falliscono con `403 Insufficient Balance`: la ricezione dei messaggi
tramite webhook continua invece a funzionare, perche' non consuma credito.

## 7. Cosa non e' ancora coperto

- **Event Webhook**: delivery report, nuovi iscritti, report filtro WhatsApp.
- **Template WhatsApp Official**: `sendTemplate()` c'e', ma non e' stato provato
  su un account reale (serve un template approvato).
- **Gestione media in ingresso**: viene esposto `media-url`, ma il file non
  viene scaricato ne' archiviato.
- **Persistenza**: nessuno stato conversazionale viene salvato.
