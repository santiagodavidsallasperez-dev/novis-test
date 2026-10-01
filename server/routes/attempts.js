import { Router } from 'express';
import { Attempt } from '../models/Attempt.js';
import { requireAdmin } from '../middleware/requireAdmin.js';

const router = Router();

/**
 * Crea un nuevo intento. Publica y sin autenticacion: la llama el
 * frontend del candidato justo al terminar el test.
 */
router.post('/', async (req, res) => {
  try {
    const attempt = await Attempt.create(req.body);
    res.status(201).json(attempt.toJSON());
  } catch (error) {
    console.error('Error al crear el intento:', error);
    res.status(400).json({ error: 'No se pudo guardar el resultado.' });
  }
});

/**
 * Verifica si un candidato ya presento el test, SIN exponer datos de
 * otros candidatos. Publica y sin autenticacion: la usa la pantalla
 * inicial para bloquear un segundo intento.
 */
router.get('/check/:candidateId', async (req, res) => {
  try {
    const exists = await Attempt.exists({ candidateId: req.params.candidateId });
    res.json({ alreadyAttempted: Boolean(exists) });
  } catch (error) {
    console.error('Error al verificar el candidato:', error);
    res.status(500).json({ error: 'No se pudo verificar el candidato.' });
  }
});

/**
 * Lista todos los intentos guardados, del mas reciente al mas antiguo.
 * Protegida: solo el administrador puede ver el historial completo.
 */
router.get('/', requireAdmin, async (req, res) => {
  try {
    const attempts = await Attempt.find().sort({ createdAt: -1 });
    res.json(attempts.map((a) => a.toJSON()));
  } catch (error) {
    console.error('Error al listar el historial:', error);
    res.status(500).json({ error: 'No se pudo cargar el historial.' });
  }
});

/**
 * Elimina TODOS los intentos guardados. Protegida.
 */
router.delete('/', requireAdmin, async (req, res) => {
  try {
    await Attempt.deleteMany({});
    res.status(204).end();
  } catch (error) {
    console.error('Error al vaciar el historial:', error);
    res.status(500).json({ error: 'No se pudo vaciar el historial.' });
  }
});

/**
 * Elimina un unico intento por id. Protegida.
 */
router.delete('/:id', requireAdmin, async (req, res) => {
  try {
    await Attempt.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (error) {
    console.error('Error al eliminar el intento:', error);
    res.status(500).json({ error: 'No se pudo eliminar el resultado.' });
  }
});

export default router;
