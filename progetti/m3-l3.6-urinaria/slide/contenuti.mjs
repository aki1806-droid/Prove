// Contenuto delle 50 scene della lezione 3.6 — eliminazione urinaria e
// cateterismo vescicale. Illustrazioni nuove: la vescica con il catetere e il
// palloncino, il circuito chiuso (letto, tubo, sacca sotto la vescica), il
// globo vescicale; la curva impara a salire soltanto.

const URINE = [
 {n:"1", t:"**Disuria** — minzione dolorosa"}, {n:"2", t:"**Pollachiuria** — minzioni frequenti di piccolo volume"},
 {n:"3", t:"**Nicturia** — bisogno di urinare di notte"}, {n:"4", t:"**Stranguria** — lenta e dolorosa, goccia a goccia"},
 {n:"5", t:"**Urgenza**"}, {n:"6", t:"**Ematuria** — sangue"}, {n:"7", t:"**Piuria** — pus", key:true},
];
const TIPI = [
 {n:"1", t:"**Da sforzo** — tosse, starnuto, sollevamento: pavimento pelvico debole"},
 {n:"2", t:"**Da urgenza** — stimolo improvviso e impellente"},
 {n:"3", t:"**Mista**"},
 {n:"4", t:"**Da rigurgito** — la vescica è piena e trabocca: una **ritenzione** travestita", key:true},
 {n:"5", t:"**Funzionale** — il sistema funziona, la persona non arriva in bagno in tempo"},
];
const INDIC = [
 {n:"1", t:"**Ritenzione acuta** o ostruzione"}, {n:"2", t:"**Diuresi accurata** nel paziente critico"},
 {n:"3", t:"**Chirurgia** prolungata o urologica, per il tempo necessario"},
 {n:"4", t:"**Lesioni sacrali o perineali** nell'incontinente, per farle guarire"},
 {n:"5", t:"**Comfort nel fine vita**, se la persona lo desidera", key:true},
];
const PRINCIPI = [
 {n:"1", t:"**Asepsi** — procedura sterile"}, {n:"2", t:"Operatore **formato**"},
 {n:"3", t:"**Lubrificante sterile**, con anestetico"},
 {n:"4", t:"**Non gonfiare** il palloncino prima di vedere urina", key:true},
 {n:"5", t:"Raccordare **subito** al sistema chiuso"},
];
const UOMO = [
 {t:"Retrarre", d:"il prepuzio, detergere"}, {t:"Lubrificante", d:"in uretra, attendere"},
 {t:"60–90°", d:"poi abbassare"}, {t:"Biforcazione", d:"prima di gonfiare"},
 {t:"Riposizionare", d:"il prepuzio: o parafimosi", key:true},
];
const CIRC = [
 {x:150, y:172, t:"Mai scollegare", d:"ogni apertura è una porta d'ingresso", key:true},
 {x:162, y:212, t:"Sotto la vescica", d:"per evitare il reflusso"},
 {x:162, y:232, t:"Mai a terra"},
 {x:135, y:140, t:"Tubo senza pieghe", d:"né anse declivi"},
 {x:176, y:196, t:"Svuotare a ⅔", d:"contenitore dedicato, il rubinetto non lo tocca"},
 {x:60, y:140, t:"Mani e guanti", d:"a ogni manipolazione"},
];
const BUNDLE = [
 {t:"Indicazione", d:"appropriata"}, {t:"Inserimento", d:"asettico, personale formato"},
 {t:"Sistema chiuso", d:"mai interrotto"}, {t:"Sacca", d:"sotto la vescica"},
 {t:"Rivalutare", d:"ogni giorno, rimuovere presto", key:true}, {t:"Mani", d:"igiene"},
];
const RIMOZ = [
 {t:"Sgonfiare", d:"aspirando con la siringa"}, {t:"Mai tagliare", d:"la valvola"},
 {t:"Rimuovere", d:"delicatamente"}, {t:"Sorvegliare", d:"la minzione entro 6–8 h; bladder scanner", key:true},
];
const MEMO = [
 {n:"1", t:"**Non è** una gestione dell'incontinenza"}, {n:"2", t:"La **durata** è il primo rischio: si toglie appena possibile", key:true},
 {n:"3", t:"**Calibro minimo**, tecnica sterile, palloncino solo dopo l'urina"},
 {n:"4", t:"**Circuito chiuso**, sacca sotto la vescica e mai a terra"},
 {n:"5", t:"Campione dal **punto dedicato**, mai dalla sacca"},
 {n:"6", t:"Niente sostituzione, antisettici, terapia della batteriuria **di routine**"},
 {n:"7", t:"**Riposizionare il prepuzio**"},
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 3 · Bisogni fondamentali, comfort e assistenza di base avanzata",
  titolo:"Eliminazione urinaria<br>e cateterismo vescicale", sottotitolo:"3.6 · Quando il catetere serve, quando no, e come non farlo diventare un'infezione",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"figura", tema:"chiaro", sopratitolo:"Micro-lezione 6 di 8", illu:"catetere",
  titolo:"Una delle procedure più frequenti,<br>e una delle prime cause di **infezione**.",
  sotto:"Il cateterismo vescicale, e le infezioni correlate all'assistenza."},
{id:"s03", tipo:"sostituzione", tema:"chiaro", sopratitolo:"Rovesciare una prospettiva",
  da:{h:"Non è", t:"un comfort per chi assiste"}, a:{h:"È", t:"un dispositivo invasivo"},
  sotto:"Con un rischio che cresce ogni giorno che resta in sede."},
{id:"s04", tipo:"titolo", tema:"profondo",
  titolo:"Non «come lo metto».<br>**Serve davvero?**",
  sotto:"La domanda da farsi prima di aprire il kit, e ogni giorno dopo."},

{id:"s05", tipo:"tre", tema:"chiaro", sopratitolo:"Le urine · che cosa osservare", box:[
  {n:"1", t:"Colore"}, {n:"2", t:"Limpidezza"}, {n:"3", t:"Odore"}, {n:"4", t:"Peso specifico", d:"**1010 – 1025**", key:true}]},
{id:"s06", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, attive:[0,1,2], sopratitolo:"Il vocabolario delle alterazioni · per definizione", celle:URINE},
{id:"s07", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Sette parole, sette definizioni secche", celle:URINE},

{id:"s08", tipo:"figura", tema:"chiaro", sopratitolo:"La ritenzione urinaria", illu:"globo",
  titolo:"Il **globo vescicale**:<br>si riempie, non si svuota.",
  sotto:"Palpabile e dolente sopra il pube; irrequietezza; a volte minzioni piccole e frequenti per rigurgito, che ingannano."},
{id:"s09", tipo:"raggiera", tema:"chiaro", sopratitolo:"Le cause", centro:"Ritenzione", raggi:[
  {t:"Prostata", d:"ipertrofia"}, {t:"Farmaci", d:"anticolinergici, oppioidi"}, {t:"Spinale", d:"anestesia"},
  {t:"Post-op"}, {t:"Fecaloma", d:"il classico dell'anziano", key:true}]},
{id:"s10", tipo:"cifre", tema:"chiaro", sopratitolo:"Lo strumento · il bladder scanner, l'ecografia vescicale", voci:[
  {n:150, suf:"–200 ml", t:"residuo significativo", d:"secondo procedura: si misura senza catetere", key:true}]},

{id:"s11", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, attive:[0,1,2], sopratitolo:"L'incontinenza non è una sola", celle:TIPI},
{id:"s12", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"L'incontinenza non è una sola", celle:TIPI},

{id:"s13", tipo:"trappola", tema:"chiaro", sopratitolo:"La conseguenza più importante", righe:[
  {sb:"«È incontinente: metto il catetere»", ok:"Il catetere **non è una gestione dell'incontinenza**: gli interventi corretti sono altri"}]},
{id:"s14", tipo:"raggiera", tema:"chiaro", sopratitolo:"Gli interventi corretti", centro:"Incontinenza", raggi:[
  {t:"Programmata", d:"minzione a orari fissi"}, {t:"Sollecitata", d:"chiedere e accompagnare", key:true},
  {t:"Training", d:"bladder training, pavimento pelvico"}, {t:"Ausili", d:"assorbenti della misura giusta"},
  {t:"Bagno", d:"raggiungibile: comoda, campanello, abiti facili"}]},
{id:"s15", tipo:"titolo", tema:"profondo",
  titolo:"Non è una gestione:<br>è un **rischio in più**.",
  sotto:"Un catetere per comodità è una delle cause evitabili di infezione più diffuse."},

{id:"s16", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, attive:[0,1,2], sopratitolo:"Quando il catetere è appropriato", celle:INDIC},
{id:"s17", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Tutto il resto va messo in discussione, e di solito non regge", celle:INDIC},

{id:"s18", tipo:"curva", tema:"chiaro", sopratitolo:"Il primo fattore di rischio delle CAUTI · la durata", sale:true, y:"batteriuria", x1:"giorno 1", x2:"giorni di permanenza",
  note:[{t:"Ogni giorno in più", d:"alcuni punti percentuali di rischio"}, {t:"Rimuovere appena possibile", d:"l'intervento più efficace di tutti", key:true}]},
{id:"s19", tipo:"figura", tema:"chiaro", sopratitolo:"L'intervento più efficace", illu:"orologio",
  titolo:"Ogni giorno:<br>**serve ancora?**",
  sotto:"Promemoria e protocolli di rimozione a gestione infermieristica."},
{id:"s20", tipo:"frase", tema:"tenue", sopratitolo:"Un catetere che non serve più non è neutro",
  testo:"Il giorno in cui lo togli è il giorno in cui il rischio **smette di crescere**."},

{id:"s21", tipo:"tre", tema:"chiaro", cifre:true, sopratitolo:"Il presidio · il calibro", box:[
  {t:"12–14 Ch", d:"nell'adulto: il **più piccolo** che garantisca il drenaggio"}, {t:"2 · 3 vie", d:"drenaggio · irrigazione continua"}]},
{id:"s22", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Il presidio · il materiale", celle:[
  {n:"1", t:"**Lattice** — breve termine, attenzione alle allergie"}, {n:"2", t:"**Silicone** — lungo termine"},
  {n:"3", t:"**Foley a 2 vie** — drenaggio"}, {n:"4", t:"**A 3 vie** — irrigazione continua: ematuria con coaguli", key:true}]},
{id:"s23", tipo:"figura", tema:"chiaro", sopratitolo:"Il palloncino", illu:"catetere", lato:"dx",
  titolo:"**Acqua sterile**,<br>nel volume del produttore.",
  sotto:"Non fisiologica, che può cristallizzare; non aria, che galleggia."},

{id:"s24", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, attive:[0,1,2], sopratitolo:"La tecnica · i principi", celle:PRINCIPI},
{id:"s25", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Gonfiarlo in uretra provoca lesioni gravi", celle:PRINCIPI},

{id:"s26", tipo:"percorso", tema:"chiaro", sopratitolo:"Nella donna", tappe:[
  {t:"Divaricare", d:"le labbra"}, {t:"Detergere", d:"dall'alto verso il basso, una garza per passaggio", key:true}, {t:"Introdurre"}]},
{id:"s27", tipo:"trappola", tema:"chiaro", sopratitolo:"Un dettaglio che vale una domanda", righe:[
  {sb:"«È entrato in vagina: lo estraggo e riprovo»", ok:"Si **lascia in sede** come riferimento e si usa un **catetere nuovo** sterile: il primo è contaminato"}]},

{id:"s28", tipo:"percorso", tema:"chiaro", sopratitolo:"Nell'uomo", attive:[0,1,2], tappe:UOMO},
{id:"s29", tipo:"percorso", tema:"chiaro", sopratitolo:"Nell'uomo · fino alla biforcazione prima di gonfiare", attive:[0,1,2,3], tappe:UOMO},
{id:"s30", tipo:"percorso", tema:"chiaro", sopratitolo:"Un catetere ben messo con il prepuzio retratto è un lavoro a metà", tappe:UOMO},

{id:"s31", tipo:"mappa", tema:"chiaro", sopratitolo:"Il circuito chiuso · cuore della prevenzione", illu:"circuito", punti:CIRC.slice(0,2)},
{id:"s32", tipo:"mappa", tema:"chiaro", sopratitolo:"Il circuito chiuso · cuore della prevenzione", illu:"circuito", punti:CIRC.slice(0,5)},
{id:"s33", tipo:"mappa", tema:"chiaro", sopratitolo:"Chiuso finché nessuno lo apre: la maggior parte delle aperture non serve", illu:"circuito", punti:CIRC},

{id:"s34", tipo:"sostituzione", tema:"chiaro", sopratitolo:"L'igiene del meato, ogni giorno",
  da:{h:"Non di routine", t:"antisettici"}, a:{h:"Sì", t:"acqua e sapone"},
  sotto:"Durante l'igiene intima: l'uso routinario di antisettici non riduce le infezioni."},
{id:"s35", tipo:"trappola", tema:"chiaro", sopratitolo:"Il campione di urine", righe:[
  {sb:"«Prelevo dalla sacca»", ok:"Dal **punto di prelievo dedicato**, disinfettato, con siringa sterile: nella sacca l'urina ristagna"}]},
{id:"s36", tipo:"trappola", tema:"chiaro", sopratitolo:"Una nota", righe:[
  {sb:"«Urinocoltura positiva: antibiotico»", ok:"La **batteriuria asintomatica** nel cateterizzato è frequentissima e **non si tratta**: l'urinocoltura si fa se ci sono sintomi"}]},

{id:"s37", tipo:"raggiera", tema:"chiaro", sopratitolo:"Il bundle CAUTI", centro:"Bundle CAUTI", attive:[0,1,2], raggi:BUNDLE},
{id:"s38", tipo:"raggiera", tema:"chiaro", sopratitolo:"Sei misure insieme: il bundle funziona come pacchetto", centro:"Bundle CAUTI", raggi:BUNDLE},

{id:"s39", tipo:"sostituzione", tema:"chiaro", sopratitolo:"Due regole che smontano abitudini",
  da:{h:"Mai", t:"a intervalli fissi"}, a:{h:"Solo", t:"per ostruzione, infezione, malfunzionamento"},
  sotto:"O secondo le indicazioni del produttore per i presidi a lungo termine."},
{id:"s40", tipo:"trappola", tema:"chiaro", sopratitolo:"L'irrigazione vescicale", righe:[
  {sb:"«Lavo il catetere per prevenire»", ok:"Non è prevenzione: solo se **indicata**, a tre vie, a circuito chiuso. Lavare per abitudine è aprire il circuito per abitudine"}]},

{id:"s41", tipo:"percorso", tema:"chiaro", sopratitolo:"La rimozione", attive:[0,1], tappe:RIMOZ},
{id:"s42", tipo:"percorso", tema:"chiaro", sopratitolo:"La rimozione · se non urina, prima il bladder scanner", tappe:RIMOZ},

{id:"s43", tipo:"icone", tema:"chiaro", sopratitolo:"Le alternative al catetere a permanenza", attive:[0], voci:[
  {icona:"catetere", t:"Intermittente", d:"lo **standard** nella ritenzione cronica e nella vescica neurologica; anche pulito, a domicilio", key:true},
  {icona:"persona", t:"Esterno (condom)", d:"nell'uomo incontinente senza ritenzione"},
  {icona:"sacca", t:"Sovrapubico", d:"nei lungo termine selezionati"}]},
{id:"s44", tipo:"icone", tema:"chiaro", sopratitolo:"Tutte con un rischio infettivo inferiore", voci:[
  {icona:"catetere", t:"Intermittente", d:"lo **standard** nella ritenzione cronica e nella vescica neurologica; anche pulito, a domicilio", key:true},
  {icona:"persona", t:"Esterno (condom)", d:"nell'uomo incontinente senza ritenzione"},
  {icona:"sacca", t:"Sovrapubico", d:"nei lungo termine selezionati"}]},

{id:"s45", tipo:"figura", tema:"chiaro", sopratitolo:"In Veneto", illu:"cartella",
  titolo:"Data, calibro, **motivazione**,<br>rivalutazione quotidiana.",
  sotto:"Procedure aziendali che recepiscono il bundle; le CAUTI nella sorveglianza delle ICA (modulo 4)."},
{id:"s46", tipo:"frase", tema:"chiaro", sopratitolo:"La frase che mostra una cultura della prevenzione",
  testo:"«Registro la **motivazione** e rivaluto **ogni giorno** la necessità.»"},

{id:"s47", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, attive:[0,1,2], sopratitolo:"Ricapitoliamo", celle:MEMO},
{id:"s48", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Ricapitoliamo", celle:MEMO},
{id:"s49", tipo:"titolo", tema:"profondo",
  titolo:"Il catetere si toglie<br>**appena possibile**.",
  sotto:"Sette regole, e la prima le vale tutte. Prossima lezione: eliminazione intestinale, dolore e sonno."},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione",
  titolo:"3.7 Eliminazione intestinale, dolore e sonno", sottotitolo:"Stipsi e fecaloma, il dolore che si misura,<br>il sonno che si protegge",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
