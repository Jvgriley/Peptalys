/* Hand-authored line-icon set (24x24, stroke, currentColor) + the Peptalys
   monogram mark. Kept dependency-free so the page needs no icon-font CDN. */

const ICON_PATHS = {
  search: "M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM21 21l-4.3-4.3",
  filter: "M4 6h16M7 12h10M10 18h4",
  chevronDown: "M6 9l6 6 6-6",
  chevronUp: "M18 15l-6-6-6 6",
  chevronRight: "M9 6l6 6-6 6",
  chevronLeft: "M15 6l-6 6 6 6",
  close: "M6 6l12 12M18 6L6 18",
  menu: "M4 7h16M4 12h16M4 17h16",
  cart: "M3 4h2l2.4 12.2a2 2 0 0 0 2 1.6h7.2a2 2 0 0 0 2-1.6L20.5 8H6M9.5 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM17.5 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z",
  user: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4.5 20.5a7.5 7.5 0 0 1 15 0",
  check: "M5 13l4 4L19 7",
  shield: "M12 3l7 3v6c0 4.5-3 7.7-7 9-4-1.3-7-4.5-7-9V6l7-3Z",
  shieldCheck: "M12 3l7 3v6c0 4.5-3 7.7-7 9-4-1.3-7-4.5-7-9V6l7-3ZM9 12l2 2 4-4",
  flask: "M9 2h6M10 2v6.2L4.8 18a2 2 0 0 0 1.8 3h10.8a2 2 0 0 0 1.8-3L14 8.2V2M7.5 15h9",
  truck: "M3 6h11v9H3zM14 10h4l3 3v2h-7zM7 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM18 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z",
  users: "M9 12a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM2.8 20a6.2 6.2 0 0 1 12.4 0M16 8.2a3 3 0 1 1 0 6M21.2 20a5.6 5.6 0 0 0-4-5.4",
  flag: "M5 21V4M5 4h13l-2.5 3.5L18 11H5",
  sparkle: "M12 3l1.6 4.9L18.5 9.5l-4.9 1.6L12 16l-1.6-4.9L5.5 9.5l4.9-1.6L12 3ZM19 15l.7 2.1 2.1.7-2.1.7-.7 2.1-.7-2.1-2.1-.7 2.1-.7.7-2.1Z",
  atom: "M12 12a1.4 1.4 0 1 0 0-2.8 1.4 1.4 0 0 0 0 2.8ZM12 3c3 2.5 4.8 6 4.8 9s-1.8 6.5-4.8 9c-3-2.5-4.8-6-4.8-9S9 5.5 12 3ZM3.5 8.2c3.6-1.4 7.4-1.4 11 0s6.2 3.8 7 7.4c-3.6 1.4-7.4 1.4-11 0S4.3 11.8 3.5 8.2Z",
  scale: "M12 3v3M6 6h12M6 6L3 12a3 3 0 0 0 6 0L6 6ZM18 6l-3 6a3 3 0 0 0 6 0l-3-6ZM9 21h6",
  trendingUp: "M3 17l6-6 4 4 8-8M15 7h6v6",
  droplet: "M12 3s6 6.5 6 11a6 6 0 1 1-12 0c0-4.5 6-11 6-11Z",
  leaf: "M20 4C10 4 4 10 4 18c8 0 14-6 14-14ZM4 20l6-6",
  lock: "M6 11V8a6 6 0 1 1 12 0v3M5 11h14v9H5z",
  plus: "M12 5v14M5 12h14",
  minus: "M5 12h14",
  trash: "M4 7h16M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M7 7l1 13a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2l1-13",
  arrowRight: "M4 12h16M14 6l6 6-6 6",
  arrowLeft: "M20 12H4M10 18l-6-6 6-6",
  star: "M12 3l2.6 5.6 6.2.6-4.6 4.2 1.3 6.1L12 16.7 6.5 19.5l1.3-6.1-4.6-4.2 6.2-.6L12 3Z",
  info: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM12 11v6M12 7v.01",
  mail: "M4 5h16v14H4zM4 6l8 7 8-7",
  phone: "M6 3h3l1.5 5-2 1.5a12 12 0 0 0 6 6l1.5-2 5 1.5v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4 6.2 2 2 0 0 1 6 3Z",
  mapPin: "M12 21s7-6.2 7-11.5A7 7 0 1 0 5 9.5C5 14.8 12 21 12 21ZM12 11.8a2.3 2.3 0 1 0 0-4.6 2.3 2.3 0 0 0 0 4.6Z",
  instagram: "M4 8a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V8ZM12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM17 6.3v.01",
  heart: "M12 20s-7.5-4.6-9.6-9A5.3 5.3 0 0 1 12 6.5 5.3 5.3 0 0 1 21.6 11c-2.1 4.4-9.6 9-9.6 9Z",
  download: "M12 3v12M7 10l5 5 5-5M4 19h16",
  clipboard: "M9 4h6a1 1 0 0 1 1 1v1H8V5a1 1 0 0 1 1-1ZM6 6h12v14H6zM9 12h6M9 16h6",
  package: "M21 8l-9-5-9 5 9 5 9-5ZM3 8v9l9 5 9-5V8M12 13v9",
  creditCard: "M3 6h18v12H3zM3 10h18M7 15h4",
  alertTriangle: "M12 4l9 16H3L12 4ZM12 10v4M12 17v.01",
  building: "M4 21V6l8-3 8 3v15M9 21v-5h6v5M9 10h.01M9 14h.01M15 10h.01M15 14h.01",
  microscope: "M9 21h6M10 21v-3.5a4 4 0 1 1 4 0V21M5 21h1M9 3l5 5M7 8l3-3 5 5-3 3-5-5Z",
  globe: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM3 12h18M12 3a13 13 0 0 1 0 18 13 13 0 0 1 0-18Z",
  clock: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM12 7v5l3 3",
  fileText: "M7 3h7l5 5v13H7zM14 3v5h5M9 13h6M9 17h6",
  quote: "M7 8c-2 1.2-3 3-3 5.2 0 2.1 1.4 3.8 3.4 3.8 1.8 0 3.1-1.4 3.1-3.1C10.5 12 9 10.6 7 10.5c.1-1.4 1-2.4 2.2-3.2L7 8Zm9 0c-2 1.2-3 3-3 5.2 0 2.1 1.4 3.8 3.4 3.8 1.8 0 3.1-1.4 3.1-3.1 0-1.9-1.5-3.3-3.5-3.4.1-1.4 1-2.4 2.2-3.2L16 8Z",
};

function Icon({ name, className, strokeWidth = 1.8, filled = false }) {
  const d = ICON_PATHS[name];
  if (!d) return null;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className || "h-5 w-5"}
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  );
}

/* Peptalys monogram — an original, simplified interpretation of the brand's
   "P" ribbon-and-molecule mark for use at small sizes (nav, favicon-ish). */
function LogoMark({ className }) {
  return (
    <svg viewBox="0 0 48 48" className={className || "h-8 w-8"} aria-hidden="true">
      <defs>
        <linearGradient id="ppt-grad" x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#6DD1FF" />
          <stop offset="1" stopColor="#0A3D91" />
        </linearGradient>
      </defs>
      <path
        d="M14 5h9.5c7 0 11.5 4 11.5 10s-4.5 10-11.2 10H19v18h-5V5Z"
        fill="url(#ppt-grad)"
      />
      <path d="M19 10.5v9.2" stroke="#071022" strokeWidth="2.2" strokeLinecap="round" opacity="0.35" />
      <circle cx="19" cy="10.2" r="2.1" fill="#EAF2FF" />
      <circle cx="19" cy="15.1" r="1.5" fill="#EAF2FF" opacity="0.9" />
      <circle cx="19" cy="19.6" r="1.9" fill="#EAF2FF" />
    </svg>
  );
}

/* Decorative DNA helix, used as ambient background texture. Purely
   ornamental (aria-hidden), so it stays out of the reading order. */
function DnaStrand({ className, opacity = 0.5 }) {
  const rungs = Array.from({ length: 9 });
  return (
    <svg viewBox="0 0 120 420" className={className} aria-hidden="true" style={{ opacity }}>
      <defs>
        <linearGradient id="dna-line" x1="0" y1="0" x2="0" y2="420" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#6DD1FF" stopOpacity="0" />
          <stop offset="0.15" stopColor="#6DD1FF" stopOpacity="0.9" />
          <stop offset="0.85" stopColor="#2F8FFF" stopOpacity="0.9" />
          <stop offset="1" stopColor="#2F8FFF" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d="M20 0 C 100 52, 20 105, 100 157 C 20 210, 100 262, 20 315 C 100 367, 20 400, 20 420"
        stroke="url(#dna-line)" strokeWidth="2" fill="none" />
      <path d="M100 0 C 20 52, 100 105, 20 157 C 100 210, 20 262, 100 315 C 20 367, 100 400, 100 420"
        stroke="url(#dna-line)" strokeWidth="2" fill="none" />
      {rungs.map((_, i) => {
        const y = 20 + i * 46;
        return <line key={i} x1="20" y1={y} x2="100" y2={y} stroke="#9FCBFF" strokeWidth="1" opacity="0.35" />;
      })}
    </svg>
  );
}
