import { useState } from "react";
import { api } from "../api.js";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    body: "",
  });
  const [status, setStatus] = useState(null);
  const [sending, setSending] = useState(false);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function submit(e) {
    e.preventDefault();
    setSending(true);
    setStatus(null);
    try {
      await api.sendMessage(form);
      setForm({ name: "", email: "", subject: "", body: "" });
      setStatus("ok");
    } catch {
      setStatus("err");
    } finally {
      setSending(false);
    }
  }

  return (
    <section
      style={{ background: "#f7f5f1", paddingTop: 90, paddingBottom: 0 }}
    >
      <div className="wrap" style={{ textAlign: "center", marginBottom: 50 }}>
        <h2 className="section-title display" style={{ color: "#171522" }}>
          Contact
        </h2>
        <p
          style={{
            color: "#6b6f7d",
            marginTop: 14,
            maxWidth: 480,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          Tell us about your project. You'll hear back fast..
        </p>
      </div>

      <div className="wrap contact-grid-2col">
        <div>
          <p
            style={{
              color: "#4a4640",
              fontSize: 15.5,
              lineHeight: 1.8,
              maxWidth: 420,
            }}
          >
            Prefer email? Reach us directly at{" "}
            <a
              href="mailto:amanuel7jira@yahoo.com"
              style={{ color: "#2f6fed" }}
            >
              amanuel7jira@yahoo.com
            </a>
            . Every message submitted here goes straight into our inbox, We read
            and reply to all of them personally.
          </p>
        </div>
        <form onSubmit={submit} className="contact-form-light">
          <div className="field">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              required
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              placeholder="Your name"
            />
          </div>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              required
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              placeholder="Your email address"
            />
          </div>
          <div className="field">
            <label htmlFor="subject">Subject</label>
            <input
              id="subject"
              value={form.subject}
              onChange={(e) => update("subject", e.target.value)}
              placeholder="What's this about?"
            />
          </div>
          <div className="field">
            <label htmlFor="body">Message</label>
            <textarea
              id="body"
              rows="5"
              required
              value={form.body}
              onChange={(e) => update("body", e.target.value)}
              placeholder="What are you looking to build?"
            />
          </div>
          <button className="btn-primary" type="submit" disabled={sending}>
            {sending ? "Sending…" : "Send Message →"}
          </button>
          {status === "ok" && (
            <p className="form-status ok">
              Message sent we'll be in touch shortly.
            </p>
          )}

          {status === "err" && (
            <p className="form-status err">
              Something went wrong. Please try again.
            </p>
          )}
        </form>
      </div>

      <div className="contact-cta-banner">
        <div className="wrap contact-cta-grid">
          <div className="contact-cta-item">
            <svg
              width="34"
              height="34"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#171522"
              strokeWidth="1.6"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            <h3>Let's Talk</h3>
            <p>Phone: +251935535758</p>
          </div>
          <div className="contact-cta-item">
            <svg
              width="34"
              height="34"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#171522"
              strokeWidth="1.6"
            >
              <path d="M4 4h16v16H4z" />
              <path d="M22 6l-10 7L2 6" />
            </svg>
            <h3>Email Us</h3>
            <p>amanuel7jira@yahoo.com</p>
          </div>
        </div>
      </div>
    </section>
  );
}
