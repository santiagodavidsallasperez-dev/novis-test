import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import attemptsRouter from './routes/attempts.js';
import adminRouter from './routes/admin.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '.env') });
const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('Falta la variable de entorno MONGODB_URI. Revisa server/.env (local) o las variables de entorno del servicio en Render (produccion).');
  process.exit(1);
}

if (!process.env.ADMIN_PASSWORD) {
  console.error('Falta la variable de entorno ADMIN_PASSWORD.');
  process.exit(1);
}

const app = express();

app.use(cors());
app.use(express.json());

// Ruta de salud: sirve tanto para verificar que el servidor esta
// vivo como para el "ping" que evita que el plan gratis de Render
// duerma el servicio por inactividad (ver README).
app.get('/api/health', (req, res) => {
  res.json({ ok: true, uptime: process.uptime() });
});

app.use('/api/admin', adminRouter);
app.use('/api/attempts', attemptsRouter);

// En produccion, este mismo servidor sirve el build de React
// (carpeta "dist" en la raiz del proyecto, generada por "npm run build").
if (process.env.NODE_ENV === 'production') {
  const distPath = path.join(__dirname, '..', 'dist');
  app.use(express.static(distPath));

  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

async function start() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Conectado a MongoDB.');

    app.listen(PORT, () => {
      console.log(`Servidor NOVIS escuchando en el puerto ${PORT}.`);
    });
  } catch (error) {
    console.error('No se pudo conectar a MongoDB:', error);
    process.exit(1);
  }
}

start();
