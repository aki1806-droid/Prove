// Contenuto delle 49 scene della lezione 19.1, la prima del modulo di inglese.
// accento  **accento in semibold**
//
// La regola del modulo, dal documento: «la slide e' il glossario, la voce e'
// la guida». Ogni termine inglese sta in evidenza con la traduzione accanto.
// In pratica:
//   - il glossario e' una `tabella` a due colonne, Inglese | Italiano: la
//     prima colonna esce in verde semibold da sola, la seconda in tondo;
//   - fuori dalle tabelle il semibold (**) e' riservato ai termini inglesi;
//     un accento su una parola italiana, quando serve, e' tondo colorato;
//   - il documento chiede «grassetto o arancio»: l'arancio non e' nella
//     palette del logo, resta il grassetto.
//
// Una riga `chiave` (velo rosa sulla riga) segna il termine che la voce dice
// «tra i piu' chiesti», o che compare spesso: ward, next of kin.
// Il velo rosa pieno (`tenue`) sta solo sui distrattori.
//
// Nessun termine o traduzione che non stia nel copione di partenza, salvo le
// traduzioni dei giorni della settimana e dei numeri (cifre), che la voce
// elenca in inglese e lo schermo del documento lascia senza traduzione.

const T = ["Inglese", "Italiano"];

const QUESITI = [
 {t:"Traduzione di un termine", d:"«Quale termine inglese indica il reparto?»"},
 {t:"Completamento di una frase", d:"«**The nurse ___ the patient's temperature**»"},
 {t:"Comprensione di un testo breve", d:"una frase o un paragrafo, poi una domanda"},
 {t:"A volte: abbinamento termine e definizione", d:"oppure sinonimo o contrario"},
];

const METODO = [
 {t:"Il lessico, non la grammatica", d:"duecento parole coprono quasi tutti i quesiti"},
 {t:"Per aree", d:"persone, luoghi, corpo, sintomi, azioni, presidi"},
 {t:"Le radici comuni", d:"**hospital** · **patient** · **infection** · **medicine**"},
 {t:"Si impara a escludere", d:"bastano due parole riconosciute su quattro"},
 {t:"Dieci minuti al giorno", d:"per quattro settimane · la grammatica nella 19.4"},
];

const LAVORA_1 = { intestazioni:T, colonne:["50%","50%"], righe:[
 ["nurse", "infermiere"],
 ["head nurse · charge nurse", "coordinatore"],
 ["doctor · physician", "medico"],
 ["surgeon", "chirurgo"],
 ["specialist", "specialista"],
]};
const LAVORA_2 = { intestazioni:T, colonne:["50%","50%"], righe:[
 ["physiotherapist", "fisioterapista"],
 ["social worker", "assistente sociale"],
 ["staff", "personale"],
 ["team", "équipe"],
 ["shift", "turno"],
 ["morning shift · night shift", "turno di mattina · di notte"],
]};

const ASSISTITI_1 = { intestazioni:T, colonne:["45%","55%"], righe:[
 ["patient", "paziente"],
 ["resident", "ospite di una struttura residenziale"],
 ["elderly person · older adult", "persona anziana"],
]};
const ASSISTITI_2 = { intestazioni:T, colonne:["45%","55%"], righe:[
 ["relative · family member", "familiare"],
 ["carer · caregiver", "chi assiste"],
 ["next of kin", "il parente più prossimo"],
]};
const ASSISTITI_3 = { intestazioni:T, colonne:["55%","45%"], righe:[
 ["disabled person · person with a disability", "persona con disabilità"],
 ["child", "bambino"],
 ["the elderly", "gli anziani in generale"],
]};

const LUOGHI_1 = { intestazioni:T, colonne:["50%","50%"], righe:[
 ["hospital", "ospedale"],
 ["ward", "reparto"],
 ["room", "stanza"],
 ["bed", "letto"],
]};
const LUOGHI_2 = { intestazioni:T, colonne:["60%","40%"], righe:[
 ["emergency room · A&E · emergency department", "pronto soccorso"],
 ["operating theatre", "sala operatoria"],
 ["intensive care unit · ICU", "terapia intensiva"],
]};
const LUOGHI_3 = { intestazioni:T, colonne:["50%","50%"], righe:[
 ["outpatient clinic", "ambulatorio"],
 ["nursing home · care home", "casa di riposo"],
 ["hospice", "hospice"],
 ["day centre", "centro diurno"],
 ["pharmacy", "farmacia"],
]};
const LUOGHI_4 = { intestazioni:T, colonne:["50%","50%"], righe:[
 ["toilet · bathroom", "bagno"],
 ["corridor", "corridoio"],
 ["kitchen", "cucina"],
]};

const OGGETTI_1 = { intestazioni:T, colonne:["50%","50%"], righe:[
 ["wheelchair", "carrozzina"],
 ["stretcher · trolley", "barella"],
 ["walking frame", "deambulatore"],
 ["walking stick · cane", "bastone"],
 ["crutches", "stampelle"],
 ["hoist", "sollevatore"],
]};
const OGGETTI_2 = { intestazioni:T, colonne:["50%","50%"], righe:[
 ["sheet", "lenzuolo"],
 ["blanket", "coperta"],
 ["pillow", "cuscino"],
 ["towel", "asciugamano"],
 ["bedpan", "padella"],
 ["urinal · bottle", "pappagallo"],
]};
const OGGETTI_3 = { intestazioni:T, colonne:["50%","50%"], righe:[
 ["call bell · buzzer", "campanello di chiamata"],
 ["gloves", "guanti"],
 ["mask", "mascherina"],
 ["apron · gown", "grembiule · camice"],
]};

const NUMERI = { intestazioni:T, colonne:["70%","30%"], righe:[
 ["one, two, three, four, five", "1 · 2 · 3 · 4 · 5"],
 ["six, seven, eight, nine, ten", "6 · 7 · 8 · 9 · 10"],
 ["eleven, twelve, thirteen, fourteen, fifteen", "11 · 12 · 13 · 14 · 15"],
 ["twenty, thirty, forty, fifty", "20 · 30 · 40 · 50"],
 ["hundred", "100"],
]};
const GIORNI = { intestazioni:T, colonne:["55%","45%"], righe:[
 ["Monday · Tuesday · Wednesday · Thursday", "lunedì · martedì · mercoledì · giovedì"],
 ["Friday · Saturday · Sunday", "venerdì · sabato · domenica"],
 ["morning", "mattina"],
 ["afternoon", "pomeriggio"],
 ["evening", "sera"],
 ["night", "notte"],
]};
const TEMPO = { intestazioni:T, colonne:["50%","50%"], righe:[
 ["today", "oggi"],
 ["tomorrow", "domani"],
 ["yesterday", "ieri"],
 ["every day", "ogni giorno"],
 ["What time is it?", "Che ore sono?"],
 ["at eight o'clock", "alle otto"],
]};

const COLLEGA_1 = { intestazioni:T, colonne:["50%","50%"], righe:[
 ["and", "e"], ["or", "o"], ["but", "ma"], ["because", "perché"], ["so", "quindi"],
]};
const COLLEGA_2 = [
 {t:"**if** · se"}, {t:"**when** · quando"}, {t:"**while** · mentre"},
 {t:"**before** · prima"}, {t:"**after** · dopo"}, {t:"**often** · spesso"},
 {t:"**always** · sempre"}, {t:"**never** · mai"}, {t:"**sometimes** · a volte"},
];
const COLLEGA_3 = { intestazioni:T, colonne:["50%","50%"], righe:[
 ["every", "ogni"], ["all", "tutti"], ["some", "alcuni"], ["no · none", "nessuno"],
]};

const RADICI_1 = [
 {t:"**hospital** · ospedale"}, {t:"**patient** · paziente"}, {t:"**doctor** · dottore"},
 {t:"**infection** · infezione"}, {t:"**medicine** · medicina"}, {t:"**therapy** · terapia"},
];
const RADICI_2 = [
 {t:"**temperature** · temperatura"}, {t:"**pressure** · pressione"}, {t:"**emergency** · emergenza"},
 {t:"**operation** · operazione"}, {t:"**diagnosis** · diagnosi"}, {t:"**hygiene** · igiene"},
 {t:"**nutrition** · nutrizione"}, {t:"**disability** · disabilità"}, {t:"**mobility** · mobilità"},
 {t:"**hospice** · hospice"}, {t:"**pharmacy** · farmacia"}, {t:"**protocol** · protocollo"},
 {t:"**procedure** · procedura"}, {t:"**document** · documento"},
];

const MEMORIA = [
 {t:"Per aree", d:"non in ordine alfabetico"},
 {t:"A voce", d:"leggere e ripetere: la memoria uditiva aiuta"},
 {t:"Con la frase", d:"non «**ward** = reparto», ma «**the patient is in the ward**»"},
 {t:"Con le coppie", d:"**nurse** e **doctor** · **sheet** e **blanket** · **morning** e **night**"},
];

const DISTRATTORI_1 = [
 {sb:"ward = guardia", ok:"**ward** = reparto"},
 {sb:"nurse = nutrice", ok:"**nurse** = infermiere"},
];
const DISTRATTORI_2 = [
 {sb:"resident = residente anagrafico", ok:"**resident** = ospite di una struttura"},
 {sb:"stretcher = stretto", ok:"**stretcher** = barella · **hoist** = sollevatore"},
];
const DISTRATTORI_3 = [
 {sb:"Le sigle si indovinano", ok:"**A&E** = pronto soccorso · **ICU** = terapia intensiva"},
];

const RIEPILOGO = [
 "Tre tipi di quesito: traduzione, completamento, comprensione",
 "Il lessico, per aree, dieci minuti al giorno",
 "**nurse** · **doctor** · **healthcare assistant** · **patient** · **resident** · **carer** · **next of kin**",
 "**hospital** · **ward** · **bed** · **A&E** · **ICU** · **nursing home** · **operating theatre**",
 "**wheelchair** · **stretcher** · **hoist** · **sheet** · **blanket** · **pillow** · **bedpan** · **call bell**",
 "**never** e **always** rovesciano il senso",
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 19 · Inglese per il concorso",
  titolo:"Che cosa chiede,<br>**il lessico di base**", sottotitolo:"Lezione 19.1",
  ente:"CISL FP Padova Rovigo · Concorso OSS Azienda Zero"},

{id:"s02", tipo:"frase", tema:"chiaro", sopratitolo:"Modulo 19 · lezione 1 di 5 · l'ultimo modulo bonus",
  testo:"Un modulo intero di inglese per il concorso."},
{id:"s03", tipo:"frase", tema:"chiaro", sopratitolo:"Dopo la lezione introduttiva del Modulo 15",
  testo:"Qui la espandiamo in cinque lezioni complete."},
{id:"s04", tipo:"titolo", tema:"profondo",
  titolo:"Il livello richiesto è **elementare**.",
  sotto:"Non serve parlare inglese, non serve saperlo scrivere."},
{id:"s05", tipo:"frase", tema:"chiaro", sopratitolo:"Che cosa serve",
  testo:"Riconoscere un lessico limitato e ricorrente, e rispondere a tre tipi di quesito."},

{id:"s06", tipo:"elenco", tema:"chiaro", numerato:true, attive:[0], marcatori:["1","2","3","+"],
  sopratitolo:"I tre tipi di quesito", voci:QUESITI},
{id:"s07", tipo:"elenco", tema:"chiaro", numerato:true, attive:[0,1], marcatori:["1","2","3","+"],
  sopratitolo:"I tre tipi di quesito", voci:QUESITI},
{id:"s08", tipo:"elenco", tema:"chiaro", numerato:true, marcatori:["1","2","3","+"],
  sopratitolo:"I tre tipi di quesito", voci:QUESITI},
{id:"s09", tipo:"titolo", tema:"profondo",
  titolo:"Il concorso non chiede di produrre inglese: **chiede di capirlo**.",
  sotto:"Ed è un'abilità molto più facile da costruire."},

{id:"s10", tipo:"elenco", tema:"chiaro", attive:[0], sopratitolo:"Il metodo", voci:METODO},
{id:"s11", tipo:"elenco", tema:"chiaro", attive:[0,1], sopratitolo:"Il metodo", voci:METODO},
{id:"s12", tipo:"elenco", tema:"chiaro", attive:[0,1,2,3], sopratitolo:"Il metodo", voci:METODO},
{id:"s13", tipo:"elenco", tema:"chiaro", sopratitolo:"Il metodo", voci:METODO},

{id:"s14", tipo:"tabella", tema:"chiaro", sopratitolo:"Le persone · chi lavora", ...LAVORA_1},
{id:"s15", tipo:"frase", tema:"chiaro", sopratitolo:"L'OSS in inglese · tre modi, una figura",
  testo:"**healthcare assistant** · **nursing assistant** · **care worker**",
  sotto:"Tutti indicano l'operatore socio sanitario."},
{id:"s16", tipo:"tabella", tema:"chiaro", sopratitolo:"Le persone · chi lavora", ...LAVORA_2},

{id:"s17", tipo:"tabella", tema:"chiaro", sopratitolo:"Le persone · chi è assistito", ...ASSISTITI_1},
{id:"s18", tipo:"tabella", tema:"chiaro", chiave:[2],
  sopratitolo:"Le persone · chi è assistito · next of kin compare spesso", ...ASSISTITI_2},
{id:"s19", tipo:"tabella", tema:"chiaro", sopratitolo:"Le persone · chi è assistito", ...ASSISTITI_3},

{id:"s20", tipo:"tabella", tema:"chiaro", chiave:[1],
  sopratitolo:"I luoghi · ward è tra i termini più chiesti", ...LUOGHI_1},
{id:"s21", tipo:"tabella", tema:"chiaro", sopratitolo:"I luoghi", ...LUOGHI_2},
{id:"s22", tipo:"tabella", tema:"chiaro", sopratitolo:"I luoghi", ...LUOGHI_3},
{id:"s23", tipo:"tabella", tema:"chiaro", sopratitolo:"I luoghi", ...LUOGHI_4},

{id:"s24", tipo:"tabella", tema:"chiaro", sopratitolo:"Gli oggetti del reparto", ...OGGETTI_1},
{id:"s25", tipo:"tabella", tema:"chiaro", sopratitolo:"Gli oggetti del reparto", ...OGGETTI_2},
{id:"s26", tipo:"tabella", tema:"chiaro", sopratitolo:"Gli oggetti del reparto", ...OGGETTI_3},

{id:"s27", tipo:"tabella", tema:"chiaro", sopratitolo:"I numeri · nei testi di comprensione", ...NUMERI},
{id:"s28", tipo:"tabella", tema:"chiaro", sopratitolo:"I giorni e le parti del giorno", ...GIORNI},
{id:"s29", tipo:"tabella", tema:"chiaro", sopratitolo:"Il tempo", ...TEMPO},

{id:"s30", tipo:"tabella", tema:"chiaro", sopratitolo:"Le parole di collegamento · decidono il senso", ...COLLEGA_1},
{id:"s31", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false,
  sopratitolo:"Le parole di collegamento", celle:COLLEGA_2},
{id:"s32", tipo:"tabella", tema:"chiaro", sopratitolo:"Le parole di collegamento", ...COLLEGA_3},
{id:"s33", tipo:"titolo", tema:"profondo",
  titolo:"Una frase con **never** e una con **always** dicono il contrario.",
  sotto:"E il quesito di comprensione gioca proprio su questo."},

{id:"s34", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false,
  sopratitolo:"Le radici comuni · il vantaggio di chi parla italiano", celle:RADICI_1},
{id:"s35", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false,
  sopratitolo:"Quasi identiche all'italiano", celle:RADICI_2},
{id:"s36", tipo:"titolo", tema:"profondo",
  titolo:"Se somiglia all'italiano, **quasi sempre significa la stessa cosa**.",
  sotto:"La regola pratica delle radici comuni."},
{id:"s37", tipo:"frase", tema:"chiaro", sopratitolo:"Le eccezioni · lezione 19.3",
  testo:"I falsi amici esistono, ma sono pochi. Tutto il resto è un regalo."},

{id:"s38", tipo:"elenco", tema:"chiaro", attive:[0,1], sopratitolo:"Come si memorizza", voci:MEMORIA},
{id:"s39", tipo:"elenco", tema:"chiaro", sopratitolo:"Come si memorizza", voci:MEMORIA},
{id:"s40", tipo:"frase", tema:"chiaro", sopratitolo:"Ripasso breve e frequente · dieci minuti al giorno",
  testo:"Le slide di queste cinque lezioni sono il glossario da rivedere fino alla prova."},

{id:"s41", tipo:"trappola", tema:"tenue", sopratitolo:"I distrattori tipici", righe:DISTRATTORI_1},
{id:"s42", tipo:"trappola", tema:"tenue", sopratitolo:"I distrattori tipici", righe:DISTRATTORI_2},
{id:"s43", tipo:"trappola", tema:"tenue", sopratitolo:"I distrattori tipici · le sigle vanno sapute", righe:DISTRATTORI_3},
{id:"s44", tipo:"titolo", tema:"profondo",
  titolo:"**Never** e **always** rovesciano il senso.",
  sotto:"Nei quesiti di comprensione sono la prima cosa da cercare."},

{id:"s45", tipo:"memo", tema:"chiaro", attive:[0,1], sopratitolo:"Riepilogo", voci:RIEPILOGO},
{id:"s46", tipo:"memo", tema:"chiaro", attive:[0,1,2,3], sopratitolo:"Riepilogo", voci:RIEPILOGO},
{id:"s47", tipo:"memo", tema:"chiaro", sopratitolo:"Riepilogo", voci:RIEPILOGO},
{id:"s48", tipo:"frase", tema:"chiaro", sopratitolo:"Prossima lezione",
  testo:"Il corpo, i sintomi, i parametri e le azioni assistenziali."},

{id:"s49", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione",
  titolo:"19.2", sottotitolo:"Il corpo, i sintomi, i parametri e **le azioni assistenziali**",
  ente:"CISL FP Padova Rovigo · Concorso OSS Azienda Zero"},
];
