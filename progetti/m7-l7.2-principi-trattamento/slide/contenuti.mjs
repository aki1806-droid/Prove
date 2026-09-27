// Contenuto delle 50 scene della lezione 7.2. *accento*  **accento in semibold**
//
// Corso «Progressione verticale · Comparto Sanità», Modulo 7. I principi del trattamento:
// GDPR art. 5 (par. 1 lett. a-f, par. 2), artt. 12-13, 25, 32, 89.

const ENTE = "CISL FP Padova Rovigo · Progressione verticale · Comparto Sanità";

const TRE_COSE = [
  "Sei principi nell'**art. 5**: liceità, correttezza e trasparenza; finalità; minimizzazione; esattezza; conservazione; integrità e riservatezza",
  "Finalità **determinate, esplicite e legittime**, solo i dati **necessari**; uso ulteriore compatibile (eccezioni: archivio, ricerca, statistica)",
  "Dati **esatti**, conservati **solo il tempo necessario**, **protetti** con misure tecniche e organizzative; e il titolare lo **dimostra**",
];


export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 7 · Trattamento dei dati personali",
  titolo:"I principi<br>del trattamento", sottotitolo:"Lezione 7.2", ente:ENTE},

// --- 1 · aggancio
{id:"s02", tipo:"illustrata", tema:"chiaro", ill:"archivio", sopratitolo:"Un quaderno in ambulatorio",
  titolo:"«Per ogni **evenienza**»", punti:[
    {icona:"persone", t:"nomi e telefoni dei **dimessi**"},
    {icona:"orologio", t:"da **quindici anni**"},
    {icona:"occhio", t:"alla portata di **chiunque**", key:true}],
  etichette:{cassetto:{t:"Quaderno", key:true}}},
{id:"s03", tipo:"contatore", tema:"chiaro", sopratitolo:"Nessuno lo ha mai usato male, eppure",
  valori:[{n:3, t:"principi violati", key:true}],
  sotto:"Oggi vediamo **quali**, e perché."},
{id:"s04", tipo:"titolo", tema:"profondo",
  titolo:"**Sei** principi, e un titolare<br>che deve saperli **dimostrare**."},

// --- 2 · rotta
{id:"s05", tipo:"flusso", tema:"chiaro", sopratitolo:"Quattro passaggi, tutti nell'art. 5", passi:[
  {icona:"bilancia", t:"Liceità", d:"correttezza, trasparenza"},
  {icona:"cartella", t:"Finalità", d:"e minimizzazione"},
  {icona:"orologio", t:"Esattezza", d:"e conservazione"},
  {icona:"lucchetto", t:"Integrità", d:"e riservatezza", key:true}]},

// --- 3 · liceità, correttezza, trasparenza
{id:"s06", tipo:"norma", tema:"chiaro", etichetta:"GDPR, art. 5, par. 1, lett. a", sigla:"Tre parole",
  testo:"Dati trattati in modo **lecito**, **corretto** e **trasparente**."},
{id:"s07", tipo:"icone", tema:"chiaro", sopratitolo:"Lecito: serve una base giuridica", voci:[
  {icona:"libro",     t:"Un **obbligo** di legge"},
  {icona:"ospedale",  t:"Un compito di **interesse pubblico**"},
  {icona:"cuoremano", t:"La **cura**"},
  {icona:"spunta",    t:"Il **consenso**"}]},
{id:"s08", tipo:"tre", tema:"chiaro", attive:[0,1,2], sopratitolo:"Corretto significa leale: niente", box:[
  {n:"1", t:"Raccolte nascoste", d:"la persona sa che si raccolgono dati"},
  {n:"2", t:"Usi inattesi", d:"oltre ciò che può ragionevolmente aspettarsi"},
  {n:"3", t:"Pressioni", d:"per ottenere più dati del dovuto"}]},
{id:"s09", tipo:"illustrata", tema:"chiaro", ill:"documento", sopratitolo:"Trasparente: l'informativa",
  titolo:"La persona **sa**", punti:[
    {icona:"persona", t:"**chi** tratta i suoi dati"},
    {icona:"cartella", t:"per quali **finalità**, per quanto **tempo**"},
    {icona:"bilancia", t:"quali **diritti** ha", key:true}],
  etichette:{titolo:"Informativa", sigillo:{t:"Chiara", key:true}}},
{id:"s10", tipo:"confronto", tema:"chiaro", sopratitolo:"Art. 12 · come si informa", col:[
  {h:"Serve", t:"testo **conciso**, accessibile, **semplice e chiaro**", key:true},
  {h:"Non basta", t:"un modulo **incomprensibile**"}]},
{id:"s11", tipo:"illustrata", tema:"chiaro", ill:"sportello", sopratitolo:"Un esempio all'accettazione",
  titolo:"Dove **vanno** i dati", punti:[
    {icona:"persona", t:"al **medico di famiglia**"},
    {icona:"cartella", t:"al **fascicolo sanitario**"},
    {icona:"chat", t:"come esercitare i **diritti**", key:true}],
  etichette:{insegna:{t:"Informativa", key:true}}},
{id:"s12", tipo:"icone", tema:"chiaro", sopratitolo:"Anche verso i dipendenti", voci:[
  {icona:"orologio",    t:"**Presenze**"},
  {icona:"euro",        t:"**Retribuzione**"},
  {icona:"cuoremano",   t:"Sorveglianza **sanitaria**"},
  {icona:"certificato", t:"**Valutazioni**"}]},
{id:"s13", tipo:"trappola", tema:"tenue", sopratitolo:"Occhio a un distrattore", righe:[
  {sb:"Trasparenza significa pubblicare i dati",
   ok:"Significa informare la persona su come vengono trattati i suoi"}]},
{id:"s14", tipo:"titolo", tema:"profondo",
  titolo:"**Lecito**, **leale**,<br>chiaro per chi è coinvolto."},

// --- 4 · finalità e minimizzazione
{id:"s15", tipo:"norma", tema:"chiaro", etichetta:"Art. 5, par. 1, lett. b", sigla:"Finalità",
  testo:"**Determinate**, **esplicite** e **legittime**. «Per ogni evenienza» non basta."},
{id:"s16", tipo:"flusso", tema:"chiaro", sopratitolo:"Prima si decide, poi si raccoglie", passi:[
  {icona:"bilancia", t:"Decisa", d:"prima della raccolta", key:true},
  {icona:"chat", t:"Dichiarata", d:"e comunicata"},
  {icona:"cartella", t:"Poi i dati"}]},
{id:"s17", tipo:"sostituzione", tema:"chiaro", sopratitolo:"Nessun uso incompatibile",
  da:{h:"Non vale", t:"raccolti per curare, usati per tutto"},
  a:{h:"Vale", t:"uso **compatibile** con lo scopo iniziale"}},
{id:"s18", tipo:"tre", tema:"chiaro", attive:[0,1,2], sopratitolo:"Art. 89 · non incompatibili, con garanzie", box:[
  {n:"1", t:"Archiviazione", d:"nel pubblico interesse"},
  {n:"2", t:"Ricerca", d:"scientifica o storica"},
  {n:"3", t:"Statistica", d:"con misure adeguate"}]},
{id:"s19", tipo:"confronto", tema:"chiaro", sopratitolo:"Un esempio: il numero per l'esito di un esame", col:[
  {h:"Raccolto per", t:"**avvisare** dell'esito", key:true},
  {h:"Non per", t:"**pubblicità** di un evento o un'associazione"}]},
{id:"s20", tipo:"illustrata", tema:"chiaro", ill:"imbuto", sopratitolo:"Art. 5, par. 1, lett. c",
  titolo:"La **minimizzazione**", punti:[
    {icona:"spunta", t:"dati **adeguati** e **pertinenti**"},
    {icona:"cartella", t:"**limitati** a quanto necessario", key:true}],
  etichette:{sx:"Tutto il possibile", dx:{t:"Solo il necessario", key:true}}},
{id:"s21", tipo:"sostituzione", tema:"chiaro", sopratitolo:"Si raccoglie",
  da:{h:"Non", t:"ciò che potrebbe servire un giorno"},
  a:{h:"Ma", t:"ciò che serve **adesso**, per quello scopo"}},
{id:"s22", tipo:"confronto", tema:"chiaro", sopratitolo:"Due esempi", col:[
  {h:"Prenotare una visita", t:"non serve **professione** o **stato civile**"},
  {h:"Chiedere ferie", t:"non serve la **diagnosi**", key:true}]},
{id:"s23", tipo:"illustrata", tema:"chiaro", ill:"organigramma", sopratitolo:"Minimizzazione anche negli accessi",
  titolo:"Solo i **propri** pazienti", punti:[
    {icona:"occhio", t:"chi è in reparto vede chi **segue**", key:true},
    {icona:"divieto", t:"non **tutto** l'ospedale"}],
  etichette:{top:"Ospedale", basso:{t:"Il mio reparto", key:true}}},
{id:"s24", tipo:"trappola", tema:"tenue", sopratitolo:"Un distrattore frequente", righe:[
  {sb:"Se ho già il dato, posso usarlo per qualunque scopo",
   ok:"Conta la finalità per cui è stato raccolto"}]},
{id:"s25", tipo:"titolo", tema:"profondo",
  titolo:"Uno scopo **preciso**,<br>solo i dati che **servono**."},

// --- 5 · esattezza e conservazione
{id:"s26", tipo:"norma", tema:"chiaro", etichetta:"Art. 5, par. 1, lett. d", sigla:"Esattezza",
  testo:"Dati **esatti** e, se necessario, **aggiornati**: pazienti e personale."},
{id:"s27", tipo:"confronto", tema:"chiaro", sopratitolo:"Correggere tempestivamente", col:[
  {h:"Per la privacy", t:"cancellare o **rettificare** i dati inesatti"},
  {h:"In sanità", t:"un dato sbagliato è un **rischio clinico**", key:true}]},
{id:"s28", tipo:"illustrata", tema:"chiaro", ill:"cartellaclinica", sopratitolo:"Due esempi",
  titolo:"Protegge **due volte**", punti:[
    {icona:"avviso", t:"un'**allergia** sul paziente sbagliato"},
    {icona:"documento", t:"un referto a un **indirizzo** vecchio"},
    {icona:"spunta", t:"correggere **in fretta**", key:true}],
  etichette:{alto:{t:"Dato esatto", key:true}}},
{id:"s29", tipo:"illustrata", tema:"chiaro", ill:"clessidra", sopratitolo:"Art. 5, par. 1, lett. e",
  titolo:"Il tempo **necessario**", punti:[
    {icona:"persona", t:"dati che **identificano** la persona"},
    {icona:"orologio", t:"per le finalità, **non oltre**", key:true}],
  etichette:{alto:{t:"Conservazione", key:true}}},
{id:"s30", tipo:"tre", tema:"chiaro", attive:[0,1,2], sopratitolo:"Periodi più lunghi, con misure adeguate", box:[
  {n:"1", t:"Archivio", d:"nel pubblico interesse"},
  {n:"2", t:"Ricerca", d:"scientifica o storica"},
  {n:"3", t:"Statistica", d:"a fini statistici"}]},
{id:"s31", tipo:"confronto", tema:"chiaro", sopratitolo:"In sanità", col:[
  {h:"Norme specifiche", t:"per la **cartella clinica** tempi molto lunghi"},
  {h:"Il principio", t:"ogni tempo **definito**, non lasciato al caso", key:true}]},
{id:"s32", tipo:"flusso", tema:"chiaro", sopratitolo:"Per ogni tipo di documento", passi:[
  {icona:"cartella", t:"Un tempo", d:"di conservazione"},
  {icona:"orologio", t:"Scade", d:"il termine"},
  {icona:"divieto", t:"Si cancella", d:"o si rende anonimo", key:true}]},
{id:"s33", tipo:"tre", tema:"chiaro", attive:[0,1,2], sopratitolo:"Il quaderno: tre principi violati", box:[
  {n:"1", t:"Finalità", d:"«per ogni evenienza» non è uno scopo"},
  {n:"2", t:"Minimizzazione", d:"dati in eccesso"},
  {n:"3", t:"Conservazione", d:"nessun termine"}]},
{id:"s34", tipo:"trappola", tema:"tenue", sopratitolo:"Attenzione", righe:[
  {sb:"Conservare più a lungo è una forma di prudenza",
   ok:"Senza una ragione e un termine, è una violazione"}]},
{id:"s35", tipo:"titolo", tema:"profondo",
  titolo:"Dati **corretti**,<br>e solo per il **tempo** che serve."},

// --- 6 · integrità e riservatezza
{id:"s36", tipo:"norma", tema:"chiaro", etichetta:"Art. 5, par. 1, lett. f", sigla:"Integrità e riservatezza",
  testo:"Un'adeguata **sicurezza**, con misure **tecniche e organizzative**."},
{id:"s37", tipo:"tre", tema:"chiaro", attive:[0,1,2], sopratitolo:"Tre rischi da cui proteggere · art. 32", box:[
  {n:"1", t:"Accessi illeciti", d:"trattamenti non autorizzati"},
  {n:"2", t:"Perdita", d:"e distruzione"},
  {n:"3", t:"Danno", d:"accidentale"}]},
{id:"s38", tipo:"illustrata", tema:"chiaro", ill:"archivio", sopratitolo:"Il quaderno sullo scaffale",
  titolo:"La **terza** violazione", punti:[
    {icona:"occhio", t:"alla portata di **chiunque**"},
    {icona:"lucchetto", t:"nessuna **protezione**", key:true}],
  etichette:{cassetto:{t:"Aperto", key:true}}},
{id:"s39", tipo:"illustrata", tema:"chiaro", ill:"cartellaclinica", sopratitolo:"Integrità",
  titolo:"Dati **non alterati**", punti:[
    {icona:"avviso", t:"un valore di laboratorio **modificato**"},
    {icona:"divieto", t:"per errore o da chi **non ne ha titolo**", key:true}],
  etichette:{alto:{t:"Integrità", key:true}}},
{id:"s40", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Esempi di ogni giorno", celle:[
  {t:"Un computer **aperto** in corridoio"}, {t:"Una password **condivisa**"},
  {t:"Cartelle su un carrello **incustodito**"}, {t:"Un referto all'indirizzo **sbagliato**"}]},
{id:"s41", tipo:"confronto", tema:"chiaro", sopratitolo:"Le misure", col:[
  {h:"Tecniche", t:"credenziali personali, **cifratura**, copie di sicurezza"},
  {h:"Organizzative", t:"istruzioni, **formazione**, chi accede a cosa", key:true}]},
{id:"s42", tipo:"norma", tema:"chiaro", etichetta:"Art. 5, par. 2", sigla:"E sopra tutti",
  testo:"Il titolare è competente per i sei principi e **sa dimostrarlo**."},
{id:"s43", tipo:"trappola", tema:"tenue", sopratitolo:"Attenzione", righe:[
  {sb:"La sicurezza è un problema del solo servizio informatico",
   ok:"Un fascicolo in vista è una violazione come un server non protetto"}]},
{id:"s44", tipo:"titolo", tema:"profondo",
  titolo:"Proteggere dagli **accessi**,<br>dalle **perdite**, dagli **errori**."},

// --- 7 · le tre cose
{id:"s45", tipo:"memo", tema:"chiaro", attive:[0], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s46", tipo:"memo", tema:"chiaro", attive:[0,1], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s47", tipo:"memo", tema:"chiaro", attive:[0,1,2], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s48", tipo:"trappola", tema:"tenue", sopratitolo:"L'ultimo distrattore", righe:[
  {sb:"I principi valgono solo per i dati digitali",
   ok:"Valgono anche per la carta, dal quaderno alla cartella"}]},

// --- 8 · chiusura
{id:"s49", tipo:"titolo", tema:"profondo",
  titolo:"**Sei** principi,<br>per ogni dato,<br>dalla cartella al **quaderno**.",
  sotto:"Prossima lezione: le basi giuridiche."},

{id:"s50", tipo:"copertina", tema:"profondo", modulo:"Prossima lezione",
  titolo:"Lezione 7.3", sottotitolo:"Le basi<br>giuridiche", ente:ENTE},
];
