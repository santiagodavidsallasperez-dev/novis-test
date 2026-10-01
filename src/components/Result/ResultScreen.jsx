import Card from '../shared/Card.jsx';
import Button from '../shared/Button.jsx';
import { getInitials } from '../../utils/formatters.js';
import './Result.css';

/**
 * Pantalla que ve el candidato justo al terminar el test. NO muestra
 * puntaje, CI ni rango -- esa informacion solo la puede ver el
 * administrador desde el historial (HistoryScreen / AttemptDetailScreen).
 * Aqui unicamente se confirma que sus respuestas quedaron registradas.
 */
export default function ResultScreen({ result, onRestart }) {
  return (
    <div className="anp-page">
      <Card>
        <div className="anp-thankyou">
          <div className="anp-result-avatar anp-thankyou__avatar">{getInitials(result.nombre)}</div>
          <p className="anp-thankyou__eyebrow">Test NOVIS completado</p>
          <h1 className="anp-thankyou__title">¡Gracias por tu tiempo, {result.nombre}!</h1>
          <p className="anp-thankyou__body">
            Tus respuestas ya quedaron registradas correctamente. Nuestro equipo de talento humano de
            Aconpiexpress revisará tu aplicación y se pondrá en contacto contigo pronto.
          </p>
        </div>

        <div className="anp-result-actions" style={{ justifyContent: 'center' }}>
          <Button onClick={onRestart}>Finalizar</Button>
        </div>
      </Card>
    </div>
  );
}
