// 20 format attrattivi, quarta tornata (10/11): livelli 1080x1920 sopra le clip HeyGen per 12-17. Stile di strati_v4.mjs.
//   node strumenti/venti/strati_v5.mjs [chiave ...]  (chiavi: news nonna diz sitcom vet suono ferie; senza argomenti tutte)
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
.tit em.r{background:#e3132b;color:#fff}
.pill{display:inline-block;background:#ffd23f;color:#111;font:800 40px M;padding:12px 30px;border-radius:40px;transform:rotate(-3deg);box-shadow:0 10px 30px rgba(0,0,0,.45)}
.box{background:rgba(12,18,34,.88);border:3px solid rgba(255,255,255,.18);border-radius:34px;padding:30px 40px 36px;box-shadow:0 20px 60px rgba(0,0,0,.45)}
.sub{font:800 50px/1.15 M;color:#fff}
.banda{position:absolute;left:0;right:0;top:1650px;height:110px;display:flex;align-items:stretch;box-shadow:0 -8px 30px rgba(0,0,0,.4)}
.banda b{background:#e3132b;color:#fff;font:900 50px/110px M;padding:0 34px;letter-spacing:2px}
.banda span{flex:1;background:rgba(255,255,255,.95);color:#111;font:800 36px/110px M;padding:0 30px;white-space:nowrap;overflow:hidden}
.live{position:absolute;right:50px;top:240px;background:#e3132b;color:#fff;font:900 40px M;padding:10px 26px;border-radius:12px;letter-spacing:4px}
.live:before{content:'● '}
.news{border-radius:30px;overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,.5)}
.news .k{background:#ffd23f;color:#111;font:900 36px M;letter-spacing:4px;padding:14px 34px}
.news .k.r{background:#e3132b;color:#fff}
.news .t{background:rgba(12,18,34,.92);color:#fff;font:900 78px/1.0 M;padding:26px 34px 10px}
.news .t em{font-style:normal;color:#ffd23f}
.news .s{background:rgba(12,18,34,.92);color:#e6e6e6;font:800 46px/1.15 M;padding:6px 34px 30px}
.lettera{position:absolute;left:0;right:0;top:300px;text-align:center;font:900 420px/1 M;color:#ffd23f;text-shadow:0 20px 60px rgba(0,0,0,.6)}
.come{position:absolute;left:0;right:0;top:700px;text-align:center}
.come i{display:block;font:600 72px K;color:#fff;font-style:normal;text-shadow:0 4px 16px rgba(0,0,0,.8)}
.come b{display:inline-block;margin-top:6px;background:#fff;color:#111;font:900 92px/1.05 M;padding:14px 36px;border-radius:22px;box-shadow:0 14px 40px rgba(0,0,0,.5)}
.opz{display:flex;gap:28px;align-items:center;border-radius:28px;padding:26px 34px;background:rgba(12,18,34,.9);border:4px solid rgba(255,255,255,.25);box-shadow:0 14px 40px rgba(0,0,0,.5)}
.opz b{flex:0 0 100px;height:100px;border-radius:50%;background:#ffd23f;color:#111;font:900 64px/100px M;text-align:center}
.opz span{font:900 62px M;color:#fff}
.opz.ok{background:#0f8a43;border-color:#7dff9e}.opz.ok b{background:#fff;color:#0f8a43}
.opz.no{opacity:.35}
.chip{display:inline-block;background:#fff;color:#111;font:900 58px M;padding:18px 38px;border-radius:60px;box-shadow:0 12px 34px rgba(0,0,0,.5)}
.onde{position:absolute;left:0;right:0;top:900px;text-align:center}
.onde i{display:inline-block;width:34px;margin:0 9px;border-radius:17px;background:#ffd23f;vertical-align:middle}
.fum{position:absolute;max-width:860px;background:#fff;border-radius:40px;padding:28px 38px 32px;box-shadow:0 16px 46px rgba(0,0,0,.5)}
.fum .chi{font:900 32px M;letter-spacing:3px;margin-bottom:8px}
.fum .q{font:800 56px/1.15 M;color:#111}
.fum:after{content:'';position:absolute;bottom:-34px;width:0;height:0;border:24px solid transparent;border-top:34px solid #fff}
.fum.sx{left:50px}.fum.sx:after{left:70px}.fum.dx{right:50px}.fum.dx:after{right:70px}
.tag{position:absolute;left:50px;top:1180px;display:flex;align-items:stretch;border-radius:22px;overflow:hidden;box-shadow:0 14px 40px rgba(0,0,0,.55)}
.tag b{background:#ffd23f;color:#111;font:900 54px/1.6 M;padding:10px 28px;white-space:nowrap}
.tag span{background:rgba(12,18,34,.92);color:#fff;font:800 38px M;padding:34px 26px 0;white-space:nowrap}
.ep{position:absolute;left:0;right:0;top:250px;text-align:center}
.ep b{display:inline-block;background:#e3132b;color:#fff;font:900 120px/1 M;padding:18px 44px;border-radius:26px;transform:rotate(-3deg);box-shadow:0 18px 50px rgba(0,0,0,.55)}
.ep i{display:block;margin-top:30px;font:600 70px K;color:#fff;font-style:normal;text-shadow:0 4px 16px rgba(0,0,0,.8)}`;
const scrim = (a = .5) => `<div style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,${a + .1}) 0%,rgba(0,0,0,${a - .2}) 40%,rgba(0,0,0,${a - .1}) 65%,rgba(0,0,0,${a + .2}) 100%)"></div>`;
const titolo = (top, html, st = '') => `<div class="ab tit" style="top:${top}px;${st}">${html}</div>`;
const pill = (top, testo, left = 60) => `<div style="position:absolute;left:${left}px;top:${top}px"><span class="pill">${testo}</span></div>`;
const P = {};
// ---- 14 Corsia News: telegiornale
const notizia = (top, k, t, s, rosso = false) => `<div class="ab news" style="top:${top}px"><div class="k ${rosso ? 'r' : ''}">${k}</div><div class="t">${t}</div><div class="s">${s}</div></div>`;
P.news = ['pdro-20f-14-corsia-news', { scrim: scrim(.4),
  banda: `<div class="banda"><b>CORSIA NEWS</b><span>CISL FP AOUP</span></div>`,
  live: `<div class="live">LIVE</div>`,
  s01_titolo: titolo(380, 'CORSIA<br><em class="r">NEWS</em>', 'font-size:130px') + pill(680, 'le notizie in meno di un caffè', 80),
  n1: notizia(360, 'PRIMA NOTIZIA', 'PART-TIME:<br><em>135 POSTI.</em>', 'Domande entro il 3 dicembre.'),
  n2: notizia(360, 'SECONDA NOTIZIA', 'PERMESSI STUDIO <em>2027.</em>', "Domande entro l'11 novembre."),
  n3: notizia(360, "● ULTIM'ORA", 'TURNI DA 12 ORE:<br><em>AL TAVOLO.</em>', 'Sì alla scelta dei lavoratori, no agli automatismi.', true),
}];
// ---- 13 Dizionario della corsia: lettera gigante, parola, definizione
const testa13 = `<div class="ab" style="top:240px;text-align:center"><span class="pill" style="transform:none">IL DIZIONARIO DELLA CORSIA</span></div>`;
const voce13 = (l, w) => `<div class="lettera">${l}</div><div class="come"><i>come</i><b>${w}</b></div>`;
const def13 = (top, t) => `<div class="ab box" style="top:${top}px"><div class="sub">${t}</div></div>`;
P.diz = ['pdro-20f-13-dizionario-della-corsia', { scrim: scrim(.5), testa: testa13,
  s01_voce: voce13('A', 'ARRETRATI'), s01_def: def13(1000, 'Soldi che ti spettano e arrivano dopo.'),
  s01_nota: def13(1220, 'Senza una data scritta, sono solo una <span style="color:#ffd23f">promessa.</span>'),
  s02_voce: voce13('B', 'BUSTA PAGA'), s02_def: def13(1000, 'Il documento più importante che ricevi ogni mese.'),
  s02_nota: def13(1220, 'E il meno letto. <span style="color:#ffd23f">Controllala.</span>'),
  s03_voce: voce13('C', 'COLPA GRAVE'), s03_def: def13(1000, "In caso di errore grave l'Azienda può chiederti di risarcire."),
  s03_nota: def13(1290, 'Per questo c\'è una <span style="color:#ffd23f">polizza dedicata</span> agli iscritti CISL FP.'),
}];
// ---- 16 I veterani reagiscono: teaser senza persone
const chip16 = (top, left, t) => `<div style="position:absolute;left:${left}px;top:${top}px"><span class="chip">${t}</span></div>`;
P.vet = ['pdro-20f-16-i-veterani-reagiscono', { scrim: scrim(.5),
  s01_titolo: titolo(380, 'I VETERANI<br><em>REAGISCONO</em>') + pill(640, '30 anni di servizio contro le novità', 80),
  c1: chip16(380, 70, 'Turni da 12 ore'), c2: chip16(530, 190, 'Intelligenza artificiale'), c3: chip16(680, 110, "Ferie con l'app"),
  presto: titolo(880, 'PRESTO<br>LE LORO <em>REAZIONI.</em>', 'font-size:84px'),
  cerca: `<div class="ab" style="top:1180px"><span class="pill" style="font-size:46px">hai 25 anni di servizio? scrivici!</span></div>`,
}];
// ---- 17 Indovina il reparto: ascolto, tre opzioni, soluzione
const onde = [70, 140, 220, 120, 260, 180, 90, 230, 150, 70].map(h => `<i style="height:${h}px"></i>`).join('');
const opz = (top, l, t, cls = '') => `<div class="ab opz ${cls}" style="top:${top}px"><b>${l}</b><span>${t}</span></div>`;
P.suono = ['pdro-20f-17-indovina-il-reparto', { scrim: scrim(.5),
  s01_titolo: titolo(380, 'INDOVINA<br>IL <em>REPARTO</em>') + pill(640, 'alza il volume', 80),
  ascolta: `<div class="onde">${onde}</div><div class="ab" style="top:1220px;text-align:center"><span class="pill" style="font-size:52px">ascolta…</span></div>`,
  oA: opz(420, 'A', 'Terapia intensiva'), oB: opz(600, 'B', 'Pronto soccorso'), oC: opz(780, 'C', 'Sala operatoria'),
  commenti: `<div class="ab" style="top:1000px"><span class="pill" style="font-size:48px">scrivi la risposta nei commenti</span></div>`,
  sA: opz(420, 'A', 'Terapia intensiva ✓', 'ok'), sB: opz(600, 'B', 'Pronto soccorso', 'no'), sC: opz(780, 'C', 'Sala operatoria', 'no'),
  diritti: titolo(1020, 'OGNI REPARTO<br>HA I SUOI <em>DIRITTI.</em>', 'font-size:76px'),
}];
// ---- 12 Spiegato a mia nonna: fumetti nonna/nipote
const fum = (top, lato, chi, col, q) => `<div class="fum ${lato}" style="top:${top}px"><div class="chi" style="color:${col}">${chi}</div><div class="q">${q}</div></div>`;
const NONNA = '#c2185b', NIP = '#1565c0';
P.nonna = ['pdro-20f-12-spiegato-a-mia-nonna', { scrim: scrim(.4),
  s01_titolo: titolo(380, 'SPIEGATO<br>A MIA <em>NONNA</em>'),
  s01_oggi: pill(660, 'oggi: il fondo pensione', 80),
  f_nonna1: fum(330, 'sx', 'NONNA', NONNA, "E cos'è questo Perseo?"),
  f_nip1: fum(620, 'dx', 'NIPOTE', NIP, 'Metti da parte qualcosa ogni mese per la pensione.'),
  c_az: `<div style="position:absolute;left:70px;top:1010px"><span class="pill" style="font-size:44px">+ la parte dell'Azienda</span></div>`,
  c_fisco: `<div style="position:absolute;left:300px;top:1140px"><span class="pill" style="font-size:44px">+ vantaggi fiscali</span></div>`,
  f_nonna2: fum(330, 'sx', 'NONNA', NONNA, "E perché non l'hai fatto prima?!"),
  f_nonna3: fum(620, 'sx', 'NONNA', NONNA, 'Vai da quelli della CISL, che te lo spiegano bene!'),
}];
// ---- 15 Reparto 7: sitcom
const tag = (n, r) => `<div class="tag"><b>${n}</b><span>${r}</span></div>`;
P.sitcom = ['pdro-20f-15-reparto-7-sitcom', { scrim: scrim(.35),
  sigla: `<div class="ep"><b>REPARTO 7</b><i>ep. 1 · il cambio turno</i></div>`,
  t_rosa: tag('ROSA', 'OSS da 30 anni'), t_marco: tag('MARCO', 'appena assunto'),
  t_coord: tag('COORDINATRICE', 'al telefono'), t_giulia: tag('GIULIA', 'delegata CISL FP'),
  f_marco: fum(330, 'dx', 'MARCO', '#1565c0', 'Ho scambiato la domenica con un collega… su WhatsApp!'),
  f_rosa: fum(640, 'sx', 'ROSA', '#c2185b', "E l'hai detto alla coordinatrice? Va autorizzato, tesoro."),
  f_coord: fum(330, 'sx', 'COORDINATRICE', '#6a1b9a', 'Chi ha cambiato la domenica senza dirmelo?!'),
  f_giulia: fum(640, 'dx', 'GIULIA · CISL FP', '#0f8a43', 'Il cambio si concorda e si fa autorizzare.'),
  morale: `<div class="ab" style="top:1000px;text-align:center"><span class="pill" style="font-size:52px">morale: così tutti sono in regola</span></div>`,
}];
// ---- Reparto 7 ep. 2 «Le ferie» (testo di Claude approvato da Achille l'11/11)
P.ferie = ['pdro-20f-15-reparto-7-ep2-le-ferie', { scrim: scrim(.35),
  sigla: `<div class="ep"><b>REPARTO 7</b><i>ep. 2 · le ferie</i></div>`,
  t_marco: tag('MARCO', 'ha già prenotato il mare'), t_rosa: tag('ROSA', 'ha già le valigie'), t_coord: tag('COORDINATRICE', 'al telefono'),
  f_marco: fum(330, 'dx', 'MARCO', '#1565c0', 'Due settimane ad agosto! Il piano ferie? Lo chiedo dopo.'),
  f_rosa: fum(660, 'sx', 'ROSA', '#c2185b', 'Dopo? Le ferie si chiedono per tempo, tesoro.'),
  f_coord: fum(330, 'sx', 'COORDINATRICE', '#6a1b9a', 'Mi manca uno a Ferragosto. Ti richiamo dalle ferie?'),
  f_giulia: fum(660, 'dx', 'GIULIA · CISL FP', '#0f8a43', "Chieste per tempo: due settimane di fila d'estate."),
  morale: `<div class="ab" style="top:1030px;text-align:center"><span class="pill" style="font-size:38px">richiamato? il viaggio lo paga l'Azienda</span></div>`,
}];
const scelte = process.argv.slice(2);
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--allow-file-access-from-files'] });
const pg = await b.newPage({ viewport: { width: 1080, height: 1920 } });
let n = 0;
for (const [k, [dir, pagine]] of Object.entries(P)) {
  if (scelte.length && !scelte.includes(k)) continue;
  const OUT = path.resolve(QUI, '../..', dir, 'strati'); fs.mkdirSync(OUT, { recursive: true });
  for (const [nome, corpo] of Object.entries(pagine)) {
    const html = path.join(OUT, '_p.html');
    fs.writeFileSync(html, `<html><head><meta charset="utf-8"><style>${CSS}</style></head><body>${corpo}</body></html>`);
    await pg.goto('file://' + html); await pg.evaluate(() => document.fonts.ready); await pg.waitForTimeout(100);
    await pg.screenshot({ path: path.join(OUT, nome + '.png'), omitBackground: true }); fs.unlinkSync(html); n++;
  }
}
await b.close(); console.log('strati', n);
