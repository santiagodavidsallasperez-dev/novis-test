import './shared.css';

/**
 * Contenedor de tarjeta con superficie blanca, sombra suave y radio grande.
 */
export default function Card({ children, className = '' }) {
  return <div className={`anp-card ${className}`.trim()}>{children}</div>;
}
