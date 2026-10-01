import './Test.css';

/**
 * Grilla de botones numerados que permite saltar a cualquier pregunta
 * y visualizar de un vistazo cuales ya fueron respondidas.
 */
export default function QuestionJumpGrid({ questions, answers, currentIndex, onJump }) {
  return (
    <div className="anp-jump-grid" role="navigation" aria-label="Navegación entre preguntas">
      {questions.map((q, index) => {
        const answered = Boolean(answers[q.n]);
        const isActive = index === currentIndex;
        const className = [
          'anp-jump-dot',
          answered ? 'anp-jump-dot--answered' : '',
          isActive ? 'anp-jump-dot--active' : '',
        ]
          .join(' ')
          .trim();

        return (
          <button
            key={q.n}
            type="button"
            className={className}
            onClick={() => onJump(index)}
            aria-label={`Ir a la pregunta ${q.n}${answered ? ', respondida' : ', sin responder'}`}
            aria-current={isActive ? 'true' : undefined}
          >
            {q.n}
          </button>
        );
      })}
    </div>
  );
}
