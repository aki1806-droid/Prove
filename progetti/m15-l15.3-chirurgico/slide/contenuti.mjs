// Contenuto delle 50 scene della lezione 15.3 — il paziente chirurgico,
// giorno per giorno. Ogni giornata si apre con i suoi numeri (cifre) e si
// chiude con gli interventi in griglia; la caduta di pressione è un paio di
// barre, i presidi la sagoma, la linea del tempo un asse in scala delle
// giornate; il dolore come chiave una raggiera; la risposta modello un
// promemoria che si scrive riga per riga.

const ATEL = (att) => ({tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, attive:att, celle:[
  {t:"**Segnalare**"},
  {t:"**Analgesia efficace**: la peridurale, con l'anestesista"},
  {t:"Ossigeno · target **94–98%**"},
  {t:"Posizione **semiseduta**"},
  {t:"**Spirometro incentivante**: es. 10 respiri ogni ora da sveglio"},
  {t:"Tosse con il **cuscino** sull'addome"},
  {t:"**Mobilizzazione**: poltrona e cammino"}]});

const ILEO = (att) => ({tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, attive:att, celle:[
  {t:"SNG: **verifica del posizionamento** (lezione 3.4)"},
  {t:"Potassio secondo prescrizione: **mai in bolo**, diluito, con **pompa**"},
  {t:"**Bilancio idrico**, con le perdite dal sondino"},
  {t:"**Igiene del cavo orale**: bocca secca"},
  {t:"**Mobilizzazione**"},
  {t:"Revisione degli **oppioidi** con il medico"}]});

const EVISC = (att) => ({tipo:"griglia", tema:"chiaro", colonne:2, attive:att, celle:[
  {n:"1", t:"**Non lasci** il paziente, chiami aiuto"},
  {n:"2", t:"Supino, **ginocchia flesse**: meno tensione sulla parete"},
  {n:"3", t:"Telo o garze **sterili** con fisiologica **tiepida**"},
  {no:true, t:"**Non reinserire** i visceri"},
  {n:"4", t:"Il **chirurgo**, subito"},
  {n:"5", t:"Digiuno, parametri, accesso venoso"},
  {n:"6", t:"Rassicurare, **documentare**"}]});

const ERRORI = (att) => ({tipo:"griglia", tema:"tenue", colonne:2, attive:att, celle:[
  {no:true, t:"Dare la colpa alla **peridurale** senza guardare il drenaggio"},
  {no:true, t:"**Aspettare** il crollo della pressione"},
  {no:true, t:"A letto «perché ha dolore», invece di **trattare il dolore**"},
  {no:true, t:"Potassio **senza pompa**"},
  {no:true, t:"**Reinserire** i visceri, o coprirli **asciutti**"},
  {no:true, t:"Dimettere senza **teach-back**"}]});

const DOLORE = (att) => ({tipo:"raggiera", tema:"chiaro", centro:"Dolore", attive:att, raggi:[
  {t:"Atelettasia", key:true},
  {t:"Trombosi"},
  {t:"Ileo"},
  {t:"Tosse"},
  {t:"Ansia"}]});

const GIORNATE = (n, chiave) => ({tipo:"tabella", tema:"chiaro", colonne:["34%","66%"], chiave,
  intestazioni:["Quando", "Che cosa"], righe:[
  ["Prime ore", "**emorragia**, ostruzione delle vie aeree, ritenzione"],
  ["1ª–2ª giornata", "**atelettasia**"],
  ["3ª–5ª giornata", "polmonite, infezione urinaria"],
  ["5ª–10ª giornata", "infezione della ferita, **deiscenza**"],
  ["In ogni momento", "**trombosi**, più tipica dopo i primi giorni"]].slice(0, n)});

const RISPOSTA = (att) => ({tipo:"memo", tema:"chiaro", attive:att, voci:[
  "**Inquadramento**: 7ª giornata, colpo di tosse, essudato siero-ematico, anse esposte → **eviscerazione**",
  "**Priorità**: proteggere i visceri, prevenire shock e contaminazione, chirurgo subito",
  "Resto e chiamo aiuto · supino, ginocchia flesse · garze sterili con fisiologica tiepida · **non reinserisco**",
  "**SBAR** al chirurgo · digiuno, accesso venoso, parametri e dolore · preparo per la sala",
  "Rassicuro · documento e **segnalo** · rivaluto i rischi, sostegno della ferita"]});

const LEZIONI = [
  {n:"3.4", t:"Sondino", illu:"nex"},
  {n:"3.5", t:"Potassio", illu:"goccia"},
  {n:"5.7", t:"Potassio", illu:"fiala"},
  {n:"7.4", t:"Eviscerazione", illu:"ferita"},
  {n:"9.4", t:"Peridurale", illu:"pca"},
  {n:"9.5", t:"Complicanze", illu:"termometro"},
  {n:"9.7", t:"Dimissione", illu:"casa"},
  {n:"6.6", t:"Trasfusione", illu:"sacca"}];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 15 · Casi clinici integrati",
  titolo:"Il paziente chirurgico,<br>giorno per giorno", sottotitolo:"15.3 · Dall'intervento alla dimissione, una complicanza per giornata",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"frase", tema:"chiaro", sopratitolo:"Micro-lezione 3 di 12 · un paziente chirurgico per dieci giorni",
  testo:"Ogni giorno una **complicanza diversa**, proprio quando la lezione 9.5 diceva di aspettarla."},
{id:"s03", tipo:"numero", tema:"chiaro", sopratitolo:"«In seconda giornata», «in settima giornata»", cifra:"G2",
  testo:"Quel numero è già **metà della risposta**."},

{id:"s04", tipo:"figura", tema:"chiaro", illu:"letto", sopratitolo:"Lo scenario",
  titolo:"Signor Gallo, **67 anni**: emicolectomia destra.", sotto:"Per una neoplasia · percorso ERAS · rientra in reparto alle 16."},
{id:"s05", tipo:"corpo", tema:"chiaro", lato:"entrambi", sopratitolo:"Rientra con · profilassi antitrombotica prescritta", voci:[
  {z:"dorso", t:"Peridurale toracica", d:"in infusione", key:true},
  {z:"addome", t:"Drenaggio addominale"},
  {z:"perineo", t:"Catetere vescicale"},
  {z:"braccia", t:"Accesso venoso periferico"}]},
{id:"s06", tipo:"cifre", tema:"chiaro", sopratitolo:"All'arrivo · il riferimento per tutto quello che segue", voci:[
  {n:"138/80", t:"pressione", key:true}, {n:"84", t:"frequenza"},
  {n:"97", suf:"%", t:"SpO₂", d:"occhialini 2 L/min"}, {n:"2", t:"dolore (NRS)"}]},

{id:"s07", tipo:"cifre", tema:"chiaro", sopratitolo:"Giornata 0, ore 20 · pallido, sudato, agitato: «mi sento strano»", voci:[
  {n:"116", t:"frequenza", d:"era 84", key:true},
  {n:"102/64", t:"pressione", d:"era 138/80"}]},
{id:"s08", tipo:"pausa", tema:"chiaro", sopratitolo:"Giornata 0, ore 20", es:"pausa",
  testo:"Drenaggio: **280 ml di sangue rosso** nell'ultima ora. Addome più teso. Diuresi **20 ml**. Che cosa sta succedendo?",
  dati:["FC 116", "PA 102/64", "pallido e sudato", "peridurale in corso"]},

{id:"s09", tipo:"bivio", tema:"chiaro", sopratitolo:"Il trabocchetto · la peridurale può abbassare la pressione", radice:"Pressione in calo", rami:[
  {q:"blocco simpatico", t:"Ipotensione da peridurale", d:"di solito senza tachicardia marcata (a volte bradicardia), senza perdite di sangue", key:true},
  {q:"tachicardia, pallore, drenaggio ematico", t:"Emorragia", d:"tutti i segni presenti"}]},
{id:"s10", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Ci sono tutti · emorragia postoperatoria con shock iniziale", celle:[
  {t:"**Tachicardia**"}, {t:"**Pallore**, sudorazione"},
  {t:"**Agitazione**"}, {t:"**Oliguria**"},
  {t:"**Drenaggio ematico** abbondante"}, {t:"**Addome teso**"}]},
{id:"s11", tipo:"barre", tema:"chiaro", sopratitolo:"La pressione sembra accettabile, ma è scesa di oltre 35 · conta il trend",
  unita:"mmHg", etichetta:420, max:150, barre:[
   {et:"All'arrivo", v:138, nota:"il basale"},
   {et:"Ore 20", v:102, colore:"#D70328", nota:"− 36 rispetto al basale"}]},

{id:"s12", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Giornata 0 · le azioni", celle:[
  {t:"**Chirurgo**, subito, con lo SBAR"}, {t:"**Anestesista**, per la peridurale"},
  {t:"**Ossigeno**, posizione supina"}, {t:"**Secondo accesso** di grosso calibro"}]},
{id:"s13", tipo:"tre", tema:"chiaro", sopratitolo:"Giornata 0 · prelievi, liquidi, sorveglianza", box:[
  {n:"Prelievi", t:"Emocromo, coagulazione", d:"**gruppo** e prove crociate"},
  {n:"Secondo prescrizione", t:"Liquidi ed emocomponenti"},
  {n:"Ogni 15 minuti", t:"Parametri", d:"diuresi oraria · misura del drenaggio", key:true}]},
{id:"s14", tipo:"catena", tema:"chiaro", sopratitolo:"È probabile un reintervento", passi:[
  {t:"**Digiuno**"}, {t:"Trasferimento **in sala**"},
  {t:"Reintervento", d:"un vaso sanguinante suturato"}, {t:"Rientra **stabile**", key:true}]},

{id:"s15", tipo:"cifre", tema:"chiaro", sopratitolo:"Giornata 2", voci:[
  {n:"37,9", t:"°C", d:"febbricola"}, {n:"24", t:"FR"},
  {n:"91", suf:"%", t:"SpO₂ in aria", key:true}, {n:"7", t:"NRS alla tosse"}]},
{id:"s16", tipo:"citazione", tema:"chiaro", sopratitolo:"Respiro superficiale, murmure ridotto alle basi · che cosa pensi?",
  testo:"Non sono riuscito ad alzarmi, mi faceva **troppo male**.", fonte:"Il signor Gallo, in seconda giornata"},
{id:"s17", tipo:"catena", tema:"chiaro", sopratitolo:"Seconda giornata, polmone, immobilità e dolore · la W di wind (lezione 9.5)", passi:[
  {t:"**Dolore**", d:"il problema centrale", key:true},
  {t:"Niente respiro profondo", d:"né tosse, né alzarsi"},
  {t:"**Atelettasia**"}]},
{id:"s18", sopratitolo:"Giornata 2 · gli interventi", ...ATEL([0,1,2,3])},
{id:"s19", sopratitolo:"Obiettivo entro 24 ore: SpO₂ ≥ 94% in aria e NRS ≤ 4 alla tosse", ...ATEL([0,1,2,3,4,5,6])},

{id:"s20", tipo:"cifre", tema:"chiaro", sopratitolo:"Giornata 4 · addome disteso e timpanico, niente gas né feci, peristalsi assente", voci:[
  {n:"2", t:"episodi di vomito", d:"con nausea"},
  {n:"3,2", t:"mEq/L", d:"potassio", key:true}]},
{id:"s21", tipo:"tre", tema:"chiaro", sopratitolo:"Si segnala · digiuno e sondino naso-gastrico in aspirazione, secondo prescrizione", box:[
  {n:"K⁺ basso", t:"Ipokaliemia", d:"rallenta l'intestino"},
  {n:"+", t:"Oppioidi"},
  {n:"=", t:"Ileo paralitico", d:"**prolungato**", key:true}]},
{id:"s22", sopratitolo:"Giornata 4 · gli interventi", ...ILEO([0,1,2])},
{id:"s23", sopratitolo:"In due giorni l'intestino riparte", ...ILEO([0,1,2,3,4,5])},

{id:"s24", tipo:"figura", tema:"chiaro", illu:"ferita", sopratitolo:"Giornata 7 · dopo un forte colpo di tosse",
  titolo:"«Mi sento come se qualcosa **si fosse aperto**.»", sotto:"Liquido siero-ematico rosato dalla medicazione · anse intestinali fra i margini della ferita."},
{id:"s25", sopratitolo:"Deiscenza con eviscerazione: emergenza chirurgica · la sequenza della lezione 7.4", ...EVISC([0,1])},
{id:"s26", sopratitolo:"Deiscenza con eviscerazione · la sequenza", ...EVISC([0,1,2,3,4,5,6])},
{id:"s27", tipo:"frase", tema:"chiaro", sopratitolo:"Una riflessione",
  testo:"Il liquido siero-ematico abbondante era il **segno premonitore**.",
  sotto:"Se compare, si segnala prima che la ferita si apra."},

{id:"s28", tipo:"raggiera", tema:"chiaro", sopratitolo:"Perché proprio a lui · nutrizione probabilmente compromessa, anemia dopo l'emorragia, pressione addominale", centro:"Deiscenza", raggi:[
  {t:"Età"}, {t:"Neoplasia"}, {t:"Nutrizione"},
  {t:"Anemia"}, {t:"Tosse, vomito", key:true}]},
{id:"s29", tipo:"icone", tema:"chiaro", sopratitolo:"La prevenzione: gesti semplici · le complicanze si concatenano", voci:[
  {icona:"bicchiere", t:"Nutrizione"},
  {icona:"ferita", t:"Sostegno della ferita", d:"il cuscino quando tossisce o si alza", key:true},
  {icona:"stomaco", t:"Controllo della nausea"}]},

{id:"s30", tipo:"griglia", tema:"chiaro", colonne:1, spunta:true, sopratitolo:"Giornata 12 · la dimissione", celle:[
  {t:"Vive con la moglie, è autonomo: **dimissione ordinaria**"},
  {t:"Educazione: la **ferita**, i segni di **infezione** e di **deiscenza**", key:true}]},
{id:"s31", tipo:"icone", tema:"chiaro", sopratitolo:"Giornata 12 · l'educazione", voci:[
  {icona:"siringa", t:"Eparina a domicilio", d:"per la durata prescritta · tecnica e smaltimento degli aghi", key:true},
  {icona:"bicchiere", t:"Alimentazione", d:"progressiva"},
  {icona:"divieto", t:"Sforzi addominali", d:"niente, per il periodo indicato"}]},
{id:"s32", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Giornata 12 · e tutto verificato con il teach-back", celle:[
  {t:"**Segni d'allarme**: febbre, dolore in aumento, vomito, alvo chiuso, sanguinamento", key:true},
  {t:"**Follow-up** chirurgico e oncologico · Rete Oncologica Veneta"},
  {t:"**Lettera infermieristica**"},
  {t:"**Teach-back**"}]},

{id:"s33", tipo:"assetempo", tema:"chiaro", sopratitolo:"La linea del tempo del caso · giornate postoperatorie, in scala",
  da:0, a:12, tappe:[
  {anno:0, et:"emorragia → reintervento", key:true},
  {anno:2, et:"atelettasia"},
  {anno:4, et:"ileo, ipokaliemia"},
  {anno:7, et:"eviscerazione", key:true},
  {anno:12, et:"dimissione"}]},

{id:"s34", sopratitolo:"Gli errori da evitare", ...ERRORI([0,1])},
{id:"s35", sopratitolo:"Gli errori da evitare", ...ERRORI([0,1,2,3,4,5])},

{id:"s36", sopratitolo:"Il dolore, chiave del caso · respiro superficiale, paziente a letto, ileo più lungo", ...DOLORE([0,1,2])},
{id:"s37", sopratitolo:"Tosse inefficace, ansia e insonnia · si valuta a riposo e in movimento · analgesia multimodale", ...DOLORE([0,1,2,3,4])},
{id:"s38", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Con la peridurale si sorvegliano · e dopo ogni intervento si rivaluta", celle:[
  {t:"Livello di **analgesia**"}, {t:"**Blocco motorio**"},
  {t:"**Pressione**"}, {t:"**Sedazione**"}]},

{id:"s39", sopratitolo:"D1 · in quale giornata compaiono le complicanze?", ...GIORNATE(2, [0,1])},
{id:"s40", sopratitolo:"D1 · in quale giornata compaiono le complicanze?", ...GIORNATE(5, [2,3,4])},
{id:"s41", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"D2 · come si previene l'atelettasia?", celle:[
  {t:"Educazione **preoperatoria**"}, {t:"Analgesia **efficace**"},
  {t:"Respirazione profonda, **spirometro**"}, {t:"Tosse con la **ferita sostenuta**"},
  {t:"Posizione **semiseduta**"}, {t:"Mobilizzazione **precoce**"}]},
{id:"s42", tipo:"confronto", tema:"chiaro", sopratitolo:"D3 · i segni precoci di un'emorragia postoperatoria", col:[
  {h:"Precoci", t:"tachicardia, agitazione, pallore, sudorazione, riempimento capillare lento, oliguria, perdite dai drenaggi"},
  {h:"Tardivo", t:"l'**ipotensione**", grande:true}]},

{id:"s43", sopratitolo:"La risposta modello, giornata 7", ...RISPOSTA([0])},
{id:"s44", sopratitolo:"La risposta modello · priorità e sequenza", ...RISPOSTA([0,1,2])},
{id:"s45", sopratitolo:"La risposta modello · comunicazione e documentazione", ...RISPOSTA([0,1,2,3,4])},

{id:"s46", tipo:"anello", tema:"chiaro", sopratitolo:"I collegamenti", centro:"15.3", sotto:"giorno per giorno", voci:LEZIONI, attive:[0,1,2,3]},
{id:"s47", tipo:"anello", tema:"chiaro", sopratitolo:"I collegamenti · post-operatorio, complicanze, dimissione, trasfusione", centro:"15.3", sotto:"giorno per giorno", voci:LEZIONI},

{id:"s48", tipo:"titolo", tema:"profondo",
  titolo:"La giornata postoperatoria<br>è già **metà della risposta**.",
  sotto:"La frase del caso"},

{id:"s49", tipo:"figura", tema:"chiaro", illu:"cuore", sopratitolo:"Nella prossima lezione · in pronto soccorso",
  titolo:"Un dolore toracico che diventa, in pochi minuti, un **arresto cardiaco**."},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione · 15.4",
  titolo:"Dolore toracico", sottotitolo:"Dal triage all'arresto cardiaco",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
