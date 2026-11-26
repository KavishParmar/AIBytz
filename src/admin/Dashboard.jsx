import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import defaultContent from "../content/site.json";
import { useAuth } from "./AuthContext";

const TABS = ["Hero", "Services", "Projects", "Process", "CTA", "Footer"];

function Field({ label, value, onChange, textarea }) {
  const Comp = textarea ? "textarea" : "input";
  return (
    <label className="block mb-4">
      <span className="block font-mono text-xs uppercase tracking-widest text-mist mb-1.5">
        {label}
      </span>
      <Comp
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={textarea ? 3 : undefined}
        className="w-full rounded-lg bg-ink border border-white/15 px-3 py-2.5 text-paper text-sm focus:border-acid outline-none"
      />
    </label>
  );
}

export default function Dashboard() {
  const [content, setContent] = useState(defaultContent);
  const [tab, setTab] = useState("Hero");
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/content")
      .then((r) => r.json())
      .then((data) => {
        if (data.content) setContent(data.content);
      })
      .catch(() => {});
  }, []);

  const save = async () => {
    setSaving(true);
    setStatus("");
    try {
      const res = await fetch("/api/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Save failed");
      }
      setStatus("Saved. The live site will redeploy in about a minute.");
    } catch (err) {
      setStatus(`Error: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/admin/login");
  };

  const updateHero = (key, value) =>
    setContent((c) => ({ ...c, hero: { ...c.hero, [key]: value } }));

  const updateProject = (id, key, value) =>
    setContent((c) => ({
      ...c,
      projects: c.projects.map((p) => (p.id === id ? { ...p, [key]: value } : p)),
    }));

  const addProject = () =>
    setContent((c) => ({
      ...c,
      projects: [
        ...c.projects,
        {
          id: `project-${Date.now()}`,
          name: "New project",
          tag: "Category",
          year: String(new Date().getFullYear()),
          color: "bg-vermilion",
          span: "sm:col-span-6",
          image: "",
        },
      ],
    }));

  const removeProject = (id) =>
    setContent((c) => ({ ...c, projects: c.projects.filter((p) => p.id !== id) }));

  const uploadProjectImage = async (id, file) => {
    const dataUrl = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

    setStatus("Uploading image…");
    const res = await fetch("/api/upload", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ filename: file.name, dataUrl }),
    });
    const data = await res.json();
    if (!res.ok) {
      setStatus(`Error: ${data.error}`);
      return;
    }
    updateProject(id, "image", data.url);
    setStatus("Image uploaded — click Save to publish.");
  };

  const removeProjectImage = async (id) => {
    const project = content.projects.find((p) => p.id === id);
    if (!project?.image) return;
    await fetch("/api/upload", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path: project.image }),
    });
    updateProject(id, "image", "");
    setStatus("Image removed — click Save to publish.");
  };

  const updateServiceCard = (index, key, value) =>
    setContent((c) => ({
      ...c,
      services: {
        ...c.services,
        cards: c.services.cards.map((card, i) => (i === index ? { ...card, [key]: value } : card)),
      },
    }));

  const updateServicePoint = (cardIndex, pointIndex, value) =>
    setContent((c) => ({
      ...c,
      services: {
        ...c.services,
        cards: c.services.cards.map((card, i) =>
          i === cardIndex
            ? { ...card, points: card.points.map((p, pi) => (pi === pointIndex ? value : p)) }
            : card
        ),
      },
    }));

  const addServicePoint = (cardIndex) =>
    setContent((c) => ({
      ...c,
      services: {
        ...c.services,
        cards: c.services.cards.map((card, i) =>
          i === cardIndex ? { ...card, points: [...card.points, "New point"] } : card
        ),
      },
    }));

  const removeServicePoint = (cardIndex, pointIndex) =>
    setContent((c) => ({
      ...c,
      services: {
        ...c.services,
        cards: c.services.cards.map((card, i) =>
          i === cardIndex
            ? { ...card, points: card.points.filter((_, pi) => pi !== pointIndex) }
            : card
        ),
      },
    }));

  const updateStep = (index, key, value) =>
    setContent((c) => ({
      ...c,
      process: {
        ...c.process,
        steps: c.process.steps.map((s, i) => (i === index ? { ...s, [key]: value } : s)),
      },
    }));

  const updateCta = (key, value) => setContent((c) => ({ ...c, cta: { ...c.cta, [key]: value } }));
  const updateFooter = (key, value) =>
    setContent((c) => ({ ...c, footer: { ...c.footer, [key]: value } }));

  return (
    <div className="min-h-screen bg-ink text-paper">
      <header className="border-b border-white/10 px-6 sm:px-10 py-4 flex items-center justify-between sticky top-0 bg-ink/95 backdrop-blur z-10">
        <h1 className="font-display uppercase text-lg">
          AI<span className="text-vermilion">Bytz</span> Admin
        </h1>
        <div className="flex items-center gap-3">
          <button
            onClick={save}
            disabled={saving}
            className="rounded-full bg-acid text-ink px-5 py-2 font-mono text-xs uppercase tracking-widest disabled:opacity-50"
          >
            {saving ? "Saving…" : "Save & publish"}
          </button>
          <button
            onClick={handleLogout}
            className="rounded-full border border-white/20 px-5 py-2 font-mono text-xs uppercase tracking-widest hover:border-vermilion hover:text-vermilion"
          >
            Log out
          </button>
        </div>
      </header>

      {status && (
        <div className="px-6 sm:px-10 py-3 bg-ink-soft border-b border-white/10 font-mono text-xs text-mist">
          {status}
        </div>
      )}

      <div className="flex">
        <nav className="w-48 shrink-0 border-r border-white/10 p-4 hidden sm:block">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`block w-full text-left font-mono text-xs uppercase tracking-widest px-3 py-2.5 rounded-lg mb-1 ${
                tab === t ? "bg-white/10 text-paper" : "text-mist hover:text-paper"
              }`}
            >
              {t}
            </button>
          ))}
        </nav>

        <nav className="sm:hidden w-full flex overflow-x-auto border-b border-white/10 px-4">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`shrink-0 font-mono text-xs uppercase tracking-widest px-4 py-3 border-b-2 ${
                tab === t ? "border-acid text-paper" : "border-transparent text-mist"
              }`}
            >
              {t}
            </button>
          ))}
        </nav>

        <main className="flex-1 p-6 sm:p-10 max-w-2xl">
          {tab === "Hero" && (
            <div>
              <Field label="Eyebrow" value={content.hero.eyebrow} onChange={(v) => updateHero("eyebrow", v)} />
              <Field label="Headline — line 1" value={content.hero.headlineLine1} onChange={(v) => updateHero("headlineLine1", v)} />
              <Field label="Subhead" value={content.hero.subhead} onChange={(v) => updateHero("subhead", v)} textarea />
              <Field label="CTA button label" value={content.hero.ctaLabel} onChange={(v) => updateHero("ctaLabel", v)} />
            </div>
          )}

          {tab === "Services" && (
            <div>
              {content.services.cards.map((card, i) => (
                <div key={card.n} className="border border-white/10 rounded-xl p-5 mb-5">
                  <p className="font-mono text-xs uppercase tracking-widest text-vermilion mb-3">
                    Card {card.n}
                  </p>
                  <Field label="Title" value={card.title} onChange={(v) => updateServiceCard(i, "title", v)} />
                  <Field label="Subheading" value={card.subheading} onChange={(v) => updateServiceCard(i, "subheading", v)} />

                  <span className="block font-mono text-xs uppercase tracking-widest text-mist mb-1.5">
                    Points
                  </span>
                  {card.points.map((point, pi) => (
                    <div key={pi} className="flex items-center gap-2 mb-2">
                      <input
                        value={point}
                        onChange={(e) => updateServicePoint(i, pi, e.target.value)}
                        className="flex-1 rounded-lg bg-ink border border-white/15 px-3 py-2 text-paper text-sm focus:border-acid outline-none"
                      />
                      <button
                        onClick={() => removeServicePoint(i, pi)}
                        className="font-mono text-xs uppercase text-vermilion hover:underline shrink-0"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => addServicePoint(i)}
                    className="font-mono text-xs uppercase tracking-widest text-mist hover:text-acid mt-1"
                  >
                    + Add point
                  </button>
                </div>
              ))}
            </div>
          )}

          {tab === "Projects" && (
            <div>
              {content.projects.map((project) => (
                <div key={project.id} className="border border-white/10 rounded-xl p-5 mb-5">
                  <Field label="Name" value={project.name} onChange={(v) => updateProject(project.id, "name", v)} />
                  <Field label="Tag" value={project.tag} onChange={(v) => updateProject(project.id, "tag", v)} />
                  <Field label="Year" value={project.year} onChange={(v) => updateProject(project.id, "year", v)} />

                  <span className="block font-mono text-xs uppercase tracking-widest text-mist mb-1.5">
                    Image
                  </span>
                  {project.image ? (
                    <div className="mb-3">
                      <img src={project.image} alt={project.name} className="w-full h-32 object-cover rounded-lg mb-2" />
                      <button
                        onClick={() => removeProjectImage(project.id)}
                        className="font-mono text-xs uppercase tracking-widest text-vermilion hover:underline"
                      >
                        Remove image
                      </button>
                    </div>
                  ) : (
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => e.target.files[0] && uploadProjectImage(project.id, e.target.files[0])}
                      className="block w-full text-sm text-mist mb-3 font-mono"
                    />
                  )}

                  <button
                    onClick={() => removeProject(project.id)}
                    className="font-mono text-xs uppercase tracking-widest text-vermilion hover:underline mt-2"
                  >
                    Delete project
                  </button>
                </div>
              ))}
              <button
                onClick={addProject}
                className="rounded-full border border-white/20 px-5 py-2.5 font-mono text-xs uppercase tracking-widest hover:border-acid hover:text-acid"
              >
                + Add project
              </button>
            </div>
          )}

          {tab === "Process" && (
            <div>
              <Field label="Heading — part 1" value={content.process.heading1} onChange={(v) => setContent((c) => ({ ...c, process: { ...c.process, heading1: v } }))} />
              <Field label="Heading — accent word" value={content.process.headingAccent} onChange={(v) => setContent((c) => ({ ...c, process: { ...c.process, headingAccent: v } }))} />
              <Field label="Heading — part 2" value={content.process.heading2} onChange={(v) => setContent((c) => ({ ...c, process: { ...c.process, heading2: v } }))} />
              {content.process.steps.map((step, i) => (
                <div key={i} className="border border-white/10 rounded-xl p-5 mb-4">
                  <Field label={`Step ${step.n} — title`} value={step.title} onChange={(v) => updateStep(i, "title", v)} />
                  <Field label={`Step ${step.n} — body`} value={step.body} onChange={(v) => updateStep(i, "body", v)} textarea />
                </div>
              ))}
            </div>
          )}

          {tab === "CTA" && (
            <div>
              <Field label="Eyebrow" value={content.cta.eyebrow} onChange={(v) => updateCta("eyebrow", v)} />
              <Field label="Headline — line 1" value={content.cta.headlineLine1} onChange={(v) => updateCta("headlineLine1", v)} />
              <Field label="Headline — line 2" value={content.cta.headlineLine2} onChange={(v) => updateCta("headlineLine2", v)} />
              <Field label="Headline — accent" value={content.cta.headlineAccent} onChange={(v) => updateCta("headlineAccent", v)} />
              <Field label="Contact email" value={content.cta.email} onChange={(v) => updateCta("email", v)} />
            </div>
          )}

          {tab === "Footer" && (
            <div>
              <Field label="Instagram URL" value={content.footer.instagram} onChange={(v) => updateFooter("instagram", v)} />
              <Field label="LinkedIn URL" value={content.footer.linkedin} onChange={(v) => updateFooter("linkedin", v)} />
              <Field label="Dribbble URL" value={content.footer.dribbble} onChange={(v) => updateFooter("dribbble", v)} />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
