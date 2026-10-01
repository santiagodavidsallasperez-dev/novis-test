import Card from '../shared/Card.jsx';
import Button from '../shared/Button.jsx';
import BrandMark from '../shared/BrandMark.jsx';
import { QUESTIONS } from '../../data/questions.js';
import './Intro.css';

/**
 * Pantalla de instrucciones que se muestra despues de capturar los
 * datos del candidato y antes de iniciar el cronometro del test.
 */
export default function InstructionsScreen({ candidateName, onBack, onConfirm }) {
  return (
    <div className="anp-page">
      <Card>
        <BrandMark size="sm" />

        <h1 className="anp-instructions-title">Antes de comenzar, {candidateName}</h1>

        <ul className="anp-instructions-list">
          <li>
            El test tiene <strong>{QUESTIONS.length} preguntas</strong> de razonamiento verbal,
            abstracto y lógico.
          </li>
          <li>
            Tienes <strong>30 minutos</strong> en total. El cronómetro empieza apenas presiones
            "Comenzar test" y no se puede pausar.
          </li>
          <li>
            Si el tiempo se agota antes de terminar, el sistema calificará automáticamente
            las preguntas que hayas respondido hasta ese momento.
          </li>
          <li>
            Puedes navegar libremente entre preguntas y cambiar tus respuestas antes de
            finalizar.
          </li>
          <li>
            <strong>El test solo se puede presentar una vez.</strong> Una vez lo finalices,
            no podrás volver a intentarlo.
          </li>
          <li>Responde con calma pero sin detenerte demasiado en una sola pregunta.</li>
        </ul>

        <div className="anp-instructions-actions">
          <Button variant="ghost" onClick={onBack}>
            Volver
          </Button>
          <Button onClick={onConfirm}>Entendido, comenzar</Button>
        </div>
      </Card>
    </div>
  );
}