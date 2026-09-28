// Contenuto delle 50 scene della lezione 4.6 — Antibiotico-resistenza e
// stewardship. Il meccanismo della selezione e' un campo di germi in tre
// fasi (corpo selezione); le sigle degli MDRO una griglia che si riempie; il
// ruolo dell'infermiere tre file di gesti. One Health torna come triade.

const MDRO = [
 {n:"1", t:"**MRSA** · *Staphylococcus aureus* resistente alla meticillina"}, {n:"2", t:"**VRE** · enterococchi resistenti alla vancomicina"},
 {n:"3", t:"**ESBL** · enterobatteri produttori di beta-lattamasi a spettro esteso"}, {n:"4", t:"**CRE / KPC** · enterobatteri resistenti ai carbapenemi", key:true},
 {n:"5", t:"*Acinetobacter baumannii* **MDR**"}, {n:"6", t:"*Pseudomonas aeruginosa* **MDR**"},
];
const REGOLE = [
 {t:"Farmaco giusto"}, {t:"Dose giusta"}, {t:"Via giusta"}, {t:"Durata giusta", d:"la più breve efficace", key:true},
];
const CAMPIONI = [
 {illu:"siringa", t:"Prima", d:"della prima dose di antibiotico", key:true}, {illu:"provetta", t:"Due set", d:"da siti diversi"},
 {illu:"goccia", t:"8–10 ml", d:"per flacone nell'adulto"}, {illu:"dispenser", t:"Antisepsi", d:"della cute e del tappo"},
];
const SOMMINISTRA = [
 {n:"1", t:"Rispettare gli **orari**: le concentrazioni dipendono dall'intervallo"}, {n:"2", t:"**Prima dose tempestiva** nella sepsi: ogni ora conta", key:true},
 {n:"3", t:"Rispettare i **tempi di infusione**"}, {n:"4", t:"**Segnalare** reazioni ed effetti avversi, a partire dalla diarrea"},
 {n:"5", t:"Ricordare la **rivalutazione a 48–72 ore**"},
];
const EDUCA = [
 {t:"Assumere l'antibiotico **esattamente come prescritto**"}, {t:"Non conservare gli **avanzi** per la prossima volta"}, {t:"Non chiedere antibiotici per **raffreddore e influenza**: sono virali", key:true},
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 4 · Prevenzione e controllo delle infezioni correlate all'assistenza",
  titolo:"Antibiotico-resistenza<br>e stewardship", sottotitolo:"4.6 · Il nemico, e la strategia",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"frase", tema:"chiaro", sopratitolo:"Micro-lezione 6 di 8 · una delle principali minacce per la salute pubblica di questo secolo",
  testo:"L'**Italia** è fra i Paesi europei più colpiti. Questa lezione ha due parti: **il nemico**, e **la strategia**."},
{id:"s03", tipo:"icone", tema:"chiaro", sopratitolo:"Per l'infermiere non è un tema da microbiologi", voci:[
  {icona:"mani", t:"Le mani", d:"la diffusione dei germi resistenti"}, {icona:"contatto", t:"L'ambiente"}, {icona:"siringa", t:"La somministrazione", d:"l'uso corretto passa anche da qui", key:true}]},

{id:"s04", tipo:"selezione", tema:"chiaro", sopratitolo:"Che cos'è la resistenza · un fenomeno naturale", fase:"prima",
  t:"La capacità di **sopravvivere** a un farmaco che eliminerebbe il germe.", sotto:"Un fenomeno naturale: in ogni campo, pochi germi lo sono già."},
{id:"s05", tipo:"selezione", tema:"chiaro", sopratitolo:"L'uso eccessivo e inappropriato accelera tutto", fase:"dopo",
  t:"L'antibiotico uccide i sensibili e **seleziona** i resistenti.", sotto:"Restano quelli che il farmaco non tocca."},
{id:"s06", tipo:"selezione", tema:"chiaro", sopratitolo:"E si moltiplicano", fase:"poi",
  t:"Resistenti a più classi di antibiotici: gli **MDRO**.", sotto:"Organismi multiresistenti: la sigla che torna in tutte le procedure di isolamento."},

{id:"s07", tipo:"frase", tema:"chiaro", sopratitolo:"Il peso del problema · le stime europee",
  testo:"**Decine di migliaia di decessi** ogni anno nell'Unione, attribuibili a infezioni da germi resistenti. L'Italia è fra i Paesi con la quota più alta."},
{id:"s08", tipo:"figura", tema:"chiaro", sopratitolo:"Un dato che ricorre", illu:"microbo",
  titolo:"*Klebsiella pneumoniae* resistente<br>ai **carbapenemi**.",
  sotto:"Antibiotici di ultima linea. In Italia fra le resistenze più elevate d'Europa: non è un problema futuro, è nei nostri reparti."},

{id:"s09", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, attive:[0,1], sopratitolo:"I principali MDRO · i nomi da conoscere, con le sigle", celle:MDRO},
{id:"s10", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, attive:[0,1,2,3], sopratitolo:"I principali MDRO · KPC: *Klebsiella pneumoniae* produttrice di carbapenemasi", celle:MDRO},
{id:"s11", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"I principali MDRO · sei nomi, sei sigle da saper sciogliere", celle:MDRO},
{id:"s12", tipo:"figura", tema:"chiaro", sopratitolo:"Accanto a questi", illu:"microbo", lato:"dx",
  titolo:"Il **C. difficile**:<br>non un MDRO in senso stretto.",
  sotto:"Ma figlio diretto dell'uso di antibiotici. Lo ritroveremo alla fine della lezione."},

{id:"s13", tipo:"confronto", tema:"chiaro", sopratitolo:"Colonizzazione e serbatoio · ripreso dalla 4.1", col:[
  {h:"Colonizzato", t:"Il germe è nell'intestino, sulla cute, nel naso, **senza malattia**. È la maggior parte dei portatori.", key:true},
  {h:"Infetto", t:"Il germe **causa malattia**"}]},
{id:"s14", tipo:"icone", tema:"chiaro", sopratitolo:"Ma il colonizzato è un serbatoio · la trasmissione avviene soprattutto per contatto", voci:[
  {icona:"mani", t:"Le mani", d:"degli operatori", key:true}, {icona:"contatto", t:"L'ambiente", d:"superfici e dispositivi condivisi"}]},
{id:"s15", tipo:"titolo", tema:"profondo",
  titolo:"Precauzioni da contatto:<br>**per il colonizzato come per l'infetto**.",
  sotto:"Non serve la febbre perché il germe passi da un letto all'altro."},

{id:"s16", tipo:"frase", tema:"chiaro", sopratitolo:"Lo screening · secondo la procedura aziendale",
  testo:"Scoprire i colonizzati **prima** che trasmettano il germe: un tampone all'ingresso, e si sa chi isolare."},
{id:"s17", tipo:"confronto", tema:"chiaro", sopratitolo:"Nei pazienti a rischio · precedenti ricoveri, trasferimenti da altri ospedali o RSA, terapia intensiva", col:[
  {h:"MRSA", t:"Tampone **nasale**"},
  {h:"CRE e VRE", t:"Tampone **rettale**", key:true}]},
{id:"s18", tipo:"sostituzione", tema:"chiaro", sopratitolo:"In attesa del risultato",
  da:{h:"Non", t:"aspettare il referto per isolare"}, a:{h:"Ma", t:"precauzioni da contatto subito"},
  sotto:"Si isola prima, si conferma dopo: così fanno molte aziende."},

{id:"s19", tipo:"confronto", tema:"chiaro", sopratitolo:"La decolonizzazione", col:[
  {h:"MRSA", t:"**Mupirocina** nasale e lavaggi con **clorexidina**, in indicazioni selezionate: prima di chirurgia protesica o cardiaca"},
  {h:"CRE", t:"**Non esiste** una decolonizzazione efficace di routine", key:true}]},
{id:"s20", tipo:"catena", tema:"chiaro", sopratitolo:"Per i CRE la difesa è una sola: impedirne la trasmissione", passi:[
  {t:"Mani"}, {t:"Contatto"}, {t:"Ambiente", key:true}]},

{id:"s21", tipo:"frase", tema:"chiaro", sopratitolo:"La sorveglianza nazionale · Ministero della Salute",
  testo:"Le **batteriemie** da enterobatteri produttori di carbapenemasi hanno una sorveglianza specifica con **segnalazione obbligatoria**."},
{id:"s22", tipo:"norma", tema:"chiaro", sopratitolo:"Il quadro programmatorio · citato nella 4.1",
  etichetta:"Piano Nazionale di Contrasto all'Antibiotico-Resistenza", sigla:"PNCAR",
  testo:"Il piano che tiene insieme sorveglianza, uso appropriato e prevenzione."},

{id:"s23", tipo:"frase", tema:"chiaro", sopratitolo:"Seconda parte · la strategia",
  testo:"**Antimicrobial stewardship**, la buona amministrazione degli antimicrobici: l'insieme coordinato di interventi per l'**uso appropriato**."},
{id:"s24", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Quattro obiettivi · non meno antibiotici a prescindere: antibiotici usati meglio", celle:[
  {t:"Migliori **esiti clinici**"}, {t:"Meno **resistenze**", key:true}, {t:"Meno **effetti avversi**"}, {t:"Meno infezioni da **C. difficile**"}]},

{id:"s25", tipo:"percorso", tema:"chiaro", sopratitolo:"Le regole dell'uso appropriato", tappe:REGOLE},
{id:"s26", tipo:"confronto", tema:"chiaro", sopratitolo:"Due mosse", col:[
  {h:"De-escalation", t:"Ampio spettro se serve, poi **restringere** appena arriva l'antibiogramma", key:true},
  {h:"Switch precoce", t:"Dalla via **endovenosa** alla via **orale**"}]},
{id:"s27", tipo:"frase", tema:"chiaro", sopratitolo:"E la regola che tocca l'infermiere più da vicino",
  testo:"**Le colture prima** di iniziare l'antibiotico, quando possibile."},

{id:"s28", tipo:"gesti", tema:"chiaro", sopratitolo:"Il ruolo dell'infermiere · i campioni: dopo la prima dose possono risultare falsamente negativi", attive:[0], voci:CAMPIONI},
{id:"s29", tipo:"gesti", tema:"chiaro", sopratitolo:"Le emocolture · il volume è il primo determinante della sensibilità", attive:[0,1,2], voci:CAMPIONI},
{id:"s30", tipo:"gesti", tema:"chiaro", sopratitolo:"Una coltura contaminata porta a terapie inutili: è stewardship anche questa", voci:CAMPIONI},

{id:"s31", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, attive:[0], sopratitolo:"Il ruolo dell'infermiere · la somministrazione", celle:SOMMINISTRA},
{id:"s32", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, attive:[0,1,2], sopratitolo:"La somministrazione · nella sepsi ogni ora di ritardo peggiora la prognosi", celle:SOMMINISTRA},
{id:"s33", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"La somministrazione · a 48–72 ore arrivano le colture", celle:SOMMINISTRA},

{id:"s34", tipo:"catena", tema:"chiaro", sopratitolo:"La parte più potente del ruolo infermieristico", passi:[
  {t:"Igiene delle mani"}, {t:"Precauzioni"}, {t:"Rimozione precoce", d:"dei dispositivi", key:true}]},
{id:"s35", tipo:"griglia", tema:"chiaro", colonne:1, spunta:true, sopratitolo:"L'educazione della persona e dei familiari", celle:EDUCA},
{id:"s36", tipo:"titolo", tema:"profondo",
  titolo:"Ogni infezione prevenuta<br>è **un antibiotico non usato**.",
  sotto:"La frase da portare a casa."},

{id:"s37", tipo:"triade", tema:"chiaro", sopratitolo:"Un concetto che chiude il quadro · una sola salute", centro:"One Health", nodi:[
  {t:"Salute umana", key:true}, {t:"Salute animale"}, {t:"Ambiente"}]},
{id:"s38", tipo:"frase", tema:"tenue", sopratitolo:"Le resistenze circolano fra le tre",
  testo:"Gli antibiotici degli **allevamenti** e quelli dispersi nell'**ambiente** selezionano resistenze tanto quanto quelli dell'ospedale. È l'approccio del PNCAR."},

{id:"s39", tipo:"frase", tema:"chiaro", sopratitolo:"Il caso d'esame",
  testo:"Trasferito da una **RSA**, febbrile, **catetere vescicale** da dieci giorni. Che cosa fai **prima della prima dose** di antibiotico?"},
{id:"s40", tipo:"percorso", tema:"chiaro", sopratitolo:"La risposta · una RSA è fra le provenienze che la procedura elenca", attive:[0,1], tappe:[
  {t:"Precauzioni da contatto"}, {t:"Screening", d:"tampone rettale compreso"}, {t:"Emocolture", d:"due set, siti diversi"}, {t:"Urinocoltura", d:"dal catetere sostituito, se indicato"}, {t:"Antibiotico", d:"subito, dopo le colture", key:true}]},
{id:"s41", tipo:"percorso", tema:"chiaro", sopratitolo:"La risposta · colture prima, antibiotico subito dopo", tappe:[
  {t:"Precauzioni da contatto"}, {t:"Screening", d:"tampone rettale compreso"}, {t:"Emocolture", d:"due set, siti diversi"}, {t:"Urinocoltura", d:"dal catetere sostituito, se indicato"}, {t:"Antibiotico", d:"subito, dopo le colture", key:true}]},
{id:"s42", tipo:"figura", tema:"chiaro", sopratitolo:"E la domanda che nessuno fa", illu:"catetere", lato:"dx",
  titolo:"**Quel catetere serve ancora?**",
  sotto:"Dieci giorni di catetere sono dieci giorni di porta aperta."},

{id:"s43", tipo:"catena", tema:"chiaro", sopratitolo:"Un collegamento da portare all'orale · 3.7 e 4.3", passi:[
  {t:"Antibiotico"}, {t:"Flora alterata"}, {t:"C. difficile", key:true}, {t:"Diarrea"}, {t:"Contatto", d:"spore resistenti all'alcol"}]},
{id:"s44", tipo:"triade", tema:"chiaro", sopratitolo:"La stessa battaglia vista da tre lati", centro:"Tre lati", nodi:[
  {t:"Stewardship", key:true}, {t:"Igiene delle mani"}, {t:"Isolamento"}]},

{id:"s45", tipo:"icone", tema:"chiaro", sopratitolo:"In Veneto · programmi aziendali di stewardship, gruppi multidisciplinari", voci:[
  {icona:"persona", t:"Infettivologo"}, {icona:"lente", t:"Microbiologo"}, {icona:"fiale", t:"Farmacista"}, {icona:"persona", t:"Infermiere", d:"parte del programma", key:true}]},
{id:"s46", tipo:"sostituzione", tema:"chiaro", sopratitolo:"All'orale la parola chiave è «multidisciplinare»",
  da:{h:"Non", t:"esecutore a valle"}, a:{h:"Ma", t:"parte del programma"},
  sotto:"Consumi, resistenze locali, MDRO, protocolli di terapia empirica: l'infermiere è al tavolo."},

{id:"s47", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Ricapitoliamo", celle:[
  {n:"1", t:"Le sigle: **MRSA, VRE, ESBL, CRE e KPC**"}, {n:"2", t:"Il **colonizzato** è un serbatoio", key:true},
  {n:"3", t:"Screening **nasale** per MRSA"}, {n:"4", t:"Screening **rettale** per CRE e VRE"}]},
{id:"s48", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Ricapitoliamo", celle:[
  {n:"5", t:"Stewardship: farmaco, dose, via, durata **giusti**"}, {n:"6", t:"**De-escalation** e passaggio precoce alla via orale"},
  {n:"7", t:"Colture **prima** della prima dose", key:true}, {n:"8", t:"Emocolture in **due set** da siti diversi"}]},
{id:"s49", tipo:"frase", tema:"chiaro", sopratitolo:"Prossima lezione · il rischio biologico per l'operatore, e la gestione dei rifiuti",
  testo:"**Ogni infezione prevenuta è un antibiotico non usato.**"},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione",
  titolo:"4.7 Rischio biologico<br>e gestione dei rifiuti", sottotitolo:"L'operatore che si protegge, e ciò che esce dal reparto",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
