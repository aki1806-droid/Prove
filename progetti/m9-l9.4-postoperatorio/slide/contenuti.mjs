// Contenuto delle 50 scene della lezione 9.4 — il post-operatorio
// immediato. Nessun corpo nuovo: la consegna SBAR è una griglia, l'ABC
// tre scene in sequenza, Aldrete una scala, Apfel una griglia a quattro,
// l'alzata in due tempi un percorso, il caso cifre e catena.

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 9 · Assistenza perioperatoria",
  titolo:"Il post-operatorio<br>immediato", sottotitolo:"9.4 · Sala risveglio, ABC, Aldrete, dolore, prima mobilizzazione",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"frase", tema:"chiaro", sopratitolo:"Micro-lezione 4 di 8",
  testo:"Le prime ore: la persona passa dall'anestesia alla coscienza, e gli effetti dei farmaci e dell'intervento **si sommano**."},
{id:"s03", tipo:"percorso", tema:"chiaro", sopratitolo:"Sala risveglio, poi reparto · l'approccio è sempre lo stesso, anche nel modulo 10", tappe:[
  {t:"A", d:"vie aeree", key:true}, {t:"B", d:"respiro"}, {t:"C", d:"circolo"}, {t:"…", d:"tutto il resto"}], attive:[0,1,2]},

{id:"s04", tipo:"frase", tema:"chiaro", sopratitolo:"La consegna · dall'anestesista e dall'équipe di sala all'infermiere della recovery room",
  testo:"Tutto comincia con una **consegna strutturata**, con lo **SBAR**."},
{id:"s05", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"Che cosa passa nella consegna", celle:[
  {t:"**Identità**, intervento"}, {t:"Tipo di **anestesia**"}, {t:"**Eventi** intraoperatori", key:true}, {t:"Liquidi e **perdite**"}, {t:"**Farmaci**: oppioidi, antagonisti"}, {t:"Analgesia, **drenaggi**, indicazioni"}]},
{id:"s06", tipo:"frase", tema:"chiaro", sopratitolo:"Un oppioide dato in sala e non riferito è una depressione respiratoria che nessuno si aspetta",
  testo:"Un'informazione persa qui si scopre **ore dopo**, quando è un problema."},

{id:"s07", tipo:"figura", tema:"chiaro", illu:"bocca",
  titolo:"A · le vie aeree",
  sotto:"il rischio principale: ostruzione da caduta della lingua, perché i muscoli sono ancora rilassati"},
{id:"s08", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"I segni dell'ostruzione", celle:[
  {n:"1", t:"**Russamento**", key:true}, {n:"2", t:"**Rientramenti**"}, {n:"3", t:"Movimento **paradosso** torace-addome"}, {n:"4", t:"**Desaturazione**"}]},
{id:"s09", tipo:"griglia", tema:"chiaro", colonne:1, spunta:true, sopratitolo:"Le manovre · se vomita: posizione laterale, aspiratore pronto e funzionante", celle:[
  {t:"**Sublussazione della mandibola** o sollevamento del mento", key:true}, {t:"**Cannula orofaringea** se non c'è ancora il riflesso faringeo"}]},

{id:"s10", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"B · il respiro · attenzione all'effetto residuo di oppioidi e miorilassanti", celle:[
  {t:"**Frequenza** respiratoria"}, {t:"**Saturazione**", key:true}, {t:"**Profondità** del respiro"}, {t:"**Ossigeno** secondo prescrizione"}]},
{id:"s11", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"C · il circolo", celle:[
  {t:"Frequenza cardiaca e **pressione**", key:true}, {t:"Colorito, **riempimento capillare**"}, {t:"**Perdite**: ferita, drenaggi"}, {t:"**Diuresi**"}]},
{id:"s12", tipo:"frase", tema:"chiaro", sopratitolo:"Il cuore compensa prima che la pressione scenda",
  testo:"Una **tachicardia nuova**, anche con pressione normale, può essere il primo segno di un **sanguinamento**."},

{id:"s13", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Gli altri controlli · i brividi aumentano il consumo di ossigeno e il dolore", celle:[
  {t:"**Coscienza** e orientamento"}, {t:"**Temperatura**: ipotermia, brividi", key:true}]},
{id:"s14", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"Gli altri controlli", celle:[
  {t:"**Dolore**, con la scala", key:true}, {t:"**Nausea** e vomito"}, {t:"**Ferita** e drenaggi"}, {t:"**Diuresi**"}, {t:"**Glicemia** se indicata"}]},
{id:"s15", tipo:"frase", tema:"chiaro", sopratitolo:"Dopo spinale o peridurale · finché le gambe non rispondono, la persona non si alza",
  testo:"**Sensibilità** e **ripresa della motilità** degli arti inferiori."},

{id:"s16", tipo:"frase", tema:"chiaro", sopratitolo:"Quando si può dimettere dalla sala risveglio?",
  testo:"Il punteggio di **Aldrete**: cinque parametri, da **0 a 2** punti ciascuno."},
{id:"s17", tipo:"scala", tema:"chiaro", sopratitolo:"I cinque parametri di Aldrete", gradini:[
  {n:"1", t:"Attività motoria"}, {n:"2", t:"Respirazione"}, {n:"3", t:"Circolazione: pressione rispetto al preoperatorio", key:true}, {n:"4", t:"Coscienza"}, {n:"5", t:"Saturazione, o colorito"}]},
{id:"s18", tipo:"cifre", tema:"chiaro", sopratitolo:"Il totale va da 0 a 10 · un solo parametro può non essere ancora al massimo", voci:[
  {n:"≥ 9", suf:"", d:"di norma trasferibile in reparto", key:true}]},
{id:"s19", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Nel day surgery · per la dimissione a casa, criteri specifici più ampi", celle:[
  {t:"**Dolore**"}, {t:"**Nausea**"}, {t:"**Sanguinamento**"}, {t:"Capacità di **camminare**", key:true}]},

{id:"s20", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Nausea e vomito postoperatori, PONV · i quattro fattori di Apfel", celle:[
  {n:"1", t:"Sesso **femminile**"}, {n:"2", t:"**Non fumatore**"}, {n:"3", t:"Storia di PONV o **mal d'auto**"}, {n:"4", t:"**Oppioidi** nel postoperatorio", key:true}]},
{id:"s21", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Più fattori, più rischio, più profilassi · se vomita", celle:[
  {t:"**Posizione laterale**", key:true}, {t:"Aspirazione se serve"}, {t:"**Antiemetico** secondo prescrizione"}, {t:"**Sostegno della ferita**: mani o cuscino"}]},
{id:"s22", tipo:"frase", tema:"chiaro", sopratitolo:"Prevenirla non è un dettaglio di comfort",
  testo:"Molti pazienti ricordano la nausea come l'esperienza **peggiore** dell'intervento, peggio del dolore."},

{id:"s23", tipo:"confronto", tema:"chiaro", sopratitolo:"Il dolore postoperatorio · con la scala, a intervalli regolari", col:[
  {h:"A riposo", t:"un dolore accettabile a letto…"}, {h:"In movimento", t:"…può **impedire di alzarsi** o di tossire", key:true}]},
{id:"s24", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"L'analgesia multimodale · farmaci diversi, su bersagli diversi, meno dose di ciascuno", celle:[
  {t:"**Paracetamolo**"}, {t:"**FANS** se non controindicati"}, {t:"**Oppioidi** al bisogno"}, {t:"**Loco-regionale**: la peridurale", key:true}]},
{id:"s25", tipo:"catena", tema:"chiaro", sopratitolo:"Come si somministra", passi:[
  {t:"A orario fisso", key:true}, {t:"Dose di soccorso per i picchi"}, {t:"Rivalutazione"}, {t:"Il dolore che non risponde si segnala"}]},
{id:"s26", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"L'obiettivo non è solo il comfort · prevenire le complicanze", celle:[
  {t:"**Respirare** profondamente", key:true}, {t:"**Tossire**"}, {t:"**Mobilizzarsi**"}]},

{id:"s27", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"La peridurale postoperatoria · sorveglianza specifica", celle:[
  {t:"Livello di **analgesia**"}, {t:"**Blocco motorio**", key:true}, {t:"**Pressione**"}, {t:"**Sedazione** e FR, se ci sono oppioidi"}, {t:"Sede del **catetere**"}]},
{id:"s28", tipo:"trappola", tema:"chiaro", sopratitolo:"Un segnale d'allarme preciso · il blocco motorio non dovrebbe aumentare, mai", righe:[
  {sb:"Blocco motorio che compare o aumenta, mal di schiena intenso, deficit nuovi", ok:"**Avvisare subito**"}]},
{id:"s29", tipo:"frase", tema:"chiaro", sopratitolo:"Qui le ore contano",
  testo:"Possono indicare un **ematoma epidurale**, che comprime il midollo e richiede un intervento **urgente**."},

{id:"s30", tipo:"griglia", tema:"chiaro", colonne:1, spunta:true, sopratitolo:"La ripresa dell'alimentazione · secondo ERAS", celle:[
  {t:"**Liquidi** già poche ore dopo, quando la persona è sveglia e senza nausea", key:true}, {t:"Poi alimentazione **progressiva**"}]},
{id:"s31", tipo:"trappola", tema:"chiaro", sopratitolo:"Un'altra abitudine rovesciata", righe:[
  {sb:"Aspettare la canalizzazione ai gas", ok:"Nella maggior parte degli interventi **non serve**: l'alimentazione precoce la favorisce"}]},
{id:"s32", tipo:"frase", tema:"chiaro", sopratitolo:"Soprattutto nell'anziano · il primo sorso d'acqua si osserva",
  testo:"Prima si verifica che **deglutizione** e **tosse** siano efficaci."},

{id:"s33", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"La prima mobilizzazione · il prima possibile, spesso già la sera · prima si valutano", celle:[
  {t:"**Parametri**"}, {t:"**Dolore**"}, {t:"**Nausea**"}, {t:"**Blocco motorio** residuo", key:true}]},
{id:"s34", tipo:"percorso", tema:"chiaro", sopratitolo:"L'alzata in due tempi della lezione 3.2 · la prima volta sempre accompagnata: l'ipotensione ortostatica è frequente", tappe:[
  {t:"Seduto", d:"al bordo del letto", key:true}, {t:"In piedi", d:"accompagnato"}], attive:[0,1]},
{id:"s35", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Drenaggi, cateteri e linee si gestiscono prima di muoversi · ci si ferma se compaiono · si torna seduti, non si insiste", celle:[
  {n:"!", t:"**Vertigini**", key:true}, {n:"!", t:"**Pallore**"}, {n:"!", t:"**Sudorazione**"}, {n:"!", t:"**Dispnea**"}]},

{id:"s36", tipo:"cifre", tema:"chiaro", sopratitolo:"La prima minzione · fattori di rischio di ritenzione: spinale, oppioidi, chirurgia pelvica, ipertrofia prostatica", voci:[
  {n:"6-8", suf:"ore", d:"attesa dall'intervento", key:true}]},
{id:"s37", tipo:"trappola", tema:"chiaro", sopratitolo:"Se non urina · lezione 3.6 · si misura, non si presume", righe:[
  {sb:"Pensare subito al catetere", ok:"Valutare il **globo** con il **bladder scanner**"}]},

{id:"s38", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Il delirium postoperatorio · frequentissimo nell'anziano · i fattori", celle:[
  {n:"1", t:"Età, **demenza** preesistente"}, {n:"2", t:"**Dolore**", key:true}, {n:"3", t:"**Farmaci**"}, {n:"4", t:"**Ipossia**"}, {n:"5", t:"**Ritenzione** urinaria, disidratazione"}, {n:"6", t:"Niente **occhiali** e apparecchi"}]},
{id:"s39", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Si riconosce con la CAM della lezione 2.3 · si previene · lo riprendiamo nel modulo 11", celle:[
  {t:"**Occhiali** e apparecchi restituiti subito", key:true}, {t:"Presenza dei **familiari**"}, {t:"Controllo del **dolore**"}, {t:"**Mobilizzazione** e **sonno**"}]},

{id:"s40", tipo:"cifre", tema:"chiaro", sopratitolo:"Il caso · due ore dopo una colecistectomia", voci:[
  {n:"78 → 112", suf:"bpm", d:"frequenza", key:true}, {n:"110/70", suf:"", d:"pressione, contro 140/85 prima"}]},
{id:"s41", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"Che cosa pensi?", celle:[
  {n:"!", t:"Paziente **pallido e agitato**"}, {n:"250", t:"**ml** di sangue dal drenaggio nell'ultima ora", key:true}]},
{id:"s42", tipo:"catena", tema:"chiaro", sopratitolo:"Emorragia postoperatoria con shock iniziale · la pressione «normale» è già trenta punti sotto quella del paziente", passi:[
  {t:"Sanguinamento"}, {t:"Tachicardia", key:true}, {t:"Agitazione, pallore"}, {t:"Poi: la pressione crolla"}]},
{id:"s43", tipo:"titolo", tema:"profondo",
  titolo:"La tachicardia arriva **prima**<br>del crollo della pressione.",
  sotto:""},
{id:"s44", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Che cosa fai?", celle:[
  {t:"**Avvisi subito** il chirurgo, con SBAR", key:true}, {t:"**Ossigeno**, parametri ravvicinati"}, {t:"**Accessi venosi**, prelievi, richiesta di **emocomponenti**"}, {t:"**Digiuno**: possibile reintervento"}]},

{id:"s45", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"In Veneto", celle:[
  {n:"1", t:"**Recovery room** con criteri condivisi di dimissibilità", key:true}, {n:"2", t:"Servizio per il **dolore acuto postoperatorio**"}]},
{id:"s46", tipo:"frase", tema:"chiaro", sopratitolo:"Infermieri dedicati che seguono peridurali e PCA nei reparti",
  testo:"Un esempio della rete della **legge 38** della lezione 3.7."},

{id:"s47", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Ricapitoliamo", celle:[
  {n:"→", t:"Consegna **SBAR**"}, {n:"A", t:"Ostruzione da lingua: **sublussazione** della mandibola", key:true}, {n:"B C", t:"Saturazione, pressione, **perdite**"}, {n:"≥ 9", t:"**Aldrete** 0-10: trasferibile"}]},
{id:"s48", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Ricapitoliamo", celle:[
  {n:"4", t:"**Apfel**: donna, non fumatore, storia di nausea, oppioidi"}, {n:"→", t:"Analgesia **multimodale**, a riposo e in movimento", key:true}, {n:"!", t:"Peridurale: **blocco motorio in aumento** = allarme"}, {n:"6-8 h", t:"Prima **minzione**"}]},
{id:"s49", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Nella prossima lezione · le complicanze postoperatorie", celle:[
  {n:"1", t:"**Emorragia**", key:true}, {n:"2", t:"**Infezioni**"}, {n:"3", t:"**Trombosi**"}, {n:"4", t:"**Deiscenza** della ferita"}]},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione",
  titolo:"9.5<br>Le complicanze<br>postoperatorie", sottotitolo:"Riconoscerle presto",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
