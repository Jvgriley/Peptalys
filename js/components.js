/* ==========================================================================
   Shared design-system components: nav, footer, product visuals, cards,
   buttons, badges, the cart drawer, and toast host.
   ========================================================================== */

/* ---- tiny UI store (drawer / menu / search open state) ---------------- */
const uiStore = createStore({ cartOpen: false, menuOpen: false, searchOpen: false });
function useUi() {
  return React.useSyncExternalStore(uiStore.subscribe, uiStore.getState, uiStore.getState);
}
const UiActions = {
  openCart: () => uiStore.setState((s) => ({ ...s, cartOpen: true, menuOpen: false })),
  closeCart: () => uiStore.setState((s) => ({ ...s, cartOpen: false })),
  toggleMenu: () => uiStore.setState((s) => ({ ...s, menuOpen: !s.menuOpen })),
  closeMenu: () => uiStore.setState((s) => ({ ...s, menuOpen: false })),
  openSearch: () => uiStore.setState((s) => ({ ...s, searchOpen: true, menuOpen: false })),
  closeSearch: () => uiStore.setState((s) => ({ ...s, searchOpen: false })),
};

/* ---- layout primitives -------------------------------------------------- */
function Container({ className, children }) {
  return <div className={cx("mx-auto w-full max-w-[1240px] px-5 sm:px-6 lg:px-8", className)}>{children}</div>;
}

function Eyebrow({ children, className }) {
  return (
    <p className={cx("font-mono text-[11px] uppercase tracking-[0.24em] text-accent2", className)}>
      {children}
    </p>
  );
}

function SectionHeading({ eyebrow, title, body, align = "left", className }) {
  return (
    <div className={cx(align === "center" ? "text-center mx-auto" : "text-left", "max-w-2xl", className)}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold text-ink text-balance">{title}</h2>
      {body && <p className="mt-4 text-[15px] leading-relaxed text-dim">{body}</p>}
    </div>
  );
}

function Button({ as = "button", href, onClick, variant = "primary", size = "md", className, children, type, disabled, full }) {
  const base = "inline-flex items-center justify-center gap-2 rounded-full font-body font-semibold transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed";
  const sizes = { sm: "px-4 py-2 text-[13px]", md: "px-6 py-3 text-[14px]", lg: "px-8 py-4 text-[15px]" };
  const variants = {
    primary: "bg-gradient-to-r from-accent to-accentDeep text-white shadow-glow hover:brightness-110 hover:-translate-y-0.5",
    secondary: "bg-surface2 text-ink border border-line2 hover:border-accent2/60 hover:bg-surface3",
    ghost: "text-ink hover:text-accent2",
    outline: "border border-line2 text-ink hover:border-accent2 hover:text-accent2",
    danger: "bg-red-500/10 text-red-300 border border-red-500/30 hover:bg-red-500/20",
  };
  const classes = cx(base, sizes[size], variants[variant], full && "w-full", className);
  if (as === "a") {
    if (disabled) {
      return (
        <span className={cx(classes, "opacity-40 cursor-not-allowed")} aria-disabled="true">
          {children}
        </span>
      );
    }
    return (
      <a href={href} className={classes} onClick={onClick}>
        {children}
      </a>
    );
  }
  return (
    <button type={type || "button"} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}

function Badge({ children, tone = "default", className }) {
  const tones = {
    default: "bg-surface2 text-dim border-line2",
    accent: "bg-accent/10 text-accent2 border-accent/30",
    ok: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
    warn: "bg-amber-500/10 text-amber-300 border-amber-500/30",
    danger: "bg-red-500/10 text-red-300 border-red-500/30",
    gold: "bg-gold/10 text-gold border-gold/30",
  };
  return (
    <span className={cx("inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em]", tones[tone], className)}>
      {children}
    </span>
  );
}

function Price({ value, rrp, size = "md", className }) {
  const sizes = { sm: "text-base", md: "text-xl", lg: "text-3xl" };
  return (
    <span className={cx("inline-flex items-baseline gap-2 tnum", className)}>
      <span className={cx("font-display font-bold text-ink", sizes[size])}>{formatMoney(value)}</span>
      {rrp && rrp > value && <span className="text-xs text-faint line-through">{formatMoney(rrp)}</span>}
    </span>
  );
}

/* ---- product illustration (procedural SVG, stands in for photography) - */
function VialGraphic({ accent = "#2F8FFF", label = "", height = 220, className }) {
  const gid = React.useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 160 220" width="100%" height={height} className={className} role="img" aria-label={`Illustration of a ${label} research vial`}>
      <defs>
        <radialGradient id={`glow-${gid}`} cx="50%" cy="38%" r="60%">
          <stop offset="0%" stopColor={accent} stopOpacity="0.5" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`glass-${gid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#EAF2FF" stopOpacity="0.16" />
          <stop offset="45%" stopColor="#EAF2FF" stopOpacity="0.04" />
          <stop offset="100%" stopColor="#EAF2FF" stopOpacity="0.1" />
        </linearGradient>
        <linearGradient id={`cap-${gid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#BFD7FF" />
          <stop offset="45%" stopColor={accent} />
          <stop offset="100%" stopColor="#0A3D91" />
        </linearGradient>
      </defs>
      <ellipse cx="80" cy="110" rx="70" ry="70" fill={`url(#glow-${gid})`} />
      {/* vial body */}
      <rect x="46" y="62" width="68" height="128" rx="14" fill={`url(#glass-${gid})`} stroke="rgba(234,242,255,0.35)" strokeWidth="1.2" />
      {/* liquid fill line */}
      <rect x="49" y="120" width="62" height="67" rx="10" fill={accent} opacity="0.14" />
      {/* label band */}
      <rect x="50" y="132" width="60" height="34" rx="4" fill="#050B18" opacity="0.55" />
      <text x="80" y="153" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="11" fill="#EAF2FF" letterSpacing="1">
        {label}
      </text>
      {/* neck */}
      <rect x="66" y="42" width="28" height="24" rx="3" fill="rgba(234,242,255,0.18)" stroke="rgba(234,242,255,0.3)" strokeWidth="1" />
      {/* cap */}
      <rect x="58" y="18" width="44" height="28" rx="6" fill={`url(#cap-${gid})`} />
      <rect x="58" y="18" width="44" height="7" rx="3" fill="#EAF2FF" opacity="0.35" />
      {/* highlight */}
      <rect x="53" y="70" width="8" height="110" rx="4" fill="#EAF2FF" opacity="0.18" />
    </svg>
  );
}

function VialGroupGraphic({ accent = "#2F8FFF", className, height = 220 }) {
  return (
    <div className={cx("relative flex items-end justify-center gap-3", className)} style={{ height }}>
      <div className="w-1/4 opacity-70"><VialGraphic accent={accent} label="" height={height * 0.72} /></div>
      <div className="w-1/3"><VialGraphic accent={accent} label="" height={height} /></div>
      <div className="w-1/4 opacity-70"><VialGraphic accent={accent} label="" height={height * 0.8} /></div>
    </div>
  );
}

function MoleculeGraphic({ accent = "#6DD1FF", className, height = 220 }) {
  const nodes = [
    [80, 40], [130, 70], [130, 130], [80, 160], [30, 130], [30, 70],
  ];
  return (
    <svg viewBox="0 0 160 200" width="100%" height={height} className={className} aria-hidden="true">
      {nodes.map((n, i) => {
        const next = nodes[(i + 1) % nodes.length];
        return <line key={i} x1={n[0]} y1={n[1]} x2={next[0]} y2={next[1]} stroke={accent} strokeOpacity="0.55" strokeWidth="1.6" />;
      })}
      <line x1="80" y1="40" x2="80" y2="160" stroke={accent} strokeOpacity="0.25" strokeWidth="1.2" />
      <line x1="30" y1="70" x2="130" y2="130" stroke={accent} strokeOpacity="0.25" strokeWidth="1.2" />
      <line x1="30" y1="130" x2="130" y2="70" stroke={accent} strokeOpacity="0.25" strokeWidth="1.2" />
      {nodes.map((n, i) => (
        <circle key={i} cx={n[0]} cy={n[1]} r={i % 2 === 0 ? 7 : 5} fill="#070C18" stroke={accent} strokeWidth="2" />
      ))}
      <circle cx="80" cy="100" r="9" fill={accent} opacity="0.85" />
    </svg>
  );
}

function AtomGraphic({ accent = "#6DD1FF", className, height = 220 }) {
  return (
    <svg viewBox="0 0 160 200" width="100%" height={height} className={className} aria-hidden="true">
      <g transform="translate(80 100)">
        <ellipse rx="70" ry="26" fill="none" stroke={accent} strokeOpacity="0.5" strokeWidth="1.4" />
        <ellipse rx="70" ry="26" fill="none" stroke={accent} strokeOpacity="0.5" strokeWidth="1.4" transform="rotate(60)" />
        <ellipse rx="70" ry="26" fill="none" stroke={accent} strokeOpacity="0.5" strokeWidth="1.4" transform="rotate(120)" />
        <circle r="10" fill={accent} />
        <circle cx="70" cy="0" r="4" fill="#EAF2FF" />
        <circle cx="-35" cy="22" r="4" fill="#EAF2FF" transform="rotate(60)" />
        <circle cx="35" cy="-22" r="4" fill="#EAF2FF" transform="rotate(120)" />
      </g>
    </svg>
  );
}

function AnatomyGraphic({ accent = "#6DD1FF", className, height = 220 }) {
  return (
    <svg viewBox="0 0 160 220" width="100%" height={height} className={className} aria-hidden="true">
      <g stroke={accent} strokeOpacity="0.6" strokeWidth="1.6" fill="none">
        <circle cx="80" cy="30" r="14" />
        <path d="M80 44v70M56 68h48M56 68l-10 46M104 68l10 46M64 114l-8 60M96 114l8 60" />
      </g>
      <circle cx="80" cy="90" r="7" fill={accent} className="animate-pulse-glow" />
      <circle cx="80" cy="90" r="16" fill="none" stroke={accent} strokeOpacity="0.35" strokeWidth="1" />
    </svg>
  );
}

function ProductVisual({ image, height, className }) {
  if (!image) return <VialGraphic height={height} className={className} />;
  if (image.url) {
    return (
      <img
        src={image.url}
        alt={image.alt || ""}
        style={{ height, maxHeight: height }}
        className={cx("mx-auto max-w-full object-contain", className)}
      />
    );
  }
  switch (image.type) {
    case "vialGroup":
      return <VialGroupGraphic accent={image.accent} height={height} className={className} />;
    case "molecule":
      return <MoleculeGraphic accent={image.accent} height={height} className={className} />;
    case "atom":
      return <AtomGraphic accent={image.accent} height={height} className={className} />;
    case "anatomy":
      return <AnatomyGraphic accent={image.accent} height={height} className={className} />;
    default:
      return <VialGraphic accent={image.accent} label={image.label} height={height} className={className} />;
  }
}

/* ---- product card -------------------------------------------------------*/
function ProductCard({ product, className }) {
  const range = priceRange(product);
  const avail = availability(product);
  const purchasable = productPurchasable(product);
  const [busy, setBusy] = React.useState(false);

  function quickAdd(e) {
    e.preventDefault();
    e.stopPropagation();
    const variant = product.variants.find((v) => v.availableForSale) || product.variants[0];
    if (!variant || !variant.availableForSale) return;
    setBusy(true);
    CartStore.addLine(variant.id, 1)
      .then(() => {
        pushToast(`${product.name} ${variant.label} added to basket`, { tone: "ok" });
      })
      .catch((err) => {
        pushToast(err.message || "Couldn't add that to your basket", { tone: "default" });
      })
      .finally(() => setTimeout(() => setBusy(false), 500));
  }

  return (
    <a
      href={`#/product/${product.slug}`}
      className={cx(
        "group relative flex flex-col overflow-hidden rounded-2xl panel transition-all duration-300 hover:-translate-y-1 hover:shadow-glowLg hover:border-accent/40",
        className
      )}
    >
      <div className="relative flex items-center justify-center bg-labgrid bg-surface/60 px-6 pt-6">
        {product.tag && (
          <Badge tone="accent" className="absolute left-4 top-4 z-10">{product.tag}</Badge>
        )}
        {purchasable && (
          <button
            onClick={quickAdd}
            aria-label={`Quick add ${product.name} to basket`}
            className={cx(
              "absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-line2 bg-surface/90 text-ink opacity-0 transition-all group-hover:opacity-100 hover:border-accent2 hover:text-accent2",
              busy && "opacity-100 border-emerald-400 text-emerald-300"
            )}
          >
            <Icon name={busy ? "check" : "plus"} className="h-4 w-4" />
          </button>
        )}
        <ProductVisual image={product.images[0]} height={180} />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-faint">{product.subcategory}</p>
        <h3 className="font-display text-lg font-semibold text-ink">{product.name}</h3>
        <p className="clamp-2 text-[13px] leading-relaxed text-dim">{product.shortDescription}</p>
        <div className="mt-auto flex items-center justify-between pt-3">
          <div>
            <span className="text-[11px] text-faint">{range.single ? "" : "From "}</span>
            <Price value={range.min} size="sm" />
            <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.06em] text-faint">Sold in units of 10</p>
          </div>
          <Badge tone={avail.tone === "ok" ? "ok" : avail.tone === "warn" ? "warn" : "danger"}>{avail.label}</Badge>
        </div>
      </div>
    </a>
  );
}

/* ---- quantity stepper ---------------------------------------------------*/
function QuantityStepper({ value, onChange, min = 1, max = 999, size = "md" }) {
  const h = size === "sm" ? "h-9" : "h-11";
  return (
    <div className={cx("inline-flex items-center rounded-full border border-line2 bg-surface2", h)}>
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={() => onChange(Math.max(min, value - 1))}
        className="flex h-full w-9 items-center justify-center text-dim hover:text-accent2 disabled:opacity-30"
        disabled={value <= min}
      >
        <Icon name="minus" className="h-3.5 w-3.5" />
      </button>
      <input
        aria-label="Quantity"
        type="number"
        value={value}
        min={min}
        max={max}
        onChange={(e) => {
          const v = parseInt(e.target.value, 10);
          onChange(Number.isFinite(v) ? Math.min(max, Math.max(min, v)) : min);
        }}
        className="w-10 bg-transparent text-center font-mono text-sm text-ink outline-none"
      />
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={() => onChange(Math.min(max, value + 1))}
        className="flex h-full w-9 items-center justify-center text-dim hover:text-accent2 disabled:opacity-30"
        disabled={value >= max}
      >
        <Icon name="plus" className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

/* ---- trust strip ---------------------------------------------------------*/
function TrustStrip({ className }) {
  return (
    <div className={cx("grid grid-cols-2 gap-4 sm:grid-cols-4", className)}>
      {TRUST_POINTS.map((t) => (
        <div key={t.title} className="flex flex-col items-start gap-2 rounded-xl border border-line bg-surface/50 p-4">
          <Icon name={t.icon} className="h-5 w-5 text-accent2" />
          <p className="font-display text-sm font-semibold text-ink">{t.title}</p>
          <p className="text-[12px] leading-snug text-dim">{t.body}</p>
        </div>
      ))}
    </div>
  );
}

/* ---- breadcrumbs ----------------------------------------------------------*/
function Breadcrumbs({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-[12px] text-faint">
      {items.map((item, i) => (
        <React.Fragment key={i}>
          {i > 0 && <Icon name="chevronRight" className="h-3 w-3" />}
          {item.href ? (
            <a href={item.href} className="hover:text-accent2">{item.label}</a>
          ) : (
            <span className="text-dim">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}

/* ---- empty state -----------------------------------------------------------*/
function EmptyState({ icon = "cart", title, body, action }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-line2 px-6 py-16 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-surface2 text-accent2">
        <Icon name={icon} className="h-6 w-6" />
      </div>
      <h3 className="font-display text-lg font-semibold text-ink">{title}</h3>
      {body && <p className="mt-2 max-w-sm text-sm text-dim">{body}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

/* ---- navbar ---------------------------------------------------------------*/
const NAV_LINKS = [
  { label: "Shop", href: "#/shop" },
  { label: "About", href: "#/about" },
  { label: "Delivery", href: "#/delivery" },
  { label: "Contact", href: "#/contact" },
];

function Navbar() {
  const { itemCount } = useCart();
  const ui = useUi();
  const [scrolled, setScrolled] = React.useState(false);
  const [query, setQuery] = React.useState("");

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function submitSearch(e) {
    e.preventDefault();
    navigate("/shop", query ? { q: query } : {});
    UiActions.closeSearch();
    UiActions.closeMenu();
  }

  return (
    <header
      className={cx(
        "sticky top-0 z-40 transition-all duration-300",
        scrolled ? "bg-bg/85 backdrop-blur-md border-b border-line" : "bg-transparent border-b border-transparent"
      )}
    >
      <a href="#main" className="skip-link rounded-md bg-accent px-4 py-2 text-sm font-semibold text-white">Skip to content</a>
      <Container className="flex h-16 items-center justify-between gap-4 sm:h-20">
        <a href="#/" className="flex items-center gap-2.5 shrink-0" onClick={UiActions.closeMenu}>
          <img src="peptalys-logo.png" alt="Peptalys" className="h-8 w-auto sm:h-9" />
          <span className="font-display text-lg sm:text-xl font-bold tracking-tight text-ink">Peptalys</span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} className="font-body text-[14px] font-medium text-dim transition-colors hover:text-ink">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <form onSubmit={submitSearch} className="relative hidden md:block">
            <Icon name="search" className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search peptides…"
              aria-label="Search products"
              className="w-48 rounded-full border border-line2 bg-surface2 py-2.5 pl-10 pr-4 text-[13px] text-ink placeholder:text-faint outline-none transition-all focus:w-64 focus:border-accent2"
            />
          </form>
          <button
            aria-label="Search"
            onClick={UiActions.openSearch}
            className="flex h-10 w-10 items-center justify-center rounded-full text-dim hover:bg-surface2 hover:text-ink md:hidden"
          >
            <Icon name="search" className="h-5 w-5" />
          </button>
          <a
            href="#/admin"
            className="hidden h-10 items-center rounded-full px-3 text-dim hover:bg-surface2 hover:text-ink lg:flex"
            aria-label="Admin"
            title="Admin"
          >
            <Icon name="user" className="h-5 w-5" />
          </a>
          <button
            onClick={UiActions.openCart}
            aria-label={`Open basket, ${itemCount} item${itemCount === 1 ? "" : "s"}`}
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-ink hover:bg-surface2"
          >
            <Icon name="cart" className="h-5 w-5" />
            {itemCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-accent px-1 font-mono text-[10px] font-bold text-white">
                {itemCount}
              </span>
            )}
          </button>
          <button
            onClick={UiActions.toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={ui.menuOpen}
            className="flex h-10 w-10 items-center justify-center rounded-full text-ink hover:bg-surface2 lg:hidden"
          >
            <Icon name={ui.menuOpen ? "close" : "menu"} className="h-5 w-5" />
          </button>
        </div>
      </Container>

      {ui.menuOpen && (
        <div className="border-t border-line bg-bg/98 backdrop-blur-md lg:hidden">
          <Container className="flex flex-col gap-1 py-4">
            <form onSubmit={submitSearch} className="relative mb-2">
              <Icon name="search" className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search peptides…"
                aria-label="Search products"
                className="w-full rounded-full border border-line2 bg-surface2 py-2.5 pl-10 pr-4 text-[13px] text-ink placeholder:text-faint outline-none"
              />
            </form>
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} onClick={UiActions.closeMenu} className="rounded-lg px-3 py-3 text-[15px] font-medium text-ink hover:bg-surface2">
                {l.label}
              </a>
            ))}
            <a href="#/returns" onClick={UiActions.closeMenu} className="rounded-lg px-3 py-3 text-[15px] font-medium text-dim hover:bg-surface2">Returns</a>
            <a href="#/legal" onClick={UiActions.closeMenu} className="rounded-lg px-3 py-3 text-[15px] font-medium text-dim hover:bg-surface2">Research Use Policy</a>
            <a href="#/admin" onClick={UiActions.closeMenu} className="rounded-lg px-3 py-3 text-[15px] font-medium text-dim hover:bg-surface2">Admin</a>
          </Container>
        </div>
      )}
    </header>
  );
}

/* ---- cart drawer ------------------------------------------------------------*/
function CartDrawer() {
  const ui = useUi();
  const cart = useCart();
  const open = ui.cartOpen;

  React.useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") UiActions.closeCart();
    }
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className={cx("fixed inset-0 z-50", open ? "pointer-events-auto" : "pointer-events-none")} aria-hidden={!open}>
      <div
        onClick={UiActions.closeCart}
        className={cx("absolute inset-0 bg-[#020408]/70 backdrop-blur-sm transition-opacity duration-300", open ? "opacity-100" : "opacity-0")}
      />
      <aside
        role="dialog"
        aria-label="Shopping basket"
        className={cx(
          "absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-surface shadow-glowLg transition-transform duration-300 ease-out",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <h2 className="font-display text-lg font-semibold text-ink">Your Basket ({cart.itemCount})</h2>
          <button onClick={UiActions.closeCart} aria-label="Close basket" className="flex h-9 w-9 items-center justify-center rounded-full text-dim hover:bg-surface2 hover:text-ink">
            <Icon name="close" className="h-5 w-5" />
          </button>
        </div>

        {cart.status === "loading" && cart.lines.length === 0 ? (
          <div className="flex flex-1 items-center justify-center p-6">
            <div className="flex flex-col items-center gap-3 text-dim">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-line2 border-t-accent2" />
              <p className="text-[13px]">Loading your basket…</p>
            </div>
          </div>
        ) : cart.status === "error" && cart.lines.length === 0 ? (
          <div className="flex flex-1 items-center p-6">
            <EmptyState icon="alertTriangle" title="Couldn't load your basket" body={cart.error || "Please try again."} action={<Button variant="secondary" onClick={() => CartStore.init()}>Retry</Button>} />
          </div>
        ) : cart.lines.length === 0 ? (
          <div className="flex flex-1 items-center p-6">
            <EmptyState
              icon="cart"
              title="Your basket is empty"
              body="Browse the catalogue to add research peptides to your wholesale order."
              action={<Button as="a" href="#/shop" onClick={UiActions.closeCart}>Browse the shop</Button>}
            />
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4">
              <div className="mb-4 rounded-xl border border-line bg-surface2/60 p-3.5">
                <div className="flex items-center justify-between text-[12px] text-dim">
                  <span>Wholesale minimum</span>
                  <span className="font-mono tnum text-ink">{formatMoney(cart.subtotal)} / {formatMoney(SETTINGS.minimumOrderValue)}</span>
                </div>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-surface3">
                  <div
                    className={cx("h-full rounded-full transition-all duration-500", cart.meetsMinimum ? "bg-emerald-400" : "bg-gradient-to-r from-accent to-accent2")}
                    style={{ width: `${Math.min(100, (cart.subtotal / SETTINGS.minimumOrderValue) * 100)}%` }}
                  />
                </div>
                {!cart.meetsMinimum && (
                  <p className="mt-2 text-[12px] text-dim">Add {formatMoney(cart.remainingToMinimum)} more to reach the wholesale minimum order.</p>
                )}
              </div>

              {cart.hasUnavailable && (
                <div className="mb-4 flex items-start gap-2.5 rounded-xl border border-amber-500/25 bg-amber-500/5 p-3.5">
                  <Icon name="alertTriangle" className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" />
                  <p className="text-[12px] leading-snug text-amber-200/90">One or more items in your basket are no longer available and must be removed before checkout.</p>
                </div>
              )}

              <ul className="flex flex-col gap-4">
                {cart.lines.map((line) => (
                  <li key={line.id} className={cx("flex gap-3", !line.availableForSale && "opacity-60")}>
                    <a href={`#/product/${line.slug}`} onClick={UiActions.closeCart} className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-line bg-surface2">
                      <ProductVisual image={line.image} height={64} />
                    </a>
                    <div className="flex flex-1 flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <a href={`#/product/${line.slug}`} onClick={UiActions.closeCart} className="font-body text-[13.5px] font-semibold text-ink hover:text-accent2">{line.name}</a>
                          <p className="font-mono text-[11px] text-faint">{line.variantLabel}</p>
                          {!line.availableForSale && <Badge tone="danger" className="mt-1">Unavailable</Badge>}
                        </div>
                        <button onClick={() => CartStore.removeLine(line.id)} aria-label={`Remove ${line.name}`} className="text-faint hover:text-red-300">
                          <Icon name="trash" className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <QuantityStepper size="sm" value={line.qty} onChange={(q) => CartStore.updateLine(line.id, q)} max={line.quantityAvailable || 999} />
                        <Price value={line.lineTotal} size="sm" />
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-line px-5 py-4">
              <div className="flex flex-col gap-1.5 text-[13px] text-dim">
                <div className="flex justify-between"><span>Subtotal</span><span className="tnum text-ink">{formatMoney(cart.subtotal)}</span></div>
                {cart.estimatedTax != null && (
                  <div className="flex justify-between"><span>Estimated tax</span><span className="tnum text-ink">{formatMoney(cart.estimatedTax)}</span></div>
                )}
                <div className="flex justify-between"><span>Delivery</span><span className="text-faint">Calculated at checkout</span></div>
              </div>
              <div className="mt-3 flex justify-between border-t border-line pt-3">
                <span className="font-display font-semibold text-ink">Total</span>
                <span className="font-display text-lg font-bold tnum text-ink">{formatMoney(cart.total)}</span>
              </div>
              <Button as="a" href="#/checkout" onClick={UiActions.closeCart} full size="lg" className="mt-4" disabled={!cart.meetsMinimum || cart.hasUnavailable}>
                Checkout <Icon name="arrowRight" className="h-4 w-4" />
              </Button>
              <Button as="a" href="#/cart" onClick={UiActions.closeCart} full variant="ghost" size="sm" className="mt-1.5">
                View full basket
              </Button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}

/* ---- toast host --------------------------------------------------------------*/
function ToastHost() {
  const toasts = useToasts();
  return (
    <div id="toast-root" className="fixed inset-x-0 bottom-0 z-[60] flex flex-col items-center gap-2 p-4 sm:items-end sm:right-4 sm:left-auto">
      {toasts.map((t) => (
        <div
          key={t.id}
          role="status"
          className={cx(
            "animate-fade-up flex items-center gap-2 rounded-full border px-4 py-2.5 text-[13px] font-medium shadow-glow backdrop-blur-md",
            t.tone === "ok" ? "border-emerald-500/40 bg-emerald-950/80 text-emerald-200" : "border-line2 bg-surface/90 text-ink"
          )}
        >
          {t.tone === "ok" && <Icon name="check" className="h-4 w-4" />}
          {t.message}
        </div>
      ))}
    </div>
  );
}

/* ---- footer shop-category links (live from Shopify collections) -------------*/
function FooterCategoryLinks() {
  const collections = useCollections();
  if (collections.status !== "ready" || collections.data.length === 0) return null;
  return collections.data.map((c) => (
    <li key={c.id}><a href={`#/shop?category=${c.slug}`} className="hover:text-accent2">{c.shortName}</a></li>
  ));
}

/* ---- footer -------------------------------------------------------------------*/
function Footer() {
  const [email, setEmail] = React.useState("");
  function submitEnquiry(e) {
    e.preventDefault();
    pushToast("Thanks — our wholesale team will be in touch shortly.", { tone: "ok" });
    setEmail("");
  }
  return (
    <footer className="mt-24 border-t border-line bg-surface/40">
      <Container className="py-14">
        <TrustStrip />
        <div className="mt-14 grid grid-cols-2 gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="col-span-2">
            <a href="#/" className="flex items-center gap-2.5">
              <img src="peptalys-logo.png" alt="Peptalys" className="h-8 w-auto" />
              <span className="font-display text-lg font-bold text-ink">Peptalys</span>
            </a>
            <p className="mt-3 max-w-xs text-[13px] leading-relaxed text-dim">
              {BRAND.strapline} Wholesale-only supply of UK-manufactured research peptides for laboratories and research institutions.
            </p>
            <form onSubmit={submitEnquiry} className="mt-5 flex max-w-sm gap-2">
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Institutional email"
                aria-label="Email address for wholesale price list"
                className="w-full rounded-full border border-line2 bg-surface2 px-4 py-2.5 text-[13px] text-ink placeholder:text-faint outline-none focus:border-accent2"
              />
              <Button type="submit" size="sm" className="shrink-0">Get price list</Button>
            </form>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold text-ink">Shop</h4>
            <ul className="mt-4 flex flex-col gap-2.5 text-[13px] text-dim">
              <li><a href="#/shop" className="hover:text-accent2">All peptides</a></li>
              <FooterCategoryLinks />
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold text-ink">Company</h4>
            <ul className="mt-4 flex flex-col gap-2.5 text-[13px] text-dim">
              <li><a href="#/about" className="hover:text-accent2">About Peptalys</a></li>
              <li><a href="#/contact" className="hover:text-accent2">Contact</a></li>
              <li><a href="#/delivery" className="hover:text-accent2">Delivery information</a></li>
              <li><a href="#/returns" className="hover:text-accent2">Returns policy</a></li>
              <li><a href="#/admin" className="hover:text-accent2">Admin</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold text-ink">Legal</h4>
            <ul className="mt-4 flex flex-col gap-2.5 text-[13px] text-dim">
              <li><a href="#/legal" className="hover:text-accent2">Research use policy</a></li>
              <li><a href="#/legal" className="hover:text-accent2">Terms of wholesale supply</a></li>
              <li><a href="#/legal" className="hover:text-accent2">Privacy policy</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[11px] text-faint">© {new Date().getFullYear()} {BRAND.legalName}. Company No. {BRAND.companyNumber}. Registered in England &amp; Wales.</p>
          <p className="max-w-xl text-[11px] leading-relaxed text-faint">
            All products are sold strictly for laboratory and in-vitro research use only. Not for human or veterinary use, diagnostic use, or consumption. By purchasing you confirm you are a qualified researcher or institution procuring on behalf of one.
          </p>
        </div>
      </Container>
    </footer>
  );
}
