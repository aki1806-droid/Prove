import asyncio
import time
from pathlib import Path

import pytest

from anychat_mcp.throttle import DailyCounter, QuotaExhausted, RateLimiter


def test_counter_parte_da_zero(tmp_path: Path) -> None:
    counter = DailyCounter(tmp_path / "state.json", cap=10)
    assert counter.snapshot().sent == 0
    assert counter.snapshot().remaining == 10


def test_reserve_scala_il_residuo(tmp_path: Path) -> None:
    counter = DailyCounter(tmp_path / "state.json", cap=10)
    counter.reserve(4)
    assert counter.snapshot().remaining == 6


def test_reserve_sopravvive_al_riavvio(tmp_path: Path) -> None:
    path = tmp_path / "state.json"
    DailyCounter(path, cap=10).reserve(7)
    # Un'istanza nuova, come dopo un restart del server, vede lo stesso residuo.
    assert DailyCounter(path, cap=10).snapshot().remaining == 3


def test_reserve_oltre_il_tetto_solleva(tmp_path: Path) -> None:
    counter = DailyCounter(tmp_path / "state.json", cap=5)
    counter.reserve(5)
    with pytest.raises(QuotaExhausted):
        counter.reserve(1)


def test_refund_restituisce_gli_invii_non_partiti(tmp_path: Path) -> None:
    counter = DailyCounter(tmp_path / "state.json", cap=10)
    counter.reserve(6)
    counter.refund(2)
    assert counter.snapshot().remaining == 6


def test_conteggio_di_ieri_non_conta(tmp_path: Path) -> None:
    path = tmp_path / "state.json"
    path.write_text('{"day": "2000-01-01", "sent": 999}', encoding="utf-8")
    assert DailyCounter(path, cap=10).snapshot().remaining == 10


async def test_rate_limiter_distanzia_le_chiamate() -> None:
    limiter = RateLimiter(rate=20.0)  # 50ms di intervallo
    start = time.monotonic()
    for _ in range(3):
        await limiter.acquire()
    # Tre acquisizioni = due attese da 50ms.
    assert time.monotonic() - start >= 0.09


async def test_rate_limiter_e_sicuro_in_concorrenza() -> None:
    limiter = RateLimiter(rate=50.0)
    start = time.monotonic()
    await asyncio.gather(*(limiter.acquire() for _ in range(5)))
    assert time.monotonic() - start >= 0.07
