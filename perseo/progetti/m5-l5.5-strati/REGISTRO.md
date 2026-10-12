# REGISTRO — Perseo Sirio senza segreti · 5.5 Le stratificazioni dei pubblici

Data: 12 ottobre 2026 · sessione Claude Code (repo Prove, branch `claude/new-session-d7lx19`)
Metodo: `metodo/MASTER-PORTATILE.md` · parametri del corso: vedi `m1-l1.1-pensione/REGISTRO.md`

Modulo 5 · Il fisco: dove si guadagna davvero. Copione allungato a 6 minuti dallo script
`PS_M5_SCRIPT-VIDEO.md` e prodotto **senza approvazioni intermedie**, su indicazione dell'utente
(«Tutto, senza approvazioni»: moduli 2–7 di seguito, link alla fine di ogni modulo).

## Numeri della lezione

- 47 blocchi · 5.678 caratteri · 49 scene (copertina 3 s + 47 + chiusura 10 s)
- tracce: A 181,8 s grezzi (s02–s21) · B 232,2 s grezzi (s22–s48); stacco su cambio di capitolo
- ritmo: atempo 1,046, `MIRA` 16,6 car/s · parlato 351,9 s

## Verifiche

- allineamento DTW e controllo delle pause: 0 blocchi fuori fascia. Il testo è il più corto del modulo: con la mira normale (16,6 car/s) il montato restava a 5:58, quindi solo qui `MIRA = 16.3` in `tagli.py` (atempo 1,046 invece di 1,064)
- trascrizione dall'asset audio: A 99,8 %, B 99,2 % (solo «quindici-nove per cento» reso come «15,9%» e «15-9%»)
- slide: 49 PNG guardati nei provini; nessuna sfora la cornice
- `controlli.py`: 8/8

## Grafica

- Grafiche nuove del modulo in `previdenza.mjs` (copiato di lezione in lezione): `colonna` (il reddito con la fetta dei contributi tolta prima dell'IRPEF; fasi `intera`, `dedotta`, `due`), `rimborso` (la moneta da 25 € da cui torna indietro lo spicchio di IRPEF risparmiata), `aliquote` (26%, 20%, 12,5%), `cesti` (1.000 € di raccolto, il fisco prende 260 o 200 €, i 60 € restano investiti), `composto` con la fase `fisco` (due curve, rendimenti al 20% e al 26%), `scala` (la scala del fisco, grafica ricorrente: 21 gradini dal 15% al 9%, l'omino scende fino all'anno `a`), `torta` (la prestazione: rendimenti e contributi non dedotti si staccano, si tassa solo il resto).
- Qui: `strati` (nuova: tre strati di roccia, fino al 2000, 2001–2017 e dal 2018, il terzo cresce con l'anno indicato) in s02, s07–s10, s14, s32–s33; `tabella` delle regole per strato in s15–s20; `tre` dei vecchi limiti di deduzione in s24–s27; `bicchiere` in s28; `scala` in s34.

## Che cosa è andato storto e come si è deciso

- Gli `strati` uscivano a metà larghezza con l'animazione di deposito: sostituita con la salita (`sali`), ora occupano tutta la larghezza.

## Costi

- voce: due generazioni ElevenLabs (A e B), nessuna rigenerata (sessioni in `perseo/sessioni-voce-m5.json`)
- trascrizioni: due, dall'asset audio

## La resa

- video HeyGen: `a3b649b409017a29e608d2135b14c242` — **completato**, 6:04,0 (364,0 s), 1920×1080,
  sottotitoli SRT. Pagina: https://app.heygen.com/videos/a3b649b409017a29e608d2135b14c242
- lotto asset `7d793ab569fd424f9065c4a471e35b8e` (96 file)
- copia di controllo locale: `montato-5.5.mp4` 6:05,3 (non versionata) e `montato-5.5.srt`

## Da verificare — quello che non ho potuto giudicare io

- **Strato fino al 2000**: rendita tassata a IRPEF ordinaria sull'87,5% dell'importo; **2001–2017**: IRPEF ordinaria piena; capitale con tassazione separata per entrambi — dallo script; «con un'aliquota media calcolata sui redditi» è una mia semplificazione della tassazione separata, da controllare.
- **Dal 2018** scala 15→9% su rendita e capitale, per estensione ai pubblici con la legge di bilancio: dallo script.
- «Ai lavoratori privati, dal 2007»: aggiunta mia (riforma del D.Lgs. 252/2005).
- **Vecchia deduzione dei pubblici**: il minore tra doppio del TFR destinato al Fondo, 12% del reddito complessivo e 5.164,57 € — dallo script; «lo stesso tetto dei privati» è mio.
- «Le stratificazioni le gestisce il Fondo sulla base dei dati che ha già»: dallo script, formulazione mia.
- La voce non l'ho ascoltata: verifiche per trascrizione e per pause.
