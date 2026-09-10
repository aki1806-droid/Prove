# Registro — Modulo 1 · micro-lezione 1.2 «Il profilo professionale»

Corso di preparazione al concorso per Infermiere · Azienda Zero Veneto
CISL FP Padova Rovigo · slide + voce, nessun avatar

---

## Scheda parametri

```
TEMA      lezione normativa, seconda persona singolare
          testo di partenza: 19 slide con voce, 7.368 caratteri di parlato
COLORI    profilo §7.3 del MASTER — verde #00623A · rosso #D70328
MARCHIO   in alto a sinistra su tutte e 50 le scene
DURATA    obiettivo 9:30 (dallo script) · copertina 3 s · chiusura 10 s
VOCE      GianP — News Info and Documentary, eleven_v3 (la stessa della 1.1)
```

## Valori derivati, previsti e reali

| | previsto | reale |
|---|---|---|
| velocità di lettura | 16,3 car/s (stima prudente) | **17,0 car/s** |
| caratteri di copione | ~9.000 per 9:30 | 8.876 |
| blocchi · scene | 48 · 50 (il tetto) | 48 · 50 |
| parlato | 546 s | 522,4 s |
| montato | 9:19 | **8:55** |
| pose | 1, esplicita | 1 |
| blocchi fuori fascia 8,5–21 car/s | — | **0** |

Avevo abbassato la stima a 16,3 perché questa lezione è più fitta di numeri
della 1.1. Sbagliato: è uscita a **17,0**, più veloce della 1.1 (16,8). I numeri
di legge qui sono tanti ma corti — «739», «502», «comma tre» — mentre la 1.1
aveva una linea del tempo di sette anni interi da leggere per esteso.

**Per la 1.3 la stima da usare è 17,0.**

---

## Di quanto è stato riscritto il copione

Lo script dava 7.368 caratteri = **7:32** di montato, non i 9:30 stimati a 130
parole al minuto. Riscritto a 8.876 caratteri.

Le 19 slide diventano **19 capitoli**, 1–4 inquadrature ciascuno.

Aggiunto il *come* (MASTER §6):

| blocco | aggiunta | tipo |
|---|---|---|
| `s06` | essere un regolamento e non una legge conta: si cambia con un altro decreto | il meccanismo |
| `s11` | diploma e albo sono **due** requisiti, non uno | il test |
| `s12` | *generale*: la specialità si aggiunge dopo, non restringe il profilo | perché funziona |
| `s13` | perché i tre elenchi si confondono: stesso comma, due su tre hanno tre voci | il meccanismo |
| `s22` | il perché dei due verbi: di chi è il bisogno | perché funziona |
| `s23` | il recupero all'orale: non cercare il verbo, chiediti di chi è il bisogno | come si recupera |
| `s28` | *suo* vuol dire che ne risponde dall'inizio alla fine | perché funziona |
| `s30` | non è galateo: da come qualifichi il rapporto discende chi risponde | perché funziona |
| `s32` | attribuire non è delegare: la delega trasferisce, l'attribuzione distribuisce | il contrario |
| `s34` | se uno dei tre criteri non regge, la risposta è no | quando non si applica |
| `s37` | si giudica la decisione, non l'esito | il criterio di scelta |
| `s39` | il filo comune del non attribuibile: sono giudizi, non compiti | perché funziona |
| `s45` | il test aree/livelli: dove lavori contro fin dove sei arrivato | il test |
| `s49` | nessuno ricorda un decreto: si ricordano i numeri | il risultato vero |

---

## La posa esplicita

Le tue note di produzione chiedevano una **pausa piena** dopo «bisogni di
salute, partecipo; bisogni di assistenza infermieristica, identifico». C'è:
`s24` è un blocco corto apposta (119 caratteri) con **1,4 s** di silenzio in
coda, ed è a fondo verde pieno perché resti come immagine.

È la prima posa del corso — sulla 1.1 nessun blocco scendeva sotto i 3,5 s che
la fanno scattare in automatico. `tagli.py` ora rispetta anche una posa
dichiarata nel copione, non solo quella automatica.

---

## Tagli

**Zero tornate di correzione.** L'allineamento DTW fra punteggiatura e spezzoni
di parlato — il metodo corretto sulla 1.1 — ha dato 48 blocchi con **nessuno
fuori dalla fascia 8,5–21 car/s** al primo colpo. Sulla 1.1 la prima versione
ne sbagliava 17 su 48.

> **La verifica per trascrizione NON è stata eseguita.** Le due funzioni di
> caricamento su ElevenLabs (`creative_create_asset_upload` e
> `creative_finalize_asset_upload`) sono state bloccate da una regola di
> permessi a metà lavorazione, e senza quelle `prova.mp3` non si può
> trascrivere. Ho provato la strada alternativa dei sottotitoli generati da
> HeyGen: il proxy di rete non lascia scaricare da `files2.heygen.ai`.
>
> Al posto della verifica ho scritto `verifica-locale.py`, che è un controllo
> più debole ma non nullo. Non sa che cosa dice la voce; sa però riconoscere la
> **firma** di un confine spostato: se un taglio scivola avanti di una frase, il
> blocco prima diventa più lungo di quanto il suo testo prometta e quello dopo
> più corto — due scarti grandi, adiacenti e di segno opposto.
>
> Esito: scarto tipico **0,61 s** sulla traccia A e **0,70 s** sulla B, nessun
> blocco oltre 1,5 s, e una sola coppia adiacente di segno opposto (`s14`/`s15`,
> ~1 s). Sulla 1.1 i due confini davvero sbagliati slittavano di **3,4 e 5,1
> secondi**: quella firma qui non c'è.
>
> **Non basta.** Il controllo locale non può escludere che un taglio cada dentro
> una parola. Per chiudere davvero serve riabilitare le due funzioni di
> caricamento, e allora la verifica costa ~$0,17 e cinque minuti.

---

## Le grafiche

Il layout ha guadagnato tre cose che la 1.1 non aveva:

| aggiunta | dove serve |
|---|---|
| riquadri da 2 a 5, non più tre fissi | i quattro tipi di assistenza, le cinque aree post-base, i quattro campi di intervento |
| modo «cifre»: numeri grandi nei riquadri | `s13`, i tre elenchi del comma 2 — quattro, tre, tre |
| confronto a due colonne con una riga sotto | `s07` (i due articoli), `s44` (aree contro livelli), `s48` |
| elenchi con marcatori propri | le lettere **a–e** del comma 3, e i numeri **2 4 3 3 5 5** del memo finale |

| tipo di slide | quante |
|---|---|
| frase | 16 |
| elenco | 12 |
| confronto | 6 |
| tre/quattro/cinque riquadri | 6 |
| sostituzione con freccia | 3 |
| trappola, copertina | 4 |
| norma, citazione, titolo | 3 |

**Due difetti corretti dopo aver guardato i PNG:**

- sul fondo verde i titoli sono già bianchi, quindi gli accenti sparivano —
  proprio su `s24`, la slide delle due parole da memorizzare. Ora il titolo si
  smorza di poco e l'accento resta bianco pieno e più pesante;
- il numero di lezione in alto a destra diceva ancora **1.1**: era cablato nei
  generatori. Ora viene dal nome della cartella, così non si può dimenticare.

---

## Riprese e immagini generate

Nessuna. Lezione a sole slide, nessuna pausa senza voce.

---

## Da verificare — quello che non ho potuto giudicare io

1. **La verifica dei tagli**, per il motivo scritto sopra. È il punto aperto
   più importante: riabilita le due funzioni di caricamento ElevenLabs e la
   chiudo.
2. **Come suona la voce.** Non l'ho ascoltata. In particolare la posa di 1,4 s
   dopo `s24`: è la pausa piena che volevi, o è troppo corta?
3. **`s14`/`s15`**, l'unica coppia che il controllo locale segnala. Uno scarto
   di un secondo è dentro la variabilità normale, ma vale un ascolto.
4. **La ripetizione voluta** fra `s35` e `s48`: la regola d'oro compare due
   volte, la seconda nel memo di chiusura. È un richiamo, non una svista.
5. **Il contenuto normativo** viene dal tuo script e non l'ho toccato nel
   merito. L'unica cosa che ho aggiunto di mio e che vale la pena ricontrollare
   è in `s06`: «essere un regolamento e non una legge conta, si cambia con un
   altro decreto».
