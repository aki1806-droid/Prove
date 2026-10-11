// Contenuto delle 48 scene della lezione 16.2. *accento*  **accento in semibold**
//
// Registro del modulo: sobrio e descrittivo, nessuna drammatizzazione dei
// sintomi. E sempre "persona con disturbo psichico": non c'e' una slide che
// usi un sostantivo al posto della persona.
//
// Il tema `tenue` e' il velo degli errori (vedi layout.mjs): qui sta sulle
// scene che correggono un fraintendimento o dicono che cosa non fare, mai su
// contenuto positivo o neutro.

// La regola che apre il modulo: tre coppie, interpretazione contro fatto.
// Sostituzione e non tabella, perche' quello che conta e' il passaggio.
const RIFORMULATE = [
 {sb:"«è aggressivo»",  ok:"ha alzato la voce e battuto la mano sul tavolo **alle 14:30**"},
 {sb:"«è depresso»",    ok:"non si è alzato, non ha assunto il pasto, **non ha risposto**"},
 {sb:"«delira»",        ok:"riferisce che **il cibo è avvelenato** e rifiuta di mangiare"},
];

const DEPRESSIONE = [
 {t:"Umore depresso"},
 {t:"**Anedonia** — perdita di interesse e piacere"},
 {t:"Rallentamento"},
 {t:"Disturbi di **sonno** e **appetito**"},
 {t:"Affaticabilità"},
 {t:"Svalutazione di sé"},
];

const OSSERVA_DEPR = [
 {icona:"orologio",  t:"Ritmo sonno-veglia"},
 {icona:"cuoremano", t:"Cura di sé"},
 {icona:"persona",   t:"Isolamento"},
 {icona:"occhio",    t:"Assunzione dei pasti"},
];

const MANIA = [
 {t:"Umore elevato **oppure irritabile**"},
 {t:"**Ridotto bisogno di sonno**"},
 {t:"Logorrea"},
 {t:"Agitazione e iperattività"},
 {t:"Grandiosità"},
 {t:"Disinibizione e comportamenti a rischio"},
];

const ANSIA = [
 {n:"1", t:"Ansia generalizzata", d:"preoccupazione persistente, tensione, disturbi del sonno"},
 {n:"2", t:"Attacco di panico", d:"esordio improvviso, sintomi fisici intensi, durata limitata", key:true},
 {n:"3", t:"Fobie", d:"paura intensa ed evitamento di situazioni specifiche"},
 {n:"4", t:"DOC", d:"ossessioni (pensieri) e compulsioni (comportamenti)"},
];

const PANICO_SI = [
 {t:"Restare con la persona"},
 {t:"Tono calmo, frasi brevi"},
 {t:"Ridurre gli stimoli"},
 {t:"Rassicurare che **passerà**"},
 {t:"Invitare a respirare lentamente"},
];
const PANICO_NO = [
 {t:"Affollare la stanza", no:true},
 {t:"Alzare la voce", no:true},
 {t:"Minimizzare", no:true},
];

// Il visual chiave della lezione: cinque parametri, due colonne.
//
// Niente ✓ e × qui. Il segno accanto alla parola serve dove c'e' un giusto e
// uno sbagliato — la tabella prima/dopo la 180, gli elenchi di cio' che non
// compete. Qui le due colonne sono due quadri clinici da distinguere: mettere
// ✓ su ogni riga del delirium e × su ogni riga della demenza direbbe che
// l'esordio graduale e' un errore, e marcherebbe una condizione in una lezione
// che insegna a non farlo. La distinzione la fanno le intestazioni e le
// etichette di riga; l'enfasi, la riga evidenziata.
const DELIRIUM_DEMENZA = {
 colonne:["20%","40%","40%"],
 intestazioni:["", "Delirium", "Demenza"],
 righe:[
  ["Esordio",       "**improvviso** — ore o giorni",      "**graduale** — mesi o anni"],
  ["Andamento",     "**fluttuante**, peggiora di sera",   "**progressivo** e stabile"],
  ["Attenzione",    "gravemente **compromessa**",         "**conservata** all'inizio"],
  ["Coscienza",     "**alterata**",                       "**integra** nelle fasi iniziali"],
  ["Reversibilità", "**reversibile** se si rimuove la causa", "**non** reversibile"],
 ],
};

const CAUSE = [
 {t:"**Infezione** — urinaria, respiratoria"},
 {t:"**Disidratazione**"},
 {t:"**Dolore** non trattato"},
 {t:"Ritenzione urinaria e stipsi"},
 {t:"Farmaci"},
 {t:"Privazione di sonno"},
 {t:"Disorientamento ambientale"},
 {t:"Occhiali e apparecchi mancanti"},
];

const PREVENZIONE = [
 {t:"Idratazione"},
 {t:"Gestione del dolore"},
 {t:"Mobilizzazione precoce"},
 {t:"Orientamento: orologio, luce naturale"},
 {t:"Occhiali e apparecchi acustici"},
 {t:"Sonno protetto"},
 {t:"Presenza dei familiari"},
];


export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 16 · Salute mentale, dipendenze e disagio psichico",
  titolo:"I quadri principali<br>e i **segni da riconoscere**", sottotitolo:"Lezione 16.2",
  ente:"CISL FP Padova Rovigo · Concorso OSS Azienda Zero"},

{id:"s02", tipo:"frase", tema:"chiaro", sopratitolo:"Modulo 16 · lezione 2 di 5",
  testo:"L'OSS **non diagnostica** e **non interpreta**."},
{id:"s03", tipo:"frase", tema:"chiaro", sopratitolo:"A che cosa serve allora questa lezione",
  testo:"A sapere **che cosa guardare**, e con **quali parole riferirlo**.",
  sotto:"Non a riconoscere una malattia."},
{id:"s04", tipo:"frase", tema:"chiaro", sopratitolo:"La distinzione che regge tutto il resto",
  testo:"Non a dire **che cosa ha** una persona: a dire **che cosa hai visto**.",
  sotto:"In modo che qualcun altro possa deciderlo."},

{id:"s05", tipo:"trappola", tema:"chiaro", attive:[0],
  sopratitolo:"Si descrivono fatti osservati, non interpretazioni", righe:RIFORMULATE},
{id:"s06", tipo:"trappola", tema:"chiaro", attive:[0,1,2],
  sopratitolo:"Si descrivono fatti osservati, non interpretazioni", righe:RIFORMULATE},
{id:"s07", tipo:"frase", tema:"chiaro", sopratitolo:"Perché la differenza conta",
  testo:"La descrizione oggettiva è **utilizzabile da chi valuta**. L'interpretazione no.",
  sotto:"Una descrizione precisa vale più di una diagnosi tentata."},
{id:"s08", tipo:"titolo", tema:"profondo",
  titolo:"Un fatto con l'ora accanto<br>diventa un **andamento**.",
  sotto:"Un'interpretazione non si può verificare, e nessuno può farci niente."},

{id:"s09", tipo:"elenco", tema:"chiaro", attive:[0,1],
  sopratitolo:"Depressione — i segni osservabili", voci:DEPRESSIONE},
{id:"s10", tipo:"elenco", tema:"chiaro",
  sopratitolo:"Depressione — i segni osservabili", voci:DEPRESSIONE},
{id:"s11", tipo:"icone", tema:"chiaro",
  sopratitolo:"Quello che l'OSS vede prima di chiunque altro", voci:OSSERVA_DEPR},

{id:"s12", tipo:"titolo", tema:"profondo",
  titolo:"Ogni riferimento a mancanza di speranza<br>va **sempre riferito**, e **subito**.",
  sotto:"O al non voler più andare avanti."},
{id:"s13", tipo:"frase", tema:"profondo", sopratitolo:"Senza minimizzare, senza rimandare a fine turno",
  testo:"Non spetta a te valutare quanto sia serio: spetta a te far sì che **qualcuno lo valuti**."},

{id:"s14", tipo:"elenco", tema:"chiaro", attive:[0,1,2,3],
  sopratitolo:"Mania — i segni", voci:MANIA},
{id:"s15", tipo:"elenco", tema:"chiaro",
  sopratitolo:"Mania — i segni", voci:MANIA},
{id:"s16", tipo:"frase", tema:"chiaro", sopratitolo:"Disturbo bipolare: alternanza di fasi depressive e maniacali",
  testo:"L'apparente euforia **non è benessere**.",
  sotto:"Nella fase maniacale la persona può non percepire di stare male."},
{id:"s17", tipo:"frase", tema:"tenue", sopratitolo:"Perché si sottovaluta",
  testo:"Chi dorme due ore e si alza pieno di progetti **non sembra una persona che sta male**.",
  sotto:"Il segno da riferire è proprio il sonno che non serve più."},

{id:"s18", tipo:"frase", tema:"chiaro", sopratitolo:"I disturbi psicotici",
  testo:"Si altera il **rapporto con la realtà**.",
  sotto:"Due sintomi che i quiz chiedono spesso, e che vanno tenuti distinti."},
{id:"s19", tipo:"confronto", tema:"chiaro", sopratitolo:"Delirio e allucinazione", col:[
  {h:"Delirio", t:"un'**idea**: falsa, e **non modificabile** con la persuasione<br>persecuzione · rovina · gelosia · grandezza"},
  {h:"Allucinazione", t:"una **percezione** senza stimolo reale<br>le **voci** sono le più frequenti"}]},
{id:"s20", tipo:"titolo", tema:"profondo",
  titolo:"Il delirio si **pensa**.<br>L'allucinazione si **percepisce**.",
  sotto:"È il modo più rapido per non confonderli."},

{id:"s21", tipo:"frase", tema:"chiaro", sopratitolo:"I sintomi negativi",
  testo:"Ritiro sociale · appiattimento affettivo · **riduzione dell'iniziativa**",
  sotto:"Spesso i più invalidanti e i meno riconosciuti, perché non fanno rumore."},
{id:"s22", tipo:"sostituzione", tema:"chiaro", sopratitolo:"Davanti a un delirio",
  da:{h:"Non si fa", t:"**confermare** o **contraddire** il contenuto"},
  a:{h:"Si fa", t:"restare sul **vissuto**"},
  sotto:"Contraddire alimenta il conflitto, assecondare rinforza il sintomo."},
{id:"s23", tipo:"frase", tema:"chiaro", sopratitolo:"La via è la terza",
  testo:"Passa dall'**emozione**, non dal contenuto."},
{id:"s24", tipo:"citazione", tema:"profondo",
  testo:"Io non lo vedo, ma capisco che per lei sia reale.",
  fonte:"Validare il vissuto senza validare il contenuto — torna nella 16.3"},

// Quattro riquadri, non tre: il DOC sta nel parlato di s27 e senza di lui
// resterebbe detto e mai mostrato — ed e' un termine che i quiz chiedono.
{id:"s25", tipo:"tre", tema:"chiaro", attive:[0], sopratitolo:"I disturbi d'ansia", box:ANSIA},
{id:"s26", tipo:"tre", tema:"chiaro", attive:[0,1], sopratitolo:"I disturbi d'ansia", box:ANSIA},
{id:"s27", tipo:"tre", tema:"chiaro", attive:[0,1,2,3], sopratitolo:"I disturbi d'ansia", box:ANSIA},
{id:"s28", tipo:"frase", tema:"tenue", sopratitolo:"La differenza che i quiz usano di più",
  testo:"Sta nel **tempo**: l'ansia generalizzata è *persistente*, l'attacco di panico è *improvviso e passa*.",
  sotto:"Chi risponde guardando solo i sintomi fisici sbaglia."},

{id:"s29", tipo:"frase", tema:"chiaro", sopratitolo:"Attacco di panico",
  testo:"I sintomi assomigliano a un **evento cardiaco o respiratorio**.",
  sotto:"Non spetta all'OSS stabilire di che cosa si tratti: si attiva chi di competenza."},
{id:"s30", tipo:"titolo", tema:"tenue",
  titolo:"Non si liquida come<br>«**è solo ansia**».",
  sotto:"Se è panico non aiuta. Se panico non è, ritarda."},
{id:"s31", tipo:"confronto", tema:"chiaro", sopratitolo:"Durante l'attacco", col:[
  {h:"Aiuta", t:"restare · tono calmo e frasi brevi · ridurre gli stimoli · rassicurare che **passerà** · respirare lentamente"},
  {h:"Non aiuta", t:"**affollare la stanza** · alzare la voce · **minimizzare**"}]},

{id:"s32", tipo:"frase", tema:"chiaro", sopratitolo:"Il quadro che l'OSS intercetta più spesso di chiunque altro",
  testo:"**Delirium**: stato confusionale *acuto*, esordio *improvviso*, andamento *fluttuante*.",
  sotto:"Causato da una condizione organica."},
{id:"s33", tipo:"titolo", tema:"chiaro",
  titolo:"Frequente nell'anziano ospedalizzato.<br>**È un'emergenza**: va riferito subito."},
{id:"s34", tipo:"sostituzione", tema:"profondo", sopratitolo:"Uno degli scambi più frequenti nei quiz",
  da:{h:"Delirio", t:"un'**idea falsa**"},
  a:{h:"Delirium", t:"uno **stato confusionale acuto**"}},
{id:"s35", tipo:"frase", tema:"tenue", sopratitolo:"Una lettera di differenza, e chi legge in fretta la salta",
  testo:"Se nella domanda compare **delirium**, la risposta giusta non parla mai di un'idea falsa."},

{id:"s36", tipo:"tabella", tema:"chiaro", sopratitolo:"Delirium e demenza — cinque parametri",
  ...DELIRIUM_DEMENZA, chiave:[0]},
{id:"s37", tipo:"tabella", tema:"chiaro", sopratitolo:"Delirium e demenza — cinque parametri",
  ...DELIRIUM_DEMENZA, chiave:[1]},
{id:"s38", tipo:"tabella", tema:"chiaro", sopratitolo:"Delirium e demenza — cinque parametri",
  ...DELIRIUM_DEMENZA, chiave:[2,3]},
{id:"s39", tipo:"tabella", tema:"chiaro", sopratitolo:"Delirium e demenza — cinque parametri",
  ...DELIRIUM_DEMENZA, chiave:[4]},
{id:"s40", tipo:"frase", tema:"tenue", sopratitolo:"Perché la distinzione non è accademica",
  testo:"Scambiare un delirium per una demenza vuol dire **lasciare in piedi una causa che si poteva togliere**."},

{id:"s41", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, attive:[0,1,2],
  sopratitolo:"Le cause del delirium — cose che l'OSS può intercettare", celle:CAUSE},
{id:"s42", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false,
  sopratitolo:"Le cause del delirium — cose che l'OSS può intercettare", celle:CAUSE},
{id:"s43", tipo:"titolo", tema:"profondo",
  titolo:"La prevenzione è<br>in gran parte **assistenziale**."},
{id:"s44", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false,
  sopratitolo:"Che cosa la previene", celle:PREVENZIONE},

{id:"s45", tipo:"frase", tema:"profondo", sopratitolo:"Perché questa lezione riguarda l'OSS più di chiunque altro",
  testo:"Il delirium si manifesta spesso **di notte**, o durante l'**assistenza di base**."},
{id:"s46", tipo:"frase", tema:"profondo", sopratitolo:"Ed è chi sta accanto alla persona a notarlo per primo",
  testo:"«**Non è come ieri**.»",
  sotto:"Quella frase, riferita subito, può portare a individuare un'infezione in corso."},
{id:"s47", tipo:"titolo", tema:"chiaro",
  titolo:"Il dato più prezioso non è il sintomo:<br>è il **cambiamento**.",
  sotto:"Da tre giorni non si alza. Da ieri non parla. Stanotte era diversa."},

{id:"s48", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione",
  titolo:"16.3", sottotitolo:"La relazione e la comunicazione<br>nel disagio psichico",
  ente:"CISL FP Padova Rovigo · Concorso OSS Azienda Zero"},
];
