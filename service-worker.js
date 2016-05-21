//https://mobiforge.com/design-development/taking-web-offline-service-workers
// A list of paths to cache
var paths = [
    '/',
    '/index.html',
    '/manifest.json',
    '/phraselist.js',
    '/samaritan.js',
    '/jquery-1.11.0.min.js',
    '/screenfull.min.js',
    '/service-worker.js',
    '/style.css',
    '/font/magdacleanmono-bold.ttf',
    '/img/icon.png'
];

self.addEventListener('install', function(event) {
    console.log("install");
    event.waitUntil(
        caches.open('offline-v1')
        .then(function(cache) {
            return cache.addAll(paths);
        })
    );
    event.waitUntil(self.skipWaiting());
});

self.addEventListener('fetch', function(event) {
    console.log("fetch");
    // Cache, then network, then fallback for other urls
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        }).catch(function() {
            //return caches.match('/page/content-not-available-offline');
        })
    );
});
