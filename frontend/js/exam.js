
/**
 * Exam engine CFC LITE v37
 */
function gradeExam(modNumber) {
  const form = document.getElementById(`exam${modNumber}`);
  if (!form) { alert("No se encontró el formulario del examen."); return; }
  const keyRaw = localStorage.getItem(`mod${modNumber}_answerKey`);
  const answerKey = keyRaw ? JSON.parse(keyRaw) : { q1: 'a', q2: 'b', q3: 'c', q4: 'd' };
  let score = 0, total = 4;
  [...form.querySelectorAll('label')].forEach(l => l.classList.remove('cfc-correct','cfc-wrong'));
  for (let i = 1; i <= total; i++) {
    const name = `q${i}`;
    const marked = form.querySelector(`input[name="${name}"]:checked`);
    if (marked) {
      const lbl = marked.closest('label');
      if (marked.value === answerKey[name]) { score++; if (lbl) lbl.classList.add('cfc-correct'); }
      else { if (lbl) lbl.classList.add('cfc-wrong'); }
    }
  }
  const attemptsKey = `mod${modNumber}_attempts`;
  const scoreKey    = `mod${modNumber}_score`;
  const historyKey  = `mod${modNumber}_history`;
  const attempts = (parseInt(localStorage.getItem(attemptsKey) || '0', 10) + 1);
  localStorage.setItem(attemptsKey, String(attempts));
  localStorage.setItem(scoreKey, String(score));
  const now = new Date().toISOString();
  const hist = JSON.parse(localStorage.getItem(historyKey) || '[]');
  hist.push({ ts: now, score, attempts });
  localStorage.setItem(historyKey, JSON.stringify(hist));
  const msg = form.querySelector('.cfc-exam-msg');
  if (msg) msg.innerText = `Resultado: ${score}/4. Intentos: ${attempts}.`;
  if (score >= 3) {
    const next = modNumber + 1;
    localStorage.setItem(`mod${next}_unlocked`, 'true');
    updateGlobalProgress();
    try { showMotivation(); } catch(e) {}
    alert("✅ Aprobaste este módulo. Se desbloqueó el siguiente.");
  } else {
    alert("❌ Obtuviste menos de 3 respuestas correctas. Repetí el examen.");
  }
}
function updateGlobalProgress() {
  let passed = 0;
  for (let m = 1; m <= 20; m++) {
    const sc = parseInt(localStorage.getItem(`mod${m}_score`) || '0', 10);
    if (sc >= 3) passed++;
  }
  const pct = Math.round((passed / 20) * 100);
  localStorage.setItem('cfc_progress_pct', String(pct));
  const bar = document.getElementById('cfc-progress-bar');
  const txt = document.getElementById('cfc-progress-text');
  if (bar)  bar.style.width = pct + '%';
  if (txt)  txt.innerText  = pct + '% completado';
}
