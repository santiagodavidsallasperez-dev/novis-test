import { useCallback, useEffect, useState } from 'react';

const PROGRESS_KEY = 'novis:inProgress';

function readProgress() {
  try {
    const raw = window.localStorage.getItem(PROGRESS_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    console.error('No se pudo leer el progreso en curso:', error);
    return null;
  }
}

function writeProgress(progress) {
  try {
    window.localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  } catch (error) {
    console.error('No se pudo guardar el progreso en curso:', error);
  }
}

function clearProgressStorage() {
  try {
    window.localStorage.removeItem(PROGRESS_KEY);
  } catch (error) {
    console.error('No se pudo limpiar el progreso en curso:', error);
  }
}

/**
 * Guarda y recupera el progreso de un test a medias (candidato,
 * respuestas y momento de inicio), para que un refresh accidental
 * de pagina no borre lo que el candidato ya respondio.
 */
export function useTestProgress() {
  const [progress, setProgress] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setProgress(readProgress());
    setIsLoaded(true);
  }, []);

  /**
   * Guarda o actualiza el progreso en curso.
   * @param {Object} params
   * @param {string} params.candidateId
   * @param {Object} params.candidate
   * @param {Record<number,string>} params.answers
   * @param {number} params.startedAt - timestamp (ms) de inicio del test
   */
  const saveProgress = useCallback(({ candidateId, candidate, answers, startedAt }) => {
    const data = { candidateId, candidate, answers, startedAt };
    setProgress(data);
    writeProgress(data);
  }, []);

  const clearProgress = useCallback(() => {
    setProgress(null);
    clearProgressStorage();
  }, []);

  return { progress, isLoaded, saveProgress, clearProgress };
}
