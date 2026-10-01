import Card from '../shared/Card.jsx';
import Button from '../shared/Button.jsx';
import HistoryRow from './HistoryRow.jsx';
import './History.css';

/**
 * Pantalla de historial: lista todas las aplicaciones guardadas en la
 * base de datos, ordenadas de la mas reciente a la mas antigua.
 * Permite eliminar un resultado individual o vaciar todo el historial,
 * siempre pidiendo confirmacion antes de borrar.
 *
 * isLoading/error reflejan que el historial ahora viene de una
 * peticion de red al backend (antes era una lectura instantanea de
 * localStorage). En el plan gratuito de Render, la primera peticion
 * del dia puede tardar hasta medio minuto en "despertar" el servidor
 * -- por eso el mensaje de carga lo menciona explicitamente.
 */
export default function HistoryScreen({ attempts, isLoading, error, onRetry, onBack, onSelectAttempt, onDeleteAttempt, onClearAll }) {
  const handleClearAll = () => {
    const confirmed = window.confirm(
      `¿Eliminar los ${attempts.length} resultados del historial? Esta acción no se puede deshacer.`
    );
    if (confirmed) {
      onClearAll();
    }
  };

  return (
    <div className="anp-page">
      <Card>
        <div className="anp-history-header">
          <h2 className="anp-section-title" style={{ margin: 0 }}>
            Historial de aplicaciones
          </h2>
          <Button variant="ghost" onClick={onBack}>
            Volver
          </Button>
        </div>

        {isLoading && (
          <p className="anp-history-empty">Cargando historial… (la primera carga del día puede tardar unos segundos)</p>
        )}

        {!isLoading && error && (
          <div className="anp-warn-box">
            <p>{error}</p>
            <Button variant="secondary" onClick={onRetry}>
              Reintentar
            </Button>
          </div>
        )}

        {!isLoading && !error && attempts.length === 0 && (
          <p className="anp-history-empty">Todavía no hay resultados guardados.</p>
        )}

        {!isLoading && !error && attempts.length > 0 && (
          <>
            <div className="anp-history-list">
              {attempts.map((attempt) => (
                <HistoryRow key={attempt.id} attempt={attempt} onSelect={onSelectAttempt} onDelete={onDeleteAttempt} />
              ))}
            </div>

            <div className="anp-history-footer">
              <Button variant="danger" onClick={handleClearAll}>
                Eliminar todo el historial
              </Button>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}
