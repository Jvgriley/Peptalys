/* ==========================================================================
   Shopify Storefront API — server-only client.
   --------------------------------------------------------------------------
   Every function in this file runs ONLY inside Vercel Serverless Functions
   (anything under /api). It is never imported by, or bundled into, any
   frontend file — the browser never sees this code and never sees
   SHOPIFY_STOREFRONT_ACCESS_TOKEN. Vercel does not serve /api/_lib as a
   route (the leading underscore excludes it from routing) or as a static
   asset — it exists only to be require()'d by sibling functions.

   AUTHENTICATION — read this before changing the header below.
   --------------------------------------------------------------------------
   UPDATED 2026-09-20, based on direct empirical testing against this store
   (wgcien-is.myshopify.com), not just documentation:

   This store's Headless sales channel issues TWO distinct Storefront API
   tokens, and each one only authenticates with its own header:

     - "Public access token" (unprefixed, e.g. 646c84df...)
       -> header: X-Shopify-Storefront-Access-Token

     - "Private access token" (prefixed `shpat_...`, server-only)
       -> header: Shopify-Storefront-Private-Token

   This was confirmed with matched curl tests straight against Shopify,
   bypassing Vercel entirely: the public token authenticated successfully
   with X-Shopify-Storefront-Access-Token, while the private (shpat_) token
   returned a blank-message 401 UNAUTHORIZED with that same header, on every
   API version tried, with correct domain/permissions/plan/password
   settings all independently verified. The private token then authenticated
   successfully the moment it was sent with Shopify-Storefront-Private-Token
   instead. This reverses an earlier assumption in this file (that
   Shopify-Storefront-Private-Token was only for a separate "delegate access
   token" type per https://shopify.dev/docs/api/storefront#authentication) —
   that may still be true for other stores/token vintages, but it does not
   match this store's actual live behavior, and the live behavior wins.

   Since every request in this file runs server-side only and always uses
   the SHOPIFY_STOREFRONT_ACCESS_TOKEN env var (which holds the private,
   shpat_-prefixed token), every request in this file uses
   Shopify-Storefront-Private-Token. If that env var is ever repointed at an
   unprefixed "public" token instead, this header would need to change back
   to X-Shopify-Storefront-Access-Token — the two are not interchangeable,
   confirmed by the tests above. If auth ever starts failing again after a
   token rotation, re-run the same matched-header curl test before assuming
   the header is still correct.
   ========================================================================== */

const REQUIRED_ENV = ["SHOPIFY_STORE_DOMAIN", "SHOPIFY_STOREFRONT_ACCESS_TOKEN", "SHOPIFY_STOREFRONT_API_VERSION"];
const AUTH_HEADER_NAME = "Shopify-Storefront-Private-Token";
const TOKEN_TYPE_EXPECTED = "Storefront API access token (public or private/server-only) issued by the Headless sales channel or a custom app's Storefront API scope — NOT a delegate access token.";

function envPresenceMap() {
  return REQUIRED_ENV.reduce((acc, k) => {
    acc[k] = !!(process.env[k] && String(process.env[k]).trim());
    return acc;
  }, {});
}

function assertEnv() {
  const missing = REQUIRED_ENV.filter((k) => !(process.env[k] && String(process.env[k]).trim()));
  if (missing.length) {
    // Message intentionally names only the KEYS that are missing, never any
    // value — safe to surface in logs or an error response.
    const err = new Error(`Server is missing required Shopify configuration: ${missing.join(", ")}`);
    err.code = "SHOPIFY_CONFIG_MISSING";
    err.diagnostics = { failureCategory: "MISSING_CONFIG", env: envPresenceMap() };
    throw err;
  }
}

/**
 * Reduce a raw SHOPIFY_STORE_DOMAIN value down to a bare hostname, so the
 * endpoint we build can never end up as `https://https://...`,
 * `.../admin/api/...`, `.../api/api/...`, or carry a trailing slash — no
 * matter what protocol prefix, path suffix, or stray slash was pasted into
 * the env var.
 */
function normalizeDomain(raw) {
  const trimmed = (raw || "").trim();
  if (!trimmed) return "";
  let d = trimmed.replace(/^https?:\/\//i, ""); // drop an accidental protocol
  d = d.split("/")[0]; // keep only the host — drops any /admin, /api/..., trailing path or slash
  return d;
}

function normalizeVersion(raw) {
  return (raw || "").trim().replace(/^\/+/, "").replace(/\/+$/, "");
}

function buildEndpoint() {
  const domain = normalizeDomain(process.env.SHOPIFY_STORE_DOMAIN);
  const version = normalizeVersion(process.env.SHOPIFY_STOREFRONT_API_VERSION);

  if (!domain || !version || domain.includes("/") || domain.includes(" ")) {
    const err = new Error("Shopify store domain or API version is not configured correctly.");
    err.code = "SHOPIFY_INVALID_URL";
    err.diagnostics = {
      failureCategory: "INVALID_URL",
      endpointHost: domain || null,
      apiVersion: version || null,
    };
    throw err;
  }

  return { domain, version, endpoint: `https://${domain}/api/${version}/graphql.json` };
}

/* Strip anything that looks like it could be a token/secret before a value
   is ever attached to a diagnostics object or logged. Two layers:
   1) a direct, exact replacement of the actual configured token value (the
      strongest guarantee — we know the real secret at runtime, so this
      catches it regardless of shape), and
   2) heuristic pattern matching for Shopify's known token prefixes and any
      other long hex/opaque-looking string, as defense in depth in case the
      body ever contains a *different* secret-shaped value (e.g. a rotated
      token, or something Shopify itself redacts differently). */
function scrubSecrets(text) {
  if (!text) return text;
  let out = String(text);
  const actualToken = (process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || "").trim();
  if (actualToken && actualToken.length >= 6) {
    out = out.split(actualToken).join("[REDACTED]");
  }
  out = out
    .replace(/shp(at|ss|ca|pa)_[A-Za-z0-9_-]{6,}/gi, "[REDACTED]")
    .replace(/\b[a-f0-9]{32,}\b/gi, "[REDACTED]");
  return out.slice(0, 800);
}

/**
 * Low-level authenticated POST to the Shopify Storefront GraphQL endpoint.
 * Server-side only. Reads the (private, shpat_-prefixed) token from
 * process.env and sends it via Shopify-Storefront-Private-Token — see the
 * file header comment above for the empirical testing that confirmed this
 * is the correct header for this store's private token, and why the other
 * header (X-Shopify-Storefront-Access-Token) is for the public token only.
 *
 * `meta.route` is purely a label (e.g. "/api/products") attached to any
 * thrown error's diagnostics, so a server-side log line or an error
 * response can say which endpoint triggered the failure.
 */
async function shopifyFetch(query, variables, meta) {
  const route = (meta && meta.route) || "unknown";
  assertEnv();
  const { domain, version, endpoint } = buildEndpoint();
  const token = (process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || "").trim();

  const baseDiagnostics = {
    route,
    endpointHost: domain,
    apiVersion: version,
    tokenHeaderUsed: AUTH_HEADER_NAME,
    tokenTypeExpected: TOKEN_TYPE_EXPECTED,
    env: envPresenceMap(),
  };

  let res;
  try {
    res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        [AUTH_HEADER_NAME]: token,
        Accept: "application/json",
      },
      body: JSON.stringify({ query, variables: variables || {} }),
    });
  } catch (networkErr) {
    const err = new Error("Could not reach Shopify (network or DNS error).");
    err.code = "SHOPIFY_NETWORK_ERROR";
    err.cause = networkErr && networkErr.message;
    err.diagnostics = { ...baseDiagnostics, failureCategory: "NETWORK_ERROR", networkErrorMessage: networkErr && networkErr.message };
    throw err;
  }

  const shopifyRequestId = res.headers.get("x-request-id") || res.headers.get("x-shopify-request-id") || null;
  const text = await res.text();

  let json;
  try {
    json = text ? JSON.parse(text) : {};
  } catch (parseErr) {
    const err = new Error("Shopify returned a response that could not be parsed as JSON.");
    err.code = "SHOPIFY_BAD_RESPONSE";
    err.status = res.status;
    err.diagnostics = {
      ...baseDiagnostics,
      failureCategory: "SHOPIFY_BAD_RESPONSE",
      shopifyStatus: res.status,
      shopifyStatusText: res.statusText,
      shopifyRequestId,
      sanitizedResponseBody: scrubSecrets(text),
    };
    throw err;
  }

  if (!res.ok) {
    const category = res.status === 401 ? "SHOPIFY_401"
      : res.status === 403 ? "SHOPIFY_403"
      : res.status === 404 ? "SHOPIFY_404"
      : "SHOPIFY_HTTP_OTHER";
    const code = res.status === 401 ? "SHOPIFY_HTTP_401"
      : res.status === 403 ? "SHOPIFY_HTTP_403"
      : res.status === 404 ? "SHOPIFY_HTTP_404"
      : "SHOPIFY_HTTP_ERROR";
    const friendly = res.status === 401
      ? "Shopify rejected the request as unauthenticated (HTTP 401) — the Storefront access token is missing, invalid, revoked, or sent with the wrong header."
      : res.status === 403
      ? "Shopify rejected the request as forbidden (HTTP 403) — the token is valid but lacks the required Storefront API scope, or is not enabled for the Headless channel this store is using."
      : res.status === 404
      ? "Shopify returned 404 for the GraphQL endpoint — check SHOPIFY_STORE_DOMAIN and SHOPIFY_STOREFRONT_API_VERSION."
      : `Shopify API request failed (HTTP ${res.status}).`;
    const err = new Error(friendly);
    err.code = code;
    err.status = res.status;
    err.details = json && json.errors ? json.errors : undefined;
    err.diagnostics = {
      ...baseDiagnostics,
      failureCategory: category,
      shopifyStatus: res.status,
      shopifyStatusText: res.statusText,
      shopifyRequestId,
      sanitizedResponseBody: scrubSecrets(text),
    };
    throw err;
  }

  if (json.errors && json.errors.length) {
    const err = new Error(json.errors.map((e) => e.message).join("; ") || "Shopify GraphQL error.");
    err.code = "SHOPIFY_GRAPHQL_ERROR";
    err.details = json.errors;
    err.diagnostics = {
      ...baseDiagnostics,
      failureCategory: "SHOPIFY_GRAPHQL_ERROR",
      shopifyStatus: res.status,
      shopifyStatusText: res.statusText,
      shopifyRequestId,
      graphqlErrors: json.errors.map((e) => ({ message: e.message, path: e.path })).slice(0, 10),
    };
    throw err;
  }

  return json.data;
}

/* -------------------------------------------------------------------- */
/* Diagnostic queries — tiered, cheapest-first, used by /api/diagnostics */
/* to distinguish "auth is broken" from "the full production query has   */
/* an unsupported field" from "auth works but the catalogue is empty".   */
/* -------------------------------------------------------------------- */

async function testShopQuery() {
  const data = await shopifyFetch(`query { shop { name } }`, {}, { route: "/api/diagnostics:shop" });
  return data.shop;
}

async function testMinimalProductsQuery() {
  const data = await shopifyFetch(
    `query { products(first: 5) { nodes { id title handle } } }`,
    {},
    { route: "/api/diagnostics:products" }
  );
  return data.products.nodes;
}

/* -------------------------------------------------------------------- */
/* GraphQL fragments                                                     */
/* -------------------------------------------------------------------- */

const PRODUCT_FRAGMENT = `
  fragment ProductFields on Product {
    id
    handle
    title
    description
    descriptionHtml
    vendor
    productType
    tags
    availableForSale
    featuredImage { url altText width height }
    images(first: 12) {
      edges { node { url altText width height } }
    }
    collections(first: 10) {
      edges { node { id handle title } }
    }
    variants(first: 100) {
      edges {
        node {
          id
          title
          sku
          availableForSale
          quantityAvailable
          price { amount currencyCode }
          compareAtPrice { amount currencyCode }
          image { url altText width height }
          selectedOptions { name value }
        }
      }
    }
  }
`;

const CART_FRAGMENT = `
  fragment CartFields on Cart {
    id
    checkoutUrl
    totalQuantity
    cost {
      subtotalAmount { amount currencyCode }
      totalAmount { amount currencyCode }
      totalTaxAmount { amount currencyCode }
    }
    lines(first: 100) {
      edges {
        node {
          id
          quantity
          cost { totalAmount { amount currencyCode } }
          merchandise {
            ... on ProductVariant {
              id
              title
              sku
              availableForSale
              quantityAvailable
              price { amount currencyCode }
              image { url altText }
              product { handle title }
            }
          }
        }
      }
    }
  }
`;

/* -------------------------------------------------------------------- */
/* Normalizers — convert Shopify's GraphQL shape into the flatter shape  */
/* the existing frontend design already expects (see js/data.js's old    */
/* PRODUCTS array for the shape this mirrors).                           */
/* -------------------------------------------------------------------- */

function money(amountObj) {
  if (!amountObj) return null;
  return Number(amountObj.amount);
}

function normalizeVariant(edge) {
  const v = edge.node || edge;
  return {
    id: v.id,
    sku: v.sku || "",
    label: v.title === "Default Title" ? "Default" : v.title,
    size: v.title === "Default Title" ? "Default" : v.title,
    retailPrice: money(v.price),
    rrp: v.compareAtPrice ? money(v.compareAtPrice) : null,
    currencyCode: v.price ? v.price.currencyCode : "GBP",
    availableForSale: !!v.availableForSale,
    quantityAvailable: typeof v.quantityAvailable === "number" ? v.quantityAvailable : null,
    stock: typeof v.quantityAvailable === "number" ? v.quantityAvailable : (v.availableForSale ? null : 0),
    image: v.image ? { url: v.image.url, alt: v.image.altText || "" } : null,
    selectedOptions: v.selectedOptions || [],
  };
}

function normalizeProduct(p) {
  if (!p) return null;
  const variants = (p.variants && p.variants.edges ? p.variants.edges : []).map(normalizeVariant);
  const images = (p.images && p.images.edges ? p.images.edges : []).map((e) => ({
    url: e.node.url,
    alt: e.node.altText || p.title,
  }));
  const collections = (p.collections && p.collections.edges ? p.collections.edges : []).map((e) => ({
    id: e.node.id,
    handle: e.node.handle,
    title: e.node.title,
  }));
  const descriptionParagraphs = (p.description || "")
    .split(/\n+/)
    .map((s) => s.trim())
    .filter(Boolean);

  return {
    id: p.id,
    handle: p.handle,
    slug: p.handle, // alias — existing frontend routes/components read `.slug`
    sku: variants[0] ? variants[0].sku : "",
    name: p.title,
    brand: p.vendor || "Peptalys",
    subcategory: p.productType || "",
    tag: p.tags && p.tags.length ? p.tags[0] : null,
    tags: p.tags || [],
    shortDescription: descriptionParagraphs[0] || p.description || "",
    fullDescription: descriptionParagraphs.length ? descriptionParagraphs : (p.description ? [p.description] : []),
    descriptionHtml: p.descriptionHtml || "",
    category: collections[0] ? collections[0].handle : null,
    categories: collections,
    images: images.length ? images : (p.featuredImage ? [{ url: p.featuredImage.url, alt: p.featuredImage.altText || p.title }] : []),
    availableForSale: !!p.availableForSale,
    variants,
  };
}

function normalizeCollection(node) {
  return {
    id: node.id,
    handle: node.handle,
    slug: node.handle, // alias — mirrors old CATEGORIES[].slug
    name: node.title,
    shortName: node.title,
    description: node.description || "",
    image: node.image ? { url: node.image.url, alt: node.image.altText || node.title } : null,
  };
}

function normalizeCartLine(edge) {
  const l = edge.node || edge;
  const m = l.merchandise || {};
  return {
    id: l.id,
    quantity: l.quantity,
    lineTotal: money(l.cost && l.cost.totalAmount),
    merchandiseId: m.id,
    variantTitle: m.title === "Default Title" ? "Default" : m.title,
    sku: m.sku || "",
    availableForSale: !!m.availableForSale,
    quantityAvailable: typeof m.quantityAvailable === "number" ? m.quantityAvailable : null,
    unitPrice: money(m.price),
    image: m.image ? { url: m.image.url, alt: m.image.altText || "" } : null,
    productHandle: m.product ? m.product.handle : null,
    productTitle: m.product ? m.product.title : "",
  };
}

function normalizeCart(cart) {
  if (!cart) return null;
  return {
    id: cart.id,
    checkoutUrl: cart.checkoutUrl,
    totalQuantity: cart.totalQuantity,
    subtotal: money(cart.cost && cart.cost.subtotalAmount),
    total: money(cart.cost && cart.cost.totalAmount),
    estimatedTax: cart.cost && cart.cost.totalTaxAmount ? money(cart.cost.totalTaxAmount) : null,
    currencyCode: cart.cost && cart.cost.totalAmount ? cart.cost.totalAmount.currencyCode : "GBP",
    lines: (cart.lines && cart.lines.edges ? cart.lines.edges : []).map(normalizeCartLine),
  };
}

/* -------------------------------------------------------------------- */
/* Public API used by the /api/*.js route handlers                       */
/* -------------------------------------------------------------------- */

async function getProducts({ first = 48, collectionHandle, route = "/api/products" } = {}) {
  if (collectionHandle) {
    const query = `
      query CollectionProducts($handle: String!, $first: Int!) {
        collection(handle: $handle) {
          id handle title description
          products(first: $first) { edges { node { ...ProductFields } } }
        }
      }
      ${PRODUCT_FRAGMENT}
    `;
    const data = await shopifyFetch(query, { handle: collectionHandle, first }, { route });
    if (!data.collection) return { products: [], collection: null };
    return {
      products: data.collection.products.edges.map((e) => normalizeProduct(e.node)),
      collection: normalizeCollection(data.collection),
    };
  }

  const query = `
    query AllProducts($first: Int!) {
      products(first: $first, sortKey: TITLE) {
        edges { node { ...ProductFields } }
      }
    }
    ${PRODUCT_FRAGMENT}
  `;
  const data = await shopifyFetch(query, { first }, { route });
  return { products: data.products.edges.map((e) => normalizeProduct(e.node)), collection: null };
}

async function getProductByHandle(handle, { route = "/api/products/[handle]" } = {}) {
  const query = `
    query ProductByHandle($handle: String!) {
      product(handle: $handle) { ...ProductFields }
    }
    ${PRODUCT_FRAGMENT}
  `;
  const data = await shopifyFetch(query, { handle }, { route });
  return normalizeProduct(data.product);
}

async function getCollections({ first = 20, route = "/api/collections" } = {}) {
  const query = `
    query AllCollections($first: Int!) {
      collections(first: $first) {
        edges { node { id handle title description image { url altText } } }
      }
    }
  `;
  const data = await shopifyFetch(query, { first }, { route });
  return data.collections.edges.map((e) => normalizeCollection(e.node));
}

async function cartCreate(lines) {
  const query = `
    mutation CartCreate($lines: [CartLineInput!]) {
      cartCreate(input: { lines: $lines }) {
        cart { ...CartFields }
        userErrors { field message }
      }
    }
    ${CART_FRAGMENT}
  `;
  const data = await shopifyFetch(query, { lines: lines || [] }, { route: "/api/cart:create" });
  return finishCartMutation(data.cartCreate);
}

async function cartGet(cartId) {
  const query = `
    query CartGet($cartId: ID!) {
      cart(id: $cartId) { ...CartFields }
    }
    ${CART_FRAGMENT}
  `;
  const data = await shopifyFetch(query, { cartId }, { route: "/api/cart:get" });
  return normalizeCart(data.cart);
}

async function cartLinesAdd(cartId, lines) {
  const query = `
    mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart { ...CartFields }
        userErrors { field message }
      }
    }
    ${CART_FRAGMENT}
  `;
  const data = await shopifyFetch(query, { cartId, lines }, { route: "/api/cart:add" });
  return finishCartMutation(data.cartLinesAdd);
}

async function cartLinesUpdate(cartId, lines) {
  const query = `
    mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart { ...CartFields }
        userErrors { field message }
      }
    }
    ${CART_FRAGMENT}
  `;
  const data = await shopifyFetch(query, { cartId, lines }, { route: "/api/cart:update" });
  return finishCartMutation(data.cartLinesUpdate);
}

async function cartLinesRemove(cartId, lineIds) {
  const query = `
    mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart { ...CartFields }
        userErrors { field message }
      }
    }
    ${CART_FRAGMENT}
  `;
  const data = await shopifyFetch(query, { cartId, lineIds }, { route: "/api/cart:remove" });
  return finishCartMutation(data.cartLinesRemove);
}

function finishCartMutation(result) {
  if (result.userErrors && result.userErrors.length) {
    const err = new Error(result.userErrors.map((e) => e.message).join("; "));
    err.code = "SHOPIFY_USER_ERROR";
    err.details = result.userErrors;
    throw err;
  }
  return normalizeCart(result.cart);
}

module.exports = {
  shopifyFetch,
  getProducts,
  getProductByHandle,
  getCollections,
  cartCreate,
  cartGet,
  cartLinesAdd,
  cartLinesUpdate,
  cartLinesRemove,
  normalizeProduct,
  normalizeCollection,
  normalizeCart,
  // diagnostics-only exports
  testShopQuery,
  testMinimalProductsQuery,
  normalizeDomain,
  normalizeVersion,
  envPresenceMap,
  scrubSecrets,
  AUTH_HEADER_NAME,
  TOKEN_TYPE_EXPECTED,
};
