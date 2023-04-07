self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('cache-v1').then((cache) => {
            return cache.addAll([
                '/',
                '/index.html',
                '/static/js/bundle.js',
                '/static/js/main.chunk.js',
                '/static/js/0.chunk.js',
                '/static/css/main.chunk.css',
                '/favicon.ico',
                '/logo192.png',
                '/logo512.png',
            ]);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            if (response) {
                return response;
            }
            return fetch(event.request);
        })
    );
});
