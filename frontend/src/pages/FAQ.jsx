import { useEffect, useState } from "react";
import { api } from "../api.js";

const STARTER_FAQ = [
  {
    q: "How long does it typically take to develop a custom application?",
    a: "Timelines vary by scope, but most projects take anywhere from 3 to 6 weeks from kickoff to launch, depending on complexity and features.",
  },
  {
    q: "What is your approach to project management and communication?",
    a: "We keep things simple: regular check-ins, a shared progress view, and direct access to the person actually building your product no account managers in between.",
  },
  {
    q: "Do you develop both web and mobile applications?",
    a: "Yes, we build responsive websites, web platforms, and native-feel iOS and Android apps, often from a shared codebase to keep costs down.",
  },
  {
    q: "What kind of IT consulting services do you provide?",
    a: "We advise on technology choices, architecture, and digital strategy helping you pick the right stack and approach before any code gets written.",
  },
  {
    q: "Can you help us with setting up and managing data centers?",
    a: "Yes, we design and set up backend infrastructure and data storage systems built for scalability and security as your business grows.",
  },
  {
    q: "Do you provide ongoing support and maintenance for the applications you develop?",
    a: "Always. Every project includes a support arrangement afterward fixes, monitoring, and updates so you're never handed a codebase and left alone.",
  },
];

function AccordionItem({ q, a, index }) {
  const [open, setOpen] = useState(false);
  return (
    <button className="faq-accordion-item" onClick={() => setOpen((o) => !o)}>
      <div className="faq-accordion-header">
        <span
          className={`faq-q-icon ${index % 2 === 0 ? "faq-q-gray" : "faq-q-orange"}`}
        >
          Q
        </span>
        <span className="faq-grid-question">{q}</span>
        <span className={`faq-accordion-chevron ${open ? "open" : ""}`}>›</span>
      </div>
      <div className={`faq-accordion-body ${open ? "open" : ""}`}>
        <p className="faq-grid-answer">{a}</p>
      </div>
    </button>
  );
}

export default function FAQ() {
  const [faq, setFaq] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", question: "" });
  const [status, setStatus] = useState(null);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    api
      .getFaq()
      .then(setFaq)
      .catch(() => {});
  }, []);

  async function submit(e) {
    e.preventDefault();
    setSending(true);
    setStatus(null);
    try {
      await api.askQuestion(form);
      setForm({ name: "", email: "", question: "" });
      setStatus("ok");
    } catch {
      setStatus("err");
    } finally {
      setSending(false);
    }
  }

  const allFaq = [
    ...STARTER_FAQ,
    ...faq.map((f) => ({ q: f.question, a: f.answer })),
  ];

  return (
    <section
      style={{
        background: "#123d38",
        paddingTop: 90,
        paddingBottom: 90,
        borderBottom: "1px solid #0e2f2b",
      }}
    >
      <div className="wrap" style={{ textAlign: "center", marginBottom: 50 }}>
        <h2 className="section-title display" style={{ color: "#ffffff" }}>
          faq
        </h2>

        <p
          style={{
            color: "rgba(255,255,255,0.6)",
            marginTop: 14,
            maxWidth: 480,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          The questions we hear most and if yours isn't here, just ask below.
        </p>
      </div>

      <div className="wrap">
        <div className="faq-accordion-grid">
          {allFaq.map((item, i) => (
            <AccordionItem
              key={`${item.q}-${i}`}
              q={item.q}
              a={item.a}
              index={i}
            />
          ))}
        </div>

        <div className="faq-ask-box-light">
          <div className="display faq-ask-title">Ask a Question</div>
          <p className="faq-ask-subtitle">
            Can't find what you're looking for? Send us your question directly.
          </p>
          <form onSubmit={submit}>
            <div className="field">
              <label htmlFor="qname">Name (optional)</label>
              <input
                id="qname"
                value={form.name}
                onChange={(e) =>
                  setForm((f) => ({ ...f, name: e.target.value }))
                }
              />
            </div>
            <div className="field">
              <label htmlFor="qemail">
                Email (optional, so we can reply directly)
              </label>
              <input
                id="qemail"
                type="email"
                value={form.email}
                onChange={(e) =>
                  setForm((f) => ({ ...f, email: e.target.value }))
                }
              />
            </div>
            <div className="field">
              <label htmlFor="qquestion">Your question</label>
              <textarea
                id="qquestion"
                rows="3"
                required
                value={form.question}
                onChange={(e) =>
                  setForm((f) => ({ ...f, question: e.target.value }))
                }
              />
            </div>
            <button className="btn-primary" type="submit" disabled={sending}>
              {sending ? "Sending…" : "Submit Question →"}
            </button>
            {status === "ok" && (
              <p className="form-status ok">
                Thanks, we'll answer soon and it may appear above.
              </p>
            )}
            {status === "err" && (
              <p className="form-status err">
                Something went wrong. Please try again.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
