// =======================================================
// CACHE.JS — MODO OFFLINE INTELIGENTE (CAMPUS CFC LITE V1.4)
// =======================================================

const CACHE_NAME = "cfc-cache-v1.4";
const RECURSOS_ESENCIALES = [
  "/frontend/index.html",
  "/frontend/css/premium.min.css",
  "/frontend/css/loader.css",
  "/frontend/js/loader.js",
  "/frontend/js/progress.js",
  "/frontend/js/menu.js",
  "/frontend/js/theme.js",
  "/frontend/fonts/Poppins-Regular.woff2",
  "/frontend/fonts/Poppins-Bold.woff2",
  "/frontend/modules/1/index.html",
  "/frontend/modules/2/index.html",
  "/frontend/modules/3/index.html"
];

// =============================
// INSTALACIÓN DEL SERVICE WORKER
// =============================
self.addEventListener("install", event => {
  console.log("⚙️ Instalando Service Worker del Campus CFC...");
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log("📦 Cacheando recursos esenciales...");
      return cache.addAll(RECURSOS_ESENCIALES);
    })
  );
  self.skipWaiting();
});

// =============================
// ACTIVACIÓN Y LIMPIEZA DE CACHE ANTIGUO
// =============================
self.addEventListener("activate", event => {
  console.log("✅ Service Worker activo y listo.");
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            console.log("🧹 Eliminando cache viejo:", key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// =============================
// INTERCEPCIÓN DE PETICIONES (MODO OFFLINE)
// =============================
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      // Si existe en cache, usarlo
      if (response) {
        console.log("⚡ Cargando desde cache:", event.request.url);
        return response;
      }

      // Si no, intentar obtenerlo de la red
      return fetch(event.request)
        .then(networkResponse => {
          // Validar respuesta válida
          if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== "basic") {
            return networkResponse;
          }

          // Clonar y almacenar en cache para futuro uso
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          });

          return networkResponse;
        })
        .catch(() => {
          // Si no hay red, mostrar el index en modo offline
          console.warn("🌐 Sin conexión, mostrando versión offline...");
          return caches.match("/frontend/index.html");
        });
    })
  );
});
