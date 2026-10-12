// Contenuto delle 50 scene della lezione 17.11 — l'evento avverso: una lesione
// da pressione che diventa una richiesta di risarcimento. Le giornate del
// ricovero sono un percorso; la segnalazione un percorso che arriva al
// miglioramento; la responsabilità civile e penale due colonne che si
// accendono; gli errori in tabella; la risposta modello un promemoria che si
// scrive riga per riga.

const LEZIONI = [
  {n:"1.5", t:"Responsabilità", illu:"bilancia"},
  {n:"2.4", t:"Documentazione", illu:"cartella"},
  {n:"2.6", t:"Rischio clinico", illu:"scudo"},
  {n:"7.2", t:"Lesioni da pressione", illu:"letto"},
  {n:"12.5", t:"Contratto", illu:"libro"}];

const GIORNI = (att, k) => ({tipo:"percorso", tema:"chiaro", attive:att, tappe:[
  {t:"1ª giornata", d:"Braden 12 · cute del sacro «integra»", key:k===0},
  {t:"2ª giornata", d:"materasso antidecubito richiesto", key:k===1},
  {t:"7ª giornata", d:"materasso arrivato · nessun sollecito documentato", key:k===2},
  {t:"14ª giornata", d:"lesione da pressione sacrale di stadio 3", key:k===3}]});

const SEGNALA = (att, k) => ({tipo:"percorso", tema:"chiaro", attive:att, tappe:[
  {t:"Segnalazione", d:"incident reporting · lezione 2.6", key:k===0},
  {t:"Analisi", d:"risk management: audit, analisi delle cause", key:k===1},
  {t:"Miglioramento", d:"azioni, non la ricerca del colpevole", key:k===2}]});

const RESP = (att, k) => ({tipo:"colonne", tema:"chiaro", attive:att, colonne:[
  {h:"Civile", key:k===0, voci:[{t:"Verso il paziente risponde la **struttura**"},
    {t:"Il dipendente: di norma a titolo **extracontrattuale**"},
    {t:"Rivalsa solo per **dolo** o **colpa grave**"}]},
  {h:"Penale · art. 590-sexies c.p.", key:k===1, voci:[{t:"Evento dovuto a **imperizia**"},
    {t:"Punibilità **esclusa**", d:"se rispettate linee guida o buone pratiche adeguate al caso concreto"}]}]});

const MIGLIORA = (att) => ({tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, attive:att, celle:[
  {n:"1", t:"**Braden** a intervalli definiti e a ogni cambiamento · promemoria nella cartella informatizzata"},
  {n:"2", t:"Scheda di **riposizionamento** con orari e posizioni"},
  {n:"3", t:"**Percorso rapido** per i presidi, con responsabile e tempi"},
  {n:"4", t:"**Formazione** dell'équipe · compiti chiari agli OSS, con verifica"},
  {n:"5", t:"**Indicatori**: prevalenza, incidenza, aderenza alla rivalutazione"},
  {n:"6", t:"**Audit** di verifica dopo qualche mese · PDCA, lezione 12.7"}]});

const RISPOSTA = (att) => ({tipo:"memo", tema:"chiaro", attive:att, voci:[
  "**Inquadramento**: allettata da 3 settimane, lesione sacrale di **stadio 3**, documentazione carente, reclamo · priorità: **la cura**",
  "Lesione valutata e **documentata** in modo completo",
  "Con l'équipe: superficie antidecubito, riposizionamento **programmato e documentato**, medicazione avanzata, nutrizione, dolore",
  "Cartella **mai** modificata né integrata retroattivamente · annotazioni tardive con data e ora **reali**",
  "**Segnalazione** e analisi delle cause",
  "Comunicazione **onesta** con la famiglia, con il medico, senza attribuire colpe",
  "Tutele della **L. 24/2017** e del contratto · azioni di **miglioramento**"]});

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 17 · Casi clinici avanzati",
  titolo:"L'evento<br>avverso", sottotitolo:"17.11 · Documentazione e responsabilità",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"catena", tema:"chiaro", sopratitolo:"Micro-lezione 11 di 12 · un caso senza emergenza clinica · il piano clinico e comunicativo", passi:[
  {t:"Un **evento avverso**"}, {t:"Un **reclamo**"}, {t:"Una richiesta di **risarcimento**", key:true}]},
{id:"s03", tipo:"anello", tema:"chiaro", sopratitolo:"La documentazione come tutela · la legge 24 · i collegamenti",
  centro:"17.11", sotto:"tutela per il paziente e per il professionista", voci:LEZIONI},

{id:"s04", tipo:"cifre", tema:"chiaro", sopratitolo:"Lo scenario · la signora Ines, in Medicina da tre settimane per una polmonite, a lungo allettata", voci:[
  {n:"79", suf:"anni", t:"a lungo allettata"},
  {n:"12", t:"Braden all'ingresso", d:"cute del sacro descritta come **integra**", key:true}]},
{id:"s05", sopratitolo:"In cartella · Braden mai rivalutata · «riposizionata», senza orari né posizioni", ...GIORNI([0,1,2], 2)},
{id:"s06", tipo:"pausa", tema:"chiaro", sopratitolo:"14ª giornata: lesione sacrale di stadio 3 · il figlio fa reclamo all'URP e annuncia un risarcimento", es:"metti in pausa",
  testo:"Che cosa si fa **adesso**, e che cosa **non si deve mai** fare?",
  dati:["stadio 3, sacrale", "reclamo all'URP", "risarcimento annunciato"]},

{id:"s07", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Prima di tutto la paziente · la lesione si valuta e si documenta, con misure ed eventuali foto, secondo procedura e consenso", celle:[
  {n:"1", t:"**Stadio**"}, {n:"2", t:"**Dimensioni**"}, {n:"3", t:"**Fondo**"},
  {n:"4", t:"**Essudato**"}, {n:"5", t:"**Dolore**"}, {n:"6", t:"Segni di **infezione**"}]},
{id:"s08", tipo:"griglia", tema:"chiaro", colonne:2, sopratitolo:"Il piano di trattamento", celle:[
  {t:"Superficie **antidecubito**"}, {t:"Riposizionamento **programmato e documentato**"},
  {t:"Medicazione **avanzata**"}, {t:"**Nutrizione**"}, {t:"Controllo del **dolore**"}]},
{id:"s09", tipo:"frase", tema:"chiaro", sopratitolo:"Si rivaluta il rischio · l'esperto in wound care, se c'è",
  testo:"Un evento avverso non si gestisce solo sul piano legale: **prima si cura**."},

{id:"s10", tipo:"griglia", tema:"chiaro", colonne:3, sopratitolo:"Che cosa non si deve mai fare, sulla documentazione", celle:[
  {no:true, t:"**Modificare**"}, {no:true, t:"**Cancellare**"}, {no:true, t:"Integrare **retroattivamente**"}]},
{id:"s11", tipo:"norma", tema:"chiaro", sopratitolo:"Perché",
  etichetta:"La cartella clinica", sigla:"Atto pubblico", testo:"Alterarla può configurare il reato di **falso**: molto più grave di una documentazione incompleta."},
{id:"s12", tipo:"sostituzione", tema:"chiaro", sopratitolo:"Le correzioni, solo secondo procedura",
  da:{h:"Mai", t:"cancellare o riscrivere"}, a:{h:"La correzione", t:"testo errato **leggibile** · data, ora, firma, motivazione"},
  sotto:"Annotazione tardiva: la data e l'ora **reali** in cui si scrive, e il momento a cui si riferisce."},
{id:"s13", tipo:"frase", tema:"chiaro", sopratitolo:"Dopo un reclamo, la tentazione di «aggiustare» le cartelle è comprensibile",
  testo:"Ma è proprio ciò che trasforma un problema in un **reato**."},

{id:"s14", sopratitolo:"La segnalazione e l'analisi", ...SEGNALA([0,1], 1)},
{id:"s15", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Le cause probabili · organizzative e professionali insieme", celle:[
  {n:"1", t:"Rischio **non rivalutato**"}, {n:"2", t:"Documentazione **assente**"},
  {n:"3", t:"Materasso in ritardo, **senza un percorso di sollecito**"}, {n:"4", t:"Forse **carichi di lavoro** elevati"}]},
{id:"s16", sopratitolo:"La legge 24 tutela il processo: gli atti della gestione del rischio non si usano nei giudizi", ...SEGNALA([0,1,2], 2)},

{id:"s17", tipo:"figura", tema:"chiaro", illu:"ascolto", sopratitolo:"La comunicazione con la famiglia",
  titolo:"Ascoltare il figlio, **riconoscere** la sua preoccupazione.", sotto:"Vedere una lesione profonda sul corpo della propria madre è doloroso."},
{id:"s18", tipo:"griglia", tema:"chiaro", colonne:1, sopratitolo:"Comunicare l'evento, secondo le procedure aziendali", celle:[
  {t:"In modo **onesto** e trasparente"},
  {t:"Con il **medico** e, se previsto, con la **direzione**"},
  {no:true, t:"**Promesse**"},
  {no:true, t:"**Colpe** a colleghi o ad altri servizi"}]},
{id:"s19", tipo:"icone", tema:"chiaro", sopratitolo:"Una comunicazione sincera riduce i conflitti più di qualsiasi difesa", voci:[
  {icona:"documento", t:"Il piano di cura", d:"in corso"},
  {icona:"ospedale", t:"I canali previsti", d:"URP e direzione"},
  {icona:"cartella", t:"Documentare il colloquio", key:true}]},

{id:"s20", tipo:"norma", tema:"chiaro", sopratitolo:"La legge 24 del 2017 · i principi · lezione 1.5",
  etichetta:"Legge Gelli-Bianco", sigla:"L. 8 marzo 2017, n. 24", testo:"La **sicurezza delle cure** è parte del diritto alla salute."},
{id:"s21", tipo:"tre", tema:"chiaro", sopratitolo:"Un'architettura per la sicurezza", box:[
  {n:"1", t:"Gestione del rischio clinico", d:"in tutte le strutture", key:true},
  {n:"2", t:"Centri regionali", d:"per la gestione del rischio"},
  {n:"3", t:"Osservatorio nazionale", d:"delle buone pratiche"}]},
{id:"s22", tipo:"cifre", tema:"chiaro", sopratitolo:"Trasparenza · e le linee guida del Sistema Nazionale Linee Guida o, in mancanza, le buone pratiche", voci:[
  {n:"7", suf:"giorni", t:"la documentazione sanitaria", d:"al paziente che la richiede", key:true},
  {n:"30", suf:"giorni", t:"eventuali integrazioni"}]},

{id:"s23", sopratitolo:"La responsabilità · sul piano civile", ...RESP([0], 0)},
{id:"s24", sopratitolo:"La responsabilità · sul piano penale", ...RESP([0,1], 1)},
{id:"s25", tipo:"tre", tema:"chiaro", sopratitolo:"E ancora", box:[
  {n:"1", t:"Assicurazione", d:"obbligatoria"},
  {n:"2", t:"Conciliazione", d:"tentativo obbligatorio prima della causa civile"},
  {n:"3", t:"Patrocinio legale", d:"previsto dal contratto · lezione 12.5", key:true}]},

{id:"s26", tipo:"frase", tema:"chiaro", sopratitolo:"Approfondimento · la documentazione come tutela · in giudizio · lezione 2.4",
  testo:"Ciò che non è scritto si considera **non fatto**.", sotto:"Ines è stata riposizionata, forse: la cartella non lo dimostra."},
{id:"s27", tipo:"griglia", tema:"chiaro", colonne:3, sopratitolo:"Una documentazione adeguata", celle:[
  {t:"**Tempestiva**"}, {t:"**Chiara**"}, {t:"**Leggibile**"},
  {t:"**Firmata**"}, {t:"Con **data e ora**"}, {t:"**Oggettiva**"}]},
{id:"s28", tipo:"griglia", tema:"chiaro", colonne:2, sopratitolo:"Per le lesioni da pressione · alcune non sono evitabili (instabilità grave, fine vita): la documentazione prova la prevenzione", celle:[
  {t:"Rischio **all'ingresso** e a ogni cambiamento"}, {t:"Piano di **prevenzione**"},
  {t:"Riposizionamenti con **orari** e **posizioni**"}, {t:"**Ispezione** della cute"},
  {t:"Richieste di presidi e **solleciti**"}, {t:"Informazione alla **famiglia**"}]},

{id:"s29", tipo:"figura", tema:"chiaro", illu:"persona", sopratitolo:"L'infermiere coinvolto · lezione 15.10",
  titolo:"La **seconda vittima**.", sotto:"Chi era in turno può vivere ansia, colpa, paura del giudizio."},
{id:"s30", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Non è solo", celle:[
  {n:"·", t:"Il **coordinatore**"}, {n:"·", t:"Il **risk management**"}, {n:"·", t:"I servizi aziendali di **supporto**"},
  {n:"·", t:"L'organizzazione **sindacale**"}, {n:"·", t:"L'**assicurazione**"}, {n:"·", t:"Il **patrocinio legale** del contratto"}]},
{id:"s31", tipo:"confronto", tema:"chiaro", sopratitolo:"Che cosa fa", col:[
  {h:"No", t:"dichiarazioni **improvvisate**"},
  {h:"Sì", t:"le **procedure** aziendali"}],
  sotto:"E continua a lavorare con attenzione: l'evento è un'occasione per migliorare il sistema."},

{id:"s32", sopratitolo:"Le azioni di miglioramento · nascono dall'analisi", ...MIGLIORA([0])},
{id:"s33", sopratitolo:"Le azioni di miglioramento", ...MIGLIORA([0,1,2,3])},
{id:"s34", sopratitolo:"Le azioni di miglioramento · il ciclo PDCA", ...MIGLIORA([0,1,2,3,4,5])},

{id:"s35", tipo:"tabella", tema:"chiaro", sopratitolo:"Gli errori da evitare · dopo l'evento", colonne:["55%","45%"],
  intestazioni:["Errore", "Invece"], righe:[
  ["no:Modificare o integrare retroattivamente la cartella", "annotazione tardiva con la data **reale**"],
  ["no:Non segnalare l'evento per paura", "**incident reporting**"],
  ["no:Scaricare la responsabilità davanti alla famiglia", "comunicazione **onesta**, senza colpe"]], chiave:[0]},
{id:"s36", tipo:"tabella", tema:"chiaro", sopratitolo:"Gli errori da evitare · nella cura e nella documentazione", colonne:["55%","45%"],
  intestazioni:["Errore", "Invece"], righe:[
  ["no:Comunicare in modo difensivo o reticente", "trasparenza"],
  ["no:Trascurare il trattamento della lesione", "**prima** si cura"],
  ["no:Documentare in modo generico", "**orari** e **posizioni**"],
  ["no:Non sollecitare i presidi", "richieste e **solleciti** scritti"]], chiave:[2]},

{id:"s37", sopratitolo:"D1 · «Che cosa prevede la legge 24 del 2017 in materia di responsabilità?»", ...RESP([0], 0)},
{id:"s38", sopratitolo:"D1 · e poi l'obbligo di assicurazione e il tentativo di conciliazione", ...RESP([0,1], 1)},
{id:"s39", tipo:"catena", tema:"chiaro", sopratitolo:"D2 · «Come si corregge un errore nella documentazione sanitaria?» · senza cancellare", passi:[
  {t:"Il testo errato resta **leggibile**"},
  {t:"La **correzione**", d:"data, ora, firma, motivazione", key:true},
  {t:"Le annotazioni **tardive**", d:"con la data reale"}]},
{id:"s40", tipo:"percorso", tema:"chiaro", sopratitolo:"D3 · «Che cosa fa l'infermiere dopo un evento avverso?»", tappe:[
  {t:"La cura", d:"della persona, prima", key:true}, {t:"La segnalazione"},
  {t:"La comunicazione", d:"onesta, secondo le procedure"}, {t:"La documentazione", d:"accurata"},
  {t:"L'analisi", d:"delle cause"}]},

{id:"s41", sopratitolo:"La risposta modello, in 15 righe", ...RISPOSTA([0])},
{id:"s42", sopratitolo:"La risposta modello · la cura", ...RISPOSTA([0,1,2])},
{id:"s43", sopratitolo:"La risposta modello · la cartella e la segnalazione", ...RISPOSTA([0,1,2,3,4])},
{id:"s44", sopratitolo:"La risposta modello · la famiglia e le tutele", ...RISPOSTA([0,1,2,3,4,5,6])},

{id:"s45", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"I collegamenti", celle:[
  {n:"1.5", t:"Responsabilità e **L. 24/2017**"}, {n:"2.4", t:"**Documentazione**"}, {n:"2.6", t:"**Rischio clinico** e incident reporting"},
  {n:"7.2", t:"**Lesioni da pressione**"}, {n:"12.5", t:"**Contratto** e patrocinio legale"}, {n:"12.7", t:"**Qualità**, PDCA e URP"}]},

{id:"s46", tipo:"icone", tema:"chiaro", sopratitolo:"Il punto di vista di chi lavora", voci:[
  {icona:"orologio", t:"Il tempo", d:"riconosciuto nei carichi di lavoro", key:true},
  {icona:"documento", t:"Schede strutturate"},
  {icona:"ingranaggio", t:"Cartella informatizzata", d:"ben progettata"}]},
{id:"s47", tipo:"frase", tema:"chiaro", sopratitolo:"Personale insufficiente, presidi che non arrivano",
  testo:"Segnalare le criticità organizzative è parte della **responsabilità professionale**.",
  sotto:"La tutela del professionista passa anche dall'organizzazione."},

{id:"s48", tipo:"titolo", tema:"profondo",
  titolo:"La cartella<br>**racconta la cura**.",
  sotto:"Va scritta in tempo, e mai riscritta dopo."},

{id:"s49", tipo:"tre", tema:"chiaro", sopratitolo:"Nella prossima lezione · chiudiamo il modulo 17 e il blocco dei casi clinici", box:[
  {n:"17", t:"Il riepilogo", d:"del modulo"},
  {n:"6", t:"Casi lampo", d:"etica e responsabilità", key:true}]},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione · 17.12",
  titolo:"Riepilogo<br>e casi lampo", sottotitolo:"Ciclo di vita, territorio, responsabilità",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
