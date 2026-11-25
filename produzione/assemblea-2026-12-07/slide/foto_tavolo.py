"""Ritagli delle foto scattate al tavolo con l'Azienda: tiene solo lo schermo.

    python3 foto_tavolo.py      # scrive schermate/tavolo-*.jpg
"""
import os
from PIL import Image, ImageEnhance

QUI = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(QUI, "..", "documenti", "tavolo-azienda")
OUT = os.path.join(QUI, "schermate")

# foto: (nome, riquadro x0, y0, x1, y1 in pixel della foto)
TAGLI = {
    "01": ("progettualita-pagamenti", (130, 400, 1126, 1075)),
    "02": ("oss-notte-sviluppi", (180, 480, 1126, 1160)),
    "03": ("oss-area-medica", (10, 500, 1110, 1210)),
    "04": ("oss-area-pediatrica", (90, 550, 1080, 1200)),
    "05": ("oss-intensive", (40, 490, 1070, 1170)),
    "06": ("oss-area-chirurgica", (60, 320, 1110, 1030)),
    "07": ("oss-crite", (30, 650, 1080, 1335)),
    "08": ("oss-nuova-pediatria", (120, 520, 1080, 1140)),
    "09": ("oss-aree-degenza", (130, 520, 1095, 1115)),
    "10": ("coord-bozza-accordo", (100, 515, 1080, 1150)),
    "12": ("incarichi-mappatura-nuova", (500, 110, 1810, 935)),
    "13": ("incarichi-1000-coordinatori", (120, 660, 1126, 1300)),
    "16": ("incarichi-proposta-500", (20, 0, 1126, 1340)),
    "17": ("incarichi-mappatura-14-4", (100, 600, 1126, 1330)),
    "19": ("incarichi-sviluppi-futuri", (60, 730, 1060, 1390)),
    "20": ("incarichi-professionali", (50, 610, 1080, 1250)),
}

if __name__ == "__main__":
    for n, (nome, box) in TAGLI.items():
        im = Image.open(os.path.join(SRC, f"foto-{n}.jpg")).convert("RGB").crop(box)
        im = ImageEnhance.Contrast(im).enhance(1.12)
        im = ImageEnhance.Sharpness(im).enhance(1.3)
        im.save(os.path.join(OUT, f"tavolo-{nome}.jpg"), quality=90)
        print(nome, im.size)
