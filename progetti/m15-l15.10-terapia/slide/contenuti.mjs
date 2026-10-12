// Contenuto delle 50 scene della lezione 15.10 — il turno della terapia, quattro trappole.
// Il turno è un percorso a quattro ore che torna in apertura; ogni trappola si
// apre con la pausa e si chiude con la risposta. Il calcolo dell'eparina si
// scrive a schermo; il naloxone e la sedazione hanno le loro figure del modulo 5;
// le azioni della reazione trasfusionale sono un percorso a otto tappe che si
// accende; il «dopo l'errore» un percorso a cinque.

const AZ_TRASF = (att, k) => ({tipo:"percorso", tema:"chiaro", tappe:[
  {t:"Interrompere", d:"subito", key:k===0},
  {t:"Accesso venoso", d:"fisiologica · nuovo set", key:k===1},
  {t:"Medico", d:"subito", key:k===2},
  {t:"Parametri e diuresi", d:"rischio di danno renale", key:k===3},
  {t:"Verifica al letto", d:"identità ed etichetta", key:k===4},
  {t:"Prelievi", d:"secondo procedura", key:k===5},
  {t:"Sacca e set", d:"al Servizio Trasfusionale", key:k===6},
  {t:"Emovigilanza", d:"la notifica", key:k===7}], attive:att});

const DOPO = (att, k) => ({tipo:"percorso", tema:"chiaro", tappe:[
  {t:"Sicurezza", d:"limitare il danno", key:k===0},
  {t:"Comunicazione", d:"al paziente e ai familiari", key:k===1},
  {t:"Segnalazione", d:"e analisi delle cause", key:k===2},
  {t:"Supporto", d:"all'operatore coinvolto", key:k===3},
  {t:"Miglioramento", d:"nasce dalle segnalazioni", key:k===4}], attive:att});

const LEZIONI = [
  {n:"1.5", t:"Responsabilità", illu:"bilancia2"},
  {n:"5.3", t:"Calcoli", illu:"calcolatrice"},
  {n:"5.4", t:"Giuste regole", illu:"braccialetto"},
  {n:"5.6", t:"Oppioidi, naloxone", illu:"pca"},
  {n:"5.7", t:"Alto rischio", illu:"fiala"},
  {n:"6.6", t:"Trasfusione", illu:"sacca"},
  {n:"2.6", t:"Raccomandazioni", illu:"scudo"},
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 15 · Casi clinici integrati",
  titolo:"Il turno<br>della terapia", sottotitolo:"15.10 · Quattro trappole: potassio, eparina, morfina, trasfusione",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"percorso", tema:"chiaro", sopratitolo:"Micro-lezione 10 di 12 · un turno di mattina in medicina", tappe:[
  {t:"Ore 8", d:"il potassio"}, {t:"Ore 10", d:"l'eparina in pompa"},
  {t:"Ore 13", d:"la morfina"}, {t:"Ore 15", d:"la trasfusione", key:true}]},
{id:"s03", tipo:"griglia", tema:"chiaro", colonne:3, sopratitolo:"Le lezioni che useremo", celle:[
  {n:"5.3", t:"I **calcoli**"}, {n:"5.4", t:"La **sicurezza**"}, {n:"5.6", t:"Gli **oppioidi**"},
  {n:"5.7", t:"L'**alto rischio**"}, {n:"6.6", t:"La **trasfusione**"}, {n:"1.5", t:"La **responsabilità**", key:true}]},

{id:"s04", tipo:"pausa", tema:"chiaro", sopratitolo:"Trappola 1 · ore 8 · il potassio", es:"trappola 1 · ore 8",
  testo:"In cartella: «**cloruro di potassio 20 mEq EV in bolo**». Che cosa fai?",
  dati:["K⁺ 3,0 mEq/L", "KCl 20 mEq", "EV in bolo"]},

{id:"s05", tipo:"catena", tema:"chiaro", sopratitolo:"Una prescrizione palesemente errata", passi:[
  {t:"KCl concentrato **in bolo**"}, {t:"Rischio di **arresto cardiaco**"},
  {t:"**Non si esegue**", key:true}, {t:"Medico **subito**", d:"per la correzione"}]},
{id:"s06", tipo:"tre", tema:"chiaro", sopratitolo:"Il potassio endovena, sempre", box:[
  {n:"1", t:"Diluito"}, {n:"2", t:"Con pompa", key:true},
  {n:"3", t:"Velocità controllata", d:"secondo protocollo · più bassa in periferica"},
  {n:"4", t:"ECG", d:"se concentrazione o velocità sono elevate"}]},
{id:"s07", tipo:"norma", tema:"chiaro", etichetta:"KCl concentrato · fiale separate e segnalate", sigla:"Racc. n. 1",
  testo:"E la richiesta di chiarimento al medico **si documenta**."},
{id:"s08", tipo:"frase", tema:"chiaro", sopratitolo:"Una domanda d'orale collegata · lezione 1.5",
  testo:"Chi esegue una prescrizione **palesemente errata** ne risponde?",
  sotto:"Sì: la responsabilità è anche sua."},

{id:"s09", tipo:"cifre", tema:"chiaro", sopratitolo:"Trappola 2 · ore 10 · la prescrizione", voci:[
  {n:"25.000", suf:"UI", t:"eparina sodica", d:"in **50 ml** di fisiologica"},
  {n:"1.000", suf:"UI/h", t:"la dose da infondere", key:true}]},
{id:"s10", tipo:"pausa", tema:"chiaro", sopratitolo:"Trappola 2 · l'eparina in pompa", es:"trappola 2 · ore 10",
  testo:"La pompa, impostata da un collega nella notte, scorre a **20 ml/h**. È corretto? Fai il calcolo.",
  dati:["25.000 UI / 50 ml", "1.000 UI/h", "pompa a 20 ml/h"]},

{id:"s11", tipo:"calcolo", tema:"chiaro", sopratitolo:"Il calcolo · prima la concentrazione, poi la velocità", righe:[
  {tok:["25.000 UI", "÷", "50 ml", "=", "500 UI/ml"]}, {tok:["1.000 UI/h", "÷", "500 UI/ml", "=", "2 ml/h"]}]},
{id:"s12", tipo:"calcolo", tema:"chiaro", sopratitolo:"E la pompa a 20 ml/h?", righe:[
  {tok:["20 ml/h", "×", "500 UI/ml", "=", "10.000 UI/h"], nota:"**Dieci volte** la dose: l'errore tipico della virgola."}]},
{id:"s13", tipo:"percorso", tema:"chiaro", sopratitolo:"Le azioni", tappe:[
  {t:"Fermare", d:"l'infusione", key:true}, {t:"Medico", d:"subito"},
  {t:"Sanguinamento", d:"segni e parametri"}, {t:"aPTT urgente", d:"secondo prescrizione"},
  {t:"Protamina", d:"l'antidoto, secondo prescrizione"}]},
{id:"s14", tipo:"tre", tema:"chiaro", sopratitolo:"Si segnala: le cause, non i colpevoli · la prevenzione", box:[
  {n:"1", t:"Doppio controllo indipendente", d:"per i farmaci ad **alto livello di attenzione**", key:true},
  {n:"2", t:"Pompe con la libreria dei farmaci", d:"bloccano le velocità **fuori range**"}]},

{id:"s15", tipo:"cifre", tema:"chiaro", sopratitolo:"Trappola 3 · ore 13 · il signor Rino", voci:[
  {n:"82", t:"anni"}, {n:"2ª", t:"giornata", d:"postoperatoria"},
  {n:"4", suf:"mg", t:"morfina EV", d:"ogni 4 ore · + dose al bisogno alle 12", key:true}]},
{id:"s16", tipo:"pausa", tema:"chiaro", sopratitolo:"Trappola 3 · la morfina", es:"trappola 3 · ore 13",
  testo:"Molto **sonnolento**, risponde a fatica allo stimolo verbale. Che cosa succede?",
  dati:["FR 8", "pupille miotiche", "SpO₂ 88% in aria"]},

{id:"s17", tipo:"griglia", tema:"chiaro", colonne:2, sopratitolo:"Depressione respiratoria da oppioidi · sedazione, bradipnea, miosi", celle:[
  {n:"1", t:"**Stimolare** il paziente, invitarlo a respirare"}, {n:"2", t:"**Ossigeno**"},
  {n:"3", t:"Chiamare **subito** il medico"}, {n:"4", t:"**Sospendere** l'oppioide", key:true}]},
{id:"s18", tipo:"frase", tema:"chiaro", sopratitolo:"Il naloxone · secondo prescrizione o protocollo",
  testo:"A **piccole dosi titolate**: inverte la depressione respiratoria senza annullare del tutto l'analgesia.",
  sotto:"E senza scatenare un dolore violento."},
{id:"s19", tipo:"antidoto", tema:"chiaro", sopratitolo:"Il naloxone dura meno della morfina · monitoraggio continuo",
  testo:"può riaddormentarsi"},
{id:"s20", tipo:"respiro", tema:"chiaro", sopratitolo:"La sedazione precede la depressione respiratoria · valutarla prima di ogni dose"},

{id:"s21", tipo:"icone", tema:"chiaro", sopratitolo:"Gli stupefacenti · le regole della lezione 5.6", voci:[
  {icona:"quaderno", t:"Registro di carico e scarico", d:"DPR 309/1990", key:true},
  {icona:"lucchetto", t:"Armadio chiuso a chiave"}]},
{id:"s22", tipo:"griglia", tema:"chiaro", colonne:1, sopratitolo:"Le regole", celle:[
  {t:"Ogni somministrazione **si registra**"},
  {t:"Fiale usate in parte e residui: smaltimento secondo procedura, **con un testimone**"},
  {t:"Qualsiasi discrepanza nel registro: **si segnala subito**", key:true}]},

{id:"s23", tipo:"pausa", tema:"chiaro", sopratitolo:"Trappola 4 · ore 15 · la trasfusione", es:"trappola 4 · ore 15",
  testo:"Emazie in corso da **10 minuti**: brividi, **dolore lombare**, angoscia, urine scure. Che cosa succede?",
  dati:["T 38,9 °C", "PA 85/50", "FC 125"]},

{id:"s24", sopratitolo:"Sospetta reazione emolitica acuta · incompatibilità AB0", ...AZ_TRASF([0], 0)},
{id:"s25", sopratitolo:"Nel deflussore c'è ancora sangue incompatibile", ...AZ_TRASF([0,1,2], 1)},
{id:"s26", sopratitolo:"Le azioni, nell'ordine", ...AZ_TRASF([0,1,2,3,4,5], 4)},
{id:"s27", sopratitolo:"Racc. n. 5 · un evento sentinella: quasi sempre un errore di identificazione", ...AZ_TRASF([0,1,2,3,4,5,6,7], 7)},

{id:"s28", tipo:"icone", tema:"chiaro", sopratitolo:"Il filo comune · farmaci e prodotti ad alto livello di attenzione", voci:[
  {icona:"fiale", t:"Potassio"}, {icona:"pompa", t:"Eparina"},
  {icona:"siringa", t:"Oppioidi"}, {icona:"sacca", t:"Emocomponenti", key:true}]},
{id:"s29", tipo:"catena", tema:"chiaro", sopratitolo:"L'infermiere, ultima barriera", passi:[
  {t:"**Controlla** prima", d:"prescrizione, calcolo, paziente, via, velocità", key:true},
  {t:"**Osserva** dopo"}, {t:"**Comunica** subito"}, {t:"**Segnala**", d:"no blame"}]},
{id:"s30", tipo:"norma", tema:"chiaro", etichetta:"E il Codice deontologico", sigla:"L. 24/2017",
  testo:"La responsabilità è **condivisa**."},

{id:"s31", tipo:"griglia", tema:"chiaro", colonne:3, sopratitolo:"Le giuste regole · lezione 5.4 · e oltre: velocità, forma, monitoraggio, rifiuto", celle:[
  {t:"Paziente **giusto**", key:true}, {t:"Farmaco **giusto**"}, {t:"Dose **giusta**"},
  {t:"Via **giusta**"}, {t:"Tempo **giusto**"}, {t:"Registrazione **giusta**"}]},
{id:"s32", tipo:"frase", tema:"chiaro", sopratitolo:"Almeno due identificativi · e un segnale d'allarme",
  testo:"«Questa pastiglia **non l'ho mai presa**.»",
  sotto:"La domanda del paziente si verifica sempre, prima di somministrare."},

{id:"s33", tipo:"trappola", tema:"tenue", sopratitolo:"Gli errori da evitare", righe:[
  {sb:"Eseguire «perché l'ha scritta il medico»", ok:"Una prescrizione **palesemente errata** non si esegue"},
  {sb:"Fidarsi della pompa del turno precedente", ok:"Si **ricalcola**"},
  {sb:"La dose al bisogno senza guardare il paziente", ok:"Prima si valuta la **sedazione**"}]},
{id:"s34", tipo:"trappola", tema:"tenue", sopratitolo:"Gli errori da evitare", righe:[
  {sb:"Rallentare la trasfusione", ok:"Si **ferma**"},
  {sb:"Gettare la sacca", ok:"È una **prova**: si invia al trasfusionale"},
  {sb:"Non segnalare, per paura", ok:"Si **segnala**"}]},

{id:"s35", sopratitolo:"Dopo l'errore", ...DOPO([0,1], 1)},
{id:"s36", tipo:"frase", tema:"chiaro", sopratitolo:"Onesta, tempestiva, secondo le procedure, insieme al medico",
  testo:"Nascondere un errore distrugge la fiducia **più dell'errore stesso**."},
{id:"s37", sopratitolo:"Audit o analisi delle cause profonde · senza cercare il colpevole", ...DOPO([0,1,2,3], 3)},
{id:"s38", sopratitolo:"La «seconda vittima» · il doppio controllo e le librerie delle pompe vengono da qui", ...DOPO([0,1,2,3,4], 4)},

{id:"s39", tipo:"tabella", tema:"chiaro", sopratitolo:"Domanda 1 · Che cosa prevedono le Raccomandazioni n. 1 e n. 5?", colonne:["26%","74%"],
  intestazioni:["Raccomandazione", "Che cosa prevede"], righe:[
  ["n. 1", "soluzioni concentrate di **KCl**: conservate separate e segnalate · **mai in bolo**"],
  ["n. 5", "reazione trasfusionale da incompatibilità **AB0**: si previene con la corretta **identificazione**"]]},
{id:"s40", tipo:"calcolo", tema:"chiaro", sopratitolo:"Domanda 2 · Come calcola la velocità di un'infusione in ml/ora?", righe:[
  {tok:["25.000 UI", "÷", "50 ml", "=", "500 UI/ml"]},
  {tok:["1.000 UI/h", "÷", "500 UI/ml", "=", "2 ml/h"], nota:"Prima la **concentrazione**, farmaco ÷ volume; poi la **dose oraria ÷ concentrazione**."}]},
{id:"s41", tipo:"catena", tema:"chiaro", sopratitolo:"Domanda 3 · Una prescrizione che ritiene errata?", passi:[
  {t:"**Non** la eseguo", key:true}, {t:"Contatto il **medico**", d:"per un chiarimento"},
  {t:"**Documento** la richiesta"}, {t:"Coinvolgo il **coordinatore**", d:"se necessario"}]},

{id:"s42", tipo:"tabella", tema:"chiaro", sopratitolo:"La risposta in 15 righe · la trasfusione · 1", colonne:["28%","72%"],
  intestazioni:["Passo", "Nella risposta"], righe:[
  ["Riconosco", "dopo **10 minuti**: brividi, febbre, dolore lombare, ipotensione, tachicardia, urine scure"],
  ["Nomino", "sospetta **reazione emolitica acuta** da AB0 · emergenza · **evento sentinella**"]], chiave:[1]},
{id:"s43", tipo:"tabella", tema:"chiaro", sopratitolo:"La risposta in 15 righe · 2", colonne:["28%","72%"],
  intestazioni:["Passo", "Nella risposta"], righe:[
  ["Interrompo", "**immediatamente** la trasfusione"],
  ["Mantengo", "l'accesso venoso con fisiologica, tramite un **nuovo set**"],
  ["Chiamo", "subito il **medico**"],
  ["Rilevo", "parametri e **diuresi** · collaboro al trattamento dello shock"]], chiave:[0]},
{id:"s44", tipo:"tabella", tema:"chiaro", sopratitolo:"La risposta in 15 righe · 3", colonne:["28%","72%"],
  intestazioni:["Passo", "Nella risposta"], righe:[
  ["Verifico", "al letto: paziente, richiesta, **etichetta dell'unità**"],
  ["Eseguo", "i prelievi previsti dalla procedura"],
  ["Invio", "**sacca e set** al Servizio Trasfusionale"],
  ["Rassicuro", "il paziente"]], chiave:[0]},
{id:"s45", tipo:"tabella", tema:"chiaro", sopratitolo:"La risposta in 15 righe · 4", colonne:["28%","72%"],
  intestazioni:["Passo", "Nella risposta"], righe:[
  ["Documento", "attivo l'**emovigilanza** e segnalo l'evento"],
  ["Prevengo", "corretta **identificazione** al prelievo e al letto"],
  ["Sorveglio", "i primi **15 minuti**"]], chiave:[1]},

{id:"s46", tipo:"anello", tema:"chiaro", sopratitolo:"I collegamenti", centro:"15.10", sotto:"quattro trappole", voci:LEZIONI, attive:[0,1,2,3]},
{id:"s47", tipo:"anello", tema:"chiaro", sopratitolo:"I collegamenti · potassio con la 5.7, eparina con la 5.5", centro:"15.10", sotto:"quattro trappole", voci:LEZIONI},

{id:"s48", tipo:"titolo", tema:"profondo",
  titolo:"Fermarsi un minuto a controllare<br>non è lentezza: **è sicurezza**.",
  sotto:"Ognuna delle quattro trappole si risolveva con una verifica di pochi secondi."},

{id:"s49", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Nella prossima lezione · un turno pomeridiano", celle:[
  {n:"6", t:"**Pazienti**, con un OSS e un assistente infermiere"}, {n:"!", t:"Un **familiare** che perde il controllo"},
  {n:"→", t:"**Priorità**, attribuzione, supervisione, aggressione", key:true}]},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione · 15.11",
  titolo:"Il turno", sottotitolo:"Priorità, attribuzione e aggressione",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
