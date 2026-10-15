# Registro — Modulo 5 · Il messaggio breve

Corso *Scrivere per farsi leggere*. Lo standard è `SFL_STANDARD-PRODUZIONE.md`;
ogni lezione ha il suo registro in `sfl-5-M.md`.

| lezione | titolo | durata | schermate F | ripresa | video_id |
|---|---|---|---|---|---|
| 5.1 | Il tono che manca | 9:59 | 2 | `s25` telefono-sera | `32cab20ccb4a79f2c10872efe6c8def3` |
| 5.2 | La brevità che sembra freddezza | 9:59 | 2 | `s25` sala-pausa | `136750fb54147016f5f4cc8208c9f5c7` |
| 5.3 | I messaggi di lavoro | 9:59 | 1 | `s18` comodino | `f08c8381a2fa5637e7c45ca4fb7e5a02` |
| 5.4 | Quando non si scrive | 9:59 | 1 | `s19` telefono-fisso | `ee9973144dcfaad348afc89fcf06b239` |
| 5.5 | I gruppi | 9:58 | 1 | `s22` corridoio-porte | `430fdd2e220bbfa491574bbbefc8b9b8` |

**49 minuti e 53 secondi**, duecentotrentacinque slide, 7 schermate F, cinque riprese.
Il copione completo è di **49.215 caratteri**, riscritti dai circa
**21.460** di parlato degli script: poco più del doppio, come in tutto
il corso. Voce «Achille nuovo 1» da HeyGen, `eleven_v4`, 1,12× in post.

**Costo: 160 crediti HeyGen** fra il saldo d'inizio e quello di fine modulo
(6.155 → 5.995), voce e render insieme.

## Il modulo

Il messaggio breve, troppo corto perché il contesto lo corregga. Il tono che
manca e che aggiunge chi legge (5.1); la brevità che sotto le cinque o sei
parole diventa distanza, e pesa il doppio da chi coordina (5.2); i messaggi di
lavoro su un apparecchio che è anche personale, dove conta **quando** più di
come, e quello che dovrà essere ritrovato non va in una chat (5.3); quando non
si scrive — e scrivere per dare spazio, non per evitare una conversazione
(5.4); i gruppi, dove un messaggio a quindici sono quindici interruzioni e il
silenzio non è consenso (5.5).

## Le scelte di produzione

**La schermata F diventa una chat**, come chiede la nota del modulo: bolle
sobrie, nessuna app riconoscibile, ricevuti in panna e inviati in blu, le
due conversazioni **affiancate**. Perciò la voce dice «a sinistra e a
destra»: la prima stesura della 5.1 diceva «qui sopra», corretta prima di
generare la voce. Il messaggio lungo della 5.2 non si riporta: è indicato
tra parentesi, in corsivo.

**La 5.5 ha un modello da copiare** (il messaggio di apertura di un gruppo),
e con la colonna normale le sue quattro righe andavano a capo in nove:
`prima_dopo.mjs` ha guadagnato l'opzione **`largo`**, che allarga la colonna
di destra. Le scene sui ruoli (5.2, 5.3), sullo scrivere per non parlare
(5.4) e su chi crea i gruppi (5.5) sono dette senza accusare, come chiedono
le note.

## Quello che il modulo ha insegnato

- **Le prime stesure escono corte** — 8.409–9.089 caratteri — e si allungano
  a 9.750–9.960 prima di generare la voce. Un'aggiunta non apre mai un blocco
  con un gerundio che continua quello prima (5.5).
- **Le lezioni con più pose hanno meno voce**: la 5.3 chiude i 587 s con
  534 s di voce e 53 di pose; la 5.5 con 566 e 20.
- **Il memo di una frase sola si sente come silenzio**: nella 5.4 i due memo
  restano a schermo 2,7 e 3,0 s senza voce. È voluto, come nella 4.5.
- **I fotogrammi di controllo si calcolano su `durate.json`**, non su
  `pose.json`, che tiene solo il supplemento di posa: è il motivo per cui il
  fotogramma della F della 5.2 e della 5.3 era caduto sulla slide prima.
