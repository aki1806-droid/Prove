// Dove sta il browser non si mura in due file.
//
// La cartella del browser porta il numero della versione di Playwright che
// l'ha scaricato: il percorso scritto a mano dentro cards.mjs e clips.mjs era
// /opt/pw-browsers/chromium-1194/, e il contenitore nuovo ha la 1243. I due
// strumenti sono morti al primo avvio, prima di renderizzare qualunque cosa.
//
// Si chiede a Playwright dove sia — e' lui che l'ha installato — e solo se non
// risponde si guarda il collegamento stabile /opt/pw-browsers/chromium, che
// l'ambiente tiene puntato alla versione presente.
import { chromium } from 'playwright';
import { existsSync } from 'node:fs';

const FISSO = '/opt/pw-browsers/chromium';

export async function apri() {
  try { return await chromium.launch(); }
  catch (e) {
    if (!existsSync(FISSO)) throw e;
    return await chromium.launch({ executablePath: FISSO });
  }
}
