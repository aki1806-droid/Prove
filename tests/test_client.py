import threading
from http.server import BaseHTTPRequestHandler, HTTPServer
from pathlib import Path

import pytest

from anychat_mcp.client import AnyChatClient, AnyChatError
from anychat_mcp.config import Config


def _make_server(handler_factory):
    server = HTTPServer(("127.0.0.1", 0), handler_factory)
    threading.Thread(target=server.serve_forever, daemon=True).start()
    return server


def _config(port: int, token: str = "segreto123") -> Config:
    return Config(
        token=token,
        base_url=f"http://127.0.0.1:{port}",
        auth_style="bearer",
        auth_name="Authorization",
        timeout_s=5.0,
        messages_per_second=100.0,
        daily_cap=100,
        state_path=Path("/tmp/anychat-test-state.json"),
        log_path=Path("/tmp/anychat-test-log.jsonl"),
        default_country_code="39",
    )


async def test_attempts_uno_non_ritenta() -> None:
    chiamate: list[str] = []

    class H(BaseHTTPRequestHandler):
        def do_GET(self):
            chiamate.append(self.path)
            self.send_response(503)
            self.end_headers()

        def log_message(self, *a):
            pass

    server = _make_server(H)
    try:
        async with AnyChatClient(_config(server.server_port)) as client:
            with pytest.raises(AnyChatError):
                await client.request("GET", "/v1/me", attempts=1)
        # Il punto: una sola chiamata, non quattro con backoff.
        assert len(chiamate) == 1
    finally:
        server.shutdown()


async def test_invia_il_token_e_restituisce_il_json() -> None:
    visti: list[str | None] = []

    class H(BaseHTTPRequestHandler):
        def do_GET(self):
            visti.append(self.headers.get("Authorization"))
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(b'{"ok": true}')

        def log_message(self, *a):
            pass

    server = _make_server(H)
    try:
        async with AnyChatClient(_config(server.server_port)) as client:
            response = await client.request("GET", "/v1/me")
        assert response.body == {"ok": True}
        assert visti == ["Bearer segreto123"]
    finally:
        server.shutdown()


async def test_il_token_non_finisce_nel_messaggio_di_errore() -> None:
    class H(BaseHTTPRequestHandler):
        def do_GET(self):
            self.send_response(400)
            self.end_headers()
            # Un'API che rimanda indietro il token nell'errore non deve
            # farlo finire nel transcript.
            self.wfile.write(b'{"error": "token segreto123 non valido"}')

        def log_message(self, *a):
            pass

    server = _make_server(H)
    try:
        async with AnyChatClient(_config(server.server_port)) as client:
            with pytest.raises(AnyChatError) as exc:
                await client.request("GET", "/v1/me", attempts=1)
        assert "segreto123" not in str(exc.value)
        assert "***" in str(exc.value)
    finally:
        server.shutdown()
