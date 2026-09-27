// Contenuto delle 49 scene della lezione 7.1. *accento*  **accento in semibold**
//
// Corso «Progressione verticale · Comparto Sanità», Modulo 7. Dalla 675/1996 al GDPR:
// L. 675/1996; D.Lgs. 196/2003; Reg. UE 2016/679 artt. 1-5, 24, 25, 94, 99; D.Lgs. 101/2018; Carta UE art. 8.

const ENTE = "CISL FP Padova Rovigo · Progressione verticale · Comparto Sanità";

const TRE_COSE = [
  "Tre stagioni: **L. 675/1996**, **Codice 196/2003** (in vigore dal 2004), **Reg. UE 2016/679**, applicabile dal **25 maggio 2018**",
  "Il regolamento è **direttamente applicabile**; il **D.Lgs. 101/2018** adegua il Codice, che resta; vale anche per chi è **fuori dall'Unione**",
  "**Responsabilizzazione**: il titolare rispetta i principi e **sa dimostrarlo**, con misure adeguate ai rischi, *by design* e *by default*",
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 7 · Trattamento dei dati personali",
  titolo:"Dalla 675/1996<br>al GDPR", sottotitolo:"Lezione 7.1", ente:ENTE},

// --- 1 · aggancio
{id:"s02", tipo:"illustrata", tema:"chiaro", ill:"cartellaclinica", sopratitolo:"Una giornata di reparto",
  titolo:"Decine di **dati**", punti:[
    {icona:"persona", t:"nomi, **diagnosi**, terapie"},
    {icona:"persone", t:"telefoni, **turni** dei colleghi"},
    {icona:"bilancia", t:"chi decide **come** si trattano?", key:true}],
  etichette:{alto:{t:"Dati personali", key:true}}},
{id:"s03", tipo:"assetempo", tema:"chiaro", sopratitolo:"Trent'anni, tre stagioni",
  da:1994, a:2020, decenni:[2000,2010,2020], tappe:[
  {anno:1996, et:"L. 675 — la prima legge"},
  {anno:2003, et:"D.Lgs. 196 — il Codice"},
  {anno:2016, et:"Reg. UE 2016/679 — il GDPR", key:true}]},
{id:"s04", tipo:"titolo", tema:"profondo",
  titolo:"Proteggere i **dati**<br>significa proteggere le **persone**."},

// --- 2 · rotta
{id:"s05", tipo:"flusso", tema:"chiaro", sopratitolo:"Quattro passaggi", passi:[
  {icona:"libro", t:"1996", d:"la legge 675"},
  {icona:"documento", t:"2003", d:"il Codice"},
  {icona:"sigillo", t:"2016", d:"il regolamento europeo"},
  {icona:"scudo", t:"Accountability", d:"la responsabilizzazione", key:true}]},

// --- 3 · la prima stagione
{id:"s06", tipo:"norma", tema:"chiaro", etichetta:"Legge 31 dicembre 1996, n. 675", sigla:"La prima legge",
  testo:"Organica, sulla protezione dei dati: attua la **direttiva 95/46/CE**."},
{id:"s07", tipo:"confronto", tema:"chiaro", sopratitolo:"Prima del 1996", col:[
  {h:"C'erano", t:"segreto **professionale**, segreto **d'ufficio**, norme sparse"},
  {h:"Mancava", t:"un **diritto** della persona sui propri dati", key:true}]},
{id:"s08", tipo:"illustrata", tema:"chiaro", ill:"faro", sopratitolo:"Parole nuove, un'autorità nuova",
  titolo:"Nasce il **Garante**", punti:[
    {icona:"libro", t:"trattamento, interessato, titolare, **consenso**"},
    {icona:"scudo", t:"un'autorità **indipendente**", key:true}],
  etichette:{alto:{t:"Garante privacy", key:true}}},
{id:"s09", tipo:"confronto", tema:"chiaro", sopratitolo:"Cautele diverse", col:[
  {h:"Dati comuni", t:"le regole **generali**"},
  {h:"Dati sensibili", t:"come quelli sulla **salute**: cautele rafforzate", key:true}]},
{id:"s10", tipo:"sostituzione", tema:"chiaro", sopratitolo:"Il messaggio",
  da:{h:"Prima", t:"i dati sono di chi li raccoglie"},
  a:{h:"Dal 1996", t:"regole per chi tratta, **voce** alla persona"}},
{id:"s11", tipo:"trappola", tema:"tenue", sopratitolo:"Occhio a un distrattore", righe:[
  {sb:"La privacy nasce con il regolamento europeo",
   ok:"In Italia la prima legge organica è del 1996"}]},
{id:"s12", tipo:"titolo", tema:"profondo",
  titolo:"Il **1996**: i dati diventano<br>un **diritto** della persona."},

// --- 4 · la seconda stagione
{id:"s13", tipo:"norma", tema:"chiaro", etichetta:"D.Lgs. 30 giugno 2003, n. 196", sigla:"Il Codice",
  testo:"Un **testo unico** in materia di protezione dei dati personali."},
{id:"s14", tipo:"illustrata", tema:"chiaro", ill:"archivio", sopratitolo:"Dal 1° gennaio 2004",
  titolo:"Parte generale e **settori**", punti:[
    {icona:"libro", t:"regole **comuni**"},
    {icona:"ospedale", t:"una disciplina per l'ambito **sanitario**", key:true}],
  etichette:{cassetto:{t:"Sanità", key:true}}},
{id:"s15", tipo:"icone", tema:"chiaro", sopratitolo:"Le misure minime di sicurezza", voci:[
  {icona:"lucchetto",   t:"**Password** e credenziali"},
  {icona:"ingranaggio", t:"**Aggiornamenti** dei sistemi"},
  {icona:"cartella",    t:"**Copie** di sicurezza"},
  {icona:"documento",   t:"Un elenco **uguale per tutti**"}]},
{id:"s16", tipo:"tre", tema:"chiaro", attive:[0,1,2], sopratitolo:"Le figure del Codice", box:[
  {n:"1", t:"Titolare", d:"decide finalità e mezzi"},
  {n:"2", t:"Responsabile", d:"tratta per conto del titolare"},
  {n:"3", t:"Incaricati", d:"oggi: persone autorizzate"}]},
{id:"s17", tipo:"norma", tema:"chiaro", etichetta:"Carta dei diritti fondamentali UE, art. 8", sigla:"Diritto autonomo",
  testo:"La protezione dei dati, **distinta** dal rispetto della vita privata."},
{id:"s18", tipo:"illustrata", tema:"chiaro", ill:"sportello", sopratitolo:"Negli ospedali",
  titolo:"Gesti **nuovi**", punti:[
    {icona:"documento", t:"l'**informativa** ai pazienti"},
    {icona:"cartella", t:"la consegna dei **referti**"},
    {icona:"chat", t:"chiamare senza rivelare la **malattia**", key:true}],
  etichette:{insegna:{t:"Accettazione", key:true}}},
{id:"s19", tipo:"trappola", tema:"tenue", sopratitolo:"Attenzione", righe:[
  {sb:"Il regolamento europeo ha abrogato il Codice del 2003",
   ok:"Il Codice è ancora in vigore, profondamente modificato"}]},
{id:"s20", tipo:"titolo", tema:"profondo",
  titolo:"Il **2003**: un codice unico,<br>regole per ogni **settore**."},

// --- 5 · la terza stagione
{id:"s21", tipo:"norma", tema:"chiaro", etichetta:"Regolamento (UE) 2016/679 · GDPR", sigla:"27 aprile 2016",
  testo:"Adottato nel 2016, **in vigore** dal maggio dello stesso anno."},
{id:"s22", tipo:"scadenza", tema:"chiaro", sopratitolo:"Art. 99 · due anni per adeguarsi",
  max:26, banda:[0,24], inizio:"maggio 2016", fine:"",
  tappe:[{a:24, v:"25/5/2018", t:"si **applica**", key:true}]},
{id:"s23", tipo:"confronto", tema:"chiaro", sopratitolo:"Perché un regolamento", col:[
  {h:"Direttiva", t:"serve una legge **nazionale** che la recepisca"},
  {h:"Regolamento", t:"**direttamente applicabile**, uguale ovunque", key:true}]},
{id:"s24", tipo:"sostituzione", tema:"chiaro", sopratitolo:"Art. 94",
  da:{h:"Abrogata", t:"direttiva 95/46/CE"},
  a:{h:"Al suo posto", t:"il **regolamento** 2016/679"}},
{id:"s25", tipo:"norma", tema:"chiaro", etichetta:"D.Lgs. 10 agosto 2018, n. 101", sigla:"L'adeguamento",
  testo:"Il Codice **resta**, riscritto negli spazi lasciati agli Stati."},
{id:"s26", tipo:"tre", tema:"chiaro", attive:[0,1,2], sopratitolo:"Gli spazi nazionali che ci riguardano", box:[
  {n:"1", t:"Sanità", d:"i trattamenti in ambito sanitario"},
  {n:"2", t:"Lavoro", d:"i dati dei dipendenti"},
  {n:"3", t:"PA", d:"i compiti di interesse pubblico"}]},
{id:"s27", tipo:"illustrata", tema:"chiaro", ill:"impronta", sopratitolo:"Art. 4 · le definizioni",
  titolo:"Il **dato personale**", punti:[
    {icona:"persona", t:"persona **identificata** o identificabile"},
    {icona:"documento", t:"nome, numero, codice, **immagine**", key:true}],
  etichette:{alto:{t:"Identifica", key:true}, sx:"Interessato"}},
{id:"s28", tipo:"flusso", tema:"chiaro", sopratitolo:"Trattamento: qualsiasi operazione", passi:[
  {icona:"cartella", t:"Raccogliere"},
  {icona:"occhio", t:"Consultare", d:"anche solo leggere", key:true},
  {icona:"chat", t:"Comunicare"},
  {icona:"lucchetto", t:"Conservare"},
  {icona:"divieto", t:"Cancellare"}]},
{id:"s29", tipo:"confronto", tema:"chiaro", sopratitolo:"Due figure da non confondere", col:[
  {h:"Interessato", t:"la **persona** a cui i dati si riferiscono"},
  {h:"Titolare", t:"decide **finalità e mezzi**: l'azienda sanitaria", key:true}]},
{id:"s30", tipo:"illustrata", tema:"chiaro", ill:"globo", sopratitolo:"Art. 3 · l'ambito territoriale",
  titolo:"Oltre i **confini**", punti:[
    {icona:"ospedale", t:"chi ha uno **stabilimento** nell'Unione"},
    {icona:"persone", t:"chi da fuori offre servizi o **monitora** persone nell'Unione", key:true}],
  etichette:{alto:{t:"Unione europea", key:true}, sx:"Fuori UE", dx:"Fuori UE"}},
{id:"s31", tipo:"flusso", tema:"chiaro", sopratitolo:"Un esempio", passi:[
  {icona:"chat", t:"Telemedicina", d:"sede fuori dall'Europa"},
  {icona:"persone", t:"Pazienti italiani", d:"ricevono consulti"},
  {icona:"sigillo", t:"Si applica il GDPR", key:true}]},
{id:"s32", tipo:"trappola", tema:"tenue", sopratitolo:"Un distrattore frequente", righe:[
  {sb:"Il GDPR vale solo per chi ha sede in Europa",
   ok:"Conta anche dove si trovano le persone"}]},
{id:"s33", tipo:"titolo", tema:"profondo",
  titolo:"Il **2018**: regole uguali<br>in tutta Europa,<br>anche per chi viene da **fuori**."},

// --- 6 · la responsabilizzazione
{id:"s34", tipo:"norma", tema:"chiaro", etichetta:"GDPR, art. 5, par. 2", sigla:"Accountability",
  testo:"Il titolare rispetta i principi ed è **in grado di comprovarlo**."},
{id:"s35", tipo:"icone", tema:"chiaro", sopratitolo:"Saperlo dimostrare", voci:[
  {icona:"documento",   t:"**Documenti**"},
  {icona:"ingranaggio", t:"**Procedure**"},
  {icona:"bilancia",    t:"Scelte **motivate**"},
  {icona:"occhio",      t:"Pronti se il **Garante** chiede"}]},
{id:"s36", tipo:"illustrata", tema:"chiaro", ill:"bilancia", sopratitolo:"Art. 24 · il metodo",
  titolo:"Misure **adeguate**", punti:[
    {icona:"ingranaggio", t:"**tecniche** e organizzative"},
    {icona:"avviso", t:"pesate sui **rischi** per le persone", key:true}],
  etichette:{sx:"Misure", dx:"Rischi", alto:{t:"Proporzione", key:true}}},
{id:"s37", tipo:"sostituzione", tema:"chiaro", sopratitolo:"Cambia la logica",
  da:{h:"Prima", t:"misure minime uguali per tutti"},
  a:{h:"Ora", t:"un approccio basato sul **rischio**"}},
{id:"s38", tipo:"illustrata", tema:"chiaro", ill:"documento", sopratitolo:"Art. 25 · by design",
  titolo:"Fin dalla **progettazione**", punti:[
    {icona:"ingranaggio", t:"quando si sceglie un **software**"},
    {icona:"persone", t:"quando si organizza un **servizio**", key:true}],
  etichette:{titolo:"Progetto", sigillo:{t:"Privacy", key:true}}},
{id:"s39", tipo:"illustrata", tema:"chiaro", ill:"imbuto", sopratitolo:"Art. 25 · by default",
  titolo:"Per **impostazione predefinita**", punti:[
    {icona:"cartella", t:"solo i dati **necessari**"},
    {icona:"lucchetto", t:"non accessibili a un numero **indefinito** di persone", key:true}],
  etichette:{sx:"Dati possibili", dx:{t:"Solo il necessario", key:true}}},
{id:"s40", tipo:"flusso", tema:"chiaro", sopratitolo:"Un nuovo gestionale di reparto: prima, non dopo", passi:[
  {icona:"occhio", t:"Chi vede", d:"quali dati"},
  {icona:"orologio", t:"Per quanto", d:"si conservano"},
  {icona:"documento", t:"Gli accessi", d:"registrati", key:true}]},
{id:"s41", tipo:"tre", tema:"chiaro", attive:[0,1,2], sopratitolo:"E per chi lavora in reparto o in ufficio", box:[
  {n:"1", t:"Istruzioni", d:"seguire quelle ricevute"},
  {n:"2", t:"Credenziali", d:"solo le proprie"},
  {n:"3", t:"Necessità", d:"consultare solo i dati che servono"}]},
{id:"s42", tipo:"trappola", tema:"tenue", sopratitolo:"Attenzione", righe:[
  {sb:"Accountability significa inviare moduli al Garante",
   ok:"Significa organizzarsi e poter dimostrare"}]},
{id:"s43", tipo:"titolo", tema:"profondo",
  titolo:"Non solo rispettare le regole:<br>saperlo **dimostrare**."},

// --- 7 · le tre cose
{id:"s44", tipo:"memo", tema:"chiaro", attive:[0], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s45", tipo:"memo", tema:"chiaro", attive:[0,1], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s46", tipo:"memo", tema:"chiaro", attive:[0,1,2], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s47", tipo:"trappola", tema:"tenue", sopratitolo:"L'ultimo distrattore", righe:[
  {sb:"Il GDPR è entrato in vigore il 25 maggio 2018",
   ok:"Da quel giorno si applica; in vigore lo era dal 2016"}]},

// --- 8 · chiusura
{id:"s48", tipo:"titolo", tema:"profondo",
  titolo:"Tre **stagioni**,<br>un diritto della persona,<br>un titolare che sa **dimostrare**.",
  sotto:"Prossima lezione: i principi del trattamento."},

{id:"s49", tipo:"copertina", tema:"profondo", modulo:"Prossima lezione",
  titolo:"Lezione 7.2", sottotitolo:"I principi<br>del trattamento", ente:ENTE},
];
