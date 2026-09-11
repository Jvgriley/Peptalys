function CheckoutPage() {
  const cart = useCart();
  const [form, setForm] = React.useState({
    fullName: "", email: "", phone: "", company: "", vatNumber: "",
    billingLine1: "", billingLine2: "", billingCity: "", billingPostcode: "", billingCountry: "United Kingdom",
    shipSameAsBilling: true,
    shipLine1: "", shipLine2: "", shipCity: "", shipPostcode: "", shipCountry: "United Kingdom",
    notes: "", agree: false,
  });
  const [submitting, setSubmitting] = React.useState(false);
  const [errors, setErrors] = React.useState({});

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function validate() {
    const req = ["fullName", "email", "company", "billingLine1", "billingCity", "billingPostcode"];
    const next = {};
    req.forEach((f) => { if (!form[f].trim()) next[f] = "Required"; });
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Enter a valid email";
    if (!form.shipSameAsBilling) {
      ["shipLine1", "shipCity", "shipPostcode"].forEach((f) => { if (!form[f].trim()) next[f] = "Required"; });
    }
    if (!form.agree) next.agree = "You must confirm research-use eligibility";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function submit(e) {
    e.preventDefault();
    if (!cart.meetsMinimum || cart.lines.length === 0) return;
    if (!validate()) {
      pushToast("Please check the highlighted fields", { tone: "default" });
      return;
    }
    setSubmitting(true);
    // In production this is where the front-end calls a backend endpoint
    // (e.g. POST /api/checkout/session) that creates a Stripe Checkout
    // Session server-side with the secret key, then redirects the browser
    // to session.url. No secret key or card data ever touches this file.
    setTimeout(() => {
      const order = Orders.create({
        customer: { name: form.fullName, email: form.email, phone: form.phone, company: form.company, vatNumber: form.vatNumber },
        billingAddress: { line1: form.billingLine1, line2: form.billingLine2, city: form.billingCity, postcode: form.billingPostcode, country: form.billingCountry },
        shippingAddress: form.shipSameAsBilling
          ? { line1: form.billingLine1, line2: form.billingLine2, city: form.billingCity, postcode: form.billingPostcode, country: form.billingCountry }
          : { line1: form.shipLine1, line2: form.shipLine2, city: form.shipCity, postcode: form.shipPostcode, country: form.shipCountry },
        notes: form.notes,
        lines: cart.lines.map((l) => ({ sku: l.variantSku, name: l.name, variantLabel: l.variantLabel, qty: l.qty, unitPrice: l.unitPrice, lineTotal: l.lineTotal })),
        subtotal: cart.subtotal, vat: cart.vat, delivery: cart.delivery, total: cart.total,
        currency: SETTINGS.currency,
      });
      Cart.clear();
      setSubmitting(false);
      navigate("/order-confirmation/" + order.orderNumber);
    }, 900);
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

  const Field = ({ label, field, type = "text", full, placeholder }) => (
    <label className={cx("flex flex-col gap-1.5", full && "sm:col-span-2")}>
      <span className="text-[12.5px] font-medium text-dim">{label}</span>
      <input
        type={type}
        value={form[field]}
        onChange={(e) => update(field, e.target.value)}
        placeholder={placeholder}
        className={cx(
          "rounded-lg border bg-surface2 px-3.5 py-2.5 text-[13.5px] text-ink placeholder:text-faint outline-none focus:border-accent2",
          errors[field] ? "border-red-500/60" : "border-line2"
        )}
      />
      {errors[field] && <span className="text-[11px] text-red-300">{errors[field]}</span>}
    </label>
  );

  return (
    <Container className="py-10 sm:py-14">
      <Breadcrumbs items={[{ label: "Home", href: "#/" }, { label: "Basket", href: "#/cart" }, { label: "Checkout" }]} />
      <h1 className="mt-4 font-display text-3xl font-bold text-ink sm:text-4xl">Checkout</h1>

      <form onSubmit={submit} className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_380px]">
        <div className="flex flex-col gap-8">
          <section className="rounded-2xl border border-line p-6">
            <h2 className="flex items-center gap-2 font-display text-[15px] font-semibold text-ink"><Icon name="user" className="h-4 w-4 text-accent2" /> Contact &amp; Institution</h2>
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Full name" field="fullName" />
              <Field label="Institutional email" field="email" type="email" />
              <Field label="Phone" field="phone" type="tel" />
              <Field label="Company / institution" field="company" />
              <Field label="VAT number (optional)" field="vatNumber" />
            </div>
          </section>

          <section className="rounded-2xl border border-line p-6">
            <h2 className="flex items-center gap-2 font-display text-[15px] font-semibold text-ink"><Icon name="mapPin" className="h-4 w-4 text-accent2" /> Billing address</h2>
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Address line 1" field="billingLine1" full />
              <Field label="Address line 2 (optional)" field="billingLine2" full />
              <Field label="City" field="billingCity" />
              <Field label="Postcode" field="billingPostcode" />
              <Field label="Country" field="billingCountry" />
            </div>
          </section>

          <section className="rounded-2xl border border-line p-6">
            <div className="flex items-center justify-between">
              <h2 className="flex items-center gap-2 font-display text-[15px] font-semibold text-ink"><Icon name="truck" className="h-4 w-4 text-accent2" /> Delivery address</h2>
              <label className="flex items-center gap-2 text-[12.5px] text-dim">
                <input type="checkbox" checked={form.shipSameAsBilling} onChange={(e) => update("shipSameAsBilling", e.target.checked)} className="h-4 w-4 rounded border-line2 bg-surface2 accent-accent" />
                Same as billing
              </label>
            </div>
            {!form.shipSameAsBilling && (
              <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Address line 1" field="shipLine1" full />
                <Field label="Address line 2 (optional)" field="shipLine2" full />
                <Field label="City" field="shipCity" />
                <Field label="Postcode" field="shipPostcode" />
                <Field label="Country" field="shipCountry" />
              </div>
            )}
          </section>

          <section className="rounded-2xl border border-line p-6">
            <h2 className="flex items-center gap-2 font-display text-[15px] font-semibold text-ink"><Icon name="fileText" className="h-4 w-4 text-accent2" /> Order notes (optional)</h2>
            <textarea
              value={form.notes}
              onChange={(e) => update("notes", e.target.value)}
              rows={3}
              placeholder="PO number, delivery instructions, or anything else our wholesale team should know…"
              className="mt-4 w-full rounded-lg border border-line2 bg-surface2 px-3.5 py-2.5 text-[13.5px] text-ink placeholder:text-faint outline-none focus:border-accent2"
            />
          </section>

          <section className="rounded-2xl border border-line p-6">
            <h2 className="flex items-center gap-2 font-display text-[15px] font-semibold text-ink"><Icon name="creditCard" className="h-4 w-4 text-accent2" /> Payment</h2>
            <p className="mt-3 text-[13px] leading-relaxed text-dim">
              Peptalys does not take card details directly. Submitting this order sends your request to our wholesale team, who issue a secure Stripe payment link by email for the exact order total — no card information is entered on this site.
            </p>
            <label className="mt-4 flex items-start gap-2.5">
              <input type="checkbox" checked={form.agree} onChange={(e) => update("agree", e.target.checked)} className="mt-0.5 h-4 w-4 rounded border-line2 bg-surface2 accent-accent" />
              <span className="text-[12.5px] leading-relaxed text-dim">
                I confirm I am procuring on behalf of a genuine research organisation, for laboratory research use only, and I have read the <a href="#/legal" className="text-accent2 underline">research use policy</a>.
              </span>
            </label>
            {errors.agree && <p className="mt-1.5 text-[11px] text-red-300">{errors.agree}</p>}
          </section>
        </div>

        <aside className="h-fit rounded-2xl panel p-6 lg:sticky lg:top-24">
          <h2 className="font-display text-lg font-semibold text-ink">Order Summary</h2>
          <ul className="mt-4 flex flex-col gap-3">
            {cart.lines.map((l) => (
              <li key={l.productId + l.variantSku} className="flex items-center justify-between text-[13px]">
                <span className="text-dim">{l.name} <span className="font-mono text-[11px] text-faint">({l.variantLabel} × {l.qty})</span></span>
                <span className="tnum text-ink">{formatMoney(l.lineTotal)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-col gap-2 border-t border-line pt-4 text-[13.5px] text-dim">
            <div className="flex justify-between"><span>Subtotal</span><span className="tnum text-ink">{formatMoney(cart.subtotal)}</span></div>
            <div className="flex justify-between"><span>VAT (20%)</span><span className="tnum text-ink">{formatMoney(cart.vat)}</span></div>
            <div className="flex justify-between"><span>Delivery</span><span className="tnum text-ink">{cart.delivery === 0 ? "Free" : formatMoney(cart.delivery)}</span></div>
          </div>
          <div className="mt-3 flex justify-between border-t border-line pt-3">
            <span className="font-display font-semibold text-ink">Total</span>
            <span className="font-display text-xl font-bold tnum text-ink">{formatMoney(cart.total)}</span>
          </div>
          <Button type="submit" full size="lg" className="mt-5" disabled={submitting}>
            {submitting ? "Submitting…" : "Confirm order"} {!submitting && <Icon name="arrowRight" className="h-4 w-4" />}
          </Button>
          <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-[11px] text-faint"><Icon name="lock" className="h-3.5 w-3.5" /> No payment card details are collected on this site</p>
        </aside>
      </form>
    </Container>
  );
}
