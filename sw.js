/* 倉衡 offline service worker — app-shell cache */
const CACHE = "cangheng-shell-v1";
const PRECACHE = [
  "./__grok/icon-180.png",
  "./__grok/install/assets/homescreen/glass-puzzle.svg",
  "./__grok/install/assets/homescreen/glass-share.svg",
  "./__grok/install/assets/homescreen/logo-grok.svg",
  "./__grok/install/assets/homescreen/ob-ipad.png",
  "./__grok/install/assets/homescreen/ob-phone.png",
  "./__grok/install/assets/homescreen/plus.svg",
  "./__grok/install/styles.css",
  "./__grok/manifest.webmanifest",
  "./_shell.html",
  "./assets/dashboard-Ch3tiJgE.js",
  "./assets/index-9zT-dW3K.js",
  "./assets/newsreader-latin-500-normal-B66TYsaK.woff2",
  "./assets/newsreader-latin-500-normal-DFwuUcdu.woff",
  "./assets/newsreader-latin-600-normal-30OJ_TG_.woff2",
  "./assets/newsreader-latin-600-normal-DUnT2r2g.woff",
  "./assets/outfit-latin-400-normal-BGsTXAXT.woff2",
  "./assets/outfit-latin-400-normal-DMwTpYkH.woff",
  "./assets/outfit-latin-500-normal-ClnHRwRh.woff",
  "./assets/outfit-latin-500-normal-DKnIMDSk.woff2",
  "./assets/outfit-latin-600-normal-B7SfZ07L.woff2",
  "./assets/outfit-latin-600-normal-BEfTtDA7.woff",
  "./assets/pdf-I99ECLvP.js",
  "./assets/pdf.worker.min--Ao2iAXA.js",
  "./assets/pdf.worker.min-CjEcRF4W.mjs",
  "./assets/routes-BRo8ks0s.js",
  "./assets/styles-jg5_5KzB.css",
  "./favicon.svg",
  "./index.html",
  "./manifest.webmanifest",
  "./sw.js",
  "./workbox-2fbc6a65.js"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(PRECACHE)).then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))),
    ).then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  // SPA navigations: network first, fall back to cached index
  if (req.mode === "navigate") {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put("./index.html", copy));
          return res;
        })
        .catch(() => caches.match("./index.html").then((r) => r || caches.match("/index.html"))),
    );
    return;
  }

  event.respondWith(
    caches.match(req).then((hit) => {
      if (hit) return hit;
      return fetch(req).then((res) => {
        if (res.ok) {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy));
        }
        return res;
      });
    }),
  );
});
