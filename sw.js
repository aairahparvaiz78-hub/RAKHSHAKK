const CACHE = 'rakhshak-v10';
const SHELL = [
  './', './index.html', './dashboard.html', './disaster-map.html', './village-risk.html',
  './sos-rescue.html', './teams-vehicles.html', './offline-communication.html',
  './reports-history.html', './public-alerts.html', './manifest.webmanifest',
  './styles.css?v=10', './app.js?v=10', './shared/shell.js?v=10',
  './assets/flood-community.png', './pages/home.js?v=10', './pages/dashboard.js?v=10',
  './pages/disaster-map.js?v=10', './pages/village-risk.js?v=10', './pages/sos-rescue.js?v=10',
  './pages/teams-vehicles.js?v=10', './pages/offline-communication.js?v=10',
  './pages/reports-history.js?v=10', './pages/public-alerts.js?v=10'
];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(SHELL)));
  self.skipWaiting();
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key)))));
  self.clients.claim();
});
self.addEventListener('fetch', event => {
  if (new URL(event.request.url).pathname.startsWith('/api/')) return;
  if (event.request.method !== 'GET') return;
  event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
    if (response.ok && new URL(event.request.url).origin === self.location.origin) {
      const copy = response.clone();
      caches.open(CACHE).then(cache => cache.put(event.request, copy));
    }
    return response;
  }).catch(() => caches.match('./index.html'))));
});