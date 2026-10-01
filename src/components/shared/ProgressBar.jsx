import './shared.css';

/**
 * Barra de progreso horizontal. `value` es un porcentaje 0-100.
 */
export default function ProgressBar({ value, label }) {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div className="anp-progress" role="progressbar" aria-valuenow={clamped} aria-valuemin={0} aria-valuemax={100}>
      {label && <span className="anp-progress__label">{label}</span>}
      <div className="anp-progress__track">
        <div className="anp-progress__fill" style={{ width: `${clamped}%` }} />
      </div>
    </div>
  );
}
