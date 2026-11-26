// Grafiche animate del video «Ferie» fotogramma per fotogramma: node render.js <cartella progetto> [fps] [solo_t...]
const { chromium } = require('playwright'); const fs = require('fs');
const [D, FPS = '30', ...SOLO] = process.argv.slice(2);
const S = JSON.parse(fs.readFileSync(`${D}/audio/scene.json`));
const T = S[S.length - 1].inizio + S[S.length - 1].durata;
let h = fs.readFileSync(`${__dirname}/scena.html`, 'utf8');
const rays = Array.from({ length: 16 }, (_, k) => `<rect x="-9" y="-245" width="18" height="80" rx="9" fill="#FFC83D" opacity=".85" transform="rotate(${k * 22.5})"/>`).join('');
const lettere = [...'FERIE'].map(c => `<span style="display:inline-block">${c}</span>`).join('');
const F = new Set([3, 4, 9, 10, 11, 16, 17, 22, 23, 24]);
let g = ''; for (let k = 0; k < 30; k++) { const r = Math.floor(k / 6), c = k % 6;
  g += `<div class="day${F.has(k) ? ' f' : ''}" style="left:${c * 146}px;top:${r * 148}px">${F.has(k) ? `<svg width="70" height="70" viewBox="-35 -35 70 70"><g fill="#0F1F17">${Array.from({length:8},(_,j)=>`<rect x="-3" y="-33" width="6" height="12" rx="3" transform="rotate(${j*45})"/>`).join("")}</g><circle r="15" fill="#0F1F17"/></svg>` : k + 1}</div>`; }
h = h.replace('__RAYS__', rays).replace('__LETTERE__', lettere).replace('__GIORNI__', g).replace('__SCENE__', JSON.stringify(S))
     .replaceAll('__LOGO__', 'data:image/png;base64,' + fs.readFileSync(`${D}/logo_cisl_fp_pdro.png`).toString('base64'));
const VAR = fs.existsSync(`${D}/variante.json`) ? JSON.parse(fs.readFileSync(`${D}/variante.json`)) : {};
const PROV = `    <div class="ter">AOUP PADOVA</div>
    <div class="row"><span>Achille Pagliaro</span><b>391 127 1018</b></div>
    <div class="row"><span>Giovanna Vullo</span><b>389 928 5301</b></div>
    <div class="ter">ULSS 6 EUGANEA</div>
    <div class="row"><span>Fabio Turato</span><b>335 686 5715</b></div>
    <div class="row"><span>Brenda Bergo</span><b>339 313 5967</b></div>
    <div class="row"><span>Emiliano Bedon</span><b>346 743 0752</b></div>
    <div class="row"><span>Alessandro Piovan</span><b>335 746 9671</b></div>
    <div class="ter">ULSS 5 POLESANA</div>
    <div class="row"><span>Carlo Cogo</span><b>335 109 9506</b></div>
    <div style="margin-top:22px;padding-top:18px;border-top:3px solid #e3e9e5;font-weight:900;font-size:40px;color:var(--g2);text-align:center">fp.padova.rovigo@cisl.it</div>`;
h = h.replace('__S5TITOLO__', VAR.s5titolo || 'HA CHIESTO<br>UN INCONTRO').replace('__S5PILL__', VAR.s5pill || 'Azienda ULSS 6 Euganea')
     .replace('__S5PILLSIZE__', VAR.s5pillsize || '50').replace('__DELEGATI__', VAR.delegati || PROV)
     .replace('__QR__', 'data:image/png;base64,' + fs.readFileSync(`${__dirname}/qr_sondaggio.png`).toString('base64'));
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  await p.setContent(h, { waitUntil: 'networkidle' }); await p.evaluate(() => document.fonts.ready);
  const out = `${D}/fotogrammi`; fs.mkdirSync(out, { recursive: true });
  const tt = SOLO.length ? SOLO.map(Number) : Array.from({ length: Math.ceil(T * +FPS) }, (_, k) => k / +FPS);
  for (let k = 0; k < tt.length; k++) {
    await p.evaluate(t => render(t), tt[k]);
    await p.screenshot({ path: SOLO.length ? `${out}/prova_${tt[k]}.jpg` : `${out}/f${String(k).padStart(5, '0')}.jpg`, type: 'jpeg', quality: 92 });
    if (k % 300 === 0) console.log(k, '/', tt.length);
  }
  await b.close(); console.log('fatto', tt.length);
})();
