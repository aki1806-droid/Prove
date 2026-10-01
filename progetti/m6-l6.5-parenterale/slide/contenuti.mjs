// Contenuto delle 50 scene della lezione 6.5 — la nutrizione parenterale.
// Un corpo nuovo: la sacca, in due modi. Multicamera, con le tre camere e i
// setti tratteggiati che si rompono e il contenuto che si mescola; e le due
// sacche dell'emulsione, quella con l'affioramento omogeneo (si usa) e quella
// con le gocce d'olio e lo strato giallastro (non si usa). Il resto sono i
// corpi delle regole: confronto, trappola, cifre, percorso, colonne.

const COMPL = [
 {h:"Metaboliche", key:true, voci:[{t:"**Iperglicemia**; ipoglicemia da sospensione brusca"}, {t:"Squilibri elettrolitici, ipertrigliceridemia"}, {t:"Prolungate: **steatosi e colestasi**", key:true}]},
 {h:"Meccaniche", voci:[{t:"Quelle del catetere centrale"}, {t:"Dall'occlusione all'embolia gassosa"}]},
 {h:"Intestinali", voci:[{t:"**Atrofia della mucosa**"}, {t:"Appena possibile, si torna all'enterale", key:true}]},
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 6 · Accessi vascolari, terapia infusionale ed emocomponenti",
  titolo:"Nutrizione<br>parenterale", sottotitolo:"6.5 · Quando l'intestino non può essere usato",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"frase", tema:"chiaro", sopratitolo:"Micro-lezione 5 di 8 · il principio della lezione 3.4",
  testo:"Se l'intestino funziona, **si usa l'intestino**."},
{id:"s03", tipo:"frase", tema:"chiaro", sopratitolo:"La parenterale è ciò che si fa quando l'intestino non può essere usato, o non basta",
  testo:"Una terapia potente e complessa, con rischi **infettivi** e **metabolici** precisi."},
{id:"s04", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"La sua sicurezza dipende in larga parte dalla gestione infermieristica", celle:[
  {n:"1", t:"La **via**"}, {n:"2", t:"La **sacca**", key:true}, {n:"3", t:"La **pompa**"}, {n:"4", t:"Il **monitoraggio**"}]},

{id:"s05", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Le indicazioni · un intestino non utilizzabile", celle:[
  {n:"1", t:"**Occlusione**, ileo prolungato"}, {n:"2", t:"Ischemia"}, {n:"3", t:"**Fistole** ad alta portata"}, {n:"4", t:"**Intestino corto**", key:true}, {n:"5", t:"Mucosite grave"}, {n:"6", t:"Enterale **insufficiente**: la parenterale si aggiunge"}]},
{id:"s06", tipo:"trappola", tema:"chiaro", sopratitolo:"E il contrario", righe:[
  {sb:"Parenterale con un intestino che funziona", ok:"**Non è indicata**: meno fisiologica, più costosa, più rischiosa"}]},

{id:"s07", tipo:"confronto", tema:"chiaro", sopratitolo:"Due modalità", col:[
  {h:"Centrale", t:"Osmolarità **> 900 mOsm/L**: solo un vaso grosso la tollera. **CVC o PICC**, lume dedicato", key:true},
  {h:"Periferica", t:"Sotto i 900, per periodi brevi: vena periferica o Midline, con le attenzioni alla flebite della 6.1"}]},
{id:"s08", tipo:"cifre", tema:"chiaro", sopratitolo:"La soglia", voci:[
  {n:"900", suf:"mOsm/L", d:"sopra: centrale, CVC o PICC", key:true}, {n:"< 900", d:"periferica, breve durata"}]},
{id:"s09", tipo:"frase", tema:"chiaro", sopratitolo:"La regola",
  testo:"La via la decide l'**osmolarità della sacca**, scritta in etichetta. Prima di collegare, si legge."},
{id:"s10", tipo:"trappola", tema:"chiaro", sopratitolo:"Ricordi il Midline della lezione 6.2", righe:[
  {sb:"Una sacca centrale in un Midline", ok:"**Mai**: la punta è periferica, e 900 mOsm/L in una vena periferica sono una **flebite chimica**"}]},

{id:"s11", tipo:"sacca", tema:"chiaro", sopratitolo:"Le sacche · binarie (glucosio e aminoacidi) e ternarie, «tre in uno», con anche i lipidi", testo:"Sacca ternaria multicamera", sotto:"glucosio · aminoacidi · lipidi, separati dai setti"},
{id:"s12", tipo:"sacca", tema:"chiaro", sopratitolo:"Industriali, multicamera · si attivano rompendo i setti subito prima dell'uso: se dimenticato, si infonde una sola componente", attivata:true, sotto:"il passaggio che non si dimentica"},
{id:"s13", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"Oppure allestite in farmacia, su misura", celle:[
  {n:"1", t:"**Vitamine e oligoelementi**: aggiunti secondo procedura, in condizioni asettiche", key:true}, {n:"2", t:"Di norma **non in reparto**"}]},

{id:"s14", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Prima di collegare, i controlli · le sette G, per una sacca che vale un farmaco ad alto rischio", celle:[
  {t:"Prescrizione, **paziente**, composizione"}, {t:"**Via** prevista, scadenza", key:true}, {t:"**Integrità** della sacca"}, {t:"**Setti rotti**, contenuto miscelato"}]},
{id:"s15", tipo:"sacca", tema:"chiaro", sopratitolo:"L'aspetto dell'emulsione lipidica · un leggero affioramento biancastro omogeneo, che si rimescola capovolgendo la sacca", modo:"emulsione", attive:[0]},
{id:"s16", tipo:"sacca", tema:"chiaro", sopratitolo:"Gocce d'olio o uno strato giallastro separato · la rottura dell'emulsione: i lipidi non più emulsionati sono un rischio embolico", modo:"emulsione"},
{id:"s17", tipo:"frase", tema:"chiaro", sopratitolo:"Un controllo a occhio, che vale quanto quelli sull'etichetta",
  testo:"Una sacca rotta si **restituisce alla farmacia**, non si prova."},

{id:"s18", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"La somministrazione", celle:[
  {n:"1", t:"Sempre con **pompa volumetrica**"},
  {n:"2", t:"**Lume dedicato**: niente farmaci, niente prelievi da quel lume. Ogni accesso è contaminazione e incompatibilità", key:true}]},
{id:"s19", tipo:"cifre", tema:"chiaro", sopratitolo:"Filtro secondo procedura · i lipidi favoriscono la crescita batterica", voci:[
  {n:"24", suf:"h", d:"il deflussore, se la sacca contiene lipidi", key:true}]},
{id:"s20", tipo:"griglia", tema:"chiaro", colonne:1, spunta:true, sopratitolo:"La sacca e la linea", celle:[
  {t:"Infusa nel **tempo previsto**: di solito entro 24 ore dall'apertura", key:true}, {t:"Linea **etichettata**: nutrizione parenterale, data e ora di apertura"}]},

{id:"s21", tipo:"frase", tema:"chiaro", sopratitolo:"Una regola specifica della parenterale",
  testo:"La **gradualità**: si avvia a velocità ridotta e si aumenta secondo prescrizione, nell'arco di ore o giorni."},
{id:"s22", tipo:"titolo", tema:"profondo",
  titolo:"**Non si interrompe** bruscamente.",
  sotto:"L'insulina è salita con il glucosio continuo: se il glucosio si ferma di colpo, ipoglicemia di rimbalzo."},
{id:"s23", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"Se la sacca finisce prima della successiva, o l'infusione si interrompe", celle:[
  {n:"1", t:"Si segue la procedura: spesso una **glucosata**", key:true}, {n:"2", t:"Si controlla la **glicemia**"}]},
{id:"s24", tipo:"trappola", tema:"chiaro", sopratitolo:"E se l'infusione è in ritardo", righe:[
  {sb:"Accelerare per recuperare", ok:"**Non si accelera**: il glucosio in più all'ora è iperglicemia, non recupero"}]},

{id:"s25", tipo:"frase", tema:"chiaro", sopratitolo:"Il monitoraggio · la complicanza metabolica più comune",
  testo:"**Glicemia** frequente all'avvio, poi secondo protocollo: l'iperglicemia spesso richiede insulina secondo prescrizione."},
{id:"s26", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Il monitoraggio", celle:[
  {n:"1", t:"Elettroliti: **potassio, fosforo, magnesio**", key:true}, {n:"2", t:"Funzione epatica e **trigliceridi**, per i lipidi"},
  {n:"3", t:"Funzione renale"}, {n:"4", t:"Peso e **bilancio idrico**, come per ogni infusione (6.3)"}]},
{id:"s27", tipo:"frase", tema:"chiaro", sopratitolo:"E la temperatura",
  testo:"La febbre in un paziente in parenterale fa pensare subito **al catetere**, prima che a qualunque altra cosa."},

{id:"s28", tipo:"frase", tema:"chiaro", sopratitolo:"La sindrome da rialimentazione · vista con l'enterale nella 3.4",
  testo:"Con la parenterale è ancora più insidiosa: il glucosio arriva **direttamente in vena**."},
{id:"s29", tipo:"catena", tema:"chiaro", sopratitolo:"Paziente malnutrito grave o a lungo digiuno", passi:[
  {t:"Glucosio"}, {t:"Insulina"}, {t:"P, K, Mg", d:"entrano nelle cellule", key:true}, {t:"Ipofosfatemia"}]},
{id:"s30", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"L'ipofosfatemia · cuore e muscoli respiratori restano senza fosforo", celle:[
  {n:"!", t:"**Aritmie**", key:true}, {n:"!", t:"Insufficienza **cardiaca** e **respiratoria**"}]},
{id:"s31", tipo:"percorso", tema:"chiaro", sopratitolo:"La prevenzione", tappe:[
  {t:"Identificare", d:"i pazienti a rischio"}, {t:"Avviare lentamente", key:true}, {t:"Elettroliti", d:"monitorare e correggere"}, {t:"Tiamina", d:"secondo prescrizione, prima di iniziare"}]},

{id:"s32", tipo:"frase", tema:"chiaro", sopratitolo:"Le complicanze infettive",
  testo:"La parenterale è un **fattore di rischio per le CLABSI**: nutrienti, catetere centrale, settimane."},
{id:"s33", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Il bundle di gestione della 6.2, con il massimo rigore", celle:[
  {t:"Igiene delle mani"}, {t:"**Scrub the hub**"}, {t:"Medicazione"}, {t:"**Lume dedicato**, cambio dei set", key:true}]},
{id:"s34", tipo:"confronto", tema:"chiaro", sopratitolo:"Febbre o brivido · emocolture appaiate e avviso al medico", col:[
  {h:"Un set", t:"dal **catetere**", key:true}, {h:"Un set", t:"da **vena periferica**, nello stesso momento"}]},

{id:"s35", tipo:"colonne", tema:"chiaro", sopratitolo:"Le altre complicanze", attive:[0], colonne:COMPL},
{id:"s36", tipo:"colonne", tema:"chiaro", sopratitolo:"Le altre complicanze", attive:[0,1], colonne:COMPL},
{id:"s37", tipo:"colonne", tema:"chiaro", sopratitolo:"L'atrofia della mucosa · la ragione per cui si torna all'enterale, anche solo in parte", colonne:COMPL},

{id:"s38", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"I limiti dell'infermiere · la sacca è un preparato della farmacia, e si collega com'è", celle:[
  {n:"✗", t:"Non modifica **composizione** né **velocità** prescritte", key:true}, {n:"✗", t:"Non aggiunge **farmaci** alla sacca"}]},
{id:"s39", tipo:"catena", tema:"chiaro", sopratitolo:"Segnala: glicemie fuori range, intolleranza, febbre, problemi del catetere · lo schema di tutte le terapie ad alto rischio", passi:[
  {t:"Eseguire"}, {t:"Sorvegliare"}, {t:"Segnalare", key:true}]},
{id:"s40", tipo:"griglia", tema:"chiaro", colonne:1, spunta:true, sopratitolo:"La nutrizione parenterale domiciliare · l'educazione della persona e del caregiver", celle:[
  {t:"Gestione **asettica** del catetere", key:true}, {t:"Collegamento della sacca"}, {t:"I **segni di allarme**"}]},

{id:"s41", tipo:"frase", tema:"chiaro", sopratitolo:"Il caso · paziente in nutrizione parenterale centrale",
  testo:"Alle 22 la sacca finisce; la nuova arriva **domattina**. Che cosa fai?"},
{id:"s42", tipo:"percorso", tema:"chiaro", sopratitolo:"Che cosa fai · non lasci il paziente senza apporto di glucosio", tappe:[
  {t:"Glucosata", d:"secondo procedura", key:true}, {t:"Medico", d:"per la prescrizione"}, {t:"Glicemia", d:"nelle ore successive"}, {t:"Lume dedicato", d:"come da procedura"}, {t:"Documentare"}]},
{id:"s43", tipo:"frase", tema:"chiaro", sopratitolo:"Per intercettare un'ipoglicemia di rimbalzo",
  testo:"La glucosata è **un ponte**, non una sostituzione."},

{id:"s44", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"In Veneto", celle:[
  {n:"1", t:"**Servizi di Dietetica e Nutrizione Clinica**: prescrizione e follow-up", key:true}, {n:"2", t:"Sacche personalizzate allestite in **farmacia**"}]},
{id:"s45", tipo:"frase", tema:"chiaro", sopratitolo:"La Nutrizione Artificiale Domiciliare · la stessa catena vista per l'enterale",
  testo:"Presa in carico **distrettuale**: forniture, controlli, addestramento del caregiver."},

{id:"s46", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"La sintesi", celle:[
  {t:"Centrale **> 900 mOsm/L**, CVC o PICC; periferica < 900, breve durata"}, {t:"**Lume dedicato**", key:true}, {t:"Set con lipidi ogni **24 ore**"}]},
{id:"s47", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"La sintesi", celle:[
  {t:"Avvio e sospensione **graduali**"}, {t:"**Glicemia** frequente"}, {t:"Rialimentazione: attenzione al **fosforo**", key:true}, {t:"**Febbre**: pensare al catetere"}]},

{id:"s48", tipo:"frase", tema:"chiaro", sopratitolo:"Una frase per chiudere",
  testo:"La parenterale si usa **quando l'intestino non può essere usato**, e si sospende appena può esserlo di nuovo."},
{id:"s49", tipo:"frase", tema:"chiaro", sopratitolo:"Nella prossima lezione",
  testo:"La **trasfusione**: una delle procedure in cui un errore di identificazione può essere fatale."},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione",
  titolo:"6.6<br>Emocomponenti<br>ed emotrasfusione", sottotitolo:"Ogni identificazione si fa al letto del paziente",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
