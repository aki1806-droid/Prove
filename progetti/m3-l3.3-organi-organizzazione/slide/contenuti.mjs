// Contenuto delle 49 scene della lezione 3.3. *accento*  **accento in semibold**
//
// Corso «Progressione verticale · Comparto Sanità», Modulo 3. Organi e organizzazione
// dell'azienda: organi (L.R. 56/1994 artt. 10 e 13; collegio dei revisori, L.R. 55/1994
// artt. 40-44), direzione strategica, consiglio dei sanitari, collegio di direzione
// (D.Lgs. 502/1992 art. 17), ospedale-territorio-prevenzione, distretto, dipartimenti,
// UOC/UOS, servizi amministrativi (art. 21), controllo di gestione (art. 20), atto aziendale.

const ENTE = "CISL FP Padova Rovigo · Progressione verticale · Comparto Sanità";

const ORGANI = {
  colonne:["26%","37%","37%"],
  intestazioni:["", "Nella L.R. 56/1994", "Oggi (L.R. 19/2016)"],
  righe:[
    ["Chi decide", "**direttore generale**", "**direttore generale**"],
    ["Chi controlla i conti", "collegio dei **revisori**", "collegio **sindacale**"],
    ["Governo clinico", "—", "collegio di **direzione**"],
  ],
};

const TRE_AREE = [
  {n:"1", t:"Ospedale", d:"ricovero e cura"},
  {n:"2", t:"Territorio", d:"distretti, medici di famiglia, pediatri, farmacie"},
  {n:"3", t:"Prevenzione", d:"igiene e sanità pubblica, screening, veterinari"},
];

const TRE_COSE = [
  "Nella **L.R. 56**: organi = **direttore generale** e **collegio dei revisori**. Oggi collegio **sindacale**, e la L.R. 19 aggiunge il **collegio di direzione**",
  "Il DG nomina direttore **sanitario**, **amministrativo** e dei **servizi socio-sanitari** (sentita la Conferenza dei sindaci)",
  "La ULSS: **ospedale**, **territorio** (distretti) e **prevenzione**; dentro, **dipartimenti** e unità operative complesse e semplici",
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 3 · Legislazione socio-sanitaria del Veneto",
  titolo:"Organi, distretti<br>e dipartimenti", sottotitolo:"Lezione 3.3", ente:ENTE},

// --- 1 · aggancio
{id:"s02", tipo:"rete", tema:"chiaro", sopratitolo:"Il primo mese in una ULSS",
  centro:"Chi decide?", dcentro:"e che cosa", nodi:[
  {t:"Direttore generale", icona:"persona"}, {t:"Collegio sindacale", icona:"occhio"},
  {t:"Distretto", icona:"persone"}, {t:"Dipartimento", icona:"cartella"},
  {t:"Unità operativa complessa", icona:"ospedale", key:true}], rx:560, ry:250},
{id:"s03", tipo:"confronto", tema:"chiaro", sopratitolo:"La L.R. 56 risponde in due modi", col:[
  {h:"Gli organi", t:"**governano** l'azienda", grande:true},
  {h:"L'organizzazione interna", t:"la fa **funzionare** ogni giorno", grande:true}]},
{id:"s04", tipo:"titolo", tema:"profondo",
  titolo:"Organi e strutture:<br>la **mappa** per non perdersi."},

// --- 2 · rotta
{id:"s05", tipo:"flusso", tema:"chiaro", sopratitolo:"Quattro passaggi", passi:[
  {icona:"persona", t:"Gli organi"},
  {icona:"persone", t:"La direzione", d:"e chi la affianca"},
  {icona:"ospedale", t:"Le tre aree", d:"ospedale, territorio, prevenzione", key:true},
  {icona:"cartella", t:"Le strutture", d:"dipartimenti, UO, servizi"}]},

// --- 3 · gli organi
{id:"s06", tipo:"norma", tema:"chiaro", etichetta:"L.R. 56/1994 · art. 10, e art. 13 per il direttore generale", sigla:"Due organi",
  testo:"Il **direttore generale** e il **collegio dei revisori**."},
{id:"s07", tipo:"illustrata", tema:"chiaro", ill:"documento", sopratitolo:"Il direttore generale",
  titolo:"Nominato dalla **Giunta**", punti:[
    {icona:"persone", t:"sentito il **Consiglio regionale**"},
    {icona:"certificato", t:"**legale rappresentante** dell'azienda"},
    {icona:"scudo", t:"responsabilità **complessiva**", key:true}],
  etichette:{titolo:{t:"Direttore generale", key:true}, sigillo:"Nomina"}},
{id:"s08", tipo:"flusso", tema:"chiaro", sopratitolo:"Di che cosa risponde", passi:[
  {icona:"libro", t:"Gli obiettivi", d:"assegnati dalla Giunta"},
  {icona:"euro", t:"La gestione", d:"corretta ed economica delle risorse"},
  {icona:"occhio", t:"La valutazione", d:"ogni anno", key:true}]},
{id:"s09", tipo:"albero", tema:"chiaro", sopratitolo:"Chi nomina",
  radice:"**Direttore generale**", rami:[
  {cond:"nomina", esito:"il direttore **sanitario**"},
  {cond:"nomina", esito:"il direttore **amministrativo**"},
  {cond:"nomina", esito:"il direttore dei **servizi socio-sanitari**", key:true}]},
{id:"s10", tipo:"rete", tema:"chiaro", sopratitolo:"Il secondo organo: tre componenti designati da",
  centro:"Collegio", dcentro:"dei revisori", nodi:[
  {t:"Giunta regionale", icona:"bilancia"}, {t:"Ministero dell'Economia", icona:"euro"},
  {t:"Ministero della Salute", icona:"ospedale", key:true}], inizio:-Math.PI/2, rx:520, ry:240},
{id:"s11", tipo:"illustrata", tema:"chiaro", ill:"lente", sopratitolo:"Vigila sulla regolarità amministrativa e contabile",
  titolo:"I **conti** sotto la lente", punti:[
    {icona:"libro", t:"i **libri contabili**"},
    {icona:"documento", t:"gli adempimenti **fiscali**"},
    {icona:"euro", t:"atti di gestione e **titoli di spesa**", key:true}],
  etichette:{titolo:{t:"Collegio dei revisori", key:true}}},
{id:"s12", tipo:"illustrata", tema:"chiaro", ill:"bilancio", sopratitolo:"E sulla gestione economica, finanziaria e patrimoniale",
  titolo:"Prima e **dopo**", punti:[
    {icona:"documento", t:"parere **preventivo** sui bilanci di previsione e sul budget"},
    {icona:"occhio", t:"esame del **bilancio d'esercizio**", key:true},
    {icona:"libro", t:"le regole: **L.R. 55**, artt. 40-44"}],
  etichette:{sx:"Previsione", dx:{t:"Esercizio", key:true}}},
{id:"s13", tipo:"tabella", tema:"tenue", sopratitolo:"Attenzione ai nomi di oggi", ...ORGANI, chiave:[1,2]},
{id:"s14", tipo:"titolo", tema:"profondo",
  titolo:"Uno **decide** e risponde.<br>L'altro **controlla** i conti."},

// --- 4 · la direzione e chi la affianca
{id:"s15", tipo:"illustrata", tema:"chiaro", ill:"tavolo", sopratitolo:"La direzione strategica",
  titolo:"Accanto al **DG**", punti:[
    {icona:"cuoremano", t:"il direttore **sanitario**"},
    {icona:"documento", t:"il direttore **amministrativo**"},
    {icona:"chat", t:"con **pareri obbligatori** sulle loro materie", key:true}],
  etichette:{p1:"DS", p2:{t:"DG", key:true}, p3:"DA", p4:"DSS"}},
{id:"s16", tipo:"flusso", tema:"chiaro", sopratitolo:"Nel Veneto, una terza figura", passi:[
  {icona:"persone", t:"La Conferenza dei sindaci", d:"o il sindaco, viene sentita"},
  {icona:"persona", t:"Il direttore generale", d:"nomina"},
  {icona:"cuoremano", t:"Il direttore dei servizi socio-sanitari", key:true}]},
{id:"s17", tipo:"illustrata", tema:"chiaro", ill:"tavolo", inverti:true, sopratitolo:"La firma del modello veneto",
  titolo:"Il sociale **al tavolo**", punti:[
    {icona:"cuoremano", t:"il **sociale** ha un suo direttore"},
    {icona:"persone", t:"accanto al **sanitario** e all'**amministrativo**", key:true}],
  etichette:{p1:"DS", p2:"DG", p3:"DA", p4:{t:"DSS", key:true}}},
{id:"s18", tipo:"confronto", tema:"chiaro", sopratitolo:"La L.R. 19/2016 aggiunge due regole", col:[
  {h:"Oltre 3.000 posti letto", t:"il DS può avere un **coordinatore sanitario**"},
  {h:"Oltre 500.000 abitanti", t:"il DA può avere un **coordinatore amministrativo**"}]},
{id:"s19", tipo:"norma", tema:"chiaro", etichetta:"Previsto dalla L.R. 56/1994", sigla:"Consiglio dei sanitari",
  testo:"Organismo **elettivo** di consulenza **tecnico-sanitaria**."},
{id:"s20", tipo:"illustrata", tema:"chiaro", ill:"comunita", sopratitolo:"Il consiglio dei sanitari",
  titolo:"Lo presiede il **DS**", punti:[
    {icona:"persone", t:"i rappresentanti delle **professioni sanitarie**"},
    {icona:"cuoremano", t:"medici, infermieri, tecnici, farmacisti", key:true}],
  etichette:{alto:{t:"Presiede il direttore sanitario", key:true}}},
{id:"s21", tipo:"rete", tema:"chiaro", sopratitolo:"Il collegio di direzione · D.Lgs. 502/1992",
  centro:"DG", dcentro:"presiede", nodi:[
  {t:"Direttore sanitario", icona:"cuoremano"}, {t:"Direttori di dipartimento", icona:"cartella"},
  {t:"Direttore servizi socio-sanitari", icona:"persone", key:true}, {t:"Responsabili di distretto", icona:"ospedale"}],
  inizio:-Math.PI/4, rx:560, ry:230},
{id:"s22", tipo:"ciclo", tema:"chiaro", sopratitolo:"Serve al governo clinico",
  centro:"Collegio di direzione", fasi:[
  {icona:"persona", t:"Direzione strategica"},
  {icona:"persone", t:"Professionisti", key:true},
  {icona:"libro", t:"Programmazione"},
  {icona:"spunta", t:"Miglioramento"}]},
{id:"s23", tipo:"trappola", tema:"tenue", sopratitolo:"Uno scambio frequente", righe:[
  {sb:"Il consiglio dei sanitari lo presiede il direttore generale",
   ok:"Lo presiede il direttore sanitario; il collegio di direzione, il DG"}]},

// --- 5 · ospedale, territorio, prevenzione
{id:"s24", tipo:"tre", tema:"chiaro", attive:[0,1,2], sopratitolo:"Le tre grandi aree della ULSS", box:TRE_AREE},
{id:"s25", tipo:"illustrata", tema:"chiaro", ill:"territorio", sopratitolo:"Ospedale e territorio",
  titolo:"Due aree, **un territorio**", punti:[
    {icona:"ospedale", t:"l'**ospedale**: ricovero e cura"},
    {icona:"persone", t:"il **territorio**: distretti, medici di famiglia, pediatri, farmacie", key:true}],
  etichette:{centro:{t:"Ospedale", key:true}, comuni:"Distretti"}},
{id:"s26", tipo:"icone", tema:"chiaro", sopratitolo:"La prevenzione: il dipartimento di prevenzione", voci:[
  {icona:"scudo",  t:"**Igiene** e sanità pubblica"},
  {icona:"occhio", t:"**Screening**"},
  {icona:"goccia", t:"Servizi **veterinari**"}]},
{id:"s27", tipo:"norma", tema:"chiaro", etichetta:"La struttura territoriale fondamentale", sigla:"Distretto",
  testo:"Servizi sanitari e socio-sanitari per un territorio: di solito **un insieme di Comuni**."},
{id:"s28", tipo:"confronto", tema:"chiaro", sopratitolo:"Le due funzioni del distretto", col:[
  {h:"Integrare", t:"assistenza **sanitaria** e servizi **sociali**", grande:true},
  {h:"Governare", t:"**pianificare**, coordinare, valutare", grande:true}]},
{id:"s29", tipo:"illustrata", tema:"chiaro", ill:"casa", sopratitolo:"Che cosa gestisce",
  titolo:"La **casa della salute**", punti:[
    {icona:"persona", t:"l'**assistenza primaria**"},
    {icona:"cuoremano", t:"cure domiciliari e consultori"},
    {icona:"persone", t:"servizi per **anziani e disabili**", key:true}],
  etichette:{insegna:"Domicilio", dx:{t:"Distretto", key:true}}},
{id:"s30", tipo:"illustrata", tema:"chiaro", ill:"incastro", sopratitolo:"Nel Veneto (modulo 2)",
  titolo:"Lo **snodo** dell'integrazione", punti:[
    {icona:"persone", t:"il **sociale** delegato dai Comuni"},
    {icona:"ospedale", t:"incontra la **sanità**", key:true}],
  etichette:{sx:"Sanità", dx:{t:"Sociale", key:true}, basso:"Il distretto"}},
{id:"s31", tipo:"rete", tema:"chiaro", sopratitolo:"Il dipartimento di prevenzione: la salute collettiva",
  centro:"Prevenzione", nodi:[
  {t:"Malattie infettive", icona:"scudo"}, {t:"Vaccinazioni", icona:"goccia", key:true},
  {t:"Alimenti", icona:"cuoremano"}, {t:"Acqua e aria", icona:"goccia"}, {t:"Sicurezza sul lavoro", icona:"avviso"}]},
{id:"s32", tipo:"frase", tema:"chiaro", sopratitolo:"E poi screening, educazione alla salute, veterinari",
  testo:"Lavora su chi sta bene, **perché continui a stare bene**."},
{id:"s33", tipo:"flusso", tema:"chiaro", sopratitolo:"Una mamma con un neonato", passi:[
  {icona:"ospedale", t:"Ospedale", d:"il parto"},
  {icona:"persone", t:"Territorio", d:"consultorio e pediatra"},
  {icona:"scudo", t:"Prevenzione", d:"le vaccinazioni", key:true}]},
{id:"s34", tipo:"titolo", tema:"profondo",
  titolo:"Tre porte,<br>**una sola azienda**."},

// --- 6 · dipartimenti, unità operative, servizi
{id:"s35", tipo:"albero", tema:"chiaro", sopratitolo:"Le strutture operative",
  radice:"**Dipartimento**", rami:[
  {cond:"raggruppa", esito:"unità operative **affini**"},
  {cond:"per", esito:"**funzione** o **area clinica**", key:true}]},
{id:"s36", tipo:"confronto", tema:"chiaro", sopratitolo:"Le unità operative", col:[
  {h:"UOC", t:"unità operativa **complessa**", grande:true},
  {h:"UOS", t:"unità operativa **semplice**", grande:true}],
  sotto:"Centri operativi, clinici o amministrativi: dove il lavoro si fa ogni giorno."},
{id:"s37", tipo:"illustrata", tema:"chiaro", ill:"comunita", sopratitolo:"Il modello dipartimentale",
  titolo:"Integrazione **funzionale**", punti:[
    {icona:"persone", t:"professionisti **vicini**"},
    {icona:"cartella", t:"risorse **condivise**"},
    {icona:"spunta", t:"percorsi **comuni**", key:true}],
  etichette:{alto:{t:"Un dipartimento", key:true}}},
{id:"s38", tipo:"norma", tema:"chiaro", etichetta:"L.R. 56/1994 · art. 21", sigla:"Servizi di supporto",
  testo:"L'assetto dei servizi **amministrativi**, **tecnici** e **professionali**."},
{id:"s39", tipo:"icone", tema:"chiaro", sopratitolo:"Acquisiscono, organizzano e gestiscono le risorse", voci:[
  {icona:"persone",    t:"**Umane**"},
  {icona:"cartella",   t:"**Informative**"},
  {icona:"euro",       t:"**Finanziarie**"},
  {icona:"ospedale",   t:"**Patrimoniali** e materiali"}]},
{id:"s40", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Qualche esempio", celle:[
  {t:"**Risorse umane**"}, {t:"**Contabilità** e bilancio"}, {t:"**Provveditorato** ed economato"},
  {t:"Servizi **tecnici** e patrimoniali"}, {t:"**Affari generali**"}, {t:"**Sistemi informativi**"}]},
{id:"s41", tipo:"frase", tema:"chiaro", sopratitolo:"Uffici che il cittadino vede poco",
  testo:"Senza di loro **nessun reparto** aprirebbe.",
  sotto:"Il personale, gli acquisti, gli edifici, i dati."},
{id:"s42", tipo:"illustrata", tema:"chiaro", ill:"lente", sopratitolo:"L.R. 56/1994 · art. 20",
  titolo:"Il controllo **di gestione**", punti:[
    {icona:"persona", t:"nominato dal **DG**, alle sue dirette dipendenze"},
    {icona:"euro", t:"applica la **metodica di budget**", key:true},
    {icona:"libro", t:"lo ritroveremo nella **lezione 3.5**"}],
  etichette:{titolo:{t:"Controllo di gestione", key:true}}},
{id:"s43", tipo:"illustrata", tema:"chiaro", ill:"documento", sopratitolo:"Tutto, per iscritto",
  titolo:"L'**atto aziendale**", punti:[
    {icona:"cartella", t:"organizzazione, funzioni, strutture"},
    {icona:"certificato", t:"regolato dalla **L.R. 19/2016** e dalle linee guida regionali", key:true}],
  etichette:{titolo:{t:"Atto aziendale", key:true}}},

// --- 7 · le tre cose
{id:"s44", tipo:"memo", tema:"chiaro", attive:[0], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s45", tipo:"memo", tema:"chiaro", attive:[0,1], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s46", tipo:"memo", tema:"chiaro", attive:[0,1,2], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s47", tipo:"trappola", tema:"tenue", sopratitolo:"L'ultimo distrattore", righe:[
  {sb:"Il collegio dei revisori lo nomina tutto la Regione",
   ok:"Tre componenti: Giunta regionale, ministero dell'Economia, ministero della Salute"}]},

// --- 8 · chiusura
{id:"s48", tipo:"titolo", tema:"profondo",
  titolo:"Pochi organi che **decidono**,<br>tre aree che portano<br>i servizi **vicino**.",
  sotto:"Prossima lezione: la L.R. 55/1994 — programmare e rendere conto."},

{id:"s49", tipo:"copertina", tema:"profondo", modulo:"Prossima lezione",
  titolo:"Lezione 3.4", sottotitolo:"La L.R. 55/1994:<br>programmare e rendere conto", ente:ENTE},
];
