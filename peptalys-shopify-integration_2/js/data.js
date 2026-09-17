/* ==========================================================================
   PEPTALYS — brand constants & business settings.
   --------------------------------------------------------------------------
   Product, collection, cart and checkout data now come live from Shopify
   (see js/shopify-client.js + api/_lib/shopify.js) via the Storefront API.
   This file only holds things Shopify has no concept of: brand copy, and
   the wholesale minimum-order-value business rule Peptalys enforces on top
   of Shopify (Shopify's own cart/checkout has no "minimum order" concept
   built in, so that gate stays client-side, checked against the live
   Shopify cart subtotal).
   ========================================================================== */

const BRAND = {
  name: "Peptalys",
  legalName: "Peptalys Ltd",
  tagline: "More Than Peptides",
  strapline: "Research peptides for a healthier tomorrow.",
  descriptor: "Quality. Supply. Progress.",
  email: "info@peptalys.co.uk",
  phone: "+44 20 4577 1290",
  address: "Unit 4, Riverside Business Park, Manchester, M4 5AB, United Kingdom",
  companyNumber: "16284730",
  instagram: "@peptalys",
};

const SETTINGS = {
  currency: "GBP",
  currencySymbol: "£",
  minimumOrderValue: 1000.00,
  deliveryPromise: "3–5 working days, nationwide UK delivery.",
};

/* -------------------------------------------------------------------- */
/* Testimonials / trust signals — lab customer types, not named           */
/* individuals, to avoid implying endorsement by a real, identifiable     */
/* person.                                                                 */
/* -------------------------------------------------------------------- */
const TRUST_POINTS = [
  { icon: "flag", title: "UK Manufactured", body: "Synthesised and quality-controlled in the UK, batch-tested for purity." },
  { icon: "truck", title: "3–5 Working Day Delivery", body: "Fast, secure courier delivery, nationwide across the UK." },
  { icon: "users", title: "Wholesale Supply", body: "Built for research bodies, laboratories and institutional buyers." },
  { icon: "flask", title: "Research Use Only", body: "Not for human consumption. Sold exclusively for laboratory research." },
];

/* Shopify collections carry no "icon" field, so category tiles/filters
   pick a reasonable icon by matching keywords in the collection's handle
   or title against this table — falling back to a generic flask icon for
   any collection that doesn't match. Purely cosmetic; never affects data. */
const CATEGORY_ICON_RULES = [
  { test: /weight|metabolic|glp/i, icon: "scale" },
  { test: /recover|repair|heal/i, icon: "shield" },
  { test: /skin|longevity|beauty|collagen/i, icon: "sparkle" },
  { test: /cellular|mitochond|energy/i, icon: "atom" },
  { test: /growth|hormone|gh\b/i, icon: "trendingUp" },
];
function categoryIcon(collection) {
  const haystack = `${collection.handle || ""} ${collection.name || ""}`;
  const match = CATEGORY_ICON_RULES.find((r) => r.test.test(haystack));
  return match ? match.icon : "flask";
}

/* -------------------------------------------------------------------- */
/* ARCHITECTURE NOTES (kept in-repo, read by the /admin “Architecture”    */
/* tab so the roadmap travels with the code).                             */
/* -------------------------------------------------------------------- */
const ARCHITECTURE_NOTES = {
  dataSource: "Products, collections, prices, images, variants, availability, cart and checkout are all read live from Shopify via the Storefront API, proxied through this app's own /api/* serverless functions so the private Storefront access token never reaches the browser. Shopify's Admin is the single place staff manage the catalogue — this site has no separate product database of its own.",
  pricing: "Wholesale cost / margin data lived only in the old placeholder catalogue and was never wired to Shopify — Shopify's Storefront API has no concept of an internal cost field, so true margin reporting now belongs in Shopify Admin (or a metafield read only by Admin-API-authenticated tooling), not this customer-facing site.",
  orders: "Checkout redirects to Shopify's own hosted checkout (via the cart's checkoutUrl), so Shopify becomes the system of record for orders and payment — this site does not create or store order records of its own for real purchases.",
};
