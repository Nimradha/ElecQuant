import crypto from "crypto";

export function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD || "admin123";
}

export function createAdminToken(password: string): string {
  return crypto.createHmac("sha256", password).update("elecquant-admin-session-v1").digest("hex");
}

export function verifyAdminToken(token: string | undefined | null, password: string): boolean {
  if (!token || !password) return false;
  try {
    const expected = createAdminToken(password);
    const tokenBuffer = Buffer.from(token, "utf8");
    const expectedBuffer = Buffer.from(expected, "utf8");
    if (tokenBuffer.length !== expectedBuffer.length) return false;
    return crypto.timingSafeEqual(tokenBuffer, expectedBuffer);
  } catch {
    return false;
  }
}

