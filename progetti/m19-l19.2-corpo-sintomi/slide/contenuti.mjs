// Contenuto delle 49 scene della lezione 19.2, la piu' densa del modulo.
// *accento*  **accento in semibold**
//
// Le regole del modulo sono quelle della 19.1 (vedi il suo contenuti.mjs):
// la slide e' il glossario. Ogni termine inglese sta in evidenza con la
// traduzione accanto: in `tabella` a due colonne, Inglese | Italiano, o in
// `griglia` come «**termine** · traduzione» quando le voci sono nove brevi.
// Fuori dalle tabelle il semibold e' solo per l'inglese, e l'italiano non si
// accenta (l'accento tondo esce rosso). Sui `titolo` del verde pieno ** resta
// il bianco dell'enfasi.
//
// Una riga `chiave` segna la trappola che la voce nomina: i plurali
// irregolari, stroke, to dress.
// Il velo rosa (`tenue`) sta solo sui distrattori.
//
// Le traduzioni sono quelle del copione di partenza; aggiunte solo quelle
// ovvie delle due frasi tipo, che la voce dice in inglese.

const T = ["Inglese", "Italiano"];
const tab = (righe, colonne=["50%","50%"]) => ({ intestazioni:T, colonne, righe });

const AREE = [
 {t:"Corpo"}, {t:"Sintomi"}, {t:"Condizioni"}, {t:"Parametri vitali"}, {t:"Verbi dell'assistenza"},
];

const TESTA_1 = tab([
 ["head", "testa"], ["face", "viso"], ["eye · eyes", "occhio · occhi"],
 ["ear", "orecchio"], ["nose", "naso"], ["mouth", "bocca"],
]);
const TESTA_2 = tab([
 ["lip · lips", "labbro · labbra"], ["tooth · teeth", "dente · denti"],
 ["tongue", "lingua"], ["neck", "collo"], ["throat", "gola"],
]);
const TRONCO = tab([
 ["shoulder", "spalla"], ["chest", "torace"], ["breast", "seno"], ["back", "schiena"],
 ["stomach · belly · abdomen", "stomaco · pancia · addome"], ["hip", "anca"],
]);
const TESSUTI = tab([
 ["skin", "pelle"], ["hair", "capelli"], ["bone", "osso"], ["joint", "articolazione"], ["muscle", "muscolo"],
]);

const BRACCIO = tab([
 ["arm", "braccio"], ["elbow", "gomito"], ["wrist", "polso"], ["hand", "mano"], ["finger", "dito della mano"],
]);
const GAMBA = tab([
 ["leg", "gamba"], ["knee", "ginocchio"], ["ankle", "caviglia"], ["foot · feet", "piede · piedi"], ["toe", "dito del piede"],
]);
const ORGANI = [
 {t:"**heart** · cuore"}, {t:"**lung** · polmone"}, {t:"**liver** · fegato"},
 {t:"**kidney** · rene"}, {t:"**brain** · cervello"}, {t:"**blood** · sangue"},
 {t:"**vein** · vena"}, {t:"**bladder** · vescica"}, {t:"**bowel** · intestino"},
];
const LATI = tab([
 ["left", "sinistro"], ["right", "destro"], ["left arm · right leg", "braccio sinistro · gamba destra"],
]);

const DOLORE = tab([
 ["pain", "dolore"], ["ache", "dolore sordo"], ["headache", "mal di testa"],
 ["backache", "mal di schiena"], ["stomach ache", "mal di pancia"],
]);
const SINTOMI_1 = tab([
 ["fever · temperature", "febbre"], ["chills", "brividi"], ["sweating", "sudorazione"],
 ["cough", "tosse"], ["shortness of breath · breathless", "affanno"], ["wheezing", "respiro sibilante"],
], ["55%","45%"]);
const SINTOMI_2 = tab([
 ["nausea", "nausea"], ["vomiting", "vomito"], ["diarrhoea", "diarrea"], ["constipation", "stipsi"],
 ["dizziness", "vertigine"], ["weakness", "debolezza"], ["tiredness · fatigue", "stanchezza"],
]);
const SINTOMI_3 = tab([
 ["swelling", "gonfiore"], ["rash", "eruzione cutanea"], ["itching", "prurito"], ["bleeding", "sanguinamento"],
]);

const CONDIZIONI_1 = tab([
 ["illness · disease · sickness", "malattia"], ["injury", "lesione da trauma"], ["wound", "ferita"],
 ["infection", "infezione"], ["inflammation", "infiammazione"], ["fracture", "frattura"],
]);
const CONDIZIONI_2 = tab([
 ["pressure ulcer · pressure sore · bedsore", "lesione da pressione"], ["fall", "caduta"], ["stroke", "ictus"],
], ["60%","40%"]);
const CONDIZIONI_3 = tab([
 ["heart attack", "infarto"], ["diabetes", "diabete"], ["dementia", "demenza"],
 ["disability", "disabilità"], ["chronic", "cronico"], ["acute", "acuto"],
]);
const CONDIZIONI_4 = tab([
 ["unconscious", "incosciente"], ["confused", "confuso"], ["in pain", "che ha dolore"],
 ["the patient is in pain", "il paziente ha dolore"],
]);

const PARAMETRI_1 = tab([
 ["vital signs", "parametri vitali"], ["temperature", "temperatura"],
 ["blood pressure", "pressione arteriosa"], ["pulse · heart rate", "polso · frequenza cardiaca"],
], ["45%","55%"]);
const PARAMETRI_2 = tab([
 ["breathing · respiratory rate", "respirazione · frequenza respiratoria"], ["oxygen saturation", "saturazione"],
 ["high", "alto"], ["low", "basso"], ["normal", "normale"],
], ["45%","55%"]);
const PARAMETRI_3 = tab([
 ["to measure · to take · to check", "rilevare"], ["to record", "registrare"],
 ["to report", "riferire"], ["chart", "scheda · cartella"],
]);

const ASSISTERE_1 = tab([
 ["to help", "aiutare"], ["to assist", "assistere"], ["to care for", "prendersi cura di"], ["to look after", "badare a"],
]);
const ASSISTERE_2 = tab([
 ["to wash", "lavare"], ["to bathe", "fare il bagno"], ["to shower", "fare la doccia"],
 ["to dry", "asciugare"], ["to dress", "vestire · anche medicare"], ["to undress", "spogliare"],
]);
const ASSISTERE_3 = tab([
 ["to comb", "pettinare"], ["to shave", "radere"], ["to feed", "imboccare · alimentare"],
 ["to eat", "mangiare"], ["to drink", "bere"], ["to swallow", "deglutire"],
]);
const ASSISTERE_4 = tab([
 ["to lift", "sollevare"], ["to move", "muovere"], ["to turn", "girare"],
 ["to transfer", "trasferire"], ["to walk", "camminare"],
]);

const OSSERVARE_1 = tab([
 ["to observe · to watch", "osservare"], ["to check", "controllare"], ["to notice", "notare"], ["to report", "riferire"],
]);
const OSSERVARE_2 = tab([
 ["to record · to write down", "registrare"], ["to inform", "informare"], ["to call", "chiamare"],
 ["to ask", "chiedere"], ["to answer", "rispondere"], ["to listen", "ascoltare"],
]);
const OSSERVARE_3 = [
 {t:"**to explain** · spiegare"}, {t:"**to reassure** · rassicurare"}, {t:"**to comfort** · confortare"},
 {t:"**to rest** · riposare"}, {t:"**to sleep** · dormire"}, {t:"**to wake up** · svegliarsi"},
 {t:"**to fall** · cadere"}, {t:"**to complain** · lamentarsi"}, {t:"**complains of pain** · lamenta dolore"},
];

const CURA_1 = tab([
 ["care", "assistenza · cura"], ["treatment", "trattamento"], ["therapy", "terapia"],
 ["medicine · drug · medication", "farmaco"],
]);
const CURA_2 = tab([
 ["tablet · pill", "compressa"], ["injection", "iniezione"], ["dose", "dose"], ["prescription", "prescrizione"],
 ["dressing", "medicazione"], ["bandage", "benda"], ["plaster", "cerotto"],
]);
const CURA_3 = tab([
 ["syringe", "siringa"], ["needle", "ago"], ["catheter", "catetere"],
 ["drip · IV", "flebo"], ["oxygen", "ossigeno"], ["thermometer", "termometro"],
]);
const CURA_4 = tab([
 ["diet", "dieta"], ["meal", "pasto"], ["breakfast · lunch · dinner", "colazione · pranzo · cena"], ["water", "acqua"],
]);

const SICUREZZA_1 = tab([
 ["safety", "sicurezza"], ["safe", "sicuro"], ["risk", "rischio"], ["danger · dangerous", "pericolo · pericoloso"],
 ["hygiene", "igiene"], ["clean", "pulito"], ["dirty", "sporco"],
]);
const SICUREZZA_2 = tab([
 ["to disinfect", "disinfettare"], ["hand washing · hand hygiene", "igiene delle mani"],
 ["to wear gloves", "indossare i guanti"], ["infection control", "controllo delle infezioni"], ["isolation", "isolamento"],
]);
const SICUREZZA_3 = tab([
 ["waste", "rifiuti"], ["sharps", "taglienti"], ["to dispose of", "smaltire"],
 ["emergency", "emergenza"], ["first aid", "primo soccorso"], ["to call for help", "chiedere aiuto"],
]);

const STATO_1 = tab([
 ["well", "bene"], ["unwell · ill · sick", "malato"], ["better", "meglio"], ["worse", "peggio"],
]);
const STATO_2 = [
 {t:"**tired** · stanco"}, {t:"**weak** · debole"}, {t:"**strong** · forte"},
 {t:"**comfortable** · comodo"}, {t:"**uncomfortable** · scomodo"}, {t:"**hot** · caldo"},
 {t:"**cold** · freddo"}, {t:"**hungry** · affamato"}, {t:"**thirsty** · assetato"},
];
const STATO_3 = [
 {t:"**awake** · sveglio"}, {t:"**asleep** · addormentato"}, {t:"**alert** · vigile"},
 {t:"**drowsy** · sonnolento"}, {t:"**anxious** · ansioso"}, {t:"**calm** · calmo"},
 {t:"**upset** · turbato"}, {t:"**agitated** · agitato"}, {t:"**feels better** · si sente meglio"},
];

const DISTRATTORI_1 = [
 {sb:"stroke = colpo", ok:"**stroke** = ictus"},
 {sb:"drip = goccia", ok:"**drip** = flebo"},
];
const DISTRATTORI_2 = [
 {sb:"plaster = solo cerotto", ok:"**plaster** = cerotto, ma anche gesso"},
 {sb:"dressing = vestizione", ok:"**dressing** = medicazione · **to dress** = vestire e medicare"},
];
const DISTRATTORI_3 = [
 {sb:"ache = qualunque dolore", ok:"**ache** si combina: **headache**, **backache** · **pain** è il dolore in generale"},
 {sb:"foots, tooths", ok:"**foot** · **feet** · **tooth** · **teeth**: plurali irregolari"},
];
const DISTRATTORI_4 = [
 {sb:"chart = carta", ok:"**chart** = cartella clinica"},
 {sb:"tablet = solo il dispositivo", ok:"**tablet** = compressa, oltre che il dispositivo"},
];

const RIEPILOGO = [
 "Corpo: **head** · **chest** · **back** · **arm** · **leg** · **hand** · **foot**/**feet** · **skin** · **heart** · **lung** · **blood**",
 "Sintomi: **pain** · **ache** · **fever** · **cough** · **breathless** · **nausea** · **dizziness** · **swelling** · **bleeding**",
 "Condizioni: **illness** · **injury** · **wound** · **infection** · **fracture** · **pressure ulcer** · **fall** · **stroke**",
 "Parametri: **vital signs** · **temperature** · **blood pressure** · **pulse** · **saturation** · **to&nbsp;take** · **to&nbsp;record**",
 "Verbi: **help** · **wash** · **dress** · **feed** · **lift** · **turn** · **observe** · **report** · **call** · **reassure**",
 "Presidi: **medicine** · **tablet** · **dressing** · **catheter** · **drip** · **gloves**",
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 19 · Inglese per il concorso",
  titolo:"Il corpo, i sintomi,<br>**i parametri**", sottotitolo:"Lezione 19.2",
  ente:"CISL FP Padova Rovigo · Concorso OSS Azienda Zero"},

{id:"s02", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false,
  sopratitolo:"Il lessico che compare in ogni quesito sanitario", celle:AREE},
{id:"s03", tipo:"titolo", tema:"profondo",
  titolo:"La lezione più densa: **va ascoltata più di una volta**.",
  sotto:"Le slide sono il glossario: la voce ti guida, le slide si rileggono."},

{id:"s04", tipo:"tabella", tema:"chiaro", sopratitolo:"Il corpo · la testa", ...TESTA_1},
{id:"s05", tipo:"tabella", tema:"chiaro", chiave:[1],
  sopratitolo:"Il corpo · la testa · teeth, plurale irregolare", ...TESTA_2},
{id:"s06", tipo:"tabella", tema:"chiaro", sopratitolo:"Il corpo · il tronco", ...TRONCO},
{id:"s07", tipo:"tabella", tema:"chiaro", sopratitolo:"Il corpo", ...TESSUTI},

{id:"s08", tipo:"tabella", tema:"chiaro", sopratitolo:"Gli arti", ...BRACCIO},
{id:"s09", tipo:"tabella", tema:"chiaro", chiave:[3],
  sopratitolo:"Gli arti · feet, altro plurale irregolare", ...GAMBA},
{id:"s10", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false,
  sopratitolo:"Gli organi", celle:ORGANI},
{id:"s11", tipo:"tabella", tema:"chiaro", sopratitolo:"Compaiono spesso", ...LATI},

{id:"s12", tipo:"tabella", tema:"chiaro", sopratitolo:"I sintomi · ache si combina", ...DOLORE},
{id:"s13", tipo:"tabella", tema:"chiaro", sopratitolo:"I sintomi", ...SINTOMI_1},
{id:"s14", tipo:"tabella", tema:"chiaro", sopratitolo:"I sintomi", ...SINTOMI_2},
{id:"s15", tipo:"tabella", tema:"chiaro", sopratitolo:"I sintomi", ...SINTOMI_3},

{id:"s16", tipo:"tabella", tema:"chiaro", sopratitolo:"Le condizioni", ...CONDIZIONI_1},
{id:"s17", tipo:"tabella", tema:"chiaro", chiave:[2],
  sopratitolo:"Le condizioni · stroke non è un colpo generico", ...CONDIZIONI_2},
{id:"s18", tipo:"tabella", tema:"chiaro", sopratitolo:"Le condizioni", ...CONDIZIONI_3},
{id:"s19", tipo:"tabella", tema:"chiaro", sopratitolo:"Le condizioni", ...CONDIZIONI_4},

{id:"s20", tipo:"tabella", tema:"chiaro", sopratitolo:"I parametri vitali", ...PARAMETRI_1},
{id:"s21", tipo:"tabella", tema:"chiaro", sopratitolo:"I parametri vitali", ...PARAMETRI_2},
{id:"s22", tipo:"tabella", tema:"chiaro", sopratitolo:"I parametri vitali · i verbi", ...PARAMETRI_3},
{id:"s23", tipo:"titolo", tema:"profondo",
  titolo:"**The nurse takes the blood pressure.**",
  sotto:"L'infermiere rileva la pressione. E: the temperature is high, la temperatura è alta."},

{id:"s24", tipo:"tabella", tema:"chiaro", sopratitolo:"I verbi dell'assistenza · quelli dei completamenti", ...ASSISTERE_1},
{id:"s25", tipo:"tabella", tema:"chiaro", chiave:[4],
  sopratitolo:"I verbi dell'assistenza · to dress, anche medicare", ...ASSISTERE_2},
{id:"s26", tipo:"tabella", tema:"chiaro", sopratitolo:"I verbi dell'assistenza", ...ASSISTERE_3},
{id:"s27", tipo:"tabella", tema:"chiaro", sopratitolo:"I verbi dell'assistenza", ...ASSISTERE_4},

{id:"s28", tipo:"tabella", tema:"chiaro", sopratitolo:"I verbi dell'osservazione", ...OSSERVARE_1},
{id:"s29", tipo:"tabella", tema:"chiaro", sopratitolo:"I verbi della comunicazione", ...OSSERVARE_2},
{id:"s30", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false,
  sopratitolo:"I verbi della comunicazione", celle:OSSERVARE_3},

{id:"s31", tipo:"tabella", tema:"chiaro", sopratitolo:"Cura e farmaci", ...CURA_1},
{id:"s32", tipo:"tabella", tema:"chiaro", sopratitolo:"Farmaci e medicazioni", ...CURA_2},
{id:"s33", tipo:"tabella", tema:"chiaro", sopratitolo:"I presidi", ...CURA_3},
{id:"s34", tipo:"tabella", tema:"chiaro", sopratitolo:"I pasti", ...CURA_4},

{id:"s35", tipo:"tabella", tema:"chiaro", sopratitolo:"Sicurezza e igiene", ...SICUREZZA_1},
{id:"s36", tipo:"tabella", tema:"chiaro", sopratitolo:"Sicurezza e igiene", ...SICUREZZA_2},
{id:"s37", tipo:"tabella", tema:"chiaro", sopratitolo:"Sicurezza ed emergenza", ...SICUREZZA_3},

{id:"s38", tipo:"tabella", tema:"chiaro", sopratitolo:"Gli aggettivi dello stato · come sta la persona", ...STATO_1},
{id:"s39", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false,
  sopratitolo:"Gli aggettivi dello stato", celle:STATO_2},
{id:"s40", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false,
  sopratitolo:"Gli aggettivi dello stato · the patient feels better", celle:STATO_3},

{id:"s41", tipo:"trappola", tema:"tenue", sopratitolo:"I distrattori tipici", righe:DISTRATTORI_1},
{id:"s42", tipo:"trappola", tema:"tenue", sopratitolo:"I distrattori tipici", righe:DISTRATTORI_2},
{id:"s43", tipo:"trappola", tema:"tenue", sopratitolo:"I distrattori tipici", righe:DISTRATTORI_3},
{id:"s44", tipo:"trappola", tema:"tenue", sopratitolo:"I distrattori tipici", righe:DISTRATTORI_4},

{id:"s45", tipo:"memo", tema:"chiaro", attive:[0,1], sopratitolo:"Riepilogo", voci:RIEPILOGO},
{id:"s46", tipo:"memo", tema:"chiaro", attive:[0,1,2,3], sopratitolo:"Riepilogo", voci:RIEPILOGO},
{id:"s47", tipo:"memo", tema:"chiaro", sopratitolo:"Riepilogo", voci:RIEPILOGO},
{id:"s48", tipo:"frase", tema:"chiaro", sopratitolo:"Prossima lezione",
  testo:"Frasi, dialoghi in reparto e falsi amici."},

{id:"s49", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione",
  titolo:"19.3", sottotitolo:"Frasi, dialoghi in reparto e **falsi amici**",
  ente:"CISL FP Padova Rovigo · Concorso OSS Azienda Zero"},
];
