import './Result.css';

/**
 * Tarjeta compacta que muestra una metrica del resultado (aciertos, CI, rango).
 */
export default function MetricCard({ label, value, emphasis = false }) {
  return (
    <div className="anp-metric">
      <p className="anp-metric__label">{label}</p>
      <p className={`anp-metric__value ${emphasis ? 'anp-metric__value--lg' : ''}`.trim()}>{value}</p>
    </div>
  );
}
