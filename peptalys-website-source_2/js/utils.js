/* Shared helpers — no JSX, safe to keep as a plain script. */

function formatMoney(value, currencySymbol) {
  const sym = currencySymbol || SETTINGS.currencySymbol;
  const n = Number(value) || 0;
  return sym + n.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function cx(...parts) {
  return parts.filter(Boolean).join(" ");
}

function getProductBySlug(slug) {
  return PRODUCTS.find((p) => p.slug === slug) || null;
}

function getCategoryBySlug(slug) {
  return CATEGORIES.find((c) => c.slug === slug) || null;
}

function getCategoryName(id) {
  const c = CATEGORIES.find((c) => c.id === id);
  return c ? c.shortName : id;
}

function priceRange(product) {
  const prices = product.variants.map((v) => v.retailPrice);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  return { min, max, single: min === max };
}

function rrpFor(product, variant) {
  return variant ? variant.rrp : Math.max(...product.variants.map((v) => v.rrp));
}

function totalStock(product) {
  return product.variants.reduce((sum, v) => sum + v.stock, 0);
}

function availability(product) {
  const stock = totalStock(product);
  if (stock <= 0) return { label: "Out of stock", tone: "danger" };
  if (stock < 60) return { label: "Low stock", tone: "warn" };
  return { label: "In stock", tone: "ok" };
}

function debounce(fn, wait) {
  let t;
  return function (...args) {
    clearTimeout(t);
    t = setTimeout(() => fn.apply(this, args), wait);
  };
}

function slugify(str) {
  return String(str)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function relatedProducts(product, count) {
  const sameCategory = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id);
  const rest = PRODUCTS.filter((p) => p.category !== product.category && p.id !== product.id);
  return [...sameCategory, ...rest].slice(0, count || 4);
}

function generateOrderNumber() {
  const rand = Math.floor(Math.random() * 90000) + 10000;
  const date = new Date();
  const ymd = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, "0")}${String(date.getDate()).padStart(2, "0")}`;
  return `PPT-${ymd}-${rand}`;
}

function todayLong() {
  return new Date().toLocaleDateString("en-GB", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
}
