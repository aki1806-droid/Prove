// Contenuto delle 50 scene della lezione 8.8 — riepilogo del modulo 8 e
// autovalutazione. Nessun corpo nuovo: tornano i corpi del modulo come
// rimandi (l'ecg, l'o2, il potassio, la fistola, l'asterixis, la fast, il
// cranio, le soglie), e per ogni apparato una griglia «segno → azione».
// Le otto domande sono quattro pause con la risposta secca.

const P = (sopratitolo, testo, dati) => ({tipo:"pausa", tema:"chiaro", etichetta:"risposta secca", es:sopratitolo, testo: testo.replace(/\n/g, "<br>"), dati});

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 8 · Assistenza in area medica",
  titolo:"Riepilogo del modulo 8<br>e autovalutazione", sottotitolo:"8.8 · I segni d'allarme, apparato per apparato",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"frase", tema:"chiaro", sopratitolo:"Micro-lezione 8 di 8 · il modulo più ampio dal punto di vista clinico",
  testo:"Un riepilogo organizzato nel modo che ti servirà nella **prova pratica**."},
{id:"s03", tipo:"percorso", tema:"chiaro", sopratitolo:"Per ogni apparato: i segni d'allarme e che cosa fare subito · lo schema dell'infermiere esperto quando entra in una stanza · e alla fine otto domande", tappe:[
  {t:"Guarda"}, {t:"Riconosce", key:true}, {t:"Agisce"}]},

{id:"s04", tipo:"frase", tema:"chiaro", sopratitolo:"Il principio che tiene insieme tutto il modulo",
  testo:"**Riconoscere precocemente il deterioramento.**"},
{id:"s05", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Gli strumenti li conosci", celle:[
  {n:"2.3", t:"I sistemi di allerta: la **NEWS2**", key:true}, {n:"2.7", t:"La comunicazione strutturata **SBAR**"}]},
{id:"s06", tipo:"ecg", tema:"chiaro", sopratitolo:"E una regola · il monitor dice un numero, il paziente dice se quel numero è vero", ritmo:"pea", titolo:"Si guarda il paziente, non solo il monitor", sotto:"un tracciato organizzato, e nessun polso"},

{id:"s07", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"Cuore · anche atipico in donne, anziani e diabetici", celle:[
  {n:"→", t:"**Dolore toracico** → ECG entro **10 minuti**", key:true}, {n:"→", t:"**Aumento rapido di peso**, 1,5–2 kg in 2–3 giorni, dispnea, ortopnea → scompenso"}]},
{id:"s08", tipo:"confronto", tema:"chiaro", sopratitolo:"Sul monitor", col:[
  {h:"Fibrillazione ventricolare", t:"si **defibrilla**", key:true}, {h:"Asistolia, PEA", t:"**no**"}]},
{id:"s09", tipo:"ecg", tema:"chiaro", sopratitolo:"E la fibrillazione atriale · il filo che lega la prima lezione del modulo alla sesta", ritmo:"fa", key:true, titolo:"Fibrillazione atriale", sotto:"irregolare, senza onde P: rischio di ictus"},

{id:"s10", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"Polmone", celle:[
  {n:"→", t:"**Dispnea improvvisa** con desaturazione e tachicardia → embolia polmonare, spesso da una TVP", key:true}, {n:"→", t:"**Asmatico silenzioso**, che non riesce a parlare → attacco grave"}]},
{id:"s11", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"Polmone", celle:[
  {n:"→", t:"**BPCO sempre più sonnolento** in ossigeno → ipercapnia, target **88–92**", key:true}, {n:"→", t:"**Monossido di carbonio** → saturazione falsamente normale"}]},
{id:"s12", tipo:"o2", tema:"chiaro", sopratitolo:"E la regola che vale da sola molte domande · l'ossigeno è un farmaco: prescrizione, dose, obiettivo di saturazione"},

{id:"s13", tipo:"trappola", tema:"chiaro", sopratitolo:"Metabolismo · l'ipoglicemia si corregge in un minuto e uccide se non riconosciuta", righe:[
  {sb:"Confusione, sudorazione, tremore: «sarà agitato»", ok:"**Glicemia subito**"}]},
{id:"s14", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"Metabolismo", celle:[
  {n:"→", t:"**Kussmaul** e alito fruttato → chetoacidosi, attenzione al **potassio**", key:true}, {n:"→", t:"Anziano disidratato e confuso, glicemia **> 600** → stato iperosmolare"}, {n:"→", t:"**Corticosteroidi sospesi** e ipotensione → crisi surrenalica"}]},

{id:"s15", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"Rene · spesso l'anuria si risolve sbloccando un catetere", celle:[
  {n:"→", t:"**Oliguria** → prima **catetere** e **globo**", key:true}, {n:"→", t:"**Fremito della fistola assente** → possibile trombosi, si avvisa subito"}]},
{id:"s16", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"Rene", celle:[
  {n:"→", t:"**Liquido di dialisi peritoneale torbido** → peritonite", key:true}, {n:"→", t:"**Potassio alto** → ECG, e verificare l'emolisi del campione"}]},
{id:"s17", tipo:"cifre", tema:"chiaro", sopratitolo:"E la diuresi oraria · il numero che dice per primo se il rene sta cedendo", voci:[
  {n:"0,5", suf:"ml/kg/h", d:"sotto, per 6 ore: insufficienza renale acuta", key:true}]},

{id:"s18", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"Apparato digerente", celle:[
  {n:"→", t:"**Ematemesi, melena**, tachicardia e ipotensione → emorragia digestiva: l'emoglobina scende **in ritardo**", key:true}]},
{id:"s19", tipo:"asterixis", tema:"chiaro", sopratitolo:"Cirrotico confuso con asterixis → encefalopatia · dolore epigastrico a barra verso il dorso → pancreatite", voci:["Stipsi", "Sanguinamento", "Sedativi"], testa:"Si cercano"},
{id:"s20", tipo:"frase", tema:"chiaro", sopratitolo:"E dopo la gastroscopia con l'anestetico in gola · la regola della disfagia, che qui vale per un'ora",
  testo:"Niente per bocca finché non torna il **riflesso della deglutizione**."},

{id:"s21", tipo:"fast", tema:"chiaro", sopratitolo:"Sistema nervoso · FAST positiva: si annota l'ora, si controlla la glicemia, si attiva il percorso stroke"},
{id:"s22", tipo:"cranio", tema:"chiaro", sopratitolo:"Anisocoria nuova, cefalea, vomito, calo della coscienza → ipertensione endocranica · crisi oltre 5 minuti → stato di male", massa:90, titolo:"Cushing: segno tardivo", voci:["**Ipertensione**", "**Bradicardia**", "**Respiro irregolare**"]},

{id:"s23", tipo:"soglie", tema:"chiaro", sopratitolo:"Oncologia · febbre in chemioterapia, soprattutto al nadir, 7–14 giorni dopo il ciclo"},
{id:"s24", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"Oncologia", celle:[
  {n:"→", t:"**Dolore dorsale** e debolezza delle gambe → compressione midollare", key:true}, {n:"→", t:"**Petecchie** e gengive che sanguinano → piastrinopenia"}]},
{id:"s25", tipo:"frase", tema:"chiaro", sopratitolo:"Sette apparati, un elenco di segni",
  testo:"È la tabella che la lezione ti chiede di costruire, e che la prova pratica ti chiederà di sapere **a memoria**."},

{id:"s26", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"I numeri", celle:[
  {n:"I–IV", t:"**NYHA**"}, {n:"10", t:"**minuti**: l'ECG", key:true}, {n:"94–98", t:"**%** il target di saturazione"}, {n:"88–92", t:"**%** negli ipercapnici"}]},
{id:"s27", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"I numeri · Venturi quando serve precisione", celle:[
  {n:"1–6", t:"**litri**: occhialini"}, {n:"≥ 5", t:"**litri**: maschera semplice", key:true}, {n:"10–15", t:"**litri**: reservoir"}]},
{id:"s28", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"I numeri", celle:[
  {n:"20–30", t:"**cmH₂O** la cuffia"}, {n:"10–15", t:"**secondi** l'aspirazione"}, {n:"6,5", t:"**%** la glicata", key:true}, {n:"140–180", t:"**mg/dl** il target in reparto"}]},
{id:"s29", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"I numeri", celle:[
  {n:"4,5", t:"**ore**: la trombolisi", key:true}, {n:"185/110", t:"prima · **180/105** dopo"}, {n:"500", t:"**neutrofili**"}, {n:"50.000", t:"**piastrine**"}]},
{id:"s30", tipo:"frase", tema:"chiaro", sopratitolo:"Sono quindici numeri · la prova pratica li pretende senza esitazione",
  testo:"Fermati, **copiali nel quaderno**, e riparti: il quiz li chiede tutti."},

{id:"s31", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Le confusioni", celle:[
  {n:"1", t:"L'ossigeno: **più non è sempre meglio**", key:true}, {n:"2", t:"**Venturi**: FiO₂ precisa"}, {n:"3", t:"**Chetoacidosi** e **stato iperosmolare** non sono la stessa cosa"}, {n:"4", t:"**Colica**: agitato · **peritonite**: immobile"}]},
{id:"s32", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Le confusioni · otto punti che si perdono in un attimo", celle:[
  {n:"5", t:"Braccio con fistola: **niente pressione**", key:true}, {n:"6", t:"Lock del catetere da dialisi: **aspirare**"}, {n:"7", t:"Nella crisi epilettica: **niente in bocca**"}, {n:"8", t:"**Levodopa**: puntuale"}]},

{id:"s33", ...P("Domande 1 e 2", "**1** · Donna anziana diabetica, dolore epigastrico e sudorazione: che cosa fai per primo?\n**2** · Paziente con BPCO: quale target di saturazione?", ["dolore atipico", "BPCO"])},
{id:"s34", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Le risposte", celle:[
  {n:"1", t:"**ECG entro 10 minuti**: presentazione atipica finché non si dimostra il contrario", key:true}, {n:"2", t:"**88–92**"}]},
{id:"s35", ...P("Domande 3 e 4", "**3** · Kussmaul e alito fruttato in un giovane con diabete di tipo 1: che cosa pensi?\n**4** · Il fremito della fistola è scomparso: che cosa fai?", ["Kussmaul", "fremito"])},
{id:"s36", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Le risposte", celle:[
  {n:"3", t:"**Chetoacidosi**, con attenzione al **potassio**", key:true}, {n:"4", t:"**Avvisi subito**: possibile trombosi"}]},
{id:"s37", ...P("Domande 5 e 6", "**5** · Cirrotico confuso con stipsi da tre giorni: che cosa cerchi?\n**6** · Un braccio che cade e il linguaggio impastato: che cosa annoti per primo?", ["cirrotico", "FAST"])},
{id:"s38", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Le risposte", celle:[
  {n:"5", t:"Il **fattore scatenante**: la stipsi, e un eventuale sedativo"}, {n:"6", t:"L'**ultima volta visto in benessere**, e si attiva il percorso stroke", key:true}]},
{id:"s39", ...P("Domande 7 e 8", "**7** · Febbre a 38,4 dieci giorni dopo la chemioterapia: che cosa fai?\n**8** · Pressione alta e polso lento in un paziente neurologico: che cosa significa?", ["nadir", "Cushing"])},
{id:"s40", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Le risposte · otto su otto è il livello atteso", celle:[
  {n:"7", t:"**Emocolture e antibiotico entro 60 minuti**: neutropenia febbrile finché non si dimostra il contrario", key:true}, {n:"8", t:"**Triade di Cushing**: un allarme di erniazione"}]},

{id:"s41", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"I fili con gli altri moduli", celle:[
  {n:"6.4", t:"L'**ossigeno** e l'**emogas**", key:true}, {n:"5.5", t:"Farmaci cardiovascolari, **insuline**, **anticoagulanti**"}, {n:"3.3", t:"La **disfagia**"}]},
{id:"s42", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"I fili · all'orale, collegare dimostra padronanza", celle:[
  {n:"5.7", t:"Gli **antiblastici**"}, {n:"4.3", t:"L'**isolamento protettivo**", key:true}, {n:"6.7", t:"Le **emocolture**"}]},

{id:"s43", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"Gli agganci veneti del modulo", celle:[
  {n:"1", t:"La **rete STEMI**, con l'ECG teletrasmesso dal 118", key:true}, {n:"2", t:"La **rete ictus**, con centri hub e spoke"}, {n:"3", t:"La **Rete Oncologica Veneta**"}]},
{id:"s44", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"Tutte reti: la parola chiave del sistema veneto, che approfondiremo nel modulo 13", celle:[
  {n:"4", t:"La **gestione integrata** del diabete"}, {n:"5", t:"La **rete nefrologica** e la dialisi domiciliare", key:true}, {n:"6", t:"Gli **screening** oncologici regionali"}]},

{id:"s45", tipo:"cifre", tema:"chiaro", sopratitolo:"Come proseguire · e la tabella personale: per ogni apparato, segno d'allarme e azione, su un foglio solo", voci:[
  {n:"30", d:"domande del test del modulo", key:true}, {n:"21", d:"la soglia"}]},
{id:"s46", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Due casi con lo schema in cinque passi · fra le tracce più probabili della prova pratica", celle:[
  {t:"Il **dolore toracico atipico**", key:true}, {t:"Il **sospetto ictus**"}]},

{id:"s47", tipo:"titolo", tema:"profondo",
  titolo:"Riconoscere **presto**, comunicare **chiaro**, agire **nel tempo giusto**.",
  sotto:"Il tempo è muscolo nell'infarto, è cervello nell'ictus, è vita nella neutropenia febbrile."},

{id:"s48", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Nel prossimo modulo · l'area chirurgica · otto lezioni, come sempre", celle:[
  {n:"1", t:"La **preparazione** all'intervento"}, {n:"2", t:"La **sala operatoria**", key:true}, {n:"3", t:"Il **risveglio**"}, {n:"4", t:"Il **decorso post-operatorio**"}]},
{id:"s49", tipo:"frase", tema:"chiaro", sopratitolo:"Ci vediamo lì · dal bundle delle infezioni del sito chirurgico alla gestione del dolore",
  testo:"Molte cose già viste, applicate al **percorso del paziente chirurgico**."},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossimo modulo",
  titolo:"Modulo 9<br>Assistenza perioperatoria<br>e area chirurgica", sottotitolo:"Prima, durante e dopo l'intervento",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
