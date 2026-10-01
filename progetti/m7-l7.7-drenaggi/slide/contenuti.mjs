// Contenuto delle 50 scene della lezione 7.7 — drenaggi. Due corpi nuovi:
// la pleura (il torace con lo pneumotorace e il tubo alto, il versamento e
// il tubo basso) e le camere (il sistema a tre camere, con il livello del
// sigillo che oscilla, le bollicine della perdita d'aria, il gorgoglio
// normale dell'aspirazione). Le quattro famiglie in colonne, l'andamento
// in catena, le emergenze in percorsi.

const SEGNI = [
 {n:"1", t:"**Dispnea** che peggiora", key:true}, {n:"2", t:"**Tachicardia**, **ipotensione**, desaturazione"}, {n:"3", t:"**Deviazione della trachea** verso il lato opposto"},
 {n:"4", t:"Assenza del **murmure** da un lato, turgore giugulare"}, {n:"5", t:"**Enfisema sottocutaneo**: come neve schiacciata"}, {n:"!", t:"**Emergenza**: decompressione immediata"},
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 7 · Wound care, stomie e drenaggi",
  titolo:"Drenaggi", sottotitolo:"7.7 · Ciò che esce è un'informazione clinica",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"Micro-lezione 7 di 8 · far uscire dal corpo ciò che non deve accumularsi", celle:[
  {n:"→", t:"**Sangue, siero, pus, bile, aria**", key:true}]},
{id:"s03", tipo:"frase", tema:"chiaro", sopratitolo:"Dispositivi semplici",
  testo:"Ciò che esce dal drenaggio è un'**informazione clinica**: quantità e aspetto raccontano il decorso."},
{id:"s04", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"La seconda parte: il drenaggio toracico · regole sue e domande d'esame precise", celle:[
  {n:"1", t:"L'**oscillazione**"}, {n:"2", t:"Le **bollicine**"}, {n:"3", t:"Il **non clampare**", key:true}]},

{id:"s05", tipo:"colonne", tema:"chiaro", sopratitolo:"Due famiglie · i passivi: per capillarità o gravità", colonne:[
  {h:"Passivi", key:true, voci:[{t:"**Penrose**: lamina morbida, nella medicazione o in sacca", key:true}, {t:"**A caduta**: sacca più in basso del punto di uscita"}]},
  {h:"Attivi", voci:[{t:"Redon"}, {t:"Jackson-Pratt"}]}]},
{id:"s06", tipo:"colonne", tema:"chiaro", sopratitolo:"Due famiglie · gli attivi, o aspirativi: con una pressione negativa", colonne:[
  {h:"Passivi", voci:[{t:"Penrose"}, {t:"A caduta"}]},
  {h:"Attivi", key:true, voci:[{t:"**Redon**: flacone sottovuoto", key:true}, {t:"**Jackson-Pratt**: pompetta a bulbo che si comprime"}]}]},
{id:"s07", tipo:"frase", tema:"chiaro", sopratitolo:"Due famiglie, quattro nomi",
  testo:"I quiz li chiedono **per nome**."},

{id:"s08", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"La gestione comune", celle:[
  {t:"**Fissaggio** sicuro, senza trazione", key:true}, {t:"Tubo **senza pieghe** né compressioni, anche sotto il paziente"}]},
{id:"s09", tipo:"trappola", tema:"chiaro", sopratitolo:"Nei drenaggi a caduta", righe:[
  {sb:"Il raccoglitore a terra, o sopra il punto di uscita", ok:"**Sempre più in basso** del punto di uscita, **mai a terra**"}]},
{id:"s10", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Negli aspirativi · il vuoto deve essere mantenuto · il punto di uscita si medica con tecnica asettica", celle:[
  {n:"R", t:"**Redon**: l'indicatore si modifica quando il vuoto si esaurisce", key:true}, {n:"JP", t:"**Jackson-Pratt**: deve restare **compresso**"}]},

{id:"s11", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Misurare e osservare · a ogni turno, o con la frequenza prescritta: quantità e caratteristiche", celle:[
  {n:"1", t:"**Ematico**, siero-ematico, **sieroso**"}, {n:"2", t:"**Purulento**", key:true}, {n:"3", t:"**Biliare**"}, {n:"4", t:"**Enterico**"}]},
{id:"s12", tipo:"catena", tema:"chiaro", sopratitolo:"L'andamento atteso · meno, e più chiaro: è il decorso che va bene", passi:[
  {t:"Ematico"}, {t:"Siero-ematico"}, {t:"Sieroso", key:true}, {t:"Riduzione"}]},
{id:"s13", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"I segnali d'allarme", celle:[
  {n:"!", t:"**Aumento improvviso**"}, {n:"!", t:"**Sangue rosso vivo**: possibile emorragia", key:true}, {n:"!", t:"**Cambio di aspetto**: bile, contenuto intestinale, pus"}]},
{id:"s14", tipo:"trappola", tema:"chiaro", sopratitolo:"L'arresto brusco · un drenaggio che smette di colpo è da controllare, non da festeggiare", righe:[
  {sb:"«Non drena più: sta guarendo»", ok:"Può essere un'**ostruzione** o uno **spostamento**"}]},

{id:"s15", tipo:"percorso", tema:"chiaro", sopratitolo:"Lo svuotamento · con tecnica asettica · il Redon, quando il flacone è pieno o ha perso il vuoto", tappe:[
  {t:"Chiudere il morsetto", key:true}, {t:"Sostituire il flacone"}]},
{id:"s16", tipo:"percorso", tema:"chiaro", sopratitolo:"Il Jackson-Pratt · e si annota la quantità prima di svuotare", tappe:[
  {t:"Svuotare il bulbo"}, {t:"Comprimere", key:true}, {t:"Chiudere il tappo", d:"riprende l'aspirazione"}]},

{id:"s17", tipo:"trappola", tema:"chiaro", sopratitolo:"La rimozione, su prescrizione · negli aspirativi", righe:[
  {sb:"Sfilare con il vuoto attivo: trattiene i tessuti, dolore e trauma", ok:"**Interrompere il vuoto** prima"}]},
{id:"s18", tipo:"percorso", tema:"chiaro", sopratitolo:"La rimozione", tappe:[
  {t:"Movimento continuo e deciso"}, {t:"Integrità della punta", key:true}, {t:"Medicare"}, {t:"Sorvegliare il punto di uscita"}]},

{id:"s19", tipo:"frase", tema:"chiaro", sopratitolo:"Il drenaggio toracico · fra i due foglietti della pleura",
  testo:"Normalmente c'è una **pressione negativa**, che tiene il polmone espanso."},
{id:"s20", tipo:"pleura", tema:"chiaro", sopratitolo:"Se entra aria, o si raccoglie liquido o sangue, il polmone collassa · il drenaggio ripristina la pressione negativa", attive:[0,1]},
{id:"s21", tipo:"pleura", tema:"chiaro", sopratitolo:"L'aria sale, il liquido scende · per lo pneumotorace il drenaggio in alto, per il versamento in basso", key:[0,1]},

{id:"s22", tipo:"camere", tema:"chiaro", sopratitolo:"Il sistema più usato ha tre camere · la raccolta, graduata", voci:[{t:"**1 · Raccolta**", d:"i liquidi drenati"}]},
{id:"s23", tipo:"camere", tema:"chiaro", sopratitolo:"La camera del sigillo idraulico · una piccola colonna d'acqua che funziona da valvola", voci:[{t:"1 · Raccolta"}, {t:"**2 · Sigillo idraulico**", d:"l'aria esce, non rientra"}]},
{id:"s24", tipo:"camere", tema:"chiaro", sopratitolo:"La camera del controllo dell'aspirazione · regola la pressione negativa applicata", voci:[{t:"1 · Raccolta"}, {t:"2 · Sigillo idraulico"}, {t:"**3 · Controllo dell'aspirazione**", d:"colonna d'acqua o regolatore a secco"}]},

{id:"s25", tipo:"camere", tema:"chiaro", sopratitolo:"Due fenomeni da saper interpretare · il primo: l'oscillazione nel sigillo idraulico, sincrona con il respiro", modo:"oscilla", voci:[{t:"**Oscillazione**", d:"il livello sale e scende"}]},
{id:"s26", tipo:"camere", tema:"chiaro", sopratitolo:"In respiro spontaneo il livello sale in inspirazione e scende in espirazione", modo:"oscilla", voci:[{t:"**C'è**", d:"il sistema è pervio"}]},
{id:"s27", tipo:"confronto", tema:"chiaro", sopratitolo:"Se manca, due possibilità · quale delle due lo dicono la clinica e la radiografia", col:[
  {h:"Tubo occluso", t:"o **piegato**", key:true}, {h:"Polmone", t:"**completamente riespanso**"}]},

{id:"s28", tipo:"camere", tema:"chiaro", sopratitolo:"Il secondo: le bollicine · nel sigillo idraulico indicano una perdita d'aria", modo:"bolle", voci:[{t:"**Bollicine nel sigillo**", d:"perdita d'aria"}]},
{id:"s29", tipo:"camere", tema:"chiaro", sopratitolo:"Intermittenti, in espirazione o con la tosse · l'aria che esce dal torace: attesa nello pneumotorace; la scomparsa dice che la perdita si chiude", modo:"bolle", voci:[{t:"**Intermittenti**", d:"attese nello pneumotorace"}]},
{id:"s30", tipo:"camere", tema:"chiaro", sopratitolo:"Continue · possibile perdita nel sistema: si controllano connessioni e tubo", modo:"bolle", voci:[{t:"Intermittenti", d:"attese"}, {t:"**Continue**", d:"perdita nel sistema: connessioni, tubo"}]},
{id:"s31", tipo:"camere", tema:"chiaro", sopratitolo:"Attenzione a non confondere le camere · stesse bollicine, camera diversa, significato opposto", modo:"aspira", voci:[{t:"**Camera di aspirazione a umido**", d:"gorgogliamento lieve e continuo: normale"}]},

{id:"s32", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Le regole di sicurezza · se si rovescia, il sigillo idraulico si perde", celle:[
  {t:"Sempre **più in basso del torace**", key:true}, {t:"In **verticale**"}, {t:"Nessuna **ansa declive** del tubo: il liquido ristagna"}]},
{id:"s33", tipo:"trappola", tema:"chiaro", sopratitolo:"La regola più importante · con una perdita d'aria, il clampaggio può provocare uno pneumotorace iperteso", righe:[
  {sb:"Clampare di routine, «per sicurezza», nel trasporto", ok:"**Non si clampa**: solo nelle situazioni previste dalla procedura, per brevissimo tempo"}]},
{id:"s34", tipo:"frase", tema:"chiaro", sopratitolo:"E si registrano quantità e caratteristiche",
  testo:"Si avvisa **subito** se il drenaggio di sangue supera la **soglia** indicata dal chirurgo."},

{id:"s35", tipo:"percorso", tema:"chiaro", sopratitolo:"Se il tubo si scollega dal sistema · l'aria potrebbe rientrare nel torace", tappe:[
  {t:"Estremità in acqua", d:"sterile o fisiologica, 2–3 cm: un sigillo improvvisato", key:true}, {t:"O sistema nuovo", d:"rapidamente"}, {t:"Medico"}, {t:"Respiro e saturazione"}]},
{id:"s36", tipo:"percorso", tema:"chiaro", sopratitolo:"Se il tubo esce dal torace · spesso fissata su tre lati: l'aria esce e non rientra", tappe:[
  {t:"Coprire subito", d:"medicazione occlusiva, secondo procedura", key:true}, {t:"Medico"}, {t:"Segni di pneumotorace iperteso"}]},

{id:"s37", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Lo pneumotorace iperteso · da riconoscere subito", celle:SEGNI.slice(0,3)},
{id:"s38", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Lo pneumotorace iperteso", celle:SEGNI.slice(3)},

{id:"s39", tipo:"percorso", tema:"chiaro", sopratitolo:"La rimozione del drenaggio toracico · su prescrizione, secondo procedura", tappe:[
  {t:"Manovra respiratoria", d:"Valsalva: l'aria non entra", key:true}, {t:"Medicazione occlusiva"}, {t:"Radiografia di controllo"}, {t:"Sorveglianza del respiro"}]},

{id:"s40", tipo:"frase", tema:"chiaro", sopratitolo:"Il caso · drenaggio toracico per pneumotorace, trasporto in radiologia",
  testo:"Il collega propone di **clampare il tubo** per sicurezza. Che cosa fai?"},
{id:"s41", tipo:"griglia", tema:"chiaro", colonne:1, spunta:true, sopratitolo:"Non si clampa · con una perdita d'aria il clampaggio può causare uno pneumotorace iperteso", celle:[
  {t:"Sistema **più in basso del torace**"}, {t:"In **verticale**"}, {t:"**Senza clampaggio**", key:true}]},
{id:"s42", tipo:"titolo", tema:"profondo",
  titolo:"Un comportamento **intuitivo ma pericoloso**.",
  sotto:"E l'esame lo sa."},

{id:"s43", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"In Veneto", celle:[
  {n:"1", t:"**Procedure aziendali** sulla gestione dei drenaggi chirurgici e toracici", key:true}, {n:"2", t:"Formazione specifica in **chirurgia toracica, cardiochirurgia, area critica**, dove i sistemi a tre camere sono più diffusi"}]},
{id:"s44", tipo:"percorso", tema:"chiaro", sopratitolo:"All'orale · tre parole, e la commissione sa che il drenaggio toracico l'hai capito", tappe:[
  {t:"Oscillazione"}, {t:"Bollicine"}, {t:"Non clampare", key:true}]},

{id:"s45", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Ricapitoliamo", celle:[
  {t:"Drenaggi **passivi** e **attivi**"}, {t:"Misurare **quantità e aspetto**"}, {t:"**Aumento improvviso** o **sangue rosso vivo**: allarmi", key:true}, {t:"**Interrompere il vuoto** prima della rimozione"}]},
{id:"s46", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Ricapitoliamo · il drenaggio toracico", celle:[
  {t:"**Oscillazione** = pervietà"}, {t:"**Bollicine nel sigillo** = perdita d'aria", key:true}, {t:"Sotto il torace, in verticale, **mai clampare di routine**"}, {t:"Scollegato: estremità **in acqua sterile**"}]},
{id:"s47", tipo:"frase", tema:"chiaro", sopratitolo:"Nella prossima lezione",
  testo:"Ricomponiamo il **modulo 7**: l'albero decisionale della medicazione."},
{id:"s48", tipo:"frase", tema:"chiaro", sopratitolo:"A tra poco",
  testo:"Prima si **valuta** e si toglie la **causa**, poi si **medica**."},
{id:"s49", tipo:"frase", tema:"chiaro", sopratitolo:"Il filo del modulo",
  testo:"Dalla lesione al drenaggio: tutto ciò che la cute **non trattiene da sola**."},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione",
  titolo:"7.8<br>Riepilogo del modulo 7<br>e autovalutazione", sottotitolo:"L'albero decisionale della medicazione",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
