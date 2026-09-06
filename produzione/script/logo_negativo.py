"""Versione del monogramma LPG leggibile su fondo blu notte.

Il marchio originale e' blu notte + oro: su una card blu la parte blu sparisce.
Qui il blu viene portato su avorio, l'oro resta com'e'. L'alpha non si tocca,
cosi' i bordi antialiasati restano puliti.
"""
from PIL import Image

IVORY = (246, 243, 234)

src = Image.open('logo_lpg.png').convert('RGBA')
out = Image.new('RGBA', src.size)

sp = src.load()
op = out.load()
w, h = src.size

navy_n = gold_n = 0
for y in range(h):
    for x in range(w):
        r, g, b, a = sp[x, y]
        if a == 0:
            op[x, y] = (0, 0, 0, 0)
            continue
        # blu notte: canale blu dominante e poco rosso -> diventa avorio.
        # oro: rosso alto e verde medio -> resta identico.
        if b > r + 20 and r < 130:
            op[x, y] = (*IVORY, a)
            navy_n += 1
        else:
            op[x, y] = (r, g, b, a)
            gold_n += 1

out.save('logo_lpg_negativo.png')
print(f'pixel portati su avorio: {navy_n} | pixel oro lasciati: {gold_n}')
print('dimensioni', out.size)
