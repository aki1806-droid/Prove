// Contenuto delle 50 scene della lezione 12.7 — qualità, accreditamento e governo clinico.
// Donabedian è una triade; il PDCA un ciclo; l'audit un percorso; il caso d'esame
// tre box che si accendono uno alla volta; autorizzazione → accreditamento una scala.

const PUNTI = [
  {n:"1", t:"Tecnico-professionale", d:"le cose giuste nel modo giusto"},
  {n:"2", t:"Organizzativa"},
  {n:"3", t:"Percepita", d:"dal paziente: questionari di gradimento o di esperienza", key:true}];

const DONABEDIAN = [
  {t:"Struttura", d:"personale, ambienti, tecnologie, organizzazione"},
  {t:"Processo", d:"le attività svolte: come si lavora"},
  {t:"Esito", d:"il risultato di salute · outcome", key:true}];

const PDCA = [
  {t:"Plan", d:"problema, obiettivo, azioni"}, {t:"Do", d:"realizzare"},
  {t:"Check", d:"verificare con gli indicatori"}, {t:"Act", d:"standardizzare o correggere", key:true}];

const GOVERNO = [
  {t:"Linee guida"}, {t:"Audit"}, {t:"Rischio"}, {t:"ECM"},
  {t:"Indicatori"}, {t:"Pazienti"}, {t:"HTA", key:true}];

const AUDIT = [
  {t:"Tema e standard"}, {t:"Raccolta dei dati"}, {t:"Confronto", d:"con lo standard"},
  {t:"Azioni", d:"di miglioramento"}, {t:"Re-audit", d:"il cambiamento c'è stato?", key:true}];

const CADUTE = [
  {n:"S", t:"Struttura", d:"letti ad altezza variabile, campanelli a portata di mano"},
  {n:"P", t:"Processo", d:"% valutati con una scala del rischio entro 24 ore"},
  {n:"E", t:"Esito", d:"cadute per 1.000 giornate di degenza · cadute con danno", key:true}];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 12 · Organizzazione, normativa e sicurezza",
  titolo:"Qualità, accreditamento<br>e governo clinico", sottotitolo:"12.7 · Donabedian, PDCA, indicatori, accreditamento, audit e HTA",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"frase", tema:"chiaro", sopratitolo:"Micro-lezione 7 di 8 · come si misura, e come si migliora",
  testo:"Che cosa significa che un ospedale lavora **bene**?"},
{id:"s03", tipo:"griglia", tema:"chiaro", colonne:3, sopratitolo:"In questa lezione · concetti che ritrovi nei quiz", celle:[
  {n:"1", t:"I modelli della **qualità**"}, {n:"2", t:"Il **miglioramento continuo**"}, {n:"3", t:"Gli **indicatori**"},
  {n:"4", t:"L'**accreditamento**"}, {n:"5", t:"Il **governo clinico**"}]},

{id:"s04", tipo:"griglia", tema:"chiaro", colonne:4, spunta:true, sopratitolo:"Le dimensioni della qualità", celle:[
  {t:"**Efficacia**"}, {t:"**Sicurezza**"}, {t:"**Appropriatezza**"}, {t:"**Equità** e accessibilità"},
  {t:"**Tempestività**"}, {t:"**Efficienza**"}, {t:"**Centralità** della persona"}]},
{id:"s05", tipo:"tre", tema:"chiaro", sopratitolo:"Tre punti di vista sulla qualità", attive:[0,1], box:PUNTI},
{id:"s06", tipo:"tre", tema:"chiaro", sopratitolo:"Tre punti di vista · alla percepita torniamo verso la fine", box:PUNTI},

{id:"s07", tipo:"triade", tema:"chiaro", sopratitolo:"Il modello di Donabedian · le risorse", centro:"Qualità", attive:[0], nodi:DONABEDIAN},
{id:"s08", tipo:"triade", tema:"chiaro", sopratitolo:"Il modello di Donabedian · risorse, attività, risultati", centro:"Qualità", nodi:DONABEDIAN},
{id:"s09", tipo:"tabella", tema:"chiaro", sopratitolo:"Un esempio · le lesioni da pressione", colonne:["30%","70%"],
  intestazioni:["Indicatore", "Lesioni da pressione"], righe:[
  ["Struttura", "disponibilità di **superfici antidecubito**"],
  ["Processo", "% di pazienti valutati con la **Braden** all'ingresso"]], chiave:[]},
{id:"s10", tipo:"tabella", tema:"chiaro", sopratitolo:"Struttura, processo, esito · uno schema utilissimo all'orale", colonne:["30%","70%"],
  intestazioni:["Indicatore", "Lesioni da pressione"], righe:[
  ["Struttura", "disponibilità di **superfici antidecubito**"],
  ["Processo", "% di pazienti valutati con la **Braden** all'ingresso"],
  ["Esito", "incidenza di **nuove lesioni**"]], chiave:[2]},

{id:"s11", tipo:"ciclo", tema:"chiaro", sopratitolo:"Il ciclo PDCA · il ciclo di Deming", centro:"PDCA", attive:[0], passi:PDCA},
{id:"s12", tipo:"ciclo", tema:"chiaro", sopratitolo:"Il ciclo PDCA · Act", centro:"PDCA", passi:PDCA},
{id:"s13", tipo:"frase", tema:"chiaro", sopratitolo:"Ogni giro parte dal risultato del precedente",
  testo:"E poi si **ricomincia**: è il **miglioramento continuo**."},
{id:"s14", tipo:"percorso", tema:"chiaro", sopratitolo:"Un esempio · le cadute notturne sono aumentate", tappe:[
  {t:"Plan", d:"cadute notturne in aumento"}, {t:"Do", d:"giro di controllo, bagno assistito"},
  {t:"Check", d:"incidenza per 3 mesi"}, {t:"Act", d:"se cala, entra nella procedura", key:true}]},

{id:"s15", tipo:"frase", tema:"chiaro", sopratitolo:"Gli indicatori · tipi: struttura, processo, esito",
  testo:"Una **variabile misurabile** che descrive un fenomeno e permette **confronti e decisioni**."},
{id:"s16", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"Un buon indicatore è", celle:[
  {t:"**Valido**: misura ciò che deve misurare"}, {t:"**Affidabile**: stesso risultato a parità di condizioni"}, {t:"**Sensibile**"},
  {t:"**Specifico**"}, {t:"**Rilevante**"}, {t:"**Fattibile**"}]},
{id:"s17", tipo:"sostituzione", tema:"chiaro", sopratitolo:"Lo standard",
  da:{h:"Da solo", t:"un indicatore dice poco"}, a:{h:"Con uno standard", t:"un valore di riferimento"},
  sotto:"È il confronto che permette di decidere **se, e dove, intervenire**."},
{id:"s18", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Indicatori tipicamente infermieristici", celle:[
  {n:"·", t:"Cadute per **1.000 giornate** di degenza"}, {n:"·", t:"Lesioni da **pressione**"},
  {n:"·", t:"Infezioni da **catetere**"}, {n:"·", t:"Aderenza all'**igiene delle mani** · lezione 4.2"}]},

{id:"s19", tipo:"norma", tema:"chiaro", etichetta:"Gestito da AGENAS, l'agenzia nazionale", sigla:"PNE",
  testo:"Programma Nazionale Esiti: gli **esiti** delle cure negli ospedali italiani."},
{id:"s20", tipo:"cifre", tema:"chiaro", sopratitolo:"Alcuni indicatori del PNE · e i tagli cesarei", voci:[
  {n:"30", suf:"giorni", d:"mortalità dopo un infarto"},
  {n:"48", suf:"ore", d:"frattura di femore operata entro · lezione 9.6", key:true}]},
{id:"s21", tipo:"trappola", tema:"chiaro", sopratitolo:"Dati dalle SDO, le schede di dimissione ospedaliera · confronto fra strutture", righe:[
  {sb:"Una classifica punitiva", ok:"Uno strumento di **miglioramento**"}]},

{id:"s22", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"Autorizzazione all'esercizio · requisiti minimi per poter operare, pubblica o privata", celle:[
  {t:"**Strutturali**"}, {t:"**Tecnologici**"}, {t:"**Organizzativi**"}]},
{id:"s23", tipo:"scala", tema:"chiaro", sopratitolo:"Accreditamento istituzionale · per erogare prestazioni per conto del SSN", gradini:[
  {n:"1", t:"Autorizzazione", d:"requisiti minimi"},
  {n:"2", t:"Accreditamento istituzionale", d:"requisiti ulteriori di qualità", key:true},
  {n:"3", t:"Accordi contrattuali", d:"con la Regione o l'azienda"}]},
{id:"s24", tipo:"norma", tema:"chiaro", etichetta:"Come modificato dal D.Lgs. 229/1999", sigla:"D.Lgs. 502/1992",
  testo:"L'accreditamento **istituzionale**. In Veneto: lezione **13.6**."},

{id:"s25", tipo:"figura", tema:"chiaro", sopratitolo:"Le forme volontarie", illu:"scudo",
  titolo:"Accreditamento<br>**all'eccellenza**.",
  sotto:"Enti nazionali o internazionali, come la Joint Commission International · standard di qualità e sicurezza."},
{id:"s26", tipo:"norma", tema:"chiaro", etichetta:"Certificazione volontaria", sigla:"ISO 9001",
  testo:"Conformità di un **sistema di gestione della qualità** a una norma internazionale."},
{id:"s27", tipo:"confronto", tema:"chiaro", sopratitolo:"Da non confondere", col:[
  {h:"Volontari", t:"accreditamento all'eccellenza · **ISO 9001**"},
  {h:"Obbligatorio", t:"accreditamento **istituzionale**, per lavorare per il SSN"}]},

{id:"s28", tipo:"frase", tema:"chiaro", sopratitolo:"Il governo clinico · clinical governance",
  testo:"Le organizzazioni sanitarie, **responsabili del miglioramento continuo** e di standard elevati."},
{id:"s29", tipo:"raggiera", tema:"chiaro", sopratitolo:"Il governo clinico · il rischio clinico è la lezione 2.6", centro:"Governo", attive:[0,1,2,3], raggi:GOVERNO},
{id:"s30", tipo:"raggiera", tema:"chiaro", sopratitolo:"Il governo clinico · responsabilità condivisa", centro:"Governo", raggi:GOVERNO},

{id:"s31", tipo:"percorso", tema:"chiaro", sopratitolo:"L'audit clinico · confronto sistematico con standard espliciti", attive:[0,1,2], tappe:AUDIT},
{id:"s32", tipo:"percorso", tema:"chiaro", sopratitolo:"L'audit clinico · si ripete la misurazione", tappe:AUDIT},
{id:"s33", tipo:"confronto", tema:"chiaro", sopratitolo:"Il dolore valutato e registrato per tutti: quanti lo hanno in cartella?", col:[
  {h:"Audit clinico", t:"la pratica contro **standard espliciti**"},
  {h:"Audit su un evento", t:"il **singolo caso** · lezione 2.6"}]},

{id:"s34", tipo:"norma", tema:"chiaro", etichetta:"Health Technology Assessment", sigla:"HTA",
  testo:"Valutazione **multidisciplinare** di farmaci, dispositivi, procedure, modelli organizzativi."},
{id:"s35", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"Che cosa considera · per decidere se adottare una tecnologia, e come", celle:[
  {t:"**Efficacia**"}, {t:"**Sicurezza**"}, {t:"**Costi**"},
  {t:"Impatto **organizzativo**"}, {t:"Impatto **etico**"}, {t:"Impatto **sociale**"}]},
{id:"s36", tipo:"figura", tema:"chiaro", sopratitolo:"L'HTA in reparto", illu:"mani", lato:"dx",
  titolo:"Coinvolge anche<br>gli **infermieri**.",
  sotto:"Per esempio nella scelta delle medicazioni avanzate, o dei dispositivi di sicurezza per i taglienti."},

{id:"s37", tipo:"citazione", tema:"chiaro", sopratitolo:"Il caso d'esame",
  testo:"Proponga un indicatore di **struttura**, uno di **processo** e uno di **esito** per la prevenzione delle **cadute** in reparto.",
  fonte:"La domanda tipo"},
{id:"s38", tipo:"tre", tema:"chiaro", sopratitolo:"Le cadute · le risorse che rendono possibile la prevenzione", attive:[0], box:CADUTE},
{id:"s39", tipo:"tre", tema:"chiaro", sopratitolo:"Le cadute · come lavora il reparto, non che cosa possiede", attive:[0,1], box:CADUTE},
{id:"s40", tipo:"tre", tema:"chiaro", sopratitolo:"Le cadute · il risultato che conta per il paziente", box:CADUTE},
{id:"s41", tipo:"catena", tema:"chiaro", sopratitolo:"Poi come li useresti · una risposta che dimostra metodo", passi:[
  {t:"Pianifichi"}, {t:"Realizzi"}, {t:"Verifichi", d:"con gli indicatori"}, {t:"Standardizzi o correggi", key:true}]},

{id:"s42", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"La qualità percepita e la partecipazione", celle:[
  {t:"Questionari di **soddisfazione**"}, {t:"Questionari di **esperienza**"}, {t:"Reclami e segnalazioni · **URP**"}]},
{id:"s43", tipo:"frase", tema:"chiaro", sopratitolo:"La Carta dei servizi · le associazioni dei pazienti",
  testo:"La voce del paziente è un **dato di qualità**, non solo un'opinione."},

{id:"s44", tipo:"norma", tema:"chiaro", etichetta:"In Veneto · autorizzazione e accreditamento", sigla:"L.R. 22/2002",
  testo:"Verifiche e **rinnovi periodici** delle strutture."},
{id:"s45", tipo:"confronto", tema:"chiaro", sopratitolo:"Gli strumenti di questa lezione, nella regione in cui lavorerai", col:[
  {h:"La Regione", t:"valuta le **performance** delle aziende"},
  {h:"Insieme ai dati", t:"del **Programma Nazionale Esiti**"}]},

{id:"s46", tipo:"tabella", tema:"chiaro", sopratitolo:"La tabella · le dimensioni della qualità", colonne:["32%","68%"],
  intestazioni:["Che cosa", "Da ricordare"], righe:[
  ["Donabedian", "struttura · processo · **esito**"],
  ["PDCA (Deming)", "plan · do · check · **act**"],
  ["Indicatori", "validi, affidabili, sensibili, specifici · **standard**"]], chiave:[]},
{id:"s47", tipo:"tabella", tema:"chiaro", sopratitolo:"La tabella · tre cose diverse", colonne:["38%","62%"],
  intestazioni:["Che cosa", "Da ricordare"], righe:[
  ["PNE", "AGENAS"],
  ["Autorizzazione", "requisiti **minimi**"],
  ["Accreditamento istituzionale", "requisiti **ulteriori**, per conto del SSN"],
  ["Eccellenza · ISO", "**volontari**"],
  ["Governo clinico", "audit e **re-audit** · HTA"]], chiave:[2]},

{id:"s48", tipo:"titolo", tema:"profondo",
  titolo:"Ciò che non si misura<br>**non si può migliorare**.",
  sotto:""},
{id:"s49", tipo:"frase", tema:"chiaro", sopratitolo:"Nella prossima lezione · il modo più efficace per memorizzare le norme",
  testo:"Il modulo 12 in una tabella: **fonte, contenuto, anno**."},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione",
  titolo:"12.8<br>Riepilogo<br>del Modulo 12", sottotitolo:"Fonte, contenuto, anno · e autovalutazione",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
