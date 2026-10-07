// Contenuto delle 50 scene della lezione 14.7 — semeiotica infermieristica ed esami.
// Le quattro tecniche sono un «tre» a quattro caselle che si accende; l'ordine
// dell'addome un percorso; i valori di laboratorio cifre e tabelle (sempre
// «indicativi», come chiede lo script); la preparazione al contrasto iodato e la
// procedura del valore critico due percorsi; la risonanza una raggiera di oggetti
// che il magnete trasforma in proiettili.

const TECNICHE = (att, k) => ({tipo:"tre", tema:"chiaro", box:[
  {n:"1", t:"Ispezione", d:"guardare", key:k===0},
  {n:"2", t:"Palpazione", d:"temperatura, consistenza, dolore, polsi", key:k===1},
  {n:"3", t:"Percussione", d:"**timpanico** = aria · **ottuso** = liquido o solido", key:k===2},
  {n:"4", t:"Auscultazione", d:"con il **fonendoscopio**", key:k===3}], attive:att});

const ADDOME = att => ({tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, celle:[
  {n:"1", t:"**Ispezione** · distensione, cicatrici, stomie"},
  {n:"2", t:"**Auscultazione** · rumori assenti = ileo · metallici = occlusione"},
  {n:"3", t:"**Percussione** · timpanismo (gas) · ottusità (liquidi, globo vescicale)"},
  {n:"4", t:"**Palpazione** · dolore e difesa"}], attive:att});

const CRITICO = (att, k) => ({tipo:"percorso", tema:"chiaro", tappe:[
  {t:"Registra", key:k===0},
  {t:"Ripete", d:"read-back · lezione 2.7", key:k===1},
  {t:"Avvisa subito", d:"il medico", key:k===2},
  {t:"Valuta", d:"il paziente", key:k===3},
  {t:"Documenta", key:k===4}], attive:att});

const IODATO = (att, k) => ({tipo:"percorso", tema:"chiaro", tappe:[
  {t:"Consenso", key:k===0},
  {t:"Reazioni e allergie", d:"premedicazione secondo protocollo", key:k===1},
  {t:"Funzione renale", d:"eGFR · rischio di danno renale", key:k===2},
  {t:"Idratazione", key:k===3},
  {t:"Metformina", d:"secondo protocollo", key:k===4},
  {t:"Accesso venoso", d:"adeguato all'iniettore", key:k===5}], attive:att});

const CASO = (att, k) => ({tipo:"tre", tema:"chiaro", box:[
  {n:"1", t:"Reazione precedente", d:"premedicazione o esame **alternativo**", key:k===0},
  {n:"2", t:"Funzione renale ridotta", d:"valutazione e **idratazione**", key:k===1},
  {n:"3", t:"Metformina", d:"da gestire **secondo protocollo**", key:k===2}], attive:att});

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 14 · Basi biomediche e semeiotica",
  titolo:"Semeiotica infermieristica<br>ed esami", sottotitolo:"14.7 · Segni e sintomi, esame obiettivo, esami di laboratorio, diagnostica per immagini",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"icone", tema:"chiaro", sopratitolo:"Micro-lezione 7 di 8 · l'arte di raccogliere segni e sintomi", voci:[
  {icona:"occhio", t:"Osservare"}, {icona:"mani", t:"Toccare"}, {icona:"stetoscopio", t:"Ascoltare"},
  {icona:"provetta", t:"Leggere un esame", d:"quando un valore richiede un'azione", key:true}]},
{id:"s03", tipo:"tre", tema:"chiaro", sopratitolo:"La diagnostica per immagini · l'infermiere garantisce la sicurezza", box:[
  {n:"1", t:"Preparare il paziente"}, {n:"2", t:"Mezzi di contrasto"}, {n:"3", t:"Risonanza magnetica", key:true}]},

{id:"s04", tipo:"confronto", tema:"chiaro", sopratitolo:"La prima distinzione", col:[
  {h:"Sintomo · soggettivo", t:"ciò che la persona **riferisce**: dolore, nausea, mancanza d'aria"},
  {h:"Segno · oggettivo", t:"ciò che l'operatore **rileva**"}]},
{id:"s05", tipo:"frase", tema:"chiaro", sopratitolo:"Segni: febbre, edema, ittero, tachicardia · si documentano entrambi",
  testo:"«Non riesco a respirare» **va scritto**, anche se la saturazione è buona.",
  sotto:"Le parole della persona hanno valore clinico."},

{id:"s06", sopratitolo:"Le quattro tecniche dell'esame obiettivo", ...TECNICHE([0,1], 1)},
{id:"s07", sopratitolo:"Le quattro tecniche dell'esame obiettivo", ...TECNICHE([0,1,2,3], 2)},
{id:"s08", tipo:"percorso", tema:"chiaro", sopratitolo:"Nell'addome l'ordine cambia", tappe:[
  {t:"Ispezione"}, {t:"Auscultazione", d:"prima di toccare", key:true}, {t:"Percussione"},
  {t:"Palpazione", d:"altera la peristalsi"}]},

{id:"s09", tipo:"confronto", tema:"chiaro", sopratitolo:"L'auscultazione del torace", col:[
  {h:"Murmure vescicolare", t:"il rumore **normale** del respiro"},
  {h:"Crepitii · rantoli fini", t:"**liquido negli alveoli**: edema polmonare, polmonite"}]},
{id:"s10", tipo:"tabella", tema:"chiaro", sopratitolo:"L'auscultazione del torace", colonne:["38%","62%"],
  intestazioni:["Reperto", "Fa pensare a"], righe:[
  ["**Sibili**", "vie aeree ristrette · broncospasmo"], ["**Ronchi**", "secrezioni nei bronchi"],
  ["**Sfregamento** pleurico", "—"], ["Murmure **ridotto o assente**", "versamento · pneumotorace · atelettasia"]], chiave:[3]},

{id:"s11", sopratitolo:"L'esame dell'addome", ...ADDOME([0,1])},
{id:"s12", sopratitolo:"L'esame dell'addome", ...ADDOME([0,1,2,3])},
{id:"s13", tipo:"norma", tema:"chiaro", etichetta:"Dolore al rilascio improvviso della pressione", sigla:"Blumberg",
  testo:"Indica un'**irritazione peritoneale**."},
{id:"s14", tipo:"confronto", tema:"chiaro", sopratitolo:"Altri due segni da conoscere", col:[
  {h:"Murphy", t:"dolore in inspirazione profonda palpando sotto l'arcata costale destra · **colecistite**"},
  {h:"Giordano", t:"dolore alla percussione lombare · **colica renale** o **pielonefrite**"}]},

{id:"s15", tipo:"tre", tema:"chiaro", sopratitolo:"Altri segni utili", box:[
  {n:"1", t:"Edema con fovea", d:"premendo resta un'**impronta**"},
  {n:"2", t:"Turgore ridotto", d:"disidratazione · poco affidabile nell'**anziano**"},
  {n:"3", t:"Mucose", d:"meglio guardare le mucose secche", key:true}]},
{id:"s16", tipo:"icone", tema:"chiaro", sopratitolo:"E ancora", voci:[
  {icona:"orologio", t:"Riempimento capillare"}, {icona:"occhio", t:"Cute", d:"colorito, temperatura, integrità"},
  {icona:"cuore", t:"Giugulari turgide", d:"scompenso destro", key:true}, {icona:"persona", t:"Stato di coscienza"}]},

{id:"s17", tipo:"frase", tema:"chiaro", sopratitolo:"Gli esami di laboratorio · i valori cambiano fra laboratori",
  testo:"Valori **indicativi**: fa sempre fede l'intervallo **riportato sul referto**."},
{id:"s18", tipo:"tabella", tema:"chiaro", sopratitolo:"L'emocromo · valori indicativi nell'adulto", colonne:["50%","50%"],
  intestazioni:["Esame", "Valore indicativo"], righe:[
  ["Emoglobina · uomo", "~13–17 g/dl"], ["Emoglobina · donna", "~12–16 g/dl"],
  ["Globuli bianchi", "~4.000–10.000/mm³"]], chiave:[2]},
{id:"s19", tipo:"cifre", tema:"chiaro", sopratitolo:"Neutrofili · e le piastrine: ~150.000–450.000/mm³", voci:[
  {n:"< 1.500", t:"Neutrofili", d:"neutropenia"},
  {n:"< 500", t:"Neutrofili", d:"neutropenia **grave** · lezione 8.7", key:true}]},

{id:"s20", tipo:"cifre", tema:"chiaro", sopratitolo:"Gli elettroliti · valori indicativi", voci:[
  {n:"135–145", t:"Sodio", d:"mEq/L"},
  {n:"3,5–5,0", t:"Potassio", d:"mEq/L · soglie di pericolo: lezione 3.5", key:true}]},
{id:"s21", tipo:"cifre", tema:"chiaro", sopratitolo:"Calcio e glicemia · valori indicativi", voci:[
  {n:"8,5–10,5", t:"Calcio totale", d:"mg/dl · da correggere per l'albumina"},
  {n:"70–99", t:"Glicemia a digiuno", d:"mg/dl", key:true}]},
{id:"s22", tipo:"tre", tema:"chiaro", sopratitolo:"La funzione renale", box:[
  {n:"1", t:"Creatinina", d:"~0,6–1,2 mg/dl · dipende dalla **massa muscolare**"},
  {n:"2", t:"GFR stimato", d:"da affiancare alla creatinina", key:true},
  {n:"3", t:"Azotemia", d:"urea"}]},

{id:"s23", tipo:"tabella", tema:"chiaro", sopratitolo:"La coagulazione · valori indicativi", colonne:["50%","50%"],
  intestazioni:["Esame", "Valore indicativo"], righe:[
  ["INR", "~0,8–1,2"], ["INR in terapia con **warfarin**", "di norma **2–3**"],
  ["aPTT", "~25–35 secondi"]], chiave:[1]},
{id:"s24", tipo:"tre", tema:"chiaro", sopratitolo:"Fegato e infiammazione", box:[
  {n:"1", t:"Albumina", d:"~3,5–5 g/dl"}, {n:"2", t:"Bilirubina totale", d:"< ~1,2 mg/dl"},
  {n:"3", t:"PCR", d:"proteina C reattiva: **aumenta** nell'infiammazione", key:true}]},
{id:"s25", tipo:"confronto", tema:"chiaro", sopratitolo:"Lattati e troponina", col:[
  {h:"Lattati", t:"< **2** mmol/L", grande:true},
  {h:"Troponina", t:"soglie secondo il **metodo del laboratorio**"}]},
{id:"s26", tipo:"tabella", tema:"chiaro", sopratitolo:"L'emogas · valori indicativi", colonne:["50%","50%"],
  intestazioni:["Parametro", "Valore indicativo"], righe:[
  ["pH", "**7,35–7,45**"], ["PaCO₂", "35–45"], ["PaO₂", "~80–100"], ["HCO₃⁻ · bicarbonato", "22–26"]], chiave:[0]},

{id:"s27", tipo:"frase", tema:"chiaro", sopratitolo:"Il valore critico · o «di panico»",
  testo:"Un risultato che indica un **pericolo immediato** per il paziente.",
  sotto:"Potassio molto alto o basso · glicemia molto bassa · emoglobina crollata"},
{id:"s28", sopratitolo:"Comunicato dal laboratorio, spesso per telefono", ...CRITICO([0,1], 1)},
{id:"s29", sopratitolo:"Prima di tutto: campione alterato? Es. emolisi", ...CRITICO([0,1,2,3,4], 2)},

{id:"s30", tipo:"griglia", tema:"chiaro", colonne:4, spunta:false, sopratitolo:"L'esame delle urine", celle:[
  {n:"·", t:"Aspetto e **colore**"}, {n:"·", t:"**Peso specifico** · concentrazione"}, {n:"·", t:"**pH**"}, {n:"·", t:"**Proteine**"},
  {n:"·", t:"**Glucosio**"}, {n:"·", t:"**Chetoni** · la chetoacidosi"}, {n:"·", t:"**Sangue**"}]},
{id:"s31", tipo:"trappola", tema:"chiaro", sopratitolo:"Nitriti e leucociti suggeriscono un'infezione", righe:[
  {sb:"Urinocoltura dalla sacca", ok:"Dal **raccordo** del catetere, **mai** dalla sacca · lezione 6.7"},
  {sb:"Trattare la batteriuria asintomatica", ok:"Nel cateterizzato, di norma, **non si tratta**"}]},

{id:"s32", tipo:"catena", tema:"chiaro", sopratitolo:"Radiografia e TC · radiazioni ionizzanti", passi:[
  {t:"Donna in **età fertile**"}, {t:"Chiedere sempre di una possibile **gravidanza**", key:true}, {t:"Regole di **radioprotezione**"}]},
{id:"s33", tipo:"confronto", tema:"chiaro", sopratitolo:"Due mezzi di contrasto diversi", col:[
  {h:"TC", t:"spesso con contrasto **iodato**"},
  {h:"Risonanza magnetica", t:"**nessuna** radiazione · campo magnetico **sempre attivo** · contrasto al **gadolinio**"}]},
{id:"s34", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"E ancora", celle:[
  {n:"·", t:"**Ecografia** · ultrasuoni, nessuna radiazione"},
  {n:"·", t:"**Medicina nucleare** · radiofarmaci: scintigrafia e PET"}]},

{id:"s35", sopratitolo:"Il mezzo di contrasto iodato · prima", ...IODATO([0,1], 1)},
{id:"s36", sopratitolo:"Il mezzo di contrasto iodato · prima", ...IODATO([0,1,2,3,4,5], 2)},
{id:"s37", tipo:"icone", tema:"chiaro", sopratitolo:"Durante e dopo", voci:[
  {icona:"avviso", t:"Reazioni lievi", d:"calore, nausea, orticaria"},
  {icona:"siringa", t:"Anafilassi", d:"adrenalina · lezione 10.6", key:true},
  {icona:"goccia", t:"Stravaso", d:"nella sede di iniezione"}, {icona:"occhio", t:"Sorveglianza", d:"dopo l'esame"}]},

{id:"s38", tipo:"norma", tema:"chiaro", etichetta:"Il magnete è sempre attivo, anche senza esami", sigla:"RM",
  testo:"**Questionario** di sicurezza obbligatorio, per ogni paziente."},
{id:"s39", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"Le condizioni da verificare", celle:[
  {t:"**Pacemaker** e defibrillatori non compatibili"}, {t:"Clip vascolari **cerebrali**"}, {t:"Impianti **cocleari**"},
  {t:"**Neurostimolatori**"}, {t:"**Schegge** metalliche, soprattutto oculari"}, {t:"**Pompe**"}]},
{id:"s40", tipo:"raggiera", tema:"chiaro", sopratitolo:"Niente ferromagnetico in sala · effetto proiettile", centro:"Magnete",
  raggi:[{t:"Bombola", d:"di ossigeno", key:true},{t:"Barella"},{t:"Sedia", d:"a rotelle"},{t:"Pompa", d:"non compatibile"}]},
{id:"s41", tipo:"icone", tema:"chiaro", sopratitolo:"Solo dispositivi certificati come compatibili con la RM", voci:[
  {icona:"spunta", t:"Dispositivi compatibili", key:true}, {icona:"persona", t:"Claustrofobia"},
  {icona:"campana", t:"Rumore"}, {icona:"avviso", t:"Cerotti transdermici", d:"con metallo"},
  {icona:"persone", t:"Gravidanza", d:"valutazione"}]},
{id:"s42", tipo:"titolo", tema:"profondo",
  titolo:"Un attimo di distrazione<br>**può uccidere**.",
  sotto:"In risonanza magnetica il magnete è sempre attivo."},

{id:"s43", tipo:"confronto", tema:"chiaro", sopratitolo:"La preparazione agli altri esami", col:[
  {h:"Ecografia addome superiore", t:"**digiuno** · colecisti distesa, meno gas"},
  {h:"Ecografia pelvica", t:"**vescica piena** · finestra acustica"}]},
{id:"s44", tipo:"tre", tema:"chiaro", sopratitolo:"Medicina nucleare · le endoscopie: lezione 8.5", box:[
  {n:"1", t:"Secondo il radiofarmaco"}, {n:"2", t:"Idratazione", d:"spesso consigliata"},
  {n:"3", t:"Radioprotezione", d:"per un periodo, meno contatti ravvicinati con bambini e donne in gravidanza", key:true}]},

{id:"s45", tipo:"frase", tema:"chiaro", sopratitolo:"Il caso d'esame · che cosa fai?",
  testo:"Diabetico in **metformina**, eGFR **ridotto**, TC con contrasto: «anni fa» ebbe un'**orticaria** dopo un esame."},
{id:"s46", sopratitolo:"Tre segnalazioni a medico e radiologo, prima dell'esame", ...CASO([0,1], 1)},
{id:"s47", sopratitolo:"Poi: accesso adeguato e materiale per l'emergenza", ...CASO([0,1,2], 2)},

{id:"s48", tipo:"tabella", tema:"chiaro", sopratitolo:"La tabella", colonne:["26%","74%"],
  intestazioni:["Che cosa", "Da ricordare"], righe:[
  ["Esame obiettivo", "sintomo soggettivo, segno oggettivo · 4 tecniche, nell'addome **auscultazione prima**"],
  ["Torace e addome", "crepitii · sibili · ronchi · Blumberg · Murphy · Giordano"],
  ["Laboratorio", "Na 135–145 · K 3,5–5,0 · glicemia 70–99 · INR ~0,8–1,2 (TAO 2–3) · lattati < 2"],
  ["Valore critico", "**read-back** e avviso immediato"],
  ["Contrasto iodato", "allergie · rene · metformina"],
  ["Risonanza", "magnete **sempre attivo** · nessun ferromagnetico"]], chiave:[3]},

{id:"s49", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Nella prossima lezione · ricomponiamo il modulo 14", celle:[
  {n:"1", t:"Le **tabelle dei valori normali**"}, {n:"2", t:"I collegamenti fra **fisiologia** e **assistenza**"}]},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione · 14.8",
  titolo:"Riepilogo del Modulo 14<br>e autovalutazione", sottotitolo:"Le tabelle dei valori normali e i collegamenti fra fisiologia e assistenza",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
