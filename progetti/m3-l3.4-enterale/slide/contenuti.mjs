// Contenuto delle 50 scene della lezione 3.4 — nutrizione enterale: sondino
// naso-gastrico, PEG e PEJ. Corpo nuovo: le vie di accesso sul profilo;
// illustrazioni: NEX, stomaco, PEG, radiografia, pH, pompa, siringa, cellula.

const VIE = [
 {k:"sng", t:"Sondino naso-gastrico", d:"breve termine: fino a **4–6 settimane**"},
 {k:"nd", t:"Naso-digiunale", d:"gastroparesi, alto rischio di inalazione"},
 {k:"peg", t:"PEG", d:"oltre le 4–6 settimane: più confortevole, migliore immagine di sé", key:true},
 {k:"pej", t:"PEJ / digiunostomia", d:"quando lo stomaco non è utilizzabile"},
];
const NONPROCEDE = [
 {n:"1", t:"**Trauma cranio-facciale** con sospetta frattura della base cranica — via nasale controindicata"},
 {n:"2", t:"**Varici esofagee** note, o sanguinamento in atto"},
 {n:"3", t:"**Stenosi o chirurgia recente** di esofago e stomaco"},
 {n:"4", t:"**Alterazioni anatomiche** delle vie nasali"},
];
const FLESSO = [
 {p:"flesso", t:"Capo flesso in avanti", d:"chiude la via aerea, apre quella **esofagea**: si deglutisce", key:true},
 {p:"reclinato", t:"Iperestensione", d:"allinea le vie **aeree**: è quello che si fa per intubare"},
];
const VERIFICA = [
 {n:"Rx", t:"**Radiografia** — la conferma di riferimento, quando indicata"},
 {n:"pH", t:"**pH dell'aspirato ≤ 5,5** — la verifica al letto"},
 {n:"Aria", t:"**Whoosh test** — insufflare aria e auscultare: non affidabile, un sondino in trachea fa lo stesso rumore", no:true, key:true},
];
const REGOLE = [
 {n:"1", t:"**Testata a 30–45°** durante, e per 30–60 minuti dopo"},
 {n:"2", t:"**Verificare la posizione** prima di iniziare"},
 {n:"3", t:"**Lavare la sonda** prima, dopo e fra i farmaci"},
 {n:"4", t:"**Miscela a temperatura ambiente**, mai fredda"},
 {n:"5", t:"**Tempi di appendimento** e pulizia del set"},
 {n:"6", t:"**Iniziare gradualmente**, secondo tolleranza", key:true},
];
const FARMACI = [
 {n:"1", t:"**Forma liquida** se disponibile"},
 {n:"2", t:"**Frantumabile?** rilascio modificato, gastroresistenti, sublinguali, capsule molli: no — Racc. n. 19", key:true},
 {n:"3", t:"**Uno alla volta**, mai miscelati"},
 {n:"4", t:"**Lavare** fra l'uno e l'altro"},
 {n:"5", t:"**Mai nella miscela** nutrizionale"},
 {n:"6", t:"**Interazioni** — fenitoina, fluorochinoloni; levotiroxina a digiuno"},
];
const COMPL = [
 {t:"Ab ingestis", d:"testata, posizione, velocità, cavo orale", key:true},
 {t:"Dislocazione", d:"fissaggio, lunghezza a ogni turno"},
 {t:"Occlusione", d:"lavaggi; acqua tiepida, mai mandrini"},
 {t:"Diarrea", d:"velocità, temperatura, set, farmaci"},
 {t:"Ala nasale", d:"fissaggio senza trazione, ruotare"},
];
const PEGPUNTI = [
 {x:120, y:99, t:"Disco esterno", d:"si **ruota**, non deve essere troppo stretto"},
 {x:120, y:196, t:"Disco interno", d:"la trazione lo incarcera nella parete: **buried bumper**"},
 {x:120, y:60, t:"Misura di riferimento", d:"registrata, così una variazione si riconosce"},
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 3 · Bisogni fondamentali, comfort e assistenza di base avanzata",
  titolo:"Nutrizione enterale:<br>SNG, PEG e PEJ", sottotitolo:"3.4 · Posizionare, verificare, somministrare",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"figura", tema:"chiaro", sopratitolo:"Micro-lezione 4 di 8", illu:"siringa",
  titolo:"La nutrizione enterale<br>è una **somministrazione**.",
  sotto:"Lezione ad alta densità procedurale: produce domande molto precise."},
{id:"s03", tipo:"confronto", tema:"chiaro", sopratitolo:"Può uccidere se fatta male · le due complicanze da concorso", col:[
  {h:"Inalazione", t:"Quasi sempre da un **passaggio saltato**: testata, verifica, velocità"},
  {h:"Dislocazione", t:"Quasi sempre da un **passaggio saltato**: misura registrata, fissaggio, controllo"}]},

{id:"s04", tipo:"frase", tema:"chiaro", sopratitolo:"Il principio guida",
  testo:"Se l'intestino funziona, **si usa l'intestino**."},
{id:"s05", tipo:"raggiera", tema:"chiaro", sopratitolo:"Perché enterale, non parenterale", centro:"Enterale", raggi:[
  {t:"Fisiologica"}, {t:"Mucosa", d:"trofismo mantenuto", key:true}, {t:"Batteri", d:"meno traslocazione"},
  {t:"Complicanze", d:"infettive e metaboliche: meno"}, {t:"Costo", d:"minore"}]},

{id:"s06", tipo:"elenco", tema:"chiaro", sopratitolo:"Indicazioni", voci:[
  {t:"**Disfagia neurologica**"}, {t:"Coma"}, {t:"Neoplasie testa-collo o esofagee"},
  {t:"Malnutrizione con apporto orale insufficiente"}, {t:"Paziente critico"}]},
{id:"s07", tipo:"confronto", tema:"chiaro", sopratitolo:"Le controindicazioni sono quelle che contano in un quiz", col:[
  {h:"Indicazioni", t:"disfagia neurologica · coma · neoplasie testa-collo · malnutrizione · paziente critico"},
  {h:"Controindicazioni", t:"**occlusione** · ileo paralitico · perforazione · ischemia · peritonite · **emorragia in atto** · vomito incoercibile · shock"}]},

{id:"s08", tipo:"vie", tema:"chiaro", sopratitolo:"Le vie di accesso", attive:[0,1], voci:VIE},
{id:"s09", tipo:"vie", tema:"chiaro", sopratitolo:"Le vie di accesso", voci:VIE},

{id:"s10", tipo:"figura", tema:"chiaro", sopratitolo:"La differenza che i quiz chiedono", illu:"stomaco",
  titolo:"Lo stomaco è un **serbatoio**:<br>i boli sono possibili.",
  sotto:"Svuotamento regolato dal piloro."},
{id:"s11", tipo:"sostituzione", tema:"chiaro", sopratitolo:"Nel digiuno no",
  da:{h:"Digiuno", t:"in boli"}, a:{h:"Digiuno", t:"solo continua, a velocità controllata"},
  sotto:"Un bolo nel digiuno: distensione, crampi, dumping, diarrea. Niente serbatoio, niente boli."},

{id:"s12", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, attive:[0], sopratitolo:"Quando l'infermiere non procede", celle:NONPROCEDE},
{id:"s13", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Si informa il medico e si valuta un'altra via", celle:NONPROCEDE},

{id:"s14", tipo:"figura", tema:"chiaro", sopratitolo:"La misurazione · metodo NEX", illu:"nex",
  titolo:"**Naso**, lobo dell'**orecchio**,<br>processo **xifoideo**.",
  sotto:"Si segna il punto e si registra il numero: è il riferimento per riconoscere una dislocazione."},

{id:"s15", tipo:"posizioni", tema:"chiaro", sopratitolo:"Il passaggio critico · in faringe", attive:[0], voci:FLESSO},
{id:"s16", tipo:"posizioni", tema:"chiaro", sopratitolo:"Il passaggio critico · perché", voci:FLESSO},
{id:"s17", tipo:"sostituzione", tema:"chiaro", sopratitolo:"L'opposto di quello che verrebbe istintivo",
  da:{h:"Istinto", t:"capo indietro"}, a:{h:"Metodo", t:"capo flesso, e deglutire"},
  sotto:"Stessa logica del chin tuck: il capo flesso protegge la via aerea."},

{id:"s18", tipo:"elenco", tema:"chiaro", sopratitolo:"Quando fermarsi", voci:[
  {t:"**Tosse** insistente"}, {t:"Dispnea"}, {t:"Cianosi"}, {t:"Desaturazione"}, {t:"**Incapacità di parlare**"}]},
{id:"s19", tipo:"titolo", tema:"profondo",
  titolo:"Non si insiste:<br>si **ritira** il sondino.",
  sotto:"Un sondino che fa tossire è un sondino nella via sbagliata."},

{id:"s20", tipo:"figura", tema:"chiaro", sopratitolo:"La verifica della posizione · la conferma iniziale", illu:"raggi",
  titolo:"La **radiografia**<br>è il riferimento.",
  sotto:"Quando indicata: è la domanda discriminante dei concorsi recenti."},
{id:"s21", tipo:"figura", tema:"chiaro", sopratitolo:"La verifica della posizione · al letto", illu:"ph", lato:"dx",
  titolo:"pH dell'aspirato<br>**≤ 5,5**.",
  sotto:"Compatibile con la sede gastrica."},
{id:"s22", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"Tre metodi, uno sbagliato", celle:VERIFICA},

{id:"s23", tipo:"tre", tema:"chiaro", sopratitolo:"Verificare sempre", box:[
  {n:"1", t:"Prima di **ogni** somministrazione"},
  {n:"2", t:"A **ogni turno** nella continua"},
  {n:"3", t:"**Lunghezza esterna**", d:"contro il valore registrato", key:true}]},
{id:"s24", tipo:"trappola", tema:"chiaro", sopratitolo:"Il tranello del pH", righe:[
  {sb:"«pH 6: il sondino è fuori»", ok:"**Inibitori di pompa e anti-H2** alzano il pH gastrico: si integra con altri elementi, nel dubbio radiografia"}]},
{id:"s25", tipo:"titolo", tema:"tenue",
  titolo:"Nel dubbio<br>**non si somministra**.",
  sotto:"Stessa logica della prescrizione illeggibile (lezione 2.4): un dubbio vale una radiografia, non un tentativo."},

{id:"s26", tipo:"icone", tema:"chiaro", sopratitolo:"Tre modalità", attive:[0,1], voci:[
  {icona:"siringa", t:"In boli", d:"siringa a stantuffo, **lentamente**: solo gastrica"},
  {icona:"flebo", t:"Intermittente per gravità", d:"regolando la velocità, non aprendo tutto"},
  {icona:"pompa", t:"Continua con pompa", d:"**obbligatoria nel digiunale**; critico, rischio di inalazione, avvio", key:true}]},
{id:"s27", tipo:"icone", tema:"chiaro", sopratitolo:"Tre modalità", voci:[
  {icona:"siringa", t:"In boli", d:"siringa a stantuffo, **lentamente**: solo gastrica"},
  {icona:"flebo", t:"Intermittente per gravità", d:"regolando la velocità, non aprendo tutto"},
  {icona:"pompa", t:"Continua con pompa", d:"**obbligatoria nel digiunale**; critico, rischio di inalazione, avvio", key:true}]},

{id:"s28", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, attive:[0,1,2], sopratitolo:"Le sei regole della somministrazione", celle:REGOLE},
{id:"s29", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Le sei regole della somministrazione", celle:REGOLE},

{id:"s30", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, attive:[0,1], sopratitolo:"I farmaci per sonda · sei regole", celle:FARMACI},
{id:"s31", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, attive:[0,1,2,3,4], sopratitolo:"I farmaci per sonda · sei regole", celle:FARMACI},
{id:"s32", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"I farmaci per sonda · sei regole", celle:FARMACI},

{id:"s33", tipo:"sostituzione", tema:"chiaro", sopratitolo:"Se non si può frantumare",
  da:{h:"Sbagliato", t:"«la trito lo stesso»"}, a:{h:"Corretto", t:"formulazione alternativa, e documentarlo"},
  sotto:"Si chiede al medico o al farmacista."},
{id:"s34", tipo:"figura", tema:"chiaro", sopratitolo:"Perché", illu:"farmaci", lato:"dx",
  titolo:"Una dose pensata per **dodici ore**,<br>in un colpo solo.",
  sotto:"Triturare un rilascio modificato non è una scorciatoia: è un sovradosaggio."},

{id:"s35", tipo:"raggiera", tema:"chiaro", sopratitolo:"Le complicanze", centro:"Complicanze", attive:[0], raggi:COMPL},
{id:"s36", tipo:"raggiera", tema:"chiaro", sopratitolo:"Le complicanze · mai forzare, mai mandrini", centro:"Complicanze", attive:[0,1,2], raggi:COMPL},
{id:"s37", tipo:"raggiera", tema:"chiaro", sopratitolo:"Le complicanze", centro:"Complicanze", raggi:COMPL},

{id:"s38", tipo:"catena", tema:"chiaro", sopratitolo:"La sindrome da rialimentazione · il meccanismo", passi:[
  {t:"Carboidrati", d:"dopo un lungo digiuno"}, {t:"Insulina"}, {t:"P, K, Mg", d:"entrano nelle cellule"},
  {t:"Ipofosfatemia", key:true}, {t:"Aritmie", d:"insufficienza cardiaca e respiratoria"}]},
{id:"s39", tipo:"figura", tema:"chiaro", sopratitolo:"La prevenzione", illu:"cellula", lato:"dx",
  titolo:"Rialimentare **lentamente**,<br>monitorare gli elettroliti.",
  sotto:"Correggerli prima e durante: il crollo del fosforo può arrivare fino alla morte."},
{id:"s40", tipo:"elenco", tema:"chiaro", sopratitolo:"Chi rischia · più a lungo si è digiunato, più lentamente si riparte", voci:[
  {t:"**Malnutrito grave**"}, {t:"Anoressico"}, {t:"Alcolista"}, {t:"Oncologico"}, {t:"Lungo digiuno post-operatorio"}]},

{id:"s41", tipo:"figura", tema:"chiaro", sopratitolo:"La PEG", illu:"peg",
  titolo:"**Sterile** nelle prime 24–48 ore,<br>poi gestione **pulita**.",
  sotto:"A stomia matura, dopo due-tre settimane."},
{id:"s42", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"La gestione pulita", celle:[
  {n:"1", t:"**Acqua e sapone neutro**"}, {n:"2", t:"**Asciugatura** accurata"},
  {n:"3", t:"**Nessuna medicazione occlusiva** se la cute è integra"}, {n:"4", t:"**Ruotare il disco esterno**, non troppo stretto", key:true}]},
{id:"s43", tipo:"mappa", tema:"chiaro", sopratitolo:"Il disco e la misura", illu:"peg", punti:PEGPUNTI},

{id:"s44", tipo:"percorso", tema:"chiaro", sopratitolo:"Se la PEG si sfila", tappe:[
  {t:"Si sfila"}, {t:"Coprire"}, {t:"Non reinserire", d:"dispositivi diversi"}, {t:"Avvisare subito", d:"e attivare la sostituzione", key:true}]},
{id:"s45", tipo:"titolo", tema:"profondo",
  titolo:"La stomia si chiude<br>in **poche ore**.",
  sotto:"«Aspetto il turno successivo» è la risposta sbagliata."},
{id:"s46", tipo:"trappola", tema:"chiaro", sopratitolo:"Un equivoco da smontare", righe:[
  {sb:"«Ha la PEG, non può inalare»", ok:"La PEG **non protegge** dal reflusso né dalla saliva: l'igiene del cavo orale resta essenziale"}]},

{id:"s47", tipo:"norma", tema:"chiaro", sopratitolo:"La volontà della persona (lezione 1.6)",
  etichetta:"Nutrizione e idratazione artificiale", sigla:"L. 219/2017",
  testo:"Sono **trattamenti sanitari**: somministrazione di nutrienti mediante dispositivi medici."},
{id:"s48", tipo:"tre", tema:"chiaro", sopratitolo:"Ne consegue", box:[
  {n:"1", t:"**Consenso** informato"},
  {n:"2", t:"**Rifiuto** o interruzione", d:"dalla persona capace"},
  {n:"3", t:"**DAT**", d:"disposizioni anticipate", key:true}]},
{id:"s49", tipo:"figura", tema:"chiaro", sopratitolo:"Demenza avanzata in fase terminale", illu:"persona",
  titolo:"Nessun beneficio dimostrato<br>della nutrizione enterale.",
  sotto:"Su sopravvivenza e lesioni da pressione. Torna nel modulo 11, sul fine vita."},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione",
  titolo:"3.5 Idratazione e bilancio idrico", sottotitolo:"Entrate, uscite, elettroliti:<br>che cosa si misura e che cosa si stima",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
