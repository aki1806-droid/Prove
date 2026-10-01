// Contenuto delle 50 scene della lezione 5.5 — cardiovascolari, antidiabetici,
// anticoagulanti. Un corpo nuovo: i profili delle insuline (quattro curve
// sulle 24 ore che si disegnano una dopo l'altra, la rapida al pasto). Le
// classi sono colonne a tre o quattro, gli antidoti una tabella a colonne, la
// regola del 15 un percorso. Illustrazioni nuove: il cuore con la traccia, la
// penna da insulina, il frigorifero, il bicchiere di succo, la goccia di sangue.

const SUFFISSI = [
 {n:"-pril", t:"**ACE-inibitori**: ramipril, enalapril"}, {n:"-sartan", t:"**Sartani**"}, {n:"-olol", t:"**Beta-bloccanti**", key:true}, {n:"-dipina", t:"**Calcio-antagonisti**: amlodipina"},
 {n:"-gliflozin", t:"SGLT2-inibitori"}, {n:"-gliptin", t:"DPP-4 inibitori"}, {n:"-glutide", t:"agonisti GLP-1"}, {n:"-parina", t:"**Eparine** a basso peso molecolare"},
];
const DIURETICI = [
 {h:"Dell'ansa", key:true, voci:[{t:"Furosemide: i più potenti"}, {t:"Potassio, pressione, disidratazione", key:true}, {t:"EV **non rapida**: ototossicità"}]},
 {h:"Tiazidici", voci:[{t:"Ipokaliemia"}, {t:"Iperglicemia"}, {t:"Acido urico ↑"}]},
 {h:"Risparmiatori di K", voci:[{t:"Spironolattone"}, {t:"**Iperkaliemia**", key:true}]},
];
const MONIT = [
 {icona:"bilancia2", t:"Peso", d:"quotidiano", key:true}, {icona:"bilancio", t:"Bilancio idrico"}, {icona:"catetere", t:"Diuresi"}, {icona:"cuore2", t:"Pressione", d:"anche in piedi"}, {icona:"provetta", t:"Potassio", d:"e creatinina"},
];
const BETA = [
 {n:"1", t:"**Bradicardia** e ipotensione", key:true}, {n:"2", t:"**Broncospasmo** negli asmatici (non selettivi)"},
 {n:"3", t:"**Mascherano** l'ipoglicemia nel diabetico"}, {n:"4", t:"**Non si sospendono bruscamente**: rimbalzo"},
];
const TRE = [
 {h:"Calcio-antagonisti", voci:[{t:"Edemi alle caviglie, cefalea"}, {t:"Verapamil, diltiazem: bradicardia"}]},
 {h:"Nitrati", key:true, voci:[{t:"Cefalea, ipotensione"}, {t:"**Controindicati con sildenafil**: va chiesto", key:true}]},
 {h:"Amiodarone", voci:[{t:"Flebite in periferica"}, {t:"Tiroide, cute, polmone"}]},
];
const DIGOX = [
 {n:"1", t:"Nausea, vomito, perdita di appetito"}, {n:"2", t:"**Disturbi visivi**: la visione gialla", key:true}, {n:"3", t:"Bradicardia, aritmie"},
];
const EPARINE = [
 {h:"Non frazionata", voci:[{t:"EV in **infusione continua**, con pompa"}, {t:"Monitoraggio: **aPTT**"}, {t:"Antidoto: **protamina**", key:true}]},
 {h:"Basso peso molecolare", key:true, voci:[{t:"Enoxaparina: **sottocute**"}, {t:"Dose sul peso, adattata al rene"}, {t:"Protamina: solo in parte"}]},
];
const ORALI = [
 {h:"Warfarin", voci:[{t:"Antagonista della vitamina K"}, {t:"Effetto in **giorni**"}, {t:"**INR 2–3**", key:true}, {t:"Molte interazioni"}, {t:"Antidoto: **vitamina K**"}]},
 {h:"DOAC", key:true, voci:[{t:"Dabigatran: trombina"}, {t:"Rivaroxaban, apixaban, edoxaban: fattore Xa"}, {t:"**Niente INR** di routine"}, {t:"Emivita breve: **nessuna dose saltata**", key:true}, {t:"Idarucizumab · antidoti anti-Xa"}]},
];
const ANTIDOTI = [
 {h:"Anticoagulanti", voci:[{t:"Eparina non frazionata → **protamina**"}, {t:"Warfarin → **vitamina K**, complesso protrombinico", key:true}, {t:"Dabigatran → **idarucizumab**"}, {t:"Anti-Xa → antidoto specifico / complesso protrombinico"}]},
 {h:"Gli altri", voci:[{t:"Ipoglicemia da insulina → **glucagone / glucosio**", key:true}, {t:"Digossina → **anticorpi antidigossina**"}]},
];
const SANGUE = [
 {t:"Gengive, **epistassi**"}, {t:"Urine scure o rosse, **feci nere**"}, {t:"Ematomi"}, {t:"**Cefalea improvvisa**: sanguinamento cerebrale", key:true},
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 5 · Farmacologia e gestione sicura della terapia",
  titolo:"Cardiovascolari, antidiabetici<br>e anticoagulanti", sottotitolo:"5.5 · Che cosa controllare prima, sorvegliare dopo, e l'antidoto",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"frase", tema:"chiaro", sopratitolo:"Micro-lezione 5 di 8 · tre famiglie che trovi in quasi ogni reparto, tre famiglie ad alto rischio",
  testo:"Per ciascuna l'approccio è lo stesso, ed è quello che **i concorsi premiano**."},
{id:"s03", tipo:"catena", tema:"chiaro", sopratitolo:"Non serve conoscere tutti i principi attivi", passi:[
  {t:"Prima", d:"che cosa controllare"}, {t:"Dopo", d:"che cosa sorvegliare", key:true}, {t:"L'antidoto", d:"se qualcosa va storto"}]},

{id:"s04", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, attive:[0,1,2,3], sopratitolo:"Il trucco dei suffissi · riconoscere la classe dal nome", celle:SUFFISSI},
{id:"s05", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Il trucco dei suffissi · ti dice subito che cosa sorvegliare", celle:SUFFISSI},

{id:"s06", tipo:"colonne", tema:"chiaro", sopratitolo:"I diuretici", attive:[0], colonne:DIURETICI},
{id:"s07", tipo:"colonne", tema:"chiaro", sopratitolo:"I diuretici · tiazidici e risparmiatori di potassio fanno il contrario", colonne:DIURETICI},
{id:"s08", tipo:"figura", tema:"chiaro", sopratitolo:"Una regola pratica", illu:"orologio",
  titolo:"Si danno **al mattino**.",
  sotto:"Per non costringere la persona ad alzarsi di notte, con il rischio di caduta che ne consegue."},
{id:"s09", tipo:"icone", tema:"chiaro", sopratitolo:"Il monitoraggio di chi assume un diuretico · la lezione 3.5, il paziente scompensato del modulo 8", voci:MONIT},

{id:"s10", tipo:"confronto", tema:"chiaro", sopratitolo:"ACE-inibitori e sartani · abbassano la pressione, proteggono cuore e reni", col:[
  {h:"ACE-inibitori", t:"**Tosse secca**: spesso si passa a un sartano", key:true},
  {h:"Sartani", t:"Stessi effetti, **senza la tosse**"}]},
{id:"s11", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"ACE-inibitori e sartani · gli effetti da sorvegliare", celle:[
  {n:"!", t:"**Angioedema**: labbra, lingua, glottide — un'emergenza", key:true}, {n:"2", t:"**Iperkaliemia**"}, {n:"3", t:"**Ipotensione**, soprattutto alla prima dose"}]},

{id:"s12", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, attive:[0,1], sopratitolo:"I beta-bloccanti · rallentano il cuore", celle:BETA},
{id:"s13", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"I beta-bloccanti · nel diabetico mascherano tremore e tachicardia", celle:BETA},
{id:"s14", tipo:"figura", tema:"chiaro", sopratitolo:"Prima di somministrarli", illu:"cuore2",
  titolo:"Si controllano **frequenza e pressione**.",
  sotto:"Se la prescrizione indica soglie, sotto quelle soglie si sospende e si avvisa."},

{id:"s15", tipo:"colonne", tema:"chiaro", sopratitolo:"Tre classi in una slide", attive:[0], colonne:TRE},
{id:"s16", tipo:"colonne", tema:"chiaro", sopratitolo:"I nitrati · con il sildenafil, ipotensioni gravi: va chiesto", attive:[0,1], colonne:TRE},
{id:"s17", tipo:"colonne", tema:"chiaro", sopratitolo:"L'amiodarone · irritante per le vene; a lungo termine tiroide, cute, polmone", colonne:TRE},

{id:"s18", tipo:"figura", tema:"chiaro", sopratitolo:"La digossina · finestra terapeutica stretta (lezione 5.1)", illu:"orologio", lato:"dx",
  titolo:"Frequenza apicale **per un minuto**, prima della somministrazione.",
  sotto:"Sotto la soglia prescritta, si sospende e si avvisa."},
{id:"s19", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"La digossina · i segni di tossicità", celle:DIGOX},
{id:"s20", tipo:"sostituzione", tema:"chiaro", sopratitolo:"Un'interazione da sapere · due farmaci che spesso stanno nella stessa terapia",
  da:{h:"Diuretico dell'ansa", t:"ipokaliemia"}, a:{h:"Digossina", t:"tossicità aumentata"},
  sotto:"L'ipokaliemia aumenta la tossicità della digossina."},

{id:"s21", tipo:"profili", tema:"chiaro", sopratitolo:"Le insuline · gli analoghi rapidi al pasto: se poi non mangia, l'ipoglicemia è immediata", attive:[0,1], pasto:true},
{id:"s22", tipo:"profili", tema:"chiaro", sopratitolo:"Le insuline · la NPH va rotolata, non agitata; le basali non si miscelano; in vena solo rapida o regolare", pasto:true},

{id:"s23", tipo:"figura", tema:"chiaro", sopratitolo:"La conservazione · le confezioni non aperte", illu:"frigo",
  titolo:"In frigorifero, **fra 2 e 8 gradi**. Mai congelare.",
  sotto:"L'insulina congelata si altera anche se scongelata."},
{id:"s24", tipo:"figura", tema:"chiaro", sopratitolo:"La penna in uso · la catena del freddo della lezione 5.7", illu:"penna", lato:"dx",
  titolo:"A temperatura ambiente, per il periodo del produttore.",
  sotto:"Generalmente alcune settimane: si annota la data di apertura."},

{id:"s25", tipo:"confronto", tema:"chiaro", sopratitolo:"L'ipoglicemia · sotto 70 mg/dl", col:[
  {h:"Adrenergici", t:"Tremore, sudorazione, tachicardia, fame", key:true},
  {h:"Neuroglicopenici", t:"Confusione, comportamento anomalo, sonnolenza, fino al coma"}]},
{id:"s26", tipo:"percorso", tema:"chiaro", sopratitolo:"La regola del 15 · nella persona cosciente; nell'anziano e con i beta-bloccanti i sintomi adrenergici possono mancare", tappe:[
  {t:"15 g di zuccheri semplici", d:"succo, zucchero in acqua, bustine di glucosio", key:true}, {t:"15 minuti"}, {t:"Ricontrollo", d:"della glicemia"}]},
{id:"s27", tipo:"titolo", tema:"profondo",
  titolo:"Incosciente:<br>**niente per bocca**.",
  sotto:"Glucagone intramuscolo o sottocute, oppure glucosio endovena, secondo protocollo."},

{id:"s28", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"Gli antidiabetici non insulinici · la metformina, il farmaco di base", celle:[
  {n:"1", t:"**Metformina**: disturbi gastrointestinali; raramente **acidosi lattica**", key:true},
  {n:"2", t:"Secondo protocollo prima di **mezzo di contrasto** e interventi"}]},
{id:"s29", tipo:"confronto", tema:"chiaro", sopratitolo:"Sulfaniluree e agonisti GLP-1", col:[
  {h:"Sulfaniluree", t:"Stimolano l'insulina: **ipoglicemie**, anche prolungate, soprattutto nell'anziano", key:true},
  {h:"-glutide", t:"Agonisti GLP-1: iniettivi, spesso **nausea**"}]},
{id:"s30", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"Gli SGLT2-inibitori · i -gliflozin: eliminano glucosio con le urine", celle:[
  {n:"1", t:"**Infezioni genitourinarie**"}, {n:"2", t:"**Chetoacidosi anche con glicemia normale**", key:true}, {n:"3", t:"Si sospendono prima degli interventi, secondo protocollo"}]},

{id:"s31", tipo:"colonne", tema:"chiaro", sopratitolo:"Gli anticoagulanti · le eparine", attive:[0], colonne:EPARINE},
{id:"s32", tipo:"colonne", tema:"chiaro", sopratitolo:"Le eparine a basso peso molecolare · senza monitoraggio di routine", colonne:EPARINE},
{id:"s33", tipo:"figura", tema:"chiaro", sopratitolo:"Con tutte le eparine", illu:"goccia2",
  titolo:"Si sorvegliano **le piastrine**.",
  sotto:"Per il rischio di trombocitopenia indotta da eparina, la HIT."},

{id:"s34", tipo:"colonne", tema:"chiaro", sopratitolo:"Il warfarin · antagonista della vitamina K, effetto in giorni, INR 2–3", attive:[0], colonne:ORALI},
{id:"s35", tipo:"trappola", tema:"chiaro", sopratitolo:"Sull'alimentazione · un errore da quiz", righe:[
  {sb:"Eliminare la vitamina K dalla dieta", ok:"Assumerla con **costanza**: sono le variazioni brusche a destabilizzare l'INR"}]},
{id:"s36", tipo:"frase", tema:"chiaro", sopratitolo:"Il warfarin · molte interazioni: antibiotici, amiodarone, FANS, alcol",
  testo:"L'antidoto è la **vitamina K**; nel sanguinamento grave, il **concentrato di complesso protrombinico**."},

{id:"s37", tipo:"colonne", tema:"chiaro", sopratitolo:"I DOAC · gli anticoagulanti orali diretti", colonne:ORALI},
{id:"s38", tipo:"frase", tema:"chiaro", sopratitolo:"Emivita breve",
  testo:"Una dose saltata lascia la persona **scoperta in fretta**: l'aderenza è cruciale.",
  sotto:"Antidoti: idarucizumab per il dabigatran; per gli anti-Xa un antidoto specifico, o il complesso protrombinico."},

{id:"s39", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Gli antiaggreganti · non sono anticoagulanti, ma aumentano il rischio di sanguinamento", celle:[
  {n:"1", t:"**Acido acetilsalicilico**"}, {n:"2", t:"**Clopidogrel**"}, {n:"3", t:"**Ticagrelor**"}, {n:"4", t:"**Prasugrel**"}]},
{id:"s40", tipo:"titolo", tema:"profondo",
  titolo:"Dopo uno stent coronarico, **la doppia antiaggregazione non si sospende**.",
  sotto:"Senza il cardiologo: trombosi dello stent, spesso fatale."},
{id:"s41", tipo:"frase", tema:"chiaro", sopratitolo:"«Il medico di base mi ha detto di smettere l'aspirina prima dell'intervento»",
  testo:"La domanda da porre: **ha uno stent?**"},

{id:"s42", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"L'assistenza al paziente anticoagulato · i segni di sanguinamento", celle:SANGUE},
{id:"s43", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"L'assistenza al paziente anticoagulato · le precauzioni", celle:[
  {t:"**Spazzolino morbido**, rasoio elettrico"}, {t:"**Evitare le intramuscolari**", key:true}, {t:"**Compressione prolungata** dopo prelievi e rimozione di accessi"}, {t:"**Prevenzione delle cadute** (3.1), educazione alla dimissione"}]},

{id:"s44", tipo:"colonne", tema:"chiaro", sopratitolo:"La tabella degli antidoti · da fotografare", attive:[0], colonne:ANTIDOTI},
{id:"s45", tipo:"colonne", tema:"chiaro", sopratitolo:"La tabella degli antidoti", colonne:ANTIDOTI},

{id:"s46", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"In Veneto", celle:[
  {n:"1", t:"**Centri e ambulatori** per la terapia anticoagulante orale, con presa in carico territoriale", key:true},
  {n:"2", t:"**Procedure aziendali** sull'ipoglicemia e sull'insulina in reparto"}]},
{id:"s47", tipo:"frase", tema:"chiaro", sopratitolo:"All'orale · l'educazione terapeutica alla dimissione, con il teach-back",
  testo:"Chi va a casa con un anticoagulante o con l'insulina deve saper riconoscere **i segni di allarme**."},

{id:"s48", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Ricapitoliamo", celle:[
  {t:"**Diuretici** al mattino, controllando il potassio"}, {t:"**Beta-bloccanti**: frequenza e pressione prima"},
  {t:"**Digossina**: polso apicale un minuto; l'ipokaliemia aumenta la tossicità", key:true}]},
{id:"s49", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Ricapitoliamo · e gli antidoti a memoria", celle:[
  {t:"**Ipoglicemia** sotto 70: regola del 15; niente per bocca se incosciente", key:true}, {t:"**Warfarin**: INR 2–3, vitamina K con costanza"},
  {t:"**DOAC**: niente INR, nessuna dose saltata"}]},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione",
  titolo:"5.6<br>Antibiotici, analgesici<br>e stupefacenti", sottotitolo:"La scala del dolore, gli oppioidi, il registro degli stupefacenti",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
