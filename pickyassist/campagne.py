"""Invii massivi: lettura della lista contatti, invio a lotti, esiti.

Pensato per le campagne: si parte da un file CSV di contatti, si spedisce in
lotti con una pausa tra l'uno e l'altro, e si salva un file di esito che
permette di sapere cosa è partito e cosa no.

Nota importante: un lotto che fallisce non interrompe la campagna. L'errore
viene registrato nell'esito, così i contatti rimasti fuori si possono
rispedire senza rimandare il messaggio a chi l'ha già ricevuto.
"""

import csv
import time
from dataclasses import dataclass, field
from typing import Any, Callable, Dict, Iterable, List, Optional, Sequence

from .errors import ApiError, PickyAssistError
from .models import Destinatario, _normalizza_numero

#: Quanti destinatari per richiesta. Lotti piccoli = errori più circoscritti.
DIMENSIONE_LOTTO = 100

#: Pausa in secondi tra un lotto e il successivo.
PAUSA_TRA_LOTTI = 1.0


@dataclass
class Contatto:
    """Una riga della lista contatti."""

    numero: str
    campi: Dict[str, str] = field(default_factory=dict)

    @property
    def numero_normalizzato(self) -> str:
        return _normalizza_numero(self.numero)


@dataclass
class EsitoLotto:
    """Come è andato un singolo lotto."""

    indice: int
    numeri: List[str]
    push_id: Optional[str] = None
    errore: Optional[str] = None

    @property
    def ok(self) -> bool:
        return self.errore is None


@dataclass
class EsitoCampagna:
    """Riepilogo completo di una campagna."""

    lotti: List[EsitoLotto] = field(default_factory=list)
    scartati: List[Dict[str, str]] = field(default_factory=list)
    #: Primi messaggi pronti per la spedizione, per controllarli prima di inviare.
    anteprima: List[Dict[str, Any]] = field(default_factory=list)

    @property
    def inviati(self) -> int:
        return sum(len(l.numeri) for l in self.lotti if l.ok)

    @property
    def falliti(self) -> int:
        return sum(len(l.numeri) for l in self.lotti if not l.ok)

    @property
    def push_ids(self) -> List[str]:
        return [l.push_id for l in self.lotti if l.push_id]

    @property
    def numeri_falliti(self) -> List[str]:
        return [n for l in self.lotti if not l.ok for n in l.numeri]

    def riepilogo(self, prova: bool = False) -> str:
        righe = [
            ("Destinatari che riceverebbero il messaggio: " if prova else "Destinatari inviati: ")
            + str(self.inviati),
            f"Destinatari falliti: {self.falliti}",
            f"Scartati prima dell'invio: {len(self.scartati)}",
            f"Lotti: {len(self.lotti)}",
        ]
        for lotto in self.lotti:
            if not lotto.ok:
                righe.append(f"  lotto {lotto.indice}: {lotto.errore}")
        return "\n".join(righe)


# --------------------------------------------------------------- lista contatti


def leggi_contatti(percorso: str, colonna_numero: str = "numero") -> List[Contatto]:
    """Legge un CSV con intestazione e restituisce i contatti.

    Il file deve avere una colonna con i numeri (``numero`` per default); tutte
    le altre colonne restano disponibili per personalizzare il messaggio.
    """

    contatti: List[Contatto] = []
    with open(percorso, newline="", encoding="utf-8-sig") as f:
        lettore = csv.DictReader(f)
        if lettore.fieldnames is None or colonna_numero not in lettore.fieldnames:
            raise PickyAssistError(
                f"nel file {percorso} manca la colonna '{colonna_numero}'; "
                f"colonne trovate: {lettore.fieldnames}"
            )
        for riga in lettore:
            numero = (riga.get(colonna_numero) or "").strip()
            if not numero:
                continue
            campi = {k: (v or "").strip() for k, v in riga.items() if k}
            contatti.append(Contatto(numero=numero, campi=campi))
    return contatti


def leggi_esclusi(percorso: str) -> List[str]:
    """Legge una lista di numeri da non contattare (uno per riga)."""

    esclusi = []
    with open(percorso, encoding="utf-8-sig") as f:
        for riga in f:
            riga = riga.strip()
            if riga and not riga.startswith("#"):
                try:
                    esclusi.append(_normalizza_numero(riga))
                except ValueError:
                    continue
    return esclusi


# -------------------------------------------------------------------- campagna


class Campagna:
    """Esegue un invio massivo a lotti."""

    def __init__(
        self,
        client,
        *,
        dimensione_lotto: int = DIMENSIONE_LOTTO,
        pausa: float = PAUSA_TRA_LOTTI,
        esclusi: Iterable[str] = (),
    ):
        self.client = client
        self.dimensione_lotto = max(1, dimensione_lotto)
        self.pausa = pausa
        self.esclusi = {_normalizza_numero(n) for n in esclusi if str(n).strip()}

    def esegui(
        self,
        contatti: Iterable[Contatto],
        *,
        messaggio: Optional[str] = None,
        template_id: Optional[str] = None,
        lingua: str = "it",
        variabili: Sequence[str] = (),
        su_progresso: Optional[Callable[[EsitoLotto], None]] = None,
        prova: bool = False,
    ) -> EsitoCampagna:
        """Manda il messaggio a tutta la lista.

        ``messaggio`` può contenere segnaposto tra graffe che vengono sostituiti
        con le colonne del CSV, es. ``"Ciao {nome}"``. In alternativa, con
        ``template_id`` si invia un template approvato e ``variabili`` elenca i
        nomi delle colonne da passare, nell'ordine del template.

        Con ``prova=True`` non viene inviato nulla: serve a controllare la lista
        e i testi prima di spendere credito.
        """

        if not messaggio and not template_id:
            raise ValueError("serve 'messaggio' oppure 'template_id'")

        esito = EsitoCampagna()
        destinatari = self._prepara(contatti, messaggio, template_id, lingua, variabili, esito)
        esito.anteprima = [d.to_payload() for d in destinatari[:3]]

        for indice, lotto in enumerate(_a_lotti(destinatari, self.dimensione_lotto), start=1):
            numeri = [d.numero for d in lotto]
            if prova:
                esito.lotti.append(EsitoLotto(indice=indice, numeri=numeri, push_id="PROVA"))
            else:
                esito.lotti.append(self._invia_lotto(indice, lotto, numeri, template_id, lingua))
                if self.pausa and indice < _numero_lotti(destinatari, self.dimensione_lotto):
                    time.sleep(self.pausa)
            if su_progresso:
                su_progresso(esito.lotti[-1])

        return esito

    def _invia_lotto(self, indice, lotto, numeri, template_id, lingua) -> EsitoLotto:
        try:
            if template_id:
                risposta = self.client.invia_template(lotto, template_id, lingua=lingua)
            else:
                risposta = self.client.invia_bulk(lotto)
            return EsitoLotto(indice=indice, numeri=numeri, push_id=risposta.push_id)
        except ApiError as exc:
            return EsitoLotto(indice=indice, numeri=numeri, errore=str(exc))
        except PickyAssistError as exc:
            return EsitoLotto(indice=indice, numeri=numeri, errore=f"rete: {exc}")

    def _prepara(self, contatti, messaggio, template_id, lingua, variabili, esito):
        """Normalizza, scarta i numeri non validi, esclusi e duplicati."""

        destinatari: List[Destinatario] = []
        visti = set()

        for contatto in contatti:
            try:
                numero = contatto.numero_normalizzato
            except ValueError:
                esito.scartati.append({"numero": contatto.numero, "motivo": "numero non valido"})
                continue
            if numero in self.esclusi:
                esito.scartati.append({"numero": numero, "motivo": "in lista esclusi"})
                continue
            if numero in visti:
                esito.scartati.append({"numero": numero, "motivo": "duplicato"})
                continue
            visti.add(numero)

            if template_id:
                try:
                    valori = [contatto.campi[nome] for nome in variabili]
                except KeyError as exc:
                    esito.scartati.append(
                        {"numero": numero, "motivo": f"colonna mancante: {exc.args[0]}"}
                    )
                    continue
                destinatari.append(
                    Destinatario(numero=numero, template_variabili=valori, lingua=lingua)
                )
            else:
                destinatari.append(
                    Destinatario(numero=numero, messaggio=_personalizza(messaggio, contatto.campi))
                )

        return destinatari

    def raccogli_report(self, esito: EsitoCampagna) -> List[Dict[str, Any]]:
        """Scarica i delivery report di tutti i lotti andati a buon fine."""

        righe: List[Dict[str, Any]] = []
        for push_id in esito.push_ids:
            if push_id == "PROVA":
                continue
            try:
                report = self.client.delivery_report(push_id)
            except PickyAssistError as exc:
                righe.append({"push_id": push_id, "numero": "", "stato": f"errore: {exc}"})
                continue
            for messaggio in report.messaggi:
                righe.append(
                    {
                        "push_id": push_id,
                        "numero": messaggio.numero,
                        "msg_id": messaggio.msg_id or "",
                        "stato": messaggio.descrizione_stato,
                        "codice_errore": messaggio.error_code or "",
                    }
                )
        return righe


# ----------------------------------------------------------------- salvataggio


def scrivi_csv(percorso: str, righe: Sequence[Dict[str, Any]], colonne: Sequence[str]) -> None:
    """Salva delle righe in CSV, creando l'intestazione."""

    with open(percorso, "w", newline="", encoding="utf-8") as f:
        scrittore = csv.DictWriter(f, fieldnames=list(colonne))
        scrittore.writeheader()
        for riga in righe:
            scrittore.writerow({c: riga.get(c, "") for c in colonne})


def salva_esito(percorso: str, esito: EsitoCampagna) -> None:
    """Salva l'esito per lotto: utile per capire cosa rispedire."""

    righe = [
        {
            "lotto": lotto.indice,
            "destinatari": len(lotto.numeri),
            "push_id": lotto.push_id or "",
            "esito": "ok" if lotto.ok else "errore",
            "dettaglio": lotto.errore or "",
            "numeri": " ".join(lotto.numeri),
        }
        for lotto in esito.lotti
    ]
    scrivi_csv(
        percorso, righe, ["lotto", "destinatari", "push_id", "esito", "dettaglio", "numeri"]
    )


# --------------------------------------------------------------------- interni


def _personalizza(testo: str, campi: Dict[str, str]) -> str:
    """Sostituisce i segnaposto ``{colonna}`` con i valori del contatto.

    I segnaposto senza colonna corrispondente restano invariati invece di far
    fallire l'invio.
    """

    class _Campi(dict):
        def __missing__(self, chiave):
            return "{" + chiave + "}"

    try:
        return testo.format_map(_Campi(campi))
    except (IndexError, ValueError):
        # Graffe usate come testo normale: meglio spedire il testo così com'è.
        return testo


def _a_lotti(elementi: Sequence[Any], dimensione: int):
    for inizio in range(0, len(elementi), dimensione):
        yield elementi[inizio : inizio + dimensione]


def _numero_lotti(elementi: Sequence[Any], dimensione: int) -> int:
    return (len(elementi) + dimensione - 1) // dimensione
