// Contenuto delle 50 scene della lezione 6.2 — gli accessi venosi centrali.
// Un corpo nuovo: gli accessi (il busto con il braccio e la cava, e i cinque
// dispositivi che si disegnano dal punto d'ingresso alla punta; il Midline
// in tinta sommessa perché la sua punta resta periferica). Il bundle è un
// percorso che si accende in tre tempi, i tempi del cambio sono cifre.

const BUNDLE = [
 {t:"Igiene delle mani"}, {t:"Massime barriere", d:"sterili"}, {t:"Clorexidina 2%", d:"in alcol, asciugata", key:true}, {t:"Sito", d:"evitare la femorale"}, {t:"Check-list", d:"con l'osservatore"},
];
const FAM = [
 {h:"Meccaniche", voci:[{t:"All'inserimento: **pneumotorace**, puntura arteriosa, malposizione, aritmie"}, {t:"Nella gestione: occlusione, rottura, dislocazione, **embolia gassosa**", key:true}]},
 {h:"Trombotiche", voci:[{t:"Trombosi del braccio o del collo"}, {t:"**Edema**, dolore, turgore delle vene: segnalare subito"}]},
 {h:"Infettive", key:true, voci:[{t:"Sede di uscita, tunnel, **batteriemia**"}, {t:"**Brivido al lavaggio**: catetere colonizzato", key:true}]},
];
const TAB1 = [
 {h:"CVC non tunnellizzato", voci:[{t:"**Centrale**"}, {t:"Breve termine"}]},
 {h:"PICC", key:true, voci:[{t:"**Centrale**"}, {t:"Medio-lungo termine"}]},
 {h:"Midline", voci:[{t:"**Periferico**", key:true}, {t:"Qualche settimana"}]},
];
const TAB2 = [
 {h:"Tunnellizzato", voci:[{t:"**Centrale**"}, {t:"Lungo termine"}]},
 {h:"Port", key:true, voci:[{t:"**Centrale**"}, {t:"Lungo termine, uso intermittente"}, {t:"**Ago di Huber**", key:true}]},
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 6 · Accessi vascolari, terapia infusionale ed emocomponenti",
  titolo:"Accessi venosi<br>centrali", sottotitolo:"6.2 · CVC, PICC, Midline, port: il bundle e le complicanze",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"accessi", tema:"chiaro", sopratitolo:"Micro-lezione 2 di 8 · centrale è l'accesso con la punta in una grande vena vicino al cuore: la cava superiore o la giunzione con l'atrio", attive:[]},
{id:"s03", tipo:"frase", tema:"chiaro", sopratitolo:"Terapie che una vena periferica non tollera, e un rischio specifico",
  testo:"Le **batteriemie** da catetere: le **CLABSI**."},
{id:"s04", tipo:"frase", tema:"chiaro", sopratitolo:"Il filo di questa lezione",
  testo:"La prevenzione delle CLABSI è un **indicatore di qualità** dell'assistenza infermieristica."},

{id:"s05", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, attive:[0,1,2], sopratitolo:"Quando serve un accesso centrale", celle:[
  {n:"1", t:"Farmaci **irritanti o vescicanti**"}, {n:"2", t:"Osmolarità **> 900 mOsm/L** o pH estremo", key:true}, {n:"3", t:"**Nutrizione parenterale** completa"},
  {n:"4", t:"Terapie **prolungate**"}, {n:"5", t:"**Monitoraggio** emodinamico"}, {n:"6", t:"Patrimonio venoso periferico **esaurito**"}]},
{id:"s06", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Quando serve un accesso centrale", celle:[
  {n:"1", t:"Farmaci **irritanti o vescicanti**"}, {n:"2", t:"Osmolarità **> 900 mOsm/L** o pH estremo"}, {n:"3", t:"**Nutrizione parenterale** completa"},
  {n:"4", t:"Terapie **prolungate**"}, {n:"5", t:"**Monitoraggio** emodinamico"}, {n:"6", t:"Patrimonio venoso periferico **esaurito**", key:true}]},

{id:"s07", tipo:"accessi", tema:"chiaro", sopratitolo:"I dispositivi · il CVC non tunnellizzato: giugulare interna, succlavia o femorale; breve termine, terapia intensiva", attive:[0]},
{id:"s08", tipo:"accessi", tema:"chiaro", sopratitolo:"Il PICC · inserito in una vena del braccio sotto ecoguida, ma la punta arriva in cava: è centrale; settimane o mesi", attive:[0,1]},
{id:"s09", tipo:"accessi", tema:"chiaro", sopratitolo:"Tunnellizzato e port · sotto la cute per il lungo termine; il port è impiantato: terapie intermittenti, come le chemioterapie", attive:[0,1,3,4]},

{id:"s10", tipo:"accessi", tema:"chiaro", sopratitolo:"Attenzione al Midline · la trappola classica: come un PICC, ma più corto, la punta resta nell'ascellare o nella basilica", attive:[1,2]},
{id:"s11", tipo:"trappola", tema:"chiaro", sopratitolo:"Quindi è un accesso periferico", righe:[
  {sb:"Nutrizione parenterale centrale o vescicanti nel Midline", ok:"Solo soluzioni **compatibili con la via periferica**"}]},
{id:"s12", tipo:"frase", tema:"chiaro", sopratitolo:"Utile per terapie di qualche settimana con farmaci non irritanti",
  testo:"È **la punta** che fa l'accesso, non il punto d'ingresso."},

{id:"s13", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"Una regola di sicurezza fondamentale · un centrale non si usa finché la punta non è confermata", celle:[
  {n:"1", t:"**Radiografia del torace**"}, {n:"2", t:"**ECG intracavitario**", key:true}]},
{id:"s14", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"La conferma della punta", celle:[
  {n:"1", t:"L'ECG intracavitario verifica **già durante l'inserimento**", key:true},
  {n:"2", t:"Dopo giugulare o succlavia, la radiografia esclude lo **pneumotorace**"}]},

{id:"s15", tipo:"percorso", tema:"chiaro", sopratitolo:"Il bundle CLABSI · all'inserimento", attive:[0,1], tappe:BUNDLE},
{id:"s16", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Le massime barriere sterili · non un telino intorno alla sede: tutto il paziente", celle:[
  {t:"Cuffia"}, {t:"Mascherina"}, {t:"**Camice sterile**"}, {t:"**Guanti sterili**"}, {t:"**Telo sterile** che copre tutto il paziente", key:true}]},
{id:"s17", tipo:"percorso", tema:"chiaro", sopratitolo:"Il bundle CLABSI · clorexidina 2% in alcol, asciugata; la femorale si evita nell'adulto", attive:[0,1,2,3], tappe:BUNDLE},
{id:"s18", tipo:"percorso", tema:"chiaro", sopratitolo:"La check-list · compilata da un osservatore, spesso l'infermiere, autorizzato a fermare la procedura", tappe:BUNDLE},
{id:"s19", tipo:"titolo", tema:"profondo",
  titolo:"Il compito di dire **stop**.",
  sotto:"Uno dei pochi momenti in cui l'infermiere lo ha esplicitamente."},

{id:"s20", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"Il bundle nella gestione · interamente infermieristica", celle:[
  {n:"1", t:"**Igiene delle mani** prima di ogni accesso"},
  {n:"2", t:"**Scrub the hub**: il connettore si disinfetta prima di collegare", key:true}]},
{id:"s21", tipo:"cifre", tema:"chiaro", sopratitolo:"Scrub the hub · con clorexidina alcolica o alcol, poi asciugare: il connettore è la porta d'ingresso dei batteri", voci:[
  {n:"5–15", suf:"s", d:"di strofinamento", key:true}, {n:"asciutto", d:"prima di collegare"}]},
{id:"s22", tipo:"cifre", tema:"chiaro", sopratitolo:"La medicazione · e subito se staccata, bagnata o sporca; dove previste, spugnette alla clorexidina", voci:[
  {n:"7", suf:"gg", d:"trasparente", key:true}, {n:"2", suf:"gg", d:"garza"}, {n:"subito", d:"se staccata, bagnata, sporca"}]},
{id:"s23", tipo:"frase", tema:"chiaro", sopratitolo:"La misura più efficace di tutte",
  testo:"Chiedersi **ogni giorno** se il catetere serve ancora."},

{id:"s24", tipo:"cifre", tema:"chiaro", sopratitolo:"Il cambio delle linee · i lipidi favoriscono la crescita batterica", voci:[
  {n:"4–7", suf:"gg", d:"(96 ore – 7 giorni) infusioni continue senza lipidi, secondo procedura"}, {n:"24", suf:"h", d:"lipidi e nutrizione parenterale con lipidi", key:true}]},
{id:"s25", tipo:"cifre", tema:"chiaro", sopratitolo:"Il cambio delle linee", voci:[
  {n:"6–12", suf:"h", d:"propofol", key:true}, {n:"6.6", d:"sangue: la procedura trasfusionale"}]},

{id:"s26", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"I lavaggi, o flush", celle:[
  {n:"1", t:"**Fisiologica** prima e dopo ogni farmaco, fra farmaci diversi, dopo i prelievi"},
  {n:"2", t:"Tecnica **pulsante**: piccole spinte e pause, turbolenza che pulisce il lume", key:true}]},
{id:"s27", tipo:"cifre", tema:"chiaro", sopratitolo:"Le siringhe piccole generano pressioni altissime e possono rompere il catetere", voci:[
  {n:"≥ 10", suf:"ml", d:"la siringa", key:true}, {n:"positiva", d:"la pressione alla chiusura: niente reflusso in punta"}]},
{id:"s28", tipo:"frase", tema:"chiaro", sopratitolo:"Il lock · la soluzione lasciata nel catetere fra un uso e l'altro",
  testo:"Dipende dal **dispositivo** e dalla **procedura**: spesso fisiologica, in alcuni casi altre soluzioni."},

{id:"s29", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"Il port", celle:[
  {n:"1", t:"Si punge attraverso la cute con un **ago di Huber**, non carotante", key:true},
  {n:"2", t:"Non asporta frammenti della membrana di silicone: ne preserva la durata"}]},
{id:"s30", tipo:"griglia", tema:"chiaro", colonne:1, spunta:true, sopratitolo:"Il port", celle:[
  {t:"Tecnica **asettica**; l'ago in sede si cambia secondo procedura"}, {t:"Non usato: **lavaggio periodico**, secondo produttore e procedura", key:true}]},

{id:"s31", tipo:"colonne", tema:"chiaro", sopratitolo:"Le complicanze, in tre famiglie", attive:[0], colonne:FAM},
{id:"s32", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Durante la gestione · per l'occlusione vale la regola della 6.1: non si forza con la siringa", celle:[
  {n:"1", t:"**Occlusione**"}, {n:"2", t:"Rottura"}, {n:"3", t:"Dislocazione"}, {n:"4", t:"**Embolia gassosa**", key:true}]},

{id:"s33", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"L'embolia gassosa · catetere aperto, connessione staccata, rimozione scorretta", celle:[
  {n:"1", t:"**Dispnea** improvvisa", key:true}, {n:"2", t:"Dolore toracico"}, {n:"3", t:"**Ipotensione**"}, {n:"4", t:"Cianosi, coscienza alterata"}]},
{id:"s34", tipo:"percorso", tema:"chiaro", sopratitolo:"La condotta", tappe:[
  {t:"Chiudere", d:"la via d'ingresso dell'aria"}, {t:"Laterale sinistro", d:"capo in basso, Trendelenburg", key:true}, {t:"Ossigeno"}, {t:"Medico"}]},
{id:"s35", tipo:"griglia", tema:"chiaro", colonne:1, spunta:true, sopratitolo:"La prevenzione alla rimozione del CVC", celle:[
  {t:"Paziente **supino o in Trendelenburg**"}, {t:"Rimozione in **espirazione** o in Valsalva", key:true}, {t:"**Medicazione occlusiva** sulla sede"}]},

{id:"s36", tipo:"colonne", tema:"chiaro", sopratitolo:"Trombotiche e infettive", colonne:FAM},
{id:"s37", tipo:"frase", tema:"chiaro", sopratitolo:"Un segno da conoscere",
  testo:"Il **brivido durante o subito dopo il lavaggio**: il catetere è colonizzato e il lavaggio immette batteri in circolo.",
  sotto:"Va segnalato immediatamente."},

{id:"s38", tipo:"confronto", tema:"chiaro", sopratitolo:"Le emocolture nel sospetto di CLABSI · appaiate, nello stesso momento", col:[
  {h:"Un set", t:"**dal catetere**", key:true}, {h:"Un set", t:"**da vena periferica**"}]},
{id:"s39", tipo:"frase", tema:"chiaro", sopratitolo:"Rivedremo le emocolture nella lezione 6.7",
  testo:"Il confronto fra i **tempi di positivizzazione** dice se la sorgente è il catetere."},

{id:"s40", tipo:"frase", tema:"chiaro", sopratitolo:"Il caso · paziente con PICC per terapia antibiotica",
  testo:"Dopo il lavaggio del catetere: **febbre 38,8** con **brivido**. Che cosa fai?"},
{id:"s41", tipo:"percorso", tema:"chiaro", sopratitolo:"Che cosa fai · le emocolture prima di qualunque modifica dell'antibiotico", tappe:[
  {t:"Sospendere", d:"l'uso del catetere"}, {t:"Ispezionare", d:"la sede"}, {t:"Parametri"}, {t:"Medico"}, {t:"Emocolture", d:"appaiate: PICC e periferica", key:true}]},
{id:"s42", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"Poi", celle:[
  {n:"1", t:"Il **medico** decide se il catetere va rimosso"},
  {n:"2", t:"**Documentare** l'episodio e l'orario esatto del brivido", key:true}]},

{id:"s43", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"In Veneto", celle:[
  {n:"1", t:"**PICC e Midline** posizionati da team infermieristici formati, con ecoguida e conferma ECG", key:true},
  {n:"2", t:"L'evoluzione delle competenze del modulo 1, in concreto"}]},
{id:"s44", tipo:"frase", tema:"chiaro", sopratitolo:"Il bundle CLABSI nelle procedure; le batteriemie nella sorveglianza delle ICA",
  testo:"All'orale, il **team accessi vascolari a gestione infermieristica** è un ottimo aggancio."},

{id:"s45", tipo:"colonne", tema:"chiaro", sopratitolo:"La tabella da fotografare", colonne:TAB1},
{id:"s46", tipo:"colonne", tema:"chiaro", sopratitolo:"La tabella da fotografare · cinque dispositivi, una domanda: dove sta la punta?", colonne:TAB2},

{id:"s47", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Ricapitoliamo", celle:[
  {t:"**Conferma della punta** prima dell'uso", key:true}, {t:"Massime barriere sterili, **clorexidina alcolica**"},
  {t:"**Scrub the hub**"}, {t:"Trasparente ogni **7 giorni**, garza ogni **2**"}]},
{id:"s48", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Ricapitoliamo", celle:[
  {t:"Siringhe **≥ 10 ml**, tecnica pulsante"}, {t:"Embolia gassosa: **laterale sinistro e Trendelenburg**", key:true},
  {t:"**Brivido al lavaggio**: allarme"}]},
{id:"s49", tipo:"frase", tema:"chiaro", sopratitolo:"E ogni giorno, come nella 6.1, ancora di più per un centrale",
  testo:"**Serve ancora?**",
  sotto:"Nella prossima lezione: la fluidoterapia."},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione",
  titolo:"6.3<br>Fluidoterapia", sottotitolo:"Cristalloidi, colloidi, bilancio e sorveglianza",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
