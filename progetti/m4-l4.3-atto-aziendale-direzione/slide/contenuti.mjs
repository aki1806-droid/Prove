// Contenuto delle 47 scene della lezione 4.3. *accento*  **accento in semibold**
//
// Corso «Progressione verticale · Comparto Sanità», Modulo 4. Atto aziendale e direzione
// strategica: l'atto aziendale (diritto privato, delibera del DG, approvazione regionale,
// DGR Veneto 1306/2017); il direttore generale (D.Lgs. 171/2016); DS, DA, DSS; collegio di
// direzione e collegio sindacale.

const ENTE = "CISL FP Padova Rovigo · Progressione verticale · Comparto Sanità";

const TRE_COSE = [
  "L'**atto aziendale** è di **diritto privato**: lo adotta il **DG** sui criteri regionali e lo **approva la Regione** (Veneto: DGR **1306/2017**)",
  "Il **DG**: elenco nazionale del **D.Lgs. 171/2016**, nomina della **Regione**, **3-5 anni**, verifica entro **24 mesi**",
  "Collegio di **direzione**: almeno **ogni 2 mesi**, governo clinico. Collegio **sindacale**: **3** componenti, **ogni mese**, riferisce **ogni 3 mesi**",
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 4 · Organizzazione aziendale e AOUPD",
  titolo:"Atto aziendale<br>e direzione strategica", sottotitolo:"Lezione 4.3", ente:ENTE},

// --- 1 · aggancio
{id:"s02", tipo:"illustrata", tema:"chiaro", ill:"documento", sopratitolo:"Come la costituzione di uno Stato",
  titolo:"L'**atto aziendale**", punti:[
    {icona:"persona", t:"chi **decide**"},
    {icona:"ingranaggio", t:"**come**"},
    {icona:"bilancia", t:"con quali **limiti**", key:true}],
  etichette:{titolo:{t:"Atto aziendale", key:true}, sigillo:"Azienda"}},
{id:"s03", tipo:"illustrata", tema:"chiaro", ill:"tavolo", sopratitolo:"Chi lo scrive e lo applica",
  titolo:"La **direzione strategica**", punti:[
    {icona:"persona", t:"la **direzione**"},
    {icona:"persone", t:"i collegi che la **affiancano**"},
    {icona:"occhio", t:"e la **controllano**", key:true}],
  etichette:{p1:"DS", p2:{t:"DG", key:true}, p3:"DA", p4:"DSS"}},
{id:"s04", tipo:"titolo", tema:"profondo",
  titolo:"Prima le **regole** del gioco.<br>Poi chi le fa **rispettare**."},

// --- 2 · rotta
{id:"s05", tipo:"flusso", tema:"chiaro", sopratitolo:"Quattro passaggi", passi:[
  {icona:"documento", t:"L'atto aziendale"},
  {icona:"persona", t:"Il DG", d:"scelta e valutazione"},
  {icona:"persone", t:"I direttori", d:"che lo affiancano"},
  {icona:"occhio", t:"I due collegi", d:"di direzione e sindacale", key:true}]},

// --- 3 · l'atto aziendale
{id:"s06", tipo:"illustrata", tema:"chiaro", ill:"organigramma", sopratitolo:"Lo strumento dell'autonomia organizzativa",
  titolo:"Organizzazione e **funzionamento**", punti:[
    {icona:"cartella", t:"definisce l'**organizzazione**"},
    {icona:"ingranaggio", t:"e il **funzionamento**"},
    {icona:"libro", t:"l'autonomia della **lezione 4.1**", key:true}],
  etichette:{top:{t:"Atto aziendale", key:true}}},
{id:"s07", tipo:"norma", tema:"chiaro", etichetta:"La sua natura giuridica", sigla:"Diritto privato",
  testo:"Lo adotta il **direttore generale** con una delibera, sui **criteri della Regione**."},
{id:"s08", tipo:"flusso", tema:"chiaro", sopratitolo:"Autonomia e governo regionale, in equilibrio", passi:[
  {icona:"bilancia", t:"La Regione", d:"fissa i criteri"},
  {icona:"persona", t:"Il DG", d:"adotta l'atto"},
  {icona:"certificato", t:"La Regione", d:"lo approva: senza, non è efficace", key:true}]},
{id:"s09", tipo:"illustrata", tema:"chiaro", ill:"calendario", sopratitolo:"Nel Veneto",
  titolo:"La DGR **1306/2017**", punti:[
    {icona:"documento", t:"linee guida per il **nuovo atto aziendale**", key:true},
    {icona:"libro", t:"dopo la riforma della **L.R. 19/2016**"}],
  etichette:{data:{t:"2017", key:true}, nota:"Linee guida"}},
{id:"s10", tipo:"icone", tema:"chiaro", sopratitolo:"Le stesse linee guida regolano", voci:[
  {icona:"persone",   t:"Il **distretto**"},
  {icona:"scudo",     t:"La **prevenzione**"},
  {icona:"cuoremano", t:"La **salute mentale**"},
  {icona:"cartella",  t:"L'area **non ospedaliera**"}]},
{id:"s11", tipo:"rete", tema:"chiaro", sopratitolo:"Che cosa disciplina: compiti, obiettivi, decisioni",
  centro:"Atto", dcentro:"aziendale", nodi:[
  {t:"Direttori", icona:"persona"}, {t:"Dipartimenti", icona:"cartella"},
  {t:"Distretti", icona:"persone"}, {t:"Dirigenti di struttura", icona:"certificato", key:true}],
  inizio:-Math.PI/4, rx:540, ry:230},
{id:"s12", tipo:"illustrata", tema:"chiaro", ill:"stretta", sopratitolo:"Le decisioni che impegnano l'azienda verso l'esterno",
  titolo:"La mappa delle **responsabilità**", punti:[
    {icona:"documento", t:"chi **firma**"},
    {icona:"persona", t:"chi **risponde**"},
    {icona:"spunta", t:"di **che cosa**", key:true}],
  etichette:{sx:"Azienda", dx:"Esterno", centro:{t:"Chi firma", key:true}}},
{id:"s13", tipo:"illustrata", tema:"chiaro", ill:"organigramma", sopratitolo:"Che cosa c'è dentro",
  titolo:"L'**architettura**", punti:[
    {icona:"cartella", t:"organigramma e **dipartimenti**"},
    {icona:"ospedale", t:"unità operative **complesse** e **semplici**"},
    {icona:"libro", t:"le vedremo nella **lezione 4.4**", key:true}],
  etichette:{top:"Direzione", m2:{t:"Dipartimenti", key:true}, basso:"Unità operative"}},
{id:"s14", tipo:"illustrata", tema:"chiaro", ill:"calendario", sopratitolo:"All'Azienda Ospedale Università Padova",
  titolo:"La delibera **539**", punti:[
    {icona:"documento", t:"l'atto aziendale adottato **in via definitiva**", key:true}],
  etichette:{data:{t:"16 mag 2019", key:true}, nota:"Atto aziendale"}},
{id:"s15", tipo:"trappola", tema:"tenue", sopratitolo:"Occhio a un distrattore", righe:[
  {sb:"L'atto aziendale è una legge scritta dalla Regione",
   ok:"Lo adotta il direttore generale; la Regione fissa i criteri e lo approva"}]},
{id:"s16", tipo:"titolo", tema:"profondo",
  titolo:"La **costituzione** dell'azienda:<br>scritta dal DG,<br>approvata dalla **Regione**."},

// --- 4 · il direttore generale
{id:"s17", tipo:"norma", tema:"chiaro", etichetta:"D.Lgs. 171/2016 · la dirigenza sanitaria", sigla:"Il direttore generale",
  testo:"Regole **nuove** per sceglierlo, nominarlo e **valutarlo**."},
{id:"s18", tipo:"illustrata", tema:"chiaro", ill:"documento", sopratitolo:"Presso il ministero della Salute",
  titolo:"L'elenco degli **idonei**", punti:[
    {icona:"ospedale", t:"un elenco **nazionale**"},
    {icona:"orologio", t:"aggiornato ogni **2 anni**"},
    {icona:"persone", t:"una commissione di **5 membri**", key:true}],
  etichette:{titolo:{t:"Elenco nazionale", key:true}, sigillo:"Idonei"}},
{id:"s19", tipo:"tre", tema:"chiaro", attive:[0,1,2], sopratitolo:"I requisiti per entrare nell'elenco", box:[
  {n:"1", t:"Laurea"},
  {n:"2", t:"Esperienza dirigenziale", d:"5 anni in sanità, o 7 in altri settori"},
  {n:"3", t:"Corso di formazione", d:"l'attestato in gestione sanitaria"}]},
{id:"s20", tipo:"flusso", tema:"chiaro", sopratitolo:"La nomina", passi:[
  {icona:"documento", t:"Elenco nazionale", d:"gli idonei"},
  {icona:"bilancia", t:"Presidente della Regione", d:"decreto di nomina"},
  {icona:"persona", t:"Direttore generale", d:"non dopo due mandati consecutivi", key:true}]},
{id:"s21", tipo:"scadenza", tema:"chiaro", sopratitolo:"Contratto di diritto privato, con obiettivi e risorse",
  max:6, banda:[3,5], inizio:"nomina", fine:"",
  tappe:[{a:3, v:"3 anni", t:"durata **minima**"}, {a:5, v:"5 anni", t:"durata **massima**", key:true}]},
{id:"s22", tipo:"contatore", tema:"chiaro", sopratitolo:"La verifica",
  valori:[{n:24, t:"mesi dalla nomina, al massimo", key:true}],
  sotto:"La Regione sente la **Conferenza dei sindaci** (o il consiglio dei sanitari). Se negativa, il DG **decade**."},
{id:"s23", tipo:"icone", tema:"chiaro", sopratitolo:"Alcune incompatibilità", voci:[
  {icona:"giudice", t:"Condanne per reati contro la **PA**"},
  {icona:"chat",    t:"Candidati alle **elezioni** nei 5 anni prima"},
  {icona:"euro",    t:"Incarichi in **enti privati** finanziati dal SSN, nei 2 anni prima"}]},
{id:"s24", tipo:"illustrata", tema:"chiaro", ill:"stretta", sopratitolo:"Nelle aziende ospedaliero-universitarie",
  titolo:"Anche l'**intesa**", punti:[
    {icona:"cappello", t:"con il **Rettore** dell'Università", key:true}],
  etichette:{sx:"Regione", dx:"Rettore", centro:{t:"Intesa", key:true}}},
{id:"s25", tipo:"titolo", tema:"profondo",
  titolo:"Scelto da un **elenco nazionale**,<br>nominato dalla Regione,<br>valutato sui **risultati**."},

// --- 5 · i direttori che lo affiancano
{id:"s26", tipo:"illustrata", tema:"chiaro", ill:"tavolo", sopratitolo:"Il DG non governa da solo",
  titolo:"I suoi **collaboratori**", punti:[
    {icona:"documento", t:"scelti da **elenchi regionali**"},
    {icona:"chat", t:"formati con **avviso pubblico**"},
    {icona:"orologio", t:"in carica da **3 a 5 anni**", key:true}],
  etichette:{p1:"DS", p2:{t:"DG", key:true}, p3:"DA", p4:"DSS"}},
{id:"s27", tipo:"illustrata", tema:"chiaro", ill:"ospedale", sopratitolo:"Il direttore sanitario",
  titolo:"Un **medico**", punti:[
    {icona:"persona", t:"meno di **65 anni**"},
    {icona:"orologio", t:"almeno **5 anni** di direzione sanitaria"},
    {icona:"chat", t:"dirige i servizi e dà **pareri** al DG", key:true}],
  etichette:{insegna:{t:"Direttore sanitario", key:true}}},
{id:"s28", tipo:"illustrata", tema:"chiaro", ill:"bilancio", sopratitolo:"Il direttore amministrativo",
  titolo:"Economia e **diritto**", punti:[
    {icona:"cappello", t:"laurea **economica** o **giuridica**"},
    {icona:"persona", t:"meno di **65 anni**"},
    {icona:"cartella", t:"5 anni in strutture **medie o grandi**", key:true}],
  etichette:{sx:"Economia", dx:"Diritto", alto:{t:"Direttore amministrativo", key:true}}},
{id:"s29", tipo:"illustrata", tema:"chiaro", ill:"comunita", sopratitolo:"Nelle ULSS",
  titolo:"Il direttore dei **servizi sociali**", punti:[
    {icona:"persone", t:"sentita la **Conferenza dei sindaci**", key:true},
    {icona:"cuoremano", t:"esperienza in enti **sociali**"}],
  etichette:{alto:{t:"Servizi sociali", key:true}}},
{id:"s30", tipo:"confronto", tema:"chiaro", sopratitolo:"Tutti con contratto di diritto privato", col:[
  {h:"Il loro parere", t:"**obbligatorio** sulle materie di competenza", grande:true},
  {h:"Il direttore generale", t:"deve **chiederlo** prima di decidere", grande:true}]},
{id:"s31", tipo:"trappola", tema:"tenue", sopratitolo:"Un distrattore frequente", righe:[
  {sb:"Direttore sanitario e amministrativo sono organi dell'azienda",
   ok:"Coadiuvano il direttore generale, che resta l'organo di vertice"}]},

// --- 6 · i due collegi
{id:"s32", tipo:"illustrata", tema:"chiaro", ill:"tavolo", inverti:true, sopratitolo:"Il primo collegio",
  titolo:"Il collegio di **direzione**", punti:[
    {icona:"persona", t:"nominato dal **direttore generale**"},
    {icona:"orologio", t:"in carica da **3 a 5 anni**", key:true}],
  etichette:{alto:{t:"Collegio di direzione", key:true}}},
{id:"s33", tipo:"rete", tema:"chiaro", sopratitolo:"Chi ne fa parte",
  centro:"Collegio", dcentro:"di direzione", nodi:[
  {t:"Direzione strategica", icona:"persona"}, {t:"Direttori di dipartimento", icona:"cartella"},
  {t:"Funzioni ospedaliera e territoriale", icona:"ospedale"}, {t:"Professioni sanitarie", icona:"persone", key:true},
  {t:"Farmacia", icona:"goccia"}, {t:"Medici di famiglia e pediatri", icona:"cuoremano"}],
  rx:560, ry:240},
{id:"s34", tipo:"ciclo", tema:"chiaro", sopratitolo:"Che cosa fa · si riunisce almeno ogni due mesi",
  centro:"Governo clinico", fasi:[
  {icona:"cuoremano", t:"Attività cliniche"},
  {icona:"libro", t:"Pianificazione"},
  {icona:"cappello", t:"Ricerca e formazione"},
  {icona:"euro", t:"Libera professione", key:true}]},
{id:"s35", tipo:"rete", tema:"chiaro", sopratitolo:"Il secondo collegio: tre componenti designati da",
  centro:"Collegio", dcentro:"sindacale", nodi:[
  {t:"Presidente della Regione", icona:"bilancia"}, {t:"Ministero dell'Economia", icona:"euro"},
  {t:"Ministero della Salute", icona:"ospedale", key:true}], inizio:-Math.PI/2, rx:520, ry:240},
{id:"s36", tipo:"flusso", tema:"chiaro", sopratitolo:"Come nasce", passi:[
  {icona:"certificato", t:"Registro dei revisori", d:"o funzionari del MEF"},
  {icona:"persona", t:"Il DG", d:"nomina e convoca"},
  {icona:"chat", t:"La prima seduta", d:"il collegio elegge il presidente", key:true}]},
{id:"s37", tipo:"contatore", tema:"chiaro", sopratitolo:"Tre numeri", sep:"·",
  valori:[{n:3, t:"anni in carica"}, {n:12, t:"riunioni in un anno", key:true}, {n:2, t:"assenze ingiustificate: decade"}],
  sotto:"E deve essere **indipendente**."},
{id:"s38", tipo:"illustrata", tema:"chiaro", ill:"lente", sopratitolo:"Organo di controllo interno",
  titolo:"Che cosa **verifica**", punti:[
    {icona:"euro", t:"l'amministrazione, sotto il profilo **economico**"},
    {icona:"bilancia", t:"l'osservanza della **legge**"},
    {icona:"cartella", t:"la contabilità, la **cassa** e il **magazzino**", key:true}],
  etichette:{titolo:{t:"Collegio sindacale", key:true}}},
{id:"s39", tipo:"illustrata", tema:"chiaro", ill:"calendario", sopratitolo:"E riferisce alla Regione",
  titolo:"Ogni **tre mesi**", punti:[
    {icona:"avviso", t:"**subito**, se sospetta gravi irregolarità", key:true},
    {icona:"libro", t:"i verbali nel **libro delle adunanze**"}],
  etichette:{data:{t:"Trimestre", key:true}, nota:"Relazione"}},
{id:"s40", tipo:"illustrata", tema:"chiaro", ill:"organigramma", sopratitolo:"Il metodo dei controlli",
  titolo:"Il **campionamento**", punti:[
    {icona:"divieto", t:"non guarda **tutto**"},
    {icona:"spunta", t:"sceglie in modo **motivato**"},
    {icona:"occhio", t:"i fenomeni più **rilevanti**", key:true}],
  etichette:{basso:{t:"Il campione", key:true}}},
{id:"s41", tipo:"titolo", tema:"profondo",
  titolo:"Un collegio che **aiuta**<br>a governare,<br>uno che **controlla** i conti."},

// --- 7 · le tre cose
{id:"s42", tipo:"memo", tema:"chiaro", attive:[0], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s43", tipo:"memo", tema:"chiaro", attive:[0,1], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s44", tipo:"memo", tema:"chiaro", attive:[0,1,2], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s45", tipo:"trappola", tema:"tenue", sopratitolo:"L'ultimo distrattore", righe:[
  {sb:"Il collegio sindacale lo nomina il ministero",
   ok:"Designano Regione e ministeri; il provvedimento di nomina è del direttore generale"}]},

// --- 8 · chiusura
{id:"s46", tipo:"titolo", tema:"profondo",
  titolo:"Un atto che **organizza**,<br>un direttore che **risponde**,<br>due collegi al suo fianco.",
  sotto:"Prossima lezione: dipartimenti e unità operative."},

{id:"s47", tipo:"copertina", tema:"profondo", modulo:"Prossima lezione",
  titolo:"Lezione 4.4", sottotitolo:"Dipartimenti<br>e unità operative", ente:ENTE},
];
