"use strict";
/* Hand-authored line-icon set (24x24, stroke, currentColor) + the Peptalys
   monogram mark. Kept dependency-free so the page needs no icon-font CDN. */
const ICON_PATHS = {
    search: "M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM21 21l-4.3-4.3",
    filter: "M4 6h16M7 12h10M10 18h4",
    chevronDown: "M6 9l6 6 6-6",
    chevronUp: "M18 15l-6-6-6 6",
    chevronRight: "M9 6l6 6-6 6",
    chevronLeft: "M15 6l-6 6 6 6",
    close: "M6 6l12 12M18 6L6 18",
    menu: "M4 7h16M4 12h16M4 17h16",
    cart: "M3 4h2l2.4 12.2a2 2 0 0 0 2 1.6h7.2a2 2 0 0 0 2-1.6L20.5 8H6M9.5 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM17.5 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z",
    user: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4.5 20.5a7.5 7.5 0 0 1 15 0",
    check: "M5 13l4 4L19 7",
    shield: "M12 3l7 3v6c0 4.5-3 7.7-7 9-4-1.3-7-4.5-7-9V6l7-3Z",
    shieldCheck: "M12 3l7 3v6c0 4.5-3 7.7-7 9-4-1.3-7-4.5-7-9V6l7-3ZM9 12l2 2 4-4",
    flask: "M9 2h6M10 2v6.2L4.8 18a2 2 0 0 0 1.8 3h10.8a2 2 0 0 0 1.8-3L14 8.2V2M7.5 15h9",
    truck: "M3 6h11v9H3zM14 10h4l3 3v2h-7zM7 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM18 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z",
    users: "M9 12a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM2.8 20a6.2 6.2 0 0 1 12.4 0M16 8.2a3 3 0 1 1 0 6M21.2 20a5.6 5.6 0 0 0-4-5.4",
    flag: "M5 21V4M5 4h13l-2.5 3.5L18 11H5",
    sparkle: "M12 3l1.6 4.9L18.5 9.5l-4.9 1.6L12 16l-1.6-4.9L5.5 9.5l4.9-1.6L12 3ZM19 15l.7 2.1 2.1.7-2.1.7-.7 2.1-.7-2.1-2.1-.7 2.1-.7.7-2.1Z",
    atom: "M12 12a1.4 1.4 0 1 0 0-2.8 1.4 1.4 0 0 0 0 2.8ZM12 3c3 2.5 4.8 6 4.8 9s-1.8 6.5-4.8 9c-3-2.5-4.8-6-4.8-9S9 5.5 12 3ZM3.5 8.2c3.6-1.4 7.4-1.4 11 0s6.2 3.8 7 7.4c-3.6 1.4-7.4 1.4-11 0S4.3 11.8 3.5 8.2Z",
    scale: "M12 3v3M6 6h12M6 6L3 12a3 3 0 0 0 6 0L6 6ZM18 6l-3 6a3 3 0 0 0 6 0l-3-6ZM9 21h6",
    trendingUp: "M3 17l6-6 4 4 8-8M15 7h6v6",
    droplet: "M12 3s6 6.5 6 11a6 6 0 1 1-12 0c0-4.5 6-11 6-11Z",
    leaf: "M20 4C10 4 4 10 4 18c8 0 14-6 14-14ZM4 20l6-6",
    lock: "M6 11V8a6 6 0 1 1 12 0v3M5 11h14v9H5z",
    plus: "M12 5v14M5 12h14",
    minus: "M5 12h14",
    trash: "M4 7h16M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M7 7l1 13a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2l1-13",
    arrowRight: "M4 12h16M14 6l6 6-6 6",
    arrowLeft: "M20 12H4M10 18l-6-6 6-6",
    star: "M12 3l2.6 5.6 6.2.6-4.6 4.2 1.3 6.1L12 16.7 6.5 19.5l1.3-6.1-4.6-4.2 6.2-.6L12 3Z",
    info: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM12 11v6M12 7v.01",
    mail: "M4 5h16v14H4zM4 6l8 7 8-7",
    phone: "M6 3h3l1.5 5-2 1.5a12 12 0 0 0 6 6l1.5-2 5 1.5v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4 6.2 2 2 0 0 1 6 3Z",
    mapPin: "M12 21s7-6.2 7-11.5A7 7 0 1 0 5 9.5C5 14.8 12 21 12 21ZM12 11.8a2.3 2.3 0 1 0 0-4.6 2.3 2.3 0 0 0 0 4.6Z",
    instagram: "M4 8a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V8ZM12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM17 6.3v.01",
    heart: "M12 20s-7.5-4.6-9.6-9A5.3 5.3 0 0 1 12 6.5 5.3 5.3 0 0 1 21.6 11c-2.1 4.4-9.6 9-9.6 9Z",
    download: "M12 3v12M7 10l5 5 5-5M4 19h16",
    clipboard: "M9 4h6a1 1 0 0 1 1 1v1H8V5a1 1 0 0 1 1-1ZM6 6h12v14H6zM9 12h6M9 16h6",
    package: "M21 8l-9-5-9 5 9 5 9-5ZM3 8v9l9 5 9-5V8M12 13v9",
    creditCard: "M3 6h18v12H3zM3 10h18M7 15h4",
    alertTriangle: "M12 4l9 16H3L12 4ZM12 10v4M12 17v.01",
    building: "M4 21V6l8-3 8 3v15M9 21v-5h6v5M9 10h.01M9 14h.01M15 10h.01M15 14h.01",
    microscope: "M9 21h6M10 21v-3.5a4 4 0 1 1 4 0V21M5 21h1M9 3l5 5M7 8l3-3 5 5-3 3-5-5Z",
    globe: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM3 12h18M12 3a13 13 0 0 1 0 18 13 13 0 0 1 0-18Z",
    clock: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM12 7v5l3 3",
    fileText: "M7 3h7l5 5v13H7zM14 3v5h5M9 13h6M9 17h6",
    quote: "M7 8c-2 1.2-3 3-3 5.2 0 2.1 1.4 3.8 3.4 3.8 1.8 0 3.1-1.4 3.1-3.1C10.5 12 9 10.6 7 10.5c.1-1.4 1-2.4 2.2-3.2L7 8Zm9 0c-2 1.2-3 3-3 5.2 0 2.1 1.4 3.8 3.4 3.8 1.8 0 3.1-1.4 3.1-3.1 0-1.9-1.5-3.3-3.5-3.4.1-1.4 1-2.4 2.2-3.2L16 8Z",
};
function Icon({ name, className, strokeWidth = 1.8, filled = false }) {
    const d = ICON_PATHS[name];
    if (!d)
        return null;
    return (React.createElement("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: strokeWidth, strokeLinecap: "round", strokeLinejoin: "round", className: className || "h-5 w-5", "aria-hidden": "true" },
        React.createElement("path", { d: d })));
}
/* Peptalys monogram — an original, simplified interpretation of the brand's
   "P" ribbon-and-molecule mark for use at small sizes (nav, favicon-ish). */
function LogoMark({ className }) {
    return (React.createElement("svg", { viewBox: "0 0 48 48", className: className || "h-8 w-8", "aria-hidden": "true" },
        React.createElement("defs", null,
            React.createElement("linearGradient", { id: "ppt-grad", x1: "4", y1: "4", x2: "44", y2: "44", gradientUnits: "userSpaceOnUse" },
                React.createElement("stop", { offset: "0", stopColor: "#6DD1FF" }),
                React.createElement("stop", { offset: "1", stopColor: "#0A3D91" }))),
        React.createElement("path", { d: "M14 5h9.5c7 0 11.5 4 11.5 10s-4.5 10-11.2 10H19v18h-5V5Z", fill: "url(#ppt-grad)" }),
        React.createElement("path", { d: "M19 10.5v9.2", stroke: "#071022", strokeWidth: "2.2", strokeLinecap: "round", opacity: "0.35" }),
        React.createElement("circle", { cx: "19", cy: "10.2", r: "2.1", fill: "#EAF2FF" }),
        React.createElement("circle", { cx: "19", cy: "15.1", r: "1.5", fill: "#EAF2FF", opacity: "0.9" }),
        React.createElement("circle", { cx: "19", cy: "19.6", r: "1.9", fill: "#EAF2FF" })));
}
/* Decorative DNA helix, used as ambient background texture. Purely
   ornamental (aria-hidden), so it stays out of the reading order. */
function DnaStrand({ className, opacity = 0.5 }) {
    const rungs = Array.from({ length: 9 });
    return (React.createElement("svg", { viewBox: "0 0 120 420", className: className, "aria-hidden": "true", style: { opacity } },
        React.createElement("defs", null,
            React.createElement("linearGradient", { id: "dna-line", x1: "0", y1: "0", x2: "0", y2: "420", gradientUnits: "userSpaceOnUse" },
                React.createElement("stop", { offset: "0", stopColor: "#6DD1FF", stopOpacity: "0" }),
                React.createElement("stop", { offset: "0.15", stopColor: "#6DD1FF", stopOpacity: "0.9" }),
                React.createElement("stop", { offset: "0.85", stopColor: "#2F8FFF", stopOpacity: "0.9" }),
                React.createElement("stop", { offset: "1", stopColor: "#2F8FFF", stopOpacity: "0" }))),
        React.createElement("path", { d: "M20 0 C 100 52, 20 105, 100 157 C 20 210, 100 262, 20 315 C 100 367, 20 400, 20 420", stroke: "url(#dna-line)", strokeWidth: "2", fill: "none" }),
        React.createElement("path", { d: "M100 0 C 20 52, 100 105, 20 157 C 100 210, 20 262, 100 315 C 20 367, 100 400, 100 420", stroke: "url(#dna-line)", strokeWidth: "2", fill: "none" }),
        rungs.map((_, i) => {
            const y = 20 + i * 46;
            return React.createElement("line", { key: i, x1: "20", y1: y, x2: "100", y2: y, stroke: "#9FCBFF", strokeWidth: "1", opacity: "0.35" });
        })));
}
"use strict";
/* ==========================================================================
   PEPTALYS — product / catalogue data layer
   --------------------------------------------------------------------------
   This file is the STAND-IN for a real product feed. It is written as a
   plain, serialisable data set (no functions inside the records) on purpose:
   every record here maps 1:1 onto the field list the brief specifies
   (SKU, category, brand, cost/retail/RRP, variants, stock, weight, specs…)
   so that swapping this file for a fetch() against a real stockist feed /
   internal API is a data-source change, not a rewrite. See ARCHITECTURE
   notes at the bottom of this file for the intended production shape.
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
    vatRate: 0.20,
    minimumOrderValue: 1000.00,
    freeDeliveryThreshold: 1000.00,
    standardDeliveryFee: 15.00,
    deliveryPromise: "3–5 working days, nationwide across the UK.",
};
/* Every SKU is sold wholesale in fixed units of 10 vials — customers cannot
   buy single vials. 1 basket "unit" = 10 vials, and all customer-facing
   prices (variant.retailPrice / variant.rrp, which are stored per-vial in
   the data below) are multiplied by UNIT_SIZE wherever they reach the UI or
   the cart. Stock and quantity steppers are likewise expressed in whole
   units, floor(vialsInStock / UNIT_SIZE). */
const UNIT_SIZE = 10;
/* -------------------------------------------------------------------- */
/* Categories                                                            */
/* -------------------------------------------------------------------- */
const CATEGORIES = [
    {
        id: "weight-management",
        slug: "weight-management",
        name: "Weight & Metabolic Management",
        shortName: "Weight Management",
        description: "Incretin-pathway research compounds studied for their effects on appetite regulation, glycaemic control and energy metabolism.",
        icon: "scale",
    },
    {
        id: "recovery-repair",
        slug: "recovery-repair",
        name: "Recovery & Tissue Repair",
        shortName: "Recovery & Repair",
        description: "Peptides researched for their role in angiogenesis, wound healing and musculoskeletal tissue regeneration.",
        icon: "shield",
    },
    {
        id: "skin-longevity",
        slug: "skin-longevity",
        name: "Skin, Rejuvenation & Longevity",
        shortName: "Skin & Longevity",
        description: "Copper-binding and regenerative peptides studied in dermal remodelling, collagen synthesis and cellular ageing.",
        icon: "sparkle",
    },
    {
        id: "cellular-metabolic",
        slug: "cellular-metabolic",
        name: "Cellular & Mitochondrial Health",
        shortName: "Cellular Health",
        description: "Mitochondrial-derived peptides and coenzymes researched for cellular energy metabolism and metabolic flexibility.",
        icon: "atom",
    },
    {
        id: "growth-hormone",
        slug: "growth-hormone",
        name: "Growth Hormone Axis",
        shortName: "GH Support",
        description: "Growth hormone secretagogues and fragments studied for body composition, recovery and secretagogue signalling.",
        icon: "trendingUp",
    },
];
/* -------------------------------------------------------------------- */
/* Products
   Field shape mirrors a future relational schema:
   Product (1) --- (many) Variant
   Product.images: array of illustration descriptors (placeholder art —
   see ARCHITECTURE note) standing in for a real photography set.
   ----------------------------------------------------------------------- */
const PRODUCTS = [
    {
        id: "retatrutide",
        slug: "retatrutide",
        sku: "PPT-RETA",
        name: "Retatrutide",
        brand: "Peptalys",
        category: "weight-management",
        subcategory: "Triple Agonist",
        tag: "Next-Gen",
        shortDescription: "A triple-agonist peptide activating GLP-1, GIP and glucagon receptors — researched for metabolic weight management and long-term metabolic wellness.",
        fullDescription: [
            "Retatrutide is a novel triple-agonist peptide studied for its simultaneous activity at the GLP-1, GIP and glucagon receptors. This tri-agonism distinguishes it from single- and dual-pathway incretin compounds under current investigation.",
            "In vitro and in vivo research has focused on its combined influence over appetite signalling, insulin sensitivity, lipid handling and energy expenditure, making it a compound of significant interest across metabolic and endocrinology research programmes.",
            "All Peptalys Retatrutide is manufactured in the UK to a controlled synthesis process and supplied strictly for laboratory and in-vitro research use.",
        ],
        researchHighlights: [
            { title: "Appetite signalling", body: "Studied for its effect on GLP-1 and glucagon receptor pathways that regulate satiety and feeding behaviour in research models." },
            { title: "Insulin sensitivity", body: "GIP receptor activity is under investigation for its role in glucose regulation and insulin signalling." },
            { title: "Energy expenditure", body: "Glucagon receptor agonism is being studied for its influence on hepatic fat oxidation and thermogenesis." },
            { title: "Long-term metabolic research", body: "Ongoing research explores cardiovascular, hepatic and broader metabolic endpoints." },
        ],
        specs: { appearance: "Lyophilised white powder", purity: "≥ 98% (HPLC)", storage: "Store lyophilised at -20°C; refrigerate after reconstitution, use within 30 days", solubility: "Bacteriostatic water or 0.9% sodium chloride", casNumber: "2381089-83-2" },
        images: [{ type: "photo", src: "images/retatrutide.jpg", alt: "Peptalys Retatrutide research vials", accent: "#2F8FFF" }, { type: "molecule", accent: "#6DD1FF" }],
        variants: [
            { sku: "PPT-RETA-10", label: "10mg", size: "10mg", retailPrice: 11.95, rrp: 16.95, wholesaleCost: 6.10, stock: 420, weightGrams: 12 },
            { sku: "PPT-RETA-20", label: "20mg", size: "20mg", retailPrice: 15.95, rrp: 22.95, wholesaleCost: 8.40, stock: 310, weightGrams: 12 },
            { sku: "PPT-RETA-30", label: "30mg", size: "30mg", retailPrice: 20.95, rrp: 29.95, wholesaleCost: 11.20, stock: 180, weightGrams: 12 },
        ],
    },
    {
        id: "tirzepatide",
        slug: "tirzepatide",
        sku: "PPT-TIRZ",
        name: "Tirzepatide",
        brand: "Peptalys",
        category: "weight-management",
        subcategory: "Dual Agonist",
        tag: "Best Seller",
        shortDescription: "A dual GLP-1/GIP receptor agonist studied for weight management, metabolic health and glycaemic research applications.",
        fullDescription: [
            "Tirzepatide is a once-weekly research peptide that activates both GLP-1 and GIP receptors, combining mechanisms compared to single-pathway incretin therapies under investigation.",
            "Extensively studied in preclinical and clinical-adjacent research literature, Tirzepatide is a reference compound for dual-incretin pathway research into appetite regulation, insulin secretion and lipid metabolism.",
            "Supplied as a UK-manufactured lyophilised powder for laboratory reconstitution, strictly for research use.",
        ],
        researchHighlights: [
            { title: "Dual-pathway action", body: "Simultaneously engages GLP-1 and GIP receptors, offering researchers a benchmark dual-agonist model." },
            { title: "Glycaemic research", body: "Widely referenced in metabolic and endocrine research investigating insulin secretion and blood glucose regulation." },
            { title: "Weight-management models", body: "A frequently cited compound in appetite and body-composition research protocols." },
            { title: "Extensive literature base", body: "One of the most widely studied incretin-pathway compounds currently in circulation." },
        ],
        specs: { appearance: "Lyophilised white powder", purity: "≥ 99% (HPLC)", storage: "Store lyophilised at -20°C; refrigerate after reconstitution, use within 28 days", solubility: "Bacteriostatic water", casNumber: "2023788-19-2" },
        images: [{ type: "photo", src: "images/tirzepatide.jpg", alt: "Peptalys Tirzepatide research vials", accent: "#6DD1FF" }, { type: "molecule", accent: "#2F8FFF" }],
        variants: [
            { sku: "PPT-TIRZ-10", label: "10mg", size: "10mg", retailPrice: 13.95, rrp: 18.95, wholesaleCost: 7.20, stock: 500, weightGrams: 12 },
            { sku: "PPT-TIRZ-20", label: "20mg", size: "20mg", retailPrice: 17.95, rrp: 25.95, wholesaleCost: 9.60, stock: 360, weightGrams: 12 },
            { sku: "PPT-TIRZ-30", label: "30mg", size: "30mg", retailPrice: 22.95, rrp: 32.95, wholesaleCost: 12.50, stock: 210, weightGrams: 12 },
        ],
    },
    {
        id: "bpc-157",
        slug: "bpc-157",
        sku: "PPT-BPC",
        name: "BPC-157",
        brand: "Peptalys",
        category: "recovery-repair",
        subcategory: "Gastric Pentadecapeptide",
        tag: "Popular",
        shortDescription: "A 15 amino-acid synthetic peptide, derived from a gastric-juice protective protein, widely researched for tissue repair and organ protection.",
        fullDescription: [
            "BPC-157 (Body Protection Compound 157) is a synthetic peptide consisting of a chain of 15 amino acids, derived from a protein originally identified in human gastric juice.",
            "It has been widely researched across musculoskeletal, gastrointestinal and vascular research models for its potential to support tissue repair, protect organs and modulate the body's natural healing pathways.",
            "Peptalys BPC-157 is manufactured in the UK under controlled conditions and supplied exclusively for laboratory and preclinical research.",
        ],
        researchHighlights: [
            { title: "Angiogenesis", body: "Studied for promoting new blood vessel formation, improving blood flow to injured tissue in research models." },
            { title: "Inflammation modulation", body: "Researched for its role in regulating inflammatory response pathways." },
            { title: "Cell migration", body: "Investigated for enhancing fibroblast and endothelial cell migration to injury sites." },
            { title: "Gastric protection", body: "Originally identified for gastroprotective effects on the gastrointestinal lining." },
        ],
        specs: { appearance: "Lyophilised white powder", purity: "≥ 99% (HPLC)", storage: "Store lyophilised at -20°C; refrigerate after reconstitution, use within 21 days", solubility: "Bacteriostatic water or sterile water", casNumber: "137525-51-0" },
        images: [{ type: "photo", src: "images/bpc-157.jpg", alt: "Peptalys BPC-157 research vials", accent: "#2F8FFF" }, { type: "anatomy", accent: "#2F8FFF" }],
        variants: [
            { sku: "PPT-BPC-5", label: "5mg", size: "5mg", retailPrice: 5.90, rrp: 8.95, wholesaleCost: 2.85, stock: 640, weightGrams: 10 },
            { sku: "PPT-BPC-10", label: "10mg", size: "10mg", retailPrice: 7.90, rrp: 11.95, wholesaleCost: 3.90, stock: 470, weightGrams: 10 },
        ],
    },
    {
        id: "tb-500",
        slug: "tb-500",
        sku: "PPT-TB500",
        name: "TB-500",
        brand: "Peptalys",
        category: "recovery-repair",
        subcategory: "Thymosin Beta-4 Fragment",
        tag: null,
        shortDescription: "A synthetic fragment of Thymosin Beta-4, researched for its role in cell migration, angiogenesis and soft-tissue regeneration.",
        fullDescription: [
            "TB-500 is a synthetic peptide derived from Thymosin Beta-4, a naturally occurring protein found in almost all human and animal cells, known for its role in cell repair, tissue regeneration and cytoskeletal regulation.",
            "It has been widely studied in preclinical research for its potential applications in musculoskeletal, cardiovascular, neurological and soft-tissue research settings.",
            "UK-manufactured and quality-controlled, supplied strictly for research use only.",
        ],
        researchHighlights: [
            { title: "Actin regulation", body: "TB-4 fragments bind actin, a protein central to cell structure and motility, of ongoing research interest." },
            { title: "Cell migration", body: "Studied for promoting migration of endothelial cells and keratinocytes to sites of tissue damage." },
            { title: "Angiogenesis", body: "Investigated for supporting new blood vessel growth in ischaemic and injured tissue models." },
            { title: "Reduced scar tissue formation", body: "Research models suggest a role in modulating fibrosis and collagen deposition." },
        ],
        specs: { appearance: "Lyophilised white powder", purity: "≥ 98% (HPLC)", storage: "Store lyophilised at -20°C; refrigerate after reconstitution, use within 30 days", solubility: "Bacteriostatic water", casNumber: "77591-33-4" },
        images: [{ type: "photo", src: "images/tb-500.jpg", alt: "Peptalys TB-500 research vials", accent: "#6DD1FF" }, { type: "molecule", accent: "#6DD1FF" }],
        variants: [
            { sku: "PPT-TB500-5", label: "5mg", size: "5mg", retailPrice: 8.95, rrp: 13.95, wholesaleCost: 4.35, stock: 380, weightGrams: 10 },
            { sku: "PPT-TB500-10", label: "10mg", size: "10mg", retailPrice: 14.95, rrp: 21.95, wholesaleCost: 7.10, stock: 240, weightGrams: 10 },
        ],
    },
    {
        id: "ghk-cu",
        slug: "ghk-cu",
        sku: "PPT-GHKCU",
        name: "GHK-Cu",
        brand: "Peptalys",
        category: "skin-longevity",
        subcategory: "Copper Peptide",
        tag: null,
        shortDescription: "A naturally occurring copper-binding tripeptide studied for skin regeneration, collagen synthesis and anti-inflammatory research applications.",
        fullDescription: [
            "GHK-Cu (Glycyl-L-Histidyl-L-Lysine, copper complex) is a naturally occurring tripeptide found in human plasma and saliva, first identified for its declining concentration with age.",
            "It is extensively studied in dermatological and cosmetic-adjacent research for its ability to stimulate collagen and glycosaminoglycan production, and for antioxidant and anti-inflammatory properties observed in cell-culture models.",
            "Manufactured in the UK to a high purity standard and supplied for laboratory research use only.",
        ],
        researchHighlights: [
            { title: "Skin regeneration", body: "Studied for stimulating collagen, elastin and glycosaminoglycan production in dermal fibroblast models." },
            { title: "Anti-inflammatory activity", body: "Investigated for modulating inflammatory cytokine response in cell-culture research." },
            { title: "Antioxidant behaviour", body: "Researched for chelating free copper ions and reducing oxidative tissue stress." },
            { title: "Wound-healing models", body: "A frequently referenced compound in tissue-repair and hair-follicle research literature." },
        ],
        specs: { appearance: "Lyophilised blue-tinted powder", purity: "≥ 98% (HPLC)", storage: "Store lyophilised at -20°C; refrigerate after reconstitution, use within 30 days", solubility: "Sterile or bacteriostatic water", casNumber: "49557-75-7" },
        images: [{ type: "photo", src: "images/ghk-cu.jpg", alt: "Peptalys GHK-Cu research vials", accent: "#E8C27A" }, { type: "molecule", accent: "#E8C27A" }],
        variants: [
            { sku: "PPT-GHKCU-50", label: "50mg", size: "50mg", retailPrice: 3.25, rrp: 4.95, wholesaleCost: 1.60, stock: 300, weightGrams: 10 },
            { sku: "PPT-GHKCU-100", label: "100mg", size: "100mg", retailPrice: 5.00, rrp: 7.95, wholesaleCost: 2.55, stock: 520, weightGrams: 10 },
        ],
    },
    {
        id: "mots-c",
        slug: "mots-c",
        sku: "PPT-MOTSC",
        name: "MOTS-C",
        brand: "Peptalys",
        category: "cellular-metabolic",
        subcategory: "Mitochondrial-Derived Peptide",
        tag: null,
        shortDescription: "A mitochondrial-derived peptide researched for its regulatory role in cellular metabolism, insulin sensitivity and exercise-adjacent physiology.",
        fullDescription: [
            "MOTS-C (Mitochondrial Open Reading Frame of the 12S rRNA type-C) is a naturally occurring peptide encoded within mitochondrial DNA, identified as a key regulator of cellular metabolic homeostasis.",
            "Research has focused on its role in glucose metabolism, insulin sensitivity, and its behaviour as an exercise-mimetic in skeletal muscle research models.",
            "Peptalys MOTS-C is UK-manufactured and independently purity-tested, supplied strictly for laboratory research.",
        ],
        researchHighlights: [
            { title: "Metabolic regulation", body: "Plays a role in regulating cellular metabolism, helping maintain metabolic homeostasis in research models." },
            { title: "Insulin sensitivity", body: "Studied for activating AMPK pathways linked to glucose uptake and insulin sensitivity." },
            { title: "Exercise-mimetic activity", body: "Investigated for pathways overlapping with those activated during physical exercise." },
            { title: "Cellular ageing research", body: "A compound of interest in metabolic-flexibility and longevity-adjacent research programmes." },
        ],
        specs: { appearance: "Lyophilised white powder", purity: "≥ 98% (HPLC)", storage: "Store lyophilised at -20°C; refrigerate after reconstitution, use within 30 days", solubility: "Bacteriostatic water", casNumber: "1627580-64-8" },
        images: [{ type: "photo", src: "images/mots-c.jpg", alt: "Peptalys MOTS-C research vials", accent: "#6DD1FF" }, { type: "atom", accent: "#6DD1FF" }],
        variants: [
            { sku: "PPT-MOTSC-5", label: "5mg", size: "5mg", retailPrice: 6.25, rrp: 9.50, wholesaleCost: 3.05, stock: 260, weightGrams: 10 },
            { sku: "PPT-MOTSC-10", label: "10mg", size: "10mg", retailPrice: 8.75, rrp: 13.50, wholesaleCost: 4.30, stock: 410, weightGrams: 10 },
        ],
    },
    {
        id: "nad-plus",
        slug: "nad-plus",
        sku: "PPT-NAD",
        name: "NAD+",
        brand: "Peptalys",
        category: "cellular-metabolic",
        subcategory: "Coenzyme",
        tag: null,
        shortDescription: "Nicotinamide adenine dinucleotide — a coenzyme central to cellular energy metabolism, DNA repair and sirtuin-pathway research.",
        fullDescription: [
            "NAD+ (Nicotinamide Adenine Dinucleotide) is a coenzyme found in every living cell, playing a central role in redox reactions, mitochondrial energy production, and as a substrate for sirtuins and PARP enzymes.",
            "Cellular NAD+ concentration is known to decline with age, making it a heavily studied molecule in cellular-ageing, DNA-repair and metabolic research.",
            "Supplied as a high-purity lyophilised powder, manufactured in the UK for laboratory research use only.",
        ],
        researchHighlights: [
            { title: "Mitochondrial energy metabolism", body: "A required cofactor in the electron transport chain and cellular ATP production pathways." },
            { title: "DNA repair pathways", body: "Substrate for PARP enzymes implicated in DNA damage response research." },
            { title: "Sirtuin activation", body: "Studied as a substrate for sirtuin proteins linked to cellular longevity research." },
            { title: "Cellular ageing models", body: "One of the most widely referenced molecules in metabolic-ageing research literature." },
        ],
        specs: { appearance: "Lyophilised white/off-white powder", purity: "≥ 99% (HPLC)", storage: "Store lyophilised at -20°C, protect from light; refrigerate after reconstitution", solubility: "Sterile water", casNumber: "53-84-9" },
        images: [{ type: "photo", src: "images/nad-plus.jpg", alt: "Peptalys NAD+ research vials", accent: "#2F8FFF" }, { type: "molecule", accent: "#2F8FFF" }],
        variants: [
            { sku: "PPT-NAD-500", label: "500mg", size: "500mg", retailPrice: 7.95, rrp: 12.50, wholesaleCost: 3.80, stock: 300, weightGrams: 14 },
        ],
    },
    {
        id: "ipamorelin",
        slug: "ipamorelin",
        sku: "PPT-IPAM",
        name: "Ipamorelin",
        brand: "Peptalys",
        category: "growth-hormone",
        subcategory: "GH Secretagogue",
        tag: null,
        shortDescription: "A selective growth hormone secretagogue researched for natural GH release, recovery physiology and body-composition research models.",
        fullDescription: [
            "Ipamorelin is a pentapeptide that selectively activates the ghrelin receptor in the pituitary gland, researched for its ability to stimulate a natural, pulsatile release of growth hormone (GH) in preclinical models.",
            "Distinct from earlier-generation secretagogues, Ipamorelin's selectivity for the ghrelin receptor — with minimal effect on cortisol, prolactin or ACTH in research models — has made it a favoured reference compound in GH-axis research.",
            "Manufactured and quality-tested in the UK, supplied strictly for laboratory research use.",
        ],
        researchHighlights: [
            { title: "Selective GH release", body: "Activates ghrelin receptors with high selectivity, studied for stimulating natural GH release." },
            { title: "Recovery-physiology models", body: "Investigated for muscle repair, exercise-recovery and lean-mass research applications." },
            { title: "Favourable hormonal profile", body: "Research indicates minimal off-target effects on cortisol, prolactin or ACTH compared to older secretagogues." },
            { title: "Sleep-architecture research", body: "GH-pathway activation is studied in relation to slow-wave sleep research models." },
        ],
        specs: { appearance: "Lyophilised white powder", purity: "≥ 99% (HPLC)", storage: "Store lyophilised at -20°C; refrigerate after reconstitution, use within 21 days", solubility: "Bacteriostatic water", casNumber: "170851-70-4" },
        images: [{ type: "photo", src: "images/ipamorelin.jpg", alt: "Peptalys Ipamorelin research vials", accent: "#6DD1FF" }, { type: "anatomy", accent: "#6DD1FF" }],
        variants: [
            { sku: "PPT-IPAM-5", label: "5mg", size: "5mg", retailPrice: 6.50, rrp: 9.95, wholesaleCost: 3.15, stock: 340, weightGrams: 10 },
            { sku: "PPT-IPAM-10", label: "10mg", size: "10mg", retailPrice: 9.50, rrp: 14.50, wholesaleCost: 4.65, stock: 260, weightGrams: 10 },
        ],
    },
    {
        id: "aod-9604",
        slug: "aod-9604",
        sku: "PPT-AOD",
        name: "AOD-9604",
        brand: "Peptalys",
        category: "growth-hormone",
        subcategory: "hGH Fragment",
        tag: null,
        shortDescription: "A modified fragment of human growth hormone (176-191), researched for fat metabolism and body-composition applications without affecting blood glucose or IGF-1.",
        fullDescription: [
            "AOD-9604 is a modified fragment of the human growth hormone polypeptide, corresponding to amino acids 176-191, isolated for its lipolytic activity independent of the growth-promoting region of the full GH molecule.",
            "Research has focused on its capacity to stimulate lipolysis and inhibit lipogenesis in adipose tissue models, without the blood-glucose or IGF-1 effects associated with full-length growth hormone.",
            "UK-manufactured to a controlled synthesis standard, supplied exclusively for laboratory research.",
        ],
        researchHighlights: [
            { title: "Targeted lipolysis", body: "Studied for stimulating the breakdown of stored fat in isolated adipocyte research models." },
            { title: "No IGF-1/glucose effect", body: "Research indicates the fragment does not significantly affect blood glucose or IGF-1 levels, unlike full-length GH." },
            { title: "Stubborn-fat research", body: "Investigated for particular relevance to visceral and abdominal adipose research models." },
            { title: "Well-tolerated in study models", body: "Reported to have a favourable tolerability profile in the research literature to date." },
        ],
        specs: { appearance: "Lyophilised white powder", purity: "≥ 98% (HPLC)", storage: "Store lyophilised at -20°C; refrigerate after reconstitution, use within 21 days", solubility: "Bacteriostatic water", casNumber: "221231-10-3" },
        images: [{ type: "photo", src: "images/aod-9604.jpg", alt: "Peptalys AOD-9604 research vials", accent: "#2F8FFF" }, { type: "anatomy", accent: "#2F8FFF" }],
        variants: [
            { sku: "PPT-AOD-5", label: "5mg", size: "5mg", retailPrice: 9.95, rrp: 14.95, wholesaleCost: 4.85, stock: 220, weightGrams: 10 },
            { sku: "PPT-AOD-10", label: "10mg", size: "10mg", retailPrice: 15.95, rrp: 23.95, wholesaleCost: 7.75, stock: 150, weightGrams: 10 },
        ],
    },
];
/* -------------------------------------------------------------------- */
/* Testimonials / trust signals — lab customer types, not named           */
/* individuals, to avoid implying endorsement by a real, identifiable     */
/* person.                                                                 */
/* -------------------------------------------------------------------- */
const TRUST_POINTS = [
    { icon: "flag", title: "UK Manufactured", body: "Synthesised and quality-controlled in the UK, batch-tested for purity." },
    { icon: "truck", title: "UK Wide Delivery", body: "Tracked courier, 3–5 working days nationwide — no cold storage required." },
    { icon: "users", title: "Wholesale Supply", body: "Built for research bodies, laboratories and institutional buyers." },
    { icon: "flask", title: "Research Use Only", body: "Not for human consumption. Sold exclusively for laboratory research." },
];
/* -------------------------------------------------------------------- */
/* ARCHITECTURE NOTES (kept in-repo, read by the /admin “Architecture”    */
/* tab so the roadmap travels with the code).                             */
/* -------------------------------------------------------------------- */
const ARCHITECTURE_NOTES = {
    dataSource: "PRODUCTS/CATEGORIES/SETTINGS in this file are the placeholder catalogue. In production this module is replaced by a data-access layer (e.g. a `getProducts()` call against Postgres via Prisma, or a cached read from a stockist API) with an IDENTICAL shape, so no page component needs to change.",
    fields: "Every product already carries sku, category/subcategory, brand, per-variant retail/RRP/wholesale pricing, stock, weight and spec fields — the superset requested for CSV / Excel / API import mapping.",
    images: "Product imagery: images[0] on every product is a real photograph (JPEG, published alongside this file under images/); remaining entries are procedurally illustrated (SVG) supporting graphics. Swap images[0].src for a CDN image URL once a proper photography set / stockist feed is available.",
    pricing: "wholesaleCost is never rendered on any customer-facing page — only /admin reads it — so margin stays internal.",
};
"use strict";
/* Shared helpers — no JSX, safe to keep as a plain script. */
function formatMoney(value, currencySymbol) {
    const sym = currencySymbol || SETTINGS.currencySymbol;
    const n = Number(value) || 0;
    return sym + n.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
function cx(...parts) {
    return parts.filter(Boolean).join(" ");
}
function getProductBySlug(slug) {
    return PRODUCTS.find((p) => p.slug === slug) || null;
}
function getCategoryBySlug(slug) {
    return CATEGORIES.find((c) => c.slug === slug) || null;
}
function getCategoryName(id) {
    const c = CATEGORIES.find((c) => c.id === id);
    return c ? c.shortName : id;
}
function priceRange(product) {
    const prices = product.variants.map((v) => v.retailPrice * UNIT_SIZE);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    return { min, max, single: min === max };
}
function rrpFor(product, variant) {
    return (variant ? variant.rrp : Math.max(...product.variants.map((v) => v.rrp))) * UNIT_SIZE;
}
function totalStock(product) {
    return product.variants.reduce((sum, v) => sum + v.stock, 0);
}
function availability(product) {
    const stock = totalStock(product);
    if (stock <= 0)
        return { label: "Out of stock", tone: "danger" };
    if (stock < 60)
        return { label: "Low stock", tone: "warn" };
    return { label: "In stock", tone: "ok" };
}
function debounce(fn, wait) {
    let t;
    return function (...args) {
        clearTimeout(t);
        t = setTimeout(() => fn.apply(this, args), wait);
    };
}
function slugify(str) {
    return String(str)
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
}
function relatedProducts(product, count) {
    const sameCategory = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id);
    const rest = PRODUCTS.filter((p) => p.category !== product.category && p.id !== product.id);
    return [...sameCategory, ...rest].slice(0, count || 4);
}
function generateOrderNumber() {
    const rand = Math.floor(Math.random() * 90000) + 10000;
    const date = new Date();
    const ymd = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, "0")}${String(date.getDate()).padStart(2, "0")}`;
    return `PPT-${ymd}-${rand}`;
}
function todayLong() {
    return new Date().toLocaleDateString("en-GB", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
}
"use strict";
/* Cart store — plain pub/sub backed by localStorage (per-browser, which is
   the right scope for a basket: not shared, not durable across devices,
   never read back by anything else). Wrapped in try/catch throughout since
   storage can be blocked (private windows, embedded previews). */
const CART_KEY = "peptalys_cart_v1";
function readCartFromStorage() {
    try {
        const raw = localStorage.getItem(CART_KEY);
        if (!raw)
            return [];
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed))
            return [];
        return parsed;
    }
    catch (e) {
        return [];
    }
}
function writeCartToStorage(items) {
    try {
        localStorage.setItem(CART_KEY, JSON.stringify(items));
    }
    catch (e) {
        /* ignore quota / privacy errors — state still lives in memory */
    }
}
function createStore(initial) {
    let state = initial;
    const listeners = new Set();
    return {
        getState: () => state,
        setState: (updater) => {
            state = typeof updater === "function" ? updater(state) : updater;
            listeners.forEach((l) => l(state));
        },
        subscribe: (listener) => {
            listeners.add(listener);
            return () => listeners.delete(listener);
        },
    };
}
const cartStore = createStore(readCartFromStorage());
function persistAndSet(next) {
    cartStore.setState(next);
    writeCartToStorage(next);
}
const Cart = {
    getItems: () => cartStore.getState(),
    subscribe: cartStore.subscribe,
    addItem(productId, variantSku, qty) {
        const items = cartStore.getState();
        const existing = items.find((i) => i.productId === productId && i.variantSku === variantSku);
        let next;
        if (existing) {
            next = items.map((i) => i.productId === productId && i.variantSku === variantSku ? { ...i, qty: i.qty + qty } : i);
        }
        else {
            next = [...items, { productId, variantSku, qty }];
        }
        persistAndSet(next);
    },
    setQty(productId, variantSku, qty) {
        const items = cartStore.getState();
        if (qty <= 0) {
            persistAndSet(items.filter((i) => !(i.productId === productId && i.variantSku === variantSku)));
            return;
        }
        persistAndSet(items.map((i) => (i.productId === productId && i.variantSku === variantSku ? { ...i, qty } : i)));
    },
    removeItem(productId, variantSku) {
        const items = cartStore.getState();
        persistAndSet(items.filter((i) => !(i.productId === productId && i.variantSku === variantSku)));
    },
    clear() {
        persistAndSet([]);
    },
};
/* Resolve raw cart rows against the live catalogue, dropping anything that
   no longer exists (a SKU retired from the feed, say). */
function resolveCartLines(items) {
    const lines = [];
    for (const item of items) {
        const product = PRODUCTS.find((p) => p.id === item.productId);
        if (!product)
            continue;
        const variant = product.variants.find((v) => v.sku === item.variantSku);
        if (!variant)
            continue;
        lines.push({
            productId: product.id,
            slug: product.slug,
            name: product.name,
            variantSku: variant.sku,
            variantLabel: variant.label,
            unitPrice: variant.retailPrice * UNIT_SIZE,
            qty: item.qty,
            lineTotal: Math.round(variant.retailPrice * UNIT_SIZE * item.qty * 100) / 100,
            accent: product.images[0] ? product.images[0].accent : "#2F8FFF",
            stock: variant.stock,
            unitSize: UNIT_SIZE,
        });
    }
    return lines;
}
function computeCartTotals(items) {
    const lines = resolveCartLines(items);
    const itemCount = lines.reduce((s, l) => s + l.qty, 0);
    const subtotal = Math.round(lines.reduce((s, l) => s + l.lineTotal, 0) * 100) / 100;
    const meetsMinimum = subtotal >= SETTINGS.minimumOrderValue;
    const remainingToMinimum = Math.max(0, Math.round((SETTINGS.minimumOrderValue - subtotal) * 100) / 100);
    const delivery = subtotal === 0 ? 0 : subtotal >= SETTINGS.freeDeliveryThreshold ? 0 : SETTINGS.standardDeliveryFee;
    const vat = Math.round(subtotal * SETTINGS.vatRate * 100) / 100;
    const total = Math.round((subtotal + vat + delivery) * 100) / 100;
    return { lines, itemCount, subtotal, vat, delivery, total, meetsMinimum, remainingToMinimum };
}
function useCart() {
    const items = React.useSyncExternalStore(Cart.subscribe, Cart.getItems, Cart.getItems);
    const totals = React.useMemo(() => computeCartTotals(items), [items]);
    return { items, ...totals };
}
/* ---------------------------------------------------------------------- */
/* Toast notifications — tiny pub/sub, no capability required.            */
/* ---------------------------------------------------------------------- */
const toastStore = createStore([]);
let toastId = 0;
function pushToast(message, opts) {
    const id = ++toastId;
    const toast = { id, message, tone: (opts && opts.tone) || "default" };
    toastStore.setState((list) => [...list, toast]);
    setTimeout(() => {
        toastStore.setState((list) => list.filter((t) => t.id !== id));
    }, 3200);
}
function useToasts() {
    return React.useSyncExternalStore(toastStore.subscribe, toastStore.getState, toastStore.getState);
}
"use strict";
/* ==========================================================================
   Orders — client-side order log.

   IMPORTANT / HONEST LIMITATION: this artifact runs as a static, publicly
   shareable front-end with no application server and no shared database
   attached (see ARCHITECTURE_NOTES in data.js and the /admin "Architecture"
   tab). There is nowhere durable and shared to write a real order to, and
   no server-side secret store to hold a Stripe secret key and actually
   take payment. So:

     - "Placing an order" here records it to THIS BROWSER's localStorage
       only (Orders.create) — it is not sent anywhere, not visible to other
       visitors, and not visible to Peptalys staff. It exists purely so the
       confirmation screen and the demo /admin view have something real of
       the shopper's own to show.
     - No card details are collected anywhere on this site. Checkout ends
       with an order request; in production this step calls a backend
       endpoint that creates a Stripe Checkout Session and redirects there
       — see CheckoutPage for exactly where that call belongs.

   This file is written so that swap is small: replace `Orders.create` with
   a `fetch('/api/orders', …)` call, and the rest of the checkout flow is
   unchanged.
   ========================================================================== */
const ORDERS_KEY = "peptalys_orders_v1";
function readOrders() {
    try {
        const raw = localStorage.getItem(ORDERS_KEY);
        const parsed = raw ? JSON.parse(raw) : [];
        return Array.isArray(parsed) ? parsed : [];
    }
    catch (e) {
        return [];
    }
}
function writeOrders(orders) {
    try {
        localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
    }
    catch (e) {
        /* ignore */
    }
}
const Orders = {
    list() {
        return readOrders().slice().reverse();
    },
    get(orderNumber) {
        return readOrders().find((o) => o.orderNumber === orderNumber) || null;
    },
    create(order) {
        const orders = readOrders();
        const record = {
            orderNumber: generateOrderNumber(),
            createdAt: new Date().toISOString(),
            status: "awaiting_payment",
            fulfilmentStatus: "unfulfilled",
            stripe: { sessionId: null, paymentIntentId: null },
            ...order,
        };
        orders.push(record);
        writeOrders(orders);
        return record;
    },
};
/* Illustrative sample orders shown in /admin alongside anything the current
   browser has actually placed — clearly labelled as sample data there, so
   the dashboard never claims to show real, live customer activity. */
const SAMPLE_ADMIN_ORDERS = [
    {
        orderNumber: "PPT-20260904-38821",
        createdAt: "2026-09-04T10:12:00.000Z",
        status: "paid",
        fulfilmentStatus: "dispatched",
        customer: { name: "Dr. A. Whitfield", company: "Northbridge Biosciences Ltd", email: "procurement@northbridgebio.co.uk" },
        lines: [
            { name: "Retatrutide", variantLabel: "20mg", qty: 40, unitPrice: 15.95, lineTotal: 638.0 },
            { name: "BPC-157", variantLabel: "10mg", qty: 50, unitPrice: 7.9, lineTotal: 395.0 },
        ],
        subtotal: 1033.0, vat: 206.6, delivery: 0, total: 1239.6,
    },
    {
        orderNumber: "PPT-20260908-19004",
        createdAt: "2026-09-08T14:47:00.000Z",
        status: "paid",
        fulfilmentStatus: "processing",
        customer: { name: "S. Okafor", company: "Meridian Research Group", email: "labs@meridianresearch.org" },
        lines: [
            { name: "Tirzepatide", variantLabel: "30mg", qty: 45, unitPrice: 22.95, lineTotal: 1032.75 },
        ],
        subtotal: 1032.75, vat: 206.55, delivery: 0, total: 1239.3,
    },
    {
        orderNumber: "PPT-20260910-77213",
        createdAt: "2026-09-10T09:03:00.000Z",
        status: "awaiting_payment",
        fulfilmentStatus: "unfulfilled",
        customer: { name: "Dr. L. Marsh", company: "Falcon Peptide Labs", email: "orders@falconpeptidelabs.co.uk" },
        lines: [
            { name: "GHK-Cu", variantLabel: "100mg", qty: 120, unitPrice: 5.0, lineTotal: 600.0 },
            { name: "NAD+", variantLabel: "500mg", qty: 55, unitPrice: 7.95, lineTotal: 437.25 },
        ],
        subtotal: 1037.25, vat: 207.45, delivery: 0, total: 1244.7,
    },
];
"use strict";
/* Minimal hash router — no external dependency, works from a static file
   served anywhere (no server-side route handling needed). */
function parseHash() {
    let hash = window.location.hash || "#/";
    hash = hash.slice(1); // drop '#'
    const [path, queryString] = hash.split("?");
    const query = {};
    if (queryString) {
        new URLSearchParams(queryString).forEach((value, key) => {
            query[key] = value;
        });
    }
    return { path: path || "/", query };
}
function buildHash(path, query) {
    const qs = query && Object.keys(query).length ? "?" + new URLSearchParams(query).toString() : "";
    return "#" + path + qs;
}
function navigate(path, query, opts) {
    const hash = buildHash(path, query);
    if (opts && opts.replace) {
        const url = window.location.pathname + window.location.search + hash;
        window.history.replaceState(null, "", url);
        window.dispatchEvent(new HashChangeEvent("hashchange"));
    }
    else {
        window.location.hash = hash;
    }
    if (!opts || opts.scrollTop !== false) {
        window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
    }
}
function useRoute() {
    const [route, setRoute] = React.useState(parseHash());
    React.useEffect(() => {
        const onChange = () => setRoute(parseHash());
        window.addEventListener("hashchange", onChange);
        return () => window.removeEventListener("hashchange", onChange);
    }, []);
    return route;
}
/** Matches "/product/:slug" against "/product/bpc-157" -> {slug:"bpc-157"} */
function matchPath(pattern, path) {
    const patternParts = pattern.split("/").filter(Boolean);
    const pathParts = path.split("/").filter(Boolean);
    if (patternParts.length !== pathParts.length)
        return null;
    const params = {};
    for (let i = 0; i < patternParts.length; i++) {
        const pp = patternParts[i];
        if (pp.startsWith(":")) {
            params[pp.slice(1)] = decodeURIComponent(pathParts[i]);
        }
        else if (pp !== pathParts[i]) {
            return null;
        }
    }
    return params;
}
"use strict";
/* ==========================================================================
   Shared design-system components: nav, footer, product visuals, cards,
   buttons, badges, the cart drawer, and toast host.
   ========================================================================== */
/* ---- tiny UI store (drawer / menu / search open state) ---------------- */
const uiStore = createStore({ cartOpen: false, menuOpen: false, searchOpen: false });
function useUi() {
    return React.useSyncExternalStore(uiStore.subscribe, uiStore.getState, uiStore.getState);
}
const UiActions = {
    openCart: () => uiStore.setState((s) => ({ ...s, cartOpen: true, menuOpen: false })),
    closeCart: () => uiStore.setState((s) => ({ ...s, cartOpen: false })),
    toggleMenu: () => uiStore.setState((s) => ({ ...s, menuOpen: !s.menuOpen })),
    closeMenu: () => uiStore.setState((s) => ({ ...s, menuOpen: false })),
    openSearch: () => uiStore.setState((s) => ({ ...s, searchOpen: true, menuOpen: false })),
    closeSearch: () => uiStore.setState((s) => ({ ...s, searchOpen: false })),
};
/* ---- layout primitives -------------------------------------------------- */
function Container({ className, children }) {
    return React.createElement("div", { className: cx("mx-auto w-full max-w-[1240px] px-5 sm:px-6 lg:px-8", className) }, children);
}
function Eyebrow({ children, className }) {
    return (React.createElement("p", { className: cx("font-mono text-[11px] uppercase tracking-[0.24em] text-accent2", className) }, children));
}
function SectionHeading({ eyebrow, title, body, align = "left", className }) {
    return (React.createElement("div", { className: cx(align === "center" ? "text-center mx-auto" : "text-left", "max-w-2xl", className) },
        eyebrow && React.createElement(Eyebrow, null, eyebrow),
        React.createElement("h2", { className: "mt-3 font-display text-3xl sm:text-4xl font-bold text-ink text-balance" }, title),
        body && React.createElement("p", { className: "mt-4 text-[15px] leading-relaxed text-dim" }, body)));
}
function Button({ as = "button", href, onClick, variant = "primary", size = "md", className, children, type, disabled, full }) {
    const base = "inline-flex items-center justify-center gap-2 rounded-full font-body font-semibold transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed";
    const sizes = { sm: "px-4 py-2 text-[13px]", md: "px-6 py-3 text-[14px]", lg: "px-8 py-4 text-[15px]" };
    const variants = {
        primary: "bg-gradient-to-r from-accent to-accentDeep text-white shadow-glow hover:brightness-110 hover:-translate-y-0.5",
        secondary: "bg-surface2 text-ink border border-line2 hover:border-accent2/60 hover:bg-surface3",
        ghost: "text-ink hover:text-accent2",
        outline: "border border-line2 text-ink hover:border-accent2 hover:text-accent2",
        danger: "bg-red-500/10 text-red-300 border border-red-500/30 hover:bg-red-500/20",
    };
    const classes = cx(base, sizes[size], variants[variant], full && "w-full", className);
    if (as === "a") {
        if (disabled) {
            return (React.createElement("span", { className: cx(classes, "opacity-40 cursor-not-allowed"), "aria-disabled": "true" }, children));
        }
        return (React.createElement("a", { href: href, className: classes, onClick: onClick }, children));
    }
    return (React.createElement("button", { type: type || "button", onClick: onClick, disabled: disabled, className: classes }, children));
}
function Badge({ children, tone = "default", className }) {
    const tones = {
        default: "bg-surface2 text-dim border-line2",
        accent: "bg-accent/10 text-accent2 border-accent/30",
        ok: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
        warn: "bg-amber-500/10 text-amber-300 border-amber-500/30",
        danger: "bg-red-500/10 text-red-300 border-red-500/30",
        gold: "bg-gold/10 text-gold border-gold/30",
    };
    return (React.createElement("span", { className: cx("inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em]", tones[tone], className) }, children));
}
function Price({ value, rrp, size = "md", className }) {
    const sizes = { sm: "text-base", md: "text-xl", lg: "text-3xl" };
    return (React.createElement("span", { className: cx("inline-flex items-baseline gap-2 tnum", className) },
        React.createElement("span", { className: cx("font-display font-bold text-ink", sizes[size]) }, formatMoney(value)),
        rrp && rrp > value && React.createElement("span", { className: "text-xs text-faint line-through" }, formatMoney(rrp))));
}
/* ---- product illustration (procedural SVG, stands in for photography) - */
function VialGraphic({ accent = "#2F8FFF", label = "", height = 220, className }) {
    const gid = React.useId().replace(/:/g, "");
    return (React.createElement("svg", { viewBox: "0 0 160 220", width: "100%", height: height, className: className, role: "img", "aria-label": `Illustration of a ${label} research vial` },
        React.createElement("defs", null,
            React.createElement("radialGradient", { id: `glow-${gid}`, cx: "50%", cy: "38%", r: "60%" },
                React.createElement("stop", { offset: "0%", stopColor: accent, stopOpacity: "0.5" }),
                React.createElement("stop", { offset: "100%", stopColor: accent, stopOpacity: "0" })),
            React.createElement("linearGradient", { id: `glass-${gid}`, x1: "0", y1: "0", x2: "1", y2: "1" },
                React.createElement("stop", { offset: "0%", stopColor: "#EAF2FF", stopOpacity: "0.16" }),
                React.createElement("stop", { offset: "45%", stopColor: "#EAF2FF", stopOpacity: "0.04" }),
                React.createElement("stop", { offset: "100%", stopColor: "#EAF2FF", stopOpacity: "0.1" })),
            React.createElement("linearGradient", { id: `cap-${gid}`, x1: "0", y1: "0", x2: "0", y2: "1" },
                React.createElement("stop", { offset: "0%", stopColor: "#BFD7FF" }),
                React.createElement("stop", { offset: "45%", stopColor: accent }),
                React.createElement("stop", { offset: "100%", stopColor: "#0A3D91" }))),
        React.createElement("ellipse", { cx: "80", cy: "110", rx: "70", ry: "70", fill: `url(#glow-${gid})` }),
        React.createElement("rect", { x: "46", y: "62", width: "68", height: "128", rx: "14", fill: `url(#glass-${gid})`, stroke: "rgba(234,242,255,0.35)", strokeWidth: "1.2" }),
        React.createElement("rect", { x: "49", y: "120", width: "62", height: "67", rx: "10", fill: accent, opacity: "0.14" }),
        React.createElement("rect", { x: "50", y: "132", width: "60", height: "34", rx: "4", fill: "#050B18", opacity: "0.55" }),
        React.createElement("text", { x: "80", y: "153", textAnchor: "middle", fontFamily: "IBM Plex Mono, monospace", fontSize: "11", fill: "#EAF2FF", letterSpacing: "1" }, label),
        React.createElement("rect", { x: "66", y: "42", width: "28", height: "24", rx: "3", fill: "rgba(234,242,255,0.18)", stroke: "rgba(234,242,255,0.3)", strokeWidth: "1" }),
        React.createElement("rect", { x: "58", y: "18", width: "44", height: "28", rx: "6", fill: `url(#cap-${gid})` }),
        React.createElement("rect", { x: "58", y: "18", width: "44", height: "7", rx: "3", fill: "#EAF2FF", opacity: "0.35" }),
        React.createElement("rect", { x: "53", y: "70", width: "8", height: "110", rx: "4", fill: "#EAF2FF", opacity: "0.18" })));
}
function VialGroupGraphic({ accent = "#2F8FFF", className, height = 220 }) {
    return (React.createElement("div", { className: cx("relative flex items-end justify-center gap-3", className), style: { height } },
        React.createElement("div", { className: "w-1/4 opacity-70" },
            React.createElement(VialGraphic, { accent: accent, label: "", height: height * 0.72 })),
        React.createElement("div", { className: "w-1/3" },
            React.createElement(VialGraphic, { accent: accent, label: "", height: height })),
        React.createElement("div", { className: "w-1/4 opacity-70" },
            React.createElement(VialGraphic, { accent: accent, label: "", height: height * 0.8 }))));
}
function MoleculeGraphic({ accent = "#6DD1FF", className, height = 220 }) {
    const nodes = [
        [80, 40], [130, 70], [130, 130], [80, 160], [30, 130], [30, 70],
    ];
    return (React.createElement("svg", { viewBox: "0 0 160 200", width: "100%", height: height, className: className, "aria-hidden": "true" },
        nodes.map((n, i) => {
            const next = nodes[(i + 1) % nodes.length];
            return React.createElement("line", { key: i, x1: n[0], y1: n[1], x2: next[0], y2: next[1], stroke: accent, strokeOpacity: "0.55", strokeWidth: "1.6" });
        }),
        React.createElement("line", { x1: "80", y1: "40", x2: "80", y2: "160", stroke: accent, strokeOpacity: "0.25", strokeWidth: "1.2" }),
        React.createElement("line", { x1: "30", y1: "70", x2: "130", y2: "130", stroke: accent, strokeOpacity: "0.25", strokeWidth: "1.2" }),
        React.createElement("line", { x1: "30", y1: "130", x2: "130", y2: "70", stroke: accent, strokeOpacity: "0.25", strokeWidth: "1.2" }),
        nodes.map((n, i) => (React.createElement("circle", { key: i, cx: n[0], cy: n[1], r: i % 2 === 0 ? 7 : 5, fill: "#070C18", stroke: accent, strokeWidth: "2" }))),
        React.createElement("circle", { cx: "80", cy: "100", r: "9", fill: accent, opacity: "0.85" })));
}
function AtomGraphic({ accent = "#6DD1FF", className, height = 220 }) {
    return (React.createElement("svg", { viewBox: "0 0 160 200", width: "100%", height: height, className: className, "aria-hidden": "true" },
        React.createElement("g", { transform: "translate(80 100)" },
            React.createElement("ellipse", { rx: "70", ry: "26", fill: "none", stroke: accent, strokeOpacity: "0.5", strokeWidth: "1.4" }),
            React.createElement("ellipse", { rx: "70", ry: "26", fill: "none", stroke: accent, strokeOpacity: "0.5", strokeWidth: "1.4", transform: "rotate(60)" }),
            React.createElement("ellipse", { rx: "70", ry: "26", fill: "none", stroke: accent, strokeOpacity: "0.5", strokeWidth: "1.4", transform: "rotate(120)" }),
            React.createElement("circle", { r: "10", fill: accent }),
            React.createElement("circle", { cx: "70", cy: "0", r: "4", fill: "#EAF2FF" }),
            React.createElement("circle", { cx: "-35", cy: "22", r: "4", fill: "#EAF2FF", transform: "rotate(60)" }),
            React.createElement("circle", { cx: "35", cy: "-22", r: "4", fill: "#EAF2FF", transform: "rotate(120)" }))));
}
function AnatomyGraphic({ accent = "#6DD1FF", className, height = 220 }) {
    return (React.createElement("svg", { viewBox: "0 0 160 220", width: "100%", height: height, className: className, "aria-hidden": "true" },
        React.createElement("g", { stroke: accent, strokeOpacity: "0.6", strokeWidth: "1.6", fill: "none" },
            React.createElement("circle", { cx: "80", cy: "30", r: "14" }),
            React.createElement("path", { d: "M80 44v70M56 68h48M56 68l-10 46M104 68l10 46M64 114l-8 60M96 114l8 60" })),
        React.createElement("circle", { cx: "80", cy: "90", r: "7", fill: accent, className: "animate-pulse-glow" }),
        React.createElement("circle", { cx: "80", cy: "90", r: "16", fill: "none", stroke: accent, strokeOpacity: "0.35", strokeWidth: "1" })));
}
function ProductVisual({ image, height, className }) {
    if (!image)
        return React.createElement(VialGraphic, { height: height, className: className });
    switch (image.type) {
        case "photo":
            return React.createElement("img", { src: image.src, alt: image.alt || "Peptalys research vial", loading: "lazy", style: { height: height, width: "100%" }, className: cx("rounded-xl object-contain", className) });
        case "vialGroup":
            return React.createElement(VialGroupGraphic, { accent: image.accent, height: height, className: className });
        case "molecule":
            return React.createElement(MoleculeGraphic, { accent: image.accent, height: height, className: className });
        case "atom":
            return React.createElement(AtomGraphic, { accent: image.accent, height: height, className: className });
        case "anatomy":
            return React.createElement(AnatomyGraphic, { accent: image.accent, height: height, className: className });
        default:
            return React.createElement(VialGraphic, { accent: image.accent, label: image.label, height: height, className: className });
    }
}
/* ---- product card -------------------------------------------------------*/
function ProductCard({ product, className }) {
    const range = priceRange(product);
    const avail = availability(product);
    const category = getCategoryBySlug ? CATEGORIES.find((c) => c.id === product.category) : null;
    const [busy, setBusy] = React.useState(false);
    function quickAdd(e) {
        e.preventDefault();
        e.stopPropagation();
        const variant = product.variants[0];
        Cart.addItem(product.id, variant.sku, 1);
        pushToast(`${product.name} ${variant.label} added to basket`, { tone: "ok" });
        setBusy(true);
        setTimeout(() => setBusy(false), 900);
    }
    return (React.createElement("a", { href: `#/product/${product.slug}`, className: cx("group relative flex flex-col overflow-hidden rounded-2xl panel transition-all duration-300 hover:-translate-y-1 hover:shadow-glowLg hover:border-accent/40", className) },
        React.createElement("div", { className: "relative flex items-center justify-center bg-labgrid bg-surface/60 px-6 pt-6" },
            product.tag && (React.createElement(Badge, { tone: "accent", className: "absolute left-4 top-4 z-10" }, product.tag)),
            React.createElement("button", { onClick: quickAdd, "aria-label": `Quick add ${product.name} to basket`, className: cx("absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-line2 bg-surface/90 text-ink opacity-0 transition-all group-hover:opacity-100 hover:border-accent2 hover:text-accent2", busy && "opacity-100 border-emerald-400 text-emerald-300") },
                React.createElement(Icon, { name: busy ? "check" : "plus", className: "h-4 w-4" })),
            React.createElement(ProductVisual, { image: product.images[0], height: 180 })),
        React.createElement("div", { className: "flex flex-1 flex-col gap-2 p-5" },
            React.createElement("p", { className: "font-mono text-[10px] uppercase tracking-[0.16em] text-faint" }, category ? category.shortName : ""),
            React.createElement("h3", { className: "font-display text-lg font-semibold text-ink" }, product.name),
            React.createElement("p", { className: "clamp-2 text-[13px] leading-relaxed text-dim" }, product.shortDescription),
            React.createElement("div", { className: "mt-auto flex items-center justify-between pt-3" },
                React.createElement("div", null,
                    React.createElement("span", { className: "text-[11px] text-faint" }, range.single ? "" : "From "),
                    React.createElement(Price, { value: range.min, size: "sm" }),
                    React.createElement("p", { className: "mt-0.5 text-[10.5px] text-faint" }, "per unit · 10 vials")),
                React.createElement(Badge, { tone: avail.tone === "ok" ? "ok" : avail.tone === "warn" ? "warn" : "danger" }, avail.label)))));
}
/* ---- quantity stepper ---------------------------------------------------*/
function QuantityStepper({ value, onChange, min = 1, max = 999, size = "md" }) {
    const h = size === "sm" ? "h-9" : "h-11";
    return (React.createElement("div", { className: cx("inline-flex items-center rounded-full border border-line2 bg-surface2", h) },
        React.createElement("button", { type: "button", "aria-label": "Decrease quantity", onClick: () => onChange(Math.max(min, value - 1)), className: "flex h-full w-9 items-center justify-center text-dim hover:text-accent2 disabled:opacity-30", disabled: value <= min },
            React.createElement(Icon, { name: "minus", className: "h-3.5 w-3.5" })),
        React.createElement("input", { "aria-label": "Quantity", type: "number", value: value, min: min, max: max, onChange: (e) => {
                const v = parseInt(e.target.value, 10);
                onChange(Number.isFinite(v) ? Math.min(max, Math.max(min, v)) : min);
            }, className: "w-10 bg-transparent text-center font-mono text-sm text-ink outline-none" }),
        React.createElement("button", { type: "button", "aria-label": "Increase quantity", onClick: () => onChange(Math.min(max, value + 1)), className: "flex h-full w-9 items-center justify-center text-dim hover:text-accent2 disabled:opacity-30", disabled: value >= max },
            React.createElement(Icon, { name: "plus", className: "h-3.5 w-3.5" }))));
}
/* ---- trust strip ---------------------------------------------------------*/
function TrustStrip({ className }) {
    return (React.createElement("div", { className: cx("grid grid-cols-2 gap-4 sm:grid-cols-4", className) }, TRUST_POINTS.map((t) => (React.createElement("div", { key: t.title, className: "flex flex-col items-start gap-2 rounded-xl border border-line bg-surface/50 p-4" },
        React.createElement(Icon, { name: t.icon, className: "h-5 w-5 text-accent2" }),
        React.createElement("p", { className: "font-display text-sm font-semibold text-ink" }, t.title),
        React.createElement("p", { className: "text-[12px] leading-snug text-dim" }, t.body))))));
}
/* ---- breadcrumbs ----------------------------------------------------------*/
function Breadcrumbs({ items }) {
    return (React.createElement("nav", { "aria-label": "Breadcrumb", className: "flex flex-wrap items-center gap-1.5 text-[12px] text-faint" }, items.map((item, i) => (React.createElement(React.Fragment, { key: i },
        i > 0 && React.createElement(Icon, { name: "chevronRight", className: "h-3 w-3" }),
        item.href ? (React.createElement("a", { href: item.href, className: "hover:text-accent2" }, item.label)) : (React.createElement("span", { className: "text-dim" }, item.label)))))));
}
/* ---- empty state -----------------------------------------------------------*/
function EmptyState({ icon = "cart", title, body, action }) {
    return (React.createElement("div", { className: "flex flex-col items-center justify-center rounded-2xl border border-dashed border-line2 px-6 py-16 text-center" },
        React.createElement("div", { className: "mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-surface2 text-accent2" },
            React.createElement(Icon, { name: icon, className: "h-6 w-6" })),
        React.createElement("h3", { className: "font-display text-lg font-semibold text-ink" }, title),
        body && React.createElement("p", { className: "mt-2 max-w-sm text-sm text-dim" }, body),
        action && React.createElement("div", { className: "mt-5" }, action)));
}
/* ---- navbar ---------------------------------------------------------------*/
const NAV_LINKS = [
    { label: "Shop", href: "#/shop" },
    { label: "About", href: "#/about" },
    { label: "Delivery", href: "#/delivery" },
    { label: "Contact", href: "#/contact" },
];
function Navbar() {
    const { itemCount } = useCart();
    const ui = useUi();
    const [scrolled, setScrolled] = React.useState(false);
    const [query, setQuery] = React.useState("");
    React.useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8);
        onScroll();
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);
    function submitSearch(e) {
        e.preventDefault();
        navigate("/shop", query ? { q: query } : {});
        UiActions.closeSearch();
        UiActions.closeMenu();
    }
    return (React.createElement("header", { className: cx("sticky top-0 z-40 transition-all duration-300", scrolled ? "bg-bg/85 backdrop-blur-md border-b border-line" : "bg-transparent border-b border-transparent") },
        React.createElement("a", { href: "#main", className: "skip-link rounded-md bg-accent px-4 py-2 text-sm font-semibold text-white" }, "Skip to content"),
        React.createElement(Container, { className: "flex h-16 items-center justify-between gap-4 sm:h-20" },
            React.createElement("a", { href: "#/", className: "flex items-center gap-2.5 shrink-0", onClick: UiActions.closeMenu },
                React.createElement("img", { src: "peptalys-logo.png", alt: "Peptalys", className: "h-8 w-auto sm:h-9" }),
                React.createElement("span", { className: "font-display text-lg sm:text-xl font-bold tracking-tight text-ink" }, "Peptalys")),
            React.createElement("nav", { className: "hidden items-center gap-8 lg:flex" }, NAV_LINKS.map((l) => (React.createElement("a", { key: l.href, href: l.href, className: "font-body text-[14px] font-medium text-dim transition-colors hover:text-ink" }, l.label)))),
            React.createElement("div", { className: "flex items-center gap-1.5 sm:gap-2" },
                React.createElement("form", { onSubmit: submitSearch, className: "relative hidden md:block" },
                    React.createElement(Icon, { name: "search", className: "pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" }),
                    React.createElement("input", { value: query, onChange: (e) => setQuery(e.target.value), placeholder: "Search peptides\u2026", "aria-label": "Search products", className: "w-48 rounded-full border border-line2 bg-surface2 py-2.5 pl-10 pr-4 text-[13px] text-ink placeholder:text-faint outline-none transition-all focus:w-64 focus:border-accent2" })),
                React.createElement("button", { "aria-label": "Search", onClick: UiActions.openSearch, className: "flex h-10 w-10 items-center justify-center rounded-full text-dim hover:bg-surface2 hover:text-ink md:hidden" },
                    React.createElement(Icon, { name: "search", className: "h-5 w-5" })),
                React.createElement("a", { href: "#/admin", className: "hidden h-10 items-center rounded-full px-3 text-dim hover:bg-surface2 hover:text-ink lg:flex", "aria-label": "Admin", title: "Admin" },
                    React.createElement(Icon, { name: "user", className: "h-5 w-5" })),
                React.createElement("button", { onClick: UiActions.openCart, "aria-label": `Open basket, ${itemCount} item${itemCount === 1 ? "" : "s"}`, className: "relative flex h-10 w-10 items-center justify-center rounded-full text-ink hover:bg-surface2" },
                    React.createElement(Icon, { name: "cart", className: "h-5 w-5" }),
                    itemCount > 0 && (React.createElement("span", { className: "absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-accent px-1 font-mono text-[10px] font-bold text-white" }, itemCount))),
                React.createElement("button", { onClick: UiActions.toggleMenu, "aria-label": "Toggle menu", "aria-expanded": ui.menuOpen, className: "flex h-10 w-10 items-center justify-center rounded-full text-ink hover:bg-surface2 lg:hidden" },
                    React.createElement(Icon, { name: ui.menuOpen ? "close" : "menu", className: "h-5 w-5" })))),
        ui.menuOpen && (React.createElement("div", { className: "border-t border-line bg-bg/98 backdrop-blur-md lg:hidden" },
            React.createElement(Container, { className: "flex flex-col gap-1 py-4" },
                React.createElement("form", { onSubmit: submitSearch, className: "relative mb-2" },
                    React.createElement(Icon, { name: "search", className: "pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" }),
                    React.createElement("input", { value: query, onChange: (e) => setQuery(e.target.value), placeholder: "Search peptides\u2026", "aria-label": "Search products", className: "w-full rounded-full border border-line2 bg-surface2 py-2.5 pl-10 pr-4 text-[13px] text-ink placeholder:text-faint outline-none" })),
                NAV_LINKS.map((l) => (React.createElement("a", { key: l.href, href: l.href, onClick: UiActions.closeMenu, className: "rounded-lg px-3 py-3 text-[15px] font-medium text-ink hover:bg-surface2" }, l.label))),
                React.createElement("a", { href: "#/returns", onClick: UiActions.closeMenu, className: "rounded-lg px-3 py-3 text-[15px] font-medium text-dim hover:bg-surface2" }, "Returns"),
                React.createElement("a", { href: "#/legal", onClick: UiActions.closeMenu, className: "rounded-lg px-3 py-3 text-[15px] font-medium text-dim hover:bg-surface2" }, "Research Use Policy"),
                React.createElement("a", { href: "#/admin", onClick: UiActions.closeMenu, className: "rounded-lg px-3 py-3 text-[15px] font-medium text-dim hover:bg-surface2" }, "Admin"))))));
}
/* ---- cart drawer ------------------------------------------------------------*/
function CartDrawer() {
    const ui = useUi();
    const cart = useCart();
    const open = ui.cartOpen;
    React.useEffect(() => {
        function onKey(e) {
            if (e.key === "Escape")
                UiActions.closeCart();
        }
        if (open)
            document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [open]);
    return (React.createElement("div", { className: cx("fixed inset-0 z-50", open ? "pointer-events-auto" : "pointer-events-none"), "aria-hidden": !open },
        React.createElement("div", { onClick: UiActions.closeCart, className: cx("absolute inset-0 bg-[#020408]/70 backdrop-blur-sm transition-opacity duration-300", open ? "opacity-100" : "opacity-0") }),
        React.createElement("aside", { role: "dialog", "aria-label": "Shopping basket", className: cx("absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-surface shadow-glowLg transition-transform duration-300 ease-out", open ? "translate-x-0" : "translate-x-full") },
            React.createElement("div", { className: "flex items-center justify-between border-b border-line px-5 py-4" },
                React.createElement("h2", { className: "font-display text-lg font-semibold text-ink" },
                    "Your Basket (",
                    cart.itemCount,
                    ")"),
                React.createElement("button", { onClick: UiActions.closeCart, "aria-label": "Close basket", className: "flex h-9 w-9 items-center justify-center rounded-full text-dim hover:bg-surface2 hover:text-ink" },
                    React.createElement(Icon, { name: "close", className: "h-5 w-5" }))),
            cart.lines.length === 0 ? (React.createElement("div", { className: "flex flex-1 items-center p-6" },
                React.createElement(EmptyState, { icon: "cart", title: "Your basket is empty", body: "Browse the catalogue to add research peptides to your wholesale order.", action: React.createElement(Button, { as: "a", href: "#/shop", onClick: UiActions.closeCart }, "Browse the shop") }))) : (React.createElement(React.Fragment, null,
                React.createElement("div", { className: "flex-1 overflow-y-auto px-5 py-4" },
                    React.createElement("div", { className: "mb-4 rounded-xl border border-line bg-surface2/60 p-3.5" },
                        React.createElement("div", { className: "flex items-center justify-between text-[12px] text-dim" },
                            React.createElement("span", null, "Wholesale minimum"),
                            React.createElement("span", { className: "font-mono tnum text-ink" },
                                formatMoney(cart.subtotal),
                                " / ",
                                formatMoney(SETTINGS.minimumOrderValue))),
                        React.createElement("div", { className: "mt-2 h-1.5 w-full overflow-hidden rounded-full bg-surface3" },
                            React.createElement("div", { className: cx("h-full rounded-full transition-all duration-500", cart.meetsMinimum ? "bg-emerald-400" : "bg-gradient-to-r from-accent to-accent2"), style: { width: `${Math.min(100, (cart.subtotal / SETTINGS.minimumOrderValue) * 100)}%` } })),
                        !cart.meetsMinimum && (React.createElement("p", { className: "mt-2 text-[12px] text-dim" },
                            "Add ",
                            formatMoney(cart.remainingToMinimum),
                            " more to reach the wholesale minimum order."))),
                    React.createElement("ul", { className: "flex flex-col gap-4" }, cart.lines.map((line) => (React.createElement("li", { key: line.productId + line.variantSku, className: "flex gap-3" },
                        React.createElement("a", { href: `#/product/${line.slug}`, onClick: UiActions.closeCart, className: "h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-line bg-surface2" },
                            React.createElement(ProductVisual, { image: { type: "vial", accent: line.accent, label: "" }, height: 64 })),
                        React.createElement("div", { className: "flex flex-1 flex-col" },
                            React.createElement("div", { className: "flex items-start justify-between gap-2" },
                                React.createElement("div", null,
                                    React.createElement("a", { href: `#/product/${line.slug}`, onClick: UiActions.closeCart, className: "font-body text-[13.5px] font-semibold text-ink hover:text-accent2" }, line.name),
                                    React.createElement("p", { className: "font-mono text-[11px] text-faint" }, line.variantLabel, " · unit of 10 vials")),
                                React.createElement("button", { onClick: () => Cart.removeItem(line.productId, line.variantSku), "aria-label": `Remove ${line.name}`, className: "text-faint hover:text-red-300" },
                                    React.createElement(Icon, { name: "trash", className: "h-4 w-4" }))),
                            React.createElement("div", { className: "mt-2 flex items-center justify-between" },
                                React.createElement(QuantityStepper, { size: "sm", value: line.qty, onChange: (q) => Cart.setQty(line.productId, line.variantSku, q), max: Math.max(Math.floor(line.stock / UNIT_SIZE), 0) }),
                                React.createElement(Price, { value: line.lineTotal, size: "sm" })))))))),
                React.createElement("div", { className: "border-t border-line px-5 py-4" },
                    React.createElement("div", { className: "flex flex-col gap-1.5 text-[13px] text-dim" },
                        React.createElement("div", { className: "flex justify-between" },
                            React.createElement("span", null, "Subtotal"),
                            React.createElement("span", { className: "tnum text-ink" }, formatMoney(cart.subtotal))),
                        React.createElement("div", { className: "flex justify-between" },
                            React.createElement("span", null, "VAT (20%)"),
                            React.createElement("span", { className: "tnum text-ink" }, formatMoney(cart.vat))),
                        React.createElement("div", { className: "flex justify-between" },
                            React.createElement("span", null, "Delivery"),
                            React.createElement("span", { className: "tnum text-ink" }, cart.delivery === 0 ? "Free" : formatMoney(cart.delivery)))),
                    React.createElement("div", { className: "mt-3 flex justify-between border-t border-line pt-3" },
                        React.createElement("span", { className: "font-display font-semibold text-ink" }, "Total"),
                        React.createElement("span", { className: "font-display text-lg font-bold tnum text-ink" }, formatMoney(cart.total))),
                    React.createElement(Button, { as: "a", href: "#/checkout", onClick: UiActions.closeCart, full: true, size: "lg", className: "mt-4" },
                        "Checkout ",
                        React.createElement(Icon, { name: "arrowRight", className: "h-4 w-4" })),
                    React.createElement(Button, { as: "a", href: "#/cart", onClick: UiActions.closeCart, full: true, variant: "ghost", size: "sm", className: "mt-1.5" }, "View full basket")))))));
}
/* ---- toast host --------------------------------------------------------------*/
function ToastHost() {
    const toasts = useToasts();
    return (React.createElement("div", { id: "toast-root", className: "fixed inset-x-0 bottom-0 z-[60] flex flex-col items-center gap-2 p-4 sm:items-end sm:right-4 sm:left-auto" }, toasts.map((t) => (React.createElement("div", { key: t.id, role: "status", className: cx("animate-fade-up flex items-center gap-2 rounded-full border px-4 py-2.5 text-[13px] font-medium shadow-glow backdrop-blur-md", t.tone === "ok" ? "border-emerald-500/40 bg-emerald-950/80 text-emerald-200" : "border-line2 bg-surface/90 text-ink") },
        t.tone === "ok" && React.createElement(Icon, { name: "check", className: "h-4 w-4" }),
        t.message)))));
}
/* ---- footer -------------------------------------------------------------------*/
function Footer() {
    const [email, setEmail] = React.useState("");
    function submitEnquiry(e) {
        e.preventDefault();
        pushToast("Thanks — our wholesale team will be in touch shortly.", { tone: "ok" });
        setEmail("");
    }
    return (React.createElement("footer", { className: "mt-24 border-t border-line bg-surface/40" },
        React.createElement(Container, { className: "py-14" },
            React.createElement(TrustStrip, null),
            React.createElement("div", { className: "mt-14 grid grid-cols-2 gap-10 sm:grid-cols-2 lg:grid-cols-5" },
                React.createElement("div", { className: "col-span-2" },
                    React.createElement("a", { href: "#/", className: "flex items-center gap-2.5" },
                        React.createElement("img", { src: "peptalys-logo.png", alt: "Peptalys", className: "h-8 w-auto" }),
                        React.createElement("span", { className: "font-display text-lg font-bold text-ink" }, "Peptalys")),
                    React.createElement("p", { className: "mt-3 max-w-xs text-[13px] leading-relaxed text-dim" },
                        BRAND.strapline,
                        " Wholesale-only supply of UK-manufactured research peptides for laboratories and research institutions."),
                    React.createElement("form", { onSubmit: submitEnquiry, className: "mt-5 flex max-w-sm gap-2" },
                        React.createElement("input", { required: true, type: "email", value: email, onChange: (e) => setEmail(e.target.value), placeholder: "Institutional email", "aria-label": "Email address for wholesale price list", className: "w-full rounded-full border border-line2 bg-surface2 px-4 py-2.5 text-[13px] text-ink placeholder:text-faint outline-none focus:border-accent2" }),
                        React.createElement(Button, { type: "submit", size: "sm", className: "shrink-0" }, "Get price list"))),
                React.createElement("div", null,
                    React.createElement("h4", { className: "font-display text-sm font-semibold text-ink" }, "Shop"),
                    React.createElement("ul", { className: "mt-4 flex flex-col gap-2.5 text-[13px] text-dim" },
                        React.createElement("li", null,
                            React.createElement("a", { href: "#/shop", className: "hover:text-accent2" }, "All peptides")),
                        CATEGORIES.map((c) => (React.createElement("li", { key: c.id },
                            React.createElement("a", { href: `#/shop?category=${c.slug}`, className: "hover:text-accent2" }, c.shortName)))))),
                React.createElement("div", null,
                    React.createElement("h4", { className: "font-display text-sm font-semibold text-ink" }, "Company"),
                    React.createElement("ul", { className: "mt-4 flex flex-col gap-2.5 text-[13px] text-dim" },
                        React.createElement("li", null,
                            React.createElement("a", { href: "#/about", className: "hover:text-accent2" }, "About Peptalys")),
                        React.createElement("li", null,
                            React.createElement("a", { href: "#/contact", className: "hover:text-accent2" }, "Contact")),
                        React.createElement("li", null,
                            React.createElement("a", { href: "#/delivery", className: "hover:text-accent2" }, "Delivery information")),
                        React.createElement("li", null,
                            React.createElement("a", { href: "#/returns", className: "hover:text-accent2" }, "Returns policy")),
                        React.createElement("li", null,
                            React.createElement("a", { href: "#/admin", className: "hover:text-accent2" }, "Admin")))),
                React.createElement("div", null,
                    React.createElement("h4", { className: "font-display text-sm font-semibold text-ink" }, "Legal"),
                    React.createElement("ul", { className: "mt-4 flex flex-col gap-2.5 text-[13px] text-dim" },
                        React.createElement("li", null,
                            React.createElement("a", { href: "#/legal", className: "hover:text-accent2" }, "Research use policy")),
                        React.createElement("li", null,
                            React.createElement("a", { href: "#/legal", className: "hover:text-accent2" }, "Terms of wholesale supply")),
                        React.createElement("li", null,
                            React.createElement("a", { href: "#/legal", className: "hover:text-accent2" }, "Privacy policy"))))),
            React.createElement("div", { className: "mt-12 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between" },
                React.createElement("p", { className: "font-mono text-[11px] text-faint" },
                    "\u00A9 ",
                    new Date().getFullYear(),
                    " ",
                    BRAND.legalName,
                    ". Company No. ",
                    BRAND.companyNumber,
                    ". Registered in England & Wales."),
                React.createElement("p", { className: "max-w-xl text-[11px] leading-relaxed text-faint" }, "All products are sold strictly for laboratory and in-vitro research use only. Not for human or veterinary use, diagnostic use, or consumption. By purchasing you confirm you are a qualified researcher or institution procuring on behalf of one.")))));
}
"use strict";
function HomePage() {
    const featured = PRODUCTS.slice(0, 4);
    const spotlight = getProductBySlug("bpc-157");
    const heroFeatured = getProductBySlug("retatrutide");
    return (React.createElement(React.Fragment, null,
        React.createElement("section", { className: "relative overflow-hidden bg-labgrid" },
            React.createElement("div", { className: "pointer-events-none absolute -left-10 top-0 hidden h-full w-32 md:block" },
                React.createElement(DnaStrand, { className: "h-full w-full animate-drift", opacity: 0.45 })),
            React.createElement("div", { className: "pointer-events-none absolute -right-6 top-10 hidden h-full w-28 lg:block" },
                React.createElement(DnaStrand, { className: "h-full w-full animate-drift", opacity: 0.3 })),
            React.createElement("div", { className: "pointer-events-none absolute inset-x-0 top-0 h-[560px] bg-gradient-to-b from-accentDeep/20 via-transparent to-transparent" }),
            React.createElement(Container, { className: "relative grid grid-cols-1 items-center gap-12 py-16 sm:py-20 lg:grid-cols-2 lg:py-28" },
                React.createElement("div", { className: "animate-fade-up" },
                    React.createElement(Badge, { tone: "accent" },
                        React.createElement(Icon, { name: "flask", className: "h-3 w-3" }),
                        " Research Peptides \u00B7 UK Manufactured"),
                    React.createElement("h1", { className: "mt-5 font-display text-4xl font-extrabold leading-[1.05] text-ink sm:text-5xl lg:text-6xl text-balance" },
                        "Research peptides ",
                        React.createElement("span", { className: "text-gradient" }, "for a healthier tomorrow.")),
                    React.createElement("p", { className: "mt-6 max-w-lg text-[16px] leading-relaxed text-dim" }, "Peptalys is a UK wholesale supplier of high-purity research peptides \u2014 synthesised, batch-tested and delivered within 3\u20135 working days to laboratories and research institutions nationwide."),
                    React.createElement("div", { className: "mt-8 flex flex-wrap items-center gap-3" },
                        React.createElement(Button, { as: "a", href: "#/shop", size: "lg" },
                            "Shop the catalogue ",
                            React.createElement(Icon, { name: "arrowRight", className: "h-4 w-4" })),
                        React.createElement(Button, { as: "a", href: "#/contact", variant: "secondary", size: "lg" }, "Request price list")),
                    React.createElement("dl", { className: "mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-line pt-6" }, [
                        ["≥98%", "Purity, HPLC-verified"],
                        ["24hr", "UK dispatch window"],
                        ["9+", "Research compounds"],
                    ].map(([n, l]) => (React.createElement("div", { key: l },
                        React.createElement("dt", { className: "font-display text-2xl font-bold text-ink tnum" }, n),
                        React.createElement("dd", { className: "mt-1 text-[11px] leading-snug text-faint" }, l)))))),
                React.createElement("div", { className: "relative animate-fade-up", style: { animationDelay: "120ms" } },
                    React.createElement("div", { className: "absolute inset-0 rounded-[2rem] bg-gradient-to-br from-accent/20 via-transparent to-accent2/10 blur-2xl" }),
                    React.createElement("div", { className: "relative rounded-[2rem] panel p-8 sm:p-10" },
                        React.createElement("p", { className: "font-mono text-[11px] uppercase tracking-[0.2em] text-accent2" }, "Featured Compound"),
                        React.createElement("div", { className: "mt-4" },
                            React.createElement(ProductVisual, { image: heroFeatured.images[0], height: 260 })),
                        React.createElement("div", { className: "mt-4 flex items-end justify-between" },
                            React.createElement("div", null,
                                React.createElement("h3", { className: "font-display text-xl font-bold text-ink" }, heroFeatured.name),
                                React.createElement("p", { className: "text-[12px] text-dim" }, "Triple-agonist \u00B7 GLP-1 / GIP / Glucagon")),
                            React.createElement(Price, { value: priceRange(heroFeatured).min, size: "md" }))))),
            React.createElement("div", { className: "relative border-y border-line bg-surface/40 py-4" },
                React.createElement("div", { className: "flex overflow-hidden" },
                    React.createElement("div", { className: "flex shrink-0 animate-marquee items-center gap-16 pr-16" }, [...Array(2)].flatMap(() => TRUST_POINTS.map((t) => (React.createElement("span", { key: t.title + Math.random(), className: "flex shrink-0 items-center gap-2.5 font-mono text-[12px] uppercase tracking-[0.14em] text-faint" },
                        React.createElement(Icon, { name: t.icon, className: "h-4 w-4 text-accent2" }),
                        " ",
                        t.title))))),
                    React.createElement("div", { className: "flex shrink-0 animate-marquee items-center gap-16 pr-16", "aria-hidden": "true" }, [...Array(2)].flatMap(() => TRUST_POINTS.map((t) => (React.createElement("span", { key: "dup-" + t.title + Math.random(), className: "flex shrink-0 items-center gap-2.5 font-mono text-[12px] uppercase tracking-[0.14em] text-faint" },
                        React.createElement(Icon, { name: t.icon, className: "h-4 w-4 text-accent2" }),
                        " ",
                        t.title)))))))),
        React.createElement("section", { className: "py-20 sm:py-28" },
            React.createElement(Container, { className: "grid grid-cols-1 items-center gap-14 lg:grid-cols-2" },
                React.createElement("div", { className: "order-2 lg:order-1" },
                    React.createElement(Eyebrow, null, "Quality \u00B7 Supply \u00B7 Progress"),
                    React.createElement("h2", { className: "mt-3 font-display text-3xl font-bold text-ink sm:text-4xl text-balance" }, "Built by researchers, for research programmes."),
                    React.createElement("p", { className: "mt-5 text-[15px] leading-relaxed text-dim" }, "Peptalys exists to close the gap between promising peptide science and the labs trying to study it \u2014 supplying independently purity-tested compounds at wholesale volumes, without the friction that slows research procurement down."),
                    React.createElement("p", { className: "mt-4 text-[15px] leading-relaxed text-dim" }, "Every batch is synthesised in the UK, verified by HPLC to a minimum 98% purity, and shipped in secure, tamper-evident packaging \u2014 our peptides are lyophilised and shelf-stable at ambient temperature, so no cold storage or refrigerated courier is required. Delivery is 3\u20135 working days nationwide."),
                    React.createElement(Button, { as: "a", href: "#/about", variant: "outline", className: "mt-7" },
                        "Our story ",
                        React.createElement(Icon, { name: "arrowRight", className: "h-4 w-4" }))),
                React.createElement("div", { className: "order-1 lg:order-2" },
                    React.createElement("div", { className: "relative rounded-[2rem] panel p-8" },
                        React.createElement("div", { className: "grid grid-cols-2 gap-4" }, [
                            { icon: "microscope", label: "In-house synthesis" },
                            { icon: "shieldCheck", label: "Batch QC & HPLC" },
                            { icon: "package", label: "Secure ambient packaging" },
                            { icon: "truck", label: "3–5 day delivery" },
                        ].map((s) => (React.createElement("div", { key: s.label, className: "flex flex-col gap-3 rounded-xl border border-line bg-surface2/50 p-5" },
                            React.createElement(Icon, { name: s.icon, className: "h-6 w-6 text-accent2" }),
                            React.createElement("p", { className: "font-body text-[13px] font-medium text-ink" }, s.label))))))))),
        React.createElement("section", { className: "py-4 sm:py-8" },
            React.createElement(Container, null,
                React.createElement(SectionHeading, { eyebrow: "Discover", title: "Shop by research focus", body: "Nine reference compounds across five active research areas \u2014 every listing includes full specification and research literature summaries." }),
                React.createElement("div", { className: "mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5" }, CATEGORIES.map((c) => (React.createElement("a", { key: c.id, href: `#/shop?category=${c.slug}`, className: "group flex flex-col justify-between gap-6 rounded-2xl panel p-6 transition-all hover:-translate-y-1 hover:border-accent/40 hover:shadow-glow" },
                    React.createElement(Icon, { name: c.icon, className: "h-7 w-7 text-accent2" }),
                    React.createElement("div", null,
                        React.createElement("h3", { className: "font-display text-[15px] font-semibold leading-snug text-ink" }, c.shortName),
                        React.createElement("p", { className: "mt-2 text-[12px] leading-relaxed text-dim clamp-3" }, c.description)),
                    React.createElement("span", { className: "flex items-center gap-1 font-mono text-[11px] uppercase tracking-[0.1em] text-accent2 opacity-0 transition-opacity group-hover:opacity-100" },
                        "Explore ",
                        React.createElement(Icon, { name: "arrowRight", className: "h-3 w-3" })))))))),
        React.createElement("section", { className: "py-20 sm:py-28" },
            React.createElement(Container, null,
                React.createElement("div", { className: "flex flex-wrap items-end justify-between gap-4" },
                    React.createElement(SectionHeading, { eyebrow: "Catalogue", title: "Featured research compounds" }),
                    React.createElement(Button, { as: "a", href: "#/shop", variant: "ghost" },
                        "View all peptides ",
                        React.createElement(Icon, { name: "arrowRight", className: "h-4 w-4" }))),
                React.createElement("div", { className: "mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4" }, featured.map((p) => React.createElement(ProductCard, { key: p.id, product: p }))))),
        spotlight && (React.createElement("section", { className: "py-4 sm:py-8" },
            React.createElement(Container, null,
                React.createElement("div", { className: "grid grid-cols-1 items-center gap-0 overflow-hidden rounded-[2rem] panel lg:grid-cols-2" },
                    React.createElement("div", { className: "relative flex items-center justify-center bg-labgrid p-12" },
                        React.createElement(ProductVisual, { image: spotlight.images[0], height: 300 })),
                    React.createElement("div", { className: "p-8 sm:p-12" },
                        React.createElement(Eyebrow, null, "Research Spotlight"),
                        React.createElement("h2", { className: "mt-3 font-display text-3xl font-bold text-ink text-balance" }, spotlight.name),
                        React.createElement("p", { className: "mt-4 text-[15px] leading-relaxed text-dim" }, spotlight.shortDescription),
                        React.createElement("ul", { className: "mt-6 flex flex-col gap-3" }, spotlight.researchHighlights.slice(0, 3).map((h) => (React.createElement("li", { key: h.title, className: "flex gap-3" },
                            React.createElement(Icon, { name: "check", className: "mt-0.5 h-4 w-4 shrink-0 text-accent2" }),
                            React.createElement("div", null,
                                React.createElement("p", { className: "text-[13.5px] font-semibold text-ink" }, h.title),
                                React.createElement("p", { className: "text-[13px] leading-relaxed text-dim" }, h.body)))))),
                        React.createElement("div", { className: "mt-7 flex flex-wrap items-center gap-4" },
                            React.createElement(Price, { value: priceRange(spotlight).min, rrp: rrpFor(spotlight), size: "lg" }),
                            React.createElement(Button, { as: "a", href: `#/product/${spotlight.slug}` },
                                "View compound ",
                                React.createElement(Icon, { name: "arrowRight", className: "h-4 w-4" })))))))),
        React.createElement("section", { className: "py-20 sm:py-28" },
            React.createElement(Container, null,
                React.createElement(SectionHeading, { align: "center", eyebrow: "How it works", title: "Wholesale ordering, simplified", className: "mx-auto", body: "Peptalys supplies at wholesale volume only \u2014 built around a straightforward three-step process." }),
                React.createElement("div", { className: "mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3" }, [
                    { n: "01", icon: "cart", title: "Build your order", body: "Browse the catalogue and add compounds to your basket. Bulk pricing applies automatically at variant level." },
                    { n: "02", icon: "scale", title: "Meet the minimum", body: `A ${formatMoney(SETTINGS.minimumOrderValue)} minimum order value applies across the whole basket — mix and match compounds freely.` },
                    { n: "03", icon: "truck", title: "Fast dispatch", body: "Confirm your order details and our team issues a secure payment link, then dispatches promptly — arriving within 3–5 working days." },
                ].map((s) => (React.createElement("div", { key: s.n, className: "relative rounded-2xl border border-line bg-surface/40 p-7" },
                    React.createElement("span", { className: "font-mono text-4xl font-bold text-surface3" }, s.n),
                    React.createElement(Icon, { name: s.icon, className: "mt-2 h-6 w-6 text-accent2" }),
                    React.createElement("h3", { className: "mt-4 font-display text-lg font-semibold text-ink" }, s.title),
                    React.createElement("p", { className: "mt-2 text-[13.5px] leading-relaxed text-dim" }, s.body))))))),
        React.createElement("section", { className: "pb-20 sm:pb-28" },
            React.createElement(Container, null,
                React.createElement("div", { className: "relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-accentDeep via-surface2 to-surface p-10 text-center sm:p-16" },
                    React.createElement("div", { className: "pointer-events-none absolute inset-0 bg-labgrid opacity-40" }),
                    React.createElement("div", { className: "relative" },
                        React.createElement("h2", { className: "font-display text-3xl font-bold text-ink sm:text-4xl text-balance" }, "Ready to stock your research programme?"),
                        React.createElement("p", { className: "mx-auto mt-4 max-w-lg text-[15px] text-dim" }, "Create a basket, or speak to our wholesale team for a bespoke quotation on volume orders."),
                        React.createElement("div", { className: "mt-8 flex flex-wrap items-center justify-center gap-3" },
                            React.createElement(Button, { as: "a", href: "#/shop", size: "lg" }, "Shop the catalogue"),
                            React.createElement(Button, { as: "a", href: "#/contact", variant: "secondary", size: "lg" }, "Talk to wholesale"))))))));
}
"use strict";
const SORT_OPTIONS = [
    { value: "featured", label: "Featured" },
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
    { value: "name-asc", label: "Name: A–Z" },
];
function useShopFilters(route) {
    const [state, setState] = React.useState({
        q: route.query.q || "",
        categories: route.query.category ? [route.query.category] : [],
        sort: route.query.sort || "featured",
        inStockOnly: route.query.inStock === "1",
        maxPrice: route.query.maxPrice ? Number(route.query.maxPrice) : 250,
    });
    // Re-sync when the URL changes externally (nav from a category card / footer link)
    React.useEffect(() => {
        setState((s) => ({
            ...s,
            q: route.query.q || "",
            categories: route.query.category ? [route.query.category] : s.categories,
        }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [route.query.q, route.query.category]);
    return [state, setState];
}
function ShopPage({ initialCategory }) {
    const route = useRoute();
    const [filters, setFilters] = useShopFilters(route);
    const [mobileFiltersOpen, setMobileFiltersOpen] = React.useState(false);
    const activeCategorySlug = initialCategory || filters.categories[0] || null;
    const activeCategory = activeCategorySlug ? getCategoryBySlug(activeCategorySlug) : null;
    const results = React.useMemo(() => {
        let list = PRODUCTS.slice();
        if (activeCategorySlug) {
            list = list.filter((p) => p.category === activeCategorySlug);
        }
        if (filters.q.trim()) {
            const q = filters.q.trim().toLowerCase();
            list = list.filter((p) => p.name.toLowerCase().includes(q) ||
                p.shortDescription.toLowerCase().includes(q) ||
                p.subcategory.toLowerCase().includes(q));
        }
        if (filters.inStockOnly) {
            list = list.filter((p) => totalStock(p) > 0);
        }
        list = list.filter((p) => priceRange(p).min <= filters.maxPrice);
        switch (filters.sort) {
            case "price-asc":
                list.sort((a, b) => priceRange(a).min - priceRange(b).min);
                break;
            case "price-desc":
                list.sort((a, b) => priceRange(b).min - priceRange(a).min);
                break;
            case "name-asc":
                list.sort((a, b) => a.name.localeCompare(b.name));
                break;
            default:
                break;
        }
        return list;
    }, [activeCategorySlug, filters]);
    function toggleCategory(slug) {
        const next = filters.categories[0] === slug ? [] : [slug];
        setFilters((f) => ({ ...f, categories: next }));
        navigate("/shop", next.length ? { category: slug } : {}, { scrollTop: false });
    }
    function clearAll() {
        setFilters({ q: "", categories: [], sort: "featured", inStockOnly: false, maxPrice: 250 });
        navigate("/shop", {}, { scrollTop: false });
    }
    const hasActiveFilters = filters.q || filters.categories.length || filters.inStockOnly || filters.maxPrice < 250;
    const FilterPanel = (React.createElement("div", { className: "flex flex-col gap-8" },
        React.createElement("div", null,
            React.createElement("h3", { className: "font-display text-sm font-semibold text-ink" }, "Category"),
            React.createElement("ul", { className: "mt-3 flex flex-col gap-1" },
                React.createElement("li", null,
                    React.createElement("button", { onClick: () => { setFilters((f) => ({ ...f, categories: [] })); navigate("/shop", {}, { scrollTop: false }); }, className: cx("w-full rounded-lg px-2.5 py-2 text-left text-[13.5px] transition-colors", !activeCategorySlug ? "bg-accent/15 text-accent2 font-medium" : "text-dim hover:bg-surface2 hover:text-ink") },
                        "All peptides ",
                        React.createElement("span", { className: "font-mono text-[11px] text-faint" },
                            "(",
                            PRODUCTS.length,
                            ")"))),
                CATEGORIES.map((c) => {
                    const count = PRODUCTS.filter((p) => p.category === c.id).length;
                    const active = activeCategorySlug === c.slug;
                    return (React.createElement("li", { key: c.id },
                        React.createElement("button", { onClick: () => toggleCategory(c.slug), className: cx("w-full rounded-lg px-2.5 py-2 text-left text-[13.5px] transition-colors", active ? "bg-accent/15 text-accent2 font-medium" : "text-dim hover:bg-surface2 hover:text-ink") },
                            c.shortName,
                            " ",
                            React.createElement("span", { className: "font-mono text-[11px] text-faint" },
                                "(",
                                count,
                                ")"))));
                }))),
        React.createElement("div", null,
            React.createElement("h3", { className: "font-display text-sm font-semibold text-ink" }, "Max unit price"),
            React.createElement("input", { type: "range", min: "30", max: "250", step: "5", value: filters.maxPrice, onChange: (e) => setFilters((f) => ({ ...f, maxPrice: Number(e.target.value) })), className: "mt-4 w-full accent-accent", "aria-label": "Maximum unit price" }),
            React.createElement("div", { className: "mt-1 flex justify-between font-mono text-[11px] text-faint" },
                React.createElement("span", null, "\u00A330"),
                React.createElement("span", { className: "text-ink" },
                    "Up to ",
                    formatMoney(filters.maxPrice)))),
        React.createElement("label", { className: "flex items-center gap-2.5 text-[13.5px] text-dim" },
            React.createElement("input", { type: "checkbox", checked: filters.inStockOnly, onChange: (e) => setFilters((f) => ({ ...f, inStockOnly: e.target.checked })), className: "h-4 w-4 rounded border-line2 bg-surface2 accent-accent" }),
            "In stock only"),
        hasActiveFilters && (React.createElement(Button, { variant: "ghost", size: "sm", onClick: clearAll, className: "self-start !px-0" },
            React.createElement(Icon, { name: "close", className: "h-3.5 w-3.5" }),
            " Clear all filters"))));
    return (React.createElement(Container, { className: "py-10 sm:py-14" },
        React.createElement(Breadcrumbs, { items: [{ label: "Home", href: "#/" }, ...(activeCategory ? [{ label: "Shop", href: "#/shop" }, { label: activeCategory.shortName }] : [{ label: "Shop" }])] }),
        React.createElement("div", { className: "mt-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between" },
            React.createElement("div", null,
                React.createElement("h1", { className: "font-display text-3xl font-bold text-ink sm:text-4xl" }, activeCategory ? activeCategory.name : "All Research Peptides"),
                activeCategory && React.createElement("p", { className: "mt-2 max-w-xl text-[14px] text-dim" }, activeCategory.description))),
        React.createElement("div", { className: "mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[240px_1fr]" },
            React.createElement("aside", { className: "hidden lg:block" }, FilterPanel),
            React.createElement("div", null,
                React.createElement("div", { className: "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between" },
                    React.createElement("div", { className: "relative flex-1 sm:max-w-xs" },
                        React.createElement(Icon, { name: "search", className: "pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" }),
                        React.createElement("input", { value: filters.q, onChange: (e) => setFilters((f) => ({ ...f, q: e.target.value })), placeholder: "Search this catalogue\u2026", "aria-label": "Search catalogue", className: "w-full rounded-full border border-line2 bg-surface2 py-2.5 pl-10 pr-4 text-[13px] text-ink placeholder:text-faint outline-none focus:border-accent2" })),
                    React.createElement("div", { className: "flex items-center gap-2" },
                        React.createElement("button", { onClick: () => setMobileFiltersOpen(true), className: "flex items-center gap-1.5 rounded-full border border-line2 px-4 py-2.5 text-[13px] text-ink lg:hidden" },
                            React.createElement(Icon, { name: "filter", className: "h-4 w-4" }),
                            " Filters"),
                        React.createElement("div", { className: "relative" },
                            React.createElement("select", { value: filters.sort, onChange: (e) => setFilters((f) => ({ ...f, sort: e.target.value })), "aria-label": "Sort products", className: "appearance-none rounded-full border border-line2 bg-surface2 py-2.5 pl-4 pr-9 text-[13px] text-ink outline-none focus:border-accent2" }, SORT_OPTIONS.map((o) => React.createElement("option", { key: o.value, value: o.value }, o.label))),
                            React.createElement(Icon, { name: "chevronDown", className: "pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-faint" })))),
                React.createElement("p", { className: "mt-4 font-mono text-[11px] uppercase tracking-[0.1em] text-faint" },
                    results.length,
                    " result",
                    results.length === 1 ? "" : "s"),
                results.length === 0 ? (React.createElement(EmptyState, { icon: "search", title: "No peptides match those filters", body: "Try widening your price range or clearing filters.", action: React.createElement(Button, { variant: "secondary", onClick: clearAll }, "Clear filters") })) : (React.createElement("div", { className: "mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3" }, results.map((p) => React.createElement(ProductCard, { key: p.id, product: p })))))),
        mobileFiltersOpen && (React.createElement("div", { className: "fixed inset-0 z-50 lg:hidden" },
            React.createElement("div", { className: "absolute inset-0 bg-[#020408]/70", onClick: () => setMobileFiltersOpen(false) }),
            React.createElement("div", { className: "absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto rounded-t-2xl bg-surface p-6" },
                React.createElement("div", { className: "mb-4 flex items-center justify-between" },
                    React.createElement("h2", { className: "font-display text-lg font-semibold text-ink" }, "Filters"),
                    React.createElement("button", { onClick: () => setMobileFiltersOpen(false), "aria-label": "Close filters" },
                        React.createElement(Icon, { name: "close", className: "h-5 w-5 text-dim" }))),
                FilterPanel,
                React.createElement(Button, { full: true, className: "mt-6", onClick: () => setMobileFiltersOpen(false) },
                    "Show ",
                    results.length,
                    " results"))))));
}
"use strict";
function ProductPage({ slug }) {
    const product = getProductBySlug(slug);
    const [activeImage, setActiveImage] = React.useState(0);
    const [variantIdx, setVariantIdx] = React.useState(0);
    const [qty, setQty] = React.useState(1);
    const [tab, setTab] = React.useState("description");
    React.useEffect(() => {
        setActiveImage(0);
        setVariantIdx(0);
        setQty(1);
        setTab("description");
    }, [slug]);
    if (!product) {
        return (React.createElement(Container, { className: "py-24" },
            React.createElement(EmptyState, { icon: "search", title: "Compound not found", body: "This product may have been removed from the catalogue.", action: React.createElement(Button, { as: "a", href: "#/shop" }, "Back to shop") })));
    }
    const category = CATEGORIES.find((c) => c.id === product.category);
    const variant = product.variants[variantIdx];
    const unitStock = Math.floor(variant.stock / UNIT_SIZE);
    const avail = unitStock > 0 ? (unitStock < 3 ? { label: `Low stock — ${unitStock} unit${unitStock === 1 ? "" : "s"} left`, tone: "warn" } : { label: "In stock", tone: "ok" }) : { label: "Out of stock", tone: "danger" };
    const related = relatedProducts(product, 4);
    function addToBasket() {
        Cart.addItem(product.id, variant.sku, qty);
        pushToast(`${product.name} ${variant.label} × ${qty} added to basket`, { tone: "ok" });
    }
    return (React.createElement(Container, { className: "py-10 sm:py-14" },
        React.createElement(Breadcrumbs, { items: [
                { label: "Home", href: "#/" },
                { label: "Shop", href: "#/shop" },
                { label: category ? category.shortName : "", href: category ? `#/shop?category=${category.slug}` : undefined },
                { label: product.name },
            ] }),
        React.createElement("div", { className: "mt-6 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16" },
            React.createElement("div", null,
                React.createElement("div", { className: "relative flex items-center justify-center overflow-hidden rounded-2xl border border-line bg-labgrid bg-surface/50 p-10" },
                    product.tag && React.createElement(Badge, { tone: "accent", className: "absolute left-4 top-4" }, product.tag),
                    React.createElement(ProductVisual, { image: product.images[activeImage], height: 340 })),
                React.createElement("div", { className: "mt-4 flex gap-3" }, product.images.map((img, i) => (React.createElement("button", { key: i, onClick: () => setActiveImage(i), "aria-label": `Show image ${i + 1}`, className: cx("flex h-20 w-20 shrink-0 items-center justify-center rounded-xl border bg-surface2 p-2 transition-colors", activeImage === i ? "border-accent2" : "border-line hover:border-line2") },
                    React.createElement(ProductVisual, { image: img, height: 60 })))))),
            React.createElement("div", null,
                React.createElement("p", { className: "font-mono text-[11px] uppercase tracking-[0.16em] text-accent2" }, product.subcategory),
                React.createElement("h1", { className: "mt-2 font-display text-3xl font-bold text-ink sm:text-4xl" }, product.name),
                React.createElement("p", { className: "mt-1 font-mono text-[12px] text-faint" },
                    "SKU: ",
                    variant.sku),
                React.createElement("p", { className: "mt-4 text-[15px] leading-relaxed text-dim" }, product.shortDescription),
                React.createElement("div", { className: "mt-6 flex items-center gap-3" },
                    React.createElement(Price, { value: variant.retailPrice * UNIT_SIZE, rrp: variant.rrp * UNIT_SIZE, size: "lg" }),
                    React.createElement(Badge, { tone: avail.tone }, avail.label)),
                React.createElement("p", { className: "mt-1 text-[11px] text-faint" }, "Price per unit of 10 vials, ex. VAT \u00B7 VAT calculated at checkout"),
                React.createElement("div", { className: "mt-7" },
                    React.createElement("h3", { className: "font-body text-[13px] font-semibold text-ink" }, "Size"),
                    React.createElement("div", { className: "mt-2.5 flex flex-wrap gap-2" }, product.variants.map((v, i) => (React.createElement("button", { key: v.sku, onClick: () => setVariantIdx(i), className: cx("rounded-full border px-4 py-2 font-mono text-[13px] transition-colors", i === variantIdx ? "border-accent bg-accent/15 text-accent2" : "border-line2 text-dim hover:border-line2 hover:text-ink") }, v.label))))),
                React.createElement("div", { className: "mt-7" },
                    React.createElement("div", { className: "flex flex-wrap items-center gap-3" },
                        React.createElement(QuantityStepper, { value: qty, onChange: setQty, max: Math.max(unitStock, 0) }),
                        React.createElement(Button, { size: "lg", onClick: addToBasket, disabled: unitStock <= 0, className: "flex-1 min-w-[200px]" },
                            React.createElement(Icon, { name: "cart", className: "h-4 w-4" }),
                            " Add to basket")),
                    React.createElement("p", { className: "mt-2 text-[11.5px] text-faint" },
                        "Sold in fixed units of ",
                        UNIT_SIZE,
                        " vials per SKU \u2014 ",
                        qty,
                        " unit",
                        qty === 1 ? "" : "s",
                        " = ",
                        qty * UNIT_SIZE,
                        " vials.")),
                React.createElement("p", { className: "mt-3 text-[12px] text-dim" },
                    "Line total: ",
                    React.createElement("span", { className: "tnum text-ink font-medium" }, formatMoney(variant.retailPrice * UNIT_SIZE * qty))),
                React.createElement("div", { className: "mt-7 grid grid-cols-1 gap-3 rounded-xl border border-line bg-surface/40 p-4 sm:grid-cols-2" },
                    React.createElement("div", { className: "flex items-start gap-2.5" },
                        React.createElement(Icon, { name: "truck", className: "mt-0.5 h-4 w-4 shrink-0 text-accent2" }),
                        React.createElement("p", { className: "text-[12.5px] leading-snug text-dim" },
                            React.createElement("a", { href: "#/delivery", className: "text-ink hover:text-accent2" }, "3–5 working day delivery"),
                            " on all UK mainland orders.")),
                    React.createElement("div", { className: "flex items-start gap-2.5" },
                        React.createElement(Icon, { name: "shieldCheck", className: "mt-0.5 h-4 w-4 shrink-0 text-accent2" }),
                        React.createElement("p", { className: "text-[12.5px] leading-snug text-dim" },
                            "Batch-tested \u226598% purity, ",
                            React.createElement("a", { href: "#/returns", className: "text-ink hover:text-accent2" }, "quality guaranteed"),
                            "."))),
                React.createElement("div", { className: "mt-5 flex items-start gap-2.5 rounded-xl border border-amber-500/25 bg-amber-500/5 p-4" },
                    React.createElement(Icon, { name: "alertTriangle", className: "mt-0.5 h-4 w-4 shrink-0 text-amber-300" }),
                    React.createElement("p", { className: "text-[12px] leading-snug text-amber-200/90" },
                        "For laboratory research use only. Not for human or veterinary use, diagnostic use, or consumption. ",
                        React.createElement("a", { href: "#/legal", className: "underline hover:text-amber-100" }, "Research use policy"))))),
        React.createElement("div", { className: "mt-16" },
            React.createElement("div", { className: "flex gap-6 border-b border-line" }, [
                { id: "description", label: "Description" },
                { id: "research", label: "Research Highlights" },
                { id: "specs", label: "Specification" },
            ].map((t) => (React.createElement("button", { key: t.id, onClick: () => setTab(t.id), className: cx("relative pb-4 text-[14px] font-medium transition-colors", tab === t.id ? "text-ink" : "text-faint hover:text-dim") },
                t.label,
                tab === t.id && React.createElement("span", { className: "absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-accent" }))))),
            React.createElement("div", { className: "mt-8 max-w-3xl" },
                tab === "description" && (React.createElement("div", { className: "flex flex-col gap-4" }, product.fullDescription.map((p, i) => React.createElement("p", { key: i, className: "text-[14.5px] leading-relaxed text-dim" }, p)))),
                tab === "research" && (React.createElement("div", { className: "grid grid-cols-1 gap-5 sm:grid-cols-2" }, product.researchHighlights.map((h) => (React.createElement("div", { key: h.title, className: "rounded-xl border border-line bg-surface/40 p-5" },
                    React.createElement(Icon, { name: "microscope", className: "h-5 w-5 text-accent2" }),
                    React.createElement("h4", { className: "mt-3 font-body text-[13.5px] font-semibold text-ink" }, h.title),
                    React.createElement("p", { className: "mt-1.5 text-[13px] leading-relaxed text-dim" }, h.body)))))),
                tab === "specs" && (React.createElement("dl", { className: "divide-y divide-line rounded-xl border border-line" },
                    Object.entries(product.specs).map(([k, v]) => (React.createElement("div", { key: k, className: "grid grid-cols-2 gap-4 px-5 py-3.5" },
                        React.createElement("dt", { className: "text-[13px] capitalize text-faint" }, k.replace(/([A-Z])/g, " $1")),
                        React.createElement("dd", { className: "text-[13px] text-ink" }, v)))),
                    React.createElement("div", { className: "grid grid-cols-2 gap-4 px-5 py-3.5" },
                        React.createElement("dt", { className: "text-[13px] text-faint" }, "Available sizes"),
                        React.createElement("dd", { className: "text-[13px] text-ink" }, product.variants.map((v) => v.label).join(", "))))))),
        related.length > 0 && (React.createElement("div", { className: "mt-20" },
            React.createElement(SectionHeading, { eyebrow: "You may also need", title: "Related compounds" }),
            React.createElement("div", { className: "mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4" }, related.map((p) => React.createElement(ProductCard, { key: p.id, product: p })))))));
}
"use strict";
function CartPage() {
    const cart = useCart();
    if (cart.lines.length === 0) {
        return (React.createElement(Container, { className: "py-16 sm:py-24" },
            React.createElement(EmptyState, { icon: "cart", title: "Your basket is empty", body: "Browse the catalogue and add research peptides to build your wholesale order.", action: React.createElement(Button, { as: "a", href: "#/shop" }, "Browse the shop") })));
    }
    return (React.createElement(Container, { className: "py-10 sm:py-14" },
        React.createElement(Breadcrumbs, { items: [{ label: "Home", href: "#/" }, { label: "Basket" }] }),
        React.createElement("h1", { className: "mt-4 font-display text-3xl font-bold text-ink sm:text-4xl" }, "Your Basket"),
        React.createElement("div", { className: "mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_360px]" },
            React.createElement("div", { className: "overflow-hidden rounded-2xl border border-line" },
                React.createElement("table", { className: "w-full text-left" },
                    React.createElement("thead", { className: "border-b border-line bg-surface/60" },
                        React.createElement("tr", null,
                            React.createElement("th", { className: "px-5 py-3 text-[11px] font-medium uppercase tracking-wide text-faint" }, "Product"),
                            React.createElement("th", { className: "px-5 py-3 text-[11px] font-medium uppercase tracking-wide text-faint" }, "Price /unit (10 vials)"),
                            React.createElement("th", { className: "px-5 py-3 text-[11px] font-medium uppercase tracking-wide text-faint" }, "Units"),
                            React.createElement("th", { className: "px-5 py-3 text-right text-[11px] font-medium uppercase tracking-wide text-faint" }, "Total"),
                            React.createElement("th", { className: "px-5 py-3" }))),
                    React.createElement("tbody", { className: "divide-y divide-line" }, cart.lines.map((line) => (React.createElement("tr", { key: line.productId + line.variantSku },
                        React.createElement("td", { className: "px-5 py-4" },
                            React.createElement("div", { className: "flex items-center gap-3" },
                                React.createElement("a", { href: `#/product/${line.slug}`, className: "h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-line bg-surface2" },
                                    React.createElement(ProductVisual, { image: { type: "vial", accent: line.accent, label: "" }, height: 56 })),
                                React.createElement("div", null,
                                    React.createElement("a", { href: `#/product/${line.slug}`, className: "font-body text-[14px] font-semibold text-ink hover:text-accent2" }, line.name),
                                    React.createElement("p", { className: "font-mono text-[11px] text-faint" },
                                        line.variantLabel,
                                        " \u00B7 ",
                                        line.variantSku),
                                    React.createElement("p", { className: "font-mono text-[10.5px] text-faint" }, "Unit = ", line.unitSize || UNIT_SIZE, " vials")))),
                        React.createElement("td", { className: "px-5 py-4 tnum text-[13.5px] text-dim" }, formatMoney(line.unitPrice)),
                        React.createElement("td", { className: "px-5 py-4" },
                            React.createElement(QuantityStepper, { size: "sm", value: line.qty, onChange: (q) => Cart.setQty(line.productId, line.variantSku, q), max: Math.max(Math.floor(line.stock / UNIT_SIZE), 0) })),
                        React.createElement("td", { className: "px-5 py-4 text-right tnum text-[14px] font-semibold text-ink" }, formatMoney(line.lineTotal)),
                        React.createElement("td", { className: "px-5 py-4 text-right" },
                            React.createElement("button", { onClick: () => Cart.removeItem(line.productId, line.variantSku), "aria-label": `Remove ${line.name}`, className: "text-faint hover:text-red-300" },
                                React.createElement(Icon, { name: "trash", className: "h-4 w-4" })))))))),
                React.createElement("div", { className: "flex items-center justify-between border-t border-line px-5 py-4" },
                    React.createElement(Button, { as: "a", href: "#/shop", variant: "ghost", size: "sm" },
                        React.createElement(Icon, { name: "arrowLeft", className: "h-4 w-4" }),
                        " Continue shopping"),
                    React.createElement("button", { onClick: () => Cart.clear(), className: "text-[12.5px] text-faint hover:text-red-300" }, "Clear basket"))),
            React.createElement("aside", { className: "h-fit rounded-2xl panel p-6" },
                React.createElement("h2", { className: "font-display text-lg font-semibold text-ink" }, "Order Summary"),
                React.createElement("div", { className: "mt-4 rounded-xl border border-line bg-surface2/60 p-3.5" },
                    React.createElement("div", { className: "flex items-center justify-between text-[12px] text-dim" },
                        React.createElement("span", null, "Wholesale minimum"),
                        React.createElement("span", { className: "font-mono tnum text-ink" },
                            formatMoney(cart.subtotal),
                            " / ",
                            formatMoney(SETTINGS.minimumOrderValue))),
                    React.createElement("div", { className: "mt-2 h-1.5 w-full overflow-hidden rounded-full bg-surface3" },
                        React.createElement("div", { className: cx("h-full rounded-full transition-all duration-500", cart.meetsMinimum ? "bg-emerald-400" : "bg-gradient-to-r from-accent to-accent2"), style: { width: `${Math.min(100, (cart.subtotal / SETTINGS.minimumOrderValue) * 100)}%` } })),
                    !cart.meetsMinimum && React.createElement("p", { className: "mt-2 text-[12px] text-dim" },
                        "Add ",
                        formatMoney(cart.remainingToMinimum),
                        " more to unlock checkout.")),
                React.createElement("div", { className: "mt-5 flex flex-col gap-2 text-[13.5px] text-dim" },
                    React.createElement("div", { className: "flex justify-between" },
                        React.createElement("span", null, "Subtotal"),
                        React.createElement("span", { className: "tnum text-ink" }, formatMoney(cart.subtotal))),
                    React.createElement("div", { className: "flex justify-between" },
                        React.createElement("span", null, "VAT (20%)"),
                        React.createElement("span", { className: "tnum text-ink" }, formatMoney(cart.vat))),
                    React.createElement("div", { className: "flex justify-between" },
                        React.createElement("span", null, "Delivery"),
                        React.createElement("span", { className: "tnum text-ink" }, cart.delivery === 0 ? "Free" : formatMoney(cart.delivery)))),
                React.createElement("div", { className: "mt-3 flex justify-between border-t border-line pt-3" },
                    React.createElement("span", { className: "font-display font-semibold text-ink" }, "Total"),
                    React.createElement("span", { className: "font-display text-xl font-bold tnum text-ink" }, formatMoney(cart.total))),
                React.createElement(Button, { as: "a", href: "#/checkout", full: true, size: "lg", className: "mt-5", disabled: !cart.meetsMinimum },
                    "Proceed to checkout ",
                    React.createElement(Icon, { name: "arrowRight", className: "h-4 w-4" })),
                !cart.meetsMinimum && React.createElement("p", { className: "mt-2 text-center text-[11.5px] text-amber-300" }, "Minimum order value not yet met"),
                React.createElement("p", { className: "mt-4 flex items-center justify-center gap-1.5 text-[11px] text-faint" },
                    React.createElement(Icon, { name: "lock", className: "h-3.5 w-3.5" }),
                    " Secure checkout \u00B7 Stripe payment link")))));
}
"use strict";
function CheckoutPage() {
    const cart = useCart();
    const [form, setForm] = React.useState({
        fullName: "", email: "", phone: "", company: "", vatNumber: "",
        billingLine1: "", billingLine2: "", billingCity: "", billingPostcode: "", billingCountry: "United Kingdom",
        shipSameAsBilling: true,
        shipLine1: "", shipLine2: "", shipCity: "", shipPostcode: "", shipCountry: "United Kingdom",
        notes: "", agree: false,
    });
    const [submitting, setSubmitting] = React.useState(false);
    const [errors, setErrors] = React.useState({});
    function update(field, value) {
        setForm((f) => ({ ...f, [field]: value }));
    }
    function validate() {
        const req = ["fullName", "email", "company", "billingLine1", "billingCity", "billingPostcode"];
        const next = {};
        req.forEach((f) => { if (!form[f].trim())
            next[f] = "Required"; });
        if (form.email && !/^\S+@\S+\.\S+$/.test(form.email))
            next.email = "Enter a valid email";
        if (!form.shipSameAsBilling) {
            ["shipLine1", "shipCity", "shipPostcode"].forEach((f) => { if (!form[f].trim())
                next[f] = "Required"; });
        }
        if (!form.agree)
            next.agree = "You must confirm research-use eligibility";
        setErrors(next);
        return Object.keys(next).length === 0;
    }
    function submit(e) {
        e.preventDefault();
        if (!cart.meetsMinimum || cart.lines.length === 0)
            return;
        if (!validate()) {
            pushToast("Please check the highlighted fields", { tone: "default" });
            return;
        }
        setSubmitting(true);
        // In production this is where the front-end calls a backend endpoint
        // (e.g. POST /api/checkout/session) that creates a Stripe Checkout
        // Session server-side with the secret key, then redirects the browser
        // to session.url. No secret key or card data ever touches this file.
        setTimeout(() => {
            const order = Orders.create({
                customer: { name: form.fullName, email: form.email, phone: form.phone, company: form.company, vatNumber: form.vatNumber },
                billingAddress: { line1: form.billingLine1, line2: form.billingLine2, city: form.billingCity, postcode: form.billingPostcode, country: form.billingCountry },
                shippingAddress: form.shipSameAsBilling
                    ? { line1: form.billingLine1, line2: form.billingLine2, city: form.billingCity, postcode: form.billingPostcode, country: form.billingCountry }
                    : { line1: form.shipLine1, line2: form.shipLine2, city: form.shipCity, postcode: form.shipPostcode, country: form.shipCountry },
                notes: form.notes,
                lines: cart.lines.map((l) => ({ sku: l.variantSku, name: l.name, variantLabel: l.variantLabel, qty: l.qty, unitPrice: l.unitPrice, lineTotal: l.lineTotal })),
                subtotal: cart.subtotal, vat: cart.vat, delivery: cart.delivery, total: cart.total,
                currency: SETTINGS.currency,
            });
            Cart.clear();
            setSubmitting(false);
            navigate("/order-confirmation/" + order.orderNumber);
        }, 900);
    }
    if (cart.lines.length === 0) {
        return (React.createElement(Container, { className: "py-16 sm:py-24" },
            React.createElement(EmptyState, { icon: "cart", title: "Your basket is empty", body: "Add compounds to your basket before checking out.", action: React.createElement(Button, { as: "a", href: "#/shop" }, "Browse the shop") })));
    }
    if (!cart.meetsMinimum) {
        return (React.createElement(Container, { className: "py-16 sm:py-24" },
            React.createElement(EmptyState, { icon: "scale", title: "Minimum order value not met", body: `Wholesale orders require a minimum of ${formatMoney(SETTINGS.minimumOrderValue)}. Add ${formatMoney(cart.remainingToMinimum)} more to continue.`, action: React.createElement(Button, { as: "a", href: "#/shop" }, "Continue shopping") })));
    }
    const Field = ({ label, field, type = "text", full, placeholder }) => (React.createElement("label", { className: cx("flex flex-col gap-1.5", full && "sm:col-span-2") },
        React.createElement("span", { className: "text-[12.5px] font-medium text-dim" }, label),
        React.createElement("input", { type: type, value: form[field], onChange: (e) => update(field, e.target.value), placeholder: placeholder, className: cx("rounded-lg border bg-surface2 px-3.5 py-2.5 text-[13.5px] text-ink placeholder:text-faint outline-none focus:border-accent2", errors[field] ? "border-red-500/60" : "border-line2") }),
        errors[field] && React.createElement("span", { className: "text-[11px] text-red-300" }, errors[field])));
    return (React.createElement(Container, { className: "py-10 sm:py-14" },
        React.createElement(Breadcrumbs, { items: [{ label: "Home", href: "#/" }, { label: "Basket", href: "#/cart" }, { label: "Checkout" }] }),
        React.createElement("h1", { className: "mt-4 font-display text-3xl font-bold text-ink sm:text-4xl" }, "Checkout"),
        React.createElement("form", { onSubmit: submit, className: "mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_380px]" },
            React.createElement("div", { className: "flex flex-col gap-8" },
                React.createElement("section", { className: "rounded-2xl border border-line p-6" },
                    React.createElement("h2", { className: "flex items-center gap-2 font-display text-[15px] font-semibold text-ink" },
                        React.createElement(Icon, { name: "user", className: "h-4 w-4 text-accent2" }),
                        " Contact & Institution"),
                    React.createElement("div", { className: "mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2" },
                        React.createElement(Field, { label: "Full name", field: "fullName" }),
                        React.createElement(Field, { label: "Institutional email", field: "email", type: "email" }),
                        React.createElement(Field, { label: "Phone", field: "phone", type: "tel" }),
                        React.createElement(Field, { label: "Company / institution", field: "company" }),
                        React.createElement(Field, { label: "VAT number (optional)", field: "vatNumber" }))),
                React.createElement("section", { className: "rounded-2xl border border-line p-6" },
                    React.createElement("h2", { className: "flex items-center gap-2 font-display text-[15px] font-semibold text-ink" },
                        React.createElement(Icon, { name: "mapPin", className: "h-4 w-4 text-accent2" }),
                        " Billing address"),
                    React.createElement("div", { className: "mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2" },
                        React.createElement(Field, { label: "Address line 1", field: "billingLine1", full: true }),
                        React.createElement(Field, { label: "Address line 2 (optional)", field: "billingLine2", full: true }),
                        React.createElement(Field, { label: "City", field: "billingCity" }),
                        React.createElement(Field, { label: "Postcode", field: "billingPostcode" }),
                        React.createElement(Field, { label: "Country", field: "billingCountry" }))),
                React.createElement("section", { className: "rounded-2xl border border-line p-6" },
                    React.createElement("div", { className: "flex items-center justify-between" },
                        React.createElement("h2", { className: "flex items-center gap-2 font-display text-[15px] font-semibold text-ink" },
                            React.createElement(Icon, { name: "truck", className: "h-4 w-4 text-accent2" }),
                            " Delivery address"),
                        React.createElement("label", { className: "flex items-center gap-2 text-[12.5px] text-dim" },
                            React.createElement("input", { type: "checkbox", checked: form.shipSameAsBilling, onChange: (e) => update("shipSameAsBilling", e.target.checked), className: "h-4 w-4 rounded border-line2 bg-surface2 accent-accent" }),
                            "Same as billing")),
                    !form.shipSameAsBilling && (React.createElement("div", { className: "mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2" },
                        React.createElement(Field, { label: "Address line 1", field: "shipLine1", full: true }),
                        React.createElement(Field, { label: "Address line 2 (optional)", field: "shipLine2", full: true }),
                        React.createElement(Field, { label: "City", field: "shipCity" }),
                        React.createElement(Field, { label: "Postcode", field: "shipPostcode" }),
                        React.createElement(Field, { label: "Country", field: "shipCountry" })))),
                React.createElement("section", { className: "rounded-2xl border border-line p-6" },
                    React.createElement("h2", { className: "flex items-center gap-2 font-display text-[15px] font-semibold text-ink" },
                        React.createElement(Icon, { name: "fileText", className: "h-4 w-4 text-accent2" }),
                        " Order notes (optional)"),
                    React.createElement("textarea", { value: form.notes, onChange: (e) => update("notes", e.target.value), rows: 3, placeholder: "PO number, delivery instructions, or anything else our wholesale team should know\u2026", className: "mt-4 w-full rounded-lg border border-line2 bg-surface2 px-3.5 py-2.5 text-[13.5px] text-ink placeholder:text-faint outline-none focus:border-accent2" })),
                React.createElement("section", { className: "rounded-2xl border border-line p-6" },
                    React.createElement("h2", { className: "flex items-center gap-2 font-display text-[15px] font-semibold text-ink" },
                        React.createElement(Icon, { name: "creditCard", className: "h-4 w-4 text-accent2" }),
                        " Payment"),
                    React.createElement("p", { className: "mt-3 text-[13px] leading-relaxed text-dim" }, "Peptalys does not take card details directly. Submitting this order sends your request to our wholesale team, who issue a secure Stripe payment link by email for the exact order total \u2014 no card information is entered on this site."),
                    React.createElement("label", { className: "mt-4 flex items-start gap-2.5" },
                        React.createElement("input", { type: "checkbox", checked: form.agree, onChange: (e) => update("agree", e.target.checked), className: "mt-0.5 h-4 w-4 rounded border-line2 bg-surface2 accent-accent" }),
                        React.createElement("span", { className: "text-[12.5px] leading-relaxed text-dim" },
                            "I confirm I am procuring on behalf of a genuine research organisation, for laboratory research use only, and I have read the ",
                            React.createElement("a", { href: "#/legal", className: "text-accent2 underline" }, "research use policy"),
                            ".")),
                    errors.agree && React.createElement("p", { className: "mt-1.5 text-[11px] text-red-300" }, errors.agree))),
            React.createElement("aside", { className: "h-fit rounded-2xl panel p-6 lg:sticky lg:top-24" },
                React.createElement("h2", { className: "font-display text-lg font-semibold text-ink" }, "Order Summary"),
                React.createElement("ul", { className: "mt-4 flex flex-col gap-3" }, cart.lines.map((l) => (React.createElement("li", { key: l.productId + l.variantSku, className: "flex items-center justify-between text-[13px]" },
                    React.createElement("span", { className: "text-dim" },
                        l.name,
                        " ",
                        React.createElement("span", { className: "font-mono text-[11px] text-faint" },
                            "(",
                            l.variantLabel,
                            " \u00D7 ",
                            l.qty,
                            ")")),
                    React.createElement("span", { className: "tnum text-ink" }, formatMoney(l.lineTotal)))))),
                React.createElement("div", { className: "mt-4 flex flex-col gap-2 border-t border-line pt-4 text-[13.5px] text-dim" },
                    React.createElement("div", { className: "flex justify-between" },
                        React.createElement("span", null, "Subtotal"),
                        React.createElement("span", { className: "tnum text-ink" }, formatMoney(cart.subtotal))),
                    React.createElement("div", { className: "flex justify-between" },
                        React.createElement("span", null, "VAT (20%)"),
                        React.createElement("span", { className: "tnum text-ink" }, formatMoney(cart.vat))),
                    React.createElement("div", { className: "flex justify-between" },
                        React.createElement("span", null, "Delivery"),
                        React.createElement("span", { className: "tnum text-ink" }, cart.delivery === 0 ? "Free" : formatMoney(cart.delivery)))),
                React.createElement("div", { className: "mt-3 flex justify-between border-t border-line pt-3" },
                    React.createElement("span", { className: "font-display font-semibold text-ink" }, "Total"),
                    React.createElement("span", { className: "font-display text-xl font-bold tnum text-ink" }, formatMoney(cart.total))),
                React.createElement(Button, { type: "submit", full: true, size: "lg", className: "mt-5", disabled: submitting },
                    submitting ? "Submitting…" : "Confirm order",
                    " ",
                    !submitting && React.createElement(Icon, { name: "arrowRight", className: "h-4 w-4" })),
                React.createElement("p", { className: "mt-3 flex items-center justify-center gap-1.5 text-center text-[11px] text-faint" },
                    React.createElement(Icon, { name: "lock", className: "h-3.5 w-3.5" }),
                    " No payment card details are collected on this site")))));
}
"use strict";
function ConfirmationPage({ orderNumber }) {
    const order = Orders.get(orderNumber);
    if (!order) {
        return (React.createElement(Container, { className: "py-16 sm:py-24" },
            React.createElement(EmptyState, { icon: "fileText", title: "Order not found", body: "We couldn't find that order reference in this browser.", action: React.createElement(Button, { as: "a", href: "#/shop" }, "Back to shop") })));
    }
    return (React.createElement(Container, { className: "py-14 sm:py-20" },
        React.createElement("div", { className: "mx-auto max-w-2xl text-center" },
            React.createElement("div", { className: "mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-300" },
                React.createElement(Icon, { name: "check", className: "h-8 w-8", strokeWidth: 2.4 })),
            React.createElement("h1", { className: "mt-6 font-display text-3xl font-bold text-ink sm:text-4xl" }, "Order request received"),
            React.createElement("p", { className: "mt-3 text-[15px] text-dim" },
                "Reference ",
                React.createElement("span", { className: "font-mono text-ink" }, order.orderNumber),
                " \u2014 a member of our wholesale team will email a secure Stripe payment link to ",
                React.createElement("span", { className: "text-ink" }, order.customer.email),
                " shortly to confirm and process payment.")),
        React.createElement("div", { className: "mx-auto mt-10 max-w-2xl rounded-2xl panel p-6 sm:p-8" },
            React.createElement("div", { className: "flex flex-wrap items-center justify-between gap-3 border-b border-line pb-5" },
                React.createElement("div", null,
                    React.createElement("p", { className: "font-mono text-[11px] uppercase tracking-[0.14em] text-faint" }, "Order reference"),
                    React.createElement("p", { className: "font-display text-lg font-semibold text-ink" }, order.orderNumber)),
                React.createElement(Badge, { tone: "warn" }, "Awaiting payment link")),
            React.createElement("ul", { className: "mt-5 flex flex-col gap-3" }, order.lines.map((l, i) => (React.createElement("li", { key: i, className: "flex items-center justify-between text-[13.5px]" },
                React.createElement("span", { className: "text-dim" },
                    l.name,
                    " ",
                    React.createElement("span", { className: "font-mono text-[11px] text-faint" },
                        "(",
                        l.variantLabel,
                        " \u00D7 ",
                        l.qty,
                        ")")),
                React.createElement("span", { className: "tnum text-ink" }, formatMoney(l.lineTotal)))))),
            React.createElement("div", { className: "mt-5 flex flex-col gap-2 border-t border-line pt-4 text-[13.5px] text-dim" },
                React.createElement("div", { className: "flex justify-between" },
                    React.createElement("span", null, "Subtotal"),
                    React.createElement("span", { className: "tnum text-ink" }, formatMoney(order.subtotal))),
                React.createElement("div", { className: "flex justify-between" },
                    React.createElement("span", null, "VAT"),
                    React.createElement("span", { className: "tnum text-ink" }, formatMoney(order.vat))),
                React.createElement("div", { className: "flex justify-between" },
                    React.createElement("span", null, "Delivery"),
                    React.createElement("span", { className: "tnum text-ink" }, order.delivery === 0 ? "Free" : formatMoney(order.delivery))),
                React.createElement("div", { className: "mt-1 flex justify-between border-t border-line pt-2 text-[15px] font-semibold text-ink" },
                    React.createElement("span", null, "Total"),
                    React.createElement("span", { className: "tnum" }, formatMoney(order.total)))),
            React.createElement("div", { className: "mt-6 grid grid-cols-1 gap-4 border-t border-line pt-5 sm:grid-cols-2" },
                React.createElement("div", null,
                    React.createElement("p", { className: "font-mono text-[10px] uppercase tracking-[0.14em] text-faint" }, "Billing address"),
                    React.createElement("p", { className: "mt-1.5 text-[13px] leading-relaxed text-dim" },
                        order.billingAddress.line1,
                        order.billingAddress.line2 ? `, ${order.billingAddress.line2}` : "",
                        React.createElement("br", null),
                        order.billingAddress.city,
                        ", ",
                        order.billingAddress.postcode,
                        React.createElement("br", null),
                        order.billingAddress.country)),
                React.createElement("div", null,
                    React.createElement("p", { className: "font-mono text-[10px] uppercase tracking-[0.14em] text-faint" }, "Delivery address"),
                    React.createElement("p", { className: "mt-1.5 text-[13px] leading-relaxed text-dim" },
                        order.shippingAddress.line1,
                        order.shippingAddress.line2 ? `, ${order.shippingAddress.line2}` : "",
                        React.createElement("br", null),
                        order.shippingAddress.city,
                        ", ",
                        order.shippingAddress.postcode,
                        React.createElement("br", null),
                        order.shippingAddress.country)))),
        React.createElement("div", { className: "mx-auto mt-8 flex max-w-2xl flex-wrap items-center justify-center gap-3" },
            React.createElement(Button, { as: "a", href: "#/shop", variant: "secondary" }, "Continue shopping"),
            React.createElement(Button, { as: "a", href: "#/contact" }, "Contact wholesale team")),
        React.createElement("p", { className: "mx-auto mt-8 max-w-md text-center text-[11.5px] leading-relaxed text-faint" }, "This confirmation is stored only in this browser for your reference. Peptalys will also confirm your order by email.")));
}
"use strict";
function AboutPage() {
    return (React.createElement(React.Fragment, null,
        React.createElement("section", { className: "relative overflow-hidden bg-labgrid border-b border-line" },
            React.createElement(Container, { className: "relative py-16 sm:py-24" },
                React.createElement(Eyebrow, null, "About Peptalys"),
                React.createElement("h1", { className: "mt-3 max-w-2xl font-display text-4xl font-bold text-ink sm:text-5xl text-balance" }, "More than peptides \u2014 a supply chain built for research."),
                React.createElement("p", { className: "mt-5 max-w-xl text-[15px] leading-relaxed text-dim" }, "Peptalys is a UK wholesale supplier of high-purity research peptides, founded to give laboratories and research bodies a dependable, well-documented source of the compounds their protocols depend on."))),
        React.createElement("section", { className: "py-16 sm:py-24" },
            React.createElement(Container, { className: "grid grid-cols-1 gap-14 lg:grid-cols-2" },
                React.createElement("div", null,
                    React.createElement(Eyebrow, null, "Our story"),
                    React.createElement("h2", { className: "mt-3 font-display text-2xl font-bold text-ink sm:text-3xl" }, "From a purity problem to a purpose-built supplier."),
                    React.createElement("div", { className: "mt-5 flex flex-col gap-4 text-[14.5px] leading-relaxed text-dim" },
                        React.createElement("p", null, "Peptalys was founded by a small team with a background in peptide synthesis and laboratory procurement, after repeatedly encountering the same problem across research groups: inconsistent purity, unreliable lead times, and suppliers unwilling to work at genuine wholesale volume."),
                        React.createElement("p", null, "We set out to build the opposite \u2014 a UK-based manufacturing and supply operation where every batch is independently HPLC-tested before it ships, pricing is transparent at wholesale scale, and delivery timelines are something research teams can actually plan around."),
                        React.createElement("p", null, "Today, Peptalys supplies a curated catalogue of reference research peptides across metabolic, regenerative, cellular and growth-hormone-axis research \u2014 with the same batch discipline on every single line."))),
                React.createElement("div", { className: "flex flex-col gap-4" }, [
                    { icon: "microscope", title: "UK synthesis", body: "Every compound is synthesised in our UK facility under controlled, documented conditions." },
                    { icon: "shieldCheck", title: "Independent purity testing", body: "Each batch is verified by HPLC to a minimum of 98% purity before release." },
                    { icon: "truck", title: "Reliable UK delivery", body: "Orders confirmed before 2pm ship the same working day, arriving within 3–5 working days nationwide." },
                    { icon: "users", title: "Wholesale-first", body: "Pricing, packaging and minimum order structure are all built around institutional buying, not single-vial retail." },
                ].map((f) => (React.createElement("div", { key: f.title, className: "flex gap-4 rounded-xl border border-line bg-surface/40 p-5" },
                    React.createElement("div", { className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent2" },
                        React.createElement(Icon, { name: f.icon, className: "h-5 w-5" })),
                    React.createElement("div", null,
                        React.createElement("h3", { className: "font-body text-[14px] font-semibold text-ink" }, f.title),
                        React.createElement("p", { className: "mt-1 text-[13px] leading-relaxed text-dim" }, f.body)))))))),
        React.createElement("section", { className: "border-t border-line py-16 sm:py-24" },
            React.createElement(Container, null,
                React.createElement(SectionHeading, { align: "center", eyebrow: "Our process", title: "From synthesis to your bench", className: "mx-auto" }),
                React.createElement("div", { className: "relative mt-14" },
                    React.createElement("div", { className: "absolute left-0 right-0 top-6 hidden h-px bg-line sm:block" }),
                    React.createElement("div", { className: "grid grid-cols-1 gap-8 sm:grid-cols-4" }, [
                        { icon: "flask", title: "Synthesis", body: "Peptides are synthesised in-house to a controlled process specification." },
                        { icon: "microscope", title: "HPLC testing", body: "Every batch is independently tested and verified to ≥98% purity." },
                        { icon: "package", title: "Secure packing", body: "Lyophilised and packed in secure, tamper-evident packaging — stable at ambient temperature, so no cold storage is required." },
                        { icon: "truck", title: "3–5 day delivery", body: "Shipped via tracked courier, arriving within 3–5 working days nationwide." },
                    ].map((s, i) => (React.createElement("div", { key: s.title, className: "relative flex flex-col items-center text-center sm:items-start sm:text-left" },
                        React.createElement("div", { className: "relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-line2 bg-surface text-accent2" },
                            React.createElement(Icon, { name: s.icon, className: "h-5 w-5" })),
                        React.createElement("h3", { className: "mt-4 font-display text-[15px] font-semibold text-ink" }, s.title),
                        React.createElement("p", { className: "mt-1.5 text-[13px] leading-relaxed text-dim" }, s.body)))))))),
        React.createElement("section", { className: "border-t border-line py-16 sm:py-24" },
            React.createElement(Container, { className: "text-center" },
                React.createElement(Eyebrow, null, "Research use policy"),
                React.createElement("h2", { className: "mx-auto mt-3 max-w-2xl font-display text-2xl font-bold text-ink sm:text-3xl text-balance" }, "Every product exists for laboratory research only."),
                React.createElement("p", { className: "mx-auto mt-4 max-w-xl text-[14px] leading-relaxed text-dim" },
                    "Peptalys peptides are not medicines, supplements or cosmetic products. They are supplied exclusively to research bodies, laboratories and qualified institutional buyers for in-vitro and preclinical research. Read our full ",
                    React.createElement("a", { href: "#/legal", className: "text-accent2 underline" }, "research use policy"),
                    "."),
                React.createElement("div", { className: "mt-8 flex flex-wrap items-center justify-center gap-3" },
                    React.createElement(Button, { as: "a", href: "#/shop" }, "Browse the catalogue"),
                    React.createElement(Button, { as: "a", href: "#/contact", variant: "secondary" }, "Speak to our team"))))));
}
"use strict";
function ContactPage() {
    const [form, setForm] = React.useState({ name: "", email: "", company: "", subject: "General enquiry", message: "" });
    const [sent, setSent] = React.useState(false);
    function submit(e) {
        e.preventDefault();
        setSent(true);
        pushToast("Message sent — we'll be in touch within one working day.", { tone: "ok" });
    }
    return (React.createElement(Container, { className: "py-10 sm:py-16" },
        React.createElement(Breadcrumbs, { items: [{ label: "Home", href: "#/" }, { label: "Contact" }] }),
        React.createElement("div", { className: "mt-4 max-w-xl" },
            React.createElement("h1", { className: "font-display text-3xl font-bold text-ink sm:text-4xl" }, "Contact our wholesale team"),
            React.createElement("p", { className: "mt-3 text-[15px] text-dim" }, "Questions about a compound, bulk pricing, or setting up an institutional account \u2014 we typically reply within one working day.")),
        React.createElement("div", { className: "mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_380px]" },
            React.createElement("div", { className: "rounded-2xl border border-line p-6 sm:p-8" }, sent ? (React.createElement(EmptyState, { icon: "check", title: "Message received", body: "Thanks \u2014 a member of the Peptalys wholesale team will get back to you shortly.", action: React.createElement(Button, { variant: "secondary", onClick: () => setSent(false) }, "Send another message") })) : (React.createElement("form", { onSubmit: submit, className: "flex flex-col gap-5" },
                React.createElement("div", { className: "grid grid-cols-1 gap-4 sm:grid-cols-2" },
                    React.createElement("label", { className: "flex flex-col gap-1.5" },
                        React.createElement("span", { className: "text-[12.5px] font-medium text-dim" }, "Full name"),
                        React.createElement("input", { required: true, value: form.name, onChange: (e) => setForm((f) => ({ ...f, name: e.target.value })), className: "rounded-lg border border-line2 bg-surface2 px-3.5 py-2.5 text-[13.5px] text-ink outline-none focus:border-accent2" })),
                    React.createElement("label", { className: "flex flex-col gap-1.5" },
                        React.createElement("span", { className: "text-[12.5px] font-medium text-dim" }, "Email"),
                        React.createElement("input", { required: true, type: "email", value: form.email, onChange: (e) => setForm((f) => ({ ...f, email: e.target.value })), className: "rounded-lg border border-line2 bg-surface2 px-3.5 py-2.5 text-[13.5px] text-ink outline-none focus:border-accent2" }))),
                React.createElement("label", { className: "flex flex-col gap-1.5" },
                    React.createElement("span", { className: "text-[12.5px] font-medium text-dim" }, "Company / institution"),
                    React.createElement("input", { value: form.company, onChange: (e) => setForm((f) => ({ ...f, company: e.target.value })), className: "rounded-lg border border-line2 bg-surface2 px-3.5 py-2.5 text-[13.5px] text-ink outline-none focus:border-accent2" })),
                React.createElement("label", { className: "flex flex-col gap-1.5" },
                    React.createElement("span", { className: "text-[12.5px] font-medium text-dim" }, "Subject"),
                    React.createElement("select", { value: form.subject, onChange: (e) => setForm((f) => ({ ...f, subject: e.target.value })), className: "rounded-lg border border-line2 bg-surface2 px-3.5 py-2.5 text-[13.5px] text-ink outline-none focus:border-accent2" }, ["General enquiry", "Wholesale price list", "Bulk / custom order", "Existing order", "Product & purity question", "Other"].map((s) => React.createElement("option", { key: s }, s)))),
                React.createElement("label", { className: "flex flex-col gap-1.5" },
                    React.createElement("span", { className: "text-[12.5px] font-medium text-dim" }, "Message"),
                    React.createElement("textarea", { required: true, rows: 5, value: form.message, onChange: (e) => setForm((f) => ({ ...f, message: e.target.value })), className: "rounded-lg border border-line2 bg-surface2 px-3.5 py-2.5 text-[13.5px] text-ink outline-none focus:border-accent2" })),
                React.createElement(Button, { type: "submit", size: "lg", className: "self-start" },
                    "Send message ",
                    React.createElement(Icon, { name: "arrowRight", className: "h-4 w-4" }))))),
            React.createElement("aside", { className: "flex flex-col gap-4" },
                React.createElement("div", { className: "rounded-2xl panel p-6" },
                    React.createElement("h2", { className: "font-display text-[15px] font-semibold text-ink" }, "Get in touch"),
                    React.createElement("ul", { className: "mt-4 flex flex-col gap-4" },
                        React.createElement("li", { className: "flex items-start gap-3" },
                            React.createElement(Icon, { name: "mail", className: "mt-0.5 h-4 w-4 text-accent2" }),
                            React.createElement("div", null,
                                React.createElement("p", { className: "text-[13px] text-ink" }, BRAND.email),
                                React.createElement("p", { className: "text-[11.5px] text-faint" }, "Wholesale & order enquiries"))),
                        React.createElement("li", { className: "flex items-start gap-3" },
                            React.createElement(Icon, { name: "phone", className: "mt-0.5 h-4 w-4 text-accent2" }),
                            React.createElement("div", null,
                                React.createElement("p", { className: "text-[13px] text-ink" }, BRAND.phone),
                                React.createElement("p", { className: "text-[11.5px] text-faint" }, "Mon\u2013Fri, 9am\u20135.30pm GMT"))),
                        React.createElement("li", { className: "flex items-start gap-3" },
                            React.createElement(Icon, { name: "mapPin", className: "mt-0.5 h-4 w-4 text-accent2" }),
                            React.createElement("div", null,
                                React.createElement("p", { className: "text-[13px] text-ink" }, BRAND.address))))),
                React.createElement("div", { className: "rounded-2xl border border-line bg-surface/40 p-6" },
                    React.createElement("h2", { className: "font-display text-[15px] font-semibold text-ink" }, "Prefer a full price list?"),
                    React.createElement("p", { className: "mt-2 text-[13px] leading-relaxed text-dim" }, "DM us on Instagram or email the wholesale team for the complete SKU and volume-pricing sheet."),
                    React.createElement("p", { className: "mt-3 flex items-center gap-2 font-mono text-[13px] text-accent2" },
                        React.createElement(Icon, { name: "instagram", className: "h-4 w-4" }),
                        " ",
                        BRAND.instagram))))));
}
"use strict";
function DeliveryPage() {
    return (React.createElement(Container, { className: "py-10 sm:py-16" },
        React.createElement(Breadcrumbs, { items: [{ label: "Home", href: "#/" }, { label: "Delivery" }] }),
        React.createElement("h1", { className: "mt-4 font-display text-3xl font-bold text-ink sm:text-4xl" }, "Delivery Information"),
        React.createElement("p", { className: "mt-3 max-w-2xl text-[15px] leading-relaxed text-dim" }, "All orders are dispatched from our UK facility in secure, tamper-evident packaging via a tracked courier service. Our peptides are lyophilised and shelf-stable at ambient temperature, so they are not shipped in cold storage or refrigerated containers — they simply don't need it."),
        React.createElement("div", { className: "mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3" }, [
            { icon: "clock", title: "Order cut-off", body: "Orders confirmed and paid before 2pm GMT ship the same working day." },
            { icon: "truck", title: "Delivery time", body: "Standard service is 3–5 working days, nationwide across the UK." },
            { icon: "package", title: "Free over £1,000", body: `Delivery is free on orders at or above our ${formatMoney(SETTINGS.minimumOrderValue)} wholesale minimum; otherwise a flat ${formatMoney(SETTINGS.standardDeliveryFee)} applies.` },
        ].map((c) => (React.createElement("div", { key: c.title, className: "rounded-2xl border border-line bg-surface/40 p-6" },
            React.createElement(Icon, { name: c.icon, className: "h-6 w-6 text-accent2" }),
            React.createElement("h3", { className: "mt-4 font-display text-[15px] font-semibold text-ink" }, c.title),
            React.createElement("p", { className: "mt-2 text-[13px] leading-relaxed text-dim" }, c.body))))),
        React.createElement("div", { className: "mt-14 grid grid-cols-1 gap-10 lg:grid-cols-2" },
            React.createElement("div", null,
                React.createElement("h2", { className: "font-display text-xl font-semibold text-ink" }, "Packaging & storage"),
                React.createElement("p", { className: "mt-3 text-[14px] leading-relaxed text-dim" }, "Peptalys peptides are lyophilised (freeze-dried) and stable at ambient temperature throughout transit, so they do not require cold storage or refrigerated shipping \u2014 every order ships in secure, tamper-evident packaging via tracked courier, not a cold storage container. Once received, store each vial according to the temperature stated on its product specification tab."),
                React.createElement("p", { className: "mt-3 text-[14px] leading-relaxed text-dim" }, "Every parcel is fully tracked from dispatch to delivery, and a signature is required on receipt for orders above the wholesale minimum.")),
            React.createElement("div", null,
                React.createElement("h2", { className: "font-display text-xl font-semibold text-ink" }, "Delivery areas & timing"),
                React.createElement("dl", { className: "mt-3 divide-y divide-line rounded-xl border border-line" }, [
                    ["UK Mainland", "3–5 working days"],
                    ["UK Highlands & Islands", "3–5 working days"],
                    ["Northern Ireland", "3–5 working days"],
                    ["EU institutional buyers", "5–7 working days, on request"],
                ].map(([area, time]) => (React.createElement("div", { key: area, className: "flex items-center justify-between px-4 py-3 text-[13.5px]" },
                    React.createElement("span", { className: "text-dim" }, area),
                    React.createElement("span", { className: "font-medium text-ink" }, time))))))),
        React.createElement("div", { className: "mt-14 rounded-2xl border border-line bg-surface/40 p-6" },
            React.createElement("h2", { className: "flex items-center gap-2 font-display text-[15px] font-semibold text-ink" },
                React.createElement(Icon, { name: "info", className: "h-4 w-4 text-accent2" }),
                " Order tracking"),
            React.createElement("p", { className: "mt-2 max-w-2xl text-[13.5px] leading-relaxed text-dim" },
                "Once your order is dispatched, you'll receive tracking details by email at the address given at checkout. For any delivery query, quote your order reference and contact ",
                React.createElement("a", { href: "#/contact", className: "text-accent2 underline" }, "our wholesale team"),
                "."))));
}
"use strict";
function ReturnsPage() {
    return (React.createElement(Container, { className: "py-10 sm:py-16" },
        React.createElement(Breadcrumbs, { items: [{ label: "Home", href: "#/" }, { label: "Returns" }] }),
        React.createElement("h1", { className: "mt-4 font-display text-3xl font-bold text-ink sm:text-4xl" }, "Returns & Quality Guarantee"),
        React.createElement("p", { className: "mt-3 max-w-2xl text-[15px] leading-relaxed text-dim" }, "Because our products are lyophilised research compounds intended for laboratory use, our returns policy is built around quality assurance rather than change-of-mind returns."),
        React.createElement("div", { className: "mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2" },
            React.createElement("div", { className: "rounded-2xl border border-line bg-surface/40 p-6" },
                React.createElement("div", { className: "flex items-center gap-2.5" },
                    React.createElement(Icon, { name: "shieldCheck", className: "h-5 w-5 text-accent2" }),
                    React.createElement("h2", { className: "font-display text-[15px] font-semibold text-ink" }, "Quality guarantee")),
                React.createElement("p", { className: "mt-3 text-[13.5px] leading-relaxed text-dim" }, "Every batch is HPLC-tested to a minimum 98% purity before dispatch. If a product you receive fails to meet its stated specification, or arrives damaged, incorrectly labelled or outside its expected storage condition, we will replace it or issue a full refund \u2014 no questions asked, subject to notifying us within 14 days of delivery.")),
            React.createElement("div", { className: "rounded-2xl border border-line bg-surface/40 p-6" },
                React.createElement("div", { className: "flex items-center gap-2.5" },
                    React.createElement(Icon, { name: "alertTriangle", className: "h-5 w-5 text-accent2" }),
                    React.createElement("h2", { className: "font-display text-[15px] font-semibold text-ink" }, "What we can't accept back")),
                React.createElement("p", { className: "mt-3 text-[13.5px] leading-relaxed text-dim" }, "For laboratory safety and chain-of-custody reasons, we cannot accept the return of any vial once its tamper-evident seal has been broken or the product has left our packaging, unless it is being returned as part of an approved quality claim above."))),
        React.createElement("div", { className: "mt-14" },
            React.createElement("h2", { className: "font-display text-xl font-semibold text-ink" }, "How to raise a claim"),
            React.createElement("div", { className: "mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3" }, [
                { n: "01", title: "Contact us", body: "Email our wholesale team with your order reference and a description of the issue, within 14 days of delivery." },
                { n: "02", title: "Share evidence", body: "Where relevant, include batch/lot numbers, photographs, or a certificate of analysis discrepancy." },
                { n: "03", title: "Resolution", body: "We'll confirm a replacement, credit note or refund — typically within 3 working days of review." },
            ].map((s) => (React.createElement("div", { key: s.n, className: "rounded-2xl border border-line p-6" },
                React.createElement("span", { className: "font-mono text-3xl font-bold text-surface3" }, s.n),
                React.createElement("h3", { className: "mt-3 font-display text-[15px] font-semibold text-ink" }, s.title),
                React.createElement("p", { className: "mt-2 text-[13px] leading-relaxed text-dim" }, s.body))))),
            React.createElement(Button, { as: "a", href: "#/contact", className: "mt-8" },
                "Raise a quality claim ",
                React.createElement(Icon, { name: "arrowRight", className: "h-4 w-4" })))));
}
"use strict";
function LegalPage() {
    const [tab, setTab] = React.useState("research-use");
    const tabs = [
        { id: "research-use", label: "Research Use Policy" },
        { id: "terms", label: "Terms of Wholesale Supply" },
        { id: "privacy", label: "Privacy Policy" },
    ];
    return (React.createElement(Container, { className: "py-10 sm:py-16" },
        React.createElement(Breadcrumbs, { items: [{ label: "Home", href: "#/" }, { label: "Legal" }] }),
        React.createElement("h1", { className: "mt-4 font-display text-3xl font-bold text-ink sm:text-4xl" }, "Legal & Policies"),
        React.createElement("div", { className: "mt-8 flex flex-wrap gap-2 border-b border-line pb-px" }, tabs.map((t) => (React.createElement("button", { key: t.id, onClick: () => setTab(t.id), className: cx("rounded-t-lg px-4 py-2.5 text-[13.5px] font-medium transition-colors", tab === t.id ? "border-b-2 border-accent text-ink" : "text-faint hover:text-dim") }, t.label)))),
        React.createElement("div", { className: "mt-8 max-w-3xl" },
            tab === "research-use" && (React.createElement("div", { className: "flex flex-col gap-5 text-[14px] leading-relaxed text-dim" },
                React.createElement("div", { className: "flex items-start gap-3 rounded-xl border border-amber-500/25 bg-amber-500/5 p-4" },
                    React.createElement(Icon, { name: "alertTriangle", className: "mt-0.5 h-5 w-5 shrink-0 text-amber-300" }),
                    React.createElement("p", { className: "text-amber-100/90" },
                        React.createElement("strong", null, "Research use only."),
                        " Every product listed on this site is sold strictly for laboratory and in-vitro research purposes. Peptalys products are not drugs, medicines, dietary supplements, cosmetics or food products, and are not approved for human or veterinary use.")),
                React.createElement("p", null, "By placing an order, you confirm that:"),
                React.createElement("ul", { className: "ml-5 list-disc space-y-2" },
                    React.createElement("li", null, "You are purchasing on behalf of a genuine research organisation, laboratory, or institution with a legitimate research application for the compound(s) ordered;"),
                    React.createElement("li", null, "You will not administer, apply, inject, ingest, or otherwise introduce any product into a human or animal body;"),
                    React.createElement("li", null, "You will not resell products for human or veterinary consumption, diagnostic, therapeutic, or cosmetic use;"),
                    React.createElement("li", null, "You will handle, store, and dispose of all products in accordance with your institution's laboratory safety protocols and applicable local regulations;"),
                    React.createElement("li", null, "You are of legal age and legally entitled to purchase research chemicals in your jurisdiction.")),
                React.createElement("p", null, "Peptalys reserves the right to refuse or cancel any order where we reasonably believe products are intended for human or veterinary use, or where the buyer cannot demonstrate a legitimate research affiliation."),
                React.createElement("p", null, "The research information presented on product pages describes published and ongoing scientific research into each compound's studied mechanisms. It does not constitute medical advice, and no claims are made regarding safety or efficacy for human use."))),
            tab === "terms" && (React.createElement("div", { className: "flex flex-col gap-5 text-[14px] leading-relaxed text-dim" },
                React.createElement("p", null,
                    React.createElement("strong", { className: "text-ink" }, "Wholesale-only supply."),
                    " Peptalys operates a wholesale supply model with a minimum order value of ",
                    formatMoney(SETTINGS.minimumOrderValue),
                    " (ex. VAT and delivery) per order."),
                React.createElement("p", null,
                    React.createElement("strong", { className: "text-ink" }, "Pricing."),
                    " All prices shown are in GBP and exclude VAT, which is calculated at checkout at the applicable UK rate (",
                    Math.round(SETTINGS.vatRate * 100),
                    "%). Peptalys reserves the right to amend pricing at any time; the price shown at checkout is the price charged."),
                React.createElement("p", null,
                    React.createElement("strong", { className: "text-ink" }, "Order acceptance."),
                    " Submitting an order via this site is a request to purchase, not a binding contract of sale. A contract is formed once Peptalys confirms the order and issues a payment link, and is completed on receipt of payment."),
                React.createElement("p", null,
                    React.createElement("strong", { className: "text-ink" }, "Payment."),
                    " Payment is processed securely via Stripe. Peptalys does not store or have access to full card details at any point."),
                React.createElement("p", null,
                    React.createElement("strong", { className: "text-ink" }, "Title & risk."),
                    " Title to goods passes on receipt of full payment. Risk passes to the buyer on delivery."),
                React.createElement("p", null,
                    React.createElement("strong", { className: "text-ink" }, "Liability."),
                    " Products are supplied \"as researched\" for laboratory use; Peptalys' liability is limited to the value of the order in question, save where liability cannot be excluded by law."))),
            tab === "privacy" && (React.createElement("div", { className: "flex flex-col gap-5 text-[14px] leading-relaxed text-dim" },
                React.createElement("p", null, "Peptalys collects the contact, billing and delivery information you provide when placing an order or contacting our team, solely to process orders, provide customer support, and meet our legal and accounting obligations."),
                React.createElement("p", null, "We do not sell customer data to third parties. Information is shared only with the service providers necessary to fulfil an order (for example, couriers and payment processors) and is retained only as long as required for accounting and legal purposes."),
                React.createElement("p", null,
                    "You may request a copy of the data we hold about you, or ask us to correct or delete it, by contacting ",
                    React.createElement("a", { href: "#/contact", className: "text-accent2 underline" }, "our team"),
                    "."),
                React.createElement("p", { className: "text-[12px] text-faint" }, "This is a summary policy for demonstration purposes; a production deployment should replace it with counsel-reviewed privacy and cookie policies appropriate to your data flows and hosting."))))));
}
"use strict";
const ADMIN_DEMO_CODE = "peptalys-admin";
function useAdminOrders() {
    // localStorage orders placed in THIS browser, merged with clearly-labelled
    // sample orders, so the dashboard always has something real to show.
    const [localOrders, setLocalOrders] = React.useState(() => Orders.list());
    React.useEffect(() => {
        const onStorage = () => setLocalOrders(Orders.list());
        window.addEventListener("storage", onStorage);
        return () => window.removeEventListener("storage", onStorage);
    }, []);
    const all = React.useMemo(() => [...localOrders.map((o) => ({ ...o, sample: false })), ...SAMPLE_ADMIN_ORDERS.map((o) => ({ ...o, sample: true }))], [localOrders]);
    return all;
}
function StatusPill({ status }) {
    const map = {
        paid: { tone: "ok", label: "Paid" },
        awaiting_payment: { tone: "warn", label: "Awaiting payment" },
        cancelled: { tone: "danger", label: "Cancelled" },
        dispatched: { tone: "ok", label: "Dispatched" },
        processing: { tone: "accent", label: "Processing" },
        unfulfilled: { tone: "warn", label: "Unfulfilled" },
    };
    const m = map[status] || { tone: "default", label: status };
    return React.createElement(Badge, { tone: m.tone }, m.label);
}
function AdminGate({ onUnlock }) {
    const [code, setCode] = React.useState("");
    const [error, setError] = React.useState(false);
    function submit(e) {
        e.preventDefault();
        if (code === ADMIN_DEMO_CODE)
            onUnlock();
        else
            setError(true);
    }
    return (React.createElement(Container, { className: "flex min-h-[70vh] items-center justify-center py-16" },
        React.createElement("div", { className: "w-full max-w-sm rounded-2xl panel p-8 text-center" },
            React.createElement("div", { className: "mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent2" },
                React.createElement(Icon, { name: "lock", className: "h-5 w-5" })),
            React.createElement("h1", { className: "mt-4 font-display text-xl font-bold text-ink" }, "Staff sign-in"),
            React.createElement("p", { className: "mt-2 text-[13px] text-dim" }, "Internal dashboard \u2014 demo access code required."),
            React.createElement("form", { onSubmit: submit, className: "mt-6 flex flex-col gap-3" },
                React.createElement("input", { type: "password", value: code, onChange: (e) => { setCode(e.target.value); setError(false); }, placeholder: "Access code", className: cx("rounded-lg border bg-surface2 px-3.5 py-2.5 text-center text-[13.5px] text-ink outline-none", error ? "border-red-500/60" : "border-line2 focus:border-accent2") }),
                error && React.createElement("p", { className: "text-[12px] text-red-300" }, "Incorrect code \u2014 try \"peptalys-admin\""),
                React.createElement(Button, { type: "submit", full: true }, "Enter dashboard")),
            React.createElement("p", { className: "mt-5 text-[11px] leading-relaxed text-faint" }, "Demo gate only \u2014 the access code is shown here deliberately. Production must replace this with real authentication (SSO / magic link) behind a server, not a client-side check."))));
}
function AdminPage() {
    const [unlocked, setUnlocked] = React.useState(false);
    const [tab, setTab] = React.useState("overview");
    const orders = useAdminOrders();
    if (!unlocked)
        return React.createElement(AdminGate, { onUnlock: () => setUnlocked(true) });
    const revenue = orders.filter((o) => o.status === "paid").reduce((s, o) => s + o.total, 0);
    const awaiting = orders.filter((o) => o.status === "awaiting_payment").length;
    const totalUnits = PRODUCTS.reduce((s, p) => s + totalStock(p), 0);
    const customers = {};
    orders.forEach((o) => {
        const key = o.customer.email;
        if (!customers[key])
            customers[key] = { ...o.customer, orders: 0, ltv: 0 };
        customers[key].orders += 1;
        customers[key].ltv += o.total;
    });
    const customerList = Object.values(customers);
    const tabs = [
        { id: "overview", label: "Overview", icon: "trendingUp" },
        { id: "orders", label: "Orders", icon: "clipboard" },
        { id: "products", label: "Products", icon: "package" },
        { id: "customers", label: "Customers", icon: "users" },
        { id: "architecture", label: "Architecture", icon: "globe" },
    ];
    return (React.createElement(Container, { className: "py-10 sm:py-14" },
        React.createElement("div", { className: "flex flex-wrap items-center justify-between gap-4" },
            React.createElement("div", null,
                React.createElement("p", { className: "font-mono text-[11px] uppercase tracking-[0.16em] text-accent2" }, "Internal"),
                React.createElement("h1", { className: "mt-1 font-display text-3xl font-bold text-ink" }, "Admin Dashboard")),
            React.createElement(Button, { variant: "secondary", size: "sm", onClick: () => setUnlocked(false) },
                React.createElement(Icon, { name: "lock", className: "h-3.5 w-3.5" }),
                " Sign out")),
        React.createElement("div", { className: "mt-6 flex gap-1 overflow-x-auto rounded-full border border-line bg-surface/50 p-1" }, tabs.map((t) => (React.createElement("button", { key: t.id, onClick: () => setTab(t.id), className: cx("flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-[13px] font-medium transition-colors", tab === t.id ? "bg-accent text-white" : "text-dim hover:text-ink") },
            React.createElement(Icon, { name: t.icon, className: "h-3.5 w-3.5" }),
            " ",
            t.label)))),
        tab === "overview" && (React.createElement("div", { className: "mt-8" },
            React.createElement("div", { className: "grid grid-cols-2 gap-4 lg:grid-cols-4" }, [
                { label: "Booked revenue", value: formatMoney(revenue), icon: "trendingUp" },
                { label: "Orders awaiting payment", value: String(awaiting), icon: "clock" },
                { label: "Active SKUs", value: String(PRODUCTS.reduce((s, p) => s + p.variants.length, 0)), icon: "package" },
                { label: "Vials in stock", value: totalUnits.toLocaleString("en-GB"), icon: "flask" },
            ].map((k) => (React.createElement("div", { key: k.label, className: "rounded-2xl border border-line bg-surface/40 p-5" },
                React.createElement(Icon, { name: k.icon, className: "h-5 w-5 text-accent2" }),
                React.createElement("p", { className: "mt-3 font-display text-2xl font-bold tnum text-ink" }, k.value),
                React.createElement("p", { className: "mt-1 text-[12px] text-dim" }, k.label))))),
            React.createElement("div", { className: "mt-8 rounded-2xl border border-line" },
                React.createElement("div", { className: "flex items-center justify-between border-b border-line px-5 py-3.5" },
                    React.createElement("h2", { className: "font-display text-[14px] font-semibold text-ink" }, "Recent orders"),
                    React.createElement("button", { onClick: () => setTab("orders"), className: "text-[12px] text-accent2 hover:underline" }, "View all")),
                React.createElement("ul", { className: "divide-y divide-line" }, orders.slice(0, 5).map((o) => (React.createElement("li", { key: o.orderNumber, className: "flex items-center justify-between gap-3 px-5 py-3.5" },
                    React.createElement("div", null,
                        React.createElement("p", { className: "font-mono text-[12.5px] text-ink" }, o.orderNumber),
                        React.createElement("p", { className: "text-[12px] text-faint" }, o.customer.company || o.customer.name)),
                    React.createElement("div", { className: "flex items-center gap-3" },
                        React.createElement("span", { className: "tnum text-[13px] text-ink" }, formatMoney(o.total)),
                        React.createElement(StatusPill, { status: o.status }))))))))),
        tab === "orders" && (React.createElement("div", { className: "mt-8 overflow-x-auto rounded-2xl border border-line" },
            React.createElement("table", { className: "w-full min-w-[760px] text-left" },
                React.createElement("thead", { className: "border-b border-line bg-surface/60" },
                    React.createElement("tr", null, ["Order", "Customer", "Items", "Total", "Payment", "Fulfilment", ""].map((h) => (React.createElement("th", { key: h, className: "px-4 py-3 text-[11px] font-medium uppercase tracking-wide text-faint" }, h))))),
                React.createElement("tbody", { className: "divide-y divide-line" }, orders.map((o) => (React.createElement("tr", { key: o.orderNumber },
                    React.createElement("td", { className: "px-4 py-3.5" },
                        React.createElement("p", { className: "font-mono text-[12.5px] text-ink" }, o.orderNumber),
                        React.createElement("p", { className: "text-[11px] text-faint" }, new Date(o.createdAt).toLocaleDateString("en-GB"))),
                    React.createElement("td", { className: "px-4 py-3.5" },
                        React.createElement("p", { className: "text-[13px] text-ink" }, o.customer.company || o.customer.name),
                        React.createElement("p", { className: "text-[11px] text-faint" }, o.customer.email)),
                    React.createElement("td", { className: "px-4 py-3.5 text-[12.5px] text-dim" },
                        o.lines.reduce((s, l) => s + l.qty, 0),
                        " units"),
                    React.createElement("td", { className: "px-4 py-3.5 tnum text-[13px] font-medium text-ink" }, formatMoney(o.total)),
                    React.createElement("td", { className: "px-4 py-3.5" },
                        React.createElement(StatusPill, { status: o.status })),
                    React.createElement("td", { className: "px-4 py-3.5" },
                        React.createElement(StatusPill, { status: o.fulfilmentStatus })),
                    React.createElement("td", { className: "px-4 py-3.5" }, o.sample && React.createElement(Badge, { tone: "default" }, "Sample"))))))))),
        tab === "products" && (React.createElement("div", { className: "mt-8 overflow-x-auto rounded-2xl border border-line" },
            React.createElement("table", { className: "w-full min-w-[880px] text-left" },
                React.createElement("thead", { className: "border-b border-line bg-surface/60" },
                    React.createElement("tr", null, ["Product", "SKU", "Category", "Variants", "Stock (vials)", "Retail /vial", "RRP /vial", "Wholesale cost /vial", "Margin"].map((h) => (React.createElement("th", { key: h, className: "px-4 py-3 text-[11px] font-medium uppercase tracking-wide text-faint" }, h))))),
                React.createElement("tbody", { className: "divide-y divide-line" }, PRODUCTS.map((p) => {
                    const v = p.variants[0];
                    const margin = Math.round(((v.retailPrice - v.wholesaleCost) / v.retailPrice) * 100);
                    return (React.createElement("tr", { key: p.id },
                        React.createElement("td", { className: "px-4 py-3.5 text-[13px] font-medium text-ink" }, p.name),
                        React.createElement("td", { className: "px-4 py-3.5 font-mono text-[11.5px] text-faint" }, p.sku),
                        React.createElement("td", { className: "px-4 py-3.5 text-[12.5px] text-dim" }, getCategoryName(p.category)),
                        React.createElement("td", { className: "px-4 py-3.5 text-[12.5px] text-dim" }, p.variants.length),
                        React.createElement("td", { className: "px-4 py-3.5 tnum text-[12.5px] text-dim" }, totalStock(p).toLocaleString("en-GB")),
                        React.createElement("td", { className: "px-4 py-3.5 tnum text-[13px] text-ink" }, formatMoney(v.retailPrice)),
                        React.createElement("td", { className: "px-4 py-3.5 tnum text-[12.5px] text-faint" }, formatMoney(v.rrp)),
                        React.createElement("td", { className: "px-4 py-3.5 tnum text-[12.5px] text-amber-300" }, formatMoney(v.wholesaleCost)),
                        React.createElement("td", { className: "px-4 py-3.5 tnum text-[12.5px] text-emerald-300" },
                            margin,
                            "%")));
                }))),
            React.createElement("p", { className: "border-t border-line px-4 py-3 text-[11px] text-faint" }, `Prices above are per vial. The storefront sells in fixed units of ${UNIT_SIZE} vials, so customer-facing prices are these figures \u00d7 ${UNIT_SIZE}. Wholesale cost & margin columns are admin-only \u2014 this data is never fetched or rendered on any customer-facing page.`))),
        tab === "customers" && (React.createElement("div", { className: "mt-8 overflow-x-auto rounded-2xl border border-line" }, customerList.length === 0 ? (React.createElement("div", { className: "p-10" },
            React.createElement(EmptyState, { icon: "users", title: "No customers yet", body: "Customers appear here once orders are placed." }))) : (React.createElement("table", { className: "w-full min-w-[640px] text-left" },
            React.createElement("thead", { className: "border-b border-line bg-surface/60" },
                React.createElement("tr", null, ["Customer", "Company", "Orders", "Lifetime value"].map((h) => React.createElement("th", { key: h, className: "px-4 py-3 text-[11px] font-medium uppercase tracking-wide text-faint" }, h)))),
            React.createElement("tbody", { className: "divide-y divide-line" }, customerList.map((c) => (React.createElement("tr", { key: c.email },
                React.createElement("td", { className: "px-4 py-3.5" },
                    React.createElement("p", { className: "text-[13px] text-ink" }, c.name),
                    React.createElement("p", { className: "text-[11px] text-faint" }, c.email)),
                React.createElement("td", { className: "px-4 py-3.5 text-[12.5px] text-dim" }, c.company || "—"),
                React.createElement("td", { className: "px-4 py-3.5 tnum text-[12.5px] text-dim" }, c.orders),
                React.createElement("td", { className: "px-4 py-3.5 tnum text-[13px] text-ink" }, formatMoney(c.ltv)))))))))),
        tab === "architecture" && React.createElement(AdminArchitectureTab, null)));
}
function AdminArchitectureTab() {
    const flow = ["Stockist / Manufacturer", "Product & Inventory Feed", "Peptalys Database", "Website (this app)", "Customer Order", "Stockist Fulfilment"];
    return (React.createElement("div", { className: "mt-8 flex flex-col gap-8" },
        React.createElement("div", { className: "rounded-2xl border border-line bg-surface/40 p-6" },
            React.createElement("h2", { className: "font-display text-[15px] font-semibold text-ink" }, "Intended production data flow"),
            React.createElement("div", { className: "mt-5 flex flex-wrap items-center gap-2" }, flow.map((f, i) => (React.createElement(React.Fragment, { key: f },
                React.createElement("span", { className: "rounded-full border border-line2 bg-surface2 px-3.5 py-2 font-mono text-[11.5px] text-ink" }, f),
                i < flow.length - 1 && React.createElement(Icon, { name: "arrowRight", className: "h-3.5 w-3.5 text-faint" }))))),
            React.createElement("p", { className: "mt-4 text-[13px] leading-relaxed text-dim" }, ARCHITECTURE_NOTES.dataSource)),
        React.createElement("div", { className: "grid grid-cols-1 gap-6 lg:grid-cols-2" },
            React.createElement("div", { className: "rounded-2xl border border-line p-6" },
                React.createElement("h3", { className: "flex items-center gap-2 font-display text-[14px] font-semibold text-ink" },
                    React.createElement(Icon, { name: "creditCard", className: "h-4 w-4 text-accent2" }),
                    " Payments (Stripe)"),
                React.createElement("p", { className: "mt-3 text-[13px] leading-relaxed text-dim" }, "This build never collects card details and never embeds a Stripe secret key in front-end code. The intended integration:"),
                React.createElement("ol", { className: "mt-3 ml-4 list-decimal space-y-1.5 text-[13px] leading-relaxed text-dim" },
                    React.createElement("li", null,
                        "Checkout submits the order to ",
                        React.createElement("code", { className: "font-mono text-accent2" }, "POST /api/checkout/session"),
                        " on an application server."),
                    React.createElement("li", null,
                        "The server creates a Stripe Checkout Session using ",
                        React.createElement("code", { className: "font-mono text-accent2" }, "STRIPE_SECRET_KEY"),
                        " (env var, never client-side) and the order's line items."),
                    React.createElement("li", null,
                        "The browser is redirected to the returned Stripe-hosted ",
                        React.createElement("code", { className: "font-mono text-accent2" }, "session.url"),
                        "."),
                    React.createElement("li", null,
                        "A ",
                        React.createElement("code", { className: "font-mono text-accent2" }, "/api/webhooks/stripe"),
                        " endpoint verifies the signature and marks the order paid, refunded, or failed."))),
            React.createElement("div", { className: "rounded-2xl border border-line p-6" },
                React.createElement("h3", { className: "flex items-center gap-2 font-display text-[14px] font-semibold text-ink" },
                    React.createElement(Icon, { name: "package", className: "h-4 w-4 text-accent2" }),
                    " Stockist / inventory feed"),
                React.createElement("p", { className: "mt-3 text-[13px] leading-relaxed text-dim" }, ARCHITECTURE_NOTES.dataSource),
                React.createElement("p", { className: "mt-3 text-[13px] leading-relaxed text-dim" },
                    "A scheduled job (CSV, Excel, or API pull) would upsert into a ",
                    React.createElement("code", { className: "font-mono text-accent2" }, "products"),
                    " / ",
                    React.createElement("code", { className: "font-mono text-accent2" }, "variants"),
                    " table using SKU as the natural key \u2014 the exact field set already modelled in every product record on this site.")),
            React.createElement("div", { className: "rounded-2xl border border-line p-6" },
                React.createElement("h3", { className: "flex items-center gap-2 font-display text-[14px] font-semibold text-ink" },
                    React.createElement(Icon, { name: "fileText", className: "h-4 w-4 text-accent2" }),
                    " Order lifecycle"),
                React.createElement("p", { className: "mt-3 text-[13px] leading-relaxed text-dim" }, "Paid order \u2192 order created \u2192 sent to stockist for fulfilment \u2192 dispatch \u2192 customer notified \u2192 completed. Every order record already carries customer, billing/shipping, line items, pricing breakdown, Stripe references and status fields to support this automation.")),
            React.createElement("div", { className: "rounded-2xl border border-line p-6" },
                React.createElement("h3", { className: "flex items-center gap-2 font-display text-[14px] font-semibold text-ink" },
                    React.createElement(Icon, { name: "lock", className: "h-4 w-4 text-accent2" }),
                    " Margin protection"),
                React.createElement("p", { className: "mt-3 text-[13px] leading-relaxed text-dim" },
                    ARCHITECTURE_NOTES.pricing,
                    " In production, wholesale cost should live in a table (or column) that customer-facing API responses never select \u2014 enforced server-side, not just hidden in the UI."))),
        React.createElement("div", { className: "rounded-2xl border border-amber-500/25 bg-amber-500/5 p-6" },
            React.createElement("h3", { className: "flex items-center gap-2 font-display text-[14px] font-semibold text-amber-100" },
                React.createElement(Icon, { name: "info", className: "h-4 w-4" }),
                " How this build was produced"),
            React.createElement("p", { className: "mt-3 text-[13px] leading-relaxed text-amber-100/85" }, "This storefront is built as a dependency-free, statically-hostable app (React + Babel loaded from CDN, no build step) so it can run anywhere immediately. A production rebuild on Next.js/Node with Prisma + Postgres, real Stripe Checkout, and authenticated admin access is the recommended next step \u2014 see the delivery notes for the full handoff."))));
}
"use strict";
const PAGE_TITLES = {
    "/": "Peptalys — Wholesale Research Peptides",
    "/shop": "Shop Research Peptides — Peptalys",
    "/cart": "Your Basket — Peptalys",
    "/checkout": "Checkout — Peptalys",
    "/about": "About — Peptalys",
    "/contact": "Contact — Peptalys",
    "/delivery": "Delivery Information — Peptalys",
    "/returns": "Returns & Quality Guarantee — Peptalys",
    "/legal": "Legal & Policies — Peptalys",
    "/admin": "Admin Dashboard — Peptalys",
};
const PAGE_DESCRIPTIONS = {
    "/": "Peptalys supplies UK-manufactured, HPLC-verified research peptides at wholesale volume — Retatrutide, BPC-157, Tirzepatide, GHK-Cu and more. 3–5 working day delivery. Research use only.",
    "/shop": "Browse the full Peptalys catalogue of research peptides, filterable by category, price and availability. Wholesale supply, UK manufactured.",
    "/about": "Peptalys is a UK wholesale supplier of high-purity research peptides, built for laboratories and research institutions.",
    "/contact": "Get in touch with the Peptalys wholesale team for pricing, bulk orders, or product questions.",
    "/delivery": "3–5 working day UK delivery on Peptalys research peptide orders, dispatched in secure, tamper-evident packaging — no cold storage required.",
    "/returns": "Peptalys' quality guarantee and returns process for research peptide orders.",
    "/legal": "Peptalys research use policy, wholesale terms of supply, and privacy policy.",
};
function setMetaTag(name, content) {
    if (!content)
        return;
    let el = document.querySelector(`meta[name="${name}"]`);
    if (!el) {
        el = document.createElement("meta");
        el.setAttribute("name", name);
        document.head.appendChild(el);
    }
    el.setAttribute("content", content);
}
function setJsonLd(id, data) {
    let el = document.getElementById(id);
    if (!data) {
        if (el)
            el.remove();
        return;
    }
    if (!el) {
        el = document.createElement("script");
        el.type = "application/ld+json";
        el.id = id;
        document.head.appendChild(el);
    }
    el.textContent = JSON.stringify(data);
}
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { error: null };
    }
    static getDerivedStateFromError(error) {
        return { error };
    }
    render() {
        if (this.state.error) {
            return (React.createElement("div", { className: "flex min-h-screen flex-col items-center justify-center gap-4 bg-bg px-6 text-center" },
                React.createElement(Icon, { name: "alertTriangle", className: "h-10 w-10 text-amber-300" }),
                React.createElement("h1", { className: "font-display text-2xl font-bold text-ink" }, "Something went wrong"),
                React.createElement("p", { className: "max-w-sm text-sm text-dim" }, "This section hit an unexpected error. Try reloading the page."),
                React.createElement(Button, { onClick: () => window.location.reload() }, "Reload")));
        }
        return this.props.children;
    }
}
function NotFoundPage() {
    return (React.createElement(Container, { className: "py-24" },
        React.createElement(EmptyState, { icon: "search", title: "Page not found", body: "The page you're looking for doesn't exist or has moved.", action: React.createElement(Button, { as: "a", href: "#/" }, "Back to home") })));
}
function PageRouter() {
    const route = useRoute();
    const { path } = route;
    let params;
    const productMatch = matchPath("/product/:slug", path);
    const categoryMatch = matchPath("/category/:slug", path);
    const product = productMatch ? getProductBySlug(productMatch.slug) : null;
    const category = categoryMatch ? getCategoryBySlug(categoryMatch.slug) : null;
    React.useEffect(() => {
        let title = PAGE_TITLES[path];
        let description = PAGE_DESCRIPTIONS[path];
        let jsonLd = null;
        if (product) {
            title = `${product.name} — ${product.subcategory} | Peptalys`;
            description = product.shortDescription;
            const range = priceRange(product);
            jsonLd = {
                "@context": "https://schema.org",
                "@type": "Product",
                name: product.name,
                sku: product.sku,
                brand: { "@type": "Brand", name: product.brand },
                category: getCategoryName(product.category),
                description: product.shortDescription,
                offers: {
                    "@type": "AggregateOffer",
                    priceCurrency: SETTINGS.currency,
                    lowPrice: range.min,
                    highPrice: range.max,
                    offerCount: product.variants.length,
                    availability: totalStock(product) > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
                },
            };
        }
        else if (category) {
            title = `${category.name} — Peptalys`;
            description = category.description;
        }
        document.title = title || "Peptalys";
        setMetaTag("description", description || PAGE_DESCRIPTIONS["/"]);
        setJsonLd("product-jsonld", jsonLd);
    }, [path, product, category]);
    if (path === "/" || path === "")
        return React.createElement(HomePage, null);
    if (path === "/shop")
        return React.createElement(ShopPage, null);
    if (categoryMatch)
        return React.createElement(ShopPage, { initialCategory: categoryMatch.slug });
    if (productMatch)
        return React.createElement(ProductPage, { slug: productMatch.slug });
    if (path === "/cart")
        return React.createElement(CartPage, null);
    if (path === "/checkout")
        return React.createElement(CheckoutPage, null);
    if ((params = matchPath("/order-confirmation/:orderNumber", path)))
        return React.createElement(ConfirmationPage, { orderNumber: params.orderNumber });
    if (path === "/about")
        return React.createElement(AboutPage, null);
    if (path === "/contact")
        return React.createElement(ContactPage, null);
    if (path === "/delivery")
        return React.createElement(DeliveryPage, null);
    if (path === "/returns")
        return React.createElement(ReturnsPage, null);
    if (path === "/legal")
        return React.createElement(LegalPage, null);
    if (path === "/admin")
        return React.createElement(AdminPage, null);
    return React.createElement(NotFoundPage, null);
}
function App() {
    return (React.createElement(ErrorBoundary, null,
        React.createElement("div", { className: "flex min-h-screen flex-col" },
            React.createElement(Navbar, null),
            React.createElement("main", { id: "main", className: "flex-1" },
                React.createElement(PageRouter, null)),
            React.createElement(Footer, null)),
        React.createElement(CartDrawer, null),
        React.createElement(ToastHost, null)));
}
const rootEl = document.getElementById("root");
const root = ReactDOM.createRoot(rootEl);
root.render(React.createElement(App, null));
window.__peptalysMounted = true;
