// Contenuto delle 50 scene della lezione 7.4. *accento*  **accento in semibold**
//
// Corso «Progressione verticale · Comparto Sanità», Modulo 7. Categorie particolari e dato sanitario:
// GDPR artt. 4 (n. 13-15), 9, 10; Codice artt. 2-sexies, 2-septies, 82; dossier (Garante 2015) e FSE.

const ENTE = "CISL FP Padova Rovigo · Progressione verticale · Comparto Sanità";

const TRE_COSE = [
  "L'**art. 9** vieta di trattare le categorie particolari (salute, dati **genetici** e **biometrici**…), salvo **dieci eccezioni**",
  "La cura si fonda sulla **lettera h** con il **segreto** del par. 3, non sul consenso; il consenso **esplicito** serve per attività non di cura",
  "Dati sulla salute **mai diffusi**; dossier **con** consenso, fascicolo alimentato **senza**; accessi **tracciati**, solo chi cura consulta",
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 7 · Trattamento dei dati personali",
  titolo:"Categorie particolari<br>e dato sanitario", sottotitolo:"Lezione 7.4", ente:ENTE},

// --- 1 · aggancio
{id:"s02", tipo:"illustrata", tema:"chiaro", ill:"cartellaclinica", sopratitolo:"Una curiosità in corsia",
  titolo:"La cartella del **vicino**", punti:[
    {icona:"persona", t:"ricoverato in un **altro reparto**"},
    {icona:"divieto", t:"non lo segue, non lo **cura**"},
    {icona:"occhio", t:"nessuno la vede. **O forse sì**", key:true}],
  etichette:{alto:{t:"Accesso", key:true}}},
{id:"s03", tipo:"illustrata", tema:"chiaro", ill:"impronta", sopratitolo:"Ogni accesso lascia una traccia",
  titolo:"I dati più **protetti**", punti:[
    {icona:"cuoremano", t:"i dati sulla **salute**"},
    {icona:"documento", t:"ogni accesso è **registrato**", key:true}],
  etichette:{alto:{t:"Traccia", key:true}, sx:"Operatore", dx:"Registro"}},
{id:"s04", tipo:"titolo", tema:"profondo",
  titolo:"Alcuni dati raccontano<br>la parte più **fragile** di una persona."},

// --- 2 · rotta
{id:"s05", tipo:"flusso", tema:"chiaro", sopratitolo:"Quattro passaggi", passi:[
  {icona:"divieto", t:"Il divieto", d:"art. 9"},
  {icona:"spunta", t:"Le eccezioni"},
  {icona:"ospedale", t:"In azienda", d:"cura e segreto", key:true},
  {icona:"cartella", t:"Dossier e fascicolo"}]},

// --- 3 · il divieto
{id:"s06", tipo:"confronto", tema:"chiaro", sopratitolo:"GDPR, art. 9, par. 1 · il punto di partenza", col:[
  {h:"È vietato", t:"trattare le **categorie particolari** di dati", key:true},
  {h:"Un tempo", t:"si chiamavano **dati sensibili**"}]},
{id:"s07", tipo:"icone", tema:"chiaro", sopratitolo:"Dati che rivelano", voci:[
  {icona:"persone", t:"Origine **razziale** o etnica"},
  {icona:"chat",    t:"Opinioni **politiche**"},
  {icona:"libro",   t:"Convinzioni **religiose** o filosofiche"},
  {icona:"persona", t:"Appartenenza **sindacale**"}]},
{id:"s08", tipo:"icone", tema:"chiaro", sopratitolo:"E poi", voci:[
  {icona:"goccia",    t:"Dati **genetici**"},
  {icona:"occhio",    t:"Dati **biometrici** che identificano"},
  {icona:"cuoremano", t:"Dati sulla **salute**"},
  {icona:"lucchetto", t:"Vita e orientamento **sessuale**"}]},
{id:"s09", tipo:"tre", tema:"chiaro", attive:[0,1,2], sopratitolo:"Perché una tutela rafforzata: il rischio di", box:[
  {n:"1", t:"Discriminazioni", d:"nel lavoro e nella vita"},
  {n:"2", t:"Esclusioni", d:"dalle relazioni"},
  {n:"3", t:"Danni", d:"alla reputazione, difficili da riparare"}]},
{id:"s10", tipo:"illustrata", tema:"chiaro", ill:"cartellaclinica", sopratitolo:"Art. 4, n. 15 · una definizione ampia",
  titolo:"Il dato **sulla salute**", punti:[
    {icona:"cuoremano", t:"salute **fisica** o **mentale**"},
    {icona:"ospedale", t:"anche la **prestazione** di servizi sanitari"},
    {icona:"persona", t:"anche «è ricoverato in **oncologia**»", key:true}],
  etichette:{alto:{t:"Dato sanitario", key:true}}},
{id:"s11", tipo:"icone", tema:"chiaro", sopratitolo:"Anche i dati del personale", voci:[
  {icona:"certificato", t:"Certificato di **malattia**"},
  {icona:"avviso",      t:"Idoneità con **limitazioni**"},
  {icona:"persone",     t:"Permessi per un familiare **disabile**"},
  {icona:"cuoremano",   t:"Sono dati sulla **salute**"}]},
{id:"s12", tipo:"confronto", tema:"chiaro", sopratitolo:"Una disciplina a parte", col:[
  {h:"Condanne e reati", t:"non sono categorie particolari"},
  {h:"Art. 10", t:"regole proprie, nel regolamento e nel **Codice**", key:true}]},
{id:"s13", tipo:"trappola", tema:"tenue", sopratitolo:"Occhio a un distrattore", righe:[
  {sb:"Il dato sanitario è solo la diagnosi",
   ok:"Anche un appuntamento specialistico può rivelare la salute"}]},
{id:"s14", tipo:"titolo", tema:"profondo",
  titolo:"Prima il **divieto**,<br>poi le **eccezioni**, sempre precise."},

// --- 4 · le eccezioni
{id:"s15", tipo:"contatore", tema:"chiaro", sopratitolo:"Art. 9, par. 2",
  valori:[{n:10, t:"casi in cui il divieto non vale", key:true}],
  sotto:"Per chi lavora in sanità, alcuni sono **decisivi**."},
{id:"s16", tipo:"confronto", tema:"chiaro", sopratitolo:"Lettera a · un gradino in più", col:[
  {h:"Dati comuni", t:"consenso **inequivocabile**"},
  {h:"Categorie particolari", t:"consenso **esplicito**", key:true}]},
{id:"s17", tipo:"tre", tema:"chiaro", attive:[0,1,2], sopratitolo:"Lettere b, c, f", box:[
  {n:"b", t:"Lavoro", d:"e sicurezza sociale"},
  {n:"c", t:"Interesse vitale", d:"di chi non può consentire"},
  {n:"f", t:"Diritti in giudizio", d:"accertarli o difenderli"}]},
{id:"s18", tipo:"norma", tema:"chiaro", etichetta:"Art. 9, par. 2, lett. g", sigla:"Interesse rilevante",
  testo:"Pubblico, sul diritto dell'Unione o dello Stato, con misure **appropriate e specifiche**."},
{id:"s19", tipo:"illustrata", tema:"chiaro", ill:"ospedale", sopratitolo:"Art. 9, par. 2, lett. h",
  titolo:"La base della **cura**", punti:[
    {icona:"scudo", t:"medicina **preventiva** e del **lavoro**"},
    {icona:"cuoremano", t:"diagnosi, assistenza, **terapia**"},
    {icona:"ingranaggio", t:"gestione dei **servizi** sanitari", key:true}],
  etichette:{}},
{id:"s20", tipo:"confronto", tema:"chiaro", sopratitolo:"Lettere i e j", col:[
  {h:"Sanità pubblica", t:"per esempio gravi **minacce** per la salute"},
  {h:"Ricerca, archivio, statistica", t:"con **garanzie** adeguate", key:true}]},
{id:"s21", tipo:"illustrata", tema:"chiaro", ill:"cassaforte", sopratitolo:"Art. 9, par. 3 · la condizione della lettera h",
  titolo:"Il **segreto**", punti:[
    {icona:"persona", t:"un professionista col **segreto professionale**"},
    {icona:"persone", t:"o altre persone tenute alla **segretezza**", key:true}],
  etichette:{alto:{t:"Segreto", key:true}}},
{id:"s22", tipo:"confronto", tema:"chiaro", sopratitolo:"Art. 9, par. 4", col:[
  {h:"Gli Stati possono", t:"aggiungere **condizioni** per dati genetici, biometrici, sanitari"},
  {h:"L'Italia", t:"lo ha fatto nel **Codice**", key:true}]},
{id:"s23", tipo:"illustrata", tema:"chiaro", ill:"organigramma", sopratitolo:"Anche l'appartenenza sindacale",
  titolo:"La quota in **busta paga**", punti:[
    {icona:"euro", t:"la **trattenuta** passa dall'ufficio del personale"},
    {icona:"lucchetto", t:"con la stessa **riservatezza**", key:true}],
  etichette:{top:"Ufficio del personale", basso:{t:"Riservatezza", key:true}}},
{id:"s24", tipo:"trappola", tema:"tenue", sopratitolo:"Un distrattore frequente", righe:[
  {sb:"Per le categorie particolari serve sempre il consenso",
   ok:"È una delle eccezioni, e in sanità non la principale"}]},
{id:"s25", tipo:"titolo", tema:"profondo",
  titolo:"La cura è un'eccezione **prevista**,<br>non un favore **concesso**."},

// --- 5 · il dato sanitario in azienda
{id:"s26", tipo:"flusso", tema:"chiaro", sopratitolo:"Perché in ospedale non si chiede il consenso per curare", passi:[
  {icona:"cuoremano", t:"Diagnosi e terapia"},
  {icona:"libro", t:"Lettera h", d:"e segreto"},
  {icona:"sigillo", t:"Garante, 2019", d:"lo ha chiarito", key:true}]},
{id:"s27", tipo:"icone", tema:"chiaro", sopratitolo:"Il consenso serve per ciò che non è cura", voci:[
  {icona:"chat",      t:"Alcune **applicazioni**"},
  {icona:"documento", t:"Referti **online**"},
  {icona:"avviso",    t:"Iniziative **promozionali**"},
  {icona:"spunta",    t:"Servizi **facoltativi**"}]},
{id:"s28", tipo:"norma", tema:"chiaro", etichetta:"Codice, art. 2-sexies", sigla:"I compiti del SSN",
  testo:"Tra i trattamenti di **interesse pubblico rilevante**."},
{id:"s29", tipo:"confronto", tema:"chiaro", sopratitolo:"Codice, art. 2-septies", col:[
  {h:"Misure di garanzia", t:"affidate al **Garante**"},
  {h:"Un divieto netto", t:"i dati sulla salute **non si diffondono**", key:true}]},
{id:"s30", tipo:"illustrata", tema:"chiaro", ill:"sportello", sopratitolo:"Il segreto riguarda tutti",
  titolo:"Non solo chi **cura**", punti:[
    {icona:"persona", t:"medici e **infermieri**"},
    {icona:"persone", t:"amministrazione, **accettazione**, servizi", key:true}],
  etichette:{insegna:{t:"Segreto d'ufficio", key:true}}},
{id:"s31", tipo:"confronto", tema:"chiaro", sopratitolo:"Gesti di ogni giorno", col:[
  {h:"In sala d'attesa", t:"si chiama con un **numero**, non con la malattia"},
  {h:"I referti", t:"all'**interessato** o a un suo **delegato**", key:true}]},
{id:"s32", tipo:"illustrata", tema:"chiaro", ill:"busta", sopratitolo:"Un familiare telefona in reparto",
  titolo:"Solo a chi è **indicato**", punti:[
    {icona:"chat", t:"«Come sta mio padre?»"},
    {icona:"persona", t:"informazioni solo a chi il paziente ha **indicato**", key:true}],
  etichette:{sx:"Reparto", dx:"Familiare", alto:{t:"Informazioni", key:true}}},
{id:"s33", tipo:"flusso", tema:"chiaro", sopratitolo:"Nelle emergenze", passi:[
  {icona:"avviso", t:"Prima la cura", key:true},
  {icona:"orologio", t:"Poi", d:"quando è possibile"},
  {icona:"documento", t:"L'informativa"}]},
{id:"s34", tipo:"trappola", tema:"tenue", sopratitolo:"Attenzione", righe:[
  {sb:"È il modulo firmato che rende lecita la cura",
   ok:"È la legge, con il segreto professionale"}]},
{id:"s35", tipo:"titolo", tema:"profondo",
  titolo:"**Curare** senza chiedere il consenso,<br>**proteggere**<br>senza eccezioni."},

// --- 6 · dossier, fascicolo, accessi
{id:"s36", tipo:"confronto", tema:"chiaro", sopratitolo:"Due strumenti digitali", col:[
  {h:"Dossier sanitario", t:"gli eventi clinici **nella stessa azienda**", key:true},
  {h:"Fascicolo sanitario", t:"la storia clinica **tra strutture diverse**"}]},
{id:"s37", tipo:"illustrata", tema:"chiaro", ill:"archivio", sopratitolo:"Linee guida del Garante",
  titolo:"Il dossier: un **consenso** a parte", punti:[
    {icona:"spunta", t:"**specifico** e facoltativo"},
    {icona:"cuoremano", t:"chi non lo dà è **curato** lo stesso", key:true}],
  etichette:{cassetto:{t:"Dossier", key:true}}},
{id:"s38", tipo:"confronto", tema:"chiaro", sopratitolo:"Il fascicolo sanitario elettronico, dal 2020", col:[
  {h:"Alimentazione", t:"**senza** consenso"},
  {h:"Consultazione", t:"dei professionisti **con** il consenso", key:true}]},
{id:"s39", tipo:"illustrata", tema:"chiaro", ill:"sito", sopratitolo:"Regionale, collegato a livello nazionale",
  titolo:"Consultabile **online**", punti:[
    {icona:"documento", t:"**referti** e lettere di dimissione"},
    {icona:"scudo", t:"**vaccinazioni**", key:true}],
  etichette:{barra:"Fascicolo sanitario", menu:{t:"I miei documenti", key:true}}},
{id:"s40", tipo:"illustrata", tema:"chiaro", ill:"documento", sopratitolo:"In entrambi",
  titolo:"L'**oscuramento**", punti:[
    {icona:"cartella", t:"l'evento **resta** nella documentazione"},
    {icona:"lucchetto", t:"ma **non è visibile** a tutti", key:true}],
  etichette:{titolo:"Evento clinico", sigillo:{t:"Oscurato", key:true}}},
{id:"s41", tipo:"flusso", tema:"chiaro", sopratitolo:"Gli accessi sono tracciati", passi:[
  {icona:"persona", t:"Chi"},
  {icona:"cartella", t:"Che cosa"},
  {icona:"orologio", t:"Quando"},
  {icona:"occhio", t:"Si controlla", key:true}]},
{id:"s42", tipo:"tre", tema:"chiaro", attive:[0,1,2], sopratitolo:"L'operatrice curiosa: nessuna finalità di cura", box:[
  {n:"1", t:"Trattamento illecito", d:"non ha una base"},
  {n:"2", t:"Illecito disciplinare", d:"può esserlo"},
  {n:"3", t:"Reato", d:"nei casi più gravi"}]},
{id:"s43", tipo:"trappola", tema:"tenue", sopratitolo:"Attenzione", righe:[
  {sb:"Chi ha le credenziali può consultare qualsiasi cartella",
   ok:"Solo i pazienti che si seguono, per il tempo necessario"}]},
{id:"s44", tipo:"titolo", tema:"profondo",
  titolo:"Ogni accesso lascia una **traccia**,<br>ogni traccia chiede una **ragione**."},

// --- 7 · le tre cose
{id:"s45", tipo:"memo", tema:"chiaro", attive:[0], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s46", tipo:"memo", tema:"chiaro", attive:[0,1], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s47", tipo:"memo", tema:"chiaro", attive:[0,1,2], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s48", tipo:"trappola", tema:"tenue", sopratitolo:"L'ultimo distrattore", righe:[
  {sb:"La riservatezza è un obbligo del solo personale sanitario",
   ok:"Vale per chiunque, in azienda, tratti quei dati"}]},

// --- 8 · chiusura
{id:"s49", tipo:"titolo", tema:"profondo",
  titolo:"Un **divieto** forte,<br>eccezioni precise,<br>un **segreto** che vale per tutti.",
  sotto:"Prossima lezione: i diritti dell'interessato."},

{id:"s50", tipo:"copertina", tema:"profondo", modulo:"Prossima lezione",
  titolo:"Lezione 7.5", sottotitolo:"I diritti<br>dell'interessato", ente:ENTE},
];
