// Contenuto delle 50 scene della lezione 6.3 — la fluidoterapia. Un corpo
// nuovo: la tonicità (tre cellule in tre soluzioni: nell'isotonica resta
// uguale, nell'ipotonica l'acqua entra e si gonfia, nell'ipertonica esce e
// si restringe). Due illustrazioni nuove: l'elastomero e la cellula.
// I tre scopi sono un `tre` che si accende, le pompe sono figure e griglie,
// il calcolo delle gocce riusa il corpo della 5.3.

const SCOPI = [
 {n:"1", t:"Rianimazione", d:"ripristinare rapidamente il volume perso"}, {n:"2", t:"Mantenimento", d:"25–30 ml/kg al giorno", key:true}, {n:"3", t:"Sostituzione", d:"perdite in corso"},
];
const TAB1 = [
 {h:"Fisiologica 0,9%", voci:[{t:"Isotonica"}, {t:"In grandi volumi: **acidosi ipercloremica**", key:true}]},
 {h:"Bilanciate", key:true, voci:[{t:"Isotoniche"}, {t:"**Più vicine al plasma**"}]},
];
const TAB2 = [
 {h:"Glucosata 5%", key:true, voci:[{t:"Ipotonica"}, {t:"**Non espande** il volume", key:true}, {t:"**No** nel trauma cranico"}]},
 {h:"Colloidi", voci:[{t:"Indicazioni **selezionate**"}]},
 {h:"Ipertoniche", voci:[{t:"Solo su prescrizione specifica"}, {t:"Monitoraggio stretto"}]},
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 6 · Accessi vascolari, terapia infusionale ed emocomponenti",
  titolo:"Fluidoterapia", sottotitolo:"6.3 · Soluzioni, dispositivi, allarmi e sovraccarico",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"frase", tema:"chiaro", sopratitolo:"Micro-lezione 3 di 8",
  testo:"I liquidi endovenosi sono **farmaci**: indicazioni, dosi, effetti avversi, controindicazioni, prescrizione."},
{id:"s03", tipo:"frase", tema:"chiaro", sopratitolo:"«La flebo di fisiologica» non è un gesto neutro",
  testo:"È all'origine di molti **sovraccarichi** e **squilibri**: sodio in eccesso, acqua libera dove non serve."},
{id:"s04", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"In questa lezione", celle:[
  {n:"1", t:"Le **soluzioni** della lezione 3.5"}, {n:"2", t:"**Pompe**, elastomeri, allarmi", key:true}, {n:"3", t:"Un caso che i concorsi amano: il **sovraccarico**"}]},

{id:"s05", tipo:"tre", tema:"chiaro", sopratitolo:"Tre scopi · conviene sempre chiedersi quale si sta perseguendo", attive:[], box:SCOPI},
{id:"s06", tipo:"tre", tema:"chiaro", sopratitolo:"Rianimazione · come in uno shock", attive:[0], box:SCOPI},
{id:"s07", tipo:"cifre", tema:"chiaro", sopratitolo:"Mantenimento · coprire i fabbisogni di chi non può bere", voci:[
  {n:"25–30", suf:"ml/kg", d:"al giorno", key:true}, {n:"≈ 2", suf:"l", d:"per 70 chili"}]},
{id:"s08", tipo:"tre", tema:"chiaro", sopratitolo:"Sostituzione · vomito, drenaggi, diarrea, fistole: misurate nel bilancio idrico della 3.5", box:SCOPI},
{id:"s09", tipo:"frase", tema:"chiaro", sopratitolo:"Una delle cause più comuni di sovraccarico",
  testo:"Un'infusione di mantenimento che prosegue per giorni **senza che nessuno la rivaluti**."},

{id:"s10", tipo:"tonicita", tema:"chiaro", sopratitolo:"I cristalloidi · isotonici: la fisiologica 0,9%, che in grandi volumi dà acidosi ipercloremica per il cloro", attive:[0]},
{id:"s11", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"Le soluzioni bilanciate", celle:[
  {n:"1", t:"**Ringer lattato** e altre: composizione **più vicina al plasma**", key:true},
  {n:"2", t:"Meno cloro, e un tampone al posto di una parte del cloro"}]},
{id:"s12", tipo:"tonicita", tema:"chiaro", sopratitolo:"Ipotonici · la glucosata 5%, che metabolizzato il glucosio è acqua libera; la fisiologica 0,45%", attive:[0,1]},
{id:"s13", tipo:"tonicita", tema:"chiaro", sopratitolo:"Ipertonici · NaCl 3%, glucosate concentrate, bicarbonato: richiamano acqua nei vasi; solo su prescrizione, con monitoraggio stretto"},

{id:"s14", tipo:"trappola", tema:"chiaro", sopratitolo:"Due regole da sapere · la prima", righe:[
  {sb:"La glucosata 5% espande il volume circolante", ok:"Si distribuisce in **tutti i compartimenti**: solo una piccola parte resta nei vasi"}]},
{id:"s15", tipo:"trappola", tema:"chiaro", sopratitolo:"La seconda · una domanda d'esame e un errore reale", righe:[
  {sb:"Soluzioni ipotoniche nel trauma cranico", ok:"**Controindicate**: l'acqua libera entra nelle cellule cerebrali e **peggiora l'edema**"}]},

{id:"s16", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"I colloidi · molecole grandi che restano più a lungo nei vasi", celle:[
  {n:"1", t:"**Albumina**: indicazioni specifiche, come la paracentesi evacuativa nel cirrotico (modulo 8)", key:true}]},
{id:"s17", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"I colloidi", celle:[
  {n:"2", t:"Le **gelatine**"},
  {n:"3", t:"**Amidi idrossietilici**: fortemente limitati dalle autorità europee per **danno renale** e mortalità nei critici", key:true}]},
{id:"s18", tipo:"confronto", tema:"chiaro", sopratitolo:"Nella pratica attuale", col:[
  {h:"Cristalloidi", t:"La scelta per **la maggior parte delle situazioni**", key:true},
  {h:"Colloidi", t:"Indicazioni **selezionate**"}]},

{id:"s19", tipo:"icone", tema:"chiaro", sopratitolo:"Il monitoraggio · gli strumenti della lezione 3.5, letti ogni giorno", voci:[
  {icona:"cuore2", t:"Parametri vitali"}, {icona:"bilancio", t:"Diuresi e bilancio", key:true}, {icona:"bilancia2", t:"Peso"}, {icona:"occhio", t:"Coscienza"}]},
{id:"s20", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"I segni di sovraccarico · soprattutto nell'anziano e nel cardiopatico", celle:[
  {n:"1", t:"**Dispnea**"}, {n:"2", t:"**Rantoli** alle basi"}, {n:"3", t:"Edemi, turgore delle giugulari"}, {n:"4", t:"**Aumento di peso**: un chilo in un giorno è un litro", key:true}]},
{id:"s21", tipo:"griglia", tema:"chiaro", colonne:1, spunta:true, sopratitolo:"E ancora", celle:[
  {t:"**Elettroliti e glicemia**, specie con le glucosate"}, {t:"La **sede di accesso**, come nella 6.1", key:true}]},

{id:"s22", tipo:"figura", tema:"chiaro", sopratitolo:"Le infusioni a caduta · rotella del deflussore o regolatore di precisione", illu:"flebo",
  titolo:"Semplici, senza corrente, **imprecise**.",
  sotto:"La velocità cambia con l'altezza della sacca, la posizione del braccio, la pervietà della cannula."},
{id:"s23", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"Per questo", celle:[
  {n:"✗", t:"**Non** per i farmaci ad alto rischio", key:true}, {n:"✓", t:"**Controllate spesso**, ogni volta che si passa dal letto"}]},
{id:"s24", tipo:"calcolo", tema:"chiaro", sopratitolo:"Il calcolo delle gocce · lezione 5.3", righe:[{tok:["volume", "×", "fattore", "÷", "minuti", "=", "gtt/min"]}], nota:"con il deflussore da 20 gtt/ml, ml/h ÷ 3"},

{id:"s25", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Le pompe volumetriche · si impostano ml/h e volume da infondere; la pompa conta ciò che ha infuso", celle:[
  {n:"!", t:"Occlusione **a monte** o **a valle**", key:true}, {n:"!", t:"**Aria** in linea"}, {n:"!", t:"Fine infusione"}, {n:"!", t:"Batteria"}]},
{id:"s26", tipo:"titolo", tema:"profondo",
  titolo:"Un allarme **non si silenzia** senza capirne la causa.",
  sotto:"E non si disattiva mai."},
{id:"s27", tipo:"figura", tema:"chiaro", sopratitolo:"Il sistema anti-flusso libero", illu:"pompa",
  titolo:"Il set rimosso dalla pompa **non scorre a caduta libera**.",
  sotto:"Senza quel sistema, la sacca scorrerebbe senza controllo."},
{id:"s28", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"Le pompe intelligenti", celle:[
  {n:"1", t:"**Librerie di farmaci** con limiti di dose", key:true}, {n:"2", t:"Velocità fuori range: la pompa **avvisa**"}, {n:"3", t:"Una barriera di sicurezza, nel senso di **Reason**"}]},

{id:"s29", tipo:"figura", tema:"chiaro", sopratitolo:"Le pompe a siringa · area critica, pediatria: un millilitro in più è una dose in più", illu:"siringa", lato:"dx",
  titolo:"**Piccoli volumi**, alta precisione.",
  sotto:"Per i farmaci ad alto rischio a flusso basso."},
{id:"s30", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"Due attenzioni · la prima", celle:[
  {n:"1", t:"L'**altezza** della pompa rispetto al paziente: troppo in alto e non fissata, **effetto sifone**, un bolo involontario", key:true}]},
{id:"s31", tipo:"frase", tema:"chiaro", sopratitolo:"La seconda · il cambio siringa dei farmaci salvavita, come la noradrenalina",
  testo:"Organizzato per **non interrompere l'infusione**: pochi minuti di sospensione, un crollo pressorio."},

{id:"s32", tipo:"figura", tema:"chiaro", sopratitolo:"Gli elastomeri · analgesia, chemioterapia, antibiotici, anche a domicilio", illu:"elastomero",
  titolo:"Un palloncino elastico, un **flusso prefissato**, senza elettricità.",
  sotto:"La persona lo porta con sé."},
{id:"s33", tipo:"confronto", tema:"chiaro", sopratitolo:"Il flusso varia con la temperatura · si tiene secondo il produttore, lontano dalle fonti di calore", col:[
  {h:"Calore", t:"Flusso **più rapido**", key:true}, {h:"Freddo", t:"Flusso **più lento**"}]},
{id:"s34", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"Il controllo", celle:[
  {n:"1", t:"L'unico modo: la **riduzione progressiva del volume** nel tempo previsto", key:true}, {n:"✗", t:"Non si apre, non si comprime"}]},

{id:"s35", tipo:"griglia", tema:"chiaro", colonne:1, spunta:true, sopratitolo:"Regole comuni a tutti i dispositivi · le sette G della 5.4 valgono anche per una flebo", celle:[
  {t:"Verificare **prescrizione, soluzione, velocità, volume**", key:true}, {t:"**Etichettare** le linee, soprattutto quando sono molte"}]},
{id:"s36", tipo:"frase", tema:"chiaro", sopratitolo:"A ogni consegna",
  testo:"**Tracciare** ogni linea con il dito, dalla sacca al paziente.",
  sotto:"Il modo per accorgersi di una linea collegata alla via sbagliata."},
{id:"s37", tipo:"griglia", tema:"chiaro", colonne:1, spunta:true, sopratitolo:"Regole comuni", celle:[
  {t:"Niente farmaci aggiunti alle sacche, se non previsto dalla procedura"}, {t:"Verificare la **compatibilità**, come nella 5.7", key:true}]},

{id:"s38", tipo:"frase", tema:"chiaro", sopratitolo:"Il caso · anziano cardiopatico, da tre giorni in fisiologica a 100 ml/h",
  testo:"Stanotte **dispnoico**, rantoli alle basi, **due chili in più**. Che cosa pensi? **Sovraccarico**."},
{id:"s39", tipo:"percorso", tema:"chiaro", sopratitolo:"Che cosa fai · poi bilancio, peso, diuresi", tappe:[
  {t:"Ridurre", d:"al minimo, via pervia", key:true}, {t:"Seduta"}, {t:"Ossigeno", d:"secondo protocollo"}, {t:"Parametri", d:"e saturazione"}, {t:"Medico", d:"subito"}]},
{id:"s40", tipo:"titolo", tema:"profondo",
  titolo:"Chi aveva **rivalutato** quell'infusione?",
  sotto:"Negli ultimi tre giorni. La domanda di fondo."},

{id:"s41", tipo:"griglia", tema:"chiaro", colonne:1, spunta:true, sopratitolo:"Nell'anziano e nel cardiopatico", celle:[
  {t:"Volumi e velocità **più bassi**"}, {t:"**Rivalutazione quotidiana** della prescrizione", key:true}, {t:"Via **orale** appena possibile"}]},
{id:"s42", tipo:"frase", tema:"chiaro", sopratitolo:"Come per i dispositivi",
  testo:"Ogni giorno: **serve ancora?** Una flebo rivalutata ogni giorno è una flebo che si toglie in tempo."},

{id:"s43", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"In Veneto", celle:[
  {n:"1", t:"**Pompe con librerie di farmaci** in diffusione", key:true}, {n:"2", t:"**Procedure aziendali** sulla gestione delle infusioni"}]},
{id:"s44", tipo:"frase", tema:"chiaro", sopratitolo:"Continuità ospedale-territorio",
  testo:"Gli **elastomeri** per terapie antibiotiche o analgesiche a domicilio, con presa in carico in **ADI**."},

{id:"s45", tipo:"colonne", tema:"chiaro", sopratitolo:"La tabella delle soluzioni", colonne:TAB1},
{id:"s46", tipo:"colonne", tema:"chiaro", sopratitolo:"La tabella delle soluzioni", colonne:TAB2},

{id:"s47", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Ricapitoliamo", celle:[
  {t:"**I liquidi sono farmaci**", key:true}, {t:"Rianimazione, mantenimento, sostituzione"},
  {t:"Sorvegliare il **sovraccarico**"}, {t:"Mai **silenziare un allarme** senza capirlo"}]},
{id:"s48", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Ricapitoliamo", celle:[
  {t:"Elastomero: il **calore accelera**"}, {t:"**Tracciare le linee** a ogni consegna", key:true},
  {t:"Anziano e cardiopatico: volumi più bassi, rivalutazione quotidiana"}]},
{id:"s49", tipo:"frase", tema:"chiaro", sopratitolo:"Nella prossima lezione",
  testo:"L'**emogasanalisi**: spaventa molti candidati, e con un metodo in quattro passi diventa semplice."},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione",
  titolo:"6.4<br>Equilibrio acido-base<br>ed emogasanalisi", sottotitolo:"Il metodo in quattro passi",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
