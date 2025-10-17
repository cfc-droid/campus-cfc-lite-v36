import Head from 'next/head'
import Link from 'next/link'
import '../../styles/globals.css'
import { useEffect, useState } from 'react'

export default function Module1() {
  const KEY = 'module1-answers';
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(KEY);
      if (saved) setStatus('✅ Progreso cargado desde tu dispositivo.');
    }
  }, []);

  const save = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(KEY, JSON.stringify({ sent: true, at: new Date().toISOString() }));
      setStatus('✅ Examen enviado con éxito — progreso guardado localmente.');
    }
  };

  return (
    <div className="container">
      <Head><title>Módulo 1 — Demo</title></Head>

      <div className="card"><h1>Módulo 1 — Demo</h1><p className="muted">{status || 'Versión LITE demo'}</p></div>

      <details open><summary>Capítulo 1 — Introducción (demo)</summary>
        <div className="card"><p>Contenido de demostración. Sustituí este archivo por el módulo definitivo exportado a HTML o mantené esta ruta como capa de navegación.</p></div>
      </details>

      <hr style={{opacity:.1}} />

      <div className="card">
        <h3>Cuestionario (demo)</h3>
        <p><label><input type="radio" name="q1" /> Opción A</label></p>
        <p><label><input type="radio" name="q1" /> Opción B</label></p>
        <button className="btn" onClick={save}>Enviar respuestas</button>
      </div>

      <div className="card">
        <Link className="btn" href="/exams">⬅ Volver al índice</Link>
      </div>
    </div>
  )
}
