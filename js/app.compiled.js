"use strict";
/* Hand-authored line-icon set (24x24, stroke, currentColor) + the Peptalys
   monogram mark. Kept dependency-free so the page needs no icon-font CDN. */
const ICON_PATHS = {
    search: "M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM21 21l-4.3-4.3",
    filter: "M4 6h16M7 12h10M10 18h4",
    chevronDown: "M6 9l6 6 6-6",
    chevronUp: "M18 15l-6-6-6 6",
    chevronRight: "M9 6l6 6-6 6",
    chevronLeft: "M15 6l-6 6 6 6",
    close: "M6 6l12 12M18 6L6 18",
    menu: "M4 7h16M4 12h16M4 17h16",
    cart: "M3 4h2l2.4 12.2a2 2 0 0 0 2 1.6h7.2a2 2 0 0 0 2-1.6L20.5 8H6M9.5 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM17.5 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z",
    user: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4.5 20.5a7.5 7.5 0 0 1 15 0",
    check: "M5 13l4 4L19 7",
    shield: "M12 3l7 3v6c0 4.5-3 7.7-7 9-4-1.3-7-4.5-7-9V6l7-3Z",
    shieldCheck: "M12 3l7 3v6c0 4.5-3 7.7-7 9-4-1.3-7-4.5-7-9V6l7-3ZM9 12l2 2 4-4",
    flask: "M9 2h6M10 2v6.2L4.8 18a2 2 0 0 0 1.8 3h10.8a2 2 0 0 0 1.8-3L14 8.2V2M7.5 15h9",
    truck: "M3 6h11v9H3zM14 10h4l3 3v2h-7zM7 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM18 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z",
    users: "M9 12a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM2.8 20a6.2 6.2 0 0 1 12.4 0M16 8.2a3 3 0 1 1 0 6M21.2 20a5.6 5.6 0 0 0-4-5.4",
    flag: "M5 21V4M5 4h13l-2.5 3.5L18 11H5",
    sparkle: "M12 3l1.6 4.9L18.5 9.5l-4.9 1.6L12 16l-1.6-4.9L5.5 9.5l4.9-1.6L12 3ZM19 15l.7 2.1 2.1.7-2.1.7-.7 2.1-.7-2.1-2.1-.7 2.1-.7.7-2.1Z",
    atom: "M12 12a1.4 1.4 0 1 0 0-2.8 1.4 1.4 0 0 0 0 2.8ZM12 3c3 2.5 4.8 6 4.8 9s-1.8 6.5-4.8 9c-3-2.5-4.8-6-4.8-9S9 5.5 12 3ZM3.5 8.2c3.6-1.4 7.4-1.4 11 0s6.2 3.8 7 7.4c-3.6 1.4-7.4 1.4-11 0S4.3 11.8 3.5 8.2Z",
    scale: "M12 3v3M6 6h12M6 6L3 12a3 3 0 0 0 6 0L6 6ZM18 6l-3 6a3 3 0 0 0 6 0l-3-6ZM9 21h6",
    trendingUp: "M3 17l6-6 4 4 8-8M15 7h6v6",
    droplet: "M12 3s6 6.5 6 11a6 6 0 1 1-12 0c0-4.5 6-11 6-11Z",
    leaf: "M20 4C10 4 4 10 4 18c8 0 14-6 14-14ZM4 20l6-6",
    lock: "M6 11V8a6 6 0 1 1 12 0v3M5 11h14v9H5z",
    plus: "M12 5v14M5 12h14",
    minus: "M5 12h14",
    trash: "M4 7h16M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M7 7l1 13a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2l1-13",
    arrowRight: "M4 12h16M14 6l6 6-6 6",
    arrowLeft: "M20 12H4M10 18l-6-6 6-6",
    star: "M12 3l2.6 5.6 6.2.6-4.6 4.2 1.3 6.1L12 16.7 6.5 19.5l1.3-6.1-4.6-4.2 6.2-.6L12 3Z",
    info: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM12 11v6M12 7v.01",
    mail: "M4 5h16v14H4zM4 6l8 7 8-7",
    phone: "M6 3h3l1.5 5-2 1.5a12 12 0 0 0 6 6l1.5-2 5 1.5v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4 6.2 2 2 0 0 1 6 3Z",
    mapPin: "M12 21s7-6.2 7-11.5A7 7 0 1 0 5 9.5C5 14.8 12 21 12 21ZM12 11.8a2.3 2.3 0 1 0 0-4.6 2.3 2.3 0 0 0 0 4.6Z",
    instagram: "M4 8a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V8ZM12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM17 6.3v.01",
    heart: "M12 20s-7.5-4.6-9.6-9A5.3 5.3 0 0 1 12 6.5 5.3 5.3 0 0 1 21.6 11c-2.1 4.4-9.6 9-9.6 9Z",
    download: "M12 3v12M7 10l5 5 5-5M4 19h16",
    clipboard: "M9 4h6a1 1 0 0 1 1 1v1H8V5a1 1 0 0 1 1-1ZM6 6h12v14H6zM9 12h6M9 16h6",
    package: "M21 8l-9-5-9 5 9 5 9-5ZM3 8v9l9 5 9-5V8M12 13v9",
    creditCard: "M3 6h18v12H3zM3 10h18M7 15h4",
    alertTriangle: "M12 4l9 16H3L12 4ZM12 10v4M12 17v.01",
    building: "M4 21V6l8-3 8 3v15M9 21v-5h6v5M9 10h.01M9 14h.01M15 10h.01M15 14h.01",
    microscope: "M9 21h6M10 21v-3.5a4 4 0 1 1 4 0V21M5 21h1M9 3l5 5M7 8l3-3 5 5-3 3-5-5Z",
    globe: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM3 12h18M12 3a13 13 0 0 1 0 18 13 13 0 0 1 0-18Z",
    clock: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM12 7v5l3 3",
    fileText: "M7 3h7l5 5v13H7zM14 3v5h5M9 13h6M9 17h6",
    quote: "M7 8c-2 1.2-3 3-3 5.2 0 2.1 1.4 3.8 3.4 3.8 1.8 0 3.1-1.4 3.1-3.1C10.5 12 9 10.6 7 10.5c.1-1.4 1-2.4 2.2-3.2L7 8Zm9 0c-2 1.2-3 3-3 5.2 0 2.1 1.4 3.8 3.4 3.8 1.8 0 3.1-1.4 3.1-3.1 0-1.9-1.5-3.3-3.5-3.4.1-1.4 1-2.4 2.2-3.2L16 8Z",
};
function Icon({ name, className, strokeWidth = 1.8, filled = false }) {
    const d = ICON_PATHS[name];
    if (!d)
        return null;
    return (React.createElement("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: strokeWidth, strokeLinecap: "round", strokeLinejoin: "round", className: className || "h-5 w-5", "aria-hidden": "true" },
        React.createElement("path", { d: d })));
}
/* Peptalys monogram — an original, simplified interpretation of the brand's
   "P" ribbon-and-molecule mark for use at small sizes (nav, favicon-ish). */
function LogoMark({ className }) {
    return (React.createElement("svg", { viewBox: "0 0 48 48", className: className || "h-8 w-8", "aria-hidden": "true" },
        React.createElement("defs", null,
            React.createElement("linearGradient", { id: "ppt-grad", x1: "4", y1: "4", x2: "44", y2: "44", gradientUnits: "userSpaceOnUse" },
                React.createElement("stop", { offset: "0", stopColor: "#6DD1FF" }),
                React.createElement("stop", { offset: "1", stopColor: "#0A3D91" }))),
        React.createElement("path", { d: "M14 5h9.5c7 0 11.5 4 11.5 10s-4.5 10-11.2 10H19v18h-5V5Z", fill: "url(#ppt-grad)" }),
        React.createElement("path", { d: "M19 10.5v9.2", stroke: "#071022", strokeWidth: "2.2", strokeLinecap: "round", opacity: "0.35" }),
        React.createElement("circle", { cx: "19", cy: "10.2", r: "2.1", fill: "#EAF2FF" }),
        React.createElement("circle", { cx: "19", cy: "15.1", r: "1.5", fill: "#EAF2FF", opacity: "0.9" }),
        React.createElement("circle", { cx: "19", cy: "19.6", r: "1.9", fill: "#EAF2FF" })));
}
/* Decorative DNA helix, used as ambient background texture. Purely
   ornamental (aria-hidden), so it stays out of the reading order. */
function DnaStrand({ className, opacity = 0.5 }) {
    const rungs = Array.from({ length: 9 });
    return (React.createElement("svg", { viewBox: "0 0 120 420", className: className, "aria-hidden": "true", style: { opacity } },
        React.createElement("defs", null,
            React.createElement("linearGradient", { id: "dna-line", x1: "0", y1: "0", x2: "0", y2: "420", gradientUnits: "userSpaceOnUse" },
                React.createElement("stop", { offset: "0", stopColor: "#6DD1FF", stopOpacity: "0" }),
                React.createElement("stop", { offset: "0.15", stopColor: "#6DD1FF", stopOpacity: "0.9" }),
                React.createElement("stop", { offset: "0.85", stopColor: "#2F8FFF", stopOpacity: "0.9" }),
                React.createElement("stop", { offset: "1", stopColor: "#2F8FFF", stopOpacity: "0" }))),
        React.createElement("path", { d: "M20 0 C 100 52, 20 105, 100 157 C 20 210, 100 262, 20 315 C 100 367, 20 400, 20 420", stroke: "url(#dna-line)", strokeWidth: "2", fill: "none" }),
        React.createElement("path", { d: "M100 0 C 20 52, 100 105, 20 157 C 100 210, 20 262, 100 315 C 20 367, 100 400, 100 420", stroke: "url(#dna-line)", strokeWidth: "2", fill: "none" }),
        rungs.map((_, i) => {
            const y = 20 + i * 46;
            return React.createElement("line", { key: i, x1: "20", y1: y, x2: "100", y2: y, stroke: "#9FCBFF", strokeWidth: "1", opacity: "0.35" });
        })));
}
"use strict";
/* ==========================================================================
   PEPTALYS — brand constants & business settings.
   --------------------------------------------------------------------------
   Product, collection, cart and checkout data now come live from Shopify
   (see js/shopify-client.js + api/_lib/shopify.js) via the Storefront API.
   This file only holds things Shopify has no concept of: brand copy, and
   the wholesale minimum-order-value business rule Peptalys enforces on top
   of Shopify (Shopify's own cart/checkout has no "minimum order" concept
   built in, so that gate stays client-side, checked against the live
   Shopify cart subtotal).
   ========================================================================== */
const BRAND = {
    name: "Peptalys",
    legalName: "Peptalys Ltd",
    tagline: "More Than Peptides",
    strapline: "Research peptides for a healthier tomorrow.",
    descriptor: "Quality. Supply. Progress.",
    email: "info@peptalys.co.uk",
    phone: "+44 20 4577 1290",
    address: "Unit 4, Riverside Business Park, Manchester, M4 5AB, United Kingdom",
    companyNumber: "16284730",
    instagram: "@peptalys",
};
const SETTINGS = {
    currency: "GBP",
    currencySymbol: "£",
    minimumOrderValue: 1000.00,
    deliveryPromise: "3–5 working days, nationwide UK delivery.",
};
/* -------------------------------------------------------------------- */
/* Testimonials / trust signals — lab customer types, not named           */
/* individuals, to avoid implying endorsement by a real, identifiable     */
/* person.                                                                 */
/* -------------------------------------------------------------------- */
const TRUST_POINTS = [
    { icon: "flag", title: "UK Manufactured", body: "Synthesised and quality-controlled in the UK, batch-tested for purity." },
    { icon: "truck", title: "3–5 Working Day Delivery", body: "Fast, secure courier delivery, nationwide across the UK." },
    { icon: "users", title: "Wholesale Supply", body: "Built for research bodies, laboratories and institutional buyers." },
    { icon: "flask", title: "Research Use Only", body: "Not for human consumption. Sold exclusively for laboratory research." },
];
/* Shopify collections carry no "icon" field, so category tiles/filters
   pick a reasonable icon by matching keywords in the collection's handle
   or title against this table — falling back to a generic flask icon for
   any collection that doesn't match. Purely cosmetic; never affects data. */
const CATEGORY_ICON_RULES = [
    { test: /weight|metabolic|glp/i, icon: "scale" },
    { test: /recover|repair|heal/i, icon: "shield" },
    { test: /skin|longevity|beauty|collagen/i, icon: "sparkle" },
    { test: /cellular|mitochond|energy/i, icon: "atom" },
    { test: /growth|hormone|gh\b/i, icon: "trendingUp" },
];
function categoryIcon(collection) {
    const haystack = `${collection.handle || ""} ${collection.name || ""}`;
    const match = CATEGORY_ICON_RULES.find((r) => r.test.test(haystack));
    return match ? match.icon : "flask";
}
/* -------------------------------------------------------------------- */
/* ARCHITECTURE NOTES (kept in-repo, read by the /admin “Architecture”    */
/* tab so the roadmap travels with the code).                             */
/* -------------------------------------------------------------------- */
const ARCHITECTURE_NOTES = {
    dataSource: "Products, collections, prices, images, variants, availability, cart and checkout are all read live from Shopify via the Storefront API, proxied through this app's own /api/* serverless functions so the private Storefront access token never reaches the browser. Shopify's Admin is the single place staff manage the catalogue — this site has no separate product database of its own.",
    pricing: "Wholesale cost / margin data lived only in the old placeholder catalogue and was never wired to Shopify — Shopify's Storefront API has no concept of an internal cost field, so true margin reporting now belongs in Shopify Admin (or a metafield read only by Admin-API-authenticated tooling), not this customer-facing site.",
    orders: "Checkout redirects to Shopify's own hosted checkout (via the cart's checkoutUrl), so Shopify becomes the system of record for orders and payment — this site does not create or store order records of its own for real purchases.",
};
"use strict";
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
    if (!prices.length)
        return { min: 0, max: 0, single: true };
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    return { min, max, single: min === max };
}
function rrpFor(product, variant) {
    if (variant)
        return variant.rrp;
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
    if (!productPurchasable(product))
        return { label: "Out of stock", tone: "danger" };
    const known = product.variants.filter((v) => typeof v.quantityAvailable === "number");
    if (known.length) {
        const stock = known.reduce((s, v) => s + Math.max(0, v.quantityAvailable), 0);
        if (stock <= 0)
            return { label: "Out of stock", tone: "danger" };
        if (stock < 20)
            return { label: "Low stock", tone: "warn" };
    }
    return { label: "In stock", tone: "ok" };
}
function variantAvailability(variant) {
    if (!variant.availableForSale)
        return { label: "Out of stock", tone: "danger" };
    if (typeof variant.quantityAvailable === "number") {
        if (variant.quantityAvailable <= 0)
            return { label: "Out of stock", tone: "danger" };
        if (variant.quantityAvailable < 10)
            return { label: `Low stock — ${variant.quantityAvailable} left`, tone: "warn" };
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
"use strict";
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
    }
    catch (networkErr) {
        const err = new Error("Network error — please check your connection and try again.");
        err.code = "NETWORK_ERROR";
        throw err;
    }
    let body = null;
    try {
        body = await res.json();
    }
    catch (e) {
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
        if (!fresh && _productsCache.has(key))
            return _productsCache.get(key);
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
        if (!fresh && _collectionsPromise)
            return _collectionsPromise;
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
            .then((collections) => { if (!cancelled)
            setState({ status: "ready", data: collections, error: null }); })
            .catch((err) => { if (!cancelled)
            setState({ status: "error", data: [], error: err.message }); });
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
            if (!cancelled)
                setState({ status: "ready", data: products, collectionInfo: info, error: null });
        })
            .catch((err) => {
            if (!cancelled)
                setState({ status: "error", data: [], collectionInfo: null, error: err.message });
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
        if (!handle)
            return;
        ShopifyAPI.getProduct(handle)
            .then((product) => { if (!cancelled)
            setState({ status: "ready", data: product, error: null }); })
            .catch((err) => {
            if (!cancelled)
                setState({ status: err.code === "NOT_FOUND" ? "not_found" : "error", data: null, error: err.message });
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
"use strict";
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
    }
    catch (e) {
        return null;
    }
}
function writeStoredCartId(id) {
    try {
        if (id)
            localStorage.setItem(CART_ID_KEY, id);
        else
            localStorage.removeItem(CART_ID_KEY);
    }
    catch (e) {
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
    if (initPromise)
        return initPromise;
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
        }
        catch (err) {
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
    }
    catch (err) {
        setError(err && err.message ? err.message : "Something went wrong updating your basket.");
        throw err;
    }
    finally {
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
            }
            else {
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
        if (!cart || !cart.id)
            return;
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
        if (!cart || !cart.id)
            return;
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
"use strict";
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
    }
    catch (e) {
        return [];
    }
}
function writeOrders(orders) {
    try {
        localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
    }
    catch (e) {
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
"use strict";
/* Minimal hash router — no external dependency, works from a static file
   served anywhere (no server-side route handling needed). */
function parseHash() {
    let hash = window.location.hash || "#/";
    hash = hash.slice(1); // drop '#'
    const [path, queryString] = hash.split("?");
    const query = {};
    if (queryString) {
        new URLSearchParams(queryString).forEach((value, key) => {
            query[key] = value;
        });
    }
    return { path: path || "/", query };
}
function buildHash(path, query) {
    const qs = query && Object.keys(query).length ? "?" + new URLSearchParams(query).toString() : "";
    return "#" + path + qs;
}
function navigate(path, query, opts) {
    const hash = buildHash(path, query);
    if (opts && opts.replace) {
        const url = window.location.pathname + window.location.search + hash;
        window.history.replaceState(null, "", url);
        window.dispatchEvent(new HashChangeEvent("hashchange"));
    }
    else {
        window.location.hash = hash;
    }
    if (!opts || opts.scrollTop !== false) {
        window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
    }
}
function useRoute() {
    const [route, setRoute] = React.useState(parseHash());
    React.useEffect(() => {
        const onChange = () => setRoute(parseHash());
        window.addEventListener("hashchange", onChange);
        return () => window.removeEventListener("hashchange", onChange);
    }, []);
    return route;
}
/** Matches "/product/:slug" against "/product/bpc-157" -> {slug:"bpc-157"} */
function matchPath(pattern, path) {
    const patternParts = pattern.split("/").filter(Boolean);
    const pathParts = path.split("/").filter(Boolean);
    if (patternParts.length !== pathParts.length)
        return null;
    const params = {};
    for (let i = 0; i < patternParts.length; i++) {
        const pp = patternParts[i];
        if (pp.startsWith(":")) {
            params[pp.slice(1)] = decodeURIComponent(pathParts[i]);
        }
        else if (pp !== pathParts[i]) {
            return null;
        }
    }
    return params;
}
"use strict";
/* ==========================================================================
   Shared design-system components: nav, footer, product visuals, cards,
   buttons, badges, the cart drawer, and toast host.
   ========================================================================== */
/* ---- tiny UI store (drawer / menu / search open state) ---------------- */
const uiStore = createStore({ cartOpen: false, menuOpen: false, searchOpen: false });
function useUi() {
    return React.useSyncExternalStore(uiStore.subscribe, uiStore.getState, uiStore.getState);
}
const UiActions = {
    openCart: () => uiStore.setState((s) => ({ ...s, cartOpen: true, menuOpen: false })),
    closeCart: () => uiStore.setState((s) => ({ ...s, cartOpen: false })),
    toggleMenu: () => uiStore.setState((s) => ({ ...s, menuOpen: !s.menuOpen })),
    closeMenu: () => uiStore.setState((s) => ({ ...s, menuOpen: false })),
    openSearch: () => uiStore.setState((s) => ({ ...s, searchOpen: true, menuOpen: false })),
    closeSearch: () => uiStore.setState((s) => ({ ...s, searchOpen: false })),
};
/* ---- layout primitives -------------------------------------------------- */
function Container({ className, children }) {
    return React.createElement("div", { className: cx("mx-auto w-full max-w-[1240px] px-5 sm:px-6 lg:px-8", className) }, children);
}
function Eyebrow({ children, className }) {
    return (React.createElement("p", { className: cx("font-mono text-[11px] uppercase tracking-[0.24em] text-accent2", className) }, children));
}
function SectionHeading({ eyebrow, title, body, align = "left", className }) {
    return (React.createElement("div", { className: cx(align === "center" ? "text-center mx-auto" : "text-left", "max-w-2xl", className) },
        eyebrow && React.createElement(Eyebrow, null, eyebrow),
        React.createElement("h2", { className: "mt-3 font-display text-3xl sm:text-4xl font-bold text-ink text-balance" }, title),
        body && React.createElement("p", { className: "mt-4 text-[15px] leading-relaxed text-dim" }, body)));
}
function Button({ as = "button", href, onClick, variant = "primary", size = "md", className, children, type, disabled, full }) {
    const base = "inline-flex items-center justify-center gap-2 rounded-full font-body font-semibold transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed";
    const sizes = { sm: "px-4 py-2 text-[13px]", md: "px-6 py-3 text-[14px]", lg: "px-8 py-4 text-[15px]" };
    const variants = {
        primary: "bg-gradient-to-r from-accent to-accentDeep text-white shadow-glow hover:brightness-110 hover:-translate-y-0.5",
        secondary: "bg-surface2 text-ink border border-line2 hover:border-accent2/60 hover:bg-surface3",
        ghost: "text-ink hover:text-accent2",
        outline: "border border-line2 text-ink hover:border-accent2 hover:text-accent2",
        danger: "bg-red-500/10 text-red-300 border border-red-500/30 hover:bg-red-500/20",
    };
    const classes = cx(base, sizes[size], variants[variant], full && "w-full", className);
    if (as === "a") {
        if (disabled) {
            return (React.createElement("span", { className: cx(classes, "opacity-40 cursor-not-allowed"), "aria-disabled": "true" }, children));
        }
        return (React.createElement("a", { href: href, className: classes, onClick: onClick }, children));
    }
    return (React.createElement("button", { type: type || "button", onClick: onClick, disabled: disabled, className: classes }, children));
}
function Badge({ children, tone = "default", className }) {
    const tones = {
        default: "bg-surface2 text-dim border-line2",
        accent: "bg-accent/10 text-accent2 border-accent/30",
        ok: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
        warn: "bg-amber-500/10 text-amber-300 border-amber-500/30",
        danger: "bg-red-500/10 text-red-300 border-red-500/30",
        gold: "bg-gold/10 text-gold border-gold/30",
    };
    return (React.createElement("span", { className: cx("inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em]", tones[tone], className) }, children));
}
function Price({ value, rrp, size = "md", className }) {
    const sizes = { sm: "text-base", md: "text-xl", lg: "text-3xl" };
    return (React.createElement("span", { className: cx("inline-flex items-baseline gap-2 tnum", className) },
        React.createElement("span", { className: cx("font-display font-bold text-ink", sizes[size]) }, formatMoney(value)),
        rrp && rrp > value && React.createElement("span", { className: "text-xs text-faint line-through" }, formatMoney(rrp))));
}
/* ---- product illustration (procedural SVG, stands in for photography) - */
function VialGraphic({ accent = "#2F8FFF", label = "", height = 220, className }) {
    const gid = React.useId().replace(/:/g, "");
    return (React.createElement("svg", { viewBox: "0 0 160 220", width: "100%", height: height, className: className, role: "img", "aria-label": `Illustration of a ${label} research vial` },
        React.createElement("defs", null,
            React.createElement("radialGradient", { id: `glow-${gid}`, cx: "50%", cy: "38%", r: "60%" },
                React.createElement("stop", { offset: "0%", stopColor: accent, stopOpacity: "0.5" }),
                React.createElement("stop", { offset: "100%", stopColor: accent, stopOpacity: "0" })),
            React.createElement("linearGradient", { id: `glass-${gid}`, x1: "0", y1: "0", x2: "1", y2: "1" },
                React.createElement("stop", { offset: "0%", stopColor: "#EAF2FF", stopOpacity: "0.16" }),
                React.createElement("stop", { offset: "45%", stopColor: "#EAF2FF", stopOpacity: "0.04" }),
                React.createElement("stop", { offset: "100%", stopColor: "#EAF2FF", stopOpacity: "0.1" })),
            React.createElement("linearGradient", { id: `cap-${gid}`, x1: "0", y1: "0", x2: "0", y2: "1" },
                React.createElement("stop", { offset: "0%", stopColor: "#BFD7FF" }),
                React.createElement("stop", { offset: "45%", stopColor: accent }),
                React.createElement("stop", { offset: "100%", stopColor: "#0A3D91" }))),
        React.createElement("ellipse", { cx: "80", cy: "110", rx: "70", ry: "70", fill: `url(#glow-${gid})` }),
        React.createElement("rect", { x: "46", y: "62", width: "68", height: "128", rx: "14", fill: `url(#glass-${gid})`, stroke: "rgba(234,242,255,0.35)", strokeWidth: "1.2" }),
        React.createElement("rect", { x: "49", y: "120", width: "62", height: "67", rx: "10", fill: accent, opacity: "0.14" }),
        React.createElement("rect", { x: "50", y: "132", width: "60", height: "34", rx: "4", fill: "#050B18", opacity: "0.55" }),
        React.createElement("text", { x: "80", y: "153", textAnchor: "middle", fontFamily: "IBM Plex Mono, monospace", fontSize: "11", fill: "#EAF2FF", letterSpacing: "1" }, label),
        React.createElement("rect", { x: "66", y: "42", width: "28", height: "24", rx: "3", fill: "rgba(234,242,255,0.18)", stroke: "rgba(234,242,255,0.3)", strokeWidth: "1" }),
        React.createElement("rect", { x: "58", y: "18", width: "44", height: "28", rx: "6", fill: `url(#cap-${gid})` }),
        React.createElement("rect", { x: "58", y: "18", width: "44", height: "7", rx: "3", fill: "#EAF2FF", opacity: "0.35" }),
        React.createElement("rect", { x: "53", y: "70", width: "8", height: "110", rx: "4", fill: "#EAF2FF", opacity: "0.18" })));
}
function VialGroupGraphic({ accent = "#2F8FFF", className, height = 220 }) {
    return (React.createElement("div", { className: cx("relative flex items-end justify-center gap-3", className), style: { height } },
        React.createElement("div", { className: "w-1/4 opacity-70" },
            React.createElement(VialGraphic, { accent: accent, label: "", height: height * 0.72 })),
        React.createElement("div", { className: "w-1/3" },
            React.createElement(VialGraphic, { accent: accent, label: "", height: height })),
        React.createElement("div", { className: "w-1/4 opacity-70" },
            React.createElement(VialGraphic, { accent: accent, label: "", height: height * 0.8 }))));
}
function MoleculeGraphic({ accent = "#6DD1FF", className, height = 220 }) {
    const nodes = [
        [80, 40], [130, 70], [130, 130], [80, 160], [30, 130], [30, 70],
    ];
    return (React.createElement("svg", { viewBox: "0 0 160 200", width: "100%", height: height, className: className, "aria-hidden": "true" },
        nodes.map((n, i) => {
            const next = nodes[(i + 1) % nodes.length];
            return React.createElement("line", { key: i, x1: n[0], y1: n[1], x2: next[0], y2: next[1], stroke: accent, strokeOpacity: "0.55", strokeWidth: "1.6" });
        }),
        React.createElement("line", { x1: "80", y1: "40", x2: "80", y2: "160", stroke: accent, strokeOpacity: "0.25", strokeWidth: "1.2" }),
        React.createElement("line", { x1: "30", y1: "70", x2: "130", y2: "130", stroke: accent, strokeOpacity: "0.25", strokeWidth: "1.2" }),
        React.createElement("line", { x1: "30", y1: "130", x2: "130", y2: "70", stroke: accent, strokeOpacity: "0.25", strokeWidth: "1.2" }),
        nodes.map((n, i) => (React.createElement("circle", { key: i, cx: n[0], cy: n[1], r: i % 2 === 0 ? 7 : 5, fill: "#070C18", stroke: accent, strokeWidth: "2" }))),
        React.createElement("circle", { cx: "80", cy: "100", r: "9", fill: accent, opacity: "0.85" })));
}
function AtomGraphic({ accent = "#6DD1FF", className, height = 220 }) {
    return (React.createElement("svg", { viewBox: "0 0 160 200", width: "100%", height: height, className: className, "aria-hidden": "true" },
        React.createElement("g", { transform: "translate(80 100)" },
            React.createElement("ellipse", { rx: "70", ry: "26", fill: "none", stroke: accent, strokeOpacity: "0.5", strokeWidth: "1.4" }),
            React.createElement("ellipse", { rx: "70", ry: "26", fill: "none", stroke: accent, strokeOpacity: "0.5", strokeWidth: "1.4", transform: "rotate(60)" }),
            React.createElement("ellipse", { rx: "70", ry: "26", fill: "none", stroke: accent, strokeOpacity: "0.5", strokeWidth: "1.4", transform: "rotate(120)" }),
            React.createElement("circle", { r: "10", fill: accent }),
            React.createElement("circle", { cx: "70", cy: "0", r: "4", fill: "#EAF2FF" }),
            React.createElement("circle", { cx: "-35", cy: "22", r: "4", fill: "#EAF2FF", transform: "rotate(60)" }),
            React.createElement("circle", { cx: "35", cy: "-22", r: "4", fill: "#EAF2FF", transform: "rotate(120)" }))));
}
function AnatomyGraphic({ accent = "#6DD1FF", className, height = 220 }) {
    return (React.createElement("svg", { viewBox: "0 0 160 220", width: "100%", height: height, className: className, "aria-hidden": "true" },
        React.createElement("g", { stroke: accent, strokeOpacity: "0.6", strokeWidth: "1.6", fill: "none" },
            React.createElement("circle", { cx: "80", cy: "30", r: "14" }),
            React.createElement("path", { d: "M80 44v70M56 68h48M56 68l-10 46M104 68l10 46M64 114l-8 60M96 114l8 60" })),
        React.createElement("circle", { cx: "80", cy: "90", r: "7", fill: accent, className: "animate-pulse-glow" }),
        React.createElement("circle", { cx: "80", cy: "90", r: "16", fill: "none", stroke: accent, strokeOpacity: "0.35", strokeWidth: "1" })));
}
function ProductVisual({ image, height, className }) {
    if (!image)
        return React.createElement(VialGraphic, { height: height, className: className });
    if (image.url) {
        return (React.createElement("img", { src: image.url, alt: image.alt || "", style: { height, maxHeight: height }, className: cx("mx-auto max-w-full object-contain", className) }));
    }
    switch (image.type) {
        case "vialGroup":
            return React.createElement(VialGroupGraphic, { accent: image.accent, height: height, className: className });
        case "molecule":
            return React.createElement(MoleculeGraphic, { accent: image.accent, height: height, className: className });
        case "atom":
            return React.createElement(AtomGraphic, { accent: image.accent, height: height, className: className });
        case "anatomy":
            return React.createElement(AnatomyGraphic, { accent: image.accent, height: height, className: className });
        default:
            return React.createElement(VialGraphic, { accent: image.accent, label: image.label, height: height, className: className });
    }
}
/* ---- product card -------------------------------------------------------*/
function ProductCard({ product, className }) {
    const range = priceRange(product);
    const avail = availability(product);
    const purchasable = productPurchasable(product);
    const [busy, setBusy] = React.useState(false);
    function quickAdd(e) {
        e.preventDefault();
        e.stopPropagation();
        const variant = product.variants.find((v) => v.availableForSale) || product.variants[0];
        if (!variant || !variant.availableForSale)
            return;
        setBusy(true);
        CartStore.addLine(variant.id, 1)
            .then(() => {
            pushToast(`${product.name} ${variant.label} added to basket`, { tone: "ok" });
        })
            .catch((err) => {
            pushToast(err.message || "Couldn't add that to your basket", { tone: "default" });
        })
            .finally(() => setTimeout(() => setBusy(false), 500));
    }
    return (React.createElement("a", { href: `#/product/${product.slug}`, className: cx("group relative flex flex-col overflow-hidden rounded-2xl panel transition-all duration-300 hover:-translate-y-1 hover:shadow-glowLg hover:border-accent/40", className) },
        React.createElement("div", { className: "relative flex items-center justify-center bg-labgrid bg-surface/60 px-6 pt-6" },
            product.tag && (React.createElement(Badge, { tone: "accent", className: "absolute left-4 top-4 z-10" }, product.tag)),
            purchasable && (React.createElement("button", { onClick: quickAdd, "aria-label": `Quick add ${product.name} to basket`, className: cx("absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-line2 bg-surface/90 text-ink opacity-0 transition-all group-hover:opacity-100 hover:border-accent2 hover:text-accent2", busy && "opacity-100 border-emerald-400 text-emerald-300") },
                React.createElement(Icon, { name: busy ? "check" : "plus", className: "h-4 w-4" }))),
            React.createElement(ProductVisual, { image: product.images[0], height: 180 })),
        React.createElement("div", { className: "flex flex-1 flex-col gap-2 p-5" },
            React.createElement("p", { className: "font-mono text-[10px] uppercase tracking-[0.16em] text-faint" }, product.subcategory),
            React.createElement("h3", { className: "font-display text-lg font-semibold text-ink" }, product.name),
            React.createElement("p", { className: "clamp-2 text-[13px] leading-relaxed text-dim" }, product.shortDescription),
            React.createElement("div", { className: "mt-auto flex items-center justify-between pt-3" },
                React.createElement("div", null,
                    React.createElement("span", { className: "text-[11px] text-faint" }, range.single ? "" : "From "),
                    React.createElement(Price, { value: range.min, size: "sm" }),
                    React.createElement("p", { className: "mt-0.5 font-mono text-[10px] uppercase tracking-[0.06em] text-faint" }, "Sold in units of 10")),
                React.createElement(Badge, { tone: avail.tone === "ok" ? "ok" : avail.tone === "warn" ? "warn" : "danger" }, avail.label)))));
}
/* ---- quantity stepper ---------------------------------------------------*/
function QuantityStepper({ value, onChange, min = 1, max = 999, size = "md" }) {
    const h = size === "sm" ? "h-9" : "h-11";
    return (React.createElement("div", { className: cx("inline-flex items-center rounded-full border border-line2 bg-surface2", h) },
        React.createElement("button", { type: "button", "aria-label": "Decrease quantity", onClick: () => onChange(Math.max(min, value - 1)), className: "flex h-full w-9 items-center justify-center text-dim hover:text-accent2 disabled:opacity-30", disabled: value <= min },
            React.createElement(Icon, { name: "minus", className: "h-3.5 w-3.5" })),
        React.createElement("input", { "aria-label": "Quantity", type: "number", value: value, min: min, max: max, onChange: (e) => {
                const v = parseInt(e.target.value, 10);
                onChange(Number.isFinite(v) ? Math.min(max, Math.max(min, v)) : min);
            }, className: "w-10 bg-transparent text-center font-mono text-sm text-ink outline-none" }),
        React.createElement("button", { type: "button", "aria-label": "Increase quantity", onClick: () => onChange(Math.min(max, value + 1)), className: "flex h-full w-9 items-center justify-center text-dim hover:text-accent2 disabled:opacity-30", disabled: value >= max },
            React.createElement(Icon, { name: "plus", className: "h-3.5 w-3.5" }))));
}
/* ---- trust strip ---------------------------------------------------------*/
function TrustStrip({ className }) {
    return (React.createElement("div", { className: cx("grid grid-cols-2 gap-4 sm:grid-cols-4", className) }, TRUST_POINTS.map((t) => (React.createElement("div", { key: t.title, className: "flex flex-col items-start gap-2 rounded-xl border border-line bg-surface/50 p-4" },
        React.createElement(Icon, { name: t.icon, className: "h-5 w-5 text-accent2" }),
        React.createElement("p", { className: "font-display text-sm font-semibold text-ink" }, t.title),
        React.createElement("p", { className: "text-[12px] leading-snug text-dim" }, t.body))))));
}
/* ---- breadcrumbs ----------------------------------------------------------*/
function Breadcrumbs({ items }) {
    return (React.createElement("nav", { "aria-label": "Breadcrumb", className: "flex flex-wrap items-center gap-1.5 text-[12px] text-faint" }, items.map((item, i) => (React.createElement(React.Fragment, { key: i },
        i > 0 && React.createElement(Icon, { name: "chevronRight", className: "h-3 w-3" }),
        item.href ? (React.createElement("a", { href: item.href, className: "hover:text-accent2" }, item.label)) : (React.createElement("span", { className: "text-dim" }, item.label)))))));
}
/* ---- empty state -----------------------------------------------------------*/
function EmptyState({ icon = "cart", title, body, action }) {
    return (React.createElement("div", { className: "flex flex-col items-center justify-center rounded-2xl border border-dashed border-line2 px-6 py-16 text-center" },
        React.createElement("div", { className: "mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-surface2 text-accent2" },
            React.createElement(Icon, { name: icon, className: "h-6 w-6" })),
        React.createElement("h3", { className: "font-display text-lg font-semibold text-ink" }, title),
        body && React.createElement("p", { className: "mt-2 max-w-sm text-sm text-dim" }, body),
        action && React.createElement("div", { className: "mt-5" }, action)));
}
/* ---- navbar ---------------------------------------------------------------*/
const NAV_LINKS = [
    { label: "Shop", href: "#/shop" },
    { label: "About", href: "#/about" },
    { label: "Delivery", href: "#/delivery" },
    { label: "Contact", href: "#/contact" },
];
function Navbar() {
    const { itemCount } = useCart();
    const ui = useUi();
    const [scrolled, setScrolled] = React.useState(false);
    const [query, setQuery] = React.useState("");
    React.useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8);
        onScroll();
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);
    function submitSearch(e) {
        e.preventDefault();
        navigate("/shop", query ? { q: query } : {});
        UiActions.closeSearch();
        UiActions.closeMenu();
    }
    return (React.createElement("header", { className: cx("sticky top-0 z-40 transition-all duration-300", scrolled ? "bg-bg/85 backdrop-blur-md border-b border-line" : "bg-transparent border-b border-transparent") },
        React.createElement("a", { href: "#main", className: "skip-link rounded-md bg-accent px-4 py-2 text-sm font-semibold text-white" }, "Skip to content"),
        React.createElement(Container, { className: "flex h-16 items-center justify-between gap-4 sm:h-20" },
            React.createElement("a", { href: "#/", className: "flex items-center gap-2.5 shrink-0", onClick: UiActions.closeMenu },
                React.createElement("img", { src: "peptalys-logo.png", alt: "Peptalys", className: "h-8 w-auto sm:h-9" }),
                React.createElement("span", { className: "font-display text-lg sm:text-xl font-bold tracking-tight text-ink" }, "Peptalys")),
            React.createElement("nav", { className: "hidden items-center gap-8 lg:flex" }, NAV_LINKS.map((l) => (React.createElement("a", { key: l.href, href: l.href, className: "font-body text-[14px] font-medium text-dim transition-colors hover:text-ink" }, l.label)))),
            React.createElement("div", { className: "flex items-center gap-1.5 sm:gap-2" },
                React.createElement("form", { onSubmit: submitSearch, className: "relative hidden md:block" },
                    React.createElement(Icon, { name: "search", className: "pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" }),
                    React.createElement("input", { value: query, onChange: (e) => setQuery(e.target.value), placeholder: "Search peptides\u2026", "aria-label": "Search products", className: "w-48 rounded-full border border-line2 bg-surface2 py-2.5 pl-10 pr-4 text-[13px] text-ink placeholder:text-faint outline-none transition-all focus:w-64 focus:border-accent2" })),
                React.createElement("button", { "aria-label": "Search", onClick: UiActions.openSearch, className: "flex h-10 w-10 items-center justify-center rounded-full text-dim hover:bg-surface2 hover:text-ink md:hidden" },
                    React.createElement(Icon, { name: "search", className: "h-5 w-5" })),
                React.createElement("a", { href: "#/admin", className: "hidden h-10 items-center rounded-full px-3 text-dim hover:bg-surface2 hover:text-ink lg:flex", "aria-label": "Admin", title: "Admin" },
                    React.createElement(Icon, { name: "user", className: "h-5 w-5" })),
                React.createElement("button", { onClick: UiActions.openCart, "aria-label": `Open basket, ${itemCount} item${itemCount === 1 ? "" : "s"}`, className: "relative flex h-10 w-10 items-center justify-center rounded-full text-ink hover:bg-surface2" },
                    React.createElement(Icon, { name: "cart", className: "h-5 w-5" }),
                    itemCount > 0 && (React.createElement("span", { className: "absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-accent px-1 font-mono text-[10px] font-bold text-white" }, itemCount))),
                React.createElement("button", { onClick: UiActions.toggleMenu, "aria-label": "Toggle menu", "aria-expanded": ui.menuOpen, className: "flex h-10 w-10 items-center justify-center rounded-full text-ink hover:bg-surface2 lg:hidden" },
                    React.createElement(Icon, { name: ui.menuOpen ? "close" : "menu", className: "h-5 w-5" })))),
        ui.menuOpen && (React.createElement("div", { className: "border-t border-line bg-bg/98 backdrop-blur-md lg:hidden" },
            React.createElement(Container, { className: "flex flex-col gap-1 py-4" },
                React.createElement("form", { onSubmit: submitSearch, className: "relative mb-2" },
                    React.createElement(Icon, { name: "search", className: "pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" }),
                    React.createElement("input", { value: query, onChange: (e) => setQuery(e.target.value), placeholder: "Search peptides\u2026", "aria-label": "Search products", className: "w-full rounded-full border border-line2 bg-surface2 py-2.5 pl-10 pr-4 text-[13px] text-ink placeholder:text-faint outline-none" })),
                NAV_LINKS.map((l) => (React.createElement("a", { key: l.href, href: l.href, onClick: UiActions.closeMenu, className: "rounded-lg px-3 py-3 text-[15px] font-medium text-ink hover:bg-surface2" }, l.label))),
                React.createElement("a", { href: "#/returns", onClick: UiActions.closeMenu, className: "rounded-lg px-3 py-3 text-[15px] font-medium text-dim hover:bg-surface2" }, "Returns"),
                React.createElement("a", { href: "#/legal", onClick: UiActions.closeMenu, className: "rounded-lg px-3 py-3 text-[15px] font-medium text-dim hover:bg-surface2" }, "Research Use Policy"),
                React.createElement("a", { href: "#/admin", onClick: UiActions.closeMenu, className: "rounded-lg px-3 py-3 text-[15px] font-medium text-dim hover:bg-surface2" }, "Admin"))))));
}
/* ---- cart drawer ------------------------------------------------------------*/
function CartDrawer() {
    const ui = useUi();
    const cart = useCart();
    const open = ui.cartOpen;
    React.useEffect(() => {
        function onKey(e) {
            if (e.key === "Escape")
                UiActions.closeCart();
        }
        if (open)
            document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [open]);
    return (React.createElement("div", { className: cx("fixed inset-0 z-50", open ? "pointer-events-auto" : "pointer-events-none"), "aria-hidden": !open },
        React.createElement("div", { onClick: UiActions.closeCart, className: cx("absolute inset-0 bg-[#020408]/70 backdrop-blur-sm transition-opacity duration-300", open ? "opacity-100" : "opacity-0") }),
        React.createElement("aside", { role: "dialog", "aria-label": "Shopping basket", className: cx("absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-surface shadow-glowLg transition-transform duration-300 ease-out", open ? "translate-x-0" : "translate-x-full") },
            React.createElement("div", { className: "flex items-center justify-between border-b border-line px-5 py-4" },
                React.createElement("h2", { className: "font-display text-lg font-semibold text-ink" },
                    "Your Basket (",
                    cart.itemCount,
                    ")"),
                React.createElement("button", { onClick: UiActions.closeCart, "aria-label": "Close basket", className: "flex h-9 w-9 items-center justify-center rounded-full text-dim hover:bg-surface2 hover:text-ink" },
                    React.createElement(Icon, { name: "close", className: "h-5 w-5" }))),
            cart.status === "loading" && cart.lines.length === 0 ? (React.createElement("div", { className: "flex flex-1 items-center justify-center p-6" },
                React.createElement("div", { className: "flex flex-col items-center gap-3 text-dim" },
                    React.createElement("div", { className: "h-6 w-6 animate-spin rounded-full border-2 border-line2 border-t-accent2" }),
                    React.createElement("p", { className: "text-[13px]" }, "Loading your basket\u2026")))) : cart.status === "error" && cart.lines.length === 0 ? (React.createElement("div", { className: "flex flex-1 items-center p-6" },
                React.createElement(EmptyState, { icon: "alertTriangle", title: "Couldn't load your basket", body: cart.error || "Please try again.", action: React.createElement(Button, { variant: "secondary", onClick: () => CartStore.init() }, "Retry") }))) : cart.lines.length === 0 ? (React.createElement("div", { className: "flex flex-1 items-center p-6" },
                React.createElement(EmptyState, { icon: "cart", title: "Your basket is empty", body: "Browse the catalogue to add research peptides to your wholesale order.", action: React.createElement(Button, { as: "a", href: "#/shop", onClick: UiActions.closeCart }, "Browse the shop") }))) : (React.createElement(React.Fragment, null,
                React.createElement("div", { className: "flex-1 overflow-y-auto px-5 py-4" },
                    React.createElement("div", { className: "mb-4 rounded-xl border border-line bg-surface2/60 p-3.5" },
                        React.createElement("div", { className: "flex items-center justify-between text-[12px] text-dim" },
                            React.createElement("span", null, "Wholesale minimum"),
                            React.createElement("span", { className: "font-mono tnum text-ink" },
                                formatMoney(cart.subtotal),
                                " / ",
                                formatMoney(SETTINGS.minimumOrderValue))),
                        React.createElement("div", { className: "mt-2 h-1.5 w-full overflow-hidden rounded-full bg-surface3" },
                            React.createElement("div", { className: cx("h-full rounded-full transition-all duration-500", cart.meetsMinimum ? "bg-emerald-400" : "bg-gradient-to-r from-accent to-accent2"), style: { width: `${Math.min(100, (cart.subtotal / SETTINGS.minimumOrderValue) * 100)}%` } })),
                        !cart.meetsMinimum && (React.createElement("p", { className: "mt-2 text-[12px] text-dim" },
                            "Add ",
                            formatMoney(cart.remainingToMinimum),
                            " more to reach the wholesale minimum order."))),
                    cart.hasUnavailable && (React.createElement("div", { className: "mb-4 flex items-start gap-2.5 rounded-xl border border-amber-500/25 bg-amber-500/5 p-3.5" },
                        React.createElement(Icon, { name: "alertTriangle", className: "mt-0.5 h-4 w-4 shrink-0 text-amber-300" }),
                        React.createElement("p", { className: "text-[12px] leading-snug text-amber-200/90" }, "One or more items in your basket are no longer available and must be removed before checkout."))),
                    React.createElement("ul", { className: "flex flex-col gap-4" }, cart.lines.map((line) => (React.createElement("li", { key: line.id, className: cx("flex gap-3", !line.availableForSale && "opacity-60") },
                        React.createElement("a", { href: `#/product/${line.slug}`, onClick: UiActions.closeCart, className: "flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-line bg-surface2" },
                            React.createElement(ProductVisual, { image: line.image, height: 64 })),
                        React.createElement("div", { className: "flex flex-1 flex-col" },
                            React.createElement("div", { className: "flex items-start justify-between gap-2" },
                                React.createElement("div", null,
                                    React.createElement("a", { href: `#/product/${line.slug}`, onClick: UiActions.closeCart, className: "font-body text-[13.5px] font-semibold text-ink hover:text-accent2" }, line.name),
                                    React.createElement("p", { className: "font-mono text-[11px] text-faint" }, line.variantLabel),
                                    !line.availableForSale && React.createElement(Badge, { tone: "danger", className: "mt-1" }, "Unavailable")),
                                React.createElement("button", { onClick: () => CartStore.removeLine(line.id), "aria-label": `Remove ${line.name}`, className: "text-faint hover:text-red-300" },
                                    React.createElement(Icon, { name: "trash", className: "h-4 w-4" }))),
                            React.createElement("div", { className: "mt-2 flex items-center justify-between" },
                                React.createElement(QuantityStepper, { size: "sm", value: line.qty, onChange: (q) => CartStore.updateLine(line.id, q), max: line.quantityAvailable || 999 }),
                                React.createElement(Price, { value: line.lineTotal, size: "sm" })))))))),
                React.createElement("div", { className: "border-t border-line px-5 py-4" },
                    React.createElement("div", { className: "flex flex-col gap-1.5 text-[13px] text-dim" },
                        React.createElement("div", { className: "flex justify-between" },
                            React.createElement("span", null, "Subtotal"),
                            React.createElement("span", { className: "tnum text-ink" }, formatMoney(cart.subtotal))),
                        cart.estimatedTax != null && (React.createElement("div", { className: "flex justify-between" },
                            React.createElement("span", null, "Estimated tax"),
                            React.createElement("span", { className: "tnum text-ink" }, formatMoney(cart.estimatedTax)))),
                        React.createElement("div", { className: "flex justify-between" },
                            React.createElement("span", null, "Delivery"),
                            React.createElement("span", { className: "text-faint" }, "Calculated at checkout"))),
                    React.createElement("div", { className: "mt-3 flex justify-between border-t border-line pt-3" },
                        React.createElement("span", { className: "font-display font-semibold text-ink" }, "Total"),
                        React.createElement("span", { className: "font-display text-lg font-bold tnum text-ink" }, formatMoney(cart.total))),
                    React.createElement(Button, { as: "a", href: "#/checkout", onClick: UiActions.closeCart, full: true, size: "lg", className: "mt-4", disabled: !cart.meetsMinimum || cart.hasUnavailable },
                        "Checkout ",
                        React.createElement(Icon, { name: "arrowRight", className: "h-4 w-4" })),
                    React.createElement(Button, { as: "a", href: "#/cart", onClick: UiActions.closeCart, full: true, variant: "ghost", size: "sm", className: "mt-1.5" }, "View full basket")))))));
}
/* ---- toast host --------------------------------------------------------------*/
function ToastHost() {
    const toasts = useToasts();
    return (React.createElement("div", { id: "toast-root", className: "fixed inset-x-0 bottom-0 z-[60] flex flex-col items-center gap-2 p-4 sm:items-end sm:right-4 sm:left-auto" }, toasts.map((t) => (React.createElement("div", { key: t.id, role: "status", className: cx("animate-fade-up flex items-center gap-2 rounded-full border px-4 py-2.5 text-[13px] font-medium shadow-glow backdrop-blur-md", t.tone === "ok" ? "border-emerald-500/40 bg-emerald-950/80 text-emerald-200" : "border-line2 bg-surface/90 text-ink") },
        t.tone === "ok" && React.createElement(Icon, { name: "check", className: "h-4 w-4" }),
        t.message)))));
}
/* ---- footer shop-category links (live from Shopify collections) -------------*/
function FooterCategoryLinks() {
    const collections = useCollections();
    if (collections.status !== "ready" || collections.data.length === 0)
        return null;
    return collections.data.map((c) => (React.createElement("li", { key: c.id },
        React.createElement("a", { href: `#/shop?category=${c.slug}`, className: "hover:text-accent2" }, c.shortName))));
}
/* ---- footer -------------------------------------------------------------------*/
function Footer() {
    const [email, setEmail] = React.useState("");
    function submitEnquiry(e) {
        e.preventDefault();
        pushToast("Thanks — our wholesale team will be in touch shortly.", { tone: "ok" });
        setEmail("");
    }
    return (React.createElement("footer", { className: "mt-24 border-t border-line bg-surface/40" },
        React.createElement(Container, { className: "py-14" },
            React.createElement(TrustStrip, null),
            React.createElement("div", { className: "mt-14 grid grid-cols-2 gap-10 sm:grid-cols-2 lg:grid-cols-5" },
                React.createElement("div", { className: "col-span-2" },
                    React.createElement("a", { href: "#/", className: "flex items-center gap-2.5" },
                        React.createElement("img", { src: "peptalys-logo.png", alt: "Peptalys", className: "h-8 w-auto" }),
                        React.createElement("span", { className: "font-display text-lg font-bold text-ink" }, "Peptalys")),
                    React.createElement("p", { className: "mt-3 max-w-xs text-[13px] leading-relaxed text-dim" },
                        BRAND.strapline,
                        " Wholesale-only supply of UK-manufactured research peptides for laboratories and research institutions."),
                    React.createElement("form", { onSubmit: submitEnquiry, className: "mt-5 flex max-w-sm gap-2" },
                        React.createElement("input", { required: true, type: "email", value: email, onChange: (e) => setEmail(e.target.value), placeholder: "Institutional email", "aria-label": "Email address for wholesale price list", className: "w-full rounded-full border border-line2 bg-surface2 px-4 py-2.5 text-[13px] text-ink placeholder:text-faint outline-none focus:border-accent2" }),
                        React.createElement(Button, { type: "submit", size: "sm", className: "shrink-0" }, "Get price list"))),
                React.createElement("div", null,
                    React.createElement("h4", { className: "font-display text-sm font-semibold text-ink" }, "Shop"),
                    React.createElement("ul", { className: "mt-4 flex flex-col gap-2.5 text-[13px] text-dim" },
                        React.createElement("li", null,
                            React.createElement("a", { href: "#/shop", className: "hover:text-accent2" }, "All peptides")),
                        React.createElement(FooterCategoryLinks, null))),
                React.createElement("div", null,
                    React.createElement("h4", { className: "font-display text-sm font-semibold text-ink" }, "Company"),
                    React.createElement("ul", { className: "mt-4 flex flex-col gap-2.5 text-[13px] text-dim" },
                        React.createElement("li", null,
                            React.createElement("a", { href: "#/about", className: "hover:text-accent2" }, "About Peptalys")),
                        React.createElement("li", null,
                            React.createElement("a", { href: "#/contact", className: "hover:text-accent2" }, "Contact")),
                        React.createElement("li", null,
                            React.createElement("a", { href: "#/delivery", className: "hover:text-accent2" }, "Delivery information")),
                        React.createElement("li", null,
                            React.createElement("a", { href: "#/returns", className: "hover:text-accent2" }, "Returns policy")),
                        React.createElement("li", null,
                            React.createElement("a", { href: "#/admin", className: "hover:text-accent2" }, "Admin")))),
                React.createElement("div", null,
                    React.createElement("h4", { className: "font-display text-sm font-semibold text-ink" }, "Legal"),
                    React.createElement("ul", { className: "mt-4 flex flex-col gap-2.5 text-[13px] text-dim" },
                        React.createElement("li", null,
                            React.createElement("a", { href: "#/legal", className: "hover:text-accent2" }, "Research use policy")),
                        React.createElement("li", null,
                            React.createElement("a", { href: "#/legal", className: "hover:text-accent2" }, "Terms of wholesale supply")),
                        React.createElement("li", null,
                            React.createElement("a", { href: "#/legal", className: "hover:text-accent2" }, "Privacy policy"))))),
            React.createElement("div", { className: "mt-12 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between" },
                React.createElement("p", { className: "font-mono text-[11px] text-faint" },
                    "\u00A9 ",
                    new Date().getFullYear(),
                    " ",
                    BRAND.legalName,
                    ". Company No. ",
                    BRAND.companyNumber,
                    ". Registered in England & Wales."),
                React.createElement("p", { className: "max-w-xl text-[11px] leading-relaxed text-faint" }, "All products are sold strictly for laboratory and in-vitro research use only. Not for human or veterinary use, diagnostic use, or consumption. By purchasing you confirm you are a qualified researcher or institution procuring on behalf of one.")))));
}
"use strict";
function HomePage() {
    const products = useProducts({});
    const collections = useCollections();
    const featured = products.status === "ready" ? products.data.slice(0, 4) : [];
    const heroProduct = featured[0] || null;
    const spotlight = products.status === "ready" ? (products.data[4] || products.data[0] || null) : null;
    const compoundCount = products.status === "ready" ? products.data.length : null;
    return (React.createElement(React.Fragment, null,
        React.createElement("section", { className: "relative overflow-hidden bg-labgrid" },
            React.createElement("div", { className: "pointer-events-none absolute -left-10 top-0 hidden h-full w-32 md:block" },
                React.createElement(DnaStrand, { className: "h-full w-full animate-drift", opacity: 0.45 })),
            React.createElement("div", { className: "pointer-events-none absolute -right-6 top-10 hidden h-full w-28 lg:block" },
                React.createElement(DnaStrand, { className: "h-full w-full animate-drift", opacity: 0.3 })),
            React.createElement("div", { className: "pointer-events-none absolute inset-x-0 top-0 h-[560px] bg-gradient-to-b from-accentDeep/20 via-transparent to-transparent" }),
            React.createElement(Container, { className: "relative grid grid-cols-1 items-center gap-12 py-16 sm:py-20 lg:grid-cols-2 lg:py-28" },
                React.createElement("div", { className: "animate-fade-up" },
                    React.createElement(Badge, { tone: "accent" },
                        React.createElement(Icon, { name: "flask", className: "h-3 w-3" }),
                        " Research Peptides \u00B7 UK Manufactured"),
                    React.createElement("h1", { className: "mt-5 font-display text-4xl font-extrabold leading-[1.05] text-ink sm:text-5xl lg:text-6xl text-balance" },
                        "Research peptides ",
                        React.createElement("span", { className: "text-gradient" }, "for a healthier tomorrow.")),
                    React.createElement("p", { className: "mt-6 max-w-lg text-[16px] leading-relaxed text-dim" }, "Peptalys is a UK wholesale supplier of high-purity research peptides \u2014 synthesised, batch-tested and delivered within 3\u20135 working days to laboratories and research institutions nationwide."),
                    React.createElement("div", { className: "mt-8 flex flex-wrap items-center gap-3" },
                        React.createElement(Button, { as: "a", href: "#/shop", size: "lg" },
                            "Shop the catalogue ",
                            React.createElement(Icon, { name: "arrowRight", className: "h-4 w-4" })),
                        React.createElement(Button, { as: "a", href: "#/contact", variant: "secondary", size: "lg" }, "Request price list")),
                    React.createElement("dl", { className: "mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-line pt-6" }, [
                        ["≥98%", "Purity, HPLC-verified"],
                        ["3–5 days", "UK delivery window"],
                        [compoundCount != null ? `${compoundCount}+` : "—", "Research compounds"],
                    ].map(([n, l]) => (React.createElement("div", { key: l },
                        React.createElement("dt", { className: "font-display text-2xl font-bold text-ink tnum" }, n),
                        React.createElement("dd", { className: "mt-1 text-[11px] leading-snug text-faint" }, l)))))),
                React.createElement("div", { className: "relative animate-fade-up", style: { animationDelay: "120ms" } },
                    React.createElement("div", { className: "absolute inset-0 rounded-[2rem] bg-gradient-to-br from-accent/20 via-transparent to-accent2/10 blur-2xl" }),
                    React.createElement("div", { className: "relative rounded-[2rem] panel p-8 sm:p-10" },
                        React.createElement("p", { className: "font-mono text-[11px] uppercase tracking-[0.2em] text-accent2" }, "Featured Compound"),
                        products.status === "loading" && (React.createElement("div", { className: "mt-4 flex h-[260px] items-center justify-center" },
                            React.createElement("div", { className: "h-6 w-6 animate-spin rounded-full border-2 border-line2 border-t-accent2" }))),
                        products.status === "error" && (React.createElement("div", { className: "mt-4 flex h-[260px] items-center justify-center text-center text-[13px] text-dim" }, "Catalogue temporarily unavailable.")),
                        heroProduct && (React.createElement(React.Fragment, null,
                            React.createElement("div", { className: "mt-4" },
                                React.createElement(ProductVisual, { image: heroProduct.images[0], height: 260 })),
                            React.createElement("div", { className: "mt-4 flex items-end justify-between gap-4" },
                                React.createElement("div", null,
                                    React.createElement("h3", { className: "font-display text-xl font-bold text-ink" }, heroProduct.name),
                                    React.createElement("p", { className: "text-[12px] text-dim" }, heroProduct.subcategory)),
                                React.createElement(Price, { value: priceRange(heroProduct).min, size: "md" })),
                            React.createElement("p", { className: "mt-2 font-mono text-[11px] uppercase tracking-[0.08em] text-faint" }, "Sold in units of 10 \u2014 1 unit added to your basket = 10 of this item"))),
                        products.status === "ready" && !heroProduct && (React.createElement("div", { className: "mt-4 flex h-[260px] items-center justify-center text-center text-[13px] text-dim" }, "No products published yet."))))),
            React.createElement("div", { className: "relative border-y border-line bg-surface/40 py-4" },
                React.createElement("div", { className: "flex overflow-hidden" },
                    React.createElement("div", { className: "flex shrink-0 animate-marquee items-center gap-16 pr-16" }, [...Array(2)].flatMap(() => TRUST_POINTS.map((t) => (React.createElement("span", { key: t.title + Math.random(), className: "flex shrink-0 items-center gap-2.5 font-mono text-[12px] uppercase tracking-[0.14em] text-faint" },
                        React.createElement(Icon, { name: t.icon, className: "h-4 w-4 text-accent2" }),
                        " ",
                        t.title))))),
                    React.createElement("div", { className: "flex shrink-0 animate-marquee items-center gap-16 pr-16", "aria-hidden": "true" }, [...Array(2)].flatMap(() => TRUST_POINTS.map((t) => (React.createElement("span", { key: "dup-" + t.title + Math.random(), className: "flex shrink-0 items-center gap-2.5 font-mono text-[12px] uppercase tracking-[0.14em] text-faint" },
                        React.createElement(Icon, { name: t.icon, className: "h-4 w-4 text-accent2" }),
                        " ",
                        t.title)))))))),
        React.createElement("section", { className: "py-20 sm:py-28" },
            React.createElement(Container, { className: "grid grid-cols-1 items-center gap-14 lg:grid-cols-2" },
                React.createElement("div", { className: "order-2 lg:order-1" },
                    React.createElement(Eyebrow, null, "Quality \u00B7 Supply \u00B7 Progress"),
                    React.createElement("h2", { className: "mt-3 font-display text-3xl font-bold text-ink sm:text-4xl text-balance" }, "Built by researchers, for research programmes."),
                    React.createElement("p", { className: "mt-5 text-[15px] leading-relaxed text-dim" }, "Peptalys exists to close the gap between promising peptide science and the labs trying to study it \u2014 supplying independently purity-tested compounds at wholesale volumes, without the friction that slows research procurement down."),
                    React.createElement("p", { className: "mt-4 text-[15px] leading-relaxed text-dim" }, "Every batch is synthesised in the UK, verified by HPLC to a minimum 98% purity, and shipped in secure, tamper-evident packaging \u2014 arriving within 3\u20135 working days, so what leaves our facility is exactly what your protocol expects."),
                    React.createElement(Button, { as: "a", href: "#/about", variant: "outline", className: "mt-7" },
                        "Our story ",
                        React.createElement(Icon, { name: "arrowRight", className: "h-4 w-4" }))),
                React.createElement("div", { className: "order-1 lg:order-2" },
                    React.createElement("div", { className: "relative rounded-[2rem] panel p-8" },
                        React.createElement("div", { className: "grid grid-cols-2 gap-4" }, [
                            { icon: "microscope", label: "In-house synthesis" },
                            { icon: "shieldCheck", label: "Batch QC & HPLC" },
                            { icon: "package", label: "Tamper-evident packaging" },
                            { icon: "truck", label: "3–5 working day delivery" },
                        ].map((s) => (React.createElement("div", { key: s.label, className: "flex flex-col gap-3 rounded-xl border border-line bg-surface2/50 p-5" },
                            React.createElement(Icon, { name: s.icon, className: "h-6 w-6 text-accent2" }),
                            React.createElement("p", { className: "font-body text-[13px] font-medium text-ink" }, s.label))))))))),
        React.createElement("section", { className: "py-4 sm:py-8" },
            React.createElement(Container, null,
                React.createElement(SectionHeading, { eyebrow: "Discover", title: "Shop by research focus", body: "Every listing includes full specification and research literature summaries, sourced live from our catalogue." }),
                collections.status === "loading" && (React.createElement("div", { className: "mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5" }, [...Array(5)].map((_, i) => React.createElement("div", { key: i, className: "h-40 animate-pulse rounded-2xl bg-surface2/60" })))),
                collections.status === "ready" && collections.data.length > 0 && (React.createElement("div", { className: "mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5" }, collections.data.map((c) => (React.createElement("a", { key: c.id, href: `#/shop?category=${c.slug}`, className: "group flex flex-col justify-between gap-6 rounded-2xl panel p-6 transition-all hover:-translate-y-1 hover:border-accent/40 hover:shadow-glow" },
                    React.createElement(Icon, { name: categoryIcon(c), className: "h-7 w-7 text-accent2" }),
                    React.createElement("div", null,
                        React.createElement("h3", { className: "font-display text-[15px] font-semibold leading-snug text-ink" }, c.shortName),
                        c.description && React.createElement("p", { className: "mt-2 text-[12px] leading-relaxed text-dim clamp-3" }, c.description)),
                    React.createElement("span", { className: "flex items-center gap-1 font-mono text-[11px] uppercase tracking-[0.1em] text-accent2 opacity-0 transition-opacity group-hover:opacity-100" },
                        "Explore ",
                        React.createElement(Icon, { name: "arrowRight", className: "h-3 w-3" }))))))),
                collections.status === "ready" && collections.data.length === 0 && (React.createElement("p", { className: "mt-10 text-[13px] text-dim" }, "No collections published yet.")))),
        React.createElement("section", { className: "py-20 sm:py-28" },
            React.createElement(Container, null,
                React.createElement("div", { className: "flex flex-wrap items-end justify-between gap-4" },
                    React.createElement(SectionHeading, { eyebrow: "Catalogue", title: "Featured research compounds" }),
                    React.createElement(Button, { as: "a", href: "#/shop", variant: "ghost" },
                        "View all peptides ",
                        React.createElement(Icon, { name: "arrowRight", className: "h-4 w-4" }))),
                products.status === "loading" && (React.createElement("div", { className: "mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4" }, [...Array(4)].map((_, i) => React.createElement("div", { key: i, className: "h-80 animate-pulse rounded-2xl bg-surface2/60" })))),
                products.status === "error" && (React.createElement("div", { className: "mt-10" },
                    React.createElement(EmptyState, { icon: "alertTriangle", title: "Couldn't load the catalogue", body: products.error || "Please try again shortly." }))),
                products.status === "ready" && featured.length > 0 && (React.createElement("div", { className: "mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4" }, featured.map((p) => React.createElement(ProductCard, { key: p.id, product: p })))),
                products.status === "ready" && featured.length === 0 && (React.createElement("div", { className: "mt-10" },
                    React.createElement(EmptyState, { icon: "package", title: "No products published yet", body: "Add products in Shopify to see them here." }))))),
        spotlight && (React.createElement("section", { className: "py-4 sm:py-8" },
            React.createElement(Container, null,
                React.createElement("div", { className: "grid grid-cols-1 items-center gap-0 overflow-hidden rounded-[2rem] panel lg:grid-cols-2" },
                    React.createElement("div", { className: "relative flex items-center justify-center bg-labgrid p-12" },
                        React.createElement(ProductVisual, { image: spotlight.images[0], height: 300 })),
                    React.createElement("div", { className: "p-8 sm:p-12" },
                        React.createElement(Eyebrow, null, "Research Spotlight"),
                        React.createElement("h2", { className: "mt-3 font-display text-3xl font-bold text-ink text-balance" }, spotlight.name),
                        React.createElement("p", { className: "mt-4 text-[15px] leading-relaxed text-dim" }, spotlight.shortDescription),
                        React.createElement("p", { className: "mt-3 font-mono text-[11px] uppercase tracking-[0.08em] text-faint" }, "Sold in units of 10 \u2014 1 unit added to your basket = 10 of this item"),
                        React.createElement("div", { className: "mt-5 flex flex-wrap items-center gap-4" },
                            React.createElement(Price, { value: priceRange(spotlight).min, rrp: rrpFor(spotlight), size: "lg" }),
                            React.createElement(Button, { as: "a", href: `#/product/${spotlight.slug}` },
                                "View compound ",
                                React.createElement(Icon, { name: "arrowRight", className: "h-4 w-4" })))))))),
        React.createElement("section", { className: "py-20 sm:py-28" },
            React.createElement(Container, null,
                React.createElement(SectionHeading, { align: "center", eyebrow: "How it works", title: "Wholesale ordering, simplified", className: "mx-auto", body: "Peptalys supplies at wholesale volume only \u2014 built around a straightforward three-step process." }),
                React.createElement("div", { className: "mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3" }, [
                    { n: "01", icon: "cart", title: "Build your order", body: "Browse the catalogue and add compounds to your basket. Every product is sold in units of 10 — 1 unit added to your basket is 10 of that item." },
                    { n: "02", icon: "scale", title: "Meet the minimum", body: `A ${formatMoney(SETTINGS.minimumOrderValue)} minimum order value applies across the whole basket — mix and match compounds freely.` },
                    { n: "03", icon: "truck", title: "Secure checkout", body: "Complete payment through our secure Shopify checkout, then delivery follows within 3–5 working days." },
                ].map((s) => (React.createElement("div", { key: s.n, className: "relative rounded-2xl border border-line bg-surface/40 p-7" },
                    React.createElement("span", { className: "font-mono text-4xl font-bold text-surface3" }, s.n),
                    React.createElement(Icon, { name: s.icon, className: "mt-2 h-6 w-6 text-accent2" }),
                    React.createElement("h3", { className: "mt-4 font-display text-lg font-semibold text-ink" }, s.title),
                    React.createElement("p", { className: "mt-2 text-[13.5px] leading-relaxed text-dim" }, s.body))))))),
        React.createElement("section", { className: "pb-20 sm:pb-28" },
            React.createElement(Container, null,
                React.createElement("div", { className: "relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-accentDeep via-surface2 to-surface p-10 text-center sm:p-16" },
                    React.createElement("div", { className: "pointer-events-none absolute inset-0 bg-labgrid opacity-40" }),
                    React.createElement("div", { className: "relative" },
                        React.createElement("h2", { className: "font-display text-3xl font-bold text-ink sm:text-4xl text-balance" }, "Ready to stock your research programme?"),
                        React.createElement("p", { className: "mx-auto mt-4 max-w-lg text-[15px] text-dim" }, "Create a basket, or speak to our wholesale team for a bespoke quotation on volume orders."),
                        React.createElement("div", { className: "mt-8 flex flex-wrap items-center justify-center gap-3" },
                            React.createElement(Button, { as: "a", href: "#/shop", size: "lg" }, "Shop the catalogue"),
                            React.createElement(Button, { as: "a", href: "#/contact", variant: "secondary", size: "lg" }, "Talk to wholesale"))))))));
}
"use strict";
const SORT_OPTIONS = [
    { value: "featured", label: "Featured" },
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
    { value: "name-asc", label: "Name: A–Z" },
];
function useShopFilters(route) {
    const [state, setState] = React.useState({
        q: route.query.q || "",
        categories: route.query.category ? [route.query.category] : [],
        sort: route.query.sort || "featured",
        inStockOnly: route.query.inStock === "1",
        maxPrice: route.query.maxPrice ? Number(route.query.maxPrice) : null, // null = no cap yet (bounds not known until products load)
    });
    // Re-sync when the URL changes externally (nav from a category card / footer link)
    React.useEffect(() => {
        setState((s) => ({
            ...s,
            q: route.query.q || "",
            categories: route.query.category ? [route.query.category] : s.categories,
        }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [route.query.q, route.query.category]);
    return [state, setState];
}
function ShopPage({ initialCategory }) {
    const route = useRoute();
    const [filters, setFilters] = useShopFilters(route);
    const [mobileFiltersOpen, setMobileFiltersOpen] = React.useState(false);
    const products = useProducts({});
    const collections = useCollections();
    const activeCategorySlug = initialCategory || filters.categories[0] || null;
    const activeCategory = collections.status === "ready" ? collections.data.find((c) => c.slug === activeCategorySlug) || null : null;
    React.useEffect(() => {
        document.title = activeCategory ? `${activeCategory.name} — Peptalys` : (PAGE_TITLES["/shop"] || "Shop — Peptalys");
        setMetaTag("description", (activeCategory && activeCategory.description) || PAGE_DESCRIPTIONS["/shop"]);
    }, [activeCategory]);
    const priceCeiling = products.status === "ready" && products.data.length
        ? Math.max(1, Math.ceil(Math.max(...products.data.map((p) => priceRange(p).max))))
        : null;
    const effectiveMaxPrice = filters.maxPrice != null ? filters.maxPrice : priceCeiling;
    const results = React.useMemo(() => {
        if (products.status !== "ready")
            return [];
        let list = products.data.slice();
        if (activeCategorySlug) {
            list = list.filter((p) => (p.categories || []).some((c) => c.slug === activeCategorySlug));
        }
        if (filters.q.trim()) {
            const q = filters.q.trim().toLowerCase();
            list = list.filter((p) => p.name.toLowerCase().includes(q) ||
                p.shortDescription.toLowerCase().includes(q) ||
                (p.subcategory || "").toLowerCase().includes(q));
        }
        if (filters.inStockOnly) {
            list = list.filter((p) => productPurchasable(p));
        }
        if (effectiveMaxPrice != null) {
            list = list.filter((p) => priceRange(p).min <= effectiveMaxPrice);
        }
        switch (filters.sort) {
            case "price-asc":
                list.sort((a, b) => priceRange(a).min - priceRange(b).min);
                break;
            case "price-desc":
                list.sort((a, b) => priceRange(b).min - priceRange(a).min);
                break;
            case "name-asc":
                list.sort((a, b) => a.name.localeCompare(b.name));
                break;
            default:
                break;
        }
        return list;
    }, [products.status, products.data, activeCategorySlug, filters, effectiveMaxPrice]);
    function toggleCategory(slug) {
        const next = filters.categories[0] === slug ? [] : [slug];
        setFilters((f) => ({ ...f, categories: next }));
        navigate("/shop", next.length ? { category: slug } : {}, { scrollTop: false });
    }
    function clearAll() {
        setFilters({ q: "", categories: [], sort: "featured", inStockOnly: false, maxPrice: null });
        navigate("/shop", {}, { scrollTop: false });
    }
    const hasActiveFilters = filters.q || filters.categories.length || filters.inStockOnly || (filters.maxPrice != null && filters.maxPrice < priceCeiling);
    const FilterPanel = (React.createElement("div", { className: "flex flex-col gap-8" },
        React.createElement("div", null,
            React.createElement("h3", { className: "font-display text-sm font-semibold text-ink" }, "Category"),
            collections.status === "loading" && React.createElement("p", { className: "mt-3 text-[12.5px] text-faint" }, "Loading\u2026"),
            collections.status === "ready" && (React.createElement("ul", { className: "mt-3 flex flex-col gap-1" },
                React.createElement("li", null,
                    React.createElement("button", { onClick: () => { setFilters((f) => ({ ...f, categories: [] })); navigate("/shop", {}, { scrollTop: false }); }, className: cx("w-full rounded-lg px-2.5 py-2 text-left text-[13.5px] transition-colors", !activeCategorySlug ? "bg-accent/15 text-accent2 font-medium" : "text-dim hover:bg-surface2 hover:text-ink") },
                        "All peptides ",
                        products.status === "ready" && React.createElement("span", { className: "font-mono text-[11px] text-faint" },
                            "(",
                            products.data.length,
                            ")"))),
                collections.data.map((c) => {
                    const count = products.status === "ready" ? products.data.filter((p) => (p.categories || []).some((pc) => pc.slug === c.slug)).length : null;
                    const active = activeCategorySlug === c.slug;
                    return (React.createElement("li", { key: c.id },
                        React.createElement("button", { onClick: () => toggleCategory(c.slug), className: cx("w-full rounded-lg px-2.5 py-2 text-left text-[13.5px] transition-colors", active ? "bg-accent/15 text-accent2 font-medium" : "text-dim hover:bg-surface2 hover:text-ink") },
                            c.shortName,
                            " ",
                            count != null && React.createElement("span", { className: "font-mono text-[11px] text-faint" },
                                "(",
                                count,
                                ")"))));
                })))),
        priceCeiling != null && (React.createElement("div", null,
            React.createElement("h3", { className: "font-display text-sm font-semibold text-ink" }, "Max unit price"),
            React.createElement("input", { type: "range", min: "0", max: priceCeiling, step: "1", value: effectiveMaxPrice, onChange: (e) => setFilters((f) => ({ ...f, maxPrice: Number(e.target.value) })), className: "mt-4 w-full accent-accent", "aria-label": "Maximum unit price" }),
            React.createElement("div", { className: "mt-1 flex justify-between font-mono text-[11px] text-faint" },
                React.createElement("span", null, "\u00A30"),
                React.createElement("span", { className: "text-ink" },
                    "Up to ",
                    formatMoney(effectiveMaxPrice))))),
        React.createElement("label", { className: "flex items-center gap-2.5 text-[13.5px] text-dim" },
            React.createElement("input", { type: "checkbox", checked: filters.inStockOnly, onChange: (e) => setFilters((f) => ({ ...f, inStockOnly: e.target.checked })), className: "h-4 w-4 rounded border-line2 bg-surface2 accent-accent" }),
            "In stock only"),
        hasActiveFilters && (React.createElement(Button, { variant: "ghost", size: "sm", onClick: clearAll, className: "self-start !px-0" },
            React.createElement(Icon, { name: "close", className: "h-3.5 w-3.5" }),
            " Clear all filters"))));
    return (React.createElement(Container, { className: "py-10 sm:py-14" },
        React.createElement(Breadcrumbs, { items: [{ label: "Home", href: "#/" }, ...(activeCategory ? [{ label: "Shop", href: "#/shop" }, { label: activeCategory.shortName }] : [{ label: "Shop" }])] }),
        React.createElement("div", { className: "mt-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between" },
            React.createElement("div", null,
                React.createElement("h1", { className: "font-display text-3xl font-bold text-ink sm:text-4xl" }, activeCategory ? activeCategory.name : "All Research Peptides"),
                activeCategory && activeCategory.description && React.createElement("p", { className: "mt-2 max-w-xl text-[14px] text-dim" }, activeCategory.description))),
        React.createElement("div", { className: "mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[240px_1fr]" },
            React.createElement("aside", { className: "hidden lg:block" }, FilterPanel),
            React.createElement("div", null,
                React.createElement("div", { className: "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between" },
                    React.createElement("div", { className: "relative flex-1 sm:max-w-xs" },
                        React.createElement(Icon, { name: "search", className: "pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" }),
                        React.createElement("input", { value: filters.q, onChange: (e) => setFilters((f) => ({ ...f, q: e.target.value })), placeholder: "Search this catalogue\u2026", "aria-label": "Search catalogue", className: "w-full rounded-full border border-line2 bg-surface2 py-2.5 pl-10 pr-4 text-[13px] text-ink placeholder:text-faint outline-none focus:border-accent2" })),
                    React.createElement("div", { className: "flex items-center gap-2" },
                        React.createElement("button", { onClick: () => setMobileFiltersOpen(true), className: "flex items-center gap-1.5 rounded-full border border-line2 px-4 py-2.5 text-[13px] text-ink lg:hidden" },
                            React.createElement(Icon, { name: "filter", className: "h-4 w-4" }),
                            " Filters"),
                        React.createElement("div", { className: "relative" },
                            React.createElement("select", { value: filters.sort, onChange: (e) => setFilters((f) => ({ ...f, sort: e.target.value })), "aria-label": "Sort products", className: "appearance-none rounded-full border border-line2 bg-surface2 py-2.5 pl-4 pr-9 text-[13px] text-ink outline-none focus:border-accent2" }, SORT_OPTIONS.map((o) => React.createElement("option", { key: o.value, value: o.value }, o.label))),
                            React.createElement(Icon, { name: "chevronDown", className: "pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-faint" })))),
                products.status === "loading" && (React.createElement("div", { className: "mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3" }, [...Array(6)].map((_, i) => React.createElement("div", { key: i, className: "h-80 animate-pulse rounded-2xl bg-surface2/60" })))),
                products.status === "error" && (React.createElement("div", { className: "mt-5" },
                    React.createElement(EmptyState, { icon: "alertTriangle", title: "Couldn't load the catalogue", body: products.error || "Please try again shortly.", action: React.createElement(Button, { variant: "secondary", onClick: () => window.location.reload() }, "Reload") }))),
                products.status === "ready" && (React.createElement(React.Fragment, null,
                    React.createElement("p", { className: "mt-4 font-mono text-[11px] uppercase tracking-[0.1em] text-faint" },
                        results.length,
                        " result",
                        results.length === 1 ? "" : "s"),
                    results.length === 0 ? (React.createElement(EmptyState, { icon: "search", title: "No peptides match those filters", body: "Try widening your price range or clearing filters.", action: React.createElement(Button, { variant: "secondary", onClick: clearAll }, "Clear filters") })) : (React.createElement("div", { className: "mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3" }, results.map((p) => React.createElement(ProductCard, { key: p.id, product: p })))))))),
        mobileFiltersOpen && (React.createElement("div", { className: "fixed inset-0 z-50 lg:hidden" },
            React.createElement("div", { className: "absolute inset-0 bg-[#020408]/70", onClick: () => setMobileFiltersOpen(false) }),
            React.createElement("div", { className: "absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto rounded-t-2xl bg-surface p-6" },
                React.createElement("div", { className: "mb-4 flex items-center justify-between" },
                    React.createElement("h2", { className: "font-display text-lg font-semibold text-ink" }, "Filters"),
                    React.createElement("button", { onClick: () => setMobileFiltersOpen(false), "aria-label": "Close filters" },
                        React.createElement(Icon, { name: "close", className: "h-5 w-5 text-dim" }))),
                FilterPanel,
                React.createElement(Button, { full: true, className: "mt-6", onClick: () => setMobileFiltersOpen(false) },
                    "Show ",
                    results.length,
                    " results"))))));
}
"use strict";
function ProductPage({ slug }) {
    const productState = useProduct(slug);
    const product = productState.data;
    const [activeImage, setActiveImage] = React.useState(0);
    const [variantIdx, setVariantIdx] = React.useState(0);
    const [qty, setQty] = React.useState(1);
    const [tab, setTab] = React.useState("description");
    const [adding, setAdding] = React.useState(false);
    React.useEffect(() => {
        setActiveImage(0);
        setVariantIdx(0);
        setQty(1);
        setTab("description");
    }, [slug]);
    // Product page's own title / meta description / Product JSON-LD — moved
    // here (rather than centrally in the router) because the product now
    // arrives asynchronously from Shopify.
    React.useEffect(() => {
        if (!product)
            return;
        const range = priceRange(product);
        document.title = `${product.name} — ${product.subcategory || "Peptalys"} | Peptalys`;
        setMetaTag("description", product.shortDescription);
        setJsonLd("product-jsonld", {
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.name,
            sku: product.sku,
            brand: { "@type": "Brand", name: product.brand },
            description: product.shortDescription,
            offers: {
                "@type": "AggregateOffer",
                priceCurrency: SETTINGS.currency,
                lowPrice: range.min,
                highPrice: range.max,
                offerCount: product.variants.length,
                availability: productPurchasable(product) ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
            },
        });
        return () => setJsonLd("product-jsonld", null);
    }, [product]);
    const related = useProducts(product ? { collection: product.category || undefined } : {});
    if (productState.status === "loading") {
        return (React.createElement(Container, { className: "py-24" },
            React.createElement("div", { className: "grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16" },
                React.createElement("div", { className: "h-[400px] animate-pulse rounded-2xl bg-surface2/60" }),
                React.createElement("div", { className: "flex flex-col gap-4" },
                    React.createElement("div", { className: "h-4 w-1/3 animate-pulse rounded bg-surface2/60" }),
                    React.createElement("div", { className: "h-8 w-2/3 animate-pulse rounded bg-surface2/60" }),
                    React.createElement("div", { className: "h-20 animate-pulse rounded bg-surface2/60" })))));
    }
    if (productState.status === "not_found" || (productState.status === "ready" && !product)) {
        return (React.createElement(Container, { className: "py-24" },
            React.createElement(EmptyState, { icon: "search", title: "Compound not found", body: "This product may have been removed from the catalogue.", action: React.createElement(Button, { as: "a", href: "#/shop" }, "Back to shop") })));
    }
    if (productState.status === "error") {
        return (React.createElement(Container, { className: "py-24" },
            React.createElement(EmptyState, { icon: "alertTriangle", title: "Couldn't load this product", body: productState.error || "Please try again shortly.", action: React.createElement(Button, { as: "a", href: "#/shop" }, "Back to shop") })));
    }
    const variant = product.variants[variantIdx] || product.variants[0];
    const avail = variantAvailability(variant);
    const purchasable = variant.availableForSale;
    const relatedList = related.status === "ready"
        ? related.data.filter((p) => p.id !== product.id).slice(0, 4)
        : [];
    function addToBasket() {
        if (!purchasable)
            return;
        setAdding(true);
        CartStore.addLine(variant.id, qty)
            .then(() => pushToast(`${product.name} ${variant.label} × ${qty} added to basket`, { tone: "ok" }))
            .catch((err) => pushToast(err.message || "Couldn't add that to your basket", { tone: "default" }))
            .finally(() => setAdding(false));
    }
    return (React.createElement(Container, { className: "py-10 sm:py-14" },
        React.createElement(Breadcrumbs, { items: [
                { label: "Home", href: "#/" },
                { label: "Shop", href: "#/shop" },
                ...(product.category ? [{ label: product.subcategory || "Category", href: `#/shop?category=${product.category}` }] : []),
                { label: product.name },
            ] }),
        React.createElement("div", { className: "mt-6 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16" },
            React.createElement("div", null,
                React.createElement("div", { className: "relative flex items-center justify-center overflow-hidden rounded-2xl border border-line bg-labgrid bg-surface/50 p-10" },
                    product.tag && React.createElement(Badge, { tone: "accent", className: "absolute left-4 top-4" }, product.tag),
                    React.createElement(ProductVisual, { image: product.images[activeImage] || product.images[0], height: 340 })),
                product.images.length > 1 && (React.createElement("div", { className: "mt-4 flex gap-3" }, product.images.map((img, i) => (React.createElement("button", { key: i, onClick: () => setActiveImage(i), "aria-label": `Show image ${i + 1}`, className: cx("flex h-20 w-20 shrink-0 items-center justify-center rounded-xl border bg-surface2 p-2 transition-colors", activeImage === i ? "border-accent2" : "border-line hover:border-line2") },
                    React.createElement(ProductVisual, { image: img, height: 60 }))))))),
            React.createElement("div", null,
                product.subcategory && React.createElement("p", { className: "font-mono text-[11px] uppercase tracking-[0.16em] text-accent2" }, product.subcategory),
                React.createElement("h1", { className: "mt-2 font-display text-3xl font-bold text-ink sm:text-4xl" }, product.name),
                variant.sku && React.createElement("p", { className: "mt-1 font-mono text-[12px] text-faint" },
                    "SKU: ",
                    variant.sku),
                product.shortDescription && React.createElement("p", { className: "mt-4 text-[15px] leading-relaxed text-dim" }, product.shortDescription),
                React.createElement("div", { className: "mt-6 flex items-center gap-3" },
                    React.createElement(Price, { value: variant.retailPrice, rrp: variant.rrp, size: "lg" }),
                    React.createElement(Badge, { tone: avail.tone }, avail.label)),
                React.createElement("p", { className: "mt-1 text-[11px] text-faint" }, "Delivery & any applicable tax calculated securely at checkout"),
                React.createElement("p", { className: "mt-1 font-mono text-[11px] uppercase tracking-[0.06em] text-faint" }, "Sold in units of 10 \u2014 1 unit added to your basket is 10 of this item"),
                product.variants.length > 1 && (React.createElement("div", { className: "mt-7" },
                    React.createElement("h3", { className: "font-body text-[13px] font-semibold text-ink" }, "Size"),
                    React.createElement("div", { className: "mt-2.5 flex flex-wrap gap-2" }, product.variants.map((v, i) => (React.createElement("button", { key: v.id, onClick: () => setVariantIdx(i), disabled: !v.availableForSale, className: cx("rounded-full border px-4 py-2 font-mono text-[13px] transition-colors disabled:cursor-not-allowed disabled:opacity-40", i === variantIdx ? "border-accent bg-accent/15 text-accent2" : "border-line2 text-dim hover:border-line2 hover:text-ink") },
                        v.label,
                        !v.availableForSale ? " · Sold out" : "")))))),
                React.createElement("div", { className: "mt-7 flex flex-wrap items-center gap-3" },
                    React.createElement(QuantityStepper, { value: qty, onChange: setQty, max: variant.quantityAvailable || 999 }),
                    React.createElement(Button, { size: "lg", onClick: addToBasket, disabled: !purchasable || adding, className: "flex-1 min-w-[200px]" },
                        React.createElement(Icon, { name: "cart", className: "h-4 w-4" }),
                        " ",
                        purchasable ? (adding ? "Adding…" : "Add to basket") : "Out of stock")),
                React.createElement("p", { className: "mt-3 text-[12px] text-dim" },
                    "Line total: ",
                    React.createElement("span", { className: "tnum text-ink font-medium" }, formatMoney(variant.retailPrice * qty))),
                React.createElement("div", { className: "mt-7 grid grid-cols-1 gap-3 rounded-xl border border-line bg-surface/40 p-4 sm:grid-cols-2" },
                    React.createElement("div", { className: "flex items-start gap-2.5" },
                        React.createElement(Icon, { name: "truck", className: "mt-0.5 h-4 w-4 shrink-0 text-accent2" }),
                        React.createElement("p", { className: "text-[12.5px] leading-snug text-dim" },
                            React.createElement("a", { href: "#/delivery", className: "text-ink hover:text-accent2" }, "3\u20135 working day delivery"),
                            ", nationwide across the UK.")),
                    React.createElement("div", { className: "flex items-start gap-2.5" },
                        React.createElement(Icon, { name: "shieldCheck", className: "mt-0.5 h-4 w-4 shrink-0 text-accent2" }),
                        React.createElement("p", { className: "text-[12.5px] leading-snug text-dim" },
                            "Batch-tested \u226598% purity, ",
                            React.createElement("a", { href: "#/returns", className: "text-ink hover:text-accent2" }, "quality guaranteed"),
                            "."))),
                React.createElement("div", { className: "mt-5 flex items-start gap-2.5 rounded-xl border border-amber-500/25 bg-amber-500/5 p-4" },
                    React.createElement(Icon, { name: "alertTriangle", className: "mt-0.5 h-4 w-4 shrink-0 text-amber-300" }),
                    React.createElement("p", { className: "text-[12px] leading-snug text-amber-200/90" },
                        "For laboratory research use only. Not for human or veterinary use, diagnostic use, or consumption. ",
                        React.createElement("a", { href: "#/legal", className: "underline hover:text-amber-100" }, "Research use policy"))))),
        (product.fullDescription.length > 0 || Object.keys(product.specs || {}).length > 0) && (React.createElement("div", { className: "mt-16" },
            React.createElement("div", { className: "flex gap-6 border-b border-line" }, [{ id: "description", label: "Description" }].map((t) => (React.createElement("button", { key: t.id, onClick: () => setTab(t.id), className: cx("relative pb-4 text-[14px] font-medium transition-colors", tab === t.id ? "text-ink" : "text-faint hover:text-dim") },
                t.label,
                tab === t.id && React.createElement("span", { className: "absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-accent" }))))),
            React.createElement("div", { className: "mt-8 max-w-3xl" }, tab === "description" && (React.createElement("div", { className: "flex flex-col gap-4" },
                product.fullDescription.length > 0
                    ? product.fullDescription.map((p, i) => React.createElement("p", { key: i, className: "text-[14.5px] leading-relaxed text-dim" }, p))
                    : React.createElement("p", { className: "text-[14.5px] leading-relaxed text-dim" }, "No further description has been added for this product yet."),
                React.createElement("dl", { className: "mt-2 divide-y divide-line rounded-xl border border-line" },
                    product.brand && (React.createElement("div", { className: "grid grid-cols-2 gap-4 px-5 py-3.5" },
                        React.createElement("dt", { className: "text-[13px] text-faint" }, "Brand"),
                        React.createElement("dd", { className: "text-[13px] text-ink" }, product.brand))),
                    React.createElement("div", { className: "grid grid-cols-2 gap-4 px-5 py-3.5" },
                        React.createElement("dt", { className: "text-[13px] text-faint" }, "Available sizes"),
                        React.createElement("dd", { className: "text-[13px] text-ink" }, product.variants.map((v) => v.label).join(", "))))))))),
        relatedList.length > 0 && (React.createElement("div", { className: "mt-20" },
            React.createElement(SectionHeading, { eyebrow: "You may also need", title: "Related compounds" }),
            React.createElement("div", { className: "mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4" }, relatedList.map((p) => React.createElement(ProductCard, { key: p.id, product: p })))))));
}
"use strict";
function CartPage() {
    const cart = useCart();
    if (cart.status === "loading" && cart.lines.length === 0) {
        return (React.createElement(Container, { className: "py-16 sm:py-24" },
            React.createElement("div", { className: "flex flex-col items-center gap-3 py-16 text-dim" },
                React.createElement("div", { className: "h-6 w-6 animate-spin rounded-full border-2 border-line2 border-t-accent2" }),
                React.createElement("p", { className: "text-[13px]" }, "Loading your basket\u2026"))));
    }
    if (cart.status === "error" && cart.lines.length === 0) {
        return (React.createElement(Container, { className: "py-16 sm:py-24" },
            React.createElement(EmptyState, { icon: "alertTriangle", title: "Couldn't load your basket", body: cart.error || "Please try again.", action: React.createElement(Button, { variant: "secondary", onClick: () => CartStore.init() }, "Retry") })));
    }
    if (cart.lines.length === 0) {
        return (React.createElement(Container, { className: "py-16 sm:py-24" },
            React.createElement(EmptyState, { icon: "cart", title: "Your basket is empty", body: "Browse the catalogue and add research peptides to build your wholesale order.", action: React.createElement(Button, { as: "a", href: "#/shop" }, "Browse the shop") })));
    }
    return (React.createElement(Container, { className: "py-10 sm:py-14" },
        React.createElement(Breadcrumbs, { items: [{ label: "Home", href: "#/" }, { label: "Basket" }] }),
        React.createElement("h1", { className: "mt-4 font-display text-3xl font-bold text-ink sm:text-4xl" }, "Your Basket"),
        cart.hasUnavailable && (React.createElement("div", { className: "mt-5 flex items-start gap-2.5 rounded-xl border border-amber-500/25 bg-amber-500/5 p-4" },
            React.createElement(Icon, { name: "alertTriangle", className: "mt-0.5 h-4 w-4 shrink-0 text-amber-300" }),
            React.createElement("p", { className: "text-[13px] leading-snug text-amber-200/90" }, "One or more items below are no longer available and must be removed before you can check out."))),
        React.createElement("div", { className: "mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_360px]" },
            React.createElement("div", { className: "overflow-hidden rounded-2xl border border-line" },
                React.createElement("table", { className: "w-full text-left" },
                    React.createElement("thead", { className: "border-b border-line bg-surface/60" },
                        React.createElement("tr", null,
                            React.createElement("th", { className: "px-5 py-3 text-[11px] font-medium uppercase tracking-wide text-faint" }, "Product"),
                            React.createElement("th", { className: "px-5 py-3 text-[11px] font-medium uppercase tracking-wide text-faint" }, "Unit price"),
                            React.createElement("th", { className: "px-5 py-3 text-[11px] font-medium uppercase tracking-wide text-faint" }, "Quantity"),
                            React.createElement("th", { className: "px-5 py-3 text-right text-[11px] font-medium uppercase tracking-wide text-faint" }, "Total"),
                            React.createElement("th", { className: "px-5 py-3" }))),
                    React.createElement("tbody", { className: "divide-y divide-line" }, cart.lines.map((line) => (React.createElement("tr", { key: line.id, className: !line.availableForSale ? "opacity-60" : undefined },
                        React.createElement("td", { className: "px-5 py-4" },
                            React.createElement("div", { className: "flex items-center gap-3" },
                                React.createElement("a", { href: `#/product/${line.slug}`, className: "flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-line bg-surface2" },
                                    React.createElement(ProductVisual, { image: line.image, height: 56 })),
                                React.createElement("div", null,
                                    React.createElement("a", { href: `#/product/${line.slug}`, className: "font-body text-[14px] font-semibold text-ink hover:text-accent2" }, line.name),
                                    React.createElement("p", { className: "font-mono text-[11px] text-faint" },
                                        line.variantLabel,
                                        line.variantSku ? ` · ${line.variantSku}` : ""),
                                    !line.availableForSale && React.createElement(Badge, { tone: "danger", className: "mt-1" }, "Unavailable")))),
                        React.createElement("td", { className: "px-5 py-4 tnum text-[13.5px] text-dim" }, formatMoney(line.unitPrice)),
                        React.createElement("td", { className: "px-5 py-4" },
                            React.createElement(QuantityStepper, { size: "sm", value: line.qty, onChange: (q) => CartStore.updateLine(line.id, q), max: line.quantityAvailable || 999 })),
                        React.createElement("td", { className: "px-5 py-4 text-right tnum text-[14px] font-semibold text-ink" }, formatMoney(line.lineTotal)),
                        React.createElement("td", { className: "px-5 py-4 text-right" },
                            React.createElement("button", { onClick: () => CartStore.removeLine(line.id), "aria-label": `Remove ${line.name}`, className: "text-faint hover:text-red-300" },
                                React.createElement(Icon, { name: "trash", className: "h-4 w-4" })))))))),
                React.createElement("div", { className: "flex items-center justify-between border-t border-line px-5 py-4" },
                    React.createElement(Button, { as: "a", href: "#/shop", variant: "ghost", size: "sm" },
                        React.createElement(Icon, { name: "arrowLeft", className: "h-4 w-4" }),
                        " Continue shopping"),
                    React.createElement("button", { onClick: () => CartStore.clear(), className: "text-[12.5px] text-faint hover:text-red-300" }, "Clear basket"))),
            React.createElement("aside", { className: "h-fit rounded-2xl panel p-6" },
                React.createElement("h2", { className: "font-display text-lg font-semibold text-ink" }, "Order Summary"),
                React.createElement("div", { className: "mt-4 rounded-xl border border-line bg-surface2/60 p-3.5" },
                    React.createElement("div", { className: "flex items-center justify-between text-[12px] text-dim" },
                        React.createElement("span", null, "Wholesale minimum"),
                        React.createElement("span", { className: "font-mono tnum text-ink" },
                            formatMoney(cart.subtotal),
                            " / ",
                            formatMoney(SETTINGS.minimumOrderValue))),
                    React.createElement("div", { className: "mt-2 h-1.5 w-full overflow-hidden rounded-full bg-surface3" },
                        React.createElement("div", { className: cx("h-full rounded-full transition-all duration-500", cart.meetsMinimum ? "bg-emerald-400" : "bg-gradient-to-r from-accent to-accent2"), style: { width: `${Math.min(100, (cart.subtotal / SETTINGS.minimumOrderValue) * 100)}%` } })),
                    !cart.meetsMinimum && React.createElement("p", { className: "mt-2 text-[12px] text-dim" },
                        "Add ",
                        formatMoney(cart.remainingToMinimum),
                        " more to unlock checkout.")),
                React.createElement("div", { className: "mt-5 flex flex-col gap-2 text-[13.5px] text-dim" },
                    React.createElement("div", { className: "flex justify-between" },
                        React.createElement("span", null, "Subtotal"),
                        React.createElement("span", { className: "tnum text-ink" }, formatMoney(cart.subtotal))),
                    cart.estimatedTax != null && (React.createElement("div", { className: "flex justify-between" },
                        React.createElement("span", null, "Estimated tax"),
                        React.createElement("span", { className: "tnum text-ink" }, formatMoney(cart.estimatedTax)))),
                    React.createElement("div", { className: "flex justify-between" },
                        React.createElement("span", null, "Delivery"),
                        React.createElement("span", { className: "text-faint" }, "Calculated at checkout"))),
                React.createElement("div", { className: "mt-3 flex justify-between border-t border-line pt-3" },
                    React.createElement("span", { className: "font-display font-semibold text-ink" }, "Total"),
                    React.createElement("span", { className: "font-display text-xl font-bold tnum text-ink" }, formatMoney(cart.total))),
                React.createElement(Button, { as: "a", href: "#/checkout", full: true, size: "lg", className: "mt-5", disabled: !cart.meetsMinimum || cart.hasUnavailable },
                    "Proceed to checkout ",
                    React.createElement(Icon, { name: "arrowRight", className: "h-4 w-4" })),
                !cart.meetsMinimum && React.createElement("p", { className: "mt-2 text-center text-[11.5px] text-amber-300" }, "Minimum order value not yet met"),
                React.createElement("p", { className: "mt-4 flex items-center justify-center gap-1.5 text-[11px] text-faint" },
                    React.createElement(Icon, { name: "lock", className: "h-3.5 w-3.5" }),
                    " Secure checkout via Shopify")))));
}
"use strict";
function CheckoutPage() {
    const cart = useCart();
    const [redirecting, setRedirecting] = React.useState(false);
    const [redirectError, setRedirectError] = React.useState(null);
    function goToShopifyCheckout() {
        if (!cart.checkoutUrl) {
            setRedirectError("Your basket isn't ready yet — please try again in a moment.");
            return;
        }
        setRedirecting(true);
        setRedirectError(null);
        // Shopify's own hosted checkout takes it from here — this is where
        // payment is actually collected. Nothing on this site ever sees card
        // details; per the integration brief this build does not implement a
        // separate payment system of its own.
        window.location.href = cart.checkoutUrl;
    }
    if (cart.status === "loading" && cart.lines.length === 0) {
        return (React.createElement(Container, { className: "py-16 sm:py-24" },
            React.createElement("div", { className: "flex flex-col items-center gap-3 py-16 text-dim" },
                React.createElement("div", { className: "h-6 w-6 animate-spin rounded-full border-2 border-line2 border-t-accent2" }),
                React.createElement("p", { className: "text-[13px]" }, "Loading your basket\u2026"))));
    }
    if (cart.lines.length === 0) {
        return (React.createElement(Container, { className: "py-16 sm:py-24" },
            React.createElement(EmptyState, { icon: "cart", title: "Your basket is empty", body: "Add compounds to your basket before checking out.", action: React.createElement(Button, { as: "a", href: "#/shop" }, "Browse the shop") })));
    }
    if (!cart.meetsMinimum) {
        return (React.createElement(Container, { className: "py-16 sm:py-24" },
            React.createElement(EmptyState, { icon: "scale", title: "Minimum order value not met", body: `Wholesale orders require a minimum of ${formatMoney(SETTINGS.minimumOrderValue)}. Add ${formatMoney(cart.remainingToMinimum)} more to continue.`, action: React.createElement(Button, { as: "a", href: "#/shop" }, "Continue shopping") })));
    }
    if (cart.hasUnavailable) {
        return (React.createElement(Container, { className: "py-16 sm:py-24" },
            React.createElement(EmptyState, { icon: "alertTriangle", title: "Your basket has unavailable items", body: "Remove anything marked unavailable in your basket before checking out.", action: React.createElement(Button, { as: "a", href: "#/cart" }, "Review basket") })));
    }
    return (React.createElement(Container, { className: "py-10 sm:py-14" },
        React.createElement(Breadcrumbs, { items: [{ label: "Home", href: "#/" }, { label: "Basket", href: "#/cart" }, { label: "Checkout" }] }),
        React.createElement("h1", { className: "mt-4 font-display text-3xl font-bold text-ink sm:text-4xl" }, "Checkout"),
        React.createElement("p", { className: "mt-2 max-w-xl text-[14px] text-dim" }, "Review your order, then continue to Shopify's secure checkout to enter delivery details and pay."),
        React.createElement("div", { className: "mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_380px]" },
            React.createElement("section", { className: "rounded-2xl border border-line p-6" },
                React.createElement("h2", { className: "flex items-center gap-2 font-display text-[15px] font-semibold text-ink" },
                    React.createElement(Icon, { name: "cart", className: "h-4 w-4 text-accent2" }),
                    " Order contents"),
                React.createElement("ul", { className: "mt-5 flex flex-col gap-4" }, cart.lines.map((l) => (React.createElement("li", { key: l.id, className: "flex items-center gap-3" },
                    React.createElement("div", { className: "flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-line bg-surface2" },
                        React.createElement(ProductVisual, { image: l.image, height: 56 })),
                    React.createElement("div", { className: "flex-1" },
                        React.createElement("p", { className: "text-[14px] font-semibold text-ink" }, l.name),
                        React.createElement("p", { className: "font-mono text-[11px] text-faint" },
                            l.variantLabel,
                            " \u00D7 ",
                            l.qty)),
                    React.createElement("span", { className: "tnum text-[13.5px] text-ink" }, formatMoney(l.lineTotal))))))),
            React.createElement("aside", { className: "h-fit rounded-2xl panel p-6 lg:sticky lg:top-24" },
                React.createElement("h2", { className: "font-display text-lg font-semibold text-ink" }, "Order Summary"),
                React.createElement("div", { className: "mt-4 flex flex-col gap-2 text-[13.5px] text-dim" },
                    React.createElement("div", { className: "flex justify-between" },
                        React.createElement("span", null, "Subtotal"),
                        React.createElement("span", { className: "tnum text-ink" }, formatMoney(cart.subtotal))),
                    cart.estimatedTax != null && (React.createElement("div", { className: "flex justify-between" },
                        React.createElement("span", null, "Estimated tax"),
                        React.createElement("span", { className: "tnum text-ink" }, formatMoney(cart.estimatedTax)))),
                    React.createElement("div", { className: "flex justify-between" },
                        React.createElement("span", null, "Delivery"),
                        React.createElement("span", { className: "text-faint" }, "Calculated at checkout"))),
                React.createElement("div", { className: "mt-3 flex justify-between border-t border-line pt-3" },
                    React.createElement("span", { className: "font-display font-semibold text-ink" }, "Total"),
                    React.createElement("span", { className: "font-display text-xl font-bold tnum text-ink" }, formatMoney(cart.total))),
                React.createElement(Button, { size: "lg", full: true, className: "mt-5", onClick: goToShopifyCheckout, disabled: redirecting },
                    redirecting ? "Redirecting…" : "Continue to secure checkout",
                    " ",
                    !redirecting && React.createElement(Icon, { name: "arrowRight", className: "h-4 w-4" })),
                redirectError && React.createElement("p", { className: "mt-2 text-center text-[12px] text-red-300" }, redirectError),
                React.createElement("p", { className: "mt-3 flex items-center justify-center gap-1.5 text-center text-[11px] text-faint" },
                    React.createElement(Icon, { name: "lock", className: "h-3.5 w-3.5" }),
                    " Payment is completed on Shopify's secure checkout \u2014 no card details are entered on this site")))));
}
"use strict";
function ConfirmationPage({ orderNumber }) {
    const order = Orders.get(orderNumber);
    if (!order) {
        return (React.createElement(Container, { className: "py-16 sm:py-24" },
            React.createElement(EmptyState, { icon: "fileText", title: "Order not found", body: "We couldn't find that order reference in this browser.", action: React.createElement(Button, { as: "a", href: "#/shop" }, "Back to shop") })));
    }
    return (React.createElement(Container, { className: "py-14 sm:py-20" },
        React.createElement("div", { className: "mx-auto max-w-2xl text-center" },
            React.createElement("div", { className: "mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-300" },
                React.createElement(Icon, { name: "check", className: "h-8 w-8", strokeWidth: 2.4 })),
            React.createElement("h1", { className: "mt-6 font-display text-3xl font-bold text-ink sm:text-4xl" }, "Order request received"),
            React.createElement("p", { className: "mt-3 text-[15px] text-dim" },
                "Reference ",
                React.createElement("span", { className: "font-mono text-ink" }, order.orderNumber),
                " \u2014 a member of our wholesale team will email a secure Stripe payment link to ",
                React.createElement("span", { className: "text-ink" }, order.customer.email),
                " shortly to confirm and process payment.")),
        React.createElement("div", { className: "mx-auto mt-10 max-w-2xl rounded-2xl panel p-6 sm:p-8" },
            React.createElement("div", { className: "flex flex-wrap items-center justify-between gap-3 border-b border-line pb-5" },
                React.createElement("div", null,
                    React.createElement("p", { className: "font-mono text-[11px] uppercase tracking-[0.14em] text-faint" }, "Order reference"),
                    React.createElement("p", { className: "font-display text-lg font-semibold text-ink" }, order.orderNumber)),
                React.createElement(Badge, { tone: "warn" }, "Awaiting payment link")),
            React.createElement("ul", { className: "mt-5 flex flex-col gap-3" }, order.lines.map((l, i) => (React.createElement("li", { key: i, className: "flex items-center justify-between text-[13.5px]" },
                React.createElement("span", { className: "text-dim" },
                    l.name,
                    " ",
                    React.createElement("span", { className: "font-mono text-[11px] text-faint" },
                        "(",
                        l.variantLabel,
                        " \u00D7 ",
                        l.qty,
                        ")")),
                React.createElement("span", { className: "tnum text-ink" }, formatMoney(l.lineTotal)))))),
            React.createElement("div", { className: "mt-5 flex flex-col gap-2 border-t border-line pt-4 text-[13.5px] text-dim" },
                React.createElement("div", { className: "flex justify-between" },
                    React.createElement("span", null, "Subtotal"),
                    React.createElement("span", { className: "tnum text-ink" }, formatMoney(order.subtotal))),
                React.createElement("div", { className: "flex justify-between" },
                    React.createElement("span", null, "VAT"),
                    React.createElement("span", { className: "tnum text-ink" }, formatMoney(order.vat))),
                React.createElement("div", { className: "flex justify-between" },
                    React.createElement("span", null, "Delivery"),
                    React.createElement("span", { className: "tnum text-ink" }, order.delivery === 0 ? "Free" : formatMoney(order.delivery))),
                React.createElement("div", { className: "mt-1 flex justify-between border-t border-line pt-2 text-[15px] font-semibold text-ink" },
                    React.createElement("span", null, "Total"),
                    React.createElement("span", { className: "tnum" }, formatMoney(order.total)))),
            React.createElement("div", { className: "mt-6 grid grid-cols-1 gap-4 border-t border-line pt-5 sm:grid-cols-2" },
                React.createElement("div", null,
                    React.createElement("p", { className: "font-mono text-[10px] uppercase tracking-[0.14em] text-faint" }, "Billing address"),
                    React.createElement("p", { className: "mt-1.5 text-[13px] leading-relaxed text-dim" },
                        order.billingAddress.line1,
                        order.billingAddress.line2 ? `, ${order.billingAddress.line2}` : "",
                        React.createElement("br", null),
                        order.billingAddress.city,
                        ", ",
                        order.billingAddress.postcode,
                        React.createElement("br", null),
                        order.billingAddress.country)),
                React.createElement("div", null,
                    React.createElement("p", { className: "font-mono text-[10px] uppercase tracking-[0.14em] text-faint" }, "Delivery address"),
                    React.createElement("p", { className: "mt-1.5 text-[13px] leading-relaxed text-dim" },
                        order.shippingAddress.line1,
                        order.shippingAddress.line2 ? `, ${order.shippingAddress.line2}` : "",
                        React.createElement("br", null),
                        order.shippingAddress.city,
                        ", ",
                        order.shippingAddress.postcode,
                        React.createElement("br", null),
                        order.shippingAddress.country)))),
        React.createElement("div", { className: "mx-auto mt-8 flex max-w-2xl flex-wrap items-center justify-center gap-3" },
            React.createElement(Button, { as: "a", href: "#/shop", variant: "secondary" }, "Continue shopping"),
            React.createElement(Button, { as: "a", href: "#/contact" }, "Contact wholesale team")),
        React.createElement("p", { className: "mx-auto mt-8 max-w-md text-center text-[11.5px] leading-relaxed text-faint" }, "This confirmation is stored only in this browser for your reference. Peptalys will also confirm your order by email.")));
}
"use strict";
function AboutPage() {
    return (React.createElement(React.Fragment, null,
        React.createElement("section", { className: "relative overflow-hidden bg-labgrid border-b border-line" },
            React.createElement(Container, { className: "relative py-16 sm:py-24" },
                React.createElement(Eyebrow, null, "About Peptalys"),
                React.createElement("h1", { className: "mt-3 max-w-2xl font-display text-4xl font-bold text-ink sm:text-5xl text-balance" }, "More than peptides \u2014 a supply chain built for research."),
                React.createElement("p", { className: "mt-5 max-w-xl text-[15px] leading-relaxed text-dim" }, "Peptalys is a UK wholesale supplier of high-purity research peptides, founded to give laboratories and research bodies a dependable, well-documented source of the compounds their protocols depend on."))),
        React.createElement("section", { className: "py-16 sm:py-24" },
            React.createElement(Container, { className: "grid grid-cols-1 gap-14 lg:grid-cols-2" },
                React.createElement("div", null,
                    React.createElement(Eyebrow, null, "Our story"),
                    React.createElement("h2", { className: "mt-3 font-display text-2xl font-bold text-ink sm:text-3xl" }, "From a purity problem to a purpose-built supplier."),
                    React.createElement("div", { className: "mt-5 flex flex-col gap-4 text-[14.5px] leading-relaxed text-dim" },
                        React.createElement("p", null, "Peptalys was founded by a small team with a background in peptide synthesis and laboratory procurement, after repeatedly encountering the same problem across research groups: inconsistent purity, unreliable lead times, and suppliers unwilling to work at genuine wholesale volume."),
                        React.createElement("p", null, "We set out to build the opposite \u2014 a UK-based manufacturing and supply operation where every batch is independently HPLC-tested before it ships, pricing is transparent at wholesale scale, and delivery timelines are something research teams can actually plan around."),
                        React.createElement("p", null, "Today, Peptalys supplies a curated catalogue of reference research peptides across metabolic, regenerative, cellular and growth-hormone-axis research \u2014 with the same batch discipline on every single line."))),
                React.createElement("div", { className: "flex flex-col gap-4" }, [
                    { icon: "microscope", title: "UK synthesis", body: "Every compound is synthesised in our UK facility under controlled, documented conditions." },
                    { icon: "shieldCheck", title: "Independent purity testing", body: "Each batch is verified by HPLC to a minimum of 98% purity before release." },
                    { icon: "truck", title: "Reliable UK delivery", body: "Orders are dispatched from our UK facility and arrive within 3–5 working days, nationwide." },
                    { icon: "users", title: "Wholesale-first", body: "Pricing, packaging and minimum order structure are all built around institutional buying, not single-vial retail." },
                ].map((f) => (React.createElement("div", { key: f.title, className: "flex gap-4 rounded-xl border border-line bg-surface/40 p-5" },
                    React.createElement("div", { className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent2" },
                        React.createElement(Icon, { name: f.icon, className: "h-5 w-5" })),
                    React.createElement("div", null,
                        React.createElement("h3", { className: "font-body text-[14px] font-semibold text-ink" }, f.title),
                        React.createElement("p", { className: "mt-1 text-[13px] leading-relaxed text-dim" }, f.body)))))))),
        React.createElement("section", { className: "border-t border-line py-16 sm:py-24" },
            React.createElement(Container, null,
                React.createElement(SectionHeading, { align: "center", eyebrow: "Our process", title: "From synthesis to your bench", className: "mx-auto" }),
                React.createElement("div", { className: "relative mt-14" },
                    React.createElement("div", { className: "absolute left-0 right-0 top-6 hidden h-px bg-line sm:block" }),
                    React.createElement("div", { className: "grid grid-cols-1 gap-8 sm:grid-cols-4" }, [
                        { icon: "flask", title: "Synthesis", body: "Peptides are synthesised in-house to a controlled process specification." },
                        { icon: "microscope", title: "HPLC testing", body: "Every batch is independently tested and verified to ≥98% purity." },
                        { icon: "package", title: "Secure packing", body: "Lyophilised and packed in tamper-evident packaging — stable at ambient temperature, no cold storage required." },
                        { icon: "truck", title: "Tracked UK delivery", body: "Shipped via tracked courier, arriving within 3–5 working days nationwide." },
                    ].map((s, i) => (React.createElement("div", { key: s.title, className: "relative flex flex-col items-center text-center sm:items-start sm:text-left" },
                        React.createElement("div", { className: "relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-line2 bg-surface text-accent2" },
                            React.createElement(Icon, { name: s.icon, className: "h-5 w-5" })),
                        React.createElement("h3", { className: "mt-4 font-display text-[15px] font-semibold text-ink" }, s.title),
                        React.createElement("p", { className: "mt-1.5 text-[13px] leading-relaxed text-dim" }, s.body)))))))),
        React.createElement("section", { className: "border-t border-line py-16 sm:py-24" },
            React.createElement(Container, { className: "text-center" },
                React.createElement(Eyebrow, null, "Research use policy"),
                React.createElement("h2", { className: "mx-auto mt-3 max-w-2xl font-display text-2xl font-bold text-ink sm:text-3xl text-balance" }, "Every product exists for laboratory research only."),
                React.createElement("p", { className: "mx-auto mt-4 max-w-xl text-[14px] leading-relaxed text-dim" },
                    "Peptalys peptides are not medicines, supplements or cosmetic products. They are supplied exclusively to research bodies, laboratories and qualified institutional buyers for in-vitro and preclinical research. Read our full ",
                    React.createElement("a", { href: "#/legal", className: "text-accent2 underline" }, "research use policy"),
                    "."),
                React.createElement("div", { className: "mt-8 flex flex-wrap items-center justify-center gap-3" },
                    React.createElement(Button, { as: "a", href: "#/shop" }, "Browse the catalogue"),
                    React.createElement(Button, { as: "a", href: "#/contact", variant: "secondary" }, "Speak to our team"))))));
}
"use strict";
function ContactPage() {
    const [form, setForm] = React.useState({ name: "", email: "", company: "", subject: "General enquiry", message: "" });
    const [sent, setSent] = React.useState(false);
    function submit(e) {
        e.preventDefault();
        setSent(true);
        pushToast("Message sent — we'll be in touch within one working day.", { tone: "ok" });
    }
    return (React.createElement(Container, { className: "py-10 sm:py-16" },
        React.createElement(Breadcrumbs, { items: [{ label: "Home", href: "#/" }, { label: "Contact" }] }),
        React.createElement("div", { className: "mt-4 max-w-xl" },
            React.createElement("h1", { className: "font-display text-3xl font-bold text-ink sm:text-4xl" }, "Contact our wholesale team"),
            React.createElement("p", { className: "mt-3 text-[15px] text-dim" }, "Questions about a compound, bulk pricing, or setting up an institutional account \u2014 we typically reply within one working day.")),
        React.createElement("div", { className: "mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_380px]" },
            React.createElement("div", { className: "rounded-2xl border border-line p-6 sm:p-8" }, sent ? (React.createElement(EmptyState, { icon: "check", title: "Message received", body: "Thanks \u2014 a member of the Peptalys wholesale team will get back to you shortly.", action: React.createElement(Button, { variant: "secondary", onClick: () => setSent(false) }, "Send another message") })) : (React.createElement("form", { onSubmit: submit, className: "flex flex-col gap-5" },
                React.createElement("div", { className: "grid grid-cols-1 gap-4 sm:grid-cols-2" },
                    React.createElement("label", { className: "flex flex-col gap-1.5" },
                        React.createElement("span", { className: "text-[12.5px] font-medium text-dim" }, "Full name"),
                        React.createElement("input", { required: true, value: form.name, onChange: (e) => setForm((f) => ({ ...f, name: e.target.value })), className: "rounded-lg border border-line2 bg-surface2 px-3.5 py-2.5 text-[13.5px] text-ink outline-none focus:border-accent2" })),
                    React.createElement("label", { className: "flex flex-col gap-1.5" },
                        React.createElement("span", { className: "text-[12.5px] font-medium text-dim" }, "Email"),
                        React.createElement("input", { required: true, type: "email", value: form.email, onChange: (e) => setForm((f) => ({ ...f, email: e.target.value })), className: "rounded-lg border border-line2 bg-surface2 px-3.5 py-2.5 text-[13.5px] text-ink outline-none focus:border-accent2" }))),
                React.createElement("label", { className: "flex flex-col gap-1.5" },
                    React.createElement("span", { className: "text-[12.5px] font-medium text-dim" }, "Company / institution"),
                    React.createElement("input", { value: form.company, onChange: (e) => setForm((f) => ({ ...f, company: e.target.value })), className: "rounded-lg border border-line2 bg-surface2 px-3.5 py-2.5 text-[13.5px] text-ink outline-none focus:border-accent2" })),
                React.createElement("label", { className: "flex flex-col gap-1.5" },
                    React.createElement("span", { className: "text-[12.5px] font-medium text-dim" }, "Subject"),
                    React.createElement("select", { value: form.subject, onChange: (e) => setForm((f) => ({ ...f, subject: e.target.value })), className: "rounded-lg border border-line2 bg-surface2 px-3.5 py-2.5 text-[13.5px] text-ink outline-none focus:border-accent2" }, ["General enquiry", "Wholesale price list", "Bulk / custom order", "Existing order", "Product & purity question", "Other"].map((s) => React.createElement("option", { key: s }, s)))),
                React.createElement("label", { className: "flex flex-col gap-1.5" },
                    React.createElement("span", { className: "text-[12.5px] font-medium text-dim" }, "Message"),
                    React.createElement("textarea", { required: true, rows: 5, value: form.message, onChange: (e) => setForm((f) => ({ ...f, message: e.target.value })), className: "rounded-lg border border-line2 bg-surface2 px-3.5 py-2.5 text-[13.5px] text-ink outline-none focus:border-accent2" })),
                React.createElement(Button, { type: "submit", size: "lg", className: "self-start" },
                    "Send message ",
                    React.createElement(Icon, { name: "arrowRight", className: "h-4 w-4" }))))),
            React.createElement("aside", { className: "flex flex-col gap-4" },
                React.createElement("div", { className: "rounded-2xl panel p-6" },
                    React.createElement("h2", { className: "font-display text-[15px] font-semibold text-ink" }, "Get in touch"),
                    React.createElement("ul", { className: "mt-4 flex flex-col gap-4" },
                        React.createElement("li", { className: "flex items-start gap-3" },
                            React.createElement(Icon, { name: "mail", className: "mt-0.5 h-4 w-4 text-accent2" }),
                            React.createElement("div", null,
                                React.createElement("p", { className: "text-[13px] text-ink" }, BRAND.email),
                                React.createElement("p", { className: "text-[11.5px] text-faint" }, "Wholesale & order enquiries"))),
                        React.createElement("li", { className: "flex items-start gap-3" },
                            React.createElement(Icon, { name: "phone", className: "mt-0.5 h-4 w-4 text-accent2" }),
                            React.createElement("div", null,
                                React.createElement("p", { className: "text-[13px] text-ink" }, BRAND.phone),
                                React.createElement("p", { className: "text-[11.5px] text-faint" }, "Mon\u2013Fri, 9am\u20135.30pm GMT"))),
                        React.createElement("li", { className: "flex items-start gap-3" },
                            React.createElement(Icon, { name: "mapPin", className: "mt-0.5 h-4 w-4 text-accent2" }),
                            React.createElement("div", null,
                                React.createElement("p", { className: "text-[13px] text-ink" }, BRAND.address))))),
                React.createElement("div", { className: "rounded-2xl border border-line bg-surface/40 p-6" },
                    React.createElement("h2", { className: "font-display text-[15px] font-semibold text-ink" }, "Prefer a full price list?"),
                    React.createElement("p", { className: "mt-2 text-[13px] leading-relaxed text-dim" }, "DM us on Instagram or email the wholesale team for the complete SKU and volume-pricing sheet."),
                    React.createElement("p", { className: "mt-3 flex items-center gap-2 font-mono text-[13px] text-accent2" },
                        React.createElement(Icon, { name: "instagram", className: "h-4 w-4" }),
                        " ",
                        BRAND.instagram))))));
}
"use strict";
function DeliveryPage() {
    return (React.createElement(Container, { className: "py-10 sm:py-16" },
        React.createElement(Breadcrumbs, { items: [{ label: "Home", href: "#/" }, { label: "Delivery" }] }),
        React.createElement("h1", { className: "mt-4 font-display text-3xl font-bold text-ink sm:text-4xl" }, "Delivery Information"),
        React.createElement("p", { className: "mt-3 max-w-2xl text-[15px] leading-relaxed text-dim" }, "All orders are dispatched from our UK facility in secure, tamper-evident packaging via a tracked courier service."),
        React.createElement("div", { className: "mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3" }, [
            { icon: "clock", title: "Order processing", body: "Orders are processed and dispatched promptly once confirmed and paid." },
            { icon: "truck", title: "3–5 working day delivery", body: "Standard service is delivered within 3–5 working days, nationwide across the UK." },
            { icon: "package", title: "Delivery cost", body: `Delivery is calculated securely by Shopify at checkout, on top of the ${formatMoney(SETTINGS.minimumOrderValue)} wholesale minimum order value.` },
        ].map((c) => (React.createElement("div", { key: c.title, className: "rounded-2xl border border-line bg-surface/40 p-6" },
            React.createElement(Icon, { name: c.icon, className: "h-6 w-6 text-accent2" }),
            React.createElement("h3", { className: "mt-4 font-display text-[15px] font-semibold text-ink" }, c.title),
            React.createElement("p", { className: "mt-2 text-[13px] leading-relaxed text-dim" }, c.body))))),
        React.createElement("div", { className: "mt-14 grid grid-cols-1 gap-10 lg:grid-cols-2" },
            React.createElement("div", null,
                React.createElement("h2", { className: "font-display text-xl font-semibold text-ink" }, "Packaging"),
                React.createElement("p", { className: "mt-3 text-[14px] leading-relaxed text-dim" }, "Lyophilised peptides are stable at ambient temperature, so orders do not require cold storage or refrigerated transport. Every Peptalys order ships in secure, tamper-evident packaging designed to arrive intact."),
                React.createElement("p", { className: "mt-3 text-[14px] leading-relaxed text-dim" }, "Every parcel is fully tracked from dispatch to delivery, and a signature is required on receipt.")),
            React.createElement("div", null,
                React.createElement("h2", { className: "font-display text-xl font-semibold text-ink" }, "Delivery areas & timing"),
                React.createElement("dl", { className: "mt-3 divide-y divide-line rounded-xl border border-line" }, [
                    ["UK Mainland", "3–5 working days"],
                    ["UK Highlands & Islands", "3–5 working days"],
                    ["Northern Ireland", "3–5 working days"],
                    ["EU institutional buyers", "5–7 working days, on request"],
                    ["International", "Contact your Peptalys representative"],
                ].map(([area, time]) => (React.createElement("div", { key: area, className: "flex items-center justify-between px-4 py-3 text-[13.5px]" },
                    React.createElement("span", { className: "text-dim" }, area),
                    React.createElement("span", { className: "font-medium text-ink" }, time))))))),
        React.createElement("div", { className: "mt-14 rounded-2xl border border-line bg-surface/40 p-6" },
            React.createElement("h2", { className: "flex items-center gap-2 font-display text-[15px] font-semibold text-ink" },
                React.createElement(Icon, { name: "info", className: "h-4 w-4 text-accent2" }),
                " Order tracking"),
            React.createElement("p", { className: "mt-2 max-w-2xl text-[13.5px] leading-relaxed text-dim" },
                "Once your order is dispatched, you'll receive tracking details by email at the address given at checkout. For any delivery query, quote your order reference and contact ",
                React.createElement("a", { href: "#/contact", className: "text-accent2 underline" }, "our wholesale team"),
                "."))));
}
"use strict";
function ReturnsPage() {
    return (React.createElement(Container, { className: "py-10 sm:py-16" },
        React.createElement(Breadcrumbs, { items: [{ label: "Home", href: "#/" }, { label: "Returns" }] }),
        React.createElement("h1", { className: "mt-4 font-display text-3xl font-bold text-ink sm:text-4xl" }, "Returns & Quality Guarantee"),
        React.createElement("p", { className: "mt-3 max-w-2xl text-[15px] leading-relaxed text-dim" }, "Because our products are lyophilised research compounds intended for laboratory use, our returns policy is built around quality assurance rather than change-of-mind returns."),
        React.createElement("div", { className: "mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2" },
            React.createElement("div", { className: "rounded-2xl border border-line bg-surface/40 p-6" },
                React.createElement("div", { className: "flex items-center gap-2.5" },
                    React.createElement(Icon, { name: "shieldCheck", className: "h-5 w-5 text-accent2" }),
                    React.createElement("h2", { className: "font-display text-[15px] font-semibold text-ink" }, "Quality guarantee")),
                React.createElement("p", { className: "mt-3 text-[13.5px] leading-relaxed text-dim" }, "Every batch is HPLC-tested to a minimum 98% purity before dispatch. If a product you receive fails to meet its stated specification, or arrives damaged, incorrectly labelled or outside its expected storage condition, we will replace it or issue a full refund \u2014 no questions asked, subject to notifying us within 14 days of delivery.")),
            React.createElement("div", { className: "rounded-2xl border border-line bg-surface/40 p-6" },
                React.createElement("div", { className: "flex items-center gap-2.5" },
                    React.createElement(Icon, { name: "alertTriangle", className: "h-5 w-5 text-accent2" }),
                    React.createElement("h2", { className: "font-display text-[15px] font-semibold text-ink" }, "What we can't accept back")),
                React.createElement("p", { className: "mt-3 text-[13.5px] leading-relaxed text-dim" }, "For laboratory safety and chain-of-custody reasons, we cannot accept the return of any vial once its tamper-evident seal has been broken or the product has left our packaging, unless it is being returned as part of an approved quality claim above."))),
        React.createElement("div", { className: "mt-14" },
            React.createElement("h2", { className: "font-display text-xl font-semibold text-ink" }, "How to raise a claim"),
            React.createElement("div", { className: "mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3" }, [
                { n: "01", title: "Contact us", body: "Email our wholesale team with your order reference and a description of the issue, within 14 days of delivery." },
                { n: "02", title: "Share evidence", body: "Where relevant, include batch/lot numbers, photographs, or a certificate of analysis discrepancy." },
                { n: "03", title: "Resolution", body: "We'll confirm a replacement, credit note or refund — typically within 3 working days of review." },
            ].map((s) => (React.createElement("div", { key: s.n, className: "rounded-2xl border border-line p-6" },
                React.createElement("span", { className: "font-mono text-3xl font-bold text-surface3" }, s.n),
                React.createElement("h3", { className: "mt-3 font-display text-[15px] font-semibold text-ink" }, s.title),
                React.createElement("p", { className: "mt-2 text-[13px] leading-relaxed text-dim" }, s.body))))),
            React.createElement(Button, { as: "a", href: "#/contact", className: "mt-8" },
                "Raise a quality claim ",
                React.createElement(Icon, { name: "arrowRight", className: "h-4 w-4" })))));
}
"use strict";
function LegalPage() {
    const [tab, setTab] = React.useState("research-use");
    const tabs = [
        { id: "research-use", label: "Research Use Policy" },
        { id: "terms", label: "Terms of Wholesale Supply" },
        { id: "privacy", label: "Privacy Policy" },
    ];
    return (React.createElement(Container, { className: "py-10 sm:py-16" },
        React.createElement(Breadcrumbs, { items: [{ label: "Home", href: "#/" }, { label: "Legal" }] }),
        React.createElement("h1", { className: "mt-4 font-display text-3xl font-bold text-ink sm:text-4xl" }, "Legal & Policies"),
        React.createElement("div", { className: "mt-8 flex flex-wrap gap-2 border-b border-line pb-px" }, tabs.map((t) => (React.createElement("button", { key: t.id, onClick: () => setTab(t.id), className: cx("rounded-t-lg px-4 py-2.5 text-[13.5px] font-medium transition-colors", tab === t.id ? "border-b-2 border-accent text-ink" : "text-faint hover:text-dim") }, t.label)))),
        React.createElement("div", { className: "mt-8 max-w-3xl" },
            tab === "research-use" && (React.createElement("div", { className: "flex flex-col gap-5 text-[14px] leading-relaxed text-dim" },
                React.createElement("div", { className: "flex items-start gap-3 rounded-xl border border-amber-500/25 bg-amber-500/5 p-4" },
                    React.createElement(Icon, { name: "alertTriangle", className: "mt-0.5 h-5 w-5 shrink-0 text-amber-300" }),
                    React.createElement("p", { className: "text-amber-100/90" },
                        React.createElement("strong", null, "Research use only."),
                        " Every product listed on this site is sold strictly for laboratory and in-vitro research purposes. Peptalys products are not drugs, medicines, dietary supplements, cosmetics or food products, and are not approved for human or veterinary use.")),
                React.createElement("p", null, "By placing an order, you confirm that:"),
                React.createElement("ul", { className: "ml-5 list-disc space-y-2" },
                    React.createElement("li", null, "You are purchasing on behalf of a genuine research organisation, laboratory, or institution with a legitimate research application for the compound(s) ordered;"),
                    React.createElement("li", null, "You will not administer, apply, inject, ingest, or otherwise introduce any product into a human or animal body;"),
                    React.createElement("li", null, "You will not resell products for human or veterinary consumption, diagnostic, therapeutic, or cosmetic use;"),
                    React.createElement("li", null, "You will handle, store, and dispose of all products in accordance with your institution's laboratory safety protocols and applicable local regulations;"),
                    React.createElement("li", null, "You are of legal age and legally entitled to purchase research chemicals in your jurisdiction.")),
                React.createElement("p", null, "Peptalys reserves the right to refuse or cancel any order where we reasonably believe products are intended for human or veterinary use, or where the buyer cannot demonstrate a legitimate research affiliation."),
                React.createElement("p", null, "The research information presented on product pages describes published and ongoing scientific research into each compound's studied mechanisms. It does not constitute medical advice, and no claims are made regarding safety or efficacy for human use."))),
            tab === "terms" && (React.createElement("div", { className: "flex flex-col gap-5 text-[14px] leading-relaxed text-dim" },
                React.createElement("p", null,
                    React.createElement("strong", { className: "text-ink" }, "Wholesale-only supply."),
                    " Peptalys operates a wholesale supply model with a minimum order value of ",
                    formatMoney(SETTINGS.minimumOrderValue),
                    " (ex. VAT and delivery) per order."),
                React.createElement("p", null,
                    React.createElement("strong", { className: "text-ink" }, "Pricing."),
                    " All prices shown are in GBP and exclude VAT, which is calculated at checkout at the applicable UK rate (",
                    Math.round(SETTINGS.vatRate * 100),
                    "%). Peptalys reserves the right to amend pricing at any time; the price shown at checkout is the price charged."),
                React.createElement("p", null,
                    React.createElement("strong", { className: "text-ink" }, "Order acceptance."),
                    " Submitting an order via this site is a request to purchase, not a binding contract of sale. A contract is formed once Peptalys confirms the order and issues a payment link, and is completed on receipt of payment."),
                React.createElement("p", null,
                    React.createElement("strong", { className: "text-ink" }, "Payment."),
                    " Payment is processed securely via Stripe. Peptalys does not store or have access to full card details at any point."),
                React.createElement("p", null,
                    React.createElement("strong", { className: "text-ink" }, "Title & risk."),
                    " Title to goods passes on receipt of full payment. Risk passes to the buyer on delivery."),
                React.createElement("p", null,
                    React.createElement("strong", { className: "text-ink" }, "Liability."),
                    " Products are supplied \"as researched\" for laboratory use; Peptalys' liability is limited to the value of the order in question, save where liability cannot be excluded by law."))),
            tab === "privacy" && (React.createElement("div", { className: "flex flex-col gap-5 text-[14px] leading-relaxed text-dim" },
                React.createElement("p", null, "Peptalys collects the contact, billing and delivery information you provide when placing an order or contacting our team, solely to process orders, provide customer support, and meet our legal and accounting obligations."),
                React.createElement("p", null, "We do not sell customer data to third parties. Information is shared only with the service providers necessary to fulfil an order (for example, couriers and payment processors) and is retained only as long as required for accounting and legal purposes."),
                React.createElement("p", null,
                    "You may request a copy of the data we hold about you, or ask us to correct or delete it, by contacting ",
                    React.createElement("a", { href: "#/contact", className: "text-accent2 underline" }, "our team"),
                    "."),
                React.createElement("p", { className: "text-[12px] text-faint" }, "This is a summary policy for demonstration purposes; a production deployment should replace it with counsel-reviewed privacy and cookie policies appropriate to your data flows and hosting."))))));
}
"use strict";
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
    const all = React.useMemo(() => [...localOrders.map((o) => ({ ...o, sample: false })), ...SAMPLE_ADMIN_ORDERS.map((o) => ({ ...o, sample: true }))], [localOrders]);
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
    return React.createElement(Badge, { tone: m.tone }, m.label);
}
function AdminGate({ onUnlock }) {
    const [code, setCode] = React.useState("");
    const [error, setError] = React.useState(false);
    function submit(e) {
        e.preventDefault();
        if (code === ADMIN_DEMO_CODE)
            onUnlock();
        else
            setError(true);
    }
    return (React.createElement(Container, { className: "flex min-h-[70vh] items-center justify-center py-16" },
        React.createElement("div", { className: "w-full max-w-sm rounded-2xl panel p-8 text-center" },
            React.createElement("div", { className: "mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent2" },
                React.createElement(Icon, { name: "lock", className: "h-5 w-5" })),
            React.createElement("h1", { className: "mt-4 font-display text-xl font-bold text-ink" }, "Staff sign-in"),
            React.createElement("p", { className: "mt-2 text-[13px] text-dim" }, "Internal dashboard \u2014 demo access code required."),
            React.createElement("form", { onSubmit: submit, className: "mt-6 flex flex-col gap-3" },
                React.createElement("input", { type: "password", value: code, onChange: (e) => { setCode(e.target.value); setError(false); }, placeholder: "Access code", className: cx("rounded-lg border bg-surface2 px-3.5 py-2.5 text-center text-[13.5px] text-ink outline-none", error ? "border-red-500/60" : "border-line2 focus:border-accent2") }),
                error && React.createElement("p", { className: "text-[12px] text-red-300" }, "Incorrect code \u2014 try \"peptalys-admin\""),
                React.createElement(Button, { type: "submit", full: true }, "Enter dashboard")),
            React.createElement("p", { className: "mt-5 text-[11px] leading-relaxed text-faint" }, "Demo gate only \u2014 the access code is shown here deliberately. Production must replace this with real authentication (SSO / magic link) behind a server, not a client-side check."))));
}
function AdminPage() {
    const [unlocked, setUnlocked] = React.useState(false);
    const [tab, setTab] = React.useState("overview");
    const orders = useAdminOrders();
    const products = useProducts({});
    if (!unlocked)
        return React.createElement(AdminGate, { onUnlock: () => setUnlocked(true) });
    const revenue = orders.filter((o) => o.status === "paid").reduce((s, o) => s + o.total, 0);
    const awaiting = orders.filter((o) => o.status === "awaiting_payment").length;
    const skuCount = products.status === "ready" ? products.data.reduce((s, p) => s + p.variants.length, 0) : null;
    const customers = {};
    orders.forEach((o) => {
        const key = o.customer.email;
        if (!customers[key])
            customers[key] = { ...o.customer, orders: 0, ltv: 0 };
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
    return (React.createElement(Container, { className: "py-10 sm:py-14" },
        React.createElement("div", { className: "flex flex-wrap items-center justify-between gap-4" },
            React.createElement("div", null,
                React.createElement("p", { className: "font-mono text-[11px] uppercase tracking-[0.16em] text-accent2" }, "Internal"),
                React.createElement("h1", { className: "mt-1 font-display text-3xl font-bold text-ink" }, "Admin Dashboard")),
            React.createElement(Button, { variant: "secondary", size: "sm", onClick: () => setUnlocked(false) },
                React.createElement(Icon, { name: "lock", className: "h-3.5 w-3.5" }),
                " Sign out")),
        React.createElement("div", { className: "mt-6 flex gap-1 overflow-x-auto rounded-full border border-line bg-surface/50 p-1" }, tabs.map((t) => (React.createElement("button", { key: t.id, onClick: () => setTab(t.id), className: cx("flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-[13px] font-medium transition-colors", tab === t.id ? "bg-accent text-white" : "text-dim hover:text-ink") },
            React.createElement(Icon, { name: t.icon, className: "h-3.5 w-3.5" }),
            " ",
            t.label)))),
        tab === "overview" && (React.createElement("div", { className: "mt-8" },
            React.createElement("div", { className: "grid grid-cols-2 gap-4 lg:grid-cols-4" }, [
                { label: "Booked revenue (this browser)", value: formatMoney(revenue), icon: "trendingUp" },
                { label: "Orders awaiting payment", value: String(awaiting), icon: "clock" },
                { label: "Active SKUs (live, Shopify)", value: skuCount != null ? String(skuCount) : "…", icon: "package" },
                { label: "Products published", value: products.status === "ready" ? String(products.data.length) : "…", icon: "flask" },
            ].map((k) => (React.createElement("div", { key: k.label, className: "rounded-2xl border border-line bg-surface/40 p-5" },
                React.createElement(Icon, { name: k.icon, className: "h-5 w-5 text-accent2" }),
                React.createElement("p", { className: "mt-3 font-display text-2xl font-bold tnum text-ink" }, k.value),
                React.createElement("p", { className: "mt-1 text-[12px] text-dim" }, k.label))))),
            React.createElement("div", { className: "mt-8 rounded-2xl border border-line" },
                React.createElement("div", { className: "flex items-center justify-between border-b border-line px-5 py-3.5" },
                    React.createElement("h2", { className: "font-display text-[14px] font-semibold text-ink" }, "Recent orders"),
                    React.createElement("button", { onClick: () => setTab("orders"), className: "text-[12px] text-accent2 hover:underline" }, "View all")),
                React.createElement("ul", { className: "divide-y divide-line" }, orders.slice(0, 5).map((o) => (React.createElement("li", { key: o.orderNumber, className: "flex items-center justify-between gap-3 px-5 py-3.5" },
                    React.createElement("div", null,
                        React.createElement("p", { className: "font-mono text-[12.5px] text-ink" }, o.orderNumber),
                        React.createElement("p", { className: "text-[12px] text-faint" }, o.customer.company || o.customer.name)),
                    React.createElement("div", { className: "flex items-center gap-3" },
                        React.createElement("span", { className: "tnum text-[13px] text-ink" }, formatMoney(o.total)),
                        React.createElement(StatusPill, { status: o.status }))))))))),
        tab === "orders" && (React.createElement("div", { className: "mt-8 overflow-x-auto rounded-2xl border border-line" },
            React.createElement("table", { className: "w-full min-w-[760px] text-left" },
                React.createElement("thead", { className: "border-b border-line bg-surface/60" },
                    React.createElement("tr", null, ["Order", "Customer", "Items", "Total", "Payment", "Fulfilment", ""].map((h) => (React.createElement("th", { key: h, className: "px-4 py-3 text-[11px] font-medium uppercase tracking-wide text-faint" }, h))))),
                React.createElement("tbody", { className: "divide-y divide-line" }, orders.map((o) => (React.createElement("tr", { key: o.orderNumber },
                    React.createElement("td", { className: "px-4 py-3.5" },
                        React.createElement("p", { className: "font-mono text-[12.5px] text-ink" }, o.orderNumber),
                        React.createElement("p", { className: "text-[11px] text-faint" }, new Date(o.createdAt).toLocaleDateString("en-GB"))),
                    React.createElement("td", { className: "px-4 py-3.5" },
                        React.createElement("p", { className: "text-[13px] text-ink" }, o.customer.company || o.customer.name),
                        React.createElement("p", { className: "text-[11px] text-faint" }, o.customer.email)),
                    React.createElement("td", { className: "px-4 py-3.5 text-[12.5px] text-dim" },
                        o.lines.reduce((s, l) => s + l.qty, 0),
                        " units"),
                    React.createElement("td", { className: "px-4 py-3.5 tnum text-[13px] font-medium text-ink" }, formatMoney(o.total)),
                    React.createElement("td", { className: "px-4 py-3.5" },
                        React.createElement(StatusPill, { status: o.status })),
                    React.createElement("td", { className: "px-4 py-3.5" },
                        React.createElement(StatusPill, { status: o.fulfilmentStatus })),
                    React.createElement("td", { className: "px-4 py-3.5" }, o.sample && React.createElement(Badge, { tone: "default" }, "Sample"))))))))),
        tab === "products" && (React.createElement("div", { className: "mt-8 overflow-x-auto rounded-2xl border border-line" },
            products.status === "loading" && React.createElement("div", { className: "p-10 text-center text-[13px] text-dim" }, "Loading live catalogue\u2026"),
            products.status === "error" && React.createElement("div", { className: "p-10" },
                React.createElement(EmptyState, { icon: "alertTriangle", title: "Couldn't load products", body: products.error })),
            products.status === "ready" && (React.createElement(React.Fragment, null,
                React.createElement("table", { className: "w-full min-w-[760px] text-left" },
                    React.createElement("thead", { className: "border-b border-line bg-surface/60" },
                        React.createElement("tr", null, ["Product", "Handle", "Type", "Variants", "Availability", "From"].map((h) => (React.createElement("th", { key: h, className: "px-4 py-3 text-[11px] font-medium uppercase tracking-wide text-faint" }, h))))),
                    React.createElement("tbody", { className: "divide-y divide-line" }, products.data.map((p) => {
                        const range = priceRange(p);
                        const avail = availability(p);
                        return (React.createElement("tr", { key: p.id },
                            React.createElement("td", { className: "px-4 py-3.5 text-[13px] font-medium text-ink" }, p.name),
                            React.createElement("td", { className: "px-4 py-3.5 font-mono text-[11.5px] text-faint" }, p.handle),
                            React.createElement("td", { className: "px-4 py-3.5 text-[12.5px] text-dim" }, p.subcategory || "—"),
                            React.createElement("td", { className: "px-4 py-3.5 text-[12.5px] text-dim" }, p.variants.length),
                            React.createElement("td", { className: "px-4 py-3.5" },
                                React.createElement(Badge, { tone: avail.tone }, avail.label)),
                            React.createElement("td", { className: "px-4 py-3.5 tnum text-[13px] text-ink" }, formatMoney(range.min))));
                    }))),
                React.createElement("p", { className: "border-t border-line px-4 py-3 text-[11px] text-faint" }, "Live from Shopify. Wholesale cost / margin reporting now belongs in Shopify Admin \u2014 the Storefront API this site reads from has no concept of an internal cost field, so it is never fetched or rendered here."))))),
        tab === "customers" && (React.createElement("div", { className: "mt-8 overflow-x-auto rounded-2xl border border-line" }, customerList.length === 0 ? (React.createElement("div", { className: "p-10" },
            React.createElement(EmptyState, { icon: "users", title: "No customers yet", body: "Customers appear here once orders are placed." }))) : (React.createElement("table", { className: "w-full min-w-[640px] text-left" },
            React.createElement("thead", { className: "border-b border-line bg-surface/60" },
                React.createElement("tr", null, ["Customer", "Company", "Orders", "Lifetime value"].map((h) => React.createElement("th", { key: h, className: "px-4 py-3 text-[11px] font-medium uppercase tracking-wide text-faint" }, h)))),
            React.createElement("tbody", { className: "divide-y divide-line" }, customerList.map((c) => (React.createElement("tr", { key: c.email },
                React.createElement("td", { className: "px-4 py-3.5" },
                    React.createElement("p", { className: "text-[13px] text-ink" }, c.name),
                    React.createElement("p", { className: "text-[11px] text-faint" }, c.email)),
                React.createElement("td", { className: "px-4 py-3.5 text-[12.5px] text-dim" }, c.company || "—"),
                React.createElement("td", { className: "px-4 py-3.5 tnum text-[12.5px] text-dim" }, c.orders),
                React.createElement("td", { className: "px-4 py-3.5 tnum text-[13px] text-ink" }, formatMoney(c.ltv)))))))))),
        tab === "architecture" && React.createElement(AdminArchitectureTab, null)));
}
function AdminArchitectureTab() {
    const flow = ["Shopify Admin (catalogue)", "Storefront API (GraphQL)", "/api/* serverless functions", "Website (this app)", "Shopify Checkout", "Shopify Orders"];
    return (React.createElement("div", { className: "mt-8 flex flex-col gap-8" },
        React.createElement("div", { className: "rounded-2xl border border-line bg-surface/40 p-6" },
            React.createElement("h2", { className: "font-display text-[15px] font-semibold text-ink" }, "Live production data flow"),
            React.createElement("div", { className: "mt-5 flex flex-wrap items-center gap-2" }, flow.map((f, i) => (React.createElement(React.Fragment, { key: f },
                React.createElement("span", { className: "rounded-full border border-line2 bg-surface2 px-3.5 py-2 font-mono text-[11.5px] text-ink" }, f),
                i < flow.length - 1 && React.createElement(Icon, { name: "arrowRight", className: "h-3.5 w-3.5 text-faint" }))))),
            React.createElement("p", { className: "mt-4 text-[13px] leading-relaxed text-dim" }, ARCHITECTURE_NOTES.dataSource)),
        React.createElement("div", { className: "grid grid-cols-1 gap-6 lg:grid-cols-2" },
            React.createElement("div", { className: "rounded-2xl border border-line p-6" },
                React.createElement("h3", { className: "flex items-center gap-2 font-display text-[14px] font-semibold text-ink" },
                    React.createElement(Icon, { name: "creditCard", className: "h-4 w-4 text-accent2" }),
                    " Payments & checkout (Shopify)"),
                React.createElement("p", { className: "mt-3 text-[13px] leading-relaxed text-dim" }, "This site never collects card details and never embeds the Shopify Storefront token in front-end code. The live flow:"),
                React.createElement("ol", { className: "mt-3 ml-4 list-decimal space-y-1.5 text-[13px] leading-relaxed text-dim" },
                    React.createElement("li", null,
                        "The basket is a real Shopify cart, created and updated via ",
                        React.createElement("code", { className: "font-mono text-accent2" }, "POST /api/cart"),
                        " on this app's own server."),
                    React.createElement("li", null,
                        React.createElement("code", { className: "font-mono text-accent2" }, "/api/cart"),
                        " calls the Shopify Storefront GraphQL API using ",
                        React.createElement("code", { className: "font-mono text-accent2" }, "SHOPIFY_STOREFRONT_ACCESS_TOKEN"),
                        " (env var, server-only \u2014 never sent to the browser)."),
                    React.createElement("li", null,
                        "Checkout redirects the browser to the cart's own ",
                        React.createElement("code", { className: "font-mono text-accent2" }, "checkoutUrl"),
                        ", Shopify's hosted, secure checkout."),
                    React.createElement("li", null, "Shopify collects delivery details and payment, and becomes the system of record for the resulting order."))),
            React.createElement("div", { className: "rounded-2xl border border-line p-6" },
                React.createElement("h3", { className: "flex items-center gap-2 font-display text-[14px] font-semibold text-ink" },
                    React.createElement(Icon, { name: "package", className: "h-4 w-4 text-accent2" }),
                    " Catalogue"),
                React.createElement("p", { className: "mt-3 text-[13px] leading-relaxed text-dim" }, ARCHITECTURE_NOTES.dataSource),
                React.createElement("p", { className: "mt-3 text-[13px] leading-relaxed text-dim" }, "Staff manage products, variants, images, stock and collections directly in Shopify Admin \u2014 there is no separate products database or CSV import step for this site to maintain.")),
            React.createElement("div", { className: "rounded-2xl border border-line p-6" },
                React.createElement("h3", { className: "flex items-center gap-2 font-display text-[14px] font-semibold text-ink" },
                    React.createElement(Icon, { name: "fileText", className: "h-4 w-4 text-accent2" }),
                    " Order lifecycle"),
                React.createElement("p", { className: "mt-3 text-[13px] leading-relaxed text-dim" },
                    ARCHITECTURE_NOTES.orders,
                    " Reading real orders back into this dashboard would require Shopify's Admin API (a separate, more privileged token, authenticated server-side) \u2014 deliberately out of scope for this round of changes.")),
            React.createElement("div", { className: "rounded-2xl border border-line p-6" },
                React.createElement("h3", { className: "flex items-center gap-2 font-display text-[14px] font-semibold text-ink" },
                    React.createElement(Icon, { name: "lock", className: "h-4 w-4 text-accent2" }),
                    " Margin protection"),
                React.createElement("p", { className: "mt-3 text-[13px] leading-relaxed text-dim" }, ARCHITECTURE_NOTES.pricing))),
        React.createElement("div", { className: "rounded-2xl border border-amber-500/25 bg-amber-500/5 p-6" },
            React.createElement("h3", { className: "flex items-center gap-2 font-display text-[14px] font-semibold text-amber-100" },
                React.createElement(Icon, { name: "info", className: "h-4 w-4" }),
                " Orders tab, below"),
            React.createElement("p", { className: "mt-3 text-[13px] leading-relaxed text-amber-100/85" }, "The \"Orders\" and \"Customers\" tabs on this dashboard still show only a local, browser-only demo log (clearly labelled \"Sample\") \u2014 they are not connected to real Shopify orders. Real order management should happen in Shopify Admin directly."))));
}
"use strict";
const PAGE_TITLES = {
    "/": "Peptalys — Wholesale Research Peptides",
    "/shop": "Shop Research Peptides — Peptalys",
    "/cart": "Your Basket — Peptalys",
    "/checkout": "Checkout — Peptalys",
    "/about": "About — Peptalys",
    "/contact": "Contact — Peptalys",
    "/delivery": "Delivery Information — Peptalys",
    "/returns": "Returns & Quality Guarantee — Peptalys",
    "/legal": "Legal & Policies — Peptalys",
    "/admin": "Admin Dashboard — Peptalys",
};
const PAGE_DESCRIPTIONS = {
    "/": "Peptalys supplies UK-manufactured, HPLC-verified research peptides at wholesale volume — Retatrutide, BPC-157, Tirzepatide, GHK-Cu and more. UK delivery in 3–5 working days. Research use only.",
    "/shop": "Browse the full Peptalys catalogue of research peptides, filterable by category, price and availability. Wholesale supply, UK manufactured.",
    "/about": "Peptalys is a UK wholesale supplier of high-purity research peptides, built for laboratories and research institutions.",
    "/contact": "Get in touch with the Peptalys wholesale team for pricing, bulk orders, or product questions.",
    "/delivery": "UK delivery in 3–5 working days on Peptalys research peptide orders, dispatched in secure, tamper-evident packaging. No cold storage required.",
    "/returns": "Peptalys' quality guarantee and returns process for research peptide orders.",
    "/legal": "Peptalys research use policy, wholesale terms of supply, and privacy policy.",
};
function setMetaTag(name, content) {
    if (!content)
        return;
    let el = document.querySelector(`meta[name="${name}"]`);
    if (!el) {
        el = document.createElement("meta");
        el.setAttribute("name", name);
        document.head.appendChild(el);
    }
    el.setAttribute("content", content);
}
function setJsonLd(id, data) {
    let el = document.getElementById(id);
    if (!data) {
        if (el)
            el.remove();
        return;
    }
    if (!el) {
        el = document.createElement("script");
        el.type = "application/ld+json";
        el.id = id;
        document.head.appendChild(el);
    }
    el.textContent = JSON.stringify(data);
}
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { error: null };
    }
    static getDerivedStateFromError(error) {
        return { error };
    }
    render() {
        if (this.state.error) {
            return (React.createElement("div", { className: "flex min-h-screen flex-col items-center justify-center gap-4 bg-bg px-6 text-center" },
                React.createElement(Icon, { name: "alertTriangle", className: "h-10 w-10 text-amber-300" }),
                React.createElement("h1", { className: "font-display text-2xl font-bold text-ink" }, "Something went wrong"),
                React.createElement("p", { className: "max-w-sm text-sm text-dim" }, "This section hit an unexpected error. Try reloading the page."),
                React.createElement(Button, { onClick: () => window.location.reload() }, "Reload")));
        }
        return this.props.children;
    }
}
function NotFoundPage() {
    return (React.createElement(Container, { className: "py-24" },
        React.createElement(EmptyState, { icon: "search", title: "Page not found", body: "The page you're looking for doesn't exist or has moved.", action: React.createElement(Button, { as: "a", href: "#/" }, "Back to home") })));
}
function PageRouter() {
    const route = useRoute();
    const { path } = route;
    let params;
    const productMatch = matchPath("/product/:slug", path);
    const categoryMatch = matchPath("/category/:slug", path);
    // Static, synchronous titles/descriptions for routes that don't depend on
    // async Shopify data. Product pages set their own title/description/
    // JSON-LD once their fetch resolves (see ProductPage) — Shopify data
    // isn't available synchronously here the way the old local catalogue was.
    React.useEffect(() => {
        if (productMatch || categoryMatch)
            return; // those pages own their own <title>/meta
        const title = PAGE_TITLES[path];
        const description = PAGE_DESCRIPTIONS[path];
        document.title = title || "Peptalys";
        setMetaTag("description", description || PAGE_DESCRIPTIONS["/"]);
        setJsonLd("product-jsonld", null);
    }, [path, productMatch, categoryMatch]);
    if (path === "/" || path === "")
        return React.createElement(HomePage, null);
    if (path === "/shop")
        return React.createElement(ShopPage, null);
    if (categoryMatch)
        return React.createElement(ShopPage, { initialCategory: categoryMatch.slug });
    if (productMatch)
        return React.createElement(ProductPage, { slug: productMatch.slug });
    if (path === "/cart")
        return React.createElement(CartPage, null);
    if (path === "/checkout")
        return React.createElement(CheckoutPage, null);
    if ((params = matchPath("/order-confirmation/:orderNumber", path)))
        return React.createElement(ConfirmationPage, { orderNumber: params.orderNumber });
    if (path === "/about")
        return React.createElement(AboutPage, null);
    if (path === "/contact")
        return React.createElement(ContactPage, null);
    if (path === "/delivery")
        return React.createElement(DeliveryPage, null);
    if (path === "/returns")
        return React.createElement(ReturnsPage, null);
    if (path === "/legal")
        return React.createElement(LegalPage, null);
    if (path === "/admin")
        return React.createElement(AdminPage, null);
    return React.createElement(NotFoundPage, null);
}
function App() {
    return (React.createElement(ErrorBoundary, null,
        React.createElement("div", { className: "flex min-h-screen flex-col" },
            React.createElement(Navbar, null),
            React.createElement("main", { id: "main", className: "flex-1" },
                React.createElement(PageRouter, null)),
            React.createElement(Footer, null)),
        React.createElement(CartDrawer, null),
        React.createElement(ToastHost, null)));
}
const rootEl = document.getElementById("root");
const root = ReactDOM.createRoot(rootEl);
root.render(React.createElement(App, null));
window.__peptalysMounted = true;
