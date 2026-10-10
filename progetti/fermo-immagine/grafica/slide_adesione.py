"""Slide S07 v2: adesione al flash mob tramite il modulo Formly (QR nuovo).
Parte dalla slide del pacchetto: copre titolo, testo e QR, e li riscrive."""
import os, sys, segno
from PIL import Image, ImageDraw, ImageFont

QUI = os.path.dirname(os.path.abspath(__file__))
FONT = sys.argv[1]            # cartella con i pacchetti @fontsource estratti
LINK = 'https://form.getformly.com/f/sy4MSi'
VERDE, GIALLO, ROSSO = (16, 94, 57), (245, 196, 0), (214, 31, 38)

im = Image.open(os.path.join(QUI, '../02_slide/S07_qr_sondaggio.png')).convert('RGB')
VERDE = im.getpixel((700, 900))
d = ImageDraw.Draw(im)
bebas = lambda s: ImageFont.truetype(f'{FONT}/fontsource-bebas-neue/files/bebas-neue-latin-400-normal.woff', s)
barlow = lambda w, s: ImageFont.truetype(f'{FONT}/fontsource-barlow/files/barlow-latin-{w}-normal.woff', s)

d.rectangle((100, 260, 1300, 960), fill=VERDE)
d.text((118, 290), 'ADERISCI AL', font=bebas(150), fill='white')
d.text((118, 430), 'FLASH MOB', font=bebas(150), fill=GIALLO)
d.text((120, 600), 'Compila il sondaggio: inquadra il QR', font=barlow(500, 52), fill='white')
d.text((120, 668), 'oppure vai su form.getformly.com/f/sy4MSi', font=barlow(600, 52), fill=GIALLO)
d.text((120, 770), 'Hai subito insulti o aggressioni? Raccontalo lì,', font=barlow(500, 40), fill='white')
d.text((120, 822), 'in forma anonima: può diventare uno dei cartelli.', font=barlow(500, 40), fill='white')

# riquadro bianco del QR: interno circa x 1352-1808, y 262-798
d.rectangle((1366, 280, 1794, 790), fill='white')
qr = segno.make(LINK, error='m')
n = qr.symbol_size(border=0)[0]
lato = 392 // n * n
m = [[bool(c) for c in r] for r in qr.matrix]
k = lato // n
q = Image.new('RGB', (n * k, n * k), 'white')
dq = ImageDraw.Draw(q)
for y, r in enumerate(m):
    for x, c in enumerate(r):
        if c:
            dq.rectangle((x * k, y * k, x * k + k - 1, y * k + k - 1), fill='black')
im.paste(q, (1580 - q.width // 2, 304))
f = bebas(62)
w = d.textlength('ADERISCI QUI', font=f)
d.text((1580 - w / 2, 722), 'ADERISCI QUI', font=f, fill=ROSSO)
im.save(os.path.join(QUI, '../02_slide/S07_adesione_v2.png'))
print('ok', n, lato)
