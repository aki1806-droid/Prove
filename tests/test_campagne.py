"""Test degli invii massivi."""

import csv
import os
import tempfile
import unittest

from pickyassist import PickyAssistClient
from pickyassist.campagne import (
    Campagna,
    Contatto,
    leggi_contatti,
    leggi_esclusi,
    salva_esito,
)
from pickyassist.errors import PickyAssistError


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


def client(*risposte):
    return PickyAssistClient(token="t", transport=TrasportoFinto(*risposte))


def contatti(*coppie):
    return [Contatto(numero=n, campi={"numero": n, "nome": nome}) for n, nome in coppie]


class TestLetturaFile(unittest.TestCase):
    def setUp(self):
        self.dir = tempfile.TemporaryDirectory()
        self.addCleanup(self.dir.cleanup)

    def _scrivi(self, nome, testo):
        percorso = os.path.join(self.dir.name, nome)
        with open(percorso, "w", encoding="utf-8") as f:
            f.write(testo)
        return percorso

    def test_leggi_contatti(self):
        percorso = self._scrivi(
            "c.csv", "numero,nome\n393331111111,Mario\n393332222222,Lucia\n\n"
        )
        letti = leggi_contatti(percorso)
        self.assertEqual(len(letti), 2)
        self.assertEqual(letti[0].campi["nome"], "Mario")

    def test_colonna_numero_mancante(self):
        percorso = self._scrivi("c.csv", "telefono,nome\n393331111111,Mario\n")
        with self.assertRaises(PickyAssistError):
            leggi_contatti(percorso)

    def test_colonna_numero_personalizzata(self):
        percorso = self._scrivi("c.csv", "telefono,nome\n393331111111,Mario\n")
        self.assertEqual(len(leggi_contatti(percorso, colonna_numero="telefono")), 1)

    def test_leggi_esclusi(self):
        percorso = self._scrivi("e.txt", "# opt-out\n+39 333 111 1111\n\nnon-valido\n")
        self.assertEqual(leggi_esclusi(percorso), ["393331111111"])

    def test_salva_esito(self):
        c = client()
        esito = Campagna(c).esegui(contatti(("393331111111", "Mario")), messaggio="ciao")
        percorso = os.path.join(self.dir.name, "esito.csv")
        salva_esito(percorso, esito)

        with open(percorso, encoding="utf-8") as f:
            righe = list(csv.DictReader(f))
        self.assertEqual(righe[0]["esito"], "ok")
        self.assertEqual(righe[0]["destinatari"], "1")


class TestCampagna(unittest.TestCase):
    def test_personalizzazione_messaggio(self):
        c = client()
        Campagna(c, pausa=0).esegui(contatti(("393331111111", "Mario")), messaggio="Ciao {nome}!")
        self.assertEqual(
            c.transport.ultimo_payload["data"],
            [{"number": "393331111111", "message": "Ciao Mario!"}],
        )

    def test_segnaposto_sconosciuto_resta_invariato(self):
        c = client()
        Campagna(c, pausa=0).esegui(contatti(("393331111111", "Mario")), messaggio="Ciao {cognome}")
        self.assertEqual(c.transport.ultimo_payload["data"][0]["message"], "Ciao {cognome}")

    def test_divisione_in_lotti(self):
        c = client({"status": 100, "push_id": "1"}, {"status": 100, "push_id": "2"})
        lista = contatti(*[(f"39333111{i:04d}", f"N{i}") for i in range(5)])
        esito = Campagna(c, dimensione_lotto=3, pausa=0).esegui(lista, messaggio="ciao")

        self.assertEqual(len(esito.lotti), 2)
        self.assertEqual(esito.inviati, 5)
        self.assertEqual(esito.push_ids, ["1", "2"])
        self.assertEqual(len(c.transport.chiamate), 2)

    def test_esclusi_e_duplicati(self):
        c = client()
        lista = contatti(
            ("393331111111", "Mario"),
            ("+39 333 111 1111", "Mario"),
            ("393332222222", "Lucia"),
            ("393339999999", "Escluso"),
        )
        esito = Campagna(c, pausa=0, esclusi=["+393339999999"]).esegui(lista, messaggio="ciao")

        numeri = [d["number"] for d in c.transport.ultimo_payload["data"]]
        self.assertEqual(numeri, ["393331111111", "393332222222"])
        motivi = sorted(s["motivo"] for s in esito.scartati)
        self.assertEqual(motivi, ["duplicato", "in lista esclusi"])

    def test_numero_non_valido_scartato(self):
        c = client()
        lista = [Contatto(numero="ciao", campi={}), Contatto(numero="393331111111", campi={})]
        esito = Campagna(c, pausa=0).esegui(lista, messaggio="ciao")
        self.assertEqual(esito.scartati[0]["motivo"], "numero non valido")
        self.assertEqual(esito.inviati, 1)

    def test_un_lotto_fallito_non_ferma_la_campagna(self):
        c = client({"status": 403}, {"status": 100, "push_id": "2"})
        lista = contatti(*[(f"39333111{i:04d}", f"N{i}") for i in range(4)])
        esito = Campagna(c, dimensione_lotto=2, pausa=0).esegui(lista, messaggio="ciao")

        self.assertEqual(esito.inviati, 2)
        self.assertEqual(esito.falliti, 2)
        self.assertEqual(esito.numeri_falliti, ["393331110000", "393331110001"])
        self.assertIn("403", esito.lotti[0].errore)

    def test_prova_non_invia(self):
        c = client()
        esito = Campagna(c, pausa=0).esegui(contatti(("393331111111", "Mario")), messaggio="ciao", prova=True)
        self.assertEqual(c.transport.chiamate, [])
        self.assertEqual(esito.lotti[0].push_id, "PROVA")

    def test_progresso(self):
        c = client()
        visti = []
        Campagna(c, dimensione_lotto=1, pausa=0).esegui(
            contatti(("393331111111", "Mario"), ("393332222222", "Lucia")),
            messaggio="ciao",
            su_progresso=visti.append,
        )
        self.assertEqual([l.indice for l in visti], [1, 2])

    def test_serve_messaggio_o_template(self):
        with self.assertRaises(ValueError):
            Campagna(client()).esegui(contatti(("393331111111", "Mario")))


class TestCampagnaTemplate(unittest.TestCase):
    def test_invio_template_con_variabili_da_colonne(self):
        c = client()
        lista = [
            Contatto(numero="393331111111", campi={"nome": "Mario", "ordine": "A1"}),
            Contatto(numero="393332222222", campi={"nome": "Lucia", "ordine": "B2"}),
        ]
        Campagna(c, pausa=0).esegui(
            lista, template_id="VG7935", lingua="it", variabili=["nome", "ordine"]
        )

        payload = c.transport.ultimo_payload
        self.assertEqual(payload["template_id"], "VG7935")
        self.assertEqual(
            payload["data"],
            [
                {"number": "393331111111", "template_message": ["Mario", "A1"], "language": "it"},
                {"number": "393332222222", "template_message": ["Lucia", "B2"], "language": "it"},
            ],
        )

    def test_colonna_mancante_scarta_il_contatto(self):
        c = client()
        lista = [Contatto(numero="393331111111", campi={"nome": "Mario"})]
        esito = Campagna(c, pausa=0).esegui(
            lista, template_id="VG7935", variabili=["nome", "ordine"]
        )
        self.assertEqual(esito.scartati[0]["motivo"], "colonna mancante: ordine")
        self.assertEqual(esito.lotti, [])


class TestRaccoltaReport(unittest.TestCase):
    def test_report_per_push_id(self):
        c = client(
            {"status": 100, "push_id": "1"},
            {
                "status": 100,
                "push_id": "1",
                "data": [{"number": "393331111111", "msg_id": "m1", "status": "4"}],
            },
        )
        campagna = Campagna(c, pausa=0)
        esito = campagna.esegui(contatti(("393331111111", "Mario")), messaggio="ciao")
        righe = campagna.raccogli_report(esito)

        self.assertEqual(righe[0]["numero"], "393331111111")
        self.assertEqual(righe[0]["stato"], "Inviato al canale")


if __name__ == "__main__":
    unittest.main()
