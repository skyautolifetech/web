const cacheName = 'alt-v4';
const staticAssets = [
  './a8-13.html',
  './style.css',
  './css/animate.css',
  './css/flaticon.css',
  './css/index.css',
  './css/magnific-popup.css',
  './fonts/flaticon.eot',
  './fonts/flaticon.svg',
  './fonts/flaticon.ttf',
  './fonts/flaticon.woff',
  './fonts/flaticon.woff2',
  './media/img/40.webp',
  './media/img/50.webp',
  './media/img/66.webp',
  './media/img/banner_03.png',
  './media/img/bg-01.jpg',
  './media/img/plan1.jpg',
  './media/img/ico/apple-touch-icon.png',
  './media/img/ico/apple-touch-icon-120x120.png',
  './media/img/ico/apple-touch-icon-152x152.png',
  './media/img/ico/favicon.ico',
  './media/img/ico/whatsAppLogo.webp',
  './media/svg/front_c_v5.svg',
  './media/svg/room_a_v4.svg',
  './media/video/fpold1.mp4',
  './media/video/testintro1.mp4',
  './main.js',
];
self.addEventListener('install', async e => {
  const cache = await caches.open(cacheName);
  await cache.addAll(staticAssets);
  return self.skipWaiting();
});

self.addEventListener('activate', e => {
  self.clients.claim();
});

self.addEventListener('fetch', async e => {
  const req = e.request;
  const url = new URL(req.url);

  if (url.origin === location.origin) {
    e.respondWith(cacheFirst(req));
  } else {
    e.respondWith(networkAndCache(req));
  }
});

async function cacheFirst(req) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(req);
  return cached || fetch(req);
}

async function networkAndCache(req) {
  const cache = await caches.open(cacheName);
  try {
    const fresh = await fetch(req);
    await cache.put(req, fresh.clone());
    return fresh;
  } catch (e) {
    const cached = await cache.match(req);
    return cached;
  }
}