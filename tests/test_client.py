"""Test del client Push / Delivery Report con trasporto simulato."""

import unittest

from pickyassist import (
    ApiStatus,
    Application,
    AuthenticationError,
    Destinatario,
    InsufficientBalanceError,
    PickyAssistClient,
    PickyAssistError,
)
from pickyassist.errors import ApiError


class TrasportoFinto:
    """Registra le chiamate e restituisce risposte preconfezionate."""

    def __init__(self, *risposte):
        self.risposte = list(risposte)
        self.chiamate = []

    def __call__(self, url, payload):
        self.chiamate.append((url, payload))
        return self.risposte.pop(0) if self.risposte else {"status": 100}

    @property
    def ultimo_payload(self):
        return self.chiamate[-1][1]


def client(*risposte, **kwargs):
    kwargs.setdefault("token", "token-di-test")
    return PickyAssistClient(transport=TrasportoFinto(*risposte), **kwargs)


class TestCostruzione(unittest.TestCase):
    def test_token_dall_ambiente(self):
        import os

        os.environ["PICKY_API_TOKEN"] = "dal-env"
        try:
            self.assertEqual(PickyAssistClient(transport=TrasportoFinto()).token, "dal-env")
        finally:
            del os.environ["PICKY_API_TOKEN"]

    def test_token_mancante(self):
        import os

        vecchio = os.environ.pop("PICKY_API_TOKEN", None)
        try:
            with self.assertRaises(PickyAssistError):
                PickyAssistClient(transport=TrasportoFinto())
        finally:
            if vecchio is not None:
                os.environ["PICKY_API_TOKEN"] = vecchio

    def test_repr_non_espone_il_token(self):
        self.assertNotIn("token-di-test", repr(client()))


class TestPush(unittest.TestCase):
    def test_messaggio_singolo(self):
        c = client({"status": 100, "push_id": "42", "message": "Success"})
        esito = c.invia_messaggio("+39 333 123 4567", "Ciao!")

        self.assertTrue(esito.ok)
        self.assertEqual(esito.push_id, "42")

        url, payload = c.transport.chiamate[0]
        self.assertEqual(url, "https://pickyassist.com/app/api/v2/push")
        self.assertEqual(payload["token"], "token-di-test")
        self.assertEqual(payload["application"], str(int(Application.WHATSAPP_OFFICIAL)))
        self.assertEqual(payload["data"], [{"number": "393331234567", "message": "Ciao!"}])

    def test_application_sovrascrivibile_per_chiamata(self):
        c = client()
        c.invia_messaggio("393331234567", "ciao", application=Application.SMS)
        self.assertEqual(c.transport.ultimo_payload["application"], "3")

    def test_bulk_con_formati_misti(self):
        c = client()
        c.invia_bulk(
            [
                "393331111111",
                {"number": "+39 333 222 2222", "message": "personalizzato"},
                Destinatario(numero="393333333333", media_url="https://esempio.it/a.pdf"),
            ],
            messaggio_globale="Testo comune",
        )

        payload = c.transport.ultimo_payload
        self.assertEqual(payload["globalmessage"], "Testo comune")
        self.assertEqual(
            payload["data"],
            [
                {"number": "393331111111"},
                {"number": "393332222222", "message": "personalizzato"},
                {"number": "393333333333", "media_url": "https://esempio.it/a.pdf"},
            ],
        )

    def test_campi_extra_del_destinatario(self):
        c = client()
        c.push([Destinatario(numero="393331234567", extra={"var1": "Mario"})])
        self.assertEqual(c.transport.ultimo_payload["data"][0]["var1"], "Mario")

    def test_lista_vuota(self):
        with self.assertRaises(ValueError):
            client().push([])

    def test_numero_non_valido(self):
        with self.assertRaises(ValueError):
            client().invia_messaggio("non-un-numero", "ciao")


class TestErrori(unittest.TestCase):
    def test_autenticazione_fallita(self):
        c = client({"status": 401, "message": "Authentication Failed"})
        with self.assertRaises(AuthenticationError) as ctx:
            c.invia_messaggio("393331234567", "ciao")
        self.assertEqual(ctx.exception.status, ApiStatus.AUTENTICAZIONE_FALLITA)

    def test_credito_insufficiente(self):
        c = client({"status": 403})
        with self.assertRaises(InsufficientBalanceError):
            c.invia_messaggio("393331234567", "ciao")

    def test_codice_non_documentato(self):
        c = client({"status": 999, "message": "Boom"})
        with self.assertRaises(ApiError) as ctx:
            c.invia_messaggio("393331234567", "ciao")
        self.assertEqual(ctx.exception.status, 999)
        self.assertIn("Boom", str(ctx.exception))


class TestDeliveryReport(unittest.TestCase):
    def test_parsing(self):
        c = client(
            {
                "status": 100,
                "push_id": "42",
                "project_id": "7",
                "application": "8",
                "data": [
                    {"number": "393331234567", "msg_id": "m1", "status": "4", "error_code": ""},
                    {"number": "393339999999", "msg_id": "m2", "status": "5", "error_code": "12"},
                ],
            }
        )
        report = c.delivery_report("42")

        self.assertTrue(report.ok)
        self.assertEqual(report.application, 8)
        self.assertEqual(len(report.messaggi), 2)
        self.assertEqual(report.messaggi[0].descrizione_stato, "Inviato al canale")
        self.assertEqual(report.messaggi[1].descrizione_stato, "Rimborsato (messaggio fallito)")

        url, payload = c.transport.chiamate[0]
        self.assertTrue(url.endswith("/delivery-report"))
        self.assertEqual(payload, {"token": "token-di-test", "push_id": "42"})


if __name__ == "__main__":
    unittest.main()
