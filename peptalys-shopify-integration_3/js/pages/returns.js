function ReturnsPage() {
  return (
    <Container className="py-10 sm:py-16">
      <Breadcrumbs items={[{ label: "Home", href: "#/" }, { label: "Returns" }]} />
      <h1 className="mt-4 font-display text-3xl font-bold text-ink sm:text-4xl">Returns &amp; Quality Guarantee</h1>
      <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-dim">Because our products are lyophilised research compounds intended for laboratory use, our returns policy is built around quality assurance rather than change-of-mind returns.</p>

      <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="rounded-2xl border border-line bg-surface/40 p-6">
          <div className="flex items-center gap-2.5">
            <Icon name="shieldCheck" className="h-5 w-5 text-accent2" />
            <h2 className="font-display text-[15px] font-semibold text-ink">Quality guarantee</h2>
          </div>
          <p className="mt-3 text-[13.5px] leading-relaxed text-dim">
            Every batch is HPLC-tested to a minimum 98% purity before dispatch. If a product you receive fails to meet its stated specification, or arrives damaged, incorrectly labelled or outside its expected storage condition, we will replace it or issue a full refund — no questions asked, subject to notifying us within 14 days of delivery.
          </p>
        </div>
        <div className="rounded-2xl border border-line bg-surface/40 p-6">
          <div className="flex items-center gap-2.5">
            <Icon name="alertTriangle" className="h-5 w-5 text-accent2" />
            <h2 className="font-display text-[15px] font-semibold text-ink">What we can't accept back</h2>
          </div>
          <p className="mt-3 text-[13.5px] leading-relaxed text-dim">
            For laboratory safety and chain-of-custody reasons, we cannot accept the return of any vial once its tamper-evident seal has been broken or the product has left our packaging, unless it is being returned as part of an approved quality claim above.
          </p>
        </div>
      </div>

      <div className="mt-14">
        <h2 className="font-display text-xl font-semibold text-ink">How to raise a claim</h2>
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {[
            { n: "01", title: "Contact us", body: "Email our wholesale team with your order reference and a description of the issue, within 14 days of delivery." },
            { n: "02", title: "Share evidence", body: "Where relevant, include batch/lot numbers, photographs, or a certificate of analysis discrepancy." },
            { n: "03", title: "Resolution", body: "We'll confirm a replacement, credit note or refund — typically within 3 working days of review." },
          ].map((s) => (
            <div key={s.n} className="rounded-2xl border border-line p-6">
              <span className="font-mono text-3xl font-bold text-surface3">{s.n}</span>
              <h3 className="mt-3 font-display text-[15px] font-semibold text-ink">{s.title}</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-dim">{s.body}</p>
            </div>
          ))}
        </div>
        <Button as="a" href="#/contact" className="mt-8">Raise a quality claim <Icon name="arrowRight" className="h-4 w-4" /></Button>
      </div>
    </Container>
  );
}
