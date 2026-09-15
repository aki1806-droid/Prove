from pathlib import Path

from anychat_mcp.sendlog import SendLog


def test_campagna_nuova_e_vuota(tmp_path: Path) -> None:
    log = SendLog(tmp_path / "log.jsonl")
    assert log.progress("promo").totale_inviati == 0


def test_registra_e_rilegge_gli_invii(tmp_path: Path) -> None:
    log = SendLog(tmp_path / "log.jsonl")
    log.record("promo", "+393331234567", riuscito=True)
    assert log.progress("promo").inviati == {"+393331234567"}


def test_i_falliti_restano_da_ritentare(tmp_path: Path) -> None:
    log = SendLog(tmp_path / "log.jsonl")
    log.record("promo", "+393331234567", riuscito=False, detail="timeout")
    progress = log.progress("promo")
    assert progress.inviati == set()
    assert progress.falliti == {"+393331234567"}


def test_un_successivo_successo_chiude_il_fallimento(tmp_path: Path) -> None:
    log = SendLog(tmp_path / "log.jsonl")
    log.record("promo", "+393331234567", riuscito=False)
    log.record("promo", "+393331234567", riuscito=True)
    progress = log.progress("promo")
    assert progress.inviati == {"+393331234567"}
    assert progress.falliti == set()


def test_campagne_separate_non_si_mescolano(tmp_path: Path) -> None:
    log = SendLog(tmp_path / "log.jsonl")
    log.record("promo", "+393331234567", riuscito=True)
    log.record("saldi", "+393339999999", riuscito=True)
    assert log.progress("promo").inviati == {"+393331234567"}
    assert log.progress("saldi").inviati == {"+393339999999"}
    assert log.campaigns() == ["promo", "saldi"]


def test_riga_troncata_non_invalida_il_registro(tmp_path: Path) -> None:
    # Un crash a meta' scrittura non deve far ripartire tutta la campagna.
    path = tmp_path / "log.jsonl"
    log = SendLog(path)
    log.record("promo", "+393331234567", riuscito=True)
    with path.open("a", encoding="utf-8") as handle:
        handle.write('{"campaign_id": "promo", "pho')
    assert log.progress("promo").inviati == {"+393331234567"}


def test_il_registro_sopravvive_alla_riapertura(tmp_path: Path) -> None:
    path = tmp_path / "log.jsonl"
    SendLog(path).record("promo", "+393331234567", riuscito=True)
    assert SendLog(path).progress("promo").inviati == {"+393331234567"}
