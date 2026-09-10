// Contenuto delle 50 scene della lezione 1.2. *accento*  **accento in semibold**
const CINQUE = [
 {t:"**Partecipa** all'identificazione dei bisogni di **salute** della persona e della collettività"},
 {t:"**Identifica** i bisogni di **assistenza infermieristica** e ne **formula** gli obiettivi"},
 {t:"**Pianifica, gestisce e valuta** l'intervento assistenziale infermieristico"},
 {t:"**Garantisce** la corretta applicazione delle prescrizioni diagnostico-terapeutiche"},
 {t:"**Agisce** da solo o con gli altri operatori, avvalendosi del personale di supporto"},
];
const LETTERE = ["a","b","c","d","e"];
const TRE_ELEMENTI = [
 {t:"Operatore sanitario", d:"non ausiliario"},
 {t:"Diploma abilitante **e** iscrizione all'albo", d:"due requisiti, non uno: il titolo da solo non abilita"},
 {t:"Responsabile dell'assistenza **generale**", d:"non un elenco di atti, non una specialità"},
];
const NON_FA = [
 {sb:"«il decreto del 1994 abroga il mansionario»", ok:"è la *legge 42 del 1999*"},
 {sb:"«il decreto del 1994 istituisce l'Ordine»", ok:"è la *legge 3 del 2018*"},
 {sb:"«il decreto del 1994 disciplina l'autonomia»", ok:"è la *legge 251 del 2000*"},
];
const NON_ATTRIBUIBILI = [
 {t:"Accertamento e **diagnosi infermieristica**"},
 {t:"**Pianificazione** dell'assistenza"},
 {t:"**Valutazione degli esiti**"},
 {t:"Gestione e **somministrazione della terapia**"},
 {t:"**Valutazioni cliniche**"},
];
const NUMERI = ["2","4","3","3","5","5"];
const MEMO = [
 {t:"articoli"},
 {t:"tipi di assistenza — con la **palliativa**"},
 {t:"nature: tecnica, relazionale, **educativa**"},
 {t:"funzioni principali"},
 {t:"attività del comma 3, coi verbi esatti"},
 {t:"aree della formazione post-base"},
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 1 · La professione infermieristica",
  titolo:"Il profilo<br>professionale", sottotitolo:"Dentro il DM 739/1994",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"frase", tema:"chiaro", sopratitolo:"Micro-lezione 2 di 8",
  testo:"Delle tre fonti, apriamo la prima e la più importante: *il profilo professionale*."},
{id:"s03", tipo:"frase", tema:"chiaro", sopratitolo:"Che cos'è il profilo",
  testo:"Poco più di una pagina. E la norma *più citata* nelle prove scritte.",
  sotto:"Oggi la leggiamo comma per comma."},
{id:"s04", tipo:"elenco", tema:"chiaro", sopratitolo:"In questa lezione", numerato:true, voci:[
  {t:"Che **tipo di atto** è il decreto"},
  {t:"I **tre elenchi** del comma 2, che i quiz mescolano"},
  {t:"Le **cinque attività** del comma 3, verbo per verbo"},
  {t:"Che cosa vuol dire **avvalersi** del personale di supporto"}]},

{id:"s05", tipo:"norma", tema:"chiaro", sopratitolo:"Che atto è",
  etichetta:"Regolamento", sigla:"DM 739/1994",
  testo:"In attuazione dell'articolo 6 comma 3 del *decreto legislativo 502 del 1992*."},
{id:"s06", tipo:"frase", tema:"chiaro", sopratitolo:"Da dove viene",
  testo:"Il 502 affida al Ministro il compito di individuare *figure e profili*. Il 739 lo esegue per l'infermiere."},
{id:"s07", tipo:"confronto", tema:"chiaro", sopratitolo:"Due soli articoli", col:[
  {h:"Articolo 1", t:"il profilo", grande:true},
  {h:"Articolo 2", t:"il titolo abilita all'esercizio", grande:true}],
  sotto:"È un *regolamento*, non una legge: si cambia con un altro decreto."},

{id:"s08", tipo:"trappola", tema:"tenue", sopratitolo:"Che cosa il 1994 NON fa",
  righe:NON_FA},
{id:"s09", tipo:"frase", tema:"tenue", sopratitolo:"La regola",
  testo:"Il 739 è la fonte del *contenuto* della professione, non del suo *status giuridico*.",
  sotto:"Se in un quiz vedi il 1994 accostato a un'abrogazione, hai già trovato l'opzione sbagliata."},

{id:"s10", tipo:"citazione", tema:"profondo", sopratitolo:"Comma 1 · la definizione",
  testo:"L'infermiere è l'operatore sanitario che, in possesso del **diploma abilitante** e dell'**iscrizione all'albo professionale**, è **responsabile dell'assistenza generale infermieristica**",
  fonte:"DM 739/1994 · art. 1 comma 1"},
{id:"s11", tipo:"elenco", tema:"chiaro", sopratitolo:"Tre elementi, tutti operativi",
  numerato:true, voci:TRE_ELEMENTI, attive:[0,1]},
{id:"s12", tipo:"elenco", tema:"chiaro", sopratitolo:"Tre elementi, tutti operativi",
  numerato:true, voci:TRE_ELEMENTI, attive:[0,1,2]},

{id:"s13", tipo:"tre", tema:"chiaro", sopratitolo:"Comma 2 · tre elenchi in due righe",
  cifre:true, box:[
  {t:"4", d:"tipi di assistenza"}, {t:"3", d:"nature"}, {t:"3", d:"funzioni principali"}]},

{id:"s14", tipo:"tre", tema:"chiaro", sopratitolo:"I quattro tipi di assistenza", box:[
  {t:"Preventiva"}, {t:"Curativa"}, {t:"Palliativa", key:true}, {t:"Riabilitativa"}]},
{id:"s15", tipo:"frase", tema:"chiaro", sopratitolo:"Un dettaglio che fa impressione",
  testo:"«Palliativa» è scritta lì dal *1994*.",
  sotto:"Sedici anni prima della legge 38 del 2010: le cure palliative sono da sempre nel mandato professionale, non un'aggiunta recente."},

{id:"s16", tipo:"tre", tema:"chiaro", sopratitolo:"Le tre nature", box:[
  {t:"Tecnica"}, {t:"Relazionale"}, {t:"Educativa", key:true}]},
{id:"s17", tipo:"elenco", tema:"chiaro", sopratitolo:"Le tre funzioni principali",
  numerato:true, voci:[
  {t:"Prevenzione delle malattie"},
  {t:"Assistenza dei malati e dei disabili **di tutte le età**"},
  {t:"Educazione sanitaria"}]},
{id:"s18", tipo:"trappola", tema:"tenue", sopratitolo:"«Di tutte le età» è una clausola",
  righe:[{sb:"«l'assistenza infermieristica agli adulti»", ok:"esclude qualunque opzione che limiti a una *fascia d'età*"}]},

{id:"s19", tipo:"elenco", tema:"chiaro", sopratitolo:"Comma 3 · le cinque attività",
  numerato:true, marcatori:LETTERE, grandi:true, voci:CINQUE, attive:[0]},
{id:"s20", tipo:"elenco", tema:"chiaro", sopratitolo:"Comma 3 · le cinque attività",
  numerato:true, marcatori:LETTERE, grandi:true, voci:CINQUE, attive:[0,1]},

{id:"s21", tipo:"confronto", tema:"profondo", sopratitolo:"La distinzione più chiesta", col:[
  {h:"Bisogni di salute", t:"partecipa", grande:true},
  {h:"Bisogni di assistenza infermieristica", t:"identifica e formula", grande:true}]},
{id:"s22", tipo:"frase", tema:"chiaro", sopratitolo:"Perché, e non solo quale verbo",
  testo:"Il bisogno di salute non è di nessuna professione: si legge *insieme*. Il bisogno di assistenza infermieristica è *tuo*."},
{id:"s23", tipo:"frase", tema:"chiaro", sopratitolo:"Se all'orale ti si annebbia",
  testo:"Non cercare il verbo: chiediti *di chi è il bisogno*.",
  sotto:"Il verbo viene da sé. È l'oggetto su cui tu fai diagnosi."},
{id:"s24", tipo:"titolo", tema:"profondo", sopratitolo:"Da ripetere ad alta voce, una volta",
  titolo:"Bisogni di salute, *partecipo*.<br>Bisogni di assistenza, *identifico*."},

{id:"s25", tipo:"elenco", tema:"chiaro", sopratitolo:"Comma 3 · le cinque attività",
  numerato:true, marcatori:LETTERE, grandi:true, voci:CINQUE, attive:[0,1,2,3]},
{id:"s26", tipo:"elenco", tema:"chiaro", sopratitolo:"Comma 3 · le cinque attività",
  numerato:true, marcatori:LETTERE, grandi:true, voci:CINQUE, attive:[0,1,2,3,4]},

{id:"s27", tipo:"confronto", tema:"chiaro", sopratitolo:"La simmetria rovesciata · lettere c e d", col:[
  {h:"Intervento assistenziale infermieristico", t:"pianifica", grande:true},
  {h:"Prescrizioni diagnostico-terapeutiche", t:"garantisce l'applicazione", grande:true}]},
{id:"s28", tipo:"frase", tema:"chiaro", sopratitolo:"Perché cambia il verbo",
  testo:"Il verbo cambia perché cambia *il padrone dell'atto*.",
  sotto:"L'intervento infermieristico è suo: ne risponde dall'inizio alla fine."},
{id:"s29", tipo:"sostituzione", tema:"tenue", sopratitolo:"Come nella lezione 1.1",
  da:{h:"Garantire non è", t:"eseguire a occhi chiusi"},
  a:{h:"Garantire è", t:"verificare e chiarire"},
  sotto:"Prima di dare corso a una prescrizione palesemente errata."},

{id:"s30", tipo:"sostituzione", tema:"chiaro", sopratitolo:"«Si avvale» · lettera e",
  da:{h:"Non è", t:"un rapporto gerarchico"}, a:{h:"È", t:"un rapporto funzionale"},
  sotto:"Non è galateo: da come qualifichi il rapporto discende *chi risponde di che cosa*."},
{id:"s31", tipo:"frase", tema:"chiaro", sopratitolo:"«Ove necessario»",
  testo:"È una *valutazione tua*, non un automatismo dell'organizzazione."},

{id:"s32", tipo:"sostituzione", tema:"chiaro", sopratitolo:"Attribuire non è delegare",
  da:{h:"La delega", t:"trasferisce la responsabilità"},
  a:{h:"L'attribuzione", t:"la distribuisce"}},
{id:"s33", tipo:"tre", tema:"chiaro", sopratitolo:"I tre criteri dell'attribuzione", box:[
  {n:"01", t:"Competenza", d:"dell'operatore"},
  {n:"02", t:"Complessità e stabilità", d:"delle condizioni della persona assistita"},
  {n:"03", t:"Contesto organizzativo", d:"protocolli, possibilità di supervisione"}]},
{id:"s34", tipo:"frase", tema:"tenue", sopratitolo:"Quando non si attribuisce",
  testo:"Se uno dei tre criteri non regge, l'attività *non si attribuisce*.",
  sotto:"Davanti a una persona instabile, la risposta giusta è no."},

{id:"s35", tipo:"confronto", tema:"profondo", sopratitolo:"La regola d'oro", col:[
  {h:"Chi attribuisce", t:"risponde della scelta", grande:true},
  {h:"Chi esegue", t:"risponde della corretta esecuzione", grande:true}]},
{id:"s36", tipo:"frase", tema:"profondo", sopratitolo:"La conseguenza",
  testo:"La responsabilità non si trasferisce per intero: *si distribuisce*."},
{id:"s37", tipo:"frase", tema:"chiaro", sopratitolo:"Il criterio nei casi clinici",
  testo:"Si giudica *la decisione*, non l'esito.",
  sotto:"La domanda non è se è andata male: è se la scelta era giusta quando l'hai fatta."},

{id:"s38", tipo:"elenco", tema:"tenue", sopratitolo:"Che cosa NON è attribuibile",
  vietato:true, voci:NON_ATTRIBUIBILI},
{id:"s39", tipo:"frase", tema:"tenue", sopratitolo:"Il filo comune",
  testo:"Sono *giudizi*, non compiti.",
  sotto:"L'OSS collabora, osserva e riferisce. Non pianifica e non decide."},

{id:"s40", tipo:"elenco", tema:"chiaro", sopratitolo:"Due frasi brevi ma pesanti", numerato:true, voci:[
  {t:"Contribuisce alla **formazione** del personale di supporto"},
  {t:"Concorre all'**aggiornamento** e alla **ricerca**"}]},
{id:"s41", tipo:"frase", tema:"chiaro", sopratitolo:"L'aggiornamento",
  testo:"Non è una facoltà: è un *dovere professionale*.",
  sotto:"E diventerà fondamento di responsabilità per imperizia — lezione 1.5."},
{id:"s42", tipo:"tre", tema:"chiaro", sopratitolo:"Il campo di intervento non è l'ospedale", box:[
  {t:"Strutture", d:"pubbliche e private"}, {t:"Territorio"},
  {t:"Domicilio"}, {t:"Dipendenza", d:"o libera professione"}]},

{id:"s43", tipo:"tre", tema:"chiaro", sopratitolo:"Le cinque aree della formazione post-base", box:[
  {t:"Sanità pubblica"}, {t:"Pediatria"}, {t:"Salute mentale e psichiatria"},
  {t:"Geriatria"}, {t:"Area critica"}]},
{id:"s44", tipo:"confronto", tema:"chiaro", sopratitolo:"Da non confondere", col:[
  {h:"5 aree post-base · DM 739/1994", t:"ambiti clinici", grande:true},
  {h:"4 livelli · L. 43/2006", t:"sviluppo di carriera", grande:true}]},
{id:"s45", tipo:"frase", tema:"chiaro", sopratitolo:"Il test per non sbagliare",
  testo:"Le aree rispondono a *dove lavori*. I livelli a *fin dove sei arrivato*."},

{id:"s46", tipo:"elenco", tema:"profondo", sopratitolo:"I numeri del profilo",
  numerato:true, marcatori:NUMERI, grandi:true, voci:MEMO, attive:[0,1,2]},
{id:"s47", tipo:"elenco", tema:"profondo", sopratitolo:"I numeri del profilo",
  numerato:true, marcatori:NUMERI, grandi:true, voci:MEMO, attive:[0,1,2,3,4,5]},
{id:"s48", tipo:"confronto", tema:"profondo", sopratitolo:"E la regola d'oro", col:[
  {h:"Chi attribuisce", t:"risponde della scelta", grande:true},
  {h:"Chi esegue", t:"risponde della corretta esecuzione", grande:true}],
  sotto:"Nella dispensa: il testo commentato, quindici quiz e la traccia già svolta."},
{id:"s49", tipo:"frase", tema:"chiaro", sopratitolo:"Un'ultima cosa onesta",
  testo:"Nessuno ricorda un decreto a memoria. Si ricordano *i numeri*, e da quelli si ricostruisce il testo."},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Fine della micro-lezione 1.2",
  titolo:"1.3 Formazione, Ordine,<br>ECM e carriera", sottotitolo:"lo sviluppo professionale",
  ente:"Nella dispensa: il testo commentato, 15 quiz e la traccia di risposta già svolta"},
];
