// Contenuto delle 50 scene della lezione 11.3 — salute mentale e dipendenze.
// I tre requisiti del TSO sono una griglia che si accende; la procedura un
// percorso con i tempi; il rischio suicidario una trappola («chiedere non
// aumenta il rischio»); l'astinenza da alcol una catena di tempi.

const REQ = (k) => [
  {n:"1", t:"**Alterazioni psichiche** che richiedono interventi **urgenti**", key:k===0||k===9},
  {n:"2", t:"**Rifiuto** degli interventi", key:k===1||k===9},
  {n:"3", t:"**Impossibilità** di misure **extraospedaliere**", key:k===2||k===9}];

const TSO = (att) => ({tipo:"percorso", tema:"chiaro", tappe:[
  {t:"Proposta", d:"un medico, motivata"}, {t:"Convalida", d:"medico pubblico"}, {t:"Ordinanza", d:"il sindaco"},
  {t:"Giudice tutelare", d:"notifica entro 48 h"}, {t:"Convalida", d:"entro altre 48 h"}], attive:att});

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 11 · Setting assistenziali e ciclo di vita",
  titolo:"Salute mentale<br>e dipendenze", sottotitolo:"11.3 · Il TSO, l'agitazione, il rischio suicidario, l'astinenza da alcol",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Micro-lezione 3 di 8 · riguarda ogni infermiere, non solo la psichiatria", celle:[
  {n:"·", t:"**Medicina**"}, {n:"·", t:"**Chirurgia**"}, {n:"·", t:"**Pronto soccorso**", key:true}]},
{id:"s03", tipo:"frase", tema:"chiaro", sopratitolo:"Un contenuto normativo chiesto con grande precisione · requisiti, passaggi, tempi",
  testo:"Il **trattamento sanitario obbligatorio**."},
{id:"s04", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Tre temi clinici, in qualunque reparto", celle:[
  {n:"1", t:"L'**agitazione**"}, {n:"2", t:"Il rischio **suicidario**", key:true}, {n:"3", t:"Le **dipendenze**, l'astinenza da alcol"}]},

{id:"s05", tipo:"confronto", tema:"chiaro", sopratitolo:"I disturbi psicotici · la schizofrenia", col:[
  {h:"Sintomi positivi", t:"**deliri**, allucinazioni"}, {h:"Sintomi negativi", t:"**apatia**, ritiro sociale, povertà del pensiero", key:true}]},
{id:"s06", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"I principali disturbi", celle:[
  {n:"·", t:"Dell'**umore**: depressione, bipolare", key:true}, {n:"·", t:"D'**ansia**"}, {n:"·", t:"Di **personalità**"},
  {n:"·", t:"Della **nutrizione** e dell'alimentazione"}, {n:"·", t:"Da uso di **sostanze**"}, {n:"·", t:"**Psicotici**"}]},

{id:"s07", tipo:"norma", tema:"chiaro", etichetta:"La legge Basaglia", sigla:"L. 180/1978",
  testo:"La **chiusura dei manicomi**."},
{id:"s08", tipo:"norma", tema:"chiaro", etichetta:"Principi recepiti · artt. 33-35", sigla:"L. 833/1978",
  testo:"I trattamenti sanitari sono di norma **volontari**."},
{id:"s09", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Il Dipartimento di Salute Mentale", celle:[
  {n:"·", t:"**CSM**: Centro di Salute Mentale, sul territorio"}, {n:"·", t:"**SPDC**: nell'ospedale generale", key:true},
  {n:"·", t:"**Centri diurni**"}, {n:"·", t:"**Strutture residenziali**"}]},

{id:"s10", tipo:"frase", tema:"chiaro", sopratitolo:"Il TSO in degenza ospedaliera per malattia mentale",
  testo:"È un'**eccezione**: tre requisiti, **insieme**."},
{id:"s11", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"Il TSO · i tre requisiti", celle:REQ(9)},
{id:"s12", tipo:"trappola", tema:"chiaro", sopratitolo:"Se ne manca uno, il TSO non è legittimo · una domanda trabocchetto", righe:[
  {sb:"La pericolosità come requisito", ok:"**Non** è fra i requisiti"}]},
{id:"s13", tipo:"titolo", tema:"profondo",
  titolo:"Il TSO è un atto **sanitario**,<br>non di ordine pubblico.",
  sotto:""},

{id:"s14", sopratitolo:"La procedura · i passaggi e i tempi", ...TSO([0,1])},
{id:"s15", sopratitolo:"Il sindaco, come autorità sanitaria locale", ...TSO([0,1,2,3])},
{id:"s16", sopratitolo:"Si esegue nell'SPDC · ogni passaggio è una garanzia per la persona", ...TSO([0,1,2,3,4])},

{id:"s17", tipo:"cifre", tema:"chiaro", sopratitolo:"Prorogabile con una nuova proposta motivata · diritti: comunicare, presentare ricorso", voci:[
  {n:"7", suf:"", d:"giorni", key:true}]},
{id:"s18", tipo:"frase", tema:"chiaro", sopratitolo:"Anche durante il trattamento, consenso e partecipazione",
  testo:"L'obbligo non cancella la relazione: la rende **più importante**."},
{id:"s19", tipo:"confronto", tema:"chiaro", sopratitolo:"Procedura analoga", col:[
  {h:"TSO", t:"trattamento, con **ricovero**"}, {h:"ASO", t:"accertamento: **valutare** chi rifiuta, **senza ricovero**", key:true}]},

{id:"s20", tipo:"griglia", tema:"chiaro", colonne:4, spunta:false, sopratitolo:"L'agitazione psicomotoria · i segnali precoci", celle:[
  {n:"!", t:"La **voce** si alza"}, {n:"!", t:"**Irrequietezza**"}, {n:"!", t:"Sguardo **fisso**"}, {n:"!", t:"Pugni **serrati**", key:true}]},
{id:"s21", tipo:"confronto", tema:"chiaro", sopratitolo:"De-escalation, lezione 2.7 · Raccomandazione n. 8", col:[
  {h:"La relazione", t:"calma, distanza, ascolto, offrire **scelte**"}, {h:"La sicurezza", t:"via d'uscita libera, **non restare soli**", key:true}]},
{id:"s22", tipo:"griglia", tema:"chiaro", colonne:4, spunta:false, sopratitolo:"Prima le cause organiche · non attribuire tutto al disturbo psichiatrico", celle:[
  {n:"?", t:"**Ipoglicemia**"}, {n:"?", t:"**Ipossia**"}, {n:"?", t:"**Astinenza**", key:true}, {n:"?", t:"**Delirium**"}]},

{id:"s23", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Il rischio suicidario · i fattori di rischio", celle:[
  {n:"1", t:"**Tentativi precedenti**: il più importante", key:true}, {n:"·", t:"Disturbi psichiatrici, dipendenze"}, {n:"·", t:"Malattia grave, **dolore cronico**"},
  {n:"·", t:"**Isolamento**"}, {n:"·", t:"**Perdite** recenti"}]},
{id:"s24", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"I segnali", celle:[
  {n:"!", t:"**Disperazione**, sentirsi un peso"}, {n:"!", t:"Frasi di **congedo**"}, {n:"!", t:"Cambiamenti **improvvisi**"}, {n:"!", t:"Un'improvvisa **calma**", key:true}]},
{id:"s25", tipo:"trappola", tema:"chiaro", sopratitolo:"Un punto che i concorsi chiedono", righe:[
  {sb:"Evitare l'argomento", ok:"Chiedere in modo **diretto**, con rispetto"}]},
{id:"s26", tipo:"titolo", tema:"profondo",
  titolo:"Chiedere **non aumenta**<br>il rischio.",
  sotto:"Apre la possibilità di aiutare."},

{id:"s27", tipo:"norma", tema:"chiaro", etichetta:"Prevenzione del suicidio", sigla:"Raccomandazione n. 4",
  testo:"Rischio elevato: **non lasciare sola** la persona, segnalare, valutazione specialistica."},
{id:"s28", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"Raccomandazione n. 4", celle:[
  {t:"**Valutazione** del rischio"}, {t:"**Ambiente** sicuro: finestre, oggetti, farmaci", key:true}, {t:"**Sorveglianza** adeguata"}]},
{id:"s29", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Il suicidio in ospedale è un evento sentinella · sostenere gli operatori", celle:[
  {n:"!", t:"**Trasferimenti**"}, {n:"!", t:"**Dimissione**", key:true}]},

{id:"s30", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"La contenzione in psichiatria · lezione 3.1 · prescrizione, monitoraggio, documentazione", celle:[
  {n:"·", t:"**Estrema**"}, {n:"·", t:"**Eccezionale**"}, {n:"·", t:"**Temporanea**", key:true}]},
{id:"s31", tipo:"frase", tema:"chiaro", sopratitolo:"Relazione, presenza, de-escalation, ambiente: la contenzione diventa rarissima",
  testo:"Molti SPDC lavorano **no restraint**."},

{id:"s32", tipo:"norma", tema:"chiaro", etichetta:"Servizi per le Dipendenze", sigla:"SerD · DPR 309/1990",
  testo:"Sostanze, **alcol**, gioco d'azzardo."},
{id:"s33", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Approccio non giudicante · riduzione del danno", celle:[
  {t:"Terapia sostitutiva: **metadone**, buprenorfina"}, {t:"In ospedale va **continuata**", key:true}]},
{id:"s34", tipo:"confronto", tema:"chiaro", sopratitolo:"La dose si verifica con il SerD", col:[
  {h:"Se si interrompe", t:"**astinenza**, la persona si allontana dalle cure"}, {h:"Overdose da oppioidi", t:"**naloxone**", key:true}]},

{id:"s35", tipo:"cifre", tema:"chiaro", sopratitolo:"L'astinenza da alcol · frequente in chi è ricoverato per altro · dall'ultima assunzione", voci:[
  {n:"6-24", suf:"", d:"ore", key:true}]},
{id:"s36", tipo:"catena", tema:"chiaro", sopratitolo:"Delirium tremens a 48-72 ore: confusione, allucinazioni, agitazione, ipertermia", passi:[
  {t:"Tremori, sudorazione, **tachicardia**"}, {t:"Possibili **convulsioni**"}, {t:"**Delirium tremens**", key:true}]},
{id:"s37", tipo:"norma", tema:"chiaro", etichetta:"Un'emergenza · scala CIWA-Ar · vitamina B1", sigla:"Tiamina",
  testo:"**Prima del glucosio**: previene l'encefalopatia di Wernicke."},
{id:"s38", tipo:"frase", tema:"chiaro", sopratitolo:"Fatta senza giudizio, all'ingresso",
  testo:"L'anamnesi sull'alcol è un **atto di sicurezza**."},

{id:"s39", tipo:"trappola", tema:"chiaro", sopratitolo:"Lo stigma ritarda la richiesta di aiuto e peggiora gli esiti", righe:[
  {sb:"«Schizofrenico»", ok:"«Persona con **schizofrenia**»"}]},
{id:"s40", tipo:"frase", tema:"chiaro", sopratitolo:"Disturbi mentali gravi: aspettativa di vita ridotta, per malattie fisiche trascurate",
  testo:"Il dolore toracico si valuta **come quello di chiunque**."},

{id:"s41", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Il caso · chirurgia, secondo giorno · nessuna anamnesi sull'alcol", celle:[
  {n:"!", t:"**Tremori**, sudorazione"}, {n:"118", t:"frequenza, **agitato**"}, {n:"!", t:"Vede **insetti** sul muro", key:true}]},
{id:"s42", tipo:"frase", tema:"chiaro", sopratitolo:"Che cosa pensi? I tempi tornano: 48-72 ore",
  testo:"Astinenza alcolica verso il **delirium tremens**."},
{id:"s43", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"Che cosa fai? · l'anamnesi sulle sostanze è prevenzione", celle:[
  {t:"**Sicurezza**, parametri, glicemia"}, {t:"**Avvisi il medico**"}, {t:"**Tiamina** prima del glucosio, una scala", key:true}]},

{id:"s44", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"In Veneto · ogni ULSS · con il privato sociale e il volontariato", celle:[
  {t:"**Dipartimento di Salute Mentale**: CSM, SPDC, residenze, diurni", key:true}, {t:"**Rete delle dipendenze**: i SerD"}]},
{id:"s45", tipo:"frase", tema:"chiaro", sopratitolo:"All'orale · l'ospedale è un momento del percorso, non il centro",
  testo:"La salute mentale si cura **nel territorio**."},

{id:"s46", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"La tabella · L. 180 e L. 833/1978, artt. 33-35 · la pericolosità non c'entra", celle:REQ(-1)},
{id:"s47", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"La tabella", celle:[
  {n:"48+48", t:"ore: giudice e **convalida**"}, {n:"7", t:"**giorni**"}, {n:"!", t:"Chiedere **direttamente**", key:true},
  {n:"B1", t:"**Tiamina** prima del glucosio"}, {n:"·", t:"Terapie sostitutive: **continuare**"}, {n:"·", t:"Ordinanza del **sindaco**"}]},
{id:"s48", tipo:"frase", tema:"chiaro", sopratitolo:"Nella prossima lezione",
  testo:"L'**area materno-infantile**: gravidanza, parto, puerperio, neonato."},
{id:"s49", tipo:"frase", tema:"chiaro", sopratitolo:"I valori normali cambiano con l'età · il dolore si misura in un altro modo",
  testo:"Fino all'assistenza **pediatrica** di base."},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione",
  titolo:"11.4<br>Area<br>materno-infantile", sottotitolo:"Gravidanza, neonato, pediatria di base",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
