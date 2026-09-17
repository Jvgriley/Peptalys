function DeliveryPage() {
  return (
    <Container className="py-10 sm:py-16">
      <Breadcrumbs items={[{ label: "Home", href: "#/" }, { label: "Delivery" }]} />
      <h1 className="mt-4 font-display text-3xl font-bold text-ink sm:text-4xl">Delivery Information</h1>
      <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-dim">All orders are dispatched from our UK facility in secure, tamper-evident packaging via a tracked courier service.</p>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {[
          { icon: "clock", title: "Order processing", body: "Orders are processed and dispatched promptly once confirmed and paid." },
          { icon: "truck", title: "3–5 working day delivery", body: "Standard service is delivered within 3–5 working days, nationwide across the UK." },
          { icon: "package", title: "Delivery cost", body: `Delivery is calculated securely by Shopify at checkout, on top of the ${formatMoney(SETTINGS.minimumOrderValue)} wholesale minimum order value.` },
        ].map((c) => (
          <div key={c.title} className="rounded-2xl border border-line bg-surface/40 p-6">
            <Icon name={c.icon} className="h-6 w-6 text-accent2" />
            <h3 className="mt-4 font-display text-[15px] font-semibold text-ink">{c.title}</h3>
            <p className="mt-2 text-[13px] leading-relaxed text-dim">{c.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-xl font-semibold text-ink">Packaging</h2>
          <p className="mt-3 text-[14px] leading-relaxed text-dim">
            Lyophilised peptides are stable at ambient temperature, so orders do not require cold storage or refrigerated transport. Every Peptalys order ships in secure, tamper-evident packaging designed to arrive intact.
          </p>
          <p className="mt-3 text-[14px] leading-relaxed text-dim">
            Every parcel is fully tracked from dispatch to delivery, and a signature is required on receipt.
          </p>
        </div>
        <div>
          <h2 className="font-display text-xl font-semibold text-ink">Delivery areas &amp; timing</h2>
          <dl className="mt-3 divide-y divide-line rounded-xl border border-line">
            {[
              ["UK Mainland", "3–5 working days"],
              ["UK Highlands & Islands", "3–5 working days"],
              ["Northern Ireland", "3–5 working days"],
              ["EU institutional buyers", "5–7 working days, on request"],
              ["International", "Discuss with your Peptalys representative"],
            ].map(([area, time]) => (
              <div key={area} className="flex items-center justify-between px-4 py-3 text-[13.5px]">
                <span className="text-dim">{area}</span>
                <span className="font-medium text-ink">{time}</span>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="mt-14 rounded-2xl border border-line bg-surface/40 p-6">
        <h2 className="flex items-center gap-2 font-display text-[15px] font-semibold text-ink"><Icon name="info" className="h-4 w-4 text-accent2" /> Order tracking</h2>
        <p className="mt-2 max-w-2xl text-[13.5px] leading-relaxed text-dim">
          Once your order is dispatched, you'll receive tracking details by email at the address given at checkout. For any delivery query, quote your order reference and contact <a href="#/contact" className="text-accent2 underline">our wholesale team</a>.
        </p>
      </div>
    </Container>
  );
}
