import './shared.css';

/**
 * Boton reutilizable con variantes primary, secondary y ghost.
 */
export default function Button({
  children,
  variant = 'primary',
  onClick,
  disabled = false,
  type = 'button',
  fullWidth = false,
}) {
  const className = ['anp-btn', `anp-btn--${variant}`, fullWidth ? 'anp-btn--full' : ''].join(' ').trim();

  return (
    <button type={type} className={className} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
