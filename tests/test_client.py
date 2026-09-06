"""Test end-to-end del client contro un server HTTP locale che imita l'API."""

import json
import os
import tempfile
import sys
import threading
import unittest
from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import parse_qs, urlparse

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from skillplate import SkillplateClient, SkillplateError  # noqa: E402
from skillplate.errors import MissingTokenError  # noqa: E402
from skillplate import webhooks  # noqa: E402

RICHIESTE = []
UTENTI = [{"id": "usr_{}".format(i), "email": "u{}@example.com".format(i)} for i in range(1, 6)]


class FintaAPI(BaseHTTPRequestHandler):
    def log_message(self, *args):  # silenzia il log del server di test
        pass

    def _rispondi(self, status, corpo, headers=None):
        grezzo = json.dumps(corpo).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(grezzo)))
        self.send_header("X-RateLimit-Limit", "100")
        self.send_header("X-RateLimit-Remaining", "97")
        self.send_header("X-RateLimit-Reset", "60")
        for chiave, valore in (headers or {}).items():
            self.send_header(chiave, valore)
        self.end_headers()
        self.wfile.write(grezzo)

    def _gestisci(self, metodo):
        parsed = urlparse(self.path)
        query = parse_qs(parsed.query)
        lunghezza = int(self.headers.get("Content-Length") or 0)
        corpo = json.loads(self.rfile.read(lunghezza)) if lunghezza else None
        RICHIESTE.append(
            {
                "metodo": metodo,
                "path": parsed.path,
                "query": query,
                "body": corpo,
                "auth": self.headers.get("Authorization"),
            }
        )

        if self.headers.get("Authorization") != "Bearer token-di-test":
            return self._rispondi(401, {"error": {"code": "unauthenticated", "message": "Token non valido", "status": 401, "request_id": "req_401"}})

        if parsed.path == "/v1/external/products":
            return self._rispondi(200, {"data": [{"id": "prd_1", "type": "course"}], "meta": {"current_page": 1, "last_page": 1, "total": 1}})

        if parsed.path == "/v1/external/users" and metodo == "GET":
            pagina = int(query.get("page", ["1"])[0])
            per_page = int(query.get("per_page", ["2"])[0])
            inizio = (pagina - 1) * per_page
            fetta = UTENTI[inizio:inizio + per_page]
            ultima = (len(UTENTI) + per_page - 1) // per_page
            return self._rispondi(200, {"data": fetta, "meta": {"current_page": pagina, "last_page": ultima, "per_page": per_page, "total": len(UTENTI)}})

        if parsed.path == "/v1/external/users" and metodo == "POST":
            return self._rispondi(201, {"data": {"id": "usr_new", **(corpo or {})}})

        if parsed.path == "/v1/external/users/usr_1/enroll":
            return self._rispondi(200, {"data": {"enrolled": corpo["product_ids"]}})

        if parsed.path == "/v1/external/discounts" and metodo == "POST":
            return self._rispondi(403, {"error": {"code": "missing_scope", "message": "Manca lo scope discounts:write", "status": 403, "request_id": "req_403"}})

        return self._rispondi(404, {"error": {"code": "not_found", "message": "Risorsa non trovata", "status": 404, "request_id": "req_404"}})

    def do_GET(self):
        self._gestisci("GET")

    def do_POST(self):
        self._gestisci("POST")


class TestClient(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.server = HTTPServer(("127.0.0.1", 0), FintaAPI)
        cls.thread = threading.Thread(target=cls.server.serve_forever, daemon=True)
        cls.thread.start()
        host, porta = cls.server.server_address
        cls.base_url = "http://{}:{}/v1/external".format(host, porta)

    @classmethod
    def tearDownClass(cls):
        cls.server.shutdown()
        cls.server.server_close()

    def setUp(self):
        del RICHIESTE[:]
        self.client = SkillplateClient(token="token-di-test", base_url=self.base_url, sleep=lambda _: None)

    def test_ping_e_rate_limit(self):
        risposta = self.client.ping()
        self.assertEqual(risposta["data"][0]["id"], "prd_1")
        self.assertEqual(self.client.rate_limit.remaining, 97)
        self.assertEqual(RICHIESTE[0]["auth"], "Bearer token-di-test")

    def test_paginazione_completa(self):
        utenti = list(self.client.paginate("/users", per_page=2, pause=0))
        self.assertEqual([u["id"] for u in utenti], [u["id"] for u in UTENTI])
        self.assertEqual(len([r for r in RICHIESTE if r["path"].endswith("/users")]), 3)

    def test_creazione_utente(self):
        risposta = self.client.create_user("a@example.com", "Anna", "Rossi", tags=["vip"], send_welcome_email=True)
        self.assertEqual(risposta["data"]["id"], "usr_new")
        inviato = RICHIESTE[-1]["body"]
        self.assertEqual(inviato["email"], "a@example.com")
        self.assertEqual(inviato["tags"], ["vip"])

    def test_enroll(self):
        risposta = self.client.enroll("usr_1", ["prd_1"])
        self.assertEqual(risposta["data"]["enrolled"], ["prd_1"])

    def test_errore_403_espone_request_id(self):
        with self.assertRaises(SkillplateError) as ctx:
            self.client.create_discount(code="ESTATE", percent_off=20)
        self.assertEqual(ctx.exception.status, 403)
        self.assertEqual(ctx.exception.code, "missing_scope")
        self.assertEqual(ctx.exception.request_id, "req_403")

    def test_token_errato_da_401(self):
        cliente = SkillplateClient(token="sbagliato", base_url=self.base_url, sleep=lambda _: None)
        with self.assertRaises(SkillplateError) as ctx:
            cliente.ping()
        self.assertEqual(ctx.exception.status, 401)

    def test_percent_off_e_amount_off_esclusivi(self):
        with self.assertRaises(ValueError):
            self.client.create_discount(percent_off=10, amount_off=5)

    def test_parametri_lista_e_booleani(self):
        with self.assertRaises(SkillplateError):
            self.client.get("/inesistente", params={"tags": ["a", "b"], "active": True, "vuoto": None})
        query = RICHIESTE[-1]["query"]
        self.assertEqual(query["tags[]"], ["a", "b"])
        self.assertEqual(query["active"], ["true"])
        self.assertNotIn("vuoto", query)


class TestErroreNonSkillplate(unittest.TestCase):
    """Un 403 di un proxy non va scambiato per uno scope mancante."""

    def test_corpo_non_json_finisce_nel_messaggio(self):
        client = SkillplateClient(token="t", base_url="http://127.0.0.1:1/v1/external")
        errore = client._http_error(403, b"Host not in allowlist: api.skillplate.com.")
        self.assertIn("non proveniente da Skillplate", errore.message)
        self.assertIn("Host not in allowlist", errore.message)
        self.assertNotIn("scope", errore.message.lower())
        self.assertIsNone(errore.code)


class TestToken(unittest.TestCase):
    def test_env_prevale(self):
        os.environ["SKILLPLATE_TOKEN"] = "  da-env  "
        try:
            from skillplate.client import resolve_token
            self.assertEqual(resolve_token(), "da-env")
        finally:
            del os.environ["SKILLPLATE_TOKEN"]

    def test_token_mancante(self):
        from skillplate.client import resolve_token

        vecchie = {k: os.environ.pop(k) for k in ("SKILLPLATE_TOKEN", "SKILLPLATE_TOKEN_FILE") if k in os.environ}
        # home isolata: il test non deve dipendere dai file dell'utente
        with tempfile.TemporaryDirectory() as home:
            vecchia_home = os.environ.get("HOME")
            os.environ["HOME"] = home
            try:
                with self.assertRaises(MissingTokenError):
                    resolve_token(token_path=os.path.join(home, "assente"))
            finally:
                if vecchia_home is None:
                    os.environ.pop("HOME", None)
                else:
                    os.environ["HOME"] = vecchia_home
                os.environ.update(vecchie)

    def test_token_letto_dal_file(self):
        from skillplate.client import resolve_token

        with tempfile.TemporaryDirectory() as cartella:
            percorso = os.path.join(cartella, "token")
            with open(percorso, "w", encoding="utf-8") as fh:
                fh.write("  dal-file\n")
            self.assertEqual(resolve_token(token_path=percorso), "dal-file")


class TestWebhook(unittest.TestCase):
    def test_firma_valida(self):
        payload = json.dumps({"event": "payment.succeeded", "items": [{"product_id": "prd_1"}]})
        firma = webhooks.compute_signature(payload, "segreto")
        evento = webhooks.parse_event(payload, "sha256=" + firma, "segreto")
        self.assertEqual(webhooks.product_ids(evento), ["prd_1"])

    def test_firma_non_valida(self):
        payload = '{"event":"user.created"}'
        with self.assertRaises(ValueError):
            webhooks.parse_event(payload, "sha256=deadbeef", "segreto")


if __name__ == "__main__":
    unittest.main(verbosity=2)
