// ============================
// CACHE.JS - MODO OFFLINE INTELIGENTE (CAMPUS CFC TRADING)
// ============================

self.addEventListener('install', e => {
  console.log('📦 Instalando Service Worker del Campus CFC...');
  e.waitUntil(
    caches.open('cfc-cache-v1').then(cache => {
      return cache.addAll([
        '/', 
        '/frontend/index.html',
        '/frontend/css/premium.css',
        '/frontend/css/glass.css',
        '/frontend/js/menu.js',
        '/frontend/js/theme.js',
        '/frontend/js/loader.js',
        '/frontend/js/progress.js'
      ]);
    })
  );
});

// Activación del cache
self.addEventListener('activate', e => {
  console.log('✅ CFC cache activo y listo');
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== 'cfc-cache-v1').map(k => caches.delete(k))
      )
    )
  );
});

// Intercepción de peticiones (modo offline)
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );
});
