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

  const { products, collection } = await getProducts({ first, collectionHandle });
  sendJson(res, 200, { products, collection: collection || null });
});
