"""Test della verifica di connessione."""

import unittest

from pickyassist import PickyAssistClient
from pickyassist.diagnostica import esito_finale, spiega_errore, verifica_connessione
from pickyassist.errors import ApiError, TransportError


class TrasportoFinto:
    def __init__(self, *risposte):
        self.risposte = list(risposte)
        self.chiamate = []

    def __call__(self, url, payload):
        self.chiamate.append((url, payload))
        risposta = self.risposte.pop(0) if self.risposte else {"status": 100}
        if isinstance(risposta, Exception):
            raise risposta
        return risposta


def client(*risposte):
    return PickyAssistClient(token="t", transport=TrasportoFinto(*risposte))


def verifica(*risposte, **kwargs):
    kwargs.setdefault("attesa_report", 0)
    kwargs.setdefault("pausa", lambda _s: None)
    return verifica_connessione(client(*risposte), "393331234567", **kwargs)


class TestSpiegaErrore(unittest.TestCase):
    def test_token_non_valido(self):
        controllo = spiega_errore(ApiError(401))
        self.assertFalse(controllo.ok)
        self.assertEqual(controllo.nome, "Token API")

    def test_credito(self):
        self.assertEqual(spiega_errore(ApiError(403)).nome, "Credito")

    def test_canale_non_raggiungibile(self):
        self.assertEqual(spiega_errore(ApiError(404)).nome, "Canale WhatsApp")

    def test_errore_di_template(self):
        controllo = spiega_errore(ApiError(500, {"message": "Template not approved"}))
        self.assertEqual(controllo.nome, "Messaggio")
        self.assertIn("template", controllo.da_fare.lower())

    def test_errore_di_rete(self):
        self.assertEqual(spiega_errore(TransportError("giù")).nome, "Rete")

    def test_eccezione_non_gestita_viene_rilanciata(self):
        with self.assertRaises(ZeroDivisionError):
            spiega_errore(ZeroDivisionError())


class TestVerificaConnessione(unittest.TestCase):
    def test_percorso_felice(self):
        controlli = verifica(
            {"status": 100, "push_id": "42"},
            {
                "status": 100,
                "push_id": "42",
                "data": [{"number": "393331234567", "msg_id": "m1", "status": "4"}],
            },
        )
        self.assertTrue(all(c.ok for c in controlli))
        self.assertEqual([c.nome for c in controlli], ["Token API", "Invio", "Consegna"])
        self.assertIn("Tutto a posto", esito_finale(controlli))

    def test_si_ferma_al_primo_errore(self):
        controlli = verifica({"status": 401})
        self.assertEqual([c.nome for c in controlli], ["Token API", "Token API"])
        self.assertFalse(controlli[-1].ok)
        self.assertIn("Token API", esito_finale(controlli))

    def test_messaggio_rimbalzato(self):
        controlli = verifica(
            {"status": 100, "push_id": "42"},
            {
                "status": 100,
                "data": [{"number": "393331234567", "status": "5", "error_code": "131049"}],
            },
        )
        consegna = controlli[-1]
        self.assertFalse(consegna.ok)
        self.assertIn("131049", consegna.dettaglio)

    def test_report_non_ancora_disponibile(self):
        controlli = verifica({"status": 100, "push_id": "42"}, {"status": 100, "data": []})
        self.assertTrue(controlli[-1].ok)
        self.assertIn("normale", controlli[-1].dettaglio)

    def test_errore_durante_il_report(self):
        controlli = verifica({"status": 100, "push_id": "42"}, TransportError("giù"))
        self.assertEqual(controlli[-1].nome, "Consegna")
        self.assertFalse(controlli[-1].ok)

    def test_invio_con_template(self):
        c = client({"status": 100, "push_id": "42"}, {"status": 100, "data": []})
        verifica_connessione(
            c, "393331234567", template_id="VG7935", variabili=["Mario"],
            attesa_report=0, pausa=lambda _s: None,
        )
        payload = c.transport.chiamate[0][1]
        self.assertEqual(payload["template_id"], "VG7935")
        self.assertEqual(payload["template_globalmessage"], ["Mario"])


if __name__ == "__main__":
    unittest.main()
