# Leggere la busta paga. Sanità pubblica
## Video unico di circa 60 minuti · CISL FP Padova Rovigo
## 1. Scheda tecnica
| Voce | Valore |
|---|---|
| Formato | 16:9, 1920×1080, sottotitoli attivi |
| Scene | 218 in 6 segmenti di produzione |
| Durata stimata | 60 min (parlato 58 min a 1,12x + card, copertina, chiusura, transizioni) |
| Caratteri di parlato | 56269 |
| Voce | ElevenLabs "Achille nuovo 1", eleven_multilingual_v2, poi ffmpeg silenceremove + atempo=1.12 |
| Avatar | da confermare (look e account HeyGen) |
| Montaggio | HeyGen create_video_from_studio, una chiamata per segmento; unione finale con ffmpeg |
## 2. Perché in segmenti
Il montaggio da studio accetta al massimo 50 scene per chiamata. Il video è quindi prodotto in 6 segmenti, tagliati solo all'inizio di un capitolo, e unito in un unico MP4 senza ricodifica:
```
file 'segmento_01.mp4'
file 'segmento_02.mp4'
file 'segmento_03.mp4'
file 'segmento_04.mp4'
file 'segmento_05.mp4'
file 'segmento_06.mp4'
```
`ffmpeg -f concat -safe 0 -i lista.txt -c copy busta_paga_60min.mp4`

Segmenti:
- Segmento 1: scene 1-43 (43 scene), capitoli [1, 2], circa 12 min
- Segmento 2: scene 44-81 (38 scene), capitoli [3, 4], circa 11 min
- Segmento 3: scene 82-116 (35 scene), capitoli [5, 6], circa 10 min
- Segmento 4: scene 117-150 (34 scene), capitoli [7, 8], circa 9 min
- Segmento 5: scene 151-192 (42 scene), capitoli [9, 10, 11], circa 12 min
- Segmento 6: scene 193-218 (26 scene), capitoli [12, 13], circa 7 min

## 3. Regole di layout, palette, tipografia, alternanza
Invariate rispetto alla versione in dieci video (vedi `00_SCHEDA_CORSO.md` della cartella precedente): logo in alto a sinistra, avatar in basso a destra nelle slide+avatar, clip con dominante verde e fascia testo, mai due scene consecutive dello stesso tipo, nessuna cifra nel parlato, massimo novanta parole per scena. Le card di capitolo (verde scuro, numero arancione) durano due secondi e segnano i tredici capitoli; la barra in basso mostra l'avanzamento.
## 4. Capitoli
| N. | Capitolo | Scene | Inizio stimato |
|---|---|---|---|
| 1 | Com'è fatta la busta paga | 16 | 01:53 |
| 2 | Le colonne e i segni | 17 | 06:46 |
| 3 | Lo stipendio fisso | 18 | 11:39 |
| 4 | Il salario accessorio | 18 | 17:26 |
| 5 | Contributi e pensione | 15 | 22:49 |
| 6 | Le tasse in busta paga | 18 | 27:22 |
| 7 | Trattenute e totali | 16 | 32:59 |
| 8 | I mesi speciali | 16 | 37:17 |
| 9 | Dieci controlli in cinque minuti | 14 | 41:59 |
| 10 | Assenze e busta paga | 13 | 45:47 |
| 11 | Leggiamo insieme un cedolino | 12 | 49:49 |
| 12 | Lo stipendio in un anno | 9 | 53:34 |
| 13 | Le domande dello sportello | 14 | 56:23 |

## 5. Script scena per scena
### Scena 001 · Copertina (3 s, muta) · segmento 1
**Asset:** `slide_png/L00_S001_COVER.png`
*Nessun parlato.*
### Scena 002 · Avatar a tutto schermo · segmento 1
**Regia:** Primo piano, tono diretto e caldo. Pausa dopo 'la chiudi'.
**Parlato** (61 parole, circa 21 s):

> Ogni mese arriva. La apri, guardi l'ultima riga e la chiudi. Ti capisco: la busta paga sembra scritta apposta per non farsi leggere. Codici, asterischi, sigle, colonne. Eppure lì dentro c'è il tuo lavoro: i turni, le notti, i festivi, gli anni di servizio, il contratto che abbiamo firmato. Se non la sai leggere, non sai se ti hanno pagato tutto.
### Scena 003 · Grafica animata (voce fuori campo) · segmento 1
**Asset:** `animazioni_mp4/A01_le_tre_zone_del_cedolino.mp4` · Le tre zone del cedolino
**Parlato** (45 parole, circa 16 s):

> In questo corso la smontiamo insieme, riga per riga. Partiamo da un cedolino del tutto simile a quello della nostra Azienda Ospedale Università, con dati di fantasia, e impariamo a riconoscere le tre zone: l'intestazione, il corpo con le voci, il piede con i totali.
### Scena 004 · Slide a piena inquadratura (voce fuori campo) · segmento 1
**Asset:** `slide_png/L00_S004_SLIDE.png`
**Parlato** (43 parole, circa 16 s):

> Vedremo lo stipendio fisso e il salario accessorio, i contributi per la pensione, le tasse, le trattenute, i mesi speciali come dicembre e il periodo del settecentotrenta. E alla fine avrai una lista di dieci controlli da fare in cinque minuti, ogni mese.
### Scena 005 · Clip b-roll (voce fuori campo) · segmento 1
**Clip suggerita (Higgsfield/Artlist):** Corridoio di reparto ospedaliero di notte, infermiera di spalle che cammina verso una postazione illuminata, luce fredda, camera lenta in carrello, realistico, nessun volto riconoscibile  
**Testo su fascia verde:** Turni, notti, festivi: le voci più a rischio
**Parlato** (36 parole, circa 13 s):

> Non serve essere esperti di contabilità. Serve sapere dove guardare. Chi lavora in sanità lavora su turni, di notte, nei festivi: sono proprio queste le voci che si sbagliano più spesso, e quelle che nessuno controlla.
### Scena 006 · Slide + avatar in basso a destra · segmento 1
**Asset:** `slide_png/L00_S006_SLIDE_AV.png`
**Parlato** (33 parole, circa 12 s):

> Una regola, prima di cominciare: conserva le tue buste paga. Tutte. Sono la prova di quello che hai ricevuto, e per chiedere somme non pagate hai un tempo limitato: in generale cinque anni.
### Scena 007 · Slide a piena inquadratura (voce fuori campo) · segmento 1
**Asset:** `slide_png/L00_S007_SLIDE.png`
**Parlato** (51 parole, circa 18 s):

> Questo video dura circa un'ora ed è diviso in capitoli. Puoi vederlo tutto di fila, oppure saltare al capitolo che ti serve: la tabella dei capitoli è qui a schermo e nella descrizione. Ti consiglio di tenere accanto una tua busta paga recente: ogni cosa che spiego, provala subito sulla tua.
### Scena 008 · Avatar a tutto schermo · segmento 1
**Regia:** Chiusura con sorriso, sguardo in camera.
**Parlato** (30 parole, circa 10 s):

> E se qualcosa non ti torna, non restare con il dubbio. Porta la tua busta paga alla CISL FP di Padova e Rovigo: la guardiamo insieme, voce per voce. Cominciamo.

---

## Capitolo 1 · Com'è fatta la busta paga

### Scena 009 · Card di capitolo (2 s, muta)
**Asset:** `slide_png/L00_S009_CHAPTER.png`
### Scena 010 · Avatar a tutto schermo · segmento 1
**Parlato** (53 parole, circa 19 s):

> In questa lezione impariamo a orientarci. Prima di leggere le cifre bisogna sapere come è costruito il documento. La busta paga, o cedolino, è il prospetto che il datore di lavoro deve consegnarti ogni mese: per legge deve indicare chi sei, che lavoro fai, cosa ti viene pagato e cosa ti viene trattenuto.
### Scena 011 · Grafica animata (voce fuori campo) · segmento 1
**Asset:** `animazioni_mp4/A01_le_tre_zone_del_cedolino.mp4` · Le tre zone del cedolino
**Parlato** (54 parole, circa 19 s):

> Qualunque cedolino, anche il più fitto, è diviso in tre zone. In alto l'intestazione: i tuoi dati e quelli del tuo rapporto di lavoro. Al centro il corpo: l'elenco delle voci, una per riga. In basso il piede: i totali, fino al netto a pagare. Leggere bene significa passare da una zona all'altra, nell'ordine.
### Scena 012 · Slide a piena inquadratura (voce fuori campo) · segmento 1
**Asset:** `slide_png/L00_S012_SLIDE.png`
**Parlato** (37 parole, circa 14 s):

> Partiamo dall'intestazione. In cima trovi il mese di liquidazione: attenzione, è il mese in cui vieni pagato, non sempre quello in cui hai lavorato. Poi la matricola, il tuo numero identificativo in Azienda, e il codice fiscale.
### Scena 013 · Slide + avatar in basso a destra · segmento 1
**Asset:** `slide_png/L00_S013_SLIDE_AV.png`
**Parlato** (48 parole, circa 18 s):

> Subito dopo ci sono tre date: nascita, assunzione ed eventuale cessazione. La data di assunzione conta: da lì dipendono l'anzianità, i tempi per i differenziali economici e, per chi è stato assunto dal duemilauno in poi, il trattamento di fine rapporto al posto di quello di fine servizio.
### Scena 014 · Slide a piena inquadratura (voce fuori campo) · segmento 1
**Asset:** `slide_png/L00_S014_SLIDE.png`
**Parlato** (46 parole, circa 20 s):

> La riga più importante dell'intestazione è la posizione funzionale. Qui c'è scritto in quale area sei inquadrato e con quale profilo. Con il nuovo ordinamento le vecchie categorie sono state sostituite da cinque aree: personale di supporto, operatori, assistenti, professionisti della salute e funzionari, elevata qualificazione.
### Scena 015 · Avatar a tutto schermo · segmento 1
**Parlato** (36 parole, circa 16 s):

> Controllala sempre, soprattutto dopo un cambiamento. Se hai vinto una progressione verticale, se hai cambiato profilo o incarico, l'intestazione deve cambiare. Se resta quella vecchia, è molto probabile che anche lo stipendio sia rimasto quello vecchio.
### Scena 016 · Slide a piena inquadratura (voce fuori campo) · segmento 1
**Asset:** `slide_png/L00_S016_SLIDE.png`
**Parlato** (41 parole, circa 16 s):

> Accanto trovi il tipo di rapporto di lavoro. Normale significa tempo pieno. Se sei in part time deve comparire la percentuale corretta, perché lo stipendio fisso viene riproporzionato proprio su quella percentuale. Un errore qui si trascina su tutte le voci.
### Scena 017 · Clip b-roll (voce fuori campo) · segmento 1
**Clip suggerita (Higgsfield/Artlist):** Mani che confrontano un foglio stampato con lo schermo di uno smartphone su un tavolo di una sala relax ospedaliera, luce naturale, dettaglio, nessun dato leggibile  
**Testo su fascia verde:** Sede e IBAN: verifica dopo ogni cambio
**Parlato** (32 parole, circa 12 s):

> Infine la sede di lavoro e la modalità di pagamento, con le coordinate bancarie. Sembra un dettaglio, ma se hai cambiato conto corrente è qui che verifichi che la comunicazione sia arrivata.
### Scena 018 · Slide a piena inquadratura (voce fuori campo) · segmento 1
**Asset:** `slide_png/L00_S018_SLIDE.png`
**Parlato** (38 parole, circa 17 s):

> Ricapitoliamo i controlli dell'intestazione: mese di liquidazione, area e profilo, tipo di rapporto e percentuale di part time, coordinate bancarie. Quattro righe, trenta secondi. Nella prossima lezione entriamo nel corpo del cedolino e impariamo a leggere le colonne.
### Scena 019 · Slide + avatar in basso a destra · segmento 1
**Asset:** `slide_png/L00_S019_SLIDE_AV.png`
**Parlato** (61 parole, circa 24 s):

> Un caso che vediamo spesso allo sportello. Una collega vince la progressione da operatore ad assistente. Nella busta del mese dopo l'intestazione dice ancora area degli operatori. Lo stipendio tabellare è quello vecchio, l'indennità di specificità è quella vecchia. Tutto il resto sembra normale. Ma è sbagliato da capo a piedi, e l'errore si vede solo leggendo la seconda riga dell'intestazione.
### Scena 020 · Avatar a tutto schermo · segmento 1
**Parlato** (56 parole, circa 20 s):

> Un altro caso: il part time. Chi passa al part time verticale o orizzontale deve vedere la percentuale nell'intestazione, e da quel mese le voci fisse scendono in proporzione. Chi torna a tempo pieno deve vedere di nuovo la dicitura normale. Un ritardo di un mese in questa riga vale, in genere, alcune centinaia di euro.
### Scena 021 · Grafica animata (voce fuori campo) · segmento 1
**Asset:** `animazioni_mp4/A11_part_time_fisso_e_accessorio.mp4` · Part time: fisso e accessorio
**Parlato** (55 parole, circa 20 s):

> Ecco come funziona il riproporzionamento. Con un part time al cinquanta per cento, tabellare, differenziali e indennità fisse si dimezzano. Con un part time all'ottantatré per cento, tipico dei trenta ore, scendono di circa un sesto. Le voci accessorie invece si pagano per quello che fai: una notte è una notte, anche in part time.
### Scena 022 · Slide a piena inquadratura (voce fuori campo) · segmento 1
**Asset:** `slide_png/L00_S022_SLIDE.png`
**Parlato** (60 parole, circa 21 s):

> La data di assunzione ha un altro effetto pratico: il periodo di prova e la maturazione delle ferie. Nel primo triennio di servizio le ferie sono meno che dopo, ma l'ipotesi di rinnovo equipara i neoassunti a chi ha più di tre anni. Anche questo, con la firma definitiva, si rifletterà nel conteggio ferie che alcune aziende stampano in busta.
### Scena 023 · Clip b-roll (voce fuori campo) · segmento 1
**Clip suggerita (Higgsfield/Artlist):** Cartello direzionale all'ingresso di un ospedale con nomi di padiglioni, persona in divisa che passa sfocata, luce del pomeriggio, inquadratura fissa  
**Testo su fascia verde:** Sede amministrativa e sede reale possono differire
**Parlato** (44 parole, circa 16 s):

> Per chi lavora in più sedi, o è in assegnazione temporanea, la sede indicata è quella amministrativa: non coincide sempre con il reparto in cui timbri. Non è un errore, ma se ti spostano in una sede disagiata verifica che partano le indennità collegate.
### Scena 024 · Slide + avatar in basso a destra · segmento 1
**Asset:** `slide_png/L00_S024_SLIDE_AV.png`
**Parlato** (53 parole, circa 20 s):

> Nell'intestazione del nostro esempio c'è anche la dicitura incarico base e la sigla del livello. Con il nuovo ordinamento ogni dipendente ha un incarico: di base per tutti, oppure di funzione, di organizzazione o professionale per chi ha responsabilità in più. L'incarico si vede qui, e la sua indennità si vede nel corpo.
### Scena 025 · Avatar a tutto schermo · segmento 1
**Parlato** (32 parole, circa 12 s):

> Se nella tua intestazione c'è qualcosa che non corrisponde, passa da noi alla CISL FP di Padova e Rovigo con il cedolino: verifichiamo insieme e, se serve, prepariamo la richiesta di correzione.

---

## Capitolo 2 · Le colonne e i segni

### Scena 026 · Card di capitolo (2 s, muta)
**Asset:** `slide_png/L00_S026_CHAPTER.png`
### Scena 027 · Avatar a tutto schermo · segmento 1
**Parlato** (45 parole, circa 16 s):

> Il corpo del cedolino è una tabella. Ogni riga è una voce, cioè una somma che ti viene pagata o trattenuta. Ogni colonna ti dice qualcosa di quella somma. Una volta capite le colonne, qualsiasi riga diventa leggibile, anche quella che non hai mai visto.
### Scena 028 · Grafica animata (voce fuori campo) · segmento 1
**Asset:** `animazioni_mp4/A02_le_colonne_del_corpo.mp4` · Le colonne del corpo
**Parlato** (49 parole, circa 19 s):

> Da sinistra a destra: il codice voce, un numero che identifica la voce nel sistema paghe. La descrizione, spesso abbreviata. La quantità: giorni, ore o numero di turni. L'importo unitario, cioè quanto vale ogni giorno o ogni ora. Il segno. L'importo totale. E infine la colonna scadenza o riferimento.
### Scena 029 · Slide a piena inquadratura (voce fuori campo) · segmento 1
**Asset:** `slide_png/L00_S029_SLIDE.png`
**Parlato** (47 parole, circa 19 s):

> Quantità e importo unitario servono a fare una verifica semplice. Moltiplica la quantità per l'importo unitario e devi ottenere l'importo. Per esempio: diciannove giorni di turno per due euro e sette centesimi fanno trentanove euro e trentatré centesimi. Se il conto non torna, c'è qualcosa da chiarire.
### Scena 030 · Slide + avatar in basso a destra · segmento 1
**Asset:** `slide_png/L00_S030_SLIDE_AV.png`
**Parlato** (34 parole, circa 12 s):

> Ora il segno, forse la colonna più importante. Il più indica una competenza: soldi che ti spettano e che si sommano. Il meno indica una trattenuta: soldi che vengono tolti. E poi c'è l'asterisco.
### Scena 031 · Grafica animata (voce fuori campo) · segmento 1
**Asset:** `animazioni_mp4/A08_le_righe_con_lasterisco.mp4` · Le righe con l'asterisco
**Parlato** (50 parole, circa 20 s):

> Le righe con l'asterisco non sono soldi. Non entrano né escono dalla tua tasca. Sono basi di calcolo: l'imponibile per i contributi, l'imponibile fiscale, le detrazioni, la retribuzione utile per il trattamento di fine rapporto, il contributo che l'Azienda versa per te al fondo pensione. Servono per controllare i calcoli.
### Scena 032 · Slide a piena inquadratura (voce fuori campo) · segmento 1
**Asset:** `slide_png/L00_S032_SLIDE.png`
**Parlato** (48 parole, circa 19 s):

> Ultima colonna: scadenza o riferimento. Qui trovi il mese e l'anno a cui si riferisce la voce. Se il riferimento è diverso dal mese di liquidazione, stai ricevendo qualcosa che riguarda un periodo passato: indennità dei mesi precedenti, conguagli, arretrati. Oppure, per un prestito, la data di scadenza.
### Scena 033 · Avatar a tutto schermo · segmento 1
**Parlato** (52 parole, circa 18 s):

> Qui nasce il dubbio più frequente: ho fatto le notti ad agosto, perché non le trovo nella busta di agosto? Perché le voci legate alle presenze vengono elaborate dopo la chiusura del mese e pagate con qualche mese di differenza. Non è un errore: è la colonna riferimento che te lo dice.
### Scena 034 · Grafica animata (voce fuori campo) · segmento 1
**Asset:** `animazioni_mp4/A05_il_mese_di_riferimento.mp4` · Il mese di riferimento
**Parlato** (40 parole, circa 16 s):

> Guarda l'esempio: nella busta di ottobre le indennità di turno, notte e festivo hanno riferimento agosto. Quindi, quando controlli i turni, devi confrontare la busta con il foglio presenze del mese indicato nel riferimento, non con quello del mese corrente.
### Scena 035 · Slide a piena inquadratura (voce fuori campo) · segmento 1
**Asset:** `slide_png/L00_S035_SLIDE.png`
**Parlato** (41 parole, circa 15 s):

> Un'ultima cosa sui codici. Le voci non sono messe a caso: in genere compaiono prima le voci fisse, poi quelle variabili, poi le ritenute e in fondo gli imponibili con l'asterisco. Imparare questo ordine ti fa trovare subito quello che cerchi.
### Scena 036 · Clip b-roll (voce fuori campo) · segmento 1
**Clip suggerita (Higgsfield/Artlist):** Bacheca turni cartacea in una guardiola di reparto, mano che scorre con il dito sulle righe, luce morbida, dettaglio macro, nessun nome leggibile  
**Testo su fascia verde:** Busta paga + prospetto turni
**Parlato** (23 parole, circa 7 s):

> Tieni a portata di mano il tuo prospetto turni o il cartellino: la busta paga si legge sempre in coppia con le presenze.
### Scena 037 · Slide + avatar in basso a destra · segmento 1
**Asset:** `slide_png/L00_S037_SLIDE_AV.png`
**Parlato** (52 parole, circa 19 s):

> Facciamo una prova del nove più difficile. Ventiquattro ore notturne per due euro e settantaquattro centesimi l'una: sessantacinque euro e settantasei centesimi. Sei pasti in mensa per un euro e tre centesimi: sei euro e venti centesimi. Se ti trovi a fare questi conti, sei già a metà del lavoro di controllo.
### Scena 038 · Avatar a tutto schermo · segmento 1
**Parlato** (48 parole, circa 18 s):

> Il codice voce non è uguale in tutte le aziende. Lo stesso importo, per esempio l'indennità notturna, ha un numero all'Azienda Ospedale Università e un altro all'ULSS. Per questo, nel corso, ti insegno a riconoscere le descrizioni e le famiglie di codici, non a imparare numeri a memoria.
### Scena 039 · Slide a piena inquadratura (voce fuori campo) · segmento 1
**Asset:** `slide_png/L00_S039_SLIDE.png`
**Parlato** (45 parole, circa 20 s):

> Le descrizioni sono abbreviate per motivi di spazio. Alcune sigle ricorrenti: I.V.C. è la vacanza contrattuale, D.E.P. i differenziali, I.Q.P. la vecchia indennità di qualificazione, C.P.D.E.L. la cassa pensioni, F.CREDITO il fondo credito, ADD. le addizionali, ARR. gli arretrati, CONG. il conguaglio, RIMB. un rimborso.
### Scena 040 · Slide + avatar in basso a destra · segmento 1
**Asset:** `slide_png/L00_S040_SLIDE_AV.png`
**Parlato** (44 parole, circa 16 s):

> Attenzione a una trappola di lettura: l'importo unitario è spesso indicato con cinque decimali, e la quantità con due. Non sono errori di stampa: il sistema paghe lavora così per non perdere centesimi nei mesi. Il totale di riga, invece, ha sempre due decimali.
### Scena 041 · Avatar a tutto schermo · segmento 1
**Parlato** (48 parole, circa 17 s):

> E i valori negativi tra gli asterischi? A volte trovi un imponibile con il segno meno dopo la cifra, per esempio l'imponibile eccedente per il contributo aggiuntivo. Significa che sei sotto la soglia. Anche qui: niente soldi che escono, solo un numero che dice come stanno i conti.
### Scena 042 · Slide + avatar in basso a destra · segmento 1
**Asset:** `slide_png/L00_S042_SLIDE_AV.png`
**Parlato** (42 parole, circa 19 s):

> Un'altra lettura utile: i codici che iniziano allo stesso modo appartengono spesso alla stessa famiglia. Nel nostro fac-simile le voci che cominciano con cinquantanove sono ritenute previdenziali, quelle con sessanta sono addizionali, quelle con novanta e novantacinque sono imponibili. Non impararle: riconoscile.
### Scena 043 · Avatar a tutto schermo · segmento 1
**Parlato** (37 parole, circa 14 s):

> Se hai la busta sul portale in formato digitale, spesso puoi cercare il testo. Cerca la parola arretrati, la parola conguaglio, la parola recupero: sono le tre parole che, quando compaiono, meritano sempre due minuti in più.

---

## Capitolo 3 · Lo stipendio fisso

### Scena 044 · Card di capitolo (2 s, muta)
**Asset:** `slide_png/L00_S044_CHAPTER.png`
### Scena 045 · Avatar a tutto schermo · segmento 2
**Parlato** (47 parole, circa 18 s):

> Le voci fisse sono la parte stabile della busta: arrivano ogni mese, uguali, finché non cambia qualcosa nel tuo inquadramento o nel contratto. Sono anche la base su cui si calcolano tredicesima, contributi e molte indennità. Se una voce fissa è sbagliata, l'errore si ripete ogni mese.
### Scena 046 · Slide a piena inquadratura (voce fuori campo) · segmento 2
**Asset:** `slide_png/L00_S046_SLIDE.png`
**Parlato** (45 parole, circa 17 s):

> La prima voce è lo stipendio tabellare. È la paga base della tua area, uguale per tutti quelli che vi sono inquadrati, ed è fissata dal contratto nazionale. Nel nostro esempio, un'infermiera dell'area dei professionisti della salute: il tabellare è la prima riga della busta.
### Scena 047 · Slide + avatar in basso a destra · segmento 2
**Asset:** `slide_png/L00_S047_SLIDE_AV.png`
**Parlato** (46 parole, circa 23 s):

> Ogni area ha il suo tabellare. Con il contratto duemilaventidue duemilaventiquattro, firmato in via definitiva il ventisette ottobre duemilaventicinque, i tabellari sono aumentati con decorrenza dal primo gennaio duemilaventiquattro. Il rinnovo duemilaventicinque duemilaventisette, siglato come ipotesi il ventinove luglio duemilaventisei, prevede nuovi aumenti in tre tappe.
### Scena 048 · Slide a piena inquadratura (voce fuori campo) · segmento 2
**Asset:** `slide_png/L00_S048_SLIDE.png`
**Parlato** (50 parole, circa 20 s):

> Subito sotto trovi l'indennità di vacanza contrattuale. È un piccolo anticipo che la legge riconosce quando il contratto è scaduto e il nuovo non è ancora in vigore. Quando il nuovo contratto viene firmato in via definitiva, l'indennità di vacanza viene assorbita dagli aumenti. Non la perdi: diventa parte dell'aumento.
### Scena 049 · Avatar a tutto schermo · segmento 2
**Parlato** (40 parole, circa 15 s):

> Per questo, quando arrivano gli arretrati di un rinnovo, l'importo è più basso di quello che ti aspettavi leggendo le tabelle: una parte l'hai già ricevuta, mese per mese, come vacanza contrattuale. Lo vedremo bene nella lezione sui mesi speciali.
### Scena 050 · Slide a piena inquadratura (voce fuori campo) · segmento 2
**Asset:** `slide_png/L00_S050_SLIDE.png`
**Parlato** (43 parole, circa 19 s):

> Poi ci sono i differenziali economici di professionalità, che molti chiamano ancora fasce. Sono la progressione economica dentro la tua area: si ottengono con procedure selettive periodiche, legate all'esperienza e alla valutazione. Ogni differenziale acquisito si somma al tabellare e resta per sempre.
### Scena 051 · Slide + avatar in basso a destra · segmento 2
**Asset:** `slide_png/L00_S051_SLIDE_AV.png`
**Parlato** (47 parole, circa 22 s):

> Poi le indennità fisse legate al profilo. Per il personale infermieristico l'indennità di specificità infermieristica. Per altri profili sanitari e per gli operatori l'indennità di tutela del malato. Per molti c'è l'indennità professionale specifica. E l'indennità di funzione parte fissa, erede della vecchia indennità di qualificazione professionale.
### Scena 052 · Slide a piena inquadratura (voce fuori campo) · segmento 2
**Asset:** `slide_png/L00_S052_SLIDE.png`
**Parlato** (46 parole, circa 21 s):

> Il rinnovo duemilaventicinque duemilaventisette rivaluta molto queste indennità. Per i professionisti della salute l'indennità di specificità infermieristica passerebbe da circa ottantotto a circa centottantuno euro al mese, con effetto dal primo gennaio duemilaventisei. Finché il contratto non è definitivo, in busta vedi ancora i valori attuali.
### Scena 053 · Clip b-roll (voce fuori campo) · segmento 2
**Clip suggerita (Higgsfield/Artlist):** Ingresso di un pronto soccorso con ambulanza ferma, luci di emergenza morbide, crepuscolo, inquadratura ampia statica, nessuna persona riconoscibile  
**Testo su fascia verde:** Incarichi e pronto soccorso: indennità dedicate
**Parlato** (26 parole, circa 11 s):

> Se hai un incarico, di organizzazione o professionale, trovi anche la relativa indennità, collegata all'incarico che ricopri. E se lavori in pronto soccorso, c'è un'indennità dedicata.
### Scena 054 · Slide a piena inquadratura (voce fuori campo) · segmento 2
**Asset:** `slide_png/L00_S054_SLIDE.png`
**Parlato** (53 parole, circa 20 s):

> Infine la tredicesima. Arriva a dicembre ed è pari a una mensilità delle voci fisse. Nel cedolino di dicembre la riconosci così: vedi le stesse voci fisse ripetute, con quantità dodici e riferimento all'anno. Sono le quote di tredicesima di ciascuna voce. Se hai lavorato solo una parte dell'anno, è proporzionata ai mesi.
### Scena 055 · Grafica animata (voce fuori campo) · segmento 2
**Asset:** `animazioni_mp4/A06_fisso_e_accessorio.mp4` · Fisso e accessorio
**Parlato** (50 parole, circa 19 s):

> Ripassiamo la struttura del fisso. Sotto tutto c'è il tabellare dell'area. Sopra si appoggiano i differenziali che hai acquisito negli anni. Poi le indennità legate al profilo. Il totale è la tua retribuzione fissa mensile, quella che torna uguale ogni mese e che moltiplicata per tredici dà la base annua.
### Scena 056 · Slide + avatar in basso a destra · segmento 2
**Asset:** `slide_png/L00_S056_SLIDE_AV.png`
**Parlato** (55 parole, circa 23 s):

> Come si passa da un differenziale all'altro? Con procedure selettive periodiche, bandite dall'Azienda con le risorse del fondo, sulla base di esperienza maturata e valutazione. L'ipotesi di rinnovo riduce a due anni la permanenza minima nel differenziale, per favorire anche i più giovani. E gli incarichi di base possono salire fino a tremilacinquecento euro l'anno.
### Scena 057 · Avatar a tutto schermo · segmento 2
**Parlato** (43 parole, circa 19 s):

> Un errore classico dopo una selezione per i differenziali: il nuovo importo parte, ma senza gli arretrati dalla decorrenza indicata nell'accordo. Oppure parte l'importo del differenziale sbagliato. Prendi l'accordo integrativo, cerca la decorrenza e confrontala con la colonna riferimento della voce di arretrato.
### Scena 058 · Slide a piena inquadratura (voce fuori campo) · segmento 2
**Asset:** `slide_png/L00_S058_SLIDE.png`
**Parlato** (45 parole, circa 18 s):

> Vediamo quanto vale davvero il rinnovo per un'infermiera come nel nostro esempio, a regime dal duemilaventisette: centotrenta euro e venti centesimi in più di tabellare al mese, più circa novantatré euro di indennità di specificità. In tutto oltre duecentoventi euro lordi al mese, tredici mensilità.
### Scena 059 · Clip b-roll (voce fuori campo) · segmento 2
**Clip suggerita (Higgsfield/Artlist):** Primo piano di mani che contano banconote su un tavolo di cucina accanto a una busta paga piegata, luce domestica calda, dettaglio, nessun volto  
**Testo su fascia verde:** Lordo e netto: in tasca circa due terzi
**Parlato** (35 parole, circa 13 s):

> Ricorda che gli aumenti sono lordi: in tasca arriva circa il sessanta, sessantacinque per cento, dopo contributi e tasse. È il motivo per cui la CISL FP chiede da anni la detassazione degli aumenti contrattuali.
### Scena 060 · Slide + avatar in basso a destra · segmento 2
**Asset:** `slide_png/L00_S060_SLIDE_AV.png`
**Parlato** (48 parole, circa 20 s):

> Per il personale del comparto ci sono anche voci fisse particolari: l'indennità di pronto soccorso, l'indennità per il personale del centodiciotto, quella per i servizi disagiati, e per i coordinatori l'indennità di coordinamento parte fissa e variabile. Se hai una di queste funzioni, cercale: se mancano, mancano soldi.
### Scena 061 · Avatar a tutto schermo · segmento 2
**Parlato** (59 parole, circa 23 s):

> Un chiarimento sulle aree. Chi era in categoria D con il vecchio ordinamento, per esempio infermieri e tecnici laureati, oggi è nell'area dei professionisti della salute e dei funzionari. Chi era in B S, per esempio gli operatori socio sanitari, è nell'area degli operatori. La C, per esempio gli assistenti amministrativi e i tecnici diplomati, è nell'area degli assistenti.
### Scena 062 · Slide a piena inquadratura (voce fuori campo) · segmento 2
**Asset:** `slide_png/L00_S062_SLIDE.png`
**Parlato** (39 parole, circa 15 s):

> Il passaggio dalle categorie alle aree non ha cambiato gli importi acquisiti: le vecchie fasce sono diventate differenziali con lo stesso valore. Se dopo il passaggio hai visto sparire una fascia, è un errore da correggere con gli arretrati.

---

## Capitolo 4 · Il salario accessorio

### Scena 063 · Card di capitolo (2 s, muta)
**Asset:** `slide_png/L00_S063_CHAPTER.png`
### Scena 064 · Avatar a tutto schermo · segmento 2
**Parlato** (46 parole, circa 18 s):

> Se le voci fisse sono la parte stabile, quelle accessorie sono la parte viva della busta. Raccontano come hai lavorato: quanti turni, quante notti, quanti festivi, quante reperibilità, quante ore in più. Sono anche le voci che si sbagliano più spesso, perché dipendono dalle presenze registrate.
### Scena 065 · Grafica animata (voce fuori campo) · segmento 2
**Asset:** `animazioni_mp4/A06_fisso_e_accessorio.mp4` · Fisso e accessorio
**Parlato** (36 parole, circa 13 s):

> Guarda come si compone una busta tipo: sotto la base fissa, uguale ogni mese; sopra lo strato variabile, che cambia con i turni. Per chi lavora in reparto sulle ventiquattro ore, questo strato può valere parecchio.
### Scena 066 · Slide a piena inquadratura (voce fuori campo) · segmento 2
**Asset:** `slide_png/L00_S066_SLIDE.png`
**Parlato** (52 parole, circa 20 s):

> Le principali voci accessorie. L'indennità di turno, per chi lavora su turni che coprono le ventiquattro ore: di solito è pagata a giornata. L'indennità notturna, pagata a ora per le ore lavorate di notte. L'indennità festiva, per i turni in giorno festivo. E l'indennità di pronta disponibilità, per ogni turno di reperibilità.
### Scena 067 · Slide + avatar in basso a destra · segmento 2
**Asset:** `slide_png/L00_S067_SLIDE_AV.png`
**Parlato** (39 parole, circa 14 s):

> Per ognuna di queste voci il controllo è lo stesso: prendi il prospetto turni del mese di riferimento, conta i giorni o le ore e confrontali con la colonna quantità. Poi verifica che quantità per importo unitario dia l'importo.
### Scena 068 · Slide a piena inquadratura (voce fuori campo) · segmento 2
**Asset:** `slide_png/L00_S068_SLIDE.png`
**Parlato** (53 parole, circa 20 s):

> Lo straordinario è pagato a ora, con maggiorazioni diverse: più quindici per cento se diurno, più trenta per cento se notturno o festivo, più cinquanta per cento se notturno e festivo insieme. La base è la tua retribuzione oraria, che dipende dall'area e dai differenziali. In alternativa, puoi chiedere di recuperare le ore.
### Scena 069 · Avatar a tutto schermo · segmento 2
**Parlato** (56 parole, circa 20 s):

> C'è poi una regola che molti non conoscono: in caso di malattia, per ogni episodio, nei primi dieci giorni si riceve solo il trattamento fondamentale e si perdono le voci accessorie. È una norma di legge, non un errore dell'ufficio paghe. Ma va applicata bene, e ci sono esclusioni, per esempio per ricoveri e terapie salvavita.
### Scena 070 · Slide a piena inquadratura (voce fuori campo) · segmento 2
**Asset:** `slide_png/L00_S070_SLIDE.png`
**Parlato** (33 parole, circa 13 s):

> Ecco il nostro esempio: nella busta di ottobre troviamo diciannove giorni di turno, ventiquattro ore notturne e due festivi. Tutti con riferimento agosto. Quindi il confronto va fatto con i turni di agosto.
### Scena 071 · Clip b-roll (voce fuori campo) · segmento 2
**Clip suggerita (Higgsfield/Artlist):** Tavolo di riunione con documenti e caffè, persone sedute di spalle e mani che indicano un grafico stampato, luce da finestra, inquadratura laterale lenta  
**Testo su fascia verde:** Produttività: si decide in contrattazione integrativa
**Parlato** (46 parole, circa 18 s):

> Poi c'è la produttività, o premialità. Non arriva ogni mese: dipende dal fondo aziendale, dagli obiettivi e dalla valutazione, e di solito viene pagata a saldo. Quanto vale e come si distribuisce lo decide la contrattazione integrativa, dove la RSU e i sindacati trattano con l'Azienda.
### Scena 072 · Slide + avatar in basso a destra · segmento 2
**Asset:** `slide_png/L00_S072_SLIDE_AV.png`
**Parlato** (39 parole, circa 17 s):

> Una novità importante arriva con il rinnovo duemilaventicinque duemilaventisette: il riconoscimento delle indennità anche durante i giorni di ferie. È un risultato ottenuto anche grazie alle cause patrocinate dalla CISL FP. Diventerà operativo con la firma definitiva del contratto.
### Scena 073 · Slide a piena inquadratura (voce fuori campo) · segmento 2
**Asset:** `slide_png/L00_S073_SLIDE.png`
**Parlato** (50 parole, circa 18 s):

> La pronta disponibilità merita un capitolo a parte. Si paga per ogni turno di reperibilità, con un importo per dodici ore. Se vieni chiamato, le ore lavorate si pagano come straordinario o si recuperano. Trovi quindi due voci diverse: l'indennità per la reperibilità in sé, e le ore di chiamata.
### Scena 074 · Avatar a tutto schermo · segmento 2
**Parlato** (40 parole, circa 16 s):

> C'è un limite contrattuale ai turni di reperibilità nel mese, salvo accordi aziendali diversi. Se ti ritrovi con più reperibilità del previsto, non è solo una questione di soldi: è organizzazione del lavoro, e passa dal tavolo con l'Azienda. Segnalacelo.
### Scena 075 · Slide a piena inquadratura (voce fuori campo) · segmento 2
**Asset:** `slide_png/L00_S075_SLIDE.png`
**Parlato** (45 parole, circa 18 s):

> Lo straordinario ha un altro punto delicato: l'autorizzazione. Le ore in più devono essere autorizzate, altrimenti l'Azienda può non pagarle. Ma se le ore risultano dal cartellino, e sono state necessarie per il servizio, la pretesa di non pagarle si può contestare. Conserva le timbrature.
### Scena 076 · Grafica animata (voce fuori campo) · segmento 2
**Asset:** `animazioni_mp4/A12_straordinario_ora_per_ora.mp4` · Straordinario ora per ora
**Parlato** (42 parole, circa 19 s):

> Facciamo il conto con i valori del rinnovo a regime. Retribuzione oraria di un'infermiera senza differenziali: quindici euro e trentadue centesimi. Straordinario diurno: diciassette euro e sessantadue. Notturno o festivo: diciannove euro e novantadue. Notturno e festivo insieme: ventidue euro e novantanove.
### Scena 077 · Slide a piena inquadratura (voce fuori campo) · segmento 2
**Asset:** `slide_png/L00_S077_SLIDE.png`
**Parlato** (47 parole, circa 19 s):

> Le prestazioni aggiuntive sono un'altra cosa ancora: ore oltre l'orario, su base volontaria, per abbattere liste d'attesa o coprire carenze, pagate a tariffa oraria fissata dall'accordo. In busta hanno una voce dedicata e, per legge, una tassazione agevolata al quindici per cento. Verifica sempre tariffa e ore.
### Scena 078 · Slide + avatar in basso a destra · segmento 2
**Asset:** `slide_png/L00_S078_SLIDE_AV.png`
**Parlato** (42 parole, circa 16 s):

> Sul fondo della produttività il rinnovo porta in media duecentoventuno euro pro capite in più. Ma quanto arriva a te dipende dalla contrattazione integrativa aziendale: criteri, pesature, valutazione. È il posto dove la presenza della CISL FP al tavolo conta di più.
### Scena 079 · Clip b-roll (voce fuori campo) · segmento 2
**Clip suggerita (Higgsfield/Artlist):** Orologio a parete di un reparto che segna mezzanotte, corridoio vuoto sullo sfondo, luce notturna verde-blu, inquadratura fissa con leggero zoom  
**Testo su fascia verde:** Notte prefestiva: controlla come viene contata
**Parlato** (49 parole, circa 17 s):

> Un consiglio da chi controlla buste paga tutti i giorni: le indennità del sabato e delle notti prefestive sono le più dimenticate, perché il sistema conta il festivo dal turno di mattina e non dalla notte che lo precede. Se fai la notte del sabato, verifica come viene contata.
### Scena 080 · Slide + avatar in basso a destra · segmento 2
**Asset:** `slide_png/L00_S080_SLIDE_AV.png`
**Parlato** (51 parole, circa 18 s):

> Riepilogo del capitolo. Le voci accessorie si controllano con tre strumenti: il prospetto turni del mese di riferimento, la prova del nove quantità per unitario, e la conoscenza delle regole di malattia e ferie che le fanno sparire. Se manca una notte, vale la pena chiederla: in un anno sono soldi.
### Scena 081 · Avatar a tutto schermo · segmento 2
**Parlato** (47 parole, circa 17 s):

> Il salario accessorio è il posto dove si nascondono più soldi non pagati: una notte non registrata, un festivo dimenticato, una reperibilità persa. Tieni il tuo conteggio. E se non torna, vieni alla CISL FP di Padova e Rovigo con busta e turni: facciamo il confronto insieme.

---

## Capitolo 5 · Contributi e pensione

### Scena 082 · Card di capitolo (2 s, muta)
**Asset:** `slide_png/L00_S082_CHAPTER.png`
### Scena 083 · Avatar a tutto schermo · segmento 3
**Parlato** (31 parole, circa 12 s):

> Passiamo alle trattenute. Le prime sono i contributi previdenziali. Non sono soldi persi: servono a costruire la tua pensione e la tua liquidazione. Per questo vale la pena capire come funzionano.
### Scena 084 · Slide a piena inquadratura (voce fuori campo) · segmento 3
**Asset:** `slide_png/L00_S084_SLIDE.png`
**Parlato** (49 parole, circa 17 s):

> Chi lavora nelle aziende sanitarie pubbliche è iscritto, per la pensione, a una cassa gestita dall'INPS: in busta la trovi con la sigla CPDEL. La ritenuta a tuo carico è dell'otto virgola ottantacinque per cento. La vedi su due righe: una sulle voci fisse e una sulle voci accessorie.
### Scena 085 · Slide + avatar in basso a destra · segmento 3
**Asset:** `slide_png/L00_S085_SLIDE_AV.png`
**Parlato** (56 parole, circa 20 s):

> C'è poi un contributo aggiuntivo dell'uno per cento, che si applica solo sulla parte di retribuzione che supera una soglia annua fissata dalla legge. A volte viene trattenuto in un mese con retribuzione alta, come dicembre, e poi restituito se a fine anno la soglia non è stata superata. Se vedi un rimborso, ecco il motivo.
### Scena 086 · Slide a piena inquadratura (voce fuori campo) · segmento 3
**Asset:** `slide_png/L00_S086_SLIDE.png`
**Parlato** (38 parole, circa 14 s):

> Sotto trovi lo zero virgola trentacinque per cento per il fondo credito. È un piccolo contributo che ti dà accesso ai prestiti agevolati dell'INPS e alle sue prestazioni sociali, come borse di studio e soggiorni per i figli.
### Scena 087 · Grafica animata (voce fuori campo) · segmento 3
**Asset:** `animazioni_mp4/A09_tfs_o_tfr.mp4` · TFS o TFR
**Parlato** (59 parole, circa 23 s):

> Poi la liquidazione. Se sei stato assunto a tempo indeterminato prima del duemilauno, di norma hai il trattamento di fine servizio. Se sei stato assunto dopo, hai il trattamento di fine rapporto. In questo caso trovi una voce chiamata diminuzione retribuzione utile: non è una perdita, è un meccanismo contabile previsto dalla legge che lascia invariato il tuo netto.
### Scena 088 · Avatar a tutto schermo · segmento 3
**Parlato** (40 parole, circa 16 s):

> Poi c'è la previdenza complementare. Nel pubblico impiego il fondo di riferimento si chiama Perseo Sirio. Se aderisci, versi una percentuale che scegli tu, e l'Azienda aggiunge un suo contributo. È una seconda pensione, che si aggiunge a quella pubblica.
### Scena 089 · Slide a piena inquadratura (voce fuori campo) · segmento 3
**Asset:** `slide_png/L00_S089_SLIDE.png`
**Parlato** (49 parole, circa 17 s):

> In busta la riconosci da due righe. Il contributo del dipendente, con il segno meno: lo paghi tu. Il contributo del datore, con l'asterisco: non entra nella tua busta, va direttamente nel fondo a tuo nome. In più, i contributi al fondo riducono l'imponibile su cui paghi le tasse.
### Scena 090 · Clip b-roll (voce fuori campo) · segmento 3
**Clip suggerita (Higgsfield/Artlist):** Giovane operatrice sanitaria in divisa seduta su una panchina all'esterno dell'ospedale che legge un documento con aria concentrata, luce del mattino, profondità di campo ridotta  
**Testo su fascia verde:** Neoassunti: adesione con silenzio-assenso
**Parlato** (40 parole, circa 15 s):

> Per i neoassunti è previsto un meccanismo di adesione con silenzio assenso. Se non ricordi di aver scelto, controlla la busta: se trovi il contributo al fondo, sei iscritto. È una scelta importante, e merita di essere fatta con consapevolezza.
### Scena 091 · Slide + avatar in basso a destra · segmento 3
**Asset:** `slide_png/L00_S091_SLIDE_AV.png`
**Parlato** (38 parole, circa 14 s):

> Ti ricordi lo sgravio contributivo che trovavi in busta negli anni scorsi? Dal duemilaventicinque è stato sostituito da misure fiscali: non lo vedi più tra i contributi, ma tra le voci delle tasse. Ne parliamo nella prossima lezione.
### Scena 092 · Slide a piena inquadratura (voce fuori campo) · segmento 3
**Asset:** `slide_png/L00_S092_SLIDE.png`
**Parlato** (53 parole, circa 22 s):

> Un esempio numerico sui contributi. Sul fac-simile, il tabellare e le voci fisse fanno circa duemilaquattrocentotrenta euro: la ritenuta dell'otto virgola ottantacinque per cento è di duecentoquindici euro. Sulle voci accessorie, circa centoquaranta euro, la stessa aliquota vale dodici euro e mezzo. Le due righe insieme fanno i tuoi contributi pensione del mese.
### Scena 093 · Avatar a tutto schermo · segmento 3
**Parlato** (49 parole, circa 17 s):

> L'imponibile previdenziale è più alto del netto e più basso del lordo: comprende quasi tutto quello che ti viene pagato, ma non i rimborsi e non alcune voci esenti. È il numero che alimenta il tuo estratto conto contributivo, quello che puoi consultare sul sito dell'INPS con lo SPID.
### Scena 094 · Slide a piena inquadratura (voce fuori campo) · segmento 3
**Asset:** `slide_png/L00_S094_SLIDE.png`
**Parlato** (45 parole, circa 18 s):

> Controlla l'estratto conto almeno una volta l'anno. Se un mese di contributi manca, o l'imponibile è più basso di quello in busta, la pensione futura ne risente. Con la busta in mano il confronto è immediato: l'imponibile con l'asterisco deve corrispondere a quello dichiarato all'INPS.
### Scena 095 · Slide + avatar in basso a destra · segmento 3
**Asset:** `slide_png/L00_S095_SLIDE_AV.png`
**Parlato** (49 parole, circa 20 s):

> Sulla previdenza complementare, due numeri per decidere. La quota minima a tuo carico e quella dell'Azienda sono fissate dall'accordo istitutivo del fondo. Puoi versare di più, e quello che versi riduce le tasse perché esce dall'imponibile. Il rendimento dipende dal comparto scelto, e alla pensione hai rendita o capitale.
### Scena 096 · Avatar a tutto schermo · segmento 3
**Parlato** (44 parole, circa 17 s):

> Chi ha il trattamento di fine servizio, cioè gli assunti prima del duemilauno, ha un altro tema: i tempi di pagamento dopo la pensione, che possono essere lunghi. Ne parliamo volentieri in sede, perché ci sono strumenti, come l'anticipo bancario convenzionato, che pochi conoscono.
### Scena 097 · Slide a piena inquadratura (voce fuori campo) · segmento 3
**Asset:** `slide_png/L00_S097_SLIDE.png`
**Parlato** (48 parole, circa 20 s):

> Un riepilogo di tutto quello che esce dal lordo per la previdenza: cassa pensioni sull'intera retribuzione, contributo aggiuntivo oltre soglia, fondo credito, meccanismo del trattamento di fine rapporto, fondo complementare se aderisci. In tutto, per chi è iscritto al fondo, intorno al dieci, dodici per cento del lordo.

---

## Capitolo 6 · Le tasse in busta paga

### Scena 098 · Card di capitolo (2 s, muta)
**Asset:** `slide_png/L00_S098_CHAPTER.png`
### Scena 099 · Avatar a tutto schermo · segmento 3
**Parlato** (44 parole, circa 16 s):

> La seconda grande trattenuta sono le tasse. L'ufficio paghe fa da sostituto d'imposta: calcola ogni mese l'IRPEF che dovresti pagare e la versa allo Stato al posto tuo. Capire questo calcolo ti spiega perché il netto cambia anche quando il lordo è lo stesso.
### Scena 100 · Slide a piena inquadratura (voce fuori campo) · segmento 3
**Asset:** `slide_png/L00_S100_SLIDE.png`
**Parlato** (30 parole, circa 11 s):

> Si parte dall'imponibile fiscale, che trovi tra le voci con l'asterisco. È il lordo meno i contributi previdenziali e quelli al fondo pensione: su questi, infatti, non si pagano tasse.
### Scena 101 · Grafica animata (voce fuori campo) · segmento 3
**Asset:** `animazioni_mp4/A04_scaglioni_irpef_2026.mp4` · Scaglioni IRPEF 2026
**Parlato** (43 parole, circa 18 s):

> Sull'imponibile si applicano le aliquote IRPEF, che dal duemilaventisei sono tre: ventitré per cento fino a ventottomila euro, trentatré per cento da ventottomila a cinquantamila, quarantatré per cento oltre. Attenzione: ogni aliquota si applica solo alla sua fetta di reddito, non a tutto.
### Scena 102 · Slide + avatar in basso a destra · segmento 3
**Asset:** `slide_png/L00_S102_SLIDE_AV.png`
**Parlato** (49 parole, circa 19 s):

> Per questo esistono due aliquote diverse, che trovi nei progressivi della busta. L'aliquota marginale è quella della fetta più alta del tuo reddito. L'aliquota media è quella che paghi davvero, in proporzione, su tutto. Guadagnare qualche euro in più non ti fa mai perdere netto per colpa degli scaglioni.
### Scena 103 · Slide a piena inquadratura (voce fuori campo) · segmento 3
**Asset:** `slide_png/L00_S103_SLIDE.png`
**Parlato** (60 parole, circa 22 s):

> Dall'imposta lorda si tolgono le detrazioni. Quella per lavoro dipendente, più alta per i redditi bassi, che cala man mano che il reddito sale. Quelle per familiari a carico: coniuge, altri familiari e figli dai ventun anni ai trent'anni non compiuti, oppure con disabilità. Per i figli più piccoli c'è l'assegno unico, che paga l'INPS e non passa dalla busta.
### Scena 104 · Avatar a tutto schermo · segmento 3
**Parlato** (47 parole, circa 18 s):

> Le detrazioni per familiari non sono automatiche: devi chiederle, con un modulo all'ufficio personale, e aggiornarle quando cambia qualcosa. Un figlio che inizia a lavorare, un coniuge che supera il limite di reddito. Se non le aggiorni, a fine anno arriva il conguaglio, e può essere salato.
### Scena 105 · Slide a piena inquadratura (voce fuori campo) · segmento 3
**Asset:** `slide_png/L00_S105_SLIDE.png`
**Parlato** (49 parole, circa 19 s):

> Poi c'è il taglio del cuneo, che dal duemilaventicinque è fiscale. Fino a ventimila euro di reddito ricevi una somma esente da tasse, in percentuale sul reddito. Tra ventimila e quarantamila euro hai una detrazione aggiuntiva fino a mille euro l'anno, piena fino a trentaduemila euro e poi decrescente.
### Scena 106 · Clip b-roll (voce fuori campo) · segmento 3
**Clip suggerita (Higgsfield/Artlist):** Calcolatrice e fogli stampati su una scrivania d'ufficio, penna che segna una riga, luce calda da lampada, dettaglio lento  
**Testo su fascia verde:** Ogni mese un calcolo, a dicembre il conguaglio
**Parlato** (38 parole, circa 13 s):

> L'IRPEF netta che trovi in busta è il risultato di tutto questo calcolo, rifatto ogni mese su quanto hai guadagnato fino a quel momento. Per questo, a fine anno, serve un conguaglio che rimette a posto i conti.
### Scena 107 · Slide a piena inquadratura (voce fuori campo) · segmento 3
**Asset:** `slide_png/L00_S107_SLIDE.png`
**Parlato** (45 parole, circa 18 s):

> Poi le addizionali, regionale e comunale. Si calcolano sul reddito dell'anno precedente e vengono trattenute a rate nell'anno successivo. Per l'addizionale comunale c'è anche un acconto sull'anno in corso. Per questo, a inizio anno, puoi trovare nuove trattenute anche se lo stipendio non è cambiato.
### Scena 108 · Slide + avatar in basso a destra · segmento 3
**Asset:** `slide_png/L00_S108_SLIDE_AV.png`
**Parlato** (50 parole, circa 21 s):

> Infine una novità del duemilaventisei. Per i dipendenti pubblici non dirigenti con reddito da lavoro dipendente fino a cinquantamila euro, il salario accessorio, fino a ottocento euro nell'anno, è tassato con un'imposta sostitutiva del quindici per cento, al posto di IRPEF e addizionali. Si applica in automatico, salvo rinuncia scritta.
### Scena 109 · Slide a piena inquadratura (voce fuori campo) · segmento 3
**Asset:** `slide_png/L00_S109_SLIDE.png`
**Parlato** (38 parole, circa 20 s):

> Facciamo il conto completo su un reddito annuo di trentaduemila euro imponibili, vicino a quello di un'infermiera con qualche notte. Ventitré per cento sui primi ventottomila: seimilaquattrocentoquaranta. Trentatré per cento sui restanti quattromila: milletrecentoventi. Imposta lorda: settemilasettecentosessanta euro.
### Scena 110 · Avatar a tutto schermo · segmento 3
**Parlato** (49 parole, circa 20 s):

> Ora le detrazioni. Su quel reddito, la detrazione per lavoro dipendente vale circa millenovecento euro, più i sessantacinque euro in più previsti per quella fascia. E poi l'ulteriore detrazione del cuneo fiscale: mille euro pieni, perché siamo esattamente al limite dei trentaduemila. L'imposta netta scende sotto i cinquemila euro.
### Scena 111 · Slide a piena inquadratura (voce fuori campo) · segmento 3
**Asset:** `slide_png/L00_S111_SLIDE.png`
**Parlato** (49 parole, circa 20 s):

> Divisa per dodici, con le addizionali a parte, l'IRPEF netta mensile è intorno ai quattrocento euro. Nel fac-simile, con un reddito più basso, è di centottantaquattro euro. Ecco perché due colleghi con lo stesso profilo possono avere IRPEF molto diverse: notti, festivi, familiari a carico, seconda entrata in famiglia.
### Scena 112 · Slide + avatar in basso a destra · segmento 3
**Asset:** `slide_png/L00_S112_SLIDE_AV.png`
**Parlato** (42 parole, circa 17 s):

> Le addizionali per il Veneto e per i comuni della provincia hanno aliquote diverse: la regionale è progressiva per scaglioni, la comunale la decide ogni Comune. Chi cambia residenza deve comunicarlo, perché l'addizionale comunale segue il Comune di residenza al primo gennaio.
### Scena 113 · Avatar a tutto schermo · segmento 3
**Parlato** (53 parole, circa 19 s):

> Un errore che costa caro: non comunicare che il coniuge ha iniziato a lavorare, o che un figlio ha superato il limite di reddito. Le detrazioni continuano a essere applicate ogni mese e a dicembre, o nel settecentotrenta, arriva un debito di centinaia di euro. Aggiorna il modulo delle detrazioni a ogni cambiamento.
### Scena 114 · Slide a piena inquadratura (voce fuori campo) · segmento 3
**Asset:** `slide_png/L00_S114_SLIDE.png`
**Parlato** (55 parole, circa 20 s):

> Per chi ha redditi bassi c'è il bonus in busta, l'erede del vecchio bonus di cento euro: una somma esente che vale il sette virgola uno per cento fino a ottomilacinquecento euro, il cinque virgola tre fino a quindicimila, il quattro virgola otto fino a ventimila. Riguarda soprattutto part time e primi mesi di servizio.
### Scena 115 · Slide + avatar in basso a destra · segmento 3
**Asset:** `slide_png/L00_S115_SLIDE_AV.png`
**Parlato** (46 parole, circa 17 s):

> Il fondo pensione abbassa le tasse: mille euro versati nell'anno a Perseo Sirio non entrano nell'imponibile, e per chi è nel secondo scaglione valgono trecentotrenta euro di IRPEF in meno, più le addizionali. È uno dei pochi casi in cui risparmiare e pagare meno tasse coincidono.
### Scena 116 · Avatar a tutto schermo · segmento 3
**Parlato** (46 parole, circa 17 s):

> Ultimo punto sulle tasse: il settecentotrenta. Le spese mediche, gli interessi del mutuo, le spese per i figli, le detrazioni per ristrutturazioni non passano dalla busta paga: si recuperano con la dichiarazione. Il CAF CISL la fa per gli iscritti, e l'esito arriva in busta d'estate.

---

## Capitolo 7 · Trattenute e totali

### Scena 117 · Card di capitolo (2 s, muta)
**Asset:** `slide_png/L00_S117_CHAPTER.png`
### Scena 118 · Avatar a tutto schermo · segmento 4
**Parlato** (40 parole, circa 14 s):

> Dopo contributi e tasse restano le trattenute varie. Sono quelle che non dipendono dalla legge in generale, ma da te, dalle tue scelte o dalla tua situazione. E poi c'è il piede della busta, dove tutti i numeri si incontrano.
### Scena 119 · Slide a piena inquadratura (voce fuori campo) · segmento 4
**Asset:** `slide_png/L00_S119_SLIDE.png`
**Parlato** (40 parole, circa 16 s):

> Le trattenute varie più comuni: il contributo sindacale, se sei iscritto. La mensa, con quantità e importo unitario. Le rate di una cessione del quinto o di una delegazione di pagamento. Eventuali pignoramenti. E le trattenute per assenze non retribuite.
### Scena 120 · Slide + avatar in basso a destra · segmento 4
**Asset:** `slide_png/L00_S120_SLIDE_AV.png`
**Parlato** (35 parole, circa 14 s):

> Per cessione e delegazione la colonna riferimento indica spesso la scadenza del prestito. Controlla che la rata sia quella concordata e che, alla scadenza, la trattenuta sparisca davvero. Capita che continui un mese di troppo.
### Scena 121 · Slide a piena inquadratura (voce fuori campo) · segmento 4
**Asset:** `slide_png/L00_S121_SLIDE.png`
**Parlato** (41 parole, circa 16 s):

> Attenzione alle voci di recupero. Se in passato ti è stata pagata una somma non dovuta, l'Azienda può recuperarla. Ma deve spiegarti il calcolo, e puoi chiedere di restituirla a rate. Un recupero che compare all'improvviso, senza spiegazioni, va sempre verificato.
### Scena 122 · Avatar a tutto schermo · segmento 4
**Parlato** (21 parole, circa 7 s):

> Adesso scendiamo al piede. Qui la busta paga fa i conti finali, e c'è un modo semplice per verificarli: una sottrazione.
### Scena 123 · Grafica animata (voce fuori campo) · segmento 4
**Asset:** `animazioni_mp4/A03_dal_lordo_al_netto.mp4` · Dal lordo al netto
**Parlato** (42 parole, circa 16 s):

> Parti dalle competenze lorde, la somma di tutte le voci con il più. Togli le ritenute previdenziali, assistenziali e fiscali. Togli le ritenute varie. Ottieni il netto. Aggiungi o togli l'arrotondamento, e arrivi al netto a pagare, la cifra accreditata in banca.
### Scena 124 · Slide a piena inquadratura (voce fuori campo) · segmento 4
**Asset:** `slide_png/L00_S124_SLIDE.png`
**Parlato** (38 parole, circa 16 s):

> Nel nostro esempio: competenze lorde di ottobre, meno contributi e tasse, meno ritenute varie, danno il netto. L'arrotondamento porta la cifra all'euro intero: i centesimi tolti questo mese li ritrovi il mese dopo, nella voce arrotondamento mese precedente.
### Scena 125 · Clip b-roll (voce fuori campo) · segmento 4
**Clip suggerita (Higgsfield/Artlist):** Agenda aperta con appunti a mano e uno smartphone con calcolatrice, tavolo di legno, luce di fine giornata, carrello lento  
**Testo su fascia verde:** Progressivi: il film dell'anno
**Parlato** (33 parole, circa 13 s):

> Sotto i totali trovi i progressivi: le somme dall'inizio dell'anno. Imponibile, ritenute, detrazioni, aliquota media. Servono per un controllo veloce e per capire, già in autunno, se a dicembre ti aspetta un conguaglio.
### Scena 126 · Slide + avatar in basso a destra · segmento 4
**Asset:** `slide_png/L00_S126_SLIDE_AV.png`
**Parlato** (26 parole, circa 10 s):

> Un consiglio pratico: segna ogni mese il netto a pagare, insieme ai turni fatti. Dopo qualche mese ti accorgi a colpo d'occhio di qualsiasi variazione strana.
### Scena 127 · Slide a piena inquadratura (voce fuori campo) · segmento 4
**Asset:** `slide_png/L00_S127_SLIDE.png`
**Parlato** (50 parole, circa 18 s):

> Il contributo sindacale è una trattenuta che scegli tu, con la delega. Nel fac-simile è di poco più di diciannove euro al mese: circa lo zero virgola novanta per cento delle voci fisse. Se ti iscrivi o ti cancelli, il cambiamento in busta arriva dal mese successivo alla comunicazione all'Azienda.
### Scena 128 · Avatar a tutto schermo · segmento 4
**Parlato** (47 parole, circa 18 s):

> La cessione del quinto: la rata non può superare un quinto dello stipendio netto mensile. Con la delegazione di pagamento si può arrivare a un secondo quinto. Oltre, l'Azienda non deve trattenere. Se la somma delle rate supera questi limiti, qualcosa non va nel contratto di finanziamento.
### Scena 129 · Slide a piena inquadratura (voce fuori campo) · segmento 4
**Asset:** `slide_png/L00_S129_SLIDE.png`
**Parlato** (44 parole, circa 16 s):

> Il pignoramento presso terzi funziona in modo simile: un quinto, e per gli alimenti può essere di più. In busta compare con una voce dedicata e il riferimento all'atto. Anche qui, chiedi il conteggio e verifica che alla fine del debito la trattenuta cessi.
### Scena 130 · Slide + avatar in basso a destra · segmento 4
**Asset:** `slide_png/L00_S130_SLIDE_AV.png`
**Parlato** (48 parole, circa 19 s):

> Le assenze non retribuite, o retribuite in parte, si vedono come trattenute con quantità in giorni o ore: per esempio la riduzione per i primi giorni di malattia, l'aspettativa non retribuita, lo sciopero. La colonna quantità ti dice quanti giorni sono stati decurtati: confrontala con le assenze reali.
### Scena 131 · Grafica animata (voce fuori campo) · segmento 4
**Asset:** `animazioni_mp4/A03_dal_lordo_al_netto.mp4` · Dal lordo al netto
**Parlato** (49 parole, circa 16 s):

> Torniamo al piede con un esempio diverso: un mese con un recupero di trecento euro. Le competenze lorde non cambiano, ma le ritenute varie salgono e il netto scende. Se non sai perché, la cifra ti sembra un errore. Se sai leggere il piede, vedi subito dove è finita.
### Scena 132 · Slide + avatar in basso a destra · segmento 4
**Asset:** `slide_png/L00_S132_SLIDE_AV.png`
**Parlato** (51 parole, circa 18 s):

> Un errore da non fare: confondere il netto con il netto a pagare. Il netto è il risultato della sottrazione; il netto a pagare è quello arrotondato all'euro. La differenza è di centesimi, ma se confronti con l'accredito in banca devi usare il netto a pagare, altrimenti ti sembra sempre sbagliato.
### Scena 133 · Avatar a tutto schermo · segmento 4
**Parlato** (53 parole, circa 20 s):

> Ancora una parola sui prestiti. Prima di firmare una cessione del quinto, guarda il tasso e il costo dell'assicurazione: l'INPS, attraverso il fondo credito che paghi ogni mese, offre prestiti a condizioni spesso migliori di quelle delle finanziarie che si presentano in reparto. Il fondo credito serve a questo, e pochi lo usano.

---

## Capitolo 8 · I mesi speciali

### Scena 134 · Card di capitolo (2 s, muta)
**Asset:** `slide_png/L00_S134_CHAPTER.png`
### Scena 135 · Avatar a tutto schermo · segmento 4
**Parlato** (28 parole, circa 10 s):

> Ci sono mesi in cui la busta paga cambia faccia, e se non lo sai ti spaventi, o ti illudi. Impariamo a riconoscerli, così ogni sorpresa diventa prevedibile.
### Scena 136 · Grafica animata (voce fuori campo) · segmento 4
**Asset:** `animazioni_mp4/A07_il_calendario_della_busta_paga.mp4` · Il calendario della busta paga
**Parlato** (35 parole, circa 15 s):

> Guarda il calendario dell'anno. A inizio anno partono le rate delle addizionali. In estate arriva l'esito del settecentotrenta. A dicembre, tredicesima e conguaglio fiscale. E in qualunque mese possono arrivare arretrati e saldi di produttività.
### Scena 137 · Slide a piena inquadratura (voce fuori campo) · segmento 4
**Asset:** `slide_png/L00_S137_SLIDE.png`
**Parlato** (56 parole, circa 20 s):

> Dicembre è il mese più ricco e più complicato. C'è la tredicesima, con le quote di ogni voce fissa. E c'è il conguaglio: l'ufficio paghe ricalcola le tasse dell'intero anno e sistema le differenze. Per questo il netto di dicembre non è il doppio di un mese normale: sulla tredicesima, di norma, non si applicano detrazioni.
### Scena 138 · Slide + avatar in basso a destra · segmento 4
**Asset:** `slide_png/L00_S138_SLIDE_AV.png`
**Parlato** (40 parole, circa 16 s):

> Tra luglio e settembre arriva il settecentotrenta. Se hai presentato la dichiarazione, l'Azienda, come sostituto d'imposta, ti rimborsa il credito o trattiene il debito, direttamente in busta. Se il debito è alto, puoi chiedere nella dichiarazione di pagarlo a rate.
### Scena 139 · Slide a piena inquadratura (voce fuori campo) · segmento 4
**Asset:** `slide_png/L00_S139_SLIDE.png`
**Parlato** (42 parole, circa 18 s):

> Poi gli arretrati contrattuali. Quando un contratto viene firmato in via definitiva, l'Azienda paga le differenze dal momento in cui gli aumenti decorrono. Li riconosci dalla colonna riferimento, che indica mesi e anni passati, e dall'indennità di vacanza contrattuale che viene riassorbita.
### Scena 140 · Avatar a tutto schermo · segmento 4
**Parlato** (45 parole, circa 19 s):

> Un dettaglio fiscale sorprende molti: gli arretrati che riguardano anni precedenti sono soggetti a tassazione separata, con un'aliquota media e non con quella del mese. Quelli dell'anno in corso, invece, sono tassati normalmente. Ecco perché due arretrati di importo simile possono avere un netto diverso.
### Scena 141 · Slide a piena inquadratura (voce fuori campo) · segmento 4
**Asset:** `slide_png/L00_S141_SLIDE.png`
**Parlato** (53 parole, circa 24 s):

> Cosa aspettarsi dal rinnovo duemilaventicinque duemilaventisette? L'ipotesi è stata firmata il ventinove luglio duemilaventisei. Dopo i controlli previsti arriverà la firma definitiva, e con essa aumenti e arretrati del duemilaventicinque e del duemilaventisei. Le stime della CISL FP parlano di arretrati medi intorno ai milleduecentocinquanta euro lordi, e di più per alcune categorie.
### Scena 142 · Clip b-roll (voce fuori campo) · segmento 4
**Clip suggerita (Higgsfield/Artlist):** Calendario da parete in un'infermeria con alcuni giorni cerchiati, mano che gira la pagina, luce naturale, dettaglio  
**Testo su fascia verde:** Saldo produttività: un mese diverso dagli altri
**Parlato** (27 parole, circa 10 s):

> Anche la produttività arriva spesso a saldo, in un unico mese. Quel mese il netto sale: non abituarti, e non spaventarti il mese dopo, quando torna normale.
### Scena 143 · Slide + avatar in basso a destra · segmento 4
**Asset:** `slide_png/L00_S143_SLIDE_AV.png`
**Parlato** (31 parole, circa 11 s):

> La regola dei mesi speciali: quando il netto cambia molto, cerca subito la causa nelle voci con riferimento diverso dal mese e nelle trattenute fiscali. Quasi sempre la spiegazione è lì.
### Scena 144 · Slide a piena inquadratura (voce fuori campo) · segmento 4
**Asset:** `slide_png/L00_S144_SLIDE.png`
**Parlato** (52 parole, circa 19 s):

> Come si legge il conguaglio di dicembre. Il sistema somma tutto il reddito dell'anno, calcola l'IRPEF dovuta, la confronta con quella già trattenuta mese per mese e sistema la differenza. Se durante l'anno hai avuto mesi con molto accessorio, spesso il conguaglio è a debito. Se hai lavorato meno, è a credito.
### Scena 145 · Avatar a tutto schermo · segmento 4
**Parlato** (40 parole, circa 15 s):

> Se il conguaglio a debito è troppo alto per essere trattenuto tutto in dicembre, la legge consente di rateizzarlo nei mesi successivi, con un piccolo interesse. Lo trovi nelle buste di gennaio e febbraio con la dicitura conguaglio anno precedente.
### Scena 146 · Slide a piena inquadratura (voce fuori campo) · segmento 4
**Asset:** `slide_png/L00_S146_SLIDE.png`
**Parlato** (49 parole, circa 21 s):

> Gli arretrati contrattuali del duemilaventiquattro, con il contratto precedente, sono arrivati nelle buste di fine duemilaventicinque. Chi era assunto dopo il primo gennaio duemilaventitré ha ricevuto meno, perché la decorrenza per lui è più recente. Lo stesso accadrà con il nuovo rinnovo: decorrenza e data di assunzione decidono l'importo.
### Scena 147 · Slide + avatar in basso a destra · segmento 4
**Asset:** `slide_png/L00_S147_SLIDE_AV.png`
**Parlato** (46 parole, circa 21 s):

> Un riepilogo di cosa aspettarsi con la firma definitiva del nuovo contratto: gli aumenti tabellari del duemilaventicinque e duemilaventisei in un'unica busta come arretrato, al netto della vacanza contrattuale; le indennità rivalutate dal primo gennaio duemilaventisei, con il loro arretrato; il nuovo tabellare da gennaio duemilaventisette.
### Scena 148 · Clip b-roll (voce fuori campo) · segmento 4
**Clip suggerita (Higgsfield/Artlist):** Persona di spalle alla finestra di una sala relax ospedaliera che legge attentamente un foglio, luce del tardo pomeriggio, silhouette, inquadratura fissa  
**Testo su fascia verde:** Arretrati: somma le righe, non fidarti del totale
**Parlato** (34 parole, circa 12 s):

> Quando arriva la busta degli arretrati, non fidarti del totale: guarda le righe. Ogni voce di arretrato ha il suo riferimento e il suo importo. Sommale e confrontale con la tabella della tua area.
### Scena 149 · Avatar a tutto schermo · segmento 4
**Parlato** (55 parole, circa 20 s):

> Un'altra busta che spiazza è quella di luglio o agosto con il saldo delle ferie non godute per chi cessa, o con il pagamento dello straordinario accumulato a fine anno. E poi gennaio, con i nuovi importi delle detrazioni ricalcolati sul reddito presunto: il netto può cambiare di qualche euro senza che sia successo nulla.
### Scena 150 · Slide + avatar in basso a destra · segmento 4
**Asset:** `slide_png/L00_S150_SLIDE_AV.png`
**Parlato** (52 parole, circa 20 s):

> Un promemoria per i prossimi mesi. Alla firma definitiva del contratto vi avviseremo con un comunicato e un video breve: quel mese, tenete la busta e confrontatela con la tabella della vostra area. Se l'arretrato è più basso di quello atteso al netto della vacanza contrattuale, o manca l'arretrato delle indennità, portatecela.

---

## Capitolo 9 · Dieci controlli in cinque minuti

### Scena 151 · Card di capitolo (2 s, muta)
**Asset:** `slide_png/L00_S151_CHAPTER.png`
### Scena 152 · Avatar a tutto schermo · segmento 5
**Parlato** (33 parole, circa 12 s):

> Siamo alla fine del percorso. Adesso trasformiamo tutto in un'abitudine: dieci controlli, sempre gli stessi, da fare ogni mese. Cinque minuti, con la busta paga da una parte e i tuoi turni dall'altra.
### Scena 153 · Slide a piena inquadratura (voce fuori campo) · segmento 5
**Asset:** `slide_png/L00_S153_SLIDE.png`
**Parlato** (43 parole, circa 17 s):

> Primo: il mese di liquidazione. Secondo: area, profilo e percentuale di part time. Terzo: le voci fisse, uguali al mese prima se non è cambiato niente. Quarto: turno, notte e festivi, confrontati con i turni del mese di riferimento. Quinto: straordinari e reperibilità.
### Scena 154 · Slide + avatar in basso a destra · segmento 5
**Asset:** `slide_png/L00_S154_SLIDE_AV.png`
**Parlato** (46 parole, circa 17 s):

> Sesto: il segno di ogni voce nuova. Settimo: le trattenute varie, rata per rata. Ottavo: le trattenute fiscali, soprattutto a inizio anno e a dicembre. Nono: il piede, con la sottrazione tra lordo, ritenute e netto. Decimo: il netto a pagare, confrontato con l'accredito in banca.
### Scena 155 · Avatar a tutto schermo · segmento 5
**Parlato** (40 parole, circa 16 s):

> E se trovi qualcosa che non va? Prima regola: non buttare niente. Conserva la busta, il prospetto turni, eventuali comunicazioni. Seconda regola: annota la voce, il codice e il mese di riferimento. Con questi tre elementi qualunque verifica diventa rapida.
### Scena 156 · Slide a piena inquadratura (voce fuori campo) · segmento 5
**Asset:** `slide_png/L00_S156_SLIDE.png`
**Parlato** (38 parole, circa 16 s):

> Gli errori più frequenti che vediamo nelle buste della sanità: notti e festivi non registrati, indennità che non partono dopo un cambio di profilo o di reparto, differenziali non aggiornati, detrazioni per familiari non comunicate, recuperi senza spiegazioni.
### Scena 157 · Clip b-roll (voce fuori campo) · segmento 5
**Clip suggerita (Higgsfield/Artlist):** Gruppo di operatori sanitari in divisa riuniti in cerchio in una sala, visti di spalle e di tre quarti, atmosfera di confronto, luce morbida, camera a mano stabile  
**Testo su fascia verde:** Un errore su tanti colleghi è una questione collettiva
**Parlato** (28 parole, circa 12 s):

> Molti errori si risolvono con una semplice richiesta scritta all'ufficio competente. Altri richiedono un intervento sindacale, perché non riguardano solo te, ma un intero reparto o un'intera categoria.
### Scena 158 · Slide + avatar in basso a destra · segmento 5
**Asset:** `slide_png/L00_S158_SLIDE_AV.png`
**Parlato** (43 parole, circa 16 s):

> È qui che la busta paga smette di essere un fatto privato. Quando lo stesso errore si ripete su tanti colleghi, diventa una questione collettiva. E le questioni collettive si risolvono ai tavoli, con la contrattazione e, quando serve, con le vie legali.
### Scena 159 · Avatar a tutto schermo · segmento 5
**Parlato** (53 parole, circa 17 s):

> Per questo alla CISL FP di Padova e Rovigo facciamo una cosa semplice: guardiamo le buste paga, una per una, con chi ce le porta. Porta le ultime buste e i tuoi turni: il controllo lo facciamo insieme. Grazie per aver seguito il corso: adesso la tua busta paga non ha più segreti.
### Scena 160 · Slide a piena inquadratura (voce fuori campo) · segmento 5
**Asset:** `slide_png/L00_S160_SLIDE.png`
**Parlato** (22 parole, circa 7 s):

> Trovi i nostri recapiti e gli orari di sportello qui a schermo e sui canali della CISL FP di Padova e Rovigo.
### Scena 161 · Slide + avatar in basso a destra · segmento 5
**Asset:** `slide_png/L00_S161_SLIDE_AV.png`
**Parlato** (45 parole, circa 19 s):

> Come si scrive una segnalazione all'ufficio stipendi. Breve, precisa, con i dati: nome, matricola, mese della busta, codice e descrizione della voce, importo atteso e importo trovato, allegando il prospetto turni. Chiedi una risposta scritta. Una segnalazione così si risolve in settimane, non in mesi.
### Scena 162 · Avatar a tutto schermo · segmento 5
**Parlato** (51 parole, circa 20 s):

> Se l'Azienda non risponde, o risponde di no senza motivare, passiamo alla fase successiva: la richiesta formale tramite il sindacato, poi eventualmente la diffida e, come ultima strada, il ricorso. La CISL FP segue centinaia di vertenze di questo tipo, molte vinte, per esempio sui buoni pasto negati nei turni lunghi.
### Scena 163 · Slide a piena inquadratura (voce fuori campo) · segmento 5
**Asset:** `slide_png/L00_S163_SLIDE.png`
**Parlato** (54 parole, circa 18 s):

> I termini. Le differenze retributive si possono chiedere in genere entro cinque anni. Per alcune voci il termine è più breve, per altre più lungo. Il punto è uno: prima ti muovi, più recuperi. Un errore che dura da anni può valere migliaia di euro, e ogni mese che passa se ne perde uno.
### Scena 164 · Clip b-roll (voce fuori campo) · segmento 5
**Clip suggerita (Higgsfield/Artlist):** Persona seduta al tavolo di casa la sera con una tazza, che scorre un documento sul tablet accanto a un foglio stampato, luce calda, inquadratura laterale, nessun volto riconoscibile  
**Testo su fascia verde:** Cinque minuti al mese, sempre lo stesso giorno
**Parlato** (40 parole, circa 14 s):

> La verifica mensile è un'abitudine. Come guardare il conto in banca: cinque minuti, con calma, sempre lo stesso giorno. Dopo tre mesi non ci pensi più, ed è quello il momento in cui l'errore, se arriva, lo prendi al volo.
### Scena 165 · Avatar a tutto schermo · segmento 5
**Parlato** (57 parole, circa 20 s):

> E se il controllo mensile rivela che è tutto giusto? È la notizia migliore. Cinque minuti spesi per sapere che il tuo lavoro è stato pagato per intero, tutto, ogni notte e ogni festivo, valgono comunque. La busta paga giusta non è scontata: è il risultato di un contratto applicato bene, e di qualcuno che lo controlla.

---

## Capitolo 10 · Assenze e busta paga

### Scena 166 · Card di capitolo (2 s, muta)
**Asset:** `slide_png/L00_S166_CHAPTER.png`
### Scena 167 · Avatar a tutto schermo · segmento 5
**Parlato** (39 parole, circa 15 s):

> Le assenze sono il punto in cui la busta paga cambia senza che tu abbia fatto niente di diverso al lavoro. Malattia, permessi, congedi, sciopero: ognuno ha una regola economica diversa. Vediamole una per una, partendo dalla più frequente.
### Scena 168 · Grafica animata (voce fuori campo) · segmento 5
**Asset:** `animazioni_mp4/A10_malattia_i_primi_dieci_giorni.mp4` · Malattia: i primi dieci giorni
**Parlato** (51 parole, circa 20 s):

> La malattia. Per ogni episodio, nei primi dieci giorni la legge prevede la retribuzione fondamentale e non le voci accessorie: niente indennità di turno, di notte, di festivo. Dall'undicesimo giorno il trattamento economico torna intero, nei limiti del periodo di comporto. Se ti ammali tre volte, la decurtazione scatta tre volte.
### Scena 169 · Slide a piena inquadratura (voce fuori campo) · segmento 5
**Asset:** `slide_png/L00_S169_SLIDE.png`
**Parlato** (40 parole, circa 17 s):

> Ci sono esclusioni importanti: ricovero ospedaliero e giorni successivi, day hospital, terapie salvavita, infortunio sul lavoro, malattie legate a causa di servizio, gravidanza a rischio. In questi casi la decurtazione non si applica. Se la trovi in busta, va contestata.
### Scena 170 · Slide + avatar in basso a destra · segmento 5
**Asset:** `slide_png/L00_S170_SLIDE_AV.png`
**Parlato** (60 parole, circa 21 s):

> Il comporto: nei tre anni precedenti puoi sommare fino a diciotto mesi di malattia conservando il posto. I primi nove mesi a retribuzione intera, poi al novanta per cento, poi al cinquanta. In busta lo vedi come trattenuta con quantità in giorni. Chi ha patologie gravi ha tutele in più, e il nuovo contratto le rafforza per i malati oncologici.
### Scena 171 · Avatar a tutto schermo · segmento 5
**Parlato** (53 parole, circa 19 s):

> La legge centoquattro. I tre giorni al mese, per sé o per assistere un familiare con disabilità grave, sono retribuiti e utili a tutti gli effetti, anche per la tredicesima. Non devi vedere trattenute. Se per errore il sistema li registra come permesso non retribuito, il netto scende e devi farlo correggere subito.
### Scena 172 · Slide a piena inquadratura (voce fuori campo) · segmento 5
**Asset:** `slide_png/L00_S172_SLIDE.png`
**Parlato** (57 parole, circa 21 s):

> I congedi parentali. La maternità obbligatoria, cinque mesi, è pagata al cento per cento nel pubblico impiego. Il congedo parentale, entro i dodici anni del figlio, prevede alcuni mesi con una percentuale più alta e gli altri al trenta per cento, con regole che sono cambiate più volte. In busta: una trattenuta pari alla quota non coperta.
### Scena 173 · Clip b-roll (voce fuori campo) · segmento 5
**Clip suggerita (Higgsfield/Artlist):** Donna in divisa sanitaria seduta con un neonato in braccio vicino a una finestra luminosa, atmosfera domestica serena, profondità di campo ridotta, nessun volto in primo piano  
**Testo su fascia verde:** Maternità: fondamentale al 100%, accessorio sospeso
**Parlato** (45 parole, circa 16 s):

> Durante la maternità obbligatoria e nei congedi si perdono le voci accessorie legate ai turni: non lavori di notte, non ti pagano la notte. Ma il nuovo contratto riconosce le indennità nelle ferie, e questo è un principio che vale la pena ricordare al tavolo.
### Scena 174 · Slide + avatar in basso a destra · segmento 5
**Asset:** `slide_png/L00_S174_SLIDE_AV.png`
**Parlato** (48 parole, circa 17 s):

> Lo sciopero. Per una giornata intera si trattiene la retribuzione di una giornata: la fissa mensile divisa per il numero di giorni del mese, o per ventisei, a seconda del sistema. Per uno sciopero breve, a ore. La trattenuta compare nel mese successivo, con il riferimento alla data.
### Scena 175 · Avatar a tutto schermo · segmento 5
**Parlato** (50 parole, circa 19 s):

> Le aspettative. Quella per motivi personali è senza stipendio e senza contributi: la busta può arrivare a zero, o addirittura con un saldo negativo se restano trattenute fisse come una cessione. Quella per dottorato o per incarico elettivo ha regole proprie. Prima di chiederne una, fai due conti con noi.
### Scena 176 · Slide a piena inquadratura (voce fuori campo) · segmento 5
**Asset:** `slide_png/L00_S176_SLIDE.png`
**Parlato** (56 parole, circa 18 s):

> Infine il buono pasto. Non è in busta come voce di paga, ma può esserci come trattenuta di quota parte, se l'Azienda lo prevede. Il diritto al buono nei turni di almeno sei ore è stato riconosciuto da molte sentenze e oggi dal contratto; se nel tuo reparto viene negato, la CISL FP assiste i ricorsi.
### Scena 177 · Slide + avatar in basso a destra · segmento 5
**Asset:** `slide_png/L00_S177_SLIDE_AV.png`
**Parlato** (56 parole, circa 20 s):

> Le ferie. Sono retribuite con la retribuzione fissa, e il nuovo contratto riconosce anche le indennità. Le ferie non godute, di regola, non si pagano: si devono fare. Si monetizzano solo alla cessazione del rapporto, se non è stato possibile goderle per cause non dipendenti dal lavoratore. Se ti dicono che le perdi, chiedi a noi.
### Scena 178 · Avatar a tutto schermo · segmento 5
**Parlato** (56 parole, circa 21 s):

> La formazione obbligatoria e i corsi aziendali sono orario di lavoro: nessuna trattenuta, e se cadono fuori turno vanno recuperati o pagati. Le ore di studio per il diritto allo studio, le centocinquanta ore, sono retribuite. I permessi per visite mediche hanno un monte ore annuo retribuito: oltre quello, si scala dalle ferie o dai permessi.
### Scena 179 · Slide a piena inquadratura (voce fuori campo) · segmento 5
**Asset:** `slide_png/L00_S179_SLIDE.png`
**Parlato** (21 parole, circa 7 s):

> Un riepilogo in tabella di come ogni assenza tocca la busta. Da leggere quando ti serve, non da imparare a memoria.

---

## Capitolo 11 · Leggiamo insieme un cedolino

### Scena 180 · Card di capitolo (2 s, muta)
**Asset:** `slide_png/L00_S180_CHAPTER.png`
### Scena 181 · Avatar a tutto schermo · segmento 5
**Parlato** (38 parole, circa 14 s):

> Adesso mettiamo insieme tutto. Prendo il cedolino di ottobre di Giulia, la nostra infermiera di fantasia, e lo leggo dall'inizio alla fine come faresti tu a casa, con il prospetto turni di agosto accanto. Seguimi zona per zona.
### Scena 182 · Slide a piena inquadratura (voce fuori campo) · segmento 5
**Asset:** `slide_png/L00_S182_SLIDE.png`
**Parlato** (37 parole, circa 19 s):

> Intestazione. Ottobre duemilaventisei, liquidazione di stipendio. Area dei professionisti della salute, profilo infermiere, incarico base, rapporto normale, cioè tempo pieno. Assunta nel duemilaquindici, quindi con il trattamento di fine rapporto. Sede in Azienda Ospedale Università. Tutto corrisponde.
### Scena 183 · Slide + avatar in basso a destra · segmento 5
**Asset:** `slide_png/L00_S183_SLIDE_AV.png`
**Parlato** (31 parole, circa 16 s):

> Voci fisse. Tabellare, vacanza contrattuale, un differenziale, indennità professionale specifica, specificità infermieristica, funzione parte fissa con l'incremento del contratto. Sono le stesse del mese prima, stessi importi. Bene: nessun cambiamento inatteso.
### Scena 184 · Avatar a tutto schermo · segmento 5
**Parlato** (48 parole, circa 19 s):

> Voci accessorie. Diciannove giorni di turno, ventiquattro ore di notte, due festivi, tutti con riferimento ad agosto. Apro il prospetto turni di agosto: diciannove giorni lavorati su turno, tre notti da otto ore, ferragosto e la domenica dopo. Torna tutto. Prova del nove sugli importi: fatta prima, torna.
### Scena 185 · Slide a piena inquadratura (voce fuori campo) · segmento 5
**Asset:** `slide_png/L00_S185_SLIDE.png`
**Parlato** (49 parole, circa 20 s):

> Contributi. Cassa pensioni su fisse e accessorie, fondo credito, la diminuzione per il trattamento di fine rapporto, il contributo al fondo Perseo del dipendente e, con l'asterisco, quello dell'Azienda. Somma delle righe con il meno: circa trecentonove euro. È il numero che tolgo dal lordo per arrivare all'imponibile fiscale.
### Scena 186 · Grafica animata (voce fuori campo) · segmento 5
**Asset:** `animazioni_mp4/A04_scaglioni_irpef_2026.mp4` · Scaglioni IRPEF 2026
**Parlato** (38 parole, circa 17 s):

> Tasse. Imponibile fiscale di duemiladuecentosessantuno euro. Aliquota del ventitré per cento, poi le detrazioni per lavoro dipendente e l'ulteriore detrazione del cuneo: IRPEF netta di centottantaquattro euro. Poi le rate delle addizionali dell'anno scorso e l'acconto della comunale.
### Scena 187 · Slide + avatar in basso a destra · segmento 5
**Asset:** `slide_png/L00_S187_SLIDE_AV.png`
**Parlato** (32 parole, circa 13 s):

> Trattenute varie: contributo sindacale e sei pasti in mensa. Niente prestiti, niente recuperi. E le righe con l'asterisco, in fondo: imponibili e detrazioni. Le uso solo per ricontrollare i conti delle tasse.
### Scena 188 · Avatar a tutto schermo · segmento 5
**Parlato** (41 parole, circa 23 s):

> Piede. Competenze lorde duemilacinquecentosettanta euro e novantasei. Meno cinquecentocinquantaquattro e ottantasette di contributi e tasse. Meno venticinque e sessantadue di varie. Netto millenovecentonovanta e quarantasette. Arrotondamento: meno quarantasette centesimi. Netto a pagare millenovecentonovanta euro. L'accredito in banca è di millenovecentonovanta. Chiuso.
### Scena 189 · Slide a piena inquadratura (voce fuori campo) · segmento 5
**Asset:** `slide_png/L00_S189_SLIDE.png`
**Parlato** (43 parole, circa 19 s):

> Cinque passi, cinque minuti. La busta di Giulia è corretta. Se nel passo tre avessi trovato ventidue notti invece di ventiquattro, avrei già pronta la segnalazione: matricola, busta di ottobre, voce servizio notturno, riferimento agosto, ventiquattro ore attese, ventidue pagate, allegato il prospetto.
### Scena 190 · Slide + avatar in basso a destra · segmento 5
**Asset:** `slide_png/L00_S190_SLIDE_AV.png`
**Parlato** (53 parole, circa 21 s):

> Facciamo un secondo esercizio, più rapido, su una busta immaginaria di dicembre. Trovo la tredicesima con quantità dodici, bene. Trovo il conguaglio IRPEF a debito di trecentoventi euro. Trovo un arretrato con riferimento a settembre. E trovo, in fondo, una voce recupero di novanta euro senza riferimento. Quale delle quattro merita una domanda?
### Scena 191 · Avatar a tutto schermo · segmento 5
**Parlato** (53 parole, circa 19 s):

> La quarta. Le prime tre hanno una spiegazione nella busta stessa: la quantità, il conguaglio di fine anno, il riferimento a un mese preciso. Il recupero senza riferimento e senza comunicazione no. La domanda da fare è semplice: a cosa si riferisce, e dov'è il conteggio. Fatta per iscritto, con matricola e mese.
### Scena 192 · Slide a piena inquadratura (voce fuori campo) · segmento 5
**Asset:** `slide_png/L00_S192_SLIDE.png`
**Parlato** (41 parole, circa 17 s):

> Terzo esercizio: la busta del mese dopo una progressione. Il tabellare nuovo è partito, ma l'indennità di specificità è ancora quella dell'area vecchia e non c'è nessun arretrato dalla decorrenza. Due segnalazioni, non una: indennità da adeguare e arretrati da liquidare.

---

## Capitolo 12 · Lo stipendio in un anno

### Scena 193 · Card di capitolo (2 s, muta)
**Asset:** `slide_png/L00_S193_CHAPTER.png`
### Scena 194 · Avatar a tutto schermo · segmento 6
**Parlato** (44 parole, circa 17 s):

> Un'ultima prospettiva, quella dell'anno intero. Ogni mese la busta racconta un pezzo; una volta l'anno l'Azienda tira le somme in un documento che si chiama certificazione unica. Saperla leggere ti serve per il settecentotrenta, per i prestiti, per l'ISEE, per i bandi di concorso.
### Scena 195 · Slide a piena inquadratura (voce fuori campo) · segmento 6
**Asset:** `slide_png/L00_S195_SLIDE.png`
**Parlato** (47 parole, circa 21 s):

> La certificazione unica arriva entro marzo e riporta i totali dell'anno precedente: reddito imponibile, ritenute IRPEF, addizionali, detrazioni applicate, contributi previdenziali, giorni di lavoro, e le somme a tassazione separata come gli arretrati di anni precedenti. Tutti numeri che trovi già nei progressivi della busta di dicembre.
### Scena 196 · Slide + avatar in basso a destra · segmento 6
**Asset:** `slide_png/L00_S196_SLIDE_AV.png`
**Parlato** (34 parole, circa 15 s):

> Il controllo più semplice: i progressivi di dicembre e la certificazione unica devono coincidere. Imponibile, ritenute, detrazioni. Se non coincidono, uno dei due documenti è sbagliato, e il settecentotrenta si farà su numeri sbagliati.
### Scena 197 · Avatar a tutto schermo · segmento 6
**Parlato** (50 parole, circa 20 s):

> Il reddito che trovi lì è quello fiscale, non il lordo. Il lordo dell'anno è più alto: comprende i contributi. Quando un modulo ti chiede la retribuzione annua lorda, moltiplica le competenze lorde mensili per dodici, aggiungi la tredicesima e l'accessorio dell'anno. Quando chiede il reddito imponibile, usa la certificazione.
### Scena 198 · Slide a piena inquadratura (voce fuori campo) · segmento 6
**Asset:** `slide_png/L00_S198_SLIDE.png`
**Parlato** (45 parole, circa 19 s):

> Un esempio con il nostro fac-simile. Fisse mensili per tredici mensilità, più l'accessorio medio per dodici mesi, più la produttività a saldo: siamo intorno ai trentacinquemila euro lordi l'anno. Reddito imponibile fiscale, tolti i contributi, poco sopra i trentunomila. Netto in tasca, intorno ai ventiquattromila.
### Scena 199 · Grafica animata (voce fuori campo) · segmento 6
**Asset:** `animazioni_mp4/A07_il_calendario_della_busta_paga.mp4` · Il calendario della busta paga
**Parlato** (45 parole, circa 18 s):

> Ecco il percorso dell'anno visto dal calendario: dodici buste, la tredicesima, il conguaglio, la certificazione unica a marzo, il settecentotrenta in primavera, l'esito in busta d'estate. Un cerchio che si chiude ogni anno, e che si legge molto meglio se hai conservato tutte le buste.
### Scena 200 · Slide + avatar in basso a destra · segmento 6
**Asset:** `slide_png/L00_S200_SLIDE_AV.png`
**Parlato** (48 parole, circa 17 s):

> Per l'ISEE conta il reddito di due anni prima, per i mutui e i prestiti la certificazione unica e le ultime buste, per i concorsi interni spesso il profilo e l'anzianità nell'intestazione. La busta paga è un documento che parla a molti uffici: per questo deve essere giusta.
### Scena 201 · Avatar a tutto schermo · segmento 6
**Parlato** (45 parole, circa 17 s):

> Chi ha due lavori, o ha cambiato Azienda nell'anno, ha due certificazioni uniche: vanno sommate nel settecentotrenta, e quasi sempre esce un debito, perché ciascun datore ha applicato le detrazioni per intero. Non è un errore: è il motivo per cui si fa la dichiarazione.
### Scena 202 · Slide + avatar in basso a destra · segmento 6
**Asset:** `slide_png/L00_S202_SLIDE_AV.png`
**Parlato** (50 parole, circa 19 s):

> Un ultimo strumento per l'anno: la busta di dicembre come archivio. Nei progressivi c'è l'anno intero, e negli imponibili con l'asterisco ci sono i totali che ritroverai nella certificazione. Conservala a parte, con il prospetto delle ferie e dei permessi: sono i tre documenti che ricostruiscono un anno di lavoro.

---

## Capitolo 13 · Le domande dello sportello

### Scena 203 · Card di capitolo (2 s, muta)
**Asset:** `slide_png/L00_S203_CHAPTER.png`
### Scena 204 · Avatar a tutto schermo · segmento 6
**Parlato** (16 parole, circa 6 s):

> Chiudiamo con le domande che sentiamo più spesso allo sportello. Risposte brevi, da tenere a mente.
### Scena 205 · Slide a piena inquadratura (voce fuori campo) · segmento 6
**Asset:** `slide_png/L00_S205_SLIDE.png`
**Parlato** (36 parole, circa 13 s):

> Perché il mio netto è più basso di quello di un collega con lo stesso profilo? Quasi sempre per tre cose: accessorio diverso, familiari a carico diversi, aliquota marginale diversa. Confrontate le righe, non il totale.
### Scena 206 · Avatar a tutto schermo · segmento 6
**Parlato** (41 parole, circa 15 s):

> Posso avere la busta paga in formato cartaceo? Sì, ma oggi la maggior parte delle Aziende la mette nel portale del dipendente. Scaricala e archiviala ogni mese: il portale può non conservarla per sempre, e tra qualche anno potresti averne bisogno.
### Scena 207 · Slide a piena inquadratura (voce fuori campo) · segmento 6
**Asset:** `slide_png/L00_S207_SLIDE.png`
**Parlato** (41 parole, circa 13 s):

> Ho fatto una notte in più che non è stata pagata: quanto tempo ho per chiederla? Il prima possibile, perché il mese dopo è già tutto elaborato; ma il diritto resta per anni. Segnala per iscritto con la data del turno.
### Scena 208 · Avatar a tutto schermo · segmento 6
**Parlato** (55 parole, circa 19 s):

> Mi hanno tolto dei soldi con la voce recupero: possono farlo? Sì, se la somma non era dovuta e lo dimostrano. Ma devono darti il conteggio e non possono trattenere tutto in una volta se l'importo è alto. Chiedi la rateizzazione e, se il recupero è vecchio di anni, fatti aiutare a verificare la prescrizione.
### Scena 209 · Slide a piena inquadratura (voce fuori campo) · segmento 6
**Asset:** `slide_png/L00_S209_SLIDE.png`
**Parlato** (36 parole, circa 12 s):

> Il buono pasto mi spetta se faccio il turno di sette ore? Sì. Il diritto è riconosciuto nei turni di almeno sei ore. Se nel tuo reparto non viene dato, segnalacelo: abbiamo già assistito molti ricorsi.
### Scena 210 · Avatar a tutto schermo · segmento 6
**Parlato** (39 parole, circa 14 s):

> La tredicesima è più bassa dello stipendio: è normale? Sì. La tredicesima si calcola solo sulle voci fisse, non sull'accessorio, ed è tassata senza detrazioni. Per questo il netto di dicembre non è il doppio di un mese normale.
### Scena 211 · Slide a piena inquadratura (voce fuori campo) · segmento 6
**Asset:** `slide_png/L00_S211_SLIDE.png`
**Parlato** (44 parole, circa 16 s):

> Cambio reparto e passo da turni a orario diurno: cosa perdo? Le indennità di turno e di notte, e i festivi. Il fisso non cambia. Se il nuovo reparto ha indennità proprie, per esempio pronto soccorso o terapia intensiva, devono partire dal primo giorno.
### Scena 212 · Avatar a tutto schermo · segmento 6
**Parlato** (48 parole, circa 18 s):

> Il rinnovo è stato firmato: quando vedo gli aumenti? Con la firma dell'ipotesi, ancora niente. Servono la certificazione dei costi, il via libera del Governo e la firma definitiva. Da quel momento, in genere entro due o tre mesi, arrivano aumenti e arretrati. Ti aggiorniamo noi sui tempi.
### Scena 213 · Slide a piena inquadratura (voce fuori campo) · segmento 6
**Asset:** `slide_png/L00_S213_SLIDE.png`
**Parlato** (47 parole, circa 17 s):

> Posso far controllare la busta paga anche se non sono iscritta? Puoi venire in sede e parlare con noi. Le verifiche complete, l'assistenza legale e il settecentotrenta con il CAF sono servizi per gli iscritti: il contributo sindacale, che hai visto in busta, serve anche a questo.
### Scena 214 · Avatar a tutto schermo · segmento 6
**Parlato** (51 parole, circa 17 s):

> Ho un part time e faccio anche le notti: le indennità sono ridotte? No. Il fisso è riproporzionato, le voci accessorie no: la notte che fai è pagata come quella di un collega a tempo pieno. Se in busta vedi un'indennità notturna ridotta in proporzione al part time, è un errore.
### Scena 215 · Slide a piena inquadratura (voce fuori campo) · segmento 6
**Asset:** `slide_png/L00_S215_SLIDE.png`
**Parlato** (59 parole, circa 22 s):

> Mi conviene aderire al fondo pensione? Per la maggior parte dei dipendenti pubblici sì, per tre motivi: la quota dell'Azienda, che altrimenti non ricevi; la deducibilità fiscale; e il fatto che la pensione pubblica, per chi è nel sistema contributivo, sarà più bassa di quella dei colleghi andati in pensione prima. Ma è una scelta personale: vieni a parlarne.
### Scena 216 · Avatar a tutto schermo · segmento 6
**Parlato** (54 parole, circa 19 s):

> Siamo arrivati alla fine. Un'ora fa la busta paga era un foglio di codici. Adesso sai dove guardare, cosa confrontare e a chi chiedere. Conserva le buste, controlla ogni mese, segnala subito. E quando serve, porta la tua busta paga alla CISL FP di Padova e Rovigo: la leggiamo insieme, voce per voce. Grazie.
### Scena 217 · Slide a piena inquadratura (voce fuori campo) · segmento 6
**Asset:** `slide_png/L00_S217_SLIDE.png`
**Parlato** (22 parole, circa 7 s):

> Trovi i nostri recapiti e gli orari di sportello qui a schermo e sui canali della CISL FP di Padova e Rovigo.
### Scena 218 · Chiusura (10 s, muta) · segmento 6
**Asset:** `slide_png/CHIUSURA_10s.png`
*Nessun parlato.*

## 6. Checklist prima della pubblicazione
- [ ] Importi del fac-simile e codici voce verificati sulle tabelle AOUP 2026.
- [ ] Stato del CCNL 2025-2027 (ipotesi o definitivo) e percentuali dei congedi parentali ricontrollati.
- [ ] Logo ufficiale al posto del segnaposto; recapiti e orari nella slide finale.
- [ ] Audio ElevenLabs passato con silenceremove + atempo=1.12.
- [ ] Segmenti uniti con ffmpeg concat; controllo dei giunti sulle card di capitolo.
- [ ] Capitoli YouTube nella descrizione con i minutaggi reali.
- [ ] Nessun dato personale reale nel cedolino mostrato.
