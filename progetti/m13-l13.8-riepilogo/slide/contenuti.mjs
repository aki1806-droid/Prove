// Contenuto delle 50 scene della lezione 13.8 — riepilogo del Modulo 13.
// Il filo è la «mappa del sistema in una pagina»: si apre con le sette parti
// del sistema veneto in fila, poi ogni parte torna con il suo schema;
// le confusioni sono trappole, le domande d'orale griglie numerate.

const ULSS = (att, sop) => ({tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:sop, celle:[
  {n:"1", t:"**Dolomiti**"}, {n:"2", t:"**Marca Trevigiana**"}, {n:"3", t:"**Serenissima**"},
  {n:"4", t:"**Veneto Orientale**"}, {n:"5", t:"**Polesana**"}, {n:"6", t:"**Euganea**"},
  {n:"7", t:"**Pedemontana**"}, {n:"8", t:"**Berica**"}, {n:"9", t:"**Scaligera**"}], attive:att});

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 13 · Riepilogo",
  titolo:"Il sistema veneto<br>in una pagina", sottotitolo:"13.8 · Riepilogo del modulo e autovalutazione",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"percorso", tema:"chiaro", sopratitolo:"La mappa da avere in testa all'orale", tappe:[
  {t:"Il vertice"}, {t:"Le aziende"}, {t:"Ospedale ed emergenza"}, {t:"Il territorio"},
  {t:"Non autosufficienza"}, {t:"Garanzie e prevenzione"}, {t:"Sanità digitale", key:true}]},
{id:"s03", tipo:"tre", tema:"chiaro", sopratitolo:"Se ti chiedono di un servizio, devi sapere", box:[
  {n:"1", t:"Dove si colloca", d:"in quale parte del sistema"},
  {n:"2", t:"Chi lo governa"},
  {n:"3", t:"Come ci si accede", key:true}]},

{id:"s04", tipo:"confronto", tema:"chiaro", sopratitolo:"Il vertice · la Regione", col:[
  {h:"Giunta e Consiglio regionale", t:"definiscono **indirizzi** e **programmazione**"},
  {h:"Area Sanità e Sociale", t:"traduce gli indirizzi in **atti**"}]},
{id:"s05", tipo:"norma", tema:"chiaro", sopratitolo:"La programmazione",
  etichetta:"Piano Socio Sanitario Regionale", sigla:"PSSR 2019-2023",
  testo:"Approvato con la **L.R. 48/2018** · riferimento **in attesa del nuovo piano**."},
{id:"s06", tipo:"icone", tema:"chiaro", sopratitolo:"Le schede di dotazione · con delibera di Giunta regionale", voci:[
  {icona:"ospedale", t:"Ospedaliera", d:"per ogni ospedale"},
  {icona:"persone", t:"Territoriale", d:"per ogni territorio"},
  {icona:"documento", t:"Funzioni e posti letto", d:"che cosa stabiliscono", key:true}]},
{id:"s07", tipo:"norma", tema:"chiaro", sopratitolo:"Il vertice · Azienda Zero",
  etichetta:"Istituisce Azienda Zero", sigla:"L.R. 19/2016",
  testo:"L'ente di **governance** della sanità regionale · operativo dal **2017**."},
{id:"s08", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"Azienda Zero · le funzioni centralizzate", celle:[
  {t:"**GSA** · gestione sanitaria accentrata"}, {t:"**CRAV** · gli acquisti"}, {t:"I **concorsi**"},
  {t:"**Sistemi informativi** e Fascicolo"}, {t:"**Formazione** e affari legali"}, {t:"**Epidemiologia** e registri"}]},

{id:"s09", ...ULSS([0,1,2,3,4], "Le aziende · 9 ULSS dal 1° gennaio 2017")},
{id:"s10", ...ULSS([0,1,2,3,4,5,6,7,8], "Le vecchie aziende diventano i distretti delle nuove")},
{id:"s11", tipo:"confronto", tema:"chiaro", sopratitolo:"Le due aziende ospedaliere universitarie", col:[
  {h:"AOU Padova", t:"Azienda **Ospedale-Università** di Padova"},
  {h:"AOUI Verona", t:"Azienda Ospedaliera Universitaria **Integrata** di Verona"}]},
{id:"s12", tipo:"icone", tema:"chiaro", sopratitolo:"Gli altri enti della rete", voci:[
  {icona:"cappello", t:"IOV · IRCCS", d:"Istituto Oncologico Veneto · ricovero e cura a carattere scientifico", key:true},
  {icona:"certificato", t:"Privati accreditati", d:"integrati nella rete"}]},

{id:"s13", tipo:"raggiera", tema:"chiaro", sopratitolo:"Hub: alte specialità · spoke: ospedali di rete", centro:"Hub",
  raggi:[{t:"Spoke"},{t:"Spoke"},{t:"Spoke"},{t:"Spoke"},{t:"Spoke"}]},
{id:"s14", tipo:"tre", tema:"chiaro", sopratitolo:"SUEM 118 · Servizio Urgenza Emergenza Medica", box:[
  {n:"7", t:"Centrali operative", d:"su base provinciale", key:true},
  {n:"Dispatch", t:"Infermieristico", d:"attribuisce il codice di priorità"},
  {n:"In volo", t:"Elisoccorso"}]},
{id:"s15", tipo:"confronto", tema:"chiaro", sopratitolo:"Sopra le centrali", col:[
  {h:"CREU", t:"**coordinamento regionale** dell'emergenza urgenza"},
  {h:"NUE 112", t:"Numero Unico di Emergenza europeo · **in attuazione**"}]},
{id:"s16", tipo:"tre", tema:"chiaro", sopratitolo:"Le reti tempo-dipendenti", box:[
  {n:"Rete", t:"Infarto", d:"ECG teletrasmesso · se STEMI, **emodinamica diretta**", key:true},
  {n:"Rete", t:"Ictus", d:"hub per la **trombectomia**"},
  {n:"Rete", t:"Trauma"}]},
{id:"s17", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"Le reti cliniche · non l'ospedale più vicino, ma quello giusto", celle:[
  {t:"**ROV** · Rete Oncologica Veneta"}, {t:"**Punti nascita**"}, {t:"**Trapianti**"},
  {t:"**Malattie rare**"}, {t:"**Dolore** e cure palliative"}]},

{id:"s18", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"Il territorio · il distretto socio-sanitario, articolazione dell'ULSS", celle:[
  {t:"Assistenza **primaria**"}, {t:"**Specialistica**"}, {t:"**ADI**"},
  {t:"**Consultori**"}, {t:"**Residenzialità**"}, {t:"Integrazione con i **Comuni**"}]},
{id:"s19", tipo:"confronto", tema:"chiaro", sopratitolo:"Le forme associative della medicina generale", col:[
  {h:"Il modello veneto", t:"**Medicine di gruppo integrate**: sede comune, infermieri, apertura estesa"},
  {h:"Le forme nazionali", t:"**AFT** e **UCCP**"}]},
{id:"s20", tipo:"percorso", tema:"chiaro", sopratitolo:"Le cure intermedie · fra ospedale e domicilio", tappe:[
  {t:"Ospedale per acuti", d:"non serve più"},
  {t:"Cure intermedie", d:"Ospedali di Comunità · URT · hospice", key:true},
  {t:"Casa", d:"non ancora possibile"}]},
{id:"s21", tipo:"cifre", tema:"chiaro", sopratitolo:"Il DM 77 in Veneto · Case della Comunità: linee di indirizzo regionali 2026", voci:[
  {n:"100", suf:"mila", d:"abitanti per ogni **COT**"},
  {n:"3", suf:"mila", d:"abitanti per ogni **infermiere di famiglia e comunità**", key:true}]},
{id:"s22", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Il territorio · gli altri servizi", celle:[
  {t:"**Continuità assistenziale** · ex guardia medica"}, {t:"**116117** · cure non urgenti"},
  {t:"**ADI** e cure palliative domiciliari"}, {t:"**Stratificazione** (ACG) e medicina di iniziativa"}]},

{id:"s23", tipo:"tre", tema:"chiaro", sopratitolo:"La porta unica · UVMD, Unità di Valutazione Multidimensionale Distrettuale", box:[
  {n:"1", t:"Direttore di distretto"},
  {n:"2", t:"Medico di famiglia"},
  {n:"3", t:"Assistente sociale", d:"del Comune"}]},
{id:"s24", tipo:"confronto", tema:"chiaro", sopratitolo:"Gli strumenti della valutazione multidimensionale", col:[
  {h:"SVaMA", t:"l'**anziano**"},
  {h:"SVaMDi", t:"la **disabilità**"}],
  sotto:"Un profilo di autonomia e di bisogno, uguale in tutta la regione."},
{id:"s25", tipo:"scala", tema:"chiaro", sopratitolo:"La domiciliarità viene prima", gradini:[
  {n:"1", t:"Domiciliarità", d:"ADI · SAD · impegnativa di cura domiciliare", key:true},
  {n:"2", t:"Centri diurni"},
  {n:"3", t:"Sollievo", d:"ricoveri temporanei"}]},
{id:"s26", tipo:"confronto", tema:"chiaro", sopratitolo:"I Centri di Servizi · residenze per anziani non autosufficienti", col:[
  {h:"Impegnativa di residenzialità", t:"copre la **quota sanitaria**"},
  {h:"Quota alberghiera", t:"a carico della **persona** o della famiglia"}]},
{id:"s27", tipo:"frase", tema:"chiaro", sopratitolo:"Per ogni ospite il PAI · Piano Assistenziale Individualizzato",
  testo:"Prima si valuta **il bisogno**, poi si sceglie **il servizio**."},

{id:"s28", tipo:"norma", tema:"chiaro", sopratitolo:"Garanzie e prevenzione",
  etichetta:"Autorizzazione e accreditamento", sigla:"L.R. 22/2002",
  testo:"Strutture **sanitarie**, **socio-sanitarie** e **sociali** · pubbliche e private."},
{id:"s29", tipo:"percorso", tema:"chiaro", sopratitolo:"Le fasi della L.R. 22/2002", tappe:[
  {t:"Realizzazione", d:"autorizzazione"},
  {t:"Esercizio", d:"requisiti minimi"},
  {t:"Accreditamento", d:"requisiti ulteriori · per conto del SSR", key:true},
  {t:"Accordi contrattuali"}]},
{id:"s30", tipo:"tabella", tema:"chiaro", sopratitolo:"Il Dipartimento di Prevenzione delle ULSS", colonne:["28%","72%"],
  intestazioni:["Servizio", "Di che cosa si occupa"], righe:[
  ["SISP", "igiene e **sanità pubblica**"],
  ["SIAN", "igiene degli **alimenti** e della **nutrizione**"],
  ["SPISAL", "**sicurezza** nei luoghi di lavoro"],
  ["Veterinari", "i servizi **veterinari**"]]},
{id:"s31", tipo:"tre", tema:"chiaro", sopratitolo:"Piano Regionale della Prevenzione · screening gratuiti, con invito attivo", box:[
  {n:"Screening", t:"Mammella"},
  {n:"Screening", t:"Cervice"},
  {n:"Screening", t:"Colon-retto", d:"in Veneto esteso a **70-74 anni**", key:true}]},
{id:"s32", tipo:"confronto", tema:"chiaro", sopratitolo:"Vaccinazioni e registri", col:[
  {h:"L. 119/2017", t:"**10 vaccinazioni obbligatorie** per i minori · centri vaccinali ULSS"},
  {h:"Registro Tumori", t:"oggi in **Azienda Zero**"}]},

{id:"s33", tipo:"icone", tema:"chiaro", sopratitolo:"La sanità digitale · FSE e «Sanità km zero»", voci:[
  {icona:"cartella", t:"Fascicolo"}, {icona:"documento", t:"Ricette"},
  {icona:"orologio", t:"Prenota Veloce!"}, {icona:"lucchetto", t:"SPID o CIE", d:"per accedere", key:true}]},
{id:"s34", tipo:"icone", tema:"chiaro", sopratitolo:"I diritti del cittadino sul Fascicolo", voci:[
  {icona:"spunta", t:"Consenso", d:"alla consultazione dei professionisti", key:true},
  {icona:"occhio", t:"Oscuramento", d:"di singoli documenti"},
  {icona:"persone", t:"Delega", d:"a un'altra persona"}]},
{id:"s35", tipo:"tabella", tema:"chiaro", sopratitolo:"La ricetta dematerializzata · le classi di priorità", colonne:["18%","32%","50%"],
  intestazioni:["Classe", "Significato", "Entro"], righe:[
  ["**U**", "urgente", "72 ore"],
  ["**B**", "breve", "10 giorni"],
  ["**D**", "differibile", "30 giorni le visite · 60 gli accertamenti"],
  ["**P**", "programmata", "—"]]},
{id:"s36", tipo:"icone", tema:"chiaro", sopratitolo:"La cartella elettronica", voci:[
  {icona:"lucchetto", t:"Credenziali", d:"personali e non cedibili"},
  {icona:"scudo", t:"Solo se in cura", d:"ogni accesso è registrato", key:true},
  {icona:"chat", t:"Telemedicina"}]},

{id:"s37", tipo:"trappola", tema:"chiaro", sopratitolo:"Le confusioni che costano più punti", righe:[
  {sb:"Centri di Servizi ≠ RSA", ok:"È il **nome veneto** delle RSA"},
  {sb:"Impegnativa di residenzialità = retta", ok:"Copre la **quota sanitaria**, non la retta alberghiera"}]},
{id:"s38", tipo:"trappola", tema:"chiaro", sopratitolo:"Le confusioni che costano più punti", righe:[
  {sb:"Azienda Zero cura i pazienti", ok:"Non eroga prestazioni: fa sì che le altre aziende **li curino meglio**"},
  {sb:"ULSS = ASL", ok:"Unità Locale **Socio** Sanitaria"}]},
{id:"s39", tipo:"trappola", tema:"chiaro", sopratitolo:"Le confusioni che costano più punti", righe:[
  {sb:"21 ULSS", ok:"Da 21 a **9 ULSS**, nel 2017"},
  {sb:"Il Fascicolo si alimenta con il consenso", ok:"Alimentazione **automatica** · consultazione **con consenso**"}]},

{id:"s40", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Le domande d'orale più probabili", celle:[
  {n:"1", t:"**Azienda Zero** e le sue funzioni"}, {n:"2", t:"Come è organizzato il **sistema veneto**"},
  {n:"3", t:"I **Centri di Servizi** e come si accede"}]},
{id:"s41", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Le domande d'orale più probabili", celle:[
  {n:"4", t:"**UVMD** e **SVaMA**"}, {n:"5", t:"La rete per l'**infarto** o l'**ictus**"},
  {n:"6", t:"Le **medicine di gruppo** integrate"}, {n:"7", t:"L'**infermiere di famiglia** e comunità"},
  {n:"8", t:"L'accesso al **Fascicolo** e le responsabilità"}]},
{id:"s42", tipo:"cifre", tema:"chiaro", sopratitolo:"Con la mappa in testa: dove, chi governa, come si accede", voci:[
  {n:"8", suf:"", d:"domande"}, {n:"1", suf:"min", d:"di risposta per ciascuna", key:true}]},

{id:"s43", tipo:"icone", tema:"chiaro", sopratitolo:"Come proseguire", voci:[
  {icona:"spunta", t:"Test del modulo", d:"30 domande · soglia 21", key:true},
  {icona:"documento", t:"La mappa", d:"disegnata a memoria"},
  {icona:"libro", t:"L'atto aziendale", d:"dell'azienda in cui vorresti lavorare"}]},
{id:"s44", tipo:"confronto", tema:"chiaro", sopratitolo:"Nelle settimane prima della prova", col:[
  {h:"Sfoglia", t:"la **Relazione Socio Sanitaria** più recente"},
  {h:"Verifica le novità", t:"nuovo **piano**, **Case della Comunità**, **NUE 112**"}]},

{id:"s45", tipo:"confronto", tema:"chiaro", sopratitolo:"La risposta che fa la differenza", col:[
  {h:"Non solo", t:"«che **cos'è**»", grande:true},
  {h:"Ma", t:"«come lo uso **da infermiere**»", grande:true}]},
{id:"s46", tipo:"catena", tema:"chiaro", sopratitolo:"Le COT coordinano le transizioni fra setting", passi:[
  {t:"Dimetto un paziente **fragile**"},
  {t:"Segnalo il caso alla **COT**"},
  {t:"Dimissione **protetta**", d:"la stessa informazione, detta da un professionista", key:true}]},

{id:"s47", tipo:"titolo", tema:"profondo",
  titolo:"Conoscere il sistema veneto<br>significa sapere **dove mandare**<br>una persona, e **come accompagnarla**.",
  sotto:""},

{id:"s48", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Nel prossimo modulo · torniamo alle basi", celle:[
  {n:"1", t:"**Anatomia**"}, {n:"2", t:"**Fisiologia** e fisiopatologia degli apparati"},
  {n:"3", t:"La **semeiotica**"}, {n:"4", t:"I **valori di laboratorio**"}]},
{id:"s49", tipo:"frase", tema:"chiaro", sopratitolo:"Il Modulo 14",
  testo:"Il **fondamento scientifico** di tutto ciò che abbiamo studiato."},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossimo modulo",
  titolo:"Modulo 14<br>Basi biomediche<br>e semeiotica", sottotitolo:"Anatomia, fisiologia, fisiopatologia, semeiotica, laboratorio",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
