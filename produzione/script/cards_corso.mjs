/*
 * Slide ferme del corso "Dire, ascoltare, convincere" — La Parola Giusta.
 *
 *   node cards_corso.mjs cards.json ./out
 *
 * Layout, palette e caratteri stanno in slide_corso.mjs, condivisi con
 * clips_corso.mjs: cosi' la versione ferma e quella animata non divergono.
 */
import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { page } from './slide_corso.mjs';

const [, , cardsPath, outDir = '.'] = process.argv;
const cards = JSON.parse(fs.readFileSync(cardsPath, 'utf8'));
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
const p = await ctx.newPage();
fs.mkdirSync(outDir, { recursive: true });
for (const c of cards) {
  await p.setContent(page(c));
  await p.evaluate(() => document.fonts.ready);
  const f = path.join(outDir, `${c.file}.png`);
  await p.screenshot({ path: f });
  console.log(f, fs.statSync(f).size);
}
await browser.close();
