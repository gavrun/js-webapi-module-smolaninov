const CACHE_NAME = 'demo-cache-v1';

const PRECACHE_URLS = [
    './',
    './index.html',
    './style.css',
    './main.js',
    './offline.html'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(PRECACHE_URLS))
    );
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(keys.map(k => (k !== CACHE_NAME ? caches.delete(k) : Promise.resolve())))
        )
    );
    self.clients.claim();
});

self.addEventListener('fetch', (event) => {
    const req = event.request;

    if (req.mode === 'navigate') {
        event.respondWith(
            fetch(req)
                .then((res) => {
                    return res;
                })
                .catch(async () => {
                    const cache = await caches.open(CACHE_NAME);
                    const fallback = await cache.match('./offline.html');
                    return fallback || Response.error();
                })
        );
        return;
    }

    event.respondWith(
        caches.match(req).then((cached) => {
            if (cached) return cached;
            return fetch(req).then((res) => {
                if (req.method === 'GET' && res && res.status === 200 && res.type !== 'opaque') {
                    const resClone = res.clone();
                    caches.open(CACHE_NAME).then((cache) => cache.put(req, resClone));
                }
                return res;
            }).catch(() => {
                return cached;
            });
        })
    );
});
