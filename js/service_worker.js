var cache_name = 'restaurant-app-index';
var assets = [
    '../',
    '../css/styles.css',
    '../js/dbhelper.js',
    '../js/main.js',
    '../js/restaurant_info.js',
    '../data/restaurants.json',
    '../img/1.jpg',
    '../img/2.jpg',
    '../img/3.jpg',
    '../img/4.jpg',
    '../img/5.jpg',
    '../img/6.jpg',
    '../img/7.jpg',
    '../img/8.jpg',
    '../img/9.jpg',
    '../img/10.jpg',
    '../restaurant.html?id=1',
    '../restaurant.html?id=2',
    '../restaurant.html?id=3',
    '../restaurant.html?id=4',
    '../restaurant.html?id=5',
    '../restaurant.html?id=6',
    '../restaurant.html?id=7',
    '../restaurant.html?id=8',
    '../restaurant.html?id=9',
    '../restaurant.html?id=10'
];

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(cache_name)
        .then((cache) => {
            console.log('Opened cache');
            return cache.addAll(assets);
        })
    );
});

self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys()
        .then((cacheNames) => {
            return Promise.all(
                cacheNames.filter(function(cacheName) {
                    console.log(cacheName);
                    return cacheName.startsWith('review-') &&
                        cacheName != cache_name;
                }).map(function(cacheName) {
                    return caches.delete(cacheName);
                })
            );
        })
    );
});




self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
        .then((response) => {
            return response || fetch(event.request);
        })
    );
});