// Contenuto delle 50 scene della lezione 5.6 — antibiotici, analgesici e
// stupefacenti. Quattro corpi nuovi: le curve tempo-dipendenti e
// concentrazione-dipendenti con la soglia efficace (mic), la linea del tempo
// in cui la sedazione sale prima che il respiro cali (respiro), le due curve
// di oppioide e naloxone con la finestra in cui la persona torna a sedarsi
// (antidoto), e la pagina del registro di carico e scarico che si compila
// riga per riga, con il timbro della vidimazione e la correzione con riga e
// firma (registro).

const CLASSI = [
 {h:"Aminoglicosidi", voci:[{t:"Gentamicina, amikacina"}, {t:"**Nefrotossicità**, **ototossicità**", key:true}, {t:"Monitoraggio dei livelli"}]},
 {h:"Vancomicina", key:true, voci:[{t:"Nefrotossicità, livelli"}, {t:"**Sindrome dell'uomo rosso** se infusa troppo in fretta", key:true}, {t:"Non è allergia: infusione lenta, ≥ 1 ora"}]},
 {h:"Gli altri", voci:[{t:"**Fluorochinoloni**: tendinopatie, QT lungo"}, {t:"**Macrolidi**: QT, interazioni"}, {t:"**Metronidazolo**: effetto antabuse con l'alcol"}]},
];
const FANS = [
 {n:"1", t:"**Gastrolesività**: gastroprotezione nei soggetti a rischio", key:true}, {n:"2", t:"**Nefrotossicità**, soprattutto nel disidratato"},
 {n:"3", t:"**Ritenzione idrica**: peggiora lo scompenso"}, {n:"4", t:"**Sanguinamento**: pericoloso nell'anticoagulato"},
 {n:"5", t:"Rischio cardiovascolare"}, {n:"6", t:"Nell'anziano, **molta cautela**"},
];
const PARACET = [
 {n:"4 g", t:"al giorno: la dose massima indicativa nell'adulto", key:true}, {n:"↓", t:"**Ridurre** in epatopatia, alcolismo, peso sotto i 50 kg"},
 {n:"EV", t:"Sotto i 50 kg la dose si calcola **sul peso**"}, {n:"!", t:"Tossicità **epatica**"},
];
const EFFETTI = [
 {n:"1", t:"**Sedazione**", key:true}, {n:"2", t:"**Depressione respiratoria**", key:true}, {n:"3", t:"**Stipsi**: non si sviluppa tolleranza"},
 {n:"4", t:"Nausea"}, {n:"5", t:"Prurito"}, {n:"6", t:"**Ritenzione urinaria**"}, {n:"7", t:"**Miosi**: pupille puntiformi"},
];
const CHIAVI = [
 {t:"**Passaggio esplicito** delle chiavi alla consegna", key:true}, {t:"In molti reparti, **verifica della giacenza** al cambio turno"},
 {t:"Scaduti **separati** e identificati"}, {t:"Restituiti alla farmacia secondo procedura: **non si buttano**"},
];
const STUPEF = [
 {t:"**DPR 309/1990**"}, {t:"Registro **vidimato**, a pagine numerate"}, {t:"Registrazione **contestuale**", key:true},
 {t:"Armadio **chiuso a chiave**"}, {t:"**Corrispondenza** fra giacenza contabile e reale"}, {t:"Registro conservato **2 anni**"},
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 5 · Farmacologia e gestione sicura della terapia",
  titolo:"Antibiotici, analgesici<br>e stupefacenti", sottotitolo:"5.6 · Dalla somministrazione alla normativa del registro",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"frase", tema:"chiaro", sopratitolo:"Micro-lezione 6 di 8 · tre famiglie di farmaci",
  testo:"La terza porta con sé una **normativa** che i concorsi chiedono con precisione: gli stupefacenti in reparto."},
{id:"s03", tipo:"figura", tema:"chiaro", sopratitolo:"Si parte dagli antibiotici", illu:"microbo",
  titolo:"Dal punto di vista della **somministrazione**.",
  sotto:"L'antibiotico-resistenza l'abbiamo vista nella lezione 4.6."},

{id:"s04", tipo:"mic", tema:"chiaro", sopratitolo:"Perché l'orario conta · i tempo-dipendenti: beta-lattamici (penicilline, cefalosporine, carbapenemi)", attive:[0]},
{id:"s05", tipo:"mic", tema:"chiaro", sopratitolo:"Rispettare gli intervalli, talvolta infusione prolungata · i concentrazione-dipendenti: dose unica giornaliera"},

{id:"s06", tipo:"colonne", tema:"chiaro", sopratitolo:"Le classi · ciò che l'infermiere sorveglia", attive:[0], colonne:CLASSI},
{id:"s07", tipo:"colonne", tema:"chiaro", sopratitolo:"La vancomicina · arrossamento di viso e tronco, prurito, ipotensione se l'infusione è troppo rapida", attive:[0,1], colonne:CLASSI},
{id:"s08", tipo:"colonne", tema:"chiaro", sopratitolo:"Non è un'allergia: si previene rallentando · fluorochinoloni, macrolidi, metronidazolo", colonne:CLASSI},

{id:"s09", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"L'allergia · prima della prima dose di qualunque antibiotico", celle:[
  {n:"1", t:"Chiedere **sempre** delle allergie, e **registrare** la risposta in modo evidente", key:true},
  {n:"2", t:"Dopo la prima dose, **osservare** la persona"}]},
{id:"s10", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"I segni dell'anafilassi · il farmaco di primo intervento è l'adrenalina intramuscolare", celle:[
  {n:"1", t:"**Orticaria**"}, {n:"2", t:"**Angioedema**"}, {n:"3", t:"**Broncospasmo**"}, {n:"4", t:"**Ipotensione**"},
  {n:"→", t:"**Adrenalina intramuscolo**: non endovena, non sottocute", key:true}]},
{id:"s11", tipo:"cifre", tema:"chiaro", sopratitolo:"L'adrenalina nell'adulto · faccia anterolaterale della coscia; lo riprenderemo nel modulo 10", voci:[
  {n:"0,5 mg", d:"intramuscolo", key:true}, {n:"0,5 ml", d:"della fiala da 1 mg/ml"}, {n:"5 min", d:"ripetibile dopo"}]},

{id:"s12", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Gli analgesici · il paracetamolo, il più usato", celle:PARACET},
{id:"s13", tipo:"trappola", tema:"chiaro", sopratitolo:"Una trappola frequente", righe:[
  {sb:"Contare solo il paracetamolo prescritto", ok:"Molti farmaci da banco e molte associazioni **lo contengono**: la dose giornaliera si somma"}]},
{id:"s14", tipo:"frase", tema:"chiaro", sopratitolo:"Senza che nessuno se ne accorga",
  testo:"Nella ricognizione della terapia, **va chiesto**."},

{id:"s15", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, attive:[0,1], sopratitolo:"I FANS · efficaci, ma con molti effetti avversi", celle:FANS},
{id:"s16", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"I FANS · scompenso, anticoagulato, anziano", celle:FANS},

{id:"s17", tipo:"confronto", tema:"chiaro", sopratitolo:"Gli oppioidi", col:[
  {h:"Deboli", t:"Codeina, **tramadolo** (anche serotoninergico: abbassa la soglia convulsiva)"},
  {h:"Forti", t:"**Morfina**, ossicodone, **fentanil**, idromorfone, metadone", key:true}]},
{id:"s18", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Gli effetti avversi da conoscere", celle:EFFETTI},

{id:"s19", tipo:"respiro", tema:"chiaro", sopratitolo:"La depressione respiratoria · il principio della PCA (lezione 3.7): la sedazione compare prima"},
{id:"s20", tipo:"titolo", tema:"profondo",
  titolo:"La **sedazione** compare prima.",
  sotto:"Una persona sempre più sonnolenta rallenterà il respiro: livello di sedazione, frequenza respiratoria, saturazione."},
{id:"s21", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Chi è più a rischio", celle:[
  {n:"1", t:"**Anziano**"}, {n:"2", t:"**Prima dose**"}, {n:"3", t:"**Insufficienza renale**"}, {n:"4", t:"**Benzodiazepine** o altri sedativi associati", key:true}]},

{id:"s22", tipo:"antidoto", tema:"chiaro", sopratitolo:"Il naloxone · antagonista dei recettori degli oppioidi; emivita breve, spesso più breve dell'oppioide"},
{id:"s23", tipo:"frase", tema:"chiaro", sopratitolo:"Dopo il risveglio",
  testo:"La persona può **tornare a sedarsi**: la sorveglianza prosegue, e possono servire dosi ripetute."},
{id:"s24", tipo:"figura", tema:"chiaro", sopratitolo:"Nel paziente con dolore", illu:"siringa", lato:"dx",
  titolo:"Si **titola**: piccole dosi.",
  sotto:"Ripristinare il respiro senza annullare del tutto l'analgesia e scatenare un dolore violento."},

{id:"s25", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"Tre concetti clinici", celle:[
  {n:"1", t:"**Titolazione**: la dose sale progressivamente fino al controllo del dolore", key:true},
  {n:"2", t:"**Dose di soccorso**: per il dolore episodico intenso, accanto alla terapia di base"}]},
{id:"s26", tipo:"cifre", tema:"chiaro", sopratitolo:"Le conversioni · la morfina orale è meno biodisponibile: il primo passaggio della lezione 5.1", voci:[
  {n:"2–3 : 1", d:"morfina orale : endovenosa", key:true}, {n:"tabelle", d:"di conversione, su prescrizione, per cambiare via o oppioide"}]},

{id:"s27", tipo:"figura", tema:"chiaro", sopratitolo:"La normativa", illu:"libro",
  titolo:"**DPR 309/1990**, il Testo unico sugli stupefacenti.",
  sotto:"Classifica le sostanze in tabelle; disciplina prescrizione, detenzione e registrazione."},
{id:"s28", tipo:"cifre", tema:"chiaro", sopratitolo:"La normativa · i due riferimenti", voci:[
  {n:"309", suf:"/1990", d:"DPR, Testo unico sugli stupefacenti"}, {n:"38", suf:"/2010", d:"legge sulla terapia del dolore: semplificazioni per gli oppioidi", key:true}]},

{id:"s29", tipo:"registro", tema:"chiaro", sopratitolo:"Il registro di carico e scarico · pagine numerate, vidimato dal Direttore Sanitario, una sezione per farmaco"},
{id:"s30", tipo:"registro", tema:"chiaro", sopratitolo:"Ogni carico (fornitura dalla farmacia) e ogni scarico (somministrazione): data, paziente, quantità, firma", evidenzia:2, timbro:false},
{id:"s31", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"Chi lo tiene, chi ne risponde, quanto si conserva", celle:[
  {n:"1", t:"Tenuto dal **responsabile dell'assistenza infermieristica**"},
  {n:"2", t:"Il **direttore dell'unità operativa** risponde della corrispondenza fra giacenza contabile e reale", key:true},
  {n:"3", t:"Si conserva **2 anni** dall'ultima registrazione"}]},

{id:"s32", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"Le regole di compilazione · la lezione 2.4, con ancora più rigore", celle:[
  {n:"1", t:"Registrazione **contestuale** alla somministrazione", key:true},
  {n:"2", t:"**Niente correttore** né cancellature: una riga e una firma"}]},
{id:"s33", tipo:"registro", tema:"chiaro", sopratitolo:"La giacenza verificabile in ogni momento · ogni discrepanza va spiegata", correzione:3, timbro:false},
{id:"s34", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Residui, rotture, smarrimenti", celle:[
  {n:"1", t:"Parte di fiala: il **residuo** si smaltisce e si **documenta** secondo procedura", key:true}, {n:"2", t:"Spesso alla presenza di un **testimone**"},
  {n:"3", t:"**Rotture** e **smarrimenti**: annotati e segnalati"}]},

{id:"s35", tipo:"figura", tema:"chiaro", sopratitolo:"La custodia", illu:"armadio",
  titolo:"Armadio o cassaforte dedicata, **chiusa a chiave**.",
  sotto:"Le chiavi sono custodite dall'infermiere responsabile del turno."},
{id:"s36", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Le chiavi e gli scaduti", celle:CHIAVI},

{id:"s37", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"La responsabilità · un errore di registrazione non è un errore formale", celle:[
  {n:"!", t:"Una **discrepanza** fra giacenza contabile e reale ha rilevanza **disciplinare**, e può averne una **penale**", key:true},
  {n:"2", t:"Chi **firma** lo scarico attesta di aver somministrato quella quantità a quel paziente"}]},
{id:"s38", tipo:"titolo", tema:"profondo",
  titolo:"**Mai firmare** per un collega.",
  sotto:"Come in tutta la documentazione."},

{id:"s39", tipo:"confronto", tema:"chiaro", sopratitolo:"Il dolore nella persona con storia di dipendenza · ha diritto a un trattamento efficace come chiunque", col:[
  {h:"Tolleranza", t:"Possono servire **dosi più alte**"},
  {h:"Pseudodipendenza", t:"Richieste frequenti di analgesico: un **dolore non controllato**, più che la ricerca della sostanza", key:true}]},
{id:"s40", tipo:"frase", tema:"chiaro", sopratitolo:"Un aspetto etico che all'orale distingue",
  testo:"Il pregiudizio porta al **sottotrattamento**, anch'esso un errore."},

{id:"s41", tipo:"respiro", tema:"chiaro", sopratitolo:"Il caso · anziano in morfina, da un'ora sempre più sonnolento, FR 9, SpO₂ 90%: depressione respiratoria da oppioide", caso:true},
{id:"s42", tipo:"percorso", tema:"chiaro", sopratitolo:"Che cosa fai", tappe:[
  {t:"Stimolare", d:"e valutare la risposta"}, {t:"Sospendere", d:"infusione o PCA"}, {t:"Ossigeno", d:"secondo protocollo"}, {t:"Medico", d:"subito, con SBAR"}, {t:"Naloxone", d:"pronto", key:true}]},
{id:"s43", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"E dopo la risposta", celle:[
  {n:"1", t:"**Sorvegliare a lungo**: il naloxone dura meno della morfina", key:true},
  {n:"2", t:"Documentare; cercare i fattori predisponenti: **funzione renale**, **benzodiazepine** associate"}]},

{id:"s44", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"In Veneto", celle:[
  {n:"1", t:"**Procedure aziendali** per gli stupefacenti, che recepiscono il DPR 309", key:true},
  {n:"2", t:"In alcune realtà, **armadi informatizzati** che tracciano ogni prelievo"}]},
{id:"s45", tipo:"catena", tema:"chiaro", sopratitolo:"La rete regionale di terapia del dolore e cure palliative attua la legge 38 · all'orale, in quest'ordine", passi:[
  {t:"Normativa"}, {t:"Registro", key:true}, {t:"Custodia"}, {t:"Responsabilità"}]},

{id:"s46", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"La sintesi in una slide", celle:[
  {t:"**Beta-lattamici**: intervalli rispettati"}, {t:"**Aminoglicosidi e vancomicina**: livelli e reni"},
  {t:"**Vancomicina lenta**"}, {t:"**Anafilassi**: adrenalina intramuscolo, 0,5 mg", key:true}]},
{id:"s47", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"La sintesi in una slide", celle:[
  {t:"**Paracetamolo** max 4 g, meno se il fegato è fragile"}, {t:"**FANS**: stomaco, reni, sanguinamento"},
  {t:"**Oppioidi**: la sedazione precede la depressione respiratoria", key:true}, {t:"Il **naloxone dura meno**"}]},

{id:"s48", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"E per gli stupefacenti", celle:STUPEF},
{id:"s49", tipo:"frase", tema:"chiaro", sopratitolo:"Nella prossima lezione",
  testo:"Preparazione, stabilità e conservazione dei farmaci, fino agli **antiblastici** e al **carrello delle emergenze**."},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione",
  titolo:"5.7<br>Preparazione, stabilità<br>e gestione in reparto", sottotitolo:"Dalla scheda tecnica al carrello delle emergenze",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
