// Contenuto delle 50 scene della lezione 6.3. *accento*  **accento in semibold**
//
// Corso «Progressione verticale · Comparto Sanità», Modulo 6. L'accesso civico semplice:
// D.Lgs. 33/2013 art. 5 cc. 1, 3, 4, 6, 7, 10, 11; art. 43 cc. 4-5; confronto con L. 241/1990.

const ENTE = "CISL FP Padova Rovigo · Progressione verticale · Comparto Sanità";

const TRE_COSE = [
  "Riguarda solo dati e documenti a **pubblicazione obbligatoria** non pubblicati",
  "**Chiunque**, **senza motivazione**, **gratis**: ufficio che detiene i dati, URP, altro ufficio indicato o **RPCT**",
  "**30 giorni**: il dato si **pubblica** e si comunica il collegamento; poi **riesame RPCT** e giudice",
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 6 · Trasparenza nella pubblica amministrazione",
  titolo:"Accesso civico<br>semplice", sottotitolo:"Lezione 6.3", ente:ENTE},

// --- 1 · aggancio
{id:"s02", tipo:"illustrata", tema:"chiaro", ill:"sito", sopratitolo:"Cerchi i tassi di assenza del personale",
  titolo:"La pagina è **vuota**", punti:[
    {icona:"orologio", t:"oppure ferma a **due anni fa**"},
    {icona:"avviso", t:"eppure quel dato **andava pubblicato**", key:true}],
  etichette:{barra:"Amministrazione trasparente", menu:{t:"Personale", key:true}}},
{id:"s03", tipo:"tre", tema:"chiaro", attive:[0,1,2], sopratitolo:"Puoi chiederlo", box:[
  {n:"1", t:"Senza motivare", d:"non spieghi perché"},
  {n:"2", t:"Senza pagare", d:"è gratuito"},
  {n:"3", t:"Senza interesse", d:"non devi essere coinvolto"}]},
{id:"s04", tipo:"illustrata", tema:"chiaro", ill:"porta", sopratitolo:"E l'amministrazione non risponde solo a te",
  titolo:"Il dato va sul **sito**", punti:[
    {icona:"persone", t:"a disposizione di **tutti**", key:true}],
  etichette:{alto:{t:"Per tutti", key:true}}},
{id:"s05", tipo:"titolo", tema:"profondo",
  titolo:"Se doveva essere **pubblicato**,<br>chiunque può **pretenderlo**."},

// --- 2 · rotta
{id:"s06", tipo:"flusso", tema:"chiaro", sopratitolo:"Quattro passaggi", passi:[
  {icona:"cartella", t:"Che cosa", d:"si può chiedere"},
  {icona:"persone", t:"Chi, come", d:"e a chi"},
  {icona:"orologio", t:"Tempi", d:"e rimedi"},
  {icona:"bilancia", t:"Il confronto", d:"con la 241", key:true}]},

// --- 3 · che cosa si può chiedere
{id:"s07", tipo:"norma", tema:"chiaro", etichetta:"D.Lgs. 33/2013, art. 5, c. 1", sigla:"Diritto di chiunque",
  testo:"Richiedere dati e documenti a pubblicazione obbligatoria, se la pubblicazione è stata **omessa**."},
{id:"s08", tipo:"illustrata", tema:"chiaro", ill:"lente", sopratitolo:"Un oggetto preciso",
  titolo:"Solo ciò che è **obbligatorio**", punti:[
    {icona:"libro", t:"ciò che la legge obbliga a **pubblicare**"},
    {icona:"avviso", t:"risposta a un **inadempimento**", key:true}],
  etichette:{titolo:{t:"Obbligo non rispettato", key:true}}},
{id:"s09", tipo:"flusso", tema:"chiaro", sopratitolo:"Il principio", passi:[
  {icona:"libro", t:"La legge", d:"impone di pubblicare"},
  {icona:"divieto", t:"Sul sito", d:"non c'è"},
  {icona:"chat", t:"Il cittadino", d:"lo chiede subito", key:true}]},
{id:"s10", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"Vale anche se la pubblicazione è", celle:[
  {t:"**Omessa**"}, {t:"**Incompleta**"}, {t:"**Non aggiornata**"}]},
{id:"s11", tipo:"icone", tema:"chiaro", sopratitolo:"Qualche esempio in sanità", voci:[
  {icona:"orologio",  t:"Tempi medi di **attesa**"},
  {icona:"ospedale",  t:"Strutture **accreditate**"},
  {icona:"euro",      t:"Compensi dei **consulenti**"},
  {icona:"bilancia",  t:"Criteri di un **concorso**"}]},
{id:"s12", tipo:"confronto", tema:"chiaro", sopratitolo:"Due strumenti diversi", col:[
  {h:"Dati da pubblicare", t:"accesso civico **semplice**", key:true},
  {h:"Tutti gli altri dati", t:"accesso civico **generalizzato**: prossima lezione"}]},
{id:"s13", tipo:"trappola", tema:"tenue", sopratitolo:"Occhio a un distrattore", righe:[
  {sb:"L'accesso civico semplice riguarda qualsiasi documento",
   ok:"Solo dati e documenti a pubblicazione obbligatoria non pubblicati"}]},
{id:"s14", tipo:"titolo", tema:"profondo",
  titolo:"Un obbligo **mancato**<br>fa scattare un diritto **di tutti**."},

// --- 4 · chi, come e a chi
{id:"s15", tipo:"illustrata", tema:"chiaro", ill:"comunita", sopratitolo:"Chi può chiedere",
  titolo:"**Chiunque**", punti:[
    {icona:"persone", t:"cittadini, associazioni, **giornalisti**"},
    {icona:"persona", t:"anche i **dipendenti**", key:true}],
  etichette:{alto:{t:"Nessun limite", key:true}}},
{id:"s16", tipo:"confronto", tema:"chiaro", sopratitolo:"Il requisito della 241 qui non vale", col:[
  {h:"Non serve", t:"un interesse diretto, concreto e attuale"},
  {h:"Basta", t:"la **richiesta**", key:true}]},
{id:"s17", tipo:"illustrata", tema:"chiaro", ill:"busta", sopratitolo:"Nessuna motivazione",
  titolo:"Non si chiede il **perché**", punti:[
    {icona:"divieto", t:"l'ufficio non può chiedere il **motivo**", key:true},
    {icona:"bilancia", t:"né valutare se è **buono**"}],
  etichette:{sx:"Ufficio", dx:"Cittadino", alto:{t:"Senza motivo", key:true}}},
{id:"s18", tipo:"confronto", tema:"chiaro", sopratitolo:"Anche per via telematica", col:[
  {h:"Posta certificata", t:"la **PEC**"},
  {h:"Modulo online", t:"secondo il **codice** dell'amministrazione digitale"}]},
{id:"s19", tipo:"illustrata", tema:"chiaro", ill:"documento", sopratitolo:"Nessun modulo obbligatorio",
  titolo:"Basta essere **chiari**", punti:[
    {icona:"documento", t:"indicare il **dato** o il documento che manca", key:true},
    {icona:"cartella", t:"molte aziende offrono un **modello**"}],
  etichette:{titolo:"Richiesta", sigillo:{t:"Chiara", key:true}}},
{id:"s20", tipo:"rete", tema:"chiaro", sopratitolo:"A chi si presenta",
  centro:"Richiesta", dcentro:"accesso civico", nodi:[
  {t:"Ufficio che detiene i dati", icona:"cartella"}, {t:"URP", icona:"chat"},
  {t:"Altro ufficio indicato", icona:"ospedale"}, {t:"RPCT", icona:"scudo", key:true}],
  inizio:-Math.PI/4, rx:540, ry:230},
{id:"s21", tipo:"sigla", tema:"chiaro", sopratitolo:"Per i dati a pubblicazione obbligatoria, anche", lettere:[
  {l:"R", p:"Responsabile"}, {l:"P", p:"Prevenzione"}, {l:"C", p:"Corruzione"}, {l:"T", p:"Trasparenza", key:true}]},
{id:"s22", tipo:"contatore", tema:"chiaro", sopratitolo:"Il costo",
  valori:[{n:0, t:"euro per il rilascio", key:true}],
  sotto:"Solo il **rimborso** del costo effettivo di riproduzione su supporti materiali."},
{id:"s23", tipo:"trappola", tema:"tenue", sopratitolo:"Attenzione", righe:[
  {sb:"L'amministrazione può respingere una richiesta non motivata",
   ok:"Nell'accesso civico il motivo non si chiede: il rifiuto sarebbe illegittimo"}]},
{id:"s24", tipo:"titolo", tema:"profondo",
  titolo:"Chiunque può chiedere:<br>senza **motivare**, senza **pagare**."},

// --- 5 · tempi e risposta
{id:"s25", tipo:"contatore", tema:"chiaro", sopratitolo:"Art. 5, c. 6",
  valori:[{n:30, t:"giorni per un provvedimento espresso e motivato", key:true}]},
{id:"s26", tipo:"flusso", tema:"chiaro", sopratitolo:"Se il dato era da pubblicare", passi:[
  {icona:"chat", t:"Richiesta"},
  {icona:"occhio", t:"Pubblicazione", d:"sul sito"},
  {icona:"chat", t:"Collegamento", d:"al richiedente", key:true}]},
{id:"s27", tipo:"illustrata", tema:"chiaro", ill:"vetro", sopratitolo:"La richiesta di uno",
  titolo:"Ripara per **tutti**", punti:[
    {icona:"persone", t:"il dato torna disponibile alla **collettività**", key:true}],
  etichette:{alto:{t:"Di nuovo pubblico", key:true}}},
{id:"s28", tipo:"illustrata", tema:"chiaro", ill:"faro", sopratitolo:"Art. 5, c. 10 · una conseguenza interna",
  titolo:"L'RPCT **segnala**", punti:[
    {icona:"avviso", t:"l'**inadempimento** dell'obbligo di pubblicare", key:true}],
  etichette:{alto:{t:"RPCT", key:true}}},
{id:"s29", tipo:"rete", tema:"chiaro", sopratitolo:"Art. 43, c. 5 · secondo la gravità, a",
  centro:"RPCT", dcentro:"segnala", nodi:[
  {t:"Ufficio procedimenti disciplinari", icona:"giudice", key:true},
  {t:"Vertice dell'amministrazione", icona:"persona"},
  {t:"OIV", icona:"occhio"}], inizio:-Math.PI/2, rx:520, ry:240},
{id:"s30", tipo:"confronto", tema:"chiaro", sopratitolo:"Art. 43, c. 4 · chi assicura l'accesso civico", col:[
  {h:"I dirigenti", t:"degli **uffici**"},
  {h:"L'RPCT", t:"un **dovere**, non un favore", key:true}]},
{id:"s31", tipo:"scadenza", tema:"chiaro", sopratitolo:"Se non risponde o risponde di no",
  max:55, banda:[30,50], inizio:"richiesta", fine:"",
  tappe:[{a:30, v:"30", t:"risposta"}, {a:50, v:"+20", t:"**riesame** dell'RPCT", key:true}]},
{id:"s32", tipo:"confronto", tema:"chiaro", sopratitolo:"Il silenzio", col:[
  {h:"Non è un sì", t:"il dato non arriva per il solo **passare del tempo**"},
  {h:"Si attivano", t:"i **rimedi**", key:true}]},
{id:"s33", tipo:"illustrata", tema:"chiaro", ill:"bivio", sopratitolo:"Contro la decisione o il silenzio",
  titolo:"Fino al **giudice**", punti:[
    {icona:"scudo", t:"prima il **riesame**"},
    {icona:"giudice", t:"poi il **TAR**", key:true}],
  etichette:{sx:"Riesame", dx:{t:"TAR", key:true}}},
{id:"s34", tipo:"flusso", tema:"chiaro", sopratitolo:"Un esempio: i tempi medi di attesa", passi:[
  {icona:"chat", t:"Richiesta", d:"all'URP"},
  {icona:"orologio", t:"Entro 30 giorni"},
  {icona:"occhio", t:"Sul sito", d:"e collegamento a te", key:true}]},
{id:"s35", tipo:"trappola", tema:"tenue", sopratitolo:"Un distrattore frequente", righe:[
  {sb:"Il dato viene inviato in copia riservata al solo richiedente",
   ok:"Il dato viene pubblicato per tutti"}]},
{id:"s36", tipo:"titolo", tema:"profondo",
  titolo:"**Trenta** giorni, un dato pubblicato<br>per **tutti**, un collegamento per **te**."},

// --- 6 · due accessi a confronto
{id:"s37", tipo:"confronto", tema:"chiaro", sopratitolo:"Chi può chiedere", col:[
  {h:"Documentale · L. 241", t:"chi ha un interesse **diretto, concreto, attuale**"},
  {h:"Civico semplice", t:"**chiunque**", key:true}]},
{id:"s38", tipo:"confronto", tema:"chiaro", sopratitolo:"Motivazione e scopo", col:[
  {h:"Documentale", t:"**motivata**, per tutelare una **posizione**"},
  {h:"Civico semplice", t:"**senza motivo**, per far rispettare un **obbligo**", key:true}]},
{id:"s39", tipo:"confronto", tema:"chiaro", sopratitolo:"L'oggetto", col:[
  {h:"Documentale", t:"documenti collegati al proprio **interesse**"},
  {h:"Civico semplice", t:"solo ciò che doveva essere **pubblicato**", key:true}]},
{id:"s40", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"In comune", celle:[
  {t:"**30 giorni** per rispondere"}, {t:"Ricorso al **giudice amministrativo**"}]},
{id:"s41", tipo:"piramide", tema:"chiaro", sopratitolo:"Tre accessi", strati:[
  {t:"Generalizzato", d:"chiunque, dati ulteriori, limiti più ampi"},
  {t:"Civico semplice", d:"chiunque, dati da pubblicare"},
  {t:"Documentale", d:"interessati, documenti motivati"}]},
{id:"s42", tipo:"flusso", tema:"chiaro", sopratitolo:"Un criterio pratico", passi:[
  {icona:"occhio", t:"Controlla", d:"Amministrazione trasparente"},
  {icona:"libro", t:"La legge", d:"lo impone?"},
  {icona:"spunta", t:"Accesso civico", d:"semplice", key:true}]},
{id:"s43", tipo:"confronto", tema:"tenue", sopratitolo:"Attenzione a non confonderli", col:[
  {h:"I tuoi verbali, per difenderti", t:"accesso **documentale**"},
  {h:"I criteri non pubblicati di un concorso", t:"accesso **civico**", key:true}]},
{id:"s44", tipo:"titolo", tema:"profondo",
  titolo:"Uno difende una **posizione**,<br>l'altro difende la **trasparenza**."},

// --- 7 · le tre cose
{id:"s45", tipo:"memo", tema:"chiaro", attive:[0], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s46", tipo:"memo", tema:"chiaro", attive:[0,1], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s47", tipo:"memo", tema:"chiaro", attive:[0,1,2], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s48", tipo:"trappola", tema:"tenue", sopratitolo:"L'ultimo distrattore", righe:[
  {sb:"L'accesso civico semplice richiede un interesse personale",
   ok:"Quello è il requisito dell'accesso documentale"}]},

// --- 8 · chiusura
{id:"s49", tipo:"titolo", tema:"profondo",
  titolo:"Un dato che **manca**,<br>una richiesta **semplice**,<br>una pubblicazione **per tutti**.",
  sotto:"Prossima lezione: l'accesso civico generalizzato."},

{id:"s50", tipo:"copertina", tema:"profondo", modulo:"Prossima lezione",
  titolo:"Lezione 6.4", sottotitolo:"Accesso civico<br>generalizzato · FOIA", ente:ENTE},
];
