// Contenuto delle 49 scene della lezione 19.4: la grammatica minima per i
// quesiti di completamento.
// *accento*  **accento in semibold**
//
// Le regole del modulo sono quelle della 19.1 e della 19.3: la slide e' il
// glossario, ogni forma inglese ha l'esempio e la traduzione accanto. Qui il
// glossario e' fatto di regole: `tabella` a tre colonne, Forma | Esempio |
// Che cosa significa, con la forma in verde (prima colonna) e l'esempio
// inglese in semibold. Fuori dalle tabelle il semibold e' solo per
// l'inglese, e l'italiano non si accenta col markup (l'accento tondo esce
// rosso).
//
// Ogni slide mostra solo le forme del suo blocco (`parte`), senza righe
// `chiave`: il rosa nel corso e' il colore delle trappole. Le trappole di
// questa lezione sono i due quesiti tipo e le opzioni da escludere:
// `trappola` sul velo rosa, l'opzione sbagliata barrata e la giusta sotto.
// Il metodo in cinque passi e il riepilogo sono `memo` a tappe.
//
// Le forme e gli esempi sono quelli del copione di partenza e del suo
// schermo.

const F = ["Forma", "Esempio", "Che cosa significa"];
const tre = (righe, intestazioni=F, colonne=["30%","40%","30%"]) => ({ intestazioni, colonne, righe });
const due = (righe, colonne=["55%","45%"]) =>
  ({ intestazioni:["In inglese", "Che cosa significa"], colonne, righe });
// le righe da a fino a b esclusa, con le stesse intestazioni e colonne
const parte = (t, a, b) => ({ ...t, righe: t.righe.slice(a, b) });

const ARGOMENTI = [
 {t:"I verbi"}, {t:"Essere e avere"}, {t:"I plurali"},
 {t:"Gli articoli"}, {t:"Le preposizioni"}, {t:"I pronomi"},
];

const SIMPLE = tre([
 ["I · you · we · they + verbo base", "**I work · they help**", "lavoro · aiutano"],
 ["he · she · it + verbo + S", "**he works · she helps · the nurse checks**", "lavora · aiuta · l'infermiere controlla"],
 ["+ S", "**works · helps**", "la regola generale"],
 ["+ ES dopo s, sh, ch, x, o", "**washes · goes**", "lava · va"],
 ["do not · does not + verbo base", "**She does not eat.**", "non mangia"],
 ["do · does + soggetto + verbo base?", "**Does he walk?**", "cammina?"],
]);

const CONTINUOUS = tre([
 ["am · is · are + verbo + ING", "**I am helping · she is sleeping · they are eating**", "sto aiutando · sta dormendo · stanno mangiando"],
 ["is not + verbo + ING", "**She is not sleeping.**", "non sta dormendo"],
 ["is + soggetto + verbo + ING?", "**Is she sleeping?**", "sta dormendo?"],
 ["le parole spia", "**now · at the moment · right now**", "adesso · in questo momento · proprio ora"],
]);
const CONTINUOUS_ES = due([
 ["The patient is resting now.", "Il paziente sta riposando adesso."],
 ["The nurse is taking the temperature.", "L'infermiere sta rilevando la temperatura."],
]);

const SEMPLICE_CONTINUO = due([
 ["The nurse checks the patients every morning.", "l'abitudine → il semplice"],
 ["The nurse is checking the patients now.", "l'adesso → il continuo"],
 ["every day · always · often · usually · never", "le parole spia del semplice"],
 ["now · at the moment · right now", "le parole spia del continuo"],
]);

const QUESITI_TEMPO = [
 {sb:"She sleeps now.", ok:"**She is sleeping now.** · c'è now: il continuo"},
 {sb:"He wash his hands every day.", ok:"**He washes his hands every day.** · terza persona: la S"},
];

const PAST = tre([
 ["verbo + ED", "**helped · washed · called · checked**", "aiutato · lavato · chiamato · controllato"],
 ["did not + verbo base", "**She did not eat.**", "non ha mangiato"],
 ["did + soggetto + verbo base?", "**Did he sleep?**", "ha dormito?"],
 ["le parole spia", "**yesterday · last night · last week · ago**", "ieri · ieri notte · la settimana scorsa · fa"],
]);
const IRREGOLARI = tre([
 ["was · were", "**be**", "essere"],
 ["had", "**have**", "avere"],
 ["ate", "**eat**", "mangiare"],
 ["drank", "**drink**", "bere"],
 ["fell", "**fall**", "cadere"],
 ["slept", "**sleep**", "dormire"],
 ["went", "**go**", "andare"],
 ["took", "**take**", "prendere"],
 ["gave", "**give**", "dare"],
 ["said", "**say**", "dire"],
], ["Il passato", "Il verbo base", "Che cosa significa"], ["30%","30%","40%"]);

const FUTURO = tre([
 ["will + verbo base", "**I will call the nurse.**", "decisione, promessa, previsione · chiamo l'infermiere"],
 ["be going to + verbo base", "**I am going to help you wash.**", "intenzione, piano · la aiuto a lavarsi"],
]);
const FUTURO_2 = due([
 ["will not · won't · is not going to", "il negativo"],
 ["Will you help me?", "Mi aiuta?"],
 ["Are you going to eat?", "Mangia?"],
 ["tomorrow · next week · later · soon", "domani · la settimana prossima · più tardi · presto"],
]);

const MODALI = tre([
 ["can", "**She can walk alone. · Can I help you?**", "potere, saper fare"],
 ["cannot · can't", "**He cannot swallow.**", "non potere"],
 ["must", "**You must wash your hands.**", "dovere, l'obbligo forte"],
 ["must not", "**You must not smoke here.**", "il divieto"],
 ["should", "**You should drink more water.**", "dovrebbe, il consiglio"],
 ["have to", "**I have to work tonight.**", "dovere, la necessità"],
], ["Modale", "Esempio", "Che cosa significa"]);

const ESSERE_AVERE = tre([
 ["to be", "**I am · you are · he she it is · we are · they are**", "essere"],
 ["esempi", "**The patient is in bed. · Is she awake?**", "il paziente è a letto · è sveglia?"],
 ["to have", "**I have · you have · he she it has · we have · they have**", "avere · has alla terza persona"],
 ["esempi", "**He has a fever. · Do you have any pain?**", "ha la febbre · ha dolore?"],
 ["there is", "**There is a nurse in the room.**", "c'è · il singolare"],
 ["there are", "**There are three patients in the ward.**", "ci sono · il plurale"],
]);

const PLURALI = tre([
 ["+ S", "**nurses · beds**", "infermieri · letti"],
 ["+ ES dopo certe lettere", "**dresses · boxes**", "vestiti · scatole"],
 ["Y → IES", "**baby → babies**", "neonato · neonati"],
]);
const PLURALI_IRR = [
 {t:"**man → men** · uomo"}, {t:"**woman → women** · donna"}, {t:"**child → children** · bambino"},
 {t:"**foot → feet** · piede"}, {t:"**tooth → teeth** · dente"}, {t:"**person → people** · persona"},
];
const ARTICOLI = tre([
 ["a", "**a nurse**", "davanti a consonante"],
 ["an", "**an injection**", "davanti a vocale"],
 ["the", "**the nurse**", "l'articolo determinativo"],
], ["Articolo", "Esempio", "Quando"]);
const POSSESSIVI = [
 {t:"**my** · mio"}, {t:"**your** · tuo, suo"}, {t:"**his** · di lui"},
 {t:"**her** · di lei"}, {t:"**its** · di una cosa"}, {t:"**our** · nostro"},
 {t:"**their** · loro"}, {t:"**his arm · her leg** · il suo braccio, la sua gamba"},
 {t:"**the patient's bed** · il letto del paziente"},
];

const PREPOSIZIONI = tre([
 ["in", "**in the room · in bed · in the ward · in hospital**", "dentro, in un luogo chiuso"],
 ["on", "**on the table · on the floor · on the left · on Monday**", "sopra, a contatto · i giorni"],
 ["at", "**at the hospital · at eight o'clock · at night · at home**", "il punto preciso · l'orario"],
], ["Preposizione", "Esempio", "Quando"], ["20%","50%","30%"]);
const PREPOSIZIONI_2 = due([
 ["to · go to the bathroom", "la direzione"],
 ["from", "la provenienza"],
 ["with · without", "con · senza"],
], ["50%","50%"]);
const LUOGO = [
 {t:"**next to** · accanto"}, {t:"**behind** · dietro"}, {t:"**in front of** · davanti"},
 {t:"**under** · sotto"}, {t:"**between** · tra"},
];

const PRONOMI = tre([
 ["I", "**me**", "**Give it to me.** · dammelo"],
 ["you", "**you**", ""],
 ["he", "**him**", "**Help him.** · aiutalo"],
 ["she", "**her**", "**Call her.** · chiamala"],
 ["it", "**it**", ""],
 ["we", "**us**", ""],
 ["they", "**them**", ""],
], ["Soggetto", "Oggetto", "Esempio"], ["25%","25%","50%"]);

const QUESITI_PRONOMI = [
 {sb:"The nurse helps he.", ok:"**The nurse helps him.** · chi riceve l'azione: l'oggetto"},
 {sb:"Her is sleeping.", ok:"**She is sleeping.** · chi fa l'azione: il soggetto"},
];

const DIMOSTRATIVI = due([
 ["this · that", "questo · quello"],
 ["these · those", "questi · quelli"],
 ["some", "nelle affermative"],
 ["any · Do you have any pain?", "nelle domande e nelle negative · ha dolore?"],
]);

const METODO = [
 "Cerca la parola spia: **now** → continuo · **every day** → semplice · **yesterday** → passato · **tomorrow** → futuro",
 "Guarda il soggetto: **he · she · it** vogliono la S",
 "Guarda che cosa c'è dopo: un singolare vuole **there is**, un plurale **there are**",
 "Leggi la frase intera con l'opzione inserita: deve reggere",
 "Escludi le opzioni impossibili: un modale seguito da ING, una S con **they**",
];

const RIEPILOGO = [
 "**present simple** per l'abitudine, con la S · **present continuous** per l'adesso, con ING",
 "**past simple** con ED e gli irregolari: **was · had · ate · fell · slept · went · took**",
 "Il futuro: **will** · **going to**",
 "I modali: **can · must · must not · should · have to · may**",
 "**to be** · **to have** con **has** · **there is** · **there are** · plurali: **men · women · children · feet · teeth · people**",
 "Articoli, possessivi, preposizioni, pronomi, **some** e **any**",
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 19 · Inglese per il concorso",
  titolo:"La grammatica minima<br>**per i completamenti**", sottotitolo:"Lezione 19.4",
  ente:"CISL FP Padova Rovigo · Concorso OSS Azienda Zero"},

{id:"s02", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false,
  sopratitolo:"L'unica lezione di grammatica · solo ciò che serve", celle:ARGOMENTI},
{id:"s03", tipo:"titolo", tema:"profondo",
  titolo:"Non un corso di inglese: **una cassetta degli attrezzi**.",
  sotto:"Ogni regola con l'esempio tipo del concorso."},

{id:"s04", tipo:"tabella", tema:"chiaro",
  sopratitolo:"Il presente semplice · present simple · abitudini e fatti", ...parte(SIMPLE,0,1)},
{id:"s05", tipo:"tabella", tema:"chiaro",
  sopratitolo:"Il presente semplice · la terza persona", ...parte(SIMPLE,1,2)},
{id:"s06", tipo:"tabella", tema:"chiaro",
  sopratitolo:"La terza persona · il punto chiesto nei completamenti", ...parte(SIMPLE,2,4)},
{id:"s07", tipo:"tabella", tema:"chiaro",
  sopratitolo:"Il presente semplice · il negativo e la domanda", ...parte(SIMPLE,4,6)},

{id:"s08", tipo:"tabella", tema:"chiaro",
  sopratitolo:"Il presente continuo · present continuous · l'azione in corso", ...parte(CONTINUOUS,0,1)},
{id:"s09", tipo:"tabella", tema:"chiaro", sopratitolo:"Il presente continuo", ...CONTINUOUS_ES},
{id:"s10", tipo:"tabella", tema:"chiaro",
  sopratitolo:"Il presente continuo · il negativo, la domanda, le parole spia", ...parte(CONTINUOUS,1,4)},
{id:"s11", tipo:"titolo", tema:"profondo",
  titolo:"Se c'è **now**, la risposta è quasi sempre **la forma in ING**.",
  sotto:"Il paziente sta riposando adesso: the patient is resting now."},

{id:"s12", tipo:"tabella", tema:"chiaro",
  sopratitolo:"Semplice o continuo · il completamento più frequente", ...parte(SEMPLICE_CONTINUO,0,1)},
{id:"s13", tipo:"tabella", tema:"chiaro",
  sopratitolo:"Semplice o continuo", ...parte(SEMPLICE_CONTINUO,1,4)},
{id:"s14", tipo:"trappola", tema:"tenue", sopratitolo:"Due quesiti tipo", righe:QUESITI_TEMPO},

{id:"s15", tipo:"tabella", tema:"chiaro",
  sopratitolo:"Il passato · past simple · l'azione conclusa", ...parte(PAST,0,1)},
{id:"s16", tipo:"tabella", tema:"chiaro",
  sopratitolo:"Il passato · gli irregolari del concorso", ...parte(IRREGOLARI,0,5)},
{id:"s17", tipo:"tabella", tema:"chiaro",
  sopratitolo:"Il passato · gli irregolari del concorso", ...parte(IRREGOLARI,5,10)},
{id:"s18", tipo:"tabella", tema:"chiaro",
  sopratitolo:"Il passato · il negativo, la domanda, le parole spia", ...parte(PAST,1,4)},

{id:"s19", tipo:"tabella", tema:"chiaro", sopratitolo:"Il futuro, in due forme", ...parte(FUTURO,0,1)},
{id:"s20", tipo:"tabella", tema:"chiaro",
  sopratitolo:"Il futuro · le due forme sono quasi intercambiabili", ...parte(FUTURO,1,2)},
{id:"s21", tipo:"tabella", tema:"chiaro",
  sopratitolo:"Il futuro · il negativo, la domanda, le parole spia", ...FUTURO_2},

{id:"s22", tipo:"tabella", tema:"chiaro",
  sopratitolo:"I verbi modali · sempre + verbo base, senza to", ...parte(MODALI,0,2)},
{id:"s23", tipo:"tabella", tema:"chiaro", sopratitolo:"I verbi modali", ...parte(MODALI,2,4)},
{id:"s24", tipo:"tabella", tema:"chiaro", sopratitolo:"I verbi modali", ...parte(MODALI,4,6)},
{id:"s25", tipo:"titolo", tema:"profondo",
  titolo:"Nei quesiti sulla sicurezza: **must** e **must not**.",
  sotto:"May, o might, potrebbe: the patient may fall, il paziente potrebbe cadere."},

{id:"s26", tipo:"tabella", tema:"chiaro", sopratitolo:"Essere e avere", ...parte(ESSERE_AVERE,0,2)},
{id:"s27", tipo:"tabella", tema:"chiaro",
  sopratitolo:"Essere e avere · has, con la S", ...parte(ESSERE_AVERE,2,4)},
{id:"s28", tipo:"tabella", tema:"chiaro",
  sopratitolo:"Essere e avere · there is, there are", ...parte(ESSERE_AVERE,4,6)},
{id:"s29", tipo:"titolo", tema:"profondo",
  titolo:"**There is** o **there are**: decide il nome che segue.",
  sotto:"Un singolare vuole there is, un plurale there are."},

{id:"s30", tipo:"tabella", tema:"chiaro", sopratitolo:"Il plurale regolare", ...PLURALI},
{id:"s31", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false,
  sopratitolo:"I plurali irregolari del concorso", celle:PLURALI_IRR},
{id:"s32", tipo:"tabella", tema:"chiaro", sopratitolo:"Gli articoli", ...ARTICOLI},
{id:"s33", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false,
  sopratitolo:"I possessivi · l'apostrofo S", celle:POSSESSIVI},

{id:"s34", tipo:"tabella", tema:"chiaro",
  sopratitolo:"Le preposizioni · i completamenti le chiedono spesso", ...parte(PREPOSIZIONI,0,1)},
{id:"s35", tipo:"tabella", tema:"chiaro", sopratitolo:"Le preposizioni", ...parte(PREPOSIZIONI,1,3)},
{id:"s36", tipo:"tabella", tema:"chiaro", sopratitolo:"Le preposizioni", ...PREPOSIZIONI_2},
{id:"s37", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false,
  sopratitolo:"Le preposizioni · dove si trova", celle:LUOGO},

{id:"s38", tipo:"tabella", tema:"chiaro", sopratitolo:"I pronomi", ...PRONOMI},
{id:"s39", tipo:"trappola", tema:"tenue",
  sopratitolo:"Due quesiti tipo · chi fa l'azione, chi la riceve", righe:QUESITI_PRONOMI},
{id:"s40", tipo:"tabella", tema:"chiaro",
  sopratitolo:"This, that, these, those · some e any", ...DIMOSTRATIVI},

{id:"s41", tipo:"memo", tema:"chiaro", attive:[0], sopratitolo:"Il metodo · cinque passi", voci:METODO},
{id:"s42", tipo:"memo", tema:"chiaro", attive:[0,1,2], sopratitolo:"Il metodo · cinque passi", voci:METODO},
{id:"s43", tipo:"memo", tema:"chiaro", sopratitolo:"Il metodo · cinque passi", voci:METODO},
{id:"s44", tipo:"titolo", tema:"profondo",
  titolo:"Nel dubbio, **la forma più semplice** è spesso quella giusta.",
  sotto:"Prima la parola spia, poi il soggetto, poi quello che segue."},

{id:"s45", tipo:"memo", tema:"chiaro", attive:[0], sopratitolo:"Riepilogo", voci:RIEPILOGO},
{id:"s46", tipo:"memo", tema:"chiaro", attive:[0,1,2,3], sopratitolo:"Riepilogo", voci:RIEPILOGO},
{id:"s47", tipo:"memo", tema:"chiaro", sopratitolo:"Riepilogo", voci:RIEPILOGO},
{id:"s48", tipo:"frase", tema:"chiaro", sopratitolo:"Prossima lezione",
  testo:"La comprensione dei testi e i quesiti tipo."},

{id:"s49", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione",
  titolo:"19.5", sottotitolo:"Comprensione dei testi e **quesiti tipo**",
  ente:"CISL FP Padova Rovigo · Concorso OSS Azienda Zero"},
];
