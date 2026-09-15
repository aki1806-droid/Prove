import pytest

from anychat_mcp.recipients import (
    RecipientError,
    clean_recipients,
    load_csv,
    normalize_phone,
)


@pytest.mark.parametrize(
    "raw,atteso",
    [
        ("+39 333 123 4567", "+393331234567"),
        ("+39-333-1234567", "+393331234567"),
        ("0039 333 1234567", "+393331234567"),
        ("(+39) 333.123.4567", "+393331234567"),
    ],
)
def test_formati_internazionali(raw: str, atteso: str) -> None:
    assert normalize_phone(raw) == atteso


def test_numero_nazionale_usa_il_prefisso_di_default() -> None:
    assert normalize_phone("333 1234567", "39") == "+393331234567"


def test_zero_interurbano_cade() -> None:
    # Lo 0 del prefisso nazionale non esiste in E.164.
    assert normalize_phone("06 12345678", "39") == "+39612345678"


def test_nazionale_senza_prefisso_di_default_e_rifiutato() -> None:
    # Meglio scartare che indovinare il paese sbagliato.
    with pytest.raises(RecipientError):
        normalize_phone("3331234567")


def test_numero_troppo_corto_rifiutato() -> None:
    with pytest.raises(RecipientError):
        normalize_phone("+3912")


def test_numero_troppo_lungo_rifiutato() -> None:
    with pytest.raises(RecipientError):
        normalize_phone("+39" + "1" * 20)


def test_vuoto_rifiutato() -> None:
    with pytest.raises(RecipientError):
        normalize_phone("   ")


def test_deduplica_formati_diversi_dello_stesso_numero() -> None:
    pulita = clean_recipients(
        [
            {"phone": "+39 333 1234567"},
            {"phone": "0039-333-1234567"},
            {"phone": "+393331234567"},
        ]
    )
    assert len(pulita.recipients) == 1
    assert pulita.duplicati == 2


def test_scarti_riportano_il_motivo() -> None:
    pulita = clean_recipients([{"phone": "+393331234567"}, {"phone": "abc"}])
    assert len(pulita.recipients) == 1
    assert len(pulita.scartati) == 1
    assert pulita.scartati[0]["valore"] == "abc"


def test_variabili_esplicite_conservate() -> None:
    pulita = clean_recipients(
        [{"phone": "+393331234567", "variables": {"nome": "Aki"}}]
    )
    assert pulita.recipients[0].variables == {"nome": "Aki"}


def test_csv_usa_le_altre_colonne_come_variabili(tmp_path) -> None:
    csv_file = tmp_path / "lista.csv"
    csv_file.write_text(
        "telefono,nome,sconto\n+39 333 1234567,Aki,20\n", encoding="utf-8"
    )
    pulita = load_csv(csv_file)
    assert pulita.recipients[0].phone == "+393331234567"
    assert pulita.recipients[0].variables == {"nome": "Aki", "sconto": "20"}


def test_csv_senza_colonna_telefono_e_rifiutato(tmp_path) -> None:
    csv_file = tmp_path / "lista.csv"
    csv_file.write_text("nome,citta\nAki,Roma\n", encoding="utf-8")
    with pytest.raises(RecipientError, match="colonna"):
        load_csv(csv_file)
