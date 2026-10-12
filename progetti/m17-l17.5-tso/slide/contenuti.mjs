// Contenuto delle 50 scene della lezione 17.5 — l'agitazione psicomotoria e
// il TSO. Il caso di Davide in pronto soccorso: la sicurezza prima di tutto,
// la de-escalation, le cause organiche, i farmaci e la sorveglianza, la
// contenzione come misura estrema; il TSO con i tre requisiti e la procedura
// a tappe (come chiedono le note di produzione: schema a frecce con i tempi);
// errori in tabella; la risposta modello un promemoria riga per riga.
// Nessuna immagine di contenzione o di violenza: illustrazioni neutre.

const LEZIONI = [
  {n:"1.6", t:"Consenso", illu:"quaderno"},
  {n:"2.7", t:"De-escalation", illu:"dialogo"},
  {n:"3.1", t:"Contenzione", illu:"sponde"},
  {n:"11.3", t:"Salute mentale e TSO", illu:"ascolto"},
  {n:"12.6", t:"Sicurezza degli operatori", illu:"scudo"}];

const REQUISITI = {tipo:"tre", tema:"chiaro", box:[
  {n:"1", t:"Alterazioni psichiche", d:"tali da richiedere **urgenti** interventi terapeutici"},
  {n:"2", t:"Rifiuto", d:"degli interventi", key:true},
  {n:"3", t:"Impossibilità", d:"di tempestive e idonee misure **extraospedaliere**"}]};

const PROCEDURA = (att) => ({tipo:"percorso", tema:"chiaro", attive:att, tappe:[
  {t:"Proposta motivata", d:"di un medico"},
  {t:"Convalida", d:"di un medico della struttura pubblica"},
  {t:"Ordinanza", d:"del sindaco"},
  {t:"Giudice tutelare", d:"notifica entro 48 ore"},
  {t:"Convalida", d:"entro le 48 ore successive", key:true}]});

const RISPOSTA = (att) => ({tipo:"memo", tema:"chiaro", attive:att, voci:[
  "**Inquadramento**: agitazione, insonnia, idee di persecuzione, rifiuto delle cure → priorità alla **sicurezza** di tutti",
  "Ambiente tranquillo · via d'uscita libera · colleghi avvisati · vigilanza disponibile",
  "**De-escalation**: un solo interlocutore, tono calmo, ascolto, scelte · deliri non contraddetti",
  "Esclusione delle **cause organiche**",
  "Terapia prima **per bocca** · dopo l'IM: sedazione, respiro, pressione, **distonie**",
  "**Contenzione** solo come misura estrema",
  "**TSO**: requisiti e procedura · informo, tutelo dignità e diritti · genitori · consegne all'SPDC"]});

const ERRORI_INTESTAZIONI = ["Errore", "Invece"];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 17 · Casi clinici avanzati",
  titolo:"L'agitazione psicomotoria<br>e il TSO", sottotitolo:"17.5 · Sicurezza, de-escalation, cause organiche, regole del TSO",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"percorso", tema:"chiaro", sopratitolo:"Micro-lezione 5 di 12 · un giovane uomo molto agitato, in pronto soccorso con i genitori", attive:[0,1,2], tappe:[
  {t:"La sicurezza", d:"degli operatori", key:true}, {t:"La de-escalation"}, {t:"Le cause organiche"},
  {t:"I farmaci", d:"e la sorveglianza"}, {t:"Il TSO", d:"le regole"}]},
{id:"s03", tipo:"anello", tema:"chiaro", sopratitolo:"Farmaci, sorveglianza, regole del TSO · i collegamenti",
  centro:"17.5", sotto:"chieste dai concorsi con precisione", voci:LEZIONI},

{id:"s04", tipo:"cifre", tema:"chiaro", sopratitolo:"Lo scenario · Davide, accompagnato dai genitori · convinto di essere spiato attraverso il telefono", voci:[
  {n:"26", suf:"anni", t:"in pronto soccorso"},
  {n:"21:00", t:"l'arrivo"},
  {n:"5", suf:"giorni", t:"senza dormire", key:true}]},
{id:"s05", tipo:"citazione", tema:"chiaro", sopratitolo:"Ha distrutto oggetti in casa · cammina avanti e indietro · alza la voce",
  testo:"«Voi siete **d'accordo con loro**.»", fonte:"Davide, che rifiuta di farsi visitare"},
{id:"s06", tipo:"pausa", tema:"chiaro", sopratitolo:"I genitori: uso di cannabis · nessun precedente psichiatrico noto", es:"metti in pausa",
  testo:"Qual è la **prima cosa** a cui pensi, prima ancora del paziente?",
  dati:["26 anni", "5 giorni senza dormire", "si crede spiato", "cannabis"]},

{id:"s07", tipo:"raggiera", tema:"chiaro", sopratitolo:"La prima cosa · un ambiente tranquillo, lontano dalla sala d'attesa affollata", centro:"Sicurezza",
  raggi:[{t:"Paziente"}, {t:"Operatori", key:true}, {t:"Altri pazienti"}]},
{id:"s08", tipo:"griglia", tema:"chiaro", colonne:2, sopratitolo:"L'ambiente e la posizione", celle:[
  {t:"Oggetti potenzialmente pericolosi: **rimossi**"}, {t:"Una **via d'uscita libera** per l'operatore"},
  {no:true, t:"Mettersi fra il paziente e **la porta**"}, {t:"Una **distanza** adeguata"}]},
{id:"s09", tipo:"icone", tema:"chiaro", sopratitolo:"Non si resta soli", voci:[
  {icona:"persone", t:"Colleghi", d:"avvisati"},
  {icona:"scudo", t:"Vigilanza", d:"disponibile secondo procedura"},
  {icona:"documento", t:"Raccomandazione 8", d:"prevenzione degli atti di violenza contro gli operatori", key:true}]},

{id:"s10", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"La de-escalation · lezione 2.7", celle:[
  {n:"1", t:"**Un solo** interlocutore: più voci aumentano la confusione"}, {n:"2", t:"Tono **calmo** e basso"},
  {n:"3", t:"Frasi **brevi**"}, {n:"4", t:"Postura **aperta**"}, {n:"5", t:"Mani **visibili**"}]},
{id:"s11", tipo:"sostituzione", tema:"chiaro", sopratitolo:"Presentarsi, chiamarlo per nome · riconoscere l'emozione: «vedo che è molto spaventato»",
  da:{h:"Il delirio", t:"contraddirlo o assecondarlo"}, a:{h:"Il bisogno", t:"«qui è al sicuro»"},
  sotto:"Si risponde al **bisogno** che i contenuti deliranti esprimono."},
{id:"s12", tipo:"percorso", tema:"chiaro", sopratitolo:"Offrire scelte, non promesse", tappe:[
  {t:"Scelte semplici", d:"dove sedersi, un bicchiere d'acqua"},
  {t:"Niente promesse", d:"impossibili"},
  {t:"Lo spazio personale", d:"rispettato"},
  {t:"Dieci minuti dopo", d:"si siede, e si fa misurare la pressione", key:true}]},

{id:"s13", tipo:"frase", tema:"chiaro", sopratitolo:"Escludere le cause organiche · un passaggio che i concorsi vogliono vedere",
  testo:"Un'agitazione con sintomi psicotici **non è automaticamente** psichiatrica."},
{id:"s14", tipo:"griglia", tema:"chiaro", colonne:3, sopratitolo:"Che cosa può causarla", celle:[
  {t:"**Ipoglicemia**"}, {t:"**Ipossia**"}, {t:"Febbre e **infezioni**: un'encefalite"},
  {t:"**Trauma** cranico"}, {t:"**Intossicazioni**: cocaina, amfetamine, cannabinoidi sintetici"},
  {t:"**Astinenze**: alcol, benzodiazepine"}]},
{id:"s15", tipo:"cifre", tema:"chiaro", sopratitolo:"E la tiroide, l'epilessia · parametri, glicemia, temperatura, saturazione · gli esami li valuta il medico", voci:[
  {n:"98", t:"la glicemia di Davide", key:true},
  {n:"Norma", t:"i parametri", d:"esame tossicologico secondo indicazione"}]},

{id:"s16", tipo:"bivio", tema:"chiaro", sopratitolo:"I farmaci, sempre secondo prescrizione", radice:"La terapia prescritta", rami:[
  {q:"prima", t:"Offerta per bocca", d:"accettarla è una scelta del paziente: rafforza l'alleanza", key:true},
  {q:"se necessario", t:"Intramuscolare"}]},
{id:"s17", tipo:"griglia", tema:"chiaro", colonne:3, sopratitolo:"Dopo la somministrazione · la sorveglianza", celle:[
  {t:"Livello di **sedazione**"}, {t:"Frequenza **respiratoria**"}, {t:"**Saturazione**"},
  {t:"**Pressione**"}, {t:"**ECG** se indicato: alcuni antipsicotici allungano il QT"}, {t:"**Idratazione**"}]},
{id:"s18", tipo:"figura", tema:"chiaro", illu:"occhio", sopratitolo:"Un effetto collaterale da riconoscere",
  titolo:"La **distonia acuta**.", sotto:"Torcicollo, occhi rivolti verso l'alto, contrazioni della lingua. Spaventa molto: segnalarla subito · anticolinergici secondo prescrizione."},

{id:"s19", tipo:"tre", tema:"chiaro", sopratitolo:"La contenzione · i principi della lezione 3.1 · una misura estrema ed eccezionale", box:[
  {n:"Quando", t:"Ogni alternativa è fallita"}, {n:"Perché", t:"Un pericolo grave e attuale", key:true}, {n:"Quanto", t:"Il tempo strettamente necessario"}]},
{id:"s20", tipo:"griglia", tema:"chiaro", colonne:4, sopratitolo:"Prescrizione medica · tecnica sicura, personale formato e sufficiente · monitoraggio ravvicinato", celle:[
  {t:"Parametri"}, {t:"Respiro"}, {t:"Circolazione degli arti"}, {t:"Cute"},
  {t:"Idratazione"}, {t:"Bisogni fisiologici"}, {t:"**Dignità**"}]},
{id:"s21", tipo:"percorso", tema:"chiaro", sopratitolo:"Molti servizi lavorano per non usarla mai", tappe:[
  {t:"Rivalutare", d:"di continuo"}, {t:"Rimuovere", d:"appena possibile"}, {t:"Documentare", d:"tutto"},
  {t:"Davide", d:"la de-escalation ha funzionato: non è servita", key:true}]},

{id:"s22", tipo:"tre", tema:"chiaro", sopratitolo:"Il rifiuto delle cure", box:[
  {n:"Lo psichiatra", t:"Quadro psicotico acuto", d:"con necessità di cure urgenti"},
  {n:"Davide", t:"Rifiuta il ricovero", key:true},
  {n:"Si cerca ancora", t:"Il consenso", d:"spiegazioni, tempo, i genitori"}]},
{id:"s23", tipo:"bivio", tema:"chiaro", sopratitolo:"Il ricovero volontario resta sempre la prima scelta", radice:"Davanti al rifiuto", rami:[
  {q:"accetta", t:"Ricovero volontario", d:"la prima scelta"},
  {q:"il rifiuto persiste, con i requisiti di legge", t:"Trattamento sanitario obbligatorio", key:true}]},

{id:"s24", tipo:"norma", tema:"chiaro", sopratitolo:"Il TSO · lezione 11.3", etichetta:"Legge · articoli 33, 34 e 35", sigla:"833/1978",
  testo:"Il trattamento sanitario **obbligatorio**."},
{id:"s25", sopratitolo:"Tre requisiti, tutti insieme", ...REQUISITI},
{id:"s26", sopratitolo:"La procedura · ogni passaggio è una garanzia", ...PROCEDURA([0,1,2,3,4])},
{id:"s27", tipo:"trappola", tema:"chiaro", sopratitolo:"Sette giorni, prorogabili, nell'SPDC · e ricorda", righe:[
  {sb:"La pericolosità è un requisito", ok:"Non lo è: il TSO è un atto di **cura**, non di ordine pubblico"}]},

{id:"s28", tipo:"confronto", tema:"chiaro", sopratitolo:"Il ruolo dell'infermiere nel TSO", col:[
  {h:"Non lo decide", t:"collabora nella gestione clinica e nella **sicurezza**"},
  {h:"Informa il paziente", t:"in modo **chiaro** e **rispettoso**, anche se sembra non ascoltare", grande:true}]},
{id:"s29", tipo:"icone", tema:"chiaro", sopratitolo:"Dignità, riservatezza e diritti", voci:[
  {icona:"lucchetto", t:"Riservatezza", d:"nessuna esposizione davanti ad altri", key:true},
  {icona:"telefono", t:"Comunicare", d:"con chi ritiene opportuno"},
  {icona:"giudice", t:"Ricorso"},
  {icona:"chat", t:"Informazioni"}]},
{id:"s30", tipo:"griglia", tema:"chiaro", colonne:1, sopratitolo:"E ancora", celle:[
  {t:"**Documenta** comportamenti, interventi e terapia"},
  {t:"Cerca la **partecipazione** del paziente, anche durante il trattamento obbligatorio"},
  {t:"Consegne **complete** all'SPDC"}]},

{id:"s31", tipo:"norma", tema:"chiaro", sopratitolo:"Approfondimento · le situazioni che i candidati confondono", etichetta:"Accertamento sanitario obbligatorio", sigla:"ASO",
  testo:"Per **valutare** chi rifiuta la visita: procedura analoga, **senza ricovero**."},
{id:"s32", tipo:"bivio", tema:"chiaro", sopratitolo:"Esiste anche il TSO extraospedaliero, quando non serve la degenza", radice:"Rifiuta le cure", rami:[
  {q:"alterazioni psichiche, requisiti di legge", t:"TSO", d:"in degenza o extraospedaliero"},
  {q:"paziente non psichiatrico · es. appendicite", t:"Niente TSO", d:"si valuta la capacità di decidere", key:true}]},
{id:"s33", tipo:"bivio", tema:"chiaro", sopratitolo:"La capacità di decidere", radice:"Il paziente che rifiuta", rami:[
  {q:"è capace", t:"Il rifiuto si rispetta", d:"dopo un'informazione completa · legge 219 (lezione 1.6)", key:true},
  {q:"non è capace, in emergenza", t:"Le cure indispensabili", d:"stato di necessità"}]},
{id:"s34", tipo:"figura", tema:"chiaro", illu:"bilancia", sopratitolo:"E se c'è",
  titolo:"Un **amministratore di sostegno**.", sotto:"Lo si coinvolge secondo i poteri che gli sono attribuiti."},

{id:"s35", tipo:"raggiera", tema:"chiaro", sopratitolo:"I genitori · informazioni chiare, nei limiti della riservatezza e del consenso del figlio, maggiorenne", centro:"Insieme",
  raggi:[{t:"Spavento"}, {t:"Colpa"}, {t:"Sollievo"}, {t:"Rabbia"}]},
{id:"s36", tipo:"icone", tema:"chiaro", sopratitolo:"Che cosa si dice ai genitori", voci:[
  {icona:"cuoremano", t:"Un atto di cura", d:"il TSO, spiegato", key:true},
  {icona:"casa", t:"CSM", d:"e associazioni dei familiari"},
  {icona:"chat", t:"Cannabis e psicosi", d:"senza colpevolizzare"},
  {icona:"ospedale", t:"SerD", d:"se indicato"}]},

{id:"s37", tipo:"tabella", tema:"chiaro", sopratitolo:"Gli errori da evitare · l'agitazione", colonne:["55%","45%"],
  intestazioni:ERRORI_INTESTAZIONI, righe:[
  ["no:Da soli, o in tanti che parlano insieme", "**un solo** interlocutore, colleghi vicini"],
  ["no:Contraddire i deliri, discutere", "rispondere al **bisogno**"],
  ["no:«È psichiatrico», senza escludere altro", "le **cause organiche**"]], chiave:[2]},
{id:"s38", tipo:"tabella", tema:"chiaro", sopratitolo:"Gli errori da evitare · farmaci, contenzione, TSO", colonne:["55%","45%"],
  intestazioni:ERRORI_INTESTAZIONI, righe:[
  ["no:Farmaci senza sorvegliare respiro e pressione", "**sorveglianza** dopo la dose"],
  ["no:Non riconoscere una distonia acuta", "segnalarla **subito**"],
  ["no:La contenzione come prima risposta", "misura **estrema**"],
  ["no:Il TSO come provvedimento di sicurezza", "un atto di **cura**"],
  ["no:La pericolosità come requisito", "**non** lo è"]], chiave:[4]},

{id:"s39", sopratitolo:"D1 · «Quali sono i requisiti e la procedura del TSO?» · tre requisiti insieme", ...REQUISITI},
{id:"s40", sopratitolo:"D1 · la procedura · poi sette giorni, nell'SPDC", ...PROCEDURA([0,1,2,3,4])},
{id:"s41", tipo:"catena", tema:"chiaro", sopratitolo:"D2 · «Come gestisce un paziente con agitazione psicomotoria?»", passi:[
  {t:"**Sicurezza**"}, {t:"**De-escalation**"}, {t:"Cause **organiche**", d:"escluse"},
  {t:"Terapia **per bocca**", d:"offerta prima"}, {t:"Contenzione", d:"solo come misura estrema", key:true}]},
{id:"s42", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"D3 · «Che cosa sorveglia dopo un antipsicotico per via intramuscolare?»", celle:[
  {n:"1", t:"**Sedazione**"}, {n:"2", t:"Frequenza **respiratoria**"}, {n:"3", t:"**Saturazione**"},
  {n:"4", t:"**Pressione**"}, {n:"5", t:"**ECG** se indicato"}, {n:"6", t:"Segni di **distonia** acuta"}]},

{id:"s43", sopratitolo:"La risposta modello, in 15 righe", ...RISPOSTA([0,1])},
{id:"s44", sopratitolo:"La risposta modello · la de-escalation", ...RISPOSTA([0,1,2,3])},
{id:"s45", sopratitolo:"La risposta modello · i farmaci", ...RISPOSTA([0,1,2,3,4,5])},
{id:"s46", sopratitolo:"La risposta modello · il TSO", ...RISPOSTA([0,1,2,3,4,5,6])},

{id:"s47", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"I collegamenti", celle:[
  {n:"1.6", t:"Consenso e legge 219/2017"}, {n:"2.7", t:"De-escalation"}, {n:"3.1", t:"Contenzione"},
  {n:"11.3", t:"Salute mentale, TSO, ASO"}, {n:"12.6", t:"Aggressioni e sicurezza degli operatori"}, {n:"17.6", t:"Dipendenze e SerD"}]},

{id:"s48", tipo:"frase", tema:"profondo", sopratitolo:"La frase del caso",
  testo:"La de-escalation è una tecnica, il TSO è una procedura, il **rispetto** è la condizione di entrambi."},

{id:"s49", tipo:"tre", tema:"chiaro", sopratitolo:"Nella prossima lezione · le dipendenze · un paziente in metadone, in chirurgia, che di notte va in astinenza", box:[
  {n:"1", t:"Pregiudizi"}, {n:"2", t:"Continuità della terapia", key:true}, {n:"3", t:"Dolore"}, {n:"4", t:"Sicurezza"}]},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione · 17.6",
  titolo:"Il paziente in terapia<br>sostitutiva per oppioidi", sottotitolo:"Astinenza, continuità della terapia, dolore e sicurezza",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
