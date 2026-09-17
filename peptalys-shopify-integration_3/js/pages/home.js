function HomePage() {
  const products = useProducts({});
  const collections = useCollections();

  const featured = products.status === "ready" ? products.data.slice(0, 4) : [];
  const heroProduct = featured[0] || null;
  const spotlight = products.status === "ready" ? (products.data[4] || products.data[0] || null) : null;
  const compoundCount = products.status === "ready" ? products.data.length : null;

  return (
    <>
      {/* ============ ATTENTION — hero ============ */}
      <section className="relative overflow-hidden bg-labgrid">
        <div className="pointer-events-none absolute -left-10 top-0 hidden h-full w-32 md:block">
          <DnaStrand className="h-full w-full animate-drift" opacity={0.45} />
        </div>
        <div className="pointer-events-none absolute -right-6 top-10 hidden h-full w-28 lg:block">
          <DnaStrand className="h-full w-full animate-drift" opacity={0.3} />
        </div>
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[560px] bg-gradient-to-b from-accentDeep/20 via-transparent to-transparent" />

        <Container className="relative grid grid-cols-1 items-center gap-12 py-16 sm:py-20 lg:grid-cols-2 lg:py-28">
          <div className="animate-fade-up">
            <Badge tone="accent"><Icon name="flask" className="h-3 w-3" /> Research Peptides · UK Manufactured</Badge>
            <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.05] text-ink sm:text-5xl lg:text-6xl text-balance">
              Research peptides <span className="text-gradient">for a healthier tomorrow.</span>
            </h1>
            <p className="mt-6 max-w-lg text-[16px] leading-relaxed text-dim">
              Peptalys is a UK wholesale supplier of high-purity research peptides — synthesised, batch-tested and delivered within 3–5 working days to laboratories and research institutions nationwide.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button as="a" href="#/shop" size="lg">Shop the catalogue <Icon name="arrowRight" className="h-4 w-4" /></Button>
              <Button as="a" href="#/contact" variant="secondary" size="lg">Request price list</Button>
            </div>
            <dl className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-line pt-6">
              {[
                ["≥98%", "Purity, HPLC-verified"],
                ["3–5 days", "UK delivery window"],
                [compoundCount != null ? `${compoundCount}+` : "—", "Research compounds"],
              ].map(([n, l]) => (
                <div key={l}>
                  <dt className="font-display text-2xl font-bold text-ink tnum">{n}</dt>
                  <dd className="mt-1 text-[11px] leading-snug text-faint">{l}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative animate-fade-up" style={{ animationDelay: "120ms" }}>
            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-accent/20 via-transparent to-accent2/10 blur-2xl" />
            <div className="relative rounded-[2rem] panel p-8 sm:p-10">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent2">Featured Compound</p>
              {products.status === "loading" && (
                <div className="mt-4 flex h-[260px] items-center justify-center">
                  <div className="h-6 w-6 animate-spin rounded-full border-2 border-line2 border-t-accent2" />
                </div>
              )}
              {products.status === "error" && (
                <div className="mt-4 flex h-[260px] items-center justify-center text-center text-[13px] text-dim">Catalogue temporarily unavailable.</div>
              )}
              {heroProduct && (
                <>
                  <div className="mt-4"><ProductVisual image={heroProduct.images[0]} height={260} /></div>
                  <div className="mt-4 flex items-end justify-between gap-4">
                    <div>
                      <h3 className="font-display text-xl font-bold text-ink">{heroProduct.name}</h3>
                      <p className="text-[12px] text-dim">{heroProduct.subcategory}</p>
                    </div>
                    <Price value={priceRange(heroProduct).min} size="md" />
                  </div>
                  <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.08em] text-faint">Sold in units of 10 — 1 unit added to your basket = 10 of this item</p>
                </>
              )}
              {products.status === "ready" && !heroProduct && (
                <div className="mt-4 flex h-[260px] items-center justify-center text-center text-[13px] text-dim">No products published yet.</div>
              )}
            </div>
          </div>
        </Container>

        {/* brand-world marquee */}
        <div className="relative border-y border-line bg-surface/40 py-4">
          <div className="flex overflow-hidden">
            <div className="flex shrink-0 animate-marquee items-center gap-16 pr-16">
              {[...Array(2)].flatMap(() =>
                TRUST_POINTS.map((t) => (
                  <span key={t.title + Math.random()} className="flex shrink-0 items-center gap-2.5 font-mono text-[12px] uppercase tracking-[0.14em] text-faint">
                    <Icon name={t.icon} className="h-4 w-4 text-accent2" /> {t.title}
                  </span>
                ))
              )}
            </div>
            <div className="flex shrink-0 animate-marquee items-center gap-16 pr-16" aria-hidden="true">
              {[...Array(2)].flatMap(() =>
                TRUST_POINTS.map((t) => (
                  <span key={"dup-" + t.title + Math.random()} className="flex shrink-0 items-center gap-2.5 font-mono text-[12px] uppercase tracking-[0.14em] text-faint">
                    <Icon name={t.icon} className="h-4 w-4 text-accent2" /> {t.title}
                  </span>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ============ STORY ============ */}
      <section className="py-20 sm:py-28">
        <Container className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <Eyebrow>Quality · Supply · Progress</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-bold text-ink sm:text-4xl text-balance">
              Built by researchers, for research programmes.
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-dim">
              Peptalys exists to close the gap between promising peptide science and the labs trying to study it — supplying independently purity-tested compounds at wholesale volumes, without the friction that slows research procurement down.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-dim">
              Every batch is synthesised in the UK, verified by HPLC to a minimum 98% purity, and shipped in secure, tamper-evident packaging — arriving within 3–5 working days, so what leaves our facility is exactly what your protocol expects.
            </p>
            <Button as="a" href="#/about" variant="outline" className="mt-7">Our story <Icon name="arrowRight" className="h-4 w-4" /></Button>
          </div>
          <div className="order-1 lg:order-2">
            <div className="relative rounded-[2rem] panel p-8">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: "microscope", label: "In-house synthesis" },
                  { icon: "shieldCheck", label: "Batch QC & HPLC" },
                  { icon: "package", label: "Tamper-evident packaging" },
                  { icon: "truck", label: "3–5 working day delivery" },
                ].map((s) => (
                  <div key={s.label} className="flex flex-col gap-3 rounded-xl border border-line bg-surface2/50 p-5">
                    <Icon name={s.icon} className="h-6 w-6 text-accent2" />
                    <p className="font-body text-[13px] font-medium text-ink">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ============ DISCOVERY — categories ============ */}
      <section className="py-4 sm:py-8">
        <Container>
          <SectionHeading eyebrow="Discover" title="Shop by research focus" body="Every listing includes full specification and research literature summaries, sourced live from our catalogue." />
          {collections.status === "loading" && (
            <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
              {[...Array(5)].map((_, i) => <div key={i} className="h-40 animate-pulse rounded-2xl bg-surface2/60" />)}
            </div>
          )}
          {collections.status === "ready" && collections.data.length > 0 && (
            <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
              {collections.data.map((c) => (
                <a key={c.id} href={`#/shop?category=${c.slug}`} className="group flex flex-col justify-between gap-6 rounded-2xl panel p-6 transition-all hover:-translate-y-1 hover:border-accent/40 hover:shadow-glow">
                  <Icon name={categoryIcon(c)} className="h-7 w-7 text-accent2" />
                  <div>
                    <h3 className="font-display text-[15px] font-semibold leading-snug text-ink">{c.shortName}</h3>
                    {c.description && <p className="mt-2 text-[12px] leading-relaxed text-dim clamp-3">{c.description}</p>}
                  </div>
                  <span className="flex items-center gap-1 font-mono text-[11px] uppercase tracking-[0.1em] text-accent2 opacity-0 transition-opacity group-hover:opacity-100">
                    Explore <Icon name="arrowRight" className="h-3 w-3" />
                  </span>
                </a>
              ))}
            </div>
          )}
          {collections.status === "ready" && collections.data.length === 0 && (
            <p className="mt-10 text-[13px] text-dim">No collections published yet.</p>
          )}
        </Container>
      </section>

      {/* ============ PRODUCT — featured grid ============ */}
      <section className="py-20 sm:py-28">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading eyebrow="Catalogue" title="Featured research compounds" />
            <Button as="a" href="#/shop" variant="ghost">View all peptides <Icon name="arrowRight" className="h-4 w-4" /></Button>
          </div>
          {products.status === "loading" && (
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[...Array(4)].map((_, i) => <div key={i} className="h-80 animate-pulse rounded-2xl bg-surface2/60" />)}
            </div>
          )}
          {products.status === "error" && (
            <div className="mt-10">
              <EmptyState icon="alertTriangle" title="Couldn't load the catalogue" body={products.error || "Please try again shortly."} />
            </div>
          )}
          {products.status === "ready" && featured.length > 0 && (
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {featured.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
          {products.status === "ready" && featured.length === 0 && (
            <div className="mt-10"><EmptyState icon="package" title="No products published yet" body="Add products in Shopify to see them here." /></div>
          )}
        </Container>
      </section>

      {/* ============ DESIRE — editorial spotlight ============ */}
      {spotlight && (
        <section className="py-4 sm:py-8">
          <Container>
            <div className="grid grid-cols-1 items-center gap-0 overflow-hidden rounded-[2rem] panel lg:grid-cols-2">
              <div className="relative flex items-center justify-center bg-labgrid p-12">
                <ProductVisual image={spotlight.images[0]} height={300} />
              </div>
              <div className="p-8 sm:p-12">
                <Eyebrow>Research Spotlight</Eyebrow>
                <h2 className="mt-3 font-display text-3xl font-bold text-ink text-balance">{spotlight.name}</h2>
                <p className="mt-4 text-[15px] leading-relaxed text-dim">{spotlight.shortDescription}</p>
                <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.08em] text-faint">Sold in units of 10 — 1 unit added to your basket = 10 of this item</p>
                <div className="mt-5 flex flex-wrap items-center gap-4">
                  <Price value={priceRange(spotlight).min} rrp={rrpFor(spotlight)} size="lg" />
                  <Button as="a" href={`#/product/${spotlight.slug}`}>View compound <Icon name="arrowRight" className="h-4 w-4" /></Button>
                </div>
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* ============ CONFIDENCE — how wholesale ordering works ============ */}
      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading align="center" eyebrow="How it works" title="Wholesale ordering, simplified" className="mx-auto" body="Peptalys supplies at wholesale volume only — built around a straightforward three-step process." />
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {[
              { n: "01", icon: "cart", title: "Build your order", body: "Browse the catalogue and add compounds to your basket. Every product is sold in units of 10 — 1 unit added to your basket is 10 of that item." },
              { n: "02", icon: "scale", title: "Meet the minimum", body: `A ${formatMoney(SETTINGS.minimumOrderValue)} minimum order value applies across the whole basket — mix and match compounds freely.` },
              { n: "03", icon: "truck", title: "Secure checkout", body: "Complete payment through our secure Shopify checkout, then delivery follows within 3–5 working days." },
            ].map((s) => (
              <div key={s.n} className="relative rounded-2xl border border-line bg-surface/40 p-7">
                <span className="font-mono text-4xl font-bold text-surface3">{s.n}</span>
                <Icon name={s.icon} className="mt-2 h-6 w-6 text-accent2" />
                <h3 className="mt-4 font-display text-lg font-semibold text-ink">{s.title}</h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-dim">{s.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ============ PURCHASE — closing CTA ============ */}
      <section className="pb-20 sm:pb-28">
        <Container>
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-accentDeep via-surface2 to-surface p-10 text-center sm:p-16">
            <div className="pointer-events-none absolute inset-0 bg-labgrid opacity-40" />
            <div className="relative">
              <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl text-balance">Ready to stock your research programme?</h2>
              <p className="mx-auto mt-4 max-w-lg text-[15px] text-dim">Create a basket, or speak to our wholesale team for a bespoke quotation on volume orders.</p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Button as="a" href="#/shop" size="lg">Shop the catalogue</Button>
                <Button as="a" href="#/contact" variant="secondary" size="lg">Talk to wholesale</Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
