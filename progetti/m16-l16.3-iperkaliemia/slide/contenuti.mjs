// Contenuto delle 50 scene della lezione 16.3 — il paziente dializzato con
// iperkaliemia. Le alterazioni dell'ECG sono un percorso che si accende dalla
// T appuntita all'arresto; i tre meccanismi dei farmaci d'urgenza tre colonne
// che si accendono una per volta (stabilizzare, spostare, eliminare); la
// fistola il braccio con i «mai»; errori in tabella; la risposta modello un
// promemoria riga per riga.

const LEZIONI = [
  {n:"3.5", t:"Potassio ed emolisi", illu:"goccia"},
  {n:"6.1", t:"Patrimonio venoso", illu:"puntura"},
  {n:"8.4", t:"Dialisi e fistola", illu:"circuito"},
  {n:"14.4", t:"Il rene", illu:"rene"},
  {n:"14.7", t:"Valori di laboratorio", illu:"provetta"}];

const ECG = (att, k) => ({tipo:"percorso", tema:"chiaro", attive:att, tappe:[
  {t:"Onde T alte e appuntite", key:k===0},
  {t:"PR allungato", d:"onda P appiattita", key:k===1},
  {t:"QRS che si allarga", key:k===2},
  {t:"Bradicardia", d:"ritmi a QRS largo", key:k===3},
  {t:"Arresto", d:"fibrillazione ventricolare o asistolia", key:k===4}]});

const FARMACI = (att, k) => ({tipo:"colonne", tema:"chiaro", attive:att, colonne:[
  {h:"1 · Stabilizzare il cuore", key:k===0, voci:[
    {t:"**Calcio** EV", d:"gluconato o cloruro"}, {t:"Protegge in pochi minuti"},
    {t:"**Non** abbassa il potassio", key:true}, {t:"Cautela con la digossina"}]},
  {h:"2 · Spostare nelle cellule", key:k===1, voci:[
    {t:"**Insulina** rapida + **glucosio** EV"}, {t:"**Salbutamolo** per aerosol"},
    {t:"Bicarbonato", d:"se c'è acidosi"}, {t:"Temporaneo: il potassio **resta**", key:true}]},
  {h:"3 · Eliminare", key:k===2, voci:[
    {t:"**Emodialisi** urgente", d:"il trattamento definitivo", key:true}, {t:"Resine o leganti del potassio"}]}]});

const EDUCAZIONE = (att) => ({tipo:"griglia", tema:"chiaro", colonne:2, attive:att, celle:[
  {t:"Non saltare le sedute: se c'è un impedimento, **contattare il centro dialisi**", key:true},
  {t:"Dieta: **potassio**, fosforo, sale"},
  {t:"**Liquidi**: il limite indicato · il peso fra una seduta e l'altra"},
  {t:"Segni d'allarme: debolezza, formicolii, palpitazioni, dispnea, aumento rapido di peso → **chiamare**"},
  {t:"Cura della **fistola**"},
  {no:true, t:"Farmaci da banco senza consiglio: i **FANS**"}]});

const FISTOLA = (att, titolo) => ({tipo:"fistola", tema:"chiaro", attive:att, titolo,
  voci:["Misurare la pressione", "Prelievi, cannule", "Lacci, indumenti stretti", "Sollevare pesi", "Dormirci sopra"]});

const RISPOSTA = (att) => ({tipo:"memo", tema:"chiaro", attive:att, voci:[
  "**Inquadramento**: seduta saltata, astenia, parestesie, bradicardia, dispnea, edemi, peso → **iperkaliemia grave** e sovraccarico",
  "**Priorità**: prevenire le aritmie",
  "Monitor e **defibrillatore** · medico subito · ECG · accesso sul braccio **senza fistola** · potassio con l'emogas",
  "Calcio EV, insulina con glucosio, salbutamolo secondo prescrizione · ECG, potassio, **glicemia** · dialisi urgente",
  "Sovraccarico: semiseduto, ossigeno, restrizione idrica · **fistola** protetta",
  "Il perché della seduta saltata, senza **giudizio** · educazione: sedute, potassio, liquidi, segni d'allarme"]});

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 16 · Casi clinici avanzati",
  titolo:"Il paziente dializzato<br>con iperkaliemia", sottotitolo:"16.3 · ECG, terapia d'urgenza e la fistola",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"ecg", tema:"chiaro", sopratitolo:"Micro-lezione 3 di 12 · l'elettrolita che uccide più in silenzio", ritmo:"fv", key:true,
  titolo:"Pochi sintomi, poi un'aritmia mortale", sotto:"all'improvviso"},
{id:"s03", tipo:"tre", tema:"chiaro", sopratitolo:"In emodialisi, salta una seduta: arriva con un potassio pericoloso", box:[
  {n:"1", t:"L'ECG", d:"come si legge"}, {n:"2", t:"I farmaci d'urgenza", d:"tre modi diversi di agire", key:true}, {n:"3", t:"La fistola", d:"come si protegge"}]},
{id:"s04", tipo:"anello", tema:"chiaro", sopratitolo:"I collegamenti",
  centro:"16.3", sotto:"il potassio", voci:LEZIONI},

{id:"s05", tipo:"cifre", tema:"chiaro", sopratitolo:"Lo scenario · il signor Sergio · venerdì non si è presentato alla seduta", voci:[
  {n:"68", suf:"anni", t:"in emodialisi", d:"lunedì, mercoledì, venerdì · quasi **anurico**"},
  {n:"FAV", t:"al braccio sinistro", d:"fistola artero-venosa", key:true}]},
{id:"s06", tipo:"cifre", tema:"chiaro", sopratitolo:"Lunedì alle 8, in Pronto Soccorso · astenia, «gambe molli», formicolii, nausea, dispnea", voci:[
  {n:"46", t:"frequenza", d:"bradicardia", key:true}, {n:"150/90", t:"pressione"}]},
{id:"s07", tipo:"pausa", tema:"chiaro", sopratitolo:"Edemi declivi, crepitii alle basi", es:"metti in pausa",
  testo:"Quali **due problemi** vedi, e quale è **più pericoloso** adesso?",
  dati:["FR 26", "SpO₂ 92%", "+3,5 kg sul peso secco", "seduta saltata"]},

{id:"s08", tipo:"raggiera", tema:"chiaro", sopratitolo:"Il ragionamento · quasi anurico, salta una seduta: si accumula ciò che il rene non elimina", centro:"Accumulo", raggi:[
  {t:"Potassio", key:true}, {t:"Liquidi"}, {t:"Scorie"}, {t:"Acidi"}]},
{id:"s09", tipo:"confronto", tema:"chiaro", sopratitolo:"Due problemi", col:[
  {h:"Sospetta iperkaliemia grave", t:"debolezza muscolare, parestesie, **bradicardia**"},
  {h:"Sovraccarico di liquidi", t:"edemi, crepitii, dispnea, **+3,5 kg**"}]},
{id:"s10", tipo:"figura", tema:"chiaro", illu:"cuore", sopratitolo:"Il più pericoloso nell'immediato",
  titolo:"L'**iperkaliemia**.", sotto:"Può causare aritmie e arresto cardiaco, senza preavviso."},

{id:"s11", tipo:"griglia", tema:"chiaro", colonne:2, sopratitolo:"Le prime azioni", celle:[
  {t:"**Monitor** continuo, **defibrillatore** pronto", key:true}, {t:"Il medico, **subito**"},
  {t:"**ECG** a 12 derivazioni"}, {t:"Accesso e prelievi sul braccio **destro**"},
  {no:true, t:"**Mai** sul braccio con la fistola: è l'accesso vitale del paziente"}]},
{id:"s12", tipo:"icone", tema:"chiaro", sopratitolo:"Senza aspettare il laboratorio", voci:[
  {icona:"provetta", t:"Potassio con l'emogas", d:"in pochi minuti", key:true},
  {icona:"letto", t:"Semiseduto", d:"ossigeno secondo protocollo"},
  {icona:"siringa", t:"Farmaci d'urgenza", d:"pronti, secondo prescrizione"},
  {icona:"telefono", t:"Avvisare la dialisi", d:"il trattamento definitivo"}]},

{id:"s13", tipo:"cifre", tema:"chiaro", sopratitolo:"L'emogas conferma · e l'ECG cambia in modo progressivo", voci:[
  {n:"7,4", suf:"mEq/L", t:"potassio all'emogas", d:"campione **non emolizzato**", key:true}]},
{id:"s14", sopratitolo:"Le alterazioni dell'ECG, in ordine", ...ECG([0,1,2,3,4], 0)},
{id:"s15", sopratitolo:"Il signor Sergio: T appuntite, PR lungo, QRS che inizia ad allargarsi · un ECG normale non esclude un'iperkaliemia grave", ...ECG([0,1,2], 2)},

{id:"s16", sopratitolo:"I farmaci d'urgenza, secondo prescrizione · tre meccanismi da saper spiegare", ...FARMACI([0], 0)},
{id:"s17", tipo:"trappola", tema:"chiaro", sopratitolo:"Il calcio", righe:[
  {sb:"«Il calcio abbassa il potassio»", ok:"**Non** lo abbassa: protezione **temporanea** · cautela nei pazienti in **digossina**"}]},
{id:"s18", sopratitolo:"Due: spostare il potassio dentro le cellule · anche questo è temporaneo", ...FARMACI([0,1], 1)},
{id:"s19", sopratitolo:"Tre: eliminarlo · l'unico dei tre che lo porta fuori dal corpo", ...FARMACI([0,1,2], 2)},

{id:"s20", tipo:"griglia", tema:"chiaro", colonne:1, sopratitolo:"La sorveglianza durante la terapia", celle:[
  {t:"**ECG** continuo"}, {t:"**Potassio** ripetuto secondo prescrizione"},
  {t:"**Glicemia** dopo insulina e glucosio: ipoglicemia anche **ore dopo**", key:true}]},
{id:"s21", tipo:"icone", tema:"chiaro", sopratitolo:"Il rischio di ipoglicemia, il calcio, il salbutamolo", voci:[
  {icona:"rene", t:"Nefropatico: rischio maggiore", d:"elimina l'insulina più lentamente · caso 15.8", key:true},
  {icona:"flebo", t:"Calcio EV", d:"velocità e sede: lo stravaso danneggia i tessuti"},
  {icona:"aerosol", t:"Salbutamolo", d:"tachicardia, tremori"}]},

{id:"s22", tipo:"griglia", tema:"chiaro", colonne:1, sopratitolo:"Il sovraccarico di liquidi", celle:[
  {t:"Posizione semiseduta, **ossigeno** con un target"},
  {no:true, t:"**Diuretici**: nell'anurico poco o per nulla efficaci"},
  {t:"I liquidi in eccesso si rimuovono con la **dialisi**: l'ultrafiltrazione", key:true}]},
{id:"s23", tipo:"confronto", tema:"chiaro", sopratitolo:"Ricordi il caso 15.6?", col:[
  {h:"Nel caso 15.6", t:"la furosemide **funzionava**"},
  {h:"Qui", t:"il rene non risponde: la soluzione è la **dialisi**"}],
  sotto:"Nel frattempo: restrizione dei liquidi, bilancio e peso, segni di edema polmonare"},

{id:"s24", sopratitolo:"La fistola, ancora una volta · si controllano fremito e soffio · si segnala al letto", ...FISTOLA([0,1,2], "Niente su questo braccio")},
{id:"s25", tipo:"griglia", tema:"chiaro", colonne:2, sopratitolo:"Dopo la dialisi", celle:[
  {t:"**Sanguinamento** dai punti di puntura"}, {t:"**Ipotensione**"},
  {t:"**Peso** rispetto al peso secco"},
  {t:"Catetere per dialisi: il lock si **aspira**, mai si spinge · lezione 8.4", key:true}]},

{id:"s26", tipo:"figura", tema:"chiaro", illu:"ascolto", sopratitolo:"La domanda che cambia il caso",
  titolo:"**Perché** ha saltato la seduta?", sotto:"Senza giudicare: «che cosa le ha impedito di venire venerdì?»"},
{id:"s27", tipo:"raggiera", tema:"chiaro", sopratitolo:"Le cause possono essere molto diverse · difficoltà familiari o economiche · la volontà di sospendere il trattamento", centro:"Perché?", raggi:[
  {t:"Trasporto", key:true}, {t:"Stanchezza"}, {t:"Depressione"}, {t:"Famiglia"}, {t:"Economia"}, {t:"Sospendere"}]},
{id:"s28", tipo:"griglia", tema:"chiaro", colonne:2, sopratitolo:"La risposta orienta l'intervento", celle:[
  {t:"Un servizio di **trasporto**"}, {t:"Un supporto **psicologico**"},
  {t:"L'**assistente sociale**"}, {t:"Un colloquio sulle **scelte di cura**", key:true}]},
{id:"s29", tipo:"norma", tema:"chiaro", etichetta:"Legge · lezione 1.6", sigla:"219/2017",
  testo:"Il diritto di rifiutare la dialisi esiste: ma la scelta va **informata** e accompagnata, non lasciata a un problema pratico irrisolto."},

{id:"s30", tipo:"colonne", tema:"chiaro", sopratitolo:"Approfondimento pratico · il potassio nel piatto", colonne:[
  {h:"Frutta", voci:[{t:"Banane"}, {t:"Kiwi"}, {t:"Agrumi"}, {t:"Frutta secca"}]},
  {h:"Verdura", voci:[{t:"Patate"}, {t:"Pomodori"}, {t:"Legumi"}, {t:"Verdure a foglia"}]},
  {h:"E poi", voci:[{t:"Cioccolato"}, {t:"Succhi"}]}]},
{id:"s31", tipo:"catena", tema:"chiaro", sopratitolo:"Per ridurlo · e un'attenzione che pochi conoscono: i sostituti del sale «iposodici»", passi:[
  {t:"Verdure **tagliate**"}, {t:"In **ammollo**"}, {t:"**Bollite**", d:"in abbondante acqua"}, {t:"Acqua da **eliminare**", key:true}]},
{id:"s32", tipo:"griglia", tema:"chiaro", colonne:2, sopratitolo:"Per un dializzato, pericolosi · anche alcuni farmaci aumentano il potassio", celle:[
  {no:true, t:"**Sostituti del sale**: spesso cloruro di potassio", key:true}, {no:true, t:"ACE-inibitori, sartani"},
  {no:true, t:"Diuretici **risparmiatori** di potassio"}, {no:true, t:"**FANS**"},
  {t:"Il piano alimentare si costruisce con il **dietista**"}]},

{id:"s33", sopratitolo:"L'educazione", ...EDUCAZIONE([0,1])},
{id:"s34", sopratitolo:"L'educazione · liquidi e segni d'allarme", ...EDUCAZIONE([0,1,2,3])},
{id:"s35", sopratitolo:"L'educazione · la fistola e i farmaci", ...EDUCAZIONE([0,1,2,3,4,5])},

{id:"s36", tipo:"tabella", tema:"chiaro", sopratitolo:"Gli errori da evitare · in pronto soccorso", colonne:["58%","42%"],
  intestazioni:["Errore", "Invece"], righe:[
  ["no:Pungere o misurare la pressione sul braccio della fistola", "il braccio **destro**"],
  ["no:Aspettare il laboratorio senza monitor", "**monitor** ed emogas"],
  ["no:«Il calcio abbassa il potassio»", "**protegge** il cuore"]], chiave:[2]},
{id:"s37", tipo:"tabella", tema:"chiaro", sopratitolo:"Gli errori da evitare · dopo", colonne:["58%","42%"],
  intestazioni:["Errore", "Invece"], righe:[
  ["no:Dimenticare la glicemia dopo insulina e glucosio", "ipoglicemia anche **ore dopo**"],
  ["no:Contare sui diuretici in un anurico", "la **dialisi**"],
  ["no:Non chiedere perché ha saltato la seduta", "una domanda **non giudicante**"]], chiave:[0]},

{id:"s38", sopratitolo:"D1 · «Quali alterazioni dell'ECG compaiono nell'iperkaliemia?»", ...ECG([0,1,2,3,4], 4)},
{id:"s39", tipo:"tre", tema:"chiaro", sopratitolo:"D2 · «Come agiscono calcio, insulina con glucosio e dialisi?»", box:[
  {n:"Calcio", t:"Stabilizza la membrana del miocardio", d:"non abbassa il potassio"},
  {n:"Insulina + glucosio · salbutamolo", t:"Spostano il potassio nelle cellule"},
  {n:"Dialisi", t:"Lo elimina, definitivamente", key:true}]},
{id:"s40", sopratitolo:"D3 · «Che cosa non si fa sul braccio con la fistola?»", ...FISTOLA([0,1,2], "Mai")},
{id:"s41", sopratitolo:"D3 · l'elenco della lezione 8.4 · e ogni giorno si controllano fremito e soffio", ...FISTOLA([0,1,2,3,4], "Mai")},

{id:"s42", sopratitolo:"La risposta modello, in 15 righe", ...RISPOSTA([0,1])},
{id:"s43", sopratitolo:"La risposta modello · le prime azioni", ...RISPOSTA([0,1,2])},
{id:"s44", sopratitolo:"La risposta modello · la terapia e la sorveglianza", ...RISPOSTA([0,1,2,3])},
{id:"s45", sopratitolo:"La risposta modello · il sovraccarico, la fistola, la persona", ...RISPOSTA([0,1,2,3,4,5])},

{id:"s46", tipo:"tre", tema:"chiaro", sopratitolo:"I collegamenti", box:[
  {n:"3.5", t:"Potassio ed emolisi"}, {n:"6.1", t:"Patrimonio venoso"},
  {n:"8.4", t:"Dialisi e fistola", key:true}, {n:"14.4", t:"Il rene"}]},
{id:"s47", tipo:"tre", tema:"chiaro", sopratitolo:"I collegamenti", box:[
  {n:"14.7", t:"Valori di laboratorio"}, {n:"3.5", t:"ECG del potassio"},
  {n:"1.6", t:"Legge 219/2017", d:"consenso e rifiuto delle cure", key:true}]},

{id:"s48", tipo:"titolo", tema:"profondo",
  titolo:"Il calcio protegge il cuore,<br>ma il potassio resta:<br>solo la **dialisi** lo porta via.",
  sotto:"La frase del caso."},

{id:"s49", tipo:"tre", tema:"chiaro", sopratitolo:"Nella prossima lezione · una paziente in Medicina", box:[
  {n:"1", t:"Dispnea improvvisa", d:"al primo tentativo di alzarsi"},
  {n:"2", t:"Una trombosi", d:"che nessuno aveva cercato", key:true},
  {n:"3", t:"Una profilassi", d:"che nessuno aveva prescritto"}]},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione · 16.4",
  titolo:"L'embolia polmonare<br>in Medicina", sottotitolo:"Una trombosi che nessuno aveva cercato",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
