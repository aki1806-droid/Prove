// Contenuto delle 50 scene della lezione 16.4 — l'embolia polmonare in
// Medicina. Il ragionamento è una catena dal rischio alla TVP; la diagnosi
// un bivio sulla probabilità clinica; le quattro falle e la prevenzione
// griglie che si accendono; il Padua Prediction Score due tabelle e una
// misura con la soglia di 4; errori e risposta modello stanno in tabella e
// nel promemoria che si scrive riga per riga.

const LEZIONI = [
  {n:"3.2", t:"Trombosi e immobilità", illu:"letto"},
  {n:"5.5", t:"Anticoagulanti", illu:"siringa"},
  {n:"8.2", t:"Ossigeno", illu:"polmoni"},
  {n:"2.6", t:"Segnalazione", illu:"cartella"},
  {n:"14.7", t:"Mezzo di contrasto", illu:"provetta"}];

const FALLE = (att) => ({tipo:"griglia", tema:"tenue", colonne:1, spunta:false, attive:att, celle:[
  {n:"1", t:"Nessuna **valutazione** del rischio tromboembolico all'ingresso"},
  {n:"2", t:"**Profilassi** non prescritta: persa nel passaggio dal Pronto Soccorso al reparto"},
  {n:"3", t:"Il segnale di **TVP** di ieri: annotato, non interpretato né segnalato"},
  {n:"4", t:"**Mobilizzazione** insufficiente"}]});

const PREVENZIONE = (att) => ({tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, attive:att, celle:[
  {t:"Rischio tromboembolico **ed emorragico**: all'ingresso e a ogni cambiamento"},
  {t:"Profilassi **prescritta** e **somministrata** · riconciliazione (5.4)"},
  {t:"**Mobilizzazione** precoce, esercizi degli arti inferiori"},
  {t:"**Idratazione**"},
  {t:"Profilassi **meccanica** secondo indicazione"},
  {t:"**Ispezione** degli arti: dolore, edema monolaterale, calore"},
  {t:"**Educazione** del paziente"}]});

const RISPOSTA = (att) => ({tipo:"memo", tema:"chiaro", attive:att, voci:[
  "**Chi è**: immobilizzata da 4 giorni, obesa, con infezione acuta, senza profilassi",
  "Alzandosi: dispnea improvvisa, dolore pleuritico, tachicardia, desaturazione → **sospetta EP**",
  "A letto semiseduta · **medico** subito · O₂ target 94–98% · monitoraggio · accesso",
  "ECG e prelievi · **non** massaggio l'arto · angio-TC · anticoagulante · sorveglianza · rassicuro",
  "**Segnalo** l'evento: rischio non valutato, profilassi persa dal PS",
  "Mobilizzazione secondo indicazione · **educazione** su anticoagulante e recidiva"]});

const COLLEGAMENTI = (att) => ({tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, attive:att, celle:[
  {n:"3.2", t:"**Trombosi** e immobilità"}, {n:"5.5", t:"**Anticoagulanti**"},
  {n:"8.2", t:"**Ossigeno**"}, {n:"2.6", t:"**Rischio clinico** e segnalazione"},
  {n:"5.4", t:"**Riconciliazione**"}, {n:"14.7", t:"D-dimero (14.6) e **contrasto**"},
  {n:"9.5", t:"Complicanze **postoperatorie**"}]});

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 16 · Casi clinici avanzati",
  titolo:"L'embolia polmonare<br>in Medicina", sottotitolo:"16.4 · Il rischio non valutato e il polpaccio «da posizione»",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"figura", tema:"chiaro", illu:"polmoni", sopratitolo:"Micro-lezione 4 di 12 · una morte evitabile, fra le più frequenti in ospedale",
  titolo:"L'embolia polmonare, **in Medicina**.", sotto:"In una paziente che non era stata operata."},
{id:"s03", tipo:"anello", tema:"chiaro", sopratitolo:"Un rischio non valutato, un segnale non interpretato · i collegamenti",
  centro:"16.4", sotto:"cominciata giorni prima", voci:LEZIONI},

{id:"s04", tipo:"cifre", tema:"chiaro", sopratitolo:"Lo scenario · la signora Paola · in terapia antibiotica, nessuna profilassi antitrombotica", voci:[
  {n:"58", suf:"anni", t:"obesa", d:"BMI 34"},
  {n:"4", suf:"giorni", t:"in Medicina", d:"pielonefrite · quasi sempre **a letto**", key:true}]},
{id:"s05", tipo:"corpo", tema:"chiaro", sopratitolo:"Ieri, e oggi al primo tentativo di andare in bagno", lato:"fronte", voci:[
  {z:"gambe", t:"**Ieri**: dolore e gonfiore al polpaccio sinistro", d:"annotati «da posizione»", key:true},
  {z:"torace", t:"**Oggi**: dispnea improvvisa", d:"dolore toracico che aumenta con il respiro"},
  {z:"viso", t:"Molto ansiosa"}]},
{id:"s06", tipo:"pausa", tema:"chiaro", sopratitolo:"I parametri di oggi", es:"Lo scenario",
  testo:"Che cosa **pensi**, e che cosa **fai**?",
  dati:["FC 122", "FR 30", "SpO₂ 86% in aria", "PA 104/68"]},

{id:"s07", tipo:"catena", tema:"chiaro", sopratitolo:"Il ragionamento", passi:[
  {t:"Immobilità · obesità · **infezione acuta**"},
  {t:"Rischio tromboembolico **elevato**"},
  {t:"Polpaccio dolente e gonfio, **un solo lato**", d:"ieri: probabile trombosi venosa profonda", key:true}]},
{id:"s08", tipo:"figura", tema:"chiaro", illu:"polmoni", lato:"dx", sopratitolo:"Alzandosi: dispnea improvvisa, dolore pleuritico, tachicardia, desaturazione, ansia",
  titolo:"**Embolia polmonare** fino a prova contraria.", sotto:"La pressione è conservata, ma va sorvegliata: l'embolia ad alto rischio si presenta con lo **shock**."},

{id:"s09", tipo:"icone", tema:"chiaro", sopratitolo:"Le prime azioni", voci:[
  {icona:"letto", t:"A letto, semiseduta", d:"non farla camminare"},
  {icona:"telefono", t:"Il medico, subito", d:"con lo SBAR", key:true},
  {icona:"mascherina", t:"Ossigeno", d:"target 94–98%"}]},
{id:"s10", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Monitorare, e prelevare", celle:[
  {t:"**Monitoraggio** continuo"}, {t:"**Accesso** venoso"},
  {t:"**ECG**: spesso solo tachicardia sinusale · il quadro «da manuale» non sempre c'è", key:true},
  {t:"**Prelievi**: emocromo, coagulazione, funzione renale, troponina, emogas"}]},
{id:"s11", tipo:"icone", tema:"chiaro", sopratitolo:"E due cose da non fare", voci:[
  {icona:"divieto", t:"Non massaggiare l'arto"},
  {icona:"persone", t:"Non lasciarla sola", d:"l'ansia fa parte del quadro: la tua presenza la riduce", key:true}]},

{id:"s12", tipo:"bivio", tema:"chiaro", sopratitolo:"La diagnosi", radice:"Quanto è probabile, clinicamente?", rami:[
  {q:"probabilità bassa", t:"D-dimero", d:"serve soprattutto a escludere"},
  {q:"probabilità alta, come qui", t:"Angio-TC polmonare, direttamente", key:true}]},
{id:"s13", tipo:"icone", tema:"chiaro", sopratitolo:"Il D-dimero sale in molte condizioni, anche nelle infezioni · il mezzo di contrasto (14.7)", voci:[
  {icona:"rene", t:"Funzione renale"}, {icona:"avviso", t:"Allergie"}, {icona:"flebo", t:"Un accesso adeguato", key:true}]},
{id:"s14", tipo:"tre", tema:"chiaro", sopratitolo:"Ecografia degli arti inferiori · la terapia, secondo prescrizione", box:[
  {n:"1", t:"Eparina", d:"a basso peso molecolare o non frazionata"},
  {n:"2", t:"Anticoagulante orale"},
  {n:"Se shock", t:"Trombolisi sistemica", d:"si valuterebbe", key:true}]},

{id:"s15", tipo:"tre", tema:"chiaro", sopratitolo:"La sorveglianza in anticoagulazione · parametri, saturazione e segni di peggioramento", box:[
  {n:"1", t:"Ipotensione"}, {n:"2", t:"Sincope"}, {n:"3", t:"Più dispnea", key:true}]},
{id:"s16", tipo:"corpo", tema:"chiaro", sopratitolo:"I segni di sanguinamento · niente intramuscolari · aPTT con l'eparina non frazionata", lato:"fronte", voci:[
  {z:"viso", t:"**Gengive** · cefalea"},
  {z:"braccia", t:"**Ematomi**, punti di puntura", key:true},
  {z:"perineo", t:"**Urine**, feci"}]},
{id:"s17", tipo:"tabella", tema:"chiaro", sopratitolo:"I controlli in base al farmaco, e la mobilizzazione", colonne:["38%","62%"],
  intestazioni:["Che cosa", "Come"], righe:[
  ["Eparina non frazionata", "**aPTT**"],
  ["Eparine", "**piastrine**: rischio di piastrinopenia indotta"],
  ["Mobilizzazione", "avviata l'anticoagulazione, secondo indicazione medica · non a letto più del necessario"]], chiave:[1]},

{id:"s18", sopratitolo:"Che cosa non ha funzionato · la parte più utile", ...FALLE([0,1])},
{id:"s19", sopratitolo:"Che cosa non ha funzionato", ...FALLE([0,1,2,3])},
{id:"s20", tipo:"frase", tema:"chiaro", sopratitolo:"Lezione 2.6 · per correggere il percorso",
  testo:"Un evento da **segnalare** e analizzare.", sotto:"Non per trovare un colpevole. E certamente non da nascondere."},

{id:"s21", tipo:"norma", tema:"chiaro", etichetta:"Pazienti in area medica · sviluppato a Padova", sigla:"Padua",
  testo:"Il **Padua Prediction Score**: punti a **undici** fattori."},
{id:"s22", tipo:"tabella", tema:"chiaro", sopratitolo:"Padua Prediction Score · tre e due punti", colonne:["70%","30%"],
  intestazioni:["Fattore", "Punti"], righe:[
  ["Cancro attivo", "3"], ["Pregresso tromboembolismo", "3"],
  ["**Ridotta mobilità**", "**3**"], ["Trombofilia nota", "3"],
  ["Trauma o chirurgia recente", "2"]], chiave:[2]},
{id:"s23", tipo:"tabella", tema:"chiaro", sopratitolo:"Un punto ciascuno · da 4 in su: rischio alto", colonne:["70%","30%"],
  intestazioni:["Fattore", "Punti"], righe:[
  ["Età ≥ 70 anni", "1"], ["Scompenso cardiaco o respiratorio", "1"],
  ["Infarto o ictus acuto", "1"], ["**Infezione acuta** o malattia reumatologica", "**1**"],
  ["**Obesità** (BMI ≥ 30)", "**1**"], ["Terapia ormonale", "1"]], chiave:[3,4]},
{id:"s24", tipo:"misura", tema:"chiaro", sopratitolo:"Profilassi se non controindicata",
  min:0, max:8, passo:2, soglia:4, valore:5, direzione:"alto-peggio",
  titolo:"La signora Paola: **5 punti**.", sotto:"Ridotta mobilità 3 + infezione 1 + obesità 1 · la profilassi era indicata **dal primo giorno**."},

{id:"s25", sopratitolo:"La prevenzione è in gran parte infermieristica", ...PREVENZIONE([0,1])},
{id:"s26", sopratitolo:"Nei passaggi fra setting le terapie si perdono", ...PREVENZIONE([0,1,2,3])},
{id:"s27", sopratitolo:"Il paziente può riferire per primo un sintomo", ...PREVENZIONE([0,1,2,3,4,5,6])},

{id:"s28", tipo:"icone", tema:"chiaro", sopratitolo:"L'educazione alla dimissione", voci:[
  {icona:"pillola", t:"Anticoagulante orale", d:"regolare · mai sospenderlo da soli · per la durata indicata", key:true},
  {icona:"goccia", t:"Segni di sanguinamento", d:"da segnalare"}]},
{id:"s29", tipo:"tre", tema:"chiaro", sopratitolo:"Le interazioni, e chi deve saperlo", box:[
  {n:"FANS", t:"Farmaci da banco"}, {n:"+", t:"Integratori"},
  {n:"Dentista", t:"e ogni medico", key:true}]},
{id:"s30", tipo:"icone", tema:"chiaro", sopratitolo:"Recidiva: gamba dolente o gonfia, dispnea improvvisa → 112 / 118", voci:[
  {icona:"telefono", t:"112 · 118", d:"subito, ai segni di recidiva", key:true},
  {icona:"persona", t:"Movimento"}, {icona:"bicchiere", t:"Idratazione"},
  {icona:"orologio", t:"Viaggi lunghi", d:"le precauzioni"}, {icona:"bilancia2", t:"Peso"}]},

{id:"s31", tipo:"citazione", tema:"chiaro", sopratitolo:"Comunicare con la paziente · una domanda difficile",
  testo:"Perché mi è successo, **qui in ospedale**?", fonte:"Onestà e chiarezza, nei limiti delle proprie competenze"},
{id:"s32", tipo:"griglia", tema:"chiaro", colonne:2, sopratitolo:"Secondo le procedure aziendali", celle:[
  {t:"Il **medico**, per una comunicazione completa dell'evento", key:true},
  {t:"**Onestà** e chiarezza"},
  {no:true, t:"Scaricare responsabilità **sui colleghi**"},
  {no:true, t:"**Minimizzare**"}]},
{id:"s33", tipo:"frase", tema:"chiaro", sopratitolo:"Rassicurare sul trattamento in corso · documentare il colloquio",
  testo:"La fiducia si perde più per un **silenzio** che per un errore spiegato con sincerità."},

{id:"s34", tipo:"tabella", tema:"chiaro", sopratitolo:"Gli errori da evitare · prima", colonne:["52%","48%"],
  intestazioni:["Errore", "Invece"], righe:[
  ["no:Polpaccio dolente annotato «da posizione»", "**segnalarlo**"],
  ["no:Non valutare il rischio", "una scala all'**ingresso**"],
  ["no:Profilassi non verificata fra un setting e l'altro", "**riconciliazione**"]], chiave:[0]},
{id:"s35", tipo:"tabella", tema:"chiaro", sopratitolo:"Gli errori da evitare · durante e dopo", colonne:["52%","48%"],
  intestazioni:["Errore", "Invece"], righe:[
  ["no:Far camminare con dispnea improvvisa", "a letto, **semiseduta**"],
  ["no:Rassicurarsi per la pressione normale", "**sorvegliarla**"],
  ["no:Massaggiare l'arto", "**mai**"],
  ["no:Non segnalare l'evento", "segnalare e **analizzare**"]], chiave:[1]},

{id:"s36", tipo:"tre", tema:"chiaro", sopratitolo:"D1 · «Quali sono i segni della TVP e dell'embolia polmonare?» · la TVP", box:[
  {n:"1", t:"Dolore"}, {n:"2", t:"Edema monolaterale", key:true}, {n:"3", t:"Calore dell'arto"}]},
{id:"s37", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"D1 · l'embolia polmonare · poi D2: come si valuta il rischio nel paziente medico?", celle:[
  {n:"1", t:"Dispnea **improvvisa**"}, {n:"2", t:"Dolore **pleuritico**"}, {n:"3", t:"**Tachicardia**"},
  {n:"4", t:"**Desaturazione**"}, {n:"5", t:"**Ansia**"}, {n:"6", t:"Nei casi gravi: **ipotensione**, sincope", key:true}]},
{id:"s38", tipo:"cifre", tema:"chiaro", sopratitolo:"D2 · con la valutazione del rischio emorragico · poi D3: a che cosa serve il D-dimero?", voci:[
  {n:"4", suf:"punti", t:"Padua Prediction Score", d:"da 4 in su: rischio **alto**", key:true}]},
{id:"s39", tipo:"confronto", tema:"chiaro", sopratitolo:"D3 · il D-dimero: alto valore predittivo negativo", col:[
  {h:"Valore normale", t:"in bassa probabilità **esclude** la trombosi"},
  {h:"Valore alto", t:"**non** la conferma: aumenta in molte condizioni"}]},

{id:"s40", sopratitolo:"La risposta modello, in 15 righe", ...RISPOSTA([0])},
{id:"s41", sopratitolo:"La risposta modello · il sospetto e le prime azioni", ...RISPOSTA([0,1,2])},
{id:"s42", sopratitolo:"La risposta modello · diagnosi, terapia, sorveglianza", ...RISPOSTA([0,1,2,3])},
{id:"s43", sopratitolo:"La risposta modello · la segnalazione e la dimissione", ...RISPOSTA([0,1,2,3,4,5])},

{id:"s44", sopratitolo:"I collegamenti", ...COLLEGAMENTI([0,1,2,3])},
{id:"s45", sopratitolo:"I collegamenti", ...COLLEGAMENTI([0,1,2,3,4,5,6])},

{id:"s46", tipo:"tre", tema:"chiaro", sopratitolo:"Una riflessione · in ospedale è spesso un evento evitabile · gli strumenti esistono", box:[
  {n:"1", t:"Le scale"}, {n:"2", t:"La profilassi", key:true}, {n:"3", t:"La mobilizzazione"}]},
{id:"s47", tipo:"figura", tema:"chiaro", illu:"gambe", sopratitolo:"La differenza la fanno l'attenzione ai passaggi fra setting",
  titolo:"Dare un **significato** a un segno.", sotto:"Come un polpaccio gonfio, invece di archiviarlo."},

{id:"s48", tipo:"titolo", tema:"profondo",
  titolo:"Un polpaccio gonfio<br>da un solo lato<br>non è «**da posizione**»",
  sotto:"Finché non si dimostra il contrario · la frase del caso"},

{id:"s49", tipo:"tre", tema:"chiaro", sopratitolo:"Nella prossima lezione · un'epidemia di diarrea in reparto", box:[
  {n:"1", t:"Isolamento"}, {n:"2", t:"Igiene delle mani", key:true}, {n:"3", t:"Sanificazione"}, {n:"4", t:"Antibiotici", d:"uso responsabile"}]},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione · 16.5",
  titolo:"Diarrea<br>in reparto", sottotitolo:"Clostridioides difficile e isolamento",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
