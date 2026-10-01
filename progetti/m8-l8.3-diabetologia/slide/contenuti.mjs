// Contenuto delle 50 scene della lezione 8.3 — diabetologia e malattie
// endocrine. Due corpi nuovi: il potassio (la cellula con i K⁺ che
// entrano quando arriva l'insulina, e la curva del potassio plasmatico
// che scende) e il sensore (la glicemia nel sangue e il glucosio
// interstiziale che la segue con 10–15 minuti di ritardo). Il confronto
// chetoacidosi e stato iperosmolare in colonne; la glicemia in fascia.

const DKA = {h:"Chetoacidosi", key:true, voci:[{t:"**Tipo 1**"}, {t:"Glicemia **> 250**"}, {t:"**Acidosi e chetoni**", key:true}, {t:"**Kussmaul**, alito acetonico"}, {t:"Esordio in **ore**"}]};
const HHS = {h:"Stato iperosmolare", voci:[{t:"**Tipo 2**"}, {t:"Glicemia **> 600**"}, {t:"Chetoni assenti o modesti"}, {t:"Niente Kussmaul"}, {t:"Esordio in **giorni**, disidratazione **grave**", key:true}]};

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 8 · Assistenza in area medica",
  titolo:"Diabetologia<br>e malattie endocrine", sottotitolo:"8.3 · Chetoacidosi, stato iperosmolare, educazione",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"frase", tema:"chiaro", sopratitolo:"Micro-lezione 3 di 8 · una delle malattie croniche più diffuse",
  testo:"In ospedale lo trovi in **quasi ogni reparto**, anche quando non è il motivo del ricovero."},
{id:"s03", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"I farmaci li abbiamo visti nella lezione 5.5 · qui", celle:[
  {n:"1", t:"La **malattia**"}, {n:"2", t:"Le **emergenze**: chetoacidosi e stato iperosmolare", key:true}, {n:"3", t:"L'**educazione**, la parte più infermieristica della cura"}]},

{id:"s04", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"Due forme principali · il tipo 1", celle:[
  {n:"1", t:"**Autoimmune**: il sistema immunitario distrugge le cellule che producono insulina; la carenza è **assoluta**", key:true}]},
{id:"s05", tipo:"griglia", tema:"chiaro", colonne:1, spunta:true, sopratitolo:"Il tipo 1", celle:[
  {t:"Esordisce spesso in **età giovane**"}, {t:"Richiede **insulina da subito**"}, {t:"L'emergenza tipica: la **chetoacidosi**", key:true}]},
{id:"s06", tipo:"confronto", tema:"chiaro", sopratitolo:"Il tipo 2 · insulino-resistenza con un deficit relativo", col:[
  {h:"Tipo 1", t:"autoimmune, carenza **assoluta**, giovane: **chetoacidosi**"}, {h:"Tipo 2", t:"**insulino-resistenza**, adulto in sovrappeso, esordio lento e silente: **stato iperosmolare**", key:true}]},

{id:"s07", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"I criteri diagnostici", celle:[
  {n:"126", t:"**mg/dl** a digiuno, confermata", key:true}, {n:"6,5", t:"**%** di emoglobina glicata"}, {n:"200", t:"**mg/dl** due ore dopo il carico orale di glucosio"}]},
{id:"s08", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"Oppure · l'emoglobina glicata riflette la media degli ultimi 2–3 mesi", celle:[
  {n:"200", t:"**mg/dl** casuale, con i sintomi tipici: **poliuria, polidipsia, calo di peso**", key:true}]},

{id:"s09", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"La glicemia capillare, gesto quotidiano · residui di zucchero sulle dita falsano il valore", celle:[
  {t:"**Mani lavate** con acqua e asciugate", key:true}, {t:"Il **lato del polpastrello**, meno doloroso, ruotando le dita"}]},
{id:"s10", tipo:"griglia", tema:"chiaro", colonne:1, spunta:true, sopratitolo:"La glicemia è un dato, non una diagnosi", celle:[
  {t:"Strumento **controllato** secondo procedura"}, {t:"**Orario** e **rapporto con il pasto**"}, {t:"Un valore anomalo e inatteso **si ripete**, guardando la persona", key:true}]},

{id:"s11", tipo:"frase", tema:"chiaro", sopratitolo:"I sensori per il monitoraggio continuo o flash",
  testo:"Sempre più diffusi: molti pazienti arrivano in ospedale **con il loro**."},
{id:"s12", tipo:"sensore", tema:"chiaro", sopratitolo:"Misurano il glucosio nel liquido interstiziale, non nel sangue"},
{id:"s13", tipo:"trappola", tema:"chiaro", sopratitolo:"Il sensore racconta il passato prossimo, il dito racconta adesso", righe:[
  {sb:"Trattare l'ipoglicemia sul valore del sensore", ok:"In ipoglicemia, o con un valore discordante dai sintomi: **conferma con la glicemia capillare**"}]},

{id:"s14", tipo:"percorso", tema:"chiaro", sopratitolo:"L'insulina in ospedale · lo schema raccomandato: basal-bolus", tappe:[
  {t:"Basale", key:true}, {t:"Rapida", d:"ai pasti"}, {t:"Correzione", d:"se la glicemia è alta"}]},
{id:"s15", tipo:"trappola", tema:"chiaro", sopratitolo:"La sola scala di correzione", righe:[
  {sb:"Solo la «scala», senza basale: insegue la glicemia", ok:"Il **basal-bolus** la **previene**"}]},
{id:"s16", tipo:"cifre", tema:"chiaro", sopratitolo:"Gli obiettivi in reparto · né l'ipoglicemia del ricoverato, né la glicemia che bagna le ferite", voci:[
  {n:"140–180", suf:"mg/dl", d:"nella maggior parte dei pazienti, indicativamente", key:true}]},
{id:"s17", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Due regole pratiche", celle:[
  {t:"La rapida **si coordina con il pasto**: se il vassoio è in ritardo, si aspetta", key:true}, {t:"Paziente **a digiuno**: lo schema si rivede con il medico"}]},

{id:"s18", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"L'ipoglicemia · la lezione 5.5", celle:[
  {t:"Sotto **70**"}, {t:"**Regola del 15**", key:true}, {t:"Incosciente: **niente per bocca**"}, {t:"**Glucagone** o glucosio endovena"}]},
{id:"s19", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Qui aggiungo un passo: cercare la causa", celle:[
  {n:"1", t:"**Pasto saltato**, dose eccessiva"}, {n:"2", t:"**Attività fisica**, alcol"}, {n:"3", t:"**Funzione renale** peggiorata: rallenta l'eliminazione di insulina e sulfaniluree", key:true}]},
{id:"s20", tipo:"frase", tema:"chiaro", sopratitolo:"Senza la causa, l'ipoglicemia si ripete",
  testo:"Lo zucchero corregge il **numero**, la causa corregge il **paziente**."},

{id:"s21", tipo:"catena", tema:"chiaro", sopratitolo:"La chetoacidosi diabetica · tipica del tipo 1, a volte proprio al suo esordio", passi:[
  {t:"Senza insulina"}, {t:"Si bruciano i grassi"}, {t:"Corpi chetonici", d:"acidi", key:true}]},
{id:"s22", tipo:"tre", tema:"chiaro", sopratitolo:"Il quadro", box:[
  {n:"1", t:"Glicemia elevata", d:"indicativamente > 250"}, {n:"2", t:"Acidosi metabolica", d:"", key:true}, {n:"3", t:"Chetoni", d:"nel sangue e nelle urine"}]},
{id:"s23", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"I segni · il respiro di Kussmaul della lezione 6.4", celle:[
  {n:"1", t:"Poliuria, sete, **disidratazione**"}, {n:"2", t:"Nausea, vomito, **dolore addominale**: può simulare un addome acuto"}, {n:"3", t:"**Kussmaul**, **alito acetonico**", key:true}, {n:"4", t:"Alterazione della **coscienza**"}]},

{id:"s24", tipo:"percorso", tema:"chiaro", sopratitolo:"Il trattamento, che l'infermiere gestisce minuto per minuto", tappe:[
  {t:"Liquidi", d:"la disidratazione è grave"}, {t:"Insulina", d:"infusione endovenosa continua, con pompa"}, {t:"Potassio", d:"il punto che i concorsi chiedono", key:true}]},
{id:"s25", tipo:"potassio", tema:"chiaro", sopratitolo:"L'insulina spinge il potassio dentro le cellule · durante il trattamento il potassio plasmatico scende"},
{id:"s26", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Si controlla spesso e si reintegra · per il rischio di aritmie", celle:[
  {t:"L'insulina **non si avvia** se il potassio di partenza è troppo basso", key:true}, {t:"**Glicemia oraria**"}, {t:"Bilancio idrico, **coscienza**"}, {t:"**Emogas**"}]},

{id:"s27", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"Lo stato iperosmolare · tipico dell'anziano con diabete di tipo 2", celle:[
  {n:"600", t:"**mg/dl**: glicemia molto elevata, spesso oltre; sangue iperosmolare, **disidratazione grave**, coscienza alterata fino al coma", key:true}]},
{id:"s28", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Chetoni assenti o modesti · spesso un anziano che beve poco o ha un'infezione", celle:[
  {n:"✗", t:"**Niente Kussmaul**, niente alito acetonico"}, {n:"→", t:"Esordio **lento**, nell'arco di giorni", key:true}]},
{id:"s29", tipo:"frase", tema:"chiaro", sopratitolo:"La mortalità è più alta di quella della chetoacidosi",
  testo:"Il trattamento si basa soprattutto sui **liquidi**, oltre all'insulina."},

{id:"s30", tipo:"colonne", tema:"chiaro", sopratitolo:"Il confronto in una tabella", colonne:[DKA, {h:"Stato iperosmolare", voci:[{t:"…"}]}]},
{id:"s31", tipo:"colonne", tema:"chiaro", sopratitolo:"Il confronto · sei righe, e il quiz le incrocia", colonne:[DKA, HHS]},

{id:"s32", tipo:"griglia", tema:"chiaro", colonne:1, spunta:true, sopratitolo:"L'educazione terapeutica, il cuore dell'assistenza al diabetico", celle:[
  {t:"**Autocontrollo** glicemico", key:true}, {t:"Tecnica di **iniezione** e **rotazione** delle sedi"}, {t:"Riconoscere e trattare l'**ipoglicemia**"}]},
{id:"s33", tipo:"trappola", tema:"chiaro", sopratitolo:"Le regole per i giorni di malattia, che molti ignorano · è proprio così che nasce la chetoacidosi", righe:[
  {sb:"Febbre, non mangio: sospendo l'insulina", ok:"**Non si sospende l'insulina basale**"}]},
{id:"s34", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Nei giorni di malattia · poi alimentazione, attività fisica, cura del piede (7.3), guida e lavoro · sempre con il teach-back", celle:[
  {t:"**Misurare più spesso**", key:true}, {t:"**Bere**"}, {t:"**Contattare il medico**"}]},

{id:"s35", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"La tiroide, in sintesi · l'ipotiroidismo rallenta tutto", celle:[
  {n:"1", t:"**Astenia**, intolleranza al **freddo**", key:true}, {n:"2", t:"**Bradicardia**, stipsi"}, {n:"3", t:"**Aumento di peso**, cute secca"}]},
{id:"s36", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"L'ipertiroidismo accelera tutto · nel morbo di Graves l'esoftalmo", celle:[
  {n:"1", t:"**Tachicardia**, a volte fibrillazione atriale", key:true}, {n:"2", t:"**Calo di peso**, tremori"}, {n:"3", t:"Intolleranza al **caldo**, agitazione"}]},
{id:"s37", tipo:"cifre", tema:"chiaro", sopratitolo:"Un'indicazione pratica ricorrente · il cibo ne riduce l'assorbimento", voci:[
  {n:"30–60", suf:"min", d:"prima della colazione: la levotiroxina, a digiuno", key:true}]},

{id:"s38", tipo:"trappola", tema:"chiaro", sopratitolo:"Il surrene · chi assume corticosteroidi a lungo ha il surrene «addormentato»", righe:[
  {sb:"Sospendere bruscamente la terapia", ok:"Si **riduce gradualmente**"}]},
{id:"s39", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Nelle situazioni di stress, un intervento, un'infezione · la crisi surrenalica", celle:[
  {n:"1", t:"**Ipotensione**", key:true}, {n:"2", t:"**Ipoglicemia**"}, {n:"3", t:"**Iponatriemia**"}, {n:"4", t:"Fino allo **shock**"}]},
{id:"s40", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Gli effetti dei corticosteroidi da sorvegliare · come nella lezione 7.1", celle:[
  {n:"1", t:"**Iperglicemia**", key:true}, {n:"2", t:"**Ritenzione idrica**"}, {n:"3", t:"**Osteoporosi**, infezioni"}, {n:"4", t:"**Ritardo di guarigione** delle ferite"}]},

{id:"s41", tipo:"frase", tema:"chiaro", sopratitolo:"Il caso · ragazzo di 19 anni con diabete di tipo 1 · da due giorni febbre e vomito, ha sospeso l'insulina perché non mangiava",
  testo:"Ora è **sonnolento**, respira **profondamente**, alito **fruttato**. Che cosa pensi?"},
{id:"s42", tipo:"percorso", tema:"chiaro", sopratitolo:"Chetoacidosi, causata proprio dalla sospensione dell'insulina nei giorni di malattia · che cosa fai", tappe:[
  {t:"Glicemia, chetonemia"}, {t:"Medico", d:"avviso immediato", key:true}, {t:"Accesso venoso"}, {t:"Prelievi, emogas"}, {t:"Monitoraggio"}]},
{id:"s43", tipo:"griglia", tema:"chiaro", colonne:1, spunta:true, sopratitolo:"E la preparazione", celle:[
  {t:"**Liquidi**"}, {t:"**Insulina in infusione**"}, {t:"Con **controllo del potassio**", key:true}]},
{id:"s44", tipo:"titolo", tema:"profondo",
  titolo:"L'emergenza di oggi è la **lezione che non è stata fatta ieri**.",
  sotto:"A distanza, l'educazione alle regole dei giorni di malattia."},

{id:"s45", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"In Veneto", celle:[
  {n:"1", t:"**Percorsi diagnostico-terapeutici** che integrano i servizi di diabetologia e i medici di medicina generale", key:true}, {n:"2", t:"**Educazione terapeutica** strutturata, spesso affidata agli infermieri"}]},
{id:"s46", tipo:"frase", tema:"chiaro", sopratitolo:"E fornitura dei dispositivi per l'autocontrollo tramite il distretto · il modulo 13",
  testo:"Il modello della **gestione integrata** della cronicità."},

{id:"s47", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Ricapitoliamo", celle:[
  {t:"**Tipo 1**: chetoacidosi · **tipo 2**: stato iperosmolare", key:true}, {t:"Diagnosi: digiuno da **126**, glicata da **6,5**"}, {t:"Sensore: ritardo di **10–15 minuti**"}, {t:"**Basal-bolus**, target **140–180**"}]},
{id:"s48", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Ricapitoliamo", celle:[
  {t:"Chetoacidosi: **liquidi**, **insulina endovena**, attenzione al **potassio**", key:true}, {t:"Nei giorni di malattia **non si sospende l'insulina**"}, {t:"**Levotiroxina** a digiuno"}, {t:"Corticosteroidi: **mai sospensione brusca**"}]},
{id:"s49", tipo:"frase", tema:"chiaro", sopratitolo:"Nella prossima lezione",
  testo:"**Rene** e vie urinarie."},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione",
  titolo:"8.4<br>Nefrologia<br>e urologia", sottotitolo:"La fistola, la dialisi, l'oliguria",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
