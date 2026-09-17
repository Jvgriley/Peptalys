const { getProductByHandle } = require("../_lib/shopify");
const { sendJson, withErrorHandling } = require("../_lib/respond");

/* GET /api/products/:handle -> { product: {...} } | 404 */
module.exports = withErrorHandling(async function handler(req, res) {
  if (req.method !== "GET") {
    return sendJson(res, 405, { error: true, code: "METHOD_NOT_ALLOWED", message: "Use GET." });
  }
  const { handle } = req.query;
  if (!handle || typeof handle !== "string") {
    return sendJson(res, 400, { error: true, code: "BAD_REQUEST", message: "Missing product handle." });
  }

  const product = await getProductByHandle(handle);
  if (!product) {
    return sendJson(res, 404, { error: true, code: "NOT_FOUND", message: "Product not found." });
  }
  sendJson(res, 200, { product });
});
