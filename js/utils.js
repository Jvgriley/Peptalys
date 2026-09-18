/* Shared helpers — no JSX, safe to keep as a plain script. */

function formatMoney(value, currencySymbol) {
  const sym = currencySymbol || SETTINGS.currencySymbol;
  const n = Number(value) || 0;
  return sym + n.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function cx(...parts) {
  return parts.filter(Boolean).join(" ");
}

function priceRange(product) {
  const prices = product.variants.map((v) => v.retailPrice).filter((n) => typeof n === "number" && !Number.isNaN(n));
  if (!prices.length) return { min: 0, max: 0, single: true };
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  return { min, max, single: min === max };
}

function rrpFor(product, variant) {
  if (variant) return variant.rrp;
  const rrps = product.variants.map((v) => v.rrp).filter((n) => typeof n === "number");
  return rrps.length ? Math.max(...rrps) : null;
}

/** Whether ANY variant of a product can currently be purchased. */
function productPurchasable(product) {
  return !!product.availableForSale && product.variants.some((v) => v.availableForSale);
}

/** Badge shown on cards/detail pages — availableForSale is authoritative;
    quantityAvailable (only present if the merchant exposes inventory
    counts to the Storefront API) adds a "Low stock" tier when known. */
function availability(product) {
  if (!productPurchasable(product)) return { label: "Out of stock", tone: "danger" };
  const known = product.variants.filter((v) => typeof v.quantityAvailable === "number");
  if (known.length) {
    const stock = known.reduce((s, v) => s + Math.max(0, v.quantityAvailable), 0);
    if (stock <= 0) return { label: "Out of stock", tone: "danger" };
    if (stock < 20) return { label: "Low stock", tone: "warn" };
  }
  return { label: "In stock", tone: "ok" };
}

function variantAvailability(variant) {
  if (!variant.availableForSale) return { label: "Out of stock", tone: "danger" };
  if (typeof variant.quantityAvailable === "number") {
    if (variant.quantityAvailable <= 0) return { label: "Out of stock", tone: "danger" };
    if (variant.quantityAvailable < 10) return { label: `Low stock — ${variant.quantityAvailable} left`, tone: "warn" };
  }
  return { label: "In stock", tone: "ok" };
}

function debounce(fn, wait) {
  let t;
  return function (...args) {
    clearTimeout(t);
    t = setTimeout(() => fn.apply(this, args), wait);
  };
}

function todayLong() {
  return new Date().toLocaleDateString("en-GB", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
}
