import { useEffect } from "react";

/**
 * Blocks the ways a visitor can lift text off the page: copy/cut, the context
 * menu, drag-selecting, and the Ctrl/Cmd+A → Ctrl/Cmd+C shortcut pair.
 *
 * Form fields are exempt, otherwise people cannot edit or paste into the
 * project form.
 */
const isEditable = (el) =>
  !!el &&
  (el.tagName === "INPUT" ||
    el.tagName === "TEXTAREA" ||
    el.tagName === "SELECT" ||
    el.isContentEditable);

const isInChat = (el) => {
  // Walk up — handle text nodes
  let node = el instanceof Element ? el : el?.parentElement;
  while (node) {
    if (node.dataset && "chat" in node.dataset) return true;
    node = node.parentElement;
  }
  return false;
};

export default function useCopyGuard(enabled = true) {
  useEffect(() => {
    if (!enabled) return;
    const blockUnlessEditable = (e) => {
      if (isEditable(e.target)) return;
      if (isInChat(e.target)) return;
      e.preventDefault();
    };

    const onKeyDown = (e) => {
      if (isEditable(e.target)) return;
      if (isInChat(e.target)) return;
      const mod = e.ctrlKey || e.metaKey;
      if (!mod) return;
      const k = e.key.toLowerCase();
      // select-all, copy, cut, and view-source / save-page
      if (k === "a" || k === "c" || k === "x" || k === "u" || k === "s") {
        e.preventDefault();
      }
    };

    document.addEventListener("copy", blockUnlessEditable);
    document.addEventListener("cut", blockUnlessEditable);
    document.addEventListener("contextmenu", blockUnlessEditable);
    document.addEventListener("dragstart", blockUnlessEditable);
    document.addEventListener("selectstart", blockUnlessEditable);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("copy", blockUnlessEditable);
      document.removeEventListener("cut", blockUnlessEditable);
      document.removeEventListener("contextmenu", blockUnlessEditable);
      document.removeEventListener("dragstart", blockUnlessEditable);
      document.removeEventListener("selectstart", blockUnlessEditable);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [enabled]);
}
