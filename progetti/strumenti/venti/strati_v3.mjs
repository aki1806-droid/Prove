// 20 format attrattivi, seconda tornata (9/11): livelli trasparenti 1080x1920 sopra le clip HeyGen per 05 ASMR del cedolino,
// 06 Classifica dei turni, 07 Il tuo anno in corsia, 08 Microfono in corsia. Stesso stile di strati_v2.mjs.
//   node strumenti/venti/strati_v3.mjs -> <progetto>/strati/*.png
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const QUI = path.dirname(fileURLToPath(import.meta.url));
const FD = path.resolve(QUI, '../chicedomani/font');
const CSS = `@font-face{font-family:M;font-weight:800;src:url(file://${FD}/montserrat-latin-800-normal.woff2)}
@font-face{font-family:M;font-weight:900;src:url(file://${FD}/montserrat-latin-900-normal.woff2)}
@font-face{font-family:K;font-weight:600;src:url(file://${QUI}/caveat-latin-600.woff2)}
html,body{margin:0;width:1080px;height:1920px;overflow:hidden;background:transparent}
.ab{position:absolute;left:60px;right:60px}
.tit{font:900 100px/0.98 M;color:#fff;text-shadow:0 8px 30px rgba(0,0,0,.65);letter-spacing:-2px}
.tit em{font-style:normal;color:#111;background:#ffd23f;padding:0 14px;border-radius:10px;box-decoration-break:clone;-webkit-box-decoration-break:clone}
.c{text-align:center}
.sub{font:600 66px K;color:#fff;text-shadow:0 4px 16px rgba(0,0,0,.8)}
.pill{display:inline-block;background:#ffd23f;color:#111;font:800 40px M;padding:12px 30px;border-radius:40px;transform:rotate(-3deg);box-shadow:0 10px 30px rgba(0,0,0,.45)}
.box{background:rgba(12,18,34,.86);border:3px solid rgba(255,255,255,.18);border-radius:34px;padding:32px 42px 38px;box-shadow:0 20px 60px rgba(0,0,0,.45)}
.lab{font:800 32px M;letter-spacing:4px;color:#8fb4ff;margin-bottom:12px}
.q{font:800 64px/1.12 M;color:#fff}
.k{font:600 76px/1.05 K;color:#fff}
.hl{background:#ffd23f;border-radius:20px;padding:24px 40px 30px;transform:rotate(-2deg);box-shadow:0 18px 50px rgba(0,0,0,.5)}
.hl .q{color:#111;font-weight:900;font-size:84px}
.chk{display:flex;gap:26px;align-items:center;background:#fff;border-radius:26px;padding:24px 32px;box-shadow:0 14px 40px rgba(0,0,0,.45)}
.chk b{flex:0 0 78px;height:78px;border-radius:50%;background:#0f8a43;color:#fff;font:900 52px/78px M;text-align:center}
.chk span{font:800 46px/1.15 M;color:#111}
.tier{position:absolute;left:50px;right:50px;height:200px;display:flex;border-radius:24px;overflow:hidden;box-shadow:0 14px 40px rgba(0,0,0,.45)}
.tier b{flex:0 0 200px;font:900 130px/200px M;color:#111;text-align:center}
.tier span{flex:1;background:rgba(12,18,34,.88);display:flex;align-items:center;padding:0 34px;font:800 52px/1.12 M;color:#fff}
.stat{background:rgba(20,10,40,.85);border:3px solid rgba(255,255,255,.2);border-radius:34px;padding:30px 40px;box-shadow:0 20px 60px rgba(0,0,0,.5)}
.stat .l{font:800 34px M;letter-spacing:3px;color:#ff8fd1}
.stat .v{font:900 96px/1.0 M;color:#fff;margin-top:8px}
.stat .v em{font-style:normal;color:#ffd23f}
.stat .n{font:800 42px/1.2 M;color:#e8e0ff;margin-top:10px}
.chip{display:inline-block;background:#fff;color:#111;font:900 62px M;padding:18px 40px;border-radius:60px;box-shadow:0 12px 34px rgba(0,0,0,.5)}
.fant{position:absolute;left:0;right:0;top:250px;text-align:center}
.fant span{display:inline-block;background:rgba(0,0,0,.72);color:#fff;font:800 30px M;letter-spacing:3px;padding:12px 26px;border-radius:30px;border:2px solid #ffd23f}
.sotto{position:absolute;left:50px;right:50px;top:1180px;background:rgba(255,255,255,.96);border-left:20px solid #0f8a43;border-radius:26px;padding:30px 38px;box-shadow:0 20px 60px rgba(0,0,0,.55)}
.sotto .r{font:900 62px/1.12 M;color:#111}
.sotto .chi{font:800 34px M;color:#0f8a43;margin-top:14px}
.sotto .chi i{font-style:normal;color:#777;font-weight:800;font-size:28px}`;
const P = {};
const scrim = (a = .5) => `<div style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,${a + .1}) 0%,rgba(0,0,0,${a - .2}) 40%,rgba(0,0,0,${a - .1}) 65%,rgba(0,0,0,${a + .2}) 100%)"></div>`;
const titolo = (top, html, cls = '') => `<div class="ab tit ${cls}" style="top:${top}px">${html}</div>`;
const box = (top, testo) => `<div class="ab box" style="top:${top}px"><div class="q" style="font-size:56px">${testo}</div></div>`;
const pill = (top, testo, left = 60) => `<div style="position:absolute;left:${left}px;top:${top}px"><span class="pill">${testo}</span></div>`;
const chk = (top, testo) => `<div class="ab chk" style="top:${top}px"><b>✓</b><span>${testo}</span></div>`;
// ---- 05 ASMR del cedolino: tutto lento, morbido
const A5 = 'pdro-20f-05-asmr-del-cedolino';
P[A5] = { scrim: scrim(.45),
  s01_ssh: pill(300, 'ssh…', 70), s01_respira: pill(300, 'respira…', 70),
  s01_titolo: titolo(420, 'ASMR<br>DEL<br><em>CEDOLINO</em>') + `<div class="ab sub" style="top:780px">per chi ha l'ansia della busta paga</div>`,
  s02_base: pill(300, 'respira…') + titolo(400, 'LA <em>BASE.</em>') + box(560, 'Lo stipendio tabellare.<br>Sempre uguale. Rassicurante.'),
  s02_notti: pill(300, 'contale con me…') + titolo(400, 'LE <em>NOTTI.</em>') + box(560, 'Le hai fatte tutte?<br>Contale, una per una.'),
  s03_tredi: pill(300, 'e ora…') + titolo(400, 'LA <em>TREDICESIMA.</em>', '" style="top:400px;font-size:88px') + box(560, 'Arriva a dicembre.<br>Controllala con calma.'),
  s03_torna: pill(300, 'niente panico…') + titolo(400, 'SE NON <em>TORNA?</em>') + box(560, 'Non agitarti.<br>Portalo a noi.'),
};
// ---- 06 Classifica dei turni: tier list
const A6 = 'pdro-20f-06-classifica-dei-turni';
const COL = { S: '#ff4d5e', A: '#ff9f40', B: '#ffd23f', C: '#9be15d', D: '#4dd4ff' };
const riga = (k, i, testo = '') => `<div class="tier" style="top:${330 + i * 230}px"><b style="background:${COL[k]}">${k}</b><span>${testo}</span></div>`;
const vuote = ['S', 'A', 'B', 'C', 'D'].map((k, i) => riga(k, i)).join('');
P[A6] = { scrim: scrim(.55),
  s01_titolo: titolo(380, 'IL TURNO<br><em>PEGGIORE</em><br>DI SEMPRE?'), s01_pill: pill(760, 'classifica ufficiale', 80),
  tabella: vuote,
  rS: riga('S', 0, "Rientro nel giorno di riposo"), rA: riga('A', 1, 'Smonto notte<br>+ traffico'),
  rB: riga('B', 2, "Cambio turno all'ultimo minuto"), rD: riga('D', 4, 'Mattina con i colleghi al completo'),
  stella: `<div class="ab c" style="top:1520px"><span class="pill" style="font-size:44px">✦ rara come una stella cadente ✦</span></div>`,
  incubo: `<div style="position:absolute;left:300px;top:250px"><span class="pill" style="background:#ff4d5e;color:#fff">l'incubo assoluto</span></div>`,
  s04_tit: pill(300, 'ridere sì, ma…') + titolo(400, "DIETRO OGNI TURNO,<br>UNA <em>REGOLA.</em>", '" style="top:400px;font-size:80px'),
  s04_c1: chk(700, 'Riposo: 11 ore consecutive ogni 24'), s04_c2: chk(880, 'Festivi: a rotazione, uguale per tutti'),
  s04_c3: chk(1060, 'Cambio turno: concordato e autorizzato'),
};
// ---- 07 Il tuo anno in corsia: riepilogo stile «wrapped»
const A7 = 'pdro-20f-07-il-tuo-anno-in-corsia';
const stat = (top, l, v, n = '') => `<div class="ab stat" style="top:${top}px"><div class="l">${l}</div><div class="v">${v}</div>${n ? `<div class="n">${n}</div>` : ''}</div>`;
P[A7] = { scrim: `<div style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(60,0,80,.55),rgba(30,0,50,.35) 45%,rgba(20,0,40,.75))"></div>`,
  s01_arrivato: titolo(700, 'È ARRIVATO.', 'c'),
  s01_titolo: titolo(420, 'IL TUO<br>ANNO IN<br><em>CORSIA</em>') + pill(800, '2026 · il riepilogo', 80),
  s02_notti: stat(320, 'LE TUE NOTTI', '<em>TROPPE.</em>'),
  s02_caffe: stat(640, 'IL CAFFÈ DELLE 4', 'fedeltà <em>100%</em>', 'non ti ha mai tradito'),
  s02_letto: stat(1010, 'IL CAMPANELLO PIÙ SUONATO', 'LETTO <em>7</em>'),
  s02_lui: `<div style="position:absolute;left:600px;top:1300px"><span class="pill" style="font-size:46px">sempre lui.</span></div>`,
  s03_tit: stat(320, 'IL TUO SUPERPOTERE', 'MULTI<em>TASKING.</em>'),
  s03_c1: `<div style="position:absolute;left:70px;top:700px"><span class="chip">📞 Telefono</span></div>`.replace('📞 ', ''),
  s03_c2: `<div style="position:absolute;left:330px;top:860px"><span class="chip">Terapia</span></div>`,
  s03_c3: `<div style="position:absolute;left:590px;top:1020px"><span class="chip">Sorriso</span></div>`,
  s03_ins: `<div class="ab c" style="top:1220px"><span class="pill" style="font-size:56px">tutto insieme.</span></div>`,
  s04_tit: pill(300, 'e il nostro?') + titolo(400, 'IL NOSTRO <em>2026.</em>', '" style="top:400px;font-size:86px'),
  s04_c1: chk(600, 'Accordi seguiti e firmati al tavolo'), s04_c2: chk(780, 'Corsi per concorsi e progressioni'),
  s04_c3: chk(960, 'Cedolini controllati, uno per uno'), s04_c4: chk(1140, 'Segnalazioni portate alla Direzione'),
};
// ---- 08 Microfono in corsia: risposte di fantasia, dichiarate
const A8 = 'pdro-20f-08-microfono-in-corsia';
const fant = `<div class="fant"><span>PERSONAGGI E RISPOSTE DI FANTASIA</span></div>`;
const ris = (r, chi) => `<div class="sotto"><div class="r">«${r}»</div><div class="chi">${chi} <i>· personaggio di fantasia</i></div></div>`;
P[A8] = { scrim: scrim(.45), fantasia: fant,
  s01_titolo: titolo(380, 'COSA DIRESTI<br>AL DIRETTORE<br><em>IN 5 SECONDI?</em>', '" style="top:380px;font-size:92px'),
  s02_dom: pill(330, 'DOMANDA 1') + titolo(430, '5 SECONDI<br>PER IL <em>DIRETTORE.</em>', '" style="top:430px;font-size:84px'),
  s02_r1: ris('Venga a fare una notte con noi.', 'Reparto di Medicina'),
  s02_r2: ris('Più personale. Non più slide.', 'Reparto di Chirurgia'),
  s02_r3: ris('Ci ascolti, prima di decidere.', 'Radiologia'),
  s03_dom: pill(330, 'DOMANDA 2') + titolo(450, 'LA COSA PIÙ ASSURDA<br><em>IN REPARTO?</em>', '" style="top:450px;font-size:76px'),
  s03_r1: ris('Mi hanno chiesto il menù del giorno. Alle tre di notte.', 'Reparto di Geriatria'),
  s03_r2: ris('Il campanello del letto 7: quaranta volte in una notte.', 'Reparto di Medicina'),
  s03_r3: ris('Terzo rientro del mese. “Grazie, sei flessibile!”', 'Reparto di Ortopedia'),
};
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--allow-file-access-from-files'] });
const pg = await b.newPage({ viewport: { width: 1080, height: 1920 } });
let n = 0;
for (const [dir, pagine] of Object.entries(P)) {
  const OUT = path.resolve(QUI, '../..', dir, 'strati'); fs.mkdirSync(OUT, { recursive: true });
  for (const [nome, corpo] of Object.entries(pagine)) {
    const html = path.join(OUT, '_p.html');
    fs.writeFileSync(html, `<html><head><meta charset="utf-8"><style>${CSS}</style></head><body>${corpo}</body></html>`);
    await pg.goto('file://' + html); await pg.evaluate(() => document.fonts.ready); await pg.waitForTimeout(100);
    await pg.screenshot({ path: path.join(OUT, nome + '.png'), omitBackground: true }); fs.unlinkSync(html); n++;
  }
}
await b.close(); console.log('strati', n);
