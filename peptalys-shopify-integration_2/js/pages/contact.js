function ContactPage() {
  const [form, setForm] = React.useState({ name: "", email: "", company: "", subject: "General enquiry", message: "" });
  const [sent, setSent] = React.useState(false);

  function submit(e) {
    e.preventDefault();
    setSent(true);
    pushToast("Message sent — we'll be in touch within one working day.", { tone: "ok" });
  }

  return (
    <Container className="py-10 sm:py-16">
      <Breadcrumbs items={[{ label: "Home", href: "#/" }, { label: "Contact" }]} />
      <div className="mt-4 max-w-xl">
        <h1 className="font-display text-3xl font-bold text-ink sm:text-4xl">Contact our wholesale team</h1>
        <p className="mt-3 text-[15px] text-dim">Questions about a compound, bulk pricing, or setting up an institutional account — we typically reply within one working day.</p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_380px]">
        <div className="rounded-2xl border border-line p-6 sm:p-8">
          {sent ? (
            <EmptyState icon="check" title="Message received" body="Thanks — a member of the Peptalys wholesale team will get back to you shortly." action={<Button variant="secondary" onClick={() => setSent(false)}>Send another message</Button>} />
          ) : (
            <form onSubmit={submit} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="flex flex-col gap-1.5">
                  <span className="text-[12.5px] font-medium text-dim">Full name</span>
                  <input required value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} className="rounded-lg border border-line2 bg-surface2 px-3.5 py-2.5 text-[13.5px] text-ink outline-none focus:border-accent2" />
                </label>
                <label className="flex flex-col gap-1.5">
                  <span className="text-[12.5px] font-medium text-dim">Email</span>
                  <input required type="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} className="rounded-lg border border-line2 bg-surface2 px-3.5 py-2.5 text-[13.5px] text-ink outline-none focus:border-accent2" />
                </label>
              </div>
              <label className="flex flex-col gap-1.5">
                <span className="text-[12.5px] font-medium text-dim">Company / institution</span>
                <input value={form.company} onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))} className="rounded-lg border border-line2 bg-surface2 px-3.5 py-2.5 text-[13.5px] text-ink outline-none focus:border-accent2" />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-[12.5px] font-medium text-dim">Subject</span>
                <select value={form.subject} onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))} className="rounded-lg border border-line2 bg-surface2 px-3.5 py-2.5 text-[13.5px] text-ink outline-none focus:border-accent2">
                  {["General enquiry", "Wholesale price list", "Bulk / custom order", "Existing order", "Product & purity question", "Other"].map((s) => <option key={s}>{s}</option>)}
                </select>
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-[12.5px] font-medium text-dim">Message</span>
                <textarea required rows={5} value={form.message} onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))} className="rounded-lg border border-line2 bg-surface2 px-3.5 py-2.5 text-[13.5px] text-ink outline-none focus:border-accent2" />
              </label>
              <Button type="submit" size="lg" className="self-start">Send message <Icon name="arrowRight" className="h-4 w-4" /></Button>
            </form>
          )}
        </div>

        <aside className="flex flex-col gap-4">
          <div className="rounded-2xl panel p-6">
            <h2 className="font-display text-[15px] font-semibold text-ink">Get in touch</h2>
            <ul className="mt-4 flex flex-col gap-4">
              <li className="flex items-start gap-3"><Icon name="mail" className="mt-0.5 h-4 w-4 text-accent2" /><div><p className="text-[13px] text-ink">{BRAND.email}</p><p className="text-[11.5px] text-faint">Wholesale &amp; order enquiries</p></div></li>
              <li className="flex items-start gap-3"><Icon name="phone" className="mt-0.5 h-4 w-4 text-accent2" /><div><p className="text-[13px] text-ink">{BRAND.phone}</p><p className="text-[11.5px] text-faint">Mon–Fri, 9am–5.30pm GMT</p></div></li>
              <li className="flex items-start gap-3"><Icon name="mapPin" className="mt-0.5 h-4 w-4 text-accent2" /><div><p className="text-[13px] text-ink">{BRAND.address}</p></div></li>
            </ul>
          </div>
          <div className="rounded-2xl border border-line bg-surface/40 p-6">
            <h2 className="font-display text-[15px] font-semibold text-ink">Prefer a full price list?</h2>
            <p className="mt-2 text-[13px] leading-relaxed text-dim">DM us on Instagram or email the wholesale team for the complete SKU and volume-pricing sheet.</p>
            <p className="mt-3 flex items-center gap-2 font-mono text-[13px] text-accent2"><Icon name="instagram" className="h-4 w-4" /> {BRAND.instagram}</p>
          </div>
        </aside>
      </div>
    </Container>
  );
}
