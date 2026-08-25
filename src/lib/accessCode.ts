import crypto from "crypto";

// Avoids ambiguous chars (0/O, 1/I/l) so codes are easy to type from an email
const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

export function generateAccessCode(length = 8): string {
  let code = "";
  const bytes = crypto.randomBytes(length);
  for (let i = 0; i < length; i++) {
    code += ALPHABET[bytes[i] % ALPHABET.length];
  }
  // format like XK3F-8QRT for readability
  return `${code.slice(0, 4)}-${code.slice(4)}`;
}

export function hashAccessCode(code: string): string {
  return crypto.createHash("sha256").update(code).digest("hex");
}
