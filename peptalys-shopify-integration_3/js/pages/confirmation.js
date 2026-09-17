function ConfirmationPage({ orderNumber }) {
  const order = Orders.get(orderNumber);

  if (!order) {
    return (
      <Container className="py-16 sm:py-24">
        <EmptyState icon="fileText" title="Order not found" body="We couldn't find that order reference in this browser." action={<Button as="a" href="#/shop">Back to shop</Button>} />
      </Container>
    );
  }

  return (
    <Container className="py-14 sm:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-300">
          <Icon name="check" className="h-8 w-8" strokeWidth={2.4} />
        </div>
        <h1 className="mt-6 font-display text-3xl font-bold text-ink sm:text-4xl">Order request received</h1>
        <p className="mt-3 text-[15px] text-dim">
          Reference <span className="font-mono text-ink">{order.orderNumber}</span> — a member of our wholesale team will email a secure Stripe payment link to <span className="text-ink">{order.customer.email}</span> shortly to confirm and process payment.
        </p>
      </div>

      <div className="mx-auto mt-10 max-w-2xl rounded-2xl panel p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-5">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">Order reference</p>
            <p className="font-display text-lg font-semibold text-ink">{order.orderNumber}</p>
          </div>
          <Badge tone="warn">Awaiting payment link</Badge>
        </div>

        <ul className="mt-5 flex flex-col gap-3">
          {order.lines.map((l, i) => (
            <li key={i} className="flex items-center justify-between text-[13.5px]">
              <span className="text-dim">{l.name} <span className="font-mono text-[11px] text-faint">({l.variantLabel} × {l.qty})</span></span>
              <span className="tnum text-ink">{formatMoney(l.lineTotal)}</span>
            </li>
          ))}
        </ul>

        <div className="mt-5 flex flex-col gap-2 border-t border-line pt-4 text-[13.5px] text-dim">
          <div className="flex justify-between"><span>Subtotal</span><span className="tnum text-ink">{formatMoney(order.subtotal)}</span></div>
          <div className="flex justify-between"><span>VAT</span><span className="tnum text-ink">{formatMoney(order.vat)}</span></div>
          <div className="flex justify-between"><span>Delivery</span><span className="tnum text-ink">{order.delivery === 0 ? "Free" : formatMoney(order.delivery)}</span></div>
          <div className="mt-1 flex justify-between border-t border-line pt-2 text-[15px] font-semibold text-ink"><span>Total</span><span className="tnum">{formatMoney(order.total)}</span></div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 border-t border-line pt-5 sm:grid-cols-2">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-faint">Billing address</p>
            <p className="mt-1.5 text-[13px] leading-relaxed text-dim">{order.billingAddress.line1}{order.billingAddress.line2 ? `, ${order.billingAddress.line2}` : ""}<br />{order.billingAddress.city}, {order.billingAddress.postcode}<br />{order.billingAddress.country}</p>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-faint">Delivery address</p>
            <p className="mt-1.5 text-[13px] leading-relaxed text-dim">{order.shippingAddress.line1}{order.shippingAddress.line2 ? `, ${order.shippingAddress.line2}` : ""}<br />{order.shippingAddress.city}, {order.shippingAddress.postcode}<br />{order.shippingAddress.country}</p>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-8 flex max-w-2xl flex-wrap items-center justify-center gap-3">
        <Button as="a" href="#/shop" variant="secondary">Continue shopping</Button>
        <Button as="a" href="#/contact">Contact wholesale team</Button>
      </div>

      <p className="mx-auto mt-8 max-w-md text-center text-[11.5px] leading-relaxed text-faint">
        This confirmation is stored only in this browser for your reference. Peptalys will also confirm your order by email.
      </p>
    </Container>
  );
}
