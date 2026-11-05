import crypto from "crypto";

const SESSION_TTL_MS = 1000 * 60 * 60 * 8; // 8 hours

function sign(payload) {
  const secret = process.env.SESSION_SECRET;
  return crypto.createHmac("sha256", secret).update(payload).digest("hex");
}

export function createSessionToken() {
  const expires = Date.now() + SESSION_TTL_MS;
  const payload = `admin:${expires}`;
  const sig = sign(payload);
  return Buffer.from(`${payload}:${sig}`).toString("base64url");
}

export function verifySessionToken(token) {
  if (!token) return false;
  try {
    const decoded = Buffer.from(token, "base64url").toString("utf8");
    const [role, expires, sig] = decoded.split(":");
    const payload = `${role}:${expires}`;
    const expected = sign(payload);
    if (sig !== expected) return false;
    if (Date.now() > Number(expires)) return false;
    return true;
  } catch {
    return false;
  }
}

export function getCookie(req, name) {
  const header = req.headers.cookie || "";
  const match = header.split(";").map((c) => c.trim()).find((c) => c.startsWith(`${name}=`));
  return match ? match.slice(name.length + 1) : null;
}

export function requireAuth(req, res) {
  const token = getCookie(req, "wn_session");
  if (!verifySessionToken(token)) {
    res.status(401).json({ error: "Unauthorized" });
    return false;
  }
  return true;
}
