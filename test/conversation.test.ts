import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryConversationStore } from "../src/conversation.js";

const MINUTE = 60_000;

describe("InMemoryConversationStore", () => {
  let clock: number;
  const now = () => clock;

  beforeEach(() => {
    clock = 1_000_000;
  });

  function store(maxMessages = 20) {
    return new InMemoryConversationStore({ ttlMs: 30 * MINUTE, maxMessages, now });
  }

  it("restituisce uno storico vuoto per un contatto sconosciuto", () => {
    expect(store().history("39331")).toEqual([]);
  });

  it("conserva i turni nell'ordine in cui sono stati aggiunti", () => {
    const s = store();
    s.append("39331", { role: "user", content: "ciao" }, { role: "assistant", content: "ciao!" });
    s.append("39331", { role: "user", content: "orari?" });

    expect(s.history("39331").map((t) => t.content)).toEqual(["ciao", "ciao!", "orari?"]);
  });

  it("tiene separati i contatti", () => {
    const s = store();
    s.append("39331", { role: "user", content: "A" });
    s.append("39332", { role: "user", content: "B" });

    expect(s.history("39331")).toHaveLength(1);
    expect(s.history("39332")[0]?.content).toBe("B");
  });

  it("dimentica lo storico dopo il TTL di inattività", () => {
    const s = store();
    s.append("39331", { role: "user", content: "ciao" });

    clock += 29 * MINUTE;
    expect(s.history("39331")).toHaveLength(1);

    clock += 2 * MINUTE;
    expect(s.history("39331")).toEqual([]);
  });

  it("riparte da zero dopo la scadenza invece di accodare al vecchio storico", () => {
    const s = store();
    s.append("39331", { role: "user", content: "vecchio" });

    clock += 31 * MINUTE;
    s.append("39331", { role: "user", content: "nuovo" });

    expect(s.history("39331").map((t) => t.content)).toEqual(["nuovo"]);
  });

  it("il TTL si misura dall'ultima attività, non dal primo messaggio", () => {
    const s = store();
    s.append("39331", { role: "user", content: "uno" });

    clock += 20 * MINUTE;
    s.append("39331", { role: "user", content: "due" });

    clock += 20 * MINUTE;
    expect(s.history("39331")).toHaveLength(2);
  });

  it("taglia lo storico al massimo configurato", () => {
    const s = store(4);
    for (let i = 0; i < 6; i++) {
      s.append("39331", { role: "user", content: `u${i}` }, { role: "assistant", content: `a${i}` });
    }

    expect(s.history("39331")).toHaveLength(4);
  });

  it("dopo il taglio lo storico inizia sempre con un turno utente", () => {
    // Con un limite dispari il taglio cadrebbe su un turno assistant, che la
    // Messages API rifiuta come primo messaggio della conversazione.
    const s = store(3);
    for (let i = 0; i < 4; i++) {
      s.append("39331", { role: "user", content: `u${i}` }, { role: "assistant", content: `a${i}` });
    }

    const history = s.history("39331");
    expect(history[0]?.role).toBe("user");
    expect(history).toHaveLength(2);
  });

  it("clear rimuove lo storico di un solo contatto", () => {
    const s = store();
    s.append("39331", { role: "user", content: "A" });
    s.append("39332", { role: "user", content: "B" });
    s.clear("39331");

    expect(s.history("39331")).toEqual([]);
    expect(s.history("39332")).toHaveLength(1);
  });

  it("prune libera la memoria delle conversazioni scadute", () => {
    const s = store();
    s.append("39331", { role: "user", content: "A" });
    s.append("39332", { role: "user", content: "B" });

    clock += 31 * MINUTE;
    s.append("39333", { role: "user", content: "C" });

    expect(s.prune()).toBe(2);
    expect(s.size).toBe(1);
  });

  it("history restituisce una copia: mutarla non altera lo store", () => {
    const s = store();
    s.append("39331", { role: "user", content: "A" });

    s.history("39331").push({ role: "assistant", content: "intruso" });
    expect(s.history("39331")).toHaveLength(1);
  });
});
