/**
 * Reusable yellow bulldozer SVG.
 *
 * Props:
 *   view  — "side" (default) or "top"
 *           • "side": classic side-view matching the hero canvas dozer.
 *             Blade faces RIGHT by default. Add className "-scale-x-100" to face LEFT.
 *           • "top": bird's-eye view, blade at top (for pushing upward).
 *   className, style — sizing and positioning.
 */
export default function Dozer({ view = "side", className = "", style = {} }) {
  if (view === "top") return <DozerTop className={className} style={style} />;
  return <DozerSide className={className} style={style} />;
}

/* ─── Side view (blade faces right) ─── */
function DozerSide({ className, style }) {
  return (
    <svg viewBox="0 0 130 90" fill="none" className={className} style={style}>
      {/* blade (right side, facing right) */}
      <path
        d="M118 14 L126 14 L126 62 Q126 66 122 66 L118 66 Z"
        fill="#F5C518" stroke="#111" strokeWidth="2"
      />

      {/* push arm */}
      <line x1="100" y1="38" x2="118" y2="32" stroke="#111" strokeWidth="4.5" strokeLinecap="round" />
      <line x1="100" y1="48" x2="118" y2="54" stroke="#111" strokeWidth="4.5" strokeLinecap="round" />

      {/* chassis */}
      <rect x="30" y="24" width="72" height="36" rx="4" fill="#F5C518" stroke="#111" strokeWidth="2.5" />

      {/* cab */}
      <rect x="38" y="4" width="38" height="24" rx="4" fill="#F5C518" stroke="#111" strokeWidth="2.5" />
      {/* cab window */}
      <rect x="44" y="9" width="26" height="14" rx="2.5" fill="#111" />
      {/* window shine */}
      <rect x="47" y="12" width="6" height="8" rx="1" fill="#2a2a2a" />

      {/* exhaust stack */}
      <rect x="34" y="8" width="5" height="20" rx="2" fill="#333" stroke="#111" strokeWidth="1.5" />
      {/* exhaust cap */}
      <rect x="32" y="5" width="9" height="5" rx="2" fill="#444" />

      {/* track frame */}
      <rect x="22" y="58" width="82" height="22" rx="11" fill="#222" stroke="#111" strokeWidth="2" />
      {/* track treads */}
      <line x1="32" y1="60" x2="32" y2="78" stroke="#444" strokeWidth="1.5" />
      <line x1="42" y1="60" x2="42" y2="78" stroke="#444" strokeWidth="1.5" />
      <line x1="52" y1="60" x2="52" y2="78" stroke="#444" strokeWidth="1.5" />
      <line x1="62" y1="60" x2="62" y2="78" stroke="#444" strokeWidth="1.5" />
      <line x1="72" y1="60" x2="72" y2="78" stroke="#444" strokeWidth="1.5" />
      <line x1="82" y1="60" x2="82" y2="78" stroke="#444" strokeWidth="1.5" />
      <line x1="92" y1="60" x2="92" y2="78" stroke="#444" strokeWidth="1.5" />

      {/* front wheel (large) */}
      <circle cx="90" cy="69" r="9" fill="#111" />
      <circle cx="90" cy="69" r="4" fill="#333" />
      <line x1="84" y1="69" x2="96" y2="69" stroke="#F5C518" strokeWidth="1.5" />
      <line x1="90" y1="63" x2="90" y2="75" stroke="#F5C518" strokeWidth="1.5" />

      {/* rear wheel (large) */}
      <circle cx="36" cy="69" r="9" fill="#111" />
      <circle cx="36" cy="69" r="4" fill="#333" />
      <line x1="30" y1="69" x2="42" y2="69" stroke="#F5C518" strokeWidth="1.5" />
      <line x1="36" y1="63" x2="36" y2="75" stroke="#F5C518" strokeWidth="1.5" />

      {/* middle wheel (smaller) */}
      <circle cx="63" cy="69" r="7" fill="#111" />
      <circle cx="63" cy="69" r="3" fill="#333" />
      <line x1="58" y1="69" x2="68" y2="69" stroke="#F5C518" strokeWidth="1.5" />
      <line x1="63" y1="64" x2="63" y2="74" stroke="#F5C518" strokeWidth="1.5" />
    </svg>
  );
}

/* ─── Top-down / bird's-eye view (blade faces up) ─── */
function DozerTop({ className, style }) {
  return (
    <svg viewBox="0 0 80 120" fill="none" className={className} style={style}>
      {/* blade */}
      <rect x="4" y="2" width="72" height="12" rx="2" fill="#F5C518" stroke="#111" strokeWidth="2" />
      <rect x="12" y="0" width="4" height="4" rx="1" fill="#C9A10A" />
      <rect x="24" y="0" width="4" height="4" rx="1" fill="#C9A10A" />
      <rect x="36" y="0" width="4" height="4" rx="1" fill="#C9A10A" />
      <rect x="48" y="0" width="4" height="4" rx="1" fill="#C9A10A" />
      <rect x="60" y="0" width="4" height="4" rx="1" fill="#C9A10A" />

      {/* push arms */}
      <rect x="14" y="14" width="6" height="14" rx="1" fill="#111" />
      <rect x="60" y="14" width="6" height="14" rx="1" fill="#111" />

      {/* left track */}
      <rect x="2" y="20" width="14" height="90" rx="7" fill="#222" stroke="#111" strokeWidth="1.5" />
      {[30,40,50,60,70,80,90,100].map((y) => (
        <line key={`l${y}`} x1="4" y1={y} x2="14" y2={y} stroke="#444" strokeWidth="1.5" />
      ))}

      {/* right track */}
      <rect x="64" y="20" width="14" height="90" rx="7" fill="#222" stroke="#111" strokeWidth="1.5" />
      {[30,40,50,60,70,80,90,100].map((y) => (
        <line key={`r${y}`} x1="66" y1={y} x2="76" y2={y} stroke="#444" strokeWidth="1.5" />
      ))}

      {/* body */}
      <rect x="18" y="28" width="44" height="54" rx="4" fill="#F5C518" stroke="#111" strokeWidth="2" />
      <line x1="24" y1="34" x2="56" y2="34" stroke="#C9A10A" strokeWidth="1.5" />
      <line x1="24" y1="40" x2="56" y2="40" stroke="#C9A10A" strokeWidth="1.5" />
      <line x1="24" y1="46" x2="56" y2="46" stroke="#C9A10A" strokeWidth="1.5" />

      {/* cab */}
      <rect x="22" y="54" width="36" height="24" rx="3" fill="#E0AD00" stroke="#111" strokeWidth="2" />
      <rect x="26" y="58" width="28" height="16" rx="2" fill="#111" />
      <rect x="30" y="61" width="20" height="10" rx="1.5" fill="#2a2a2a" />

      {/* exhaust */}
      <circle cx="52" cy="32" r="3.5" fill="#333" stroke="#111" strokeWidth="1" />
      <circle cx="52" cy="32" r="1.5" fill="#555" />

      {/* rear hitch */}
      <rect x="34" y="108" width="12" height="8" rx="2" fill="#333" stroke="#111" strokeWidth="1.5" />
    </svg>
  );
}
