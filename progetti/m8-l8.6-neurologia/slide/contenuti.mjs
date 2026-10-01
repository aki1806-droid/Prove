// Contenuto delle 50 scene della lezione 8.6 — neurologia. Due corpi
// nuovi: la FAST in quattro tessere (lettera, parola, che cosa si chiede,
// che cosa si guarda, con il volto asimmetrico) e il cranio (la massa che
// cresce e spinge con i segni a destra; in modo letto la testata a 30° e
// il capo in asse; in modo pupille l'anisocoria). Il percorso stroke e la
// trombolisi in percorsi, le malattie croniche in griglie.

const STROKE = [
 {t:"Riconoscere", d:"FAST"}, {t:"118"}, {t:"Stroke unit"}, {t:"TC senza contrasto", d:"esclude l'emorragia", key:true}, {t:"Glicemia", d:"sempre"}, {t:"Trombolisi", d:"entro 4,5 h"}, {t:"Trombectomia", d:"casi selezionati, entro 6 h"},
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 8 · Assistenza in area medica",
  titolo:"Neurologia", sottotitolo:"8.6 · Il tempo è cervello",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"frase", tema:"chiaro", sopratitolo:"Micro-lezione 6 di 8 · una frase che riassume tutto · durante un ictus si perdono neuroni a ogni minuto",
  testo:"**Il tempo è cervello.** Il trattamento dipende da quanto rapidamente si riconoscono i sintomi e si attiva il percorso."},
{id:"s03", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Costruita intorno all'ictus", celle:[
  {n:"1", t:"L'**ictus**", key:true}, {n:"2", t:"La **valutazione neurologica**"}, {n:"3", t:"L'**ipertensione endocranica**"}, {n:"4", t:"Le principali **malattie croniche**"}]},

{id:"s04", tipo:"confronto", tema:"chiaro", sopratitolo:"L'ictus è di due tipi", col:[
  {h:"Ischemico · 80–85%", t:"un'arteria cerebrale si **occlude**", key:true}, {h:"Emorragico", t:"un vaso si **rompe**"}]},
{id:"s05", tipo:"trappola", tema:"chiaro", sopratitolo:"I sintomi possono essere identici · il trattamento dell'uno è dannoso per l'altro", righe:[
  {sb:"Distinguerli dai sintomi", ok:"**Solo la TC** distingue i due tipi"}]},
{id:"s06", tipo:"trappola", tema:"chiaro", sopratitolo:"L'attacco ischemico transitorio, il TIA · un deficit che regredisce completamente", righe:[
  {sb:"«È passato: falso allarme»", ok:"Un **segnale ad alto rischio** di ictus nei giorni successivi: valutazione urgente"}]},

{id:"s07", tipo:"fast", tema:"chiaro", sopratitolo:"Il riconoscimento · la scala FAST, che riprende la scala di Cincinnati", attive:[0], key:[0]},
{id:"s08", tipo:"fast", tema:"chiaro", sopratitolo:"A, arms · S, speech", attive:[0,1,2]},
{id:"s09", tipo:"fast", tema:"chiaro", sopratitolo:"T, time · anche un solo segno alterato basta per sospettare un ictus", key:[3]},

{id:"s10", tipo:"frase", tema:"chiaro", sopratitolo:"Il dato più prezioso che l'infermiere può raccogliere",
  testo:"L'**ora di insorgenza**: l'**ultima volta** in cui la persona è stata **vista in benessere**."},
{id:"s11", tipo:"trappola", tema:"chiaro", sopratitolo:"Se la persona si sveglia con i sintomi · da quell'orario dipende se si può fare la trombolisi o la trombectomia", righe:[
  {sb:"L'ora del risveglio", ok:"L'ora in cui è **andata a dormire**"}]},

{id:"s12", tipo:"percorso", tema:"chiaro", sopratitolo:"Il percorso stroke", attive:[0,1,2,3], tappe:STROKE},
{id:"s13", tipo:"trappola", tema:"chiaro", sopratitolo:"Glicemia, sempre", righe:[
  {sb:"Un «ictus» non riconosciuto come ipoglicemia", ok:"L'**ipoglicemia** dà sintomi identici, e si corregge in un minuto"}]},
{id:"s14", tipo:"percorso", tema:"chiaro", sopratitolo:"Nell'ictus ischemico · la trombolisi scioglie il trombo, la trombectomia lo rimuove con un catetere; in casi selezionati anche oltre le 6 ore", tappe:STROKE},

{id:"s15", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"La trombolisi · un farmaco potente, con un rischio di sanguinamento · prima", celle:[
  {t:"Pressione **sotto 185/110**", key:true}, {t:"**Glicemia**"}, {t:"Gli **accessi**"}, {t:"Il **peso**, per la dose"}]},
{id:"s16", tipo:"trappola", tema:"chiaro", sopratitolo:"Prima · che poi sanguinerebbero", righe:[
  {sb:"Catetere, sondino, intramuscolari «tanto per»", ok:"**Niente procedure invasive** non indispensabili"}]},
{id:"s17", tipo:"griglia", tema:"chiaro", colonne:1, spunta:true, sopratitolo:"Dopo · secondo protocollo", celle:[
  {t:"**Valutazioni neurologiche e pressione frequenti**: ogni 15 minuti nelle prime ore, poi a intervalli crescenti", key:true}, {t:"Pressione **sotto 180/105** nelle prime 24 ore"}]},
{id:"s18", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"Dopo · sorveglianza", celle:[
  {n:"!", t:"**Sanguinamento**"}, {n:"!", t:"**Peggioramento neurologico**: può indicare un'emorragia cerebrale", key:true}, {n:"!", t:"**Angioedema**"}]},

{id:"s19", tipo:"trappola", tema:"chiaro", sopratitolo:"L'assistenza nell'ictus, dove l'infermiere fa molta differenza · la lezione 3.3", righe:[
  {sb:"Un sorso d'acqua, una compressa", ok:"**Screening della deglutizione** prima di qualsiasi cosa per bocca"}]},
{id:"s20", tipo:"frase", tema:"chiaro", sopratitolo:"L'arto plegico · non si tira mai la persona per il braccio plegico",
  testo:"Posizionamento corretto, sostenendo la **spalla** per prevenire la **sublussazione**."},
{id:"s21", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"L'assistenza", celle:[
  {t:"Prevenzione di **polmonite, trombosi, lesioni da pressione, cadute**", key:true}, {t:"**Mobilizzazione precoce**"}, {t:"Con la persona **afasica**: frasi brevi, domande chiuse, tempo per rispondere"}]},
{id:"s22", tipo:"frase", tema:"chiaro", sopratitolo:"Continenza e umore · la depressione dopo l'ictus è frequente",
  testo:"Un'assistenza che dura **settimane**, e ogni giorno conta quanto il primo."},

{id:"s23", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"La valutazione neurologica · la Glasgow Coma Scale della lezione 2.3", celle:[
  {n:"4·5·6", t:"**Occhi, verbale, motoria**: da 3 a 15", key:true}, {n:"◉", t:"Le **pupille**: dimensione, simmetria, reattività alla luce"}]},
{id:"s24", tipo:"cranio", tema:"chiaro", sopratitolo:"Un'anisocoria di nuova comparsa · poi la forza degli arti, i parametri vitali; nell'ictus anche la scala NIHSS", modo:"pupille"},

{id:"s25", tipo:"cranio", tema:"chiaro", sopratitolo:"L'ipertensione endocranica · per un'emorragia, un trauma, un tumore, un edema", massa:70, voci:["**Cefalea** che peggiora", "**Vomito** improvviso", "**Coscienza alterata**: il primo da cogliere", "**Anisocoria**"]},
{id:"s26", tipo:"cranio", tema:"chiaro", sopratitolo:"Un segno tardivo, che indica un'erniazione imminente · la triade di Cushing", massa:100, titolo:"Erniazione imminente", voci:["**Ipertensione**, differenziale ampia", "**Bradicardia**", "**Respiro irregolare**"]},
{id:"s27", tipo:"frase", tema:"chiaro", sopratitolo:"Pressione alta e polso lento in un paziente neurologico",
  testo:"Non sono una contraddizione: sono un **allarme**."},

{id:"s28", tipo:"cranio", tema:"chiaro", sopratitolo:"L'assistenza · testata a 30 gradi per il deflusso venoso · capo in asse, senza flessione o rotazione che comprimerebbero le giugulari", modo:"letto"},
{id:"s29", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Evitare tutto ciò che aumenta la pressione", celle:[
  {n:"✗", t:"**Valsalva**, sforzi"}, {n:"✗", t:"**Tosse**: quindi prevenire la **stipsi**", key:true}, {n:"✗", t:"Aspirazioni non necessarie o **prolungate**"}]},
{id:"s30", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"E · le soluzioni ipotoniche della lezione 6.3", celle:[
  {t:"**Normotermia**, **normoglicemia**"}, {t:"Controllo di **dolore** e **agitazione**"}, {t:"**Niente soluzioni ipotoniche**", key:true}]},

{id:"s31", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"La crisi epilettica · durante · «non si ingoia la lingua»: un falso mito", celle:[
  {n:"1", t:"**Proteggere** dai traumi: oggetti lontani, testa sostenuta"}, {n:"2", t:"**Niente in bocca**", key:true}, {n:"3", t:"**Non trattenere** i movimenti"}, {n:"4", t:"**Cronometrare**"}]},
{id:"s32", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Al termine · la fase post-critica: la persona resta confusa per un po'", celle:[
  {t:"**Posizione laterale di sicurezza**", key:true}, {t:"Ossigeno, aspirazione se necessaria"}, {t:"Osservare e **documentare** le caratteristiche"}]},
{id:"s33", tipo:"cifre", tema:"chiaro", sopratitolo:"Lo stato di male · o crisi ripetute senza recupero · un'emergenza: benzodiazepina secondo protocollo", voci:[
  {n:"5", suf:"minuti", d:"una crisi che dura oltre", key:true}]},

{id:"s34", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Il morbo di Parkinson", celle:[
  {n:"1", t:"**Tremore** a riposo, rigidità"}, {n:"2", t:"**Lentezza** dei movimenti, instabilità posturale"}, {n:"!", t:"La **levodopa** va somministrata **puntualmente**, agli orari esatti prescritti", key:true}]},
{id:"s35", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"La levodopa · un ritardo di un'ora può bloccare la persona, impedirle di camminare o di deglutire", celle:[
  {n:"!", t:"I pasti ricchi di **proteine** ne riducono l'assorbimento"}, {n:"!", t:"**Non si sospende mai bruscamente**", key:true}]},
{id:"s36", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"I rischi · e i farmaci da evitare: va segnalato se prescritti", celle:[
  {n:"→", t:"**Cadute**, **disfagia**, stipsi, ipotensione ortostatica"}, {n:"✗", t:"**Aloperidolo**, **metoclopramide**: peggiorano i sintomi", key:true}]},

{id:"s37", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"Due malattie croniche · la sclerosi multipla: demielinizzante, spesso a ricadute, giovani adulti", celle:[
  {n:"→", t:"Fatica, disturbi **visivi, sensitivi, motori, vescicali**; il **calore** peggiora transitoriamente i sintomi", key:true}]},
{id:"s38", tipo:"catena", tema:"chiaro", sopratitolo:"La SLA · degenerazione progressiva dei motoneuroni, mentre la mente resta spesso lucida", passi:[
  {t:"Debolezza"}, {t:"Disfagia", d:"la PEG", key:true}, {t:"Insufficienza respiratoria", d:"la NIV"}]},
{id:"s39", tipo:"frase", tema:"chiaro", sopratitolo:"La comunicazione aumentativa e la pianificazione condivisa delle cure · legge 219",
  testo:"La persona decide **oggi** le cure di **domani**."},

{id:"s40", tipo:"frase", tema:"chiaro", sopratitolo:"Il caso · ore 10:30, paziente ricoverato per polmonite · al giro delle 9 era in ordine",
  testo:"Non riesce più a **sollevare il braccio destro** e **parla in modo confuso**. Che cosa fai?"},
{id:"s41", tipo:"percorso", tema:"chiaro", sopratitolo:"FAST positiva: sospetto ictus", tappe:[
  {t:"Ultima volta in benessere", d:"le 9", key:true}, {t:"Medico, subito", d:"percorso stroke intraospedaliero"}]},
{id:"s42", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Che cosa fai", celle:[
  {t:"**Glicemia**, parametri, saturazione", key:true}, {t:"**GCS** e **pupille**"}, {t:"**Nulla per bocca**"}, {t:"Accesso venoso"}]},
{id:"s43", tipo:"titolo", tema:"profondo",
  titolo:"Un ictus **in ospedale**: il tempo conta esattamente come fuori.",
  sotto:"Riconoscere, annotare l'ora, attivare."},

{id:"s44", tipo:"percorso", tema:"chiaro", sopratitolo:"In Veneto · la rete per l'ictus · all'orale: FAST, ora e rete, la catena che decide l'esito", tappe:[
  {t:"118", d:"percorso preospedaliero"}, {t:"Spoke", d:"stroke unit"}, {t:"Hub", d:"la trombectomia", key:true}]},

{id:"s45", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Le tabelle da fotografare", celle:[
  {t:"**FAST**: volto, braccia, linguaggio, tempo", key:true}, {t:"Trombolisi entro **4,5 ore**: prima pressione **< 185/110** e glicemia; dopo **< 180/105**"}]},
{id:"s46", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Le tabelle da fotografare", celle:[
  {t:"Ipertensione endocranica: **testata a 30**, **capo in asse**"}, {t:"**Cushing**: ipertensione, bradicardia, respiro irregolare", key:true}, {t:"Crisi: **niente in bocca**, cronometrare; stato di male oltre **5 minuti**"}, {t:"**Levodopa puntuale**"}]},

{id:"s47", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"I fili con gli altri moduli, utili all'orale", celle:[
  {n:"3.3", t:"La **disfagia**", key:true}, {n:"2.3", t:"La **GCS**"}, {n:"6.3", t:"Le **soluzioni ipotoniche**"}]},
{id:"s48", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"I fili con gli altri moduli", celle:[
  {n:"5.5 · 8.1", t:"Gli **anticoagulanti** e la **fibrillazione atriale**, prima causa di ictus cardioembolico", key:true}, {n:"1.6", t:"La **legge 219**"}]},
{id:"s49", tipo:"frase", tema:"chiaro", sopratitolo:"Una frase da portare via · nella prossima lezione, oncologia ed ematologia, con la neutropenia febbrile",
  testo:"**Il tempo è cervello.** Riconoscere, annotare l'ora, attivare."},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione",
  titolo:"8.7<br>Oncologia<br>ed ematologia", sottotitolo:"La neutropenia febbrile: ogni ora conta",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
