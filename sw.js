/* ═══════════════════════════════════════════════
   MASAR v10 — Service Worker
   Offline Support + Smart Caching
   ═══════════════════════════════════════════════ */

const CACHE_VERSION = 'v10.0.0';
const CACHE_STATIC = `masar-static-${CACHE_VERSION}`;
const CACHE_DYNAMIC = `masar-dynamic-${CACHE_VERSION}`;
const CACHE_API = `masar-api-${CACHE_VERSION}`;

/* ═══ Assets للـ Cache الأساسي ═══ */
const STATIC_ASSETS = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './config.js',
  './manifest.json',
  './logo.png',
  './science.jpg',
  './MS.jpg',
  './FFS.jpg',
  './QS.jpg',
  './1.jpg',
  './2.jpg',
  './3.jpg',
  './4.jpg',
  './5.jpg',
  './6.jpg',
];

/* ═══ CDN Libraries للـ Cache ═══ */
const CDN_ASSETS = [
  'https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&family=Amiri:wght@400;700&family=Poppins:wght@500;600;700;800;900&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css',
  'https://unpkg.com/aos@2.3.4/dist/aos.css',
  'https://unpkg.com/aos@2.3.4/dist/aos.js',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js',
  'https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js',
  'https://cdn.jsdelivr.net/npm/tsparticles@2.12.0/tsparticles.bundle.min.js',
];

/* ═══ APIs مش بتتعمل cache ثابت ═══ */
const API_HOSTS = [
  'api.aladhan.com',
  'api.open-meteo.com',
  'www.thesportsdb.com',
  'api.groq.com',
];

/* ═══ Install ═══ */
self.addEventListener('install', (event) => {
  console.log('🔄 MASAR SW: Installing v10...');
  event.waitUntil(
    Promise.all([
      caches.open(CACHE_STATIC).then(cache =>
        cache.addAll(STATIC_ASSETS).catch(err => console.warn('Static cache warning:', err))
      ),
      caches.open(CACHE_DYNAMIC).then(cache =>
        Promise.all(CDN_ASSETS.map(url =>
          fetch(url, { mode: 'cors' })
            .then(res => res.ok ? cache.put(url, res) : null)
            .catch(() => null)
        ))
      ),
    ]).then(() => self.skipWaiting())
  );
});

/* ═══ Activate ═══ */
self.addEventListener('activate', (event) => {
  console.log('✅ MASAR SW: Activated v10');
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => !k.includes(CACHE_VERSION)).map(k => {
          console.log('🗑️ حذف كاش قديم:', k);
          return caches.delete(k);
        })
      ))
      .then(() => self.clients.claim())
  );
});

/* ═══ Fetch Strategy ═══ */
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);

  // Ignore non-http(s)
  if (!url.protocol.startsWith('http')) return;

  // API — Network First (مع fallback للكاش)
  if (API_HOSTS.some(h => url.hostname.includes(h))) {
    event.respondWith(networkFirstWithCache(req, CACHE_API, 5 * 60 * 1000));
    return;
  }

  // CDN + Fonts — Cache First
  if (url.hostname.includes('cdn') || url.hostname.includes('unpkg') ||
      url.hostname.includes('jsdelivr') || url.hostname.includes('fonts')) {
    event.respondWith(cacheFirstWithNetwork(req, CACHE_DYNAMIC));
    return;
  }

  // Local Assets — Stale While Revalidate
  if (url.origin === self.location.origin) {
    event.respondWith(staleWhileRevalidate(req, CACHE_STATIC));
    return;
  }

  // Fallback
  event.respondWith(fetch(req).catch(() => caches.match(req)));
});

/* ═══ Strategies ═══ */

// Network First — APIs
async function networkFirstWithCache(req, cacheName, maxAge = 0) {
  try {
    const res = await fetch(req);
    if (res && res.status === 200) {
      const cache = await caches.open(cacheName);
      const headers = new Headers(res.headers);
      if (maxAge > 0) headers.set('sw-cache-time', Date.now().toString());
      const cloned = new Response(await res.clone().blob(), { status: res.status, statusText: res.statusText, headers });
      cache.put(req, cloned);
    }
    return res;
  } catch (err) {
    const cached = await caches.match(req);
    if (cached) return cached;
    return new Response(
      JSON.stringify({ error: 'offline', message: 'محتاج نت للخدمة دي' }),
      { status: 503, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

// Cache First — CDN
async function cacheFirstWithNetwork(req, cacheName) {
  const cached = await caches.match(req);
  if (cached) return cached;
  try {
    const res = await fetch(req);
    if (res && res.status === 200) {
      const cache = await caches.open(cacheName);
      cache.put(req, res.clone());
    }
    return res;
  } catch (err) {
    return new Response('', { status: 503 });
  }
}

// Stale While Revalidate — Local
async function staleWhileRevalidate(req, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(req);
  const fetchPromise = fetch(req).then(res => {
    if (res && res.status === 200 && res.type === 'basic') {
      cache.put(req, res.clone());
    }
    return res;
  }).catch(() => cached);
  return cached || fetchPromise;
}

/* ═══ Push Notifications ═══ */
self.addEventListener('push', (event) => {
  let data = { title: 'مسار', body: 'عندك إشعار جديد 💫' };
  if (event.data) {
    try { data = { ...data, ...event.data.json() }; }
    catch (e) { data.body = event.data.text(); }
  }
  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: './logo.png',
      badge: './logo.png',
      vibrate: [200, 100, 200],
      dir: 'rtl',
      lang: 'ar',
      tag: data.tag || 'masar-default',
      renotify: true,
      requireInteraction: data.requireInteraction || false,
      data: { url: data.url || './' },
    })
  );
});

/* ═══ Notification Click ═══ */
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const targetUrl = event.notification.data?.url || './';
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
      for (const client of list) {
        if (client.url.includes(self.location.origin) && 'focus' in client) {
          client.navigate(targetUrl);
          return client.focus();
        }
      }
      if (self.clients.openWindow) return self.clients.openWindow(targetUrl);
    })
  );
});

/* ═══ Message from main thread ═══ */
self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting();
  if (event.data === 'CLEAR_CACHE') {
    caches.keys().then(keys => Promise.all(keys.map(k => caches.delete(k))));
  }
});

console.log('%c🚀 MASAR SW v10 ready', 'color:#f97316;font-weight:bold');