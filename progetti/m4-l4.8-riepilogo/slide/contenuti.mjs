// Contenuto delle 50 scene della lezione 4.8 — Riepilogo del Modulo 4. La
// mappa e' l'anello delle sette lezioni con le illustrazioni del modulo; il
// filo e' la catena a sei anelli che si spezza; i bundle sono colonne, le
// tabelle colonne, i numeri cifre, le confusioni trappole, le sequenze
// percorsi.

const LEZIONI = [
 {n:"4.1", t:"ICA e catena", illu:"microbo"},
 {n:"4.2", t:"Mani e precauzioni standard", illu:"rubinetto"},
 {n:"4.3", t:"Precauzioni aggiuntive", illu:"aerosol"},
 {n:"4.4", t:"DPI", illu:"respiratore"},
 {n:"4.5", t:"Sterilizzazione", illu:"autoclave"},
 {n:"4.6", t:"Antibiotico-resistenza", illu:"siringa"},
 {n:"4.7", t:"Rischio biologico e rifiuti", illu:"puntura"},
];
const ANELLI = [
 {t:"Agente"}, {t:"Serbatoio"}, {t:"Porta di uscita"}, {t:"Via di trasmissione", key:true}, {t:"Porta di ingresso"}, {t:"Ospite suscettibile"},
];
const SPEZZA = [
 {t:"Agente", d:"sterilizzazione, disinfezione"}, {t:"Serbatoio", d:"pulizia ambientale"}, {t:"Porta di uscita", d:"igiene respiratoria"},
 {t:"Trasmissione", d:"le mani, i DPI", key:true}, {t:"Porta di ingresso", d:"asepsi sui dispositivi"}, {t:"Ospite", d:"vaccini, nutrizione"},
];
const B1 = [
 {h:"VAP", voci:[{t:"Testata a 30–45°", key:true}, {t:"Igiene del cavo orale"}, {t:"Aspirazione sub-glottica"}, {t:"Pressione della cuffia"}, {t:"Interruzione quotidiana della sedazione"}]},
 {h:"CAUTI", voci:[{t:"Indicazione appropriata", key:true}, {t:"Inserimento asettico"}, {t:"Circuito chiuso"}, {t:"Sacca sotto la vescica"}, {t:"Rimozione precoce"}]},
];
const B2 = [
 {h:"CLABSI", voci:[{t:"Igiene delle mani"}, {t:"Massime barriere sterili", key:true}, {t:"Clorexidina 2 % in alcol"}, {t:"Scelta del sito"}, {t:"Rivalutazione quotidiana e rimozione"}]},
 {h:"SSI", voci:[{t:"Niente rasoio: clipper, subito prima", key:true}, {t:"Profilassi antibiotica entro 60 min"}, {t:"Antisepsi cutanea"}, {t:"Normotermia"}, {t:"Controllo della glicemia"}]},
];
const PRECAUZIONI = [
 {h:"Contatto", voci:[{t:"MDRO"}, {t:"C. difficile", key:true}, {t:"Scabbia"}, {t:"Norovirus"}]},
 {h:"Droplet", voci:[{t:"Influenza"}, {t:"Pertosse"}, {t:"Meningococco"}, {t:"Parotite, rosolia"}]},
 {h:"Via aerea", key:true, voci:[{t:"Tubercolosi", key:true}, {t:"Morbillo"}, {t:"Varicella"}, {t:"Pressione negativa, FFP2"}]},
];
const SPAULDING = [
 {h:"Critici", key:true, voci:[{t:"Tessuti sterili, vasi"}, {t:"Sterilizzazione", key:true}]},
 {h:"Semicritici", voci:[{t:"Mucose, cute non integra"}, {t:"Disinfezione di alto livello", key:true}]},
 {h:"Non critici", voci:[{t:"Cute integra"}, {t:"Basso livello", key:true}]},
];
const VESTI = [{t:"Igiene delle mani"}, {t:"Camice"}, {t:"Mascherina"}, {t:"Occhiali"}, {t:"Guanti", d:"per ultimi", key:true}];
const SVESTI = [{t:"Guanti", d:"per primi", key:true}, {t:"Occhiali"}, {t:"Camice"}, {t:"Mascherina", d:"via aerea: fuori dalla stanza"}, {t:"Igiene delle mani"}];
const ESPOSIZIONE = [{t:"Lavare"}, {t:"Sanguinare", d:"senza spremere", key:true}, {t:"Segnalare", d:"subito"}, {t:"La fonte"}, {t:"Profilassi", d:"entro poche ore", key:true}, {t:"Denuncia"}];
const CASI = [
 {n:"1", t:"**Diarrea dopo antibiotico** → C. difficile: contatto, acqua e sapone, sporicida"},
 {n:"2", t:"**Tosse, febbre, infiltrato apicale** → via aerea subito, senza aspettare il referto"},
 {n:"3", t:"**Da RSA, febbre, catetere** → contatto e screening, colture prima, catetere da rivalutare", key:true},
 {n:"4", t:"**Puntura accidentale** → i sei passi, profilassi entro poche ore"},
 {n:"5", t:"**Confezione sterile bagnata** → non è più sterile"},
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 4 · Riepilogo",
  titolo:"Ricomponiamo<br>il modulo 4", sottotitolo:"4.8 · Bundle, tabelle, sequenze e le confusioni che costano punti",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"frase", tema:"chiaro", sopratitolo:"Micro-lezione 8 di 8 · uno dei moduli più redditizi per i quiz",
  testo:"Le ICA tornano in ogni concorso, e le domande sono **quasi sempre le stesse**."},
{id:"s03", tipo:"catena", tema:"chiaro", sopratitolo:"Oggi · un ripasso, con il ritmo di un ripasso", passi:[
  {t:"I quattro bundle"}, {t:"Le tabelle", d:"precauzioni, Spaulding, esposizione", key:true}, {t:"Le confusioni", d:"che costano più punti"}]},

{id:"s04", tipo:"anello", tema:"chiaro", sopratitolo:"La mappa · sette lezioni", centro:"Modulo 4", sotto:"sette lezioni", attive:[0,1], voci:LEZIONI},
{id:"s05", tipo:"anello", tema:"chiaro", sopratitolo:"La mappa · sette lezioni", centro:"Modulo 4", sotto:"sette lezioni", attive:[0,1,2,3,4], voci:LEZIONI},
{id:"s06", tipo:"anello", tema:"chiaro", sopratitolo:"La mappa · sette lezioni, un solo filo", centro:"Modulo 4", sotto:"sette lezioni", voci:LEZIONI},

{id:"s07", tipo:"anelli", tema:"chiaro", sopratitolo:"Il filo · la catena delle infezioni: l'infezione si realizza solo se ci sono tutti e sei", voci:ANELLI},
{id:"s08", tipo:"anelli", tema:"chiaro", sopratitolo:"Ogni lezione è un modo di spezzare un anello", rotto:3, voci:SPEZZA},
{id:"s09", tipo:"titolo", tema:"profondo",
  titolo:"Le barriere multiple di Reason:<br>**nessuna basta da sola**.",
  sotto:"Tutte insieme lo sono. Il parallelo con il modulo 2."},

{id:"s10", tipo:"colonne", tema:"chiaro", sopratitolo:"I bundle · pacchetti di misure che funzionano insieme", attive:[0], colonne:B1},
{id:"s11", tipo:"colonne", tema:"chiaro", sopratitolo:"VAP · meno giorni di tubo, meno polmoniti", attive:[0], colonne:B1},
{id:"s12", tipo:"colonne", tema:"chiaro", sopratitolo:"CAUTI · il catetere più sicuro è quello che non si mette", colonne:B1},

{id:"s13", tipo:"colonne", tema:"chiaro", sopratitolo:"CLABSI · all'inserimento del catetere venoso centrale", attive:[0], colonne:B2},
{id:"s14", tipo:"colonne", tema:"chiaro", sopratitolo:"CLABSI · il catetere che non serve più è un catetere da togliere oggi", attive:[0], colonne:B2},
{id:"s15", tipo:"colonne", tema:"chiaro", sopratitolo:"SSI · il sito chirurgico", colonne:B2},
{id:"s16", tipo:"colonne", tema:"chiaro", sopratitolo:"CLABSI e SSI · li approfondiremo nei moduli 6 e 9", colonne:B2},

{id:"s17", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, attive:[0,1], sopratitolo:"Che cosa hanno in comune i quattro bundle", celle:[
  {t:"**Igiene delle mani**, sempre, prima e dopo", key:true}, {t:"**Asepsi** nelle manovre invasive"},
  {t:"**Rivalutazione quotidiana** della necessità del dispositivo"}, {t:"**Rimozione precoce**"}]},
{id:"s18", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Ogni giorno in più di catetere o di tubo è un giorno in più di rischio", celle:[
  {t:"**Igiene delle mani**, sempre, prima e dopo", key:true}, {t:"**Asepsi** nelle manovre invasive"},
  {t:"**Rivalutazione quotidiana** della necessità del dispositivo"}, {t:"**Rimozione precoce**"}]},
{id:"s19", tipo:"frase", tema:"chiaro", sopratitolo:"Il principio del bundle stesso",
  testo:"Le misure funzionano **insieme**, applicate **tutte**. Un bundle applicato a metà non è un bundle."},

{id:"s20", tipo:"cifre", tema:"chiaro", sopratitolo:"I numeri · con la cifra secca", voci:[
  {n:48, suf:" h", t:"ICA", d:"dopo il ricovero", key:true}, {n:30, suf:" gg", t:"SSI", d:"90 con impianto"}, {n:5, t:"momenti", d:"dell'igiene delle mani"}]},
{id:"s21", tipo:"cifre", tema:"chiaro", sopratitolo:"I numeri · le mani e le goccioline", voci:[
  {n:30, suf:" s", t:"frizione", d:"20–30 secondi con il gel", key:true}, {n:60, suf:" s", t:"lavaggio", d:"40–60 con acqua e sapone"}, {n:2, suf:" m", t:"droplet", d:"entro 1–2 metri"}]},
{id:"s22", tipo:"cifre", tema:"chiaro", sopratitolo:"I numeri · i respiratori e la profilassi HIV", voci:[
  {n:94, suf:" %", t:"FFP2"}, {n:99, suf:" %", t:"FFP3"}, {n:2, suf:" h", t:"PEP HIV", d:"max 48–72, per 28 giorni", key:true}]},
{id:"s23", tipo:"cifre", tema:"chiaro", sopratitolo:"I numeri · un punto ciascuno", voci:[
  {n:10, suf:" mUI/ml", t:"anti-HBs", d:"protettivi da qui"}, {n:2, suf:" set", t:"emocolture", d:"da siti diversi", key:true}, {n:10, suf:" ml", t:"per flacone", d:"8–10 nell'adulto"}]},

{id:"s24", tipo:"colonne", tema:"chiaro", sopratitolo:"Le tabelle · le precauzioni aggiuntive", attive:[0,1], colonne:PRECAUZIONI},
{id:"s25", tipo:"colonne", tema:"chiaro", sopratitolo:"Le tabelle · via aerea: porta chiusa, FFP2, tolto fuori · alcune malattie ne richiedono due", colonne:PRECAUZIONI},
{id:"s26", tipo:"colonne", tema:"chiaro", sopratitolo:"Le tabelle · Spaulding: dove arriva il dispositivo?", colonne:SPAULDING},

{id:"s27", tipo:"trappola", tema:"chiaro", sopratitolo:"Le confusioni che costano più punti · nove, in due giri", righe:[
  {sb:"«Ho i guanti, le mani sono a posto»", ok:"I guanti **non sostituiscono** l'igiene delle mani: prima e dopo"}]},
{id:"s28", tipo:"trappola", tema:"chiaro", sopratitolo:"Le confusioni · due e tre", righe:[
  {sb:"Gel alcolico sulle spore", ok:"Non le uccide: con il C. difficile **acqua e sapone**"},
  {sb:"Chirurgica = respiratore", ok:"La chirurgica protegge gli altri, il **respiratore protegge te**"}]},
{id:"s29", tipo:"confronto", tema:"chiaro", sopratitolo:"Le confusioni · quattro: la pressione della stanza", col:[
  {h:"Negativa", t:"Paziente **contagioso**: l'aria non deve uscire", key:true},
  {h:"Positiva", t:"Paziente **immunodepresso**: l'aria non deve entrare"}]},

{id:"s30", tipo:"trappola", tema:"chiaro", sopratitolo:"Le confusioni · cinque e sei", righe:[
  {sb:"Disinfezione = sterilizzazione", ok:"Solo la **sterilizzazione** elimina anche le spore"},
  {sb:"Decontaminazione per il paziente", ok:"Protegge soprattutto **l'operatore**"}]},
{id:"s31", tipo:"trappola", tema:"chiaro", sopratitolo:"Le confusioni · sette", righe:[
  {sb:"Il nastro ha virato: è sterile", ok:"Dice solo che è **passata in autoclave**: il contenuto lo dicono gli indicatori interni e i parametri"}]},
{id:"s32", tipo:"trappola", tema:"chiaro", sopratitolo:"Le confusioni · otto e nove", righe:[
  {sb:"Colonizzato = infetto", ok:"Non è infezione, ma il colonizzato è un **serbatoio**: le precauzioni valgono lo stesso"},
  {sb:"Profilassi per l'epatite C", ok:"**Non esiste**: solo il follow-up"}]},

{id:"s33", tipo:"percorso", tema:"chiaro", sopratitolo:"Le sequenze · vestizione e svestizione", tappe:VESTI},
{id:"s34", tipo:"percorso", tema:"chiaro", sopratitolo:"Svestizione · si toccano solo lacci ed elastici: la parte davanti è contaminata per definizione", tappe:SVESTI},
{id:"s35", tipo:"percorso", tema:"chiaro", sopratitolo:"Esposizione · sei passi, in quest'ordine", tappe:ESPOSIZIONE},

{id:"s36", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, attive:[0], sopratitolo:"I casi · cinque, quelli che tornano", celle:CASI},
{id:"s37", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, attive:[0,1,2], sopratitolo:"I casi", celle:CASI},
{id:"s38", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"I casi", celle:CASI},
{id:"s39", tipo:"sostituzione", tema:"chiaro", sopratitolo:"In tutti e cinque la risposta giusta è quella che agisce subito",
  da:{h:"Non", t:"aspettare la conferma"}, a:{h:"Ma", t:"isolare prima, confermare dopo"},
  sotto:"E prelevare prima, somministrare dopo."},

{id:"s40", tipo:"frase", tema:"chiaro", sopratitolo:"Il ruolo dell'infermiere in una frase · se all'orale te lo chiedono",
  testo:"L'infermiere è il professionista con **più contatti** con la persona assistita, a ogni turno, a ogni gesto."},
{id:"s41", tipo:"titolo", tema:"profondo",
  titolo:"La prevenzione delle ICA passa,<br>letteralmente, **dalle sue mani**.",
  sotto:"Gestisce i dispositivi, esegue i prelievi colturali, somministra gli antibiotici."},

{id:"s42", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, attive:[0,1], sopratitolo:"Gli agganci veneti · quelli che all'orale fanno la differenza", celle:[
  {n:"1", t:"**Comitati aziendali** per il controllo delle infezioni, con **infermieri addetti al controllo**", key:true},
  {n:"2", t:"**Campagne sull'igiene delle mani** con osservazione e feedback"},
  {n:"3", t:"**Programmi di stewardship** multidisciplinari, con l'infermiere"},
  {n:"4", t:"**Procedura per l'esposizione** a rischio biologico, percorso rapido tutto il giorno"},
  {n:"5", t:"**Notifica** delle malattie infettive al Dipartimento di Prevenzione"}]},
{id:"s43", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, attive:[0,1,2,3], sopratitolo:"Gli agganci veneti", celle:[
  {n:"1", t:"**Comitati aziendali** per il controllo delle infezioni, con **infermieri addetti al controllo**", key:true},
  {n:"2", t:"**Campagne sull'igiene delle mani** con osservazione e feedback"},
  {n:"3", t:"**Programmi di stewardship** multidisciplinari, con l'infermiere"},
  {n:"4", t:"**Procedura per l'esposizione** a rischio biologico, percorso rapido tutto il giorno"},
  {n:"5", t:"**Notifica** delle malattie infettive al Dipartimento di Prevenzione"}]},
{id:"s44", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"Cinque agganci, cinque modi di dire: conosco il sistema in cui andrò a lavorare", celle:[
  {n:"1", t:"**Comitati aziendali** per il controllo delle infezioni, con **infermieri addetti al controllo**", key:true},
  {n:"2", t:"**Campagne sull'igiene delle mani** con osservazione e feedback"},
  {n:"3", t:"**Programmi di stewardship** multidisciplinari, con l'infermiere"},
  {n:"4", t:"**Procedura per l'esposizione** a rischio biologico, percorso rapido tutto il giorno"},
  {n:"5", t:"**Notifica** delle malattie infettive al Dipartimento di Prevenzione"}]},

{id:"s45", tipo:"cifre", tema:"chiaro", sopratitolo:"Come proseguire · il test del modulo", voci:[
  {n:30, t:"domande"}, {n:21, t:"soglia", d:"sette errori si possono fare, l'ottavo dice quale lezione rivedere", key:true}]},
{id:"s46", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Nel quaderno · le tabelle e le sequenze", celle:[
  {t:"Le **precauzioni** per malattia"}, {t:"**Spaulding**"}, {t:"**Vestizione** e **svestizione**", key:true}, {t:"I **sei passi** dopo una puntura"}]},
{id:"s47", tipo:"figura", tema:"chiaro", sopratitolo:"E un esercizio pratico", illu:"camice",
  titolo:"Simula **ad alta voce**<br>la vestizione e la svestizione.",
  sotto:"Come se dovessi spiegarle a un collega: è ciò che può chiederti la prova pratica."},

{id:"s48", tipo:"titolo", tema:"profondo",
  titolo:"Ogni infezione prevenuta<br>è **un antibiotico non usato**.",
  sotto:"E ogni antibiotico non usato è una resistenza in meno, per il paziente di oggi e per quello di domani."},
{id:"s49", tipo:"frase", tema:"chiaro", sopratitolo:"Il prossimo modulo · l'area che nei concorsi pesa più di ogni altra",
  testo:"La **farmacologia** e la gestione sicura della terapia. Ci vediamo lì."},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossimo modulo",
  titolo:"Modulo 5<br>Farmacologia", sottotitolo:"La gestione sicura della terapia: le regole, i calcoli, gli errori che non si devono fare",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
