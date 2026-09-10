// Contenuto delle 50 scene della lezione 1.6. *accento*  **accento in semibold**
const COST = [
 {n:"2",  t:"Diritti inviolabili", d:"dell'uomo, come singolo e nelle formazioni sociali"},
 {n:"13", t:"Libertà personale inviolabile", d:"nessun intervento sul corpo **senza consenso**"},
 {n:"32", t:"Salute", d:"diritto dell'individuo e interesse della collettività — **nessuno obbligato se non per legge**"},
];
const ARTICOLI = [
 {n:"1", t:"Consenso informato"},
 {n:"2", t:"Terapia del dolore", d:"divieto di ostinazione irragionevole, sedazione palliativa"},
 {n:"3", t:"Minori e incapaci"},
 {n:"4", t:"DAT e fiduciario"},
 {n:"5", t:"Pianificazione condivisa delle cure"},
 {n:"6-8", t:"Norme di raccordo", d:"le domande arrivano quasi sempre dai primi cinque"},
];
const INFO = [
 {t:"Condizioni di salute"}, {t:"**Diagnosi** e **prognosi**"},
 {t:"Benefici e rischi di accertamenti e trattamenti"},
 {t:"Possibili **alternative**"},
 {t:"Conseguenze dell'eventuale **rifiuto o rinuncia**", d:"è quella che si dimentica"},
];
const CAPACI = [
 {n:"1", t:"Minore", d:"genitori o tutore — ma la **volontà del minore è ascoltata e valorizzata**"},
 {n:"2", t:"Interdetto", d:"il **tutore**, sentito l'interdetto ove possibile"},
 {n:"3", t:"Inabilitato", d:"presta **personalmente** il consenso"},
 {n:"4", t:"Beneficiario di AdS", d:"dipende dal **decreto di nomina**: va letto"},
];
const RUOLO = [
 "**Acquisisce** il consenso per gli atti di propria competenza",
 "**Contribuisce** alla relazione di cura secondo le sue competenze",
 "**Verifica la comprensione**",
 "**Documenta** consenso, rifiuto, volontà di non essere informati",
 "**Tutela** la volontà espressa, anche quando non la condivide",
 "**Non sostituisce** il medico nella diagnosi — ma non elude",
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 1 · La professione infermieristica",
  titolo:"Consenso informato,<br>DAT e autodeterminazione", sottotitolo:"Legge 219/2017",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"frase", tema:"chiaro", sopratitolo:"Micro-lezione 6 di 8",
  testo:"Il punto in cui *il diritto* incontra *la relazione di cura*.",
  sotto:"Materia ad altissima frequenza nelle prove di concorso."},
{id:"s03", tipo:"frase", tema:"tenue", sopratitolo:"E i casi più insidiosi",
  testo:"Quelli in cui la risposta che sembra *più generosa* è quella **sbagliata**."},

{id:"s04", tipo:"elenco", tema:"chiaro", sopratitolo:"In questa lezione", numerato:true, voci:[
  {t:"Il **fondamento costituzionale**"},
  {t:"La L. 219/2017, **articolo per articolo**"},
  {t:"Minori, incapaci, **DAT**"},
  {t:"Il **ruolo dell'infermiere**"}]},
{id:"s05", tipo:"frase", tema:"chiaro", sopratitolo:"Sul ruolo dell'infermiere",
  testo:"La legge lo affida in modo *meno esplicito* di quanto molti credano.",
  sotto:"Ma esiste, ed è preciso."},

{id:"s06", tipo:"elenco", tema:"chiaro", sopratitolo:"Tre articoli della Costituzione",
  marcatori:COST.map(c=>"art. "+c.n), numerato:true, voci:COST.map(c=>({t:c.t, d:c.d})), attive:[0,1]},
{id:"s07", tipo:"citazione", tema:"profondo", sopratitolo:"Articolo 32, la norma chiave",
  testo:"Nessuno può essere obbligato a un determinato trattamento sanitario *se non per disposizione di legge*",
  fonte:"e la legge non può violare i limiti imposti dal rispetto della persona umana"},
{id:"s08", tipo:"frase", tema:"chiaro", sopratitolo:"Venti parole",
  testo:"Vale la pena saperle ripetere *quasi alla lettera*."},

{id:"s09", tipo:"confronto", tema:"chiaro", sopratitolo:"Due conseguenze pratiche", col:[
  {h:"La regola", t:"il **consenso**", grande:true},
  {h:"L'eccezione", t:"l'**obbligo** — e richiede una legge", grande:true}]},
{id:"s10", tipo:"frase", tema:"tenue", sopratitolo:"Anche quando la legge impone",
  testo:"Pensa al TSO, che vedremo nel modulo 11: restano fermi i limiti del *rispetto della persona*.",
  sotto:"Il consenso non è un modulo da far firmare."},

{id:"s11", tipo:"elenco", tema:"chiaro", sopratitolo:"La L. 219/2017 · otto articoli",
  marcatori:ARTICOLI.map(a=>a.n), numerato:true, voci:ARTICOLI.map(a=>({t:a.t, d:a.d})), attive:[0,1,2]},
{id:"s12", tipo:"elenco", tema:"chiaro", sopratitolo:"La L. 219/2017 · otto articoli",
  marcatori:ARTICOLI.map(a=>a.n), numerato:true, voci:ARTICOLI.map(a=>({t:a.t, d:a.d}))},

{id:"s13", tipo:"citazione", tema:"profondo", sopratitolo:"Prima formula · art. 1",
  testo:"Nessun trattamento sanitario può essere iniziato o proseguito senza il *consenso libero e informato* della persona interessata",
  fonte:"tranne che nei casi espressamente previsti dalla legge"},
{id:"s14", tipo:"frase", tema:"chiaro", sopratitolo:"Seconda formula",
  testo:"È promossa e valorizzata la **relazione di cura e di fiducia**.",
  sotto:"Nella quale sono coinvolti, *se il paziente lo desidera*, i familiari o una persona di fiducia."},
{id:"s15", tipo:"titolo", tema:"profondo",
  titolo:"Il tempo della comunicazione<br>costituisce **tempo di cura**.",
  sotto:"La stessa affermazione del Codice deontologico — 1.4."},

{id:"s16", tipo:"citazione", tema:"chiaro", sopratitolo:"E questo vale una domanda intera",
  testo:"Contribuiscono alla relazione di cura, in base alle rispettive competenze, gli *esercenti una professione sanitaria che compongono l'équipe*",
  fonte:"L. 219/2017, art. 1 comma 2"},
{id:"s17", tipo:"titolo", tema:"profondo",
  titolo:"L'infermiere non è<br>uno spettatore del consenso.<br>È **parte della relazione**.",
  sotto:"Con le competenze del suo profilo."},

{id:"s18", tipo:"elenco", tema:"chiaro", sopratitolo:"Su che cosa verte l'informazione",
  voci:INFO},
{id:"s19", tipo:"frase", tema:"chiaro", sopratitolo:"E come deve essere",
  testo:"Completa, aggiornata e *a lei comprensibile*.",
  sotto:"Non «esaustiva»: **comprensibile a quella persona**."},

{id:"s20", tipo:"elenco", tema:"chiaro", sopratitolo:"Il diritto a non sapere", voci:[
  {t:"Può **rifiutare in tutto o in parte** di ricevere le informazioni"},
  {t:"Può **indicare** familiari o una persona di fiducia", d:"incaricati di riceverle e di esprimere il consenso in sua vece"}]},
{id:"s21", tipo:"frase", tema:"chiaro", sopratitolo:"E va registrato",
  testo:"In cartella e nel *fascicolo sanitario elettronico*.",
  sotto:"Non esiste un dovere di informare **contro** la volontà della persona: è il punto su cui molti rispondono d'istinto e sbagliano."},

{id:"s22", tipo:"frase", tema:"chiaro", sopratitolo:"La forma",
  testo:"Acquisito nei modi *più consoni alle condizioni del paziente*, e documentato: in forma scritta, con videoregistrazioni, o con dispositivi che consentano di comunicare."},
{id:"s23", tipo:"trappola", tema:"tenue", sopratitolo:"Il distrattore da riconoscere", righe:[
  {sb:"«il consenso è valido solo se firmato su modulo cartaceo»",
   ok:"il modulo *documenta* il consenso — il consenso è il **processo informativo** che lo precede"}]},

{id:"s24", tipo:"elenco", tema:"chiaro", sopratitolo:"Rifiuto e revoca", voci:[
  {t:"**Rifiutare** in tutto o in parte qualsiasi accertamento o trattamento"},
  {t:"**Revocare** il consenso in qualsiasi momento", d:"anche quando la revoca comporti l'interruzione del trattamento"}]},
{id:"s25", tipo:"frase", tema:"profondo", sopratitolo:"La previsione più discussa",
  testo:"**Nutrizione e idratazione artificiali** sono considerate *trattamenti sanitari*.",
  sotto:"E come tali possono essere rifiutate."},

{id:"s26", tipo:"titolo", tema:"profondo",
  titolo:"Rifiutare **sì**.<br>Pretendere **no**.",
  sotto:"Il distrattore più elegante dei quiz sulla 219."},
{id:"s27", tipo:"confronto", tema:"chiaro", sopratitolo:"L'autodeterminazione è asimmetrica", col:[
  {h:"Può rifiutare", t:"**qualsiasi** trattamento"},
  {h:"Non può esigere", t:"trattamenti contrari a legge, deontologia o buone pratiche"}],
  sotto:"Davanti a tali richieste il medico *non ha obblighi professionali*."},

{id:"s28", tipo:"frase", tema:"chiaro", sopratitolo:"Chi rispetta un rifiuto di cure salvavita",
  testo:"È **tenuto** a rispettare la volontà espressa e, in conseguenza di ciò, è *esente da responsabilità civile o penale*."},
{id:"s29", tipo:"frase", tema:"chiaro", sopratitolo:"Ma prima",
  testo:"Prospetta le **conseguenze** e le **alternative**, e promuove ogni azione di sostegno, anche psicologico.",
  sotto:"Il rispetto della volontà *non è abbandono*."},

{id:"s30", tipo:"elenco", tema:"chiaro", sopratitolo:"Art. 3 · minori e incapaci",
  marcatori:["1","2","3","4"], numerato:true, grandi:true,
  voci:CAPACI.map(c=>({t:c.t, d:c.d})), attive:[0,1]},
{id:"s31", tipo:"elenco", tema:"chiaro", sopratitolo:"Art. 3 · minori e incapaci",
  marcatori:["1","2","3","4"], numerato:true, grandi:true,
  voci:CAPACI.map(c=>({t:c.t, d:c.d}))},
{id:"s32", tipo:"frase", tema:"profondo", sopratitolo:"Il beneficiario di amministrazione di sostegno",
  testo:"Dipende dal **decreto di nomina**. *Va letto*: stabilisce se decide la persona o l'amministratore."},

{id:"s33", tipo:"sostituzione", tema:"chiaro", sopratitolo:"Il conflitto",
  da:{h:"Il rappresentante legale", t:"**rifiuta** le cure proposte"},
  a:{h:"Il medico", t:"le ritiene **appropriate e necessarie**"},
  sotto:"La decisione è rimessa al *giudice tutelare*."},
{id:"s34", tipo:"titolo", tema:"profondo",
  titolo:"Non si esegue d'autorità.<br>Non si desiste.<br>Si ricorre al **giudice tutelare**.",
  sotto:"Salvo, ovviamente, lo stato di necessità."},

{id:"s35", tipo:"elenco", tema:"chiaro", sopratitolo:"Art. 4 · chi può fare le DAT", voci:[
  {t:"Persona **maggiorenne e capace** di intendere e di volere"},
  {t:"In previsione di un'eventuale **futura** incapacità"}]},
{id:"s36", tipo:"frase", tema:"chiaro", sopratitolo:"E dopo che cosa",
  testo:"Dopo aver acquisito *adeguate informazioni mediche*.",
  sotto:"Esprime volontà, consenso o rifiuto, e indica un **fiduciario** maggiorenne e capace che la rappresenti."},

{id:"s37", tipo:"elenco", tema:"chiaro", sopratitolo:"La forma delle DAT", marcatori:["—","—","—","—"], voci:[
  {t:"**Atto pubblico**"},
  {t:"**Scrittura privata autenticata**"},
  {t:"**Scrittura privata** consegnata personalmente all'ufficio di stato civile del comune di residenza"},
  {t:"**Videoregistrazione** o dispositivi idonei", d:"se le condizioni fisiche non consentono le altre forme"}]},
{id:"s38", tipo:"frase", tema:"chiaro", sopratitolo:"E sono",
  testo:"**Esenti** da bollo e da ogni tributo. E *revocabili in ogni momento*.",
  sotto:"Il medico è tenuto al rispetto delle DAT, e può disattenderle solo in tre casi — sempre **in accordo con il fiduciario**."},
{id:"s39", tipo:"elenco", tema:"chiaro", sopratitolo:"I tre casi di disattendibilità",
  numerato:true, grandi:true, voci:[
  {t:"Palesemente **incongrue**"},
  {t:"Non corrispondenti alla **condizione clinica attuale**"},
  {t:"Esistono **terapie non prevedibili** al momento della sottoscrizione"}],
  },
{id:"s40", tipo:"frase", tema:"tenue", sopratitolo:"Due dettagli che valgono una domanda",
  testo:"In conflitto fra fiduciario e medico decide di nuovo il *giudice tutelare*.",
  sotto:"E se manca il fiduciario, le DAT **restano efficaci**."},

{id:"s41", tipo:"confronto", tema:"chiaro", sopratitolo:"Da non confondere", col:[
  {h:"DAT", t:"incapacità **futura ed eventuale**<br>la persona, da sola, davanti al notaio o al comune"},
  {h:"Pianificazione condivisa", t:"patologia **già in atto**<br>costruita **insieme al medico**"}]},
{id:"s42", tipo:"frase", tema:"chiaro", sopratitolo:"La pianificazione",
  testo:"Cronica e invalidante, o a inarrestabile evoluzione con *prognosi infausta*.",
  sotto:"Il medico e l'équipe sono tenuti ad attenersi."},
{id:"s43", tipo:"elenco", tema:"chiaro", sopratitolo:"Sul fine vita · art. 2", voci:[
  {t:"Astenersi da ogni **ostinazione irragionevole**", d:"e dai trattamenti inutili o sproporzionati"},
  {t:"**Sedazione palliativa profonda continua**", d:"davanti a sofferenze refrattarie, col consenso e con annotazione in cartella"}]},

{id:"s44", tipo:"tre", tema:"profondo", sopratitolo:"Sedazione palliativa ≠ eutanasia", box:[
  {n:"1", t:"Obiettivo", d:"la sedazione mira al **sintomo refrattario**, l'eutanasia alla **morte**"},
  {n:"2", t:"Mezzo", d:"farmaci e dosaggi **proporzionati** al controllo del sintomo"},
  {n:"3", t:"Proporzionalità", d:"la morte, quando arriva, è conseguenza della **malattia**"}]},
{id:"s45", tipo:"frase", tema:"chiaro", sopratitolo:"L'ordine conta",
  testo:"*Obiettivo, mezzo, proporzionalità.* Dilli in quest'ordine e la risposta è completa."},

{id:"s46", tipo:"elenco", tema:"chiaro", sopratitolo:"Il ruolo dell'infermiere",
  numerato:true, voci:RUOLO.map(t=>({t})), attive:[0,1,2]},
{id:"s47", tipo:"elenco", tema:"chiaro", sopratitolo:"Il ruolo dell'infermiere",
  numerato:true, voci:RUOLO.map(t=>({t}))},
{id:"s48", tipo:"frase", tema:"chiaro", sopratitolo:"Il caso classico",
  testo:"«Ho firmato senza capire.»",
  sotto:"La risposta corretta *non* è rassicurarlo, né spiegargli tu l'intervento."},
{id:"s49", tipo:"elenco", tema:"profondo", sopratitolo:"È questa", numerato:true, grandi:true, voci:[
  {t:"**Sospendere** il percorso"},
  {t:"**Informare** il medico"},
  {t:"**Documentare**"}],
  },

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Fine della micro-lezione 1.6",
  titolo:"1.7 Segreto, privacy<br>e tutela della persona", sottotitolo:"il dovere di tacere e il dovere di proteggere",
  ente:"Nella dispensa: il testo commentato, i quiz e la traccia di risposta già svolta"},
];
