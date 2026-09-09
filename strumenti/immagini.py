"""Lettura delle dimensioni e scrittura di PNG con la sola libreria standard."""

from __future__ import annotations

import struct
import zlib
from pathlib import Path

__all__ = ["dimensioni", "dimensioni_da_byte", "scrivi_png", "Tela"]


def dimensioni(percorso: Path) -> tuple[int, int] | None:
    """Restituisce (larghezza, altezza) di un PNG, JPEG o GIF; None se ignoto."""
    return dimensioni_da_byte(Path(percorso).read_bytes())


def dimensioni_da_byte(dati: bytes) -> tuple[int, int] | None:
    """Come `dimensioni`, ma leggendo l'immagine gia' in memoria."""
    if dati[:8] == b"\x89PNG\r\n\x1a\n" and dati[12:16] == b"IHDR":
        larghezza, altezza = struct.unpack(">II", dati[16:24])
        return larghezza, altezza
    if dati[:3] == b"\xff\xd8\xff":
        posizione = 2
        while posizione + 9 < len(dati):
            if dati[posizione] != 0xFF:
                posizione += 1
                continue
            marcatore = dati[posizione + 1]
            if marcatore in (0xD8, 0x01) or 0xD0 <= marcatore <= 0xD7:
                posizione += 2
                continue
            lunghezza = struct.unpack(">H", dati[posizione + 2:posizione + 4])[0]
            # SOF0..SOF15, escluse le tabelle DHT (C4), DNL (C8) e DAC (CC).
            if 0xC0 <= marcatore <= 0xCF and marcatore not in (0xC4, 0xC8, 0xCC):
                altezza, larghezza = struct.unpack(">HH", dati[posizione + 5:posizione + 9])
                return larghezza, altezza
            posizione += 2 + lunghezza
        return None
    if dati[:6] in (b"GIF87a", b"GIF89a"):
        larghezza, altezza = struct.unpack("<HH", dati[6:10])
        return larghezza, altezza
    return None


def _pezzo(tipo: bytes, dati: bytes) -> bytes:
    return (
        struct.pack(">I", len(dati))
        + tipo
        + dati
        + struct.pack(">I", zlib.crc32(tipo + dati) & 0xFFFFFFFF)
    )


def scrivi_png(percorso: Path, larghezza: int, altezza: int, pixel: bytearray) -> Path:
    """Scrive un PNG RGB a 8 bit. `pixel` contiene larghezza*altezza*3 byte."""
    atteso = larghezza * altezza * 3
    if len(pixel) != atteso:
        raise ValueError(f"attesi {atteso} byte di pixel, ricevuti {len(pixel)}")
    righe = bytearray()
    passo = larghezza * 3
    for y in range(altezza):
        righe.append(0)  # filtro "none"
        righe += pixel[y * passo:(y + 1) * passo]
    contenuto = (
        b"\x89PNG\r\n\x1a\n"
        + _pezzo(b"IHDR", struct.pack(">IIBBBBB", larghezza, altezza, 8, 2, 0, 0, 0))
        + _pezzo(b"IDAT", zlib.compress(bytes(righe), 9))
        + _pezzo(b"IEND", b"")
    )
    percorso = Path(percorso)
    percorso.parent.mkdir(parents=True, exist_ok=True)
    percorso.write_bytes(contenuto)
    return percorso


class Tela:
    """Superficie RGB minimale: rettangoli e testo bitmap."""

    def __init__(self, larghezza: int, altezza: int, sfondo: tuple[int, int, int]):
        self.larghezza = larghezza
        self.altezza = altezza
        self.pixel = bytearray(bytes(sfondo) * (larghezza * altezza))

    def rettangolo(self, x: int, y: int, larghezza: int, altezza: int,
                   colore: tuple[int, int, int]) -> None:
        x0, y0 = max(0, x), max(0, y)
        x1, y1 = min(self.larghezza, x + larghezza), min(self.altezza, y + altezza)
        if x1 <= x0 or y1 <= y0:
            return
        riga = bytes(colore) * (x1 - x0)
        for riga_y in range(y0, y1):
            inizio = (riga_y * self.larghezza + x0) * 3
            self.pixel[inizio:inizio + len(riga)] = riga

    def salva(self, percorso: Path) -> Path:
        return scrivi_png(percorso, self.larghezza, self.altezza, self.pixel)
