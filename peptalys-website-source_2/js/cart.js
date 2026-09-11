/* Cart store — plain pub/sub backed by localStorage (per-browser, which is
   the right scope for a basket: not shared, not durable across devices,
   never read back by anything else). Wrapped in try/catch throughout since
   storage can be blocked (private windows, embedded previews). */

const CART_KEY = "peptalys_cart_v1";

function readCartFromStorage() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch (e) {
    return [];
  }
}

function writeCartToStorage(items) {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  } catch (e) {
    /* ignore quota / privacy errors — state still lives in memory */
  }
}

function createStore(initial) {
  let state = initial;
  const listeners = new Set();
  return {
    getState: () => state,
    setState: (updater) => {
      state = typeof updater === "function" ? updater(state) : updater;
      listeners.forEach((l) => l(state));
    },
    subscribe: (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };
}

const cartStore = createStore(readCartFromStorage());

function persistAndSet(next) {
  cartStore.setState(next);
  writeCartToStorage(next);
}

const Cart = {
  getItems: () => cartStore.getState(),
  subscribe: cartStore.subscribe,

  addItem(productId, variantSku, qty) {
    const items = cartStore.getState();
    const existing = items.find((i) => i.productId === productId && i.variantSku === variantSku);
    let next;
    if (existing) {
      next = items.map((i) =>
        i.productId === productId && i.variantSku === variantSku ? { ...i, qty: i.qty + qty } : i
      );
    } else {
      next = [...items, { productId, variantSku, qty }];
    }
    persistAndSet(next);
  },

  setQty(productId, variantSku, qty) {
    const items = cartStore.getState();
    if (qty <= 0) {
      persistAndSet(items.filter((i) => !(i.productId === productId && i.variantSku === variantSku)));
      return;
    }
    persistAndSet(
      items.map((i) => (i.productId === productId && i.variantSku === variantSku ? { ...i, qty } : i))
    );
  },

  removeItem(productId, variantSku) {
    const items = cartStore.getState();
    persistAndSet(items.filter((i) => !(i.productId === productId && i.variantSku === variantSku)));
  },

  clear() {
    persistAndSet([]);
  },
};

/* Resolve raw cart rows against the live catalogue, dropping anything that
   no longer exists (a SKU retired from the feed, say). */
function resolveCartLines(items) {
  const lines = [];
  for (const item of items) {
    const product = PRODUCTS.find((p) => p.id === item.productId);
    if (!product) continue;
    const variant = product.variants.find((v) => v.sku === item.variantSku);
    if (!variant) continue;
    lines.push({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      variantSku: variant.sku,
      variantLabel: variant.label,
      unitPrice: variant.retailPrice,
      qty: item.qty,
      lineTotal: Math.round(variant.retailPrice * item.qty * 100) / 100,
      accent: product.images[0] ? product.images[0].accent : "#2F8FFF",
      stock: variant.stock,
    });
  }
  return lines;
}

function computeCartTotals(items) {
  const lines = resolveCartLines(items);
  const itemCount = lines.reduce((s, l) => s + l.qty, 0);
  const subtotal = Math.round(lines.reduce((s, l) => s + l.lineTotal, 0) * 100) / 100;
  const meetsMinimum = subtotal >= SETTINGS.minimumOrderValue;
  const remainingToMinimum = Math.max(0, Math.round((SETTINGS.minimumOrderValue - subtotal) * 100) / 100);
  const delivery = subtotal === 0 ? 0 : subtotal >= SETTINGS.freeDeliveryThreshold ? 0 : SETTINGS.standardDeliveryFee;
  const vat = Math.round(subtotal * SETTINGS.vatRate * 100) / 100;
  const total = Math.round((subtotal + vat + delivery) * 100) / 100;
  return { lines, itemCount, subtotal, vat, delivery, total, meetsMinimum, remainingToMinimum };
}

function useCart() {
  const items = React.useSyncExternalStore(Cart.subscribe, Cart.getItems, Cart.getItems);
  const totals = React.useMemo(() => computeCartTotals(items), [items]);
  return { items, ...totals };
}

/* ---------------------------------------------------------------------- */
/* Toast notifications — tiny pub/sub, no capability required.            */
/* ---------------------------------------------------------------------- */
const toastStore = createStore([]);
let toastId = 0;

function pushToast(message, opts) {
  const id = ++toastId;
  const toast = { id, message, tone: (opts && opts.tone) || "default" };
  toastStore.setState((list) => [...list, toast]);
  setTimeout(() => {
    toastStore.setState((list) => list.filter((t) => t.id !== id));
  }, 3200);
}

function useToasts() {
  return React.useSyncExternalStore(toastStore.subscribe, toastStore.getState, toastStore.getState);
}
