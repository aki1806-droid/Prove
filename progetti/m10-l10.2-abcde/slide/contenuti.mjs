// Contenuto delle 50 scene della lezione 10.2 — la valutazione del
// paziente critico: ABCDE. Nessun corpo nuovo: le cinque lettere sono una
// scala che si accende lettera per lettera, ogni lettera ha i suoi segni e
// i suoi interventi in griglia, AVPU è una scala, la NEWS2 una tabella.

const ABCDE = (k) => [
  {n:"A", t:"Airway · vie aeree", key:k===0}, {n:"B", t:"Breathing · respiro", key:k===1},
  {n:"C", t:"Circulation · circolo", key:k===2}, {n:"D", t:"Disability · neurologico", key:k===3},
  {n:"E", t:"Exposure · esposizione", key:k===4}];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 10 · Emergenza e area critica",
  titolo:"La valutazione del<br>paziente critico: ABCDE", sottotitolo:"10.2 · Le cinque lettere, AVPU, AMPIA, NEWS2, risposta rapida",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"trappola", tema:"chiaro", sopratitolo:"Micro-lezione 2 di 8 · davanti a un paziente che sta male", righe:[
  {sb:"Cercare subito la diagnosi", ok:"Prima i problemi che **uccidono più in fretta**, nell'ordine in cui uccidono"}]},
{id:"s03", tipo:"frase", tema:"chiaro", sopratitolo:"Qualunque paziente critico, in qualunque contesto · il più chiesto all'orale",
  testo:"Una **struttura** quando l'ansia rischia di toglierla."},

{id:"s04", tipo:"scala", tema:"chiaro", sopratitolo:"Cinque lettere", gradini:ABCDE(-1)},
{id:"s05", tipo:"frase", tema:"chiaro", sopratitolo:"La regola che fa la differenza",
  testo:"Tratta ciò che trovi **prima di passare al punto successivo**."},
{id:"s06", tipo:"titolo", tema:"profondo",
  titolo:"Tratta ciò che trovi,<br>**prima di passare oltre**.",
  sotto:""},
{id:"s07", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"Vie aeree ostruite: non si misura la pressione, si liberano le vie aeree", celle:[
  {t:"**Tratta** ciò che trovi", key:true}, {t:"Dopo ogni intervento, **rivaluta**"}, {t:"**Chiama aiuto presto**, non quando hai finito"}]},

{id:"s08", tipo:"scala", tema:"chiaro", sopratitolo:"A · la prima domanda: il paziente parla? · se risponde normalmente, le vie aeree sono pervie", gradini:ABCDE(0)},
{id:"s09", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"A · i segni di ostruzione", celle:[
  {n:"1", t:"**Russamento**"}, {n:"2", t:"**Gorgoglio**: liquidi"}, {n:"3", t:"**Stridore**: ostruzione alta", key:true}, {n:"4", t:"**Rientramenti**"}, {n:"5", t:"Movimento **paradosso**"}]},
{id:"s10", tipo:"confronto", tema:"chiaro", sopratitolo:"A · aprire le vie aeree", col:[
  {h:"Di regola", t:"**iperestensione del capo** e sollevamento del mento"}, {h:"Nel trauma", t:"**sublussazione della mandibola**: non si muove il rachide", key:true}]},
{id:"s11", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"A · un'ostruzione uccide in pochi minuti: per questo viene prima di tutto", celle:[
  {t:"**Aspirare**"}, {t:"**Cannula**, posizione laterale"}, {t:"**Ossigeno**, aiuto esperto", key:true}]},

{id:"s12", tipo:"scala", tema:"chiaro", sopratitolo:"B · la frequenza respiratoria: il parametro più sensibile, e il più dimenticato · contata per un minuto, non stimata", gradini:ABCDE(1)},
{id:"s13", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"B · che cosa si guarda", celle:[
  {t:"**Saturazione**"}, {t:"**Lavoro respiratorio**: accessori, rientramenti, frasi complete", key:true}, {t:"**Simmetria** e auscultazione"}, {t:"**Colorito**"}]},
{id:"s14", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"B · gli interventi", celle:[
  {t:"Posizione **seduta**"}, {t:"**Ossigeno** secondo target: lezione 8.2", key:true}, {t:"**Broncodilatatori**"}, {t:"Se serve, **ventilazione assistita**"}]},
{id:"s15", tipo:"frase", tema:"chiaro", sopratitolo:"Prima ancora del saturimetro",
  testo:"Chi non riesce a **finire una frase** senza fermarsi a respirare ti sta dicendo quanto è grave."},

{id:"s16", tipo:"scala", tema:"chiaro", sopratitolo:"C · frequenza e ritmo, pressione, riempimento capillare: 5 secondi sul polpastrello o sullo sterno", gradini:ABCDE(2)},
{id:"s17", tipo:"cifre", tema:"chiaro", sopratitolo:"Il riempimento capillare · una cute fredda e marezzata è un circolo che si sta chiudendo", voci:[
  {n:"< 2", suf:"secondi", d:"normale", key:true}]},
{id:"s18", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"C · gli interventi · emorragie visibili, diuresi, giugulari", celle:[
  {t:"**Due accessi venosi** di buon calibro, prelievi", key:true}, {t:"**Liquidi** secondo prescrizione"}, {t:"**Compressione** delle emorragie"}, {t:"**ECG** e monitoraggio continuo"}]},

{id:"s19", tipo:"scala", tema:"chiaro", sopratitolo:"D · una valutazione rapida: AVPU", gradini:[
  {n:"A", t:"Alert · sveglio"}, {n:"V", t:"Voice · risponde alla voce"}, {n:"P", t:"Pain · risponde solo al dolore", key:true}, {n:"U", t:"Unresponsive · non risponde"}]},
{id:"s20", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"D · oppure la GCS della lezione 2.3 · un'ipoglicemia simula qualsiasi quadro neurologico, e si corregge in un minuto", celle:[
  {n:"1", t:"**GCS**"}, {n:"2", t:"**Pupille**"}, {n:"!", t:"**Glicemia, sempre**", key:true}]},
{id:"s21", tipo:"frase", tema:"chiaro", sopratitolo:"Segni di lato, dolore, e i farmaci che alterano la coscienza",
  testo:"Sonnolento, con le **pupille a punta di spillo**: si pensa subito all'**oppioide**."},

{id:"s22", tipo:"scala", tema:"chiaro", sopratitolo:"E · si scopre il paziente per esaminarlo completamente, nel rispetto della dignità", gradini:ABCDE(4)},
{id:"s23", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"E · che cosa si cerca · una porpora che non sbianca può indicare una meningite", celle:[
  {t:"Emorragie **nascoste**", key:true}, {t:"Lesioni, **eruzioni**, edemi"}, {t:"Accessi, drenaggi, **temperatura**"}]},
{id:"s24", tipo:"trappola", tema:"chiaro", sopratitolo:"E poi si ricopre · l'ipotermia peggiora la coagulazione, il ritmo, la risposta ai farmaci", righe:[
  {sb:"Lasciare scoperto il paziente critico", ok:"**Ricoprire** subito dopo"}]},

{id:"s25", tipo:"frase", tema:"chiaro", sopratitolo:"Solo dopo aver stabilizzato le funzioni vitali",
  testo:"La **valutazione secondaria**: esame testa-piedi e anamnesi rapida."},
{id:"s26", tipo:"scala", tema:"chiaro", sopratitolo:"Lo schema AMPIA · in inglese SAMPLE · poi documentazione e consegna SBAR", gradini:[
  {n:"A", t:"Allergie"}, {n:"M", t:"Medicamenti"}, {n:"P", t:"Patologie"}, {n:"I", t:"Ultimo Introito di cibo", key:true}, {n:"A", t:"Ambiente ed evento"}]},

{id:"s27", tipo:"frase", tema:"chiaro", sopratitolo:"In reparto · lezione 2.3",
  testo:"Il deterioramento si intercetta prima con i punteggi di **allerta precoce**: la **NEWS2**."},
{id:"s28", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"I sette elementi della NEWS2 · la saturazione ha una scala dedicata per gli ipercapnici", celle:[
  {n:"1", t:"**Frequenza respiratoria**", key:true}, {n:"2", t:"**Saturazione**"}, {n:"3", t:"**Ossigenoterapia**"}, {n:"4", t:"**Pressione** sistolica"}, {n:"5", t:"**Frequenza** cardiaca"}]},
{id:"s29", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"I sette elementi · due minuti al letto, senza strumenti speciali", celle:[
  {n:"6", t:"**Coscienza**, compresa la **confusione di nuova insorgenza**", key:true}, {n:"7", t:"**Temperatura**"}]},
{id:"s30", tipo:"tabella", tema:"chiaro", sopratitolo:"Dal punteggio alla risposta", intestazioni:["NEWS2","Rischio","Risposta"], colonne:[1,1,2], righe:[
  ["0-4","basso","monitoraggio di reparto"],
  ["**3** in un parametro","basso-medio","valutazione **urgente**"],
  ["5-6","medio","risposta **urgente**"],
  ["≥ 7","alto","risposta d'**emergenza**"]]},

{id:"s31", tipo:"norma", tema:"chiaro", etichetta:"Al punteggio corrisponde una risposta · criteri definiti", sigla:"MET · RRT",
  testo:"I **team di risposta rapida**."},
{id:"s32", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"Quando si attivano", celle:[
  {t:"Punteggio di allerta **elevato**"}, {t:"Un **singolo parametro** critico"}, {t:"La **preoccupazione dell'infermiere**, anche con numeri accettabili", key:true}]},
{id:"s33", tipo:"frase", tema:"chiaro", sopratitolo:"Lo scopo: intervenire prima dell'arresto · segni scritti in cartella e non letti insieme",
  testo:"La maggior parte degli arresti in reparto è preceduta da **ore** di segni di deterioramento."},

{id:"s34", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"Il monitoraggio multiparametrico · allarmi su soglie adatte al paziente, mai disattivati", celle:[
  {t:"**ECG**, saturazione"}, {t:"**Pressione**, frequenza respiratoria"}, {t:"Temperatura, **capnografia**", key:true}]},
{id:"s35", tipo:"catena", tema:"chiaro", sopratitolo:"Un fenomeno da conoscere: l'alarm fatigue", passi:[
  {t:"Monitor che suonano di continuo"}, {t:"Gli operatori si abituano", key:true}, {t:"Ignorati anche gli allarmi veri"}]},
{id:"s36", tipo:"trappola", tema:"chiaro", sopratitolo:"Un saturimetro staccato e un arresto respiratorio suonano allo stesso modo", righe:[
  {sb:"Silenziare", ok:"**Personalizzare** le soglie e guardare **il paziente**, non solo lo schermo"}]},

{id:"s37", tipo:"cifre", tema:"chiaro", sopratitolo:"Il caso · polmonite, alle 3 di notte · confuso, prima orientato · 38,6 °C", voci:[
  {n:"28", suf:"/min", d:"frequenza respiratoria", key:true}, {n:"90", suf:"%", d:"saturazione"}, {n:"115", suf:"bpm", d:"frequenza"}, {n:"95", suf:"mmHg", d:"sistolica"}]},
{id:"s38", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Con l'ABCDE", celle:[
  {n:"A", t:"Parla, ma confuso: vie aeree **pervie**"}, {n:"B", t:"Tachipnea, desaturazione: **ossigeno** secondo target, seduto", key:true}]},
{id:"s39", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Con l'ABCDE", celle:[
  {n:"C", t:"**Accessi**, prelievi, **lattati**, emocolture", key:true}, {n:"D", t:"**Confusione nuova**, glicemia"}, {n:"E", t:"**Febbre**"}]},
{id:"s40", tipo:"frase", tema:"chiaro", sopratitolo:"La NEWS2 è alta · un quadro di possibile sepsi: lezione 10.6",
  testo:"**Attivazione** del team o del medico **in emergenza**."},

{id:"s41", tipo:"trappola", tema:"chiaro", sopratitolo:"L'errore da evitare · frasi che si sentono nei reparti", righe:[
  {sb:"«È sempre stato così» · «Aspettiamo il giro del mattino»", ok:"Un parametro alterato **non si normalizza** perché è alterato da ieri"}]},
{id:"s42", tipo:"frase", tema:"chiaro", sopratitolo:"E soprattutto",
  testo:"Una **confusione di nuova insorgenza** nell'anziano non è «normale per l'età»."},
{id:"s43", tipo:"titolo", tema:"profondo",
  titolo:"Una confusione nuova<br>**non è normale per l'età**.",
  sotto:""},
{id:"s44", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Uno dei segni più precoci · va trattata come un allarme, e si riparte dalla A", celle:[
  {n:"!", t:"**Sepsi**", key:true}, {n:"!", t:"**Ipossia**"}, {n:"!", t:"**Ipoglicemia**"}, {n:"!", t:"**Globo** vescicale"}]},

{id:"s45", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"In Veneto", celle:[
  {n:"1", t:"Punteggi di allerta integrati nella **cartella elettronica**, calcolati dai parametri inseriti", key:true}, {n:"2", t:"**Team di risposta rapida** con criteri di attivazione definiti"}]},
{id:"s46", tipo:"percorso", tema:"chiaro", sopratitolo:"All'orale, la catena da citare · nessuno dei tre funziona senza gli altri due", tappe:[
  {t:"Parametri", d:""}, {t:"Punteggio", d:"", key:true}, {t:"Risposta graduata", d:""}], attive:[0,1,2]},

{id:"s47", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"La tabella", celle:[
  {n:"A", t:"**Parla?**", key:true}, {n:"B", t:"**Frequenza respiratoria**, saturazione, lavoro"}, {n:"C", t:"Frequenza, pressione, **riempimento < 2 s**, emorragie"}]},
{id:"s48", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"La tabella · tratta ciò che trovi, e rivaluta", celle:[
  {n:"D", t:"AVPU o GCS, pupille, **glicemia**"}, {n:"E", t:"Esporre, temperatura, **ricoprire**"}, {n:"N", t:"**NEWS2**: da 5 urgente, da 7 emergenza, attenzione al 3 singolo", key:true}]},
{id:"s49", tipo:"frase", tema:"chiaro", sopratitolo:"Nella prossima lezione · quando l'ABCDE trova un paziente che non risponde e non respira",
  testo:"La **rianimazione cardiopolmonare**, dal BLSD all'ALS."},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione",
  titolo:"10.3<br>BLSD e ALS<br>nell'adulto", sottotitolo:"La rianimazione cardiopolmonare",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
