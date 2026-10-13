# REGISTRO — Perseo Sirio senza segreti · 9.2 Capitale o rendita?

Data: 12 ottobre 2026 · sessione Claude Code (repo Prove, branch `claude/new-session-d7lx19`)
Metodo: `metodo/MASTER-PORTATILE.md` · parametri del corso: vedi `m1-l1.1-pensione/REGISTRO.md`

Modulo 9 · Al pensionamento. Copione allungato a 6 minuti dallo script
`PS_M9_SCRIPT-VIDEO.md` e prodotto **senza approvazioni intermedie**, su indicazione dell'utente
(«Tutto, senza approvazioni»: moduli 2–10 di seguito, link alla fine di ogni modulo).

## Numeri della lezione

- 47 blocchi · 5.824 caratteri · 49 scene (copertina 3 s + 47 + chiusura 10 s)
- tracce: A 196,8 s grezzi (s02–s23) · B 220,3 s grezzi (s24–s48); stacco su cambio di capitolo
- ritmo: atempo 1,036, `MIRA` 16,6 car/s · parlato 353,1 s

## Verifiche

- allineamento DTW e controllo delle pause: 0 blocchi fuori fascia; ogni confine cade in una pausa vera
- trascrizione dall'asset audio: A 99,4 % (solo cifre: «7.101», «3.550», «300», «50%», «13» trascritti in numeri), B 100 %
- slide: 49 PNG guardati nei provini; nessuna sfora la cornice
- `controlli.py`: 8/8

## Grafica

- Grafiche nuove del modulo in `previdenza.mjs` (copiato di lezione in lezione): `varco` (la porta dell'anzianità, larga fino al 2026 e stretta dal 2027, con gli omini da 8 anni di iscrizione; fasi `porte`/`larga`/`stretta`), `secchio` (la posizione come barra fra capitale e rendita, con il cursore che si ferma a metà; fasi `meta`/`blocco`/`destra`/`rendita`/`tutto`).
- Qui: `secchio` in s09–s13, s18, s31 e s39; `tabella` pro e contro in s27–s28; `scala` in s34; `cifre` dell'assegno sociale in s20–s22.

## Che cosa è andato storto e come si è deciso

- Nell'anteprima della 9.3 avevo scritto «a chi vuole proteggere gli eredi»: allineato allo script della 9.3 («a chi teme di perdere l'autosufficienza»).
- Tolta la frase sul simulatore «e l'eta' a cui pensi di andare in pensione» (non so se il simulatore la chieda).
- «Il secchio si puo' riempire fino all'orlo» (immagine confusa) diventato «Tutta l'acqua, in un secchio solo».

## Costi

- voce: due generazioni ElevenLabs (A e B), nessuna rigenerata (sessioni in `perseo/sessioni-voce-m9.json`)
- trascrizioni: due, dall'asset audio

## La resa

- video HeyGen: `4cf5156d78793a278b2ba5f1ffe24cf9` — **completato**, 6:05,1 (365,1 s), 1920×1080,
  sottotitoli SRT. Pagina: https://app.heygen.com/videos/4cf5156d78793a278b2ba5f1ffe24cf9
- lotto asset `94b3d975e5e744a69fa86165696a22c6` (96 file)
- copia di controllo locale: `montato-9.2.mp4` 6:06,5 (non versionata) e `montato-9.2.srt`

## Da verificare — quello che non ho potuto giudicare io

- **Regola del 50%** in capitale, il resto in rendita vitalizia; si può scegliere più rendita, fino a tutta (dallo script).
- **Eccezione**: se la rendita da metà posizione è sotto metà dell'assegno sociale, tutto in capitale senza penalizzazioni fiscali.
- **Assegno sociale 2026**: 546,24 € × 13 = 7.101,12 €; metà ≈ 3.550 €; ≈ 300 € al mese (circolare INPS 2026, note del modulo).
- **Tasse**: dal 2018 stessa scala 15%→9% per capitale e rendita; strati per le parti più vecchie; rivalutazioni della rendita in pagamento al 26%.
- Mie formulazioni: «per esempio chi ha aderito tardi», «una scelta che massimizza l'assegno», l'esempio «un quarto in capitale e tre quarti in rendita».
- La voce non l'ho ascoltata: verifiche per trascrizione e per pause.
