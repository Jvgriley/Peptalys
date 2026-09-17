function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-labgrid border-b border-line">
        <Container className="relative py-16 sm:py-24">
          <Eyebrow>About Peptalys</Eyebrow>
          <h1 className="mt-3 max-w-2xl font-display text-4xl font-bold text-ink sm:text-5xl text-balance">
            More than peptides — a supply chain built for research.
          </h1>
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-dim">
            Peptalys is a UK wholesale supplier of high-purity research peptides, founded to give laboratories and research bodies a dependable, well-documented source of the compounds their protocols depend on.
          </p>
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container className="grid grid-cols-1 gap-14 lg:grid-cols-2">
          <div>
            <Eyebrow>Our story</Eyebrow>
            <h2 className="mt-3 font-display text-2xl font-bold text-ink sm:text-3xl">From a purity problem to a purpose-built supplier.</h2>
            <div className="mt-5 flex flex-col gap-4 text-[14.5px] leading-relaxed text-dim">
              <p>Peptalys was founded by a small team with a background in peptide synthesis and laboratory procurement, after repeatedly encountering the same problem across research groups: inconsistent purity, unreliable lead times, and suppliers unwilling to work at genuine wholesale volume.</p>
              <p>We set out to build the opposite — a UK-based manufacturing and supply operation where every batch is independently HPLC-tested before it ships, pricing is transparent at wholesale scale, and delivery timelines are something research teams can actually plan around.</p>
              <p>Today, Peptalys supplies a curated catalogue of reference research peptides across metabolic, regenerative, cellular and growth-hormone-axis research — with the same batch discipline on every single line.</p>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            {[
              { icon: "microscope", title: "UK synthesis", body: "Every compound is synthesised in our UK facility under controlled, documented conditions." },
              { icon: "shieldCheck", title: "Independent purity testing", body: "Each batch is verified by HPLC to a minimum of 98% purity before release." },
              { icon: "truck", title: "Reliable UK delivery", body: "Orders are dispatched from our UK facility and arrive within 3–5 working days, nationwide." },
              { icon: "users", title: "Wholesale-first", body: "Pricing, packaging and minimum order structure are all built around institutional buying, not single-vial retail." },
            ].map((f) => (
              <div key={f.title} className="flex gap-4 rounded-xl border border-line bg-surface/40 p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent2"><Icon name={f.icon} className="h-5 w-5" /></div>
                <div>
                  <h3 className="font-body text-[14px] font-semibold text-ink">{f.title}</h3>
                  <p className="mt-1 text-[13px] leading-relaxed text-dim">{f.body}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-line py-16 sm:py-24">
        <Container>
          <SectionHeading align="center" eyebrow="Our process" title="From synthesis to your bench" className="mx-auto" />
          <div className="relative mt-14">
            <div className="absolute left-0 right-0 top-6 hidden h-px bg-line sm:block" />
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-4">
              {[
                { icon: "flask", title: "Synthesis", body: "Peptides are synthesised in-house to a controlled process specification." },
                { icon: "microscope", title: "HPLC testing", body: "Every batch is independently tested and verified to ≥98% purity." },
                { icon: "package", title: "Secure packing", body: "Lyophilised and packed in tamper-evident packaging — stable at ambient temperature, no cold storage required." },
                { icon: "truck", title: "Tracked UK delivery", body: "Shipped via tracked courier, arriving within 3–5 working days nationwide." },
              ].map((s, i) => (
                <div key={s.title} className="relative flex flex-col items-center text-center sm:items-start sm:text-left">
                  <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-line2 bg-surface text-accent2">
                    <Icon name={s.icon} className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-display text-[15px] font-semibold text-ink">{s.title}</h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-dim">{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-line py-16 sm:py-24">
        <Container className="text-center">
          <Eyebrow>Research use policy</Eyebrow>
          <h2 className="mx-auto mt-3 max-w-2xl font-display text-2xl font-bold text-ink sm:text-3xl text-balance">Every product exists for laboratory research only.</h2>
          <p className="mx-auto mt-4 max-w-xl text-[14px] leading-relaxed text-dim">
            Peptalys peptides are not medicines, supplements or cosmetic products. They are supplied exclusively to research bodies, laboratories and qualified institutional buyers for in-vitro and preclinical research. Read our full <a href="#/legal" className="text-accent2 underline">research use policy</a>.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button as="a" href="#/shop">Browse the catalogue</Button>
            <Button as="a" href="#/contact" variant="secondary">Speak to our team</Button>
          </div>
        </Container>
      </section>
    </>
  );
}
