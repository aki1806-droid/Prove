/**
 * Costruzione del contenuto del file `.env`.
 *
 * Separata dal wizard per poterla testare: un file scritto male è un errore
 * che si manifesta molto più tardi, all'avvio, con un messaggio poco chiaro.
 */

export interface EnvValues {
  verifyToken: string;
  appSecret: string;
  whatsappToken: string;
  phoneNumberId: string;
  appId?: string;
  anthropicKey: string;
}

export function renderEnvFile(values: EnvValues): string {
  const lines = [
    "# Generato da `npm run setup`.",
    "# Contiene credenziali: non va condiviso ne' messo su git.",
    "# (.gitignore lo esclude gia'.)",
    "",
    "# --- WhatsApp Cloud API ---",
    `WHATSAPP_VERIFY_TOKEN=${values.verifyToken}`,
    `WHATSAPP_APP_SECRET=${values.appSecret}`,
    `WHATSAPP_TOKEN=${values.whatsappToken}`,
    `WHATSAPP_PHONE_NUMBER_ID=${values.phoneNumberId}`,
  ];

  // Serve solo alla diagnostica: l'applicazione non lo usa.
  if (values.appId) lines.push(`WHATSAPP_APP_ID=${values.appId}`);

  lines.push(
    "",
    "# --- Claude ---",
    `ANTHROPIC_API_KEY=${values.anthropicKey}`,
    "",
    "# Le altre impostazioni hanno valori di default sensati.",
    "# Vedi .env.example per l'elenco completo e cosa fa ciascuna.",
    "",
  );

  return lines.join("\n");
}

/**
 * Ripulisce un valore incollato dal pannello Meta: spazi ai bordi, virgolette
 * e a capo finiscono spesso nella clipboard insieme al valore.
 */
export function cleanPastedValue(raw: string): string {
  return raw.trim().replace(/^["']|["']$/g, "").trim();
}
