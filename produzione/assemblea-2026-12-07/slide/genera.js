// Presentazione dell'assemblea generale del comparto AOUP — 7 dicembre 2026.
//
//   node genera.js            # scrive assemblea-2026-12-07.pptx
//
// Le schermate dei documenti vengono da ritagli.py (cartella schermate/).
// Una sezione per punto dell'ordine del giorno: si aggiungono man mano che
// Achille carica i documenti.
const path = require("path");
const fs = require("fs");
const pptxgen = require("pptxgenjs");
const sharp = require("sharp");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const fa = require("react-icons/fa");
const SKILL = "/root/.claude/skills/synced/f48cbcf9-743a-4b94-b1d7-e06d84cf3ed6_b9e9bec8-3516-4780-a4dc-8567464f828c/pptx";
const { applyTheme } = require(path.join(SKILL, "scripts/apply_theme.js"));

const QUI = __dirname;
const OUT = path.join(QUI, "assemblea-2026-12-07.pptx");

const THEME = {
  name: "CISL FP Assemblea",
  headFontFace: "Arial",
  bodyFontFace: "Calibri",
  colors: {
    dk1: "1B2A22", lt1: "FFFFFF", dk2: "06381F", lt2: "F2F8F3",
    accent1: "00843D", accent2: "FFD60A", accent3: "E2001A",
    accent4: "E67E00", accent5: "123C6B", accent6: "9BE15D",
    hlink: "00843D", folHlink: "06381F",
  },
};
const HEX = THEME.colors;

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.333 x 7.5
pres.title = "Assemblea generale del comparto AOUP — 7 dicembre 2026";
pres.author = "CISL FP Padova Rovigo";
pres.company = "CISL FP Padova Rovigo";
pres.theme = { headFontFace: THEME.headFontFace, bodyFontFace: THEME.bodyFontFace };
const C = pres.SchemeColor;
const W = 13.333, H = 7.5, M = 0.6;

// ---------------------------------------------------------------- icone
const iconCache = {};
async function icona(nome, colore, px = 256) {
  const k = nome + colore;
  if (iconCache[k]) return iconCache[k];
  const svg = ReactDOMServer.renderToStaticMarkup(
    React.createElement(fa[nome], { color: "#" + colore, size: px }));
  const buf = await sharp(Buffer.from(svg)).resize(px, px).png().toBuffer();
  return (iconCache[k] = "image/png;base64," + buf.toString("base64"));
}

async function dimensioni(file) {
  const m = await sharp(file).metadata();
  return { w: m.width, h: m.height };
}

// ---------------------------------------------------------------- layout
const PIEDE = "CISL FP Padova Rovigo  ·  Assemblea generale del comparto AOUP  ·  7 dicembre 2026";
const logo = path.join(QUI, "logo-cisl-fp.png");

pres.defineSlideMaster({
  title: "COPERTINA",
  background: { path: path.join(QUI, "sfondi/verde.jpg") },
  objects: [
    { placeholder: { options: { name: "title", type: "title", x: M, y: 2.2, w: 9.6, h: 2.6,
        fontSize: 60, bold: true, color: C.background1, valign: "top", align: "left", margin: 0 }, text: "" } },
    { placeholder: { options: { name: "body", type: "body", x: M, y: 4.9, w: 9.6, h: 1.4,
        fontSize: 22, color: C.background1, valign: "top", align: "left", margin: 0 }, text: "" } },
  ],
});
pres.defineSlideMaster({
  title: "DIVISORE",
  background: { path: path.join(QUI, "sfondi/verde.jpg") },
  objects: [
    { placeholder: { options: { name: "title", type: "title", x: M, y: 3.0, w: 7.0, h: 1.9,
        fontSize: 54, bold: true, color: C.background1, valign: "top", align: "left", margin: 0 }, text: "" } },
    { placeholder: { options: { name: "body", type: "body", x: M, y: 5.0, w: 7.0, h: 1.3,
        fontSize: 20, color: C.background1, valign: "top", align: "left", margin: 0 }, text: "" } },
  ],
  slideNumber: { x: W - 1.1, y: H - 0.55, w: 0.6, h: 0.3, fontSize: 11, color: C.background1, align: "right" },
});
pres.defineSlideMaster({
  title: "CONTENUTO",
  background: { color: C.background1 },
  objects: [
    { text: { text: PIEDE, options: { x: M, y: H - 0.5, w: 9, h: 0.3, fontSize: 10, color: "7A8B81", margin: 0 } } },
    { placeholder: { options: { name: "title", type: "title", x: M, y: 0.4, w: W - 2 * M, h: 0.95,
        fontSize: 34, bold: true, color: C.text2, valign: "top", align: "left", margin: 0 }, text: "" } },
  ],
  slideNumber: { x: W - 1.1, y: H - 0.55, w: 0.6, h: 0.3, fontSize: 11, color: "7A8B81", align: "right" },
});
pres.defineSlideMaster({
  title: "SCURO",
  background: { path: path.join(QUI, "sfondi/notte.jpg") },
  objects: [
    { text: { text: PIEDE, options: { x: M, y: H - 0.5, w: 9, h: 0.3, fontSize: 10, color: "7FA08C", margin: 0 } } },
    { placeholder: { options: { name: "title", type: "title", x: M, y: 0.4, w: W - 2 * M, h: 0.95,
        fontSize: 34, bold: true, color: C.background1, valign: "top", align: "left", margin: 0 }, text: "" } },
  ],
  slideNumber: { x: W - 1.1, y: H - 0.55, w: 0.6, h: 0.3, fontSize: 11, color: "7FA08C", align: "right" },
});

// ---------------------------------------------------------------- mattoni
function kicker(s, testo, colore = C.accent3, y = 0.18) {
  s.addText(testo.toUpperCase(), { x: M, y, w: 9, h: 0.25, fontSize: 12, bold: true,
    color: colore, charSpacing: 4, margin: 0, isTextBox: true, objectName: "occhiello" });
}

async function tondo(s, nome, x, y, d, fondo, colore = "FFFFFF") {
  s.addShape(pres.shapes.OVAL, { x, y, w: d, h: d, fill: { color: fondo }, line: { type: "none" },
    objectName: "icona-fondo" });
  const pad = d * 0.24;
  s.addImage({ data: await icona(nome, colore), x: x + pad, y: y + pad, w: d - 2 * pad, h: d - 2 * pad,
    altText: nome.replace(/^Fa/, ""), objectName: "icona" });
}

// Il motivo della presentazione: il foglio vero dell'accordo, con l'ombra,
// la frase evidenziata in giallo e l'etichetta della fonte sotto.
async function foglio(s, nome, x, y, w, fonte, opz = {}) {
  const file = path.join(QUI, "schermate", nome + ".png");
  const d = await dimensioni(file);
  let h = w * d.h / d.w;
  if (opz.maxH && h > opz.maxH) { h = opz.maxH; w = h * d.w / d.h; if (opz.centra) x = opz.centra - w / 2; }
  s.addShape(pres.shapes.RECTANGLE, { x: x - 0.08, y: y - 0.08, w: w + 0.16, h: h + 0.16,
    fill: { color: "FFFFFF" }, line: { color: "D9EADD", width: 1 },
    shadow: { type: "outer", color: "06381F", opacity: 0.22, blur: 14, offset: 4, angle: 90 },
    objectName: "foglio-cornice" });
  s.addImage({ path: file, x, y, w, h, altText: "Estratto dal documento: " + fonte, objectName: "foglio-" + nome });
  if (fonte) {
    s.addText([{ text: "📄  " + fonte }], { x: x - 0.08, y: y + h + 0.16, w: Math.max(w, 3), h: 0.3,
      fontSize: 11, italic: true, color: opz.scuro ? "B9D3C3" : "5B6B62", margin: 0, isTextBox: true,
      objectName: "fonte" });
  }
  return { x, y, w, h };
}

function numero(s, big, label, x, y, w, opz = {}) {
  s.addText(big, { x, y, w, h: opz.hBig || 1.1, fontFace: "Arial", fontSize: opz.size || 54, bold: true,
    color: opz.colore || C.accent1, margin: 0, valign: "bottom", isTextBox: true, objectName: "numero" });
  s.addText(label, { x, y: y + (opz.hBig || 1.1) + 0.05, w, h: opz.hLab || 0.9, fontSize: opz.lab || 16,
    color: opz.coloreLab || C.text1, margin: 0, valign: "top", isTextBox: true, objectName: "numero-etichetta" });
}

function card(s, x, y, w, h, fondo = C.background2, opz = {}) {
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h, rectRadius: 0.18, fill: { color: fondo },
    line: opz.bordo ? { color: opz.bordo, width: 1.5 } : { type: "none" },
    shadow: opz.ombra ? { type: "outer", color: "06381F", opacity: 0.16, blur: 10, offset: 3, angle: 90 } : undefined,
    objectName: opz.nome || "scheda" });
}

function testo(s, t, x, y, w, h, opz = {}) {
  s.addText(t, Object.assign({ x, y, w, h, fontSize: 16, color: C.text1, margin: 0, valign: "top",
    isTextBox: true, paraSpaceAfter: 6 }, opz));
}

function slideDomande(sez, titolo) {
  const s = pres.addSlide({ masterName: "DIVISORE", sectionTitle: sez });
  s.addText("Domande?", { placeholder: "title" });
  s.addText(titolo, { placeholder: "body" });
  return s;
}

// Le foto scattate al tavolo: lo schermo dell'Azienda, con la didascalia.
async function fotoTavolo(s, nome, x, y, w, didascalia, opz = {}) {
  const file = path.join(QUI, "schermate", "tavolo-" + nome + ".jpg");
  const d = await dimensioni(file);
  let h = w * d.h / d.w;
  if (opz.maxH && h > opz.maxH) { h = opz.maxH; const w2 = h * d.w / d.h; if (opz.centra) x = opz.centra - w2 / 2; w = w2; }
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: x - 0.1, y: y - 0.1, w: w + 0.2, h: h + 0.2, rectRadius: 0.12,
    fill: { color: "1B2A22" }, line: { type: "none" },
    shadow: { type: "outer", color: "06381F", opacity: 0.25, blur: 14, offset: 4, angle: 90 }, objectName: "foto-cornice" });
  s.addImage({ path: file, x, y, w, h, altText: "Foto della slide dell'Azienda: " + didascalia, objectName: "foto-" + nome });
  s.addText([{ text: "📷  " + didascalia }], { x: x - 0.1, y: y + h + 0.16, w: Math.max(w, 3), h: 0.3,
    fontSize: 11, italic: true, color: opz.scuro ? "B9D3C3" : "5B6B62", margin: 0, isTextBox: true, objectName: "didascalia" });
  return { x, y, w, h };
}
const TAVOLO = "Slide dell'Azienda al tavolo del 18/11/2026";

// ---------------------------------------------------------------- frontespizi
// Ogni accordo si presenta prima con la sua prima pagina, quella delle firme.
const FIRME = JSON.parse(fs.readFileSync(path.join(QUI, "firme.json"), "utf8"));
const LINK = JSON.parse(fs.readFileSync(path.join(QUI, "link-accordi.json"), "utf8"));
const ACCORDI = {
  "01": ["Integrazione progettualità anno 2025", "27 gennaio 2026", "Preintesa", [
    "Quote ai trasferiti del 2025: 400 € al coordinatore, 300 o 200 € al personale",
    "300 € ai tecnici di radiologia, 100 € all'area ambulatoriale",
    "Trasporto neonatale 80 € a uscita, quota ai tutor didattici"]],
  "03": ["Dichiarazione congiunta · Nuova Pediatria", "10 febbraio 2026", "Dichiarazione congiunta", [
    "Nuove équipe per il Pronto Soccorso e le degenze del nuovo ospedale pediatrico",
    "Criteri: preferenza, anzianità, prescrizioni, part time, competenze",
    "Chi è stato assegnato d'ufficio ha priorità per lo spostamento, possibilmente entro il 2026"]],
  "04": ["Risorse fondi contrattuali · Progettualità 2026", "15 aprile 2026", "Preintesa", [
    "4.286.894 € di conguaglio della premialità 2025",
    "1.040.000 € + 300.000 € di progetti: Hub, gettoni, H24, tecnici e amministrativi",
    "Ferie estive: tre settimane garantite"]],
  "08": ["Regolamento progressioni tra aree", "14 luglio 2026", "Regolamento", [
    "20 posti per passare all'area superiore",
    "Prove 60 punti, titoli 40",
    "Requisiti in deroga fino al 31 dicembre 2026"]],
  "09": ["Progettualità 2026 · integrazione", "14 luglio 2026", "Preintesa", [
    "432.674 € in più dai residui 2025",
    "500 € ai coordinatori, 300 € al personale tecnico sanitario",
    "Radiologia in PS da 4 a 7 € al giorno, +0,50 €/h sui turni del ruolo tecnico"]],
  "10": ["Legge regionale 26/2024 · risorse 2026", "14 luglio 2026", "Preintesa", [
    "Notte +0,50 €/h, pronta disponibilità 27,60 € a turno",
    "Aree complesse fino a 650 € l'anno",
    "Welfare da 350 € anche ai ruoli professionale, tecnico e amministrativo"]],
  "12": ["Rapporto di lavoro a tempo parziale · 2026", "8 settembre 2026", "Accordo", [
    "135 posti a part time per quattro anni",
    "Bando entro fine 2026, graduatorie entro marzo 2027",
    "Impegno: circa 20 posti in più ogni anno"]],
  "13": ["Regolamento lavoro agile", "25 settembre 2026", "Regolamento", [
    "Fino a 8 giornate al mese, di norma due a settimana",
    "Contattabilità 9-13 e 14-17, disconnessione dalle 20 alle 8",
    "Deroghe per fragilità e tutele di legge"]],
  "11": ["Regolamento ferie e riposi solidali", "8 settembre 2026", "Accordo", [
    "Si possono cedere ferie e riposi a un collega che assiste un figlio",
    "Esteso a genitori, figli maggiorenni e coniuge, a condizioni precise",
    "Cedibili le ferie oltre le quattro settimane annue e le festività soppresse"]],
  "14": ["Preintesa DEP · anno 2026", "25 settembre 2026", "Preintesa", [
    "620.000 € per i differenziali economici, dal 1° gennaio 2026",
    "Si partecipa d'ufficio: 60 punti valutazione, 40 esperienza",
    "Chi ha 3 anni di anzianità e nessuna progressione 2023-2025"]],
  "18": ["Preintesa DEP · anno 2025", "10 dicembre 2025", "Preintesa", [
    "820.000 € per i differenziali economici di professionalità",
    "Si partecipa d'ufficio: 60 punti valutazione, 40 esperienza",
    "10% riservato a chi aspetta da 10 o 20 anni"]],
  "ccnl": ["CCNL Sanità pubblica 2025-2027", "29 luglio 2026", "Ipotesi di contratto", [
    "Aumenti in tre tranche: 2025, 2026, 2027",
    "Specificità infermieristica e tutela del malato quasi raddoppiate dal 2026",
    "Indennità durante le ferie, aggressioni, intelligenza artificiale"],
    [["ARAN", "sì"], ["CISL FP", "sì"], ["FP CGIL", "sì"], ["UIL FPL", "sì"], ["FIALS", "sì"], ["Nursind, Nursing Up", "sì"]]],
  "19": ["Dichiarazione congiunta", "23 dicembre 2025", "Dichiarazione congiunta", [
    "Tre tavoli permanenti: personale, riorganizzazioni, benessere",
    "OSS nel turno di notte delle Chirurgie in 12-18 mesi",
    "Pasto nei turni di notte e festivi, job description"]],
};

async function frontespizio(n, sezione) {
  const [titolo, data, tipo, cosa, firmeProprie] = ACCORDI[n];
  const s = pres.addSlide({ masterName: "CONTENUTO", sectionTitle: sezione });
  kicker(s, "L'accordo · " + tipo + " · " + data);
  s.addText(titolo, { x: M, y: 0.45, w: 7.4, h: 1.2, fontSize: 30, bold: true, color: C.text2, valign: "top", fontFace: THEME.headFontFace,
    margin: 0, isTextBox: true, objectName: "titolo-accordo" });
  // la pagina vera, a destra
  const file = path.join(QUI, "schermate", "front-" + n + ".png");
  const d = await dimensioni(file);
  const ph = 6.45, pw = ph * d.w / d.h, px = W - M - pw + 0.1, py = 0.3;
  s.addShape(pres.shapes.RECTANGLE, { x: px - 0.06, y: py - 0.06, w: pw + 0.12, h: ph + 0.12,
    fill: { color: "FFFFFF" }, line: { color: "D9EADD", width: 1 },
    shadow: { type: "outer", color: "06381F", opacity: 0.25, blur: 16, offset: 5, angle: 90 }, objectName: "frontespizio-cornice" });
  s.addImage({ path: file, x: px, y: py, w: pw, h: ph, altText: "Frontespizio con le firme: " + titolo + ", " + data,
    objectName: "frontespizio" });
  s.addText("FIRMATO", { x: px + pw - 2.3, y: py + ph * 0.665, w: 2.1, h: 0.62, fontSize: 24, bold: true,
    color: C.accent3, align: "center", valign: "middle", rotate: -12, margin: 0, isTextBox: true,
    line: { color: HEX.accent3, width: 3 }, objectName: "timbro" });
  // chi ha firmato
  s.addText("FIRME SUL DOCUMENTO", { x: M, y: 1.85, w: 7, h: 0.3, fontSize: 12, bold: true, color: C.accent1,
    charSpacing: 3, margin: 0, isTextBox: true });
  const parti = firmeProprie || [["Azienda", "sì"], ["RSU", FIRME[n]["RSU"]], ["CISL FP", FIRME[n]["CISL FP"]], ["FIALS", FIRME[n]["FIALS"]],
    ["Nursing Up", FIRME[n]["NURSING UP"]], ["Nursind", FIRME[n]["NURSIND"]]];
  for (let i = 0; i < parti.length; i++) {
    const x = M + (i % 3) * 2.45, y = 2.25 + Math.floor(i / 3) * 0.72;
    const firmato = !!parti[i][1], cisl = parti[i][0] === "CISL FP";
    card(s, x, y, 2.3, 0.58, cisl ? C.accent2 : (firmato ? C.background2 : "F3F3F3"));
    s.addText([{ text: firmato ? "✔  " : "–  ", options: { color: firmato ? HEX.accent1 : "9AA5A0", bold: true } },
      { text: parti[i][0], options: { bold: true, color: firmato ? HEX.dk2 : "8A948F" } }],
      { x: x + 0.18, y, w: 2.0, h: 0.58, fontSize: parti[i][0].length > 12 ? 12 : 15, valign: "middle", margin: 0, isTextBox: true });
  }
  s.addText("COSA CONTIENE", { x: M, y: 3.75, w: 7, h: 0.3, fontSize: 12, bold: true, color: C.accent1,
    charSpacing: 3, margin: 0, isTextBox: true });
  for (let i = 0; i < cosa.length; i++) {
    const y = 4.15 + i * 0.78;
    s.addShape(pres.shapes.OVAL, { x: M, y: y + 0.06, w: 0.42, h: 0.42, fill: { color: HEX.dk2 }, line: { type: "none" } });
    s.addText(String(i + 1), { x: M, y: y + 0.06, w: 0.42, h: 0.42, fontSize: 14, bold: true, color: C.accent2,
      align: "center", valign: "middle", margin: 0, isTextBox: true });
    s.addText(cosa[i], { x: M + 0.6, y, w: 6.8, h: 0.6, fontSize: 16, color: C.text1, valign: "middle", margin: 0, isTextBox: true });
  }
  if (tipo === "Ipotesi di contratto")
    s.addText("Ipotesi firmata all'ARAN: diventa definitiva dopo i controlli di Governo e Corte dei conti.",
      { x: M, y: 6.55, w: 7.4, h: 0.3, fontSize: 12, italic: true, color: "5B6B62", margin: 0, isTextBox: true });
  if (tipo === "Preintesa")
    s.addText("Una preintesa diventa efficace con il parere favorevole del Collegio sindacale.",
      { x: M, y: 6.55, w: 7.4, h: 0.3, fontSize: 12, italic: true, color: "5B6B62", margin: 0, isTextBox: true });
  if (LINK[n]) {
    // il documento ufficiale: clic sul riquadro o QR dal telefono
    const cx = px - 0.55, cy = py + ph - 2.05;
    card(s, cx, cy, 1.7, 1.95, "FFFFFF", { bordo: HEX.accent1, ombra: true });
    s.addImage({ path: path.join(QUI, "qr", "acc-" + n + ".png"), x: cx + 0.25, y: cy + 0.12, w: 1.2, h: 1.2, altText: "QR del documento ufficiale sul sito dell'Azienda" });
    s.addText("ORIGINALE SUL SITO AOUP", { x: cx + 0.05, y: cy + 1.35, w: 1.6, h: 0.5, fontSize: 9, bold: true, color: HEX.accent1, align: "center", valign: "middle", charSpacing: 1, margin: 0, isTextBox: true });
    s.addShape(pres.shapes.RECTANGLE, { x: cx, y: cy, w: 1.7, h: 1.95, fill: { color: "FFFFFF", transparency: 100 }, line: { type: "none" },
      hyperlink: { url: LINK[n], tooltip: "Apri l'accordo originale sul sito dell'Azienda" }, objectName: "link-originale" });
  }
  s.addNotes(`Frontespizio: ${titolo}, ${tipo.toLowerCase()} del ${data}. ` + (LINK[n] ? `Documento ufficiale: ${LINK[n]} . ` : "") + `Firme sul documento: ` +
    parti.map(p => p[0] + (p[1] ? (p[1] === "sì" ? " sì" : " sì (" + p[1] + ")") : " no")).join(", ") + ".");
  return s;
}


// Mini video dell'argomento, incorporato: parte con un clic in presentazione.
const MINI = path.join(QUI, "..", "video", "mini");
async function videoSlide(sez, nome, titolo) {
  const mp4 = path.join(MINI, nome + ".mp4");
  const s = pres.addSlide({ masterName: "SCURO", sectionTitle: sez });
  kicker(s, "▶ Video · clic per avviare", HEX.accent2, 0.2);
  s.addText(titolo, { x: M, y: 0.45, w: W - 2 * M, h: 0.7, fontSize: 28, bold: true, color: "FFFFFF", margin: 0, isTextBox: true });
  const w = 10.1, h = w * 9 / 16, x = (W - w) / 2, y = 1.25;
  s.addShape(pres.shapes.RECTANGLE, { x: x - 0.06, y: y - 0.06, w: w + 0.12, h: h + 0.12, fill: { color: HEX.accent2 }, line: { type: "none" } });
  if (fs.existsSync(mp4)) {
    const lav = path.join(MINI, "lavoro", nome.slice(0, 2), "scene", "s01");
    const fr = fs.existsSync(lav) ? fs.readdirSync(lav).filter(f => f.endsWith(".png")).sort().pop() : null;
    const cover = fr ? "data:image/png;base64," + (await sharp(path.join(lav, fr)).resize(1280).png().toBuffer()).toString("base64") : undefined;
    s.addMedia({ type: "video", path: mp4, x, y, w, h, cover });
  } else {
    s.addShape(pres.shapes.RECTANGLE, { x, y, w, h, fill: { color: "04351C" }, line: { type: "none" } });
    s.addText("Video in preparazione: " + nome + ".mp4", { x, y, w, h, fontSize: 20, color: "B9D3C3", align: "center", valign: "middle", margin: 0, isTextBox: true });
  }
  s.addNotes("Mini video «" + titolo + "» (voce Luca Ward, sottotitoli in sovraimpressione). File: video/mini/" + nome + ".mp4. Se il video non parte dalla presentazione, aprire il file direttamente.");
  return s;
}


// Immagini generate con Higgsfield: foto a piena pagina e ricostruzioni.
const IMM = path.join(QUI, "immagini");
async function fotoPiena(sez, nome, frase, sotto) {
  const s = pres.addSlide({ sectionTitle: sez });
  const f = path.join(IMM, nome + ".jpg"), d = await dimensioni(f);
  // riempie la slide tagliando il superfluo
  const r = Math.max(W / d.w, H / d.h), iw = d.w * r, ih = d.h * r;
  s.addImage({ path: f, x: (W - iw) / 2, y: (H - ih) / 2, w: iw, h: ih, altText: frase, sizing: { type: "cover", w: W, h: H } });
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: H - 2.6, w: W, h: 2.6, fill: { color: "04351C", transparency: 18 }, line: { type: "none" } });
  s.addShape(pres.shapes.RECTANGLE, { x: M, y: H - 2.25, w: 0.12, h: 1.5, fill: { color: HEX.accent2 }, line: { type: "none" } });
  s.addText(frase, { x: M + 0.35, y: H - 2.35, w: W - 2 * M - 0.5, h: 1.05, fontSize: 36, bold: true, color: "FFFFFF", valign: "middle", margin: 0, isTextBox: true });
  if (sotto) s.addText(sotto, { x: M + 0.35, y: H - 1.3, w: W - 2 * M - 0.5, h: 0.55, fontSize: 18, color: "CFE9D8", valign: "top", margin: 0, isTextBox: true });
  s.addText("Immagine generata con IA", { x: W - 3.1, y: H - 0.42, w: 2.8, h: 0.3, fontSize: 9, italic: true, color: "9FC2AD", align: "right", margin: 0, isTextBox: true });
  s.addNotes("Pausa visiva: lasciare la foto qualche secondo e dire la frase. Immagine generata con IA (Higgsfield), persone non reali.");
  return s;
}
async function ricostruzione(sez, nome, kick, titolo, testo, nota) {
  const s = pres.addSlide({ masterName: "SCURO", sectionTitle: sez });
  const f = path.join(IMM, nome + ".jpg"), d = await dimensioni(f);
  const h = H, w = Math.min(h * d.w / d.h, 7.6);
  s.addImage({ path: f, x: 0, y: 0, w, h, altText: titolo, sizing: { type: "cover", w, h } });
  s.addText("RICOSTRUZIONE · IMMAGINE GENERATA CON IA", { x: 0.25, y: H - 0.45, w: 5, h: 0.3, fontSize: 9, bold: true, color: "FFFFFF", charSpacing: 2, margin: 0, isTextBox: true, shadow: { type: "outer", color: "000000", opacity: 0.6, blur: 4, offset: 1, angle: 90 } });
  const x = w + 0.5, tw = W - x - M;
  s.addText(kick.toUpperCase(), { x, y: 1.2, w: tw, h: 0.4, fontSize: 13, bold: true, color: HEX.accent2, charSpacing: 3, margin: 0, isTextBox: true });
  s.addText(titolo, { x, y: 1.65, w: tw, h: 1.9, fontSize: 32, bold: true, color: "FFFFFF", valign: "top", margin: 0, isTextBox: true });
  s.addShape(pres.shapes.RECTANGLE, { x, y: 3.65, w: 1.2, h: 0.09, fill: { color: HEX.accent2 }, line: { type: "none" } });
  s.addText(testo, { x, y: 3.95, w: tw, h: 2.6, fontSize: 18, color: "CFE9D8", valign: "top", margin: 0, isTextBox: true });
  s.addNotes((nota || "") + " Immagine generata con IA (Higgsfield): è una ricostruzione, le persone non sono reali.");
  return s;
}

// ================================================================ SLIDE
(async () => {
  // ------------------------------------------------ apertura
  pres.addSection({ title: "Apertura" });
  {
    const s = pres.addSlide({ masterName: "COPERTINA", sectionTitle: "Apertura" });
    card(s, M, 0.5, 2.0, 1.0, "FFFFFF");
    s.addImage({ path: logo, x: M + 0.15, y: 0.55, w: 1.85 - 0.15, h: (1.85 - 0.15) / 2.06, altText: "CISL FP Padova Rovigo" });
    s.addText("ASSEMBLEA GENERALE DEL COMPARTO", { x: M, y: 1.65, w: 9, h: 0.4, fontSize: 16, bold: true,
      color: C.accent6, charSpacing: 5, margin: 0, isTextBox: true });
    s.addText([{ text: "Come stanno ", options: {} }, { text: "davvero", options: { color: C.accent2 } },
      { text: " le cose", options: {} }], { placeholder: "title" });
    s.addText("Azienda Ospedale-Università di Padova · Aula Magna, 2° piano palazzina dei servizi\nLunedì 7 dicembre 2026 · 7:30–13:00", { placeholder: "body" });
    card(s, 10.15, 4.75, 2.6, 1.6, C.accent2, { ombra: true });
    s.addText([{ text: "10", options: { fontSize: 54, bold: true, breakLine: true } },
      { text: "punti all'ordine del giorno", options: { fontSize: 14, bold: true } }],
      { x: 10.3, y: 4.8, w: 2.3, h: 1.5, color: C.text2, align: "center", valign: "middle", margin: 0, isTextBox: true });
    s.addNotes("Accoglienza. Proiettare il video di introduzione prima di questa slide.");
  }
  await fotoPiena("Apertura", "01-assemblea", "Oggi parliamo noi. Ma soprattutto ascoltiamo voi.", "Ogni domanda di stamattina diventa una richiesta al prossimo tavolo con l'Azienda");
  {
    const s = pres.addSlide({ masterName: "CONTENUTO", sectionTitle: "Apertura" });
    kicker(s, "Ordine del giorno");
    s.addText("Dieci punti, cinque ore e mezza", { placeholder: "title" });
    const odg = [
      ["FaFileSignature", "Nuovo CCNL Sanità 2025-2027"],
      ["FaHandshake", "Accordi decentrati AOUP 2026"],
      ["FaUserTie", "Sistema degli incarichi"],
      ["FaGift", "Welfare Regione Veneto"],
      ["FaBalanceScale", "Vertenze legali"],
      ["FaTools", "Incentivi funzioni tecniche"],
      ["FaUsers", "Andamenti occupazionali"],
      ["FaHeart", "Retention e benessere organizzativo"],
      ["FaUmbrellaBeach", "Situazione previdenziale"],
      ["FaComments", "Varie ed eventuali"],
    ];
    const cw = 2.27, ch = 2.35, gx = 0.2;
    for (let i = 0; i < odg.length; i++) {
      const col = i % 5, row = Math.floor(i / 5);
      const x = M + col * (cw + gx), y = 1.6 + row * (ch + 0.25);
      const attivo = false;
      card(s, x, y, cw, ch, attivo ? C.accent2 : C.background2, { ombra: attivo });
      s.addText(String(i + 1).padStart(2, "0"), { x: x + 0.22, y: y + 0.15, w: 1, h: 0.5, fontSize: 24, bold: true,
        color: attivo ? C.text2 : C.accent1, margin: 0, isTextBox: true });
      await tondo(s, odg[i][0], x + cw - 0.82, y + 0.18, 0.6, attivo ? HEX.dk2 : HEX.accent1);
      s.addText(odg[i][1], { x: x + 0.22, y: y + 0.95, w: cw - 0.4, h: 1.2, fontSize: 17, bold: true,
        color: C.text2, margin: 0, valign: "top", isTextBox: true });
    }
    s.addNotes("Presentare i 10 punti. Ogni blocco si regge da solo: chi arriva o va via per i turni trova sempre un punto completo.");
  }


  // ------------------------------------------------ 1 · CCNL 2025-2027
  const S1 = "1 · CCNL Sanità 2025-2027";
  const FCCNL = "Ipotesi CCNL 2025-2027 · 29/07/2026";
  pres.addSection({ title: S1 });
  {
    const s = pres.addSlide({ masterName: "DIVISORE", sectionTitle: S1 });
    s.addText("01", { x: M, y: 0.7, w: 4, h: 2.2, fontSize: 150, bold: true, color: C.accent2, margin: 0, isTextBox: true });
    s.addText("Il nuovo CCNL Sanità 2025-2027", { placeholder: "title" });
    s.addText("Firmato all'ARAN il 29 luglio 2026: aumenti, indennità, nuovi diritti", { placeholder: "body" });
    card(s, 9.4, 1.4, 3.3, 4.6, "0B4D28");
    s.addText([{ text: "≈ 240 €", options: { fontSize: 54, bold: true, color: HEX.accent2, breakLine: true } },
      { text: "al mese in più, in media, per gli infermieri", options: { fontSize: 18, bold: true, color: "FFFFFF", breakLine: true } },
      { text: "209 € per le altre figure · stime CISL FP", options: { fontSize: 14, color: "CFE9D8" } }],
      { x: 9.6, y: 1.7, w: 2.9, h: 4, align: "center", valign: "middle", margin: 0, isTextBox: true });
    s.addNotes("Medie indicate dalla guida CISL FP del 29/07/2026: circa 240 € per il personale infermieristico comprese le indennità, 209 € per le altre categorie; circa 380 € cumulando i CCNL 2022-2024 e 2025-2027.");
  }
  await fotoPiena(S1, "02-firma", "Un contratto vale quanto la sua applicazione.", "Il nuovo CCNL Sanità 2025-2027: cosa cambia in busta paga e nei diritti");
  await videoSlide(S1, "01-ccnl", "Il nuovo contratto in due minuti");
  await frontespizio("ccnl", S1);
  {
    const s = pres.addSlide({ masterName: "CONTENUTO", sectionTitle: S1 });
    kicker(s, "Quando arriva cosa");
    s.addText("Tre tranche, un contratto che copre il triennio", { placeholder: "title" });
    const t = [["1.1.2025", "Prima tranche", "decorre da quasi due anni fa: va pagata come arretrato"],
      ["1.1.2026", "Seconda tranche", "e indennità infermieristiche e di tutela del malato raddoppiate"],
      ["29.7.2026", "Ipotesi firmata", "all'ARAN da CISL FP e dalle altre sigle"],
      ["Dicembre 2026", "Firma definitiva attesa", "poi 30 giorni per applicare gli aumenti automatici"],
      ["1.1.2027", "Terza tranche", "indennità ferie, nuove regole su DEP e ferie"],
      ["Luglio 2027", "Verifica sull'inflazione", "ARAN e sindacati confrontano stipendi e prezzi"]];
    for (let i = 0; i < t.length; i++) {
      const x = M + (i % 3) * 4.1, y = 1.6 + Math.floor(i / 3) * 2.6;
      const forte = i === 3;
      card(s, x, y, 3.85, 2.35, forte ? C.accent2 : C.background2, { ombra: forte });
      s.addText(t[i][0], { x: x + 0.25, y: y + 0.2, w: 3.4, h: 0.6, fontSize: 26, bold: true, color: forte ? C.text2 : C.accent1, margin: 0, isTextBox: true });
      s.addText(t[i][1], { x: x + 0.25, y: y + 0.85, w: 3.4, h: 0.45, fontSize: 18, bold: true, color: C.text2, margin: 0, isTextBox: true });
      s.addText(t[i][2], { x: x + 0.25, y: y + 1.35, w: 3.4, h: 0.85, fontSize: 14, color: C.text1, margin: 0, valign: "top", isTextBox: true });
    }
    s.addNotes("Art. 2: il contratto copre 1/1/2025-31/12/2027; gli istituti economici automatici vanno applicati entro 30 giorni dalla stipulazione definitiva. La firma definitiva è attesa a dicembre (come scritto nella mail del 18/11): verificare la data prima dell'assemblea.");
  }
  {
    const s = pres.addSlide({ masterName: "CONTENUTO", sectionTitle: S1 });
    kicker(s, "Tabella 1a · aumenti mensili lordi, per 13 mensilità");
    s.addText("Quanto sale lo stipendio tabellare", { placeholder: "title" });
    const aree = ["Supporto", "Operatori", "Assistenti", "Professionisti salute e funzionari", "Elevata qualificazione"];
    s.addChart(pres.charts.BAR, [
      { name: "Dal 1.1.2025", labels: aree, values: [41.4, 43.7, 46.6, 50.5, 70.2] },
      { name: "Dal 1.1.2026", labels: aree, values: [82.8, 87.4, 93.2, 101.1, 140.5] },
      { name: "Dal 1.1.2027", labels: aree, values: [106.7, 112.6, 120.0, 130.2, 181.0] },
    ], { x: M, y: 1.5, w: 7.3, h: 5.3, barDir: "col", barGrouping: "clustered", chartColors: [HEX.accent6, HEX.accent1, HEX.dk2],
      showValue: true, dataLabelPosition: "outEnd", dataLabelFormatCode: "0", dataLabelFontSize: 11, dataLabelColor: HEX.dk1, dataLabelFontFace: "+mn-lt",
      catAxisLabelFontSize: 12, catAxisLabelColor: HEX.dk1, catAxisLabelFontFace: "+mn-lt", valAxisHidden: true,
      valGridLine: { style: "none" }, catGridLine: { style: "none" }, showLegend: true, legendPos: "t", legendFontSize: 13,
      legendFontFace: "+mn-lt", legendColor: HEX.dk1, showTitle: false, barGapWidthPct: 60 });
    await foglio(s, "ccnl-tab1a", 8.25, 1.6, 4.45, FCCNL + " · Tabella 1a");
    card(s, 8.2, 4.35, 4.5, 2.2, C.text2);
    s.addText([{ text: "+130,20 €", options: { fontSize: 34, bold: true, color: HEX.accent2, breakLine: true } },
      { text: "al mese dal 2027 per infermieri, ostetriche, tecnici e funzionari", options: { fontSize: 15, color: "FFFFFF" } }],
      { x: 8.45, y: 4.45, w: 4.0, h: 2.0, valign: "middle", margin: 0, isTextBox: true });
    s.addNotes("Gli importi non si sommano: ogni colonna è il nuovo aumento rispetto al CCNL 27.10.2025 a quella data. Comprendono l'anticipazione (IVC) già in busta. Effetto su tredicesima, TFR, pensione; sullo straordinario dal mese successivo all'entrata in vigore (art. 38).");
  }
  {
    const s = pres.addSlide({ masterName: "SCURO", sectionTitle: S1 });
    kicker(s, "Arretrati · stima CISL FP", HEX.accent2);
    s.addText("Gli arretrati, area per area", { placeholder: "title" });
    const arr = [["Supporto", "1.147 €"], ["Operatori", "1.210 €"], ["Assistenti", "1.290 €"], ["Professionisti salute e funzionari", "1.399 €"], ["Elevata qualificazione", "1.946 €"]];
    for (let i = 0; i < arr.length; i++) {
      const x = M + i * 2.45;
      card(s, x, 1.75, 2.25, 2.35, i === 3 ? HEX.accent2 : "13301F", { bordo: i === 3 ? undefined : "1F4A31" });
      s.addText(arr[i][1], { x: x + 0.15, y: 2.0, w: 1.95, h: 0.9, fontSize: 30, bold: true, color: i === 3 ? HEX.dk2 : HEX.accent2, align: "center", margin: 0, isTextBox: true });
      s.addText(arr[i][0], { x: x + 0.15, y: 3.0, w: 1.95, h: 1.4, fontSize: 15, bold: true, color: i === 3 ? HEX.dk2 : "FFFFFF", align: "center", valign: "top", margin: 0, isTextBox: true });
    }
    card(s, M, 4.45, W - 2 * M, 1.45, "3A0A10", { bordo: "E2001A" });
    s.addText([{ text: "Infermieri: in più ", options: { color: "FFFFFF" } }, { text: "1.027 €", options: { color: HEX.accent2, bold: true } },
      { text: " di arretrati sulla specificità infermieristica. ", options: { color: "FFFFFF" } },
      { text: "Si può superare i 2.000 € in totale.", options: { color: HEX.accent2, bold: true } }],
      { x: M + 0.3, y: 4.5, w: W - 2 * M - 0.6, h: 1.35, fontSize: 20, valign: "middle", margin: 0, isTextBox: true });
    s.addText("Stima CISL FP su tabellare 2025 × 13 e 2026 × 11 mensilità, meno l'anticipo (IVC) già in busta, con firma definitiva entro il 1° dicembre. Va ricalcolata caso per caso.",
      { x: M, y: 6.1, w: W - 2 * M, h: 0.55, fontSize: 13, italic: true, color: "B9D3C3", margin: 0, isTextBox: true });
    s.addNotes("Stima della guida CISL FP del 29/07/2026: tabellare 2025 × 13 mensilità + tabellare 2026 × 11 mensilità, meno l'IVC già percepita, ipotizzando l'entrata in vigore definitiva entro il 1/12/2026. Va riparametrata su data di assunzione, part time e somme già percepite. Ostetriche: 1.027 € sulla tutela del malato; tecnici e riabilitazione 769 €; OSS 644 €.");
  }
  {
    const s = pres.addSlide({ masterName: "CONTENUTO", sectionTitle: S1 });
    kicker(s, "Art. 41 e 42 · dal 1° gennaio 2026");
    s.addText("Le indennità di chi assiste quasi raddoppiano", { placeholder: "title" });
    const r = [["Infermieri", "87,79", "181,14", HEX.accent3], ["Ostetriche", "87,79", "181,14", HEX.accent3],
      ["Tecnici, riabilitazione, prevenzione", "51,97", "121,87", HEX.accent1], ["OSS senior", "46,40", "108,80", HEX.accent1], ["OSS", "43,51", "102,01", HEX.accent1]];
    s.addText([{ text: "prima", options: { color: "7A8B81" } }], { x: M + 3.6, y: 1.5, w: 1.3, h: 0.35, fontSize: 13, bold: true, align: "center", margin: 0, isTextBox: true });
    s.addText([{ text: "dal 2026", options: { color: HEX.accent1 } }], { x: M + 5.2, y: 1.5, w: 1.6, h: 0.35, fontSize: 13, bold: true, align: "center", margin: 0, isTextBox: true });
    for (let i = 0; i < r.length; i++) {
      const y = 1.9 + i * 0.95;
      card(s, M, y, 6.9, 0.8, i < 2 ? "FFF4B8" : C.background2);
      s.addText(r[i][0], { x: M + 0.2, y, w: 3.4, h: 0.8, fontSize: 16, bold: true, color: C.text2, valign: "middle", margin: 0, isTextBox: true });
      s.addText(r[i][1] + " €", { x: M + 3.6, y, w: 1.3, h: 0.8, fontSize: 18, color: "7A8B81", align: "center", valign: "middle", margin: 0, isTextBox: true });
      s.addImage({ data: await icona("FaArrowRight", r[i][3]), x: M + 4.95, y: y + 0.27, w: 0.26, h: 0.26, altText: "freccia" });
      s.addText(r[i][2] + " €", { x: M + 5.2, y, w: 1.6, h: 0.8, fontSize: 24, bold: true, color: r[i][3], align: "center", valign: "middle", margin: 0, isTextBox: true });
    }
    s.addText("Valori mensili lordi per 12 mensilità. Le ostetriche sono equiparate agli infermieri.", { x: M, y: 6.7, w: 6.9, h: 0.3, fontSize: 12, italic: true, color: "5B6B62", margin: 0, isTextBox: true });
    await foglio(s, "ccnl-tab3", 7.85, 1.6, 4.85, "Tabella 3 · specificità infermieristica", { maxH: 2.6, centra: 10.275 });
    await foglio(s, "ccnl-tab4", 7.85, 4.65, 4.85, "Tabella 4 · tutela del malato", { maxH: 1.95, centra: 10.275 });
    s.addNotes("Valori prima: guida CISL FP (art. 65 e 66 CCNL 27.10.2025). Nuovi valori: Tabelle 3 e 4 dell'ipotesi. Assistenti (infermiere generico senior) 161,50 €, operatori (infermiere generico) 151,48 €.");
  }
  {
    const s = pres.addSlide({ masterName: "SCURO", sectionTitle: S1 });
    kicker(s, "Art. 28 · Indennità ferie · dal 1° gennaio 2027", HEX.accent2);
    s.addText("In ferie non perdi più le indennità", { placeholder: "title" });
    testo(s, [{ text: "Quello che chiediamo in tribunale per il passato, ", options: { color: "FFFFFF" } },
      { text: "dal 2027 è scritto nel contratto.", options: { color: HEX.accent2, bold: true } }], M, 1.45, 7.5, 0.9, { fontSize: 22 });
    card(s, M, 2.5, 7.5, 2.45, "13301F", { bordo: "1F4A31" });
    s.addText("COME SI CALCOLA", { x: M + 0.3, y: 2.65, w: 7, h: 0.3, fontSize: 12, bold: true, color: HEX.accent6, charSpacing: 3, margin: 0, isTextBox: true });
    s.addText([{ text: "indennità del semestre precedente", options: { breakLine: true } }, { text: "÷ 6 mesi ÷ 26 giorni", options: { color: HEX.accent2 } }],
      { x: M + 0.3, y: 3.0, w: 7, h: 1.1, fontSize: 26, bold: true, color: "FFFFFF", margin: 0, isTextBox: true });
    s.addText("= una quota per ogni giorno di ferie, se arriva almeno a 3 €", { x: M + 0.3, y: 4.2, w: 7, h: 0.5, fontSize: 16, color: "CFE9D8", margin: 0, isTextBox: true });
    const ind = ["Turno", "Notte", "Festivo", "UO disagiate", "Pronto soccorso"];
    for (let i = 0; i < ind.length; i++) {
      const x = M + i * 1.52;
      card(s, x, 5.2, 1.42, 0.75, i === 4 ? HEX.accent3 : HEX.accent1);
      s.addText(ind[i], { x, y: 5.2, w: 1.42, h: 0.75, fontSize: 13, bold: true, color: "FFFFFF", align: "center", valign: "middle", margin: 0, isTextBox: true });
    }
    await foglio(s, "ccnl-indennita-ferie", 8.55, 1.5, 4.15, FCCNL + " · art. 28 c. 2", { scuro: true });
    card(s, 8.5, 3.6, 4.25, 2.35, HEX.accent2, { ombra: true });
    s.addText([{ text: "E la vertenza continua", options: { fontSize: 20, bold: true, breakLine: true } },
      { text: "per gli anni prima del 2027 servono ancora la causa e la Cassazione 25528/2025: aderisci (punto 5).", options: { fontSize: 14 } }],
      { x: 8.7, y: 3.7, w: 3.85, h: 2.15, color: HEX.dk2, valign: "middle", margin: 0, isTextBox: true });
    s.addNotes("Art. 28 c. 2: indennità giornaliera «Indennità ferie» pari alle indennità di turno, notte, festivo, UO disagiate e pronto soccorso percepite nel semestre precedente, diviso 6 e diviso 26; spetta solo se almeno 3 € al giorno. L'articolo sostituisce l'art. 35 del CCNL 27.10.2025 dall'1/1/2027.");
  }
  {
    const s = pres.addSlide({ masterName: "CONTENUTO", sectionTitle: S1 });
    kicker(s, "Art. 28 e 29 · ferie e riposi solidali");
    s.addText("Ferie: le regole nuove", { placeholder: "title" });
    const f = [["FaUmbrellaBeach", "28 / 32", "giorni lavorativi di ferie, su 5 o su 6 giorni settimanali"],
      ["FaSun", "15 giorni", "di fila d'estate: 1/6-30/9, oppure 15/6-15/9 per chi ha figli in età scolare"],
      ["FaStopwatch", "15 giorni", "al massimo per rispondere a una richiesta di ferie"],
      ["FaCalendarAlt", "entro aprile", "il piano delle ferie estive concordato"],
      ["FaProcedures", "sospese", "da malattia oltre 3 giorni o ricovero"],
      ["FaHandsHelping", "solidali", "ferie cedibili anche a chi assiste un familiare dopo un'aggressione"]];
    for (let i = 0; i < f.length; i++) {
      const x = M + (i % 2) * 3.45, y = 1.55 + Math.floor(i / 2) * 1.72;
      await tondo(s, f[i][0], x, y + 0.05, 0.7, i === 1 ? HEX.accent3 : HEX.accent1);
      s.addText(f[i][1], { x: x + 0.85, y, w: 2.5, h: 0.5, fontSize: 22, bold: true, color: C.text2, margin: 0, isTextBox: true });
      s.addText(f[i][2], { x: x + 0.85, y: y + 0.5, w: 2.45, h: 1.05, fontSize: 13, color: C.text1, margin: 0, valign: "top", isTextBox: true });
    }
    await foglio(s, "ccnl-ferie-giorni", 7.75, 1.6, 4.95, FCCNL + " · art. 28 c. 3-4");
    await foglio(s, "ccnl-ferie-estate", 7.75, 3.4, 4.95, "art. 28 c. 12");
    s.addNotes("La guida CISL FP segnala l'equiparazione delle ferie tra neoassunti e personale con più di tre anni. In AOUP l'accordo del 15/04/2026 garantisce già 3 settimane d'estate (punto 2). Le nuove regole sulle ferie valgono dall'1/1/2027.");
  }
  {
    const s = pres.addSlide({ masterName: "CONTENUTO", sectionTitle: S1 });
    kicker(s, "Art. 24 e 35 · orario di lavoro");
    s.addText("Il tempo che prima non contava", { placeholder: "title" });
    numero(s, "10 min", "per vestizione e svestizione, dentro l'orario, se risultano dalle timbrature", M, 1.4, 3.6, { size: 44 });
    numero(s, "15 min", "con il passaggio di consegne, nei reparti h24 · salvo accordi migliori", M + 3.85, 1.4, 3.6, { size: 44, colore: C.accent3 });
    const o = [["12 ore", "al massimo di lavoro continuativo, a qualsiasi titolo"], ["giorno 20", "del mese prima: i turni devono essere pubblicati"],
      ["11 ore", "di riposo: se salta per riunioni o formazione, si recupera subito"], ["10 min", "di pausa dopo sei ore, risultante dalle timbrature"]];
    for (let i = 0; i < o.length; i++) {
      const x = M + (i % 2) * 3.85, y = 3.85 + Math.floor(i / 2) * 1.35;
      card(s, x, y, 3.6, 1.2, C.background2);
      s.addText(o[i][0], { x: x + 0.2, y: y + 0.1, w: 3.2, h: 0.45, fontSize: 20, bold: true, color: C.accent1, margin: 0, isTextBox: true });
      s.addText(o[i][1], { x: x + 0.2, y: y + 0.55, w: 3.2, h: 0.6, fontSize: 13, color: C.text1, margin: 0, valign: "top", isTextBox: true });
    }
    await foglio(s, "ccnl-vestizione", 8.4, 1.6, 4.3, FCCNL + " · art. 24 c. 13-14");
    card(s, 8.35, 4.15, 4.4, 2.3, C.text2);
    s.addText([{ text: "In AOUP si può fare meglio", options: { fontSize: 18, bold: true, color: HEX.accent2, breakLine: true } },
      { text: "il contratto permette di alzare questi minuti con la contrattazione integrativa: è una delle nostre richieste.", options: { fontSize: 14, color: "FFFFFF" } }],
      { x: 8.55, y: 4.25, w: 4.0, h: 2.1, valign: "middle", margin: 0, isTextBox: true });
    s.addNotes("Art. 24 c. 13-14: fino a 10 minuti (vestizione) e fino a 15 minuti (vestizione + consegne) «fatti salvi gli accordi di miglior favore». Verificare con Achille cosa prevede oggi l'accordo aziendale (La Consegna n. 5 parla di fino a 22 minuti a turno). Settimana su 4 giorni solo in strutture che non erogano prestazioni sanitarie.");
  }
  {
    const s = pres.addSlide({ masterName: "CONTENUTO", sectionTitle: S1 });
    kicker(s, "Art. 34 · aggressioni");
    s.addText("Se ti aggrediscono, l'Azienda ti difende", { placeholder: "title" });
    const a = [["FaGavel", "Avvocato pagato", "per tutti i gradi di giudizio, consulenti tecnici compresi"],
      ["FaUserShield", "Parte civile", "l'Azienda può costituirsi accanto a te"],
      ["FaBrain", "Supporto psicologico", "garantito, salvo tua diversa scelta"],
      ["FaHandsHelping", "30 giorni", "di ferie solidali dei colleghi, subito dopo l'aggressione"]];
    for (let i = 0; i < a.length; i++) {
      const y = 1.55 + i * 1.25;
      await tondo(s, a[i][0], M, y, 0.8, i === 0 ? HEX.accent3 : HEX.accent1);
      s.addText(a[i][1], { x: M + 1.0, y: y - 0.02, w: 5.2, h: 0.45, fontSize: 20, bold: true, color: C.text2, margin: 0, isTextBox: true });
      s.addText(a[i][2], { x: M + 1.0, y: y + 0.42, w: 5.2, h: 0.6, fontSize: 14, color: C.text1, margin: 0, valign: "top", isTextBox: true });
    }
    await foglio(s, "ccnl-aggressioni", 6.85, 1.6, 5.85, FCCNL + " · art. 34");
    card(s, 6.8, 4.45, 5.95, 1.6, C.accent2);
    s.addText("Lo abbiamo visto a novembre al Pronto Soccorso di Padova: queste tutele vanno chieste subito. Chiamaci.", { x: 7.05, y: 4.5, w: 5.5, h: 1.5, fontSize: 17, bold: true, color: C.text2, valign: "middle", margin: 0, isTextBox: true });
    s.addNotes("Collegamento con il servizio di Antenna Tre del 23/11 sull'infermiere aggredito al PS e con il punto 8 (benessere). Art. 34 sostituisce l'art. 55 del CCNL 27.10.2025.");
  }
  {
    const s = pres.addSlide({ masterName: "CONTENUTO", sectionTitle: S1 });
    kicker(s, "Art. 25 e 26 · salute");
    s.addText("Permessi per visite e malattie gravi", { placeholder: "title" });
    numero(s, "18 ore", "l'anno per visite, terapie ed esami, viaggio compreso", M, 1.4, 3.8, { size: 52 });
    numero(s, "+10 ore", "per malattie oncologiche o invalidità dal 74%, anche per il genitore di un figlio minorenne", M + 4.0, 1.4, 3.8, { size: 52, colore: C.accent3 });
    numero(s, "24 mesi", "di congedo non retribuito, anche frazionato, per malattie oncologiche o invalidanti", M, 4.05, 3.8, { size: 52 });
    numero(s, "150 ore", "di diritto allo studio, ora anche per tirocini e stage", M + 4.0, 4.05, 3.8, { size: 52 });
    await foglio(s, "ccnl-permessi", 8.55, 1.6, 4.15, FCCNL + " · art. 25 c. 1");
    s.addNotes("Le ore di permesso visite (art. 25) non decurtano l'accessorio se fruite a ore; a giornata sì, come la malattia. Preavviso di 3 giorni, 24 ore se urgente. Congedo di 24 mesi: art. 26 c. 6 (L. 106/2025).");
  }
  {
    const s = pres.addSlide({ masterName: "CONTENUTO", sectionTitle: S1 });
    kicker(s, "Le altre novità");
    s.addText("IA, fondi, disagio, lavoro agile", { placeholder: "title" });
    const n = [["FaRobot", "Intelligenza artificiale", "nessuna decisione sul tuo lavoro presa solo da un algoritmo; hai diritto di sapere come funziona"],
      ["FaCoins", "+221 € a testa nel fondo", "della produttività dal 2027: più soldi per la contrattazione in AOUP"],
      ["FaProcedures", "5 € al giorno", "nelle UO disagiate: sale operatorie, intensive, emergenza, infettive, dialisi"],
      ["FaFileInvoice", "3 € anche agli amministrativi", "di Risorse Umane, Bilancio e Provveditorato"],
      ["FaLaptopHouse", "Lavoro agile per tutti", "anche a tempo determinato e part time, più giorni per chi ha tutele"],
      ["FaUtensils", "Buoni pasto", "da rivedere nel prossimo contratto: intanto la nostra vertenza va avanti"]];
    for (let i = 0; i < n.length; i++) {
      const x = M + (i % 3) * 4.1, y = 1.55 + Math.floor(i / 3) * 2.65;
      card(s, x, y, 3.85, 2.45, i === 5 ? C.accent2 : C.background2);
      await tondo(s, n[i][0], x + 0.22, y + 0.22, 0.65, i === 0 ? HEX.accent3 : HEX.accent1);
      s.addText(n[i][1], { x: x + 0.22, y: y + 1.0, w: 3.4, h: 0.5, fontSize: 18, bold: true, color: C.text2, margin: 0, isTextBox: true, fit: "shrink" });
      s.addText(n[i][2], { x: x + 0.22, y: y + 1.5, w: 3.45, h: 0.85, fontSize: 13, color: C.text1, margin: 0, valign: "top", isTextBox: true });
    }
    s.addNotes("Art. 11-13 IA; art. 40 c. 3 (+221 € pro capite dal 1/1/2027); art. 43 indennità UO disagiate (fascia 1: 5 €, amministrativi RU/Bilancio/Provveditorato: 3 €, OTAA: 1,50 €); art. 44 lavoro agile (esclusi i lavori in turno); dichiarazione congiunta n. 2 su mensa e buoni pasto. DEP dal 2027: permanenza riducibile a 2 anni; 10-40% delle risorse dei DEP dei cessati agli incarichi di base (fino a 3.500 €), prioritariamente medicine e salute mentale.");
  }
  {
    const s = pres.addSlide({ masterName: "DIVISORE", sectionTitle: S1 });
    s.addText("Cosa cambia per te", { placeholder: "title" });
    s.addText("Le cinque cose da portarsi a casa dal punto 1", { placeholder: "body" });
    const cose = ["Arretrati: in media circa 1.250 €", "Infermieri e ostetriche: 181,14 € al mese di indennità", "+130 € di tabellare per i professionisti della salute dal 2027",
      "Dal 2027 le indennità anche in ferie", "Aggressioni: avvocato e psicologo a carico dell'Azienda"];
    for (let i = 0; i < cose.length; i++) {
      const y = 0.75 + i * 1.18;
      card(s, 8.1, y, 4.65, 1.0, i % 2 ? "FFFFFF" : HEX.accent2);
      s.addText(cose[i], { x: 8.35, y, w: 4.25, h: 1.0, fontSize: 16, bold: true, color: HEX.dk2, valign: "middle", margin: 0, isTextBox: true });
    }
    s.addNotes("Riepilogo del punto 1 prima delle domande. Arretrato medio indicato dal volantino CISL FP: circa 1.250 €.");
  }
  await ricostruzione(S1, "25-cedolino", "Quando arrivano gli arretrati", "Il cedolino si controlla.", "Aumenti, indennità, arretrati: se qualcosa non torna, portaci la busta paga. La verifichiamo insieme, voce per voce.", "Chiusura del punto 1.");
  slideDomande(S1, "Il nuovo CCNL Sanità 2025-2027").addNotes("Spazio domande sul punto 1.");

  // ------------------------------------------------ 2 · accordi decentrati
  const S2 = "2 · Accordi decentrati AOUP 2026";
  pres.addSection({ title: S2 });
  {
    const s = pres.addSlide({ masterName: "DIVISORE", sectionTitle: S2 });
    s.addText("02", { x: M, y: 0.7, w: 4, h: 2.2, fontSize: 150, bold: true, color: C.accent2, margin: 0, isTextBox: true });
    s.addText("Accordi decentrati AOUP 2026", { placeholder: "title" });
    s.addText("Cosa abbiamo firmato qui, in Azienda: soldi, regole, impegni", { placeholder: "body" });
    card(s, 9.4, 1.4, 3.3, 4.6, "0B4D28");
    s.addText([{ text: "12", options: { fontSize: 72, bold: true, color: HEX.accent2, breakLine: true } },
      { text: "intese firmate", options: { fontSize: 20, bold: true, color: "FFFFFF", breakLine: true } },
      { text: "da dicembre 2025 a settembre 2026", options: { fontSize: 15, color: "CFE9D8" } }],
      { x: 9.6, y: 1.7, w: 2.9, h: 4, align: "center", valign: "middle", margin: 0, isTextBox: true });
    s.addNotes("Introduzione al punto 2. In un anno abbiamo firmato dodici intese con l'Azienda, tutte pubblicate sul sito aziendale. Le vediamo una per una, con il documento originale sullo schermo.");
  }
  await fotoPiena(S2, "03-trattativa", "Dodici intese. Tutte firmate, tutte verificabili.", "Gli accordi decentrati: cosa abbiamo ottenuto al tavolo con l'Azienda");
  await videoSlide(S2, "02-accordi", "Dodici intese in un anno: cosa abbiamo firmato");
  {
    const s = pres.addSlide({ masterName: "CONTENUTO", sectionTitle: S2 });
    kicker(s, "Un anno di tavolo");
    s.addText("Dodici intese, una linea del tempo", { placeholder: "title" });
    const tappe = [
      ["10/12/25", "DEP 2025", "820.000 € per le progressioni economiche"],
      ["23/12/25", "Dichiarazione congiunta", "3 tavoli permanenti, OSS di notte, pasto"],
      ["27/01/26", "Progettualità 2025", "Trasferimenti, TSRM, ambulatori"],
      ["10/02/26", "Nuova Pediatria", "Mobilità del personale"],
      ["15/04/26", "Progettualità 2026", "Hub, gettoni, ferie estive"],
      ["14/07/26", "Progressioni tra aree", "20 posti a selezione"],
      ["14/07/26", "Integrazione 2026", "+432.674 €, coordinatori, tecnici"],
      ["14/07/26", "Legge regionale 26", "Notte, pronta disponibilità, welfare"],
      ["08/09/26", "Part time", "135 posti per quattro anni"],
      ["08/09/26", "Ferie solidali", "Cedere ferie a chi assiste un figlio"],
      ["25/09/26", "Lavoro agile", "Nuovo regolamento"],
      ["25/09/26", "DEP 2026", "620.000 € per le progressioni"],
    ];
    const y0 = 3.55, x0 = M + 0.1, passo = (W - 2 * M - 0.2) / (tappe.length - 1);
    s.addShape(pres.shapes.LINE, { x: x0, y: y0, w: passo * (tappe.length - 1), h: 0, line: { color: HEX.accent1, width: 3 } });
    for (let i = 0; i < tappe.length; i++) {
      const x = x0 + i * passo, sopra = i % 2 === 0;
      s.addShape(pres.shapes.OVAL, { x: x - 0.13, y: y0 - 0.13, w: 0.26, h: 0.26,
        fill: { color: i === 4 || i === 6 ? HEX.accent3 : HEX.accent2 }, line: { color: HEX.dk2, width: 2 } });
      const by = sopra ? 1.55 : 3.85;
      s.addText([{ text: tappe[i][0], options: { fontSize: 12, bold: true, color: HEX.accent1, breakLine: true } },
        { text: tappe[i][1], options: { fontSize: 15, bold: true, color: HEX.dk2, breakLine: true } },
        { text: tappe[i][2], options: { fontSize: 12, color: HEX.dk1 } }],
        { x: Math.min(x - 0.75, W - M - 1.4), y: by, w: 1.5, h: 1.75, align: "center", valign: sopra ? "bottom" : "top", margin: 0, isTextBox: true });
    }
    s.addNotes("Le dodici intese in ordine di data, tutte scaricabili da www.aopd.veneto.it/art,424. In rosso le due più pesanti per i soldi: progettualità 2026 e integrazione di luglio.");
  }
  {
    const s = pres.addSlide({ masterName: "SCURO", sectionTitle: S2 });
    kicker(s, "Una sola verità: quella verificabile", HEX.accent2);
    s.addText("Ogni accordo è pubblico. Controllatelo voi.", { placeholder: "title" });
    s.addText([{ text: "Non vi chiediamo di credere alla nostra versione.", options: { fontSize: 26, bold: true, color: "FFFFFF", breakLine: true } },
      { text: " ", options: { fontSize: 10, breakLine: true } },
      { text: "Tutti gli accordi del comparto sono sul sito dell'Azienda, con il testo completo e le firme di chi li ha sottoscritti. In ogni frontespizio di questa presentazione trovate il QR e il link al documento originale.", options: { fontSize: 19, color: "CFE9D8", breakLine: true } },
      { text: " ", options: { fontSize: 10, breakLine: true } },
      { text: "www.aopd.veneto.it/art,424", options: { fontSize: 22, bold: true, color: HEX.accent2, hyperlink: { url: LINK.pagina, tooltip: "Accordi sottoscritti - Comparto" } } }],
      { x: M, y: 1.7, w: 7.4, h: 4.6, valign: "middle", margin: 0, isTextBox: true });
    card(s, 8.75, 1.6, 4.0, 4.6, "FFFFFF", { ombra: true });
    s.addImage({ path: path.join(QUI, "qr", "acc-pagina.png"), x: 9.15, y: 1.85, w: 3.2, h: 3.2, altText: "QR della pagina degli accordi sottoscritti sul sito AOUP" });
    s.addText("Inquadra: tutti gli accordi firmati", { x: 8.85, y: 5.15, w: 3.8, h: 0.9, fontSize: 15, bold: true, color: HEX.dk2, align: "center", valign: "middle", margin: 0, isTextBox: true });
    s.addShape(pres.shapes.RECTANGLE, { x: 8.75, y: 1.6, w: 4.0, h: 4.6, fill: { color: "FFFFFF", transparency: 100 }, line: { type: "none" }, hyperlink: { url: LINK.pagina, tooltip: "Apri la pagina degli accordi" } });
    s.addNotes("Pagina ufficiale AOUP «Accordi sottoscritti» del comparto. I file pubblicati sono identici, byte per byte, a quelli mostrati in questa presentazione (verificato il 25/11/2026). Messaggio: noi raccontiamo una sola verità, quella che chiunque può controllare.");
  }
  {
    const s = pres.addSlide({ masterName: "SCURO", sectionTitle: S2 });
    kicker(s, "Da dove vengono i soldi", HEX.accent2);
    s.addText("Due fondi contrattuali, una cassa regionale", { placeholder: "title" });
    const box = [
      ["FaLayerGroup", "15,5 mln €", "Fondo incarichi, progressioni e indennità professionali", "Art. 63 CCNL 2022-2024 · anno 2025", HEX.accent1],
      ["FaCoins", "19,6 mln €", "Fondo premialità e condizioni di lavoro", "Art. 64 CCNL 2022-2024 · anno 2025", HEX.accent1],
      ["FaPlusCircle", "+3,15 mln €", "Legge regionale 26/2024", "Welfare 1.548.750 € + contrattazione 1.599.816 €", HEX.accent3],
    ];
    for (let i = 0; i < 3; i++) {
      const x = M + i * 4.1, y = 1.7;
      card(s, x, y, 3.85, 4.3, i === 2 ? "3A0A10" : "13301F", { bordo: i === 2 ? "E2001A" : "1F4A31" });
      await tondo(s, box[i][0], x + 0.3, y + 0.3, 0.8, box[i][4]);
      s.addText(box[i][1], { x: x + 0.3, y: y + 1.3, w: 3.3, h: 0.9, fontSize: 44, bold: true, color: HEX.accent2, margin: 0, isTextBox: true });
      s.addText(box[i][2], { x: x + 0.3, y: y + 2.3, w: 3.3, h: 1.0, fontSize: 18, bold: true, color: "FFFFFF", margin: 0, valign: "top", isTextBox: true });
      s.addText(box[i][3], { x: x + 0.3, y: y + 3.35, w: 3.3, h: 0.8, fontSize: 13, color: "B9D3C3", margin: 0, valign: "top", isTextBox: true });
    }
    s.addText("Quello che non si spende in un anno non si perde: torna sul tavolo come «residuo» e lo ridistribuiamo con gli accordi.",
      { x: M, y: 6.25, w: W - 2 * M, h: 0.5, fontSize: 16, italic: true, color: "CFE9D8", margin: 0, isTextBox: true });
    s.addNotes("Fondi 2025 compresi gli incrementi del CCNL 2022-2024 (allegato 1 dell'accordo del 15/04/2026): 15.545.763 € e 19.648.456 €. La L.R. 26/2024 aggiunge 3.148.566 € (DGRV 1010/2025).");
  }
  await frontespizio("04", S2);
  {
    const s = pres.addSlide({ masterName: "CONTENUTO", sectionTitle: S2 });
    kicker(s, "Premialità 2025 · pagata a novembre");
    s.addText("4,29 milioni di conguaglio della produttività", { placeholder: "title" });
    numero(s, "4.286.894 €", "a conguaglio della premialità 2025, in un'unica soluzione dopo l'OIV", M, 1.55, 5.4, { size: 48 });
    card(s, M, 3.75, 5.4, 2.6, C.background2);
    testo(s, [
      { text: "2.686.894 € ", options: { bold: true, color: HEX.accent1 } },
      { text: "residuo del fondo premialità 2025", options: { breakLine: true } },
      { text: "+ 1.600.000 € ", options: { bold: true, color: HEX.accent1 } },
      { text: "dal fondo incarichi 2024: soldi che abbiamo spostato sulla produttività", options: { breakLine: true } },
      { text: "Stessi criteri degli anni scorsi (CCI 2005), divisi per ex categoria.", options: { italic: true } },
    ], M + 0.3, 3.95, 4.8, 2.3, { fontSize: 16 });
    await foglio(s, "premialita-4mln", 6.5, 1.65, 6.2, "Accordo progettualità 2026 · 15/04/2026 · pag. 3");
    await foglio(s, "progettualita-1mln", 6.5, 4.25, 6.2, null);
    s.addNotes("Il conguaglio è arrivato con lo stipendio di novembre. Le quote medie per area sono nella mail del 18/11 (es. ADA ex C 840 € medi a conguaglio).");
  }
  await frontespizio("18", S2);
  await frontespizio("14", S2);
  {
    const s = pres.addSlide({ masterName: "CONTENUTO", sectionTitle: S2 });
    kicker(s, "Differenziali economici di professionalità · accordo 10/12/2025");
    s.addText("DEP 2025: 820.000 € di progressioni", { placeholder: "title" });
    const req = [
      ["FaCalendarCheck", "3 anni", "di anzianità e nessuna progressione nel 2022-2024"],
      ["FaUserClock", "max 365", "giorni di assenza nel triennio (maternità, malattia, infortunio non contano)"],
      ["FaRobot", "d'ufficio", "nessuna domanda: si partecipa in automatico"],
    ];
    for (let i = 0; i < 3; i++) {
      const y = 1.6 + i * 1.3;
      await tondo(s, req[i][0], M, y, 0.75, HEX.accent1);
      s.addText(req[i][1], { x: M + 0.95, y: y - 0.05, w: 4.3, h: 0.45, fontSize: 24, bold: true, color: C.text2, margin: 0, isTextBox: true });
      s.addText(req[i][2], { x: M + 0.95, y: y + 0.42, w: 4.3, h: 0.7, fontSize: 14, color: C.text1, margin: 0, valign: "top", isTextBox: true });
    }
    card(s, M, 5.55, 5.3, 1.1, C.accent2);
    s.addText([{ text: "Punteggio su 100:  ", options: { bold: true } }, { text: "60 valutazione (DIV)  +  40 esperienza", options: {} }],
      { x: M + 0.25, y: 5.6, w: 4.9, h: 1.0, fontSize: 17, color: C.text2, valign: "middle", margin: 0, isTextBox: true });
    await foglio(s, "dep-820mila", 6.4, 1.6, 6.3, "Preintesa DEP 2025 · 10/12/2025 · pag. 3");
    await foglio(s, "dep-punteggio", 6.4, 4.2, 6.3, "pag. 5");
    s.addNotes("DEP 2025, decorrenza 1/1/2025. Il 10% delle risorse è riservato a chi ha almeno 10 anni senza progressioni o 20 anni con al massimo 2 progressioni. Ricorsi entro 30 giorni dalla pubblicazione delle graduatorie.");
  }
  {
    const s = pres.addSlide({ masterName: "CONTENUTO", sectionTitle: S2 });
    kicker(s, "DEP 2025 · la clausola che abbiamo voluto");
    s.addText("Il 10% è riservato a chi aspetta da più tempo", { placeholder: "title" });
    const r = await foglio(s, "dep-priorita", M + 0.1, 1.75, 7.0, "Preintesa DEP 2025 · 10/12/2025 · pag. 8");
    card(s, 8.2, 1.6, 4.5, 2.1, C.background2);
    s.addText([{ text: "10 anni", options: { fontSize: 36, bold: true, color: HEX.accent1, breakLine: true } },
      { text: "senza nessuna progressione economica", options: { fontSize: 16 } }],
      { x: 8.45, y: 1.75, w: 4.0, h: 1.8, margin: 0, valign: "middle", color: C.text1, isTextBox: true });
    card(s, 8.2, 3.95, 4.5, 2.1, C.background2);
    s.addText([{ text: "20 anni", options: { fontSize: 36, bold: true, color: HEX.accent1, breakLine: true } },
      { text: "con al massimo due progressioni", options: { fontSize: 16 } }],
      { x: 8.45, y: 4.1, w: 4.0, h: 1.8, margin: 0, valign: "middle", color: C.text1, isTextBox: true });
    s.addNotes("Messaggio: nessuno resta indietro per sempre. Chi è fermo da 10 o 20 anni ha una corsia dedicata.");
  }
  await frontespizio("09", S2);
  {
    const s = pres.addSlide({ masterName: "CONTENUTO", sectionTitle: S2 });
    kicker(s, "Progettualità 2026 · accordi del 15/04 e del 14/07");
    s.addText("Dove vanno i soldi delle progettualità 2026", { placeholder: "title" });
    const voci = [
      ["Specificità assistenziali Hub", 500000], ["Strategica tecnici/amministrativi", 350000],
      ["Gettoni e pacchetti estivi", 265000], ["Personale tecnico sanitario", 115000],
      ["Trasferimento Pediatria", 72000], ["Coordinatori", 53000], ["Assistenza H24", 50000],
      ["Turni ruolo tecnico", 45000], ["Altri trasferimenti", 40000], ["Tutor corsi di laurea", 30000],
      ["TSRM e OSS in Pronto Soccorso", 25000], ["Trasporto neonatale", 20000], ["Dialisi (quota 2025)", 20000],
    ].reverse();
    s.addChart(pres.charts.BAR, [{ name: "Euro", labels: voci.map(v => v[0]), values: voci.map(v => v[1]) }], {
      x: M, y: 1.45, w: 8.2, h: 5.4, barDir: "bar", chartColors: [HEX.accent1],
      showValue: true, dataLabelPosition: "outEnd", dataLabelFormatCode: '#,##0 "€"',
      dataLabelFontSize: 11, dataLabelColor: HEX.dk1, dataLabelFontFace: "+mn-lt",
      catAxisLabelFontSize: 12, catAxisLabelColor: HEX.dk1, catAxisLabelFontFace: "+mn-lt",
      valAxisHidden: true, valGridLine: { style: "none" }, catGridLine: { style: "none" },
      showLegend: false, showTitle: false, barGapWidthPct: 45,
    });
    card(s, 9.2, 1.6, 3.5, 2.35, C.text2);
    s.addText([{ text: "1.772.674 €", options: { fontSize: 32, bold: true, color: HEX.accent2, breakLine: true } },
      { text: "per progetti nel 2026", options: { fontSize: 16, color: "FFFFFF" } }],
      { x: 9.4, y: 1.75, w: 3.1, h: 2.05, margin: 0, valign: "middle", isTextBox: true });
    testo(s, [
      { text: "1.040.000 € ", options: { bold: true } }, { text: "dai residui 2025", options: { breakLine: true } },
      { text: "+ 300.000 € ", options: { bold: true } }, { text: "«fondino» direzionale", options: { breakLine: true } },
      { text: "+ 432.674 € ", options: { bold: true } }, { text: "integrazione di luglio", options: {} },
    ], 9.25, 4.2, 3.45, 2.2, { fontSize: 15 });
    s.addNotes("Somma delle voci: 1.165.000 € (15/04) + 400.000 € (14/07) + 20.000 € dialisi 2025. Fonti: allegato 2 degli accordi del 15/04/2026 e del 14/07/2026.");
  }

  {
    const s = pres.addSlide({ masterName: "CONTENUTO", sectionTitle: S2 });
    kicker(s, "Progettualità 2026 · i tempi di pagamento");
    s.addText("Quando arrivano i soldi", { placeholder: "title" });
    const r = [["Specificità Hub", "ogni mese · chiusura a marzo 2027", "risorse insufficienti", HEX.accent3],
      ["Pacchetti estivi", "ogni mese", "", HEX.accent1],
      ["Gettoni emergenza", "ogni tre mesi · chiusura a maggio 2027", "residuo stimato 32.000 €", HEX.accent1],
      ["H24, tecnici e amministrativi, Pediatria, coordinatori, tecnici sanitari, PS, turni tecnici, tutor, neonatale", "primi mesi del 2027", "", HEX.dk2],
      ["Dialisi (quota 2025)", "ottobre 2026", "pagata", HEX.accent6]];
    for (let i = 0; i < r.length; i++) {
      const y = 1.55 + i * 1.02;
      card(s, M, y, 6.9, 0.88, i === 0 ? "FFF1F2" : C.background2);
      s.addShape(pres.shapes.OVAL, { x: M + 0.18, y: y + 0.3, w: 0.28, h: 0.28, fill: { color: r[i][3] }, line: { type: "none" } });
      s.addText(r[i][0], { x: M + 0.6, y: y + 0.04, w: 3.3, h: 0.8, fontSize: i === 3 ? 12 : 15, bold: true, color: C.text2, valign: "middle", margin: 0, isTextBox: true });
      s.addText([{ text: r[i][1], options: { bold: true, breakLine: !!r[i][2] } }, ...(r[i][2] ? [{ text: r[i][2], options: { color: i === 0 ? HEX.accent3 : HEX.accent1, bold: true } }] : [])],
        { x: M + 4.0, y: y + 0.04, w: 2.8, h: 0.8, fontSize: 13, color: C.text1, valign: "middle", margin: 0, isTextBox: true });
    }
    await fotoTavolo(s, "progettualita-pagamenti", 7.95, 1.6, 4.75, TAVOLO);
    card(s, 7.85, 5.4, 4.95, 1.15, C.accent2);
    s.addText("Sulla quota Hub l'Azienda stessa prevede che i 500.000 € non bastino: chiediamo l'integrazione.",
      { x: 8.05, y: 5.43, w: 4.55, h: 1.1, fontSize: 15, bold: true, color: C.text2, valign: "middle", margin: 0, isTextBox: true });
    s.addNotes("Dalla slide «Risorse disponibili» dell'Azienda: importo destinato a progettualità 2026 1.597.676,60 €. Stime di residuo: gettoni 32.000 €, altre voci 10.000 € e 5.612,69 € (la foto non permette di attribuirle con certezza: verificare). La frase sull'integrazione della quota Hub è una proposta: confermarla con Achille.");
  }
  {
    const s = pres.addSlide({ masterName: "CONTENUTO", sectionTitle: S2 });
    kicker(s, "Specificità assistenziali Hub");
    s.addText("Qualche euro in più per ogni giorno di fatica", { placeholder: "title" });
    const q = [["4,00 €", "al giorno", "reparti ad alta complessità: semintensive, trapianti, stroke, endoscopie, piastre angiografiche"],
      ["2,50 €", "al giorno", "aree di degenza accanto alle semintensive"],
      ["7,00 €", "al giorno", "tecnici di radiologia, infermieri e OSS di Radiologia che lavorano stabilmente in Pronto Soccorso"]];
    for (let i = 0; i < 3; i++) {
      const y = 1.6 + i * 1.65;
      card(s, M, y, 5.4, 1.45, i === 2 ? C.accent2 : C.background2);
      s.addText(q[i][0], { x: M + 0.25, y: y + 0.12, w: 1.9, h: 0.75, fontSize: 34, bold: true, color: C.text2, margin: 0, isTextBox: true });
      s.addText(q[i][1], { x: M + 0.25, y: y + 0.85, w: 1.9, h: 0.4, fontSize: 13, color: C.text2, margin: 0, isTextBox: true });
      s.addText(q[i][2], { x: M + 2.2, y: y + 0.12, w: 3.05, h: 1.2, fontSize: 14, color: C.text1, valign: "middle", margin: 0, isTextBox: true });
    }
    await foglio(s, "hub-4euro", 6.45, 1.6, 6.25, "Accordo progettualità 2026 · 15/04/2026 · pag. 4", { maxH: 2.75 });
    await foglio(s, "integr-radiologia-ps", 6.65, 4.95, 5.85, "Integrazione progettualità 2026 · 14/07/2026 · pag. 3");
    s.addNotes("500.000 € stanziati. Pagamento mensile, due mesi dopo il mese di riferimento. Il passaggio da 4 a 7 € per la Radiologia in PS è dell'accordo del 14/07: lavoro sovrapponibile a chi prende l'indennità di PS.");
  }
  {
    const s = pres.addSlide({ masterName: "CONTENUTO", sectionTitle: S2 });
    kicker(s, "Gettoni emergenza e pacchetti estivi · 265.000 €");
    s.addText("Chi copre un buco viene pagato", { placeholder: "title" });
    const t = [["", "Infermieri e professionisti sanitari", "OSS"],
      ["Pacchetto estivo · mattina/pomeriggio", "70 €", "60 €"],
      ["Pacchetto estivo · notte", "120 €", "100 €"],
      ["Gettone emergenza · qualsiasi turno", "70 €", "60 €"]];
    s.addTable(t.map((r, i) => r.map((c, j) => ({ text: c, options: {
      bold: i === 0 || j > 0, fontSize: i === 0 ? 13 : (j > 0 ? 26 : 15),
      color: i === 0 ? "FFFFFF" : (j > 0 ? HEX.dk2 : HEX.dk1),
      fill: { color: i === 0 ? HEX.dk2 : (j > 0 ? "FFF4B8" : (i % 2 ? "FFFFFF" : HEX.lt2)) },
      align: j > 0 ? "center" : "left", valign: "middle" } }))),
      { x: M, y: 1.65, w: 6.6, colW: [3.0, 2.0, 1.6], rowH: [0.7, 0.85, 0.85, 0.85], border: { type: "solid", color: "D9EADD", pt: 1 }, margin: 0.1 });
    testo(s, [
      { text: "Pacchetto estivo: ", options: { bold: true } }, { text: "dal 1° giugno al 30 settembre", options: { breakLine: true } },
      { text: "Gettone: ", options: { bold: true } }, { text: "rientri e turni aggiuntivi per assenze improvvise", options: { breakLine: true } },
      { text: "Turno minimo 6 ore ", options: { bold: true } }, { text: "(4 solo se validato), una quota al giorno, più l'accessorio normale", options: {} },
    ], M, 5.35, 6.6, 1.4, { fontSize: 14 });
    await foglio(s, "gettoni-tabella", 7.6, 1.65, 5.1, "Accordo progettualità 2026 · 15/04/2026 · pag. 5");
    s.addNotes("Stessi importi del 2025. Stanziamento 265.000 €, integrabile in corso d'anno se serve.");
  }
  {
    const s = pres.addSlide({ masterName: "SCURO", sectionTitle: S2 });
    kicker(s, "Ferie estive · accordo 15/04/2026", HEX.accent2);
    s.addText("Tre settimane d'estate, scritte nero su bianco", { placeholder: "title" });
    card(s, M, 1.6, 3.8, 2.75, "13301F", { bordo: "1F4A31" });
    s.addText([{ text: "15", options: { fontSize: 66, bold: true, color: "FFFFFF", breakLine: true } },
      { text: "giorni lavorativi consecutivi", options: { fontSize: 16, bold: true, color: "FFFFFF", breakLine: true } },
      { text: "il minimo del CCNL (art. 35 c. 12)", options: { fontSize: 13, color: "B9D3C3" } }],
      { x: M + 0.25, y: 1.7, w: 3.3, h: 2.55, align: "center", valign: "middle", margin: 0, isTextBox: true });
    s.addImage({ data: await icona("FaArrowRight", HEX.accent2), x: M + 3.95, y: 2.7, w: 0.55, h: 0.55, altText: "freccia" });
    card(s, M + 4.65, 1.6, 3.8, 2.75, HEX.accent2, { ombra: true });
    s.addText([{ text: "3", options: { fontSize: 66, bold: true, color: HEX.dk2, breakLine: true } },
      { text: "settimane, di cui 2 consecutive", options: { fontSize: 16, bold: true, color: HEX.dk2, breakLine: true } },
      { text: "garantite in AOUP, anche su 6 giorni", options: { fontSize: 13, color: HEX.dk2 } }],
      { x: M + 4.9, y: 1.7, w: 3.3, h: 2.55, align: "center", valign: "middle", margin: 0, isTextBox: true });
    card(s, 9.35, 1.6, 3.38, 2.75, "3A0A10", { bordo: "E2001A" });
    await tondo(s, "FaStopwatch", 9.6, 1.8, 0.7, HEX.accent3);
    testo(s, [{ text: "48 ore", options: { fontSize: 30, bold: true, color: HEX.accent2, breakLine: true } },
      { text: "se il piano ferie crea problemi, le parti si riconvocano su richiesta del sindacato", options: { fontSize: 14, color: "FFFFFF" } }],
      9.6, 2.6, 2.95, 1.7);
    await foglio(s, "ferie-3settimane", M + 0.08, 4.75, W - 2 * M - 0.16, "Accordo progettualità 2026 · 15/04/2026 · pag. 7", { scuro: true, maxH: 1.75, centra: W / 2 });
    s.addNotes("Le ferie si contano in giorni lavorativi, senza festivi e riposi compensativi (parere ARAN).");
  }
  await frontespizio("01", S2);
  {
    const s = pres.addSlide({ masterName: "CONTENUTO", sectionTitle: S2 });
    kicker(s, "Quote premiali 2026 · chi prende cosa");
    s.addText("Le quote, categoria per categoria", { placeholder: "title" });
    const q = [
      ["FaUserTie", "500 €", "Coordinatori", "incarico di funzione organizzativa"],
      ["FaMicroscope", "300 €", "Personale tecnico sanitario", "TSRM, TSLB, neurofisiopatologia, dietisti…"],
      ["FaTruckMoving", "400 · 300 · 200 €", "Trasferimenti di sede", "coordinatore · 10% più coinvolto · resto"],
      ["FaTint", "200 €", "Dialisi", "quota 2025, Nefrologia 2"],
      ["FaBroom", "3 € al giorno", "Ausiliari e OTAA", "servizi disagiati (art. 68 c. 2)"],
      ["FaClock", "30 € l'ora", "Assistenza continuativa H24", "NPI, psichiatria fuori SPDC, medicina protetta"],
      ["FaBaby", "80 € a uscita", "Trasporto neonatale", "infermieri, ogni uscita dall'Azienda"],
      ["FaChalkboardTeacher", "quota annua", "Tutor didattici", "fino ai nuovi incarichi: bandi entro novembre 2026"],
    ];
    const cw = 2.9, ch = 2.45;
    for (let i = 0; i < q.length; i++) {
      const col = i % 4, row = Math.floor(i / 4);
      const x = M + col * (cw + 0.2), y = 1.55 + row * (ch + 0.2);
      card(s, x, y, cw, ch, C.background2);
      await tondo(s, q[i][0], x + 0.2, y + 0.2, 0.62, i < 2 ? HEX.accent3 : HEX.accent1);
      s.addText(q[i][1], { x: x + 0.2, y: y + 0.95, w: cw - 0.4, h: 0.5, fontSize: 22, bold: true, color: C.text2, margin: 0, isTextBox: true, fit: "shrink" });
      s.addText(q[i][2], { x: x + 0.2, y: y + 1.45, w: cw - 0.4, h: 0.4, fontSize: 15, bold: true, color: C.accent1, margin: 0, isTextBox: true });
      s.addText(q[i][3], { x: x + 0.2, y: y + 1.82, w: cw - 0.4, h: 0.55, fontSize: 12, color: C.text1, margin: 0, valign: "top", isTextBox: true });
    }
    s.addNotes("Tutte le quote annuali sono proporzionate alla presenza: 100% sopra il 60% dei giorni, 70% tra 40 e 60, 40% tra 20 e 40, nulla sotto il 20%. Coordinatori e tecnici sanitari: accordo 14/07/2026. In rosso le due novità di luglio.");
  }
  await frontespizio("10", S2);
  {
    const s = pres.addSlide({ masterName: "CONTENUTO", sectionTitle: S2 });
    kicker(s, "Legge regionale 26/2024 · preintesa 14/07/2026");
    s.addText("Notti e reperibilità pagano di più", { placeholder: "title" });
    numero(s, "+0,50 €/h", "di premialità sul turno di notte (22-6): da 4,00 a 4,50 € l'ora", M, 1.5, 3.5, { size: 40 });
    numero(s, "27,60 €", "per ogni turno pieno di pronta disponibilità di 12 ore (prima 21,60 €)", M + 3.75, 1.5, 3.5, { size: 40 });
    card(s, M, 3.65, 7.25, 2.85, C.background2);
    s.addText("Aree complesse · quota massima annua", { x: M + 0.3, y: 3.8, w: 6.7, h: 0.4, fontSize: 15, bold: true, color: C.accent1, margin: 0, isTextBox: true });
    const aree = [["650 €", "Degenze mediche, chirurgiche e pediatriche"], ["400 €", "Degenze con indennità CCNL o quota Hub"], ["400 €", "Terapie intensive e piastra ostetrica"]];
    for (let i = 0; i < 3; i++) {
      const x = M + 0.3 + i * 2.3;
      s.addText(aree[i][0], { x, y: 4.3, w: 2.2, h: 0.75, fontSize: 36, bold: true, color: C.text2, margin: 0, isTextBox: true });
      s.addText(aree[i][1], { x, y: 5.05, w: 2.1, h: 1.2, fontSize: 13, color: C.text1, margin: 0, valign: "top", isTextBox: true });
    }
    await foglio(s, "lr26-pronta-disp", 8.25, 1.55, 4.45, "Preintesa L.R. 26 · 14/07/2026 · pag. 5");
    await foglio(s, "lr26-aree", 8.25, 3.4, 4.45, "pag. 7", { maxH: 3.0, centra: 10.475 });
    s.addNotes("Solo ruoli sanitario e sociosanitario. Previsione 2026: circa 570.000 € turni, circa 1.030.000 € aree complesse, in attesa dell'assegnazione regionale definitiva. Ruolo tecnico: +0,50 €/h su notte e pronta disponibilità con l'integrazione del 14/07 (45.000 €).");
  }
  await frontespizio("08", S2);
  {
    const s = pres.addSlide({ masterName: "CONTENUTO", sectionTitle: S2 });
    kicker(s, "Progressioni tra aree · regolamento 14/07/2026");
    s.addText("20 posti per salire di area, senza concorso", { placeholder: "title" });
    const p = [["Coll. amministrativo prof.", 10], ["Coadiutore amm. senior", 2], ["Operatore tecn. specializzato", 2],
      ["Assistente amministrativo", 2], ["Coll. tecnico prof.", 2], ["Assistente informatico", 1], ["Assistente tecnico", 1]];
    for (let i = 0; i < p.length; i++) {
      const y = 1.6 + i * 0.62;
      s.addText(String(p[i][1]), { x: M, y, w: 0.8, h: 0.52, fontSize: 26, bold: true, color: C.accent1, align: "right", margin: 0, isTextBox: true });
      s.addText(p[i][0], { x: M + 1.0, y, w: 4.2, h: 0.52, fontSize: 16, color: C.text1, valign: "middle", margin: 0, isTextBox: true });
    }
    card(s, M, 6.0, 5.2, 0.8, C.accent2);
    s.addText("Prove 60 punti + titoli 40 · requisiti in deroga fino al 31/12/2026", { x: M + 0.2, y: 6.0, w: 4.9, h: 0.8, fontSize: 14, bold: true, color: C.text2, valign: "middle", margin: 0, isTextBox: true });
    await foglio(s, "progressioni-20posti", 6.3, 1.6, 6.4, "Regolamento progressioni tra aree · 14/07/2026 · pag. 15", { maxH: 4.9 });
    s.addNotes("Requisiti in prima applicazione: titolo dell'area superiore + 5 anni nel profilo, oppure titolo dell'area di appartenenza + 10 anni. Chi vince è esonerato dal periodo di prova. Collegamento con La Consegna n. 2 (8 dicembre).");
  }
  await frontespizio("12", S2);
  {
    const s = pres.addSlide({ masterName: "CONTENUTO", sectionTitle: S2 });
    kicker(s, "Part time · accordo 08/09/2026");
    s.addText("135 posti a part time per quattro anni", { placeholder: "title" });
    numero(s, "135", "posti a bando nel 2026, per quattro anni", M, 1.45, 3.5, { size: 80, hBig: 1.4 });
    const r = [["76", "infermieri"], ["19", "OSS e OTAA"], ["40", "altri profili sanitari, tecnici e amministrativi"]];
    for (let i = 0; i < 3; i++) {
      const y = 3.65 + i * 0.75;
      s.addText(r[i][0], { x: M, y, w: 1.0, h: 0.6, fontSize: 28, bold: true, color: C.accent1, margin: 0, isTextBox: true });
      s.addText(r[i][1], { x: M + 1.1, y, w: 4.2, h: 0.6, fontSize: 16, valign: "middle", color: C.text1, margin: 0, isTextBox: true });
    }
    card(s, 6.1, 1.6, 6.6, 2.0, C.text2);
    s.addText([{ text: "Le date da segnare", options: { bold: true, color: HEX.accent2, fontSize: 16, breakLine: true } },
      { text: "Bando entro fine 2026 · graduatorie entro marzo 2027", options: { color: "FFFFFF", fontSize: 18, bold: true, breakLine: true } },
      { text: "Poi +20 posti l'anno, come impegno dell'Azienda", options: { color: "CFE9D8", fontSize: 15 } }],
      { x: 6.35, y: 1.7, w: 6.1, h: 1.8, valign: "middle", margin: 0, isTextBox: true });
    await foglio(s, "parttime-bando", 6.2, 4.0, 6.4, "Accordo part time · 08/09/2026 · pag. 4");
    s.addNotes("Possono partecipare i dipendenti a tempo indeterminato con almeno un anno nel SSN, anche chi ha un part time in scadenza entro il 30/4/2028. Chi ha un incarico di media o elevata complessità deve rinunciarvi se vince. Collegamento con La Consegna n. 3 (15 dicembre).");
  }
  await frontespizio("11", S2);
  await frontespizio("13", S2);
  {
    const s = pres.addSlide({ masterName: "CONTENUTO", sectionTitle: S2 });
    kicker(s, "Lavoro agile · regolamento 25/09/2026");
    s.addText("Lavoro agile: le regole nuove", { placeholder: "title" });
    const a = [["FaLaptopHouse", "8 giorni", "al mese al massimo, di norma non più di 2 a settimana"],
      ["FaPhoneAlt", "9-13 · 14-17", "fascia in cui essere contattabili"],
      ["FaPowerOff", "20:00-8:00", "diritto alla disconnessione"],
      ["FaHandHoldingHeart", "Deroghe", "per fragilità, 104, gravidanza, genitorialità, cure salvavita"]];
    for (let i = 0; i < 4; i++) {
      const x = M + (i % 2) * 3.0, y = 1.6 + Math.floor(i / 2) * 2.55;
      card(s, x, y, 2.8, 2.35, i === 2 ? C.accent2 : C.background2);
      await tondo(s, a[i][0], x + 0.2, y + 0.2, 0.62, HEX.accent1);
      s.addText(a[i][1], { x: x + 0.2, y: y + 0.95, w: 2.4, h: 0.5, fontSize: 22, bold: true, color: C.text2, margin: 0, isTextBox: true, fit: "shrink" });
      s.addText(a[i][2], { x: x + 0.2, y: y + 1.45, w: 2.4, h: 0.8, fontSize: 13, color: C.text1, margin: 0, valign: "top", isTextBox: true });
    }
    await foglio(s, "agile-8giorni", 6.85, 1.6, 5.85, "Regolamento lavoro agile · 25/09/2026");
    await foglio(s, "agile-disconnessione", 6.85, 4.25, 5.85, null);
    s.addNotes("Il lavoro agile parte da un progetto della struttura: il dirigente raccoglie le domande e seleziona. Priorità a genitori di figli fino a 12 anni, disabilità, caregiver.");
  }
  await frontespizio("19", S2);
  {
    const s = pres.addSlide({ masterName: "CONTENUTO", sectionTitle: S2 });
    kicker(s, "Dichiarazione congiunta · 23/12/2025");
    s.addText("Gli impegni che l'Azienda ha messo per iscritto", { placeholder: "title" });
    const imp = [
      ["FaUsers", "Tavolo permanente sul personale", "ogni due mesi: assunzioni, cessazioni, piano assunzioni"],
      ["FaProjectDiagram", "Tavolo permanente sulle riorganizzazioni", "ogni riorganizzazione diventa un progetto con fasi e verifiche"],
      ["FaSmile", "Tavolo permanente sul benessere organizzativo", "con l'Organismo di Promozione e Innovazione"],
      ["FaMoon", "OSS nel turno di notte delle Chirurgie", "cronoprogramma in 12-18 mesi: la sperimentazione H24 è partita"],
      ["FaUtensils", "Pasto nel turno di notte e festivo", "sperimentazione in due unità operative"],
      ["FaIdBadge", "Job description e mappatura delle competenze", "per valorizzare chi ha master e competenze avanzate"],
    ];
    for (let i = 0; i < imp.length; i++) {
      const col = i % 2, row = Math.floor(i / 2);
      const x = M + col * 3.55, y = 1.55 + row * 1.7;
      await tondo(s, imp[i][0], x, y, 0.7, i === 3 ? HEX.accent3 : HEX.accent1);
      s.addText(imp[i][1], { x: x + 0.85, y: y - 0.05, w: 2.6, h: 0.75, fontSize: 15, bold: true, color: C.text2, margin: 0, valign: "top", isTextBox: true });
      s.addText(imp[i][2], { x: x + 0.85, y: y + 0.7, w: 2.6, h: 0.85, fontSize: 12, color: C.text1, margin: 0, valign: "top", isTextBox: true });
    }
    await foglio(s, "oss-notte", 7.9, 1.6, 4.8, "Dichiarazione congiunta · 23/12/2025 · pag. 3");
    await foglio(s, "pasto-notte", 7.9, 3.7, 4.8, "pag. 4", { maxH: 2.65 });
    s.addNotes("La dichiarazione del 23/12/2025 è la base di quello che è arrivato a novembre: sperimentazione OSS H24 nelle Chirurgie. Collegamenti con i punti 7 (andamenti occupazionali) e 8 (retention e benessere). Pediatria: chi è stato assegnato d'ufficio alla nuova Pediatria ha la promessa di spostamento, auspicabilmente entro il 2026 (dichiarazione 10/02/2026).");
  }
  await frontespizio("03", S2);
  {
    const s = pres.addSlide({ masterName: "DIVISORE", sectionTitle: S2 });
    s.addText("Cosa cambia per te", { placeholder: "title" });
    s.addText("Le cinque cose da portarsi a casa dal punto 2", { placeholder: "body" });
    const cose = ["Conguaglio produttività pagato a novembre", "DEP 2025: graduatorie e 10% a chi aspetta da più tempo",
      "Notte +0,50 €/h, reperibilità 27,60 € a turno", "Part time: bando entro fine anno, 135 posti", "Ferie: 3 settimane d'estate garantite"];
    for (let i = 0; i < cose.length; i++) {
      const y = 0.75 + i * 1.18;
      card(s, 8.1, y, 4.65, 1.0, i % 2 ? "FFFFFF" : HEX.accent2);
      s.addText(cose[i], { x: 8.35, y, w: 4.35, h: 1.0, fontSize: 16, bold: true, color: HEX.dk2, valign: "middle", margin: 0, isTextBox: true });
    }
    s.addNotes("Riepilogo prima delle domande.");
  }
  slideDomande(S2, "Accordi decentrati AOUP 2026").addNotes("Spazio domande sul punto 2.");


  // ------------------------------------------------ 3 · sistema degli incarichi
  const S3 = "3 · Sistema degli incarichi";
  pres.addSection({ title: S3 });
  {
    const s = pres.addSlide({ masterName: "DIVISORE", sectionTitle: S3 });
    s.addText("03", { x: M, y: 0.7, w: 4, h: 2.2, fontSize: 150, bold: true, color: C.accent2, margin: 0, isTextBox: true });
    s.addText("Il sistema degli incarichi", { placeholder: "title" });
    s.addText("Chi coordina, chi è esperto, chi forma: quanto vale e come cambia", { placeholder: "body" });
    card(s, 9.4, 1.4, 3.3, 4.6, "0B4D28");
    s.addText([{ text: "+1.000 €", options: { fontSize: 50, bold: true, color: HEX.accent2, breakLine: true } },
      { text: "l'anno a tutti i 106 coordinatori", options: { fontSize: 20, bold: true, color: "FFFFFF", breakLine: true } },
      { text: "ad aprile l'Azienda proponeva 500 € a 45 di loro", options: { fontSize: 14, color: "CFE9D8" } }],
      { x: 9.6, y: 1.7, w: 2.9, h: 4, align: "center", valign: "middle", margin: 0, isTextBox: true });
    s.addNotes("Il risultato annunciato nella mail del 18/11: +1.000 € annui per tutti gli incarichi di funzione organizzativa di coordinamento, con una nuova fascia nella graduazione.");
  }
  await fotoPiena(S3, "04-coordinatrice", "Responsabilità che finalmente hanno un valore.", "Coordinamenti, incarichi professionali, tutor");
  await videoSlide(S3, "03-incarichi", "Coordinatori e incarichi professionali");
  {
    const s = pres.addSlide({ masterName: "CONTENUTO", sectionTitle: S3 });
    kicker(s, "CCNL 2025-2027 · art. 15 e 17");
    s.addText("Quanto vale un incarico: le regole del contratto", { placeholder: "title" });
    const t = [["", "Base", "Media", "Elevata"],
      ["Funzione organizzativa · professionisti salute e funzionari", "—", "4.000 – 9.500 €", "9.501 – 13.500 €"],
      ["Funzione professionale · professionisti salute e funzionari", "1.000 – 3.500 €", "4.000 – 9.500 €", "9.501 – 13.500 €"],
      ["Funzione professionale · assistenti", "930 €", "1.800 €", "3.000 €"],
      ["Funzione professionale · operatori", "700 €", "1.500 €", "2.000 €"],
      ["Incarico di posizione · elevata qualificazione", "—", "10.000 – 20.000 €", "—"]];
    s.addTable(t.map((r, i) => r.map((c, j) => ({ text: c, options: { bold: i === 0 || j === 0, fontSize: i === 0 ? 13 : 14,
      color: i === 0 ? "FFFFFF" : (j === 0 ? HEX.dk2 : HEX.dk1), fill: { color: i === 0 ? HEX.dk2 : (j === 1 && i === 2 ? "FFF4B8" : (i % 2 ? "FFFFFF" : HEX.lt2)) },
      align: j > 0 ? "center" : "left", valign: "middle" } }))),
      { x: M, y: 1.6, w: 7.6, colW: [3.4, 1.4, 1.4, 1.4], rowH: [0.55, 0.75, 0.75, 0.6, 0.6, 0.6], border: { type: "solid", color: "D9EADD", pt: 1 }, margin: 0.08 });
    card(s, 8.55, 1.6, 4.2, 2.4, C.accent2);
    s.addText([{ text: "1.000 € automatici", options: { fontSize: 22, bold: true, breakLine: true } },
      { text: "a ogni professionista della salute senza incarico di media o elevata complessità: è l'incarico di base. Si può alzare fino a 3.500 €.", options: { fontSize: 14 } }],
      { x: 8.75, y: 1.7, w: 3.8, h: 2.2, color: HEX.dk2, valign: "middle", margin: 0, isTextBox: true });
    card(s, 8.55, 4.2, 4.2, 2.3, C.text2);
    s.addText([{ text: "Dal 2027", options: { fontSize: 22, bold: true, color: HEX.accent2, breakLine: true } },
      { text: "tra il 10% e il 40% dei DEP di chi va in pensione finisce negli incarichi di base, prima nelle medicine e nella salute mentale (art. 39).", options: { fontSize: 14, color: "FFFFFF" } }],
      { x: 8.75, y: 4.3, w: 3.8, h: 2.1, valign: "middle", margin: 0, isTextBox: true });
    s.addNotes("Valori annui lordi complessivi (parte fissa e variabile). Incarico di base: art. 17 c. 7, 1.000 € annui comprensivi di tredicesima, incrementabile con quota variabile fino al massimo della tabella se la contrattazione integrativa trova le risorse. Le indennità di funzione sopra i 5.000 € assorbono lo straordinario. Art. 39 c. 2: dall'1/1/2027, 10-40% delle risorse dei DEP dei cessati dell'area dei professionisti della salute destinate agli incarichi di base.");
  }
  {
    const s = pres.addSlide({ masterName: "CONTENUTO", sectionTitle: S3 });
    kicker(s, "La mappatura AOUP · nuova proposta");
    s.addText("2,2 milioni per gli incarichi: come sono divisi", { placeholder: "title" });
    s.addChart(pres.charts.DOUGHNUT, [{ name: "Incarichi", labels: ["Coordinamento e organizzazione (sanitario)", "Incarichi professionali (sanitario)", "Ruolo professionale, tecnico, amministrativo", "Accantonamento EQ, assistenti e operatori"],
      values: [1011000, 345000, 662500, 167500] }], { x: M, y: 1.45, w: 6.2, h: 5.2, holeSize: 55,
      chartColors: [HEX.accent1, HEX.accent6, HEX.dk2, HEX.accent2], showPercent: false, showValue: false, showLegend: true, legendPos: "b",
      legendFontSize: 12, legendFontFace: "+mn-lt", legendColor: HEX.dk1, showTitle: false, dataBorder: { pt: 2, color: "FFFFFF" } });
    s.addText([{ text: "2,2 mln €", options: { fontSize: 26, bold: true, color: HEX.dk2, breakLine: true } }, { text: "accantonati nel fondo", options: { fontSize: 12, color: HEX.dk1 } }],
      { x: M + 1.95, y: 2.75, w: 2.3, h: 1.0, align: "center", valign: "middle", margin: 0, isTextBox: true });
    const n = [["106", "incarichi di coordinamento"], ["22", "altri incarichi di organizzazione"], ["86", "incarichi professionali sanitari"], ["61", "incarichi nel ruolo PTA"]];
    for (let i = 0; i < n.length; i++) {
      const x = 7.1 + (i % 2) * 2.85, y = 1.6 + Math.floor(i / 2) * 1.25;
      s.addText(n[i][0], { x, y, w: 2.7, h: 0.6, fontSize: 34, bold: true, color: i === 0 ? C.accent3 : C.accent1, margin: 0, isTextBox: true });
      s.addText(n[i][1], { x, y: y + 0.6, w: 2.7, h: 0.5, fontSize: 13, color: C.text1, margin: 0, isTextBox: true });
    }
    await fotoTavolo(s, "incarichi-mappatura-nuova", 7.2, 4.25, 5.45, TAVOLO + " · nuova mappatura", { maxH: 2.2, centra: 9.925 });
    s.addNotes("Riepilogo della nuova mappatura proiettata dall'Azienda: ruolo sanitario 1.011.000 € (22 incarichi di organizzazione + 106 di coordinamento) e 345.000 € (86 incarichi professionali: 31 specialisti, 19 esperti, 30 tutor didattici, 6 professionali); ruolo PTA 61 incarichi per 662.500 €; accantonamento EQ e aree assistenti/operatori 167.500 €. Totale 2.032.500 € + 167.500 € = 2.200.000 € (accordo 6/9/2023). Nota dell'Azienda: area ADA, circa metà degli incarichi oggi vacanti.");
  }

  {
    const s = pres.addSlide({ masterName: "CONTENUTO", sectionTitle: S3 });
    kicker(s, "I 106 coordinatori");
    s.addText("Dove lavorano i 106 coordinatori", { placeholder: "title" });
    const c = [["Aree di degenza", 39], ["Ambulatori e degenza diurna", 21], ["Piastra operatoria", 14], ["Terapie intensive", 9],
      ["Servizi", 8], ["Laboratori", 5], ["Pronto soccorso e SUEM", 5], ["Radiologie", 5]].reverse();
    s.addChart(pres.charts.BAR, [{ name: "Coordinatori", labels: c.map(x => x[0]), values: c.map(x => x[1]) }], {
      x: M, y: 1.45, w: 6.3, h: 5.2, barDir: "bar", chartColors: [HEX.accent1], showValue: true, dataLabelPosition: "outEnd",
      dataLabelFontSize: 13, dataLabelColor: HEX.dk1, dataLabelFontFace: "+mn-lt", catAxisLabelFontSize: 14, catAxisLabelColor: HEX.dk1,
      catAxisLabelFontFace: "+mn-lt", valAxisHidden: true, valGridLine: { style: "none" }, catGridLine: { style: "none" },
      showLegend: false, showTitle: false, barGapWidthPct: 45 });
    const k = [["47%", "coordinano una sola UOC o UOSD"], ["45%", "coordinano aree omogenee"], ["88%", "coordinano un solo profilo professionale"]];
    for (let i = 0; i < 3; i++) {
      const x = 7.1 + i * 1.9;
      card(s, x, 1.6, 1.75, 1.75, i === 2 ? C.accent2 : C.background2);
      s.addText([{ text: k[i][0], options: { fontSize: 28, bold: true, color: HEX.dk2, breakLine: true } }, { text: k[i][1], options: { fontSize: 11 } }],
        { x: x + 0.12, y: 1.65, w: 1.55, h: 1.65, color: HEX.dk1, valign: "middle", margin: 0, isTextBox: true });
    }
    await fotoTavolo(s, "coord-classificazione", 7.15, 3.7, 5.55, TAVOLO, { maxH: 2.55, centra: 9.925 });
    s.addNotes("Slide «Inc. Coordinamento» dell'Azienda: 106 incarichi per classificazione; afferenza 47% singola UOC/UOSD, 45% aree omogenee, 8% direzioni mediche ospedaliere; destinatari 88% singolo profilo, 11% due o più profili, 1% tutti i profili.");
  }
  {
    const s = pres.addSlide({ masterName: "CONTENUTO", sectionTitle: S3 });
    kicker(s, "Gli 86 incarichi professionali");
    s.addText("19 tipi di incarico, 86 posti", { placeholder: "title" });
    const col = [
      ["Specialistici", "31", HEX.accent1, [["Infermiere case manager", 20], ["Specialista in terapia intensiva", 4], ["Referente wound care", 2], ["Stomaterapista", 2], ["Procurement organi e tessuti", 1], ["Elettrofisiologia", 1], ["Ecocardiografia", 1]]],
      ["Esperti", "19", HEX.accent3, [["Governance in sala operatoria", 6], ["Accessi vascolari", 4], ["Innovazione in radiologia", 4], ["Monitoraggio neurofisiologico", 2], ["Organ care specialist", 2], ["Ricerca ed evidence-based practice", 1]]],
      ["Professionali", "36", HEX.dk2, [["Tutor didattici dei corsi di laurea", 30], ["Sostituzione renale", 2], ["Patient Blood Management", 1], ["Accessi enterali (PEG)", 1], ["Procedure analitiche (POCT)", 1], ["Percorsi assistenziali", 1]]]];
    for (let c = 0; c < 3; c++) {
      const x = M + c * 4.1;
      card(s, x, 1.5, 3.85, 0.95, col[c][2]);
      s.addText([{ text: col[c][1] + "  ", options: { fontSize: 32, bold: true, color: HEX.accent2 } }, { text: col[c][0], options: { fontSize: 20, bold: true, color: "FFFFFF" } }],
        { x: x + 0.25, y: 1.5, w: 3.4, h: 0.95, valign: "middle", margin: 0, isTextBox: true });
      const r = col[c][3];
      for (let i = 0; i < r.length; i++) {
        const y = 2.6 + i * 0.58;
        s.addText(String(r[i][1]), { x, y, w: 0.6, h: 0.5, fontSize: 18, bold: true, color: col[c][2], align: "right", valign: "middle", margin: 0, isTextBox: true });
        s.addText(r[i][0], { x: x + 0.75, y, w: 3.1, h: 0.5, fontSize: 13, color: C.text1, valign: "middle", margin: 0, isTextBox: true });
      }
    }
    s.addText("Valore: 4.000 € l'anno (5.000 € per un incarico professionale). I tipi di incarico: 37% specialistici, 32% esperti, 31% professionali.", { x: M, y: 6.65, w: W - 2 * M, h: 0.35, fontSize: 12, italic: true, color: "5B6B62", margin: 0, isTextBox: true });
    s.addNotes("Elenchi «Inc. professionali – Specialistici / Esperti / Professionali» proiettati dall'Azienda. Totali: 31 specialisti, 19 esperti, 36 professionali (30 tutor + 6) = 86, coerente con la mappatura. Posizioni: 42% professionale, 36% specialistico, 22% esperto. Valori dalla tabella di mappatura (4.000 €; una riga a 5.000 €).");
  }
  {
    const s = pres.addSlide({ masterName: "CONTENUTO", sectionTitle: S3 });
    kicker(s, "Gli incarichi organizzativi");
    s.addText("Chi organizza: dipartimenti, direzioni, formazione", { placeholder: "title" });
    const o = [["FaGraduationCap", "Direzione Professioni Sanitarie", "22", "13 coordinatori di lauree triennali, 6 di lauree magistrali, 3 responsabili di area (formazione, modelli organizzativi, risorse umane)"],
      ["FaHospital", "Direzioni Mediche Ospedaliere", "12", "rischio clinico, CUP e prenotazioni, infezioni ospedaliere, sterilizzazione, pre-ricovero, logistica, servizio sociale"],
      ["FaSitemap", "Dipartimenti e ricerca", "6", "5 coordinatori DIDAS e del dipartimento di diagnostica per immagini, 1 per le sperimentazioni cliniche di fase 1"]];
    for (let i = 0; i < 3; i++) {
      const y = 1.55 + i * 1.7;
      card(s, M, y, 6.9, 1.5, i === 0 ? C.accent2 : C.background2);
      await tondo(s, o[i][0], M + 0.2, y + 0.35, 0.8, HEX.accent1);
      s.addText(o[i][2], { x: M + 1.15, y: y + 0.15, w: 0.9, h: 0.65, fontSize: 32, bold: true, color: C.text2, margin: 0, isTextBox: true });
      s.addText(o[i][1], { x: M + 2.0, y: y + 0.15, w: 4.75, h: 0.5, fontSize: 17, bold: true, color: C.text2, valign: "middle", margin: 0, isTextBox: true });
      s.addText(o[i][3], { x: M + 1.15, y: y + 0.75, w: 5.6, h: 0.7, fontSize: 12, color: C.text1, valign: "top", margin: 0, isTextBox: true });
    }
    await fotoTavolo(s, "organizzativi-dps", 7.85, 1.6, 4.85, TAVOLO, { maxH: 2.2, centra: 10.275 });
    await fotoTavolo(s, "organizzativi-direzioni-mediche", 7.85, 4.45, 4.85, "Direzioni Mediche Ospedaliere", { maxH: 1.9, centra: 10.275 });
    s.addNotes("Elenchi «Inc. organizzativi» dell'Azienda. La somma (40) non coincide con i 22 incarichi di organizzazione della tabella di mappatura: verificare con Achille come sono contati (ad esempio alcuni coordinamenti dei corsi di laurea potrebbero ricadere nei 106 o negli incarichi DIDAS). In rosso, sulla slide dell'Azienda, i corsi nuovi: perfusione cardiovascolare e le magistrali specialistiche in cure intensive ed emergenza e in cure neonatali e pediatriche.");
  }
  {
    const s = pres.addSlide({ masterName: "SCURO", sectionTitle: S3 });
    kicker(s, "Coordinatori · da aprile a oggi", HEX.accent2);
    s.addText("Da 22.500 € a 106.000 €", { placeholder: "title" });
    card(s, M, 1.65, 3.9, 3.2, "13301F", { bordo: "1F4A31" });
    s.addText([{ text: "APRILE 2026", options: { fontSize: 12, bold: true, color: HEX.accent6, charSpacing: 3, breakLine: true } },
      { text: "+500 €", options: { fontSize: 54, bold: true, color: "FFFFFF", breakLine: true } },
      { text: "solo a 45 coordinatori", options: { fontSize: 16, color: "CFE9D8", breakLine: true } },
      { text: "22.500 € in tutto", options: { fontSize: 16, bold: true, color: "FFFFFF" } }],
      { x: M + 0.25, y: 1.8, w: 3.4, h: 2.9, align: "center", valign: "middle", margin: 0, isTextBox: true });
    s.addImage({ data: await icona("FaArrowRight", HEX.accent2), x: M + 4.05, y: 2.95, w: 0.6, h: 0.6, altText: "freccia" });
    card(s, M + 4.8, 1.65, 3.9, 3.2, HEX.accent2, { ombra: true });
    s.addText([{ text: "OGGI", options: { fontSize: 12, bold: true, color: HEX.dk2, charSpacing: 3, breakLine: true } },
      { text: "+1.000 €", options: { fontSize: 54, bold: true, color: HEX.dk2, breakLine: true } },
      { text: "a tutti i 106 coordinatori", options: { fontSize: 16, color: HEX.dk2, breakLine: true } },
      { text: "106.000 € in tutto", options: { fontSize: 16, bold: true, color: HEX.dk2 } }],
      { x: M + 5.05, y: 1.8, w: 3.4, h: 2.9, align: "center", valign: "middle", margin: 0, isTextBox: true });
    testo(s, [{ text: "Come: ", options: { bold: true, color: HEX.accent2 } },
      { text: "una nuova fascia nella graduazione degli incarichi, pagata con 109.500 € dell'accantonamento storico. Ai coordinatori va anche la quota premiale 2026 di 500 € (accordo 14/07).", options: { color: "FFFFFF" } }],
      M, 5.1, 8.7, 1.3, { fontSize: 16 });
    await fotoTavolo(s, "incarichi-proposta-500", 9.75, 1.6, 2.95, "Proposta del 14/4/26", { scuro: true, maxH: 2.0, centra: 11.225 });
    await fotoTavolo(s, "incarichi-1000-coordinatori", 9.75, 4.25, 2.95, "Nuova proposta", { scuro: true });
    s.addNotes("Proposta del 14/4/2026 (slide dell'Azienda): incremento a 500 € per i coordinatori, impegno 22.500 € (45 incarichi di fascia IV). Nuova proposta: +1.000 € a tutti i coordinatori, 106.000 € (61 fascia III + 45 fascia IV), coperti da 109.500 € di quota parte dell'accantonamento storico meno 3.500 € di residuo negativo dell'area assistenziale. Il 50% delle risorse CCNL (237.127,80 €) è impegnato per il DEP 2026. La bozza di accordo richiama il regolamento recepito con DDG 1652 del 18/09/2023.");
  }
  {
    const s = pres.addSlide({ masterName: "CONTENUTO", sectionTitle: S3 });
    kicker(s, "Incarichi professionali");
    s.addText("Chi forma e chi è esperto viene riconosciuto", { placeholder: "title" });
    const p = [["30", "Tutor didattici dei corsi di laurea", "bandi promessi entro novembre 2026; intanto la quota premiale"],
      ["2", "Referenti tecniche di sostituzione renale", ""], ["1", "Referente Patient Blood Management", ""],
      ["1", "Referente accessi enterali (PEG)", ""], ["1", "Referente procedure analitiche (POCT)", ""], ["1", "Supporto metodologico ai percorsi assistenziali", ""]];
    for (let i = 0; i < p.length; i++) {
      const y = 1.55 + i * 0.83;
      card(s, M, y, 6.4, 0.72, i === 0 ? C.accent2 : C.background2);
      s.addText(p[i][0], { x: M + 0.15, y, w: 0.8, h: 0.72, fontSize: 24, bold: true, color: i === 0 ? C.text2 : C.accent1, align: "center", valign: "middle", margin: 0, isTextBox: true });
      s.addText([{ text: p[i][1], options: { bold: true, breakLine: !!p[i][2] } }, ...(p[i][2] ? [{ text: p[i][2], options: { fontSize: 11 } }] : [])],
        { x: M + 1.05, y, w: 5.2, h: 0.72, fontSize: 14, color: C.text2, valign: "middle", margin: 0, isTextBox: true });
    }
    await fotoTavolo(s, "incarichi-professionali", 7.45, 1.6, 5.25, TAVOLO);
    card(s, 7.35, 5.45, 5.45, 1.1, C.text2);
    s.addText("Più incarichi professionali? L'Azienda li valuterà nel 2027: è il prossimo terreno di trattativa.",
      { x: 7.55, y: 5.47, w: 5.05, h: 1.05, fontSize: 15, bold: true, color: "FFFFFF", valign: "middle", margin: 0, isTextBox: true });
    s.addNotes("Elenco dei nuovi incarichi professionali proiettato dall'Azienda. Bandi per i tutor entro novembre 2026: impegno scritto nell'accordo del 14/07/2026 (quota premiale tutor 30.000 € fino all'affidamento). Verificare se i bandi sono usciti.");
  }
  {
    const s = pres.addSlide({ masterName: "CONTENUTO", sectionTitle: S3 });
    kicker(s, "I prossimi passi");
    s.addText("Dalla mappa al regolamento", { placeholder: "title" });
    const f = [["Mappa", true], ["Informativa ai sindacati", true], ["Delibera (DDG)", false], ["Fondo", false], ["Regolamento", false]];
    for (let i = 0; i < f.length; i++) {
      const x = M + i * 2.45;
      s.addShape(pres.shapes.CHEVRON, { x, y: 1.9, w: 2.55, h: 1.25, fill: { color: f[i][1] ? HEX.accent3 : HEX.lt2 }, line: { color: HEX.accent3, width: 2 } });
      s.addText(f[i][0], { x: x + 0.4, y: 1.9, w: 1.8, h: 1.25, fontSize: 15, bold: true, color: f[i][1] ? "FFFFFF" : HEX.accent3, align: "center", valign: "middle", margin: 0, isTextBox: true });
    }
    s.addText("FATTO", { x: M + 0.4, y: 3.25, w: 4.2, h: 0.35, fontSize: 12, bold: true, color: C.accent3, charSpacing: 3, align: "center", margin: 0, isTextBox: true });
    const e = [["Copertura dei posti vacanti", "dopo la delibera: nell'area ADA circa metà degli incarichi è oggi scoperta"],
      ["Nuovi incarichi professionali", "con il regolamento e il CCNL 2025-2027"],
      ["Le nostre richieste", "bandi trasparenti, incarichi di base valorizzati, più incarichi professionali nelle medicine"]];
    for (let i = 0; i < e.length; i++) {
      const x = M + i * 4.1;
      card(s, x, 3.9, 3.85, 2.45, i === 2 ? C.accent2 : C.background2);
      s.addText(e[i][0], { x: x + 0.25, y: 4.05, w: 3.4, h: 0.75, fontSize: 18, bold: true, color: C.text2, margin: 0, valign: "top", isTextBox: true });
      s.addText(e[i][1], { x: x + 0.25, y: 4.8, w: 3.4, h: 1.4, fontSize: 14, color: C.text1, margin: 0, valign: "top", isTextBox: true });
    }
    s.addNotes("Schema «Sviluppi futuri» dell'Azienda: Mappa → Informativa OO.SS. (fatti) → DDG → Fondo → Regolamento, con il CCNL 2025-27 che entra a livello di fondo e regolamento; la DDG porta alla copertura dei posti vacanti, il regolamento alla proposta di nuovi incarichi professionali. Le «nostre richieste» sono una proposta da confermare con Achille.");
  }
  {
    const s = pres.addSlide({ masterName: "DIVISORE", sectionTitle: S3 });
    s.addText("Cosa cambia per te", { placeholder: "title" });
    s.addText("Le quattro cose da portarsi a casa dal punto 3", { placeholder: "body" });
    const cose = ["Coordinatori: +1.000 € l'anno, tutti e 106", "Più 500 € di quota premiale 2026 ai coordinatori", "Tutor didattici: bandi e nel frattempo la quota", "Dal 2027 più soldi per gli incarichi di base"];
    for (let i = 0; i < cose.length; i++) {
      const y = 0.9 + i * 1.4;
      card(s, 8.1, y, 4.65, 1.15, i % 2 ? "FFFFFF" : HEX.accent2);
      s.addText(cose[i], { x: 8.35, y, w: 4.25, h: 1.15, fontSize: 17, bold: true, color: HEX.dk2, valign: "middle", margin: 0, isTextBox: true });
    }
  }
  slideDomande(S3, "Il sistema degli incarichi").addNotes("Spazio domande sul punto 3.");


  // ------------------------------------------------ 4 · welfare
  const S4 = "4 · Welfare Regione Veneto";
  const FLR = "Preintesa L.R. 26/2024 · risorse 2026 · 14/07/2026";
  const T1811 = "Incontro con l'Azienda del 18/11/2026";
  pres.addSection({ title: S4 });
  {
    const s = pres.addSlide({ masterName: "DIVISORE", sectionTitle: S4 });
    s.addText("04", { x: M, y: 0.7, w: 4, h: 2.2, fontSize: 150, bold: true, color: C.accent2, margin: 0, isTextBox: true });
    s.addText("Il welfare: 350 € a testa", { placeholder: "title" });
    s.addText("La legge regionale 26/2024, i buoni che scadono, i residui e il nuovo buono 2026", { placeholder: "body" });
    card(s, 9.2, 1.3, 3.5, 4.9, HEX.accent2, { ombra: true });
    s.addText([{ text: "350 €", options: { fontSize: 64, bold: true, color: HEX.dk2, breakLine: true } },
      { text: "per ogni dipendente, ogni anno", options: { fontSize: 18, bold: true, color: HEX.dk2, breakLine: true } },
      { text: "2025 · 2026 · 2027", options: { fontSize: 16, color: HEX.dk2 } }],
      { x: 9.4, y: 1.5, w: 3.1, h: 4.5, align: "center", valign: "middle", margin: 0, isTextBox: true });
    s.addNotes("Il welfare viene dalla L.R. 26/2024: la Regione ha messo risorse aggiuntive per il personale del SSR per il triennio 2025-2027. Una parte fissa, 350 € a testa, va in buoni acquisto.");
  }
  await fotoPiena(S4, "05-spesa", "350 € che devono arrivare davvero a tutti.", "Il welfare della legge regionale 26: chi, quanto, come");
  await videoSlide(S4, "04-welfare", "Il welfare: 350 € a testa");
  {
    const s = pres.addSlide({ masterName: "CONTENUTO", sectionTitle: S4 });
    kicker(s, "Da dove arrivano i soldi");
    s.addText("La legge regionale 26: 3,1 milioni per l'AOUP", { placeholder: "title" });
    // flusso: legge -> totale -> due rami
    card(s, M, 1.6, 3.2, 1.5, HEX.dk2);
    s.addText([{ text: "L.R. 26/2024", options: { fontSize: 22, bold: true, color: HEX.accent2, breakLine: true } }, { text: "Regione Veneto · triennio 2025-2027", options: { fontSize: 13, color: "FFFFFF" } }],
      { x: M + 0.2, y: 1.6, w: 2.8, h: 1.5, valign: "middle", margin: 0, isTextBox: true });
    s.addShape(pres.shapes.RIGHT_ARROW, { x: M + 3.3, y: 2.1, w: 0.5, h: 0.5, fill: { color: HEX.accent1 }, line: { type: "none" } });
    card(s, M + 3.9, 1.6, 3.1, 1.5, C.background2);
    s.addText([{ text: "3.148.566 €", options: { fontSize: 26, bold: true, color: HEX.accent1, breakLine: true } }, { text: "all'AOUP per il 2026 (stima)", options: { fontSize: 13, color: C.text1 } }],
      { x: M + 4.1, y: 1.6, w: 2.8, h: 1.5, valign: "middle", margin: 0, isTextBox: true });
    const rami = [["1.548.750 €", "Welfare: buoni acquisto da 350 €", HEX.accent2, HEX.dk2], ["1.599.816 €", "Contrattazione: notti, pronta disponibilità, aree complesse (punto 2)", HEX.accent1, "FFFFFF"]];
    for (let i = 0; i < 2; i++) {
      const y = 3.45 + i * 1.45;
      card(s, M, y, 7.0, 1.25, rami[i][2]);
      s.addText(rami[i][0], { x: M + 0.25, y, w: 2.6, h: 1.25, fontSize: 24, bold: true, color: rami[i][3], valign: "middle", margin: 0, isTextBox: true });
      s.addText(rami[i][1], { x: M + 2.9, y, w: 3.9, h: 1.25, fontSize: 15, bold: true, color: rami[i][3], valign: "middle", margin: 0, isTextBox: true });
    }
    await foglio(s, "lr26-welfare-350", 7.95, 1.6, 4.75, FLR + " · pag. 3");
    card(s, 7.87, 4.0, 4.9, 2.4, "FFF8D6", { bordo: "F2DF7A" });
    s.addText([{ text: "E i ruoli PTA?", options: { bold: true, fontSize: 18, color: HEX.dk2, breakLine: true } },
      { text: "La Regione paga i 350 € solo a sanitari e sociosanitari. Per amministrativi, tecnici e professionali li abbiamo ottenuti in Azienda: 230.000 € accantonati dal fondo premialità.", options: { fontSize: 14, color: C.text1 } }],
      { x: 8.07, y: 4.1, w: 4.5, h: 2.2, valign: "middle", margin: 0, isTextBox: true });
    s.addNotes("Tabella della preintesa del 14/07/2026: welfare su personale in servizio al 1/9/2025 1.548.750 €, perequazione 1.599.816 €, totale 3.148.566 €. Per il 2026 si usano come riferimento le risorse 2025 in attesa dell'assegnazione regionale definitiva. La quota PTA è finanziata dal fondo premialità e condizioni di lavoro (art. 64 CCNL 27/10/2025), 230.000 € da rideterminare sui presenti al 1/9/2026.");
  }
  {
    const s = pres.addSlide({ masterName: "CONTENUTO", sectionTitle: S4 });
    kicker(s, "Anche per chi non è sanitario");
    s.addText("Lo stesso buono per tutto il comparto", { placeholder: "title" });
    await foglio(s, "nota-welfare-pta", M + 0.08, 1.65, 6.0, "Nota CISL FP all'Azienda · 2 aprile 2026");
    await foglio(s, "lr26-welfare-pta", M + 0.08, 3.55, 6.0, FLR + " · pag. 4");
    const t = [["2 apr 2026", "La CISL FP chiede per iscritto i 350 € anche per amministrativi, tecnici e professionali"], ["14 lug 2026", "Preintesa firmata: 350 € anche ai ruoli PTA in servizio al 1/9/2026"], ["Dicembre 2026", "Il buono 2026 arriva a tutti, sanitari e non"]];
    for (let i = 0; i < t.length; i++) {
      const y = 1.65 + i * 1.6;
      card(s, 7.1, y, 5.65, 1.4, i === 2 ? HEX.accent1 : C.background2);
      s.addText(t[i][0], { x: 7.3, y, w: 1.6, h: 1.4, fontSize: 15, bold: true, color: i === 2 ? HEX.accent2 : HEX.accent1, valign: "middle", margin: 0, isTextBox: true });
      s.addText(t[i][1], { x: 8.95, y, w: 3.6, h: 1.4, fontSize: 14, color: i === 2 ? "FFFFFF" : C.text1, valign: "middle", margin: 0, isTextBox: true });
    }
    s.addNotes("La nota del 2/4/2026 (Pagliaro e Vullo) chiedeva di estendere e rifinanziare il welfare 2026 a tutto il comparto e di costruire un percorso di valorizzazione economica del personale non sanitario.");
  }
  {
    const s = pres.addSlide({ masterName: "SCURO", sectionTitle: S4 });
    kicker(s, "Il buono 2025 · scadenza 30 novembre", HEX.accent2);
    s.addText("I buoni non attivati non vanno persi", { placeholder: "title" });
    card(s, M, 1.6, 4.3, 4.7, "3A0A10", { bordo: "E2001A" });
    s.addText([{ text: "≈ 185.000 €", options: { fontSize: 44, bold: true, color: HEX.accent2, breakLine: true } },
      { text: "di buoni 2025 non utilizzati nel comparto", options: { fontSize: 17, bold: true, color: "FFFFFF", breakLine: true } },
      { text: "stima dell'Azienda: c'è chi non ha mai attivato il voucher", options: { fontSize: 13, color: "F3D6DA" } }],
      { x: M + 0.25, y: 1.8, w: 3.8, h: 4.3, align: "center", valign: "middle", margin: 0, isTextBox: true });
    const r = [["157.009 €", "ruolo sanitario e sociosanitario", "Tornano alle finalità della legge 26: notti e progetti nelle aree più pesanti"], ["27.408 €", "ruoli professionale, tecnico e amministrativo", "Vanno a progetti dedicati al personale PTA"]];
    for (let i = 0; i < 2; i++) {
      const y = 1.6 + i * 2.45;
      card(s, 5.2, y, 7.55, 2.25, "13301F", { bordo: "1F4A31" });
      s.addText(r[i][0], { x: 5.45, y: y + 0.15, w: 3, h: 0.8, fontSize: 32, bold: true, color: HEX.accent6, margin: 0, isTextBox: true });
      s.addText(r[i][1].toUpperCase(), { x: 8.4, y: y + 0.15, w: 4.2, h: 0.8, fontSize: 12, bold: true, color: "B9D3C3", charSpacing: 2, valign: "middle", margin: 0, isTextBox: true });
      s.addText(r[i][2], { x: 5.45, y: y + 1.0, w: 7.1, h: 1.1, fontSize: 17, color: "FFFFFF", valign: "top", margin: 0, isTextBox: true });
    }
    s.addNotes("Dati comunicati dall'Azienda al tavolo del 18/11/2026: residuo comparto 185.000,03 €; per il sanitario e sociosanitario 157.008,98 € da destinare alle medesime finalità della L.R. 26 (incremento della turnistica notturna e progettualità già individuate); per i PTA 27.408 € verso progettualità PTA. Messaggio: i soldi restano ai lavoratori, ma è meglio usarli. Dal 1° dicembre parte il nuovo buono.");
  }
  {
    const s = pres.addSlide({ masterName: "CONTENUTO", sectionTitle: S4 });
    kicker(s, "La novità per il nuovo anno", C.accent3);
    s.addText("Il buono 2026 cambia piattaforma: DoubleYou", { placeholder: "title" });
    const vol = path.join(QUI, "..", "documenti", "volantini", "welfare-2026-doubleyou.jpg");
    const dv = await dimensioni(vol); const hv = 5.0, wv = hv * dv.w / dv.h;
    s.addImage({ path: vol, x: W - M - wv, y: 1.45, w: wv, h: hv, altText: "Volantino CISL FP Welfare 2026: buoni acquisto da 350 € su piattaforma DoubleYou",
      shadow: { type: "outer", color: "06381F", opacity: 0.22, blur: 14, offset: 4, angle: 90 } });
    const p = [["FaFileSignature", "Delibera n. 713 dell'11/11/2026", "Azienda Zero ha affidato a DoubleYou il welfare di tutto il personale del Servizio sanitario veneto"],
      ["FaCalendarCheck", "Entro il 15 dicembre 2026", "i nuovi buoni da 350 € disponibili: per l'Azienda già dal 1° dicembre"],
      ["FaHourglassHalf", "Ancora da comunicare", "come si accede, come si usano i buoni, quali negozi aderiscono"]];
    for (let i = 0; i < p.length; i++) {
      const y = 1.55 + i * 1.6;
      await tondo(s, p[i][0], M, y + 0.1, 0.8, i === 2 ? HEX.accent3 : HEX.accent1);
      s.addText(p[i][1], { x: M + 1.05, y, w: 6.2, h: 0.5, fontSize: 19, bold: true, color: C.text2, margin: 0, isTextBox: true });
      s.addText(p[i][2], { x: M + 1.05, y: y + 0.5, w: 6.2, h: 0.9, fontSize: 15, color: C.text1, valign: "top", margin: 0, isTextBox: true });
    }
    s.addNotes("Fonte: deliberazione di Azienda Zero n. 713 dell'11 novembre 2026 (aggiudicazione a DoubleYou S.r.l.), mail CISL FP del 17/11/2026 e incontro del 18/11/2026 («dal 1° dicembre sarà disponibile un nuovo voucher»). Avvisare: chi ha ancora il buono 2025 lo usi entro il 30 novembre.");
  }
  {
    const s = pres.addSlide({ masterName: "DIVISORE", sectionTitle: S4 });
    s.addText("Cosa chiediamo", { placeholder: "title" });
    s.addText("Il punto 4 in quattro richieste", { placeholder: "body" });
    const cose = ["Piattaforma semplice e accessibile a tutti", "Tanti negozi e servizi convenzionati, anche a Padova e provincia", "Un avviso a chi non attiva il buono: zero residui", "Welfare 2027 garantito a tutto il comparto, PTA compresi"];
    for (let i = 0; i < cose.length; i++) {
      const y = 0.9 + i * 1.4;
      card(s, 8.1, y, 4.65, 1.15, i % 2 ? "FFFFFF" : HEX.accent2);
      s.addText(cose[i], { x: 8.35, y, w: 4.25, h: 1.15, fontSize: 16, bold: true, color: HEX.dk2, valign: "middle", margin: 0, isTextBox: true });
    }
    s.addNotes("Le prime due richieste sono l'impegno CISL FP del volantino Welfare 2026. Le ultime due sono proposte da confermare con Achille.");
  }
  slideDomande(S4, "Il welfare").addNotes("Spazio domande sul punto 4.");

  // ------------------------------------------------ 5 · vertenze legali
  const S5 = "5 · Vertenze legali";
  const EV = path.join(QUI, "..", "..", "..", "email", "vertenze-2026-11");
  const R5 = "C8102E";
  async function immagine(s, file, x, y, w, alt, opz = {}) {
    const d = await dimensioni(file); let h = w * d.h / d.w;
    if (opz.maxH && h > opz.maxH) { h = opz.maxH; w = h * d.w / d.h; if (opz.centra) x = opz.centra - w / 2; }
    s.addImage({ path: file, x, y, w, h, altText: alt, rounding: false,
      shadow: { type: "outer", color: "06381F", opacity: 0.22, blur: 14, offset: 4, angle: 90 } });
    return { x, y, w, h };
  }
  function qr(s, nome, x, y, d, etichetta, scuro) {
    card(s, x - 0.1, y - 0.1, d + 0.2, d + 0.6, "FFFFFF", { bordo: "D9EADD" });
    s.addImage({ path: path.join(QUI, "qr", nome + ".png"), x, y, w: d, h: d, altText: "QR code: " + etichetta });
    s.addText(etichetta, { x: x - 0.1, y: y + d, w: d + 0.2, h: 0.45, fontSize: 12, bold: true, color: HEX.dk2, align: "center", valign: "middle", margin: 0, isTextBox: true });
  }
  pres.addSection({ title: S5 });
  {
    const s = pres.addSlide({ masterName: "DIVISORE", sectionTitle: S5 });
    s.addText("05", { x: M, y: 0.7, w: 4, h: 2.2, fontSize: 150, bold: true, color: C.accent2, margin: 0, isTextBox: true });
    s.addText("Tre vertenze. Una l'abbiamo già vinta.", { placeholder: "title" });
    s.addText("Festivo infrasettimanale, indennità durante le ferie, buoni pasto", { placeholder: "body" });
    await immagine(s, path.join(EV, "vertenze-hero.jpg"), 8.4, 0.9, 4.35, "Tre vertenze, una l'abbiamo già vinta: Tribunale di Padova, 14 maggio 2026");
    s.addNotes("Il lavoro pesante (avvocati, cause pilota, udienze) l'abbiamo fatto noi: a chi è in sala restano due minuti per un modulo.");
  }
  await fotoPiena(S5, "06-tribunale", "Quando il contratto non viene rispettato, c'è il giudice.", "Festivo infrasettimanale, ferie, buoni pasto");
  await videoSlide(S5, "05-vertenze", "Tre vertenze, una già vinta");
  {
    const s = pres.addSlide({ masterName: "CONTENUTO", sectionTitle: S5 });
    kicker(s, "Il tabellone dei fatti");
    s.addText("A che punto siamo", { placeholder: "title" });
    const v = [["VINTA", "Festivo infrasettimanale", "Tribunale di Padova, sentenza del 14 maggio 2026", HEX.accent1, "FaCheck"],
      ["IN CAUSA", "Indennità durante le ferie", "Già in causa con l'Azienda, forti della Cassazione n. 25528/2025", "F08A00", "FaBalanceScale"],
      ["SENTENZA ATTESA", "Buoni pasto", "Percorso aperto da tempo: la decisione è attesa a breve", HEX.dk2, "FaHourglassHalf"]];
    for (let i = 0; i < 3; i++) {
      const x = M + i * 4.1;
      card(s, x, 1.55, 3.85, 4.95, C.background2, { ombra: true });
      s.addShape(pres.shapes.RECTANGLE, { x, y: 1.55, w: 3.85, h: 1.6, fill: { color: v[i][3] }, line: { type: "none" } });
      await tondo(s, v[i][4], x + 1.45, 1.85, 1.0, "FFFFFF", v[i][3] === HEX.dk2 ? HEX.accent2 : v[i][3]);
      card(s, x + 0.3, 3.4, 2.2, 0.4, v[i][3]);
      s.addText(v[i][0], { x: x + 0.3, y: 3.4, w: 2.2, h: 0.4, fontSize: 11, bold: true, color: "FFFFFF", align: "center", valign: "middle", charSpacing: 2, margin: 0, isTextBox: true });
      s.addText(v[i][1], { x: x + 0.3, y: 3.95, w: 3.3, h: 0.9, fontSize: 21, bold: true, color: C.text2, valign: "top", margin: 0, isTextBox: true });
      s.addText(v[i][2], { x: x + 0.3, y: 4.85, w: 3.3, h: 1.4, fontSize: 15, color: C.text1, valign: "top", margin: 0, isTextBox: true });
    }
    s.addNotes("⚠ Buoni pasto: prima del 7 dicembre verificare se la sentenza AOUP è arrivata e con quale esito, e aggiornare questa slide.");
  }
  {
    const s = pres.addSlide({ masterName: "CONTENUTO", sectionTitle: S5 });
    kicker(s, "Vertenza 1 · vinta", HEX.accent1);
    s.addText("Il festivo infrasettimanale va pagato a parte", { placeholder: "title" });
    const p = [["La regola", "Art. 106 c.5 del CCNL: chi lavora un festivo infrasettimanale sceglie tra straordinario festivo (+30% di giorno, +50% di notte), riposo compensativo entro 30 giorni o banca delle ore. In più all'indennità di turno."],
      ["Il problema in AOUP", "Le ore del festivo vengono contate nel monte orario mensile come ore normali."],
      ["Chi lo dice", "Cassazione n. 20743/2023, parere ARAN CSAN149, e ora il Tribunale di Padova."]];
    for (let i = 0; i < p.length; i++) {
      const y = 1.5 + i * 1.45;
      card(s, M, y, 7.6, 1.3, i === 1 ? "FFF1F2" : C.background2);
      s.addText(p[i][0], { x: M + 0.2, y, w: 1.9, h: 1.3, fontSize: 15, bold: true, color: i === 1 ? R5 : HEX.accent1, valign: "middle", margin: 0, isTextBox: true });
      s.addText(p[i][1], { x: M + 2.1, y, w: 5.35, h: 1.3, fontSize: 13.5, color: C.text1, valign: "middle", margin: 0, isTextBox: true });
    }
    card(s, M, 5.95, 7.6, 0.85, HEX.dk2);
    s.addText([{ text: "«Se avete vinto, l'Azienda paga tutti?» ", options: { bold: true, color: HEX.accent2 } }, { text: "No: la sentenza vale per chi ha fatto ricorso. Gli altri devono attivarsi.", options: { color: "FFFFFF" } }],
      { x: M + 0.2, y: 5.95, w: 7.2, h: 0.85, fontSize: 14, valign: "middle", margin: 0, isTextBox: true });
    card(s, 8.55, 1.5, 4.2, 2.55, HEX.accent1);
    s.addText([{ text: "34", options: { fontSize: 60, bold: true, color: HEX.accent2, breakLine: true } }, { text: "giornate festive riconosciute a un collega, dal 2019 al 2025, più interessi", options: { fontSize: 14, color: "FFFFFF" } }],
      { x: 8.75, y: 1.55, w: 3.8, h: 2.45, valign: "middle", margin: 0, isTextBox: true });
    qr(s, "festivo", 9.8, 4.35, 1.7, "Modulo festivo");
    s.addNotes("Tribunale di Padova, Sezione Lavoro, 14/05/2026, r.g. 1613/2025: l'AOUP condannata a pagare lo straordinario festivo per 34 giornate (26/12/2019 - 2/6/2025) più interessi. Prescritti i crediti oltre 5 anni dalla richiesta dell'8/10/2024. Sentenza da mostrare oscurata. ⚠ La cifra «oltre 3.000 €» circolata nella mail coincide con le spese legali liquidate: non dirla finché non è verificata sulla sentenza. Vertenza collettiva a gruppi di circa 20 persone. Modulo: form.getformly.com/f/ug983Z");
  }
  {
    const s = pres.addSlide({ masterName: "CONTENUTO", sectionTitle: S5 });
    kicker(s, "Vertenza 2 · in causa", "C46F00");
    s.addText("Le ferie non possono costare di meno", { placeholder: "title" });
    card(s, M, 1.5, 7.6, 1.9, HEX.dk2);
    s.addText([{ text: "«Rientra nella retribuzione feriale qualsiasi importo collegato all'esecuzione delle mansioni e correlato allo status personale e professionale del lavoratore.»", options: { italic: true, color: "FFFFFF", fontSize: 16, breakLine: true } },
      { text: "Cassazione, ordinanza n. 25528 del 17 settembre 2025", options: { bold: true, color: HEX.accent2, fontSize: 13 } }],
      { x: M + 0.25, y: 1.55, w: 7.1, h: 1.8, valign: "middle", margin: 0, isTextBox: true });
    const p = [["Il caso", "Un infermiere turnista dell'ASL Napoli 1: vince in tribunale, in appello e in Cassazione"], ["Il principio", "L'indennità di turno paga la fatica dei turni: spetta anche in ferie, sennò le ferie «costano»"], ["Il diritto europeo", "Direttiva 2003/88: nessuna riduzione di paga che scoraggi le ferie"], ["Da ora in avanti", "Il nuovo CCNL prevede l'indennità giornaliera anche in ferie. Gli arretrati restano da recuperare"]];
    for (let i = 0; i < p.length; i++) {
      const y = 3.6 + i * 0.8;
      s.addText(p[i][0], { x: M, y, w: 2.1, h: 0.7, fontSize: 14, bold: true, color: "C46F00", valign: "middle", margin: 0, isTextBox: true });
      s.addText(p[i][1], { x: M + 2.1, y, w: 5.5, h: 0.7, fontSize: 13.5, color: C.text1, valign: "middle", margin: 0, isTextBox: true });
    }
    card(s, 8.55, 1.5, 4.2, 2.55, "FFF4E0", { bordo: "F2C27A" });
    s.addText([{ text: "Controlla il cedolino", options: { fontSize: 19, bold: true, color: HEX.dk2, breakLine: true } }, { text: "Nei mesi con le ferie l'indennità di turno manca o è ridotta? Allora ti riguarda.", options: { fontSize: 14, color: C.text1 } }],
      { x: 8.75, y: 1.55, w: 3.8, h: 2.45, valign: "middle", margin: 0, isTextBox: true });
    qr(s, "ferie", 9.8, 4.35, 1.7, "Modulo ferie");
    s.addNotes("Sentenze europee richiamate: Robinson-Steele, Schultz-Hoff, Williams, C-514/20. Orientamento confermato da Cass. 17443/2025. ⚠ Verificare sul testo del CCNL 2025-27 decorrenza e calcolo dell'indennità giornaliera in ferie (in Funzioni Centrali è sulle indennità di turno dell'anno prima). Modulo: form.getformly.com/f/9AYmxv");
  }
  {
    const s = pres.addSlide({ masterName: "CONTENUTO", sectionTitle: S5 });
    kicker(s, "Vertenza 3 · sentenza attesa", HEX.dk2);
    s.addText("Sei ore di lavoro e niente mensa: il buono spetta", { placeholder: "title" });
    card(s, M, 1.5, 7.6, 1.55, C.background2);
    s.addText([{ text: "«Dopo sei ore di lavoro, in assenza di servizio mensa, il diritto al buono pasto è automatico e incondizionato.»", options: { italic: true, bold: true, color: HEX.dk2, fontSize: 16, breakLine: true } },
      { text: "Sentenza n. 3448/2025 · causa CISL FP contro il Policlinico Umberto I di Roma", options: { color: "5B6B62", fontSize: 12 } }],
      { x: M + 0.25, y: 1.5, w: 7.1, h: 1.55, valign: "middle", margin: 0, isTextBox: true });
    s.addChart(pres.charts.BAR, [{ name: "Arretrati", labels: ["1 anno", "3 anni", "5 anni"], values: [743, 2229, 3715] }], {
      x: M, y: 3.25, w: 4.6, h: 3.4, barDir: "col", chartColors: [HEX.accent1], showValue: true, dataLabelFormatCode: "#,##0 \"€\"", dataLabelPosition: "outEnd",
      dataLabelFontSize: 14, dataLabelFontBold: true, dataLabelColor: HEX.dk1, catAxisLabelFontSize: 13, catAxisLabelColor: HEX.dk1, catAxisLabelFontFace: "+mn-lt", valAxisHidden: true,
      valGridLine: { style: "none" }, catGridLine: { style: "none" }, showLegend: false, barGapWidthPct: 60 });
    s.addText([{ text: "Esempio: 15 turni al mese senza buono", options: { bold: true, breakLine: true } }, { text: "Il caso di Roma: 303 turni negati, 1.251 € più interessi, circa 4 € a turno.", options: {} }],
      { x: M + 4.75, y: 3.4, w: 2.85, h: 2.0, fontSize: 13, color: C.text1, valign: "top", margin: 0, isTextBox: true });
    s.addText("Priorità: notti da 10 ore, festivi e weekend, quando la mensa è chiusa.", { x: M + 4.75, y: 5.45, w: 2.85, h: 1.1, fontSize: 13, bold: true, color: HEX.accent1, margin: 0, isTextBox: true });
    card(s, 8.55, 1.5, 4.2, 2.55, HEX.dk2);
    s.addText([{ text: "In AOUP", options: { fontSize: 19, bold: true, color: HEX.accent2, breakLine: true } }, { text: "Il percorso è aperto da tempo: la decisione è attesa a breve. Vi aggiorniamo appena arriva.", options: { fontSize: 14, color: "FFFFFF" } }],
      { x: 8.75, y: 1.55, w: 3.8, h: 2.45, valign: "middle", margin: 0, isTextBox: true });
    qr(s, "buonipasto", 9.8, 4.35, 1.7, "Modulo buoni pasto");
    s.addNotes("Simulazione dal gamma CISL FP: 15 turni al mese senza buono. ⚠ Prescrizione: il gamma parla di 10 anni (natura assistenziale del buono), la mail di 5 anni per tutte e tre le vertenze: in sala dire un numero solo, da confermare con l'avvocato. ⚠ Aggiornare con l'esito della sentenza AOUP se arriva prima del 7/12. Documenti da raccogliere: cartellini dei turni di almeno 6 ore, buste paga. Modulo: form.getformly.com/f/kkwFYZ");
  }
  await ricostruzione(S5, "21-pasto-corridoio", "Ore 2 di notte", "La mensa è chiusa. Il turno no.", "Dopo sei ore di lavoro, senza mensa, il buono pasto spetta: di giorno, di notte e nei festivi. È da qui che nasce la terza vertenza.", "Collegamento con la vertenza sui buoni pasto: priorità a notti, festivi e weekend.");
  {
    const s = pres.addSlide({ masterName: "SCURO", sectionTitle: S5 });
    kicker(s, "Perché non aspettare", HEX.accent2);
    s.addText("Il tempo lavora contro di te", { placeholder: "title" });
    await immagine(s, path.join(EV, "vertenze-tempo.jpg"), M, 1.5, 6.6, "Ogni mese che aspetti, il credito più vecchio esce dal conto");
    s.addText([{ text: "5 anni", options: { fontSize: 54, bold: true, color: HEX.accent2, breakLine: true } },
      { text: "poi i crediti di lavoro si prescrivono. Ogni mese che passa, il più vecchio esce dal conto.", options: { fontSize: 18, color: "FFFFFF", breakLine: true } },
      { text: " ", options: { fontSize: 10, breakLine: true } },
      { text: "La diffida firmata ferma l'orologio.", options: { fontSize: 18, bold: true, color: HEX.accent6 } }],
      { x: 7.6, y: 1.6, w: 5.1, h: 4.6, valign: "middle", margin: 0, isTextBox: true });
    s.addNotes("«È come avere uno stipendio non pagato in banca: se non vai a ritirarlo entro cinque anni, sparisce.»");
  }
  {
    const s = pres.addSlide({ masterName: "CONTENUTO", sectionTitle: S5 });
    kicker(s, "Adesso, dal telefono");
    s.addText("Inquadra il codice: due minuti, poi ti chiamiamo noi", { placeholder: "title" });
    await immagine(s, path.join(EV, "vertenze-passi.jpg"), M, 1.45, 5.9, "Tre passi: compili, ti richiamiamo, pensiamo noi al resto");
    const q = [["festivo", "Festivo infrasettimanale"], ["ferie", "Indennità durante le ferie"], ["buonipasto", "Buoni pasto"]];
    for (let i = 0; i < 3; i++) qr(s, q[i][0], 7.0 + i * 1.95, 1.7, 1.65, q[i][1].split(" ")[0] === "Indennità" ? "Ferie" : (i === 0 ? "Festivo" : "Buoni pasto"));
    card(s, 6.9, 4.25, 5.85, 2.25, HEX.dk2);
    s.addText([{ text: "Tre moduli, uno per vertenza.", options: { bold: true, color: HEX.accent2, fontSize: 18, breakLine: true } },
      { text: "Ti riguardano tutte? Compilali tutti e tre. Servizio gratuito, ti ricontattiamo noi. Più siamo, più contiamo.", options: { color: "FFFFFF", fontSize: 15 } }],
      { x: 7.1, y: 4.3, w: 5.45, h: 2.15, valign: "middle", margin: 0, isTextBox: true });
    s.addNotes("Lasciare questa slide a schermo un minuto: chi ha il telefono in mano compila adesso. Moduli: ug983Z (festivo), 9AYmxv (ferie), kkwFYZ (buoni pasto) su form.getformly.com/f/");
  }
  await videoSlide(S5, "12-dati-alla-mano", "Dati alla mano");
  {
    const s = pres.addSlide({ masterName: "SCURO", sectionTitle: S5 });
    kicker(s, "Il Bugiardino · dati alla mano", HEX.accent2);
    s.addText("In questi giorni si sono sentite cose inesatte", { placeholder: "title" });
    const b = [["«I progetti pagati con la premialità tolgono soldi a progressioni e DEP»", "FALSO", "Sono cassetti diversi: i DEP stanno nel fondo incarichi e progressioni, i progetti nella premialità. Aprire un cassetto non svuota l'altro."],
      ["«La CISL FP ha detto che il contratto è già firmato»", "FALSO", "Abbiamo sempre parlato di attesa. Semmai c'era chi prometteva gli arretrati a novembre. Novembre è arrivato, gli arretrati no."],
      ["«Sui DEP 2026 si è messo poco»", "INESATTO", "620.000 €: la somma massima possibile. Oltre 1,4 milioni di progressioni in due anni. Di più avrebbe voluto dire meno produttività per tutti."]];
    for (let i = 0; i < 3; i++) {
      const x = M + i * 4.1;
      card(s, x, 1.55, 3.85, 5.0, "13301F", { bordo: "1F4A31" });
      s.addText("SI È SENTITO DIRE…", { x: x + 0.25, y: 1.7, w: 3.4, h: 0.3, fontSize: 10, bold: true, color: "B9D3C3", charSpacing: 2, margin: 0, isTextBox: true });
      s.addText(b[i][0], { x: x + 0.25, y: 2.0, w: 3.4, h: 1.35, fontFace: "Courier New", fontSize: 14, bold: true, color: "FFFFFF", valign: "top", margin: 0, isTextBox: true });
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: x + 0.25, y: 3.45, w: i === 2 ? 1.6 : 1.15, h: 0.45, rectRadius: 0.06, fill: { type: "none" }, line: { color: "FF4D5E", width: 2.5 }, rotate: -4 });
      s.addText(b[i][1], { x: x + 0.25, y: 3.45, w: i === 2 ? 1.6 : 1.15, h: 0.45, fontSize: 15, bold: true, color: "FF4D5E", align: "center", valign: "middle", margin: 0, isTextBox: true, rotate: -4 });
      s.addText("I FATTI", { x: x + 0.25, y: 4.1, w: 3.4, h: 0.3, fontSize: 10, bold: true, color: HEX.accent6, charSpacing: 2, margin: 0, isTextBox: true });
      s.addText(b[i][2], { x: x + 0.25, y: 4.4, w: 3.4, h: 2.05, fontSize: 13.5, color: "E4F2E8", valign: "top", margin: 0, isTextBox: true });
    }
    s.addNotes("Dalla bozza SendFox «Il Bugiardino – Dati alla mano». Tono: nessun nome, nessuna sigla. «Non vi chiediamo di credere alla nostra verità: vi chiediamo di verificarla, anche con un accesso agli atti.» Contratto: firma definitiva presumibilmente a dicembre 2026, arretrati previsti a gennaio 2027. DEP: la produttività è scesa per una legge regionale che calcola alcune risorse variabili sul numero di dipendenti previsti; nel 2024 c'era chi alle progressioni aveva riservato un anno vuoto.");
  }
  {
    const s = pres.addSlide({ masterName: "DIVISORE", sectionTitle: S5 });
    s.addText("Dati alla mano. Sempre.", { placeholder: "title" });
    s.addText("Non vi chiediamo di crederci: vi chiediamo di verificare. Anche con un accesso agli atti, in qualsiasi momento.", { placeholder: "body" });
    s.addNotes("Chiusura del blocco: transizione verso le domande sulle vertenze.");
  }
  slideDomande(S5, "Le vertenze legali").addNotes("Spazio domande sul punto 5.");


  // ------------------------------------------------ 6 · incentivi funzioni tecniche
  const S6 = "6 · Incentivi funzioni tecniche";
  const FAZ = "Regolamento incentivi · proposta dell'Azienda, rev.5 dell'8/10/2026";
  const FCI = "Regolamento incentivi · proposta CISL FP, Rev 22";
  const ROSSO = "C8102E";
  // Fondo per le forniture: l'Azienda applica UNA aliquota a tutto l'importo, la CISL scaglioni progressivi.
  const fondoAz = (v, liv) => { const t = [[221000, [0.35, 0.75, 1.5]], [750000, [0.2, 0.4, 0.8]], [2000000, [0.1, 0.2, 0.4]], [Infinity, [0.02, 0.05, 0.1]]];
    return v * t.find(r => v <= r[0])[1][liv] / 100; };
  const fondoCi = (v, al) => { const sc = [250000, 750000, 2000000, 10000000, Infinity]; let f = 0, da = 0;
    for (let i = 0; i < sc.length && v > da; i++) { f += (Math.min(v, sc[i]) - da) * al[i] / 100; da = sc[i]; } return f; };
  const G1 = [1, 0.7, 0.4, 0.2, 0.1];
  const eur = n => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " €";
  pres.addSection({ title: S6 });
  {
    const s = pres.addSlide({ masterName: "DIVISORE", sectionTitle: S6 });
    s.addText("06", { x: M, y: 0.7, w: 4, h: 2.2, fontSize: 150, bold: true, color: C.accent2, margin: 0, isTextBox: true });
    s.addText("Incentivi per le funzioni tecniche", { placeholder: "title" });
    s.addText("Il regolamento sull'art. 45 del Codice appalti: due proposte sul tavolo", { placeholder: "body" });
    card(s, 9.2, 1.3, 3.5, 4.9, "3A0A10", { bordo: "E2001A" });
    s.addText([{ text: "−44%", options: { fontSize: 66, bold: true, color: HEX.accent2, breakLine: true } },
      { text: "di fondo se la fornitura passa da 220.000 a 230.000 €", options: { fontSize: 17, bold: true, color: "FFFFFF", breakLine: true } },
      { text: "con le tabelle proposte dall'Azienda", options: { fontSize: 14, color: "F3D6DA" } }],
      { x: 9.4, y: 1.5, w: 3.1, h: 4.5, align: "center", valign: "middle", margin: 0, isTextBox: true });
    s.addNotes("Chi riguarda: il personale tecnico e amministrativo che fa da RUP, DEC, direttore dei lavori, supporto e collaboratore nelle gare e nei contratti. Esempio: fornitura da 220.000 € con complessità media = 1.650 €; da 230.000 € = 920 €.");
  }
  await fotoPiena(S6, "07-tecnici", "Anche chi fa funzionare l'ospedale va riconosciuto.", "Il regolamento degli incentivi per le funzioni tecniche");
  await videoSlide(S6, "06-incentivi", "Incentivi tecnici: due regolamenti a confronto");
  {
    const s = pres.addSlide({ masterName: "CONTENUTO", sectionTitle: S6 });
    kicker(s, "Due testi a confronto");
    s.addText("Stessa legge, due regolamenti molto diversi", { placeholder: "title" });
    const righe = [
      ["Come si calcola", "Una aliquota su tutto l'importo: oltre ogni soglia il fondo crolla", "Scaglioni progressivi, come l'IRPEF: il fondo cresce sempre"],
      ["Complessità", "3 livelli scelti dal RUP o dal Direttore", "2 gradi oggettivi, motivati e non modificabili dopo"],
      ["Quando paghi", "Entro il 31 luglio dell'anno dopo, e solo senza debito orario", "Entro 30 giorni dal certificato, con silenzio-assenso"],
      ["Riduzioni", "Fino al 100% per i ritardi", "Massimo 50%, e la prova tocca all'Azienda"],
      ["Trasparenza", "Gruppo di controllo interno", "Relazione annuale a RSU e sindacati"],
    ];
    const x0 = M, cl = 2.4, cw = (W - 2 * M - cl - 0.3) / 2, y0 = 1.5, rh = 0.98;
    card(s, x0 + cl + 0.15, y0 - 0.1, cw - 0.1, 0.55, ROSSO);
    card(s, x0 + cl + 0.25 + cw, y0 - 0.1, cw - 0.1, 0.55, HEX.accent1);
    s.addText("Proposta dell'Azienda", { x: x0 + cl + 0.15, y: y0 - 0.1, w: cw - 0.1, h: 0.55, fontSize: 17, bold: true, color: "FFFFFF", align: "center", valign: "middle", margin: 0, isTextBox: true });
    s.addText("Proposta CISL FP", { x: x0 + cl + 0.25 + cw, y: y0 - 0.1, w: cw - 0.1, h: 0.55, fontSize: 17, bold: true, color: "FFFFFF", align: "center", valign: "middle", margin: 0, isTextBox: true });
    for (let i = 0; i < righe.length; i++) {
      const y = y0 + 0.6 + i * rh;
      s.addText(righe[i][0], { x: x0, y, w: cl, h: rh - 0.12, fontSize: 16, bold: true, color: C.text2, valign: "middle", margin: 0, isTextBox: true });
      card(s, x0 + cl + 0.15, y, cw - 0.1, rh - 0.12, "FFF1F2");
      card(s, x0 + cl + 0.25 + cw, y, cw - 0.1, rh - 0.12, C.background2);
      s.addText(righe[i][1], { x: x0 + cl + 0.3, y, w: cw - 0.4, h: rh - 0.12, fontSize: 15, color: C.text1, valign: "middle", margin: 0, isTextBox: true });
      s.addText(righe[i][2], { x: x0 + cl + 0.4 + cw, y, w: cw - 0.4, h: rh - 0.12, fontSize: 15, bold: true, color: C.text2, valign: "middle", margin: 0, isTextBox: true });
    }
    s.addNotes("Azienda: rev.5 inviata alle OO.SS. l'8/10/2026, 14 articoli. CISL: bozza Rev 22, 12 articoli. Dettaglio articolo per articolo in documenti/incentivi/ANALISI-COMPARATIVA.md.");
  }
  {
    const s = pres.addSlide({ masterName: "CONTENUTO", sectionTitle: S6 });
    kicker(s, "Forniture · fondo incentivi in euro", ROSSO);
    s.addText("Più grande è la gara, meno incentivo", { placeholder: "title" });
    const imp = []; for (let v = 100000; v <= 2500000; v += 25000) imp.push(v);
    const lab = imp.map(v => v >= 1000000 ? (v / 1e6).toLocaleString("it-IT") + " mln" : (v / 1000) + "k");
    s.addChart(pres.charts.LINE, [
      { name: "Azienda · complessità media", labels: lab, values: imp.map(v => Math.round(fondoAz(v, 1))) },
      { name: "CISL · grado 1 (il più basso)", labels: lab, values: imp.map(v => Math.round(fondoCi(v, G1))) }], {
      x: M, y: 1.45, w: 8.3, h: 5.2, chartColors: [ROSSO, HEX.accent1], lineSize: 3, lineDataSymbol: "none",
      catAxisLabelFrequency: 8, catAxisLabelFontSize: 12, catAxisLabelColor: HEX.dk1, catAxisLabelFontFace: "+mn-lt",
      valAxisLabelFontSize: 12, valAxisLabelColor: HEX.dk1, valAxisLabelFormatCode: "#,##0 €", valAxisLabelFontFace: "+mn-lt",
      valGridLine: { color: "E3EEE6", size: 0.5 }, catGridLine: { style: "none" },
      showLegend: true, legendPos: "t", legendFontSize: 13, legendFontFace: "+mn-lt", legendColor: HEX.dk1 });
    const es = [[220000, "220.000 €"], [230000, "230.000 €"], [760000, "760.000 €"], [2100000, "2,1 milioni"]];
    s.addText("Lo stesso appalto, i due calcoli", { x: 9.2, y: 1.5, w: 3.55, h: 0.4, fontSize: 14, bold: true, color: C.text2, margin: 0, isTextBox: true });
    for (let i = 0; i < es.length; i++) {
      const y = 2.0 + i * 1.0;
      card(s, 9.2, y, 3.55, 0.88, i % 2 ? "FFF1F2" : C.background2);
      s.addText(es[i][1], { x: 9.35, y, w: 1.3, h: 0.88, fontSize: 14, bold: true, color: C.text2, valign: "middle", margin: 0, isTextBox: true });
      s.addText([{ text: eur(fondoAz(es[i][0], 1)), options: { color: ROSSO, bold: true, breakLine: true } },
        { text: eur(fondoCi(es[i][0], G1)), options: { color: HEX.accent1, bold: true } }],
        { x: 10.65, y, w: 1.95, h: 0.88, fontSize: 16, align: "right", valign: "middle", margin: 0, isTextBox: true });
    }
    s.addText("Una fornitura da 2,1 milioni prende meno di una da 220.000 €.", { x: 9.2, y: 6.05, w: 3.55, h: 0.6, fontSize: 13, italic: true, color: ROSSO, margin: 0, isTextBox: true });
    s.addNotes("Calcolo sulle tabelle C (forniture) dei due testi, soglia europea 221.000 €. Azienda media: 0,75% fino alla soglia, 0,40% fino a 750.000 €, 0,20% fino a 2 mln, 0,05% oltre, applicata a TUTTO l'importo. CISL grado 1: 1% fino a 250.000, 0,7% fino a 750.000, 0,4% fino a 2 mln, 0,2% fino a 10 mln, 0,1% oltre, ognuna sulla sua fascia. Onestà: su alcuni lavori medio-grandi la 'complessità elevata' dell'Azienda rende più della CISL (lavori da 2 mln: 30.000 € contro 23.125 €) — ma quel livello lo decide il RUP o il Direttore.");
  }
  {
    const s = pres.addSlide({ masterName: "CONTENUTO", sectionTitle: S6 });
    kicker(s, "Le tabelle originali");
    s.addText("Una aliquota sola contro gli scaglioni", { placeholder: "title" });
    s.addText("AZIENDA", { x: M, y: 1.4, w: 5.8, h: 0.35, fontSize: 14, bold: true, color: ROSSO, charSpacing: 3, margin: 0, isTextBox: true });
    await foglio(s, "inc-az-forniture", M + 0.08, 1.9, 5.8, FAZ + " · Tabella C", { maxH: 3.9 });
    s.addText("CISL FP", { x: 6.95, y: 1.4, w: 5.8, h: 0.35, fontSize: 14, bold: true, color: HEX.accent1, charSpacing: 3, margin: 0, isTextBox: true });
    await foglio(s, "inc-cisl-scaglioni", 7.03, 1.9, 5.6, FCI + " · Tabella C", { maxH: 3.9 });
    card(s, M, 6.1, W - 2 * M, 0.6, C.accent2);
    s.addText("Con gli scaglioni ogni euro in più porta incentivo in più: la fascia sopra la soglia non riduce quella sotto.",
      { x: M + 0.25, y: 6.1, w: W - 2 * M - 0.5, h: 0.6, fontSize: 15, bold: true, color: HEX.dk2, valign: "middle", margin: 0, isTextBox: true });
    s.addNotes("A sinistra la tabella forniture dell'Azienda (evidenziate le prime due righe: 0,35/0,75/1,50% fino alla soglia europea, poi 0,20/0,40/0,80%). A destra la tabella CISL a scaglioni.");
  }
  {
    const s = pres.addSlide({ masterName: "CONTENUTO", sectionTitle: S6 });
    kicker(s, "Chi lavora davvero");
    s.addText("Il fondo va a chi segue il contratto", { placeholder: "title" });
    const p = [["40%", "al Direttore dei lavori con il suo ufficio (Azienda: 20% + 15%)"], ["40%", "al DEC con i collaboratori nelle forniture (Azienda: 20% + 15%)"],
      ["60%", "minimo ai collaboratori sulla quota di ogni funzione"], ["15%", "massimo alla dirigenza nella fase di esecuzione"]];
    for (let i = 0; i < p.length; i++) {
      const y = 1.55 + i * 1.15;
      card(s, M, y, 6.0, 1.0, i % 2 ? "FFFFFF" : C.background2, { bordo: i % 2 ? "D9EADD" : undefined });
      s.addText(p[i][0], { x: M + 0.2, y, w: 1.5, h: 1.0, fontSize: 32, bold: true, color: HEX.accent1, valign: "middle", margin: 0, isTextBox: true });
      s.addText(p[i][1], { x: M + 1.75, y, w: 4.1, h: 1.0, fontSize: 15, color: C.text1, valign: "middle", margin: 0, isTextBox: true });
    }
    await foglio(s, "inc-cisl-fittizie", 7.15, 1.7, 5.5, FCI + " · art. 3");
    card(s, 7.07, 3.9, 5.66, 2.4, HEX.dk2);
    s.addText([{ text: "Basta nomine di carta", options: { fontSize: 20, bold: true, color: HEX.accent2, breakLine: true } },
      { text: "Il DEC deve essere chi segue davvero il contratto sul campo. E una nomina arrivata in ritardo non fa perdere l'incentivo a chi il lavoro l'ha fatto.", options: { fontSize: 15, color: "FFFFFF" } }],
      { x: 7.3, y: 4.0, w: 5.2, h: 2.2, valign: "middle", margin: 0, isTextBox: true });
    s.addNotes("Ripartizione forniture CISL: supporto 18%, DEC e collaboratori 40%, flussi informativi 5%, RUP 13%. Azienda: supporto 14%, DEC 20%, collaboratori 15%, RUP 11%. Nella proposta CISL c'è anche un registro delle attività e il cumulo automatico delle quote per chi svolge più funzioni; l'assicurazione grava sul fondo solo per progettisti e verificatori.");
  }
  {
    const s = pres.addSlide({ masterName: "CONTENUTO", sectionTitle: S6 });
    kicker(s, "Quando arrivano i soldi");
    s.addText("Un anno e mezzo di attesa, o trenta giorni", { placeholder: "title" });
    s.addText("AZIENDA", { x: M, y: 1.4, w: 5.8, h: 0.35, fontSize: 14, bold: true, color: ROSSO, charSpacing: 3, margin: 0, isTextBox: true });
    await foglio(s, "inc-az-31-luglio", M + 0.08, 1.9, 5.8, FAZ + " · art. 9");
    await foglio(s, "inc-az-debito-orario", M + 0.08, 3.4, 5.8, FAZ + " · art. 9");
    card(s, M, 4.95, 5.95, 1.55, "FFF1F2", { bordo: ROSSO });
    s.addText([{ text: "31 luglio dell'anno dopo", options: { bold: true, color: ROSSO, fontSize: 18, breakLine: true } },
      { text: "dopo il gruppo di controllo, e niente incentivo a chi ha debito orario: anche se il lavoro è fatto.", options: { fontSize: 14, color: C.text1 } }],
      { x: M + 0.2, y: 4.95, w: 5.55, h: 1.55, valign: "middle", margin: 0, isTextBox: true });
    s.addText("CISL FP", { x: 6.95, y: 1.4, w: 5.8, h: 0.35, fontSize: 14, bold: true, color: HEX.accent1, charSpacing: 3, margin: 0, isTextBox: true });
    await foglio(s, "inc-cisl-30-giorni", 7.03, 1.9, 5.6, FCI + " · art. 8");
    const t = [["30 gg", "verifica"], ["10 gg", "nota"], ["10 gg", "autorizzazione o silenzio-assenso"], ["30 gg", "pagamento"]];
    for (let i = 0; i < t.length; i++) {
      const x = 6.95 + i * 1.47;
      card(s, x, 3.55, 1.37, 2.95, i === 3 ? HEX.accent1 : C.background2);
      s.addText(t[i][0], { x, y: 3.7, w: 1.37, h: 0.8, fontSize: 24, bold: true, color: i === 3 ? "FFFFFF" : HEX.accent1, align: "center", margin: 0, isTextBox: true });
      s.addText(t[i][1], { x: x + 0.08, y: 4.55, w: 1.21, h: 1.8, fontSize: 13, color: i === 3 ? "FFFFFF" : C.text1, align: "center", valign: "top", margin: 0, isTextBox: true });
    }
    s.addNotes("CISL: pagamento per fasi (circa 45% / 52-53% / 2-3%), con termini certi e silenzio-assenso sull'autorizzazione. Azienda: pagamento disposto dalla UOC Risorse Umane entro il 31 luglio, dopo il gruppo di controllo interno (art. 13); presupposto l'assenza di debito orario.");
  }
  {
    const s = pres.addSlide({ masterName: "CONTENUTO", sectionTitle: S6 });
    kicker(s, "Se il contratto va in ritardo");
    s.addText("Chi paga i ritardi che non dipendono da te?", { placeholder: "title" });
    numero(s, "100%", "di taglio nella proposta dell'Azienda, se il ritardo supera il doppio dei tempi previsti", M, 1.4, 3.0, { colore: ROSSO, size: 60 });
    numero(s, "50%", "il taglio massimo nella proposta CISL, con la prova a carico dell'Azienda", M + 3.2, 1.4, 3.0, { size: 60 });
    await foglio(s, "inc-az-riduzioni", M + 0.08, 3.75, 5.9, FAZ + " · art. 10", { maxH: 2.6 });
    await foglio(s, "inc-cisl-onere-prova", 7.03, 1.7, 5.6, FCI + " · art. 10");
    card(s, 6.95, 3.55, 5.75, 2.95, C.background2);
    s.addText([{ text: "Nella proposta CISL", options: { bold: true, color: HEX.accent1, fontSize: 17, breakLine: true } },
      { text: "7 giorni per rispondere alla contestazione", options: { bullet: true, breakLine: true } },
      { text: "nessun taglio per colpe dell'impresa, varianti o forza maggiore", options: { bullet: true, breakLine: true } },
      { text: "regola chiara sugli aumenti di costo (comma 2-bis)", options: { bullet: true } }],
      { x: 7.15, y: 3.7, w: 5.35, h: 2.65, fontSize: 15, color: C.text1, valign: "top", margin: 0, isTextBox: true, paraSpaceAfter: 8 });
    s.addNotes("Azienda art. 10: riduzioni a scaglioni fino all'80% (ritardi tra 71% e 100%) e al 100% (oltre il 100% dei tempi previsti). CISL art. 10: massimo 50%, onere di dare evidenza documentata a carico dell'Azienda, contraddittorio di 7 giorni, esclusioni per fatti dell'operatore economico.");
  }
  {
    const s = pres.addSlide({ masterName: "CONTENUTO", sectionTitle: S6 });
    kicker(s, "Trasparenza e risorse");
    s.addText("I soldi degli incentivi restano dei lavoratori", { placeholder: "title" });
    const c3 = [["FaChartBar", "Relazione annuale", "a RSU e sindacati entro 30 giorni: chi ha preso cosa, su quale appalto"],
      ["FaLock", "Mai economie", "le risorse non usate restano vincolate agli incentivi, non tornano al bilancio"],
      ["FaHistory", "Arretrati dal 1/7/2023", "l'Azienda deve metterli a disposizione. Nella sua proposta: «compatibilmente con l'effettiva disponibilità»"]];
    for (let i = 0; i < 3; i++) {
      const x = M + i * 4.1;
      card(s, x, 1.55, 3.85, 2.75, C.background2);
      await tondo(s, c3[i][0], x + 0.25, 1.75, 0.7, HEX.accent1);
      s.addText(c3[i][1], { x: x + 0.25, y: 2.55, w: 3.4, h: 0.5, fontSize: 19, bold: true, color: C.text2, margin: 0, isTextBox: true });
      s.addText(c3[i][2], { x: x + 0.25, y: 3.05, w: 3.4, h: 1.2, fontSize: 14, color: C.text1, margin: 0, valign: "top", isTextBox: true });
    }
    await foglio(s, "inc-cisl-rsu", M + 0.08, 4.65, 6.6, FCI + " · art. 9");
    card(s, 7.55, 4.55, 5.2, 1.95, "FFF1F2", { bordo: ROSSO });
    s.addText([{ text: "Nella proposta dell'Azienda", options: { bold: true, color: ROSSO, breakLine: true } },
      { text: "un gruppo di controllo interno e un software: nessun resoconto ai rappresentanti dei lavoratori.", options: {} }],
      { x: 7.75, y: 4.55, w: 4.8, h: 1.95, fontSize: 15, color: C.text1, valign: "middle", margin: 0, isTextBox: true });
    s.addNotes("Azienda: art. 13 (gruppo di controllo interno) e art. 14 (utilizzo del software aziendale). CISL: relazione annuale, risorse non spese mai in economia, arretrati dal 1° luglio 2023 (data di efficacia del D.lgs. 36/2023) a carico dell'Azienda.");
  }
  {
    const s = pres.addSlide({ masterName: "DIVISORE", sectionTitle: S6 });
    s.addText("Cosa chiediamo", { placeholder: "title" });
    s.addText("Il punto 6 in cinque richieste", { placeholder: "body" });
    const cose = ["Scaglioni progressivi: il fondo non scende mai", "Complessità oggettiva, decisa all'inizio", "Pagamento in 30 giorni, senza vincolo del debito orario", "Tagli al massimo del 50%, prova a carico dell'Azienda", "Relazione a RSU e sindacati, arretrati dal 2023"];
    for (let i = 0; i < cose.length; i++) {
      const y = 0.65 + i * 1.16;
      card(s, 8.1, y, 4.65, 0.98, i % 2 ? "FFFFFF" : HEX.accent2);
      s.addText(cose[i], { x: 8.35, y, w: 4.25, h: 0.98, fontSize: 15, bold: true, color: HEX.dk2, valign: "middle", margin: 0, isTextBox: true });
    }
    s.addNotes("Richieste tratte dalla proposta CISL Rev 22. Da chiarire con Achille: stato della trattativa e significato della nota in fondo alla rev.5 («Non è specificato la quota 80% e 20%, le commesse di riferimento…»).");
  }
  slideDomande(S6, "Incentivi per le funzioni tecniche").addNotes("Spazio domande sul punto 6.");


  // ------------------------------------------------ 7 · andamenti occupazionali
  const S7 = "7 · Andamenti occupazionali";
  pres.addSection({ title: S7 });
  {
    const s = pres.addSlide({ masterName: "DIVISORE", sectionTitle: S7 });
    s.addText("07", { x: M, y: 0.7, w: 4, h: 2.2, fontSize: 150, bold: true, color: C.accent2, margin: 0, isTextBox: true });
    s.addText("Quanti entrano, quanti escono", { placeholder: "title" });
    s.addText("Gli andamenti occupazionali presentati dall'Azienda il 18 novembre", { placeholder: "body" });
    card(s, 9.4, 1.4, 3.3, 4.6, "3A0A10", { bordo: "E2001A" });
    s.addText([{ text: "−103", options: { fontSize: 66, bold: true, color: HEX.accent2, breakLine: true } },
      { text: "infermieri rispetto a gennaio 2020", options: { fontSize: 18, bold: true, color: "FFFFFF", breakLine: true } },
      { text: "intanto +219 OSS e +117 medici", options: { fontSize: 14, color: "F3D6DA" } }],
      { x: 9.6, y: 1.7, w: 2.9, h: 4, align: "center", valign: "middle", margin: 0, isTextBox: true });
    s.addNotes("Dal grafico «Variazione teste rispetto al 1° gennaio 2020» dell'Azienda: infermieri al massimo +220 (fine 2021), minimo −124, ultimo valore −103; OSS +219 (picco +222); dirigenti medici +117.");
  }
  await fotoPiena(S7, "08-postazione-vuota", "Dietro ogni numero c'è un turno scoperto.", "Quanti entrano, quanti escono: i dati dell'Azienda");
  await videoSlide(S7, "07-occupazione", "Quanti entrano, quanti escono");
  {
    const s = pres.addSlide({ masterName: "SCURO", sectionTitle: S7 });
    kicker(s, "Dal 2020 a oggi", HEX.accent2);
    s.addText("Gli infermieri sono gli unici in calo", { placeholder: "title" });
    const n = [["+219", "OSS", HEX.accent6], ["+117", "dirigenti medici", HEX.accent6], ["−103", "infermieri", "FF4D5E"]];
    for (let i = 0; i < 3; i++) {
      const y = 1.6 + i * 1.6;
      card(s, M, y, 4.2, 1.4, i === 2 ? "3A0A10" : "13301F", { bordo: i === 2 ? "E2001A" : "1F4A31" });
      s.addText(n[i][0], { x: M + 0.25, y, w: 2.2, h: 1.4, fontSize: 46, bold: true, color: n[i][2], valign: "middle", margin: 0, isTextBox: true });
      s.addText(n[i][1], { x: M + 2.45, y, w: 1.65, h: 1.4, fontSize: 17, bold: true, color: "FFFFFF", valign: "middle", margin: 0, isTextBox: true });
    }
    s.addText("A fine 2021 gli infermieri erano 220 in più del 2020. Oggi sono 103 in meno.", { x: M, y: 6.35, w: 4.4, h: 0.6, fontSize: 13, italic: true, color: "CFE9D8", margin: 0, isTextBox: true });
    await fotoTavolo(s, "occupazione-grafico", 5.3, 1.6, 7.4, TAVOLO + " · variazione rispetto al 1° gennaio 2020", { scuro: true });
    s.addNotes("Messaggio: gli OSS crescono (anche grazie alla dichiarazione del 23/12/2025), ma il buco vero è sugli infermieri. Collegamento con il calo degli iscritti a Infermieristica (−20% in Veneto, dati della puntata di Tv7) e con le richieste del punto 8.");
  }
  {
    const s = pres.addSlide({ masterName: "CONTENUTO", sectionTitle: S7 });
    kicker(s, "Le teste, profilo per profilo");
    s.addText("Quante persone lavorano in AOUP", { placeholder: "title" });
    const t = [["Profilo", "31/12/2025", "30/09/2026", "Stima 31/12/2026", "Differenza"],
      ["Infermieri", "2.746", "2.757", "2.720", "−26"], ["OSS", "1.140", "1.179", "1.209", "+69"],
      ["Tecnici e riabilitazione", "477", "493", "502", "+25"], ["Amministrativi e professionali", "463", "477", "482", "+19"],
      ["Ruolo tecnico", "190", "184", "196", "+6"], ["Dirigenti medici", "868", "878", "902", "+34"],
      ["Dirigenti sanitari e PTA", "103", "106", "117", "+14"], ["Totale", "5.987", "6.074", "6.128", "+141"]];
    s.addTable(t.map((r, i) => r.map((c, j) => ({ text: c, options: {
      bold: i === 0 || j === 0 || j === 4 || i === 8, fontSize: i === 0 ? 12 : 15,
      color: i === 0 || i === 8 ? "FFFFFF" : (j === 4 ? (c.startsWith("−") ? HEX.accent3 : HEX.accent1) : HEX.dk1),
      fill: { color: i === 0 || i === 8 ? HEX.dk2 : (i === 1 ? "FFF1F2" : (i % 2 ? "FFFFFF" : HEX.lt2)) },
      align: j > 0 ? "center" : "left", valign: "middle" } }))),
      { x: M, y: 1.55, w: 7.4, colW: [2.6, 1.15, 1.15, 1.35, 1.15], rowH: 0.5, border: { type: "solid", color: "D9EADD", pt: 1 }, margin: 0.08 });
    s.addText("Stima a fine anno dell'Azienda: piano assunzioni di settembre (+208) meno le cessazioni previste (−154). Infermieri: 38 assunzioni contro 75 uscite.",
      { x: M, y: 6.25, w: 7.4, h: 0.6, fontSize: 12, italic: true, color: "5B6B62", margin: 0, isTextBox: true });
    await fotoTavolo(s, "occupazione-teste", 8.35, 1.6, 4.35, TAVOLO);
    card(s, 8.3, 4.85, 4.45, 1.65, C.accent2);
    s.addText([{ text: "Su 141 persone in più nel 2026, ", options: {} }, { text: "gli infermieri sono 26 in meno.", options: { bold: true } }],
      { x: 8.5, y: 4.9, w: 4.05, h: 1.55, fontSize: 17, color: HEX.dk2, valign: "middle", margin: 0, isTextBox: true });
    s.addNotes("Tabella «Andamento occupazionale – Teste» dell'Azienda. Dirigenti sanitari (85 → 91, +9) e dirigenti PTA (21 → 26, +5) sono sommati in una riga. Per gli infermieri il piano di settembre prevede 38 assunzioni contro 75 cessazioni stimate.");
  }
  {
    const s = pres.addSlide({ masterName: "CONTENUTO", sectionTitle: S7 });
    kicker(s, "Gennaio-ottobre 2026 · assunzioni e cessazioni");
    s.addText("Chi è entrato e chi è uscito", { placeholder: "title" });
    const l = ["Infermieri", "OSS", "Tecnici e riabilitazione", "Amministrativi", "Ruolo tecnico"];
    s.addChart(pres.charts.BAR, [{ name: "Assunzioni", labels: l, values: [182, 92, 47, 37, 14] }, { name: "Cessazioni", labels: l, values: [197, 55, 33, 26, 16] }], {
      x: M, y: 1.45, w: 7.4, h: 5.0, barDir: "col", barGrouping: "clustered", chartColors: [HEX.accent1, HEX.accent3],
      showValue: true, dataLabelPosition: "outEnd", dataLabelFontSize: 12, dataLabelColor: HEX.dk1, dataLabelFontFace: "+mn-lt",
      catAxisLabelFontSize: 13, catAxisLabelColor: HEX.dk1, catAxisLabelFontFace: "+mn-lt", valAxisHidden: true,
      valGridLine: { style: "none" }, catGridLine: { style: "none" }, showLegend: true, legendPos: "t", legendFontSize: 13,
      legendFontFace: "+mn-lt", legendColor: HEX.dk1, showTitle: false, barGapWidthPct: 60 });
    const d = [["−15", "infermieri", HEX.accent3], ["+37", "OSS", HEX.accent1], ["+14", "tecnici e riab.", HEX.accent1], ["+11", "amministrativi", HEX.accent1], ["−2", "ruolo tecnico", HEX.accent3]];
    for (let i = 0; i < d.length; i++) {
      const y = 1.6 + i * 0.68;
      s.addText(d[i][0], { x: 8.4, y, w: 1.3, h: 0.6, fontSize: 26, bold: true, color: d[i][2], align: "right", valign: "middle", margin: 0, isTextBox: true });
      s.addText(d[i][1], { x: 9.85, y, w: 2.9, h: 0.6, fontSize: 15, color: C.text1, valign: "middle", margin: 0, isTextBox: true });
    }
    await fotoTavolo(s, "occupazione-assunzioni-cessazioni", 8.45, 5.15, 3.4, TAVOLO, { maxH: 1.45, centra: 10.6 });
    s.addNotes("Tabelle «Assunzioni e cessazioni» gennaio-ottobre 2026. Nota dell'Azienda: non sono considerati i cambi di profilo e i passaggi da tempo determinato a indeterminato. Infermieri per dipartimento (lettura della foto, da verificare): Medicina dei sistemi −9, Chirurgia +5, Salute donna e bambino +4, Servizi in staff −11, Servizi diagnostica integrata −4.");
  }
  {
    const s = pres.addSlide({ masterName: "DIVISORE", sectionTitle: S7 });
    s.addText("Cosa chiediamo", { placeholder: "title" });
    s.addText("Il punto 7 in quattro richieste", { placeholder: "body" });
    const cose = ["Un piano straordinario di assunzioni di infermieri", "Concorso di Azienda Zero: graduatoria subito utilizzabile", "Il tavolo bimestrale sul personale, come promesso a dicembre", "Trattenere chi c'è: carichi, turni, valorizzazione"];
    for (let i = 0; i < cose.length; i++) {
      const y = 0.9 + i * 1.4;
      card(s, 8.1, y, 4.65, 1.15, i % 2 ? "FFFFFF" : HEX.accent2);
      s.addText(cose[i], { x: 8.35, y, w: 4.25, h: 1.15, fontSize: 16, bold: true, color: HEX.dk2, valign: "middle", margin: 0, isTextBox: true });
    }
    s.addNotes("Richieste proposte, da confermare con Achille. Il tavolo permanente bimestrale sul fabbisogno è nella dichiarazione congiunta del 23/12/2025.");
  }
  slideDomande(S7, "Andamenti occupazionali").addNotes("Spazio domande sul punto 7.");

  // ------------------------------------------------ 8 · retention e benessere (blocco OSS di notte)
  const S8 = "8 · Retention e benessere organizzativo";
  pres.addSection({ title: S8 });
  {
    const s = pres.addSlide({ masterName: "DIVISORE", sectionTitle: S8 });
    s.addText("08", { x: M, y: 0.7, w: 4, h: 2.2, fontSize: 150, bold: true, color: C.accent2, margin: 0, isTextBox: true });
    s.addText("Retention e benessere", { placeholder: "title" });
    s.addText("Restare in AOUP deve valere la pena. Si comincia dalle notti.", { placeholder: "body" });
    card(s, 9.4, 1.4, 3.3, 4.6, "0B4D28");
    s.addText([{ text: "63%", options: { fontSize: 66, bold: true, color: HEX.accent2, breakLine: true } },
      { text: "delle aree di degenza ha un OSS di notte", options: { fontSize: 18, bold: true, color: "FFFFFF", breakLine: true } },
      { text: "31 aree su 49", options: { fontSize: 14, color: "CFE9D8" } }],
      { x: 9.6, y: 1.7, w: 2.9, h: 4, align: "center", valign: "middle", margin: 0, isTextBox: true });
  }
  await fotoPiena(S8, "09-alba-orologio", "Alle cinque del mattino si misura un'organizzazione.", "OSS di notte, la notte di 12 ore, vestizione, ferie");
  await videoSlide(S8, "08-oss-notte", "Più OSS di notte");
  await ricostruzione(S8, "23-oss-notte", "Di notte, in reparto", "Un paio di mani in più cambia la notte.", "Mobilizzare, alzare, rassicurare: di notte l'infermiere è spesso solo con troppi letti. Un OSS in più fa la differenza per i pazienti e per chi lavora.", "Collegamento con i reparti individuati per l'OSS di notte.");
  {
    const s = pres.addSlide({ masterName: "CONTENUTO", sectionTitle: S8 });
    kicker(s, "OSS di notte · l'analisi dell'Azienda");
    s.addText("Dove c'è già un OSS di notte", { placeholder: "title" });
    const a = ["Area medica", "Area chirurgica", "Area pediatrica", "Area ostetrica", "Terapie intensive"];
    s.addChart(pres.charts.BAR, [{ name: "UO con OSS di notte", labels: a, values: [85, 42, 33, 50, 67] }], {
      x: M, y: 1.5, w: 6.4, h: 4.6, barDir: "bar", chartColors: [HEX.accent1, HEX.accent3, HEX.accent3, HEX.accent1, HEX.accent1], invertedColors: [HEX.accent1],
      showValue: true, dataLabelPosition: "outEnd", dataLabelFormatCode: '0"%"', dataLabelFontSize: 14, dataLabelColor: HEX.dk1, dataLabelFontFace: "+mn-lt",
      catAxisLabelFontSize: 15, catAxisLabelColor: HEX.dk1, catAxisLabelFontFace: "+mn-lt", valAxisHidden: true, valAxisMaxVal: 100,
      valGridLine: { style: "none" }, catGridLine: { style: "none" }, showLegend: false, showTitle: false, barGapWidthPct: 50 });
    s.addText("17 UO su 20 in medica · 5 su 12 in chirurgica · 2 su 6 in pediatria · 1 su 2 in ostetricia · 6 su 9 nelle intensive", { x: M, y: 6.2, w: 6.5, h: 0.5, fontSize: 12, italic: true, color: "5B6B62", margin: 0, isTextBox: true });
    card(s, 7.3, 1.6, 2.6, 1.6, C.background2);
    s.addText([{ text: "16", options: { fontSize: 40, bold: true, color: HEX.accent1, breakLine: true } }, { text: "aree con OSS di notte nuovo o aumentato dal 2020", options: { fontSize: 12 } }],
      { x: 7.45, y: 1.65, w: 2.35, h: 1.5, color: HEX.dk1, valign: "middle", margin: 0, isTextBox: true });
    card(s, 10.1, 1.6, 2.65, 1.6, "FFF1F2");
    s.addText([{ text: "42%", options: { fontSize: 40, bold: true, color: HEX.accent3, breakLine: true } }, { text: "le chirurgie sono le più scoperte", options: { fontSize: 12 } }],
      { x: 10.25, y: 1.65, w: 2.4, h: 1.5, color: HEX.dk1, valign: "middle", margin: 0, isTextBox: true });
    await fotoTavolo(s, "oss-aree-degenza", 7.4, 3.5, 5.3, TAVOLO);
    s.addNotes("Slide «Aree di degenza» dell'Azienda: 31 aree di degenza con OSS alla notte (63%); 16 aree dove l'OSS è stato neo-introdotto (12) o incrementato (4) dopo il 2020 (52%). Standard di riferimento della degenza ordinaria: 1 infermiere ogni 12-15 posti letto nelle 24 ore.");
  }
  {
    const s = pres.addSlide({ masterName: "CONTENUTO", sectionTitle: S8 });
    kicker(s, "Le chirurgie individuate");
    s.addText("Dove un infermiere copre troppi letti", { placeholder: "title" });
    const c = [["19", "letti per infermiere", "Chirurgia 7° piano Policlinico", "presenza del Pronto Soccorso h24"],
      ["13,5", "letti per infermiere", "Chirurgia 6° piano Policlinico", "ricoveri urgenti h24"],
      ["12,5", "letti per infermiere", "Neurochirurgia", "trasporti notturni verso la neuroradiologia, autogestiti"]];
    for (let i = 0; i < c.length; i++) {
      const y = 1.55 + i * 1.6;
      card(s, M, y, 6.6, 1.4, i === 0 ? "FFF1F2" : C.background2);
      s.addText(c[i][0], { x: M + 0.2, y: y + 0.1, w: 1.7, h: 0.8, fontSize: 40, bold: true, color: i === 0 ? C.accent3 : C.accent1, align: "center", margin: 0, isTextBox: true });
      s.addText(c[i][1], { x: M + 0.2, y: y + 0.88, w: 1.7, h: 0.4, fontSize: 11, color: C.text1, align: "center", margin: 0, isTextBox: true });
      s.addText([{ text: c[i][2], options: { bold: true, fontSize: 17, breakLine: true } }, { text: "nessun OSS di notte · " + c[i][3], options: { fontSize: 13 } }],
        { x: M + 2.1, y: y + 0.1, w: 4.35, h: 1.2, color: C.text2, valign: "middle", margin: 0, isTextBox: true });
    }
    card(s, M, 6.35, 6.6, 0.55, C.text2);
    s.addText("Standard regionale della degenza: 1 infermiere ogni 12-15 letti nelle 24 ore", { x: M + 0.2, y: 6.35, w: 6.2, h: 0.55, fontSize: 13, bold: true, color: "FFFFFF", valign: "middle", margin: 0, isTextBox: true });
    await fotoTavolo(s, "oss-area-chirurgica", 7.6, 1.6, 5.1, TAVOLO + " · area chirurgica adulti");
    s.addNotes("Tabella «Area chirurgica adulti» dell'Azienda (rapporto infermiere:posti letto, OSS notte, note). Righe evidenziate dall'Azienda: 6° piano 13,50 (ricoveri urgenti H24), 7° piano 19,00 (presenza di PS H24), Neurochirurgia 12,50 (trasporti notturni verso neuro RX autogestiti). Nell'area medica è evidenziata l'Area degenza medica 8° piano Policlinico (18,00). Premessa: dichiarazione congiunta del 23/12/2025 → autorizzazione CRITE per assunzioni extra turn-over entro il tetto di spesa, per AOUP e Nuova Pediatria. Verificare la lettura delle righe sulla foto.");
  }
  {
    const s = pres.addSlide({ masterName: "SCURO", sectionTitle: S8 });
    kicker(s, "OSS di notte · cosa succede adesso", HEX.accent2);
    s.addText("Più OSS di notte: tempi e regole", { placeholder: "title" });
    const p = [["FaUserPlus", "Gradualmente", "l'Azienda si impegna ad aumentare gli OSS di notte nei reparti individuati"],
      ["FaHourglassHalf", "Al ritmo delle assunzioni", "graduatoria AOUP esaurita, quelle di ULSS 6 e ULSS 3 quasi; a breve il concorso di Azienda Zero"],
      ["FaBaby", "Nuova Pediatria", "OSS al PS pediatrico per la notte e una squadra trasporti interna alla Salus Pueri"]];
    for (let i = 0; i < p.length; i++) {
      const y = 1.6 + i * 1.35;
      await tondo(s, p[i][0], M, y, 0.8, HEX.accent1);
      s.addText(p[i][1], { x: M + 1.0, y: y - 0.02, w: 6.4, h: 0.45, fontSize: 19, bold: true, color: HEX.accent2, margin: 0, isTextBox: true });
      s.addText(p[i][2], { x: M + 1.0, y: y + 0.43, w: 6.4, h: 0.75, fontSize: 14, color: "FFFFFF", margin: 0, valign: "top", isTextBox: true });
    }
    card(s, M, 5.65, 7.4, 1.05, "3A0A10", { bordo: "E2001A" });
    s.addText([{ text: "Per gli OSS già in reparto: ", options: { bold: true, color: HEX.accent2 } },
      { text: "i turni passano da mattina-pomeriggio a mattina-pomeriggio-notte. Si raccolgono le preferenze e, se serve, si fa mobilità incrociata.", options: { color: "FFFFFF" } }],
      { x: M + 0.2, y: 5.7, w: 7.0, h: 0.95, fontSize: 14, valign: "middle", margin: 0, isTextBox: true });
    await fotoTavolo(s, "oss-notte-sviluppi", 8.45, 1.6, 4.25, TAVOLO, { scuro: true });
    await fotoTavolo(s, "oss-nuova-pediatria", 8.45, 5.3, 4.25, "Nuova Pediatria", { scuro: true, maxH: 1.25, centra: 10.575 });
    s.addNotes("Slide «Sviluppi» e «Azioni in atto – Nuova Pediatria» dell'Azienda. Punto da presidiare per il sindacato: il passaggio da due a tre turni per gli OSS già assegnati, con raccolta delle preferenze e mobilità incrociata.");
  }

  await videoSlide(S8, "09-notte-12-ore", "La notte di 12 ore: decidere informati");
  // ---- 8 · blocco «La notte di 12 ore» (dossier CISL FP, ottobre 2026) e ferie
  const FDOS = "Dossier CISL FP «La notte di 12 ore» · ottobre 2026";
  const RS = "C8102E";
  {
    const s = pres.addSlide({ masterName: "SCURO", sectionTitle: S8 });
    kicker(s, "Organizzazione del lavoro", HEX.accent2);
    s.addText("La notte di 12 ore: decidere informati", { placeholder: "title" });
    const t = [["", "Oggi", "Proposta", "Differenza"], ["Mattina", "6h 22'", "6h 15'", "− 7'"], ["Pomeriggio", "7h 15'", "6h 15'", "− 1 ora"], ["Notte", "11h 15'", "12h 00'", "+ 45'"],
      ["Consegne al giorno", "52'", "30'", "− 42%"], ["Consegna per passaggio", "≈ 17'", "10'", "− 7'"]];
    s.addTable(t.map((r, i) => r.map((c, j) => ({ text: c, options: { bold: i === 0 || j === 0 || j === 3, fontSize: i === 0 ? 13 : 17,
      color: i === 0 ? HEX.dk2 : (j === 3 ? (c.startsWith("+") || c.includes("%") || c.startsWith("− 7'") && i === 5 ? "FF6B7A" : HEX.accent6) : "FFFFFF"),
      fill: { color: i === 0 ? HEX.accent2 : (i % 2 ? "13301F" : "0F2819") }, align: j ? "center" : "left", valign: "middle" } }))),
      { x: M, y: 1.6, w: 7.6, colW: [2.8, 1.5, 1.6, 1.7], rowH: 0.62, border: { type: "solid", color: "1F4A31", pt: 1 }, margin: 0.1 });
    card(s, 8.6, 1.6, 4.15, 3.7, "3A0A10", { bordo: "E2001A" });
    s.addText([{ text: "«Nessun cambiamento al buio»", options: { fontSize: 20, bold: true, color: HEX.accent2, breakLine: true } },
      { text: "Si può valutare solo con garanzie scritte su pause, consegne, debito orario, assenze improvvise, tutele per chi non deve fare notti, e una verifica condivisa a sei mesi.", options: { fontSize: 15, color: "FFFFFF" } }],
      { x: 8.8, y: 1.75, w: 3.75, h: 3.4, valign: "middle", margin: 0, isTextBox: true });
    s.addText("Le richieste nascono dai lavoratori per conciliare vita e lavoro: una parte del personale resterà comunque su tre turni.", { x: 8.6, y: 5.5, w: 4.15, h: 1.0, fontSize: 13, italic: true, color: "CFE9D8", margin: 0, isTextBox: true });
    s.addNotes("Modelli discussi il 3/11/2026: base 6+6+12 (diurni da 6h15'/6h22' e notte da 12h) o turni diurni da 12h. Iter: richiesta formale di Direttore e Coordinatore dell'UO, valutazione delle Direzioni, verifica della volontarietà, informazione sindacale. Dati dal dossier CISL FP, pag. 2-3.");
  }
  await ricostruzione(S8, "24-cambio-turno", "Ore 7, cambio turno", "Dieci minuti per passare un reparto.", "Oggi il passaggio di consegne dura in media 17 minuti. Con la notte di 12 ore ne restano 10. Bastano, con i pazienti del tuo reparto?", "Dossier CISL FP sulla notte di 12 ore, pag. 2-3.");
  {
    const s = pres.addSlide({ masterName: "CONTENUTO", sectionTitle: S8 });
    kicker(s, "Simulazione 2027 · per ogni operatore in quinta", RS);
    s.addText("I 22 minuti persi diventano rientri", { placeholder: "title" });
    const mesi = ["gen", "feb", "mar", "apr", "mag", "giu", "lug", "ago", "set", "ott", "nov", "dic"];
    const att = [10.17, 5.43, 3.6, -3.2, 0.97, 0.17, -7.65, -9.48, -16.28, -18.1, -18.9, -14.73];
    const pro = [7.9, 1.1, -3, -12, -10.1, -13.1, -23.2, -27.3, -36.3, -40.4, -43.4, -41.5];
    s.addChart(pres.charts.LINE, [{ name: "Modello attuale", labels: mesi, values: att }, { name: "Notte di 12 ore", labels: mesi, values: pro }], {
      x: M, y: 1.45, w: 7.6, h: 5.1, chartColors: [HEX.accent1, RS], lineSize: 3, lineDataSymbol: "circle", lineDataSymbolSize: 6,
      catAxisLabelFontSize: 12, catAxisLabelColor: HEX.dk1, catAxisLabelFontFace: "+mn-lt", valAxisLabelFontSize: 12, valAxisLabelColor: HEX.dk1, valAxisLabelFontFace: "+mn-lt",
      valAxisTitle: "saldo ore cumulato", showValAxisTitle: true, valAxisTitleFontSize: 12, valAxisTitleColor: "5B6B62",
      valGridLine: { color: "E3EEE6", size: 0.5 }, catGridLine: { style: "none" }, showLegend: true, legendPos: "t", legendFontSize: 13, legendFontFace: "+mn-lt", legendColor: HEX.dk1 });
    const n = [["15 h → 41 h", "debito orario a fine 2027", RS], ["2 → 7", "rientri di mattina all'anno per chiuderlo", RS], ["43 turni", "in più ogni 10 turnisti, da programmare", HEX.dk2]];
    for (let i = 0; i < n.length; i++) {
      const y = 1.6 + i * 1.65;
      card(s, 8.55, y, 4.2, 1.45, i < 2 ? "FFF1F2" : C.background2);
      s.addText(n[i][0], { x: 8.75, y: y + 0.1, w: 3.9, h: 0.7, fontSize: 28, bold: true, color: n[i][2], margin: 0, isTextBox: true });
      s.addText(n[i][1], { x: 8.75, y: y + 0.8, w: 3.9, h: 0.55, fontSize: 14, color: C.text1, margin: 0, isTextBox: true });
    }
    s.addNotes("Calcolo del dossier: 2027 = 305 giorni feriali × 6 h = 1.830 h dovute. Ciclo in quinta, 73 cicli: oggi 24h52' a ciclo = 1.815 h programmate; proposta 24h30' = 1.788 h. 73 × 22' = 26h46' in meno. Debito ≈ 15 h oggi, ≈ 41 h con la proposta. Ipotesi lorde, senza ferie e assenze: chiediamo la simulazione ufficiale sul piano turni 2027.");
  }
  {
    const s = pres.addSlide({ masterName: "CONTENUTO", sectionTitle: S8 });
    kicker(s, "Il rischio nascosto: le assenze improvvise", RS);
    s.addText("Con turni più corti, il doppio turno diventa possibile", { placeholder: "title" });
    card(s, M, 1.55, 4.6, 4.95, HEX.dk2);
    s.addText([{ text: "LA REGOLA DELLE 13 ORE", options: { fontSize: 13, bold: true, color: HEX.accent2, charSpacing: 3, breakLine: true } },
      { text: "11 ore di riposo ogni 24 (art. 7 D.Lgs. 66/2003): al massimo 13 ore di lavoro.", options: { fontSize: 16, color: "FFFFFF", breakLine: true } },
      { text: " ", options: { fontSize: 8, breakLine: true } },
      { text: "Mattina + pomeriggio", options: { fontSize: 15, bold: true, color: HEX.accent6, breakLine: true } },
      { text: "oggi 13h 15' → vietato", options: { fontSize: 22, bold: true, color: "FFFFFF", breakLine: true } },
      { text: "domani 12h 20' → si può chiedere", options: { fontSize: 22, bold: true, color: HEX.accent2 } }],
      { x: M + 0.25, y: 1.7, w: 4.1, h: 4.65, valign: "middle", margin: 0, isTextBox: true });
    const r = ["Il doppio turno come soluzione standard per ogni assenza", "Pomeriggio-mattina con 11h 40' di riposo per spostare i colleghi", "La notte scoperta: restano richiami dal riposo e reperibilità", "Turni che cambiano di continuo: figli e famiglia impossibili da organizzare", "Doppi turni, rientri e notti lunghe nella stessa settimana", "«Se non vieni tu il reparto resta scoperto»"];
    for (let i = 0; i < r.length; i++) {
      const col = i % 2, row = Math.floor(i / 2);
      const x = 5.5 + col * 3.65, y = 1.55 + row * 1.68;
      card(s, x, y, 3.5, 1.5, "FFF1F2");
      s.addText(String(i + 1), { x: x + 0.15, y: y + 0.12, w: 0.5, h: 0.5, fontSize: 22, bold: true, color: RS, margin: 0, isTextBox: true });
      s.addText(r[i], { x: x + 0.65, y: y + 0.1, w: 2.75, h: 1.3, fontSize: 13.5, color: C.text1, valign: "middle", margin: 0, isTextBox: true });
    }
    s.addNotes("Dossier pag. 9-10. Cosa chiediamo sulle assenze improvvise: piano di sostituzione che non pesi su chi è in turno; doppi turni e rientri rapidi solo volontari con un tetto mensile; nessun richiamo dallo smonto o dal riposo; ore in più pagate o recuperate; registro dei cambi d'urgenza verificato con la RSU. La carenza si risolve con le assunzioni.");
  }
  {
    const s = pres.addSlide({ masterName: "CONTENUTO", sectionTitle: S8 });
    kicker(s, "Guardare avanti, prima di firmare");
    s.addText("E se le 12 ore arrivassero anche di giorno?", { placeholder: "title" });
    const t = [["", "Oggi", "Notte di 12 h", "12 h giorno e notte"], ["Turni", "6h22' · 7h15' · 11h15'", "6h15' · 6h15' · 12h", "12h · 12h"], ["Turni nel 2027", "219", "219", "146"],
      ["Ore lavorate nel 2027", "1.815", "1.788", "1.752"], ["Debito orario 2027", "≈ 15 h", "≈ 41 h", "≈ 78 h"], ["Rientri per chiudere l'anno", "≈ 2 mattine", "≈ 7 mattine", "≈ 7 turni da 12 h"], ["Consegne", "52' al giorno", "30' al giorno", "nessuna sovrapposizione"]];
    s.addTable(t.map((r, i) => r.map((c, j) => ({ text: c, options: { bold: i === 0 || j === 0, fontSize: i === 0 ? 13 : 14.5,
      color: i === 0 ? "FFFFFF" : (j === 3 && i > 3 ? RS : HEX.dk1), fill: { color: i === 0 ? (j === 3 ? RS : HEX.dk2) : (i % 2 ? "FFFFFF" : HEX.lt2) }, align: j ? "center" : "left", valign: "middle" } }))),
      { x: M, y: 1.55, w: 8.0, colW: [2.4, 1.85, 1.85, 1.9], rowH: 0.6, border: { type: "solid", color: "D9EADD", pt: 1 }, margin: 0.08 });
    s.addText("Vantaggi veri: meno giorni in ospedale, riposi più lunghi, due consegne invece di tre. Ma ogni turno supera le 12 ore, e un'assenza si copre solo richiamando chi è a riposo.",
      { x: M, y: 5.95, w: 8.0, h: 0.75, fontSize: 13, italic: true, color: "5B6B62", margin: 0, isTextBox: true });
    card(s, 9.0, 1.55, 3.75, 5.1, C.accent2);
    s.addText([{ text: "Nessuna estensione automatica", options: { fontSize: 20, bold: true, breakLine: true } },
      { text: "Se si sperimenta la notte di 12 ore, l'accordo deve dire per iscritto che non è un passo verso le 12 ore di giorno. Quello servirebbe un nuovo accordo, dopo la verifica e dopo aver ascoltato il reparto.", options: { fontSize: 15 } }],
      { x: 9.2, y: 1.7, w: 3.35, h: 4.8, color: HEX.dk2, valign: "middle", margin: 0, isTextBox: true });
    s.addNotes("Dossier pag. 11-13. Ipotesi 12 h esatte (7-19 e 19-7) con ciclo G-N-S-R-R per tutto il 2027, stesso teorico di 6 ore per giorno feriale.");
  }
  {
    const s = pres.addSlide({ masterName: "SCURO", sectionTitle: S8 });
    kicker(s, "Cosa dicono gli studi", HEX.accent2);
    s.addText("Più lungo il turno, più alto il rischio", { placeholder: "title" });
    s.addChart(pres.charts.BAR, [{ name: "Rischio di incidenti rispetto a 8 ore", labels: ["8 ore", "10 ore", "12 ore"], values: [0, 13, 27.5] }], {
      x: M, y: 1.5, w: 6.0, h: 4.6, barDir: "col", chartColors: [HEX.accent6, HEX.accent2, "FF4D5E"], varyColors: true, showValue: true, dataLabelFormatCode: "+0.0\"%\";-0.0\"%\";\"base\"", dataLabelPosition: "outEnd",
      dataLabelFontSize: 16, dataLabelColor: "FFFFFF", dataLabelFontBold: true, catAxisLabelFontSize: 15, catAxisLabelColor: "FFFFFF", catAxisLabelFontFace: "+mn-lt", valAxisHidden: true,
      valGridLine: { style: "none" }, catGridLine: { style: "none" }, showLegend: false, barGapWidthPct: 70 });
    s.addText("Folkard & Tucker, Occupational Medicine 2003", { x: M, y: 6.15, w: 6, h: 0.3, fontSize: 11, italic: true, color: "B9D3C3", margin: 0, isTextBox: true });
    const st = [["31.627", "infermieri in 12 Paesi europei (RN4CAST): con turni ≥ 12 h più burnout, insoddisfazione e voglia di lasciare"], ["40% · 37%", "preferenze divise: tra 8 e 12 ore la metà degli infermieri sceglie l'una o l'altra"], ["11h15' → 12h", "da noi la notte cresce di 45 minuti: non è vietato né catastrofico, serve con contrappesi seri"]];
    for (let i = 0; i < st.length; i++) {
      const y = 1.55 + i * 1.6;
      card(s, 7.0, y, 5.75, 1.42, "13301F", { bordo: "1F4A31" });
      s.addText(st[i][0], { x: 7.2, y, w: 1.9, h: 1.42, fontSize: 20, bold: true, color: HEX.accent2, valign: "middle", margin: 0, isTextBox: true });
      s.addText(st[i][1], { x: 9.1, y, w: 3.5, h: 1.42, fontSize: 13, color: "FFFFFF", valign: "middle", margin: 0, isTextBox: true });
    }
    s.addNotes("Fonti nel dossier: Dall'Ora et al., BMJ Open 2015; Griffiths et al., Medical Care 2014; Stimpfel, Sloane, Aiken 2012; Rogers et al. 2004; Folkard & Tucker 2003; American Nurses Foundation 2022 (40% preferisce 8 ore, 37% 12 ore); IARC monografia 124 (lavoro notturno 2A). Onestà intellettuale: gli studi confrontano 12 contro 8 ore, qui l'aumento è di 45 minuti.");
  }
  {
    const s = pres.addSlide({ masterName: "CONTENUTO", sectionTitle: S8 });
    kicker(s, "La piattaforma CISL FP");
    s.addText("Le dodici condizioni per sperimentare", { placeholder: "title" });
    const c = ["Accordo scritto, non ordine di servizio", "Prova a tempo: 6 mesi, poi si può tornare indietro", "Pausa notturna vera: 30 minuti con chi copre", "Consegne protette: 15 minuti", "Debito orario trasparente: simulazione 2027", "Tutele per chi non deve fare notti",
      "Nessuno straordinario in coda alla notte", "Medico competente, RLS e DVR coinvolti", "Indicatori a 3 e 6 mesi, questionario anonimo", "Organici giusti, mai nei picchi stagionali", "Assenze improvvise: regole e registro con la RSU", "Nessuna estensione automatica alle 12 ore di giorno"];
    for (let i = 0; i < c.length; i++) {
      const col = i % 4, row = Math.floor(i / 4);
      const x = M + col * 3.07, y = 1.5 + row * 1.68;
      card(s, x, y, 2.9, 1.5, row === 1 ? C.background2 : (row === 0 ? "FFFFFF" : C.background2), { bordo: "D9EADD" });
      s.addText(String(i + 1).padStart(2, "0"), { x: x + 0.15, y: y + 0.1, w: 0.7, h: 0.45, fontSize: 20, bold: true, color: HEX.accent1, margin: 0, isTextBox: true });
      s.addText(c[i], { x: x + 0.15, y: y + 0.55, w: 2.6, h: 0.9, fontSize: 13.5, bold: true, color: C.text2, valign: "top", margin: 0, isTextBox: true });
    }
    s.addNotes("Dossier pag. 18. Da proporre all'assemblea di reparto: discutere, integrare, approvare. Prossimi passi: assemblea, sondaggio anonimo, tavolo con l'Azienda, ritorno in assemblea con l'esito.");
  }
  await ricostruzione(S8, "22-spogliatoio", "Ore 6:40, spogliatoio", "Vestirsi è già lavoro.", "Il contratto conta il tempo di vestizione e consegna. Il 3 novembre si è parlato di passare da 15 a 20-22 minuti: si decide al tavolo, non per ordine di servizio.", "Riunione del 3/11/2026.");
  {
    const s = pres.addSlide({ masterName: "CONTENUTO", sectionTitle: S8 });
    kicker(s, "Vestizione e consegne");
    s.addText("Flessibilità sì. Scorciatoie no.", { placeholder: "title" });
    const vol = path.join(QUI, "..", "documenti", "volantini", "turni-12-ore-scelta.png");
    const dv = await dimensioni(vol); const hv = 5.1, wv = hv * dv.w / dv.h;
    s.addImage({ path: vol, x: W - M - wv, y: 1.4, w: wv, h: hv, altText: "Volantino CISL FP: turni da 12 ore, sì alla scelta dei lavoratori, no agli automatismi",
      shadow: { type: "outer", color: "06381F", opacity: 0.22, blur: 14, offset: 4, angle: 90 } });
    numero(s, "15 → 20-22'", "i minuti di vestizione e consegna di cui si è parlato il 3 novembre", M, 1.45, 7.5, { size: 46, colore: RS });
    const p = [["FaCheckCircle", "Sì alla volontà dei lavoratori", "il modello si adotta se lo chiede il reparto, non per decisione unilaterale"],
      ["FaTimesCircle", "No ad automatismi sulla vestizione", "i tempi di vestizione e consegna si decidono solo al tavolo di contrattazione"],
      ["FaBalanceScale", "Un regolamento aziendale", "regole chiare e uguali per tutti, e la possibilità di rivedere i modelli se non funzionano"]];
    for (let i = 0; i < p.length; i++) {
      const y = 3.55 + i * 1.0;
      await tondo(s, p[i][0], M, y, 0.7, i === 1 ? RS : HEX.accent1);
      s.addText(p[i][1], { x: M + 0.9, y: y - 0.05, w: 6.6, h: 0.4, fontSize: 17, bold: true, color: C.text2, margin: 0, isTextBox: true });
      s.addText(p[i][2], { x: M + 0.9, y: y + 0.35, w: 6.6, h: 0.5, fontSize: 13.5, color: C.text1, margin: 0, isTextBox: true });
    }
    s.addNotes("Riunione del 3/11/2026: la CISL FP ha evidenziato che l'estensione dei tempi di vestizione e consegna (da 15 a 20-22 minuti) e i cambi d'orario richiedono un regolamento condiviso e il passaggio al tavolo di contrattazione. Conclusione: la disciplina sarà discussa formalmente al tavolo.");
  }
  await ricostruzione(S8, "26-calendario-ferie", "Le ferie che non si fanno", "Un diritto non può scadere per colpa dell'organizzazione.", "Con la nuova legge le ferie non fruite possono andare perse. Tocca all'Azienda metterci in condizione di farle davvero.", "Introduzione al blocco ferie.");
  await videoSlide(S8, "10-ferie", "Ferie: la nuova legge");
  {
    const s = pres.addSlide({ masterName: "CONTENUTO", sectionTitle: S8 });
    kicker(s, "Ferie · nuova legge", RS);
    s.addText("Le ferie non fatte ora si possono perdere", { placeholder: "title" });
    const vol = path.join(QUI, "..", "documenti", "volantini", "ferie-dl-144-2026.jpg");
    const dv = await dimensioni(vol); const hv = 5.1, wv = hv * dv.w / dv.h;
    s.addImage({ path: vol, x: W - M - wv, y: 1.4, w: wv, h: hv, altText: "Volantino CISL FP: ferie, nuove norme, tempi precisi e rischio di perdita",
      shadow: { type: "outer", color: "06381F", opacity: 0.22, blur: 14, offset: 4, angle: 90 } });
    s.addText("📄  Il volantino fatto per l'ULSS 6 Euganea: la legge vale anche in AOUP", { x: W - M - wv - 0.3, y: 1.4 + hv + 0.08, w: wv + 0.3, h: 0.45, fontSize: 10, italic: true, color: "5B6B62", margin: 0, isTextBox: true });
    const p = [["La norma", "Art. 1 del D.L. 144/2026, convertito dalla Legge 174/2026: nuove regole sulle ferie del personale pubblico"],
      ["Cosa cambia", "Le ferie non fruite possono andare perse alla fine del periodo di riferimento o del riporto autorizzato, con effetti anche sull'indennità quando si cessa"],
      ["Di chi è la responsabilità", "Del datore di lavoro: deve garantire, con i suoi poteri organizzativi, che le ferie si possano fare davvero"]];
    for (let i = 0; i < p.length; i++) {
      const y = 1.5 + i * 1.6;
      card(s, M, y, 8.2, 1.42, i === 2 ? C.accent2 : (i === 1 ? "FFF1F2" : C.background2));
      s.addText(p[i][0], { x: M + 0.25, y, w: 2.2, h: 1.42, fontSize: 17, bold: true, color: i === 1 ? RS : HEX.dk2, valign: "middle", margin: 0, isTextBox: true });
      s.addText(p[i][1], { x: M + 2.5, y, w: 5.5, h: 1.42, fontSize: 14.5, color: C.text1, valign: "middle", margin: 0, isTextBox: true });
    }
    s.addText("Senza personale le ferie non si fanno: le assunzioni sono la condizione per non perderle.", { x: M, y: 6.3, w: 8.2, h: 0.4, fontSize: 14, bold: true, italic: true, color: RS, margin: 0, isTextBox: true });
    s.addNotes("Il volantino è quello fatto per l'ULSS 6 Euganea, dove abbiamo chiesto un incontro urgente; la norma vale per tutto il pubblico impiego, quindi anche in AOUP. Posizione CISL FP: non basta richiamare direttori e coordinatori; servono iniziative organizzative concrete; distinguere ferie pregresse da ferie maturate dopo la norma; nessun diritto perso per difficoltà organizzative non imputabili ai lavoratori.");
  }
  {
    const s = pres.addSlide({ masterName: "DIVISORE", sectionTitle: S8 });
    s.addText("Cosa chiediamo", { placeholder: "title" });
    s.addText("Il punto 8 in cinque richieste", { placeholder: "body" });
    const cose = ["OSS di notte nei reparti individuati, entro un anno", "Notte di 12 ore solo con accordo scritto e verifica a 6 mesi", "Vestizione e consegne al tavolo, non per ordine di servizio", "Un piano ferie che le renda davvero fruibili", "Assunzioni: l'unica flessibilità che non pesa su chi resta"];
    for (let i = 0; i < cose.length; i++) {
      const y = 0.65 + i * 1.16;
      card(s, 8.1, y, 4.65, 0.98, i % 2 ? "FFFFFF" : HEX.accent2);
      s.addText(cose[i], { x: 8.35, y, w: 4.25, h: 0.98, fontSize: 15, bold: true, color: HEX.dk2, valign: "middle", margin: 0, isTextBox: true });
    }
    s.addNotes("Richieste da confermare con Achille.");
  }
  slideDomande(S8, "Retention e benessere organizzativo").addNotes("Domande per l'assemblea dal dossier: preferisci il pomeriggio più corto o la notte più breve? Oggi riesci a fare una pausa di notte? 10 minuti di consegna bastano nel tuo reparto? Saresti favorevole a una sperimentazione a tempo, con verifica?");

  // ------------------------------------------------ 9 · previdenza: mini corso Perseo Sirio
  const S9 = "9 · Situazione previdenziale";
  const FPS9 = "Fonti: Nota informativa e Statuto Perseo Sirio, COVIP, INPS · ricerca CISL FP 25/11/2026";
  const BLU = "123C6B";
  pres.addSection({ title: S9 });
  // quiz: la domanda porta alla risposta con un clic su qualunque opzione
  async function quiz(n, domanda, opzioni, giusta, spiegazione, titoloRisp) {
    const q = pres.addSlide({ masterName: "SCURO", sectionTitle: S9 });
    const numRisposta = pres.slides.length + 1;
    kicker(q, `Quiz ${n} di 3 · tocca una risposta`, HEX.accent2);
    q.addText(domanda, { placeholder: "title" });
    const lettere = ["A", "B", "C"];
    for (let i = 0; i < opzioni.length; i++) {
      const x = M + i * 4.1;
      q.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y: 2.0, w: 3.85, h: 3.6, rectRadius: 0.2, fill: { color: "13301F" }, line: { color: HEX.accent2, width: 2 } });
      q.addText([{ text: lettere[i], options: { fontSize: 54, bold: true, color: HEX.accent2, breakLine: true } }, { text: opzioni[i], options: { fontSize: 21, bold: true, color: "FFFFFF" } }],
        { x: x + 0.25, y: 2.1, w: 3.35, h: 3.4, align: "center", valign: "middle", margin: 0, isTextBox: true });
      // velo trasparente sopra la scheda: tutto il riquadro è cliccabile, il testo non viene sottolineato
      q.addShape(pres.shapes.RECTANGLE, { x, y: 2.0, w: 3.85, h: 3.6, fill: { color: "FFFFFF", transparency: 100 }, line: { type: "none" },
        hyperlink: { slide: numRisposta, tooltip: "Scopri la risposta" }, objectName: "quiz-clic" });
    }
    q.addText("In sala: alzata di mano per A, B o C. Poi un clic su una risposta.", { x: M, y: 6.0, w: 10, h: 0.4, fontSize: 14, italic: true, color: "CFE9D8", margin: 0, isTextBox: true });
    q.addNotes("Far votare la sala per alzata di mano, poi cliccare su un riquadro qualunque per passare alla risposta.");
    const r = pres.addSlide({ masterName: "CONTENUTO", sectionTitle: S9 });
    kicker(r, `Quiz ${n} · la risposta`, HEX.accent1);
    r.addText(titoloRisp, { placeholder: "title" });
    for (let i = 0; i < opzioni.length; i++) {
      const x = M + i * 4.1, ok = i === giusta;
      card(r, x, 1.55, 3.85, 1.6, ok ? HEX.accent1 : "F1F1F1", { ombra: ok });
      r.addText([{ text: lettere[i] + "  ", options: { bold: true } }, { text: opzioni[i], options: {} }], { x: x + 0.2, y: 1.55, w: 3.0, h: 1.6, fontSize: 20, color: ok ? "FFFFFF" : "8A9690", bold: ok, valign: "middle", margin: 0, isTextBox: true });
      if (ok) await tondo(r, "FaCheck", x + 3.05, 1.95, 0.65, HEX.accent2, HEX.dk2);
    }
    if (spiegazione) {
      card(r, M, 3.5, W - 2 * M, 2.9, C.background2);
      await tondo(r, "FaLightbulb", M + 0.35, 3.85, 1.0, HEX.accent2, HEX.dk2);
      r.addText(spiegazione, { x: M + 1.65, y: 3.6, w: W - 2 * M - 2.0, h: 2.7, fontSize: 19, color: C.text1, valign: "middle", margin: 0, isTextBox: true, paraSpaceAfter: 6 });
    }
    return r;
  }
  {
    const s = pres.addSlide({ masterName: "DIVISORE", sectionTitle: S9 });
    s.addText("09", { x: M, y: 0.7, w: 4, h: 2.2, fontSize: 150, bold: true, color: C.accent2, margin: 0, isTextBox: true });
    s.addText("La pensione che ti costruisci", { placeholder: "title" });
    s.addText("Mini corso su Perseo Sirio, il fondo pensione del pubblico impiego: tre quiz e tre esempi veri", { placeholder: "body" });
    const t = ["Cos'è e chi mette i soldi", "Quanto rende rispetto al TFR", "Il caso di chi è in TFS", "I limiti da conoscere", "Cosa fare da domani"];
    for (let i = 0; i < t.length; i++) {
      const y = 0.85 + i * 1.15;
      card(s, 8.6, y, 4.15, 0.95, i % 2 ? "0B4D28" : "13301F", { bordo: "1F4A31" });
      s.addText([{ text: `${i + 1}  `, options: { color: HEX.accent2, bold: true } }, { text: t[i], options: { color: "FFFFFF", bold: true } }], { x: 8.85, y, w: 3.8, h: 0.95, fontSize: 16, valign: "middle", margin: 0, isTextBox: true });
    }
    s.addNotes("Mini corso di circa 15 minuti. Tre quiz interattivi: si vota per alzata di mano e si clicca su una risposta per vedere la soluzione. Tutti gli esempi sono semplificati e dichiarati tali.");
  }
  await fotoPiena(S9, "10-pensione-parco", "La pensione si costruisce adesso.", "Previdenza complementare: un mini corso su Perseo Sirio");
  await videoSlide(S9, "11-perseo-sirio", "Perseo Sirio in due minuti");
  {
    const s = pres.addSlide({ masterName: "CONTENUTO", sectionTitle: S9 });
    kicker(s, "Lezione 1 · cos'è");
    s.addText("Un salvadanaio con tre mani dentro", { placeholder: "title" });
    const ing = [["TFR", "6,91%", "il tuo TFR, se assunto dopo il 2000: va tutto al Fondo", HEX.accent1], ["TU", "1%", "della retribuzione utile al TFR, e puoi versare di più", BLU], ["L'AZIENDA", "1%", "lo versa solo se aderisci: altrimenti lo perdi", "C8102E"]];
    for (let i = 0; i < 3; i++) {
      const y = 1.5 + i * 1.65;
      card(s, M, y, 6.3, 1.45, C.background2);
      s.addShape(pres.shapes.OVAL, { x: M + 0.2, y: y + 0.17, w: 1.1, h: 1.1, fill: { color: ing[i][3] }, line: { type: "none" } });
      s.addText(ing[i][1], { x: M + 0.2, y: y + 0.17, w: 1.1, h: 1.1, fontSize: 18, bold: true, color: "FFFFFF", align: "center", valign: "middle", margin: 0, isTextBox: true });
      s.addText(ing[i][0], { x: M + 1.5, y: y + 0.12, w: 4.6, h: 0.45, fontSize: 18, bold: true, color: ing[i][3], margin: 0, isTextBox: true });
      s.addText(ing[i][2], { x: M + 1.5, y: y + 0.55, w: 4.6, h: 0.8, fontSize: 14, color: C.text1, valign: "top", margin: 0, isTextBox: true });
    }
    s.addShape(pres.shapes.RIGHT_ARROW, { x: 7.05, y: 3.45, w: 0.7, h: 0.7, fill: { color: HEX.accent2 }, line: { type: "none" } });
    card(s, 7.95, 1.5, 4.8, 4.75, HEX.dk2);
    s.addText([{ text: "Perseo Sirio", options: { fontSize: 26, bold: true, color: HEX.accent2, breakLine: true } },
      { text: "il fondo pensione negoziale di chi lavora nella pubblica amministrazione e nella sanità", options: { fontSize: 15, color: "FFFFFF", breakLine: true } },
      { text: " ", options: { fontSize: 8, breakLine: true } },
      { text: "Alla pensione: almeno metà in rendita mensile, il resto anche in capitale.", options: { fontSize: 15, color: HEX.accent6, bold: true, breakLine: true } },
      { text: " ", options: { fontSize: 8, breakLine: true } },
      { text: "Quota associativa: 13 € l'anno.", options: { fontSize: 14, color: "CFE9D8" } }],
      { x: 8.2, y: 1.6, w: 4.3, h: 4.55, valign: "middle", margin: 0, isTextBox: true });
    s.addText(FPS9, { x: M, y: 6.45, w: 12, h: 0.3, fontSize: 10, italic: true, color: "7A8B81", margin: 0, isTextBox: true });
    s.addNotes("Aliquote per i dipendenti pubblici in regime TFR: 100% del TFR (6,91% della retribuzione utile), 1% lavoratore, 1% datore. Il contributo del datore nella Sanità resta all'1%: il CCNL 2022-2024 non contiene novità sulla previdenza complementare. Possono aderire i dipendenti a tempo indeterminato e i determinati di almeno 3 mesi.");
  }
  (await quiz(1, "Se non ti iscrivi, che fine fa l'1% che l'Azienda verserebbe per te?", ["Ti arriva in busta paga", "Resta all'Azienda: lo perdi", "Va nel TFR"], 1,
    "L'1% dell'Azienda si aggiunge al tuo 1% solo se sei iscritto e versi. In 30 anni, per uno stipendio da 30.000 €, sono più di 12.000 € regalati, più i rendimenti. E se sospendi il tuo contributo, l'Azienda smette di versare il suo.", "Lo perdi: esiste solo per chi aderisce")).addNotes("Il contributo del datore è dovuto solo agli iscritti che versano anche il proprio 1%. Se si sospende il proprio contributo, si perde anche quello del datore.");
  {
    const s = pres.addSlide({ masterName: "CONTENUTO", sectionTitle: S9 });
    kicker(s, "Esempio 1 · infermiera di 30 anni, 30.000 € lordi");
    s.addText("Dentro o fuori: la differenza dopo 30 anni", { placeholder: "title" });
    s.addChart(pres.charts.BAR, [{ name: "Netto finale", labels: ["Resta fuori (TFR all'INPS)", "Aderisce · Fondo al 2,5%", "Aderisce · Fondo al 4,5%"], values: [97500, 141600, 195400] }], {
      x: M, y: 1.45, w: 7.6, h: 4.9, barDir: "col", chartColors: ["9AA6A0", HEX.accent1, "0B4D28"], varyColors: true, showValue: true, dataLabelFormatCode: "#,##0 \"€\"", dataLabelPosition: "outEnd",
      dataLabelFontSize: 16, dataLabelFontBold: true, dataLabelColor: HEX.dk1, catAxisLabelFontSize: 13, catAxisLabelColor: HEX.dk1, catAxisLabelFontFace: "+mn-lt", valAxisHidden: true,
      valGridLine: { style: "none" }, catGridLine: { style: "none" }, showLegend: false, barGapWidthPct: 55 });
    card(s, 8.55, 1.5, 4.2, 2.3, HEX.accent1);
    s.addText([{ text: "+44.000 €", options: { fontSize: 40, bold: true, color: HEX.accent2, breakLine: true } }, { text: "netti anche nello scenario prudente", options: { fontSize: 15, color: "FFFFFF" } }],
      { x: 8.75, y: 1.55, w: 3.8, h: 2.2, valign: "middle", margin: 0, isTextBox: true });
    const p = [["Perché?", "12.170 € messi dall'Azienda, più i rendimenti"], ["E le tasse?", "10,5% all'uscita, contro circa il 25% sul TFR"], ["Quanto le costa", "300 € lordi il primo anno: circa 201 € netti"]];
    for (let i = 0; i < 3; i++) {
      const y = 4.0 + i * 0.85;
      s.addText(p[i][0], { x: 8.55, y, w: 1.6, h: 0.75, fontSize: 14, bold: true, color: HEX.accent1, valign: "middle", margin: 0, isTextBox: true });
      s.addText(p[i][1], { x: 10.15, y, w: 2.6, h: 0.75, fontSize: 13, color: C.text1, valign: "middle", margin: 0, isTextBox: true });
    }
    s.addText("Esempio semplificato: inflazione e stipendi +2% l'anno, TFR rivalutato al 2,49% netto, Fondo al 2,5% o 4,5% netto. Non è una proiezione ufficiale.", { x: M, y: 6.4, w: 12, h: 0.35, fontSize: 10.5, italic: true, color: "7A8B81", margin: 0, isTextBox: true });
    s.addNotes("Versato in 30 anni: TFR 84.100 € + 1% proprio 12.170 € + 1% datore 12.170 €. Capitale lordo: 118.500 € fuori, 153.000 € al 2,5%, 206.800 € al 4,5%. In più circa 4.000 € di IRPEF risparmiata. Verifica COVIP: 2.500 €/anno per 37 anni danno 138.336 € nel Garantito e 198.612 € nell'Azionario (in termini reali, lordi). Ma: almeno il 50% in rendita, soldi bloccati, rendimento non garantito.");
  }
  (await quiz(2, "Versi 1.000 € in più al Fondo. Con l'IRPEF al 33%, quanto ti costano davvero?", ["1.000 €", "670 €", "330 €"], 1, "Quello che versi si toglie dal reddito su cui paghi l'IRPEF, fino a 5.300 € l'anno: al 33% risparmi 330 € ogni 1.000. All'uscita pagherai tra il 15% e il 9%: tra 150 e 90 €. Guadagno fiscale netto: da 180 a 240 € ogni 1.000 €, rendimenti esclusi.", "670 €: 330 li recuperi in meno tasse")).addNotes("Deducibilità fino a 5.300 € l'anno dal 2026, contributo del datore compreso (TFR e 1,5% esclusi). All'uscita si paga il 15%, che scende dello 0,30% per ogni anno oltre il 15° fino al 9%: su 1.000 € sono 150, 105 o 90 €. Guadagno fiscale netto da 180 a 240 € ogni 1.000 €, senza contare i rendimenti. Con aliquota marginale al 23% il risparmio scende a 230 €.");
  {
    const s = pres.addSlide({ masterName: "CONTENUTO", sectionTitle: S9 });
    kicker(s, "Lezione 2 · le tasse");
    s.addText("Più resti, meno paghi", { placeholder: "title" });
    s.addChart(pres.charts.LINE, [{ name: "Tassa sulla prestazione", labels: ["fino a 15 anni", "20 anni", "25 anni", "30 anni", "35 anni"], values: [15, 13.5, 12, 10.5, 9] }], {
      x: M, y: 1.45, w: 7.4, h: 4.8, chartColors: [HEX.accent1], lineSize: 4, lineDataSymbol: "circle", lineDataSymbolSize: 10, showValue: true, dataLabelFormatCode: "0.0\"%\"", dataLabelPosition: "t",
      dataLabelFontSize: 15, dataLabelFontBold: true, dataLabelColor: HEX.dk2, catAxisLabelFontSize: 13, catAxisLabelColor: HEX.dk1, catAxisLabelFontFace: "+mn-lt", valAxisMinVal: 0, valAxisMaxVal: 20, valAxisHidden: true,
      valGridLine: { style: "none" }, catGridLine: { style: "none" }, showLegend: false });
    const p = [["Fondo", "dal 15% al 9%", HEX.accent1], ["TFR e TFS", "circa 23-25%, con la tassazione separata", "C8102E"], ["Rendimenti", "20% dentro il Fondo, 12,5% sui titoli di Stato", HEX.dk2]];
    for (let i = 0; i < 3; i++) {
      const y = 1.6 + i * 1.6;
      card(s, 8.35, y, 4.4, 1.4, i === 1 ? "FFF1F2" : C.background2);
      s.addText(p[i][0], { x: 8.55, y: y + 0.1, w: 4, h: 0.5, fontSize: 17, bold: true, color: p[i][2], margin: 0, isTextBox: true });
      s.addText(p[i][1], { x: 8.55, y: y + 0.6, w: 4, h: 0.7, fontSize: 14, color: C.text1, margin: 0, isTextBox: true });
    }
    s.addNotes("Prestazioni maturate dal 2018: 15% ridotto di 0,30 punti per ogni anno di iscrizione oltre il 15°, fino al 9%. Anticipazioni per casa o formazione e riscatti volontari: 23%. Il 23-25% su TFR/TFS è una stima: dipende dal reddito di riferimento.");
  }
  {
    const s = pres.addSlide({ masterName: "CONTENUTO", sectionTitle: S9 });
    kicker(s, "Lezione 3 · chi è stato assunto prima del 2001");
    s.addText("In TFS? Puoi passare al TFR, ma fai i conti", { placeholder: "title" });
    card(s, M, 1.5, 6.0, 4.95, C.background2);
    s.addText([{ text: "Se scegli l'opzione", options: { fontSize: 19, bold: true, color: HEX.accent1, breakLine: true } },
      { text: "Il TFS maturato si «congela» alla data di oggi e da lì cresce come il TFR", options: { bullet: true, breakLine: true } },
      { text: "Al Fondo vanno il 2% di TFR, l'1% tuo, l'1% dell'Azienda e un 1,2% in più dello Stato", options: { bullet: true, breakLine: true } },
      { text: "Il 2,5% in busta sparisce, ma il netto non cambia", options: { bullet: true, breakLine: true } },
      { text: "Non si torna indietro", options: { bullet: true, bold: true, color: "C8102E" } }],
      { x: M + 0.25, y: 1.6, w: 5.5, h: 4.75, fontSize: 15, color: C.text1, valign: "middle", margin: 0, isTextBox: true, paraSpaceAfter: 10 });
    const t = [["Esempio 2 · OSS di 50 anni, 26.000 €", "Netto"], ["Resta in TFS", "≈ 63.500 €"], ["Passa al TFR e aderisce (Fondo 2,5%)", "≈ 99.900 €"], ["Passa al TFR e aderisce (Fondo 4,0%)", "≈ 104.100 €"]];
    s.addTable(t.map((r, i) => r.map((c, j) => ({ text: c, options: { bold: i === 0 || j === 1, fontSize: i === 0 ? 13 : 15, color: i === 0 ? "FFFFFF" : (j === 1 && i > 1 ? HEX.accent1 : HEX.dk1),
      fill: { color: i === 0 ? HEX.dk2 : (i % 2 ? "FFFFFF" : HEX.lt2) }, align: j ? "center" : "left", valign: "middle" } }))),
      { x: 6.95, y: 1.5, w: 5.8, colW: [4.0, 1.8], rowH: 0.62, border: { type: "solid", color: "D9EADD", pt: 1 }, margin: 0.1 });
    card(s, 6.95, 4.25, 5.8, 2.2, "FFF8D6", { bordo: "F2DF7A" });
    s.addText([{ text: "Può non convenire se:", options: { bold: true, color: HEX.dk2, breakLine: true } },
      { text: "l'ultimo stipendio sale molto (progressioni, incarichi) · mancano pochi anni · ti serve tutto in contanti. Serve un calcolo personale sull'estratto INPS.", options: { color: C.text1 } }],
      { x: 7.15, y: 4.3, w: 5.4, h: 2.1, fontSize: 14, valign: "middle", margin: 0, isTextBox: true });
    s.addNotes("Esempio semplificato: 26 anni di servizio e 17 alla pensione, TFS di tipo IPS (1/15 dell'80% dell'ultima retribuzione per anno, DA VERIFICARE sull'estratto INPS), stipendi +2%. TFS congelato circa 36.000 € che diventano circa 54.800 € in 17 anni. Con stipendi +3%: 74.900 € contro 104.200-108.600 €. Il carattere irrevocabile dell'opzione va confermato su fonte primaria. Non dire «conviene sempre».");
  }
  {
    const s = pres.addSlide({ masterName: "SCURO", sectionTitle: S9 });
    kicker(s, "Lo sapevi? I tempi dell'INPS", HEX.accent2);
    s.addText("TFS e TFR non arrivano subito", { placeholder: "title" });
    const t = [["12 + 3 mesi", "dopo la pensione per limiti di età o di servizio", "9 + 3 per chi matura i requisiti dal 2027"], ["24 + 3 mesi", "se ti dimetti o vai in pensione anticipata", ""], ["Fino a 3 rate", "una sola fino a 50.000 €, due fino a 100.000 €, tre oltre", ""]];
    for (let i = 0; i < 3; i++) {
      const x = M + i * 4.1;
      card(s, x, 1.6, 3.85, 4.3, "13301F", { bordo: "1F4A31" });
      s.addText(t[i][0], { x: x + 0.25, y: 1.8, w: 3.4, h: 1.2, fontSize: 34, bold: true, color: HEX.accent2, margin: 0, isTextBox: true });
      s.addText(t[i][1], { x: x + 0.25, y: 3.05, w: 3.4, h: 1.3, fontSize: 16, color: "FFFFFF", valign: "top", margin: 0, isTextBox: true });
      if (t[i][2]) s.addText(t[i][2], { x: x + 0.25, y: 4.6, w: 3.4, h: 1.1, fontSize: 13, italic: true, color: HEX.accent6, valign: "top", margin: 0, isTextBox: true });
    }
    s.addText("Il Fondo invece paga la sua parte con i suoi tempi. Ma la quota «virtuale» del TFR passa comunque dall'INPS: 12-15 mesi.", { x: M, y: 6.1, w: 12, h: 0.6, fontSize: 13, italic: true, color: "CFE9D8", margin: 0, isTextBox: true });
    s.addNotes("Riduzione a 9+3 mesi per chi matura i requisiti dal 2027: L. 199/2025 c. 198, circolare INPS 30/2026 (letta nella sintesi di EC News, da verificare sul testo). Il ddl di bilancio 2027 con tempi ancora più brevi è solo una proposta: non citarlo come fatto.");
  }
  {
    const s = pres.addSlide({ masterName: "CONTENUTO", sectionTitle: S9 });
    kicker(s, "Lezione 4 · scegliere il profilo");
    s.addText("Il comparto Garantito non è sempre il più sicuro", { placeholder: "title" });
    s.addChart(pres.charts.BAR, [{ name: "Rendimento medio annuo a 10 anni", labels: ["Garantito Perseo Sirio", "TFR lasciato all'INPS"], values: [1.12, 2.5] }], {
      x: M, y: 1.45, w: 5.6, h: 4.6, barDir: "col", chartColors: ["9AA6A0", HEX.accent1], varyColors: true, showValue: true, dataLabelFormatCode: "0.00\"%\"", dataLabelPosition: "outEnd",
      dataLabelFontSize: 18, dataLabelFontBold: true, dataLabelColor: HEX.dk1, catAxisLabelFontSize: 13, catAxisLabelColor: HEX.dk1, catAxisLabelFontFace: "+mn-lt", valAxisHidden: true,
      valGridLine: { style: "none" }, catGridLine: { style: "none" }, showLegend: false, barGapWidthPct: 60 });
    s.addText("Rendimenti netti al 31/12/2025", { x: M, y: 6.05, w: 5.6, h: 0.3, fontSize: 11, italic: true, color: "7A8B81", margin: 0, isTextBox: true });
    const c = [["Garantito", "2,70% nel 2025 · −5,06% nel 2022", "dove finisce chi è iscritto in silenzio"], ["Obbligazionario", "1,84% nel 2024 · 2,17% nel 2025", "attivo dal dicembre 2023"], ["Azionario", "12,26% nel 2024 · 6,29% nel 2025", "più oscillazioni, più rendimento nel lungo periodo"]];
    for (let i = 0; i < 3; i++) {
      const y = 1.5 + i * 1.6;
      card(s, 6.6, y, 6.15, 1.42, i === 2 ? C.background2 : "FFFFFF", { bordo: "D9EADD" });
      s.addText(c[i][0], { x: 6.8, y: y + 0.1, w: 2.4, h: 0.5, fontSize: 18, bold: true, color: HEX.accent1, margin: 0, isTextBox: true });
      s.addText(c[i][1], { x: 9.2, y: y + 0.1, w: 3.4, h: 0.5, fontSize: 14, bold: true, color: HEX.dk2, margin: 0, isTextBox: true });
      s.addText(c[i][2], { x: 6.8, y: y + 0.65, w: 5.8, h: 0.6, fontSize: 13, color: C.text1, margin: 0, isTextBox: true });
    }
    s.addText("Regola semplice: più anni mancano alla pensione, più ha senso una linea con azioni, o il percorso Life Cycle che si fa più prudente con l'età.", { x: 6.6, y: 6.3, w: 6.15, h: 0.6, fontSize: 12.5, bold: true, color: HEX.dk2, margin: 0, isTextBox: true });
    s.addNotes("Tre comparti (Garantito, Obbligazionario, Azionario) combinati in sei profili, compreso il Life Cycle. Garantito: 0,90% a 5 anni e 1,12% a 10 anni contro TFR 3,44% e 2,50%. Costi ISC a 10 anni: Garantito 0,60%, Obbligazionario 0,27%, Azionario 0,31%. I rendimenti passati non garantiscono quelli futuri. Fonte dei rendimenti medi: media ripresa da Sky TG24 perché il sito COVIP non era raggiungibile, da ricontrollare. Dal 1/1/2026 anche il TFR «virtuale» rende come il profilo scelto.");
  }
  {
    const s = pres.addSlide({ masterName: "CONTENUTO", sectionTitle: S9 });
    kicker(s, "Neoassunti dal 2019");
    s.addText("Il silenzio-assenso: chi tace è iscritto", { placeholder: "title" });
    const p = [["6 mesi", "dall'assunzione a tempo indeterminato per decidere"], ["Dal mese dopo", "se non scegli, sei iscritto nel comparto Garantito"], ["30 giorni", "per ripensarci, dalla lettera del Fondo"]];
    for (let i = 0; i < 3; i++) {
      const x = M + i * 4.1;
      card(s, x, 1.6, 3.85, 2.6, i === 1 ? HEX.accent1 : C.background2);
      s.addText(p[i][0], { x: x + 0.25, y: 1.75, w: 3.4, h: 1.0, fontSize: 30, bold: true, color: i === 1 ? HEX.accent2 : HEX.accent1, margin: 0, isTextBox: true });
      s.addText(p[i][1], { x: x + 0.25, y: 2.75, w: 3.4, h: 1.3, fontSize: 15, color: i === 1 ? "FFFFFF" : C.text1, valign: "top", margin: 0, isTextBox: true });
    }
    card(s, M, 4.5, 12.15, 1.9, "FFF8D6", { bordo: "F2DF7A" });
    s.addText([{ text: "Il consiglio: ", options: { bold: true, color: HEX.dk2 } }, { text: "non lasciare che decida il silenzio. Se sei iscritto d'ufficio, sei nel Garantito: guarda se è il profilo giusto per la tua età. Vale per chi è assunto a tempo indeterminato dal 1° gennaio 2019, non per chi arriva in mobilità né per chi è in TFS.", options: { color: C.text1 } }],
      { x: M + 0.3, y: 4.55, w: 11.6, h: 1.8, fontSize: 16, valign: "middle", margin: 0, isTextBox: true });
    s.addNotes("Accordo ARAN del 16/09/2021. Nel 2025 è uscito l'8,67% degli iscritti in silenzio-assenso. Le novità della legge di bilancio 2026 sull'adesione automatica (60 giorni, capitale al 60%, Life Cycle di default) valgono solo per il privato: per noi restano 6 mesi e capitale al 50%.");
  }
  (await quiz(3, "Iscritto da 10 anni, ti serve liquidità per cambiare l'auto. Puoi chiedere un anticipo al Fondo?", ["Sì, il 30% per qualsiasi motivo", "No, per i pubblici solo sanità, prima casa e formazione", "Sì, ma solo il TFR"], 1, "Per i dipendenti pubblici l'anticipo si chiede dopo 8 anni di iscrizione e solo per spese sanitarie, prima casa (acquisto o ristrutturazione) o congedi formativi, sui contributi «veri»: il tuo, quello dell'Azienda e i rendimenti. L'anticipo del 30% «per qualsiasi motivo» vale solo per i lavoratori privati.",
    "No: per i pubblici solo tre motivi")).addNotes("Per i dipendenti pubblici: anticipazioni dopo 8 anni di iscrizione (anche per le spese sanitarie), solo per spese sanitarie, acquisto o ristrutturazione della prima casa e congedi formativi; fino al 100% dei soli contributi «reali» (lavoratore, datore, rendimenti), esclusi TFR virtuale e 1,5%. L'anticipo del 30% per «ulteriori esigenze» vale solo nel privato. Fonte: Documento anticipazioni depositato in COVIP il 16/07/2026.");
  {
    const s = pres.addSlide({ masterName: "CONTENUTO", sectionTitle: S9 });
    kicker(s, "Lezione 5 · i limiti, detti chiaramente", "C8102E");
    s.addText("Prima di firmare, sappi che…", { placeholder: "title" });
    const l = [["FaLock", "I soldi restano bloccati", "anticipi solo dopo 8 anni e solo per salute, casa, formazione; riscatto non in servizio"], ["FaChartLine", "Il rendimento non è garantito", "nel 2022 il Garantito ha perso il 5%: il fondo è un investimento di lungo periodo"], ["FaCoins", "Almeno metà in rendita", "alla pensione il capitale si può prendere al massimo per il 50%"], ["FaUserClock", "Se sospendi, perdi l'1% dell'Azienda", "e il TFR continua comunque ad andare al Fondo"]];
    for (let i = 0; i < 4; i++) {
      const col = i % 2, row = Math.floor(i / 2);
      const x = M + col * 6.15, y = 1.55 + row * 2.45;
      card(s, x, y, 5.95, 2.25, row ? C.background2 : "FFF1F2");
      await tondo(s, l[i][0], x + 0.25, y + 0.3, 0.85, row ? HEX.accent1 : "C8102E");
      s.addText(l[i][1], { x: x + 1.3, y: y + 0.25, w: 4.5, h: 0.6, fontSize: 18, bold: true, color: C.text2, margin: 0, isTextBox: true });
      s.addText(l[i][2], { x: x + 1.3, y: y + 0.85, w: 4.5, h: 1.25, fontSize: 14, color: C.text1, valign: "top", margin: 0, isTextBox: true });
    }
    s.addNotes("Onestà prima di tutto: il fondo conviene soprattutto per l'1% del datore e per il fisco, non è un conto corrente. Trasferimento ad altra forma possibile dopo 3 anni.");
  }
  await ricostruzione(S9, "27-salvadanaio", "Un euro alla volta", "Il futuro si costruisce piano.", "Con l'1% tuo, l'1% dell'Azienda e il TFR, in trent'anni la differenza può superare i 40.000 € netti. Ma serve cominciare.", "Riprende l'esempio 1 del mini corso.");
  {
    const s = pres.addSlide({ masterName: "DIVISORE", sectionTitle: S9 });
    s.addText("Cosa fare da domani", { placeholder: "title" });
    s.addText("Quattro passi, dieci minuti", { placeholder: "body" });
    const cose = ["Guarda il cedolino: c'è la voce Perseo Sirio? Sei iscritto", "Entra nell'area riservata del Fondo e controlla il profilo", "Prova il simulatore sul sito perseosirio.it", "In TFS o indeciso? Chiedici un calcolo personale con il patronato"];
    for (let i = 0; i < cose.length; i++) {
      const y = 0.9 + i * 1.4;
      card(s, 8.1, y, 4.65, 1.15, i % 2 ? "FFFFFF" : HEX.accent2);
      s.addText(cose[i], { x: 8.35, y, w: 4.25, h: 1.15, fontSize: 15, bold: true, color: HEX.dk2, valign: "middle", margin: 0, isTextBox: true });
    }
    s.addNotes("Il calcolo personale sull'opzione TFS-TFR si fa sull'estratto conto INPS, sul cedolino e sull'anzianità: offrirlo con il patronato INAS CISL.");
  }
  slideDomande(S9, "La previdenza complementare").addNotes("Spazio domande sul punto 9.");

  // ------------------------------------------------ 10 · varie ed eventuali
  const S10 = "10 · Varie ed eventuali";
  pres.addSection({ title: S10 });
  {
    const s = pres.addSlide({ masterName: "DIVISORE", sectionTitle: S10 });
    s.addText("10", { x: M, y: 0.7, w: 4, h: 2.2, fontSize: 150, bold: true, color: C.accent2, margin: 0, isTextBox: true });
    s.addText("La parola a voi", { placeholder: "title" });
    s.addText("Varie ed eventuali: ogni domanda di oggi diventa una richiesta al prossimo tavolo", { placeholder: "body" });
    const t = ["Busta paga e arretrati", "Turni, notti e reperibilità", "Ferie e permessi", "Part time e lavoro agile", "Incarichi e progressioni", "Sicurezza e aggressioni"];
    for (let i = 0; i < t.length; i++) {
      const y = 0.75 + i * 0.98;
      card(s, 8.6, y, 4.15, 0.8, i % 2 ? "0B4D28" : "13301F", { bordo: "1F4A31" });
      s.addText(t[i], { x: 8.85, y, w: 3.8, h: 0.8, fontSize: 16, bold: true, color: i % 2 ? HEX.accent2 : "FFFFFF", valign: "middle", margin: 0, isTextBox: true });
    }
    s.addNotes("Raccogliere le domande su un foglio: chi non ha tempo di parlare può scriverla e lasciarla al tavolo dei delegati.");
  }
  await fotoPiena(S10, "11-mani-alzate", "Alzate la mano. Questa parte è vostra.", "Varie ed eventuali");

  // ------------------------------------------------ chiusura
  const SC = "Chiusura";
  pres.addSection({ title: SC });
  await fotoPiena(SC, "12-corridoio-insieme", "Insieme, ogni giorno, in ogni reparto.", "CISL FP Padova Rovigo");
  {
    const s = pres.addSlide({ masterName: "CONTENUTO", sectionTitle: SC });
    kicker(s, "Da oggi");
    s.addText("Tre cose da fare uscendo da qui", { placeholder: "title" });
    const c = [["1", "Aderisci alle vertenze", "Due minuti dal telefono: un modulo per vertenza", "festivo", "Festivo"], ["2", "Segui il canale WhatsApp", "Gli aggiornamenti arrivano prima lì", "whatsapp", "WhatsApp CISL FP"], ["3", "Porta un collega", "Chi oggi non c'era: passagli la voce, o portalo alla prossima"]];
    for (let i = 0; i < 3; i++) {
      const x = M + i * 4.1;
      card(s, x, 1.55, 3.85, 5.0, i === 2 ? HEX.accent2 : C.background2, { ombra: true });
      s.addText(c[i][0], { x: x + 0.3, y: 1.7, w: 1, h: 0.9, fontSize: 48, bold: true, color: i === 2 ? HEX.dk2 : HEX.accent1, margin: 0, isTextBox: true });
      s.addText(c[i][1], { x: x + 0.3, y: 2.6, w: 3.3, h: 0.6, fontSize: 21, bold: true, color: C.text2, margin: 0, isTextBox: true });
      s.addText(c[i][2], { x: x + 0.3, y: 3.2, w: 3.3, h: 0.8, fontSize: 14, color: C.text1, valign: "top", margin: 0, isTextBox: true });
      if (c[i][3]) qr(s, c[i][3], x + 1.0, 4.15, 1.65, c[i][4]);
      else await tondo(s, "FaUserFriends", x + 1.0, 4.2, 1.75, HEX.dk2, HEX.accent2);
    }
    s.addText("I QR dei moduli ferie e buoni pasto sono nel punto 5.", { x: M, y: 6.65, w: 8, h: 0.3, fontSize: 11, italic: true, color: "5B6B62", margin: 0, isTextBox: true });
    s.addNotes("Le tre azioni del video di chiusura. Da confermare con Achille se aggiungere l'iscrizione alla CISL FP.");
  }
  {
    const s = pres.addSlide({ masterName: "COPERTINA", sectionTitle: SC });
    card(s, M, 0.5, 2.0, 1.0, "FFFFFF");
    s.addImage({ path: logo, x: M + 0.15, y: 0.55, w: 1.7, h: 1.7 / 2.06, altText: "CISL FP Padova Rovigo" });
    s.addText([{ text: "Più siamo, ", options: {} }, { text: "più contiamo.", options: { color: C.accent2 } }], { placeholder: "title" });
    s.addText("Grazie per il lavoro di ogni giorno e per il tempo di oggi. Ci vediamo in reparto.", { placeholder: "body" });
    card(s, 9.2, 0.5, 3.55, 2.6, "FFFFFF", { ombra: true });
    s.addText([{ text: "I TUOI DELEGATI AOUP", options: { fontSize: 11, bold: true, color: HEX.accent1, charSpacing: 2, breakLine: true } },
      { text: "Achille · 391 127 1018", options: { fontSize: 16, bold: true, color: HEX.dk2, breakLine: true } },
      { text: "Giovanna · 389 928 5301", options: { fontSize: 16, bold: true, color: HEX.dk2, breakLine: true } },
      { text: "cisl.fp@aopd.veneto.it", options: { fontSize: 14, color: HEX.accent1 } }],
      { x: 9.4, y: 0.6, w: 3.15, h: 2.4, valign: "middle", margin: 0, isTextBox: true, paraSpaceAfter: 6 });
    s.addNotes("Proiettare il video di chiusura dopo questa slide.");
  }

  await pres.writeFile({ fileName: OUT });
  await applyTheme(OUT, THEME);
  console.log("scritto", OUT);
})().catch(e => { console.error(e); process.exit(1); });
