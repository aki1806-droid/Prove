// Contenuto delle 50 scene della lezione 4.1 — le infezioni correlate
// all'assistenza: epidemiologia e catena delle infezioni. Due corpi nuovi: gli
// anelli (la catena che compare un anello per volta e poi si spezza) e il
// percento (cento tondini, otto in accento). Illustrazioni nuove: ferita, cvc,
// contatto, goccia, aerosol, microbo, fotografia, pellicola, zanzara.

const ANELLI = [
 {t:"Agente infettivo"}, {t:"Serbatoio", d:"dove vive e si moltiplica"}, {t:"Porta di uscita"},
 {t:"Via di trasmissione", key:true}, {t:"Porta di ingresso"}, {t:"Ospite suscettibile"},
];
const SPEZZA = [
 {t:"Agente", d:"disinfezione, sterilizzazione, terapia"}, {t:"Serbatoio", d:"pulizia e disinfezione ambientale"},
 {t:"Porta di uscita", d:"secrezioni, escreti, ferite, igiene respiratoria"},
 {t:"Trasmissione", d:"igiene delle mani e DPI", key:true}, {t:"Porta di ingresso", d:"asepsi su cateteri, accessi, ferite"},
 {t:"Ospite", d:"nutrizione, mobilizzazione, igiene, vaccini"},
];
const SEDI = [
 {icona:"polmoni", t:"VAP", d:"polmonite da ventilazione"}, {icona:"catetere", t:"CAUTI", d:"urinaria da catetere"},
 {icona:"ferita", t:"SSI", d:"sito chirurgico"}, {icona:"cvc", t:"CLABSI", d:"batteriemia da catetere centrale", key:true},
];
const SIGLE = [
 {n:"VAP", t:"**Ventilator**-Associated Pneumonia"}, {n:"CAUTI", t:"**Catheter**-Associated Urinary Tract Infection"},
 {n:"CLABSI", t:"**Central Line**-Associated Bloodstream Infection", key:true}, {n:"SSI", t:"**Surgical Site** Infection"},
];
const VIE = [
 {icona:"contatto", t:"Contatto", d:"diretto o indiretto: la via più frequente", key:true}, {icona:"goccia", t:"Droplet", d:"> 5 µm, entro 1–2 m"},
 {icona:"aerosol", t:"Via aerea", d:"< 5 µm, sospesi a lungo"}, {icona:"bicchiere", t:"Veicolo comune", d:"cibo, acqua, farmaci"}, {icona:"zanzara", t:"Vettori"},
];
const OSPITE = [
 {n:"1", t:"**Età estreme**"}, {n:"2", t:"**Immunodepressione**"}, {n:"3", t:"Malattie croniche e **diabete**"}, {n:"4", t:"**Malnutrizione** — lezione 3.3"},
 {n:"5", t:"**Dispositivi invasivi**", key:true}, {n:"6", t:"Interventi chirurgici"}, {n:"7", t:"**Degenza prolungata**"}, {n:"8", t:"**Terapia antibiotica**: altera la flora"},
];
const COLON = [
 {n:"C", t:"**Colonizzazione**: il microrganismo è presente e si moltiplica, **senza** reazione dell'ospite e senza malattia"},
 {n:"I", t:"**Infezione**: invade i tessuti e provoca una **risposta clinica**", key:true},
];
const CHI = [
 {n:"1", t:"**CIO** — Comitato per il Controllo delle Infezioni Ospedaliere: indirizzo"}, {n:"2", t:"**Gruppo operativo**"},
 {n:"3", t:"**ICI** — infermiere addetto al controllo: sorveglianza, formazione, supporto, verifica", key:true}, {n:"4", t:"**Referenti di reparto**"},
];
const VENETO = [
 {n:"1", t:"**Sorveglianza regionale** delle ICA"}, {n:"2", t:"**Studi di prevalenza** nazionali ed europei"},
 {n:"3", t:"**Comitati aziendali** e infermieri addetti al controllo", key:true}, {n:"4", t:"**Indicatori** nella valutazione della qualità"},
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 4 · Prevenzione e controllo delle infezioni correlate all'assistenza",
  titolo:"Le ICA: epidemiologia<br>e catena delle infezioni", sottotitolo:"4.1 · Che cosa sono, quanto pesano, i sei anelli",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"icone", tema:"chiaro", sopratitolo:"Micro-lezione 1 di 8 · un modulo a resa alta nei quiz", voci:[
  {icona:"libro", t:"Definizioni", d:"precise"}, {icona:"cerchio", t:"Numeri", d:"da sapere secchi"}, {icona:"catena", t:"Sequenze", d:"da recitare", key:true}]},
{id:"s03", tipo:"figura", tema:"chiaro", sopratitolo:"E una ragione più profonda", illu:"mani",
  titolo:"L'evento avverso **più frequente** in sanità.",
  sotto:"E l'infermiere è il professionista con più contatti con la persona assistita."},
{id:"s04", tipo:"catena", tema:"chiaro", sopratitolo:"La prevenzione passa, letteralmente, dalle sue mani · questa lezione mette le basi", passi:[
  {t:"Che cosa sono", d:"la definizione"}, {t:"Quanto pesano", d:"i numeri"}, {t:"I sei anelli", d:"come nascono, come si fermano", key:true}]},

{id:"s05", tipo:"frase", tema:"chiaro", sopratitolo:"La definizione",
  testo:"Un'infezione che insorge **durante o dopo** un percorso di cura, e che **non era presente né in incubazione** al momento dell'accesso."},
{id:"s06", tipo:"numero", tema:"chiaro", sopratitolo:"La convenzione, in ospedale", cifra:"48 h",
  testo:"Quella che compare **dopo 48 ore** dal ricovero. Prima, era già in incubazione: **non** è correlata all'assistenza."},
{id:"s07", tipo:"raggiera", tema:"chiaro", sopratitolo:"Assistenza, non ospedale · il vecchio termine è superato", centro:"Assistenza", raggi:[
  {t:"Ospedale"}, {t:"RSA", key:true}, {t:"Domicilio"}, {t:"Ambulatori"}, {t:"Dialisi"}]},

{id:"s08", tipo:"figura", tema:"chiaro", sopratitolo:"Anche dopo la dimissione", illu:"casa", lato:"dx",
  titolo:"Il paziente è a casa,<br>l'infezione è nata **in sala operatoria**.",
  sotto:"L'esempio classico: l'infezione del sito chirurgico."},
{id:"s09", tipo:"cifre", tema:"chiaro", sopratitolo:"Il sito chirurgico si sorveglia", voci:[
  {n:30, suf:" giorni", t:"dall'intervento"}, {n:90, suf:" giorni", t:"con impianto protesico", key:true}]},

{id:"s10", tipo:"percento", tema:"chiaro", sopratitolo:"I numeri · studi di prevalenza negli ospedali italiani", n:8, t:"8 su 100",
  sotto:"ricoverati con un'ICA in un dato giorno: sopra la media europea"},
{id:"s11", tipo:"percento", tema:"chiaro", sopratitolo:"Il dato che dà senso al modulo", n:50, da:33, t:"⅓ – ½",
  sotto:"delle ICA è prevenibile con misure note"},
{id:"s12", tipo:"titolo", tema:"profondo",
  titolo:"Fino a metà<br>**prevenibili**.",
  sotto:"Non servono tecnologie nuove: serve applicare bene ciò che già sappiamo."},

{id:"s13", tipo:"icone", tema:"chiaro", sopratitolo:"Le sedi principali · quattro, con una sigla ciascuna", attive:[0,1], voci:SEDI},
{id:"s14", tipo:"icone", tema:"chiaro", sopratitolo:"Tre su quattro sono legate a un dispositivo: lì la prevenzione è più efficace", voci:SEDI},
{id:"s15", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, attive:[0,1], sopratitolo:"Le sigle da sciogliere · nei quiz compaiono così, in inglese", celle:SIGLE},
{id:"s16", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Quattro sigle, quattro sedi, tre dispositivi", celle:SIGLE},

{id:"s17", tipo:"anelli", tema:"chiaro", sopratitolo:"La catena delle infezioni · sei anelli", attive:[0,1,2], voci:ANELLI},
{id:"s18", tipo:"anelli", tema:"chiaro", sopratitolo:"L'infezione si realizza solo se tutti e sei gli anelli sono presenti", voci:ANELLI},
{id:"s19", tipo:"anelli", tema:"profondo", sopratitolo:"Il principio della prevenzione · basta spezzare un anello, uno qualunque", rotto:3, voci:ANELLI},

{id:"s20", tipo:"anelli", tema:"chiaro", sopratitolo:"Dove agisce l'infermiere, anello per anello", attive:[0,1], voci:SPEZZA},
{id:"s21", tipo:"anelli", tema:"chiaro", sopratitolo:"La via di trasmissione: l'anello su cui l'infermiere pesa di più", attive:[0,1,2,3], voci:SPEZZA},
{id:"s22", tipo:"anelli", tema:"chiaro", sopratitolo:"Sei anelli, sei famiglie di interventi", voci:SPEZZA},
{id:"s23", tipo:"frase", tema:"tenue", sopratitolo:"Gesti già incontrati nel modulo 3",
  testo:"La prevenzione delle ICA è **assistenza di base fatta bene**: l'igiene, la nutrizione, il catetere."},

{id:"s24", tipo:"icone", tema:"chiaro", sopratitolo:"Le vie di trasmissione", attive:[0], voci:VIE},
{id:"s25", tipo:"cifre", tema:"chiaro", sopratitolo:"Droplet · goccioline grandi, con tosse e starnuti", voci:[
  {n:5, suf:" µm", t:"oltre", d:"grandi dimensioni"}, {n:1, suf:"–2 m", t:"cadono entro", key:true}]},
{id:"s26", tipo:"confronto", tema:"chiaro", sopratitolo:"Droplet e via aerea · la differenza fra una mascherina e un respiratore", col:[
  {h:"Droplet", t:"**> 5 µm**, cadono entro **1–2 metri**"},
  {h:"Via aerea", t:"**< 5 µm**, restano **sospesi** a lungo e vanno lontano"}]},
{id:"s27", tipo:"icone", tema:"chiaro", sopratitolo:"Cinque vie · la base delle precauzioni della lezione 4.3", voci:VIE},

{id:"s28", tipo:"figura", tema:"chiaro", sopratitolo:"Endogene", illu:"catetere",
  titolo:"La **flora della persona stessa**,<br>in una sede dove non dovrebbe stare.",
  sotto:"I batteri intestinali che risalgono lungo il catetere."},
{id:"s29", tipo:"confronto", tema:"chiaro", sopratitolo:"Endogene ed esogene", col:[
  {h:"Endogene", t:"La **propria flora**: molte infezioni da dispositivo"},
  {h:"Esogene", t:"Dall'**esterno**: altri pazienti, operatori, ambiente, attrezzature"}]},
{id:"s30", tipo:"frase", tema:"chiaro", sopratitolo:"Per questo",
  testo:"L'**asepsi** all'inserimento e alla manipolazione conta quanto l'igiene delle mani: il germe è già lì, e il dispositivo gli apre la strada."},

{id:"s31", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"L'ospite suscettibile · i fattori di rischio", celle:OSPITE},
{id:"s32", tipo:"confronto", tema:"chiaro", sopratitolo:"Su quali lavora l'infermiere", col:[
  {h:"Non si cambiano", t:"Età, immunodepressione, malattie croniche"},
  {h:"Si cambiano", t:"I **dispositivi** si tolgono prima, la **nutrizione** si corregge, la **degenza** si accorcia"}]},

{id:"s33", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, attive:[0], sopratitolo:"Colonizzazione e infezione · una distinzione che i quiz chiedono", celle:COLON},
{id:"s34", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"Il colonizzato di norma non si tratta con antibiotici", celle:COLON},
{id:"s35", tipo:"titolo", tema:"profondo",
  titolo:"Non trattare<br>**non vuol dire non isolare**.",
  sotto:"Il colonizzato è comunque un serbatoio: richiede le precauzioni per non trasmettere."},

{id:"s36", tipo:"figura", tema:"chiaro", sopratitolo:"La sorveglianza · per prevenire bisogna misurare", illu:"fotografia",
  titolo:"Studi di **prevalenza**:<br>una fotografia in un dato giorno.",
  sotto:"Semplici, ripetibili, confrontabili: come quelli europei coordinati dall'ECDC."},
{id:"s37", tipo:"figura", tema:"chiaro", sopratitolo:"La sorveglianza", illu:"pellicola", lato:"dx",
  titolo:"Studi di **incidenza**:<br>i nuovi casi in un periodo.",
  sotto:"Più precisi, più onerosi."},
{id:"s38", tipo:"confronto", tema:"chiaro", sopratitolo:"E le sorveglianze mirate: sito chirurgico, terapia intensiva, batteriemie da germi resistenti", col:[
  {h:"Prevalenza", t:"Una **fotografia**: quanti hanno un'infezione oggi"},
  {h:"Incidenza", t:"Un **film**: quanti nuovi casi in un periodo"}]},

{id:"s39", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, attive:[0], sopratitolo:"Chi se ne occupa · dalle circolari ministeriali degli anni Ottanta", celle:CHI},
{id:"s40", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, attive:[0,1,2], sopratitolo:"Una figura infermieristica specifica", celle:CHI},
{id:"s41", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Una possibile evoluzione di carriera: all'orale vale la pena citarla", celle:CHI},

{id:"s42", tipo:"norma", tema:"chiaro", sopratitolo:"Il quadro nazionale",
  etichetta:"Piano Nazionale di Contrasto all'Antibiotico-Resistenza", sigla:"PNCAR",
  testo:"La **prevenzione delle ICA** è uno dei pilastri, insieme all'**uso appropriato degli antibiotici**."},
{id:"s43", tipo:"triade", tema:"chiaro", sopratitolo:"L'approccio · ne riparliamo nella lezione 4.6", centro:"One Health", nodi:[
  {t:"Salute umana", key:true}, {t:"Salute animale"}, {t:"Ambiente"}]},
{id:"s44", tipo:"norma", tema:"chiaro", sopratitolo:"Un aggancio al modulo 1 · le ICA sono eventi avversi",
  etichetta:"Sicurezza delle cure", sigla:"L. 24/2017",
  testo:"Le ICA rientrano nella **sicurezza delle cure**: in un contenzioso conta se le **misure di prevenzione** sono state adottate."},
{id:"s45", tipo:"sostituzione", tema:"chiaro", sopratitolo:"La domanda, in un contenzioso",
  da:{h:"Non è", t:"«ha avuto un'infezione?»"}, a:{h:"È", t:"«sono state adottate le misure?»"},
  sotto:"Risponde la documentazione: bundle registrato, motivazione del catetere, rivalutazione quotidiana."},

{id:"s46", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, attive:[0,1,2], sopratitolo:"In Veneto", celle:VENETO},
{id:"s47", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Per l'orale: «organizzata a livello aziendale, con un comitato dedicato e sorveglianza continua»", celle:VENETO},

{id:"s48", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Ricapitoliamo", celle:[
  {n:"1", t:"ICA: **dopo 48 ore**, non presente né in incubazione"}, {n:"2", t:"Sito chirurgico: **30** giorni, **90** con impianto"},
  {n:"3", t:"Circa **8 su 100**"}, {n:"4", t:"**Fino a metà** prevenibili", key:true}]},
{id:"s49", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Ricapitoliamo · nella prossima lezione, l'anello che l'infermiere controlla più di ogni altro: le mani", celle:[
  {n:"5", t:"**Sei anelli**: basta spezzarne uno", key:true}, {n:"6", t:"Contatto, droplet, via aerea"},
  {n:"7", t:"**Colonizzazione non è infezione**"}, {n:"8", t:"Ma il colonizzato è un **serbatoio**"}]},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione",
  titolo:"4.2 Igiene delle mani<br>e precauzioni standard", sottotitolo:"I cinque momenti dell'OMS,<br>e perché l'adesione è bassa",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
