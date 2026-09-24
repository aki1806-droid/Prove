// Contenuto delle 50 scene della lezione 3.3 — nutrizione, valutazione dello
// stato nutrizionale e disfagia. Corpi nuovi: la fascia del BMI e i tre
// bicchieri delle consistenze; illustrazioni: sarcopenia, gola, beccuccio.

const FABB = [
 {t:"25–30", d:"**kcal/kg** al giorno — energia"},
 {t:"0,8–1", d:"**g/kg** di proteine — basali"},
 {t:"30", d:"**ml/kg** di liquidi — 1,5–2 litri"},
 {t:"25–30", d:"**g** di fibre — con acqua adeguata"},
];
const BMI = [
 {a:18.5, t:"Sottopeso", d:"< 18,5"},
 {da:18.5, a:25, t:"Normopeso", d:"18,5 – 24,9", key:true},
 {da:25, a:30, t:"Sovrappeso", d:"25 – 29,9"},
 {da:30, a:35, t:"Obesità I", d:"30 – 34,9"},
 {da:35, a:40, t:"Obesità II", d:"35 – 39,9"},
 {da:40, t:"Obesità III", d:"≥ 40"},
];
const SCREEN = [
 {n:"MUST", t:"**Adulto, tutti i setting** — BMI, calo ponderale non intenzionale, effetto della malattia acuta. **Da 2 in su: rischio alto**"},
 {n:"MNA", t:"**Anziano** — il punteggio **basso** indica lo stato peggiore: il verso opposto del MUST"},
 {n:"NRS-2002", t:"**Ospedalizzato** — stato nutrizionale, gravità della malattia, età. **Da 3 in su** si interviene", key:true},
];
const TRE = [
 {n:"1", t:"**Malnutrizione per difetto** — squilibrio fra apporti e fabbisogni: **reversibile** con un apporto adeguato"},
 {n:"2", t:"**Sarcopenia** — perdita di massa **e forza**: si valuta con la forza di presa e la velocità del cammino"},
 {n:"3", t:"**Cachessia** — deperimento in malattia cronica con infiammazione: **non si corregge con la sola nutrizione**", key:true},
];
const CONSEG = [
 {t:"Ferite", d:"guariscono più lentamente"},
 {t:"Lesioni", d:"da pressione: item della Braden"},
 {t:"Infezioni", d:"immunità compromessa"},
 {t:"Cadute", d:"con la sarcopenia"},
 {t:"Degenza", d:"e mortalità aumentate"},
 {t:"Farmaci", d:"quota libera alterata", key:true},
];
const SEGNI = [
 {n:"1", t:"**Tosse** o schiarimento della voce durante o dopo la deglutizione"},
 {n:"2", t:"**Voce umida o gorgogliante** dopo aver bevuto — il segno più suggestivo", key:true},
 {n:"3", t:"**Deglutizioni multiple** per un boccone, pasto molto lungo"},
 {n:"4", t:"**Fuoriuscita di cibo**, residui in bocca"},
 {n:"5", t:"**Rifiuto dei liquidi**"},
 {n:"6", t:"**Segni indiretti** — calo ponderale, disidratazione, polmoniti ricorrenti"},
];
const ACQUA = [
 {t:"Un cucchiaino", d:"non un bicchiere"},
 {t:"Volumi crescenti"},
 {t:"Osservare", d:"tosse, voce umida, SpO₂"},
 {t:"Esito", d:"negativo, positivo o dubbio", key:true},
];
const CONSIST = [
 {k:"fluido", t:"Liquidi fluidi", d:"i **più pericolosi**: corrono e sfuggono al controllo", key:true},
 {k:"denso", t:"Addensati", d:"scorrono piano: si controllano"},
 {k:"doppia", t:"Doppia consistenza", d:"il liquido corre, il solido resta indietro"},
];
const NONMANGIA = [
 {t:"Bocca", d:"lesioni, candidosi, protesi"},
 {t:"Farmaci", d:"nausea, gusto, secchezza"},
 {t:"Dolore", d:"non controllato"},
 {t:"Stipsi", d:"e fecaloma"},
 {t:"Umore", d:"depressione, delirium"},
 {t:"Disfagia"},
 {t:"Contesto", d:"orari, cibo freddo, nessuno che aiuti", key:true},
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 3 · Bisogni fondamentali, comfort e assistenza di base avanzata",
  titolo:"Nutrizione e valutazione<br>dello stato nutrizionale", sottotitolo:"3.3 · Fabbisogni, screening, malnutrizione e disfagia",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"figura", tema:"chiaro", sopratitolo:"Micro-lezione 3 di 8", illu:"letto",
  titolo:"Un problema enorme<br>e **sottostimato**.",
  sotto:"La malnutrizione ospedaliera allunga la degenza, rallenta le ferite, aumenta infezioni e mortalità."},
{id:"s03", tipo:"tre", tema:"chiaro", sopratitolo:"Materia di competenza diretta dell'infermiere", box:[
  {n:"1", t:"Screening", d:"del rischio nutrizionale"},
  {n:"2", t:"Sorveglianza", d:"di quanto la persona mangia davvero"},
  {n:"3", t:"Sicurezza", d:"della somministrazione", key:true}]},
{id:"s04", tipo:"figura", tema:"chiaro", sopratitolo:"Dentro questa lezione", illu:"bocca", lato:"dx",
  titolo:"La **disfagia**:<br>vale da sola molte domande.",
  sotto:"Ci arriviamo a metà strada, e ci restiamo fino alla fine."},

{id:"s05", tipo:"tre", tema:"chiaro", cifre:true, sopratitolo:"I fabbisogni nell'adulto", box:FABB.slice(0,2)},
{id:"s06", tipo:"sostituzione", tema:"chiaro", sopratitolo:"Le proteine, quando il fabbisogno sale",
  da:{h:"Basale", t:"0,8–1 g/kg"}, a:{h:"A rischio", t:"1,2–1,5 g/kg"},
  sotto:"Anziano, malnutrito, lesioni da pressione, post-operatorio: sale proprio quando l'appetito scende."},
{id:"s07", tipo:"tre", tema:"chiaro", cifre:true, sopratitolo:"I fabbisogni nell'adulto", box:FABB},

{id:"s08", tipo:"figura", tema:"chiaro", sopratitolo:"Il principio della febbre", illu:"termometro",
  titolo:"+1 °C → **+10–13 %**<br>di metabolismo basale.",
  sotto:"E perdite idriche aggiuntive di alcune centinaia di millilitri al giorno."},
{id:"s09", tipo:"trappola", tema:"chiaro", sopratitolo:"Conseguenza controintuitiva", righe:[
  {sb:"«Meno, per non affaticarlo»", ok:"Il febbrile ha bisogno di **più calorie e più liquidi** — proprio mentre mangia di meno"}]},

{id:"s10", tipo:"fascia", tema:"chiaro", sopratitolo:"Il BMI · peso in kg diviso l'altezza in metri al quadrato", min:14, max:46, attive:[0,1,2], classi:BMI},
{id:"s11", tipo:"fascia", tema:"chiaro", sopratitolo:"Il BMI · sei classi, le soglie che i quiz chiedono", min:14, max:46, classi:BMI},
{id:"s12", tipo:"fascia", tema:"chiaro", sopratitolo:"Nell'anziano la soglia inferiore sale", min:14, max:46, classi:BMI, marca:{v:22, t:"anziano: ≈ 22"}},

{id:"s13", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, attive:[0], sopratitolo:"Tre strumenti di screening", celle:SCREEN},
{id:"s14", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, attive:[0,1], sopratitolo:"Tre strumenti di screening · attenzione al verso", celle:SCREEN},
{id:"s15", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Il punteggio serve solo se cambia il piano (lezione 2.3)", celle:SCREEN},

{id:"s16", tipo:"trappola", tema:"chiaro", sopratitolo:"Attenzione all'albumina", righe:[
  {sb:"«Albumina bassa = malnutrito»", ok:"In fase acuta è anche un **indice di infiammazione**: scende indipendentemente dallo stato nutrizionale"}]},
{id:"s17", tipo:"figura", tema:"chiaro", sopratitolo:"Il dato più semplice e più informativo", illu:"bilancia",
  titolo:"Il **calo ponderale**<br>non intenzionale nel tempo.",
  sotto:"Il peso nell'edematoso misura l'acqua, non il muscolo. La bilancia, ogni settimana."},

{id:"s18", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, attive:[0], sopratitolo:"Tre condizioni da non confondere", celle:TRE},
{id:"s19", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, attive:[0,1], sopratitolo:"Tre condizioni da non confondere", celle:TRE},
{id:"s20", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Tre condizioni da non confondere", celle:TRE},

{id:"s21", tipo:"figura", tema:"chiaro", sopratitolo:"Il concetto che vale una risposta all'orale", illu:"sarcopenia",
  titolo:"Un obeso<br>**può essere malnutrito**.",
  sotto:"Uno squilibrio fra apporti e fabbisogni, che convive con un BMI elevato."},
{id:"s22", tipo:"titolo", tema:"profondo",
  titolo:"Obesità **sarcopenica**:<br>non si vede.",
  sotto:"Dirlo mostra che hai capito il concetto, non solo memorizzato le soglie."},

{id:"s23", tipo:"raggiera", tema:"chiaro", sopratitolo:"Perché la malnutrizione peggiora tutto", centro:"Malnutrizione", attive:[0,1], raggi:CONSEG},
{id:"s24", tipo:"raggiera", tema:"chiaro", sopratitolo:"Perché la malnutrizione peggiora tutto", centro:"Malnutrizione", attive:[0,1,2,3], raggi:CONSEG},
{id:"s25", tipo:"raggiera", tema:"chiaro", sopratitolo:"Sei conseguenze, sei motivi per pesare la persona", centro:"Malnutrizione", raggi:CONSEG},

{id:"s26", tipo:"figura", tema:"chiaro", sopratitolo:"Il tema più importante della lezione", illu:"gola",
  titolo:"Disfagia: la complicanza temuta<br>è la **polmonite ab ingestis**.",
  sotto:"Una polmonite che nasce da un pasto, o da un sorso d'acqua."},
{id:"s27", tipo:"mappa", tema:"chiaro", sopratitolo:"Due tipi", illu:"gola", punti:[
  {x:139, y:120, t:"Orofaringea", d:"difficoltà a **iniziare**: ictus, Parkinson, demenza, SLA, neoplasie testa-collo"},
  {x:168, y:200, t:"Esofagea", d:"difficoltà di **transito** dopo l'inizio: stenosi, neoplasie, acalasia"}]},

{id:"s28", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, attive:[0,1], sopratitolo:"I segni da riconoscere", celle:SEGNI},
{id:"s29", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, attive:[0,1,2,3,4], sopratitolo:"I segni da riconoscere", celle:SEGNI},
{id:"s30", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Chi ha polmoniti che tornano va guardato mentre beve", celle:SEGNI},

{id:"s31", tipo:"trappola", tema:"chiaro", sopratitolo:"Il distrattore dei quiz", righe:[
  {sb:"«Non tossisce, quindi deglutisce bene»", ok:"**Aspirazione silente**: una quota rilevante delle inalazioni avviene senza tosse e senza segni"}]},
{id:"s32", tipo:"titolo", tema:"profondo",
  titolo:"L'aspirazione silente<br>**non fa rumore**.",
  sotto:"Se ricordi una cosa sola di questo video, ricorda questa."},

{id:"s33", tipo:"frase", tema:"chiaro", sopratitolo:"La regola che precede tutto",
  testo:"**Nulla per bocca** — nemmeno l'acqua, nemmeno i farmaci — prima di aver verificato che la deglutizione sia sicura."},
{id:"s34", tipo:"catena", tema:"chiaro", sopratitolo:"Nell'ictus acuto, e in ogni sospetto", passi:[
  {t:"Sospetto", d:"ictus acuto, o qualunque dubbio"}, {t:"Screening", d:"della deglutizione"},
  {t:"Prima somministrazione", d:"orale, solo dopo", key:true}]},

{id:"s35", tipo:"percorso", tema:"chiaro", sopratitolo:"Lo screening infermieristico · il test dell'acqua", tappe:ACQUA},
{id:"s36", tipo:"bivio", tema:"chiaro", sopratitolo:"L'esito del test", radice:"Test dell'acqua", rami:[
  {q:"negativo", t:"Alimentazione orale", d:"con le strategie di sicurezza"},
  {q:"positivo o dubbio", t:"Sospendere, segnalare, logopedia", d:"idratazione e terapia per altra via", key:true}]},
{id:"s37", tipo:"confronto", tema:"chiaro", sopratitolo:"Dopo lo screening", col:[
  {h:"Approfondimento strumentale", t:"**FEES** o videofluoroscopia: specialistico"},
  {h:"Rivalutare", t:"La disfagia può **migliorare**: nessuno resta a dieta modificata più del necessario"}]},

{id:"s38", tipo:"consistenze", tema:"chiaro", sopratitolo:"Le consistenze · un'inversione controintuitiva", attive:[0], voci:CONSIST},
{id:"s39", tipo:"consistenze", tema:"chiaro", sopratitolo:"Per questo i liquidi si addensano", attive:[0,1], voci:CONSIST},
{id:"s40", tipo:"consistenze", tema:"tenue", sopratitolo:"La minestrina con la pastina, i biscotti nel latte", voci:CONSIST},

{id:"s41", tipo:"posizioni", tema:"chiaro", sopratitolo:"Le strategie · la posizione", voci:[
  {p:"pasto", t:"Seduto a 90°, capo flesso", d:"il *chin tuck*; ambiente silenzioso, non parlare col boccone in bocca", key:true},
  {p:"reclinato", t:"Mai reclinato all'indietro", d:"il capo esteso apre la via aerea al boccone"}]},
{id:"s42", tipo:"elenco", tema:"chiaro", sopratitolo:"Le strategie · il ritmo", voci:[
  {t:"**Boccone piccolo**"}, {t:"**Deglutire due volte**"}, {t:"Bocca **vuota** prima del boccone successivo"},
  {t:"Il ritmo lo dà **chi mangia**, non chi imbocca"}]},
{id:"s43", tipo:"tre", tema:"chiaro", sopratitolo:"Le strategie · dopo il pasto", box:[
  {n:"1", t:"Seduto almeno **30 minuti**"},
  {n:"2", t:"**Igiene del cavo orale**", d:"la parte che previene la polmonite", key:true}]},

{id:"s44", tipo:"sostituzione", tema:"chiaro", sopratitolo:"Il collegamento che mostra comprensione reale",
  da:{h:"Non è", t:"comfort"}, a:{h:"È", t:"prevenzione della polmonite"},
  sotto:"L'igiene del cavo orale nel disfagico, dopo ogni pasto."},
{id:"s45", tipo:"catena", tema:"chiaro", sopratitolo:"Stessa fisiopatologia della VAP (lezione 3.1)", passi:[
  {t:"Residui", d:"alimentari colonizzati"}, {t:"Inalazione", d:"durante il sonno"}, {t:"Polmonite", key:true}]},

{id:"s46", tipo:"norma", tema:"chiaro", sopratitolo:"Due avvertenze pratiche · i farmaci",
  etichetta:"Farmaci frantumabili", sigla:"Racc. n. 19",
  testo:"Rilascio modificato e gastroresistenti **non si triturano**: si chiede una **formulazione alternativa**."},
{id:"s47", tipo:"figura", tema:"chiaro", sopratitolo:"Due avvertenze pratiche · la tazza con beccuccio", illu:"beccuccio", lato:"dx",
  titolo:"Sembra un aiuto:<br>induce **iperestensione** del capo.",
  sotto:"Nella disfagia va evitata."},

{id:"s48", tipo:"raggiera", tema:"chiaro", sopratitolo:"L'anziano che «non mangia» · prima di dire inappetente", centro:"Non mangia", attive:[0,1,2], raggi:NONMANGIA},
{id:"s49", tipo:"raggiera", tema:"chiaro", sopratitolo:"Sette cause valgono più di un integratore", centro:"Non mangia", raggi:NONMANGIA},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione",
  titolo:"3.4 Nutrizione enterale", sottotitolo:"Sondino naso-gastrico, PEG e PEJ:<br>posizionare, verificare, somministrare",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
