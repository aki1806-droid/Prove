"""Normalizzazione e pulizia delle liste destinatari.

Una lista di contatti reale arriva sporca: numeri scritti in dieci modi
diversi, duplicati, prefissi nazionali impliciti. Ogni numero malformato e' una
chiamata sprecata che consuma comunque il tetto giornaliero, quindi la lista si
pulisce prima di partire, non durante.
"""

from __future__ import annotations

import csv
import re
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any, Iterable

# E.164: da 8 a 15 cifre, prefisso internazionale incluso.
MIN_DIGITS = 8
MAX_DIGITS = 15
_NON_DIGIT = re.compile(r"[^\d+]")


class RecipientError(ValueError):
    """Destinatario non normalizzabile."""


@dataclass
class Recipient:
    phone: str
    variables: dict[str, Any] = field(default_factory=dict)


@dataclass
class CleanedList:
    recipients: list[Recipient]
    scartati: list[dict[str, str]]
    duplicati: int

    def summary(self) -> dict[str, Any]:
        return {
            "validi": len(self.recipients),
            "scartati": len(self.scartati),
            "duplicati_rimossi": self.duplicati,
        }


def normalize_phone(raw: str, default_country_code: str = "") -> str:
    """Porta un numero in formato E.164 (+<prefisso><numero>).

    `default_country_code` (es. "39") si applica ai numeri scritti in forma
    nazionale. Senza di esso un numero nazionale viene rifiutato invece che
    indovinato: mandare a un prefisso sbagliato e' peggio che non mandare.
    """
    if not raw or not str(raw).strip():
        raise RecipientError("numero vuoto")

    text = _NON_DIGIT.sub("", str(raw).strip())

    if text.startswith("00"):
        text = "+" + text[2:]

    if not text.startswith("+"):
        cc = _NON_DIGIT.sub("", default_country_code).lstrip("+")
        if not cc:
            raise RecipientError(
                f"{raw!r} non e' in formato internazionale e non e' impostato "
                "ANYCHAT_DEFAULT_COUNTRY_CODE"
            )
        # Lo zero iniziale e' il prefisso interurbano nazionale: in E.164 cade.
        text = "+" + cc + text.lstrip("0")

    digits = text[1:]
    if not digits.isdigit():
        raise RecipientError(f"{raw!r} contiene caratteri non validi")
    if not MIN_DIGITS <= len(digits) <= MAX_DIGITS:
        raise RecipientError(
            f"{raw!r} ha {len(digits)} cifre, fuori dall'intervallo E.164 "
            f"({MIN_DIGITS}-{MAX_DIGITS})"
        )
    return "+" + digits


def clean_recipients(
    rows: Iterable[dict[str, Any]], default_country_code: str = ""
) -> CleanedList:
    """Normalizza, valida e deduplica una lista di destinatari."""
    validi: list[Recipient] = []
    scartati: list[dict[str, str]] = []
    visti: set[str] = set()
    duplicati = 0

    for row in rows:
        raw = row.get("phone") or row.get("telefono") or row.get("numero") or ""
        try:
            phone = normalize_phone(str(raw), default_country_code)
        except RecipientError as exc:
            scartati.append({"valore": str(raw), "motivo": str(exc)})
            continue

        if phone in visti:
            duplicati += 1
            continue
        visti.add(phone)

        variables = row.get("variables")
        if not isinstance(variables, dict):
            # In un CSV le variabili sono le altre colonne.
            variables = {
                k: v
                for k, v in row.items()
                if k not in {"phone", "telefono", "numero", "variables"}
            }
        validi.append(Recipient(phone=phone, variables=variables))

    return CleanedList(recipients=validi, scartati=scartati, duplicati=duplicati)


def load_csv(path: Path, default_country_code: str = "") -> CleanedList:
    """Carica destinatari da CSV. Una colonna phone/telefono/numero, il resto variabili."""
    if not path.exists():
        raise RecipientError(f"file non trovato: {path}")
    with path.open(newline="", encoding="utf-8-sig") as handle:
        rows = list(csv.DictReader(handle))
    if not rows:
        raise RecipientError(f"{path} non contiene righe")
    intestazioni = set(rows[0].keys())
    if not intestazioni & {"phone", "telefono", "numero"}:
        raise RecipientError(
            f"{path} non ha una colonna phone, telefono o numero. "
            f"Colonne trovate: {sorted(intestazioni)}"
        )
    return clean_recipients(rows, default_country_code)
