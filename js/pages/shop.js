const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name-asc", label: "Name: A–Z" },
];

function useShopFilters(route) {
  const [state, setState] = React.useState({
    q: route.query.q || "",
    categories: route.query.category ? [route.query.category] : [],
    sort: route.query.sort || "featured",
    inStockOnly: route.query.inStock === "1",
    maxPrice: route.query.maxPrice ? Number(route.query.maxPrice) : null, // null = no cap yet (bounds not known until products load)
  });

  // Re-sync when the URL changes externally (nav from a category card / footer link)
  React.useEffect(() => {
    setState((s) => ({
      ...s,
      q: route.query.q || "",
      categories: route.query.category ? [route.query.category] : s.categories,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route.query.q, route.query.category]);

  return [state, setState];
}

function ShopPage({ initialCategory }) {
  const route = useRoute();
  const [filters, setFilters] = useShopFilters(route);
  const [mobileFiltersOpen, setMobileFiltersOpen] = React.useState(false);
  const products = useProducts({});
  const collections = useCollections();

  const activeCategorySlug = initialCategory || filters.categories[0] || null;
  const activeCategory = collections.status === "ready" ? collections.data.find((c) => c.slug === activeCategorySlug) || null : null;

  React.useEffect(() => {
    document.title = activeCategory ? `${activeCategory.name} — Peptalys` : (PAGE_TITLES["/shop"] || "Shop — Peptalys");
    setMetaTag("description", (activeCategory && activeCategory.description) || PAGE_DESCRIPTIONS["/shop"]);
  }, [activeCategory]);

  const priceCeiling = products.status === "ready" && products.data.length
    ? Math.max(1, Math.ceil(Math.max(...products.data.map((p) => priceRange(p).max))))
    : null;
  const effectiveMaxPrice = filters.maxPrice != null ? filters.maxPrice : priceCeiling;

  const results = React.useMemo(() => {
    if (products.status !== "ready") return [];
    let list = products.data.slice();

    if (activeCategorySlug) {
      list = list.filter((p) => (p.categories || []).some((c) => c.slug === activeCategorySlug));
    }
    if (filters.q.trim()) {
      const q = filters.q.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q) ||
          (p.subcategory || "").toLowerCase().includes(q)
      );
    }
    if (filters.inStockOnly) {
      list = list.filter((p) => productPurchasable(p));
    }
    if (effectiveMaxPrice != null) {
      list = list.filter((p) => priceRange(p).min <= effectiveMaxPrice);
    }

    switch (filters.sort) {
      case "price-asc":
        list.sort((a, b) => priceRange(a).min - priceRange(b).min);
        break;
      case "price-desc":
        list.sort((a, b) => priceRange(b).min - priceRange(a).min);
        break;
      case "name-asc":
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }
    return list;
  }, [products.status, products.data, activeCategorySlug, filters, effectiveMaxPrice]);

  function toggleCategory(slug) {
    const next = filters.categories[0] === slug ? [] : [slug];
    setFilters((f) => ({ ...f, categories: next }));
    navigate("/shop", next.length ? { category: slug } : {}, { scrollTop: false });
  }

  function clearAll() {
    setFilters({ q: "", categories: [], sort: "featured", inStockOnly: false, maxPrice: null });
    navigate("/shop", {}, { scrollTop: false });
  }

  const hasActiveFilters = filters.q || filters.categories.length || filters.inStockOnly || (filters.maxPrice != null && filters.maxPrice < priceCeiling);

  const FilterPanel = (
    <div className="flex flex-col gap-8">
      <div>
        <h3 className="font-display text-sm font-semibold text-ink">Category</h3>
        {collections.status === "loading" && <p className="mt-3 text-[12.5px] text-faint">Loading…</p>}
        {collections.status === "ready" && (
          <ul className="mt-3 flex flex-col gap-1">
            <li>
              <button
                onClick={() => { setFilters((f) => ({ ...f, categories: [] })); navigate("/shop", {}, { scrollTop: false }); }}
                className={cx("w-full rounded-lg px-2.5 py-2 text-left text-[13.5px] transition-colors", !activeCategorySlug ? "bg-accent/15 text-accent2 font-medium" : "text-dim hover:bg-surface2 hover:text-ink")}
              >
                All peptides {products.status === "ready" && <span className="font-mono text-[11px] text-faint">({products.data.length})</span>}
              </button>
            </li>
            {collections.data.map((c) => {
              const count = products.status === "ready" ? products.data.filter((p) => (p.categories || []).some((pc) => pc.slug === c.slug)).length : null;
              const active = activeCategorySlug === c.slug;
              return (
                <li key={c.id}>
                  <button
                    onClick={() => toggleCategory(c.slug)}
                    className={cx("w-full rounded-lg px-2.5 py-2 text-left text-[13.5px] transition-colors", active ? "bg-accent/15 text-accent2 font-medium" : "text-dim hover:bg-surface2 hover:text-ink")}
                  >
                    {c.shortName} {count != null && <span className="font-mono text-[11px] text-faint">({count})</span>}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {priceCeiling != null && (
        <div>
          <h3 className="font-display text-sm font-semibold text-ink">Max unit price</h3>
          <input
            type="range"
            min="0"
            max={priceCeiling}
            step="1"
            value={effectiveMaxPrice}
            onChange={(e) => setFilters((f) => ({ ...f, maxPrice: Number(e.target.value) }))}
            className="mt-4 w-full accent-accent"
            aria-label="Maximum unit price"
          />
          <div className="mt-1 flex justify-between font-mono text-[11px] text-faint">
            <span>£0</span>
            <span className="text-ink">Up to {formatMoney(effectiveMaxPrice)}</span>
          </div>
        </div>
      )}

      <label className="flex items-center gap-2.5 text-[13.5px] text-dim">
        <input
          type="checkbox"
          checked={filters.inStockOnly}
          onChange={(e) => setFilters((f) => ({ ...f, inStockOnly: e.target.checked }))}
          className="h-4 w-4 rounded border-line2 bg-surface2 accent-accent"
        />
        In stock only
      </label>

      {hasActiveFilters && (
        <Button variant="ghost" size="sm" onClick={clearAll} className="self-start !px-0">
          <Icon name="close" className="h-3.5 w-3.5" /> Clear all filters
        </Button>
      )}
    </div>
  );

  return (
    <Container className="py-10 sm:py-14">
      <Breadcrumbs items={[{ label: "Home", href: "#/" }, ...(activeCategory ? [{ label: "Shop", href: "#/shop" }, { label: activeCategory.shortName }] : [{ label: "Shop" }])]} />

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-ink sm:text-4xl">{activeCategory ? activeCategory.name : "All Research Peptides"}</h1>
          {activeCategory && activeCategory.description && <p className="mt-2 max-w-xl text-[14px] text-dim">{activeCategory.description}</p>}
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[240px_1fr]">
        <aside className="hidden lg:block">{FilterPanel}</aside>

        <div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1 sm:max-w-xs">
              <Icon name="search" className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />
              <input
                value={filters.q}
                onChange={(e) => setFilters((f) => ({ ...f, q: e.target.value }))}
                placeholder="Search this catalogue…"
                aria-label="Search catalogue"
                className="w-full rounded-full border border-line2 bg-surface2 py-2.5 pl-10 pr-4 text-[13px] text-ink placeholder:text-faint outline-none focus:border-accent2"
              />
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setMobileFiltersOpen(true)} className="flex items-center gap-1.5 rounded-full border border-line2 px-4 py-2.5 text-[13px] text-ink lg:hidden">
                <Icon name="filter" className="h-4 w-4" /> Filters
              </button>
              <div className="relative">
                <select
                  value={filters.sort}
                  onChange={(e) => setFilters((f) => ({ ...f, sort: e.target.value }))}
                  aria-label="Sort products"
                  className="appearance-none rounded-full border border-line2 bg-surface2 py-2.5 pl-4 pr-9 text-[13px] text-ink outline-none focus:border-accent2"
                >
                  {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
                <Icon name="chevronDown" className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-faint" />
              </div>
            </div>
          </div>

          {products.status === "loading" && (
            <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {[...Array(6)].map((_, i) => <div key={i} className="h-80 animate-pulse rounded-2xl bg-surface2/60" />)}
            </div>
          )}

          {products.status === "error" && (
            <div className="mt-5">
              <EmptyState icon="alertTriangle" title="Couldn't load the catalogue" body={products.error || "Please try again shortly."} action={<Button variant="secondary" onClick={() => window.location.reload()}>Reload</Button>} />
            </div>
          )}

          {products.status === "ready" && (
            <>
              <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.1em] text-faint">{results.length} result{results.length === 1 ? "" : "s"}</p>
              {results.length === 0 ? (
                <EmptyState icon="search" title="No peptides match those filters" body="Try widening your price range or clearing filters." action={<Button variant="secondary" onClick={clearAll}>Clear filters</Button>} />
              ) : (
                <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {results.map((p) => <ProductCard key={p.id} product={p} />)}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-[#020408]/70" onClick={() => setMobileFiltersOpen(false)} />
          <div className="absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto rounded-t-2xl bg-surface p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold text-ink">Filters</h2>
              <button onClick={() => setMobileFiltersOpen(false)} aria-label="Close filters"><Icon name="close" className="h-5 w-5 text-dim" /></button>
            </div>
            {FilterPanel}
            <Button full className="mt-6" onClick={() => setMobileFiltersOpen(false)}>Show {results.length} results</Button>
          </div>
        </div>
      )}
    </Container>
  );
}
