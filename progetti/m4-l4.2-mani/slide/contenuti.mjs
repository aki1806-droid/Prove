// Contenuto delle 50 scene della lezione 4.2 — igiene delle mani e precauzioni
// standard. La zona paziente e' una mappa con i cinque momenti come richiami;
// illustrazioni nuove: zona, dispenser, rubinetto, guanto, gomito.

const MOMENTI = [
 {x:14, y:112, t:"Prima del contatto con il paziente", d:"momento 1"},
 {x:76, y:76, t:"Prima di una manovra pulita o asettica", d:"momento 2"},
 {x:150, y:118, t:"Dopo il rischio di esposizione a un liquido biologico", d:"momento 3"},
 {x:186, y:200, t:"Dopo il contatto con il paziente", d:"momento 4"},
 {x:228, y:150, t:"Dopo il contatto con ciò che circonda il paziente", d:"momento 5: il più dimenticato", key:true},
];
const TECNICA = [
 {t:"Palmo contro palmo"}, {t:"Dorso", d:"con il palmo dell'altra"}, {t:"Dita intrecciate"},
 {t:"Dorso delle dita"}, {t:"Pollici", d:"con rotazione", key:true}, {t:"Polpastrelli", d:"sul palmo", key:true},
];
const CONDIZIONI = [
 {n:"1", t:"**Unghie corte**, niente unghie artificiali né smalto"}, {n:"2", t:"**Niente anelli**, orologi, braccialetti", key:true},
 {n:"3", t:"**Avambracci scoperti**"}, {n:"4", t:"**Cura della cute**: creme protettive fuori dall'assistenza"},
];
const STANDARD = [
 {n:"1", t:"**Igiene delle mani**", key:true}, {n:"2", t:"**DPI** in base al rischio, non alla diagnosi", key:true}, {n:"3", t:"Igiene respiratoria"},
 {n:"4", t:"Collocazione del paziente"}, {n:"5", t:"Attrezzature: pulite fra un paziente e l'altro"}, {n:"6", t:"Pulizia ambientale"},
 {n:"7", t:"Biancheria sporca **senza scuoterla**"}, {n:"8", t:"**Pratiche iniettive sicure**"}, {n:"9", t:"Prevenzione delle **punture**"},
];
const INIEZIONI = [
 {n:"1", t:"**Un ago, una siringa**: un paziente, un utilizzo", key:true}, {n:"2", t:"Preferire i **flaconi monodose**"},
 {n:"3", t:"Multidose: **ago e siringa sterili** a ogni prelievo, tappo disinfettato"}, {n:"4", t:"**Mai rientrare** con una siringa usata, nemmeno cambiando l'ago"},
];
const TOSSE = [
 {t:"Fazzoletto", d:"o incavo del gomito"}, {t:"Gettarlo", d:"subito"}, {t:"Mani", d:"igiene", key:true},
 {t:"Mascherina", d:"a chi tossisce"}, {t:"Un metro", d:"in attesa"},
];
const CAUSE = [
 {t:"Carico", d:"di lavoro"}, {t:"Dispenser", d:"lontani", key:true}, {t:"Cute", d:"irritata"}, {t:"Guanti", d:"«bastano»"}, {t:"Oblio", d:"dimenticanza"},
];
const LEVE = [
 {t:"Dispenser", d:"al letto", key:true}, {t:"Formazione"}, {t:"Feedback", d:"osservazione"}, {t:"Promemoria"}, {t:"Esempio", d:"dei colleghi esperti"},
];
const CASO = [
 {t:"Prima di toccarlo", d:"momento 1"}, {t:"Prima dell'infusione", d:"momento 2: nel frattempo hai toccato paziente e letto", key:true}, {t:"Uscendo", d:"momento 4"},
];
const MEMO = [
 {n:"1", t:"**Cinque momenti**: due prima, tre dopo"}, {n:"2", t:"**Frizione** di scelta, **20–30 s**; lavaggio **40–60 s** se sporco o spore"},
 {n:"3", t:"**I guanti non sostituiscono l'igiene**", key:true}, {n:"4", t:"Unghie corte, niente gioielli"},
 {n:"5", t:"**Precauzioni standard a tutti**: ogni liquido biologico è potenzialmente infetto"},
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 4 · Prevenzione e controllo delle infezioni correlate all'assistenza",
  titolo:"Igiene delle mani<br>e precauzioni standard", sottotitolo:"4.2 · La misura singola più efficace, e la più disattesa",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"figura", tema:"chiaro", sopratitolo:"Micro-lezione 2 di 8 · se c'è una sola misura da ricordare", illu:"mani",
  titolo:"L'**igiene delle mani**:<br>la misura singola più efficace.",
  sotto:"Contro le infezioni correlate all'assistenza. Costa quasi nulla."},
{id:"s03", tipo:"frase", tema:"chiaro", sopratitolo:"E resta la più disattesa",
  testo:"Nei concorsi è una certezza: i **cinque momenti dell'OMS** compaiono praticamente sempre."},

{id:"s04", tipo:"figura", tema:"chiaro", sopratitolo:"Perché le mani", illu:"contatto", lato:"dx",
  titolo:"Il **principale veicolo**<br>della trasmissione per contatto.",
  sotto:"La via più frequente in ospedale. Sulla cute esistono due flore."},
{id:"s05", tipo:"confronto", tema:"chiaro", sopratitolo:"Le due flore della cute", col:[
  {h:"Residente", t:"Negli strati profondi, stabile, **poco patogena**"},
  {h:"Transitoria", t:"Acquisita toccando pazienti e superfici: causa **la maggior parte delle ICA**"}]},
{id:"s06", tipo:"sostituzione", tema:"chiaro", sopratitolo:"La buona notizia",
  da:{h:"Si trasmette", t:"facilmente"}, a:{h:"Si rimuove", t:"facilmente"},
  sotto:"Il germe che fa più danno è anche quello che se ne va con venti secondi di gel."},

{id:"s07", tipo:"mappa", tema:"chiaro", sopratitolo:"I cinque momenti dell'OMS · i due prima", illu:"zona", punti:MOMENTI.slice(0,2)},
{id:"s08", tipo:"mappa", tema:"chiaro", sopratitolo:"I cinque momenti dell'OMS · i tre dopo", illu:"zona", punti:MOMENTI.slice(0,4)},
{id:"s09", tipo:"mappa", tema:"chiaro", sopratitolo:"I cinque momenti dell'OMS · anche se il paziente non è stato toccato", illu:"zona", punti:MOMENTI},
{id:"s10", tipo:"titolo", tema:"profondo",
  titolo:"Due **prima**,<br>tre **dopo**.",
  sotto:"Memorizzali nell'ordine: nei quiz compaiono mescolati, e la trappola è proprio l'ordine."},

{id:"s11", tipo:"confronto", tema:"chiaro", sopratitolo:"La logica · aiuta a non confonderli", col:[
  {h:"I «prima» · 1 e 2", t:"Proteggono **il paziente** dai germi che porti sulle mani"},
  {h:"I «dopo» · 3, 4, 5", t:"Proteggono **te e l'ambiente** dai germi del paziente"}]},
{id:"s12", tipo:"catena", tema:"chiaro", sopratitolo:"I dopo: perché tu non li porti altrove", passi:[
  {t:"Il paziente"}, {t:"Le tue mani"}, {t:"Il collega"}, {t:"La stanza accanto"}, {t:"Casa", key:true}]},
{id:"s13", tipo:"trappola", tema:"chiaro", sopratitolo:"Il quinto · il più dimenticato", righe:[
  {sb:"«Non l'ho toccato, non serve»", ok:"Sponde, pompa, campanello: **la sua flora sì**. Momento 5"}]},

{id:"s14", tipo:"confronto", tema:"chiaro", sopratitolo:"Il concetto che sta sotto", col:[
  {h:"Zona paziente", t:"La persona e l'ambiente immediatamente circostante, **colonizzato dalla sua flora**"},
  {h:"Area sanitaria", t:"Tutto il resto"}]},
{id:"s15", tipo:"catena", tema:"chiaro", sopratitolo:"L'igiene si fa ogni volta che si passa da una zona all'altra", passi:[
  {t:"Area sanitaria"}, {t:"Momento 1", d:"entrando", key:true}, {t:"Zona paziente"}, {t:"Momento 4 o 5", d:"uscendo", key:true}, {t:"Area sanitaria"}]},

{id:"s16", tipo:"figura", tema:"chiaro", sopratitolo:"Frizione o lavaggio? · due metodi", illu:"dispenser",
  titolo:"La **frizione alcolica**<br>è il metodo di scelta.",
  sotto:"Nella maggior parte delle situazioni: la risposta giusta quando il quiz non specifica altro."},
{id:"s17", tipo:"cifre", tema:"chiaro", sopratitolo:"Più rapida, più efficace sulla flora transitoria, meglio tollerata, al punto di cura", voci:[
  {n:20, suf:"–30 s", t:"la frizione", d:"fino ad asciugatura", key:true}, {n:40, suf:"–60 s", t:"il lavaggio", d:"acqua e sapone"}]},
{id:"s18", tipo:"figura", tema:"chiaro", sopratitolo:"Il lavaggio con acqua e sapone · il doppio del tempo", illu:"rubinetto", lato:"dx",
  titolo:"Quando le mani sono<br>**visibilmente sporche**.",
  sotto:"Il gel non toglie lo sporco: lo disinfetta."},
{id:"s19", tipo:"tre", tema:"chiaro", sopratitolo:"Tre casi per il lavaggio · negli altri, il gel", box:[
  {n:"1", t:"Sporco visibile"}, {n:"2", t:"Spore", d:"il C. difficile della lezione 3.7", key:true}, {n:"3", t:"Dopo la toilette"}]},

{id:"s20", tipo:"catena", tema:"chiaro", sopratitolo:"La tecnica · una sequenza che copre tutte le superfici", attive:[0,1,2,3], passi:TECNICA},
{id:"s21", tipo:"catena", tema:"chiaro", sopratitolo:"Le zone più dimenticate: pollici, polpastrelli, spazi interdigitali", passi:TECNICA},
{id:"s22", tipo:"trappola", tema:"chiaro", sopratitolo:"Nella frizione", righe:[
  {sb:"Asciugarsi con la carta", ok:"Si strofina **fino ad asciugatura completa**: l'alcol agisce mentre evapora"}]},

{id:"s23", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, attive:[0], sopratitolo:"L'igiene funziona solo su mani in condizione", celle:CONDIZIONI},
{id:"s24", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Le mani screpolate trattengono più germi", celle:CONDIZIONI},

{id:"s25", tipo:"figura", tema:"chiaro", sopratitolo:"Il distrattore più frequente", illu:"guanto",
  titolo:"I guanti **non sostituiscono**<br>l'igiene delle mani.",
  sotto:"Mai, in nessuno dei cinque momenti."},
{id:"s26", tipo:"catena", tema:"chiaro", sopratitolo:"Perché: micro-lesioni invisibili, e le mani si contaminano sfilandoli", passi:[
  {t:"Igiene", key:true}, {t:"Guanti"}, {t:"La manovra"}, {t:"Sfilarli"}, {t:"Igiene", key:true}]},
{id:"s27", tipo:"titolo", tema:"profondo",
  titolo:"I guanti si cambiano<br>**fra un paziente e l'altro**.",
  sotto:"E fra una sede sporca e una pulita dello stesso paziente. Non si lavano né si igienizzano indossati."},

{id:"s28", tipo:"figura", tema:"chiaro", sopratitolo:"L'antisepsi chirurgica · prima degli interventi", illu:"mani", lato:"dx",
  titolo:"Mani e avambracci<br>**fino al gomito**.",
  sotto:"Antisettico specifico o frizione alcolica chirurgica."},
{id:"s29", tipo:"sostituzione", tema:"chiaro", sopratitolo:"Le mani più in alto dei gomiti · lo vedremo nel modulo 9",
  da:{h:"Dal meno pulito", t:"al più pulito"}, a:{h:"Dal più pulito", t:"al meno pulito"},
  sotto:"L'acqua scola dalle mani verso i gomiti, e non il contrario."},

{id:"s30", tipo:"frase", tema:"chiaro", sopratitolo:"Le precauzioni standard · la definizione è la domanda",
  testo:"Si applicano **a tutti i pazienti**, indipendentemente dalla diagnosi e dallo stato infettivo presunto."},
{id:"s31", tipo:"titolo", tema:"profondo",
  titolo:"**A tutti** i pazienti.",
  sotto:"Ogni sangue e ogni liquido biologico è potenzialmente infetto. Non si decide chi è a rischio guardandolo."},

{id:"s32", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, attive:[0,1,2,3], sopratitolo:"Il contenuto · nove elementi", celle:STANDARD},
{id:"s33", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, attive:[0,1,2,3,4,5,6], sopratitolo:"Il contenuto · nove elementi", celle:STANDARD},
{id:"s34", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"La lista completa vale una domanda aperta; i primi due valgono i quiz", celle:STANDARD},

{id:"s35", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, attive:[0], sopratitolo:"Le pratiche iniettive sicure · gli errori qui hanno causato epidemie di epatite", celle:INIEZIONI},
{id:"s36", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Le pratiche iniettive sicure", celle:INIEZIONI},
{id:"s37", tipo:"trappola", tema:"chiaro", sopratitolo:"E le sacche di soluzione", righe:[
  {sb:"Una sacca come diluente per più pazienti", ok:"**Una sacca, un paziente**. Una sola eccezione diventa un'epidemia"}]},

{id:"s38", tipo:"figura", tema:"chiaro", sopratitolo:"L'igiene respiratoria · l'etichetta della tosse", illu:"gomito",
  titolo:"Fazzoletto o **incavo del gomito**,<br>non la mano.",
  sotto:"Entrata nelle precauzioni standard dopo le epidemie respiratorie."},
{id:"s39", tipo:"raggiera", tema:"chiaro", sopratitolo:"Si insegna ai pazienti e ai visitatori, e si pratica per primi", centro:"Tosse", raggi:TOSSE},

{id:"s40", tipo:"frase", tema:"tenue", sopratitolo:"Un dato scomodo",
  testo:"L'adesione, misurata con l'**osservazione diretta**, è spesso ben sotto ciò che gli operatori pensano di fare."},
{id:"s41", tipo:"raggiera", tema:"chiaro", sopratitolo:"Le cause · ostacoli, non cattiva volontà", centro:"Le cause", raggi:CAUSE},
{id:"s42", tipo:"raggiera", tema:"chiaro", sopratitolo:"Le leve dell'OMS · nessuna da sola, tutte insieme", centro:"Le leve", raggi:LEVE},

{id:"s43", tipo:"frase", tema:"chiaro", sopratitolo:"Il caso d'esame",
  testo:"Misuri la pressione, sistemi il cuscino, poi prepari un'**infusione endovenosa** per lo stesso paziente. Quando fai l'igiene?"},
{id:"s44", tipo:"catena", tema:"chiaro", sopratitolo:"Tre volte", passi:CASO},
{id:"s45", tipo:"trappola", tema:"chiaro", sopratitolo:"Tre igieni in una visita di cinque minuti, ognuna con un motivo diverso", righe:[
  {sb:"«Una volta, all'inizio»", ok:"Momento 1, poi **momento 2** prima della manovra asettica, poi momento 4 uscendo"}]},

{id:"s46", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"In Veneto", celle:[
  {n:"1", t:"**Campagne aziendali** periodiche"}, {n:"2", t:"**Osservazione dell'adesione** da parte degli ICI", key:true},
  {n:"3", t:"**Dispenser** al punto di cura"}, {n:"4", t:"**Restituzione** dei risultati ai reparti"}]},
{id:"s47", tipo:"numero", tema:"chiaro", sopratitolo:"La giornata mondiale dell'OMS · all'orale, citare l'osservazione con feedback", cifra:"5 maggio",
  testo:"Molte aziende aderiscono alla giornata mondiale dell'igiene delle mani."},

{id:"s48", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, attive:[0,1], sopratitolo:"Ricapitoliamo", celle:MEMO},
{id:"s49", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"Ricapitoliamo · prossima lezione: quando le standard non bastano", celle:MEMO},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione",
  titolo:"4.3 Precauzioni aggiuntive<br>e isolamento", sottotitolo:"Contatto, droplet, via aerea:<br>chi indossa che cosa",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
