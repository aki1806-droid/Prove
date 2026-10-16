# Calendario dei diritti 2027 — gli strumenti comuni e i dodici video

I video del mese per il calendario CISL FP Padova Rovigo, *Diritti in scena*.
Gennaio e febbraio sono stati fatti a mano, mese per mese; da marzo a dicembre
gli script di febbraio sono stati generalizzati qui, e ogni cartella del mese
tiene solo i suoi dati (`mese.json`, il pacchetto, la voce, i lavori Higgsfield,
il registro).

## I dodici video

| mese | protagonista | durata | HeyGen |
|---|---|---|---|
| Gennaio 2027 · Ferie | — | 1:13.87 | [2d67c66b…](https://app.heygen.com/videos/2d67c66ba5dc7c9f1b2ce7316a87ea0f) |
| Febbraio 2027 · Permessi e festività soppresse | Marco | 1:32.26 | [090b7680…](https://app.heygen.com/videos/090b76809648a8dc9863313ecf6bd8e7) |
| Marzo 2027 · Congedi parentali | Luca | 1:26.23 | [46a04ce0…](https://app.heygen.com/videos/46a04ce0732ff5459f4bf09474616404) |
| Aprile 2027 · Sicurezza sul lavoro | Davide | 1:35.11 | [11a03bbf…](https://app.heygen.com/videos/11a03bbf5dcd43e78c8da86bc85430e3) |
| Maggio 2027 · Valorizzazione professionale | Elena | 1:28.79 | [6123c479…](https://app.heygen.com/videos/6123c4798075d88ef0f495b5a1a9f396) |
| Giugno 2027 · Legge 104 | Paola | 1:26.64 | [c154fdb9…](https://app.heygen.com/videos/c154fdb9dc041fe9c6aad95e2fc6cfe0) |
| Luglio 2027 · Diritto al riposo | Francesca | 1:28.75 | [f0f65e22…](https://app.heygen.com/videos/f0f65e225cda17c3c76cc1bb3792b621) |
| Agosto 2027 · Straordinario e pronta disponibilità | Andrea | 1:26.19 | [0d657ed8…](https://app.heygen.com/videos/0d657ed8a4615b9f4ebf519435a479b6) |
| Settembre 2027 · Diritto allo studio | Rosa | 1:22.48 | [e84ddb2e…](https://app.heygen.com/videos/e84ddb2e6c595b41926a281aac243203) |
| Ottobre 2027 · Progressioni economiche | Giorgio | 1:26.59 | [cfd8a758…](https://app.heygen.com/videos/cfd8a7589568c9831b8dc8693144dc44) |
| Novembre 2027 · Tutela contro violenza e molestie | Chiara | 1:27.23 | [ba8375fc…](https://app.heygen.com/videos/ba8375fcdb489b5f80081f59355bc038) |
| Dicembre 2027 · Pensione e TFS | Mirella | 1:25.91 | [98da035e…](https://app.heygen.com/videos/98da035edb64267ad44945ee763dae7e) |

Gennaio: voce ElevenLabs diretto, scene del pacchetto. Da febbraio: voce via
HeyGen come passante (scelta di Achille), tre clip Higgsfield del protagonista
al mese con S0, S1, S5 rifatte sopra.

## Verifica sul CCNL Funzioni Locali

Tutti i dodici video sono confrontati con il CCNL Funzioni Locali 2022-2024
(firmato il 23 febbraio 2026) in [`VERIFICA-CCNL-FL.md`](VERIFICA-CCNL-FL.md):
nessun numero smentito, un punto da decidere su febbraio (festività
soppresse), una differenza da sapere su marzo (congedo a ore).

## Gli strumenti

```
testo_voce.py <mese>          il testo per create_speech: una traccia, pause fra le scene,
                              correzioni di mese.json (sigle minuscole nel pacchetto)
voce.py <mese>                la voce tagliata scena per scena, pause dopo «Falso», firma lenta
monta.py <mese>               scene, sottotitoli impressi, mix a −16 LUFS, montato di prova
heygen.py <mese> prepara | invia | scene
registro.py <mese>            il REGISTRO.md del mese
```

`mese.json` di ogni mese: la parola evidenziata del titolo di S0, la battuta
del protagonista in S1, il titolo di S5, le frasi della firma già scritte a
schermo (niente sottotitolo), le correzioni del testo della voce.

## I costi, marzo-dicembre

| | |
|---|---|
| voce, HeyGen come passante | circa 56 crediti HeyGen (un credito ogni 16,7 s di grezzo, arrotondato a ogni chiamata) |
| immagini e clip, Higgsfield | 368 crediti Higgsfield: 31 immagini a 0,25 (una rifatta, novembre S5) e 30 clip Kling 3.0 Pro a 12 |
| render HeyGen | non isolabili: sullo stesso account lavorava in parallelo un'altra sessione (corso SFL) |

Nello storico Higgsfield della stessa ora ci sono anche 24 immagini da 0,25
(6 crediti) che non vengono da questa sessione.
