const TO_EMAIL = "kavishparmar5@gmail.com";
const FROM_EMAIL = process.env.RESEND_FROM || "AIBytz <onboarding@resend.dev>";

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "Email is not configured yet." });
  }

  const { name, email, phone, projectType, budget, details } = req.body || {};

  if (!name?.trim() || !email?.trim() || !phone?.trim()) {
    return res.status(400).json({ error: "Name, email and phone are required." });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: "That email doesn't look right." });
  }

  const rows = [
    ["Name", name],
    ["Email", email],
    ["Phone", phone],
    ["Project type", projectType],
    ["Budget", budget],
    ["Details", details],
  ];

  const html = `
    <div style="font-family:system-ui,-apple-system,sans-serif;line-height:1.6">
      <h2 style="margin:0 0 16px">New project inquiry</h2>
      <table cellpadding="6" style="border-collapse:collapse">
        ${rows
          .map(
            ([label, value]) =>
              `<tr><td style="vertical-align:top"><strong>${label}</strong></td><td>${
                escapeHtml(value) || "&mdash;"
              }</td></tr>`
          )
          .join("")}
      </table>
    </div>
  `;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [TO_EMAIL],
        reply_to: email,
        subject: `New project inquiry — ${name}`,
        html,
      }),
    });

    if (!response.ok) {
      const detail = await response.text();
      console.error("Resend error:", detail);
      return res.status(502).json({ error: "Couldn't send the message. Try again." });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Couldn't send the message. Try again." });
  }
}
