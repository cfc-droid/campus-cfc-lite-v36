// ============================
// MENU.JS - NAVEGACIÓN ENTRE MÓDULOS
// ============================

document.addEventListener("DOMContentLoaded", () => {
  const enlaces = document.querySelectorAll("a[data-module]");
  const titulo = document.querySelector("h1");
  const main = document.querySelector("main");

  enlaces.forEach(enlace => {
    enlace.addEventListener("click", e => {
      e.preventDefault();
      const modulo = enlace.getAttribute("data-module");
      main.innerHTML = `<p>Cargando módulo ${modulo}...</p>`;
      setTimeout(() => {
        window.location.href = `/frontend/modules/${modulo}/index.html`;
      }, 800);
    });
  });

  console.log("📘 Navegación entre módulos activa");
});
