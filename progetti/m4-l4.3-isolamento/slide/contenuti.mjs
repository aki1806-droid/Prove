// Contenuto delle 50 scene della lezione 4.3 — precauzioni aggiuntive e
// isolamento. Due corpi nuovi: le colonne (la tabella a tre colonne che lo
// script chiede di «fotografare») e la pressione (le due stanze con le frecce
// dell'aria). Illustrazioni nuove: mascherina, respiratore, camice, cartello,
// fiore, fonendo.

const VIE = [
 {icona:"contatto", t:"Contatto", d:"guanti e camice all'ingresso"}, {icona:"goccia", t:"Droplet", d:"chirurgica entro 1–2 m"},
 {icona:"aerosol", t:"Via aerea", d:"FFP2/3, pressione negativa", key:true},
];
const CONTATTO_Q = [
 {n:"1", t:"**Germi multiresistenti**: MRSA, VRE, enterobatteri resistenti", key:true}, {n:"2", t:"**Clostridioides difficile**"},
 {n:"3", t:"**Scabbia**"}, {n:"4", t:"**Norovirus** e diarree infettive"}, {n:"5", t:"Lesioni cutanee infette non contenibili"},
];
const CONTATTO_C = [
 {illu:"stanza", t:"Stanza singola", d:"o coorte con lo stesso germe"}, {illu:"camice", t:"Guanti e camice", d:"all'ingresso, non al contatto", key:true},
 {illu:"fonendo", t:"Attrezzature dedicate", d:"fonendoscopio, sfigmomanometro, termometro"}, {illu:"acqua", t:"Pulizia rinforzata", d:"il germe vive sulle superfici"},
];
const DROPLET_Q = [
 {n:"1", t:"**Influenza**"}, {n:"2", t:"**Pertosse**"}, {n:"3", t:"**Meningite da meningococco**", key:true},
 {n:"4", t:"**Parotite**"}, {n:"5", t:"**Rosolia**"}, {n:"6", t:"Mycoplasma, difterite faringea"},
];
const AEREA_Q = [
 {n:"1", t:"**Tubercolosi** polmonare o laringea contagiosa", key:true}, {n:"2", t:"**Morbillo**"},
 {n:"3", t:"**Varicella**"}, {n:"4", t:"**Herpes zoster** disseminato"},
];
const TABELLA = [
 {h:"Contatto", voci:[{t:"Germi multiresistenti", d:"MRSA, VRE, CRE"}, {t:"C. difficile"}, {t:"Scabbia"}, {t:"Norovirus"}]},
 {h:"Droplet", voci:[{t:"Influenza"}, {t:"Pertosse"}, {t:"Meningococco"}, {t:"Parotite"}, {t:"Rosolia"}]},
 {h:"Via aerea", key:true, voci:[{t:"Tubercolosi", key:true}, {t:"Morbillo", key:true}, {t:"Varicella", key:true}, {t:"Zoster disseminato"}]},
];
const COME = [
 {h:"Contatto", voci:[{t:"Guanti e camice all'ingresso", key:true}, {t:"Attrezzature dedicate"}, {t:"Stanza singola o coorte"}]},
 {h:"Droplet", voci:[{t:"Mascherina chirurgica entro 1–2 m", key:true}, {t:"Porta anche aperta"}, {t:"Chirurgica al paziente nei trasferimenti"}]},
 {h:"Via aerea", voci:[{t:"Respiratore FFP2 o FFP3", key:true}, {t:"Pressione negativa", key:true}, {t:"Porta chiusa", key:true}]},
];
const STANZE = [
 {t:"Pressione negativa", d:"l'aria entra, non esce: il paziente contagioso per via aerea", verso:"dentro"},
 {t:"Pressione positiva", d:"l'aria esce, non entra: il paziente immunodepresso", verso:"fuori", key:true},
];
const PROTETTIVO = [
 {n:"1", t:"**Stanza singola**, pressione positiva con **filtri HEPA** dove indicato"}, {n:"2", t:"**Igiene delle mani** rigorosissima", key:true},
 {n:"3", t:"**Niente fiori e piante**: veicolano funghi e batteri"}, {n:"4", t:"Visitatori con sintomi: **no**"}, {n:"5", t:"Alimenti secondo le indicazioni"},
];
const SEGNI = [
 {n:"1", t:"**Cartello** sulla porta con il tipo di precauzione", key:true}, {n:"2", t:"**DPI all'ingresso**, prima della soglia"},
 {n:"3", t:"**Informazione** a paziente e visitatori"}, {n:"4", t:"**Avvisare prima** il reparto che riceve il trasferimento"},
];
const COSTO = [
 {t:"Meno visite", d:"e più brevi", key:true}, {t:"Ansia"}, {t:"Depressione"}, {t:"Stigma"}, {t:"Cadute"}, {t:"Lesioni"},
];
const VENETO = [
 {n:"1", t:"**Procedure aziendali**: per ogni microrganismo isolamento, DPI, criteri di sospensione", key:true},
 {n:"2", t:"Stanze a **pressione negativa** individuate per reparto"}, {n:"3", t:"**Notifica** delle malattie infettive al Dipartimento di Prevenzione dell'ULSS"},
];
const MEMO = [
 {n:"1", t:"**Negativa trattiene** dentro, **positiva protegge** l'immunodepresso", key:true},
 {n:"2", t:"Le precauzioni si avviano **sul sospetto**"}, {n:"3", t:"Si sospendono **per criterio**, non a sensazione"},
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 4 · Prevenzione e controllo delle infezioni correlate all'assistenza",
  titolo:"Precauzioni aggiuntive<br>e isolamento", sottotitolo:"4.3 · Contatto, droplet, via aerea: per questa malattia, quali precauzioni?",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"icone", tema:"chiaro", sopratitolo:"Micro-lezione 3 di 8 · quando le precauzioni standard non bastano", voci:VIE},
{id:"s03", tipo:"frase", tema:"chiaro", sopratitolo:"Una tabella a tre colonne",
  testo:"I quiz la interrogano in un solo modo: **«per questa malattia, quali precauzioni?»**"},

{id:"s04", tipo:"catena", tema:"chiaro", sopratitolo:"Il principio è nella parola: aggiuntive", passi:[
  {t:"Precauzioni standard", d:"per tutti"}, {t:"+ misure per via di trasmissione", key:true}, {t:"Precauzioni aggiuntive", d:"si sommano, non sostituiscono"}]},
{id:"s05", tipo:"tre", tema:"chiaro", sopratitolo:"Tre colonne · alcune malattie ne richiedono due insieme", box:[
  {n:"1", t:"Contatto"}, {n:"2", t:"Droplet"}, {n:"3", t:"Via aerea", key:true}]},

{id:"s06", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Precauzioni da contatto · quando", celle:CONTATTO_Q},
{id:"s07", tipo:"gesti", tema:"chiaro", sopratitolo:"Precauzioni da contatto · come", attive:[0,1], voci:CONTATTO_C},
{id:"s08", tipo:"gesti", tema:"chiaro", sopratitolo:"Precauzioni da contatto · come", voci:CONTATTO_C},
{id:"s09", tipo:"titolo", tema:"profondo",
  titolo:"All'**ingresso**,<br>non al contatto.",
  sotto:"Chi indossa i guanti solo quando tocca il paziente ha già toccato la sponda, il comodino, la pompa."},

{id:"s10", tipo:"figura", tema:"chiaro", sopratitolo:"Il caso particolare · Clostridioides difficile", illu:"rubinetto",
  titolo:"Contatto, più **acqua e sapone**.",
  sotto:"Le spore resistono all'alcol: lo sai dalla lezione 3.7."},
{id:"s11", tipo:"tre", tema:"chiaro", sopratitolo:"Il gel alcolico da solo, qui, non basta", box:[
  {n:"1", t:"Contatto", d:"guanti e camice"}, {n:"2", t:"Acqua e sapone", d:"le spore", key:true}, {n:"3", t:"Cloro", d:"disinfezione sporicida"}]},

{id:"s12", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Precauzioni da droplet · quando · malattie che si trasmettono con la tosse, da vicino", celle:DROPLET_Q},
{id:"s13", tipo:"figura", tema:"chiaro", sopratitolo:"Precauzioni da droplet · come", illu:"mascherina",
  titolo:"**Mascherina chirurgica**<br>entro 1–2 metri.",
  sotto:"La distanza che le goccioline percorrono prima di cadere. Stanza singola o coorte."},
{id:"s14", tipo:"gesti", tema:"chiaro", sopratitolo:"In coorte e nei trasferimenti", voci:[
  {illu:"zona", t:"Distanza fra i letti", d:"se in coorte"}, {illu:"mascherina", t:"Chirurgica al paziente", d:"quando si sposta: contiene le sue emissioni", key:true}]},
{id:"s15", tipo:"confronto", tema:"chiaro", sopratitolo:"La porta · vale una domanda", col:[
  {h:"Droplet · aperta", t:"Le goccioline **cadono entro due metri**: non viaggiano nel corridoio"},
  {h:"Via aerea · chiusa", t:"I nuclei **restano sospesi** e viaggiano"}]},

{id:"s16", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Precauzioni per via aerea · quando · l'aria stessa della stanza è il veicolo", celle:AEREA_Q},
{id:"s17", tipo:"pressione", tema:"chiaro", sopratitolo:"Precauzioni per via aerea · come · ricambi d'aria, scarico filtrato, porta sempre chiusa", stanze:[STANZE[0]]},
{id:"s18", tipo:"figura", tema:"chiaro", sopratitolo:"Prima di entrare", illu:"respiratore", lato:"dx",
  titolo:"**Respiratore FFP2 o FFP3**,<br>non una mascherina chirurgica.",
  sotto:"Il paziente, nei trasferimenti, indossa la chirurgica."},
{id:"s19", tipo:"titolo", tema:"profondo",
  titolo:"Pressione negativa, porta chiusa,<br>**respiratore**.",
  sotto:"Tre elementi: se ne manca uno, l'isolamento per via aerea non c'è."},

{id:"s20", tipo:"gesti", tema:"chiaro", sopratitolo:"Il dettaglio che confonde di più · chi indossa che cosa", voci:[
  {illu:"respiratore", t:"L'operatore", d:"respiratore FFP", key:true}, {illu:"mascherina", t:"Il paziente", d:"mascherina chirurgica"}]},
{id:"s21", tipo:"confronto", tema:"chiaro", sopratitolo:"Fanno cose diverse", col:[
  {h:"Respiratore FFP", t:"Protegge **chi lo indossa** dall'inalazione: sigilla"},
  {h:"Mascherina chirurgica", t:"Protegge **gli altri** dalle emissioni di chi la indossa: non sigilla"}]},
{id:"s22", tipo:"frase", tema:"chiaro", sopratitolo:"Lo vedremo meglio nella lezione 4.4",
  testo:"Al paziente contagioso che si sposta serve **contenere le proprie emissioni**: la chirurgica basta, ed è più tollerata."},

{id:"s23", tipo:"figura", tema:"chiaro", sopratitolo:"Morbillo e varicella · dove possibile", illu:"scudo",
  titolo:"Personale **immune**.",
  sotto:"Per vaccinazione o malattia pregressa: gli operatori suscettibili, se possibile, non entrano."},
{id:"s24", tipo:"catena", tema:"chiaro", sopratitolo:"La varicella · l'esempio classico di doppia precauzione", passi:[
  {t:"Via aerea"}, {t:"+ Contatto", key:true}, {t:"Fino alla crosta", d:"di tutte le lesioni"}]},

{id:"s25", tipo:"colonne", tema:"chiaro", sopratitolo:"La tabella da fotografare", attive:[0,1], colonne:TABELLA},
{id:"s26", tipo:"colonne", tema:"chiaro", sopratitolo:"Via aerea: quattro, e TBC, morbillo e varicella sono le tre che i quiz chiedono quasi sempre", colonne:TABELLA},

{id:"s27", tipo:"pressione", tema:"chiaro", sopratitolo:"La pressione della stanza · l'errore di inversione è frequentissimo", attive:[0], stanze:STANZE},
{id:"s28", tipo:"pressione", tema:"chiaro", sopratitolo:"Negativa: si protegge l'esterno dal paziente · positiva: l'aria esce, non entra", stanze:STANZE},
{id:"s29", tipo:"pressione", tema:"chiaro", sopratitolo:"Positiva: si protegge il paziente dall'esterno · stessa porta chiusa, ventilatore nella direzione opposta", stanze:STANZE},
{id:"s30", tipo:"titolo", tema:"profondo",
  titolo:"Negativo **trattiene dentro**,<br>positivo **tiene fuori**.",
  sotto:"La negativa aspira, la positiva soffia. Chi ha in mente le frecce dell'aria non sbaglia più."},

{id:"s31", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, attive:[0,1], sopratitolo:"L'isolamento protettivo · neutropenia grave, trapianto di midollo", celle:PROTETTIVO},
{id:"s32", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"L'isolamento protettivo, o inverso", celle:PROTETTIVO},
{id:"s33", tipo:"figura", tema:"chiaro", sopratitolo:"Qui la logica si rovescia", illu:"fiore", lato:"dx",
  titolo:"Il pericolo non è il paziente:<br>**sono tutti gli altri**.",
  sotto:"Il fiore sul comodino, il visitatore con il raffreddore, la mano non igienizzata di chi entra."},

{id:"s34", tipo:"frase", tema:"chiaro", sopratitolo:"La coorte · quando le stanze singole non bastano",
  testo:"Nella stessa stanza, pazienti colonizzati o infetti dallo **stesso microrganismo**, con le stesse precauzioni per tutti."},
{id:"s35", tipo:"trappola", tema:"chiaro", sopratitolo:"E nelle epidemie, coorte anche del personale: gli stessi operatori agli stessi pazienti", righe:[
  {sb:"Germi diversi nella stessa stanza", ok:"**No**: stesso microrganismo"},
  {sb:"Un infetto con un sospetto", ok:"**No**: il sospetto potrebbe non averlo"}]},

{id:"s36", tipo:"sostituzione", tema:"chiaro", sopratitolo:"Un principio che vale una risposta intera · l'isolamento empirico",
  da:{h:"Aspetto", t:"la conferma di laboratorio"}, a:{h:"Avvio", t:"sul sospetto clinico"},
  sotto:"Le precauzioni si avviano sul sospetto, non sul referto."},
{id:"s37", tipo:"bivio", tema:"chiaro", sopratitolo:"Subito", radice:"Il sospetto clinico",
  rami:[{q:"diarrea acuta infettiva?", t:"Contatto", d:"subito"}, {q:"tosse, febbre, dimagrimento, infiltrato apicale", t:"Via aerea", d:"subito", key:true}]},
{id:"s38", tipo:"titolo", tema:"profondo",
  titolo:"Si parte **dal sospetto**.",
  sotto:"Aspettare il referto espone per giorni pazienti e colleghi. Se il referto è negativo, si sospende: costa meno di un'epidemia."},

{id:"s39", tipo:"figura", tema:"chiaro", sopratitolo:"L'isolamento funziona solo se tutti lo sanno", illu:"cartello",
  titolo:"**Segnaletica** sulla porta,<br>DPI all'ingresso.",
  sotto:"Chi arriva sa che cosa indossare, prima della soglia."},
{id:"s40", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Segnaletica e informazione", celle:SEGNI},

{id:"s41", tipo:"figura", tema:"chiaro", sopratitolo:"Un aspetto che i candidati migliori citano · il costo umano", illu:"persona", lato:"dx",
  titolo:"I pazienti isolati ricevono<br>**meno visite**, e più brevi.",
  sotto:"Lo mostrano gli studi osservazionali."},
{id:"s42", tipo:"raggiera", tema:"chiaro", sopratitolo:"La porta chiusa protegge il reparto, ma isola la persona", centro:"Isolato", raggi:COSTO},
{id:"s43", tipo:"frase", tema:"tenue", sopratitolo:"La risposta professionale",
  testo:"Lo **stesso standard** di assistenza e di relazione, e il senso delle misure spiegato. Isolato il germe, **non la persona**."},

{id:"s44", tipo:"confronto", tema:"chiaro", sopratitolo:"Quando si sospende · secondo la procedura aziendale e il microrganismo", col:[
  {h:"Criteri clinici", t:"La **fine dei sintomi**"},
  {h:"Criteri microbiologici", t:"I **tamponi negativi**"}]},
{id:"s45", tipo:"trappola", tema:"chiaro", sopratitolo:"Entrambe le cose hanno un costo · la data di rivalutazione va scritta", righe:[
  {sb:"Sospendere «a sensazione»", ok:"Costa al **reparto**"},
  {sb:"Prolungare per abitudine", ok:"Costa alla **persona**"}]},

{id:"s46", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"In Veneto", celle:VENETO},
{id:"s47", tipo:"figura", tema:"chiaro", sopratitolo:"Un aggancio utile per tubercolosi e meningite", illu:"telefono", lato:"dx",
  titolo:"La **notifica** al Dipartimento<br>di Prevenzione dell'ULSS.",
  sotto:"Che attiva le misure per i contatti."},

{id:"s48", tipo:"colonne", tema:"chiaro", sopratitolo:"Ricapitoliamo · come", colonne:COME},
{id:"s49", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"Ricapitoliamo · prossima lezione: come si indossano e come si tolgono i DPI", celle:MEMO},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione",
  titolo:"4.4 DPI: scelta, vestizione<br>e svestizione", sottotitolo:"Mascherina e respiratore, le classi FFP,<br>e il momento in cui ci si contamina",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
