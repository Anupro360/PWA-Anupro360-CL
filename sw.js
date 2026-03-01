const CACHE_NAME = 'anupro360-v1';
const assets = [
  '/',
  '/index.html',
  '/styles.css',
  '/main.js',
  '/imagotipoblanco.webp',
  '/favicon.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(assets)));
});

self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)));
});