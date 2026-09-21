# Il marchio

Qui va **`logo-rifilato.png`**, che non sta nel repository: e' il marchio del
committente, non un file del metodo, e chi riprende la lavorazione lo prende
dai materiali del corso.

Finche' manca, `slide/layout.mjs` non si importa — quindi `cards.mjs` e
`clips.mjs` si fermano subito, con un errore su questo file.

## Va rifilato, e non e' un dettaglio

`layout.mjs` scala il logo a un'altezza fissa (70px). Un margine trasparente
dentro il file **ruba quell'altezza al marchio**, che esce piu' piccolo del
dovuto su *ogni singola slide*.

Un file arrivato 225x109 conteneva 38 pixel di margine in larghezza e 12 in
altezza: rifilato sul contenuto opaco diventa 187x97. E' il motivo per cui il
file si chiama `logo-rifilato.png` e non `logo.png` (MASTER §8).

```python
from PIL import Image
im = Image.open(sorgente).convert("RGBA")
im.crop(im.getchannel("A").getbbox()).save("slide/marchio/logo-rifilato.png", optimize=True)
```

## E la palette si campiona da qui

I due colori del marchio in `layout.mjs` — verde `#00623A` e rosso `#D70328` —
sono **campionati dai pixel opachi di questo file**, non stimati a occhio.
Controprova su un secondo file dello stesso logo: fra i pixel opachi il verde
sta al 35,0% e il rosso all'11,7%, gli stessi due valori.

Cambiando committente si ricampiona, non si eredita.
