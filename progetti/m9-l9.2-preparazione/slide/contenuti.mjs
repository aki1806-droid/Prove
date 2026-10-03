// Contenuto delle 50 scene della lezione 9.2 — la preparazione
// all'intervento. Nessun corpo nuovo: i numeri del digiuno sono quattro
// cifre, le abitudini rovesciate sono trappole, la terapia domiciliare un
// confronto sospende/continua, l'ansia una catena, il giorno dell'intervento
// griglie con la spunta.

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 9 · Assistenza perioperatoria",
  titolo:"La preparazione<br>all'intervento", sottotitolo:"9.2 · Digiuno, tricotomia, profilassi, terapia, consenso",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"frase", tema:"chiaro", sopratitolo:"Micro-lezione 2 di 8",
  testo:"Passaggi che sembrano di **routine**, e che invece determinano la sicurezza in sala e l'andamento del post-operatorio."},
{id:"s03", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"I concorsi chiedono numeri precisi · e alcune vecchie abitudini sono state rovesciate dalle evidenze", celle:[
  {n:"h", t:"Le **ore di digiuno**", key:true}, {n:"min", t:"I **tempi della profilassi**"}]},

{id:"s04", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"L'accertamento · la ricognizione della terapia: lezione 5.4", celle:[
  {t:"Anamnesi, **allergie**: farmaci, lattice, cerotti, disinfettanti", key:true}, {t:"**Terapia domiciliare**"}, {t:"Parametri, **peso** e altezza: per farmaci e liquidi"}]},
{id:"s05", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"L'accertamento · un paziente malnutrito ha più complicanze e guarisce peggio", celle:[
  {t:"Esami secondo indicazione: emocromo, coagulazione, ECG, gruppo"}, {t:"Rischio di **caduta**"}, {t:"Rischio di **lesioni da pressione**"}, {t:"Stato **nutrizionale**", key:true}]},
{id:"s06", tipo:"scala", tema:"chiaro", sopratitolo:"La valutazione dell'anestesista · la scala ASA", gradini:[
  {n:"I", t:"Persona sana"}, {n:"II", t:"Malattia sistemica lieve"}, {n:"III", t:"Malattia sistemica grave"}, {n:"IV", t:"Malattia grave, minaccia costante per la vita", key:true}]},

{id:"s07", tipo:"cifre", tema:"chiaro", sopratitolo:"Il digiuno · i numeri da sapere · solidi: di più dopo un pasto grasso", voci:[
  {n:"6", suf:"ore", d:"solidi"}, {n:"2", suf:"ore", d:"liquidi chiari: acqua, tè, camomilla, bevande con carboidrati", key:true}]},
{id:"s08", tipo:"cifre", tema:"chiaro", sopratitolo:"Liquidi chiari: quelli attraverso cui si legge · il latte no, nello stomaco si comporta come un solido", voci:[
  {n:"4", suf:"ore", d:"latte materno", key:true}, {n:"6", suf:"ore", d:"latte artificiale"}]},
{id:"s09", tipo:"trappola", tema:"chiaro", sopratitolo:"Il vecchio digiuno dalla mezzanotte per tutti · si segue la prescrizione dell'anestesista e il protocollo", righe:[
  {sb:"«Digiuno dalla mezzanotte», per tutti", ok:"**Non è raccomandato**: più sete, ansia, disidratazione, insulino-resistenza, e non riduce il rischio di inalazione"}]},

{id:"s10", tipo:"trappola", tema:"chiaro", sopratitolo:"La tricotomia · solo se necessaria: se i peli interferiscono con l'intervento", righe:[
  {sb:"Il rasoio", ok:"Il **clipper** elettrico: il rasoio provoca **microlesioni** invisibili, subito colonizzate"}]},
{id:"s11", tipo:"griglia", tema:"chiaro", colonne:1, spunta:true, sopratitolo:"Quando e dove", celle:[
  {t:"Il **più vicino possibile** all'intervento: il giorno stesso", key:true}, {t:"**Fuori** dalla sala operatoria"}]},
{id:"s12", tipo:"frase", tema:"chiaro", sopratitolo:"Lo abbiamo visto nel bundle della lezione 7.4",
  testo:"Uno degli esempi più chiari di pratica tradizionale **smentita dalle evidenze**."},

{id:"s13", tipo:"griglia", tema:"chiaro", colonne:1, spunta:true, sopratitolo:"L'igiene preoperatoria · la sera prima o la mattina, secondo il protocollo", celle:[
  {t:"**Doccia** con sapone o antisettico", key:true}, {t:"Attenzione a **ombelico**, **pieghe** cutanee, sede dell'intervento"}]},
{id:"s14", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"L'igiene preoperatoria · il piercing: rischio di ustioni con l'elettrobisturi", celle:[
  {t:"Biancheria **pulita**"}, {t:"Igiene del **cavo orale**"}, {t:"Via **smalto**, gioielli, **piercing**, trucco", key:true}]},
{id:"s15", tipo:"frase", tema:"chiaro", sopratitolo:"Lo smalto e le unghie finte si tolgono almeno da un dito · i limiti del saturimetro: lezione 8.2",
  testo:"Il saturimetro legge **attraverso l'unghia**."},

{id:"s16", tipo:"cifre", tema:"chiaro", sopratitolo:"La profilassi antibiotica · il farmaco deve essere nei tessuti nel momento in cui si apre la cute", voci:[
  {n:"60", suf:"minuti", d:"prima dell'incisione", key:true}]},
{id:"s17", tipo:"cifre", tema:"chiaro", sopratitolo:"Per alcuni antibiotici, come la vancomicina, che si infonde lentamente", voci:[
  {n:"120", suf:"minuti", d:"la finestra si allarga", key:true}]},
{id:"s18", tipo:"griglia", tema:"chiaro", colonne:1, spunta:true, sopratitolo:"La dose · la stewardship della lezione 4.6", celle:[
  {t:"**Dose singola**, da ripetere se l'intervento si prolunga o la perdita di sangue è importante", key:true}, {t:"**Non oltre le 24 ore** senza indicazione"}]},

{id:"s19", tipo:"griglia", tema:"chiaro", colonne:1, spunta:true, sopratitolo:"La profilassi antitrombotica · si valuta il rischio trombotico, insieme a quello emorragico · meccanica", celle:[
  {t:"Calze a **compressione graduata**, compressione pneumatica intermittente"}, {t:"Soprattutto: **mobilizzazione precoce**", key:true}]},
{id:"s20", tipo:"trappola", tema:"chiaro", sopratitolo:"Le calze si misurano e si indossano bene · farmacologica: eparina a basso peso molecolare secondo prescrizione", righe:[
  {sb:"Una calza arrotolata sotto il ginocchio", ok:"Stringe **come un laccio**: fa il contrario di quello che dovrebbe"}]},
{id:"s21", tipo:"frase", tema:"chiaro", sopratitolo:"Un dettaglio di sicurezza · anestesia spinale o peridurale: rischio di ematoma spinale",
  testo:"I tempi dell'eparina rispetto alla puntura e alla rimozione del catetere li definisce il **protocollo**."},

{id:"s22", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"La terapia domiciliare · si verifica con la lista dell'anestesista · che cosa si sospende", celle:[
  {n:"✗", t:"**Anticoagulanti**: warfarin e DOAC, con tempi definiti, a volte una terapia ponte", key:true}]},
{id:"s23", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"Che cosa si sospende · lezione 5.5", celle:[
  {n:"?", t:"**Antiaggreganti**: decisione specialistica, soprattutto con uno **stent**", key:true}]},
{id:"s24", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"Che cosa si sospende", celle:[
  {n:"✗", t:"**Metformina** e inibitori SGLT2, secondo protocollo"}, {n:"≈", t:"**Insulina**: si adatta; la basale nel tipo 1 **mai del tutto**", key:true}, {n:"✗", t:"**ACE-inibitori** e sartani: spesso omessi il giorno stesso"}]},
{id:"s25", tipo:"frase", tema:"chiaro", sopratitolo:"La ricognizione fa emergere i farmaci che il paziente non considera tali · integratori, erbe, antinfiammatori da banco",
  testo:"**Si chiede**, non si aspetta che lo dica."},

{id:"s26", tipo:"griglia", tema:"chiaro", colonne:1, spunta:true, sopratitolo:"Che cosa si continua", celle:[
  {t:"**Beta-bloccanti**: rischio di rimbalzo, con tachicardia e ischemia", key:true}, {t:"Tiroide, antiepilettici, **levodopa**: con un **sorso d'acqua**"}]},
{id:"s27", tipo:"griglia", tema:"chiaro", colonne:1, spunta:true, sopratitolo:"Che cosa si continua · la crisi surrenalica della lezione 8.3", celle:[
  {t:"**Corticosteroidi** cronici, a volte con una dose aggiuntiva", key:true}]},
{id:"s28", tipo:"frase", tema:"chiaro", sopratitolo:"Sempre secondo la prescrizione dell'anestesista",
  testo:"L'infermiere non decide: **verifica** che ci sia un'indicazione per ogni farmaco."},

{id:"s29", tipo:"confronto", tema:"chiaro", sopratitolo:"Il consenso informato · lezione 1.6", col:[
  {h:"Lo acquisisce il medico", t:"il **chirurgo** per l'intervento, l'**anestesista** per l'anestesia"}, {h:"L'infermiere verifica", t:"che sia **presente, completo e firmato**", key:true}]},
{id:"s30", tipo:"trappola", tema:"chiaro", sopratitolo:"Se la persona esprime dubbi, o dice di non aver capito · revocabile fino all'ultimo momento", righe:[
  {sb:"Rispondere al posto del medico", ok:"**Informare il medico**, prima dell'intervento"}]},

{id:"s31", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Il giorno dell'intervento", celle:[
  {t:"**Identificazione** e **braccialetto**", key:true}, {t:"Verifica del **digiuno**"}, {t:"Via protesi dentarie mobili, **lenti a contatto**, gioielli"}]},
{id:"s32", tipo:"trappola", tema:"chiaro", sopratitolo:"Il braccialetto si controlla con la domanda aperta · la Raccomandazione 3 della lezione precedente", righe:[
  {sb:"«Lei è il signor Rossi?»", ok:"**Come si chiama? Quando è nato?**"}]},
{id:"s33", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Il giorno dell'intervento · apparecchi acustici e occhiali spesso fino in sala, per comunicare", celle:[
  {t:"**Minzione** prima del trasferimento"}, {t:"**Parametri**"}, {t:"**Marcatura** del sito presente", key:true}]},
{id:"s34", tipo:"griglia", tema:"chiaro", colonne:1, spunta:true, sopratitolo:"Il giorno dell'intervento · dopo una premedicazione sedativa la persona non si alza da sola", celle:[
  {t:"**Premedicazione** secondo prescrizione"}, {t:"**Check-list di reparto** e documentazione completa: consenso, esami, immagini", key:true}]},

{id:"s35", tipo:"catena", tema:"chiaro", sopratitolo:"L'ansia · non è solo un disagio", passi:[
  {t:"Ansia preoperatoria elevata", key:true}, {t:"Più dolore"}, {t:"Più analgesici"}, {t:"Più nausea"}]},
{id:"s36", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Lo strumento più efficace: l'informazione strutturata", celle:[
  {t:"Che cosa **succederà**"}, {t:"Come si sentirà al **risveglio**"}, {t:"Come sarà gestito il **dolore**", key:true}, {t:"Quando potrà **mangiare** e **alzarsi**"}]},
{id:"s37", tipo:"frase", tema:"chiaro", sopratitolo:"Poi accoglienza, ascolto, presenza dei familiari secondo possibilità",
  testo:"Una persona informata **collabora meglio**, anche nella mobilizzazione precoce dell'ERAS."},

{id:"s38", tipo:"griglia", tema:"chiaro", colonne:1, spunta:true, sopratitolo:"L'educazione preoperatoria prepara il post-operatorio", celle:[
  {t:"**Respirazione profonda** e **spirometro incentivante**", key:true}, {t:"**Tosse** efficace, sostenendo la ferita con un cuscino"}]},
{id:"s39", tipo:"cifre", tema:"chiaro", sopratitolo:"Lo spirometro si prova prima · tenendo l'indicatore sollevato qualche secondo", voci:[
  {n:"10", suf:"respiri", d:"profondi ogni ora, da svegli", key:true}]},
{id:"s40", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"L'educazione preoperatoria", celle:[
  {t:"**Esercizi delle gambe**"}, {t:"Alzarsi **girandosi sul fianco**", key:true}, {t:"La **scala del dolore** e, se prevista, la **PCA**"}, {t:"Abbandono del **fumo**"}]},
{id:"s41", tipo:"titolo", tema:"profondo",
  titolo:"Imparare prima è molto più facile<br>che imparare **con il dolore**.",
  sotto:""},

{id:"s42", tipo:"frase", tema:"chiaro", sopratitolo:"Il caso · intervento alle 14",
  testo:"Alle 7 il paziente chiede un caffè, e nessuno gli ha detto nulla del digiuno. Che cosa fai?"},
{id:"s43", tipo:"confronto", tema:"chiaro", sopratitolo:"Verifichi la prescrizione dell'anestesista e il protocollo · se è consentito, liquidi chiari fino a 2 ore prima", col:[
  {h:"Caffè senza latte", t:"rientra spesso fra i **liquidi chiari**", key:true}, {h:"Cappuccino", t:"**no**"}]},
{id:"s44", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"Se non è consentito, spieghi il motivo", celle:[
  {n:"!", t:"In ogni caso **documenti l'orario dell'ultima assunzione**: un dato fondamentale per l'anestesista", key:true}]},

{id:"s45", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"In Veneto", celle:[
  {n:"1", t:"Il **prericovero**: esami, valutazione anestesiologica ed educazione prima dell'ingresso, degenza più breve", key:true}]},
{id:"s46", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"In Veneto", celle:[
  {n:"2", t:"**Protocolli aziendali** su digiuno, tricotomia, profilassi e terapia"}, {n:"3", t:"La **check-list preoperatoria** di reparto, fino al blocco operatorio", key:true}]},

{id:"s47", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"La tabella", celle:[
  {n:"6 h", t:"**Solidi**"}, {n:"2 h", t:"**Liquidi chiari**", key:true}, {n:"4 h", t:"Latte materno"}, {n:"6 h", t:"Latte artificiale"}]},
{id:"s48", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"La tabella", celle:[
  {n:"→", t:"**Tricotomia**: solo se necessaria, clipper, il giorno stesso"}, {n:"60", t:"**minuti**: la profilassi antibiotica", key:true}, {n:"→", t:"**Beta-bloccanti** continuati; antiaggreganti: decisione specialistica"}, {n:"→", t:"**Consenso**: lo acquisisce il medico, l'infermiere lo verifica"}]},
{id:"s49", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Nella prossima lezione · in sala operatoria", celle:[
  {n:"1", t:"I tipi di **anestesia**"}, {n:"2", t:"Il **posizionamento**", key:true}, {n:"3", t:"La **normotermia**"}, {n:"4", t:"La **conta**"}]},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione",
  titolo:"9.3<br>Anestesia e sorveglianza<br>intraoperatoria", sottotitolo:"In sala operatoria",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
