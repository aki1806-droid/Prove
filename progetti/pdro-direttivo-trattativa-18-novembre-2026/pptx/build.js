const pptxgen = require('pptxgenjs');
const fs = require('fs');
const notes = JSON.parse(fs.readFileSync(__dirname + '/notes.json', 'utf8')).map(n => n.replace(/&amp;/g, '&').trim());
const IMG = f => __dirname + '/img/' + f;

const K = { dark: '12402B', green: '1E7A4C', mint: 'EEF5F0', mint2: 'DDEDE3', paper: 'FBFDFB', ink: '14301F', soft: '4B6356', red: 'D7062B', yellow: 'FFD60A', cream: 'FFF6CC', orange: 'F39200', light: 'F2F7F3', pale: 'BFD8CB' };
const F = 'Arial';

const pres = new pptxgen();
pres.layout = 'LAYOUT_WIDE'; // 13.333 x 7.5
pres.title = 'Dati alla mano – Direttivo CISL FP AOUP';
pres.author = 'CISL FP Padova Rovigo';
pres.theme = { headFontFace: F, bodyFontFace: F };

pres.defineSlideMaster({ title: 'LIGHT', background: { color: K.mint },
  slideNumber: { x: 12.33, y: 6.98, w: 0.5, h: 0.3, fontFace: F, fontSize: 11, color: K.soft, bold: true, align: 'right' } });
pres.defineSlideMaster({ title: 'DARK', background: { color: K.dark },
  slideNumber: { x: 12.33, y: 6.98, w: 0.5, h: 0.3, fontFace: F, fontSize: 11, color: '9FC2B0', bold: true, align: 'right' } });

let n = 0; // animation counter per slide
const A = (k) => (k ? 'fx_' + k + '_' : 'anim_') + String(++n).padStart(2, '0');
const shadow = () => ({ type: 'outer', color: '12402B', opacity: 0.14, blur: 8, offset: 2, angle: 90 });
const LOGO_R = 2000 / 1018;

const SECS = new Set();
function slide(master, idx, section) {
  n = 0;
  if (!SECS.has(section)) { pres.addSection({ title: section }); SECS.add(section); }
  const s = pres.addSlide({ masterName: master, sectionTitle: section });
  s.addNotes(typeof idx === 'string' ? idx : notes[idx]);
  return s;
}
function foot(s, text, dark) {
  s.addText(text, { x: 0.6, y: 6.98, w: 10.5, h: 0.3, fontFace: F, fontSize: 11, bold: true, color: dark ? '9FC2B0' : K.soft, margin: 0, isTextBox: true });
}
function kick(s, text, dark, y = 0.5, w = 11.5, name) {
  s.addText(text.toUpperCase(), { x: 0.6, y, w, objectName: name || 'kick', h: 0.3, fontFace: F, fontSize: 12, bold: true, charSpacing: 3, color: dark ? K.yellow : K.green, margin: 0, isTextBox: true });
}
function title(s, a, b, opt = {}) {
  const runs = [{ text: a, options: { color: opt.dark ? K.light : K.dark } }];
  if (b) runs.push({ text: ' ' + b, options: { color: opt.bcolor || (opt.dark ? K.yellow : K.green) } });
  s.addText(runs, { x: 0.6, y: opt.y || 0.82, w: opt.w || 12.1, h: opt.h || 0.75, fontFace: F, fontSize: opt.size || 30, bold: true, margin: 0, valign: 'top', isTextBox: true, objectName: A() });
}
function card(s, x, y, w, h, fill = K.paper, anim = true) {
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h, rectRadius: 0.14, fill: { color: fill }, line: { color: fill, width: 0 }, shadow: shadow(), objectName: anim ? A() : 'card' });
}
function txt(s, text, o) {
  s.addText(text, Object.assign({ fontFace: F, margin: 0, isTextBox: true, valign: 'top', color: K.ink }, o));
}
function stamp(s, text, w = 2.4) {
  s.addText(text, { x: 12.73 - w, y: 0.55, w, h: 0.8, fontFace: F, fontSize: 32, bold: true, color: K.red, align: 'center', valign: 'middle', rotate: -7, line: { color: K.red, width: 4 }, charSpacing: 2, margin: 0, isTextBox: true, objectName: 'anim_99' });
}
function dot(s, label, x, y, d = 0.42, fill = K.dark, color = K.yellow) {
  s.addText(label, { shape: pres.shapes.OVAL, x, y, w: d, h: d, fill: { color: fill }, color, fontFace: F, fontSize: 14, bold: true, align: 'center', valign: 'middle', margin: 0 });
}
function pill(s, text, x, y, w, fill = K.dark, color = K.yellow) {
  s.addText(text, { shape: pres.shapes.ROUNDED_RECTANGLE, rectRadius: 0.2, x, y, w, h: 0.4, fill: { color: fill }, color, fontFace: F, fontSize: 11, bold: true, charSpacing: 2, align: 'center', valign: 'middle', margin: 0 });
}
const R = (t, o = {}) => ({ text: t, options: o });
/* Slide di esempio: foto a sinistra con zoom lento, passi che entrano uno alla volta, cifra chiave che «esplode». */
function example(o) {
  const s = slide('LIGHT', o.notes, o.section);
  kick(s, o.kick);
  pill(s, 'ESEMPIO PRATICO', 10.73, 0.45, 2.0, K.orange, '2A1700');
  title(s, o.a, o.b);
  s.addImage({ path: IMG(o.img), x: 0.6, y: 1.8, w: 4.9, h: 4.95, sizing: { type: 'cover', w: 4.9, h: 4.95 }, objectName: A('kb') });
  const st = o.steps, rowH = st.length > 3 ? 0.84 : 1.05;
  st.forEach(([b, r], i) => {
    const y = 1.85 + i * rowH;
    dot(s, String(i + 1), 5.85, y + 0.04, 0.46, K.green, K.paper);
    s.addText([R(b, { bold: true, color: K.dark }), R(r, { color: K.ink })], { x: 6.5, y, w: 6.2, h: rowH - 0.08, fontFace: F, fontSize: 15, margin: 0, valign: 'top', isTextBox: true, objectName: A('step') });
  });
  const f = o.fill || K.dark;
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 5.85, y: 5.35, w: 6.88, h: 1.4, rectRadius: 0.14, fill: { color: f }, line: { color: f, width: 0 }, shadow: shadow(), objectName: A('step') });
  s.addText(o.big, { x: 6.1, y: 5.45, w: 2.9, h: 1.2, fontFace: F, fontSize: o.bigSize || 36, bold: true, color: f === K.dark ? K.yellow : K.dark, valign: 'middle', margin: 0, isTextBox: true, objectName: A('pop') });
  s.addText(o.label, { x: 9.1, y: 5.45, w: 3.45, h: 1.2, fontFace: F, fontSize: 13, bold: true, color: f === K.dark ? K.pale : K.soft, valign: 'middle', margin: 0, isTextBox: true });
  foot(s, o.foot || 'Esempio costruito sui dati presentati dall’Azienda il 18/11/2026');
}
const EX = {
  E1: () => example({ section: 'Il Bugiardino', img: '7.jpg', kick: 'Esempio · I due cassetti', a: 'Un progetto si paga', b: 'da un altro cassetto.',
    notes: 'Esempio da usare quando qualcuno dice che i progetti tolgono soldi ai DEP. Il progetto H24 da 50.000 euro è vero, dall’accordo del 15/4/2026: esce dalla premialità e non tocca i 620.000 euro dei DEP.',
    steps: [['Cassetto verde: fondo incarichi e progressioni.', ' Paga DEP, incarichi di funzione e indennità professionali.'],
      ['Cassetto arancione: fondo premialità.', ' Paga produttività e progetti, come l’assistenza H24 da 50.000 €.'],
      ['Si apre il cassetto arancione per il progetto H24.', ' Il cassetto verde resta com’era.']],
    big: '620.000 €', bigSize: 30, label: 'restano sui DEP 2026, qualunque progetto si finanzi con la premialità' }),
  E2: () => example({ section: 'Il Bugiardino', img: '8.jpg', kick: 'Esempio · Il conguaglio in busta', a: 'Un ADA ex C:', b: 'cosa arriva a novembre.',
    notes: 'Gli importi sono le quote medie 2025 della slide aziendale: il singolo lavoratore può avere di più o di meno. La riduzione di 213.306 euro viene dall’articolo 11 della legge regionale, calcolata sul conto annuale certificato.',
    steps: [['Acconto già pagato: 905,88 €.', ' È la prima parte della quota media 2025.'],
      ['Conguaglio a novembre: 840,00 €.', ' Dipende da obiettivi di U.O., valutazione, presenza e tempo pieno o parziale.'],
      ['La legge regionale ha tolto 213.306 € al fondo.', ' In media circa 20 € lordi in meno per fascia rispetto all’anno scorso.']],
    big: '1.745,88 €', bigSize: 30, label: 'quota media annua 2025 di un ADA ex C: una media, non l’importo di ognuno', fill: K.cream }),
  E3: () => example({ section: 'Trattativa del 18 novembre', img: '9.jpg', kick: 'Esempio · Una coordinatrice in fascia III', a: 'Cosa cambia', b: 'in busta dal 2027.',
    notes: 'Il calcolo mensile divide i 1.000 euro annui per 13 mensilità: va confermato con la delibera e il cedolino. Le nuove fasce III bis e IV bis sono istituite dall’accordo, in attesa del nuovo regolamento.',
    steps: [['Oggi: 7.000 € l’anno di indennità di funzione.', ' Fascia III, coordinamento di complessità media.'],
      ['Dal 1° gennaio 2027: 8.000 €.', ' Fascia III bis, istituita con l’accordo del 18/11.'],
      ['In fascia IV si passa da 8.000 a 9.000 €.', ' Stesso aumento per tutti i 106 coordinatori.']],
    big: '+1.000 €', label: 'lordi l’anno per ogni coordinatore, circa 77 € lordi al mese su 13 mensilità' }),
  E4: () => example({ section: 'Trattativa del 18 novembre', img: '10.jpg', kick: 'Esempio · Dal master all’incarico', a: 'Il percorso di un', b: 'incarico professionale.',
    notes: 'I numeri dei posti vengono dalla mappatura aziendale. Il passaggio sulla laurea magistrale è la nostra richiesta al tavolo, in base al nuovo CCNL: non è ancora una regola aziendale.',
    steps: [['Mappatura:', ' l’Azienda prevede 2 posti di referente wound care (specialistico, serve il master).'],
      ['Delibera:', ' la mappatura diventa un atto formale; poi escono i bandi.'],
      ['Bando e selezione:', ' l’infermiere con il master in wound care si candida.'],
      ['Tutor didattici, 30 posti:', ' chiediamo la fascia di elevata complessità per chi ha la magistrale.']],
    big: '12 → 86', bigSize: 30, label: 'incarichi professionali: un anno e mezzo fa erano 12', fill: K.cream }),
  E5: () => example({ section: 'Trattativa del 18 novembre', img: '13.jpg', kick: 'Esempio · Incentivi per funzioni tecniche', a: 'Chi segue un contratto', b: 'deve sapere quanto gli spetta.',
    notes: 'Le nuove regole sugli incentivi tecniche sono in vigore dal 1° gennaio 2024 (decreto 36). L’Azienda ha bisogno del regolamento anche per rendicontare progetti finanziati: è interesse di tutti chiudere in fretta, ma con una quota giusta per il comparto.',
    steps: [['Il DEC, direttore dell’esecuzione del contratto,', ' controlla che una fornitura o un servizio arrivino come previsto.'],
      ['Dal 2024 l’incentivo è previsto,', ' ma senza regolamento i pagamenti restano fermi.'],
      ['La CISL FP ha chiesto', ' una quota più alta per il DEC e i collaboratori, un’area riservata con gare, ruoli e importi, un tavolo tecnico.']],
    big: 'Dal 2024', bigSize: 30, label: 'gli incentivi da pagare: il regolamento riformulato arriva a breve' }),
  E6: () => example({ section: 'Trattativa del 18 novembre', img: '11.jpg', kick: 'Esempio · Una notte in Chirurgia, 7° piano', a: 'Un infermiere ogni 19 letti.', b: 'Con l’OSS cambia la notte.',
    notes: 'Il rapporto 1:19 e lo standard 1:12-15 sono nelle slide aziendali. Le attività attribuibili all’OSS citate qui sono quelle discusse al tavolo: campanello, mobilizzazioni, trasporti notturni.',
    steps: [['Oggi:', ' 1 infermiere ogni 19 posti letto, con il pronto soccorso H24 nella stessa area.'],
      ['Lo standard di degenza:', ' da 1 ogni 12 a 1 ogni 15 posti letto.'],
      ['Con l’OSS di notte:', ' mobilizzazioni, campanelli e trasporti si attribuiscono; l’infermiere resta sul piano assistenziale.'],
      ['Per gli OSS del reparto:', ' i turni passano da M-P a M-P-N, con le preferenze raccolte prima.']],
    big: '1:19', label: 'contro uno standard di 1:12-15: il rapporto più pesante tra le chirurgie' }),
  E7: () => example({ section: 'Trattativa del 18 novembre', img: '12.jpg', kick: 'Esempio · Il voucher da 350 €', a: 'Attivato o no:', b: 'dove vanno i soldi.',
    notes: 'Messaggio pratico per i reparti: ricordare la scadenza del 30 novembre. Il residuo stimato nel comparto è di circa 185.000 euro.',
    steps: [['Se lo hai attivato:', ' hai tempo fino al 30 novembre per spenderlo.'],
      ['Se non lo hai attivato:', ' la tua quota non torna a te.'],
      ['Ruolo sanitario e sociosanitario:', ' il residuo va ai progetti della L. 26/2024.'],
      ['Area PTA:', ' il residuo va alle progettualità PTA. Dal 1° dicembre parte il nuovo voucher.']],
    big: '350 €', label: 'a testa, da attivare e spendere entro il 30 novembre', fill: K.cream }),
  E8: () => example({ section: 'Trattativa del 18 novembre', img: '14.jpg', kick: 'Esempio · DEP 2025 sospeso?', a: 'Se sei tra gli 80,', b: 'ecco cosa controllare.',
    notes: 'Numeri dalla comunicazione aziendale del 18/11: 752 aventi diritto in pagamento, 80 posizioni sospese, di cui 42 per ECM non raggiunti e 35 in attesa di riscontro nonostante i solleciti.',
    steps: [['752 passaggi sono già in pagamento a novembre.', ' L’Azienda non ha fermato tutti per pochi casi.'],
      ['42 posizioni sono ferme per gli ECM non raggiunti.', ' Controlla i tuoi crediti formativi.'],
      ['35 sono in attesa di un riscontro.', ' Se l’Azienda ti ha scritto, rispondi: finché non lo fai la posizione resta ferma.'],
      ['Hai un dubbio?', ' Chiama Achille o Giovanna: verifichiamo insieme.']],
    big: '80', label: 'posizioni sospese, da chiarire caso per caso' }),
};


/* 1 COVER */
{
  const s = slide('DARK', 0, 'Apertura');
  s.addImage({ path: IMG('1.jpg'), x: 6.9, y: 0, w: 6.433, h: 7.5, sizing: { type: 'cover', w: 6.433, h: 7.5 }, objectName: 'fx_kb_01' });
  n = 1;
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.6, y: 0.5, w: 2.3, h: 1.25, rectRadius: 0.12, fill: { color: K.paper }, line: { color: K.paper, width: 0 }, objectName: A() });
  s.addImage({ path: IMG('logo.png'), x: 0.75, y: 0.65, w: 2.0, h: 2.0 / LOGO_R, objectName: 'anim_02b' });
  kick(s, 'Foglietto illustrativo per il direttivo · 18 novembre 2026', true, 2.15, 6.0);
  s.addText([R('Dati alla mano.', { color: K.light, breakLine: true }), R('Cosa è successo davvero.', { color: K.yellow })],
    { x: 0.6, y: 2.55, w: 6.0, h: 2.0, fontFace: F, fontSize: 40, bold: true, margin: 0, valign: 'top', isTextBox: true, objectName: A() });
  txt(s, 'In questi giorni sono circolate affermazioni inesatte. Mettiamo sul tavolo le carte della trattativa del 18 novembre, così ognuno di noi può rispondere nei reparti con i numeri.',
    { x: 0.6, y: 4.65, w: 5.9, h: 1.3, fontSize: 16, color: K.pale, objectName: A() });
  txt(s, 'Leggere attentamente prima di credere a tutto.', { x: 0.6, y: 6.05, w: 5.9, h: 0.45, fontSize: 18, italic: true, bold: true, color: K.yellow, objectName: A() });
  pill(s, '+ IL BUGIARDINO® · DIRETTIVO AOUP', 7.2, 6.75, 4.4, K.yellow, K.dark);
}

/* 2 PERCHE */
{
  const s = slide('LIGHT', 1, 'Apertura');
  kick(s, 'Ordine del giorno della trattativa · 18 novembre 2026');
  title(s, 'Sei punti sul tavolo.', 'Ognuno con i suoi numeri.');
  const items = [['Andamento occupazionale', 'Teste, assunzioni e cessazioni al 30 settembre.'], ['Incarichi di funzione', 'Mappatura e +1.000 € a tutti i coordinatori.'], ['OSS di notte', 'Assegnazioni e sperimentazione del turno notturno.'], ['Progettualità specifiche', 'Risorse 2026, residui e gettoni.'], ['Pagamenti e residui', 'Produttività, DEP 2025, voucher L. 26/2024.'], ['Incentivi funzioni tecniche', 'Il regolamento e il ruolo del DEC.']];
  items.forEach((it, i) => {
    const x = 0.6 + (i % 3) * 4.1, y = 1.85 + Math.floor(i / 3) * 2.45;
    card(s, x, y, 3.85, 2.2);
    dot(s, String(i + 1), x + 0.35, y + 0.35, 0.55);
    txt(s, it[0], { x: x + 0.35, y: y + 1.05, w: 3.2, h: 0.4, fontSize: 18, bold: true, color: K.dark });
    txt(s, it[1], { x: x + 0.35, y: y + 1.5, w: 3.2, h: 0.6, fontSize: 14, color: K.soft });
  });
  foot(s, 'CISL FP Padova Rovigo · Direttivo AOUP');
}

/* 3 BUG divider */
{
  const s = slide('DARK', 2, 'Il Bugiardino');
  pill(s, '+ IL BUGIARDINO®', 0.6, 0.6, 2.3, K.yellow, K.dark);
  kick(s, 'Parte prima', true, 1.4, 11.5, 'trans_push');
  s.addText([R('Si è sentito dire…', { color: K.light, breakLine: true }), R('Tre verifiche.', { color: K.yellow })],
    { x: 0.6, y: 1.85, w: 7.0, h: 2.2, fontFace: F, fontSize: 48, bold: true, margin: 0, valign: 'top', isTextBox: true, objectName: A() });
  txt(s, 'Tre affermazioni circolate in assemblea, messe alla prova una per una. Effetti collaterali: confusione, rabbia e lavoratori disinformati.', { x: 0.6, y: 4.3, w: 6.6, h: 1.2, fontSize: 18, color: K.pale, objectName: A() });
  txt(s, 'Aprire un cassetto non svuota l’altro.', { x: 0.6, y: 5.75, w: 6.6, h: 0.5, fontSize: 20, italic: true, bold: true, color: K.yellow, objectName: A() });
  [['FALSO', 8.4, 1.4, -8], ['FALSO', 9.3, 3.0, 5], ['INESATTO', 8.1, 4.6, -4]].forEach(([t, x, y, r]) => {
    s.addText(t, { x, y, w: t === 'INESATTO' ? 4.4 : 3.6, h: 1.1, fontFace: F, fontSize: 44, bold: true, color: 'FF5A6E', align: 'center', valign: 'middle', rotate: r, line: { color: 'FF5A6E', width: 6 }, charSpacing: 3, margin: 0, isTextBox: true, objectName: A() });
  });
  foot(s, 'CISL FP Padova Rovigo · Direttivo AOUP', true);
}

/* 4 F1 */
{
  const s = slide('LIGHT', 3, 'Il Bugiardino');
  kick(s, 'Verifica 1 · Si è sentito dire…');
  txt(s, '«I progetti pagati con la premialità tolgono soldi a progressioni e DEP»', { x: 0.6, y: 0.9, w: 9.3, h: 1.1, fontFace: 'Courier New', fontSize: 24, bold: true, objectName: A('type') });
  stamp(s, 'FALSO');
  txt(s, 'I FATTI: SONO DUE FONDI DIVERSI, OGNUNO CON I SUOI ISTITUTI', { x: 0.6, y: 2.2, w: 12, h: 0.3, fontSize: 12, bold: true, charSpacing: 2, color: K.ink });
  [[0.6, K.dark, K.light, 'Fondo incarichi e progressioni', ['Progressioni economiche (DEP)', 'Incarichi di funzione', 'Indennità professionali']],
   [6.8, K.orange, '2A1700', 'Fondo premialità e condizioni di lavoro', ['Produttività / performance', 'Progetti', 'Condizioni di lavoro']]].forEach(([x, f, c, h, li]) => {
    card(s, x, 2.7, 5.93, 2.9);
    s.addText(h, { shape: pres.shapes.ROUNDED_RECTANGLE, rectRadius: 0.14, x, y: 2.7, w: 5.93, h: 0.8, fill: { color: f }, color: c, fontFace: F, fontSize: 18, bold: true, margin: [0, 0, 0, 20], valign: 'middle' });
    s.addText(li.map((t, i) => R(t, { bullet: true, breakLine: i < li.length - 1 })), { x: x + 0.3, y: 3.7, w: 5.3, h: 1.7, fontFace: F, fontSize: 18, color: K.ink, paraSpaceAfter: 8, margin: 0, valign: 'top', isTextBox: true });
  });
  txt(s, 'Aprire un cassetto non svuota l’altro.', { x: 0.6, y: 5.9, w: 8, h: 0.5, fontSize: 20, italic: true, bold: true, color: K.green, objectName: A() });
  foot(s, 'CISL FP Padova Rovigo · Direttivo AOUP');
}

EX.E1();
/* 5 F2 */
{
  const s = slide('LIGHT', 4, 'Il Bugiardino');
  kick(s, 'Verifica 2 · Si è sentito dire…');
  txt(s, '«La CISL FP ha detto che il contratto è già firmato»', { x: 0.6, y: 0.9, w: 9.3, h: 1.0, fontFace: 'Courier New', fontSize: 24, bold: true, objectName: A('type') });
  stamp(s, 'FALSO');
  txt(s, [R('Video, volantini e materiali hanno '), R('sempre parlato di attesa', { bold: true }), R('. Semmai il mese scorso c’era chi annunciava gli arretrati a novembre. Novembre è arrivato, gli arretrati no.')], { x: 0.6, y: 2.15, w: 11, h: 0.9, fontSize: 17, color: K.soft, objectName: A() });
  [['OGGI', 'In attesa', 'come abbiamo sempre detto', K.paper, K.dark], ['DICEMBRE 2026', 'Firma', 'presumibilmente', K.paper, K.green], ['GENNAIO 2027', 'Arretrati', 'previsione, con prudenza', K.cream, K.dark]].forEach(([l, h, d, f, c], i) => {
    const x = 0.6 + i * 4.1;
    card(s, x, 3.5, 3.85, 2.3, f);
    txt(s, l, { x: x + 0.4, y: 3.85, w: 3.1, h: 0.3, fontSize: 12, bold: true, charSpacing: 2, color: K.soft });
    txt(s, h, { x: x + 0.4, y: 4.3, w: 3.1, h: 0.7, fontSize: 30, bold: true, color: c });
    txt(s, d, { x: x + 0.4, y: 5.05, w: 3.1, h: 0.4, fontSize: 15, color: K.soft });
  });
  s.addShape(pres.shapes.LINE, { x: 4.45, y: 4.65, w: 0.25, h: 0, line: { color: K.green, width: 3, endArrowType: 'triangle' } });
  s.addShape(pres.shapes.LINE, { x: 8.55, y: 4.65, w: 0.25, h: 0, line: { color: K.green, width: 3, endArrowType: 'triangle' } });
  foot(s, 'CISL FP Padova Rovigo · Direttivo AOUP');
}

/* 6 F3 */
{
  const s = slide('LIGHT', 5, 'Il Bugiardino');
  kick(s, 'Verifica 3 · Si è sentito dire…');
  txt(s, '«Sui DEP 2026 si è messo poco»', { x: 0.6, y: 0.9, w: 9.3, h: 0.6, fontFace: 'Courier New', fontSize: 24, bold: true, objectName: A('type') });
  stamp(s, 'INESATTO', 3.0);
  [['620.000 €', [R('sui DEP 2026: '), R('il massimo che si poteva stanziare', { bold: true })], K.paper], ['1.400.000 €', [R('oltre', { bold: true }), R(', sulle progressioni in due anni, con la firma CISL FP')], K.cream]].forEach(([nm, d, f], i) => {
    const x = 0.6 + i * 6.17;
    card(s, x, 1.95, 5.93, 2.0, f);
    txt(s, nm, { x: x + 0.4, y: 2.2, w: 5.2, h: 0.9, fontSize: 48, bold: true, color: K.dark, objectName: A('pop') });
    txt(s, d, { x: x + 0.4, y: 3.15, w: 5.2, h: 0.6, fontSize: 16, color: K.ink });
  });
  txt(s, [R('La produttività complessiva è calata per una '), R('legge regionale', { bold: true }), R(' che lega alcune risorse variabili al numero di dipendenti previsti. Più risorse sui DEP avrebbero voluto dire un '), R('conguaglio più basso per tutti', { bold: true }), R('.')], { x: 0.6, y: 4.3, w: 12, h: 1.0, fontSize: 17, color: K.soft, objectName: A() });
  txt(s, 'La coperta è quella: si decide dove metterla.', { x: 0.6, y: 5.6, w: 8, h: 0.5, fontSize: 20, italic: true, bold: true, color: K.green, objectName: A() });
  foot(s, 'CISL FP Padova Rovigo · Direttivo AOUP');
}

EX.E2();
/* 7 TAVOLO divider */
{
  const s = slide('DARK', 6, 'Trattativa del 18 novembre');
  s.addImage({ path: IMG('5.jpg'), x: 6.9, y: 0, w: 6.433, h: 7.5, sizing: { type: 'cover', w: 6.433, h: 7.5 }, objectName: A('kb') });
  kick(s, 'Parte seconda', true, 1.6, 11.5, 'trans_push');
  s.addText([R('18 novembre:', { color: K.light, breakLine: true }), R('le carte sul tavolo.', { color: K.yellow })], { x: 0.6, y: 2.05, w: 6.0, h: 2.0, fontFace: F, fontSize: 44, bold: true, margin: 0, valign: 'top', isTextBox: true, objectName: A() });
  txt(s, 'Cosa ha presentato l’Azienda, cosa abbiamo chiesto noi, cosa si è ottenuto. Tutti i numeri vengono dalle slide aziendali proiettate in seduta.', { x: 0.6, y: 4.3, w: 5.9, h: 1.4, fontSize: 18, color: K.pale, objectName: A() });
  foot(s, 'CISL FP Padova Rovigo · Direttivo AOUP', true);
}

/* 8 OCC */
{
  const s = slide('LIGHT', 7, 'Trattativa del 18 novembre');
  kick(s, '1 · Andamento occupazionale');
  title(s, 'Più teste a fine anno.', 'Infermieri in calo.', { bcolor: K.red });
  const H = () => ({ bold: true, color: K.light, fill: { color: K.dark } });
  const rows = [['Profilo', '31/12/2025', '30/09/2026', 'stima 31/12/26', 'Δ'].map((t, i) => ({ text: t, options: Object.assign({ align: i ? 'right' : 'left' }, H()) }))];
  [['Dirigenti medici', '868', '878', '902', '+34'], ['Dirigenti sanitari', '82', '85', '91', '+9'], ['Dirigenti PTA', '21', '21', '26', '+5'], ['Comparto infermieri', '2.746', '2.757', '2.720', '−26'], ['Comparto altro sanitario', '477', '493', '502', '+25'], ['Comparto OSS', '1.140', '1.179', '1.209', '+69'], ['Comparto amministrativo', '463', '477', '482', '+19'], ['Comparto ruolo tecnico', '190', '184', '196', '+6'], ['Totale', '5.987', '6.074', '6.128', '+141']].forEach((r, ri) => {
    const fill = ri === 3 ? K.cream : ri === 8 ? K.mint2 : K.paper;
    rows.push(r.map((t, i) => ({ text: t, options: { align: i ? 'right' : 'left', fill: { color: fill }, bold: ri === 8 || (ri === 3 && i === 4), color: ri === 3 && i === 4 ? K.red : K.ink } })));
  });
  s.addTable(rows, { x: 0.6, y: 1.8, w: 7.9, colW: [2.9, 1.25, 1.25, 1.5, 1.0], fontFace: F, fontSize: 14, rowH: Array(10).fill(0.42), border: { type: 'solid', pt: 0.5, color: 'D5E3DA' }, margin: [2, 8, 2, 8], valign: 'middle', objectName: A() });
  [['+141', 'teste stimate in più a fine 2026', K.dark, K.yellow, 'BFD8CB'], ['−26', 'infermieri: stima a ribasso, graduatorie esaurite', K.paper, K.red, K.soft], ['+69', 'OSS: il rinforzo dove mancano infermieri', K.paper, K.green, K.soft]].forEach(([nm, l, f, c, lc], i) => {
    const y = 1.8 + i * 1.45;
    card(s, 8.85, y, 3.88, 1.3, f);
    txt(s, nm, { x: 9.15, y: y + 0.15, w: 3.3, h: 0.65, fontSize: 36, bold: true, color: c, objectName: A('pop') });
    txt(s, l, { x: 9.15, y: y + 0.8, w: 3.4, h: 0.45, fontSize: 12, bold: true, color: lc });
  });
  foot(s, 'Fonte: slide aziendale «Andamento occupazionale», dati al 30/09/2026');
}

/* 9 TREND */
{
  const s = slide('LIGHT', 8, 'Trattativa del 18 novembre');
  kick(s, '1 · Variazione teste rispetto al 1° gennaio 2020');
  title(s, 'Dal 2020: OSS e medici crescono,', 'gli infermieri scendono.', { bcolor: K.red });
  card(s, 0.6, 1.8, 6.6, 4.9, K.paper, false);
  s.addChart(pres.charts.BAR, [{ name: 'Variazione teste', labels: ['Infermieri', 'Dirigenti medici', 'OSS'], values: [-103, 117, 219] }], {
    x: 0.8, y: 1.95, w: 6.2, h: 4.6, barDir: 'col', chartColors: [K.red, K.green, K.orange], invertedColors: [K.red], showValue: true, dataLabelPosition: 'outEnd', dataLabelFontSize: 18, dataLabelFontBold: true, dataLabelColor: K.ink, dataLabelFormatCode: '+#,##0;−#,##0',
    catAxisLabelFontSize: 14, catAxisLabelColor: K.ink, catAxisLabelFontFace: F, catAxisLabelPos: 'low', valAxisHidden: true, valGridLine: { style: 'none' }, catGridLine: { style: 'none' }, showLegend: false, barGapWidthPct: 60,
    showTitle: true, title: 'Saldo teste a settembre 2026 rispetto al 1° gennaio 2020', titleFontSize: 13, titleColor: K.soft, titleFontFace: F, objectName: A('wipeB') });
  s.addImage({ path: IMG('4.jpg'), x: 7.5, y: 1.8, w: 5.23, h: 2.6, sizing: { type: 'cover', w: 5.23, h: 2.6 }, objectName: A() });
  txt(s, [R('Infermieri: ', { bold: true, color: K.red }), R('picco a +220 nel 2021, minimo a −124, oggi −103.', { breakLine: true }), R('OSS: ', { bold: true, color: 'B86E00' }), R('punto più alto a +222.', { breakLine: true }), R('Medici: ', { bold: true, color: K.green }), R('crescita costante, che tiene.')], { x: 7.5, y: 4.6, w: 5.2, h: 1.2, fontSize: 15, paraSpaceAfter: 4, objectName: A() });
  txt(s, 'La crisi infermieristica è ormai, parole dell’Azienda, «uno stato di fatto».', { x: 7.5, y: 5.95, w: 5.2, h: 0.7, fontSize: 15, italic: true, bold: true, color: K.dark, objectName: A() });
  foot(s, 'Fonte: grafico aziendale condiviso ogni mese con la Direzione');
}

/* 10 FLUSSI */
{
  const s = slide('LIGHT', 9, 'Trattativa del 18 novembre');
  kick(s, '1 · Assunzioni e cessazioni · gennaio–ottobre 2026');
  title(s, 'Chi entra, chi esce,', 'reparto per reparto.');
  card(s, 0.6, 1.8, 7.6, 4.9, K.paper, false);
  s.addChart(pres.charts.BAR, [
    { name: 'Assunzioni', labels: ['Infermieri', 'Altro sanitario', 'OSS', 'Amministrativo', 'Ruolo tecnico'], values: [182, 47, 92, 37, 14] },
    { name: 'Cessazioni', labels: ['Infermieri', 'Altro sanitario', 'OSS', 'Amministrativo', 'Ruolo tecnico'], values: [197, 33, 55, 26, 16] }], {
    x: 0.8, y: 1.95, w: 7.2, h: 4.6, barDir: 'col', barGrouping: 'clustered', chartColors: [K.green, K.red], showValue: true, dataLabelPosition: 'outEnd', dataLabelFontSize: 12, dataLabelColor: K.ink,
    catAxisLabelFontSize: 12, catAxisLabelColor: K.ink, valAxisHidden: true, valGridLine: { style: 'none' }, catGridLine: { style: 'none' }, showLegend: true, legendPos: 't', legendFontSize: 12, legendColor: K.ink, barGapWidthPct: 50, objectName: A('wipeB') });
  card(s, 8.5, 1.8, 4.23, 2.6);
  txt(s, 'Infermieri, dove si perde', { x: 8.8, y: 2.05, w: 3.7, h: 0.4, fontSize: 17, bold: true, color: K.dark });
  txt(s, [R('Medicina dei Sistemi  ', {}), R('53 / 62 (−9)', { bold: true, breakLine: true }), R('Staff e piastre operatorie  '), R('39 / 50 (−11)', { bold: true, breakLine: true }), R('Diagnostica integrata  '), R('3 / 7 (−4)', { bold: true, breakLine: true }), R('Saldo totale  '), R('−15', { bold: true, color: K.red })], { x: 8.8, y: 2.55, w: 3.8, h: 1.7, fontSize: 14, paraSpaceAfter: 4 });
  card(s, 8.5, 4.6, 4.23, 2.1, K.cream);
  txt(s, 'OSS, dove si rinforza', { x: 8.8, y: 4.85, w: 3.7, h: 0.4, fontSize: 17, bold: true, color: K.dark });
  txt(s, [R('Medicina dei Sistemi  '), R('+24', { bold: true, breakLine: true }), R('Chirurgia  '), R('+15', { bold: true, breakLine: true }), R('Saldo totale  '), R('+37', { bold: true, color: K.green })], { x: 8.8, y: 5.35, w: 3.8, h: 1.2, fontSize: 14, paraSpaceAfter: 4 });
  foot(s, 'Fonte: slide aziendale «Assunzioni e cessazioni». Non sono considerati i cambi di profilo e i passaggi da TD a TI.');
}

/* 11 COORD */
{
  const s = slide('DARK', 10, 'Trattativa del 18 novembre');
  kick(s, '2 · Incarichi di coordinamento · accordo del 18/11', true);
  title(s, '+1.000 € a tutti i 106 coordinatori.', 'Era la nostra proposta.', { dark: true });
  [['FASCIA III', '7.000 €', '8.000 €', 'fascia III bis'], ['FASCIA IV', '8.000 €', '9.000 €', 'fascia IV bis']].forEach(([a, b, c, d], i) => {
    const x = 0.6 + i * 3.35;
    card(s, x, 1.9, 3.1, 3.9);
    txt(s, a, { x: x + 0.35, y: 2.15, w: 2.5, h: 0.3, fontSize: 12, bold: true, charSpacing: 2, color: K.soft });
    txt(s, b, { x: x + 0.35, y: 2.55, w: 2.5, h: 0.7, fontSize: 36, bold: true, color: K.soft });
    txt(s, 'diventa', { x: x + 0.35, y: 3.35, w: 2.5, h: 0.4, fontSize: 16, italic: true, bold: true, color: K.green });
    txt(s, c, { x: x + 0.35, y: 3.85, w: 2.5, h: 0.8, fontSize: 40, bold: true, color: K.green, objectName: A('pop') });
    txt(s, d, { x: x + 0.35, y: 4.8, w: 2.5, h: 0.3, fontSize: 13, bold: true, color: K.soft });
  });
  s.addImage({ path: IMG('3.jpg'), x: 7.4, y: 1.9, w: 5.33, h: 2.25, sizing: { type: 'cover', w: 5.33, h: 2.25 }, objectName: A() });
  [['€', [R('106.000 €', { bold: true }), R(' impegnati, dal fondo incarichi')]], ['↗', [R('Supera l’intesa del 10/12/2025: '), R('500 €', { bold: true }), R(' solo a una fascia, 22.500 €')]], ['1', [R('Decorrenza '), R('1° gennaio 2027', { bold: true })]]].forEach(([d, t], i) => {
    const y = 4.4 + i * 0.62;
    dot(s, d, 7.4, y, 0.42, K.yellow, K.dark);
    txt(s, t, { x: 7.95, y: y + 0.03, w: 4.8, h: 0.5, fontSize: 15, color: K.light, objectName: A() });
  });
  foot(s, 'Fonte: bozza di accordo letta in seduta il 18/11/2026', true);
}

EX.E3();
/* 12 MAPPA */
{
  const s = slide('LIGHT', 11, 'Trattativa del 18 novembre');
  kick(s, '2 · Mappatura degli incarichi di funzione');
  title(s, '2,2 milioni nel fondo incarichi.', 'Ecco dove vanno.');
  [['106', 'incarichi di coordinamento', K.dark, K.yellow, K.pale], ['86', 'incarichi professionali, in 19 tipologie', K.paper, K.green, K.soft], ['61', 'incarichi area professionale, tecnica e amministrativa', K.paper, K.dark, K.soft], ['22', 'incarichi organizzativi dell’area sanitaria', K.paper, K.dark, K.soft]].forEach(([nm, l, f, c, lc], i) => {
    const x = 0.6 + i * 3.075;
    card(s, x, 1.8, 2.85, 1.9, f);
    txt(s, nm, { x: x + 0.3, y: 2.0, w: 2.3, h: 0.8, fontSize: 44, bold: true, color: c, objectName: A('pop') });
    txt(s, l, { x: x + 0.3, y: 2.85, w: 2.35, h: 0.7, fontSize: 13, bold: true, color: lc });
  });
  card(s, 0.6, 4.0, 12.13, 1.85, K.cream);
  txt(s, 'UN ANNO E MEZZO FA', { x: 1.0, y: 4.25, w: 2.6, h: 0.3, fontSize: 12, bold: true, charSpacing: 2, color: K.soft });
  txt(s, '12', { x: 1.0, y: 4.6, w: 2.0, h: 1.0, fontSize: 54, bold: true, color: K.soft });
  s.addShape(pres.shapes.RIGHT_ARROW, { x: 3.0, y: 4.85, w: 1.0, h: 0.6, fill: { color: K.green }, line: { color: K.green, width: 0 }, objectName: A('wipeL') });
  txt(s, 'OGGI', { x: 4.3, y: 4.25, w: 2.0, h: 0.3, fontSize: 12, bold: true, charSpacing: 2, color: K.soft });
  txt(s, '86', { x: 4.3, y: 4.6, w: 2.0, h: 1.0, fontSize: 54, bold: true, color: K.green, objectName: A() });
  txt(s, 'incarichi professionali. In aprile erano 65. La delibera di mappatura era annunciata per la settimana dopo il 18/11.', { x: 6.6, y: 4.45, w: 5.8, h: 1.1, fontSize: 16, color: K.ink });
  txt(s, 'Area sanitaria 1.356.000 € · area PTA 662.500 € · accantonamento Elevate Qualificazioni, assistenti e operatori 167.500 €.', { x: 0.6, y: 6.1, w: 12, h: 0.4, fontSize: 13, color: K.soft });
  foot(s, 'Fonte: slide aziendali «Mappatura incarichi» e «Sintesi economica»');
}

/* 13 PROF */
{
  const s = slide('LIGHT', 12, 'Trattativa del 18 novembre');
  kick(s, '2 · Gli 86 incarichi professionali');
  title(s, '19 tipologie,', '86 posti da mettere a bando.');
  [['SPECIALISTICI · 31', K.dark, K.yellow, [['Infermiere case manager', 20], ['Specialista terapia intensiva', 4], ['Referente wound care', 2], ['Infermiere stomaterapista', 2], ['Procurement organi e tessuti', 1], ['Tecniche di elettrofisiologia', 1], ['Tecniche ecocardiografiche', 1]], 'Requisito: master'],
   ['ESPERTI · 19', K.orange, '2A1700', [['Accessi vascolari', 4], ['Governance clinica in sala operatoria', 6], ['Ricerca ed Evidence-Based Practice', 1], ['Monitoraggio neurofisiologico', 2], ['Organ care specialist', 2], ['Innovazione in radiologia', 4]], 'Requisito: corso aziendale o riconosciuto'],
   ['PROFESSIONALI · 36', K.green, K.paper, [['Tutor didattico corsi di laurea', 30], ['Supporto renale extra-intracorporeo', 2], ['Patient Blood Management', 1], ['Accessi enterali (PEG, PEG-J, RIG)', 1], ['Procedure analitiche (POCT)', 1], ['Percorsi assistenziali', 1]], 'Nessun requisito formativo']].forEach(([h, f, c, li, req], i) => {
    const x = 0.6 + i * 4.1;
    card(s, x, 1.8, 3.85, 4.9);
    pill(s, h, x + 0.3, 2.05, 2.6, f, c);
    const rows = li.map(([a, b]) => [{ text: a, options: { color: K.ink } }, { text: String(b), options: { align: 'right', bold: true, color: K.dark } }]);
    s.addTable(rows, { x: x + 0.3, y: 2.65, w: 3.25, colW: [2.75, 0.5], fontFace: F, fontSize: 13, rowH: Array(li.length).fill(0.42), border: { type: 'none' }, margin: [1, 2, 1, 2], valign: 'middle' });
    txt(s, req, { x: x + 0.3, y: 6.1, w: 3.3, h: 0.4, fontSize: 12, bold: true, color: K.soft });
  });
  foot(s, 'Fonte: slide aziendali «Inc. professionali»');
}

EX.E4();
/* 14 CHIESTO */
{
  const s = slide('LIGHT', 13, 'Trattativa del 18 novembre');
  kick(s, 'Al tavolo · cosa ha chiesto la CISL FP');
  title(s, 'Le nostre richieste,', 'e le risposte dell’Azienda.');
  const H = () => ({ bold: true, color: K.light, fill: { color: K.dark } });
  const data = [
    ['Un tavolo sugli incarichi professionali', ' a inizio 2027, per inserire le figure che mancano in mappatura', 'Con il nuovo contratto si rimappano e si ripropongono gli incarichi professionali'],
    ['I bandi per i tutor universitari', ': c’è un impegno scritto a farli uscire entro novembre', 'Prima la delibera di mappatura, poi i bandi. Entro fine anno non è realistico'],
    ['Chi ha la laurea magistrale', ': per il nuovo CCNL l’incarico va nella fascia di elevata complessità', 'Il regolamento sarà rivisto dopo la firma del CCNL 2025-27'],
    ['Le altre fasce organizzative', ' (da 7.000 a 9.500 €): restano ferme?', 'Il margine 2026 è tutto sui coordinatori; si riparte con il nuovo contratto'],
    ['Incentivi funzioni tecniche', ': più valore al DEC e ai collaboratori, trasparenza, un’area riservata, un tavolo tecnico sul regolamento DEC', 'Il regolamento viene riformulato nel senso indicato dalla CISL FP, con una quota più premiante per il DEC']];
  const rows = [[{ text: 'Abbiamo chiesto', options: H() }, { text: 'Risposta dell’Azienda', options: H() }]];
  data.forEach(([b, r, a], i) => {
    const f = { fill: { color: i % 2 ? K.cream : K.paper } };
    rows.push([{ text: [R(b, { bold: true }), R(r)], options: f }, { text: a, options: f }]);
  });
  s.addTable(rows, { x: 0.6, y: 1.8, w: 12.13, colW: [6.3, 5.83], fontFace: F, fontSize: 14, color: K.ink, border: { type: 'solid', pt: 0.5, color: 'D5E3DA' }, margin: [6, 10, 6, 10], valign: 'middle', rowH: [0.45, 0.8, 0.8, 0.8, 0.8, 1.0], objectName: A() });
  foot(s, 'Fonte: verbale della seduta del 18/11/2026');
}

EX.E5();
/* 15 OSSDATI */
{
  const s = slide('LIGHT', 14, 'Trattativa del 18 novembre');
  kick(s, '3 · OSS di notte · da dove partiamo');
  title(s, 'Già 31 aree con l’OSS di notte.', 'La chirurgia è la Cenerentola.', { bcolor: K.red, size: 27 });
  s.addImage({ path: IMG('2.jpg'), x: 0.6, y: 1.8, w: 3.6, h: 4.2, sizing: { type: 'cover', w: 3.6, h: 4.2 }, objectName: A() });
  card(s, 4.45, 1.8, 3.0, 2.0, K.dark);
  txt(s, '63%', { x: 4.75, y: 2.0, w: 2.5, h: 0.8, fontSize: 44, bold: true, color: K.yellow });
  txt(s, '31 aree di degenza con l’OSS di notte', { x: 4.75, y: 2.85, w: 2.5, h: 0.8, fontSize: 13, bold: true, color: K.pale });
  card(s, 4.45, 4.0, 3.0, 2.0);
  txt(s, '52%', { x: 4.75, y: 4.2, w: 2.5, h: 0.8, fontSize: 44, bold: true, color: K.green });
  txt(s, '16 aree l’hanno avuto dopo il 2020: 12 nuove, 4 incrementi', { x: 4.75, y: 5.05, w: 2.5, h: 0.8, fontSize: 13, bold: true, color: K.soft });
  card(s, 7.7, 1.8, 5.03, 4.2, K.paper, false);
  s.addChart(pres.charts.BAR, [{ name: '% UO con OSS di notte', labels: ['Area medica adulti (17/20)', 'Terapie intensive (6/9)', 'Area ostetrica (1/2)', 'Area chirurgica adulti (5/12)', 'Area pediatrica (2/6)'], values: [85, 67, 50, 42, 33] }], {
    x: 7.85, y: 1.9, w: 4.75, h: 4.0, barDir: 'bar', catAxisOrientation: 'maxMin', chartColors: [K.green, K.green, K.green, K.red, K.green], showValue: true, dataLabelPosition: 'outEnd', dataLabelFontSize: 13, dataLabelFontBold: true, dataLabelColor: K.ink, dataLabelFormatCode: '0"%"',
    catAxisLabelFontSize: 11, catAxisLabelColor: K.ink, valAxisHidden: true, valAxisMaxVal: 110, valAxisMinVal: 0, valGridLine: { style: 'none' }, catGridLine: { style: 'none' }, showLegend: false, barGapWidthPct: 45,
    showTitle: true, title: 'Unità operative con OSS di notte', titleFontSize: 13, titleColor: K.soft, objectName: A('wipeL') });
  txt(s, [R('Base: la '), R('dichiarazione congiunta del 23 dicembre 2025', { bold: true }), R(', con l’autorizzazione CRITE per assunzioni extra turn-over entro il tetto di spesa.')], { x: 0.6, y: 6.2, w: 12.1, h: 0.6, fontSize: 14, color: K.soft, objectName: A() });
  foot(s, 'Fonte: slide aziendali «Analisi – Aree di degenza» e «Premesse»');
}

/* 16 OSSDOVE */
{
  const s = slide('LIGHT', 15, 'Trattativa del 18 novembre');
  kick(s, '3 · OSS di notte · dove si interviene');
  title(s, 'Quattro realtà,', 'una alla volta.');
  [['CHIRURGICA 6° PIANO POLICLINICO', '1:13,5', 'Chirurgia d’urgenza, ricoveri urgenti H24', K.dark], ['CHIRURGICA 7° PIANO POLICLINICO', '1:19', 'Area omogenea, con il pronto soccorso H24', K.red], ['NEUROCHIRURGIA DEGENZE', '1:12,5', 'Trasporti notturni verso la neuroradiologia', K.dark], ['MEDICA 8° PIANO POLICLINICO', '1:18', 'Ha l’OSS, ma il rapporto è il più pesante dell’area medica', K.red]].forEach(([l, nm, d, c], i) => {
    const x = 0.6 + i * 3.075;
    card(s, x, 1.75, 2.85, 2.4);
    txt(s, l, { x: x + 0.25, y: 1.95, w: 2.4, h: 0.5, fontSize: 11, bold: true, color: K.soft });
    txt(s, nm, { x: x + 0.25, y: 2.45, w: 2.4, h: 0.7, fontSize: 36, bold: true, color: c, objectName: A('pop') });
    txt(s, d, { x: x + 0.25, y: 3.2, w: 2.4, h: 0.85, fontSize: 13, color: K.ink });
  });
  txt(s, 'Rapporto infermieri : posti letto nelle 24 ore. Standard di degenza ordinaria: da 1:12 a 1:15.', { x: 0.6, y: 4.3, w: 12, h: 0.35, fontSize: 13, color: K.soft });
  card(s, 0.6, 4.8, 5.93, 1.95, K.cream);
  txt(s, 'Come e quando', { x: 0.9, y: 4.98, w: 5.3, h: 0.4, fontSize: 17, bold: true, color: K.dark });
  txt(s, 'Un reparto per volta, in circa un anno secondo l’Azienda. I turni passano da due (M-P) a tre (M-P-N): si raccolgono le preferenze e, se serve, si fa mobilità incrociata.', { x: 0.9, y: 5.4, w: 5.4, h: 1.25, fontSize: 14 });
  s.addImage({ path: IMG('2.jpg'), x: 6.8, y: 4.8, w: 1.9, h: 1.95, sizing: { type: 'cover', w: 1.9, h: 1.95 }, objectName: A() });
  card(s, 8.9, 4.8, 3.83, 1.95);
  txt(s, 'Nuova Pediatria', { x: 9.15, y: 4.98, w: 3.4, h: 0.4, fontSize: 17, bold: true, color: K.dark });
  txt(s, 'OSS H24 in PS pediatrico e OBI, già in arrivo. Squadra di trasporti interni per la Salus Pueri.', { x: 9.15, y: 5.4, w: 3.4, h: 1.25, fontSize: 14 });
  foot(s, 'Fonte: slide aziendali «Analisi», «Sviluppi», «Azioni in atto»');
}

EX.E6();
/* 17 PROGETTI */
{
  const s = slide('LIGHT', 16, 'Trattativa del 18 novembre');
  kick(s, '4 · Progettualità specifiche 2026');
  title(s, '1.597.676,60 €', 'destinati ai progetti 2026.');
  const H = () => ({ bold: true, color: K.light, fill: { color: K.dark } });
  const mk = (list, hl) => [[{ text: 'Progetto', options: H() }, { text: '€', options: Object.assign({ align: 'right' }, H()) }]].concat(list.map(([a, b], i) => [{ text: a, options: { fill: { color: i === hl ? K.cream : K.paper } } }, { text: b, options: { align: 'right', bold: true, fill: { color: i === hl ? K.cream : K.paper } } }]));
  pill(s, 'ACCORDO 15/4/2026', 0.6, 1.8, 2.3);
  s.addTable(mk([['Specificità assistenziali Hub', '500.000'], ['Disagio: gettoni e pacchetti estivi', '265.000'], ['Assistenza H24 adulti e pediatrica', '50.000'], ['Strategica amministrativi e tecnici', '350.000']], 1), { x: 0.6, y: 2.35, w: 5.6, colW: [4.3, 1.3], fontFace: F, fontSize: 13, color: K.ink, rowH: Array(5).fill(0.4), border: { type: 'solid', pt: 0.5, color: 'D5E3DA' }, margin: [2, 8, 2, 8], valign: 'middle', objectName: A() });
  txt(s, 'Hub: mensile, chiusura a marzo 2027. Gettoni: trimestrali, chiusura a maggio 2027. L’Azienda scrive «risorse insufficienti».', { x: 0.6, y: 4.5, w: 5.6, h: 0.8, fontSize: 12, color: K.soft });
  pill(s, 'ACCORDO 14/7/2026', 6.6, 1.8, 2.3, K.green, K.paper);
  s.addTable(mk([['Trasferimento Pediatria', '72.000'], ['Professionisti tecnici sanitari', '115.000'], ['Coordinatori', '53.000'], ['Tecnici di radiologia e OSS in PS', '25.000'], ['Turni disagiati ruolo tecnico', '45.000'], ['Tutor corsi di laurea 2025-26', '30.000'], ['Trasporto neonatale', '20.000'], ['Altri trasferimenti', '40.000'], ['Integrazione dialisi 2025', '20.000']], -1), { x: 6.6, y: 2.35, w: 6.13, colW: [4.83, 1.3], fontFace: F, fontSize: 13, color: K.ink, rowH: Array(10).fill(0.4), border: { type: 'solid', pt: 0.5, color: 'D5E3DA' }, margin: [2, 8, 2, 8], valign: 'middle', objectName: A() });
  txt(s, 'Pagamento nei primi mesi del 2027; la dialisi è stata pagata a ottobre.', { x: 6.6, y: 6.4, w: 6.1, h: 0.35, fontSize: 12, color: K.soft });
  foot(s, 'Fonte: slide aziendale «Risorse disponibili – Progettualità specifiche»');
}

/* 18 WELFARE */
{
  const s = slide('LIGHT', 17, 'Trattativa del 18 novembre');
  kick(s, '4–5 · Voucher welfare e gettoni');
  title(s, 'I soldi non spesi', 'restano ai lavoratori.');
  card(s, 0.6, 1.8, 6.6, 4.9);
  pill(s, 'SCADENZA 30 NOVEMBRE', 0.9, 2.05, 3.0, K.red, 'FFF4F4');
  txt(s, 'Voucher welfare da 350 €', { x: 0.9, y: 2.6, w: 6, h: 0.45, fontSize: 20, bold: true, color: K.dark });
  txt(s, [R('Residuo stimato nel comparto: '), R('circa 185.000 €', { bold: true }), R(', di persone che non l’hanno nemmeno attivato.')], { x: 0.9, y: 3.1, w: 6, h: 0.7, fontSize: 15 });
  [['157.008,98 €', 'ruolo sanitario e sociosanitario: torna ai progetti della L. 26/2024', 0.9], ['27.408 €', 'area PTA: alle progettualità PTA', 4.05]].forEach(([a, b, x]) => {
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y: 3.95, w: 2.95, h: 1.75, rectRadius: 0.12, fill: { color: K.cream }, line: { color: K.cream, width: 0 }, objectName: A() });
    txt(s, a, { x: x + 0.2, y: 4.1, w: 2.6, h: 0.5, fontSize: 22, bold: true, color: K.dark });
    txt(s, b, { x: x + 0.2, y: 4.65, w: 2.6, h: 0.95, fontSize: 12, bold: true, color: K.soft });
  });
  txt(s, [R('Dal '), R('1° dicembre', { bold: true }), R(' parte un nuovo voucher.')], { x: 0.9, y: 5.95, w: 6, h: 0.4, fontSize: 15 });
  card(s, 7.45, 1.8, 5.28, 4.9, K.dark);
  pill(s, 'RICHIESTA AZIENDALE', 7.75, 2.05, 3.0, K.yellow, K.dark);
  txt(s, '+35.000 € ai gettoni', { x: 7.75, y: 2.6, w: 4.8, h: 0.6, fontSize: 26, bold: true, color: K.yellow });
  txt(s, [R('Per arrivare a '), R('300.000 €', { bold: true }), R(' dai 265.000 stanziati. Pesano la terza settimana di ferie estive, le ferie di chi cessa, l’obiettivo di fruizione delle ferie e le ore di vestizione.')], { x: 7.75, y: 3.3, w: 4.75, h: 1.8, fontSize: 15, color: K.light });
  txt(s, 'Dai residui dei progetti: 32.000 € dal progetto H24, 10.000 € dal trasporto neonatale, 5.612,69 € dalla dialisi.', { x: 7.75, y: 5.3, w: 4.75, h: 1.2, fontSize: 13, bold: true, color: K.pale });
  foot(s, 'Fonte: comunicazioni in seduta e slide «Progettualità specifiche»');
}

EX.E7();
/* 19 PAGAM */
{
  const s = slide('LIGHT', 18, 'Trattativa del 18 novembre');
  kick(s, '5 · Pagamenti di novembre');
  title(s, 'Conguaglio di produttività e', 'DEP 2025 in busta.');
  const H = () => ({ bold: true, color: K.light, fill: { color: K.dark } });
  const rows = [['Quote medie 2025', 'Acconto', 'Conguaglio', 'Media annua'].map((t, i) => ({ text: t, options: Object.assign({ align: i ? 'right' : 'left' }, H()) }))];
  [['ASU ex A', '615,84', '576,00', '1.191,84'], ['ASU ex B', '715,56', '675,00', '1.390,56'], ['ADO ex Bs', '760,92', '710,00', '1.470,92'], ['ADA ex C', '905,88', '840,00', '1.745,88'], ['APSF ex D', '1.032,60', '965,00', '1.997,60'], ['APSF ex Ds', '1.150,32', '1.069,00', '2.219,32']].forEach(r => rows.push(r.map((t, i) => ({ text: t, options: { align: i ? 'right' : 'left', bold: i === 3, fill: { color: K.paper } } }))));
  s.addTable(rows, { x: 0.6, y: 1.8, w: 7.3, colW: [2.2, 1.6, 1.7, 1.8], fontFace: F, fontSize: 14, color: K.ink, rowH: Array(7).fill(0.5), border: { type: 'solid', pt: 0.5, color: 'D5E3DA' }, margin: [2, 8, 2, 8], valign: 'middle', objectName: A() });
  txt(s, 'Sono medie: il conguaglio di ognuno dipende da obiettivi di U.O., valutazione, categoria, presenza e tempo pieno o parziale.', { x: 0.6, y: 5.45, w: 7.3, h: 0.7, fontSize: 13, color: K.soft });
  [['−213.306 €', 'sulla produttività per la legge regionale (art. 11): circa 20 € lordi in meno per fascia', K.paper, K.red, K.soft], ['752', 'passaggi DEP 2025 in pagamento, 516 tra i professionisti della salute', K.dark, K.yellow, K.pale], ['80', 'posizioni sospese: 42 senza ECM, 35 in attesa di riscontro', K.cream, K.dark, K.soft]].forEach(([nm, l, f, c, lc], i) => {
    const y = 1.8 + i * 1.65;
    card(s, 8.2, y, 4.53, 1.5, f);
    txt(s, nm, { x: 8.5, y: y + 0.15, w: 4.0, h: 0.6, fontSize: 30, bold: true, color: c, objectName: A('pop') });
    txt(s, l, { x: 8.5, y: y + 0.78, w: 4.0, h: 0.65, fontSize: 12, bold: true, color: lc });
  });
  foot(s, 'Fonte: slide aziendali e comunicazioni in seduta, 18/11/2026');
}

EX.E8();
/* 20 MESSAGGI */
{
  const s = slide('DARK', 19, 'Nei reparti');
  s.addImage({ path: IMG('6.jpg'), x: 8.5, y: 0, w: 4.833, h: 7.5, sizing: { type: 'cover', w: 4.833, h: 7.5 }, objectName: A('kb') });
  kick(s, 'Parte terza · Posologia', true, 0.5, 11.5, 'trans_push');
  title(s, 'Sei frasi da portare', 'in ogni reparto.', { dark: true, w: 7.6 });
  const m = [['I fondi sono cassetti diversi.', ' I progetti non tolgono un euro ai DEP.'], ['Il contratto non è firmato', ', l’abbiamo sempre detto. La firma è attesa a dicembre.'], ['+1.000 € a tutti i coordinatori', ' dal 2027: era la nostra proposta.'], ['Incarichi professionali da 12 a 86.', ' Ora tocca ai bandi, a partire dai tutor.'], ['OSS di notte: quattro reparti individuati.', ' Vigiliamo sui tempi, uno alla volta.'], ['A novembre in busta', ' conguaglio e DEP 2025; il regolamento incentivi segue la nostra proposta.']];
  m.forEach(([b, r], i) => {
    const y = 1.75 + i * 0.78;
    dot(s, String(i + 1), 0.6, y, 0.48, K.yellow, K.dark);
    txt(s, [R(b, { bold: true, color: K.light }), R(r, { color: K.pale })], { x: 1.3, y: y + 0.02, w: 6.9, h: 0.7, fontSize: 16, objectName: A() });
  });
  txt(s, 'Le chiacchiere passano, i documenti restano.', { x: 0.6, y: 6.5, w: 7.6, h: 0.4, fontSize: 18, italic: true, bold: true, color: K.yellow, objectName: A() });
}

/* 21 PROSSIMI */
{
  const s = slide('LIGHT', 20, 'Nei reparti');
  kick(s, 'Prossimi passi');
  title(s, 'Le date da tenere d’occhio', '');
  const d = [['FINE NOVEMBRE', 'Delibera di mappatura degli incarichi', K.paper], ['30 NOVEMBRE', 'Scadono i voucher welfare da 350 €', K.cream], ['1° DICEMBRE', 'Parte il nuovo voucher', K.paper], ['DICEMBRE', 'Firma del CCNL 2025-27, presumibilmente', K.dark], ['1° GENNAIO 2027', 'Coordinatori a 8.000 e 9.000 €', K.paper], ['GENNAIO 2027', 'Arretrati, secondo previsione', K.cream], ['INIZIO 2027', 'Tavolo sugli incarichi professionali', K.paper], ['A BREVE', 'Regolamento incentivi tecnici riformulato', K.paper]];
  d.forEach(([l, t, f], i) => {
    const x = 0.6 + (i % 4) * 3.075, y = 1.75 + Math.floor(i / 4) * 1.75;
    card(s, x, y, 2.85, 1.55, f);
    txt(s, l, { x: x + 0.25, y: y + 0.2, w: 2.4, h: 0.3, fontSize: 11, bold: true, charSpacing: 2, color: f === K.dark ? K.pale : K.soft });
    txt(s, t, { x: x + 0.25, y: y + 0.55, w: 2.4, h: 0.9, fontSize: 15, bold: true, color: f === K.dark ? K.yellow : K.dark });
  });
  card(s, 0.6, 5.4, 12.13, 1.3, K.dark);
  s.addImage({ path: IMG('6.jpg'), x: 10.4, y: 5.4, w: 2.33, h: 1.3, sizing: { type: 'cover', w: 2.33, h: 1.3 } });
  txt(s, 'Rx', { x: 0.9, y: 5.6, w: 1.0, h: 0.9, fontSize: 40, bold: true, color: K.yellow, valign: 'middle' });
  txt(s, 'Assemblea generale di tutto il comparto', { x: 2.0, y: 5.6, w: 8.2, h: 0.45, fontSize: 19, bold: true, color: K.light });
  txt(s, 'La organizziamo noi: documenti sul tavolo, ogni accordo spiegato con la sua ratio.', { x: 2.0, y: 6.05, w: 8.2, h: 0.45, fontSize: 14, color: K.pale });
  foot(s, 'CISL FP Padova Rovigo · Direttivo AOUP');
}

/* 22 FINE */
{
  const s = slide('DARK', 21, 'Nei reparti');
  s.addImage({ path: IMG('4.jpg'), x: 7.6, y: 0, w: 5.733, h: 4.6, sizing: { type: 'cover', w: 5.733, h: 4.6 }, objectName: A('kb') });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.6, y: 0.5, w: 2.3, h: 1.25, rectRadius: 0.12, fill: { color: K.paper }, line: { color: K.paper, width: 0 } });
  s.addImage({ path: IMG('logo.png'), x: 0.75, y: 0.7, w: 2.0, h: 2.0 / LOGO_R });
  s.addText([R('Dati alla mano.', { color: K.light, breakLine: true }), R('Sempre.', { color: K.yellow })], { x: 0.6, y: 2.0, w: 6.8, h: 1.9, fontFace: F, fontSize: 50, bold: true, margin: 0, valign: 'top', isTextBox: true, objectName: A() });
  txt(s, 'al tuo fianco, una persona alla volta', { x: 0.6, y: 3.9, w: 6.5, h: 0.45, fontSize: 18, italic: true, bold: true, color: K.pale, objectName: A() });
  [['ACHILLE PAGLIARO', '391 127 1018', K.paper, K.dark, 0.6, 3.7], ['GIOVANNA VULLO', '389 928 5301', K.paper, K.dark, 4.5, 3.7], ['SCRIVICI', 'cisl.fp@aopd.veneto.it', K.yellow, K.dark, 8.4, 4.33]].forEach(([l, v, f, c, x, w]) => {
    card(s, x, 5.0, w, 1.5, f);
    txt(s, l, { x: x + 0.3, y: 5.2, w: w - 0.5, h: 0.3, fontSize: 12, bold: true, charSpacing: 2, color: K.soft });
    txt(s, v, { x: x + 0.3, y: 5.6, w: w - 0.4, h: 0.6, fontSize: f === K.yellow ? 20 : 26, bold: true, color: c });
  });
}

pres.writeFile({ fileName: __dirname + '/deck.pptx' }).then(f => console.log('written', f));
