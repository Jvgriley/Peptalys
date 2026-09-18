const { getCollections } = require("./_lib/shopify");
const { sendJson, withErrorHandling } = require("./_lib/respond");

/* GET /api/collections -> { collections: [...] } */
module.exports = withErrorHandling(async function handler(req, res) {
  if (req.method !== "GET") {
    return sendJson(res, 405, { error: true, code: "METHOD_NOT_ALLOWED", message: "Use GET." });
  }
  const url = new URL(req.url, "http://localhost");
  const first = Math.min(Number(url.searchParams.get("first")) || 20, 50);
  const collections = await getCollections({ first, route: "/api/collections" });
  const body = { collections };
  if (collections.length === 0) {
    body.note = "Authenticated with Shopify successfully — no collections were returned. Check that collections exist and are published to the Headless sales channel.";
  }
  sendJson(res, 200, body);
});
