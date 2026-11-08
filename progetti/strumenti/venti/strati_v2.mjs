// 20 format attrattivi, versione 2 (8/11, «più attrattivi»): livelli trasparenti 1080x1920 sopra le clip HeyGen per
// 02 Green flag, 03 Mito, 04 Calendario. Stesso stile del Traduttore (strati_tr.mjs).   node strumenti/venti/strati_v2.mjs
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
.tit{font:900 92px/1.0 M;color:#fff;text-shadow:0 8px 30px rgba(0,0,0,.6);letter-spacing:-2px;text-align:center}
.tit em{font-style:normal;color:#ffd23f}
.sub{font:600 66px K;color:#fff;text-shadow:0 4px 16px rgba(0,0,0,.7);text-align:center}
.box{background:rgba(12,18,34,.84);border:3px solid rgba(255,255,255,.18);border-radius:34px;padding:34px 44px 40px;box-shadow:0 20px 60px rgba(0,0,0,.45)}
.lab{font:800 32px M;letter-spacing:4px;color:#8fb4ff;margin-bottom:14px}
.q{font:800 70px/1.12 M;color:#fff}
.k{font:600 82px/1.05 K;color:#fff}
.hl{background:#ffd23f;border-radius:20px;padding:26px 44px 32px;transform:rotate(-2deg);box-shadow:0 18px 50px rgba(0,0,0,.5)}
.hl .q{color:#111;font-weight:900}
.fl{display:flex;gap:40px;align-items:center;border-radius:34px;padding:40px 44px;box-shadow:0 20px 60px rgba(0,0,0,.5)}
.fl.g{background:linear-gradient(135deg,#0f8a43,#0a5c2d);border:4px solid #7dff9e}
.fl.r{background:linear-gradient(135deg,#1c3fa8 0%,#1c3fa8 50%,#b5122b 50%,#b5122b 100%);border:4px solid #ff8a8a}
.fl .ic{flex:0 0 170px;height:170px;border-radius:50%;background:#fff;display:flex;align-items:center;justify-content:center;font:900 120px M}
.fl.g .ic{color:#0f8a43}.fl.r .ic{color:#b5122b}
.fl .lab{color:#fff;opacity:.9;font-size:38px}
.fl .q{font-size:64px;text-shadow:0 3px 12px rgba(0,0,0,.4)}
.timbro{position:absolute;left:250px;top:1000px;width:560px;text-align:center;font:900 150px M;color:#e0102f;border:14px solid #e0102f;
  border-radius:26px;transform:rotate(-12deg);background:rgba(255,255,255,.9);letter-spacing:6px;box-shadow:0 16px 50px rgba(0,0,0,.5)}
.real{background:#fff;border-radius:34px;padding:34px 44px 40px;box-shadow:0 20px 60px rgba(0,0,0,.5);border-left:18px solid #0f8a43}
.real .lab{color:#0f8a43}.real .q{color:#111;font-size:58px}
.real .n{font:800 34px M;color:#555;margin-top:16px}
.porta{position:absolute;left:340px;top:400px;width:400px;height:430px;border-radius:40px;background:linear-gradient(160deg,#c8102e,#7a0a1c);
  border:12px solid #ffd23f;box-shadow:0 24px 70px rgba(0,0,0,.6),inset 0 0 0 6px rgba(255,255,255,.15);text-align:center}
.porta .nn{font:900 250px/1 M;color:#fff;margin-top:40px;text-shadow:0 8px 24px rgba(0,0,0,.45)}
.porta .dm{font:900 46px M;color:#ffd23f;letter-spacing:6px;margin-top:10px}
.cifra{font:900 108px/1.0 M;color:#ffd23f;margin-bottom:12px}
.det{font:800 54px/1.18 M;color:#fff}
.dom{font:600 74px K;color:#ffd23f;text-align:center;text-shadow:0 4px 16px rgba(0,0,0,.8)}`;
const P = {};
const scrim = `<div style="position:absolute;inset:0;background:rgba(6,10,22,.55)"></div>`;
const scrimG = `<div style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,.55) 0%,rgba(0,0,0,.25) 35%,rgba(0,0,0,.35) 60%,rgba(0,0,0,.8) 100%)"></div>`;
// ---- 02 Green flag
const GF = 'pdro-20f-02-green-flag';
const flag = (top, verde, testo) => `<div class="ab fl ${verde ? 'g' : 'r'}" style="top:${top}px"><div class="ic">${verde ? '✓' : '✗'}</div>
  <div><div class="lab">${verde ? 'GREEN FLAG' : 'BLUE-RED FLAG'}</div><div class="q">${testo}</div></div></div>`;
P[GF] = {
  scrim, s01_titolo: `<div class="ab tit" style="top:300px"><span style="color:#5dff8a">GREEN FLAG</span><br>o <span style="color:#ff6b7d">BLUE-RED</span>?</div><div class="ab sub" style="top:500px">il sindacalista che vuoi accanto</div>`,
  s01_f1: flag(760, 1, 'Ti controlla il cedolino riga per riga.'),
  s01_f2: flag(760, 0, 'Ti promette gli arretrati senza una data.'),
  s01_f3: flag(760, 1, "C'è tutto l'anno, non solo sotto le elezioni."),
  s02_f1: flag(700, 0, 'Non si presenta alle riunioni RSU «per strategia».'),
  s02_f2: flag(700, 1, 'Firma gli accordi e te li mostra nero su bianco.'),
  s02_f3: flag(700, 0, 'Annuncia risultati storici che nessuno ha mai visto.'),
};
// ---- 03 Mito
const MI = 'pdro-20f-03-mito-da-sfatare';
const miti = [["Se mi iscrivo al sindacato, l'Azienda mi penalizza.", "La legge vieta qualsiasi discriminazione per l'iscrizione o l'attività sindacale.", 'Statuto dei lavoratori, art. 15'],
  ['Il sindacato serve solo quando hai un problema.', 'Serve prima: contratti, accordi, cedolini controllati, corsi, informazioni.', 'Quando il problema arriva, sei già preparato.'],
  ['Tanto i sindacati sono tutti uguali.', "C'è chi annuncia e chi firma. Chi si vede solo sotto le elezioni e chi c'è tutto l'anno.", 'Giudica dai fatti.']];
P[MI] = { scrim: scrimG };
miti.forEach(([m, r, n], i) => {
  const s = `s0${i + 1}`;
  P[MI][`${s}_titolo`] = `<div class="ab tit" style="top:290px">MITO <em>N° ${i + 1}</em></div>`;
  P[MI][`${s}_mito`] = `<div class="ab box" style="top:470px"><div class="lab">IL MITO</div><div class="k">«${m}»</div></div>`;
  P[MI][`${s}_timbro`] = `<div class="timbro" style="top:${i === 2 ? 700 : 760}px">FALSO</div>`;
  P[MI][`${s}_realta`] = `<div class="ab real" style="top:1030px"><div class="lab">LA REALTÀ</div><div class="q">${r}</div><div class="n">${n}</div></div>`;
});
// ---- 04 Calendario
const CA = 'pdro-20f-04-calendario-avvento';
const cas = [['Riposo giornaliero', '11 ore', 'consecutive di riposo ogni 24'], ['Riposo settimanale', '24 ore', "consecutive ogni 7 giorni, di regola insieme alle 11 del riposo giornaliero"],
  ['Orario massimo', '48 ore', 'in media a settimana, straordinari compresi'], ['Ferie', '4 settimane', "almeno, ogni anno, retribuite. E non si rinunciano."],
  ['Diritto allo studio', '150 ore', "l'anno di permessi retribuiti per studiare"], ['Legge 104', '3 giorni', 'di permesso al mese per assistere un familiare con disabilità grave'],
  ['Congedo parentale', 'fino a 12 anni', 'del figlio, per entrambi i genitori'], ['Congedo di paternità', '10 giorni', 'lavorativi obbligatori per il papà, retribuiti al 100%'],
  ['Allattamento', '1° anno', 'del bambino: riposi giornalieri retribuiti per la mamma o, in alcuni casi, per il papà'],
  ['Malattia', 'posto conservato', 'per il periodo stabilito dal contratto: chiedi a noi come si calcola'], ['Visite ed esami', 'permessi orari', 'per visite, terapie ed esami diagnostici'],
  ['Lutto', 'permessi retribuiti', 'in caso di decesso di un familiare stretto'], ['Matrimonio', '15 giorni', "consecutivi di congedo retribuito, anche per l'unione civile"],
  ['Donazione di sangue', '1 giorno', 'di riposo retribuito: quello della donazione'], ['Assemblea', 'ore retribuite', 'di assemblea in orario di lavoro, ogni anno'],
  ['Affissione', 'le bacheche', 'il sindacato ha diritto agli spazi per informarti'], ['Libertà di opinione', 'le tue idee', 'puoi esprimerle sul lavoro, nel rispetto della legge'],
  ['Niente discriminazioni', 'zero penalità', "per l'iscrizione o l'attività sindacale"], ['Dispositivi di protezione', 'non li paghi tu', 'li fornisce il datore di lavoro'],
  ['Medico competente', 'visita su richiesta', 'se pensi che il lavoro incida sulla tua salute'], ['Contro le aggressioni', 'pene più severe', 'per chi aggredisce il personale sanitario'],
  ['Part-time', 'tempo parziale', 'nei limiti e con i criteri del contratto e dei bandi'], ['Formazione', 'in orario di lavoro', 'quella obbligatoria non si fa nel tuo tempo libero'],
  ['Tredicesima', 'a dicembre', 'arriva la tredicesima mensilità. Controlla che sia giusta!']];
P[CA] = { scrim: `<div style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(60,0,10,.55) 0%,rgba(20,0,5,.35) 40%,rgba(10,0,4,.7) 100%)"></div>`,
  testa: `<div class="ab tit" style="top:250px;font-size:54px;letter-spacing:0">IL CALENDARIO DELL'<em>AVVENTO</em></div><div class="ab sub" style="top:305px;font-size:56px">dei diritti</div>`,
  domani: `<div class="ab dom" style="top:1640px">Domani si apre un'altra casella.</div>` };
cas.forEach(([t, c, d], i) => {
  const s = `s${String(i + 1).padStart(2, '0')}`;
  P[CA][`${s}_porta`] = `<div class="porta"><div class="nn">${i + 1}</div><div class="dm">DICEMBRE</div></div>`;
  P[CA][`${s}_nome`] = `<div class="ab hl" style="top:890px;text-align:center"><div class="q" style="font-size:${t.length > 20 ? 62 : 74}px">${t.toUpperCase()}</div></div>`;
  P[CA][`${s}_card`] = `<div class="ab box" style="top:1110px"><div class="cifra" style="font-size:${c.length > 14 ? 84 : 108}px">${c}</div><div class="det">${d}</div></div>`;
});
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--allow-file-access-from-files'] });
const pg = await b.newPage({ viewport: { width: 1080, height: 1920 } });
let n = 0;
for (const [dir, pagine] of Object.entries(P)) {
  const OUT = path.resolve(QUI, '../..', dir, 'strati'); fs.mkdirSync(OUT, { recursive: true });
  for (const [nome, corpo] of Object.entries(pagine)) {
    const html = path.join(OUT, '_p.html');
    fs.writeFileSync(html, `<html><head><meta charset="utf-8"><style>${CSS}</style></head><body>${corpo}</body></html>`);
    await pg.goto('file://' + html); await pg.evaluate(() => document.fonts.ready); await pg.waitForTimeout(120);
    await pg.screenshot({ path: path.join(OUT, nome + '.png'), omitBackground: true }); fs.unlinkSync(html); n++;
  }
}
await b.close(); console.log('strati', n);
