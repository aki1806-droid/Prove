// Contenuto delle 50 scene della lezione 11.1 — l'anziano fragile. Fried è
// una griglia di cinque criteri; la VMD sei dimensioni che si accendono;
// le tre D un confronto a tre colonne ripetuto; il delirium ipoattivo è la
// trappola della lezione.

const VMD = (ks) => [
  {n:"1", t:"**Clinica**: patologie, farmaci", key:ks.includes(0)}, {n:"2", t:"**Funzionale**: ADL, IADL, Barthel", key:ks.includes(1)},
  {n:"3", t:"**Cognitiva**: Mini Mental", key:ks.includes(2)}, {n:"4", t:"**Affettiva**: GDS", key:ks.includes(3)},
  {n:"5", t:"**Nutrizionale**: MNA", key:ks.includes(4)}, {n:"6", t:"**Sociale** e ambientale", key:ks.includes(5)}];

const TRED = (k) => [
  {n:"1", t:"Delirium", d:"esordio **acuto** · fluttuante · attenzione compromessa · spesso reversibile", key:k===0},
  {n:"2", t:"Demenza", d:"esordio **insidioso** · progressiva · attenzione conservata all'inizio", key:k===1},
  {n:"3", t:"Depressione", d:"esordio subacuto · simula un deficit · **trattabile**", key:k===2}];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 11 · Setting assistenziali e ciclo di vita",
  titolo:"L'anziano fragile", sottotitolo:"11.1 · Fragilità, valutazione multidimensionale, sindromi geriatriche, delirium",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"frase", tema:"chiaro", sopratitolo:"Micro-lezione 1 di 8 · i momenti della vita, i luoghi di cura",
  testo:"Si comincia dall'**anziano fragile**."},
{id:"s03", tipo:"frase", tema:"chiaro", sopratitolo:"In Veneto, una delle regioni più longeve d'Italia, ancora di più",
  testo:"La persona assistita **più frequente**, in ospedale e sul territorio."},
{id:"s04", tipo:"griglia", tema:"chiaro", colonne:4, spunta:false, sopratitolo:"Il punto d'incontro di molto di ciò che abbiamo studiato · intorno alla stessa persona", celle:[
  {n:"1", t:"Cadute"}, {n:"2", t:"**Delirium**", key:true}, {n:"3", t:"Malnutrizione"}, {n:"4", t:"Politerapia"}]},

{id:"s05", tipo:"catena", tema:"chiaro", sopratitolo:"L'invecchiamento · la riserva funzionale si riduce", passi:[
  {t:"A riposo, tutto funziona"}, {t:"Sotto stress", key:true}, {t:"Il margine è minore"}]},
{id:"s06", tipo:"catena", tema:"chiaro", sopratitolo:"La fragilità · aumentata vulnerabilità", passi:[
  {t:"Un evento minore: infezione urinaria, farmaco nuovo, ricovero"}, {t:"Un peggioramento sproporzionato", key:true}, {t:"Non cammina più"}]},
{id:"s07", tipo:"titolo", tema:"profondo",
  titolo:"Età<br>**non significa fragilità**.",
  sotto:""},
{id:"s08", tipo:"confronto", tema:"chiaro", sopratitolo:"Conta come la persona risponde a uno stress, non la data di nascita", col:[
  {h:"Novantenni", t:"**robusti**"}, {h:"Settantenni", t:"**fragili**", key:true}]},

{id:"s09", tipo:"griglia", tema:"chiaro", colonne:5, spunta:false, sopratitolo:"I criteri di Fried", celle:[
  {n:"1", t:"**Calo di peso** involontario"}, {n:"2", t:"**Astenia**"}, {n:"3", t:"Forza di **presa** ridotta"}, {n:"4", t:"**Velocità** del cammino ridotta"}, {n:"5", t:"Attività fisica ridotta"}]},
{id:"s10", tipo:"confronto", tema:"chiaro", sopratitolo:"Forza e velocità: gli stessi indicatori della sarcopenia, lezione 3.3", col:[
  {h:"1 o 2 criteri", t:"**pre-fragile**"}, {h:"3 o più", t:"**fragile**", key:true}]},
{id:"s11", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"In parte reversibile · riconoscerla presto conta", celle:[
  {t:"**Attività fisica**", key:true}, {t:"**Nutrizione**"}, {t:"Revisione dei **farmaci**"}]},

{id:"s12", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"La valutazione multidimensionale, VMD · la persona, non solo la malattia", celle:VMD([])},
{id:"s13", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Le scale della lezione 2.3", celle:VMD([0,1,2])},
{id:"s14", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Chi c'è accanto, com'è la casa, quali risorse ci sono", celle:VMD([3,4,5])},
{id:"s15", tipo:"norma", tema:"chiaro", etichetta:"Unità di Valutazione Multidimensionale Distrettuale", sigla:"UVMD · SVaMA",
  testo:"La valutazione per l'**accesso ai servizi**."},

{id:"s16", tipo:"frase", tema:"chiaro", sopratitolo:"Frequenti, multifattoriali · non si curano con un farmaco: si gestiscono con l'assistenza",
  testo:"Le **sindromi geriatriche** non corrispondono a una singola malattia."},
{id:"s17", tipo:"griglia", tema:"chiaro", colonne:4, spunta:false, sopratitolo:"Le hai incontrate tutte nei moduli 2 e 3", celle:[
  {n:"·", t:"Cadute"}, {n:"·", t:"**Delirium**", key:true}, {n:"·", t:"Incontinenza"}, {n:"·", t:"Lesioni da pressione"},
  {n:"·", t:"Malnutrizione, disfagia"}, {n:"·", t:"Immobilità"}, {n:"·", t:"Polifarmacoterapia"}, {n:"·", t:"Deficit sensoriali"}]},
{id:"s18", tipo:"catena", tema:"chiaro", sopratitolo:"Si influenzano a vicenda · si agisce su più fattori insieme", passi:[
  {t:"Il farmaco favorisce la caduta"}, {t:"La caduta l'immobilità", key:true}, {t:"L'immobilità la lesione"}]},

{id:"s19", tipo:"tre", tema:"chiaro", sopratitolo:"Le tre D · una domanda frequente · cambiano il modo di assistere", box:TRED(-1)},
{id:"s20", tipo:"tre", tema:"chiaro", sopratitolo:"In ore o giorni · coscienza alterata", box:TRED(0)},
{id:"s21", tipo:"tre", tema:"chiaro", sopratitolo:"In mesi o anni · la prossima lezione", box:TRED(1)},
{id:"s22", tipo:"tre", tema:"chiaro", sopratitolo:"Possono coesistere · il delirium è molto più frequente in chi ha già una demenza", box:TRED(2)},

{id:"s23", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Il delirium · tre forme", celle:[
  {n:"↑", t:"**Iperattivo**: agitazione, irrequietezza · si nota, e porta a sedare o contenere", key:true}, {n:"↓", t:"Ipoattivo"}, {n:"↕", t:"Misto"}]},
{id:"s24", tipo:"trappola", tema:"chiaro", sopratitolo:"Ipoattivo: sonnolenza, apatia, rallentamento · il più spesso non riconosciuto", righe:[
  {sb:"Tranquillo e sonnolento: «buono»", ok:"Può essere **delirium**"}]},
{id:"s25", tipo:"griglia", tema:"chiaro", colonne:5, spunta:false, sopratitolo:"Si riconosce con la CAM, lezione 2.3 · un'emergenza medica: qualcosa non va", celle:[
  {n:"·", t:"Infezione", key:true}, {n:"·", t:"Farmaci"}, {n:"·", t:"Ritenzione"}, {n:"·", t:"Disidratazione"}, {n:"·", t:"Dolore"}]},

{id:"s26", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"La prevenzione · in gran parte infermieristica, non farmacologica", celle:[
  {t:"Un **orologio** visibile"}, {t:"Un **calendario**"}, {t:"Presentarsi **per nome**, a ogni contatto", key:true}]},
{id:"s27", tipo:"frase", tema:"chiaro", sopratitolo:"Non vede, non sente, ambiente sconosciuto: un candidato al delirium",
  testo:"**Occhiali** e **apparecchi acustici**, indossati."},
{id:"s28", tipo:"griglia", tema:"chiaro", colonne:4, spunta:true, sopratitolo:"Ed evitare la contenzione, che lo peggiora", celle:[
  {t:"Sonno protetto"}, {t:"**Mobilizzazione** precoce"}, {t:"Idratazione, dolore"}, {t:"Stipsi, ritenzione"},
  {t:"Via i **cateteri** inutili"}, {t:"I **familiari** presenti", key:true}]},

{id:"s29", tipo:"cifre", tema:"chiaro", sopratitolo:"La polifarmacoterapia · prescrittori diversi · interazioni e reazioni avverse", voci:[
  {n:"≥ 5", suf:"", d:"farmaci", key:true}]},
{id:"s30", tipo:"norma", tema:"chiaro", etichetta:"Potenzialmente inappropriati nell'anziano · lezione 5.1", sigla:"Criteri di Beers",
  testo:"**Benzodiazepine**, **anticolinergici**, alcuni antipsicotici."},
{id:"s31", tipo:"catena", tema:"chiaro", sopratitolo:"Cadute, delirium, stipsi, ipotensione · da qui la deprescrizione", passi:[
  {t:"Un farmaco nuovo"}, {t:"Un sintomo nuovo"}, {t:"L'infermiere **segnala** il legame", key:true}]},

{id:"s32", tipo:"frase", tema:"chiaro", sopratitolo:"Un concetto che all'orale distingue",
  testo:"Il **paradosso del ricovero**: cura la malattia, ma può causare un **declino funzionale**."},
{id:"s33", tipo:"griglia", tema:"chiaro", colonne:4, spunta:false, sopratitolo:"Molti escono meno autonomi di come sono entrati", celle:[
  {n:"·", t:"Immobilità a letto"}, {n:"·", t:"Delirium"}, {n:"·", t:"Malnutrizione"}, {n:"·", t:"Abitudini perse"}]},
{id:"s34", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"Mantenere l'autonomia residua · e una dimissione precoce", celle:[
  {t:"**Camminare**", key:true}, {t:"Mangiare **seduto**"}, {t:"Andare in **bagno**"}]},

{id:"s35", tipo:"cifre", tema:"chiaro", sopratitolo:"Il caso · ricoverata per infezione urinaria · secondo giorno: sonnolenta, mangia poco", voci:[
  {n:"84", suf:"anni", d:"anziana", key:true}]},
{id:"s36", tipo:"frase", tema:"chiaro", sopratitolo:"Che cosa pensi? Delirium ipoattivo, finché non si dimostra il contrario",
  testo:"«A casa **non era così**»."},
{id:"s37", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"Che cosa fai? · e segnali al medico", celle:[
  {t:"**CAM**", key:true}, {t:"Parametri, **glicemia**, saturazione"}, {t:"Ritenzione, stipsi, idratazione, **farmaci** recenti"}]},
{id:"s38", tipo:"trappola", tema:"chiaro", sopratitolo:"Poi la prevenzione: occhiali, apparecchi, orientamento, familiari, mobilizzazione", righe:[
  {sb:"La frase dei familiari è un dettaglio", ok:"È il **dato più importante** del caso"}]},

{id:"s39", tipo:"norma", tema:"chiaro", etichetta:"In Veneto · per la non autosufficienza", sigla:"UVMD",
  testo:"Il **cancello di accesso** ai servizi: con la SVaMA definisce il percorso."},
{id:"s40", tipo:"percorso", tema:"chiaro", sopratitolo:"Lezione 11.7 · una popolazione fra le più anziane d'Italia", tappe:[
  {t:"Domicilio", d:"con assistenza"}, {t:"Centro diurno", d:""}, {t:"Centro di Servizi", d:""}], attive:[0,1,2]},

{id:"s41", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"La tabella", celle:[
  {n:"!", t:"Fragilità **non è età**", key:true}, {n:"F", t:"**Fried**: da 3 criteri, fragile"}, {n:"6", t:"**VMD** in sei dimensioni · UVMD, SVaMA"}]},
{id:"s42", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"La tabella", celle:[
  {n:"S", t:"**Sindromi geriatriche**: si influenzano"}, {n:"D", t:"**Delirium**: acuto, fluttuante, attenzione"}, {n:"↓", t:"L'**ipoattivo**, il meno riconosciuto", key:true}]},

{id:"s43", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"La comunicazione · molti anziani leggono le labbra", celle:[
  {t:"**Presentarsi**"}, {t:"Parlare **di fronte**, con la luce sul proprio volto", key:true}]},
{id:"s44", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"La lentezza non è confusione", celle:[
  {t:"Voce **chiara**, non più forte"}, {t:"Frasi brevi"}, {t:"Apparecchi e occhiali"}, {t:"Il **tempo** di rispondere", key:true}]},
{id:"s45", tipo:"trappola", tema:"chiaro", sopratitolo:"Il nome, e il lei, se è così che la persona vuole", righe:[
  {sb:"Chiamarlo «nonno»", ok:"Non infantilizzare: lede la **dignità**"}]},

{id:"s46", tipo:"titolo", tema:"profondo",
  titolo:"Nell'anziano fragile,<br>un cambiamento improvviso<br>**è un sintomo**.",
  sotto:""},
{id:"s47", tipo:"griglia", tema:"chiaro", colonne:4, spunta:false, sopratitolo:"Dietro c'è quasi sempre una causa · il familiare è spesso il primo ad accorgersene", celle:[
  {n:"·", t:"Confusione nuova", key:true}, {n:"·", t:"Una caduta"}, {n:"·", t:"Rifiuto del cibo"}, {n:"·", t:"Incontinenza nuova"}]},
{id:"s48", tipo:"frase", tema:"chiaro", sopratitolo:"Nella prossima lezione · gli approcci non farmacologici vengono prima",
  testo:"Le **demenze**, e i disturbi del comportamento."},
{id:"s49", tipo:"frase", tema:"chiaro", sopratitolo:"Spesso un familiare, a volte anziano a sua volta",
  testo:"E il sostegno a **chi assiste**."},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione",
  titolo:"11.2<br>Demenze e<br>disturbi cognitivi", sottotitolo:"I disturbi del comportamento e chi assiste",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
