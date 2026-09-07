/**
 * Formattazione del testo a terminale per la procedura guidata.
 *
 * I colori vengono disattivati quando l'output non è un terminale (una pipe,
 * un file di log) o quando la variabile NO_COLOR è impostata: altrimenti le
 * sequenze di controllo finirebbero visibili nel testo.
 */
const ESC = "\x1b[";
const enabled = process.stdout.isTTY === true && !process.env.NO_COLOR;

function wrap(code: string, text: string): string {
  return enabled ? `${ESC}${code}m${text}${ESC}0m` : text;
}

export const bold = (text: string): string => wrap("1", text);
export const dim = (text: string): string => wrap("2", text);
export const red = (text: string): string => wrap("31", text);
export const green = (text: string): string => wrap("32", text);
export const yellow = (text: string): string => wrap("33", text);

export const tick = (): string => green("✓");
export const cross = (): string => red("✗");
