/**
 * Procedura guidata di configurazione: `npm run setup`.
 *
 * Chiede una credenziale alla volta, dice dove trovarla e la verifica subito
 * contro il servizio reale. L'obiettivo è che un valore sbagliato si scopra
 * qui, con una spiegazione, invece che a bot muto tre passi dopo.
 */
import crypto from "node:crypto";
import fs from "node:fs";
import readline from "node:readline/promises";
import { cleanPastedValue, renderEnvFile } from "./env-file.js";
import { bold, cross, dim, green, red, tick, yellow } from "./ui.js";
import type { CheckResult } from "./validators.js";
import { checkAnthropicKey, checkAppSecret, checkWhatsAppNumber } from "./validators.js";

const GRAPH_VERSION = "v23.0";
const ENV_PATH = ".env";

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

async function main(): Promise<void> {
  console.log(`
${bold("Configurazione del bot WhatsApp")}

Ti chiedo cinque valori, uno alla volta, dicendoti dove trovarli.
Dopo ognuno controllo che funzioni davvero, quindi se sbagli lo scopri subito.

${dim("Tieni aperto il pannello Meta: developers.facebook.com/apps")}
${dim("Puoi interrompere quando vuoi con Ctrl+C e ripartire da capo.")}
`);

  if (!(await confirmOverwrite())) {
    console.log("\nNon ho toccato nulla. Alla prossima.\n");
    return;
  }

  // Prima l'app: identifica l'app Meta e valida la chiave che firma i webhook.
  console.log(bold("\n1. L'app Meta\n"));
  console.log(`Nel pannello: ${bold("Impostazioni app > Di base")}.`);
  console.log(dim("Se non hai ancora creato l'app, leggi GUIDA.md prima di continuare.\n"));

  const appId = await ask("ID app", "il numero lungo in cima alla pagina");
  const appSecret = await askAndCheck(
    "Chiave segreta",
    "accanto a 'Chiave segreta', premi 'Mostra' e copiala",
    (value) => checkAppSecret({ appId, appSecret: value, graphVersion: GRAPH_VERSION }),
  );

  // Poi il numero: token e id vengono verificati con una sola chiamata.
  console.log(bold("\n2. Il numero WhatsApp\n"));
  console.log(`Nel pannello: ${bold("WhatsApp > Configurazione API")}.`);
  console.log(
    dim("Il token mostrato lì scade dopo 24 ore: per provare va benissimo, lo sostituirai\n") +
      dim("con uno permanente quando passerai a un numero reale.\n"),
  );

  const phoneNumberId = await ask(
    "ID numero di telefono",
    "il codice numerico sotto 'Da', NON il numero di telefono",
  );
  const whatsappToken = await askAndCheck(
    "Token di accesso",
    "il riquadro 'Token di accesso temporaneo'",
    (value) => checkWhatsAppNumber({ token: value, phoneNumberId, graphVersion: GRAPH_VERSION }),
  );

  // Infine Claude.
  console.log(bold("\n3. La chiave Claude\n"));
  console.log(`Su ${bold("console.anthropic.com/settings/keys")}, premi 'Create Key'.`);
  console.log(dim("Serve del credito sull'account perché il bot possa rispondere.\n"));

  const anthropicKey = await askAndCheck(
    "Chiave API Anthropic",
    "inizia con sk-ant-",
    (value) => checkAnthropicKey({ apiKey: value }),
  );

  // Il verify token non viene da Meta: è una parola d'ordine che scegliamo noi
  // e che riscriveremo nel pannello. La generiamo per non farla inventare.
  const verifyToken = crypto.randomBytes(24).toString("hex");

  fs.writeFileSync(
    ENV_PATH,
    renderEnvFile({ verifyToken, appSecret, whatsappToken, phoneNumberId, appId, anthropicKey }),
    { mode: 0o600 },
  );

  console.log(`\n${tick()} Ho scritto il file ${bold(ENV_PATH)} con le tue credenziali.\n`);
  printNextSteps(verifyToken);
}

/** Non sovrascriviamo un `.env` esistente senza chiedere: contiene credenziali. */
async function confirmOverwrite(): Promise<boolean> {
  if (!fs.existsSync(ENV_PATH)) return true;

  console.log(yellow(`Esiste già un file ${ENV_PATH}.`));
  const answer = await rl.question("Lo sovrascrivo? Le credenziali attuali andranno perse [s/N] ");
  return /^s(i|ì)?$/i.test(answer.trim());
}

/** Chiede un valore, rifiutando una risposta vuota. */
async function ask(label: string, hint: string): Promise<string> {
  for (;;) {
    console.log(dim(`   ${hint}`));
    const value = cleanPastedValue(await rl.question(`${label}: `));
    if (value) return value;
    console.log(red("   Non hai inserito nulla. Riprova.\n"));
  }
}

/**
 * Chiede un valore e lo verifica, riproponendo la domanda finché non funziona.
 * È il cuore della procedura: senza, l'utente scopre l'errore molto più tardi.
 *
 * Dopo un fallimento offre sempre una via d'uscita. La verifica può fallire per
 * cause fuori dal controllo di chi sta configurando — Meta irraggiungibile, una
 * rete che blocca la richiesta — e restare bloccati a rispondere alla stessa
 * domanda sarebbe peggio che procedere con un valore non confermato.
 */
async function askAndCheck(
  label: string,
  hint: string,
  check: (value: string) => Promise<CheckResult>,
): Promise<string> {
  for (;;) {
    const value = await ask(label, hint);

    process.stdout.write(dim("   verifico... "));
    const result = await check(value);

    if (result.ok) {
      console.log(`${tick()} ${green(result.detail)}\n`);
      return value;
    }

    console.log(cross());
    console.log(red(`   ${result.problem}`));
    console.log(`   ${result.fix}\n`);

    const choice = (
      await rl.question(
        `   ${dim("[Invio]")} riprova  ${dim("·")}  ${dim("[c]")} tieni questo valore  ${dim("·")}  ${dim("[q]")} esci: `,
      )
    )
      .trim()
      .toLowerCase();

    if (choice === "q") {
      console.log("\nInterrotto. Non ho scritto nessun file.\n");
      process.exit(0);
    }
    if (choice === "c") {
      console.log(yellow(`   Tengo il valore senza averlo verificato.\n`));
      return value;
    }
    console.log("");
  }
}

function printNextSteps(verifyToken: string): void {
  console.log(`${bold("Ultimo passo: collegare il webhook")}

In due terminali separati, avvia:

   ${bold("npm run dev")}        ${dim("(il bot)")}
   ${bold("ngrok http 3000")}    ${dim("(l'indirizzo pubblico)")}

ngrok stampa un indirizzo tipo ${dim("https://abc123.ngrok-free.app")}.
Nel pannello Meta, in ${bold("WhatsApp > Configurazione > Webhook")}, incolla:

   URL di callback:    ${bold("<l'indirizzo di ngrok>/webhook")}
   Token di verifica:  ${bold(verifyToken)}

${dim("(il token qui sopra è già salvato nel tuo .env: ti serve solo da incollare)")}

Premi 'Verifica e salva', poi nella lista sotto ${bold("sottoscrivi il campo 'messages'")}.
Senza quella sottoscrizione l'URL risulta salvato ma non arriva nessun messaggio.

Poi scrivi al numero di test dal tuo telefono: se risponde, funziona tutto.

${dim("Se qualcosa non torna, esegui: npm run doctor")}
`);
}

main()
  .catch((error: unknown) => {
    console.error(red(`\nErrore: ${error instanceof Error ? error.message : String(error)}\n`));
    process.exitCode = 1;
  })
  .finally(() => rl.close());
