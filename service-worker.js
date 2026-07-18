const CACHE_NAME = 'seda-cache-v1';
const urlsToCache = [
    './',
    '.index.html',
    './manifest.json',
    './SEDA-SIN-FONDO.png',
    './WhatsApp.png',
    './facebook.png',
    './Instagram.png',
    './TikTok.png',
    './Threads_(app).png',
    './Letrero Publicitario.png',
    './Antes y Después 1.png',
    './Antes y Después 2.png',
    './Antes y Después 3.png',
    './Samsung - Aspiradora de Polvo.jpeg',
    './Karcher K3 - Hidrolavadora.jpeg',
    './Karcher SC"-Vaporizadora.jpeg',
    './Karcher SE 4 - Aspiradora de Agua.jpeg',
    './Personaje SEDA - Ahorro Agua.png',
    './Personaje SEDA - Ahorro Electricidad.png'
];

// Instalar Service Worker
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => {
            console.log('Cache abierto');
        })
    );
});

// Activar Service Worker
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cachesNames => {
            return Promise.all(
                cachesNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                  })
                 );
               })
              );
            });

// Interceptar peticiones
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
        .then(response => {
            if (response) {
                return response;
            }
            return fetch(event.request);
        })
    );
});