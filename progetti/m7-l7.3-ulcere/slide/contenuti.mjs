// Contenuto delle 50 scene della lezione 7.3 — ulcere vascolari e piede
// diabetico. Due corpi nuovi: le due gambe a confronto (la venosa
// edematosa e pigmentata con l'ulcera al malleolo e il polso presente,
// l'arteriosa pallida e glabra con l'ulcera nera a stampo e il polso
// assente) e la scala dell'ABI, con le zone e poi con le soglie della
// compressione. Il piede diabetico sta nelle griglie, nel percorso e nella
// fascia di Wagner.

const VEN = ["**Malleolo mediale**", "Superficiale, margini irregolari", "Essudato **abbondante**", "Edema, cute **pigmentata**, eczema", "Dolore moderato, **migliora sollevando**"];
const ART = ["**Dita**, tallone, dorso del piede", "Margini **netti**, a stampo", "Fondo pallido o necrotico, essudato **scarso**", "Cute **pallida, fredda, glabra**", "Dolore intenso, **peggiora sollevando**"];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 7 · Wound care, stomie e drenaggi",
  titolo:"Ulcere vascolari<br>e piede diabetico", sottotitolo:"7.3 · Qual è la causa?",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"frase", tema:"chiaro", sopratitolo:"Micro-lezione 3 di 8 · un problema enorme, soprattutto a domicilio",
  testo:"Il trattamento parte da una domanda sola: **qual è la causa?**"},
{id:"s03", tipo:"trappola", tema:"chiaro", sopratitolo:"Venosa e arteriosa si curano in modo opposto", righe:[
  {sb:"La compressione su un'ulcera arteriosa: può far perdere l'arto", ok:"La compressione **guarisce la venosa**, e solo quella"}]},
{id:"s04", tipo:"frase", tema:"chiaro", sopratitolo:"Il cuore della lezione",
  testo:"Prima si capisce **quale gamba** si ha davanti, poi si apre la medicazione: la **diagnosi differenziale**."},

{id:"s05", tipo:"gambe2", tema:"chiaro", sopratitolo:"L'ulcera venosa, la più frequente · insufficienza venosa: il sangue ristagna e la pressione danneggia i tessuti", attive:[0], key:[0], voci:[VEN.slice(0,1), []]},
{id:"s06", tipo:"gambe2", tema:"chiaro", sopratitolo:"L'ulcera venosa · il terzo inferiore della gamba, la zona della ghetta", attive:[0], key:[0], voci:[VEN.slice(0,3), []]},
{id:"s07", tipo:"gambe2", tema:"chiaro", sopratitolo:"L'ulcera venosa · intorno: edema, iperpigmentazione bruna, eczema, indurimento · polsi presenti", attive:[0], key:[0], voci:[VEN, []]},
{id:"s08", tipo:"frase", tema:"chiaro", sopratitolo:"Edema, iperpigmentazione, eczema, lipodermatosclerosi",
  testo:"La gamba racconta **anni di ristagno** prima dell'ulcera: chi guarda solo l'ulcera non vede la causa."},

{id:"s09", tipo:"gambe2", tema:"chiaro", sopratitolo:"L'ulcera arteriosa · ischemia: il sangue arterioso non arriva · le zone più distali", attive:[1], key:[1], voci:[[], ART.slice(0,1)]},
{id:"s10", tipo:"gambe2", tema:"chiaro", sopratitolo:"L'ulcera arteriosa · margini netti, come fatti con uno stampo", attive:[1], key:[1], voci:[[], ART.slice(0,4)]},
{id:"s11", tipo:"gambe2", tema:"chiaro", sopratitolo:"L'ulcera arteriosa · sollievo con la gamba penzoloni fuori dal letto · polsi assenti o ridotti", attive:[1], key:[1], voci:[[], ART]},

{id:"s12", tipo:"gambe2", tema:"chiaro", sopratitolo:"Il confronto · sede, essudato, cute", voci:[VEN.slice(0,4), ART.slice(0,4)]},
{id:"s13", tipo:"confronto", tema:"chiaro", sopratitolo:"Se ricordi solo una riga, ricorda quella del dolore e della posizione: è la più chiesta", col:[
  {h:"Venosa", t:"**migliora** sollevando · polsi **presenti**", key:true}, {h:"Arteriosa", t:"**peggiora** sollevando · polsi **assenti**"}]},

{id:"s14", tipo:"abi", tema:"chiaro", sopratitolo:"Lo strumento che decide · l'indice caviglia-braccio", attive:[]},
{id:"s15", tipo:"abi", tema:"chiaro", sopratitolo:"L'ABI · normale fra circa 0,9 e 1,3 · sotto 0,9 arteriopatia · sotto 0,5 ischemia grave", attive:[0,1,2], formula:false},
{id:"s16", tipo:"abi", tema:"chiaro", sopratitolo:"Sopra 1,3 · arterie incomprimibili perché calcificate, tipiche del diabetico: servono altri esami", formula:false},

{id:"s17", tipo:"frase", tema:"chiaro", sopratitolo:"La compressione è il trattamento dell'ulcera venosa · perché la causa, il ristagno, resta",
  testo:"Senza compressione un'ulcera venosa **difficilmente guarisce**. Ma prima si misura l'**ABI**."},
{id:"s18", tipo:"abi", tema:"chiaro", sopratitolo:"La compressione secondo l'ABI", modo:"compressione", formula:false},
{id:"s19", tipo:"titolo", tema:"chiaro",
  titolo:"**Senza ABI non si comprime.**",
  sotto:"Un bendaggio su un arto ischemico può provocare necrosi."},

{id:"s20", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Il bendaggio · pressione graduata, per favorire il ritorno venoso", celle:[
  {n:"1", t:"Piede a **90 gradi**"}, {n:"2", t:"Dalla **base delle dita** fino **sotto il ginocchio**, tallone incluso", key:true}, {n:"3", t:"**Maggiore alla caviglia**, decrescente verso l'alto"}]},
{id:"s21", tipo:"griglia", tema:"chiaro", colonne:1, spunta:true, sopratitolo:"Il bendaggio", celle:[
  {t:"Spire **sovrapposte in modo regolare**: la pressione deve essere uniforme", key:true}, {t:"Oggi, spesso, **sistemi multicomponente**"}]},
{id:"s22", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Si sorvegliano le dita, che restano fuori proprio per questo · se compaiono: si allenta e si avvisa", celle:[
  {n:"1", t:"**Dolore**", key:true}, {n:"2", t:"**Intorpidimento**"}, {n:"3", t:"**Colorito**"}, {n:"4", t:"**Temperatura**"}]},

{id:"s23", tipo:"griglia", tema:"chiaro", colonne:1, spunta:true, sopratitolo:"Le altre misure", celle:[
  {t:"**Sollevare le gambe** a riposo"}, {t:"**Camminare**: la pompa muscolare del polpaccio", key:true}, {t:"Evitare di stare **a lungo in piedi**"}]},
{id:"s24", tipo:"frase", tema:"chiaro", sopratitolo:"Dopo la guarigione · le ulcere venose recidivano molto se si sospende la compressione",
  testo:"**Calze elastiche** terapeutiche, spesso **per tutta la vita**."},

{id:"s25", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"Nell'ulcera arteriosa · senza rivascolarizzazione spesso non guarisce", celle:[
  {n:"1", t:"**Valutazione vascolare** specialistica", key:true}, {n:"2", t:"**Niente compressione**"}, {n:"3", t:"**Non sollevare** l'arto"}]},
{id:"s26", tipo:"trappola", tema:"chiaro", sopratitolo:"Proteggere dal freddo, ma · su un arto ischemico e poco sensibile provocano ustioni", righe:[
  {sb:"Borse dell'acqua calda, fonti di calore dirette", ok:"**Niente calore diretto**"}]},
{id:"s27", tipo:"griglia", tema:"chiaro", colonne:1, spunta:true, sopratitolo:"Tutto quello che nella venosa aiuta, qui è al contrario", celle:[
  {t:"Le **escare secche stabili** non si rimuovono"}, {t:"Controllo del **dolore**"}, {t:"Abbandono del **fumo**", key:true}]},

{id:"s28", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"Il piede diabetico · tre meccanismi, spesso insieme", celle:[
  {n:"1", t:"**Neuropatia**: la persona non sente il dolore, non si accorge della scarpa che stringe, del sassolino, della bruciatura", key:true}, {n:"2", t:"**Arteriopatia**: la perfusione è ridotta"}, {n:"3", t:"**Infezione**: nel diabetico progredisce rapidamente"}]},
{id:"s29", tipo:"frase", tema:"chiaro", sopratitolo:"Il risultato può essere un'ulcera che nessuno ha notato finché non è grave",
  testo:"Spesso coesistono: il piede diabetico è **tre problemi in uno**."},

{id:"s30", tipo:"fascia", tema:"chiaro", sopratitolo:"Due classificazioni · Wagner, dal grado 0 al grado 5 · sei gradi, e il grado zero è già un piede da sorvegliare", min:0, max:6, classi:[
  {da:0, a:1, t:"0", d:"a rischio"}, {da:1, a:2, t:"1"}, {da:2, a:3, t:"2"}, {da:3, a:4, t:"3"}, {da:4, a:5, t:"4"}, {da:5, a:6, t:"5", d:"gangrena estesa", key:true}]},
{id:"s31", tipo:"confronto", tema:"chiaro", sopratitolo:"Due classificazioni", col:[
  {h:"Wagner", t:"gradi **0–5**, dal piede a rischio alla gangrena estesa"}, {h:"Università del Texas", t:"**profondità** + **infezione** e **ischemia**", key:true}]},
{id:"s32", tipo:"percorso", tema:"chiaro", sopratitolo:"La valutazione · se la persona non percepisce il monofilamento in alcuni punti, ha perso la sensibilità protettiva", tappe:[
  {t:"Monofilamento", d:"da 10 grammi", key:true}, {t:"Polsi", d:"palpazione"}, {t:"Ispezione"}]},

{id:"s33", tipo:"trappola", tema:"chiaro", sopratitolo:"Il trattamento dell'ulcera plantare · un principio", righe:[
  {sb:"Camminare sulla lesione: non guarisce, qualunque medicazione si usi", ok:"**Lo scarico**"}]},
{id:"s34", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"Lo scarico · l'equivalente, per il piede, del riposizionamento nelle lesioni da pressione", celle:[
  {n:"1", t:"**Gessi a contatto totale**", key:true}, {n:"2", t:"**Tutori**"}, {n:"3", t:"**Calzature e plantari** specifici"}]},

{id:"s35", tipo:"griglia", tema:"chiaro", colonne:1, spunta:true, sopratitolo:"La prevenzione è soprattutto educazione", celle:[
  {t:"**Ispezionare i piedi ogni giorno**, anche con uno specchio", key:true}, {t:"Acqua **tiepida**, verificata con il **gomito** o un termometro, non con il piede che non sente"}]},
{id:"s36", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"L'educazione · un sassolino non si sente, si trova", celle:[
  {t:"Asciugare bene **fra le dita**"}, {t:"Unghie tagliate **dritte**"}, {t:"**Mai camminare scalzi**", key:true}, {t:"Calzature comode, **controllate all'interno**"}]},
{id:"s37", tipo:"griglia", tema:"chiaro", colonne:1, spunta:true, sopratitolo:"L'educazione · nel piede che non sente, piccola non vuol dire innocua", celle:[
  {t:"**Niente fonti di calore**, niente callifughi"}, {t:"**Rivolgersi subito** per qualunque lesione, anche piccola", key:true}]},

{id:"s38", tipo:"frase", tema:"chiaro", sopratitolo:"Il caso · anziana, ulcera al malleolo mediale, edema, essudato abbondante: il quadro è venoso",
  testo:"Viene chiesto un **bendaggio compressivo**, ma l'**ABI non è stato misurato**. Che cosa fai?"},
{id:"s39", tipo:"percorso", tema:"chiaro", sopratitolo:"Che cosa fai · un'arteriopatia associata è frequente nell'anziano", tappe:[
  {t:"Niente compressione", d:"finché l'ABI non è valutato", key:true}, {t:"Segnalare"}, {t:"Chiedere l'ABI"}]},
{id:"s40", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Nel frattempo · tutto ciò che aiuta la venosa senza rischiare l'arteriosa", celle:[
  {t:"**Detergere**"}, {t:"Gestire l'**essudato**"}, {t:"Proteggere la **cute perilesionale**"}, {t:"**Sollevare la gamba** a riposo", key:true}]},
{id:"s41", tipo:"titolo", tema:"profondo",
  titolo:"È l'**ABI** che esclude l'arteriopatia, non l'occhio.",
  sotto:"Un quadro venoso evidente non esclude un'arteriopatia nascosta."},

{id:"s42", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"In Veneto", celle:[
  {n:"1", t:"**Percorsi** e **centri di riferimento** per il piede diabetico, con équipe multidisciplinari", key:true}, {n:"2", t:"**Ambulatori vulnologici** aziendali e territoriali"}]},
{id:"s43", tipo:"frase", tema:"chiaro", sopratitolo:"La maggior parte delle ulcere degli arti inferiori si cura a domicilio, con l'ADI",
  testo:"È lì che l'infermiere decide, spesso da solo, se quella gamba **si può comprimere**."},
{id:"s44", tipo:"confronto", tema:"chiaro", sopratitolo:"All'orale, le parole chiave", col:[
  {h:"Piede diabetico", t:"**multidisciplinarietà**"}, {h:"Ulcera venosa", t:"**ABI prima della compressione**", key:true}]},

{id:"s45", tipo:"colonne", tema:"chiaro", sopratitolo:"Ricapitoliamo", colonne:[
  {h:"Venosa", key:true, voci:[{t:"Malleolo mediale, essudato abbondante"}, {t:"**Migliora sollevando**, polsi presenti", key:true}]},
  {h:"Arteriosa", voci:[{t:"Dita, cute pallida"}, {t:"**Peggiora sollevando**, polsi assenti"}]}]},
{id:"s46", tipo:"griglia", tema:"chiaro", colonne:1, spunta:true, sopratitolo:"Ricapitoliamo · l'ABI", celle:[
  {t:"Normale **0,9–1,3**"}, {t:"Sotto **0,5** niente compressione"}, {t:"**Senza ABI**, nessuna compressione", key:true}]},
{id:"s47", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Ricapitoliamo · il piede diabetico", celle:[
  {t:"**Neuropatia, arteriopatia, infezione**"}, {t:"**Scarico**", key:true}, {t:"**Educazione**"}, {t:"**Monofilamento** da 10 g"}]},
{id:"s48", tipo:"frase", tema:"chiaro", sopratitolo:"Nella prossima lezione",
  testo:"Le **ferite chirurgiche** e l'infezione del sito chirurgico."},
{id:"s49", tipo:"frase", tema:"chiaro", sopratitolo:"A tra poco",
  testo:"Dalla ferita che guarisce da sola alla ferita che va **protetta nei primi giorni**."},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione",
  titolo:"7.4<br>Ferite chirurgiche", sottotitolo:"Infezione del sito chirurgico, deiscenza, eviscerazione",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
