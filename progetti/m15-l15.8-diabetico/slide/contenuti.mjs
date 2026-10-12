// Contenuto delle 50 scene della lezione 15.8 — il paziente diabetico:
// ipoglicemia, insulina e piede. La sera prima è un percorso di tre tappe; la
// regola del 15 una catena che si completa; le quattro cause e l'educazione
// del piede si accendono a scalare; l'obiettivo glicemico è una fascia;
// errori e risposta modello stanno in tabella.

const SERA = (att, k) => ({tipo:"percorso", tema:"chiaro", tappe:[
  {t:"Ieri sera", d:"mangia poco per la nausea", key:k===0},
  {t:"Dosi abituali", d:"di insulina", key:k===1},
  {t:"Ore 6:30", d:"sudato, tremante, confuso", key:k===2}], attive:att});

const REGOLA = (att, k) => ({tipo:"catena", tema:"chiaro", passi:[
  {t:"**15 g** di zuccheri semplici", d:"3 bustine di zucchero in acqua o 150 ml di succo", key:k===0},
  {t:"Ricontrollo dopo **15 minuti**", key:k===1},
  {t:"Se **< 70**, ripetere", key:k===2},
  {t:"Carboidrati **complessi**", d:"o anticipare la colazione", key:k===3}], attive:att});

const CAUSE = (att, k) => ({tipo:"tre", tema:"chiaro", box:[
  {n:"1", t:"Pasto ridotto", d:"con dose **piena** di rapida", key:k===0},
  {n:"2", t:"Rene", d:"insulina eliminata **più lentamente** · lezione 14.4", key:k===1},
  {n:"3", t:"Infezione", d:"in miglioramento: fabbisogno **in calo**", key:k===2},
  {n:"4", t:"Basale serale", d:"**non** rivalutata", key:k===3}], attive:att});

const PIEDE = (att) => ({tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, celle:[
  {t:"**Ispezione** quotidiana · specchio o familiare", key:true}, {t:"Acqua **tiepida**, temperatura controllata"}, {t:"**Asciugare** fra le dita"},
  {t:"Crema, ma **non fra le dita**"}, {t:"Unghie **dritte** · callosità dal podologo"}, {t:"**Mai** scalzi"},
  {t:"Scarpe comode · controllare l'**interno**"}, {t:"**Niente** borse dell'acqua calda"}, {t:"Segnalare **subito** ogni lesione"}],
  attive:att});

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 15 · Casi clinici integrati",
  titolo:"Il paziente<br>diabetico", sottotitolo:"15.8 · Ipoglicemia, insulina e piede",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"icone", tema:"chiaro", sopratitolo:"Micro-lezione 8 di 12 · tre rischi di ogni giorno", voci:[
  {icona:"zucchero", t:"Ipoglicemia", key:true}, {icona:"penna", t:"Errori con l'insulina"}, {icona:"piede", t:"Lesioni del piede"}]},
{id:"s03", tipo:"figura", tema:"chiaro", sopratitolo:"Il caso li mette insieme", illu:"rene",
  titolo:"Un dato in apparenza<br>**secondario**.", sotto:"La funzione renale cambia il ragionamento."},

{id:"s04", tipo:"cifre", tema:"chiaro", sopratitolo:"Lo scenario · il signor Antonio", voci:[
  {n:"71", suf:"anni", t:"diabete di tipo 2 in insulina", d:"basale la sera · rapida ai pasti"},
  {n:"42", suf:"", t:"eGFR", d:"insufficienza renale **cronica**", key:true}]},
{id:"s05", sopratitolo:"Ulcera plantare infetta · primo metatarso destro", ...SERA([0,1], 1)},
{id:"s06", tipo:"cifre", tema:"chiaro", sopratitolo:"Ore 6:30 · sudato, tremante, confuso, ma risponde e deglutisce", voci:[
  {n:"48", suf:"mg/dl", t:"glicemia capillare", d:"che cosa fai?", key:true}]},

{id:"s07", sopratitolo:"Cosciente e deglutisce · la regola del 15", ...REGOLA([0], 0)},
{id:"s08", sopratitolo:"Alla risoluzione, per evitare una recidiva", ...REGOLA([0,1,2,3], 3)},
{id:"s09", tipo:"bivio", tema:"chiaro", sopratitolo:"Poi avvisare il medico e documentare · alle 6:45 glicemia 96, lucido", radice:"Ipoglicemia", rami:[
  {q:"cosciente, deglutisce", t:"Regola del 15", d:"zuccheri per bocca"},
  {q:"non cosciente o non deglutisce", t:"Niente per bocca", d:"glucagone o glucosio EV secondo protocollo", key:true}]},

{id:"s10", sopratitolo:"Perché è successo? · le cause sono più d'una", ...CAUSE([0], 0)},
{id:"s11", sopratitolo:"Perché è successo?", ...CAUSE([0,1,2], 1)},
{id:"s12", sopratitolo:"Rivedere lo schema con il medico · l'infermiere porta i dati", ...CAUSE([0,1,2,3], 3)},

{id:"s13", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"L'insulina ai pasti · previene casi come questo", celle:[
  {t:"Glicemia **prima** di ogni dose"}, {t:"Rapida coordinata con l'**arrivo** del pasto", key:true},
  {t:"**Digiuno** per esami o interventi: rivedere lo schema"}]},
{id:"s14", tipo:"frase", tema:"chiaro", sopratitolo:"Assunzione incerta · nausea, inappetenza",
  testo:"Il protocollo può prevedere la rapida **subito dopo** il pasto, in base a quanto ha mangiato.",
  sotto:"Le variazioni si comunicano nelle consegne."},

{id:"s15", tipo:"sostituzione", tema:"chiaro", sopratitolo:"Farmaco ad alto livello di attenzione",
  da:{h:"Scritto", t:"10U"}, a:{h:"Letto", t:"100"},
  sotto:"Unità scritte **per esteso**: la «U» può essere letta come uno zero."},
{id:"s16", tipo:"icone", tema:"chiaro", sopratitolo:"Gli errori tipici, e come si evitano", voci:[
  {icona:"siringa", t:"Siringhe da insulina o penne", d:"mai siringhe generiche"},
  {icona:"penna", t:"Penna personale", d:"mai condivisa, nemmeno cambiando l'ago", key:true},
  {icona:"spunta", t:"Doppio controllo", d:"secondo procedura"},
  {icona:"frigo", t:"Scorte in frigorifero", d:"la penna in uso a temperatura ambiente"}]},

{id:"s17", tipo:"figura", tema:"chiaro", sopratitolo:"Il piede · sede plantare, sotto una prominenza ossea", illu:"piede",
  titolo:"Componente<br>**neuropatica**.", sotto:"Non sente il dolore: per questo l'ulcera è arrivata a infettarsi."},
{id:"s18", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"I segni di infezione · e il sondaggio con lo specillo", celle:[
  {t:"**Rossore**"}, {t:"**Calore**"}, {t:"**Edema**"}, {t:"**Secrezione**"}, {t:"**Odore**"},
  {t:"Specillo all'**osso**: osteomielite? · imaging", key:true}]},
{id:"s19", tipo:"tre", tema:"chiaro", sopratitolo:"Documentare con il TIME · lezione 7.1", box:[
  {n:"1", t:"Dimensioni"}, {n:"2", t:"Fondo"}, {n:"3", t:"Essudato"}, {n:"4", t:"Margini"}, {n:"5", t:"Cute perilesionale", key:true}]},

{id:"s20", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"La perfusione · poi l'ABI della lezione 7.3", celle:[
  {t:"Polsi **pedidio** e **tibiale posteriore**", key:true}, {t:"**Colorito**"}, {t:"**Temperatura**"}, {t:"**Riempimento** capillare"}]},
{id:"s21", tipo:"catena", tema:"chiaro", sopratitolo:"L'indice caviglia-braccio nel diabetico · un dettaglio che i quiz amano", passi:[
  {t:"Arterie **calcificate**"}, {t:"Il bracciale **non le comprime**"},
  {t:"ABI **falsamente normale** o elevato", key:true}]},
{id:"s22", tipo:"tre", tema:"chiaro", sopratitolo:"Allora altri esami, secondo indicazione", box:[
  {n:"1", t:"Indice alluce-braccio"}, {n:"2", t:"Ossimetria transcutanea"},
  {n:"!", t:"Arteriopatia", d:"senza **rivascolarizzazione** la ferita non guarisce", key:true}]},

{id:"s23", tipo:"figura", tema:"chiaro", sopratitolo:"Il trattamento · prima di tutto lo scarico (offloading)", illu:"calzatura", lato:"dx",
  titolo:"Senza **scarico**<br>non guarisce.", sotto:"Calzature o tutori specifici, ausili, riposo dell'arto: qualunque medicazione si usi."},
{id:"s24", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"E poi", celle:[
  {t:"**Medicazione** secondo valutazione"}, {t:"**Antibiotico** secondo prescrizione"}, {t:"**Controllo glicemico**"},
  {t:"**Nutrizione**"}, {t:"**Talloni** protetti"}, {t:"Piede **controlaterale**", key:true}]},

{id:"s25", tipo:"confronto", tema:"chiaro", sopratitolo:"Un equilibrio difficile", col:[
  {h:"Troppo zucchero", t:"infezione · la ferita **non guarisce**"},
  {h:"Troppo poco", t:"**ipoglicemie**, cadute, aritmie"}]},
{id:"s26", tipo:"fascia", tema:"chiaro", sopratitolo:"Obiettivo personalizzato · nell'anziano con IRC, evitare l'ipoglicemia",
  min:40, max:260, classi:[
  {a:70, t:"ipoglicemia", d:"sotto 70"}, {da:70, a:140, t:""},
  {da:140, a:180, t:"obiettivo", d:"indicativo · lezione 8.3", key:true}, {da:180, t:"sopra"}]},

{id:"s27", sopratitolo:"L'educazione per il piede · prevenire le amputazioni", ...PIEDE([0])},
{id:"s28", sopratitolo:"L'educazione per il piede · igiene e cura", ...PIEDE([0,1,2,3,4])},
{id:"s29", sopratitolo:"L'educazione per il piede · scarpe, calore, lesioni", ...PIEDE([0,1,2,3,4,5,6,7,8])},

{id:"s30", tipo:"icone", tema:"chiaro", sopratitolo:"L'educazione sull'ipoglicemia", voci:[
  {icona:"luna", t:"Sintomi anche notturni", d:"sudorazione, incubi, cefalea al risveglio", key:true},
  {icona:"zucchero", t:"Zuccheri sempre con sé"}, {icona:"orologio", t:"La regola del 15"}]},
{id:"s31", tipo:"trappola", tema:"chiaro", sopratitolo:"I giorni di malattia · lezione 8.3, letti anche al contrario", righe:[
  {sb:"«Mangio meno, sospendo l'insulina basale»", ok:"La basale **non** si sospende di propria iniziativa"}]},
{id:"s32", tipo:"catena", tema:"chiaro", sopratitolo:"Quando si mangia meno o si sta male", passi:[
  {t:"Misurare **più spesso**"}, {t:"Contattare il **medico**", d:"per adattare le dosi"},
  {t:"Ambulatorio del **piede diabetico** e diabetologia", key:true}]},

{id:"s33", tipo:"tabella", tema:"chiaro", sopratitolo:"Gli errori da evitare · insulina e ipoglicemia", colonne:["52%","48%"],
  intestazioni:["Errore", "Invece"], righe:[
  ["no:Stessa dose di rapida, pasto ignorato", "rapida coordinata con il **pasto**"],
  ["no:Dimenticare la funzione renale", "il rene **prolunga** l'insulina"],
  ["no:Trattare senza cercare la causa", "cercare la **causa**"],
  ["no:Zuccheri a chi non deglutisce", "**niente per bocca**"]], chiave:[2]},
{id:"s34", tipo:"tabella", tema:"chiaro", sopratitolo:"Gli errori da evitare · prescrizione e piede", colonne:["52%","48%"],
  intestazioni:["Errore", "Invece"], righe:[
  ["no:«U» per unità", "unità **per esteso**"],
  ["no:Fidarsi di un ABI normale", "altri esami, come l'**alluce-braccio**"],
  ["no:Medicare senza scaricare", "prima lo **scarico**"]], chiave:[2]},

{id:"s35", tipo:"figura", tema:"chiaro", sopratitolo:"Un approfondimento per il turno di notte", illu:"luna",
  titolo:"L'ipoglicemia<br>**notturna**.", sotto:"Di notte il sonno può mascherarne i sintomi."},
{id:"s36", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"I segnali · i beta-bloccanti possono mascherare tremore e tachicardia", celle:[
  {t:"**Sudorazione**", key:true}, {t:"**Agitazione**"}, {t:"Respiro **rumoroso**"},
  {t:"Risveglio **confuso**"}, {t:"**Incubi**"}, {t:"**Cefalea** al mattino"}]},
{id:"s37", tipo:"icone", tema:"chiaro", sopratitolo:"Chi è più a rischio, e che cosa si fa", voci:[
  {icona:"anziano", t:"Anziano"}, {icona:"rene", t:"Insufficienza renale"},
  {icona:"orologio", t:"Controlli notturni", d:"secondo prescrizione o protocollo"},
  {icona:"chat", t:"Cena ridotta, insulina invariata", d:"si dice nelle consegne", key:true}]},

{id:"s38", tipo:"tre", tema:"chiaro", sopratitolo:"D1 · «Come si tratta un'ipoglicemia?» · nel cosciente che deglutisce", box:[
  {n:"15 g", t:"Zuccheri semplici"}, {n:"15 min", t:"Ricontrollo", key:true}, {n:"poi", t:"Carboidrati complessi"}]},
{id:"s39", tipo:"confronto", tema:"chiaro", sopratitolo:"D1 · nell'incosciente · poi D2", col:[
  {h:"Incosciente", t:"**niente per bocca** · glucagone o glucosio EV secondo protocollo"},
  {h:"D2", t:"«Perché l'ABI può essere **inaffidabile** nel diabetico?»"}]},
{id:"s40", tipo:"catena", tema:"chiaro", sopratitolo:"D2 · la risposta · poi D3: che cosa insegna per il piede?", passi:[
  {t:"Arterie calcificate **non comprimibili**"}, {t:"Valore **falsamente normale** o elevato"},
  {t:"Altri esami: **alluce-braccio**", key:true}]},
{id:"s41", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"D3 · la cura del piede", celle:[
  {t:"Ispezione **quotidiana**", key:true}, {t:"Acqua **tiepida**, asciugare fra le dita"}, {t:"**Niente** piedi nudi"},
  {t:"Scarpe **adeguate**"}, {t:"**Niente** fonti di calore"}, {t:"Segnalare **subito** ogni lesione"}]},

{id:"s42", tipo:"citazione", tema:"chiaro", sopratitolo:"La risposta modello · 1",
  testo:"Diabetico in insulina, con **insufficienza renale**, che dopo una **cena ridotta** e dosi abituali presenta sudorazione, tremori, confusione e glicemia 48: **ipoglicemia sintomatica**.",
  fonte:"Chi è · che cosa è successo"},
{id:"s43", tipo:"tabella", tema:"chiaro", sopratitolo:"La risposta modello · 2", colonne:["28%","72%"],
  intestazioni:["Se", "Che cosa scrivo"], righe:[
  ["Cosciente", "regola del 15 · ricontrollo a 15 minuti · poi carboidrati complessi"],
  ["Incosciente", "**niente per bocca** · glucagone o glucosio EV secondo protocollo"]], chiave:[1]},
{id:"s44", tipo:"tabella", tema:"chiaro", sopratitolo:"La risposta modello · 3", colonne:["28%","72%"],
  intestazioni:["Passo", "Che cosa scrivo"], righe:[
  ["Comunico", "avviso il medico e documento"],
  ["Analizzo", "le **cause**, per rivedere lo schema"],
  ["Poi", "glicemia prima di ogni dose · rapida coordinata con il **pasto**"]], chiave:[1]},
{id:"s45", tipo:"tabella", tema:"chiaro", sopratitolo:"La risposta modello · 4", colonne:["28%","72%"],
  intestazioni:["Passo", "Che cosa scrivo"], righe:[
  ["Ulcera", "infezione e perfusione · **scarico**, medicazione, controllo glicemico"],
  ["Educo", "ipoglicemia e cura del piede, con il **teach-back**"]], chiave:[1]},

{id:"s46", tipo:"tre", tema:"chiaro", sopratitolo:"I collegamenti", box:[
  {n:"5.5", t:"Insuline e ipoglicemia", key:true}, {n:"8.3", t:"Diabete in ospedale"},
  {n:"7.1 · 7.5", t:"TIME e medicazioni"}]},
{id:"s47", tipo:"tre", tema:"chiaro", sopratitolo:"I collegamenti", box:[
  {n:"7.3", t:"Arteriopatia e ABI"}, {n:"14.4", t:"Rene e farmaci", key:true},
  {n:"5.4", t:"Farmaci ad alto livello di attenzione"}]},

{id:"s48", tipo:"titolo", tema:"profondo",
  titolo:"Ogni ipoglicemia<br>ha **una causa**.",
  sotto:"Trattarla senza cercarla significa aspettare la prossima."},

{id:"s49", tipo:"tre", tema:"chiaro", sopratitolo:"Nella prossima lezione · febbre, nove giorni dopo l'ultimo ciclo", box:[
  {n:"1", t:"Neutropenia", key:true}, {n:"2", t:"Catetere venoso"}, {n:"3", t:"Piastrine basse"}, {n:"4", t:"La persona"}]},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione · 15.9",
  titolo:"La paziente oncologica<br>con febbre", sottotitolo:"Neutropenia, catetere venoso, piastrine basse",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
