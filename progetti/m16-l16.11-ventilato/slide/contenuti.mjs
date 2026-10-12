// Contenuto delle 50 scene della lezione 16.11 — il paziente ventilato in
// terapia intensiva. DOPE è una griglia che si accende lettera per lettera; il
// bundle VAP il meccanismo della microaspirazione, la cuffia e la griglia delle
// misure; la RASS tre gradini; il bundle ABCDEF un percorso a sei tappe; la
// risposta modello una citazione e tre tabelle.

const LEZIONI = [
  {n:"3.1", t:"Bundle VAP", illu:"bocca"},
  {n:"6.2", t:"Catetere centrale", illu:"cvc"},
  {n:"7.2", t:"Lesioni", illu:"tallone"},
  {n:"10.5", t:"Vie aeree e ventilazione", illu:"polmoni"},
  {n:"11.1", t:"Delirium", illu:"orologio"}];

const DOPE = (att, k) => ({tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, attive:att, celle:[
  {n:"D", t:"**Dislocazione** · i centimetri all'arcata dentaria sono quelli annotati?", key:k===0},
  {n:"O", t:"**Ostruzione** · tubo morso, secrezioni, piegatura", key:k===1},
  {n:"P", t:"**Pneumotorace** · espansione asimmetrica, murmure assente da un lato", key:k===2},
  {n:"E", t:"**Equipaggiamento** · ventilatore, circuito, ossigeno", key:k===3}]});

const BUNDLE = att => ({tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, attive:att, celle:[
  {t:"Testata a **30–45°**, sempre"}, {t:"Igiene del **cavo orale** regolare"},
  {t:"Cuffia a **20–30 cmH₂O**, con il manometro"}, {t:"Aspirazione **sottoglottica**, se il tubo lo consente"},
  {t:"Riduzione **quotidiana** della sedazione"}, {t:"Valutazione quotidiana dello **svezzamento**"},
  {t:"Circuito cambiato **solo** se sporco o danneggiato"}, {t:"Igiene delle **mani**, aspirazione asettica"}]});

const ABCDEF = (att, k) => ({tipo:"percorso", tema:"chiaro", attive:att, tappe:[
  {t:"A · Dolore", d:"valutare, prevenire, trattare", key:k===0},
  {t:"B · Risveglio e respiro", d:"prove quotidiane, respiro spontaneo", key:k===1},
  {t:"C · Scelta", d:"ragionata di analgesia e sedazione", key:k===2},
  {t:"D · Delirium", d:"valutazione, prevenzione, gestione", key:k===3},
  {t:"E · Mobilizzazione", d:"precoce, anche nel ventilato, quando è sicura", key:k===4},
  {t:"F · Famiglia", d:"coinvolgimento e presenza", key:k===5}]});

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 16 · Casi clinici avanzati",
  titolo:"Il paziente<br>ventilato", sottotitolo:"16.11 · In terapia intensiva",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"tre", tema:"chiaro", sopratitolo:"Micro-lezione 11 di 12 · in terapia intensiva", box:[
  {n:"1", t:"Tecnologie complesse"},
  {n:"2", t:"Una persona che non può parlare", key:true},
  {n:"3", t:"Una giornata intera", d:"non un'unica emergenza"}]},
{id:"s03", tipo:"anello", tema:"chiaro", sopratitolo:"La VAP, la sedazione, il dolore, il delirium, la famiglia · le lezioni",
  centro:"16.11", sotto:"il paziente ventilato", voci:LEZIONI},

{id:"s04", tipo:"cifre", tema:"chiaro", sopratitolo:"Lo scenario · insufficienza respiratoria grave da polmonite", voci:[
  {n:"66", t:"anni", d:"il signor Renato"},
  {n:"4", t:"giorni", d:"in terapia intensiva", key:true}]},
{id:"s05", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Che cosa ha addosso", celle:[
  {t:"**Intubato e ventilato** · modalità controllata"}, {t:"**Sedazione e analgesia** in infusione continua"},
  {t:"Catetere venoso **centrale**"}, {t:"Catetere **arterioso**"},
  {t:"Sondino con **nutrizione enterale**"}, {t:"Catetere **vescicale**"}]},
{id:"s06", tipo:"pausa", tema:"chiaro", sopratitolo:"Ore 10 · allarme di alta pressione", es:"metti in pausa",
  testo:"La saturazione scende da **95 a 85%**, il paziente si agita e **morde il tubo**. Con quale **acronimo** affronti la situazione?",
  dati:["alta pressione", "SpO₂ 95 → 85%", "morde il tubo"]},

{id:"s07", sopratitolo:"L'acronimo DOPE · lezione 10.5", ...DOPE([0,1], 1)},
{id:"s08", sopratitolo:"Nel dubbio: staccare e ventilare con il pallone", ...DOPE([0,1,2,3], 3)},
{id:"s09", tipo:"catena", tema:"chiaro", sopratitolo:"Qui · in meno di due minuti, con un metodo", passi:[
  {t:"Tubo **morso**, secrezioni"}, {t:"**Blocco-morso**"}, {t:"**Aspirazione**"},
  {t:"Sedazione", d:"con il medico"}, {t:"SpO₂ **95%**", key:true}]},

{id:"s10", tipo:"vap", tema:"chiaro", sopratitolo:"La prevenzione della polmonite associata alla ventilazione",
  titolo:"Il bundle VAP", sotto:"Lezione 3.1, secondo protocollo · testata a **30–45°**, sempre · igiene del cavo orale regolare"},
{id:"s11", sopratitolo:"La cuffia, con il manometro · l'aspirazione sottoglottica · le mani", ...BUNDLE([0,1,2,3,7])},
{id:"s12", sopratitolo:"Ogni giorno di ventilazione in meno è un rischio in meno", ...BUNDLE([0,1,2,3,4,5,6,7])},

{id:"s13", tipo:"sostituzione", tema:"chiaro", sopratitolo:"Il dolore in chi non può parlare",
  da:{h:"Non si può", t:"scala numerica"}, a:{h:"Si usano", t:"scale **comportamentali**"},
  sotto:"Validate: la **BPS**, Behavioral Pain Scale, o la **CPOT**"},
{id:"s14", tipo:"tre", tema:"chiaro", sopratitolo:"Che cosa osservano · prima l'analgesia, poi la sedazione: un agitato spesso ha dolore", box:[
  {n:"1", t:"Il volto"}, {n:"2", t:"Le braccia", d:"i movimenti"}, {n:"3", t:"La tensione muscolare"},
  {n:"4", t:"L'adattamento al ventilatore", key:true}]},
{id:"s15", tipo:"frase", tema:"chiaro", sopratitolo:"Le procedure dolorose",
  testo:"Il dolore si valuta e si previene **prima**.", sotto:"Aspirazione, mobilizzazione, medicazioni."},

{id:"s16", tipo:"tre", tema:"chiaro", sopratitolo:"La sedazione · la scala RASS", box:[
  {n:"+4", t:"Combattivo"}, {n:"0", t:"Sveglio e calmo", key:true}, {n:"−5", t:"Non risvegliabile"}]},
{id:"s17", tipo:"frase", tema:"chiaro", sopratitolo:"L'obiettivo è prescritto",
  testo:"Quando possibile, una sedazione **leggera**.", sotto:"Un paziente calmo e risvegliabile."},
{id:"s18", tipo:"bivio", tema:"chiaro", sopratitolo:"Si rivaluta spesso e si documenta",
  radice:"La sedazione, rispetto all'obiettivo", rami:[
  {q:"eccessiva", t:"Più giorni di ventilazione", d:"delirium, debolezza"},
  {q:"insufficiente", t:"Agitazione", d:"rischio di estubazione accidentale", key:true}]},

{id:"s19", tipo:"icone", tema:"chiaro", sopratitolo:"Quinta giornata, sedazione più leggera · si valuta con la CAM-ICU", voci:[
  {icona:"avviso", t:"Agitato"},
  {icona:"cvc", t:"Tira i dispositivi", key:true},
  {icona:"chat", t:"Non segue le richieste", d:"in modo coerente"}]},
{id:"s20", tipo:"griglia", tema:"chiaro", colonne:4, spunta:false, sopratitolo:"CAM-ICU positiva: delirium · cercare le cause", celle:[
  {t:"**Dolore**"}, {t:"**Ipossia**"}, {t:"**Infezione**"}, {t:"**Farmaci** · benzodiazepine"},
  {t:"**Astinenza**"}, {t:"Ritenzione **urinaria**"}, {t:"Privazione di **sonno**"}]},
{id:"s21", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"Gli interventi della lezione 11.1, adattati alla terapia intensiva", celle:[
  {t:"**Orientamento**"}, {t:"Occhiali e **apparecchi acustici**"}, {t:"Ciclo **giorno-notte**: di notte luci e rumori ridotti"},
  {t:"I **familiari**"}, {t:"La **mobilizzazione**"}, {t:"Proteggere i **dispositivi**: sorveglianza, analgesia"}]},

{id:"s22", tipo:"figura", tema:"chiaro", illu:"letto", sopratitolo:"Un approfondimento · molti elementi sono infermieristici",
  titolo:"Il bundle **ABCDEF**.", sotto:"Per ridurre i giorni di ventilazione e le conseguenze a lungo termine."},
{id:"s23", sopratitolo:"Il bundle ABCDEF", ...ABCDEF([0,1,2], 1)},
{id:"s24", sopratitolo:"Il bundle che lega insieme tutto il caso", ...ABCDEF([0,1,2,3,4,5], 5)},

{id:"s25", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Le lesioni da dispositivo · frequentissime in terapia intensiva", celle:[
  {n:"1", t:"Labbra e angoli della **bocca** · tubo e fissaggio"}, {n:"2", t:"**Narici** · sondino"},
  {n:"3", t:"**Orecchie**"}, {n:"4", t:"La cute sotto i **sensori**"}]},
{id:"s26", tipo:"tabella", tema:"chiaro", sopratitolo:"Le lesioni da pressione · e gli occhi", colonne:["24%","76%"],
  intestazioni:["Dove", "Che cosa"], righe:[
  ["Supino", "**sacro**, talloni, occipite"],
  ["Prono", "**volto**, torace, ginocchia"],
  ["Occhi", "nel sedato non si chiudono bene: **protezione della cornea**"]], chiave:[2]},
{id:"s27", tipo:"icone", tema:"chiaro", sopratitolo:"E i cateteri", voci:[
  {icona:"cvc", t:"Bundle per il CVC", d:"lezione 6.2"},
  {icona:"catetere", t:"Catetere vescicale", d:"necessità rivalutata ogni giorno", key:true}]},

{id:"s28", tipo:"catena", tema:"chiaro", sopratitolo:"Se il tubo esce", passi:[
  {t:"Estubazione **accidentale**", d:"o il paziente se lo toglie"},
  {t:"Chiamare **subito** aiuto"},
  {t:"Valutare il **respiro**", key:true}]},
{id:"s29", tipo:"bivio", tema:"chiaro", sopratitolo:"Poi: materiale per la reintubazione, aspiratore pronto",
  radice:"Il respiro", rami:[
  {q:"efficace", t:"Ossigeno con maschera", d:"e monitoraggio"},
  {q:"inefficace", t:"Ventilare con pallone e maschera", d:"lezione 10.5", key:true}]},
{id:"s30", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Documentare e segnalare · la prevenzione", celle:[
  {t:"**Fissaggio** sicuro"}, {t:"Sedazione e analgesia **adeguate**"},
  {t:"**Sorveglianza**"}, {t:"Attenzione nei **movimenti** e nelle mobilizzazioni"}]},

{id:"s31", tipo:"confronto", tema:"chiaro", sopratitolo:"La famiglia · la moglie attende fuori dalla porta", col:[
  {h:"Dal medico", t:"le informazioni **cliniche**"},
  {h:"Dall'infermiere", t:"le informazioni **assistenziali**"}],
  sotto:"Accoglienza e informazioni chiare."},
{id:"s32", tipo:"icone", tema:"chiaro", sopratitolo:"Prima del primo ingresso", voci:[
  {icona:"orologio", t:"Orari di visita aperti", d:"il più possibile"},
  {icona:"avviso", t:"Dispositivi e allarmi", d:"spiegati prima: spaventano", key:true}]},
{id:"s33", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Coinvolgere la moglie nella cura", celle:[
  {t:"**Parlare** al marito"}, {t:"**Toccarlo**"},
  {t:"Portare **oggetti personali**"}, {t:"La sua **voce** aiuta anche nel delirium"}]},
{id:"s34", tipo:"figura", tema:"chiaro", illu:"quaderno", sopratitolo:"In alcune realtà",
  titolo:"Il **diario** di terapia intensiva.", sotto:"Scritto da operatori e familiari: aiuta il paziente a ricostruire i giorni che non ricorda."},

{id:"s35", tipo:"apparati", tema:"chiaro", sopratitolo:"Dopo la terapia intensiva · la sindrome post-terapia intensiva, anche nei familiari", voci:[
  {k:"muscolo", t:"Debolezza muscolare"},
  {k:"neuro", t:"Deficit cognitivi", d:"ansia, depressione, a volte disturbo post-traumatico", key:true}]},
{id:"s36", tipo:"percorso", tema:"chiaro", sopratitolo:"La prevenzione comincia in terapia intensiva", tappe:[
  {t:"In terapia intensiva", d:"ABCDEF, mobilizzazione, sonno, famiglia"},
  {t:"Follow-up"}, {t:"Riabilitazione"},
  {t:"Continuità", d:"con il reparto di destinazione", key:true}]},

{id:"s37", tipo:"tre", tema:"chiaro", sopratitolo:"D1 · «Allarme di alta pressione con desaturazione?» · chiamo aiuto", box:[
  {n:"D", t:"Dislocazione"}, {n:"O", t:"Ostruzione"}, {n:"P", t:"Pneumotorace"}, {n:"E", t:"Equipaggiamento"}]},
{id:"s38", tipo:"catena", tema:"chiaro", sopratitolo:"D1 · poi · D2 «Come previene la VAP?»", passi:[
  {t:"Nel dubbio: **staccare**"}, {t:"Pallone e **ossigeno**"},
  {t:"Trattare la **causa**", d:"aspirare, blocco-morso", key:true}]},
{id:"s39", sopratitolo:"D2 · la prevenzione della VAP", ...BUNDLE([0,1,2,3,4,5,6,7])},
{id:"s40", tipo:"tre", tema:"chiaro", sopratitolo:"D3 · «Come valuta il dolore nell'intubato?»", box:[
  {n:"BPS", t:"Scala comportamentale"}, {n:"CPOT", t:"Scala comportamentale"},
  {n:"quando", t:"Prima e durante le procedure", key:true}]},

{id:"s41", tipo:"citazione", tema:"chiaro", sopratitolo:"La risposta modello · 1",
  testo:"Paziente ventilato con allarme di **alta pressione**, desaturazione e agitazione: applico **DOPE**, rilevo il tubo morso e ostruito, inserisco un blocco-morso, aspiro con tecnica **asettica**.",
  fonte:"L'allarme"},
{id:"s42", tipo:"tabella", tema:"chiaro", sopratitolo:"La risposta modello · 2", colonne:["28%","72%"],
  intestazioni:["Passo", "Che cosa scrivo"], righe:[
  ["Verifico", "i centimetri del tubo · nel dubbio ventilerei con il **pallone**"],
  ["Valuto", "il dolore con una scala **comportamentale**"],
  ["Valuto", "la sedazione con la **RASS** rispetto all'obiettivo · segnalo al medico"],
  ["Principio", "**prima l'analgesia**"]], chiave:[3]},
{id:"s43", tipo:"tabella", tema:"chiaro", sopratitolo:"La risposta modello · 3", colonne:["28%","72%"],
  intestazioni:["Passo", "Che cosa scrivo"], righe:[
  ["Applico", "il **bundle VAP**: testata, igiene orale, cuffia, aspirazione sottoglottica, sedazione ridotta, svezzamento"],
  ["Valuto", "il delirium con la **CAM-ICU** · cause · misure non farmacologiche"]], chiave:[1]},
{id:"s44", tipo:"tabella", tema:"chiaro", sopratitolo:"La risposta modello · 4", colonne:["28%","72%"],
  intestazioni:["Passo", "Che cosa scrivo"], righe:[
  ["Prevengo", "lesioni da **dispositivo** e da pressione"],
  ["Proteggo", "gli **occhi**"],
  ["Applico", "il bundle per il catetere centrale"],
  ["Coinvolgo", "la **famiglia**, e documento"]], chiave:[3]},

{id:"s45", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"I collegamenti", celle:[
  {n:"3.1", t:"Bundle **VAP**"}, {n:"6.2", t:"Catetere **centrale**"}, {n:"7.2", t:"Le **lesioni**"},
  {n:"8.2", t:"L'**aspirazione**"}, {n:"10.5", t:"**DOPE**, RASS, CAM-ICU"}, {n:"11.1", t:"Il **delirium**"}]},

{id:"s46", tipo:"icone", tema:"chiaro", sopratitolo:"L'infermiere di area critica · rapporto infermiere-paziente più basso", voci:[
  {icona:"polmoni", t:"Ventilazione"}, {icona:"flebo", t:"Farmaci vasoattivi"},
  {icona:"cuore2", t:"Monitoraggio invasivo"}, {icona:"rene", t:"Tecniche dialitiche continue"}]},
{id:"s47", tipo:"frase", tema:"chiaro", sopratitolo:"Il valore aggiunto: la sorveglianza continua",
  testo:"Cogliere i cambiamenti nella persona **prima** che li segnalino le macchine.",
  sotto:"Molti neoassunti vengono inseriti qui, con una formazione specifica."},

{id:"s48", tipo:"titolo", tema:"profondo",
  titolo:"Dietro le macchine<br>c'è **una persona**.",
  sotto:"Che sente dolore, ha paura, e ha una famiglia."},

{id:"s49", tipo:"tre", tema:"chiaro", sopratitolo:"Nella prossima lezione · chiudiamo il Modulo 16", box:[
  {n:"1", t:"Il riepilogo", d:"del modulo"},
  {n:"6", t:"Casi lampo", d:"situazioni di qualsiasi turno", key:true}]},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione · 16.12",
  titolo:"Riepilogo<br>e casi lampo", sottotitolo:"La chiusura del Modulo 16",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
