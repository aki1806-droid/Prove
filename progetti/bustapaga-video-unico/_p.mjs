import { chromium } from 'playwright';
import { readdirSync, writeFileSync, unlinkSync } from 'node:fs';
const PNG = new URL('./slide/png/', import.meta.url).pathname;
const OUT = '/tmp/claude-0/-home-user-Prove/9ea37e09-7734-5359-ab14-b59db69b685e/scratchpad/provini-bp';
const solo = process.argv[2] ? new RegExp(process.argv[2]) : /./;
const file = readdirSync(PNG).filter(f => f.endsWith('.png') && solo.test(f)).sort();
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const p = await b.newPage({ viewport: { width: 1640, height: 700 }, deviceScaleFactor: 1 });
for (let i = 0; i < file.length; i += 6) {
  const g = file.slice(i, i + 6), tmp = `${PNG}_p.html`;
  writeFileSync(tmp, `<style>body{margin:0;background:#3A3A3A;display:grid;grid-template-columns:repeat(3,1fr);gap:10px;padding:10px;font:13px monospace}figure{margin:0}img{width:100%;display:block;border:1px solid #666}figcaption{color:#EEE;padding:4px 2px}</style>`+
    g.map(f=>`<figure><img src="${f}"><figcaption>${f.replace('.png','')}</figcaption></figure>`).join(''));
  await p.goto(`file://${tmp}`, { waitUntil: 'load' });
  await p.waitForFunction(() => [...document.images].every(im => im.complete && im.naturalWidth > 0));
  await p.screenshot({ path: `${OUT}/q${String(i/6+1).padStart(2,'0')}.png`, fullPage: true });
  unlinkSync(tmp);
}
await b.close(); console.log(`${Math.ceil(file.length/6)} provini`);
