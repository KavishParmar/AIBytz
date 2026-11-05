import { useRef, useCallback, useEffect } from "react";

const RADIUS = 80;
const STRENGTH = 18;
const HOVER_COLOR = "#ff3b1f";

export function useHoverScramble() {
  const containerRef = useRef(null);
  const animFrameRef = useRef(null);
  const mousePos = useRef({ x: -9999, y: -9999 });
  const isHovering = useRef(false);

  const getCharSpans = useCallback(() => {
    if (!containerRef.current) return [];
    return containerRef.current.querySelectorAll("[data-hover-char]");
  }, []);

  const updatePositions = useCallback(() => {
    const chars = getCharSpans();
    const mx = mousePos.current.x;
    const my = mousePos.current.y;

    for (let i = 0; i < chars.length; i++) {
      const el = chars[i];
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = cx - mx;
      const dy = cy - my;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (isHovering.current && dist < RADIUS) {
        const t = 1 - dist / RADIUS;
        const force = t * STRENGTH;
        const angle = Math.atan2(dy, dx);
        const tx = Math.cos(angle) * force;
        const ty = Math.sin(angle) * force;
        el.style.transition = "transform 0.12s cubic-bezier(0.22, 1, 0.36, 1), color 0.12s ease, -webkit-text-stroke-color 0.12s ease";
        el.style.transform = `translate(${tx}px, ${ty}px)`;
        el.style.color = HOVER_COLOR;
        el.style.webkitTextStrokeColor = HOVER_COLOR;
      } else {
        if (el.dataset.active) {
          el.style.transition = "transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), color 0.35s ease, -webkit-text-stroke-color 0.35s ease";
          el.style.transform = "translate(0px, 0px)";
          el.style.color = "";
          el.style.webkitTextStrokeColor = "";
          delete el.dataset.active;
        }
        continue;
      }
      el.dataset.active = "1";
    }

    if (isHovering.current) {
      animFrameRef.current = requestAnimationFrame(updatePositions);
    }
  }, [getCharSpans]);

  const onMouseMove = useCallback(
    (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isHovering.current) {
        isHovering.current = true;
        animFrameRef.current = requestAnimationFrame(updatePositions);
      }
    },
    [updatePositions]
  );

  const onMouseLeave = useCallback(() => {
    isHovering.current = false;
    mousePos.current = { x: -9999, y: -9999 };
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
    }
    const chars = getCharSpans();
    for (let i = 0; i < chars.length; i++) {
      chars[i].style.transition = "transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), color 0.35s ease, -webkit-text-stroke-color 0.35s ease";
      chars[i].style.transform = "translate(0px, 0px)";
      chars[i].style.color = "";
      chars[i].style.webkitTextStrokeColor = "";
      delete chars[i].dataset.active;
    }
  }, [getCharSpans]);

  useEffect(() => {
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return { containerRef, onMouseMove, onMouseLeave };
}

export function ScrambleChars({ text, className = "", style }) {
  if (!text) return null;

  return (
    <span className={className} style={style}>
      {text.split("").map((char, i) => {
        if (char === " ") {
          return (
            <span
              key={i}
              data-hover-char
              style={{ display: "inline-block", width: "0.27em" }}
            >
              {" "}
            </span>
          );
        }
        return (
          <span
            key={i}
            data-hover-char
            style={{ display: "inline-block", willChange: "transform" }}
          >
            {char}
          </span>
        );
      })}
    </span>
  );
}
