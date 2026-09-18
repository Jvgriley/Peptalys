const shopify = require("./_lib/shopify");
const { sendJson, sanitizeDiagnostics } = require("./_lib/respond");

/* GET /api/diagnostics[?key=...]

   A deliberately separate, read-only route for diagnosing the Shopify
   integration itself — it runs the tiered test sequence recommended when
   debugging a Storefront API auth failure:

     1. env var presence + endpoint construction (no network call)
     2. a minimal `{ shop { name } }` query — proves auth + connectivity
     3. a minimal `products(first: 5) { nodes { id title handle } }` query
     4. (only if 2 and 3 both pass) a note that the full production
        /api/products and /api/collections queries should now be tested

   Stops at the first tier that fails, so one bad field in the full
   production query is never confused with a genuine auth failure — the
   whole reason this route exists.

   Never returns the token, the request headers sent to Shopify, or a full
   environment dump — only the same whitelisted diagnostic fields used
   elsewhere (see api/_lib/respond.js's DIAGNOSTIC_FIELD_WHITELIST).

   Optional protection: if DIAGNOSTIC_KEY is set in the environment, this
   route requires ?key=<DIAGNOSTIC_KEY> to match, and returns 404 otherwise
   (so its existence isn't even confirmed to an unauthenticated caller). If
   DIAGNOSTIC_KEY is not set, the route is open — convenient while actively
   debugging, but consider setting DIAGNOSTIC_KEY (or removing this file)
   once the integration is confirmed working, since it does reveal internal
   error categorisation (never secrets) to whoever can reach it. */

module.exports = async function handler(req, res) {
  if (req.method !== "GET") {
    return sendJson(res, 405, { error: true, code: "METHOD_NOT_ALLOWED", message: "Use GET." });
  }

  const url = new URL(req.url, "http://localhost");
  const configuredKey = process.env.DIAGNOSTIC_KEY;
  if (configuredKey && url.searchParams.get("key") !== configuredKey) {
    return sendJson(res, 404, { error: true, code: "NOT_FOUND" });
  }

  const report = {
    generatedAt: new Date().toISOString(),
    steps: [],
  };

  // ---- Step 1: config presence + endpoint construction (no network call) ----
  const env = shopify.envPresenceMap();
  const domain = shopify.normalizeDomain(process.env.SHOPIFY_STORE_DOMAIN);
  const version = shopify.normalizeVersion(process.env.SHOPIFY_STOREFRONT_API_VERSION);
  const configStep = {
    step: 1,
    name: "Environment & endpoint construction",
    env,
    endpointHost: domain || null,
    apiVersion: version || null,
    endpointPreview: domain && version ? `https://${domain}/api/${version}/graphql.json` : null,
    tokenHeaderUsed: shopify.AUTH_HEADER_NAME,
    tokenTypeExpected: shopify.TOKEN_TYPE_EXPECTED,
  };
  const allEnvPresent = Object.values(env).every(Boolean);
  configStep.pass = allEnvPresent && !!domain && !!version;
  report.steps.push(configStep);

  if (!configStep.pass) {
    report.overallResult = "FAIL_AT_STEP_1_CONFIG";
    return sendJson(res, 200, report);
  }

  // ---- Step 2: minimal `shop { name }` query ----
  const shopStep = { step: 2, name: "Minimal shop query: query { shop { name } }" };
  try {
    const shop = await shopify.testShopQuery();
    shopStep.pass = true;
    shopStep.result = shop; // { name: "..." } — store name only, not sensitive
  } catch (err) {
    shopStep.pass = false;
    shopStep.code = err.code;
    shopStep.message = err.message;
    shopStep.diagnostics = sanitizeDiagnostics(err.diagnostics);
  }
  report.steps.push(shopStep);

  if (!shopStep.pass) {
    report.overallResult = "FAIL_AT_STEP_2_SHOP_QUERY";
    report.interpretation = "Authentication or connectivity itself is broken — see step 2's diagnostics.shopifyStatus. 401 = bad/missing/wrong-header token. 403 = token valid but missing scope or not enabled for this sales channel. Anything else, see failureCategory.";
    return sendJson(res, 200, report);
  }

  // ---- Step 3: minimal products query ----
  const productsStep = { step: 3, name: "Minimal products query: query { products(first: 5) { nodes { id title handle } } }" };
  try {
    const nodes = await shopify.testMinimalProductsQuery();
    productsStep.pass = true;
    productsStep.count = nodes.length;
    productsStep.sample = nodes.slice(0, 5).map((n) => ({ title: n.title, handle: n.handle }));
  } catch (err) {
    productsStep.pass = false;
    productsStep.code = err.code;
    productsStep.message = err.message;
    productsStep.diagnostics = sanitizeDiagnostics(err.diagnostics);
  }
  report.steps.push(productsStep);

  if (!productsStep.pass) {
    report.overallResult = "FAIL_AT_STEP_3_MINIMAL_PRODUCTS_QUERY";
    report.interpretation = "Auth and connectivity are fine (step 2 passed), but even the minimal products query failed — this points at a GraphQL-level problem (API version, field support) rather than authentication.";
    return sendJson(res, 200, report);
  }

  report.overallResult = productsStep.count > 0 ? "PASS" : "PASS_BUT_ZERO_PRODUCTS";
  report.interpretation = productsStep.count > 0
    ? "Authentication, connectivity, and a real product query all succeeded. /api/products and /api/collections should now work — if they still don't, the bug is specific to their fuller GraphQL query (an unsupported field for this API version), not authentication."
    : "Authentication and the query itself both succeeded, but Shopify returned zero products. This is NOT an authentication problem — check that products are Active and published to the Headless sales channel in Shopify Admin.";

  return sendJson(res, 200, report);
};
