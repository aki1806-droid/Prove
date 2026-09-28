// Contenuto delle 50 scene della lezione 4.4 — DPI: scelta, vestizione e
// svestizione. Le due sequenze sono percorsi a tappe che si accendono un passo
// per volta; la rimozione dei guanti e' una fila di gesti. Illustrazioni
// nuove: occhiali, rifiuti.

const VESTIZIONE = [
 {t:"Igiene delle mani"}, {t:"Camice", d:"collo e vita"}, {t:"Mascherina o FFP", d:"con fit check"}, {t:"Occhiali o visiera"}, {t:"Guanti", d:"per ultimi, sopra i polsini", key:true},
];
const SVESTIZIONE = [
 {t:"Guanti", d:"la parte più contaminata", key:true}, {t:"Occhiali o visiera", d:"dall'elastico posteriore"}, {t:"Camice", d:"arrotolato verso l'interno"},
 {t:"Mascherina o FFP", d:"dagli elastici; via aerea: fuori dalla stanza", key:true}, {t:"Igiene delle mani"},
];
const GUANTI = [
 {illu:"sfila", t:"Il primo", d:"afferrato all'esterno del polso, sfilato rovesciandolo"}, {illu:"guanto", t:"In mano", d:"tenuto nella mano ancora guantata"},
 {illu:"dita", t:"Due dita nude", d:"sotto il secondo, dall'interno del polso", key:true}, {illu:"pacchetto", t:"Rovesciato", d:"sopra il primo: un pacchetto chiuso"},
];
const CRITICI = [
 {n:"1", t:"**Toccarsi il viso**, sistemarsi la mascherina con i guanti"}, {n:"2", t:"Toccare la **parte anteriore** della mascherina"},
 {n:"3", t:"Sfilare il camice **dalla testa**"}, {n:"4", t:"**Scuotere** i DPI"},
 {n:"5", t:"**Riutilizzare** dispositivi monouso"}, {n:"6", t:"**Uscire con i guanti**: maniglie e corridoio", key:true},
];
const SCELTA = [
 {n:"1", t:"**Prelievo** → guanti"}, {n:"2", t:"**Aspirazione tracheale** → guanti, camice, occhi e bocca", key:true}, {n:"3", t:"**Igiene di un incontinente** → guanti e camice"},
];
const RECAP = [
 {h:"Vestizione", voci:[{t:"Igiene delle mani"}, {t:"Camice"}, {t:"Mascherina o FFP"}, {t:"Occhiali"}, {t:"Guanti per ultimi", key:true}]},
 {h:"Svestizione", key:true, voci:[{t:"Guanti per primi", key:true}, {t:"Occhiali"}, {t:"Camice verso l'interno"}, {t:"Mascherina o FFP"}, {t:"Igiene delle mani"}]},
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 4 · Prevenzione e controllo delle infezioni correlate all'assistenza",
  titolo:"DPI: scelta, vestizione<br>e svestizione", sottotitolo:"4.4 · Due sequenze e un principio: che cosa si può toccare",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"icone", tema:"chiaro", sopratitolo:"Micro-lezione 4 di 8 · i DPI proteggono solo se", voci:[
  {icona:"lente", t:"Si scelgono bene"}, {icona:"camice", t:"Si indossano bene"}, {icona:"guanto", t:"Si tolgono bene", d:"soprattutto", key:true}]},
{id:"s03", tipo:"frase", tema:"chiaro", sopratitolo:"Perché le sequenze vengono chieste nei concorsi",
  testo:"È nella **svestizione** che avviene la maggior parte delle **autocontaminazioni**."},
{id:"s04", tipo:"catena", tema:"chiaro", sopratitolo:"Questa lezione", passi:[
  {t:"La vestizione"}, {t:"La svestizione", key:true}, {t:"Il principio", d:"che cosa si può toccare"}]},

{id:"s05", tipo:"norma", tema:"chiaro", sopratitolo:"Che cosa sono i DPI",
  etichetta:"Tutela della salute e della sicurezza nei luoghi di lavoro", sigla:"D.Lgs. 81/2008",
  testo:"Attrezzature destinate a **proteggere il lavoratore** da uno o più rischi."},
{id:"s06", tipo:"confronto", tema:"chiaro", sopratitolo:"Un obbligo reciproco", col:[
  {h:"Il datore di lavoro", t:"**Fornisce**, mantiene efficienti, **forma e addestra**"},
  {h:"Il lavoratore", t:"**Utilizza correttamente**, ne ha cura, **segnala** difetti e mancanze"}]},
{id:"s07", tipo:"frase", tema:"tenue", sopratitolo:"E per l'infermiere",
  testo:"Anche una responsabilità verso i pazienti: il DPI che protegge te **protegge chi assisti dopo**."},

{id:"s08", tipo:"figura", tema:"chiaro", sopratitolo:"La distinzione fondamentale", illu:"mascherina",
  titolo:"La mascherina chirurgica<br>è un **dispositivo medico**.",
  sotto:"Protegge l'ambiente e il paziente dalle emissioni di chi la indossa."},
{id:"s09", tipo:"trappola", tema:"chiaro", sopratitolo:"Protegge l'operatore da schizzi e goccioline grandi, ma", righe:[
  {sb:"«Sigilla sul volto»", ok:"**Non sigilla**"},
  {sb:"«Protegge dall'inalazione»", ok:"**Non protegge** dalle particelle fini"}]},
{id:"s10", tipo:"gesti", tema:"chiaro", sopratitolo:"Dispositivo medico da una parte, DPI dall'altra", voci:[
  {illu:"mascherina", t:"Chirurgica", d:"dispositivo medico: protegge gli altri"}, {illu:"respiratore", t:"Respiratore FFP", d:"DPI: filtra e aderisce, protegge chi lo indossa", key:true}]},

{id:"s11", tipo:"cifre", tema:"chiaro", sopratitolo:"Le classi FFP · efficienza filtrante · in sanità FFP2 e FFP3", voci:[
  {n:80, suf:" %", t:"FFP1"}, {n:94, suf:" %", t:"FFP2", key:true}, {n:99, suf:" %", t:"FFP3"}]},
{id:"s12", tipo:"raggiera", tema:"chiaro", sopratitolo:"FFP3 nelle procedure che generano aerosol", centro:"FFP3", raggi:[
  {t:"Intubazione", key:true}, {t:"Broncoscopia"}, {t:"Aspirazione", d:"a circuito aperto"}, {t:"NIV", d:"ventilazione non invasiva"}]},

{id:"s13", tipo:"confronto", tema:"chiaro", sopratitolo:"La tenuta · un respiratore protegge solo se aderisce", col:[
  {h:"Fit test", t:"La prova di tenuta per **scegliere il modello** adatto al proprio viso"},
  {h:"Fit check", t:"Il controllo di tenuta **a ogni vestizione**"}]},
{id:"s14", tipo:"figura", tema:"chiaro", sopratitolo:"Il fit check", illu:"respiratore", lato:"dx",
  titolo:"Inspira ed espira<br>**coprendo il filtro**.",
  sotto:"Nessuna perdita ai bordi. Barba e basette compromettono la tenuta."},
{id:"s15", tipo:"trappola", tema:"chiaro", sopratitolo:"Un dettaglio · il respiratore con valvola", righe:[
  {sb:"Con valvola nel campo sterile", ok:"Protegge chi lo indossa, ma **lascia uscire l'aria espirata non filtrata**"}]},

{id:"s16", tipo:"confronto", tema:"chiaro", sopratitolo:"Gli altri DPI · i guanti · nitrile o lattice, attenzione alle allergie", col:[
  {h:"Sterili", t:"Per le **manovre asettiche**"},
  {h:"Non sterili", t:"Per il contatto con **liquidi biologici**"}]},
{id:"s17", tipo:"gesti", tema:"chiaro", sopratitolo:"Camice e protezione degli occhi", voci:[
  {illu:"camice", t:"Camice", d:"impermeabile se rischio di schizzi abbondanti"}, {illu:"occhiali", t:"Occhiali o visiera", d:"schizzi su occhi e mucose", key:true}]},
{id:"s18", tipo:"trappola", tema:"chiaro", sopratitolo:"Vale una domanda, e vale un errore in reparto", righe:[
  {sb:"«Ho gli occhiali da vista»", ok:"**Non sono un DPI**: non chiudono ai lati, uno schizzo li aggira"}]},

{id:"s19", tipo:"sostituzione", tema:"chiaro", sopratitolo:"La scelta si fa sul rischio · deriva dalle precauzioni standard",
  da:{h:"Non", t:"chi è il paziente"}, a:{h:"Ma", t:"che cosa sto per fare"},
  sotto:"I DPI si scelgono in base alla manovra, non alla diagnosi."},
{id:"s20", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"Tre esempi", celle:SCELTA},
{id:"s21", tipo:"frase", tema:"chiaro", sopratitolo:"La domanda da farsi",
  testo:"**«Che cosa potrebbe raggiungermi, e dove?»** La risposta dice quali DPI. Il nome sulla cartella non dice niente."},

{id:"s22", tipo:"percorso", tema:"chiaro", sopratitolo:"La vestizione", attive:[0,1,2], tappe:VESTIZIONE},
{id:"s23", tipo:"percorso", tema:"chiaro", sopratitolo:"La vestizione · i guanti sopra i polsini: niente pelle scoperta", tappe:VESTIZIONE},
{id:"s24", tipo:"frase", tema:"chiaro", sopratitolo:"La logica",
  testo:"I guanti per ultimi perché devono essere **puliti quando si inizia**: dopo, si tocca il paziente, non il proprio camice."},

{id:"s25", tipo:"figura", tema:"chiaro", sopratitolo:"La svestizione · il momento critico", illu:"camice",
  titolo:"Parte anteriore e superficie esterna:<br>**contaminate**.",
  sotto:"Il principio che governa tutto."},
{id:"s26", tipo:"titolo", tema:"profondo",
  titolo:"Si toccano solo<br>**lacci, elastici, l'interno**.",
  sotto:"E le mani non toccano mai il proprio viso."},

{id:"s27", tipo:"percorso", tema:"chiaro", sopratitolo:"La svestizione", attive:[0,1], tappe:SVESTIZIONE},
{id:"s28", tipo:"percorso", tema:"chiaro", sopratitolo:"La svestizione · il camice arrotolato: la parte contaminata resta chiusa dentro", attive:[0,1,2], tappe:SVESTIZIONE},
{id:"s29", tipo:"percorso", tema:"chiaro", sopratitolo:"La svestizione · nella via aerea il respiratore si toglie fuori, a porta chiusa", attive:[0,1,2,3], tappe:SVESTIZIONE},
{id:"s30", tipo:"percorso", tema:"chiaro", sopratitolo:"La svestizione · se le mani si contaminano, igiene subito, anche a metà sequenza", tappe:SVESTIZIONE},

{id:"s31", tipo:"catena", tema:"chiaro", sopratitolo:"La variante · camice e guanti insieme", passi:[
  {t:"Afferrare il camice sul davanti", d:"con le mani guantate"}, {t:"Staccarlo dai lacci"}, {t:"Arrotolarlo verso l'interno", key:true}, {t:"Ai polsi, sfilare i guanti", d:"dentro il camice"}]},
{id:"s32", tipo:"frase", tema:"chiaro", sopratitolo:"Quale sequenza?",
  testo:"Non importa quale: importa che quella adottata dall'azienda sia **sempre la stessa** e **addestrata**."},

{id:"s33", tipo:"gesti", tema:"chiaro", sopratitolo:"La rimozione dei guanti · una piccola tecnica a sé", attive:[0,1], voci:GUANTI},
{id:"s34", tipo:"gesti", tema:"chiaro", sopratitolo:"La rimozione dei guanti · l'esterno contaminato tutto dentro", voci:GUANTI},
{id:"s35", tipo:"titolo", tema:"profondo",
  titolo:"Pelle con pelle,<br>**guanto con guanto**.",
  sotto:"La frase da ricordare."},

{id:"s36", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, attive:[0,1], sopratitolo:"I punti critici · dove ci si contamina davvero, negli studi di simulazione", celle:CRITICI},
{id:"s37", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, attive:[0,1,2,3], sopratitolo:"I punti critici", celle:CRITICI},
{id:"s38", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Sapere dove si sbaglia è metà della prevenzione", celle:CRITICI},

{id:"s39", tipo:"figura", tema:"chiaro", sopratitolo:"Nelle situazioni ad alto rischio", illu:"dialogo",
  titolo:"Il **buddy**: un collega osserva<br>vestizione e svestizione.",
  sotto:"Epidemie, patogeni altamente trasmissibili."},
{id:"s40", tipo:"frase", tema:"tenue", sopratitolo:"La stessa logica del doppio controllo · lezione 2.6",
  testo:"Legge la sequenza passo per passo e segnala gli errori: **l'occhio esterno vede ciò che chi agisce non vede**."},

{id:"s41", tipo:"figura", tema:"chiaro", sopratitolo:"Lo smaltimento", illu:"rifiuti", lato:"dx",
  titolo:"Rifiuti sanitari pericolosi<br>**a rischio infettivo**.",
  sotto:"I DPI monouso contaminati vanno nel contenitore dedicato."},
{id:"s42", tipo:"trappola", tema:"chiaro", sopratitolo:"Il contenitore · nella stanza o all'uscita · la classificazione nella lezione 4.7", righe:[
  {sb:"Attraversare il reparto con i DPI in mano", ok:"Il contenitore sta **dentro la stanza** o **subito all'uscita**"}]},

{id:"s43", tipo:"frase", tema:"chiaro", sopratitolo:"Il caso d'esame · tubercolosi polmonare bacillifera",
  testo:"Quali DPI, in che ordine, e **dove togli il respiratore?** Precauzioni per via aerea: pressione negativa, porta chiusa."},
{id:"s44", tipo:"percorso", tema:"chiaro", sopratitolo:"Vestizione", tappe:[
  {t:"Igiene delle mani"}, {t:"Camice", d:"se previsto"}, {t:"FFP2", d:"FFP3 se aerosol; fit check", key:true}, {t:"Guanti"}]},
{id:"s45", tipo:"percorso", tema:"chiaro", sopratitolo:"Svestizione · e solo allora il respiratore, dagli elastici", tappe:[
  {t:"Guanti"}, {t:"Camice"}, {t:"Igiene delle mani"}, {t:"Uscita dalla stanza"}, {t:"Porta chiusa"}, {t:"Respiratore", d:"dagli elastici, poi igiene", key:true}]},

{id:"s46", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"In Veneto", celle:[
  {n:"1", t:"**Procedure aziendali** su DPI e vestizione"}, {n:"2", t:"Valutazione dei rischi del **Servizio di Prevenzione e Protezione**", key:true},
  {n:"3", t:"**Formazione e addestramento** obbligatori, **fit test** per i respiratori"}]},
{id:"s47", tipo:"confronto", tema:"chiaro", sopratitolo:"All'orale · collega sempre i DPI a due piani", col:[
  {h:"Tutela del lavoratore", t:"Decreto **81/2008**"},
  {h:"Prevenzione delle ICA", t:"Le precauzioni **standard e aggiuntive**"}]},

{id:"s48", tipo:"colonne", tema:"chiaro", sopratitolo:"Ricapitoliamo · si toccano solo lacci ed elastici", colonne:RECAP},
{id:"s49", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Ricapitoliamo · prossima lezione: come si rendono sicuri gli strumenti", celle:[
  {n:"1", t:"Via aerea: **respiratore fuori dalla stanza**", key:true}, {n:"2", t:"**Chirurgica** protegge gli altri, **FFP** protegge te"},
  {n:"3", t:"**Fit check** a ogni vestizione"}, {n:"4", t:"Pelle con pelle, guanto con guanto"}]},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione",
  titolo:"4.5 Decontaminazione, disinfezione<br>e sterilizzazione", sottotitolo:"Spaulding e la catena della sterilizzazione",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
