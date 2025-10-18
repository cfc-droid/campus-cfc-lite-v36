
/**
 * Motivation CFC LITE v37
 */
function showMotivation() {
  const frases = [
    "Cada error es una lección más.",
    "El trader disciplinado domina sus emociones.",
    "El progreso pequeño también es progreso.",
    "Respirá, analizá y ejecutá.",
    "Tu identidad no depende de una vela."
  ];
  const frase = frases[Math.floor(Math.random() * frases.length)];
  alert("✨ " + frase);
}
