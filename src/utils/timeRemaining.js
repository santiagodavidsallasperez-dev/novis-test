import { TEST_DURATION_SECONDS } from '../data/testConfig.js';

/**
 * Calcula cuantos segundos de test quedan a partir del momento real
 * en que empezo (startedAt, timestamp en ms). Se usa tanto para
 * pintar el cronometro como para decidir, al recargar la pagina, si
 * un progreso guardado todavia es valido o si el tiempo ya se agoto.
 */
export function computeSecondsLeft(startedAt) {
  const elapsedSeconds = Math.floor((Date.now() - startedAt) / 1000);
  return Math.max(0, TEST_DURATION_SECONDS - elapsedSeconds);
}
