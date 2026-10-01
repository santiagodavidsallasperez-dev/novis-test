import { useCallback, useEffect, useMemo, useState } from 'react';
import Card from '../shared/Card.jsx';
import Button from '../shared/Button.jsx';
import ProgressBar from '../shared/ProgressBar.jsx';
import AnswerOption from './AnswerOption.jsx';
import QuestionJumpGrid from './QuestionJumpGrid.jsx';
import { QuestionFigure } from './TestFigures.jsx';
import Timer from './Timer.jsx';
import { useCountdown } from '../../hooks/useCountdown.js';
import { QUESTIONS } from '../../data/questions.js';
import { TEST_DURATION_SECONDS } from '../../data/testConfig.js';
import './Test.css';

/**
 * Calcula cuantos segundos quedan de test a partir del momento real
 * en que empezo (startedAt), no de un contador que reinicia en cada
 * montaje del componente. Esto evita que refrescar la pagina le
 * regale mas tiempo al candidato.
 */
function computeSecondsLeft(startedAt) {
  const elapsedSeconds = Math.floor((Date.now() - startedAt) / 1000);
  return Math.max(0, TEST_DURATION_SECONDS - elapsedSeconds);
}

/**
 * Pantalla de aplicacion del test: muestra una pregunta a la vez,
 * permite navegar libremente y confirma antes de finalizar si hay
 * preguntas sin responder. onFinish ahora es asincrono (guarda el
 * resultado en el backend): mientras esa peticion esta en curso se
 * deshabilitan los botones y se muestra "Guardando...", y si falla
 * se ofrece reintentar sin perder las respuestas ya dadas.
 */
export default function TestScreen({ answers, onAnswer, onFinish, startedAt }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [confirmSubmit, setConfirmSubmit] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const initialSecondsLeft = useMemo(() => computeSecondsLeft(startedAt), [startedAt]);

  const runFinish = useCallback(async () => {
    setIsSubmitting(true);
    setSubmitError('');
    try {
      await onFinish();
    } catch (error) {
      console.error('No se pudo guardar el resultado del test:', error);
      setSubmitError('No se pudo guardar tu resultado. Verifica la conexión e inténtalo de nuevo.');
      setIsSubmitting(false);
    }
    // En caso de exito, App.jsx cambia de pantalla y este componente
    // se desmonta, asi que no hace falta poner isSubmitting en false aqui.
  }, [onFinish]);

  const handleTimeExpired = useCallback(() => {
    runFinish();
  }, [runFinish]);

  // Si el tiempo ya se agoto (por ejemplo, el candidato reabrio la
  // pestaña mucho despues), finaliza y califica de inmediato.
  useEffect(() => {
    if (initialSecondsLeft <= 0) {
      runFinish();
    }
    // Solo debe evaluarse una vez al montar la pantalla del test.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const secondsLeft = useCountdown(initialSecondsLeft, handleTimeExpired, initialSecondsLeft > 0 && !isSubmitting);

  const question = QUESTIONS[currentIndex];
  const answeredCount = Object.keys(answers).length;
  const progress = useMemo(() => Math.round((currentIndex / QUESTIONS.length) * 100), [currentIndex]);
  const isLast = currentIndex === QUESTIONS.length - 1;

  const goTo = (index) => {
    setCurrentIndex(Math.min(Math.max(index, 0), QUESTIONS.length - 1));
    setConfirmSubmit(false);
  };

  const handleFinishClick = () => {
    if (answeredCount < QUESTIONS.length && !confirmSubmit) {
      setConfirmSubmit(true);
      return;
    }
    runFinish();
  };

  return (
    <div className="anp-page">
      <Card>
        <ProgressBar value={progress} />

        <div className="anp-test-header">
          <span className="anp-test-counter">
            Pregunta {question.n} de {QUESTIONS.length}
          </span>
          <Timer secondsLeft={secondsLeft} />
          <span className="anp-test-counter">{answeredCount} respondidas</span>
        </div>

        <p className="anp-question-text">{question.text}</p>

        {question.figure && (
          <div className="anp-figure-box">
            <QuestionFigure figureKey={question.figure} />
          </div>
        )}

        <div className="anp-options">
          {Object.entries(question.options ?? {}).map(([key, label]) => (
            <AnswerOption
              key={key}
              optionKey={key}
              label={label}
              selected={answers[question.n] === key}
              onSelect={(opt) => onAnswer(question.n, opt)}
            />
          ))}
        </div>

        <div className="anp-nav-row">
          <Button
            variant="ghost"
            onClick={() => goTo(currentIndex - 1)}
            disabled={currentIndex === 0 || isSubmitting}
          >
            Anterior
          </Button>

          {!isLast ? (
            <Button onClick={() => goTo(currentIndex + 1)} disabled={isSubmitting}>
              Siguiente
            </Button>
          ) : (
            <Button onClick={handleFinishClick} disabled={isSubmitting}>
              {isSubmitting ? 'Guardando…' : 'Finalizar test'}
            </Button>
          )}
        </div>

        {confirmSubmit && answeredCount < QUESTIONS.length && !isSubmitting && (
          <div className="anp-warn-box">
            <p>
              Faltan {QUESTIONS.length - answeredCount} preguntas sin responder. Se calificarán como incorrectas.
            </p>
            <Button variant="secondary" onClick={runFinish}>
              Finalizar de todas formas
            </Button>
          </div>
        )}

        {submitError && (
          <div className="anp-warn-box">
            <p>{submitError}</p>
            <Button variant="secondary" onClick={runFinish}>
              Reintentar
            </Button>
          </div>
        )}

        <QuestionJumpGrid questions={QUESTIONS} answers={answers} currentIndex={currentIndex} onJump={goTo} />
      </Card>
    </div>
  );
}
