// Contenuto delle 50 scene della lezione 1.4. *accento*  **accento in semibold**
const CAPI = [
 {n:"I",    t:"Principi e valori"},
 {n:"II",   t:"Responsabilità assistenziale", d:"competenza, prescrizione, dolore, contenzione"},
 {n:"III",  t:"Rapporti professionali", d:"équipe e personale di supporto"},
 {n:"IV",   t:"Rapporti con le persone assistite", d:"informazione, consenso, fine vita, riservatezza"},
 {n:"V",    t:"Comunicazione e social media"},
 {n:"VI",   t:"Organizzazione"},
 {n:"VII",  t:"Libera professione"},
 {n:"VIII", t:"Disposizioni finali"},
];
const PIANI = [
 {n:"1", t:"Legge", d:"posta dal **Parlamento** → responsabilità civile, penale, amministrativa"},
 {n:"2", t:"Contratto", d:"CCNL e codice di comportamento → disciplinare **verso il datore di lavoro**"},
 {n:"3", t:"Codice deontologico", d:"FNOPI → disciplinare **davanti all'Ordine**: avvertimento, censura, sospensione, radiazione"},
];
const NUMERI = ["1","2","3","4","5","6","7"];
const MEMO = [
 "Codice **2019**, FNOPI — 53 articoli in **8 capi**",
 "Terza fonte del campo di attività: **integra** la legge, non la sostituisce",
 "Il **tempo di relazione** è tempo di cura",
 "Contenzione: eccezionale, motivata, limitata — **mai per carenza di personale**",
 "Prescrizione poco chiara: si chiede, e se il dubbio resta **non si dà corso** e si documenta",
 "Non comunica la diagnosi, **ma non mente**",
 "Obiezione: solo nei casi di legge — restano dovute **assistenza e prestazioni indifferibili**",
];


// --- figure ricorrenti della lezione ---
const CAPIG = [
 {n:"I",    t:"**Principi e valori**"},
 {n:"II",   t:"**Responsabilità assistenziale**"},
 {n:"III",  t:"**Rapporti professionali**", d:"équipe e personale di supporto"},
 {n:"IV",   t:"**Rapporti con le persone assistite**"},
 {n:"V",    t:"**Comunicazione**", d:"anche digitale e social"},
 {n:"VI",   t:"**Organizzazione**"},
 {n:"VII",  t:"**Libera professione**"},
 {n:"VIII", t:"**Disposizioni finali**"},
];
const PRESCR = [
 {t:"**Chiede al prescrittore** di chiarire"},
 {t:"Se il dubbio permane, **non dà corso** all'atto"},
 {t:"**Motiva e documenta** la scelta"},
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 1 · La professione infermieristica",
  titolo:"Il Codice<br>deontologico", sottotitolo:"FNOPI, 2019 — la terza fonte",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"frase", tema:"chiaro", sopratitolo:"Micro-lezione 4 di 8",
  testo:"Dopo il profilo e gli ordinamenti didattici, la *terza fonte* del campo di attività."},
{id:"s03", tipo:"figura", tema:"chiaro", sopratitolo:"Perché conta più di quanto sembri", illu:"lente", lato:"dx",
  titolo:"Il Codice non sta solo<br>nelle domande dirette.<br>Sta *dentro i casi clinici*.", sotto:"Dove la risposta giusta è quasi sempre quella deontologicamente sostenibile."},

{id:"s04", tipo:"icone", tema:"chiaro", sopratitolo:"Quattro cose", voci:[
  {icona:"libro",    t:"Che cos'è", d:"e chi lo adotta"},
  {icona:"cartella", t:"Com'è strutturato", d:"53 articoli in 8 capi"},
  {icona:"avviso",   t:"I temi ricorrenti", d:"contenzione, verità, rifiuto"},
  {icona:"chat",     t:"I social", d:"la novità del 2019"}]},

{id:"s05", tipo:"elenco", tema:"chiaro", sopratitolo:"I temi che tornano sempre", marcatori:["—","—","—","—","—"], voci:[
  {t:"**Contenzione**"}, {t:"**Prescrizione dubbia**"}, {t:"**Verità** e informazione"},
  {t:"**Rifiuto** delle cure"}, {t:"**Social media**"}]},

{id:"s06", tipo:"norma", tema:"chiaro", sopratitolo:"Che cos'è",
  etichetta:"Codice deontologico delle Professioni Infermieristiche", sigla:"FNOPI, 2019",
  testo:"Sostituisce quello del 2009. *53 articoli* distribuiti in *8 capi*."},
{id:"s07", tipo:"frase", tema:"tenue", sopratitolo:"Chi lo adotta",
  testo:"La professione, attraverso la sua Federazione. Non il Parlamento: è *autoregolamentazione*.",
  sotto:"Ma autoregolamentazione **non** significa priva di peso giuridico."},

{id:"s08", tipo:"tabella", tema:"chiaro", sopratitolo:"Tre fonti, tre responsabilità diverse",
  intestazioni:["Fonte","Chi la pone","Che responsabilità genera"], colonne:["30%","30%","40%"],
  chiave:[2],
  righe:[
   ["**Legge**","il Parlamento","penale, civile, amministrativa"],
   ["**Contratto** e codice di comportamento","le parti / l'amministrazione","disciplinare, verso il datore di lavoro"],
   ["**Codice deontologico**","la professione, tramite la FNOPI","deontologica, davanti all'Ordine"]]},

{id:"s09", tipo:"tre", tema:"chiaro", sopratitolo:"I tre piani", box:PIANI},

{id:"s10", tipo:"titolo", tema:"profondo",
  titolo:"La deontologia non è<br>*alternativa* alla legge:<br>la **integra**.",
  sotto:"Un comportamento può essere penalmente lecito e restare illecito deontologico."},
{id:"s11", tipo:"raggiera", tema:"chiaro", sopratitolo:"Per lo stesso fatto: tre piani autonomi e cumulabili", centro:"Un fatto",
  raggi:[{t:"Penale", d:"davanti al giudice"},{t:"Disciplinare", d:"davanti all'azienda"},{t:"Deontologico", d:"davanti all'Ordine", key:true}]},
{id:"s12", tipo:"norma", tema:"chiaro", sopratitolo:"E c'è di più",
  etichetta:"Il Codice è fonte del campo di attività", sigla:"L. 42/1999",
  testo:"Una norma deontologica concorre a definire *ciò che devi fare* — e il giudice la richiama per valutare la **diligenza professionale**."},

{id:"s13", tipo:"griglia", tema:"chiaro", colonne:2, attive:[0,1],
  sopratitolo:"La mappa degli otto capi", celle:CAPIG},

{id:"s14", tipo:"griglia", tema:"chiaro", colonne:2, attive:[0,1,2,3,4],
  sopratitolo:"La mappa degli otto capi", celle:CAPIG},

{id:"s15", tipo:"griglia", tema:"chiaro", colonne:2, attive:[0,1,2,3,4,5,6,7],
  sopratitolo:"La mappa degli otto capi", celle:CAPIG},

{id:"s16", tipo:"titolo", tema:"profondo",
  titolo:"Il **tempo di relazione**<br>è tempo di cura.",
  sotto:"La formula più citata dell'intero Codice — Capo I."},
{id:"s17", tipo:"figura", tema:"chiaro", sopratitolo:"La ritroverai altrove", illu:"catena", lato:"dx",
  titolo:"La stessa affermazione,<br>con altre parole, sta nella<br>*legge 219 del 2017*.", sotto:"L'assistenza si fonda su valori etici, professionali, giuridici e sociali."},
{id:"s18", tipo:"elenco", tema:"chiaro", sopratitolo:"Ancora dal Capo I", voci:[
  {t:"Rispetta la **libera scelta** della persona", d:"anche quando non coincide con la propria opinione"},
  {t:"Davanti a questioni etiche complesse si avvale del **confronto**", d:"con l'équipe e con i comitati etici"}]},

{id:"s19", tipo:"elenco", tema:"chiaro", sopratitolo:"Capo II · il più operativo", voci:[
  {t:"Fonda il proprio operato su **conoscenze validate**"},
  {t:"Si **aggiorna**"},
  {t:"Agisce **nei limiti della propria competenza**", d:"ricorrendo quando serve alla consulenza di altri professionisti"}]},
{id:"s20", tipo:"titolo", tema:"profondo",
  titolo:"Riconoscere il limite<br>è un **obbligo**,<br>non una debolezza.",
  sotto:"Quando fra le opzioni compare «chiede supporto», è quasi sempre quella giusta."},

{id:"s21", tipo:"figura", tema:"chiaro", sopratitolo:"Situazione classica", illu:"fiale",
  titolo:"Una prescrizione *non chiara*, *non appropriata*, o in contrasto con la tua valutazione professionale.", sotto:"Che cosa fa l'infermiere?"},
{id:"s22", tipo:"catena", tema:"chiaro", sopratitolo:"Prescrizione dubbia: la sequenza",
  passi:[{t:"Chiede chiarimento", d:"al prescrittore"},
         {t:"Non dà corso", d:"se il dubbio permane"},
         {t:"Documenta", d:"motivando la scelta", key:true}]},

{id:"s23", tipo:"trappola", tema:"tenue", sopratitolo:"Sbagliate entrambe le estreme", righe:[
  {sb:"«esegue comunque, la prescrizione è del medico»", ok:"il dubbio va *chiarito prima*"},
  {sb:"«corregge la prescrizione da sé»", ok:"non la prescrive e *non la modifica*"}]},

{id:"s24", tipo:"elenco", tema:"chiaro", sopratitolo:"Il dolore", marcatori:["1","2","3"], numerato:true, grandi:true, voci:[
  {t:"**Prevenire**"}, {t:"**Rilevare e documentare**"}, {t:"**Attivarsi** per il controllo"}]},
{id:"s25", tipo:"figura", tema:"tenue", sopratitolo:"Base deontologica della L. 38/2010", illu:"termometro", lato:"dx",
  titolo:"Il dolore non rilevato è, prima ancora che un problema clinico, una *mancanza deontologica*.", sotto:"Non è una svista: è un'omissione che ha un nome."},

{id:"s26", tipo:"norma", tema:"chiaro", sopratitolo:"La contenzione",
  etichetta:"Il tema che all'orale torna sempre", sigla:"Evento eccezionale",
  testo:"Motivato da prescrizione medica o da *documentate valutazioni assistenziali*, e limitato nel tempo."},
{id:"s27", tipo:"raggiera", tema:"chiaro", sopratitolo:"Contenzione: i tre requisiti", centro:"Contenzione",
  raggi:[{t:"Eccezionale", d:"un evento straordinario, non un presidio"},{t:"Motivata", d:"documentata in cartella, non a voce"},{t:"Limitata", d:"nel tempo, con rivalutazione periodica"}]},

{id:"s28", tipo:"titolo", tema:"profondo",
  titolo:"Non si contiene<br>per **carenza di personale**.",
  sotto:"La contenzione non è mai una misura organizzativa."},

{id:"s29", tipo:"elenco", tema:"chiaro", sopratitolo:"Capo IV · con la persona assistita", voci:[
  {t:"**Ascolta**, informa e coinvolge"},
  {t:"**Verifica** che la persona abbia capito"},
  {t:"Fornisce le informazioni **di sua competenza**"}]},
{id:"s30", tipo:"frase", tema:"chiaro", sopratitolo:"E per le informazioni degli altri",
  testo:"Facilita l'accesso al *professionista giusto*.",
  sotto:"E qui arriva il confine che i quiz testano sempre, in tutte le salse."},
{id:"s31", tipo:"titolo", tema:"profondo",
  titolo:"Non comunica la diagnosi<br>né la prognosi.<br>Ma **non mente**.",
  sotto:"E non elude."},

{id:"s32", tipo:"trappola", tema:"tenue", sopratitolo:"Sbagliate entrambe le estreme", righe:[
  {sb:"«dice che non sa nulla e cambia argomento»", ok:"eludere *è* mentire"},
  {sb:"«comunica lui la diagnosi per non lasciare solo il paziente»", ok:"non è *informazione di sua competenza*"}]},
{id:"s33", tipo:"figura", tema:"chiaro", sopratitolo:"Il diritto a non sapere", illu:"ascolto",
  titolo:"La persona ha diritto anche<br>a *non essere informata*.", sotto:"O può indicare qualcun altro che riceva le informazioni al suo posto. L'infermiere rispetta questa volontà e la **documenta**."},

{id:"s34", tipo:"figura", tema:"chiaro", sopratitolo:"Il rifiuto delle cure", illu:"mani", lato:"dx",
  titolo:"L'infermiere rispetta il rifiuto di trattamenti e accertamenti, *anche quando comporta un rischio*.", sotto:"Adoperandosi perché la scelta sia informata e consapevole."},
{id:"s35", tipo:"elenco", tema:"chiaro", sopratitolo:"La volontà espressa", voci:[
  {t:"Tutela le **disposizioni anticipate di trattamento**"},
  {t:"Sostiene la **pianificazione condivisa** delle cure", d:"su consenso e DAT torniamo in modo sistematico nella 1.6"}]},
{id:"s36", tipo:"icone", tema:"chiaro", sopratitolo:"Nel fine vita", voci:[
  {icona:"goccia",    t:"Controllo dei sintomi"},
  {icona:"cuoremano", t:"Sedazione", d:"quando indicata"},
  {icona:"scudo",     t:"Dignità"},
  {icona:"persone",   t:"Presenza dei familiari"}]},

{id:"s37", tipo:"frase", tema:"chiaro", sopratitolo:"L'obiezione di coscienza",
  testo:"Due limiti, e vanno detti *insieme*: è la loro combinazione a fare la risposta corretta.",
  sotto:"Primo: si obietta solo nei casi previsti dalla legge, non a piacimento."},
{id:"s38", tipo:"tabella", tema:"chiaro", sopratitolo:"Obiezione di coscienza: i due limiti",
  intestazioni:["Il limite","Che cosa vuol dire"], colonne:["34%","66%"],
  righe:[
   ["Solo nei **casi previsti dalla legge**","non è un'obiezione generale a ciò che non si condivide"],
   ["Non copre l'**assistenza**","restano dovute l'assistenza prima e dopo l'atto e ogni urgenza"]]},

{id:"s39", tipo:"elenco", tema:"chiaro", sopratitolo:"Capo III · l'équipe", voci:[
  {t:"**Collabora** e tutela la dignità dei membri dell'équipe"},
  {t:"Non assume atteggiamenti **denigratori** verso i colleghi"},
  {t:"I contrasti si affrontano **nelle sedi opportune**", d:"mai davanti alla persona assistita"}]},
{id:"s40", tipo:"figura", tema:"chiaro", sopratitolo:"Ma quando qualcuno sbaglia", illu:"campana",
  titolo:"Se un comportamento, *anche di un collega*, mette a rischio la persona, il Codice impone di **segnalare**."},
{id:"s41", tipo:"catena", tema:"chiaro", sopratitolo:"Comportamento a rischio di un collega",
  passi:[{t:"Mettere in sicurezza", d:"la persona assistita, subito"},
         {t:"Informare", d:"chi di competenza"},
         {t:"Documentare", d:"coprire il collega non è solidarietà", key:true}]},

{id:"s42", tipo:"figura", tema:"chiaro", sopratitolo:"Capo V · la novità del 2019", illu:"telefono", lato:"dx",
  titolo:"Nei mezzi di comunicazione e nei social media l'infermiere agisce con *prudenza e decoro*.", sotto:"È il capo da cui vengono i casi d'esame più recenti."},
{id:"s43", tipo:"figura", tema:"chiaro", sopratitolo:"La riservatezza", illu:"scudo",
  titolo:"Non diffonde immagini o informazioni che rendano *identificabile* la persona assistita."},
{id:"s44", tipo:"tabella", tema:"chiaro", sopratitolo:"La stessa fotografia, due situazioni opposte",
  intestazioni:["","Documentazione clinica","Immagine in chat"], colonne:["22%","39%","39%"],
  righe:[
   ["Con che strumento","si:il sistema aziendale","no:il telefono personale"],
   ["Con quale base","si:il consenso della persona","no:nessuna"],
   ["Che cos'è","si:un atto professionale","no:un illecito deontologico e privacy"]]},

{id:"s45", tipo:"elenco", tema:"chiaro", sopratitolo:"Capo VI · l'organizzazione", numerato:true, voci:[
  {t:"**Segnala** alle figure competenti le carenze di risorse o organizzazione", d:"che possano compromettere sicurezza e qualità dell'assistenza"},
  {t:"Si adopera perché la persona **non ne subisca le conseguenze**"}]},
{id:"s46", tipo:"figura", tema:"chiaro", sopratitolo:"La condotta corretta", illu:"cartella", lato:"dx",
  titolo:"La **segnalazione<br>documentata**.", sotto:"Subire in silenzio una carenza nota non protegge nessuno, e sul piano della responsabilità professionale espone."},

{id:"s47", tipo:"griglia", tema:"chiaro", colonne:1, attive:[0,1],
  sopratitolo:"I sette punti da portare all'esame", celle:[
  {t:"Codice **2019**, adottato dalla **FNOPI**: **53 articoli in 8 capi**"},
  {t:"È **fonte del campo di attività** (legge 42/1999): non è un galateo"},
  {t:"**Contenzione**: eccezionale, motivata, limitata — **mai per carenza di personale**"},
  {t:"**Prescrizione dubbia**: chiedi, non dare corso, documenta"},
  {t:"Non si comunica la **diagnosi**, ma **non si mente**"},
  {t:"**Obiezione**: solo nei casi di legge, e l'assistenza resta dovuta"},
  {t:"**Social**: mai immagini che rendano identificabile la persona"}]},

{id:"s48", tipo:"griglia", tema:"chiaro", colonne:1, attive:[0,1,2,3],
  sopratitolo:"I sette punti da portare all'esame", celle:[
  {t:"Codice **2019**, adottato dalla **FNOPI**: **53 articoli in 8 capi**"},
  {t:"È **fonte del campo di attività** (legge 42/1999): non è un galateo"},
  {t:"**Contenzione**: eccezionale, motivata, limitata — **mai per carenza di personale**"},
  {t:"**Prescrizione dubbia**: chiedi, non dare corso, documenta"},
  {t:"Non si comunica la **diagnosi**, ma **non si mente**"},
  {t:"**Obiezione**: solo nei casi di legge, e l'assistenza resta dovuta"},
  {t:"**Social**: mai immagini che rendano identificabile la persona"}]},

{id:"s49", tipo:"griglia", tema:"chiaro", colonne:1, attive:[0,1,2,3,4,5,6],
  sopratitolo:"I sette punti da portare all'esame", celle:[
  {t:"Codice **2019**, adottato dalla **FNOPI**: **53 articoli in 8 capi**"},
  {t:"È **fonte del campo di attività** (legge 42/1999): non è un galateo"},
  {t:"**Contenzione**: eccezionale, motivata, limitata — **mai per carenza di personale**"},
  {t:"**Prescrizione dubbia**: chiedi, non dare corso, documenta"},
  {t:"Non si comunica la **diagnosi**, ma **non si mente**"},
  {t:"**Obiezione**: solo nei casi di legge, e l'assistenza resta dovuta"},
  {t:"**Social**: mai immagini che rendano identificabile la persona"}]},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Fine della micro-lezione 1.4",
  titolo:"1.5 La responsabilità<br>professionale", sottotitolo:"civile, penale, disciplinare",
  ente:"Nella dispensa: il testo commentato, i quiz e la traccia di risposta già svolta"},
];
