// Contenuto delle 46 scene della lezione 1.4. *accento*  **accento in semibold**
//
// Corso «Progressione verticale · Comparto Sanità», Modulo 1 (D.Lgs. 502/1992,
// artt. 8-bis/8-quinquies dal D.Lgs. 229/1999). Il visual chiave è la scala
// delle tre A: la stessa figura torna con il gradino attivo che sale.

const ENTE = "CISL FP Padova Rovigo · Progressione verticale · Comparto Sanità";

const TRE_A = [
 {n:"1", t:"Autorizzazione", d:"puoi curare"},
 {n:"2", t:"Accreditamento", d:"potresti curare per il SSN"},
 {n:"3", t:"Accordo contrattuale", d:"curi per il SSN, e quanto", key:true},
];

const CONFRONTO_A = {
 colonne:["22%","26%","26%","26%"],
 intestazioni:["", "Autorizzazione", "Accreditamento", "Accordo"],
 righe:[
  ["Chi la dà",   "Comune e Regione", "Regione", "Regione o ASL"],
  ["Requisiti",   "**minimi**", "**ulteriori** + programmazione", "volumi, tariffe, tetti"],
  ["Che cosa dà", "si può esercitare", "si può essere scelti", "si viene **pagati**"],
 ],
};

const TRE_COSE = [
 "**Le tre A**, in ordine: autorizzazione, accreditamento, accordi — artt. 8-bis/8-quinquies, **D.Lgs. 229/1999**",
 "Autorizzazione: requisiti **minimi** — accreditamento: requisiti **ulteriori** + programmazione",
 "Solo l'**accordo** dà diritto alla remunerazione, entro **volumi e tetti**",
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 1 · Legislazione sanitaria nazionale",
  titolo:"Accreditamento<br>e libertà di scelta", sottotitolo:"Lezione 1.4", ente:ENTE},

// --- 1 · aggancio
{id:"s02", tipo:"confronto", tema:"chiaro", sopratitolo:"Una risonanza magnetica", col:[
  {h:"Ospedale pubblico", t:"paghi **il ticket**", grande:true},
  {h:"Clinica privata", t:"paghi **il ticket**", grande:true}],
  sotto:"Come è possibile?"},
{id:"s03", tipo:"tre", tema:"chiaro", sopratitolo:"Il sistema delle tre A", box:[
  {n:"A", t:"Autorizzazione"}, {n:"A", t:"Accreditamento"}, {n:"A", t:"Accordi contrattuali"}]},
{id:"s04", tipo:"titolo", tema:"profondo",
  titolo:"Filtri successivi:<br>ogni A è un gradino<br>**più stretto**."},

// --- 2 · rotta
{id:"s05", tipo:"elenco", tema:"chiaro", numerato:true, grandi:true, sopratitolo:"Tre passaggi", voci:[
  {t:"La storia: dal **1992** al **1999**"},
  {t:"Le **tre A**, una per una"},
  {t:"La **libertà di scelta**, con i suoi confini"}]},

// --- 3 · dal 1992 al 1999
{id:"s06", tipo:"norma", tema:"chiaro", etichetta:"D.Lgs. 502/1992", sigla:"1992",
  testo:"Accreditamento e **libertà di scelta**: pubblico e privato sullo stesso piano."},
{id:"s07", tipo:"frase", tema:"chiaro", sopratitolo:"I primi anni",
  testo:"Un accreditamento **largo**, e provvisorio per i vecchi convenzionati.",
  sotto:"La spesa per il privato cresce senza una vera programmazione."},
{id:"s08", tipo:"catena", tema:"chiaro", sopratitolo:"Il motivo, in un sistema pagato a prestazione", passi:[
  {t:"Più strutture accreditate"}, {t:"Più offerta"}, {t:"Più domanda"},
  {t:"Più prestazioni da pagare", key:true}]},
{id:"s09", tipo:"assetempo", tema:"chiaro", sopratitolo:"La svolta",
  da:1990, a:2001, decenni:[1990,2000], tappe:[
  {anno:1992, et:"D.Lgs. 502 — accreditamento e libera scelta"},
  {anno:1999, et:"D.Lgs. 229 — le tre A (artt. 8-bis/8-quinquies)", key:true}]},
{id:"s10", tipo:"titolo", tema:"profondo",
  titolo:"Il privato entra,<br>ma **dentro la programmazione**.",
  sotto:"Non basta essere bravi: bisogna servire."},

// --- 4 · autorizzazione
{id:"s11", tipo:"scala", tema:"chiaro", attive:[0], sopratitolo:"Primo gradino", gradini:TRE_A},
{id:"s12", tipo:"confronto", tema:"chiaro", sopratitolo:"Le autorizzazioni sono due", col:[
  {h:"Alla realizzazione", t:"costruire, ampliare, **trasformare** la struttura"},
  {h:"All'esercizio", t:"**svolgere** l'attività sanitaria"}]},
{id:"s13", tipo:"albero", tema:"chiaro", sopratitolo:"Chi decide",
  radice:"**Autorizzazione**", rami:[
  {cond:"realizzazione", esito:"**Comune**<br>dopo la verifica di compatibilità della Regione"},
  {cond:"esercizio", esito:"**Regione**"}]},
{id:"s14", tipo:"tre", tema:"chiaro", sopratitolo:"I requisiti minimi", box:[
  {t:"Strutturali"}, {t:"Tecnologici"}, {t:"Organizzativi"}]},
{id:"s15", tipo:"norma", tema:"chiaro", etichetta:"Decreto del Presidente della Repubblica", sigla:"14/1/1997",
  testo:"I **requisiti minimi** nazionali, integrati da ogni Regione."},
{id:"s16", tipo:"frase", tema:"chiaro", sopratitolo:"Solo autorizzata",
  testo:"Una clinica **solo autorizzata** lavora in regime privato.",
  sotto:"Paga il paziente, o la sua assicurazione."},

// --- 5 · accreditamento
{id:"s17", tipo:"scala", tema:"chiaro", attive:[0,1], sopratitolo:"Secondo gradino", gradini:TRE_A},
{id:"s18", tipo:"tre", tema:"chiaro", sopratitolo:"Due condizioni per l'accreditamento", box:[
  {n:"1", t:"Requisiti ulteriori", d:"di qualità, più alti di quelli minimi"},
  {n:"2", t:"Funzionalità alla programmazione", d:"serve al territorio?", key:true}]},
{id:"s19", tipo:"frase", tema:"chiaro", sopratitolo:"La condizione decisiva",
  testo:"Eccellente, ma **non serve**: niente accreditamento.",
  sotto:"Se i posti letto di ortopedia sono già sufficienti, una nuova clinica ortopedica resta fuori."},
{id:"s20", tipo:"catena", tema:"chiaro", sopratitolo:"Non è per sempre", passi:[
  {t:"Accreditamento"}, {t:"Verifica periodica", d:"attività e risultati"},
  {t:"Sospensione o revoca", d:"se i requisiti mancano", key:true}]},
{id:"s21", tipo:"icone", tema:"chiaro", sopratitolo:"La verifica", voci:[
  {icona:"occhio", t:"Un **organismo tecnico** regionale"},
  {icona:"ospedale", t:"Visita la struttura"},
  {icona:"spunta", t:"Controlla i requisiti **sul posto**"}]},
{id:"s22", tipo:"sostituzione", tema:"chiaro", sopratitolo:"L'accreditamento è una patente",
  da:{h:"Non è", t:"un lavoro da autista"},
  a:{h:"È", t:"l'**abilitazione** a guidare per il SSN"}},
{id:"s23", tipo:"trappola", tema:"tenue", sopratitolo:"La trappola più frequente", righe:[
  {sb:"Accreditata = pagata dal servizio pubblico",
   ok:"L'accreditamento non obbliga a remunerare le prestazioni fuori dagli accordi"}]},

// --- 6 · accordi contrattuali
{id:"s24", tipo:"scala", tema:"chiaro", attive:[0,1,2], sopratitolo:"Terzo gradino", gradini:TRE_A},
{id:"s25", tipo:"confronto", tema:"chiaro", sopratitolo:"Due parole diverse", col:[
  {h:"Strutture pubbliche ed equiparate", t:"**accordi**", grande:true},
  {h:"Privati", t:"**contratti**", grande:true}]},
{id:"s26", tipo:"frase", tema:"chiaro", sopratitolo:"Chi li definisce",
  testo:"La **Regione** o l'**ASL**, sul fabbisogno del territorio.",
  sotto:"Uno strumento per governare la spesa, non solo per comprare."},
{id:"s27", tipo:"griglia", tema:"chiaro", colonne:2, sopratitolo:"Che cosa fissa l'accordo", celle:[
  {t:"Quali **prestazioni**"}, {t:"In quale **volume**"},
  {t:"Con quali **tariffe**"}, {t:"Con quali requisiti di **qualità**"},
  {t:"Un **tetto di spesa**"}]},
{id:"s28", tipo:"scadenza", tema:"chiaro", sopratitolo:"Il tetto di spesa",
  max:130, banda:[0,100], inizio:"prestazioni erogate", fine:"",
  tappe:[{a:100, v:"tetto", t:"oltre: **non pagate**, o a tariffa ridotta", key:true}]},
{id:"s29", tipo:"confronto", tema:"chiaro", sopratitolo:"Tariffe regionali, uguali per pubblico e privato", col:[
  {h:"Cambia", t:"**chi** eroga la prestazione", grande:true},
  {h:"Non cambia", t:"quanto **costa** al servizio sanitario", grande:true}]},
{id:"s30", tipo:"tabella", tema:"chiaro", sopratitolo:"Le tre A in fila", ...CONFRONTO_A, chiave:[2]},

// --- 7 · il privato accreditato
{id:"s31", tipo:"frase", tema:"chiaro", sopratitolo:"Il privato accreditato",
  testo:"È **parte del sistema**: eroga per conto del SSN.",
  sotto:"Alle stesse condizioni per il cittadino."},
{id:"s32", tipo:"norma", tema:"chiaro", etichetta:"Il principio", sigla:"Equiparazione",
  testo:"Pubblico e privato accreditato: **stesso piano, stesse regole**."},
{id:"s33", tipo:"confronto", tema:"chiaro", sopratitolo:"Chi vede la differenza", col:[
  {h:"Il paziente", t:"prenota, paga il ticket, riceve: **nessuna differenza**"},
  {h:"La Regione", t:"deve governare un **sistema misto**"}]},
{id:"s34", tipo:"griglia", tema:"chiaro", colonne:3, sopratitolo:"Gli obblighi di chi ha un accordo", celle:[
  {t:"Modalità di **accesso** fissate dalla Regione"}, {t:"Trasmettere i **dati**"},
  {t:"Accettare i **controlli**"}]},
{id:"s35", tipo:"norma", tema:"chiaro", etichetta:"Nel Veneto", sigla:"L.R. 56/1994",
  testo:"Il rapporto con il privato: lo vedremo nel **modulo 3**."},

// --- 8 · la libertà di scelta
{id:"s36", tipo:"frase", tema:"chiaro", sopratitolo:"La libertà di scelta",
  testo:"Strutture pubbliche e private accreditate **con accordo contrattuale**."},
{id:"s37", tipo:"perimetro", tema:"chiaro", sopratitolo:"Una scelta dentro un perimetro",
  sx:"Fuori", atti:["Solo autorizzate", "Accreditate senza accordo"],
  dx:"Dentro", voci:["Strutture pubbliche", "Private accreditate **con accordo**"]},
{id:"s38", tipo:"frase", tema:"chiaro", sopratitolo:"Il quasi-mercato, in concreto",
  testo:"Se il cittadino sceglie, **i soldi seguono il cittadino**."},
{id:"s39", tipo:"catena", tema:"chiaro", sopratitolo:"Anche fuori Regione", passi:[
  {t:"Il cittadino si cura altrove"}, {t:"La struttura eroga"},
  {t:"Paga la Regione di residenza", d:"mobilità sanitaria", key:true}]},
{id:"s40", tipo:"trappola", tema:"tenue", sopratitolo:"Il distrattore", righe:[
  {sb:"La libera scelta vale verso qualunque struttura privata",
   ok:"Solo verso le accreditate con accordo contrattuale"}]},

// --- 9 · le tre cose
{id:"s41", tipo:"memo", tema:"chiaro", attive:[0], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s42", tipo:"memo", tema:"chiaro", attive:[0,1], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s43", tipo:"memo", tema:"chiaro", attive:[0,1,2], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s44", tipo:"trappola", tema:"tenue", sopratitolo:"Un'ultima trappola, sulle parole", righe:[
  {sb:"Contratti con le strutture pubbliche, accordi con i privati",
   ok:"Accordi con le strutture pubbliche, contratti con i privati"}]},

// --- 10 · chiusura
{id:"s45", tipo:"titolo", tema:"profondo",
  titolo:"Tre filtri,<br>dal più largo al più stretto.",
  sotto:"E un cittadino che sceglie dentro il perimetro."},

{id:"s46", tipo:"copertina", tema:"profondo", modulo:"Prossima lezione",
  titolo:"1.5", sottotitolo:"I livelli essenziali<br>di assistenza", ente:ENTE},
];
