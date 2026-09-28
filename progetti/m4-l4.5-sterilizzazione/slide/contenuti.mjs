// Contenuto delle 50 scene della lezione 4.5 — Decontaminazione, disinfezione
// e sterilizzazione. Spaulding e' tre colonne che si accendono una per volta,
// i livelli di disinfezione una scala, il ciclo di riprocessazione un ciclo a
// otto passi. Illustrazioni nuove: vasca, autoclave, pacco, provetta.

const DEFINIZIONI = [
 {n:"1", t:"**Detersione**: rimozione meccanica dello sporco e del materiale organico"},
 {n:"2", t:"**Disinfezione**: eliminazione dei patogeni, non necessariamente delle spore"},
 {n:"3", t:"**Sterilizzazione**: eliminazione di **tutti** i microrganismi, spore comprese", key:true},
 {n:"4", t:"**Antisepsi**: la disinfezione dei tessuti viventi, cute e mucose"},
];
const SPAULDING = [
 {h:"Critici", key:true, voci:[{t:"Tessuti sterili o sistema vascolare"}, {t:"Strumenti chirurgici, cateteri vascolari, aghi"}, {t:"Sterilizzazione", key:true}]},
 {h:"Semicritici", voci:[{t:"Mucose o cute non integra"}, {t:"Endoscopi, lame del laringoscopio, termometri rettali"}, {t:"Disinfezione di alto livello", key:true}]},
 {h:"Non critici", voci:[{t:"Cute integra"}, {t:"Sfigmomanometro, fonendoscopio, padelle"}, {t:"Detersione e basso livello", key:true}]},
];
const ESEMPI = [
 {n:"1", t:"**Bisturi**, pinze chirurgiche → critici"}, {n:"2", t:"**Catetere venoso** → critico"},
 {n:"3", t:"**Endoscopio flessibile** → semicritico", key:true}, {n:"4", t:"**Lama del laringoscopio** → semicritica"},
 {n:"5", t:"**Fonendoscopio** → non critico"}, {n:"6", t:"**Bracciale** dello sfigmomanometro → non critico"},
];
const LIVELLI = [
 {t:"Basso livello", d:"batteri vegetativi e alcuni virus · sali di ammonio quaternario"},
 {t:"Livello intermedio", d:"anche i micobatteri, non le spore · alcol, cloroderivati, iodofori"},
 {t:"Alto livello", d:"tutto, spore in parte · acido peracetico, glutaraldeide, ortoftalaldeide", key:true},
];
const CICLO = [
 {t:"Decontaminazione", d:"subito dopo l'uso", key:true}, {t:"Detersione", d:"manuale o in lavastrumenti"}, {t:"Risciacquo"}, {t:"Asciugatura"},
 {t:"Controllo"}, {t:"Confezionamento"}, {t:"Sterilizzazione"}, {t:"Conservazione", d:"e tracciabilità"},
];
const INDICATORI = [
 {n:"1", t:"Fisici", d:"temperatura, pressione, tempo registrati"}, {n:"2", t:"Chimici", d:"viraggio di colore; Bowie-Dick ogni giorno"}, {n:"3", t:"Biologici", d:"spore che non devono crescere: i più affidabili", key:true},
];
const VERIFICA = [
 {t:"**Integrità** dell'involucro"}, {t:"**Assenza di umidità** o macchie"}, {t:"**Viraggio** dell'indicatore"}, {t:"**Data** e lotto"},
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 4 · Prevenzione e controllo delle ICA",
  titolo:"Decontaminazione, disinfezione<br>e sterilizzazione", sottotitolo:"4.5 · Tre livelli, un criterio: Spaulding",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"tre", tema:"chiaro", sopratitolo:"Micro-lezione 5 di 8 · tre parole che non sono sinonimi", box:[
  {n:"1", t:"Decontaminazione"}, {n:"2", t:"Disinfezione"}, {n:"3", t:"Sterilizzazione", key:true}]},
{id:"s03", tipo:"frase", tema:"chiaro", sopratitolo:"Livelli diversi, scopi diversi",
  testo:"Si scelgono con un criterio preciso: la **classificazione di Spaulding**. Partiamo dalle definizioni."},

{id:"s04", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, attive:[0,1], sopratitolo:"Le definizioni", celle:DEFINIZIONI},
{id:"s05", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"Le definizioni · la sterilizzazione elimina anche le spore", celle:DEFINIZIONI},
{id:"s06", tipo:"confronto", tema:"chiaro", sopratitolo:"La distinzione di linguaggio · stessa famiglia, due bersagli", col:[
  {h:"Antisettici", t:"Sulla **persona**: cute e mucose"},
  {h:"Disinfettanti", t:"Sugli **oggetti**: strumenti e superfici"}]},

{id:"s07", tipo:"frase", tema:"chiaro", sopratitolo:"La regola che precede tutto",
  testo:"**Senza detersione** non esiste disinfezione né sterilizzazione efficace."},
{id:"s08", tipo:"trappola", tema:"chiaro", sopratitolo:"Il materiale organico protegge i microrganismi e inattiva molti disinfettanti", righe:[
  {sb:"Disinfettante su uno strumento sporco", ok:"**Non disinfetta**: sangue, secrezioni e residui fanno da scudo"}]},
{id:"s09", tipo:"titolo", tema:"profondo",
  titolo:"Prima si pulisce,<br>**poi** si disinfetta o si sterilizza.",
  sotto:"Mai al contrario. La detersione è il passaggio più importante del ciclo."},

{id:"s10", tipo:"tre", tema:"chiaro", sopratitolo:"La classificazione di Spaulding · secondo dove arriva il dispositivo", box:[
  {n:"1", t:"Critici", key:true}, {n:"2", t:"Semicritici"}, {n:"3", t:"Non critici"}]},
{id:"s11", tipo:"colonne", tema:"chiaro", sopratitolo:"Spaulding · i critici", attive:[0], colonne:SPAULDING},
{id:"s12", tipo:"colonne", tema:"chiaro", sopratitolo:"Spaulding · i semicritici: almeno l'alto livello", attive:[0,1], colonne:SPAULDING},
{id:"s13", tipo:"colonne", tema:"chiaro", sopratitolo:"Spaulding · la tabella chiave", colonne:SPAULDING},

{id:"s14", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Gli esempi che i quiz chiedono", celle:ESEMPI},
{id:"s15", tipo:"raggiera", tema:"chiaro", sopratitolo:"La domanda è sempre una", centro:"Dove arriva?", raggi:[
  {t:"Sterile", d:"tessuto sterile o vaso: critico", key:true}, {t:"Mucosa", d:"o cute non integra: semicritico"}, {t:"Cute", d:"integra: non critico"}]},

{id:"s16", tipo:"scala", tema:"chiaro", sopratitolo:"I tre livelli di disinfezione · alto livello: per i semicritici", attive:[2], gradini:LIVELLI},
{id:"s17", tipo:"scala", tema:"chiaro", sopratitolo:"I tre livelli di disinfezione · intermedio: anche i micobatteri", attive:[1,2], gradini:LIVELLI},
{id:"s18", tipo:"scala", tema:"chiaro", sopratitolo:"Ciò che distingue i livelli: micobatteri e spore", gradini:LIVELLI},

{id:"s19", tipo:"cifre", tema:"chiaro", sopratitolo:"Gli antisettici · la clorexidina, di scelta per la cute prima del CVC", voci:[
  {n:2, suf:" %", t:"clorexidina", d:"in soluzione alcolica", key:true}, {n:70, suf:" %", t:"alcol", d:"la soluzione che la porta"}]},
{id:"s20", tipo:"icone", tema:"chiaro", sopratitolo:"Gli antisettici più usati", voci:[
  {icona:"goccia", t:"Clorexidina", d:"2 % in alcol 70 %", key:true}, {icona:"goccia", t:"Iodopovidone", d:"lo iodio legato a un polimero"}, {icona:"goccia", t:"Alcol etilico", d:"al 70 %"}]},
{id:"s21", tipo:"trappola", tema:"chiaro", sopratitolo:"La regola comune a tutti", righe:[
  {sb:"Asciugare con la garza prima del tempo", ok:"Rispettare il **tempo di contatto** e **lasciar asciugare** spontaneamente"}]},

{id:"s22", tipo:"ciclo", tema:"chiaro", sopratitolo:"Il ciclo di riprocessazione · da usato a sterile", centro:"Otto passi", attive:[0], passi:CICLO},
{id:"s23", tipo:"ciclo", tema:"chiaro", sopratitolo:"Il ciclo di riprocessazione · l'umidità compromette la sterilizzazione", centro:"Otto passi", attive:[0,1,2,3,4], passi:CICLO},
{id:"s24", tipo:"ciclo", tema:"chiaro", sopratitolo:"Il ciclo di riprocessazione · il primo passo è del reparto", centro:"Otto passi", passi:CICLO},

{id:"s25", tipo:"figura", tema:"chiaro", sopratitolo:"La decontaminazione · spesso confusa con la disinfezione", illu:"vasca",
  titolo:"Immersione in disinfettante<br>**prima** della detersione.",
  sotto:"Il trattamento iniziale dello strumento appena usato."},
{id:"s26", tipo:"sostituzione", tema:"chiaro", sopratitolo:"Lo scopo · un obbligo della normativa sul rischio biologico",
  da:{h:"Non", t:"rendere sicuro lo strumento per il paziente"}, a:{h:"Ma", t:"proteggere l'operatore che lo maneggerà"},
  sotto:"Chi lava lo strumento non deve lavorare su una carica piena."},

{id:"s27", tipo:"figura", tema:"chiaro", sopratitolo:"I metodi di sterilizzazione", illu:"autoclave", lato:"dx",
  titolo:"Vapore saturo in **autoclave**:<br>il metodo di prima scelta.",
  sotto:"Per tutto ciò che resiste al calore: economico, rapido, senza residui tossici."},
{id:"s28", tipo:"cifre", tema:"chiaro", sopratitolo:"I cicli più comuni · più caldo, meno minuti", voci:[
  {n:121, suf:" °C", t:"ciclo standard"}, {n:134, suf:" °C", t:"ciclo rapido", d:"tempi più brevi", key:true}]},
{id:"s29", tipo:"tre", tema:"chiaro", sopratitolo:"Per i materiali termolabili", box:[
  {n:"1", t:"Ossido di etilene", d:"efficace ma tossico: lunga aerazione"}, {n:"2", t:"Gas plasma di H₂O₂", d:"bassa temperatura, senza residui", key:true}, {n:"3", t:"Acido peracetico", d:"per alcuni dispositivi"}]},

{id:"s30", tipo:"tre", tema:"chiaro", sopratitolo:"Come si sa che la sterilizzazione è avvenuta · gli indicatori", attive:[0], cifre:true, box:INDICATORI},
{id:"s31", tipo:"tre", tema:"chiaro", sopratitolo:"Gli indicatori · chimici: dal nastro agli indicatori più complessi", attive:[0,1], cifre:true, box:INDICATORI},
{id:"s32", tipo:"frase", tema:"chiaro", sopratitolo:"Il test di Bowie-Dick · ogni giorno, prima del primo ciclo",
  testo:"Verifica la **rimozione dell'aria** nelle autoclavi a vuoto: se resta aria, il vapore non arriva ovunque."},
{id:"s33", tipo:"tre", tema:"chiaro", sopratitolo:"Gli indicatori · biologici: Geobacillus stearothermophilus per il vapore", cifre:true, box:INDICATORI},

{id:"s34", tipo:"figura", tema:"chiaro", sopratitolo:"Un'attenzione che i quiz amano", illu:"pacco",
  titolo:"Il nastro esterno dice:<br>**esposta** al processo.",
  sotto:"È entrata in autoclave. Nient'altro."},
{id:"s35", tipo:"titolo", tema:"profondo",
  titolo:"Il nastro non dice:<br>**il contenuto è sterile**.",
  sotto:"Per questo esistono gli indicatori interni e la verifica dei parametri del ciclo."},

{id:"s36", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"La conservazione · dove si ripone il materiale sterile", celle:[
  {t:"Luogo **asciutto**"}, {t:"**Pulito** e **chiuso**"}, {t:"**Sollevato** dal pavimento"}, {t:"Lontano da **umidità** e calore"}]},
{id:"s37", tipo:"sostituzione", tema:"chiaro", sopratitolo:"Sterilità evento-correlata",
  da:{h:"Non", t:"la data a decidere"}, a:{h:"Ma", t:"l'evento: lacerazione, umidità, caduta"},
  sotto:"La confezione resta sterile finché un evento non la compromette."},
{id:"s38", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Prima dell'uso si verifica · e si usa prima il materiale sterilizzato prima: FIFO", celle:VERIFICA},
{id:"s39", tipo:"trappola", tema:"chiaro", sopratitolo:"Qualunque data porti", righe:[
  {sb:"Confezione caduta a terra o bagnata", ok:"**Non è più sterile**: si scarta e si rimanda in centrale"}]},

{id:"s40", tipo:"catena", tema:"chiaro", sopratitolo:"La tracciabilità · ogni confezione è collegata a", passi:[
  {t:"Lotto"}, {t:"Ciclo"}, {t:"Autoclave"}, {t:"Operatore"}, {t:"Paziente", d:"etichetta in cartella", key:true}]},
{id:"s41", tipo:"frase", tema:"tenue", sopratitolo:"A che cosa serve",
  testo:"Se un ciclo risulta **non conforme**, si sa quali pazienti sono stati esposti e quali confezioni vanno ritirate."},

{id:"s42", tipo:"icone", tema:"chiaro", sopratitolo:"L'ambiente è un serbatoio · le superfici ad alto contatto", voci:[
  {icona:"sponde", t:"Sponde del letto", key:true}, {icona:"campana", t:"Campanello"}, {icona:"pompa", t:"Pompe infusionali"}, {icona:"contatto", t:"Maniglie e tastiere"}]},
{id:"s43", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"Anche qui · e con il C. difficile serve una disinfezione sporicida (4.3)", celle:[
  {n:"1", t:"**Prima la pulizia**, poi la disinfezione", key:true}, {n:"2", t:"Dal **pulito** allo **sporco**"}, {n:"3", t:"Dall'**alto** verso il **basso**"}]},

{id:"s44", tipo:"trappola", tema:"chiaro", sopratitolo:"Una regola netta · il fabbricante non garantisce la sicurezza dopo il primo uso", righe:[
  {sb:"«L'ho disinfettato, lo riuso»", ok:"**Monouso significa monouso**: il riutilizzo non è consentito"}]},

{id:"s45", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"In Veneto", celle:[
  {n:"1", t:"**Centrali di sterilizzazione** aziendali, con tracciabilità informatizzata fino al paziente", key:true},
  {n:"2", t:"Procedure dedicate per il **riprocessamento degli endoscopi**"},
  {n:"3", t:"**Sanificazione ambientale** regolata da capitolati e protocolli"}]},
{id:"s46", tipo:"confronto", tema:"chiaro", sopratitolo:"Chi fa che cosa", col:[
  {h:"Il reparto", t:"**Decontamina** e **conserva**"},
  {h:"La centrale", t:"**Deterge**, confeziona, **sterilizza** e traccia"}]},

{id:"s47", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Ricapitoliamo", celle:[
  {n:"1", t:"**Senza detersione**, niente disinfezione", key:true}, {n:"2", t:"Critico → **sterilizzazione**"},
  {n:"3", t:"Semicritico → **alto livello**"}, {n:"4", t:"Non critico → **basso livello**"}]},
{id:"s48", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Ricapitoliamo", celle:[
  {n:"5", t:"**Autoclave a vapore**: prima scelta"}, {n:"6", t:"Indicatori **biologici**: i più affidabili"},
  {n:"7", t:"Il **nastro** non garantisce la sterilità", key:true}, {n:"8", t:"Sterilità **evento-correlata**: verifica prima di ogni uso"}]},
{id:"s49", tipo:"frase", tema:"chiaro", sopratitolo:"Prossima lezione",
  testo:"Il reparto decontamina e conserva, la centrale sterilizza e traccia. E poi la minaccia che rende tutto più urgente: **la resistenza agli antibiotici**."},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione",
  titolo:"4.6 Antibiotico-resistenza<br>e stewardship", sottotitolo:"I germi che non rispondono più, e il ruolo dell'infermiere",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
