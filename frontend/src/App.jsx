import { useState, useRef, useEffect } from "react";

const API_URL = "https://cortexai-1.onrender.com";

function formatTime() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export default function App() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hello! I'm CortexAI, your intelligent AI assistant. Ask me anything — coding, writing, analysis, and more.",
      time: formatTime(),
    },
  ]);
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const userMsg = { role: "user", content: trimmed, time: formatTime() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed, history }),
      });

      if (!res.ok) throw new Error(`Server error: ${res.status}`);

      const data = await res.json();
      setHistory(data.history);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply, time: formatTime() },
      ]);
    } catch (err) {
      setError("Failed to connect to the backend. Make sure it's running on port 8000.");
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        role: "assistant",
        content: "Conversation cleared! How can I help you?",
        time: formatTime(),
      },
    ]);
    setHistory([]);
    setError("");
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-left">
          <div className="logo">
            <span className="logo-icon">✦</span>
            <span className="logo-text">CortexAI </span>
          </div>
          <span className="badge">Powered by Gemini</span>
        </div>
        <button className="clear-btn" onClick={clearChat} title="Clear conversation">
          ↺ Clear
        </button>
      </header>

      {/* Chat window */}
      <main className="chat-window">
        {messages.map((msg, i) => (
          <div key={i} className={`message-row ${msg.role}`}>
            <div className="avatar">
              {msg.role === "assistant" ? "✦" : "U"}
            </div>
            <div className="bubble-wrap">
              <div className="bubble">
                <p>{msg.content}</p>
              </div>
              <span className="time">{msg.time}</span>
            </div>
          </div>
        ))}

        {loading && (
          <div className="message-row assistant">
            <div className="avatar">✦</div>
            <div className="bubble-wrap">
              <div className="bubble typing">
                <span /><span /><span />
              </div>
            </div>
          </div>
        )}

        {error && <div className="error-banner">{error}</div>}
        <div ref={bottomRef} />
      </main>

      {/* Input area */}
      <footer className="input-area">
        <textarea
          className="input-box"
          rows={1}
          placeholder="Message CortexAI... (Enter to send)"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
        />
        <button
          className={`send-btn ${loading || !input.trim() ? "disabled" : ""}`}
          onClick={sendMessage}
          disabled={loading || !input.trim()}
        >
          ➤
        </button>
      </footer>
    </div>
  );
}
