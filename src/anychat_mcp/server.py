"""Server MCP per AnyChat.

Stato: la mappa degli endpoint di AnyChat non e' ancora confermata contro la
documentazione ufficiale, quindi il server espone due livelli:

1. strumenti generici (`anychat_request`, `anychat_probe`) per interrogare e
   mappare l'API dalla macchina dell'utente, che AnyChat lo raggiunge;
2. `anychat_send_broadcast`, l'invio massivo, che resta disattivato finche'
   non gli si indica il path di invio confermato (ANYCHAT_SEND_PATH).
"""

from __future__ import annotations

import os
from pathlib import Path
from typing import Annotated, Any, Literal

from mcp.server.mcpserver import MCPServer
from pydantic import Field

from .client import AnyChatClient, AnyChatError
from .config import Config, ConfigError, load_config
from .recipients import RecipientError, clean_recipients, load_csv
from .sendlog import SendLog
from .throttle import DailyCounter, RateLimiter

mcp = MCPServer("anychat")

_config: Config | None = None
_limiter: RateLimiter | None = None


def config() -> Config:
    global _config, _limiter
    if _config is None:
        _config = load_config()
        _limiter = RateLimiter(_config.messages_per_second)
    return _config


def limiter() -> RateLimiter:
    config()
    assert _limiter is not None
    return _limiter


def counter() -> DailyCounter:
    cfg = config()
    return DailyCounter(cfg.state_path, cfg.daily_cap)


def sendlog() -> SendLog:
    return SendLog(config().log_path)


@mcp.tool()
async def anychat_request(
    method: Annotated[
        Literal["GET", "POST", "PUT", "PATCH", "DELETE"],
        Field(description="Metodo HTTP"),
    ],
    path: Annotated[str, Field(description="Path dell'API, es. /v1/contacts")],
    params: Annotated[
        dict[str, Any] | None, Field(description="Parametri di query string")
    ] = None,
    body: Annotated[dict[str, Any] | None, Field(description="Corpo JSON")] = None,
) -> dict[str, Any]:
    """Esegue una chiamata autenticata qualsiasi verso l'API AnyChat.

    Serve a esplorare e mappare l'API finche' gli endpoint non sono confermati.
    Non usarlo per inviare messaggi massivi: per quello c'e'
    `anychat_send_broadcast`, che rispetta i limiti di invio.
    """
    async with AnyChatClient(config()) as client:
        response = await client.request(method, path, params=params, json_body=body)
    return {"status": response.status, "body": response.body}


@mcp.tool()
async def anychat_probe(
    paths: Annotated[
        list[str] | None,
        Field(description="Path da sondare; se assente usa una lista di default"),
    ] = None,
) -> dict[str, Any]:
    """Sonda in GET una lista di path per capire quali esistono.

    La documentazione di AnyChat non e' raggiungibile da ogni rete: questo
    strumento ricostruisce la superficie dell'API dal vivo. Un 200 indica che il
    path esiste, un 401/403 che esiste ma il token non basta, un 404 che non c'e'.
    """
    candidates = paths or [
        "/",
        "/v1",
        "/v1/me",
        "/v1/contacts",
        "/v1/conversations",
        "/v1/messages",
        "/v1/campaigns",
        "/v1/broadcasts",
        "/v1/templates",
        "/v1/channels",
        "/v1/tags",
    ]

    findings: list[dict[str, Any]] = []
    cfg = config()
    async with AnyChatClient(cfg) as client:
        for path in candidates:
            try:
                response = await client.request("GET", path)
                findings.append(
                    {"path": path, "status": response.status, "exists": True}
                )
            except AnyChatError as exc:
                findings.append(
                    {
                        "path": path,
                        "status": exc.status,
                        "exists": exc.status not in (0, 404),
                        "detail": exc.detail[:200],
                    }
                )
    return {"base_url": cfg.base_url, "results": findings}


@mcp.tool()
async def anychat_quota() -> dict[str, Any]:
    """Mostra quanti messaggi restano oggi prima del tetto giornaliero."""
    cfg = config()
    quota = counter().snapshot()
    return {
        "inviati_oggi": quota.sent,
        "tetto_giornaliero": quota.cap,
        "residui": quota.remaining,
        "messaggi_al_secondo": cfg.messages_per_second,
    }


@mcp.tool()
async def anychat_prepare_recipients(
    csv_path: Annotated[
        str | None, Field(description="Percorso di un CSV da cui leggere i destinatari")
    ] = None,
    rows: Annotated[
        list[dict[str, Any]] | None,
        Field(description="Destinatari gia' in memoria, alternativa al CSV"),
    ] = None,
) -> dict[str, Any]:
    """Normalizza, valida e deduplica una lista destinatari prima dell'invio.

    Porta i numeri in formato E.164, toglie i duplicati e riporta gli scarti con
    il motivo. Conviene sempre passare da qui: ogni numero malformato consuma
    comunque il tetto giornaliero quando l'invio parte.
    """
    cfg = config()
    try:
        if csv_path:
            pulita = load_csv(Path(csv_path).expanduser(), cfg.default_country_code)
        elif rows:
            pulita = clean_recipients(rows, cfg.default_country_code)
        else:
            return {"errore": "serve csv_path oppure rows"}
    except RecipientError as exc:
        return {"errore": str(exc)}

    return {
        **pulita.summary(),
        "destinatari": [
            {"phone": r.phone, "variables": r.variables} for r in pulita.recipients
        ],
        "scartati": pulita.scartati[:50],
    }


@mcp.tool()
async def anychat_campaign_status(
    campaign_id: Annotated[str, Field(description="Identificativo della campagna")],
) -> dict[str, Any]:
    """Mostra a chi la campagna e' gia' arrivata e a chi no."""
    progress = sendlog().progress(campaign_id)
    return {
        "campaign_id": campaign_id,
        "gia_inviati": progress.totale_inviati,
        "falliti_da_ritentare": sorted(progress.falliti),
        "campagne_note": sendlog().campaigns(),
    }


@mcp.tool()
async def anychat_send_broadcast(
    campaign_id: Annotated[
        str,
        Field(
            description=(
                "Identificativo stabile della campagna. Rilanciare lo stesso id "
                "riprende senza riscrivere a chi ha gia' ricevuto."
            )
        ),
    ],
    recipients: Annotated[
        list[dict[str, Any]],
        Field(description="Destinatari: {'phone': '+39...', 'variables': {...}}"),
    ],
    template_name: Annotated[
        str, Field(description="Nome del template WhatsApp approvato da Meta")
    ],
    language: Annotated[str, Field(description="Codice lingua del template")] = "it",
    confirm: Annotated[
        bool,
        Field(
            description=(
                "False (default) simula soltanto. True invia davvero: "
                "l'invio non e' annullabile."
            )
        ),
    ] = False,
) -> dict[str, Any]:
    """Invia un template WhatsApp a piu' destinatari, con ripresa e limiti.

    Fuori dalla finestra di 24 ore WhatsApp accetta solo template pre-approvati,
    quindi si indica `template_name` e non testo libero. Di default gira a vuoto
    e riporta cosa farebbe. Chi ha gia' ricevuto in questa campagna viene
    saltato, e se i destinatari eccedono il tetto giornaliero ne parte quanti ne
    stanno: il resto riprende al rilancio successivo.
    """
    send_path = os.environ.get("ANYCHAT_SEND_PATH", "").strip()
    cfg = config()
    log = sendlog()

    pulita = clean_recipients(recipients, cfg.default_country_code)
    gia_inviati = log.progress(campaign_id).inviati
    da_inviare = [r for r in pulita.recipients if r.phone not in gia_inviati]

    residui = counter().snapshot().remaining
    in_coda = da_inviare[:residui]
    rimandati = da_inviare[residui:]

    piano = {
        "campaign_id": campaign_id,
        "ricevuti": len(recipients),
        **pulita.summary(),
        "gia_ricevuti_saltati": len(pulita.recipients) - len(da_inviare),
        "in_partenza_ora": len(in_coda),
        "rimandati_per_tetto": len(rimandati),
        "template": template_name,
        "lingua": language,
        "endpoint": send_path or "(non configurato)",
    }

    if not send_path:
        return {
            "inviato": False,
            "motivo": (
                "ANYCHAT_SEND_PATH non e' impostato. Il path di invio di AnyChat "
                "non e' ancora confermato: individualo con anychat_probe o dalla "
                "documentazione, poi impostalo nel .env."
            ),
            "piano": piano,
        }

    if not confirm:
        return {"inviato": False, "motivo": "simulazione (confirm=False)", "piano": piano}

    if not in_coda:
        return {
            "inviato": False,
            "motivo": "nessun destinatario da servire ora",
            "piano": piano,
        }

    counter().reserve(len(in_coda))

    esiti: list[dict[str, Any]] = []
    non_partiti = 0
    async with AnyChatClient(cfg) as client:
        for recipient in in_coda:
            await limiter().acquire()
            payload = {
                "to": recipient.phone,
                "type": "template",
                "template": {
                    "name": template_name,
                    "language": {"code": language},
                    "variables": recipient.variables,
                },
            }
            try:
                response = await client.request("POST", send_path, json_body=payload)
                log.record(campaign_id, recipient.phone, riuscito=True)
                esiti.append({"phone": recipient.phone, "status": response.status})
            except AnyChatError as exc:
                non_partiti += 1
                log.record(
                    campaign_id, recipient.phone, riuscito=False, detail=exc.detail
                )
                esiti.append(
                    {
                        "phone": recipient.phone,
                        "status": exc.status,
                        "errore": exc.detail[:200],
                    }
                )

    if non_partiti:
        counter().refund(non_partiti)

    return {
        "inviato": True,
        "riusciti": len(esiti) - non_partiti,
        "falliti": non_partiti,
        "rimandati_per_tetto": len(rimandati),
        "esiti": esiti[:100],
        "residui_oggi": counter().snapshot().remaining,
    }


def main() -> None:
    transport = os.environ.get("ANYCHAT_MCP_TRANSPORT", "stdio").strip()
    try:
        config()
    except ConfigError as exc:
        raise SystemExit(str(exc)) from exc
    mcp.run(transport="streamable-http" if transport == "http" else "stdio")


if __name__ == "__main__":
    main()
