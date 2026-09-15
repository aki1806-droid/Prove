"""Configurazione letta dall'ambiente.

Lo schema di autenticazione di AnyChat non e' documentato pubblicamente, quindi
il modo in cui il token viaggia e' configurabile invece che cablato: si cambia
una variabile d'ambiente invece di ricompilare il server.
"""

from __future__ import annotations

import os
from dataclasses import dataclass
from pathlib import Path

from dotenv import load_dotenv

load_dotenv()

DEFAULT_BASE_URL = "https://api.anychat.one"
DEFAULT_STATE_PATH = Path.home() / ".anychat-mcp" / "state.json"


class ConfigError(RuntimeError):
    """Configurazione assente o incoerente."""


@dataclass(frozen=True)
class Config:
    token: str
    base_url: str
    # Come il token viene inviato: "bearer", "header" (header grezzo) o "query".
    auth_style: str
    auth_name: str
    timeout_s: float
    # Limiti di invio WhatsApp: il tier del numero e' deciso da Meta, qui lo
    # rispecchiamo per non superarlo e farci bloccare il numero.
    messages_per_second: float
    daily_cap: int
    state_path: Path

    def auth_headers(self) -> dict[str, str]:
        if self.auth_style == "bearer":
            return {self.auth_name: f"Bearer {self.token}"}
        if self.auth_style == "header":
            return {self.auth_name: self.token}
        return {}

    def auth_params(self) -> dict[str, str]:
        if self.auth_style == "query":
            return {self.auth_name: self.token}
        return {}

    def redact(self, text: str) -> str:
        """Toglie il token da messaggi di errore prima che finiscano nel transcript."""
        return text.replace(self.token, "***") if self.token else text


def _float_env(name: str, default: float) -> float:
    raw = os.environ.get(name)
    if not raw:
        return default
    try:
        return float(raw)
    except ValueError as exc:
        raise ConfigError(f"{name} deve essere un numero, trovato {raw!r}") from exc


def _int_env(name: str, default: int) -> int:
    raw = os.environ.get(name)
    if not raw:
        return default
    try:
        return int(raw)
    except ValueError as exc:
        raise ConfigError(f"{name} deve essere un intero, trovato {raw!r}") from exc


def load_config() -> Config:
    token = os.environ.get("ANYCHAT_API_TOKEN", "").strip()
    if not token:
        raise ConfigError(
            "ANYCHAT_API_TOKEN non impostato. Copia .env.example in .env e "
            "incolla il token generato da AnyChat in Settings -> API settings."
        )

    auth_style = os.environ.get("ANYCHAT_AUTH_STYLE", "bearer").strip().lower()
    if auth_style not in {"bearer", "header", "query"}:
        raise ConfigError(
            f"ANYCHAT_AUTH_STYLE deve essere bearer, header o query, trovato {auth_style!r}"
        )

    default_name = {"bearer": "Authorization", "header": "X-API-Key", "query": "api_key"}
    auth_name = os.environ.get("ANYCHAT_AUTH_NAME", default_name[auth_style]).strip()

    state_path = Path(
        os.environ.get("ANYCHAT_STATE_PATH", str(DEFAULT_STATE_PATH))
    ).expanduser()

    return Config(
        token=token,
        base_url=os.environ.get("ANYCHAT_BASE_URL", DEFAULT_BASE_URL).rstrip("/"),
        auth_style=auth_style,
        auth_name=auth_name,
        timeout_s=_float_env("ANYCHAT_TIMEOUT_S", 30.0),
        messages_per_second=_float_env("ANYCHAT_MESSAGES_PER_SECOND", 5.0),
        daily_cap=_int_env("ANYCHAT_DAILY_CAP", 1000),
        state_path=state_path,
    )
