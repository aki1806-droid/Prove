import crypto from "node:crypto";
import { describe, expect, it } from "vitest";
import { isValidSignature } from "../src/whatsapp/signature.js";

const SECRET = "app-secret-di-prova";

function sign(body: string, secret = SECRET): string {
  return `sha256=${crypto.createHmac("sha256", secret).update(body).digest("hex")}`;
}

describe("isValidSignature", () => {
  const body = JSON.stringify({ object: "whatsapp_business_account" });

  it("accetta una firma calcolata con l'app secret corretto", () => {
    expect(isValidSignature(Buffer.from(body), sign(body), SECRET)).toBe(true);
  });

  it("rifiuta una firma prodotta con un altro secret", () => {
    expect(isValidSignature(Buffer.from(body), sign(body, "altro"), SECRET)).toBe(false);
  });

  it("rifiuta il body manomesso dopo la firma", () => {
    const header = sign(body);
    const tampered = Buffer.from(JSON.stringify({ object: "manomesso" }));
    expect(isValidSignature(tampered, header, SECRET)).toBe(false);
  });

  it("rifiuta header assente, senza prefisso o troncato", () => {
    expect(isValidSignature(Buffer.from(body), undefined, SECRET)).toBe(false);
    expect(isValidSignature(Buffer.from(body), sign(body).slice(7), SECRET)).toBe(false);
    expect(isValidSignature(Buffer.from(body), "sha256=abcd", SECRET)).toBe(false);
  });

  it("non va in eccezione su un header non esadecimale", () => {
    expect(() => isValidSignature(Buffer.from(body), "sha256=zzzz", SECRET)).not.toThrow();
  });
});
