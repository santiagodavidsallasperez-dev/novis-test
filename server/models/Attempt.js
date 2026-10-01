import mongoose from 'mongoose';

/**
 * Esquema de un intento (aplicacion) del test NOVIS. La forma de
 * este documento coincide deliberadamente con el objeto "attempt"
 * que el frontend ya generaba antes (cuando vivia en localStorage),
 * para minimizar cambios en los componentes de React.
 */
const attemptSchema = new mongoose.Schema(
  {
    candidateId: { type: String, required: true, index: true },
    fecha: { type: String, required: true },
    nombre: { type: String, required: true },
    documento: { type: String, required: true },
    edad: { type: String, default: '' },
    sexo: { type: String, enum: ['M', 'F'], required: true },
    puesto: { type: String, default: '' },
    correctas: { type: Number, required: true },
    total: { type: Number, required: true },
    ci: { type: Number, required: true },
    rango: { type: String, required: true },
    rangoDescripcion: { type: String, default: '' },
    areaCorrect: {
      verbal: { type: Number, default: 0 },
      abstracto: { type: Number, default: 0 },
      logico: { type: Number, default: 0 },
    },
    areaTotal: {
      verbal: { type: Number, default: 0 },
      abstracto: { type: Number, default: 0 },
      logico: { type: Number, default: 0 },
    },
  },
  {
    timestamps: true,
    toJSON: {
      // Renombra "_id" a "id" (como string) para que el frontend siga
      // usando "attempt.id" exactamente igual que cuando el historial
      // vivia en localStorage, sin tener que tocar cada componente.
      transform: (_doc, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

export const Attempt = mongoose.model('Attempt', attemptSchema);
