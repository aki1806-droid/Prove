// Contenuto delle 50 scene della lezione 15.9 — la paziente oncologica con
// febbre. Il nadir è la curva della 8.7; i sessanta minuti una scadenza con
// l'orario della prima dose; le misure per il neutropenico e la seconda
// domanda d'orale si accendono a scalare; i segni del port, gli errori e la
// risposta modello stanno in tabella.

const NEUTRO = (att) => ({tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, celle:[
  {t:"**Igiene delle mani**", key:true}, {t:"Stanza singola secondo protocollo"},
  {t:"**Niente** visitatori con sintomi"}, {t:"**Niente** manovre rettali · temperatura, supposte, clisteri"},
  {t:"Igiene **orale** e **cutanea**"}, {t:"**Niente** fiori e piante"},
  {t:"Alimenti **sicuri**"}, {t:"Meno procedure **invasive**: ogni ago è una porta"}], attive:att});

const D2 = (att) => ({tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, celle:[
  {t:"Igiene delle **mani**"}, {t:"Isolamento **protettivo**"}, {t:"**Niente** visitatori con sintomi"},
  {t:"**Niente** manovre rettali"}, {t:"Igiene orale e cutanea"}, {t:"Alimenti **sicuri**"},
  {t:"**Niente** fiori"}, {t:"Meno procedure **invasive**"}, {t:"Febbre: antibiotico **entro 60 minuti**", key:true}], attive:att});

const SEGNI = (k) => ({tipo:"tabella", tema:"chiaro", colonne:["55%","45%"],
  intestazioni:["Segno da segnalare", "Fa pensare a"], righe:[
  ["Dolore o gonfiore durante l'infusione", "**stravaso** · pericolosissimo con gli antiblastici"],
  ["Assenza di reflusso, resistenza", "**occlusione**"],
  ["Arrossamento, secrezione", "**infezione**"],
  ["Edema del braccio o del collo", "**trombosi**"]], chiave:k});

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 15 · Casi clinici integrati",
  titolo:"La paziente oncologica<br>con febbre", sottotitolo:"15.9 · Neutropenia, port, piastrine e la persona",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"confronto", tema:"chiaro", sopratitolo:"Micro-lezione 9 di 12 · una paziente in chemioterapia con la febbre", col:[
  {h:"Il corpo", t:"la **rapidità** infermieristica salva la vita", grande:true},
  {h:"La persona", t:"porta con sé la **paura**", grande:true}]},
{id:"s03", tipo:"tre", tema:"chiaro", sopratitolo:"Le lezioni che servono", box:[
  {n:"4.3", t:"Isolamento"}, {n:"6.2", t:"Cateteri centrali"}, {n:"6.6", t:"Trasfusione"},
  {n:"6.7", t:"Emocolture"}, {n:"8.7", t:"Oncologia", key:true}]},

{id:"s04", tipo:"cifre", tema:"chiaro", sopratitolo:"Lo scenario · la signora Chiara", voci:[
  {n:"54", suf:"anni", t:"carcinoma mammario", d:"chemioterapia adiuvante · **port-a-cath**"},
  {n:"9", suf:"giorni", t:"dall'ultimo ciclo", key:true}]},
{id:"s05", tipo:"cifre", tema:"chiaro", sopratitolo:"Ore 20, pronto soccorso · brividi · «mi sento solo molto stanca» · FR 18", voci:[
  {n:"38,7", t:"temperatura", d:"°C", key:true}, {n:"112/70", t:"pressione", d:"mmHg"},
  {n:"108", t:"frequenza", d:"battiti al minuto", key:true}, {n:"97", t:"saturazione", d:"%"}]},
{id:"s06", tipo:"frase", tema:"chiaro", sopratitolo:"Ha due figli, di 12 e 15 anni · fermati un momento",
  testo:"Perché «**nove giorni fa**» è il dato più importante della traccia?"},

{id:"s07", tipo:"nadir", tema:"chiaro", sopratitolo:"Il ragionamento · fra il 7° e il 14° giorno i globuli bianchi sono al minimo",
  sotto:"lei è al giorno 9"},
{id:"s08", tipo:"catena", tema:"chiaro", sopratitolo:"Febbre in una paziente in chemioterapia", passi:[
  {t:"**Neutropenia febbrile**", d:"fino a prova contraria", key:true},
  {t:"Segni di infezione **minimi**", d:"senza neutrofili, poca infiammazione evidente"},
  {t:"Stanchezza e febbre", d:"possono essere tutto"}]},
{id:"s09", tipo:"cifre", tema:"chiaro", sopratitolo:"È un'emergenza · la tachicardia può indicare una sepsi iniziale", voci:[
  {n:"60", suf:"minuti", t:"antibiotico entro", d:"l'obiettivo preciso", key:true}]},

{id:"s10", tipo:"icone", tema:"chiaro", sopratitolo:"Il triage e l'accoglienza", voci:[
  {icona:"avviso", t:"Priorità elevata", d:"percorso neutropenia febbrile"},
  {icona:"divieto", t:"Non in sala d'attesa", d:"magari accanto a chi ha l'influenza"},
  {icona:"scudo", t:"Area dedicata", d:"isolamento protettivo · lezione 4.3", key:true}]},
{id:"s11", tipo:"icone", tema:"chiaro", sopratitolo:"Subito", voci:[
  {icona:"mani", t:"Igiene delle mani", d:"rigorosa"}, {icona:"stetoscopio", t:"Parametri e NEWS2"},
  {icona:"telefono", t:"Avvisare il medico"}, {icona:"orologio", t:"Ora di arrivo", d:"da qui partono i 60 minuti", key:true}]},

{id:"s12", tipo:"cifre", tema:"chiaro", sopratitolo:"Gli esami · l'emocromo urgente", voci:[
  {n:"300", t:"neutrofili", d:"per mm³ · neutropenia **grave**", key:true},
  {n:"18.000", t:"piastrine", d:"per mm³"}, {n:"9,1", t:"emoglobina", d:"g/dl"}]},
{id:"s13", tipo:"confronto", tema:"chiaro", sopratitolo:"Le emocolture · lezione 6.7 · prelevate insieme", col:[
  {h:"Una dal port", t:"dal **catetere**", grande:true},
  {h:"Una da vena periferica", t:"in **contemporanea**", grande:true}],
  sotto:"I tempi di positivizzazione dicono se l'infezione nasce dal catetere."},
{id:"s14", tipo:"trappola", tema:"chiaro", sopratitolo:"Poi funzione renale ed epatica, lattati, PCR, urinocoltura", righe:[
  {sb:"Aspettare le emocolture per dare l'antibiotico", ok:"Le emocolture **non devono ritardare** l'antibiotico"}]},

{id:"s15", tipo:"catena", tema:"chiaro", sopratitolo:"Il port · come nella lezione 6.2", passi:[
  {t:"Tecnica **asettica**"}, {t:"Ago di **Huber**", d:"non carotante", key:true},
  {t:"Verifica del **reflusso**"}, {t:"Lavaggio **pulsato**"}]},
{id:"s16", tipo:"figura", tema:"chiaro", sopratitolo:"Prima di usarlo, si ispeziona", illu:"lente",
  titolo:"La **tasca**<br>e il tragitto.", sotto:"Rossore, dolore, secrezione: infezione del catetere? Si segnala."},
{id:"s17", tipo:"scadenza", tema:"chiaro", sopratitolo:"Antibiotico ad ampio spettro · l'indicatore di qualità del percorso",
  max:60, banda:[0,48], inizio:"ore 20:00 · arrivo", fine:"60 minuti", tappe:[
  {a:48, v:"20:48", t:"**prima dose**, orario documentato", key:true},
  {a:60, v:"60′", t:"il limite"}]},

{id:"s18", sopratitolo:"Le misure nel paziente neutropenico · lezione 8.7", ...NEUTRO([0,1,2])},
{id:"s19", sopratitolo:"Le misure nel paziente neutropenico", ...NEUTRO([0,1,2,3,4,5,6,7])},

{id:"s20", tipo:"figura", tema:"chiaro", sopratitolo:"La mucosite · afte nel cavo orale", illu:"bocca",
  titolo:"Dolore **6/10**<br>alla deglutizione.", sotto:"Spazzolino morbido, sciacqui con fisiologica o bicarbonato, **niente** collutori alcolici."},
{id:"s21", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"E poi", celle:[
  {t:"**Analgesia** secondo prescrizione, valutata con la scala"}, {t:"Cibi **morbidi**, freschi, non irritanti"},
  {t:"**Idratazione**"}, {t:"Ispezione quotidiana del cavo orale · **candidosi**?", key:true}]},

{id:"s22", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"Piastrine 18.000 · petecchie alle gambe, lieve gengivorragia", celle:[
  {t:"Spazzolino **morbido**"}, {t:"Rasoio **elettrico**"}, {t:"**Niente** intramuscolari", key:true},
  {t:"Compressione **prolungata** dopo i prelievi"}, {t:"Prevenzione delle **cadute**"}]},
{id:"s23", tipo:"catena", tema:"chiaro", sopratitolo:"La trasfusione di piastrine", passi:[
  {t:"Secondo **prescrizione**"}, {t:"Soglie del **protocollo**", d:"tengono conto di febbre e sanguinamento"},
  {t:"Identificazione **al letto**", d:"lezione 6.6", key:true}]},

{id:"s24", tipo:"tre", tema:"chiaro", sopratitolo:"L'evoluzione · terza giornata", box:[
  {n:"✓", t:"Febbre risolta", d:"parametri stabili"}, {n:"✓", t:"Emocolture negative"},
  {n:"1.100", t:"Neutrofili", d:"in risalita", key:true}, {n:"✓", t:"Mucosite", d:"in miglioramento"}]},
{id:"s25", tipo:"frase", tema:"chiaro", sopratitolo:"Si prosegue la terapia e si pianifica la dimissione",
  testo:"Ma prima c'è una parte del caso che **non sta negli esami**."},

{id:"s26", tipo:"citazione", tema:"chiaro", sopratitolo:"Un momento che conta quanto l'antibiotico",
  testo:"Ho avuto paura di non tornare a casa **dai miei figli**.", fonte:"La signora Chiara · sera della seconda giornata"},
{id:"s27", tipo:"trappola", tema:"chiaro", sopratitolo:"Informazioni chiare, dentro le proprie competenze", righe:[
  {sb:"«Vedrà che andrà tutto bene»", ok:"**Ascolto**, presenza, domande aperte"}]},
{id:"s28", tipo:"icone", tema:"chiaro", sopratitolo:"Oltre l'ascolto", voci:[
  {icona:"dialogo", t:"Supporto psico-oncologico", key:true},
  {icona:"persone", t:"Familiari", d:"secondo i suoi desideri"},
  {icona:"cuoremano", t:"Volontariato oncologico", d:"molto presente in Veneto"}]},

{id:"s29", tipo:"icone", tema:"chiaro", sopratitolo:"L'educazione alla dimissione", voci:[
  {icona:"termometro", t:"Misurare la temperatura", d:"malessere, brividi, sudorazione"},
  {icona:"telefono", t:"Febbre ≥ 38 °C: chiamare subito", d:"il centro, al numero dedicato", key:true}]},
{id:"s30", tipo:"trappola", tema:"chiaro", sopratitolo:"In una persona senza difese", righe:[
  {sb:"Prendere l'antipiretico e aspettare che passi", ok:"L'antipiretico abbassa la febbre, ma **non cura** l'infezione"}]},
{id:"s31", tipo:"griglia", tema:"chiaro", colonne:4, spunta:true, sopratitolo:"E ancora", celle:[
  {t:"Igiene delle **mani**"}, {t:"Evitare chi ha **infezioni**"}, {t:"Igiene **orale**"}, {t:"Cura del **port**"},
  {t:"Segni di **sanguinamento**"}, {t:"Alimentazione **sicura**"}, {t:"Calendario dei **controlli**"},
  {t:"Case manager · **Rete Oncologica Veneta**", key:true}]},

{id:"s32", tipo:"tabella", tema:"chiaro", sopratitolo:"Gli errori da evitare · in pronto soccorso", colonne:["55%","45%"],
  intestazioni:["Errore", "Invece"], righe:[
  ["no:«Prenda il paracetamolo e torni domani»", "**emergenza**: antibiotico entro 60′"],
  ["no:Lasciarla in sala d'attesa", "area dedicata, **isolamento**"],
  ["no:Aspettare emocromo o emocolture", "l'antibiotico **non** aspetta"]], chiave:[0]},
{id:"s33", tipo:"tabella", tema:"chiaro", sopratitolo:"Gli errori da evitare · in reparto", colonne:["55%","45%"],
  intestazioni:["Errore", "Invece"], righe:[
  ["no:Temperatura rettale, supposte", "**niente** manovre rettali"],
  ["no:Intramuscolari con piastrine basse", "**niente** intramuscolari"],
  ["no:Trascurare la paura e i figli", "**ascolto** e supporto"]], chiave:[2]},

{id:"s34", tipo:"catena", tema:"chiaro", sopratitolo:"Un approfondimento · il port-a-cath nel tempo", passi:[
  {t:"Ago di **Huber**", d:"non carotante"}, {t:"Tecnica **asettica**"},
  {t:"Prima dell'uso: **reflusso**", key:true}]},
{id:"s35", tipo:"cifre", tema:"chiaro", sopratitolo:"Lavaggio pulsato · prima e dopo ogni uso, fra farmaci incompatibili", voci:[
  {n:"10", suf:"ml", t:"siringhe da almeno", d:"per non generare pressioni eccessive · da fermo, lavaggi secondo protocollo", key:true}]},
{id:"s36", sopratitolo:"I segni da segnalare", ...SEGNI([0,1])},
{id:"s37", sopratitolo:"I segni da segnalare", ...SEGNI([2,3])},

{id:"s38", tipo:"cifre", tema:"chiaro", sopratitolo:"D1 · «Che cos'è il nadir?»", voci:[
  {n:"7–14", suf:"giorni", t:"dopo la chemioterapia", d:"il punto **più basso** dei valori ematici · massimo rischio di infezione e sanguinamento", key:true}]},
{id:"s39", sopratitolo:"D2 · «Quali misure adotta per un paziente neutropenico?»", ...D2([0,1,2,3,4])},
{id:"s40", sopratitolo:"D2 · e la regola della febbre · poi D3", ...D2([0,1,2,3,4,5,6,7,8])},
{id:"s41", tipo:"tre", tema:"chiaro", sopratitolo:"D3 · «Come risponde a una paziente che ha paura?»", box:[
  {n:"1", t:"Ascolto e presenza"}, {n:"2", t:"Domande aperte", d:"niente frasi rassicuranti generiche"},
  {n:"3", t:"Informazioni", d:"nei limiti delle proprie competenze"}, {n:"4", t:"Supporto psico-oncologico", key:true}]},

{id:"s42", tipo:"citazione", tema:"chiaro", sopratitolo:"La risposta modello · 1",
  testo:"In chemioterapia, **nove giorni** dopo l'ultimo ciclo, con febbre, brividi e tachicardia: **neutropenia febbrile** fino a prova contraria. Emergenza: antibiotico entro 60 minuti.",
  fonte:"Chi è · che cosa sospetto"},
{id:"s43", tipo:"tabella", tema:"chiaro", sopratitolo:"La risposta modello · 2", colonne:["28%","72%"],
  intestazioni:["Passo", "Che cosa scrivo"], righe:[
  ["Accolgo", "priorità elevata · area separata, **isolamento protettivo**"],
  ["Valuto", "parametri · avviso subito il medico"],
  ["Registro", "l'**orario di arrivo** · emocromo urgente"]], chiave:[2]},
{id:"s44", tipo:"tabella", tema:"chiaro", sopratitolo:"La risposta modello · 3", colonne:["28%","72%"],
  intestazioni:["Passo", "Che cosa scrivo"], righe:[
  ["Emocolture", "dal port (Huber, asepsi) e da vena periferica, insieme"],
  ["Antibiotico", "**senza ritardo**, orario documentato"],
  ["Proteggo", "misure per il neutropenico"]], chiave:[1]},
{id:"s45", tipo:"tabella", tema:"chiaro", sopratitolo:"La risposta modello · 4", colonne:["28%","72%"],
  intestazioni:["Passo", "Che cosa scrivo"], righe:[
  ["Piastrine", "precauzioni **antiemorragiche**"],
  ["Gestisco", "mucosite e dolore · rivaluto"],
  ["La persona", "ascolto · supporto **psico-oncologico**"],
  ["Dimissione", "chiamare subito se c'è febbre · **teach-back**"]], chiave:[3]},

{id:"s46", tipo:"tre", tema:"chiaro", sopratitolo:"I collegamenti", box:[
  {n:"4.3", t:"Isolamento protettivo"}, {n:"6.2", t:"Il port"}, {n:"6.6", t:"Trasfusione"}, {n:"6.7", t:"Emocolture", key:true}]},
{id:"s47", tipo:"tre", tema:"chiaro", sopratitolo:"I collegamenti", box:[
  {n:"8.7", t:"Neutropenia, mucosite, piastrine", key:true}, {n:"5.7", t:"Antiblastici"},
  {n:"2.7", t:"Comunicazione"}, {n:"13.3", t:"Rete Oncologica Veneta"}]},

{id:"s48", tipo:"titolo", tema:"profondo",
  titolo:"In chemioterapia,<br>la febbre è **un'emergenza**",
  sotto:"anche quando la persona dice di stare bene."},

{id:"s49", tipo:"tre", tema:"chiaro", sopratitolo:"Nella prossima lezione · l'infermiere, ultima barriera prima del danno", box:[
  {n:"1", t:"Potassio", key:true}, {n:"2", t:"Eparina in pompa"}, {n:"3", t:"Morfina"}, {n:"4", t:"Trasfusione"}]},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione · 15.10",
  titolo:"Il turno della terapia:<br>quattro trappole", sottotitolo:"Un turno di mattina, quattro situazioni a rischio",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
