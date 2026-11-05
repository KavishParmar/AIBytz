import { getCookie, verifySessionToken } from "./_auth.js";

export default function handler(req, res) {
  const token = getCookie(req, "wn_session");
  res.status(200).json({ authenticated: verifySessionToken(token) });
}
