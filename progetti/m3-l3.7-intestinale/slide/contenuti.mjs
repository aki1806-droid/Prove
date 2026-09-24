// Contenuto delle 50 scene della lezione 3.7 — eliminazione intestinale,
// dolore e sonno. Illustrazioni nuove: la pompa PCA con il pulsante, la luna
// sul letto; la fascia diventa la scala di Bristol.

const BRISTOL = [
 {a:3, t:"Stipsi", d:"tipi 1 – 2"},
 {da:3, a:5, t:"Normale", d:"tipi 3 – 4", key:true},
 {da:5, t:"Diarrea", d:"tipi 5 – 7"},
];
const STIPSI = [
 {t:"Immobilità"}, {t:"Liquidi e fibre", d:"pochi"}, {t:"Oppioidi", d:"e anticolinergici, ferro, Ca-antagonisti", key:true},
 {t:"Privacy", d:"la padella in camera a quattro letti"},
];
const INTERV = [
 {n:"1", t:"**Liquidi**"}, {n:"2", t:"**Fibre** — solo con idratazione adeguata"}, {n:"3", t:"**Mobilizzazione**"},
 {n:"4", t:"**Orario regolare** dopo colazione: riflesso gastrocolico"},
 {n:"5", t:"**Seduti, piedi rialzati** — raddrizza l'angolo ano-rettale", key:true},
 {n:"6", t:"**Privacy**"}, {n:"7", t:"**Lassativi su prescrizione** — osmotici, stimolanti, emollienti"},
];
const FECAL = [
 {x:150, y:230, t:"Massa nel retto", d:"feci indurite"},
 {x:120, y:60, t:"Diarrea paradossa", d:"feci liquide che filtrano intorno: sembra diarrea", key:true},
 {x:60, y:200, t:"L'errore", d:"trattarla con un antidiarroico"},
];
const CDIFF = [
 {n:"1", t:"**Acqua e sapone** — il gel non uccide le spore", key:true}, {n:"2", t:"**Precauzioni da contatto**, stanza singola"},
 {n:"3", t:"**Cloro** — disinfezione sporicida"}, {n:"4", t:"**Attrezzature dedicate**"},
 {n:"5", t:"**Niente antiperistaltici**"}, {n:"6", t:"Campione solo se feci **non formate**"},
];
const PQRST = [
 {n:"P", t:"**Provocazione** — che cosa lo provoca, che cosa lo allevia"},
 {n:"Q", t:"**Qualità** — trafittivo, urente, sordo, crampiforme"},
 {n:"R", t:"**Irradiazione** — dove si irradia"},
 {n:"S", t:"**Severità** — con la scala adatta alla persona", key:true},
 {n:"T", t:"**Tempo** — quando è iniziato, continuo o intermittente"},
];
const TIPI = [
 {n:"1", t:"**Nocicettivo somatico** — ben localizzato"}, {n:"2", t:"**Nocicettivo viscerale** — sordo, mal localizzato"},
 {n:"3", t:"**Neuropatico** — bruciore, scossa, formicolio: risponde poco agli analgesici"},
 {n:"4", t:"**Breakthrough pain** — picchi nonostante la terapia di base: oncologico", key:true},
];
const OMS = [
 {t:"1° gradino", d:"non oppioidi ± adiuvanti"}, {t:"2° gradino", d:"oppioidi deboli ± non oppioidi ± adiuvanti"},
 {t:"3° gradino", d:"oppioidi forti ± non oppioidi ± adiuvanti", key:true},
];
const BISOGNO = [
 {n:"1", t:"**Farmaco**"}, {n:"2", t:"**Dose**"}, {n:"3", t:"**Via**"},
 {n:"4", t:"**Condizione** — «se NRS > 4»", key:true}, {n:"5", t:"**Intervallo minimo** fra le dosi"}, {n:"6", t:"**Dose massima** nelle 24 ore"},
];
const SONNO = [
 {n:"1", t:"**Raggruppare** le attività notturne — la pressione alle tre?", key:true}, {n:"2", t:"**Rumore e luce** ridotti: voci basse, allarmi gestiti"},
 {n:"3", t:"**Luce naturale** di giorno"}, {n:"4", t:"**Pisolini** diurni limitati"},
 {n:"5", t:"Niente **caffeina** serale"}, {n:"6", t:"**Dolore e nicturia** controllati — diuretico al mattino"},
 {n:"7", t:"I **rituali** della persona"},
];
const MEMO = [
 {n:"1", t:"**Bristol 3–4** normale"}, {n:"2", t:"Oppioidi → **lassativo dal primo giorno**"},
 {n:"3", t:"**Diarrea paradossa** = fecaloma"}, {n:"4", t:"C. difficile → **acqua e sapone**"},
 {n:"5", t:"Il dolore si **rileva e registra**, per legge"}, {n:"6", t:"Al bisogno: prescrizione **completa** e **rivalutazione**"},
 {n:"7", t:"PCA: **preme solo il paziente**", key:true}, {n:"8", t:"Il sonno si protegge **organizzando la notte**"},
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 3 · Bisogni fondamentali, comfort e assistenza di base avanzata",
  titolo:"Eliminazione intestinale,<br>dolore e sonno", sottotitolo:"3.7 · Tre bisogni in cui il ricovero peggiora le cose, e l'infermiere ha margine",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"icone", tema:"chiaro", sopratitolo:"Micro-lezione 7 di 8 · tre bisogni", voci:[
  {icona:"colon", t:"Alvo", d:"stipsi, fecaloma, diarrea"}, {icona:"mani", t:"Dolore", d:"si rileva, si descrive, si tratta"}, {icona:"luna", t:"Sonno", d:"si protegge organizzando la notte", key:true}]},
{id:"s03", tipo:"frase", tema:"chiaro", sopratitolo:"Il filo comune",
  testo:"Tutti e tre sono **fattori scatenanti del delirium** nell'anziano: curarli bene previene molto altro."},

{id:"s04", tipo:"cifre", tema:"chiaro", sopratitolo:"L'alvo normale · un intervallo ampio", voci:[
  {n:3, suf:" al giorno", t:"da"}, {n:3, suf:" a settimana", t:"a", d:"dipende dalla persona", key:true}]},
{id:"s05", tipo:"fascia", tema:"chiaro", sopratitolo:"La scala di Bristol · sette tipi", min:1, max:8, uguali:true, classi:BRISTOL},
{id:"s06", tipo:"sostituzione", tema:"chiaro", sopratitolo:"Registrare",
  da:{h:"Un'impressione", t:"«alvo presente»"}, a:{h:"Un dato", t:"«Bristol 6, tre scariche»"},
  sotto:"La differenza fra le due frasi è la differenza fra un'impressione e un'osservazione."},

{id:"s07", tipo:"raggiera", tema:"chiaro", sopratitolo:"La stipsi · frequentissima nel ricoverato", centro:"Stipsi", attive:[0,1,2], raggi:STIPSI},
{id:"s08", tipo:"raggiera", tema:"chiaro", sopratitolo:"E un fattore che si dimentica", centro:"Stipsi", raggi:STIPSI},

{id:"s09", tipo:"confronto", tema:"chiaro", sopratitolo:"Oppioidi · un punto che i quiz chiedono", col:[
  {h:"Tolleranza sì", t:"Alla **nausea**, alla **sedazione**: passano"},
  {h:"Tolleranza no", t:"Alla **stipsi**: dura per tutta la terapia"}]},
{id:"s10", tipo:"titolo", tema:"profondo",
  titolo:"Con l'oppioide, lassativo<br>**dal primo giorno**.",
  sotto:"Su prescrizione. Non si aspetta che la stipsi compaia."},

{id:"s11", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, attive:[0,1,2,3], sopratitolo:"Gli interventi sulla stipsi", celle:INTERV},
{id:"s12", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Gli interventi sulla stipsi", celle:INTERV},
{id:"s13", tipo:"trappola", tema:"chiaro", sopratitolo:"Un'avvertenza sui lassativi", righe:[
  {sb:"Formanti massa nell'immobile poco idratato", ok:"**Controindicati**: senza acqua, la massa che dovrebbe aiutare diventa un tappo"}]},

{id:"s14", tipo:"mappa", tema:"chiaro", sopratitolo:"Il fecaloma · il segno che inganna", illu:"colon", punti:FECAL},
{id:"s15", tipo:"confronto", tema:"chiaro", sopratitolo:"Nell'anziano, due quadri che sembrano altro", col:[
  {h:"Confusione", t:"Il fecaloma può presentarsi così"},
  {h:"Ritenzione urinaria", t:"O così. Si conferma con l'**esplorazione rettale**"}]},
{id:"s16", tipo:"trappola", tema:"chiaro", sopratitolo:"La rimozione manuale", righe:[
  {sb:"Rimuovere senza guardare il polso", ok:"Secondo indicazione e con cautela: la **stimolazione vagale** può dare **bradicardia**. Si controlla il polso, ci si ferma se cala"}]},

{id:"s17", tipo:"cifre", tema:"chiaro", sopratitolo:"Il clistere evacuativo · Sims o laterale sinistra (lezione 3.2)", voci:[
  {n:7, suf:"–10 cm", t:"la sonda", d:"lubrificata, verso l'ombelico"}, {n:37, suf:" °C", t:"il liquido", d:"a temperatura corporea", key:true}]},
{id:"s18", tipo:"cifre", tema:"chiaro", sopratitolo:"Il clistere evacuativo · lento; se crampi, fermarsi e abbassare", voci:[
  {n:30, suf:"–45 cm", t:"il contenitore", d:"sopra l'ano: più in alto, troppo rapido", key:true}, {n:5, suf:"–15 min", t:"trattenere"}]},
{id:"s19", tipo:"elenco", tema:"chiaro", sopratitolo:"Controindicazioni · un clistere non è mai un gesto innocuo", voci:[
  {t:"**Addome acuto**"}, {t:"Chirurgia colorettale recente"}, {t:"Grave neutropenia"}, {t:"Grave piastrinopenia"}]},

{id:"s20", tipo:"tre", tema:"chiaro", sopratitolo:"La diarrea · ≥ 3 scariche non formate in 24 ore · tre rischi", box:[
  {n:"1", t:"Disidratazione"}, {n:"2", t:"Perdita di **potassio**"},
  {n:"3", t:"Dermatite da incontinenza", d:"distinta dalla lesione da pressione: detergenti delicati, barriera", key:true}]},
{id:"s21", tipo:"raggiera", tema:"chiaro", sopratitolo:"Le cause, oltre alle infezioni", centro:"Diarrea", raggi:[
  {t:"Antibiotici", key:true}, {t:"Enterale", d:"lezione 3.4"}, {t:"Farmaci"}, {t:"Fecaloma", d:"la paradossa"}]},

{id:"s22", tipo:"trappola", tema:"chiaro", sopratitolo:"Clostridioides difficile · diarrea durante o dopo antibiotici", righe:[
  {sb:"«Mi frizione le mani con il gel»", ok:"Il gel alcolico **non uccide le spore**"}]},
{id:"s23", tipo:"titolo", tema:"profondo",
  titolo:"Per il C. difficile:<br>**acqua e sapone**.",
  sotto:"Rimuovono meccanicamente le spore. Il gel, qui, non basta."},
{id:"s24", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Le precauzioni (modulo 4)", celle:CDIFF},

{id:"s25", tipo:"norma", tema:"chiaro", sopratitolo:"Il dolore · obbligo",
  etichetta:"Cure palliative e terapia del dolore", sigla:"L. 38/2010",
  testo:"La **rilevazione del dolore** — caratteristiche, evoluzione, tecnica antalgica, risultato — va **in cartella clinica**."},
{id:"s26", tipo:"frase", tema:"chiaro", sopratitolo:"Il principio (lezione 2.3)",
  testo:"Il dolore è ciò che la persona **dice che è**. Non un'opinione dell'operatore."},

{id:"s27", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, attive:[0,1], sopratitolo:"Descriverlo · PQRST", celle:PQRST},
{id:"s28", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Una descrizione così orienta più di un numero da solo", celle:PQRST},

{id:"s29", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, attive:[0,1,2], sopratitolo:"I tipi di dolore", celle:TIPI},
{id:"s30", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"I tipi di dolore · acuto e cronico", celle:TIPI},

{id:"s31", tipo:"scala", tema:"chiaro", sopratitolo:"La scala analgesica dell'OMS", gradini:OMS},
{id:"s32", tipo:"scala", tema:"chiaro", sopratitolo:"Gli adiuvanti si aggiungono a ogni gradino, soprattutto nel neuropatico (modulo 5)", gradini:OMS},

{id:"s33", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, attive:[0,1,2,3], sopratitolo:"La terapia al bisogno · la prescrizione completa", celle:BISOGNO},
{id:"s34", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"«Al bisogno» e basta non è eseguibile in sicurezza", celle:BISOGNO},
{id:"s35", tipo:"cifre", tema:"chiaro", sopratitolo:"Rivalutare al momento dell'effetto atteso · senza, il processo non è chiuso", voci:[
  {n:15, suf:"–30 min", t:"via endovenosa"}, {n:30, suf:"–60 min", t:"via orale", key:true}]},

{id:"s36", tipo:"figura", tema:"chiaro", sopratitolo:"La PCA · analgesia controllata dal paziente", illu:"pca",
  titolo:"Un **bolo** a ogni pressione,<br>un **lockout**, una dose massima.",
  sotto:"Durante l'intervallo di blocco le pressioni non hanno effetto."},
{id:"s37", tipo:"titolo", tema:"profondo",
  titolo:"Solo il paziente<br>**preme il pulsante**.",
  sotto:"Se è sedato non preme, e il sistema si protegge da solo. Se preme un familiare, la protezione salta."},
{id:"s38", tipo:"sostituzione", tema:"chiaro", sopratitolo:"La sorveglianza",
  da:{h:"Tardi", t:"la depressione respiratoria"}, a:{h:"Prima", t:"la sedazione"},
  sotto:"La sedazione compare prima: è il segnale da cogliere. Naloxone disponibile."},

{id:"s39", tipo:"raggiera", tema:"chiaro", sopratitolo:"Accanto ai farmaci · competenza autonoma", centro:"Senza farmaci", raggi:[
  {t:"Posizione"}, {t:"Caldo, freddo", d:"su indicazione"}, {t:"Distrazione"}, {t:"Rilassamento", d:"e respirazione"}, {t:"Informazione", key:true}]},
{id:"s40", tipo:"frase", tema:"tenue", sopratitolo:"E l'informazione",
  testo:"Un dolore che si capisce fa **meno paura**, e la paura amplifica il dolore. Spiegare è già un analgesico."},

{id:"s41", tipo:"raggiera", tema:"chiaro", sopratitolo:"Il sonno · l'ospedale è uno dei posti peggiori in cui dormire", centro:"La notte", raggi:[
  {t:"Rumore", d:"e allarmi"}, {t:"Luce"}, {t:"Attività", d:"parametri, terapie, prelievi", key:true}, {t:"Dolore"}, {t:"Nicturia"}, {t:"Ansia", d:"stanza sconosciuta"}]},
{id:"s42", tipo:"catena", tema:"chiaro", sopratitolo:"La privazione di sonno non è un disagio", passi:[
  {t:"Poco sonno"}, {t:"Delirium", d:"e cadute"}, {t:"Guarigione lenta", d:"chi non dorme guarisce più piano", key:true}]},

{id:"s43", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, attive:[0,1], sopratitolo:"L'igiene del sonno · quasi tutto organizzativo", celle:SONNO},
{id:"s44", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"L'igiene del sonno · quasi tutto organizzativo", celle:SONNO},

{id:"s45", tipo:"trappola", tema:"chiaro", sopratitolo:"Gli ipnotici nell'anziano", righe:[
  {sb:"«Non dorme: benzodiazepina»", ok:"Più **cadute, delirium, sedazione diurna**. Vengono **dopo** gli interventi non farmacologici, non prima"}]},
{id:"s46", tipo:"figura", tema:"tenue", sopratitolo:"Se l'ipnotico al bisogno si dà", illu:"luna", lato:"dx",
  titolo:"Si alza la **sorveglianza**<br>sul rischio di caduta.",
  sotto:"Ricordi la lezione 3.1."},

{id:"s47", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, attive:[0,1,2,3], sopratitolo:"Ricapitoliamo", celle:MEMO},
{id:"s48", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, attive:[0,1,2,3,4,5,6], sopratitolo:"Ricapitoliamo", celle:MEMO},
{id:"s49", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Ricapitoliamo · e il sonno si protegge organizzando la notte", celle:MEMO},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione",
  titolo:"3.8 Riepilogo del Modulo 3", sottotitolo:"Otto lezioni ricomposte,<br>e l'autovalutazione",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
