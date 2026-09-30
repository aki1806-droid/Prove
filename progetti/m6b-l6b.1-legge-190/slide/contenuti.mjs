// Contenuto delle 48 scene della lezione 6b.1. *accento*  **accento in semibold**
//
// Corso «Progressione verticale · Comparto Sanità», Modulo 6-bis, Anticorruzione. La legge 190 e il
// sistema di prevenzione: L. 190/2012 art. 1 cc. 1-4, 2-bis, 7, 46, 49-51, 59; D.L. 101/2013 e
// D.L. 90/2014 (ANAC); PNA 2013, aggiornamento 2015, PNA 2022; D.Lgs. 33/2013, 39/2013, DPR 62/2013.

const ENTE = "CISL FP Padova Rovigo · Progressione verticale · Comparto Sanità";

const TRE_COSE = [
  "La **L. 190/2012** affianca alla repressione penale un sistema di **prevenzione**, per tutte le PA, **aziende sanitarie** comprese",
  "Per la prevenzione, corruzione è ogni uso di un **potere pubblico** per un **interesse privato**, anche quando **non è reato**",
  "L'**ANAC** adotta il **PNA** e vigila; nel 2013: **33** trasparenza, **39** incarichi, **DPR 62** comportamento",
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 6-bis · Anticorruzione",
  titolo:"La legge 190<br>e il sistema di prevenzione", sottotitolo:"Lezione 6b.1", ente:ENTE},

// --- 1 · aggancio
{id:"s02", tipo:"illustrata", tema:"chiaro", ill:"amo", sopratitolo:"Una gara per le protesi",
  titolo:"Scritta su **misura**", punti:[
    {icona:"documento", t:"per un **solo** fornitore"},
    {icona:"euro", t:"nessuna tangente, **nessun reato** scoperto"},
    {icona:"avviso", t:"eppure qualcosa si è **già rotto**", key:true}],
  etichette:{}},
{id:"s03", tipo:"confronto", tema:"chiaro", sopratitolo:"Il cambio di prospettiva", col:[
  {h:"Per decenni", t:"si interviene **dopo**, con il processo penale"},
  {h:"Dalla legge 190 del 2012", t:"si previene **prima**, dentro l'organizzazione", key:true}]},
{id:"s04", tipo:"titolo", tema:"profondo",
  titolo:"La corruzione non si **punisce** soltanto:<br>si **previene**."},

// --- 2 · rotta
{id:"s05", tipo:"elenco", tema:"chiaro", numerato:true, grandi:true, sopratitolo:"Quattro passaggi", voci:[
  {t:"Perché una legge sulla **prevenzione**"},
  {t:"Che cosa intende per **corruzione**"},
  {t:"Gli **attori** nazionali"},
  {t:"I **decreti** che completano il sistema"}]},

// --- 3 · perché
{id:"s06", tipo:"norma", tema:"chiaro", etichetta:"Legge 6 novembre 2012, n. 190", sigla:"L. 190/2012",
  testo:"Disposizioni per la **prevenzione** e la **repressione** della corruzione e dell'illegalità nella pubblica amministrazione."},
{id:"s07", tipo:"timeline", tema:"chiaro", sopratitolo:"Art. 1, c. 1 · gli obblighi internazionali", tappe:[
  {anno:"1999", et:"Convenzione penale di **Strasburgo**"},
  {anno:"2003", et:"Convenzione **ONU** contro la corruzione"},
  {anno:"2012", et:"Legge **190**", key:true}]},
{id:"s08", tipo:"confronto", tema:"chiaro", sopratitolo:"Il doppio binario", col:[
  {h:"Repressione penale", t:"interviene **dopo** il fatto"},
  {h:"Prevenzione amministrativa", t:"lavora **prima**, sull'organizzazione", key:true}]},
{id:"s09", tipo:"icone", tema:"chiaro", sopratitolo:"Quattro strumenti, uno per lezione", voci:[
  {icona:"libro", t:"Il piano **nazionale**"},
  {icona:"documento", t:"Il piano di ogni **amministrazione**"},
  {icona:"persona", t:"Un **responsabile** interno"},
  {icona:"occhio", t:"La **trasparenza**", key:true}]},
{id:"s10", tipo:"confronto", tema:"chiaro", sopratitolo:"Un modello decentrato", col:[
  {h:"Nazionali", t:"regole e **indirizzi**"},
  {h:"Di ogni amministrazione", t:"analisi dei **rischi** e scelta delle **misure**", key:true}],
  sotto:"Non esiste un piano valido per tutti."},
{id:"s11", tipo:"illustrata", tema:"chiaro", ill:"ospedale", sopratitolo:"A chi si applica · art. 1, c. 59",
  titolo:"Tutte le **PA** del decreto 165", punti:[
    {icona:"ospedale", t:"aziende **sanitarie** e ospedaliere"},
    {icona:"cappello", t:"aziende ospedaliero **universitarie**", key:true}],
  etichette:{}},
{id:"s12", tipo:"confronto", tema:"chiaro", sopratitolo:"Un esempio: il capitolato su misura", col:[
  {h:"Non è ancora", t:"corruzione in senso **penale**"},
  {h:"Ma è", t:"un **rischio** che il piano deve prevenire", key:true}]},
{id:"s13", tipo:"trappola", tema:"tenue", sopratitolo:"Attenzione", righe:[
  {sb:"La legge 190 è soltanto una legge penale",
   ok:"La sua parte più ampia riguarda la prevenzione"}]},
{id:"s14", tipo:"titolo", tema:"profondo",
  titolo:"Due binari: **reprimere** dopo,<br>**prevenire** prima."},

// --- 4 · che cosa è corruzione
{id:"s15", tipo:"icone", tema:"chiaro", sopratitolo:"Non solo i reati del codice penale", voci:[
  {icona:"giudice", t:"Corruzione per un atto **contrario** ai doveri"},
  {icona:"divieto", t:"**Concussione**"},
  {icona:"occhio", t:"E molto altro", key:true}]},
{id:"s16", tipo:"frase", tema:"chiaro", sopratitolo:"La nozione del Piano nazionale",
  testo:"Ogni situazione in cui un **potere pubblico** viene usato per un **interesse privato**.",
  sotto:"La chiama anche **cattiva amministrazione**."},
{id:"s17", tipo:"elenco", tema:"chiaro", sopratitolo:"Anche quando non è reato", voci:[
  {t:"una pratica che si **ferma** senza motivo"},
  {t:"un'**assunzione** pilotata"},
  {t:"un **conflitto** di interessi taciuto"},
  {t:"un **favore** a un conoscente"}]},
{id:"s18", tipo:"confronto", tema:"chiaro", sopratitolo:"Dove guarda la prevenzione", col:[
  {h:"Non alle persone", t:"chi è **colpevole**"},
  {h:"Ai processi", t:"dove un potere **potrebbe** essere piegato, e con quali **controlli** lo si impedisce", key:true}]},
{id:"s19", tipo:"icone", tema:"chiaro", sopratitolo:"Negli appalti: eventi rischiosi prima di ogni tangente", voci:[
  {icona:"avviso", t:"Un requisito tecnico **troppo stretto**"},
  {icona:"orologio", t:"Una **proroga** ripetuta senza gara"},
  {icona:"certificato", t:"Un **collaudo** firmato senza verifiche", key:true}]},
{id:"s20", tipo:"illustrata", tema:"chiaro", ill:"clessidra", sopratitolo:"Un esempio in ospedale",
  titolo:"La lista d'**attesa**", punti:[
    {icona:"persona", t:"un paziente spostato **avanti** per amicizia"},
    {icona:"euro", t:"nessun **denaro**: non c'è reato"},
    {icona:"avviso", t:"ma è **uso privato** di un potere pubblico", key:true}],
  etichette:{}},
{id:"s21", tipo:"trappola", tema:"tenue", sopratitolo:"Occhio al distrattore", righe:[
  {sb:"La prevenzione riguarda solo i reati accertati da un giudice",
   ok:"Riguarda anche la cattiva amministrazione"}]},
{id:"s22", tipo:"titolo", tema:"profondo",
  titolo:"Un potere **pubblico**<br>piegato a un interesse **privato**."},

// --- 5 · gli attori nazionali
{id:"s23", tipo:"sigla", tema:"chiaro", sopratitolo:"Il primo attore", lettere:[
  {l:"A", p:"Autorità"}, {l:"N", p:"Nazionale"}, {l:"A", p:"Anti"}, {l:"C", p:"Corruzione", key:true}]},
{id:"s24", tipo:"timeline", tema:"chiaro", sopratitolo:"Come nasce l'ANAC", tappe:[
  {anno:"2012", et:"La L. 190 affida il ruolo alla **CIVIT**"},
  {anno:"2013", et:"Prende il nome di **ANAC**"},
  {anno:"2014", et:"Riceve le funzioni sui **contratti pubblici**", key:true}]},
{id:"s25", tipo:"icone", tema:"chiaro", sopratitolo:"Art. 1, cc. 2-3 · che cosa fa l'ANAC", voci:[
  {icona:"libro", t:"Adotta il **PNA**"},
  {icona:"scudo", t:"**Vigila** su misure e trasparenza"},
  {icona:"occhio", t:"Poteri **ispettivi**"},
  {icona:"sigillo", t:"**Ordina** atti o la rimozione di comportamenti", key:true}]},
{id:"s26", tipo:"illustrata", tema:"chiaro", ill:"calendario", sopratitolo:"Art. 1, c. 2, lett. g",
  titolo:"Entro il **31 dicembre**", punti:[
    {icona:"documento", t:"una **relazione** al Parlamento"},
    {icona:"bilancia", t:"attività di contrasto ed **efficacia** delle norme", key:true}],
  etichette:{}},
{id:"s27", tipo:"tre", tema:"chiaro", sopratitolo:"Il Piano nazionale anticorruzione, PNA", box:[
  {n:"1", t:"Triennale", d:"e aggiornato"},
  {n:"2", t:"Atto di indirizzo", d:"per tutte le PA"},
  {n:"3", t:"Si adatta", d:"alla realtà di ogni ente", key:true}]},
{id:"s28", tipo:"catena", tema:"chiaro", sopratitolo:"Art. 1, c. 2-bis · come si adotta", passi:[
  {t:"Sentiti", d:"Comitato interministeriale e Conferenza unificata"},
  {t:"L'ANAC adotta", d:"il PNA"},
  {t:"Contenuto", d:"rischi, rimedi, obiettivi e tempi", key:true}]},
{id:"s29", tipo:"timeline", tema:"chiaro", sopratitolo:"Il PNA e la sanità", tappe:[
  {anno:"2013", et:"Il primo **PNA**"},
  {anno:"2015", et:"Approfondimento sulla **sanità**"},
  {anno:"2022", et:"PNA approvato a inizio **2023**", key:true}]},
{id:"s30", tipo:"illustrata", tema:"chiaro", ill:"timone", sopratitolo:"Art. 1, c. 4 · il secondo attore",
  titolo:"Dipartimento della **funzione pubblica**", punti:[
    {icona:"ingranaggio", t:"**coordina** le strategie di prevenzione"},
    {icona:"libro", t:"definisce **metodologie** comuni"},
    {icona:"persone", t:"criteri per la **rotazione** dei dirigenti", key:true}],
  etichette:{}},
{id:"s31", tipo:"tre", tema:"chiaro", sopratitolo:"Gli altri presidi", box:[
  {n:"", t:"Magistratura", d:"i reati"},
  {n:"", t:"Corte dei conti", d:"il danno erariale"},
  {n:"", t:"OIV", d:"dentro ogni ente", key:true}]},
{id:"s32", tipo:"trappola", tema:"tenue", sopratitolo:"Attenzione", righe:[
  {sb:"L'ANAC nasce nel 2014",
   ok:"La prevede già la L. 190 del 2012; nel 2014 si aggiungono gli appalti"}]},
{id:"s33", tipo:"titolo", tema:"profondo",
  titolo:"L'ANAC **indirizza** e vigila,<br>ogni amministrazione si **organizza**."},

// --- 6 · i decreti
{id:"s34", tipo:"illustrata", tema:"chiaro", ill:"documento", sopratitolo:"Le deleghe della legge 190",
  titolo:"Tre testi del **2013**", punti:[
    {icona:"libro", t:"che ogni candidato deve **conoscere**", key:true}],
  etichette:{}},
{id:"s35", tipo:"tre", tema:"chiaro", attive:[0], sopratitolo:"I tre testi del 2013", box:[
  {n:"D.Lgs. 33", t:"Trasparenza", d:"è essa stessa prevenzione"},
  {n:"D.Lgs. 39", t:"Incarichi", d:"inconferibilità e incompatibilità"},
  {n:"DPR 62", t:"Comportamento", d:"aggiornato nel 2023"}]},
{id:"s36", tipo:"tre", tema:"chiaro", attive:[0,1], sopratitolo:"I tre testi del 2013", box:[
  {n:"D.Lgs. 33", t:"Trasparenza", d:"è essa stessa prevenzione"},
  {n:"D.Lgs. 39", t:"Incarichi", d:"inconferibilità e incompatibilità"},
  {n:"DPR 62", t:"Comportamento", d:"aggiornato nel 2023"}]},
{id:"s37", tipo:"tre", tema:"chiaro", attive:[0,1,2], sopratitolo:"I tre testi del 2013", box:[
  {n:"D.Lgs. 33", t:"Trasparenza", d:"è essa stessa prevenzione"},
  {n:"D.Lgs. 39", t:"Incarichi", d:"inconferibilità e incompatibilità"},
  {n:"DPR 62", t:"Comportamento", d:"aggiornato nel 2023", key:true}]},
{id:"s38", tipo:"confronto", tema:"chiaro", sopratitolo:"E nel decreto 165", col:[
  {h:"Art. 35-bis", t:"niente **commissioni** per chi è condannato per reati contro la PA"},
  {h:"Art. 54-bis", t:"la prima tutela di chi **segnala** illeciti", key:true}]},
{id:"s39", tipo:"confronto", tema:"chiaro", sopratitolo:"Sul versante penale", col:[
  {h:"L. 3/2019, «spazzacorrotti»", t:"pene più **severe** per i reati contro la PA"},
  {h:"È", t:"**repressione**, non prevenzione", key:true}]},
{id:"s40", tipo:"sostituzione", tema:"chiaro", sopratitolo:"Un esempio: DA condannato in primo grado per peculato",
  da:{h:"Non lo vieta", t:"il decreto **33**"},
  a:{h:"Lo vieta", t:"il decreto **39** del 2013"},
  sotto:"Gli incarichi sono materia del 39."},
{id:"s41", tipo:"trappola", tema:"tenue", sopratitolo:"Occhio", righe:[
  {sb:"Il decreto 39 riguarda la trasparenza",
   ok:"Il 33 è la trasparenza, il 39 gli incarichi"}]},
{id:"s42", tipo:"titolo", tema:"profondo",
  titolo:"**33** trasparenza, **39** incarichi,<br>**62** comportamento."},

// --- 7 · le tre cose
{id:"s43", tipo:"memo", tema:"chiaro", attive:[0], sopratitolo:"Le tre cose da portare alla prova", voci:TRE_COSE},
{id:"s44", tipo:"memo", tema:"chiaro", attive:[0,1], sopratitolo:"Le tre cose da portare alla prova", voci:TRE_COSE},
{id:"s45", tipo:"memo", tema:"chiaro", attive:[0,1,2], sopratitolo:"Le tre cose da portare alla prova", voci:TRE_COSE},
{id:"s46", tipo:"trappola", tema:"tenue", sopratitolo:"L'ultimo distrattore", righe:[
  {sb:"Il Piano nazionale sostituisce i piani delle amministrazioni",
   ok:"Li orienta: ognuna scrive il proprio"}]},

// --- 8 · chiusura
{id:"s47", tipo:"titolo", tema:"profondo",
  titolo:"**Prevenire** prima,<br>con regole **comuni**.",
  sotto:"Prossima lezione: il piano e la gestione del rischio."},

{id:"s48", tipo:"copertina", tema:"profondo", modulo:"Prossima lezione",
  titolo:"Lezione 6b.2", sottotitolo:"Il piano e la gestione del rischio", ente:ENTE},
];
