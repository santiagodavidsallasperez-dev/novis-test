import './shared.css';

/**
 * Marca visual de Aconpiexpress: icono geometrico + wordmark,
 * inspirado en el logo circular azul del sitio corporativo.
 */
export default function BrandMark({ size = 'md' }) {
  return (
    <div className={`anp-brand anp-brand--${size}`}>
      <svg viewBox="0 0 40 40" width="28" height="28" aria-hidden="true">
        <circle cx="20" cy="20" r="19" fill="none" stroke="var(--anp-blue-600)" strokeWidth="2.4" />
        <path d="M8 20 L20 8 L32 20 L20 32 Z" fill="var(--anp-blue-600)" opacity="0.14" />
        <path d="M9 20 H31" stroke="var(--anp-blue-600)" strokeWidth="2.4" strokeLinecap="round" />
        <path d="M20 9 V31" stroke="var(--anp-cyan-400)" strokeWidth="2.4" strokeLinecap="round" />
      </svg>
      <span className="anp-brand__text">
        Aconpi<strong>express</strong>
      </span>
    </div>
  );
}
