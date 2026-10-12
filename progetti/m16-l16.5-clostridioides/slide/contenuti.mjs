// Contenuto delle 50 scene della lezione 16.5 — diarrea in reparto:
// Clostridioides difficile e isolamento. Le precauzioni da contatto e
// l'assistenza sono griglie che si accendono; l'eccezione delle mani tre
// gesti (guanti, acqua e sapone, le spore via); il secondo caso un percorso
// dalla sesta all'ottava giornata; i multiresistenti tre riquadri; errori e
// risposta modello in tabella e nel promemoria che si scrive riga per riga.

const LEZIONI = [
  {n:"4.2", t:"Igiene delle mani", illu:"dispenser"},
  {n:"4.3", t:"Isolamento", illu:"cartello"},
  {n:"4.5", t:"Sanificazione", illu:"vasca"},
  {n:"4.6", t:"Stewardship", illu:"pillola"},
  {n:"3.5", t:"Elettroliti", illu:"goccia"}];

const PRECAUZIONI = (att, k) => ({tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, attive:att, celle:[
  {t:"**Stanza singola** con bagno dedicato · o almeno una comoda dedicata", key:k===0},
  {t:"Se non c'è: **coorte**, secondo il gruppo per le infezioni"},
  {t:"**Guanti e camice** per ogni contatto, con il paziente o l'ambiente", key:k===2},
  {t:"**Dispositivi dedicati**: fonendoscopio, termometro, sfigmomanometro"},
  {t:"**Segnaletica** sulla porta"},
  {t:"**Trasporti** limitati e comunicati in anticipo"},
  {t:"Informare il **gruppo operativo** per il controllo delle infezioni", key:k===6}]});

const ASSISTENZA = (att, k) => ({tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, attive:att, celle:[
  {t:"**Idratazione**, bilancio idrico, peso"},
  {t:"**Elettroliti**: rischio di ipokaliemia (3.5)", key:k===1},
  {t:"**Diario** delle scariche: numero, consistenza, Bristol"},
  {t:"**Cute perianale**: igiene delicata, prodotti barriera", key:k===3},
  {t:"Rischio di **cadute**: urgenza, debolezza"},
  {t:"**Dignità** e privacy", key:k===5},
  {t:"**Alimentazione**"}]});

const RESISTENTI = (att, k) => ({tipo:"tre", tema:"chiaro", attive:att, box:[
  {n:"MRSA", t:"Stafilococco aureo", d:"resistente alla meticillina", key:k===0},
  {n:"KPC", t:"Enterobatteri produttori di carbapenemasi", d:"es. Klebsiella pneumoniae · molto diffusi in Italia", key:k===1},
  {n:"VRE", t:"Enterococchi", d:"resistenti alla vancomicina"}]});

const RISPOSTA = (att) => ({tipo:"memo", tema:"chiaro", attive:att, voci:[
  "**Chi è**: anziano, antibiotico e IPP · 6ª giornata: diarrea acquosa, febbricola, dolore → **sospetto C. difficile**",
  "Al sospetto: **precauzioni da contatto** · stanza singola e bagno dedicato · guanti, camice, dispositivi dedicati",
  "Informo il medico e il **gruppo** per le infezioni",
  "Mani con **acqua e sapone** · feci **non formate** · terapia orale · rivalutare antibiotico e IPP · **stop** lassativi",
  "Idratazione, elettroliti, cute, cadute, **dignità** · sorveglio i segni di gravità",
  "Sanificazione **sporicida** · segnalo i nuovi casi"]});

const COLLEGAMENTI = (att) => ({tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, attive:att, celle:[
  {n:"4.2", t:"**Igiene delle mani**"}, {n:"4.3", t:"**Precauzioni** e isolamento"},
  {n:"4.5", t:"**Sanificazione**"}, {n:"4.6", t:"**Stewardship**"},
  {n:"3.5", t:"**Elettroliti** e bilancio"}, {n:"3.7", t:"**Alvo**"},
  {n:"7.2", t:"**Cute**"}]});

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 16 · Casi clinici avanzati",
  titolo:"Diarrea<br>in reparto", sottotitolo:"16.5 · Clostridioides difficile e isolamento",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"icone", tema:"chiaro", sopratitolo:"Micro-lezione 5 di 12 · un'infezione correlata all'assistenza · tutto il modulo 4", voci:[
  {icona:"dispenser", t:"Igiene delle mani"}, {icona:"cartello", t:"Isolamento", key:true},
  {icona:"vasca", t:"Sanificazione"}, {icona:"pillola", t:"Antibiotici", d:"uso responsabile"}]},
{id:"s03", tipo:"anello", tema:"chiaro", sopratitolo:"Il protagonista forma spore resistenti e prospera negli ospedali · i collegamenti",
  centro:"16.5", sotto:"Clostridioides difficile", voci:LEZIONI},

{id:"s04", tipo:"icone", tema:"chiaro", sopratitolo:"Lo scenario · il signor Aldo", voci:[
  {icona:"anziano", t:"81 anni", d:"in Medicina per polmonite"},
  {icona:"flebo", t:"Cefalosporina"},
  {icona:"pillola", t:"Inibitore di pompa protonica", key:true}]},
{id:"s05", tipo:"cifre", tema:"chiaro", sopratitolo:"Parzialmente autonomo · divide la stanza con un altro paziente · usa il bagno comune", voci:[
  {n:"5", suf:"scariche", t:"feci acquose", d:"nelle ultime 24 ore", key:true},
  {n:"6ª", t:"giornata di ricovero", d:"febbricola · dolore addominale crampiforme"}]},
{id:"s06", tipo:"pausa", tema:"chiaro", sopratitolo:"Prima ancora di avere un risultato di laboratorio", es:"Lo scenario",
  testo:"Che cosa **sospetti**? E che cosa **fai**?",
  dati:["81 anni", "cefalosporina", "IPP", "5 scariche in 24 h", "bagno comune"]},

{id:"s07", tipo:"catena", tema:"chiaro", sopratitolo:"Il ragionamento · i fattori di rischio ci sono tutti", passi:[
  {t:"**≥ 3 scariche** non formate in 24 ore"},
  {t:"Ricoverato, in **terapia antibiotica**"},
  {t:"Sospetta infezione da **Clostridioides difficile**", key:true}]},
{id:"s08", tipo:"raggiera", tema:"chiaro", sopratitolo:"Trasmissione oro-fecale · spore che resistono a lungo nell'ambiente", centro:"Rischio",
  raggi:[{t:"Antibiotici", d:"alterano il microbiota", key:true}, {t:"Età", d:"avanzata"}, {t:"Ospedale", d:"il ricovero"},
         {t:"IPP", d:"inibitori di pompa"}, {t:"Comorbidità"}]},
{id:"s09", tipo:"sostituzione", tema:"chiaro", sopratitolo:"Spore che l'alcol non distrugge · la regola organizzativa più importante",
  da:{h:"Non", t:"aspettare la conferma"}, a:{h:"Ma", t:"precauzioni al **sospetto**"},
  sotto:"Aspettare l'esito significa dare al batterio **uno o due giorni** di vantaggio"},

{id:"s10", sopratitolo:"Le precauzioni da contatto", ...PRECAUZIONI([0,1], 0)},
{id:"s11", sopratitolo:"Le precauzioni da contatto · per ogni contatto", ...PRECAUZIONI([0,1,2,3,4], 2)},
{id:"s12", sopratitolo:"Le precauzioni da contatto della lezione 4.3", ...PRECAUZIONI([0,1,2,3,4,5,6], 6)},

{id:"s13", tipo:"figura", tema:"chiaro", illu:"dispenser", sopratitolo:"L'igiene delle mani · l'eccezione più famosa",
  titolo:"La frizione alcolica **non elimina le spore**.", sotto:"Di solito è il metodo di riferimento. Qui no."},
{id:"s14", tipo:"gesti", tema:"chiaro", sopratitolo:"Dopo il contatto con il paziente o con il suo ambiente", voci:[
  {illu:"guanto", t:"Togliere i guanti"},
  {illu:"rubinetto", t:"Acqua e sapone", key:true},
  {illu:"microbo", t:"Le spore via", d:"con l'azione meccanica"}]},
{id:"s15", tipo:"confronto", tema:"chiaro", sopratitolo:"I guanti restano fondamentali · una domanda d'esame quasi certa", col:[
  {h:"Clostridioides difficile", t:"guanti, poi **acqua e sapone**"},
  {h:"Tutte le altre situazioni", t:"la **frizione alcolica** resta il riferimento"}]},

{id:"s16", tipo:"bivio", tema:"chiaro", sopratitolo:"La diagnosi", radice:"Il campione di feci", rami:[
  {q:"feci formate", t:"Di norma non si inviano", d:"positivo anche in un semplice portatore"},
  {q:"feci non formate", t:"Si inviano", key:true}]},
{id:"s17", tipo:"catena", tema:"chiaro", sopratitolo:"Secondo procedura, e secondo il protocollo del laboratorio", passi:[
  {t:"Contenitore **idoneo**"}, {t:"**Etichettatura** corretta"},
  {t:"Invio **rapido**", d:"o conservazione secondo procedura"},
  {t:"Ricerca delle **tossine**", d:"o del gene che le produce", key:true}]},
{id:"s18", tipo:"frase", tema:"chiaro", sopratitolo:"E poi",
  testo:"**Non** si ripete il test per «verificare la guarigione».", sotto:"Il batterio può restare a lungo anche quando il paziente sta bene."},

{id:"s19", tipo:"figura", tema:"chiaro", illu:"colon", sopratitolo:"La terapia, su prescrizione",
  titolo:"Specifica, **per via orale**.", sotto:"Vancomicina orale o fidaxomicina · la vancomicina orale non viene assorbita: agisce **nell'intestino**."},
{id:"s20", tipo:"tre", tema:"chiaro", sopratitolo:"Con il medico", box:[
  {n:"Rivalutare", t:"L'antibiotico in corso", d:"ha causato il problema"},
  {n:"Rivalutare", t:"L'inibitore di pompa"},
  {n:"Sospendere", t:"I lassativi", d:"a volte sono ancora in terapia", key:true}]},
{id:"s21", tipo:"frase", tema:"chiaro", sopratitolo:"Antidiarroici: non senza indicazione · la stewardship della lezione 4.6",
  testo:"Meno antibiotici inutili, **meno Clostridioides**."},

{id:"s22", sopratitolo:"L'assistenza · un anziano con diarrea si disidrata rapidamente", ...ASSISTENZA([0,1], 1)},
{id:"s23", sopratitolo:"L'assistenza · dermatite associata all'incontinenza", ...ASSISTENZA([0,1,2,3], 3)},
{id:"s24", sopratitolo:"L'assistenza · una condizione imbarazzante", ...ASSISTENZA([0,1,2,3,4,5,6], 5)},

{id:"s25", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"I segni di gravità, da conoscere · e una trappola", celle:[
  {n:"1", t:"**Febbre** elevata"}, {n:"2", t:"**Leucocitosi** marcata"},
  {n:"3", t:"**Creatinina** in aumento"}, {n:"4", t:"**Distensione** addominale dolorosa", key:true}]},
{id:"s26", tipo:"figura", tema:"chiaro", illu:"colon", lato:"dx", sopratitolo:"Meno scariche, all'improvviso, con l'addome che si distende",
  titolo:"**Non** è sempre un miglioramento.", sotto:"Ileo o **megacolon tossico**: il colon si dilata e non si svuota più · con ipotensione e confusione, si segnala **subito**."},

{id:"s27", tipo:"percorso", tema:"chiaro", sopratitolo:"Ottava giornata: il secondo caso", tappe:[
  {t:"Sesta giornata", d:"Aldo: cinque scariche"},
  {t:"Ottava giornata", d:"il compagno di stanza ha diarrea", key:true},
  {t:"Possibile cluster", d:"una trasmissione in reparto"}]},
{id:"s28", tipo:"catena", tema:"chiaro", sopratitolo:"Due casi collegati", passi:[
  {t:"Informare **subito**", d:"gruppo per le infezioni e direzione", key:true},
  {t:"Precauzioni anche per il **secondo**"},
  {t:"Rivedere che cosa ha **favorito** la trasmissione"}]},
{id:"s29", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Il secondo caso conferma quanto contasse isolare il primo al sospetto", celle:[
  {t:"Il **bagno comune**", key:true}, {t:"I **dispositivi** condivisi"},
  {t:"L'aderenza all'**igiene delle mani**"}, {t:"Sanificazione **straordinaria**"},
  {t:"Sorveglianza degli **altri pazienti**"}]},

{id:"s30", tipo:"figura", tema:"chiaro", illu:"zona", sopratitolo:"La sanificazione · secondo la procedura aziendale",
  titolo:"Prodotti **sporicidi**.", sotto:"Per esempio a base di **cloro** · la disinfezione sporicida della lezione 4.5."},
{id:"s31", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"Le superfici ad alto contatto · dispositivi riutilizzabili puliti e disinfettati dopo ogni uso", celle:[
  {t:"**Sponde**"}, {t:"**Campanello**"}, {t:"**Comodino**"},
  {t:"**Maniglie**"}, {t:"**Bagno**", key:true}, {t:"**Comoda**"}]},
{id:"s32", tipo:"catena", tema:"chiaro", sopratitolo:"Alla fine", passi:[
  {t:"**Dimissione**", d:"o termine dell'isolamento"},
  {t:"Sanificazione **terminale**", d:"della stanza", key:true},
  {t:"Con il servizio di **pulizia**", d:"che deve conoscere il prodotto da usare"}]},

{id:"s33", sopratitolo:"I germi multiresistenti · una logica simile", ...RESISTENTI([0], 0)},
{id:"s34", sopratitolo:"I germi multiresistenti", ...RESISTENTI([0,1,2], 1)},
{id:"s35", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Per i pazienti a rischio", celle:[
  {t:"**Screening** secondo protocollo: tampone rettale all'ingresso", key:true},
  {t:"Precauzioni da **contatto**"}, {t:"Igiene delle **mani**"},
  {t:"Dispositivi **dedicati**"}, {t:"**Sanificazione**"}, {t:"**Stewardship**"}]},
{id:"s36", tipo:"figura", tema:"chiaro", illu:"cartella", sopratitolo:"Nei trasferimenti e alla dimissione, anche verso le strutture residenziali",
  titolo:"La colonizzazione **si segnala**.", sotto:"Per non interrompere la catena di prevenzione."},

{id:"s37", tipo:"tabella", tema:"chiaro", sopratitolo:"Gli errori da evitare · l'isolamento", colonne:["55%","45%"],
  intestazioni:["Errore", "Invece"], righe:[
  ["no:Aspettare il referto per isolare", "isolare al **sospetto**"],
  ["no:Solo la frizione alcolica", "**acqua e sapone**"],
  ["no:Il paziente nel bagno comune", "bagno o comoda **dedicati**"],
  ["no:Fonendoscopio e termometro condivisi", "dispositivi **dedicati**"],
  ["no:Inviare feci formate", "solo feci **non formate**"]], chiave:[0]},
{id:"s38", tipo:"tabella", tema:"chiaro", sopratitolo:"Gli errori da evitare · la terapia e l'assistenza", colonne:["55%","45%"],
  intestazioni:["Errore", "Invece"], righe:[
  ["no:Lassativi e antibiotico senza rivalutazione", "sospendere, **rivalutare**"],
  ["no:Meno scariche e addome disteso: «migliora»", "possibile **megacolon**: segnalare"],
  ["no:Trascurare la cute e la dignità", "prodotti barriera, **privacy**"]], chiave:[1]},

{id:"s39", tipo:"confronto", tema:"chiaro", sopratitolo:"D1 · «Perché acqua e sapone e non il gel alcolico?» · poi D2", col:[
  {h:"Gel alcolico", t:"non distrugge le **spore**"},
  {h:"Acqua e sapone", t:"le rimuove **meccanicamente**"}]},
{id:"s40", tipo:"griglia", tema:"chiaro", colonne:4, spunta:false, sopratitolo:"D2 · «In che cosa consistono le precauzioni da contatto?»", celle:[
  {n:"1", t:"Stanza singola o **coorte**"}, {n:"2", t:"**Bagno** dedicato"}, {n:"3", t:"**Guanti e camice**", key:true}, {n:"4", t:"Dispositivi **dedicati**"},
  {n:"5", t:"**Segnaletica**"}, {n:"6", t:"Trasporti **limitati**"}, {n:"7", t:"Sanificazione **accurata**"}, {n:"8", t:"**Gruppo** per le infezioni"}]},
{id:"s41", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"D3 · «Quali sono i fattori di rischio?»", celle:[
  {n:"1", t:"Terapia **antibiotica**", key:true}, {n:"2", t:"**Età** avanzata"}, {n:"3", t:"Ospedale o **struttura**"},
  {n:"4", t:"Inibitori di **pompa**"}, {n:"5", t:"**Comorbidità**"}, {n:"6", t:"**Immunodepressione**"}]},

{id:"s42", sopratitolo:"La risposta modello, in 15 righe", ...RISPOSTA([0])},
{id:"s43", sopratitolo:"La risposta modello · al sospetto", ...RISPOSTA([0,1,2])},
{id:"s44", sopratitolo:"La risposta modello · diagnosi e terapia", ...RISPOSTA([0,1,2,3])},
{id:"s45", sopratitolo:"La risposta modello · assistenza e sanificazione", ...RISPOSTA([0,1,2,3,4,5])},

{id:"s46", sopratitolo:"I collegamenti", ...COLLEGAMENTI([0,1,2,3])},
{id:"s47", sopratitolo:"I collegamenti", ...COLLEGAMENTI([0,1,2,3,4,5,6])},

{id:"s48", tipo:"titolo", tema:"profondo",
  titolo:"Con le spore,<br>l'alcol **non basta**.",
  sotto:"Servono acqua, sapone e un isolamento al primo sospetto · la frase del caso"},

{id:"s49", tipo:"figura", tema:"chiaro", illu:"orologio", sopratitolo:"Nella prossima lezione",
  titolo:"Un motociclista **politraumatizzato**.", sotto:"Di notte, in Pronto Soccorso: l'approccio XABCDE in équipe, minuto per minuto."},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione · 16.6",
  titolo:"Il politrauma", sottotitolo:"XABCDE in équipe, minuto per minuto",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
