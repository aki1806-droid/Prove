// Contenuto delle 50 scene della lezione 9.1 — il percorso perioperatorio.
// Nessun corpo nuovo: le tre fasi e i tre momenti della check-list sono
// percorsi che si accendono, il blocco operatorio è una scala a protezione
// crescente, i tre ruoli sono tre box, l'ERAS è un confronto prima/durante/
// dopo, le Raccomandazioni sono due norme con il sigillo.

const FASI = [
 {t:"Preoperatoria", d:"dalla decisione all'ingresso in sala"}, {t:"Intraoperatoria", d:"dalla sala alla sala risveglio"}, {t:"Postoperatoria", d:"dal risveglio alla ripresa, spesso a casa", key:true},
];
const CHECK = [
 {t:"Sign in", d:"prima dell'induzione"}, {t:"Time out", d:"prima dell'incisione", key:true}, {t:"Sign out", d:"prima che lasci la sala"},
];
const PASSAGGI = [
 {t:"Reparto"}, {t:"Blocco operatorio"}, {t:"Sala risveglio", key:true}, {t:"Reparto"},
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 9 · Assistenza perioperatoria",
  titolo:"Il percorso<br>perioperatorio", sottotitolo:"9.1 · Fasi, ruoli, check-list, ERAS",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"frase", tema:"chiaro", sopratitolo:"Micro-lezione 1 di 8 · il paziente chirurgico",
  testo:"L'intervento dura poche ore, ma il **percorso** comincia giorni prima e finisce settimane dopo."},
{id:"s03", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"La cornice di questa lezione", celle:[
  {n:"1", t:"Le **fasi**"}, {n:"2", t:"I **ruoli** in sala operatoria"}, {n:"3", t:"La **check-list**", key:true}, {n:"4", t:"Il modello **ERAS**"}]},

{id:"s04", tipo:"percorso", tema:"chiaro", sopratitolo:"Tre fasi · valutazione, preparazione e informazione prima; la sala; il risveglio", attive:[0,1], tappe:FASI},
{id:"s05", tipo:"percorso", tema:"chiaro", sopratitolo:"Molte complicanze del post-operatorio si prevengono nel pre-operatorio", tappe:FASI},

{id:"s06", tipo:"scala", tema:"chiaro", sopratitolo:"Il blocco operatorio · zone a protezione crescente", gradini:[
  {n:"1", t:"Area esterna"}, {n:"2", t:"Filtri", d:"spogliatoi, passaggio dei pazienti"}, {n:"3", t:"Zona pulita", d:"preparazione, deposito"}, {n:"4", t:"Sala operatoria", d:"zona sterile", key:true}]},
{id:"s07", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Si entra solo con l'abbigliamento dedicato", celle:[
  {t:"Percorsi **separati** per pulito e sporco", key:true}, {t:"Accesso **regolato**"}, {t:"Divisa, copricapo, mascherina"}, {t:"**Calzature** del blocco"}]},
{id:"s08", tipo:"frase", tema:"chiaro", sopratitolo:"Ogni ingresso in sala durante l'intervento è un potenziale rischio infettivo",
  testo:"Ridurre il **traffico in sala**, e le volte in cui la porta si apre, fa parte della prevenzione."},

{id:"s09", tipo:"tre", tema:"chiaro", sopratitolo:"Tre ruoli infermieristici · lo strumentista lavora sterile", box:[
  {n:"1", t:"Strumentista", d:"**sterile** · tavolo servitore, strumenti, campo sterile, **conta**"},
  {n:"2", t:"Infermiere di sala", d:"circolante"},
  {n:"3", t:"Infermiere di anestesia", d:""}]},
{id:"s10", tipo:"tre", tema:"chiaro", sopratitolo:"L'infermiere di sala, o circolante, non è sterile", box:[
  {n:"1", t:"Strumentista", d:"sterile"},
  {n:"2", t:"Infermiere di sala", d:"**non sterile** · dall'esterno del campo: materiali, **documenta**, coordina la check-list"},
  {n:"3", t:"Infermiere di anestesia", d:""}]},
{id:"s11", tipo:"tre", tema:"chiaro", sopratitolo:"Tre competenze diverse, che i concorsi chiedono di saper distinguere", box:[
  {n:"1", t:"Strumentista", d:"sterile"},
  {n:"2", t:"Infermiere di sala", d:"non sterile"},
  {n:"3", t:"Infermiere di anestesia", d:"con l'anestesista: **induzione, monitoraggio, risveglio**"}]},
{id:"s12", tipo:"trappola", tema:"chiaro", sopratitolo:"Un distrattore frequente", righe:[
  {sb:"Lo strumentista apre una confezione dall'esterno; il circolante tocca il tavolo servitore", ok:"Chi è sterile tocca **solo ciò che è sterile**; chi non lo è, **mai**"}]},

{id:"s13", tipo:"norma", tema:"chiaro", sopratitolo:"La check-list per la sicurezza in sala operatoria",
  etichetta:"Ministero della Salute, dalla", sigla:"Surgical Safety Checklist OMS", testo:"Tre momenti."},
{id:"s14", tipo:"percorso", tema:"chiaro", sopratitolo:"Tre momenti · prima dell'induzione, prima dell'incisione, prima che il paziente lasci la sala", tappe:CHECK},
{id:"s15", tipo:"frase", tema:"chiaro", sopratitolo:"Un coordinatore, spesso l'infermiere di sala, pone le domande ad alta voce e verifica le risposte",
  testo:"Nessun intervento dovrebbe iniziare con **un punto in sospeso**."},

{id:"s16", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Sign in · prima dell'induzione · il paziente conferma, quando possibile", celle:[
  {t:"**Identità**, sede, procedura, **consenso**", key:true}, {t:"**Marcatura** del sito verificata"}]},
{id:"s17", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Sign in", celle:[
  {t:"Apparecchiatura di anestesia e **pulsossimetro**"}, {t:"**Allergie**", key:true}, {t:"Rischio di **vie aeree difficili** o di inalazione"}, {t:"Rischio di **perdita ematica**, sangue disponibile"}]},

{id:"s18", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Time out · prima dell'incisione", celle:[
  {t:"L'équipe si **presenta**"}, {t:"**Ad alta voce**: paziente, sede, procedura", key:true}, {t:"Ciascuno dichiara gli **eventi critici** previsti"}]},
{id:"s19", tipo:"cifre", tema:"chiaro", sopratitolo:"Time out · e le immagini disponibili", voci:[
  {n:"60", suf:"minuti", d:"la profilassi antibiotica, prima dell'incisione", key:true}]},
{id:"s20", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Sign out · prima dell'uscita", celle:[
  {t:"La **procedura eseguita**, registrata"}, {t:"La **conta** di garze, aghi e strumenti è corretta", key:true}]},
{id:"s21", tipo:"frase", tema:"chiaro", sopratitolo:"La conta · strumentista e infermiere di sala insieme, ad alta voce, prima della chiusura di ogni cavità e alla fine",
  testo:"Se non torna, **non si chiude** finché il pezzo mancante non si trova."},
{id:"s22", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Sign out", celle:[
  {t:"**Etichettatura** dei campioni", key:true}, {t:"Problemi delle **apparecchiature**"}, {t:"**Indicazioni** per il post-operatorio"}]},

{id:"s23", tipo:"confronto", tema:"chiaro", sopratitolo:"Due Raccomandazioni ministeriali · la check-list è lo strumento operativo di entrambe", col:[
  {h:"Raccomandazione 2", t:"la **ritenzione** di garze, strumenti o altro materiale nel sito chirurgico", key:true}, {h:"Raccomandazione 3", t:"l'**identificazione** corretta di paziente, sito e procedura"}]},
{id:"s24", tipo:"catena", tema:"chiaro", sopratitolo:"Paziente sbagliato, lato sbagliato: un evento sentinella, da segnalare e analizzare nelle cause", passi:[
  {t:"Marcatura del sito"}, {t:"Time out", key:true}, {t:"Barriere che lo prevengono"}]},

{id:"s25", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"La marcatura del sito", celle:[
  {n:"1", t:"La esegue il **chirurgo**, o chi eseguirà la procedura", key:true}, {n:"2", t:"Con il paziente **sveglio** e partecipe, quando possibile"}]},
{id:"s26", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"Il segno", celle:[
  {n:"3", t:"**Chiaro** e **indelebile**"}, {n:"4", t:"Resta **visibile** dopo la disinfezione e la preparazione del campo", key:true}]},
{id:"s27", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"Quando è necessaria", celle:[
  {n:"→", t:"**Lateralità**: destro o sinistro", key:true}, {n:"→", t:"**Strutture multiple**: le dita"}, {n:"→", t:"**Livelli** diversi: le vertebre"}]},

{id:"s28", tipo:"figura", tema:"chiaro", sopratitolo:"Il modello ERAS · interventi basati sulle evidenze", illu:"persona",
  titolo:"Enhanced Recovery<br>After Surgery", sotto:"meno stress dall'intervento, *ripresa più rapida*"},
{id:"s29", tipo:"griglia", tema:"chiaro", colonne:1, spunta:true, sopratitolo:"Prima · niente preparazione intestinale di routine", celle:[
  {t:"**Informazione** accurata"}, {t:"**Niente digiuno prolungato**: liquidi chiari fino a **2 ore** prima", key:true}]},
{id:"s30", tipo:"cifre", tema:"chiaro", sopratitolo:"Il carico di carboidrati · una bevanda zuccherina la sera prima e due ore prima dell'intervento", voci:[
  {n:"2", suf:"ore", d:"prima: l'ultimo liquido chiaro", key:true}]},
{id:"s31", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Durante", celle:[
  {t:"**Normotermia**", key:true}, {t:"Liquidi somministrati in modo **mirato**"}, {t:"Analgesia **multimodale**, meno oppioidi"}, {t:"Profilassi della **nausea**"}]},
{id:"s32", tipo:"griglia", tema:"chiaro", colonne:1, spunta:true, sopratitolo:"Dopo · già nella giornata dell'intervento o in prima giornata", celle:[
  {t:"**Alimentazione** e **mobilizzazione** precoci", key:true}, {t:"Rimozione **precoce** di catetere, sondino e drenaggi"}]},

{id:"s33", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Meno complicanze, degenza più breve · l'infermiere è decisivo nel metterlo in pratica", celle:[
  {t:"Gestisce il **digiuno**"}, {t:"Fa **alzare** il paziente la sera stessa", key:true}, {t:"Avvia l'**alimentazione**"}, {t:"Controlla il **dolore** ed **educa**"}]},
{id:"s34", tipo:"trappola", tema:"chiaro", sopratitolo:"Abitudini radicate da abbandonare", righe:[
  {sb:"«Digiuno dalla mezzanotte» per tutti", ok:"Liquidi chiari fino a **2 ore** prima"},
  {sb:"«A letto per giorni, per sicurezza»", ok:"**Mobilizzazione precoce**"}]},
{id:"s35", tipo:"frase", tema:"chiaro", sopratitolo:"Ricordi la sindrome da immobilizzazione della lezione 3.2",
  testo:"Qui trova la sua **applicazione chirurgica**."},
{id:"s36", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Molte misure dell'ERAS coincidono con il bundle contro le infezioni del sito chirurgico · lezione 7.4", celle:[
  {t:"**Normotermia**"}, {t:"Profilassi entro **60 minuti**", key:true}, {t:"Controllo della **glicemia**"}]},

{id:"s37", tipo:"percorso", tema:"chiaro", sopratitolo:"Il percorso è una sequenza di passaggi", tappe:PASSAGGI},
{id:"s38", tipo:"griglia", tema:"chiaro", colonne:1, spunta:true, sopratitolo:"A ogni passaggio · è nei passaggi che le informazioni si perdono", celle:[
  {t:"Consegne strutturate: lo **SBAR** della lezione 2.7", key:true}, {t:"**Check-list di trasferimento**, con l'identificazione ripetuta"}]},
{id:"s39", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Chi riceve il paziente dalla sala risveglio verifica · la consegna si prende, non si subisce", celle:[
  {t:"**Identità**, intervento eseguito"}, {t:"**Parametri**, dolore", key:true}, {t:"**Drenaggi** e medicazione"}, {t:"**Terapia** prescritta"}]},

{id:"s40", tipo:"frase", tema:"chiaro", sopratitolo:"Il caso · al time out",
  testo:"Il chirurgo vuole procedere senza attendere la conferma della **profilassi antibiotica**, perché c'è fretta. Che cosa fai?"},
{id:"s41", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"Come coordinatore della check-list · la profilassi è efficace solo se somministrata prima", celle:[
  {n:"1", t:"**Segnali** che il punto non è stato verificato", key:true}, {n:"2", t:"Chiedi di **verificarlo prima dell'incisione**"}]},
{id:"s42", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"Se il chirurgo insiste · non è un conflitto di persone: è una barriera di sicurezza che si attiva", celle:[
  {n:"3", t:"**Documenti**"}, {n:"4", t:"Segui la **procedura aziendale**", key:true}]},
{id:"s43", tipo:"titolo", tema:"profondo",
  titolo:"La check-list esiste proprio per i momenti<br>in cui **c'è fretta**.",
  sotto:""},

{id:"s44", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"In Veneto", celle:[
  {n:"1", t:"La **check-list** in tutte le sale operatorie, con verifiche sulla compilazione", key:true}, {n:"2", t:"Percorsi **ERAS** attivi in diverse chirurgie: colorettale, ortopedica"}]},
{id:"s45", tipo:"frase", tema:"chiaro", sopratitolo:"All'orale · la check-list come strumento, le Raccomandazioni 2 e 3 come riferimento",
  testo:"La parola chiave è **sicurezza chirurgica**."},

{id:"s46", tipo:"tabella", tema:"chiaro", sopratitolo:"La sintesi",
  intestazioni:["","",""], colonne:["34%","33%","33%"],
  righe:[
   ["Strumentista **sterile**","Infermiere di sala **non sterile**","Infermiere di anestesia"],
   ["**Sign in** prima dell'induzione","**Time out** prima dell'incisione","**Sign out** prima dell'uscita"]]},
{id:"s47", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"La sintesi", celle:[
  {n:"2", t:"Raccomandazione: **ritenzione**"}, {n:"3", t:"Raccomandazione: **identificazione**", key:true}, {n:"2 h", t:"ERAS: liquidi chiari fino a"}, {n:"→", t:"ERAS: mobilizzazione e alimentazione **precoci**"}]},
{id:"s48", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"Le due frasi da portare all'orale", celle:[
  {n:"1", t:"Chi è sterile tocca **solo ciò che è sterile**"}, {n:"2", t:"La check-list esiste per i momenti in cui **c'è fretta**", key:true}]},
{id:"s49", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Nella prossima lezione · la preparazione all'intervento", celle:[
  {n:"1", t:"**Digiuno**"}, {n:"2", t:"**Tricotomia**"}, {n:"3", t:"**Profilassi**", key:true}, {n:"4", t:"Terapia domiciliare e **consenso**"}]},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione",
  titolo:"9.2<br>La preparazione all'intervento", sottotitolo:"Digiuno, tricotomia, profilassi, consenso",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
