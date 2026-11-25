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
      const attivo = i === 1;
      card(s, x, y, cw, ch, attivo ? C.accent2 : C.background2, { ombra: attivo });
      s.addText(String(i + 1).padStart(2, "0"), { x: x + 0.22, y: y + 0.15, w: 1, h: 0.5, fontSize: 24, bold: true,
        color: attivo ? C.text2 : C.accent1, margin: 0, isTextBox: true });
      await tondo(s, odg[i][0], x + cw - 0.82, y + 0.18, 0.6, attivo ? HEX.dk2 : HEX.accent1);
      s.addText(odg[i][1], { x: x + 0.22, y: y + 0.95, w: cw - 0.4, h: 1.2, fontSize: 17, bold: true,
        color: C.text2, margin: 0, valign: "top", isTextBox: true });
    }
    s.addNotes("Presentare i 10 punti. Ogni blocco si regge da solo: chi arriva o va via per i turni trova sempre un punto completo.");
  }

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

  await pres.writeFile({ fileName: OUT });
  await applyTheme(OUT, THEME);
  console.log("scritto", OUT);
})().catch(e => { console.error(e); process.exit(1); });
