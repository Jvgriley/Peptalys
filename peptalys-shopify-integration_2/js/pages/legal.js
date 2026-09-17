function LegalPage() {
  const [tab, setTab] = React.useState("research-use");
  const tabs = [
    { id: "research-use", label: "Research Use Policy" },
    { id: "terms", label: "Terms of Wholesale Supply" },
    { id: "privacy", label: "Privacy Policy" },
  ];

  return (
    <Container className="py-10 sm:py-16">
      <Breadcrumbs items={[{ label: "Home", href: "#/" }, { label: "Legal" }]} />
      <h1 className="mt-4 font-display text-3xl font-bold text-ink sm:text-4xl">Legal &amp; Policies</h1>

      <div className="mt-8 flex flex-wrap gap-2 border-b border-line pb-px">
        {tabs.map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)} className={cx("rounded-t-lg px-4 py-2.5 text-[13.5px] font-medium transition-colors", tab === t.id ? "border-b-2 border-accent text-ink" : "text-faint hover:text-dim")}>
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-8 max-w-3xl">
        {tab === "research-use" && (
          <div className="flex flex-col gap-5 text-[14px] leading-relaxed text-dim">
            <div className="flex items-start gap-3 rounded-xl border border-amber-500/25 bg-amber-500/5 p-4">
              <Icon name="alertTriangle" className="mt-0.5 h-5 w-5 shrink-0 text-amber-300" />
              <p className="text-amber-100/90"><strong>Research use only.</strong> Every product listed on this site is sold strictly for laboratory and in-vitro research purposes. Peptalys products are not drugs, medicines, dietary supplements, cosmetics or food products, and are not approved for human or veterinary use.</p>
            </div>
            <p>By placing an order, you confirm that:</p>
            <ul className="ml-5 list-disc space-y-2">
              <li>You are purchasing on behalf of a genuine research organisation, laboratory, or institution with a legitimate research application for the compound(s) ordered;</li>
              <li>You will not administer, apply, inject, ingest, or otherwise introduce any product into a human or animal body;</li>
              <li>You will not resell products for human or veterinary consumption, diagnostic, therapeutic, or cosmetic use;</li>
              <li>You will handle, store, and dispose of all products in accordance with your institution's laboratory safety protocols and applicable local regulations;</li>
              <li>You are of legal age and legally entitled to purchase research chemicals in your jurisdiction.</li>
            </ul>
            <p>Peptalys reserves the right to refuse or cancel any order where we reasonably believe products are intended for human or veterinary use, or where the buyer cannot demonstrate a legitimate research affiliation.</p>
            <p>The research information presented on product pages describes published and ongoing scientific research into each compound's studied mechanisms. It does not constitute medical advice, and no claims are made regarding safety or efficacy for human use.</p>
          </div>
        )}

        {tab === "terms" && (
          <div className="flex flex-col gap-5 text-[14px] leading-relaxed text-dim">
            <p><strong className="text-ink">Wholesale-only supply.</strong> Peptalys operates a wholesale supply model with a minimum order value of {formatMoney(SETTINGS.minimumOrderValue)} (ex. VAT and delivery) per order.</p>
            <p><strong className="text-ink">Pricing.</strong> All prices shown are in GBP and exclude VAT, which is calculated at checkout at the applicable UK rate ({Math.round(SETTINGS.vatRate * 100)}%). Peptalys reserves the right to amend pricing at any time; the price shown at checkout is the price charged.</p>
            <p><strong className="text-ink">Order acceptance.</strong> Submitting an order via this site is a request to purchase, not a binding contract of sale. A contract is formed once Peptalys confirms the order and issues a payment link, and is completed on receipt of payment.</p>
            <p><strong className="text-ink">Payment.</strong> Payment is processed securely via Stripe. Peptalys does not store or have access to full card details at any point.</p>
            <p><strong className="text-ink">Title &amp; risk.</strong> Title to goods passes on receipt of full payment. Risk passes to the buyer on delivery.</p>
            <p><strong className="text-ink">Liability.</strong> Products are supplied "as researched" for laboratory use; Peptalys' liability is limited to the value of the order in question, save where liability cannot be excluded by law.</p>
          </div>
        )}

        {tab === "privacy" && (
          <div className="flex flex-col gap-5 text-[14px] leading-relaxed text-dim">
            <p>Peptalys collects the contact, billing and delivery information you provide when placing an order or contacting our team, solely to process orders, provide customer support, and meet our legal and accounting obligations.</p>
            <p>We do not sell customer data to third parties. Information is shared only with the service providers necessary to fulfil an order (for example, couriers and payment processors) and is retained only as long as required for accounting and legal purposes.</p>
            <p>You may request a copy of the data we hold about you, or ask us to correct or delete it, by contacting <a href="#/contact" className="text-accent2 underline">our team</a>.</p>
            <p className="text-[12px] text-faint">This is a summary policy for demonstration purposes; a production deployment should replace it with counsel-reviewed privacy and cookie policies appropriate to your data flows and hosting.</p>
          </div>
        )}
      </div>
    </Container>
  );
}
