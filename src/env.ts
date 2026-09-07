/**
 * Carica il file `.env` nell'ambiente del processo.
 *
 * Va importato per primo, prima di qualunque lettura di `process.env`.
 * Se il file non c'è non è un errore: in produzione le variabili arrivano
 * dall'hosting, non da un file sul disco.
 */
export function loadEnvFile(path = ".env"): boolean {
  try {
    process.loadEnvFile(path);
    return true;
  } catch {
    return false;
  }
}
