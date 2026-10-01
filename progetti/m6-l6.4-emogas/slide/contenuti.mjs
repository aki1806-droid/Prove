// Contenuto delle 50 scene della lezione 6.4 — l'equilibrio acido-base e
// l'emogasanalisi. Un corpo nuovo: l'ega (le tre colonne pH, PaCO₂ e HCO₃⁻
// con la fascia normale, il valore del caso come tacca e la freccia su o
// giù, la lettura sotto). I quattro passi sono un percorso che si accende,
// gli esercizi una pausa seguita dall'ega che li risolve, ROME un confronto.

const PASSI = [
 {t:"pH", d:"acidosi < 7,35 · alcalosi > 7,45"}, {t:"CO₂", d:"spiega il pH? → respiratorio"}, {t:"HCO₃⁻", d:"spiega il pH? → metabolico", key:true}, {t:"Compenso", d:"l'altro valore si muove?"},
];
const COMP = [
 {n:"1", t:"Non compensato", d:"l'altro valore è normale"}, {n:"2", t:"Parzialmente", d:"si sposta, ma il pH è alterato"}, {n:"3", t:"Completamente", d:"pH rientrato, vicino al lato del disturbo", key:true},
];
const P = (es, testo, dati) => ({tipo:"pausa", tema:"chiaro", etichetta:"metti in pausa", es, testo, dati});

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 6 · Accessi vascolari, terapia infusionale ed emocomponenti",
  titolo:"Equilibrio acido-base<br>ed emogasanalisi", sottotitolo:"6.4 · Il metodo in quattro passi e il prelievo arterioso",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"frase", tema:"chiaro", sopratitolo:"Micro-lezione 4 di 8 · una delle parti più temute del programma",
  testo:"E una delle più facili da trasformare in **punti sicuri**."},
{id:"s03", tipo:"percorso", tema:"chiaro", sopratitolo:"Non serve diventare rianimatori · un metodo in quattro passi e una manciata di valori", attive:[], tappe:PASSI},
{id:"s04", tipo:"frase", tema:"chiaro", sopratitolo:"Poi, il prelievo arterioso",
  testo:"Dal **test di Allen** alla siringa **senza bolle**."},

{id:"s05", tipo:"ega", tema:"chiaro", sopratitolo:"I valori da sapere a memoria", lettura:"pH **7,35–7,45** · PaCO₂ **35–45** mmHg · HCO₃⁻ **22–26** mEq/L"},
{id:"s06", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"I valori da sapere a memoria", celle:[
  {n:"O₂", t:"PaO₂ **80–100** mmHg in aria nell'adulto, meno nell'anziano", key:true}, {n:"Sa", t:"Saturazione **> 95%**"},
  {n:"BE", t:"Eccesso di basi **da −2 a +2**"}, {n:"Lat", t:"Lattati **< 2** mmol/L"}]},

{id:"s07", tipo:"confronto", tema:"chiaro", sopratitolo:"Il principio · due componenti, due organi, due velocità", col:[
  {h:"CO₂ · polmone", t:"Un **acido**, regolato in **minuti** con la ventilazione", key:true},
  {h:"HCO₃⁻ · rene", t:"Una **base**, regolata in **ore o giorni**"}]},
{id:"s08", tipo:"frase", tema:"chiaro", sopratitolo:"Il pH è il rapporto fra le due",
  testo:"Più CO₂, più **acido**; più bicarbonato, più **base**."},

{id:"s09", tipo:"percorso", tema:"chiaro", sopratitolo:"Il metodo · uno: guarda il pH", attive:[0], tappe:PASSI},
{id:"s10", tipo:"percorso", tema:"chiaro", sopratitolo:"Due: la CO₂ spiega il pH? Tre: il bicarbonato spiega il pH?", attive:[0,1,2], tappe:PASSI},
{id:"s11", tipo:"percorso", tema:"chiaro", sopratitolo:"Quattro: il compenso · se l'altro valore si muove, il corpo sta già lavorando", tappe:PASSI},

{id:"s12", tipo:"frase", tema:"chiaro", sopratitolo:"Un trucco mnemonico che funziona sempre",
  testo:"**ROME**: Respiratory Opposite, Metabolic Equal.",
  sotto:"Quattro lettere, e i passi due e tre si fanno a colpo d'occhio."},
{id:"s13", tipo:"confronto", tema:"chiaro", sopratitolo:"ROME", col:[
  {h:"Respiratorio · opposite", t:"pH e CO₂ in direzione **opposta**: pH ↓, CO₂ ↑", key:true},
  {h:"Metabolico · equal", t:"pH e HCO₃⁻ nella **stessa** direzione: pH ↓, HCO₃⁻ ↓"}]},

{id:"s14", tipo:"ega", tema:"chiaro", sopratitolo:"I quattro disturbi · acidosi respiratoria: la CO₂ non viene eliminata e si accumula come acido", valori:{ph:7.28, co2:58, hco3:25}, attive:[0,1], lettura:"pH ↓, CO₂ ↑ · **acidosi respiratoria**: ipoventilazione"},
{id:"s15", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Acidosi respiratoria · gli esempi", celle:[
  {n:"1", t:"**BPCO riacutizzata**", key:true}, {n:"2", t:"**Sedazione eccessiva**: oppioidi, benzodiazepine (5.6)"}, {n:"3", t:"Malattie neuromuscolari"}, {n:"4", t:"Ostruzione delle vie aeree"}]},
{id:"s16", tipo:"frase", tema:"chiaro", sopratitolo:"I segni · sonnolenza, confusione, cefalea, fino al coma ipercapnico",
  testo:"Un paziente con BPCO **sempre più sonnolento** è un'acidosi respiratoria finché non si dimostra il contrario."},

{id:"s17", tipo:"ega", tema:"chiaro", sopratitolo:"Alcalosi respiratoria · si elimina troppa CO₂, il sangue perde acido", valori:{ph:7.52, co2:28, hco3:24}, attive:[0,1], lettura:"pH ↑, CO₂ ↓ · **alcalosi respiratoria**: iperventilazione"},
{id:"s18", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Alcalosi respiratoria · esempi e segni", celle:[
  {n:"1", t:"**Ansia**, attacco di panico; dolore, febbre"}, {n:"2", t:"**Sepsi** iniziale, **embolia polmonare**", key:true}, {n:"→", t:"Formicolii intorno alla bocca e alle dita, crampi, vertigini"}]},
{id:"s19", tipo:"trappola", tema:"chiaro", sopratitolo:"Attenzione", righe:[
  {sb:"Iperventila: è ansia", ok:"La stessa alterazione si trova nella **sepsi iniziale** e nell'**embolia**"}]},

{id:"s20", tipo:"ega", tema:"chiaro", sopratitolo:"Acidosi metabolica · chetoacidosi diabetica, acidosi lattica (shock, sepsi), insufficienza renale, diarrea, intossicazioni", valori:{ph:7.25, co2:38, hco3:14}, attive:[0,2], lettura:"pH ↓, HCO₃⁻ ↓ · **acidosi metabolica**"},
{id:"s21", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"Per questo si misurano i lattati · il compenso è respiratorio", celle:[
  {n:"1", t:"Il polmone **iperventila** per eliminare CO₂"},
  {n:"2", t:"Il respiro di **Kussmaul**, profondo e frequente: vederlo significa pensare a un'acidosi metabolica", key:true}]},

{id:"s22", tipo:"ega", tema:"chiaro", sopratitolo:"Alcalosi metabolica · vomito e aspirazione gastrica da sondino (si perde acido), diuretici, ipokaliemia", valori:{ph:7.50, co2:46, hco3:34}, attive:[0,2], lettura:"pH ↑, HCO₃⁻ ↑ · **alcalosi metabolica**"},
{id:"s23", tipo:"frase", tema:"chiaro", sopratitolo:"Il compenso è una ipoventilazione, con CO₂ che sale",
  testo:"Sondino in aspirazione da giorni e **diuretico** in terapia: il candidato tipico."},

{id:"s24", tipo:"tre", tema:"chiaro", sopratitolo:"Il compenso", attive:[0,1], box:COMP},
{id:"s25", tipo:"tre", tema:"chiaro", sopratitolo:"Completamente compensato · il pH rientra, e resta vicino al limite del lato del disturbo primario", box:COMP},
{id:"s26", tipo:"titolo", tema:"profondo",
  titolo:"Il compenso **non supera mai** la correzione.",
  sotto:"Il pH non passa dall'acidosi all'alcalosi per effetto del compenso."},

{id:"s27", ...P("Esercizio 1", "pH **7,28** · PaCO₂ **58** · HCO₃⁻ **25**<br>Applica i quattro passi.", ["pH 7,28", "PaCO₂ 58", "HCO₃⁻ 25"])},
{id:"s28", tipo:"ega", tema:"chiaro", sopratitolo:"Esercizio 1 · pH basso: acidosi; CO₂ alta, opposta al pH: respiratoria; bicarbonato normale: non compensata", valori:{ph:7.28, co2:58, hco3:25}, lettura:"**Acidosi respiratoria acuta**, non compensata · per esempio un paziente sedato eccessivamente"},

{id:"s29", ...P("Esercizio 2", "pH **7,22** · PaCO₂ **26** · HCO₃⁻ **11**<br>Stessi quattro passi.", ["pH 7,22", "PaCO₂ 26", "HCO₃⁻ 11"])},
{id:"s30", tipo:"ega", tema:"chiaro", sopratitolo:"Esercizio 2 · pH basso: acidosi; bicarbonato basso, stessa direzione: metabolica; CO₂ bassa: il polmone iperventila", valori:{ph:7.22, co2:26, hco3:11}, lettura:"**Acidosi metabolica parzialmente compensata** · chetoacidosi diabetica, respiro di Kussmaul"},

{id:"s31", ...P("Esercizio 3", "pH **7,37** · PaCO₂ **60** · HCO₃⁻ **34**<br>Questo è il più difficile.", ["pH 7,37", "PaCO₂ 60", "HCO₃⁻ 34"])},
{id:"s32", tipo:"ega", tema:"chiaro", sopratitolo:"Esercizio 3 · pH normale ma vicino al lato acido; CO₂ e bicarbonato entrambi alti", valori:{ph:7.37, co2:60, hco3:34}, lettura:"Il primario è quello coerente con il lato del pH: **acidosi respiratoria**"},
{id:"s33", tipo:"frase", tema:"chiaro", sopratitolo:"Il rene ha trattenuto bicarbonato fino a compensarla completamente",
  testo:"Il quadro tipico del paziente con **BPCO cronica ipercapnica stabile**."},

{id:"s34", tipo:"figura", tema:"chiaro", sopratitolo:"Il prelievo arterioso · la sede preferita", illu:"mani",
  titolo:"L'arteria **radiale**: superficiale, con il circolo collaterale dell'ulnare.",
  sotto:"Se la radiale si chiude, la mano resta irrorata."},
{id:"s35", tipo:"percorso", tema:"chiaro", sopratitolo:"Il test di Allen modificato", tappe:[
  {t:"Comprimere", d:"radiale e ulnare insieme"}, {t:"Aprire e chiudere", d:"la mano, fino al pallore"}, {t:"Rilasciare", d:"solo l'ulnare", key:true}, {t:"Il colore ritorna?", d:"entro il tempo della procedura"}]},
{id:"s36", tipo:"confronto", tema:"chiaro", sopratitolo:"Il test di Allen", col:[
  {h:"Ritorna rapidamente", t:"Circolo collaterale **adeguato**: si punge", key:true},
  {h:"Non ritorna", t:"**Quella radiale non si punge**"}]},

{id:"s37", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"La tecnica", celle:[
  {n:"1", t:"**Siringa eparinata** dedicata; angolo di **30–45°** sulla radiale"},
  {n:"2", t:"**Bolle d'aria via subito**, e tappare: l'aria altera i gas", key:true}]},
{id:"s38", tipo:"cifre", tema:"chiaro", sopratitolo:"Dopo il prelievo · di più nel paziente anticoagulato; sulla richiesta FiO₂ e temperatura", voci:[
  {n:"5", suf:"min", d:"di compressione, almeno", key:true}, {n:"FiO₂", d:"e temperatura sulla richiesta"}]},
{id:"s39", tipo:"cifre", tema:"chiaro", sopratitolo:"Il campione · le cellule continuano a consumare ossigeno e a produrre CO₂ anche nella siringa", voci:[
  {n:"15", suf:"min", d:"indicativamente, per analizzarlo", key:true}]},
{id:"s40", tipo:"frase", tema:"chiaro", sopratitolo:"Se si è appena modificata l'ossigenoterapia",
  testo:"Si **attende che si stabilizzi**: altrimenti l'esame fotografa un momento di passaggio."},

{id:"s41", tipo:"frase", tema:"chiaro", sopratitolo:"Il caso · BPCO in ossigeno a 6 l/min con maschera semplice, sempre più sonnolento",
  testo:"Emogas: pH **7,25**, PaCO₂ **75**, HCO₃⁻ **32**."},
{id:"s42", tipo:"ega", tema:"chiaro", sopratitolo:"La lettura · il rene aveva già compensato un'ipercapnia cronica, ma la CO₂ è salita ancora", valori:{ph:7.25, co2:75, hco3:32}, lettura:"**Acidosi respiratoria parzialmente compensata** · una causa possibile: l'eccesso di ossigeno nell'ipercapnico cronico"},
{id:"s43", tipo:"percorso", tema:"chiaro", sopratitolo:"Che cosa fai", tappe:[
  {t:"Medico", d:"subito", key:true}, {t:"Ossigeno", d:"secondo prescrizione: spesso SpO₂ 88–92%"}, {t:"Coscienza", d:"sorvegliare"}, {t:"NIV", d:"preparare la possibile ventilazione non invasiva"}]},
{id:"s44", tipo:"frase", tema:"chiaro", sopratitolo:"Il caso che chiude il cerchio",
  testo:"La **sonnolenza** è il segno, l'**emogas** la conferma."},

{id:"s45", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"In Veneto", celle:[
  {n:"1", t:"**Emogasanalizzatori point-of-care** nei reparti critici e in pronto soccorso", key:true},
  {n:"2", t:"Prelievo arterioso regolato da **procedure aziendali**, con formazione e verifica della competenza"}]},
{id:"s46", tipo:"frase", tema:"chiaro", sopratitolo:"All'orale",
  testo:"Citare il **test di Allen** e la **gestione del campione** mostra precisione tecnica."},

{id:"s47", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Ricapitoliamo", celle:[
  {t:"pH **7,35–7,45** · CO₂ **35–45** · HCO₃⁻ **22–26**", key:true}, {t:"Quattro passi: **pH, CO₂, HCO₃⁻, compenso**"}]},
{id:"s48", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Ricapitoliamo", celle:[
  {t:"**ROME**: respiratorio opposto, metabolico uguale"}, {t:"**Kussmaul**: acidosi metabolica", key:true}, {t:"**Ipoventilazione**: acidosi respiratoria"}]},
{id:"s49", tipo:"frase", tema:"chiaro", sopratitolo:"Prima della radiale il test di Allen; dopo il prelievo niente bolle e compressione di almeno cinque minuti",
  testo:"Nella prossima lezione: la **nutrizione parenterale**."},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione",
  titolo:"6.5<br>Nutrizione<br>parenterale", sottotitolo:"Indicazioni, vie, sacche, complicanze",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
