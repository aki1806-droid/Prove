// Contenuto delle 50 scene della lezione 3.8 — riepilogo del modulo 3.
// Niente contenuti nuovi: il modulo ricomposto in sequenze, numeri, confusioni,
// regole, casi e bundle. Due corpi nuovi: l'anello delle sette lezioni, con
// l'illustrazione di ciascuna, e i gesti, la fila di riquadri illustrati che
// racconta una sequenza in ordine.

const LEZIONI = [
 {n:"3.1", t:"Igiene e sicurezza", illu:"occhio"},
 {n:"3.2", t:"Mobilità", illu:"gambe"},
 {n:"3.3", t:"Nutrizione e deglutizione", illu:"gola"},
 {n:"3.4", t:"Nutrizione per sonda", illu:"peg"},
 {n:"3.5", t:"Liquidi ed elettroliti", illu:"acqua"},
 {n:"3.6", t:"Eliminazione urinaria", illu:"catetere"},
 {n:"3.7", t:"Alvo, dolore e sonno", illu:"colon"},
];
const TERRA = [
 {t:"Non sollevare", key:true}, {t:"Valutare", d:"coscienza, respiro, dolore, deformità"}, {t:"Avvisare", d:"il medico"},
 {t:"Segnalare", d:"la scheda aziendale"}, {t:"Documentare", d:"in modo oggettivo"}, {t:"Rivalutare", d:"il rischio"},
];
const REGOLE = [
 {n:"1", t:"**Nulla per bocca** prima di verificare la deglutizione"},
 {n:"2", t:"**Potassio concentrato mai in bolo**: diluito, in pompa", key:true},
 {n:"3", t:"Dubbio sulla posizione del sondino: **non si somministra**"},
 {n:"4", t:"Sospetto di trombosi: **non si massaggia**"},
 {n:"5", t:"Contenzione solo **eccezionale, prescritta, motivata, documentata**"},
];
const VAP = [
 {n:"1", t:"Testata **30–45°**"}, {n:"2", t:"**Igiene del cavo orale**", key:true}, {n:"3", t:"Aspirazione **sub-glottica**"},
 {n:"4", t:"Controllo della **cuffia**"}, {n:"5", t:"**Interruzione quotidiana** della sedazione"},
];
const CAUTI = [
 {n:"1", t:"**Indicazione** appropriata", key:true}, {n:"2", t:"Inserimento **asettico**"}, {n:"3", t:"**Circuito chiuso**"},
 {n:"4", t:"Sacca **sotto la vescica**"}, {n:"5", t:"**Rimozione precoce**"}, {n:"6", t:"**Igiene delle mani**"},
];
const DISFAGIA = [
 {n:"1", t:"Seduto a **90°**"}, {n:"2", t:"**Capo flesso**"}, {n:"3", t:"**Boccone piccolo**"},
 {n:"4", t:"**Bocca vuota** prima del successivo", key:true}, {n:"5", t:"**30 minuti** seduto"}, {n:"6", t:"**Igiene orale** dopo il pasto"},
];
const VENETO = [
 {n:"1", t:"**Cadute**: procedura e segnalazione obbligatoria"}, {n:"2", t:"**Contenzione**: modulistica dedicata"},
 {n:"3", t:"**Screening nutrizionale** in cartella, con il Servizio di Dietetica"},
 {n:"4", t:"**Nutrizione artificiale domiciliare**: distretto, ADI, caregiver addestrato"},
 {n:"5", t:"Procedura sul **potassio concentrato**"}, {n:"6", t:"**Bundle CAUTI**: motivazione e rivalutazione quotidiana registrate", key:true},
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 3 · Bisogni fondamentali, comfort e assistenza di base avanzata",
  titolo:"Riepilogo<br>del Modulo 3", sottotitolo:"3.8 · Sette lezioni ricomposte: sequenze, numeri, confusioni, casi",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"icone", tema:"chiaro", sopratitolo:"Micro-lezione 8 di 8 · niente contenuti nuovi", voci:[
  {icona:"catena", t:"Sequenze", d:"quelle che si recitano"}, {icona:"cerchio", t:"Numeri", d:"quelli che i quiz chiedono secchi"},
  {icona:"persona", t:"Casi", d:"quelli che tornano"}, {icona:"bilancia", t:"Confusioni", d:"quelle che costano punti", key:true}]},
{id:"s03", tipo:"catena", tema:"chiaro", sopratitolo:"Fatto per essere riascoltato · ogni frase è una cosa da sapere", passi:[
  {t:"Lo studio", d:"le sette lezioni"}, {t:"Questo video", d:"subito dopo", key:true}, {t:"La settimana prima", d:"di nuovo"}, {t:"L'esame"}]},

{id:"s04", tipo:"anello", tema:"chiaro", sopratitolo:"La mappa · sette lezioni, sette bisogni", centro:"Modulo 3", sotto:"sette bisogni", attive:[0,1,2,3], voci:LEZIONI},
{id:"s05", tipo:"anello", tema:"chiaro", sopratitolo:"La mappa · sette lezioni, sette bisogni", centro:"Modulo 3", sotto:"sette bisogni", voci:LEZIONI},
{id:"s06", tipo:"confronto", tema:"chiaro", sopratitolo:"Che cosa chiede la prova pratica", col:[
  {h:"Fare o descrivere", t:"**3.1** igiene e sicurezza · **3.2** mobilità"},
  {h:"Riconoscere, senza sbagliare", t:"**3.3** – **3.7**: deglutizione, sonda, liquidi, urine, alvo, dolore, sonno"}]},

{id:"s07", tipo:"gesti", tema:"chiaro", sopratitolo:"Un solo filo · ogni gesto è anche un accertamento", voci:[
  {illu:"occhio", t:"L'igiene", d:"ispeziona la cute"}, {illu:"gola", t:"Il pasto", d:"valuta la deglutizione"},
  {illu:"circuito", t:"La sacca", d:"misura la diuresi", key:true}]},
{id:"s08", tipo:"raggiera", tema:"chiaro", sopratitolo:"E ogni bisogno lasciato indietro diventa una complicanza", centro:"Trascurato", raggi:[
  {t:"Lesione"}, {t:"Polmonite"}, {t:"Caduta"}, {t:"Infezione urinaria"}, {t:"Delirium", key:true}]},
{id:"s09", tipo:"titolo", tema:"profondo",
  titolo:"Prevenzione<br>**travestita da routine**.",
  sotto:"Chi lo tratta come routine perde la parte che vale: all'esame e in reparto."},

{id:"s10", tipo:"gesti", tema:"chiaro", sopratitolo:"Le sequenze · l'igiene", voci:[
  {illu:"acqua", t:"Dal pulito allo sporco", d:"genitali per ultimi"},
  {illu:"occhio", t:"Occhi", d:"dall'interno verso l'esterno, un lato del panno per occhio", key:true},
  {illu:"telo", t:"Perineo femminile", d:"dal pube verso l'ano"}]},
{id:"s11", tipo:"catena", tema:"chiaro", sopratitolo:"Prepuzio sempre riposizionato · e la persona trovata a terra", passi:TERRA},
{id:"s12", tipo:"bivio", tema:"chiaro", sopratitolo:"Screening della deglutizione · il cucchiaino prima del bicchiere",
  radice:"Test dell'acqua a volumi crescenti",
  rami:[{q:"negativo", t:"Si prosegue", d:"con la consistenza adatta"},
        {q:"positivo o dubbio", t:"Sospendere l'orale", d:"segnalare, attivare la logopedia", key:true}]},

{id:"s13", tipo:"gesti", tema:"chiaro", sopratitolo:"Le sequenze · il sondino naso-gastrico", voci:[
  {illu:"nex", t:"Misura NEX", d:"naso, lobo, xifoide"}, {illu:"gola", t:"Capo flesso", d:"al passaggio faringeo"},
  {illu:"ph", t:"pH ≤ 5,5", d:"mai con il solo whoosh test", key:true}]},
{id:"s14", tipo:"tre", tema:"chiaro", sopratitolo:"Le sequenze · tre gesti che i quiz chiedono", box:[
  {n:"1", t:"Alzata", d:"sempre in **due tempi**"},
  {n:"2", t:"Clistere", d:"Sims o fianco sinistro · sonda **7–10 cm** · contenitore **30–45 cm**"},
  {n:"3", t:"Catetere", d:"**non gonfiare** il palloncino prima di vedere urina", key:true}]},
{id:"s15", tipo:"confronto", tema:"chiaro", sopratitolo:"Cateterismo · calibro minimo, tecnica sterile, sistema chiuso raccordato subito", col:[
  {h:"Donna", t:"Si deterge **dall'alto verso il basso**"},
  {h:"Uomo", t:"Lubrificante in uretra, pene a **60–90°**, fino alla **biforcazione**"}]},

{id:"s16", tipo:"cifre", tema:"chiaro", sopratitolo:"I numeri · la postura", voci:[
  {n:2, suf:" h", t:"cambi a letto"}, {n:1, suf:" h", t:"in poltrona"}, {n:30, suf:"°", t:"decubito laterale", key:true},
  {n:30, suf:"–45°", t:"testata", d:"ventilato, enterale"}]},
{id:"s17", tipo:"cifre", tema:"chiaro", sopratitolo:"I numeri · dopo il pasto, e la sonda · il palloncino si sgonfia con la siringa, mai tagliando la valvola", voci:[
  {n:30, suf:"–60 min", t:"testata alta", d:"dopo l'enterale"}, {n:30, suf:" min", t:"seduto", d:"il disfagico dopo il pasto", key:true},
  {n:4, suf:"–6 sett.", t:"sondino", d:"poi la PEG"}]},
{id:"s18", tipo:"frequenze", tema:"chiaro", sopratitolo:"I numeri · il cavo orale · Bristol 3–4 normale · pH dell'aspirato ≤ 5,5", righe:[
  {t:"Autonomo", d:"almeno due volte al giorno", volte:2, q:"2 ×", qd:"al giorno"}, {t:"Non collaborante", d:"o disfagico", ogni:6, q:"4–6 h", key:true}, {t:"Intubato", d:"secondo procedura", ogni:4, q:"2–4 h"}]},

{id:"s19", tipo:"cifre", tema:"chiaro", sopratitolo:"I numeri · nutrizione e liquidi · perdite insensibili 800–1000 ml al giorno", voci:[
  {n:25, suf:"–30 kcal", t:"per chilo al giorno"}, {n:30, suf:" ml", t:"per chilo al giorno"},
  {n:"18,5", t:"BMI", d:"sotto: sottopeso", key:true}, {n:2, t:"MUST", d:"da 2 in su: rischio alto"}]},
{id:"s20", tipo:"tre", tema:"chiaro", cifre:true, sopratitolo:"I numeri · gli elettroliti, in mEq/l · il potassio governa il ritmo del cuore", box:[
  {n:"135–145", t:"Sodio"}, {n:"3,5–5", t:"Potassio", d:"intervallo stretto", key:true}, {n:"8,5–10,5", t:"Calcio"}]},
{id:"s21", tipo:"fascia", tema:"chiaro", sopratitolo:"I numeri · la diuresi in 24 ore · 0,5 ml/kg/h · un chilo, un litro", min:0, max:3400, uguali:true, classi:[
  {a:100, t:"Anuria", d:"< 100 ml"}, {da:100, a:450, t:"Oliguria", d:"< 400–500 ml"}, {da:450, t:"Normale", d:"0,5 ml/kg/h", key:true}]},
{id:"s22", tipo:"cifre", tema:"chiaro", sopratitolo:"I numeri · catetere e dolore", voci:[
  {n:12, suf:"–14 Ch", t:"calibro"}, {n:6, suf:"–8 h", t:"ripresa della minzione", d:"dopo la rimozione"},
  {n:15, suf:"–30 min", t:"rivalutare", d:"via endovenosa", key:true}, {n:30, suf:"–60 min", t:"rivalutare", d:"via orale"}]},

{id:"s23", tipo:"trappola", tema:"chiaro", sopratitolo:"Le confusioni · su cui i distrattori sono costruiti", righe:[
  {sb:"Le sponde sono sempre contenzione", ok:"Dipende dalla **finalità**"},
  {sb:"Sims è la litotomica", ok:"È la **semiprona laterale sinistra**"}]},
{id:"s24", tipo:"trappola", tema:"chiaro", sopratitolo:"Le confusioni · tre, quattro, cinque", righe:[
  {sb:"Nella disfagia i solidi sono il pericolo", ok:"I **liquidi** lo sono di più"},
  {sb:"Il whoosh test verifica la sonda", ok:"Non è **affidabile**: pH o radiografia"},
  {sb:"La PEG protegge dall'inalazione", ok:"**No**: la protezione sono le regole del pasto"}]},
{id:"s25", tipo:"confronto", tema:"chiaro", sopratitolo:"Due trappole di laboratorio", col:[
  {h:"Albumina bassa in fase acuta", t:"È **infiammazione**, non solo malnutrizione"},
  {h:"Potassio alto, campione emolizzato", t:"È un **artefatto**: si ricontrolla prima di trattare"}]},
{id:"s26", tipo:"trappola", tema:"chiaro", sopratitolo:"Le confusioni · sei, sette, otto", righe:[
  {sb:"La glucosata al 5 % espande il volume", ok:"**No**: è acqua libera, si distribuisce ovunque"},
  {sb:"Il catetere gestisce l'incontinenza", ok:"**Non è un'indicazione**"},
  {sb:"Diarrea: antidiarroico", ok:"La **paradossa** può essere un **fecaloma**"}]},
{id:"s27", tipo:"trappola", tema:"chiaro", sopratitolo:"Le confusioni · nove, dieci · dieci punti che si possono non perdere", righe:[
  {sb:"Il gel alcolico basta per il C. difficile", ok:"**Non uccide le spore**: acqua e sapone"},
  {sb:"Il bastone dal lato malato", ok:"Dal **lato sano**"}]},
{id:"s28", tipo:"sostituzione", tema:"chiaro", sopratitolo:"La più insidiosa · l'anziano disidratato",
  da:{h:"Cerco la sete", t:"e non la trovo"}, a:{h:"Guardo la confusione", t:"e il sodio che sale"},
  sotto:"Il turgore cutaneo inganna. Chi cerca la sete non la trova, e intanto il sodio sale."},

{id:"s29", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, attive:[0,1], sopratitolo:"Cinque regole di sicurezza · nessuna eccezione", celle:REGOLE},
{id:"s30", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"Cinque regole di sicurezza · nessuna eccezione", celle:REGOLE},
{id:"s31", tipo:"titolo", tema:"profondo",
  titolo:"Cinque regole,<br>**cinque risposte sempre giuste**.",
  sotto:"Se un'opzione le contraddice, è l'opzione sbagliata. Per quanto ragionevole sembri."},

{id:"s32", tipo:"percorso", tema:"chiaro", sopratitolo:"I casi · la persona trovata a terra · «lo rimetto a letto» perde la parte che vale", tappe:TERRA},
{id:"s33", tipo:"raggiera", tema:"chiaro", sopratitolo:"I casi · l'anziano che non mangia · e l'organizzazione del pasto · la causa prima del rimedio", centro:"Non mangia", raggi:[
  {t:"Bocca"}, {t:"Farmaci"}, {t:"Dolore"}, {t:"Stipsi"}, {t:"Delirium"}, {t:"Disfagia", key:true}]},
{id:"s34", tipo:"bivio", tema:"chiaro", sopratitolo:"I casi · dopo un ictus chiede acqua",
  radice:"«Ho sete, mi dia un sorso»",
  rami:[{q:"insiste, sembra crudele", t:"Un sorso d'acqua", d:"in un disfagico è una polmonite"},
        {q:"prima", t:"Lo screening", d:"poi si decide che cosa può bere", key:true}]},
{id:"s35", tipo:"figura", tema:"chiaro", sopratitolo:"I casi · la PEG sfilata", illu:"peg",
  titolo:"La stomia si chiude<br>**in poche ore**.",
  sotto:"Copro, non reinserisco dispositivi diversi, avviso subito il medico. «Aspetto il turno successivo» è la risposta sbagliata."},

{id:"s36", tipo:"numero", tema:"chiaro", sopratitolo:"I casi · anziano confuso · correzione lenta, su prescrizione", cifra:"152",
  testo:"Sodio a 152: è l'**anziano disidratato**. Bilancio, peso quotidiano, idratazione. Il sodio corretto in fretta è un danno neurologico."},
{id:"s37", tipo:"confronto", tema:"chiaro", sopratitolo:"I casi · due dispositivi", col:[
  {h:"Catetere da 5 giorni, senza motivazione", t:"Si **rivaluta** con il medico e si **rimuove**"},
  {h:"PCA e sonnolenza", t:"La **sedazione precede** la depressione respiratoria"}]},
{id:"s38", tipo:"catena", tema:"chiaro", sopratitolo:"Oppioide e sonnolenza · e il polpaccio gonfio e dolente nell'allettato: non si massaggia, si avvisa", passi:[
  {t:"Frequenza respiratoria"}, {t:"Saturazione"}, {t:"Avviso", d:"il medico", key:true}, {t:"Naloxone", d:"disponibile"}]},

{id:"s39", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"I bundle · VAP · si applica intero", celle:VAP},
{id:"s40", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"I bundle · CAUTI · si applica intero", celle:CAUTI},
{id:"s41", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"E il bundle della disfagia · non ha un nome, ha le stesse regole", celle:DISFAGIA},

{id:"s42", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, attive:[0,1,2], sopratitolo:"Gli agganci veneti del modulo", celle:VENETO},
{id:"s43", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Gli agganci veneti del modulo", celle:VENETO},
{id:"s44", tipo:"figura", tema:"chiaro", sopratitolo:"In cartella elettronica · bilancio con saldo automatico, scale di rischio, motivazione del catetere", illu:"cartella", lato:"dx",
  titolo:"All'orale, la **procedura aziendale** vale più della linea guida.",
  sotto:"Da cui deriva. Citare quella che si applica nel reparto in cui si lavorerà."},

{id:"s45", tipo:"cifre", tema:"chiaro", sopratitolo:"Come proseguire · il test del modulo · poi solo le lezioni segnalate dagli errori", voci:[
  {n:30, t:"domande"}, {n:21, t:"la soglia", key:true}]},
{id:"s46", tipo:"percorso", tema:"chiaro", sopratitolo:"Due casi di oggi scritti per intero · lo schema della lezione 2.1", tappe:[
  {t:"Dati"}, {t:"Problema"}, {t:"Obiettivo"}, {t:"Interventi", key:true}, {t:"Valutazione"}]},
{id:"s47", tipo:"gesti", tema:"chiaro", sopratitolo:"Un consiglio sul metodo", voci:[
  {illu:"bocca", t:"Le sequenze", d:"ad alta voce, come le diresti all'esaminatore", key:true},
  {illu:"quaderno", t:"I numeri", d:"su un foglio solo, da rileggere il giorno prima"}]},

{id:"s48", tipo:"frase", tema:"tenue", sopratitolo:"Porta via una frase",
  testo:"**Ogni gesto è anche un accertamento.** La frase con cui il modulo si è aperto, e quella da portare in aula d'esame."},
{id:"s49", tipo:"icone", tema:"chiaro", sopratitolo:"Nel prossimo modulo · le infezioni correlate all'assistenza", voci:[
  {icona:"catetere", t:"CAUTI", d:"già imparata qui"}, {icona:"polmoni", t:"VAP", d:"già imparata qui"},
  {icona:"flebo", t:"CLABSI", key:true}, {icona:"scudo", t:"Sito chirurgico"}]},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossimo modulo",
  titolo:"Modulo 4 · Infezioni correlate all'assistenza", sottotitolo:"CAUTI e VAP accanto a CLABSI<br>e infezioni del sito chirurgico",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
