// Contenuto delle 50 scene della lezione 5.4. *accento*  **accento in semibold**
//
// Corso «Progressione verticale · Comparto Sanità», Modulo 5. Avvio, partecipazione, motivazione:
// artt. 7, 8, 9, 10, 10-bis (testo dopo il D.L. 76/2020), 13, 18-bis, 3; 21-octies c. 2.

const ENTE = "CISL FP Padova Rovigo · Progressione verticale · Comparto Sanità";

const TRE_COSE = [
  "L'**avvio** si comunica a **destinatari**, a chi deve **intervenire** per legge, ai **terzi** individuabili che possono subire pregiudizio",
  "Partecipanti: **vedere gli atti**, **memorie** da valutare. Prima di un no, **preavviso**: **10 giorni** per le osservazioni",
  "**Motivazione**: presupposti di **fatto** e ragioni **giuridiche**; non per atti **normativi** e **generali**; a chi e entro quando **ricorrere**",
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 5 · Procedimento amministrativo e accesso",
  titolo:"Avvio, partecipazione<br>e motivazione", sottotitolo:"Lezione 5.4", ente:ENTE},

// --- 1 · aggancio
{id:"s02", tipo:"illustrata", tema:"chiaro", ill:"busta", sopratitolo:"Una mattina arriva una lettera",
  titolo:"Si apre un **procedimento**", punti:[
    {icona:"persona", t:"chi lo **segue**"},
    {icona:"orologio", t:"entro quando **finirà**"},
    {icona:"occhio", t:"dove vedere le **carte**", key:true}],
  etichette:{sx:"Azienda", dx:{t:"Tu", key:true}, alto:"Avvio"}},
{id:"s03", tipo:"flusso", tema:"chiaro", sopratitolo:"Da quella lettera parte la partecipazione", passi:[
  {icona:"chat", t:"Dire la tua"},
  {icona:"documento", t:"Portare documenti"},
  {icona:"spunta", t:"Una decisione", d:"che spiega le ragioni", key:true}]},
{id:"s04", tipo:"titolo", tema:"profondo",
  titolo:"**Sapere**, **partecipare**, **capire**:<br>tre diritti in fila."},

// --- 2 · rotta
{id:"s05", tipo:"flusso", tema:"chiaro", sopratitolo:"Quattro passaggi", passi:[
  {icona:"chat", t:"La comunicazione", d:"di avvio"},
  {icona:"persone", t:"La partecipazione"},
  {icona:"avviso", t:"Il preavviso", d:"di rigetto"},
  {icona:"documento", t:"La motivazione", key:true}]},

// --- 3 · la comunicazione di avvio
{id:"s06", tipo:"norma", tema:"chiaro", etichetta:"Art. 7", sigla:"Comunicare l'avvio",
  testo:"Salvo **particolari esigenze di celerità**, l'avvio si comunica a tre categorie di soggetti."},
{id:"s07", tipo:"tre", tema:"chiaro", attive:[0,1], sopratitolo:"A chi si comunica", box:[
  {n:"1", t:"Destinatari", d:"degli effetti diretti"},
  {n:"2", t:"Chi deve intervenire", d:"per legge"},
  {n:"3", t:"Terzi", d:"che possono subire pregiudizio"}]},
{id:"s08", tipo:"tre", tema:"chiaro", attive:[0,1,2], sopratitolo:"A chi si comunica", box:[
  {n:"1", t:"Destinatari", d:"degli effetti diretti"},
  {n:"2", t:"Chi deve intervenire", d:"per legge"},
  {n:"3", t:"Terzi", d:"individuati o facilmente individuabili, che possono subire pregiudizio"}]},
{id:"s09", tipo:"illustrata", tema:"chiaro", ill:"scudo", sopratitolo:"Resta ferma una possibilità",
  titolo:"Provvedimenti **cautelari**", punti:[
    {icona:"orologio", t:"anche **prima** della comunicazione"},
    {icona:"avviso", t:"quando la situazione lo **richiede**", key:true}],
  etichette:{alto:{t:"Cautela", key:true}}},
{id:"s10", tipo:"sostituzione", tema:"chiaro", sopratitolo:"In pratica: un procedimento d'ufficio su un dipendente",
  da:{h:"Non", t:"a cose fatte"},
  a:{h:"Ma", t:"informato **subito**"}},
{id:"s11", tipo:"illustrata", tema:"chiaro", ill:"documento", sopratitolo:"Art. 8 · la comunicazione è personale",
  titolo:"Che cosa **contiene**", punti:[
    {icona:"ospedale", t:"l'**amministrazione** competente"},
    {icona:"cartella", t:"l'**oggetto** del procedimento"},
    {icona:"persona", t:"l'**ufficio** e la **persona** responsabile", key:true}],
  etichette:{titolo:{t:"Comunicazione di avvio", key:true}, sigillo:"Art. 8"}},
{id:"s12", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"E ancora", celle:[
  {t:"La **data** di conclusione"}, {t:"I **rimedi** contro l'inerzia"}, {t:"Dove **vedere gli atti**"}]},
{id:"s13", tipo:"confronto", tema:"chiaro", sopratitolo:"Due casi particolari", col:[
  {h:"A istanza di parte", t:"anche la **data** di presentazione"},
  {h:"Troppi destinatari", t:"forme di **pubblicità** adatte"}]},
{id:"s14", tipo:"illustrata", tema:"chiaro", ill:"sportello", sopratitolo:"Art. 18-bis",
  titolo:"La **ricevuta** vale", punti:[
    {icona:"documento", t:"la ricevuta della domanda, con gli elementi dell'art. 8"},
    {icona:"spunta", t:"vale come **comunicazione di avvio**", key:true}],
  etichette:{insegna:"Protocollo", foglio:{t:"Ricevuta", key:true}}},
{id:"s15", tipo:"trappola", tema:"tenue", sopratitolo:"Occhio a un distrattore", righe:[
  {sb:"Chiunque può far valere l'omessa comunicazione di avvio",
   ok:"Solo il soggetto nel cui interesse la comunicazione è prevista"}]},
{id:"s16", tipo:"titolo", tema:"profondo",
  titolo:"**Chi**, che **cosa**, entro **quando**,<br>dove vedere le carte."},

// --- 4 · partecipare
{id:"s17", tipo:"norma", tema:"chiaro", etichetta:"Art. 9 · chi può intervenire", sigla:"Intervento",
  testo:"Portatori di interessi **pubblici** o **privati**, e di interessi **diffusi** costituiti in associazioni o comitati."},
{id:"s18", tipo:"illustrata", tema:"chiaro", ill:"comunita", sopratitolo:"La condizione: un possibile pregiudizio",
  titolo:"Non solo il **destinatario**", punti:[
    {icona:"persone", t:"per esempio un'**associazione di pazienti**", key:true},
    {icona:"cuoremano", t:"se il procedimento tocca i loro **interessi**"}],
  etichette:{alto:{t:"Interessi diffusi", key:true}}},
{id:"s19", tipo:"illustrata", tema:"chiaro", ill:"archivio", sopratitolo:"Art. 10 · i diritti dei partecipanti",
  titolo:"Vedere gli **atti**", punti:[
    {icona:"occhio", t:"prendere **visione** degli atti"},
    {icona:"lucchetto", t:"salvo i limiti dell'**accesso**", key:true}],
  etichette:{cassetto:{t:"Atti del procedimento", key:true}}},
{id:"s20", tipo:"confronto", tema:"chiaro", sopratitolo:"Art. 10 · il secondo diritto", col:[
  {h:"Il partecipante", t:"presenta **memorie** scritte e documenti", grande:true},
  {h:"L'amministrazione", t:"ha l'obbligo di **valutarli**, se pertinenti", grande:true}]},
{id:"s21", tipo:"flusso", tema:"chiaro", sopratitolo:"Un esempio: il riconoscimento di un periodo di servizio", passi:[
  {icona:"chat", t:"Comunicazione", d:"di avvio"},
  {icona:"documento", t:"Memoria", d:"con i documenti"},
  {icona:"bilancia", t:"Valutazione", d:"nella decisione", key:true}]},
{id:"s22", tipo:"icone", tema:"chiaro", sopratitolo:"Art. 13 · la partecipazione non vale per gli atti", voci:[
  {icona:"libro",     t:"**Normativi**"},
  {icona:"persone",   t:"Amministrativi **generali**"},
  {icona:"cartella",  t:"Di **pianificazione**"},
  {icona:"orologio",  t:"Di **programmazione**"}]},
{id:"s23", tipo:"confronto", tema:"chiaro", sopratitolo:"Esclusi anche", col:[
  {h:"I procedimenti tributari", t:"con le loro **regole**"},
  {h:"Alcuni procedimenti speciali", t:"previsti da leggi di **settore**"}]},
{id:"s24", tipo:"trappola", tema:"tenue", sopratitolo:"Attenzione", righe:[
  {sb:"Le norme sulla partecipazione valgono anche per gli atti di programmazione",
   ok:"Non si applicano: per quegli atti valgono le regole specifiche"}]},
{id:"s25", tipo:"titolo", tema:"profondo",
  titolo:"Vedere gli **atti**,<br>portare **memorie**,<br>essere **ascoltati**."},

// --- 5 · il preavviso di rigetto
{id:"s26", tipo:"illustrata", tema:"chiaro", ill:"busta", sopratitolo:"Art. 10-bis · nei procedimenti a istanza di parte",
  titolo:"Prima del **no**", punti:[
    {icona:"avviso", t:"l'ufficio comunica i **motivi ostativi**", key:true},
    {icona:"documento", t:"prima del provvedimento **negativo**"}],
  etichette:{sx:"Ufficio", dx:{t:"Istante", key:true}, alto:"Preavviso"}},
{id:"s27", tipo:"contatore", tema:"chiaro", sopratitolo:"Il preavviso di rigetto",
  valori:[{n:10, t:"giorni per le osservazioni scritte", key:true}],
  sotto:"Dal ricevimento, **eventualmente con documenti**."},
{id:"s28", tipo:"sostituzione", tema:"chiaro", sopratitolo:"Dopo il 2020",
  da:{h:"Non più", t:"interrompe i termini"},
  a:{h:"Oggi", t:"li **sospende**"},
  sotto:"Ripartono **10 giorni** dopo le osservazioni, o dalla scadenza se non arrivano."},
{id:"s29", tipo:"illustrata", tema:"chiaro", ill:"bilancio", sopratitolo:"Se l'amministrazione respinge comunque",
  titolo:"Deve **spiegare**", punti:[
    {icona:"chat", t:"perché non accoglie le **osservazioni**"},
    {icona:"divieto", t:"nuovi motivi solo se **nascono** da quelle", key:true}],
  etichette:{sx:"Osservazioni", dx:"Diniego", alto:{t:"Motivazione", key:true}}},
{id:"s30", tipo:"illustrata", tema:"chiaro", ill:"clessidra", sopratitolo:"Un limite preciso",
  titolo:"Le lentezze dell'**ufficio**", punti:[
    {icona:"divieto", t:"ritardi e inadempienze della PA non sono **motivi ostativi**", key:true},
    {icona:"persona", t:"il cittadino non **paga** le lentezze"}],
  etichette:{alto:{t:"Ritardo della PA", key:true}}},
{id:"s31", tipo:"confronto", tema:"chiaro", sopratitolo:"Il preavviso non si applica", col:[
  {h:"Procedure concorsuali", t:"i **concorsi**"},
  {h:"Enti previdenziali", t:"procedimenti **previdenziali** e **assistenziali** a istanza di parte"}]},
{id:"s32", tipo:"norma", tema:"chiaro", etichetta:"Art. 21-octies, c. 2 · dopo il 2020", sigla:"Annullabile",
  testo:"Il diniego adottato **senza preavviso** non si salva come vizio solo **formale**."},
{id:"s33", tipo:"trappola", tema:"tenue", sopratitolo:"Un distrattore frequente", righe:[
  {sb:"Il preavviso interrompe i termini, che ripartono da zero",
   ok:"Nel testo di oggi li sospende"}]},
{id:"s34", tipo:"titolo", tema:"profondo",
  titolo:"Prima del **no**,<br>il diritto di **rispondere**<br>entro dieci giorni."},

// --- 6 · la motivazione
{id:"s35", tipo:"norma", tema:"chiaro", etichetta:"Art. 3", sigla:"Motivazione",
  testo:"Ogni provvedimento, compresi quelli su **organizzazione**, **concorsi** e **personale**."},
{id:"s36", tipo:"confronto", tema:"chiaro", sopratitolo:"Che cosa indica, in relazione all'istruttoria", col:[
  {h:"Presupposti di fatto", t:"che cosa è **accaduto**", grande:true},
  {h:"Ragioni giuridiche", t:"quale **norma** si applica", grande:true}]},
{id:"s37", tipo:"sostituzione", tema:"chiaro", sopratitolo:"Quando non è richiesta",
  da:{h:"Non per", t:"una persona precisa"},
  a:{h:"Atti normativi e generali", t:"per una **generalità** di destinatari"}},
{id:"s38", tipo:"confronto", tema:"chiaro", sopratitolo:"A che cosa serve", col:[
  {h:"All'interessato", t:"per **capire** e **difendersi**", grande:true},
  {h:"Al giudice", t:"per **controllare** logica e legittimità", grande:true}]},
{id:"s39", tipo:"illustrata", tema:"chiaro", ill:"documento", sopratitolo:"La motivazione per relazione",
  titolo:"Rinviare a un altro **atto**", punti:[
    {icona:"documento", t:"per esempio un **parere**"},
    {icona:"occhio", t:"va **indicato** e reso **disponibile**", key:true}],
  etichette:{titolo:"Provvedimento", sigillo:{t:"Parere", key:true}}},
{id:"s40", tipo:"illustrata", tema:"chiaro", ill:"calendario", sopratitolo:"In ogni atto notificato",
  titolo:"Come **ricorrere**", punti:[
    {icona:"orologio", t:"il **termine**"},
    {icona:"giudice", t:"l'**autorità** a cui ricorrere", key:true}],
  etichette:{data:{t:"Termine", key:true}, nota:"Ricorso"}},
{id:"s41", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Un esempio: il diniego di un'aspettativa", celle:[
  {t:"I **fatti** accertati"}, {t:"La **norma** applicata"},
  {t:"Il **perché** del no"}, {t:"A chi **ricorrere**"}]},
{id:"s42", tipo:"icone", tema:"chiaro", sopratitolo:"Forma semplificata, motivazione sintetica: domande manifestamente", voci:[
  {icona:"divieto",  t:"**Irricevibili**"},
  {icona:"avviso",   t:"**Inammissibili**"},
  {icona:"orologio", t:"**Improcedibili**"},
  {icona:"bilancia", t:"**Infondate**"}]},
{id:"s43", tipo:"trappola", tema:"tenue", sopratitolo:"Attenzione", righe:[
  {sb:"I provvedimenti sul personale non vanno motivati",
   ok:"La legge li nomina espressamente tra quelli da motivare"}]},
{id:"s44", tipo:"titolo", tema:"profondo",
  titolo:"**Fatti**, **norme**<br>e il filo logico che li lega."},

// --- 7 · le tre cose
{id:"s45", tipo:"memo", tema:"chiaro", attive:[0], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s46", tipo:"memo", tema:"chiaro", attive:[0,1], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s47", tipo:"memo", tema:"chiaro", attive:[0,1,2], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s48", tipo:"trappola", tema:"tenue", sopratitolo:"L'ultimo distrattore", righe:[
  {sb:"Partecipazione e motivazione valgono anche per gli atti normativi e generali",
   ok:"Partecipazione: esclusi normativi, generali, pianificazione e programmazione. Motivazione: esclusi normativi e generali"}]},

// --- 8 · chiusura
{id:"s49", tipo:"titolo", tema:"profondo",
  titolo:"Si **comunica**,<br>si **ascolta**,<br>si **spiega**.",
  sotto:"Prossima lezione: termini, silenzio e semplificazione."},

{id:"s50", tipo:"copertina", tema:"profondo", modulo:"Prossima lezione",
  titolo:"Lezione 5.5", sottotitolo:"Termini, silenzio<br>e semplificazione", ente:ENTE},
];
