// Contenuto delle 48 scene della lezione 12.4. *accento*  **accento in semibold**
//
// Corso «Progressione verticale · Comparto Sanità», Modulo 12. Le ultime quarantotto ore:
// che cosa ripassare, che cosa lasciare perdere, come si legge un quesito, il giorno della prova.
// Nessun bando AOUPD disponibile: modalità, durata e punteggio rimandano sempre al bando.

const ENTE = "CISL FP Padova Rovigo · Progressione verticale · Comparto Sanità";

const TRE_COSE = [
  "Nelle ultime quarantotto ore ripassa **in modo attivo** tre cose, date e distrattori, e **dormi**",
  "Leggi ogni quesito cercando **soggetto**, **verbo** e **negazioni**; elimina, e cerca la trappola tra le ultime due",
  "Controlla nel **bando** tempo, punteggio e materiali; arriva **in anticipo**, con i documenti pronti",
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 12 · La prova",
  titolo:"Le ultime quarantotto ore", sottotitolo:"Lezione 12.4", ente:ENTE},

// --- 1 · aggancio
{id:"s02", tipo:"illustrata", tema:"chiaro", ill:"cronometro", sopratitolo:"Due giorni alla prova",
  titolo:"Ricominciare **da capo**?", punti:[
    {icona:"libro", t:"undici materie **studiate**"},
    {icona:"avviso", t:"è l'errore **più comune**", key:true}],
  etichette:{}},
{id:"s03", tipo:"confronto", tema:"chiaro", sopratitolo:"Le ultime quarantotto ore", col:[
  {h:"Non servono", t:"a imparare cose **nuove**"},
  {h:"Servono", t:"a mettere in **ordine**, e arrivare **lucidi**", key:true}]},
{id:"s04", tipo:"titolo", tema:"profondo",
  titolo:"Nelle ultime ore non si **impara**:<br>si mette in **ordine**."},

// --- 2 · rotta
{id:"s05", tipo:"elenco", tema:"chiaro", numerato:true, grandi:true, sopratitolo:"Quattro passaggi", voci:[
  {t:"Che cosa **ripassare**"},
  {t:"Che cosa **lasciare perdere**"},
  {t:"Come si legge un **quesito**"},
  {t:"Il **giorno** della prova"}]},

// --- 3 · che cosa ripassare
{id:"s06", tipo:"illustrata", tema:"chiaro", ill:"schede", sopratitolo:"La prima cosa da ripassare",
  titolo:"Le **tre cose** di ogni lezione", punti:[
    {icona:"documento", t:"poche frasi per **lezione**"},
    {icona:"libro", t:"lo **scheletro** del corso, in un pomeriggio", key:true}],
  etichette:{}},
{id:"s07", tipo:"confronto", tema:"chiaro", sopratitolo:"La seconda: le sessanta date e numeri", col:[
  {h:"Ripetile", t:"ad **alta voce**"},
  {h:"Ognuna con il suo fatto", t:"una data da sola **scappa**", key:true}]},
{id:"s08", tipo:"frase", tema:"chiaro", sopratitolo:"La terza: i distrattori",
  testo:"Leggili così: **falso**, perché.",
  sotto:"Quattro o cinque per lezione: le frasi sbagliate che troverai nei quiz."},
{id:"s09", tipo:"illustrata", tema:"chiaro", ill:"lente", sopratitolo:"La quarta",
  titolo:"Le domande **sbagliate**", punti:[
    {icona:"spunta", t:"valgono più di quelle **giuste**"},
    {icona:"avviso", t:"dove la trappola ha **funzionato**", key:true}],
  etichette:{}},
{id:"s10", tipo:"confronto", tema:"chiaro", sopratitolo:"Nelle materie più lontane", col:[
  {h:"Fermati su", t:"tre cose e **distrattori**"},
  {h:"Non inseguire", t:"i dettagli mai **fissati**", key:true}]},
{id:"s11", tipo:"sostituzione", tema:"chiaro", sopratitolo:"Il ripasso utile è attivo",
  da:{h:"Rileggere", t:"la sensazione di sapere"},
  a:{h:"Ripassare", t:"copri, **rispondi**, controlla"}},
{id:"s12", tipo:"illustrata", tema:"chiaro", ill:"tavolo", sopratitolo:"Se puoi",
  titolo:"Ripassa con un **collega**", punti:[
    {icona:"persone", t:"interrogatevi **a turno**"},
    {icona:"chat", t:"spiegare **ad alta voce** scopre i vuoti", key:true}],
  etichette:{}},
{id:"s13", tipo:"confronto", tema:"chiaro", sopratitolo:"Un esempio di piano", col:[
  {h:"Primo giorno", t:"tre cose dei moduli **1-6**, poi dei **7-11**"},
  {h:"Secondo giorno", t:"date e distrattori, poi una **simulazione**", key:true}]},
{id:"s14", tipo:"trappola", tema:"tenue", sopratitolo:"Attenzione", righe:[
  {sb:"Rileggere tutto è ripassare",
   ok:"Ripassare è rispondere senza guardare"}]},
{id:"s15", tipo:"titolo", tema:"profondo",
  titolo:"Tre cose, numeri, distrattori:<br>lo **scheletro** basta."},

// --- 4 · che cosa lasciare perdere
{id:"s16", tipo:"illustrata", tema:"chiaro", ill:"imbuto", sopratitolo:"Che cosa lasciare perdere",
  titolo:"I materiali **nuovi**", punti:[
    {icona:"documento", t:"dispense **mai viste**"},
    {icona:"chat", t:"quiz **senza fonte**, catene di messaggi", key:true}],
  etichette:{}},
{id:"s17", tipo:"elenco", tema:"chiaro", vietato:true, sopratitolo:"Errori trovati nelle fonti in circolazione", voci:[
  {t:"Principi contabili contati come **diciassette**"},
  {t:"Entrate degli enti in **sei** titoli"},
  {t:"Date di codici **superati**"}]},
{id:"s18", tipo:"confronto", tema:"chiaro", sopratitolo:"I dettagli marginali", col:[
  {h:"Lascia perdere", t:"il **comma**, l'elenco parola per parola"},
  {h:"I quiz premiano", t:"il **concetto** giusto", key:true}]},
{id:"s19", tipo:"illustrata", tema:"chiaro", ill:"casa", sopratitolo:"E la notte sui libri",
  titolo:"Il **sonno** conta", punti:[
    {icona:"libro", t:"fissa quello che hai **studiato**"},
    {icona:"avviso", t:"la notte in bianco **toglie** più di quanto dia", key:true}],
  etichette:{}},
{id:"s20", tipo:"confronto", tema:"chiaro", sopratitolo:"Le cifre che cambiano", col:[
  {h:"Per esempio", t:"le **soglie** degli appalti"},
  {h:"Fidati di", t:"testo **vigente** e **bando**", key:true}]},
{id:"s21", tipo:"sostituzione", tema:"chiaro", sopratitolo:"Un esempio: il quiz trovato la sera prima",
  da:{h:"Il quiz in rete", t:"entrate in sei titoli"},
  a:{h:"Quello che sai", t:"ci sono anche **anticipazioni** e **conto terzi**"}},
{id:"s22", tipo:"trappola", tema:"tenue", sopratitolo:"Occhio", righe:[
  {sb:"Un quiz trovato in rete è una fonte affidabile",
   ok:"Ne abbiamo trovati diversi con risposte sbagliate"}]},
{id:"s23", tipo:"titolo", tema:"profondo",
  titolo:"Meno materiale, più **sonno**,<br>nessuna fonte **nuova**."},

// --- 5 · come si legge un quesito
{id:"s24", tipo:"illustrata", tema:"chiaro", ill:"lente", sopratitolo:"Durante la prova",
  titolo:"Leggi fino in **fondo**", punti:[
    {icona:"documento", t:"prima la domanda, poi le **risposte**"},
    {icona:"persona", t:"cerca **soggetto** e **verbo**", key:true}],
  etichette:{}},
{id:"s25", tipo:"tre", tema:"chiaro", sopratitolo:"Le negazioni", box:[
  {n:"", t:"non", d:"quale è falsa?"},
  {n:"", t:"tranne", d:"tutte, meno una"},
  {n:"", t:"fatta eccezione", d:"cerca l'intrusa", key:true}]},
{id:"s26", tipo:"catena", tema:"chiaro", sopratitolo:"Poi elimina", passi:[
  {t:"Quattro risposte"},
  {t:"Due si scartano", d:"subito"},
  {t:"Restano due"},
  {t:"Cerca la trappola", d:"data, numero, assoluto, soggetto", key:true}]},
{id:"s27", tipo:"confronto", tema:"chiaro", sopratitolo:"Leggi tutte e quattro le risposte", col:[
  {h:"Anche quando", t:"la prima **sembra giusta**"},
  {h:"La domanda chiede", t:"la **più corretta**, non una corretta", key:true}]},
{id:"s28", tipo:"illustrata", tema:"chiaro", ill:"cronometro", sopratitolo:"Il tempo",
  titolo:"Se una domanda ti **blocca**", punti:[
    {icona:"spunta", t:"segnala il numero e **passa**"},
    {icona:"orologio", t:"ci torni **alla fine**", key:true}],
  etichette:{}},
{id:"s29", tipo:"confronto", tema:"chiaro", sopratitolo:"Cambiare una risposta", col:[
  {h:"Sì", t:"per un **fatto preciso** che la smentisce"},
  {h:"No", t:"per una **sensazione** vaga", key:true}]},
{id:"s30", tipo:"confronto", tema:"chiaro", sopratitolo:"Controlla nel bando il punteggio", col:[
  {h:"Se le sbagliate tolgono punti", t:"in bianco può **convenire**"},
  {h:"Se non ne tolgono", t:"rispondi a **tutte**", key:true}]},
{id:"s31", tipo:"elenco", tema:"chiaro", marcatori:["A","B","C","D"], attive:[3],
  sopratitolo:"Quale non è un organo dell'azienda?", voci:[
  {t:"Direttore generale"},
  {t:"Collegio di direzione"},
  {t:"Collegio sindacale"},
  {t:"**Direttore sanitario**"}]},
{id:"s32", tipo:"trappola", tema:"tenue", sopratitolo:"Le doppie negazioni", righe:[
  {sb:"Una doppia negazione si capisce leggendo di corsa",
   ok:"Riformula la frase in positivo, poi rispondi"}]},
{id:"s33", tipo:"titolo", tema:"profondo",
  titolo:"**Soggetto**, verbo, negazione:<br>poi **elimina**."},

// --- 6 · il giorno della prova
{id:"s34", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"La sera prima", celle:[
  {t:"Documento d'**identità**"}, {t:"**Convocazione**"},
  {t:"Quello che chiede il **bando**"}, {t:"Indirizzo, **orario**, viaggio"}]},
{id:"s35", tipo:"illustrata", tema:"chiaro", ill:"calendario", sopratitolo:"La mattina",
  titolo:"Arriva con **anticipo**", punti:[
    {icona:"goccia", t:"una colazione **leggera**"},
    {icona:"orologio", t:"identificazione e istruzioni **richiedono tempo**", key:true}],
  etichette:{}},
{id:"s36", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Ascolta le istruzioni", celle:[
  {t:"Quanto **tempo** hai"}, {t:"Come si **segna** la risposta"}, {t:"Se si può **correggere**"}]},
{id:"s37", tipo:"tre", tema:"chiaro", sopratitolo:"Il tempo, in due giri", box:[
  {n:"1", t:"Primo giro", d:"tutto ciò che sai con sicurezza"},
  {n:"2", t:"Secondo giro", d:"le domande segnalate"},
  {n:"3", t:"Ultimi minuti", d:"nessuna saltata", key:true}]},
{id:"s38", tipo:"illustrata", tema:"chiaro", ill:"traguardo", sopratitolo:"Un po' di ansia è normale",
  titolo:"Respira e **vai avanti**", punti:[
    {icona:"occhio", t:"aiuta a restare **attenti**"},
    {icona:"spunta", t:"una domanda difficile **non decide** la prova", key:true}],
  etichette:{}},
{id:"s39", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Prima di consegnare", celle:[
  {t:"**Nome**"}, {t:"**Codice**"},
  {t:"**Firme**"}, {t:"**Etichette** richieste"}]},
{id:"s40", tipo:"illustrata", tema:"chiaro", ill:"schedina", sopratitolo:"Un esempio",
  titolo:"Una riga **saltata**", punti:[
    {icona:"cartella", t:"ricontrolla la **numerazione**"},
    {icona:"orologio", t:"meglio un minuto perso che dieci risposte **spostate**", key:true}],
  etichette:{}},
{id:"s41", tipo:"trappola", tema:"tenue", sopratitolo:"Occhio", righe:[
  {sb:"Le modalità della prova sono uguali per tutti i concorsi",
   ok:"Vale sempre quello che dice il bando"}]},
{id:"s42", tipo:"titolo", tema:"profondo",
  titolo:"Arriva **presto**, ascolta,<br>fai **due giri**."},

// --- 7 · le tre cose
{id:"s43", tipo:"memo", tema:"chiaro", attive:[0], sopratitolo:"Le tre cose da portare alla prova", voci:TRE_COSE},
{id:"s44", tipo:"memo", tema:"chiaro", attive:[0,1], sopratitolo:"Le tre cose da portare alla prova", voci:TRE_COSE},
{id:"s45", tipo:"memo", tema:"chiaro", attive:[0,1,2], sopratitolo:"Le tre cose da portare alla prova", voci:TRE_COSE},
{id:"s46", tipo:"trappola", tema:"tenue", sopratitolo:"L'ultimo distrattore", righe:[
  {sb:"Non so abbastanza",
   ok:"Hai attraversato undici materie: il lavoro è fatto"}]},

// --- 8 · chiusura
{id:"s47", tipo:"titolo", tema:"profondo",
  titolo:"**Ordine**, sonno<br>e attenzione alle **parole**.",
  sotto:"Qui si chiude il corso. Buona prova."},

{id:"s48", tipo:"copertina", tema:"profondo", modulo:"Fine del corso",
  titolo:"Buona prova", sottotitolo:"Progressione verticale · Comparto Sanità", ente:"CISL FP Padova Rovigo"},
];
