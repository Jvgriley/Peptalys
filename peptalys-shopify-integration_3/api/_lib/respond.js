/* Shared response helpers for /api handlers — plain Node (req, res) style
   (Vercel's default Node.js Serverless Function signature; no framework). */

function sendJson(res, status, body) {
  res.status(status).setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(body));
}

/**
 * Wraps a handler so that any thrown error becomes a safe, generic JSON
 * error response. Never forwards `err.stack`, env values, or raw upstream
 * error bodies to the client — only a short, fixed message plus an error
 * `code` (e.g. "SHOPIFY_HTTP_ERROR") that the frontend can branch on. Full
 * detail is logged server-side only, via console.error, which Vercel
 * captures in the function's own logs (never sent to the browser).
 */
function withErrorHandling(handler) {
  return async function wrapped(req, res) {
    try {
      await handler(req, res);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("[api]", req.url, err && err.code, err && err.message);
      const status = err && err.code === "SHOPIFY_CONFIG_MISSING" ? 500
        : err && err.code === "SHOPIFY_USER_ERROR" ? 400
        : err && err.status === 404 ? 404
        : 502;
      sendJson(res, status, {
        error: true,
        code: (err && err.code) || "UNKNOWN_ERROR",
        message: safeMessage(err),
      });
    }
  };
}

// Only ever return the small set of messages we ourselves constructed in
// api/_lib/shopify.js (none of which contain env values) — anything else
// (an unexpected JS error) is replaced with a generic message so a stray
// error can never leak internal detail to the browser.
const KNOWN_CODES = new Set([
  "SHOPIFY_CONFIG_MISSING",
  "SHOPIFY_NETWORK_ERROR",
  "SHOPIFY_BAD_RESPONSE",
  "SHOPIFY_HTTP_ERROR",
  "SHOPIFY_GRAPHQL_ERROR",
  "SHOPIFY_USER_ERROR",
]);
function safeMessage(err) {
  if (err && err.code && KNOWN_CODES.has(err.code)) {
    return err.code === "SHOPIFY_CONFIG_MISSING"
      ? "The store is temporarily unavailable. Please try again shortly."
      : err.message;
  }
  return "Something went wrong. Please try again.";
}

module.exports = { sendJson, withErrorHandling };
