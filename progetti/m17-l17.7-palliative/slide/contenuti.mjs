// Contenuto delle 50 scene della lezione 17.7 — le cure palliative a
// domicilio, il caso del signor Giovanni e della moglie Anna. I due dolori
// sono un confronto e un bivio; la notte del «chiamiamo il 118?» un secondo
// bivio fra il piano concordato e il 118; il lutto un percorso; errori in
// tabella; la risposta modello un promemoria che si scrive riga per riga.

const LEZIONI = [
  {n:"1.6", t:"Consenso e L. 219", illu:"bilancia"},
  {n:"3.7", t:"Il dolore", illu:"termometro"},
  {n:"5.6", t:"Gli oppioidi", illu:"fiale"},
  {n:"11.5", t:"Cure palliative", illu:"mani"},
  {n:"13.4", t:"Territorio", illu:"casa"}];

const RISPOSTA = (att) => ({tipo:"memo", tema:"chiaro", attive:att, voci:[
  "**Inquadramento**: neoplasia avanzata a domicilio · due dolori · stipsi · caregiver insicura",
  "Dolore: **scala e diario** · al medico: terapia di fondo e **dose di soccorso**",
  "Soccorso anche **prima** delle attività · **lassativo** prescritto",
  "Moglie: **schema scritto**, conservazione, **reperibilità** · teach-back",
  "Dispnea: posizione, **aria fresca**, farmaci prescritti",
  "Senza via orale: **sottocutanea** o transdermica",
  "**Volontà** rispettata · comfort, rantolo, sedazione · la moglie e il **lutto**"]});

const LUTTO = (att) => ({tipo:"percorso", tema:"chiaro", attive:att, tappe:[
  {t:"Farmaci", d:"ritiro o smaltimento sicuro, in particolare degli oppioidi"},
  {t:"Cordoglio", d:"una telefonata o una visita", key:true},
  {t:"Lutto complicato", d:"riconoscerne i segni"},
  {t:"Rete di sostegno", d:"da attivare"}]});

const RETE = (att) => ({tipo:"raggiera", tema:"chiaro", centro:"La rete", attive:att, raggi:[
  {t:"Nuclei", d:"cure palliative domiciliari, nelle ULSS", key:true},
  {t:"Hospice"},
  {t:"Reperibilità", d:"notte e festivi"},
  {t:"MMG e ADI", d:"integrazione"},
  {t:"Pediatria", d:"centro regionale"}]});

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 17 · Casi clinici avanzati",
  titolo:"Le cure palliative<br>a domicilio", sottotitolo:"17.7 · Un uomo che ha scelto di restare a casa",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"figura", tema:"chiaro", illu:"casa", sopratitolo:"Micro-lezione 7 di 12 · lasciamo l'ospedale ed entriamo in una casa",
  titolo:"Curato **fino alla fine** a casa sua.", sotto:"Una malattia avanzata · un'équipe di cure palliative domiciliari accompagna lui e la moglie."},
{id:"s03", tipo:"anello", tema:"chiaro", sopratitolo:"Dolore, sintomi, vie di somministrazione · la relazione e la famiglia",
  centro:"17.7", sotto:"la tecnica e la relazione", voci:LEZIONI},

{id:"s04", tipo:"cifre", tema:"chiaro", sopratitolo:"Lo scenario · il signor Giovanni", voci:[
  {n:"72", suf:"anni", t:"tumore del polmone", d:"metastasi ossee · nessuna ulteriore terapia oncologica indicata"},
  {n:"Casa", t:"il desiderio espresso", d:"chiaramente: restare a casa", key:true}]},
{id:"s05", tipo:"cifre", tema:"chiaro", sopratitolo:"La moglie Anna · la figlia in un'altra regione · la prima visita delle cure palliative", voci:[
  {n:"70", suf:"anni", t:"la moglie Anna"},
  {n:"7/10", t:"il dolore", d:"nonostante un oppioide a lento rilascio", key:true},
  {n:"Picchi", t:"improvvisi", d:"quando si alza"}]},
{id:"s06", tipo:"pausa", tema:"chiaro", sopratitolo:"Alla prima visita", es:"metti in pausa",
  testo:"Quali sono i **problemi**, e da quale cominci?",
  dati:["alvo chiuso da 4 giorni", "dorme poco", "Anna è stanca", "«ho paura di sbagliare le medicine»"]},

{id:"s07", tipo:"confronto", tema:"chiaro", sopratitolo:"Il ragionamento · due dolori", col:[
  {h:"Dolore di fondo", t:"**non controllato**", grande:true},
  {h:"Dolore episodico intenso", t:"i **picchi** legati al movimento: metastasi ossee", grande:true}],
  sotto:"Due dolori diversi, da trattare in due modi diversi."},
{id:"s08", tipo:"raggiera", tema:"chiaro", sopratitolo:"Il ragionamento · e poi", centro:"I problemi", attive:[2,3,4], raggi:[
  {t:"Dolore", d:"di fondo"},
  {t:"Picchi", d:"episodici"},
  {t:"Stipsi", d:"da oppioidi, prevenibile"},
  {t:"Insonnia"},
  {t:"Caregiver", d:"anziana, stanca, insicura", key:true}]},
{id:"s09", tipo:"tre", tema:"chiaro", sopratitolo:"L'obiettivo non è guarire: la qualità della vita e la volontà di restare a casa", box:[
  {n:"1", t:"Fisico"}, {n:"2", t:"Psicologico"}, {n:"3", t:"Sociale"}, {n:"4", t:"Spirituale"}]},

{id:"s10", tipo:"figura", tema:"chiaro", illu:"orologio", sopratitolo:"Il dolore · i principi della lezione 3.7",
  titolo:"Dolore di fondo: terapia **a orario fisso**.", sotto:"Come l'oppioide a lento rilascio · il medico la adegua in base alla valutazione."},
{id:"s11", tipo:"bivio", tema:"chiaro", sopratitolo:"Il dolore episodico intenso · un oppioide a rapida insorgenza",
  radice:"Dose di soccorso prescritta", rami:[
  {q:"quando il picco arriva", t:"Al bisogno", d:"secondo prescrizione"},
  {q:"se il dolore è prevedibile", t:"PRIMA dell'attività", d:"alzarsi, l'igiene, le medicazioni", key:true}]},
{id:"s12", tipo:"catena", tema:"chiaro", sopratitolo:"Valutare e annotare", passi:[
  {t:"La **scala**", d:"regolarmente"},
  {t:"Il **diario**", d:"del dolore e delle dosi di soccorso"},
  {t:"Dosi **frequenti**?"},
  {t:"Il medico rivede la **terapia di fondo**", key:true}]},

{id:"s13", tipo:"trappola", tema:"chiaro", sopratitolo:"Gli effetti degli oppioidi · la stipsi è costante, non si attenua con il tempo", righe:[
  {sb:"Aspettare che la stipsi compaia", ok:"**Lassativo a orario** fin dall'inizio, secondo prescrizione"},
  {sb:"Alvo chiuso da 4 giorni", ok:"Giovanni ne ha bisogno **subito**"}]},
{id:"s14", tipo:"tabella", tema:"chiaro", sopratitolo:"Gli altri effetti", colonne:["55%","45%"],
  intestazioni:["Effetto", "Che cosa succede"], righe:[
  ["**Nausea**", "spesso transitoria"],
  ["**Sonnolenza** iniziale", "si riduce"],
  ["**Confusione**, **mioclonie** (piccole scosse muscolari)", "da **segnalare**"]], chiave:[2]},
{id:"s15", tipo:"icone", tema:"chiaro", sopratitolo:"Da insegnare alla famiglia · i segni di sovradosaggio", voci:[
  {icona:"luna", t:"Sonnolenza profonda", key:true},
  {icona:"polmoni", t:"Respiro molto lento"},
  {icona:"occhio", t:"Pupille puntiformi"}]},
{id:"s16", tipo:"frase", tema:"chiaro", sopratitolo:"I timori: la «dipendenza», «accelerare la fine»",
  testo:"Un oppioide usato bene, nel controllo del dolore, **non accorcia la vita**.",
  sotto:"Ai timori si risponde con un'informazione corretta."},

{id:"s17", tipo:"griglia", tema:"chiaro", colonne:2, sopratitolo:"Educare la moglie · la vera protagonista dell'assistenza quotidiana", celle:[
  {t:"Uno **schema scritto**, semplice"}, {t:"Quali **farmaci**"},
  {t:"A che **ora**"}, {t:"A che cosa **servono**"},
  {t:"Come e quando usare la **dose di soccorso**", key:true}, {t:"Il **diario**"}]},
{id:"s18", tipo:"icone", tema:"chiaro", sopratitolo:"La sicurezza e chi chiamare", voci:[
  {icona:"lucchetto", t:"Conservazione sicura", d:"fuori dalla portata dei bambini"},
  {icona:"rifiuti", t:"Smaltimento dei residui", d:"secondo le indicazioni"},
  {icona:"telefono", t:"Reperibilità delle cure palliative", d:"24 ore su 24", key:true}]},
{id:"s19", tipo:"figura", tema:"chiaro", illu:"dialogo", sopratitolo:"Verificare",
  titolo:"**Teach-back**: Anna lo ripete con parole sue.", sotto:"E la figlia si coinvolge anche a distanza, per esempio con le videochiamate."},

{id:"s20", tipo:"icone", tema:"chiaro", sopratitolo:"Terza settimana · dispnea anche a riposo, molta ansia · gli strumenti della lezione 11.5", voci:[
  {icona:"persona", t:"Posizione seduta"},
  {icona:"polmoni", t:"Aria fresca sul volto", d:"un piccolo ventilatore", key:true},
  {icona:"lampada", t:"Ambiente tranquillo"}]},
{id:"s21", tipo:"griglia", tema:"chiaro", colonne:2, sopratitolo:"E ancora", celle:[
  {t:"**Oppioidi** a basse dosi, secondo prescrizione: riducono la fame d'aria", key:true},
  {t:"**Ossigeno** solo se utile e prescritto"},
  {t:"**Ansiolitici** secondo prescrizione"},
  {t:"Tecniche di **respirazione**, presenza"},
  {t:"Alla moglie: che cosa fare **nelle crisi**, per evitare il panico"}]},

{id:"s22", tipo:"catena", tema:"chiaro", sopratitolo:"Quando non può più deglutire", passi:[
  {t:"La via orale **non è più possibile**"},
  {t:"Altre vie, le **meno dolorose**", key:true},
  {t:"**Semplificare**", d:"sospendere i farmaci che non servono più"}]},
{id:"s23", tipo:"figura", tema:"chiaro", illu:"elastomero", sopratitolo:"La via sottocutanea",
  titolo:"La via **più usata** nelle cure palliative a domicilio.", sotto:"Ago o piccola cannula · boli o infusione continua con pompa elastomerica o elettronica, secondo prescrizione."},
{id:"s24", tipo:"griglia", tema:"chiaro", colonne:2, sopratitolo:"La via transdermica · i cerotti di oppioide", celle:[
  {no:true, t:"**Tagliare** il cerotto"},
  {no:true, t:"Esporlo al **calore**: aumenta l'assorbimento", key:true},
  {t:"**Ruotare** le sedi"}, {t:"**Rimuovere** il precedente"},
  {t:"Smaltirlo **piegato**"}]},

{id:"s25", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Le ultime ore · i segni di morte imminente", celle:[
  {n:"1", t:"Coscienza **ridotta**"}, {n:"2", t:"Respiro irregolare, con **pause**"}, {n:"3", t:"Il **rantolo**", key:true},
  {n:"4", t:"Estremità **fredde**"}, {n:"5", t:"**Marezzatura**"}, {n:"6", t:"Urine **scarse**"}]},
{id:"s26", tipo:"griglia", tema:"chiaro", colonne:2, sopratitolo:"Il comfort · poi, di notte, Anna chiama spaventata", celle:[
  {t:"Posizione **laterale**"}, {t:"Igiene del **cavo orale**"},
  {t:"**Antisecretivi** secondo prescrizione", key:true}, {no:true, t:"Aspirazione **profonda**"}]},
{id:"s27", tipo:"bivio", tema:"chiaro", sopratitolo:"Il valore di un piano concordato prima",
  radice:"«Chiamiamo il 118?»", rami:[
  {q:"il piano concordato", t:"La reperibilità delle cure palliative", d:"conosce Giovanni e la sua volontà", key:true},
  {q:"il 118", t:"Resta disponibile", d:"ma potrebbe portarlo in ospedale contro il suo desiderio"}]},
{id:"s28", tipo:"frase", tema:"chiaro", sopratitolo:"Se un sintomo diventa refrattario · lezione 11.5",
  testo:"La **sedazione palliativa** è possibile anche a domicilio.",
  sotto:"Con il consenso, secondo prescrizione."},

{id:"s29", tipo:"norma", tema:"chiaro", sopratitolo:"Approfondimento · la pianificazione condivisa delle cure",
  etichetta:"Legge 219/2017", sigla:"Art. 5",
  testo:"Paziente e medico, con l'équipe, per l'evoluzione **prevedibile** di una malattia cronica e invalidante."},
{id:"s30", tipo:"tre", tema:"chiaro", sopratitolo:"Che cosa comprende · si può aggiornare", box:[
  {n:"1", t:"Il luogo di cura", d:"preferito", key:true},
  {n:"2", t:"I trattamenti", d:"accettati o rifiutati: la rianimazione, il ricovero"},
  {n:"3", t:"Un fiduciario", d:"eventuale"}]},
{id:"s31", tipo:"catena", tema:"chiaro", sopratitolo:"L'infermiere partecipa e la rende conoscibile", passi:[
  {t:"La **pianificazione**"},
  {t:"La **documentazione** domiciliare"},
  {t:"Il momento di **crisi**", d:"come quella notte"},
  {t:"La **volontà** rispettata", d:"da familiari e professionisti", key:true}]},

{id:"s32", tipo:"icone", tema:"chiaro", sopratitolo:"Dopo la morte · il medico constata il decesso · la salma secondo le indicazioni", voci:[
  {icona:"persone", t:"Presenza", d:"e tempo per il saluto", key:true},
  {icona:"cuoremano", t:"Riti e volontà", d:"della famiglia"},
  {icona:"documento", t:"Informazioni", d:"pratiche"}]},
{id:"s33", sopratitolo:"I farmaci e il supporto al lutto", ...LUTTO([0,1])},
{id:"s34", tipo:"figura", tema:"chiaro", illu:"mani", sopratitolo:"Il lutto complicato · una rete di sostegno",
  titolo:"Anna, da questo momento, è una **persona sola** da accompagnare."},

{id:"s35", tipo:"tabella", tema:"chiaro", sopratitolo:"Gli errori da evitare · il dolore e la casa", colonne:["55%","45%"],
  intestazioni:["Errore", "Invece"], righe:[
  ["no:Trattare solo il dolore di fondo", "anche quello **episodico**"],
  ["no:Non prevenire la stipsi", "**lassativo** dall'inizio"],
  ["no:Famiglia senza un numero", "la **reperibilità**"],
  ["no:Nessun piano per le crisi", "un piano **concordato prima**"]], chiave:[2]},
{id:"s36", tipo:"tabella", tema:"chiaro", sopratitolo:"Gli errori da evitare · le ultime settimane", colonne:["55%","45%"],
  intestazioni:["Errore", "Invece"], righe:[
  ["no:Tagliare i cerotti, esporli al calore", "integri, lontano dal **calore**"],
  ["no:Aspirare in profondità il rantolo", "posizione, **antisecretivi**"],
  ["no:Ricoverare per abitudine", "la **volontà** espressa"],
  ["no:Dimenticare il caregiver e il lutto", "**chi resta**"]], chiave:[2]},

{id:"s37", tipo:"catena", tema:"chiaro", sopratitolo:"D1 · «Come si gestisce il dolore episodico intenso?»", passi:[
  {t:"Dose di **soccorso**", d:"prescritta, oppioide a rapida insorgenza"},
  {t:"Anche **prima**", d:"delle attività che lo scatenano", key:true},
  {t:"Il **diario**"}]},
{id:"s38", tipo:"tre", tema:"chiaro", sopratitolo:"D1: dosi frequenti → si rivede la terapia di fondo · D2 · «Quali vie, se la via orale non è possibile?»", box:[
  {n:"1", t:"Sottocutanea", d:"boli o infusione continua", key:true},
  {n:"2", t:"Transdermica", d:"i cerotti"}]},
{id:"s39", tipo:"catena", tema:"chiaro", sopratitolo:"D3 · «Che cos'è la pianificazione condivisa delle cure?» · art. 5, L. 219/2017", passi:[
  {t:"Paziente ed **équipe**"},
  {t:"Le scelte di cura, **in anticipo**", key:true},
  {t:"Il **luogo di cura**", d:"e un eventuale fiduciario"}]},

{id:"s40", sopratitolo:"La risposta modello, in 15 righe", ...RISPOSTA([0])},
{id:"s41", sopratitolo:"La risposta modello · il dolore e la stipsi", ...RISPOSTA([0,1,2])},
{id:"s42", sopratitolo:"La risposta modello · la moglie e la dispnea", ...RISPOSTA([0,1,2,3,4])},
{id:"s43", sopratitolo:"La risposta modello · le vie e le ultime ore", ...RISPOSTA([0,1,2,3,4,5,6])},

{id:"s44", tipo:"tre", tema:"chiaro", sopratitolo:"I collegamenti", box:[
  {n:"1.6", t:"Consenso e L. 219"}, {n:"3.7", t:"Il dolore"},
  {n:"5.6", t:"Gli oppioidi"}, {n:"11.5", t:"Cure palliative", key:true}]},
{id:"s45", tipo:"tre", tema:"chiaro", sopratitolo:"I collegamenti", box:[
  {n:"13.4", t:"Territorio e rete veneta"}, {n:"11.2", t:"Il caregiver"},
  {n:"17.8", t:"Il prossimo caso", key:true}]},

{id:"s46", sopratitolo:"In Veneto · la rete delle cure palliative · legge 38/2010", ...RETE([0,1,2])},
{id:"s47", sopratitolo:"L'integrazione · e le cure palliative pediatriche", ...RETE([0,1,2,3,4])},

{id:"s48", tipo:"titolo", tema:"profondo",
  titolo:"A casa, la cura passa<br>attraverso le mani<br>di **chi resta**.",
  sotto:"Educare il caregiver è curare il paziente."},

{id:"s49", tipo:"tre", tema:"chiaro", sopratitolo:"Nella prossima lezione · restiamo a domicilio", box:[
  {n:"1", t:"L'infermiere di famiglia", d:"e comunità", key:true}, {n:"2", t:"Una lesione da pressione", d:"un'anziana allettata"}, {n:"3", t:"Un figlio", d:"che non ce la fa più"}]},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione · 17.8",
  titolo:"L'infermiere di famiglia<br>e il caregiver esausto", sottotitolo:"Una lesione da pressione e una rete da attivare",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
