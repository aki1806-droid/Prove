// Contenuto delle 50 scene della lezione 19.3: frasi per situazione, falsi
// amici, strutture ricorrenti.
// *accento*  **accento in semibold**
//
// Le regole del modulo sono quelle della 19.1 (vedi il suo contenuti.mjs):
// la slide e' il glossario, ogni frase inglese ha la traduzione accanto. Qui
// il glossario e' fatto di frasi: `tabella` a due colonne, In inglese | Che
// cosa significa. Fuori dalle tabelle il semibold e' solo per l'inglese, e
// l'italiano non si accenta (l'accento tondo esce rosso).
//
// Ogni slide mostra solo le frasi del suo blocco: una tabella progressiva con
// le righe gia' dette accese in rosa sembrava un elenco di errori (il rosa
// nel corso e' il colore delle trappole). Nessuna riga `chiave` qui.
// I falsi amici sono i distrattori di questa lezione: `trappola` sul velo
// rosa, il significato sbagliato barrato e quello giusto sotto.
//
// Le traduzioni sono quelle del copione di partenza.

const T = ["In inglese", "Che cosa significa"];
const tab = (righe, colonne=["55%","45%"]) => ({ intestazioni:T, colonne, righe });
// le righe da a fino a b esclusa, con le stesse intestazioni e colonne
const parte = (t, a, b) => ({ ...t, righe: t.righe.slice(a, b) });

const SITUAZIONI = [
 {t:"Accoglienza"}, {t:"Igiene"}, {t:"Pasto"}, {t:"Mobilizzazione"}, {t:"Dolore"}, {t:"Emergenza"},
];

const ACCOGLIENZA_1 = tab([
 ["Good morning. My name is Anna, I am a healthcare assistant.", "Buongiorno, mi chiamo Anna, sono un'operatrice socio sanitaria."],
]);
const ACCOGLIENZA_2 = tab([
 ["How are you feeling today?", "Come si sente oggi?"],
 ["Do you need anything?", "Ha bisogno di qualcosa?"],
 ["Please, call me if you need help.", "Mi chiami se ha bisogno di aiuto."],
 ["This is the call bell.", "Questo è il campanello."],
 ["Would you like to sit in the chair?", "Vuole sedersi sulla sedia?"],
]);

const IGIENE = tab([
 ["I am going to help you wash.", "La aiuto a lavarsi."],
 ["Can you wash your face by yourself?", "Riesce a lavarsi il viso da solo?"],
 ["Is the water too hot?", "L'acqua è troppo calda?"],
 ["I will dry your back.", "Le asciugo la schiena."],
 ["Let's brush your teeth.", "Laviamo i denti."],
 ["Please, lift your arm.", "Per favore, alzi il braccio."],
]);

const PASTO = tab([
 ["It's time for lunch.", "È ora di pranzo."],
 ["Are you hungry? Are you thirsty?", "Ha fame? Ha sete?"],
 ["Would you like some water?", "Vuole un po' d'acqua?"],
 ["I will help you eat.", "La aiuto a mangiare."],
 ["Take small bites and chew slowly.", "Piccoli bocconi e mastichi lentamente."],
 ["Sit up straight, please.", "Si sieda dritto, per favore."],
]);

const MOBILIZZAZIONE = tab([
 ["I am going to help you get up.", "La aiuto ad alzarsi."],
 ["Put your feet on the floor.", "Metta i piedi a terra."],
 ["Hold the walking frame.", "Si tenga al deambulatore."],
 ["Let's turn on your side.", "Giriamoci sul fianco."],
 ["We will lift you with the hoist.", "La solleviamo con il sollevatore."],
 ["Take your time, there is no hurry.", "Faccia con calma, non c'è fretta."],
 ["Be careful, the floor is wet.", "Attenzione, il pavimento è bagnato."],
]);

const DOLORE_1 = tab([
 ["Are you in pain?", "Ha dolore?"],
 ["Where does it hurt?", "Dove le fa male?"],
 ["Does it hurt here?", "Le fa male qui?"],
 ["How bad is the pain, from zero to ten?", "Quanto è forte il dolore, da zero a dieci?"],
 ["I will tell the nurse.", "Lo dico all'infermiere."],
]);
const DOLORE_2 = tab([
 ["The patient complains of chest pain.", "Il paziente lamenta dolore al torace."],
 ["She has a headache and feels dizzy.", "Ha mal di testa e ha le vertigini."],
]);

const EMERGENZA = tab([
 ["Call the nurse immediately!", "Chiami subito l'infermiere!"],
 ["Call for help!", "Chiedi aiuto!"],
 ["The patient has fallen.", "Il paziente è caduto."],
 ["He is not breathing.", "Non respira."],
 ["She is unconscious.", "È incosciente."],
 ["Stay with the patient.", "Resta con il paziente."],
 ["Do not move him.", "Non spostarlo."],
]);

const CONSEGNE = tab([
 ["Mrs Rossi slept well last night.", "La signora Rossi ha dormito bene stanotte."],
 ["Mr Bianchi refused his lunch.", "Il signor Bianchi ha rifiutato il pranzo."],
 ["The patient in bed four needs help to walk.", "Il paziente del letto quattro ha bisogno di aiuto per camminare."],
 ["She was confused this morning.", "Era confusa questa mattina."],
 ["His temperature is thirty-eight.", "Ha trentotto di temperatura."],
 ["Please, check the dressing.", "Per favore, controlla la medicazione."],
]);

const DOMANDE_1 = [
 {t:"**What?** · che cosa"}, {t:"**Where?** · dove"}, {t:"**When?** · quando"},
 {t:"**Who?** · chi"}, {t:"**Why?** · perché"}, {t:"**How?** · come"},
];
const DOMANDE_2 = tab([
 ["How many?", "quanti · le cose contabili"],
 ["How much?", "quanto · le quantità"],
 ["How long?", "per quanto tempo"],
 ["How often?", "quanto spesso"],
 ["Which?", "quale"],
], ["40%","60%"]);
const DOMANDE_3 = tab([
 ["Where is the ward?", "Dov'è il reparto?"],
 ["When does the shift start?", "Quando comincia il turno?"],
 ["Who is the patient's doctor?", "Chi è il medico del paziente?"],
 ["How many patients are there?", "Quanti pazienti ci sono?"],
 ["Why is she crying?", "Perché piange?"],
]);

const FALSI_1 = [
 {sb:"temperature = solo temperatura", ok:"**temperature** = anche febbre: **the patient has a temperature**"},
];
const FALSI_2 = [
 {sb:"to attend = assistere una persona", ok:"**to attend** = assistere a un evento · la persona: **to care for**"},
 {sb:"sensible = sensibile", ok:"**sensible** = ragionevole · sensibile: **sensitive**"},
];
const FALSI_3 = [
 {sb:"actually = attualmente", ok:"**actually** = in realtà · attualmente: **currently**"},
 {sb:"eventually = eventualmente", ok:"**eventually** = alla fine · eventualmente: **possibly**"},
];
const FALSI_4 = [
 {sb:"library = libreria", ok:"**library** = biblioteca · libreria: **bookshop**"},
 {sb:"to assist = assistere a uno spettacolo", ok:"**to assist** = aiutare"},
];
const FALSI_5 = [
 {sb:"to control = verificare", ok:"**to control** = governare · verificare: **to check**"},
 {sb:"confident = confidente", ok:"**confident** = sicuro di sé"},
];
const FALSI_6 = [
 {sb:"constipated = raffreddato", ok:"**constipated** = stitico · il raffreddore: **to have a cold**"},
 {sb:"injury = ingiuria", ok:"**injury** = lesione da trauma · ingiuria: **insult**"},
];
const FALSI_6B = [
 {sb:"to pretend = pretendere", ok:"**to pretend** = fingere · pretendere: **to expect**, **to demand**"},
];
const FALSI_7 = [
 {sb:"nurse = nutrice", ok:"**nurse** = infermiere · **patient** = paziente, anche l'aggettivo"},
 {sb:"disease = disagio", ok:"**disease** = malattia"},
];

const STRUTTURE = { intestazioni:["Struttura", "Esempio", "Che cosa significa"], colonne:["28%","38%","34%"], righe:[
 ["I am going to + verbo", "**I am going to check your pulse.**", "sto per · le controllo il polso"],
 ["Can I + verbo?", "**Can I help you?**", "posso · posso aiutarla?"],
 ["Would you like …?", "**Would you like some tea?**", "vuole · vuole un tè?"],
 ["Let's + verbo", "**Let's sit down.**", "facciamo insieme · sediamoci"],
 ["Please + imperativo", "**Please, open your mouth.**", "per favore · apra la bocca"],
 ["Do not + verbo", "**Do not get up alone.**", "il divieto · non si alzi da solo"],
 ["The patient needs …", "**The patient needs help.**", "ha bisogno di · ha bisogno di aiuto"],
]};

const RIEPILOGO = [
 "Accoglienza: **How are you feeling?** · **Do you need anything?** · **This is the call bell**",
 "Igiene e pasto: **I am going to help you wash** · **Are you hungry?** · **Take small bites**",
 "Mobilizzazione: **get up** · **hold the walking frame** · **take your time** · **be careful**",
 "Dolore: **Are you in pain?** · **Where does it hurt?** · **complains of** · **feels dizzy**",
 "Emergenza: **call for help** · **has fallen** · **is not breathing** · **do not move**",
 "Falsi amici: **temperature** · **attend** · **sensible** · **actually** · **eventually** · **library** · **constipated**",
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 19 · Inglese per il concorso",
  titolo:"Frasi, dialoghi in reparto<br>**e falsi amici**", sottotitolo:"Lezione 19.3",
  ente:"CISL FP Padova Rovigo · Concorso OSS Azienda Zero"},

{id:"s02", tipo:"frase", tema:"chiaro", sopratitolo:"Dalle parole alle frasi",
  testo:"Le frasi dei quesiti di comprensione e di completamento, per situazione assistenziale."},
{id:"s03", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false,
  sopratitolo:"Sei situazioni, poi i falsi amici", celle:SITUAZIONI},
{id:"s04", tipo:"titolo", tema:"profondo",
  titolo:"Le frasi vanno lette **a voce alta**.",
  sotto:"La struttura resta più della traduzione."},

{id:"s05", tipo:"tabella", tema:"chiaro", sopratitolo:"L'accoglienza", ...ACCOGLIENZA_1},
{id:"s06", tipo:"tabella", tema:"chiaro",
  sopratitolo:"L'accoglienza", ...parte(ACCOGLIENZA_2,0,2)},
{id:"s07", tipo:"tabella", tema:"chiaro",
  sopratitolo:"L'accoglienza", ...parte(ACCOGLIENZA_2,2,4)},
{id:"s08", tipo:"tabella", tema:"chiaro",
  sopratitolo:"L'accoglienza · would you like, la forma gentile per offrire", ...parte(ACCOGLIENZA_2,4,5)},

{id:"s09", tipo:"tabella", tema:"chiaro",
  sopratitolo:"L'igiene · I am going to, la struttura più frequente", ...parte(IGIENE,0,1)},
{id:"s10", tipo:"tabella", tema:"chiaro",
  sopratitolo:"L'igiene · by yourself, da solo", ...parte(IGIENE,1,3)},
{id:"s11", tipo:"tabella", tema:"chiaro",
  sopratitolo:"L'igiene · let's, per proporre un'azione insieme", ...parte(IGIENE,3,6)},

{id:"s12", tipo:"tabella", tema:"chiaro", sopratitolo:"Il pasto", ...parte(PASTO,0,3)},
{id:"s13", tipo:"tabella", tema:"chiaro",
  sopratitolo:"Il pasto · take small bites, la frase della disfagia", ...parte(PASTO,3,6)},
{id:"s14", tipo:"titolo", tema:"profondo",
  titolo:"**He did not eat his breakfast.**",
  sotto:"Non ha mangiato la colazione. Did not, il passato negativo che i completamenti chiedono."},

{id:"s15", tipo:"tabella", tema:"chiaro",
  sopratitolo:"La mobilizzazione · get up, alzarsi", ...parte(MOBILIZZAZIONE,0,2)},
{id:"s16", tipo:"tabella", tema:"chiaro", sopratitolo:"La mobilizzazione", ...parte(MOBILIZZAZIONE,2,5)},
{id:"s17", tipo:"tabella", tema:"chiaro",
  sopratitolo:"La mobilizzazione · be careful, nei testi sulla sicurezza", ...parte(MOBILIZZAZIONE,5,7)},

{id:"s18", tipo:"tabella", tema:"chiaro", sopratitolo:"Il dolore", ...parte(DOLORE_1,0,3)},
{id:"s19", tipo:"tabella", tema:"chiaro", sopratitolo:"Il dolore", ...parte(DOLORE_1,3,5)},
{id:"s20", tipo:"tabella", tema:"chiaro",
  sopratitolo:"Il dolore · due frasi da testo di comprensione", ...parte(DOLORE_2,0,1)},
{id:"s21", tipo:"tabella", tema:"chiaro",
  sopratitolo:"Il dolore · feels dizzy, si sente stordita", ...parte(DOLORE_2,1,2)},

{id:"s22", tipo:"tabella", tema:"chiaro",
  sopratitolo:"L'emergenza · has fallen, il passato di to fall", ...parte(EMERGENZA,0,3)},
{id:"s23", tipo:"tabella", tema:"chiaro", sopratitolo:"L'emergenza", ...parte(EMERGENZA,3,6)},
{id:"s24", tipo:"titolo", tema:"profondo",
  titolo:"**Do not move him.**",
  sotto:"Non spostarlo. Do not, o don't: la forma dei divieti, sempre presente nei quesiti sulla sicurezza."},

{id:"s25", tipo:"tabella", tema:"chiaro",
  sopratitolo:"Le consegne · i testi di comprensione più realistici", ...parte(CONSEGNE,0,1)},
{id:"s26", tipo:"tabella", tema:"chiaro", sopratitolo:"Le consegne", ...parte(CONSEGNE,1,3)},
{id:"s27", tipo:"tabella", tema:"chiaro", sopratitolo:"Le consegne", ...parte(CONSEGNE,3,6)},

{id:"s28", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false,
  sopratitolo:"Le domande · aprono quasi tutti i quesiti", celle:DOMANDE_1},
{id:"s29", tipo:"tabella", tema:"chiaro", sopratitolo:"Le domande", ...DOMANDE_2},
{id:"s30", tipo:"tabella", tema:"chiaro", sopratitolo:"Le domande · qualche esempio", ...parte(DOMANDE_3,0,3)},
{id:"s31", tipo:"tabella", tema:"chiaro", sopratitolo:"Le domande · qualche esempio", ...parte(DOMANDE_3,3,5)},
{id:"s32", tipo:"titolo", tema:"profondo",
  titolo:"La parola interrogativa dice **che risposta cercare**.",
  sotto:"Riconoscerla è il primo passo del quesito di comprensione."},

{id:"s33", tipo:"trappola", tema:"tenue", sopratitolo:"I falsi amici · sembrano italiane e non lo sono", righe:FALSI_1},
{id:"s34", tipo:"trappola", tema:"tenue", sopratitolo:"I falsi amici", righe:FALSI_2},
{id:"s35", tipo:"trappola", tema:"tenue", sopratitolo:"I falsi amici", righe:FALSI_3},
{id:"s36", tipo:"trappola", tema:"tenue", sopratitolo:"I falsi amici", righe:FALSI_4},

{id:"s37", tipo:"trappola", tema:"tenue", sopratitolo:"Altri falsi amici · area sanitaria", righe:FALSI_5},
{id:"s38", tipo:"trappola", tema:"tenue", sopratitolo:"Altri falsi amici · area sanitaria", righe:FALSI_6},
{id:"s39", tipo:"trappola", tema:"tenue", sopratitolo:"Altri falsi amici · area sanitaria", righe:FALSI_6B},
{id:"s40", tipo:"trappola", tema:"tenue", sopratitolo:"Altri falsi amici · area sanitaria", righe:FALSI_7},

{id:"s41", tipo:"tabella", tema:"chiaro", sopratitolo:"Le strutture che tornano sempre", ...parte(STRUTTURE,0,1)},
{id:"s42", tipo:"tabella", tema:"chiaro", sopratitolo:"Le strutture che tornano sempre", ...parte(STRUTTURE,1,4)},
{id:"s43", tipo:"tabella", tema:"chiaro", sopratitolo:"Le strutture che tornano sempre", ...parte(STRUTTURE,4,6)},
{id:"s44", tipo:"tabella", tema:"chiaro", sopratitolo:"Le strutture che tornano sempre", ...parte(STRUTTURE,6,7)},
{id:"s45", tipo:"titolo", tema:"profondo",
  titolo:"Sette strutture coprono **la grande maggioranza** delle frasi assistenziali.",
  sotto:"Da riconoscere a colpo d'occhio."},

{id:"s46", tipo:"memo", tema:"chiaro", attive:[0,1], sopratitolo:"Riepilogo", voci:RIEPILOGO},
{id:"s47", tipo:"memo", tema:"chiaro", attive:[0,1,2,3], sopratitolo:"Riepilogo", voci:RIEPILOGO},
{id:"s48", tipo:"memo", tema:"chiaro", sopratitolo:"Riepilogo", voci:RIEPILOGO},
{id:"s49", tipo:"frase", tema:"chiaro", sopratitolo:"Prossima lezione",
  testo:"La grammatica minima per i quesiti di completamento."},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione",
  titolo:"19.4", sottotitolo:"La grammatica minima per **i completamenti**",
  ente:"CISL FP Padova Rovigo · Concorso OSS Azienda Zero"},
];
