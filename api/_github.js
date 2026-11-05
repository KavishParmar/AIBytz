const API_BASE = "https://api.github.com";

function ghHeaders() {
  return {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
}

function repoPath() {
  const repo = process.env.GITHUB_REPO; // "owner/name"
  const branch = process.env.GITHUB_BRANCH || "main";
  if (!repo) throw new Error("GITHUB_REPO not configured");
  return { repo, branch };
}

export async function getFile(path) {
  const { repo, branch } = repoPath();
  const res = await fetch(
    `${API_BASE}/repos/${repo}/contents/${encodeURIComponent(path)}?ref=${branch}`,
    { headers: ghHeaders() }
  );
  if (res.status === 404) return { content: null, sha: null };
  if (!res.ok) throw new Error(`GitHub read failed: ${res.status} ${await res.text()}`);
  const data = await res.json();
  const content = Buffer.from(data.content, "base64").toString("utf8");
  return { content, sha: data.sha };
}

export async function putFile(path, content, message, sha, isBase64 = false) {
  const { repo, branch } = repoPath();
  const encoded = isBase64 ? content : Buffer.from(content).toString("base64");
  const res = await fetch(`${API_BASE}/repos/${repo}/contents/${encodeURIComponent(path)}`, {
    method: "PUT",
    headers: { ...ghHeaders(), "Content-Type": "application/json" },
    body: JSON.stringify({
      message,
      content: encoded,
      branch,
      ...(sha ? { sha } : {}),
    }),
  });
  if (!res.ok) throw new Error(`GitHub write failed: ${res.status} ${await res.text()}`);
  return res.json();
}

export async function deleteFile(path, message, sha) {
  const { repo, branch } = repoPath();
  const res = await fetch(`${API_BASE}/repos/${repo}/contents/${encodeURIComponent(path)}`, {
    method: "DELETE",
    headers: { ...ghHeaders(), "Content-Type": "application/json" },
    body: JSON.stringify({ message, sha, branch }),
  });
  if (!res.ok) throw new Error(`GitHub delete failed: ${res.status} ${await res.text()}`);
  return res.json();
}
