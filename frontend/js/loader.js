// ============================
// LOADER CFC - DESAPARICIÓN AUTOMÁTICA
// ============================

document.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("loader");
  const progressBar = document.getElementById("progress");
  const hero = document.getElementById("inicio");

  let progress = 0;
  const interval = setInterval(() => {
    if (progress < 100) {
      progress += 5;
      progressBar.style.width = progress + "%";
    }
  }, 100);

  // Ocultar loader después de 2,5 segundos
  setTimeout(() => {
    loader.style.transition = "opacity 1s ease";
    loader.style.opacity = "0";
    setTimeout(() => {
      loader.style.display = "none";
      if (hero) {
        hero.classList.add("fade-in-hero");
      }
    }, 1000);
  }, 2500);
});
