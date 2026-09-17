/* ==========================================================================
   Shopify Storefront API — server-only client.
   --------------------------------------------------------------------------
   Every function in this file runs ONLY inside Vercel Serverless Functions
   (anything under /api). It is never imported by, or bundled into, any
   frontend file — the browser never sees this code and never sees
   SHOPIFY_STOREFRONT_ACCESS_TOKEN. Vercel does not serve /api/_lib as a
   route (the leading underscore excludes it from routing) or as a static
   asset — it exists only to be require()'d by sibling functions.

   Files/folders prefixed with "_" inside /api are Vercel's documented
   convention for shared code that should not itself become an endpoint.
   ========================================================================== */

const REQUIRED_ENV = ["SHOPIFY_STORE_DOMAIN", "SHOPIFY_STOREFRONT_ACCESS_TOKEN", "SHOPIFY_STOREFRONT_API_VERSION"];

function assertEnv() {
  const missing = REQUIRED_ENV.filter((k) => !process.env[k]);
  if (missing.length) {
    // Message intentionally names only the KEYS that are missing, never any
    // value — safe to surface in logs or an error response.
    const err = new Error(`Server is missing required Shopify configuration: ${missing.join(", ")}`);
    err.code = "SHOPIFY_CONFIG_MISSING";
    throw err;
  }
}

/**
 * Low-level authenticated POST to the Shopify Storefront GraphQL endpoint.
 * Server-side only — reads the private token from process.env and sends it
 * as the X-Shopify-Storefront-Access-Token header, which never reaches the
 * browser because this function only ever runs inside a Vercel Function.
 */
async function shopifyFetch(query, variables) {
  assertEnv();
  const domain = process.env.SHOPIFY_STORE_DOMAIN.replace(/^https?:\/\//, "").replace(/\/$/, "");
  const version = process.env.SHOPIFY_STOREFRONT_API_VERSION;
  const url = `https://${domain}/api/${version}/graphql.json`;

  let res;
  try {
    res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
        Accept: "application/json",
      },
      body: JSON.stringify({ query, variables: variables || {} }),
    });
  } catch (networkErr) {
    const err = new Error("Could not reach Shopify (network error).");
    err.code = "SHOPIFY_NETWORK_ERROR";
    err.cause = networkErr && networkErr.message;
    throw err;
  }

  let json;
  const text = await res.text();
  try {
    json = text ? JSON.parse(text) : {};
  } catch (parseErr) {
    const err = new Error("Shopify returned a response that could not be parsed.");
    err.code = "SHOPIFY_BAD_RESPONSE";
    err.status = res.status;
    throw err;
  }

  if (!res.ok) {
    const err = new Error(`Shopify API request failed (HTTP ${res.status}).`);
    err.code = "SHOPIFY_HTTP_ERROR";
    err.status = res.status;
    err.details = json && json.errors ? json.errors : undefined;
    throw err;
  }

  if (json.errors && json.errors.length) {
    const err = new Error(json.errors.map((e) => e.message).join("; ") || "Shopify GraphQL error.");
    err.code = "SHOPIFY_GRAPHQL_ERROR";
    err.details = json.errors;
    throw err;
  }

  return json.data;
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

async function getProducts({ first = 48, collectionHandle } = {}) {
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
    const data = await shopifyFetch(query, { handle: collectionHandle, first });
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
  const data = await shopifyFetch(query, { first });
  return { products: data.products.edges.map((e) => normalizeProduct(e.node)), collection: null };
}

async function getProductByHandle(handle) {
  const query = `
    query ProductByHandle($handle: String!) {
      product(handle: $handle) { ...ProductFields }
    }
    ${PRODUCT_FRAGMENT}
  `;
  const data = await shopifyFetch(query, { handle });
  return normalizeProduct(data.product);
}

async function getCollections({ first = 20 } = {}) {
  const query = `
    query AllCollections($first: Int!) {
      collections(first: $first) {
        edges { node { id handle title description image { url altText } } }
      }
    }
  `;
  const data = await shopifyFetch(query, { first });
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
  const data = await shopifyFetch(query, { lines: lines || [] });
  return finishCartMutation(data.cartCreate);
}

async function cartGet(cartId) {
  const query = `
    query CartGet($cartId: ID!) {
      cart(id: $cartId) { ...CartFields }
    }
    ${CART_FRAGMENT}
  `;
  const data = await shopifyFetch(query, { cartId });
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
  const data = await shopifyFetch(query, { cartId, lines });
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
  const data = await shopifyFetch(query, { cartId, lines });
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
  const data = await shopifyFetch(query, { cartId, lineIds });
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
};
