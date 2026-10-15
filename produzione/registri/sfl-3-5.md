# Registro — SFL 3.5 «Come si rilegge»

Chiude il modulo sulla struttura con la cosa che si fa alla fine di ogni
testo, e che quasi tutti fanno male. Rileggere non è una cosa sola: sono
**tre passaggi**, in quest'ordine — la struttura, il taglio, il suono — e
farli tutti insieme è il motivo per cui le riletture non trovano niente.
Prima la casa, poi il colore. Il primo passaggio si fa in tre domande, le
prove delle lezioni precedenti, e **si risponde guardando, non
rileggendo**. Poi le tre cose che rendono la rilettura inutile: rileggere
subito, chiedere «va bene?» invece di «che cosa ti sto chiedendo di
fare?», e rileggere sei volte. Oltre un certo punto la revisione toglie.

| campo | valore |
|---|---|
| video_id | `ef04b61b0add29153d4de2807642e6b8` |
| scene | 50 — copertina, 47 slide, 1 ripresa, chiusura |
| formato | 16:9, 1080p |
| durata | 598,8 s (9:59) — misurata sul montato |
| parlato | 587,1 s (553,9 s di voce tagliata + 33,1 s di pose) |
| copione | 9.872 caratteri in 48 blocchi, media 206 |
| voce | «Achille nuovo 1» `9b851842ce54449fb9ff501751ca0271` su HeyGen, `create_speech` con `engine: "elevenlabs"` e `eleven_v4`, **1,12×** in post |
| tracce | A `s02`–`s10` · B `s11`–`s20` · C `s21`–`s30` · D `s31`–`s40` · E `s41`–`s49` |
| ripresa | `s25` foglio-lontano |
| costo | 29 crediti HeyGen di voce (6.337 → 6.307, compreso il render della 3.3) + 1 di render |

**Confini: 42 su 43** trovati al primo colpo da `confini_heygen.py`, senza trascrizione; pausa di confine più corta **1,27 s**, taglio a metà della pausa.

## Le scelte

**Nessuna schermata F**: lo script non ne ha. La lezione è un processo, e le
slide C lo portano: i tre passaggi (`c08`–`c11`), le tre domande del primo
passaggio (`c17`–`c20`) e quanto rileggere secondo il testo (`c34`–`c37`)
sono slide a elenco con una riga accesa per volta.

**La scena su quando smettere** (`s38`–`s41`) resta intera, come chiede la
nota dello script: bilancia tre lezioni di correzioni.

**«Non va bene?» riscritto.** Nella prima stesura la voce diceva «Non: va
bene?», che a orecchio si legge come una domanda negativa. Diventato «Non
chiedere: va bene? Perché ottiene sempre un sì» e «Chiedi invece: che cosa
ti sto chiedendo di fare?».

**Chiusura di fine modulo**: «Fine del Modulo 3», «Modulo 4 — La mail».

**Confini.** Sulla traccia A una pausa di confine è uscita a 1,02 s, sotto
la soglia di 1,1. Controllata sui tempi del token di pausa, è un confine
vero: la traccia è stata tagliata con la soglia a 1,0, senza toccare lo
script del repo.

## La ripresa

**`s25`**, un foglio solo su un tavolo lungo, visto da lontano: la forma
prima delle parole, come chiede il primo passaggio.

## Verifica

Scaricato e guardato: dodici fotogrammi più la ripresa e la chiusura, tutti
al loro posto. Silenzi oltre 2,5 s: la copertina e quello dopo il primo memo,
voluto.
