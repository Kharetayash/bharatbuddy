/* BharatBuddy service worker — cache-first with network fallback */
const CACHE = 'bharatbuddy-v1';
const ASSETS = [
  './',
  './bharatbuddy.html',
  './bharatbuddy.js',
  './manifest.webmanifest'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)).catch(() => {}));
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.open(CACHE).then(cache =>
      cache.match(event.request).then(hit => hit ||
        fetch(event.request).then(resp => {
          try { cache.put(event.request, resp.clone()); } catch(_) {}
          return resp;
        }).catch(() => caches.match('./bharatbuddy.html'))
      )
    )
  );
});
