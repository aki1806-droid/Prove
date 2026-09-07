/**
 * Verifiche delle credenziali contro i servizi reali.
 *
 * Sono funzioni pure (il `fetch` è iniettabile) perché il valore vero non è
 * la chiamata ma la traduzione dell'errore: la Graph API risponde con codici
 * numerici e messaggi in inglese che non dicono nulla a chi sta configurando
 * il bot per la prima volta. Qui diventano istruzioni su cosa correggere.
 */

export interface CheckOk {
  ok: true;
  /** Riga di conferma da mostrare all'utente. */
  detail: string;
}

export interface CheckFailed {
  ok: false;
  /** Cosa è andato storto, in italiano. */
  problem: string;
  /** Cosa fare per risolverlo. */
  fix: string;
}

export type CheckResult = CheckOk | CheckFailed;

interface GraphError {
  code?: number;
  error_subcode?: number;
  message?: string;
  type?: string;
}

/**
 * Verifica insieme access token e phone number id: interroga il numero
 * mittente, che risponde solo se il token è valido *e* l'id esiste *e* il
 * token ha visibilità su quel numero.
 */
export async function checkWhatsAppNumber(options: {
  token: string;
  phoneNumberId: string;
  graphVersion: string;
  fetchImpl?: typeof fetch;
}): Promise<CheckResult> {
  const url = `https://graph.facebook.com/${options.graphVersion}/${options.phoneNumberId}?fields=display_phone_number,verified_name`;

  let response: Response;
  try {
    response = await (options.fetchImpl ?? fetch)(url, {
      headers: { Authorization: `Bearer ${options.token}` },
      signal: AbortSignal.timeout(15_000),
    });
  } catch (error) {
    return offline(error);
  }

  const payload = (await response.json().catch(() => ({}))) as {
    display_phone_number?: string;
    verified_name?: string;
    error?: GraphError;
  };

  if (response.ok) {
    const number = payload.display_phone_number ?? "numero sconosciuto";
    const name = payload.verified_name ? ` (${payload.verified_name})` : "";
    return { ok: true, detail: `numero mittente ${number}${name}` };
  }

  return describeGraphError(payload.error, response.status);
}

/**
 * Verifica l'app secret chiedendo un app access token: l'endpoint lo rilascia
 * solo se la coppia app id + secret combacia.
 */
export async function checkAppSecret(options: {
  appId: string;
  appSecret: string;
  graphVersion: string;
  fetchImpl?: typeof fetch;
}): Promise<CheckResult> {
  const url =
    `https://graph.facebook.com/${options.graphVersion}/oauth/access_token` +
    `?client_id=${encodeURIComponent(options.appId)}` +
    `&client_secret=${encodeURIComponent(options.appSecret)}` +
    `&grant_type=client_credentials`;

  let response: Response;
  try {
    response = await (options.fetchImpl ?? fetch)(url, {
      signal: AbortSignal.timeout(15_000),
    });
  } catch (error) {
    return offline(error);
  }

  if (response.ok) return { ok: true, detail: "chiave segreta valida" };

  const payload = (await response.json().catch(() => ({}))) as { error?: GraphError };

  // Con credenziali sbagliate questo endpoint risponde sempre codice 1 o 101,
  // senza distinguere quale dei due valori sia errato.
  if (payload.error?.code === 1 || payload.error?.code === 101) {
    return {
      ok: false,
      problem: "L'ID app e la chiave segreta non combaciano.",
      fix: "Ricontrolla entrambi in Impostazioni app > Di base. La chiave segreta va rivelata con 'Mostra' ed è diversa dal token della Graph API.",
    };
  }

  return describeGraphError(payload.error, response.status);
}

/** Verifica la chiave Anthropic con una richiesta gratuita all'elenco dei modelli. */
export async function checkAnthropicKey(options: {
  apiKey: string;
  fetchImpl?: typeof fetch;
}): Promise<CheckResult> {
  let response: Response;
  try {
    response = await (options.fetchImpl ?? fetch)("https://api.anthropic.com/v1/models?limit=1", {
      headers: {
        "x-api-key": options.apiKey,
        "anthropic-version": "2023-06-01",
      },
      signal: AbortSignal.timeout(15_000),
    });
  } catch (error) {
    return offline(error);
  }

  if (response.ok) return { ok: true, detail: "chiave Anthropic valida" };

  if (response.status === 401) {
    return {
      ok: false,
      problem: "La chiave Anthropic non è stata accettata.",
      fix: "Generane una nuova su console.anthropic.com/settings/keys. Inizia con 'sk-ant-' e va copiata per intero.",
    };
  }

  if (response.status === 429) {
    return {
      ok: false,
      problem: "La chiave è valida ma l'account ha superato i limiti di richieste.",
      fix: "Riprova fra qualche minuto, oppure controlla i limiti nella console Anthropic.",
    };
  }

  return {
    ok: false,
    problem: `L'API Anthropic ha risposto ${response.status}.`,
    fix: "Se il problema persiste, controlla lo stato del servizio su status.anthropic.com.",
  };
}

/** Traduce gli errori della Graph API in istruzioni comprensibili. */
export function describeGraphError(error: GraphError | undefined, status: number): CheckFailed {
  const code = error?.code;

  if (code === 190) {
    return {
      ok: false,
      problem: "L'access token non è valido o è scaduto.",
      fix: "Il token mostrato nel pannello dura 24 ore. Rigeneralo da WhatsApp > Configurazione API, oppure creane uno permanente da un utente di sistema.",
    };
  }

  if (code === 100) {
    return {
      ok: false,
      problem: "L'ID del numero di telefono non esiste, o il token non ha accesso a quel numero.",
      fix: "Copia di nuovo l'ID da WhatsApp > Configurazione API: è il codice numerico sotto il numero mittente, non il numero di telefono.",
    };
  }

  if (code === 200 || code === 10 || code === 3) {
    return {
      ok: false,
      problem: "Al token mancano i permessi necessari.",
      fix: "Serve il permesso whatsapp_business_messaging. Se usi un utente di sistema, assegnagli l'app e l'account WhatsApp Business e rigenera il token.",
    };
  }

  if (status === 403 && error) {
    return {
      ok: false,
      problem: "Meta ha rifiutato la richiesta.",
      fix: "Di solito significa che l'app non ha ancora accesso a questo numero. Controlla che app e numero appartengano allo stesso account business.",
    };
  }

  // Nessun oggetto d'errore nel corpo: la risposta non arriva da Meta. Capita
  // dietro un proxy aziendale, una VPN o un firewall che intercetta la
  // richiesta. Diagnosticarla come credenziale sbagliata manderebbe l'utente
  // a caccia del problema nel posto sbagliato.
  if (!error) {
    return {
      ok: false,
      problem: `Ho ricevuto una risposta HTTP ${status} che non arriva da Meta.`,
      fix: "Probabilmente qualcosa fra il tuo computer e internet sta bloccando la richiesta: una VPN, un proxy aziendale o un firewall. Prova da un'altra rete.",
    };
  }

  return {
    ok: false,
    problem: `Meta ha risposto con un errore (HTTP ${status}${code ? `, codice ${code}` : ""}).`,
    fix: error.message
      ? `Messaggio originale: ${error.message}`
      : "Ricontrolla i valori inseriti e riprova.",
  };
}

function offline(error: unknown): CheckFailed {
  const message = error instanceof Error ? error.message : String(error);
  return {
    ok: false,
    problem: "Non sono riuscito a contattare il servizio.",
    fix: `Controlla la connessione a internet e riprova. Dettaglio tecnico: ${message}`,
  };
}
