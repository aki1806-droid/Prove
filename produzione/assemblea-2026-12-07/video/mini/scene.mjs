// Grafiche animate dei mini video dell'assemblea.
//   node scene.mjs <video.json> <cartella-uscita> [fps] [secondi-di-entrata]
// Per ogni blocco scrive <uscita>/<id>/f0000.png ... : i fotogrammi dell'entrata.
// L'ultimo fotogramma viene poi tenuto fermo da monta.py per tutta la durata della voce.
import { createRequire } from "module";
const { chromium } = createRequire(import.meta.url)("/opt/node-tools/node_modules/playwright");
import fs from "fs";
import path from "path";

const [, , FILE, OUT, FPS = "25", ENTRATA = "1.4"] = process.argv;
const fps = +FPS, durata = +ENTRATA, N = Math.round(fps * durata);
const QUI = path.dirname(new URL(import.meta.url).pathname);
const SLIDE = path.resolve(QUI, "../../slide");
const blocchi = JSON.parse(fs.readFileSync(FILE, "utf8"));
const titoloVideo = process.env.TITOLO || (blocchi.find(b => b.scena.kicker)?.scena.kicker || blocchi[0].scena.titolo || "").replace(/\n/g, " ");

const esc = s => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const img = rel => "file://" + path.resolve(SLIDE, rel);

const V = process.env.ORIENT === "v";
const VW = V ? 1080 : 1920, VH = V ? 1920 : 1080;
const CSS_V = `
body{width:1080px;height:1920px}
.wrap{padding:230px 80px 380px 80px}
.titolo{font-size:86px!important}
.num{font-size:190px}
.etichetta{font-size:50px}
.frase{font-size:78px}
.due{flex-direction:column;gap:36px}
.lato{min-height:0;padding:38px 44px}
.lato .val{font-size:104px}
.testata{left:80px;right:80px;flex-direction:column;align-items:flex-start;gap:16px;font-size:20px}
.sub{height:230px;padding:0 70px;font-size:44px}
.prog{bottom:230px}
.riga .et{flex:0 0 250px;font-size:32px}
.doc{flex-direction:column;gap:40px}
.doc .foglio{max-width:920px}
.doc .foglio img{max-width:884px}
.voce{font-size:40px;padding:26px 32px}
.chiude .frase{font-size:82px}
.azione{font-size:40px}
`;
const CSS = `
*{box-sizing:border-box;margin:0;padding:0}
body{width:1920px;height:1080px;overflow:hidden;font-family:Inter,sans-serif;color:#1B2A22;background:#F4FAF5}
.scuro{background:radial-gradient(120% 120% at 15% 10%,#0E7A40 0%,#075029 45%,#04351C 100%);color:#fff}
.chiaro{background:linear-gradient(160deg,#FFFFFF 0%,#F2F8F3 60%,#E4F2E8 100%)}
.giallo{background:#FFD60A;color:#06381F}
.wrap{position:absolute;inset:0;padding:120px 150px 210px 150px;display:flex;flex-direction:column;justify-content:center}
.kicker{font-weight:800;font-size:30px;letter-spacing:.32em;color:#E2001A;text-transform:uppercase;margin-bottom:26px}
.scuro .kicker{color:#FFD60A}
.titolo{font-family:"Inter Display",Inter;font-weight:900;font-size:104px;line-height:1.02;letter-spacing:-.02em;color:#06381F}
.scuro .titolo{color:#fff}
.sotto{font-size:42px;font-weight:500;margin-top:34px;color:#3A4A41;max-width:1400px;line-height:1.25}
.scuro .sotto{color:#CFE9D8}
.barra{width:150px;height:14px;border-radius:7px;background:#FFD60A;margin-top:40px}
.num{font-family:"Inter Display",Inter;font-weight:900;font-size:250px;line-height:.95;letter-spacing:-.03em;color:#00843D}
.scuro .num{color:#FFD60A}
.etichetta{font-size:54px;font-weight:700;margin-top:24px;max-width:1450px;line-height:1.15}
.nota{font-size:34px;margin-top:22px;color:#5B6B62;max-width:1400px}
.scuro .nota{color:#B9D3C3}
.frase{font-family:"Inter Display",Inter;font-weight:800;font-size:86px;line-height:1.12;max-width:1600px}
.virg{font-family:Georgia,serif;font-size:260px;line-height:.6;color:#FFD60A;height:120px}
.fonte{font-size:34px;margin-top:40px;font-weight:600;color:#9BE15D}
.voci{margin-top:44px;display:flex;flex-direction:column;gap:26px}
.voce{display:flex;align-items:center;gap:34px;background:#fff;border-radius:28px;padding:30px 40px;box-shadow:0 10px 30px rgba(6,56,31,.10);font-size:46px;font-weight:700;color:#06381F}
.scuro .voce{background:rgba(255,255,255,.08);color:#fff;box-shadow:none;border:2px solid rgba(255,255,255,.12)}
.pallino{flex:0 0 74px;height:74px;border-radius:50%;background:#00843D;color:#fff;display:flex;align-items:center;justify-content:center;font-size:38px;font-weight:900}
.scuro .pallino{background:#FFD60A;color:#06381F}
.due{display:flex;gap:60px;margin-top:50px}
.lato{flex:1;border-radius:36px;padding:44px 50px;min-height:420px;display:flex;flex-direction:column;justify-content:center}
.lato.r{background:#FFF1F2;border:4px solid #E2001A}
.lato.v{background:#00843D;color:#fff}
.lato .et{font-size:32px;font-weight:800;letter-spacing:.18em;text-transform:uppercase}
.lato.r .et{color:#C8102E}.lato.v .et{color:#FFD60A}
.lato .val{font-family:"Inter Display",Inter;font-weight:900;font-size:118px;line-height:1;margin-top:20px}
.lato.r .val{color:#C8102E}
.lato .nt{font-size:36px;margin-top:20px;line-height:1.2}
.barre{margin-top:50px;display:flex;flex-direction:column;gap:30px}
.riga{display:flex;align-items:center;gap:30px}
.riga .et{flex:0 0 380px;font-size:40px;font-weight:700;text-align:right}
.riga .tr{flex:1;height:84px;background:rgba(6,56,31,.07);border-radius:16px;position:relative}
.scuro .riga .tr{background:rgba(255,255,255,.08)}
.riga .pi{position:absolute;left:0;top:0;bottom:0;border-radius:16px;background:#00843D}
.scuro .riga .pi{background:#FFD60A}
.riga .tx{position:absolute;top:50%;transform:translateY(-50%);font-size:42px;font-weight:900;white-space:nowrap}
.doc{display:flex;gap:70px;align-items:center;margin-top:40px}
.doc .foglio{flex:0 0 auto;max-width:1050px;max-height:620px;background:#fff;padding:18px;border-radius:10px;box-shadow:0 24px 60px rgba(6,56,31,.30);transform:rotate(-1.2deg)}
.doc .foglio img{display:block;max-width:1014px;max-height:584px}
.doc .lt{flex:1}
.doc .lt .titolo{font-size:70px}
.doc .lt .sotto{font-size:36px}
.chiude{text-align:center;align-items:center}
.chiude .frase{font-size:96px;margin:0 auto}
.azione{margin-top:60px;display:inline-block;background:#E2001A;color:#fff;font-weight:900;font-size:46px;padding:28px 56px;border-radius:999px;box-shadow:0 14px 34px rgba(226,0,26,.35)}
.testata{position:absolute;left:150px;right:150px;top:46px;display:flex;justify-content:space-between;align-items:center;font-size:24px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#5B6B62}
.scuro .testata{color:#B9D3C3}
.logo{height:62px;background:#fff;border-radius:12px;padding:6px 12px}
.sub{position:absolute;left:0;right:0;bottom:0;height:150px;background:rgba(4,30,16,.92);color:#fff;display:flex;align-items:center;justify-content:center;padding:0 170px;text-align:center;font-size:40px;font-weight:600;line-height:1.25}
.giallo .sub{background:rgba(6,56,31,.95)}
.prog{position:absolute;left:0;bottom:150px;height:8px;background:#FFD60A}
.an{opacity:0}
`;

function scenaHTML(b, i, tot) {
  const sc = b.scena, t = sc.tipo;
  const tema = { titolo: "scuro", numero: i % 2 ? "chiaro" : "scuro", frase: "scuro", elenco: "chiaro", confronto: "chiaro",
    barre: i % 2 ? "scuro" : "chiaro", documento: "chiaro", chiusura: "giallo" }[t] || "chiaro";
  let h = "";
  const k = sc.kicker ? `<div class="kicker an" data-a="su" data-d="0">${esc(sc.kicker)}</div>` : "";
  if (t === "titolo") h = `${k}<div class="titolo an" data-a="su" data-d=".12">${esc(sc.titolo)}</div><div class="barra an" data-a="larga" data-d=".35"></div>${sc.sotto ? `<div class="sotto an" data-a="su" data-d=".45">${esc(sc.sotto)}</div>` : ""}`;
  else if (t === "numero") h = `${k}<div class="num an" data-a="zoom" data-d=".1" data-conta="${esc(sc.numero)}">${esc(sc.numero)}</div><div class="etichetta an" data-a="su" data-d=".4">${esc(sc.etichetta)}</div>${sc.nota ? `<div class="nota an" data-a="su" data-d=".6">${esc(sc.nota)}</div>` : ""}`;
  else if (t === "frase") h = `<div class="virg an" data-a="su" data-d="0">“</div><div class="frase an" data-a="su" data-d=".15">${esc(sc.frase)}</div>${sc.fonte ? `<div class="fonte an" data-a="su" data-d=".5">${esc(sc.fonte)}</div>` : ""}`;
  else if (t === "elenco") h = `${k}<div class="titolo an" data-a="su" data-d=".08" style="font-size:80px">${esc(sc.titolo)}</div><div class="voci">${(sc.voci || []).map((v, j) => `<div class="voce an" data-a="dx" data-d="${.3 + j * .18}"><div class="pallino">${j + 1}</div><div>${esc(v)}</div></div>`).join("")}</div>`;
  else if (t === "confronto") { const l = sc.sinistra || {}, r = sc.destra || {};
    h = `${k}<div class="titolo an" data-a="su" data-d=".08" style="font-size:76px">${esc(sc.titolo)}</div><div class="due"><div class="lato r an" data-a="sx" data-d=".3"><div class="et">${esc(l.etichetta)}</div><div class="val">${esc(l.valore)}</div><div class="nt">${esc(l.nota)}</div></div><div class="lato v an" data-a="dx" data-d=".5"><div class="et">${esc(r.etichetta)}</div><div class="val">${esc(r.valore)}</div><div class="nt">${esc(r.nota)}</div></div></div>`; }
  else if (t === "barre") { const bb = sc.barre || []; const mx = Math.max(...bb.map(x => Math.abs(+x.valore) || 0), 1);
    h = `${k}<div class="titolo an" data-a="su" data-d=".08" style="font-size:76px">${esc(sc.titolo)}</div><div class="barre">${bb.map((x, j) => { const p = Math.max(4, 100 * Math.abs(+x.valore) / mx) * .82;
      return `<div class="riga"><div class="et an" data-a="su" data-d="${.25 + j * .12}">${esc(x.etichetta)}</div><div class="tr"><div class="pi an" data-a="cresce" data-d="${.35 + j * .12}" style="width:${p}%"></div><div class="tx an" data-a="su" data-d="${.7 + j * .12}" style="left:calc(${p}% + 24px)">${esc(x.testo)}</div></div></div>`; }).join("")}</div>`; }
  else if (t === "documento") h = `<div class="doc"><div class="foglio an" data-a="zoom" data-d=".05"><img src="${img(sc.immagine)}"></div><div class="lt">${k}<div class="titolo an" data-a="su" data-d=".3">${esc(sc.titolo)}</div>${sc.didascalia ? `<div class="sotto an" data-a="su" data-d=".5">${esc(sc.didascalia)}</div>` : ""}</div></div>`;
  else if (t === "chiusura") h = `<div class="frase an" data-a="zoom" data-d=".05">${esc(sc.frase)}</div>${sc.azione ? `<div><div class="azione an" data-a="su" data-d=".45">${esc(sc.azione)}</div></div>` : ""}`;
  const logo = "file://" + path.resolve(SLIDE, "logo-cisl-fp.png");
  return `<!doctype html><html><head><meta charset="utf-8"><style>${CSS}${V ? CSS_V : ""}</style></head><body class="${tema}">
<div class="testata"><img class="logo" src="${logo}"><span>Assemblea AOUP · 7 dicembre 2026 · ${esc(titoloVideo)}</span></div>
<div class="wrap ${t === "chiusura" ? "chiude" : ""}">${h}</div>
<div class="prog" style="width:${(100 * (i + 1) / tot).toFixed(2)}%"></div>
<div class="sub" id="sub"></div></body></html>`;
}

// stato al tempo t (secondi dall'inizio della scena)
function applica(t) {
  const ease = x => 1 - Math.pow(1 - Math.min(Math.max(x, 0), 1), 3);
  for (const el of document.querySelectorAll(".an")) {
    const d = +el.dataset.d || 0, p = ease((t - d) / 0.55), a = el.dataset.a;
    el.style.opacity = p;
    if (a === "su") el.style.transform = `translateY(${(1 - p) * 50}px)`;
    if (a === "dx") el.style.transform = `translateX(${(1 - p) * 90}px)`;
    if (a === "sx") el.style.transform = `translateX(${-(1 - p) * 90}px)`;
    if (a === "zoom") el.style.transform = `scale(${0.86 + 0.14 * p})${el.classList.contains("foglio") ? " rotate(-1.2deg)" : ""}`;
    if (a === "larga") { el.style.transform = `scaleX(${p})`; el.style.transformOrigin = "left"; }
    if (a === "cresce") { el.style.transform = `scaleX(${p})`; el.style.transformOrigin = "left"; el.style.opacity = 1; }
    if (el.dataset.conta) {
      const m = el.dataset.conta.match(/^([^\d]*)([\d.]+(?:,\d+)?)(.*)$/);
      if (m) { const raw = m[2].replace(/\./g, "").replace(",", "."), v = parseFloat(raw), dec = (m[2].split(",")[1] || "").length;
        const cur = v * ease((t - d) / 0.9);
        let s = cur.toFixed(dec).replace(".", ",");
        const [ip, dp] = s.split(","); s = ip.replace(/\B(?=(\d{3})+(?!\d))/g, ".") + (dp ? "," + dp : "");
        el.textContent = m[1] + s + m[3]; }
    }
  }
}

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: VW, height: VH } });
for (let i = 0; i < blocchi.length; i++) {
  const b = blocchi[i];
  const dir = path.join(OUT, b.id);
  fs.mkdirSync(dir, { recursive: true });
  const html = path.join(dir, "scena.html");
  fs.writeFileSync(html, scenaHTML(b, i, blocchi.length));
  await page.goto("file://" + path.resolve(html));
  await page.evaluate(() => document.fonts.ready);
  for (let f = 0; f <= N; f++) {
    await page.evaluate(applica, f / fps);
    await page.screenshot({ path: path.join(dir, `f${String(f).padStart(4, "0")}.png`) });
  }
  // senza sottotitolo: base per monta.py, che li disegna sopra
  process.stdout.write(`${b.id} `);
}
console.log("\nfatto:", blocchi.length, "scene");
await browser.close();
