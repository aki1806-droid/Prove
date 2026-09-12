# Caratteri del corso

`font-incorporati.css` incorpora in base64 i due caratteri che il MASTER §8
dichiara per questo corso. Solo i sottoinsiemi Unicode **latin** e
**latin-ext**: cirillico, greco e vietnamita non servono a un corso in
italiano e triplicherebbero il peso del file, che `layout.mjs` incorpora in
ogni singola slide.

| carattere | ruolo | licenza |
|---|---|---|
| **Inter** | testo, titoli, interfaccia | SIL Open Font License 1.1 |
| **Source Serif 4** | frasi e citazioni (`.serif`) | SIL Open Font License 1.1 |

Entrambi presi da Google Fonts. La OFL 1.1 consente l'incorporamento in un
documento e la redistribuzione; richiede che la licenza accompagni i file, ed
è questo il motivo di questa nota. Il testo completo:

- Inter — <https://github.com/rsms/inter/blob/master/LICENSE.txt>
- Source Serif 4 — <https://github.com/adobe-fonts/source-serif/blob/release/LICENSE.md>

Sono font **variabili**: tutti i pesi di una faccia stanno in un solo file,
quindi `font-incorporati.css` dichiara una `@font-face` per faccia con
l'intervallo di pesi (`font-weight: 400 700`) invece di una per peso. Ripetere
lo stesso woff2 peso per peso porterebbe il file da 590 KB a 1,4 MB.

## Se il committente ha copie proprie

Si rigenera `font-incorporati.css` dai suoi file: i nomi delle famiglie usati
da `layout.mjs` sono `'Inter'` e `'Source Serif 4'`, e non devono cambiare.
Nient'altro nel progetto va toccato.

## Quello che questi file non coprono

I segni `✓` (U+2713) e `→` (U+2192) che compaiono nelle tabelle e negli
elenchi non stanno nei sottoinsiemi latini: li disegna un carattere di
sistema. Si vedono correttamente nel render, ma su una macchina senza quei
glifi cambierebbero forma.
