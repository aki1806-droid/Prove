// Contenuto delle 50 scene della lezione 2.3. *accento*  **accento in semibold**

const OBIETTIVI = [
 {t:"Come si struttura un **accertamento**", d:"sei aree, sempre nello stesso ordine"},
 {t:"La regola della **direzione del punteggio**", d:"risolve da sola metà delle domande sulle scale"},
 {t:"Le **scale che contano**", d:"con i numeri esatti"},
 {t:"I **limiti** delle scale", d:"all'orale valgono quanto i numeri"},
];

const AREE = [
 {n:"1", t:"Dati **anagrafici e sociali** — con chi vive, chi è il caregiver"},
 {n:"2", t:"**Anamnesi** — patologie, allergie, terapia e aderenza, ausili"},
 {n:"3", t:"**Parametri** e misure"},
 {n:"4", t:"**Bisogni** o modelli funzionali"},
 {n:"5", t:"Le **scale** previste dalla procedura"},
 {n:"6", t:"**Educazione e dimissione** — si prepara dal primo giorno"},
];

const INTERVENTI = [
 {t:"**Cambi posturali** programmati"},
 {t:"**Superficie antidecubito** adeguata"},
 {t:"Gestione dell'**umidità**"},
 {t:"Valutazione **nutrizionale**"},
 {t:"**Ispezione quotidiana** della cute"},
];

const LIMITI = [
 {n:"1", t:"**Non sostituisce il giudizio clinico** — se la persona è a rischio e la scala dice di no, prevale l'osservazione, e si documenta"},
 {n:"2", t:"Va usata **dove è validata** — quella popolazione, quel setting, quell'età"},
 {n:"3", t:"Va **ripetuta** — il valore all'ingresso è una fotografia, non un verdetto"},
];

const NUMERI = [
 ["**Braden**", "lesioni da pressione", "6–23", "rischio **≤ 16**"],
 ["**Norton**", "lesioni da pressione", "5–20", "rischio **≤ 14**"],
 ["**Conley**", "cadute", "0–10", "rischio **≥ 2**"],
 ["**Tinetti**", "equilibrio e andatura", "0–28", "elevato **< 19**"],
 ["**Barthel**", "autonomia nelle ADL", "0–100", "più basso, più dipendente"],
 ["**Glasgow**", "stato di coscienza", "3–15", "coma **≤ 8**"],
 ["**CAM**", "delirium", "—", "**1 + 2 + (3 o 4)**"],
 ["**MUST**", "stato nutrizionale", "—", "alto **≥ 2**"],
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 2 · Metodologia, documentazione e sicurezza",
  titolo:"L'accertamento<br>e le scale", sottotitolo:"La lezione con la più alta densità di numeri del corso",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"frase", tema:"chiaro", sopratitolo:"Perché le scale si chiedono sempre",
  testo:"Sono **numeriche, univoche, facilissime da chiedere**.",
  sotto:"Il terreno più fertile per domande secche."},

{id:"s03", tipo:"titolo", tema:"chiaro", sopratitolo:"E perché si perdono",
  titolo:"La trappola è<br>la **direzione** del punteggio.",
  sotto:"Non il valore: la direzione."},

{id:"s04", tipo:"confronto", tema:"tenue", sopratitolo:"Due scale, due direzioni opposte",
  col:[
   {h:"In alcune", t:"Punteggio **basso** = rischio **alto**", grande:true},
   {h:"In altre", t:"Punteggio **alto** = rischio **alto**", grande:true}],
  sotto:"Prima la regola, poi i numeri: è così che questa lezione è costruita."},

{id:"s05", tipo:"elenco", tema:"chiaro", sopratitolo:"Quattro traguardi", numerato:true,
  attive:[0,1], voci:OBIETTIVI},
{id:"s06", tipo:"elenco", tema:"chiaro", sopratitolo:"Quattro traguardi", numerato:true,
  voci:OBIETTIVI},

{id:"s07", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, attive:[0,1],
  sopratitolo:"L'accertamento all'ingresso · sei aree", celle:AREE},
{id:"s08", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false,
  sopratitolo:"L'accertamento all'ingresso · sei aree", celle:AREE},

{id:"s09", tipo:"catena", tema:"chiaro", sopratitolo:"L'esame obiettivo · quattro tecniche, in quest'ordine",
  passi:[
   {t:"Ispezione"}, {t:"Palpazione"}, {t:"Percussione"}, {t:"Auscultazione"}]},

{id:"s10", tipo:"titolo", tema:"profondo", sopratitolo:"L'eccezione che è una domanda ricorrente",
  titolo:"Sull'**addome**<br>si ausculta **prima**.",
  sotto:"Ispezione, auscultazione, percussione, palpazione — per non alterare i rumori intestinali."},

{id:"s11", tipo:"albero", tema:"chiaro", sopratitolo:"La regola che risolve metà delle domande",
  radice:"La scala misura un **rischio** o una **capacità**?",
  rami:[
   {cond:"capacità", esito:"più alto è **meglio**<br><em>Barthel, Tinetti, Glasgow</em>"},
   {cond:"rischio", esito:"più alto è **peggio**<br><em>Conley, NEWS, intensità del dolore</em>"},
   {cond:"rischio, ma inverso", esito:"**Braden e Norton**<br><em>le due eccezioni</em>", key:true}]},

{id:"s12", tipo:"titolo", tema:"profondo",
  titolo:"**Braden e Norton** misurano<br>un rischio con punteggio **inverso**.",
  sotto:"Più basso il punteggio, più alto il rischio. Sono due, e sono sempre quelle due."},

{id:"s13", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false,
  sopratitolo:"Braden · rischio di lesione da pressione, sei item",
  celle:[
   {n:"1", t:"Percezione sensoriale"}, {n:"2", t:"Umidità"},
   {n:"3", t:"Attività"}, {n:"4", t:"Mobilità"},
   {n:"5", t:"Nutrizione"}, {n:"6", t:"Frizione e scivolamento"}]},

{id:"s14", tipo:"scadenza", tema:"chiaro", sopratitolo:"Braden · dove sta il rischio",
  max:24, banda:[6,16], colore:"#D70328",
  inizio:"6 · massima dipendenza", fine:"23 · nessun rischio",
  tappe:[
   {a:6, v:"6", t:"il **minimo** possibile"},
   {a:16, v:"16", t:"la **soglia**: da qui in giù, a rischio", key:true},
   {a:23, v:"23", t:"il **massimo**"}]},

{id:"s15", tipo:"titolo", tema:"tenue", sopratitolo:"Da dove vengono il 6 e il 23",
  titolo:"Cinque item a **quattro** livelli,<br>uno solo a **tre**.",
  sotto:"È «frizione e scivolamento» — il dettaglio da veri conoscitori."},

{id:"s16", tipo:"scadenza", tema:"chiaro", sopratitolo:"Norton · stesso rischio, cinque item",
  max:21, banda:[5,14], colore:"#D70328",
  inizio:"5 · massima dipendenza", fine:"20 · nessun rischio",
  tappe:[
   {a:5, v:"5", t:"il **minimo**"},
   {a:14, v:"14", t:"la **soglia**", key:true},
   {a:20, v:"20", t:"il **massimo**"}]},

{id:"s17", tipo:"confronto", tema:"chiaro", sopratitolo:"Non una migliore e una peggiore",
  col:[
   {h:"Norton", t:"Più **rapida** — cinque item invece di sei"},
   {h:"Braden", t:"Più **sensibile** — intercetta più persone a rischio"}],
  sotto:"È un compromesso fra tempo e copertura."},

{id:"s18", tipo:"tabella", tema:"chiaro", sopratitolo:"Le due coppie da memorizzare insieme",
  intestazioni:["","Braden","Norton"], colonne:["24%","38%","38%"], chiave:[2],
  righe:[
   ["**Item**","6","5"],
   ["**Punteggio**","6–23","5–20"],
   ["**Soglia di rischio**","**≤ 16**","**≤ 14**"]]},

{id:"s19", tipo:"griglia", tema:"chiaro", colonne:1, attive:[0,1],
  sopratitolo:"Che cosa consegue da un Braden a rischio", celle:INTERVENTI},
{id:"s20", tipo:"griglia", tema:"chiaro", colonne:1,
  sopratitolo:"Che cosa consegue da un Braden a rischio", celle:INTERVENTI},

{id:"s21", tipo:"titolo", tema:"chiaro", sopratitolo:"La catena che i casi chiedono",
  titolo:"A un Braden basso<br>deve corrispondere una<br>**modifica del piano, scritta**."},

{id:"s22", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false,
  sopratitolo:"Conley · rischio di caduta, sei item",
  celle:[
   {n:"1", t:"Precedenti cadute"}, {n:"2", t:"Vertigini"},
   {n:"3", t:"Incontinenza o urgenza"}, {n:"4", t:"Deterioramento cognitivo"},
   {n:"5", t:"Agitazione"}, {n:"6", t:"Compromissione della marcia"}]},

{id:"s23", tipo:"scadenza", tema:"chiaro", sopratitolo:"Conley · qui il rischio sta in alto",
  max:11, banda:[2,10], colore:"#D70328",
  inizio:"0 · nessun rischio", fine:"10 · rischio massimo",
  tappe:[
   {a:2, v:"2", t:"la **soglia**: da qui in su, a rischio", key:true},
   {a:10, v:"10", t:"il **massimo**"}]},

{id:"s24", tipo:"confronto", tema:"chiaro", sopratitolo:"Stesso rischio, direzioni opposte",
  col:[
   {h:"Conley — misura un rischio", t:"0–10 · a rischio da **2 in su**"},
   {h:"Tinetti — misura una capacità", t:"0–28 · rischio elevato **sotto 19**"}],
  sotto:"Conley è uno screening sensibile: meglio qualche falso positivo che una caduta non prevista."},

{id:"s25", tipo:"scadenza", tema:"chiaro", sopratitolo:"Barthel · autonomia in dieci attività",
  max:105, banda:[0,100], colore:"#00623A",
  inizio:"0 · totalmente dipendente", fine:"100 · autonomo",
  tappe:[
   {a:0, v:"0", t:"dipendente in tutte e dieci"},
   {a:100, v:"100", t:"autonomo in tutte e dieci", key:true}]},

{id:"s26", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false,
  sopratitolo:"ADL di Katz · sei attività di base, il corpo proprio",
  celle:[
   {n:"1", t:"Bagno"}, {n:"2", t:"Vestirsi"}, {n:"3", t:"Toilette"},
   {n:"4", t:"Trasferimenti"}, {n:"5", t:"Continenza"}, {n:"6", t:"Alimentazione"}]},

{id:"s27", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false,
  sopratitolo:"IADL di Lawton · otto attività strumentali, il mondo fuori",
  celle:[
   {n:"1", t:"Telefono"}, {n:"2", t:"Spesa"}, {n:"3", t:"Cucina"}, {n:"4", t:"Casa"},
   {n:"5", t:"Bucato"}, {n:"6", t:"Trasporti"}, {n:"7", t:"Farmaci"}, {n:"8", t:"Denaro"}]},

{id:"s28", tipo:"catena", tema:"chiaro", sopratitolo:"Quale delle due intercetta prima il declino",
  passi:[
   {t:"Si perdono le **IADL**", d:"farmaci, denaro, trasporti", key:true},
   {t:"E **poi** le ADL", d:"bagno, vestirsi, alimentazione"}]},

{id:"s29", tipo:"titolo", tema:"tenue", sopratitolo:"Perché le IADL sono più sensibili",
  titolo:"Non gestisce più le medicine,<br>ma si lava ancora da sola:<br>il problema è **già iniziato**."},

{id:"s30", tipo:"tabella", tema:"chiaro", sopratitolo:"Le scale del dolore · quando la persona può riferire",
  intestazioni:["Scala","Che cos'è","Quando"], colonne:["18%","48%","34%"], chiave:[0],
  righe:[
   ["**NRS**","numerica da 0 a 10","la più usata: non richiede supporti"],
   ["**VAS**","una linea di 10 cm su cui segnare un punto","serve il supporto stampato"],
   ["**VRS**","descrittori verbali: nessuno, lieve, moderato, forte","quando i numeri non arrivano"],
   ["**Wong-Baker**","le facce","bambini, barriere linguistiche"]]},

{id:"s31", tipo:"tabella", tema:"chiaro", sopratitolo:"Le due osservazionali · quando non può riferire",
  intestazioni:["Scala","Per chi","Che cosa osserva"], colonne:["20%","30%","50%"],
  righe:[
   ["**PAINAD**","demenza avanzata","respiro, vocalizzazione, espressione facciale, linguaggio del corpo, consolabilità"],
   ["**FLACC**","il bambino piccolo","volto, gambe, attività, pianto, consolabilità"]]},

{id:"s32", tipo:"titolo", tema:"chiaro", sopratitolo:"La regola d'oro",
  titolo:"Il dolore è<br>**ciò che la persona dice che è**.",
  sotto:"E quando non può dirlo, si passa a una scala osservazionale."},

{id:"s33", tipo:"trappola", tema:"chiaro", sopratitolo:"Il distrattore tipico",
  righe:[
   {sb:"«Il paziente con demenza non è valutabile»",
    ok:"È **sempre** errato: non valutabile con la NRS non vuol dire non valutabile"}]},

{id:"s34", tipo:"titolo", tema:"profondo",
  titolo:"Il dolore non misurabile<br>con le parole<br>**resta un dolore**."},

{id:"s35", tipo:"impila", tema:"chiaro", sopratitolo:"Glasgow · da dove viene il 15",
  unita:"punti", unita1:"punto", testa:"i tre item, sommati",
  segmenti:[
   {v:4, t:"Apertura degli occhi", d:"da 1 a 4"},
   {v:5, t:"Risposta verbale", d:"da 1 a 5"},
   {v:6, t:"Risposta motoria", d:"da 1 a 6"}]},

{id:"s36", tipo:"scadenza", tema:"chiaro", sopratitolo:"Glasgow · le tre fasce",
  max:16, banda:[3,8], colore:"#D70328",
  inizio:"3 · il minimo, non zero", fine:"15 · il massimo",
  tappe:[
   {a:3, v:"3", t:"somma dei **minimi**: ogni item parte da 1"},
   {a:8, v:"8", t:"**coma** — da qui in giù", key:true},
   {a:12, v:"12", t:"9–12: **moderata**"},
   {a:15, v:"15", t:"13–15: **lieve**"}]},

{id:"s37", tipo:"tre", tema:"chiaro", sopratitolo:"Tre numeri, e ricostruisci tutto", cifre:true,
  box:[
   {n:"4", t:"Occhi"}, {n:"5", t:"Verbale"}, {n:"6", t:"Motoria", key:true}]},

{id:"s38", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false,
  sopratitolo:"CAM · le quattro caratteristiche del delirium",
  celle:[
   {n:"1", t:"Esordio **acuto** e andamento **fluttuante**"},
   {n:"2", t:"**Disattenzione**"},
   {n:"3", t:"Pensiero **disorganizzato**"},
   {n:"4", t:"**Alterato livello di coscienza**"}]},

{id:"s39", tipo:"albero", tema:"chiaro", sopratitolo:"La formula: 1 + 2 + (3 o 4)",
  radice:"Sono presenti la **1** e la **2**?",
  rami:[
   {cond:"no", esito:"**non** è delirium secondo la CAM"},
   {cond:"sì, più almeno una fra 3 e 4", esito:"CAM **positiva**", key:true},
   {cond:"sì, ma né 3 né 4", esito:"CAM **negativa** — le prime due non bastano"}]},

{id:"s40", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false,
  sopratitolo:"NEWS2 e MEWS · i parametri che si sommano",
  celle:[
   {n:"1", t:"Frequenza respiratoria"}, {n:"2", t:"Saturazione"},
   {n:"3", t:"Ossigenoterapia"}, {n:"4", t:"Pressione sistolica"},
   {n:"5", t:"Frequenza cardiaca"}, {n:"6", t:"Stato di coscienza"},
   {n:"7", t:"Temperatura"}]},

{id:"s41", tipo:"titolo", tema:"chiaro", sopratitolo:"Che cosa fa il punteggio NEWS",
  titolo:"Non è una diagnosi:<br>è un **semaforo**.",
  sotto:"Dice quanto spesso guardare e chi chiamare — anche quando il paziente sembra stabile."},

{id:"s42", tipo:"tabella", tema:"chiaro", sopratitolo:"Le due scale nutrizionali",
  intestazioni:["Scala","Per chi","Direzione"], colonne:["18%","36%","46%"], chiave:[0],
  righe:[
   ["**MUST**","l'adulto — BMI, calo ponderale, effetto della malattia acuta","rischio alto **da 2 in su**"],
   ["**MNA**","l'anziano","punteggio **basso** = stato nutrizionale peggiore"]]},

{id:"s43", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, attive:[0],
  sopratitolo:"I tre limiti · all'orale valgono quanto i numeri", celle:LIMITI},
{id:"s44", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false,
  sopratitolo:"I tre limiti · all'orale valgono quanto i numeri", celle:LIMITI},

{id:"s45", tipo:"trappola", tema:"chiaro", sopratitolo:"L'errore più diffuso, e il più facile da contestare",
  righe:[
   {sb:"Compilare la scala e lasciare il piano com'era",
    ok:"Dopo il punteggio, **sempre** l'intervento che ne consegue"}]},

{id:"s46", tipo:"titolo", tema:"profondo",
  titolo:"La scala compilata<br>dimostra che il rischio<br>**era noto**.",
  sotto:"E che non è stato gestito."},

{id:"s47", tipo:"tabella", tema:"chiaro", sopratitolo:"La tabella dei numeri · 1",
  intestazioni:["Scala","Che cosa misura","Range","Soglia"], colonne:["18%","34%","16%","32%"],
  righe:NUMERI.slice(0,4)},
{id:"s48", tipo:"tabella", tema:"chiaro", sopratitolo:"La tabella dei numeri · 2",
  intestazioni:["Scala","Che cosa misura","Range","Soglia"], colonne:["18%","34%","16%","32%"],
  righe:NUMERI.slice(4)},

{id:"s49", tipo:"titolo", tema:"chiaro", sopratitolo:"Come usare questa lezione",
  titolo:"Fotografa la tabella<br>e riguardala<br>**la sera prima della prova**."},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione",
  titolo:"2.4", sottotitolo:"La documentazione<br>infermieristica",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
