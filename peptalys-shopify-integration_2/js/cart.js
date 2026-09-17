/* ==========================================================================
   Cart store — backed by a real Shopify cart (Storefront API), reached only
   through this site's own /api/cart route (see js/shopify-client.js). Only
   the Shopify cart ID is persisted client-side, in localStorage — that ID
   is not a secret (it's the standard mechanism headless Shopify storefronts
   use to keep a cart alive across page loads; it can only be used to
   manipulate that one cart, the same way Shopify's own cart cookie works).
   The Shopify Storefront access token itself never appears in this file.
   ========================================================================== */

const CART_ID_KEY = "peptalys_shopify_cart_id";

function readStoredCartId() {
  try {
    return localStorage.getItem(CART_ID_KEY);
  } catch (e) {
    return null;
  }
}
function writeStoredCartId(id) {
  try {
    if (id) localStorage.setItem(CART_ID_KEY, id);
    else localStorage.removeItem(CART_ID_KEY);
  } catch (e) {
    /* ignore — cart still works for this page load, just won't persist */
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

/* status: "idle" (not yet hydrated) | "loading" | "ready" | "error" */
const cartStore = createStore({ status: "idle", cart: null, error: null, actionPending: false });

let initPromise = null;

function setCart(cart) {
  cartStore.setState((s) => ({ ...s, status: "ready", cart, error: null, actionPending: false }));
}
function setError(message) {
  cartStore.setState((s) => ({ ...s, status: s.cart ? "ready" : "error", error: message, actionPending: false }));
}
function setPending(pending) {
  cartStore.setState((s) => ({ ...s, actionPending: pending }));
}

async function ensureInitialized() {
  if (initPromise) return initPromise;
  initPromise = (async () => {
    const storedId = readStoredCartId();
    if (!storedId) {
      cartStore.setState((s) => ({ ...s, status: "ready" }));
      return;
    }
    cartStore.setState((s) => ({ ...s, status: "loading" }));
    try {
      const cart = await CartAPI.get(storedId);
      if (!cart) {
        // Cart no longer exists on Shopify (expired, or checkout completed) —
        // start clean rather than showing a permanent error.
        writeStoredCartId(null);
        setCart(null);
        return;
      }
      setCart(cart);
    } catch (err) {
      // Treat a not-found/expired cart the same way — don't trap the
      // shopper behind an error for a cart that simply no longer exists.
      writeStoredCartId(null);
      setCart(null);
    }
  })();
  return initPromise;
}

async function withPending(fn) {
  setPending(true);
  try {
    const result = await fn();
    return result;
  } catch (err) {
    setError(err && err.message ? err.message : "Something went wrong updating your basket.");
    throw err;
  } finally {
    setPending(false);
  }
}

const CartStore = {
  getState: cartStore.getState,
  subscribe: cartStore.subscribe,
  init: ensureInitialized,

  async addLine(merchandiseId, quantity) {
    await ensureInitialized();
    const { cart } = cartStore.getState();
    return withPending(async () => {
      let next;
      if (!cart || !cart.id) {
        next = await CartAPI.create([{ merchandiseId, quantity }]);
      } else {
        next = await CartAPI.add(cart.id, [{ merchandiseId, quantity }]);
      }
      writeStoredCartId(next.id);
      setCart(next);
      return next;
    });
  },

  async updateLine(lineId, quantity) {
    await ensureInitialized();
    const { cart } = cartStore.getState();
    if (!cart || !cart.id) return;
    return withPending(async () => {
      const next = quantity <= 0
        ? await CartAPI.remove(cart.id, [lineId])
        : await CartAPI.update(cart.id, [{ id: lineId, quantity }]);
      setCart(next);
      return next;
    });
  },

  async removeLine(lineId) {
    await ensureInitialized();
    const { cart } = cartStore.getState();
    if (!cart || !cart.id) return;
    return withPending(async () => {
      const next = await CartAPI.remove(cart.id, [lineId]);
      setCart(next);
      return next;
    });
  },

  clear() {
    // Shopify has no "delete cart" mutation — abandoning the cart (it
    // expires on Shopify's side) and starting a fresh one is the standard
    // approach for a "clear basket" action.
    writeStoredCartId(null);
    setCart(null);
  },
};

/* -------------------------------------------------------------------- */
/* Derived view model — mirrors the shape the pre-Shopify cart exposed    */
/* (itemCount / lines / subtotal / total / meetsMinimum…) so page          */
/* components need minimal changes.                                       */
/* -------------------------------------------------------------------- */
function deriveCartView(state) {
  const cart = state.cart;
  const lines = cart
    ? cart.lines.map((l) => ({
        id: l.id,
        merchandiseId: l.merchandiseId,
        productHandle: l.productHandle,
        slug: l.productHandle,
        name: l.productTitle,
        variantLabel: l.variantTitle,
        variantSku: l.sku,
        unitPrice: l.unitPrice,
        qty: l.quantity,
        lineTotal: l.lineTotal,
        image: l.image,
        availableForSale: l.availableForSale,
        quantityAvailable: l.quantityAvailable,
      }))
    : [];
  const itemCount = cart ? cart.totalQuantity : 0;
  const subtotal = cart ? cart.subtotal : 0;
  const total = cart ? cart.total : 0;
  const estimatedTax = cart ? cart.estimatedTax : null;
  const meetsMinimum = subtotal >= SETTINGS.minimumOrderValue;
  const remainingToMinimum = Math.max(0, Math.round((SETTINGS.minimumOrderValue - subtotal) * 100) / 100);
  const hasUnavailable = lines.some((l) => !l.availableForSale);

  return {
    status: state.status,
    error: state.error,
    actionPending: state.actionPending,
    cartId: cart ? cart.id : null,
    checkoutUrl: cart ? cart.checkoutUrl : null,
    lines,
    itemCount,
    subtotal,
    estimatedTax,
    total,
    currencyCode: cart ? cart.currencyCode : SETTINGS.currency,
    meetsMinimum,
    remainingToMinimum,
    hasUnavailable,
  };
}

function useCart() {
  React.useEffect(() => {
    ensureInitialized();
  }, []);
  const state = React.useSyncExternalStore(cartStore.subscribe, cartStore.getState, cartStore.getState);
  return React.useMemo(() => deriveCartView(state), [state]);
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
