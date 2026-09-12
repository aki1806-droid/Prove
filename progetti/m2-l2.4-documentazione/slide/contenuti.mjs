// Contenuto delle 50 scene della lezione 2.4. *accento*  **accento in semibold**

const OBIETTIVI = [
 {t:"**Natura giuridica e funzioni** della cartella", d:"e dove sta dentro quella infermieristica"},
 {t:"I **sette requisiti**", d:"di una corretta documentazione"},
 {t:"Come si **corregge** e come si **conserva**"},
 {t:"La **scheda unica di terapia**", d:"insieme un documento e una misura di sicurezza"},
];

const FUNZIONI = [
 {icona:"cuoremano", t:"Clinico-assistenziale", d:"consente a ciascuno di riprendere il filo"},
 {icona:"giudice", t:"Giuridica e probatoria", d:"è la prova di quello che è stato fatto"},
 {icona:"euro", t:"Gestionale", d:"DRG, tariffazione, controllo di gestione"},
 {icona:"libro", t:"Epidemiologica", d:"e di ricerca"},
 {icona:"cappello", t:"Formativa", d:"didattica e audit"},
 {icona:"scudo", t:"Tutela della persona", d:"il diritto di accesso ai propri dati", key:true},
];

const REQUISITI = [
 {n:"1", t:"**Veridicità** — si scrive ciò che è realmente accaduto"},
 {n:"2", t:"**Completezza** — anche le omissioni motivate e i rifiuti"},
 {n:"3", t:"**Chiarezza** — leggibile, abbreviazioni solo se ammesse"},
 {n:"4", t:"**Contestualità** — al momento, non a fine turno"},
 {n:"5", t:"**Tracciabilità** — data, ora, firma"},
 {n:"6", t:"**Pertinenza** — solo i dati necessari (minimizzazione)"},
 {n:"7", t:"**Oggettività** — si descrive, non si giudica"},
];

const MAI = [
 {t:"Mai **spazi bianchi** fra le annotazioni", d:"è lo spazio in cui qualcuno potrebbe inserire qualcosa dopo", no:true},
 {t:"Mai **firmare per altri**, mai condividere le credenziali", d:"la firma attesta chi ha eseguito", no:true},
 {t:"Mai **annotare in anticipo**", d:"è falso anche se poi la esegui davvero", no:true},
 {t:"Mai **abbreviazioni ambigue**", d:"fonte documentata di errore in terapia", no:true},
];

const PRESCRIZIONE = [
 ["**1**", "Identificazione della persona", ""],
 ["**2**", "Farmaco e forma farmaceutica", ""],
 ["**3**", "**Dose e unità di misura**", "qui nascono gli errori più gravi"],
 ["**4**", "**Via** di somministrazione", "una via errata può essere letale"],
 ["**5**", "Orario e frequenza", ""],
 ["**6**", "Data, ora e **firma del prescrittore**", "rende la prescrizione un atto imputabile"],
 ["**7**", "**Firma di chi somministra**", "chiude il ciclo"],
];

const MEMO = [
 {t:"La cartella clinica è **atto pubblico**, quella infermieristica ne è **parte integrante**"},
 {t:"**Sette requisiti** — contestualità e oggettività in evidenza"},
 {t:"Si corregge **senza cancellare**"},
 {t:"Mai annotazioni anticipate, mai firme per altri, mai spazi bianchi"},
 {t:"La **scheda unica** elimina le trascrizioni"},
 {t:"Documenta sempre **rifiuto, segnalazione, omissione motivata**"},
 {t:"Registra la **risposta della persona**, non solo l'attività"},
 {t:"**Ciò che non è documentato si presume non fatto**"},
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 2 · Metodologia, documentazione e sicurezza",
  titolo:"La documentazione<br>infermieristica", sottotitolo:"L'atto con cui l'assistenza diventa verificabile",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"citazione", tema:"chiaro", sopratitolo:"Dalla lezione 1.5",
  testo:"Ciò che non è documentato si presume non fatto.",
  fonte:"Oggi quella frase smette di essere un avvertimento e diventa un metodo"},

{id:"s03", tipo:"sostituzione", tema:"chiaro", sopratitolo:"Che cos'è davvero",
  da:{h:"Non è", t:"La **coda burocratica**<br>dell'assistenza"},
  a:{h:"È", t:"L'atto con cui l'assistenza<br>diventa **verificabile** — e difendibile"},
  sotto:"Senza documento, l'assistenza esiste solo nella memoria di chi l'ha fatta."},

{id:"s04", tipo:"tre", tema:"tenue", sopratitolo:"Perché rende più di quasi ogni altro argomento",
  box:[
   {n:"1", t:"Metodologia"},
   {n:"2", t:"Diritto"},
   {n:"3", t:"Sicurezza", key:true}],
  },

{id:"s05", tipo:"elenco", tema:"chiaro", sopratitolo:"Quattro blocchi", numerato:true,
  attive:[0,1], voci:OBIETTIVI},
{id:"s06", tipo:"elenco", tema:"chiaro", sopratitolo:"Quattro blocchi", numerato:true,
  voci:OBIETTIVI},

{id:"s07", tipo:"norma", tema:"chiaro", sopratitolo:"La natura giuridica",
  etichetta:"Cartella clinica", sigla:"Atto pubblico",
  testo:"Redatta da un **pubblico ufficiale** o da un **incaricato di pubblico servizio** nell'esercizio delle funzioni."},

{id:"s08", tipo:"frase", tema:"chiaro", sopratitolo:"La formula esatta, e conta",
  testo:"**Fa fede fino a querela di falso** di quanto il redattore attesta essere avvenuto **in sua presenza**."},

{id:"s09", tipo:"titolo", tema:"profondo",
  titolo:"Per contestarla non basta<br>dire che è sbagliata:<br>serve un **procedimento penale**.",
  sotto:"È la forza probatoria più alta che un documento possa avere."},

{id:"s10", tipo:"confronto", tema:"chiaro", sopratitolo:"Due conseguenze, le due facce della stessa medaglia",
  col:[
   {h:"Se scrivi il falso", t:"**Falso in atto pubblico**<br><em>artt. 476 e ss. c.p.</em>"},
   {h:"Se non scrivi", t:"Ciò che non compare<br>si presume **non eseguito**"}]},

{id:"s11", tipo:"titolo", tema:"chiaro", sopratitolo:"Come leggerla",
  titolo:"Protegge chi documenta bene.<br>Espone chi documenta male.",
  sotto:"Non è un adempimento contro di te: è la tua prova — e a distanza di anni l'unica che avrai."},

{id:"s12", tipo:"icone", tema:"chiaro", sopratitolo:"Le sei funzioni della cartella",
  attive:[0,1,2], voci:FUNZIONI},
{id:"s13", tipo:"icone", tema:"chiaro", sopratitolo:"Le sei funzioni della cartella",
  voci:FUNZIONI},

{id:"s14", tipo:"titolo", tema:"chiaro", sopratitolo:"Perché i requisiti sono così rigidi",
  titolo:"Un solo documento<br>deve servire a **sei scopi** —<br>alcuni a distanza di anni."},

{id:"s15", tipo:"venn", tema:"chiaro", sopratitolo:"Dove sta la cartella infermieristica",
  sx:{t:"Cartella clinica", d:"l'**atto pubblico** dell'episodio di ricovero"},
  dx:{t:"Cartella infermieristica", d:"non un allegato, non un **quaderno di reparto**"},
  centro:"È **parte integrante**: stessa natura, stessi requisiti"},

{id:"s16", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, attive:[0,1,2,3],
  sopratitolo:"La struttura segue le cinque fasi del processo",
  celle:[
   {n:"1", t:"**Accertamento** all'ingresso"},
   {n:"2", t:"**Scale** con le rivalutazioni"},
   {n:"3", t:"**Problemi o diagnosi** — data di apertura *e di chiusura*"},
   {n:"4", t:"**Obiettivi** e pianificazione"},
   {n:"5", t:"**Diario**"},
   {n:"6", t:"**Scheda terapeutica unica**"},
   {n:"7", t:"**Schede specifiche** — bilancio idrico, medicazioni, glicemie, contenzione"},
   {n:"8", t:"**Educazione e continuità** — la lettera di dimissione"}]},
{id:"s17", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false,
  sopratitolo:"La struttura segue le cinque fasi del processo",
  celle:[
   {n:"1", t:"**Accertamento** all'ingresso"},
   {n:"2", t:"**Scale** con le rivalutazioni"},
   {n:"3", t:"**Problemi o diagnosi** — data di apertura *e di chiusura*"},
   {n:"4", t:"**Obiettivi** e pianificazione"},
   {n:"5", t:"**Diario**"},
   {n:"6", t:"**Scheda terapeutica unica**"},
   {n:"7", t:"**Schede specifiche** — bilancio idrico, medicazioni, glicemie, contenzione"},
   {n:"8", t:"**Educazione e continuità** — la lettera di dimissione"}]},

{id:"s18", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, attive:[0,1,2],
  sopratitolo:"I sette requisiti", celle:REQUISITI},
{id:"s19", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, attive:[0,1,2,3,4],
  sopratitolo:"I sette requisiti", celle:REQUISITI},
{id:"s20", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false,
  sopratitolo:"I sette requisiti", celle:REQUISITI},

{id:"s21", tipo:"sostituzione", tema:"chiaro", sopratitolo:"L'oggettività, che si vede subito in una prova scritta",
  da:{h:"Giudizio", t:"«Paziente<br>**maleducato**»"},
  a:{h:"Dato", t:"«**Rifiuta l'igiene** e alza la voce<br>quando gli viene proposta»"}},

{id:"s22", tipo:"titolo", tema:"tenue", sopratitolo:"Stessa scena",
  titolo:"Due documenti<br>con valore<br>**completamente diverso**."},

{id:"s23", tipo:"icone", tema:"chiaro", sopratitolo:"Le tre annotazioni che proteggono chi le scrive",
  voci:[
   {icona:"divieto", t:"Il rifiuto", d:"con l'informazione data sulle conseguenze"},
   {icona:"orologio", t:"La segnalazione", d:"al medico o al coordinatore, **con l'orario**"},
   {icona:"documento", t:"L'omissione motivata", d:"perché un intervento programmato non è stato eseguito", key:true}]},

{id:"s24", tipo:"confronto", tema:"chiaro", sopratitolo:"Perché l'omissione motivata conta",
  col:[
   {h:"Saltato e spiegato", t:"è una **scelta**", grande:true},
   {h:"Saltato e muto", t:"è una **mancanza**", grande:true}]},

{id:"s25", tipo:"titolo", tema:"chiaro", sopratitolo:"Le tre che in giudizio pesano di più",
  titolo:"Chi le scrive tutte e tre<br>ha già risposto alle domande<br>che gli verrebbero fatte dopo."},

{id:"s26", tipo:"catena", tema:"chiaro", sopratitolo:"Correggere · la sequenza",
  passi:[
   {t:"Una riga singola", d:"sul dato errato"},
   {t:"Il dato resta leggibile", d:"è parte della storia del documento"},
   {t:"Il dato corretto accanto", d:"con **data, ora e firma**", key:true}]},

{id:"s27", tipo:"griglia", tema:"chiaro", colonne:2, sopratitolo:"Quello che non si fa mai",
  celle:[
   {t:"**Correttore**", no:true}, {t:"**Cancellature**", no:true},
   {t:"**Sovrascritture**", no:true}, {t:"**Fogli strappati**", no:true}]},

{id:"s28", tipo:"titolo", tema:"profondo",
  titolo:"Cancellare sposta il sospetto<br>dall'**errore** all'**occultamento**.",
  sotto:"Un errore corretto correttamente è un errore; un errore cancellato sembra qualcos'altro."},

{id:"s29", tipo:"griglia", tema:"chiaro", colonne:1, attive:[0,1],
  sopratitolo:"I quattro «mai»", celle:MAI},
{id:"s30", tipo:"griglia", tema:"chiaro", colonne:1, attive:[0,1,2],
  sopratitolo:"I quattro «mai»", celle:MAI},
{id:"s31", tipo:"griglia", tema:"chiaro", colonne:1,
  sopratitolo:"I quattro «mai» — nessuno ammette eccezioni", celle:MAI},

{id:"s32", tipo:"catena", tema:"chiaro", sopratitolo:"La scheda unica di terapia · un solo supporto",
  passi:[
   {t:"Prescrizione"}, {t:"Preparazione"}, {t:"Somministrazione", key:true}]},

{id:"s33", tipo:"titolo", tema:"chiaro", sopratitolo:"Perché non è un modulo in più",
  titolo:"La **trascrizione manuale**<br>da un supporto a un altro<br>è uno dei punti di maggior rischio.",
  sotto:"La scheda unica la elimina."},

{id:"s34", tipo:"tabella", tema:"chiaro", sopratitolo:"I sette elementi della prescrizione · 1",
  intestazioni:["","Elemento","Perché"], colonne:["8%","44%","48%"], chiave:[2,3],
  righe:PRESCRIZIONE.slice(0,5)},
{id:"s35", tipo:"tabella", tema:"chiaro", sopratitolo:"I sette elementi della prescrizione · 2",
  intestazioni:["","Elemento","Perché"], colonne:["8%","44%","48%"], chiave:[0,1],
  righe:PRESCRIZIONE.slice(5)},

{id:"s36", tipo:"titolo", tema:"chiaro", sopratitolo:"E la conseguenza",
  titolo:"Se ne manca uno<br>la prescrizione **non è completa** —<br>e non si esegue."},

{id:"s37", tipo:"catena", tema:"chiaro", sopratitolo:"Prescrizione incompleta o illeggibile",
  passi:[
   {t:"Chiedo chiarimento", d:"al prescrittore"},
   {t:"Se il dubbio permane", d:"**non do corso**"},
   {t:"Documento", d:"il dubbio e la richiesta", key:true}]},

{id:"s38", tipo:"titolo", tema:"tenue", sopratitolo:"La stessa risposta di 1.2, 1.4 e 1.5",
  titolo:"Tre lezioni diverse,<br>un'unica risposta.",
  sotto:"È il segno che il corso ha una spina dorsale."},

{id:"s39", tipo:"tabella", tema:"chiaro", sopratitolo:"I modelli di registrazione",
  intestazioni:["Modello","Che cos'è","Il limite"], colonne:["22%","44%","34%"],
  righe:[
   ["**Narrativo**","cronologico, in ordine di ora","disperde le informazioni su uno stesso problema"],
   ["**POMR**","orientato per problemi","richiede una lista dei problemi tenuta aggiornata"],
   ["**SOAP / SOAPIE**","soggettivo, oggettivo, analisi, piano — poi interventi e valutazione","più lungo da compilare"],
   ["**Focus DAR**","dato, azione, risposta","—"],
   ["**Per eccezione**","solo ciò che si discosta dallo standard","ciò che non è scritto vale come *conforme*"]]},

{id:"s40", tipo:"tre", tema:"chiaro", sopratitolo:"Focus DAR · perché va bene per le cartelle elettroniche", cifre:true,
  box:[
   {n:"D", t:"Dato"}, {n:"A", t:"Azione"}, {n:"R", t:"Risposta", key:true}]},

{id:"s41", tipo:"trappola", tema:"chiaro", sopratitolo:"Il rischio della registrazione per eccezione",
  righe:[
   {sb:"«Non c'è scritto niente, quindi era tutto normale»",
    ok:"Vale solo se **tutti sanno** a che cosa lo standard si riferisce"}]},

{id:"s42", tipo:"titolo", tema:"chiaro", sopratitolo:"L'elemento che non può mancare, qualunque modello",
  titolo:"La **risposta della persona**.",
  sotto:"È ciò che trasforma l'annotazione da elenco di attività a documentazione di un processo."},

{id:"s43", tipo:"sostituzione", tema:"chiaro", sopratitolo:"In una riga, tutte e cinque le fasi",
  da:{h:"Non documenta nulla", t:"«**Somministrata terapia**»"},
  a:{h:"Documenta un processo", t:"«Somministrato **paracetamolo 1 g ev** per **NRS 7**;<br>rivalutato dopo **45 minuti**: **NRS 3**»"}},

{id:"s44", tipo:"griglia", tema:"profondo", colonne:1, spunta:false,
  sopratitolo:"Che cosa dice quella riga",
  celle:[
   {n:"1", t:"**Intervento** — paracetamolo 1 g ev"},
   {n:"2", t:"**Motivo** — NRS 7"},
   {n:"3", t:"**Rivalutazione** — dopo 45 minuti"},
   {n:"4", t:"**Esito** — NRS 3"}]},

{id:"s45", tipo:"norma", tema:"chiaro", sopratitolo:"Conservazione e accesso",
  etichetta:"Conservazione", sigla:"Illimitata",
  testo:"È **atto ufficiale sanitario**. La **legge 24/2017** impone di renderla disponibile entro termini definiti su richiesta dell'interessato."},

{id:"s46", tipo:"icone", tema:"chiaro", sopratitolo:"La cartella elettronica · gli stessi requisiti, più quattro",
  voci:[
   {icona:"lucchetto", t:"Credenziali personali"},
   {icona:"occhio", t:"Tracciamento degli accessi"},
   {icona:"cartella", t:"Versionamento"},
   {icona:"certificato", t:"Firma elettronica", key:true}]},

{id:"s47", tipo:"albero", tema:"chiaro", sopratitolo:"La domanda d'orale che quasi nessuno prepara",
  radice:"**Il sistema si blocca.** E adesso?",
  rami:[
   {cond:"subito", esito:"si registra sul **supporto cartaceo predefinito**", key:true},
   {cond:"al ripristino", esito:"**riversamento tracciato** nel sistema"},
   {cond:"sempre", esito:"è la **continuità operativa**, prevista dalla procedura"}]},

{id:"s48", tipo:"griglia", tema:"chiaro", colonne:1, attive:[0,1,2,3],
  sopratitolo:"Il memo", celle:MEMO},
{id:"s49", tipo:"griglia", tema:"chiaro", colonne:1,
  sopratitolo:"Il memo", celle:MEMO},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione",
  titolo:"2.5", sottotitolo:"EBP, linee guida,<br>PDTA e procedure",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
