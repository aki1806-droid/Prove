// Contenuto delle 50 scene della lezione 7.5. *accento*  **accento in semibold**
//
// Corso «Progressione verticale · Comparto Sanità», Modulo 7. I diritti dell'interessato:
// GDPR artt. 12, 15-22, 77, 79, 82; L. 24/2017, art. 4, c. 2 (copia della documentazione sanitaria).

const ENTE = "CISL FP Padova Rovigo · Progressione verticale · Comparto Sanità";

const TRE_COSE = [
  "I diritti degli **artt. 15-22** sono **gratuiti**; risposta entro **un mese**, prorogabile di **due** con motivazione",
  "Accesso e rettifica spettano **di regola**; la cancellazione **cede** a obblighi di legge e compiti pubblici, come la **cartella clinica**",
  "Portabilità solo con **consenso o contratto** e mezzi automatizzati; opposizione per la **situazione particolare**; poi il **reclamo**",
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 7 · Trattamento dei dati personali",
  titolo:"I diritti<br>dell'interessato", sottotitolo:"Lezione 7.5", ente:ENTE},

// --- 1 · aggancio
{id:"s02", tipo:"illustrata", tema:"chiaro", ill:"busta", sopratitolo:"Una paziente scrive all'azienda",
  titolo:"Tre **richieste**", punti:[
    {icona:"occhio", t:"sapere quali **dati** avete su di lei"},
    {icona:"cartella", t:"correggere un'**allergia** sbagliata"},
    {icona:"divieto", t:"cancellare **tutta** la cartella", key:true}],
  etichette:{sx:"Azienda", dx:"Paziente", alto:{t:"Richiesta", key:true}}},
{id:"s03", tipo:"tre", tema:"chiaro", attive:[0,1,2], sopratitolo:"Tre diritti diversi", box:[
  {n:"1", t:"Sapere", d:"va soddisfatta"},
  {n:"2", t:"Correggere", d:"va soddisfatta"},
  {n:"3", t:"Cancellare", d:"in gran parte no"}]},
{id:"s04", tipo:"titolo", tema:"profondo",
  titolo:"I dati sono della **persona**:<br>i diritti le restituiscono il **controllo**."},

// --- 2 · rotta
{id:"s05", tipo:"flusso", tema:"chiaro", sopratitolo:"Quattro passaggi", passi:[
  {icona:"libro", t:"Come si esercitano", d:"art. 12"},
  {icona:"occhio", t:"Accesso e rettifica"},
  {icona:"lucchetto", t:"Cancellazione e limitazione", key:true},
  {icona:"ingranaggio", t:"Portabilità e opposizione"}]},

// --- 3 · come si esercitano
{id:"s06", tipo:"norma", tema:"chiaro", etichetta:"GDPR, art. 12", sigla:"Agevolare",
  testo:"Il titolare **agevola** l'esercizio dei **diritti**, non lo ostacola."},
{id:"s07", tipo:"scadenza", tema:"chiaro", sopratitolo:"Art. 12, par. 3 · quando si risponde (in mesi)",
  max:3.4, banda:[0,1], inizio:"richiesta", fine:"",
  tappe:[{a:1, v:"1 mese", t:"la **risposta**", key:true}, {a:3, v:"+2", t:"**proroga** se complessa"}]},
{id:"s08", tipo:"confronto", tema:"chiaro", sopratitolo:"Sempre con una spiegazione", col:[
  {h:"La proroga", t:"comunicata **entro il primo mese**, con i motivi"},
  {h:"Se non dà seguito", t:"spiega perché e ricorda **reclamo** e **ricorso**", key:true}]},
{id:"s09", tipo:"confronto", tema:"chiaro", sopratitolo:"Art. 12, par. 5 · quanto costa", col:[
  {h:"Di regola", t:"l'esercizio dei diritti è **gratuito**", key:true},
  {h:"Richieste infondate o eccessive", t:"contributo spese o **rifiuto**, motivati"}]},
{id:"s10", tipo:"illustrata", tema:"chiaro", ill:"impronta", sopratitolo:"Art. 12, par. 6 · chi sta chiedendo?",
  titolo:"Verificare l'**identità**", punti:[
    {icona:"avviso", t:"con **dubbi ragionevoli** si chiedono informazioni"},
    {icona:"cuoremano", t:"dati sanitari alla persona sbagliata: **violazione grave**", key:true}],
  etichette:{alto:{t:"Identità", key:true}, sx:"Richiesta", dx:"Verifica"}},
{id:"s11", tipo:"flusso", tema:"chiaro", sopratitolo:"La richiesta arriva all'URP", passi:[
  {icona:"chat", t:"Ricevuta"},
  {icona:"documento", t:"Protocollata"},
  {icona:"persone", t:"Inoltrata", d:"all'ufficio competente"},
  {icona:"orologio", t:"Il mese decorre", d:"dal ricevimento", key:true}]},
{id:"s12", tipo:"trappola", tema:"tenue", sopratitolo:"Occhio a un distrattore", righe:[
  {sb:"Il termine è di trenta giorni fissi",
   ok:"Un mese, prorogabile di due, con comunicazione motivata"}]},
{id:"s13", tipo:"titolo", tema:"profondo",
  titolo:"Un **mese** per rispondere,<br>gratis, alla persona **giusta**."},

// --- 4 · accesso e rettifica
{id:"s14", tipo:"illustrata", tema:"chiaro", ill:"archivio", sopratitolo:"GDPR, art. 15",
  titolo:"Il diritto di **accesso**", punti:[
    {icona:"occhio", t:"sapere **se** ci sono dati che la riguardano"},
    {icona:"documento", t:"e riceverne una **copia**", key:true}],
  etichette:{cassetto:{t:"I miei dati", key:true}}},
{id:"s15", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"Insieme ai dati, le informazioni essenziali", celle:[
  {t:"**Finalità**"}, {t:"**Categorie** di dati"}, {t:"**Destinatari**"},
  {t:"Periodo di **conservazione**"}, {t:"I suoi **diritti**"}, {t:"L'**origine** dei dati"}]},
{id:"s16", tipo:"scadenza", tema:"chiaro", sopratitolo:"L. 24/2017, art. 4 · la documentazione sanitaria (giorni)",
  max:34, banda:[0,7], inizio:"richiesta", fine:"",
  tappe:[{a:7, v:"7", t:"la **copia**", key:true}, {a:30, v:"30", t:"eventuali **integrazioni**"}]},
{id:"s17", tipo:"icone", tema:"chiaro", sopratitolo:"Anche il dipendente può accedere", voci:[
  {icona:"cartella",    t:"Fascicolo **personale**"},
  {icona:"orologio",    t:"**Presenze**"},
  {icona:"certificato", t:"**Valutazioni**"},
  {icona:"persone",     t:"Con i limiti dei **diritti altrui**"}]},
{id:"s18", tipo:"confronto", tema:"chiaro", sopratitolo:"GDPR, art. 16 · la rettifica", col:[
  {h:"Correggere", t:"i dati **inesatti**", key:true},
  {h:"Integrare", t:"quelli **incompleti**, anche con una dichiarazione"}]},
{id:"s19", tipo:"illustrata", tema:"chiaro", ill:"cartellaclinica", sopratitolo:"L'allergia registrata per errore",
  titolo:"Corretta **senza ritardo**", punti:[
    {icona:"persona", t:"un **diritto** della paziente"},
    {icona:"scudo", t:"una **garanzia** per chi la cura", key:true}],
  etichette:{alto:{t:"Rettifica", key:true}}},
{id:"s20", tipo:"confronto", tema:"chiaro", sopratitolo:"In ambito clinico", col:[
  {h:"Una diagnosi superata", t:"non si **riscrive**"},
  {h:"Si aggiorna", t:"lasciando **traccia** di ciò che era registrato", key:true}]},
{id:"s21", tipo:"flusso", tema:"chiaro", sopratitolo:"Art. 19 · l'obbligo di notifica", passi:[
  {icona:"ingranaggio", t:"Rettifica", d:"cancellazione, limitazione"},
  {icona:"chat", t:"Comunicazione"},
  {icona:"persone", t:"Ai destinatari", d:"che avevano i dati", key:true}]},
{id:"s22", tipo:"trappola", tema:"tenue", sopratitolo:"Un distrattore frequente", righe:[
  {sb:"Per l'accesso bisogna motivare la richiesta",
   ok:"Nessuna motivazione: basta chiedere"}]},
{id:"s23", tipo:"titolo", tema:"profondo",
  titolo:"**Sapere**, avere copia,<br>**correggere** senza ritardo."},

// --- 5 · cancellazione e limitazione
{id:"s24", tipo:"illustrata", tema:"chiaro", ill:"documento", sopratitolo:"GDPR, art. 17",
  titolo:"La **cancellazione**", punti:[
    {icona:"libro", t:"detta anche diritto all'**oblio**"},
    {icona:"spunta", t:"si applica in **casi precisi**", key:true}],
  etichette:{titolo:"Art. 17", sigillo:{t:"Oblio", key:true}}},
{id:"s25", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Per esempio, quando", celle:[
  {t:"I dati **non servono più**"}, {t:"Consenso **revocato**, nessun'altra base"},
  {t:"**Opposizione** che prevale"}, {t:"Trattamento **illecito**"}]},
{id:"s26", tipo:"griglia", tema:"chiaro", colonne:4, spunta:false, sopratitolo:"Art. 17, par. 3 · i limiti", celle:[
  {t:"**Obbligo** di legge"}, {t:"Interesse **pubblico**"}, {t:"**Sanità** pubblica"}, {t:"**Archivio** e ricerca"}]},
{id:"s27", tipo:"illustrata", tema:"chiaro", ill:"cartellaclinica", sopratitolo:"La terza richiesta della paziente",
  titolo:"La cartella **non si cancella**", punti:[
    {icona:"libro", t:"va conservata **per legge**"},
    {icona:"scudo", t:"a garanzia della **stessa paziente**", key:true}],
  etichette:{alto:{t:"Conservata", key:true}}},
{id:"s28", tipo:"confronto", tema:"chiaro", sopratitolo:"Si può cancellare, invece", col:[
  {h:"Un servizio facoltativo", t:"con il **consenso**, poi revocato"},
  {h:"Si cancella", t:"il **recapito** che non serve più", key:true}]},
{id:"s29", tipo:"illustrata", tema:"chiaro", ill:"cassaforte", sopratitolo:"GDPR, art. 18",
  titolo:"La **limitazione**", punti:[
    {icona:"cartella", t:"i dati **restano** conservati"},
    {icona:"lucchetto", t:"ma si **congelano**: usi solo particolari", key:true}],
  etichette:{alto:{t:"Limitati", key:true}}},
{id:"s30", tipo:"icone", tema:"chiaro", sopratitolo:"Quando si limita", voci:[
  {icona:"avviso",   t:"Esattezza **contestata**"},
  {icona:"divieto",  t:"Illecito, ma **non cancellare**"},
  {icona:"giudice",  t:"Per **difendere** un diritto"},
  {icona:"bilancia", t:"**Opposizione** in valutazione"}]},
{id:"s31", tipo:"confronto", tema:"chiaro", sopratitolo:"Da non confondere", col:[
  {h:"Limitazione", t:"un diritto dell'**art. 18**"},
  {h:"Oscuramento", t:"garanzia di **dossier** e **fascicolo**", key:true}]},
{id:"s32", tipo:"trappola", tema:"tenue", sopratitolo:"Attenzione", righe:[
  {sb:"Il diritto all'oblio è assoluto",
   ok:"Cede a obblighi di legge e compiti di interesse pubblico"}]},
{id:"s33", tipo:"titolo", tema:"profondo",
  titolo:"**Cancellare** quando si può,<br>**congelare** quando serve."},

// --- 6 · portabilità, opposizione, decisioni automatizzate
{id:"s34", tipo:"flusso", tema:"chiaro", sopratitolo:"GDPR, art. 20 · la portabilità", passi:[
  {icona:"persona", t:"I propri dati"},
  {icona:"documento", t:"Formato strutturato", d:"leggibile da un computer"},
  {icona:"ospedale", t:"A un altro titolare", key:true}]},
{id:"s35", tipo:"tre", tema:"chiaro", attive:[0,1,2], sopratitolo:"Vale solo se", box:[
  {n:"1", t:"Consenso o contratto", d:"è la base"},
  {n:"2", t:"Automatizzato", d:"il trattamento"},
  {n:"3", t:"Non pubblico", d:"esclusi i compiti di interesse pubblico"}]},
{id:"s36", tipo:"confronto", tema:"chiaro", sopratitolo:"In un'azienda sanitaria pubblica", col:[
  {h:"Portabilità in senso stretto", t:"**raramente** spetta"},
  {h:"Accesso e copia", t:"coprono gran parte delle **esigenze**", key:true}]},
{id:"s37", tipo:"illustrata", tema:"chiaro", ill:"bilancia", sopratitolo:"GDPR, art. 21",
  titolo:"L'**opposizione**", punti:[
    {icona:"persona", t:"per la sua **situazione particolare**"},
    {icona:"libro", t:"contro interesse **pubblico** o **legittimo**", key:true}],
  etichette:{alto:{t:"Opposizione", key:true}, sx:"Persona", dx:"Titolare"}},
{id:"s38", tipo:"confronto", tema:"chiaro", sopratitolo:"Che cosa succede", col:[
  {h:"Di regola", t:"il titolare si ferma, salvo **motivi cogenti**"},
  {h:"Marketing diretto", t:"l'opposizione vale **sempre**", key:true}]},
{id:"s39", tipo:"tre", tema:"chiaro", attive:[0,1,2], sopratitolo:"Art. 22 · niente decisioni solo automatizzate se", box:[
  {n:"1", t:"Solo automatica", d:"senza intervento umano"},
  {n:"2", t:"Profilazione", d:"compresa"},
  {n:"3", t:"Effetti rilevanti", d:"giuridici o significativi"}]},
{id:"s40", tipo:"flusso", tema:"chiaro", sopratitolo:"Una lista d'attesa gestita da un algoritmo", passi:[
  {icona:"ingranaggio", t:"Algoritmo"},
  {icona:"orologio", t:"Priorità", d:"proposte"},
  {icona:"persona", t:"Una persona", d:"valuta e decide", key:true}]},
{id:"s41", tipo:"tre", tema:"chiaro", attive:[0,1,2], sopratitolo:"Se il titolare non risponde, o risponde male", box:[
  {n:"1", t:"Reclamo", d:"al Garante"},
  {n:"2", t:"Ricorso", d:"al giudice"},
  {n:"3", t:"Risarcimento", d:"del danno subito"}]},
{id:"s42", tipo:"flusso", tema:"chiaro", sopratitolo:"La regola pratica per gli uffici", passi:[
  {icona:"occhio", t:"Riconoscere"},
  {icona:"documento", t:"Registrare"},
  {icona:"persone", t:"Trasmettere subito", d:"a chi risponde", key:true}]},
{id:"s43", tipo:"trappola", tema:"tenue", sopratitolo:"Attenzione", righe:[
  {sb:"La portabilità è un diritto generale su tutti i dati",
   ok:"Serve consenso o contratto, e un trattamento automatizzato"}]},
{id:"s44", tipo:"titolo", tema:"profondo",
  titolo:"Diritti **forti**,<br>ognuno con i suoi **confini**."},

// --- 7 · le tre cose
{id:"s45", tipo:"memo", tema:"chiaro", attive:[0], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s46", tipo:"memo", tema:"chiaro", attive:[0,1], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s47", tipo:"memo", tema:"chiaro", attive:[0,1,2], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s48", tipo:"trappola", tema:"tenue", sopratitolo:"L'ultimo distrattore", righe:[
  {sb:"Per avere copia dei propri dati si paga",
   ok:"È gratuita; il contributo è l'eccezione per richieste eccessive"}]},

// --- 8 · chiusura
{id:"s49", tipo:"titolo", tema:"profondo",
  titolo:"**Sapere**, correggere,<br>cancellare quando si può,<br>**opporsi** quando serve.",
  sotto:"Prossima lezione: ruoli, adempimenti e sanzioni."},

{id:"s50", tipo:"copertina", tema:"profondo", modulo:"Prossima lezione",
  titolo:"Lezione 7.6", sottotitolo:"Ruoli, adempimenti<br>e sanzioni", ente:ENTE},
];
