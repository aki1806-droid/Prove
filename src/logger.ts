/**
 * Logger JSON minimale su stdout: nessuna dipendenza, e le righe restano
 * indicizzabili da qualunque log collector.
 *
 * `redactPhone` esiste perché i numeri di telefono sono dati personali:
 * nei log ne teniamo solo la coda, sufficiente per correlare una segnalazione
 * a una conversazione senza archiviare l'identificativo in chiaro.
 */

type Level = "info" | "warn" | "error";

function emit(level: Level, message: string, fields: Record<string, unknown>): void {
  const line = JSON.stringify({
    ts: new Date().toISOString(),
    level,
    message,
    ...fields,
  });
  if (level === "error") console.error(line);
  else console.log(line);
}

export const log = {
  info: (message: string, fields: Record<string, unknown> = {}) =>
    emit("info", message, fields),
  warn: (message: string, fields: Record<string, unknown> = {}) =>
    emit("warn", message, fields),
  error: (message: string, fields: Record<string, unknown> = {}) =>
    emit("error", message, fields),
};

export function redactPhone(waId: string): string {
  return waId.length <= 4 ? "***" : `***${waId.slice(-4)}`;
}
