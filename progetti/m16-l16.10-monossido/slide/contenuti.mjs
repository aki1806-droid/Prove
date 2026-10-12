// Contenuto delle 50 scene della lezione 16.10 — una famiglia intossicata dal
// monossido. La famiglia sono quattro cifre; la notte un percorso; i livelli di
// carbossiemoglobina barre vere; normobarico e iperbarico una scala; i segni
// tardivi la sagoma con gli apparati; più pazienti insieme un percorso che si
// accende; errori e risposta modello stanno in griglia e in tabella.

const LEZIONI = [
  {n:"8.2", t:"Ossigeno e saturimetro", illu:"polmoni"},
  {n:"10.1", t:"Triage", illu:"semaforo"},
  {n:"10.7", t:"Intossicazioni", illu:"fiala"},
  {n:"11.4", t:"Pediatria", illu:"persona"},
  {n:"14.3", t:"Curva di dissociazione", illu:"goccia"}];

const ELIMINAZIONE = att => ({tipo:"scala", tema:"chiaro", attive:att, gradini:[
  {t:"Aria", d:"eliminazione lenta"},
  {t:"O₂ 100% normobarico", d:"riduce molto il tempo di eliminazione"},
  {t:"O₂ iperbarico", d:"ancora più rapido · forse meno danni neurologici tardivi", key:true}]});

const TARDIVE = att => ({tipo:"apparati", tema:"chiaro", attive:att, voci:[
  {k:"neuro", t:"Sindrome neurologica tardiva", d:"memoria, concentrazione, personalità, movimento", key:true},
  {k:"cardio", t:"Danno cardiaco", d:"aritmie, ischemia"}]});

const INSIEME = (att, k) => ({tipo:"percorso", tema:"chiaro", attive:att, tappe:[
  {t:"Triage di ciascuno", d:"priorità ai più gravi", key:k===0},
  {t:"Identificazione", d:"stesso cognome: campioni e referti", key:k===1},
  {t:"Operatore di riferimento", key:k===2},
  {t:"Comunicazione coordinata", d:"con la famiglia", key:k===3},
  {t:"Documentazione", d:"separata e completa", key:k===4},
  {t:"Afflusso straordinario", d:"se si superano le risorse · lezione 10.7", key:k===5}]});

const ERRORI = att => ({tipo:"griglia", tema:"tenue", colonne:2, attive:att, celle:[
  {no:true, t:"Fidarsi della **saturimetria**"},
  {no:true, t:"Attribuire i sintomi all'**influenza**"},
  {no:true, t:"**Aspettare** gli esami per l'ossigeno"},
  {no:true, t:"Valutare **solo** chi ha sintomi gravi"},
  {no:true, t:"**Scambiare** i campioni dei familiari"},
  {no:true, t:"Dimenticare il **test di gravidanza**"},
  {no:true, t:"Dimettere senza **prevenzione**, rilevatori, verifica della casa"}]});

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 16 · Casi clinici avanzati",
  titolo:"Il monossido<br>in famiglia", sottotitolo:"16.10 · Una famiglia intossicata dal monossido",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"tre", tema:"chiaro", sopratitolo:"Micro-lezione 10 di 12 · un caso con una particolarità", box:[
  {n:"4", t:"Pazienti", d:"tutti della stessa famiglia"},
  {n:"CO", t:"Un nemico invisibile", d:"il monossido di carbonio", key:true},
  {n:"Inverno", t:"Frequente", d:"nei mesi freddi"}]},
{id:"s03", tipo:"tre", tema:"chiaro", sopratitolo:"Insidioso nei sintomi, ingannevole nei parametri · mette alla prova", box:[
  {n:"1", t:"Il triage", d:"di più pazienti"},
  {n:"2", t:"Il trasporto dell'ossigeno", d:"la fisiologia", key:true},
  {n:"3", t:"La prevenzione", d:"l'educazione"}]},
{id:"s04", tipo:"anello", tema:"chiaro", sopratitolo:"Le lezioni che servono",
  centro:"16.10", sotto:"il monossido", voci:LEZIONI},

{id:"s05", tipo:"cifre", tema:"chiaro", sopratitolo:"Gennaio, ore 8 · il 118 porta in pronto soccorso un'intera famiglia", voci:[
  {n:"45", t:"il padre", d:"anni"}, {n:"38", t:"la madre", d:"anni", key:true},
  {n:"12", t:"un figlio", d:"anni"}, {n:"8", t:"l'altro figlio", d:"anni", key:true}]},
{id:"s06", tipo:"percorso", tema:"chiaro", sopratitolo:"Da ieri sera a stamattina", tappe:[
  {t:"Ieri sera", d:"tutti: cefalea, nausea, vertigini"},
  {t:"Stamattina", d:"la madre perde coscienza per pochi secondi in bagno", key:true},
  {t:"Il bambino di 8 anni", d:"sonnolento e confuso", key:true}]},
{id:"s07", tipo:"pausa", tema:"chiaro", sopratitolo:"In casa · una caldaia vecchia", es:"metti in pausa",
  testo:"Il **gatto** è stato trovato morto. Al saturimetro, tutti fra **97 e 99%**. Che cosa sospetti? E perché quelle saturazioni **non** ti tranquillizzano?",
  dati:["caldaia vecchia", "gatto morto", "SpO₂ 97–99%"]},

{id:"s08", tipo:"raggiera", tema:"chiaro", sopratitolo:"Il ragionamento · che cosa hanno in comune", centro:"Monossido?",
  raggi:[{t:"Più persone"}, {t:"Stessa casa"}, {t:"Inverno"}, {t:"Combustione"}, {t:"Gatto morto", key:true}]},
{id:"s09", tipo:"griglia", tema:"chiaro", colonne:4, spunta:false, sopratitolo:"Monossido fino a prova contraria · sintomi aspecifici", celle:[
  {t:"**Cefalea** · la più frequente"}, {t:"**Nausea**"}, {t:"**Vertigini**"}, {t:"**Astenia**"},
  {t:"**Confusione**"}, {t:"**Sincope**"}, {t:"**Dolore** toracico"}]},
{id:"s10", tipo:"frase", tema:"chiaro", sopratitolo:"Perché sfugge",
  testo:"Spesso scambiata per un'**influenza**, o per un'intossicazione **alimentare**.",
  sotto:"E le saturazioni normali non tranquillizzano, per un motivo preciso."},

{id:"s11", tipo:"cifre", tema:"chiaro", sopratitolo:"Perché il saturimetro inganna", voci:[
  {n:"200–250", suf:"volte", t:"l'affinità del monossido per l'emoglobina", d:"rispetto all'ossigeno → **carbossiemoglobina**", key:true}]},
{id:"s12", tipo:"confronto", tema:"chiaro", sopratitolo:"Un limite del saturimetro · lezione 8.2", col:[
  {h:"Al saturimetro", t:"**97–99%**", grande:true},
  {h:"Ma non distingue", t:"la **carbossiemoglobina** dall'ossiemoglobina"}],
  sotto:"Il valore è **falsamente normale**."},
{id:"s13", tipo:"catena", tema:"chiaro", sopratitolo:"E in più · lezione 14.3", passi:[
  {t:"Curva di dissociazione **a sinistra**"},
  {t:"L'ossigeno rimasto ceduto **a fatica** ai tessuti"},
  {t:"Serve la **co-ossimetria**", d:"emogas o dispositivi dedicati", key:true}]},

{id:"s14", tipo:"icone", tema:"chiaro", sopratitolo:"Il triage e le prime azioni", voci:[
  {icona:"persone", t:"Tutti gli esposti", d:"anche chi ha pochi sintomi"},
  {icona:"avviso", t:"La madre", d:"ha perso coscienza", key:true},
  {icona:"avviso", t:"Il bambino di 8 anni", d:"è confuso", key:true}]},
{id:"s15", tipo:"cifre", tema:"chiaro", sopratitolo:"Subito, a tutti i sintomatici, senza aspettare gli esami: è il trattamento", voci:[
  {n:"100", suf:"%", t:"ossigeno", d:"maschera con reservoir", key:true},
  {n:"10–15", suf:"L/min", t:"il flusso"}]},
{id:"s16", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Poi", celle:[
  {t:"**Parametri**, GCS, glicemia"}, {t:"**ECG**: il monossido può danneggiare il cuore"},
  {t:"**Emogas** con la carbossiemoglobina"}, {t:"**Avvisare** il medico"}]},

{id:"s17", tipo:"barre", tema:"chiaro", sopratitolo:"I risultati · carbossiemoglobina", unita:"%", barre:[
  {et:"Madre", v:28}, {et:"Bambino, 8 anni", v:22}, {et:"Padre", v:15}, {et:"Figlio, 12 anni", v:9}]},
{id:"s18", tipo:"frase", tema:"chiaro", sopratitolo:"Normalmente bassi nella popolazione, un po' più alti nei fumatori",
  testo:"Il livello **non** corrisponde perfettamente alla gravità.",
  sotto:"Anche perché scende con il tempo trascorso."},
{id:"s19", tipo:"tre", tema:"chiaro", sopratitolo:"Scende anche con l'ossigeno del trasporto · contano soprattutto i sintomi", box:[
  {n:"1", t:"Perdita di coscienza"}, {n:"2", t:"Segni neurologici"}, {n:"3", t:"Danno cardiaco"},
  {n:"+", t:"Test di gravidanza", d:"nella donna in età fertile", key:true}]},

{id:"s20", sopratitolo:"Il trattamento · l'eliminazione del monossido", ...ELIMINAZIONE([0,1])},
{id:"s21", sopratitolo:"Nella camera iperbarica", ...ELIMINAZIONE([0,1,2])},
{id:"s22", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Le indicazioni all'iperbarica · le valuta il medico, per esempio", celle:[
  {t:"**Perdita** di coscienza"}, {t:"Segni **neurologici**"},
  {t:"Danno **cardiaco**"}, {t:"Livelli **molto elevati**"},
  {t:"**Gravidanza**: l'emoglobina fetale lega il monossido ancora più avidamente"}]},
{id:"s23", tipo:"icone", tema:"chiaro", sopratitolo:"Candidati alla valutazione per il trasferimento", voci:[
  {icona:"persona", t:"La madre", d:"ha perso coscienza", key:true},
  {icona:"persona", t:"Forse il bambino", d:"confuso"},
  {icona:"ospedale", t:"Centro di medicina iperbarica"}]},

{id:"s24", tipo:"tre", tema:"chiaro", sopratitolo:"I bambini · un'attenzione particolare", box:[
  {n:"1", t:"Respirano più rapidamente"},
  {n:"2", t:"Si intossicano prima e di più", key:true},
  {n:"3", t:"Sintomi vaghi", d:"irritabilità, sonnolenza, vomito"},
  {n:"4", t:"Maschere pediatriche"}]},
{id:"s25", tipo:"icone", tema:"chiaro", sopratitolo:"Se entrambi i genitori sono in trattamento", voci:[
  {icona:"chat", t:"Comunicazione adatta all'età"},
  {icona:"persone", t:"Un genitore o un familiare", d:"quando possibile"},
  {icona:"persona", t:"Un adulto di riferimento", d:"per i figli", key:true},
  {icona:"cuoremano", t:"I servizi", d:"se serve"}]},

{id:"s26", sopratitolo:"Le complicanze tardive · giorni o settimane dopo un'apparente guarigione", ...TARDIVE([0])},
{id:"s27", sopratitolo:"Follow-up neurologico · alla dimissione, quali sintomi segnalare", ...TARDIVE([0,1])},

{id:"s28", tipo:"figura", tema:"chiaro", illu:"casa", sopratitolo:"La casa e la prevenzione",
  titolo:"Non si rientra finché la fonte non è **messa in sicurezza**.", sotto:"Verificata dai vigili del fuoco o dai tecnici."},
{id:"s29", tipo:"icone", tema:"chiaro", sopratitolo:"L'educazione", voci:[
  {icona:"ingranaggio", t:"Manutenzione periodica", d:"caldaie, stufe, canne fumarie"},
  {icona:"avviso", t:"Rilevatori di monossido", d:"economici, salvano vite", key:true},
  {icona:"casa", t:"Aerazione dei locali"}]},
{id:"s30", tipo:"griglia", tema:"chiaro", colonne:1, sopratitolo:"Mai al chiuso", celle:[
  {no:true, t:"**Mai** bracieri, generatori o barbecue al chiuso"},
  {no:true, t:"**Mai** motori accesi in garage chiusi"},
  {t:"Attenzione agli **altri appartamenti** dello stesso edificio"}]},

{id:"s31", sopratitolo:"Un approfondimento organizzativo · più pazienti insieme", ...INSIEME([0], 0)},
{id:"s32", sopratitolo:"Quattro familiari, lo stesso cognome · rischio altissimo", ...INSIEME([0,1], 1)},
{id:"s33", sopratitolo:"E se i pazienti superano le risorse", ...INSIEME([0,1,2,3,4,5], 5)},

{id:"s34", sopratitolo:"Gli errori da evitare", ...ERRORI([0,1,2,3])},
{id:"s35", sopratitolo:"Gli errori da evitare", ...ERRORI([0,1,2,3,4,5,6])},

{id:"s36", tipo:"catena", tema:"chiaro", sopratitolo:"D1 · «Perché la saturimetria non è affidabile?»", passi:[
  {t:"Il saturimetro **comune**"},
  {t:"**Non** distingue la carbossiemoglobina", d:"dall'ossiemoglobina"},
  {t:"Valori **falsamente normali**", key:true}]},
{id:"s37", tipo:"cifre", tema:"chiaro", sopratitolo:"Serve la co-ossimetria · D2 · «Qual è il trattamento?»", voci:[
  {n:"100", suf:"%", t:"ossigeno con reservoir", d:"il prima possibile", key:true},
  {n:"+", t:"valutazione", d:"per l'ossigeno iperbarico"}]},
{id:"s38", tipo:"tre", tema:"chiaro", sopratitolo:"D2 · l'iperbarica, se · poi il follow-up per i danni tardivi", box:[
  {n:"1", t:"Perdita di coscienza"}, {n:"2", t:"Segni neurologici"}, {n:"3", t:"Danno cardiaco"},
  {n:"4", t:"Gravidanza", key:true}, {n:"5", t:"Livelli molto elevati"}]},
{id:"s39", tipo:"griglia", tema:"chiaro", colonne:2, sopratitolo:"D3 · «Che cosa insegna a una famiglia?»", celle:[
  {t:"**Manutenzione** di caldaie e stufe"}, {t:"**Rilevatori** di monossido"},
  {t:"**Aerazione**"}, {no:true, t:"**Niente** bracieri, generatori o motori al chiuso"}]},

{id:"s40", tipo:"citazione", tema:"chiaro", sopratitolo:"La risposta modello · 1",
  testo:"Quattro familiari esposti nella stessa abitazione, in inverno: cefalea, nausea, vertigini, una **sincope**, confusione in un bambino, saturimetria **normale**: sospetta intossicazione da **monossido**.",
  fonte:"Chi sono · che cosa sospetto"},
{id:"s41", tipo:"tabella", tema:"chiaro", sopratitolo:"La risposta modello · 2", colonne:["28%","72%"],
  intestazioni:["Passo", "Che cosa scrivo"], righe:[
  ["Valuto", "tutti gli esposti · priorità a **madre** e **bambino**"],
  ["Somministro", "**subito** ossigeno al 100% con reservoir a tutti i sintomatici"]], chiave:[1]},
{id:"s42", tipo:"tabella", tema:"chiaro", sopratitolo:"La risposta modello · 3", colonne:["28%","72%"],
  intestazioni:["Passo", "Che cosa scrivo"], righe:[
  ["Rilevo", "parametri, GCS, glicemia"],
  ["Eseguo", "ECG, emogas con **carbossiemoglobina**, test di gravidanza"],
  ["Avviso", "il medico"],
  ["Garantisco", "la corretta **identificazione** di ciascuno"]], chiave:[3]},
{id:"s43", tipo:"tabella", tema:"chiaro", sopratitolo:"La risposta modello · 4", colonne:["28%","72%"],
  intestazioni:["Passo", "Che cosa scrivo"], righe:[
  ["Collaboro", "alla valutazione per l'**iperbarica** e al trasferimento"],
  ["Assicuro", "un **adulto di riferimento** per i bambini"],
  ["Alla dimissione", "sintomi tardivi · casa sicura · **prevenzione**"]], chiave:[2]},

{id:"s44", tipo:"tre", tema:"chiaro", sopratitolo:"I collegamenti", box:[
  {n:"8.2", t:"Ossigeno", d:"e limiti del saturimetro", key:true}, {n:"10.1", t:"Triage"},
  {n:"10.7", t:"Intossicazioni"}]},
{id:"s45", tipo:"tre", tema:"chiaro", sopratitolo:"I collegamenti", box:[
  {n:"11.4", t:"Pediatria"}, {n:"14.3", t:"Curva di dissociazione", key:true},
  {n:"2.6", t:"Identificazione del paziente"}]},

{id:"s46", tipo:"icone", tema:"chiaro", sopratitolo:"Il ruolo di comunità · molte intossicazioni avvengono nella fragilità sociale", voci:[
  {icona:"casa", t:"Abitazioni precarie"},
  {icona:"avviso", t:"Stufe di fortuna"},
  {icona:"euro", t:"La manutenzione", d:"che non si può pagare", key:true}]},
{id:"s47", tipo:"catena", tema:"chiaro", sopratitolo:"Un educatore alla salute, anche fuori dall'ospedale", passi:[
  {t:"**Servizi** territoriali"},
  {t:"**Infermiere** di famiglia e comunità"},
  {t:"Intercettare **prima** dell'emergenza", key:true}]},

{id:"s48", tipo:"titolo", tema:"profondo",
  titolo:"Il monossido non si vede,<br>non ha odore,<br>e il saturimetro **non lo legge**.",
  sotto:"L'unico strumento che lo rivela per primo è il ragionamento."},

{id:"s49", tipo:"tre", tema:"chiaro", sopratitolo:"Nella prossima lezione · in terapia intensiva, una famiglia fuori dalla porta", box:[
  {n:"1", t:"Intubato e ventilato"}, {n:"2", t:"Polmonite da ventilazione", key:true},
  {n:"3", t:"Sedazione"}, {n:"4", t:"Delirium"}]},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione · 16.11",
  titolo:"Il paziente<br>ventilato", sottotitolo:"In terapia intensiva",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
