// Contenuto delle 50 scene della lezione 6.6 — emocomponenti ed
// emotrasfusione. Un corpo nuovo: i gruppi (la sacca «0 −» che va a tutti
// i gruppi per le emazie, la sacca «AB» che va a tutti per il plasma:
// l'inversione). La sequenza davanti a una reazione è un percorso a otto
// tappe che si accende in tre tempi; il doppio controllo un percorso; la
// conservazione colonne; le regole trappole.

const SEQ = [
 {t:"Fermare", d:"subito", key:true}, {t:"Accesso", d:"fisiologica, deflussore nuovo"}, {t:"Parametri"}, {t:"Medico"},
 {t:"Ricontrollare", d:"identità e sacca"}, {t:"Inviare tutto", d:"sacca, deflussore, campioni"}, {t:"Urine"}, {t:"Documentare", d:"e segnalare: emovigilanza"},
];
const CONS = [
 {h:"Emazie", voci:[{t:"Frigoemoteca **2–6 °C**", key:true}, {t:"Completate entro **4 ore**"}]},
 {h:"Piastrine", key:true, voci:[{t:"**20–24 °C**, in **agitazione** continua"}, {t:"**Mai in frigorifero**", key:true}]},
 {h:"Plasma", voci:[{t:"Congelato"}, {t:"Scongelato **subito prima** dell'uso"}]},
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 6 · Accessi vascolari, terapia infusionale ed emocomponenti",
  titolo:"Emocomponenti<br>ed emotrasfusione", sottotitolo:"6.6 · Ogni identificazione si fa al letto del paziente",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"frase", tema:"chiaro", sopratitolo:"Micro-lezione 6 di 8",
  testo:"Una delle terapie **più sicure** quando la procedura è rispettata, una delle **più pericolose** quando non lo è."},
{id:"s03", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"La reazione da incompatibilità AB0 · evento sentinella, Raccomandazione ministeriale n. 5", celle:[
  {n:"!", t:"Nasce quasi sempre da un **errore di identificazione**: del paziente, del campione, della sacca", key:true}]},
{id:"s04", tipo:"frase", tema:"chiaro", sopratitolo:"La regola intorno a cui è costruita la lezione",
  testo:"Ogni passaggio di identificazione si fa **al letto del paziente**."},

{id:"s05", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Le basi", celle:[
  {n:"AB0", t:"I gruppi **A, B, AB, 0**", key:true}, {n:"Rh", t:"**Positivo** o **negativo**"}]},
{id:"s06", tipo:"gruppi", tema:"chiaro", sopratitolo:"Per le emazie · il donatore universale è 0 Rh negativo: niente antigeni A, B né D; il ricevente universale è AB Rh positivo", attive:[0]},
{id:"s07", tipo:"gruppi", tema:"chiaro", sopratitolo:"Per il plasma vale il contrario · donatore universale AB: nessun anticorpo anti-A né anti-B. L'inversione è una domanda classica"},

{id:"s08", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Gli emocomponenti", celle:[
  {n:"1", t:"**Emazie concentrate**, per l'anemia: un'unità, **+1 g/dl** di emoglobina nell'adulto", key:true}, {n:"2", t:"**Piastrine**: piastrinopenia con sanguinamento o rischio"}]},
{id:"s09", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Gli emocomponenti", celle:[
  {n:"3", t:"**Plasma fresco congelato**: deficit dei fattori della coagulazione", key:true}, {n:"4", t:"**Crioprecipitato**: ricco di fibrinogeno"}]},
{id:"s10", tipo:"frase", tema:"chiaro", sopratitolo:"Una distinzione · albumina, immunoglobuline, concentrati di fattori",
  testo:"I **plasmaderivati** sono prodotti industriali: si gestiscono come **farmaci**."},

{id:"s11", tipo:"colonne", tema:"chiaro", sopratitolo:"La conservazione · dove nascono errori silenziosi", colonne:CONS},
{id:"s12", tipo:"trappola", tema:"chiaro", sopratitolo:"In reparto non si conservano emocomponenti", righe:[
  {sb:"La sacca nel frigorifero dei farmaci, o vicino a una fonte di calore", ok:"**Nessuna conservazione impropria**: il plasma si scongela al momento, le emazie tornano alla frigoemoteca"}]},

{id:"s13", tipo:"cifre", tema:"chiaro", sopratitolo:"Il quadro normativo", voci:[
  {n:"219", suf:"/2005", d:"legge sulle attività trasfusionali", key:true}, {n:"261", suf:"/2007", d:"decreto legislativo"}]},
{id:"s14", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"Il quadro normativo", celle:[
  {n:"1", t:"**DM 2 novembre 2015**: requisiti di qualità e sicurezza"}, {n:"2", t:"**Raccomandazione n. 5**"}, {n:"3", t:"**Consenso informato specifico** alla trasfusione", key:true}]},
{id:"s15", tipo:"frase", tema:"chiaro", sopratitolo:"Il rifiuto della persona capace · pensiamo ai Testimoni di Geova · legge 219/2017",
  testo:"Va **rispettato**: si documenta, si informa il medico, si valutano le alternative."},

{id:"s16", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"La richiesta, firmata dal medico · e il prelievo pre-trasfusionale, il primo punto critico", celle:[
  {n:"1", t:"**Identificazione attiva** al letto: nome, cognome, data di nascita **detti da lui**", key:true}]},
{id:"s17", tipo:"frase", tema:"chiaro", sopratitolo:"Mai prima, mai dopo in infermeria · firma di chi ha prelevato",
  testo:"La provetta si etichetta **al letto, davanti al paziente**."},
{id:"s18", tipo:"cifre", tema:"chiaro", sopratitolo:"Per la determinazione del gruppo · un errore su uno dei due viene intercettato dal confronto", voci:[
  {n:"2", d:"campioni, prelevati in momenti diversi", key:true}]},

{id:"s19", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Al ritiro della sacca", celle:[
  {t:"**Integrità**"}, {t:"**Aspetto**: niente coaguli, niente colore anomalo"}, {t:"**Scadenza**"}, {t:"**Etichetta di compatibilità** e corrispondenza con il paziente", key:true}]},
{id:"s20", tipo:"frase", tema:"chiaro", sopratitolo:"Un'unità di emazie fuori dal frigorifero non può restarci a lungo",
  testo:"Si inizia **entro i tempi** previsti dalla procedura dopo l'uscita dal servizio trasfusionale."},

{id:"s21", tipo:"frase", tema:"chiaro", sopratitolo:"Il momento cruciale · due operatori, secondo la procedura aziendale",
  testo:"Il **doppio controllo al letto del paziente**. Non in infermeria, non al bancone: al letto."},
{id:"s22", tipo:"percorso", tema:"chiaro", sopratitolo:"Il doppio controllo · si confrontano i dati del paziente con la richiesta, l'etichetta di assegnazione e l'etichetta della sacca", tappe:[
  {t:"Identificazione attiva"}, {t:"Braccialetto"}, {t:"Richiesta"}, {t:"Etichetta di assegnazione"}, {t:"Etichetta della sacca", d:"gruppo, Rh, unità, scadenza", key:true}]},
{id:"s23", tipo:"titolo", tema:"profondo",
  titolo:"Entrambi **firmano**.",
  sotto:"Le reazioni AB0 nascono quasi tutte da un controllo fatto lontano dal paziente."},

{id:"s24", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"Il materiale", celle:[
  {n:"1", t:"Deflussore specifico con **filtro 170–200 micron**: trattiene microaggregati e coaguli", key:true}, {n:"2", t:"Un accesso venoso adeguato"}]},
{id:"s25", tipo:"trappola", tema:"chiaro", sopratitolo:"La regola della compatibilità · con il sangue va solo la fisiologica 0,9%", righe:[
  {sb:"Glucosata (emolisi), Ringer (il calcio fa coagulare la linea), farmaci in linea", ok:"**Solo fisiologica 0,9%**"}]},

{id:"s26", tipo:"percorso", tema:"chiaro", sopratitolo:"L'avvio", tappe:[
  {t:"Parametri", d:"prima di iniziare"}, {t:"15 minuti lenti", d:"infermiere presente", key:true}, {t:"Parametri", d:"dopo 15 minuti"}, {t:"Poi", d:"secondo procedura, e alla fine"}]},
{id:"s27", tipo:"frase", tema:"chiaro", sopratitolo:"Perché i primi quindici minuti",
  testo:"Le reazioni più gravi compaiono **nei primi minuti**, con piccoli volumi."},
{id:"s28", tipo:"cifre", tema:"chiaro", sopratitolo:"I tempi", voci:[
  {n:"4", suf:"h", d:"emazie: completate dall'uscita dalla conservazione", key:true}, {n:"subito", d:"piastrine e plasma, più rapidamente"}]},

{id:"s29", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Le reazioni acute · la più grave: emolitica acuta da incompatibilità AB0", celle:[
  {n:"1", t:"Febbre, **brividi**"}, {n:"2", t:"**Dolore lombare** o toracico", key:true}, {n:"3", t:"**Ipotensione**"}, {n:"4", t:"**Urine scure**"}, {n:"5", t:"Senso di **morte imminente**"}]},
{id:"s30", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"Le reazioni acute", celle:[
  {n:"2", t:"**Febbrile non emolitica**: la più frequente e benigna"}, {n:"3", t:"**Allergica**: dall'orticaria all'anafilassi"}, {n:"4", t:"**TACO**, sovraccarico circolatorio: anziano e cardiopatico", key:true}]},
{id:"s31", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"Le reazioni acute", celle:[
  {n:"5", t:"**TRALI**: danno polmonare acuto, insufficienza respiratoria entro 6 ore", key:true}, {n:"6", t:"**Contaminazione batterica**: quadro settico"}]},

{id:"s32", tipo:"percorso", tema:"chiaro", sopratitolo:"Davanti a una sospetta reazione · deflussore nuovo, per non infondere il sangue rimasto nella linea", attive:[0,1], tappe:SEQ},
{id:"s33", tipo:"percorso", tema:"chiaro", sopratitolo:"La sequenza · ricontrollare serve a scoprire subito un errore", attive:[0,1,2,3,4], tappe:SEQ},
{id:"s34", tipo:"percorso", tema:"chiaro", sopratitolo:"La sequenza · lo stesso errore può aver coinvolto un altro paziente; non si butta nulla", tappe:SEQ},

{id:"s35", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"Le reazioni tardive · giorni o mesi dopo", celle:[
  {n:"1", t:"**Emolisi ritardata**"}, {n:"2", t:"Infezioni trasmesse: oggi molto rare grazie ai test"}, {n:"3", t:"**Alloimmunizzazione**", key:true}]},
{id:"s36", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"Le reazioni tardive", celle:[
  {n:"4", t:"**Sovraccarico di ferro** nei politrasfusi"}, {n:"5", t:"Malattia del trapianto contro l'ospite: rara, prevenuta con l'**irradiazione** nei pazienti a rischio", key:true}]},

{id:"s37", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"La tracciabilità · in cartella", celle:[
  {t:"Numero dell'**unità**", key:true}, {t:"**Orari** di inizio e fine"}, {t:"**Parametri**, eventuali reazioni"}, {t:"Gli **operatori**"}]},
{id:"s38", tipo:"frase", tema:"chiaro", sopratitolo:"Al servizio trasfusionale torna l'attestazione di avvenuta trasfusione",
  testo:"Ogni unità è tracciata **dal donatore al ricevente**; le reazioni confluiscono nell'**emovigilanza**."},

{id:"s39", tipo:"trappola", tema:"chiaro", sopratitolo:"Una regola organizzativa nata dagli errori reali", righe:[
  {sb:"Ritirare o preparare insieme sacche per pazienti diversi", ok:"**Un paziente, una sacca, un doppio controllo alla volta**"}]},
{id:"s40", tipo:"frase", tema:"chiaro", sopratitolo:"Gli scambi di sacca",
  testo:"Avvengono quasi sempre quando **due trasfusioni sono state gestite insieme**."},

{id:"s41", tipo:"frase", tema:"chiaro", sopratitolo:"Il caso · dopo 10 minuti dall'inizio",
  testo:"Dolore lombare, agitazione, brividi, PA **85/50**. Che cosa pensi? **Reazione emolitica acuta**."},
{id:"s42", tipo:"percorso", tema:"chiaro", sopratitolo:"Che cosa fai · la sequenza, ed è un'emergenza", tappe:SEQ},
{id:"s43", tipo:"frase", tema:"chiaro", sopratitolo:"E può essere doppia",
  testo:"Verifichi che **un altro paziente** non stia ricevendo la sacca destinata a questo."},

{id:"s44", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"In Veneto", celle:[
  {n:"1", t:"Servizi trasfusionali aziendali in un **coordinamento regionale**"}, {n:"2", t:"**Procedura sulla sicurezza trasfusionale**: chi esegue il doppio controllo, e come", key:true}, {n:"3", t:"In alcune realtà, **identificazione elettronica** al letto"}]},
{id:"s45", tipo:"frase", tema:"chiaro", sopratitolo:"All'orale, la frase chiave",
  testo:"«**Doppio controllo al letto del paziente**.»"},

{id:"s46", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"La tabella da fotografare", celle:[
  {t:"Emazie **2–6 °C**, entro **4 ore**"}, {t:"Piastrine **20–24 °C** in agitazione, **mai in frigo**", key:true}, {t:"Plasma scongelato **al momento**"}]},
{id:"s47", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"La tabella da fotografare", celle:[
  {t:"**Solo fisiologica**, filtro"}, {t:"Primi **15 minuti** lenti e sorvegliati"}, {t:"Donatore universale: emazie **0 negativo**, plasma **AB**", key:true}]},

{id:"s48", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Ricapitoliamo · ogni identificazione si fa al letto del paziente", celle:[
  {t:"Provetta etichettata **davanti al paziente**"}, {t:"**Due campioni** per il gruppo"}, {t:"**Doppio controllo al letto**", key:true}]},
{id:"s49", tipo:"frase", tema:"chiaro", sopratitolo:"Davanti a una reazione: fermare, mantenere l'accesso, ricontrollare, inviare tutto",
  testo:"Nella prossima lezione: i **prelievi** e la **fase preanalitica**."},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione",
  titolo:"6.7<br>Prelievi ed esami:<br>la fase preanalitica", sottotitolo:"Dove nascono gli errori di laboratorio",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
