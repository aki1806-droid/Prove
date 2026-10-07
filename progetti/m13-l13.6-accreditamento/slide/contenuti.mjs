// Contenuto delle 50 scene della lezione 13.6 — autorizzazione, accreditamento,
// prevenzione e sanità pubblica in Veneto. Le fasi della L.R. 22/2002 sono un
// percorso che si accende tappa per tappa; il Dipartimento di Prevenzione una
// raggiera; gli screening numeri grandi e una linea delle età.

const FASI = (att, k) => ({tipo:"percorso", tema:"chiaro", tappe:[
  {t:"Realizzazione", d:"costruire, ampliare, trasformare", key:k===0},
  {t:"Esercizio", d:"requisiti minimi", key:k===1},
  {t:"Accreditamento", d:"requisiti ulteriori di qualità", key:k===2},
  {t:"Accordi contrattuali", d:"prestazioni a carico del SSR", key:k===3}], attive:att});

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 13 · Il Servizio Socio Sanitario del Veneto",
  titolo:"Accreditamento<br>e prevenzione", sottotitolo:"13.6 · Autorizzazione, accreditamento, prevenzione e sanità pubblica in Veneto",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"frase", tema:"chiaro", sopratitolo:"Micro-lezione 6 di 8 · due temi che sembrano lontani",
  testo:"Un filo comune: la **garanzia** per il cittadino."},
{id:"s03", tipo:"venn", tema:"chiaro", sopratitolo:"Vediamo come li organizza il Veneto",
  sx:{t:"Accreditamento", d:"curare<br>in **sicurezza**"},
  dx:{t:"Prevenzione", d:"proteggere<br>la salute **prima**"},
  centro:"la **garanzia** per il cittadino"},

{id:"s04", tipo:"norma", tema:"chiaro", etichetta:"Legge regionale del 16 agosto 2002", sigla:"L.R. 22/2002",
  testo:"Autorizzazione e accreditamento delle strutture **sanitarie**, **socio-sanitarie** e **sociali**."},
{id:"s05", tipo:"tre", tema:"chiaro", sopratitolo:"Il modello veneto · strutture pubbliche e private", box:[
  {n:"1", t:"Sanitario"}, {n:"2", t:"Socio-sanitario", key:true}, {n:"3", t:"Sociale"}]},
{id:"s06", tipo:"ciclo", tema:"chiaro", sopratitolo:"Non una volta per sempre", centro:"Requisiti", passi:[
  {t:"Giunta regionale", d:"definisce i requisiti"}, {t:"Verifiche", d:"periodiche"},
  {t:"Rinnovi", d:"periodici", key:true}]},

{id:"s07", sopratitolo:"Le fasi · la prima: costruire, ampliare, trasformare", ...FASI([0], 0)},
{id:"s08", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"Autorizzazione all'esercizio · i requisiti minimi per poter operare", celle:[
  {t:"**Strutturali**"}, {t:"**Tecnologici**"}, {t:"**Organizzativi**", key:true}]},
{id:"s09", sopratitolo:"Accreditamento istituzionale · per conto del SSR", ...FASI([0,1,2], 2)},
{id:"s10", sopratitolo:"Poi gli accordi · essere accreditati, da solo, non basta", ...FASI([0,1,2,3], 3)},
{id:"s11", tipo:"confronto", tema:"chiaro", sopratitolo:"La traduzione regionale della lezione 12.7 · da non confondere", col:[
  {h:"Autorizzazione", t:"requisiti **minimi**: per poter operare"},
  {h:"Accreditamento", t:"requisiti **ulteriori** di qualità: per conto del SSR"}]},

{id:"s12", tipo:"icone", tema:"chiaro", sopratitolo:"Perché riguarda l'infermiere · i requisiti di accreditamento", voci:[
  {icona:"persone", t:"Personale", d:"dotazioni minime e qualifiche", key:true},
  {icona:"documento", t:"Procedure", d:"e protocolli documentati"}]},
{id:"s13", tipo:"catena", tema:"chiaro", sopratitolo:"Anche formazione, rischio, qualità · nelle verifiche si controlla", passi:[
  {t:"Che le procedure **esistano**"}, {t:"Che siano **applicate**"}, {t:"Che gli operatori le **conoscano**", key:true}]},
{id:"s14", tipo:"trappola", tema:"chiaro", sopratitolo:"L'accreditamento riguarda anche chi lavora in reparto", righe:[
  {sb:"Una procedura scritta, che nessuno conosce", ok:"**Non** è un requisito soddisfatto"}]},

{id:"s15", tipo:"frase", tema:"chiaro", sopratitolo:"La prevenzione · servizi da conoscere per sigla",
  testo:"Organizzata nei **Dipartimenti di Prevenzione** delle Aziende ULSS."},
{id:"s16", tipo:"confronto", tema:"chiaro", sopratitolo:"Il Dipartimento di Prevenzione · i servizi", col:[
  {h:"SISP", t:"Igiene e Sanità Pubblica: **vaccinazioni** e **malattie infettive**"},
  {h:"SIAN", t:"Igiene degli **Alimenti** e della **Nutrizione**"}]},
{id:"s17", tipo:"norma", tema:"chiaro", etichetta:"Sicurezza negli ambienti di lavoro · lez. 12.6", sigla:"SPISAL",
  testo:"Prevenzione, igiene e sicurezza. E poi i **servizi veterinari**."},
{id:"s18", tipo:"raggiera", tema:"chiaro", sopratitolo:"Il Dipartimento di Prevenzione · in ogni ULSS", centro:"ULSS", raggi:[
  {t:"SISP"}, {t:"SIAN"}, {t:"SPISAL"}, {t:"Veterinari"}, {t:"Screening", key:true}, {t:"Promozione"}]},

{id:"s19", tipo:"catena", tema:"chiaro", sopratitolo:"La programmazione della prevenzione", passi:[
  {t:"Piano **Nazionale** della Prevenzione"},
  {t:"Piano **Regionale** della Prevenzione", d:"uno degli strumenti di programmazione della Regione", key:true}]},
{id:"s20", tipo:"icone", tema:"chiaro", sopratitolo:"Il Piano Regionale della Prevenzione · i programmi", voci:[
  {icona:"cuoremano", t:"Stili di vita", d:"fumo, alcol, alimentazione, attività fisica", key:true},
  {icona:"goccia", t:"Ambiente e salute"}, {icona:"scudo", t:"Sicurezza sul lavoro"},
  {icona:"avviso", t:"Malattie infettive", d:"e vaccinazioni"}]},
{id:"s21", tipo:"tre", tema:"chiaro", sopratitolo:"Anche screening oncologici e incidenti · l'approccio One Health", box:[
  {n:"One Health", t:"Persone"}, {n:"One Health", t:"Animali"}, {n:"One Health", t:"Ambiente", d:"la salute, considerata **insieme**", key:true}]},

{id:"s22", tipo:"cifre", tema:"chiaro", sopratitolo:"Screening oncologici · i riferimenti nazionali · mammella", voci:[
  {n:"50-69", suf:"anni", t:"donne", d:"livello essenziale di assistenza"},
  {n:"2", suf:"anni", t:"una mammografia ogni", key:true}]},
{id:"s23", tipo:"timeline", tema:"chiaro", sopratitolo:"Cervice uterina · donne fra 25 e 64 anni", tappe:[
  {anno:"25", et:"**Pap test** ogni 3 anni, fino a 29"},
  {anno:"30", et:"**test HPV** ogni 5 anni", key:true},
  {anno:"64", et:"fine della fascia"}]},
{id:"s24", tipo:"cifre", tema:"chiaro", sopratitolo:"Colon-retto · programmi organizzati, con invito attivo, gratuiti", voci:[
  {n:"50-69", suf:"anni", t:"la fascia d'età"},
  {n:"2", suf:"anni", t:"sangue occulto nelle feci, ogni", key:true}]},
{id:"s25", tipo:"frase", tema:"chiaro", sopratitolo:"Il Piano nazionale della prevenzione · il Veneto ha fatto una scelta sua",
  testo:"Le **estensioni** delle fasce d'età: le Regioni le applicano **in modo diverso**."},

{id:"s26", tipo:"cifre", tema:"chiaro", sopratitolo:"In Veneto · colon-retto · invito gratuito dall'ULSS di residenza", voci:[
  {n:"50-69", suf:"anni", t:"riferimento nazionale"},
  {n:"70-74", suf:"anni", t:"estensione veneta", key:true}]},
{id:"s27", tipo:"catena", tema:"chiaro", sopratitolo:"Cervice · in Veneto", passi:[
  {t:"**Test HPV** primario", d:"dai 30 anni"}, {t:"Positività"}, {t:"Approfondimento e **PDTA**", key:true}]},
{id:"s28", tipo:"frase", tema:"chiaro", sopratitolo:"Le fasce possono cambiare · verificale nella tua ULSS",
  testo:"Per l'esame: i **riferimenti nazionali**, e il colon-retto veneto **fino a 74 anni**."},

{id:"s29", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"L'infermiere negli screening", celle:[
  {t:"**Informa** e promuove l'adesione", key:true}, {t:"Contrasta **paura** e disinformazione"}, {t:"Gestisce **inviti** e richiami"}]},
{id:"s30", tipo:"icone", tema:"chiaro", sopratitolo:"L'infermiere negli screening · le attività", voci:[
  {icona:"goccia", t:"Esegue", d:"prelievi, preparazione alla colonscopia · lezione 8.5"},
  {icona:"chat", t:"Comunica", d:"gli esiti"},
  {icona:"persone", t:"Accompagna", d:"negli approfondimenti", key:true}]},
{id:"s31", tipo:"tre", tema:"chiaro", sopratitolo:"Chi aderisce meno · un test positivo genera ansia", box:[
  {n:"·", t:"Fragili"}, {n:"·", t:"Stranieri"}, {n:"·", t:"Bassa alfabetizzazione sanitaria", d:"health literacy", key:true}]},

{id:"s32", tipo:"norma", tema:"chiaro", etichetta:"Piano Nazionale di Prevenzione Vaccinale", sigla:"PNPV",
  testo:"In Veneto: il **calendario vaccinale regionale**."},
{id:"s33", tipo:"cifre", tema:"chiaro", sopratitolo:"L. 119/2017 · un numero e un anno da ricordare insieme", voci:[
  {n:"10", t:"vaccinazioni obbligatorie", key:true},
  {n:"0-16", suf:"anni", t:"per i minori"}]},
{id:"s34", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"Raccomandate · adulti, anziani, gruppi a rischio, operatori sanitari", celle:[
  {t:"**Influenza**"}, {t:"**Epatite B**"}, {t:"**Morbillo**"},
  {t:"**Pertosse** in gravidanza", key:true}, {t:"**Pneumococco**"}, {t:"**Herpes zoster**"}]},
{id:"s35", tipo:"icone", tema:"chiaro", sopratitolo:"Nei centri vaccinali delle ULSS · l'infermiere", voci:[
  {icona:"chat", t:"Counseling", key:true}, {icona:"spunta", t:"Somministra"},
  {icona:"occhio", t:"Sorveglia", d:"le eventuali reazioni"}]},

{id:"s36", tipo:"tre", tema:"chiaro", sopratitolo:"L'epidemiologia regionale · oggi in Azienda Zero", box:[
  {n:"1", t:"Sistema epidemiologico regionale"}, {n:"2", t:"Registro Tumori del Veneto", key:true}, {n:"3", t:"Registri di patologia"}]},
{id:"s37", tipo:"confronto", tema:"chiaro", sopratitolo:"Le sorveglianze", col:[
  {h:"Malattie infettive", t:"la sorveglianza delle **infezioni**"},
  {h:"PASSI e PASSI d'Argento", t:"indagini sugli **stili di vita**"}]},
{id:"s38", tipo:"frase", tema:"chiaro", sopratitolo:"I dati orientano la programmazione · Relazione Socio Sanitaria annuale",
  testo:"Senza dati, la prevenzione va **alla cieca**."},

{id:"s39", tipo:"frase", tema:"chiaro", sopratitolo:"Il caso d'esame · una donna di 52 anni e la mammografia",
  testo:"«Se c'è qualcosa, **preferisco non saperlo**.» Che cosa fai?"},
{id:"s40", tipo:"trappola", tema:"chiaro", sopratitolo:"La risposta · prima di tutto la relazione", righe:[
  {sb:"Giudicare", ok:"**Ascoltare** e accogliere la preoccupazione"},
  {sb:"Insistere con la paura", ok:"Spiegare con **parole semplici** a che cosa serve"}]},
{id:"s41", tipo:"icone", tema:"chiaro", sopratitolo:"Che cosa le dici", voci:[
  {icona:"occhio", t:"Fase precoce", d:"cure più efficaci e meno pesanti", key:true},
  {icona:"spunta", t:"Gratuito", d:"con invito attivo"},
  {icona:"documento", t:"La lettera", d:"verifichi che l'abbia ricevuta"}]},
{id:"s42", tipo:"confronto", tema:"chiaro", sopratitolo:"Il collegamento", col:[
  {h:"Lezione 11.6", t:"il **colloquio motivazionale**, applicato alla prevenzione"},
  {h:"E alla fine", t:"rispetti comunque la sua **decisione**"}]},

{id:"s43", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Sicurezza alimentare e ambientale · SIAN e servizi veterinari", celle:[
  {t:"Controlli su **alimenti** e **allevamenti**"}, {t:"Prevenzione delle **tossinfezioni** alimentari", key:true}]},
{id:"s44", tipo:"tre", tema:"chiaro", sopratitolo:"Vigilano anche su", box:[
  {n:"Acque", t:"Potabili"}, {n:"Mense", t:"Scuole, ospedali, strutture", d:"igiene della nutrizione"},
  {n:"LEA", t:"Prevenzione collettiva", d:"il **primo livello**", key:true}]},

{id:"s45", tipo:"tabella", tema:"chiaro", sopratitolo:"La tabella · autorizzazione e accreditamento", colonne:["38%","62%"],
  intestazioni:["Che cosa", "Da ricordare"], righe:[
  ["L.R. 22/2002", "sanitario · socio-sanitario · sociale"],
  ["Realizzazione", "costruire, ampliare, trasformare"],
  ["Esercizio", "requisiti **minimi**"],
  ["Accreditamento", "requisiti **ulteriori**"],
  ["Accordi contrattuali", "prestazioni per il SSR"]], chiave:[3]},
{id:"s46", tipo:"tabella", tema:"chiaro", sopratitolo:"La tabella · la prevenzione", colonne:["38%","62%"],
  intestazioni:["Che cosa", "Da ricordare"], righe:[
  ["Dipartimento", "SISP · SIAN · SPISAL · veterinari"],
  ["Programmazione", "Piano Regionale della Prevenzione"],
  ["Mammella", "50-69 anni · ogni **2 anni**"],
  ["Cervice", "25-64 · Pap 3 anni · HPV 5 anni"],
  ["Colon-retto", "50-69 · in Veneto fino a **74**"]], chiave:[4]},
{id:"s47", tipo:"tabella", tema:"chiaro", sopratitolo:"La tabella · vaccini e dati", colonne:["38%","62%"],
  intestazioni:["Che cosa", "Da ricordare"], righe:[
  ["L. 119/2017", "**10** vaccinazioni obbligatorie, 0-16 anni"],
  ["Registro Tumori", "in **Azienda Zero**"]], chiave:[0]},

{id:"s48", tipo:"titolo", tema:"profondo",
  titolo:"La prevenzione è la cura<br>**che non si vede**.",
  sotto:"I suoi successi sono le malattie che non si verificano: per questo vanno raccontati."},

{id:"s49", tipo:"frase", tema:"chiaro", sopratitolo:"Nella prossima lezione · e le responsabilità di chi usa gli applicativi",
  testo:"La **sanità digitale** veneta: il Fascicolo Sanitario Elettronico, Sanità km zero, ricette e prenotazioni."},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione",
  titolo:"13.7<br>La sanità digitale veneta", sottotitolo:"Fascicolo Sanitario Elettronico, Sanità km zero, ricette e prenotazioni",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
