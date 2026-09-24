// Contenuto delle 50 scene della lezione 3.1 — igiene, cura della persona e
// unita' del paziente. Prima lezione del modulo clinico: la grafica di terza
// generazione (clinica.mjs) entra qui.

const FUNZIONI = [
 {t:"Preventiva", d:"microbi, lesioni, infezioni"},
 {t:"Valutazione", d:"la cute, tutta"},
 {t:"Relazionale", d:"ciò che non dice in visita"},
 {t:"Comfort", d:"umore, appetito, riabilitazione", key:true},
];

const PRINCIPI = [
 {n:"1", t:"**Privacy e dignità** — paravento, porta chiusa, scoprire solo la parte che si lava"},
 {n:"2", t:"**Sicurezza** — letto ad altezza di lavoro, freni inseriti, sponda sul lato opposto"},
 {n:"3", t:"**Autonomia residua** — la persona fa tutto ciò che può fare da sé"},
 {n:"4", t:"**Dal pulito allo sporco** — cambio di acqua e panno quando serve"},
 {n:"5", t:"**Comfort termico** — acqua verificata, niente correnti, persona coperta"},
 {n:"6", t:"**Ergonomia dell'operatore** — la tua schiena è parte dell'intervento", key:true},
];

const SEQUENZA = [
 {t:"Preparazione", d:"consenso, materiale, mani e DPI"},
 {t:"Viso e collo", d:"gli occhi per primi"},
 {t:"Arti sup. e torace", d:"asciugare tamponando"},
 {t:"Addome", d:"ombelico e pliche"},
 {t:"Arti inferiori", d:"spazi interdigitali"},
 {t:"Dorso", d:"si ispeziona il sacro"},
 {t:"Genitali e perineo", d:"per ultimi"},
 {t:"Riordino", d:"campanello, registrazione", key:true},
];

const ZONE = [
 {z:["viso","collo"], t:"Viso e collo", d:"gli occhi per primi"},
 {z:["braccia","torace"], t:"Arti superiori e torace", d:"lavare, risciacquare, asciugare tamponando; pieghe e cavo ascellare"},
 {z:"addome", t:"Addome", d:"ombelico e pliche, dove la cute macera"},
 {z:["gambe","piedi"], t:"Arti inferiori", d:"spazi interdigitali asciutti; ispezione dei piedi"},
 {z:["dorso","sacro"], t:"Dorso", d:"sul fianco; si **ispeziona il sacro**", key:true},
 {z:"perineo", t:"Genitali e perineo", d:"per ultimi, cambiando acqua e panno"},
];

const FREQ = [
 {t:"Autonomo", d:"verificando che lo faccia davvero", volte:2, q:"2", qd:"volte al giorno"},
 {t:"Dipendente cosciente", d:"spazzolino morbido, posizione seduta", volte:3, q:"2–3", qd:"volte al giorno"},
 {t:"Non collaborante o disfagico", d:"capo di lato, aspirazione pronta, liquidi minimi", ogni:5, q:"ogni 4–6 h"},
 {t:"Intubato", d:"secondo procedura", ogni:3, q:"ogni 2–4 h", key:true},
];

const BUNDLE = [
 {t:"Testata", d:"sollevata a 30–45°"},
 {t:"Cavo orale", d:"clorexidina dove previsto"},
 {t:"Sub-glottica", d:"aspirare sopra la cuffia"},
 {t:"Cuffia", d:"pressione controllata"},
 {t:"Sedazione", d:"interrotta ogni giorno"},
 {t:"Profilassi", d:"TVP e ulcera da stress", key:true},
];

const STANZA = [
 {x:130, y:158, t:"Letto", d:"freni inseriti, posizione bassa quando non ci sei"},
 {x:56, y:110, t:"Campanello", d:"a portata di mano, dal lato di autonomia, funzionante"},
 {x:193, y:148, t:"Occhiali, protesi acustiche, dentiere", d:"disponibili e **indossati**"},
 {x:44, y:200, t:"Calzature", d:"chiuse e antiscivolo: le ciabatte aperte fanno cadere"},
 {x:120, y:52, t:"Illuminazione", d:"notturna, e il percorso verso il bagno"},
 {x:150, y:206, t:"Pavimenti e percorsi", d:"asciutti e liberi"},
 {x:212, y:196, t:"Dispositivi", d:"ordinati, non in tensione, mai a terra"},
];

const ATERRA = [
 {t:"Non sollevo"},
 {t:"Valuto", d:"coscienza, respiro, circolo, dolore, deformità, ferite, parametri"},
 {t:"Chiamo aiuto", d:"e avviso il medico"},
 {t:"Mobilizzo", d:"in sicurezza, secondo la valutazione"},
 {t:"Sorveglio", d:"trauma cranico se anticoagulato"},
 {t:"Segnalo", d:"con la scheda aziendale"},
 {t:"Documento e rivaluto", d:"in modo oggettivo", key:true},
];

const CONTENZIONE = [
 {t:"Eccezionale", d:"mai di routine, mai organizzativa"},
 {t:"Prescritta", d:"dal medico, motivata"},
 {t:"Ultima", d:"alternative esaurite"},
 {t:"Breve", d:"durata minima, rivalutata"},
 {t:"Sorvegliata", d:"circolo, cute, postura, idratazione"},
 {t:"Documentata", d:"per intero", key:true},
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 3 · Bisogni fondamentali, comfort e assistenza di base avanzata",
  titolo:"Igiene, cura della persona<br>e unità del paziente", sottotitolo:"3.1 · Sequenziare, proteggere, riconoscere un rischio",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"figura", tema:"chiaro", sopratitolo:"Micro-lezione 1 di 8", illu:"letto",
  titolo:"Qui il metodo<br>diventa **clinica**.",
  sotto:"Igiene, mobilizzazione, sicurezza dell'ambiente: l'assistenza che nella prova pratica compare più spesso."},
{id:"s03", tipo:"icone", tema:"chiaro", sopratitolo:"Perché non è «di base»", voci:[
  {icona:"ingranaggio", t:"Sequenziare", d:"un intervento, nell'ordine giusto"},
  {icona:"scudo", t:"Proteggere", d:"la persona, mentre lavori"},
  {icona:"occhio", t:"Riconoscere", d:"un rischio, mentre lavori", key:true}]},

{id:"s04", tipo:"raggiera", tema:"chiaro", sopratitolo:"L'igiene non è un'attività alberghiera", centro:"Igiene", attive:[0], raggi:FUNZIONI},
{id:"s05", tipo:"raggiera", tema:"chiaro", sopratitolo:"Quattro funzioni insieme", centro:"Igiene", attive:[0,1,2], raggi:FUNZIONI},
{id:"s06", tipo:"raggiera", tema:"chiaro", sopratitolo:"Quattro funzioni insieme — chi ne cita una sola sbaglia", centro:"Igiene", raggi:FUNZIONI},

{id:"s07", tipo:"sostituzione", tema:"chiaro", sopratitolo:"Il consiglio che vale il video intero",
  da:{h:"Risposta mediocre", t:"elenca i passaggi"}, a:{h:"Risposta forte", t:"dice che cosa valuta mentre esegue"},
  sotto:"Descrivere l'igiene a letto in una prova pratica: la differenza sta qui."},
{id:"s08", tipo:"titolo", tema:"profondo",
  titolo:"L'igiene è anche<br>un **accertamento**.",
  sotto:"Integrità cutanea · dolore · tolleranza allo sforzo · autonomia residua · stato cognitivo · dispositivi"},

{id:"s09", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, attive:[0,1], sopratitolo:"I sei principi, da enunciare sempre", celle:PRINCIPI},
{id:"s10", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, attive:[0,1,2,3], sopratitolo:"I sei principi, da enunciare sempre", celle:PRINCIPI},
{id:"s11", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"I sei principi, da enunciare sempre", celle:PRINCIPI},

{id:"s12", tipo:"percorso", tema:"chiaro", sopratitolo:"La sequenza, in otto tappe", attive:[0], tappe:SEQUENZA},
{id:"s13", tipo:"corpo", tema:"chiaro", sopratitolo:"La sequenza · prima parte", lato:"entrambi", attive:[0,1], voci:ZONE},
{id:"s14", tipo:"corpo", tema:"chiaro", sopratitolo:"La sequenza · prima parte", lato:"entrambi", attive:[0,1,2], voci:ZONE},

{id:"s15", tipo:"figura", tema:"chiaro", sopratitolo:"Il primo dettaglio che i quiz chiedono", illu:"occhio",
  titolo:"Dall'angolo **interno**<br>verso l'**esterno**.",
  sotto:"Un lato diverso del panno per ciascun occhio. Nessun sapone."},
{id:"s16", tipo:"tre", tema:"chiaro", sopratitolo:"Il motivo è duplice", box:[
  {n:"1", t:"Non spingere le secrezioni verso il **dotto lacrimale**"},
  {n:"2", t:"Non trasferire un'infezione **da un occhio all'altro**", key:true}]},

{id:"s17", tipo:"corpo", tema:"chiaro", sopratitolo:"La sequenza · seconda parte", lato:"entrambi", attive:[0,1,2,3], voci:ZONE},
{id:"s18", tipo:"corpo", tema:"chiaro", sopratitolo:"La sequenza · seconda parte", lato:"entrambi", attive:[0,1,2,3,4], voci:ZONE},
{id:"s19", tipo:"percorso", tema:"chiaro", sopratitolo:"La sequenza, completa", tappe:SEQUENZA},

{id:"s20", tipo:"sostituzione", tema:"chiaro", sopratitolo:"Il secondo dettaglio · nella donna",
  da:{h:"Mai", t:"dall'ano verso il pube"}, a:{h:"Sempre", t:"dal pube verso l'ano"},
  sotto:"I germi intestinali restano lontani dall'uretra — e con loro le infezioni delle vie urinarie."},
{id:"s21", tipo:"catena", tema:"chiaro", sopratitolo:"Il terzo dettaglio · nell'uomo", passi:[
  {t:"Retrarre", d:"il prepuzio"}, {t:"Detergere"}, {t:"Riposizionare", d:"o parafimosi: edema e sofferenza vascolare del glande", key:true}]},
{id:"s22", tipo:"tre", tema:"tenue", sopratitolo:"Tre dettagli che valgono una risposta", box:[
  {n:"1", t:"Occhi", d:"dall'interno verso l'esterno, un lato del panno per occhio"},
  {n:"2", t:"Perineo", d:"dal pube verso l'ano"},
  {n:"3", t:"Prepuzio", d:"**riposizionato**", key:true}]},

{id:"s23", tipo:"frequenze", tema:"chiaro", sopratitolo:"Il cavo orale · quante volte, nelle 24 ore", attive:[0], righe:FREQ},
{id:"s24", tipo:"frequenze", tema:"chiaro", sopratitolo:"Il cavo orale · quante volte, nelle 24 ore", attive:[0,1,2], righe:FREQ},
{id:"s25", tipo:"frequenze", tema:"chiaro", sopratitolo:"Più dipende da te, più spesso la bocca va guardata", righe:FREQ},

{id:"s26", tipo:"vap", tema:"chiaro", sopratitolo:"Polmonite associata a ventilazione · da dove viene",
  titolo:"Le secrezioni colonizzate<br>ristagnano **sopra la cuffia**."},
{id:"s27", tipo:"vap", tema:"chiaro", sopratitolo:"Polmonite associata a ventilazione · da dove viene",
  titolo:"Non arriva dall'esterno:<br>arriva **dalla bocca**.",
  sotto:"Scendono lungo il tubo, superano la cuffia in piccole quantità, raggiungono i polmoni già cariche di batteri."},
{id:"s28", tipo:"titolo", tema:"profondo",
  titolo:"Lavare la bocca di un intubato<br>è un intervento **clinico**.",
  sotto:"Non un gesto di cortesia: riduce la carica batterica nel punto da cui la polmonite parte."},

{id:"s29", tipo:"raggiera", tema:"chiaro", sopratitolo:"Il bundle VAP · sei misure che funzionano insieme", centro:"Bundle VAP", attive:[0,1], raggi:BUNDLE},
{id:"s30", tipo:"raggiera", tema:"chiaro", sopratitolo:"Il bundle VAP · sei misure che funzionano insieme", centro:"Bundle VAP", attive:[0,1,2,3], raggi:BUNDLE},
{id:"s31", tipo:"raggiera", tema:"chiaro", sopratitolo:"Il bundle VAP · il primo presidio, prima del modulo 4", centro:"Bundle VAP", raggi:BUNDLE},

{id:"s32", tipo:"figura", tema:"chiaro", sopratitolo:"Tre note · le protesi", illu:"bocca", lato:"dx",
  titolo:"Rimosse, pulite a parte,<br>in un contenitore **identificato**.",
  sotto:"Una protesi smarrita è anche un problema medico-legale ricorrente."},
{id:"s33", tipo:"confronto", tema:"chiaro", sopratitolo:"Tre note · due situazioni particolari", col:[
  {h:"Mucosite e xerostomia", t:"Detersioni **delicate e frequenti**, sostituti salivari, niente collutori alcolici"},
  {h:"Fine vita", t:"L'igiene della bocca è uno degli interventi di **comfort** più efficaci — l'idratazione forzata non lo sostituisce"}]},

{id:"s34", tipo:"figura", tema:"chiaro", sopratitolo:"L'unità del paziente", illu:"stanza",
  titolo:"Non è estetica:<br>è una **barriera di sicurezza**.",
  sotto:"Spazio, arredi e presidi destinati alla singola persona."},
{id:"s35", tipo:"mappa", tema:"chiaro", sopratitolo:"L'unità del paziente · otto elementi, un requisito ciascuno", illu:"stanza", punti:STANZA.slice(0,3)},
{id:"s36", tipo:"mappa", tema:"chiaro", sopratitolo:"L'unità del paziente · otto elementi, un requisito ciascuno", illu:"stanza", punti:STANZA},

{id:"s37", tipo:"cifre", tema:"chiaro", sopratitolo:"Le cadute", voci:[
  {n:1, suf:"°", t:"evento avverso", d:"il più frequente nelle strutture sanitarie", key:true},
  {n:13, t:"Raccomandazione", d:"ministeriale: prevenzione e gestione della caduta"}]},
{id:"s38", tipo:"elenco", tema:"chiaro", sopratitolo:"Fattori intrinseci", voci:[
  {t:"Età"}, {t:"**Cadute precedenti**"}, {t:"Deterioramento cognitivo e delirium"}, {t:"Deficit visivi e uditivi"},
  {t:"Ipotensione ortostatica"}, {t:"Disturbi dell'andatura"}, {t:"Incontinenza con urgenza"}, {t:"**Farmaci**"}]},
{id:"s39", tipo:"confronto", tema:"chiaro", sopratitolo:"Si sommano: un solo intervento non basta mai", col:[
  {h:"Fattori intrinseci", t:"età · **cadute precedenti** · deterioramento cognitivo e delirium · deficit visivi e uditivi · ipotensione ortostatica · andatura · incontinenza con urgenza · **farmaci**"},
  {h:"Fattori estrinseci", t:"ambiente · calzature · letto · ausili · sorveglianza"}]},

{id:"s40", tipo:"figura", tema:"chiaro", sopratitolo:"Due informazioni che valgono una domanda", illu:"lente",
  titolo:"Il predittore più potente:<br>**una caduta precedente**.",
  sotto:"Chiederlo all'ingresso è obbligatorio: è il primo item della scala di Conley."},
{id:"s41", tipo:"figura", tema:"chiaro", sopratitolo:"Due informazioni che valgono una domanda", illu:"farmaci", lato:"dx",
  titolo:"Il fattore più modificabile:<br>**la terapia**.",
  sotto:"Sedativi, ipnotici, antipsicotici, antidepressivi, antipertensivi, diuretici, ipoglicemizzanti. Rivederli è fra gli interventi con più impatto."},
{id:"s42", tipo:"ciclo", tema:"chiaro", sopratitolo:"Gli interventi di prevenzione", centro:"Prevenire", passi:[
  {t:"Valutare", d:"all'ingresso"}, {t:"Informare", d:"chiamare prima di alzarsi, in due tempi"},
  {t:"Ambiente"}, {t:"Sorvegliare", d:"nelle ore a rischio"}, {t:"Rivalutare", d:"a ogni variazione", key:true}]},

{id:"s43", tipo:"trappola", tema:"tenue", sopratitolo:"Attenzione", righe:[
  {sb:"«Lo tengo a letto, per sicurezza»", ok:"**Mobilizzazione precoce**: il decondizionamento *aumenta* il rischio di caduta"}]},
{id:"s44", tipo:"percorso", tema:"chiaro", sopratitolo:"Il caso d'esame · la persona trovata a terra", attive:[0,1,2,3], tappe:ATERRA},
{id:"s45", tipo:"percorso", tema:"chiaro", sopratitolo:"Chi risponde «lo rimetto a letto» perde la parte che vale", tappe:ATERRA},

{id:"s46", tipo:"norma", tema:"chiaro", sopratitolo:"Il tema più delicato della lezione",
  etichetta:"Libertà personale", sigla:"Art. 13 Cost.",
  testo:"La contenzione limita la libertà personale: una risposta *tecnicamente plausibile* può essere **giuridicamente sbagliata**."},
{id:"s47", tipo:"raggiera", tema:"chiaro", sopratitolo:"Contenzione · sei principi", centro:"Contenzione", attive:[0,1], raggi:CONTENZIONE},
{id:"s48", tipo:"raggiera", tema:"chiaro", sopratitolo:"Contenzione · sei principi", centro:"Contenzione", raggi:CONTENZIONE},
{id:"s49", tipo:"bivio", tema:"chiaro", sopratitolo:"Le sponde · la domanda trabocchetto", radice:"Le sponde", rami:[
  {q:"sedato, incosciente, o se le chiede la persona", t:"Presidio di sicurezza", d:"non sono contenzione di per sé"},
  {q:"se impediscono di alzarsi contro la volontà", t:"Contenzione", d:"valgono tutte le regole — e nell'agitato che si muove aggravano la caduta", key:true}]},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione",
  titolo:"3.2 Postura e mobilizzazione", sottotitolo:"Le posizioni, la sindrome da immobilizzazione,<br>che cosa succede a un corpo lasciato fermo",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
