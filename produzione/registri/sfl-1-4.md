# Registro — SFL 1.4 «Cosa vuoi che faccia»

Chi non sa che cosa deve fare non fa niente: non per cattiva volontà, ma
perché dedurlo non tocca a lui. Una richiesta eseguibile ha **tre elementi —
chi, cosa, entro quando** — e va messa **da sola, su una riga sua**. Poi le
formule di attenuazione («eventualmente», «se possibile», «quando ha
tempo»), che spostano sul lettore la decisione se la cosa conta; e il modo
di essere cortesi senza indebolire: dire che cosa serve, e lasciare aperta
la strada per dire di no.

| campo | valore |
|---|---|
| video_id | `216a2559f2f7f396091bcc70c163678d` |
| scene | 50 — copertina, 47 slide, 1 ripresa, chiusura |
| formato | 16:9, 1080p |
| durata | 598,5 s (9:59) — misurata sul montato |
| parlato | 586,8 s (556,4 s di voce tagliata + 30,4 s di pose) |
| copione | 9.971 caratteri in 48 blocchi, media 208 |
| voce | «Achille nuovo 1» `9b851842ce54449fb9ff501751ca0271` su HeyGen, `create_speech` con `engine: "elevenlabs"` e `eleven_v4`, **1,12×** in post |
| tracce | A `s02`–`s10` · B `s11`–`s20` · C `s21`–`s30` · D `s31`–`s40` · E `s41`–`s49` |
| ripresa | `s26` lavagna |
| costo | **29 crediti HeyGen** di voce (6.707 → 6.678) + **1** di render |

**Confini: 43 su 43** trovati al primo colpo da `confini_heygen.py`, senza trascrizione; pausa di confine più corta **1,36 s**, taglio a metà della pausa.

## Le scelte

**Due schermate F**, layout `pd`, tutte e due con le parole chiave
**sottolineate in oro**:

- il documento pronto (`c10`–`c13`): nella riscrittura sono sottolineati il
  *cosa* («rileggere i punti 3 e 7») e il *quando* («entro giovedì»);
- la chiusura fra due uffici (`c30`–`c33`): nella versione da evitare sono
  sottolineate le tre formule che la voce commenta («saremmo quindi grati»,
  «eventualmente», «compatibilmente con i vostri tempi»).

**Il collegamento con l'altro corso**, chiesto dalla nota dello script: `s18`
dice che chi, cosa, entro quando sono gli stessi del modulo 4 di **«Dire,
ascoltare, convincere»**, applicati allo scritto, e la slide `c18` lo
scrive nell'occhiello.

**«Da sola. Su una riga sua.»** è la slide che lo script mette accanto
all'avatar (scena 10): qui è `c27`, a piena inquadratura.

## La ripresa

**`s26`**, una lavagna bianca con una lista scritta a mano in una sala
riunioni. Le righe erano quasi leggibili: **la lavagna è stata sfocata**
(gblur 7) prima del caricamento.

## Verifica

Scaricato e guardato: dodici fotogrammi più la ripresa, tutti al loro posto.
Silenzi oltre 2,5 s: la copertina, la chiusura e **2,6 s dopo il memo
`s22`**, voluti.
