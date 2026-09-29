// Contenuto delle 48 scene della lezione 10.1. *accento*  **accento in semibold**
//
// Corso «Progressione verticale · Comparto Sanità», Modulo 10. Il cambio di paradigma del 2023:
// D.Lgs. 36/2023 artt. 1-12 (principi), allegati; L. 78/2022; D.Lgs. 50/2016; D.Lgs. 209/2024.

const ENTE = "CISL FP Padova Rovigo · Progressione verticale · Comparto Sanità";

const TRE_COSE = [
  "Il nuovo codice è il **D.Lgs. 36/2023**: in vigore dal **1° aprile**, applicabile dal **1° luglio 2023**",
  "È **autoapplicativo**: le regole di dettaglio sono negli **allegati**; digitalizzazione operativa dal **2024**",
  "I principi guida: **risultato**, **fiducia**, **accesso al mercato**; le altre norme si leggono alla loro luce",
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 10 · Appalti pubblici",
  titolo:"Il cambio di paradigma del 2023", sottotitolo:"Lezione 10.1", ente:ENTE},

// --- 1 · aggancio
{id:"s02", tipo:"illustrata", tema:"chiaro", ill:"carrello", sopratitolo:"Un acquisto urgente",
  titolo:"Letti per la **terapia intensiva**", punti:[
    {icona:"orologio", t:"servono in **fretta**"},
    {icona:"spunta", t:"devono essere **buoni**"},
    {icona:"euro", t:"a un prezzo **giusto**", key:true}],
  etichette:{alto:{t:"Quale regola prima?", key:true}}},
{id:"s03", tipo:"sostituzione", tema:"chiaro", sopratitolo:"Il cambio di risposta",
  da:{h:"Per anni", t:"la procedura: carte perfette, letti in ritardo"},
  a:{h:"Dal 2023", t:"prima di tutto, il **risultato**"}},
{id:"s04", tipo:"titolo", tema:"profondo",
  titolo:"Dalla **procedura** come fine<br>al **risultato** come fine."},

// --- 2 · rotta
{id:"s05", tipo:"elenco", tema:"chiaro", numerato:true, grandi:true, sopratitolo:"Quattro passaggi", voci:[
  {t:"I problemi del **vecchio codice**"},
  {t:"Come nasce il **codice del 2023**"},
  {t:"**Risultato**, **fiducia**, **accesso al mercato**"},
  {t:"Gli **altri principi**"}]},

// --- 3 · i problemi del vecchio codice
{id:"s06", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Gli appalti pubblici: l'amministrazione acquista", celle:[
  {t:"**Lavori**"}, {t:"**Beni**"}, {t:"**Servizi**"}]},
{id:"s07", tipo:"icone", tema:"chiaro", sopratitolo:"Dalle direttive europee", voci:[
  {icona:"persone", t:"**Concorrenza**"},
  {icona:"bilancia", t:"**Parità** di trattamento"},
  {icona:"occhio", t:"**Trasparenza**"}]},
{id:"s08", tipo:"assetempo", tema:"chiaro", sopratitolo:"I codici che si sono succeduti",
  da:1990, a:2020, decenni:[2000,2010,2020], tappe:[
  {anno:1994, et:"Legge quadro sui lavori pubblici"},
  {anno:2006, et:"Primo codice dei contratti"},
  {anno:2016, et:"D.Lgs. 50 — le direttive 2014", key:true}]},
{id:"s09", tipo:"confronto", tema:"chiaro", sopratitolo:"Il codice del 2016", col:[
  {h:"Rinviava a", t:"linee guida e a un **regolamento** mai completato"},
  {h:"Il risultato", t:"un sistema **frammentato**", key:true}]},
{id:"s10", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Modificato decine di volte", celle:[
  {t:"**Correttivi**"}, {t:"**Sblocca** cantieri"}, {t:"Semplificazioni **PNRR**"}]},
{id:"s11", tipo:"catena", tema:"chiaro", sopratitolo:"La burocrazia difensiva", passi:[
  {t:"Regole instabili"},
  {t:"Timore di sbagliare"},
  {t:"Più carte, più pareri"},
  {t:"Meno decisioni", key:true}]},
{id:"s12", tipo:"catena", tema:"chiaro", sopratitolo:"Un esempio", passi:[
  {t:"Richieste inutili"},
  {t:"Poche imprese"},
  {t:"Tempi lunghi"},
  {t:"Il reparto aspetta", key:true}]},
{id:"s13", tipo:"trappola", tema:"tenue", sopratitolo:"Occhio a un distrattore", righe:[
  {sb:"Si studia ancora il codice del 2016",
   ok:"Dal 1° luglio 2023 vale il D.Lgs. 36/2023"}]},
{id:"s14", tipo:"titolo", tema:"profondo",
  titolo:"Troppe regole instabili<br>producono **paura**, non **legalità**."},

// --- 4 · il codice del 2023
{id:"s15", tipo:"flusso", tema:"chiaro", sopratitolo:"Come nasce", passi:[
  {icona:"libro", t:"2022", d:"la legge delega"},
  {icona:"giudice", t:"Consiglio di Stato", d:"scrive il testo"},
  {icona:"sigillo", t:"2023", d:"il nuovo codice", key:true}]},
{id:"s16", tipo:"confronto", tema:"chiaro", sopratitolo:"D.Lgs. 31 marzo 2023, n. 36", col:[
  {h:"In vigore", t:"dal **1° aprile 2023**"},
  {h:"Si applica", t:"dal **1° luglio 2023**", key:true}]},
{id:"s17", tipo:"illustrata", tema:"chiaro", ill:"sito", sopratitolo:"Dal 1° gennaio 2024",
  titolo:"La **digitalizzazione**", punti:[
    {icona:"ingranaggio", t:"piattaforme **telematiche**"},
    {icona:"cartella", t:"banca dati **nazionale**"},
    {icona:"documento", t:"fascicolo digitale dell'**impresa**", key:true}],
  etichette:{}},
{id:"s18", tipo:"confronto", tema:"chiaro", sopratitolo:"Un codice autoapplicativo", col:[
  {h:"Non serve", t:"un **regolamento**"},
  {h:"Le regole di dettaglio", t:"negli **allegati**, parte del codice", key:true}]},
{id:"s19", tipo:"griglia", tema:"chiaro", colonne:5, spunta:false, sopratitolo:"I libri del codice", celle:[
  {t:"**Principi** e parti comuni"}, {t:"Settori **ordinari**"}, {t:"Settori **speciali**"}, {t:"**Partenariato** e concessioni"}, {t:"**Contenzioso** e finali"}]},
{id:"s20", tipo:"catena", tema:"chiaro", sopratitolo:"Le fasi del contratto", passi:[
  {t:"Programmazione"},
  {t:"Progettazione"},
  {t:"Scelta del contraente"},
  {t:"Esecuzione", key:true}]},
{id:"s21", tipo:"confronto", tema:"chiaro", sopratitolo:"Fine 2024: il correttivo", col:[
  {h:"Ha ritoccato", t:"molti **articoli**"},
  {h:"Non ha cambiato", t:"l'**impostazione**", key:true}]},
{id:"s22", tipo:"illustrata", tema:"chiaro", ill:"sito", sopratitolo:"Un esempio",
  titolo:"La gara per i **letti**", punti:[
    {icona:"ingranaggio", t:"su una piattaforma **certificata**"},
    {icona:"cartella", t:"i dati nella banca dati **nazionale**", key:true}],
  etichette:{}},
{id:"s23", tipo:"trappola", tema:"tenue", sopratitolo:"Attenzione", righe:[
  {sb:"Il codice aspetta un regolamento attuativo",
   ok:"Le regole di dettaglio sono negli allegati"}]},
{id:"s24", tipo:"titolo", tema:"profondo",
  titolo:"Un codice che si applica **da solo**,<br>allegati compresi."},

// --- 5 · risultato, fiducia, accesso al mercato
{id:"s25", tipo:"norma", tema:"chiaro", etichetta:"D.Lgs. 36/2023, art. 1", sigla:"Art. 1",
  testo:"Il **risultato**: affidare ed eseguire il contratto con la massima **tempestività** e il miglior rapporto **qualità-prezzo**."},
{id:"s26", tipo:"confronto", tema:"chiaro", sopratitolo:"Il risultato", col:[
  {h:"Nel rispetto di", t:"**legalità**, trasparenza, concorrenza"},
  {h:"Diventa", t:"il criterio della **discrezionalità**", key:true}]},
{id:"s27", tipo:"norma", tema:"chiaro", etichetta:"D.Lgs. 36/2023, art. 2", sigla:"Art. 2",
  testo:"La **fiducia** nell'azione legittima, trasparente e corretta dell'amministrazione, dei **funzionari** e delle **imprese**."},
{id:"s28", tipo:"icone", tema:"chiaro", sopratitolo:"Per valorizzare l'iniziativa dei funzionari", voci:[
  {icona:"bilancia", t:"**Colpa grave** delimitata"},
  {icona:"scudo", t:"**Coperture** assicurative"}]},
{id:"s29", tipo:"norma", tema:"chiaro", etichetta:"D.Lgs. 36/2023, art. 3", sigla:"Art. 3",
  testo:"L'**accesso al mercato**: favorire la partecipazione delle imprese, con **concorrenza**, imparzialità e **proporzionalità**."},
{id:"s30", tipo:"confronto", tema:"chiaro", sopratitolo:"Art. 4 · il criterio interpretativo", col:[
  {h:"Le altre norme", t:"si interpretano e si applicano"},
  {h:"Alla luce", t:"dei **primi tre principi**", key:true}]},
{id:"s31", tipo:"catena", tema:"chiaro", sopratitolo:"Torniamo ai letti", passi:[
  {t:"Requisiti sproporzionati"},
  {t:"Poche imprese"},
  {t:"Consegna in ritardo"},
  {t:"Due principi traditi", key:true}]},
{id:"s32", tipo:"trappola", tema:"tenue", sopratitolo:"Un distrattore frequente", righe:[
  {sb:"Il risultato autorizza a violare le regole",
   ok:"Il risultato si persegue nella legalità"}]},
{id:"s33", tipo:"titolo", tema:"profondo",
  titolo:"Risultato, fiducia, mercato:<br>la **bussola** del codice."},

// --- 6 · gli altri principi
{id:"s34", tipo:"illustrata", tema:"chiaro", ill:"stretta", sopratitolo:"Art. 5",
  titolo:"Buona fede e **affidamento**", punti:[
    {icona:"persone", t:"amministrazione e imprese **corrette**"},
    {icona:"documento", t:"anche prima della **firma**", key:true}],
  etichette:{}},
{id:"s35", tipo:"confronto", tema:"chiaro", sopratitolo:"Artt. 6 e 7", col:[
  {h:"Solidarietà e sussidiarietà", t:"con il **terzo settore**"},
  {h:"Auto organizzazione", t:"fare da sé o **affidare**", key:true}]},
{id:"s36", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"Artt. 8-10", celle:[
  {t:"Autonomia **contrattuale**"}, {t:"Equilibrio del **contratto**"}, {t:"Esclusioni **tassative**"}]},
{id:"s37", tipo:"illustrata", tema:"chiaro", ill:"firma", sopratitolo:"Art. 11",
  titolo:"Il contratto collettivo di **settore**", punti:[
    {icona:"persone", t:"per il **personale** degli appalti"},
    {icona:"ospedale", t:"indicato dalla **stazione appaltante**", key:true}],
  etichette:{alto:{t:"CCNL", key:true}}},
{id:"s38", tipo:"confronto", tema:"chiaro", sopratitolo:"Regole trasversali", col:[
  {h:"Art. 16", t:"i **conflitti di interesse**"},
  {h:"Art. 28", t:"la **trasparenza** di tutto il ciclo", key:true}]},
{id:"s39", tipo:"confronto", tema:"chiaro", sopratitolo:"Art. 49 · sotto soglia, la rotazione", col:[
  {h:"Di regola, niente", t:"commessa consecutiva al **contraente uscente**"},
  {h:"Se la commessa è", t:"dello **stesso settore**", key:true}]},
{id:"s40", tipo:"illustrata", tema:"chiaro", ill:"ospedale", sopratitolo:"Un esempio",
  titolo:"Le **pulizie** dell'ospedale", punti:[
    {icona:"documento", t:"nel bando il **contratto collettivo**"},
    {icona:"persone", t:"a tutela di chi lavora nei **reparti**", key:true}],
  etichette:{}},
{id:"s41", tipo:"trappola", tema:"tenue", sopratitolo:"Attenzione", righe:[
  {sb:"Ogni bando può inventare le sue cause di esclusione",
   ok:"Sono tassative: solo quelle del codice"}]},
{id:"s42", tipo:"titolo", tema:"profondo",
  titolo:"Principi chiari per decisioni<br>più **libere** e più **responsabili**."},

// --- 7 · le tre cose
{id:"s43", tipo:"memo", tema:"chiaro", attive:[0], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s44", tipo:"memo", tema:"chiaro", attive:[0,1], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s45", tipo:"memo", tema:"chiaro", attive:[0,1,2], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s46", tipo:"trappola", tema:"tenue", sopratitolo:"L'ultimo distrattore", righe:[
  {sb:"La fiducia elimina i controlli",
   ok:"Valorizza l'autonomia, dentro legalità e trasparenza"}]},

// --- 8 · chiusura
{id:"s47", tipo:"titolo", tema:"profondo",
  titolo:"Meno burocrazia **difensiva**,<br>più **risultato**, più **fiducia**.",
  sotto:"Prossima lezione: appalto, concessione, ambito."},

{id:"s48", tipo:"copertina", tema:"profondo", modulo:"Prossima lezione",
  titolo:"Lezione 10.2", sottotitolo:"Appalto, concessione, ambito", ente:ENTE},
];
