// Contenuto delle 50 scene della lezione 3.5 — idratazione, bilancio idrico
// ed equilibrio elettrolitico. Corpi nuovi: il bilancio (serbatoio con
// entrate e uscite) e la distribuzione delle soluzioni nei compartimenti;
// la fascia torna per diuresi, sodio, potassio e calcio.

const ENTRATE = [
 {t:"Bevande"}, {t:"Acqua degli alimenti"}, {t:"Acqua endogena", d:"~300 ml dal metabolismo"},
 {t:"Infusioni e nutrizione"}, {t:"Farmaci diluiti", d:"le entrate «piccole»", key:true},
];
const USCITE = [
 {t:"Diuresi"}, {t:"Feci", d:"~100–200 ml"}, {t:"Vomito, drenaggi, sondini"},
 {t:"Perdite insensibili", d:"cute e respiro: ~800–1000 ml", key:true},
];
const DIURESI = [
 {a:100, t:"Anuria", d:"< 100 ml"},
 {da:100, a:450, t:"Oliguria", d:"< 400–500 ml/24 h", key:true},
 {da:450, a:2750, t:"Normale", d:"0,5–1 ml/kg/h"},
 {da:2750, t:"Poliuria", d:"> 2500–3000 ml"},
];
const SOLUZ = [
 {k:"iso", t:"Isotoniche", d:"NaCl 0,9 %, Ringer lattato: restano nell'extracellulare, **espandono il volume**"},
 {k:"ipo", t:"Ipotoniche", d:"glucosata 5 %: acqua libera in tutti i compartimenti, **non espande il volume**", key:true},
 {k:"iper", t:"Ipertoniche", d:"usi specifici, sempre su prescrizione"},
];
const NA = [
 {a:135, t:"Iponatriemia", d:"confusione, cefalea, nausea, convulsioni"},
 {da:135, a:145, t:"Normale", d:"135 – 145 mEq/L", key:true},
 {da:145, t:"Ipernatriemia", d:"sete, agitazione: l'anziano disidratato"},
];
const K = [
 {a:3.5, t:"Ipokaliemia", d:"debolezza, crampi, ileo, aritmie"},
 {da:3.5, a:5, t:"Normale", d:"3,5 – 5 mEq/L", key:true},
 {da:5, t:"Iperkaliemia", d:"onde T appuntite, bradicardia, arresto"},
];
const CA = [
 {a:8.5, t:"Ipocalcemia", d:"parestesie, tetania, laringospasmo"},
 {da:8.5, a:10.5, t:"Normale", d:"8,5 – 10,5 mg/dL", key:true},
 {da:10.5, t:"Ipercalcemia", d:"stipsi, poliuria, confusione"},
];
const KGRID = [
 {n:"1", t:"**Ipokaliemia** — debolezza, crampi, ileo, aritmie; potenzia la digitale"},
 {n:"2", t:"**Cause** — diuretici, vomito, diarrea"},
 {n:"3", t:"**Iperkaliemia** — aritmie, onde T appuntite, bradicardia fino all'arresto", key:true},
 {n:"4", t:"**Cause** — insufficienza renale, ACE-inibitori, risparmiatori di potassio"},
];
const CASO = [
 {t:"Dati", d:"oliguria, Na 152, mucose secche, confusione"},
 {t:"Problema", d:"disidratazione con alterazione della coscienza"},
 {t:"Interventi", d:"medico, bilancio, peso, sorveglianza, idratazione lenta"},
 {t:"Valutazione", d:"diuresi oraria, coscienza, esami", key:true},
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 3 · Bisogni fondamentali, comfort e assistenza di base avanzata",
  titolo:"Idratazione, bilancio idrico<br>ed equilibrio elettrolitico", sottotitolo:"3.5 · L'acqua entra, l'acqua esce: chi misura la differenza",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"figura", tema:"chiaro", sopratitolo:"Micro-lezione 5 di 8", illu:"acqua",
  titolo:"Una lezione<br>fatta di **numeri**.",
  sotto:"Valori degli elettroliti, soglie della diuresi, quantità delle perdite: i quiz li chiedono secchi, i casi li usano per la trappola."},
{id:"s03", tipo:"frase", tema:"chiaro", sopratitolo:"L'idea semplice dietro i numeri",
  testo:"L'acqua entra, l'acqua esce: l'infermiere è la persona che **misura la differenza**."},

{id:"s04", tipo:"cifre", tema:"chiaro", sopratitolo:"L'acqua nel corpo · percento del peso", voci:[
  {n:60, suf:" %", t:"adulto"}, {n:50, suf:" %", t:"anziano", d:"meno riserva, meno sete", key:true}, {n:75, suf:" %", t:"lattante"}]},
{id:"s05", tipo:"cifre", tema:"chiaro", sopratitolo:"Dove sta", voci:[
  {n:2, suf:"/3", t:"dentro le cellule"}, {n:1, suf:"/3", t:"fuori", d:"interstizio e plasma: il terzo che si vede nei parametri", key:true}]},
{id:"s06", tipo:"tre", tema:"chiaro", sopratitolo:"L'anziano si disidrata prima, e se ne accorge dopo", box:[
  {n:"1", t:"Meno **riserva** idrica"}, {n:"2", t:"Meno **sete**"}, {n:"3", t:"Meno capacità di **concentrare** le urine", key:true}]},

{id:"s07", tipo:"bilancio", tema:"chiaro", sopratitolo:"Il bilancio idrico · le entrate", attive:{e:[0,1,2], u:[]}, entrate:ENTRATE, uscite:USCITE},
{id:"s08", tipo:"bilancio", tema:"chiaro", sopratitolo:"Il bilancio idrico · le uscite", attive:{e:[0,1,2,3,4], u:[0,1,2]}, entrate:ENTRATE, uscite:USCITE},
{id:"s09", tipo:"bilancio", tema:"chiaro", sopratitolo:"Le perdite insensibili non si raccolgono, ma ci sono", entrate:ENTRATE, uscite:USCITE},

{id:"s10", tipo:"trappola", tema:"chiaro", sopratitolo:"L'errore più comune del bilancio", righe:[
  {sb:"Contare solo ciò che si versa in un contenitore", ok:"**Perdite insensibili** e **entrate piccole**: diluizioni, lavaggi, la flebo che tiene pervia la via"}]},
{id:"s11", tipo:"titolo", tema:"tenue",
  titolo:"Mezzo litro al giorno<br>**non contato**.",
  sotto:"Nel cardiopatico o nel nefropatico è la differenza fra un paziente stabile e un edema polmonare."},

{id:"s12", tipo:"figura", tema:"chiaro", sopratitolo:"L'indicatore migliore nel tempo", illu:"bilancia",
  titolo:"**1 kg ≈ 1 litro**.",
  sotto:"Una variazione rapida di peso è acqua. Ma il dato vale solo se rilevato con metodo."},
{id:"s13", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Un peso preso a caso non è un dato: è un numero", celle:[
  {n:"1", t:"**Stesso orario**"}, {n:"2", t:"**Stessa bilancia**"}, {n:"3", t:"**Stessi indumenti**"},
  {n:"4", t:"A **vescica vuota**"}, {n:"5", t:"**Prima della colazione**", key:true}]},

{id:"s14", tipo:"fascia", tema:"chiaro", sopratitolo:"La diuresi · ml nelle 24 ore", min:0, max:3400, uguali:true, attive:[0,1,2], classi:DIURESI},
{id:"s15", tipo:"fascia", tema:"chiaro", sopratitolo:"La diuresi · nel critico si usa il valore orario: 0,5 ml/kg/h", min:0, max:3400, uguali:true, classi:DIURESI},
{id:"s16", tipo:"sostituzione", tema:"chiaro", sopratitolo:"La regola",
  da:{h:"Tardi", t:"segnalo l'anuria"}, a:{h:"In tempo", t:"segnalo il calo della diuresi"},
  sotto:"Un segnale precoce vale solo se qualcuno lo legge in tempo."},

{id:"s17", tipo:"elenco", tema:"chiaro", sopratitolo:"La disidratazione · i segni", voci:[
  {t:"Sete"}, {t:"Mucose secche"}, {t:"Urine scarse e concentrate"}, {t:"Tachicardia"},
  {t:"Ipotensione ortostatica"}, {t:"**Confusione**"}, {t:"Calo di peso"}]},
{id:"s18", tipo:"confronto", tema:"chiaro", sopratitolo:"Due avvertenze sull'anziano", col:[
  {h:"La sete può mancare", t:"Non aspettare che chieda: **offri** liquidi a intervalli programmati"},
  {h:"Il turgore cutaneo inganna", t:"La cute perde elasticità: se lo valuti, **fronte o sterno**, non il dorso della mano"}]},
{id:"s19", tipo:"sostituzione", tema:"chiaro", sopratitolo:"Nell'anziano",
  da:{h:"Ti aspetti", t:"sete"}, a:{h:"Vedi", t:"confusione"},
  sotto:"La disidratazione si presenta spesso come confusione, non come sete."},

{id:"s20", tipo:"corpo", tema:"chiaro", sopratitolo:"Il sovraccarico · dove cercare l'edema", lato:"entrambi", voci:[
  {z:"sacro", t:"Regione sacrale", d:"nell'allettato l'edema declive va **qui**", key:true},
  {z:"gambe", t:"Caviglie", d:"in chi sta seduto o in piedi"}]},
{id:"s21", tipo:"raggiera", tema:"chiaro", sopratitolo:"Il sovraccarico · il quadro dello scompenso (modulo 8)", centro:"Sovraccarico", raggi:[
  {t:"Peso", d:"aumenta", key:true}, {t:"Edemi", d:"declivi, sacrali"}, {t:"Dispnea", d:"e ortopnea"},
  {t:"Rantoli", d:"alle basi"}, {t:"Giugulari", d:"turgide"}, {t:"Pressione", d:"alta"}]},

{id:"s22", tipo:"distribuzione", tema:"chiaro", sopratitolo:"Le soluzioni · dove va l'acqua", attive:[0], voci:SOLUZ},
{id:"s23", tipo:"distribuzione", tema:"chiaro", sopratitolo:"Le soluzioni · la glucosata 5 % non espande il volume", attive:[0,1], voci:SOLUZ},
{id:"s24", tipo:"distribuzione", tema:"chiaro", sopratitolo:"Chi sceglie la glucosata per uno shock ha sbagliato soluzione", voci:SOLUZ},

{id:"s25", tipo:"fascia", tema:"chiaro", sopratitolo:"Il sodio · mEq/L", min:120, max:160, classi:NA},
{id:"s26", tipo:"confronto", tema:"chiaro", sopratitolo:"Il sodio · una regola per entrambe: correzione lenta", col:[
  {h:"Iponatriemia", t:"Sintomi **neurologici**: confusione, cefalea, nausea, convulsioni. Il cervello soffre per primo"},
  {h:"Ipernatriemia", t:"Sete, agitazione, confusione: tipica dell'**anziano disidratato**"}]},
{id:"s27", tipo:"titolo", tema:"profondo",
  titolo:"Il sodio si corregge<br>**lentamente**.",
  sotto:"Troppo in fretta: sindrome da demielinizzazione osmotica. L'infermiere garantisce la velocità prescritta e i controlli."},

{id:"s28", tipo:"fascia", tema:"chiaro", sopratitolo:"Il potassio · mEq/L · un intervallo stretto, perché governa il ritmo", min:2, max:7, classi:K},
{id:"s29", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, attive:[0,1], sopratitolo:"Il potassio", celle:KGRID},
{id:"s30", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Il potassio", celle:KGRID},

{id:"s31", tipo:"trappola", tema:"chiaro", sopratitolo:"Una trappola che riguarda l'infermiere", righe:[
  {sb:"«Potassio 6,2: tratto»", ok:"**Pseudo-iperkaliemia**: campione emolizzato, i globuli rossi rotti liberano potassio"}]},
{id:"s32", tipo:"elenco", tema:"chiaro", sopratitolo:"Le cause sono nostre · un potassio alto e inatteso si ricontrolla", voci:[
  {t:"**Laccio** tenuto troppo a lungo"}, {t:"Pugno aperto e chiuso più volte"}, {t:"Ago **sottile**"},
  {t:"Aspirazione vigorosa"}, {t:"Provetta agitata forte"}]},

{id:"s33", tipo:"norma", tema:"chiaro", sopratitolo:"Il farmaco più pericoloso della lezione",
  etichetta:"Cloruro di potassio concentrato", sigla:"Racc. n. 1",
  testo:"La **prima** Raccomandazione ministeriale mai pubblicata, e non a caso."},
{id:"s34", tipo:"titolo", tema:"profondo",
  titolo:"**Mai in bolo**.",
  sotto:"Una fiala di potassio in bolo endovenoso può arrestare il cuore. Nessuna eccezione, nessuna urgenza."},
{id:"s35", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Le regole", celle:[
  {n:"1", t:"**Sempre diluito**, alla concentrazione della procedura"}, {n:"2", t:"**Velocità controllata** con pompa"},
  {n:"3", t:"**Conservazione separata** dagli altri farmaci"}, {n:"4", t:"**Doppio controllo** indipendente", key:true}]},

{id:"s36", tipo:"fascia", tema:"chiaro", sopratitolo:"Il calcio · mg/dL", min:6, max:13, classi:CA},
{id:"s37", tipo:"confronto", tema:"chiaro", sopratitolo:"L'ipocalcemia · i due segni da conoscere", col:[
  {h:"Chvostek", t:"Contrazione dei muscoli **facciali** percuotendo davanti all'orecchio"},
  {h:"Trousseau", t:"**Spasmo carpale** gonfiando il bracciale dello sfigmomanometro — fino al laringospasmo"}]},
{id:"s38", tipo:"tre", tema:"chiaro", sopratitolo:"Il contesto", box:[
  {n:"1", t:"Dopo **tiroidectomia**", d:"lesione delle paratiroidi (modulo 9)", key:true},
  {n:"2", t:"Ipercalcemia", d:"stipsi, poliuria, confusione: spesso in oncologia"}]},

{id:"s39", tipo:"raggiera", tema:"chiaro", sopratitolo:"L'anziano e i liquidi · qui l'infermiere fa la differenza", centro:"Offrire", raggi:[
  {t:"Intervalli", d:"programmati, non a richiesta", key:true}, {t:"Preferenze", d:"acqua, tè, brodo, gelatine, frutta"},
  {t:"A portata", d:"visibili e raggiungibili"}, {t:"Diuretici", d:"attenzione nelle giornate calde"}, {t:"In bagno", d:"accompagnare, non far bere meno"}]},
{id:"s40", tipo:"figura", tema:"chiaro", sopratitolo:"Visibili e raggiungibili", illu:"bicchiere",
  titolo:"Non sul comodino<br>**dietro** la persona.",
  sotto:"Attenzione ai diuretici nelle giornate calde."},
{id:"s41", tipo:"trappola", tema:"chiaro", sopratitolo:"Un errore frequente da riconoscere", righe:[
  {sb:"«Beve poco per non bagnarsi: va bene così»", ok:"Meno liquidi = urine più concentrate, più irritazione, più infezioni. Si lavora sull'**accompagnamento in bagno**"}]},

{id:"s42", tipo:"frase", tema:"chiaro", sopratitolo:"Il caso d'esame",
  testo:"Anziano, **confuso da ieri**, mucose secche, diuresi **400 ml/24 h**, sodio **152**. Che cosa fai?"},
{id:"s43", tipo:"percorso", tema:"chiaro", sopratitolo:"La risposta strutturata (lezione 2.1)", attive:[0,1], tappe:CASO},
{id:"s44", tipo:"percorso", tema:"chiaro", sopratitolo:"La risposta strutturata (lezione 2.1)", tappe:CASO},

{id:"s45", tipo:"figura", tema:"chiaro", sopratitolo:"In Veneto", illu:"cartella",
  titolo:"Bilancio e diuresi<br>in **cartella elettronica**.",
  sotto:"Il saldo lo calcola il sistema, i dati li metti tu."},
{id:"s46", tipo:"tre", tema:"chiaro", sopratitolo:"Il potassio concentrato · le procedure aziendali (Racc. n. 1)", box:[
  {n:"1", t:"**Armadi dedicati** e separati"}, {n:"2", t:"Preparazioni **pronte all'uso**"}, {n:"3", t:"**Etichette** evidenti", key:true}]},

{id:"s47", tipo:"tre", tema:"chiaro", cifre:true, sopratitolo:"I numeri da portare via", box:[
  {t:"135–145", d:"**sodio**, mEq/L"}, {t:"3,5–5", d:"**potassio**, mEq/L"}, {t:"8,5–10,5", d:"**calcio**, mg/dL"}]},
{id:"s48", tipo:"tre", tema:"chiaro", cifre:true, sopratitolo:"I numeri da portare via", box:[
  {t:"0,5", d:"ml/kg/h — diuresi normale"}, {t:"< 400", d:"ml/24 h — oliguria"}, {t:"< 100", d:"ml/24 h — anuria"}, {t:"1 kg", d:"≈ 1 litro"}]},
{id:"s49", tipo:"tre", tema:"chiaro", sopratitolo:"E tre regole", box:[
  {n:"1", t:"Il potassio **mai in bolo**"}, {n:"2", t:"Il sodio si corregge **lentamente**"}, {n:"3", t:"All'anziano l'acqua **si offre**", key:true}]},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione",
  titolo:"3.6 Eliminazione urinaria e cateterismo", sottotitolo:"Quando il catetere serve, quando no,<br>e come non farlo diventare un'infezione",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
