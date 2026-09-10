// Contenuto delle 50 scene della lezione 1.3. *accento*  **accento in semibold**
const SCALA = [
 {n:"L", t:"Laurea in Infermieristica", d:"L/SNT-1 · 3 anni · 180 CFU"},
 {n:"M1", t:"Master di I livello", d:"≥ 60 CFU · le 5 aree cliniche, o il coordinamento"},
 {n:"LM", t:"Laurea magistrale", d:"LM/SNT-1 · 120 CFU · direzione, docenza, ricerca"},
 {n:"M2", t:"Master di II livello", d:"richiede la magistrale"},
 {n:"D", t:"Dottorato di ricerca", d:""},
];
const ORDINE = [
 {t:"Tiene l'**albo** e verifica i requisiti di iscrizione"},
 {t:"Vigila sulla condotta ed esercita il **potere disciplinare**"},
 {t:"Adotta e aggiorna il **codice deontologico**"},
 {t:"Tutela l'affidamento del pubblico, contrasta l'**esercizio abusivo**"},
 {t:"Promuove la formazione permanente e verifica l'**obbligo ECM**"},
 {t:"**Rappresenta** la professione presso le istituzioni"},
];
const SANZIONI = [
 {n:"1", t:"Avvertimento", d:"richiamo scritto a non ripetere la mancanza"},
 {n:"2", t:"Censura", d:"dichiarazione formale di biasimo"},
 {n:"3", t:"Sospensione", d:"dall'esercizio, da 1 mese a 1 anno"},
 {n:"4", t:"Radiazione", d:"cancellazione dall'albo"},
];
const NUMERI = ["1","2","3","4","5","6"];
const MEMO = [
 "Laurea **L/SNT-1**, 180 CFU, ed è **abilitante**",
 "Per esercitare serve l'**iscrizione all'albo** — L. 43/2006, anche nel pubblico",
 "**OPI e FNOPI** — L. 3/2018: enti pubblici non economici, organi sussidiari dello Stato",
 "Sanzioni: avvertimento, censura, sospensione, **radiazione**",
 "**ECM**: obbligo individuale, 150 crediti nel triennio",
 "**Livello e incarico** sono cose diverse",
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 1 · La professione infermieristica",
  titolo:"Formazione, Ordine,<br>ECM e carriera", sottotitolo:"Come si diventa infermiere e come lo si resta",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"frase", tema:"chiaro", sopratitolo:"Micro-lezione 3 di 8",
  testo:"Sappiamo *che cosa* l'infermiere è e *che cosa* fa. Oggi: come lo si diventa, e come lo si **resta**."},
{id:"s03", tipo:"frase", tema:"chiaro", sopratitolo:"Un avviso",
  testo:"Questa è materia da *domande facili*.",
  sotto:"E in un concorso dove passa chi sbaglia meno, le facili non si regalano."},

{id:"s04", tipo:"elenco", tema:"chiaro", sopratitolo:"In questa lezione", numerato:true, voci:[
  {t:"Il **percorso formativo**, dalla laurea al dottorato"},
  {t:"L'**Ordine**: che cos'è, che cosa fa, come sanziona"},
  {t:"L'**ECM**, e la differenza fra esonero ed esenzione"},
  {t:"Livelli, competenze avanzate, **incarichi**"}]},
{id:"s05", tipo:"frase", tema:"chiaro", sopratitolo:"Il punto insidioso",
  testo:"Sullo sviluppo di carriera *tre piani diversi* si accavallano, e i quiz ci giocano sopra.",
  sotto:"Alla fine avrai un test per non confonderli più."},

{id:"s06", tipo:"norma", tema:"chiaro", sopratitolo:"Da dove viene",
  etichetta:"L'ingresso all'università", sigla:"D.Lgs. 502/1992, art. 6 c. 3",
  testo:"Lo stesso articolo da cui nascerà, due anni dopo, *il profilo professionale*."},
{id:"s07", tipo:"tre", tema:"chiaro", sopratitolo:"Il titolo di base", cifre:true, box:[
  {n:"", t:"3", d:"anni"},
  {n:"", t:"180", d:"crediti formativi"},
  {n:"", t:"L/SNT-1", d:"classe di laurea · accesso programmato"}]},
{id:"s08", tipo:"frase", tema:"tenue", sopratitolo:"Un terzo del corso",
  testo:"Di quei 180 crediti, circa *60 sono di tirocinio*.",
  sotto:"È il tirocinio che rende concreti gli **ordinamenti didattici**: la seconda fonte del campo di attività."},

{id:"s09", tipo:"norma", tema:"chiaro", sopratitolo:"La laurea è abilitante",
  etichetta:"Dal 2021", sigla:"L. 163/2021",
  testo:"L'esame finale del corso di laurea *ha valore di esame di Stato abilitante*. Non c'è un esame separato."},
{id:"s10", tipo:"confronto", tema:"profondo", sopratitolo:"La distinzione che vale la domanda", col:[
  {h:"Abilitazione", t:"te la dà il titolo", grande:true},
  {h:"Esercizio", t:"te lo dà l'iscrizione all'albo", grande:true}],
  sotto:"Sono *due passaggi*, e i quiz li sovrappongono."},

{id:"s11", tipo:"elenco", tema:"chiaro", sopratitolo:"La formazione post-base",
  marcatori:SCALA.map(x=>x.n), grandi:true, numerato:true,
  voci:SCALA.map(x=>({t:x.t, d:x.d})), attive:[0,1]},
{id:"s12", tipo:"elenco", tema:"chiaro", sopratitolo:"La formazione post-base",
  marcatori:SCALA.map(x=>x.n), grandi:true, numerato:true,
  voci:SCALA.map(x=>({t:x.t, d:x.d})), attive:[0,1,2]},
{id:"s13", tipo:"elenco", tema:"chiaro", sopratitolo:"La formazione post-base",
  marcatori:SCALA.map(x=>x.n), grandi:true, numerato:true,
  voci:SCALA.map(x=>({t:x.t, d:x.d}))},

{id:"s14", tipo:"trappola", tema:"tenue", sopratitolo:"Il distrattore più frequente", righe:[
  {sb:"«la laurea magistrale è un master specialistico in area critica»",
   ok:"la magistrale *non è* una specializzazione clinica"}]},
{id:"s15", tipo:"confronto", tema:"tenue", sopratitolo:"Due percorsi, non due nomi", col:[
  {h:"Master di I livello", t:"la clinica specialistica", grande:true},
  {h:"Laurea magistrale", t:"direzione, docenza, ricerca", grande:true}]},
{id:"s16", tipo:"confronto", tema:"chiaro", sopratitolo:"Nel concorso i titoli contano due volte", col:[
  {h:"Come requisito", t:"basta la laurea"},
  {h:"Come punteggio", t:"fino a **30 punti**, di cui max **7** per il curriculum"}],
  sotto:"Dati del *pregresso Azienda Zero*."},

{id:"s17", tipo:"sostituzione", tema:"chiaro", sopratitolo:"L. 3/2018 · la legge Lorenzin",
  da:{h:"Prima", t:"Collegi IPASVI"},
  a:{h:"Dal 2018", t:"Ordini delle Professioni Infermieristiche — **OPI**"},
  sotto:"Provinciali o interprovinciali, federati nella **FNOPI**."},
{id:"s18", tipo:"citazione", tema:"profondo", sopratitolo:"La definizione da ricordare",
  testo:"Enti pubblici non economici, che operano come *organi sussidiari dello Stato*",
  fonte:"per tutelare gli interessi pubblici connessi all'esercizio della professione"},
{id:"s19", tipo:"elenco", tema:"chiaro", sopratitolo:"Che cosa l'Ordine NON è", vietato:true, voci:[
  {t:"un'**associazione privata**"},
  {t:"un **sindacato**"}]},

{id:"s20", tipo:"elenco", tema:"chiaro", sopratitolo:"Che cosa fa l'Ordine",
  voci:ORDINE, attive:[0,1]},
{id:"s21", tipo:"elenco", tema:"chiaro", sopratitolo:"Che cosa fa l'Ordine",
  voci:ORDINE},

{id:"s22", tipo:"elenco", tema:"chiaro", sopratitolo:"Le sanzioni disciplinari",
  numerato:true, marcatori:SANZIONI.map(x=>x.n), grandi:true,
  voci:SANZIONI.map(x=>({t:x.t, d:x.d})), attive:[0,1]},
{id:"s23", tipo:"elenco", tema:"profondo", sopratitolo:"Le sanzioni disciplinari",
  numerato:true, marcatori:SANZIONI.map(x=>x.n), grandi:true,
  voci:SANZIONI.map(x=>({t:x.t, d:x.d}))},
{id:"s24", tipo:"trappola", tema:"tenue", sopratitolo:"Il distrattore di questa domanda", righe:[
  {sb:"«fra le sanzioni dell'Ordine c'è il licenziamento»",
   ok:"il licenziamento è *del datore di lavoro*, non dell'Ordine"}]},

{id:"s25", tipo:"frase", tema:"chiaro", sopratitolo:"Una cosa che sorprende",
  testo:"Il disciplinare dell'Ordine è *del tutto autonomo* da quello del datore di lavoro.",
  sotto:"Non si escludono, non si aspettano, non si annullano a vicenda."},
{id:"s26", tipo:"confronto", tema:"profondo", sopratitolo:"Per lo stesso fatto", col:[
  {h:"L'azienda", t:"sanziona in base al **CCNL**", grande:true},
  {h:"L'Ordine", t:"sanziona in base al **codice deontologico**", grande:true}],
  sotto:"Due piani distinti e *cumulabili*, non alternativi."},

{id:"s27", tipo:"norma", tema:"chiaro", sopratitolo:"L'albo",
  etichetta:"Obbligatoria per l'esercizio", sigla:"L. 43/2006",
  testo:"*Anche per i dipendenti pubblici.* Ogni bando la chiede come requisito specifico di ammissione."},
{id:"s28", tipo:"norma", tema:"chiaro", sopratitolo:"Sul fronte opposto",
  etichetta:"Esercizio abusivo della professione", sigla:"art. 348 c.p.",
  testo:"Pena *sensibilmente inasprita* nel 2018."},
{id:"s29", tipo:"elenco", tema:"tenue", sopratitolo:"Chi risponde penalmente", vietato:true, voci:[
  {t:"chi **esercita senza titolo**"},
  {t:"chi **agevola l'abuso**", d:"a titolo di concorso: per esempio lasciando svolgere atti infermieristici a chi non ha il titolo"}]},

{id:"s30", tipo:"norma", tema:"chiaro", sopratitolo:"ECM · Educazione Continua in Medicina",
  etichetta:"Dove nasce", sigla:"D.Lgs. 502/1992, mod. D.Lgs. 229/1999",
  testo:"Governata dalla *Commissione Nazionale per la Formazione Continua*, presso l'Agenas."},
{id:"s31", tipo:"frase", tema:"profondo", sopratitolo:"La prima regola",
  testo:"È un obbligo **individuale**. Risponde *il professionista*, non l'azienda.",
  sotto:"«Il corso non me l'hanno offerto» non è una risposta: il debito resta tuo."},

{id:"s32", tipo:"tre", tema:"chiaro", sopratitolo:"I numeri dell'ECM", cifre:true, box:[
  {t:"150", d:"crediti nel triennio"},
  {t:"50", d:"indicativamente, all'anno"}]},
{id:"s33", tipo:"frase", tema:"chiaro", sopratitolo:"Il dossier formativo",
  testo:"Uno strumento di *programmazione*, individuale o di gruppo.",
  sotto:"Se costruito e poi rispettato, può dare diritto a un **bonus** di crediti."},

{id:"s34", tipo:"frase", tema:"chiaro", sopratitolo:"Esonero ed esenzione",
  testo:"Non sono sinonimi. *Anche se nel parlato di reparto si usano come se lo fossero.*"},
{id:"s35", tipo:"confronto", tema:"chiaro", sopratitolo:"La distinzione che vale la domanda", col:[
  {h:"Esonero — sto studiando", t:"laurea, master, dottorato, scuola di specializzazione"},
  {h:"Esenzione — non sto lavorando", t:"congedo di maternità, malattia, aspettativa"}]},
{id:"s36", tipo:"confronto", tema:"profondo", sopratitolo:"Il trucco per non sbagliare mai", col:[
  {h:"Esonero", t:"perché **studio**", grande:true},
  {h:"Esente", t:"perché **assente**", grande:true}]},

{id:"s37", tipo:"elenco", tema:"chiaro", sopratitolo:"Perché l'ECM conta davvero", voci:[
  {t:"Rileva sul piano **disciplinare** davanti all'Ordine"},
  {t:"Incide sulla valutazione dell'**idoneità professionale**"}]},
{id:"s38", tipo:"norma", tema:"chiaro", sopratitolo:"E sul profilo assicurativo",
  etichetta:"La Gelli-Bianco", sigla:"L. 24/2017",
  testo:"Collega il possesso dei *requisiti formativi* alla posizione del professionista."},
{id:"s39", tipo:"frase", tema:"tenue", sopratitolo:"Il profilo più insidioso",
  testo:"Non conoscere ciò che è ormai *patrimonio consolidato* della professione può essere letto come **colpa per imperizia**.",
  sotto:"Ci torniamo nella 1.5."},

{id:"s40", tipo:"frase", tema:"chiaro", sopratitolo:"Ultimo blocco",
  testo:"Qui i quiz mescolano volutamente le carte: *tre cose diverse* portano nomi che si somigliano.",
  sotto:"Teniamole su tre colonne separate."},
{id:"s41", tipo:"tre", tema:"chiaro", sopratitolo:"Tre piani da non confondere", box:[
  {n:"1", t:"Livelli", d:"L. 43/2006 · professionista, coordinatore, specialista, dirigente — **dipendono dal titolo**"},
  {n:"2", t:"Competenze avanzate", d:"ampliano l'agire clinico · **formazione certificata**"},
  {n:"3", t:"Incarichi di funzione", d:"organizzativa o professionale · **CCNL**"}], attive:[0]},
{id:"s42", tipo:"tre", tema:"chiaro", sopratitolo:"Tre piani da non confondere", box:[
  {n:"1", t:"Livelli", d:"L. 43/2006 · professionista, coordinatore, specialista, dirigente — **dipendono dal titolo**"},
  {n:"2", t:"Competenze avanzate", d:"ampliano l'agire clinico · **formazione certificata**"},
  {n:"3", t:"Incarichi di funzione", d:"organizzativa o professionale · conferiti dall'**azienda**"}]},

{id:"s43", tipo:"titolo", tema:"profondo",
  titolo:"Il titolo *abilita*.<br>L'azienda **attribuisce**.",
  sotto:"La frase da portarsi all'esame."},
{id:"s44", tipo:"frase", tema:"chiaro", sopratitolo:"Che cosa vuol dire, in concreto",
  testo:"Si può avere il *master di coordinamento* senza avere un *incarico di coordinamento*.",
  sotto:"L'incarico dipende dal fabbisogno organizzativo e dal contratto, non dal tuo curriculum."},
{id:"s45", tipo:"frase", tema:"chiaro", sopratitolo:"E in Veneto",
  testo:"Gli incarichi di funzione li conferisce *ciascuna azienda*, col proprio regolamento e la graduazione dell'atto aziendale.",
  sotto:"Cambia l'azienda, cambia la mappa degli incarichi."},

{id:"s46", tipo:"elenco", tema:"profondo", sopratitolo:"I sei punti",
  numerato:true, marcatori:NUMERI, grandi:true,
  voci:MEMO.map(t=>({t})), attive:[0,1]},
{id:"s47", tipo:"elenco", tema:"profondo", sopratitolo:"I sei punti",
  numerato:true, marcatori:NUMERI, grandi:true,
  voci:MEMO.map(t=>({t})), attive:[0,1,2,3]},
{id:"s48", tipo:"elenco", tema:"profondo", sopratitolo:"I sei punti",
  numerato:true, marcatori:NUMERI, grandi:true,
  voci:MEMO.map(t=>({t}))},
{id:"s49", tipo:"frase", tema:"chiaro", sopratitolo:"La prossima lezione",
  testo:"Entriamo nel *codice deontologico del 2019*: la terza fonte del campo di attività.",
  sotto:"E, secondo me, la più bella da studiare."},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Fine della micro-lezione 1.3",
  titolo:"1.4 Il Codice<br>deontologico 2019", sottotitolo:"la terza fonte del campo di attività",
  ente:"Nella dispensa: il testo commentato, i quiz e la traccia di risposta già svolta"},
];
