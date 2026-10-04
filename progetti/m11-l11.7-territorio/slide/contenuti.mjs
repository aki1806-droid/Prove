// Contenuto delle 50 scene della lezione 11.7 — territorio e cure primarie.
// Gli standard del DM 77 sono scene «cifre» e una tabella finale; ADI e SAD
// un confronto; la continuità un percorso ospedale → COT → UVMD → setting.

const CONT = (att) => ({tipo:"percorso", tema:"chiaro", tappe:[
  {t:"Reparto", d:"valutazione precoce"}, {t:"COT", d:"segnalazione"}, {t:"UVMD", d:"se serve"},
  {t:"Setting", d:"ADI, OdC, CdS"}, {t:"IFeC", d:"presa in carico"}], attive:att});

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 11 · Setting assistenziali e ciclo di vita",
  titolo:"Territorio e<br>cure primarie", sottotitolo:"11.7 · Il DM 77/2022, gli standard, l'infermiere di famiglia, il sistema veneto",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"frase", tema:"chiaro", sopratitolo:"Micro-lezione 7 di 8 · il DM 77/2022 ha ridisegnato l'assistenza territoriale",
  testo:"Il futuro dell'assistenza si gioca **fuori dall'ospedale**."},
{id:"s03", tipo:"frase", tema:"chiaro", sopratitolo:"Una figura che riguarda direttamente chi si prepara a questo concorso",
  testo:"L'**infermiere di famiglia e comunità**."},
{id:"s04", tipo:"confronto", tema:"chiaro", sopratitolo:"Che cosa chiedono i concorsi", col:[
  {h:"In tutta Italia", t:"gli **standard**, con i numeri"}, {h:"In Veneto", t:"i **servizi** propri della regione", key:true}]},

{id:"s05", tipo:"norma", tema:"chiaro", etichetta:"Modelli e standard · Missione 6 del PNRR", sigla:"DM 77/2022",
  testo:"L'assistenza **territoriale** nel Servizio Sanitario Nazionale."},
{id:"s06", tipo:"griglia", tema:"chiaro", colonne:4, spunta:true, sopratitolo:"Gli obiettivi", celle:[
  {t:"**Prossimità**", key:true}, {t:"**Presa in carico**"}, {t:"Integrazione **socio-sanitaria**"}, {t:"**Continuità** ospedale-territorio"}]},
{id:"s07", tipo:"cifre", tema:"chiaro", sopratitolo:"Il distretto · l'articolazione organizzativa di riferimento · indicativamente", voci:[
  {n:"1", suf:"", d:"ogni 100.000 abitanti", key:true}]},

{id:"s08", tipo:"cifre", tema:"chiaro", sopratitolo:"La Casa della Comunità · prossimità · una hub, con case spoke collegate", voci:[
  {n:"40-50", suf:"mila", d:"abitanti per una hub", key:true}]},
{id:"s09", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Équipe multiprofessionali", celle:[
  {n:"·", t:"Medici di **medicina generale**"}, {n:"·", t:"**Pediatri**"}, {n:"·", t:"**Specialisti**"},
  {n:"·", t:"**Infermieri** di famiglia e comunità", key:true}, {n:"·", t:"Assistenti **sociali**"}]},
{id:"s10", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Che cosa ospita", celle:[
  {t:"**PUA**: punto unico di accesso", key:true}, {t:"Diagnostica **di base**"}, {t:"**Prevenzione**"}, {t:"Presa in carico della **cronicità**"}]},

{id:"s11", tipo:"cifre", tema:"chiaro", sopratitolo:"L'infermiere di famiglia e comunità · persona, famiglia, comunità", voci:[
  {n:"1", suf:"", d:"ogni 3.000 abitanti", key:true}]},
{id:"s12", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Non aspetta che la persona arrivi: la va a cercare", celle:[
  {n:"·", t:"In **ambulatorio**"}, {n:"·", t:"**A domicilio**", key:true}, {n:"·", t:"Nella **comunità**: scuole, associazioni, lavoro"}]},
{id:"s13", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"Con il medico di medicina generale e i servizi sociali, anche in telemedicina", celle:[
  {t:"**Prevenzione**, promozione"}, {t:"**Cronicità** e fragilità", key:true}, {t:"**Educazione** e self-care"}]},
{id:"s14", tipo:"frase", tema:"chiaro", sopratitolo:"La lezione precedente, applicata",
  testo:"L'allenatore della cronicità ha **un nome e uno standard**."},

{id:"s15", tipo:"cifre", tema:"chiaro", sopratitolo:"L'Ospedale di Comunità · ricovero breve della rete territoriale", voci:[
  {n:"20", suf:"", d:"posti letto ogni 100.000", key:true}]},
{id:"s16", tipo:"confronto", tema:"chiaro", sopratitolo:"A gestione prevalentemente infermieristica · responsabilità clinica di un medico", col:[
  {h:"Non ha bisogno", t:"dell'**ospedale**"}, {h:"Ma non può", t:"essere assistito **a casa**", key:true}]},
{id:"s17", tipo:"catena", tema:"chiaro", sopratitolo:"Anziano dimesso che recupera autonomia · riacutizzazione lieve", passi:[
  {t:"Degenza **breve**"}, {t:"Fino a circa **30 giorni**"}, {t:"Rientro **a domicilio**", key:true}]},

{id:"s18", tipo:"cifre", tema:"chiaro", sopratitolo:"Centrale Operativa Territoriale · le transizioni fra setting", voci:[
  {n:"1", suf:"", d:"COT ogni 100.000", key:true}]},
{id:"s19", tipo:"titolo", tema:"profondo",
  titolo:"La COT non cura:<br>**coordina**.",
  sotto:""},
{id:"s20", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"La dimissione protetta della lezione 9.7 la organizza la COT", celle:[
  {t:"Raccorda **servizi** e professionisti"}, {t:"**7 giorni su 7**"}, {t:"Soprattutto **infermieri**", key:true}]},

{id:"s21", tipo:"norma", tema:"chiaro", etichetta:"1 medico + 1 infermiere ogni 100.000", sigla:"UCA",
  testo:"Unità di Continuità Assistenziale: le situazioni **complesse**."},
{id:"s22", tipo:"trappola", tema:"chiaro", sopratitolo:"Il numero europeo armonizzato · cure mediche non urgenti", righe:[
  {sb:"112 e 118", ok:"**116117**: cure **non urgenti**"}]},
{id:"s23", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Obiettivo del DM: una quota importante degli over 65 a domicilio", celle:[
  {n:"·", t:"Rete delle **cure palliative**"}, {n:"·", t:"**Consultori** familiari"}, {n:"·", t:"Assistenza **domiciliare**", key:true}]},

{id:"s24", tipo:"norma", tema:"chiaro", etichetta:"Infermieri, medici, fisioterapisti, OSS", sigla:"ADI",
  testo:"Assistenza Domiciliare Integrata: prestazioni **sanitarie** a casa."},
{id:"s25", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"L'ADI", celle:[
  {t:"Piano assistenziale **individuale**"}, {t:"Livelli di **intensità**"}, {t:"Dell'**azienda sanitaria**", key:true}]},
{id:"s26", tipo:"confronto", tema:"chiaro", sopratitolo:"La persona fragile ha spesso bisogno di entrambi, integrati", col:[
  {h:"ADI", t:"**sanitaria** · azienda sanitaria"}, {h:"SAD", t:"**socio-assistenziale**: igiene, casa, pasti · i **Comuni**", key:true}]},

{id:"s27", tipo:"norma", tema:"chiaro", etichetta:"Unità di Valutazione Multidimensionale", sigla:"UVMD",
  testo:"MMG, medico del distretto, assistente sociale, **infermiere**."},
{id:"s28", tipo:"griglia", tema:"chiaro", colonne:4, spunta:false, sopratitolo:"La scheda SVaMA · la persona non autosufficiente", celle:[
  {n:"·", t:"**Sanitaria**"}, {n:"·", t:"**Cognitiva**"}, {n:"·", t:"**Funzionale**", key:true}, {n:"·", t:"**Sociale**"}]},
{id:"s29", tipo:"griglia", tema:"chiaro", colonne:4, spunta:false, sopratitolo:"Il progetto personalizzato · la porta d'accesso", celle:[
  {n:"→", t:"**ADI**"}, {n:"→", t:"Centri **diurni**"}, {n:"→", t:"Ricoveri di **sollievo**"}, {n:"→", t:"**Residenzialità**", key:true}]},

{id:"s30", tipo:"confronto", tema:"chiaro", sopratitolo:"Strutture residenziali per anziani non autosufficienti", col:[
  {h:"Altrove", t:"RSA"}, {h:"In Veneto", t:"**Centri di Servizi**", key:true}]},
{id:"s31", tipo:"catena", tema:"chiaro", sopratitolo:"L'accesso", passi:[
  {t:"Valutazione **UVMD**"}, {t:"**Impegnativa** di residenzialità"}, {t:"Quota **sanitaria**: Servizio Sanitario Regionale", key:true}]},
{id:"s32", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Strutture accreditate · vi lavorano molti infermieri", celle:[
  {n:"€", t:"Quota **alberghiera**: la persona o il Comune", key:true}, {n:"·", t:"Centri **diurni**"}, {n:"✓", t:"**Accreditate**"}]},

{id:"s33", tipo:"frase", tema:"chiaro", sopratitolo:"La continuità assistenziale · valutazione precoce in reparto, COT, UVMD se serve",
  testo:"La dimissione protetta, lezione 9.7, segue un **percorso**."},
{id:"s34", sopratitolo:"Casa con ADI, Ospedale di Comunità, riabilitazione, Centro di Servizi · la lettera", ...CONT([0,1,2,3,4])},
{id:"s35", tipo:"frase", tema:"chiaro", sopratitolo:"È nei vuoti che la persona fragile si perde, e torna in pronto soccorso",
  testo:"**Nessun vuoto** fra l'ospedale e la casa."},

{id:"s36", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Il caso · 79 anni, scompenso, vive con la moglie anziana", celle:[
  {n:"!", t:"Non fa più le **scale**"}, {n:"!", t:"Non si **lava** da solo"}, {n:"!", t:"La moglie **non riesce**", key:true}]},
{id:"s37", tipo:"frase", tema:"chiaro", sopratitolo:"Che cosa fai? Non il giorno della dimissione: appena il bisogno è chiaro",
  testo:"Dimissione **protetta**: attivi la **COT**."},
{id:"s38", tipo:"confronto", tema:"chiaro", sopratitolo:"L'UVMD valuta il percorso più adatto", col:[
  {h:"Ospedale di Comunità", t:"per **recuperare** autonomia"}, {h:"Oppure a casa", t:"**ADI**, ausili, **SAD** per l'igiene", key:true}]},
{id:"s39", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"E la moglie: anche lei è una persona fragile", celle:[
  {t:"**Lettera** infermieristica"}, {t:"Controllo del **peso**"}, {t:"**Infermiere di famiglia**", key:true}]},

{id:"s40", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Le competenze sul territorio · nessun medico nella stanza accanto", celle:[
  {t:"**Autonomia** decisionale", key:true}, {t:"Valutazione **multidimensionale**"}, {t:"Lavoro **in rete**"}, {t:"Educazione e **coaching**"}]},
{id:"s41", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Le competenze di tutto il corso, fuori dall'ospedale", celle:[
  {t:"**Dispositivi** e lesioni a domicilio"}, {t:"I bisogni della **comunità**"}, {t:"**Telemedicina**"}, {t:"**Fascicolo** sanitario elettronico", key:true}]},

{id:"s42", tipo:"cifre", tema:"chiaro", sopratitolo:"In Veneto · Case e Ospedali di Comunità, COT: DM 77 e PNRR in attuazione", voci:[
  {n:"9", suf:"", d:"ULSS, con i distretti", key:true}]},
{id:"s43", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Lo approfondiremo nel modulo 13", celle:[
  {n:"·", t:"Infermiere di **famiglia**"}, {n:"·", t:"**UVMD**, SVaMA, Centri di Servizi"}, {n:"·", t:"**Azienda Zero**", key:true}]},

{id:"s44", tipo:"tabella", tema:"chiaro", sopratitolo:"La tabella degli standard · DM 77/2022, Missione 6 del PNRR", colonne:["55%","45%"],
  intestazioni:["Che cosa", "Standard"], righe:[
  ["Distretto", "circa 1 ogni **100.000**"], ["Casa della Comunità hub", "1 ogni **40-50.000**"]], chiave:[]},
{id:"s45", tipo:"tabella", tema:"chiaro", sopratitolo:"La tabella degli standard", colonne:["55%","45%"],
  intestazioni:["Che cosa", "Standard"], righe:[
  ["Infermiere di famiglia e comunità", "1 ogni **3.000**"], ["Ospedale di Comunità", "**20 posti letto** ogni 100.000"], ["COT", "1 ogni **100.000**"]], chiave:[0]},
{id:"s46", tipo:"tabella", tema:"chiaro", sopratitolo:"La tabella degli standard · in Veneto: UVMD, SVaMA, Centri di Servizi", colonne:["55%","45%"],
  intestazioni:["Che cosa", "Standard"], righe:[
  ["UCA", "1 medico + 1 infermiere ogni **100.000**"], ["116117", "cure **non urgenti**"], ["ADI · SAD", "azienda sanitaria · **Comuni**"]], chiave:[]},
{id:"s47", tipo:"titolo", tema:"profondo",
  titolo:"La casa come<br>**primo luogo di cura**.",
  sotto:""},
{id:"s48", tipo:"confronto", tema:"chiaro", sopratitolo:"Lo spirito del DM 77", col:[
  {h:"L'ospedale", t:"essenziale per l'**acuzie**"}, {h:"La salute", t:"si costruisce **dove le persone vivono**", key:true}]},
{id:"s49", tipo:"frase", tema:"chiaro", sopratitolo:"Nella prossima lezione · per ogni persona e ogni bisogno: dove, e da chi",
  testo:"Il modulo 11 in una **mappa dei servizi**."},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione",
  titolo:"11.8<br>Riepilogo<br>del Modulo 11", sottotitolo:"La mappa dei servizi",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
