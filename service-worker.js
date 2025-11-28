const CACHE_NAME = 'christmas-puzzle-v2';
const ASSETS = [
  './',
  './index.html',
  './christmas.jpg',
  './icon-192.png',
  './icon-512.png',
  './manifest.json'
];

// 설치 단계
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// 오래된 캐시 삭제
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))
    )
  );
  self.clients.claim();
});

// fetch 시 캐시 우선 제공
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(res => res || fetch(event.request))
  );
});
