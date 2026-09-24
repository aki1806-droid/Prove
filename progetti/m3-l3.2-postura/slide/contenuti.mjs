// Contenuto delle 50 scene della lezione 3.2 — postura, mobilizzazione e
// sindrome da immobilizzazione. Qui entrano i corpi nuovi: il letto visto di
// lato, la sagoma con gli apparati, la curva forza/tempo, le tre forze, la triade.

const POS1 = [
 {p:"supina", t:"Supina", d:"riposo, esami — attenzione a **sacro e talloni**"},
 {p:"prona", t:"Prona", d:"insufficienza respiratoria grave, ARDS"},
 {p:"laterale", t:"Laterale di sicurezza", d:"incosciente che **respira**: previene l'inalazione"},
 {p:"sims", t:"Sims", d:"semiprona: **clistere**, esplorazione rettale", key:true},
];
const POS2 = [
 {p:"fowler", t:"Fowler", d:"dispnea, alimentazione, scompenso"},
 {p:"semifowler", t:"Semi-Fowler", d:"lo standard nel **ventilato**", key:true},
 {p:"ortopnoica", t:"Ortopnoica", d:"tronco in avanti: dispnea grave, edema polmonare"},
 {p:"trend", t:"Trendelenburg", d:"testa più in basso dei piedi"},
 {p:"antitrend", t:"Anti-Trendelenburg", d:"il contrario"},
];
const ASSOC = [
 {n:"1", t:"**Dispnea** → Fowler o ortopnoica"},
 {n:"2", t:"**Clistere** → Sims o fianco sinistro"},
 {n:"3", t:"**Incosciente che respira** → laterale di sicurezza"},
 {n:"4", t:"**Ventilato** → semi-Fowler 30–45°", key:true},
];
const APPARATI = [
 {k:"cute", t:"Cute", d:"lesioni da pressione, macerazione, frizione"},
 {k:"muscolo", t:"Muscolo-scheletrico", d:"ipotrofia, retrazioni, anchilosi, osteoporosi"},
 {k:"cardio", t:"Cardiovascolare", d:"ipotensione ortostatica, **TVP**, embolia"},
 {k:"resp", t:"Respiratorio", d:"ristagno, atelettasia, polmonite ipostatica"},
 {k:"gastro", t:"Gastrointestinale", d:"stipsi, fecaloma, calo dell'appetito"},
 {k:"urin", t:"Urinario", d:"ristagno, calcolosi, infezioni"},
 {k:"metab", t:"Metabolico", d:"bilancio azotato negativo, sarcopenia"},
 {k:"neuro", t:"Neuropsichico", d:"delirium, depressione, sonno-veglia", key:true},
];
const OTTO = [
 {n:"1", t:"**Cute** — pressione, macerazione, frizione"},
 {n:"2", t:"**Muscolo-scheletrico** — ipotrofia, retrazioni, anchilosi, osteoporosi"},
 {n:"3", t:"**Cardiovascolare** — ipotensione ortostatica, TVP, embolia"},
 {n:"4", t:"**Respiratorio** — ristagno, atelettasia, polmonite ipostatica"},
 {n:"5", t:"**Gastrointestinale** — stipsi, fecaloma, appetito"},
 {n:"6", t:"**Urinario** — ristagno, calcolosi, infezioni"},
 {n:"7", t:"**Metabolico** — azoto negativo, sarcopenia, insulino-resistenza"},
 {n:"8", t:"**Neuropsichico** — delirium, depressione, sonno-veglia"},
];
const PROGR = [
 {t:"Seduto a letto"}, {t:"Bordo letto", d:"piedi a terra"}, {t:"Poltrona"},
 {t:"Stazione eretta"}, {t:"Cammino assistito", key:true},
];
const FORZE = [
 {k:"pressione", t:"Pressione", d:"schiaccia i tessuti contro il piano osseo"},
 {k:"frizione", t:"Frizione", d:"la cute sfrega sul lenzuolo quando **trascini**"},
 {k:"taglio", t:"Taglio", d:"la cute resta ferma, i piani profondi **scivolano**", key:true},
];
const VIRCHOW = [
 {t:"Stasi venosa", d:"il sangue che ristagna", key:true},
 {t:"Danno endoteliale", d:"la parete del vaso"},
 {t:"Ipercoagulabilità", d:"il sangue che coagula più facilmente"},
];
const TVP = [
 {t:"Muoversi", d:"mobilizzazione precoce: il primo intervento", key:true},
 {t:"Esercizi attivi", d:"caviglie, polpaccio"},
 {t:"Calze graduate", d:"misurate, mai arrotolate"},
 {t:"Compressione", d:"pneumatica, se i farmaci no"},
 {t:"Farmaci", d:"profilassi su prescrizione"},
 {t:"Idratazione", d:"il sangue denso scorre peggio"},
];
const PRINCIPI = [
 {n:"1", t:"**Valutare prima** — peso, collaborazione, dispositivi, spazio, operatori"},
 {n:"2", t:"**Pianificare e comunicare** — uno solo guida e dà il tempo"},
 {n:"3", t:"**Avvicinare il carico**"},
 {n:"4", t:"**Base d'appoggio ampia**"},
 {n:"5", t:"**Flettere le ginocchia**, non la schiena"},
 {n:"6", t:"**Non ruotare il tronco** sotto carico: si spostano i piedi"},
 {n:"7", t:"**Usare il peso del corpo**, non le braccia"},
 {n:"8", t:"**Usare gli ausili** — lo standard, non un ripiego", key:true},
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 3 · Bisogni fondamentali, comfort e assistenza di base avanzata",
  titolo:"Postura, mobilizzazione,<br>immobilizzazione", sottotitolo:"3.2 · Le posizioni, e la sindrome di un corpo lasciato fermo",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"figura", tema:"chiaro", sopratitolo:"Micro-lezione 2 di 8", illu:"letto",
  titolo:"L'immobilità danneggia<br>**tutti gli apparati** insieme.",
  sotto:"Per l'esame questa lezione vale doppio, e per due ragioni diverse."},
{id:"s03", tipo:"confronto", tema:"chiaro", sopratitolo:"Due ragioni, due prove", col:[
  {h:"Le posizioni", t:"Domande **secche**, a risposta immediata"},
  {h:"La sindrome da immobilizzazione", t:"La traccia classica della **prova scritta**: mostra se sai ragionare per sistemi"}]},

{id:"s04", tipo:"posizioni", tema:"chiaro", sopratitolo:"Le posizioni · prima parte", attive:[0,1], voci:POS1},
{id:"s05", tipo:"posizioni", tema:"chiaro", sopratitolo:"Le posizioni · prima parte", voci:POS1},
{id:"s06", tipo:"tre", tema:"chiaro", sopratitolo:"Quattro posizioni, quattro motivi", box:[
  {n:"1", t:"Supina", d:"il peso sul **sacro e sui talloni**"},
  {n:"2", t:"Prona", d:"il polmone che si apre"},
  {n:"3", t:"Laterale", d:"la via aerea che resta libera"},
  {n:"4", t:"Sims", d:"il retto che si raggiunge", key:true}]},

{id:"s07", tipo:"posizioni", tema:"chiaro", sopratitolo:"Le posizioni · seconda parte", attive:[0,1], voci:POS2},
{id:"s08", tipo:"posizioni", tema:"chiaro", sopratitolo:"Le posizioni · seconda parte", voci:POS2},

{id:"s09", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, attive:[0,1], sopratitolo:"Le quattro associazioni da sapere", celle:ASSOC},
{id:"s10", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Quattro coppie, quattro risposte già pronte", celle:ASSOC},

{id:"s11", tipo:"figura", tema:"chiaro", sopratitolo:"Perché il clistere si fa a sinistra", illu:"colon",
  titolo:"Il discendente e il sigma<br>stanno **a sinistra**.",
  sotto:"Sims o fianco sinistro seguono l'anatomia del colon."},
{id:"s12", tipo:"sostituzione", tema:"chiaro", sopratitolo:"All'orale vale più della risposta secca",
  da:{h:"Ha memorizzato", t:"«Sims»"}, a:{h:"Ha capito", t:"«Sims: il liquido scende per gravità nel discendente, meno crampi»"},
  sotto:"Quando puoi dare la ragione anatomica, dalla."},

{id:"s13", tipo:"apparati", tema:"chiaro", sopratitolo:"La sindrome da immobilizzazione", attive:[], voci:APPARATI},
{id:"s14", tipo:"apparati", tema:"chiaro", sopratitolo:"Otto sistemi, uno per uno", voci:APPARATI},

{id:"s15", tipo:"apparati", tema:"chiaro", sopratitolo:"Cute e muscolo-scheletrico", attive:[0,1], voci:APPARATI},
{id:"s16", tipo:"tre", tema:"chiaro", sopratitolo:"Muscolo-scheletrico · il muscolo che non lavora si consuma", box:[
  {n:"1", t:"Ipotrofia", d:"già nella **prima settimana**", key:true},
  {n:"2", t:"Retrazioni", d:"tendinee"},
  {n:"3", t:"Anchilosi", d:"articolare"},
  {n:"4", t:"Osteoporosi", d:"da disuso, con ipercalcemia"}]},

{id:"s17", tipo:"curva", tema:"chiaro", sopratitolo:"Il dato che giustifica tutto il resto", y:"forza", x1:"giorni", x2:"settimane",
  note:[{t:"Si perde in giorni", d:"alcuni punti percentuali al giorno", key:true}, {t:"Si recupera in settimane", d:"e nell'anziano molto più lentamente"}]},
{id:"s18", tipo:"titolo", tema:"profondo",
  titolo:"La forza si perde in **giorni**<br>e si recupera in **settimane**.",
  sotto:"«Lo lascio a letto che è più sicuro» non è prudenza: è una scelta che produce danno."},

{id:"s19", tipo:"apparati", tema:"chiaro", sopratitolo:"Cardiovascolare", attive:[0,1,2], voci:APPARATI},
{id:"s20", tipo:"apparati", tema:"chiaro", sopratitolo:"Respiratorio", attive:[0,1,2,3], voci:APPARATI},

{id:"s21", tipo:"apparati", tema:"chiaro", sopratitolo:"Gastrointestinale e urinario", attive:[0,1,2,3,4,5], voci:APPARATI},
{id:"s22", tipo:"apparati", tema:"chiaro", sopratitolo:"Metabolico e neuropsichico", voci:APPARATI},
{id:"s23", tipo:"griglia", tema:"tenue", colonne:2, spunta:false, sopratitolo:"Otto apparati, nessuno risparmiato: la risposta scritta è già completa", celle:OTTO},

{id:"s24", tipo:"figura", tema:"chiaro", sopratitolo:"La mobilizzazione precoce", illu:"orologio",
  titolo:"Il miglior rapporto<br>tra **sforzo e beneficio**.",
  sotto:"Si inizia appena le condizioni cliniche lo consentono, anche in terapia intensiva."},
{id:"s25", tipo:"percorso", tema:"chiaro", sopratitolo:"La progressione, e prima di ogni passo si valuta", tappe:PROGR},
{id:"s26", tipo:"elenco", tema:"chiaro", sopratitolo:"Precoce non vuol dire imprudente · si valuta prima di ogni passo", voci:[
  {t:"Parametri"}, {t:"Dolore"}, {t:"Vertigini"}, {t:"Forza"}, {t:"Dispositivi"}, {t:"**Ultima dose** di sedativi o antipertensivi"}]},

{id:"s27", tipo:"posizioni", tema:"chiaro", sopratitolo:"L'alzata in due tempi", voci:[
  {p:"seduto", t:"Seduto al bordo", d:"piedi a terra, per qualche minuto"},
  {p:"inpiedi", t:"In piedi", d:"previene l'**ipotensione ortostatica**, fra le prime cause di caduta alla prima alzata", key:true}]},
{id:"s28", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Si sospende e si rivaluta se compaiono", celle:[
  {n:"1", t:"Vertigini"}, {n:"2", t:"Pallore, sudorazione"}, {n:"3", t:"Dispnea"}, {n:"4", t:"Dolore toracico"},
  {n:"5", t:"Caduta pressoria"}, {n:"6", t:"Desaturazione", key:true}]},

{id:"s29", tipo:"cifre", tema:"chiaro", sopratitolo:"I cambi posturali", voci:[
  {n:2, suf:" h", t:"a letto", d:"adattando a rischio, superficie, tolleranza"},
  {n:1, suf:" h", t:"in poltrona"},
  {n:30, suf:"°", t:"laterale", d:"non a 90: meno pressione sul **trocantere**", key:true}]},
{id:"s30", tipo:"figura", tema:"chiaro", sopratitolo:"I cambi posturali · due dettagli da quiz", illu:"tallone",
  titolo:"Talloni **scaricati**,<br>mai massaggiare gli arrossamenti.",
  sotto:"Cuscino sotto i polpacci: il materasso antidecubito non basta. La frizione su cute sofferente aumenta il danno."},

{id:"s31", tipo:"forze", tema:"chiaro", sopratitolo:"Tre forze diverse, da distinguere", attive:[0,1], voci:FORZE},
{id:"s32", tipo:"forze", tema:"chiaro", sopratitolo:"Tre forze diverse, da distinguere", voci:FORZE},
{id:"s33", tipo:"sostituzione", tema:"tenue", sopratitolo:"Conseguenza pratica, una sola",
  da:{h:"Mai", t:"trascinare"}, a:{h:"Sempre", t:"sollevare"},
  sotto:"Se senti il lenzuolo strusciare sotto la schiena, una delle tre forze sta lavorando contro la cute."},

{id:"s34", tipo:"triade", tema:"chiaro", sopratitolo:"La trombosi venosa profonda · la triade di Virchow", centro:"TVP", nodi:VIRCHOW},
{id:"s35", tipo:"triade", tema:"chiaro", sopratitolo:"L'immobilità agisce sulla stasi: l'allettato è a rischio per definizione", centro:"TVP", attive:[0], nodi:VIRCHOW},

{id:"s36", tipo:"raggiera", tema:"chiaro", sopratitolo:"La prevenzione della TVP · sei misure", centro:"TVP", attive:[0,1], raggi:TVP},
{id:"s37", tipo:"raggiera", tema:"chiaro", sopratitolo:"La prevenzione della TVP · sei misure", centro:"TVP", attive:[0,1,2,3], raggi:TVP},
{id:"s38", tipo:"raggiera", tema:"chiaro", sopratitolo:"Sei misure, e la prima resta sempre la stessa", centro:"TVP", raggi:TVP},

{id:"s39", tipo:"figura", tema:"chiaro", sopratitolo:"Sospetto di TVP · i segni", illu:"gambe",
  titolo:"Edema **monolaterale**<br>del polpaccio.",
  sotto:"Dolore, tensione, calore, arrossamento: una gamba sola, diversa dall'altra."},
{id:"s40", tipo:"titolo", tema:"profondo",
  titolo:"Non si massaggia,<br>non si mobilizza **vigorosamente**.",
  sotto:"Si avvisa il medico: la manovra può favorire l'embolizzazione."},
{id:"s41", tipo:"tre", tema:"chiaro", sopratitolo:"Il segnale d'allarme dell'embolia polmonare · comparsa improvvisa", box:[
  {n:"1", t:"Dispnea"}, {n:"2", t:"Dolore toracico"}, {n:"3", t:"Tachicardia"}, {n:"4", t:"Desaturazione", key:true}]},

{id:"s42", tipo:"icone", tema:"chiaro", sopratitolo:"Gli ausili · prima parte", voci:[
  {icona:"telo", t:"Telo ad alto scorrimento", d:"sposta senza trascinare, protegge la schiena"},
  {icona:"sollevatore", t:"Sollevatore", d:"due operatori, imbragatura della misura giusta"},
  {icona:"disco", t:"Disco girevole", d:"trasferimenti con collaborazione parziale", key:true}]},
{id:"s43", tipo:"icone", tema:"chiaro", sopratitolo:"Gli ausili · seconda parte", voci:[
  {icona:"deambulatore", t:"Deambulatore", d:"all'altezza dei **polsi**, braccia distese"},
  {icona:"archetto", t:"Archetto alzacoperte", d:"previene l'equinismo e la pressione sulle dita"},
  {icona:"bastone", t:"Bastone", d:"dal lato **opposto** all'arto compromesso", key:true}]},
{id:"s44", tipo:"figura", tema:"chiaro", sopratitolo:"Il bastone · molti sbagliano per istinto", illu:"appoggio", lato:"dx",
  titolo:"Dal lato **opposto**,<br>avanza **insieme** all'arto malato.",
  sotto:"Verrebbe da metterlo dal lato dolente: è l'errore."},

{id:"s45", tipo:"norma", tema:"chiaro", sopratitolo:"Chiudiamo con l'ergonomia",
  etichetta:"Movimentazione manuale dei pazienti", sigla:"D.Lgs. 81/2008 · Titolo VI",
  testo:"Un rischio professionale: il datore di lavoro **valuta**, fornisce ausili, **forma e addestra**, garantisce la sorveglianza sanitaria."},
{id:"s46", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, attive:[0], sopratitolo:"I principi della movimentazione", celle:PRINCIPI},
{id:"s47", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, attive:[0,1,2,3,4], sopratitolo:"I principi della movimentazione", celle:PRINCIPI},
{id:"s48", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"I principi della movimentazione", celle:PRINCIPI},
{id:"s49", tipo:"figura", tema:"chiaro", sopratitolo:"La schiena dell'operatore", illu:"sollevare",
  titolo:"Uno **strumento di lavoro**:<br>si protegge con il metodo.",
  sotto:"Prossima lezione: nutrizione, malnutrizione e disfagia."},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione",
  titolo:"3.3 Nutrizione e stato nutrizionale", sottotitolo:"Malnutrizione, disfagia,<br>e come si valuta chi non mangia abbastanza",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
