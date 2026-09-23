# prove

Produzione delle video-lezioni del corso **Progressione verticale · Comparto Sanità**
(CISL FP Padova Rovigo), col metodo di `docs/MASTER.md`: slide animate + voce, montate su HeyGen.

## Struttura

- `docs/` — MASTER (metodo e codice), STANDARD del corso, STRUTTURA dei 13 moduli
- `progetti/mX-lX.Y-nome/` — una cartella per lezione; il `REGISTRO.md` di ciascuna dice
  com'è andata e cosa resta da verificare
- `nuova-lezione.sh` — impianta la lezione successiva copiando dall'ultima fatta

Lezioni fatte, modulo 1 completo (voce Luca Ward `eleven_v3`; durate del video HeyGen):

| lezione | titolo | durata |
|---|---|---|
| 1.1 | Dalla 833 alla crisi | 8:02 |
| 1.2 | L'aziendalizzazione | 7:37 |
| 1.3 | Indirizzo, gestione e quasi-mercato | 7:12 |
| 1.4 | Accreditamento e libertà di scelta | 7:12 |
| 1.5 | I livelli essenziali di assistenza | {D15} |
| 1.6 | Governance e finanziamento | {D16} |

Per la lezione successiva (2.1) `nuova-lezione.sh` copia dalla 1.6, che ha già il CPS
misurato sul modulo (17,3) e le rese di `verifica-testo.py`. Nel parlato i numeri romani
vanno scritti in lettere («Titolo quinto», non «Titolo V»).

## Come si lavora

- Il branch principale è `main`.
- Ogni modifica in un branch dedicato, poi pull request su `main`.
- `pip install imageio-ffmpeg Pillow`; playwright e Chromium sono già nell'ambiente.
