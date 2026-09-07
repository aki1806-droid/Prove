# Collegare il bot a WhatsApp

Guida ai passi da fare lato Meta. Il codice di questo repo è già pronto: qui si
tratta di ottenere le quattro credenziali che finiscono in `.env` e di puntare
il webhook al servizio.

## 0. Prima di iniziare: la policy AI di WhatsApp

Dal **15 gennaio 2026** i termini della WhatsApp Business Solution vietano di
usare la piattaforma per offrire **assistenti AI general-purpose**, cioè quando
l'LLM con cui si chatta liberamente *è* il servizio (è il motivo per cui ChatGPT
e Perplexity sono usciti da WhatsApp).

Restano pienamente permessi i bot che usano l'AI per compiti di business
strutturati: assistenza clienti, FAQ, stato ordini, prenotazioni, notifiche.
È il caso d'uso per cui questo progetto è scritto, e il prompt di sistema di
default lo riflette (ambito ristretto, passaggio a operatore umano quando serve).

Il crinale pratico: il bot deve rispondere **per la tua attività**, non essere
un Claude generico raggiungibile via WhatsApp. Se allarghi il prompt fino a
farne un assistente tuttofare, esci dalla policy e rischi la disattivazione del
numero.

## 1. App Meta e prodotto WhatsApp

1. Su [developers.facebook.com](https://developers.facebook.com/apps) crea
   un'app di tipo **Business**.
2. Aggiungi il prodotto **WhatsApp**.
3. Collega o crea un **WhatsApp Business Account (WABA)**.

Nella schermata *WhatsApp > Configurazione API* trovi subito un numero di test
gratuito: sufficiente per tutto lo sviluppo, con il limite che può scrivere solo
a un massimo di 5 numeri destinatari che registri a mano.

## 2. Le quattro credenziali

| Variabile | Dove si trova |
|---|---|
| `WHATSAPP_PHONE_NUMBER_ID` | WhatsApp > Configurazione API, sotto il numero mittente. È un ID numerico, **non** il numero di telefono. |
| `WHATSAPP_TOKEN` | Stessa pagina. Il token mostrato lì scade in 24h: per la produzione creane uno permanente (passo 5). |
| `WHATSAPP_APP_SECRET` | Impostazioni app > Di base > *Chiave segreta*. |
| `WHATSAPP_VERIFY_TOKEN` | Non te lo dà Meta: è una stringa che scegli tu e che riscriverai identica nel pannello al passo 4. |

Poi la chiave Anthropic in `ANTHROPIC_API_KEY`, da
[console.anthropic.com](https://console.anthropic.com/settings/keys).

## 3. Esporre il servizio in HTTPS

Meta consegna i webhook solo su HTTPS con certificato valido, quindi
`localhost` non basta. In sviluppo:

```bash
npm run dev          # avvia il bridge su :3000
ngrok http 3000      # in un altro terminale
```

ngrok stampa un URL pubblico tipo `https://abc123.ngrok-free.app`: il tuo
webhook sarà `https://abc123.ngrok-free.app/webhook`.

In produzione va bene qualunque host con TLS (Fly.io, Railway, Render, un VPS
dietro nginx). L'unico requisito è che l'endpoint risponda in fretta.

## 4. Registrare il webhook

In *WhatsApp > Configurazione > Webhook*:

1. **URL callback**: il tuo `https://.../webhook`.
2. **Token di verifica**: esattamente il valore di `WHATSAPP_VERIFY_TOKEN`.
3. Premi *Verifica e salva*. Meta chiama subito l'endpoint in GET; se il servizio
   è attivo vedrai nei log `webhook verificato da Meta`.
4. Nella lista dei campi, sottoscrivi **`messages`**. Senza questa
   sottoscrizione l'URL è salvato ma non arriva nulla.

Errore più comune: il token di verifica non combacia, oppure il servizio non era
in ascolto nel momento in cui hai premuto *Verifica*.

## 5. Passare in produzione

1. **Verifica business**: nel Business Manager, richiedi la verifica
   dell'azienda. Senza, resti confinato al numero di test.
2. **Numero reale**: aggiungi un numero che *non* sia già attivo su WhatsApp o
   WhatsApp Business (va prima cancellato l'account esistente su quel numero).
3. **Token permanente**: Business Manager > Impostazioni azienda > Utenti >
   *Utenti di sistema*. Crea un system user, assegnagli l'app e il WABA, e
   genera un token con i permessi `whatsapp_business_messaging` e
   `whatsapp_business_management`. Questo è il token da mettere in
   `WHATSAPP_TOKEN`: non scade.
4. **Display name**: il nome mostrato ai clienti passa da un'approvazione di
   Meta, che di solito richiede qualche ora.

## 6. Cose da sapere sul comportamento a runtime

**La finestra di 24 ore.** Puoi rispondere liberamente a un cliente solo entro
24 ore dal suo ultimo messaggio. Oltre, servono i *template* pre-approvati da
Meta. Questo bridge risponde sempre a un messaggio appena ricevuto, quindi la
finestra è rispettata per costruzione: diventa un tema solo se aggiungi invii
proattivi (promemoria, notifiche), che vanno implementati con i template.

**Le riconsegne.** Se il tuo endpoint non risponde `200` in fretta, Meta
riconsegna lo stesso evento. Per questo il servizio risponde `200` prima di
generare la risposta e tiene una finestra di deduplica di 10 minuti sugli id dei
messaggi: senza, il cliente riceverebbe la stessa risposta due volte.

**I costi.** Meta fattura per conversazione, con una quota di conversazioni di
servizio gratuite al mese; le tariffe variano per paese. A quello si somma il
consumo dell'API Anthropic, visibile nei log di ogni risposta
(`inputTokens` / `outputTokens`).

**Lo storico è in memoria.** Al riavvio le conversazioni ripartono da zero, e
con più repliche del processo ogni istanza ha il suo stato. Per la produzione
sostituisci `InMemoryConversationStore` con un'implementazione su Redis: è
dietro l'interfaccia `ConversationStore` proprio per questo.

## Diagnosi rapida

| Sintomo | Causa tipica |
|---|---|
| *Verifica e salva* fallisce | Servizio non raggiungibile, oppure `WHATSAPP_VERIFY_TOKEN` diverso da quello scritto nel pannello. |
| Nessun log all'arrivo di un messaggio | Campo `messages` non sottoscritto nel webhook. |
| `firma del webhook non valida` nei log | `WHATSAPP_APP_SECRET` sbagliato: è la chiave segreta dell'app, non il token della Graph API. |
| `Graph API ha risposto 401` | Token scaduto (quello del pannello dura 24h) o privo del permesso `whatsapp_business_messaging`. |
| `Graph API ha risposto 400` con *recipient* | Numero non fra i destinatari di test, oppure fuori dalla finestra di 24 ore. |
