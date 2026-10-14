import { useEffect, useState } from "react";
import { api } from "../api.js";

const TABS = [
  { id: "inbox", label: "Inbox", icon: "✉" },
  { id: "questions", label: "Questions", icon: "❓" },
  { id: "projects", label: "Projects", icon: "🗂" },
];

export default function Admin() {
  const [key, setKey] = useState(sessionStorage.getItem("adminKey") || "");
  const [unlocked, setUnlocked] = useState(
    !!sessionStorage.getItem("adminKey"),
  );
  const [tab, setTab] = useState("inbox");

  function tryUnlock(e) {
    e.preventDefault();
    sessionStorage.setItem("adminKey", key);
    setUnlocked(true);
  }

  if (!unlocked) {
    return (
      <div className="adm-root adm-login-root">
        <div className="adm-login-card">
          <div className="adm-login-logo">
            <img
              src="/logo.png"
              alt="ARGAA"
              className="logo-img2"
              style={{ height: 40 }}
            />
          </div>
          <h1
            className="display"
            style={{
              fontSize: 24,
              color: "#fff",
              marginTop: 20,
              marginBottom: 6,
            }}
          >
            Admin Access
          </h1>
          <p
            style={{
              color: "rgba(255,255,255,0.55)",
              fontSize: 13.5,
              marginBottom: 26,
            }}
          >
            Enter your admin key to continue.
          </p>
          <form onSubmit={tryUnlock}>
            <div className="adm-field">
              <label>Admin Key</label>
              <input
                type="password"
                value={key}
                onChange={(e) => setKey(e.target.value)}
                placeholder="ADMIN_KEY from .env"
                autoFocus
              />
            </div>
            <button
              className="adm-btn-primary"
              type="submit"
              style={{ width: "100%", marginTop: 8 }}
            >
              Unlock →
            </button>
          </form>
          <p
            style={{
              color: "rgba(255,255,255,0.35)",
              fontSize: 11.5,
              marginTop: 20,
              lineHeight: 1.6,
            }}
          >
            This matches ADMIN_KEY in your backend .env file — a simple shared
            secret, good for a solo-owner setup.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="adm-root">
      <div className="adm-shell">
        <aside className="adm-sidebar">
          <div className="adm-sidebar-logo">
            <img
              src="/logo.png"
              alt="ARGAA"
              className="logo-img2"
              style={{ height: 30 }}
            />
          </div>
          <nav className="adm-sidebar-nav">
            {TABS.map((t) => (
              <button
                key={t.id}
                className={`adm-sidebar-link ${tab === t.id ? "active" : ""}`}
                onClick={() => setTab(t.id)}
              >
                <span className="adm-sidebar-icon">{t.icon}</span>
                {t.label}
              </button>
            ))}
          </nav>
          <button
            className="adm-sidebar-link adm-logout"
            onClick={() => {
              sessionStorage.removeItem("adminKey");
              setUnlocked(false);
            }}
          >
            <span className="adm-sidebar-icon">⎋</span>
            Log out
          </button>
        </aside>

        <main className="adm-content">
          <div className="adm-content-header">
            <h1 className="display" style={{ fontSize: 28, color: "#fff" }}>
              {TABS.find((t) => t.id === tab)?.label}
            </h1>
          </div>
          {tab === "inbox" && <Inbox adminKey={key} />}
          {tab === "questions" && <QuestionsAdmin adminKey={key} />}
          {tab === "projects" && <ProjectsAdmin adminKey={key} />}
        </main>
      </div>
    </div>
  );
}

function Inbox({ adminKey }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    api
      .adminInbox(adminKey)
      .then(setMessages)
      .finally(() => setLoading(false));
  }, [adminKey]);

  if (loading) return <p className="adm-muted">Loading…</p>;
  if (!messages.length) return <p className="adm-muted">No messages yet.</p>;

  return (
    <div className="adm-card-list">
      {messages.map((m) => (
        <div key={m.id} className="adm-card">
          <div className="adm-card-top">
            <span className="adm-card-title">
              {m.name} <span className="adm-muted-inline">— {m.email}</span>
            </span>
            <span className="adm-timestamp">
              {new Date(m.created_at).toLocaleString()}
            </span>
          </div>
          {m.subject && <div className="adm-card-subject">{m.subject}</div>}
          <div className="adm-card-body">{m.body}</div>
        </div>
      ))}
    </div>
  );
}

function QuestionsAdmin({ adminKey }) {
  const [questions, setQuestions] = useState([]);
  const [drafts, setDrafts] = useState({});
  const [loading, setLoading] = useState(true);

  function load() {
    api
      .adminQuestions(adminKey)
      .then(setQuestions)
      .finally(() => setLoading(false));
  }
  useEffect(load, [adminKey]);

  async function reply(id) {
    const answer = drafts[id];
    if (!answer) return;
    await api.adminReply(adminKey, id, answer);
    load();
  }

  if (loading) return <p className="adm-muted">Loading…</p>;
  if (!questions.length) return <p className="adm-muted">No questions yet.</p>;

  return (
    <div className="adm-card-list">
      {questions.map((q) => (
        <div key={q.id} className="adm-card">
          <div className="adm-card-top">
            <span className="adm-card-title">{q.question}</span>
            {q.answer && <span className="adm-badge">ANSWERED</span>}
          </div>
          {q.answer && <div className="adm-card-body">{q.answer}</div>}
          <div className="adm-reply-row">
            <input
              className="adm-input-inline"
              placeholder="Write a reply…"
              defaultValue={q.answer || ""}
              onChange={(e) =>
                setDrafts((d) => ({ ...d, [q.id]: e.target.value }))
              }
            />
            <button className="adm-btn-secondary" onClick={() => reply(q.id)}>
              Save
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

function ProjectsAdmin({ adminKey }) {
  const [form, setForm] = useState({
    title: "",
    category: "",
    description: "",
    project_url: "",
    tags: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [status, setStatus] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [replaceFiles, setReplaceFiles] = useState({});

  function load() {
    api
      .getProjects()
      .then(setProjects)
      .finally(() => setLoading(false));
  }
  useEffect(load, []);

  async function submit(e) {
    e.preventDefault();
    try {
      await api.adminAddProject(adminKey, form, imageFile);
      setForm({
        title: "",
        category: "",
        description: "",
        project_url: "",
        tags: "",
      });
      setImageFile(null);
      setStatus("ok");
      load();
    } catch {
      setStatus("err");
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this project? This cannot be undone.")) return;
    await api.adminDeleteProject(adminKey, id);
    load();
  }

  async function handleReplaceImage(id) {
    const file = replaceFiles[id];
    if (!file) return;
    await api.adminUpdateProjectImage(adminKey, id, file);
    setReplaceFiles((r) => ({ ...r, [id]: null }));
    load();
  }

  return (
    <div>
      <div className="adm-card" style={{ maxWidth: 560, marginBottom: 40 }}>
        <div className="adm-card-title" style={{ marginBottom: 18 }}>
          Add New Project
        </div>
        <form onSubmit={submit}>
          <div className="adm-field">
            <label>Title</label>
            <input
              required
              value={form.title}
              onChange={(e) =>
                setForm((f) => ({ ...f, title: e.target.value }))
              }
            />
          </div>
          <div className="adm-field">
            <label>What You Did (shown as the title on hover)</label>
            <input
              value={form.category}
              onChange={(e) =>
                setForm((f) => ({ ...f, category: e.target.value }))
              }
              placeholder="e.g. Developer, Website Redesign"
            />
          </div>
          <div className="adm-field">
            <label>Description</label>
            <textarea
              rows="3"
              value={form.description}
              onChange={(e) =>
                setForm((f) => ({ ...f, description: e.target.value }))
              }
            />
          </div>
          <div className="adm-field">
            <label>Live URL</label>
            <input
              value={form.project_url}
              onChange={(e) =>
                setForm((f) => ({ ...f, project_url: e.target.value }))
              }
            />
          </div>
          <div className="adm-field">
            <label>Tags (comma separated)</label>
            <input
              value={form.tags}
              onChange={(e) => setForm((f) => ({ ...f, tags: e.target.value }))}
              placeholder="React, Node.js"
            />
          </div>
          <div className="adm-field">
            <label>Project Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
            />
          </div>
          <button className="adm-btn-primary" type="submit">
            Add Project →
          </button>
          {status === "ok" && <p className="adm-status ok">Project added.</p>}
          {status === "err" && (
            <p className="adm-status err">Failed to add project.</p>
          )}
        </form>
      </div>

      <div className="adm-card-title" style={{ marginBottom: 18 }}>
        Existing Projects
      </div>
      {loading && <p className="adm-muted">Loading…</p>}
      {!loading && projects.length === 0 && (
        <p className="adm-muted">No projects yet.</p>
      )}

      <div className="adm-card-list">
        {projects.map((p) => (
          <div key={p.id} className="adm-card adm-project-row">
            {p.image_url && (
              <img
                src={
                  p.image_url.startsWith("http")
                    ? p.image_url
                    : `${(import.meta.env.VITE_API_URL || "http://localhost:4000/api").replace(/\/api$/, "")}${p.image_url}`
                }
                alt={p.title}
                className="adm-project-thumb"
              />
            )}
            <div style={{ flex: 1 }}>
              <div className="adm-card-title">{p.title}</div>
              <div className="adm-muted-inline">{p.category}</div>
              <div className="adm-reply-row" style={{ marginTop: 12 }}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setReplaceFiles((r) => ({
                      ...r,
                      [p.id]: e.target.files[0],
                    }))
                  }
                  style={{ fontSize: 12, color: "rgba(255,255,255,0.6)" }}
                />
                <button
                  className="adm-btn-secondary"
                  type="button"
                  onClick={() => handleReplaceImage(p.id)}
                >
                  Replace Image
                </button>
                <button
                  className="adm-btn-danger"
                  type="button"
                  onClick={() => handleDelete(p.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
