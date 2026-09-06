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

## 4. Uso da codice

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

## 5. Webhook (direzione opposta)

Da **Settings → Webhooks** nel pannello. I payload sono firmati HMAC-SHA256
nell'header `X-Skillplate-Signature`:

```python
from skillplate import webhooks

evento = webhooks.parse_event(corpo_grezzo, request.headers["X-Skillplate-Signature"], SEGRETO)
if evento["event"] == "payment.succeeded":
    acquistati = webhooks.product_ids(evento)
```

`parse_event` solleva `ValueError` se la firma non torna: in quel caso il
payload va scartato.

Eventi disponibili: `payment.succeeded`, `payment.failed`,
`subscription.started`, `subscription.cancelled`, `user.created`,
`user.updated`, `lesson.completed`, `module.completed`, `course.completed`.

## 6. Limiti noti

- 100 GET/minuto, 30 scritture/minuto, burst 10 req/secondo.
- Il catalogo (corsi e lezioni) è in sola lettura via API: si crea dal pannello.
- Prima di scritture in massa conviene eseguire un caso singolo e verificarlo.

## Test

```bash
python3 -m unittest discover -s tests
```

I test girano contro un server HTTP locale che imita l'API: non serve né token
né rete.
