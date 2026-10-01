// Contenuto delle 50 scene della lezione 5.7 — preparazione, stabilità e
// gestione dei farmaci in reparto. Nessun corpo nuovo: la lezione è fatta di
// regole, e le regole stanno nei corpi delle regole (percorso per lo
// stravaso in sette tappe e per il caso del frigorifero, confronto per
// ricostituzione e diluizione e per i solventi, icone per le vie di
// esposizione e i DPI, titolo sul verde per le tre frasi da ricordare).
// Illustrazioni riusate: frigorifero, armadio, lampada, libro, orologio,
// guanto, camice, occhiali, siringa.

const STRAVASO = [
 {t:"Fermare", d:"subito l'infusione", key:true}, {t:"Lasciare in sede", d:"e aspirare il possibile"}, {t:"Rimuovere"}, {t:"Avvisare", d:"il medico"},
 {t:"Misure specifiche", d:"freddo o caldo, antidoto"}, {t:"Sollevare", d:"l'arto"}, {t:"Delimitare", d:"documentare, sorvegliare"},
];
const CARRELLO = [
 {t:"Contenuto **standardizzato**, uguale in tutta l'azienda"}, {t:"**Noto** a tutto il personale"},
 {t:"Posizione nota, carrello **accessibile**"}, {t:"**Mai ingombrato** da altro materiale", key:true},
];
const CONTROLLO = [
 {t:"Controllo **programmato** e **dopo ogni utilizzo**", key:true}, {t:"**Check-list firmata**"},
 {t:"**Sigillo** che attesta l'integrità"}, {t:"Scadenze, **defibrillatore**, **aspiratore**, **ossigeno**"},
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 5 · Farmacologia e gestione sicura della terapia",
  titolo:"Preparazione, stabilità<br>e gestione in reparto", sottotitolo:"5.7 · Dalla scheda tecnica al carrello delle emergenze",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"percorso", tema:"chiaro", sopratitolo:"Micro-lezione 7 di 8 · fra la farmacia e il paziente c'è un tratto di strada che attraversa il reparto", tappe:[
  {t:"L'armadio"}, {t:"Il frigorifero"}, {t:"Il piano di preparazione", key:true}, {t:"La linea infusionale"}]},
{id:"s03", tipo:"frase", tema:"chiaro", sopratitolo:"In ciascuno di questi punti",
  testo:"Un farmaco corretto può diventare **inefficace o pericoloso**.",
  sotto:"La qualità del farmaco; e in chiusura due temi ad alto rischio: gli antiblastici e il carrello delle emergenze."},

{id:"s04", tipo:"confronto", tema:"chiaro", sopratitolo:"Due operazioni diverse", col:[
  {h:"Ricostituzione", t:"Scioglie una **polvere**", key:true},
  {h:"Diluizione", t:"Porta una soluzione a una **concentrazione minore**"}]},
{id:"s05", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"In entrambi i casi", celle:[
  {n:"1", t:"**Solvente** e **volume**: quelli della **scheda tecnica** (il riassunto delle caratteristiche del prodotto)", key:true},
  {n:"2", t:"Non è indifferente: alcuni farmaci **precipitano** in fisiologica, altri in glucosata"}]},

{id:"s06", tipo:"confronto", tema:"chiaro", sopratitolo:"Tre esempi che ricorrono", col:[
  {h:"Amfotericina B", t:"**Solo glucosata 5%**: in fisiologica precipita", key:true},
  {h:"Fenitoina", t:"**Solo fisiologica**: in glucosata precipita"}]},
{id:"s07", tipo:"frase", tema:"chiaro", sopratitolo:"Il terzo esempio",
  testo:"Il **ceftriaxone** mai con soluzioni contenenti **calcio**, come il Ringer lattato.",
  sotto:"Rischio di precipitati, gravissimo nei neonati."},
{id:"s08", tipo:"figura", tema:"chiaro", sopratitolo:"Non si imparano tutti a memoria", illu:"libro",
  titolo:"Si impara a **consultare la scheda tecnica**, o la farmacia.",
  sotto:"Prima di diluire."},

{id:"s09", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"Le regole della preparazione", celle:[
  {n:"1", t:"**Tecnica asettica**: igiene delle mani, disinfezione dei tappi"},
  {n:"2", t:"**Immediatamente prima** dell'uso, non all'inizio del turno", key:true}]},
{id:"s10", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Etichettare ogni preparazione · i flaconi monodose si usano una sola volta", celle:[
  {n:"1", t:"**Paziente**"}, {n:"2", t:"**Farmaco**"}, {n:"3", t:"**Dose**"}, {n:"4", t:"**Concentrazione**", key:true}, {n:"5", t:"**Data e ora**"}, {n:"6", t:"**Operatore**"}]},
{id:"s11", tipo:"confronto", tema:"chiaro", sopratitolo:"Monodose e multidose", col:[
  {h:"Monodose", t:"**Una sola volta**, anche se avanza farmaco", key:true},
  {h:"Multidose", t:"**Data e ora di apertura**; conservazione ed eliminazione da scheda tecnica e procedura, non oltre il termine"}]},

{id:"s12", tipo:"figura", tema:"chiaro", sopratitolo:"La stabilità", illu:"orologio",
  titolo:"Ricostituito o diluito, un farmaco dura **un tempo limitato**.",
  sotto:"Indicato nella scheda tecnica; dipende da temperatura, luce e contenitore."},
{id:"s13", tipo:"frase", tema:"chiaro", sopratitolo:"Un'altra ragione per preparare subito prima",
  testo:"Un'infusione lasciata per ore su un carrello può **non essere più ciò che era stato prescritto**."},

{id:"s14", tipo:"figura", tema:"chiaro", sopratitolo:"I farmaci fotosensibili", illu:"lampada", lato:"dx",
  titolo:"La luce li **degrada**.",
  sotto:"Sacche coprenti e deflussori oscurati, dalla preparazione alla fine dell'infusione."},
{id:"s15", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Gli esempi", celle:[
  {n:"1", t:"**Nitroprussiato**"}, {n:"2", t:"**Amfotericina B**"}, {n:"3", t:"Alcuni **chemioterapici**"}, {n:"4", t:"Le **vitamine** nelle nutrizioni parenterali"},
  {n:"!", t:"Arriva in un contenitore scuro: **non si travasa** in uno trasparente", key:true}]},

{id:"s16", tipo:"confronto", tema:"chiaro", sopratitolo:"La compatibilità in linea · più farmaci nella stessa via", col:[
  {h:"Fisiche", t:"Precipitati, torbidità, cambi di colore"},
  {h:"Chimiche", t:"Il farmaco viene **inattivato senza segni**", key:true}]},
{id:"s17", tipo:"titolo", tema:"profondo",
  titolo:"Le incompatibilità chimiche **non si vedono**.",
  sotto:"Nel dubbio: lume dedicato o lavaggio della linea; tabelle di compatibilità e farmacia."},
{id:"s18", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"Due regole da quiz", celle:[
  {n:"1", t:"**Mai** aggiungere farmaci a **sangue ed emocomponenti**", key:true},
  {n:"2", t:"Il **bicarbonato** precipita con il **calcio** e inattiva le **catecolamine**, come l'adrenalina"}]},

{id:"s19", tipo:"figura", tema:"chiaro", sopratitolo:"La catena del freddo · insuline non aperte, vaccini, molti farmaci biologici", illu:"frigo",
  titolo:"Fra **2 e 8 gradi**, in un frigorifero **dedicato**.",
  sotto:"Niente alimenti."},
{id:"s20", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Il frigorifero dei farmaci", celle:[
  {t:"Termometro di **minima e massima**"}, {t:"**Registrazione periodica** della temperatura, secondo procedura"},
  {t:"**Mai congelare**", key:true}, {t:"Lontano dalla **parete fredda**"}]},
{id:"s21", tipo:"percorso", tema:"chiaro", sopratitolo:"Un'escursione fuori range", tappe:[
  {t:"Isolare", d:"i farmaci", key:true}, {t:"Non usare", d:"e non buttare"}, {t:"Farmacia", d:"valuta se sono ancora utilizzabili"}]},

{id:"s22", tipo:"figura", tema:"chiaro", sopratitolo:"L'armadio farmaceutico di reparto", illu:"armadio",
  titolo:"**Ordine** e **separazione**.",
  sotto:"Alto rischio e LASA in posizioni distinte e segnalate; il potassio concentrato secondo la procedura della Raccomandazione 1."},
{id:"s23", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Scadenze e farmaci da casa", celle:[
  {n:"1", t:"**Controllo periodico** delle scadenze"}, {n:"2", t:"**FIFO**: prima si usa ciò che scade prima", key:true},
  {n:"3", t:"Farmaci portati da casa: **identificati, custoditi**"}, {n:"4", t:"**Mai usati senza prescrizione**"}]},

{id:"s24", tipo:"tre", tema:"chiaro", sopratitolo:"Gli antiblastici · citotossici: agiscono sulle cellule in divisione, anche di chi li manipola", box:[
  {n:"1", t:"Mutageni"}, {n:"2", t:"Cancerogeni", key:true}, {n:"3", t:"Teratogeni"}]},
{id:"s25", tipo:"icone", tema:"chiaro", sopratitolo:"L'esposizione dell'operatore", voci:[
  {icona:"aerosol", t:"Inalazione", d:"di aerosol", key:true}, {icona:"mani", t:"Contatto cutaneo"}, {icona:"bocca", t:"Ingestione", d:"accidentale"}, {icona:"puntura", t:"Puntura", d:"con ago contaminato"}]},
{id:"s26", tipo:"figura", tema:"chiaro", sopratitolo:"Il quadro normativo", illu:"libro", lato:"dx",
  titolo:"**D.Lgs. 81/2008** e le linee guida nazionali.",
  sotto:"Sulla sicurezza degli operatori esposti a chemioterapici antiblastici."},

{id:"s27", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"La regola fondamentale", celle:[
  {n:"1", t:"Preparazione **centralizzata** in un'unità dedicata: l'**UFA**, Unità Farmaci Antiblastici", key:true},
  {n:"2", t:"Sotto la responsabilità del **farmacista** ospedaliero"}]},
{id:"s28", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Come si prepara", celle:[
  {t:"**Cappa di sicurezza biologica** a flusso laminare verticale", key:true}, {t:"**Sistemi chiusi** di trasferimento"},
  {t:"Personale **formato**"}, {t:"**Gravidanza e allattamento**: escluse dall'esposizione"}]},
{id:"s29", tipo:"titolo", tema:"profondo",
  titolo:"Il reparto **non prepara**.",
  sotto:"Riceve e somministra."},

{id:"s30", tipo:"icone", tema:"chiaro", sopratitolo:"La somministrazione · i DPI", voci:[
  {icona:"guanto", t:"Guanti", d:"adatti, spesso doppi", key:true}, {icona:"camice", t:"Camice monouso", d:"maniche lunghe, chiuso davanti"}, {icona:"occhiali", t:"Protezione oculare", d:"se rischio di schizzi"}, {icona:"siringa", t:"Luer-lock", d:"raccordi che non si staccano"}]},
{id:"s31", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"Prima di iniziare", celle:[
  {n:"1", t:"Deflussore riempito con **soluzione priva di farmaco**: l'aria espulsa non contiene chemioterapico", key:true},
  {n:"2", t:"Verifica della **pervietà** dell'accesso"},
  {n:"3", t:"**Kit per gli spandimenti** a portata di mano"}]},

{id:"s32", tipo:"percorso", tema:"chiaro", sopratitolo:"Lo stravaso di un antiblastico vescicante · può causare necrosi dei tessuti", attive:[0,1,2,3], tappe:STRAVASO},
{id:"s33", tipo:"percorso", tema:"chiaro", sopratitolo:"Lo stravaso · per molti il freddo, per gli alcaloidi della vinca il caldo; antidoto dove previsto", tappe:STRAVASO},
{id:"s34", tipo:"frase", tema:"chiaro", sopratitolo:"Ogni reparto oncologico ha la sua procedura",
  testo:"All'esame si cita la **sequenza**, dal fermare l'infusione al documentare, e si rinvia alla **procedura** per il dettaglio."},

{id:"s35", tipo:"cifre", tema:"chiaro", sopratitolo:"Tre ultime regole · gli escreti del paziente (urine, feci, vomito)", voci:[
  {n:"48", suf:"h", d:"almeno: contengono farmaco, per alcuni di più", key:true}, {n:"guanti", d:"e camice, come per il farmaco stesso"}]},
{id:"s36", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Spandimenti e rifiuti", celle:[
  {n:"1", t:"Spandimento: **kit dedicato**, DPI"}, {n:"2", t:"Contenimento **dall'esterno verso il centro**", key:true},
  {n:"3", t:"Rifiuti: contenitori specifici per **citotossici**"}, {n:"4", t:"La classificazione della lezione 4.7"}]},
{id:"s37", tipo:"frase", tema:"chiaro", sopratitolo:"E una Raccomandazione",
  testo:"La **Raccomandazione 14** del Ministero: la prevenzione degli errori con gli antineoplastici."},

{id:"s38", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Il carrello delle emergenze", celle:CARRELLO},
{id:"s39", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Il controllo del carrello", celle:CONTROLLO},
{id:"s40", tipo:"titolo", tema:"profondo",
  titolo:"Un carrello incompleto si scopre **durante un arresto**.",
  sotto:"Il momento peggiore."},

{id:"s41", tipo:"icone", tema:"chiaro", sopratitolo:"I farmaci che trovi in ogni carrello · e gli altri previsti dalla procedura", voci:[
  {icona:"cuore2", t:"Adrenalina", key:true}, {icona:"cuore", t:"Amiodarone"}, {icona:"occhio", t:"Atropina"}, {icona:"siringa", t:"Naloxone"}, {icona:"zucchero", t:"Glucosio"}]},
{id:"s42", tipo:"frase", tema:"chiaro", sopratitolo:"Formulazioni e concentrazioni standardizzate, uguali in tutta l'azienda",
  testo:"In emergenza nessuno calcola con una **concentrazione diversa dal solito**.",
  sotto:"Li useremo nel modulo 10, quello delle emergenze."},

{id:"s43", tipo:"figura", tema:"chiaro", sopratitolo:"Un caso breve", illu:"frigo", lato:"dx",
  titolo:"Massima di **14 °C** nella notte. Che cosa fai?",
  sotto:"Non usi i farmaci e non li butti: li isoli, in attesa di valutazione."},
{id:"s44", tipo:"percorso", tema:"chiaro", sopratitolo:"Che cosa fai", tappe:[
  {t:"Farmacia", d:"valuta farmaco per farmaco", key:true}, {t:"Frigorifero", d:"verifica e segnalazione del guasto"}, {t:"Documentare"}, {t:"Se serve un farmaco", d:"lo chiedi alla farmacia"}]},

{id:"s45", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"In Veneto", celle:[
  {n:"1", t:"Antiblastici allestiti nelle **UFA aziendali**, con tracciabilità della preparazione", key:true},
  {n:"2", t:"Personale esposto in **sorveglianza sanitaria** dal medico competente"}]},
{id:"s46", tipo:"frase", tema:"chiaro", sopratitolo:"Procedure aziendali su conservazione, catena del freddo e carrello, con controlli verificabili e firmati",
  testo:"All'orale, per gli antiblastici, la parola chiave è **centralizzazione**."},

{id:"s47", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Ricapitoliamo", celle:[
  {t:"Solvente e volume **dalla scheda tecnica**", key:true}, {t:"Preparare **subito prima** ed **etichettare**"},
  {t:"Monodose **una volta sola**"}, {t:"Fotosensibili **al buio**"}, {t:"Nel dubbio sulla compatibilità, **lume dedicato**"}]},
{id:"s48", tipo:"griglia", tema:"chiaro", colonne:1, spunta:true, sopratitolo:"Ricapitoliamo", celle:[
  {t:"Catena del freddo: **2–8 °C**, frigorifero dedicato, mai congelare"},
  {t:"Antiblastici: **centralizzati**, DPI, sequenza dello **stravaso**", key:true},
  {t:"Carrello: **controllato, sigillato**, ricontrollato **dopo ogni uso**"}]},
{id:"s49", tipo:"frase", tema:"chiaro", sopratitolo:"Nella prossima lezione",
  testo:"Ricomponiamo il modulo: il **riepilogo** del modulo 5 e i **venti calcoli cronometrati**."},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione",
  titolo:"5.8<br>Riepilogo del modulo<br>e venti calcoli", sottotitolo:"La chiusura del modulo 5, con il cronometro",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
