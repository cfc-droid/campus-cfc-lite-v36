// ============================
// THEME.JS - MODO DÍA / NOCHE CAMPUS CFC
// ============================

document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.createElement("button");
  toggle.id = "theme-toggle";
  toggle.textContent = "🌙";
  toggle.style.position = "fixed";
  toggle.style.top = "10px";
  toggle.style.right = "10px";
  toggle.style.border = "none";
  toggle.style.background = "var(--gold)";
  toggle.style.color = "var(--dark)";
  toggle.style.borderRadius = "50%";
  toggle.style.padding = "8px";
  toggle.style.cursor = "pointer";
  toggle.style.zIndex = "9999";
  document.body.appendChild(toggle);

  const aplicarTema = (tema) => {
    if (tema === "dark") {
      document.body.style.backgroundColor = "#0a0a0a";
      document.body.style.color = "#f2f2f2";
      toggle.textContent = "☀️";
    } else {
      document.body.style.backgroundColor = "#ffffff";
      document.body.style.color = "#000000";
      toggle.textContent = "🌙";
    }
    localStorage.setItem("tema", tema);
  };

  let temaGuardado = localStorage.getItem("tema") || "light";
  aplicarTema(temaGuardado);

  toggle.addEventListener("click", () => {
    temaGuardado = temaGuardado === "light" ? "dark" : "light";
    aplicarTema(temaGuardado);
  });

  console.log("🌓 Alternancia día/noche activa");
});
