import { requireAuth } from "./_auth.js";
import { getFile, putFile } from "./_github.js";

const CONTENT_PATH = "src/content/site.json";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { content } = await getFile(CONTENT_PATH);
    return res.status(200).json({ content: content ? JSON.parse(content) : null });
  }

  if (req.method === "PUT") {
    if (!requireAuth(req, res)) return;

    const nextContent = req.body;
    if (!nextContent || typeof nextContent !== "object") {
      return res.status(400).json({ error: "Missing content payload" });
    }

    try {
      const { sha } = await getFile(CONTENT_PATH);
      const json = JSON.stringify(nextContent, null, 2) + "\n";
      await putFile(CONTENT_PATH, json, "Update site content via admin panel", sha);
      return res.status(200).json({ ok: true });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  res.status(405).json({ error: "Method not allowed" });
}
