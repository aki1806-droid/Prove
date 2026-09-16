# prove

Repository di lavoro. Contiene `pickyassist`, un client Python non ufficiale per le
**API v2 di Picky Assist**: invio messaggi (Push API), report di consegna e ricezione
dei webhook.

## Struttura

```
pickyassist/       il pacchetto (solo libreria standard, nessuna dipendenza)
  client.py        PickyAssistClient: push e delivery report
  webhook.py       parsing dei webhook + app WSGI pronta all'uso
  models.py        dataclass di richiesta/risposta
  constants.py     canali, codici di stato, endpoint
  errors.py        eccezioni tipizzate
examples/          script di esempio eseguibili
tests/             test con trasporto simulato (nessuna chiamata di rete)
```

## Configurazione

Il token **non va mai scritto nel codice né committato**. Si crea da
*Settings → Developers → API* nel pannello Picky Assist e si passa via ambiente:

```bash
cp .env.example .env     # .env è già in .gitignore
export PICKY_API_TOKEN="il-tuo-token"
```

Se un token finisce per sbaglio in chat, in un log o in un commit, va considerato
compromesso: rigeneralo dal pannello.

## Invio messaggi

```python
from pickyassist import Application, PickyAssistClient

client = PickyAssistClient(application=Application.WHATSAPP_OFFICIAL)  # token da $PICKY_API_TOKEN

esito = client.invia_messaggio("+39 333 123 4567", "Ciao!")
print(esito.ok, esito.push_id)
```

Il numero viene normalizzato automaticamente (`+39 333 123 4567` → `393331234567`):
prefisso internazionale senza `+`, senza `00` e senza separatori.

Invio multiplo, con formati misti nella stessa lista:

```python
from pickyassist import Destinatario

client.invia_bulk(
    [
        "393331111111",                                        # solo numero
        {"number": "393332222222", "message": "su misura"},    # dict formato API
        Destinatario(numero="393333333333", media_url="https://esempio.it/listino.pdf"),
    ],
    messaggio_globale="Testo usato per chi non ha un messaggio proprio",
)
```

Per i campi previsti dalla documentazione ma non modellati qui (variabili dinamiche,
parametri dei template WhatsApp…) ci sono due vie di fuga che finiscono tali e quali
nel payload: `Destinatario(..., extra={...})` per il singolo destinatario e
`client.push(..., campi_extra={...})` per la richiesta.

### Canali (`application`)

| Valore | Canale |
| --- | --- |
| 1 | WhatsApp Personal (automazione telefono) |
| 2 | WhatsApp Business (automazione telefono) |
| 3 | SMS via SIM |
| 4 | Chiamata |
| 5 | Facebook Messenger |
| 8 | WhatsApp Official |
| 10 | WhatsApp Web |
| 101 | WhatsApp Cloud API |
| 121 | WhatsApp Official Managed |

Si imposta una volta sul client oppure per singola chiamata:
`client.invia_messaggio(..., application=Application.SMS)`.

## Gestione degli errori

Le risposte con stato diverso da `100` diventano eccezioni tipizzate:

```python
from pickyassist import ApiError, AuthenticationError, InsufficientBalanceError

try:
    client.invia_messaggio("393331234567", "Ciao!")
except AuthenticationError:
    ...   # 401 token non valido
except InsufficientBalanceError:
    ...   # 403 credito esaurito
except ApiError as exc:
    print(exc.status, exc.payload)   # qualunque altro codice, payload grezzo incluso
```

Gli errori di rete sollevano `TransportError` dopo 3 tentativi con backoff esponenziale.

## Report di consegna

```python
report = client.delivery_report(esito.push_id)
for riga in report.messaggi:
    print(riga.numero, riga.descrizione_stato, riga.error_code)
```

Per volumi non banali conviene l'Event Webhook: il polling su `/delivery-report`
è pensato per controllare invii specifici.

## Webhook in ricezione

`crea_wsgi_app` instrada i messaggi in entrata e gli eventi a due funzioni, e
serializza la replica immediata nel formato atteso da Picky Assist:

```python
from pickyassist import crea_wsgi_app, esegui_server, risposta
from pickyassist.webhook import nessuna_risposta

def gestisci_messaggio(msg):
    if "orari" in msg.testo.lower():
        return risposta("Siamo aperti 9:00-18:00.", delay=2)   # delay max 3600 s
    return nessuna_risposta()

def gestisci_evento(evento):
    for riga in evento.report:
        print(riga.numero, riga.descrizione_stato)

app = crea_wsgi_app(gestisci_messaggio, gestisci_evento, segreto="un-segreto")
esegui_server(app, porta=8080)
```

L'app è WSGI standard: `esegui_server` usa il server di sviluppo della libreria
standard, ma in produzione si serve con gunicorn/uWSGI o si monta dentro un'app
Flask/Django esistente.

Picky Assist non firma le chiamate ai webhook, quindi l'endpoint è pubblico per
chiunque ne conosca l'URL: con `segreto=...` l'app accetta solo richieste che
portano quel valore nel parametro `?secret=` o nell'header `X-Webhook-Secret`.
Va comunque esposto in HTTPS.

Il testo del messaggio viene letto da `message_in_raw` se presente, altrimenti da
`message-in` decodificando l'URL-encoding; il payload originale resta in `msg.raw`.

## Esempi

```bash
export PICKY_API_TOKEN="il-tuo-token"
python3 examples/invia_messaggio.py 393331234567 "Ciao dal client Python"
python3 examples/server_webhook.py
```

## Test

```bash
python3 -m unittest discover -s tests
```

I test usano un trasporto finto e non chiamano la rete.

## Note sulle API

Endpoint usati (`https://pickyassist.com/app/api/v2`):

| Metodo | Percorso | Uso |
| --- | --- | --- |
| POST | `/push` | invio messaggi, singoli e bulk |
| POST | `/delivery-report` | stato di consegna di un `push_id` |

L'autenticazione avviene con il campo `token` nel corpo JSON, non tramite header.
Lo stato `100` significa che la richiesta è stata accettata dai server Picky Assist,
non che il messaggio sia già arrivato al destinatario: per quello servono delivery
report o Event Webhook.

Documentazione ufficiale: <https://help.pickyassist.com/api-documentation-v2/introduction>.
I nomi dei campi per media e template sono allineati alla documentazione v2; se una
risposta dovesse segnalare un parametro inatteso, usa `extra` / `campi_extra` senza
dover modificare la libreria.

## Come si lavora

- Il branch principale è `main`.
- Ogni modifica in un branch dedicato, poi pull request su `main`.
