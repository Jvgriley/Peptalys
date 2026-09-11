/* ==========================================================================
   Orders — client-side order log.

   IMPORTANT / HONEST LIMITATION: this artifact runs as a static, publicly
   shareable front-end with no application server and no shared database
   attached (see ARCHITECTURE_NOTES in data.js and the /admin "Architecture"
   tab). There is nowhere durable and shared to write a real order to, and
   no server-side secret store to hold a Stripe secret key and actually
   take payment. So:

     - "Placing an order" here records it to THIS BROWSER's localStorage
       only (Orders.create) — it is not sent anywhere, not visible to other
       visitors, and not visible to Peptalys staff. It exists purely so the
       confirmation screen and the demo /admin view have something real of
       the shopper's own to show.
     - No card details are collected anywhere on this site. Checkout ends
       with an order request; in production this step calls a backend
       endpoint that creates a Stripe Checkout Session and redirects there
       — see CheckoutPage for exactly where that call belongs.

   This file is written so that swap is small: replace `Orders.create` with
   a `fetch('/api/orders', …)` call, and the rest of the checkout flow is
   unchanged.
   ========================================================================== */

const ORDERS_KEY = "peptalys_orders_v1";

function readOrders() {
  try {
    const raw = localStorage.getItem(ORDERS_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    return [];
  }
}

function writeOrders(orders) {
  try {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  } catch (e) {
    /* ignore */
  }
}

const Orders = {
  list() {
    return readOrders().slice().reverse();
  },
  get(orderNumber) {
    return readOrders().find((o) => o.orderNumber === orderNumber) || null;
  },
  create(order) {
    const orders = readOrders();
    const record = {
      orderNumber: generateOrderNumber(),
      createdAt: new Date().toISOString(),
      status: "awaiting_payment",
      fulfilmentStatus: "unfulfilled",
      stripe: { sessionId: null, paymentIntentId: null },
      ...order,
    };
    orders.push(record);
    writeOrders(orders);
    return record;
  },
};

/* Illustrative sample orders shown in /admin alongside anything the current
   browser has actually placed — clearly labelled as sample data there, so
   the dashboard never claims to show real, live customer activity. */
const SAMPLE_ADMIN_ORDERS = [
  {
    orderNumber: "PPT-20260904-38821",
    createdAt: "2026-09-04T10:12:00.000Z",
    status: "paid",
    fulfilmentStatus: "dispatched",
    customer: { name: "Dr. A. Whitfield", company: "Northbridge Biosciences Ltd", email: "procurement@northbridgebio.co.uk" },
    lines: [
      { name: "Retatrutide", variantLabel: "20mg", qty: 40, unitPrice: 15.95, lineTotal: 638.0 },
      { name: "BPC-157", variantLabel: "10mg", qty: 50, unitPrice: 7.9, lineTotal: 395.0 },
    ],
    subtotal: 1033.0, vat: 206.6, delivery: 0, total: 1239.6,
  },
  {
    orderNumber: "PPT-20260908-19004",
    createdAt: "2026-09-08T14:47:00.000Z",
    status: "paid",
    fulfilmentStatus: "processing",
    customer: { name: "S. Okafor", company: "Meridian Research Group", email: "labs@meridianresearch.org" },
    lines: [
      { name: "Tirzepatide", variantLabel: "30mg", qty: 45, unitPrice: 22.95, lineTotal: 1032.75 },
    ],
    subtotal: 1032.75, vat: 206.55, delivery: 0, total: 1239.3,
  },
  {
    orderNumber: "PPT-20260910-77213",
    createdAt: "2026-09-10T09:03:00.000Z",
    status: "awaiting_payment",
    fulfilmentStatus: "unfulfilled",
    customer: { name: "Dr. L. Marsh", company: "Falcon Peptide Labs", email: "orders@falconpeptidelabs.co.uk" },
    lines: [
      { name: "GHK-Cu", variantLabel: "100mg", qty: 120, unitPrice: 5.0, lineTotal: 600.0 },
      { name: "NAD+", variantLabel: "500mg", qty: 55, unitPrice: 7.95, lineTotal: 437.25 },
    ],
    subtotal: 1037.25, vat: 207.45, delivery: 0, total: 1244.7,
  },
];
