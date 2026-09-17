const ADMIN_DEMO_CODE = "peptalys-admin";

function useAdminOrders() {
  // localStorage orders placed in THIS browser, merged with clearly-labelled
  // sample orders, so the dashboard always has something real to show.
  const [localOrders, setLocalOrders] = React.useState(() => Orders.list());
  React.useEffect(() => {
    const onStorage = () => setLocalOrders(Orders.list());
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);
  const all = React.useMemo(
    () => [...localOrders.map((o) => ({ ...o, sample: false })), ...SAMPLE_ADMIN_ORDERS.map((o) => ({ ...o, sample: true }))],
    [localOrders]
  );
  return all;
}

function StatusPill({ status }) {
  const map = {
    paid: { tone: "ok", label: "Paid" },
    awaiting_payment: { tone: "warn", label: "Awaiting payment" },
    cancelled: { tone: "danger", label: "Cancelled" },
    dispatched: { tone: "ok", label: "Dispatched" },
    processing: { tone: "accent", label: "Processing" },
    unfulfilled: { tone: "warn", label: "Unfulfilled" },
  };
  const m = map[status] || { tone: "default", label: status };
  return <Badge tone={m.tone}>{m.label}</Badge>;
}

function AdminGate({ onUnlock }) {
  const [code, setCode] = React.useState("");
  const [error, setError] = React.useState(false);
  function submit(e) {
    e.preventDefault();
    if (code === ADMIN_DEMO_CODE) onUnlock();
    else setError(true);
  }
  return (
    <Container className="flex min-h-[70vh] items-center justify-center py-16">
      <div className="w-full max-w-sm rounded-2xl panel p-8 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent2"><Icon name="lock" className="h-5 w-5" /></div>
        <h1 className="mt-4 font-display text-xl font-bold text-ink">Staff sign-in</h1>
        <p className="mt-2 text-[13px] text-dim">Internal dashboard — demo access code required.</p>
        <form onSubmit={submit} className="mt-6 flex flex-col gap-3">
          <input
            type="password"
            value={code}
            onChange={(e) => { setCode(e.target.value); setError(false); }}
            placeholder="Access code"
            className={cx("rounded-lg border bg-surface2 px-3.5 py-2.5 text-center text-[13.5px] text-ink outline-none", error ? "border-red-500/60" : "border-line2 focus:border-accent2")}
          />
          {error && <p className="text-[12px] text-red-300">Incorrect code — try "peptalys-admin"</p>}
          <Button type="submit" full>Enter dashboard</Button>
        </form>
        <p className="mt-5 text-[11px] leading-relaxed text-faint">Demo gate only — the access code is shown here deliberately. Production must replace this with real authentication (SSO / magic link) behind a server, not a client-side check.</p>
      </div>
    </Container>
  );
}

function AdminPage() {
  const [unlocked, setUnlocked] = React.useState(false);
  const [tab, setTab] = React.useState("overview");
  const orders = useAdminOrders();
  const products = useProducts({});

  if (!unlocked) return <AdminGate onUnlock={() => setUnlocked(true)} />;

  const revenue = orders.filter((o) => o.status === "paid").reduce((s, o) => s + o.total, 0);
  const awaiting = orders.filter((o) => o.status === "awaiting_payment").length;
  const skuCount = products.status === "ready" ? products.data.reduce((s, p) => s + p.variants.length, 0) : null;

  const customers = {};
  orders.forEach((o) => {
    const key = o.customer.email;
    if (!customers[key]) customers[key] = { ...o.customer, orders: 0, ltv: 0 };
    customers[key].orders += 1;
    customers[key].ltv += o.total;
  });
  const customerList = Object.values(customers);

  const tabs = [
    { id: "overview", label: "Overview", icon: "trendingUp" },
    { id: "orders", label: "Orders", icon: "clipboard" },
    { id: "products", label: "Products", icon: "package" },
    { id: "customers", label: "Customers", icon: "users" },
    { id: "architecture", label: "Architecture", icon: "globe" },
  ];

  return (
    <Container className="py-10 sm:py-14">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent2">Internal</p>
          <h1 className="mt-1 font-display text-3xl font-bold text-ink">Admin Dashboard</h1>
        </div>
        <Button variant="secondary" size="sm" onClick={() => setUnlocked(false)}><Icon name="lock" className="h-3.5 w-3.5" /> Sign out</Button>
      </div>

      <div className="mt-6 flex gap-1 overflow-x-auto rounded-full border border-line bg-surface/50 p-1">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={cx("flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-[13px] font-medium transition-colors", tab === t.id ? "bg-accent text-white" : "text-dim hover:text-ink")}
          >
            <Icon name={t.icon} className="h-3.5 w-3.5" /> {t.label}
          </button>
        ))}
      </div>

      {tab === "overview" && (
        <div className="mt-8">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {[
              { label: "Booked revenue (this browser)", value: formatMoney(revenue), icon: "trendingUp" },
              { label: "Orders awaiting payment", value: String(awaiting), icon: "clock" },
              { label: "Active SKUs (live, Shopify)", value: skuCount != null ? String(skuCount) : "…", icon: "package" },
              { label: "Products published", value: products.status === "ready" ? String(products.data.length) : "…", icon: "flask" },
            ].map((k) => (
              <div key={k.label} className="rounded-2xl border border-line bg-surface/40 p-5">
                <Icon name={k.icon} className="h-5 w-5 text-accent2" />
                <p className="mt-3 font-display text-2xl font-bold tnum text-ink">{k.value}</p>
                <p className="mt-1 text-[12px] text-dim">{k.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-line">
            <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
              <h2 className="font-display text-[14px] font-semibold text-ink">Recent orders</h2>
              <button onClick={() => setTab("orders")} className="text-[12px] text-accent2 hover:underline">View all</button>
            </div>
            <ul className="divide-y divide-line">
              {orders.slice(0, 5).map((o) => (
                <li key={o.orderNumber} className="flex items-center justify-between gap-3 px-5 py-3.5">
                  <div>
                    <p className="font-mono text-[12.5px] text-ink">{o.orderNumber}</p>
                    <p className="text-[12px] text-faint">{o.customer.company || o.customer.name}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="tnum text-[13px] text-ink">{formatMoney(o.total)}</span>
                    <StatusPill status={o.status} />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {tab === "orders" && (
        <div className="mt-8 overflow-x-auto rounded-2xl border border-line">
          <table className="w-full min-w-[760px] text-left">
            <thead className="border-b border-line bg-surface/60">
              <tr>
                {["Order", "Customer", "Items", "Total", "Payment", "Fulfilment", ""].map((h) => (
                  <th key={h} className="px-4 py-3 text-[11px] font-medium uppercase tracking-wide text-faint">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {orders.map((o) => (
                <tr key={o.orderNumber}>
                  <td className="px-4 py-3.5">
                    <p className="font-mono text-[12.5px] text-ink">{o.orderNumber}</p>
                    <p className="text-[11px] text-faint">{new Date(o.createdAt).toLocaleDateString("en-GB")}</p>
                  </td>
                  <td className="px-4 py-3.5">
                    <p className="text-[13px] text-ink">{o.customer.company || o.customer.name}</p>
                    <p className="text-[11px] text-faint">{o.customer.email}</p>
                  </td>
                  <td className="px-4 py-3.5 text-[12.5px] text-dim">{o.lines.reduce((s, l) => s + l.qty, 0)} units</td>
                  <td className="px-4 py-3.5 tnum text-[13px] font-medium text-ink">{formatMoney(o.total)}</td>
                  <td className="px-4 py-3.5"><StatusPill status={o.status} /></td>
                  <td className="px-4 py-3.5"><StatusPill status={o.fulfilmentStatus} /></td>
                  <td className="px-4 py-3.5">{o.sample && <Badge tone="default">Sample</Badge>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === "products" && (
        <div className="mt-8 overflow-x-auto rounded-2xl border border-line">
          {products.status === "loading" && <div className="p-10 text-center text-[13px] text-dim">Loading live catalogue…</div>}
          {products.status === "error" && <div className="p-10"><EmptyState icon="alertTriangle" title="Couldn't load products" body={products.error} /></div>}
          {products.status === "ready" && (
            <>
              <table className="w-full min-w-[760px] text-left">
                <thead className="border-b border-line bg-surface/60">
                  <tr>
                    {["Product", "Handle", "Type", "Variants", "Availability", "From"].map((h) => (
                      <th key={h} className="px-4 py-3 text-[11px] font-medium uppercase tracking-wide text-faint">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {products.data.map((p) => {
                    const range = priceRange(p);
                    const avail = availability(p);
                    return (
                      <tr key={p.id}>
                        <td className="px-4 py-3.5 text-[13px] font-medium text-ink">{p.name}</td>
                        <td className="px-4 py-3.5 font-mono text-[11.5px] text-faint">{p.handle}</td>
                        <td className="px-4 py-3.5 text-[12.5px] text-dim">{p.subcategory || "—"}</td>
                        <td className="px-4 py-3.5 text-[12.5px] text-dim">{p.variants.length}</td>
                        <td className="px-4 py-3.5"><Badge tone={avail.tone}>{avail.label}</Badge></td>
                        <td className="px-4 py-3.5 tnum text-[13px] text-ink">{formatMoney(range.min)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <p className="border-t border-line px-4 py-3 text-[11px] text-faint">Live from Shopify. Wholesale cost / margin reporting now belongs in Shopify Admin — the Storefront API this site reads from has no concept of an internal cost field, so it is never fetched or rendered here.</p>
            </>
          )}
        </div>
      )}

      {tab === "customers" && (
        <div className="mt-8 overflow-x-auto rounded-2xl border border-line">
          {customerList.length === 0 ? (
            <div className="p-10"><EmptyState icon="users" title="No customers yet" body="Customers appear here once orders are placed." /></div>
          ) : (
            <table className="w-full min-w-[640px] text-left">
              <thead className="border-b border-line bg-surface/60">
                <tr>{["Customer", "Company", "Orders", "Lifetime value"].map((h) => <th key={h} className="px-4 py-3 text-[11px] font-medium uppercase tracking-wide text-faint">{h}</th>)}</tr>
              </thead>
              <tbody className="divide-y divide-line">
                {customerList.map((c) => (
                  <tr key={c.email}>
                    <td className="px-4 py-3.5"><p className="text-[13px] text-ink">{c.name}</p><p className="text-[11px] text-faint">{c.email}</p></td>
                    <td className="px-4 py-3.5 text-[12.5px] text-dim">{c.company || "—"}</td>
                    <td className="px-4 py-3.5 tnum text-[12.5px] text-dim">{c.orders}</td>
                    <td className="px-4 py-3.5 tnum text-[13px] text-ink">{formatMoney(c.ltv)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {tab === "architecture" && <AdminArchitectureTab />}
    </Container>
  );
}

function AdminArchitectureTab() {
  const flow = ["Shopify Admin (catalogue)", "Storefront API (GraphQL)", "/api/* serverless functions", "Website (this app)", "Shopify Checkout", "Shopify Orders"];
  return (
    <div className="mt-8 flex flex-col gap-8">
      <div className="rounded-2xl border border-line bg-surface/40 p-6">
        <h2 className="font-display text-[15px] font-semibold text-ink">Live production data flow</h2>
        <div className="mt-5 flex flex-wrap items-center gap-2">
          {flow.map((f, i) => (
            <React.Fragment key={f}>
              <span className="rounded-full border border-line2 bg-surface2 px-3.5 py-2 font-mono text-[11.5px] text-ink">{f}</span>
              {i < flow.length - 1 && <Icon name="arrowRight" className="h-3.5 w-3.5 text-faint" />}
            </React.Fragment>
          ))}
        </div>
        <p className="mt-4 text-[13px] leading-relaxed text-dim">{ARCHITECTURE_NOTES.dataSource}</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-line p-6">
          <h3 className="flex items-center gap-2 font-display text-[14px] font-semibold text-ink"><Icon name="creditCard" className="h-4 w-4 text-accent2" /> Payments &amp; checkout (Shopify)</h3>
          <p className="mt-3 text-[13px] leading-relaxed text-dim">This site never collects card details and never embeds the Shopify Storefront token in front-end code. The live flow:</p>
          <ol className="mt-3 ml-4 list-decimal space-y-1.5 text-[13px] leading-relaxed text-dim">
            <li>The basket is a real Shopify cart, created and updated via <code className="font-mono text-accent2">POST /api/cart</code> on this app's own server.</li>
            <li><code className="font-mono text-accent2">/api/cart</code> calls the Shopify Storefront GraphQL API using <code className="font-mono text-accent2">SHOPIFY_STOREFRONT_ACCESS_TOKEN</code> (env var, server-only — never sent to the browser).</li>
            <li>Checkout redirects the browser to the cart's own <code className="font-mono text-accent2">checkoutUrl</code>, Shopify's hosted, secure checkout.</li>
            <li>Shopify collects delivery details and payment, and becomes the system of record for the resulting order.</li>
          </ol>
        </div>
        <div className="rounded-2xl border border-line p-6">
          <h3 className="flex items-center gap-2 font-display text-[14px] font-semibold text-ink"><Icon name="package" className="h-4 w-4 text-accent2" /> Catalogue</h3>
          <p className="mt-3 text-[13px] leading-relaxed text-dim">{ARCHITECTURE_NOTES.dataSource}</p>
          <p className="mt-3 text-[13px] leading-relaxed text-dim">Staff manage products, variants, images, stock and collections directly in Shopify Admin — there is no separate products database or CSV import step for this site to maintain.</p>
        </div>
        <div className="rounded-2xl border border-line p-6">
          <h3 className="flex items-center gap-2 font-display text-[14px] font-semibold text-ink"><Icon name="fileText" className="h-4 w-4 text-accent2" /> Order lifecycle</h3>
          <p className="mt-3 text-[13px] leading-relaxed text-dim">{ARCHITECTURE_NOTES.orders} Reading real orders back into this dashboard would require Shopify's Admin API (a separate, more privileged token, authenticated server-side) — deliberately out of scope for this round of changes.</p>
        </div>
        <div className="rounded-2xl border border-line p-6">
          <h3 className="flex items-center gap-2 font-display text-[14px] font-semibold text-ink"><Icon name="lock" className="h-4 w-4 text-accent2" /> Margin protection</h3>
          <p className="mt-3 text-[13px] leading-relaxed text-dim">{ARCHITECTURE_NOTES.pricing}</p>
        </div>
      </div>

      <div className="rounded-2xl border border-amber-500/25 bg-amber-500/5 p-6">
        <h3 className="flex items-center gap-2 font-display text-[14px] font-semibold text-amber-100"><Icon name="info" className="h-4 w-4" /> Orders tab, below</h3>
        <p className="mt-3 text-[13px] leading-relaxed text-amber-100/85">
          The "Orders" and "Customers" tabs on this dashboard still show only a local, browser-only demo log (clearly labelled "Sample") — they are not connected to real Shopify orders. Real order management should happen in Shopify Admin directly.
        </p>
      </div>
    </div>
  );
}
