// Contenuto delle 50 scene della lezione 16.6 — il politrauma. L'XABCDE è
// una griglia di sei lettere; il viaggio dal Pronto Soccorso alla sala un
// percorso; l'ora del tourniquet e l'acido tranexamico due finestre di
// tempo; le sedi del sanguinamento la sagoma; la triade letale il triangolo
// e poi il circolo vizioso; errori e risposta modello in tabella e nel
// promemoria che si scrive riga per riga.

const XABCDE = (att, k) => ({tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, attive:att, celle:[
  {n:"X", t:"Emorragia esterna **massiva**", key:k===0},
  {n:"A", t:"Vie aeree e **rachide** cervicale"},
  {n:"B", t:"**Respiro**"},
  {n:"C", t:"**Circolo**: lo shock"},
  {n:"D", t:"**Neurologico**"},
  {n:"E", t:"**Esposizione** e temperatura"}]});

const SEGNI_B = (sop) => ({tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:sop, celle:[
  {n:"1", t:"**Dispnea**"}, {n:"2", t:"**Desaturazione**"}, {n:"3", t:"Murmure **assente** da un lato", key:true},
  {n:"4", t:"Trachea **deviata** dalla parte opposta"}, {n:"5", t:"Giugulari **turgide**"}, {n:"6", t:"**Ipotensione**"}]});

const RISPOSTA = (att) => ({tipo:"memo", tema:"chiaro", attive:att, voci:[
  "**Chi è**: tourniquet su un arto, pneumotorace iperteso, shock emorragico, bacino instabile, ipotermia · **XABCDE** in équipe",
  "Tourniquet verificato, **non** allentato · l'ora comunicata · rachide protetto",
  "Decompressione e **drenaggio** toracico",
  "Due accessi di grosso calibro · prelievi con gruppo · eco-FAST · **fascia pelvica**",
  "Emocomponenti **bilanciati** · acido tranexamico entro 3 ore · liquidi riscaldati",
  "GCS, pupille, glicemia · **ipotermia** · niente catetere · trasferimento · **SBAR** · familiari"]});

const COLLEGAMENTI = (att) => ({tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, attive:att, celle:[
  {n:"3.4", t:"**Sondino** naso-gastrico"}, {n:"3.6", t:"**Catetere** vescicale"},
  {n:"6.6", t:"**Trasfusione**"}, {n:"7.7", t:"**Drenaggio** toracico"},
  {n:"10.3", t:"Le **4 I e 4 T**"}, {n:"10.7", t:"**Trauma** e XABCDE"},
  {n:"13.3", t:"La **rete trauma** veneta"}]});

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 16 · Casi clinici avanzati",
  titolo:"Il politrauma", sottotitolo:"16.6 · XABCDE in équipe, dall'arrivo alla sala operatoria",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", sopratitolo:"Micro-lezione 6 di 12 · l'approccio della lezione 10.7 · più lesioni, ognuna potenzialmente mortale", ...XABCDE([0,1,2,3,4,5], 0)},
{id:"s03", tipo:"percorso", tema:"chiaro", sopratitolo:"Un'équipe, nell'ordine giusto · e i dettagli tecnici che i concorsi chiedono", tappe:[
  {t:"Pronto Soccorso", d:"l'arrivo"},
  {t:"Sala emergenza", d:"XABCDE", key:true},
  {t:"Sala operatoria", d:"o angiografia"}]},

{id:"s04", tipo:"cifre", tema:"chiaro", sopratitolo:"Lo scenario · centralizzato dal 118 al centro traumi", voci:[
  {n:"23:10", t:"l'ora", d:"di notte, in Pronto Soccorso"},
  {n:"32", suf:"anni", t:"incidente in moto", d:"ad alta velocità", key:true}]},
{id:"s05", tipo:"icone", tema:"chiaro", sopratitolo:"Sul posto · all'arrivo è agitato, risponde a tono a fatica", voci:[
  {icona:"orologio", t:"Tourniquet alla coscia destra", d:"alle 22:35", key:true},
  {icona:"scudo", t:"Collare cervicale"},
  {icona:"telo", t:"Tavola spinale"}]},
{id:"s06", tipo:"cifre", tema:"chiaro", sopratitolo:"Murmure assente a sinistra · trachea deviata a destra · giugulari turgide", voci:[
  {n:"34", t:"FR"}, {n:"86", suf:"%", t:"SpO₂", d:"con l'ossigeno"},
  {n:"78/50", t:"PA", key:true}, {n:"142", t:"FC"}]},
{id:"s07", tipo:"pausa", tema:"chiaro", sopratitolo:"E ancora", es:"Ore 23:10",
  testo:"Con quale **ordine** affronti questi problemi?",
  dati:["bacino doloroso", "sangue al meato uretrale", "T 35,2 °C"]},

{id:"s08", tipo:"tre", tema:"chiaro", sopratitolo:"X · l'emorragia esterna massiva · il tourniquet è efficace?", box:[
  {n:"1", t:"Nessun sanguinamento", d:"dalla ferita"},
  {n:"2", t:"Polso distale assente"},
  {n:"Mai", t:"Allentarlo", key:true}]},
{id:"s09", tipo:"scadenza", tema:"chiaro", sopratitolo:"L'ora di applicazione si annota e si comunica a tutta l'équipe",
  max:40, inizio:"sul posto", fine:"in sala emergenza", banda:[5,40], tappe:[
   {a:5, v:"22:35", t:"il **tourniquet**: da qui l'arto è senza circolazione", key:true},
   {a:40, v:"23:10", t:"l'arrivo"}]},

{id:"s10", tipo:"tre", tema:"chiaro", sopratitolo:"A · le vie aeree", box:[
  {n:"A", t:"Vie aeree pervie", d:"il paziente parla"},
  {n:"+", t:"Rachide cervicale", d:"collare mantenuto · movimenti in asse", key:true}]},
{id:"s11", ...SEGNI_B("B · pneumotorace iperteso, una delle quattro T della lezione 10.3")},
{id:"s12", tipo:"figura", tema:"chiaro", illu:"polmoni", sopratitolo:"L'aria accumulata nel torace comprime il polmone e il cuore",
  titolo:"Decompressione **immediata**, poi drenaggio toracico.", sotto:"La esegue il medico · il drenaggio con le regole della lezione 7.7."},
{id:"s13", tipo:"tre", tema:"chiaro", sopratitolo:"L'infermiere · la risposta deve essere rapida", box:[
  {n:"Prepara", t:"Il materiale"},
  {n:"Sorveglia", t:"La saturazione", key:true},
  {n:"Sorveglia", t:"La pressione"}]},

{id:"s14", tipo:"cifre", tema:"chiaro", sopratitolo:"C · dopo il drenaggio · lo shock emorragico persiste", voci:[
  {n:"95", suf:"%", t:"SpO₂", d:"sale"},
  {n:"84/52", t:"PA", d:"resta bassa", key:true},
  {n:"136", t:"FC"}]},
{id:"s15", tipo:"corpo", tema:"chiaro", sopratitolo:"Dove sanguina? · in sala emergenza l'ecografia FAST cerca sangue libero", lato:"fronte", voci:[
  {z:"torace", t:"Torace"},
  {z:"addome", t:"**Addome**", key:true},
  {z:"perineo", t:"**Bacino**", key:true},
  {z:"gambe", t:"Ossa lunghe"}]},
{id:"s16", tipo:"catena", tema:"chiaro", sopratitolo:"Poi due accessi di grosso calibro, o intraosseo · prelievi con il gruppo", passi:[
  {t:"Bacino doloroso e **instabile**"},
  {t:"**Fascia pelvica**", d:"all'altezza dei grandi trocanteri", key:true},
  {t:"Chiude l'**anello pelvico**", d:"e riduce il sanguinamento"}]},

{id:"s17", tipo:"icone", tema:"chiaro", sopratitolo:"Protocollo di trasfusione massiva · si perde sangue intero, non solo globuli rossi", voci:[
  {icona:"sacca", t:"Emazie"}, {icona:"sacca", t:"Plasma"}, {icona:"sacca", t:"Piastrine"},
  {icona:"bilancia", t:"In rapporto bilanciato", key:true}]},
{id:"s18", tipo:"scadenza", tema:"chiaro", sopratitolo:"Emocomponenti e liquidi riscaldati · l'acido tranexamico riduce la dissoluzione del coagulo",
  max:4, inizio:"il trauma", fine:"", banda:[0,3], tappe:[
   {a:0, v:"subito", t:"il prima possibile"},
   {a:3, v:"3 ore", t:"acido tranexamico **entro** tre ore dal trauma", key:true}]},
{id:"s19", tipo:"frase", tema:"chiaro", sopratitolo:"Cristalloidi con cautela: diluiscono i fattori della coagulazione",
  testo:"Un solo obiettivo: il **controllo dell'emorragia**.", sotto:"Rapidamente, in sala operatoria o in angiografia."},

{id:"s20", tipo:"colonne", tema:"chiaro", sopratitolo:"D ed E", colonne:[
  {h:"D", voci:[{t:"**GCS 13** · pupille · segni di lato"}, {t:"**Glicemia**"}, {t:"Sorveglianza neurologica ravvicinata", d:"possibile trauma cranico"}]},
  {h:"E", key:true, voci:[{t:"**Esposizione** completa"}, {t:"Lesioni nascoste"}, {t:"**Log roll**", d:"con il controllo del rachide"}]}]},
{id:"s21", tipo:"icone", tema:"chiaro", sopratitolo:"L'ipotermia · 35,2 °C in un traumatizzato non sono un dettaglio", voci:[
  {icona:"camice", t:"Via gli indumenti bagnati"},
  {icona:"telo", t:"Coperte termiche"},
  {icona:"termometro", t:"Riscaldamento attivo", key:true},
  {icona:"flebo", t:"Liquidi caldi"},
  {icona:"casa", t:"Ambiente caldo"}]},

{id:"s22", tipo:"triade", tema:"chiaro", sopratitolo:"Approfondimento · la triade letale del trauma", centro:"Triade letale", nodi:[
  {t:"Ipotermia", d:"altera la coagulazione"},
  {t:"Acidosi", d:"da ipoperfusione: coagulazione e cuore"},
  {t:"Coagulopatia", d:"più sanguinamento", key:true}]},
{id:"s23", tipo:"catena", tema:"chiaro", sopratitolo:"Un circolo vizioso · uccide anche quando le singole lesioni sarebbero trattabili", passi:[
  {t:"**Coagulopatia**"}, {t:"Più **sanguinamento**"}, {t:"Più **shock**"},
  {t:"Più **acidosi** e ipotermia", d:"e di nuovo più coagulopatia", key:true}]},
{id:"s24", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Il circolo si interrompe con", celle:[
  {t:"Controllo **rapido** dell'emorragia"}, {t:"Emocomponenti **bilanciati**"},
  {t:"**Riscaldamento**"}, {t:"**Damage control**: in sala solo sanguinamento e contaminazione", key:true}]},
{id:"s25", tipo:"percorso", tema:"chiaro", sopratitolo:"Damage control · un grado di temperatura, qui, è un intervento salvavita", tappe:[
  {t:"Sala", d:"fermare sanguinamento e contaminazione"},
  {t:"Terapia intensiva", d:"si corregge il paziente", key:true},
  {t:"Dopo", d:"l'intervento definitivo"}]},

{id:"s26", tipo:"frase", tema:"chiaro", sopratitolo:"Due dettagli tecnici che i concorsi amano",
  testo:"Due dispositivi da **non** posizionare.", sotto:"Il primo: il catetere vescicale."},
{id:"s27", tipo:"catena", tema:"chiaro", sopratitolo:"Il catetere vescicale", passi:[
  {t:"Sangue al **meato uretrale**", d:"ematoma perineale · frattura del bacino"},
  {t:"Sospetta lesione dell'**uretra**"},
  {t:"**Niente catetere**", d:"senza una valutazione specialistica", key:true}]},
{id:"s28", tipo:"frase", tema:"chiaro", sopratitolo:"Perché",
  testo:"Potrebbe trasformare una lesione **parziale** in **completa**.", sotto:"Il secondo: il sondino naso-gastrico, se si sospetta una frattura della base cranica."},
{id:"s29", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Sospetta frattura della base cranica · via nasale no · eventualmente oro-gastrica (lezione 3.4)", celle:[
  {n:"1", t:"Liquido dal **naso**"}, {n:"2", t:"Liquido dalle **orecchie**"},
  {n:"3", t:"Ecchimosi **intorno agli occhi**"}, {n:"4", t:"Ecchimosi **dietro le orecchie**"}]},

{id:"s30", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Il trasferimento · in sala operatoria o in angiografia", celle:[
  {t:"**Monitor**"}, {t:"**Defibrillatore**"}, {t:"**Ossigeno**"}, {t:"**Emocomponenti** in corso"},
  {t:"**Drenaggio toracico**: mai clampato nel trasporto (lezione 7.7)", key:true}]},
{id:"s31", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"Le consegne SBAR · nel trauma la documentazione dei tempi è parte della cura", celle:[
  {t:"La **dinamica**"}, {t:"L'**ora del tourniquet**", key:true}, {t:"Gli **interventi** eseguiti"},
  {t:"Emocomponenti e farmaci, **con gli orari**"}, {t:"I **parametri**"}, {t:"La **temperatura**"}]},

{id:"s32", tipo:"icone", tema:"chiaro", sopratitolo:"La famiglia · la cosa più difficile è restare senza notizie", voci:[
  {icona:"persona", t:"Un operatore dedicato", key:true},
  {icona:"casa", t:"Un luogo riservato"},
  {icona:"dialogo", t:"Informazioni dal medico"}]},
{id:"s33", tipo:"tre", tema:"chiaro", sopratitolo:"E l'équipe · lo stress fa parte del lavoro in emergenza", box:[
  {n:"Effetti personali", t:"Inventario e custodia"},
  {n:"Dopo l'evento", t:"Un breve debriefing", d:"per migliorare e gestire lo stress", key:true}]},

{id:"s34", tipo:"tabella", tema:"chiaro", sopratitolo:"Gli errori da evitare · X, B e C", colonne:["55%","45%"],
  intestazioni:["Errore", "Invece"], righe:[
  ["no:Allentare il tourniquet «per controllare»", "**mai**"],
  ["no:Non annotarne l'ora", "ora **annotata** e comunicata"],
  ["no:Aspettare la radiografia per lo pneumotorace iperteso", "diagnosi **clinica**"],
  ["no:Dimenticare il bacino", "**fascia pelvica**"]], chiave:[2]},
{id:"s35", tipo:"tabella", tema:"chiaro", sopratitolo:"Gli errori da evitare · liquidi, temperatura, dispositivi", colonne:["55%","45%"],
  intestazioni:["Errore", "Invece"], righe:[
  ["no:Molti cristalloidi freddi", "con cautela, **riscaldati**"],
  ["no:Trascurare l'ipotermia", "**riscaldamento** attivo"],
  ["no:Catetere con sangue al meato", "valutazione **specialistica**"],
  ["no:SNG nasale con sospetta frattura della base cranica", "eventualmente **oro-gastrico**"]], chiave:[1]},

{id:"s36", sopratitolo:"D1 · «Che cosa significa XABCDE, e perché la X viene prima della A?»", ...XABCDE([0,1,2,3,4,5], 0)},
{id:"s37", tipo:"frase", tema:"chiaro", sopratitolo:"D1 · prima ancora di un problema delle vie aeree · poi D2",
  testo:"Un'emorragia massiva uccide **in pochi minuti**.", sotto:"D2 · «Quali sono i segni dello pneumotorace iperteso?»"},
{id:"s38", ...SEGNI_B("D2 · si tratta con la decompressione immediata")},
{id:"s39", tipo:"confronto", tema:"chiaro", sopratitolo:"D3 · «Quando non si posizionano catetere o sondino?»", col:[
  {h:"Catetere vescicale", t:"**no** con sangue al meato uretrale o sospetta lesione dell'uretra"},
  {h:"Sondino nasale", t:"**no** con sospetta frattura della base cranica"}]},

{id:"s40", sopratitolo:"La risposta modello, in 15 righe", ...RISPOSTA([0])},
{id:"s41", sopratitolo:"La risposta modello · X, A e B", ...RISPOSTA([0,1,2])},
{id:"s42", sopratitolo:"La risposta modello · C", ...RISPOSTA([0,1,2,3,4])},
{id:"s43", sopratitolo:"La risposta modello · D, E e il trasferimento", ...RISPOSTA([0,1,2,3,4,5])},

{id:"s44", sopratitolo:"I collegamenti", ...COLLEGAMENTI([0,1,2,3])},
{id:"s45", sopratitolo:"I collegamenti", ...COLLEGAMENTI([0,1,2,3,4,5,6])},

{id:"s46", tipo:"tre", tema:"chiaro", sopratitolo:"Il lavoro in équipe · il trauma team si organizza prima dell'arrivo", box:[
  {n:"1", t:"Un leader e ruoli assegnati", d:"grazie alla pre-allerta del 118", key:true},
  {n:"2", t:"Comunicazione a ciclo chiuso"},
  {n:"3", t:"Un infermiere registra", d:"tempi e interventi"}]},
{id:"s47", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"Il materiale già pronto · la preparazione vale quanto l'esecuzione", celle:[
  {t:"**Emocomponenti**"}, {t:"**Riscaldatori**"}, {t:"**Fascia pelvica**", key:true},
  {t:"Set per il **drenaggio**"}, {t:"Dispositivo **intraosseo**"}]},

{id:"s48", tipo:"titolo", tema:"profondo",
  titolo:"L'ordine delle priorità<br>salva la vita<br>più della **velocità**.",
  sotto:"Nel trauma · la frase del caso"},

{id:"s49", tipo:"tre", tema:"chiaro", sopratitolo:"Nella prossima lezione · un grande ustionato", box:[
  {n:"1", t:"Parkland", d:"il calcolo dei liquidi"},
  {n:"2", t:"Una trappola", d:"sugli orari", key:true},
  {n:"3", t:"Le vie aeree", d:"che si chiudono"}]},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione · 16.7",
  titolo:"Il grande<br>ustionato", sottotitolo:"Parkland, gli orari e le vie aeree",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
