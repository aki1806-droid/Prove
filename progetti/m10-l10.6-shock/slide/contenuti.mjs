// Contenuto delle 50 scene della lezione 10.6 — shock e sepsi. I quattro
// tipi di shock sono una griglia che si accende tipo per tipo; il bundle
// della prima ora un percorso a cinque tappe; Sepsis Six un confronto
// «tre da dare, tre da prelevare»; il caso una fila di cifre.

const TIPI = (k) => [
  {n:"1", t:"**Ipovolemico** · manca il volume", key:k===0}, {n:"2", t:"**Cardiogeno** · il cuore non pompa", key:k===1},
  {n:"3", t:"**Distributivo** · i vasi si dilatano", key:k===2}, {n:"4", t:"**Ostruttivo** · il flusso è ostacolato", key:k===3}];

const BUNDLE = [
  {t:"Lattati", d:"ripetuti se alti"}, {t:"Emocolture", d:"prima dell'antibiotico"}, {t:"Antibiotico", d:"ampio spettro"},
  {t:"Liquidi", d:"30 ml/kg"}, {t:"Vasopressori", d:"PAM ≥ 65"}];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 10 · Emergenza e area critica",
  titolo:"Shock e sepsi", sottotitolo:"10.6 · I quattro tipi di shock, i segni, la sepsi, il bundle della prima ora",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"catena", tema:"chiaro", sopratitolo:"Micro-lezione 6 di 8 · cause diverse, una conseguenza comune", passi:[
  {t:"I tessuti non ricevono abbastanza ossigeno", key:true}, {t:"Non viene corretto"}, {t:"Gli organi cedono uno dopo l'altro"}]},
{id:"s03", tipo:"frase", tema:"chiaro", sopratitolo:"La causa più frequente di shock in ospedale",
  testo:"La **sepsi**: all'inizio può sembrare **poca cosa**."},
{id:"s04", tipo:"frase", tema:"chiaro", sopratitolo:"I tipi di shock, i segni, la sepsi dal riconoscimento alla prima ora",
  testo:"**Ogni ora** di ritardo nel trattamento aumenta la mortalità."},

{id:"s05", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Ipovolemico · emorragia, disidratazione grave, ustioni estese", celle:TIPI(0)},
{id:"s06", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Cardiogeno · infarto esteso, aritmie: il volume c'è, la pompa no", celle:TIPI(1)},
{id:"s07", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Distributivo · settico, anafilattico, neurogeno da lesione del midollo", celle:TIPI(2)},
{id:"s08", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Ostruttivo · embolia, tamponamento, pneumotorace iperteso: le 4 T della 10.3", celle:TIPI(3)},

{id:"s09", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"I segni dello shock", celle:[
  {t:"**Tachicardia**: precoce", key:true}, {t:"Tachipnea"}, {t:"Riempimento capillare **lento**"}, {t:"Cute **fredda, pallida, sudata**"}]},
{id:"s10", tipo:"trappola", tema:"chiaro", sopratitolo:"Poi oliguria e coscienza alterata, dall'agitazione alla confusione", righe:[
  {sb:"Cute calda: niente shock", ok:"Nel distributivo iniziale la cute può essere **calda e arrossata**"}]},
{id:"s11", tipo:"cifre", tema:"chiaro", sopratitolo:"L'ipotensione è tardiva · i lattati indicano sofferenza dei tessuti", voci:[
  {n:"< 90", suf:"", d:"sistolica, mmHg"}, {n:"< 65", suf:"", d:"pressione media"}, {n:"> 2", suf:"", d:"lattati, mmol/L", key:true}]},
{id:"s12", tipo:"cifre", tema:"chiaro", sopratitolo:"L'indice di shock · frequenza cardiaca diviso sistolica · anche con la pressione ancora normale", voci:[
  {n:"> 1", suf:"", d:"campanello d'allarme", key:true}]},

{id:"s13", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Il trattamento dipende dal tipo", celle:[
  {n:"1", t:"Ipovolemico: fermare la perdita · **liquidi** ed **emocomponenti**", key:true}, {n:"2", t:"Cardiogeno"}, {n:"3", t:"Distributivo"}, {n:"4", t:"Ostruttivo"}]},
{id:"s14", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Il trattamento dipende dal tipo", celle:[
  {n:"1", t:"Ipovolemico: liquidi ed emocomponenti"}, {n:"2", t:"Cardiogeno: liquidi **con cautela** · **inotropi**", key:true}, {n:"3", t:"Distributivo: liquidi e **vasopressori**", key:true}, {n:"4", t:"Ostruttivo"}]},
{id:"s15", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Decompressione, drenaggio del pericardio, trombolisi · anafilassi: adrenalina IM, lezione 5.6", celle:[
  {n:"1", t:"Ipovolemico: liquidi, emocomponenti"}, {n:"2", t:"Cardiogeno: cautela, inotropi"}, {n:"3", t:"Distributivo: vasopressori"}, {n:"4", t:"Ostruttivo: **rimuovere l'ostacolo**", key:true}]},

{id:"s16", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"L'assistenza in ogni shock · prelievi: emocromo, gruppo, coagulazione, lattati, emocolture", celle:[
  {t:"**ABCDE**"}, {t:"**Ossigeno**"}, {t:"**Due accessi** di grosso calibro", key:true}]},
{id:"s17", tipo:"frase", tema:"chiaro", sopratitolo:"Monitoraggio continuo · con il catetere",
  testo:"La **diuresi oraria** è un indicatore diretto della perfusione degli organi."},
{id:"s18", tipo:"trappola", tema:"chiaro", sopratitolo:"Supina, sollevamento passivo delle gambe se indicato · prevenire l'ipotermia · documentare i tempi", righe:[
  {sb:"Il Trendelenburg di routine", ok:"**Non è più raccomandato**"}]},

{id:"s19", tipo:"norma", tema:"chiaro", etichetta:"La sepsi · definizione internazionale attuale", sigla:"Sepsi",
  testo:"**Disfunzione d'organo** potenzialmente letale, da una **risposta disregolata** a un'infezione."},
{id:"s20", tipo:"catena", tema:"chiaro", sopratitolo:"Il punto è in quella parola: disregolata", passi:[
  {t:"Un'infezione"}, {t:"Una reazione eccessiva del corpo", key:true}, {t:"Danno ai propri organi: reni, polmoni, cervello"}]},
{id:"s21", tipo:"cifre", tema:"chiaro", sopratitolo:"Lo shock settico · vasopressori necessari, nonostante i liquidi", voci:[
  {n:"≥ 65", suf:"", d:"pressione media, con vasopressori", key:true}, {n:"> 2", suf:"", d:"lattati, mmol/L"}]},

{id:"s22", tipo:"confronto", tema:"chiaro", sopratitolo:"Il riconoscimento · dove l'infermiere conta di più", col:[
  {h:"Un'infezione", t:"nota o sospetta"}, {h:"+ disfunzione d'organo", t:"= si sospetta la **sepsi**", key:true}]},
{id:"s23", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Il qSOFA · oggi affiancato a strumenti più sensibili, come la NEWS2", celle:[
  {n:"1", t:"Frequenza respiratoria **≥ 22**"}, {n:"2", t:"Stato mentale **alterato**", key:true}, {n:"3", t:"Sistolica **≤ 100**"}]},
{id:"s24", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"I segni da cercare", celle:[
  {t:"**Confusione** nuova", key:true}, {t:"**Oliguria**"}, {t:"Desaturazione, tachicardia"}, {t:"Febbre, oppure **ipotermia**: gravità"}, {t:"Cute **marezzata**"}]},

{id:"s25", tipo:"percorso", tema:"chiaro", sopratitolo:"Il bundle della prima ora · da avviare entro un'ora · emocolture con le regole della 6.7", tappe:BUNDLE, attive:[0,1]},
{id:"s26", tipo:"percorso", tema:"chiaro", sopratitolo:"Liquidi cristalloidi se c'è ipotensione, o lattati da 4 in su", tappe:BUNDLE, attive:[0,1,2,3]},
{id:"s27", tipo:"percorso", tema:"chiaro", sopratitolo:"Se l'ipotensione persiste · entro un'ora si avvia, non si deve aver finito", tappe:BUNDLE, attive:[0,1,2,3,4]},

{id:"s28", tipo:"confronto", tema:"chiaro", sopratitolo:"Sepsis Six · il modello britannico", col:[
  {h:"Tre da dare", t:"**ossigeno** · **liquidi** · **antibiotici**", key:true}, {h:"Tre da prelevare o misurare", t:"emocolture · lattati · diuresi"}]},
{id:"s29", tipo:"confronto", tema:"chiaro", sopratitolo:"Sei azioni, entro un'ora · molte di competenza infermieristica", col:[
  {h:"Tre da dare", t:"ossigeno · liquidi · antibiotici"}, {h:"Tre da prelevare o misurare", t:"**emocolture** · **lattati** · **diuresi**", key:true}]},

{id:"s30", tipo:"percorso", tema:"chiaro", sopratitolo:"Il ruolo dell'infermiere", tappe:[
  {t:"Riconoscere", d:"NEWS2, confusione, oliguria"}, {t:"Attivare", d:"SBAR, team"}, {t:"Eseguire", d:"accessi, colture, lattati"}, {t:"Monitorare", d:""}, {t:"Documentare", d:""}], attive:[0,1,2]},
{id:"s31", tipo:"cifre", tema:"chiaro", sopratitolo:"La prima dose di antibiotico, senza ritardi · nella sepsi ogni ora pesa", voci:[
  {n:"3:00", suf:"", d:"prescritto"}, {n:"6:00", suf:"", d:"somministrato"}, {n:"3", suf:"ore", d:"perse", key:true}]},
{id:"s32", tipo:"percorso", tema:"chiaro", sopratitolo:"Il tempo è l'indicatore di qualità", tappe:[
  {t:"Riconoscere", d:"NEWS2, confusione, oliguria"}, {t:"Attivare", d:"SBAR, team"}, {t:"Eseguire", d:"accessi, colture, lattati"}, {t:"Monitorare", d:"diuresi, coscienza, liquidi"}, {t:"Documentare", d:"gli orari"}], attive:[0,1,2,3,4]},

{id:"s33", tipo:"norma", tema:"chiaro", etichetta:"Il vasopressore di prima scelta nello shock settico", sigla:"Noradrenalina",
  testo:"Pompa, via **dedicata**, meglio **centrale**: lo stravaso può dare **necrosi**."},
{id:"s34", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"In periferica solo per breve tempo, sorvegliando la sede", celle:[
  {t:"**Non si interrompe**: cambio siringa organizzato, lezione 6.3", key:true}, {t:"Pressione seguita da vicino"}, {t:"Spesso **linea arteriosa**"}]},

{id:"s35", tipo:"cifre", tema:"chiaro", sopratitolo:"Il caso · anziana cateterizzata da 4 giorni · confusa da stamattina", voci:[
  {n:"24", suf:"/min", d:"respiro"}, {n:"112", suf:"", d:"frequenza"}, {n:"92/55", suf:"", d:"pressione"}]},
{id:"s36", tipo:"cifre", tema:"chiaro", sopratitolo:"Che cosa pensi? Sepsi, probabilmente di origine urinaria", voci:[
  {n:"35,8", suf:"°C", d:"temperatura", key:true}, {n:"15", suf:"ml/h", d:"diuresi"}]},
{id:"s37", tipo:"titolo", tema:"profondo",
  titolo:"L'ipotermia<br>**non deve rassicurare**.",
  sotto:""},
{id:"s38", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"Che cosa fai? · ABCDE, ossigeno, SBAR", celle:[
  {t:"**Due accessi**, lattati"}, {t:"**Emocolture**, urinocoltura dal punto di prelievo"}, {t:"**Antibiotico** appena prescritto, liquidi, diuresi oraria", key:true}]},
{id:"s39", tipo:"frase", tema:"chiaro", sopratitolo:"La domanda del modulo 3 · ogni giorno di catetere è un rischio in più",
  testo:"Quel catetere **serviva ancora**?"},

{id:"s40", tipo:"catena", tema:"chiaro", sopratitolo:"Lo shock anafilattico, il più rapido · farmaci, alimenti, imenotteri, lattice", passi:[
  {t:"Un allergene"}, {t:"Orticaria, angioedema"}, {t:"Broncospasmo, ipotensione", key:true}]},
{id:"s41", tipo:"cifre", tema:"chiaro", sopratitolo:"Adrenalina intramuscolo, nella coscia · ripetibile dopo 5 minuti · poi ossigeno, liquidi, stop all'agente", voci:[
  {n:"0,5", suf:"mg", d:"nell'adulto", key:true}]},

{id:"s42", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"In Veneto · percorsi per la sepsi · legati alla stewardship, lezione 4.6", celle:[
  {t:"Riconoscimento: **NEWS2**"}, {t:"**Team** di risposta rapida"}, {t:"Indicatori sui **tempi dell'antibiotico**", key:true}]},
{id:"s43", tipo:"frase", tema:"chiaro", sopratitolo:"All'orale · e saper dire che cosa si fa nella prima ora",
  testo:"La sepsi è una patologia **tempo-dipendente**."},

{id:"s44", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"La tabella · ipovolemico, cardiogeno, distributivo, ostruttivo", celle:[
  {n:"↑", t:"**Tachicardia** precoce"}, {n:"↓", t:"**Ipotensione** tardiva"}, {n:"!", t:"Lattati **> 2** · indice di shock **> 1**", key:true}]},
{id:"s45", tipo:"tabella", tema:"chiaro", sopratitolo:"La tabella", intestazioni:["","Che cosa"], colonne:[1,3], righe:[
  ["Sepsi","disfunzione d'organo da **risposta disregolata** a un'infezione"],
  ["Prima ora","lattati, emocolture, **antibiotico**, liquidi, vasopressori"],
  ["Sepsis Six","dare: ossigeno, liquidi, antibiotici · prelevare: emocolture, lattati · misurare: diuresi"]]},
{id:"s46", tipo:"titolo", tema:"profondo",
  titolo:"La sepsi è un'emergenza<br>**tempo-dipendente**.",
  sotto:""},
{id:"s47", tipo:"confronto", tema:"chiaro", sopratitolo:"Come l'infarto e l'ictus · per questo va cercata", col:[
  {h:"Infarto, ictus", t:"il dolore al petto, la paralisi"}, {h:"Sepsi", t:"si presenta **meno chiaramente**", key:true}]},
{id:"s48", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Nella prossima lezione", celle:[
  {n:"1", t:"Il paziente **traumatizzato**"}, {n:"2", t:"Le **ustioni**: regola del nove, formula di Parkland", key:true}]},
{id:"s49", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Nella prossima lezione", celle:[
  {n:"3", t:"Le **intossicazioni** e i loro antidoti"}, {n:"4", t:"Il triage nelle **maxi-emergenze**", key:true}]},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione",
  titolo:"10.7<br>Trauma, ustioni,<br>intossicazioni", sottotitolo:"E il triage nelle maxi-emergenze",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
