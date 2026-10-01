import { useCallback, useState } from 'react';

/**
 * Maneja el estado de sesion del modo administrador. Deliberadamente
 * NO persiste en localStorage/sessionStorage: si se recarga la pagina
 * o se cierra el navegador, el acceso admin se pierde y hay que volver
 * a ingresar la contrasena. Esto evita que, en un computador compartido
 * de recepcion, una sesion admin quede abierta para el siguiente
 * candidato que use el equipo.
 *
 * A partir de la version con backend, tambien guarda en memoria la
 * contrasena ya validada (adminToken), para enviarla como header
 * "x-admin-token" en las peticiones protegidas del historial.
 */
export function useAdminSession() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminToken, setAdminToken] = useState(null);

  const login = useCallback((password) => {
    setIsAdmin(true);
    setAdminToken(password);
  }, []);

  const logout = useCallback(() => {
    setIsAdmin(false);
    setAdminToken(null);
  }, []);

  return { isAdmin, adminToken, login, logout };
}
