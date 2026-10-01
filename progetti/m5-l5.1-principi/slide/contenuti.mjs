// Contenuto delle 50 scene della lezione 5.1 — i principi di farmacologia.
// Cinque corpi nuovi, tutti nati qui: l'ADME (il vaso con le quattro stazioni e
// i puntini che corrono), l'emivita (la curva che si dimezza, e l'accumulo a
// dente di sega fino allo steady state), la finestra terapeutica (la banda che
// si restringe), il recettore (l'agonista che cala nella tasca, l'antagonista
// che la occupa), il legame con l'albumina. Illustrazioni nuove: pillola,
// fegato, rene, pompelmo, triangolo nero, anziano, recettore.

const LEZIONI = [
 {n:"5.1", t:"Principi", illu:"pillola"},
 {n:"5.2", t:"Vie e tecniche", illu:"siringa"},
 {n:"5.3", t:"Calcoli", illu:"quiz"},
 {n:"5.4", t:"Somministrazione sicura", illu:"cartello"},
 {n:"5.5", t:"Cardio, diabete, anticoagulanti", illu:"cuore"},
 {n:"5.6", t:"Antibiotici, analgesici", illu:"microbo"},
 {n:"5.7", t:"Farmaci in reparto", illu:"fiala"},
 {n:"5.8", t:"Riepilogo e calcoli", illu:"orologio"},
];
const CINETICA = [
 {h:"Farmacocinetica", voci:[{t:"Che cosa fa **l'organismo al farmaco**", key:true}, {t:"Lo assorbe"}, {t:"Lo distribuisce"}, {t:"Lo trasforma"}, {t:"Lo elimina"}]},
 {h:"Farmacodinamica", voci:[{t:"Che cosa fa **il farmaco all'organismo**", key:true}, {t:"Dove agisce"}, {t:"Con quale effetto"}]},
];
const TDM = [
 {t:"Digossina"}, {t:"Litio"}, {t:"Warfarin", d:"INR", key:true}, {t:"Fenitoina"}, {t:"Teofillina"}, {t:"Aminoglicosidi"}, {t:"Vancomicina"},
];
const INTER = [
 {h:"Induttori", voci:[{t:"Rifampicina", key:true}, {t:"Accelerano il metabolismo"}, {t:"**Meno** effetto"}]},
 {h:"Inibitori", voci:[{t:"Macrolidi, antimicotici", key:true}, {t:"Rallentano il metabolismo"}, {t:"**Più** effetto"}]},
 {h:"Farmacodinamiche", voci:[{t:"Due farmaci sommano"}, {t:"o contrastano"}, {t:"i loro effetti"}]},
];
const ANZIANO = [
 {n:"1", t:"**Meno acqua corporea** → i farmaci idrosolubili raggiungono concentrazioni più alte"},
 {n:"2", t:"**Più massa grassa** → i liposolubili, come le **benzodiazepine**, si accumulano e durano di più"},
 {n:"3", t:"**Ridotta funzione renale ed epatica**"},
 {n:"4", t:"Spesso **ipoalbuminemia**"},
 {n:"5", t:"**Politerapia**: il rischio di interazioni cresce con il numero dei farmaci", key:true},
];
const VENETO = [
 {n:"1", t:"**Responsabile aziendale** di farmacovigilanza → **Centro regionale** → rete nazionale", key:true},
 {n:"2", t:"**Ricognizione** della terapia all'ingresso"},
 {n:"3", t:"**Riconciliazione** nei passaggi di setting — Raccomandazione 17"},
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 5 · Farmacologia e gestione sicura della terapia",
  titolo:"Principi di farmacologia<br>per l'infermiere", sottotitolo:"5.1 · ADME, emivita, finestra terapeutica, reazioni avverse",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"icone", tema:"chiaro", sopratitolo:"Micro-lezione 1 di 8 · il modulo che nei concorsi pesa più di ogni altro", voci:[
  {icona:"quiz", t:"Domande secche"}, {icona:"cerchio", t:"Calcoli", d:"dosi e velocità"}, {icona:"cartella", t:"Casi clinici", key:true}]},
{id:"s03", tipo:"anello", tema:"chiaro", sopratitolo:"La somministrazione · la responsabilità diretta dell'infermiere, in otto lezioni", centro:"Modulo 5", sotto:"otto lezioni", voci:LEZIONI},
{id:"s04", tipo:"frase", tema:"chiaro", sopratitolo:"Si comincia dai principi",
  testo:"Non per diventare farmacologi, ma per capire **perché** un farmaco si comporta in un certo modo — e quindi **che cosa sorvegliare**."},

{id:"s05", tipo:"colonne", tema:"chiaro", sopratitolo:"Due parole da non confondere · i quiz le mettono una accanto all'altra", attive:[0], colonne:CINETICA},
{id:"s06", tipo:"colonne", tema:"chiaro", sopratitolo:"Una frase ciascuna, ed è già una risposta d'esame", colonne:CINETICA},

{id:"s07", tipo:"adme", tema:"chiaro", sopratitolo:"ADME · la farmacocinetica in quattro lettere", attive:[0,1]},
{id:"s08", tipo:"adme", tema:"chiaro", sopratitolo:"ADME · metabolismo nel fegato (citocromo P450), eliminazione renale, biliare, polmonare, cutanea"},
{id:"s09", tipo:"gesti", tema:"chiaro", sopratitolo:"I due organi da cui dipende quanto a lungo un farmaco resta nel corpo", voci:[
  {illu:"fegato", t:"Fegato", d:"metabolismo: citocromo P450"}, {illu:"rene", t:"Rene", d:"eliminazione: se funziona male, il farmaco resta di più", key:true}]},

{id:"s10", tipo:"cifre", tema:"chiaro", sopratitolo:"La biodisponibilità · la frazione della dose che raggiunge la circolazione in forma attiva", voci:[
  {n:100, suf:" %", t:"endovenosa", d:"per definizione: il farmaco è già nel sangue", key:true}, {n:"< 100 %", t:"orale", d:"ridotta dall'effetto di primo passaggio"}]},
{id:"s11", tipo:"percorso", tema:"chiaro", sopratitolo:"L'effetto di primo passaggio · la via orale", tappe:[
  {t:"Intestino", d:"assorbimento"}, {t:"Vena porta"}, {t:"Fegato", d:"ne inattiva una parte", key:true}, {t:"Circolazione", d:"meno del 100 %"}]},
{id:"s12", tipo:"tre", tema:"chiaro", sopratitolo:"Ecco perché la dose orale è spesso più alta di quella endovenosa", box:[
  {n:"Orale", t:"primo passaggio **pieno**"}, {n:"Sublinguale", t:"lo **evita**", d:"la nitroglicerina è l'esempio classico", key:true}, {n:"Rettale", t:"lo evita **in parte**"}]},

{id:"s13", tipo:"legame", tema:"chiaro", sopratitolo:"Il legame con le proteine plasmatiche · solo la quota libera è attiva", attive:[0], voci:[
  {h:"Albumina normale", d:"la quota legata è una riserva che non agisce"}, {h:"Ipoalbuminemia", d:"più farmaco libero", key:true}]},
{id:"s14", tipo:"legame", tema:"chiaro", sopratitolo:"Se l'albumina è bassa (la malnutrizione della 3.3) · più effetto e più tossicità, a dose invariata", voci:[
  {h:"Albumina normale", d:"la quota legata è una riserva che non agisce"}, {h:"Ipoalbuminemia", big:"warfarin · fenitoina", d:"i farmaci ad alto legame: qui conta di più", key:true}]},

{id:"s15", tipo:"emivita", tema:"chiaro", sopratitolo:"L'emivita · il tempo in cui la concentrazione plasmatica si dimezza", note:[
  {t:"t½", d:"da 100 a 50,", d2:"poi 25, poi 12,5", key:true}, {t:"Due regole", d:"discendono da qui"}]},
{id:"s16", tipo:"emivita", tema:"chiaro", modo:"accumulo", sopratitolo:"Con somministrazioni regolari · lo stato stazionario dopo circa 4–5 emivite", note:[
  {t:"Steady state", d:"concentrazione stabile", d2:"dopo 4–5 emivite", key:true}, {t:"Eliminazione", d:"dopo la sospensione,", d2:"altre 4–5 emivite"}]},
{id:"s17", tipo:"confronto", tema:"chiaro", sopratitolo:"Emivita lunga · tanto ad agire del tutto, e tanto ad andarsene", col:[
  {h:"Emivita lunga", t:"Ci mette **tanto ad agire** del tutto, e tanto ad andarsene"},
  {h:"Dose di carico", t:"Alcune terapie partono così, per **non aspettare cinque emivite**", key:true}]},

{id:"s18", tipo:"finestra", tema:"chiaro", sopratitolo:"La finestra terapeutica · fra la concentrazione efficace e quella tossica", h:"finestra ampia", farmaci:[
  {t:"Basta poco", d:"quando è stretta"}]},
{id:"s19", tipo:"finestra", tema:"chiaro", stretta:true, sopratitolo:"Finestra stretta → monitoraggio dei livelli ematici (TDM)", h:"i sette da ricordare", farmaci:TDM},
{id:"s20", tipo:"figura", tema:"chiaro", sopratitolo:"Per questi l'infermiere guarda anche l'orario del prelievo rispetto alla dose", illu:"orologio",
  titolo:"Un livello prelevato al momento sbagliato **non si interpreta**.",
  sotto:"Il TDM vale solo se il prelievo cade dove il protocollo lo chiede."},

{id:"s21", tipo:"recettore", tema:"chiaro", sopratitolo:"La farmacodinamica in tre concetti · agonista e antagonista", voci:[
  {t:"Agonista", d:"si lega al recettore e lo **attiva**"}, {t:"Antagonista", d:"si lega e lo **blocca**: il naloxone sugli oppioidi", key:true}]},
{id:"s22", tipo:"confronto", tema:"chiaro", sopratitolo:"Tolleranza e dipendenza", col:[
  {h:"Tolleranza", t:"Servono **dosi crescenti** per ottenere lo stesso effetto", key:true},
  {h:"Dipendenza", t:"**Fisica**, con sindrome da astinenza alla sospensione, o **psichica**"}]},
{id:"s23", tipo:"frase", tema:"chiaro", sopratitolo:"Lo rivedremo nella lezione 5.6",
  testo:"Negli **oppioidi** il confine fra tolleranza e dipendenza decide la terapia del dolore."},

{id:"s24", tipo:"colonne", tema:"chiaro", sopratitolo:"Le interazioni · farmacocinetiche: un farmaco modifica il destino di un altro", attive:[0], colonne:INTER},
{id:"s25", tipo:"colonne", tema:"chiaro", sopratitolo:"Le interazioni · sugli enzimi epatici, o sugli effetti", colonne:INTER},
{id:"s26", tipo:"griglia", tema:"chiaro", colonne:2, sopratitolo:"Le interazioni farmaco-cibo · quattro da sapere", celle:[
  {n:"1", t:"**Warfarin** e vitamina K"}, {n:"2", t:"**Levotiroxina** a digiuno"},
  {n:"3", t:"**Latte e calcio** riducono l'assorbimento di tetracicline e chinoloni"}, {n:"4", t:"**Pompelmo**: inibisce il metabolismo di molti farmaci", key:true}]},

{id:"s27", tipo:"frase", tema:"chiaro", sopratitolo:"La reazione avversa · ADR",
  testo:"Una risposta **nociva e non voluta** a un medicinale.",
  sotto:"Compresi errore terapeutico, uso off-label, abuso ed esposizione professionale."},
{id:"s28", tipo:"confronto", tema:"chiaro", sopratitolo:"Due tipi", col:[
  {h:"Tipo A", t:"**Dose-dipendenti**, prevedibili dall'azione del farmaco: l'emorragia da anticoagulante", key:true},
  {h:"Tipo B", t:"**Non dose-dipendenti**, imprevedibili: l'allergia, l'idiosincrasia"}]},
{id:"s29", tipo:"titolo", tema:"profondo",
  titolo:"Le prime sono le più frequenti,<br>le seconde **le più temute**.",
  sotto:"E chi le vede per primo, al letto, è quasi sempre l'infermiere."},

{id:"s30", tipo:"figura", tema:"chiaro", sopratitolo:"La farmacovigilanza · raccoglie e valuta le reazioni avverse dopo l'immissione in commercio", illu:"campana",
  titolo:"Segnalare le **sospette** reazioni avverse è un **obbligo**.",
  sotto:"Per gli operatori sanitari, infermieri compresi."},
{id:"s31", tipo:"percorso", tema:"chiaro", sopratitolo:"Come si segnala · tempestivamente; anche i cittadini possono", tappe:[
  {t:"Scheda o piattaforma", d:"online"}, {t:"Rete Nazionale", d:"di Farmacovigilanza", key:true}, {t:"Responsabile locale", d:"di farmacovigilanza"}, {t:"AIFA"}]},
{id:"s32", tipo:"titolo", tema:"profondo",
  titolo:"Basta **il sospetto**,<br>non serve la certezza del nesso.",
  sotto:"▼ Il triangolo nero rovesciato: monitoraggio addizionale, segnalazione ancora più preziosa."},

{id:"s33", tipo:"confronto", tema:"chiaro", sopratitolo:"Una distinzione che collega al modulo 2", col:[
  {h:"Reazione avversa", t:"→ **farmacovigilanza** (AIFA)"},
  {h:"Errore in terapia", t:"→ **incident reporting** del rischio clinico", key:true}]},
{id:"s34", tipo:"bivio", tema:"chiaro", sopratitolo:"Se un errore provoca una reazione avversa", radice:"Errore che causa una reazione", rami:[
  {q:"studia il farmaco", t:"Farmacovigilanza"}, {q:"studia il processo", t:"Incident reporting", d:"si fanno **entrambe**", key:true}]},

{id:"s35", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, attive:[0], sopratitolo:"L'anziano · la maggior parte dei ricoverati", celle:ANZIANO},
{id:"s36", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, attive:[0,1,2,3], sopratitolo:"L'anziano", celle:ANZIANO},
{id:"s37", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"L'anziano · e soprattutto la politerapia: start low, go slow", celle:ANZIANO},

{id:"s38", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"I criteri di Beers · i farmaci potenzialmente inappropriati nell'anziano", celle:[
  {n:"1", t:"**Benzodiazepine** a lunga durata", key:true}, {n:"2", t:"**Anticolinergici**"}, {n:"3", t:"Alcuni **antistaminici**, e altri"}]},
{id:"s39", tipo:"icone", tema:"chiaro", sopratitolo:"La deprescrizione · l'infermiere non deprescrive, ma osserva e segnala", voci:[
  {icona:"luna", t:"Sonnolenza", d:"nuova", key:true}, {icona:"bussola", t:"Confusione"}, {icona:"gambe", t:"Cadute"}, {icona:"colon", t:"Stipsi"}, {icona:"cuore", t:"Ipotensione"}]},

{id:"s40", tipo:"sostituzione", tema:"chiaro", sopratitolo:"Il nefropatico · molti farmaci si eliminano per via renale",
  da:{h:"Rene sano", t:"dose piena, intervallo pieno"}, a:{h:"Funzione renale ridotta", t:"dose ridotta o intervallo allungato"},
  sotto:"Sulla funzione renale stimata: eGFR o clearance della creatinina."},
{id:"s41", tipo:"icone", tema:"chiaro", sopratitolo:"I nefrotossici da sorvegliare · e la metformina secondo protocollo prima del mezzo di contrasto", voci:[
  {icona:"pillola", t:"FANS"}, {icona:"siringa", t:"Aminoglicosidi"}, {icona:"sacca", t:"Vancomicina"}, {icona:"raggi", t:"Mezzi di contrasto", d:"iodati: acidosi lattica con la metformina", key:true}]},

{id:"s42", tipo:"figura", tema:"chiaro", sopratitolo:"Il caso d'esame", illu:"anziano", lato:"dx",
  titolo:"Anziana in politerapia, da due giorni **sonnolenta e confusa**.",
  sotto:"Albumina bassa. In terapia con fenitoina e una benzodiazepina la sera. Che cosa pensi?"},
{id:"s43", tipo:"confronto", tema:"chiaro", sopratitolo:"Due meccanismi insieme", col:[
  {h:"Ipoalbuminemia", t:"Più **fenitoina libera**: farmaco a finestra stretta", key:true},
  {h:"Benzodiazepina", t:"Si **accumula** nel tessuto adiposo dell'anziano"}]},
{id:"s44", tipo:"percorso", tema:"chiaro", sopratitolo:"Che cosa fai · il livello di ragionamento che la prova premia", tappe:[
  {t:"Parametri", d:"e stato di coscienza"}, {t:"Avvisi il medico", d:"segnalando il sospetto", key:true}, {t:"Rischio di caduta", d:"da sorvegliare"}, {t:"Farmacovigilanza", d:"se confermato"}]},

{id:"s45", tipo:"catena", tema:"chiaro", sopratitolo:"In Veneto · dove confluiscono le segnalazioni", passi:[
  {t:"Responsabile aziendale", d:"di farmacovigilanza"}, {t:"Centro regionale", d:"valuta e trasmette", key:true}, {t:"Rete nazionale"}]},
{id:"s46", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"Gli agganci veneti · e la Raccomandazione 17 del Ministero", celle:VENETO},
{id:"s47", tipo:"percorso", tema:"chiaro", sopratitolo:"All'orale · la catena completa, quattro passaggi", tappe:[
  {t:"L'operatore", d:"segnala"}, {t:"Il responsabile aziendale", d:"raccoglie"}, {t:"Il centro regionale", d:"valuta", key:true}, {t:"L'AIFA", d:"mette in rete"}]},

{id:"s48", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Ricapitoliamo", celle:[
  {t:"**ADME**"}, {t:"Endovenosa **100 %**, orale ridotta dal **primo passaggio**"},
  {t:"Steady state ed eliminazione in **4–5 emivite**"}, {t:"Finestra stretta: **digossina, litio, warfarin, fenitoina, aminoglicosidi, vancomicina**", key:true}]},
{id:"s49", tipo:"frase", tema:"chiaro", sopratitolo:"E le due regole da portare via",
  testo:"La reazione avversa si segnala **sul sospetto**. Nell'anziano: **start low, go slow**.",
  sotto:"Prossima lezione — 5.2 Vie di somministrazione e tecniche: angoli, aghi, sedi e volumi."},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione",
  titolo:"5.2<br>Vie di somministrazione", sottotitolo:"e tecniche: angoli, aghi, sedi, volumi — e il principio che una via non vale l'altra",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
