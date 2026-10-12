// Contenuto delle 49 scene della lezione 18.4: comunicazione, sensi e
// tecnologie assistive.
// *accento*  **accento in semibold**
//
// La lezione si apre e si chiude sullo stesso criterio: la tecnologia aiuta se
// la persona la governa. Il capitolo su tecnologia, dignita' e controllo e'
// detto piano, senza enfasi: la domanda («amplia o riduce la liberta'?») sta
// sul verde pieno, la violazione sul velo rosa.
//
// Il velo rosa (`tenue`) sta su che cosa NON si fa (gridare, coprirsi la
// bocca, anticipare chi usa la CAA, sorvegliare di nascosto) e sui
// distrattori. Le icone dove l'oggetto e' riconoscibile: orecchio, occhio,
// segnale, casa.
//
// Nessuna cifra o dato che non stia nel copione di partenza.

const SENSI = [
 {icona:"orecchio", t:"L'udito", d:"protesi acustiche · comunicare con chi sente poco"},
 {icona:"occhio", t:"La vista", d:"occhiali, luce, ambiente stabile"},
 {icona:"chat", t:"La CAA", d:"per chi non comunica con la voce"},
 {icona:"segnale", t:"Le tecnologie", d:"teleassistenza · telemedicina · sensori"},
];

const PROTESI = [
 {t:"**Inserirla** correttamente, verificare che sia **accesa**"},
 {t:"Cambiare o ricaricare la **batteria**", d:"la causa più frequente di non funzionamento"},
 {t:"Pulizia quotidiana con un **panno asciutto**", d:"cerume e umidità sono i nemici"},
 {t:"**Non si bagna**", d:"si toglie prima del bagno e della doccia"},
];

const PARLARE = [
 {t:"**Di fronte**, alla stessa altezza"},
 {t:"Il viso **illuminato**", d:"molte persone leggono le labbra senza saperlo"},
];

// Elenco `vietato`: la × rossa porta gia' la polarita', il testo resta piano.
const NON_GRIDARE = [
 {t:"Non gridare", d:"gridare distorce i suoni: si parla chiaramente, a frasi brevi"},
 {t:"Non coprirsi la bocca", d:"e si riduce il rumore di fondo"},
];

const VISTA = [
 {t:"Occhiali **puliti, integri, della persona giusta**", d:"a portata di mano: in struttura gli occhiali scambiati sono un problema reale"},
 {t:"Lenti d'ingrandimento · **caratteri grandi** · contrasti netti"},
 {t:"Illuminazione **forte e uniforme**", d:"senza abbagliamento · una luce notturna"},
];

const CAA_PER = [
 {t:"Afasia dopo ictus"}, {t:"SLA"}, {t:"Paralisi cerebrale"},
 {t:"Disabilità intellettiva"}, {t:"Autismo"},
];

const CAA_STRUMENTI = [
 {n:"Tabelle", t:"Simboli o lettere", d:"indicate col dito, lo sguardo o un puntatore"},
 {n:"Comunicatori", t:"Sintesi vocale", d:"e tablet"},
 {n:"Puntatori oculari", t:"Lo sguardo", d:"per chi muove solo gli occhi"},
];

const OSS_CAA = [
 {t:"**Conoscere** il sistema della persona", d:"quali simboli, quale tabella, quale dispositivo"},
 {t:"Lo strumento **sempre a portata**", d:"una tabella in un cassetto è una persona senza voce"},
];

const NON_CAA = [
 {t:"Non avere fretta", d:"la comunicazione con la CAA è lenta: la fretta la rende impossibile"},
 {t:"Non anticipare, non completare le frasi"},
 {t:"Non fingere di aver capito"},
];

const SOPRAVVIVENZA = [
 {t:"Sì"}, {t:"No"}, {t:"Dolore"}, {t:"Bagno"}, {t:"Aspetta"},
];

const REQUISITI = [
 {n:"Requisito 1", t:"Capirlo", d:"la persona deve capire e voler usare il dispositivo"},
 {n:"Requisito 2", t:"Addosso", d:"la caduta avviene lontano dal comodino"},
];

const TELE = [
 {n:"Telemonitoraggio", t:"Parametri a casa", d:"pressione · glicemia · saturazione · peso"},
 {n:"Telemedicina", t:"A distanza", d:"la visita o il consulto"},
];

const OSS_TELE = [
 {t:"**Aiuta** nell'uso"}, {t:"**Verifica** che la rilevazione avvenga"}, {t:"**Segnala** le difficoltà"},
];

const SENSORI = [
 {icona:"segnale", t:"Sensori", d:"di caduta, di letto, di movimento, sulle porte"},
 {icona:"persona", t:"Localizzatori GPS", d:"rischio di allontanamento, tipicamente nella demenza"},
 {icona:"casa", t:"Domotica", d:"luci al passaggio · comandi vocali · gas · apriporta"},
];

const CONDIZIONI = [
 {n:1, t:"Consenso"}, {n:2, t:"Informazione"}, {n:3, t:"Proporzionalità"},
];

const MEMORIA = [
 {t:"**Orologio calendario**", d:"data, giorno e ora in caratteri grandi"},
 {t:"**Lavagna** con il programma della giornata"},
 {t:"**Promemoria** sonori per i farmaci · dispenser con allarme", d:"preparati da chi ha competenza"},
 {t:"**Etichette** su armadi e porte · foto con il nome"},
 {t:"Telefono con **pochi tasti grandi**", d:"e le foto dei contatti"},
];

const DISTRATTORI_1 = [
 {sb:"La protesi acustica si lava", ok:"**Non** si bagna · il fischio: inserimento scorretto o volume alto"},
 {sb:"Con chi sente poco si alza la voce", ok:"Si parla **chiaro**, di fronte, alla stessa altezza"},
];
const DISTRATTORI_2 = [
 {sb:"La CAA sostituisce la voce", ok:"La **affianca**, e si introduce **presto**"},
 {sb:"Il telesoccorso sul comodino", ok:"Funziona solo se tenuto **addosso**"},
];
const DISTRATTORI_3 = [
 {sb:"I dati dei sensori sono liberi", ok:"Servono **consenso** · il dato è **personale**"},
 {sb:"La tecnologia non è mai contenzione", ok:"Un dispositivo **può essere** contenzione"},
];

const RIEPILOGO = [
 "Protesi acustica: **batteria**, pulizia a secco, non si bagna, si conserva identificata",
 "Chi sente poco: di fronte, chiaro, **senza gridare** · la vista: occhiali giusti, luce, ambiente stabile",
 "CAA: tabelle, comunicatori, puntatori oculari · **a portata, con tempo**, senza anticipare",
 "Teleassistenza **addosso** · telemonitoraggio: l'OSS aiuta, **non interpreta**",
 "Sensori e domotica: **consenso e proporzionalità** · non sostituiscono la presenza",
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 18 · Ausili, presidi e tecnologie assistive",
  titolo:"Comunicazione, sensi<br>**e tecnologie**", sottotitolo:"Lezione 18.4",
  ente:"CISL FP Padova Rovigo · Concorso OSS Azienda Zero"},

{id:"s02", tipo:"icone", tema:"chiaro",
  sopratitolo:"Modulo 18 · lezione 4 di 5 · la parte che cambia più in fretta", voci:SENSI},
{id:"s03", tipo:"titolo", tema:"profondo",
  titolo:"La tecnologia aiuta se **la persona la governa**.",
  sotto:"Non il contrario."},
{id:"s04", tipo:"frase", tema:"chiaro", sopratitolo:"Un sensore che non capisce · un dispositivo che la sorveglia a sua insaputa",
  testo:"Non sono assistenza: **sono controllo**."},

{id:"s05", tipo:"elenco", tema:"chiaro", attive:[0,1],
  sopratitolo:"Le protesi acustiche · retroauricolari, endoauricolari, a occhiale", voci:PROTESI},
{id:"s06", tipo:"elenco", tema:"chiaro",
  sopratitolo:"Le protesi acustiche · retroauricolari, endoauricolari, a occhiale", voci:PROTESI},
{id:"s07", tipo:"frase", tema:"chiaro", sopratitolo:"Si conserva in un contenitore identificato",
  testo:"Un apparecchio perso sono **giorni di isolamento**.",
  sotto:"Il fischio: inserimento scorretto o volume troppo alto."},

{id:"s08", tipo:"elenco", tema:"chiaro",
  sopratitolo:"Comunicare con chi sente poco, anche con la protesi", voci:PARLARE},
{id:"s09", tipo:"elenco", tema:"tenue", vietato:true,
  sopratitolo:"Comunicare con chi sente poco · che cosa non fare", voci:NON_GRIDARE},
{id:"s10", tipo:"sostituzione", tema:"chiaro", sopratitolo:"Se non ha capito",
  da:{h:"Non", t:"più forte"}, a:{h:"Ma", t:"con **parole diverse**"},
  sotto:"Prima si verifica la comprensione."},
{id:"s11", tipo:"titolo", tema:"profondo",
  titolo:"L'apparecchio funzionante **è prevenzione**.",
  sotto:"Il deficit uditivo non trattato è associato a isolamento, depressione, declino cognitivo."},

{id:"s12", tipo:"elenco", tema:"chiaro", attive:[0],
  sopratitolo:"La vista", voci:VISTA},
{id:"s13", tipo:"elenco", tema:"chiaro",
  sopratitolo:"La vista", voci:VISTA},
{id:"s14", tipo:"frase", tema:"chiaro", sopratitolo:"Per chi non vede",
  testo:"Ambiente **stabile**: gli oggetti sempre nello stesso posto. E si descrive **a voce** ciò che si fa."},
{id:"s15", tipo:"frase", tema:"chiaro", sopratitolo:"Il piatto come un orologio",
  testo:"La carne **alle sei**, le verdure **alle dodici**.",
  sotto:"Poi bastone bianco, cane guida, sintesi vocale."},

{id:"s16", tipo:"frase", tema:"chiaro", sopratitolo:"La comunicazione aumentativa e alternativa · CAA",
  testo:"Gli strumenti per chi non può comunicare con la **voce** o con la **scrittura ordinaria**."},
{id:"s17", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false,
  sopratitolo:"Per chi", celle:CAA_PER},
{id:"s18", tipo:"tre", tema:"chiaro",
  sopratitolo:"Gli strumenti", box:CAA_STRUMENTI},
{id:"s19", tipo:"titolo", tema:"profondo",
  titolo:"La CAA **affianca** la voce, non la sostituisce.",
  sotto:"E va introdotta presto, non quando non c'è più alternativa."},

{id:"s20", tipo:"elenco", tema:"chiaro",
  sopratitolo:"L'OSS e la CAA", voci:OSS_CAA},
{id:"s21", tipo:"elenco", tema:"tenue", vietato:true,
  sopratitolo:"L'OSS e la CAA · dare il tempo", voci:NON_CAA},
{id:"s22", tipo:"griglia", tema:"chiaro", colonne:5, spunta:false,
  sopratitolo:"Le parole di sopravvivenza · e il dispositivo carico e acceso", celle:SOPRAVVIVENZA},

{id:"s23", tipo:"frase", tema:"chiaro", sopratitolo:"La teleassistenza, o telesoccorso",
  testo:"Un **pulsante** al collo o al polso, collegato a una centrale **attiva 24 ore**."},
{id:"s24", tipo:"frase", tema:"chiaro", sopratitolo:"Per chi vive solo, a rischio di caduta o malore",
  testo:"La persona preme e parla con un operatore, che attiva **i soccorsi** o **i familiari**."},
{id:"s25", tipo:"tre", tema:"chiaro",
  sopratitolo:"La teleassistenza · due requisiti", box:REQUISITI},
{id:"s26", tipo:"frase", tema:"chiaro", sopratitolo:"Anche con rilevazione automatica di caduta",
  testo:"Spesso la attiva il **Comune** o l'**ULSS**. L'OSS può **segnalare il bisogno**."},

{id:"s27", tipo:"tre", tema:"chiaro",
  sopratitolo:"Telemonitoraggio e telemedicina", box:TELE},
{id:"s28", tipo:"frase", tema:"chiaro", sopratitolo:"Il territorio e le Centrali Operative Territoriali · Modulo 13",
  testo:"La persona cronica **resta a casa**, seguita a distanza."},
{id:"s29", tipo:"griglia", tema:"chiaro", colonne:3,
  sopratitolo:"L'OSS al domicilio", celle:OSS_TELE},
{id:"s30", tipo:"titolo", tema:"profondo",
  titolo:"L'OSS **non interpreta** i dati.",
  sotto:"E non modifica terapie: le stesse regole dei parametri del Modulo 8."},

{id:"s31", tipo:"icone", tema:"chiaro",
  sopratitolo:"Sensori, localizzatori e domotica", voci:SENSORI},
{id:"s32", tipo:"griglia", tema:"chiaro", colonne:3,
  sopratitolo:"Aiutano la sicurezza, a tre condizioni", celle:CONDIZIONI},
{id:"s33", tipo:"frase", tema:"chiaro", sopratitolo:"Il dato raccolto è un dato personale · Modulo 12",
  testo:"Un sensore non sostituisce **la presenza**. Un localizzatore non sostituisce **la sorveglianza**."},

{id:"s34", tipo:"frase", tema:"chiaro", sopratitolo:"Tecnologia, dignità e controllo",
  testo:"La tecnologia **può essere contenzione**: un sensore che impedisce di uscire, una telecamera in stanza."},
{id:"s35", tipo:"titolo", tema:"profondo",
  titolo:"Questo dispositivo **amplia** la libertà della persona, o la **riduce**?",
  sotto:"La domanda da porsi, sempre."},
{id:"s36", tipo:"frase", tema:"tenue", sopratitolo:"Una violazione, anche a fin di bene",
  testo:"Sorvegliare senza che la persona lo sappia. Le tecnologie si usano con la persona, mai contro."},
{id:"s37", tipo:"frase", tema:"chiaro", sopratitolo:"Nella demenza avanzata decide chi la rappresenta",
  testo:"Il principio del **minor intervento**: il dispositivo meno invasivo che garantisce la sicurezza necessaria."},

{id:"s38", tipo:"elenco", tema:"chiaro", attive:[0],
  sopratitolo:"Memoria e orientamento · demenza iniziale, deterioramento cognitivo lieve", voci:MEMORIA},
{id:"s39", tipo:"elenco", tema:"chiaro", attive:[0,1,2],
  sopratitolo:"Memoria e orientamento · demenza iniziale, deterioramento cognitivo lieve", voci:MEMORIA},
{id:"s40", tipo:"elenco", tema:"chiaro",
  sopratitolo:"Memoria e orientamento · demenza iniziale, deterioramento cognitivo lieve", voci:MEMORIA},
{id:"s41", tipo:"titolo", tema:"profondo",
  titolo:"Gli ausili più efficaci **non si comprano**.",
  sotto:"La routine stabile e l'ambiente invariato."},

{id:"s42", tipo:"trappola", tema:"tenue",
  sopratitolo:"I distrattori tipici", righe:DISTRATTORI_1},
{id:"s43", tipo:"trappola", tema:"tenue",
  sopratitolo:"I distrattori tipici", righe:DISTRATTORI_2},
{id:"s44", tipo:"trappola", tema:"tenue",
  sopratitolo:"I distrattori tipici", righe:DISTRATTORI_3},

{id:"s45", tipo:"memo", tema:"chiaro", attive:[0],
  sopratitolo:"Riepilogo", voci:RIEPILOGO},
{id:"s46", tipo:"memo", tema:"chiaro", attive:[0,1,2],
  sopratitolo:"Riepilogo", voci:RIEPILOGO},
{id:"s47", tipo:"memo", tema:"chiaro",
  sopratitolo:"Riepilogo", voci:RIEPILOGO},
{id:"s48", tipo:"frase", tema:"chiaro", sopratitolo:"Prossima lezione",
  testo:"Scelta, sicurezza, manutenzione, e **il riepilogo del modulo**."},

{id:"s49", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione",
  titolo:"18.5", sottotitolo:"Scelta, sicurezza, manutenzione e **riepilogo del modulo**",
  ente:"CISL FP Padova Rovigo · Concorso OSS Azienda Zero"},
];
