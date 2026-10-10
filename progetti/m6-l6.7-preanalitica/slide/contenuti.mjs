// Contenuto delle 50 scene della lezione 6.7 — prelievi ed esami: la fase
// preanalitica. Un corpo nuovo: le provette, le sei nell'ordine di prelievo
// con il tappo del colore giusto (si accendono nell'ordine della voce; la
// freccia porta l'EDTA nel siero; in modo tacca il citrato pieno e quello
// poco pieno). Il resto: percorsi, trappole, cifre, una fascia per la
// glicemia, colonne per l'emocromo.

const FASE = [
 {t:"Identificazione"}, {t:"Prelievo"}, {t:"Provette"}, {t:"Conservazione"}, {t:"Trasporto"},
];
const CRIT = [
 {t:"Read-back", d:"si ripete ciò che si è sentito", key:true}, {t:"Medico", d:"subito"}, {t:"Documentare", d:"l'orario della comunicazione"},
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 6 · Accessi vascolari, terapia infusionale ed emocomponenti",
  titolo:"Prelievi ed esami:<br>la fase preanalitica", sottotitolo:"6.7 · Dove nascono gli errori di laboratorio",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"frase", tema:"chiaro", sopratitolo:"Micro-lezione 7 di 8 · un dato che sorprende molti",
  testo:"La maggior parte degli **errori di laboratorio** non nasce in laboratorio, ma **prima**."},
{id:"s03", tipo:"percorso", tema:"chiaro", sopratitolo:"La fase preanalitica · gestita dall'infermiere: è la fase in cui l'infermiere può fare la differenza", tappe:FASE},
{id:"s04", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"Un esame sbagliato non è innocuo · e quasi sempre l'errore è invisibile: il referto arriva, nessuno sa che è falso", celle:[
  {n:"1", t:"**Diagnosi sbagliate**", key:true}, {n:"2", t:"Terapie **inutili o mancate**"}, {n:"3", t:"Prelievi **ripetuti**"}]},

{id:"s05", tipo:"percorso", tema:"chiaro", sopratitolo:"Il primo passo è sempre lo stesso", tappe:[
  {t:"Identificazione attiva", key:true}, {t:"Prelievo"}, {t:"Etichettatura", d:"al letto, davanti al paziente, subito dopo"}]},
{id:"s06", tipo:"trappola", tema:"chiaro", sopratitolo:"La ricetta perfetta per uno scambio", righe:[
  {sb:"Provette pre-etichettate per più pazienti, in giro sul carrello", ok:"**Prima si preleva, poi si etichetta**, senza allontanarsi dal letto"}]},
{id:"s07", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"La richiesta completa · l'ora conta: alcuni valori cambiano nella giornata", celle:[
  {t:"L'**esame**"}, {t:"La **data**"}, {t:"L'**ora** del prelievo", key:true}, {t:"L'**operatore**"}]},

{id:"s08", tipo:"cifre", tema:"chiaro", sopratitolo:"Le condizioni del prelievo · il laccio", voci:[
  {n:"< 1", suf:"min", d:"oltre, i componenti del sangue si concentrano e i valori cambiano", key:true}]},
{id:"s09", tipo:"trappola", tema:"chiaro", sopratitolo:"Il pugno · ricordi la pseudo-iperkaliemia della lezione 3.5", righe:[
  {sb:"Pugno aperto e chiuso ripetutamente: altera il potassio", ok:"**Niente pugno**: la mano resta ferma"}]},
{id:"s10", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Il paziente", celle:[
  {t:"A **riposo**"}, {t:"A **digiuno** quando l'esame lo richiede: glicemia a digiuno (5.5), trigliceridi", key:true}]},
{id:"s11", tipo:"trappola", tema:"chiaro", sopratitolo:"L'arto con l'infusione · la soluzione diluisce o contamina il campione", righe:[
  {sb:"Prelievo dal braccio in cui scorre un'infusione", ok:"**L'altro braccio**; se è proprio inevitabile, **a valle, a infusione sospesa**, secondo procedura"}]},

{id:"s12", tipo:"provette", tema:"chiaro", sopratitolo:"L'ordine di prelievo · i quiz lo chiedono spesso · emocolture per prime, per non contaminarle con gli additivi delle altre", attive:[0,1]},
{id:"s13", tipo:"provette", tema:"chiaro", sopratitolo:"L'ordine di prelievo · siero con o senza gel · EDTA per l'emocromo · fluoruro per la glicemia"},
{id:"s14", tipo:"provette", tema:"chiaro", sopratitolo:"Il motivo dell'ordine · l'additivo di una provetta non deve contaminare la successiva", freccia:[4,2], key:[2,4], nota:"l'EDTA nel siero: calcio più basso, potassio più alto"},
{id:"s15", tipo:"frase", tema:"chiaro", sopratitolo:"I colori possono variare fra produttori · sei provette, un ordine: dalla più delicata alla meno delicata",
  testo:"Conta l'**additivo** scritto in etichetta, non il tappo."},

{id:"s16", tipo:"provette", tema:"chiaro", sopratitolo:"Il citrato · il test della coagulazione richiede un rapporto preciso fra sangue e anticoagulante", modo:"tacca"},
{id:"s17", tipo:"percorso", tema:"chiaro", sopratitolo:"Con il butterfly, se la prima provetta è il citrato · il tubicino va riempito d'aria prima", tappe:[
  {t:"Provetta di scarto", d:"riempie il tubicino", key:true}, {t:"Citrato", d:"fino alla tacca"}, {t:"Le altre", d:"nell'ordine"}]},
{id:"s18", tipo:"trappola", tema:"chiaro", sopratitolo:"Tutte le provette con additivo", righe:[
  {sb:"Agitare la provetta: si provoca emolisi", ok:"**Capovolgere delicatamente** il numero di volte indicato"}]},

{id:"s19", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"L'emolisi · la rottura dei globuli rossi nel campione · le cause sono quasi tutte nostre", celle:[
  {n:"1", t:"**Ago troppo sottile**", key:true}, {n:"2", t:"Aspirazione **vigorosa** con la siringa"}, {n:"3", t:"**Laccio prolungato**"}]},
{id:"s20", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"L'emolisi · i globuli rossi si rompono e versano il loro potassio nel siero", celle:[
  {n:"4", t:"Provette **agitate**"}, {n:"5", t:"Sangue **spinto con forza** dalla siringa nella provetta", key:true}, {n:"6", t:"Prelievo da una **cannula appena posizionata**"}]},
{id:"s21", tipo:"catena", tema:"chiaro", sopratitolo:"L'effetto più importante · insieme a LDH e transaminasi", passi:[
  {t:"Emolisi"}, {t:"Potassio falsamente alto", key:true}, {t:"Si ripete", d:"non si interpreta"}]},

{id:"s22", tipo:"percorso", tema:"chiaro", sopratitolo:"Le emocolture · dalle lezioni 4.6 e 6.2 · quando", tappe:[
  {t:"Rialzo febbrile", d:"o, meglio, all'insorgenza del brivido", key:true}, {t:"Prima dell'antibiotico", d:"che altrimenti sterilizza il campione"}]},
{id:"s23", tipo:"cifre", tema:"chiaro", sopratitolo:"Quante · ogni set: un flacone aerobio e uno anaerobio, da due punzioni diverse", voci:[
  {n:"2", d:"set almeno", key:true}, {n:"8–10", suf:"ml", d:"per flacone nell'adulto: il volume decide la sensibilità"}]},
{id:"s24", tipo:"confronto", tema:"chiaro", sopratitolo:"Nel sospetto di infezione da catetere · set appaiati, nello stesso momento: è il confronto che dice se il catetere è la fonte", col:[
  {h:"Un set", t:"**dal catetere**", key:true}, {h:"Un set", t:"**da vena periferica**"}]},

{id:"s25", tipo:"griglia", tema:"chiaro", colonne:1, spunta:true, sopratitolo:"La tecnica · un'emocoltura contaminata dalla flora cutanea porta a terapie inutili", celle:[
  {t:"**Clorexidina alcolica** sulla cute, lasciata **asciugare**", key:true}, {t:"**Disinfezione dei tappi** dei flaconi"}, {t:"**Non ripalpare** la vena dopo l'antisepsi"}]},
{id:"s26", tipo:"confronto", tema:"chiaro", sopratitolo:"L'ordine dei flaconi · la piccola quantità d'aria del tubicino deve finire nell'aerobio", col:[
  {h:"Butterfly", t:"prima l'**aerobio**", key:true}, {h:"Siringa", t:"prima l'**anaerobio**"}]},
{id:"s27", tipo:"trappola", tema:"chiaro", sopratitolo:"Poi si etichetta e si invia subito, o si conserva secondo procedura", righe:[
  {sb:"I flaconi in frigorifero: il freddo ferma la crescita che si vuole vedere", ok:"**Mai in frigorifero**: sono terreni di coltura"}]},

{id:"s28", tipo:"percorso", tema:"chiaro", sopratitolo:"L'urinocoltura · nel cateterizzato dal punto di prelievo dedicato, mai dalla sacca (lezione 3.6)", tappe:[
  {t:"Igiene dei genitali"}, {t:"Primo getto", d:"si scarta"}, {t:"Mitto intermedio", d:"in contenitore sterile", key:true}]},
{id:"s29", tipo:"cifre", tema:"chiaro", sopratitolo:"A temperatura ambiente i batteri si moltiplicano e falsano la carica", voci:[
  {n:"2", suf:"h", d:"per l'invio; oppure si refrigera secondo procedura", key:true}]},

{id:"s30", tipo:"griglia", tema:"chiaro", colonne:1, spunta:true, sopratitolo:"Il tampone · un tampone secco è un tampone morto", celle:[
  {t:"La **sede** giusta"}, {t:"La **tecnica** giusta"}, {t:"Il **terreno di trasporto** adeguato", key:true}]},
{id:"s31", tipo:"figura", tema:"chiaro", sopratitolo:"Sulle lesioni · lo vedremo nel modulo 7", illu:"ferita",
  titolo:"Prima si **deterge**, poi si campiona il **tessuto vitale**.",
  sotto:"Non il pus superficiale, non la necrosi."},
{id:"s32", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Gli altri campioni", celle:[
  {n:"1", t:"**Feci** per il Clostridium difficile: solo se **non formate**"}, {n:"2", t:"**Espettorato** al mattino, bocca sciacquata con acqua, da una **tosse profonda**: la saliva non serve", key:true}]},

{id:"s33", tipo:"frase", tema:"chiaro", sopratitolo:"Alcuni valori di riferimento · con un'avvertenza",
  testo:"I valori esatti **dipendono dal laboratorio**: nella pratica si usano quelli scritti **sul referto**."},
{id:"s34", tipo:"colonne", tema:"chiaro", sopratitolo:"L'emocromo", colonne:[
  {h:"Emoglobina", key:true, voci:[{t:"Uomo **13–17** g/dl", key:true}, {t:"Donna **12–16** g/dl"}]},
  {h:"Globuli bianchi", voci:[{t:"**4.000–10.000** per mm³"}]},
  {h:"Piastrine", voci:[{t:"**150.000–450.000**"}]}]},

{id:"s35", tipo:"fascia", tema:"chiaro", sopratitolo:"La chimica · la glicemia a digiuno, in mg/dl", min:50, max:160, classi:[
  {da:50, a:70, t:"bassa"}, {da:70, a:100, t:"Normale", d:"70–99", key:true}, {da:100, a:126, t:"Alterata", d:"100–125"}, {da:126, a:160, t:"Diabete", d:"da 126, se confermata"}]},
{id:"s36", tipo:"cifre", tema:"chiaro", sopratitolo:"La chimica", voci:[
  {n:"6,5", suf:"%", d:"emoglobina glicata: compatibile con diabete", key:true}, {n:"1,2", suf:"mg/dl", d:"creatinina: circa 0,6–1,2"}]},
{id:"s37", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"La chimica", celle:[
  {n:"Na K", t:"**Sodio e potassio**: li conosci dalla lezione 3.5"}, {n:"INR", t:"Circa **1** in chi non assume anticoagulanti", key:true}, {n:"PCR", t:"Indice di infiammazione, secondo il laboratorio"}]},

{id:"s38", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"Un concetto di sicurezza · il valore critico: un risultato che indica un pericolo immediato", celle:[
  {n:"!", t:"Un **potassio molto alto**", key:true}, {n:"!", t:"Una **glicemia molto bassa**"}, {n:"!", t:"Un'**emoglobina crollata**"}]},
{id:"s39", tipo:"percorso", tema:"chiaro", sopratitolo:"Il laboratorio lo comunica direttamente al reparto · chi lo riceve, lezione 2.7", tappe:CRIT},

{id:"s40", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"Il trasporto · ogni esame ha tempi e temperature previsti", celle:[
  {n:"1", t:"Alcuni campioni **in ghiaccio**"}, {n:"2", t:"Altri a **temperatura ambiente**"}, {n:"3", t:"Le emocolture **mai in frigorifero**", key:true}]},
{id:"s41", tipo:"griglia", tema:"chiaro", colonne:1, spunta:true, sopratitolo:"Come viaggiano", celle:[
  {t:"**Contenitori chiusi**, a prova di perdita", key:true}, {t:"Il simbolo del **rischio biologico**"}, {t:"Le **richieste separate** dai campioni"}]},

{id:"s42", tipo:"frase", tema:"chiaro", sopratitolo:"Il caso · paziente asintomatico, ECG in ordine · il prelievo era stato difficoltoso: ago sottile, laccio prolungato",
  testo:"Il laboratorio comunica un **potassio di 6,8**. Che cosa pensi? Possibile **pseudo-iperkaliemia da emolisi**."},
{id:"s43", tipo:"percorso", tema:"chiaro", sopratitolo:"Che cosa fai · un potassio così alto non si ignora", tappe:[
  {t:"Read-back"}, {t:"Medico", d:"comunque", key:true}, {t:"Laboratorio", d:"segnala emolisi?"}, {t:"Ripetere", d:"su indicazione, con tecnica corretta"}]},
{id:"s44", tipo:"titolo", tema:"profondo",
  titolo:"Nel frattempo **sorvegli il paziente**.",
  sotto:"Potrebbe essere un'iperkaliemia vera: il dubbio sul campione non sospende mai la sorveglianza sulla persona."},

{id:"s45", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"In Veneto", celle:[
  {n:"1", t:"**Etichette stampate al letto** dal braccialetto del paziente: meno errori di identificazione", key:true}, {n:"2", t:"**Procedure aziendali** sulla fase preanalitica"}, {n:"3", t:"Procedure sulla **comunicazione dei valori critici**"}]},
{id:"s46", tipo:"frase", tema:"chiaro", sopratitolo:"All'orale",
  testo:"Collega sempre la preanalitica alla **sicurezza del paziente**."},

{id:"s47", tipo:"provette", tema:"chiaro", sopratitolo:"Ricapitoliamo · etichettare al letto · laccio meno di un minuto · mai dal braccio con infusione · e l'ordine", key:[0]},
{id:"s48", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Ricapitoliamo", celle:[
  {t:"Citrato **fino alla tacca**, provette **mai agitate**"}, {t:"Emocolture: **due set**, **8–10 ml**, **prima dell'antibiotico**", key:true}, {t:"Urinocoltura: **mitto intermedio**, mai dalla sacca"}]},
{id:"s49", tipo:"frase", tema:"chiaro", sopratitolo:"Nella prossima lezione ricomponiamo il modulo 6, con l'autovalutazione",
  testo:"Dalla cannula alla provetta: tutto ciò che **passa per una vena**."},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione",
  titolo:"6.8<br>Riepilogo del modulo 6<br>e autovalutazione", sottotitolo:"Procedure a confronto",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
