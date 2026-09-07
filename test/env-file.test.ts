import { describe, expect, it } from "vitest";
import { cleanPastedValue, renderEnvFile } from "../src/setup/env-file.js";

const values = {
  verifyToken: "abc123",
  appSecret: "sec",
  whatsappToken: "EAAG...",
  phoneNumberId: "555",
  anthropicKey: "sk-ant-xxx",
};

/** Rilegge il file generato come farebbe Node, per verificare che sia valido. */
function parse(content: string): Record<string, string> {
  const out: Record<string, string> = {};
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    out[trimmed.slice(0, eq)] = trimmed.slice(eq + 1);
  }
  return out;
}

describe("renderEnvFile", () => {
  it("scrive tutte le variabili obbligatorie", () => {
    expect(parse(renderEnvFile(values))).toEqual({
      WHATSAPP_VERIFY_TOKEN: "abc123",
      WHATSAPP_APP_SECRET: "sec",
      WHATSAPP_TOKEN: "EAAG...",
      WHATSAPP_PHONE_NUMBER_ID: "555",
      ANTHROPIC_API_KEY: "sk-ant-xxx",
    });
  });

  it("include l'id app solo quando è stato raccolto", () => {
    expect(parse(renderEnvFile({ ...values, appId: "999" })).WHATSAPP_APP_ID).toBe("999");
    expect(parse(renderEnvFile(values)).WHATSAPP_APP_ID).toBeUndefined();
  });

  it("avverte che il file contiene credenziali", () => {
    expect(renderEnvFile(values)).toContain("credenziali");
  });
});

describe("cleanPastedValue", () => {
  it("toglie spazi e a capo finiti nella clipboard", () => {
    expect(cleanPastedValue("  EAAG123 \n")).toBe("EAAG123");
  });

  it("toglie le virgolette attorno al valore", () => {
    expect(cleanPastedValue('"sk-ant-xxx"')).toBe("sk-ant-xxx");
    expect(cleanPastedValue("'sk-ant-xxx'")).toBe("sk-ant-xxx");
  });

  it("non tocca le virgolette interne al valore", () => {
    expect(cleanPastedValue("ab\"cd")).toBe("ab\"cd");
  });

  it("gestisce una stringa vuota", () => {
    expect(cleanPastedValue("   ")).toBe("");
  });
});
