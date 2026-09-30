// Contenuto delle 47 scene della lezione 12.1. *accento*  **accento in semibold**
//
// Corso «Progressione verticale · Comparto Sanità», Modulo 12. Le trappole ricorrenti:
// date vicine, numeri simili, parole assolute, competenze scambiate. Esempi dai distrattori
// già verificati nei moduli 1-11.

const ENTE = "CISL FP Padova Rovigo · Progressione verticale · Comparto Sanità";

const TRE_COSE = [
  "Ogni data ha un **verbo**: nascita, **entrata in vigore**, **applicazione** e scadenza non sono la stessa cosa",
  "Una legge si riconosce da tre elementi insieme: **numero**, **anno** e **materia**; se ne cambia uno, la risposta è sbagliata",
  "Davanti a una parola **assoluta** cerca l'**eccezione**; davanti a un atto chiediti chi ne è il **titolare**",
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 12 · La prova",
  titolo:"Le trappole ricorrenti", sottotitolo:"Lezione 12.1", ente:ENTE},

// --- 1 · aggancio
{id:"s02", tipo:"illustrata", tema:"chiaro", ill:"amo", sopratitolo:"Una domanda da quiz",
  titolo:"Vero o **falso**?", punti:[
    {icona:"documento", t:"il GDPR è entrato in vigore il **25 maggio 2018**"},
    {icona:"avviso", t:"molti rispondono **vero**", key:true}],
  etichette:{}},
{id:"s03", tipo:"confronto", tema:"chiaro", sopratitolo:"È falso", col:[
  {h:"In vigore", t:"dal **2016**"},
  {h:"Si applica", t:"dal **25 maggio 2018**", key:true}]},
{id:"s04", tipo:"titolo", tema:"profondo",
  titolo:"Chi conosce la **trappola**,<br>non ci **cade**."},

// --- 2 · rotta
{id:"s05", tipo:"elenco", tema:"chiaro", numerato:true, grandi:true, sopratitolo:"Quattro trappole", voci:[
  {t:"Le **date** vicine"},
  {t:"I **numeri** simili"},
  {t:"Le parole **assolute**"},
  {t:"Le **competenze** scambiate"}]},

// --- 3 · le date vicine
{id:"s06", tipo:"tre", tema:"chiaro", sopratitolo:"Una norma, più momenti", box:[
  {n:"1", t:"Approvazione", d:"la norma nasce"},
  {n:"2", t:"Entrata in vigore", d:"la norma esiste"},
  {n:"3", t:"Applicazione", d:"la norma si usa", key:true}]},
{id:"s07", tipo:"tre", tema:"chiaro", cifre:true, sopratitolo:"Il codice dei contratti, decreto 36 del 2023", box:[
  {n:"Entra in vigore", t:"1 aprile", d:"2023"},
  {n:"Si applica", t:"1 luglio", d:"2023", key:true}]},
{id:"s08", tipo:"catena", tema:"chiaro", sopratitolo:"Nei bilanci", passi:[
  {t:"31 dicembre", d:"il preventivo, l'anno prima"},
  {t:"30 aprile", d:"il bilancio d'esercizio, l'anno dopo"},
  {t:"30 giugno", d:"il consolidato regionale", key:true}]},
{id:"s09", tipo:"catena", tema:"chiaro", sopratitolo:"Le sequenze del 1992", passi:[
  {t:"Maastricht", d:"febbraio"},
  {t:"Legge delega 421", d:"ottobre"},
  {t:"Decreto 502", d:"dicembre", key:true}]},
{id:"s10", tipo:"confronto", tema:"chiaro", sopratitolo:"Gli anni che si confondono", col:[
  {h:"Legge regionale 19", t:"ottobre **2016**"},
  {h:"Le nove ULSS", t:"dal **1° gennaio 2017**", key:true}],
  sotto:"L'hub and spoke nasce con il Piano del **2012**, non con quello del 2019."},
{id:"s11", tipo:"illustrata", tema:"chiaro", ill:"calendario", sopratitolo:"Il metodo",
  titolo:"Ogni data ha un **verbo**", punti:[
    {icona:"orologio", t:"nasce, entra in vigore, **si applica**"},
    {icona:"avviso", t:"verbo sbagliato: risposta **sbagliata**", key:true}],
  etichette:{}},
{id:"s12", tipo:"tre", tema:"chiaro", cifre:true, sopratitolo:"Un esempio: il codice della privacy", box:[
  {n:"Il codice", t:"2003"},
  {n:"In vigore", t:"2004"},
  {n:"Dopo il GDPR", t:"vigente", key:true}]},
{id:"s13", tipo:"trappola", tema:"tenue", sopratitolo:"Attenzione", righe:[
  {sb:"Per le date basta impararne di più",
   ok:"Lega ogni data al suo verbo e ai suoi fatti"}]},
{id:"s14", tipo:"titolo", tema:"profondo",
  titolo:"Ogni data ha un **verbo**:<br>nasce, entra in vigore, **si applica**."},

// --- 4 · i numeri simili
{id:"s15", tipo:"illustrata", tema:"chiaro", ill:"lente", sopratitolo:"La seconda trappola",
  titolo:"Numeri che si **somigliano**", punti:[
    {icona:"documento", t:"stesso numero, **anni diversi**"},
    {icona:"avviso", t:"numeri vicini, **materie lontane**", key:true}],
  etichette:{}},
{id:"s16", tipo:"confronto", tema:"chiaro", sopratitolo:"Il caso del 517", col:[
  {h:"Decreto 517 del 1993", t:"**corregge** il 502"},
  {h:"Decreto 517 del 1999", t:"le aziende ospedaliero **universitarie**", key:true}]},
{id:"s17", tipo:"confronto", tema:"chiaro", sopratitolo:"Le leggi gemelle del 1994", col:[
  {h:"Legge regionale 55", t:"programmazione e **conti**"},
  {h:"Legge regionale 56", t:"il **riordino**", key:true}],
  sotto:"La 55 del **1982** è un'altra legge."},
{id:"s18", tipo:"timeline", tema:"chiaro", sopratitolo:"Nella privacy", tappe:[
  {anno:"1996", et:"Legge 675"},
  {anno:"2003", et:"Il codice"},
  {anno:"2016", et:"Regolamento 679", key:true}]},
{id:"s19", tipo:"confronto", tema:"chiaro", sopratitolo:"Lavoro pubblico e sicurezza", col:[
  {h:"Lavoro pubblico", t:"**29/1993**, poi **165/2001**"},
  {h:"Sicurezza", t:"**626/1994**, poi **81/2008**", key:true}]},
{id:"s20", tipo:"confronto", tema:"chiaro", sopratitolo:"Appalti e contabilità", col:[
  {h:"Cause di esclusione", t:"artt. **94 e seguenti**, non l'80"},
  {h:"Armonizzazione", t:"**L. 42/2009** delega, **D.Lgs. 118/2011** attua", key:true}]},
{id:"s21", tipo:"sostituzione", tema:"chiaro", sopratitolo:"Un esempio: le aziende ospedaliero universitarie",
  da:{h:"Il quiz offre", t:"decreto 517 del **1993**"},
  a:{h:"La risposta giusta", t:"decreto 517 del **1999**"},
  sotto:"Il numero è giusto, l'anno no."},
{id:"s22", tipo:"trappola", tema:"tenue", sopratitolo:"Occhio", righe:[
  {sb:"Per riconoscere una legge basta il numero",
   ok:"Servono numero, anno e materia, insieme"}]},
{id:"s23", tipo:"titolo", tema:"profondo",
  titolo:"**Numero**, anno e **materia**:<br>sempre tutti e tre."},

// --- 5 · le parole assolute
{id:"s24", tipo:"illustrata", tema:"chiaro", ill:"cartello", sopratitolo:"La terza trappola",
  titolo:"Le parole **assolute**", punti:[
    {icona:"avviso", t:"sempre, mai, solo, tutti, **nessuno**"},
    {icona:"bilancia", t:"le regole hanno **eccezioni**", key:true}],
  etichette:{}},
{id:"s25", tipo:"confronto", tema:"chiaro", sopratitolo:"Non sono la regola", col:[
  {h:"Il silenzio assenso", t:"istanza di parte, **non per la salute**"},
  {h:"Il consenso", t:"una base **su sei**", key:true}]},
{id:"s26", tipo:"confronto", tema:"chiaro", sopratitolo:"Chi può chiedere", col:[
  {h:"Accesso documentale", t:"serve un **interesse** diretto"},
  {h:"Accesso civico", t:"**chiunque**, senza motivazione", key:true}]},
{id:"s27", tipo:"confronto", tema:"chiaro", sopratitolo:"Altri due assoluti da smontare", col:[
  {h:"Il diritto all'oblio", t:"cede alla **cartella clinica**"},
  {h:"I dispositivi di protezione", t:"l'**ultima** barriera", key:true}]},
{id:"s28", tipo:"frase", tema:"chiaro", sopratitolo:"A volte l'assoluto è giusto",
  testo:"Un contratto a termine irregolare non diventa **mai** un posto fisso nella PA.",
  sotto:"Qui il *mai* è corretto."},
{id:"s29", tipo:"confronto", tema:"chiaro", sopratitolo:"Quando l'assoluto è nella legge", col:[
  {h:"Esclusi dalla nozione di lavoratore", t:"solo i **servizi domestici** e familiari"},
  {h:"Il quiz", t:"lo **riprende** fedelmente", key:true}]},
{id:"s30", tipo:"sostituzione", tema:"chiaro", sopratitolo:"Un esempio: la sanzione da 500 a 10.000 euro",
  da:{h:"Il quiz", t:"per **ogni** omessa pubblicazione"},
  a:{h:"La norma", t:"soprattutto i dati dell'**art. 14**"}},
{id:"s31", tipo:"trappola", tema:"tenue", sopratitolo:"Attenzione", righe:[
  {sb:"Una parola assoluta rende sempre falsa la risposta",
   ok:"È un segnale: cerca l'eccezione"}]},
{id:"s32", tipo:"titolo", tema:"profondo",
  titolo:"Davanti a **sempre** e **mai**,<br>cerca l'eccezione."},

// --- 6 · le competenze scambiate
{id:"s33", tipo:"illustrata", tema:"chiaro", ill:"organigramma", sopratitolo:"La quarta trappola",
  titolo:"Ogni verbo ha il suo **titolare**", punti:[
    {icona:"persona", t:"nomina, **approva**"},
    {icona:"sigillo", t:"adotta, **presiede**", key:true}],
  etichette:{}},
{id:"s34", tipo:"catena", tema:"chiaro", sopratitolo:"Chi nomina chi", passi:[
  {t:"La Regione", d:"nomina il direttore generale"},
  {t:"Il direttore generale", d:"nomina DA e DS"},
  {t:"Nell'AOU", d:"Regione d'intesa con il Rettore", key:true}]},
{id:"s35", tipo:"confronto", tema:"chiaro", sopratitolo:"Chi adotta, chi approva", col:[
  {h:"Bilancio d'esercizio", t:"lo **adotta** il direttore generale"},
  {h:"Piano di Zona", t:"lo approva il **Comitato dei Sindaci**", key:true}]},
{id:"s36", tipo:"tre", tema:"chiaro", sopratitolo:"Chi presiede", box:[
  {n:"", t:"Consiglio dei sanitari", d:"il direttore sanitario"},
  {n:"", t:"Collegio di direzione", d:"il direttore generale"},
  {n:"", t:"Comitato dei DG", d:"il direttore dell'Area Sanità e Sociale", key:true}]},
{id:"s37", tipo:"confronto", tema:"chiaro", sopratitolo:"Sicurezza e privacy", col:[
  {h:"Il rappresentante per la sicurezza", t:"**eletto o designato** dai lavoratori"},
  {h:"La violazione dei dati", t:"la notifica il **titolare**", key:true}]},
{id:"s38", tipo:"confronto", tema:"chiaro", sopratitolo:"Pubblico impiego", col:[
  {h:"L'OIV", t:"valida la **relazione**, non il piano"},
  {h:"Il rimprovero verbale", t:"il **responsabile della struttura**", key:true}]},
{id:"s39", tipo:"sostituzione", tema:"chiaro", sopratitolo:"Un esempio: il DG di Azienda Zero",
  da:{h:"Non lo nomina", t:"la Giunta o il Consiglio"},
  a:{h:"Lo nomina", t:"il **Presidente** della Giunta regionale"}},
{id:"s40", tipo:"trappola", tema:"tenue", sopratitolo:"Occhio a un trucco frequente", righe:[
  {sb:"Il quiz attribuisce l'atto a un soggetto estraneo",
   ok:"Lo sposta sul soggetto vicino a quello giusto"}]},
{id:"s41", tipo:"titolo", tema:"profondo",
  titolo:"Ogni verbo ha il suo **titolare**:<br>chi nomina, chi **controlla**."},

// --- 7 · le tre cose
{id:"s42", tipo:"memo", tema:"chiaro", attive:[0], sopratitolo:"Le tre cose da portare alla prova", voci:TRE_COSE},
{id:"s43", tipo:"memo", tema:"chiaro", attive:[0,1], sopratitolo:"Le tre cose da portare alla prova", voci:TRE_COSE},
{id:"s44", tipo:"memo", tema:"chiaro", attive:[0,1,2], sopratitolo:"Le tre cose da portare alla prova", voci:TRE_COSE},
{id:"s45", tipo:"trappola", tema:"tenue", sopratitolo:"L'ultimo distrattore", righe:[
  {sb:"La risposta più lunga è di solito quella giusta",
   ok:"L'unica strategia che regge è conoscere la materia"}]},

// --- 8 · chiusura
{id:"s46", tipo:"titolo", tema:"profondo",
  titolo:"Le trappole si **ripetono**:<br>chi le riconosce **guadagna punti**.",
  sotto:"Prossima lezione: le sessanta date e numeri."},

{id:"s47", tipo:"copertina", tema:"profondo", modulo:"Prossima lezione",
  titolo:"Lezione 12.2", sottotitolo:"Le sessanta date e numeri", ente:ENTE},
];
