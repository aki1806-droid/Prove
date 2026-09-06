# Connessione a Skillplate

Skillplate espone una **API REST esterna** con autenticazione a Personal Access
Token: è la via ufficiale per collegarsi. Questo repository contiene un client
Python (solo standard library) che la incapsula.

- Base URL: `https://api.skillplate.com/v1/external`
- Auth: header `Authorization: Bearer <PAT>`
- Spec OpenAPI: `https://api.skillplate.com/v1/external/openapi.json`
- Documentazione: https://skillplate.com/docs/api

## 1. Token

Si genera dal pannello Skillplate: **Settings → API Tokens**. Il token è
segreto: non va incollato in chat, né committato.

```bash
mkdir -p ~/.config/skillplate
printf '%s' 'IL_TUO_TOKEN' > ~/.config/skillplate/token
chmod 600 ~/.config/skillplate/token
```

In alternativa `export SKILLPLATE_TOKEN=...` oppure
`export SKILLPLATE_TOKEN_FILE=/percorso/al/token`. L'ordine di risoluzione è:
argomento esplicito → `SKILLPLATE_TOKEN` → `SKILLPLATE_TOKEN_FILE` →
`~/.config/skillplate/token`.

I token sono limitati per scope (`users:read`, `users:write`, `products:read`,
`orders:write`, `subscriptions:write`, `discounts:read`, `discounts:write`).
Un **403** significa quasi sempre scope mancante, non permesso dell'utente.

## 2. Rete

L'host `api.skillplate.com` deve essere raggiungibile. Nelle sessioni di
Claude Code sul web l'uscita passa da un proxy con allowlist: se il dominio non
è ammesso la connessione fallisce con `403 CONNECT` prima ancora di arrivare a
Skillplate. In quel caso va aggiunto `api.skillplate.com` alla network policy
dell'ambiente, oppure il client va eseguito dalla propria macchina.

Come si riconosce: il client segnala `Risposta HTTP 403 non proveniente da
Skillplate (corpo non JSON)` e riporta il testo restituito dall'intermediario.
Un 403 vero di Skillplate arriva invece come JSON con `code` e `request_id`, e
significa scope mancante sul token.

## 3. Verifica della connessione

```bash
python3 -m skillplate ping
```

Stampa base URL, numero di prodotti visibili al token e stato del rate limit.
Altri comandi rapidi:

```bash
python3 -m skillplate products --type course
python3 -m skillplate users --email mario@example.com
python3 -m skillplate get /orders --param status=completed --param per_page=5
```

## 4. Uso da codice (Python)

```python
from skillplate import SkillplateClient

client = SkillplateClient()                      # token risolto automaticamente

corsi = client.list_products(type="course")["data"]
utente = client.list_users(**{"filter[email]": "mario@example.com"})["data"]

if utente:
    client.enroll(utente[0]["id"], [corsi[0]["id"]])
else:
    client.create_user(
        "mario@example.com", "Mario", "Rossi",
        product_ids=[corsi[0]["id"]], send_welcome_email=True,
    )

# export completo, con pausa automatica fra le pagine
for ordine in client.iter_orders(status="completed", created_from="2026-01-01"):
    ...
```

Gli errori arrivano come `SkillplateError` con `status`, `code`, `message` e
`request_id`: quest'ultimo va sempre riportato quando si segnala un problema.
Il client ritenta da solo su `429` e `5xx` (backoff esponenziale) e legge gli
header `X-RateLimit-*` in `client.rate_limit`.

**Gli ID sono stringhe hashate opache**: non vanno costruiti né dedotti, sempre
ripresi da una lista o da una risposta precedente.

## 5. Uso da Node

Stessa superficie del client Python, ESM e senza dipendenze (`node/`, Node >= 18).

```bash
cd node
node bin/skillplate.js ping
npm test          # 14 test, nessuna rete
```

```js
import { SkillplateClient } from "./node/src/index.js";

const client = new SkillplateClient();            // token risolto automaticamente

const { data: corsi } = await client.listProducts({ type: "course" });
const { data: utenti } = await client.listUsers({ "filter[email]": "mario@example.com" });

if (utenti.length) {
  await client.enroll(utenti[0].id, [corsi[0].id]);
} else {
  await client.createUser("mario@example.com", "Mario", "Rossi", {
    product_ids: [corsi[0].id],
    send_welcome_email: true,
  });
}

// export completo: async iterator con pausa automatica fra le pagine
for await (const ordine of client.iterOrders({ status: "completed", created_from: "2026-01-01" })) {
  // ...
}
```

Differenze rispetto al Python, tutte di forma:

- i metodi sono in `camelCase` e restituiscono promesse; i **campi del payload
  restano in `snake_case`** perché sono quelli dell'API;
- `paginate()` è un async iterator, `collect()` restituisce direttamente l'array;
- `timeout` è in millisecondi (Python: secondi);
- l'errore è `SkillplateError` con `status`, `code`, `requestId` e `describe()`;
- gli argomenti opzionali passano come oggetto finale invece che come kwargs.

Il `fetch` nativo di Node **non legge `HTTPS_PROXY`** da solo: dietro un proxy
serve `NODE_USE_ENV_PROXY=1` (Node >= 22.21), altrimenti la chiamata esce
diretta e va in timeout.

## 6. Webhook (direzione opposta)

Da **Settings → Webhooks** nel pannello. I payload sono firmati HMAC-SHA256
nell'header `X-Skillplate-Signature`:

```python
from skillplate import webhooks

evento = webhooks.parse_event(corpo_grezzo, request.headers["X-Skillplate-Signature"], SEGRETO)
if evento["event"] == "payment.succeeded":
    acquistati = webhooks.product_ids(evento)
```

In Node, identico:

```js
import { webhooks } from "./node/src/index.js";

const evento = webhooks.parseEvent(corpoGrezzo, req.headers["x-skillplate-signature"], SEGRETO);
if (evento.event === "payment.succeeded") {
  const acquistati = webhooks.productIds(evento);
}
```

`parse_event` / `parseEvent` sollevano un errore se la firma non torna: in quel
caso il payload va scartato. Va passato il **corpo grezzo**, non il JSON già
riserializzato, altrimenti l'HMAC non corrisponde.

Eventi disponibili: `payment.succeeded`, `payment.failed`,
`subscription.started`, `subscription.cancelled`, `user.created`,
`user.updated`, `lesson.completed`, `module.completed`, `course.completed`.

## 7. Limiti noti

- 100 GET/minuto, 30 scritture/minuto, burst 10 req/secondo.
- Il catalogo (corsi e lezioni) è in sola lettura via API: si crea dal pannello.
- Prima di scritture in massa conviene eseguire un caso singolo e verificarlo.

## Test

```bash
python3 -m unittest discover -s tests   # 12 test
cd node && npm test                     # 14 test
```

Entrambe le suite girano contro un server HTTP locale che imita l'API: non serve
né token né rete.
