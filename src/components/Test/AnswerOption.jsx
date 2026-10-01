import './Test.css';

/**
 * Boton de opcion de respuesta (a, b, c, d, e...).
 */
export default function AnswerOption({ optionKey, label, selected, onSelect }) {
  return (
    <button
      type="button"
      className={`anp-option ${selected ? 'anp-option--selected' : ''}`.trim()}
      onClick={() => onSelect(optionKey)}
      aria-pressed={selected}
    >
      <span className="anp-option__key">{optionKey}</span>
      <span className="anp-option__label">{label}</span>
    </button>
  );
}
