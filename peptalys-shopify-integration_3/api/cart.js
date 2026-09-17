const { cartCreate, cartGet, cartLinesAdd, cartLinesUpdate, cartLinesRemove } = require("./_lib/shopify");
const { sendJson, withErrorHandling } = require("./_lib/respond");

/* GET  /api/cart?id=<cartId>                              -> { cart }
   POST /api/cart  { action: "create", lines }              -> { cart }
   POST /api/cart  { action: "add", cartId, lines }          -> { cart }
   POST /api/cart  { action: "update", cartId, lines }        -> { cart }
   POST /api/cart  { action: "remove", cartId, lineIds }       -> { cart }

   This endpoint deliberately does NOT accept raw GraphQL from the client —
   only these four fixed, whitelisted actions — so it can never be used as
   an open proxy for arbitrary Storefront API queries with the server's
   private token. */

function isNonEmptyString(v) {
  return typeof v === "string" && v.length > 0;
}

function validateLines(lines) {
  if (!Array.isArray(lines) || lines.length === 0) return false;
  return lines.every(
    (l) => l && isNonEmptyString(l.merchandiseId) && Number.isInteger(l.quantity) && l.quantity > 0
  );
}

function validateUpdateLines(lines) {
  if (!Array.isArray(lines) || lines.length === 0) return false;
  return lines.every((l) => l && isNonEmptyString(l.id) && Number.isInteger(l.quantity) && l.quantity >= 0);
}

async function readJsonBody(req) {
  if (req.body && typeof req.body === "object") return req.body; // Vercel usually pre-parses JSON bodies
  if (typeof req.body === "string") {
    try { return JSON.parse(req.body); } catch (e) { return {}; }
  }
  return await new Promise((resolve) => {
    let raw = "";
    req.on("data", (chunk) => { raw += chunk; });
    req.on("end", () => {
      try { resolve(raw ? JSON.parse(raw) : {}); } catch (e) { resolve({}); }
    });
    req.on("error", () => resolve({}));
  });
}

module.exports = withErrorHandling(async function handler(req, res) {
  if (req.method === "GET") {
    const url = new URL(req.url, "http://localhost");
    const id = url.searchParams.get("id");
    if (!isNonEmptyString(id)) {
      return sendJson(res, 400, { error: true, code: "BAD_REQUEST", message: "Missing cart id." });
    }
    const cart = await cartGet(id);
    if (!cart) return sendJson(res, 404, { error: true, code: "NOT_FOUND", message: "Cart not found." });
    return sendJson(res, 200, { cart });
  }

  if (req.method !== "POST") {
    return sendJson(res, 405, { error: true, code: "METHOD_NOT_ALLOWED", message: "Use GET or POST." });
  }

  const body = await readJsonBody(req);
  const { action } = body;

  if (action === "create") {
    if (!validateLines(body.lines)) {
      return sendJson(res, 400, { error: true, code: "BAD_REQUEST", message: "lines must be a non-empty array of {merchandiseId, quantity}." });
    }
    const cart = await cartCreate(body.lines);
    return sendJson(res, 200, { cart });
  }

  if (action === "add") {
    if (!isNonEmptyString(body.cartId) || !validateLines(body.lines)) {
      return sendJson(res, 400, { error: true, code: "BAD_REQUEST", message: "cartId and lines are required." });
    }
    const cart = await cartLinesAdd(body.cartId, body.lines);
    return sendJson(res, 200, { cart });
  }

  if (action === "update") {
    if (!isNonEmptyString(body.cartId) || !validateUpdateLines(body.lines)) {
      return sendJson(res, 400, { error: true, code: "BAD_REQUEST", message: "cartId and lines ({id, quantity}) are required." });
    }
    const cart = await cartLinesUpdate(body.cartId, body.lines);
    return sendJson(res, 200, { cart });
  }

  if (action === "remove") {
    if (!isNonEmptyString(body.cartId) || !Array.isArray(body.lineIds) || !body.lineIds.every(isNonEmptyString)) {
      return sendJson(res, 400, { error: true, code: "BAD_REQUEST", message: "cartId and lineIds are required." });
    }
    const cart = await cartLinesRemove(body.cartId, body.lineIds);
    return sendJson(res, 200, { cart });
  }

  return sendJson(res, 400, { error: true, code: "BAD_REQUEST", message: 'action must be one of "create", "add", "update", "remove".' });
});
