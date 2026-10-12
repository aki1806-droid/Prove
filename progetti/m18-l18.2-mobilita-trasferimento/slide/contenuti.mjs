// Contenuto delle 49 scene della lezione 18.2: mobilita' e trasferimento.
// *accento*  **accento in semibold**
//
// La lezione piu' tecnica del modulo: misure, lati, ordini di manovra. Le
// famiglie di ausili (deambulatori, ausili minori, sollevatori) stanno in
// `tre`, scoperte a tappe come le dice la voce; in una fila di card il titolo
// e' una parola sola, il resto va nella descrizione.
//
// Il velo rosa (`tenue`) sta sugli errori: le pedane abbassate, gli errori col
// sollevatore (elenco `vietato`), i distrattori. `sostituzione` una volta:
// dentro il deambulatore, non dietro.
//
// «Abbinare ausilio e persona» e' una tabella: la persona a sinistra,
// l'ausilio a destra, accese due righe alla volta come le dice la voce.
//
// Nessuna cifra o dato che non stia nel copione di partenza.

const FAMIGLIE = [
 {t:"Bastoni"}, {t:"Deambulatori"}, {t:"Carrozzine"},
 {t:"Ausili minori"}, {t:"Sollevatori"}, {t:"Letti"},
];

const BASTONE = [
 {n:"Altezza", t:"Al polso", d:"braccio disteso lungo il fianco, gomito leggermente flesso"},
 {n:"Lato", t:"Sano", d:"il bastone si tiene dal lato sano"},
 {n:"Passo", t:"Insieme", d:"avanza con la gamba debole, e la scarica"},
];

const VERIFICA_BASTONE = [
 {t:"Puntale di gomma integro"}, {t:"Altezza regolata"}, {t:"Impugnatura salda"},
];

const DEAMBULATORI = [
 {n:"Fisso", t:"Si solleva", d:"quattro puntali: massima stabilità, serve forza nelle braccia"},
 {n:"Due ruote anteriori", t:"Si spinge", d:"per chi non riesce a sollevare il fisso"},
 {n:"Rollator", t:"Quattro ruote", d:"freni e seduta: per chi cammina ma si affatica"},
];

const ELEMENTI = [
 {t:"Freni"}, {t:"Pedane"}, {t:"Braccioli estraibili"}, {t:"Cintura"}, {t:"Cuscino antidecubito"},
];

const PRIMA = [
 {t:"Freni inseriti"}, {t:"Pedane sollevate o rimosse"}, {t:"Braccioli estratti, se serve"},
];

const POSIZIONE = [
 {t:"Bacino **in fondo** alla seduta"},
 {t:"Piedi sulle **pedane**"},
 {t:"Schiena **appoggiata**"},
 {t:"Se scivola in avanti, **si riposiziona**", d:"rischio di caduta e forze di taglio"},
];

const MOVIMENTO = [
 {t:"In discesa, **all'indietro**"},
 {t:"Gradini e marciapiedi: **tecnica specifica**", d:"non si improvvisa"},
 {t:"Si **verificano**", d:"pressione delle ruote · freni efficaci · cuscino in posizione"},
];

const MINORI = [
 {n:"Tavola di scivolamento", t:"Passaggio", d:"tra superfici allo stesso livello, per chi controlla il tronco"},
 {n:"Telo ad alto scorrimento", t:"Riposizionamento", d:"nel letto senza trascinare: niente frizione"},
 {n:"Disco girevole", t:"Rotazione", d:"in piedi, senza torsione"},
];

const SOLLEVATORI = [
 {n:"Passivo", t:"Imbracatura", d:"non collabora o non ha carico: solleva tutto il peso"},
 {n:"Attivo", t:"Stazione eretta", d:"ha carico e tiene il tronco: aiuta ad alzarsi"},
 {n:"A soffitto", t:"Binario", d:"scorre su binario, meno ingombro"},
];

const IMBRACATURA = [
 {t:"Della **misura** e del **tipo** corretti"},
 {t:"**Integra**"},
 {t:"Agganciata su **tutti i punti**"},
];

// Elenco `vietato`: la × rossa porta gia' la polarita', il testo resta piano.
const ERRORI = [
 {t:"Imbracatura di misura sbagliata o logora", d:"scivolamento, lesioni"},
 {t:"Ganci non tutti agganciati", d:"cadute"},
 {t:"Forzare chi è agitato o non vuole", d:"si rinvia · Modulo 16"},
 {t:"Il sollevatore come mezzo di trasporto", d:"non si usa per i corridoi"},
 {t:"La persona sospesa più del necessario"},
 {t:"Non spiegare la manovra", d:"il sollevamento spaventa"},
];

const ABBINA = {
 intestazioni:["La persona", "L'ausilio"],
 colonne:["62%","38%"],
 righe:[
  ["Cammina con lieve instabilità", "**bastone**"],
  ["Cammina, ha bisogno di appoggio bilaterale", "**deambulatore**"],
  ["Cammina ma si affatica", "**rollator**"],
  ["Non cammina, si trasferisce da sola", "**carrozzina** + tavola"],
  ["Si alza con aiuto, tiene il tronco", "sollevatore **attivo**"],
  ["Non collabora, nessun carico", "sollevatore **passivo**"],
 ],
};

const VERIFICA = [
 {t:"**Integrità**", d:"ruote · freni · puntali · imbracature · cinghie · comandi"},
 {t:"**Funzionamento**", d:"batteria · movimenti · blocchi"},
 {t:"**Idoneità**", d:"di questa persona, della misura giusta, per questa manovra"},
 {t:"**Pulizia**", d:"sanificato dopo l'uso precedente"},
];

const SE_NON_VA = [
 {n:1, t:"Non si usa"}, {n:2, t:"Si segnala"}, {n:3, t:"Si ricorre all'alternativa"},
];

const DISTRATTORI_1 = [
 {sb:"Il bastone dal lato debole", ok:"Dal lato **sano**"},
 {sb:"La persona dietro il deambulatore", ok:"**Dentro** il deambulatore"},
];
const DISTRATTORI_2 = [
 {sb:"Pedane abbassate · in discesa in avanti", ok:"Pedane **alzate** · in discesa **all'indietro**"},
 {sb:"La presa sotto le ascelle", ok:"La **cintura di trasferimento**"},
];
const DISTRATTORI_3 = [
 {sb:"Sollevatore attivo per chi non collabora", ok:"**Attivo**: carico e tronco · **passivo**: non collabora"},
 {sb:"Le sponde sono sempre contenzione", ok:"**Non** sono contenzione, salvo uso contenitivo"},
];

const RIEPILOGO = [
 "Bastone: al **polso**, lato sano · deambulatore: **dentro** · rollator: freni",
 "Carrozzina: freni, pedane, posizione · è una **seduta**, non un letto",
 "Tavola, telo, disco, cintura → eliminano **frizione e torsione**",
 "Sollevatore **attivo** o **passivo** · imbracatura, ganci, portata, due operatori",
 "Letti ad altezza variabile per la **schiena** · sponde ≠ contenzione · letto basso",
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 18 · Ausili, presidi e tecnologie assistive",
  titolo:"Mobilità<br>**e trasferimento**", sottotitolo:"Lezione 18.2",
  ente:"CISL FP Padova Rovigo · Concorso OSS Azienda Zero"},

{id:"s02", tipo:"frase", tema:"chiaro", sopratitolo:"Modulo 18 · lezione 2 di 5",
  testo:"La lezione **più tecnica** del modulo: gli ausili per la mobilità e il trasferimento."},
{id:"s03", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false,
  sopratitolo:"Quelli che l'OSS usa ogni giorno, e con cui si sbaglia di più", celle:FAMIGLIE},
{id:"s04", tipo:"titolo", tema:"profondo",
  titolo:"L'ausilio giusto per **il livello di autonomia giusto**.",
  sotto:"Dal bastone al sollevatore, verificato ogni volta."},

{id:"s05", tipo:"frase", tema:"chiaro", sopratitolo:"Il bastone",
  testo:"Per chi ha un **lieve deficit** di equilibrio o di forza su un lato."},
{id:"s06", tipo:"tre", tema:"chiaro",
  sopratitolo:"Il bastone", box:BASTONE},
{id:"s07", tipo:"frase", tema:"chiaro", sopratitolo:"Tripode e quadripode",
  testo:"Base **più ampia**: più stabilità, più ingombro.",
  sotto:"Per chi ha bisogno di appoggio maggiore."},
{id:"s08", tipo:"griglia", tema:"chiaro", colonne:3,
  sopratitolo:"Si verificano · un puntale consumato scivola", celle:VERIFICA_BASTONE},

{id:"s09", tipo:"tre", tema:"chiaro", attive:[0],
  sopratitolo:"I deambulatori", box:DEAMBULATORI},
{id:"s10", tipo:"tre", tema:"chiaro",
  sopratitolo:"I deambulatori", box:DEAMBULATORI},
{id:"s11", tipo:"sostituzione", tema:"chiaro", sopratitolo:"Altezza al polso · freni controllati sempre",
  da:{h:"Non", t:"dietro"}, a:{h:"Ma", t:"**dentro**"},
  sotto:"Dietro il deambulatore, la persona si sbilancia in avanti."},

{id:"s12", tipo:"confronto", tema:"chiaro", sopratitolo:"La carrozzina manuale",
  col:[{h:"Ad autospinta", t:"ruote **grandi**: la muove la persona"},
       {h:"Da transito", t:"ruote **piccole**: spinta da altri"}]},
{id:"s13", tipo:"confronto", tema:"chiaro", sopratitolo:"Elettrica e basculante",
  col:[{h:"Elettrica", t:"autonomia decisionale, **non forza fisica**"},
       {h:"Basculante", t:"schienale e seduta reclinabili insieme: **scarico della pressione**"}]},
{id:"s14", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false,
  sopratitolo:"Gli elementi da conoscere", celle:ELEMENTI},
{id:"s15", tipo:"titolo", tema:"profondo",
  titolo:"La carrozzina è una **seduta**, non un letto.",
  sotto:"Il tempo in carrozzina va limitato."},

{id:"s16", tipo:"griglia", tema:"chiaro", colonne:3,
  sopratitolo:"Prima di ogni trasferimento", celle:PRIMA},
{id:"s17", tipo:"frase", tema:"tenue", sopratitolo:"Causa frequente di caduta",
  testo:"Il trasferimento con le pedane abbassate."},
{id:"s18", tipo:"elenco", tema:"chiaro",
  sopratitolo:"La posizione corretta", voci:POSIZIONE},
{id:"s19", tipo:"elenco", tema:"chiaro",
  sopratitolo:"In movimento", voci:MOVIMENTO},

{id:"s20", tipo:"tre", tema:"chiaro", attive:[0],
  sopratitolo:"Gli ausili minori · i più utili, i meno usati", box:MINORI},
{id:"s21", tipo:"tre", tema:"chiaro",
  sopratitolo:"Gli ausili minori · i più utili, i meno usati", box:MINORI},
{id:"s22", tipo:"frase", tema:"chiaro", sopratitolo:"La cintura di trasferimento",
  testo:"Una presa sicura che **sostituisce la presa ascellare**, pericolosa.",
  sotto:"Maniglia, scaletta, trapezio: per chi si muove ancora da solo."},

{id:"s23", tipo:"tre", tema:"chiaro", attive:[0],
  sopratitolo:"I sollevatori", box:SOLLEVATORI},
{id:"s24", tipo:"tre", tema:"chiaro",
  sopratitolo:"I sollevatori", box:SOLLEVATORI},
{id:"s25", tipo:"elenco", tema:"chiaro",
  sopratitolo:"L'imbracatura", voci:IMBRACATURA},
{id:"s26", tipo:"titolo", tema:"profondo",
  titolo:"**In due**, quando previsto.",
  sotto:"Batteria carica · freni · portata massima."},

{id:"s27", tipo:"elenco", tema:"tenue", vietato:true, attive:[0,1],
  sopratitolo:"Il sollevatore · gli errori frequenti", voci:ERRORI},
{id:"s28", tipo:"elenco", tema:"tenue", vietato:true, attive:[0,1,2,3],
  sopratitolo:"Il sollevatore · gli errori frequenti", voci:ERRORI},
{id:"s29", tipo:"elenco", tema:"tenue", vietato:true,
  sopratitolo:"Il sollevatore · gli errori frequenti", voci:ERRORI},

{id:"s30", tipo:"frase", tema:"chiaro", sopratitolo:"Il letto articolato",
  testo:"Testata e pediera regolabili: posizioni di **comfort**, di **respiro**, di **alimentazione**."},
{id:"s31", tipo:"confronto", tema:"chiaro", sopratitolo:"Il letto ad altezza variabile",
  col:[{h:"In basso", t:"per la **sicurezza** della persona"},
       {h:"In alto, durante le manovre", t:"per la **schiena** dell'operatore"}]},
{id:"s32", tipo:"frase", tema:"chiaro", sopratitolo:"Le sponde · Modulo 14",
  testo:"**Protezione**, non contenzione.",
  sotto:"L'uso a scopo contenitivo richiede indicazione."},
{id:"s33", tipo:"frase", tema:"chiaro", sopratitolo:"Il letto basso",
  testo:"L'**alternativa alle sponde** per chi è a rischio di caduta.",
  sotto:"Si verificano comandi, ruote frenate, sponde integre."},

{id:"s34", tipo:"tabella", tema:"chiaro", chiave:[0,1],
  sopratitolo:"Abbinare ausilio e persona · la domanda tipica dei quiz", ...ABBINA},
{id:"s35", tipo:"tabella", tema:"chiaro", chiave:[2,3],
  sopratitolo:"Abbinare ausilio e persona · la domanda tipica dei quiz", ...ABBINA},
{id:"s36", tipo:"tabella", tema:"chiaro", chiave:[4,5],
  sopratitolo:"Abbinare ausilio e persona · la domanda tipica dei quiz", ...ABBINA},
{id:"s37", tipo:"titolo", tema:"profondo",
  titolo:"La valutazione è **dell'équipe**.",
  sotto:"L'OSS verifica ogni giorno che sia ancora attuale."},

{id:"s38", tipo:"elenco", tema:"chiaro", attive:[0,1],
  sopratitolo:"La verifica prima dell'uso · ogni volta", voci:VERIFICA},
{id:"s39", tipo:"elenco", tema:"chiaro",
  sopratitolo:"La verifica prima dell'uso · ogni volta", voci:VERIFICA},
{id:"s40", tipo:"griglia", tema:"chiaro", colonne:3,
  sopratitolo:"Se qualcosa non va", celle:SE_NON_VA},
{id:"s41", tipo:"titolo", tema:"profondo",
  titolo:"**Trenta secondi** di verifica.",
  sotto:"Un sollevatore che si scarica a metà manovra è un'emergenza evitabile."},

{id:"s42", tipo:"trappola", tema:"tenue",
  sopratitolo:"I distrattori tipici", righe:DISTRATTORI_1},
{id:"s43", tipo:"trappola", tema:"tenue",
  sopratitolo:"I distrattori tipici", righe:DISTRATTORI_2},
{id:"s44", tipo:"trappola", tema:"tenue",
  sopratitolo:"I distrattori tipici", righe:DISTRATTORI_3},

{id:"s45", tipo:"memo", tema:"chiaro", attive:[0],
  sopratitolo:"Riepilogo", voci:RIEPILOGO},
{id:"s46", tipo:"memo", tema:"chiaro", attive:[0,1,2],
  sopratitolo:"Riepilogo", voci:RIEPILOGO},
{id:"s47", tipo:"memo", tema:"chiaro", attive:[0,1,2,3],
  sopratitolo:"Riepilogo", voci:RIEPILOGO},
{id:"s48", tipo:"memo", tema:"chiaro",
  sopratitolo:"Riepilogo", voci:RIEPILOGO},

{id:"s49", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione",
  titolo:"18.3", sottotitolo:"Gli ausili per la **vita quotidiana**, il bagno, il letto e l'ambiente",
  ente:"CISL FP Padova Rovigo · Concorso OSS Azienda Zero"},
];
