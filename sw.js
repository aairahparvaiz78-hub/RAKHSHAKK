<<<<<<< HEAD
const CACHE = 'Rakshak-v9';
=======
const CACHE = 'rakhshak-v11';
>>>>>>> c6fb400426897a8e758b31e8f6b9f88e8ec9a94a
const SHELL = [
  './', './index.html', './dashboard.html', './disaster-map.html', './village-risk.html',
  './sos-rescue.html', './teams-vehicles.html', './offline-communication.html',
  './reports-history.html', './public-alerts.html', './manifest.webmanifest',
  './styles.css?v=11', './app.js?v=11', './shared/i18n.js?v=11', './shared/shell.js?v=11',
  './assets/flood-community.png', './pages/home.js?v=11', './pages/dashboard.js?v=11',
  './pages/disaster-map.js?v=11', './pages/village-risk.js?v=11', './pages/sos-rescue.js?v=11',
  './pages/teams-vehicles.js?v=11', './pages/offline-communication.js?v=11',
  './pages/reports-history.js?v=11', './pages/public-alerts.js?v=11'
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