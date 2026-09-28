// Contenuto delle 50 scene della lezione 4.7 — Rischio biologico e gestione
// dei rifiuti. Il centro e' la sequenza dei primi minuti (gesti) e il caso
// d'esame a sei passi (percorso su due righe). Illustrazioni nuove: la
// puntura e il contenitore per taglienti.

const RISCHIO = [
 {n:"HBV", t:"30 %", d:"epatite B, se il paziente ha un'elevata replicazione virale", key:true},
 {n:"HCV", t:"1–2 %", d:"epatite C, ridimensionato dagli studi recenti"},
 {n:"HIV", t:"0,3 %", d:"circa: il più basso dei tre"},
];
const ORDINE = [
 {t:"HIV", d:"0,3 %"}, {t:"HCV", d:"1–2 %"}, {t:"HBV", d:"30 %: molto più trasmissibile", key:true},
];
const PRIMI = [
 {illu:"rubinetto", t:"Lavare", d:"subito, con acqua e sapone", key:true}, {illu:"goccia", t:"Far sanguinare", d:"liberamente"}, {illu:"occhio", t:"Mucose e occhi", d:"irrigare con acqua o fisiologica"},
];
const VACCINI = [
 {n:"1", t:"**Epatite B**, con verifica della risposta anticorpale", key:true}, {n:"2", t:"**Influenza** stagionale: protegge i pazienti fragili"},
 {n:"3", t:"**Morbillo, parotite, rosolia**"}, {n:"4", t:"**Varicella**, per chi non l'ha avuta"},
 {n:"5", t:"**Difterite, tetano, pertosse**: area pediatrica e ostetrica"}, {n:"6", t:"**COVID-19** secondo le indicazioni vigenti"},
];
const RIFIUTI = [
 {n:"1", t:"**Pericolosi a rischio infettivo**: sangue e liquidi biologici, taglienti, isolamento", key:true}, {n:"2", t:"**Assimilati agli urbani**: carta, imballaggi, residui puliti"},
 {n:"3", t:"**Pericolosi non a rischio infettivo**: chimici, farmaci citotossici"}, {n:"4", t:"**Particolari sistemi di gestione**: farmaci scaduti"},
];
const SPANDIMENTO = [
 {t:"DPI"}, {t:"Assorbire", d:"materiale monouso"}, {t:"Disinfettare", d:"a base di cloro", key:true}, {t:"Smaltire", d:"rifiuto a rischio infettivo"},
];
const CASO = [
 {t:"Paziente in sicurezza", d:"e ago smaltito"}, {t:"Lavare", d:"acqua e sapone, sanguinare senza spremere", key:true}, {t:"Segnalare", d:"coordinatore e servizio"},
 {t:"Paziente fonte", d:"test con consenso"}, {t:"Esami basali", d:"e profilassi entro poche ore", key:true}, {t:"Denuncia", d:"e follow-up"},
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 4 · Prevenzione e controllo delle infezioni correlate all'assistenza",
  titolo:"Rischio biologico<br>e gestione dei rifiuti", sottotitolo:"4.7 · Fin qui il paziente. Ora te.",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"sostituzione", tema:"chiaro", sopratitolo:"Micro-lezione 7 di 8 · il principale rischio professionale dell'infermiere",
  da:{h:"Fin qui", t:"abbiamo protetto il paziente"}, a:{h:"Ora", t:"proteggiamo te"},
  sotto:"Sangue, liquidi biologici, aghi."},
{id:"s03", tipo:"figura", tema:"chiaro", sopratitolo:"L'infortunio più tipico", illu:"puntura",
  titolo:"La **puntura accidentale**<br>con ago contaminato.",
  sotto:"Un gesto di un secondo, e poi settimane di esami e di attesa."},
{id:"s04", tipo:"frase", tema:"chiaro", sopratitolo:"Il momento centrale della lezione",
  testo:"**Che cosa fare nei primi minuti** dopo un'esposizione. Una domanda da concorso, e una sequenza che potresti dover applicare davvero."},

{id:"s05", tipo:"norma", tema:"chiaro", sopratitolo:"Il quadro normativo",
  etichetta:"Titolo X · esposizione ad agenti biologici", sigla:"D.Lgs. 81/2008",
  testo:"Gli agenti biologici classificati in **quattro gruppi** di pericolosità crescente."},
{id:"s06", tipo:"norma", tema:"chiaro", sopratitolo:"Recepisce una direttiva europea",
  etichetta:"Prevenzione delle ferite da taglio e da punta in sanità", sigla:"D.Lgs. 19/2014",
  testo:"Dispositivi di sicurezza, formazione, **divieti**, segnalazione."},

{id:"s07", tipo:"tre", tema:"chiaro", sopratitolo:"Il rischio di trasmissione · puntura con ago contaminato, paziente fonte positivo", attive:[0], cifre:true, box:RISCHIO},
{id:"s08", tipo:"tre", tema:"chiaro", sopratitolo:"La regola del 30, del 3, dello 0,3 · tre numeri, tre virus, un ordine", cifre:true, box:RISCHIO},
{id:"s09", tipo:"scala", tema:"chiaro", sopratitolo:"L'ordine resta quello", gradini:ORDINE},

{id:"s10", tipo:"icone", tema:"chiaro", sopratitolo:"La prevenzione · dispositivi con meccanismo di protezione", voci:[
  {icona:"siringa", t:"Aghi retrattili", key:true}, {icona:"scudo", t:"Cappucci di sicurezza"}, {icona:"circuito", t:"Sistemi senza ago", d:"per le linee infusionali"}]},
{id:"s11", tipo:"trappola", tema:"chiaro", sopratitolo:"Due divieti", righe:[
  {sb:"Reincappucciare l'ago", ok:"**Mai**: è il gesto che causa una quota rilevante delle punture"},
  {sb:"Il contenitore dall'altra parte della stanza", ok:"Smaltimento **immediato**, contenitore **al punto d'uso**"}]},
{id:"s12", tipo:"sostituzione", tema:"chiaro", sopratitolo:"E i taglienti non passano di mano",
  da:{h:"Non", t:"da una mano all'altra"}, a:{h:"Ma", t:"in una zona neutra"},
  sotto:"Un vassoio, un piano: l'altro lo prende da lì. Tre regole nate da infortuni veri."},

{id:"s13", tipo:"figura", tema:"chiaro", sopratitolo:"Il contenitore per taglienti", illu:"taglienti", lato:"dx",
  titolo:"Rigido, resistente alla perforazione,<br>a **chiusura definitiva**.",
  sotto:"Si riempie solo fino alla linea: tre quarti del volume, e non un ago di più."},
{id:"s14", tipo:"trappola", tema:"chiaro", sopratitolo:"È così che l'ago sporgente punge la mano che spinge", righe:[
  {sb:"Spingere dentro il materiale per farcelo stare", ok:"Riempire **fino alla linea**, chiudere **definitivamente**, non riaprire"}]},

{id:"s15", tipo:"gesti", tema:"chiaro", sopratitolo:"I primi minuti · la sequenza da sapere a memoria", attive:[0,1], voci:PRIMI},
{id:"s16", tipo:"titolo", tema:"profondo",
  titolo:"**Senza spremere.**<br>Niente caustici.",
  sotto:"La compressione traumatizza i tessuti; la candeggina non serve e fa danno."},
{id:"s17", tipo:"gesti", tema:"chiaro", sopratitolo:"Mucose e occhi: irrigare, via le lenti a contatto · cute lesa: lavare e disinfettare", voci:PRIMI},

{id:"s18", tipo:"catena", tema:"chiaro", sopratitolo:"Subito dopo · segnalare immediatamente", passi:[
  {t:"Coordinatore"}, {t:"Servizio previsto", d:"pronto soccorso, medico competente, medicina del lavoro", key:true}]},
{id:"s19", tipo:"catena", tema:"chiaro", sopratitolo:"Il motivo dell'urgenza è uno solo: la profilassi per l'HIV funziona meglio quanto prima inizia", passi:[
  {t:"Paziente fonte", d:"identificato"}, {t:"Denuncia di infortunio"}, {t:"Profilassi", d:"il prima possibile", key:true}]},

{id:"s20", tipo:"confronto", tema:"chiaro", sopratitolo:"Gli esami", col:[
  {h:"Operatore", t:"Esami **basali** per HBV, HCV e HIV: documentano lo stato al momento dell'esposizione", key:true},
  {h:"Paziente fonte", t:"Test **previo consenso**: è un suo diritto, la procedura dice come chiederlo"}]},
{id:"s21", tipo:"frase", tema:"tenue", sopratitolo:"E poi",
  testo:"**Follow-up sierologico** dell'operatore nei mesi successivi, secondo protocollo."},

{id:"s22", tipo:"cifre", tema:"chiaro", sopratitolo:"La profilassi post-esposizione · HIV: il prima possibile", voci:[
  {n:2, suf:" h", t:"idealmente", d:"entro una-due ore", key:true}, {n:72, suf:" h", t:"non oltre", d:"48–72 ore: poi l'efficacia è trascurabile"}, {n:28, suf:" giorni", t:"durata"}]},
{id:"s23", tipo:"frase", tema:"chiaro", sopratitolo:"La decisione spetta al medico",
  testo:"Sulla base del tipo di esposizione e dello stato del paziente fonte: **non tutte le esposizioni la richiedono, ma tutte vanno valutate in fretta**."},

{id:"s24", tipo:"confronto", tema:"chiaro", sopratitolo:"Epatite B · dipende dal vaccino", col:[
  {h:"Vaccinato con risposta", t:"Anti-HBs **≥ 10 mUI/ml**: nessun intervento", key:true},
  {h:"Non vaccinato o non responder", t:"**Immunoglobuline** specifiche e **vaccino**"}]},
{id:"s25", tipo:"numero", tema:"chiaro", sopratitolo:"Immunoglobuline e vaccino", cifra:"24 h",
  testo:"Preferibilmente entro un giorno: le immunoglobuline coprono subito, il vaccino copre dopo."},
{id:"s26", tipo:"trappola", tema:"chiaro", sopratitolo:"Epatite C", righe:[
  {sb:"«Faccio la profilassi»", ok:"**Non esiste**: follow-up per diagnosi e trattamento precoce, perché oggi l'epatite C è curabile"}]},

{id:"s27", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, attive:[0], sopratitolo:"Le vaccinazioni degli operatori · la prevenzione più efficace è a monte", celle:VACCINI},
{id:"s28", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, attive:[0,1,2,3], sopratitolo:"Le vaccinazioni degli operatori · raccomandate dal Piano nazionale", celle:VACCINI},
{id:"s29", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Vaccinarsi è anche una responsabilità deontologica verso chi assisti", celle:VACCINI},

{id:"s30", tipo:"norma", tema:"chiaro", sopratitolo:"I rifiuti · l'altra metà della lezione",
  etichetta:"Regolamento sulla gestione dei rifiuti sanitari", sigla:"DPR 254/2003",
  testo:"Classifica i rifiuti sanitari in categorie con **destini diversi**."},
{id:"s31", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, attive:[0,1], sopratitolo:"Le categorie", celle:RIFIUTI},
{id:"s32", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Le categorie", celle:RIFIUTI},

{id:"s33", tipo:"figura", tema:"chiaro", sopratitolo:"I rifiuti a rischio infettivo · la gestione", illu:"rifiuti",
  titolo:"Contenitori dedicati, rigidi,<br>con sacco interno e **chiusura definitiva**.",
  sotto:"Riconoscibili dal simbolo del rischio biologico."},
{id:"s34", tipo:"griglia", tema:"chiaro", colonne:1, spunta:true, sopratitolo:"Le regole", celle:[
  {t:"Riempire **fino al limite** indicato"}, {t:"Chiudere **nel punto di produzione**", key:true}, {t:"Deposito temporaneo con **limiti di tempo** fissati dalla norma"}]},
{id:"s35", tipo:"trappola", tema:"chiaro", sopratitolo:"Un altro modo classico di pungersi", righe:[
  {sb:"Comprimere i sacchi con le mani", ok:"**Mai**: dentro può esserci un ago buttato nel sacco sbagliato"}]},

{id:"s36", tipo:"sostituzione", tema:"chiaro", sopratitolo:"La raccolta differenziata in reparto · un aspetto spesso trascurato",
  da:{h:"Non", t:"imballaggi e carta nei rifiuti infettivi"}, a:{h:"Ma", t:"nella raccolta ordinaria"},
  sotto:"Ciò che non è contaminato non va nei rifiuti infettivi."},
{id:"s37", tipo:"confronto", tema:"chiaro", sopratitolo:"Separare al punto di produzione è parte della professionalità", col:[
  {h:"Costi", t:"Lo smaltimento dei rifiuti infettivi costa **molto di più**", key:true},
  {h:"Ambiente", t:"E ha un **impatto ambientale** maggiore"}]},

{id:"s38", tipo:"percorso", tema:"chiaro", sopratitolo:"Una situazione pratica · spandimento di sangue su una superficie", attive:[0,1], tappe:SPANDIMENTO},
{id:"s39", tipo:"percorso", tema:"chiaro", sopratitolo:"Spandimento · secondo procedura; in molti reparti esistono kit dedicati", tappe:SPANDIMENTO},

{id:"s40", tipo:"percorso", tema:"chiaro", sopratitolo:"Il caso d'esame · durante un prelievo ti pungi con l'ago usato: in ordine", attive:[0,1], tappe:CASO},
{id:"s41", tipo:"percorso", tema:"chiaro", sopratitolo:"Il caso d'esame · segnalare, identificare la fonte", attive:[0,1,2,3], tappe:CASO},
{id:"s42", tipo:"percorso", tema:"chiaro", sopratitolo:"Il caso d'esame · sei passi", tappe:CASO},
{id:"s43", tipo:"titolo", tema:"profondo",
  titolo:"«Disinfetto con alcol<br>e finisco il turno.»",
  sotto:"Sbaglia la domanda e rischia la salute."},

{id:"s44", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"In Veneto", celle:[
  {n:"1", t:"**Procedura aziendale** per l'esposizione accidentale, percorso rapido **24 ore su 24**", key:true},
  {n:"2", t:"Presa in carico del **medico competente**"},
  {n:"3", t:"**Dispositivi di sicurezza** (D.Lgs. 19/2014) e rifiuti con **formazione** del personale"}]},
{id:"s45", tipo:"frase", tema:"chiaro", sopratitolo:"All'orale",
  testo:"La parola chiave è **tempestività**."},

{id:"s46", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Ricapitoliamo", celle:[
  {n:"1", t:"Rischio: **HBV > HCV > HIV**", key:true}, {n:"2", t:"**Mai reincappucciare**"},
  {n:"3", t:"Contenitore **al punto d'uso**"}, {n:"4", t:"Riempito **fino alla linea**"}]},
{id:"s47", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Ricapitoliamo · dopo una puntura", celle:[
  {t:"**Lavare** con acqua e sapone"}, {t:"Sanguinare **senza spremere**", key:true}, {t:"**Niente caustici**"}, {t:"**Segnalare subito**"}]},
{id:"s48", tipo:"tre", tema:"chiaro", sopratitolo:"Ricapitoliamo · la profilassi", box:[
  {n:"HIV", t:"Entro 1–2 ore, max 48–72, per 28 giorni", key:true}, {n:"HBV", t:"Nulla se vaccinato con risposta"}, {n:"HCV", t:"Nessuna profilassi, solo follow-up"}]},
{id:"s49", tipo:"frase", tema:"chiaro", sopratitolo:"Prossima lezione · ricomponiamo il modulo 4",
  testo:"**Tempestività**: ogni passo di questa lezione vale di più quanto prima lo fai."},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione",
  titolo:"4.8 Riepilogo del Modulo 4<br>e autovalutazione", sottotitolo:"Le otto lezioni in una: che cosa portare all'esame",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
