// Renderizza i PNG fermi di tutte le scene: servono per guardarle e correggerle.
import { chromium } from 'playwright';
import { mkdirSync, writeFileSync } from 'node:fs';
import { SCENE } from './contenuti.mjs';
import { html } from './layout.mjs';

// il numero di lezione viene dal nome della cartella: progetti/m1-l1.2-profilo -> 1.2
const LEZIONE = (new URL('..', import.meta.url).pathname.match(/-l([\d.]+)-/) || [,'?'])[1];

const OUT = new URL('./png/', import.meta.url).pathname;
mkdirSync(OUT, { recursive: true });

const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const p = await b.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });

const troppoAlte = [];
for (const [i, s] of SCENE.entries()) {
  await p.setContent(html(s, { avanzamento: i / (SCENE.length - 1), pagina: LEZIONE }),
                     { waitUntil: 'load' });
  await p.evaluate(() => document.fonts.ready);
  await p.evaluate(() => document.getAnimations().forEach(a => { a.currentTime = 4000; }));
  // Controllo di traboccamento. Attenzione: NON basta guardare scrollHeight di
  // .corpo. E' un flex item con flex:1, quindi quando il contenuto e' troppo
  // alto non scrolla: cresce, e a tagliare e' la slide. Il confronto giusto e'
  // geometrico, fra il rettangolo del corpo e la cornice interna della slide.
  const over = await p.evaluate(() => {
    const c = document.querySelector('.corpo');
    const s = document.querySelector('.slide');
    const st = getComputedStyle(s);
    const rc = c.getBoundingClientRect(), rs = s.getBoundingClientRect();
    const alto  = rs.top    + parseFloat(st.paddingTop);
    const basso = rs.bottom - parseFloat(st.paddingBottom);
    const sx    = rs.left   + parseFloat(st.paddingLeft);
    const dx    = rs.right  - parseFloat(st.paddingRight);
    return {
      sfora: Math.round(Math.max(0, rc.bottom - basso) + Math.max(0, alto - rc.top)
                        + Math.max(0, c.scrollHeight - c.clientHeight)),
      largo: Math.round(Math.max(0, rc.right - dx) + Math.max(0, sx - rc.left)
                        + Math.max(0, c.scrollWidth - c.clientWidth)),
    };
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
