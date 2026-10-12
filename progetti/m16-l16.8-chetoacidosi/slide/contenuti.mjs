// Contenuto delle 50 scene della lezione 16.8 — la chetoacidosi all'esordio:
// l'emergenza metabolica e la notizia. L'emogas sta nel corpo «ega», la
// trappola del potassio nel corpo «potassio» e nella misura con la soglia di
// 3,5; le prime azioni e l'educazione si riempiono a scalare; chetoacidosi e
// stato iperosmolare in tre colonne che si accendono; errori e risposta
// modello stanno in tabella.

const AZIONI = (att) => ({tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, celle:[
  {t:"**ABCDE** e avviso al medico"}, {t:"**Due** accessi venosi"},
  {t:"**ECG** continuo, per il potassio"}, {t:"**Fisiologica** secondo prescrizione · la prima priorità", key:true},
  {t:"Prelievi **seriati** ed emogas"}, {t:"**Diuresi** misurata con accuratezza"},
  {t:"Digiuno per bocca · **antiemetico**"}, {t:"Un **fattore scatenante**? un'infezione"}], attive:att});

const EDUCAZIONE = (att) => ({tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, celle:[
  {t:"**Iniezione** e rotazione delle sedi · o microinfusore"}, {t:"**Autocontrollo** · glucometro o sensore"},
  {t:"**Carboidrati** e dosi ai pasti"}, {t:"**Ipoglicemia** · riconoscerla, trattarla (regola del 15)"},
  {t:"**Glucagone** · anche familiari e amici"}, {t:"Giorni di malattia: **mai** sospendere la basale", key:true},
  {t:"Glicemia e **chetoni**, bere, chiamare"}, {t:"**Alcol**, sport, guida"}, {t:"**Associazioni** di pazienti"}],
  attive:att});

const CONFRONTO = (att, k) => ({tipo:"colonne", tema:"chiaro", attive:att, colonne:[
  {h:"Chetoacidosi", key:k===0, voci:[{t:"Tipo 1 · giovani", d:"esordio in ore o giorni"},
    {t:"Glicemia > 250"}, {t:"**Chetoni** ++ · acidosi", d:"Kussmaul, alito fruttato"}]},
  {h:"Stato iperosmolare", key:k===1, voci:[{t:"Tipo 2 · anziani", d:"esordio in giorni"},
    {t:"Glicemia molto alta", d:"spesso > 600"}, {t:"Chetoni assenti o lievi", d:"disidratazione **molto grave** · coscienza alterata"}]},
  {h:"In entrambi", key:k===2, voci:[{t:"Liquidi"}, {t:"Insulina"}, {t:"Potassio"}, {t:"Sorveglianza della **coscienza**"}]}]});

const COLLEGAMENTI = (att) => ({tipo:"griglia", tema:"chiaro", colonne:4, celle:[
  {n:"3.5", t:"Elettroliti"}, {n:"5.5", t:"Insuline"}, {n:"5.4", t:"Alto livello di attenzione"}, {n:"6.4", t:"Emogas"},
  {n:"8.3", t:"Diabete ed emergenze"}, {n:"11.6", t:"Educazione terapeutica"}, {n:"14.5", t:"Pancreas endocrino"}], attive:att});

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 16 · Casi clinici avanzati",
  titolo:"La chetoacidosi<br>all'esordio", sottotitolo:"16.8 · L'emergenza metabolica e una notizia che cambia la vita",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"bivio", tema:"chiaro", sopratitolo:"Micro-lezione 8 di 12 · spesso la diagnosi arriva così, in pronto soccorso",
  radice:"Chetoacidosi all'esordio", rami:[
  {q:"una faccia", t:"L'emergenza metabolica", d:"insulina in pompa, liquidi e potassio, ora per ora", key:true},
  {q:"l'altra", t:"Una ragazza di 19 anni", d:"una malattia per tutta la vita"}]},
{id:"s03", tipo:"tre", tema:"chiaro", sopratitolo:"L'altra faccia · le lezioni che servono", box:[
  {n:"3.5", t:"Elettroliti"}, {n:"5.5", t:"Insuline"}, {n:"6.4", t:"Emogas"},
  {n:"8.3", t:"Diabete", d:"e le sue emergenze", key:true}, {n:"11.6", t:"Educazione", d:"terapeutica"}]},

{id:"s04", tipo:"icone", tema:"chiaro", sopratitolo:"Lo scenario · Giulia, 19 anni, studentessa · da una decina di giorni", voci:[
  {icona:"bicchiere", t:"Beve molto"}, {icona:"goccia", t:"Urina spesso"},
  {icona:"bilancia", t:"Ha perso 5 kg", key:true}, {icona:"luna", t:"Sempre stanca"}]},
{id:"s05", tipo:"cifre", tema:"chiaro", sopratitolo:"Oggi: vomito, dolore addominale, respiro profondo e frequente, alito fruttato, sonnolenza", voci:[
  {n:"486", suf:"mg/dl", t:"Glicemia", key:true},
  {n:"5,2", suf:"mmol/L", t:"Chetonemia", d:"chetoni nel sangue"}]},
{id:"s06", tipo:"ega", tema:"chiaro", sopratitolo:"L'emogas, e gli altri esami", valori:{ph:7.12, co2:22, hco3:9},
  lettura:"K⁺ **5,4** mEq/L · Na⁺ 131 · FC 124 · PA 102/60"},
{id:"s07", tipo:"pausa", tema:"chiaro", sopratitolo:"In pronto soccorso", es:"metti in pausa",
  testo:"Come leggi l'**emogas**? E perché quel potassio «alto» è una **trappola**?",
  dati:["glicemia 486", "pH 7,12", "HCO₃⁻ 9", "K⁺ 5,4"]},

{id:"s08", tipo:"triade", tema:"chiaro", sopratitolo:"Esordio di un diabete di tipo 1 · tre elementi che, insieme, definiscono la chetoacidosi",
  centro:"Tutti e tre", nodi:[
  {t:"Iperglicemia", d:"glicemia 486"}, {t:"Chetonemia", d:"5,2 mmol/L"}, {t:"Acidosi metabolica", d:"pH 7,12 · HCO₃⁻ 9", key:true}]},
{id:"s09", tipo:"tabella", tema:"chiaro", sopratitolo:"I quattro passi della lezione 6.4", colonne:["40%","60%"],
  intestazioni:["Valore", "Lettura"], righe:[
  ["pH 7,12", "**acidemia**"],
  ["HCO₃⁻ 9", "origine **metabolica**"],
  ["PaCO₂ 22, bassa", "**compenso respiratorio**"]], chiave:[2]},
{id:"s10", tipo:"tre", tema:"chiaro", sopratitolo:"Che cosa vedi al letto", box:[
  {n:"Kussmaul", t:"Respiro profondo", d:"serve a eliminare la CO₂", key:true},
  {n:"FC 124 · PA 102/60", t:"Disidratazione importante", d:"tachicardia, pressione ai limiti"}]},

{id:"s11", tipo:"confronto", tema:"chiaro", sopratitolo:"La trappola del potassio", col:[
  {h:"Nel sangue", t:"5,4: normale, o un po' alto"},
  {h:"Nell'organismo", t:"potassio totale **ridotto**: perso con le urine e il vomito", grande:true}]},
{id:"s12", tipo:"potassio", tema:"chiaro", fase:"dopo", sopratitolo:"Acidosi e mancanza di insulina lo spingono fuori · l'insulina lo fa rientrare: ipokaliemia e aritmie"},
{id:"s13", tipo:"cifre", tema:"chiaro", sopratitolo:"Per questo, prima dell'insulina", voci:[
  {n:"≥ 3,5", suf:"mEq/L", t:"L'insulina si avvia con un potassio adeguato", d:"indicativamente", key:true},
  {n:"K⁺", t:"Si reintegra", d:"secondo protocollo, durante la terapia"}]},

{id:"s14", sopratitolo:"Le prime azioni · la disidratazione è grave", ...AZIONI([0,1,2,3])},
{id:"s15", sopratitolo:"Le prime azioni", ...AZIONI([0,1,2,3,4,5,6,7])},

{id:"s16", tipo:"catena", tema:"chiaro", sopratitolo:"L'insulina in infusione · secondo protocollo", passi:[
  {t:"Insulina **rapida**", d:"endovena"},
  {t:"Infusione **continua**", d:"con pompa"},
  {t:"**Doppio controllo**", d:"farmaco ad alto livello di attenzione", key:true}]},
{id:"s17", tipo:"icone", tema:"chiaro", sopratitolo:"Linea dedicata o chiaramente identificata · i controlli", voci:[
  {icona:"orologio", t:"Glicemia ogni ora", key:true},
  {icona:"provetta", t:"Chetonemia ed emogas", d:"secondo protocollo"},
  {icona:"cuore", t:"Potassio ogni 1–2 ore", d:"all'inizio"}]},
{id:"s18", tipo:"frase", tema:"chiaro", sopratitolo:"Un punto concettuale",
  testo:"L'obiettivo non è solo abbassare la glicemia: è **risolvere la chetosi** e l'acidosi."},

{id:"s19", tipo:"fascia", tema:"chiaro", sopratitolo:"Quando la glicemia scende · si normalizza prima che i chetoni scompaiano",
  min:100, max:520, classi:[
  {a:250, t:"si aggiunge la glucosata", d:"secondo protocollo", key:true},
  {da:250, t:"glicemia in discesa"}], marca:{v:486, t:"486 all'arrivo"}},
{id:"s20", tipo:"confronto", tema:"chiaro", sopratitolo:"Glucosata, mantenendo l'insulina · mai discese troppo rapide di glicemia e sodio", col:[
  {h:"L'insulina", t:"serve ancora a eliminare i **chetoni**"},
  {h:"Il glucosio", t:"evita l'**ipoglicemia**"}]},
{id:"s21", tipo:"raggiera", tema:"chiaro", sopratitolo:"Sorvegliare la coscienza · possibile edema cerebrale: raro, più frequente nei giovani · segnalare subito", centro:"Edema?",
  raggi:[{t:"Cefalea"}, {t:"Vomito"}, {t:"Bradicardia"}, {t:"Coscienza", d:"in calo", key:true}]},

{id:"s22", tipo:"catena", tema:"chiaro", sopratitolo:"Il passaggio all'insulina sottocutanea · un punto tecnico molto chiesto", passi:[
  {t:"Chetoacidosi **risolta**", d:"e la paziente mangia"},
  {t:"Insulina **basale** sottocutanea", key:true},
  {t:"**Poi** si sospende l'infusione"}]},
{id:"s23", tipo:"percorso", tema:"chiaro", sopratitolo:"L'insulina endovena ha un'azione brevissima: senza basale, la chetosi torna in poche ore", tappe:[
  {t:"Basale SC", d:"prima", key:true},
  {t:"Sovrapposizione", d:"indicativamente 1–2 ore, secondo protocollo"},
  {t:"Stop infusione", d:"dopo"},
  {t:"Basal-bolus", d:"con il team diabetologico"}]},

{id:"s24", tipo:"citazione", tema:"chiaro", sopratitolo:"La notizia · l'altra faccia del caso",
  testo:"«Quindi dovrò farmi le punture **per sempre**?»",
  fonte:"Giulia · prima l'ascolto: paura, rabbia, negazione"},
{id:"s25", tipo:"tre", tema:"chiaro", sopratitolo:"Poi un'informazione graduale · il messaggio di fondo", box:[
  {n:"1", t:"Non tutto il primo giorno"},
  {n:"2", t:"Realistico e incoraggiante"},
  {n:"3", t:"Una vita piena", d:"studio, sport, viaggi", key:true}]},
{id:"s26", tipo:"icone", tema:"chiaro", sopratitolo:"È maggiorenne", voci:[
  {icona:"persone", t:"Familiari", d:"secondo i suoi desideri"},
  {icona:"cuoremano", t:"Supporto psicologico"},
  {icona:"ospedale", t:"Team diabetologico", key:true}]},

{id:"s27", sopratitolo:"L'educazione · un percorso, non una lezione", ...EDUCAZIONE([0,1,2])},
{id:"s28", sopratitolo:"Le regole dei giorni di malattia · vitali nel tipo 1", ...EDUCAZIONE([0,1,2,3,4,5])},
{id:"s29", sopratitolo:"Per una giovane, le associazioni possono fare la differenza", ...EDUCAZIONE([0,1,2,3,4,5,6,7,8])},

{id:"s30", sopratitolo:"Approfondimento · chetoacidosi e stato iperosmolare, lezione 8.3", ...CONFRONTO([0], 0)},
{id:"s31", sopratitolo:"Chetoacidosi e stato iperosmolare a confronto", ...CONFRONTO([0,1], 1)},
{id:"s32", sopratitolo:"Chetoacidosi e stato iperosmolare a confronto", ...CONFRONTO([0,1,2], 2)},

{id:"s33", tipo:"tabella", tema:"chiaro", sopratitolo:"Gli errori da evitare · l'avvio", colonne:["52%","48%"],
  intestazioni:["Errore", "Invece"], righe:[
  ["no:Rassicurarsi per il potassio «normale»", "il totale è **ridotto**"],
  ["no:Insulina prima dei liquidi, senza il potassio", "prima i **liquidi** · K⁺ adeguato"],
  ["no:Insulina EV senza pompa né doppio controllo", "**pompa** e **doppio controllo**"]], chiave:[0]},
{id:"s34", tipo:"tabella", tema:"chiaro", sopratitolo:"Gli errori da evitare · dopo", colonne:["52%","48%"],
  intestazioni:["Errore", "Invece"], righe:[
  ["no:Sospendere l'insulina a glicemia normale", "la chetosi non è risolta"],
  ["no:Non aggiungere il glucosio", "glucosata vicino a **250**"],
  ["no:Sospendere l'infusione senza basale", "**basale prima**"],
  ["no:Tutte le informazioni il primo giorno", "educazione **graduale**"]], chiave:[2]},

{id:"s35", tipo:"frase", tema:"chiaro", sopratitolo:"D1 · «Che cos'è la chetoacidosi diabetica e come si riconosce?»",
  testo:"Un'emergenza da **carenza di insulina**: iperglicemia, chetoni e acidosi metabolica."},
{id:"s36", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"D1 · come si riconosce · poi D2: «Perché il potassio va sorvegliato?»", celle:[
  {t:"**Poliuria**"}, {t:"**Sete**"}, {t:"**Disidratazione**"}, {t:"**Vomito**"},
  {t:"Dolore **addominale**"}, {t:"Respiro di **Kussmaul**", key:true}, {t:"Alito **fruttato**"}, {t:"Coscienza **alterata**"}]},
{id:"s37", tipo:"catena", tema:"chiaro", sopratitolo:"D2 · poi D3: «Perché si dà glucosio mentre si continua l'insulina?»", passi:[
  {t:"Totale **ridotto**", d:"anche se il valore sembra normale"},
  {t:"Con l'**insulina** rientra", d:"nelle cellule"},
  {t:"Il valore **crolla**", d:"rischio di aritmie", key:true}]},
{id:"s38", tipo:"tre", tema:"chiaro", sopratitolo:"D3 · la glicemia si normalizza prima della chetosi", box:[
  {n:"Insulina", t:"Elimina i chetoni", key:true},
  {n:"Glucosio", t:"Evita l'ipoglicemia"}]},

{id:"s39", tipo:"citazione", tema:"chiaro", sopratitolo:"La risposta modello · 1",
  testo:"Giovane con poliuria, polidipsia e calo di peso, ora con vomito, dolore addominale, **Kussmaul**, alito fruttato e sonnolenza; glicemia 486, chetoni e acidosi metabolica.",
  fonte:"Chi è · che cosa ha"},
{id:"s40", tipo:"tabella", tema:"chiaro", sopratitolo:"La risposta modello · 2", colonne:["28%","72%"],
  intestazioni:["Passo", "Che cosa scrivo"], righe:[
  ["Ipotesi", "chetoacidosi all'esordio di un diabete di **tipo 1**"],
  ["Priorità", "disidratazione, carenza di insulina, acidosi · **prevenendo** le alterazioni del potassio"],
  ["Subito", "ABCDE · medico · due accessi · ECG"]], chiave:[1]},
{id:"s41", tipo:"tabella", tema:"chiaro", sopratitolo:"La risposta modello · 3", colonne:["28%","72%"],
  intestazioni:["Passo", "Che cosa scrivo"], righe:[
  ["Liquidi", "fisiologica secondo prescrizione · diuresi"],
  ["Insulina", "EV in pompa · **doppio controllo** · potassio adeguato e reintegrato"],
  ["Controlli", "glicemia ogni ora · chetoni · emogas · potassio"]], chiave:[1]},
{id:"s42", tipo:"tabella", tema:"chiaro", sopratitolo:"La risposta modello · 4", colonne:["28%","72%"],
  intestazioni:["Passo", "Che cosa scrivo"], righe:[
  ["Vicino a 250", "glucosata, **mantenendo** l'insulina · coscienza"],
  ["Passaggio SC", "la **basale prima** di sospendere l'infusione"],
  ["La persona", "accolgo le emozioni · educazione **graduale**"]], chiave:[1]},

{id:"s43", sopratitolo:"I collegamenti", ...COLLEGAMENTI([0,1,2,3])},
{id:"s44", sopratitolo:"I collegamenti", ...COLLEGAMENTI([0,1,2,3,4,5,6])},

{id:"s45", tipo:"raggiera", tema:"chiaro", sopratitolo:"Il punto di vista della paziente · alto il rischio di scarsa aderenza", centro:"A 19 anni",
  raggi:[{t:"Identità", key:true}, {t:"Autonomia"}, {t:"Relazioni"}, {t:"Studio"}, {t:"Futuro"}]},
{id:"s46", tipo:"sostituzione", tema:"chiaro", sopratitolo:"La risposta",
  da:{h:"Non", t:"il controllo"}, a:{h:"Ma", t:"l'**alleanza**"},
  sotto:"obiettivi condivisi · tecnologie che semplificano, come i sensori · «glicemia alta», non «glicemia cattiva»"},
{id:"s47", tipo:"figura", tema:"chiaro", sopratitolo:"Il colloquio e l'educazione terapeutica", illu:"dialogo",
  titolo:"Gli strumenti<br>della **lezione 11.6**", sotto:"applicati a una persona giovane."},

{id:"s48", tipo:"titolo", tema:"profondo",
  titolo:"Nella chetoacidosi la glicemia<br>si corregge in fretta,<br>i **chetoni no**.",
  sotto:"L'insulina si sospende per ultima, e mai senza la basale."},

{id:"s49", tipo:"tre", tema:"chiaro", sopratitolo:"Nella prossima lezione · un paziente in nutrizione enterale", box:[
  {n:"1", t:"Polmonite da inalazione"},
  {n:"2", t:"Rialimentazione", d:"la complicanza che pochi conoscono", key:true}]},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione · 16.9",
  titolo:"La nutrizione<br>enterale", sottotitolo:"Polmonite da inalazione e rialimentazione",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
