// Contenuto delle 49 scene della lezione 18.5, l'ultima del modulo 18.
// *accento*  **accento in semibold**
//
// Il percorso dell'ausilio rivisto dalla parte della sicurezza: chi sceglie,
// chi addestra, chi mantiene, che cosa si fa quando qualcosa va storto. Le
// procedure in passi (ausilio difettoso, incidente) sono griglie numerate:
// l'ordine conta.
//
// Il velo rosa (`tenue`) sta sul riparare alla meglio, sull'intrappolamento
// nelle sponde, sugli ausili improvvisati a casa e sui distrattori. Chi fa
// che cosa nella valutazione e' una tabella: sei righe, accese come le dice
// la voce.
//
// Nessuna cifra o dato che non stia nel copione di partenza.

const EQUIPE = {
 intestazioni:["Chi", "Che cosa porta"],
 colonne:["40%","60%"],
 righe:[
  ["Medico", "l'indicazione **clinica**"],
  ["Fisioterapista", "la funzione **motoria**"],
  ["Terapista occupazionale", "le **attività** e l'ambiente"],
  ["Infermiere", "l'integrazione nel **piano**"],
  ["OSS", "l'osservazione della **quotidianità**"],
  ["Persona e caregiver", "preferenze, accettazione, **fattibilità a casa**"],
 ],
};

const ADDESTRAMENTO = [
 {t:"Riguarda la **persona**, il **caregiver**, gli **operatori**"},
 {t:"Si fa **provare**, non solo spiegare", d:"si ripete finché il gesto è sicuro"},
];

const MANUTENZIONE = [
 {n:"Ordinaria", t:"Chi usa", d:"pulizia · controllo visivo · ricarica · piccole regolazioni da libretto"},
 {n:"Straordinaria", t:"Il fornitore", d:"le riparazioni: fornitore o servizio tecnico, mai l'operatore"},
];

const CONSUMO = [
 {t:"Ruote"}, {t:"Freni"}, {t:"Batterie"}, {t:"Imbracature"}, {t:"Cinghie"},
];

const NON_VA = [
 {n:1, t:"Non si usa"},
 {n:2, t:"Fuori servizio, **visibile**"},
 {n:3, t:"Si **segnala**: a chi, come, entro quando"},
 {n:4, t:"L'**alternativa** sicura"},
 {n:5, t:"Si **documenta**"},
];

const INCIDENTI = [
 {t:"Cadute", d:"da carrozzina, da sollevatore, dal letto"},
 {t:"Intrappolamento", d:"tra sponda e materasso: può essere mortale"},
 {t:"Lesioni da imbracatura"},
 {t:"Ribaltamento"},
 {t:"Schiacciamento delle dita"},
];

const DOPO = [
 {t:"La **persona**: valutazione e chiamata", d:"Modulo 9"},
 {t:"L'ausilio **non si sposta**", d:"finché non è stato visto · foto se prevista"},
 {t:"Si **segnala** l'evento e il dispositivo", d:"lezione 14.7 · vigilanza"},
];

const SPONDE = [
 {t:"Il rischio è maggiore nelle persone **agitate, confuse**, che si muovono molto"},
 {t:"Sponde **compatibili** con letto e materasso", d:"spazi minimi"},
 {t:"Materasso **troppo stretto o troppo morbido**", d:"crea proprio lo spazio pericoloso"},
];

const OPERATORE = [
 {t:"Sempre **l'ausilio previsto**", d:"anche quando «faccio prima a mano»: quel prima si paga negli anni"},
 {t:"Altezza del letto **regolata** · nessuna torsione"},
 {t:"Scarpe chiuse · nessun monile · abiti che non intralciano"},
 {t:"La **fretta** è il primo fattore di rischio"},
];

const IMPROVVISATI = [
 {t:"Il letto matrimoniale troppo basso", d:"con cui si assiste da anni"},
 {t:"La carrozzina nel ripostiglio"},
 {t:"Corde e cinture al posto delle sponde"},
];

const QUADRO = [
 {t:"Ausilio, presidio, protesi, ortesi", d:"ICF · lo specialista prescrive, l'ULSS fornisce · l'OSS non ripara"},
 {t:"Mobilità e trasferimento", d:"bastone, deambulatore, carrozzina, ausili minori, sollevatori, letti"},
 {t:"La vita quotidiana", d:"alimentazione, vestizione, igiene, bagno, incontinenza, antidecubito, ambiente"},
 {t:"Comunicazione e tecnologie", d:"protesi acustica, vista, CAA, teleassistenza, sensori e consenso"},
 {t:"Scelta e sicurezza", d:"équipe, addestramento, manutenzione, fuori servizio, incidenti, domicilio"},
];

const DISTRATTORI_1 = [
 {sb:"L'OSS ripara un piccolo guasto", ok:"**Non** prescrive, non ripara, non modifica: **usa, verifica, segnala**"},
 {sb:"L'ausilio più potente", ok:"Il **minimo** ausilio per sicurezza e autonomia"},
];
const DISTRATTORI_2 = [
 {sb:"Attivo per chi non collabora", ok:"**Attivo**: carico e tronco · **passivo**: non collabora"},
 {sb:"Le sponde sono sempre sicure", ok:"Possono essere un **rischio** e una **contenzione**"},
];
const DISTRATTORI_3 = [
 {sb:"Un difetto piccolo si tollera", ok:"Fuori servizio · segnalazione · **alternativa**"},
 {sb:"La tecnologia è neutra", ok:"Richiede **consenso**, e può essere contenzione"},
];

const QUIZ = [
 "Protesi e ortesi → la protesi **sostituisce**, l'ortesi **sostiene**",
 "Ausilio del Nomenclatore → lo prescrive lo **specialista**, lo fornisce l'ULSS",
 "Sollevatore attivo → chi ha **carico** sugli arti inferiori e tiene il tronco",
 "Ausilio difettoso → non si usa · **fuori servizio** · si segnala · alternativa",
 "Localizzatore GPS → **consenso, informazione, proporzionalità** · dato personale",
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 18 · Ausili, presidi e tecnologie assistive",
  titolo:"Scelta, sicurezza<br>**e manutenzione**", sottotitolo:"Lezione 18.5",
  ente:"CISL FP Padova Rovigo · Concorso OSS Azienda Zero"},

{id:"s02", tipo:"frase", tema:"chiaro", sopratitolo:"Modulo 18 · lezione 5 di 5",
  testo:"Il percorso dell'ausilio, **dal punto di vista della sicurezza**."},
{id:"s03", tipo:"griglia", tema:"chiaro", colonne:4, spunta:false,
  sopratitolo:"Poi il quadro completo del modulo",
  celle:[{t:"Come si sceglie"}, {t:"Come si addestra"}, {t:"Come si mantiene"}, {t:"Quando va storto"}]},
{id:"s04", tipo:"titolo", tema:"profondo",
  titolo:"La sicurezza con gli ausili è **una questione di procedura**.",
  sotto:"Non di fortuna."},

{id:"s05", tipo:"tabella", tema:"chiaro", chiave:[0,1],
  sopratitolo:"La valutazione in équipe · nessun ausilio si sceglie da soli", ...EQUIPE},
{id:"s06", tipo:"tabella", tema:"chiaro", chiave:[2,3],
  sopratitolo:"La valutazione in équipe · nessun ausilio si sceglie da soli", ...EQUIPE},
{id:"s07", tipo:"tabella", tema:"chiaro", chiave:[4],
  sopratitolo:"La valutazione in équipe · nessun ausilio si sceglie da soli", ...EQUIPE},
{id:"s08", tipo:"tabella", tema:"chiaro", chiave:[5],
  sopratitolo:"La valutazione in équipe · la scelta si documenta nel piano", ...EQUIPE},

{id:"s09", tipo:"titolo", tema:"profondo",
  titolo:"Senza addestramento, un ausilio è **abbandonato o pericoloso**.",
  sotto:"Tutti e due i casi sono frequenti."},
{id:"s10", tipo:"elenco", tema:"chiaro",
  sopratitolo:"L'addestramento", voci:ADDESTRAMENTO},
{id:"s11", tipo:"citazione", tema:"chiaro",
  testo:"«Mi fa vedere come lo usa?»",
  fonte:"La comprensione si verifica chiedendo di mostrare, non chiedendo se ha capito"},
{id:"s12", tipo:"frase", tema:"chiaro", sopratitolo:"Sollevatori e dispositivi complessi · Modulo 11",
  testo:"Formazione **specifica e documentata**.",
  sotto:"L'OSS addestra sugli ausili che conosce; per gli altri, chiede."},

{id:"s13", tipo:"tre", tema:"chiaro", attive:[0],
  sopratitolo:"La manutenzione", box:MANUTENZIONE},
{id:"s14", tipo:"tre", tema:"chiaro",
  sopratitolo:"La manutenzione", box:MANUTENZIONE},
{id:"s15", tipo:"frase", tema:"chiaro", sopratitolo:"Ausili forniti dal servizio sanitario",
  testo:"Manutenzione **a carico del fornitore**, nei tempi previsti dal Nomenclatore.",
  sotto:"Dove previsto, il registro delle verifiche."},
{id:"s16", tipo:"griglia", tema:"chiaro", colonne:5, spunta:false,
  sopratitolo:"Le parti che si consumano prima, da guardare per prime", celle:CONSUMO},

{id:"s17", tipo:"titolo", tema:"profondo",
  titolo:"Un freno che tiene poco oggi **non tiene domani**.",
  sotto:"Un ausilio con un difetto, anche piccolo, non si usa."},
{id:"s18", tipo:"griglia", tema:"chiaro", colonne:3, attive:[0,1,2],
  sopratitolo:"Quando l'ausilio non va · un cartello, un nastro, allontanarlo", celle:NON_VA},
{id:"s19", tipo:"griglia", tema:"chiaro", colonne:3,
  sopratitolo:"Quando l'ausilio non va · un altro ausilio, due operatori, il rinvio", celle:NON_VA},
{id:"s20", tipo:"frase", tema:"tenue", sopratitolo:"L'errore che produce incidenti",
  testo:"Riparare alla meglio per non perdere tempo. E la responsabilità passa a chi lo ha fatto."},

{id:"s21", tipo:"elenco", tema:"chiaro", attive:[0,1],
  sopratitolo:"Gli incidenti con gli ausili", voci:INCIDENTI},
{id:"s22", tipo:"elenco", tema:"chiaro",
  sopratitolo:"Gli incidenti con gli ausili", voci:INCIDENTI},
{id:"s23", tipo:"elenco", tema:"chiaro", numerato:true, attive:[0,1],
  sopratitolo:"Dopo un incidente", voci:DOPO},
{id:"s24", tipo:"titolo", tema:"profondo",
  titolo:"Il mancato incidente **si segnala come l'incidente**.",
  sotto:"L'evento, lezione 14.7 · il dispositivo, al sistema di vigilanza."},

{id:"s25", tipo:"frase", tema:"tenue", sopratitolo:"L'intrappolamento nelle sponde · un rischio sottovalutato",
  testo:"La persona scivola tra sponda e materasso, o tra le sbarre, e non riesce a liberarsi."},
{id:"s26", tipo:"elenco", tema:"chiaro", attive:[0],
  sopratitolo:"L'intrappolamento nelle sponde", voci:SPONDE},
{id:"s27", tipo:"elenco", tema:"chiaro",
  sopratitolo:"L'intrappolamento nelle sponde", voci:SPONDE},
{id:"s28", tipo:"titolo", tema:"profondo",
  titolo:"La sponda non è automaticamente sicura: **a volte è il rischio**.",
  sotto:"Il letto basso con il materasso accanto a terra è spesso più sicuro."},

{id:"s29", tipo:"frase", tema:"chiaro", sopratitolo:"La sicurezza dell'operatore · Moduli 6 e 11",
  testo:"Gli ausili proteggono **anche chi assiste**: il danno da movimentazione è cumulativo."},
{id:"s30", tipo:"elenco", tema:"chiaro", attive:[0,1],
  sopratitolo:"La sicurezza dell'operatore", voci:OPERATORE},
{id:"s31", tipo:"elenco", tema:"chiaro",
  sopratitolo:"La sicurezza dell'operatore", voci:OPERATORE},
{id:"s32", tipo:"titolo", tema:"profondo",
  titolo:"Segnalare ausili mancanti **è un obbligo**, non una lamentela.",
  sotto:"Lo prevede la normativa sulla sicurezza."},

{id:"s33", tipo:"frase", tema:"chiaro", sopratitolo:"Gli ausili al domicilio",
  testo:"Ausili **forniti ma non usati**, usati male, o improvvisati."},
{id:"s34", tipo:"elenco", tema:"tenue", vietato:true,
  sopratitolo:"Al domicilio · che cosa si trova", voci:IMPROVVISATI},
{id:"s35", tipo:"frase", tema:"chiaro", sopratitolo:"Il caregiver non addestrato, o che ha dimenticato, o ha paura",
  testo:"L'OSS **osserva**, **riaddestra**, **riferisce** all'équipe domiciliare."},
{id:"s36", tipo:"titolo", tema:"profondo",
  titolo:"Un ausilio improvvisato è **una segnalazione**, non un rimprovero.",
  sotto:"Dietro c'è un bisogno senza risposta, non una negligenza."},

{id:"s37", tipo:"elenco", tema:"chiaro", attive:[0],
  marcatori:["18.1","18.2","18.3","18.4","18.5"],
  sopratitolo:"Il quadro del Modulo 18", voci:QUADRO},
{id:"s38", tipo:"elenco", tema:"chiaro", attive:[0,1,2],
  marcatori:["18.1","18.2","18.3","18.4","18.5"],
  sopratitolo:"Il quadro del Modulo 18", voci:QUADRO},
{id:"s39", tipo:"elenco", tema:"chiaro",
  marcatori:["18.1","18.2","18.3","18.4","18.5"],
  sopratitolo:"Il quadro del Modulo 18", voci:QUADRO},

{id:"s40", tipo:"trappola", tema:"tenue",
  sopratitolo:"I distrattori tipici del modulo", righe:DISTRATTORI_1},
{id:"s41", tipo:"trappola", tema:"tenue",
  sopratitolo:"I distrattori tipici del modulo", righe:DISTRATTORI_2},
{id:"s42", tipo:"trappola", tema:"tenue",
  sopratitolo:"I distrattori tipici del modulo", righe:DISTRATTORI_3},

{id:"s43", tipo:"memo", tema:"chiaro", attive:[0],
  sopratitolo:"Autovalutazione", voci:QUIZ},
{id:"s44", tipo:"memo", tema:"chiaro", attive:[0,1,2],
  sopratitolo:"Autovalutazione", voci:QUIZ},
{id:"s45", tipo:"memo", tema:"chiaro",
  sopratitolo:"Autovalutazione", voci:QUIZ},

{id:"s46", tipo:"titolo", tema:"profondo",
  titolo:"L'ausilio giusto **restituisce autonomia**.",
  sotto:"Il filo del Modulo 18. Quello sbagliato, o usato male, la toglie."},
{id:"s47", tipo:"frase", tema:"chiaro", sopratitolo:"Usare · verificare ogni volta · addestrare · segnalare",
  testo:"Mai riparare, mai improvvisare. E la tecnologia **con la persona**, mai contro."},
{id:"s48", tipo:"frase", tema:"chiaro", sopratitolo:"Modulo 18 completato",
  testo:"Prossimo e ultimo modulo bonus: **inglese per il concorso**."},

{id:"s49", tipo:"copertina", tema:"profondo",
  modulo:"Prossimo modulo bonus",
  titolo:"19", sottotitolo:"**Inglese** per il concorso",
  ente:"CISL FP Padova Rovigo · Concorso OSS Azienda Zero"},
];
