// Renderizza i PNG fermi di tutte le scene: servono per guardarle e correggerle.
import { chromium } from 'playwright';
import { mkdirSync, writeFileSync } from 'node:fs';
import { SCENE } from './contenuti.mjs';
import { html } from './layout.mjs';

const OUT = new URL('./png/', import.meta.url).pathname;
mkdirSync(OUT, { recursive: true });

const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const p = await b.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });

const troppoAlte = [];
for (const [i, s] of SCENE.entries()) {
  await p.setContent(html(s, { avanzamento: i / (SCENE.length - 1), pagina: '1.1' }),
                     { waitUntil: 'load' });
  await p.evaluate(() => document.fonts.ready);
  // controllo di traboccamento: il corpo non deve uscire dalla cornice
  const over = await p.evaluate(() => {
    const c = document.querySelector('.corpo');
    return { sfora: c.scrollHeight - c.clientHeight, largo: c.scrollWidth - c.clientWidth };
  });
  if (over.sfora > 1 || over.largo > 1) troppoAlte.push([s.id, over]);
  await p.screenshot({ path: `${OUT}${s.id}.png` });
  process.stdout.write(`${s.id} `);
}
await b.close();
console.log('\n');
if (troppoAlte.length) {
  console.log('SFORANO LA CORNICE:');
  for (const [id, o] of troppoAlte) console.log(`  ${id}  +${o.sfora}px in altezza, +${o.largo}px in larghezza`);
} else console.log('nessuna slide sfora la cornice');
writeFileSync(new URL('./troppo-alte.json', import.meta.url), JSON.stringify(troppoAlte, null, 1));
