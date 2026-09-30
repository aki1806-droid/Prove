// Contenuto delle 49 scene della lezione 12.2. *accento*  **accento in semibold**
//
// Corso «Progressione verticale · Comparto Sanità», Modulo 12. Le sessanta date e numeri,
// in quattro gruppi; le voci vengono dalle «tre cose» e dai distrattori dei moduli 1-11.

const ENTE = "CISL FP Padova Rovigo · Progressione verticale · Comparto Sanità";

const TRE_COSE = [
  "Ogni data si ricorda con il suo **fatto**: 1978 il servizio, 1992 le aziende, 2016 **Azienda Zero** e il **GDPR**",
  "I termini tornano: **30 giorni** nel procedimento, nell'accesso, nel disciplinare e nella sicurezza; **30 aprile** e **31 dicembre** in ogni bilancio",
  "Soglie e termini degli **appalti** cambiano nel tempo: controlla le cifre vigenti sul **bando** e sui testi aggiornati",
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 12 · La prova",
  titolo:"Le sessanta date e numeri", sottotitolo:"Lezione 12.2", ente:ENTE},

// --- 1 · aggancio
{id:"s02", tipo:"illustrata", tema:"chiaro", ill:"schede", sopratitolo:"In una prova a quiz",
  titolo:"Date, numeri, **termini**", punti:[
    {icona:"avviso", t:"si sbagliano **per un soffio**"},
    {icona:"spunta", t:"si preparano **con certezza**", key:true}],
  etichette:{}},
{id:"s03", tipo:"numero", tema:"chiaro", sopratitolo:"Da centinaia a poche",
  cifra:"60", testo:"date e numeri da sapere **a memoria**"},
{id:"s04", tipo:"titolo", tema:"profondo",
  titolo:"**Sessanta** numeri,<br>e ognuno con la sua **storia**."},

// --- 2 · rotta
{id:"s05", tipo:"elenco", tema:"chiaro", numerato:true, grandi:true, sopratitolo:"Quattro gruppi", voci:[
  {t:"La sanità **nazionale**"},
  {t:"Il **Veneto** e l'azienda"},
  {t:"Procedimento, trasparenza, **privacy**"},
  {t:"Lavoro, sicurezza, **appalti**, conti"}]},

// --- 3 · la sanità nazionale
{id:"s06", tipo:"elenco", tema:"chiaro", numerato:true, da:1, sopratitolo:"La sanità nazionale", voci:[
  {t:"**833/1978**", d:"nasce il servizio sanitario nazionale"},
  {t:"**Febbraio 1992**", d:"il Trattato di Maastricht"},
  {t:"**L. 421/1992**", d:"la legge delega"}]},
{id:"s07", tipo:"elenco", tema:"chiaro", numerato:true, da:4, sopratitolo:"La sanità nazionale", voci:[
  {t:"**D.Lgs. 502/1992**", d:"dicembre: le aziende sanitarie"},
  {t:"**D.Lgs. 517/1993**", d:"corregge il 502"},
  {t:"**D.Lgs. 229/1999**", d:"la riforma che introduce i LEA"}]},
{id:"s08", tipo:"elenco", tema:"chiaro", numerato:true, da:7, sopratitolo:"La sanità nazionale", voci:[
  {t:"**3-5 anni**", d:"il contratto del direttore generale"},
  {t:"**2001**", d:"primo elenco dei LEA e Titolo V"}]},
{id:"s09", tipo:"elenco", tema:"chiaro", numerato:true, da:9, sopratitolo:"La sanità nazionale", voci:[
  {t:"**12 gennaio 2017**", d:"i LEA vigenti"},
  {t:"**3 macroaree**", d:"prevenzione, distrettuale, ospedaliera"}]},
{id:"s10", tipo:"elenco", tema:"chiaro", numerato:true, da:11, sopratitolo:"La sanità nazionale", voci:[
  {t:"**D.Lgs. 68/2011**", d:"i costi standard nel riparto"},
  {t:"**3 organi**", d:"DG, collegio di direzione, collegio sindacale"}]},
{id:"s11", tipo:"timeline", tema:"chiaro", sopratitolo:"Raccontale come una storia", tappe:[
  {anno:"1978", et:"nasce il servizio"},
  {anno:"1992", et:"diventa azienda"},
  {anno:"1999", et:"si completa"},
  {anno:"2001", et:"Stato e Regioni", key:true}]},
{id:"s12", tipo:"trappola", tema:"tenue", sopratitolo:"Attenzione", righe:[
  {sb:"C'è un solo decreto 517 da ricordare",
   ok:"Del 1993 corregge il 502; del 1999 le aziende universitarie"}]},
{id:"s13", tipo:"titolo", tema:"profondo",
  titolo:"**Settantotto**, novantadue, novantanove:<br>la sanità in **tre anni**."},

// --- 4 · il Veneto e l'azienda
{id:"s14", tipo:"elenco", tema:"chiaro", numerato:true, da:13, sopratitolo:"Il Veneto e l'azienda", voci:[
  {t:"**14 settembre 1994**", d:"le leggi regionali 55 e 56"},
  {t:"**L.R. 19 · 25 ottobre 2016**", d:"istituisce Azienda Zero"}]},
{id:"s15", tipo:"elenco", tema:"chiaro", numerato:true, da:15, sopratitolo:"Il Veneto e l'azienda", voci:[
  {t:"**1° gennaio 2017**", d:"le ULSS da 21 a 9"},
  {t:"**30 settembre**", d:"la relazione annuale della Giunta al Consiglio"}]},
{id:"s16", tipo:"elenco", tema:"chiaro", numerato:true, da:17, sopratitolo:"Il Veneto e l'azienda", voci:[
  {t:"**31 dicembre**", d:"il bilancio preventivo dell'anno dopo"},
  {t:"**30 aprile**", d:"il bilancio d'esercizio dell'anno chiuso"}]},
{id:"s17", tipo:"elenco", tema:"chiaro", numerato:true, da:19, sopratitolo:"Il Veneto e l'azienda", voci:[
  {t:"**5 hub**", d:"bacino di circa un milione di abitanti"},
  {t:"**4 reti**", d:"emergenza, cardiologia, trauma, ictus"}]},
{id:"s18", tipo:"elenco", tema:"chiaro", numerato:true, da:21, sopratitolo:"Il Veneto e l'azienda", voci:[
  {t:"**4-6 settimane**", d:"la degenza nelle cure intermedie"},
  {t:"**DGR 1306/2017**", d:"l'atto aziendale nel Veneto"}]},
{id:"s19", tipo:"elenco", tema:"chiaro", numerato:true, da:23, sopratitolo:"Il Veneto e l'azienda", voci:[
  {t:"**D.Lgs. 171/2016**", d:"elenco nazionale dei DG, verifica a 24 mesi"},
  {t:"**D.Lgs. 517/1999**", d:"le aziende ospedaliero universitarie"}]},
{id:"s20", tipo:"timeline", tema:"chiaro", sopratitolo:"Il modello veneto", tappe:[
  {anno:"1994", et:"fonda"},
  {anno:"2016", et:"riorganizza"},
  {anno:"2017", et:"rende operativo", key:true}]},
{id:"s21", tipo:"titolo", tema:"profondo",
  titolo:"**Novantaquattro** fonda,<br>duemilasedici **riorganizza**."},

// --- 5 · procedimento, trasparenza, privacy
{id:"s22", tipo:"elenco", tema:"chiaro", numerato:true, da:25, sopratitolo:"Procedimento, trasparenza, privacy", voci:[
  {t:"**L. 241 · 7 agosto 1990**", d:"il procedimento amministrativo"},
  {t:"**30 giorni**", d:"termine generale; fino a 90, e 180"}]},
{id:"s23", tipo:"elenco", tema:"chiaro", numerato:true, da:27, sopratitolo:"Procedimento, trasparenza, privacy", voci:[
  {t:"**1 sospensione**", d:"per non più di 30 giorni"},
  {t:"**10 giorni**", d:"osservazioni dopo il preavviso di rigetto"}]},
{id:"s24", tipo:"elenco", tema:"chiaro", numerato:true, da:29, sopratitolo:"Procedimento, trasparenza, privacy", voci:[
  {t:"**1 anno**", d:"per ricorrere contro il silenzio"},
  {t:"**10 e 30 giorni**", d:"accesso documentale: opposizione e conclusione"}]},
{id:"s25", tipo:"elenco", tema:"chiaro", numerato:true, da:31, sopratitolo:"Procedimento, trasparenza, privacy", voci:[
  {t:"**L. 190/2012**", d:"anticorruzione"},
  {t:"**D.Lgs. 33/2013**", d:"trasparenza"},
  {t:"**D.Lgs. 97/2016**", d:"l'accesso civico generalizzato"}]},
{id:"s26", tipo:"elenco", tema:"chiaro", numerato:true, da:34, sopratitolo:"Procedimento, trasparenza, privacy", voci:[
  {t:"**5 anni**", d:"di pubblicazione, dal 1° gennaio successivo"},
  {t:"**20 giorni**", d:"il riesame del responsabile della trasparenza"}]},
{id:"s27", tipo:"elenco", tema:"chiaro", numerato:true, da:36, sopratitolo:"Procedimento, trasparenza, privacy", voci:[
  {t:"**500-10.000 euro**", d:"sanzione per alcuni obblighi di pubblicazione"},
  {t:"**L. 675 · 31 dicembre 1996**", d:"la prima legge sulla privacy"}]},
{id:"s28", tipo:"elenco", tema:"chiaro", numerato:true, da:38, sopratitolo:"Procedimento, trasparenza, privacy", voci:[
  {t:"**Codice 2003**", d:"in vigore dal 2004"},
  {t:"**Reg. UE 2016/679**", d:"27 aprile 2016; si applica dal 25 maggio 2018"}]},
{id:"s29", tipo:"elenco", tema:"chiaro", numerato:true, da:40, sopratitolo:"Procedimento, trasparenza, privacy", voci:[
  {t:"**72 ore**", d:"per notificare una violazione dei dati"},
  {t:"**1 mese (+2)**", d:"per rispondere ai diritti dell'interessato"}]},
{id:"s30", tipo:"elenco", tema:"chiaro", numerato:true, da:42, sopratitolo:"Procedimento, trasparenza, privacy", voci:[
  {t:"**10 mln / 2% · 20 mln / 4%**", d:"i due livelli delle sanzioni"}]},
{id:"s31", tipo:"trappola", tema:"tenue", sopratitolo:"Due termini gemelli", righe:[
  {sb:"Anche la richiesta FOIA va motivata",
   ok:"Dieci giorni ai controinteressati in entrambi; motiva solo il documentale"}]},
{id:"s32", tipo:"titolo", tema:"profondo",
  titolo:"**Trenta giorni** per decidere,<br>settantadue ore per **avvisare**."},

// --- 6 · lavoro, sicurezza, appalti, conti
{id:"s33", tipo:"elenco", tema:"chiaro", numerato:true, da:43, sopratitolo:"Lavoro, sicurezza, appalti, conti", voci:[
  {t:"**D.Lgs. 29/1993**", d:"avvia la privatizzazione"},
  {t:"**D.Lgs. 165/2001**", d:"la riordina"}]},
{id:"s34", tipo:"elenco", tema:"chiaro", numerato:true, da:45, sopratitolo:"Lavoro, sicurezza, appalti, conti", voci:[
  {t:"**3-5 anni**", d:"l'incarico dirigenziale"},
  {t:"**30 · 20 · 120 giorni**", d:"disciplinare: contestazione, preavviso, conclusione"}]},
{id:"s35", tipo:"elenco", tema:"chiaro", numerato:true, da:47, sopratitolo:"Lavoro, sicurezza, appalti, conti", voci:[
  {t:"**6 mesi**", d:"la sospensione massima dal servizio"},
  {t:"**31 gennaio · 30 giugno**", d:"piano e relazione della performance"}]},
{id:"s36", tipo:"elenco", tema:"chiaro", numerato:true, da:49, sopratitolo:"Lavoro, sicurezza, appalti, conti", voci:[
  {t:"**D.Lgs. 81 · 9 aprile 2008**", d:"la sicurezza sul lavoro"},
  {t:"**Direttiva quadro 1989**", d:"recepita dal D.Lgs. 626/1994"}]},
{id:"s37", tipo:"elenco", tema:"chiaro", numerato:true, da:51, sopratitolo:"Lavoro, sicurezza, appalti, conti", voci:[
  {t:"**30 giorni**", d:"rielaborare il DVR; ricorrere contro il medico competente"},
  {t:"**Oltre 15 lavoratori**", d:"la riunione periodica annuale"}]},
{id:"s38", tipo:"elenco", tema:"chiaro", numerato:true, da:53, sopratitolo:"Lavoro, sicurezza, appalti, conti", voci:[
  {t:"**D.Lgs. 36/2023**", d:"in vigore 1° aprile, si applica dal 1° luglio"},
  {t:"**140.000 euro**", d:"sotto questa soglia, affidamento diretto"}]},
{id:"s39", tipo:"elenco", tema:"chiaro", numerato:true, da:55, sopratitolo:"Lavoro, sicurezza, appalti, conti", voci:[
  {t:"**5 inviti**", d:"almeno, nella procedura negoziata"},
  {t:"**30 punti**", d:"al massimo al prezzo, con l'offerta più vantaggiosa"}]},
{id:"s40", tipo:"elenco", tema:"chiaro", numerato:true, da:57, sopratitolo:"Lavoro, sicurezza, appalti, conti", voci:[
  {t:"**60 giorni**", d:"i pagamenti delle aziende sanitarie"},
  {t:"**L. 42/2009 · D.Lgs. 118/2011**", d:"l'armonizzazione dei bilanci"}]},
{id:"s41", tipo:"elenco", tema:"chiaro", numerato:true, da:59, sopratitolo:"Lavoro, sicurezza, appalti, conti", voci:[
  {t:"**18 principi**", d:"contabili generali"},
  {t:"**30 giugno**", d:"la Giunta approva il consolidato sanitario"}]},
{id:"s42", tipo:"trappola", tema:"tenue", sopratitolo:"Occhio", righe:[
  {sb:"Centoquarantamila euro valgono anche per i lavori",
   ok:"Per i lavori 150.000; e le soglie cambiano ogni due anni"}]},
{id:"s43", tipo:"titolo", tema:"profondo",
  titolo:"**Trenta**, sessanta, centoventi:<br>i giorni che **contano**."},

// --- 7 · le tre cose
{id:"s44", tipo:"memo", tema:"chiaro", attive:[0], sopratitolo:"Le tre cose da portare alla prova", voci:TRE_COSE},
{id:"s45", tipo:"memo", tema:"chiaro", attive:[0,1], sopratitolo:"Le tre cose da portare alla prova", voci:TRE_COSE},
{id:"s46", tipo:"memo", tema:"chiaro", attive:[0,1,2], sopratitolo:"Le tre cose da portare alla prova", voci:TRE_COSE},
{id:"s47", tipo:"trappola", tema:"tenue", sopratitolo:"L'ultimo distrattore", righe:[
  {sb:"Il GDPR è del 2018",
   ok:"È del 2016; dal 2018 si applica"}]},

// --- 8 · chiusura
{id:"s48", tipo:"titolo", tema:"profondo",
  titolo:"Sessanta numeri,<br>legati ai loro **fatti**.",
  sotto:"Prossima lezione: la simulazione commentata."},

{id:"s49", tipo:"copertina", tema:"profondo", modulo:"Prossima lezione",
  titolo:"Lezione 12.3", sottotitolo:"Simulazione commentata", ente:ENTE},
];
