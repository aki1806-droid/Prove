// Contenuto delle 50 scene della lezione 12.4 — finanziamento ed economia del SSN.
// Il flusso delle risorse è una catena Stato → Regioni → aziende; i DRG la
// catena SDO → DRG → tariffa; le tre «e» una scena «tre»; il PNRR una «cifre».

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 12 · Organizzazione, normativa e sicurezza",
  titolo:"Finanziamento<br>ed economia del SSN", sottotitolo:"12.4 · Le risorse, il riparto, i DRG, il budget, la spesa farmaceutica, il PNRR",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"frase", tema:"chiaro", sopratitolo:"Micro-lezione 4 di 8 · da dove arrivano, e come vengono distribuite",
  testo:"Le risorse della sanità sono pubbliche, e **limitate**."},
{id:"s03", tipo:"griglia", tema:"chiaro", colonne:4, spunta:false, sopratitolo:"Perché un budget, perché la durata della degenza, perché l'appropriatezza · ogni giorno, in reparto", celle:[
  {n:"·", t:"**Tempo**"}, {n:"·", t:"**Materiali**"}, {n:"·", t:"**Farmaci**"}, {n:"·", t:"**Posti letto**", key:true}]},
{id:"s04", tipo:"frase", tema:"chiaro", sopratitolo:"Da dove arrivano i soldi, e dove vanno",
  testo:"Le scelte dell'infermiere hanno anche un **peso economico**."},

{id:"s05", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Da dove arrivano le risorse · soprattutto la fiscalità generale: imposte nazionali e regionali", celle:[
  {n:"1", t:"**IRAP**"}, {n:"2", t:"Addizionale regionale **IRPEF**"}, {n:"3", t:"Compartecipazione all'**IVA**", key:true}]},
{id:"s06", tipo:"confronto", tema:"chiaro", sopratitolo:"Due fonti", col:[
  {h:"Fiscalità generale", t:"imposte **nazionali** e **regionali**"}, {h:"Entrate proprie delle aziende", t:"**ticket** · attività **libero-professionale**", key:true}]},
{id:"s07", tipo:"frase", tema:"chiaro", sopratitolo:"Ogni anno lo Stato lo fissa con la legge di bilancio · la somma complessiva per il SSN",
  testo:"Il **fabbisogno sanitario nazionale standard**."},

{id:"s08", tipo:"frase", tema:"chiaro", sopratitolo:"Il riparto fra le Regioni · intesa in Conferenza Stato-Regioni · una popolazione più anziana consuma più risorse",
  testo:"Il criterio principale: la popolazione **pesata per età**."},
{id:"s09", tipo:"norma", tema:"chiaro", etichetta:"I costi standard · oltre ad altri indicatori", sigla:"D.Lgs. 68/2011",
  testo:"Il riferimento sono le Regioni **più efficienti**."},
{id:"s10", tipo:"catena", tema:"chiaro", sopratitolo:"Le regioni «benchmark» · il Veneto più volte fra queste", passi:[
  {t:"**Stato**", d:"fabbisogno standard"}, {t:"**Regioni**", d:"riparto per popolazione pesata"}, {t:"**Aziende** sanitarie", d:"riparto regionale", key:true}]},

{id:"s11", tipo:"norma", tema:"chiaro", etichetta:"Diagnosis Related Groups", sigla:"DRG",
  testo:"I **ricoveri** in gruppi omogenei per **consumo di risorse**."},
{id:"s12", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Ogni ricovero è attribuito a un DRG in base a", celle:[
  {n:"1", t:"**Diagnosi principale**", key:true}, {n:"2", t:"**Interventi**"}, {n:"3", t:"**Età**"},
  {n:"4", t:"**Complicanze**"}, {n:"5", t:"Modalità di **dimissione**"}]},
{id:"s13", tipo:"catena", tema:"chiaro", sopratitolo:"La scheda di dimissione ospedaliera · la catena da ricordare", passi:[
  {t:"**SDO**", d:"i dati del ricovero"}, {t:"**DRG**", d:"il gruppo omogeneo"}, {t:"**Tariffa**", d:"una per ogni DRG", key:true}]},
{id:"s14", tipo:"confronto", tema:"chiaro", sopratitolo:"In Italia dalla metà degli anni Novanta", col:[
  {h:"Prima", t:"a **piè di lista**: la spesa storica"}, {h:"Con i DRG", t:"pagamento **per prestazione**", key:true}]},

{id:"s15", tipo:"catena", tema:"chiaro", sopratitolo:"Gli effetti dei DRG", passi:[
  {t:"Tariffa **fissa**", d:"indipendente dai giorni"}, {t:"Incentivo all'**efficienza**"}, {t:"Riduzione della **degenza media**", key:true}]},
{id:"s16", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"I rischi · per questo esistono i controlli di appropriatezza sulle SDO", celle:[
  {n:"!", t:"Dimissioni **precoci**", key:true}, {n:"!", t:"**Selezione** dei casi"}, {n:"!", t:"Codifica **opportunistica**"}, {n:"!", t:"**Frammentazione** dei ricoveri"}]},
{id:"s17", tipo:"titolo", tema:"profondo",
  titolo:"La SDO deve essere<br>**completa e accurata**.",
  sotto:""},
{id:"s18", tipo:"frase", tema:"chiaro", sopratitolo:"E qui entra l'infermiere · per esempio una lesione da pressione, un'infezione",
  testo:"Una documentazione precisa descrive la **complessità del ricovero**."},

{id:"s19", tipo:"norma", tema:"chiaro", etichetta:"Specialistica ambulatoriale", sigla:"Nomenclatori",
  testo:"Le prestazioni, ciascuna con la sua **tariffa**."},
{id:"s20", tipo:"cifre", tema:"chiaro", sopratitolo:"I nuovi nomenclatori · le Regioni possono definire tariffe proprie entro i limiti nazionali", voci:[
  {n:"2017", suf:"", d:"i LEA che li prevedono"}, {n:"2024", suf:"", d:"in vigore dalla fine dell'anno", key:true}]},

{id:"s21", tipo:"griglia", tema:"chiaro", colonne:4, spunta:true, sopratitolo:"Il budget · la direzione negozia con ogni struttura obiettivi e risorse per l'anno", celle:[
  {t:"**Attività**"}, {t:"**Qualità**"}, {t:"**Appropriatezza**", key:true}, {t:"**Costi**"}]},
{id:"s22", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Il controllo di gestione · monitora l'andamento durante l'anno", celle:[
  {n:"1", t:"**Centri di costo**", key:true}, {n:"2", t:"**Indicatori**"}, {n:"3", t:"**Report** periodici"}]},
{id:"s23", tipo:"catena", tema:"chiaro", sopratitolo:"Anche l'infermiere partecipa · per esempio obiettivi su cadute e lesioni", passi:[
  {t:"Obiettivi di **budget**"}, {t:"Valutazione della **performance**"}, {t:"Retribuzione di **risultato**", key:true}]},

{id:"s24", tipo:"frase", tema:"chiaro", sopratitolo:"La spesa farmaceutica · tetti fissati per legge, in percentuale del fabbisogno sanitario",
  testo:"Le percentuali cambiano: conta il **meccanismo**."},
{id:"s25", tipo:"confronto", tema:"chiaro", sopratitolo:"Due tetti distinti", col:[
  {h:"Spesa convenzionata", t:"le **farmacie**"}, {h:"Acquisti diretti", t:"**ospedale**, distribuzione diretta e per conto", key:true}]},
{id:"s26", tipo:"catena", tema:"chiaro", sopratitolo:"L'AIFA classifica i farmaci e ne negozia il prezzo", passi:[
  {t:"Tetto **superato**"}, {t:"**Payback**", key:true}, {t:"A carico delle **aziende farmaceutiche**"}]},
{id:"s27", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"Gli strumenti di contenimento", celle:[
  {t:"Farmaci **equivalenti**"}, {t:"**Biosimilari**"}, {t:"Acquisti **centralizzati**: in Veneto, Azienda Zero", key:true}]},

{id:"s28", tipo:"norma", tema:"chiaro", etichetta:"Regioni con disavanzi sanitari strutturali", sigla:"Piano di rientro",
  testo:"Accordo con i Ministeri della **Salute** e dell'**Economia**."},
{id:"s29", tipo:"scala", tema:"chiaro", sopratitolo:"Le misure di riequilibrio · il Veneto non è sottoposto a piano di rientro", gradini:[
  {n:"1", t:"Riorganizzazione"}, {n:"2", t:"Riduzione dei costi"}, {n:"3", t:"Aumento delle imposte regionali"}, {n:"!", t:"Nei casi più gravi: commissariamento", key:true}]},

{id:"s30", tipo:"cifre", tema:"chiaro", sopratitolo:"PNRR · Piano Nazionale di Ripresa e Resilienza · Missione 6 Salute", voci:[
  {n:"15,6", suf:"miliardi", d:"circa", key:true}, {n:"2", suf:"", d:"componenti"}]},
{id:"s31", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"Componente 1 · reti di prossimità, strutture e telemedicina per l'assistenza territoriale", celle:[
  {t:"Case della **Comunità**", key:true}, {t:"**COT**"}, {t:"Ospedali di **Comunità**"},
  {t:"Assistenza **domiciliare**"}, {t:"**Telemedicina**"}]},
{id:"s32", tipo:"confronto", tema:"chiaro", sopratitolo:"Le due componenti", col:[
  {h:"Componente 1", t:"gli strumenti del **DM 77** · lezione 11.7"}, {h:"Componente 2", t:"**innovazione**, ricerca, digitalizzazione: ospedali, **FSE**, formazione", key:true}]},
{id:"s33", tipo:"confronto", tema:"chiaro", sopratitolo:"Un punto che si sente spesso nei dibattiti", col:[
  {h:"Il PNRR finanzia", t:"**investimenti**: strutture e tecnologie"}, {h:"Il personale", t:"con le **risorse ordinarie**", key:true}]},

{id:"s34", tipo:"tre", tema:"chiaro", sopratitolo:"Tre parole da distinguere", box:[
  {n:"1", t:"Efficacia", d:"raggiungere il **risultato di salute**"},
  {n:"2", t:"Efficienza", d:"**risorse** impiegate e **risultati** ottenuti", key:true},
  {n:"3", t:"Economicità", d:"equilibrio fra **costi e ricavi** nel tempo"}]},
{id:"s35", tipo:"frase", tema:"chiaro", sopratitolo:"Non sono in contrapposizione con la qualità",
  testo:"Con risorse limitate, **ogni spreco ha un prezzo**."},
{id:"s36", tipo:"titolo", tema:"profondo",
  titolo:"Lo spreco toglie risorse<br>**ad altri pazienti**.",
  sotto:""},
{id:"s37", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"Costi per la collettività", celle:[
  {t:"Un dispositivo **aperto e non usato**", no:true}, {t:"Un esame **ripetuto** senza motivo", no:true}, {t:"Una degenza **prolungata** per inefficienza", no:true}]},

{id:"s38", tipo:"frase", tema:"chiaro", sopratitolo:"Il caso d'esame · la domanda tipo",
  testo:"Che cosa sono i **DRG** e quali **effetti** hanno sull'assistenza?"},
{id:"s39", tipo:"catena", tema:"chiaro", sopratitolo:"La risposta · hanno sostituito il finanziamento a piè di lista", passi:[
  {t:"Ricoveri in gruppi **omogenei**"}, {t:"Dati della **SDO**"}, {t:"Una **tariffa**", key:true}]},
{id:"s40", tipo:"confronto", tema:"chiaro", sopratitolo:"Gli effetti", col:[
  {h:"Incentivano", t:"**efficienza** e riduzione della **degenza media**"}, {h:"Ma possono favorire", t:"dimissioni **precoci** · servono **controlli**", key:true}]},
{id:"s41", tipo:"catena", tema:"chiaro", sopratitolo:"Il collegamento infermieristico · lezione 9.7", passi:[
  {t:"Dimissioni più **rapide**"}, {t:"Pianificazione **precoce** della dimissione"}, {t:"**Continuità** con il territorio", key:true}]},

{id:"s42", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"L'infermiere e le risorse", celle:[
  {t:"Uso **appropriato** di dispositivi e materiali"}, {t:"Prevenzione degli **eventi avversi**", key:true}]},
{id:"s43", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Sofferenza per il paziente · e costi evitabili, spesso molto alti", celle:[
  {n:"!", t:"Lesione **da pressione**"}, {n:"!", t:"Caduta **con frattura**"}, {n:"!", t:"Infezione **da catetere**", key:true}]},
{id:"s44", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"E ancora", celle:[
  {t:"Documentazione **accurata**"}, {t:"Gestione delle **scorte**"}, {t:"Obiettivi di **budget**"}, {t:"**Codice deontologico**: uso responsabile delle risorse", key:true}]},

{id:"s45", tipo:"norma", tema:"chiaro", etichetta:"Gestione Sanitaria Accentrata · e gli acquisti centralizzati", sigla:"GSA",
  testo:"In Veneto è affidata ad **Azienda Zero**."},
{id:"s46", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"In Veneto · lo vedremo nella lezione 13.2", celle:[
  {n:"€", t:"**CRAV**: Centrale Regionale Acquisti"}, {n:"✓", t:"Più volte regione di riferimento per i **costi standard**", key:true}]},

{id:"s47", tipo:"tabella", tema:"chiaro", sopratitolo:"La tabella · da fotografare", colonne:["40%","60%"],
  intestazioni:["Tema", "Da ricordare"], righe:[
  ["Fiscalità generale", "IRAP, addizionale IRPEF, IVA"], ["Fabbisogno standard", "fissato dallo Stato ogni anno"],
  ["Riparto", "popolazione **pesata** per età"], ["Costi standard", "D.Lgs. 68/2011 · regioni **benchmark**"],
  ["DRG", "ricoveri · **SDO** · tariffa"]], chiave:[4]},
{id:"s48", tipo:"tabella", tema:"chiaro", sopratitolo:"La tabella", colonne:["40%","60%"],
  intestazioni:["Tema", "Da ricordare"], righe:[
  ["Budget", "e **controllo di gestione**"], ["Spesa farmaceutica", "**tetti** e payback"],
  ["Piani di rientro", "disavanzi strutturali · non in Veneto"], ["PNRR Missione 6", "**due componenti** · circa 15,6 miliardi"],
  ["Tre parole", "efficacia, efficienza, **economicità**"]], chiave:[]},

{id:"s49", tipo:"frase", tema:"chiaro", sopratitolo:"Nella prossima lezione · obblighi di comportamento, anticorruzione, procedimento disciplinare",
  testo:"Il **rapporto di lavoro** e il contratto collettivo."},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione",
  titolo:"12.5<br>Rapporto di lavoro e CCNL", sottotitolo:"Il contratto del Comparto Sanità, gli obblighi, il procedimento disciplinare",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
