// Contenuto delle 50 scene della lezione 15.4 — dolore toracico: dal triage
// all'arresto cardiaco. Il caso corre su un orologio: la linea degli orari
// (9:40, 9:47, 10:05, 10:07) è un percorso che si accende tappa per tappa;
// l'arresto è la striscia dell'ECG in fibrillazione ventricolare; il team una
// raggiera che si completa; errori e risposta modello stanno in tabella.

const ORARI = (att, k) => ({tipo:"percorso", tema:"chiaro", tappe:[
  {t:"9:40", d:"arrivo in pronto soccorso", key:k===0},
  {t:"9:47", d:"ECG: STEMI inferiore", key:k===1},
  {t:"10:05", d:"arresto in fibrillazione ventricolare", key:k===2},
  {t:"10:07", d:"ROSC dopo il secondo shock", key:k===3}], attive:att});

const TEAM = (att, k) => ({tipo:"raggiera", tema:"chiaro", centro:"Team", raggi:[
  {t:"Leader", key:k===0},
  {t:"Compressioni", key:k===1},
  {t:"Defibrillatore", key:k===2},
  {t:"Vie aeree", key:k===3},
  {t:"Farmaci", key:k===4},
  {t:"Timekeeper", key:k===5}], attive:att});

const ERRORI = att => ({tipo:"elenco", tema:"tenue", vietato:true, attive:att, voci:[
  {t:"Lasciarlo in **sala d'attesa** perché i parametri sono «buoni»"},
  {t:"Fare l'**ECG** oltre i 10 minuti"},
  {t:"Dare l'**ossigeno** «di routine»"},
  {t:"**Nitrati** senza valutare pressione, ventricolo destro, farmaci assunti"},
  {t:"Nell'arresto monitorato, **ritardare la defibrillazione**"},
  {t:"Non **registrare gli orari**"}]});

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 15 · Casi clinici integrati",
  titolo:"Dolore toracico", sottotitolo:"15.4 · Dal triage all'arresto cardiaco, fino all'emodinamica",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"percorso", tema:"chiaro", sopratitolo:"Caso 4 · in meno di mezz'ora", tappe:[
  {t:"Triage"}, {t:"Diagnosi di infarto"}, {t:"Arresto cardiaco", key:true}, {t:"Rianimazione"}, {t:"Emodinamica"}]},
{id:"s03", tipo:"tre", tema:"chiaro", sopratitolo:"Il caso più tempo-dipendente del modulo · mette alla prova", box:[
  {n:"10.1", t:"Il triage"}, {n:"8.1", t:"L'infarto", key:true}, {n:"10.3", t:"La rianimazione"}, {n:"13.3", t:"La rete veneta"}]},

{id:"s04", tipo:"frase", tema:"chiaro", sopratitolo:"Ore 9:40 · lo scenario",
  testo:"**Signor Ferri, 61 anni**, fumatore e iperteso. Dolore **retrosternale oppressivo** da **50 minuti**, irradiato alla **mandibola**.",
  sotto:"Sudato, nausea · accompagnato dalla moglie"},
{id:"s05", tipo:"cifre", tema:"chiaro", sopratitolo:"È vigile · sei l'infermiere di triage: quale codice, e che cosa fai?", voci:[
  {n:"108/70", t:"pressione", d:"mmHg"}, {n:"58", t:"frequenza", d:"battiti al minuto", key:true},
  {n:"20", t:"respiratoria", d:"atti al minuto"}, {n:"96", suf:"%", t:"saturazione", d:"in aria"}]},

{id:"s06", tipo:"confronto", tema:"chiaro", sopratitolo:"Il triage", col:[
  {h:"Funzioni vitali", t:"**conservate**: non è un codice 1"},
  {h:"Rischio di compromissione", t:"dolore toracico **tipico**, **sudorazione**"}]},
{id:"s07", tipo:"norma", tema:"chiaro", sopratitolo:"Il codice di priorità", etichetta:"Arancione", sigla:"Codice 2",
  testo:"O il codice del **protocollo locale** per il dolore toracico, con il **percorso dedicato**."},
{id:"s08", tipo:"scadenza", tema:"chiaro", sopratitolo:"L'azione più importante · e non resta in sala d'attesa: area monitorata",
  max:10, banda:[0,10], inizio:"primo contatto", fine:"10 minuti", tappe:[
  {a:10, v:"10′", t:"**ECG a 12 derivazioni**", key:true}]},

{id:"s09", tipo:"catena", tema:"chiaro", sopratitolo:"Ore 9:47 · l'ECG", passi:[
  {t:"ECG a **12 derivazioni**"}, {t:"**ST sopraslivellato**", d:"in II, III e aVF"}, {t:"**STEMI inferiore**", key:true}]},
{id:"s10", tipo:"cifre", tema:"chiaro", sopratitolo:"Ora la frequenza ha un senso", voci:[
  {n:"58", suf:"", t:"battiti al minuto", d:"nell'infarto **inferiore** la bradicardia è frequente: la **coronaria destra** irrora spesso il **nodo senoatriale**", key:true}]},
{id:"s11", tipo:"percorso", tema:"chiaro", sopratitolo:"Lezione 13.3 · il prima possibile nel centro con l'emodinamica", tappe:[
  {t:"ECG", d:"mostrato subito"}, {t:"Medico"}, {t:"Rete STEMI", d:"attivata"}, {t:"Emodinamica", key:true}]},

{id:"s12", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Le azioni mentre si attiva l'emodinamica", celle:[
  {t:"**Monitor** e **defibrillatore** pronti"}, {t:"Placche già applicate, se previsto"},
  {t:"**Riposo** e rassicurazione"}, {t:"**Ossigeno**: non indicato con SpO₂ 96%", no:true, key:true}]},
{id:"s13", tipo:"tre", tema:"chiaro", sopratitolo:"Accessi e prelievi", box:[
  {n:"2", t:"Accessi venosi", d:"secondo protocollo · libero l'arto dell'**accesso arterioso** della coronarografia, se indicato"},
  {n:"5", t:"Prelievi", d:"**troponina** · emocromo · coagulazione · elettroliti · funzione renale", key:true}]},
{id:"s14", tipo:"confronto", tema:"chiaro", sopratitolo:"Farmaci e preparazione", col:[
  {h:"Secondo prescrizione o protocollo", t:"antiaggreganti · anticoagulante · analgesia"},
  {h:"Verso l'emodinamica", t:"consenso · **allergie**, soprattutto al **contrasto** · funzione renale · via protesi e monili"}]},

{id:"s15", tipo:"trappola", tema:"chiaro", sopratitolo:"La trappola dei nitrati · tipica dei quiz", righe:[
  {sb:"«Prepari un nitrato sublinguale per il dolore»", ok:"Infarto **inferiore**: può coinvolgere il **ventricolo destro**"}]},
{id:"s16", tipo:"catena", tema:"chiaro", sopratitolo:"Lo si verifica con le derivazioni destre dell'ECG", passi:[
  {t:"Infarto del **ventricolo destro**"}, {t:"Pressione già **108**"}, {t:"**Nitrati**"},
  {t:"**Ipotensione grave**", key:true}]},
{id:"s17", tipo:"icone", tema:"chiaro", sopratitolo:"Il ruolo di barriera · l'altra controindicazione della 8.1", voci:[
  {icona:"avviso", t:"Segnala il dubbio"}, {icona:"spunta", t:"Chiede conferma", d:"prima di somministrare", key:true},
  {icona:"chat", t:"Disfunzione erettile?", d:"farmaci nelle ultime ore"}]},

{id:"s18", tipo:"ecg", tema:"chiaro", sopratitolo:"Ore 10:05 · perde coscienza", ritmo:"fv", defib:true, key:true,
  titolo:"Fibrillazione ventricolare", sotto:"Arresto testimoniato e monitorato: che cosa fai, e in che ordine?"},

{id:"s19", tipo:"catena", tema:"chiaro", sopratitolo:"Le azioni nell'arresto monitorato", passi:[
  {t:"Chiamare **aiuto** e il team"}, {t:"Non risponde, **non respira** normalmente", d:"confermato in pochi secondi"},
  {t:"**Defibrillazione immediata**", d:"ritmo defibrillabile, defibrillatore già collegato", key:true}]},
{id:"s20", tipo:"cifre", tema:"chiaro", sopratitolo:"Linee guida europee · arresto testimoniato e monitorato in FV", voci:[
  {n:"3", suf:"", t:"shock in rapida successione", d:"**fino a tre**, con il defibrillatore subito disponibile · ritmo verificato dopo ciascuno", key:true}]},
{id:"s21", tipo:"catena", tema:"chiaro", sopratitolo:"Dopo ogni shock", passi:[
  {t:"**Ritmo** verificato", d:"dopo ciascuno"}, {t:"RCP **30:2**", d:"per 2 minuti"},
  {t:"**Nessuno tocca** il paziente", d:"durante ogni shock", key:true}]},

{id:"s22", sopratitolo:"Il team · ruoli chiari", ...TEAM([0,1,2,3], 0)},
{id:"s23", sopratitolo:"Adrenalina e amiodarone dopo il 3° shock, se la FV persiste", ...TEAM([0,1,2,3,4,5], 5)},
{id:"s24", tipo:"citazione", tema:"chiaro", sopratitolo:"La comunicazione a ciclo chiuso",
  testo:"«Carico **1 mg di adrenalina**.» — «Adrenalina **somministrata**.»", fonte:"Chi esegue conferma ad alta voce; il timekeeper annota l'orario"},

{id:"s25", sopratitolo:"Il ritorno della circolazione spontanea · polso presente, respira", ...ORARI([0,1,2,3], 3)},
{id:"s26", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Le cure post-arresto · lezione 10.3", celle:[
  {t:"**ABCDE**"}, {t:"SpO₂ **94–98%**", key:true}, {t:"Evitare l'**ipotensione**"}, {t:"**ECG** a 12 derivazioni"},
  {t:"**Glicemia**"}, {t:"**Temperatura**: evitare la febbre"}, {t:"Monitoraggio continuo"}, {t:"Orari registrati"}]},

{id:"s27", tipo:"icone", tema:"chiaro", sopratitolo:"Il trasferimento in emodinamica", voci:[
  {icona:"cuore", t:"Monitor e defibrillatore", key:true}, {icona:"polmoni", t:"Ossigeno"},
  {icona:"fiale", t:"Farmaci d'emergenza"}, {icona:"persone", t:"Personale adeguato"}]},
{id:"s28", tipo:"tabella", tema:"chiaro", sopratitolo:"Le consegne SBAR", colonne:["34%","66%"],
  intestazioni:["Che cosa", "Il dettaglio"], righe:[
  ["Ora d'inizio del **dolore**", "conta quanto quella dell'arresto"], ["ECG", "lo STEMI inferiore"],
  ["Terapia", "quella somministrata"], ["Arresto", "ritmo · numero di shock · tempo al ROSC"],
  ["Stato attuale", "come sta adesso"]], chiave:[0]},

{id:"s29", tipo:"icone", tema:"chiaro", sopratitolo:"La moglie · presente all'arrivo e durante l'arresto", voci:[
  {icona:"persona", t:"Un operatore dedicato", d:"se possibile", key:true}, {icona:"stetoscopio", t:"Informazioni cliniche", d:"dal medico"},
  {icona:"lucchetto", t:"Luogo riservato"}, {icona:"telefono", t:"Informata", d:"del trasferimento"}]},
{id:"s30", tipo:"frase", tema:"chiaro", sopratitolo:"La presenza dei familiari · secondo le linee guida",
  testo:"Durante la rianimazione **può essere offerta**, con un operatore che li **supporti** e spieghi ciò che accade."},

{id:"s31", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Dopo l'angioplastica · la sede di accesso, radiale o femorale", celle:[
  {t:"**Sanguinamento**"}, {t:"**Ematoma**", key:true}, {t:"**Polso** e perfusione a valle"},
  {t:"Dispositivi di compressione secondo protocollo"}]},
{id:"s32", tipo:"tre", tema:"chiaro", sopratitolo:"In unità coronarica, poi", box:[
  {n:"1", t:"Ritmo", d:"e recidiva del **dolore**"}, {n:"2", t:"Funzione renale", d:"dopo il **contrasto** · idratazione", key:true},
  {n:"3", t:"Mobilizzazione", d:"**graduale**, secondo protocollo"}]},

{id:"s33", tipo:"trappola", tema:"chiaro", sopratitolo:"L'educazione alla dimissione · la doppia antiaggregazione", righe:[
  {sb:"Sospenderla di propria iniziativa", ok:"**Mai**: lo stent potrebbe **trombizzarsi**"},
  {sb:"Tacerla prima di una procedura", ok:"Va detta a **ogni medico** e al **dentista**"}]},
{id:"s34", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"E poi", celle:[
  {t:"Smettere di **fumare**"}, {t:"Pressione e colesterolo"}, {t:"Glicemia e peso"},
  {t:"Attività fisica e **riabilitazione cardiologica**"}, {t:"Sintomi → **112** o **118**, senza mettersi alla guida", key:true},
  {t:"La tessera dello **stent**"}]},

{id:"s35", sopratitolo:"Gli errori da evitare", ...ERRORI([0,1,2])},
{id:"s36", sopratitolo:"Gli errori da evitare", ...ERRORI([3,4,5])},

{id:"s37", tipo:"frase", tema:"chiaro", sopratitolo:"Il consenso in urgenza · all'arrivo è cosciente e capace",
  testo:"Anche in urgenza si **informa** e si raccoglie il **consenso**, con parole essenziali e comprensibili."},
{id:"s38", tipo:"norma", tema:"chiaro", sopratitolo:"Incosciente e in pericolo di vita, come nell'arresto", etichetta:"Art. 1, comma 7", sigla:"L. 219/2017",
  testo:"In **emergenza** si assicurano le **cure necessarie**, nel rispetto della volontà ove le condizioni lo consentano."},
{id:"s39", tipo:"tre", tema:"chiaro", sopratitolo:"E ancora", box:[
  {n:"DAT", t:"Volontà espresse", d:"vanno **considerate**"}, {n:"·", t:"Informa", d:"per quanto di sua competenza"},
  {n:"·", t:"Documenta", key:true}]},

{id:"s40", tipo:"ecg", tema:"chiaro", sopratitolo:"D1 · ritmi defibrillabili e non", ritmo:"tv", defib:true,
  titolo:"Defibrillabili: FV e TV senza polso", sotto:"La fibrillazione ventricolare e la tachicardia ventricolare senza polso"},
{id:"s41", tipo:"ecg", tema:"chiaro", sopratitolo:"D1 · ritmi defibrillabili e non", ritmo:"asistolia", defib:false, key:true,
  titolo:"Non defibrillabili: asistolia e PEA", sotto:"Contano la RCP di qualità, l'adrenalina e la ricerca delle cause reversibili"},
{id:"s42", tipo:"trappola", tema:"chiaro", sopratitolo:"D2 · perché niente ossigeno di routine?", righe:[
  {sb:"Ossigeno «di routine» nel dolore toracico", ok:"Con saturazione **normale** non porta benefici, e l'eccesso può essere **dannoso**: si dà quando la saturazione è **bassa**"}]},
{id:"s43", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"D3 · il ruolo dell'infermiere nel team", celle:[
  {t:"Compressioni e cambi"}, {t:"Defibrillazione"}, {t:"Accesso venoso e farmaci"},
  {t:"Supporto alle vie aeree"}, {t:"Tempi e registrazione"}, {t:"Ciclo chiuso, **leader chiaro**", key:true}]},

{id:"s44", tipo:"tabella", tema:"chiaro", sopratitolo:"La risposta in 15 righe · 1", colonne:["28%","72%"],
  intestazioni:["Che cosa", "Che cosa scrivo"], righe:[
  ["Il quadro", "61 anni · dolore toracico **tipico** da 50 minuti · sudorazione · parametri conservati"],
  ["Triage", "codice di **elevata priorità** · percorso dolore toracico"]], chiave:[1]},
{id:"s45", tipo:"tabella", tema:"chiaro", sopratitolo:"La risposta in 15 righe · 2", colonne:["28%","72%"],
  intestazioni:["Che cosa", "Che cosa scrivo"], righe:[
  ["ECG", "entro **10 minuti**, subito al medico · STEMI inferiore → rete"],
  ["Area monitorata", "defibrillatore pronto · riposo · **niente ossigeno** con SpO₂ 96%"]], chiave:[0]},
{id:"s46", tipo:"tabella", tema:"chiaro", sopratitolo:"La risposta in 15 righe · 3", colonne:["28%","72%"],
  intestazioni:["Che cosa", "Che cosa scrivo"], righe:[
  ["Terapia", "accessi · prelievi · farmaci prescritti · **cautela sui nitrati** · preparazione"],
  ["Arresto in FV", "**defibrillo subito** · registro gli orari"],
  ["Dopo", "trasferimento monitorato · SBAR · supporto alla moglie"]], chiave:[1]},

{id:"s47", tipo:"tre", tema:"chiaro", sopratitolo:"I collegamenti", box:[
  {n:"10.1", t:"Triage"}, {n:"8.1", t:"STEMI, nitrati, ECG", key:true}, {n:"10.3", t:"Rianimazione"}, {n:"14.7", t:"Contrasto"}]},
{id:"s48", tipo:"tre", tema:"chiaro", sopratitolo:"I collegamenti", box:[
  {n:"5.5", t:"Antiaggreganti"}, {n:"13.3", t:"Rete STEMI veneta", key:true}, {n:"14.2", t:"Sistema di conduzione"}]},

{id:"s49", tipo:"titolo", tema:"profondo",
  titolo:"Dieci minuti per l'ECG,<br>**pochi secondi** per lo shock.",
  sotto:"Prossima lezione: la paziente con BPCO che dorme troppo"},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione · 15.5",
  titolo:"La paziente con BPCO<br>che dorme troppo", sottotitolo:"Ossigeno, emogas e ventilazione non invasiva",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
