// Contenuto delle 50 scene della lezione 12.8 — riepilogo del Modulo 12.
// Il filo è la tabella fonte → contenuto → anno promessa nella 12.1: le norme
// tornano in tabella, le riforme in linea del tempo, gli orari in cifre;
// le confusioni sono trappole.

const FCA = (righe, k = []) => ({tipo:"tabella", tema:"chiaro", colonne:["30%","52%","18%"],
  intestazioni:["Fonte", "Contenuto", "Anno"], righe, chiave:k});

const TAPPE = [
  {anno:"1978", et:"nasce il SSN · L. 833"},
  {anno:"1992-93", et:"aziendalizzazione · D.Lgs. 502 e 517"},
  {anno:"1999", et:"distretto, accreditamento · D.Lgs. 229"},
  {anno:"2001", et:"Titolo V · salute concorrente"}];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 12 · Riepilogo",
  titolo:"Fonte, contenuto,<br>anno", sottotitolo:"12.8 · Riepilogo del modulo e autovalutazione",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", sopratitolo:"Lo strumento promesso nella lezione 12.1 · oggi la completiamo", ...FCA([
  ["Costituzione, art. 32", "diritto alla **salute**", "1948"],
  ["L. cost. 3/2001", "Titolo V: salute **concorrente**", "2001"],
  ["L. 833", "istituzione del **SSN**", "1978"]])},
{id:"s03", tipo:"catena", tema:"chiaro", sopratitolo:"Il modo più efficace per memorizzare · ed è così che sono costruiti i quiz", passi:[
  {t:"Un **numero**"}, {t:"Un **anno**"}, {t:"Un **contenuto** da abbinare", key:true}]},

{id:"s04", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"La Costituzione · 1948", celle:[
  {n:"2", t:"**Solidarietà**"}, {n:"3", t:"**Uguaglianza**"}, {n:"13", t:"**Libertà personale** · la contenzione"}]},
{id:"s05", tipo:"norma", tema:"chiaro", sopratitolo:"Cure gratuite agli indigenti · nel rispetto della persona umana",
  etichetta:"Costituzione · la salute", sigla:"Art. 32",
  testo:"Diritto **fondamentale** e interesse collettivo · obblighi **solo per legge**."},
{id:"s06", tipo:"confronto", tema:"chiaro", sopratitolo:"Le due anime dell'art. 32 · la riserva di legge", col:[
  {h:"Diritto individuale", t:"scegliere e anche **rifiutare** le cure"},
  {h:"Interesse collettivo", t:"trattamenti imposti **per legge**: TSO, vaccinazioni obbligatorie"}]},
{id:"s07", tipo:"confronto", tema:"chiaro", sopratitolo:"Gli altri articoli", col:[
  {h:"Art. 97", t:"buon andamento, imparzialità, accesso per **concorso**"},
  {h:"Art. 117", t:"riparto delle competenze **Stato-Regioni**"}]},
{id:"s08", tipo:"norma", tema:"chiaro", sopratitolo:"La riforma del Titolo V",
  etichetta:"Legge costituzionale", sigla:"L. cost. 3/2001",
  testo:"Salute materia **concorrente** · LEA allo **Stato**, in via esclusiva."},

{id:"s09", tipo:"tre", tema:"chiaro", sopratitolo:"L. 833/1978 · istituzione del SSN · artt. 33-35: il TSO", box:[
  {n:"1", t:"Universalità", d:"tutta la popolazione"},
  {n:"2", t:"Uguaglianza", d:"a parità di bisogno, parità di accesso"},
  {n:"3", t:"Globalità", d:"prevenzione, cura, riabilitazione"}]},
{id:"s10", tipo:"timeline", tema:"chiaro", sopratitolo:"Le USL diventano aziende · al vertice il direttore generale",
  tappe:TAPPE.map((t,i) => ({...t, key:i===1})), attive:[0,1]},
{id:"s11", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"D.Lgs. 229/1999 · la riforma Bindi", celle:[
  {t:"Il **distretto**"}, {t:"L'**accreditamento** istituzionale"},
  {t:"L'**esclusività** dei dirigenti sanitari"}, {t:"L'**atto aziendale**"}]},
{id:"s12", tipo:"tre", tema:"chiaro", sopratitolo:"I LEA in tre livelli · DPCM 12 gennaio 2017", box:[
  {n:"1", t:"Prevenzione collettiva e sanità pubblica"},
  {n:"2", t:"Assistenza distrettuale"},
  {n:"3", t:"Assistenza ospedaliera"}]},
{id:"s13", sopratitolo:"Verificare i LEA · fissare gli standard", ...FCA([
  ["DM 12/3/2019", "Nuovo Sistema di **Garanzia**: tre aree", "2019"],
  ["DM 70", "standard **ospedalieri**", "2015"],
  ["DM 77", "standard **territoriali**", "2022"]])},

{id:"s14", sopratitolo:"Le professioni · un richiamo dal Modulo 1", ...FCA([
  ["DM 739", "**profilo** dell'infermiere", "1994"],
  ["L. 42", "abolizione del **mansionario**", "1999"]])},
{id:"s15", sopratitolo:"Le professioni", ...FCA([
  ["L. 251", "**autonomia** e dirigenza", "2000"],
  ["L. 43", "articolazione delle **funzioni**", "2006"],
  ["L. 3", "gli **Ordini** (FNOPI)", "2018"]])},
{id:"s16", sopratitolo:"Le professioni", ...FCA([
  ["L. 24", "sicurezza delle cure e **responsabilità**", "2017"],
  ["L. 219", "**consenso** e DAT", "2017"],
  ["L. 38", "cure **palliative** e terapia del dolore", "2010"]])},

{id:"s17", tipo:"catena", tema:"chiaro", sopratitolo:"L'economia · da dove arrivano le risorse", passi:[
  {t:"Fiscalità generale"}, {t:"Fabbisogno standard", d:"fissato dallo Stato"},
  {t:"Riparto", d:"per popolazione pesata"}, {t:"Costi standard", d:"D.Lgs. 68/2011 · regioni benchmark", key:true}]},
{id:"s18", tipo:"confronto", tema:"chiaro", sopratitolo:"I DRG · ricoveri per consumo di risorse, dalla SDO, con una tariffa", col:[
  {h:"Effetto", t:"riduzione della **degenza media**"},
  {h:"Rischio", t:"**dimissioni precoci**"}]},
{id:"s19", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Gestire le risorse", celle:[
  {n:"·", t:"**Budget** e controllo di gestione"}, {n:"·", t:"**Tetti** di spesa farmaceutica e payback"},
  {n:"!", t:"**Piani di rientro** per le Regioni in disavanzo"}]},
{id:"s20", tipo:"confronto", tema:"chiaro", sopratitolo:"PNRR · Missione 6 Salute · investimenti, non personale", col:[
  {h:"Componente 1", t:"reti di **prossimità** per il territorio"},
  {h:"Componente 2", t:"innovazione, ricerca, **digitalizzazione**"}]},

{id:"s21", tipo:"norma", tema:"chiaro", sopratitolo:"Il lavoro",
  etichetta:"Testo unico sul pubblico impiego", sigla:"D.Lgs. 165/2001",
  testo:"Art. 53 **incompatibilità** · artt. 55 e ss. **disciplina**."},
{id:"s22", tipo:"tabella", tema:"chiaro", sopratitolo:"I due CCNL del Comparto Sanità", colonne:["28%","28%","44%"],
  intestazioni:["CCNL", "Firma", "Novità"], righe:[
  ["2019-2021", "2/11/2022", "le **aree**"],
  ["2022-2024", "27/10/2025", "l'**assistente infermiere**"]], chiave:[1]},
{id:"s23", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Le altre novità del CCNL 2022-2024", celle:[
  {t:"**Elevata qualificazione** ampliata"}, {t:"**Ferie** a ore"},
  {t:"Settimana su **4 giorni**"}, {t:"**Patrocinio legale** per le aggressioni"}]},
{id:"s24", tipo:"cifre", tema:"chiaro", sopratitolo:"D.Lgs. 66/2003 · orario e riposi", voci:[
  {n:"11", suf:"h", d:"riposo consecutivo ogni 24"}, {n:"24", suf:"h", d:"riposo settimanale"},
  {n:"48", suf:"h", d:"media settimanale massima", key:true}]},
{id:"s25", sopratitolo:"Comportamento, anticorruzione, trasparenza", ...FCA([
  ["DPR 62 · DPR 81", "codice di **comportamento**", "2013 · 2023"],
  ["L. 190", "**anticorruzione**", "2012"],
  ["D.Lgs. 33", "**trasparenza**", "2013"]])},
{id:"s26", tipo:"confronto", tema:"chiaro", sopratitolo:"Le tutele", col:[
  {h:"D.Lgs. 24/2023", t:"**whistleblowing**: chi segnala illeciti"},
  {h:"L. 113/2020", t:"le **aggressioni** al personale sanitario"}]},

{id:"s27", tipo:"confronto", tema:"chiaro", sopratitolo:"La sicurezza · D.Lgs. 81/2008", col:[
  {h:"Datore di lavoro", t:"non delegabili: **DVR** e nomina dell'**RSPP**"},
  {h:"Preposto · L. 215/2021", t:"**interviene** e, se c'è pericolo, **interrompe**"}]},
{id:"s28", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Le altre figure · l'idoneità", celle:[
  {n:"·", t:"**Medico competente**: sorveglianza sanitaria"}, {n:"·", t:"**RLS**, eletto dai lavoratori"},
  {n:"30", t:"giorni per il **ricorso** contro il giudizio"}]},
{id:"s29", tipo:"tabella", tema:"chiaro", sopratitolo:"I rischi, titolo per titolo", colonne:["30%","70%"],
  intestazioni:["Titolo", "Rischio"], righe:[
  ["VI", "**movimentazione** dei pazienti · MAPO"], ["IX", "**chimico**"],
  ["X", "**biologico**"], ["X-bis", "**taglienti** · D.Lgs. 19/2014"]]},
{id:"s30", tipo:"confronto", tema:"chiaro", sopratitolo:"Radiazioni e stress", col:[
  {h:"D.Lgs. 101/2020", t:"radiazioni: **tempo, distanza, schermature**"},
  {h:"Art. 28", t:"**stress** lavoro-correlato, nel DVR"}]},

{id:"s31", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"La qualità", celle:[
  {n:"D", t:"**Donabedian**: struttura, processo, esito"}, {n:"↻", t:"Il ciclo **PDCA**: miglioramento continuo"},
  {n:"%", t:"**Indicatori** e standard"}, {n:"PNE", t:"Programma Nazionale **Esiti** · AGENAS"}]},
{id:"s32", tipo:"catena", tema:"chiaro", sopratitolo:"Donabedian sulle lesioni da pressione", passi:[
  {t:"Struttura", d:"superfici antidecubito"},
  {t:"Processo", d:"% di pazienti valutati con la Braden all'ingresso"},
  {t:"Esito", d:"incidenza di nuove lesioni", key:true}]},
{id:"s33", tipo:"tre", tema:"chiaro", sopratitolo:"Tre cose diverse · poi governo clinico, audit, HTA", box:[
  {n:"REQUISITI MINIMI", t:"Autorizzazione"},
  {n:"REQUISITI ULTERIORI", t:"Accreditamento istituzionale", d:"per conto del SSN", key:true},
  {n:"VOLONTARI", t:"Eccellenza e ISO"}]},

{id:"s34", tipo:"confronto", tema:"chiaro", sopratitolo:"Le confusioni che costano più punti", col:[
  {h:"Decreto legislativo", t:"il Governo, su **delega** del Parlamento"},
  {h:"Decreto-legge", t:"necessità e urgenza · conversione entro **60 giorni**"}]},
{id:"s35", tipo:"trappola", tema:"chiaro", sopratitolo:"Le confusioni che costano più punti", righe:[
  {sb:"D.Lgs. 502 = D.Lgs. 229", ok:"502 **aziendalizzazione** · 229 **distretto e accreditamento**"},
  {sb:"DM 70 = DM 77", ok:"70 **ospedale** · 77 **territorio**"},
  {sb:"Autorizzazione = accreditamento", ok:"Requisiti **minimi** · requisiti **ulteriori**"}]},
{id:"s36", tipo:"trappola", tema:"chiaro", sopratitolo:"Le confusioni che costano più punti", righe:[
  {sb:"Dirigente = preposto", ok:"Il dirigente **organizza** · il preposto **vigila**"},
  {sb:"RSPP = RLS", ok:"RSPP **nominato** · RLS **eletto**"},
  {sb:"Processo = esito", ok:"**Come si lavora** · il **risultato di salute**"}]},

{id:"s37", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Le domande d'orale più probabili", celle:[
  {n:"1", t:"L'**art. 32** e i trattamenti obbligatori"}, {n:"2", t:"I principi della **L. 833**"},
  {n:"3", t:"Che cosa sono i **LEA**"}, {n:"4", t:"Le figure del D.Lgs. 81 · il **preposto**"}]},
{id:"s38", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Una risposta di un minuto ciascuna", celle:[
  {n:"5", t:"**Primary nursing** e modello per compiti"}, {n:"6", t:"Struttura, processo, **esito**"},
  {n:"7", t:"I **DRG**"}, {n:"8", t:"Il **codice di comportamento** e i social"}]},

{id:"s39", tipo:"frase", tema:"chiaro", sopratitolo:"Il ponte verso il Modulo 13",
  testo:"Il Titolo V affida a ogni Regione **l'organizzazione** del proprio servizio.",
  sotto:"Il Veneto ha costruito un sistema con caratteristiche proprie."},
{id:"s40", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"In Veneto", celle:[
  {t:"**L.R. 19/2016**"}, {t:"**Azienda Zero**"}, {t:"Le **9 ULSS**"},
  {t:"Schede di **dotazione**"}, {t:"**UVMD** con la SVaMA"}, {t:"**L.R. 22/2002**"}]},
{id:"s41", tipo:"frase", tema:"chiaro", sopratitolo:"Il Modulo 13",
  testo:"Tutto questo modulo, nel **contesto in cui lavorerai**."},

{id:"s42", tipo:"cifre", tema:"chiaro", sopratitolo:"Come proseguire · la tabella nel quaderno · le flashcard", voci:[
  {n:"30", suf:"", d:"domande del test"}, {n:"21", suf:"", d:"soglia", key:true}]},
{id:"s43", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Nelle settimane prima della prova: le novità", celle:[
  {t:"Il rinnovo del **CCNL 2025-2027**"}, {t:"Gli aggiornamenti dei **LEA**"}]},

{id:"s44", tipo:"frase", tema:"chiaro", sopratitolo:"Il metodo per i quiz normativi · leggi tutte le opzioni",
  testo:"«Sempre», «mai», «esclusivamente»: spesso indicano **l'opzione sbagliata**."},
{id:"s45", tipo:"confronto", tema:"chiaro", sopratitolo:"Una legge sul consenso non fa decidere l'infermiere al posto del paziente", col:[
  {h:"Non ricordi il numero", t:"ragiona per **principi**"},
  {h:"Concorso con penalità", t:"**non tirare** a indovinare"}]},

{id:"s46", tipo:"titolo", tema:"profondo",
  titolo:"Conoscere il sistema<br>è parte della<br>**competenza professionale**.",
  sotto:""},
{id:"s47", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Chi sa come funziona la sua organizzazione sa anche", celle:[
  {n:"·", t:"**A chi** rivolgersi"}, {n:"·", t:"Che cosa può **chiedere**"}, {n:"·", t:"Che cosa deve **garantire**"}]},

{id:"s48", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Nel prossimo modulo · il Servizio Socio Sanitario del Veneto", celle:[
  {n:"1", t:"L'**assetto** regionale"}, {n:"2", t:"**Azienda Zero**"}, {n:"3", t:"La rete **ospedaliera** e **territoriale**"},
  {n:"4", t:"La **non autosufficienza**"}, {n:"5", t:"La **prevenzione**"}, {n:"6", t:"La sanità **digitale**"}]},
{id:"s49", tipo:"frase", tema:"chiaro", sopratitolo:"Il Modulo 13",
  testo:"Il modulo che più distingue chi si prepara per **questo concorso**."},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossimo modulo",
  titolo:"Modulo 13<br>Il Servizio Socio<br>Sanitario del Veneto", sottotitolo:"L'assetto regionale, Azienda Zero, le reti, la sanità digitale",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
