// Contenuto delle 50 scene della lezione 10.8 — riepilogo del Modulo 10.
// Ogni algoritmo torna con il corpo che aveva nella sua lezione: i codici
// in tabella, l'ABCDE in scala, le dosi in cifre, lo START in percorso;
// le confusioni sono trappole.

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 10 · Emergenza e area critica",
  titolo:"Riepilogo<br>del Modulo 10", sottotitolo:"10.8 · Gli algoritmi da memorizzare e l'autovalutazione",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"frase", tema:"chiaro", sopratitolo:"Micro-lezione 8 di 8 · il contenuto più prezioso del modulo: gli algoritmi",
  testo:"In emergenza non c'è tempo per **ragionare da zero**."},
{id:"s03", tipo:"frase", tema:"chiaro", sopratitolo:"Da riascoltare la sera prima dell'esame",
  testo:"Chi conosce la **sequenza a memoria** agisce mentre gli altri pensano."},

{id:"s04", tipo:"tabella", tema:"chiaro", sopratitolo:"Il triage a cinque codici · linee di indirizzo 2019", intestazioni:["Codice","Colore","Accesso entro"], colonne:[1,1,1], righe:[
  ["**1**","rosso","**immediato**"], ["**2**","arancione","**15** minuti"], ["**3**","azzurro","**60** minuti"]]},
{id:"s05", tipo:"tabella", tema:"chiaro", sopratitolo:"Tempi massimi di attesa, non tempi di visita · gravità e rischio, non ordine di arrivo", intestazioni:["Codice","Colore","Accesso entro"], colonne:[1,1,1], righe:[
  ["1","rosso","immediato"], ["2","arancione","15 minuti"], ["3","azzurro","60 minuti"], ["**4**","verde","**120** minuti"], ["**5**","bianco","**240** minuti"]]},
{id:"s06", tipo:"percorso", tema:"chiaro", sopratitolo:"Le cinque fasi · la quinta è quella che si dimentica più spesso", tappe:[
  {t:"Immediata", d:""}, {t:"Soggettiva", d:""}, {t:"Oggettiva", d:""}, {t:"Decisione", d:""}, {t:"Rivalutazione", d:"il codice non è definitivo"}], attive:[0,1,2,3,4]},

{id:"s07", tipo:"scala", tema:"chiaro", sopratitolo:"L'ABCDE · lezione 10.2", gradini:[
  {n:"A", t:"Parla?", key:true}, {n:"B", t:"FR in un minuto", key:true}, {n:"C", t:"Refill < 2 s", key:true}, {n:"D", t:"AVPU, pupille, glicemia"}, {n:"E", t:"Esporre, ricoprire"}]},
{id:"s08", tipo:"scala", tema:"chiaro", sopratitolo:"Tratta ciò che trovi, prima di passare oltre", gradini:[
  {n:"A", t:"Parla?"}, {n:"B", t:"FR in un minuto"}, {n:"C", t:"Refill < 2 s"}, {n:"D", t:"AVPU, pupille, glicemia", key:true}, {n:"E", t:"Esporre, ricoprire", key:true}]},
{id:"s09", tipo:"tabella", tema:"chiaro", sopratitolo:"La NEWS2 · con il team di risposta rapida, dove c'è", intestazioni:["Punteggio","Risposta"], colonne:[1,2], righe:[
  ["**3** in un parametro","valutazione **urgente**"], ["**5-6**","risposta **urgente**"], ["**≥ 7**","**emergenza**"]]},
{id:"s10", tipo:"percorso", tema:"chiaro", sopratitolo:"La catena da citare · una confusione nuova non è normale per l'età: si riparte dalla A", tappe:[
  {t:"Parametri", d:""}, {t:"Punteggio", d:""}, {t:"Risposta graduata", d:""}], attive:[0,1,2]},

{id:"s11", tipo:"percorso", tema:"chiaro", sopratitolo:"Il BLSD · i primi tre anelli della catena sono nelle mani di chi c'è", tappe:[
  {t:"Sicurezza", d:"coscienza, aiuto"}, {t:"Vie aeree", d:""}, {t:"Respiro", d:"≤ 10 s"}, {t:"118, DAE", d:""}, {t:"30:2", d:""}], attive:[0,1,2,3,4]},
{id:"s12", tipo:"titolo", tema:"profondo",
  titolo:"Il gasping<br>**è arresto**.",
  sotto:""},
{id:"s13", tipo:"cifre", tema:"chiaro", sopratitolo:"Centro del torace, piano rigido · rilascio completo · interruzioni minime", voci:[
  {n:"5-6", suf:"cm", d:"profondità"}, {n:"100", suf:"-120", d:"al minuto", key:true}, {n:"2", suf:"min", d:"cambio"}]},
{id:"s14", tipo:"percorso", tema:"chiaro", sopratitolo:"Il DAE · anche dopo uno shock efficace il cuore impiega tempo a pompare", tappe:[
  {t:"Piastre", d:""}, {t:"Analisi", d:"nessuno tocca"}, {t:"Shock", d:""}, {t:"Subito RCP", d:"2 minuti, senza polso"}], attive:[0,1,2,3]},

{id:"s15", tipo:"confronto", tema:"chiaro", sopratitolo:"L'ALS · analisi ogni 2 minuti", col:[
  {h:"Defibrillabili", t:"**FV** · **TV senza polso**", key:true}, {h:"Non defibrillabili", t:"asistolia · PEA: conta la **causa**"}]},
{id:"s16", tipo:"confronto", tema:"chiaro", sopratitolo:"Adrenalina 1 mg · poi ogni 3-5 minuti, circa ogni due cicli · il timekeeper tiene i tempi", col:[
  {h:"Non defibrillabili", t:"**subito**"}, {h:"Defibrillabili", t:"**dopo il 3° shock**", key:true}]},
{id:"s17", tipo:"cifre", tema:"chiaro", sopratitolo:"Amiodarone · dopo ogni farmaco, lavaggio · via venosa o intraossea", voci:[
  {n:"300", suf:"mg", d:"dopo il 3° shock", key:true}, {n:"150", suf:"mg", d:"dopo il 5°"}]},
{id:"s18", tipo:"griglia", tema:"chiaro", colonne:4, spunta:false, sopratitolo:"Le 4 I e le 4 T · durante ogni arresto, non solo alla fine", celle:[
  {n:"I", t:"Ipossia"}, {n:"I", t:"Ipovolemia"}, {n:"I", t:"Ipo/iperkaliemia"}, {n:"I", t:"Ipotermia"},
  {n:"T", t:"Trombosi"}, {n:"T", t:"Tamponamento"}, {n:"T", t:"Tossici"}, {n:"T", t:"Pneumotorace iperteso"}]},

{id:"s19", tipo:"cifre", tema:"chiaro", sopratitolo:"Il PBLS · lattante sotto un anno · un terzo del torace · capo neutro nel lattante", voci:[
  {n:"5", suf:"", d:"ventilazioni iniziali", key:true}, {n:"15:2", suf:"", d:"poi"}]},
{id:"s20", tipo:"confronto", tema:"chiaro", sopratitolo:"L'ostruzione · tosse efficace: incoraggiare · inefficace: 5 colpi e 5 compressioni", col:[
  {h:"Adulto e bambino", t:"compressioni **addominali**"}, {h:"Lattante", t:"compressioni **toraciche**", key:true}]},
{id:"s21", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Le compressioni possono espellere il corpo estraneo", celle:[
  {t:"Perde coscienza: **rianimazione**", key:true}, {t:"Obesi, gravidanza avanzata: compressioni **toraciche**"}]},

{id:"s22", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Le vie aeree · il sopraglottico non protegge del tutto dall'inalazione", celle:[
  {n:"G", t:"**Guedel**: solo senza riflesso"}, {n:"N", t:"**Nasofaringea**: no nella frattura della base cranica"}, {n:"P", t:"**Pallone** a due mani", key:true}]},
{id:"s23", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"Il tubo", celle:[
  {t:"Verifica con la **capnografia**", key:true}, {t:"Cuffia **20-30 cmH₂O**"}, {t:"**Centimetri** annotati"}]},
{id:"s24", tipo:"confronto", tema:"chiaro", sopratitolo:"Il ventilato che peggiora: DOPE · nel dubbio, si stacca e si ventila con il pallone", col:[
  {h:"Alta pressione", t:"un **ostacolo**"}, {h:"Bassa pressione", t:"una **perdita**", key:true}]},

{id:"s25", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Lo shock · tachicardia precoce, ipotensione tardiva · lattati > 2 · indice > 1", celle:[
  {n:"1", t:"Ipovolemico"}, {n:"2", t:"Cardiogeno"}, {n:"3", t:"Distributivo"}, {n:"4", t:"Ostruttivo"}]},
{id:"s26", tipo:"percorso", tema:"chiaro", sopratitolo:"La sepsi · il bundle della prima ora", tappe:[
  {t:"Lattati", d:""}, {t:"Emocolture", d:"prima dell'antibiotico"}, {t:"Antibiotico", d:""}, {t:"Liquidi", d:""}, {t:"Vasopressori", d:"PAM ≥ 65"}], attive:[0,1,2,3,4]},
{id:"s27", tipo:"confronto", tema:"chiaro", sopratitolo:"Sepsis Six · la prima dose di antibiotico non aspetta", col:[
  {h:"Tre da dare", t:"ossigeno · liquidi · antibiotici"}, {h:"Tre da prelevare o misurare", t:"emocolture · lattati · diuresi", key:true}]},
{id:"s28", tipo:"cifre", tema:"chiaro", sopratitolo:"L'anafilassi · adrenalina IM, nella coscia, ripetibile dopo 5 minuti · poi ossigeno, liquidi, stop all'agente", voci:[
  {n:"0,5", suf:"mg", d:"nell'adulto", key:true}]},

{id:"s29", tipo:"scala", tema:"chiaro", sopratitolo:"Il trauma · tourniquet con l'orario, senza allentarlo · rachide in asse, in blocco", gradini:[
  {n:"X", t:"Emorragia massiva", key:true}, {n:"A", t:"+ rachide"}, {n:"B", t:"Respiro"}, {n:"C", t:"Circolo"}, {n:"D", t:"Neurologico"}, {n:"E", t:"Esposizione"}]},
{id:"s30", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Le ustioni · fuliggine, voce rauca, stridore: vie aeree a rischio", celle:[
  {n:"9", t:"Regola del **nove** · palmo = **1%**"}, {n:"~", t:"Acqua **tiepida**, 20 minuti, niente ghiaccio"}, {n:"3°", t:"Il terzo grado è **indolore**", key:true}]},
{id:"s31", tipo:"frase", tema:"chiaro", sopratitolo:"Parkland · metà nelle prime 8 ore dall'ustione · diuresi circa 0,5 ml/kg/h",
  testo:"**4 ml** × **peso** × **% ustionata**"},
{id:"s32", tipo:"percorso", tema:"chiaro", sopratitolo:"Lo START · e il triage si ripete", tappe:[
  {t:"Cammina?", d:"sì: verde"}, {t:"Respira?", d:"no: nero"}, {t:"FR > 30?", d:"rosso"}, {t:"Refill > 2 s?", d:"rosso"}, {t:"Esegue ordini?", d:"no: rosso · sì: giallo"}], attive:[0,1,2,3,4]},

{id:"s33", tipo:"tabella", tema:"chiaro", sopratitolo:"Gli antidoti", intestazioni:["Sostanza","Antidoto"], colonne:[1,1], righe:[
  ["Oppioidi","**naloxone**"], ["Benzodiazepine","**flumazenil**"], ["Paracetamolo","**N-acetilcisteina**"], ["Monossido","**ossigeno 100%**"]]},
{id:"s34", tipo:"tabella", tema:"chiaro", sopratitolo:"Gli antidoti · con la lezione 5.5", intestazioni:["Sostanza","Antidoto"], colonne:[1,1], righe:[
  ["Dicumarolici","**vitamina K**"], ["Organofosfati","**atropina**"], ["Eparina","**protamina**"], ["Ipoglicemia","**glucagone** o glucosio"]]},

{id:"s35", tipo:"trappola", tema:"chiaro", sopratitolo:"Le confusioni che costano più punti", righe:[
  {sb:"Il gasping è un respiro", ok:"È **arresto**"}, {sb:"Aspettare l'ipotensione", ok:"È un segno **tardivo**"}]},
{id:"s36", tipo:"trappola", tema:"chiaro", sopratitolo:"Le confusioni che costano più punti", righe:[
  {sb:"Il codice di triage è una diagnosi", ok:"Dice **quanto si può aspettare**"}, {sb:"Heimlich nel lattante", ok:"Colpi dorsali e compressioni **toraciche**"}]},
{id:"s37", tipo:"trappola", tema:"chiaro", sopratitolo:"Le confusioni che costano più punti", righe:[
  {sb:"Indolore, quindi lieve", ok:"È **profonda**"}, {sb:"Parkland dall'arrivo", ok:"**Dal momento dell'ustione**"}, {sb:"Ghiaccio sull'ustione", ok:"Acqua **tiepida**"}]},
{id:"s38", tipo:"trappola", tema:"chiaro", sopratitolo:"Chi si tranquillizza per una temperatura bassa guarda il numero sbagliato", righe:[
  {sb:"Ipotermia nella sepsi: una buona notizia", ok:"È un segno di **gravità**"}]},

{id:"s39", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Gli agganci veneti per l'orale", celle:[
  {t:"**SUEM 118** e centrali operative"}, {t:"Triage a **cinque codici**"}, {t:"Reti **tempo-dipendenti**: hub e spoke", key:true}]},
{id:"s40", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Per tutte, la parola chiave è la stessa: rete", celle:[
  {t:"**Team di risposta rapida** e NEWS2"}, {t:"Percorsi per la **sepsi**"}, {t:"**PEIMAF**"}, {t:"BLSD e ALS secondo **IRC**", key:true}]},

{id:"s41", tipo:"cifre", tema:"chiaro", sopratitolo:"Come proseguire · il test del modulo · e ogni algoritmo ripetuto ad alta voce", voci:[
  {n:"30", suf:"", d:"domande"}, {n:"21", suf:"", d:"soglia", key:true}]},
{id:"s42", tipo:"griglia", tema:"chiaro", colonne:5, spunta:false, sopratitolo:"Nel quaderno · una pagina sola, da rileggere la sera prima", celle:[
  {n:"1", t:"Codici"}, {n:"2", t:"Tempi"}, {n:"3", t:"**Dosi**", key:true}, {n:"4", t:"Antidoti"}, {n:"5", t:"START"}]},
{id:"s43", tipo:"confronto", tema:"chiaro", sopratitolo:"Due casi da scrivere a parole tue", col:[
  {h:"Il paziente che si deteriora", t:"in reparto, con **ABCDE** e **NEWS2**", key:true}, {h:"La sepsi", t:"dal sospetto alla **prima ora**"}]},

{id:"s44", tipo:"frase", tema:"chiaro", sopratitolo:"La frase del modulo · dal mondo dell'emergenza",
  testo:"Vale per chi studia come per chi **soccorre**."},
{id:"s45", tipo:"titolo", tema:"profondo",
  titolo:"Non si sale al livello delle aspettative.<br>**Si scende al livello dell'addestramento**.",
  sotto:""},
{id:"s46", tipo:"frase", tema:"chiaro", sopratitolo:"Per questo gli algoritmi si imparano a memoria, e si ripetono",
  testo:"Le mani fanno **quello che hanno ripetuto**."},

{id:"s47", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Nel prossimo modulo · dall'urgenza dei minuti alla cura che dura anni", celle:[
  {n:"1", t:"L'**anziano fragile** e la demenza", key:true}, {n:"2", t:"La **salute mentale**"}, {n:"3", t:"L'area **materno-infantile**"}]},
{id:"s48", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Nel prossimo modulo", celle:[
  {n:"4", t:"Cure **palliative** e fine vita"}, {n:"5", t:"**Cronicità** ed educazione terapeutica"}, {n:"6", t:"Il **territorio**: case e ospedali di comunità", key:true}]},
{id:"s49", tipo:"frase", tema:"chiaro", sopratitolo:"Ci vediamo lì",
  testo:"Quanto l'assistenza infermieristica vada **oltre l'ospedale**."},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossimo modulo",
  titolo:"Modulo 11<br>Setting assistenziali<br>e ciclo di vita", sottotitolo:"11.1 · L'anziano fragile",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
