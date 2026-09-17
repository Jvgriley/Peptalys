/* ==========================================================================
   Frontend Shopify client — talks ONLY to this site's own /api/* routes,
   never to Shopify directly. No Shopify token appears anywhere in this
   file (there is nothing to leak — the token lives only in
   api/_lib/shopify.js, which runs server-side and is never bundled here).
   ========================================================================== */

async function apiRequest(path, options) {
  let res;
  try {
    res = await fetch(path, {
      headers: { "Content-Type": "application/json" },
      ...options,
    });
  } catch (networkErr) {
    const err = new Error("Network error — please check your connection and try again.");
    err.code = "NETWORK_ERROR";
    throw err;
  }

  let body = null;
  try {
    body = await res.json();
  } catch (e) {
    /* no/invalid JSON body */
  }

  if (!res.ok || (body && body.error)) {
    const err = new Error((body && body.message) || `Request failed (${res.status}).`);
    err.code = (body && body.code) || "REQUEST_FAILED";
    err.status = res.status;
    throw err;
  }
  return body;
}

// Simple in-memory caches (per page load — cleared on full reload) so that
// independent components (e.g. the shop sidebar and the footer both
// wanting the collection list) share one network call instead of each
// re-fetching the same, rarely-changing catalogue data.
const _productsCache = new Map();
let _collectionsPromise = null;

const ShopifyAPI = {
  async getProducts({ collection, fresh } = {}) {
    const key = collection || "__all__";
    if (!fresh && _productsCache.has(key)) return _productsCache.get(key);
    const qs = collection ? `?collection=${encodeURIComponent(collection)}` : "";
    const promise = apiRequest(`/api/products${qs}`).catch((err) => {
      _productsCache.delete(key); // don't cache failures
      throw err;
    });
    _productsCache.set(key, promise);
    return promise; // { products, collection }
  },
  async getProduct(handle) {
    const data = await apiRequest(`/api/products/${encodeURIComponent(handle)}`);
    return data.product;
  },
  async getCollections({ fresh } = {}) {
    if (!fresh && _collectionsPromise) return _collectionsPromise;
    _collectionsPromise = apiRequest("/api/collections")
      .then((data) => data.collections)
      .catch((err) => {
        _collectionsPromise = null;
        throw err;
      });
    return _collectionsPromise;
  },
};

/* -------------------------------------------------------------------- */
/* Small data-fetching hooks shared by pages/components. Each returns     */
/* { status: "loading"|"ready"|"error", data, error } so callers render   */
/* loading / empty / error states consistently.                          */
/* -------------------------------------------------------------------- */
function useCollections() {
  const [state, setState] = React.useState({ status: "loading", data: [], error: null });
  React.useEffect(() => {
    let cancelled = false;
    ShopifyAPI.getCollections()
      .then((collections) => { if (!cancelled) setState({ status: "ready", data: collections, error: null }); })
      .catch((err) => { if (!cancelled) setState({ status: "error", data: [], error: err.message }); });
    return () => { cancelled = true; };
  }, []);
  return state;
}

function useProducts({ collection } = {}) {
  const [state, setState] = React.useState({ status: "loading", data: [], collectionInfo: null, error: null });
  React.useEffect(() => {
    let cancelled = false;
    setState((s) => ({ ...s, status: "loading" }));
    ShopifyAPI.getProducts({ collection })
      .then(({ products, collection: info }) => {
        if (!cancelled) setState({ status: "ready", data: products, collectionInfo: info, error: null });
      })
      .catch((err) => {
        if (!cancelled) setState({ status: "error", data: [], collectionInfo: null, error: err.message });
      });
    return () => { cancelled = true; };
  }, [collection]);
  return state;
}

function useProduct(handle) {
  const [state, setState] = React.useState({ status: "loading", data: null, error: null });
  React.useEffect(() => {
    let cancelled = false;
    setState({ status: "loading", data: null, error: null });
    if (!handle) return;
    ShopifyAPI.getProduct(handle)
      .then((product) => { if (!cancelled) setState({ status: "ready", data: product, error: null }); })
      .catch((err) => {
        if (!cancelled) setState({ status: err.code === "NOT_FOUND" ? "not_found" : "error", data: null, error: err.message });
      });
    return () => { cancelled = true; };
  }, [handle]);
  return state;
}

const CartAPI = {
  async get(cartId) {
    const data = await apiRequest(`/api/cart?id=${encodeURIComponent(cartId)}`);
    return data.cart;
  },
  async create(lines) {
    const data = await apiRequest("/api/cart", { method: "POST", body: JSON.stringify({ action: "create", lines }) });
    return data.cart;
  },
  async add(cartId, lines) {
    const data = await apiRequest("/api/cart", { method: "POST", body: JSON.stringify({ action: "add", cartId, lines }) });
    return data.cart;
  },
  async update(cartId, lines) {
    const data = await apiRequest("/api/cart", { method: "POST", body: JSON.stringify({ action: "update", cartId, lines }) });
    return data.cart;
  },
  async remove(cartId, lineIds) {
    const data = await apiRequest("/api/cart", { method: "POST", body: JSON.stringify({ action: "remove", cartId, lineIds }) });
    return data.cart;
  },
};
