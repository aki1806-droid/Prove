// Renderizza una scena della serie «Chi c'è domani» dal motore HTML, fotogramma per fotogramma (25 fps).
//   node rendi.mjs <progetto> S02 11.8 montaggio/G_S02.mp4   scena piena  -> H.264
//   node rendi.mjs <progetto> S01 11.4 montaggio/G_S01.mov   overlay      -> ProRes 4444 con alfa
//   node rendi.mjs <progetto> S02 prova 0.5,3,9 cartella/                -> PNG di prova
import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const QUI = path.dirname(fileURLToPath(import.meta.url));
const [prog, sid, modo, a3, a4] = process.argv.slice(2);
const base = path.resolve(prog);
const leggi = f => JSON.parse(fs.readFileSync(path.join(base, f), 'utf8'));
const anim = leggi('grafica/anim.json');
const dati = { base: 'file://' + base, pezzi: leggi('grafica/pezzi.json'), parole: leggi('audio/parole.json'), anim: { [sid]: anim[sid] } };
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--allow-file-access-from-files'] });
const pg = await b.newPage({ viewport: { width: 1080, height: 1920 } });
pg.on('pageerror', e => { console.error('ERRORE', e.message); process.exit(1); });
await pg.goto('file://' + path.join(QUI, 'motore.html'));
await pg.evaluate(d => window.prepara(d), dati);
const fotogramma = async t => Buffer.from((await pg.evaluate(t => { window.disegna(SID, t); return document.getElementById('c').toDataURL('image/png').slice(22); }, t)), 'base64');
await pg.evaluate(s => { window.SID = s; }, sid);
if (modo === 'prova') {
  fs.mkdirSync(a4, { recursive: true });
  for (const t of a3.split(',').map(Number)) fs.writeFileSync(path.join(a4, `${sid}_${t}.png`), await fotogramma(t));
} else {
  const n = Math.round(Number(modo) * 25), alfa = a3.endsWith('.mov');
  const cod = alfa ? ['-c:v', 'prores_ks', '-profile:v', '4444', '-pix_fmt', 'yuva444p10le', '-qscale:v', '9']
                   : ['-c:v', 'libx264', '-preset', 'medium', '-crf', '15', '-pix_fmt', 'yuv420p'];
  const ff = spawn('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', '-f', 'image2pipe', '-framerate', '25', '-c:v', 'png', '-i', '-', ...cod, a3],
    { stdio: ['pipe', 'inherit', 'inherit'] });
  for (let f = 0; f < n; f++) {
    const buf = await fotogramma(f / 25);
    if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
  }
  ff.stdin.end(); await new Promise(r => ff.on('close', r));
  console.log(prog, sid, n, 'fotogrammi');
}
await b.close();
