import Card from '../shared/Card.jsx';
import Button from '../shared/Button.jsx';
import BrandMark from '../shared/BrandMark.jsx';
import MetricCard from '../Result/MetricCard.jsx';
import AreaBreakdown from '../Result/AreaBreakdown.jsx';
import { formatDate, getInitials } from '../../utils/formatters.js';
import '../Result/Result.css';
import '../Admin/Admin.css';

/**
 * Vista de detalle de un intento guardado, pensada para el
 * administrador. Incluye un boton "Descargar PDF" que usa la
 * funcion de impresion del navegador: al elegir "Guardar como PDF"
 * en el dialogo de impresion, se genera el archivo con el detalle
 * completo del resultado. Los elementos marcados con la clase
 * "anp-no-print" se ocultan automaticamente en esa vista impresa.
 */
export default function AttemptDetailScreen({ attempt, onBack }) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="anp-page">
      <div className="anp-printable">
        <Card>
          <div className="anp-no-print">
            <BrandMark size="sm" />
          </div>

          <div className="anp-print-brand">
            <p className="anp-print-brand__company">Aconpiexpress</p>
            <p className="anp-print-brand__subtitle">Resultado · Test de Habilidad Mental NOVIS</p>
          </div>

          <div className="anp-result-hero">
            <div className="anp-result-avatar">{getInitials(attempt.nombre)}</div>
            <div>
              <p className="anp-result-eyebrow">Aplicado el {formatDate(attempt.fecha)}</p>
              <h1 className="anp-result-name">{attempt.nombre}</h1>
              <p className="anp-admin-lead" style={{ margin: '4px 0 0' }}>
                Documento: {attempt.documento || 'No registrado'} · Puesto:{' '}
                {attempt.puesto || 'No especificado'}
              </p>
            </div>
          </div>

          <div className="anp-metrics-grid">
            <MetricCard label="Aciertos" value={`${attempt.correctas} / ${attempt.total}`} />
            <MetricCard label="Coeficiente intelectual" value={attempt.ci} emphasis />
            <MetricCard label="Rango" value={attempt.rango} />
          </div>

          <div className="anp-range-note">{attempt.rangoDescripcion}</div>

          <h2 className="anp-section-title">Análisis por área</h2>
          <AreaBreakdown areaCorrect={attempt.areaCorrect} areaTotal={attempt.areaTotal} />

          <div className="anp-result-actions anp-no-print">
            <Button onClick={handlePrint}>Descargar PDF</Button>
            <Button variant="ghost" onClick={onBack}>
              Volver al historial
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}