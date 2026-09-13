// Contenuto delle 50 scene della lezione 1.7. *accento*  **accento in semibold**
const PRINCIPI = [
 {t:"Liceità, correttezza, trasparenza"},
 {t:"**Limitazione della finalità**", d:"il dato raccolto per la cura non si usa per altro"},
 {t:"**Minimizzazione**", d:"si trattano solo i dati necessari"},
 {t:"Esattezza"},
 {t:"Limitazione della conservazione"},
 {t:"Integrità e riservatezza"},
 {t:"**Responsabilizzazione**", d:"il titolare deve poter *dimostrare* la conformità"},
];
const SOGGETTI = [
 {n:"1", t:"Titolare", d:"l'**azienda sanitaria**: determina finalità e mezzi"},
 {n:"2", t:"Responsabile", d:"tratta per conto del titolare — un fornitore informatico"},
 {n:"3", t:"DPO / RPD", d:"**obbligatorio** negli enti pubblici"},
 {n:"4", t:"Soggetti autorizzati", d:"gli operatori: trattano **secondo istruzioni**"},
 {n:"5", t:"Interessato", d:"accesso, rettifica, cancellazione, limitazione, opposizione, portabilità"},
];
const LECITA = [
 {t:"**Presupposto clinico documentato** o stato di necessità"},
 {t:"**Prescrizione** o motivata valutazione assistenziale"},
 {t:"**Proporzionalità** del mezzo"},
 {t:"**Durata limitata**, con rivalutazione periodica"},
 {t:"**Sorveglianza** della persona contenuta"},
 {t:"**Registrazione** in cartella"},
 {t:"**Informazione** alla persona e ai familiari"},
 {t:"Ricerca di **alternative** meno restrittive"},
];
const REATI = [
 {t:"**593** omissione di soccorso", d:"riguarda **chiunque**, anche fuori servizio"},
 {t:"**591** abbandono di incapaci", d:"riguarda chi ha **custodia o cura**"},
 {t:"**572** maltrattamenti", d:"condotte **abituali**, anche nelle strutture di cura"},
 {t:"**328** rifiuto di atti d'ufficio", d:"per l'atto dovuto per ragioni di sanità"},
 {t:"**609-bis** violenza sessuale", d:"aggravata dall'abuso della qualità e della relazione di cura"},
 {t:"**476 / 479** falso in atto pubblico", d:"per le annotazioni alterate in cartella"},
];
const NUMERI = ["1","2","3","4","5","6","7"];
const MEMO = [
 "**622** a querela · **326** d'ufficio — il dipendente pubblico risponde di **entrambi**",
 "I dati sulla salute sono **dati particolari** (art. 9 GDPR)",
 "Per la **cura** la base è l'art. **9.2 lett. h)**, non il consenso",
 "**Minimizzazione**: l'accesso non giustificato è illecito anche **senza divulgazione**",
 "I **familiari** non hanno diritto automatico",
 "**Contenzione**: documentata, proporzionata, limitata — mai per carenza di personale",
 "**Referto entro 48 ore** — ma non dovuto se esporrebbe l'assistito a procedimento penale",
];


// --- figure ricorrenti della lezione ---
const PRINCIPI7 = [
 {n:"1", t:"**Liceità, correttezza, trasparenza**"},
 {n:"2", t:"**Limitazione della finalità**", d:"il dato raccolto per la cura non si usa per altro"},
 {n:"3", t:"**Minimizzazione**", d:"solo i dati necessari"},
 {n:"4", t:"**Esattezza**"},
 {n:"5", t:"**Limitazione della conservazione**"},
 {n:"6", t:"**Integrità e riservatezza**"},
 {n:"7", t:"**Responsabilizzazione**", d:"non basta essere conformi: bisogna poterlo dimostrare"},
];
const OTTO = [
 {t:"**Presupposto clinico** documentato o stato di necessità"},
 {t:"**Prescrizione** o motivata valutazione assistenziale"},
 {t:"**Proporzionalità** del mezzo"},
 {t:"**Durata limitata**, con rivalutazione periodica"},
 {t:"**Sorveglianza** della persona contenuta"},
 {t:"**Registrazione** in cartella"},
 {t:"**Informazione** alla persona e ai familiari"},
 {t:"Ricerca di **alternative** meno restrittive"},
];
const REATI7 = [
 ["**593** omissione di soccorso","riguarda **chiunque**, anche fuori servizio"],
 ["**591** abbandono di incapaci","riguarda chi ha **custodia o cura**"],
 ["**572** maltrattamenti","condotte **abituali**, anche nelle strutture di cura"],
 ["**328** rifiuto di atti d'ufficio","per l'atto dovuto per ragioni di sanità"],
 ["**609-bis** violenza sessuale","aggravata dall'abuso della qualità e della relazione di cura"],
 ["**476 / 479** falso in atto pubblico","per le annotazioni alterate"],
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 1 · La professione infermieristica",
  titolo:"Segreto, privacy<br>e tutela della persona", sottotitolo:"Il dovere di tacere e il dovere di proteggere",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"frase", tema:"chiaro", sopratitolo:"Micro-lezione 7 di 8",
  testo:"Due famiglie di temi che nei bandi compaiono accostate: la *riservatezza* e la *tutela della persona*."},
{id:"s03", tipo:"figura", tema:"tenue", sopratitolo:"Quiz secchi e casi pratici", illu:"telefono",
  titolo:"La **contenzione** e la **fotografia in chat** sono ormai due classici delle prove più recenti."},
{id:"s04", tipo:"icone", tema:"chiaro", sopratitolo:"Quattro blocchi", voci:[
  {icona:"lucchetto", t:"I due segreti", d:"622 e 326"},
  {icona:"occhio",    t:"Il GDPR", d:"i dati sulla salute"},
  {icona:"cartella",  t:"L'accesso", d:"chi può e chi non può"},
  {icona:"scudo",     t:"La tutela", d:"contenzione, reati, referto"}]},

{id:"s05", tipo:"tabella", tema:"chiaro", sopratitolo:"I due segreti: la differenza è nella procedibilità",
  intestazioni:["","Art. 622 — professionale","Art. 326 — d'ufficio"], colonne:["22%","39%","39%"],
  chiave:[2],
  righe:[
   ["Chi riguarda","chi ha notizia per **stato, ufficio, professione o arte**","il **pubblico ufficiale** o l'incaricato di pubblico servizio"],
   ["La condotta","rivela un segreto **senza giusta causa**","rivela notizie d'ufficio che devono restare segrete"],
   ["Procedibilità","**a querela** della persona offesa","**d'ufficio**: non serve che nessuno sporga querela"]]},

{id:"s06", tipo:"figura", tema:"chiaro", sopratitolo:"Art. 622", illu:"scudo", lato:"dx",
  titolo:"Punisce la rivelazione *senza giusta causa* di un segreto appreso in ragione della professione."},
{id:"s07", tipo:"titolo", tema:"profondo",
  titolo:"Il 326 è procedibile<br>**d'ufficio**.",
  sotto:"Non serve che nessuno sporga querela perché il procedimento parta."},

{id:"s08", tipo:"figura", tema:"chiaro", sopratitolo:"Il punto che sorprende", illu:"persona",
  titolo:"L'infermiere **dipendente pubblico** può rispondere di *entrambi*.", sotto:"È un professionista (622) ed è incaricato di pubblico servizio o pubblico ufficiale (326)."},
{id:"s09", tipo:"raggiera", tema:"chiaro", sopratitolo:"Quattro fronti per un solo fatto", centro:"Un fatto",
  raggi:[{t:"Art. 622", d:"segreto professionale"},{t:"Art. 326", d:"segreto d'ufficio"},{t:"Disciplinare", d:"verso l'azienda"},{t:"Deontologico", d:"davanti all'Ordine", key:true}]},

{id:"s10", tipo:"griglia", tema:"chiaro", colonne:2, attive:[0,1],
  sopratitolo:"«Senza giusta causa»: quando la comunicazione è dovuta o consentita", celle:[
  {t:"**Referto** e **denuncia**"},
  {t:"Comunicazioni obbligatorie per **malattie infettive** o infortuni"},
  {t:"**Testimonianza** nei casi previsti"},
  {t:"Tutela di un **interesse prevalente**"}]},

{id:"s11", tipo:"griglia", tema:"chiaro", colonne:2, attive:[0,1,2,3],
  sopratitolo:"«Senza giusta causa»: quando la comunicazione è dovuta o consentita", celle:[
  {t:"**Referto** e **denuncia**"},
  {t:"Comunicazioni obbligatorie per **malattie infettive** o infortuni"},
  {t:"**Testimonianza** nei casi previsti"},
  {t:"Tutela di un **interesse prevalente**"}]},

{id:"s12", tipo:"norma", tema:"chiaro", sopratitolo:"La protezione dei dati",
  etichetta:"GDPR · Reg. UE 2016/679", sigla:"D.Lgs. 196/2003, mod. 101/2018",
  testo:"Il regolamento è *direttamente applicabile*; il Codice privacy lo integra."},
{id:"s13", tipo:"figura", tema:"chiaro", sopratitolo:"I dati sulla salute", illu:"libro", lato:"dx",
  titolo:"Rientrano nelle **categorie particolari** dell'*articolo 9*.", sotto:"Vige un **divieto generale** di trattamento, con eccezioni tassative ed elencate."},

{id:"s14", tipo:"titolo", tema:"profondo",
  titolo:"Per curare<br>**non serve** il consenso privacy.",
  sotto:"La base giuridica è l'art. 9, par. 2, lett. h) del GDPR."},
{id:"s15", tipo:"figura", tema:"chiaro", sopratitolo:"La lettera h)", illu:"cartella",
  titolo:"Il trattamento è consentito quando è effettuato da o sotto la responsabilità di un professionista *soggetto al segreto professionale*."},
{id:"s16", tipo:"venn", tema:"chiaro", sopratitolo:"Due consensi che non vanno confusi",
  sx:{t:"Consenso al trattamento", d:"legge 219/2017 · l'atto di cura"},
  dx:{t:"Consenso privacy", d:"GDPR · il trattamento dei dati"},
  centro:"Per la **cura** la base giuridica è l'art. **9.2 lett. h)**, non il consenso"},

{id:"s17", tipo:"griglia", tema:"chiaro", colonne:1, attive:[0,1,2],
  sopratitolo:"I sette principi del GDPR", celle:PRINCIPI7},

{id:"s18", tipo:"griglia", tema:"chiaro", colonne:1, attive:[0,1,2,3,4,5,6],
  sopratitolo:"I sette principi del GDPR", celle:PRINCIPI7},

{id:"s19", tipo:"figura", tema:"chiaro", sopratitolo:"Il caso d'esame più frequente", illu:"lente", lato:"dx",
  titolo:"Consultare la cartella o il fascicolo di un paziente *non in cura presso di sé*.", sotto:"Un familiare, un conoscente, un collega, un personaggio noto."},
{id:"s20", tipo:"titolo", tema:"profondo",
  titolo:"È un trattamento illecito.<br>Anche se **non si divulga nulla**.",
  sotto:"E anche se si guarda una riga sola."},
{id:"s21", tipo:"figura", tema:"tenue", sopratitolo:"Perché", illu:"catena",
  titolo:"Viola la *minimizzazione* e le istruzioni ricevute. Ed è **tracciato dai log di accesso**.", sotto:"La curiosità, in sanità digitale, lascia impronte."},

{id:"s22", tipo:"tabella", tema:"chiaro", sopratitolo:"Chi è chi, nel trattamento dei dati",
  intestazioni:["Ruolo","Chi è","Che cosa fa"], colonne:["26%","30%","44%"],
  righe:[
   ["**Titolare**","l'azienda sanitaria","determina finalità e mezzi"],
   ["**Responsabile**","un fornitore esterno","tratta per conto del titolare"],
   ["**DPO / RPD**","obbligatorio negli enti pubblici","sorveglia e consiglia"],
   ["**Soggetto autorizzato**","l'infermiere e gli operatori","tratta **secondo istruzioni**"]]},

{id:"s23", tipo:"tabella", tema:"chiaro", sopratitolo:"Chi è chi, nel trattamento dei dati",
  intestazioni:["Ruolo","Chi è","Che cosa fa"], colonne:["26%","30%","44%"],
  chiave:[2,3],
  righe:[
   ["**Titolare**","l'azienda sanitaria","determina finalità e mezzi"],
   ["**Responsabile**","un fornitore esterno","tratta per conto del titolare"],
   ["**DPO / RPD**","obbligatorio negli enti pubblici","sorveglia e consiglia"],
   ["**Soggetto autorizzato**","l'infermiere e gli operatori","tratta **secondo istruzioni**"]]},

{id:"s24", tipo:"tabella", tema:"chiaro", sopratitolo:"Chi può avere la documentazione",
  intestazioni:["","Può?","A quale condizione"], colonne:["30%","14%","56%"],
  righe:[
   ["**L'interessato**","si:sì","accesso ai propri dati e copia — legge 24/2017, entro termini definiti"],
   ["**I familiari**","no:non in automatico","solo se **delegati**, o con responsabilità genitoriale o tutela"]]},

{id:"s25", tipo:"tabella", tema:"chiaro", sopratitolo:"Chi può avere la documentazione",
  intestazioni:["","Può?","A quale condizione"], colonne:["30%","14%","56%"],
  righe:[
   ["**L'interessato**","si:sì","accesso ai propri dati e copia — legge 24/2017, entro termini definiti"],
   ["**I familiari**","no:non in automatico","solo se **delegati**, o con responsabilità genitoriale o tutela"],
   ["**Dopo il decesso**","si:sì","chi ha un **interesse proprio** o ragioni familiari meritevoli di protezione"]]},

{id:"s26", tipo:"griglia", tema:"chiaro", colonne:2, attive:[0,1],
  sopratitolo:"La riservatezza di tutti i giorni", celle:[
  {t:"Commentare casi in **ascensore, corridoio, mensa**", no:true},
  {t:"Affiggere **elenchi con nomi e diagnosi**", no:true},
  {t:"Fare la **consegna in luogo riservato**"},
  {t:"Confermare **per telefono** la presenza di un ricoverato", no:true}]},

{id:"s27", tipo:"griglia", tema:"chiaro", colonne:2, attive:[0,1,2,3],
  sopratitolo:"La riservatezza di tutti i giorni", celle:[
  {t:"Commentare casi in **ascensore, corridoio, mensa**", no:true},
  {t:"Affiggere **elenchi con nomi e diagnosi**", no:true},
  {t:"Fare la **consegna in luogo riservato**"},
  {t:"Confermare **per telefono** la presenza di un ricoverato", no:true}]},

{id:"s28", tipo:"figura", tema:"chiaro", sopratitolo:"Torniamo sulla contenzione", illu:"letto", lato:"dx",
  titolo:"Nella 1.4 l'abbiamo vista dal lato *deontologico*. Dal lato del **diritto** la questione è seria."},
{id:"s29", tipo:"griglia", tema:"chiaro", colonne:1, attive:[0,1],
  sopratitolo:"Contenzione: i reati che può toccare", celle:[
  {n:"610", t:"**Violenza privata**", no:true},
  {n:"605", t:"**Sequestro di persona**, se la privazione si prolunga senza giustificazione", no:true},
  {n:"572", t:"**Maltrattamenti**, per condotte abituali", no:true},
  {n:"591", t:"**Abbandono di incapaci**, se la persona resta senza sorveglianza", no:true},
  {n:"589", t:"**Lesioni o omicidio colposi**, per una contenzione mal eseguita", no:true}]},

{id:"s30", tipo:"griglia", tema:"chiaro", colonne:1, attive:[0,1,2,3,4],
  sopratitolo:"Contenzione: i reati che può toccare", celle:[
  {n:"610", t:"**Violenza privata**", no:true},
  {n:"605", t:"**Sequestro di persona**, se la privazione si prolunga senza giustificazione", no:true},
  {n:"572", t:"**Maltrattamenti**, per condotte abituali", no:true},
  {n:"591", t:"**Abbandono di incapaci**, se la persona resta senza sorveglianza", no:true},
  {n:"589", t:"**Lesioni o omicidio colposi**, per una contenzione mal eseguita", no:true}]},

{id:"s31", tipo:"figura", tema:"chiaro", sopratitolo:"Non c'è una legge generale", illu:"bilancia",
  titolo:"La liceità della contenzione si valuta *caso per caso*.", sotto:"Ecco gli otto elementi che la commissione si aspetta di sentire elencare."},
{id:"s32", tipo:"griglia", tema:"chiaro", colonne:2, attive:[0,1,2,3],
  sopratitolo:"Gli otto elementi della liceità", celle:OTTO},

{id:"s33", tipo:"griglia", tema:"chiaro", colonne:2, attive:[0,1,2,3,4,5,6,7],
  sopratitolo:"Gli otto elementi della liceità", celle:OTTO},

{id:"s34", tipo:"titolo", tema:"profondo",
  titolo:"La carenza di personale<br>non è **mai** un presupposto<br>di liceità.",
  sotto:"È la frase che chiude il ragionamento."},

{id:"s35", tipo:"tabella", tema:"chiaro", sopratitolo:"I reati a tutela della persona",
  intestazioni:["Articolo","Chi riguarda, e quando"], colonne:["34%","66%"],
  righe:REATI7.slice(0,2)},

{id:"s36", tipo:"tabella", tema:"chiaro", sopratitolo:"I reati a tutela della persona",
  intestazioni:["Articolo","Chi riguarda, e quando"], colonne:["34%","66%"],
  righe:REATI7.slice(0,5)},

{id:"s37", tipo:"tabella", tema:"chiaro", sopratitolo:"I reati a tutela della persona",
  intestazioni:["Articolo","Chi riguarda, e quando"], colonne:["34%","66%"],
  righe:REATI7},

{id:"s38", tipo:"norma", tema:"chiaro", sopratitolo:"Il referto",
  etichetta:"Esercente una professione sanitaria", sigla:"art. 365 c.p.",
  testo:"Per i casi che possono presentare i caratteri di un *delitto perseguibile d'ufficio*."},
{id:"s39", tipo:"scadenza", tema:"chiaro", sopratitolo:"Il referto — art. 365 c.p.",
  max:48, inizio:"presti assistenza", fine:"48 ore dopo", banda:[0,48], tappe:[
   {a:0, v:"subito", t:"**immediatamente**, se c'è pericolo nel ritardo", key:true},
   {a:48, v:"48 h", t:"il termine ordinario per presentarlo"}]},

{id:"s40", tipo:"titolo", tema:"profondo",
  titolo:"Non è dovuto quando<br>esporrebbe l'assistito<br>a **procedimento penale**.",
  sotto:"È il limite che distingue il referto da qualunque altro obbligo di comunicazione."},
{id:"s41", tipo:"catena", tema:"chiaro", sopratitolo:"Violenza sospetta: tre binari",
  attive:[0], passi:[
   {t:"Assistenza", d:"alla persona, prima di tutto"},
   {t:"Documentazione", d:"accurata e oggettiva: descrivere, non giudicare"},
   {t:"Percorsi previsti", d:"referto o denuncia, servizi sociali per i minori", key:true}]},

{id:"s42", tipo:"catena", tema:"chiaro", sopratitolo:"Violenza sospetta: tre binari",
  attive:[0,1], passi:[
   {t:"Assistenza", d:"alla persona, prima di tutto"},
   {t:"Documentazione", d:"accurata e oggettiva: descrivere, non giudicare"},
   {t:"Percorsi previsti", d:"referto o denuncia, servizi sociali per i minori", key:true}]},

{id:"s43", tipo:"catena", tema:"chiaro", sopratitolo:"Violenza sospetta: tre binari",
  attive:[0,1,2], passi:[
   {t:"Assistenza", d:"alla persona, prima di tutto"},
   {t:"Documentazione", d:"accurata e oggettiva: descrivere, non giudicare"},
   {t:"Percorsi previsti", d:"referto o denuncia, servizi sociali per i minori", key:true}]},

{id:"s44", tipo:"figura", tema:"tenue", sopratitolo:"E il segreto?", illu:"dialogo", lato:"dx",
  titolo:"Qui il segreto professionale **non è un ostacolo**: la comunicazione è *dovuta*, e costituisce giusta causa.", sotto:"Referto o denuncia a cura di chi ne ha l'obbligo; per i minori, allerta dei servizi sociali."},

{id:"s45", tipo:"icone", tema:"chiaro", sopratitolo:"In Veneto", voci:[
  {icona:"cartella", t:"FSE regionale", d:"consensi, deleghe e log: l'accesso non giustificato è rilevato"},
  {icona:"lucchetto", t:"DPO aziendale", d:"e regolamento sui dispositivi personali"},
  {icona:"ospedale", t:"Percorsi dedicati", d:"per le vittime di violenza in pronto soccorso"}]},

{id:"s46", tipo:"elenco", tema:"chiaro", sopratitolo:"E in ogni azienda", voci:[
  {t:"Un **DPO** e un regolamento sull'uso dei **dispositivi personali**"},
  {t:"**Percorsi dedicati** per le vittime di violenza in pronto soccorso"}]},

{id:"s47", tipo:"elenco", tema:"profondo", sopratitolo:"I sette punti",
  numerato:true, marcatori:NUMERI, grandi:true, voci:MEMO.map(t=>({t})), attive:[0,1,2]},
{id:"s48", tipo:"elenco", tema:"profondo", sopratitolo:"I sette punti",
  numerato:true, marcatori:NUMERI, grandi:true, voci:MEMO.map(t=>({t})), attive:[0,1,2,3,4]},
{id:"s49", tipo:"elenco", tema:"profondo", sopratitolo:"I sette punti",
  numerato:true, marcatori:NUMERI, grandi:true, voci:MEMO.map(t=>({t}))},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Fine della micro-lezione 1.7",
  titolo:"1.8 Riepilogo<br>e autovalutazione", sottotitolo:"mappa, numeri, confusioni, casi",
  ente:"Nella dispensa: il testo commentato, i quiz e la traccia di risposta già svolta"},
];
