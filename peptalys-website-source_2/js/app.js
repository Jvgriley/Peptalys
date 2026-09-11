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
  "/": "Peptalys supplies UK-manufactured, HPLC-verified research peptides at wholesale volume — Retatrutide, BPC-157, Tirzepatide, GHK-Cu and more. Next-day dispatch. Research use only.",
  "/shop": "Browse the full Peptalys catalogue of research peptides, filterable by category, price and availability. Wholesale supply, UK manufactured.",
  "/about": "Peptalys is a UK wholesale supplier of high-purity research peptides, built for laboratories and research institutions.",
  "/contact": "Get in touch with the Peptalys wholesale team for pricing, bulk orders, or product questions.",
  "/delivery": "Next-day UK delivery on Peptalys research peptide orders, dispatched in temperature-appropriate, tamper-evident packaging.",
  "/returns": "Peptalys' quality guarantee and returns process for research peptide orders.",
  "/legal": "Peptalys research use policy, wholesale terms of supply, and privacy policy.",
};

function setMetaTag(name, content) {
  if (!content) return;
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
    if (el) el.remove();
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
      return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-bg px-6 text-center">
          <Icon name="alertTriangle" className="h-10 w-10 text-amber-300" />
          <h1 className="font-display text-2xl font-bold text-ink">Something went wrong</h1>
          <p className="max-w-sm text-sm text-dim">This section hit an unexpected error. Try reloading the page.</p>
          <Button onClick={() => window.location.reload()}>Reload</Button>
        </div>
      );
    }
    return this.props.children;
  }
}

function NotFoundPage() {
  return (
    <Container className="py-24">
      <EmptyState icon="search" title="Page not found" body="The page you're looking for doesn't exist or has moved." action={<Button as="a" href="#/">Back to home</Button>} />
    </Container>
  );
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
    } else if (category) {
      title = `${category.name} — Peptalys`;
      description = category.description;
    }

    document.title = title || "Peptalys";
    setMetaTag("description", description || PAGE_DESCRIPTIONS["/"]);
    setJsonLd("product-jsonld", jsonLd);
  }, [path, product, category]);

  if (path === "/" || path === "") return <HomePage />;
  if (path === "/shop") return <ShopPage />;
  if (categoryMatch) return <ShopPage initialCategory={categoryMatch.slug} />;
  if (productMatch) return <ProductPage slug={productMatch.slug} />;
  if (path === "/cart") return <CartPage />;
  if (path === "/checkout") return <CheckoutPage />;
  if ((params = matchPath("/order-confirmation/:orderNumber", path))) return <ConfirmationPage orderNumber={params.orderNumber} />;
  if (path === "/about") return <AboutPage />;
  if (path === "/contact") return <ContactPage />;
  if (path === "/delivery") return <DeliveryPage />;
  if (path === "/returns") return <ReturnsPage />;
  if (path === "/legal") return <LegalPage />;
  if (path === "/admin") return <AdminPage />;
  return <NotFoundPage />;
}

function App() {
  return (
    <ErrorBoundary>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main id="main" className="flex-1">
          <PageRouter />
        </main>
        <Footer />
      </div>
      <CartDrawer />
      <ToastHost />
    </ErrorBoundary>
  );
}

const rootEl = document.getElementById("root");
const root = ReactDOM.createRoot(rootEl);
root.render(<App />);
window.__peptalysMounted = true;
