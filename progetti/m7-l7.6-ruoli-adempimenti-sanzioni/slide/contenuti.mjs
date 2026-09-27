// Contenuto delle 48 scene della lezione 7.6. *accento*  **accento in semibold**
//
// Corso «Progressione verticale · Comparto Sanità», Modulo 7. Ruoli, adempimenti, sanzioni:
// GDPR artt. 4, 24, 26, 28, 29, 30, 32-35, 37-39, 82, 83; Codice artt. 2-quaterdecies, 166-167.

const ENTE = "CISL FP Padova Rovigo · Progressione verticale · Comparto Sanità";

const TRE_COSE = [
  "Il **titolare** decide finalità e mezzi; il **responsabile** tratta per suo conto, con un contratto; i dipendenti sono **persone autorizzate**",
  "Il **DPO** è obbligatorio negli enti pubblici, indipendente, consiglia e sorveglia; **registro** e **DPIA** spettano al titolare; violazioni entro **72 ore**",
  "Sanzioni su **due livelli**: 10 milioni o 2%, 20 milioni o 4%; poi **risarcimento**, **reati** e responsabilità **disciplinare**",
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 7 · Trattamento dei dati personali",
  titolo:"Ruoli, adempimenti<br>e sanzioni", sottotitolo:"Lezione 7.6", ente:ENTE},

// --- 1 · aggancio
{id:"s02", tipo:"illustrata", tema:"chiaro", ill:"busta", sopratitolo:"Venerdì sera",
  titolo:"Una mail **sbagliata**", punti:[
    {icona:"persone", t:"chi deve **saperlo**?"},
    {icona:"orologio", t:"entro **quando**?"},
    {icona:"giudice", t:"e chi ne **risponde**?", key:true}],
  etichette:{sx:"Azienda", dx:"Destinatario errato", alto:{t:"20 referti", key:true}}},
{id:"s03", tipo:"tre", tema:"chiaro", attive:[0,1,2], sopratitolo:"Per rispondere servono", box:[
  {n:"1", t:"Chi fa cosa", d:"nel trattamento"},
  {n:"2", t:"Gli adempimenti", d:"che il regolamento impone"},
  {n:"3", t:"Le conseguenze", d:"se qualcosa va storto"}]},
{id:"s04", tipo:"titolo", tema:"profondo",
  titolo:"Ruoli **chiari**, tempi **certi**,<br>responsabilità precise."},

// --- 2 · rotta
{id:"s05", tipo:"flusso", tema:"chiaro", sopratitolo:"Quattro passaggi", passi:[
  {icona:"persone", t:"Titolare e responsabile"},
  {icona:"scudo", t:"Il DPO"},
  {icona:"documento", t:"Registro, DPIA, violazioni", key:true},
  {icona:"giudice", t:"Le sanzioni"}]},

// --- 3 · titolare, responsabile, autorizzati
{id:"s06", tipo:"illustrata", tema:"chiaro", ill:"organigramma", sopratitolo:"GDPR, art. 4, n. 7",
  titolo:"Il **titolare**", punti:[
    {icona:"ingranaggio", t:"determina **finalità e mezzi**"},
    {icona:"ospedale", t:"è l'**azienda**, non il dirigente né l'ufficio", key:true}],
  etichette:{top:"Direttore generale", basso:{t:"Titolare: l'azienda", key:true}}},
{id:"s07", tipo:"confronto", tema:"chiaro", sopratitolo:"GDPR, art. 26 · i contitolari", col:[
  {h:"Decidono insieme", t:"finalità e mezzi: sono **contitolari**"},
  {h:"Un accordo interno", t:"e l'interessato si rivolge a **ciascuno**", key:true}]},
{id:"s08", tipo:"confronto", tema:"chiaro", sopratitolo:"GDPR, art. 28 · un soggetto diverso", col:[
  {h:"Titolare", t:"**decide** il trattamento"},
  {h:"Responsabile", t:"tratta **per conto** del titolare, spesso **esterno**", key:true}]},
{id:"s09", tipo:"griglia", tema:"chiaro", colonne:4, spunta:true, sopratitolo:"Garanzie sufficienti e un contratto", celle:[
  {t:"Istruzioni **documentate**"}, {t:"**Riservatezza**"}, {t:"**Sicurezza**"}, {t:"**Cancellazione** o restituzione"}]},
{id:"s10", tipo:"confronto", tema:"chiaro", sopratitolo:"I confini del responsabile", col:[
  {h:"Altri fornitori", t:"solo con autorizzazione **scritta** del titolare"},
  {h:"Se decide le finalità", t:"diventa a sua volta **titolare**", key:true}]},
{id:"s11", tipo:"illustrata", tema:"chiaro", ill:"cartellaclinica", sopratitolo:"Un esempio",
  titolo:"La ditta del **software**", punti:[
    {icona:"ingranaggio", t:"accede ai dati solo per la **manutenzione**"},
    {icona:"documento", t:"secondo **istruzioni** e **contratto**", key:true}],
  etichette:{alto:{t:"Manutenzione", key:true}}},
{id:"s12", tipo:"sostituzione", tema:"chiaro", sopratitolo:"GDPR, art. 29 · e i dipendenti?",
  da:{h:"Un tempo", t:"incaricati"},
  a:{h:"Oggi", t:"**persone autorizzate**, sotto istruzioni"}},
{id:"s13", tipo:"norma", tema:"chiaro", etichetta:"Codice, art. 2-quaterdecies", sigla:"Designati",
  testo:"Il titolare può attribuire **compiti specifici** a persone designate, come i **dirigenti**."},
{id:"s14", tipo:"trappola", tema:"tenue", sopratitolo:"Occhio a un distrattore", righe:[
  {sb:"Il responsabile del trattamento è il dirigente interno",
   ok:"È chi tratta i dati per conto del titolare, spesso esterno"}]},
{id:"s15", tipo:"titolo", tema:"profondo",
  titolo:"Chi **decide**, chi **esegue**,<br>chi opera sotto istruzioni."},

// --- 4 · il DPO
{id:"s16", tipo:"illustrata", tema:"chiaro", ill:"faro", sopratitolo:"GDPR, art. 37",
  titolo:"Il **DPO**", punti:[
    {icona:"scudo", t:"responsabile della **protezione dei dati**"},
    {icona:"ospedale", t:"ogni azienda sanitaria **pubblica** deve averlo", key:true}],
  etichette:{alto:{t:"DPO", key:true}}},
{id:"s17", tipo:"tre", tema:"chiaro", attive:[0,1,2], sopratitolo:"Obbligatorio per · dipendente o esterno", box:[
  {n:"1", t:"Enti pubblici", d:"autorità e organismi"},
  {n:"2", t:"Larga scala", d:"di categorie particolari"},
  {n:"3", t:"Monitoraggio", d:"regolare e sistematico"}]},
{id:"s18", tipo:"icone", tema:"chiaro", sopratitolo:"Art. 38 · indipendente", voci:[
  {icona:"libro",   t:"Scelto per **competenza**"},
  {icona:"divieto", t:"Nessuna **istruzione** sui compiti"},
  {icona:"persone", t:"Riferisce al **vertice**"},
  {icona:"scudo",   t:"Non **penalizzato**"}]},
{id:"s19", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"Art. 39 · i suoi compiti", celle:[
  {t:"**Informare**"}, {t:"**Consigliare**"}, {t:"**Sorvegliare** il rispetto"},
  {t:"Pareri sulla **DPIA**"}, {t:"Cooperare con il **Garante**"}, {t:"**Punto di contatto**"}]},
{id:"s20", tipo:"confronto", tema:"chiaro", sopratitolo:"Consiglia e controlla", col:[
  {h:"Non decide", t:"al posto del titolare, né firma le **notifiche**"},
  {h:"Decisioni e responsabilità", t:"restano del **titolare**", key:true}]},
{id:"s21", tipo:"illustrata", tema:"chiaro", ill:"sito", sopratitolo:"Raggiungibile da tutti",
  titolo:"Contatti **pubblici**", punti:[
    {icona:"documento", t:"pubblicati e indicati nell'**informativa**"},
    {icona:"persone", t:"per pazienti e **dipendenti**", key:true}],
  etichette:{barra:"Privacy", menu:{t:"Contatti DPO", key:true}}},
{id:"s22", tipo:"trappola", tema:"tenue", sopratitolo:"Un distrattore frequente", righe:[
  {sb:"Il DPO risponde delle violazioni",
   ok:"Risponde il titolare; il DPO vigila e consiglia"}]},
{id:"s23", tipo:"titolo", tema:"profondo",
  titolo:"Un **consigliere** indipendente,<br>non un capro espiatorio."},

// --- 5 · registro, DPIA, violazioni
{id:"s24", tipo:"illustrata", tema:"chiaro", ill:"archivio", sopratitolo:"GDPR, art. 30",
  titolo:"Il **registro** dei trattamenti", punti:[
    {icona:"cartella", t:"finalità, categorie, **destinatari**"},
    {icona:"lucchetto", t:"tempi di cancellazione, **misure** di sicurezza", key:true}],
  etichette:{cassetto:{t:"Registro", key:true}}},
{id:"s25", tipo:"confronto", tema:"chiaro", sopratitolo:"Chi è esonerato", col:[
  {h:"Meno di 250 dipendenti", t:"in parte, ma **non** con categorie particolari"},
  {h:"L'azienda sanitaria", t:"il registro lo tiene **sempre**", key:true}]},
{id:"s26", tipo:"illustrata", tema:"chiaro", ill:"imbuto", sopratitolo:"GDPR, art. 35",
  titolo:"La **valutazione d'impatto**", punti:[
    {icona:"orologio", t:"si fa **prima** del trattamento"},
    {icona:"avviso", t:"se il **rischio** per le persone è elevato", key:true}],
  etichette:{alto:{t:"DPIA", key:true}, sx:"Rischi", dx:"Misure"}},
{id:"s27", tipo:"flusso", tema:"chiaro", sopratitolo:"Un nuovo servizio di telemedicina", passi:[
  {icona:"ospedale", t:"Il progetto"},
  {icona:"avviso", t:"I rischi"},
  {icona:"lucchetto", t:"Le misure"},
  {icona:"scudo", t:"Il parere", d:"del DPO", key:true}]},
{id:"s28", tipo:"griglia", tema:"chiaro", colonne:4, spunta:true, sopratitolo:"Art. 32 · la sicurezza", celle:[
  {t:"**Cifratura**"}, {t:"Sistemi **riservati** e disponibili"}, {t:"**Ripristino** dei dati"}, {t:"**Verifiche** periodiche"}]},
{id:"s29", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Art. 4, n. 12 · la violazione dei dati", celle:[
  {t:"**Distruzione**"}, {t:"**Perdita**"}, {t:"**Modifica**"},
  {t:"**Divulgazione**"}, {t:"**Accesso** non autorizzato"}, {t:"Anche **accidentali**"}]},
{id:"s30", tipo:"scadenza", tema:"chiaro", sopratitolo:"Art. 33 · la notifica al Garante (ore)",
  max:80, banda:[0,72], inizio:"conoscenza", fine:"",
  tappe:[{a:72, v:"72 ore", t:"ove possibile, la **notifica**", key:true}]},
{id:"s31", tipo:"confronto", tema:"chiaro", sopratitolo:"Artt. 33-34", col:[
  {h:"Oltre le 72 ore", t:"si **motiva** il ritardo"},
  {h:"Rischio elevato", t:"si avvisano anche le **persone**, in modo chiaro", key:true}]},
{id:"s32", tipo:"flusso", tema:"chiaro", sopratitolo:"Torniamo alla mail di venerdì", passi:[
  {icona:"occhio", t:"Chi se ne accorge"},
  {icona:"persone", t:"Avvisa subito", d:"responsabile e DPO"},
  {icona:"ingranaggio", t:"La procedura", d:"aziendale"},
  {icona:"documento", t:"Si documenta", d:"sempre", key:true}]},
{id:"s33", tipo:"trappola", tema:"tenue", sopratitolo:"Attenzione", righe:[
  {sb:"Le 72 ore partono dal lunedì mattina",
   ok:"Partono da quando il titolare lo sa, weekend compreso"}]},
{id:"s34", tipo:"titolo", tema:"profondo",
  titolo:"**Registrare**, valutare prima,<br>**reagire** in fretta."},

// --- 6 · sanzioni
{id:"s35", tipo:"contatore", tema:"chiaro", sopratitolo:"Art. 83, par. 4 · primo livello", sep:"o",
  valori:[{n:10, t:"milioni di euro"}, {n:2, t:"% del fatturato, se superiore", key:true}],
  sotto:"La percentuale vale per le **imprese**."},
{id:"s36", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Gli obblighi di titolare e responsabile", celle:[
  {t:"**Sicurezza**"}, {t:"**Registro**"}, {t:"**DPIA**"},
  {t:"**Notifica** delle violazioni"}, {t:"**DPO**"}, {t:"Contratti con i **responsabili**"}]},
{id:"s37", tipo:"contatore", tema:"chiaro", sopratitolo:"Art. 83, par. 5 · secondo livello", sep:"o",
  valori:[{n:20, t:"milioni di euro"}, {n:4, t:"% del fatturato", key:true}],
  sotto:"Principi, basi giuridiche, consenso, **categorie particolari**, diritti."},
{id:"s38", tipo:"illustrata", tema:"chiaro", ill:"ospedale", sopratitolo:"Art. 83, par. 7 · e gli enti pubblici?",
  titolo:"Sanzionabili **anche loro**", punti:[
    {icona:"libro", t:"la scelta è lasciata agli **Stati**"},
    {icona:"giudice", t:"il Garante sanziona anche **aziende sanitarie**", key:true}],
  etichette:{}},
{id:"s39", tipo:"confronto", tema:"chiaro", sopratitolo:"Non solo sanzioni amministrative", col:[
  {h:"Art. 82 · risarcimento", t:"del danno **materiale** o **immateriale**"},
  {h:"Codice · reati", t:"trattamento **illecito** per profitto o danno, con nocumento", key:true}]},
{id:"s40", tipo:"illustrata", tema:"chiaro", ill:"impronta", sopratitolo:"Per chi lavora in azienda",
  titolo:"Responsabilità **disciplinare**", punti:[
    {icona:"occhio", t:"consultare dati **senza ragione**"},
    {icona:"persona", t:"ne risponde **personalmente**", key:true}],
  etichette:{alto:{t:"Istruzioni", key:true}, sx:"Dipendente", dx:"Azienda"}},
{id:"s41", tipo:"trappola", tema:"tenue", sopratitolo:"Attenzione", righe:[
  {sb:"Le sanzioni sono tutte da 20 milioni",
   ok:"Due livelli, 10 e 20 milioni, secondo la norma violata"}]},
{id:"s42", tipo:"titolo", tema:"profondo",
  titolo:"Due **livelli** di sanzione,<br>una **responsabilità** per ciascuno."},

// --- 7 · le tre cose
{id:"s43", tipo:"memo", tema:"chiaro", attive:[0], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s44", tipo:"memo", tema:"chiaro", attive:[0,1], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s45", tipo:"memo", tema:"chiaro", attive:[0,1,2], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s46", tipo:"trappola", tema:"tenue", sopratitolo:"L'ultimo distrattore", righe:[
  {sb:"La notifica della violazione spetta al DPO",
   ok:"Spetta al titolare, che il DPO consiglia"}]},

// --- 8 · chiusura
{id:"s47", tipo:"titolo", tema:"profondo",
  titolo:"Ruoli **chiari**,<br>adempimenti concreti,<br>sanzioni a **due livelli**.",
  sotto:"Prossimo modulo: il pubblico impiego."},

{id:"s48", tipo:"copertina", tema:"profondo", modulo:"Prossimo modulo",
  titolo:"Modulo 8", sottotitolo:"Pubblico impiego", ente:ENTE},
];
