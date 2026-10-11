# REGISTRO — Perseo Sirio senza segreti · 1.5 Chi decide e chi controlla

Data: 11 ottobre 2026 · sessione Claude Code (repo Prove, branch `claude/new-session-d7lx19`)
Metodo: `metodo/MASTER-PORTATILE.md` · parametri del corso: vedi `m1-l1.1-pensione/REGISTRO.md`

Ultima lezione del Modulo 1. Copione allungato a 6 minuti dallo script `PS_M1_SCRIPT-VIDEO.md` e
prodotto **senza approvazione intermedia**, su indicazione dell'utente («vai avanti per tutto il
modulo senza chiedere approvazione»).

## Numeri della lezione

- 42 blocchi · 5.902 caratteri · 44 scene (copertina 3 s + 42 + chiusura 10 s)
- tracce: A 189,3 s grezzi (s02–s20) · B 210,5 s grezzi (s21–s43); stacco su cambio di capitolo
- ritmo: x1,112 di silenzi tolti, `atempo` 1,011, `MIRA` 16,6 car/s
- parlato 357,4 s → montato locale **6:10,8**

## Verifiche

- allineamento DTW: 0 blocchi fuori fascia 8,5–21 car/s
- controllo delle pause: nessun taglio nel parlato
- trascrizione dall'asset audio: A 100 % (475/475), B 100 % (505/505), **nessun buco, nessuna resa**
- slide: 44 PNG guardati nei provini; nessuna sfora la cornice
- `controlli.py`: 8/8

## Grafica nuova (in `previdenza.mjs`)

- `paritetica`: la piramide Assemblea → Consiglio → Presidente e Vice, ogni livello metà verde
  (lavoratori) e metà rosso (amministrazioni); `livelli` e `meta`.
- `custodia`: Perseo Sirio → gestori → depositario, con le frecce «mandato» e «titoli in custodia»;
  `fase:'gestori'` mostra solo i primi due, `nota` la riga sotto.
- `controlli`: l'anello del controllo interno (revisione interna, collegio dei sindaci, gestione
  dei rischi) e, con `fase:'esterno'`, il cerchio COVIP attorno. Le etichette stanno fuori dal
  cerchio esterno (anello R 150, COVIP r 320).
- s42 riprende `pilastri` con la targa Perseo Sirio come chiusura del modulo.

## Che cosa è andato storto e come si è deciso

- Una sostituzione automatica su `previdenza.mjs` si è fermata su un `};` dentro una stringa
  modello e ha rotto il file: ricostruito dalla versione 1.4 più le tre figure nuove.
- Nella piramide la linea bianca della metà tagliava le scritte («Assemblea | dei delegati»):
  ora è verde e sta dietro i blocchi, visibile solo negli spazi tra un livello e l'altro.

## Costi

- voce: due generazioni ElevenLabs (A e B), nessuna rigenerata
- trascrizioni: due, dall'asset audio

## La resa

- video HeyGen: `ad2b03e94281765a6949e3ade0e83bf5` — **completato**, 6:09,5 (369,5 s), 1920×1080,
  sottotitoli SRT. Pagina: https://app.heygen.com/videos/ad2b03e94281765a6949e3ade0e83bf5
- lotto asset `3b6b638ea3e54ae5944ecec33790ba6b` (86 file); render in poco più di 1 minuto
- copia di controllo locale: `montato-1.5.mp4` 6:10,8 (non versionata) e `montato-1.5.srt`

## Da verificare — quello che non ho potuto giudicare io

- **I fatti sul governo del Fondo**, da confrontare con lo statuto e il sito:
  - Assemblea di 60 delegati, 30 eletti dai lavoratori e 30 dalle amministrazioni; Consiglio di
    amministrazione e Presidente/Vicepresidente paritetici;
  - requisiti di onorabilità e professionalità per chi siede negli organi;
  - un direttore generale e un fornitore esterno per i servizi amministrativi;
  - gestori e depositario scelti con gara, mandati a durata;
  - controllo interno (revisione interna, gestione dei rischi, collegio dei sindaci) e vigilanza COVIP;
  - il patrimonio del Fondo separato da quello dei gestori.
- **La mossa di oggi** manda su fondoperseosirio.it, sezione «Chi siamo», pagina «Il Fondo»:
  controllare che il percorso esista con questi nomi.
- La voce non l'ho ascoltata: verifiche per trascrizione e per pause.
