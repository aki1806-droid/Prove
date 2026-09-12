# Manca il logo

`slide/layout.mjs` legge `slide/marchio/logo-rifilato.png` e lo incorpora in
base64 in ogni slide. Il file e' binario e **non sta nel MASTER**: va messo qui
a mano prima del primo `node slide/cards.mjs`.

I due colori della palette sono campionati da questo file, non stimati:
verde `#00623A` (40,7% dei pixel opachi), rosso `#D70328` (14,2%).
