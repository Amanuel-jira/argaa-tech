import { useEffect, useRef, useState } from "react";
import { api } from "../api.js";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi! I'm the Argaa Tech assistant. Ask me about our services, process, or how to get started.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bodyRef = useRef(null);

  useEffect(() => {
    if (bodyRef.current)
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [messages, open]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    const nextMsgs = [...messages, { role: "user", content: text }];
    setMessages(nextMsgs);
    setLoading(true);
    try {
      const { reply } = await api.chat(nextMsgs);
      setMessages((m) => [...m, { role: "assistant", content: reply }]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content:
            "Sorry, something went wrong. Please try again or use the contact form.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        className="chat-toggle"
        onClick={() => setOpen((o) => !o)}
        aria-label="Toggle chat"
      >
        {open ? "✕" : "💬"}
      </button>
      {open && (
        <div className="chat-panel">
          <div className="chat-head">
            <span className="chat-head-title display">Argaa Assistant</span>
          </div>
          <div className="chat-body" ref={bodyRef}>
            {messages.map((m, i) => (
              <div
                key={i}
                className={`chat-msg ${m.role === "user" ? "user" : "bot"}`}
              >
                {m.content}
              </div>
            ))}
            {loading && <div className="chat-msg bot">…</div>}
          </div>
          <div className="chat-input-row">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Ask about our services…"
            />
            <button onClick={send} aria-label="Send">
              →
            </button>
          </div>
        </div>
      )}
    </>
  );
}
