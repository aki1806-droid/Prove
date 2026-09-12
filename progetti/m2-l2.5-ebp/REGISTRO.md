# Registro — Modulo 2 · micro-lezione 2.5 «EBP, linee guida, PDTA e procedure»

Prima lezione che attraversa la catena di montaggio senza un solo intoppo
proprio: nessun confine spostato, nessuna figura falsa, nessuno sforo di
cornice sopravvissuto alla prima passata. Quello che resta da segnare sono
due cose piccole trovate lungo la strada, e una svista di procedura.

---

## Scheda parametri

| | |
|---|---|
| durata chiesta dallo script | 8 minuti e 30 |
| durata ottenuta | **8:44.4** |
| slide dello script | 17 |
| scene | 50 (il tetto) |
| blocchi di parlato | 48 |
| voce | GianP — News Info and Documentary, `eleven_v3` |
| costo voce | $1,43 |
| costo trascrizioni | $0,55 |
| pause senza voce | nessuna; cinque pose brevi dentro il parlato |

```
CARATTERI  8.563          BLOCCHI  48         SCENE  50/50
stima a 17,0 car/s        8:42.7
reale                     8:44.4      (parlato 511,0 s, 16,8 car/s)
```

Un secondo e sette di scarto sulla stima. Il fattore dei silenzi qui e'
**1,122** — il quinto valore diverso in cinque lezioni (1,152 · 1,090 ·
1,081 · 1,196 · 1,122) — e l'atempo calcolato **1,066**.

Vale la pena fermarsi un attimo su questa colonna di numeri. Cinque lezioni,
stessa voce, stesso modello, stesse impostazioni: 1,081 e 1,196 sono lontani
l'uno dall'altro del dieci per cento. Se il fattore fosse rimasto la costante
che era, questa lezione sarebbe uscita a 16,1 o a 17,8 car/s a seconda della
lezione da cui avessimo copiato il numero. Misurarlo costa una passata di
ffmpeg su due file: e' il rapporto costo/beneficio migliore di tutta la
catena.

---

## L'allineamento, con il peso giusto

Prima lezione ritagliata dall'inizio con la DTW pesata sul tempo invece che
sui caratteri — la correzione nata da 2.4. Il risultato si legge nel
controllo statistico:

| | traccia A | traccia B |
|---|---|---|
| scarto tipico | 0,55 s | 0,74 s |
| blocchi fuori fascia | 0 | 0 |
| coppie adiacenti di segno opposto | **nessuna** | **nessuna** |

Nessun confine da guardare a mano. E' la prima lezione del corso in cui il
controllo non ha nulla da dire.

---

## Due rese dichiarate in piu'

Il confronto trascrizione/copione si e' fermato a 99,4% e 99,1% per due
parole composte che il trascrittore scrive a modo suo: `metanalisi` gli
diventa «meta analisi» e `check list` gli diventa «checklist». Non sono
buchi della voce — e' la stessa parola detta nello stesso modo, spaziata
diversamente — e stavano gia' per sembrare un difetto due volte.

Aggiunte a `RESE` in `verifica-testo.py`, il confronto sale a **99,6% su
entrambe le tracce, zero buchi da tre parole o piu'**. Le cinque differenze
che restano sono sviste una tantum del trascrittore («a tar poco» per «a tra
poco», «riduci le» per «riducile»): l'audio dice la parola giusta.

---

## Due sfori di larghezza, nessuna figura nuova

- **s06**, un `tre` con `cifre:true`: +132 px. La sigla `C·O` in cifre grandi
  e' larghissima. Tolto `cifre`.
- **s13**, sempre un `tre` con `cifre:true`: +254 px. Qui il rimedio non
  bastava, ed erano quattro voci forzate in tre celle: convertito in
  `griglia` a quattro celle.

La libreria grafica non e' cresciuta: e' la prima lezione che sta dentro
quello che c'era gia'.

---

## La svista di procedura

`applica` e' stato lanciato prima di `allinea`, ed e' morto su
`confini-A.json` che non c'era. Nessun danno — il file mancante e' un
errore, non un risultato sbagliato — ma e' la seconda volta in questo
modulo che l'ordine dei passi viene sbagliato a memoria. L'ordine e':

```
allinea → applica → verifica-locale.py → trascrizioni → verifica-testo.py
```

`verifica-locale.py` sta nella radice del progetto, non in `audio/`:
`audio/verifica.py` e' un'altra cosa (confronta la trascrizione di
`prova.mp3`, uno spezzone per confine, e serve solo quando il controllo
statistico segnala qualcosa da guardare).

---

## La resa

| | |
|---|---|
| resa pubblicata | `d102ae6a673dd2b9af99786b3f226c35` — **8:43.0** |
| lotto asset | `28291cc3757042ae80c3f52b704031fc` (98 file) |

---

## Da verificare

- Il fattore dei silenzi ha cinque valori misurati (1,081 – 1,196). Quando
  le otto lezioni del modulo saranno chiuse vale la pena guardarli insieme e
  capire da che cosa dipende lo scarto: se e' la densita' di punteggiatura
  del copione, si puo' prevedere invece che misurarlo.
- Il peso delle cifre (×4) nella DTW resta tarato sui 48 blocchi di 1.3. Qui
  ha funzionato, ma questa lezione ha poche cifre parlate: non e' una prova.
  Il ritaglio da ritarare su una lezione ricca di numeri di legge.
- I nomi `verifica-locale.py` (radice) e `audio/verifica.py` sono troppo
  simili per due controlli diversi, e hanno gia' fatto sbagliare comando due
  volte. Da rinominare in `controllo-statistico.py` e
  `controllo-per-trascrizione.py` alla prossima lezione nuova, cosi' che
  `nuova-lezione.sh` li propaghi gia' corretti.
