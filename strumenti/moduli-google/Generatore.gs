/**
 * GENERATORE DI MODULI – CISL FP Padova Rovigo
 *
 * Crea un Google Modulo a partire da una scheda di questo foglio.
 * Si usa dal menu «Moduli CISL FP», che compare in alto quando apri il foglio.
 *
 * Ogni scheda è un modulo: in alto le impostazioni (titolo, descrizione…),
 * sotto la riga «TIPO» l'elenco delle domande, una per riga.
 * Tipi di domanda: SEZIONE, TITOLO, BREVE, LUNGA, SCELTA, MULTIPLA, ELENCO,
 * SCALA, DATA, ORA, CONSENSO. La guida completa è nella scheda «Guida».
 */

var COLORI = { verde: '#06381F', verde2: '#0B6B3A', giallo: '#FFD60A', chiaro: '#F4FAF5', grigio: '#5B6B62' };
var TIPI = ['SEZIONE', 'TITOLO', 'BREVE', 'LUNGA', 'SCELTA', 'MULTIPLA', 'ELENCO', 'SCALA', 'DATA', 'ORA', 'CONSENSO'];
var IMPOSTAZIONI = ['Titolo del modulo', 'Descrizione', 'Messaggio dopo l’invio', 'Raccogli l’email di chi risponde (SI/NO)',
  'Salva le risposte in questo foglio (SI/NO)', 'Mostra la barra di avanzamento (SI/NO)', 'Mescola l’ordine delle domande (SI/NO)'];
var USCITE = ['Link per compilare', 'Link breve', 'Link per modificare', 'Creato il'];
var INTESTAZIONE = ['TIPO', 'DOMANDA (o titolo della sezione)', 'TESTO DI AIUTO', 'OPZIONI (separate da ;)', 'OBBLIGATORIA (SI/NO)', 'MAX SCELTE', 'FORMATO'];

/* ---------------------------------------------------------------- menu */

function onOpen() {
  SpreadsheetApp.getUi().createMenu('Moduli CISL FP')
    .addItem('▶ Crea il modulo da questa scheda', 'creaModuloDaScheda')
    .addSeparator()
    .addItem('Nuova scheda vuota', 'nuovaSchedaVuota')
    .addItem('Esempio: sondaggio pre-assemblea 7 dicembre', 'schedaPreAssemblea')
    .addItem('Mostra la guida', 'mostraGuida')
    .addToUi();
}

/* ------------------------------------------------------ creazione modulo */

function creaModuloDaScheda() {
  var ui = SpreadsheetApp.getUi();
  var sh = SpreadsheetApp.getActiveSheet();
  var dati = leggiScheda_(sh);
  if (!dati.ok) { ui.alert('Non posso creare il modulo', dati.errore, ui.ButtonSet.OK); return; }
  var imp = dati.impostazioni;
  if (!imp['Titolo del modulo']) { ui.alert('Manca il titolo', 'Scrivi il titolo del modulo nella riga «Titolo del modulo».', ui.ButtonSet.OK); return; }
  if (dati.uscite['Link per modificare']) {
    var r = ui.alert('Questa scheda ha già creato un modulo',
      'Vuoi crearne uno nuovo? Quello vecchio resta nel tuo Drive.', ui.ButtonSet.YES_NO);
    if (r !== ui.Button.YES) return;
  }
  var form = costruisciModulo_(imp, dati.domande);
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  if (si_(imp['Salva le risposte in questo foglio (SI/NO)'], true)) {
    form.setDestination(FormApp.DestinationType.SPREADSHEET, ss.getId());
  }
  try { // il modulo va nella stessa cartella del foglio
    var cartelle = DriveApp.getFileById(ss.getId()).getParents();
    if (cartelle.hasNext()) DriveApp.getFileById(form.getId()).moveTo(cartelle.next());
  } catch (e) { /* se non si può spostare resta nella cartella principale del Drive */ }
  var link = form.getPublishedUrl();
  var breve = link;
  try { breve = form.shortenFormUrl(link); } catch (e) {}
  scriviUscita_(sh, dati.righeUscite, {
    'Link per compilare': link, 'Link breve': breve, 'Link per modificare': form.getEditUrl(),
    'Creato il': Utilities.formatDate(new Date(), 'Europe/Rome', 'dd/MM/yyyy HH:mm')
  });
  ui.alert('Modulo creato ✓',
    'Domande: ' + dati.domande.filter(function (d) { return d.tipo !== 'SEZIONE' && d.tipo !== 'TITOLO'; }).length +
    '\n\nLink da condividere:\n' + breve + '\n\nI link sono scritti anche nella scheda, in alto.', ui.ButtonSet.OK);
}

function costruisciModulo_(imp, domande) {
  var form = FormApp.create(imp['Titolo del modulo']);
  form.setTitle(imp['Titolo del modulo']);
  if (imp['Descrizione']) form.setDescription(imp['Descrizione']);
  if (imp['Messaggio dopo l’invio']) form.setConfirmationMessage(imp['Messaggio dopo l’invio']);
  form.setCollectEmail(si_(imp['Raccogli l’email di chi risponde (SI/NO)'], false));
  form.setProgressBar(si_(imp['Mostra la barra di avanzamento (SI/NO)'], true));
  form.setShuffleQuestions(si_(imp['Mescola l’ordine delle domande (SI/NO)'], false));
  form.setAllowResponseEdits(false);
  form.setShowLinkToRespondAgain(false);
  domande.forEach(function (d) { aggiungiDomanda_(form, d); });
  return form;
}

function aggiungiDomanda_(form, d) {
  var item, opz = d.opzioni, altro = false;
  // l'opzione «Altro…» (scritta come ALTRO) diventa la casella libera di Google Moduli
  opz = opz.filter(function (o) { if (/^altro(\.\.\.|…)?$/i.test(o)) { altro = true; return false; } return true; });
  switch (d.tipo) {
    case 'SEZIONE': item = form.addPageBreakItem(); break;
    case 'TITOLO': item = form.addSectionHeaderItem(); break;
    case 'BREVE':
      item = form.addTextItem();
      if (d.formato === 'EMAIL') item.setValidation(FormApp.createTextValidation().requireTextIsEmail().setHelpText('Scrivi un indirizzo email valido').build());
      if (d.formato === 'NUMERO') item.setValidation(FormApp.createTextValidation().requireNumber().setHelpText('Scrivi un numero').build());
      if (d.formato === 'TELEFONO') item.setValidation(FormApp.createTextValidation().requireTextMatchesPattern('^[+0-9 ]{6,20}$').setHelpText('Scrivi un numero di telefono').build());
      break;
    case 'LUNGA': item = form.addParagraphTextItem(); break;
    case 'SCELTA':
      item = form.addMultipleChoiceItem().setChoiceValues(opz);
      if (altro) item.showOtherOption(true);
      break;
    case 'MULTIPLA':
      item = form.addCheckboxItem().setChoiceValues(opz);
      if (altro) item.showOtherOption(true);
      if (d.max > 0) item.setValidation(FormApp.createCheckboxValidation().requireSelectAtMost(d.max).setHelpText('Puoi sceglierne al massimo ' + d.max).build());
      break;
    case 'ELENCO': item = form.addListItem().setChoiceValues(opz); break;
    case 'SCALA': // opzioni: minimo ; massimo ; etichetta minimo ; etichetta massimo
      item = form.addScaleItem().setBounds(parseInt(opz[0] || '1', 10), parseInt(opz[1] || '5', 10));
      if (opz[2] || opz[3]) item.setLabels(opz[2] || '', opz[3] || '');
      break;
    case 'DATA': item = form.addDateItem(); break;
    case 'ORA': item = form.addTimeItem(); break;
    case 'CONSENSO': // una sola casella da spuntare
      item = form.addCheckboxItem().setChoiceValues([opz[0] || 'Acconsento']);
      break;
  }
  item.setTitle(d.domanda);
  if (d.aiuto) item.setHelpText(d.aiuto);
  if (d.obbligatoria && item.setRequired) item.setRequired(true);
}

/* --------------------------------------------------------- lettura scheda */

function leggiScheda_(sh) {
  var v = sh.getDataRange().getDisplayValues();
  var riga = -1;
  for (var i = 0; i < v.length; i++) if (String(v[i][0]).trim().toUpperCase() === 'TIPO') { riga = i; break; }
  if (riga < 0) return { ok: false, errore: 'In questa scheda non trovo la riga di intestazione «TIPO». Usa «Nuova scheda vuota» dal menu per partire dal modello.' };
  var impostazioni = {}, uscite = {}, righeUscite = {};
  for (var j = 0; j < riga; j++) {
    var k = String(v[j][0]).trim();
    if (IMPOSTAZIONI.indexOf(k) >= 0) impostazioni[k] = String(v[j][1]).trim();
    if (USCITE.indexOf(k) >= 0) { uscite[k] = String(v[j][1]).trim(); righeUscite[k] = j + 1; }
  }
  var domande = [], errori = [];
  for (var r = riga + 1; r < v.length; r++) {
    var tipo = String(v[r][0]).trim().toUpperCase(), testo = String(v[r][1]).trim();
    if (!tipo && !testo) continue;
    if (TIPI.indexOf(tipo) < 0) { errori.push('Riga ' + (r + 1) + ': il tipo «' + v[r][0] + '» non esiste.'); continue; }
    if (!testo) { errori.push('Riga ' + (r + 1) + ': manca il testo della domanda.'); continue; }
    var opzioni = String(v[r][3]).split(';').map(function (s) { return s.trim(); }).filter(String);
    if (['SCELTA', 'MULTIPLA', 'ELENCO'].indexOf(tipo) >= 0 && opzioni.length < 1) { errori.push('Riga ' + (r + 1) + ': «' + testo + '» ha bisogno di almeno un’opzione.'); continue; }
    domande.push({ tipo: tipo, domanda: testo, aiuto: String(v[r][2]).trim(), opzioni: opzioni,
      obbligatoria: si_(v[r][4], false), max: parseInt(v[r][5], 10) || 0, formato: String(v[r][6]).trim().toUpperCase() });
  }
  if (errori.length) return { ok: false, errore: errori.join('\n') };
  if (!domande.length) return { ok: false, errore: 'Sotto la riga «TIPO» non c’è nessuna domanda.' };
  return { ok: true, impostazioni: impostazioni, uscite: uscite, righeUscite: righeUscite, domande: domande };
}

function scriviUscita_(sh, righe, valori) {
  Object.keys(valori).forEach(function (k) { if (righe[k]) sh.getRange(righe[k], 2).setValue(valori[k]); });
}

function si_(x, predefinito) {
  var s = String(x || '').trim().toUpperCase();
  if (!s) return predefinito;
  return s === 'SI' || s === 'SÌ' || s === 'S' || s === 'TRUE' || s === 'X';
}

/* ------------------------------------------------------- schede modello */

function nuovaSchedaVuota() {
  var nome = SpreadsheetApp.getUi().prompt('Nome della nuova scheda (es. «Gradimento corso»)').getResponseText() || 'Nuovo modulo';
  preparaScheda_(nome, { 'Titolo del modulo': '', 'Descrizione': '', 'Messaggio dopo l’invio': 'Grazie! La tua risposta è stata registrata.' },
    [['SCELTA', 'Scrivi qui la prima domanda', '', 'Prima opzione; Seconda opzione; Altro', 'SI', '', '']]);
}

function preparaScheda_(nome, imp, righe) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var base = nome, n = 2;
  while (ss.getSheetByName(nome)) nome = base + ' ' + (n++);
  var sh = ss.insertSheet(nome);
  sh.getRange('A1').setValue('GENERATORE DI MODULI · CISL FP PADOVA ROVIGO').setFontWeight('bold').setFontSize(14).setFontColor(COLORI.verde);
  sh.getRange('A2').setValue('Compila le impostazioni e le domande, poi menu «Moduli CISL FP» → «Crea il modulo da questa scheda».').setFontColor(COLORI.grigio);
  var r = 4;
  IMPOSTAZIONI.forEach(function (k) {
    var def = imp[k] !== undefined ? imp[k] : (k.indexOf('(SI/NO)') > 0 ? (k.indexOf('Salva') === 0 || k.indexOf('Mostra') === 0 ? 'SI' : 'NO') : '');
    sh.getRange(r, 1, 1, 2).setValues([[k, def]]);
    sh.getRange(r, 1).setFontWeight('bold').setBackground(COLORI.chiaro);
    if (k.indexOf('(SI/NO)') > 0) sh.getRange(r, 2).setDataValidation(SpreadsheetApp.newDataValidation().requireValueInList(['SI', 'NO'], true).build());
    r++;
  });
  r++;
  USCITE.forEach(function (k) {
    sh.getRange(r, 1).setValue(k).setFontWeight('bold').setBackground(COLORI.giallo).setFontColor(COLORI.verde);
    sh.getRange(r, 2).setFontColor(COLORI.verde2);
    r++;
  });
  r++;
  sh.getRange(r, 1, 1, INTESTAZIONE.length).setValues([INTESTAZIONE])
    .setFontWeight('bold').setBackground(COLORI.verde).setFontColor('#FFFFFF');
  sh.setFrozenRows(0);
  if (righe.length) sh.getRange(r + 1, 1, righe.length, INTESTAZIONE.length).setValues(righe);
  var corpo = sh.getRange(r + 1, 1, 200, 1);
  corpo.setDataValidation(SpreadsheetApp.newDataValidation().requireValueInList(TIPI, true).build());
  sh.getRange(r + 1, 5, 200, 1).setDataValidation(SpreadsheetApp.newDataValidation().requireValueInList(['SI', 'NO'], true).build());
  sh.getRange(r + 1, 7, 200, 1).setDataValidation(SpreadsheetApp.newDataValidation().requireValueInList(['EMAIL', 'NUMERO', 'TELEFONO'], true).setAllowInvalid(true).build());
  // le sezioni in evidenza
  var regola = SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied('=OR($A' + (r + 1) + '="SEZIONE",$A' + (r + 1) + '="TITOLO")')
    .setBackground(COLORI.chiaro).setBold(true).setRanges([sh.getRange(r + 1, 1, 200, INTESTAZIONE.length)]).build();
  sh.setConditionalFormatRules([regola]);
  sh.setColumnWidth(1, 270); sh.setColumnWidth(2, 420); sh.setColumnWidth(3, 300); sh.setColumnWidth(4, 420);
  sh.setColumnWidth(5, 150); sh.setColumnWidth(6, 100); sh.setColumnWidth(7, 110);
  sh.getRange(1, 1, r + 200, INTESTAZIONE.length).setWrap(true).setVerticalAlignment('top');
  ss.setActiveSheet(sh);
  return sh;
}

/* ------------------------------------------- esempio: sondaggio pre-assemblea */

function schedaPreAssemblea() {
  var meet = 'https://meet.google.com/ktd-ryxq-pcn';
  preparaScheda_('Pre-assemblea 7 dicembre', {
    'Titolo del modulo': 'Assemblea del 7 dicembre: porta la tua voce al tavolo',
    'Descrizione': 'Lunedì 7 dicembre, dalle 7:30 alle 13:00, Aula Magna (2° piano, palazzina dei servizi) e in diretta su Google Meet.\n' +
      'Assemblea retribuita per tutto il personale del comparto AOUP.\n\n' +
      'Due minuti per dirci cosa ti interessa e quali domande vuoi portare all’Azienda: le useremo in assemblea e al prossimo tavolo.\n' +
      'Il sondaggio è anonimo. Nome e contatti, in fondo, li lasci solo se vuoi.\n\nCISL FP Padova Rovigo',
    'Messaggio dopo l’invio': 'Grazie! La tua risposta è arrivata.\n\nCi vediamo lunedì 7 dicembre, dalle 7:30, in Aula Magna. ' +
      'Se non puoi venire, seguici su Google Meet: ' + meet + '\n\nCISL FP Padova Rovigo · 391 127 1018',
    'Raccogli l’email di chi risponde (SI/NO)': 'NO',
    'Salva le risposte in questo foglio (SI/NO)': 'SI',
    'Mostra la barra di avanzamento (SI/NO)': 'SI',
    'Mescola l’ordine delle domande (SI/NO)': 'NO'
  }, [
    ['SEZIONE', 'Chi sei', 'Servono solo a capire chi ha risposto: non ti chiediamo il nome.', '', '', '', ''],
    ['SCELTA', 'Qual è la tua qualifica?', '', 'Infermiere/a; Operatore socio sanitario; Tecnico sanitario; Ostetrica/o; Amministrativo/a; Altro', 'SI', '', ''],
    ['BREVE', 'In quale reparto o servizio lavori?', 'Facoltativo', '', 'NO', '', ''],
    ['SCELTA', 'Come lavori?', '', 'Turni sulle 24 ore, notti comprese; Turni senza notti; A giornata', 'SI', '', ''],
    ['SEZIONE', 'L’assemblea', '', '', '', '', ''],
    ['SCELTA', 'Come pensi di partecipare?', 'L’assemblea è retribuita: vieni quando il turno te lo permette.', 'In Aula Magna; Su Google Meet; Non riesco, ma voglio ricevere i materiali; Non lo so ancora', 'SI', '', ''],
    ['MULTIPLA', 'In quale fascia oraria pensi di esserci?', 'Puoi sceglierne più di una', 'Dalle 7:30 alle 9:30; Dalle 9:30 alle 11:30; Dalle 11:30 alle 13:00', 'NO', '', ''],
    ['MULTIPLA', 'Quali punti dell’ordine del giorno ti interessano di più?', 'Scegline al massimo 3', '1 · Nuovo CCNL Sanità 2025-2027; 2 · Accordi decentrati AOUP 2026; 3 · Sistema degli incarichi; 4 · Welfare Regione Veneto; 5 · Vertenze legali (buono pasto, festivo infrasettimanale, indennità di ferie); 6 · Incentivi per le funzioni tecniche; 7 · Andamenti occupazionali; 8 · Retention e benessere organizzativo; 9 · Situazione previdenziale; 10 · Varie ed eventuali', 'SI', '3', ''],
    ['SCALA', 'Quanto ti senti informato/a su contratto e accordi aziendali?', '', '1; 5; Per niente; Molto', 'NO', '', ''],
    ['SEZIONE', 'Le tue domande', 'Scrivi liberamente: le risposte sono anonime.', '', '', '', ''],
    ['LUNGA', 'Che domanda vuoi portare al tavolo con l’Azienda?', 'Ogni domanda diventa una nostra richiesta.', '', 'NO', '', ''],
    ['LUNGA', 'C’è un problema nel tuo reparto che vuoi segnalarci?', 'Turni, organici, ferie, sicurezza, buste paga…', '', 'NO', '', ''],
    ['SEZIONE', 'Restiamo in contatto (facoltativo)', 'Lascia i tuoi dati solo se vuoi ricevere i materiali dell’assemblea o essere ricontattato/a. Se li lasci, la risposta non è più anonima.', '', '', '', ''],
    ['BREVE', 'Nome e cognome', '', '', 'NO', '', ''],
    ['BREVE', 'Email', '', '', 'NO', '', 'EMAIL'],
    ['BREVE', 'Telefono', '', '', 'NO', '', 'TELEFONO'],
    ['CONSENSO', 'Dati personali', 'I dati servono solo alla CISL FP Padova Rovigo per inviarti i materiali e ricontattarti; non sono ceduti a terzi.', 'Acconsento al trattamento dei miei dati per essere ricontattato/a dalla CISL FP', 'NO', '', '']
  ]);
  SpreadsheetApp.getUi().alert('Scheda pronta ✓', 'Controlla e modifica le domande come vuoi, poi menu «Moduli CISL FP» → «Crea il modulo da questa scheda».', SpreadsheetApp.getUi().ButtonSet.OK);
}

/* ---------------------------------------------------------------- guida */

function mostraGuida() {
  var t = '<div style="font-family:Arial;font-size:13px;line-height:1.5">' +
    '<h3 style="color:#06381F;margin:0 0 8px">Come si usa</h3>' +
    '<ol><li>In alto scrivi titolo, descrizione e messaggio finale.</li>' +
    '<li>Sotto la riga verde <b>TIPO</b> metti una domanda per riga.</li>' +
    '<li>Menu <b>Moduli CISL FP → Crea il modulo da questa scheda</b>. I link compaiono nelle righe gialle.</li></ol>' +
    '<h3 style="color:#06381F;margin:12px 0 6px">Tipi di domanda</h3><table style="border-collapse:collapse">' +
    [['SEZIONE', 'Nuova pagina del modulo, con titolo'], ['TITOLO', 'Titolo e testo, senza cambiare pagina'], ['BREVE', 'Risposta su una riga (formato: EMAIL, NUMERO, TELEFONO)'],
     ['LUNGA', 'Risposta libera su più righe'], ['SCELTA', 'Una sola risposta fra le opzioni'], ['MULTIPLA', 'Più risposte (MAX SCELTE per il limite)'],
     ['ELENCO', 'Una risposta da un menu a tendina'], ['SCALA', 'Da 1 a 5 o da 1 a 10. Opzioni: min; max; etichetta min; etichetta max'],
     ['DATA', 'Una data'], ['ORA', 'Un orario'], ['CONSENSO', 'Una casella da spuntare (es. privacy)']]
      .map(function (x) { return '<tr><td style="padding:2px 10px 2px 0"><b>' + x[0] + '</b></td><td>' + x[1] + '</td></tr>'; }).join('') +
    '</table><p>Le opzioni si separano con il punto e virgola. Scrivi <b>Altro</b> come ultima opzione per avere la casella libera «Altro».</p>' +
    '<p>Ogni scheda è un modulo diverso: per farne uno nuovo usa <b>Nuova scheda vuota</b> o duplica una scheda esistente.</p></div>';
  SpreadsheetApp.getUi().showModalDialog(HtmlService.createHtmlOutput(t).setWidth(560).setHeight(520), 'Guida al generatore');
}
