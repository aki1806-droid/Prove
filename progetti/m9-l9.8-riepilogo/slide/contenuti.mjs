// Contenuto delle 50 scene della lezione 9.8 — riepilogo del Modulo 9
// lungo la linea del tempo. Nessun corpo nuovo: il percorso a cinque
// tappe torna a ogni capitolo con la tappa attiva, le confusioni sono
// trappole, i casi una tabella, i fili con gli altri moduli griglie.

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 9 · Riepilogo",
  titolo:"La linea del tempo<br>perioperatoria", sottotitolo:"9.8 · Riepilogo del Modulo 9 e autovalutazione",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"percorso", tema:"chiaro", sopratitolo:"Micro-lezione 8 di 8 · dalla decisione chirurgica alla ripresa a casa", tappe:[
  {t:"Prima", d:""}, {t:"Durante", d:""}, {t:"Subito dopo", d:""}, {t:"Nei giorni dopo", d:""}, {t:"A casa", d:""}], attive:[0,1,2,3,4]},
{id:"s03", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Per ogni tappa · la struttura ideale per una traccia sull'assistenza al paziente chirurgico", celle:[
  {n:"1", t:"Che cosa **fa l'infermiere**", key:true}, {n:"2", t:"Che cosa può **andare storto**"}, {n:"3", t:"Come si **previene**"}]},
{id:"s04", tipo:"trappola", tema:"chiaro", sopratitolo:"All'orale, «il paziente chirurgico»", righe:[
  {sb:"Partire da una lista", ok:"Partire **dal tempo**: prima, durante, subito dopo, nei giorni successivi, a casa"}]},

{id:"s05", tipo:"percorso", tema:"chiaro", sopratitolo:"Prima · accertamento, ASA, ricognizione · che cosa può andare storto: un'inalazione, o un digiuno inutile dalla mezzanotte", tappe:[
  {t:"Prima", d:"6 h solidi · 2 h liquidi chiari", key:true}, {t:"Durante", d:""}, {t:"Subito dopo", d:""}, {t:"Nei giorni dopo", d:""}, {t:"A casa", d:""}], attive:[0]},
{id:"s06", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"Prima · che cosa si previene: l'infezione del sito, la trombosi", celle:[
  {t:"**Tricotomia** solo se necessaria, clipper, il giorno stesso", key:true}, {t:"**Doccia** preoperatoria"}, {t:"Profilassi **antitrombotica**"}]},
{id:"s07", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Prima · la terapia e il consenso", celle:[
  {t:"**Beta-bloccanti** continuati; anticoagulanti e antidiabetici secondo protocollo", key:true}, {t:"**Consenso**: lo acquisisce il medico, l'infermiere verifica"}]},
{id:"s08", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Prima · si impara quando non fa male", celle:[
  {t:"Educazione a **respiro, tosse, alzata, dolore**", key:true}, {t:"Gestione dell'**ansia**: meno dolore e meno nausea dopo"}]},

{id:"s09", tipo:"percorso", tema:"chiaro", sopratitolo:"Durante · la check-list · profilassi antibiotica entro 60 minuti dall'incisione", tappe:[
  {t:"Prima", d:""}, {t:"Durante", d:"sign in · time out · sign out", key:true}, {t:"Subito dopo", d:""}, {t:"Nei giorni dopo", d:""}, {t:"A casa", d:""}], attive:[1]},
{id:"s10", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Durante · posizionamento e protezione di nervi, occhi e cute", celle:[
  {n:"1", t:"**Peroneo** nella litotomica", key:true}, {n:"2", t:"**Plesso brachiale** oltre 90°"}, {n:"3", t:"**Lesioni da pressione** che iniziano in sala"}]},
{id:"s11", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Durante · l'ipotermia porta infezioni e sanguinamento", celle:[
  {n:"36", t:"**°C**: normotermia"}, {n:"4", t:"**Momenti della conta**: inizio, cavità, cute, cambio di personale", key:true}, {n:"→", t:"**Piastra neutra** su un muscolo"}]},

{id:"s12", tipo:"percorso", tema:"chiaro", sopratitolo:"Subito dopo · consegna SBAR · che cosa può andare storto: la lingua che chiude le vie aeree", tappe:[
  {t:"Prima", d:""}, {t:"Durante", d:""}, {t:"Subito dopo", d:"A-B-C · Aldrete ≥ 9", key:true}, {t:"Nei giorni dopo", d:""}, {t:"A casa", d:""}], attive:[2]},
{id:"s13", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Subito dopo", celle:[
  {n:"4", t:"**Apfel**: donna, non fumatore, storia di nausea, oppioidi"}, {n:"→", t:"Dolore **multimodale**, anche in movimento", key:true}, {n:"!", t:"Peridurale: **blocco motorio in aumento** = allarme"}]},
{id:"s14", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"Subito dopo · l'ipotensione ortostatica è frequente", celle:[
  {t:"**Alimentazione** precoce"}, {t:"Prima alzata **accompagnata**, in due tempi", key:true}, {t:"**Minzione** entro 6-8 h; se no, bladder scanner"}]},

{id:"s15", tipo:"percorso", tema:"chiaro", sopratitolo:"Nei giorni successivi · le complicanze con la loro cronologia", tappe:[
  {t:"Prima", d:""}, {t:"Durante", d:""}, {t:"Subito dopo", d:""}, {t:"Nei giorni dopo", d:"emorragia · atelettasia · ferita · TVP", key:true}, {t:"A casa", d:""}], attive:[3]},
{id:"s16", tipo:"tabella", tema:"chiaro", sopratitolo:"La cronologia · e sotto tutto il riconoscimento precoce: parametri, NEWS2, ascoltare il paziente", intestazioni:["Quando","Che cosa"], colonne:[1,2.5], righe:[
  ["Prime ore","**Emorragia**: la tachicardia precede l'ipotensione"],
  ["Giorni 1-2","**Atelettasia**: la complicanza che l'infermiere previene da solo"],
  ["Giorni 3-5","Polmonite, **vie urinarie**"],
  ["Giorni 5-7","**Ferita**"],
  ["Giorni 5-10","**Deiscenza**"],
  ["Sempre","**Trombosi** ed embolia"]]},
{id:"s17", tipo:"scala", tema:"chiaro", sopratitolo:"La febbre con le cinque W · il giorno della febbre dice dove guardare", gradini:[
  {n:"W", t:"Wind"}, {n:"W", t:"Water"}, {n:"W", t:"Wound", key:true}, {n:"W", t:"Walking"}, {n:"W", t:"Wonder drugs"}]},

{id:"s18", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Le specificità", celle:[
  {n:"90°", t:"**Anca**: no flessione oltre, no adduzione, no intrarotazione; lussazione: arto accorciato e ruotato", key:true}, {n:"48", t:"**Femore**: ore"}, {n:"→", t:"**Gesso**: controllo neurovascolare, ripetuto"}]},
{id:"s19", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Le specificità", celle:[
  {n:"!", t:"**Compartimentale**: dolore sproporzionato allo stiramento passivo; polso assente è tardivo", key:true}, {n:"→", t:"**Trazioni**: pesi liberi"}, {n:"→", t:"**Carotide**: neurologico e collo"}]},
{id:"s20", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Le specificità", celle:[
  {n:"Na", t:"**Prostata**: iponatriemia da riassorbimento"}, {n:"3", t:"**Tiroide**: ematoma, calcio, voce", key:true}, {n:"24", t:"**Day surgery**: accompagnatore, niente guida per 24 h, telefonata il giorno dopo"}]},

{id:"s21", tipo:"percorso", tema:"chiaro", sopratitolo:"A casa · dimissione pianificata dall'ingresso, ordinaria o protetta tramite la COT", tappe:[
  {t:"Prima", d:""}, {t:"Durante", d:""}, {t:"Subito dopo", d:""}, {t:"Nei giorni dopo", d:""}, {t:"A casa", d:"lettera · educazione · teach-back", key:true}], attive:[4]},
{id:"s22", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"A casa · l'educazione, verificata con il teach-back", celle:[
  {t:"**Ferita**, dispositivi"}, {t:"**Terapia** con riconciliazione", key:true}, {t:"**Trombosi**, vita quotidiana, follow-up"}]},
{id:"s23", tipo:"trappola", tema:"chiaro", sopratitolo:"Che cosa può andare storto · si previene prima, in reparto", righe:[
  {sb:"Riammissione per un'infezione non riconosciuta, trombosi per un'eparina mai iniziata, caduta in una casa non preparata", ok:"**Educazione e pianificazione**"}]},

{id:"s24", tipo:"trappola", tema:"chiaro", sopratitolo:"Le confusioni che costano più punti", righe:[
  {sb:"Digiuno dalla mezzanotte", ok:"Liquidi chiari **fino a 2 ore prima**"}, {sb:"Rasoio, la sera prima", ok:"**Clipper**, il giorno stesso"}]},
{id:"s25", tipo:"confronto", tema:"chiaro", sopratitolo:"Due momenti diversi, due domande diverse", col:[
  {h:"Sign in", t:"**prima dell'induzione**", key:true}, {h:"Time out", t:"**prima dell'incisione**"}]},
{id:"s26", tipo:"confronto", tema:"chiaro", sopratitolo:"Chi passa i ferri e chi fa la conta ad alta voce con lui · e i due segni tardivi", col:[
  {h:"Strumentista", t:"**sterile**"}, {h:"Infermiere di sala", t:"**non sterile**", key:true}]},
{id:"s27", tipo:"titolo", tema:"profondo",
  titolo:"Aspettare il segno tardivo<br>significa **arrivare tardi**.",
  sotto:"ipotensione nell'emorragia · polso assente nella sindrome compartimentale"},

{id:"s28", tipo:"tabella", tema:"chiaro", sopratitolo:"I casi · la prima parola giusta", intestazioni:["Il caso","La risposta"], colonne:[2,1.3], righe:[
  ["Time out senza conferma della profilassi","si verifica **prima dell'incisione**"],
  ["Caffè la mattina dell'intervento","dipende dal **protocollo**; si documenta l'orario"]]},
{id:"s29", tipo:"tabella", tema:"chiaro", sopratitolo:"I casi", intestazioni:["Il caso","La risposta"], colonne:[2,1.3], righe:[
  ["Tachicardia e drenaggio ematico dopo 2 ore","**emorragia**: si avvisa prima che la pressione scenda"],
  ["Desaturazione e febbricola in 2ª giornata","**atelettasia**: si riparte dal dolore"]]},
{id:"s30", tipo:"tabella", tema:"chiaro", sopratitolo:"I casi", intestazioni:["Il caso","La risposta"], colonne:[2,1.3], righe:[
  ["Dispnea improvvisa in 6ª giornata dopo protesi d'anca","**embolia**"],
  ["Piede cadente dopo litotomica","**peroneo**"],
  ["Dolore sproporzionato sotto il gesso","**sindrome compartimentale**"]]},
{id:"s31", tipo:"frase", tema:"chiaro", sopratitolo:"Sette casi, sette risposte in una riga · poi si aggiunge che cosa si fa",
  testo:"All'orale, la **prima parola giusta** vale più di un discorso lungo."},

{id:"s32", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"I fili con gli altri moduli", celle:[
  {n:"4.1 · 7.4", t:"Il **bundle** per le infezioni del sito chirurgico", key:true}, {n:"Mod. 7", t:"**Drenaggi** e ferite"}]},
{id:"s33", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"I fili con gli altri moduli", celle:[
  {n:"3.2", t:"La **trombosi**"}, {n:"3.7 · 5.6", t:"**Analgesia** e PCA", key:true}, {n:"6.6", t:"La **trasfusione**"}]},
{id:"s34", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"I fili con gli altri moduli · le domande saltano da uno all'altro", celle:[
  {n:"5.4", t:"La **riconciliazione**"}, {n:"2.7 · 11.7", t:"La **dimissione protetta**", key:true}]},

{id:"s35", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"Gli agganci veneti", celle:[
  {t:"La **check-list** di sala", key:true}, {t:"I percorsi **ERAS**"}, {t:"Il **prericovero**: esami ed educazione prima dell'ingresso"}]},
{id:"s36", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"Gli agganci veneti · ogni aggancio vale una frase in più all'orale", celle:[
  {t:"**Recovery room** e servizio per il **dolore acuto**"}, {t:"Percorsi **ortogeriatrici**, femore entro **48 ore**", key:true}, {t:"Dimissioni protette con le **COT**"}]},

{id:"s37", tipo:"cifre", tema:"chiaro", sopratitolo:"Come proseguire · se la sai disegnare, la sai raccontare", voci:[
  {n:"30", suf:"domande", d:"il test del modulo"}, {n:"21", suf:"", d:"la soglia", key:true}]},
{id:"s38", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"Nel quaderno · cinque schede che i concorsi chiedono così come sono: o le sai, o no", celle:[
  {t:"**Check-list**"}, {t:"**Digiuno**"}, {t:"**Aldrete**", key:true}, {t:"**Apfel**"}, {t:"**Precauzioni dell'anca**"}]},
{id:"s39", tipo:"catena", tema:"chiaro", sopratitolo:"Scrivi il caso dell'emorragia postoperatoria · lo schema in cinque passi", passi:[
  {t:"Che cosa vedo"}, {t:"Che cosa penso", key:true}, {t:"Che cosa faccio subito"}, {t:"Chi avviso"}, {t:"Che cosa documento"}]},

{id:"s40", tipo:"frase", tema:"chiaro", sopratitolo:"La frase del modulo",
  testo:"Molte complicanze del post-operatorio **si prevengono nel pre-operatorio**."},
{id:"s41", tipo:"titolo", tema:"profondo",
  titolo:"Molte complicanze del post-operatorio<br>si prevengono **nel pre-operatorio**.",
  sotto:""},
{id:"s42", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Tre esempi", celle:[
  {n:"→", t:"L'**educazione al respiro** previene l'atelettasia", key:true}, {n:"→", t:"La **tricotomia corretta** previene l'infezione"}, {n:"→", t:"La **pianificazione della dimissione** previene la riammissione"}]},
{id:"s43", tipo:"frase", tema:"chiaro", sopratitolo:"Per questo il modulo è iniziato dal percorso e dalla preparazione, non dalla sala operatoria",
  testo:"Il lavoro migliore dell'infermiere chirurgico spesso **non si vede**, perché evita qualcosa."},

{id:"s44", tipo:"frase", tema:"chiaro", sopratitolo:"All'orale · il ruolo dell'infermiere nel percorso chirurgico",
  testo:"Una risposta che **riassume tutto**."},
{id:"s45", tipo:"percorso", tema:"chiaro", sopratitolo:"L'infermiere", tappe:[
  {t:"Prepara", d:"la persona"}, {t:"Protegge", d:"quando non può proteggersi da sola", key:true}, {t:"Rimette in piedi", d:""}, {t:"Rimanda a casa", d:"capace di gestirsi"}], attive:[0,1,2,3]},
{id:"s46", tipo:"frase", tema:"chiaro", sopratitolo:"Quattro verbi, quattro tappe della linea del tempo",
  testo:"Preparare, proteggere, rimettere in piedi, rimandare a casa. Se ricordi questi, **ricordi il modulo**."},

{id:"s47", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Nel prossimo modulo · l'emergenza", celle:[
  {n:"1", t:"**Triage**, valutazione **ABCDE**", key:true}, {n:"2", t:"**Rianimazione** cardiopolmonare"}, {n:"3", t:"**Shock** e sepsi"}, {n:"4", t:"Emergenze **pediatriche** e ostetriche"}, {n:"5", t:"**Trauma** e maxi-emergenze"}]},
{id:"s48", tipo:"frase", tema:"chiaro", sopratitolo:"Da lì ripartiamo",
  testo:"L'ABC del risveglio della lezione 9.4 è lo stesso **ABCDE** con cui si valuta ogni paziente critico."},
{id:"s49", tipo:"frase", tema:"chiaro", sopratitolo:"Il modulo degli algoritmi, e dei minuti che contano",
  testo:"Ci vediamo lì."},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossimo modulo",
  titolo:"Modulo 10<br>Emergenza e<br>area critica", sottotitolo:"Triage, ABCDE, rianimazione, shock, trauma",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
