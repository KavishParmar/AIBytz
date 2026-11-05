import { requireAuth } from "./_auth.js";
import { getFile, putFile, deleteFile } from "./_github.js";

const UPLOAD_DIR = "public/uploads";
const MAX_BYTES = 4.5 * 1024 * 1024; // Vercel serverless body limit
const ALLOWED_EXT = ["png", "jpg", "jpeg", "webp", "gif", "svg"];

function safeName(name) {
  const ext = (name.split(".").pop() || "").toLowerCase();
  const base = name
    .replace(/\.[^.]+$/, "")
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
  return { ext, base: base || "image" };
}

export default async function handler(req, res) {
  if (!requireAuth(req, res)) return;

  if (req.method === "POST") {
    const { filename, dataUrl } = req.body || {};
    if (!filename || !dataUrl) {
      return res.status(400).json({ error: "Missing filename or dataUrl" });
    }

    const { ext, base } = safeName(filename);
    if (!ALLOWED_EXT.includes(ext)) {
      return res.status(400).json({ error: "Unsupported image type" });
    }

    const match = /^data:(.+);base64,(.+)$/.exec(dataUrl);
    if (!match) return res.status(400).json({ error: "Invalid image data" });
    const buffer = Buffer.from(match[2], "base64");
    if (buffer.byteLength > MAX_BYTES) {
      return res.status(400).json({ error: "Image too large (max 4.5MB)" });
    }

    const path = `${UPLOAD_DIR}/${base}-${Date.now()}.${ext}`;
    try {
      const { sha } = await getFile(path);
      await putFile(
        path,
        buffer.toString("base64"),
        `Add image ${path}`,
        sha,
        true
      );
      return res.status(200).json({ url: `/uploads/${path.split("/").pop()}` });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  if (req.method === "DELETE") {
    const { path } = req.body || {};
    if (!path || !path.startsWith("/uploads/")) {
      return res.status(400).json({ error: "Invalid path" });
    }
    const fullPath = `public${path}`;
    try {
      const { sha } = await getFile(fullPath);
      if (!sha) return res.status(404).json({ error: "File not found" });
      await deleteFile(fullPath, `Remove image ${fullPath}`, sha);
      return res.status(200).json({ ok: true });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  res.status(405).json({ error: "Method not allowed" });
}
