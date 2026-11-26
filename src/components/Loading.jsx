import { useCallback, useEffect, useRef, useState } from "react";
import "./Loading.css";
import { useLoading } from "../context/LoadingProvider";

const greetings = ["Hola", "Bonjour", "नमस्ते", "Ciao", "こんにちは", "Hallo", "Olá", "स्वागतम्"];
const GREETING_INTERVAL = 160;

export default function Loading({ percent }) {
  const { setIsLoading } = useLoading();
  const [exiting, setExiting] = useState(false);
  const [greetingIndex, setGreetingIndex] = useState(0);
  const exitStartedRef = useRef(false);
  const greetingsDoneRef = useRef(false);
  const percentRef = useRef(percent);

  const startExit = useCallback(() => {
    if (exitStartedRef.current) return;
    exitStartedRef.current = true;
    setExiting(true);

    const mainEl = document.querySelector("main");
    if (mainEl) mainEl.classList.add("main-active");

    window.setTimeout(() => {
      setIsLoading(false);
    }, 900);
  }, [setIsLoading]);

  useEffect(() => {
    percentRef.current = percent;
    if (greetingsDoneRef.current && percent >= 100) {
      startExit();
    }
  }, [percent, startExit]);

  useEffect(() => {
    const safetyStart = window.setTimeout(startExit, 7000);
    return () => window.clearTimeout(safetyStart);
  }, [startExit]);

  useEffect(() => {
    if (exitStartedRef.current) return;
    if (greetingIndex < greetings.length - 1) {
      const t = window.setTimeout(() => setGreetingIndex((i) => i + 1), GREETING_INTERVAL);
      return () => window.clearTimeout(t);
    }
    const t = window.setTimeout(() => {
      greetingsDoneRef.current = true;
      if (percentRef.current >= 100) {
        startExit();
      }
    }, GREETING_INTERVAL);
    return () => window.clearTimeout(t);
  }, [greetingIndex, startExit]);

  return (
    <div className={`loading-screen${exiting ? " loading-screen-exit" : ""}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 120"
        preserveAspectRatio="none"
        className="loading-screen-svg"
        aria-hidden="true"
      >
        <path d="M0 0 L100 0 L100 100 Q50 120 0 100 Z" fill="#14121a" />
      </svg>

      <div className="loading-screen-text">
        <span className="loading-screen-dot">•</span>
        <span key={greetingIndex} className="loading-screen-word">
          {greetings[greetingIndex]}
        </span>
      </div>
    </div>
  );
}
