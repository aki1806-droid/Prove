// Render deterministico di pagine animate (CSS) in mp4, fotogramma per fotogramma.
// uso: NODE_PATH=$(npm root -g) node render.js lavori.json
// lavori.json: [{url, out, frames, fps, t0?, cam?:[[scala,tx,ty],...]}]
//   frames: fotogrammi da catturare; t0: ms di animazione da cui partire (per partire dall'ultimo fotogramma);
//   cam: trasformazione di #cam per fotogramma (se c'e')
const { chromium } = require('playwright');
const { spawn } = require('child_process');
const fs = require('fs');
const FF = process.env.FFMPEG || 'ffmpeg';
(async () => {
  const lavori = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
  const p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
  for (const L of lavori) {
    if (fs.existsSync(L.out) && !process.env.RIFAI) { console.log('salto', L.out); continue; }
    await p.goto('about:blank');
    await p.goto(L.url, { waitUntil: 'load' });
    await p.evaluate(() => document.fonts.ready);
    await p.evaluate(() => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r))));
    await p.evaluate(() => { document.getAnimations().forEach(a => a.pause()); document.querySelectorAll('svg').forEach(s => s.pauseAnimations && s.pauseAnimations()); });
    const fps = L.fps || 30;
    const ff = spawn(FF, ['-v', 'error', '-y', '-f', 'image2pipe', '-framerate', String(fps), '-i', '-',
      '-c:v', 'libx264', '-preset', 'medium', '-crf', '12', '-pix_fmt', 'yuv420p', L.out + '.tmp.mp4']);
    for (let f = 0; f < L.frames; f++) {
      const t = (L.t0 || 0) + f * 1000 / fps;
      const c = L.cam ? L.cam[Math.min(f, L.cam.length - 1)] : null;
      await p.evaluate(([t, c]) => {
        document.getAnimations().forEach(a => { a.currentTime = t; });
        document.querySelectorAll('svg').forEach(s => s.setCurrentTime && s.setCurrentTime(t / 1000));   // animazioni SMIL
        if (c) { const e = document.getElementById('cam'); if (e) e.style.transform = `translate(${c[1]}px,${c[2]}px) scale(${c[0]})`; }
      }, [t, c]);
      const png = await p.screenshot({ type: 'jpeg', quality: 95 });
      if (!ff.stdin.write(png)) await new Promise(r => ff.stdin.once('drain', r));
    }
    ff.stdin.end();
    await new Promise((res, rej) => ff.on('close', c => c ? rej(new Error('ffmpeg ' + c)) : res()));
    fs.renameSync(L.out + '.tmp.mp4', L.out);
    console.log('ok', L.out, L.frames);
  }
  await b.close();
})().catch(e => { console.error(e); process.exit(1); });
