// Contenuto delle 50 scene della lezione 11.8 — riepilogo del Modulo 11.
// Ogni lezione una griglia di parole chiave; la mappa dei servizi una
// tabella bisogno → luogo in quattro scene; le confusioni trappole; i fili
// con gli altri moduli una griglia di rimandi.

const MAPPA = (righe, k) => ({tipo:"tabella", tema:"chiaro", colonne:["42%","58%"],
  intestazioni:["Persona e bisogno", "Luogo"], righe, chiave:k});

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 11 · Riepilogo",
  titolo:"La mappa<br>dei servizi", sottotitolo:"11.8 · Riepilogo del modulo e autovalutazione",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Micro-lezione 8 di 8 · il modulo più vario del corso", celle:[
  {n:"·", t:"Dall'**anziano** al **neonato**"}, {n:"·", t:"Dalla **salute mentale** al **fine vita**", key:true}, {n:"·", t:"Dalla **cronicità** al **territorio**"}]},
{id:"s03", tipo:"frase", tema:"chiaro", sopratitolo:"Per ogni persona: i bisogni, gli strumenti, il luogo",
  testo:"Dove sta meglio, e **chi se ne occupa**?"},
{id:"s04", tipo:"frase", tema:"chiaro", sopratitolo:"Un ripasso · ritmo più sostenuto · il quaderno a portata di mano",
  testo:"Le parole chiave che all'esame **valgono punti**."},

{id:"s05", tipo:"norma", tema:"chiaro", etichetta:"L'anziano fragile · fragilità non è età", sigla:"Fried ≥ 3",
  testo:"Peso, astenia, forza, velocità, **attività**."},
{id:"s06", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"La VMD · in Veneto l'UVMD con la SVaMA · sindromi geriatriche", celle:[
  {n:"·", t:"**Clinica**"}, {n:"·", t:"**Funzionale**", key:true}, {n:"·", t:"**Cognitiva**"}, {n:"·", t:"**Affettiva**"}, {n:"·", t:"**Nutrizionale**"}, {n:"·", t:"**Sociale**"}]},
{id:"s07", tipo:"griglia", tema:"chiaro", colonne:4, spunta:false, sopratitolo:"Il delirium · prevenzione non farmacologica", celle:[
  {n:"·", t:"Esordio **acuto**"}, {n:"·", t:"**Fluttuante**"}, {n:"·", t:"**Attenzione** compromessa"}, {n:"!", t:"**Ipoattivo**: il meno riconosciuto", key:true}]},
{id:"s08", tipo:"confronto", tema:"chiaro", sopratitolo:"Beers, deprescrizione", col:[
  {h:"Polifarmacoterapia", t:"5 o più farmaci: **interazioni**, reazioni"}, {h:"Paradosso del ricovero", t:"si esce **meno autonomi**", key:true}]},

{id:"s09", tipo:"confronto", tema:"chiaro", sopratitolo:"La demenza · i disturbi del comportamento comunicano un bisogno", col:[
  {h:"Alzheimer", t:"la **memoria recente**"}, {h:"Corpi di Lewy", t:"allucinazioni visive, **ipersensibilità** agli antipsicotici", key:true}]},
{id:"s10", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"Dolore, stipsi, ritenzione, infezione: la causa prima del farmaco", celle:[
  {t:"**Non farmacologico** prima"}, {t:"Non contraddire: l'**emozione**", key:true}, {t:"Ambiente **protesico**"}]},
{id:"s11", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Il caregiver: anche lui una persona da assistere", celle:[
  {n:"!", t:"Antipsicotici: **mortalità**, ictus", key:true}, {n:"·", t:"Ricoveri di **sollievo**"}, {n:"·", t:"**CDCD** in Veneto"}]},

{id:"s12", tipo:"norma", tema:"chiaro", etichetta:"La salute mentale · L. 833/1978, artt. 33-35", sigla:"L. 180/1978",
  testo:"TSO: **tre requisiti insieme** · la pericolosità non c'entra."},
{id:"s13", tipo:"percorso", tema:"chiaro", sopratitolo:"Il TSO · sette giorni nell'SPDC · l'ASO: accertamento senza ricovero", tappe:[
  {t:"Proposta", d:"un medico"}, {t:"Convalida", d:"medico pubblico"}, {t:"Sindaco", d:"ordinanza"}, {t:"Giudice tutelare", d:"48 h"}, {t:"Convalida", d:"altre 48 h"}], attive:[0,1,2,3,4]},
{id:"s14", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"Agitazione e rischio suicidario", celle:[
  {t:"**De-escalation**, cause organiche"}, {t:"**Chiedere** direttamente", key:true}, {t:"Raccomandazione n. 4"}]},
{id:"s15", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"La rete: DSM, CSM, SerD", celle:[
  {n:"48-72", t:"ore: **delirium tremens**"}, {n:"B1", t:"**Tiamina** prima del glucosio", key:true}, {n:"·", t:"Terapie sostitutive: **continuare**"}]},

{id:"s16", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"L'area materno-infantile", celle:[
  {n:"37-42", t:"settimane, **Naegele**"}, {n:">20", t:"settimane: **preeclampsia**", key:true}, {n:"!", t:"Cefalea, visus, epigastrio"}]},
{id:"s17", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Magnesio e calcio gluconato · previa e distacco", celle:[
  {n:"Mg", t:"riflessi, respiro, **diuresi**"}, {n:"·", t:"Previa **indolore**, distacco doloroso", key:true}, {n:"Sx", t:"decubito **laterale sinistro**"}]},
{id:"s18", tipo:"griglia", tema:"chiaro", colonne:4, spunta:false, sopratitolo:"Il neonato e il bambino · scale del dolore per età", celle:[
  {n:"6", t:"mesi di allattamento **esclusivo**"}, {n:"K", t:"**vitamina** K, screening"}, {n:"<24", t:"ore: ittero **patologico**", key:true}, {n:"!", t:"**Niente aspirina**"}]},

{id:"s19", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Le cure palliative · L. 38/2010, due reti · cure palliative precoci", celle:[
  {n:"·", t:"Dispnea: **aria fresca**, oppioidi"}, {n:"!", t:"Rantolo: **niente aspirazione** di routine", key:true}, {n:"·", t:"Posizione, antisecretivi"}]},
{id:"s20", tipo:"confronto", tema:"chiaro", sopratitolo:"Intenzione, mezzi, esito · L. 219/2017 art. 2", col:[
  {h:"Sedazione palliativa", t:"sintomi **refrattari**, farmaci **titolati**, consenso", key:true}, {h:"Eutanasia", t:"**non consentita**"}]},
{id:"s21", tipo:"griglia", tema:"chiaro", colonne:4, spunta:false, sopratitolo:"Il fine vita", celle:[
  {n:"·", t:"Nutrizione artificiale: **trattamento sanitario**"}, {n:"·", t:"Segni di morte **imminente**"}, {n:"20", t:"minuti di **ECG**", key:true}, {n:"·", t:"Salma e **lutto**"}]},

{id:"s22", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"La cronicità · medicina di iniziativa · PDTA", celle:[
  {n:"2016", t:"Piano nazionale"}, {n:"6", t:"componenti del **Chronic Care Model**"}, {n:"½", t:"**non aderente**: semplificare", key:true}]},
{id:"s23", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Il cambiamento e l'educazione", celle:[
  {n:"6", t:"fasi di **Prochaska**"}, {n:"·", t:"**OARS**, niente riflesso di correzione", key:true}, {n:"·", t:"Health literacy, **teach-back**"}]},
{id:"s24", tipo:"griglia", tema:"chiaro", colonne:4, spunta:false, sopratitolo:"Self-care e telemedicina", celle:[
  {n:"1", t:"**Mantenimento**"}, {n:"2", t:"**Monitoraggio**"}, {n:"3", t:"**Gestione**: quella che si salta", key:true}, {n:"4", t:"forme di **telemedicina**"}]},

{id:"s25", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Il territorio · DM 77/2022", celle:[
  {n:"40-50", t:"mila: Casa della Comunità **hub**"}, {n:"3.000", t:"abitanti: **infermiere di famiglia**", key:true}]},
{id:"s26", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Il territorio · UCA · ADI e SAD", celle:[
  {n:"20", t:"posti letto: **Ospedale di Comunità**", key:true}, {n:"1", t:"**COT** ogni 100.000"}, {n:"116117", t:"**non urgenti**"}]},
{id:"s27", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"In Veneto · i Centri di Servizi sono le RSA di altre regioni", celle:[
  {t:"**UVMD** con la SVaMA", key:true}, {t:"**Centri di Servizi**"}, {t:"Impegnativa di **residenzialità**"}]},

{id:"s28", sopratitolo:"La mappa dei servizi · da fotografare", ...MAPPA([
  ["Acuzie", "**ospedale**"], ["Bisogno non urgente", "116117, medico di famiglia, **Casa della Comunità**"]], [])},
{id:"s29", sopratitolo:"La mappa dei servizi", ...MAPPA([
  ["Cronicità", "Casa della Comunità, **infermiere di famiglia**, PDTA, telemonitoraggio"], ["Recupero dopo un ricovero", "**Ospedale di Comunità**"]], [1])},
{id:"s30", sopratitolo:"La mappa dei servizi", ...MAPPA([
  ["Non autosufficienza a casa", "**UVMD**, ADI, SAD"], ["Non gestibile a casa", "**Centro di Servizi**, impegnativa di residenzialità"]], [])},
{id:"s31", sopratitolo:"La mappa dei servizi", ...MAPPA([
  ["Salute mentale", "**CSM**, SPDC"], ["Dipendenze", "**SerD**"], ["Gravidanza", "**consultorio**, punto nascita"], ["Fine vita", "cure palliative domiciliari, **hospice**"]], [])},
{id:"s32", tipo:"titolo", tema:"profondo",
  titolo:"Ogni bisogno<br>ha **il suo luogo**.",
  sotto:""},

{id:"s33", tipo:"confronto", tema:"chiaro", sopratitolo:"Le confusioni che costano più punti", col:[
  {h:"Delirium", t:"**acuto**, fluttuante"}, {h:"Demenza", t:"**insidiosa**, progressiva", key:true}]},
{id:"s34", tipo:"trappola", tema:"chiaro", sopratitolo:"Le confusioni che costano più punti", righe:[
  {sb:"TSO per pericolosità", ok:"La pericolosità **non è un requisito** · giudice **tutelare**"},
  {sb:"Sedazione = eutanasia", ok:"**Diverse** per intenzione, mezzi, esito"}]},
{id:"s35", tipo:"trappola", tema:"chiaro", sopratitolo:"Le confusioni che costano più punti", righe:[
  {sb:"Ittero prima delle 24 ore, fisiologico", ok:"**Patologico**"},
  {sb:"ADI = SAD", ok:"ADI **sanitaria** · SAD dei **Comuni**"}]},
{id:"s36", tipo:"trappola", tema:"chiaro", sopratitolo:"Ricovero breve, gestione infermieristica, per chi non può ancora tornare a casa", righe:[
  {sb:"116117 = 112", ok:"116117: cure **non urgenti**"},
  {sb:"Ospedale di Comunità = ospedale per acuti", ok:"**Non** è un ospedale per acuti"}]},

{id:"s37", tipo:"confronto", tema:"chiaro", sopratitolo:"I casi tipici", col:[
  {h:"«A casa non era così»", t:"delirium **ipoattivo**"}, {h:"Demenza, agitazione, stipsi", t:"la **causa** prima del sedativo", key:true}]},
{id:"s38", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"I casi tipici", celle:[
  {n:"2ª-3ª", t:"giornata: tremori, allucinazioni → **alcol**"}, {n:"18", t:"ore: ittero **patologico**", key:true}, {n:"3°", t:"ricovero: aderenza, **self-care**"}]},
{id:"s39", tipo:"confronto", tema:"chiaro", sopratitolo:"I casi tipici", col:[
  {h:"«Lo state facendo morire?»", t:"spiegare la **sedazione palliativa**"}, {h:"Non autosufficiente alla dimissione", t:"**COT**, UVMD, setting", key:true}]},

{id:"s40", tipo:"griglia", tema:"chiaro", colonne:4, spunta:false, sopratitolo:"Il filo con gli altri moduli", celle:[
  {n:"2.3", t:"**CAM** e PAINAD"}, {n:"3.1", t:"**Contenzione**"}, {n:"3.3", t:"**Disfagia**"}, {n:"3.7", t:"**Dolore**, e 5.6", key:true}]},
{id:"s41", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Il filo con gli altri moduli", celle:[
  {n:"1.6", t:"**L. 219/2017**", key:true}, {n:"5.7", t:"**Stupefacenti**"}, {n:"10.4", t:"**PBLS** e parto"}]},
{id:"s42", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Nel modulo 13: UVMD, Centri di Servizi, Azienda Zero", celle:[
  {n:"9.7", t:"**Dimissione protetta**"}, {n:"13", t:"**Servizio Socio Sanitario Veneto**", key:true}]},

{id:"s43", tipo:"cifre", tema:"chiaro", sopratitolo:"Il test del modulo · poi disegna a memoria la mappa dei servizi", voci:[
  {n:"30", suf:"", d:"domande"}, {n:"21", suf:"", d:"soglia", key:true}]},
{id:"s44", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Nel quaderno · e due casi: delirium ipoattivo, dimissione protetta", celle:[
  {t:"Il **TSO** con i tempi"}, {t:"Gli **standard** del DM 77", key:true}, {t:"Delirium, demenza, **depressione**"}, {t:"Sedazione, **eutanasia**"}]},

{id:"s45", tipo:"titolo", tema:"profondo",
  titolo:"La persona giusta,<br>nel posto giusto,<br>**al momento giusto**.",
  sotto:""},
{id:"s46", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Conoscere la rete è una competenza clinica · il setting sbagliato è un rischio", celle:[
  {n:"!", t:"Un ricovero **inutile**"}, {n:"!", t:"Una dimissione **senza supporto**", key:true}]},
{id:"s47", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"L'infermiere è spesso il primo a vedere che il posto non è quello giusto", celle:[
  {n:"·", t:"In **reparto**"}, {n:"·", t:"**A domicilio**"}, {n:"·", t:"Al telefono della **COT**", key:true}]},
{id:"s48", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Nel prossimo modulo · cambiamo prospettiva", celle:[
  {n:"·", t:"L'**organizzazione** dei servizi"}, {n:"·", t:"Servizio Sanitario e **pubblico impiego**", key:true}]},
{id:"s49", tipo:"norma", tema:"chiaro", etichetta:"La sicurezza sul lavoro", sigla:"D.Lgs. 81/2008",
  testo:"La salute di **chi cura**."},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossimo modulo",
  titolo:"Modulo 12<br>Organizzazione,<br>normativa e sicurezza", sottotitolo:"Il Servizio Sanitario, il pubblico impiego, il D.Lgs. 81/2008",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
