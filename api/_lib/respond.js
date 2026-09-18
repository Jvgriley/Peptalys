/* Shared response helpers for /api handlers — plain Node (req, res) style
   (Vercel's default Node.js Serverless Function signature; no framework). */

function sendJson(res, status, body) {
  res.status(status).setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(body));
}

/**
 * Wraps a handler so that any thrown error becomes a safe JSON error
 * response. The response body may include a `diagnostics` object — but
 * only the specific, whitelisted, non-secret fields that api/_lib/shopify.js
 * itself attaches (route, Shopify's HTTP status, a scrubbed response body
 * sample, env-var presence booleans, the endpoint host/version, which
 * header/token-type is expected). It NEVER includes the token, the request
 * headers we sent, or a full environment dump. Full detail is also logged
 * server-side via console.error, which Vercel captures in the function's
 * own logs (never sent to the browser) — but for this integration we
 * deliberately return the sanitized diagnostics too, since the whole point
 * right now is to see the real upstream failure without opening the logs.
 */
function withErrorHandling(handler) {
  return async function wrapped(req, res) {
    try {
      await handler(req, res);
    } catch (err) {
      const code = (err && err.code) || "UNKNOWN_ERROR";
      // eslint-disable-next-line no-console
      console.error("[api]", req.url, code, err && err.message, err && err.diagnostics && err.diagnostics.shopifyStatus);
      const status = statusFor(err, code);
      sendJson(res, status, {
        error: true,
        code,
        message: safeMessage(err, code),
        diagnostics: sanitizeDiagnostics(err && err.diagnostics),
      });
    }
  };
}

function statusFor(err, code) {
  if (code === "SHOPIFY_CONFIG_MISSING") return 500;
  if (code === "SHOPIFY_INVALID_URL") return 500;
  if (code === "SHOPIFY_USER_ERROR") return 400;
  if (err && err.status === 404) return 404;
  if (code === "SHOPIFY_HTTP_401" || code === "SHOPIFY_HTTP_403" || code === "SHOPIFY_HTTP_404") return 502;
  return 502;
}

// Only ever return the small set of messages we ourselves constructed in
// api/_lib/shopify.js (none of which contain env values) — anything else
// (an unexpected JS error) is replaced with a generic message so a stray
// error can never leak internal detail to the browser.
const KNOWN_CODES = new Set([
  "SHOPIFY_CONFIG_MISSING",
  "SHOPIFY_INVALID_URL",
  "SHOPIFY_NETWORK_ERROR",
  "SHOPIFY_BAD_RESPONSE",
  "SHOPIFY_HTTP_ERROR",
  "SHOPIFY_HTTP_401",
  "SHOPIFY_HTTP_403",
  "SHOPIFY_HTTP_404",
  "SHOPIFY_GRAPHQL_ERROR",
  "SHOPIFY_USER_ERROR",
]);
function safeMessage(err, code) {
  if (code && KNOWN_CODES.has(code)) {
    return code === "SHOPIFY_CONFIG_MISSING"
      ? "The store is temporarily unavailable. Please try again shortly."
      : (err && err.message) || "Something went wrong. Please try again.";
  }
  return "Something went wrong. Please try again.";
}

// Whitelist of diagnostic fields that are safe to return to the caller —
// this is the ONLY place that decides what leaves the server, so even if
// something unexpected ever ended up on err.diagnostics, only these named
// fields are ever copied into the response body.
const DIAGNOSTIC_FIELD_WHITELIST = [
  "route",
  "failureCategory",
  "shopifyStatus",
  "shopifyStatusText",
  "shopifyRequestId",
  "endpointHost",
  "apiVersion",
  "tokenHeaderUsed",
  "tokenTypeExpected",
  "env",
  "sanitizedResponseBody",
  "graphqlErrors",
  "networkErrorMessage",
];
function sanitizeDiagnostics(diag) {
  if (!diag || typeof diag !== "object") return undefined;
  const out = {};
  for (const key of DIAGNOSTIC_FIELD_WHITELIST) {
    if (diag[key] !== undefined) out[key] = diag[key];
  }
  return Object.keys(out).length ? out : undefined;
}

module.exports = { sendJson, withErrorHandling, sanitizeDiagnostics };
