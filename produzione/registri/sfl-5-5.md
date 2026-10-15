# Registro — SFL 5.5 «I gruppi»

Chiude il modulo sul messaggio breve, e con lui i cinque moduli caricati del
corso. Il gruppo di lavoro su una chat è lo strumento con il rapporto
peggiore fra quanto viene usato e quanto funziona. Tre cose succedono sempre:
una moltiplicazione che nessuno calcola — **un messaggio in un gruppo di
quindici sono quindici interruzioni** —, il silenzio di chi non scrive, e le
decisioni che si perdono sotto quattrocento messaggi. Da qui tre regole: serve
a una persona? scrivi a quella persona; il silenzio non è consenso; le
decisioni escono dal gruppo. E una responsabilità per chi crea il gruppo:
dichiarare, quando lo apre, a che cosa serve e a che cosa no. La domanda che
chiude il modulo non è come scriverlo, ma se vada scritto lì.

| campo | valore |
|---|---|
| video_id | `430fdd2e220bbfa491574bbbefc8b9b8` |
| scene | 50 — copertina, 47 slide, 1 ripresa, chiusura |
| formato | 16:9, 1080p |
| durata | 598,0 s (9:58) — misurata sul montato |
| parlato | 586,1 s (566,0 s di voce tagliata + 20,1 s di pose) |
| copione | 9.962 caratteri in 48 blocchi, media 208 |
| voce | «Achille nuovo 1» `9b851842ce54449fb9ff501751ca0271` su HeyGen, `create_speech` con `engine: "elevenlabs"` e `eleven_v4`, **1,12×** in post |
| tracce | A `s02`–`s10` · B `s11`–`s20` · C `s21`–`s30` · D `s31`–`s40` · E `s41`–`s49` |
| ripresa | `s22` corridoio-porte |
| costo | 32 crediti HeyGen fra le due letture (6.027 → 5.995), compresi i render della 5.4 e della 5.5: circa 30 di voce + 1 di render |

**Confini: 43 su 43** trovati al primo colpo da `confini_heygen.py`, senza trascrizione; pausa di confine più corta **1,28 s**, taglio a metà della pausa.

## Le scelte

**Una schermata F in forma `chat`**, affiancata (`c35`–`c38`): a sinistra il
gruppo che compare senza una parola, indicato da una nota in corsivo; a
destra il messaggio di apertura in quattro righe — a che cosa serve, a che
cosa non serve, dove si fanno le cose che non si fanno lì, e che dopo le 20
nessuno è tenuto a rispondere. La nota dello script lo vuole **un modello da
fermare e copiare**: con la colonna normale le quattro righe andavano a capo
in nove e la forma si perdeva. Per questo `prima_dopo.mjs` ha un'opzione
nuova, **`largo: true`**, che allarga la colonna di destra quando a sinistra
c'è solo una nota: le quattro righe stanno in cinque, una per cosa. La voce
lo dice: «puoi fermare l'immagine e copiarlo».

**«Un messaggio in un gruppo di quindici / sono quindici interruzioni.»**
(`c09`–`c12`) resta ferma per tutta la scena: nello script è una scena
AVATAR + SLIDE.

**Le tre regole per un gruppo di lavoro** (`c27`–`c30`) sono una slide C a
elenco, una regola accesa alla volta.

**La scena 11** (`c31`–`c34`) riguarda chi crea i gruppi, cioè quasi sempre
chi coordina, come dice la nota dello script.

**La chiusura è quella di fine modulo**: «Fine del Modulo 5», con il modulo
dopo, «Modulo 6 — Scrivere quando è difficile».

**Il copione era corto alla prima stesura** (9.089 caratteri) ed è stato
allungato a 9.962 prima di generare la voce. Il blocco `s37` cominciava con
un gerundio che continuava la frase del blocco prima («Prendendo la forma…»):
dopo una pausa di confine non regge, ed è diventato «E lo fa prendendo la
forma…».

## La ripresa

**`s22`**, un corridoio con molte porte chiuse, luce fredda: arriva sulla
frase «E le decisioni, nei gruppi, sono il problema più grosso di tutti».

## Verifica

Scaricato e guardato: dodici fotogrammi più la ripresa, la schermata chat a
piena risoluzione e la chiusura di fine modulo, tutto al suo posto e
leggibile. Silenzi oltre 2,5 s: la copertina e la chiusura. Il parlato è di
586,1 s invece di 587: la voce tagliata (566 s) è la più lunga del modulo, e
le pose minime bastano appena a riempire il resto; la lezione dura 9:58.
