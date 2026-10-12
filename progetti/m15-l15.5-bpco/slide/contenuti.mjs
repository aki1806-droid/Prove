// Contenuto delle 50 scene della lezione 15.5 — la paziente con BPCO che dorme
// troppo. La saturazione alta è il falso amico: una misura con la soglia del
// target superata; i dispositivi dell'ossigeno della 8.2 (reservoir, poi
// Venturi); l'emogas in tre colonne prima e dopo la NIV, con i quattro passi
// della 6.4 come percorso che si accende; gli errori su fondo tenue.

const PASSI = (att, k) => ({tipo:"percorso", tema:"chiaro", tappe:[
  {t:"pH < 7,35", d:"acidemia", key:k===0},
  {t:"PaCO₂ alta", d:"origine respiratoria", key:k===1},
  {t:"HCO₃⁻ alto", d:"compenso renale: è cronica", key:k===2},
  {t:"pH ancora acido", d:"compenso parziale", key:k===3}], attive:att});

const NIV = (att, k) => ({tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, attive:att, celle:[
  {t:"**Spiegazione** e rassicurazione", key:k===0}, {t:"Scelta dell'**interfaccia**", key:k===1},
  {t:"Protezione della **cute del naso**", key:k===2}, {t:"Controllo delle **perdite**", key:k===3},
  {t:"**Distensione gastrica**", key:k===4}, {t:"Monitoraggio di FR, SpO₂, **coscienza**, emogas", key:k===5},
  {t:"Riconoscere i **segni di fallimento**", key:k===6}]});

const ERRORI = att => ({tipo:"elenco", tema:"tenue", vietato:true, attive:att, voci:[
  {t:"«Satura **99%**, sta bene»"},
  {t:"**Reservoir** ad alto flusso «per sicurezza» nell'ipercapnico"},
  {t:"**Sospendere di colpo** l'ossigeno"},
  {t:"**Aerosol** con ossigeno ad alto flusso"},
  {t:"Leggere la sonnolenza come «**finalmente riposa**»"},
  {t:"Dimettere senza verificare la **tecnica inalatoria**"}]});

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 15 · Casi clinici integrati",
  titolo:"La paziente con BPCO<br>che dorme troppo", sottotitolo:"15.5 · Ossigeno, emogas e ventilazione non invasiva",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"trappola", tema:"chiaro", sopratitolo:"Caso 5 · l'idea che il caso mette alla prova", righe:[
  {sb:"«Una saturazione alta è sempre una buona notizia»", ok:"Un'idea **sbagliata**, e molto diffusa"},
  {sb:"Molto ossigeno «per stare tranquilli»", ok:"La paziente con BPCO diventa sempre più **sonnolenta**"}]},
{id:"s03", tipo:"tre", tema:"chiaro", sopratitolo:"Serviranno", box:[
  {n:"8.2", t:"Ossigenoterapia"}, {n:"6.4", t:"Emogas", key:true}, {n:"NIV", t:"Ventilazione non invasiva"},
  {n:"14.3", t:"Fisiologia del respiro"}]},

{id:"s04", tipo:"frase", tema:"chiaro", sopratitolo:"Lo scenario · ore 14, dal pronto soccorso",
  testo:"**Signora Lucia, 74 anni**, **BPCO grave**: a casa ossigeno a **1 L/min**. Arriva in pneumologia per una **riacutizzazione**."},
{id:"s05", tipo:"cifre", tema:"chiaro", sopratitolo:"Reservoir «perché in PS saturava 84%» · e alle 17", voci:[
  {n:"15", suf:"L", t:"maschera con reservoir", d:"litri al minuto"},
  {n:"99", suf:"%", t:"saturazione", d:"alle 17", key:true},
  {n:"12", t:"frequenza respiratoria", d:"atti al minuto, alle 17"}]},
{id:"s06", tipo:"corpo", tema:"chiaro", sopratitolo:"Perché una saturazione di 99 dovrebbe preoccuparti?", voci:[
  {z:"viso", t:"Molto **sonnolenta**", d:"risponde solo se chiamata a voce alta", key:true},
  {z:"torace", t:"Cute **calda e arrossata**"},
  {z:"braccia", t:"**Tremore** delle mani"},
  {z:"collo", t:"**Cefalea**", d:"riferita in mattinata"}]},

{id:"s07", tipo:"misura", tema:"chiaro", sopratitolo:"Il ragionamento · BPCO grave, ossigeno a domicilio: rischio di ipercapnia",
  min:80, max:100, passo:4, soglia:92, valore:99, direzione:"alto-peggio",
  titolo:"Satura **99%**", sotto:"Da ore ossigeno ad alta concentrazione: molto oltre il suo target, **88–92%**"},
{id:"s08", tipo:"griglia", tema:"chiaro", colonne:1, spunta:true, sopratitolo:"I segni dell'ipercapnia", celle:[
  {t:"**Sonnolenza**"}, {t:"**Cefalea**"}, {t:"Vasodilatazione: cute **calda**"}, {t:"**Tremore** delle mani (flapping)"},
  {t:"Frequenza respiratoria che **si riduce**, invece di aumentare", key:true}]},
{id:"s09", tipo:"frase", tema:"chiaro", sopratitolo:"Il sospetto: narcosi da CO₂ iniziale",
  testo:"La saturazione **non misura la CO₂**.",
  sotto:"Una saturazione perfetta può accompagnare un'acidosi grave."},

{id:"s10", tipo:"icone", tema:"chiaro", sopratitolo:"Le prime azioni", voci:[
  {icona:"telefono", t:"Medico con urgenza", d:"SBAR", key:true}, {icona:"persona", t:"Stimolare la paziente"},
  {icona:"occhio", t:"Valutare la GCS", d:"quanto è compromessa la coscienza"}]},
{id:"s11", tipo:"trappola", tema:"chiaro", sopratitolo:"Non si sospende bruscamente", righe:[
  {sb:"Togliere del tutto l'ossigeno", ok:"Dopo tanto ossigeno accumulato: **ipossiemia di rimbalzo**, pericolosa"}]},
{id:"s12", tipo:"o2", tema:"chiaro", sopratitolo:"Titolare secondo prescrizione · es. Venturi 24–28%, target 88–92%", attive:[3]},
{id:"s13", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"E poi", celle:[
  {t:"Posizione **semiseduta**"}, {t:"Monitoraggio continuo di **SpO₂** e **FR**"},
  {t:"Preparare l'**emogas**, su prescrizione"}, {t:"Preparare la **NIV**", key:true}]},

{id:"s14", tipo:"ega", tema:"chiaro", sopratitolo:"L'emogas", valori:{ph:7.24, co2:82, hco3:34},
  lettura:"PaO₂ **118 mmHg** · si legge con i quattro passi della lezione 6.4"},
{id:"s15", sopratitolo:"I quattro passi · lezione 6.4", ...PASSI([0,1,2], 2)},
{id:"s16", sopratitolo:"Acidosi respiratoria acuta su cronica · con iperossia, PaO₂ 118", ...PASSI([0,1,2,3], 3)},

{id:"s17", tipo:"tre", tema:"chiaro", sopratitolo:"Perché l'ossigeno ha fatto salire la CO₂ · lezione 14.3", box:[
  {n:"1", t:"Ventilazione / perfusione", d:"il rapporto **peggiora**"},
  {n:"2", t:"Effetto Haldane", d:"l'emoglobina ossigenata trasporta **meno CO₂**", key:true},
  {n:"3", t:"Stimolo respiratorio", d:"in parte, si **riduce**"}]},
{id:"s18", tipo:"tre", tema:"chiaro", sopratitolo:"Lezione 8.2 · nel rischio di ipercapnia · più non è meglio", box:[
  {n:"1", t:"Prescrizione"}, {n:"2", t:"Target", key:true}, {n:"3", t:"Titolazione"}]},

{id:"s19", tipo:"cifre", tema:"chiaro", sopratitolo:"La NIV · riacutizzazione di BPCO con acidosi respiratoria", voci:[
  {n:"< 7,35", t:"pH"}, {n:"> 45", t:"PaCO₂", d:"mmHg", key:true}]},
{id:"s20", tipo:"griglia", tema:"chiaro", colonne:1, spunta:true, sopratitolo:"Su prescrizione · l'assistenza della lezione 8.2", celle:[
  {t:"Avvio con l'ossigeno **titolato**"}, {t:"**Spiegare** e rassicurare, anche se è sonnolenta"},
  {t:"Interfaccia della **misura giusta**", key:true}]},
{id:"s21", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"La NIV · la sorveglianza", celle:[
  {t:"Protezione del **dorso del naso**"}, {t:"Controllo delle **perdite**"}, {t:"**Distensione gastrica**"},
  {t:"Monitoraggio di FR e SpO₂"}, {t:"**Coscienza**"}, {t:"**Emogas** di controllo dopo 1–2 ore", key:true}]},

{id:"s22", tipo:"sostituzione", tema:"chiaro", sopratitolo:"La terapia associata · broncodilatatori per aerosol, su prescrizione",
  da:{h:"Nell'ipercapnico, no", t:"Ossigeno ad alto flusso"}, a:{h:"Si nebulizza con", t:"**Aria compressa**"}},
{id:"s23", tipo:"tre", tema:"chiaro", sopratitolo:"E ancora, su prescrizione", box:[
  {n:"O₂", t:"Occhialini", d:"secondo target, durante l'aerosol: niente eccesso", key:true},
  {n:"2", t:"Corticosteroidi"}, {n:"3", t:"Antibiotico", d:"se indicato · es. espettorato **purulento**"}]},

{id:"s24", tipo:"ega", tema:"chiaro", sopratitolo:"L'evoluzione · dopo 2 ore di NIV", valori:{ph:7.31, co2:68},
  lettura:"PaO₂ **64** · SpO₂ **90%** · più sveglia, risponde in modo appropriato: **si prosegue**"},
{id:"s25", tipo:"griglia", tema:"chiaro", colonne:2, sopratitolo:"I segni di fallimento · da segnalare subito", celle:[
  {t:"pH che **peggiora**", no:true}, {t:"Coscienza che **cala**", no:true},
  {t:"**Fatica** respiratoria", no:true}, {t:"**Intolleranza** alla maschera", no:true}]},
{id:"s26", tipo:"bivio", tema:"chiaro", sopratitolo:"Se la NIV fallisce", radice:"Si valuta l'intubazione",
  rami:[{q:"che cosa", t:"Intubazione", d:"valutazione clinica"},
        {q:"sempre nel rispetto", t:"Volontà della persona", d:"pianificazione condivisa delle cure, L. 219: prima della crisi", key:true}]},

{id:"s27", tipo:"percorso", tema:"chiaro", sopratitolo:"Gli inalatori · far eseguire la manovra · spray predosato", tappe:[
  {t:"Distanziatore", d:"meglio con"}, {t:"Espirare", d:"prima"}, {t:"Inspirare", d:"lentamente", key:true}, {t:"Trattenere", d:"il respiro"}]},
{id:"s28", tipo:"tre", tema:"chiaro", sopratitolo:"E poi", box:[
  {n:"1", t:"Polveri secche", d:"inspirazione **rapida e profonda**"},
  {n:"2", t:"Risciacquo della bocca", d:"dopo i **corticosteroidi**", key:true},
  {n:"3", t:"Mantenimento o al bisogno", d:"ogni giorno · solo quando serve"}]},

{id:"s29", tipo:"griglia", tema:"chiaro", colonne:1, sopratitolo:"L'ossigeno a domicilio", celle:[
  {n:"✓", t:"Flusso e ore **prescritti**"},
  {n:"×", t:"Non **aumentarlo** da sola quando si sente peggio: è ciò che, in grande, è successo in ospedale", key:true},
  {n:"×", t:"Niente **fumo**, né **fiamme**"}]},
{id:"s30", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Il piano d'azione", celle:[
  {t:"Segni di riacutizzazione: più **dispnea**, più **espettorato**, cambio di **colore**", key:true},
  {t:"Sapere **chi chiamare**"}, {t:"Smettere di **fumare**"}, {t:"**Vaccinazioni** raccomandate"}]},
{id:"s31", tipo:"icone", tema:"chiaro", sopratitolo:"La presa in carico", voci:[
  {icona:"polmoni", t:"Riabilitazione respiratoria"}, {icona:"documento", t:"PDTA BPCO"},
  {icona:"casa", t:"Infermiere di famiglia e comunità", key:true}, {icona:"telefono", t:"Telemonitoraggio", d:"se disponibile"}]},

{id:"s32", sopratitolo:"Gli errori da evitare", ...ERRORI([0,1,2])},
{id:"s33", sopratitolo:"Gli errori da evitare", ...ERRORI([3,4,5])},

{id:"s34", tipo:"percorso", tema:"chiaro", sopratitolo:"La comunicazione fra setting · la prescrizione segue la paziente", tappe:[
  {t:"Pronto soccorso"}, {t:"Prescrizione", d:"con il target"},
  {t:"Consegne", d:"target · dispositivo · flusso · emogas", key:true}, {t:"Reparto"}]},
{id:"s35", tipo:"frase", tema:"chiaro", sopratitolo:"15 litri senza indicazioni",
  testo:"Un problema di **comunicazione fra setting**: si **segnala**, in un'ottica **no blame**.",
  sotto:"Per migliorare il percorso, non per cercare un colpevole."},

{id:"s36", tipo:"catena", tema:"chiaro", sopratitolo:"Vivere con la BPCO · dispnea cronica e ansia si alimentano a vicenda", passi:[
  {t:"Manca il **respiro**"}, {t:"Cresce l'**ansia**"}, {t:"L'ansia **peggiora** il respiro", d:"e il giro ricomincia", key:true}]},
{id:"s37", tipo:"tre", tema:"chiaro", sopratitolo:"Alcune tecniche aiutano", box:[
  {n:"1", t:"Labbra socchiuse", d:"espirazione **lenta**: le vie aeree restano aperte", key:true},
  {n:"2", t:"Posizioni", d:"seduti, **busto in avanti**, braccia appoggiate"}]},
{id:"s38", tipo:"tre", tema:"chiaro", sopratitolo:"Nella vita di ogni giorno", box:[
  {n:"1", t:"Conservare l'energia", d:"nelle attività quotidiane"},
  {n:"2", t:"Nutrizione", d:"spesso **malnutriti** nella BPCO grave: pasti **piccoli e frequenti**", key:true}]},
{id:"s39", tipo:"icone", tema:"chiaro", sopratitolo:"E poi", voci:[
  {icona:"persone", t:"Isolamento sociale"}, {icona:"chat", t:"Supporto psicologico"},
  {icona:"cuoremano", t:"Cure palliative", d:"nelle fasi avanzate, anche per la dispnea", key:true}]},

{id:"s40", tipo:"frase", tema:"chiaro", sopratitolo:"D1 · quando si usa la maschera di Venturi?",
  testo:"Quando serve una concentrazione di ossigeno **precisa e costante**: tipicamente nel rischio di **ipercapnia**, target **88–92%**."},
{id:"s41", tipo:"percorso", tema:"chiaro", sopratitolo:"D2 · come si legge un emogas", tappe:[
  {t:"pH", d:"acidemia o alcalemia"}, {t:"PaCO₂ e HCO₃⁻", d:"respiratoria o metabolica"},
  {t:"Il valore opposto", d:"il compenso", key:true}, {t:"Ossigenazione"}]},
{id:"s42", sopratitolo:"D3 · gli aspetti assistenziali della NIV", ...NIV([0,1,2,3,4], -1)},
{id:"s43", sopratitolo:"D3 · gli aspetti assistenziali della NIV", ...NIV([0,1,2,3,4,5,6], 6)},

{id:"s44", tipo:"tabella", tema:"chiaro", sopratitolo:"La risposta in 15 righe · 1", colonne:["28%","72%"],
  intestazioni:["Che cosa", "Che cosa scrivo"], righe:[
  ["Il quadro", "BPCO grave · O₂ ad alta concentrazione · SpO₂ 99% · sonnolenza, cefalea, cute calda, bradipnea"],
  ["L'ipotesi", "**ipercapnia da eccesso di ossigeno**"]], chiave:[1]},
{id:"s45", tipo:"tabella", tema:"chiaro", sopratitolo:"La risposta in 15 righe · 2", colonne:["28%","72%"],
  intestazioni:["Che cosa", "Che cosa scrivo"], righe:[
  ["Priorità", "ossigenazione al target **88–92%** · trattare l'acidosi respiratoria"],
  ["Subito", "medico con urgenza · stimolo la paziente · valuto la coscienza"],
  ["Ossigeno", "**non lo sospendo**: lo titolo con la Venturi, su prescrizione"]], chiave:[2]},
{id:"s46", tipo:"tabella", tema:"chiaro", sopratitolo:"La risposta in 15 righe · 3", colonne:["28%","72%"],
  intestazioni:["Che cosa", "Che cosa scrivo"], righe:[
  ["Poi", "semiseduta · monitoraggio continuo · emogas e **NIV** · aerosol con aria compressa"],
  ["Dopo 1–2 ore", "rivaluto · segnalo i segni di fallimento"],
  ["Infine", "documento · educo prima della dimissione"]], chiave:[0]},

{id:"s47", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"I collegamenti", celle:[
  {n:"6.4", t:"Emogas", key:true}, {n:"8.2", t:"Ossigeno, Venturi, NIV, aerosol"}, {n:"10.5", t:"Ventilazione"},
  {n:"14.3", t:"Fisiologia del respiro"}, {n:"11.6", t:"Cronicità e PDTA"}, {n:"1.6", t:"L. 219/2017"}]},

{id:"s48", tipo:"titolo", tema:"profondo",
  titolo:"Una saturazione perfetta<br>**non è un paziente perfetto**.",
  sotto:"Guarda la persona, conta la frequenza respiratoria, ascolta la sua coscienza."},

{id:"s49", tipo:"frase", tema:"chiaro", sopratitolo:"Nella prossima lezione",
  testo:"Alle **2 di notte**, un paziente con scompenso va in **edema polmonare acuto**. Poi va riportato a casa, perché non torni dopo un mese."},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione · 15.6",
  titolo:"Lo scompenso", sottotitolo:"Dalla notte in edema polmonare al ritorno a casa",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
