"""Registro degli invii, per non mandare due volte lo stesso messaggio.

Un invio massivo si interrompe: rete che cade, tetto giornaliero raggiunto,
processo ucciso. Senza registro, rilanciare la campagna significa riscrivere a
chi aveva gia' ricevuto, che e' il modo piu' rapido per farsi segnalare come
spam. Il registro e' append-only su JSONL: sopravvive ai riavvii e permette di
riprendere esattamente da dove ci si era fermati.
"""

from __future__ import annotations

import json
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path
from typing import Any


@dataclass
class CampaignProgress:
    campaign_id: str
    inviati: set[str]
    falliti: set[str]

    @property
    def totale_inviati(self) -> int:
        return len(self.inviati)


class SendLog:
    def __init__(self, path: Path) -> None:
        self._path = path

    def _iter_rows(self) -> list[dict[str, Any]]:
        try:
            text = self._path.read_text(encoding="utf-8")
        except FileNotFoundError:
            return []
        rows: list[dict[str, Any]] = []
        for line in text.splitlines():
            line = line.strip()
            if not line:
                continue
            try:
                rows.append(json.loads(line))
            except json.JSONDecodeError:
                # Una riga troncata da un crash non deve invalidare il registro.
                continue
        return rows

    def record(
        self, campaign_id: str, phone: str, *, riuscito: bool, detail: str = ""
    ) -> None:
        self._path.parent.mkdir(parents=True, exist_ok=True)
        row = {
            "campaign_id": campaign_id,
            "phone": phone,
            "riuscito": riuscito,
            "detail": detail[:300],
            "ts": datetime.now(timezone.utc).isoformat(),
        }
        with self._path.open("a", encoding="utf-8") as handle:
            handle.write(json.dumps(row, ensure_ascii=False) + "\n")
            # Flush esplicito: se il processo muore subito dopo l'invio, la riga
            # deve essere gia' su disco, altrimenti al riavvio si rimanda.
            handle.flush()

    def progress(self, campaign_id: str) -> CampaignProgress:
        inviati: set[str] = set()
        falliti: set[str] = set()
        for row in self._iter_rows():
            if row.get("campaign_id") != campaign_id:
                continue
            phone = str(row.get("phone", ""))
            if row.get("riuscito"):
                inviati.add(phone)
                falliti.discard(phone)
            elif phone not in inviati:
                falliti.add(phone)
        return CampaignProgress(campaign_id=campaign_id, inviati=inviati, falliti=falliti)

    def campaigns(self) -> list[str]:
        return sorted({str(r.get("campaign_id", "")) for r in self._iter_rows() if r})
