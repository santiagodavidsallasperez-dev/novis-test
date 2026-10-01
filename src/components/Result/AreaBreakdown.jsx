import ProgressBar from '../shared/ProgressBar.jsx';
import { AREAS } from '../../data/scoring.js';
import './Result.css';

/**
 * Desglose de aciertos por area cognitiva (verbal, abstracto, logico).
 */
export default function AreaBreakdown({ areaCorrect, areaTotal }) {
  return (
    <div className="anp-area-breakdown">
      {Object.entries(AREAS).map(([key, def]) => {
        const correct = areaCorrect[key];
        const total = areaTotal[key];
        const pct = total > 0 ? Math.round((correct / total) * 100) : 0;

        return (
          <div key={key} className="anp-area-item">
            <ProgressBar value={pct} label={`${def.label} · ${correct} / ${total}`} />
          </div>
        );
      })}
    </div>
  );
}
