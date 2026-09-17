function ProductPage({ slug }) {
  const productState = useProduct(slug);
  const product = productState.data;
  const [activeImage, setActiveImage] = React.useState(0);
  const [variantIdx, setVariantIdx] = React.useState(0);
  const [qty, setQty] = React.useState(1);
  const [tab, setTab] = React.useState("description");
  const [adding, setAdding] = React.useState(false);

  React.useEffect(() => {
    setActiveImage(0);
    setVariantIdx(0);
    setQty(1);
    setTab("description");
  }, [slug]);

  // Product page's own title / meta description / Product JSON-LD — moved
  // here (rather than centrally in the router) because the product now
  // arrives asynchronously from Shopify.
  React.useEffect(() => {
    if (!product) return;
    const range = priceRange(product);
    document.title = `${product.name} — ${product.subcategory || "Peptalys"} | Peptalys`;
    setMetaTag("description", product.shortDescription);
    setJsonLd("product-jsonld", {
      "@context": "https://schema.org",
      "@type": "Product",
      name: product.name,
      sku: product.sku,
      brand: { "@type": "Brand", name: product.brand },
      description: product.shortDescription,
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: SETTINGS.currency,
        lowPrice: range.min,
        highPrice: range.max,
        offerCount: product.variants.length,
        availability: productPurchasable(product) ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      },
    });
    return () => setJsonLd("product-jsonld", null);
  }, [product]);

  const related = useProducts(product ? { collection: product.category || undefined } : {});

  if (productState.status === "loading") {
    return (
      <Container className="py-24">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="h-[400px] animate-pulse rounded-2xl bg-surface2/60" />
          <div className="flex flex-col gap-4">
            <div className="h-4 w-1/3 animate-pulse rounded bg-surface2/60" />
            <div className="h-8 w-2/3 animate-pulse rounded bg-surface2/60" />
            <div className="h-20 animate-pulse rounded bg-surface2/60" />
          </div>
        </div>
      </Container>
    );
  }

  if (productState.status === "not_found" || (productState.status === "ready" && !product)) {
    return (
      <Container className="py-24">
        <EmptyState icon="search" title="Compound not found" body="This product may have been removed from the catalogue." action={<Button as="a" href="#/shop">Back to shop</Button>} />
      </Container>
    );
  }

  if (productState.status === "error") {
    return (
      <Container className="py-24">
        <EmptyState icon="alertTriangle" title="Couldn't load this product" body={productState.error || "Please try again shortly."} action={<Button as="a" href="#/shop">Back to shop</Button>} />
      </Container>
    );
  }

  const variant = product.variants[variantIdx] || product.variants[0];
  const avail = variantAvailability(variant);
  const purchasable = variant.availableForSale;
  const relatedList = related.status === "ready"
    ? related.data.filter((p) => p.id !== product.id).slice(0, 4)
    : [];

  function addToBasket() {
    if (!purchasable) return;
    setAdding(true);
    CartStore.addLine(variant.id, qty)
      .then(() => pushToast(`${product.name} ${variant.label} × ${qty} added to basket`, { tone: "ok" }))
      .catch((err) => pushToast(err.message || "Couldn't add that to your basket", { tone: "default" }))
      .finally(() => setAdding(false));
  }

  return (
    <Container className="py-10 sm:py-14">
      <Breadcrumbs
        items={[
          { label: "Home", href: "#/" },
          { label: "Shop", href: "#/shop" },
          ...(product.category ? [{ label: product.subcategory || "Category", href: `#/shop?category=${product.category}` }] : []),
          { label: product.name },
        ]}
      />

      <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
        {/* gallery */}
        <div>
          <div className="relative flex items-center justify-center overflow-hidden rounded-2xl border border-line bg-labgrid bg-surface/50 p-10">
            {product.tag && <Badge tone="accent" className="absolute left-4 top-4">{product.tag}</Badge>}
            <ProductVisual image={product.images[activeImage] || product.images[0]} height={340} />
          </div>
          {product.images.length > 1 && (
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
          )}
        </div>

        {/* info */}
        <div>
          {product.subcategory && <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent2">{product.subcategory}</p>}
          <h1 className="mt-2 font-display text-3xl font-bold text-ink sm:text-4xl">{product.name}</h1>
          {variant.sku && <p className="mt-1 font-mono text-[12px] text-faint">SKU: {variant.sku}</p>}
          {product.shortDescription && <p className="mt-4 text-[15px] leading-relaxed text-dim">{product.shortDescription}</p>}

          <div className="mt-6 flex items-center gap-3">
            <Price value={variant.retailPrice} rrp={variant.rrp} size="lg" />
            <Badge tone={avail.tone}>{avail.label}</Badge>
          </div>
          <p className="mt-1 text-[11px] text-faint">Delivery &amp; any applicable tax calculated securely at checkout</p>
          <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.06em] text-faint">Sold in units of 10 — 1 unit added to your basket is 10 of this item</p>

          {product.variants.length > 1 && (
            <div className="mt-7">
              <h3 className="font-body text-[13px] font-semibold text-ink">Size</h3>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {product.variants.map((v, i) => (
                  <button
                    key={v.id}
                    onClick={() => setVariantIdx(i)}
                    disabled={!v.availableForSale}
                    className={cx(
                      "rounded-full border px-4 py-2 font-mono text-[13px] transition-colors disabled:cursor-not-allowed disabled:opacity-40",
                      i === variantIdx ? "border-accent bg-accent/15 text-accent2" : "border-line2 text-dim hover:border-line2 hover:text-ink"
                    )}
                  >
                    {v.label}{!v.availableForSale ? " · Sold out" : ""}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <QuantityStepper value={qty} onChange={setQty} max={variant.quantityAvailable || 999} />
            <Button size="lg" onClick={addToBasket} disabled={!purchasable || adding} className="flex-1 min-w-[200px]">
              <Icon name="cart" className="h-4 w-4" /> {purchasable ? (adding ? "Adding…" : "Add to basket") : "Out of stock"}
            </Button>
          </div>
          <p className="mt-3 text-[12px] text-dim">Line total: <span className="tnum text-ink font-medium">{formatMoney(variant.retailPrice * qty)}</span></p>

          <div className="mt-7 grid grid-cols-1 gap-3 rounded-xl border border-line bg-surface/40 p-4 sm:grid-cols-2">
            <div className="flex items-start gap-2.5">
              <Icon name="truck" className="mt-0.5 h-4 w-4 shrink-0 text-accent2" />
              <p className="text-[12.5px] leading-snug text-dim"><a href="#/delivery" className="text-ink hover:text-accent2">3–5 working day delivery</a>, nationwide across the UK.</p>
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
      {(product.fullDescription.length > 0 || Object.keys(product.specs || {}).length > 0) && (
        <div className="mt-16">
          <div className="flex gap-6 border-b border-line">
            {[{ id: "description", label: "Description" }].map((t) => (
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
                {product.fullDescription.length > 0
                  ? product.fullDescription.map((p, i) => <p key={i} className="text-[14.5px] leading-relaxed text-dim">{p}</p>)
                  : <p className="text-[14.5px] leading-relaxed text-dim">No further description has been added for this product yet.</p>}
                <dl className="mt-2 divide-y divide-line rounded-xl border border-line">
                  {product.brand && (
                    <div className="grid grid-cols-2 gap-4 px-5 py-3.5">
                      <dt className="text-[13px] text-faint">Brand</dt>
                      <dd className="text-[13px] text-ink">{product.brand}</dd>
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-4 px-5 py-3.5">
                    <dt className="text-[13px] text-faint">Available sizes</dt>
                    <dd className="text-[13px] text-ink">{product.variants.map((v) => v.label).join(", ")}</dd>
                  </div>
                </dl>
              </div>
            )}
          </div>
        </div>
      )}

      {/* related */}
      {relatedList.length > 0 && (
        <div className="mt-20">
          <SectionHeading eyebrow="You may also need" title="Related compounds" />
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {relatedList.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      )}
    </Container>
  );
}
