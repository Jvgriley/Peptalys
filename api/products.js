const { getProducts } = require("./_lib/shopify");
const { sendJson, withErrorHandling } = require("./_lib/respond");

/* GET /api/products               -> { products: [...] }
   GET /api/products?collection=X  -> { products: [...], collection: {...} | null } */
module.exports = withErrorHandling(async function handler(req, res) {
  if (req.method !== "GET") {
    return sendJson(res, 405, { error: true, code: "METHOD_NOT_ALLOWED", message: "Use GET." });
  }
  const url = new URL(req.url, "http://localhost");
  const collectionHandle = url.searchParams.get("collection") || undefined;
  const first = Math.min(Number(url.searchParams.get("first")) || 48, 100);

  const { products, collection } = await getProducts({ first, collectionHandle, route: "/api/products" });
  const body = { products, collection: collection || null };
  if (products.length === 0) {
    // Authentication succeeded — Shopify simply returned zero products.
    // Do NOT treat this as an error; the likely cause is publication, not auth.
    body.note = "Authenticated with Shopify successfully — the catalogue returned zero products. Check that products are set to Active and are published to the Headless sales channel (Shopify Admin → each product → Sales channels and apps, or Settings → Sales channels).";
  }
  sendJson(res, 200, body);
});
