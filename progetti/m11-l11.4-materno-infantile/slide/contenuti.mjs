// Contenuto delle 50 scene della lezione 11.4 — area materno-infantile.
// Le emorragie sono un confronto (previa indolore, distacco doloroso); il
// magnesio una catena di sorveglianza; il parto un percorso; l'ittero due
// scene profonde sulla regola delle 24 ore; il dolore una scala per età.

const PARTO = (att) => ({tipo:"percorso", tema:"chiaro", tappe:[
  {t:"Prodromica", d:""}, {t:"Dilatante", d:"fino a 10 cm"}, {t:"Espulsiva", d:""}, {t:"Secondamento", d:"la placenta"}, {t:"Post-partum", d:"prime 2 ore"}], attive:att});

const EMO = (k) => ({tipo:"confronto", tema:"chiaro", col:[
  {h:"Placenta previa", t:"rosso vivo, **indolore** · niente esplorazioni vaginali", key:k===0},
  {h:"Distacco di placenta", t:"**dolore**, utero teso e duro, sofferenza fetale", key:k===1}]});

const SCALE = (k) => [
  {n:"<3", t:"FLACC", d:"o bambino che non parla", key:k===0}, {n:"3-4", t:"Facce di Wong-Baker", d:"dai 3-4 anni", key:k===1},
  {n:"8", t:"Numerica", d:"dagli 8 anni circa", key:k===2}];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 11 · Setting assistenziali e ciclo di vita",
  titolo:"Area<br>materno-infantile", sottotitolo:"11.4 · Gravidanza e complicanze, il neonato, la pediatria di base",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"frase", tema:"chiaro", sopratitolo:"Micro-lezione 4 di 8 · il territorio dell'ostetrica e dell'infermiere pediatrico",
  testo:"Ma l'infermiere generalista la incontra **spesso**."},
{id:"s03", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"I fondamenti servono a tutti", celle:[
  {n:"·", t:"Una donna in **gravidanza** in medicina"}, {n:"·", t:"Un **neonato** in pronto soccorso", key:true}, {n:"·", t:"Un **bambino** fra gli adulti"}]},
{id:"s04", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Che cosa chiedono i concorsi · regole secche, facili da sbagliare", celle:[
  {n:"1", t:"Le **complicanze** della gravidanza"}, {n:"2", t:"Il **neonato**", key:true}, {n:"3", t:"La **pediatria** di base"}]},

{id:"s05", tipo:"cifre", tema:"chiaro", sopratitolo:"La gravidanza · 280 giorni dal primo giorno dell'ultima mestruazione · a termine fra 37 e 42", voci:[
  {n:"40", suf:"", d:"settimane", key:true}]},
{id:"s06", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Regola di Naegele · dal primo giorno dell'ultima mestruazione", celle:[
  {n:"+7", t:"**giorni**"}, {n:"−3", t:"**mesi**", key:true}, {n:"+1", t:"**anno**"}]},
{id:"s07", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Tre trimestri · ogni sintomo si legge nel suo momento", celle:[
  {n:"·", t:"**Controlli**"}, {n:"·", t:"**Ecografie**"}, {n:"·", t:"Esami di **screening**", key:true}]},

{id:"s08", tipo:"norma", tema:"chiaro", etichetta:"Dopo la 20ª settimana · ≥ 140/90", sigla:"Preeclampsia",
  testo:"Ipertensione con **proteinuria** o segni di danno d'organo."},
{id:"s09", tipo:"griglia", tema:"chiaro", colonne:4, spunta:false, sopratitolo:"I segni d'allarme · con le convulsioni: eclampsia", celle:[
  {n:"!", t:"**Cefalea** intensa"}, {n:"!", t:"Disturbi **visivi**"}, {n:"!", t:"Dolore **epigastrico**", key:true}, {n:"!", t:"Edemi improvvisi"}]},
{id:"s10", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Magnesio solfato · i segni di tossicità", celle:[
  {n:"↓", t:"**Riflessi** tendinei", key:true}, {n:"↓", t:"Frequenza **respiratoria**"}, {n:"↓", t:"**Diuresi**"}]},
{id:"s11", tipo:"catena", tema:"chiaro", sopratitolo:"Una sequenza che i concorsi chiedono spesso", passi:[
  {t:"Magnesio solfato"}, {t:"Riflessi, respiro, diuresi"}, {t:"Antidoto: **calcio gluconato**", key:true}]},

{id:"s12", sopratitolo:"Le emorragie · inserita in basso, davanti al canale del parto", ...EMO(0)},
{id:"s13", sopratitolo:"Le esplorazioni possono scatenare un'emorragia massiva", ...EMO(1)},
{id:"s14", tipo:"frase", tema:"chiaro", sopratitolo:"Entrambe emergenze ostetriche: si avvisa subito",
  testo:"**Indolore** la previa, **doloroso** il distacco."},
{id:"s15", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Primo trimestre · in ogni donna in età fertile con dolore addominale", celle:[
  {n:"·", t:"Minaccia d'**aborto**"}, {n:"!", t:"Gravidanza **extrauterina**: dolore, sanguinamento, **shock**", key:true}]},

{id:"s16", tipo:"cifre", tema:"chiaro", sopratitolo:"Diabete gestazionale · curva da carico di glucosio · donne con fattori di rischio", voci:[
  {n:"24-28", suf:"", d:"settimane", key:true}]},
{id:"s17", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Tre attenzioni per chiunque assista una donna in gravidanza", celle:[
  {n:"1", t:"I **farmaci**: si verifica sempre", key:true}, {n:"2", t:"Le **radiazioni**"}, {n:"3", t:"La **posizione**"}]},
{id:"s18", tipo:"catena", tema:"chiaro", sopratitolo:"Dopo la 20ª settimana · si preferisce il decubito laterale sinistro", passi:[
  {t:"Supina **prolungata**"}, {t:"L'utero comprime la **vena cava**"}, {t:"**Ipotensione**", key:true}]},

{id:"s19", sopratitolo:"Il parto", ...PARTO([0,1,2,3])},
{id:"s20", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Il puerperio: circa 6 settimane · i lochi", celle:[
  {n:"1", t:"**Rossi**"}, {n:"2", t:"**Sierosi**"}, {n:"3", t:"**Biancastri**", key:true}]},
{id:"s21", tipo:"confronto", tema:"chiaro", sopratitolo:"L'umore", col:[
  {h:"Baby blues", t:"tristezza **transitoria**, frequente"}, {h:"Depressione post-partum", t:"più duratura e intensa: **riconoscere e segnalare**", key:true}]},

{id:"s22", tipo:"cifre", tema:"chiaro", sopratitolo:"Allattamento esclusivo (OMS) · poi altri alimenti · a richiesta", voci:[
  {n:"6", suf:"", d:"mesi circa", key:true}]},
{id:"s23", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"L'avvio dell'allattamento", celle:[
  {t:"Il **colostro**: poco, ma ricchissimo di **anticorpi**", key:true}, {t:"Il contatto **pelle a pelle** precoce"}]},
{id:"s24", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"Un attacco corretto · previene dolore e ragadi", celle:[
  {t:"**Bocca** ben aperta"}, {t:"Labbro inferiore **estroflesso**"}, {t:"**Mento** a contatto con il seno", key:true}]},

{id:"s25", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"Il neonato · le prime cure", celle:[
  {t:"**Apgar**, lezione 10.4"}, {t:"Prevenire l'**ipotermia**"}, {t:"**Vitamina K**: malattia emorragica", key:true}]},
{id:"s26", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Lo stesso principio dell'identificazione dell'adulto", celle:[
  {t:"Profilassi **oculare** secondo protocollo"}, {t:"**Identificazione** madre-neonato: braccialetti", key:true}]},
{id:"s27", tipo:"cifre", tema:"chiaro", sopratitolo:"Calo di peso fisiologico, recuperato in circa 2 settimane · moncone ombelicale asciutto", voci:[
  {n:"7-10", suf:"%", d:"del peso", key:true}]},

{id:"s28", tipo:"norma", tema:"chiaro", etichetta:"Obbligatori e gratuiti", sigla:"Screening neonatali",
  testo:"Metabolico esteso: gocce di sangue dal **tallone**."},
{id:"s29", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"L. 167/2016 · e altri controlli, come la displasia dell'anca", celle:[
  {t:"**Metabolico** esteso", key:true}, {t:"**Uditivo**"}, {t:"**Visivo**: il riflesso rosso"}]},

{id:"s30", tipo:"percorso", tema:"chiaro", sopratitolo:"L'ittero fisiologico · si risolve spontaneamente", tappe:[
  {t:"Dopo 24 ore", d:"compare"}, {t:"3°-5° giorno", d:"il picco"}, {t:"Risoluzione", d:"spontanea"}], attive:[0,1,2]},
{id:"s31", tipo:"frase", tema:"chiaro", sopratitolo:"Non quanto è giallo il neonato",
  testo:"Ma **quando** l'ittero è comparso."},
{id:"s32", tipo:"titolo", tema:"profondo",
  titolo:"Ittero nelle prime 24 ore:<br>**sempre patologico**.",
  sotto:""},
{id:"s33", tipo:"griglia", tema:"chiaro", colonne:4, spunta:true, sopratitolo:"La fototerapia", celle:[
  {t:"Proteggere gli **occhi**", key:true}, {t:"Massima superficie di **pelle**"}, {t:"**Idratazione** e allattamento"}, {t:"**Temperatura**"}]},

{id:"s34", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Morte improvvisa del lattante · educazione ai genitori", celle:[
  {t:"Dorme **a pancia in su**", key:true}, {t:"**Materasso rigido**: niente cuscini, peluche, paracolpi"}]},
{id:"s35", tipo:"griglia", tema:"chiaro", colonne:4, spunta:true, sopratitolo:"La prevenzione", celle:[
  {t:"Non coprire troppo"}, {t:"**Niente fumo**", key:true}, {t:"Allattamento al **seno**"}, {t:"Culla nella stanza dei **genitori**"}]},

{id:"s36", tipo:"confronto", tema:"chiaro", sopratitolo:"Parametri vitali · si confrontano con i valori dell'età", col:[
  {h:"Più alte", t:"frequenza **cardiaca** e **respiratoria**"}, {h:"Più bassa", t:"la **pressione**", key:true}]},
{id:"s37", tipo:"norma", tema:"chiaro", etichetta:"Lezione 5.3 · verificare la dose massima", sigla:"mg/kg",
  testo:"Dosi in base al **peso** · febbre: paracetamolo secondo il peso."},
{id:"s38", tipo:"titolo", tema:"profondo",
  titolo:"Niente **acido<br>acetilsalicilico**<br>nel bambino.",
  sotto:""},
{id:"s39", tipo:"confronto", tema:"chiaro", sopratitolo:"La disidratazione nel bambino è rapida", col:[
  {h:"Sindrome di Reye", t:"grave **encefalopatia** con danno epatico", key:true}, {h:"Disidratazione", t:"pannolini **asciutti**, mucose secche, letargia"}]},

{id:"s40", tipo:"scala", tema:"chiaro", sopratitolo:"Il dolore nel bambino · FLACC: viso, gambe, attività, pianto, consolabilità", gradini:SCALE(0)},
{id:"s41", tipo:"scala", tema:"chiaro", sopratitolo:"Il bambino indica la faccina che somiglia al suo dolore", gradini:SCALE(1)},
{id:"s42", tipo:"griglia", tema:"chiaro", colonne:4, spunta:true, sopratitolo:"Gli interventi non farmacologici", celle:[
  {t:"I **genitori** presenti", key:true}, {t:"La **distrazione**"}, {t:"**Saccarosio** o allattamento nel neonato"}, {t:"**Crema anestetica** prima del prelievo"}]},

{id:"s43", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Il caso · la madre te lo fa notare, preoccupata", celle:[
  {n:"18", t:"**ore** di vita", key:true}, {n:"!", t:"Pelle e occhi **gialli**"}]},
{id:"s44", tipo:"confronto", tema:"chiaro", sopratitolo:"Che cosa pensi? Che cosa fai?", col:[
  {h:"Prima delle 24 ore", t:"ittero **patologico**"}, {h:"Che cosa fai", t:"**segnali subito** al pediatra o al neonatologo", key:true}]},
{id:"s45", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"Bilirubina e causa: per esempio un'incompatibilità di gruppo", celle:[
  {t:"Sorvegli **stato generale**"}, {t:"**Alimentazione** e urine"}, {t:"Rassicuri, **senza minimizzare**", key:true}]},

{id:"s46", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"In Veneto · il percorso nascita regionale · l'allattamento è un obiettivo", celle:[
  {t:"**Punti nascita** in rete"}, {t:"**Screening** neonatali"}, {t:"**Consultori** familiari", key:true}, {t:"**Pediatri** di libera scelta"}]},

{id:"s47", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"La tabella", celle:[
  {n:"37-42", t:"settimane: **termine**"}, {n:"+7 −3 +1", t:"**Naegele**"}, {n:">20", t:"settimane: **preeclampsia**"},
  {n:"Mg", t:"riflessi, respiro, diuresi"}, {n:"Ca", t:"**calcio gluconato**", key:true}, {n:"·", t:"Previa **indolore**"}]},
{id:"s48", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"La tabella", celle:[
  {n:"Sx", t:"decubito **laterale sinistro**"}, {n:"6", t:"mesi di allattamento **esclusivo**"}, {n:"K", t:"**vitamina** K"},
  {n:"<24", t:"ore: ittero **patologico**", key:true}, {n:"!", t:"**Niente aspirina**"}, {n:"·", t:"FLACC, facce, numerica"}]},
{id:"s49", tipo:"frase", tema:"chiaro", sopratitolo:"Nella prossima lezione · all'estremo opposto del ciclo di vita",
  testo:"Le **cure palliative** e il fine vita."},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione",
  titolo:"11.5<br>Cure palliative<br>e fine vita", sottotitolo:"La sedazione palliativa, l'accompagnamento",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
