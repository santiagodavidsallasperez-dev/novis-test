import { Router } from 'express';

const router = Router();

/**
 * Verifica la contrasena de administrador. La contrasena real vive
 * solo en la variable de entorno ADMIN_PASSWORD del servidor -- nunca
 * se envia al navegador del candidato ni queda expuesta en el codigo
 * del frontend.
 */
router.post('/login', (req, res) => {
  const { password } = req.body ?? {};

  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ ok: false, error: 'Contraseña incorrecta.' });
  }

  return res.json({ ok: true });
});

export default router;
