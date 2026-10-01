import { useCallback, useState } from 'react';

const BASE_URL = '/api/attempts';

/**
 * Pausa breve entre reintentos (ms). No usamos un timeout artificial
 * en el fetch: en el plan gratis de Render el servidor puede tardar
 * hasta ~50s en "despertar" tras estar inactivo, y esa espera es
 * normal, no un fallo real de la peticion.
 */
const RETRY_DELAY_MS = 3000;

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Hook que habla con la API del backend para crear, listar y borrar
 * intentos del test, y para verificar si un candidato ya presento el
 * test antes. El historial completo (attempts) solo se carga cuando
 * el administrador inicia sesion y llama a loadHistory -- nunca se
 * expone a un candidato sin autenticar.
 */
export function useAttempts() {
  const [attempts, setAttempts] = useState([]);
  const [isHistoryLoaded, setIsHistoryLoaded] = useState(false);
  const [historyError, setHistoryError] = useState(null);

  /**
   * Crea un nuevo intento en el servidor. Reintenta una vez si la
   * primera peticion falla (por ejemplo, por una caida de red breve),
   * antes de darse por vencido.
   */
  const addAttempt = useCallback(async (attemptPayload) => {
    const attemptRequest = async () => {
      const res = await fetch(BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(attemptPayload),
      });
      if (!res.ok) throw new Error(`Error del servidor (${res.status})`);
      return res.json();
    };

    try {
      return await attemptRequest();
    } catch (firstError) {
      console.error('Primer intento de guardar el resultado falló, reintentando:', firstError);
      await wait(RETRY_DELAY_MS);
      return attemptRequest(); // si esta segunda tambien falla, el error sube al llamador
    }
  }, []);

  /**
   * Verifica si un candidato ya presento el test. Ante un error de
   * red, devuelve "false" (no bloquea al candidato) en vez de
   * arriesgarse a impedir una aplicacion legitima por un problema
   * de conexion pasajero.
   */
  const checkAlreadyAttempted = useCallback(async (candidateId) => {
    if (!candidateId) return false;

    try {
      const res = await fetch(`${BASE_URL}/check/${encodeURIComponent(candidateId)}`);
      if (!res.ok) return false;
      const data = await res.json();
      return Boolean(data.alreadyAttempted);
    } catch (error) {
      console.error('No se pudo verificar si el candidato ya presento el test:', error);
      return false;
    }
  }, []);

  /**
   * Carga el historial completo. Requiere el token (contrasena) de
   * administrador ya validado.
   */
  const loadHistory = useCallback(async (adminToken) => {
    setHistoryError(null);
    try {
      const res = await fetch(BASE_URL, { headers: { 'x-admin-token': adminToken } });
      if (!res.ok) throw new Error(`Error del servidor (${res.status})`);
      const data = await res.json();
      setAttempts(data);
      setIsHistoryLoaded(true);
    } catch (error) {
      console.error('Error al cargar el historial:', error);
      setHistoryError('No se pudo cargar el historial. Verifica tu conexión e inténtalo de nuevo.');
    }
  }, []);

  const removeAttempt = useCallback(async (attemptId, adminToken) => {
    try {
      await fetch(`${BASE_URL}/${attemptId}`, {
        method: 'DELETE',
        headers: { 'x-admin-token': adminToken },
      });
      setAttempts((prev) => prev.filter((attempt) => attempt.id !== attemptId));
    } catch (error) {
      console.error('No se pudo eliminar el resultado:', error);
    }
  }, []);

  const clearAttempts = useCallback(async (adminToken) => {
    try {
      await fetch(BASE_URL, {
        method: 'DELETE',
        headers: { 'x-admin-token': adminToken },
      });
      setAttempts([]);
    } catch (error) {
      console.error('No se pudo vaciar el historial:', error);
    }
  }, []);

  return {
    attempts,
    isHistoryLoaded,
    historyError,
    addAttempt,
    checkAlreadyAttempted,
    loadHistory,
    removeAttempt,
    clearAttempts,
  };
}
