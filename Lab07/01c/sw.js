const CACHE_VERSION = 'v1';
const API_URL = 'https://jsonplaceholder.typicode.com/todos/1';

self.addEventListener('install', () => {
    self.skipWaiting();
});

self.addEventListener('activate', (e) => {
    e.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (e) => {
    const { request } = e;
    if (request.url === API_URL) {
        e.respondWith(handleApiCall(request));
    }
});

async function handleApiCall(request) {
    const cache = await caches.open(CACHE_VERSION);

    try {
        const netRes = await fetch(request);
        cache.put(request, netRes.clone());
        return netRes;
    }
    catch (error) {
        const cached = await cache.match(request);
        if (cached) return cached;

        return new Response(
            JSON.stringify({ offline: true, message: 'no cached data yet' }),
            { headers: { 'Content-Type': 'application/json' }, status: 503 }
        );
    }
}
