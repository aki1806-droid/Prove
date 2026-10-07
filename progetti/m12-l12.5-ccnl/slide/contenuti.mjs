// Contenuto delle 50 scene della lezione 12.5 — il rapporto di lavoro e il CCNL.
// Le fonti come norme, i contratti come percorso a tappe, le aree come scala,
// orario e ferie come cifre, le sanzioni disciplinari come scala crescente.

const CCNL = (att, chiave) => ({tipo:"percorso", tema:"chiaro", tappe:[
  {t:"2019-2021", d:"firmato il 2/11/2022", key:chiave===0}, {t:"2022-2024", d:"firma definitiva 27/10/2025", key:chiave===1},
  {t:"2025-2027", d:"rinnovo in avvio"}], attive:att});

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 12 · Organizzazione, normativa e sicurezza",
  titolo:"Il rapporto di lavoro<br>e il CCNL", sottotitolo:"12.5 · Le fonti, il contratto del Comparto Sanità, gli obblighi del dipendente pubblico",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"frase", tema:"chiaro", sopratitolo:"Micro-lezione 5 di 8 · diritti e doveri definiti da leggi e da un contratto collettivo nazionale",
  testo:"Se vinci il concorso, diventi un **dipendente pubblico**."},
{id:"s03", tipo:"tre", tema:"chiaro", sopratitolo:"Una parte che i candidati trascurano · all'orale fa la differenza", box:[
  {n:"1", t:"Le fonti", d:"del rapporto di lavoro"}, {n:"2", t:"Il contratto", d:"del Comparto Sanità"}, {n:"3", t:"Gli obblighi", d:"di comportamento", key:true}]},

{id:"s04", tipo:"norma", tema:"chiaro", etichetta:"Le fonti del rapporto di lavoro pubblico", sigla:"D.Lgs. 165/2001",
  testo:"Il **testo unico** sul pubblico impiego."},
{id:"s05", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"Un rapporto di lavoro privatizzato · regolato da", celle:[
  {t:"Il **codice civile**"}, {t:"Le **leggi sul lavoro**"}, {t:"Soprattutto i **contratti collettivi**", key:true}]},
{id:"s06", tipo:"confronto", tema:"chiaro", sopratitolo:"ARAN: l'agenzia che rappresenta le pubbliche amministrazioni", col:[
  {h:"Nazionale", t:"**CCNL**: ARAN e sindacati rappresentativi"}, {h:"Aziendale", t:"contrattazione **integrativa**", key:true}]},
{id:"s07", tipo:"percorso", tema:"chiaro", sopratitolo:"L'accesso al lavoro pubblico", tappe:[
  {t:"Concorso", d:"art. 97 della Costituzione", key:true}, {t:"Periodo di prova", d:"l'inizio del rapporto"}], attive:[0,1]},

{id:"s08", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Il CCNL del Comparto Sanità · si applica a", celle:[
  {n:"·", t:"**Infermieri**", key:true}, {n:"·", t:"**Ostetriche**"}, {n:"·", t:"**Tecnici**"},
  {n:"·", t:"**OSS**"}, {n:"·", t:"Personale **amministrativo**"}]},
{id:"s09", sopratitolo:"Due tappe recenti · il CCNL 2019-2021 introduce la classificazione per aree", ...CCNL([0], 0)},
{id:"s10", sopratitolo:"Prima della prova, verifica le novità", ...CCNL([0,1,2], 1)},

{id:"s11", tipo:"scala", tema:"chiaro", sopratitolo:"Le cinque aree di classificazione", gradini:[
  {n:"1", t:"Personale di supporto"}, {n:"2", t:"Operatori", d:"es. OSS"}, {n:"3", t:"Assistenti"},
  {n:"4", t:"Professionisti della salute e funzionari", d:"es. infermiere", key:true}, {n:"5", t:"Elevata qualificazione"}]},
{id:"s12", tipo:"norma", tema:"chiaro", etichetta:"CCNL 2022-2024 · già definito da un accordo Stato-Regioni", sigla:"Assistente infermiere",
  testo:"Fra l'area dei **professionisti** e quella degli **operatori**."},
{id:"s13", tipo:"frase", tema:"chiaro", sopratitolo:"Come stabilisce il suo profilo professionale",
  testo:"L'infermiere resta il **responsabile** dell'assistenza generale infermieristica."},

{id:"s14", tipo:"confronto", tema:"chiaro", sopratitolo:"La carriera · gli incarichi di funzione", col:[
  {h:"Di organizzazione", t:"es. il **coordinamento** di un'unità operativa"},
  {h:"Professionali", t:"professionista **specialista** (es. master in wound care) · professionista **esperto**", key:true}]},
{id:"s15", tipo:"griglia", tema:"chiaro", colonne:4, spunta:true, sopratitolo:"Gli incarichi · poi le progressioni economiche all'interno dell'area", celle:[
  {t:"Con **avviso**"}, {t:"E **valutazione**"}, {t:"A **tempo determinato**"}, {t:"**Rinnovabili**", key:true}]},
{id:"s16", tipo:"cifre", tema:"chiaro", sopratitolo:"Area di elevata qualificazione · accesso ampliato dal CCNL 2022-2024", voci:[
  {n:"3", suf:"anni", d:"laurea **magistrale** + incarico di funzione"}, {n:"7", suf:"anni", d:"ora anche **triennale** o titolo equipollente", key:true}]},

{id:"s17", tipo:"cifre", tema:"chiaro", sopratitolo:"L'orario ordinario · CCNL 2022-2024: dove l'organizzazione lo permette", voci:[
  {n:"36", suf:"ore", d:"settimanali · anche su **4 giorni**", key:true}]},
{id:"s18", tipo:"cifre", tema:"chiaro", sopratitolo:"D.Lgs. 66/2003 · vale per tutti i lavoratori, tutela la salute", voci:[
  {n:"11", suf:"ore", d:"di riposo **consecutive** ogni 24", key:true}]},
{id:"s19", tipo:"cifre", tema:"chiaro", sopratitolo:"D.Lgs. 66/2003 · i tre numeri", voci:[
  {n:"11", suf:"ore", d:"riposo **giornaliero**"}, {n:"24", suf:"ore", d:"riposo **settimanale**, di norma cumulato con le 11", key:true},
  {n:"48", suf:"ore", d:"media **massima** settimanale, straordinario compreso", key:true}]},
{id:"s20", tipo:"confronto", tema:"chiaro", sopratitolo:"Turni e reperibilità", col:[
  {h:"Lavoro notturno", t:"**sorveglianza sanitaria**"}, {h:"Pronta disponibilità", t:"la **reperibilità**, disciplinata dal contratto", key:true}]},
{id:"s21", tipo:"titolo", tema:"profondo",
  titolo:"Il riposo non è un privilegio:<br>è **sicurezza del paziente**.",
  sotto:""},

{id:"s22", tipo:"cifre", tema:"chiaro", sopratitolo:"Le ferie · giorni lavorativi", voci:[
  {n:"28", suf:"giorni", d:"con orario su **5 giorni**", key:true}, {n:"32", suf:"giorni", d:"con orario su **6 giorni**"},
  {n:"4", suf:"", d:"giornate di **festività soppresse**"}]},
{id:"s23", tipo:"trappola", tema:"chiaro", sopratitolo:"Un diritto irrinunciabile · CCNL 2022-2024: fruizione anche a ore", righe:[
  {sb:"Ferie monetizzate", ok:"Di norma **non** si monetizzano · anche **a ore**"}]},
{id:"s24", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"I permessi", celle:[
  {t:"Motivi **personali** o familiari"}, {t:"**Matrimonio**"}, {t:"**Lutto**"},
  {t:"**Legge 104**: assistenza a familiari con disabilità grave", key:true}]},
{id:"s25", tipo:"norma", tema:"chiaro", etichetta:"I congedi parentali", sigla:"D.Lgs. 151/2001",
  testo:"Il nuovo contratto ha esteso le **tutele** su permessi, assenze e congedi."},

{id:"s26", tipo:"norma", tema:"chiaro", etichetta:"Codice di comportamento dei dipendenti pubblici", sigla:"DPR 62/2013",
  testo:"Aggiornato dal **DPR 81/2023**."},
{id:"s27", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"L'aggiornamento: uso delle tecnologie e dei social media", celle:[
  {n:"×", t:"Non diffondere informazioni **riservate**"}, {n:"×", t:"Non danneggiare l'**immagine** dell'amministrazione"},
  {n:"+", t:"Ogni azienda: un codice **integrativo**", key:true}]},
{id:"s28", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"Gli obblighi", celle:[
  {t:"**Diligenza**"}, {t:"**Lealtà**"}, {t:"**Imparzialità**"}, {t:"**Riservatezza**"},
  {t:"Regali solo di **modico valore**"}, {t:"Astensione nel **conflitto di interessi**", key:true}]},
{id:"s29", tipo:"confronto", tema:"chiaro", sopratitolo:"Due codici, insieme", col:[
  {h:"La violazione", t:"responsabilità **disciplinare**"}, {h:"Si affianca a", t:"il **Codice deontologico** · lezione 1.4", key:true}]},
{id:"s30", tipo:"titolo", tema:"profondo",
  titolo:"Uno vale come **dipendente**,<br>l'altro come **professionista**.",
  sotto:""},

{id:"s31", tipo:"norma", tema:"chiaro", etichetta:"Prevenzione della corruzione nella PA", sigla:"L. 190/2012",
  testo:"Il **RPCT**: Responsabile della prevenzione della corruzione e della trasparenza."},
{id:"s32", tipo:"frase", tema:"chiaro", sopratitolo:"Le misure di prevenzione, oggi · DL 80/2021",
  testo:"Nel **PIAO**: Piano integrato di attività e organizzazione."},
{id:"s33", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"D.Lgs. 33/2013 · la trasparenza", celle:[
  {n:"→", t:"La sezione «**Amministrazione trasparente**» dei siti"}, {n:"→", t:"L'**accesso civico**", key:true}]},
{id:"s34", tipo:"confronto", tema:"chiaro", sopratitolo:"Whistleblowing · D.Lgs. 24/2023", col:[
  {h:"Che cosa tutela", t:"chi **segnala illeciti**", key:true}, {h:"In sanità, aree a rischio", t:"**liste d'attesa** e **acquisti**"}]},

{id:"s35", tipo:"scala", tema:"chiaro", sopratitolo:"D.Lgs. 165/2001 artt. 55 e ss. e codice disciplinare · sanzioni graduate", gradini:[
  {n:"1", t:"Rimprovero verbale"}, {n:"2", t:"Rimprovero scritto"}, {n:"3", t:"Multa"}, {n:"4", t:"Sospensione"},
  {n:"5", t:"Licenziamento", d:"con o senza preavviso", key:true}]},
{id:"s36", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"Le garanzie", celle:[
  {t:"**Contestazione scritta** dell'addebito", key:true}, {t:"**Diritto di difesa** · anche con sindacato o legale"}, {t:"**Termini** precisi"}]},
{id:"s37", tipo:"confronto", tema:"chiaro", sopratitolo:"Chi decide, e il rapporto con il penale", col:[
  {h:"Infrazioni più gravi", t:"**UPD**: Ufficio per i procedimenti disciplinari"}, {h:"Rispetto al penale", t:"procedimento **autonomo**", key:true}]},

{id:"s38", tipo:"norma", tema:"chiaro", etichetta:"Il principio di esclusività · D.Lgs. 165/2001", sigla:"Art. 53",
  testo:"Incarichi esterni solo se **autorizzati** e non incompatibili."},
{id:"s39", tipo:"trappola", tema:"chiaro", sopratitolo:"Deroghe temporanee per le professioni sanitarie, legate alla carenza · verifica la disciplina vigente", righe:[
  {sb:"Doppio lavoro non autorizzato", ok:"Resta un **illecito disciplinare**"}]},

{id:"s40", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Le aggressioni · CCNL 2022-2024", celle:[
  {t:"**Patrocinio legale** da parte dell'azienda", key:true}, {t:"**Supporto psicologico** al dipendente aggredito"}]},
{id:"s41", tipo:"norma", tema:"chiaro", etichetta:"Lesioni al personale sanitario · aggravanti", sigla:"L. 113/2020",
  testo:"Raccomandazione n. 8 · ogni aggressione va **segnalata**."},

{id:"s42", tipo:"frase", tema:"chiaro", sopratitolo:"Il caso d'esame · senza volto, ma con dettagli riconoscibili",
  testo:"Un collega pubblica sui **social** la foto di un paziente. Quali norme viola?"},
{id:"s43", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Le norme violate", celle:[
  {n:"1", t:"**Riservatezza** e dati personali · GDPR, lezione 1.7", key:true}, {n:"2", t:"**Codice di comportamento** · i social dal 2023"},
  {n:"3", t:"**Codice deontologico**"}]},
{id:"s44", tipo:"catena", tema:"chiaro", sopratitolo:"Rilievo disciplinare e, nei casi più gravi, penale · che cosa fai?", passi:[
  {t:"Inviti il collega a **rimuovere** subito il contenuto", key:true}, {t:"Se necessario, **segnali**"}, {t:"Secondo le **procedure** aziendali"}]},

{id:"s45", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"In Veneto · oltre al contratto nazionale", celle:[
  {n:"·", t:"Contrattazione **integrativa** aziendale"}, {n:"·", t:"**Codice di comportamento** aziendale"},
  {n:"·", t:"Reclutamento tramite **Azienda Zero**", key:true}]},

{id:"s46", tipo:"tabella", tema:"chiaro", sopratitolo:"La tabella", colonne:["40%","60%"],
  intestazioni:["Norma", "Da ricordare"], righe:[
  ["D.Lgs. 165/2001", "rapporto **privatizzato** · art. 53 · artt. 55 e ss."], ["D.Lgs. 66/2003", "**11** h · **24** h · **48** h medie"],
  ["Ferie", "**28** o **32** giorni + **4**"]], chiave:[1]},
{id:"s47", tipo:"tabella", tema:"chiaro", sopratitolo:"La tabella · i due contratti", colonne:["40%","60%"],
  intestazioni:["Contratto", "Da ricordare"], righe:[
  ["CCNL 2019-2021", "le **aree**"], ["CCNL 2022-2024", "**assistente infermiere** · elevata qualificazione ampliata"],
  ["", "**ferie a ore** · settimana su **4 giorni** · **patrocinio** per le aggressioni"]], chiave:[1]},

{id:"s48", tipo:"frase", tema:"chiaro", sopratitolo:"Una nota di metodo · la materia cambia a ogni rinnovo: il testo vigente è sul sito dell'ARAN",
  testo:"Per l'esame contano i **principi** e la **struttura**."},

{id:"s49", tipo:"frase", tema:"chiaro", sopratitolo:"Nella prossima lezione · le figure della prevenzione, i rischi specifici dell'infermiere",
  testo:"La **sicurezza sul lavoro**: il D.Lgs. 81/2008."},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione",
  titolo:"12.6<br>La sicurezza<br>sul lavoro in sanità", sottotitolo:"Il D.Lgs. 81/2008, le figure della prevenzione, i rischi dell'infermiere",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
