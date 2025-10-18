(function adminPanel(){
  const T = document.querySelector('#tbl tbody');
  const kProm = document.getElementById('kpiProm');
  const kInt = document.getElementById('kpiIntentos');
  const kApr = document.getElementById('kpiAprob');

  function loadHistoryFromLS(){
    let hist = [];
    try {
      const raw = localStorage.getItem('cfc_history');
      if (raw) hist = JSON.parse(raw);
    } catch(e){}
    // También recopilamos del esquema por módulo, por si no hubo historia vieja
    for (let m=1; m<=20; m++){
      const score = parseInt(localStorage.getItem(`mod${m}_score`)||'0',10);
      const att   = parseInt(localStorage.getItem(`mod${m}_attempts`)||'0',10);
      if (score>0 || att>0){
        const already = hist.find(h => h.mod===m);
        if (!already){
          hist.push({
            mod:m,
            score,
            attempts: att,
            ts: localStorage.getItem(`mod${m}_ts`) || new Date().toISOString()
          });
        }
      }
    }
    // Ordenar por módulo
    hist.sort((a,b)=>a.mod-b.mod);
    return hist;
  }

  function render(){
    const hist = loadHistoryFromLS();
    T.innerHTML = '';
    let sum = 0, cnt = 0, aprob = 0, intentos = 0;
    hist.forEach(row=>{
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>Módulo ${row.mod}</td>
        <td>${row.score}/4</td>
        <td>${row.attempts}</td>
        <td>${new Date(row.ts).toLocaleString()}</td>
      `;
      T.appendChild(tr);
      if (row.score>0){ sum += (row.score/4)*100; cnt++; }
      if (row.score>=3) aprob++;
      intentos += row.attempts||0;
    });
    const prom = cnt? Math.round(sum/cnt) : 0;
    kProm.textContent = `Promedio general: ${prom}%`;
    kInt.textContent  = `Intentos totales: ${intentos}`;
    kApr.textContent  = `Módulos aprobados: ${aprob} / 20`;
  }

  function exportCSV(){
    const hist = loadHistoryFromLS();
    const lines = ['modulo,puntaje,intentos,fecha'];
    hist.forEach(h=>{
      lines.push([h.mod, h.score, h.attempts, h.ts].join(','));
    });
    const blob = new Blob([lines.join('\n')], {type:'text/csv;charset=utf-8;'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'historial_cfc.csv';
    a.click();
    URL.revokeObjectURL(a.href);
  }

  function clearAll(){
    if (!confirm('¿Borrar historial local? Esto NO afecta tus archivos en GitHub.')) return;
    localStorage.removeItem('cfc_history');
    for (let m=1; m<=20; m++){
      localStorage.removeItem(`mod${m}_score`);
      localStorage.removeItem(`mod${m}_attempts`);
      localStorage.removeItem(`mod${m}_ts`);
      localStorage.removeItem(`mod${m+1}_unlocked`); // re-bloqueos en cascada
    }
    localStorage.setItem('mod1_unlocked','true'); // M1 siempre accesible
    render();
    alert('Historial limpio ✅');
  }

  document.getElementById('btnRefresh').addEventListener('click', render);
  document.getElementById('btnExport').addEventListener('click', exportCSV);
  document.getElementById('btnClear').addEventListener('click', clearAll);

  render();
})();
