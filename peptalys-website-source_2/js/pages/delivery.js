function DeliveryPage() {
  return (
    <Container className="py-10 sm:py-16">
      <Breadcrumbs items={[{ label: "Home", href: "#/" }, { label: "Delivery" }]} />
      <h1 className="mt-4 font-display text-3xl font-bold text-ink sm:text-4xl">Delivery Information</h1>
      <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-dim">All orders are dispatched from our UK facility in temperature-appropriate, tamper-evident packaging via a tracked courier service.</p>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {[
          { icon: "clock", title: "Order cut-off", body: "Orders confirmed and paid before 2pm GMT ship the same working day." },
          { icon: "truck", title: "Next-day delivery", body: "Standard service is next working day, nationwide across the UK." },
          { icon: "package", title: "Free over £1,000", body: `Delivery is free on orders at or above our ${formatMoney(SETTINGS.minimumOrderValue)} wholesale minimum; otherwise a flat ${formatMoney(SETTINGS.standardDeliveryFee)} applies.` },
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
          <h2 className="font-display text-xl font-semibold text-ink">Packaging &amp; cold chain</h2>
          <p className="mt-3 text-[14px] leading-relaxed text-dim">
            Lyophilised peptides are stable at ambient temperature for short transit windows, but every Peptalys order still ships with insulated packaging and, where a batch specification calls for it, cold packs — so vials arrive within the storage tolerance stated on each product's specification tab.
          </p>
          <p className="mt-3 text-[14px] leading-relaxed text-dim">
            Every parcel is fully tracked from dispatch to delivery, and a signature is required on receipt for orders above the wholesale minimum.
          </p>
        </div>
        <div>
          <h2 className="font-display text-xl font-semibold text-ink">Delivery areas &amp; timing</h2>
          <dl className="mt-3 divide-y divide-line rounded-xl border border-line">
            {[
              ["UK Mainland", "Next working day"],
              ["UK Highlands & Islands", "1–2 working days"],
              ["Northern Ireland", "1–2 working days"],
              ["EU institutional buyers", "2–4 working days, on request"],
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
