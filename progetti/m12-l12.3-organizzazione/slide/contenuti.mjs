// Contenuto delle 50 scene della lezione 12.3 — l'organizzazione aziendale e ospedaliera.
// Gli organi sono un «tre» che si accende uno alla volta; la classificazione
// degli ospedali una scala che sale dal presidio di base al DEA di II livello;
// l'hub and spoke una raggiera; i modelli organizzativi quattro riquadri.

const ORGANI = (att, k) => ({tipo:"tre", tema:"chiaro", box:[
  {n:"1", t:"Direttore generale", key:k===0},
  {n:"2", t:"Collegio sindacale", d:"regolarità amministrativa e contabile", key:k===1},
  {n:"3", t:"Collegio di direzione", d:"governo clinico, programmazione, formazione", key:k===2}], attive:att});

const OSPEDALI = (att, k) => ({tipo:"scala", tema:"chiaro", gradini:[
  {n:"80-150 MILA", t:"Presidio di base", d:"con pronto soccorso", key:k===0},
  {n:"150-300 MILA", t:"DEA di I livello", d:"emergenza e accettazione", key:k===1},
  {n:"600 MILA-1,2 MLN", t:"DEA di II livello", d:"specialità di alta complessità", key:k===2}], attive:att});

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 12 · Organizzazione, normativa e sicurezza",
  titolo:"L'organizzazione<br>aziendale e ospedaliera", sottotitolo:"12.3 · Atto aziendale, organi, dipartimenti, DM 70/2015, modelli organizzativi dell'assistenza",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"griglia", tema:"chiaro", colonne:4, spunta:false, sopratitolo:"Micro-lezione 3 di 8 · un'organizzazione con una struttura precisa", celle:[
  {n:"1", t:"Un **vertice**", key:true}, {n:"2", t:"I **dipartimenti**"}, {n:"3", t:"Le **unità operative**"}, {n:"4", t:"La direzione delle **professioni sanitarie**"}]},
{id:"s03", tipo:"frase", tema:"chiaro", sopratitolo:"Dentro ogni reparto, un modello organizzativo dell'assistenza · serve all'esame",
  testo:"Capire **chi decide che cosa**, dal primo giorno di lavoro."},

{id:"s04", tipo:"frase", tema:"chiaro", sopratitolo:"L'atto aziendale · un atto di diritto privato",
  testo:"L'azienda definisce la propria **organizzazione** e il proprio **funzionamento**."},
{id:"s05", tipo:"norma", tema:"chiaro", etichetta:"Come modificato dal D.Lgs. 229/1999", sigla:"D.Lgs. 502/1992",
  testo:"Il fondamento dell'**atto aziendale**."},
{id:"s06", tipo:"griglia", tema:"chiaro", colonne:4, spunta:true, sopratitolo:"Adottato dal direttore generale secondo gli indirizzi regionali · individua", celle:[
  {t:"I **dipartimenti**", key:true}, {t:"Le **strutture**"}, {t:"I **distretti**"}, {t:"Gli uffici di **staff**"}]},
{id:"s07", tipo:"frase", tema:"chiaro", sopratitolo:"È pubblico · come è organizzata l'azienda in cui farai domanda",
  testo:"Il **primo documento** da leggere."},

{id:"s08", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Al vertice: la direzione strategica", celle:[
  {n:"·", t:"Direttore **generale**"}, {n:"·", t:"Direttore **sanitario**"}, {n:"·", t:"Direttore **amministrativo**"},
  {n:"+", t:"In Veneto: direttore dei servizi **socio-sanitari**", key:true}]},
{id:"s09", sopratitolo:"Gli organi dell'azienda sono tre", ...ORGANI([0,1], 1)},
{id:"s10", sopratitolo:"Il collegio di direzione supporta la direzione", ...ORGANI([0,1,2], 2)},

{id:"s11", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Il dipartimento · il modello ordinario · unità operative omogenee, affini o complementari", celle:[
  {n:"+", t:"**Cardiologia**"}, {n:"+", t:"**Emodinamica**"}, {n:"+", t:"**Cardiochirurgia**"}]},
{id:"s12", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"Obiettivi comuni, risorse condivise · un direttore di dipartimento", celle:[
  {t:"Il **personale**"}, {t:"I **posti letto**"}, {t:"Le **tecnologie**"}]},
{id:"s13", tipo:"tre", tema:"chiaro", sopratitolo:"Le tipologie di dipartimento", box:[
  {n:"1", t:"Strutturale"}, {n:"2", t:"Funzionale"}, {n:"3", t:"Interaziendale", d:"coinvolge **più aziende**", key:true}]},

{id:"s14", tipo:"norma", tema:"chiaro", etichetta:"Struttura complessa", sigla:"UOC",
  testo:"**Autonomia gestionale** e un **direttore** di struttura complessa."},
{id:"s15", tipo:"confronto", tema:"chiaro", sopratitolo:"La struttura semplice", col:[
  {h:"UOS", t:"articolazione di una **struttura complessa**"}, {h:"UOSD", t:"a valenza **dipartimentale**: fa capo al dipartimento", key:true}]},
{id:"s16", tipo:"confronto", tema:"chiaro", sopratitolo:"Sul piano dell'assistenza · li vedremo nella lezione 12.5", col:[
  {h:"Il coordinatore", t:"**infermieristico**"}, {h:"Gli incarichi", t:"**di funzione**", key:true}]},

{id:"s17", tipo:"norma", tema:"chiaro", etichetta:"Il servizio delle professioni sanitarie", sigla:"L. 251/2000",
  testo:"**Autonomia** e **responsabilità** delle professioni sanitarie."},
{id:"s18", tipo:"catena", tema:"chiaro", sopratitolo:"Le aziende possono istituirlo", passi:[
  {t:"L'**azienda**"}, {t:"Il servizio dell'assistenza **infermieristica e ostetrica**"}, {t:"Un **dirigente** delle professioni sanitarie", key:true}]},
{id:"s19", tipo:"griglia", tema:"chiaro", colonne:4, spunta:true, sopratitolo:"Il dirigente delle professioni sanitarie", celle:[
  {t:"**Dirige**"}, {t:"**Organizza**"}, {t:"**Valuta** l'assistenza"}, {t:"Gestisce le **risorse** infermieristiche e di supporto", key:true}]},
{id:"s20", tipo:"scala", tema:"chiaro", sopratitolo:"L. 43/2006 · l'articolazione delle funzioni · le hai viste nel modulo 1", gradini:[
  {t:"Professionisti"}, {t:"Coordinatori"}, {t:"Specialisti"}, {t:"Dirigenti", key:true}]},

{id:"s21", tipo:"norma", tema:"chiaro", etichetta:"Il regolamento sugli standard ospedalieri", sigla:"DM 70/2015",
  testo:"Standard **qualitativi**, **strutturali**, **tecnologici** e **quantitativi**."},
{id:"s22", tipo:"cifre", tema:"chiaro", sopratitolo:"Gli standard del DM 70 · per mille abitanti", voci:[
  {n:"3,7", suf:"‰", d:"posti letto", key:true}, {n:"0,7", suf:"‰", d:"di cui riabilitazione e lungodegenza post-acuzie"},
  {n:"160", suf:"‰", d:"tasso di ospedalizzazione"}]},
{id:"s23", tipo:"frase", tema:"chiaro", sopratitolo:"Soglie minime di volume ed esito · per esempio tumore della mammella, bypass",
  testo:"La qualità dipende da **quanti se ne fanno**."},

{id:"s24", sopratitolo:"La classificazione degli ospedali secondo il DM 70 · bacino di abitanti", ...OSPEDALI([0], 0)},
{id:"s25", sopratitolo:"DEA: dipartimento di emergenza e accettazione", ...OSPEDALI([0,1], 1)},
{id:"s26", sopratitolo:"Più i presidi nelle zone particolarmente disagiate, come la montagna", ...OSPEDALI([0,1,2], 2)},
{id:"s27", tipo:"raggiera", tema:"chiaro", sopratitolo:"Gli hub, i centri più attrezzati, sostengono una rete di centri periferici", centro:"Hub",
  raggi:[{t:"Spoke"},{t:"Spoke"},{t:"Spoke"},{t:"Spoke"},{t:"Spoke"}]},

{id:"s28", tipo:"tre", tema:"chiaro", sopratitolo:"Le reti per le patologie tempo-dipendenti · le hai viste nel modulo 10", box:[
  {n:"Rete", t:"Cardiologica", d:"l'infarto", key:true}, {n:"Rete", t:"Traumatologica"}, {n:"Rete", t:"Ictus"}]},
{id:"s29", tipo:"frase", tema:"chiaro", sopratitolo:"Punti nascita, oncologia, trapianti, emergenza pediatrica · anche se non è il più vicino",
  testo:"L'ospedale **giusto**, nel tempo **giusto**."},

{id:"s30", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Il modello per compiti, o funzionale · un'attività per tutti i pazienti", celle:[
  {n:"1", t:"Uno la **terapia**"}, {n:"2", t:"Uno le **medicazioni**"}, {n:"3", t:"Uno i **parametri**"}]},
{id:"s31", tipo:"trappola", tema:"chiaro", sopratitolo:"Il modello per compiti", righe:[
  {sb:"Efficiente sulla carta", ok:"**Frammenta** l'assistenza: nessuno conosce il paziente nella sua **globalità**"}]},
{id:"s32", tipo:"tre", tema:"chiaro", sopratitolo:"I modelli organizzativi dell'assistenza", box:[
  {n:"1", t:"Per compiti"}, {n:"2", t:"Piccole équipe"}, {n:"3", t:"Primary nursing", d:"un infermiere di riferimento", key:true},
  {n:"4", t:"Case management", d:"pazienti complessi, ospedale e territorio"}], attive:[1,2,3]},

{id:"s33", tipo:"frase", tema:"chiaro", sopratitolo:"Il primary nursing · il modello più chiesto",
  testo:"Responsabilità **individuale** e **continua** per i suoi pazienti."},
{id:"s34", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"L'infermiere di riferimento pianifica l'assistenza, dall'ingresso alla dimissione", celle:[
  {t:"**Personalizzazione**"}, {t:"**Continuità**", key:true}, {t:"**Relazione** con paziente e famiglia"}]},
{id:"s35", tipo:"confronto", tema:"chiaro", sopratitolo:"Il più coerente con il processo di assistenza del modulo 2", col:[
  {h:"Il primary", t:"responsabile del **piano**"}, {h:"L'associato", t:"segue il piano quando il primary **non è in turno**", key:true}]},

{id:"s36", tipo:"trappola", tema:"chiaro", sopratitolo:"L'intensità di cura rovescia il modello tradizionale", righe:[
  {sb:"Pazienti collocati per specialità del medico", ok:"Per **complessità assistenziale** e **instabilità clinica**"}]},
{id:"s37", tipo:"tre", tema:"chiaro", sopratitolo:"Le aree di intensità", box:[
  {n:"Alta", t:"Intensiva e semi-intensiva", key:true}, {n:"Media", t:"Degenza ordinaria", d:"per aree omogenee"}, {n:"Bassa", t:"Post-acuzie", d:"low care"}]},
{id:"s38", tipo:"confronto", tema:"chiaro", sopratitolo:"Il tutor medico e l'infermiere", col:[
  {h:"Il medico specialista", t:"segue il paziente **dove si trova**"}, {h:"L'infermiere", t:"ruolo **centrale**: valuta la complessità, gestisce il percorso", key:true}]},

{id:"s39", tipo:"frase", tema:"chiaro", sopratitolo:"Il caso d'esame · la domanda tipo",
  testo:"«Descriva le differenze fra il modello **per compiti** e il **primary nursing**»"},
{id:"s40", tipo:"confronto", tema:"chiaro", sopratitolo:"La risposta", col:[
  {h:"Per compiti", t:"centrata sulle **attività** · assistenza frammentata, responsabilità diffusa"},
  {h:"Primary nursing", t:"centrata sulla **persona**", key:true}]},
{id:"s41", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Un infermiere di riferimento per un gruppo di pazienti · un associato nelle assenze", celle:[
  {t:"**Responsabilità** della pianificazione", key:true}, {t:"**Continuità**"}, {t:"**Personalizzazione**"}, {t:"**Relazione**"}]},
{id:"s42", tipo:"norma", tema:"chiaro", etichetta:"Il collegamento da fare", sigla:"L. 42/1999",
  testo:"Il primary nursing realizza il **processo di assistenza** e la **responsabilità professionale**."},

{id:"s43", tipo:"frase", tema:"chiaro", sopratitolo:"In Veneto · gli standard del DM 70, approvati dalla Regione",
  testo:"Le **schede di dotazione ospedaliera**: funzioni e posti letto di ogni ospedale."},
{id:"s44", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Hub and spoke · i centri di riferimento · lo approfondiamo nella lezione 13.3", celle:[
  {n:"·", t:"AOU di **Padova**"}, {n:"·", t:"AOU di **Verona**"}, {n:"·", t:"**IOV** · Istituto Oncologico Veneto", key:true}]},

{id:"s45", tipo:"tabella", tema:"chiaro", sopratitolo:"La tabella · l'azienda", colonne:["38%","62%"],
  intestazioni:["Che cosa", "Da ricordare"], righe:[
  ["Atto aziendale", "organizzazione e funzionamento"], ["Organi", "DG, **collegio sindacale**, **collegio di direzione**"],
  ["Dipartimento", "modello **ordinario**"], ["Strutture", "UOC · UOS · UOSD"], ["L. 251/2000", "servizio delle professioni sanitarie"]], chiave:[1]},
{id:"s46", tipo:"tabella", tema:"chiaro", sopratitolo:"La tabella · il DM 70/2015", colonne:["45%","55%"],
  intestazioni:["Standard", "Valore"], righe:[
  ["Posti letto", "**3,7** per mille"], ["Ospedalizzazione", "**160** per mille"],
  ["Presidio di base", "**80-150.000** abitanti"], ["DEA di I livello", "**150-300.000** abitanti"]], chiave:[0]},
{id:"s47", tipo:"tabella", tema:"chiaro", sopratitolo:"La tabella · ospedale e assistenza", colonne:["45%","55%"],
  intestazioni:["Che cosa", "Da ricordare"], righe:[
  ["DEA di II livello", "**600.000-1,2 milioni** abitanti"], ["Reti", "tempo-dipendenti"],
  ["Modelli", "**compiti** contro **primary nursing**"], ["Intensità di cura", "complessità e instabilità"]], chiave:[2]},

{id:"s48", tipo:"titolo", tema:"profondo",
  titolo:"Un'organizzazione,<br>o **un infermiere**.",
  sotto:"Lo decide il modello organizzativo: per compiti, tanti gesti; nel primary nursing, una persona che conosce la sua storia."},

{id:"s49", tipo:"frase", tema:"chiaro", sopratitolo:"Nella prossima lezione · temi lontani dall'infermiere, solo in apparenza",
  testo:"Come si **finanzia** il SSN: i **DRG**, il budget, il controllo di gestione."},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione",
  titolo:"12.4<br>Finanziamento<br>ed economia del SSN", sottotitolo:"DRG, budget e controllo di gestione",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
