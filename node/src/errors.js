/** Errore restituito dall'API Skillplate.
 *
 * L'API risponde con `{"error": {"code", "message", "status", "request_id"}}`:
 * `requestId` va sempre riportato all'utente quando qualcosa fallisce.
 */
export class SkillplateError extends Error {
  constructor(message, { code = null, status = null, requestId = null, body = null } = {}) {
    super(message);
    this.name = "SkillplateError";
    this.code = code;
    this.status = status;
    this.requestId = requestId;
    this.body = body;
  }

  /** Riga leggibile con tutti i riferimenti utili alla diagnosi. */
  describe() {
    const parti = [this.message];
    if (this.status !== null) parti.push(`status=${this.status}`);
    if (this.code) parti.push(`code=${this.code}`);
    if (this.requestId) parti.push(`request_id=${this.requestId}`);
    return parti.join(" | ");
  }
}

/** Nessun Personal Access Token disponibile. */
export class MissingTokenError extends SkillplateError {
  constructor(message) {
    super(message);
    this.name = "MissingTokenError";
  }
}

/** 429: rate limit esaurito e tentativi finiti. */
export class RateLimitError extends SkillplateError {
  constructor(message, opzioni) {
    super(message, opzioni);
    this.name = "RateLimitError";
  }
}
