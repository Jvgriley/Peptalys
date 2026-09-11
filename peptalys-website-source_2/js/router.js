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
  } else {
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
  if (patternParts.length !== pathParts.length) return null;
  const params = {};
  for (let i = 0; i < patternParts.length; i++) {
    const pp = patternParts[i];
    if (pp.startsWith(":")) {
      params[pp.slice(1)] = decodeURIComponent(pathParts[i]);
    } else if (pp !== pathParts[i]) {
      return null;
    }
  }
  return params;
}
