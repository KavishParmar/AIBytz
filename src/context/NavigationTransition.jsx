import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../components/NavigationTransition.css";

const NavigationTransitionContext = createContext(null);

const DEFAULT_DELAY = 650;
const EXIT_DELAY = 1200;
const CURTAIN_DURATION = 950;

export function NavigationTransitionProvider({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [label, setLabel] = useState("");
  const timers = useRef([]);

  const clearTimers = useCallback(() => {
    timers.current.forEach((timer) => window.clearTimeout(timer));
    timers.current = [];
  }, []);

  const startTransition = useCallback(
    (target, transitionLabel) => {
      const [pathname, hash = ""] = target.split("#");
      const nextPath = pathname || "/";
      const nextHash = hash ? `#${hash}` : "";

      if (location.pathname === nextPath && location.hash === nextHash && nextPath !== "/") {
        return;
      }

      clearTimers();
      setExiting(false);
      setLabel(transitionLabel);
      setVisible(true);

      timers.current.push(
        window.setTimeout(() => {
          navigate(nextHash ? `${nextPath}${nextHash}` : nextPath);
          window.scrollTo(0, 0);
        }, DEFAULT_DELAY)
      );

      timers.current.push(
        window.setTimeout(() => {
          setVisible(false);
          setExiting(true);
          timers.current.push(
            window.setTimeout(() => {
              setExiting(false);
            }, CURTAIN_DURATION)
          );
        }, EXIT_DELAY)
      );
    },
    [clearTimers, location.hash, location.pathname, navigate]
  );

  useEffect(() => clearTimers, [clearTimers]);

  const value = useMemo(() => ({ startTransition }), [startTransition]);

  return (
    <NavigationTransitionContext.Provider value={value}>
      {children}

      <div
        className={`page-transition${
          visible
            ? " page-transition-active"
            : exiting
            ? " page-transition-exit"
            : " page-transition-below"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 120"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M0 0 L100 0 L100 100 Q50 120 0 100 Z" fill="#14121a" />
        </svg>
        {visible && <span className="page-transition-label">{label}</span>}
      </div>
    </NavigationTransitionContext.Provider>
  );
}

export function useNavigationTransition() {
  const context = useContext(NavigationTransitionContext);
  if (!context) {
    throw new Error("useNavigationTransition must be used within a NavigationTransitionProvider");
  }
  return context;
}
