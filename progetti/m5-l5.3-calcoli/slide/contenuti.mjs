// Contenuto delle 50 scene della lezione 5.3 — il calcolo delle dosi. Tre
// corpi nuovi: il calcolo (la formula che si scrive un segno per volta, il
// risultato in accento), la pausa (il glifo che si disegna e l'esercizio in
// corsivo, con i dati a pillole), le gocce (due camere di gocciolamento con
// le gocce che cadono a ritmo diverso). Illustrazioni: calcolatrice, gocciolatore.

const FORMULE = [
 {n:"1", t:"**volume** = prescritto ÷ disponibile × volume"},
 {n:"2", t:"**% × 10** = mg/ml"},
 {n:"3", t:"**ml/h** = volume ÷ ore"},
 {n:"4", t:"**gtt/min** = volume × fattore ÷ minuti", key:true},
 {n:"5", t:"**mcg/kg/min** → dose al minuto → dose all'ora → concentrazione → ml/h"},
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 5 · Farmacologia e gestione sicura della terapia",
  titolo:"Il calcolo delle dosi<br>e delle velocità di infusione", sottotitolo:"5.3 · Quattro strumenti, esercizi svolti, il tasto pausa",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"tre", tema:"chiaro", sopratitolo:"Micro-lezione 3 di 8 · la parte che spaventa di più, e ingiustamente", box:[
  {n:"1", t:"una **proporzione**", key:true}, {n:"2", t:"una **conversione** di unità"}, {n:"3", t:"la lettura di una **percentuale**"}, {n:"4", t:"una formula per le **gocce**"}]},
{id:"s03", tipo:"frase", tema:"chiaro", sopratitolo:"Quattro strumenti",
  testo:"Li vediamo **uno per uno**, con esercizi svolti."},
{id:"s04", tipo:"pausa", tema:"chiaro", sopratitolo:"Tieni carta e penna", es:"la regola del gioco",
  testo:"Quando vedi questo segno, **prova a risolvere da solo** prima di ascoltare la soluzione.",
  dati:["il video lascia qualche secondo", "il resto lo fai tu con il tasto pausa"]},

{id:"s05", tipo:"catena", tema:"chiaro", sopratitolo:"Primo strumento · le conversioni", passi:[
  {t:"1 g", d:"= 1.000 mg"}, {t:"1 mg", d:"= 1.000 mcg (µg)", key:true}, {t:"1 L", d:"= 1.000 ml"}]},
{id:"s06", tipo:"confronto", tema:"chiaro", sopratitolo:"Due unità che non si convertono in grammi · si leggono sulla confezione", col:[
  {h:"UI", t:"**Unità internazionali**: insulina, eparina", key:true}, {h:"mEq", t:"**Milliequivalenti**: gli elettroliti, come il potassio"}]},
{id:"s07", tipo:"titolo", tema:"profondo",
  titolo:"Prima di calcolare,<br>**porta tutto alla stessa unità**.",
  sotto:"La maggior parte degli errori nasce qui, non nel calcolo."},

{id:"s08", tipo:"calcolo", tema:"chiaro", sopratitolo:"Secondo strumento · la proporzione", righe:[
  {tok:["volume", "=", "dose prescritta", "÷", "dose disponibile", "×", "volume disponibile"]}]},
{id:"s09", tipo:"frase", tema:"chiaro", sopratitolo:"Quello che mi serve, quello che ho, e in quanto liquido si trova",
  testo:"Tre numeri, e **il quarto viene da solo**.",
  sotto:"È la stessa proporzione in tutti gli esercizi che seguono."},

{id:"s10", tipo:"pausa", tema:"chiaro", sopratitolo:"Esercizio 1", es:"esercizio 1",
  testo:"Prescritti **75 mg**. Disponibile una fiala da **100 mg in 2 ml**. Quanti ml aspiri?",
  dati:["75 mg prescritti", "100 mg / 2 ml"]},
{id:"s11", tipo:"calcolo", tema:"chiaro", sopratitolo:"Soluzione · 1", righe:[
  {tok:["75", "÷", "100", "×", "2 ml", "=", "1,5 ml"], nota:"Buon senso: mi servono **tre quarti** della fiala, e tre quarti di 2 ml sono 1,5. Torna."}]},

{id:"s12", tipo:"pausa", tema:"chiaro", sopratitolo:"Esercizio 2 · con una trappola", es:"esercizio 2",
  testo:"Prescritti **500 mcg**. Disponibile una fiala da **1 mg in 2 ml**.",
  dati:["500 mcg prescritti", "1 mg / 2 ml"]},
{id:"s13", tipo:"calcolo", tema:"chiaro", sopratitolo:"Soluzione · 2: prima si uniforma, poi la proporzione", righe:[
  {tok:["1 mg", "=", "1.000 mcg"]}, {tok:["500", "÷", "1.000", "×", "2 ml", "=", "1 ml"]}]},
{id:"s14", tipo:"titolo", tema:"profondo",
  titolo:"Chi dimentica la conversione<br>sbaglia di **mille volte**.",
  sotto:"Ed è esattamente l'errore che uccide."},

{id:"s15", tipo:"frase", tema:"chiaro", sopratitolo:"Terzo strumento · le percentuali",
  testo:"Per cento **peso su volume**: i grammi contenuti in **100 ml**."},
{id:"s16", tipo:"tre", tema:"chiaro", cifre:true, sopratitolo:"Le due soluzioni di ogni giorno", box:[
  {n:"0,9 %", t:"fisiologica", d:"0,9 g in 100 ml = 9 g/L"}, {n:"5 %", t:"glucosata", d:"5 g in 100 ml = 50 g/L", key:true}]},
{id:"s17", tipo:"calcolo", tema:"chiaro", sopratitolo:"Un trucco utilissimo", righe:[
  {tok:["%", "×", "10", "=", "mg/ml"], nota:"Una soluzione al **2 %** contiene **20 mg/ml**."}]},

{id:"s18", tipo:"pausa", tema:"chiaro", sopratitolo:"Esercizio 3", es:"esercizio 3",
  testo:"Prescritti **60 mg** di lidocaina. Disponibile al **2 %**.",
  dati:["60 mg prescritti", "lidocaina 2 %"]},
{id:"s19", tipo:"calcolo", tema:"chiaro", sopratitolo:"Soluzione · 3: con il trucco si fa a mente", righe:[
  {tok:["2 %", "=", "20 mg/ml"]}, {tok:["60", "÷", "20", "=", "3 ml"]}]},

{id:"s20", tipo:"pausa", tema:"chiaro", sopratitolo:"Un caso frequentissimo · la polvere da ricostituire", es:"esercizio",
  testo:"Flacone da **1 g** di polvere, da ricostituire con **10 ml**. Prescritti **750 mg**.",
  dati:["1 g in polvere", "10 ml di solvente", "750 mg prescritti"]},
{id:"s21", tipo:"calcolo", tema:"chiaro", sopratitolo:"Soluzione · dopo la ricostituzione", righe:[
  {tok:["1.000 mg", "in", "10 ml", "=", "100 mg/ml"]}, {tok:["750", "÷", "100", "=", "7,5 ml"]}]},
{id:"s22", tipo:"trappola", tema:"chiaro", sopratitolo:"Attenzione", righe:[
  {sb:"10 ml di solvente = 10 ml finali", ok:"Alcune polveri **aumentano il volume**: se la scheda tecnica indica un volume finale diverso, si usa quello"}]},

{id:"s23", tipo:"pausa", tema:"chiaro", sopratitolo:"Le unità internazionali", es:"esercizio",
  testo:"Eparina **25.000 UI in 50 ml**. Prescritte **1.000 UI all'ora**. A quanti ml/h imposti la pompa?",
  dati:["25.000 UI / 50 ml", "1.000 UI/h"]},
{id:"s24", tipo:"calcolo", tema:"chiaro", sopratitolo:"Soluzione · prima la concentrazione, poi la velocità", righe:[
  {tok:["25.000", "÷", "50", "=", "500 UI/ml"]}, {tok:["1.000", "÷", "500", "=", "2 ml/h"]}]},
{id:"s25", tipo:"catena", tema:"chiaro", sopratitolo:"Lo schema di tutte le infusioni continue · due passaggi, sempre nello stesso ordine", passi:[
  {t:"Concentrazione", d:"quanto farmaco in un millilitro", key:true}, {t:"Velocità", d:"quanti millilitri all'ora"}]},

{id:"s26", tipo:"figura", tema:"chiaro", sopratitolo:"L'insulina · regole sue", illu:"siringa",
  titolo:"**100 unità per millilitro**: siringhe graduate in unità, o le penne.",
  sotto:"Non si converte in millilitri."},
{id:"s27", tipo:"trappola", tema:"chiaro", sopratitolo:"Un dettaglio di sicurezza · nella prescrizione", righe:[
  {sb:"10 U", ok:"Una U scritta male si legge come uno zero: **100**, dieci volte la dose. Si scrive per esteso: **unità**"}]},

{id:"s28", tipo:"calcolo", tema:"chiaro", sopratitolo:"Quarto strumento · la velocità di infusione, per le pompe", righe:[
  {tok:["ml/h", "=", "volume", "÷", "ore"]}, {tok:["1.000 ml", "in", "8 h", "=", "125 ml/h"]}]},
{id:"s29", tipo:"calcolo", tema:"chiaro", sopratitolo:"Attenzione ai minuti · il tempo va sempre in ore", righe:[
  {tok:["250 ml", "in", "30 min", "=", "250 in ½ h", "=", "500 ml/h"]}]},

{id:"s30", tipo:"calcolo", tema:"chiaro", sopratitolo:"Le gocce al minuto · per le infusioni a caduta", righe:[
  {tok:["gtt/min", "=", "volume", "×", "fattore", "÷", "minuti"], nota:"L'**unico** calcolo in cui si usano i minuti: la trappola più frequente."}]},
{id:"s31", tipo:"gocce", tema:"chiaro", sopratitolo:"Il fattore di gocciolamento · quante gocce fanno un millilitro: è scritto sul deflussore"},

{id:"s32", tipo:"pausa", tema:"chiaro", sopratitolo:"Esercizio 4", es:"esercizio 4",
  testo:"**1.000 ml** di fisiologica in **8 ore**, deflussore da **20 gtt/ml**. Quante gocce al minuto?",
  dati:["1.000 ml", "8 ore", "20 gtt/ml"]},
{id:"s33", tipo:"calcolo", tema:"chiaro", sopratitolo:"Soluzione · 4: le gocce sono intere, si arrotonda", righe:[
  {tok:["8 h", "=", "480 min"]}, {tok:["1.000", "×", "20", "=", "20.000 gtt"]}, {tok:["20.000", "÷", "480", "=", "41,6 → 42 gtt/min"]}]},

{id:"s34", tipo:"confronto", tema:"chiaro", sopratitolo:"Due scorciatoie · fanno risparmiare tempo in sede d'esame", col:[
  {h:"Microgocciolatore 60", t:"gtt/min **= ml/h**: 30 ml/h sono 30 gocce al minuto", key:true},
  {h:"Deflussore 20", t:"gtt/min **= ml/h ÷ 3**: 125 ml/h diventano circa 42 gocce"}]},
{id:"s35", tipo:"calcolo", tema:"chiaro", sopratitolo:"Rifai l'esercizio precedente così", righe:[
  {tok:["125 ml/h", "÷", "3", "=", "41,6 → 42 gtt/min"], nota:"E vedrai che torna."}]},

{id:"s36", tipo:"pausa", tema:"chiaro", sopratitolo:"Il calcolo per chilo di peso · tipico della pediatria", es:"esercizio",
  testo:"Paracetamolo **15 mg/kg** a un bambino di **12 kg**. Sciroppo da **120 mg in 5 ml**. Quanti ml?",
  dati:["15 mg/kg", "12 kg", "120 mg / 5 ml"]},
{id:"s37", tipo:"calcolo", tema:"chiaro", sopratitolo:"Soluzione · due passaggi: prima la dose, poi il volume", righe:[
  {tok:["15", "×", "12", "=", "180 mg"]}, {tok:["180", "÷", "120", "×", "5 ml", "=", "7,5 ml"]}]},

{id:"s38", tipo:"pausa", tema:"chiaro", sopratitolo:"Il calcolo più lungo · microgrammi per chilo per minuto, tipico dell'area critica", es:"esercizio",
  testo:"Dopamina **5 mcg/kg/min**, paziente di **70 kg**, soluzione **200 mg in 50 ml**. A quanti ml/h?",
  dati:["5 mcg/kg/min", "70 kg", "200 mg / 50 ml"]},
{id:"s39", tipo:"calcolo", tema:"chiaro", sopratitolo:"Soluzione · passo uno, la dose al minuto; passo due, all'ora", righe:[
  {tok:["5", "×", "70", "=", "350 mcg/min"]}, {tok:["350", "×", "60", "=", "21.000 mcg/h", "=", "21 mg/h"]}]},
{id:"s40", tipo:"calcolo", tema:"chiaro", sopratitolo:"Soluzione · passo tre, la concentrazione; passo quattro, la velocità", righe:[
  {tok:["200", "÷", "50", "=", "4 mg/ml"]}, {tok:["21", "÷", "4", "=", "5,25 ml/h"]}]},
{id:"s41", tipo:"percorso", tema:"chiaro", sopratitolo:"Quattro passi, sempre gli stessi · scritti in colonna, il calcolo più temuto diventa una lista", tappe:[
  {t:"Dose al minuto", d:"mcg/kg/min × kg"}, {t:"Dose all'ora", d:"× 60"}, {t:"Concentrazione", d:"mg ÷ ml", key:true}, {t:"Velocità", d:"ml/h"}]},

{id:"s42", tipo:"calcolo", tema:"chiaro", sopratitolo:"La domanda inversa · quanto dura un'infusione?", righe:[
  {tok:["ore", "=", "volume", "÷", "ml/h"]}, {tok:["250 ml", "÷", "50 ml/h", "=", "5 h", "→", "dalle 9 alle 14"]}]},
{id:"s43", tipo:"frase", tema:"chiaro", sopratitolo:"Sembra banale",
  testo:"Serve a programmare il **cambio della sacca**, e a evitare che una via resti senza infusione.",
  sotto:"O che un farmaco finisca prima del previsto."},

{id:"s44", tipo:"trappola", tema:"chiaro", sopratitolo:"La regola più importante · il controllo di buon senso: ha senso?", righe:[
  {sb:"Il risultato richiede dieci fiale", ok:"Quasi certamente un errore **di unità o di virgola**"},
  {sb:"Una frazione minuscola di fiala", ok:"**Ricontrolla**"}]},
{id:"s45", tipo:"frase", tema:"chiaro", sopratitolo:"Per i farmaci ad alto rischio, e in caso di dubbio · la lezione 2.6",
  testo:"**Doppio controllo indipendente.** Nessuno si offende se un collega ricontrolla un calcolo."},

{id:"s46", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, attive:[0,1,2], sopratitolo:"Le cinque formule da portare all'esame", celle:FORMULE},
{id:"s47", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"Le cinque formule · questa slide è da fotografare", celle:FORMULE},

{id:"s48", tipo:"frase", tema:"chiaro", sopratitolo:"Una frase da portare via",
  testo:"Prima **uniformare le unità**, poi **calcolare**, poi chiedersi **se ha senso**.",
  sotto:"Nel riepilogo del modulo: venti calcoli cronometrati, con il tempo contato come all'esame."},
{id:"s49", tipo:"frase", tema:"chiaro", sopratitolo:"Prossima lezione",
  testo:"La **somministrazione sicura**: le regole delle G, il doppio controllo, gli errori che non si devono fare."},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione",
  titolo:"5.4<br>La somministrazione sicura", sottotitolo:"Le regole delle G, il doppio controllo, gli errori che non si devono fare",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
