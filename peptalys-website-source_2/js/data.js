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
  email: "wholesale@peptalys.co.uk",
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
  deliveryPromise: "Next working day, nationwide, on orders placed before 2pm.",
};

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
    images: [{ type: "vial", accent: "#2F8FFF", label: "RETA" }, { type: "molecule", accent: "#6DD1FF" }, { type: "vialGroup", accent: "#2F8FFF" }],
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
    images: [{ type: "vial", accent: "#6DD1FF", label: "TIRZ" }, { type: "molecule", accent: "#2F8FFF" }, { type: "vialGroup", accent: "#6DD1FF" }],
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
    images: [{ type: "vial", accent: "#2F8FFF", label: "BPC" }, { type: "anatomy", accent: "#2F8FFF" }, { type: "vialGroup", accent: "#6DD1FF" }],
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
    images: [{ type: "vial", accent: "#6DD1FF", label: "TB-500" }, { type: "molecule", accent: "#6DD1FF" }, { type: "vialGroup", accent: "#2F8FFF" }],
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
    images: [{ type: "vial", accent: "#E8C27A", label: "GHK-Cu" }, { type: "molecule", accent: "#E8C27A" }, { type: "vialGroup", accent: "#6DD1FF" }],
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
    images: [{ type: "vial", accent: "#6DD1FF", label: "MOTS-C" }, { type: "atom", accent: "#6DD1FF" }, { type: "vialGroup", accent: "#2F8FFF" }],
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
    images: [{ type: "vial", accent: "#2F8FFF", label: "NAD+" }, { type: "molecule", accent: "#2F8FFF" }, { type: "vialGroup", accent: "#6DD1FF" }],
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
    images: [{ type: "vial", accent: "#6DD1FF", label: "IPAM" }, { type: "anatomy", accent: "#6DD1FF" }, { type: "vialGroup", accent: "#2F8FFF" }],
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
    images: [{ type: "vial", accent: "#2F8FFF", label: "AOD" }, { type: "anatomy", accent: "#2F8FFF" }, { type: "vialGroup", accent: "#6DD1FF" }],
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
  { icon: "truck", title: "Next Day Delivery", body: "Fast, secure, temperature-appropriate courier — nationwide." },
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
  images: "Product imagery is procedurally illustrated (SVG) as a stand-in for real photography — swap `product.images` for a CDN image array once the stockist feed supplies product shots.",
  pricing: "wholesaleCost is never rendered on any customer-facing page — only /admin reads it — so margin stays internal.",
};
