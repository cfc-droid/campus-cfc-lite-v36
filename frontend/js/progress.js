
/**
 * Progress & Lock CFC LITE v37
 */
(function initLocksAndProgress(){
  if (!localStorage.getItem('mod1_unlocked')) {
    localStorage.setItem('mod1_unlocked', 'true');
  }
  document.querySelectorAll('[data-module]').forEach(a => {
    const mod = parseInt(a.getAttribute('data-module'), 10);
    const unlocked = localStorage.getItem(`mod${mod}_unlocked`) === 'true';
    if (!unlocked) {
      a.classList.add('cfc-locked');
      a.addEventListener('click', (e) => {
        e.preventDefault();
        alert('🔒 Este módulo está bloqueado. Aprobá el anterior para continuar.');
      });
    }
  });
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
})();
