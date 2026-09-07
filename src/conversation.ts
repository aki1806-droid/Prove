/**
 * Storico delle conversazioni per contatto.
 *
 * L'implementazione in memoria è volutamente dietro un'interfaccia: basta a un
 * singolo processo, ma appena il servizio gira su più repliche (o riparte senza
 * perdere il contesto) va sostituita con Redis o un database, senza toccare il
 * resto del codice.
 */

export interface Turn {
  role: "user" | "assistant";
  content: string;
}

export interface ConversationStore {
  history(contactId: string): Turn[];
  append(contactId: string, ...turns: Turn[]): void;
  clear(contactId: string): void;
}

interface Entry {
  turns: Turn[];
  lastActivity: number;
}

export interface InMemoryStoreOptions {
  /** Inattività oltre la quale lo storico viene dimenticato. */
  ttlMs: number;
  /** Numero massimo di messaggi conservati per contatto. */
  maxMessages: number;
  /** Iniettabile nei test per non dipendere dall'orologio reale. */
  now?: () => number;
}

export class InMemoryConversationStore implements ConversationStore {
  private readonly entries = new Map<string, Entry>();
  private readonly ttlMs: number;
  private readonly maxMessages: number;
  private readonly now: () => number;

  constructor(options: InMemoryStoreOptions) {
    this.ttlMs = options.ttlMs;
    this.maxMessages = options.maxMessages;
    this.now = options.now ?? Date.now;
  }

  history(contactId: string): Turn[] {
    const entry = this.entries.get(contactId);
    if (!entry) return [];

    if (this.isExpired(entry)) {
      this.entries.delete(contactId);
      return [];
    }
    return [...entry.turns];
  }

  append(contactId: string, ...turns: Turn[]): void {
    if (turns.length === 0) return;

    const existing = this.entries.get(contactId);
    const base = existing && !this.isExpired(existing) ? existing.turns : [];

    this.entries.set(contactId, {
      turns: trim([...base, ...turns], this.maxMessages),
      lastActivity: this.now(),
    });
  }

  clear(contactId: string): void {
    this.entries.delete(contactId);
  }

  /** Rimuove gli storici scaduti: da chiamare periodicamente. */
  prune(): number {
    let removed = 0;
    for (const [contactId, entry] of this.entries) {
      if (this.isExpired(entry)) {
        this.entries.delete(contactId);
        removed += 1;
      }
    }
    return removed;
  }

  get size(): number {
    return this.entries.size;
  }

  private isExpired(entry: Entry): boolean {
    return this.now() - entry.lastActivity > this.ttlMs;
  }
}

/**
 * Tiene solo gli ultimi `max` messaggi e garantisce che lo storico inizi con un
 * turno utente: la Messages API rifiuta una conversazione che apre con
 * `assistant`, ed è esattamente ciò che produrrebbe un taglio ingenuo.
 */
function trim(turns: Turn[], max: number): Turn[] {
  const tail = turns.slice(-max);
  const firstUser = tail.findIndex((turn) => turn.role === "user");
  return firstUser <= 0 ? tail : tail.slice(firstUser);
}
