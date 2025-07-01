const cacheName = 'alt-v1';
const staticAssets = [
  './a8-12.html',
  './res/style.css',
  './res/css/animate.css',
  './res/css/flaticon.css',
  './res/css/index.css',
  './res/css/magnific-popup.css',
  './res/fonts/flaticon.eot',
  './res/fonts/flaticon.svg',
  './res/fonts/flaticon.ttf',
  './res/fonts/flaticon.woff',
  './res/fonts/flaticon.woff2',
  './res/media/img/40.webp',
  './res/media/img/50.webp',
  './res/media/img/66.webp',
  './res/media/img/banner_03.png',
  './res/media/img/bg-01.jpg',
  './res/media/img/plan1.jpg',
  './res/media/img/ico/apple-touch-icon.png',
  './res/media/img/ico/favicon.ico',
  './res/media/img/ico/whatsAppLogo.webp',
  './res/media/svg/front_c_v5.svg',
  './res/media/svg/room_a_v4.svg',
  './res/media/video/fpold1.mp4',
  './res/media/video/testintro1.mp4',
  './res/scripts/custom.js',
  './res/scripts/index.js',
  './res/scripts/jquery-3.7.0.min.js',
  './res/scripts/jquery.magnific-popup.min.js',
  './res/scripts/wow.js',
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