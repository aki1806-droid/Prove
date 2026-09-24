// Contenuto delle 47 scene della lezione 4.4. *accento*  **accento in semibold**
//
// Corso «Progressione verticale · Comparto Sanità», Modulo 4. Dipartimenti e unità operative:
// il modello dipartimentale; dipartimento strutturale, funzionale, ad attività integrata;
// UOC, UOSD, UOS, articolazioni funzionali (DGRV 1306/2017); responsabile unico; ricadute
// per il comparto.

const ENTE = "CISL FP Padova Rovigo · Progressione verticale · Comparto Sanità";

const TRE_COSE = [
  "Il **dipartimento** aggrega UOC e UOS con **finalità comuni**: ciascuna mantiene la propria **autonomia**",
  "Lo **strutturale** gestisce le risorse (direttore scelto fra i direttori di UOC); il **funzionale** coordina",
  "**UOC**: direttore e budget · **UOSD**: risponde al dipartimento, budget proprio · **UOS**: dentro una UOC, senza budget autonomo",
];

const TRE_UNITA = {
 colonne:["24%","25%","26%","25%"],
 intestazioni:["", "UOC", "UOSD", "UOS"],
 righe:[
  ["Dipende da",  "il **dipartimento**", "il **dipartimento**", "una **UOC**"],
  ["La guida",    "un **direttore**",    "un **responsabile**", "un **responsabile**"],
  ["Budget",      "si:proprio",          "si:proprio",          "no:non autonomo"],
 ]};

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 4 · Organizzazione aziendale e AOUPD",
  titolo:"Dipartimenti<br>e unità operative", sottotitolo:"Lezione 4.4", ente:ENTE},

// --- 1 · aggancio
{id:"s02", tipo:"illustrata", tema:"chiaro", ill:"documento", sopratitolo:"Sul tuo cartellino",
  titolo:"Due sigle, **due livelli**", punti:[
    {icona:"ospedale", t:"un'**unità operativa** complessa"},
    {icona:"cartella", t:"sotto, un **dipartimento**"},
    {icona:"occhio", t:"dove si **decide** del tuo lavoro", key:true}],
  etichette:{titolo:{t:"UOC Cardiologia", key:true}, sigillo:"Dip."}},
{id:"s03", tipo:"illustrata", tema:"chiaro", ill:"organigramma", sopratitolo:"Un'organizzazione a scatole",
  titolo:"Una dentro l'**altra**", punti:[
    {icona:"cartella", t:"il **dipartimento** contiene le unità operative"},
    {icona:"ospedale", t:"le **complesse** contengono le **semplici**", key:true}],
  etichette:{top:{t:"Dipartimento", key:true}, m2:"UOC", basso:"UOS"}},
{id:"s04", tipo:"titolo", tema:"profondo",
  titolo:"Le **scatole** in cui lavoriamo,<br>e chi ne tiene le **chiavi**."},

// --- 2 · rotta
{id:"s05", tipo:"flusso", tema:"chiaro", sopratitolo:"Quattro passaggi", passi:[
  {icona:"cartella", t:"Il modello", d:"dipartimentale"},
  {icona:"persone", t:"I tipi", d:"di dipartimento"},
  {icona:"ospedale", t:"Le unità operative", d:"UOC, UOSD, UOS"},
  {icona:"persona", t:"Chi guida", d:"ciascuna struttura", key:true}]},

// --- 3 · il modello dipartimentale
{id:"s06", tipo:"illustrata", tema:"chiaro", ill:"incastro", sopratitolo:"Che cos'è un dipartimento",
  titolo:"Un **aggregato**", punti:[
    {icona:"persone", t:"di unità operative **complesse** e **semplici**"},
    {icona:"spunta", t:"con **finalità comuni**"},
    {icona:"lucchetto", t:"ognuna con la propria **autonomia**", key:true}],
  etichette:{sx:"UOC", dx:"UOS", basso:{t:"Dipartimento", key:true}}},
{id:"s07", tipo:"icone", tema:"chiaro", sopratitolo:"Perché aggregare", voci:[
  {icona:"persone",     t:"Integrare i **professionisti**"},
  {icona:"ingranaggio", t:"Condividere le **risorse**"},
  {icona:"libro",       t:"Costruire **percorsi comuni**"},
  {icona:"ospedale",    t:"Letti, sale, apparecchiature: **rendono di più**"}]},
{id:"s08", tipo:"flusso", tema:"chiaro", sopratitolo:"Un esempio: due chirurgie, una piastra operatoria", passi:[
  {icona:"orologio", t:"Sedute", d:"programmate insieme"},
  {icona:"ospedale", t:"Sale operatorie", d:"non restano vuote"},
  {icona:"spunta", t:"Liste d'attesa", d:"più corte", key:true}]},
{id:"s09", tipo:"norma", tema:"chiaro", etichetta:"Un requisito di legge · lezione 4.1", sigla:"Aziende ospedaliere",
  testo:"Devono avere l'**organizzazione dipartimentale**."},
{id:"s10", tipo:"tre", tema:"chiaro", attive:[0,1,2], sopratitolo:"Il criterio: insieme si ottiene di più, per motivi", box:[
  {n:"1", t:"Assistenziali"},
  {n:"2", t:"Scientifici"},
  {n:"3", t:"Organizzativi"}]},
{id:"s11", tipo:"sostituzione", tema:"chiaro", sopratitolo:"Una regola da ricordare",
  da:{h:"Non si può", t:"stare in due dipartimenti strutturali"},
  a:{h:"Ogni UOC o UOSD", t:"in **un solo** dipartimento strutturale"},
  sotto:"Non si sta in due scatole **gerarchiche**."},
{id:"s12", tipo:"trappola", tema:"tenue", sopratitolo:"Occhio a un distrattore", righe:[
  {sb:"Il dipartimento toglie autonomia alle unità operative",
   ok:"Le coordina e ne condivide le risorse: ciascuna resta responsabile della propria attività"}]},
{id:"s13", tipo:"titolo", tema:"profondo",
  titolo:"**Insieme** per usare meglio le risorse,<br>ognuno **responsabile**<br>della propria parte."},

// --- 4 · i tipi di dipartimento
{id:"s14", tipo:"illustrata", tema:"chiaro", ill:"livelli", sopratitolo:"Il primo tipo",
  titolo:"Il dipartimento **strutturale**", punti:[
    {icona:"cartella", t:"aggrega in modo **gerarchico**"},
    {icona:"ospedale", t:"UOC e UOS **dipartimentali**"},
    {icona:"euro", t:"per **gestire in comune** le risorse", key:true}],
  etichette:{l1:{t:"Dipartimento", key:true}, l2:"UOC", l3:"UOSD", l4:"UOS"}},
{id:"s15", tipo:"flusso", tema:"chiaro", sopratitolo:"Il direttore di dipartimento", passi:[
  {icona:"persona", t:"Il DG", d:"lo nomina"},
  {icona:"persone", t:"Fra i direttori", d:"delle UOC del dipartimento"},
  {icona:"orologio", t:"3 anni", d:"verificato e rinnovabile", key:true}]},
{id:"s16", tipo:"illustrata", tema:"chiaro", ill:"tavolo", sopratitolo:"Accanto al direttore",
  titolo:"Il **comitato** di dipartimento", punti:[
    {icona:"euro", t:"pareri sul **budget**"},
    {icona:"ingranaggio", t:"nuove **attività**, spazi e strumenti"},
    {icona:"cappello", t:"la **formazione** del personale", key:true}],
  etichette:{alto:{t:"Comitato di dipartimento", key:true}}},
{id:"s17", tipo:"illustrata", tema:"chiaro", ill:"organigramma", sopratitolo:"Il secondo tipo",
  titolo:"Il dipartimento **funzionale**", punti:[
    {icona:"cartella", t:"le UO restano nei **propri** strutturali"},
    {icona:"chat", t:"lui le **collega**", key:true},
    {icona:"ingranaggio", t:"per attività **complesse**"}],
  etichette:{top:{t:"Funzionale", key:true}, basso:"UO di dipartimenti diversi"}},
{id:"s18", tipo:"confronto", tema:"chiaro", sopratitolo:"Una responsabilità diversa", col:[
  {h:"Il funzionale", t:"**coordina** e **integra**", grande:true},
  {h:"Le risorse", t:"restano alle **singole UO**", grande:true}]},
{id:"s19", tipo:"rete", tema:"chiaro", sopratitolo:"Temi che attraversano più reparti",
  centro:"Dipartimenti", dcentro:"funzionali", nodi:[
  {t:"Oncologia clinica", icona:"scudo"}, {t:"Materno-infantile", icona:"cuoremano"},
  {t:"Riabilitazione", icona:"persona"}, {t:"Medicina trasfusionale", icona:"goccia", key:true},
  {t:"Dipendenze", icona:"persone"}],
  rx:560, ry:240},
{id:"s20", tipo:"illustrata", tema:"chiaro", ill:"percorso", sopratitolo:"Dove si collocano",
  titolo:"Dentro e fuori l'**ospedale**", punti:[
    {icona:"ospedale", t:"**interni** a un ospedale"},
    {icona:"persone", t:"fra ospedale e **territorio**, o fra **istituzioni**"},
    {icona:"chat", t:"con le **reti cliniche**: ictus, infarto, trauma", key:true}],
  etichette:{p1:"Casa", p2:"Territorio", p3:{t:"Ospedale", key:true}, p4:"Rete"}},
{id:"s21", tipo:"illustrata", tema:"chiaro", ill:"missioni", sopratitolo:"Nelle aziende ospedaliero-universitarie",
  titolo:"Ad **attività integrata**", punti:[
    {icona:"cuoremano", t:"assistenza, didattica e ricerca **insieme**"},
    {icona:"ospedale", t:"a Padova, **10** dipartimenti ospedalieri", key:true}],
  etichette:{a:"Cura", b:"Didattica", c:"Ricerca", centro:{t:"DAI", key:true}}},
{id:"s22", tipo:"trappola", tema:"tenue", sopratitolo:"Un distrattore frequente", righe:[
  {sb:"Nel funzionale le risorse passano al coordinatore",
   ok:"Restano alle unità operative: il funzionale coordina, lo strutturale gestisce"}]},
{id:"s23", tipo:"titolo", tema:"profondo",
  titolo:"Lo strutturale **gestisce**,<br>il funzionale **coordina**."},

// --- 5 · le unità operative
{id:"s24", tipo:"piramide", tema:"chiaro", sopratitolo:"Dentro i dipartimenti: tre tipi di unità operative", strati:[
  {t:"Dipartimento", d:"aggrega e coordina"},
  {t:"UOC · complesse", d:"direttore e budget"},
  {t:"UOSD · semplici dipartimentali", d:"rispondono al dipartimento"},
  {t:"UOS · semplici", d:"dentro una complessa"}]},
{id:"s25", tipo:"illustrata", tema:"chiaro", ill:"ospedale", sopratitolo:"L'unità operativa complessa",
  titolo:"Concentra **competenze** e **risorse**", punti:[
    {icona:"persone", t:"risorse **umane**"},
    {icona:"ingranaggio", t:"**tecnologiche** e **finanziarie**"},
    {icona:"certificato", t:"attività istituzionali **specifiche**", key:true}],
  etichette:{insegna:{t:"UOC", key:true}}},
{id:"s26", tipo:"illustrata", tema:"chiaro", ill:"azienda", sopratitolo:"Budget e prestazioni",
  titolo:"La guida un **direttore**", punti:[
    {icona:"euro", t:"gestisce il **budget** assegnato"},
    {icona:"cuoremano", t:"eroga le **prestazioni**"},
    {icona:"persona", t:"risponde di **professione** e **gestione**", key:true}],
  etichette:{insegna:{t:"UOC", key:true}, sx:"Budget", dx:"Prestazioni"}},
{id:"s27", tipo:"confronto", tema:"chiaro", sopratitolo:"Le UOC le stabilisce l'atto aziendale, sulla programmazione regionale", col:[
  {h:"Cliniche", t:"come una **cardiologia**", grande:true},
  {h:"Tecniche e amministrative", t:"i **servizi** che fanno funzionare l'azienda", grande:true}]},
{id:"s28", tipo:"sostituzione", tema:"chiaro", sopratitolo:"La semplice a valenza dipartimentale · UOSD",
  da:{h:"Non dipende", t:"da una complessa"},
  a:{h:"Risponde", t:"direttamente al **dipartimento**"}},
{id:"s29", tipo:"icone", tema:"chiaro", sopratitolo:"UOSD: budget e responsabile propri. Nasce quando serve", voci:[
  {icona:"sigillo",   t:"Un peso **strategico**"},
  {icona:"lucchetto", t:"Molta **autonomia**"},
  {icona:"euro",      t:"Risorse **rilevanti**"}]},
{id:"s30", tipo:"illustrata", tema:"chiaro", ill:"organigramma", sopratitolo:"Un esempio tipico di UOSD",
  titolo:"Un servizio **specialistico**", punti:[
    {icona:"persone", t:"lavora per **tutto** il dipartimento", key:true},
    {icona:"divieto", t:"non appartiene a un **singolo reparto**"}],
  etichette:{top:"Dipartimento", m3:{t:"UOSD", key:true}}},
{id:"s31", tipo:"illustrata", tema:"chiaro", ill:"incastro", sopratitolo:"L'unità operativa semplice · UOS",
  titolo:"Dentro una **complessa**", punti:[
    {icona:"occhio", t:"mette in evidenza un **pezzo** di attività"},
    {icona:"lucchetto", t:"che chiede **autonomia** e responsabilità", key:true}],
  etichette:{sx:"UOC", dx:{t:"UOS", key:true}}},
{id:"s32", tipo:"tabella", tema:"chiaro", sopratitolo:"La UOS: un responsabile, obiettivi dentro quelli della complessa", ...TRE_UNITA, chiave:[3]},
{id:"s33", tipo:"norma", tema:"chiaro", etichetta:"DGR Veneto 1306/2017", sigla:"Articolazioni funzionali",
  testo:"Segmenti interni a una struttura, con competenze **molto elevate**: un incarico professionale di **alta specializzazione**."},
{id:"s34", tipo:"illustrata", tema:"chiaro", ill:"organigramma", sopratitolo:"Un esempio: dipartimento di area medica",
  titolo:"Come si **incastrano**", punti:[
    {icona:"ospedale", t:"UOC **medicina interna**"},
    {icona:"occhio", t:"dentro, UOS **ecografia**"},
    {icona:"cartella", t:"accanto, una **UOSD**", key:true}],
  etichette:{top:"Area medica", m1:"Medicina interna", m3:{t:"UOSD", key:true}}},
{id:"s35", tipo:"trappola", tema:"tenue", sopratitolo:"Attenzione", righe:[
  {sb:"UOS e UOSD sono la stessa cosa",
   ok:"La UOS sta dentro una complessa, senza budget autonomo; la UOSD risponde al dipartimento, con un budget proprio"}]},
{id:"s36", tipo:"titolo", tema:"profondo",
  titolo:"Complessa, dipartimentale, semplice:<br>tre livelli di **autonomia**<br>e di **responsabilità**."},

// --- 6 · chi guida, e che cosa cambia per te
{id:"s37", tipo:"illustrata", tema:"chiaro", ill:"scudo", sopratitolo:"Un criterio dell'atto aziendale",
  titolo:"Un **unico** responsabile", punti:[
    {icona:"persona", t:"per ogni **articolazione**", key:true},
    {icona:"spunta", t:"compiti, obiettivi e strumenti **coerenti**"}],
  etichette:{alto:{t:"Responsabile unico", key:true}}},
{id:"s38", tipo:"flusso", tema:"chiaro", sopratitolo:"Per chi lavora nel comparto la struttura conta", passi:[
  {icona:"euro", t:"Budget della UOC", d:"risorse e obiettivi"},
  {icona:"spunta", t:"Obiettivi", d:"che arrivano al personale"},
  {icona:"persona", t:"La tua valutazione", key:true}]},
{id:"s39", tipo:"illustrata", tema:"chiaro", ill:"tavolo", sopratitolo:"Anche il comitato di dipartimento ti riguarda",
  titolo:"Pareri che **toccano** i reparti", punti:[
    {icona:"cappello", t:"**formazione**"},
    {icona:"ospedale", t:"**spazi**"},
    {icona:"ingranaggio", t:"**organizzazione** del lavoro", key:true}],
  etichette:{basso:{t:"Il lavoro quotidiano", key:true}}},
{id:"s40", tipo:"confronto", tema:"chiaro", sopratitolo:"Gli incarichi di funzione del comparto, dentro questa architettura", col:[
  {h:"Organizzativi", t:"il **coordinamento** di un'unità operativa", grande:true},
  {h:"Professionali", t:"una **funzione trasversale** di dipartimento", grande:true}]},
{id:"s41", tipo:"illustrata", tema:"chiaro", ill:"organigramma", sopratitolo:"Non un esercizio burocratico",
  titolo:"Leggi l'**organigramma**", punti:[
    {icona:"persona", t:"chi **decide** sul tuo lavoro"},
    {icona:"euro", t:"con quali **risorse**"},
    {icona:"cappello", t:"dove puoi **crescere**", key:true}],
  etichette:{top:"Direzione", basso:{t:"Tu", key:true}}},

// --- 7 · le tre cose
{id:"s42", tipo:"memo", tema:"chiaro", attive:[0], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s43", tipo:"memo", tema:"chiaro", attive:[0,1], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s44", tipo:"memo", tema:"chiaro", attive:[0,1,2], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s45", tipo:"trappola", tema:"tenue", sopratitolo:"L'ultimo distrattore", righe:[
  {sb:"Il direttore di dipartimento è un organo scelto dalla Regione",
   ok:"Lo nomina il direttore generale, fra i direttori di unità operativa complessa"}]},

// --- 8 · chiusura
{id:"s46", tipo:"titolo", tema:"profondo",
  titolo:"Dipartimenti che **integrano**,<br>unità operative che **producono**,<br>un **responsabile** per ogni struttura.",
  sotto:"Ultima lezione del modulo: governo clinico e continuità assistenziale."},

{id:"s47", tipo:"copertina", tema:"profondo", modulo:"Prossima lezione",
  titolo:"Lezione 4.5", sottotitolo:"Governo clinico<br>e continuità assistenziale", ente:ENTE},
];
