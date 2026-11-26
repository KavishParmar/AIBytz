import { useState, useRef, useEffect, useCallback } from "react";
import "./ChatWidget.css";

const WEBHOOK_URL = "https://hook.us2.make.com/lyicp1bik3936hd45axjk33p68kldeeb";
const STORAGE_KEY = "aibytz_chat";
const MAX_CHATS = 10;
const MAX_MESSAGES = 50;
const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;
const FIVE_HOURS = 5 * 60 * 60 * 1000;
const WELCOME_TEXT = "Hi 👋 I'm the AIBytz Assistant. What would you like to automate or build?";
const POPUP_DELAY = 30000; // 30 seconds

// ── localStorage helpers ────────────────────────────────────────────
let _memFallback = null;
function lsGet() {
  try { const r = localStorage.getItem(STORAGE_KEY); return r ? JSON.parse(r) : null; }
  catch { return _memFallback; }
}
function lsSet(data) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); }
  catch { _memFallback = data; }
}
function lsDel() {
  try { localStorage.removeItem(STORAGE_KEY); }
  catch { _memFallback = null; }
}

// ── Store init ──────────────────────────────────────────────────────
function initStore() {
  const existing = lsGet();
  if (existing && Date.now() - existing.lastActive < THIRTY_DAYS) return existing;
  const fresh = {
    visitorId: crypto.randomUUID(),
    lastActive: Date.now(),
    currentChatId: null,
    chats: [],
    welcomeShown: 0, // timestamp last shown
    unread: false,
  };
  lsSet(fresh);
  return fresh;
}

function mkNewChat(store) {
  const chat = { id: crypto.randomUUID(), title: null, messages: [] };
  const chats = [chat, ...store.chats].slice(0, MAX_CHATS);
  return { ...store, chats, currentChatId: chat.id, lastActive: Date.now() };
}

// ── Link renderer — no innerHTML ────────────────────────────────────
const URL_RE = /https?:\/\/[^\s<>"')\]]+/g;

function MessageContent({ text }) {
  const parts = [];
  let last = 0;
  let m;
  URL_RE.lastIndex = 0;
  while ((m = URL_RE.exec(text)) !== null) {
    const url = m[0].replace(/[.,;:!?]+$/, ""); // strip trailing punctuation
    if (m.index > last) parts.push({ type: "text", value: text.slice(last, m.index) });
    parts.push({ type: "url", value: url });
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push({ type: "text", value: text.slice(last) });

  return (
    <span style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
      {parts.map((p, i) => {
        if (p.type === "text") return <span key={i}>{p.value}</span>;
        const isCalendly = p.value.includes("calendly.com");
        if (isCalendly) {
          return (
            <span key={i} className="chat-link-group">
              <a href={p.value} target="_blank" rel="noopener noreferrer" className="chat-link">{p.value}</a>
              <a href={p.value} target="_blank" rel="noopener noreferrer" className="chat-calendly-btn">📅 Book a free call</a>
              <button
                className="chat-copy-btn"
                onClick={() => { try { navigator.clipboard.writeText(p.value); } catch {} }}
              >Copy link</button>
            </span>
          );
        }
        return <a key={i} href={p.value} target="_blank" rel="noopener noreferrer" className="chat-link">{p.value}</a>;
      })}
    </span>
  );
}

// ── Component ───────────────────────────────────────────────────────
const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState("chat");
  const [store, setStore] = useState(() => initStore());
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmForget, setConfirmForget] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupDismissed, setPopupDismissed] = useState(false);
  const [unread, setUnread] = useState(false);
  const bottomRef = useRef(null);
  const popupTimerRef = useRef(null);
  const welcomeShownRef = useRef(false); // tracks if welcome shown this session

  const persist = useCallback((updater) => {
    setStore((prev) => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      lsSet(next);
      return next;
    });
  }, []);

  // ── Show welcome message in chat (typing → message) ──────────────
  const showWelcomeInChat = useCallback((currentMsgs) => {
    if (welcomeShownRef.current) return;
    welcomeShownRef.current = true;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const welcomeMsg = { role: "bot", text: WELCOME_TEXT, time: Date.now() };
      setMessages((prev) => {
        const base = currentMsgs ?? prev;
        return [...base, welcomeMsg];
      });
    }, 1200);
  }, []);

  // ── Restore chat on mount ─────────────────────────────────────────
  useEffect(() => {
    const s = store;
    if (s.currentChatId) {
      const chat = s.chats.find((c) => c.id === s.currentChatId);
      if (chat && chat.messages.length > 0) {
        setMessages(chat.messages);
        welcomeShownRef.current = true;
        return;
      }
    }
    // No saved chat — welcome will show when opened or via popup
  }, []); // eslint-disable-line

  // ── Popup timer (30 seconds, only if conditions met) ─────────────
  useEffect(() => {
    const s = store;
    const shouldShow = !s.welcomeShown || (Date.now() - s.welcomeShown > FIVE_HOURS);
    if (!shouldShow) return;

    popupTimerRef.current = setTimeout(() => {
      if (!open) {
        setShowPopup(true);
        setUnread(true);
        persist((prev) => ({ ...prev, unread: true, welcomeShown: Date.now() }));
      }
    }, POPUP_DELAY);

    return () => clearTimeout(popupTimerRef.current);
  }, []); // eslint-disable-line

  // ── Open chat handler ─────────────────────────────────────────────
  const handleOpen = useCallback(() => {
    clearTimeout(popupTimerRef.current);
    setShowPopup(false);
    setUnread(false);
    persist((prev) => ({ ...prev, unread: false }));

    setOpen(true);

    // If welcome not yet shown this session, show it
    if (!welcomeShownRef.current) {
      setMessages([]);
      showWelcomeInChat([]);
    }
  }, [showWelcomeInChat, persist]); // eslint-disable-line

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const saveMessages = useCallback((msgs, currentStore) => {
    const s = currentStore ?? store;
    if (!s.currentChatId) return;
    const saveable = msgs.filter(
      (m) => m.role === "user" ||
        (m.role === "bot" &&
          m.text !== "Sorry, I couldn't get a response. Please try again." &&
          m.text !== "Network error. Please check your connection.")
    );
    const toSave = saveable.slice(-MAX_MESSAGES);
    persist((prev) => {
      const chats = prev.chats.map((c) => {
        if (c.id !== prev.currentChatId) return c;
        const title = c.title ?? (toSave.find((m) => m.role === "user")?.text?.slice(0, 40) ?? null);
        return { ...c, title, messages: toSave };
      });
      return { ...prev, chats, lastActive: Date.now() };
    });
  }, [store, persist]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");

    let currentStore = store;
    if (!currentStore.currentChatId) {
      currentStore = mkNewChat(currentStore);
      setStore(currentStore);
      lsSet(currentStore);
    }

    const userMsg = { role: "user", text, time: Date.now() };
    const next = [...messages, userMsg];
    setMessages(next);
    setLoading(true);

    try {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, sessionId: currentStore.visitorId }),
      });
      const reply = (await res.text()).trim();

      if (!res.ok || !reply || reply === "Accepted") {
        console.error("Chatbot error:", res.status, reply);
        setMessages((prev) => {
          const updated = [...prev, { role: "bot", text: "Sorry, I couldn't get a response. Please try again.", time: Date.now() }];
          saveMessages(updated, currentStore);
          return updated;
        });
      } else {
        setMessages((prev) => {
          const updated = [...prev, { role: "bot", text: reply, time: Date.now() }];
          saveMessages(updated, currentStore);
          return updated;
        });
      }
    } catch (err) {
      console.error("Chatbot network error:", err);
      setMessages((prev) => [...prev, { role: "bot", text: "Network error. Please check your connection.", time: Date.now() }]);
    } finally {
      setLoading(false);
    }
  };

  const startNewChat = () => {
    welcomeShownRef.current = false;
    const updated = mkNewChat(store);
    setStore(updated);
    lsSet(updated);
    setMessages([]);
    setView("chat");
    showWelcomeInChat([]);
  };

  const openChat = (chatId) => {
    const chat = store.chats.find((c) => c.id === chatId);
    if (!chat) return;
    persist((prev) => ({ ...prev, currentChatId: chatId, lastActive: Date.now() }));
    setMessages(chat.messages);
    welcomeShownRef.current = true;
    setView("chat");
  };

  const forgetMe = () => {
    lsDel();
    welcomeShownRef.current = false;
    const fresh = initStore();
    setStore(fresh);
    setMessages([]);
    setConfirmForget(false);
    setView("chat");
    showWelcomeInChat([]);
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
  };

  const historyChats = store.chats.filter((c) => c.messages.length > 0);

  return (
    <div className="chat-widget" data-chat>
      {/* Popup bubble */}
      {showPopup && !popupDismissed && (
        <div className="chat-popup" onClick={() => { setPopupDismissed(true); setShowPopup(false); handleOpen(); }}>
          <div className="chat-popup-name">AIBytz Assistant</div>
          <div className="chat-popup-text">{WELCOME_TEXT}</div>
          <button
            className="chat-popup-close"
            onClick={(e) => { e.stopPropagation(); setPopupDismissed(true); setShowPopup(false); }}
            aria-label="Dismiss"
          >✕</button>
        </div>
      )}

      {/* Chat panel */}
      {open && (
        <div className="chat-panel">
          <div className="chat-header">
            <span className="chat-header-dot" />
            <span>AIBytz Assistant</span>
            <div className="chat-header-actions">
              <button className="chat-header-btn" onClick={() => setView((v) => v === "history" ? "chat" : "history")} title="Chat history">☰</button>
              <button className="chat-header-btn" onClick={startNewChat} title="New chat">＋</button>
              <button className="chat-close" onClick={() => setOpen(false)} aria-label="Close chat">✕</button>
            </div>
          </div>

          {view === "history" ? (
            <div className="chat-history">
              <p className="chat-history-title">Previous chats</p>
              {historyChats.length === 0 && <p className="chat-history-empty">No previous chats yet.</p>}
              {historyChats.map((c) => (
                <button key={c.id} className="chat-history-item" onClick={() => openChat(c.id)}>
                  <span className="chat-history-label">{c.title ?? "Untitled chat"}</span>
                  <span className="chat-history-count">{c.messages.length} msg</span>
                </button>
              ))}
              <div className="chat-history-footer">
                {confirmForget ? (
                  <div className="chat-forget-confirm">
                    <span>Delete all data?</span>
                    <button className="chat-forget-yes" onClick={forgetMe}>Yes, forget me</button>
                    <button className="chat-forget-no" onClick={() => setConfirmForget(false)}>Cancel</button>
                  </div>
                ) : (
                  <button className="chat-forget-btn" onClick={() => setConfirmForget(true)}>🗑 Forget me</button>
                )}
              </div>
            </div>
          ) : (
            <>
              <div className="chat-messages">
                {messages.map((m, i) => (
                  <div key={i} className={`chat-msg chat-msg--${m.role}`}>
                    <div className="chat-bubble">
                      <MessageContent text={m.text} />
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="chat-msg chat-msg--bot">
                    <div className="chat-bubble chat-typing"><span /><span /><span /></div>
                  </div>
                )}
                <div ref={bottomRef} />
              </div>

              <p className="chat-storage-note">Chats are saved on this device for 30 days.</p>

              <div className="chat-input-row">
                <input
                  className="chat-input"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  placeholder="Type a message…"
                  disabled={loading}
                  autoFocus
                />
                <button className="chat-send" onClick={send} disabled={loading || !input.trim()} aria-label="Send">↑</button>
              </div>
            </>
          )}
        </div>
      )}

      {/* FAB */}
      <button
        className={`chat-fab${open ? " chat-fab--active" : ""}`}
        onClick={() => { if (!open) handleOpen(); else setOpen(false); }}
        aria-label={open ? "Close chat" : "Open chat"}
      >
        {unread && !open && <span className="chat-badge">1</span>}
        {open ? (
          <span className="chat-fab-icon">✕</span>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="22" height="22">
            <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z" fill="currentColor"/>
          </svg>
        )}
      </button>
    </div>
  );
};

export default ChatWidget;
