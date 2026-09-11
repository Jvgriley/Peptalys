function ProductPage({ slug }) {
  const product = getProductBySlug(slug);
  const [activeImage, setActiveImage] = React.useState(0);
  const [variantIdx, setVariantIdx] = React.useState(0);
  const [qty, setQty] = React.useState(1);
  const [tab, setTab] = React.useState("description");

  React.useEffect(() => {
    setActiveImage(0);
    setVariantIdx(0);
    setQty(1);
    setTab("description");
  }, [slug]);

  if (!product) {
    return (
      <Container className="py-24">
        <EmptyState icon="search" title="Compound not found" body="This product may have been removed from the catalogue." action={<Button as="a" href="#/shop">Back to shop</Button>} />
      </Container>
    );
  }

  const category = CATEGORIES.find((c) => c.id === product.category);
  const variant = product.variants[variantIdx];
  const avail = variant.stock > 0 ? (variant.stock < 30 ? { label: `Low stock — ${variant.stock} left`, tone: "warn" } : { label: "In stock", tone: "ok" }) : { label: "Out of stock", tone: "danger" };
  const related = relatedProducts(product, 4);

  function addToBasket() {
    Cart.addItem(product.id, variant.sku, qty);
    pushToast(`${product.name} ${variant.label} × ${qty} added to basket`, { tone: "ok" });
  }

  return (
    <Container className="py-10 sm:py-14">
      <Breadcrumbs
        items={[
          { label: "Home", href: "#/" },
          { label: "Shop", href: "#/shop" },
          { label: category ? category.shortName : "", href: category ? `#/shop?category=${category.slug}` : undefined },
          { label: product.name },
        ]}
      />

      <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
        {/* gallery */}
        <div>
          <div className="relative flex items-center justify-center overflow-hidden rounded-2xl border border-line bg-labgrid bg-surface/50 p-10">
            {product.tag && <Badge tone="accent" className="absolute left-4 top-4">{product.tag}</Badge>}
            <ProductVisual image={product.images[activeImage]} height={340} />
          </div>
          <div className="mt-4 flex gap-3">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                aria-label={`Show image ${i + 1}`}
                className={cx("flex h-20 w-20 shrink-0 items-center justify-center rounded-xl border bg-surface2 p-2 transition-colors", activeImage === i ? "border-accent2" : "border-line hover:border-line2")}
              >
                <ProductVisual image={img} height={60} />
              </button>
            ))}
          </div>
        </div>

        {/* info */}
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent2">{product.subcategory}</p>
          <h1 className="mt-2 font-display text-3xl font-bold text-ink sm:text-4xl">{product.name}</h1>
          <p className="mt-1 font-mono text-[12px] text-faint">SKU: {variant.sku}</p>
          <p className="mt-4 text-[15px] leading-relaxed text-dim">{product.shortDescription}</p>

          <div className="mt-6 flex items-center gap-3">
            <Price value={variant.retailPrice} rrp={variant.rrp} size="lg" />
            <Badge tone={avail.tone}>{avail.label}</Badge>
          </div>
          <p className="mt-1 text-[11px] text-faint">Price ex. VAT · VAT calculated at checkout</p>

          <div className="mt-7">
            <h3 className="font-body text-[13px] font-semibold text-ink">Size</h3>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {product.variants.map((v, i) => (
                <button
                  key={v.sku}
                  onClick={() => setVariantIdx(i)}
                  className={cx(
                    "rounded-full border px-4 py-2 font-mono text-[13px] transition-colors",
                    i === variantIdx ? "border-accent bg-accent/15 text-accent2" : "border-line2 text-dim hover:border-line2 hover:text-ink"
                  )}
                >
                  {v.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <QuantityStepper value={qty} onChange={setQty} max={variant.stock} />
            <Button size="lg" onClick={addToBasket} disabled={variant.stock <= 0} className="flex-1 min-w-[200px]">
              <Icon name="cart" className="h-4 w-4" /> Add to basket
            </Button>
          </div>
          <p className="mt-3 text-[12px] text-dim">Line total: <span className="tnum text-ink font-medium">{formatMoney(variant.retailPrice * qty)}</span></p>

          <div className="mt-7 grid grid-cols-1 gap-3 rounded-xl border border-line bg-surface/40 p-4 sm:grid-cols-2">
            <div className="flex items-start gap-2.5">
              <Icon name="truck" className="mt-0.5 h-4 w-4 shrink-0 text-accent2" />
              <p className="text-[12.5px] leading-snug text-dim"><a href="#/delivery" className="text-ink hover:text-accent2">Next-day delivery</a> on orders confirmed before 2pm.</p>
            </div>
            <div className="flex items-start gap-2.5">
              <Icon name="shieldCheck" className="mt-0.5 h-4 w-4 shrink-0 text-accent2" />
              <p className="text-[12.5px] leading-snug text-dim">Batch-tested ≥98% purity, <a href="#/returns" className="text-ink hover:text-accent2">quality guaranteed</a>.</p>
            </div>
          </div>

          <div className="mt-5 flex items-start gap-2.5 rounded-xl border border-amber-500/25 bg-amber-500/5 p-4">
            <Icon name="alertTriangle" className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" />
            <p className="text-[12px] leading-snug text-amber-200/90">For laboratory research use only. Not for human or veterinary use, diagnostic use, or consumption. <a href="#/legal" className="underline hover:text-amber-100">Research use policy</a></p>
          </div>
        </div>
      </div>

      {/* tabs */}
      <div className="mt-16">
        <div className="flex gap-6 border-b border-line">
          {[
            { id: "description", label: "Description" },
            { id: "research", label: "Research Highlights" },
            { id: "specs", label: "Specification" },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={cx("relative pb-4 text-[14px] font-medium transition-colors", tab === t.id ? "text-ink" : "text-faint hover:text-dim")}
            >
              {t.label}
              {tab === t.id && <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-accent" />}
            </button>
          ))}
        </div>

        <div className="mt-8 max-w-3xl">
          {tab === "description" && (
            <div className="flex flex-col gap-4">
              {product.fullDescription.map((p, i) => <p key={i} className="text-[14.5px] leading-relaxed text-dim">{p}</p>)}
            </div>
          )}
          {tab === "research" && (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {product.researchHighlights.map((h) => (
                <div key={h.title} className="rounded-xl border border-line bg-surface/40 p-5">
                  <Icon name="microscope" className="h-5 w-5 text-accent2" />
                  <h4 className="mt-3 font-body text-[13.5px] font-semibold text-ink">{h.title}</h4>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-dim">{h.body}</p>
                </div>
              ))}
            </div>
          )}
          {tab === "specs" && (
            <dl className="divide-y divide-line rounded-xl border border-line">
              {Object.entries(product.specs).map(([k, v]) => (
                <div key={k} className="grid grid-cols-2 gap-4 px-5 py-3.5">
                  <dt className="text-[13px] capitalize text-faint">{k.replace(/([A-Z])/g, " $1")}</dt>
                  <dd className="text-[13px] text-ink">{v}</dd>
                </div>
              ))}
              <div className="grid grid-cols-2 gap-4 px-5 py-3.5">
                <dt className="text-[13px] text-faint">Available sizes</dt>
                <dd className="text-[13px] text-ink">{product.variants.map((v) => v.label).join(", ")}</dd>
              </div>
            </dl>
          )}
        </div>
      </div>

      {/* related */}
      {related.length > 0 && (
        <div className="mt-20">
          <SectionHeading eyebrow="You may also need" title="Related compounds" />
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      )}
    </Container>
  );
}
