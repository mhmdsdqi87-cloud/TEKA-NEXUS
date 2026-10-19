// TEKA NEXUS service worker — minimal, safe, production-only.
// Strategy: network-first passthrough with a tiny offline shell fallback.
// Never caches API responses (always live), never caches POSTs.

const CACHE = "teka-shell-v1";
const SHELL = ["/", "/manifest.webmanifest", "/favicon.svg", "/icons/icon-192.png"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  if (url.pathname.startsWith("/api/")) return; // APIs are always live

  event.respondWith(
    fetch(req)
      .then((res) => {
        // refresh shell cache for same-origin navigations & static assets
        if (res && res.ok && (req.mode === "navigate" || url.pathname.startsWith("/icons/") || url.pathname.startsWith("/_next/static/"))) {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy));
        }
        return res;
      })
      .catch(() =>
        caches.match(req).then(
          (hit) =>
            hit ||
            (req.mode === "navigate"
              ? caches.match("/")
              : Promise.reject(new Error("offline")))
        )
      )
  );
});
