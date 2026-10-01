// Contenuto delle 50 scene della lezione 8.1 — cardiologia. Due corpi
// nuovi: lo scompenso (il cuore con i due lati: polmoni che si riempiono a
// sinistra, gamba edematosa e fegato a destra) e l'ECG (la striscia su
// carta millimetrata con il tracciato che si disegna: sinusale con le onde
// e le misure, fibrillazione atriale, tachicardia e fibrillazione
// ventricolare, asistolia, attività senza polso, blocco, pacemaker).

const COSA = [
 {t:"ECG 12 derivazioni", d:"entro 10 minuti", key:true}, {t:"Monitoraggio"}, {t:"Parametri, SpO₂"}, {t:"Accesso venoso"}, {t:"Prelievi", d:"troponina"}, {t:"Riposo"}, {t:"Medico", d:"subito"},
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 8 · Assistenza in area medica",
  titolo:"Cardiologia", sottotitolo:"8.1 · Scompenso, dolore toracico, ECG",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"Micro-lezione 1 di 8 · il modulo dell'area medica, organizzato per apparati · si comincia dal cuore", celle:[
  {n:"1", t:"Lo **scompenso cardiaco**"}, {n:"2", t:"Il **dolore toracico** e le sindromi coronariche acute", key:true}, {n:"3", t:"La **lettura di base dell'ECG**"}]},
{id:"s03", tipo:"frase", tema:"chiaro", sopratitolo:"Non serve leggere un tracciato come un cardiologo",
  testo:"Serve riconoscere i ritmi che richiedono un **intervento immediato**: pochi, e si imparano guardandoli."},

{id:"s04", tipo:"frase", tema:"chiaro", sopratitolo:"Lo scompenso cardiaco",
  testo:"Il cuore non riesce più a pompare una quantità di sangue **adeguata ai bisogni** dell'organismo."},
{id:"s05", tipo:"scompenso", tema:"chiaro", sopratitolo:"Se cede il ventricolo sinistro, il sangue ristagna nei polmoni · ortopnea: dorme con più cuscini", attive:[0], key:[0]},
{id:"s06", tipo:"scompenso", tema:"chiaro", sopratitolo:"Se cede il destro, il ristagno è sistemico · spesso le due forme coesistono", key:[1]},

{id:"s07", tipo:"fascia", tema:"chiaro", sopratitolo:"La classificazione funzionale NYHA · chiesta spesso", min:0, max:4, classi:[
  {da:0, a:1, t:"I", d:"nessuna limitazione"}, {da:1, a:2, t:"II", d:"con l'attività ordinaria: le scale"}, {da:2, a:3, t:"III", d:"con attività inferiori: vestirsi", key:true}, {da:3, a:4, t:"IV", d:"anche a riposo"}]},
{id:"s08", tipo:"frase", tema:"chiaro", sopratitolo:"Classe III: vestirsi, camminare in casa · classe IV: anche a riposo",
  testo:"La classe è una domanda sulla **vita quotidiana**, non un esame."},

{id:"s09", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"L'assistenza · il peso: il miglior indicatore dell'accumulo di liquidi, lezione 3.5", celle:[
  {t:"Posizione **semiseduta** o seduta"}, {t:"**Ossigeno** se la saturazione è bassa, secondo prescrizione"}, {t:"**Peso quotidiano**", key:true}, {t:"**Bilancio idrico** e diuresi"}]},
{id:"s10", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"L'assistenza", celle:[
  {t:"**Restrizione idrica** se prescritta, dieta **iposodica**"}, {t:"**Potassio** e **creatinina** con i diuretici", key:true}, {t:"Riposo alternato ad **attività graduale**"}]},

{id:"s11", tipo:"cifre", tema:"chiaro", sopratitolo:"L'educazione, che riduce davvero i ricoveri · pesarsi ogni giorno, alla stessa ora · contattare il medico se il peso aumenta rapidamente", voci:[
  {n:"1,5–2", suf:"kg", d:"in 2–3 giorni: un accumulo di liquidi che anticipa i sintomi", key:true}]},
{id:"s12", tipo:"frase", tema:"chiaro", sopratitolo:"Riconoscere la dispnea, gli edemi, il bisogno di più cuscini",
  testo:"La **bilancia** se ne accorge prima del respiro."},
{id:"s13", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"L'educazione", celle:[
  {t:"**Aderenza** alla terapia", key:true}, {t:"**Poco sale**"}, {t:"Attività fisica **regolare**"}, {t:"**Vaccinazioni**"}]},

{id:"s14", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"Le sindromi coronariche acute · il sintomo tipico · dura più di 20 minuti, con sudorazione, nausea, dispnea", celle:[
  {n:"!", t:"Dolore **oppressivo** dietro lo sterno, «un peso sul petto», irradiato a **braccio sinistro, mandibola, dorso, epigastrio**", key:true}]},
{id:"s15", tipo:"trappola", tema:"chiaro", sopratitolo:"Le presentazioni atipiche · donne, anziani, diabetici: solo dispnea, stanchezza, dolore epigastrico, o nessun dolore", righe:[
  {sb:"«È una cattiva digestione»", ok:"Molti infarti vengono **scambiati** per una cattiva digestione"}]},

{id:"s16", tipo:"confronto", tema:"chiaro", sopratitolo:"Due quadri", col:[
  {h:"STEMI", t:"**sopraslivellamento ST**: coronaria occlusa, **riperfusione urgente** (angioplastica primaria)", key:true}, {h:"NSTEMI, angina instabile", t:"senza sopraslivellamento"}]},
{id:"s17", tipo:"frase", tema:"chiaro", sopratitolo:"La troponina · si ripete a intervalli secondo protocollo",
  testo:"Un **primo valore normale** non esclude l'infarto."},

{id:"s18", tipo:"percorso", tema:"chiaro", sopratitolo:"Davanti a un dolore toracico · il numero da ricordare", attive:[0], tappe:COSA},
{id:"s19", tipo:"percorso", tema:"chiaro", sopratitolo:"Davanti a un dolore toracico · riposo, rassicurazione", attive:[0,1,2,3,4,5], tappe:COSA},
{id:"s20", tipo:"trappola", tema:"chiaro", sopratitolo:"L'ossigeno · un tempo si dava a tutti, oggi no · il tempo è muscolo cardiaco", righe:[
  {sb:"Ossigeno a tutti i dolori toracici", ok:"**Solo se la saturazione è bassa**; farmaci secondo prescrizione o protocollo, medico subito"}]},

{id:"s21", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"Due farmaci del dolore toracico · i nitrati: controindicati", celle:[
  {n:"✗", t:"Pressione **bassa**", key:true}, {n:"✗", t:"Infarto del **ventricolo destro**"}, {n:"✗", t:"Dopo i farmaci per la **disfunzione erettile**: lezione 5.5"}]},
{id:"s22", tipo:"frase", tema:"chiaro", sopratitolo:"L'acido acetilsalicilico",
  testo:"Secondo **protocollo**, se non ci sono controindicazioni: allergia, sanguinamento in atto."},

{id:"s23", tipo:"cifre", tema:"chiaro", sopratitolo:"L'ipertensione · in misurazioni ripetute", voci:[
  {n:"140/90", suf:"mmHg", d:"valori pari o superiori", key:true}]},
{id:"s24", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"La tecnica di misurazione · un bracciale piccolo su un braccio grande sovrastima", celle:[
  {t:"Seduta da **5 minuti**"}, {t:"Bracciale della **misura giusta**", key:true}, {t:"Braccio all'**altezza del cuore**"}, {t:"Almeno **due** misurazioni"}]},
{id:"s25", tipo:"confronto", tema:"chiaro", sopratitolo:"La crisi ipertensiva", col:[
  {h:"Urgenza", t:"**senza** danno d'organo"}, {h:"Emergenza", t:"**con** danno d'organo: dolore toracico, deficit neurologici, edema polmonare; trattamento immediato", key:true}]},

{id:"s26", tipo:"ecg", tema:"chiaro", sopratitolo:"La lettura di base in cinque domande · uno: la frequenza, 60–100 · i QRS in 6 secondi × 10, oppure 300 ÷ i quadrati grandi fra due R", ritmo:"sinusale", titolo:"1 · La frequenza", sotto:"QRS in 6 secondi × 10 · 300 ÷ quadrati grandi fra due R"},
{id:"s27", tipo:"ecg", tema:"chiaro", sopratitolo:"Due: il ritmo è regolare? Tre: c'è un'onda P prima di ogni QRS?", ritmo:"sinusale", onde:true, titolo:"2 · Regolare · 3 · Onda P", sotto:"una P prima di ogni QRS"},
{id:"s28", tipo:"ecg", tema:"chiaro", sopratitolo:"Quattro: il PR fra 0,12 e 0,20 · cinque: il QRS stretto, sotto 0,12, o largo · tutte risposte normali: ritmo sinusale", ritmo:"sinusale", onde:true, key:true, titolo:"Ritmo sinusale", sotto:"PR 0,12–0,20 s · QRS < 0,12 s"},

{id:"s29", tipo:"ecg", tema:"chiaro", sopratitolo:"I ritmi da riconoscere · la fibrillazione atriale, l'aritmia più frequente", ritmo:"fa", key:true, titolo:"Fibrillazione atriale", sotto:"irregolarmente irregolare · nessuna onda P · linea di base tremolante · QRS stretto"},
{id:"s30", tipo:"catena", tema:"chiaro", sopratitolo:"Il rischio principale · i farmaci della lezione 5.5", passi:[
  {t:"Atrio che non si contrae"}, {t:"Trombi"}, {t:"Ictus", key:true}, {t:"Anticoagulante"}]},
{id:"s31", tipo:"frase", tema:"chiaro", sopratitolo:"Al polso · il polso radiale perde i battiti deboli, e conta meno di quanto il cuore batta",
  testo:"Battito irregolare: la frequenza si misura **all'apice, per un minuto**."},

{id:"s32", tipo:"ecg", tema:"chiaro", sopratitolo:"I ritmi dell'arresto cardiaco · la tachicardia ventricolare: può avere il polso o no", ritmo:"tv", titolo:"Tachicardia ventricolare", sotto:"QRS larghi, regolari, rapidi"},
{id:"s33", tipo:"ecg", tema:"chiaro", sopratitolo:"La fibrillazione ventricolare · è un arresto cardiaco", ritmo:"fv", key:true, defib:true, titolo:"Fibrillazione ventricolare", sotto:"attività caotica, nessun QRS riconoscibile"},
{id:"s34", tipo:"ecg", tema:"chiaro", sopratitolo:"L'asistolia · prima di tutto si verificano cavi e derivazioni e si controlla il paziente", ritmo:"asistolia", defib:false, titolo:"Asistolia", sotto:"una linea piatta"},
{id:"s35", tipo:"ecg", tema:"chiaro", sopratitolo:"L'attività elettrica senza polso · un tracciato organizzato in un paziente senza polso", ritmo:"pea", defib:false, titolo:"Attività elettrica senza polso", sotto:"PEA: si guarda il paziente"},
{id:"s36", tipo:"titolo", tema:"profondo",
  titolo:"Si guarda il **paziente**, non solo il monitor.",
  sotto:"Il principio che vedremo nel modulo 10."},

{id:"s37", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"Le bradicardie · sotto 60", celle:[
  {n:"1", t:"**Bradicardia sinusale**: spesso fisiologica negli sportivi, o da farmaci come i beta-bloccanti", key:true}]},
{id:"s38", tipo:"ecg", tema:"chiaro", sopratitolo:"I blocchi atrioventricolari · l'impulso fatica a passare dagli atri ai ventricoli", ritmo:"bav", titolo:"Blocco AV di primo grado", sotto:"PR lungo · secondo grado · terzo grado o completo: atri e ventricoli per conto proprio"},
{id:"s39", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"I sintomi · il blocco completo spesso richiede un pacemaker", celle:[
  {n:"1", t:"**Astenia**"}, {n:"2", t:"**Vertigini**"}, {n:"3", t:"**Sincope**", key:true}, {n:"4", t:"**Ipotensione**"}]},

{id:"s40", tipo:"ecg", tema:"chiaro", sopratitolo:"Il pacemaker · all'ECG uno spike, un sottile tratto verticale, prima della P o del QRS", ritmo:"pm", titolo:"Pacemaker", sotto:"lo spike prima del QRS"},
{id:"s41", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Dopo l'impianto", celle:[
  {t:"**Ferita** e segni di **ematoma**", key:true}, {t:"Per alcune settimane, **niente movimenti ampi del braccio** dal lato dell'impianto"}, {t:"La **tessera** del dispositivo, attenzione ai **campi magnetici**"}, {t:"**Risonanza** solo se compatibile e secondo protocollo"}]},

{id:"s42", tipo:"frase", tema:"chiaro", sopratitolo:"Il caso · donna di 72 anni, diabetica, da un'ora dolore epigastrico e nausea, ed è sudata",
  testo:"Che cosa pensi? Una presentazione **atipica** di una sindrome coronarica acuta, finché non si dimostra il contrario."},
{id:"s43", tipo:"percorso", tema:"chiaro", sopratitolo:"Che cosa fai", tappe:COSA},
{id:"s44", tipo:"trappola", tema:"chiaro", sopratitolo:"La risposta che i concorsi costruiscono per farti sbagliare · donna, anziana, diabetica: tre ragioni per non crederci", righe:[
  {sb:"«È solo una cattiva digestione»", ok:"**ECG entro dieci minuti**"}]},

{id:"s45", tipo:"percorso", tema:"chiaro", sopratitolo:"In Veneto · la rete per l'infarto acuto", tappe:[
  {t:"118", d:"ECG sul territorio"}, {t:"Teletrasmesso", d:"allo specialista"}, {t:"STEMI", d:"direttamente in emodinamica, saltando il pronto soccorso", key:true}]},
{id:"s46", tipo:"frase", tema:"chiaro", sopratitolo:"Ambulatori dello scompenso e telemonitoraggio, legati all'infermiere di famiglia e comunità · all'orale",
  testo:"«La rete STEMI riduce il **tempo alla riperfusione**.»"},

{id:"s47", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Ricapitoliamo", celle:[
  {t:"Scompenso **sinistro**: polmone · **destro**: edemi"}, {t:"**NYHA** da I a IV · **peso quotidiano**"}, {t:"Dolore toracico: **ECG entro 10 minuti**, ossigeno **solo se la saturazione è bassa**", key:true}, {t:"Attenzione alle **presentazioni atipiche**"}]},
{id:"s48", tipo:"griglia", tema:"chiaro", colonne:1, spunta:true, sopratitolo:"Ricapitoliamo", celle:[
  {t:"**Fibrillazione atriale**: irregolare, senza onde P, rischio di ictus"}, {t:"**Fibrillazione ventricolare**: defibrillabile · **asistolia**: non defibrillabile", key:true}]},
{id:"s49", tipo:"frase", tema:"chiaro", sopratitolo:"Nella prossima lezione",
  testo:"**Polmone** e **ossigenoterapia**."},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione",
  titolo:"8.2<br>Pneumologia<br>e ossigenoterapia", sottotitolo:"L'ossigeno è un farmaco",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
