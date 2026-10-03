// Contenuto delle 50 scene della lezione 9.3 — anestesia e sorveglianza
// intraoperatoria. Nessun corpo nuovo: le tre componenti dell'anestesia
// generale sono un «tre», le fasi un percorso, i nervi a rischio una griglia,
// i momenti della conta un percorso, la triade del fuoco un «tre».

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 9 · Assistenza perioperatoria",
  titolo:"Anestesia e sorveglianza<br>intraoperatoria", sottotitolo:"9.3 · Posizionamento, normotermia, conta, elettrobisturi",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"frase", tema:"chiaro", sopratitolo:"Micro-lezione 3 di 8",
  testo:"In sala operatoria il paziente **non può proteggersi da solo**: non sente la postura scorretta, non si accorge del freddo, non sa se una garza è rimasta dentro."},
{id:"s03", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"La sicurezza intraoperatoria dipende dall'équipe · i quattro rischi che l'infermiere presidia", celle:[
  {n:"1", t:"**Posizionamento**", key:true}, {n:"2", t:"**Temperatura**"}, {n:"3", t:"**Conta**"}, {n:"4", t:"**Elettrobisturi**"}]},

{id:"s04", tipo:"tre", tema:"chiaro", sopratitolo:"L'anestesia generale · tre componenti", box:[
  {n:"1", t:"Ipnosi", d:"perdita di coscienza"}, {n:"2", t:"Analgesia", d:"niente dolore"}, {n:"3", t:"Miorisoluzione", d:"rilassamento muscolare, serve al chirurgo"}]},
{id:"s05", tipo:"frase", tema:"chiaro", sopratitolo:"La persona non respira autonomamente, o in modo insufficiente",
  testo:"Le vie aeree si gestiscono con un **presidio sopraglottico** o con l'**intubazione**."},
{id:"s06", tipo:"percorso", tema:"chiaro", sopratitolo:"Le tre fasi · le più delicate: la prima e l'ultima, l'infermiere di anestesia non lascia il paziente", tappe:[
  {t:"Induzione", d:"delicata", key:true}, {t:"Mantenimento", d:""}, {t:"Risveglio", d:"delicato", key:true}], attive:[0,2]},

{id:"s07", tipo:"confronto", tema:"chiaro", sopratitolo:"Le anestesie neuroassiali", col:[
  {h:"Spinale (subaracnoidea)", t:"anestetico nel **liquor**, puntura singola, effetto **rapido**", key:true}, {h:"Peridurale", t:"spazio **epidurale**, spesso con un **catetere** per l'analgesia postoperatoria"}]},
{id:"s08", tipo:"frase", tema:"chiaro", sopratitolo:"La peridurale",
  testo:"Il catetere resta in sede per l'**analgesia postoperatoria**."},
{id:"s09", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Gli effetti da sorvegliare · il blocco del simpatico dilata i vasi", celle:[
  {n:"↓", t:"**Ipotensione**", key:true}, {n:"↓", t:"**Bradicardia**"}, {n:"—", t:"**Blocco motorio** degli arti inferiori"}, {n:"!", t:"**Ritenzione urinaria**"}]},
{id:"s10", tipo:"confronto", tema:"chiaro", sopratitolo:"Dopo la spinale · la cefalea post-puntura: il segno che la distingue da un comune mal di testa", col:[
  {h:"In piedi", t:"**peggiora**", key:true}, {h:"Sdraiati", t:"**migliora**"}]},

{id:"s11", tipo:"griglia", tema:"chiaro", colonne:1, spunta:true, sopratitolo:"L'anestesia loco-regionale · blocca un nervo o un plesso, per esempio per un intervento al braccio", celle:[
  {t:"L'arto resta **insensibile anche per ore**: non sente traumi, pressione, calore", key:true}, {t:"Va **protetto**"}]},
{id:"s12", tipo:"trappola", tema:"chiaro", sopratitolo:"La sedazione · livelli diversi, monitoraggio di respiro e saturazione", righe:[
  {sb:"Una sedazione che si approfondisce senza che nessuno la guardi", ok:"Diventa un'**anestesia generale senza vie aeree protette**"}]},
{id:"s13", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Un segnale d'allarme · la tossicità da anestetici locali: va segnalata subito", celle:[
  {n:"1", t:"**Formicolio** intorno alla bocca", key:true}, {n:"2", t:"Sapore **metallico**"}, {n:"3", t:"**Agitazione**"}, {n:"4", t:"Fino a **convulsioni** e **aritmie**"}]},

{id:"s14", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"L'ipertermia maligna · rara ma chiesta: reazione su base genetica a certi anestetici", celle:[
  {n:"↑", t:"**CO₂ espirata**", key:true}, {n:"↑", t:"**Rigidità** muscolare"}, {n:"↑", t:"**Tachicardia**"}, {n:"↑", t:"Febbre altissima, **tardiva**"}]},
{id:"s15", tipo:"norma", tema:"chiaro", etichetta:"L'antidoto", sigla:"Dantrolene",
  testo:"Deve essere **disponibile nel blocco operatorio**. Nell'accertamento si chiede sempre se ci sono stati **problemi con l'anestesia in famiglia**."},

{id:"s16", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Il posizionamento · le posizioni dipendono dall'intervento", celle:[
  {n:"1", t:"Supina"}, {n:"2", t:"Prona"}, {n:"3", t:"Laterale"}, {n:"4", t:"**Litotomica**", key:true}, {n:"5", t:"Trendelenburg"}, {n:"6", t:"Seduta"}]},
{id:"s17", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Quattro obiettivi", celle:[
  {t:"Consentire l'**accesso chirurgico**"}, {t:"Non ostacolare **ventilazione** e **circolazione**"}, {t:"Proteggere **cute, nervi, articolazioni**", key:true}, {t:"Proteggere gli **occhi**"}]},
{id:"s18", tipo:"trappola", tema:"chiaro", sopratitolo:"Si posiziona in équipe, con movimenti coordinati · il paziente anestetizzato non ha tono muscolare", righe:[
  {sb:"Un braccio lasciato cadere", ok:"È una **lussazione**: nessuna articolazione si protegge da sola"}]},

{id:"s19", tipo:"frase", tema:"chiaro", sopratitolo:"Le lesioni da pressione · il danno dei tessuti profondi della lezione 7.2",
  testo:"In un intervento lungo il danno **inizia in sala** e diventa visibile **giorni dopo**."},
{id:"s20", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"Le lesioni nervose · i tre nervi da ricordare", celle:[
  {n:"1", t:"**Ulnare**, al gomito"}, {n:"2", t:"**Peroneo comune**, alla testa del perone: posizione litotomica, **piede cadente**", key:true}, {n:"3", t:"**Plesso brachiale**: braccio abdotto **oltre i 90°**"}]},
{id:"s21", tipo:"griglia", tema:"chiaro", colonne:1, spunta:true, sopratitolo:"Gli occhi · attenzione particolare nella posizione prona", celle:[
  {t:"Si **chiudono** e si **proteggono**", key:true}, {t:"Supporti e **imbottiture**; il posizionamento si **registra**"}]},

{id:"s22", tipo:"catena", tema:"chiaro", sopratitolo:"La normotermia · l'ipotermia è frequente", passi:[
  {t:"L'anestesia abolisce la termoregolazione", key:true}, {t:"Sala fredda"}, {t:"Paziente scoperto"}, {t:"Liquidi a temperatura ambiente"}]},
{id:"s23", tipo:"cifre", tema:"chiaro", sopratitolo:"L'obiettivo · le conseguenze dell'ipotermia: più infezioni del sito, più sanguinamento, eventi cardiaci, brividi al risveglio", voci:[
  {n:"≥ 36", suf:"°C", d:"temperatura centrale", key:true}]},
{id:"s24", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"La prevenzione · parte del bundle della lezione 7.4", celle:[
  {t:"Riscaldamento attivo: **coperte ad aria forzata**", key:true}, {t:"**Liquidi riscaldati**"}, {t:"Coperture"}, {t:"**Monitoraggio** della temperatura"}]},
{id:"s25", tipo:"frase", tema:"chiaro", sopratitolo:"Il riscaldamento comincia prima dell'induzione",
  testo:"La caduta più rapida è nella **prima mezz'ora**: il calore del centro del corpo si ridistribuisce verso la periferia."},

{id:"s26", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"La conta · strumento della Raccomandazione 2", celle:[
  {t:"**Garze** e compresse", key:true}, {t:"**Aghi**"}, {t:"**Strumenti**"}]},
{id:"s27", tipo:"percorso", tema:"chiaro", sopratitolo:"Quando si conta", tappe:[
  {t:"Prima dell'inizio", d:""}, {t:"Prima di chiudere una cavità", d:"", key:true}, {t:"Alla chiusura della cute", d:""}, {t:"A ogni cambio di personale", d:""}], attive:[0,1,2,3]},
{id:"s28", tipo:"griglia", tema:"chiaro", colonne:1, spunta:true, sopratitolo:"Come si conta · le garze chirurgiche sono radiopache: visibili ai raggi X, per poterle ritrovare", celle:[
  {t:"**Ad alta voce**, da **due operatori**: strumentista e infermiere di sala", key:true}, {t:"E si **registra**"}]},

{id:"s29", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"E se la conta non torna?", celle:[
  {t:"Si **comunica subito** al chirurgo", key:true}, {t:"Si **sospende la chiusura**"}, {t:"Si **riconta**"}, {t:"Si cerca nel campo, nei rifiuti, nella sala"}]},
{id:"s30", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"Se il materiale non si trova · una garza dimenticata è un evento sentinella", celle:[
  {n:"RX", t:"**Radiografia intraoperatoria**", key:true}, {n:"→", t:"Si **documenta** e si **segnala**"}]},
{id:"s31", tipo:"titolo", tema:"profondo",
  titolo:"Il momento di fermarsi è<br>**prima** della chiusura, non dopo.",
  sotto:""},

{id:"s32", tipo:"frase", tema:"chiaro", sopratitolo:"L'elettrobisturi · taglia e coagula con la corrente",
  testo:"La corrente deve **rientrare** attraverso una **piastra neutra** applicata sul paziente, per esempio sulla coscia."},
{id:"s33", tipo:"confronto", tema:"chiaro", sopratitolo:"Dove va la piastra · e se ne controlla il contatto", col:[
  {h:"Sì", t:"area **muscolare**, ben vascolarizzata, **asciutta**, senza peli", key:true}, {h:"Lontano da", t:"**protesi metalliche**, elettrodi dell'ECG, prominenze ossee"}]},
{id:"s34", tipo:"trappola", tema:"chiaro", sopratitolo:"Pacemaker o defibrillatori impiantabili: protocollo specifico", righe:[
  {sb:"Un contatto insufficiente della piastra", ok:"**Concentra la corrente** e provoca **ustioni**"}]},

{id:"s35", tipo:"tre", tema:"chiaro", sopratitolo:"Il fuoco · in sala ci sono tutti e tre gli elementi della triade", box:[
  {n:"1", t:"Ossigeno", d:"comburente"}, {n:"2", t:"Combustibili", d:"teli, antisettici alcolici"}, {n:"3", t:"Innesco", d:"elettrobisturi, laser"}]},
{id:"s36", tipo:"trappola", tema:"chiaro", sopratitolo:"L'antisettico alcolico si lascia asciugare completamente prima dei teli", righe:[
  {sb:"Un telo posato su cute ancora bagnata", ok:"**Intrappola i vapori**: la prima scintilla li accende"}]},
{id:"s37", tipo:"frase", tema:"chiaro", sopratitolo:"Il campo sterile · qualunque contaminazione si segnala e il materiale si sostituisce",
  testo:"Segnalare una violazione dell'asepsi è un **dovere**, a qualunque livello gerarchico."},

{id:"s38", tipo:"griglia", tema:"chiaro", colonne:1, spunta:true, sopratitolo:"La tracciabilità · lezione 4.5", celle:[
  {t:"**Set sterili** e **dispositivi impiantati**: protesi, placche, viti", key:true}, {t:"Etichette in **cartella** e nel **registro operatorio**"}]},
{id:"s39", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"I campioni istologici · un campione perso o scambiato può significare una diagnosi mancata", celle:[
  {t:"**Identificazione** corretta", key:true}, {t:"Contenitore e **fissativo** adeguati"}, {t:"**Richiesta** compilata"}, {t:"Consegna **tracciata**"}]},

{id:"s40", tipo:"frase", tema:"chiaro", sopratitolo:"Il caso · posizione litotomica, quattro ore",
  testo:"Al risveglio il paziente **non riesce a sollevare la punta del piede destro**. Che cosa pensi?"},
{id:"s41", tipo:"figura", tema:"chiaro", illu:"piede",
  titolo:"Lesione del nervo peroneo comune",
  sotto:"compresso alla testa del perone dai supporti della litotomica"},
{id:"s42", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Che cosa fai?", celle:[
  {t:"**Segnali** al medico", key:true}, {t:"**Documenti** il deficit e il posizionamento intraoperatorio"}, {t:"Proteggi il piede, previeni le **cadute**"}, {t:"Si segnala come **evento**"}]},
{id:"s43", tipo:"frase", tema:"chiaro", sopratitolo:"La prevenzione era in sala",
  testo:"Imbottitura e controllo dei supporti, e un'occhiata alle gambe **a ogni ora** di intervento."},

{id:"s44", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"In Veneto", celle:[
  {n:"1", t:"**Procedure aziendali** su conta, posizionamento, normotermia ed elettrochirurgia", key:true}, {n:"2", t:"Tracciabilità **informatizzata** dei set e dei dispositivi"}]},
{id:"s45", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"In Veneto · all'orale: il collegamento con la check-list della lezione precedente", celle:[
  {n:"3", t:"**Formazione specifica** per l'infermiere di sala e lo strumentista", key:true}]},

{id:"s46", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Ricapitoliamo", celle:[
  {n:"3", t:"**Generale**: ipnosi, analgesia, miorisoluzione"}, {n:"→", t:"**Spinale**: ipotensione, ritenzione, cefalea che peggiora in piedi", key:true}, {n:"→", t:"**Peroneo** nella litotomica"}, {n:"90°", t:"**Plesso brachiale** oltre"}]},
{id:"s47", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Ricapitoliamo · se la conta non torna, non si chiude", celle:[
  {n:"36", t:"**°C**: la normotermia", key:true}, {n:"4", t:"**Momenti della conta**: inizio, cavità, cute, cambio di personale"}]},
{id:"s48", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Ricapitoliamo", celle:[
  {n:"→", t:"**Piastra neutra** su muscolo, lontano dal metallo", key:true}, {n:"→", t:"**Antisettico alcolico asciutto** prima dei teli"}]},
{id:"s49", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"Nella prossima lezione · il risveglio", celle:[
  {n:"1", t:"La **sala risveglio**"}, {n:"2", t:"I **criteri** per tornare in reparto", key:true}, {n:"3", t:"Le **prime ore** dopo l'intervento"}]},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione",
  titolo:"9.4<br>Il post-operatorio<br>immediato", sottotitolo:"Il risveglio",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
