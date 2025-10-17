// ============================
// PROGRESS BAR CFC TRADING
// ============================

document.addEventListener("DOMContentLoaded", () => {
  const progressBar = document.getElementById("progress");
  const progressText = document.createElement("span");

  // Añadir texto dinámico dentro del contenedor
  progressText.id = "progress-text";
  progressText.style.position = "absolute";
  progressText.style.top = "50%";
  progressText.style.left = "50%";
  progressText.style.transform = "translate(-50%, -50%)";
  progressText.style.color = "#d4af37";
  progressText.style.fontSize = "0.9rem";
  progressText.style.fontFamily = "Poppins, sans-serif";
  document.getElementById("progress-container").appendChild(progressText);

  let progress = 0;
  const interval = setInterval(() => {
    if (progress < 100) {
      progress += 5;
      progressBar.style.width = progress + "%";
      progressText.textContent = progress + "%";
    } else {
      clearInterval(interval);
    }
  }, 100);
});
