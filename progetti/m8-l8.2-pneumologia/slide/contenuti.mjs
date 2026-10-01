// Contenuto delle 50 scene della lezione 8.2 — pneumologia e
// ossigenoterapia. Due corpi nuovi: i dispositivi dell'ossigeno (o2) su un
// asse dei litri al minuto, con le barre dal flusso minimo al massimo e la
// FiO₂, e la cannula tracheostomica in sezione (la cuffia a tre pressioni,
// il catetere di aspirazione a metà del lume). Il target in fascia.

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 8 · Assistenza in area medica",
  titolo:"Pneumologia<br>e ossigenoterapia", sottotitolo:"8.2 · L'ossigeno è un farmaco",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"frase", tema:"chiaro", sopratitolo:"Micro-lezione 2 di 8 · lezione ad altissima resa d'esame · una regola che vale da sola molte domande",
  testo:"L'**ossigeno è un farmaco**, con una prescrizione, una dose e un obiettivo."},
{id:"s03", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"E i dispositivi, che i quiz chiedono con numeri precisi · in chiusura la tracheostomia e la broncoaspirazione", celle:[
  {n:"1", t:"**Occhialini**, maschere, **Venturi**", key:true}, {n:"2", t:"**Alti flussi**, ventilazione non invasiva"}]},

{id:"s04", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"Due malattie ostruttive · la BPCO", celle:[
  {n:"1", t:"Ostruzione **cronica**, poco reversibile, causata soprattutto dal **fumo**", key:true}, {n:"2", t:"Si aggrava nelle **riacutizzazioni**, spesso infettive"}]},
{id:"s05", tipo:"confronto", tema:"chiaro", sopratitolo:"Molti pazienti con BPCO hanno un rischio di ipercapnia: accumulo di anidride carbonica", col:[
  {h:"BPCO", t:"ostruzione **cronica**, rischio di **ipercapnia**", key:true}, {h:"Asma", t:"ostruzione **reversibile**, infiammazione delle vie aeree"}]},
{id:"s06", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"L'attacco grave d'asma · passa pochissima aria · un asmatico che smette di sibilare può stare peggiorando", celle:[
  {n:"1", t:"Non riesce a **parlare** in frasi complete"}, {n:"2", t:"Torace **silenzioso**", key:true}, {n:"3", t:"**Cianosi**, sonnolenza"}, {n:"4", t:"**Esaurimento**"}]},

{id:"s07", tipo:"trappola", tema:"chiaro", sopratitolo:"Tre quadri acuti · la polmonite: febbre, tosse, espettorato, dolore pleurico, dispnea", righe:[
  {sb:"Nell'anziano, aspettare la febbre e la tosse", ok:"Spesso si presenta **solo con confusione**"}]},
{id:"s08", tipo:"catena", tema:"chiaro", sopratitolo:"L'embolia polmonare · il legame con la lezione 3.2", passi:[
  {t:"Trombosi venosa profonda"}, {t:"Embolia polmonare", key:true}, {t:"Dispnea improvvisa, dolore, tachicardia, desaturazione"}]},
{id:"s09", tipo:"frase", tema:"chiaro", sopratitolo:"Il versamento pleurico · liquido fra i foglietti pleurici",
  testo:"**Dispnea** e **murmure ridotto**: si drena con la **toracentesi**."},

{id:"s10", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"La toracentesi · dal medico, con l'assistenza infermieristica", celle:[
  {n:"→", t:"**Seduta, protesa in avanti**, con le braccia su un tavolino: gli spazi intercostali si allargano", key:true}]},
{id:"s11", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"La toracentesi · dopo, radiografia di controllo", celle:[
  {t:"Parametri, saturazione, **tosse**, **dolore**"}, {t:"Quantità **limitata** in una volta: edema polmonare da riespansione", key:true}]},

{id:"s12", tipo:"frase", tema:"chiaro", sopratitolo:"Il principio fondamentale · su prescrizione, e la prescrizione indica un obiettivo di saturazione",
  testo:"Per la maggior parte delle persone il target è **94–98%**."},
{id:"s13", tipo:"fascia", tema:"chiaro", sopratitolo:"Nei pazienti a rischio di ipercapnia · BPCO, obesità grave, malattie neuromuscolari", min:84, max:100, classi:[
  {da:84, a:88, t:"bassa"}, {da:88, a:92, t:"88–92%", d:"a rischio di ipercapnia", key:true}, {da:92, a:94, t:""}, {da:94, a:98, t:"94–98%", d:"la maggior parte"}, {da:98, a:100, t:"troppo"}]},
{id:"s14", tipo:"frase", tema:"chiaro", sopratitolo:"Ricordi il caso della lezione 6.4 · nell'ipercapnico, troppo ossigeno peggiora l'acidosi respiratoria, fino al coma",
  testo:"**Più ossigeno** non è sempre meglio."},

{id:"s15", tipo:"o2", tema:"chiaro", sopratitolo:"I dispositivi · gli occhialini nasali: circa 4 punti di FiO₂ in più per ogni litro", attive:[0], key:[0]},
{id:"s16", tipo:"frase", tema:"chiaro", sopratitolo:"Comodi: si parla e si mangia · ai flussi più alti, umidificazione secondo procedura",
  testo:"La FiO₂ reale **varia con il modo di respirare**."},

{id:"s17", tipo:"o2", tema:"chiaro", sopratitolo:"La maschera semplice · 5–10 litri al minuto", attive:[0,1], key:[1]},
{id:"s18", tipo:"trappola", tema:"chiaro", sopratitolo:"La regola", righe:[
  {sb:"La maschera semplice a 3 litri", ok:"**Mai sotto 5**: con un flusso basso la persona rirespira la propria anidride carbonica"}]},
{id:"s19", tipo:"o2", tema:"chiaro", sopratitolo:"La maschera con reservoir · per la grave ipossiemia · il pallone resta gonfio: se si affloscia, il flusso è insufficiente", attive:[0,1,2], key:[2]},

{id:"s20", tipo:"o2", tema:"chiaro", sopratitolo:"La Venturi · FiO₂ precisa e costante, indipendente da come respira la persona", attive:[0,1,2,3]},
{id:"s21", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"Le valvole colorate intercambiabili", celle:[
  {n:"1", t:"Ogni valvola corrisponde a una **FiO₂**", key:true}, {n:"2", t:"Su ogni valvola è scritto il **flusso** da impostare sul flussimetro"}]},
{id:"s22", tipo:"frase", tema:"chiaro", sopratitolo:"Il dispositivo di scelta quando serve precisione",
  testo:"Il paziente con **BPCO** a rischio di ipercapnia."},

{id:"s23", tipo:"o2", tema:"chiaro", sopratitolo:"Gli alti flussi nasali · fino a 60 litri al minuto, riscaldato e umidificato · FiO₂ dal 21 al 100%", scala:"alta", key:[4]},
{id:"s24", tipo:"griglia", tema:"chiaro", colonne:1, spunta:true, sopratitolo:"Gli alti flussi · sempre più usati nell'insufficienza respiratoria acuta", celle:[
  {t:"Lieve **pressione positiva**", key:true}, {t:"**Lavano** lo spazio morto delle vie aeree"}, {t:"Ben **tollerati**"}]},

{id:"s25", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"La sicurezza · l'ossigeno alimenta la combustione", celle:[
  {n:"✗", t:"**Fiamme**, **fumo**", key:true}, {n:"✗", t:"**Grassi** o creme oleose sui raccordi"}]},
{id:"s26", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"La sicurezza", celle:[
  {n:"!", t:"**Bombole** fissate e verificate prima dei trasporti: una bombola vuota è un evento avverso evitabile", key:true}, {n:"!", t:"La **cute** sotto occhialini e maschere: lesioni da dispositivo"}]},

{id:"s27", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"I limiti del saturimetro · domanda frequente · lettura inaffidabile", celle:[
  {n:"1", t:"**Perfusione ridotta**, estremità fredde", key:true}, {n:"2", t:"**Movimento**"}, {n:"3", t:"**Smalto**"}]},
{id:"s28", tipo:"trappola", tema:"chiaro", sopratitolo:"L'intossicazione da monossido di carbonio · lo strumento non distingue l'emoglobina legata al monossido", righe:[
  {sb:"«Satura 98: sta bene»", ok:"Saturazione **falsamente normale**"}]},
{id:"s29", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"E la saturazione non misura l'anidride carbonica", celle:[
  {n:"4", t:"**Anemia grave**: saturazione normale, ma poco ossigeno trasportato"}, {n:"5", t:"Un paziente **ipercapnico** può saturare bene", key:true}]},

{id:"s30", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"La ventilazione non invasiva · la CPAP", celle:[
  {n:"C", t:"Pressione positiva **continua**: edema polmonare acuto, apnee ostruttive del sonno", key:true}]},
{id:"s31", tipo:"confronto", tema:"chiaro", sopratitolo:"Le interfacce: maschera oronasale, facciale, casco", col:[
  {h:"CPAP", t:"pressione **continua**"}, {h:"NIV a due livelli", t:"più alta in inspirazione, più bassa in espirazione: **riacutizzazione di BPCO con acidosi ipercapnica**", key:true}]},

{id:"s32", tipo:"griglia", tema:"chiaro", colonne:1, spunta:true, sopratitolo:"L'assistenza in NIV è molto infermieristica · la maschera stretta dà senso di soffocamento", celle:[
  {t:"**Spiegare e rassicurare**: una persona agitata non si adatta", key:true}, {t:"Interfaccia della **misura giusta**, perdite contenute"}]},
{id:"s33", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"L'assistenza in NIV", celle:[
  {t:"**Protezione della cute**: il dorso del naso", key:true}, {t:"Frequenza respiratoria, saturazione, **emogas**, **coscienza**"}, {t:"Distensione gastrica, secchezza"}]},
{id:"s34", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"I segni di fallimento · si segnalano subito: può servire l'intubazione", celle:[
  {n:"!", t:"Peggioramento della **coscienza**", key:true}, {n:"!", t:"Peggioramento dell'**emogas**"}, {n:"!", t:"Peggioramento della **fatica**"}]},

{id:"s35", tipo:"griglia", tema:"chiaro", colonne:1, spunta:true, sopratitolo:"L'aerosolterapia", celle:[
  {t:"Persona **seduta**"}, {t:"**Boccaglio** preferibile alla maschera: meno farmaco su volto e occhi", key:true}, {t:"Respirazione **lenta e profonda**"}]},
{id:"s36", tipo:"frase", tema:"chiaro", sopratitolo:"Ricordi la candidosi della lezione 5.2 · e apparecchio pulito e asciutto, per non nebulizzare batteri",
  testo:"Dopo i corticosteroidi, **risciacquare la bocca**."},

{id:"s37", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"La tracheostomia · la cannula", celle:[
  {n:"1", t:"**Cuffiata** o no, **fenestrata** o no"}, {n:"2", t:"La **controcannula** interna: si pulisce o si sostituisce, per evitare l'occlusione da secrezioni", key:true}]},
{id:"s38", tipo:"cannula", tema:"chiaro", sopratitolo:"La cuffia · controllata con il manometro · troppo poco favorisce l'inalazione, troppo lede la trachea"},
{id:"s39", tipo:"griglia", tema:"chiaro", colonne:1, spunta:true, sopratitolo:"L'aria non passa più dal naso · e al letto, sempre: se la cannula esce, non c'è tempo per cercarli", celle:[
  {t:"**Umidificazione**: il naso artificiale"}, {t:"**Cannula di riserva**, anche più piccola", key:true}, {t:"**Dilatatore** e **aspiratore** funzionante"}]},

{id:"s40", tipo:"trappola", tema:"chiaro", sopratitolo:"La broncoaspirazione · ogni aspirazione irrita la mucosa e può causare ipossia", righe:[
  {sb:"Aspirare a orario", ok:"**Solo quando serve**: secrezioni udibili o visibili, desaturazione; con **preossigenazione**"}]},
{id:"s41", tipo:"cannula", tema:"chiaro", sopratitolo:"Tecnica sterile, o sistema chiuso · pressione indicativa 80–150 mmHg", modo:"aspira"},
{id:"s42", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"La broncoaspirazione · si sorvegliano saturazione e frequenza: rischio di bradicardia vagale", celle:[
  {t:"**Solo in risalita**, ruotando, mai in discesa", key:true}, {t:"Ogni passaggio **≤ 10–15 secondi**"}, {t:"**Niente fisiologica** di routine"}]},

{id:"s43", tipo:"frase", tema:"chiaro", sopratitolo:"Il caso · paziente con BPCO, saturazione 86 in aria, target 88–92",
  testo:"Quale **dispositivo**?"},
{id:"s44", tipo:"o2", tema:"chiaro", sopratitolo:"La Venturi a bassa FiO₂, 24 o 28% · in alternativa gli occhialini a basso flusso, con stretto controllo", attive:[0,3], key:[3]},
{id:"s45", tipo:"titolo", tema:"profondo",
  titolo:"La risposta sbagliata è il **reservoir** «per stare tranquilli».",
  sotto:"Poi rivaluti saturazione, coscienza ed emogas."},

{id:"s46", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"In Veneto", celle:[
  {n:"1", t:"**Terapie semi-intensive respiratorie** in cui la NIV è gestita con un ruolo infermieristico centrale", key:true}]},
{id:"s47", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"In Veneto", celle:[
  {n:"2", t:"**Ossigenoterapia domiciliare** a lungo termine, prescritta e fornita tramite il distretto"}, {n:"3", t:"I **tracheostomizzati a domicilio**: percorsi dedicati, addestramento del caregiver", key:true}]},

{id:"s48", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Ricapitoliamo · l'ossigeno è un farmaco", celle:[
  {t:"Target **94–98**, ipercapnici **88–92**", key:true}, {t:"Occhialini **1–6** litri"}, {t:"Maschera semplice **mai sotto 5**"}, {t:"Reservoir **10–15** · **Venturi**: FiO₂ precisa"}]},
{id:"s49", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Ricapitoliamo · nella prossima lezione, diabete e malattie endocrine", celle:[
  {t:"Con il **monossido** la saturazione è falsamente normale"}, {t:"Cuffia a **20–30**", key:true}, {t:"Aspirare **solo in risalita**, al massimo **10–15 secondi**"}]},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione",
  titolo:"8.3<br>Diabetologia<br>e malattie endocrine", sottotitolo:"Chetoacidosi, stato iperosmolare, educazione",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
