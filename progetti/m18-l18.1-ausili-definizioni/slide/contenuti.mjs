// Contenuto delle 49 scene della lezione 18.1, la prima del modulo 18.
// *accento*  **accento in semibold**
//
// Registro del modulo: tecnico e pratico. Il documento consiglia immagini o
// icone degli ausili «dove disponibili nel tema»: la libreria ne aveva solo di
// generiche, e da questa lezione ha anche carrozzina, bastone, deambulatore,
// letto, orecchio, casa e segnale, nello stesso tratto delle altre.
//
// Il velo rosa (`tenue`) sta solo su che cosa l'OSS NON fa (non ripara, non
// modifica) e sui distrattori. Le definizioni sono quattro cose da
// distinguere, non giuste e sbagliate: `tre` a quattro caselle, scoperte a
// tappe. `sostituzione` una volta sola, dove c'e' davvero uno sbagliato: la
// carrozzina a chi potrebbe camminare col deambulatore.
//
// Nessuna cifra o dato che non stia nel copione di partenza.

// In una fila di card il titolo e' una parola sola: il grassetto dentro un
// titolo prende l'altro colore e lo fa bicolore. Il resto va nella descrizione.
const DEFINIZIONI = [
 {n:"Ausilio", t:"Compensa", d:"una funzione ridotta: carrozzina · deambulatore · posate adattate"},
 {n:"Presidio", t:"Dispositivo", d:"sanitario o assistenziale: materasso antidecubito · pannolone · catetere"},
 {n:"Protesi", t:"Sostituisce", d:"una parte del corpo: anca · protesi acustica · dentiera"},
 {n:"Ortesi", t:"Sostiene", d:"o corregge una parte del corpo: tutore · busto · collare"},
];

const ICF = [
 {t:"Funzioni corporee"}, {t:"Attività"}, {t:"Partecipazione"}, {t:"Fattori ambientali"},
];

const FORNITURA = [
 {n:"Prescrive", t:"Lo specialista", d:"fisiatra · ortopedico · otorino · oculista"},
 {n:"Autorizza e fornisce", t:"L'ULSS", d:"di residenza"},
 {n:"Riferimento", t:"Nomenclatore tariffario", d:"gli ausili erogabili dal servizio sanitario"},
];

const DOPO = [
 {t:"Collaudo"}, {t:"Tempi minimi di rinnovo"}, {t:"Comodato o proprietà"},
];

// Sei passi in catena sforano di 341 px in larghezza: griglia numerata 3×2.
const PERCORSO = [
 {n:1, t:"Valutazione in équipe"},
 {n:2, t:"Prescrizione dello specialista"},
 {n:3, t:"Autorizzazione dell'ULSS"},
 {n:4, t:"Fornitura e **addestramento**"},
 {n:5, t:"Collaudo"},
 {n:6, t:"**Verifica** nel tempo"},
];

const RUOLO = [
 {t:"**Utilizza** correttamente gli ausili del piano"},
 {t:"**Verifica** prima dell'uso", d:"integrità · funzionamento · idoneità alla persona"},
 {t:"**Addestra** e sostiene persona e caregiver"},
 {t:"**Osserva** se è ancora adeguato", d:"la persona cambia: dimagrisce, perde forza, migliora"},
 {t:"**Pulisce** e sanifica secondo procedura"},
 {t:"**Segnala** guasti, difetti, inadeguatezza"},
];

// Elenco `vietato`: la × rossa porta gia' la polarita', il testo resta piano.
const NON_FA = [
 {t:"Non ripara", d:"un ausilio riparato in modo artigianale è pericoloso"},
 {t:"Non modifica", d:"la responsabilità ricade su chi lo ha modificato"},
];

const RIFIUTO = [
 {icona:"bastone", t:"Il bastone", d:"«fa vecchio»"},
 {icona:"carrozzina", t:"La carrozzina", d:"«è la resa»"},
 {icona:"orecchio", t:"L'apparecchio acustico", d:"«si vede»"},
];

const AIUTA = [
 {t:"Spiegare a che cosa serve **in concreto**"},
 {t:"Far **provare** senza impegno"},
 {t:"Iniziare per **tempi brevi**"},
 {t:"**Coinvolgere** la persona nella scelta", d:"quando possibile"},
];

const DISPOSITIVO = [
 {t:"Marcatura CE"}, {t:"Istruzioni d'uso"}, {t:"Manutenzione prevista"},
];

const PARTI = [
 {t:"Impugnature"}, {t:"Ruote"}, {t:"Imbracature"}, {t:"Seduta"}, {t:"Comandi"},
];

const PIANO = [
 {t:"Quale ausilio"}, {t:"Come si usa con quella persona"}, {t:"Chi è stato addestrato"},
];

// Tre slide di trappola, una per blocco di voce: oltre le quattro righe la
// trappola sfora, e qui ogni blocco ne dice due.
const DISTRATTORI_1 = [
 {sb:"La protesi sostiene, l'ortesi sostituisce", ok:"La protesi **sostituisce** · l'ortesi **sostiene**"},
 {sb:"Ausilio e presidio sono sinonimi", ok:"L'ausilio **compensa** · il presidio è un **dispositivo**"},
];
const DISTRATTORI_2 = [
 {sb:"Prescrive l'ULSS", ok:"Prescrive lo **specialista** · l'ULSS **fornisce**"},
 {sb:"Un guasto semplice lo ripara l'OSS", ok:"L'OSS **non** prescrive, **non** ripara, **non** modifica"},
];
const DISTRATTORI_3 = [
 {sb:"L'ausilio più potente", ok:"Il **minimo** ausilio per sicurezza e autonomia"},
 {sb:"Un ausilio rifiutato si impone", ok:"Si lavora sull'**accettazione**"},
];

const RIEPILOGO = [
 "Ausilio, presidio, protesi, ortesi → la differenza è nella **funzione**",
 "ICF → gli ausili sono **fattori ambientali** che facilitano",
 "Lo **specialista** prescrive · l'**ULSS** fornisce · Nomenclatore tariffario nei LEA",
 "L'OSS usa, verifica, addestra, osserva, pulisce, segnala · **non ripara**, non modifica",
 "Il **minimo ausilio** per sicurezza e autonomia · l'accettazione conta",
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 18 · Ausili, presidi e tecnologie assistive",
  titolo:"Ausili, presidi<br>**e protesi**", sottotitolo:"Lezione 18.1",
  ente:"CISL FP Padova Rovigo · Concorso OSS Azienda Zero"},

{id:"s02", tipo:"frase", tema:"chiaro", sopratitolo:"Modulo 18 · lezione 1 di 5",
  testo:"Dopo la salute mentale e il fine vita, **un'area tecnica e pratica**."},
{id:"s03", tipo:"titolo", tema:"profondo",
  titolo:"Un ausilio giusto **restituisce autonomia**.",
  sotto:"Uno sbagliato, o usato male, la toglie."},
{id:"s04", tipo:"frase", tema:"chiaro", sopratitolo:"Ausili · presidi · tecnologie assistive",
  testo:"L'OSS vede ogni giorno se l'ausilio **funziona davvero** nella vita della persona."},

{id:"s05", tipo:"tre", tema:"chiaro", attive:[0],
  sopratitolo:"Le definizioni · i quiz le scambiano", box:DEFINIZIONI},
{id:"s06", tipo:"tre", tema:"chiaro", attive:[0,1,2],
  sopratitolo:"Le definizioni · i quiz le scambiano", box:DEFINIZIONI},
{id:"s07", tipo:"tre", tema:"chiaro",
  sopratitolo:"Le definizioni · i quiz le scambiano", box:DEFINIZIONI},

{id:"s08", tipo:"norma", tema:"chiaro", etichetta:"OMS", sigla:"ICF",
  testo:"Classificazione Internazionale del **Funzionamento**."},
{id:"s09", tipo:"griglia", tema:"chiaro", colonne:4, spunta:false,
  sopratitolo:"Non la malattia: che cosa la persona può fare nel suo ambiente", celle:ICF},
{id:"s10", tipo:"titolo", tema:"profondo",
  titolo:"Stesso deficit, ausili diversi: **disabilità diverse**.",
  sotto:"Gli ausili sono fattori ambientali che facilitano."},
{id:"s11", tipo:"confronto", tema:"chiaro", sopratitolo:"Una persona che non cammina",
  col:[{h:"Con carrozzina adeguata e ambiente accessibile", t:"Partecipa.", grande:true},
       {h:"Senza", t:"È esclusa.", grande:true}]},

{id:"s12", tipo:"frase", tema:"chiaro", sopratitolo:"Chi prescrive",
  testo:"Il **medico specialista**, dopo una valutazione: fisiatra, ortopedico, otorino, oculista."},
{id:"s13", tipo:"tre", tema:"chiaro",
  sopratitolo:"Chi prescrive, chi fornisce", box:FORNITURA},
{id:"s14", tipo:"norma", tema:"chiaro", etichetta:"LEA · DPCM 12 gennaio", sigla:"2017",
  testo:"Hanno diritto: **invalidità riconosciuta**, alcune condizioni specifiche, minori."},
{id:"s15", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false,
  sopratitolo:"Dopo la fornitura", celle:DOPO},

{id:"s16", tipo:"griglia", tema:"chiaro", colonne:3, attive:[0,1,2],
  sopratitolo:"Il percorso dell'ausilio", celle:PERCORSO},
{id:"s17", tipo:"griglia", tema:"chiaro", colonne:3, attive:[0,1,2,3],
  sopratitolo:"Il percorso dell'ausilio", celle:PERCORSO},
{id:"s18", tipo:"titolo", tema:"profondo",
  titolo:"L'OSS c'è soprattutto **nell'addestramento** e **nella verifica**.",
  sotto:"Il collaudo, poi la verifica nel tempo: i bisogni cambiano."},

{id:"s19", tipo:"elenco", tema:"chiaro", attive:[0,1],
  sopratitolo:"Il ruolo dell'OSS", voci:RUOLO},
{id:"s20", tipo:"elenco", tema:"chiaro", attive:[0,1,2,3],
  sopratitolo:"Il ruolo dell'OSS", voci:RUOLO},
{id:"s21", tipo:"elenco", tema:"chiaro",
  sopratitolo:"Il ruolo dell'OSS", voci:RUOLO},
{id:"s22", tipo:"elenco", tema:"tenue", vietato:true,
  sopratitolo:"Il ruolo dell'OSS · che cosa non fa", voci:NON_FA},

{id:"s23", tipo:"frase", tema:"chiaro", sopratitolo:"L'ausilio e l'autonomia residua",
  testo:"Serve a **fare da soli**, non a fare al posto della persona."},
{id:"s24", tipo:"confronto", tema:"chiaro", sopratitolo:"Un equilibrio",
  col:[{h:"Troppo potente", t:"riduce le **capacità residue**"},
       {h:"Insufficiente", t:"espone al **rischio**"}]},
{id:"s25", tipo:"titolo", tema:"profondo",
  titolo:"Il **minimo ausilio** che garantisce sicurezza e autonomia.",
  sotto:"La regola della scelta."},
{id:"s26", tipo:"sostituzione", tema:"chiaro", sopratitolo:"A chi potrebbe camminare col deambulatore",
  da:{h:"Non", t:"la carrozzina"}, a:{h:"Ma", t:"il **deambulatore**"},
  sotto:"La carrozzina sarebbe un danno, non una comodità."},

{id:"s27", tipo:"frase", tema:"chiaro", sopratitolo:"L'accettazione dell'ausilio",
  testo:"Molti ausili vengono **rifiutati** o **abbandonati**."},
{id:"s28", tipo:"icone", tema:"chiaro",
  sopratitolo:"Il rifiuto va ascoltato, non forzato: dietro c'è un vissuto di perdita", voci:RIFIUTO},
{id:"s29", tipo:"elenco", tema:"chiaro",
  sopratitolo:"Che cosa aiuta", voci:AIUTA},
{id:"s30", tipo:"titolo", tema:"profondo",
  titolo:"Un ausilio accettato **vale più** di un ausilio perfetto.",
  sotto:"Accettato e usato, non lasciato in un angolo."},

{id:"s31", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false,
  sopratitolo:"Molti ausili sono dispositivi medici", celle:DISPOSITIVO},
{id:"s32", tipo:"frase", tema:"chiaro", sopratitolo:"Secondo le istruzioni del fabbricante: portata, modalità, limiti",
  testo:"L'uso improprio **sposta la responsabilità** su chi lo ha fatto.",
  sotto:"Superare la portata di un sollevatore · usare una carrozzina come barella"},
{id:"s33", tipo:"frase", tema:"chiaro", sopratitolo:"Vigilanza sui dispositivi medici",
  testo:"Incidenti e **mancati incidenti** vanno segnalati."},
{id:"s34", tipo:"frase", tema:"chiaro", sopratitolo:"Il libretto d'uso",
  testo:"Va **conosciuto e conservato**, non buttato con l'imballo."},

{id:"s35", tipo:"frase", tema:"chiaro", sopratitolo:"Pulizia e sanificazione · Modulo 5",
  testo:"Gli ausili sono **superfici ad alto contatto**: veicolano microrganismi."},
{id:"s36", tipo:"confronto", tema:"chiaro", sopratitolo:"Quando si puliscono",
  col:[{h:"Condivisi", t:"dopo **ogni uso**"}, {h:"Personali", t:"**periodicamente**"}],
  sotto:"Prodotti compatibili: niente candeggina su metalli e tessuti tecnici."},
{id:"s37", tipo:"griglia", tema:"chiaro", colonne:5, spunta:false,
  sopratitolo:"Le parti più toccate", celle:PARTI},
{id:"s38", tipo:"confronto", tema:"chiaro", sopratitolo:"Una distinzione",
  col:[{h:"Ausilio personale", t:"è **della persona**, si pulisce per lei"},
       {h:"Ausilio di reparto", t:"**condiviso**: sanificato tra un uso e l'altro"}]},

{id:"s39", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false,
  sopratitolo:"La documentazione · nel piano assistenziale", celle:PIANO},
{id:"s40", tipo:"citazione", tema:"chiaro",
  testo:"«La carrozzina ha il freno sinistro allentato, segnalato il 12.»",
  fonte:"Una segnalazione scritta con precisione · dove previsto, anche il registro delle manutenzioni"},
{id:"s41", tipo:"titolo", tema:"profondo",
  titolo:"Ciò che non è documentato **non è stato fatto**.",
  sotto:"La regola del Modulo 13."},
{id:"s42", tipo:"frase", tema:"chiaro", sopratitolo:"In caso di incidente con un ausilio",
  testo:"La documentazione è ciò che **dimostra** che la verifica è stata fatta."},

{id:"s43", tipo:"trappola", tema:"tenue",
  sopratitolo:"I distrattori tipici", righe:DISTRATTORI_1},
{id:"s44", tipo:"trappola", tema:"tenue",
  sopratitolo:"I distrattori tipici", righe:DISTRATTORI_2},
{id:"s45", tipo:"trappola", tema:"tenue",
  sopratitolo:"I distrattori tipici", righe:DISTRATTORI_3},

{id:"s46", tipo:"memo", tema:"chiaro", attive:[0,1],
  sopratitolo:"Riepilogo", voci:RIEPILOGO},
{id:"s47", tipo:"memo", tema:"chiaro", attive:[0,1,2,3],
  sopratitolo:"Riepilogo", voci:RIEPILOGO},
{id:"s48", tipo:"memo", tema:"chiaro",
  sopratitolo:"Riepilogo", voci:RIEPILOGO},

{id:"s49", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione",
  titolo:"18.2", sottotitolo:"Gli ausili per la **mobilità** e il trasferimento",
  ente:"CISL FP Padova Rovigo · Concorso OSS Azienda Zero"},
];
