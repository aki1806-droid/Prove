// Contenuto delle 45 scene della lezione 12.3. *accento*  **accento in semibold**
//
// Corso «Progressione verticale · Comparto Sanità», Modulo 12. Simulazione commentata:
// trenta domande sulle undici materie. Tipo «quiz» (layout.mjs di questa lezione): a --rv,
// quando la voce dice la risposta, le opzioni sbagliate si spengono e la giusta si accende.

const ENTE = "CISL FP Padova Rovigo · Progressione verticale · Comparto Sanità";

const TRE_COSE = [
  "Quasi un terzo delle domande chiedeva **chi fa che cosa**: nomine, approvazioni, controlli, da ripassare **per soggetto**",
  "Molte altre chiedevano **date e termini**: 30 e 60 giorni, 72 ore, il 30 giugno",
  "Se una risposta ti ha sorpreso, torna alla **lezione** da cui viene: lì c'è il perché",
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 12 · La prova",
  titolo:"Simulazione commentata", sottotitolo:"Lezione 12.3", ente:ENTE},

// --- 1 · aggancio
{id:"s02", tipo:"illustrata", tema:"chiaro", ill:"schedina", sopratitolo:"Undici materie",
  titolo:"**Trenta** domande", punti:[
    {icona:"documento", t:"quattro risposte **sullo schermo**"},
    {icona:"orologio", t:"ferma il video e **scegli**", key:true}],
  etichette:{}},
{id:"s03", tipo:"confronto", tema:"chiaro", sopratitolo:"Per ogni domanda", col:[
  {h:"La lettera", t:"ti dice se hai **indovinato**"},
  {h:"Il perché", t:"ti fa riconoscere la **trappola**", key:true}]},
{id:"s04", tipo:"titolo", tema:"profondo",
  titolo:"Non conta **indovinare**:<br>conta sapere **perché**."},

// --- 2 · rotta
{id:"s05", tipo:"elenco", tema:"chiaro", numerato:true, grandi:true, sopratitolo:"Quattro serie", voci:[
  {t:"Sanità **nazionale** e Veneto"},
  {t:"Azienda, **procedimento**, trasparenza"},
  {t:"**Privacy**, lavoro pubblico, sicurezza"},
  {t:"Sicurezza, **appalti**, contabilità"}]},

// --- 3 · prima serie
{id:"s06", tipo:"quiz", tema:"chiaro", sopratitolo:"Domanda 1 · Sanità nazionale e Veneto", rv:4.3,
  domanda:"Quale legge istituisce le unità sanitarie locali?", giusta:1, opzioni:["D.Lgs. 502/1992", "L. 833/1978", "D.Lgs. 229/1999", "L. 421/1992"]},
{id:"s07", tipo:"quiz", tema:"chiaro", sopratitolo:"Domanda 2 · Sanità nazionale e Veneto", rv:5.11,
  domanda:"Chi nomina il direttore amministrativo?", giusta:2, opzioni:["La Regione", "La Conferenza dei sindaci", "Il direttore generale", "Il collegio di direzione"]},
{id:"s08", tipo:"quiz", tema:"chiaro", sopratitolo:"Domanda 3 · Sanità nazionale e Veneto", rv:4.92,
  domanda:"Che cosa dà diritto a essere pagati dal servizio sanitario?", giusta:2, opzioni:["L'autorizzazione", "L'accreditamento istituzionale", "L'accordo contrattuale", "L'iscrizione a un elenco regionale"]},
{id:"s09", tipo:"quiz", tema:"chiaro", sopratitolo:"Domanda 4 · Sanità nazionale e Veneto", rv:3.24,
  domanda:"Di quando sono i LEA vigenti?", giusta:0, opzioni:["12 gennaio 2017", "2001", "2012", "1999"]},
{id:"s10", tipo:"quiz", tema:"chiaro", sopratitolo:"Domanda 5 · Sanità nazionale e Veneto", rv:3.8,
  domanda:"Da quando le ULSS del Veneto sono nove?", giusta:3, opzioni:["25 ottobre 2016", "14 settembre 1994", "1° gennaio 2016", "1° gennaio 2017"]},
{id:"s11", tipo:"quiz", tema:"chiaro", sopratitolo:"Domanda 6 · Sanità nazionale e Veneto", rv:2.99,
  domanda:"Chi approva il Piano di Zona?", giusta:2, opzioni:["La Giunta regionale", "Il direttore generale della ULSS", "Il Comitato dei Sindaci del distretto", "Azienda Zero"]},
{id:"s12", tipo:"quiz", tema:"chiaro", sopratitolo:"Domanda 7 · Sanità nazionale e Veneto", rv:4.17,
  domanda:"Che cos'è la centrale operativa territoriale?", giusta:0, opzioni:["La centrale della continuità delle cure", "La centrale del 118", "Un ospedale di comunità", "Un distretto"]},
{id:"s13", tipo:"quiz", tema:"chiaro", sopratitolo:"Domanda 8 · Sanità nazionale e Veneto", rv:4.55,
  domanda:"Di che cosa si occupa la legge regionale 56 del 1994?", giusta:1, opzioni:["Programmazione e contabilità", "Il riordino del servizio sanitario regionale", "Azienda Zero", "La trasparenza"]},
{id:"s14", tipo:"titolo", tema:"profondo",
  titolo:"Otto domande,<br>e ogni errore ha la sua **trappola**."},

// --- 4 · seconda serie
{id:"s15", tipo:"quiz", tema:"chiaro", sopratitolo:"Domanda 9 · Azienda, procedimento, trasparenza", rv:5.8,
  domanda:"Chi nomina il DG di un'azienda ospedaliero universitaria?", giusta:3, opzioni:["Il Rettore", "Il Ministero della Salute", "L'organo di indirizzo", "La Regione, d'intesa con il Rettore"]},
{id:"s16", tipo:"quiz", tema:"chiaro", sopratitolo:"Domanda 10 · Azienda, procedimento, trasparenza", rv:3.05,
  domanda:"Chi adotta l'atto aziendale?", giusta:1, opzioni:["La Giunta regionale", "Il direttore generale", "Il Consiglio regionale", "Il collegio sindacale"]},
{id:"s17", tipo:"quiz", tema:"chiaro", sopratitolo:"Domanda 11 · Azienda, procedimento, trasparenza", rv:3.92,
  domanda:"Che cos'è una unità operativa semplice?", giusta:0, opzioni:["Una struttura dentro una complessa, senza budget autonomo", "Una struttura con budget proprio, che risponde al dipartimento", "Un organo dell'azienda", "Un dipartimento funzionale"]},
{id:"s18", tipo:"quiz", tema:"chiaro", sopratitolo:"Domanda 12 · Azienda, procedimento, trasparenza", rv:6.42,
  domanda:"Termine generale del procedimento, se nessuna norma ne fissa un altro?", giusta:1, opzioni:["10 giorni", "30 giorni", "60 giorni", "90 giorni"]},
{id:"s19", tipo:"quiz", tema:"chiaro", sopratitolo:"Domanda 13 · Azienda, procedimento, trasparenza", rv:3.42,
  domanda:"Quando vale il silenzio assenso?", giusta:3, opzioni:["Sempre: è la regola generale", "Solo negli atti d'ufficio", "Solo nelle materie sanitarie", "A istanza di parte, salvo le materie escluse"]},
{id:"s20", tipo:"quiz", tema:"chiaro", sopratitolo:"Domanda 14 · Azienda, procedimento, trasparenza", rv:4.24,
  domanda:"Che cosa serve per l'accesso documentale?", giusta:0, opzioni:["Un interesse diretto, concreto e attuale", "Niente: basta chiedere", "Essere dipendenti dell'ente", "L'autorizzazione del Garante"]},
{id:"s21", tipo:"quiz", tema:"chiaro", sopratitolo:"Domanda 15 · Azienda, procedimento, trasparenza", rv:5.74,
  domanda:"Per quanto restano pubblicati i dati in Amministrazione trasparente?", giusta:2, opzioni:["Un anno", "Tre anni", "Cinque anni, dal 1° gennaio successivo", "Per sempre"]},
{id:"s22", tipo:"quiz", tema:"chiaro", sopratitolo:"Domanda 16 · Azienda, procedimento, trasparenza", rv:4.42,
  domanda:"Chi può chiedere l'accesso civico generalizzato?", giusta:1, opzioni:["Solo chi ha un interesse personale", "Chiunque, senza motivazione", "Solo i giornalisti", "Solo i dipendenti"]},
{id:"s23", tipo:"titolo", tema:"profondo",
  titolo:"**Chi** chiede, **perché** chiede,<br>entro quando si **risponde**."},

// --- 5 · terza serie
{id:"s24", tipo:"quiz", tema:"chiaro", sopratitolo:"Domanda 17 · Privacy, lavoro pubblico, sicurezza", rv:6.05,
  domanda:"Da quando si applica il regolamento europeo sui dati?", giusta:3, opzioni:["27 aprile 2016", "1° gennaio 2004", "31 dicembre 1996", "25 maggio 2018"]},
{id:"s25", tipo:"quiz", tema:"chiaro", sopratitolo:"Domanda 18 · Privacy, lavoro pubblico, sicurezza", rv:5.8,
  domanda:"Su quale base un'azienda sanitaria pubblica tratta i dati per curare?", giusta:2, opzioni:["Il consenso", "Il legittimo interesse", "La finalità di cura, con il segreto professionale", "Un contratto con il paziente"]},
{id:"s26", tipo:"quiz", tema:"chiaro", sopratitolo:"Domanda 19 · Privacy, lavoro pubblico, sicurezza", rv:5.36,
  domanda:"Entro quando si notifica al Garante una violazione dei dati?", giusta:0, opzioni:["72 ore", "24 ore", "30 giorni", "Un mese"]},
{id:"s27", tipo:"quiz", tema:"chiaro", sopratitolo:"Domanda 20 · Privacy, lavoro pubblico, sicurezza", rv:5.17,
  domanda:"A quale giudice vanno le liti sul rapporto di lavoro pubblico?", giusta:1, opzioni:["Il TAR", "Il giudice ordinario", "La Corte dei conti", "L'ARAN"]},
{id:"s28", tipo:"quiz", tema:"chiaro", sopratitolo:"Domanda 21 · Privacy, lavoro pubblico, sicurezza", rv:3.74,
  domanda:"Quanto dura un incarico dirigenziale?", giusta:2, opzioni:["Da due a sette anni", "Un anno", "Da tre a cinque anni", "A tempo indeterminato"]},
{id:"s29", tipo:"quiz", tema:"chiaro", sopratitolo:"Domanda 22 · Privacy, lavoro pubblico, sicurezza", rv:3.55,
  domanda:"Chi decide il rimprovero verbale?", giusta:3, opzioni:["L'ufficio per i procedimenti disciplinari", "Il direttore generale", "La Giunta regionale", "Il responsabile della struttura"]},
{id:"s30", tipo:"quiz", tema:"chiaro", sopratitolo:"Domanda 23 · Privacy, lavoro pubblico, sicurezza", rv:5.42,
  domanda:"Chi sceglie il rappresentante dei lavoratori per la sicurezza?", giusta:0, opzioni:["I lavoratori", "Il datore di lavoro", "Il medico competente", "Il responsabile del servizio di prevenzione"]},
{id:"s31", tipo:"titolo", tema:"profondo",
  titolo:"Chi decide, chi nomina, chi risponde:<br>sempre la **stessa domanda**."},

// --- 6 · quarta serie
{id:"s32", tipo:"quiz", tema:"chiaro", sopratitolo:"Domanda 24 · Sicurezza, appalti, contabilità", rv:6.74,
  domanda:"Che posto hanno i dispositivi di protezione individuale tra le misure?", giusta:1, opzioni:["Il primo", "L'ultimo", "Sono facoltativi", "Li paga il lavoratore"]},
{id:"s33", tipo:"quiz", tema:"chiaro", sopratitolo:"Domanda 25 · Sicurezza, appalti, contabilità", rv:5.24,
  domanda:"Dove si ricorre contro il giudizio del medico competente?", giusta:2, opzioni:["Al datore di lavoro", "Al servizio di prevenzione", "All'organo di vigilanza, entro 30 giorni", "Al TAR"]},
{id:"s34", tipo:"quiz", tema:"chiaro", sopratitolo:"Domanda 26 · Sicurezza, appalti, contabilità", rv:5.36,
  domanda:"Qual è il criterio ordinario di aggiudicazione?", giusta:0, opzioni:["L'offerta economicamente più vantaggiosa", "Il minor prezzo", "Il sorteggio", "L'offerta più alta"]},
{id:"s35", tipo:"quiz", tema:"chiaro", sopratitolo:"Domanda 27 · Sicurezza, appalti, contabilità", rv:4.36,
  domanda:"Che cosa si può prestare con l'avvalimento?", giusta:3, opzioni:["I requisiti generali", "L'onorabilità", "L'offerta economica", "I requisiti speciali"]},
{id:"s36", tipo:"quiz", tema:"chiaro", sopratitolo:"Domanda 28 · Sicurezza, appalti, contabilità", rv:4.8,
  domanda:"Entro quanto pagano i fornitori le aziende sanitarie?", giusta:1, opzioni:["30 giorni", "60 giorni", "90 giorni", "120 giorni"]},
{id:"s37", tipo:"quiz", tema:"chiaro", sopratitolo:"Domanda 29 · Sicurezza, appalti, contabilità", rv:5.17,
  domanda:"Quanti sono i principi contabili generali del decreto 118?", giusta:2, opzioni:["12", "17", "18", "21"]},
{id:"s38", tipo:"quiz", tema:"chiaro", sopratitolo:"Domanda 30 · Sicurezza, appalti, contabilità", rv:6.3,
  domanda:"Entro quando la Giunta approva il consolidato sanitario?", giusta:0, opzioni:["30 giugno", "30 aprile", "31 maggio", "31 dicembre"]},
{id:"s39", tipo:"titolo", tema:"profondo",
  titolo:"Trenta domande,<br>le **trappole** sono sempre quelle."},

// --- 7 · le tre cose
{id:"s40", tipo:"memo", tema:"chiaro", attive:[0], sopratitolo:"Le tre cose da portare alla prova", voci:TRE_COSE},
{id:"s41", tipo:"memo", tema:"chiaro", attive:[0,1], sopratitolo:"Le tre cose da portare alla prova", voci:TRE_COSE},
{id:"s42", tipo:"memo", tema:"chiaro", attive:[0,1,2], sopratitolo:"Le tre cose da portare alla prova", voci:TRE_COSE},
{id:"s43", tipo:"trappola", tema:"tenue", sopratitolo:"L'ultimo distrattore", righe:[
  {sb:"Una simulazione andata bene chiude il ripasso",
   ok:"Ripeti le domande sbagliate, e controlla il perché"}]},

// --- 8 · chiusura
{id:"s44", tipo:"titolo", tema:"profondo",
  titolo:"Trenta domande,<br>e un **metodo** per le prossime.",
  sotto:"Ultima lezione: le ultime quarantotto ore."},

{id:"s45", tipo:"copertina", tema:"profondo", modulo:"Ultima lezione",
  titolo:"Lezione 12.4", sottotitolo:"Le ultime quarantotto ore", ente:ENTE},
];
