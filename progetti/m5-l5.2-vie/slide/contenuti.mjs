// Contenuto delle 50 scene della lezione 5.2 — le vie di somministrazione.
// Tre corpi nuovi: l'iniezione (la sezione della cute con gli aghi che si
// disegnano all'angolo giusto: 10–15°, 45°, 90° sottocute, 90° muscolo), la
// tecnica a Z in tre quadri (la cute spostata, il deposito, il tramite che si
// spezza), le sedi (la sagoma di fronte e di spalle con le zone che si
// accendono). Illustrazioni nuove: cerotto, spray, collirio, supposta, osso.

const AGHI = [
 {angolo:15, strato:"id", t:"Intradermica", d:"10–15°, nel derma"},
 {angolo:45, strato:"sc", t:"Sottocutanea 45°", d:"se magro o ago lungo"},
 {angolo:90, strato:"sc", t:"Sottocutanea 90°", d:"4–8 mm", key:true},
 {angolo:90, strato:"im", t:"Intramuscolare 90°", d:"25–38 mm, nel muscolo"},
];
const SEDI_SC = [
 {t:"Addome", d:"a distanza dall'ombelico", x:100, y:215, rx:34, ry:30, key:true},
 {t:"Cosce", d:"faccia anteriore e laterale", x:82, y:330, rx:20, ry:50},
 {t:"Braccia", d:"faccia posteriore", x:52, y:190, rx:14, ry:34, lato:"retro", px:-40},
 {t:"Glutei", x:118, y:275, rx:22, ry:28, lato:"retro"},
];
const SEDI_IM = [
 {t:"Ventroglutea", d:"la preferita nell'adulto: lontana dal nervo sciatico e dai grandi vasi", x:146, y:248, rx:18, ry:26, key:true},
 {t:"Deltoide", d:"vaccini e piccoli volumi", x:60, y:142, rx:16, ry:24},
 {t:"Vasto laterale", d:"la sede di scelta nel lattante", x:80, y:330, rx:18, ry:50},
 {t:"Dorsoglutea", d:"quadrante supero-esterno: rischio per il nervo sciatico", x:130, y:262, rx:22, ry:26, lato:"retro"},
];
const EPARINA = [
 {t:"Nell'**addome**"}, {t:"**Pizzico cutaneo** per tutta l'iniezione", key:true},
 {t:"**Non** aspirare, **non** massaggiare: ematoma"}, {t:"**Non** espellere la bolla d'aria; iniezione lenta"},
];
const COMPLICANZE = [
 {n:"1", t:"**Lesione del nervo sciatico**: dolore irradiato, deficit motorio; la più contestata", key:true},
 {n:"2", t:"**Ascesso** da contaminazione"},
 {n:"3", t:"**Ematoma**, soprattutto negli anticoagulati: IM da evitare se possibile"},
 {n:"4", t:"Dolore"}, {n:"5", t:"Rottura dell'ago"}, {n:"6", t:"Iniezione accidentale in un vaso"},
];
const CEROTTO = [
 {t:"**Rimuovere il precedente**: dimenticarlo raddoppia la dose", key:true}, {t:"**Ruotare la sede**, su cute integra e senza peli"},
 {t:"**Annotare data e ora** sul cerotto"}, {t:"**Non tagliare**, se non previsto"},
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 5 · Farmacologia e gestione sicura della terapia",
  titolo:"Vie di somministrazione<br>e tecniche", sottotitolo:"5.2 · Angoli, aghi, sedi, volumi — e la tecnica a Z",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"tre", tema:"chiaro", cifre:true, sopratitolo:"Micro-lezione 2 di 8 · dettagli che i quiz chiedono in modo preciso", box:[
  {n:"90°", t:"angoli"}, {n:"G", t:"aghi", d:"calibro e lunghezza"}, {n:"4", t:"sedi", d:"intramuscolari", key:true}, {n:"ml", t:"volumi"}]},
{id:"s03", tipo:"frase", tema:"chiaro", sopratitolo:"Ma prima dei dettagli, un principio",
  testo:"La via di somministrazione **non è intercambiabile**.",
  sotto:"Cambia la rapidità d'azione, la biodisponibilità, il rischio: la stessa dose per bocca o in vena sono due cose diverse."},
{id:"s04", tipo:"titolo", tema:"profondo",
  titolo:"Una via diversa da quella prescritta<br>è **un errore in terapia**.",
  sotto:"Anche se il farmaco e la dose sono giusti."},

{id:"s05", tipo:"figura", tema:"chiaro", sopratitolo:"La via orale · la più usata, la più sicura, la più economica", illu:"bicchiere",
  titolo:"Seduta o semiseduta,<br>con un **bicchiere d'acqua**.",
  sotto:"Mai sdraiati."},
{id:"s06", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"La via orale · due regole", celle:[
  {n:"1", t:"Dubbio sulla **deglutizione** → la regola della lezione 3.3"},
  {n:"2", t:"**Rilascio modificato** e **gastroresistenti**: non si frantumano né si aprono — Raccomandazione 19", key:true}]},
{id:"s07", tipo:"frase", tema:"chiaro", sopratitolo:"Un dettaglio di responsabilità · l'infermiere verifica che il farmaco sia stato assunto",
  testo:"Una compressa lasciata sul comodino **non è una terapia somministrata**.",
  sotto:"E in cartella non si può firmare."},

{id:"s08", tipo:"figura", tema:"chiaro", sopratitolo:"La via sublinguale, e la buccale", illu:"bocca",
  titolo:"Sotto la lingua, dritto nel sangue: **evita il fegato**.",
  sotto:"Effetto rapido, in pochi minuti. L'esempio classico: la nitroglicerina nel dolore anginoso."},
{id:"s09", tipo:"elenco", tema:"chiaro", vietato:true, sopratitolo:"Finché il farmaco non si è sciolto", voci:[
  {t:"Deglutire"}, {t:"Masticare"}, {t:"Bere"}]},

{id:"s10", tipo:"iniezione", tema:"chiaro", sopratitolo:"La via sottocutanea · assorbimento lento e continuo, volumi fino a 1–2 ml", attive:[2], aghi:AGHI},
{id:"s11", tipo:"cifre", tema:"chiaro", sopratitolo:"La via sottocutanea · gli aghi", voci:[
  {n:"25–27", suf:" G", t:"sottili"}, {n:"4–8", suf:" mm", t:"corti", key:true}, {n:"4–6", suf:" mm", t:"penne da insulina"}]},
{id:"s12", tipo:"iniezione", tema:"chiaro", sopratitolo:"L'angolo · 90°; 45° nella persona molto magra o con un ago più lungo, per non arrivare nel muscolo", attive:[1,2], aghi:AGHI},

{id:"s13", tipo:"sedi", tema:"chiaro", sopratitolo:"Le sedi sottocutanee · e la rotazione, soprattutto per l'insulina", voci:SEDI_SC},
{id:"s14", tipo:"sostituzione", tema:"chiaro", sopratitolo:"Iniettare sempre nello stesso punto",
  da:{h:"Stesso punto", t:"lipodistrofia: assorbimento irregolare, glicemie instabili"}, a:{h:"Rotazione", t:"delle sedi, a ogni iniezione"},
  sotto:"Una causa frequente e sottovalutata di glicemie instabili."},
{id:"s15", tipo:"figura", tema:"chiaro", sopratitolo:"L'ispezione delle sedi fa parte dell'assistenza al diabetico", illu:"mani", lato:"dx",
  titolo:"Si guarda e **si palpa** l'addome.",
  sotto:"Una lipodistrofia si sente sotto le dita prima che si veda."},

{id:"s16", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, attive:[0,1], sopratitolo:"L'eparina a basso peso molecolare · regole sue, chieste spessissimo", celle:EPARINA},
{id:"s17", tipo:"elenco", tema:"chiaro", vietato:true, sopratitolo:"L'eparina · perché favoriscono l'ematoma, o sprecano il farmaco", voci:[
  {t:"Aspirare"}, {t:"Massaggiare la sede"}, {t:"Espellere la bolla d'aria", d:"nelle siringhe preriempite"}]},
{id:"s18", tipo:"figura", tema:"chiaro", sopratitolo:"La bolla", illu:"siringa",
  titolo:"Spinge fuori **tutto il farmaco** e chiude il tramite.",
  sotto:"Iniezione lenta. Quattro regole: nei quiz la domanda è quasi sempre su una delle quattro."},

{id:"s19", tipo:"iniezione", tema:"chiaro", sopratitolo:"La via intradermica · nel derma, 10–15°, bisello verso l'alto", attive:[0], aghi:AGHI},
{id:"s20", tipo:"tre", tema:"chiaro", sopratitolo:"Se è corretta si forma un piccolo pomfo · non si massaggia", box:[
  {n:"Mantoux", t:"intradermoreazione per la **tubercolosi**", key:true}, {n:"Test", t:"**allergici**"}]},

{id:"s21", tipo:"iniezione", tema:"chiaro", sopratitolo:"La via intramuscolare · muscolo vascolarizzato: assorbimento più rapido del sottocute", attive:[3], aghi:AGHI},
{id:"s22", tipo:"cifre", tema:"chiaro", sopratitolo:"La via intramuscolare · aghi, angolo, volumi", voci:[
  {n:"21–23", suf:" G", t:"calibro"}, {n:"25–38", suf:" mm", t:"lunghezza", d:"secondo sede e corporatura"}, {n:90, suf:"°", t:"angolo", d:"deltoide ≈ 1 ml; glutee e vasto laterale di più", key:true}]},

{id:"s23", tipo:"sedi", tema:"chiaro", sopratitolo:"Le sedi intramuscolari · la ventroglutea è oggi la preferita nell'adulto", attive:[0], voci:SEDI_IM},
{id:"s24", tipo:"figura", tema:"chiaro", sopratitolo:"Come si individua la ventroglutea · un repere a mano, che vale anche come risposta all'orale", illu:"mani",
  titolo:"Palmo sul **grande trocantere**, indice e medio verso la **cresta iliaca**.",
  sotto:"Si inietta nel triangolo fra le dita."},
{id:"s25", tipo:"sedi", tema:"chiaro", sopratitolo:"Le sedi intramuscolari · deltoide, vasto laterale, dorsoglutea", voci:SEDI_IM},

{id:"s26", tipo:"zeta", tema:"chiaro", sopratitolo:"La tecnica a Z · il programma d'esame la cita espressamente", attive:[0,1]},
{id:"s27", tipo:"zeta", tema:"chiaro", sopratitolo:"La tecnica a Z · il tramite si spezza a zeta: il farmaco resta nel muscolo e non refluisce"},
{id:"s28", tipo:"frase", tema:"chiaro", sopratitolo:"Quando",
  testo:"Per farmaci **irritanti** o che **macchiano** la cute, come il **ferro**.",
  sotto:"Ma molte procedure la raccomandano per tutte le intramuscolari."},

{id:"s29", tipo:"confronto", tema:"chiaro", sopratitolo:"Aspirare o no? · i manuali vecchi e quelli recenti divergono", col:[
  {h:"Oggi: no", t:"Vaccinazioni; ventroglutea, deltoide, vasto laterale: **allunga e fa male** senza beneficio", key:true},
  {h:"Tradizione", t:"Nella **dorsoglutea** era prevista, per la vicinanza dell'arteria glutea"}]},
{id:"s30", tipo:"frase", tema:"chiaro", sopratitolo:"In sede d'esame",
  testo:"La risposta prudente: **si segue la procedura aziendale**.",
  sotto:"Sapendo che la tendenza è a non aspirare."},

{id:"s31", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, attive:[0,1], sopratitolo:"Le complicanze dell'intramuscolare", celle:COMPLICANZE},
{id:"s32", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Le complicanze · la scelta corretta della sede è la prima prevenzione", celle:COMPLICANZE},

{id:"s33", tipo:"cifre", tema:"chiaro", sopratitolo:"La via endovenosa", voci:[
  {n:"subito", t:"effetto immediato"}, {n:100, suf:" %", t:"biodisponibilità"}, {n:"max", t:"il rischio", d:"un errore endovenoso non si richiama: si previene solo prima", key:true}]},
{id:"s34", tipo:"titolo", tema:"profondo",
  titolo:"**Bolo** non significa **spinto**.",
  sotto:"Si somministra lentamente, nei minuti indicati dalla scheda tecnica."},
{id:"s35", tipo:"confronto", tema:"chiaro", sopratitolo:"L'infusione · le complicanze (flebite, stravaso, reazioni, embolia gassosa) nel modulo 6", col:[
  {h:"Intermittente o continua", t:"Per i farmaci ad alto rischio, **con la pompa**", key:true},
  {h:"Il bolo", t:"Lento, in minuti, secondo scheda tecnica"}]},

{id:"s36", tipo:"figura", tema:"chiaro", sopratitolo:"La via transdermica · fentanil, nitroglicerina, buprenorfina", illu:"cerotto",
  titolo:"Rilascio controllato **per ore o giorni**.",
  sotto:"Comodi, ma con una farmacocinetica lunga: non si interrompe togliendo il cerotto."},
{id:"s37", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Il cerotto · le regole", celle:CEROTTO},
{id:"s38", tipo:"trappola", tema:"chiaro", sopratitolo:"Una trappola seria", righe:[
  {sb:"Febbre, borsa dell'acqua calda, coperta termica", ok:"Il **calore aumenta l'assorbimento**: con il fentanil, sovradosaggio"}]},

{id:"s39", tipo:"icone", tema:"chiaro", sopratitolo:"La via inalatoria · il farmaco arriva direttamente ai bronchi", voci:[
  {icona:"spray", t:"Spray predosati", d:"con il distanziatore: niente coordinazione", key:true}, {icona:"polmoni", t:"Inalatori di polvere"}, {icona:"aerosol", t:"Aerosol"}]},
{id:"s40", tipo:"griglia", tema:"chiaro", colonne:1, spunta:true, sopratitolo:"La via inalatoria · l'efficacia dipende dalla tecnica", celle:[
  {t:"Tecnica **verificata**: il teach-back della lezione 2.7"},
  {t:"Dopo i **corticosteroidi inalatori**, risciacquare la bocca: previene la **candidosi**", key:true}]},

{id:"s41", tipo:"figura", tema:"chiaro", sopratitolo:"La via oculare", illu:"collirio",
  titolo:"Nel **sacco congiuntivale inferiore**, senza toccare l'occhio.",
  sotto:"Poi 1–2 minuti di pressione sull'angolo interno."},
{id:"s42", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"La via oculare · tre regole", celle:[
  {n:"1", t:"La pressione sull'angolo interno chiude il dotto lacrimale: **meno assorbimento sistemico** (beta-bloccanti: bradicardia)", key:true},
  {n:"2", t:"Fra colliri diversi **almeno 5 minuti**"}, {n:"3", t:"**Prima il collirio, poi la pomata**"}]},

{id:"s43", tipo:"figura", tema:"chiaro", sopratitolo:"La via rettale", illu:"supposta", lato:"dx",
  titolo:"Decubito laterale **sinistro**, oltre lo sfintere anale interno.",
  sotto:"Altrimenti viene espulsa."},
{id:"s44", tipo:"frase", tema:"chiaro", sopratitolo:"Quando la via orale non è praticabile · vomito, incoscienza",
  testo:"L'assorbimento è **variabile**: la dose che arriva non è prevedibile come per bocca."},

{id:"s45", tipo:"figura", tema:"chiaro", sopratitolo:"La via intraossea · in emergenza, quando un accesso venoso non si ottiene", illu:"osso",
  titolo:"Nel midollo osseo: **tibia** o **omero prossimale**.",
  sotto:"Da lì passano tutti i farmaci e i liquidi della rianimazione."},

{id:"s46", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"In Veneto", celle:[
  {n:"1", t:"**Procedure aziendali** sulle tecniche iniettive, aggiornate alle evidenze"},
  {n:"2", t:"**Dispositivi di sicurezza** per la prevenzione delle punture — lezione 4.7"},
  {n:"3", t:"**Formazione sulla ventroglutea**, in molte realtà", key:true}]},
{id:"s47", tipo:"frase", tema:"chiaro", sopratitolo:"All'orale",
  testo:"Citare la **ventroglutea** come sede preferita, **con la ragione anatomica**, fa subito la differenza."},

{id:"s48", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Ricapitoliamo", celle:[
  {t:"**Sottocutanea** 90°, 45° nel magro"}, {t:"**Eparina**: non aspirare, non massaggiare, non espellere la bolla", key:true},
  {t:"**Intradermica** 10–15°"}, {t:"**Intramuscolare** 90°, ventroglutea, tecnica a Z"}]},
{id:"s49", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Ricapitoliamo · prossima lezione, il calcolo delle dosi: più semplice di quanto sembri", celle:[
  {t:"**Transdermica**: togliere il cerotto vecchio, niente calore", key:true}, {t:"**Oculare**: pressione sull'angolo interno"}]},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione",
  titolo:"5.3<br>Il calcolo delle dosi", sottotitolo:"e delle velocità di infusione: quattro strumenti, esercizi svolti, con il tasto pausa",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
