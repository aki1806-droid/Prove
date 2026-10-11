// Contenuto delle 49 scene della lezione 16.3. *accento*  **accento in semibold**
//
// Registro del modulo: sobrio e descrittivo. E sempre "persona con disturbo
// psichico" o "la persona": non c'e' una slide che usi un sostantivo al posto
// della persona.
//
// Il tema `tenue` e' il velo degli errori (vedi layout.mjs). Questa lezione e'
// fatta a coppie "aiuta / non aiuta", quindi il velo ha molto lavoro legittimo
// da fare: sta su tutte e sole le scene che dicono che cosa non fare o che
// correggono un fraintendimento. Mai su contenuto positivo — e' l'errore che
// e' uscito sulla 16.1 e di nuovo sulla 16.2, quindi qui e' sorvegliato.
//
// La forma segue la logica: dove il copione dice "aiuta" c'e' un elenco con i
// trattini, dove dice "non aiuta" lo stesso elenco con `vietato`, che mette le
// × al posto dei trattini. Ripetere la forma non e' monotonia: insegna a
// leggere il segno. Le scene che rompono la serie (icone, sostituzione,
// trappola, catena) stanno dove il copione cambia davvero mossa.

const PRINCIPI = [
 {t:"**Prevedibilità**", d:"dire che cosa si farà, e poi farlo"},
 {t:"**Rispetto dei tempi**", d:"non forzare, riproporre in un altro momento"},
 {t:"**Non giudizio**", d:"accogliere senza valutare la persona"},
 {t:"**Coerenza dell'équipe**", d:"tutti tengono la stessa linea — risposte diverse sono una causa frequente di escalation"},
];

const MOMENTI = [
 {t:"Entrare in stanza"},
 {t:"Proporre un'igiene"},
 {t:"Sollecitare un pasto"},
];

const DIFFIDENZA_SI = [
 {t:"**Trasparenza** — dire sempre che cosa si sta per fare"},
 {t:"Movimenti **lenti e visibili**"},
 {t:"**Distanza** rispettata"},
];
const DIFFIDENZA_NO = [
 {t:"Avvicinarsi da dietro"},
 {t:"Parlottare a bassa voce a distanza"},
 {t:"Toccare senza preavviso", d:"un contatto non annunciato, in una persona sospettosa, conferma il sospetto"},
];

const RITIRO_SI = [
 {icona:"persona", t:"Presenza discreta", d:"senza pretendere risposta"},
 {icona:"chat",    t:"Proposte brevi e concrete"},
 {icona:"orologio",t:"Tornare più volte", d:"nel corso del turno"},
];

const DISORG_SI = [
 {t:"Frasi brevi"},
 {t:"**Una cosa per volta**"},
 {t:"Riferimenti **concreti**", d:"dopo colazione, non più tardi; questa sedia, non lì"},
];
const DISORG_NO = [
 {t:"Fingere di aver capito", d:"costruisce un malinteso che torna più tardi"},
 {t:"Correggere il modo di parlare", d:"sposta l'attenzione dal bisogno alla forma"},
];

const AGITAZIONE_SI = [
 {icona:"chat",    t:"Tono basso"},
 {icona:"scudo",   t:"Ridurre gli stimoli"},
 {icona:"persone", t:"Dare spazio fisico"},
 {icona:"persona", t:"Una sola persona che parla", d:"più voci insieme, anche gentili, sono comunque più stimoli"},
];
const AGITAZIONE_NO = [
 {t:"Affollare la stanza"},
 {t:"Alzare la voce"},
 {t:"Bloccare le vie d'uscita", d:"chiudere l'uscita trasforma il disagio in allarme"},
];

const FILO = [
 {t:"Prevedibilità"},
 {t:"Calma"},
 {t:"Coerenza"},
];

// Le quattro riformulazioni. `trappola` e non `tabella`: quello che conta non
// e' il confronto fra due colonne, e' il passaggio dall'una all'altra — ed e'
// esattamente quello che il parlato chiede di sapere a memoria.
const FRASI = [
 {sb:"«deve lavarsi»",
  ok:"«Le va se facciamo l'igiene adesso, o preferisce **tra mezz'ora**?»"},
 {sb:"«non è vero quello che dice»",
  ok:"«Io non lo vedo, ma **capisco che per lei sia reale**»"},
 {sb:"«si calmi»",
  ok:"«**Sono qui.** Ci prendiamo un momento»"},
 {sb:"«perché non ha mangiato?»",
  ok:"«Ho visto che il pasto è rimasto. **Posso portarle qualcos'altro?**»"},
];

const CRITERI = [
 {t:"Offrire una **scelta** invece di un ordine"},
 {t:"**Validare il vissuto** senza validare il contenuto", d:"è la regola della 16.2 sul delirio"},
 {t:"**Descrivere** invece di chiedere conto", d:"ho visto che il pasto è rimasto, non perché non ha mangiato"},
 {t:"Niente **plurale paternalistico**"},
];

const RECOVERY = [
 {t:"**Speranza**", d:"la possibilità di un futuro diverso"},
 {t:"**Identità**", d:"una persona, non una diagnosi"},
 {t:"**Senso**", d:"ruoli e relazioni che contano"},
 {t:"**Responsabilità**", d:"decidere della propria vita, con il rischio che decidere comporta"},
];

const AUTONOMIA = [
 {t:"Sostenere l'autonomia **anche quando sarebbe più rapido sostituirsi**"},
 {t:"Valorizzare ogni **capacità residua**"},
 {t:"Non decidere al posto della persona ciò che **può ancora scegliere**"},
];

const TERAPIA_SI = [
 {t:"Osservare e riferire la **mancata assunzione**"},
 {t:"Sostenere la **routine** quotidiana"},
 {t:"Riferire gli **effetti riportati**", d:"sonnolenza, tremori, rigidità"},
 {t:"**Segnalare il rifiuto** senza forzare"},
];
const TERAPIA_NO = [
 {t:"Convincere o insistere"},
 {t:"Discutere l'indicazione clinica"},
 {t:"Valutare gli effetti collaterali"},
 {t:"Somministrare contro la volontà"},
];

// Causa e effetto, non un elenco: e' il punto della scena. `catena` lo dice
// nella forma.
const CARICO = [
 {t:"Rifiuto ripetuto", d:"senso di inefficacia"},
 {t:"Ricadute dopo un miglioramento", d:"frustrazione"},
 {t:"Aggressività verbale", d:"difficoltà a non prenderla sul personale"},
];

const AIUTA_OPERATORE = [
 {t:"**Parlarne in équipe**"},
 {t:"Non attribuire a sé il **decorso** del disturbo"},
 {t:"Distinguere ciò che dipende dal proprio operato da **ciò che non ne dipende**"},
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 16 · Salute mentale, dipendenze e disagio psichico",
  titolo:"Relazione e<br>**comunicazione**", sottotitolo:"Lezione 16.3",
  ente:"CISL FP Padova Rovigo · Concorso OSS Azienda Zero"},

{id:"s02", tipo:"frase", tema:"chiaro", sopratitolo:"Modulo 16 · lezione 3 di 5",
  testo:"La parte più **pratica** del modulo.",
  sotto:"La relazione e la comunicazione con una persona in condizione di disagio psichico."},
{id:"s03", tipo:"titolo", tema:"profondo",
  titolo:"La relazione **non accompagna** l'assistenza:<br>è lo **strumento** con cui si realizza.",
  sotto:"Non esiste un fare separato da un come lo si fa."},
{id:"s04", tipo:"frase", tema:"chiaro", sopratitolo:"Che cosa conta come lavoro fatto",
  testo:"Il modo in cui ci si arriva non è la cornice della prestazione: **è la prestazione**.",
  sotto:"Non basta che risulti erogata."},

{id:"s05", tipo:"tre", tema:"chiaro", box:MOMENTI,
  sopratitolo:"Il modo determina se la prestazione sarà possibile o no"},
{id:"s06", tipo:"titolo", tema:"tenue",
  titolo:"Un'igiene rifiutata non è un problema di igiene:<br>è un problema di **relazione**.",
  sotto:"Cambiare prodotto o insistere non serve. Cambiare il modo, spesso sì."},
{id:"s07", tipo:"frase", tema:"chiaro", sopratitolo:"Vale anche al contrario, ed è la parte che si dimentica",
  testo:"Quando una prestazione riesce, **qualcosa nel modo ha funzionato**.",
  sotto:"Non perché quel giorno la persona era più disponibile. E vale la pena sapere che cosa."},

{id:"s08", tipo:"elenco", tema:"chiaro", attive:[0],
  sopratitolo:"Quattro principi, già incontrati nel modulo 2", voci:PRINCIPI},
{id:"s09", tipo:"elenco", tema:"chiaro", attive:[0,1,2],
  sopratitolo:"Quattro principi, già incontrati nel modulo 2", voci:PRINCIPI},
{id:"s10", tipo:"elenco", tema:"chiaro",
  sopratitolo:"Quattro principi, già incontrati nel modulo 2", voci:PRINCIPI},
{id:"s11", tipo:"titolo", tema:"profondo",
  titolo:"Non quattro buone intenzioni:<br>quattro cose che si possono **controllare**.",
  sotto:"Se un impegno è stato mantenuto. Se una proposta è stata riproposta. Se due operatori hanno risposto uguale."},

{id:"s12", tipo:"elenco", tema:"chiaro",
  sopratitolo:"Diffidenza e sospettosità — che cosa aiuta", voci:DIFFIDENZA_SI},
{id:"s13", tipo:"elenco", tema:"tenue", vietato:true,
  sopratitolo:"Diffidenza e sospettosità — che cosa non aiuta", voci:DIFFIDENZA_NO},
{id:"s14", tipo:"icone", tema:"chiaro",
  sopratitolo:"Ritiro e mutismo — che cosa aiuta", voci:RITIRO_SI},
{id:"s15", tipo:"sostituzione", tema:"tenue", sopratitolo:"Ritiro e mutismo — come si legge il silenzio",
  da:{h:"Non si legge", t:"come un **rifiuto definitivo**"},
  a:{h:"Si legge", t:"come il **tempo** che serve per accettare una presenza"},
  sotto:"E non aiuta insistere con domande."},

{id:"s16", tipo:"elenco", tema:"chiaro",
  sopratitolo:"Discorso disorganizzato — che cosa aiuta", voci:DISORG_SI},
{id:"s17", tipo:"elenco", tema:"tenue", vietato:true,
  sopratitolo:"Discorso disorganizzato — che cosa non aiuta", voci:DISORG_NO},
{id:"s18", tipo:"icone", tema:"chiaro",
  sopratitolo:"Agitazione — che cosa aiuta", voci:AGITAZIONE_SI},
{id:"s19", tipo:"elenco", tema:"tenue", vietato:true,
  sopratitolo:"Agitazione — che cosa non aiuta", voci:AGITAZIONE_NO},
{id:"s20", tipo:"frase", tema:"chiaro", sopratitolo:"Richieste ripetute",
  testo:"Una risposta breve, coerente e **uguale ogni volta**.",
  sotto:"Non aiutano risposte diverse da operatori diversi, né promesse che non si potranno mantenere."},

{id:"s21", tipo:"tre", tema:"profondo", box:FILO,
  sopratitolo:"Il filo comune di tutte queste situazioni"},
{id:"s22", tipo:"frase", tema:"chiaro", sopratitolo:"Risolvono la maggior parte dei quesiti pratici su quest'area",
  testo:"Davanti a una domanda di cui non ricordi la risposta: **quale delle tre manca?**"},

{id:"s23", tipo:"frase", tema:"chiaro", sopratitolo:"Il pezzo più concreto della lezione",
  testo:"Quattro riformulazioni. Da sapere a memoria non sono le frasi: è **quello che si sposta**."},
{id:"s24", tipo:"trappola", tema:"chiaro", attive:[0],
  sopratitolo:"Come si formulano le frasi", righe:FRASI},
{id:"s25", tipo:"trappola", tema:"chiaro", attive:[0,1,2],
  sopratitolo:"Come si formulano le frasi", righe:FRASI},
{id:"s26", tipo:"trappola", tema:"chiaro",
  sopratitolo:"Come si formulano le frasi", righe:FRASI},

{id:"s27", tipo:"elenco", tema:"chiaro", numerato:true, attive:[0,1],
  sopratitolo:"I quattro criteri — conoscerli permette di costruirne altre", voci:CRITERI},
{id:"s28", tipo:"elenco", tema:"chiaro", numerato:true, attive:[0,1,2],
  sopratitolo:"I quattro criteri — conoscerli permette di costruirne altre", voci:CRITERI},
{id:"s29", tipo:"sostituzione", tema:"tenue", sopratitolo:"Il quarto criterio: niente plurale paternalistico",
  da:{h:"Non si dice", t:"«Adesso **ci** laviamo»"},
  a:{h:"Si dice", t:"«Vuole lavarsi **adesso**, o preferisce tra mezz'ora?»"},
  sotto:"Riduce una persona adulta a un bambino, e lo fa con il tono di chi sta aiutando."},

{id:"s30", tipo:"frase", tema:"chiaro", sopratitolo:"La recovery",
  testo:"Costruire una vita soddisfacente **anche in presenza** del disturbo.",
  sotto:"La parola che regge la definizione è «anche»: non al posto del disturbo, e non dopo."},
{id:"s31", tipo:"titolo", tema:"profondo",
  titolo:"**Non coincide** con la guarigione clinica.",
  sotto:"Si può essere in recovery pur avendo ancora dei sintomi. È il punto che i quiz chiedono."},
{id:"s32", tipo:"tre", tema:"chiaro", attive:[0,1],
  sopratitolo:"I quattro elementi della recovery", box:RECOVERY},
{id:"s33", tipo:"tre", tema:"chiaro",
  sopratitolo:"I quattro elementi della recovery", box:RECOVERY},

{id:"s34", tipo:"elenco", tema:"chiaro",
  sopratitolo:"Che cosa significa per l'OSS", voci:AUTONOMIA},
{id:"s35", tipo:"frase", tema:"tenue", sopratitolo:"Un rischio che nasce da un'intenzione buona",
  testo:"L'**iperprotezione**: fare al posto della persona per proteggerla.",
  sotto:"Produce dipendenza, e conferma l'autostigma di cui si parlava nella 16.1."},
{id:"s36", tipo:"titolo", tema:"profondo",
  titolo:"La sicurezza si **garantisce**.<br>L'autonomia non si **sospende**."},

{id:"s37", tipo:"frase", tema:"chiaro", sopratitolo:"L'aderenza al percorso di cura",
  testo:"L'interruzione della terapia è una delle cause più frequenti di **ricaduta**.",
  sotto:"Ed è il motivo per cui questo punto riguarda l'OSS da vicino."},
{id:"s38", tipo:"elenco", tema:"chiaro",
  sopratitolo:"Che cosa compete all'OSS", voci:TERAPIA_SI},
{id:"s39", tipo:"elenco", tema:"tenue", vietato:true,
  sopratitolo:"Che cosa non compete all'OSS", voci:TERAPIA_NO},
{id:"s40", tipo:"titolo", tema:"profondo",
  titolo:"Il rifiuto va **sempre riferito**.<br>**Mai forzato**.",
  sotto:"La forzatura non è una scorciatoia: è un atto privo di legittimazione."},

{id:"s41", tipo:"frase", tema:"chiaro", sopratitolo:"Un ultimo punto, che riguarda te",
  testo:"Il carico emotivo dell'operatore è **alto**, e va riconosciuto anziché negato."},
{id:"s42", tipo:"catena", tema:"chiaro", passi:CARICO,
  sopratitolo:"Che cosa produce, in quest'area"},
{id:"s43", tipo:"elenco", tema:"chiaro",
  sopratitolo:"Che cosa aiuta", voci:AIUTA_OPERATORE},
{id:"s44", tipo:"frase", tema:"chiaro", sopratitolo:"E riconoscere i segnali di affaticamento prima che diventino esaurimento",
  testo:"Riconoscerli presto è una **competenza**, non un'ammissione di debolezza."},

{id:"s45", tipo:"frase", tema:"chiaro", sopratitolo:"Chiudo con due cose. La prima",
  testo:"L'aggressività verbale in fase acuta è un **sintomo**, non un giudizio su chi la riceve.",
  sotto:"È una distinzione che va fatta sul momento, cioè quando costa farla."},
{id:"s46", tipo:"frase", tema:"chiaro", sopratitolo:"Perché ricordarlo serve",
  testo:"Non elimina il disagio, ma evita di trasformarlo in un **conflitto personale**.",
  sotto:"E un conflitto personale, in quest'area, non si chiude a fine turno."},
{id:"s47", tipo:"titolo", tema:"profondo",
  titolo:"Non si ottiene collaborazione esercitando **autorità**.<br>Si ottiene costruendo **prevedibilità**."},
{id:"s48", tipo:"titolo", tema:"chiaro",
  titolo:"Chi sa che cosa aspettarsi da te<br>**collabora**.",
  sotto:"Molto più di una persona a cui è stato ordinato di farlo."},

{id:"s49", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione",
  titolo:"16.4", sottotitolo:"Le **dipendenze patologiche**",
  ente:"CISL FP Padova Rovigo · Concorso OSS Azienda Zero"},
];
