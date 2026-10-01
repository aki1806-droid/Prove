// Contenuto delle 50 scene della lezione 6.8 — riepilogo del modulo 6 e
// autovalutazione. Nessun corpo nuovo: tornano i corpi del modulo (i
// calibri, gli accessi, l'ega, i gruppi, le provette) come rimandi, e il
// resto è griglia, percorso, cifre, trappola, pausa per le domande.

const P = (sopratitolo, testo, dati) => ({tipo:"pausa", tema:"chiaro", etichetta:"risposta secca", es:sopratitolo, testo: testo.replace(/\n/g, "<br>"), dati});
const LEZIONI = [
 {n:"6.1", t:"Periferici", illu:"catetere"},
 {n:"6.2", t:"Centrali", illu:"cvc"},
 {n:"6.3", t:"Fluidoterapia", illu:"gocciolatore"},
 {n:"6.4", t:"Emogasanalisi", illu:"ph"},
 {n:"6.5", t:"Parenterale", illu:"sacca"},
 {n:"6.6", t:"Trasfusione", illu:"goccia"},
 {n:"6.7", t:"Preanalitica", illu:"provetta"},
];
const STRAV = [{t:"Fermare", key:true}, {t:"Aspirare", d:"dalla cannula"}, {t:"Rimuovere"}, {t:"Sollevare", d:"l'arto"}, {t:"Avvisare"}, {t:"Delimitare", d:"e documentare"}];
const EMB = [{t:"Chiudere", d:"la via d'ingresso dell'aria", key:true}, {t:"Laterale sinistro", d:"in Trendelenburg"}, {t:"Ossigeno"}, {t:"Medico"}];
const REAZ = [{t:"Fermare", key:true}, {t:"Accesso", d:"fisiologica, deflussore nuovo"}, {t:"Parametri"}, {t:"Medico"}, {t:"Ricontrollare", d:"identità e sacca"}, {t:"Inviare", d:"sacca e campioni"}, {t:"Urine"}, {t:"Segnalare"}];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 6 · Accessi vascolari, terapia infusionale ed emocomponenti",
  titolo:"Riepilogo del modulo 6<br>e autovalutazione", sottotitolo:"6.8 · Procedure a confronto",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"frase", tema:"chiaro", sopratitolo:"Micro-lezione 8 di 8 · un modulo di procedure",
  testo:"Il modo migliore per ripassarle è metterle **a confronto**: che cosa hanno in comune, dove differiscono, dove si sbaglia."},
{id:"s03", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"In questa lezione", celle:[
  {n:"1", t:"Le **confusioni** che costano più punti"}, {n:"2", t:"I **casi** tipici"}, {n:"3", t:"**Otto domande** secche, di quelle che il quiz fa davvero", key:true}]},
{id:"s04", tipo:"frase", tema:"chiaro", sopratitolo:"Tieni a portata di mano il quaderno",
  testo:"I numeri di questo modulo si imparano **scrivendoli**, non ascoltandoli."},

{id:"s05", tipo:"anello", tema:"chiaro", sopratitolo:"La mappa · sette lezioni", centro:"Modulo 6", sotto:"sette lezioni", voci:LEZIONI},
{id:"s06", tipo:"frase", tema:"chiaro", sopratitolo:"Il filo comune · ogni lezione è una cosa che entra o che esce da una vena",
  testo:"Il **sistema vascolare** come porta d'accesso: per curare, e per sbagliare."},

{id:"s07", tipo:"griglia", tema:"chiaro", colonne:1, spunta:true, sopratitolo:"Ciò che hanno in comune · nome, cognome e data di nascita detti da lui, confrontati con il braccialetto", celle:[
  {t:"**Identificazione attiva**, sempre, prima di toccare qualsiasi cosa", key:true}]},
{id:"s08", tipo:"griglia", tema:"chiaro", colonne:1, spunta:true, sopratitolo:"Ciò che hanno in comune", celle:[
  {t:"**Asepsi**: clorexidina alcolica lasciata asciugare, niente ripalpazione", key:true}, {t:"**Scrub the hub**: disinfezione dei connettori"}, {t:"**Valutazione regolare** del dispositivo"}]},
{id:"s09", tipo:"griglia", tema:"chiaro", colonne:1, spunta:true, sopratitolo:"Ciò che hanno in comune", celle:[
  {t:"La domanda quotidiana: **serve ancora?** Un dispositivo che non serve si rimuove", key:true}, {t:"**Documentazione**: inserimento, valutazione, rimozione, con data e firma"}]},

{id:"s10", tipo:"colonne", tema:"chiaro", sopratitolo:"Periferico e centrale a confronto", colonne:[
  {h:"Periferico", key:true, voci:[{t:"Calibro **più piccolo** possibile", key:true}, {t:"Sostituzione **su indicazione clinica**"}, {t:"Scala **VIP**: da **2** si rimuove"}]},
  {h:"Centrale", voci:[{t:"**Conferma della punta** prima dell'uso"}, {t:"**Massime barriere sterili**"}, {t:"Medicazione trasparente ogni **7 giorni**"}, {t:"**Embolia gassosa**"}]}]},
{id:"s11", tipo:"accessi", tema:"chiaro", sopratitolo:"Centrale · conferma della punta, massime barriere sterili, medicazione trasparente ogni 7 giorni, attenzione all'embolia gassosa"},
{id:"s12", tipo:"trappola", tema:"chiaro", sopratitolo:"Il Midline · si inserisce come un PICC, ma è più corto: la punta resta nell'ascellare o nella basilica", righe:[
  {sb:"«Il Midline è un accesso centrale»", ok:"Il Midline è **periferico**: chi lo chiama centrale perde il punto"}]},

{id:"s13", tipo:"calibri", tema:"chiaro", sopratitolo:"I numeri del modulo · gauge: numero basso, calibro grande · sopra 900 mOsm/L via centrale · siringhe da almeno 10 ml per i lavaggi"},
{id:"s14", tipo:"ega", tema:"chiaro", sopratitolo:"I numeri del modulo · compressione dopo il prelievo arterioso: almeno 5 minuti", lettura:"pH **7,35–7,45** · CO₂ **35–45** · HCO₃⁻ **22–26**"},
{id:"s15", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"I numeri del modulo", celle:[
  {n:"2–6", t:"**°C** le emazie, trasfuse entro **4 ore**", key:true}, {n:"20–24", t:"**°C** le piastrine, in agitazione"}, {n:"< 1", t:"**minuto** di laccio"}, {n:"8–10", t:"**ml** per flacone di emocoltura"}]},
{id:"s16", tipo:"frase", tema:"chiaro", sopratitolo:"Sono dodici numeri, in tre slide · il quiz li chiede tutti e dodici",
  testo:"Fermati, **copiali nel quaderno**, e riparti. Un numero scritto una volta vale più di tre ascolti."},

{id:"s17", tipo:"percorso", tema:"chiaro", sopratitolo:"Le sequenze di emergenza · lo stravaso", tappe:STRAV},
{id:"s18", tipo:"percorso", tema:"chiaro", sopratitolo:"L'embolia gassosa · con il capo in basso, per intrappolare l'aria nel ventricolo destro", tappe:EMB},
{id:"s19", tipo:"percorso", tema:"chiaro", sopratitolo:"La reazione trasfusionale", tappe:REAZ},

{id:"s20", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Le confusioni che costano più punti", celle:[
  {n:"1", t:"Il Midline **non** è centrale", key:true}, {n:"2", t:"**Infiltrazione** se la soluzione non è vescicante, **stravaso** se lo è"}]},
{id:"s21", tipo:"trappola", tema:"chiaro", sopratitolo:"Tre · dopo il metabolismo del glucosio resta acqua libera, che si distribuisce in tutti i compartimenti", righe:[
  {sb:"«La glucosata al 5% espande il volume»", ok:"**Non** espande il volume circolante: solo una piccola parte resta nei vasi"}]},
{id:"s22", tipo:"gruppi", tema:"chiaro", sopratitolo:"Quattro · donatore universale di emazie 0 negativo, di plasma AB: l'inversione è la domanda classica, e la risposta istintiva è quella sbagliata"},

{id:"s23", tipo:"confronto", tema:"chiaro", sopratitolo:"Cinque · ROME", col:[
  {h:"Respiratorio", t:"pH e CO₂ in direzione **opposta**", key:true}, {h:"Metabolico", t:"pH e HCO₃⁻ nella **stessa** direzione"}]},
{id:"s24", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"Sei e sette", celle:[
  {n:"6", t:"Le piastrine **mai in frigorifero**"}, {n:"7", t:"Con il sangue **solo fisiologica**: la glucosata emolizza, il Ringer con il calcio favorisce la coagulazione, farmaci in linea mai", key:true}]},
{id:"s25", tipo:"confronto", tema:"chiaro", sopratitolo:"Otto · le emocolture: l'aria del tubicino deve finire nel flacone che la tollera", col:[
  {h:"Butterfly", t:"prima l'**aerobio**", key:true}, {h:"Siringa", t:"prima l'**anaerobio**"}]},

{id:"s26", tipo:"frase", tema:"chiaro", sopratitolo:"I casi · cannula con VIP 2 e nessuna terapia endovenosa in corso",
  testo:"Si **rimuove** e non si riposiziona: due motivi per toglierla, nessuno per tenerla."},
{id:"s27", tipo:"percorso", tema:"chiaro", sopratitolo:"Brivido al lavaggio del PICC · il confronto dei tempi di positivizzazione dice se la sorgente è il catetere", tappe:[
  {t:"Sospetto", d:"CLABSI"}, {t:"Emocolture appaiate", d:"catetere e vena periferica, nello stesso momento", key:true}, {t:"Medico"}]},
{id:"s28", tipo:"percorso", tema:"chiaro", sopratitolo:"Sacca di parenterale finita di notte · non si lascia la via vuota", tappe:[
  {t:"Glucosata", d:"secondo procedura: ipoglicemia da rimbalzo", key:true}, {t:"Glicemia"}, {t:"Medico"}]},

{id:"s29", tipo:"frase", tema:"chiaro", sopratitolo:"BPCO sonnolento in ossigeno ad alto flusso, con CO₂ alta",
  testo:"**Acidosi respiratoria**: medico, e rivalutazione dell'ossigeno con target **88–92**."},
{id:"s30", tipo:"frase", tema:"chiaro", sopratitolo:"Dolore lombare e ipotensione dopo dieci minuti di trasfusione",
  testo:"**Reazione emolitica**: la sequenza, tutta, a partire da **fermare**."},
{id:"s31", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Due casi ancora", celle:[
  {n:"K", t:"**Potassio alto** in un prelievo difficoltoso: possibile emolisi, medico e ripetizione", key:true}, {n:"!", t:"**Anziano cardiopatico** in mantenimento da giorni, dispnoico: sovraccarico, ridurre l'infusione, medico"}]},

{id:"s32", ...P("Domande 1 e 2", "**1** · Qual è la prima provetta dell'ordine di prelievo?\n**2** · Il Midline è un accesso centrale?", ["ordine di prelievo", "Midline"])},
{id:"s33", tipo:"provette", tema:"chiaro", sopratitolo:"Uno: le emocolture, per prime, per non contaminarle · due: no, il Midline è periferico, e non riceve ciò che richiede la via centrale", attive:[0], key:[0]},
{id:"s34", ...P("Domande 3 e 4", "**3** · Qual è il donatore universale di plasma?\n**4** · Le piastrine si conservano in frigorifero?", ["plasma", "piastrine"])},
{id:"s35", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Le risposte", celle:[
  {n:"3", t:"**AB**: il plasma AB non ha anticorpi anti-A né anti-B", key:true}, {n:"4", t:"**Mai**: a 20–24 °C, in agitazione continua"}]},
{id:"s36", ...P("Domande 5 e 6", "**5** · pH basso e CO₂ alta: disturbo respiratorio o metabolico?\n**6** · Con il sangue, quale soluzione va in linea?", ["pH ↓ CO₂ ↑", "trasfusione"])},
{id:"s37", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Le risposte", celle:[
  {n:"5", t:"**Respiratorio**: pH e CO₂ in direzione opposta, ROME", key:true}, {n:"6", t:"**Solo fisiologica**"}]},
{id:"s38", ...P("Domande 7 e 8", "**7** · Cannula con VIP 2: che cosa fai?\n**8** · Sopra 900 mOsm/L, quale via?", ["VIP 2", "> 900 mOsm/L"])},
{id:"s39", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Le risposte · otto su otto è il livello atteso: ogni errore ti dice quale lezione riguardare", celle:[
  {n:"7", t:"**Si rimuove**, e non si riposiziona se non serve"}, {n:"8", t:"**Via centrale**: solo un vaso di grosso calibro tollera quella osmolarità", key:true}]},

{id:"s40", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Il filo con gli altri moduli · all'orale, una visione d'insieme", celle:[
  {n:"4", t:"Il bundle **CLABSI** si collega al modulo 4", key:true}, {n:"5", t:"**Potassio**, **compatibilità** e **calcoli** al modulo 5"}]},
{id:"s41", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Il filo con gli altri moduli · un modulo che si tiene con gli altri vale di più di uno isolato", celle:[
  {n:"3.4", t:"La **sindrome da rialimentazione**"}, {n:"2", t:"**Identificazione** e **doppio controllo** al modulo 2", key:true}]},

{id:"s42", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"In Veneto", celle:[
  {n:"1", t:"**Team accessi vascolari**: PICC e Midline a gestione infermieristica", key:true}, {n:"2", t:"**Servizi trasfusionali** e coordinamento regionale"}]},
{id:"s43", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"In Veneto", celle:[
  {n:"3", t:"**Procedure** su sicurezza trasfusionale, preanalitica e valori critici; in alcune realtà l'identificazione elettronica al letto", key:true}, {n:"4", t:"**Nutrizione artificiale domiciliare** con presa in carico distrettuale"}]},

{id:"s44", tipo:"cifre", tema:"chiaro", sopratitolo:"Come proseguire · e gli esercizi di emogasanalisi della 6.4, finché la lettura non è automatica: pH, poi CO₂, poi bicarbonato", voci:[
  {n:"30", d:"domande del test del modulo", key:true}, {n:"21", d:"la soglia"}]},
{id:"s45", tipo:"griglia", tema:"chiaro", colonne:1, spunta:true, sopratitolo:"Nel quaderno", celle:[
  {t:"**Numeri**, **sequenze**, **ordine delle provette**"}, {t:"Il caso della **reazione trasfusionale**, scritto per intero con lo schema in cinque passi: una traccia molto probabile", key:true}]},
{id:"s46", tipo:"percorso", tema:"chiaro", sopratitolo:"Lo schema di tutti i casi", tappe:[
  {t:"Che cosa pensi"}, {t:"Che cosa fai subito", key:true}, {t:"Chi avvisi"}, {t:"Che cosa sorvegli"}, {t:"Che cosa documenti"}]},

{id:"s47", tipo:"titolo", tema:"profondo",
  titolo:"Ogni accesso vascolare è una **porta aperta**.",
  sotto:"Si apre con l'asepsi, si sorveglia ogni giorno, si chiude appena possibile."},

{id:"s48", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Nel prossimo modulo · dall'interno all'esterno del corpo", celle:[
  {n:"1", t:"**Lesioni** e medicazioni", key:true}, {n:"2", t:"**Stomie** e **drenaggi**"}]},
{id:"s49", tipo:"frase", tema:"chiaro", sopratitolo:"Modulo 7 · wound care, stomie e drenaggi",
  testo:"Un'area in cui l'infermiere ha un'**autonomia molto ampia**, e i concorsi lo sanno."},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossimo modulo",
  titolo:"Modulo 7<br>Wound care, stomie<br>e drenaggi", sottotitolo:"Lesioni, medicazioni, stomie e drenaggi",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
