// Contenuto delle 49 scene della lezione 16.5. *accento*  **accento in semibold**
//
// E' la lezione di chiusura del Modulo 16, e le ultime tre sezioni
// ricompongono le quattro lezioni precedenti. I contenuti richiamati sono
// quelli gia' consegnati: si citano con le stesse parole, perche' un ripasso
// che riformula e' un ripasso che confonde.
//
// Il tema `tenue` e' il velo degli errori: qui sta sulle due sezioni che
// dicono che cosa non fare e sui distrattori, cioe' sugli sbagli veri. Mai su
// contenuto positivo.
//
// Sulla 16.4 il repertorio dei tipi si era ristretto a sette, e meta' lezione
// girava su `frase` e `titolo`. Qui il tipo e' stato scelto prima di scrivere
// il blocco: i gradini sono una `scala` perche' l'ordine E' il contenuto, i
// distrattori sono una `trappola` perche' hanno davvero un lato giusto e uno
// sbagliato, il quadro del modulo e' una `timeline` perche' e' una sequenza.
//
// Niente numeri che non stiano nel copione di partenza: questa lezione dice
// che cosa fare addosso a una persona agitata, ed e' l'ultimo posto in cui
// inventare.

const GRADINI = [
 {n:"1", t:"Tensione", d:"irrequietezza · tono di voce alterato · sguardo fisso · mandibola serrata"},
 {n:"2", t:"Agitazione", d:"camminare avanti e indietro · gesti ampi · parole dure"},
 {n:"3", t:"Aggressività verbale", d:"minacce · insulti · invasione dello spazio personale"},
 {n:"4", t:"Aggressione fisica", d:"il gradino che tutti gli altri servono a evitare", key:true},
];

const CAUSE = [
 {icona:"goccia",  t:"**Dolore**"},
 {icona:"persona", t:"**Un bisogno non espresso**", d:"sete · bagno · fame · freddo"},
 {icona:"avviso",  t:"**Paura**", d:"rumore e confusione dell'ambiente"},
 {icona:"orologio",t:"**Un'attesa troppo lunga**", d:"senza spiegazioni"},
 {icona:"chat",    t:"**Una comunicazione sentita come umiliante**"},
];

const DEESCALATION = [
 {t:"**Una sola persona parla**", d:"tono basso e lento · frasi brevi"},
 {t:"**Distanza di sicurezza**", d:"posizione laterale, non frontale · mani visibili"},
 {t:"**Non toccare**"},
 {t:"**Vie d'uscita libere**", d:"né le proprie né quelle della persona"},
 {t:"**Ridurre gli stimoli**", d:"allontanare gli altri · abbassare luci e rumori"},
 {t:"**Offrire scelte**", d:"«preferisce sedersi o andare in stanza?»"},
];

// Elenco `vietato`: la × rossa porta gia' la polarita', il testo resta piano.
const NON_FARE = [
 {t:"Sfidare, minacciare, fare ultimatum"},
 {t:"Alzare la voce per «farsi sentire»"},
 {t:"Contraddire sul contenuto, discutere sul merito"},
 {t:"Avvicinarsi da dietro, circondare con più operatori"},
 {t:"Promettere ciò che non si può mantenere"},
];

const PRIMA = [
 {t:"Dove sono le **uscite**"},
 {t:"Come si attiva l'**allarme**"},
 {t:"**Chi chiamare**"},
 {t:"Qual è la **procedura aziendale**"},
];

const CONTENZIONE = [
 {t:"**Prescrizione medica motivata**"},
 {t:"**Temporaneità**"},
 {t:"**Sorveglianza continua**"},
 {t:"**Documentazione**"},
];

const DOPO = [
 {t:"Segnalare", d:"sempre, anche l'aggressione verbale senza conseguenze fisiche"},
 {t:"Descrivere i fatti", d:"cosa · quando · dove · chi era presente · cosa è stato fatto"},
 {t:"Debriefing in équipe", d:"che cosa è successo · che cosa ha funzionato · che cosa cambiare", key:true},
];

const ORGANIZZATIVO = [
 {n:"1", t:"Ambienti", d:"spazi non angusti · vie d'uscita · nessun oggetto pericoloso a portata"},
 {n:"2", t:"Organizzazione", d:"organici adeguati · tempi di attesa comunicati · formazione"},
 {n:"3", t:"Allarmi", d:"funzionanti e conosciuti da tutti", key:true},
];

const QUADRO = [
 {anno:"16.1", et:"L. 180 · TSO: tre condizioni **insieme** · DSM, CSM, SPDC · stigma"},
 {anno:"16.2", et:"fatti, non interpretazioni · delirio vs allucinazione · **delirium** vs demenza"},
 {anno:"16.3", et:"prevedibilità, calma, coerenza · **recovery** · la terapia non si forza"},
 {anno:"16.4", et:"dipendenza come **condizione di salute** · tolleranza e astinenza · SerD"},
 {anno:"16.5", et:"escalation a gradini · **de-escalation** · dopo l'evento", key:true},
];

const TRAPPOLE = [
 {sb:"«Delirio» e «delirium» sono la stessa cosa",
  ok:"Due cose diverse — come allucinazione e delirio"},
 {sb:"Per il TSO basta una delle tre condizioni",
  ok:"Devono ricorrere **insieme**"},
 {sb:"La contenzione è una tecnica di de-escalation",
  ok:"Non lo è, né una risposta all'aggressività"},
 {sb:"CSM = SPDC · al SerD serve l'impegnativa",
  ok:"CSM **territorio** · SPDC **ospedale** · SerD **diretto e gratuito**"},
];

const AUTOVALUTAZIONE = [
 {t:"Quali sono le tre condizioni del TSO?",
  d:"alterazioni psichiche con urgenza terapeutica · rifiuto degli interventi · impossibilità di misure fuori dall'ospedale · tutte e tre **insieme**"},
 {t:"Che differenza c'è fra delirio e allucinazione?",
  d:"il delirio è un'**idea** falsa, l'allucinazione una **percezione** senza stimolo"},
 {t:"Che cos'è il delirium?",
  d:"stato confusionale acuto, fluttuante, di causa organica, **reversibile**"},
 {t:"Che cos'è la recovery?",
  d:"una vita soddisfacente **anche in presenza** del disturbo"},
 {t:"Primo passo davanti all'agitazione?",
  d:"cercare una **causa rimovibile**"},
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 16 · Salute mentale, dipendenze e disagio psichico",
  titolo:"La crisi e<br>l'**aggressività**", sottotitolo:"Lezione 16.5",
  ente:"CISL FP Padova Rovigo · Concorso OSS Azienda Zero"},

{id:"s02", tipo:"frase", tema:"chiaro", sopratitolo:"Modulo 16 · lezione 5 di 5",
  testo:"Le situazioni che **più spaventano** chi lavora in quest'area. E poi il modulo si ricompone."},
{id:"s03", tipo:"titolo", tema:"profondo",
  titolo:"L'aggressività ha quasi sempre **segnali precoci**.",
  sotto:"Le esplosioni dal nulla sono molto più rare di quanto si pensi."},
{id:"s04", tipo:"frase", tema:"chiaro", sopratitolo:"Non è coraggio, non è carattere",
  testo:"È sapere **che cosa guardare**, e guardarlo presto."},

{id:"s05", tipo:"scala", tema:"chiaro", attive:[0],
  sopratitolo:"L'escalation è un processo a gradini", gradini:GRADINI},
{id:"s06", tipo:"scala", tema:"chiaro", attive:[0,1,2],
  sopratitolo:"L'escalation è un processo a gradini", gradini:GRADINI},
{id:"s07", tipo:"scala", tema:"chiaro",
  sopratitolo:"L'escalation è un processo a gradini", gradini:GRADINI},
{id:"s08", tipo:"titolo", tema:"profondo",
  titolo:"Ogni gradino è un'**occasione di intervento**.",
  sotto:"Riconoscere di essere al secondo e non al terzo cambia che cosa si fa nei minuti successivi."},

{id:"s09", tipo:"icone", tema:"chiaro", attive:[0,1],
  sopratitolo:"La prima domanda: c'è una causa rimovibile?", voci:CAUSE},
{id:"s10", tipo:"icone", tema:"chiaro",
  sopratitolo:"La prima domanda: c'è una causa rimovibile?", voci:CAUSE},
{id:"s11", tipo:"frase", tema:"chiaro", sopratitolo:"Molto spesso",
  testo:"Il comportamento è una **richiesta** che non trova altra forma."},
{id:"s12", tipo:"titolo", tema:"profondo",
  titolo:"La domanda viene **prima** delle tecniche.",
  sotto:"Una tecnica applicata bene sopra un dolore non trattato non fa scendere niente."},

{id:"s13", tipo:"elenco", tema:"chiaro", attive:[0],
  sopratitolo:"De-escalation · far scendere la tensione", voci:DEESCALATION},
{id:"s14", tipo:"elenco", tema:"chiaro", attive:[0,1,2,3],
  sopratitolo:"De-escalation · far scendere la tensione", voci:DEESCALATION},
{id:"s15", tipo:"elenco", tema:"chiaro",
  sopratitolo:"De-escalation · far scendere la tensione", voci:DEESCALATION},
{id:"s16", tipo:"titolo", tema:"profondo",
  titolo:"Una scelta restituisce **controllo**, e il controllo abbassa la tensione.",
  sotto:"Non si ottiene collaborazione esercitando autorità."},

{id:"s17", tipo:"elenco", tema:"tenue", vietato:true, attive:[0],
  sopratitolo:"Che cosa non fare", voci:NON_FARE},
{id:"s18", tipo:"elenco", tema:"tenue", vietato:true, attive:[0,1,2],
  sopratitolo:"Che cosa non fare", voci:NON_FARE},
{id:"s19", tipo:"elenco", tema:"tenue", vietato:true,
  sopratitolo:"Che cosa non fare", voci:NON_FARE},

{id:"s20", tipo:"titolo", tema:"profondo",
  titolo:"Ci si allontana e si **chiama aiuto**.",
  sotto:"Non è una sconfitta e non è una rinuncia ad assistere: è la procedura."},
{id:"s21", tipo:"elenco", tema:"chiaro",
  sopratitolo:"Da sapere prima, perché durante non c'è tempo", voci:PRIMA},
{id:"s22", tipo:"frase", tema:"chiaro", sopratitolo:"La propria sicurezza viene prima",
  testo:"Un operatore ferito non aiuta nessuno. E un'aggressione subita in silenzio **non protegge chi viene dopo**."},

{id:"s23", tipo:"titolo", tema:"tenue",
  titolo:"La contenzione **non è** una tecnica di de-escalation.",
  sotto:"E non è una risposta all'aggressività."},
{id:"s24", tipo:"elenco", tema:"chiaro",
  sopratitolo:"Misura eccezionale · le condizioni", voci:CONTENZIONE},
{id:"s25", tipo:"titolo", tema:"profondo",
  titolo:"L'OSS **non la applica mai** di propria iniziativa.",
  sotto:"In nessun contesto. Anche in SPDC valgono tutte le regole della lezione 14.6."},
{id:"s26", tipo:"frase", tema:"chiaro", sopratitolo:"L'orientamento dei servizi",
  testo:"Verso la **riduzione progressiva**: esistono alternative, e i rischi sono documentati."},

{id:"s27", tipo:"catena", tema:"chiaro", attive:[0],
  sopratitolo:"Dopo l'evento", passi:DOPO},
{id:"s28", tipo:"catena", tema:"chiaro", attive:[0,1],
  sopratitolo:"Dopo l'evento", passi:DOPO},
{id:"s29", tipo:"catena", tema:"chiaro",
  sopratitolo:"Dopo l'evento", passi:DOPO},
{id:"s30", tipo:"titolo", tema:"profondo",
  titolo:"Una segnalazione non fatta è un'informazione che **mancherà a chi viene dopo**.",
  sotto:"Chi ha subito l'aggressione ha diritto a sostegno, non a un giudizio."},

{id:"s31", tipo:"frase", tema:"chiaro", sopratitolo:"Non solo un problema individuale",
  testo:"Un **rischio organizzativo**, valutato come tale nel Documento di Valutazione dei Rischi."},
{id:"s32", tipo:"tre", tema:"chiaro", attive:[0,1],
  sopratitolo:"Dove si previene", box:ORGANIZZATIVO},
{id:"s33", tipo:"tre", tema:"chiaro",
  sopratitolo:"Dove si previene", box:ORGANIZZATIVO},

{id:"s34", tipo:"timeline", tema:"chiaro", attive:[0],
  sopratitolo:"Il quadro completo del Modulo 16", tappe:QUADRO},
{id:"s35", tipo:"timeline", tema:"chiaro", attive:[0,1],
  sopratitolo:"Il quadro completo del Modulo 16", tappe:QUADRO},
{id:"s36", tipo:"timeline", tema:"chiaro", attive:[0,1,2],
  sopratitolo:"Il quadro completo del Modulo 16", tappe:QUADRO},
{id:"s37", tipo:"timeline", tema:"chiaro",
  sopratitolo:"Il quadro completo del Modulo 16", tappe:QUADRO},

{id:"s38", tipo:"trappola", tema:"tenue", attive:[0],
  sopratitolo:"I distrattori tipici del modulo", righe:TRAPPOLE},
{id:"s39", tipo:"trappola", tema:"tenue", attive:[0,1,2],
  sopratitolo:"I distrattori tipici del modulo", righe:TRAPPOLE},
{id:"s40", tipo:"trappola", tema:"tenue",
  sopratitolo:"I distrattori tipici del modulo", righe:TRAPPOLE},

{id:"s41", tipo:"elenco", tema:"chiaro", numerato:true, attive:[0],
  sopratitolo:"Cinque domande, con le risposte", voci:AUTOVALUTAZIONE},
{id:"s42", tipo:"elenco", tema:"chiaro", numerato:true, attive:[0,1],
  sopratitolo:"Cinque domande, con le risposte", voci:AUTOVALUTAZIONE},
{id:"s43", tipo:"elenco", tema:"chiaro", numerato:true, attive:[0,1,2,3],
  sopratitolo:"Cinque domande, con le risposte", voci:AUTOVALUTAZIONE},
{id:"s44", tipo:"elenco", tema:"chiaro", numerato:true,
  sopratitolo:"Cinque domande, con le risposte", voci:AUTOVALUTAZIONE},

{id:"s45", tipo:"titolo", tema:"chiaro",
  titolo:"Il filo del modulo: **la persona prima della diagnosi**.",
  sotto:"Cinque lezioni su un'area in cui molti OSS lavorano."},
{id:"s46", tipo:"memo", tema:"chiaro", sopratitolo:"Le quattro parole che valgono ovunque",
  voci:["Prevedibilità","Calma","Coerenza","Nessun giudizio"]},
{id:"s47", tipo:"titolo", tema:"profondo",
  titolo:"Sei spesso il **primo a notare** che non è come ieri.",
  sotto:"Riferirlo in tempo può cambiare il percorso di una persona."},
{id:"s48", tipo:"frase", tema:"chiaro", sopratitolo:"Prossimo modulo bonus",
  testo:"**17** — Cure palliative, fine vita e accompagnamento."},

{id:"s49", tipo:"copertina", tema:"profondo",
  modulo:"Modulo bonus 16",
  titolo:"Completato", sottotitolo:"La persona **prima della diagnosi**",
  ente:"CISL FP Padova Rovigo · Concorso OSS Azienda Zero"},
];
