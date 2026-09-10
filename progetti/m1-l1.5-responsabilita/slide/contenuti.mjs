// Contenuto delle 50 scene della lezione 1.5. *accento*  **accento in semibold**
const PIANI = [
 {n:"1", t:"Penale", d:"vita e incolumità · **giudice penale** · pena"},
 {n:"2", t:"Civile", d:"diritto al **risarcimento** · giudice civile"},
 {n:"3", t:"Amministrativo-contabile", d:"patrimonio pubblico · **Corte dei conti**"},
 {n:"4", t:"Disciplinare", d:"verso il **datore di lavoro** · dal rimprovero al licenziamento"},
 {n:"5", t:"Deontologico", d:"davanti all'**Ordine** · dall'avvertimento alla radiazione"},
];
const COLPA = [
 {n:"1", t:"Negligenza", d:"trascuratezza — **ometto** ciò che dovevo fare<br>non rilevo i parametri, non registro, non segnalo"},
 {n:"2", t:"Imprudenza", d:"avventatezza — **agisco** quando dovevo usare cautela<br>somministro senza verificare l'identità"},
 {n:"3", t:"Imperizia", d:"preparazione tecnica **insufficiente**<br>gestisco un presidio di cui non conosco la tecnica"},
];
const LIMITI = [
 {n:"1", t:"Solo imperizia", d:"negligenza e imprudenza **restano fuori**"},
 {n:"2", t:"Linee guida accreditate", d:"o buone pratiche clinico-assistenziali"},
 {n:"3", t:"Adeguate al caso concreto", d:"la linea guida giusta al paziente sbagliato **non protegge**"},
];
const NUMERI = ["1","2","3","4","5"];
const PASSI = [
 "Qual era la **condotta doverosa**? — profilo, procedura, linea guida, Codice",
 "Che cosa è stato **fatto o omesso**",
 "C'è **nesso causale** fra la condotta e l'evento?",
 "Quale **forma di colpa**",
 "Quali **piani si attivano**",
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 1 · La professione infermieristica",
  titolo:"La responsabilità<br>professionale", sottotitolo:"Civile, penale, disciplinare",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"frase", tema:"chiaro", sopratitolo:"Micro-lezione 5 di 8",
  testo:"La lezione più *densa* del modulo, e una delle più **redditizie** di tutto il corso."},
{id:"s03", tipo:"titolo", tema:"profondo",
  titolo:"All'autonomia<br>corrisponde la<br>**responsabilità**.",
  sotto:"Chi decide, risponde. È il filo di tutto il modulo."},

{id:"s04", tipo:"elenco", tema:"chiaro", sopratitolo:"In questa lezione", numerato:true, voci:[
  {t:"I **cinque piani** e la loro autonomia"},
  {t:"**Dolo e colpa**, con le tre forme classiche"},
  {t:"La **Gelli-Bianco**, cuore della lezione"},
  {t:"I casi: prescrizione, OSS, **équipe**"}]},
{id:"s05", tipo:"frase", tema:"chiaro", sopratitolo:"Il primo errore da smontare",
  testo:"Non esiste *«la»* responsabilità. Ne esistono **cinque**, con presupposti, giudici e sanzioni diversi."},

{id:"s06", tipo:"elenco", tema:"chiaro", sopratitolo:"I cinque piani",
  marcatori:NUMERI, numerato:true, grandi:true, voci:PIANI.map(p=>({t:p.t, d:p.d})), attive:[0,1,2]},
{id:"s07", tipo:"elenco", tema:"chiaro", sopratitolo:"I cinque piani",
  marcatori:NUMERI, numerato:true, grandi:true, voci:PIANI.map(p=>({t:p.t, d:p.d}))},
{id:"s08", tipo:"frase", tema:"chiaro", sopratitolo:"Cinque piani, cinque giudici",
  testo:"È il *giudice* che li distingue: penale, civile, Corte dei conti, azienda, Ordine."},

{id:"s09", tipo:"titolo", tema:"profondo",
  titolo:"Autonomi<br>e **cumulabili**.",
  sotto:"La frase da ripetere all'orale."},
{id:"s10", tipo:"frase", tema:"chiaro", sopratitolo:"Che cosa vuol dire",
  testo:"L'assoluzione in sede penale *non* esclude il risarcimento civile, né la sanzione disciplinare, né quella deontologica.",
  sotto:"Un solo fatto può aprire **cinque strade parallele**, non alternative."},

{id:"s11", tipo:"confronto", tema:"chiaro", sopratitolo:"Il titolo soggettivo", col:[
  {h:"Dolo", t:"l'evento è **previsto e voluto**", grande:true},
  {h:"Colpa", t:"l'evento **non è voluto**, ma si verifica", grande:true}],
  sotto:"In sanità il dolo è raro: quasi tutto ruota attorno alla *colpa*."},
{id:"s12", tipo:"confronto", tema:"chiaro", sopratitolo:"Le due colpe", col:[
  {h:"Colpa generica", t:"negligenza, imprudenza, imperizia"},
  {h:"Colpa specifica", t:"inosservanza di leggi, regolamenti, ordini o discipline"}]},

{id:"s13", tipo:"elenco", tema:"chiaro", sopratitolo:"Le tre forme della colpa generica",
  marcatori:["1","2","3"], numerato:true, grandi:true, voci:COLPA.map(c=>({t:c.t, d:c.d})), attive:[0]},
{id:"s14", tipo:"elenco", tema:"chiaro", sopratitolo:"Le tre forme della colpa generica",
  marcatori:["1","2","3"], numerato:true, grandi:true, voci:COLPA.map(c=>({t:c.t, d:c.d})), attive:[0,1]},
{id:"s15", tipo:"elenco", tema:"chiaro", sopratitolo:"Le tre forme della colpa generica",
  marcatori:["1","2","3"], numerato:true, grandi:true, voci:COLPA.map(c=>({t:c.t, d:c.d}))},

{id:"s16", tipo:"sostituzione", tema:"tenue", sopratitolo:"Si chiude un cerchio con la 1.3",
  da:{h:"Sembra", t:"un adempimento burocratico"},
  a:{h:"È", t:"il ponte fra **formazione e responsabilità**"},
  sotto:"L'*imperizia* è il punto in cui l'ECM diventa una questione di colpa."},
{id:"s17", tipo:"frase", tema:"tenue", sopratitolo:"In sede di giudizio",
  testo:"Non sapere ciò che *oggi* un infermiere deve sapere è un problema.",
  sotto:"La mancata acquisizione di conoscenze ormai consolidate può essere valutata come colpa."},

{id:"s18", tipo:"norma", tema:"chiaro", sopratitolo:"Il cuore della lezione",
  etichetta:"La Gelli-Bianco", sigla:"L. 24/2017",
  testo:"Regola per i quiz: *2017* accanto a «responsabilità sanitaria» → è quasi sempre questa legge."},

{id:"s19", tipo:"citazione", tema:"profondo", sopratitolo:"Articolo 1",
  testo:"La sicurezza delle cure è *parte costitutiva* del diritto alla salute",
  fonte:"L. 24/2017, art. 1 comma 1"},
{id:"s20", tipo:"frase", tema:"chiaro", sopratitolo:"Come si realizza",
  testo:"Con l'insieme delle attività di *prevenzione e gestione del rischio* connesso all'erogazione delle prestazioni.",
  sotto:"E **tutto il personale concorre**, compresi i liberi professionisti."},
{id:"s21", tipo:"frase", tema:"chiaro", sopratitolo:"Non è della direzione",
  testo:"È di **ciascuno**.",
  sotto:"Da qui nascono incident reporting, audit e raccomandazioni ministeriali — modulo 2."},

{id:"s22", tipo:"elenco", tema:"chiaro", sopratitolo:"L'architettura di sistema", numerato:true, voci:[
  {t:"**Garante** per il diritto alla salute", d:"funzione affidata al Difensore civico regionale"},
  {t:"**Centri regionali** per la gestione del rischio sanitario"},
  {t:"**Osservatorio nazionale** delle buone pratiche"}]},
{id:"s23", tipo:"frase", tema:"chiaro", sopratitolo:"E la trasparenza",
  testo:"Consegna della documentazione sanitaria entro *termini definiti*.",
  sotto:"Tre nomi da saper citare: Garante, Centri regionali, Osservatorio."},

{id:"s24", tipo:"norma", tema:"chiaro", sopratitolo:"Sul piano penale",
  etichetta:"Responsabilità colposa per morte o lesioni in ambito sanitario", sigla:"art. 590-sexies c.p.",
  testo:"Lo schema va tenuto *tutto insieme*: è lì che i quiz lavorano."},
{id:"s25", tipo:"frase", tema:"chiaro", sopratitolo:"Lo schema",
  testo:"Evento per **imperizia** + rispetto di *linee guida accreditate* o buone pratiche → la punibilità è **esclusa**.",
  sotto:"Sempre che quelle raccomandazioni risultino adeguate alle specificità del caso concreto."},
{id:"s26", tipo:"frase", tema:"chiaro", sopratitolo:"Tre condizioni",
  testo:"Se ne cade *una*, la non punibilità non c'è."},

{id:"s27", tipo:"elenco", tema:"tenue", sopratitolo:"I tre limiti della non punibilità",
  marcatori:["1","2","3"], numerato:true, grandi:true, voci:LIMITI.map(l=>({t:l.t, d:l.d})), attive:[0]},
{id:"s28", tipo:"elenco", tema:"tenue", sopratitolo:"I tre limiti della non punibilità",
  marcatori:["1","2","3"], numerato:true, grandi:true, voci:LIMITI.map(l=>({t:l.t, d:l.d})), attive:[0,1]},
{id:"s29", tipo:"trappola", tema:"tenue", sopratitolo:"Il distrattore tipico", righe:[
  {sb:"«la non punibilità vale per ogni forma di colpa»", ok:"vale *solo per l'imperizia* — è sempre errato"}]},

{id:"s30", tipo:"frase", tema:"chiaro", sopratitolo:"Sul piano civile",
  testo:"Il **doppio binario**: forse la domanda più frequente in assoluto sulla Gelli-Bianco.",
  sotto:"Due soggetti, due titoli, due prescrizioni."},
{id:"s31", tipo:"confronto", tema:"chiaro", sopratitolo:"Il doppio binario", col:[
  {h:"Struttura", t:"**contrattuale** — artt. 1218 e 1228 c.c.<br>prescrizione **10 anni**"},
  {h:"Esercente", t:"**extracontrattuale** — art. 2043 c.c.<br>prescrizione **5 anni**"}],
  sotto:"L'onere della prova è del danneggiato: fatto, danno, nesso, colpa."},
{id:"s32", tipo:"titolo", tema:"profondo",
  titolo:"**Dieci** la struttura.<br>**Cinque** l'esercente.",
  sotto:"Memorizza i due numeri accoppiati ai due soggetti."},

{id:"s33", tipo:"frase", tema:"chiaro", sopratitolo:"Perché il doppio binario",
  testo:"Per indirizzare il paziente verso la *struttura*, dove l'onere probatorio gli è più favorevole.",
  sotto:"Alleggerendo la posizione del singolo professionista."},
{id:"s34", tipo:"frase", tema:"chiaro", sopratitolo:"Condizione di procedibilità",
  testo:"Il tentativo di **conciliazione** con ricorso per *accertamento tecnico preventivo*, in alternativa alla mediazione."},

{id:"s35", tipo:"elenco", tema:"chiaro", sopratitolo:"L'azione di rivalsa", numerato:true, grandi:true, voci:[
  {t:"Solo per **dolo o colpa grave**"},
  {t:"Entro **un anno** dall'avvenuto pagamento"}]},
{id:"s36", tipo:"frase", tema:"chiaro", sopratitolo:"Se il professionista è dipendente pubblico",
  testo:"Giudica la **Corte dei conti**, e l'importo è *limitato* a un multiplo della retribuzione annua lorda.",
  sotto:"Per ciascun anno."},
{id:"s37", tipo:"frase", tema:"tenue", sopratitolo:"Un dettaglio che vale una domanda",
  testo:"Il professionista che *non è stato parte* del giudizio **non è vincolato** dalla sentenza pronunciata contro la struttura."},

{id:"s38", tipo:"elenco", tema:"chiaro", sopratitolo:"L'obbligo assicurativo", voci:[
  {t:"Le **strutture**: copertura per RC verso terzi e verso i prestatori d'opera", d:"compresi i danni causati dal personale a qualunque titolo operante"},
  {t:"**Azione diretta** del danneggiato verso l'assicuratore"}]},
{id:"s39", tipo:"frase", tema:"chiaro", sopratitolo:"E il professionista",
  testo:"Deve provvedere alla copertura per la **colpa grave**."},

{id:"s40", tipo:"elenco", tema:"chiaro", sopratitolo:"I reati che ricorrono", marcatori:["—","—","—","—","—"], voci:[
  {t:"**589** omicidio colposo · **590** lesioni colpose"},
  {t:"**328** omissione di atti d'ufficio · **593** omissione di soccorso"},
  {t:"**591** abbandono di incapaci · **572** maltrattamenti"},
  {t:"**610 / 605** violenza privata e sequestro", d:"per la contenzione priva dei presupposti"},
  {t:"**476 / 479** falso · **622 / 326** segreto · **348** esercizio abusivo · **314** peculato"}]},
{id:"s41", tipo:"frase", tema:"chiaro", sopratitolo:"Un filo comune",
  testo:"Il peculato, per esempio, nell'*appropriazione di farmaci o stupefacenti*."},

{id:"s42", tipo:"frase", tema:"chiaro", sopratitolo:"La documentazione",
  testo:"Cartella clinica e cartella infermieristica sono **atti pubblici**.",
  sotto:"L'annotazione falsa o alterata integra *falso in atto pubblico*."},
{id:"s43", tipo:"elenco", tema:"chiaro", sopratitolo:"Come si corregge", numerato:true, voci:[
  {t:"**Senza cancellare**"},
  {t:"Lasciando **leggibile** il dato precedente"},
  {t:"Con **data e firma**"}]},
{id:"s44", tipo:"titolo", tema:"profondo",
  titolo:"Ciò che non è documentato<br>si presume **non fatto**.",
  sotto:"Puoi aver fatto tutto correttamente: se non è scritto, in giudizio non esiste."},

{id:"s45", tipo:"confronto", tema:"chiaro", sopratitolo:"Nell'équipe, due principi opposti", col:[
  {h:"Affidamento", t:"posso confidare nella correttezza dell'operato altrui"},
  {h:"Il suo limite", t:"cade davanti all'errore **evidente e riconoscibile**"}]},
{id:"s46", tipo:"frase", tema:"chiaro", sopratitolo:"Tradotto sulla prescrizione errata",
  testo:"Non ti nascondi dietro la prescrizione se l'errore era *palese*.",
  sotto:"Chiedi chiarimento; se il dubbio resta, non dai corso e documenti."},
{id:"s47", tipo:"confronto", tema:"tenue", sopratitolo:"Tradotto sull'attribuzione all'OSS", col:[
  {h:"Culpa in eligendo", t:"per aver **scelto male** l'operatore", grande:true},
  {h:"Culpa in vigilando", t:"per non aver **supervisionato**", grande:true}]},

{id:"s48", tipo:"elenco", tema:"profondo", sopratitolo:"Lo schema per qualunque caso",
  numerato:true, marcatori:NUMERI, grandi:true, voci:PASSI.map(t=>({t})), attive:[0,1]},
{id:"s49", tipo:"elenco", tema:"profondo", sopratitolo:"Lo schema per qualunque caso",
  numerato:true, marcatori:NUMERI, grandi:true, voci:PASSI.map(t=>({t}))},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Fine della micro-lezione 1.5",
  titolo:"1.6 Consenso informato,<br>DAT e autodeterminazione", sottotitolo:"la legge 219 del 2017",
  ente:"Nella dispensa: la tabella dei reati, 15 quiz e la traccia svolta sulla Gelli-Bianco"},
];
