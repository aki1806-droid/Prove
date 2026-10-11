# REGISTRO — Perseo Sirio senza segreti · 1.1 La pensione che verrà

Data: 11 ottobre 2026 · sessione Claude Code (repo Prove, branch `claude/new-session-d7lx19`)
Metodo: `metodo/MASTER-PORTATILE.md` (portato dalla sessione «Metodo creazione video»)

## Scheda parametri (valgono per tutto il corso, decisi l'11 ottobre)

| | |
|---|---|
| copione | script dell'utente `perseo/script/PS_M1_SCRIPT-VIDEO.md`, **allungato a 6 minuti** su richiesta (copione approvato dall'utente prima della voce) |
| durata | almeno 6:00 montati (`DURATA_MIN = 360` in `controlli.py`) |
| voce | GianP — News Info and Documentary, `nNt0YcINdGadGcTx5fBM`, `eleven_v3`, via ElevenLabs |
| b-roll | sostituito da vignette SVG animate (nessuna ripresa generata) |
| palette | verde `#00633B`, profondo `#003D24`, rosso `#D70328` (accento), verde chiaro `#E7EDEA`, carta `#F4F4F4`, testo `#212121` |
| caratteri | Open Sans variabile (asse `wdth`: 75% per numeri e contatori) |
| marchio | logo CISL FP Padova Rovigo in basso a destra, 60 px, opacità 85%; grande in copertina e chiusura |
| formato | 1920×1080, 25 fps, 16:9 |

## Numeri della lezione

- 35 blocchi · 5.885 caratteri · 37 scene (copertina 3 s + 35 + chiusura 10 s)
- tracce: A 218,16 s grezzi (s02–s19) · B 211,44 s grezzi (s20–s36); stacco su cambio di capitolo
- ritmo: x1,143 di silenzi tolti, `atempo` 1,060, `MIRA` 16,6 car/s
- parlato 356,9 s → montato locale **6:09,9**
- velocità grezza misurata: 17,7 car/s (A) e 15,1 (B)

## Verifiche

- allineamento DTW: 0 blocchi fuori fascia 8,5–21 car/s
- controllo delle pause: **34 tagli su 34 dentro una pausa vera** della voce
- trascrizione (scribe v1, dall'asset audio, non dal nodo voce: niente tag `[warm]` nel testo):
  A 99,0 %, B 98,7 % delle parole, **nessun buco**. Rese dichiarate in `verifica-testo.py`:
  cifre con lo spazio delle migliaia, «5,5%» e «€», «trent'anni» → «30 anni».
- slide: 37 PNG guardati nei provini; nessuna sfora la cornice
- montato locale: fotogrammi controllati su s08, s10, s19, s25, s29, s35

## Che cosa è andato storto e come si è deciso

- **Colonne nere** (s08, s09, s20–s25): un elemento con ritardo d'animazione E stile proprio
  aveva due attributi `style`; il browser tiene il primo. `previdenza.mjs` ora fonde gli stili
  su ogni tag (`unisciStili`). Lezione per il MASTER.
- Testi sovrapposti in s13, s25, s27, s29 e logo di copertina sopra il sopratitolo: corretti sui provini.
- `controlli.py` aveva le soglie del corso Infermiere (50 scene, 48 sottotitoli, 8 minuti):
  portate a quelle di questo corso.
- `monta-locale.py` cercava la chiusura in `s50`: ora la ricava dal numero di blocchi.

## Costi

- voce: 3.175 + 2.776 crediti ElevenLabs (~$0,98)
- trascrizioni: ~1.200 + ~1.163 crediti (~$0,40)
- HeyGen: 72 asset caricati in un lotto (`74e30fd05347489181537a823f337445`), render studio

## La resa

- video HeyGen: `6e442487875659470e64337b346a1dac` — **completato**, 6:09,0 (369,0 s), 1920×1080,
  sottotitoli SRT. Pagina: https://app.heygen.com/videos/6e442487875659470e64337b346a1dac
- render lanciato alle 12:57 UTC e chiuso alle 13:13 UTC: **circa 16 minuti**, contro i 3-4 del
  MASTER. Non è stato rilanciato. Il tempo va tenuto come nuovo metro per lavori di questa misura.
- copia di controllo locale: `montato-1.1.mp4` 6:10,1 (non versionata) e `montato-1.1.srt`

## Da verificare — quello che non ho potuto giudicare io

- **I numeri del copione allungato**: «intorno all'80%» (retributivo con carriera lunga),
  «circa un terzo» dello stipendio come contributo, coefficiente «intorno al 5,5%» (valore
  2025-26 a 67 anni: 5,608%), esempio 100 €/mese al 3%: 58.274 € e 22.700 € (calcolati).
- **Il memo sul verde**: parola chiave in bianco grassetto, non rossa come nello script
  (rosso su `#003D24` ha contrasto troppo basso).
- **Niente sigla musicale**: l'apertura è una copertina ferma di 3 s.
- **Logo**: il file disponibile è 187×97 px; nella chiusura a piena slide è ingrandito.
  Serve il logo in alta risoluzione.
- La voce non l'ho ascoltata: le verifiche sono per trascrizione e per pause.
