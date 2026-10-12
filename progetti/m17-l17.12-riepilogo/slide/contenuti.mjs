// Contenuto delle 50 scene della lezione 17.12 — riepilogo del Modulo 17 e casi
// lampo su etica e responsabilità. Le frasi degli undici casi sono una tabella
// in più pagine; ogni caso lampo si apre con la pausa (scenario in alto) e si
// chiude con le azioni; i fili una griglia che si accende; le tracce carte
// numerate; le norme una tabella; la chiusura annuncia il Modulo 18.

const FRASI = (righe, k, sop) => ({tipo:"tabella", tema:"chiaro", sopratitolo:sop, colonne:["32%","68%"],
  intestazioni:["Il caso", "La frase"], righe, chiave:[k]});

const LAMPO = (n, sop, es, testo, dati) => ({tipo:"pausa", tema:"chiaro", etichetta:"caso lampo", sopratitolo:`Caso lampo ${n} · ${sop}`, es, testo, dati});

const DIMISSIONE = (att, k) => ({tipo:"percorso", tema:"chiaro", attive:att, tappe:[
  {t:"I motivi", d:"ascoltarli: spesso si risolvono", key:k===0},
  {t:"I rischi", d:"il medico informa in modo chiaro", key:k===1},
  {t:"Persona capace", d:"scelta rispettata · firma della dichiarazione", key:k===2},
  {t:"Non abbandonarla", d:"informazioni, terapia, segni d'allarme, tornare", key:k===3},
  {t:"Documentare", key:k===4}]});

const FILI = att => ({tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, attive:att, celle:[
  {n:"1", t:"La **persona** titolare delle decisioni · consenso, rifiuto, pianificazione condivisa"},
  {n:"2", t:"La **famiglia** · risorsa e destinataria di cura"},
  {n:"3", t:"Il **territorio** e la rete · luogo di cura"},
  {n:"4", t:"La **comunicazione** · strumento clinico: mediatore, de-escalation, colloquio sul suicidio"},
  {n:"5", t:"La **responsabilità** · tutela del paziente e del professionista"}]});

const TRACCE = att => ({tipo:"griglia", tema:"chiaro", colonne:4, spunta:false, attive:att, celle:[
  {n:"17.1", t:"**Preeclampsia** e magnesio"}, {n:"17.2", t:"Emorragia **post-partum**"},
  {n:"17.3", t:"Bambino **disidratato** · dosi per chilo"}, {n:"17.4", t:"Idee **suicidarie**"},
  {n:"17.5", t:"Agitazione e **TSO**"}, {n:"17.6", t:"Terapia **sostitutiva**"},
  {n:"17.7", t:"**Palliative** a domicilio"}, {n:"17.8", t:"Infermiere di famiglia e **caregiver**"},
  {n:"17.9", t:"Trasferimento da **struttura residenziale**"}, {n:"17.10", t:"Consenso con il **mediatore**"},
  {n:"17.11", t:"**Evento avverso** · L. 24/2017"}, {n:"lampo 1", t:"**Rifiuto** delle cure"}]});

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 17 · Casi clinici avanzati",
  titolo:"Riepilogo<br>e casi lampo", sottotitolo:"17.12 · Ciclo di vita, territorio, responsabilità",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"cifre", tema:"chiaro", sopratitolo:"Micro-lezione 12 di 12 · chiudiamo il blocco dei casi clinici · moduli 15, 16 e 17", voci:[
  {n:"32", t:"casi completi", key:true},
  {n:"18", t:"casi lampo"}]},
{id:"s03", tipo:"tre", tema:"chiaro", sopratitolo:"In questa lezione", box:[
  {n:"1", t:"Le frasi chiave", d:"del modulo 17"},
  {n:"2", t:"Sei casi lampo", d:"etica e responsabilità, frequenti all'orale", key:true},
  {n:"3", t:"Le prove", d:"come usare i casi"}]},

{id:"s04", ...FRASI([
  ["17.1 · Preeclampsia", "mal di testa e mal di stomaco con la pressione alta **non sono disturbi minori**"]], 0, "Le frasi del modulo · come ancore")},
{id:"s05", ...FRASI([
  ["17.2 · Emorragia post-partum", "utero molle: **massaggio, vescica vuota, aiuto**"],
  ["17.3 · Lattante", "**tutto per chilo**, e lo shock prima che la pressione cada"]], 1, "Le frasi del modulo")},
{id:"s06", ...FRASI([
  ["17.4 · Rischio suicidario", "chiedere **apre una porta**"],
  ["17.5 · TSO", "il **rispetto** è la condizione di tecnica e procedura"],
  ["17.6 · Metadone", "**è una terapia**"]], 0, "Le frasi del modulo")},
{id:"s07", ...FRASI([
  ["17.7 · Cure palliative", "educare il caregiver **è curare il paziente**"],
  ["17.8 · Infermiere di famiglia", "la lesione guarisce **con la rete**"]], 0, "Le frasi del modulo")},
{id:"s08", ...FRASI([
  ["17.9 · Centro di Servizi", "curare in struttura **non è curare di meno**"],
  ["17.10 · Paziente straniera", "un consenso non capito **non è un consenso**"]], 1, "Le frasi del modulo")},
{id:"s09", tipo:"frase", tema:"chiaro", sopratitolo:"17.11 · Evento avverso",
  testo:"La cartella va scritta **in tempo**, e mai riscritta dopo.",
  sotto:"Undici frasi, e dietro ognuna un caso intero."},

{id:"s10", ...LAMPO(1, "il rifiuto della trasfusione", "paziente adulto, capace",
  "Anemico e in sanguinamento, **rifiuta la trasfusione** per motivi religiosi.", ["capace", "in sanguinamento"])},
{id:"s11", tipo:"norma", tema:"chiaro", sopratitolo:"Il diritto di rifiutare · lezione 1.6",
  etichetta:"Costituzione e consenso", sigla:"Art. 32 · L. 219/2017", testo:"Un adulto **capace** può rifiutare un trattamento, **anche salvavita**."},
{id:"s12", tipo:"griglia", tema:"chiaro", colonne:1, sopratitolo:"Il medico, con l'infermiere", celle:[
  {t:"Un'informazione **completa** sulle conseguenze"},
  {t:"Una scelta **libera e consapevole**: verificarla"},
  {t:"Le **alternative**: farmaci, tecniche di risparmio del sangue"}]},
{id:"s13", tipo:"icone", tema:"chiaro", sopratitolo:"Come nella lezione 6.6: il rifiuto della persona capace si rispetta, e si documenta", voci:[
  {icona:"documento", t:"Documentare", d:"il rifiuto e le informazioni date", key:true},
  {icona:"certificato", t:"Eventuali DAT"}]},
{id:"s14", tipo:"bivio", tema:"chiaro", sopratitolo:"Diverso per un minore · la decisione coinvolge i genitori", radice:"Il minore", rami:[
  {q:"conflitto con il suo interesse", t:"L'autorità giudiziaria"},
  {q:"emergenza", t:"Le cure necessarie", d:"si garantiscono", key:true}]},

{id:"s15", ...LAMPO(2, "le dimissioni contro il parere medico", "in osservazione per dolore toracico",
  "Vuole andarsene subito: «**ho da lavorare**».", ["paura?", "lavoro?", "figli?", "tempi di attesa?"])},
{id:"s16", sopratitolo:"Non si trattiene contro la sua volontà una persona capace", ...DIMISSIONE([0,1,2], 2)},
{id:"s17", sopratitolo:"Ma non la si abbandona", ...DIMISSIONE([0,1,2,3,4], 3)},

{id:"s18", ...LAMPO(3, "le informazioni al telefono", "una telefonata in reparto",
  "«Sono il nipote, **come sta mia zia?**»", ["identità?", "consenso della paziente?"])},
{id:"s19", tipo:"griglia", tema:"chiaro", colonne:1, sopratitolo:"Secondo le procedure aziendali", celle:[
  {no:true, t:"Informazioni cliniche al telefono, senza poter **verificare l'identità**"},
  {no:true, t:"Senza il **consenso** della paziente sulle persone da informare"},
  {t:"Le **persone autorizzate**, indicate dal paziente"}]},
{id:"s20", tipo:"figura", tema:"chiaro", illu:"scudo", sopratitolo:"La riservatezza · lezione 1.7",
  titolo:"Rispondere con **cortesia**, e spiegare come avere le informazioni.", sotto:"Una regola che protegge anche chi non vuole far sapere di essere ricoverato."},
{id:"s21", tipo:"frase", tema:"chiaro", sopratitolo:"Lezione 1.7 · in modo netto",
  testo:"Per telefono non si conferma **nemmeno la presenza** di un ricoverato.",
  sotto:"E la persona può opporsi alla comunicazione della propria presenza in reparto."},

{id:"s22", ...LAMPO(4, "il sospetto di violenza", "pronto soccorso",
  "Lesioni che **non corrispondono** al racconto di una caduta.", ["molto ansiosa", "il compagno non la lascia mai sola"])},
{id:"s23", tipo:"griglia", tema:"chiaro", colonne:2, sopratitolo:"Il colloquio e la cura", celle:[
  {t:"Colloquio **in privato**, senza l'accompagnatore"}, {t:"Ascolto **non giudicante**"},
  {t:"**Senza pressioni**"}, {t:"Lesioni curate e documentate in modo **oggettivo**"}]},
{id:"s24", tipo:"icone", tema:"chiaro", sopratitolo:"I percorsi", voci:[
  {icona:"ospedale", t:"Il percorso aziendale", d:"per le vittime di violenza · linee guida nazionali", key:true},
  {icona:"telefono", t:"I centri antiviolenza", d:"e i numeri di aiuto"}]},
{id:"s25", tipo:"tre", tema:"chiaro", sopratitolo:"Gli esercenti una professione sanitaria", box:[
  {n:"1", t:"Obbligo di referto", d:"per i reati procedibili d'ufficio, secondo la normativa", key:true},
  {n:"2", t:"Sicurezza", d:"della donna e degli operatori"}]},
{id:"s26", tipo:"percorso", tema:"chiaro", sopratitolo:"I tre binari della lezione 1.7 · qui il segreto professionale non è un ostacolo", tappe:[
  {t:"L'assistenza", d:"alla persona"}, {t:"La documentazione", d:"descrive, non giudica"}, {t:"I percorsi", d:"attivati", key:true}]},

{id:"s27", ...LAMPO(5, "il collega in difficoltà", "durante il turno",
  "Un collega con l'alito che sa di **alcol**, impacciato, **prepara la terapia**.", ["sicurezza dei pazienti"])},
{id:"s28", tipo:"catena", tema:"chiaro", sopratitolo:"La priorità: la sicurezza dei pazienti", passi:[
  {t:"Intervenire **subito**, con discrezione", d:"perché non somministri farmaci", key:true},
  {t:"Informare il **coordinatore**", d:"o il responsabile, secondo le procedure"}]},
{id:"s29", tipo:"trappola", tema:"chiaro", sopratitolo:"Il Codice deontologico · lezione 1.4", righe:[
  {sb:"Coprire il collega", ok:"Tutelare la **persona assistita**: coprire non è solidarietà professionale"},
  {sb:"Esporlo pubblicamente", ok:"**Discrezione**"}]},
{id:"s30", tipo:"figura", tema:"chiaro", illu:"mani", sopratitolo:"E il collega",
  titolo:"La dipendenza è anche una **malattia**.", sotto:"Esistono percorsi di aiuto per il collega."},

{id:"s31", ...LAMPO(6, "il minore senza i genitori", "pronto soccorso · incidente in bicicletta",
  "Ragazzo di **15 anni**, frattura dell'avambraccio: i genitori **non sono raggiungibili**.", ["arriva con un amico"])},
{id:"s32", tipo:"norma", tema:"chiaro", sopratitolo:"Il consenso ai trattamenti",
  etichetta:"L. 219/2017 · art. 3", sigla:"Il minore", testo:"Il consenso spetta ai **genitori** o al tutore, tenendo conto della volontà del minore per **età e maturità**."},
{id:"s33", tipo:"confronto", tema:"chiaro", sopratitolo:"Si continua a cercare i genitori", col:[
  {h:"Situazioni urgenti", t:"le cure **necessarie**"},
  {h:"Ciò che può attendere", t:"si aspetta il **consenso**"}],
  sotto:"Comunicazione adeguata all'età · tentativi di contatto documentati."},

{id:"s34", sopratitolo:"I fili del modulo 17", ...FILI([0,1])},
{id:"s35", sopratitolo:"I fili del modulo 17", ...FILI([0,1,2,3])},
{id:"s36", sopratitolo:"Gli stessi fili dei sei casi lampo di oggi", ...FILI([0,1,2,3,4])},

{id:"s37", sopratitolo:"Le tracce più probabili legate a questo modulo", ...TRACCE([0,1,2,3,4])},
{id:"s38", sopratitolo:"Le tracce più probabili legate a questo modulo", ...TRACCE([0,1,2,3,4,5,6,7,8,9])},
{id:"s39", sopratitolo:"Per ognuna, un caso svolto: la risposta modello e tre domande d'orale", ...TRACCE([0,1,2,3,4,5,6,7,8,9,10,11])},

{id:"s40", tipo:"tabella", tema:"chiaro", sopratitolo:"Le norme che ritornano nei casi · da collegare sempre alla pratica", colonne:["38%","62%"],
  intestazioni:["Norma", "Tema"], righe:[
  ["Costituzione · art. 32", "il diritto alla salute"],
  ["L. 833/1978 · artt. 33-35", "il **TSO**"]], chiave:[1]},
{id:"s41", tipo:"tabella", tema:"chiaro", sopratitolo:"Le norme che ritornano nei casi", colonne:["38%","62%"],
  intestazioni:["Norma", "Tema"], righe:[
  ["L. 219/2017", "consenso, rifiuto, **DAT**, pianificazione condivisa, minori e incapaci"],
  ["L. 38/2010", "cure **palliative** e dolore"],
  ["L. 24/2017", "**sicurezza** delle cure e responsabilità"]], chiave:[0]},
{id:"s42", tipo:"tabella", tema:"chiaro", sopratitolo:"Le norme che ritornano nei casi", colonne:["38%","62%"],
  intestazioni:["Norma", "Tema"], righe:[
  ["DPR 309/1990", "**stupefacenti**"],
  ["D.Lgs. 81/2008 · Racc. 8", "**aggressioni**"],
  ["Racc. 4 · 5 · 17", "suicidio · trasfusione · **riconciliazione**"]], chiave:[2]},
{id:"s43", tipo:"tre", tema:"chiaro", sopratitolo:"E il DM 77/2022, sul territorio · le hai già incontrate tutte", box:[
  {n:"1.6", t:"L. 219/2017", key:true}, {n:"1.5", t:"L. 24/2017"}, {n:"11.3", t:"L. 833/1978"}]},

{id:"s44", tipo:"cifre", tema:"chiaro", sopratitolo:"Come usare i 32 casi · la prova scritta, risposte sintetiche", voci:[
  {n:"5", suf:"passi", t:"lo schema", d:"lezione 15.1"},
  {n:"15", suf:"righe", t:"la risposta sintetica", key:true}]},
{id:"s45", tipo:"colonne", tema:"chiaro", sopratitolo:"La prova pratica e l'orale", colonne:[
  {h:"Prova pratica", voci:[{t:"Le **priorità**"}, {t:"Gli interventi **motivati**"}, {t:"Le procedure **passo passo**"}]},
  {h:"Orale", key:true, voci:[{t:"Partire dal **caso** concreto"}, {t:"Arrivare alla **norma**"}, {t:"E al **sistema**: la rete veneta"}]}]},
{id:"s46", tipo:"icone", tema:"chiaro", sopratitolo:"L'allenamento", voci:[
  {icona:"orologio", t:"Una traccia al giorno", d:"alternando i tre moduli"},
  {icona:"libro", t:"Il quaderno dei casi", d:"una pagina per caso"},
  {icona:"documento", t:"Le ultime due settimane", d:"solo le frasi dei casi e le risposte modello", key:true}]},

{id:"s47", tipo:"titolo", tema:"profondo",
  titolo:"Dietro ogni traccia<br>c'è **una persona**.",
  sotto:"La frase che chiude il blocco dei casi clinici."},
{id:"s48", tipo:"tre", tema:"chiaro", sopratitolo:"Il commissario vuole sapere se · tre cose, ed è già metà del concorso", box:[
  {n:"1", t:"La metteresti al sicuro"}, {n:"2", t:"La ascolteresti"}, {n:"3", t:"La accompagneresti", key:true}]},

{id:"s49", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Nell'ultimo modulo · il percorso trasversale: le prove", celle:[
  {n:"·", t:"Il metodo per i **quiz**"}, {n:"·", t:"La prova **scritta** e **pratica**"}, {n:"·", t:"L'**orale**"},
  {n:"·", t:"L'**inglese**"}, {n:"·", t:"L'**informatica**"}, {n:"·", t:"La **simulazione** finale"}]},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossimo modulo · Modulo 18",
  titolo:"Percorso<br>trasversale", sottotitolo:"Prove, inglese, informatica, simulazioni",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
