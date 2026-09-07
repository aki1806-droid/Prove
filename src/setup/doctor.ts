/**
 * Diagnostica: `npm run doctor`.
 *
 * Ricontrolla che la configurazione sia completa e che le credenziali siano
 * ancora valide. Serve soprattutto quando "ha smesso di funzionare": la causa
 * più frequente è il token temporaneo di Meta scaduto dopo 24 ore, e questo
 * comando lo dice in chiaro invece di lasciarlo dedurre da un 401 nei log.
 *
 * Con `--messaggio <numero>` prova anche a inviare un messaggio reale, che è
 * l'unico modo per validare la catena in uscita fino al telefono.
 */
import { loadEnvFile } from "../env.js";
import { bold, cross, dim, green, red, tick, yellow } from "./ui.js";
import type { CheckResult } from "./validators.js";
import { checkAnthropicKey, checkAppSecret, checkWhatsAppNumber } from "./validators.js";

loadEnvFile();

const GRAPH_VERSION = process.env.WHATSAPP_GRAPH_VERSION ?? "v23.0";

/** Variabili senza cui il servizio non parte nemmeno. */
const REQUIRED = [
  ["WHATSAPP_VERIFY_TOKEN", "la parola d'ordine che hai incollato nel pannello Meta"],
  ["WHATSAPP_APP_SECRET", "la chiave segreta dell'app, che firma i webhook"],
  ["WHATSAPP_TOKEN", "il token di accesso alla Graph API"],
  ["WHATSAPP_PHONE_NUMBER_ID", "l'id del numero mittente"],
  ["ANTHROPIC_API_KEY", "la chiave per far rispondere Claude"],
] as const;

async function main(): Promise<void> {
  console.log(`\n${bold("Controllo della configurazione")}\n`);

  const missing = REQUIRED.filter(([name]) => !process.env[name]);
  if (missing.length > 0) {
    console.log(`${cross()} ${red("Mancano delle credenziali nel file .env:")}\n`);
    for (const [name, description] of missing) {
      console.log(`   ${bold(name)} — ${description}`);
    }
    console.log(`\n   Esegui ${bold("npm run setup")} per configurarle.\n`);
    process.exitCode = 1;
    return;
  }
  console.log(`${tick()} ${green("tutte le credenziali sono presenti nel file .env")}`);

  let failures = 0;

  // L'app secret si può verificare solo se il setup ha salvato anche l'id app.
  const appId = process.env.WHATSAPP_APP_ID;
  if (appId) {
    failures += await report("chiave segreta dell'app", () =>
      checkAppSecret({
        appId,
        appSecret: process.env.WHATSAPP_APP_SECRET!,
        graphVersion: GRAPH_VERSION,
      }),
    );
  } else {
    console.log(
      `${yellow("!")} ${dim("salto la chiave segreta: WHATSAPP_APP_ID non è nel .env")}`,
    );
    console.log(
      dim("   Non è un problema per il funzionamento, solo per questa verifica.\n") +
        dim("   Se i webhook vengono rifiutati con 403, la chiave segreta è la prima sospettata."),
    );
  }

  failures += await report("numero WhatsApp e token", () =>
    checkWhatsAppNumber({
      token: process.env.WHATSAPP_TOKEN!,
      phoneNumberId: process.env.WHATSAPP_PHONE_NUMBER_ID!,
      graphVersion: GRAPH_VERSION,
    }),
  );

  failures += await report("chiave Claude", () =>
    checkAnthropicKey({ apiKey: process.env.ANTHROPIC_API_KEY! }),
  );

  if (failures > 0) {
    console.log(`\n${red(`${failures} controllo/i non superato/i.`)} Correggi e riprova.\n`);
    process.exitCode = 1;
    return;
  }

  console.log(`\n${green("Tutto a posto.")}`);

  const recipient = readRecipient();
  if (recipient) {
    await sendTestMessage(recipient);
  } else {
    console.log(
      dim("\nPer provare anche l'invio reale: npm run doctor -- --messaggio 393331234567\n"),
    );
  }
}

async function report(label: string, check: () => Promise<CheckResult>): Promise<number> {
  process.stdout.write(dim(`   verifico ${label}... `));
  const result = await check();

  if (result.ok) {
    console.log(`${tick()} ${green(result.detail)}`);
    return 0;
  }

  console.log(cross());
  console.log(`   ${red(result.problem)}`);
  console.log(`   ${result.fix}`);
  return 1;
}

/** Legge il numero destinatario da `--messaggio <numero>`. */
function readRecipient(): string | undefined {
  const index = process.argv.indexOf("--messaggio");
  if (index === -1) return undefined;

  const raw = process.argv[index + 1];
  if (!raw) {
    console.log(yellow("\n--messaggio richiede un numero, es. --messaggio 393331234567"));
    return undefined;
  }

  // La Graph API vuole il formato internazionale senza '+' e senza spazi.
  return raw.replace(/[^0-9]/g, "");
}

async function sendTestMessage(to: string): Promise<void> {
  const { WhatsAppClient } = await import("../whatsapp/client.js");

  const client = new WhatsAppClient({
    token: process.env.WHATSAPP_TOKEN!,
    phoneNumberId: process.env.WHATSAPP_PHONE_NUMBER_ID!,
    graphVersion: GRAPH_VERSION,
  });

  console.log(`\n${dim(`Invio un messaggio di prova a ${to}...`)}`);

  try {
    await client.sendText(to, "Messaggio di prova dal bot. Se lo leggi, l'invio funziona.");
    console.log(`${tick()} ${green("inviato: controlla il telefono")}\n`);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.log(`${cross()} ${red("invio fallito")}`);
    console.log(`   ${message}\n`);

    if (message.includes("131030") || message.includes("not in allowed list")) {
      console.log(
        `   ${bold("Causa tipica:")} con il numero di test puoi scrivere solo ai destinatari\n` +
          "   che hai registrato a mano in WhatsApp > Configurazione API.\n",
      );
    } else if (message.includes("131047") || message.includes("24")) {
      console.log(
        `   ${bold("Causa tipica:")} sono passate più di 24 ore dall'ultimo messaggio di\n` +
          "   quel contatto. Fatti scrivere prima da lui, poi riprova.\n",
      );
    }
    process.exitCode = 1;
  }
}

main().catch((error: unknown) => {
  console.error(red(`\nErrore: ${error instanceof Error ? error.message : String(error)}\n`));
  process.exitCode = 1;
});
