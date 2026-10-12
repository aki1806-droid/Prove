// Contenuto delle 50 scene della lezione 15.12 — riepilogo del Modulo 15 e casi lampo.
// Lo schema in cinque passi è un percorso; le frasi dei dieci casi una tabella
// in tre pagine; ogni caso lampo si apre con la pausa (scenario in alto) e si
// chiude con le azioni; le dieci tracce sono carte numerate; il commissario una
// raggiera di sette richieste.

const SCHEMA = (att, k) => ({tipo:"percorso", tema:"chiaro", tappe:[
  {t:"Accertamento", d:"mirato · ABCDE se instabile", key:k===0},
  {t:"Priorità", d:"vita, acuto, rischi, bisogni", key:k===1},
  {t:"Obiettivi", d:"misurabili", key:k===2},
  {t:"Interventi", d:"autonomi, collaborativi, attribuiti", key:k===3},
  {t:"Valutazione", d:"comunicazione, documentazione, continuità", key:k===4}], attive:att});

const FRASI = (righe, k, sop) => ({tipo:"tabella", tema:"chiaro", sopratitolo:sop, colonne:["27%","73%"],
  intestazioni:["Il caso", "La frase"], righe, chiave:[k]});

const LAMPO = (n, es, testo, dati) => ({tipo:"pausa", tema:"chiaro", etichetta:"caso lampo", sopratitolo:`Caso lampo ${n}`, es, testo, dati});

const TRACCE = att => ({tipo:"griglia", tema:"chiaro", colonne:5, spunta:false, attive:att, celle:[
  {n:"1", t:"Paziente che si **deteriora** in reparto", key:true}, {n:"2", t:"Sospetta **sepsi**"},
  {n:"3", t:"**Dolore toracico**"}, {n:"4", t:"Complicanza **postoperatoria**"},
  {n:"5", t:"**BPCO** in ossigeno"}, {n:"6", t:"**Caduta** di un anziano"},
  {n:"7", t:"**Ipoglicemia**"}, {n:"8", t:"Reazione **trasfusionale**"},
  {n:"9", t:"**Errore di terapia** intercettato"}, {n:"10", t:"Dimissione di un **fragile**"}]});

const PROCEDURA = (att, k) => ({tipo:"percorso", tema:"chiaro", tappe:[
  {t:"Indicazione", key:k===0},
  {t:"Preparazione", d:"paziente, materiale, mani, identificazione, consenso", key:k===1},
  {t:"Esecuzione", d:"con i punti critici", key:k===2},
  {t:"Controllo", d:"e smaltimento", key:k===3},
  {t:"Documentazione", d:"e sorveglianza", key:k===4}], attive:att});

const TEMPO = (att, k) => ({tipo:"percorso", tema:"chiaro", tappe:[
  {t:"Leggere due volte", d:"sottolineare i dati anomali · 1–2 min", key:k===0},
  {t:"Scaletta", d:"i cinque passi · 2–3 min", key:k===1},
  {t:"Scrittura", d:"8–10 min", key:k===2},
  {t:"Rilettura", d:"1–2 min", key:k===3}], attive:att});

const COMMISSARIO = att => ({tipo:"griglia", tema:"chiaro", colonne:4, spunta:false, attive:att, celle:[
  {n:"1", t:"La **sicurezza** del paziente", key:true}, {n:"2", t:"Un **ragionamento** ordinato"},
  {n:"3", t:"Una **competenza** tecnica precisa"}, {n:"4", t:"**Responsabilità** e limiti del ruolo"},
  {n:"5", t:"La **comunicazione**"}, {n:"6", t:"L'attenzione alla **persona**"},
  {n:"7", t:"Il **contesto**: la rete veneta"}]});

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 15 · Riepilogo",
  titolo:"Lo schema<br>e i casi lampo", sottotitolo:"15.12 · Riepilogo del modulo, casi lampo, tracce probabili",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"tre", tema:"chiaro", sopratitolo:"Micro-lezione 12 di 12 · il modulo in tre tempi", box:[
  {n:"1", t:"Lo schema", d:"e le frasi dei dieci casi", key:true}, {n:"2", t:"Sei casi lampo"},
  {n:"3", t:"Le tracce", d:"e come allenarsi"}]},
{id:"s03", tipo:"cifre", tema:"chiaro", sopratitolo:"Situazioni non sviluppate per esteso, ma possibili all'esame", voci:[
  {n:"6", t:"casi lampo", d:"il ragionamento essenziale"},
  {n:"< 1", suf:"min", t:"per ciascuno", key:true},
  {n:"10", t:"tracce probabili", d:"e come allenarsi"}]},

{id:"s04", sopratitolo:"Lo schema, un'ultima volta", ...SCHEMA([0,1], 1)},
{id:"s05", sopratitolo:"Gli interventi collaborativi: con il «secondo prescrizione»", ...SCHEMA([0,1,2,3,4], 3)},
{id:"s06", tipo:"griglia", tema:"chiaro", colonne:2, sopratitolo:"Le sei domande di emergenza", celle:[
  {n:"1", t:"È **stabile**?", key:true}, {n:"2", t:"Che cosa può **peggiorare**?"},
  {n:"3", t:"Che cosa faccio **subito**?"}, {n:"4", t:"**Chi** avviso?"},
  {n:"5", t:"Che cosa **preparo** e **insegno**?"}, {n:"6", t:"Come **documento**?"}]},

{id:"s07", ...FRASI([
  ["15.2 · Sepsi", "la confusione nuova è **un parametro vitale**"],
  ["15.3 · Chirurgia", "la giornata postoperatoria è **metà della risposta**"],
  ["15.4 · Infarto", "**dieci minuti** per l'ECG, **pochi secondi** per lo shock"]], 0, "Le frasi dei dieci casi · da ricordare come ancore")},
{id:"s08", ...FRASI([
  ["15.5 · BPCO", "una saturazione perfetta **non è un paziente perfetto**"],
  ["15.6 · Scompenso", "la crisi si cura in un'ora, **la ricaduta si previene** in una settimana"],
  ["15.7 · Anziana", "le sponde la fanno cadere **da più in alto**"]], 1, "Le frasi dei dieci casi")},
{id:"s09", ...FRASI([
  ["15.8 · Diabete", "ogni ipoglicemia **ha una causa**"],
  ["15.9 · Oncologia", "la febbre è un'emergenza **anche se dice di stare bene**"],
  ["15.10 · Terapia", "fermarsi a controllare **è sicurezza**"],
  ["15.11 · Turno", "si attribuisce un'attività, **non si delega la responsabilità**"]], 3, "Le frasi dei dieci casi")},

{id:"s10", ...LAMPO(1, "ore 11 · chirurgia",
  "Il paziente non riesce più a **parlare bene** e ha la **bocca storta**. Alle 10 era normale.",
  ["ore 10: normale", "ore 11: il deficit"])},
{id:"s11", tipo:"griglia", tema:"chiaro", colonne:2, sopratitolo:"FAST positiva · sospetto ictus", celle:[
  {t:"Ultima volta visto in benessere: **ore 10**", key:true}, {t:"Medico e **percorso stroke**, subito"},
  {t:"**Glicemia**, parametri, GCS"}, {t:"**Nulla** per bocca"}, {t:"Accesso venoso"}]},
{id:"s12", tipo:"frase", tema:"chiaro", sopratitolo:"Un'informazione cruciale da comunicare · lezione 8.6",
  testo:"Appena operato, o in **anticoagulante**? Cambia l'indicazione alla **trombolisi**."},

{id:"s13", ...LAMPO(2, "antibiotico EV · 5 minuti",
  "Cinque minuti dopo l'inizio di un **antibiotico EV**: orticaria, gonfiore delle labbra, sibili.",
  ["PA 80/50", "orticaria", "sibili"])},
{id:"s14", tipo:"cifre", tema:"chiaro", sopratitolo:"Anafilassi · interrompi l'infusione, mantieni l'accesso, chiama aiuto", voci:[
  {n:"0,5", suf:"mg", t:"adrenalina IM nell'adulto", d:"faccia anterolaterale della coscia · secondo protocollo", key:true},
  {n:"5", suf:"min", t:"ripetibile dopo"}]},
{id:"s15", tipo:"griglia", tema:"chiaro", colonne:2, sopratitolo:"E poi · lezioni 5.6 e 10.6", celle:[
  {t:"**Ossigeno**"}, {t:"**Supina** con le gambe sollevate · seduta se prevale la dispnea"},
  {t:"**Liquidi**"}, {t:"Registrare l'**allergia**"},
  {t:"Segnalare alla **farmacovigilanza**", key:true}]},

{id:"s16", ...LAMPO(3, "pronto soccorso pediatrico",
  "Un bambino di **2 anni** con febbre ha una crisi convulsiva generalizzata. I genitori urlano.",
  ["2 anni", "febbre", "crisi generalizzata"])},
{id:"s17", tipo:"griglia", tema:"chiaro", colonne:2, sopratitolo:"Durante la crisi · e al termine", celle:[
  {t:"**Proteggere** dai traumi"}, {t:"**Niente** in bocca", no:true},
  {t:"**Non** trattenere i movimenti", no:true}, {t:"**Cronometrare**", key:true},
  {t:"Al termine: posizione laterale di sicurezza, **ossigeno**, **glicemia**"}]},
{id:"s18", tipo:"cifre", tema:"chiaro", sopratitolo:"E rassicurare e informare i genitori · lezioni 8.6 e 10.4", voci:[
  {n:"> 5", suf:"min", t:"benzodiazepina", d:"secondo protocollo · es. midazolam buccale", key:true}]},

{id:"s19", ...LAMPO(4, "pronto soccorso · 34ª settimana",
  "Donna di **34 anni**: cefalea intensa, disturbi visivi, dolore epigastrico.",
  ["PA 165/110", "34ª settimana"])},
{id:"s20", tipo:"griglia", tema:"chiaro", colonne:2, sopratitolo:"Sospetta preeclampsia grave", celle:[
  {t:"Medico e **ostetrica**, subito", key:true}, {t:"Decubito laterale **sinistro**"},
  {t:"Ambiente **tranquillo**"}, {t:"Accesso venoso, prelievi, **proteinuria**"},
  {t:"Monitoraggio del **feto**"}]},
{id:"s21", tipo:"tre", tema:"chiaro", sopratitolo:"Il magnesio solfato · che cosa sorvegliare · lezione 11.4", box:[
  {n:"1", t:"Riflessi"}, {n:"2", t:"Frequenza respiratoria"}, {n:"3", t:"Diuresi"},
  {n:"antidoto", t:"Calcio gluconato", d:"disponibile", key:true}]},

{id:"s22", ...LAMPO(5, "pronto soccorso",
  "Un giovane uomo è **agitato**, dice di essere perseguitato, rifiuta qualsiasi cura.",
  ["i familiari: «ricovero obbligatorio»"])},
{id:"s23", tipo:"tre", tema:"chiaro", sopratitolo:"Sicurezza e de-escalation · escludere le cause organiche", box:[
  {n:"1", t:"Glicemia"}, {n:"2", t:"Ipossia"}, {n:"3", t:"Sostanze"}, {n:"4", t:"Astinenza"}]},
{id:"s24", tipo:"percorso", tema:"chiaro", sopratitolo:"Il TSO non lo decide l'infermiere · contenzione: misura estrema · lezione 11.3", tappe:[
  {t:"Tre requisiti", key:true}, {t:"Proposta", d:"del medico"}, {t:"Convalida"},
  {t:"Ordinanza", d:"del sindaco"}, {t:"Giudice tutelare"}]},

{id:"s25", ...LAMPO(6, "fine vita",
  "Paziente oncologico terminale, incosciente: respiro **rumoroso** e irregolare. La figlia chiede di «aspirarlo».",
  ["incosciente", "figlia angosciata"])},
{id:"s26", tipo:"griglia", tema:"chiaro", colonne:2, sopratitolo:"Il rantolo terminale", celle:[
  {t:"Posizione **laterale**"}, {t:"Testata **sollevata**"},
  {t:"**Antisecretivi** secondo prescrizione"}, {t:"Igiene del **cavo orale**"},
  {t:"Aspirazione profonda di routine: traumatica, poco efficace", no:true}]},
{id:"s27", tipo:"frase", tema:"chiaro", sopratitolo:"Spiegare alla figlia: di solito il paziente non ne soffre · lezione 11.5",
  testo:"La tua **presenza** conta quanto i farmaci."},

{id:"s28", sopratitolo:"Le dieci tracce più probabili · dall'analisi dei contenuti del programma", ...TRACCE([0,1,2,3])},
{id:"s29", sopratitolo:"Per ognuna, un caso svolto e una risposta modello", ...TRACCE([0,1,2,3,4,5,6,7,8,9])},

{id:"s30", sopratitolo:"La prova pratica può chiedere la descrizione di una procedura", ...PROCEDURA([0,1,2], 1)},
{id:"s31", tipo:"griglia", tema:"chiaro", colonne:4, spunta:false, sopratitolo:"Le procedure più probabili · moduli 3, 6 e 8", celle:[
  {n:"·", t:"Cateterismo **vescicale**"}, {n:"·", t:"Sondino **naso-gastrico**"},
  {n:"·", t:"Prelievo per **emocoltura**"}, {n:"·", t:"Gestione del **CVC**"},
  {n:"·", t:"**Trasfusione**", key:true}, {n:"·", t:"Medicazione della **ferita chirurgica**"},
  {n:"·", t:"**Broncoaspirazione**"}]},

{id:"s32", tipo:"griglia", tema:"tenue", colonne:1, sopratitolo:"Gli errori ricorrenti di tutto il modulo", celle:[
  {t:"Non leggere il **dato anomalo**", no:true}, {t:"Elencare senza **priorità**", no:true},
  {t:"Interventi **generici**", no:true}, {t:"Dimenticare il «**secondo prescrizione**»", no:true},
  {t:"Dimenticare la **sicurezza**", no:true}]},
{id:"s33", tipo:"griglia", tema:"tenue", colonne:1, sopratitolo:"Gli errori ricorrenti di tutto il modulo", celle:[
  {t:"Dimenticare **comunicazione** e **documentazione**", no:true}, {t:"Non cercare la **causa**", no:true},
  {t:"Dimenticare la **persona** e la **famiglia**", no:true}, {t:"Non pensare alla **continuità**", no:true}]},

{id:"s34", sopratitolo:"Gestire il tempo nella prova scritta", ...TEMPO([0,1,2], 2)},
{id:"s35", tipo:"tre", tema:"chiaro", sopratitolo:"La rilettura · 1–2 minuti, tre domande", box:[
  {n:"1", t:"Priorità chiare?"}, {n:"2", t:"«Secondo prescrizione»?", key:true},
  {n:"3", t:"Sicurezza, comunicazione, documentazione?"}]},
{id:"s36", tipo:"frase", tema:"chiaro", sopratitolo:"Lo spazio indicato · grafia leggibile · frasi brevi",
  testo:"Una risposta **completa e ordinata** vale più di una lunga e confusa."},

{id:"s37", tipo:"venn", tema:"chiaro", sopratitolo:"Domanda 1 · Che cosa hanno in comune sepsi e neutropenia febbrile?",
  sx:{t:"Sepsi", d:"lezione 15.2"}, dx:{t:"Neutropenia febbrile", d:"lezione 15.9"},
  centro:"emergenze infettive **tempo-dipendenti** · antibiotico **entro un'ora**"},
{id:"s38", tipo:"tre", tema:"chiaro", sopratitolo:"Emocolture prima, senza ritardarlo · Domanda 2 · Perché sempre la glicemia?", box:[
  {n:"può simulare", t:"Un ictus"}, {n:"può simulare", t:"Un delirium"},
  {n:"può simulare", t:"Un'alterazione della coscienza", key:true}]},
{id:"s39", tipo:"frase", tema:"chiaro", sopratitolo:"L'ipoglicemia · Domanda 3 · perché gli orari ritornano sempre?",
  testo:"È l'**unica causa** che si corregge in pochi minuti.",
  sotto:"E nelle condizioni tempo-dipendenti il tempo è un dato clinico."},
{id:"s40", tipo:"icone", tema:"chiaro", sopratitolo:"Il tempo è un dato clinico · cure corrette, continuità, tutela professionale", voci:[
  {icona:"orologio", t:"Ora di insorgenza", key:true}, {icona:"siringa", t:"Prima dose"},
  {icona:"avviso", t:"Lo shock"}, {icona:"sacca", t:"La trasfusione"}]},

{id:"s41", tipo:"cifre", tema:"chiaro", sopratitolo:"Come allenarsi · poi il confronto con la risposta modello e lo schema", voci:[
  {n:"1", t:"traccia al giorno", key:true}, {n:"15", t:"righe"}, {n:"15", suf:"min", t:"come all'esame"}]},
{id:"s42", tipo:"griglia", tema:"chiaro", colonne:2, sopratitolo:"E ancora", celle:[
  {t:"Lo scambio con un **collega**: si impara anche correggendo"}, {t:"Le risposte per l'orale **ad alta voce**, in 2–3 minuti"},
  {t:"I casi in cui hai sbagliato la **priorità**", key:true}, {t:"Il **test** del modulo"}]},

{id:"s43", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Il quaderno dei casi · per ogni caso, una pagina", celle:[
  {n:"1", t:"Lo **scenario** in due righe"}, {n:"2", t:"Il **dato anomalo**", key:true},
  {n:"3", t:"Le **priorità**"}, {n:"4", t:"Cinque **interventi** chiave"},
  {n:"5", t:"L'**errore** da evitare"}, {n:"6", t:"La **frase** del caso"},
  {n:"7", t:"I **riferimenti** ai moduli"}]},
{id:"s44", tipo:"cifre", tema:"chiaro", sopratitolo:"Da ripassare negli ultimi giorni prima della prova", voci:[
  {n:"10", t:"casi"}, {n:"6", t:"casi lampo"}, {n:"16", t:"pagine", key:true}]},

{id:"s45", sopratitolo:"Che cosa cerca il commissario in una risposta a un caso", ...COMMISSARIO([0,1,2,3])},
{id:"s46", sopratitolo:"Sette cose: se la risposta le mostra, hai fatto il tuo lavoro", ...COMMISSARIO([0,1,2,3,4,5,6])},

{id:"s47", tipo:"titolo", tema:"profondo",
  titolo:"Si studia per sapere<br>**che cosa fare prima**.",
  sotto:"Non per sapere tutto. La priorità è la vera competenza dell'infermiere."},

{id:"s48", tipo:"tre", tema:"chiaro", sopratitolo:"Nel prossimo modulo · si apre con l'ictus, dal primo segno alla riabilitazione", box:[
  {n:"1", t:"Area medica"}, {n:"2", t:"Area chirurgica"}, {n:"3", t:"Area critica", key:true}]},
{id:"s49", tipo:"griglia", tema:"chiaro", colonne:4, spunta:false, sopratitolo:"Lo schema resta quello del Modulo 15", celle:[
  {n:"16.1", t:"Ictus"}, {n:"16.2", t:"Emorragia digestiva"}, {n:"16.3", t:"Iperkaliemia"}, {n:"16.4", t:"Embolia polmonare"},
  {n:"16.6", t:"Politrauma"}, {n:"16.7", t:"Ustionato"}, {n:"16.8", t:"Chetoacidosi"}, {n:"16.11", t:"Paziente ventilato", key:true}]},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossimo modulo · Modulo 16",
  titolo:"Casi clinici<br>avanzati", sottotitolo:"Area medica, chirurgica e critica",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
