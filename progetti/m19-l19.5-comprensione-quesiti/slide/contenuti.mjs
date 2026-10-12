// Contenuto delle 50 scene della lezione 19.5: comprensione dei testi,
// diciotto quesiti risolti, quadro del modulo e chiusura del corso.
// *accento*  **accento in semibold**
//
// Le regole del modulo sono quelle della 19.1: la slide e' il glossario, la
// voce e' la guida; il semibold e' solo per l'inglese, e l'italiano non si
// accenta col markup (l'accento tondo esce rosso).
//
// Due layout nuovi, in layout.mjs:
//  - `quesiti`: la domanda e le quattro opzioni. Ogni blocco dei capitoli 4-8
//    chiude un quesito con tre secondi di posa (il tempo per provare) e apre
//    il successivo con la risposta: la slide mostra sopra il quesito appena
//    risolto, con la risposta in verde pieno e le altre opzioni smorzate, e
//    sotto quello aperto, con le opzioni tutte uguali;
//  - `testo`: il brano del testo tipo, acceso frase per frase mentre la voce
//    lo legge; nell'ultimo blocco le parole da riconoscere in semibold.
//
// Domande, opzioni e risposte sono quelle del copione di partenza.

const Q = [
 {n:"1", d:"**Where does Mrs Green live?**", o:["at home","in a hospital","in a nursing home","with her daughter"], g:2},
 {n:"2", d:"**Who helps her wash and dress?**", o:["the nurse","the doctor","her son","the healthcare assistant"], g:3},
 {n:"3", d:"**Can she walk?**", o:["no, she cannot","yes, with a walking frame","only in bed","only with the nurse"], g:1},
 {n:"4", d:"**Why did she not eat her lunch?**", o:["she was not hungry","she had a headache","she was asleep","the food was cold"], g:1},
 {n:"5", d:"**What did the nurse check?**", o:["her blood pressure","her pulse","her temperature","her weight"], g:2},
 {n:"6", d:"**Was the temperature high?**", o:["yes","no, it was normal","the text does not say","it was low"], g:1},
 {n:"7", d:"Quale termine inglese indica il reparto?", o:["room","ward","bed","hall"], g:1},
 {n:"8", d:"**Wheelchair** significa:", o:["barella","deambulatore","carrozzina","sollevatore"], g:2},
 {n:"9", d:"Quale termine indica la lesione da pressione?", o:["wound","pressure ulcer","fracture","rash"], g:1},
 {n:"10", d:"**To swallow** significa:", o:["respirare","deglutire","tossire","dormire"], g:1},
 {n:"11", d:"**The nurse ___ the patient's temperature every morning.**", o:["take","takes","taking","is take"], g:1},
 {n:"12", d:"**Mrs Rossi ___ now.**", o:["sleeps","sleep","is sleeping","slept"], g:2},
 {n:"13", d:"**You ___ wash your hands before every patient.**", o:["can","must","may","should not"], g:1},
 {n:"14", d:"**There ___ three patients in the room.**", o:["is","are","has","have"], g:1},
 {n:"15", d:"**The patient has a temperature** significa che il paziente:", o:["ha freddo","ha la febbre","ha sete","è confuso"], g:1},
 {n:"16", d:"**I am going to help you get up** significa:", o:["la ho aiutata","sto per aiutarla ad alzarsi","non posso aiutarla","chiamo aiuto"], g:1},
 {n:"17", d:"**The patient complains of pain** significa:", o:["non ha dolore","lamenta dolore","ha paura","dorme"], g:1},
 {n:"18", d:"**Do not move him** significa:", o:["muovilo","chiamalo","non spostarlo","aiutalo"], g:2},
];
// il quesito k (da 1) aperto, senza risposta; e risolto
const aperto = k => { const { g, ...q } = Q[k-1]; return q; };
const risolto = k => Q[k-1];
// la slide di un blocco: il quesito risolto sopra, quello aperto sotto
const qz = (sop, voci, extra={}) => ({ tipo:"quesiti", tema:"chiaro", sopratitolo:sop, voci, ...extra });

const METODO = [
 "Leggi prima la domanda: sai che cosa cercare",
 "Leggi il testo cercando le parole chiave della domanda",
 "Attenzione a **not · never · always · only · but**: rovesciano il senso",
 "Rispondi solo con ciò che il testo dice, non con ciò che sai",
 "Una parola che non capisci? Vai avanti: il senso è nelle altre",
 "Le opzioni con tutti, sempre, mai sono quasi sempre errate",
];

const FRASI = [
 "Mrs Green is eighty years old.",
 "She lives in a nursing home.",
 "Every morning the healthcare assistant helps her wash and dress.",
 "She can walk with a walking frame, but she needs help on the stairs.",
 "Yesterday she did not eat her lunch because she had a headache.",
 "The nurse checked her temperature: it was normal.",
];
const FRASI_CHIAVE = [
 "Mrs Green is eighty years old.",
 "She lives in a **nursing home**.",
 "Every morning the **healthcare assistant** helps her wash and dress.",
 "She can walk with a **walking frame**, but she needs help on the stairs.",
 "Yesterday she did not eat her lunch because she had a **headache**.",
 "The nurse checked her **temperature**: it was normal.",
];

const USO = [
 "I diciotto quesiti sono il modello di ciò che troverai",
 "Rifalli tra una settimana, senza guardare le risposte",
 "Per ogni errore: parola non conosciuta? struttura non riconosciuta? lettura frettolosa?",
 "Lessico → le schede · struttura → la 19.4 · lettura → rallenta",
 "Costruisci quesiti tuoi: prendi una frase, togli una parola, rimettila",
];

const QUADRO = { intestazioni:["Lezione", "Che cosa contiene"], colonne:["14%","86%"], righe:[
 ["19.1", "tre tipi di quesito · metodo · persone, luoghi, oggetti, tempo, parole di collegamento"],
 ["19.2", "corpo · sintomi · condizioni · parametri vitali · verbi dell'assistenza · presidi · sicurezza"],
 ["19.3", "frasi per situazione · consegne · domande · falsi amici · le sette strutture"],
 ["19.4", "**present simple** · **present continuous** · **past** · futuro · modali · plurali · preposizioni · pronomi"],
 ["19.5", "metodo per i testi · diciotto quesiti risolti"],
]};
const fino = (t, b) => ({ ...t, righe: t.righe.slice(0, b) });

const ULTIME = [
 "Ogni giorno: dieci minuti sulle schede del lessico, a voce alta",
 "Ogni due giorni: rifare i diciotto quesiti",
 "Una volta a settimana: rileggere la 19.4",
 "Il giorno prima: solo i falsi amici e le sette strutture",
 "Il giorno della prova: niente inglese nuovo",
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 19 · Inglese per il concorso",
  titolo:"Comprensione dei testi<br>**e quesiti tipo**", sottotitolo:"Lezione 19.5 · riepilogo del modulo",
  ente:"CISL FP Padova Rovigo · Concorso OSS Azienda Zero"},

{id:"s02", tipo:"frase", tema:"chiaro", sopratitolo:"L'ultima lezione del modulo e del corso",
  testo:"Il Modulo 19 si chiude, e con lui il corso.", sotto:"Da ascoltare con carta e penna."},
{id:"s03", tipo:"titolo", tema:"profondo",
  titolo:"I quesiti vanno provati **prima di sentire la risposta**.",
  sotto:"Il metodo per i testi · diciotto quesiti risolti · il quadro del modulo."},

{id:"s04", tipo:"memo", tema:"chiaro", attive:[0], sopratitolo:"Il metodo per i testi · sei passi", voci:METODO},
{id:"s05", tipo:"memo", tema:"chiaro", attive:[0,1,2], sopratitolo:"Il metodo per i testi · sei passi", voci:METODO},
{id:"s06", tipo:"memo", tema:"chiaro", sopratitolo:"Il metodo per i testi · sei passi", voci:METODO},

{id:"s07", tipo:"testo", tema:"chiaro", attive:[0,1], sopratitolo:"Un testo tipo", frasi:FRASI},
{id:"s08", tipo:"testo", tema:"chiaro", attive:[0,1,2,3], sopratitolo:"Un testo tipo", frasi:FRASI},
{id:"s09", tipo:"testo", tema:"chiaro", sopratitolo:"Un testo tipo", frasi:FRASI},
{id:"s10", tipo:"testo", tema:"chiaro", sopratitolo:"Un testo tipo · le parole che conosci", frasi:FRASI_CHIAVE},

{id:"s11", ...qz("Domande sul testo", [aperto(1)])},
{id:"s12", ...qz("Domande sul testo", [risolto(1), aperto(2)])},
{id:"s13", ...qz("Domande sul testo", [risolto(2), aperto(3)])},
{id:"s14", ...qz("Domande sul testo · il distrattore", [risolto(3)],
  {tema:"tenue", nota:"L'opzione a, **no, she cannot**, è il distrattore che ignora il **but**."})},

{id:"s15", ...qz("Domande sul testo", [aperto(4)])},
{id:"s16", ...qz("Domande sul testo", [risolto(4), aperto(5)])},
{id:"s17", ...qz("Domande sul testo", [risolto(5), aperto(6)])},
{id:"s18", ...qz("Domande sul testo", [risolto(6)],
  {nota:"Tutte le risposte sono scritte nel testo: nessuna richiede di sapere altro."})},

{id:"s19", ...qz("Quesiti di traduzione", [aperto(7)])},
{id:"s20", ...qz("Quesiti di traduzione", [risolto(7), aperto(8)])},
{id:"s21", ...qz("Quesiti di traduzione", [risolto(8), aperto(9)])},
{id:"s22", ...qz("Quesiti di traduzione", [risolto(9), aperto(10)])},
{id:"s23", ...qz("Quesiti di traduzione · il distrattore", [risolto(10)],
  {tema:"tenue", nota:"Le quattro opzioni sono della stessa area: si battono conoscendole tutte."})},

{id:"s24", ...qz("Quesiti di completamento", [aperto(11)])},
{id:"s25", ...qz("Quesiti di completamento", [risolto(11), aperto(12)])},
{id:"s26", ...qz("Quesiti di completamento", [risolto(12), aperto(13)])},
{id:"s27", ...qz("Quesiti di completamento", [risolto(13), aperto(14)])},
{id:"s28", ...qz("Quesiti di completamento", [risolto(14)],
  {nota:"Plurale: **there are**."})},

{id:"s29", ...qz("Falsi amici e strutture", [aperto(15)])},
{id:"s30", ...qz("Falsi amici e strutture", [risolto(15), aperto(16)])},
{id:"s31", ...qz("Falsi amici e strutture", [risolto(16), aperto(17)])},
{id:"s32", ...qz("Falsi amici e strutture", [risolto(17), aperto(18)])},
{id:"s33", ...qz("Falsi amici e strutture", [risolto(18)],
  {nota:"**Do not**: il divieto, da riconoscere al volo."})},

{id:"s34", tipo:"memo", tema:"chiaro", attive:[0,1], sopratitolo:"Come usare questi quesiti", voci:USO},
{id:"s35", tipo:"memo", tema:"chiaro", attive:[0,1,2,3], sopratitolo:"Come usare questi quesiti", voci:USO},
{id:"s36", tipo:"memo", tema:"chiaro", sopratitolo:"Come usare questi quesiti", voci:USO},

{id:"s37", tipo:"tabella", tema:"chiaro", sopratitolo:"Il quadro del Modulo 19", ...fino(QUADRO,1)},
{id:"s38", tipo:"tabella", tema:"chiaro", sopratitolo:"Il quadro del Modulo 19", ...fino(QUADRO,3)},
{id:"s39", tipo:"tabella", tema:"chiaro", sopratitolo:"Il quadro del Modulo 19", ...QUADRO},

{id:"s40", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false,
  sopratitolo:"I distrattori tipici del modulo", celle:[
  {t:"**ward** · reparto"}, {t:"**stroke** · ictus"}, {t:"**drip** · flebo"}, {t:"**temperature** · anche febbre"}]},
{id:"s41", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false,
  sopratitolo:"I distrattori tipici del modulo", celle:[
  {t:"**to attend** ≠ assistere una persona"}, {t:"**sensible** · ragionevole"}, {t:"**actually** · in realtà"},
  {t:"**he · she · it** → la S"}, {t:"**now** → ING"}, {t:"**yesterday** → passato"}]},
{id:"s42", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false,
  sopratitolo:"I distrattori tipici del modulo", celle:[
  {t:"**there is** + singolare"}, {t:"**there are** + plurale"}, {t:"**must** · obbligo"},
  {t:"**must not** · divieto"}, {t:"**never · always** · rovesciano"}, {t:"**but** · eccezione"}]},
{id:"s43", tipo:"titolo", tema:"profondo",
  titolo:"Le opzioni della stessa area si battono **conoscendo tutte le parole**.",
  sotto:"È così che si costruisce il distrattore."},

{id:"s44", tipo:"memo", tema:"chiaro", attive:[0,1], sopratitolo:"Le ultime due settimane", voci:ULTIME},
{id:"s45", tipo:"memo", tema:"chiaro", sopratitolo:"Le ultime due settimane", voci:ULTIME},
{id:"s46", tipo:"titolo", tema:"profondo",
  titolo:"L'inglese del concorso si vince con **il riconoscimento**.",
  sotto:"Non con la competenza linguistica."},

{id:"s47", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false,
  sopratitolo:"Modulo 19 completato · il corso si chiude", celle:[
  {t:"15 moduli"}, {t:"135 micro-lezioni"}, {t:"4 moduli bonus"}]},
{id:"s48", tipo:"frase", tema:"chiaro", sopratitolo:"La chiusura",
  testo:"Non serve sapere tutto: serve arrivare preparato, lucido e con un metodo."},
{id:"s49", tipo:"titolo", tema:"profondo",
  titolo:"**Good luck.** In bocca al lupo.",
  sotto:"Preparato, lucido e con un metodo."},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Modulo 19 completato",
  titolo:"Fine del corso", sottotitolo:"Concorso OSS Azienda Zero · **in bocca al lupo**",
  ente:"CISL FP Padova Rovigo"},
];
