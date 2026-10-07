// Contenuto delle 50 scene della lezione 12.6 — la sicurezza sul lavoro in
// sanità. Le figure della prevenzione una per scena; il preposto come scala
// vigila → interviene → interrompe; le fasce MAPO come scala a tre gradini;
// le due tabelle finali riprendono la tabella del copione.

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 12 · Organizzazione, normativa nazionale e sicurezza sul lavoro",
  titolo:"La sicurezza sul lavoro<br>in sanità", sottotitolo:"12.6 · Il D.Lgs. 81/2008, le figure della prevenzione, i rischi specifici",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"frase", tema:"chiaro", sopratitolo:"Micro-lezione 6 di 8 · questa lezione riguarda prima di tutto te",
  testo:"Chi cura la sicurezza dei pazienti è **esposto a sua volta** a rischi importanti."},
{id:"s03", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"I rischi del lavoro in sanità · ciascuno con le sue regole", celle:[
  {n:"!", t:"**Punture** accidentali", key:true}, {n:"!", t:"**Mal di schiena** da movimentazione"}, {n:"!", t:"Sostanze **chimiche**"},
  {n:"!", t:"**Radiazioni**"}, {n:"!", t:"**Stress**"}, {n:"!", t:"**Aggressioni**"}]},
{id:"s04", tipo:"norma", tema:"chiaro", etichetta:"Testo unico sulla salute e sicurezza sul lavoro", sigla:"D.Lgs. 81/2008",
  testo:"Una domanda d'esame **quasi certa**, e una tutela concreta per te."},

{id:"s05", tipo:"catena", tema:"chiaro", sopratitolo:"D.Lgs. 9 aprile 2008, n. 81 · tutti i settori, pubblici e privati · il primo principio", passi:[
  {t:"**Valutare** tutti i rischi"}, {t:"**Eliminarli**", d:"o ridurli alla fonte", key:true}]},
{id:"s06", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Gli altri principi", celle:[
  {t:"Priorità alle misure **collettive** su quelle individuali", key:true}, {t:"**Informazione**"},
  {t:"**Formazione** e **addestramento**"}, {t:"**Partecipazione** dei lavoratori"}]},
{id:"s07", tipo:"titolo", tema:"profondo",
  titolo:"Prima l'organizzazione<br>e l'attrezzatura.<br>**Poi i DPI**.",
  sotto:""},

{id:"s08", tipo:"confronto", tema:"chiaro", sopratitolo:"Le figure della prevenzione · da conoscere una per una", col:[
  {h:"Il datore di lavoro", t:"la prima figura"}, {h:"Nelle aziende sanitarie", t:"il **direttore generale**", grande:true}]},
{id:"s09", tipo:"tre", tema:"chiaro", sopratitolo:"Il datore di lavoro · due obblighi non delegabili", box:[
  {n:"1", t:"Valutazione dei rischi", d:"con l'elaborazione del **DVR**, il documento di valutazione dei rischi"},
  {n:"2", t:"Nomina dell'RSPP", d:"il responsabile del servizio di **prevenzione e protezione**", key:true}]},
{id:"s10", tipo:"catena", tema:"chiaro", sopratitolo:"Il dirigente · per esempio il direttore di un'unità operativa", passi:[
  {t:"**Attua** le direttive", d:"del datore di lavoro"}, {t:"**Organizza** l'attività"}, {t:"**Vigila**", key:true}]},

{id:"s11", tipo:"icone", tema:"chiaro", sopratitolo:"Il preposto", voci:[
  {icona:"occhio", t:"Sovrintende", d:"all'attività lavorativa"}, {icona:"libro", t:"Vigila", d:"sul rispetto delle norme"},
  {icona:"scudo", t:"Vigila", d:"sull'uso dei dispositivi di protezione", key:true}]},
{id:"s12", tipo:"scala", tema:"chiaro", sopratitolo:"Obblighi rafforzati · legge 215/2021", gradini:[
  {n:"1", t:"Vigila"}, {n:"2", t:"Interviene", d:"per modificare i comportamenti scorretti"},
  {n:"3", t:"Interrompe", d:"l'attività, se c'è pericolo", key:true}]},
{id:"s13", tipo:"confronto", tema:"chiaro", sopratitolo:"Il preposto · formazione specifica, con aggiornamento periodico", col:[
  {h:"In sanità, spesso", t:"il **coordinatore infermieristico**"},
  {h:"In alcune situazioni", t:"anche l'**infermiere** che dirige l'attività di altri operatori"}]},

{id:"s14", tipo:"confronto", tema:"chiaro", sopratitolo:"Le altre figure", col:[
  {h:"RSPP", t:"responsabile del servizio di prevenzione e protezione · **nominato** dal datore di lavoro"},
  {h:"Medico competente", t:"**sorveglianza sanitaria** · collabora alla valutazione dei rischi"}]},
{id:"s15", tipo:"norma", tema:"chiaro", etichetta:"Rappresentante dei lavoratori per la sicurezza", sigla:"RLS",
  testo:"**Eletto** o designato dai lavoratori, accede ai luoghi di lavoro, è **consultato** sulla valutazione dei rischi."},
{id:"s16", tipo:"confronto", tema:"chiaro", sopratitolo:"Chi altro", col:[
  {h:"Addetti alle emergenze", t:"**antincendio** e **primo soccorso**"},
  {h:"I lavoratori", t:"non solo tutelati: anche **obblighi** precisi"}]},
{id:"s17", tipo:"griglia", tema:"chiaro", colonne:1, spunta:true, sopratitolo:"Gli obblighi dei lavoratori", celle:[
  {t:"**Osservare** le istruzioni ricevute"}, {t:"**Usare correttamente** i DPI", key:true}, {t:"**Segnalare** i pericoli"},
  {t:"Partecipare alla **formazione**"}, {t:"Sottoporsi ai **controlli sanitari**"}]},

{id:"s18", tipo:"raggiera", tema:"chiaro", sopratitolo:"Il documento di valutazione dei rischi · che cosa individua", centro:"DVR", raggi:[
  {t:"Rischi", key:true}, {t:"Misure", d:"prevenzione e protezione"}, {t:"Programma", d:"di miglioramento"}, {t:"Procedure"}, {t:"Ruoli"}]},
{id:"s19", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Non è un documento fermo · il DVR si aggiorna", celle:[
  {n:"↻", t:"Quando cambia l'**organizzazione**"}, {n:"↻", t:"Dopo **infortuni** significativi"},
  {n:"↻", t:"In base alla **sorveglianza sanitaria**", key:true}]},
{id:"s20", tipo:"cifre", tema:"chiaro", sopratitolo:"La riunione periodica · datore di lavoro, RSPP, medico competente, RLS", voci:[
  {n:"1", suf:"", t:"almeno una volta l'anno", key:true}, {n:"15", suf:"", t:"lavoratori", d:"aziende con più di"}]},

{id:"s21", tipo:"percorso", tema:"chiaro", sopratitolo:"La sorveglianza sanitaria · svolta dal medico competente · le visite", tappe:[
  {t:"Preventiva"}, {t:"Periodica"}, {t:"Su richiesta", d:"del lavoratore"}, {t:"Cambio di mansione", key:true}]},
{id:"s22", tipo:"cifre", tema:"chiaro", sopratitolo:"La visita alla ripresa del lavoro, dopo un'assenza per malattia · un numero da ricordare", voci:[
  {n:"60", suf:"", t:"giorni continuativi", d:"oltre i quali serve la visita", key:true}]},
{id:"s23", tipo:"bivio", tema:"chiaro", sopratitolo:"Il giudizio di idoneità alla mansione specifica", radice:"Il giudizio", rami:[
  {q:"", t:"Idoneo"},
  {q:"temporaneo o permanente", t:"Idoneo parziale", d:"con prescrizioni o limitazioni: per esempio niente movimentazione di carichi", key:true}]},
{id:"s24", tipo:"confronto", tema:"chiaro", sopratitolo:"Il giudizio di idoneità · oppure", col:[
  {h:"Inidoneo", t:"**temporaneo** o **permanente**"},
  {h:"Il ricorso", t:"all'organo di vigilanza dell'ASL entro **30 giorni**"}]},

{id:"s25", tipo:"norma", tema:"chiaro", etichetta:"Il rischio biologico · già incontrato nel modulo 4", sigla:"Titolo X",
  testo:"I rischi specifici del **D.Lgs. 81/2008**, a cominciare dal **biologico**."},
{id:"s26", tipo:"figura", tema:"chiaro", sopratitolo:"Le ferite da taglienti · Titolo X-bis", illu:"taglienti",
  titolo:"**D.Lgs. 19/2014**",
  sotto:"Dispositivi con **meccanismo di sicurezza**, e divieto di **reincappucciare** gli aghi."},
{id:"s27", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Il rischio biologico · le altre misure", celle:[
  {t:"Contenitori **a portata di mano**"}, {t:"**Formazione**"},
  {t:"Procedura per l'**esposizione accidentale**", key:true}, {t:"**Vaccinazioni**: epatite B, antinfluenzale"}]},

{id:"s28", tipo:"frase", tema:"chiaro", sopratitolo:"La movimentazione manuale dei pazienti · Titolo VI",
  testo:"Le patologie del **rachide**: fra le malattie professionali **più frequenti** in sanità."},
{id:"s29", tipo:"norma", tema:"chiaro", etichetta:"Movimentazione e Assistenza Pazienti Ospedalizzati", sigla:"MAPO",
  testo:"Il rischio del reparto: pazienti **non autosufficienti** rispetto agli **operatori**."},
{id:"s30", tipo:"scala", tema:"chiaro", sopratitolo:"Le fasce MAPO · conta anche ausili, ambienti, formazione", gradini:[
  {n:"0 – 1,5", t:"Trascurabile"}, {n:"1,51 – 5", t:"Medio"}, {n:"oltre 5", t:"Elevato", key:true}]},
{id:"s31", tipo:"figura", tema:"chiaro", sopratitolo:"Le misure", illu:"sollevatore", lato:"dx",
  titolo:"**Ausili**, formazione,<br>organizzazione.",
  sotto:"Sollevatori e teli ad alto scorrimento. Lezione 3.2: la tecnica corretta protegge il paziente e te."},

{id:"s32", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Il rischio chimico · Titolo IX, anche cancerogeni e mutageni · le fonti", celle:[
  {n:"·", t:"**Disinfettanti** e sterilizzanti"}, {n:"·", t:"**Gas anestetici**"},
  {n:"·", t:"Farmaci **antiblastici**", key:true}, {n:"·", t:"**Formaldeide** nei laboratori"}]},
{id:"s33", tipo:"confronto", tema:"chiaro", sopratitolo:"Il rischio chimico · gli strumenti", col:[
  {h:"Gli strumenti", t:"**schede di sicurezza**, DPI, cappe · antiblastici: allestimento **centralizzato**"},
  {h:"Il lattice", t:"l'allergia ha portato ai guanti **senza lattice**"}]},

{id:"s34", tipo:"tre", tema:"chiaro", sopratitolo:"Radiazioni ionizzanti · D.Lgs. 101/2020 · dosimetri per il personale esposto", box:[
  {n:"1", t:"Tempo"}, {n:"2", t:"Distanza"}, {n:"3", t:"Schermature", key:true}]},
{id:"s35", tipo:"cifre", tema:"chiaro", sopratitolo:"Stress lavoro-correlato · turni, carichi di lavoro, burnout", voci:[
  {n:"art. 28", suf:"", t:"valutazione obbligatoria", d:"rientra nel DVR", key:true}]},
{id:"s36", tipo:"catena", tema:"chiaro", sopratitolo:"Le aggressioni · che cosa deve fare il datore di lavoro", passi:[
  {t:"**Valutare** il rischio"}, {t:"Misure **organizzative** e strutturali"}, {t:"**Formazione**"}, {t:"Procedure di **segnalazione**", key:true}]},

{id:"s37", tipo:"icone", tema:"chiaro", sopratitolo:"L'emergenza e l'antincendio · in ogni struttura", voci:[
  {icona:"documento", t:"Piano di emergenza", d:"ed evacuazione", key:true}, {icona:"persone", t:"Addetti antincendio", d:"con formazione specifica"},
  {icona:"orologio", t:"Esercitazioni", d:"periodiche"}]},
{id:"s38", tipo:"frase", tema:"chiaro", sopratitolo:"In ospedale · i pazienti sono spesso non autosufficienti",
  testo:"Evacuazione **orizzontale progressiva**: prima verso un compartimento sicuro **sullo stesso piano**."},
{id:"s39", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Porte tagliafuoco · verticale solo se necessario · ogni operatore conosce", celle:[
  {t:"Le **vie di fuga**"}, {t:"Gli **estintori**"}, {t:"I pulsanti di **allarme**"}, {t:"Porte tagliafuoco **chiuse**", key:true}]},

{id:"s40", tipo:"frase", tema:"chiaro", sopratitolo:"Infortunio · compreso il tragitto casa-lavoro: l'infortunio in itinere",
  testo:"Un evento traumatico per **causa violenta** in **occasione di lavoro**."},
{id:"s41", tipo:"catena", tema:"chiaro", sopratitolo:"Malattia professionale: dall'esposizione lavorativa nel tempo · l'infortunio", passi:[
  {t:"Segnalato **subito**"}, {t:"Certificato **medico**"}, {t:"Denuncia all'**INAIL**", d:"del datore di lavoro", key:true}]},
{id:"s42", tipo:"trappola", tema:"chiaro", sopratitolo:"Come per gli eventi avversi della lezione 2.6", righe:[
  {sb:"«Nessun danno, niente da segnalare»", ok:"Anche i **near miss**: le informazioni più utili per prevenire"}]},

{id:"s43", tipo:"tre", tema:"chiaro", sopratitolo:"Il caso · prima parte · chi è il preposto?", box:[
  {n:"1", t:"Sovrintende e vigila"}, {n:"2", t:"Interviene", d:"sui comportamenti scorretti"},
  {n:"3", t:"Interrompe", d:"se c'è pericolo · L. 215/2021", key:true}]},
{id:"s44", tipo:"sostituzione", tema:"chiaro", sopratitolo:"Il caso · seconda parte · il sollevatore in reparto c'è",
  da:{h:"Il collega", t:"da solo, senza sollevatore"}, a:{h:"Tu", t:"lo fermi e lo aiuti con l'ausilio"},
  sotto:"A rischio sono sia lui sia il paziente."},
{id:"s45", tipo:"confronto", tema:"chiaro", sopratitolo:"E poi", col:[
  {h:"Se si ripete, o mancano ausili e personale", t:"lo **segnali** al coordinatore"},
  {h:"Anche i lavoratori", t:"hanno l'obbligo di **usare correttamente** le attrezzature"}]},

{id:"s46", tipo:"norma", tema:"chiaro", sopratitolo:"In Veneto · e in ogni azienda, il servizio di prevenzione e protezione",
  etichetta:"Servizio di Prevenzione, Igiene e Sicurezza negli Ambienti di Lavoro · ULSS", sigla:"SPISAL",
  testo:"L'organo di vigilanza: è qui che va il **ricorso** sull'idoneità."},

{id:"s47", tipo:"tabella", tema:"chiaro", sopratitolo:"La tabella · D.Lgs. 81/2008", colonne:["42%","58%"],
  intestazioni:["Figura", "Da ricordare"], righe:[
  ["Datore di lavoro (DG)", "DVR e nomina RSPP **non delegabili**"], ["Dirigente", "attua, organizza, vigila"],
  ["Preposto", "rafforzato dalla **L. 215/2021**"], ["RSPP · medico competente · RLS", "RLS **eletto**"],
  ["Lavoratori", "anch'essi con **obblighi**"]], chiave:[0]},
{id:"s48", tipo:"tabella", tema:"chiaro", sopratitolo:"La tabella · sorveglianza e rischi specifici", colonne:["42%","58%"],
  intestazioni:["Tema", "Da ricordare"], righe:[
  ["Idoneità", "ricorso entro **30 giorni**"], ["Biologico", "Titolo **X** e **X-bis**"],
  ["Movimentazione", "Titolo **VI** · MAPO: soglie **1,5** e **5**"], ["Chimico", "Titolo **IX**"],
  ["Radiazioni · stress", "D.Lgs. **101/2020** · **art. 28**"]], chiave:[2]},

{id:"s49", tipo:"frase", tema:"chiaro", sopratitolo:"Nella prossima lezione · come un'organizzazione migliora in modo sistematico",
  testo:"**Qualità**, **accreditamento** e **governo clinico**."},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione",
  titolo:"12.7<br>Qualità, accreditamento<br>e governo clinico", sottotitolo:"Gli strumenti per migliorare in modo sistematico",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
