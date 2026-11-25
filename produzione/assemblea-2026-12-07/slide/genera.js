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
  s.addNotes(`Frontespizio: ${titolo}, ${tipo.toLowerCase()} del ${data}. Firme sul documento: ` +
    parti.map(p => p[0] + (p[1] ? (p[1] === "sì" ? " sì" : " sì (" + p[1] + ")") : " no")).join(", ") + ".");
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
      card(s, 8.1, y, 4.65, 1.0, i % 2 ? "0B4D28" : HEX.accent2);
      s.addText(cose[i], { x: 8.35, y, w: 4.25, h: 1.0, fontSize: 16, bold: true, color: i % 2 ? "FFFFFF" : HEX.dk2, valign: "middle", margin: 0, isTextBox: true });
    }
    s.addNotes("Riepilogo del punto 1 prima delle domande. Arretrato medio indicato dal volantino CISL FP: circa 1.250 €.");
  }
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
    s.addText([{ text: "10", options: { fontSize: 72, bold: true, color: HEX.accent2, breakLine: true } },
      { text: "intese firmate", options: { fontSize: 20, bold: true, color: "FFFFFF", breakLine: true } },
      { text: "da dicembre 2025 a settembre 2026", options: { fontSize: 15, color: "CFE9D8" } }],
      { x: 9.6, y: 1.7, w: 2.9, h: 4, align: "center", valign: "middle", margin: 0, isTextBox: true });
    s.addNotes("Introduzione al punto 2. In un anno abbiamo firmato dieci intese con l'Azienda. Le vediamo una per una, con il documento originale sullo schermo.");
  }
  {
    const s = pres.addSlide({ masterName: "CONTENUTO", sectionTitle: S2 });
    kicker(s, "Un anno di tavolo");
    s.addText("Dieci intese, una linea del tempo", { placeholder: "title" });
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
      ["25/09/26", "Lavoro agile", "Nuovo regolamento"],
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
        { x: x - 0.8, y: by, w: 1.6, h: 1.75, align: "center", valign: sopra ? "bottom" : "top", margin: 0, isTextBox: true });
    }
    s.addNotes("Le dieci intese in ordine di data. In rosso le due più pesanti per i soldi: progettualità 2026 e integrazione di luglio.");
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
    s.addText("Un euro per ogni giorno di fatica in più", { placeholder: "title" });
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
    await foglio(s, "pasto-notte", 7.9, 3.45, 4.8, "pag. 4", { maxH: 2.9 });
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
      card(s, 8.1, y, 4.65, 1.0, i % 2 ? "0B4D28" : HEX.accent2);
      s.addText(cose[i], { x: 8.35, y, w: 4.35, h: 1.0, fontSize: 16, bold: true, color: i % 2 ? "FFFFFF" : HEX.dk2, valign: "middle", margin: 0, isTextBox: true });
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
      card(s, 8.1, y, 4.65, 1.15, i % 2 ? "0B4D28" : HEX.accent2);
      s.addText(cose[i], { x: 8.35, y, w: 4.25, h: 1.15, fontSize: 17, bold: true, color: i % 2 ? "FFFFFF" : HEX.dk2, valign: "middle", margin: 0, isTextBox: true });
    }
  }
  slideDomande(S3, "Il sistema degli incarichi").addNotes("Spazio domande sul punto 3.");


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
      card(s, 8.1, y, 4.65, 1.15, i % 2 ? "0B4D28" : HEX.accent2);
      s.addText(cose[i], { x: 8.35, y, w: 4.25, h: 1.15, fontSize: 16, bold: true, color: i % 2 ? "FFFFFF" : HEX.dk2, valign: "middle", margin: 0, isTextBox: true });
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

  await pres.writeFile({ fileName: OUT });
  await applyTheme(OUT, THEME);
  console.log("scritto", OUT);
})().catch(e => { console.error(e); process.exit(1); });
