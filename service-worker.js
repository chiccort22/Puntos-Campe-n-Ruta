const PREFIX = 'campeon-ruta-' + self.registration.scope;
const CACHE = PREFIX + 'v1';
const ASSETS = ["./", "./index.html", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png", "./icon-maskable-512.png", "./apple-touch-icon.png", "./assets/pxiEyp8kv8JHgFVrFJA.ttf", "./assets/pxiByp8kv8JHgFVrLGT9V1s.ttf", "./assets/pxiByp8kv8JHgFVrLCz7V1s.ttf", "./assets/pxiByp8kv8JHgFVrLEj6V1s.ttf", "./assets/tailwind.js", "./assets/poppins.css", "./assets/pxiByp8kv8JHgFVrLDD4V1s.ttf"];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith(PREFIX) && key !== CACHE).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET' || !req.url.startsWith(self.registration.scope)) return;
  if (req.mode === 'navigate') {
    event.respondWith(fetch(req).then(response => {
      if (!response.ok) throw new Error('HTTP ' + response.status);
      return response;
    }).catch(() => caches.match(new URL('./index.html', self.registration.scope))));
  } else {
    event.respondWith(caches.match(req).then(cached => cached || fetch(req)));
  }
});
