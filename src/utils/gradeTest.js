import { QUESTIONS } from '../data/questions.js';
import { ANSWER_KEY, AREAS, CORRECTION, getRange } from '../data/scoring.js';

/**
 * Califica un intento de test NOVIS.
 *
 * @param {Object} params
 * @param {Record<number, string>} params.answers - Mapa numeroPregunta -> opcion elegida.
 * @param {'M'|'F'} params.sexo - Sexo del evaluado, define la constante de correccion.
 * @returns {Object} Resultado con aciertos, CI, rango y desglose por area.
 */
export function gradeTest({ answers, sexo }) {
  let correctas = 0;
  const areaCorrect = { verbal: 0, abstracto: 0, logico: 0 };
  const areaTotal = {
    verbal: AREAS.verbal.items.length,
    abstracto: AREAS.abstracto.items.length,
    logico: AREAS.logico.items.length,
  };

  for (const q of QUESTIONS) {
    const given = answers[q.n];
    const validKeys = ANSWER_KEY[q.n] ?? [];
    const isCorrect = given != null && validKeys.includes(given);

    if (isCorrect) {
      correctas += 1;
      for (const [areaKey, def] of Object.entries(AREAS)) {
        if (def.items.includes(q.n)) {
          areaCorrect[areaKey] += 1;
        }
      }
    }
  }

  const correction = sexo === 'M' ? CORRECTION.M : CORRECTION.F;
  const ci = correctas + correction;
  const range = getRange(ci);

  return {
    correctas,
    total: QUESTIONS.length,
    ci,
    rango: range.label,
    rangoDescripcion: range.description,
    areaCorrect,
    areaTotal,
  };
}
