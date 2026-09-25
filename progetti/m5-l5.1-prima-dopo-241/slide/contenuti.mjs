// Contenuto delle 48 scene della lezione 5.1. *accento*  **accento in semibold**
//
// Corso «Progressione verticale · Comparto Sanità», Modulo 5. Prima e dopo la L. 241/1990:
// l'amministrazione autoreferenziale e il segreto d'ufficio; le cinque novità del 1990; art. 28;
// art. 29 (livelli essenziali); le riforme 2005-2020.

const ENTE = "CISL FP Padova Rovigo · Progressione verticale · Comparto Sanità";

const TRE_COSE = [
  "**L. 241** del **7 agosto 1990**: procedimento amministrativo e **diritto di accesso** ai documenti",
  "Le novità: provvedimento **espresso** entro un **termine**, un **responsabile**, **partecipazione**, **motivazione**, **accesso**",
  "**Art. 29**: partecipazione, responsabile, termine e accesso sono **livelli essenziali**. Più garanzie sì, **meno no**",
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 5 · Procedimento amministrativo e accesso",
  titolo:"Prima e dopo<br>la legge 241", sottotitolo:"Lezione 5.1", ente:ENTE},

// --- 1 · aggancio
{id:"s02", tipo:"illustrata", tema:"chiaro", ill:"sportello", sopratitolo:"Una domanda, prima del 1990",
  titolo:"Allo **sportello**, al buio", punti:[
    {icona:"persona", t:"non sai **chi** la segue"},
    {icona:"orologio", t:"non sai **quanto** ci vorrà"},
    {icona:"divieto", t:"non vedi le **carte**, non sai il **perché**", key:true}],
  etichette:{insegna:{t:"Ufficio", key:true}, sx:"Cittadino", dx:"Cittadina"}},
{id:"s03", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"La stessa domanda, oggi", celle:[
  {t:"Un **responsabile** con nome e cognome"}, {t:"Un **termine** per la risposta"},
  {t:"Il diritto di **partecipare**"}, {t:"Il diritto di **vedere i documenti**"}]},
{id:"s04", tipo:"titolo", tema:"profondo",
  titolo:"Da **suddito** che aspetta,<br>a **cittadino** che ha dei diritti."},

// --- 2 · rotta
{id:"s05", tipo:"flusso", tema:"chiaro", sopratitolo:"Quattro passaggi", passi:[
  {icona:"lucchetto", t:"Prima", d:"l'amministrazione chiusa"},
  {icona:"documento", t:"Il 1990", d:"che cosa cambia"},
  {icona:"ospedale", t:"Dove si applica", d:"anche in sanità"},
  {icona:"libro", t:"Le riforme", d:"una legge viva", key:true}]},

// --- 3 · l'amministrazione di prima
{id:"s06", tipo:"confronto", tema:"chiaro", sopratitolo:"Prima della 241", col:[
  {h:"Nessuna legge generale", t:"sul modo di procedere della **pubblica amministrazione**"},
  {h:"Regole di ogni ufficio", t:"spesso **non scritte** e poco conoscibili"}]},
{id:"s07", tipo:"illustrata", tema:"chiaro", ill:"municipio", sopratitolo:"Un'amministrazione autoreferenziale",
  titolo:"Guardava **a se stessa**", punti:[
    {icona:"ingranaggio", t:"le **proprie** procedure"},
    {icona:"orologio", t:"i **propri** tempi"},
    {icona:"persona", t:"più che il **cittadino**", key:true}],
  etichette:{insegna:{t:"Ufficio", key:true}}},
{id:"s08", tipo:"illustrata", tema:"chiaro", ill:"archivio", sopratitolo:"La regola: il segreto d'ufficio",
  titolo:"Carte **chiuse**", punti:[
    {icona:"lucchetto", t:"documenti chiusi negli **archivi**"},
    {icona:"divieto", t:"l'impiegato non poteva **rivelarli**"},
    {icona:"occhio", t:"conoscere era l'**eccezione**", key:true}],
  etichette:{alto:"Archivio", cassetto:{t:"Segreto", key:true}}},
{id:"s09", tipo:"confronto", tema:"chiaro", sopratitolo:"Il cittadino, in questo schema", col:[
  {h:"Destinatario", t:"**riceveva** le decisioni", grande:true},
  {h:"Non interlocutore", t:"non partecipava, spesso non sapeva **perché**", grande:true}]},
{id:"s10", tipo:"illustrata", tema:"chiaro", ill:"clessidra", sopratitolo:"Nessun obbligo generale di rispondere",
  titolo:"Tempi **senza fine**", punti:[
    {icona:"orologio", t:"una domanda **ferma** a lungo"},
    {icona:"divieto", t:"nessuna **scadenza** a cui appellarsi", key:true}],
  etichette:{alto:{t:"Nessun termine", key:true}}},
{id:"s11", tipo:"icone", tema:"chiaro", sopratitolo:"E chi lavorava negli uffici", voci:[
  {icona:"orologio", t:"Nessun **tempo** fissato"},
  {icona:"persona",  t:"Nessun **responsabile**"},
  {icona:"occhio",   t:"Il lavoro fatto bene restava **invisibile**"}]},
{id:"s12", tipo:"trappola", tema:"tenue", sopratitolo:"Attenzione a non esagerare", righe:[
  {sb:"Prima del 1990 non esistevano regole per la pubblica amministrazione",
   ok:"L'art. 97 della Costituzione chiedeva buon andamento e imparzialità: mancava una legge sul come"}]},
{id:"s13", tipo:"titolo", tema:"profondo",
  titolo:"Un'amministrazione **chiusa**,<br>che parlava a se stessa."},

// --- 4 · la svolta del 1990
{id:"s14", tipo:"norma", tema:"chiaro", etichetta:"7 agosto 1990", sigla:"Legge 241",
  testo:"Nuove norme in materia di **procedimento amministrativo** e di **diritto di accesso** ai documenti amministrativi."},
{id:"s15", tipo:"illustrata", tema:"chiaro", ill:"clessidra", sopratitolo:"La prima novità",
  titolo:"Un provvedimento **espresso**", punti:[
    {icona:"documento", t:"la pratica si **chiude** con un atto"},
    {icona:"orologio", t:"entro un **termine**", key:true},
    {icona:"persona", t:"il ritardo ha un **responsabile**"}],
  etichette:{alto:{t:"Termine", key:true}}},
{id:"s16", tipo:"illustrata", tema:"chiaro", ill:"sportello", sopratitolo:"La seconda novità",
  titolo:"Un **responsabile**", punti:[
    {icona:"persona", t:"il cittadino sa a **chi** rivolgersi", key:true},
    {icona:"cartella", t:"l'ufficio sa chi porta avanti la **pratica**"}],
  etichette:{insegna:{t:"Responsabile", key:true}, foglio:"Pratica"}},
{id:"s17", tipo:"illustrata", tema:"chiaro", ill:"busta", sopratitolo:"La terza novità",
  titolo:"La **partecipazione**", punti:[
    {icona:"chat", t:"la **comunicazione** di avvio"},
    {icona:"documento", t:"**memorie** e documenti"},
    {icona:"spunta", t:"l'obbligo di **valutarli**", key:true}],
  etichette:{sx:"Ufficio", dx:{t:"Cittadino", key:true}, alto:"Avvio"}},
{id:"s18", tipo:"flusso", tema:"chiaro", sopratitolo:"Un esempio: una richiesta che rischia un no", passi:[
  {icona:"documento", t:"L'istanza"},
  {icona:"chat", t:"Le ragioni del cittadino", d:"documenti e argomenti"},
  {icona:"spunta", t:"La decisione", d:"che ne tiene conto", key:true}]},
{id:"s19", tipo:"confronto", tema:"chiaro", sopratitolo:"La quarta novità: la motivazione", col:[
  {h:"I fatti", t:"i **presupposti** della decisione", grande:true},
  {h:"Il diritto", t:"le **ragioni giuridiche**", grande:true}]},
{id:"s20", tipo:"illustrata", tema:"chiaro", ill:"archivio", sopratitolo:"La quinta novità",
  titolo:"Il diritto di **accesso**", punti:[
    {icona:"libro", t:"**principio generale** dell'attività amministrativa", key:true},
    {icona:"persone", t:"per la **partecipazione**"},
    {icona:"bilancia", t:"per **imparzialità** e **trasparenza**"}],
  etichette:{cassetto:{t:"Accesso", key:true}}},
{id:"s21", tipo:"illustrata", tema:"chiaro", ill:"cassaforte", sopratitolo:"Il segreto d'ufficio, riscritto",
  titolo:"Da regola a **limite**", punti:[
    {icona:"divieto", t:"niente informazioni a chi **non ne ha diritto**"},
    {icona:"occhio", t:"salvo i casi delle norme sull'**accesso**", key:true}],
  etichette:{alto:"Segreto", dx:{t:"Accesso", key:true}}},
{id:"s22", tipo:"trappola", tema:"tenue", sopratitolo:"Occhio a un distrattore", righe:[
  {sb:"La 241 ha abolito il segreto d'ufficio",
   ok:"L'ha ridimensionato: resta la riservatezza, nei confini delle norme sull'accesso"}]},
{id:"s23", tipo:"titolo", tema:"profondo",
  titolo:"Tempi **certi**, un **responsabile**,<br>il diritto di partecipare<br>e di **sapere**."},

// --- 5 · dove si applica
{id:"s24", tipo:"icone", tema:"chiaro", sopratitolo:"Dove si applica, direttamente", voci:[
  {icona:"bilancia",  t:"Amministrazioni **statali**"},
  {icona:"cartella",  t:"Enti pubblici **nazionali**"},
  {icona:"euro",      t:"Società a capitale pubblico, per le **funzioni amministrative**"}]},
{id:"s25", tipo:"confronto", tema:"chiaro", sopratitolo:"Regioni ed enti locali", col:[
  {h:"Regolano", t:"la materia con **proprie** norme"},
  {h:"Nel rispetto", t:"delle **garanzie** della legge"}]},
{id:"s26", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Art. 29 · livelli essenziali delle prestazioni", celle:[
  {t:"Garantire la **partecipazione**"}, {t:"Individuare un **responsabile**"},
  {t:"Concludere entro il **termine**"}, {t:"Assicurare l'**accesso**"}]},
{id:"s27", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"E ancora, livelli essenziali", celle:[
  {t:"La **durata massima** dei procedimenti"}, {t:"La **SCIA**"},
  {t:"Il **silenzio assenso**"}, {t:"La **conferenza di servizi**"}]},
{id:"s28", tipo:"piramide", tema:"chiaro", sopratitolo:"Regioni ed enti: più garanzie sì, meno no", strati:[
  {t:"Tutele ulteriori", d:"possibili"},
  {t:"Livelli essenziali", d:"uguali in tutta Italia"},
  {t:"Legge 241", d:"il fondamento comune"}]},
{id:"s29", tipo:"illustrata", tema:"chiaro", ill:"ospedale", sopratitolo:"Le aziende sanitarie",
  titolo:"Dentro il **sistema**", punti:[
    {icona:"persone", t:"l'istanza di un **utente**"},
    {icona:"persona", t:"un procedimento sul **personale**"},
    {icona:"spunta", t:"stesse **regole**", key:true}],
  etichette:{insegna:{t:"Azienda sanitaria", key:true}}},
{id:"s30", tipo:"flusso", tema:"chiaro", sopratitolo:"Un esempio: un dipendente chiede un'aspettativa", passi:[
  {icona:"cartella", t:"Un ufficio", d:"responsabile"},
  {icona:"orologio", t:"Un termine", d:"per rispondere"},
  {icona:"documento", t:"Se è no", d:"una motivazione", key:true}]},
{id:"s31", tipo:"illustrata", tema:"chiaro", ill:"documento", sopratitolo:"In pratica",
  titolo:"L'elenco dei **procedimenti**", punti:[
    {icona:"cartella", t:"l'**ufficio** responsabile"},
    {icona:"orologio", t:"il **termine** di conclusione"},
    {icona:"occhio", t:"informazioni **pubbliche**", key:true}],
  etichette:{titolo:{t:"Procedimenti", key:true}, sigillo:"Termini"}},
{id:"s32", tipo:"trappola", tema:"tenue", sopratitolo:"Attenzione", righe:[
  {sb:"La 241 tutela solo i cittadini esterni",
   ok:"Anche il dipendente che presenta un'istanza alla propria azienda ha le stesse garanzie"}]},
{id:"s33", tipo:"titolo", tema:"profondo",
  titolo:"Garanzie **minime** uguali<br>in tutta Italia,<br>anche nelle **aziende sanitarie**."},

// --- 6 · una legge viva
{id:"s34", tipo:"assetempo", tema:"chiaro", sopratitolo:"Una legge modificata molte volte",
  da:1988, a:2022, decenni:[1990,2000,2010,2020], tappe:[
  {anno:1990, et:"La 241", key:true}, {anno:2005, et:"L. 15"}, {anno:2009, et:"L. 69"},
  {anno:2012, et:"L. 190"}, {anno:2015, et:"Madia"}, {anno:2020, et:"Semplificazioni"}]},
{id:"s35", tipo:"icone", tema:"chiaro", sopratitolo:"2005 · la legge 15", voci:[
  {icona:"occhio",    t:"La **trasparenza** nell'art. 1"},
  {icona:"avviso",    t:"Il **preavviso di rigetto**"},
  {icona:"bilancia",  t:"Efficacia e **invalidità** del provvedimento"}]},
{id:"s36", tipo:"confronto", tema:"chiaro", sopratitolo:"2009 · la legge 69", col:[
  {h:"I termini", t:"del procedimento, **riscritti**", grande:true},
  {h:"Il danno", t:"da **ritardo**, risarcibile", grande:true}]},
{id:"s37", tipo:"confronto", tema:"chiaro", sopratitolo:"2012", col:[
  {h:"Legge 190", t:"l'**astensione** per conflitto di interessi", grande:true},
  {h:"Poteri sostitutivi", t:"contro l'**inerzia**", grande:true}]},
{id:"s38", tipo:"illustrata", tema:"chiaro", ill:"tavolo", sopratitolo:"2015 · la riforma Madia e i suoi decreti",
  titolo:"Meno **passaggi**", punti:[
    {icona:"persone", t:"la **conferenza di servizi**, riscritta", key:true},
    {icona:"documento", t:"la **SCIA**, rivista"}],
  etichette:{alto:{t:"Conferenza di servizi", key:true}}},
{id:"s39", tipo:"norma", tema:"chiaro", etichetta:"2020 · decreto semplificazioni · art. 1, c. 2-bis", sigla:"Buona fede",
  testo:"I rapporti tra cittadino e amministrazione sono improntati alla **collaborazione** e alla **buona fede**."},
{id:"s40", tipo:"illustrata", tema:"chiaro", ill:"lente", sopratitolo:"Quando studi",
  titolo:"Il testo **aggiornato**", punti:[
    {icona:"avviso", t:"molte dispense e quiz usano versioni **vecchie**", key:true},
    {icona:"spunta", t:"controlla sempre l'**ultima** versione"}],
  etichette:{titolo:{t:"Testo vigente", key:true}}},
{id:"s41", tipo:"trappola", tema:"tenue", sopratitolo:"Un errore diffuso", righe:[
  {sb:"La trasparenza è scritta nell'art. 97 della Costituzione",
   ok:"L'art. 97 parla di buon andamento e imparzialità; la trasparenza è nell'art. 1 della 241"}]},
{id:"s42", tipo:"titolo", tema:"profondo",
  titolo:"Una legge che **cresce**<br>con l'amministrazione,<br>riforma dopo riforma."},

// --- 7 · le tre cose
{id:"s43", tipo:"memo", tema:"chiaro", attive:[0], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s44", tipo:"memo", tema:"chiaro", attive:[0,1], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s45", tipo:"memo", tema:"chiaro", attive:[0,1,2], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s46", tipo:"trappola", tema:"tenue", sopratitolo:"L'ultimo distrattore", righe:[
  {sb:"La 241 ha eliminato il segreto d'ufficio",
   ok:"L'ha trasformato da regola generale a limite, dentro le norme sull'accesso"}]},

// --- 8 · chiusura
{id:"s47", tipo:"titolo", tema:"profondo",
  titolo:"Dall'ufficio **chiuso**<br>all'amministrazione che **risponde**,<br>spiega e si lascia vedere.",
  sotto:"Prossima lezione: i principi cardine della legge."},

{id:"s48", tipo:"copertina", tema:"profondo", modulo:"Prossima lezione",
  titolo:"Lezione 5.2", sottotitolo:"I principi cardine", ente:ENTE},
];
