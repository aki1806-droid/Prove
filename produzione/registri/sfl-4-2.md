# Registro — SFL 4.2 «Chi è in copia»

I destinatari non sono un dettaglio tecnico: sono un messaggio, e a
differenza del testo non si può attenuare. Tre campi, tre convenzioni — nel
campo «a» chi deve agire, in copia chi deve sapere, in copia nascosta chi
legge senza che gli altri lo sappiano — violate ogni giorno. La violazione
più frequente: **una richiesta a cinque persone non è rivolta a nessuna**.
L'accorgimento più utile: dichiarare in una riga perché qualcuno è in copia.
Poi la parte seria: la copia cambia il significato del messaggio, lo rende
pubblico, e mettere un responsabile in copia per ottenere una risposta è
uno strumento che funziona e ha un costo. Chiude la regola che risolve metà
dei problemi: più destinatari, meno risposte.

| campo | valore |
|---|---|
| video_id | `02c6b0cab965096611e139a80766940c` |
| scene | 50 — copertina, 47 slide, 1 ripresa, chiusura |
| formato | 16:9, 1080p |
| durata | 598,9 s (9:59) — misurata sul montato |
| parlato | 587,1 s (548,1 s di voce tagliata + 39,0 s di pose) |
| copione | 10.010 caratteri in 48 blocchi, media 209 |
| voce | «Achille nuovo 1» `9b851842ce54449fb9ff501751ca0271` su HeyGen, `create_speech` con `engine: "elevenlabs"` e `eleven_v4`, **1,12×** in post |
| tracce | A `s02`–`s10` · B `s11`–`s20` · C `s21`–`s30` · D `s31`–`s40` · E `s41`–`s49` |
| ripresa | `s28` targhetta |
| costo | 30 crediti HeyGen di voce (6.276 → 6.246) + 1 di render |

**Confini: 43 su 43** trovati al primo colpo da `confini_heygen.py`, senza trascrizione; pausa di confine più corta **1,37 s**, taglio a metà della pausa.

## Le scelte

**Una schermata F**, layout `pd`, forma `mail` con destinatari, oggetto e
corpo (`c12`–`c15`): cinque persone nel campo «a» contro una sola, con gli
altri in copia. La riga che dice perché sono in copia è sottolineata: la
voce la indica («nota l'ultima riga»). La mail è densa e il corpo esce a
corpo piccolo, ma resta leggibile a piena risoluzione.

**La scena sulla copia come pressione** (`s24`–`s27`) è detta senza
moralismo, come chiede la nota dello script: prima i casi in cui la copia
al responsabile è corretta (`c25`), poi la pressione, con l'esempio dei tre
solleciti in cui è la scelta giusta. **La copia nascosta** chiude sul
rischio pratico, il «rispondi a tutti» per sbaglio.

**I tre campi** (`c05`–`c08`) e **le tre domande prima di mandare**
(`c33`–`c36`) sono slide C a elenco con una riga accesa per volta.

## La ripresa

**`s28`**, una targhetta d'ottone su una porta, in un corridoio di uffici.
La targhetta è vuota alla generazione.

## Verifica

Scaricato e guardato: dodici fotogrammi più la ripresa e la schermata F a
piena risoluzione, tutti al loro posto. Silenzi oltre 2,5 s: la copertina e
quello dopo il secondo memo, voluto.
