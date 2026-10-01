// Contenuto delle 50 scene della lezione 8.7 — oncologia ed ematologia.
// Due corpi nuovi: il nadir (la curva dei globuli bianchi che scende a
// 7–14 giorni dalla chemioterapia, con la zona rossa e la casetta) e le
// soglie (neutrofili sotto 500 più febbre da 38,3, con la regola
// «emocolture e antibiotico entro 60 minuti»; in modo piastrine le soglie
// 50.000 e 10–20.000). Il caso riusa il nadir e le soglie.

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 8 · Assistenza in area medica",
  titolo:"Oncologia<br>ed ematologia", sottotitolo:"8.7 · La neutropenia febbrile: ogni ora conta",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"frase", tema:"chiaro", sopratitolo:"Micro-lezione 7 di 8 · mesi o anni, attraverso trattamenti pesanti e momenti difficili",
  testo:"Questa lezione unisce **due piani**."},
{id:"s03", tipo:"confronto", tema:"chiaro", sopratitolo:"Due piani", col:[
  {h:"Tecnico", t:"gli effetti dei trattamenti e le emergenze, prima fra tutte la **neutropenia febbrile**", key:true}, {h:"Umano", t:"la persona con un tumore **non è solo un corpo** da trattare"}]},

{id:"s04", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Un richiamo alla lezione 5.7, che contiene la parte tecnica", celle:[
  {n:"1", t:"Allestimento centralizzato nell'**UFA**"}, {n:"2", t:"**DPI** nella somministrazione"}, {n:"3", t:"La sequenza dello **stravaso**", key:true}]},
{id:"s05", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Qui ci occupiamo degli effetti dei trattamenti sulla persona", celle:[
  {n:"4", t:"Escreti contaminati per almeno **48 ore**"}, {n:"5", t:"La **Raccomandazione 14** sugli errori con gli antineoplastici", key:true}]},

{id:"s06", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"Nausea e vomito da chemioterapia · tre tipi · basta l'odore dell'ospedale", celle:[
  {n:"1", t:"**Anticipatori**: prima del trattamento, per condizionamento", key:true}]},
{id:"s07", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"Tre tipi", celle:[
  {n:"1", t:"**Anticipatori**: prima"}, {n:"2", t:"**Acuti**: entro 24 ore", key:true}, {n:"3", t:"**Ritardati**: dopo 24 ore, anche per giorni"}]},
{id:"s08", tipo:"trappola", tema:"chiaro", sopratitolo:"La regola · è molto più facile prevenire la nausea che fermarla", righe:[
  {sb:"Antiemetici solo al bisogno", ok:"**Prima** del trattamento e **secondo lo schema** prescritto"}]},
{id:"s09", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Consigli pratici", celle:[
  {t:"Pasti **piccoli e frequenti**", key:true}, {t:"Cibi **freddi**: meno odorosi"}, {t:"Evitare **odori forti**"}]},

{id:"s10", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"La mucosite · infiammazione e ulcerazione delle mucose, soprattutto della bocca", celle:[
  {n:"→", t:"**Dolore**, difficoltà a mangiare, rischio di **infezione**", key:true}]},
{id:"s11", tipo:"trappola", tema:"chiaro", sopratitolo:"L'assistenza · igiene orale con spazzolino morbido, sciacqui blandi con fisiologica o bicarbonato", righe:[
  {sb:"Collutori alcolici: bruciano e seccano", ok:"**Niente collutori alcolici**"}]},
{id:"s12", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Una mucosite grave fa male come un'ustione", celle:[
  {t:"**Analgesia**", key:true}, {t:"**Nutrizione**"}, {t:"Con alcuni farmaci la **crioterapia**: ghiaccio in bocca durante l'infusione"}]},

{id:"s13", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"La mielosoppressione · la chemioterapia riduce la produzione del midollo", celle:[
  {n:"↓", t:"**Globuli bianchi**, **rossi** e **piastrine**", key:true}]},
{id:"s14", tipo:"nadir", tema:"chiaro", sopratitolo:"Il punto più basso si chiama nadir · 7–14 giorni dopo il trattamento: il periodo di maggiore rischio, spesso quando la persona è già a casa"},
{id:"s15", tipo:"tre", tema:"chiaro", sopratitolo:"Tre cali, tre rischi", box:[
  {n:"1", t:"Neutropenia", d:"infezioni", key:true}, {n:"2", t:"Anemia", d:"astenia, dispnea"}, {n:"3", t:"Piastrinopenia", d:"sanguinamento"}]},

{id:"s16", tipo:"soglie", tema:"chiaro", sopratitolo:"La neutropenia febbrile, l'emergenza oncologica più frequente", regola:false},
{id:"s17", tipo:"soglie", tema:"chiaro", sopratitolo:"Un'emergenza: una persona senza difese può morire di sepsi in poche ore · emocolture periferiche e dal catetere"},
{id:"s18", tipo:"trappola", tema:"chiaro", sopratitolo:"Una trappola · senza neutrofili non si forma pus né infiammazione evidente", righe:[
  {sb:"«Non ha segni di infezione»", ok:"I segni possono essere **minimi**: a volte la **febbre è l'unico segno**"}]},

{id:"s19", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Le misure nel paziente neutropenico", celle:[
  {t:"**Igiene delle mani** rigorosissima", key:true}, {t:"**Niente visitatori** con sintomi di infezione"}, {t:"Igiene **orale** e **cutanea**; sicurezza degli alimenti"}, {t:"**Niente fiori e piante**"}]},
{id:"s20", tipo:"trappola", tema:"chiaro", sopratitolo:"Nessuna manovra rettale · microlesioni e batteriemie · nei casi indicati, l'isolamento protettivo della lezione 4.3", righe:[
  {sb:"Temperatura rettale, supposte, clisteri", ok:"**Niente manovre rettali**"}]},
{id:"s21", tipo:"frase", tema:"chiaro", sopratitolo:"E l'educazione",
  testo:"Misurare la febbre a casa e sapere **chi chiamare, subito**, se supera la soglia."},

{id:"s22", tipo:"soglie", tema:"chiaro", sopratitolo:"La piastrinopenia", modo:"piastrine", sotto:""},
{id:"s23", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"I segni", celle:[
  {n:"1", t:"**Petecchie**: piccoli puntini rossi", key:true}, {n:"2", t:"**Ecchimosi**"}, {n:"3", t:"Sangue dalle **gengive**, **epistassi**"}, {n:"4", t:"Sangue nelle **urine** o nelle **feci**"}]},
{id:"s24", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Le precauzioni dell'anticoagulato, lezione 5.5", celle:[
  {t:"Spazzolino morbido, **rasoio elettrico**"}, {t:"**Niente intramuscolari** né manovre rettali", key:true}, {t:"Prevenire le **cadute**"}, {t:"**Compressione prolungata** dopo i prelievi"}]},
{id:"s25", tipo:"frase", tema:"chiaro", sopratitolo:"E trasfusione di piastrine secondo prescrizione · lezione 6.6",
  testo:"A **20–24 gradi**, in **agitazione**."},

{id:"s26", tipo:"catena", tema:"chiaro", sopratitolo:"Le emergenze oncologiche · la sindrome da lisi tumorale", passi:[
  {t:"Distruzione rapida delle cellule"}, {t:"Potassio, fosforo, acido urico", key:true}, {t:"Danno renale"}]},
{id:"s27", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"La lisi tumorale · si previene, si monitora", celle:[
  {t:"**Idratazione** e farmaci specifici", key:true}, {t:"**Elettroliti** e **diuresi**"}]},
{id:"s28", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"La compressione midollare · un'urgenza: ogni ora di ritardo aumenta il rischio di paralisi permanente", celle:[
  {n:"!", t:"**Dolore dorsale** che peggiora, **debolezza delle gambe**, disturbi **sfinterici**", key:true}]},
{id:"s29", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Le emergenze oncologiche", celle:[
  {n:"3", t:"**Sindrome della vena cava superiore**: edema di volto e collo, dispnea", key:true}, {n:"4", t:"**Ipercalcemia**: confusione, stipsi, poliuria"}]},

{id:"s30", tipo:"frase", tema:"chiaro", sopratitolo:"Gli altri effetti · l'alopecia, con un forte impatto sull'immagine di sé",
  testo:"Va spiegata **prima**: coglierla di sorpresa è peggio."},
{id:"s31", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"Gli altri effetti", celle:[
  {n:"1", t:"La **fatigue**: una stanchezza che non passa con il riposo, la più frequente e la più sottovalutata", key:true}, {n:"2", t:"La **neuropatia periferica**: formicolii a mani e piedi"}, {n:"3", t:"Le alterazioni del **gusto**"}]},
{id:"s32", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Gli altri effetti", celle:[
  {n:"4", t:"L'**infertilità**: si informa **prima** del trattamento, per le misure di preservazione", key:true}, {n:"5", t:"**Diarrea** o **stipsi**"}]},

{id:"s33", tipo:"frase", tema:"chiaro", sopratitolo:"Il supporto nutrizionale · la cachessia della lezione 3.3 non si corregge solo con il cibo",
  testo:"Alto rischio di **malnutrizione** e di **cachessia**."},
{id:"s34", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Il supporto nutrizionale", celle:[
  {t:"**Screening** nutrizionale"}, {t:"Pasti **piccoli e frequenti**, cibi graditi, supplementi"}, {t:"Soprattutto: **trattare i sintomi** che impediscono di mangiare: nausea, mucosite, dolore, stipsi", key:true}]},

{id:"s35", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Il supporto psicologico · cambia la vita della famiglia e il lavoro", celle:[
  {n:"1", t:"**Ansia**, **paura**", key:true}, {n:"2", t:"A volte **depressione**"}]},
{id:"s36", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Gli strumenti della lezione 2.7", celle:[
  {t:"**Ascolto**", key:true}, {t:"**Informazione graduale**"}, {t:"**Presenza**"}, {t:"Il **caregiver**; quando serve, la **psico-oncologia**"}]},
{id:"s37", tipo:"trappola", tema:"chiaro", sopratitolo:"Un concetto importante · lo vedremo nel modulo 11", righe:[
  {sb:"«Le cure palliative sono il fine vita»", ok:"**Cure palliative precoci**, simultanee alle terapie: migliorano la qualità della vita"}]},

{id:"s38", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"La radioterapia, in cenni · la cute dell'area irradiata", celle:[
  {t:"Lavaggio **delicato**, asciugare **tamponando**", key:true}, {t:"**Niente creme** subito prima della seduta"}, {t:"**Niente sole**"}]},
{id:"s39", tipo:"trappola", tema:"chiaro", sopratitolo:"La fatigue · gli effetti legati alla sede: mucosite nel distretto testa-collo, diarrea nella pelvi", righe:[
  {sb:"Lavare via i segni disegnati sulla pelle", ok:"**Non cancellare i segni** di centratura"}]},
{id:"s40", tipo:"tre", tema:"chiaro", sopratitolo:"La brachiterapia · la sorgente radioattiva è dentro il corpo · le regole della radioprotezione", box:[
  {n:"1", t:"Tempo", d:"limitarlo", key:true}, {n:"2", t:"Distanza", d:"aumentarla"}, {n:"3", t:"Schermature", d:"usarle"}]},

{id:"s41", tipo:"nadir", tema:"chiaro", sopratitolo:"Il caso · una donna in chemioterapia, ultimo ciclo dieci giorni fa: siamo nel nadir · telefona: febbre a 38,4, nessun altro sintomo, «solo un po' stanca»", sotto:"che cosa fai?"},
{id:"s42", tipo:"frase", tema:"chiaro", sopratitolo:"La tratti come una possibile neutropenia febbrile finché non si dimostra il contrario",
  testo:"Deve **presentarsi subito** in ospedale, secondo il percorso previsto."},
{id:"s43", tipo:"soglie", tema:"chiaro", sopratitolo:"Dove si eseguono emocromo, emocolture e antibiotico entro un'ora"},
{id:"s44", tipo:"titolo", tema:"profondo",
  titolo:"«Prenda un antipiretico e vediamo domani» è la risposta che **può costarle la vita**.",
  sotto:"La febbre al nadir è un'emergenza."},

{id:"s45", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"In Veneto · la Rete Oncologica Veneta", celle:[
  {n:"1", t:"**Percorsi diagnostico-terapeutici** per ciascun tipo di tumore", key:true}, {n:"2", t:"Infermieri dedicati e **case manager** che accompagnano la persona lungo il percorso"}]},
{id:"s46", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"All'orale, citare la Rete Oncologica Veneta e il case manager mostra conoscenza del sistema", celle:[
  {n:"3", t:"I **day hospital** oncologici"}, {n:"4", t:"La rete delle **cure palliative**"}, {n:"5", t:"Gli **screening** regionali: mammella, cervice, colon-retto", key:true}]},

{id:"s47", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"La sintesi", celle:[
  {t:"**Antiemetici prima** del trattamento"}, {t:"Mucosite: **niente collutori alcolici**"}, {t:"**Nadir** a 7–14 giorni"}, {t:"Neutropenia febbrile: **< 500** e **≥ 38,3**: emocolture e **antibiotico entro 60 minuti**", key:true}]},
{id:"s48", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"La sintesi", celle:[
  {t:"Nel neutropenico **niente manovre rettali**, niente fiori"}, {t:"Piastrine **< 50.000** rischio, **< 10–20.000** spontaneo", key:true}, {t:"**Compressione midollare**: urgenza"}, {t:"Radioterapia: **non cancellare i segni**"}]},
{id:"s49", tipo:"frase", tema:"chiaro", sopratitolo:"Una frase da portare via · nella prossima lezione ricomponiamo il modulo 8, con i segni d'allarme",
  testo:"La **febbre** in un paziente in chemioterapia è un'**emergenza** finché non si dimostra il contrario."},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione",
  titolo:"8.8<br>Riepilogo del modulo 8<br>e autovalutazione", sottotitolo:"I segni d'allarme, apparato per apparato",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
