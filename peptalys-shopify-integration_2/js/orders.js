/* ==========================================================================
   Orders — demo-only client-side order log for the internal /admin preview.

   Real orders now live in Shopify: checkout redirects the customer to
   Shopify's own hosted checkout (via the cart's checkoutUrl), so Shopify is
   the system of record for actual purchases and payment. Orders.create
   below is NOT called anywhere in the live checkout flow any more — it's
   kept only so the /admin "Orders" tab has something illustrative to show
   alongside the clearly-labelled SAMPLE_ADMIN_ORDERS. Reading real orders
   back into /admin would require Shopify's Admin API (a separate, even
   more sensitive token) authenticated from a server — out of scope here,
   per "do not add customer accounts / a separate payment system" in this
   round of changes.
   ========================================================================== */

const ORDERS_KEY = "peptalys_orders_v1";

function generateOrderNumber() {
  const rand = Math.floor(Math.random() * 90000) + 10000;
  const date = new Date();
  const ymd = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, "0")}${String(date.getDate()).padStart(2, "0")}`;
  return `PPT-${ymd}-${rand}`;
}

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
