import { describe, expect, it } from "vitest";
import { TtlSet } from "../src/ttl-set.js";

describe("TtlSet", () => {
  it("riconosce una chiave nuova e poi il suo duplicato", () => {
    const set = new TtlSet(60_000);
    expect(set.add("wamid.AAA")).toBe(true);
    expect(set.add("wamid.AAA")).toBe(false);
  });

  it("tiene distinte chiavi diverse", () => {
    const set = new TtlSet(60_000);
    expect(set.add("wamid.AAA")).toBe(true);
    expect(set.add("wamid.BBB")).toBe(true);
  });

  it("riaccetta la chiave una volta scaduta", () => {
    let clock = 0;
    const set = new TtlSet(60_000, () => clock);

    expect(set.add("wamid.AAA")).toBe(true);
    clock = 59_000;
    expect(set.add("wamid.AAA")).toBe(false);
    clock = 61_000;
    expect(set.add("wamid.AAA")).toBe(true);
  });

  it("prune rimuove solo le chiavi scadute", () => {
    let clock = 0;
    const set = new TtlSet(60_000, () => clock);

    set.add("vecchia");
    clock = 40_000;
    set.add("recente");
    clock = 70_000;

    expect(set.prune()).toBe(1);
    expect(set.size).toBe(1);
  });
});
