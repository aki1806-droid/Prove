// Contenuto delle 50 scene della lezione 6.1 — gli accessi venosi
// periferici. Due corpi nuovi: i calibri (le sei cannule con il cono nel
// colore standard e il tubo che si stringe) e le vene (il braccio con il
// dorso della mano, l'avambraccio e la piega del gomito barrata). La scala
// VIP è una fascia da 0 a 5; la condotta nello stravaso un percorso a sette
// tappe che si accende in tre tempi.

const VIP = [
 {da:0, a:1, t:"0 · sede sana", d:"osservare"}, {da:1, a:2, t:"1 · un segno", d:"osservare"},
 {da:2, a:3, t:"2 · due segni", d:"rimuovere", key:true}, {da:3, a:4, t:"3 · indurimento", d:"rimuovere"}, {da:4, a:5, t:"4–5 · cordone", d:"tromboflebite"},
];
const CAUSE = [
 {h:"Meccaniche", voci:[{t:"Calibro eccessivo"}, {t:"Movimento della cannula"}, {t:"Zone di flessione"}]},
 {h:"Chimiche", voci:[{t:"Farmaci irritanti"}, {t:"pH e **osmolarità** lontani dal sangue"}]},
 {h:"Batteriche", key:true, voci:[{t:"Contaminazione"}, {t:"**La più pericolosa**", key:true}, {t:"La cannula dimenticata la rende più probabile"}]},
];
const CONDOTTA = [
 {t:"Fermare", d:"l'infusione", key:true}, {t:"Scollegare", d:"e aspirare dalla cannula"}, {t:"Rimuovere", d:"vescicanti: procedura 5.7"}, {t:"Sollevare", d:"l'arto"},
 {t:"Avvisare", d:"se vescicante o esteso"}, {t:"Delimitare", d:"e documentare"}, {t:"Non a valle", d:"nessuna nuova cannula"},
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 6 · Accessi vascolari, terapia infusionale ed emocomponenti",
  titolo:"Accessi venosi<br>periferici", sottotitolo:"6.1 · Scelta, inserimento, gestione, complicanze, rimozione",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"frase", tema:"chiaro", sopratitolo:"Micro-lezione 1 di 8 · il dispositivo invasivo più usato in ospedale",
  testo:"La maggior parte dei ricoverati ne ha almeno uno: **il più usato, e il più sottovalutato**."},
{id:"s03", tipo:"frase", tema:"chiaro", sopratitolo:"Una cannula è una porta aperta nel sistema vascolare",
  testo:"Ogni giorno in sede senza motivo è **un rischio senza beneficio**."},
{id:"s04", tipo:"percorso", tema:"chiaro", sopratitolo:"Il percorso del dispositivo · a ogni tappa una domanda da concorso", tappe:[
  {t:"Scelta"}, {t:"Inserimento"}, {t:"Gestione", key:true}, {t:"Complicanze"}, {t:"Rimozione"}]},

{id:"s05", tipo:"calibri", tema:"chiaro", sopratitolo:"Il calibro si misura in gauge · la regola controintuitiva"},
{id:"s06", tipo:"calibri", tema:"chiaro", sopratitolo:"Ogni calibro ha un colore standard", regola:"14 arancione · 16 grigio · 18 verde · 20 rosa · 22 azzurro · 24 giallo"},
{id:"s07", tipo:"confronto", tema:"chiaro", sopratitolo:"Il criterio di scelta · il calibro più piccolo compatibile con la terapia", col:[
  {h:"Piccolo", t:"Danneggia meno la vena e **dura di più**", key:true},
  {h:"Grande: 14 e 16", t:"Infusioni rapide, **trasfusioni massive**, trauma"}]},

{id:"s08", tipo:"vene", tema:"chiaro", sopratitolo:"La scelta della vena · arto superiore, non dominante, dal distale al prossimale: se una vena si rompe, resta il tratto più alto", attive:[0,1]},
{id:"s09", tipo:"vene", tema:"chiaro", sopratitolo:"Le zone di flessione si evitano · la cannula si piega, si sposta, e cresce il rischio di flebite meccanica", attive:[0,1,2]},
{id:"s10", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"Tre divieti da ricordare", celle:[
  {n:"✗", t:"L'arto con una **fistola artero-venosa** per dialisi", key:true},
  {n:"✗", t:"L'arto omolaterale a uno **svuotamento linfonodale ascellare**"},
  {n:"✗", t:"L'arto **paretico**"}]},
{id:"s11", tipo:"figura", tema:"chiaro", sopratitolo:"Gli arti inferiori, nell'adulto", illu:"gambe",
  titolo:"Solo **in mancanza d'altro**.",
  sotto:"Per il rischio di trombosi: una scelta di necessità, non di comodità."},

{id:"s12", tipo:"percorso", tema:"chiaro", sopratitolo:"La tecnica · prima dell'ago", tappe:[
  {t:"Igiene delle mani", d:"e guanti"}, {t:"Laccio", d:"circa 10 cm sopra la sede"}, {t:"Antisepsi", d:"clorexidina 2% in alcol", key:true}, {t:"Asciugare", d:"completamente"}]},
{id:"s13", tipo:"trappola", tema:"chiaro", sopratitolo:"Un punto che i quiz chiedono", righe:[
  {sb:"Ripalpare la vena dopo l'antisepsi", ok:"**Non si ripalpa**: la sede si ricontamina. Se serve, si ripete l'antisepsi"}]},
{id:"s14", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"L'ago", celle:[
  {n:"1", t:"**Bisello verso l'alto**, angolo di **10–30°**", key:true},
  {n:"2", t:"Al **reflusso** di sangue: avanzare la cannula, sfilare il mandrino"},
  {n:"3", t:"Attivare il **dispositivo di sicurezza**"}]},
{id:"s15", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Dopo l'inserimento", celle:[
  {t:"Togliere il laccio"}, {t:"**Lavaggio** con soluzione fisiologica", key:true}, {t:"Scorre **senza dolore né gonfiore**"}, {t:"Il primo controllo della sede: si **documenta**"}]},

{id:"s16", tipo:"figura", tema:"chiaro", sopratitolo:"Il fissaggio", illu:"pellicola",
  titolo:"Medicazione **sterile, semipermeabile, trasparente**.",
  sotto:"La sede si vede senza rimuoverla; si annota la data di inserimento."},
{id:"s17", tipo:"frase", tema:"chiaro", sopratitolo:"Rubinetti, connettori, prolunghe · prima di collegare una siringa",
  testo:"**Scrub the hub**: si disinfetta il punto di accesso.",
  sotto:"Lo vedremo meglio nella lezione 6.2."},

{id:"s18", tipo:"sostituzione", tema:"chiaro", sopratitolo:"Per quanto tempo può restare",
  da:{h:"Per anni", t:"sostituzione a intervalli fissi"}, a:{h:"Oggi", t:"su indicazione clinica"},
  sotto:"Le evidenze sostengono la sostituzione su indicazione clinica."},
{id:"s19", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Su indicazione clinica", celle:[
  {t:"Si toglie ai **segni di complicanza**"}, {t:"Si toglie quando **non serve più**", key:true},
  {t:"Sede **valutata** a ogni turno e prima di ogni infusione"}, {t:"Secondo la **procedura aziendale**"}]},
{id:"s20", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"Due eccezioni, e un'abitudine da perdere", celle:[
  {n:"1", t:"Inserita in **emergenza**, senza asepsi garantita: si sostituisce appena possibile"},
  {n:"2", t:"**Inutilizzata**: si rimuove"},
  {n:"!", t:"Le cannule «dimenticate», messe «per sicurezza»: una causa **evitabile** di infezione", key:true}]},

{id:"s21", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Le complicanze · la flebite, l'infiammazione della parete venosa", celle:[
  {n:"1", t:"**Dolore**"}, {n:"2", t:"**Eritema**"}, {n:"3", t:"**Edema**"}, {n:"4", t:"**Calore**"}, {n:"5", t:"Fino al **cordone venoso** palpabile", key:true}]},
{id:"s22", tipo:"colonne", tema:"chiaro", sopratitolo:"Le cause della flebite", attive:[0,1], colonne:CAUSE},
{id:"s23", tipo:"colonne", tema:"chiaro", sopratitolo:"Le cause della flebite · la batterica è la più pericolosa", colonne:CAUSE},

{id:"s24", tipo:"fascia", tema:"chiaro", sopratitolo:"La scala VIP · Visual Infusion Phlebitis, da 0 a 5", classi:VIP, min:0, max:5, uguali:true, attive:[0,1]},
{id:"s25", tipo:"fascia", tema:"chiaro", sopratitolo:"Da 2 si rimuove · e si riposiziona in un'altra sede, più in alto o nell'altro arto", classi:VIP, min:0, max:5, uguali:true, attive:[0,1,2]},
{id:"s26", tipo:"fascia", tema:"chiaro", sopratitolo:"I gradi successivi · una flebite sempre più estesa, fino alla tromboflebite", classi:VIP, min:0, max:5, uguali:true},

{id:"s27", tipo:"confronto", tema:"chiaro", sopratitolo:"La soluzione esce dalla vena e finisce nei tessuti", col:[
  {h:"Infiltrazione", t:"Soluzione **non vescicante**"},
  {h:"Stravaso", t:"Soluzione **vescicante**: danno fino alla **necrosi**", key:true}]},
{id:"s28", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"I vescicanti", celle:[
  {n:"1", t:"**Chemioterapici**", key:true}, {n:"2", t:"**Potassio concentrato**"}, {n:"3", t:"Calcio"}, {n:"4", t:"Alcuni mezzi di contrasto"}, {n:"5", t:"**Vasopressori**"}]},
{id:"s29", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"I segni · la cute fredda distingue lo stravaso dalla flebite, dove è calda", celle:[
  {n:"1", t:"**Edema**"}, {n:"2", t:"Cute **fredda e pallida**", key:true}, {n:"3", t:"Tensione, dolore"}, {n:"4", t:"Infusione che **rallenta**"}]},

{id:"s30", tipo:"percorso", tema:"chiaro", sopratitolo:"La condotta", attive:[0,1], tappe:CONDOTTA},
{id:"s31", tipo:"percorso", tema:"chiaro", sopratitolo:"La condotta · per i vescicanti la procedura specifica, vista per gli antiblastici nella 5.7", attive:[0,1,2,3], tappe:CONDOTTA},
{id:"s32", tipo:"percorso", tema:"chiaro", sopratitolo:"La condotta · e nessuna nuova cannula a valle della sede stravasata", tappe:CONDOTTA},

{id:"s33", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"Le altre complicanze", celle:[
  {n:"1", t:"**Infezione**, locale o sistemica: febbre con cannula da giorni → guardare la sede", key:true},
  {n:"2", t:"**Ematoma** all'inserimento"}]},
{id:"s34", tipo:"frase", tema:"chiaro", sopratitolo:"Trombosi e occlusione della cannula",
  testo:"Non si disostruisce forzando con la siringa: **si rimuove**.",
  sotto:"Spingere un coagulo in circolo è peggio di perdere una cannula."},
{id:"s35", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"Più rare", celle:[
  {n:"1", t:"**Embolia gassosa**"},
  {n:"2", t:"**Lesione nervosa**: dolore folgorante o formicolio all'inserimento → si ritira subito l'ago", key:true}]},

{id:"s36", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Le vene difficili · DIVA, difficult intravenous access", celle:[
  {n:"1", t:"Obesità, edema"}, {n:"2", t:"Chemioterapie ripetute"}, {n:"3", t:"Molti incannulamenti precedenti"}, {n:"→", t:"**Ecoguida**: più successo, meno tentativi", key:true}]},
{id:"s37", tipo:"cifre", tema:"chiaro", sopratitolo:"Una regola di rispetto per la persona · insistere danneggia il patrimonio venoso", voci:[
  {n:"2", d:"tentativi falliti", key:true}, {n:"→", d:"un collega più esperto"}]},

{id:"s38", tipo:"frase", tema:"chiaro", sopratitolo:"Un concetto che distingue · il patrimonio venoso",
  testo:"Nell'insufficienza renale cronica le vene dell'avambraccio non dominante **si preservano**: potrebbero servire per la **fistola**."},
{id:"s39", tipo:"vene", tema:"chiaro", sopratitolo:"Si preferiscono le vene del dorso della mano · l'avambraccio resta per la fistola", attive:[0], nota:"nell'insufficienza renale cronica"},
{id:"s40", tipo:"frase", tema:"chiaro", sopratitolo:"Terapie lunghe o irritanti",
  testo:"Si valuta **precocemente** un accesso più stabile, Midline o PICC, invece di consumare una vena dopo l'altra.",
  sotto:"Ne parliamo nella prossima lezione."},

{id:"s41", tipo:"percorso", tema:"chiaro", sopratitolo:"La rimozione", tappe:[
  {t:"Igiene e guanti"}, {t:"Via la medicazione"}, {t:"Sfilare"}, {t:"Comprimere", d:"garza sterile; più a lungo se anticoagulato", key:true}, {t:"Integrità", d:"della cannula"}]},
{id:"s42", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"Dopo", celle:[
  {n:"1", t:"**Integrità** della cannula: nessun frammento in vena", key:true},
  {n:"2", t:"Medicazione, e **documentazione**: data, motivo, condizioni della sede"}]},

{id:"s43", tipo:"frase", tema:"chiaro", sopratitolo:"Il caso · cannula in sede da tre giorni",
  testo:"Dolore ed eritema lungo la vena, infusione che rallenta, e **nessuna terapia endovenosa in corso**. Che cosa fai?"},
{id:"s44", tipo:"percorso", tema:"chiaro", sopratitolo:"Che cosa fai", tappe:[
  {t:"VIP ≥ 2", d:"due segni: si rimuove", key:true}, {t:"Nessuna nuova cannula", d:"non serve più"}, {t:"Documentare", d:"e sorvegliare la sede"}, {t:"Medico", d:"se febbre o pus"}]},
{id:"s45", tipo:"titolo", tema:"profondo",
  titolo:"La domanda nascosta: **serviva ancora?**",
  sotto:"Il caso chiede questo, prima del resto."},

{id:"s46", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"In Veneto", celle:[
  {n:"1", t:"**Procedure aziendali** che recepiscono le linee guida internazionali"},
  {n:"2", t:"**Team accessi vascolari**: dispositivi complessi e consulenze per le vene difficili", key:true}]},
{id:"s47", tipo:"frase", tema:"chiaro", sopratitolo:"In cartella elettronica: data, sede, calibro e valutazioni della sede",
  testo:"All'orale, citare il **team accessi vascolari** mostra che conosci l'organizzazione reale."},

{id:"s48", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Ricapitoliamo", celle:[
  {t:"Numero basso, **calibro grande**; il più piccolo compatibile"}, {t:"**Distale → prossimale**, arto non dominante"},
  {t:"Mai fistola, svuotamento ascellare, arto paretico"}, {t:"**Non ripalpare** dopo l'antisepsi", key:true}]},
{id:"s49", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Ricapitoliamo", celle:[
  {t:"Sostituzione **su indicazione clinica**; via quando non serve più"}, {t:"VIP: **da 2 si rimuove**", key:true},
  {t:"**Infiltrazione** se non vescicante, **stravaso** se lo è"}]},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione",
  titolo:"6.2<br>Accessi venosi<br>centrali", sottotitolo:"CVC, PICC, Midline, port: gestione e complicanze",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
