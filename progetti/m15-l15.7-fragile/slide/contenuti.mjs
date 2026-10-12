// Contenuto delle 50 scene della lezione 15.7 — l'anziana fragile: delirium,
// caduta e dimissione protetta. La notte è un percorso di tre orari; la rete
// veneta un percorso che si accende dalla COT al setting; la lettera, la
// prevenzione si riempiono a scalare; errori e
// risposta modello stanno in tabella.

const NOTTE = (att, k) => ({tipo:"percorso", tema:"chiaro", tappe:[
  {t:"Ore 22", d:"lorazepam al bisogno", key:k===0},
  {t:"Ore 23", d:"agitata, vuole tornare a casa, si strappa la cannula", key:k===1},
  {t:"Ore 3", d:"a terra accanto al letto, sponde alzate", key:k===2}], attive:att});

const RETE = (att, k) => ({tipo:"percorso", tema:"chiaro", tappe:[
  {t:"Segnalazione precoce", d:"alla COT, secondo procedura", key:k===0},
  {t:"UVMD", d:"valutazione multidimensionale con la SVaMA", key:k===1},
  {t:"Riabilitazione", d:"URT o Ospedale di Comunità", key:k===2},
  {t:"Domicilio", d:"ADI, SAD, impegnativa di cura domiciliare, centro diurno", key:k===3},
  {t:"Centro di Servizi", d:"se il bisogno non è gestibile a casa", key:k===4}], attive:att});

const LETTERA = (att) => ({tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, celle:[
  {t:"**Autonomia** · Barthel"}, {t:"**Mobilità** e ausili"}, {t:"**Precauzioni** per la protesi"},
  {t:"**Delirium serale** · che cosa la calma", key:true}, {t:"**Rischio di caduta** e misure adottate"}, {t:"**Cute** · talloni"},
  {t:"**Alimentazione**, idratazione, continenza"}, {t:"**Terapia** · benzodiazepina sospesa?"}, {t:"**Rete familiare** · educazione alla figlia"}],
  attive:att});

const PREVENZIONE = (att) => ({tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, celle:[
  {t:"All'ingresso: rischio di **caduta**"}, {t:"All'ingresso: rischio di **delirium**"},
  {t:"Misure non farmacologiche **dal primo giorno**"}, {t:"**Niente** benzodiazepine al bisogno"},
  {t:"**Letto basso** invece delle sponde"}, {t:"Bagno **programmato**"},
  {t:"**Familiari** coinvolti"}, {t:"Segnalazione **precoce** della dimissione"}], attive:att});

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 15 · Casi clinici integrati",
  titolo:"L'anziana<br>fragile", sottotitolo:"15.7 · Delirium, caduta e dimissione protetta",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"tre", tema:"chiaro", sopratitolo:"Micro-lezione 7 di 12 · il caso più veneto del modulo", box:[
  {n:"Notte", t:"Un delirium"}, {n:"Ore 3", t:"Una caduta", key:true},
  {n:"Dimissione", t:"La rete della non autosufficienza"}]},
{id:"s03", tipo:"tre", tema:"chiaro", sopratitolo:"«E adesso, dove va la mamma?» · le lezioni che servono", box:[
  {n:"3.1", t:"Cadute", d:"e contenzione"}, {n:"9.6", t:"Femore", d:"la frattura"},
  {n:"11.1", t:"Delirium", d:"e farmaci"}, {n:"11.2", t:"Demenza"},
  {n:"13.5", t:"La rete", d:"non autosufficienza", key:true}]},

{id:"s04", tipo:"cifre", tema:"chiaro", sopratitolo:"Lo scenario · la signora Elena", voci:[
  {n:"86", suf:"anni", t:"demenza lieve", d:"vive **sola** · la figlia abita vicino e lavora", key:true},
  {n:"2", suf:"giorni", t:"in Medicina", d:"ricoverata per una **pielonefrite**"}]},
{id:"s05", tipo:"icone", tema:"chiaro", sopratitolo:"La terapia in corso", voci:[
  {icona:"flebo", t:"Antibiotico EV"},
  {icona:"pillola", t:"Anticoagulante orale diretto", d:"per fibrillazione atriale", key:true},
  {icona:"luna", t:"Lorazepam al bisogno", d:"per l'insonnia · dato alle 22", key:true}]},
{id:"s06", sopratitolo:"La notte · che cosa fai, prima di tutto?", ...NOTTE([0,1,2], 2)},

{id:"s07", tipo:"elenco", tema:"chiaro", sopratitolo:"Dopo la caduta · non sollevarla subito", numerato:true, voci:[
  {t:"Chiamare **aiuto**, non lasciarla sola"},
  {t:"**Non** sollevarla prima della valutazione"},
  {t:"**ABC**, coscienza con la **GCS**, pupille"},
  {t:"**Trauma cranico**? ferite, ematomi"}]},
{id:"s08", tipo:"corpo", tema:"chiaro", sopratitolo:"Dolore e deformità · poi parametri, glicemia, e avvisare il medico", lato:"fronte", voci:[
  {z:"gambe", t:"Arto inferiore destro **accorciato** ed **extraruotato**", key:true},
  {z:"perineo", t:"Dolore all'**inguine**"},
  {z:"addome", t:"Sospetta **frattura del femore**", d:"il quadro tipico"}]},

{id:"s09", tipo:"figura", tema:"chiaro", sopratitolo:"Il dettaglio che cambia la priorità", illu:"farmaci",
  titolo:"Assume un<br>**anticoagulante**.", sotto:"E non ricorda se ha battuto la testa."},
{id:"s10", tipo:"cranio", tema:"chiaro", sopratitolo:"Dopo una caduta, in terapia anticoagulante", massa:56,
  titolo:"Rischio di emorragia intracranica", voci:["Trauma cranico **lieve**", "o **non riferito**", "**Anche ore dopo**"]},
{id:"s11", tipo:"tre", tema:"chiaro", sopratitolo:"Protocollo: valutazione medica e TC · sorveglianza neurologica ravvicinata", box:[
  {n:"1", t:"GCS", key:true}, {n:"2", t:"Pupille"}, {n:"3", t:"Segni di lato"}, {n:"4", t:"Cefalea"}, {n:"5", t:"Vomito"}]},

{id:"s12", tipo:"icone", tema:"chiaro", sopratitolo:"Immobilizzare l'arto, poi sollevarla", voci:[
  {icona:"persone", t:"Più operatori"}, {icona:"telo", t:"Telo ad alto scorrimento"},
  {icona:"sollevatore", t:"Sollevatore", key:true}, {icona:"flebo", t:"Analgesia", d:"secondo prescrizione · nuovo accesso venoso"}]},
{id:"s13", tipo:"catena", tema:"chiaro", sopratitolo:"Segnalare, documentare, informare", passi:[
  {t:"**Incident reporting**", d:"caduta con danno", key:true},
  {t:"**Documentare**", d:"ora, circostanze, valutazione, interventi"},
  {t:"**Informare** la figlia"}]},
{id:"s14", tipo:"norma", tema:"chiaro", etichetta:"Raccomandazione ministeriale", sigla:"N. 13",
  testo:"Prevenzione e gestione della **caduta** in ospedale."},

{id:"s15", tipo:"tre", tema:"chiaro", sopratitolo:"Perché è caduta? · un delirium iperattivo su demenza, con la CAM", box:[
  {n:"1", t:"Esordio acuto"}, {n:"2", t:"Andamento fluttuante"}, {n:"3", t:"Disattenzione", key:true}]},
{id:"s16", tipo:"raggiera", tema:"chiaro", sopratitolo:"I fattori · la benzodiazepina è potenzialmente inappropriata (lezione 11.1)", centro:"Delirium",
  raggi:[{t:"Infezione"}, {t:"Ambiente"}, {t:"Notte"}, {t:"Dolore?"}, {t:"Urgenza"}, {t:"Lorazepam", key:true}]},
{id:"s17", tipo:"figura", tema:"chiaro", sopratitolo:"Le sponde alzate, in una persona agitata", illu:"sponde", lato:"dx",
  titolo:"Non impediscono<br>la caduta.", sotto:"La fanno avvenire **scavalcandole**: da più in alto, con più danno."},

{id:"s18", tipo:"trappola", tema:"chiaro", sopratitolo:"Al mattino, la figlia spaventata", righe:[
  {sb:"«Legatela di notte»", ok:"La contenzione **non previene** le cadute: aumenta agitazione, lesioni e delirium · lezione 3.1"}]},
{id:"s19", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Spiegare con empatia · le alternative", celle:[
  {t:"**Letto basso**", key:true}, {t:"**Materassino** a terra"}, {t:"**Sensori**"}, {t:"**Sorveglianza**"},
  {t:"Bagno **programmato**"}, {t:"**Luce** notturna"}, {t:"**Oggetti** personali"}]},
{id:"s20", tipo:"icone", tema:"chiaro", sopratitolo:"La figlia diventa un'alleata, non una spettatrice", voci:[
  {icona:"persone", t:"Presenza di un familiare", d:"quando è possibile", key:true},
  {icona:"farmaci", t:"Revisione della terapia sedativa", d:"con il medico"}]},

{id:"s21", tipo:"cifre", tema:"chiaro", sopratitolo:"Frattura del collo del femore · si attiva il percorso ortopedico", voci:[
  {n:"48", suf:"ore", t:"intervento entro", d:"l'indicatore di qualità della lezione 9.6", key:true}]},
{id:"s22", tipo:"griglia", tema:"chiaro", colonne:4, spunta:true, sopratitolo:"Anticoagulante secondo indicazione · l'approccio ortogeriatrico", celle:[
  {t:"Occhiali e **apparecchi**"}, {t:"**Orientamento**"}, {t:"**Dolore** controllato"}, {t:"**Idratazione**"},
  {t:"**Alvo**"}, {t:"**Sonno**"}, {t:"**Talloni** protetti", key:true}, {t:"**Nutrizione**"}]},

{id:"s23", tipo:"icone", tema:"chiaro", sopratitolo:"Quinta giornata · protesi parziale d'anca", voci:[
  {icona:"deambulatore", t:"Deambulatore", d:"solo con assistenza"},
  {icona:"orologio", t:"Orientata di giorno", d:"a tratti confusa la sera"},
  {icona:"casa", t:"Vive sola", d:"la figlia lavora", key:true}]},
{id:"s24", tipo:"frase", tema:"chiaro", sopratitolo:"Oggi non può rientrare a casa in sicurezza",
  testo:"Serve una **dimissione protetta**.", sotto:"Andava pensata, e segnalata, fin dai primi giorni."},

{id:"s25", sopratitolo:"Il percorso nella rete veneta · lezione 13.5", ...RETE([0,1], 1)},
{id:"s26", sopratitolo:"Con la figlia, il MMG e l'assistente sociale · per recuperare autonomia", ...RETE([0,1,2], 2)},
{id:"s27", sopratitolo:"Poi casa, oppure un Centro di Servizi", ...RETE([0,1,2,3,4], 3)},

{id:"s28", sopratitolo:"La lettera infermieristica · la persona, non solo la frattura", ...LETTERA([0,1,2])},
{id:"s29", sopratitolo:"Un'informazione preziosa per chi la accoglie", ...LETTERA([0,1,2,3,4,5])},
{id:"s30", sopratitolo:"La lettera infermieristica · la riconciliazione", ...LETTERA([0,1,2,3,4,5,6,7,8])},

{id:"s31", sopratitolo:"La prevenzione · che cosa si poteva fare", ...PREVENZIONE([0,1,2,3])},
{id:"s32", sopratitolo:"Nessuna è costosa, tutte sono infermieristiche", ...PREVENZIONE([0,1,2,3,4,5,6,7])},

{id:"s33", tipo:"tabella", tema:"chiaro", sopratitolo:"Gli errori da evitare · la notte", colonne:["50%","50%"],
  intestazioni:["Errore", "Invece"], righe:[
  ["no:Sollevarla subito", "prima la **valutazione**"],
  ["no:Dimenticare l'anticoagulante", "**sorveglianza neurologica**"],
  ["no:Non segnalare l'evento", "**incident reporting**"]], chiave:[1]},
{id:"s34", tipo:"tabella", tema:"chiaro", sopratitolo:"Gli errori da evitare · dopo", colonne:["50%","50%"],
  intestazioni:["Errore", "Invece"], righe:[
  ["no:Confusione = «demenza»", "riconoscere il **delirium**"],
  ["no:Contenzione: un sì, o un no secco", "le **alternative**, spiegate"],
  ["no:Dimissione pensata il giorno prima", "segnalazione **precoce**"]], chiave:[0]},

{id:"s35", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Parlare con una persona in delirium · anche questa è cura", celle:[
  {n:"1", t:"Avvicinarsi **di fronte**"}, {n:"2", t:"Presentarsi **ogni volta**"}, {n:"3", t:"Chiamarla **per nome**"},
  {n:"4", t:"Frasi **brevi**", key:true}, {n:"5", t:"Una richiesta **alla volta**"}, {n:"6", t:"Tono **calmo**"}]},
{id:"s36", tipo:"sostituzione", tema:"chiaro", sopratitolo:"I contenuti del delirium",
  da:{h:"Non", t:"contraddire, discutere"}, a:{h:"Ma", t:"riconoscere l'**emozione**"},
  sotto:"«Capisco che vuole tornare a casa» · poi riorientare con delicatezza: dove siamo, che ora è"},
{id:"s37", tipo:"icone", tema:"chiaro", sopratitolo:"Di notte, e nei giorni dopo", voci:[
  {icona:"lampada", t:"Meno rumori e luci forti"}, {icona:"fotografia", t:"Oggetti familiari e foto"},
  {icona:"persone", t:"La presenza di un familiare", d:"calma più di qualsiasi farmaco", key:true}]},

{id:"s38", tipo:"tre", tema:"chiaro", sopratitolo:"D1 · «Come distingue un delirium da una demenza?» · il delirium", box:[
  {n:"1", t:"Esordio acuto"}, {n:"2", t:"Decorso fluttuante"}, {n:"3", t:"Attenzione compromessa", key:true},
  {n:"4", t:"Spesso reversibile", d:"se si tratta la causa"}]},
{id:"s39", tipo:"venn", tema:"chiaro", sopratitolo:"D1 · la demenza: attenzione conservata nelle fasi iniziali · poi D2",
  sx:{t:"Delirium", d:"esordio **acuto**, decorso fluttuante"},
  dx:{t:"Demenza", d:"esordio **insidioso**, decorso progressivo"},
  centro:"possono **coesistere**"},
{id:"s40", tipo:"catena", tema:"chiaro", sopratitolo:"D2 · «Che cosa fa quando trova un paziente caduto?»", passi:[
  {t:"**Non** sollevarlo subito", key:true}, {t:"Coscienza, parametri, **glicemia**", d:"trauma cranico, frattura"},
  {t:"**Aiuto** e medico"}, {t:"**Anticoagulante**?"}, {t:"**Ausili**, documentare, segnalare"}]},
{id:"s41", tipo:"norma", tema:"chiaro", etichetta:"D3 · Unità di Valutazione Multidimensionale Distrettuale", sigla:"UVMD",
  testo:"Valuta la persona con bisogni complessi, con la **SVaMA**: progetto individuale e accesso ai servizi."},

{id:"s42", tipo:"citazione", tema:"chiaro", sopratitolo:"La risposta modello · 1",
  testo:"Anziana con demenza lieve, in terapia **anticoagulante** e con **benzodiazepina serale**, che in corso di infezione presenta delirium iperattivo e cade **scavalcando le sponde**.",
  fonte:"Chi è · che cosa è successo"},
{id:"s43", tipo:"tabella", tema:"chiaro", sopratitolo:"La risposta modello · 2", colonne:["28%","72%"],
  intestazioni:["Passo", "Che cosa scrivo"], righe:[
  ["Sospetto", "frattura di femore · rischio di **emorragia intracranica**"],
  ["Prima", "**non** la sollevo subito"],
  ["Valuto", "ABC, coscienza, pupille, trauma cranico, dolore, parametri, glicemia"]], chiave:[1]},
{id:"s44", tipo:"tabella", tema:"chiaro", sopratitolo:"La risposta modello · 3", colonne:["28%","72%"],
  intestazioni:["Passo", "Che cosa scrivo"], righe:[
  ["Chiamo", "aiuto e il **medico**"],
  ["Mobilizzo", "arto immobilizzato · più operatori e **ausili**"],
  ["Collaboro", "analgesia secondo prescrizione · **sorveglianza neurologica** · TC"]], chiave:[2]},
{id:"s45", tipo:"tabella", tema:"chiaro", sopratitolo:"La risposta modello · 4", colonne:["28%","72%"],
  intestazioni:["Passo", "Che cosa scrivo"], righe:[
  ["Segnalo", "l'evento · la benzodiazepina come fattore di rischio"],
  ["Comunico", "con la figlia: **alternative** alla contenzione"],
  ["Prevengo", "delirium · lesioni dei talloni"],
  ["Avvio presto", "la dimissione protetta: **COT** e **UVMD**"]], chiave:[3]},

{id:"s46", tipo:"tre", tema:"chiaro", sopratitolo:"I collegamenti", box:[
  {n:"3.1", t:"Cadute e contenzione"}, {n:"2.6", t:"Raccomandazione 13", d:"e incident reporting"},
  {n:"9.6", t:"Frattura di femore", key:true}]},
{id:"s47", tipo:"tre", tema:"chiaro", sopratitolo:"I collegamenti", box:[
  {n:"11.1", t:"Delirium", d:"e farmaci inappropriati"}, {n:"11.2", t:"Demenza"},
  {n:"13.5", t:"La rete", d:"non autosufficienza", key:true}, {n:"9.7 · 11.7", t:"Dimissione protetta"}]},

{id:"s48", tipo:"titolo", tema:"profondo",
  titolo:"Le sponde non fermano<br>chi vuole alzarsi:<br>lo fanno cadere **da più in alto**.",
  sotto:"La sicurezza si costruisce con la presenza e l'organizzazione, non con le barriere."},

{id:"s49", tipo:"tre", tema:"chiaro", sopratitolo:"Nella prossima lezione · alle sei del mattino, sudato e tremante", box:[
  {n:"1", t:"Insulina"}, {n:"2", t:"Ipoglicemia", key:true}, {n:"3", t:"Piede diabetico"}, {n:"4", t:"Educazione"}]},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione · 15.8",
  titolo:"Il paziente<br>diabetico", sottotitolo:"Ipoglicemia, insulina e piede",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
