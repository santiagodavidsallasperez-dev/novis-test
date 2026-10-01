# Test NOVIS — Aconpiexpress

Aplicación web para aplicar el Test de Habilidad Mental NOVIS con calificación
automática, análisis por área cognitiva, cronómetro de 30 minutos, progreso
resistente a recargas de página, bloqueo de intentos repetidos, modo
administrador separado del candidato, historial exportable a PDF, y
**persistencia real en MongoDB Atlas** (los resultados ya no viven solo en
el navegador de un computador: quedan centralizados y disponibles desde
cualquier equipo de la empresa).

## Stack

- **Frontend:** React 18 + Vite 5, CSS puro con variables de diseño.
- **Backend:** Node.js + Express, en la carpeta `server/`.
- **Base de datos:** MongoDB Atlas (capa gratuita M0), vía Mongoose.
- Exportación a PDF vía la función de impresión nativa del navegador (sin
  dependencias adicionales).
- Un único proceso Express sirve tanto la API (`/api/...`) como el build de
  React ya compilado — un solo servicio para desplegar, sin CORS que
  configurar.

## Estructura del proyecto

```
novis-app/
├── index.html
├── package.json          # Un solo package.json: frontend + backend juntos
├── vite.config.js        # Incluye el proxy /api -> localhost:4000 (dev)
├── .env.example           # El frontend no necesita variables propias
├── server/                # Backend Express + Mongoose
│   ├── index.js           # Punto de entrada: conecta Mongo, monta rutas,
│   │                       # y en produccion sirve el build de React
│   ├── .env.example        # Plantilla de variables del backend
│   ├── models/
│   │   └── Attempt.js      # Esquema Mongoose de un resultado
│   ├── middleware/
│   │   └── requireAdmin.js # Protege rutas solo-administrador
│   └── routes/
│       ├── attempts.js     # Crear, listar, verificar, borrar resultados
│       └── admin.js        # Validar contraseña de administrador
├── src/
│   ├── main.jsx
│   ├── App.jsx              # Orquesta las pantallas (maquina de estados)
│   ├── data/
│   │   ├── questions.js     # Banco de 80 reactivos
│   │   ├── scoring.js       # Clave de respuestas, areas, tabla de rangos
│   │   └── testConfig.js    # Duracion del test (30 min)
│   ├── utils/
│   │   ├── gradeTest.js     # Logica pura de calificacion
│   │   ├── formatters.js
│   │   ├── candidateId.js   # ID unico (documento + nombre)
│   │   └── timeRemaining.js # Tiempo restante por reloj real
│   ├── hooks/
│   │   ├── useAttempts.js     # Habla con la API del backend
│   │   ├── useCountdown.js
│   │   ├── useTestProgress.js # Progreso en curso (localStorage, sin cambios)
│   │   └── useAdminSession.js # Sesion de administrador (en memoria)
│   ├── components/
│   │   ├── shared/, Intro/, Test/, Result/, History/, Admin/
│   └── styles/
```

### Qué cambió respecto a la versión solo-frontend

| Antes (localStorage) | Ahora (MongoDB + backend) |
|---|---|
| `useAttempts` leía/escribía en `localStorage` | `useAttempts` llama a la API (`fetch`) del backend |
| Historial aislado por computador | Historial centralizado: cualquier computador de la empresa ve los mismos resultados |
| Contraseña de admin visible en el código del navegador | Contraseña vive solo en el servidor (`ADMIN_PASSWORD`), nunca viaja al navegador |
| `hasAttempted` era instantáneo (síncrono) | Ahora es una consulta a la base de datos (asíncrono), con manejo de error de red |
| Guardar el resultado no podía fallar | Guardar el resultado es una petición HTTP: puede fallar (sin red, backend dormido) — la app reintenta y ofrece un botón "Reintentar" sin perder las respuestas del candidato |

El progreso *en curso* (`useTestProgress`, el que resiste un refresh de
página a mitad de test) **sigue usando `localStorage`**, sin cambios: no
necesita base de datos, y así se evita complejidad innecesaria.

## Configuración del entorno — desarrollo local

### 1. Instala Node.js 18+

```bash
node -v
```

### 2. Instala las dependencias (un solo `npm install` para todo)

```bash
npm install
```

### 3. Crea tu cuenta y clúster gratuito en MongoDB Atlas

Sigue la guía de despliegue más abajo (sección "MongoDB Atlas paso a paso")
antes de continuar — necesitas una cadena de conexión real.

### 4. Configura las variables del backend

```bash
cp server/.env.example server/.env
```

Edita `server/.env` con tu cadena de conexión de Atlas y tu propia
contraseña de administrador:

```
MONGODB_URI=mongodb+srv://usuario:contraseña@cluster.mongodb.net/novis?retryWrites=true&w=majority
ADMIN_PASSWORD=cambia-esta-contrasena
PORT=4000
```

`server/.env` nunca se sube a git (está en `.gitignore`).

### 5. Corre el backend y el frontend en DOS terminales separadas

**Terminal 1 — backend:**
```bash
npm run server:dev
```
Debe imprimir "Conectado a MongoDB." y "Servidor NOVIS escuchando en el
puerto 4000."

**Terminal 2 — frontend:**
```bash
npm run dev
```
Abre `http://localhost:5173`. Gracias al proxy configurado en
`vite.config.js`, las llamadas del frontend a `/api/...` se reenvían
automáticamente al backend en el puerto 4000.

### 6. Build de producción (para probar localmente el modo "un solo servidor")

```bash
npm run build
NODE_ENV=production npm start
```

Esto sirve la app completa (frontend + API) desde `http://localhost:4000`,
exactamente como se comportará en Render.

## Notas sobre las figuras del test

Las 6 imágenes reales del manual NOVIS viven en `src/assets/figures/`. Si
necesitas reemplazarlas, mantén los mismos nombres referenciados en
`src/components/Test/TestFigures.jsx`.

## Modo administrador

Acceso desde el enlace "Acceso administrador" en el pie de la app (oculto
durante el test). La contraseña real vive **solo en el servidor**
(`server/.env` en local, variable de entorno en Render) — nunca en el
código del frontend. La sesión de administrador vive en memoria: si se
recarga la página, hay que volver a ingresar la contraseña.

## Persistencia y comportamiento ante fallas de red

- Los resultados finales se guardan en MongoDB Atlas a través del backend.
- Si la conexión falla justo al guardar (por ejemplo, el backend gratuito
  de Render estaba "dormido"), la app reintenta automáticamente una vez, y
  si aun así falla, muestra un botón "Reintentar" sin perder las respuestas
  ya dadas por el candidato.
- El progreso en curso del test (mientras el candidato lo está respondiendo)
  sigue guardándose en `localStorage` de ese computador, no en la base de
  datos — no lo necesita, porque solo importa mientras esa misma persona
  sigue en esa misma máquina.
