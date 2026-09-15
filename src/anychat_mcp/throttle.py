"""Controllo del ritmo di invio.

Due limiti distinti, entrambi imposti da Meta sui numeri WhatsApp Business:
- una velocita' istantanea (messaggi al secondo) -> token bucket in memoria;
- un tetto giornaliero legato al tier del numero -> contatore su disco, perche'
  deve sopravvivere al riavvio del server, altrimenti basta un restart per
  sforare il tier e far sospendere il numero.
"""

from __future__ import annotations

import asyncio
import json
import time
from dataclasses import dataclass
from datetime import date
from pathlib import Path


class QuotaExhausted(RuntimeError):
    """Il tetto giornaliero e' stato raggiunto."""


@dataclass
class Quota:
    day: str
    sent: int
    cap: int

    @property
    def remaining(self) -> int:
        return max(0, self.cap - self.sent)


class DailyCounter:
    """Contatore giornaliero persistito su file JSON."""

    def __init__(self, path: Path, cap: int) -> None:
        self._path = path
        self._cap = cap

    def _read(self) -> Quota:
        today = date.today().isoformat()
        try:
            raw = json.loads(self._path.read_text(encoding="utf-8"))
        except (FileNotFoundError, json.JSONDecodeError):
            return Quota(day=today, sent=0, cap=self._cap)
        # Un file di ieri vale zero: il tetto si azzera a mezzanotte.
        if raw.get("day") != today:
            return Quota(day=today, sent=0, cap=self._cap)
        return Quota(day=today, sent=int(raw.get("sent", 0)), cap=self._cap)

    def _write(self, quota: Quota) -> None:
        self._path.parent.mkdir(parents=True, exist_ok=True)
        tmp = self._path.with_suffix(".tmp")
        tmp.write_text(
            json.dumps({"day": quota.day, "sent": quota.sent}), encoding="utf-8"
        )
        tmp.replace(self._path)

    def snapshot(self) -> Quota:
        return self._read()

    def reserve(self, count: int) -> Quota:
        """Prenota `count` invii, o solleva QuotaExhausted se non ci stanno."""
        quota = self._read()
        if count > quota.remaining:
            raise QuotaExhausted(
                f"Il tetto giornaliero e' {quota.cap} messaggi, ne sono gia' stati "
                f"inviati {quota.sent}: ne restano {quota.remaining}, ne servono {count}."
            )
        quota.sent += count
        self._write(quota)
        return quota

    def refund(self, count: int) -> None:
        """Restituisce invii prenotati ma non partiti (errore prima dell'invio)."""
        quota = self._read()
        quota.sent = max(0, quota.sent - count)
        self._write(quota)


class RateLimiter:
    """Token bucket: al piu' `rate` operazioni al secondo, con attesa."""

    def __init__(self, rate: float) -> None:
        if rate <= 0:
            raise ValueError("Il rate deve essere positivo")
        self._interval = 1.0 / rate
        self._lock = asyncio.Lock()
        self._next_at = 0.0

    async def acquire(self) -> None:
        async with self._lock:
            now = time.monotonic()
            wait = self._next_at - now
            if wait > 0:
                await asyncio.sleep(wait)
                now = time.monotonic()
            self._next_at = now + self._interval
