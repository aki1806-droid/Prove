"""Test del trasporto HTTP (urllib) con doppi di test."""

import io
import unittest
import urllib.error
from unittest import mock

from pickyassist._http import UrllibTransport
from pickyassist.errors import TransportError


def risposta_http(corpo: bytes):
    finta = mock.MagicMock()
    finta.read.return_value = corpo
    finta.__enter__.return_value = finta
    finta.__exit__.return_value = False
    return finta


class TestUrllibTransport(unittest.TestCase):
    def test_post_json(self):
        trasporto = UrllibTransport()
        with mock.patch("urllib.request.urlopen", return_value=risposta_http(b'{"status": 100}')) as urlopen:
            self.assertEqual(trasporto("https://esempio.it/push", {"a": 1}), {"status": 100})

        richiesta = urlopen.call_args[0][0]
        self.assertEqual(richiesta.data, b'{"a": 1}')
        self.assertEqual(richiesta.get_header("Content-type"), "application/json")

    def test_risposta_non_json(self):
        trasporto = UrllibTransport()
        with mock.patch("urllib.request.urlopen", return_value=risposta_http(b"<html>")):
            with self.assertRaises(TransportError):
                trasporto("https://esempio.it/push", {})

    def test_4xx_con_corpo_json_viene_restituito(self):
        errore = urllib.error.HTTPError(
            "https://esempio.it/push", 400, "Bad Request", {}, io.BytesIO(b'{"status": 401}')
        )
        trasporto = UrllibTransport()
        with mock.patch("urllib.request.urlopen", side_effect=errore):
            self.assertEqual(trasporto("https://esempio.it/push", {}), {"status": 401})

    def test_retry_sugli_errori_di_rete(self):
        errore = urllib.error.URLError("connessione rifiutata")
        esiti = [errore, errore, risposta_http(b'{"status": 100}')]
        trasporto = UrllibTransport(tentativi=3, pausa_iniziale=0)

        with mock.patch("urllib.request.urlopen", side_effect=esiti) as urlopen:
            self.assertEqual(trasporto("https://esempio.it/push", {}), {"status": 100})
        self.assertEqual(urlopen.call_count, 3)

    def test_errore_dopo_tutti_i_tentativi(self):
        trasporto = UrllibTransport(tentativi=2, pausa_iniziale=0)
        with mock.patch("urllib.request.urlopen", side_effect=urllib.error.URLError("ko")):
            with self.assertRaises(TransportError):
                trasporto("https://esempio.it/push", {})


if __name__ == "__main__":
    unittest.main()
