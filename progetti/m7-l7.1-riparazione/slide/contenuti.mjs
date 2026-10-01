// Contenuto delle 50 scene della lezione 7.1 — riparazione tessutale e
// valutazione della lesione. Cinque corpi nuovi: le fasi (quattro bande
// sovrapposte sul tempo), le intenzioni (tre sezioni di cute), il TIME
// (quattro tessere), il fondo (le zone nero, giallo, rosso, rosa con la
// legenda) e l'orologio (le ore 12 verso la testa, la sottominatura).

const LEZIONI = [
 {n:"7.1", t:"Valutazione", illu:"ferita"},
 {n:"7.2", t:"Lesioni da pressione", illu:"tallone"},
 {n:"7.3", t:"Ulcere e piede", illu:"piede"},
 {n:"7.4", t:"Ferite chirurgiche", illu:"guanto"},
 {n:"7.5", t:"Medicazioni", illu:"pellicola"},
 {n:"7.6", t:"Stomie", illu:"stomaco"},
 {n:"7.7", t:"Drenaggi", illu:"catetere"},
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 7 · Wound care, stomie e drenaggi",
  titolo:"Riparazione tessutale<br>e valutazione della lesione", sottotitolo:"7.1 · La medicazione giusta discende da una lesione ben descritta",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"frase", tema:"chiaro", sopratitolo:"Micro-lezione 1 di 8 · una delle aree di autonomia più ampia",
  testo:"L'infermiere **valuta** la lesione, **sceglie** la medicazione, ne **segue** l'evoluzione."},
{id:"s03", tipo:"trappola", tema:"chiaro", sopratitolo:"L'errore più comune non è tecnico, ma di metodo", righe:[
  {sb:"Si guarda la ferita, si apre la medicazione che c'è nell'armadio, e si copre", ok:"**Prima si valuta, poi si medica**"}]},
{id:"s04", tipo:"anello", tema:"chiaro", sopratitolo:"Il modulo parte dalla valutazione · otto lezioni", centro:"Modulo 7", sotto:"otto lezioni", voci:LEZIONI},

{id:"s05", tipo:"fasi", tema:"chiaro", sopratitolo:"La guarigione · quattro fasi che si sovrappongono · emostasi: il sangue si ferma prima che qualunque altra cosa cominci", attive:[0]},
{id:"s06", tipo:"fasi", tema:"chiaro", sopratitolo:"Infiammatoria · arrossamento, calore, edema ed essudato in questa fase non sono segni di infezione: sono la guarigione che lavora", attive:[0,1]},
{id:"s07", tipo:"fasi", tema:"chiaro", sopratitolo:"Proliferativa · la fase in cui la lesione si riempie e si chiude", attive:[0,1,2]},
{id:"s08", tipo:"fasi", tema:"chiaro", sopratitolo:"Rimodellamento · la cicatrice non torna mai alla resistenza della cute originaria"},

{id:"s09", tipo:"intenzioni", tema:"chiaro", sopratitolo:"Tre modalità · prima intenzione: come in una ferita chirurgica suturata", attive:[0]},
{id:"s10", tipo:"intenzioni", tema:"chiaro", sopratitolo:"Seconda intenzione · come nelle lesioni da pressione e nelle ulcere", attive:[0,1], key:[1]},
{id:"s11", tipo:"intenzioni", tema:"chiaro", sopratitolo:"Terza intenzione · per esempio perché contaminata: chiusura ritardata, non mancata", key:[2]},

{id:"s12", tipo:"cifre", tema:"chiaro", sopratitolo:"La lesione cronica · non progredisce attraverso le fasi nei tempi attesi · cronica non vuol dire vecchia: vuol dire ferma", voci:[
  {n:"4–6", suf:"settimane", d:"indicativamente, oltre", key:true}]},
{id:"s13", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"Spesso bloccata nella fase infiammatoria · le lesioni croniche per eccellenza, quelle dei prossimi video", celle:[
  {n:"7.2", t:"Le **lesioni da pressione**", key:true}, {n:"7.3", t:"Le **ulcere vascolari**"}, {n:"7.3", t:"Il **piede diabetico**"}]},

{id:"s14", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"I fattori che ostacolano · sistemici", celle:[
  {n:"1", t:"**Età**"}, {n:"2", t:"**Malnutrizione**: le proteine della lezione 3.3", key:true}, {n:"3", t:"**Diabete**"}, {n:"4", t:"Ridotta **perfusione**, anemia"}]},
{id:"s15", tipo:"colonne", tema:"chiaro", sopratitolo:"I fattori che ostacolano", colonne:[
  {h:"Sistemici", voci:[{t:"**Fumo**"}, {t:"**Corticosteroidi** e immunosoppressori"}, {t:"Chemioterapia"}]},
  {h:"Locali", key:true, voci:[{t:"**Pressione** che persiste", key:true}, {t:"**Infezione**, **necrosi**"}, {t:"Essudato non gestito, corpi estranei"}]}]},
{id:"s16", tipo:"trappola", tema:"chiaro", sopratitolo:"I traumi da medicazione · una lesione non guarisce se si medica bene ma non si toglie la causa", righe:[
  {sb:"Rimuovere una garza aderente al fondo", ok:"**Togliere la causa**, poi medicare"}]},

{id:"s17", tipo:"time", tema:"chiaro", sopratitolo:"Il modello TIME · lo strumento di valutazione più usato, citato dal programma", attive:[0]},
{id:"s18", tipo:"time", tema:"chiaro", sopratitolo:"Il modello TIME", attive:[0,1]},
{id:"s19", tipo:"time", tema:"chiaro", sopratitolo:"Il modello TIME", attive:[0,1,2]},
{id:"s20", tipo:"time", tema:"chiaro", sopratitolo:"Quattro domande, e ciascuna porta a un intervento · è questo che lo rende uno strumento, e non una sigla", key:[3]},

{id:"s21", tipo:"fondo", tema:"chiaro", sopratitolo:"Il fondo della lesione si descrive con i colori", attive:[0,1]},
{id:"s22", tipo:"fondo", tema:"chiaro", sopratitolo:"Il fondo della lesione · il rosso giusto è un rosso vivo"},
{id:"s23", tipo:"fondo", tema:"chiaro", sopratitolo:"Il segnale d'allarme · può indicare infezione o scarsa perfusione", attive:[2], allarme:"granulazione pallida, scura o friabile, che sanguina facilmente"},

{id:"s24", tipo:"colonne", tema:"chiaro", sopratitolo:"L'essudato", colonne:[
  {h:"Quantità", voci:[{t:"Assente"}, {t:"Scarso"}, {t:"Moderato"}, {t:"Abbondante"}]},
  {h:"Tipo", key:true, voci:[{t:"**Sieroso**: chiaro"}, {t:"**Siero-ematico**: rosato"}, {t:"**Ematico**"}, {t:"**Purulento**: torbido, giallo-verde", key:true}]}]},
{id:"s25", tipo:"trappola", tema:"chiaro", sopratitolo:"L'odore · gli idrocolloidi producono un odore caratteristico che non indica infezione", righe:[
  {sb:"Valutare l'odore all'apertura della medicazione", ok:"Si valuta **dopo la detersione**"}]},
{id:"s26", tipo:"frase", tema:"chiaro", sopratitolo:"Il confronto con la medicazione precedente vale più del dato isolato",
  testo:"Un **cambiamento improvviso** di quantità, colore o odore è un possibile segno di **infezione**."},

{id:"s27", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"I margini", celle:[
  {n:"1", t:"**Regolari**"}, {n:"2", t:"**Macerati**"}, {n:"3", t:"**Introflessi**, l'epibolia: si arrotolano verso l'interno e fermano l'epitelio", key:true}, {n:"4", t:"**Sottominati**: una cavità sotto il bordo"}]},
{id:"s28", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"La cute perilesionale", celle:[
  {n:"1", t:"**Integra**"}, {n:"2", t:"**Arrossata**"}, {n:"3", t:"**Macerata**: bianca e rammollita, segno di essudato non gestito", key:true}, {n:"4", t:"**Eczematosa**, **callosa**"}]},
{id:"s29", tipo:"frase", tema:"chiaro", sopratitolo:"Proteggere la cute intorno alla lesione è parte della medicazione",
  testo:"Una lesione che si allarga per macerazione è una **medicazione sbagliata**, non una malattia che peggiora."},

{id:"s30", tipo:"orologio", tema:"chiaro", sopratitolo:"La misurazione · lunghezza, larghezza e profondità, in centimetri · per tunnel e sottominature, il metodo a orologio", ora:null},
{id:"s31", tipo:"orologio", tema:"chiaro", sopratitolo:"Le ore 12 verso la testa del paziente · «sottominatura di 2 centimetri a ore 3» · si misura con uno specillo sterile", ora:3, cm:2},
{id:"s32", tipo:"frase", tema:"chiaro", sopratitolo:"Per confrontare nel tempo · una misura presa in due modi diversi non dice se la lesione migliora",
  testo:"**Stessa tecnica** e, quando possibile, **stesso operatore**."},

{id:"s33", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"L'infezione · i segni classici · ma nelle lesioni croniche possono mancare tutti", celle:[
  {n:"1", t:"**Rossore**"}, {n:"2", t:"**Calore**"}, {n:"3", t:"**Dolore**", key:true}, {n:"4", t:"**Tumefazione**"}, {n:"5", t:"**Perdita di funzione**"}]},
{id:"s34", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Nelle lesioni croniche l'infezione è più subdola · e i segni sistemici: febbre, alterazione degli esami", celle:[
  {n:"1", t:"**Dolore nuovo** o in aumento", key:true}, {n:"2", t:"Granulazione **friabile**"}, {n:"3", t:"**Aumento dell'essudato**, odore"}, {n:"4", t:"Smette di migliorare, **si allarga**"}]},
{id:"s35", tipo:"frase", tema:"chiaro", sopratitolo:"Chi medica in silenzio perde il primo segno",
  testo:"Il **dolore che cambia** è uno dei segnali più precoci, e va **sempre chiesto**."},

{id:"s36", tipo:"trappola", tema:"chiaro", sopratitolo:"Il campione per la coltura · tutte le lesioni croniche sono colonizzate", righe:[
  {sb:"Un tampone fatto a caso: dà sempre un risultato", ok:"**Solo con segni di infezione**"}]},
{id:"s37", tipo:"percorso", tema:"chiaro", sopratitolo:"Come si preleva · la tecnica più usata è quella di Levine", tappe:[
  {t:"Detergere", d:"con fisiologica"}, {t:"Tessuto vitale", d:"non il pus, non la necrosi", key:true}, {t:"Levine", d:"ruotare il tampone con lieve pressione"}]},
{id:"s38", tipo:"cifre", tema:"chiaro", sopratitolo:"La tecnica di Levine · il riferimento resta la biopsia tissutale, di competenza medica", voci:[
  {n:"1", suf:"cm²", d:"di tessuto vitale, con lieve pressione", key:true}]},

{id:"s39", tipo:"griglia", tema:"chiaro", colonne:1, spunta:true, sopratitolo:"La documentazione fotografica · utile per seguire l'evoluzione, con regole precise", celle:[
  {t:"Il **consenso** della persona", key:true}, {t:"Un **righello** o un'etichetta di riferimento nella foto, perché la misura si legga anche dopo"}]},
{id:"s40", tipo:"griglia", tema:"chiaro", colonne:1, spunta:true, sopratitolo:"La documentazione fotografica", celle:[
  {t:"Stessa **distanza**, **luce** e **angolazione** fra una foto e l'altra"}, {t:"**Data**, sede, identificativo"}, {t:"**Archiviazione sicura** secondo la procedura aziendale", key:true}]},
{id:"s41", tipo:"titolo", tema:"profondo",
  titolo:"Mai sul **telefono personale**.",
  sotto:"È la violazione della privacy vista nella lezione 1.7."},

{id:"s42", tipo:"griglia", tema:"chiaro", colonne:1, spunta:true, sopratitolo:"La detersione · a ogni cambio di medicazione · una lesione raffreddata rallenta la guarigione", celle:[
  {t:"**Soluzione fisiologica** o acqua potabile", key:true}, {t:"A temperatura ambiente o **tiepida**"}, {t:"Nelle lesioni con **biofilm**: soluzioni detergenti specifiche"}]},
{id:"s43", tipo:"trappola", tema:"chiaro", sopratitolo:"Gli antisettici · possono danneggiare il tessuto di granulazione", righe:[
  {sb:"Antisettici di routine sulle lesioni croniche", ok:"Solo per **indicazioni specifiche** e **periodi limitati**"}]},
{id:"s44", tipo:"confronto", tema:"chiaro", sopratitolo:"Detergere non è disinfettare", col:[
  {h:"Detergere", t:"si fa **sempre**", key:true}, {h:"Disinfettare", t:"quasi **mai**"}]},

{id:"s45", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"In Veneto", celle:[
  {n:"1", t:"**Infermieri esperti in wound care**, con formazione specifica", key:true}, {n:"2", t:"**Ambulatori dedicati**"}, {n:"3", t:"**Prontuari aziendali** delle medicazioni avanzate"}]},
{id:"s46", tipo:"frase", tema:"chiaro", sopratitolo:"La continuità con il territorio · ADI e ambulatori distrettuali",
  testo:"La maggior parte delle lesioni croniche **si cura a casa**: chi le medica a casa deve descriverle nello stesso modo."},
{id:"s47", tipo:"frase", tema:"chiaro", sopratitolo:"All'orale · TIME, misure, foto, documentazione",
  testo:"La parola chiave è **valutazione strutturata**: chi descrive bene una lesione ha già detto come la medicherà."},

{id:"s48", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Ricapitoliamo", celle:[
  {t:"**Quattro fasi**: emostasi, infiammatoria, proliferativa, rimodellamento"}, {t:"**Prima, seconda, terza** intenzione"}, {t:"**TIME**: tessuto, infezione, umidità, margini", key:true}]},
{id:"s49", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Ricapitoliamo · nella prossima lezione, le lesioni da pressione", celle:[
  {t:"**Nero, giallo, rosso, rosa**"}, {t:"**Ore 12 verso la testa**"}, {t:"Tampone **solo con segni di infezione**, dopo la detersione", key:true}]},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione",
  titolo:"7.2<br>Lesioni da pressione", sottotitolo:"La stadiazione completa",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
