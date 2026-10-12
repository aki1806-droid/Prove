// Contenuto delle 50 scene della lezione 15.11 — il turno: priorità, attribuzione, aggressione.
// La lavagna del turno è una tabella che si riempie letto per letto; le
// priorità una griglia che si accende nell'ordine giusto, con Ida sulla misura
// della saturazione dentro il suo target; lo SBAR quattro riquadri che tornano
// nelle consegne e nella domanda d'orale.

const LETTI = [
  ["1 · Paolo, 64", "anemia · «da 10 minuti ho un **peso al petto**» · sudato"],
  ["2 · Ida, 77", "BPCO · SpO₂ 89% con gli occhialini · target **88–92%**"],
  ["3 · Luca, 58", "diabete tipo 2 · glicemia **280** mg/dl · asintomatico"],
  ["4 · Rosa, 85", "allettata · Braden **12** · igiene e riposizionamento alle 14"],
  ["5 · Franco, 72", "dimissione domani · educazione all'**eparina** · figlio alle 17"],
  ["6 · Anna, 69", "**antibiotico EV** prescritto alle 14"],
];
const LAVAGNA = (n, sop) => ({tipo:"tabella", tema:"chiaro", sopratitolo:sop, colonne:["26%","74%"],
  intestazioni:["Letto", "Alle 14"], righe:LETTI.slice(0, n)});

const PRIORITA = att => ({tipo:"griglia", tema:"chiaro", colonne:2, attive:att, celle:[
  {n:"1", t:"**Paolo** · ECG entro 10 minuti, medico", key:true},
  {n:"2", t:"**Anna** · antibiotico a orario"},
  {n:"3", t:"**Luca** · schema di correzione prescritto"},
  {n:"4", t:"**Ida** · stabile, in target"},
  {n:"5", t:"**Rosa** · prevenzione, attribuibile"},
  {n:"6", t:"**Franco** · educazione alle 17, con il figlio"}]});

const SBAR = (att, k, dett) => ({tipo:"tre", tema:"chiaro", attive:att, box:[
  {n:"S", t:"Situazione", d:dett ? "letto 1 · dolore toracico alle 14 per 15 minuti · ora asintomatico" : null, key:k===0},
  {n:"B", t:"Background", d:dett ? "anemia · Hb 7,2 · in trasfusione della seconda unità" : null, key:k===1},
  {n:"A", t:"Accertamento", d:dett ? "ECG senza alterazioni acute · prima troponina negativa" : null, key:k===2},
  {n:"R", t:"Raccomandazione", d:dett ? "seconda troponina alle 22 · sorveglianza · chiamare se torna il dolore" : null, key:k===3}]});

const LEZIONI = [
  {n:"1.1", t:"Profilo", illu:"libro"},
  {n:"1.2", t:"Responsabilità", illu:"bilancia2"},
  {n:"2.7", t:"De-escalation, SBAR", illu:"dialogo"},
  {n:"2.6", t:"Raccomandazione 8", illu:"scudo"},
  {n:"12.5", t:"CCNL, assistente infermiere", illu:"cartella"},
  {n:"12.6", t:"Sicurezza sul lavoro", illu:"cartello"},
  {n:"3.2", t:"Lesioni da pressione", illu:"tallone"},
];

const RISPOSTA = (righe, k, sop) => ({tipo:"tabella", tema:"chiaro", sopratitolo:sop, colonne:["26%","74%"],
  intestazioni:["Passo", "Nella risposta"], righe, chiave:[k]});

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 15 · Casi clinici integrati",
  titolo:"Il turno", sottotitolo:"15.11 · Priorità, attribuzione e aggressione",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"icone", tema:"chiaro", sopratitolo:"Micro-lezione 11 di 12 · non più un paziente alla volta", voci:[
  {icona:"letto", t:"Più pazienti insieme"}, {icona:"persone", t:"Un'équipe da coordinare"},
  {icona:"orologio", t:"Gli imprevisti"}, {icona:"avviso", t:"Un familiare che perde il controllo", key:true}]},
{id:"s03", tipo:"tre", tema:"chiaro", sopratitolo:"Tre competenze che l'orale verifica spesso", box:[
  {n:"1", t:"Stabilire le priorità", key:true}, {n:"2", t:"Attribuire e supervisionare"}, {n:"3", t:"Gestire un'aggressione"}]},

{id:"s04", tipo:"cifre", tema:"chiaro", sopratitolo:"Turno pomeridiano in medicina · ore 14, finite le consegne", voci:[
  {n:"6", t:"pazienti", key:true}, {n:"1", t:"OSS"}, {n:"1", t:"assistente infermiere", d:"dove presente in organico"}]},
{id:"s05", ...LAVAGNA(2, "La lavagna del turno")},
{id:"s06", ...LAVAGNA(4, "La lavagna del turno")},
{id:"s07", ...LAVAGNA(6, "Pausa · in che ordine?")},

{id:"s08", tipo:"catena", tema:"chiaro", sopratitolo:"Le priorità · primo, Paolo", passi:[
  {t:"Dolore toracico + **sudorazione**", d:"in un paziente anemico"},
  {t:"Sindrome coronarica?", d:"o ischemia da anemia"},
  {t:"Valutazione **immediata**", d:"ECG entro 10 minuti · parametri · medico", key:true}]},
{id:"s09", sopratitolo:"Le priorità · Anna ha un orario: un breve ritardo si documenta", ...PRIORITA([0,1,2])},
{id:"s10", tipo:"misura", tema:"chiaro", sopratitolo:"Quarta, Ida · il trabocchetto", min:80, max:100, passo:4, soglia:88, valore:89,
  titolo:"SpO₂ **89%**: per Ida è **corretta**", sotto:"Il suo target prescritto è 88–92%: è stabile."},
{id:"s11", sopratitolo:"Le priorità · l'ordine", ...PRIORITA([0,1,2,3,4,5])},

{id:"s12", tipo:"catena", tema:"chiaro", sopratitolo:"Il ragionamento dietro l'ordine", passi:[
  {t:"**Instabilità**", d:"rischio di peggioramento rapido", key:true}, {t:"**Tempo-dipendenza**"},
  {t:"**Competenza**", d:"infermieristica e non delegabile, o attribuibile"}]},
{id:"s13", tipo:"confronto", tema:"chiaro", sopratitolo:"La distinzione che il commissario vuole sentire", col:[
  {h:"Importante, ma attribuibile", t:"l'**igiene** e il riposizionamento di Rosa"},
  {h:"Meno urgente, ma non attribuibile", t:"l'**educazione** di Franco"}]},

{id:"s14", tipo:"sostituzione", tema:"chiaro", sopratitolo:"L'attribuzione",
  da:{h:"Non si affida", t:"la responsabilità dell'assistenza"}, a:{h:"Si affida", t:"un'attività"},
  sotto:"La responsabilità resta all'infermiere."},
{id:"s15", tipo:"tre", tema:"chiaro", sopratitolo:"I criteri dell'attribuzione", box:[
  {n:"1", t:"Stabilità", d:"clinica del paziente"}, {n:"2", t:"Prevedibilità", d:"dell'esito"},
  {n:"3", t:"Complessità", d:"dell'attività"}, {n:"4", t:"Profilo", d:"e competenze dell'operatore"},
  {n:"5", t:"Supervisione", d:"possibile", key:true}]},
{id:"s16", tipo:"griglia", tema:"chiaro", colonne:2, sopratitolo:"Non si attribuiscono", celle:[
  {t:"La **valutazione**", no:true}, {t:"La **pianificazione**", no:true},
  {t:"Il **giudizio clinico**", no:true}, {t:"L'**educazione terapeutica**", no:true},
  {t:"Le attività **riservate** alla competenza infermieristica", no:true}]},

{id:"s17", tipo:"colonne", tema:"chiaro", sopratitolo:"Le due figure di supporto", attive:[0], colonne:[
  {h:"OSS", voci:[{t:"Assistenza diretta di base", d:"igiene, mobilizzazione, alimentazione, comfort"},
    {t:"Attività alberghiere"}, {t:"Secondo il profilo e le procedure aziendali"}]},
  {h:"Assistente infermiere", voci:[{t:"Accordo Stato-Regioni", d:"recepito nel CCNL 2022-2024"},
    {t:"Le attività del suo profilo"}, {t:"Attribuite e supervisionate dall'infermiere", key:true}]}]},
{id:"s18", tipo:"colonne", tema:"chiaro", sopratitolo:"Le due figure di supporto", colonne:[
  {h:"OSS", voci:[{t:"Assistenza diretta di base", d:"igiene, mobilizzazione, alimentazione, comfort"},
    {t:"Attività alberghiere"}, {t:"Secondo il profilo e le procedure aziendali"}]},
  {h:"Assistente infermiere", voci:[{t:"Accordo Stato-Regioni", d:"recepito nel CCNL 2022-2024"},
    {t:"Le attività del suo profilo"}, {t:"Attribuite e supervisionate dall'infermiere", key:true}]}]},
{id:"s19", tipo:"frase", tema:"chiaro", sopratitolo:"Una raccomandazione di metodo",
  testo:"Le attività consentite si verificano **sempre** nei documenti di riferimento e nelle procedure dell'azienda.",
  sotto:"È un ambito in evoluzione."},

{id:"s20", tipo:"tre", tema:"chiaro", sopratitolo:"Come si attribuisce bene · «pensaci tu alla 4» è un rischio", box:[
  {n:"1", t:"Che cosa"}, {n:"2", t:"A chi"}, {n:"3", t:"Come"}, {n:"4", t:"Entro quando"},
  {n:"5", t:"Che cosa riferire", key:true}]},
{id:"s21", tipo:"citazione", tema:"chiaro",
  testo:"«Alle 14:15 igiene e riposizionamento sul **fianco sinistro**, con lo **scarico dei talloni** con il cuscino…»",
  fonte:"L'istruzione per Rosa · letto 4"},
{id:"s22", tipo:"catena", tema:"chiaro", sopratitolo:"«…e chiamami se…»", passi:[
  {t:"Guarda la cute", d:"sacro e talloni"},
  {t:"**Chiamami**", d:"arrossamento che non scompare alla pressione, o dolore", key:true},
  {t:"**Verifica**", d:"al termine"}, {t:"**Documentazione**"}]},

{id:"s23", tipo:"confronto", tema:"chiaro", sopratitolo:"La responsabilità", col:[
  {h:"L'infermiere risponde", t:"della scelta dell'**attività**, dell'**operatore** e della **supervisione**"},
  {h:"L'operatore risponde", t:"della corretta **esecuzione**"}],
  sotto:"Attribuire a chi non è competente, o non supervisionare, espone a responsabilità."},
{id:"s24", tipo:"norma", tema:"chiaro", etichetta:"Il profilo professionale", sigla:"DM 739/1994",
  testo:"Responsabile dell'**assistenza generale infermieristica**; dove necessario, si avvale del **personale di supporto**."},

{id:"s25", tipo:"pausa", tema:"chiaro", sopratitolo:"Ore 16:30 · il familiare", es:"ore 16:30",
  testo:"Il figlio di Rosa, al bancone, alza la voce: «Mia madre è sporca, la lasciate così, **vi denuncio tutti**!»",
  dati:["si avvicina", "gesticola", "altri visitatori osservano"]},

{id:"s26", tipo:"griglia", tema:"chiaro", colonne:2, sopratitolo:"La de-escalation · lezione 2.7 · prima la sicurezza", celle:[
  {t:"La **distanza**"}, {t:"Una **via d'uscita** libera"},
  {t:"**Non** restare soli"}, {t:"I colleghi **avvisati**"},
  {t:"Tono **calmo** e basso"}, {t:"Postura **aperta**", key:true}]},
{id:"s27", tipo:"frase", tema:"chiaro", sopratitolo:"Ascoltare senza interrompere · riconoscere l'emozione",
  testo:"«Vedo che è **molto preoccupato** per sua madre.»",
  sotto:"Poi in un luogo riservato, lontano dagli altri visitatori."},
{id:"s28", tipo:"catena", tema:"chiaro", sopratitolo:"Magari Rosa si è sporcata dopo l'igiene delle 14", passi:[
  {t:"Verificare **insieme**", d:"senza promesse né accuse"}, {t:"Una soluzione **concreta**"},
  {t:"Se continua: **vigilanza**", d:"o forze dell'ordine", key:true}]},

{id:"s29", tipo:"tre", tema:"chiaro", sopratitolo:"Dopo l'episodio", box:[
  {n:"Racc. n. 8", t:"Segnalare", d:"secondo la procedura aziendale"},
  {n:"L. 113/2020", t:"Lesioni: refertare", d:"procedibili **d'ufficio**", key:true}]},
{id:"s30", tipo:"icone", tema:"chiaro", sopratitolo:"Il CCNL 2022-2024 · e con l'équipe", voci:[
  {icona:"giudice", t:"Patrocinio legale"}, {icona:"cuoremano", t:"Supporto psicologico"},
  {icona:"persone", t:"Debriefing", d:"con l'équipe", key:true}]},
{id:"s31", tipo:"frase", tema:"chiaro", sopratitolo:"Una cosa che spesso si dimentica · si verifica comunque l'assistenza",
  testo:"Una protesta, anche espressa male, può segnalare **un bisogno reale**.",
  sotto:"Il dialogo con il figlio si riprende a mente fredda."},

{id:"s32", tipo:"tabella", tema:"chiaro", sopratitolo:"Il resto del turno", colonne:["24%","76%"],
  intestazioni:["Paziente", "Come è andata"], righe:[
  ["Paolo", "ECG senza alterazioni acute · troponina in corso · **trasfusione** prescritta, da sorvegliare"],
  ["Anna", "antibiotico alle **14:25**, orario documentato"]], chiave:[0]},
{id:"s33", tipo:"tabella", tema:"chiaro", sopratitolo:"Il resto del turno", colonne:["24%","76%"],
  intestazioni:["Paziente", "Come è andata"], righe:[
  ["Luca", "correzione secondo schema · rivalutazione"], ["Ida", "stabile"],
  ["Rosa", "cute integra, documentata"],
  ["Franco", "educazione con il figlio alle 17 · **teach-back** sull'eparina"]], chiave:[3]},

{id:"s34", sopratitolo:"Le consegne delle 21 · SBAR, dai pazienti instabili · Paolo", ...SBAR([0], 0, true)},
{id:"s35", sopratitolo:"Le consegne delle 21 · Paolo", ...SBAR([0,1,2], 2, true)},
{id:"s36", sopratitolo:"Chi riceve sa esattamente che cosa fare", ...SBAR([0,1,2,3], 3, true)},

{id:"s37", tipo:"tre", tema:"chiaro", sopratitolo:"Il turno si pianifica subito dopo le consegne", box:[
  {n:"1", t:"Attività a orario", key:true}, {n:"2", t:"Attività programmabili"}, {n:"3", t:"Spazio per gli imprevisti"}]},
{id:"s38", tipo:"griglia", tema:"chiaro", colonne:2, sopratitolo:"Le interruzioni nella preparazione della terapia causano errori", celle:[
  {t:"Un'**area dedicata**"}, {t:"I segnali di **non disturbare**"},
  {t:"Un paziente **alla volta**"}, {t:"Priorità **rivalutate** a ogni cambiamento"},
  {t:"Carico eccessivo: **chiedere aiuto** e segnalare", key:true}]},

{id:"s39", tipo:"griglia", tema:"chiaro", colonne:2, sopratitolo:"Domanda 1 · Con quali criteri attribuisce un'attività all'OSS?", celle:[
  {t:"**Stabilità** clinica"}, {t:"**Prevedibilità** dell'esito"},
  {t:"**Complessità** dell'attività"}, {t:"**Profilo** e competenze"},
  {t:"Possibilità di **supervisione**"}, {t:"Istruzioni chiare e **verifica** finale"},
  {t:"Per sé: valutazione, pianificazione, educazione", key:true}]},
{id:"s40", tipo:"catena", tema:"chiaro", sopratitolo:"Domanda 2 · Come gestisce un familiare aggressivo?", passi:[
  {t:"**Sicurezza**", key:true}, {t:"**De-escalation**", d:"ascolto, emozione, tono calmo, luogo riservato"},
  {t:"**Vigilanza**", d:"se necessario"}, {t:"**Segnalazione**"}]},
{id:"s41", sopratitolo:"Domanda 3 · Che cos'è lo SBAR? · consegne, chiamate al medico, trasferimenti", ...SBAR([0,1,2,3], -1, false)},

{id:"s42", ...RISPOSTA([
  ["Priorità", "in base a **instabilità**, tempo-dipendenza, competenza richiesta"],
  ["Per primo", "il dolore toracico: parametri, **ECG entro 10 minuti**, medico"]], 1, "La risposta in 15 righe · 1")},
{id:"s43", ...RISPOSTA([
  ["Poi", "l'antibiotico **a orario**"], ["Valuto", "il paziente con iperglicemia"],
  ["Riconosco", "come **stabile** la paziente con BPCO in target"]], 2, "La risposta in 15 righe · 2")},
{id:"s44", ...RISPOSTA([
  ["Attribuisco", "all'OSS igiene e riposizionamento: che cosa, entro quando, **che cosa riferire**"],
  ["Verifico", "l'esecuzione"],
  ["Tengo per me", "valutazione, terapia EV, **educazione**"]], 0, "La risposta in 15 righe · 3")},
{id:"s45", ...RISPOSTA([
  ["Il familiare", "**sicurezza** · de-escalation in luogo riservato · vigilanza se serve · segnalo"],
  ["Documento", "e trasmetto le consegne **SBAR**, dai pazienti instabili"]], 1, "La risposta in 15 righe · 4")},

{id:"s46", tipo:"anello", tema:"chiaro", sopratitolo:"I collegamenti", centro:"15.11", sotto:"il turno", voci:LEZIONI, attive:[0,1,2,3]},
{id:"s47", tipo:"anello", tema:"chiaro", sopratitolo:"I collegamenti · contratto, sicurezza, lesioni da pressione", centro:"15.11", sotto:"il turno", voci:LEZIONI},

{id:"s48", tipo:"titolo", tema:"profondo",
  titolo:"Si attribuisce un'attività,<br>**non si delega la responsabilità**.",
  sotto:"La priorità non è chi chiama più forte, ma chi rischia di più."},

{id:"s49", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Nella prossima lezione · chiudiamo il modulo", celle:[
  {n:"1", t:"Il **riepilogo** dello schema"}, {n:"6", t:"**Casi lampo** su temi non sviluppati per esteso", key:true},
  {n:"→", t:"Le **tracce** più probabili"}]},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione · 15.12",
  titolo:"Riepilogo<br>e casi lampo", sottotitolo:"Lo schema, i casi lampo, le tracce probabili",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
