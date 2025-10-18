// ===================================
// PROGRESS BAR CFC TRADING
// ===================================

document.addEventListener("DOMContentLoaded", () => {
  const progressBar = document.getElementById("progress");
  const progressContainer = document.getElementById("progress-container");

  // Crear texto dinámico
  const progressText = document.createElement("span");
  progressText.id = "progress-text";
  progressText.style.position = "absolute";
  progressText.style.top = "50%";
  progressText.style.left = "50%";
  progressText.style.transform = "translate(-50%, -50%)";
  progressText.style.color = "#f4d47f";
  progressText.style.fontSize = "0.9rem";
  progressText.style.fontFamily = "'Poppins', sans-serif";
  progressText.style.fontWeight = "500";
  progressContainer.appendChild(progressText);

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
