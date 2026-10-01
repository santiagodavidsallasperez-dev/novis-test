import './Test.css';

/**
 * Muestra el tiempo restante en formato MM:SS.
 * Cambia a estilo de alerta cuando quedan menos de 5 minutos.
 */
export default function Timer({ secondsLeft }) {
  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const formatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  const isWarning = secondsLeft <= 300; // ultimos 5 minutos

  return (
    <div className={`anp-timer ${isWarning ? 'anp-timer--warning' : ''}`.trim()}>
      Tiempo restante: <strong>{formatted}</strong>
    </div>
  );
}