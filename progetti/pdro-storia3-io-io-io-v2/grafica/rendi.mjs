// Renderizza il livello grafico di una scena dal motore HTML, fotogramma per fotogramma (25 fps).
//   node grafica/rendi.mjs S01 12.03 montaggio/G_S01.mov   -> video con canale alfa (png in mov)
//   node grafica/rendi.mjs S01 prova 0.5,3,9 cartella/     -> singoli PNG di prova
import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const QUI = path.dirname(fileURLToPath(import.meta.url));
const [sid, durOrMode, a3, a4] = process.argv.slice(2);
const id = 's' + Number(sid.slice(1));
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' }).catch(() => chromium.launch());
const pg = await b.newPage({ viewport: { width: 1080, height: 1920 } });
await pg.goto('file://' + path.join(QUI, 'motore.html'));
await pg.evaluate(() => document.fonts.ready);
if (durOrMode === 'prova') {
  for (const t of a3.split(',').map(Number)) {
    await pg.evaluate(([id, t]) => window.render(id, t, 0, Math.round(t * 25)), [id, t]);
    await pg.screenshot({ path: path.join(a4, `${sid}_${t}.png`), omitBackground: true });
  }
} else {
  const n = Math.round(Number(durOrMode) * 25);
  const ff = spawn('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', '-f', 'image2pipe', '-framerate', '25', '-c:v', 'png', '-i', '-',
    '-c:v', 'png', '-pix_fmt', 'rgba', a3], { stdio: ['pipe', 'inherit', 'inherit'] });
  for (let f = 0; f < n; f++) {
    await pg.evaluate(([id, t, f]) => window.render(id, t, 0, f), [id, f / 25, f]);
    const buf = await pg.screenshot({ omitBackground: true, type: 'png' });
    if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
  }
  ff.stdin.end(); await new Promise(r => ff.on('close', r));
  console.log(sid, n, 'fotogrammi');
}
await b.close();
