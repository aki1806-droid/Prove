// Contenuto delle 50 scene della lezione 2.7. *accento*  **accento in semibold**

const SBAR = [
 {t:"S — Situation", d:"chi è la persona e qual è il problema *adesso*, in una frase"},
 {t:"B — Background", d:"il contesto clinico rilevante, non tutta la storia"},
 {t:"A — Assessment", d:"la **tua valutazione**: che cosa pensi stia accadendo"},
 {t:"R — Recommendation", d:"che cosa proponi o chiedi, in modo esplicito", key:true},
];

const REGOLE = [
 {n:"1", t:"**Luogo e tempo dedicati** — con interruzioni ridotte"},
 {n:"2", t:"**Supporto scritto** — la consegna verbale non sostituisce la cartella"},
 {n:"3", t:"**Struttura fissa** — per tutti, così nulla dipende da chi parla"},
 {n:"4", t:"**Priorità esplicite** — chi è instabile, che cosa è in sospeso"},
 {n:"5", t:"**Read-back** — sull'informazione critica"},
 {n:"6", t:"**Riservatezza** — la consegna non si fa in corridoio"},
 {n:"7", t:"**Spazio per le domande** — senza domande, non è compreso", key:true},
];

const TECNICHE = [
 {n:"1", t:"**Ascolto attivo** — attenzione piena, sedersi, all'altezza degli occhi"},
 {n:"2", t:"**Domande aperte** — «come va con il dolore?», non «è passato, vero?»"},
 {n:"3", t:"**Riformulazione** — restituire con parole proprie ciò che si è capito"},
 {n:"4", t:"**Chiarificazione** — chiedere quando qualcosa non torna"},
 {n:"5", t:"**Silenzio** — dopo una notizia difficile, non riempire il vuoto"},
 {n:"6", t:"**Teach-back** — far ripetere ciò che dovrà fare", key:true},
];

const SPIKES = [
 {n:"S", t:"**Setting** — luogo riservato, tempo protetto, chi la persona desidera"},
 {n:"P", t:"**Perception** — capire che cosa già sa e che cosa crede"},
 {n:"I", t:"**Invitation** — chiedere *quanto* desidera sapere", key:true},
 {n:"K", t:"**Knowledge** — l'informazione, gradualmente, con parole semplici"},
 {n:"E", t:"**Emotions** — accogliere la reazione *prima* di proseguire"},
 {n:"S", t:"**Strategy and summary** — riassumere e indicare i passi successivi"},
];

const LETTERA = [
 {n:"1", t:"**Bisogni assistenziali residui**"},
 {n:"2", t:"**Grado di autonomia** e ausili"},
 {n:"3", t:"**Lesioni e medicazioni** in corso"},
 {n:"4", t:"**Dispositivi** — catetere, stomia, accessi vascolari"},
 {n:"5", t:"**Educazione** erogata e residua"},
 {n:"6", t:"**Caregiver** di riferimento", key:true},
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 2 · Metodologia, documentazione e sicurezza",
  titolo:"Comunicazione clinica<br>e continuità assistenziale", sottotitolo:"Non una competenza relazionale: una barriera di sicurezza",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"titolo", tema:"chiaro", sopratitolo:"Il dato su cui gli studi convergono",
  titolo:"Una quota rilevante<br>degli eventi avversi ha fra<br>le cause un **fallimento<br>della comunicazione**.",
  sotto:"E soprattutto nei momenti di passaggio."},

{id:"s03", tipo:"tre", tema:"chiaro", sopratitolo:"I tre momenti in cui l'informazione cambia di mano",
  box:[
   {n:"1", t:"Cambio turno", d:"da un'équipe all'altra"},
   {n:"2", t:"Trasferimento", d:"da un reparto all'altro"},
   {n:"3", t:"Dimissione", d:"dall'ospedale al territorio", key:true}]},

{id:"s04", tipo:"titolo", tema:"tenue", sopratitolo:"Perché sta in questo modulo",
  titolo:"Non nelle competenze<br>relazionali: **qui**,<br>accanto al rischio clinico.",
  sotto:"È una barriera di sicurezza a tutti gli effetti."},

{id:"s05", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, attive:[0,1],
  sopratitolo:"Quattro blocchi",
  celle:[
   {n:"1", t:"Il **passaggio di consegne**, con il metodo SBAR"},
   {n:"2", t:"La comunicazione con la **persona assistita**"},
   {n:"3", t:"Le **cattive notizie** e l'aggressività"},
   {n:"4", t:"La **continuità** nei passaggi di setting", key:true}]},
{id:"s06", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false,
  sopratitolo:"Quattro blocchi",
  celle:[
   {n:"1", t:"Il **passaggio di consegne**, con il metodo SBAR"},
   {n:"2", t:"La comunicazione con la **persona assistita**"},
   {n:"3", t:"Le **cattive notizie** e l'aggressività"},
   {n:"4", t:"La **continuità** nei passaggi di setting", key:true}]},

{id:"s07", tipo:"confronto", tema:"chiaro", sopratitolo:"L'handover — che cosa passa di mano",
  col:[
   {h:"Informazioni", t:"I dati clinici sulla persona — quello che tutti ricordano"},
   {h:"Responsabilità", t:"La **presa in carico** passa di mano — e questa si dimentica"}]},

{id:"s08", tipo:"titolo", tema:"chiaro", sopratitolo:"Il punto di maggior fragilità",
  titolo:"Ciò che esiste nella<br>testa di uno deve arrivare<br>**intatto** nella testa<br>di un altro.",
  sotto:"In poco tempo, e spesso in un ambiente rumoroso."},

{id:"s09", tipo:"catena", tema:"chiaro", sopratitolo:"SBAR · quattro lettere", attive:[0,1],
  passi:SBAR},
{id:"s10", tipo:"catena", tema:"chiaro", sopratitolo:"SBAR · quattro lettere",
  passi:SBAR},
{id:"s11", tipo:"sostituzione", tema:"chiaro", sopratitolo:"La variante ISBAR",
  da:{h:"SBAR", t:"Si parte<br>dalla **situazione**"},
  a:{h:"ISBAR", t:"**I, Identify**:<br>chi sei tu, chi è il paziente"},
  sotto:"In una telefonata fra reparti diversi evita metà degli equivoci, e costa cinque secondi."},

{id:"s12", tipo:"tabella", tema:"chiaro", sopratitolo:"SBAR in una chiamata al medico",
  intestazioni:["Lettera","Che cosa si dice"], colonne:["14%","86%"],
  righe:[
   ["**I**","«Sono Rossi, Medicina 2, chiamo per la signora Bianchi, letto 12, 78 anni»"],
   ["**S**","«Da venti minuti è dispnoica, satura 88% in aria ambiente»"]]},
{id:"s13", tipo:"tabella", tema:"chiaro", sopratitolo:"SBAR in una chiamata al medico",
  intestazioni:["Lettera","Che cosa si dice"], colonne:["14%","86%"],
  righe:[
   ["**B**","«Ricoverata tre giorni fa per scompenso, in terapia diuretica; stamattina peso +1,8 kg»"],
   ["**A**","«Penso a un peggioramento del sovraccarico: rantoli alle basi, edemi aumentati»"]]},
{id:"s14", tipo:"tabella", tema:"chiaro", sopratitolo:"SBAR in una chiamata al medico",
  intestazioni:["Lettera","Che cosa si dice"], colonne:["14%","86%"],
  righe:[
   ["**R**","«Ho messo O₂ 2 l/min e l'ho posizionata semiseduta. Chiedo che venga a valutarla e se posso anticipare il diuretico»"],
   ["→","**Trenta secondi** — e il medico sa anche quanto è urgente"]]},

{id:"s15", tipo:"trappola", tema:"profondo", sopratitolo:"Perché i passaggi falliscono",
  righe:[
   {sb:"Non per **mancanza di dati**",
    ok:"Ma perché chi chiama **descrive e non chiede** — sono le lettere **A** e **R**"}]},

{id:"s16", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, attive:[0,1,2],
  sopratitolo:"Sette regole per l'handover", celle:REGOLE},
{id:"s17", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false,
  sopratitolo:"Sette regole per l'handover", celle:REGOLE},

{id:"s18", tipo:"titolo", tema:"chiaro", sopratitolo:"La regola che quasi nessuno cita",
  titolo:"Un handover<br>**senza domande**<br>è quasi sempre un handover<br>**non compreso**.",
  sotto:"Il silenzio di chi riceve non è un buon segno."},

{id:"s19", tipo:"catena", tema:"chiaro", sopratitolo:"Read-back · le prescrizioni verbali o telefoniche",
  passi:[
   {t:"Ripeto", d:"ad alta voce l'informazione critica"},
   {t:"Faccio confermare", d:"da chi l'ha data"},
   {t:"Trascrivo", d:"subito, non a fine turno"},
   {t:"Convalida scritta", d:"dal prescrittore, quanto prima", key:true}]},

{id:"s20", tipo:"catena", tema:"chiaro", sopratitolo:"Tre strumenti, tre momenti",
  passi:[
   {t:"Briefing", d:"**prima**: obiettivi, criticità, ruoli"},
   {t:"Time-out", d:"**immediatamente prima** della procedura"},
   {t:"Debriefing", d:"**dopo**: che cosa è andato bene, che cosa migliorare", key:true}]},

{id:"s21", tipo:"titolo", tema:"chiaro", sopratitolo:"Il time-out",
  titolo:"Verifica finale di<br>**paziente, sito e procedura**.",
  sotto:"È parte della check-list di sala operatoria."},

{id:"s22", tipo:"titolo", tema:"chiaro", sopratitolo:"Il debriefing dopo un'emergenza",
  titolo:"Rivedere insieme,<br>**senza cercare colpevoli** —<br>e sostenere chi c'era.",
  sotto:"È il tema delle seconde vittime della lezione 2.6, visto dal lato di che cosa si fa il giorno dopo."},

{id:"s23", tipo:"tabella", tema:"chiaro", sopratitolo:"Due premesse che qui diventano tecnica",
  intestazioni:["Fonte","Che cosa dice"], colonne:["34%","66%"],
  righe:[
   ["**Codice deontologico**","«Il **tempo di relazione** è tempo di cura»"],
   ["**Legge 219/2017**","«Il tempo della comunicazione costituisce **tempo di cura**»"]]},

{id:"s24", tipo:"titolo", tema:"chiaro", sopratitolo:"La conseguenza operativa",
  titolo:"Non è ciò che si fa<br>**se avanza tempo**:<br>è un **intervento**.",
  sotto:"E come ogni intervento si pianifica, si esegue con una tecnica e si documenta."},

{id:"s25", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, attive:[0,1],
  sopratitolo:"Sei tecniche", celle:TECNICHE},
{id:"s26", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, attive:[0,1,2,3],
  sopratitolo:"Sei tecniche", celle:TECNICHE},
{id:"s27", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false,
  sopratitolo:"Sei tecniche", celle:TECNICHE},

{id:"s28", tipo:"trappola", tema:"chiaro", sopratitolo:"Teach-back · la domanda sbagliata",
  righe:[
   {sb:"«Ha capito?»",
    ok:"La risposta è quasi sempre **sì** — per cortesia, per imbarazzo, per non deludere"}]},

{id:"s29", tipo:"sostituzione", tema:"chiaro", sopratitolo:"Teach-back · la domanda giusta",
  da:{h:"Non si chiede", t:"«Ha capito?»"},
  a:{h:"Si chiede", t:"«Mi rispieghi come farà<br>**l'insulina domani mattina**?»"},
  sotto:"La differenza fra le due domande è tutta nella risposta."},

{id:"s30", tipo:"titolo", tema:"profondo", sopratitolo:"Perché vale la pena nominarla",
  titolo:"È il modo più efficace<br>per verificare **davvero**<br>la comprensione.",
  sotto:"Ed è la tecnica che qualifica qualunque risposta sull'educazione terapeutica."},

{id:"s31", tipo:"confronto", tema:"chiaro", sopratitolo:"Le barriere alla comunicazione",
  col:[
   {h:"Della persona", t:"Dolore · ansia · deficit sensoriali · deterioramento cognitivo · **bassa alfabetizzazione sanitaria** · la lingua. *Nessuna è colpa di chi la ha.*"},
   {h:"Dell'operatore", t:"Gergo tecnico · fretta · **il presupporre di aver spiegato** · la chiusura difensiva"}]},

{id:"s32", tipo:"tre", tema:"chiaro", sopratitolo:"E le barriere ambientali",
  box:[
   {n:"1", t:"Rumore", d:"non si sente, e non si chiede di ripetere"},
   {n:"2", t:"Nessuna privacy", d:"non si dice ciò che conta"},
   {n:"3", t:"Interruzioni", d:"il filo si perde e non si riprende", key:true}]},

{id:"s33", tipo:"icone", tema:"chiaro", sopratitolo:"I facilitatori",
  voci:[
   {icona:"occhio", t:"Protesi e occhiali", d:"verificarli prima di parlare"},
   {icona:"persona", t:"Sedersi", d:"e una informazione alla volta"},
   {icona:"documento", t:"Materiale scritto", d:"semplice, da portare via"},
   {icona:"chat", t:"Mediatore culturale", d:"dove serve, non a richiesta"},
   {icona:"persone", t:"Il caregiver", d:"se la persona lo desidera", key:true}]},

{id:"s34", tipo:"norma", tema:"chiaro", sopratitolo:"Le cattive notizie — di chi è la competenza",
  etichetta:"Lezione", sigla:"1.4 · Codice deontologico",
  testo:"La comunicazione di **diagnosi e prognosi** compete al **medico**. Il protocollo più citato è **SPIKES**, sei tappe."},

{id:"s35", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, attive:[0,1,2],
  sopratitolo:"SPIKES · sei tappe", celle:SPIKES},
{id:"s36", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false,
  sopratitolo:"SPIKES · sei tappe", celle:SPIKES},

{id:"s37", tipo:"catena", tema:"chiaro", sopratitolo:"Il ruolo dell'infermiere, anche se la notizia non la dà lui",
  passi:[
   {t:"Prepara", d:"il contesto"},
   {t:"È presente", d:"durante"},
   {t:"Verifica", d:"che cosa è stato compreso"},
   {t:"Accompagna", d:"nelle ore successive"},
   {t:"Rileva", d:"i bisogni che emergono", key:true}]},

{id:"s38", tipo:"titolo", tema:"chiaro", sopratitolo:"Perché la verifica non è una formalità",
  titolo:"Ciò che resta dopo<br>un colloquio difficile è<br>**molto meno** di ciò<br>che è stato detto.",
  sotto:"E i bisogni, spesso, emergono dopo."},

{id:"s39", tipo:"trappola", tema:"chiaro", sopratitolo:"«Mi dica la mia diagnosi»",
  righe:[
   {sb:"Comunicarla — oppure dire «non so nulla» e cambiare argomento",
    ok:"Nessuna delle due: la risposta corretta ha **quattro passi**"}]},

{id:"s40", tipo:"catena", tema:"profondo", sopratitolo:"I quattro passi, in quest'ordine",
  passi:[
   {t:"Esploro", d:"che cosa sa e che cosa teme"},
   {t:"Resto", d:"con lei"},
   {t:"Attivo il medico", d:"perché l'informazione arrivi"},
   {t:"Documento", d:"la richiesta e l'attivazione", key:true}]},

{id:"s41", tipo:"norma", tema:"chiaro", sopratitolo:"L'aggressione agli operatori",
  etichetta:"Fonti", sigla:"Racc. n. 8 · L. 113/2020",
  testo:"Un **rischio professionale riconosciuto**. La legge 113 del 2020 ha rafforzato la **tutela penale** del personale sanitario."},

{id:"s42", tipo:"icone", tema:"chiaro", sopratitolo:"La prevenzione è ambientale e organizzativa",
  voci:[
   {icona:"orologio", t:"Attese", d:"gestione dell'attesa e dell'informazione"},
   {icona:"ospedale", t:"Spazi", d:"illuminazione e vie di fuga libere"},
   {icona:"avviso", t:"Allarme", d:"sistemi di chiamata raggiungibili"},
   {icona:"occhio", t:"Riconoscere presto", d:"l'escalation ha segnali anticipatori", key:true}]},

{id:"s43", tipo:"scala", tema:"chiaro", sopratitolo:"I segnali anticipatori, in ordine",
  gradini:[
   {n:"1", t:"Il tono che sale", d:"e il volume con lui"},
   {n:"2", t:"Irrequietezza motoria", d:"non sta fermo"},
   {n:"3", t:"Invasione dello spazio", d:"la distanza si accorcia"},
   {n:"4", t:"Minacce verbali", d:"qui c'è ancora tempo, ma poco", key:true}]},

{id:"s44", tipo:"confronto", tema:"chiaro", sopratitolo:"De-escalation",
  col:[
   {h:"Da fare", t:"Tono **calmo** e volume basso · **distanza** e via di uscita libera · non contrapporsi frontalmente · **riconoscere l'emozione** · offrire opzioni concrete"},
   {h:"Da non fare", t:"Alzare la voce · **toccare** la persona · restare **soli** in uno spazio chiuso · rispondere alle provocazioni · minimizzare"}]},

{id:"s45", tipo:"catena", tema:"chiaro", sopratitolo:"E dopo l'episodio",
  passi:[
   {t:"Mettere in sicurezza", d:"persone e ambiente"},
   {t:"Chiedere supporto", d:"non restare soli"},
   {t:"Segnalare", d:"con la scheda aziendale"},
   {t:"Documentare", d:"i fatti, in modo oggettivo", key:true}]},

{id:"s46", tipo:"titolo", tema:"chiaro", sopratitolo:"Tre lezioni in un unico gesto",
  titolo:"Documentare **oggettivamente**<br>come nella 2.4.<br>Sostenere l'operatore<br>come nella 2.6.",
  sotto:"È il segno che il modulo ha una spina dorsale."},

{id:"s47", tipo:"tre", tema:"chiaro", sopratitolo:"La continuità assistenziale · tre dimensioni",
  box:[
   {n:"1", t:"Informativa", d:"le informazioni seguono la persona"},
   {n:"2", t:"Gestionale", d:"gli interventi sono coerenti fra loro"},
   {n:"3", t:"Relazionale", d:"esiste un riferimento stabile", key:true}]},

{id:"s48", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, attive:[0,1],
  sopratitolo:"La lettera infermieristica di dimissione — non duplica quella medica",
  celle:LETTERA},
{id:"s49", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false,
  sopratitolo:"La lettera infermieristica di dimissione — non duplica quella medica",
  celle:LETTERA},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione",
  titolo:"2.8", sottotitolo:"Riepilogo<br>del Modulo 2",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
