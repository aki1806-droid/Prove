// Contenuto delle 49 scene della lezione 4.2. *accento*  **accento in semibold**
//
// Corso «Progressione verticale · Comparto Sanità», Modulo 4. L'Azienda Ospedale-Università
// Padova e le tre missioni: assistenza, didattica, ricerca; il modello ospedaliero-
// universitario (D.Lgs. 517/1999: organi, organo di indirizzo, DAI); il protocollo d'intesa
// Regione-Università; l'AOUPD dal 2019; che cosa cambia per il personale del comparto.

const ENTE = "CISL FP Padova Rovigo · Progressione verticale · Comparto Sanità";

const TRE_COSE = [
  "Le tre missioni dell'azienda ospedaliero-universitaria: **assistenza**, **didattica** e **ricerca**, integrate fra loro",
  "Gli organi (D.Lgs. **517/1999**): **direttore generale** d'intesa con il **Rettore**, **collegio sindacale**, **organo di indirizzo**",
  "L'integrazione si fa nei **dipartimenti ad attività integrata** (DAI); le regole stanno nel **protocollo d'intesa** Regione-Università",
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 4 · Organizzazione aziendale e AOUPD",
  titolo:"L'AOUPD<br>e le tre missioni", sottotitolo:"Lezione 4.2", ente:ENTE},

// --- 1 · aggancio
{id:"s02", tipo:"illustrata", tema:"chiaro", ill:"comunita", sopratitolo:"Mattina, un reparto di Padova",
  titolo:"Tre persone, **tre lavori**", punti:[
    {icona:"cuoremano", t:"l'infermiere fa il **giro letti**"},
    {icona:"cappello", t:"uno **studente** del corso di laurea"},
    {icona:"occhio", t:"un medico raccoglie dati per uno **studio**", key:true}],
  etichette:{alto:{t:"Lo stesso reparto", key:true}}},
{id:"s03", tipo:"illustrata", tema:"chiaro", ill:"missioni", sopratitolo:"Nello stesso momento",
  titolo:"La **normalità** di Padova", punti:[
    {icona:"ospedale", t:"un'azienda **ospedaliero-universitaria**"},
    {icona:"persone", t:"per chi ci lavora, la **propria** azienda", key:true}],
  etichette:{a:"Assistenza", b:"Didattica", c:"Ricerca", centro:{t:"Padova", key:true}}},
{id:"s04", tipo:"titolo", tema:"profondo",
  titolo:"**Curare**, insegnare, **scoprire**:<br>nello stesso luogo."},

// --- 2 · rotta
{id:"s05", tipo:"flusso", tema:"chiaro", sopratitolo:"Quattro passaggi", passi:[
  {icona:"cuoremano", t:"Tre missioni"},
  {icona:"bilancia", t:"Il modello", d:"e i suoi organi"},
  {icona:"ospedale", t:"L'Azienda di Padova"},
  {icona:"persone", t:"Chi ci lavora", d:"che cosa cambia", key:true}]},

// --- 3 · tre missioni
{id:"s06", tipo:"contatore", tema:"chiaro", sopratitolo:"Quante missioni?", sep:"·",
  valori:[{n:1, t:"azienda ospedaliera comune"}, {n:3, t:"azienda ospedaliero-universitaria", key:true}],
  sotto:"**Assistenza**, **didattica** e **ricerca**, legate fra loro."},
{id:"s07", tipo:"illustrata", tema:"chiaro", ill:"ospedale", sopratitolo:"La prima missione",
  titolo:"L'**assistenza**", punti:[
    {icona:"ospedale", t:"ricoveri, interventi, **ambulatori**"},
    {icona:"avviso", t:"l'**emergenza**"},
    {icona:"persone", t:"la unisce a tutto il **servizio regionale**", key:true}],
  etichette:{insegna:{t:"Assistenza", key:true}}},
{id:"s08", tipo:"illustrata", tema:"chiaro", ill:"universita", sopratitolo:"La seconda missione",
  titolo:"La **didattica**", punti:[
    {icona:"cappello", t:"studenti di **medicina** e specializzandi"},
    {icona:"persone", t:"le **professioni sanitarie**: infermieristica, fisioterapia, laboratorio", key:true}],
  etichette:{alto:{t:"Didattica", key:true}}},
{id:"s09", tipo:"illustrata", tema:"chiaro", ill:"microscopio", sopratitolo:"La terza missione",
  titolo:"La **ricerca**", punti:[
    {icona:"occhio", t:"studi **clinici** e ricerca **biomedica**"},
    {icona:"spunta", t:"**traslazionale**: dal laboratorio al letto del paziente", key:true}],
  etichette:{sx:"Laboratorio", dx:{t:"Paziente", key:true}}},
{id:"s10", tipo:"flusso", tema:"chiaro", sopratitolo:"Un esempio: lo scompenso cardiaco", passi:[
  {icona:"occhio", t:"Uno studio", d:"nasce un nuovo protocollo"},
  {icona:"cuoremano", t:"Il reparto", d:"lo applica"},
  {icona:"cappello", t:"Gli studenti", d:"lo imparano", key:true}]},
{id:"s11", tipo:"ciclo", tema:"chiaro", sopratitolo:"Le missioni si alimentano a vicenda",
  centro:"Sapere", dcentro:"che circola", fasi:[
  {icona:"occhio", t:"Ricerca"},
  {icona:"cuoremano", t:"Cura"},
  {icona:"cappello", t:"Formazione", key:true}]},
{id:"s12", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"Se ne manca una", celle:[
  {t:"Senza **assistenza**, la didattica sarebbe teoria"},
  {t:"Senza **ricerca**, l'assistenza resterebbe ferma"},
  {t:"Senza **didattica**, nessuno prenderebbe il testimone"}]},
{id:"s13", tipo:"titolo", tema:"profondo",
  titolo:"Tre missioni,<br>**un solo ospedale**.",
  sotto:"È questo che rende Padova diversa."},

// --- 4 · il modello
{id:"s14", tipo:"norma", tema:"chiaro", etichetta:"D.Lgs. 517 del 21 dicembre 1999", sigla:"SSN e università",
  testo:"Disciplina i rapporti fra servizio sanitario e università e supera i **modelli diversi** di prima."},
{id:"s15", tipo:"illustrata", tema:"chiaro", ill:"stretta", sopratitolo:"Le regole del rapporto",
  titolo:"Il **protocollo d'intesa**", punti:[
    {icona:"cappello", t:"come la **scuola di medicina** contribuisce all'assistenza"},
    {icona:"persone", t:"come si organizza la **collaborazione**", key:true}],
  etichette:{sx:"Regione", dx:"Università", centro:{t:"Protocollo", key:true}}},
{id:"s16", tipo:"flusso", tema:"chiaro", sopratitolo:"Non una volta per sempre", passi:[
  {icona:"documento", t:"Protocollo d'intesa"},
  {icona:"orologio", t:"Si rinnova", d:"nel tempo"},
  {icona:"certificato", t:"Atti attuativi", d:"firmati da Regione e Università", key:true}]},
{id:"s17", tipo:"tre", tema:"chiaro", attive:[0,1,2], sopratitolo:"Gli organi dell'azienda ospedaliero-universitaria", box:[
  {n:"1", t:"Direttore generale"},
  {n:"2", t:"Collegio sindacale"},
  {n:"3", t:"Organo di indirizzo"}]},
{id:"s18", tipo:"illustrata", tema:"chiaro", ill:"stretta", sopratitolo:"Il direttore generale",
  titolo:"Un governo **condiviso**", punti:[
    {icona:"bilancia", t:"nominato dalla **Regione**"},
    {icona:"cappello", t:"d'**intesa** con il **Rettore**", key:true}],
  etichette:{sx:"Regione", dx:"Rettore", centro:{t:"Intesa", key:true}}},
{id:"s19", tipo:"illustrata", tema:"chiaro", ill:"missioni", sopratitolo:"L'organo di indirizzo",
  titolo:"Tenere **coerenti** le missioni", punti:[
    {icona:"cuoremano", t:"la programmazione dell'**assistenza**"},
    {icona:"cappello", t:"con quella di **didattica** e **ricerca**", key:true}],
  etichette:{a:"Assistenza", b:"Didattica", c:"Ricerca", centro:{t:"Coerenza", key:true}}},
{id:"s20", tipo:"contatore", tema:"chiaro", sopratitolo:"L'organo di indirizzo propone e verifica",
  valori:[{n:5, t:"componenti, al massimo", key:true}],
  sotto:"Composizione fissata dal **protocollo d'intesa**; ne fa parte il vertice della **scuola di medicina**."},
{id:"s21", tipo:"illustrata", tema:"chiaro", ill:"organigramma", sopratitolo:"Dove l'integrazione si fa davvero",
  titolo:"I dipartimenti ad **attività integrata**", punti:[
    {icona:"cartella", t:"detti **DAI**"},
    {icona:"persone", t:"assistenza, didattica e ricerca nelle **stesse unità operative**", key:true}],
  etichette:{top:{t:"DAI", key:true}}},
{id:"s22", tipo:"illustrata", tema:"chiaro", ill:"tavolo", sopratitolo:"Nei DAI",
  titolo:"Stesso reparto, **rapporti diversi**", punti:[
    {icona:"ospedale", t:"professionisti del **servizio sanitario**"},
    {icona:"cappello", t:"personale **universitario** che fa anche assistenza", key:true}],
  etichette:{p1:"SSR", p2:{t:"UNI", key:true}, p3:"SSR", p4:"UNI"}},
{id:"s23", tipo:"trappola", tema:"tenue", sopratitolo:"Attenzione a un distrattore", righe:[
  {sb:"Il direttore generale lo sceglie l'Università da sola",
   ok:"Lo nomina la Regione d'intesa con il Rettore"}]},
{id:"s24", tipo:"trappola", tema:"tenue", sopratitolo:"E ancora", righe:[
  {sb:"L'organo di indirizzo gestisce l'azienda",
   ok:"Indirizza e verifica la coerenza fra le missioni; la gestione è del DG"}]},
{id:"s25", tipo:"titolo", tema:"profondo",
  titolo:"Due istituzioni,<br>un governo **condiviso**.",
  sotto:"Regione e Università insieme."},

// --- 5 · l'azienda di Padova
{id:"s26", tipo:"assetempo", tema:"chiaro", sopratitolo:"Da Azienda Ospedaliera ad Azienda Ospedale-Università",
  da:1995, a:2025, decenni:[2000,2010,2020], tappe:[
  {anno:1999, et:"D.Lgs. 517"},
  {anno:2019, et:"Nasce l'AOUPD", key:true}]},
{id:"s27", tipo:"sigla", tema:"chiaro", sopratitolo:"Il nome dice la sostanza", lettere:[
  {l:"A", p:"Azienda"}, {l:"O", p:"Ospedale"}, {l:"U", p:"Università", key:true}, {l:"P", p:"Padova"}],
  sotto:"AOUP, o AOUPD: un'unica azienda dove **ospedale** e **università** lavorano insieme."},
{id:"s28", tipo:"illustrata", tema:"chiaro", ill:"calendario", sopratitolo:"Nello stesso anno",
  titolo:"L'**atto aziendale**", punti:[
    {icona:"documento", t:"adottato in via definitiva con la **delibera 539**"},
    {icona:"cartella", t:"fissa l'**organizzazione** dell'Azienda", key:true}],
  etichette:{data:{t:"16 mag 2019", key:true}, nota:"Delibera 539"}},
{id:"s29", tipo:"illustrata", tema:"chiaro", ill:"territorio", sopratitolo:"PSSR 2019-2023",
  titolo:"**Hub** di eccellenza regionale", punti:[
    {icona:"ospedale", t:"il vertice della **rete ospedaliera** veneta"},
    {icona:"libro", t:"l'abbiamo vista nel **modulo 2**", key:true}],
  etichette:{centro:{t:"Padova", key:true}, comuni:"Spoke"}},
{id:"s30", tipo:"contatore", tema:"chiaro", sopratitolo:"Qualche numero, dal sito dell'Azienda",
  valori:[{n:1740, t:"posti letto previsti dalla programmazione regionale", key:true}],
  sotto:"Una delle strutture ospedaliere **più grandi d'Italia**."},
{id:"s31", tipo:"contatore", tema:"chiaro", sopratitolo:"L'organizzazione per dipartimenti", sep:"+",
  valori:[{n:9, t:"dipartimenti strutturali"}, {n:1, t:"funzionale"}, {n:1, t:"amministrativo", key:true}],
  sotto:"Dieci dipartimenti per l'**area ospedaliera**, uno per l'**area amministrativa**."},
{id:"s32", tipo:"icone", tema:"chiaro", sopratitolo:"La funzione di hub", voci:[
  {icona:"ospedale", t:"Casi **complessi** da tutto il Veneto"},
  {icona:"cuoremano", t:"**Trapianti** e alta specialità"},
  {icona:"cappello", t:"La formazione di **migliaia** di studenti"}]},
{id:"s33", tipo:"rete", tema:"chiaro", sopratitolo:"Responsabilità verso gli altri ospedali",
  centro:"Hub", dcentro:"Padova", nodi:[
  {t:"Consulenze", icona:"chat"}, {t:"Trasferimenti", icona:"ospedale"},
  {t:"Reti cliniche", icona:"persone", key:true}, {t:"Ospedali spoke", icona:"cartella"}],
  inizio:-Math.PI/4, rx:540, ry:230},
{id:"s34", tipo:"confronto", tema:"tenue", sopratitolo:"Occhio: Padova e Verona", col:[
  {h:"Aziende ospedaliere universitarie", t:"**alta specializzazione**, didattica, ricerca"},
  {h:"Non sono ULSS", t:"niente **distretti**, niente popolazione di un territorio"}]},
{id:"s35", tipo:"titolo", tema:"profondo",
  titolo:"Un hub che **cura**,<br>**forma** e fa **ricerca**."},

// --- 6 · che cosa cambia per chi ci lavora
{id:"s36", tipo:"illustrata", tema:"chiaro", ill:"universita", sopratitolo:"Per chi lavora nel comparto",
  titolo:"La **didattica** entra in reparto", punti:[
    {icona:"cappello", t:"gli studenti delle professioni sanitarie"},
    {icona:"ospedale", t:"fanno **tirocinio** nei reparti", key:true}],
  etichette:{alto:{t:"Tirocinio", key:true}}},
{id:"s37", tipo:"flusso", tema:"chiaro", sopratitolo:"Il tutoraggio", passi:[
  {icona:"cuoremano", t:"Insegna", d:"sul campo"},
  {icona:"occhio", t:"Valuta"},
  {icona:"persone", t:"Accompagna", d:"lo studente", key:true}]},
{id:"s38", tipo:"norma", tema:"chiaro", etichetta:"Secondo la dispensa, nelle aziende integrate", sigla:"Titolarità dei corsi",
  testo:"Può andare ai **dirigenti delle strutture** dove si svolge la formazione: in sede **ospedaliera**."},
{id:"s39", tipo:"illustrata", tema:"chiaro", ill:"lente", sopratitolo:"Poi la ricerca",
  titolo:"Anche il **comparto**", punti:[
    {icona:"occhio", t:"studi clinici, protocolli **sperimentali**"},
    {icona:"documento", t:"la **raccolta dei dati**"},
    {icona:"persone", t:"infermieri, tecnici, ostetriche: con **procedure precise**", key:true}],
  etichette:{titolo:{t:"Studio clinico", key:true}}},
{id:"s40", tipo:"illustrata", tema:"chiaro", ill:"tavolo", inverti:true, sopratitolo:"Il lavoro in équipe",
  titolo:"Regole diverse, **obiettivi comuni**", punti:[
    {icona:"ospedale", t:"dipendenti dell'**Azienda**"},
    {icona:"cappello", t:"docenti dell'**Università** che fanno assistenza", key:true}],
  etichette:{p1:"AOU", p2:"UNI", p3:"AOU", p4:{t:"UNI", key:true}}},
{id:"s41", tipo:"icone", tema:"chiaro", sopratitolo:"Infine la complessità di un hub", voci:[
  {icona:"ingranaggio", t:"Tecnologie **avanzate**"},
  {icona:"certificato", t:"Percorsi di **alta specialità**"},
  {icona:"orologio",    t:"Ritmi **intensi**"}]},
{id:"s42", tipo:"illustrata", tema:"chiaro", ill:"calendario", sopratitolo:"La formazione continua",
  titolo:"Crescere **lavorando**", punti:[
    {icona:"libro", t:"aggiornamento obbligatorio, **crediti ECM**"},
    {icona:"cappello", t:"corsi interni, molte **occasioni**"},
    {icona:"certificato", t:"contano per la **crescita professionale**", key:true}],
  etichette:{data:{t:"ECM", key:true}, nota:"Formazione"}},
{id:"s43", tipo:"flusso", tema:"chiaro", sopratitolo:"Nel resto del modulo, con questi occhi", passi:[
  {icona:"documento", t:"L'atto aziendale", d:"lezione 4.3"},
  {icona:"cartella", t:"I dipartimenti", d:"lezione 4.4"},
  {icona:"scudo", t:"Il governo clinico", d:"lezione 4.5", key:true}]},

// --- 7 · le tre cose
{id:"s44", tipo:"memo", tema:"chiaro", attive:[0], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s45", tipo:"memo", tema:"chiaro", attive:[0,1], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s46", tipo:"memo", tema:"chiaro", attive:[0,1,2], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s47", tipo:"trappola", tema:"tenue", sopratitolo:"L'ultimo distrattore", righe:[
  {sb:"L'organo di indirizzo controlla i conti",
   ok:"I conti li controlla il collegio sindacale; l'organo di indirizzo tiene coerenti le missioni"}]},

// --- 8 · chiusura
{id:"s48", tipo:"titolo", tema:"profondo",
  titolo:"Tre missioni,<br>due istituzioni,<br>**un governo insieme**.",
  sotto:"Prossima lezione: l'atto aziendale e la direzione strategica."},

{id:"s49", tipo:"copertina", tema:"profondo", modulo:"Prossima lezione",
  titolo:"Lezione 4.3", sottotitolo:"Atto aziendale<br>e direzione strategica", ente:ENTE},
];
