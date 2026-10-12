# REGISTRO — 18.2 Gli ausili per la mobilità e il trasferimento

Modulo 18 bonus (ausili, presidi e tecnologie assistive), lezione 2 di 5.
Corso di preparazione al concorso **OSS** Azienda Zero · CISL FP Padova Rovigo.

## Scheda parametri

Invariata rispetto alla 18.1 (vedi il suo registro). Lo stacco fra le tracce e'
`s22`, fine del capitolo 6 (gli ausili minori).

## L'aritmetica

```
caratteri scritti     7.048  ·  47 blocchi  ·  13 capitoli  ·  49 scene su 50
voce grezza           472,7 s   (A 218,0 · B 254,7)
lavorata netta        431,8 s   ·  CPS 16,32  ·  rapporto 1,095
respiro               +0,267 s su 46 blocchi = 12,3 s
montato locale        7:51.93
```

Al primo colpo, dentro la forchetta.

## Il copione di partenza non trasferisce cosi' com'e'

6.785 caratteri di partenza, circa 6.850 con gli apostrofi: sotto la forchetta.
Le aggiunte vengono tutte dallo **schermo dello stesso documento**: l'elenco
degli ausili della scena 1 («bastoni, deambulatori, carrozzine, ausili minori,
sollevatori, letti»), le verifiche della carrozzina e del letto come le scrive
lo schermo («freni efficaci», «cuscino in posizione», «sponde integre»),
«ancora» per chi si muove da solo, ganci e due operatori nel riepilogo, il
titolo intero della lezione dopo. **Nessun fatto nuovo.**

## Il repertorio dei tipi

49 scene: frase 8 · elenco 8 · tre 7 · griglia 5 · titolo 5 · memo 4 ·
confronto 3 · tabella 3 · trappola 3 · copertina 2 · sostituzione 1.

- Le famiglie di ausili (deambulatori s09-s10, ausili minori s20-s21,
  sollevatori s23-s24) sono serie di `tre`, scoperte come le dice la voce; il
  titolo della card e' **una parola** (Si solleva, Si spinge, Passaggio,
  Rotazione), il resto nella descrizione.
- **«Abbinare ausilio e persona»**, la domanda tipica dei quiz, e' una tabella
  persona → ausilio, accesa due righe alla volta (s34-s36).
- **velo rosa** sugli errori: le pedane abbassate (s17), i sei errori col
  sollevatore in un elenco `vietato` a tappe (s27-s29), i distrattori (s42-s44).
  Su s17 ho tolto il grassetto: sul velo rosa il verde dell'accento sembrava
  indicare la cosa giusta.
- **sostituzione** una volta: dentro il deambulatore, non dietro (s11).

## Esito delle verifiche

| | |
|---|---|
| temi concordi fra `blocchi.json` e `contenuti.mjs` | ✓ 47 su 47 |
| traboccamento, copertine, serie a tappe | ✓ |
| provini guardati | ✓ tutti e 49 |
| verifica per trascrizione, Scribe | ✓ **99,6% su A, 100% su B · 0 buchi** |
| tagli fra due parole, coi tempi di Scribe | ✓ **45 su 45 al primo colpo** |
| blocchi nella fascia 8,5-21 car/s | ✓ tutti e 47 (11,8-17,5) |
| scarto audio/video sulle clip | ✓ massimo 20 ms |
| durata del montato locale ≥ 7:50 | ✓ **7:51.93** |
| sottotitoli SRT | ✓ 47 righe su 47 blocchi |

I due scarti su A sono rese: «OSS» in minuscolo, «antidecubito» staccato.

## Uno strumento corretto: il caricamento riprova

Al primo invio due file su 96 sono tornati **503** dallo storage di HeyGen.
`heygen.py invia` non riprovava: si fermava e basta. Ora ogni PUT riprova fino
a tre volte, aspettando 2, 4 e 8 secondi; rilanciato, 96 su 96. La correzione
e' nello strumento condiviso (da questa lezione in poi).

## Il montato

| | |
|---|---|
| montato locale | `montato-18.2.mp4` — **7:51.93** |
| montato HeyGen | `5aff3d976796adadc873e57da4da599f` — **7:50.54** |
| render | 100 s |
| asset caricati | 96 in un lotto solo (due ripetuti) |

Perdita in consegna 1,39 s su 49 scene, 28 ms a scena. Scaricato e
controllato: 7:50.56, 1920×1080, audio presente (media −25 dB); al minuto
5:00 c'e' s31, il letto ad altezza variabile, come nel montato locale.

## Costo misurato

```
voce, due tracce (7.048 car, eleven_v4)          0 crediti
trascrizione A (Scribe, 218,0 s)             1.199 crediti
trascrizione B (Scribe, 254,7 s)             1.401 crediti
```

## Da verificare — quello che non ho potuto giudicare io

- **Le indicazioni tecniche sono del documento**, non verificate contro una
  fonte: l'altezza del bastone «al polso col braccio disteso», il bastone «dal
  lato sano», la carrozzina «in discesa all'indietro», l'abbinamento
  ausilio-persona, attivo e passivo per il sollevatore. Sono le affermazioni
  che un candidato ripetera' all'esame: vanno guardate da un fisioterapista.
- **«Si opera in due quando previsto»**: dipende dalla procedura aziendale e
  dal sollevatore.
- **«Rollator»** detto da una voce italiana, e **«L'OSS»** con la v4: vanno
  ascoltati.
- **L'SRT porta gli apostrofi del parlato**: decisione ancora aperta.
