// Contenuto delle 47 scene della lezione 4.1. *accento*  **accento in semibold**
//
// Corso «Progressione verticale · Comparto Sanità», Modulo 4. L'azienda sanitaria:
// personalità giuridica pubblica e autonomie (D.Lgs. 502/1992 e 229/1999), efficienza,
// efficacia, economicità, atti di diritto privato; le tipologie di azienda: ULSS, azienda
// ospedaliera (requisiti), azienda ospedaliero-universitaria, IRCCS (D.Lgs. 288/2003).

const ENTE = "CISL FP Padova Rovigo · Progressione verticale · Comparto Sanità";

const TRE_COSE = [
  "Con il **D.Lgs. 502** le aziende hanno **personalità giuridica pubblica** e agiscono con **atti di diritto privato**, secondo efficienza, efficacia ed economicità",
  "Autonomia **organizzativa, amministrativa, patrimoniale, contabile, gestionale e tecnica**. La sintesi d'esame: **giuridica, amministrativa, patrimoniale, contabile**",
  "Tipologie: **ULSS**, **aziende ospedaliere**, **ospedaliero-universitarie**, **IRCCS**. ULSS a **quota capitaria**, ospedaliera in base alle **prestazioni**",
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 4 · Organizzazione aziendale e AOUPD",
  titolo:"L'azienda sanitaria<br>e le sue autonomie", sottotitolo:"Lezione 4.1", ente:ENTE},

// --- 1 · aggancio
{id:"s02", tipo:"illustrata", tema:"chiaro", ill:"documento", sopratitolo:"Nella busta paga",
  titolo:"C'è scritto **Azienda**", punti:[
    {icona:"divieto", t:"non **vende** niente"},
    {icona:"persone", t:"non ha **azionisti**"},
    {icona:"euro", t:"non distribuisce **utili**", key:true}],
  etichette:{titolo:{t:"Azienda", key:true}, sigillo:"Busta paga"}},
{id:"s03", tipo:"illustrata", tema:"chiaro", ill:"azienda", sopratitolo:"Dal 1992, una scelta precisa",
  titolo:"Un modello **ibrido**", punti:[
    {icona:"bilancia", t:"enti **pubblici**"},
    {icona:"ingranaggio", t:"con i metodi di un'**impresa**"},
    {icona:"spunta", t:"obiettivi, bilanci, **risultati**", key:true}],
  etichette:{insegna:"Ente pubblico", dx:{t:"Metodi d'impresa", key:true}}},
{id:"s04", tipo:"titolo", tema:"profondo",
  titolo:"**Pubblica** nei fini,<br>**aziendale** nei metodi."},

// --- 2 · rotta
{id:"s05", tipo:"flusso", tema:"chiaro", sopratitolo:"Quattro passaggi", passi:[
  {icona:"certificato", t:"L'azienda", d:"che cosa la rende tale"},
  {icona:"ingranaggio", t:"Le autonomie"},
  {icona:"cartella", t:"I tipi", d:"di azienda"},
  {icona:"ospedale", t:"Da vicino", d:"ospedaliere, universitarie, IRCCS", key:true}]},

// --- 3 · che cosa fa di un ente un'azienda
{id:"s06", tipo:"assetempo", tema:"chiaro", sopratitolo:"L'aziendalizzazione",
  da:1975, a:2005, decenni:[1980,1990,2000], tappe:[
  {anno:1978, et:"L. 833 — le unità sanitarie locali"},
  {anno:1992, et:"D.Lgs. 502 — nascono le aziende", key:true},
  {anno:1999, et:"D.Lgs. 229 — il 502 riscritto"}]},
{id:"s07", tipo:"sostituzione", tema:"chiaro", sopratitolo:"Il passaggio",
  da:{h:"Prima, con la L. 833", t:"USL, strutture dei Comuni"},
  a:{h:"Dopo il D.Lgs. 502", t:"**aziende** con personalità giuridica"}},
{id:"s08", tipo:"illustrata", tema:"chiaro", ill:"stretta", sopratitolo:"Personalità giuridica pubblica",
  titolo:"Un soggetto **a sé**", punti:[
    {icona:"cartella", t:"un **nome** e un **patrimonio**"},
    {icona:"persona", t:"un **legale rappresentante**"},
    {icona:"certificato", t:"firma contratti e **risponde**", key:true}],
  etichette:{sx:"Azienda", dx:"Fornitore", centro:{t:"Contratto", key:true}}},
{id:"s09", tipo:"ciclo", tema:"chiaro", sopratitolo:"Resta pubblica, ma lavora con tre criteri",
  centro:"Salute", dcentro:"non il profitto", fasi:[
  {icona:"spunta", t:"Efficacia"},
  {icona:"ingranaggio", t:"Efficienza"},
  {icona:"euro", t:"Economicità", key:true}]},
{id:"s10", tipo:"tre", tema:"chiaro", attive:[0,1,2], sopratitolo:"Tre parole, tre significati", box:[
  {n:"1", t:"Efficacia", d:"raggiungere il risultato di salute"},
  {n:"2", t:"Efficienza", d:"senza sprecare risorse"},
  {n:"3", t:"Economicità", d:"l'equilibrio fra costi e ricavi, nel tempo"}]},
{id:"s11", tipo:"flusso", tema:"chiaro", sopratitolo:"Un esempio: un reparto", passi:[
  {icona:"cuoremano", t:"Guarisce", d:"è efficace"},
  {icona:"orologio", t:"Con meno giornate", d:"a parità di esito: è efficiente"},
  {icona:"euro", t:"Conti che reggono", d:"negli anni: è economico", key:true}]},
{id:"s12", tipo:"icone", tema:"chiaro", sopratitolo:"Agisce con atti di diritto privato", voci:[
  {icona:"documento",   t:"**Contratti**"},
  {icona:"persone",     t:"**Accordi**"},
  {icona:"certificato", t:"**Incarichi**"}]},
{id:"s13", tipo:"confronto", tema:"tenue", sopratitolo:"Attenzione: non tutto è diritto privato", col:[
  {h:"Diritto privato", t:"contratti, accordi, **incarichi**"},
  {h:"Atti amministrativi", t:"**concorsi**, appalti, procedimenti verso i cittadini"}]},
{id:"s14", tipo:"titolo", tema:"profondo",
  titolo:"Un soggetto **pubblico**,<br>con gli strumenti<br>di un'**impresa**."},

// --- 4 · le autonomie
{id:"s15", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"D.Lgs. 502/1992, come modificato nel 1999: autonomia", celle:[
  {t:"**Organizzativa**"}, {t:"**Amministrativa**"}, {t:"**Patrimoniale**"},
  {t:"**Contabile**"}, {t:"**Gestionale**"}, {t:"**Tecnica**"}]},
{id:"s16", tipo:"illustrata", tema:"chiaro", ill:"organigramma", sopratitolo:"Autonomia organizzativa",
  titolo:"Come **organizzarsi**", punti:[
    {icona:"bilancia", t:"dentro le regole della **Regione**"},
    {icona:"documento", t:"con l'**atto aziendale**", key:true},
    {icona:"libro", t:"lo vedremo nella **lezione 4.3**"}],
  etichette:{top:{t:"Atto aziendale", key:true}}},
{id:"s17", tipo:"illustrata", tema:"chiaro", ill:"documento", sopratitolo:"Autonomia amministrativa",
  titolo:"I propri **atti**", punti:[
    {icona:"persona", t:"le delibere del **direttore generale**"},
    {icona:"cartella", t:"i provvedimenti dei **dirigenti**"},
    {icona:"spunta", t:"senza permesso **caso per caso**", key:true}],
  etichette:{titolo:{t:"Delibera", key:true}, sigillo:"DG"}},
{id:"s18", tipo:"illustrata", tema:"chiaro", ill:"ospedale", sopratitolo:"Autonomia patrimoniale",
  titolo:"Un patrimonio **proprio**", punti:[
    {icona:"cartella", t:"beni **disponibili** e **indisponibili**"},
    {icona:"lucchetto", t:"gli ospedali: beni **indisponibili**", key:true}],
  etichette:{insegna:{t:"Indisponibile", key:true}}},
{id:"s19", tipo:"illustrata", tema:"chiaro", ill:"bilancio", sopratitolo:"Autonomia contabile",
  titolo:"I propri **conti**", punti:[
    {icona:"euro", t:"contabilità **economico-patrimoniale**"},
    {icona:"documento", t:"il proprio **bilancio**"},
    {icona:"libro", t:"come nella **L.R. 55** (modulo 3)", key:true}],
  etichette:{sx:"Costi", dx:"Ricavi", alto:{t:"Bilancio", key:true}}},
{id:"s20", tipo:"illustrata", tema:"chiaro", ill:"azienda", sopratitolo:"Autonomia gestionale e tecnica",
  titolo:"Usare le **risorse**", punti:[
    {icona:"ingranaggio", t:"personale, tecnologie, risorse"},
    {icona:"spunta", t:"per gli **obiettivi** assegnati"},
    {icona:"certificato", t:"la responsabilità del **risultato**", key:true}],
  etichette:{insegna:"Azienda", dx:{t:"Risultato", key:true}}},
{id:"s21", tipo:"norma", tema:"chiaro", etichetta:"Per le ULSS, nella dispensa: autonomia", sigla:"Imprenditoriale",
  testo:"Insieme a quella contabile e patrimoniale: **decidere** e **rispondere** dei risultati."},
{id:"s22", tipo:"trappola", tema:"tenue", sopratitolo:"Occhio a un distrattore", righe:[
  {sb:"Autonomia vuol dire indipendenza dalla Regione",
   ok:"L'azienda lavora dentro la programmazione regionale, con obiettivi e controlli"}]},
{id:"s23", tipo:"contatore", tema:"chiaro", sopratitolo:"Quante sono le autonomie?", sep:"·",
  valori:[{n:4, t:"nella sintesi d'esame"}, {n:6, t:"nel testo della legge", key:true}],
  sotto:"**Giuridica, amministrativa, patrimoniale, contabile**: una sintesi utile, non l'elenco completo."},
{id:"s24", tipo:"titolo", tema:"profondo",
  titolo:"**Libera** di organizzarsi.<br>Obbligata a **rendere conto**."},

// --- 5 · i tipi di azienda
{id:"s25", tipo:"rete", tema:"chiaro", sopratitolo:"Chi eroga i livelli essenziali di assistenza",
  centro:"LEA", dcentro:"la Regione si avvale di", nodi:[
  {t:"ULSS", icona:"persone", key:true}, {t:"Aziende ospedaliere", icona:"ospedale"},
  {t:"IRCCS", icona:"occhio"}, {t:"Privati accreditati", icona:"certificato"}],
  inizio:-Math.PI/4, rx:540, ry:230},
{id:"s26", tipo:"illustrata", tema:"chiaro", ill:"territorio", sopratitolo:"La prima tipologia",
  titolo:"La **ULSS**", punti:[
    {icona:"persone", t:"unità locale **socio-sanitaria**"},
    {icona:"spunta", t:"un **territorio** e la sua popolazione", key:true}],
  etichette:{centro:"Ospedale", comuni:{t:"Territorio", key:true}}},
{id:"s27", tipo:"icone", tema:"chiaro", sopratitolo:"Che cosa fa · si finanzia a quota capitaria", voci:[
  {icona:"scudo",    t:"**Prevenzione**"},
  {icona:"persone",  t:"Assistenza **distrettuale**"},
  {icona:"ospedale", t:"Assistenza **ospedaliera**"}]},
{id:"s28", tipo:"illustrata", tema:"chiaro", ill:"tavolo", sopratitolo:"Gli organi, oggi",
  titolo:"Tre **organi**", punti:[
    {icona:"persona", t:"**direttore generale**"},
    {icona:"persone", t:"**collegio di direzione**"},
    {icona:"occhio", t:"**collegio sindacale**", key:true}],
  etichette:{p1:"DS", p2:{t:"DG", key:true}, p3:"DA", p4:"DSS"}},
{id:"s29", tipo:"illustrata", tema:"chiaro", ill:"stretta", sopratitolo:"Su delega dei Comuni",
  titolo:"Il **socio-assistenziale**", punti:[
    {icona:"persone", t:"gestito dalla **ULSS**"},
    {icona:"euro", t:"solo con le **risorse** dei Comuni", key:true}],
  etichette:{sx:"Comuni", dx:"ULSS", centro:{t:"Risorse", key:true}}},
{id:"s30", tipo:"contatore", tema:"chiaro", sopratitolo:"Il Veneto oggi", sep:"·",
  valori:[{n:9, t:"ULSS"}, {n:2, t:"aziende ospedaliere universitarie", key:true}, {n:1, t:"IOV"}, {n:1, t:"Azienda Zero"}],
  sotto:"Padova e Verona le due ospedaliere universitarie; Azienda Zero governa le funzioni comuni."},

// --- 6 · ospedaliere, universitarie, IRCCS
{id:"s31", tipo:"illustrata", tema:"chiaro", ill:"ospedale", sopratitolo:"La seconda tipologia",
  titolo:"L'**azienda ospedaliera**", punti:[
    {icona:"ospedale", t:"non un territorio: un **ospedale**"},
    {icona:"certificato", t:"di **alta specializzazione**", key:true},
    {icona:"spunta", t:"costituito in azienda **autonoma**"}],
  etichette:{insegna:{t:"Azienda ospedaliera", key:true}}},
{id:"s32", tipo:"icone", tema:"chiaro", sopratitolo:"I requisiti, prima parte", voci:[
  {icona:"cartella", t:"Organizzazione **dipartimentale**"},
  {icona:"ospedale", t:"Almeno **3** unità operative di **alta specialità**"},
  {icona:"avviso",   t:"Emergenza di **secondo livello**"}]},
{id:"s33", tipo:"contatore", tema:"chiaro", sopratitolo:"I requisiti, seconda parte",
  valori:[{n:10, t:"per cento: il minimo di pazienti da fuori regione", key:true}],
  sotto:"E un ruolo di riferimento **regionale e interregionale**, con un'alta **complessità** dei casi."},
{id:"s34", tipo:"confronto", tema:"chiaro", sopratitolo:"Due modi di finanziarsi", col:[
  {h:"ULSS", t:"**quota capitaria**: i residenti", grande:true},
  {h:"Azienda ospedaliera", t:"**prestazioni**: le tariffe", grande:true}]},
{id:"s35", tipo:"illustrata", tema:"chiaro", ill:"universita", sopratitolo:"La terza tipologia",
  titolo:"Ospedale e **università**", punti:[
    {icona:"cuoremano", t:"l'**assistenza**"},
    {icona:"cappello", t:"la **didattica**"},
    {icona:"occhio", t:"la **ricerca**", key:true}],
  etichette:{alto:{t:"Nello stesso luogo", key:true}}},
{id:"s36", tipo:"rete", tema:"chiaro", sopratitolo:"Nell'azienda integrata con l'università",
  centro:"AOU", dcentro:"gli organi", nodi:[
  {t:"DG d'intesa con il Rettore", icona:"persona", key:true}, {t:"Collegio sindacale", icona:"occhio"},
  {t:"Organo di indirizzo", icona:"bilancia"}], inizio:-Math.PI/2, rx:520, ry:240},
{id:"s37", tipo:"illustrata", tema:"chiaro", ill:"missioni", sopratitolo:"Il modello di Padova",
  titolo:"Nella **prossima lezione**", punti:[
    {icona:"ospedale", t:"l'**Azienda Ospedale Università** di Padova", key:true}],
  etichette:{a:"Assistenza", b:"Didattica", c:"Ricerca", centro:{t:"Padova", key:true}}},
{id:"s38", tipo:"illustrata", tema:"chiaro", ill:"microscopio", sopratitolo:"La quarta tipologia · D.Lgs. 288/2003",
  titolo:"Gli **IRCCS**", punti:[
    {icona:"occhio", t:"ricerca **clinica** e **biomedica**"},
    {icona:"ospedale", t:"ricovero di **alta specialità**", key:true}],
  etichette:{sx:"Ricerca", dx:{t:"Cura", key:true}}},
{id:"s39", tipo:"ciclo", tema:"chiaro", sopratitolo:"Il riconoscimento di un IRCCS",
  centro:"IRCCS", dcentro:"es. lo IOV", fasi:[
  {icona:"certificato", t:"Ministero della Salute"},
  {icona:"bilancia", t:"Intesa con la Regione"},
  {icona:"occhio", t:"Una specializzazione"},
  {icona:"orologio", t:"Verifica ogni 3 anni", key:true}]},
{id:"s40", tipo:"trappola", tema:"tenue", sopratitolo:"Un distrattore frequente", righe:[
  {sb:"L'azienda ospedaliera ha i suoi distretti",
   ok:"Territorio e distretti sono della ULSS; l'ospedaliera eroga alta specializzazione"}]},
{id:"s41", tipo:"titolo", tema:"profondo",
  titolo:"Un territorio, un ospedale,<br>un'università, un istituto:<br>**quattro modi** di essere azienda."},

// --- 7 · le tre cose
{id:"s42", tipo:"memo", tema:"chiaro", attive:[0], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s43", tipo:"memo", tema:"chiaro", attive:[0,1], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s44", tipo:"memo", tema:"chiaro", attive:[0,1,2], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s45", tipo:"trappola", tema:"tenue", sopratitolo:"L'ultimo distrattore", righe:[
  {sb:"Azienda vuol dire società privata",
   ok:"Resta un ente pubblico, senza scopo di lucro, dentro la programmazione regionale"}]},

// --- 8 · chiusura
{id:"s46", tipo:"titolo", tema:"profondo",
  titolo:"Un ente **pubblico**<br>con i metodi<br>di un'**impresa**.",
  sotto:"Prossima lezione: l'Azienda Ospedale Università di Padova e le tre missioni."},

{id:"s47", tipo:"copertina", tema:"profondo", modulo:"Prossima lezione",
  titolo:"Lezione 4.2", sottotitolo:"L'AOUPD<br>e le tre missioni", ente:ENTE},
];
