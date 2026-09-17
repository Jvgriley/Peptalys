function CartPage() {
  const cart = useCart();

  if (cart.status === "loading" && cart.lines.length === 0) {
    return (
      <Container className="py-16 sm:py-24">
        <div className="flex flex-col items-center gap-3 py-16 text-dim">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-line2 border-t-accent2" />
          <p className="text-[13px]">Loading your basket…</p>
        </div>
      </Container>
    );
  }

  if (cart.status === "error" && cart.lines.length === 0) {
    return (
      <Container className="py-16 sm:py-24">
        <EmptyState icon="alertTriangle" title="Couldn't load your basket" body={cart.error || "Please try again."} action={<Button variant="secondary" onClick={() => CartStore.init()}>Retry</Button>} />
      </Container>
    );
  }

  if (cart.lines.length === 0) {
    return (
      <Container className="py-16 sm:py-24">
        <EmptyState
          icon="cart"
          title="Your basket is empty"
          body="Browse the catalogue and add research peptides to build your wholesale order."
          action={<Button as="a" href="#/shop">Browse the shop</Button>}
        />
      </Container>
    );
  }

  return (
    <Container className="py-10 sm:py-14">
      <Breadcrumbs items={[{ label: "Home", href: "#/" }, { label: "Basket" }]} />
      <h1 className="mt-4 font-display text-3xl font-bold text-ink sm:text-4xl">Your Basket</h1>

      {cart.hasUnavailable && (
        <div className="mt-5 flex items-start gap-2.5 rounded-xl border border-amber-500/25 bg-amber-500/5 p-4">
          <Icon name="alertTriangle" className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" />
          <p className="text-[13px] leading-snug text-amber-200/90">One or more items below are no longer available and must be removed before you can check out.</p>
        </div>
      )}

      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_360px]">
        <div className="overflow-hidden rounded-2xl border border-line">
          <table className="w-full text-left">
            <thead className="border-b border-line bg-surface/60">
              <tr>
                <th className="px-5 py-3 text-[11px] font-medium uppercase tracking-wide text-faint">Product</th>
                <th className="px-5 py-3 text-[11px] font-medium uppercase tracking-wide text-faint">Unit price</th>
                <th className="px-5 py-3 text-[11px] font-medium uppercase tracking-wide text-faint">Quantity</th>
                <th className="px-5 py-3 text-right text-[11px] font-medium uppercase tracking-wide text-faint">Total</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {cart.lines.map((line) => (
                <tr key={line.id} className={!line.availableForSale ? "opacity-60" : undefined}>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <a href={`#/product/${line.slug}`} className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-line bg-surface2">
                        <ProductVisual image={line.image} height={56} />
                      </a>
                      <div>
                        <a href={`#/product/${line.slug}`} className="font-body text-[14px] font-semibold text-ink hover:text-accent2">{line.name}</a>
                        <p className="font-mono text-[11px] text-faint">{line.variantLabel}{line.variantSku ? ` · ${line.variantSku}` : ""}</p>
                        {!line.availableForSale && <Badge tone="danger" className="mt-1">Unavailable</Badge>}
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 tnum text-[13.5px] text-dim">{formatMoney(line.unitPrice)}</td>
                  <td className="px-5 py-4">
                    <QuantityStepper size="sm" value={line.qty} onChange={(q) => CartStore.updateLine(line.id, q)} max={line.quantityAvailable || 999} />
                  </td>
                  <td className="px-5 py-4 text-right tnum text-[14px] font-semibold text-ink">{formatMoney(line.lineTotal)}</td>
                  <td className="px-5 py-4 text-right">
                    <button onClick={() => CartStore.removeLine(line.id)} aria-label={`Remove ${line.name}`} className="text-faint hover:text-red-300">
                      <Icon name="trash" className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex items-center justify-between border-t border-line px-5 py-4">
            <Button as="a" href="#/shop" variant="ghost" size="sm"><Icon name="arrowLeft" className="h-4 w-4" /> Continue shopping</Button>
            <button onClick={() => CartStore.clear()} className="text-[12.5px] text-faint hover:text-red-300">Clear basket</button>
          </div>
        </div>

        <aside className="h-fit rounded-2xl panel p-6">
          <h2 className="font-display text-lg font-semibold text-ink">Order Summary</h2>

          <div className="mt-4 rounded-xl border border-line bg-surface2/60 p-3.5">
            <div className="flex items-center justify-between text-[12px] text-dim">
              <span>Wholesale minimum</span>
              <span className="font-mono tnum text-ink">{formatMoney(cart.subtotal)} / {formatMoney(SETTINGS.minimumOrderValue)}</span>
            </div>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-surface3">
              <div className={cx("h-full rounded-full transition-all duration-500", cart.meetsMinimum ? "bg-emerald-400" : "bg-gradient-to-r from-accent to-accent2")} style={{ width: `${Math.min(100, (cart.subtotal / SETTINGS.minimumOrderValue) * 100)}%` }} />
            </div>
            {!cart.meetsMinimum && <p className="mt-2 text-[12px] text-dim">Add {formatMoney(cart.remainingToMinimum)} more to unlock checkout.</p>}
          </div>

          <div className="mt-5 flex flex-col gap-2 text-[13.5px] text-dim">
            <div className="flex justify-between"><span>Subtotal</span><span className="tnum text-ink">{formatMoney(cart.subtotal)}</span></div>
            {cart.estimatedTax != null && (
              <div className="flex justify-between"><span>Estimated tax</span><span className="tnum text-ink">{formatMoney(cart.estimatedTax)}</span></div>
            )}
            <div className="flex justify-between"><span>Delivery</span><span className="text-faint">Calculated at checkout</span></div>
          </div>
          <div className="mt-3 flex justify-between border-t border-line pt-3">
            <span className="font-display font-semibold text-ink">Total</span>
            <span className="font-display text-xl font-bold tnum text-ink">{formatMoney(cart.total)}</span>
          </div>

          <Button as="a" href="#/checkout" full size="lg" className="mt-5" disabled={!cart.meetsMinimum || cart.hasUnavailable}>
            Proceed to checkout <Icon name="arrowRight" className="h-4 w-4" />
          </Button>
          {!cart.meetsMinimum && <p className="mt-2 text-center text-[11.5px] text-amber-300">Minimum order value not yet met</p>}
          <p className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-faint"><Icon name="lock" className="h-3.5 w-3.5" /> Secure checkout via Shopify</p>
        </aside>
      </div>
    </Container>
  );
}
