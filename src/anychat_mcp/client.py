"""Client HTTP verso l'API AnyChat.

Volutamente generico: finche' la mappa degli endpoint non e' confermata contro
la documentazione, il client sa parlare REST autenticato con AnyChat senza
presumere quali path esistano.
"""

from __future__ import annotations

import asyncio
from dataclasses import dataclass
from typing import Any

import httpx

from .config import Config

RETRY_STATUSES = {429, 500, 502, 503, 504}
MAX_ATTEMPTS = 4


class AnyChatError(RuntimeError):
    """Errore restituito dall'API, gia' ripulito dal token."""

    def __init__(self, status: int, detail: str) -> None:
        super().__init__(f"AnyChat ha risposto {status}: {detail}")
        self.status = status
        self.detail = detail


@dataclass
class Response:
    status: int
    body: Any

    @property
    def ok(self) -> bool:
        return 200 <= self.status < 300


class AnyChatClient:
    def __init__(self, config: Config) -> None:
        self._config = config
        self._client = httpx.AsyncClient(
            base_url=config.base_url,
            timeout=config.timeout_s,
            headers={"Accept": "application/json", **config.auth_headers()},
        )

    async def aclose(self) -> None:
        await self._client.aclose()

    async def __aenter__(self) -> "AnyChatClient":
        return self

    async def __aexit__(self, *_exc: object) -> None:
        await self.aclose()

    def _retry_delay(self, response: httpx.Response, attempt: int) -> float:
        # Se il server dice quanto aspettare, si obbedisce: su 429 indovinare
        # un backoff piu' corto del suo peggiora solo le cose.
        header = response.headers.get("Retry-After")
        if header:
            try:
                return min(60.0, float(header))
            except ValueError:
                pass
        return min(30.0, 2.0**attempt)

    async def request(
        self,
        method: str,
        path: str,
        *,
        params: dict[str, Any] | None = None,
        json_body: Any | None = None,
    ) -> Response:
        query = {**self._config.auth_params(), **(params or {})}
        last_error: str = ""

        for attempt in range(MAX_ATTEMPTS):
            try:
                response = await self._client.request(
                    method.upper(),
                    path if path.startswith("/") else f"/{path}",
                    params=query or None,
                    json=json_body,
                )
            except httpx.RequestError as exc:
                last_error = self._config.redact(str(exc))
                if attempt == MAX_ATTEMPTS - 1:
                    raise AnyChatError(0, f"connessione fallita: {last_error}") from exc
                await asyncio.sleep(min(30.0, 2.0**attempt))
                continue

            if response.status_code in RETRY_STATUSES and attempt < MAX_ATTEMPTS - 1:
                await asyncio.sleep(self._retry_delay(response, attempt))
                continue

            try:
                body: Any = response.json()
            except ValueError:
                body = response.text

            if not (200 <= response.status_code < 300):
                detail = self._config.redact(
                    body if isinstance(body, str) else repr(body)
                )
                raise AnyChatError(response.status_code, detail[:2000])

            return Response(status=response.status_code, body=body)

        raise AnyChatError(0, f"esauriti i tentativi: {last_error}")
