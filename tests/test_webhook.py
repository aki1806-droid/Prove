"""Test del parsing dei webhook e dell'app WSGI."""

import json
import unittest
from io import BytesIO

from pickyassist import EventoWebhook, MessaggioInEntrata, crea_wsgi_app, risposta
from pickyassist.webhook import nessuna_risposta


def chiama(app, payload, *, path="/", metodo="POST", query="", headers=None):
    """Esegue una richiesta contro l'app WSGI e ritorna (stato, corpo)."""

    grezzo = payload if isinstance(payload, bytes) else json.dumps(payload).encode("utf-8")
    environ = {
        "REQUEST_METHOD": metodo,
        "PATH_INFO": path,
        "QUERY_STRING": query,
        "CONTENT_LENGTH": str(len(grezzo)),
        "wsgi.input": BytesIO(grezzo),
    }
    environ.update(headers or {})

    catturato = {}

    def start_response(stato, intestazioni):
        catturato["stato"] = stato
        catturato["headers"] = dict(intestazioni)

    corpo = b"".join(app(environ, start_response))
    return catturato["stato"], json.loads(corpo)


PAYLOAD_IN_ENTRATA = {
    "number": "393331234567",
    "message-in": "Ciao+come+va%3F",
    "type": "text",
    "application": "8",
    "unique-id": "abc123",
    "project-id": "7",
    "direction": "in",
    "name": "Mario Rossi",
}


class TestMessaggioInEntrata(unittest.TestCase):
    def test_decodifica_message_in(self):
        msg = MessaggioInEntrata.from_payload(PAYLOAD_IN_ENTRATA)
        self.assertEqual(msg.testo, "Ciao come va?")
        self.assertEqual(msg.numero, "393331234567")
        self.assertEqual(msg.nome, "Mario Rossi")
        self.assertEqual(msg.application, 8)
        self.assertEqual(msg.unique_id, "abc123")

    def test_preferisce_message_in_raw(self):
        payload = dict(PAYLOAD_IN_ENTRATA, message_in_raw="Ciao come va?")
        self.assertEqual(MessaggioInEntrata.from_payload(payload).testo, "Ciao come va?")

    def test_payload_minimo(self):
        msg = MessaggioInEntrata.from_payload({"number": "393331234567"})
        self.assertEqual(msg.testo, "")
        self.assertIsNone(msg.application)


class TestRisposta(unittest.TestCase):
    def test_senza_delay(self):
        self.assertEqual(risposta("ok"), {"message-out": "ok"})

    def test_con_delay(self):
        self.assertEqual(risposta("ok", 30), {"message-out": "ok", "delay": "30"})

    def test_delay_oltre_il_massimo(self):
        with self.assertRaises(ValueError):
            risposta("ok", 3601)


class TestEventoWebhook(unittest.TestCase):
    def test_report_da_lista(self):
        evento = EventoWebhook.from_payload(
            {
                "event": "delivery_report",
                "push_id": "42",
                "data": [{"number": "393331234567", "msg_id": "m1", "status": "4"}],
            }
        )
        self.assertEqual(evento.tipo, "delivery_report")
        self.assertEqual(evento.push_id, "42")
        self.assertEqual(evento.report[0].msg_id, "m1")

    def test_report_da_evento_singolo(self):
        evento = EventoWebhook.from_payload({"number": "393331234567", "status": "5"})
        self.assertEqual(len(evento.report), 1)
        self.assertEqual(evento.report[0].descrizione_stato, "Rimborsato (messaggio fallito)")

    def test_evento_senza_report(self):
        self.assertEqual(EventoWebhook.from_payload({"event": "qualcosa"}).report, [])


class TestWsgiApp(unittest.TestCase):
    def test_replica_al_messaggio(self):
        app = crea_wsgi_app(lambda msg: risposta(f"Ciao {msg.nome}!"))
        stato, corpo = chiama(app, PAYLOAD_IN_ENTRATA)
        self.assertEqual(stato, "200 OK")
        self.assertEqual(corpo, {"message-out": "Ciao Mario Rossi!"})

    def test_nessuna_replica(self):
        app = crea_wsgi_app(lambda msg: nessuna_risposta())
        _, corpo = chiama(app, PAYLOAD_IN_ENTRATA)
        self.assertEqual(corpo, {})

    def test_instradamento_eventi(self):
        ricevuti = []
        app = crea_wsgi_app(gestore_eventi=ricevuti.append, percorso_eventi="/eventi")
        stato, corpo = chiama(app, {"event": "delivery_report", "push_id": "42"}, path="/eventi")
        self.assertEqual(stato, "200 OK")
        self.assertEqual(corpo, {})
        self.assertEqual(ricevuti[0].push_id, "42")

    def test_metodo_non_consentito(self):
        stato, _ = chiama(crea_wsgi_app(), {}, metodo="GET")
        self.assertEqual(stato, "405 Method Not Allowed")

    def test_json_non_valido(self):
        stato, corpo = chiama(crea_wsgi_app(), b"non-json")
        self.assertEqual(stato, "400 Bad Request")
        self.assertIn("JSON", corpo["errore"])

    def test_segreto_richiesto(self):
        app = crea_wsgi_app(lambda msg: risposta("ok"), segreto="s3greto")

        stato, _ = chiama(app, PAYLOAD_IN_ENTRATA)
        self.assertEqual(stato, "403 Forbidden")

        stato, _ = chiama(app, PAYLOAD_IN_ENTRATA, query="secret=sbagliato")
        self.assertEqual(stato, "403 Forbidden")

        stato, corpo = chiama(app, PAYLOAD_IN_ENTRATA, query="secret=s3greto")
        self.assertEqual(stato, "200 OK")
        self.assertEqual(corpo, {"message-out": "ok"})

        stato, _ = chiama(
            app, PAYLOAD_IN_ENTRATA, headers={"HTTP_X_WEBHOOK_SECRET": "s3greto"}
        )
        self.assertEqual(stato, "200 OK")


if __name__ == "__main__":
    unittest.main()
