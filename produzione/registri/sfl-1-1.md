# Registro — SFL 1.1 «Il lettore non legge: scansiona»

La prima lezione del corso *Scrivere per farsi leggere*. Parte dal lettore
che immaginiamo quando scriviamo — comincia dalla prima parola e arriva
all'ultima — e lo mette accanto a quello vero, che **prima guarda il testo e
poi decide** quanta attenzione dargli. La frase del modulo: **il testo viene
guardato prima di essere letto**. Poi le quattro cose che si registrano in
tre secondi, le quattro che aiutano la scansione, e il criterio che regge
tutto il corso: *che cosa deve fare chi legge, e gliel'ho reso facile?*

| campo | valore |
|---|---|
| video_id | `384dd4536d82207cb110b8a398a696f5` |
| scene | 50 — copertina, 47 slide, 1 ripresa, chiusura |
| formato | 16:9, 1080p |
| durata | 598,9 s (9:59) — misurata sul montato |
| parlato | 587,2 s (556,2 s di voce tagliata + 31,0 s di pose) |
| copione | 10.064 caratteri in 48 blocchi, media 210 |
| voce | «Achille nuovo 1» `9b851842ce54449fb9ff501751ca0271` su HeyGen, `create_speech` con `engine: "elevenlabs"` e `eleven_v4`, **1,12×** in post |
| tracce | A `s02`–`s10` · B `s11`–`s20` · C `s21`–`s30` · D `s31`–`s40` · E `s41`–`s49` |
| ripresa | `s09` casella-di-posta |
| costo | **29 crediti HeyGen** di voce (6.804 → 6.775) + **1** di render |

**Confini: 43 su 43** trovati al primo colpo da `confini_heygen.py`, senza trascrizione; pausa di confine più corta **1,32 s**, taglio a metà della pausa.

## Le scelte

**Senza avatar, come LNV.** Lo script è scritto per HeyGen con l'avatar; le
scene «AVATAR» sono diventate slide a piena inquadratura, una per concetto.

**Le schermate F** (prima/dopo) sono il layout nuovo `pd` di
`slide_corso.mjs` (`prima_dopo.mjs`): sopra la versione da evitare, in
grigio e più piccola, sotto quella riscritta, in blu. Due in questa lezione:

- la comunicazione di servizio sui turni (`c21`–`c24`);
- la riga di chiusura «Si resta in attesa di un cortese riscontro» contro
  «Mi fai sapere entro giovedì?» (`c37`–`c39`).

Ognuna resta a schermo per più blocchi: la prima slide entra con
l'animazione, **le successive sono statiche** (`statica: true`), così la
schermata non si ricompone a ogni cambio di blocco. La voce non legge mai il
testo a schermo: lo commenta, come chiede lo script.

**Memo** su fondo profondo, «Da evitare» su oro tenue, come in LNV.

## La ripresa

Una sola, come in tutte le lezioni del corso: **`s09`**, lo schermo di un
computer con una casella di posta, generata con Nano Banana 2 (406 crediti
ElevenLabs). L'immagine aveva un logo simile a quello di Gmail in alto a
sinistra: **lo schermo è stato sfocato** (gblur 4,5) finché righe e logo non
si leggono più. Nessuna persona, nessun marchio, nessuna scritta leggibile.

## Verifica

Scaricato e guardato: dodici fotogrammi distribuiti sulla lezione più la
ripresa, tutti al loro posto. Silenzi oltre 2,5 s: solo la copertina (3 s) e
la chiusura (11 s).
