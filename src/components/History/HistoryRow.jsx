import { formatDate } from '../../utils/formatters.js';
import './History.css';

/**
 * Fila del historial: nombre, fecha, puesto, CI y rango de un intento.
 * El area principal es clickeable -- al presionarla, el administrador
 * entra al detalle completo de ese resultado (con opcion de exportar
 * a PDF). El boton de la papelera elimina unicamente ese resultado,
 * pidiendo confirmacion antes de borrar.
 */
export default function HistoryRow({ attempt, onSelect, onDelete }) {
  const handleDeleteClick = () => {
    const confirmed = window.confirm(
      `¿Eliminar el resultado de ${attempt.nombre}? Esta acción no se puede deshacer.`
    );
    if (confirmed) {
      onDelete(attempt.id);
    }
  };

  return (
    <div className="anp-history-row">
      <button type="button" className="anp-history-row__main" onClick={() => onSelect(attempt)}>
        <div>
          <p className="anp-history-row__name">{attempt.nombre}</p>
          <p className="anp-history-row__meta">
            {formatDate(attempt.fecha)} · {attempt.puesto || 'Sin puesto'}
          </p>
        </div>
        <div className="anp-history-row__score">
          <p className="anp-history-row__ci">CI {attempt.ci}</p>
          <p className="anp-history-row__meta">{attempt.rango}</p>
        </div>
      </button>

      <button
        type="button"
        className="anp-history-row__delete"
        onClick={handleDeleteClick}
        aria-label={`Eliminar resultado de ${attempt.nombre}`}
        title="Eliminar este resultado"
      >
        🗑
      </button>
    </div>
  );
}
