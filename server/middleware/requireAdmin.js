/**
 * Protege rutas que solo el administrador debe poder usar (ver el
 * historial completo, borrar resultados). El frontend envia la
 * contrasena de administrador (ya validada una vez en /api/admin/login)
 * en el header "x-admin-token" en cada peticion protegida.
 *
 * Esto es una autenticacion simple por secreto compartido -- adecuada
 * para una herramienta interna de una sola empresa, no un mecanismo de
 * sesiones/JWT completo (seria sobre-ingenieria para este alcance).
 */
export function requireAdmin(req, res, next) {
  const token = req.header('x-admin-token');

  if (!token || token !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'No autorizado.' });
  }

  next();
}
