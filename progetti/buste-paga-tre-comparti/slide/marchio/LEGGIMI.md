# Il marchio

**`logo-rifilato.png` c'e'.** E' il marchio CISL FP Padova Rovigo, preparato da
`rifila.py` a partire dal file che ha mandato il committente.

Non e' un file del metodo: e' materiale del cliente. Cambiando committente si
rifa' tutto da capo con lo stesso strumento, non si eredita niente.

**Sta nel repository, e prima non ci stava.** La regola in `.gitignore` lo
escludeva («materiale del cliente»), ma senza questo file `layout.mjs` non si
importa: un clone pulito non renderizza niente, e un contenitore riavviato si
porta via tutto cio' che non e' committato. Vale piu' la riproducibilita'. Se
il committente non vuole il proprio marchio in un repository, si rimette quella
riga e questo LEGGIMI torna a spiegare dove prenderlo.

```
python3 slide/marchio/rifila.py <sorgente.png>
```

Finche' manca, `slide/layout.mjs` non si importa — quindi `cards.mjs` e
`clips.mjs` si fermano subito, con un errore su questo file.

## Tre cose che fa rifila.py, e nessuna e' un vezzo

### 1. Rifila

`layout.mjs` scala il logo a un'altezza fissa di 70px. Un margine dentro il
file **ruba quell'altezza al marchio**, che esce piu' piccolo del dovuto su
*ogni singola slide*.

Il file arrivato era 225x109 con 38 px di margine a destra e 13 in basso:
rifilato diventa **185x95**.

### 2. Rende trasparente SOLO il fondo

Ed e' qui che la strada ovvia sbaglia. La prima versione di questo file
diceva di rifilare cosi':

```python
im.crop(im.getchannel("A").getbbox())      # NON FUNZIONA su questo file
```

Il marchio vero e' arrivato **su bianco pieno, senza canale alfa**: tutti i
pixel hanno alfa 255, `getbbox()` sull'alfa restituisce l'immagine intera e
non rifila niente. Il margine va cercato sul COLORE, non sulla trasparenza.

E la trasparenza va costruita, perche' serve: sul tema `chiaro` il fondo e'
bianco e un rettangolo bianco non si vedrebbe, e sul tema `profondo` il
marchio sta gia' su piastra bianca — ma sulle **quattordici slide `tenue`** il
fondo e' `#FCF4F3`, e un rettangolo bianco si vedrebbe.

Si propaga **dai bordi verso l'interno**: il bianco dentro il fumetto — le
lettere CISL, 827 pixel — e' bianco del marchio e resta. Cancellare «tutto il
bianco» bucherebbe le lettere.

### 3. Controlla la palette

I due colori del marchio in `layout.mjs` — verde `#00623A` e rosso `#D70328` —
sono **campionati dai pixel di questo file**, non stimati a occhio. `rifila.py`
verifica che siano ancora li' e lo dice: sul file vero sono 3.372 px di verde e
1.232 px di rosso, esattamente quei due valori.

Se un file nuovo portasse colori diversi, lo strumento lo dice invece di
lasciarli divergere in silenzio.

## Quando il marchio cambia, cambia tutto

Il logo sta su tutte e 218 le slide. Dopo `rifila.py` vanno rifatti i PNG, le
clip, le scene e il montato — e il controllo di traboccamento va rifatto col
marchio vero, perche' le misure cambiano (MASTER §8).
