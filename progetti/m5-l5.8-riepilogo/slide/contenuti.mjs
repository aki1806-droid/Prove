// Contenuto delle 50 scene della lezione 5.8 — il riepilogo del modulo e i
// venti calcoli cronometrati. Nessun corpo nuovo: i calcoli usano la pausa
// (l'esercizio con i dati a pillole e il cronometro) e il calcolo (la
// soluzione scritta un segno per volta), come nella 5.3; il riepilogo usa
// le griglie con la spunta e la catena degli antidoti.

const P = (es, testo, dati) => ({tipo:"pausa", tema:"chiaro", etichetta:"40 secondi", es, testo: testo.replace(/\n/g, "<br>"), dati});
const C = (sopratitolo, righe, nota) => ({tipo:"calcolo", tema:"chiaro", sopratitolo, righe, nota});

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 5 · Riepilogo",
  titolo:"Venti calcoli<br>e i punti chiave", sottotitolo:"5.8 · La chiusura del modulo, con il cronometro",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"frase", tema:"chiaro", sopratitolo:"Micro-lezione 8 di 8 · una lezione diversa dalle altre",
  testo:"Prima un rapido **riepilogo** dei punti chiave, poi **venti calcoli cronometrati**."},
{id:"s03", tipo:"cifre", tema:"chiaro", sopratitolo:"Il tempo che avrai davvero in sede d'esame · carta e penna; metti in pausa se serve, ma prova a stare nei tempi", voci:[
  {n:"40", suf:"s", d:"per ogni coppia di calcoli", key:true}, {n:"20", suf:"s", d:"a calcolo"}]},

{id:"s04", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"I punti chiave · prima parte", celle:[
  {t:"**ADME**: assorbimento, distribuzione, metabolismo, eliminazione"}, {t:"Endovenosa: biodisponibilità **100%**"},
  {t:"**Primo passaggio** epatico: la dose orale è più alta", key:true}]},
{id:"s05", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"I punti chiave · prima parte", celle:[
  {t:"Steady state ed eliminazione in **4–5 emivite**"},
  {t:"**Finestra stretta**: digossina, litio, warfarin, fenitoina, aminoglicosidi, vancomicina", key:true}]},
{id:"s06", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"I punti chiave · prima parte", celle:[
  {t:"La reazione avversa si segnala **sul sospetto**: farmacovigilanza", key:true}, {t:"L'errore in terapia: **incident reporting**"},
  {t:"Nell'anziano: **start low, go slow**"}]},

{id:"s07", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"I punti chiave · seconda parte", celle:[
  {t:"Le **7 G** e i **3 controlli**, l'ultimo al letto", key:true}, {t:"**Identificazione attiva**, due identificativi"},
  {t:"Niente «U», niente zero dopo la virgola"}, {t:"Raccomandazioni **1, 7, 12, 14, 17, 19**"}]},
{id:"s08", tipo:"catena", tema:"chiaro", sopratitolo:"Davanti a un errore · e gli antidoti: protamina, vitamina K, idarucizumab, naloxone, glucagone", passi:[
  {t:"Valutare"}, {t:"Avvisare", key:true}, {t:"Informare"}, {t:"Documentare"}, {t:"Segnalare"}]},
{id:"s09", tipo:"griglia", tema:"chiaro", colonne:1, spunta:true, sopratitolo:"Gli stupefacenti · e ora i calcoli", celle:[
  {t:"**DPR 309/1990**"}, {t:"Registro di carico e scarico **vidimato**", key:true}, {t:"Conservazione **2 anni**"}]},

{id:"s10", ...P("Calcoli 1 e 2", "**1** · Prescritti 40 mg. Fiala da 20 mg/ml. Quanti ml?\n**2** · Prescritti 250 mg. Compresse da 500 mg. Quante compresse?", ["40 mg", "20 mg/ml", "250 mg", "cp 500 mg"])},
{id:"s11", ...C("Calcolo 1 · la regola del tre: prescritto ÷ disponibile × volume", [{tok:["40 mg", "÷", "20 mg/ml", "=", "2 ml"]}])},
{id:"s12", ...C("Calcolo 2 · se la compressa è divisibile; altrimenti si chiede una formulazione adatta", [{tok:["250 mg", "÷", "500 mg", "=", "0,5", "→", "mezza compressa"]}])},

{id:"s13", ...P("Calcoli 3 e 4", "**3** · Prescritti 0,25 mg. Fiala da 0,5 mg in 2 ml.\n**4** · Prescritti 300 mcg. Fiala da 1 mg in 1 ml.", ["0,25 mg", "0,5 mg / 2 ml", "300 mcg", "1 mg / 1 ml"])},
{id:"s14", ...C("Calcolo 3 · metà della fiala, e il buon senso lo conferma", [{tok:["0,5 mg", "÷", "2 ml", "=", "0,25 mg/ml"]}, {tok:["0,25 mg", "÷", "0,25 mg/ml", "=", "1 ml"]}])},
{id:"s15", ...C("Calcolo 4 · prima la conversione", [{tok:["1 mg", "=", "1.000 mcg"]}, {tok:["300 mcg", "÷", "1.000 mcg/ml", "=", "0,3 ml"]}])},

{id:"s16", ...P("Calcoli 5 e 6", "**5** · Prescritti 200 mg di una soluzione al 10%. Quanti ml?\n**6** · Quanti grammi di glucosio in 10 ml di glucosata al 33%?", ["200 mg", "10%", "10 ml", "33%"])},
{id:"s17", ...C("Calcolo 5 · percentuale × 10 = mg/ml", [{tok:["10%", "=", "100 mg/ml"]}, {tok:["200 mg", "÷", "100 mg/ml", "=", "2 ml"]}])},
{id:"s18", ...C("Calcolo 6 · percentuale tal quale: grammi in 100 ml", [{tok:["33%", "=", "33 g in 100 ml"]}, {tok:["10 ml", "→", "3,3 g"]}])},

{id:"s19", ...P("Calcoli 7 e 8", "**7** · 500 ml in 4 ore: quanti ml/h?\n**8** · 1.500 ml in 24 ore: quanti ml/h?", ["500 ml / 4 h", "1.500 ml / 24 h"])},
{id:"s20", ...C("Calcoli 7 e 8 · volume ÷ ore: la formula più semplice del modulo", [{tok:["500 ml", "÷", "4 h", "=", "125 ml/h"]}, {tok:["1.500 ml", "÷", "24 h", "=", "62,5 ml/h"]}])},

{id:"s21", ...P("Calcoli 9 e 10", "**9** · 500 ml in 5 ore, deflussore 20 gtt/ml: gtt/min?\n**10** · 100 ml in 30 minuti, deflussore 20 gtt/ml: gtt/min?", ["500 ml / 5 h", "100 ml / 30 min", "20 gtt/ml"])},
{id:"s22", ...C("Calcolo 9 · volume × fattore ÷ minuti", [{tok:["500 ml", "×", "20", "=", "10.000"]}, {tok:["10.000", "÷", "300 min", "=", "33 gtt/min"]}])},
{id:"s23", ...C("Calcolo 10 · il tempo in minuti, sempre: è l'errore più frequente", [{tok:["100 ml", "×", "20", "=", "2.000"]}, {tok:["2.000", "÷", "30 min", "=", "67 gtt/min"]}])},

{id:"s24", ...P("Calcoli 11 e 12", "**11** · Microgocciolatore (60 gtt/ml), 40 ml/h: gtt/min?\n**12** · Deflussore 20 gtt/ml, 90 ml/h: gtt/min?", ["60 gtt/ml", "40 ml/h", "20 gtt/ml", "90 ml/h"])},
{id:"s25", ...C("Calcolo 11 · con il microgocciolatore, gtt/min e ml/h coincidono", [{tok:["40 ml/h", "×", "60", "÷", "60 min", "=", "40 gtt/min"]}])},
{id:"s26", ...C("Calcolo 12 · con il deflussore da 20 si divide per 3: le scorciatoie della lezione 5.3", [{tok:["90 ml/h", "÷", "3", "=", "30 gtt/min"]}])},

{id:"s27", ...P("Calcoli 13 e 14", "**13** · Prescritte 12 unità di insulina U-100: quanti ml?\n**14** · Eparina 25.000 UI in 50 ml, prescritte 800 UI/h: ml/h?", ["12 UI", "U-100", "25.000 UI / 50 ml", "800 UI/h"])},
{id:"s28", ...C("Calcolo 13 · ma nella pratica non si converte: si aspirano 12 unità con la siringa da insulina", [{tok:["12 UI", "÷", "100 UI/ml", "=", "0,12 ml"]}])},
{id:"s29", ...C("Calcolo 14 · da impostare sulla pompa", [{tok:["25.000 UI", "÷", "50 ml", "=", "500 UI/ml"]}, {tok:["800 UI/h", "÷", "500 UI/ml", "=", "1,6 ml/h"]}])},

{id:"s30", ...P("Calcoli 15 e 16", "**15** · Amoxicillina 50 mg/kg/die in 3 dosi, bambino di 18 kg: mg per dose?\n**16** · Sospensione 250 mg in 5 ml, dose da 300 mg: quanti ml?", ["50 mg/kg/die", "18 kg", "3 dosi", "250 mg / 5 ml"])},
{id:"s31", ...C("Calcolo 15 · prima la dose giornaliera, poi la dose singola", [{tok:["50 mg/kg", "×", "18 kg", "=", "900 mg/die"]}, {tok:["900 mg", "÷", "3", "=", "300 mg"]}])},
{id:"s32", ...C("Calcolo 16 · i due calcoli sono collegati: la dose del 15 è la dose del 16", [{tok:["300 mg", "÷", "250 mg", "=", "1,2"]}, {tok:["1,2", "×", "5 ml", "=", "6 ml"]}])},

{id:"s33", ...P("Calcolo 17", "Noradrenalina **0,1 mcg/kg/min**, paziente di **80 kg**, soluzione **4 mg in 50 ml**: ml/h?", ["0,1 mcg/kg/min", "80 kg", "4 mg / 50 ml"])},
{id:"s34", ...P("Calcolo 18", "**1.000 ml a 125 ml/h**, inizio alle **8:00**: a che ora termina?\nPer questa coppia hai **60 secondi**.", ["1.000 ml", "125 ml/h", "ore 8:00"])},
{id:"s35", ...C("Calcolo 17 · in quattro passaggi: dose al minuto, dose all'ora, in milligrammi", [{tok:["0,1", "×", "80 kg", "=", "8 mcg/min"]}, {tok:["8", "×", "60", "=", "480 mcg/h", "=", "0,48 mg/h"]}])},
{id:"s36", ...C("Calcolo 17 · poi la concentrazione; e il 18", [{tok:["4 mg", "÷", "50 ml", "=", "0,08 mg/ml"]}, {tok:["0,48", "÷", "0,08", "=", "6 ml/h"]}, {tok:["1.000", "÷", "125", "=", "8 h", "→", "ore 16"]}])},

{id:"s37", ...P("Calcolo 19", "Potassio cloruro: prescritti **40 mEq** da diluire. Fiala da **2 mEq/ml**: quanti ml di concentrato?", ["40 mEq", "2 mEq/ml"])},
{id:"s38", ...P("Calcolo 20", "Prescritti **0,125 mg** di digossina. Compresse da **0,25 mg**.", ["0,125 mg", "cp 0,25 mg"])},
{id:"s39", ...C("Calcoli 19 e 20 · il concentrato non si somministra mai così: diluito secondo procedura, doppio controllo, pompa (Raccomandazione 1)", [{tok:["40 mEq", "÷", "2 mEq/ml", "=", "20 ml"]}, {tok:["0,125 mg", "÷", "0,25 mg", "=", "mezza compressa"]}])},

{id:"s40", tipo:"fascia", tema:"chiaro", sopratitolo:"Come valutarti · conta le risposte giuste", classi:[
  {da:0, a:15, t:"Meno di 15", d:"rivedi la 5.3"}, {da:15, a:18, t:"15–17", d:"rifai i tipi sbagliati"}, {da:18, a:20, t:"18–20", d:"pronto", key:true}], min:0, max:20},
{id:"s41", tipo:"frase", tema:"chiaro", sopratitolo:"Meno di 15: riguarda la lezione 5.3 con calma, e rifai la batteria fra due giorni",
  testo:"I calcoli sono l'unica parte del concorso in cui **l'allenamento garantisce il risultato**."},

{id:"s42", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, attive:[0,1], sopratitolo:"I quattro errori più frequenti", celle:[
  {n:"1", t:"Dimenticare la conversione **mg ↔ mcg**", key:true}, {n:"2", t:"Le **ore** invece dei **minuti** nelle gocce"},
  {n:"3", t:"Confondere la **dose** (mg) con il **volume** (ml)"}, {n:"4", t:"Saltare il **controllo di buon senso**"}]},
{id:"s43", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"I quattro errori più frequenti · non di matematica: di attenzione", celle:[
  {n:"1", t:"Dimenticare la conversione **mg ↔ mcg**"}, {n:"2", t:"Le **ore** invece dei **minuti** nelle gocce"},
  {n:"3", t:"Confondere la **dose** (mg) con il **volume** (ml)", key:true}, {n:"4", t:"Saltare il **controllo di buon senso**", key:true}]},

{id:"s44", tipo:"griglia", tema:"chiaro", colonne:1, spunta:true, sopratitolo:"Gli agganci veneti del modulo", celle:[
  {t:"**Scheda unica di terapia** informatizzata"}, {t:"**Farmacovigilanza**: responsabile aziendale e centro regionale, verso la rete nazionale", key:true}]},
{id:"s45", tipo:"griglia", tema:"chiaro", colonne:1, spunta:true, sopratitolo:"Gli agganci veneti del modulo", celle:[
  {t:"**Procedure** su alto rischio, LASA, potassio concentrato, stupefacenti"}, {t:"**UFA** per gli antiblastici", key:true}, {t:"**Ricognizione e riconciliazione** nei passaggi di setting"}]},

{id:"s46", tipo:"griglia", tema:"chiaro", colonne:1, spunta:true, sopratitolo:"Come proseguire", celle:[
  {t:"**Test del modulo**: 30 domande, soglia 21", key:true}, {t:"La batteria dei calcoli finché non arrivi stabilmente a **18 su 20**, nei tempi"}]},
{id:"s47", tipo:"griglia", tema:"chiaro", colonne:1, spunta:true, sopratitolo:"Come proseguire", celle:[
  {t:"Nel quaderno: **formule, antidoti, Raccomandazioni**"}, {t:"Un caso di **errore in terapia** scritto per intero, con lo schema in cinque passi", key:true}]},

{id:"s48", tipo:"titolo", tema:"profondo",
  titolo:"L'infermiere è **l'ultima barriera** fra l'errore e il paziente.",
  sotto:"La frase che ha aperto la lezione sulla somministrazione sicura."},
{id:"s49", tipo:"frase", tema:"chiaro", sopratitolo:"Nel prossimo modulo · vicini a questi temi, dal lato dei dispositivi",
  testo:"**Accessi venosi**, **terapia infusionale** e **trasfusioni**."},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossimo modulo",
  titolo:"Modulo 6<br>Accessi vascolari<br>e infusioni", sottotitolo:"Terapia infusionale ed emocomponenti · ci vediamo lì",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
