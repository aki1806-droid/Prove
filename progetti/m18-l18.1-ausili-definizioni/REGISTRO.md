# REGISTRO — 18.1 Ausili, presidi e protesi: definizioni, prescrizione e ruolo dell'OSS

Modulo 18 bonus (ausili, presidi e tecnologie assistive), lezione 1 di 5.
Corso di preparazione al concorso **OSS** Azienda Zero · CISL FP Padova Rovigo.

## Scheda parametri

Invariata rispetto al modulo 17: 7:50 montati, niente musica, palette dal logo
(verde `#00623A`, rosso `#D70328`), voce clone di workspace
`tVdVcJPudubxmTmAw4tE` su `eleven_v4`, filtro lento (pausa interna 0,22 s,
atempo 1,04). Lo stacco fra le tracce e' `s22`, fine del capitolo 6 (il ruolo
dell'OSS).

Il documento del modulo indica una palette sua (verde `#00863E`, verde scuro
`#00532A`, arancio `#F39200`): come per il modulo 17, resta quella campionata
dal logo, che e' la palette di tutto il corso.

Registro del modulo: **tecnico e pratico**. Tag di intenzione: `[warm]` in
apertura e in chiusura, `[thoughtful]` sul riepilogo.

## L'aritmetica

```
caratteri scritti     7.066  ·  47 blocchi  ·  13 capitoli  ·  49 scene su 50
voce grezza           476,2 s   (A 215,8 · B 260,4)
lavorata netta        430,8 s   ·  CPS 16,40  ·  rapporto 1,105
respiro               +0,288 s su 46 blocchi = 13,2 s
montato locale        7:51.83
```

Dentro la forchetta del modulo 17 (7.020-7.120 con tredici capitoli) e al
primo colpo. **La voce ha letto a 16,40**, in mezzo alle sei misure del modulo
17.

## Il copione di partenza non trasferisce cosi' com'e'

6.945 caratteri di partenza, circa 7.000 con gli apostrofi, 7.066 scritti. Le
aggiunte sono poche e vengono dallo schermo dello stesso documento («alcuni
ausili sono dati in comodato, altri in proprieta'»), piu' due rinforzi di
forma («e' un danno, non una comodita'», «esiste anche un registro»).

**Una correzione al documento.** Lo schermo della scena 8 dice che
l'apparecchio acustico «si sente», il parlato che «si vede». Lo stigma e' che
si vede: la slide segue il parlato.

## Il repertorio dei tipi, e le icone nuove

49 scene: frase 10 · griglia 7 · titolo 6 · elenco 5 · tre 4 · confronto 4 ·
trappola 3 · memo 3 · copertina 2 · norma 2 · sostituzione 1 · icone 1 ·
citazione 1.

- Il documento consiglia **icone degli ausili** «dove disponibili nel tema».
  La libreria ne aveva solo di generiche: ho aggiunto a `grafica.mjs`
  **carrozzina, bastone, deambulatore, letto, orecchio, casa, segnale**, nello
  stesso tratto (1,7 su griglia 24). Usate qui in s28 (il bastone «fa
  vecchio», la carrozzina «e' la resa», l'apparecchio acustico «si vede»).
- Le **quattro definizioni** (ausilio, presidio, protesi, ortesi) sono una
  serie di `tre` a quattro caselle, scoperte come le dice la voce (s05-s07):
  quattro cose da distinguere, non giuste e sbagliate.
- Il **percorso dell'ausilio** in sei passi sforava di 341 px come catena: e'
  una griglia numerata 3×2 (s16, s17).
- **velo rosa** su che cosa l'OSS non fa (s22: non ripara, non modifica) e
  sui distrattori (s43-s45, tre trappole da due righe).
- **sostituzione** una volta sola: la carrozzina a chi potrebbe camminare col
  deambulatore (s26).

Due difetti trovati guardando i provini, gia' noti dal modulo 17: titoli
**bicolori** nelle card (s05-s07, s13: il grassetto dentro un titolo prende
l'altro colore) e nel confronto s11. Corretti con la regola gia' scritta nel
MASTER: in una fila di card il titolo e' una parola, il resto va nella
descrizione.

## Esito delle verifiche

| | |
|---|---|
| temi concordi fra `blocchi.json` e `contenuti.mjs` | ✓ 47 su 47 |
| traboccamento, copertine, serie a tappe | ✓ (dopo il percorso in griglia) |
| provini guardati | ✓ tutti e 49 |
| verifica per trascrizione, Scribe | ✓ **100% su A, 99,7% su B · 0 buchi** |
| tagli fra due parole, coi tempi di Scribe | ✓ **45 su 45 al primo colpo** |
| blocchi nella fascia 8,5-21 car/s | ✓ tutti e 47 (12,2-17,9) |
| scarto audio/video sulle clip | ✓ massimo 20 ms |
| durata del montato locale ≥ 7:50 | ✓ **7:51.83** |
| sottotitoli SRT | ✓ 47 righe su 47 blocchi |

I due scarti su B sono una resa: «OSS» trascritto in minuscolo. Due punti
interrogativi nella trascrizione: «Chi prescrive e chi fornisce?» (titolo di
capitolo detto come domanda) e «Che cosa aiuta?», tutti e due legittimi.

## Il montato

| | |
|---|---|
| montato locale | `montato-18.1.mp4` — **7:51.83** |
| montato HeyGen | `d07e7280488d45f72879d979bf076e9f` — **7:50.50** |
| render | 79 s |
| asset caricati | 96 in un lotto solo |

Perdita in consegna 1,33 s su 49 scene, 27 ms a scena. Scaricato e
controllato: 7:50.52, 1920×1080, audio presente (media −25 dB); al minuto
4:00 c'e' s25, «il minimo ausilio», come nel montato locale.

## Costo misurato

```
voce, due tracce (7.066 car, eleven_v4)          0 crediti
trascrizione A (Scribe, 215,8 s)             1.187 crediti
trascrizione B (Scribe, 260,4 s)             1.432 crediti
```

## Da verificare — quello che non ho potuto giudicare io

- **I contenuti di merito non li ho verificati contro una fonte.** In
  particolare quelli normativi e organizzativi: il Nomenclatore tariffario
  «nel decreto sui LEA del 2017» (DPCM 12 gennaio 2017), chi ne ha diritto,
  collaudo e tempi minimi di rinnovo, la prescrizione dello specialista e la
  fornitura dell'ULSS di residenza. Vanno confrontati con le regole della
  Regione Veneto.
- **Le definizioni** di ausilio, presidio, protesi e ortesi sono quelle del
  documento; i confini fra «ausilio» e «presidio» non sono gli stessi in tutti
  i testi.
- **«ULSS»** e **«LEA»** dette dalla voce, e **«L'OSS»** con la v4: vanno
  ascoltate.
- **Le icone nuove** le ho disegnate io: vanno guardate da chi conosce gli
  ausili.
- **L'SRT porta gli apostrofi del parlato**: decisione ancora aperta.
