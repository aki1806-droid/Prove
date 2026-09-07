/**
 * Insieme di chiavi con scadenza, usato per deduplicare gli id dei messaggi.
 *
 * Meta riconsegna lo stesso webhook se non riceve un 200 abbastanza in fretta:
 * senza deduplica il cliente riceverebbe la stessa risposta due volte e noi
 * pagheremmo due chiamate al modello.
 */
export class TtlSet {
  private readonly seen = new Map<string, number>();

  constructor(
    private readonly ttlMs: number,
    private readonly now: () => number = Date.now,
  ) {}

  /**
   * Registra la chiave e dice se era già presente.
   * @returns `true` se la chiave è nuova, `false` se è un duplicato.
   */
  add(key: string): boolean {
    const expiresAt = this.seen.get(key);
    const current = this.now();

    if (expiresAt !== undefined && expiresAt > current) return false;

    this.seen.set(key, current + this.ttlMs);
    return true;
  }

  /** Rimuove le chiavi scadute: da chiamare periodicamente. */
  prune(): number {
    const current = this.now();
    let removed = 0;
    for (const [key, expiresAt] of this.seen) {
      if (expiresAt <= current) {
        this.seen.delete(key);
        removed += 1;
      }
    }
    return removed;
  }

  get size(): number {
    return this.seen.size;
  }
}
