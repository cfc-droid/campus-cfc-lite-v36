// =============================================
// CACHE.JS — MODO OFFLINE INTELIGENTE (CAMPUS CFC TRADING)
// =============================================

const CACHE_NAME = 'cfc-cache-v1';
const RECURSOS_ESENCIALES = [
  '/',
  '/frontend/index.html',
  '/frontend/css/premium.css',
  '/frontend/js/exam.js'
];

// INSTALACIÓN DEL SERVICE WORKER
self.addEventListener('install', (e) => {
  console.log('⚙️ Instalando Service Worker del Campus CFC...');
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('📦 Guardando recursos esenciales en cache...');
      return cache.addAll(RECURSOS_ESENCIALES);
    })
  );
});

// ACTIVACIÓN DEL SERVICE WORKER
self.addEventListener('activate', (e) => {
  console.log('🚀 CFC cache activo y listo');
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
});

// INTERCEPCIÓN DE PETICIONES (MODO OFFLINE)
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
