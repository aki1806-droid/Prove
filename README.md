# anychat-mcp

Server MCP per pilotare [AnyChat](https://anychat.one) da Claude: esplorare
l'API, gestire i contatti e inviare campagne WhatsApp su template approvati.

## Stato

**La mappa degli endpoint non e' ancora confermata.** La documentazione di
AnyChat non era raggiungibile dall'ambiente in cui il server e' stato scritto,
quindi nessun path e' stato dato per buono. Di conseguenza:

- `anychat_request` e `anychat_probe` servono a mappare l'API dal vivo;
- `anychat_send_broadcast` **rifiuta di inviare** finche' non gli si indica il
  path di invio confermato in `ANYCHAT_SEND_PATH`.

Il primo passo pratico e' lanciare `anychat_probe` dalla tua macchina e usare
il risultato per riempire la configurazione.

## Installazione

```bash
uv venv
uv pip install -e ".[dev]"
cp .env.example .env    # poi incolla il token in .env
```

Il token si genera in AnyChat da *Settings -> API settings*. Sta solo in `.env`,
che e' gitignorato: non va mai committato ne' incollato in chat.

## Collegarlo a Claude Code

```bash
claude mcp add anychat -- /percorso/assoluto/Prove/.venv/bin/anychat-mcp
```

Per Claude Desktop, in `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "anychat": {
      "command": "/percorso/assoluto/Prove/.venv/bin/anychat-mcp",
      "env": { "ANYCHAT_API_TOKEN": "il-tuo-token" }
    }
  }
}
```

## Strumenti

| Strumento | Cosa fa |
|---|---|
| `anychat_probe` | Sonda una lista di path e riporta quali esistono |
| `anychat_request` | Chiamata REST autenticata arbitraria: esplorazione e casi non coperti |
| `anychat_prepare_recipients` | Normalizza in E.164, deduplica e scarta i numeri invalidi (anche da CSV) |
| `anychat_quota` | Messaggi gia' inviati oggi e residui prima del tetto |
| `anychat_campaign_status` | Chi ha gia' ricevuto una campagna e chi resta da ritentare |
| `anychat_send_broadcast` | Invio massivo di un template WhatsApp, con ripresa e limiti |

## Riprendere una campagna interrotta

`anychat_send_broadcast` vuole un `campaign_id` stabile. Ogni consegna riuscita
finisce in un registro append-only su disco, quindi rilanciare la stessa
campagna con la stessa lista:

- salta chi ha gia' ricevuto;
- ritenta solo chi era fallito;
- riparte da dove il tetto giornaliero aveva interrotto.

E' il motivo per cui l'id va scelto una volta e riusato: cambiarlo fa ripartire
la campagna da zero e riscrive a tutti.

## Limiti di invio

Non sono un dettaglio implementativo: Meta assegna a ogni numero WhatsApp
Business un tier giornaliero (1k / 10k / 100k / illimitato) e, fuori dalla
finestra di 24 ore dall'ultimo messaggio del cliente, accetta **solo template
pre-approvati**. Superare il tier o inviare a contatti senza opt-in fa
sospendere il numero.

Il server quindi:

- parla di `template_name`, non di testo libero;
- distanzia gli invii a `ANYCHAT_MESSAGES_PER_SECOND`;
- tiene un contatore giornaliero **su disco**, cosi' un riavvio non azzera il
  conteggio e non fa sforare il tier;
- gira a vuoto salvo `confirm=True` esplicito, perche' un invio massivo non si
  ritira;
- restituisce al contatore i messaggi non partiti;
- non ricontatta chi ha gia' ricevuto, anche dopo un'interruzione.

I numeri vengono normalizzati in E.164 e deduplicati prima di partire: due
scritture diverse dello stesso numero sono un contatto solo, e un numero
malformato viene scartato prima di consumare quota.

Allinea `ANYCHAT_DAILY_CAP` al tier reale del tuo numero.

## Test

```bash
.venv/bin/python -m pytest tests/ -q
```
