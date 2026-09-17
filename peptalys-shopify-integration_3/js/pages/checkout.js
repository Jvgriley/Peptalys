function CheckoutPage() {
  const cart = useCart();
  const [redirecting, setRedirecting] = React.useState(false);
  const [redirectError, setRedirectError] = React.useState(null);

  function goToShopifyCheckout() {
    if (!cart.checkoutUrl) {
      setRedirectError("Your basket isn't ready yet — please try again in a moment.");
      return;
    }
    setRedirecting(true);
    setRedirectError(null);
    // Shopify's own hosted checkout takes it from here — this is where
    // payment is actually collected. Nothing on this site ever sees card
    // details; per the integration brief this build does not implement a
    // separate payment system of its own.
    window.location.href = cart.checkoutUrl;
  }

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

  if (cart.lines.length === 0) {
    return (
      <Container className="py-16 sm:py-24">
        <EmptyState icon="cart" title="Your basket is empty" body="Add compounds to your basket before checking out." action={<Button as="a" href="#/shop">Browse the shop</Button>} />
      </Container>
    );
  }
  if (!cart.meetsMinimum) {
    return (
      <Container className="py-16 sm:py-24">
        <EmptyState
          icon="scale"
          title="Minimum order value not met"
          body={`Wholesale orders require a minimum of ${formatMoney(SETTINGS.minimumOrderValue)}. Add ${formatMoney(cart.remainingToMinimum)} more to continue.`}
          action={<Button as="a" href="#/shop">Continue shopping</Button>}
        />
      </Container>
    );
  }
  if (cart.hasUnavailable) {
    return (
      <Container className="py-16 sm:py-24">
        <EmptyState
          icon="alertTriangle"
          title="Your basket has unavailable items"
          body="Remove anything marked unavailable in your basket before checking out."
          action={<Button as="a" href="#/cart">Review basket</Button>}
        />
      </Container>
    );
  }

  return (
    <Container className="py-10 sm:py-14">
      <Breadcrumbs items={[{ label: "Home", href: "#/" }, { label: "Basket", href: "#/cart" }, { label: "Checkout" }]} />
      <h1 className="mt-4 font-display text-3xl font-bold text-ink sm:text-4xl">Checkout</h1>
      <p className="mt-2 max-w-xl text-[14px] text-dim">Review your order, then continue to Shopify's secure checkout to enter delivery details and pay.</p>

      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_380px]">
        <section className="rounded-2xl border border-line p-6">
          <h2 className="flex items-center gap-2 font-display text-[15px] font-semibold text-ink"><Icon name="cart" className="h-4 w-4 text-accent2" /> Order contents</h2>
          <ul className="mt-5 flex flex-col gap-4">
            {cart.lines.map((l) => (
              <li key={l.id} className="flex items-center gap-3">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-line bg-surface2">
                  <ProductVisual image={l.image} height={56} />
                </div>
                <div className="flex-1">
                  <p className="text-[14px] font-semibold text-ink">{l.name}</p>
                  <p className="font-mono text-[11px] text-faint">{l.variantLabel} × {l.qty}</p>
                </div>
                <span className="tnum text-[13.5px] text-ink">{formatMoney(l.lineTotal)}</span>
              </li>
            ))}
          </ul>
        </section>

        <aside className="h-fit rounded-2xl panel p-6 lg:sticky lg:top-24">
          <h2 className="font-display text-lg font-semibold text-ink">Order Summary</h2>
          <div className="mt-4 flex flex-col gap-2 text-[13.5px] text-dim">
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

          <Button size="lg" full className="mt-5" onClick={goToShopifyCheckout} disabled={redirecting}>
            {redirecting ? "Redirecting…" : "Continue to secure checkout"} {!redirecting && <Icon name="arrowRight" className="h-4 w-4" />}
          </Button>
          {redirectError && <p className="mt-2 text-center text-[12px] text-red-300">{redirectError}</p>}
          <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-[11px] text-faint"><Icon name="lock" className="h-3.5 w-3.5" /> Payment is completed on Shopify's secure checkout — no card details are entered on this site</p>
        </aside>
      </div>
    </Container>
  );
}
