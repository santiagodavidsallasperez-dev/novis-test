import './Intro.css';

/**
 * Formulario de captura de datos del evaluado antes de iniciar el test.
 */
export default function CandidateForm({ candidate, onChange, error }) {
  const handleField = (field) => (event) => {
    onChange({ ...candidate, [field]: event.target.value });
  };

  return (
    <div className="anp-form">
      <label className="anp-field">
        <span>Nombre completo</span>
        <input
          type="text"
          value={candidate.nombre}
          onChange={handleField('nombre')}
          placeholder="Nombre y apellidos"
          autoComplete="name"
        />
      </label>

      <label className="anp-field">
        <span>Número de documento</span>
        <input
          type="text"
          value={candidate.documento}
          onChange={handleField('documento')}
          placeholder="Cédula o documento de identidad"
          autoComplete="off"
        />
      </label>

      <div className="anp-field-row">
        <label className="anp-field">
          <span>Edad</span>
          <input
            type="number"
            min="1"
            value={candidate.edad}
            onChange={handleField('edad')}
            placeholder="Años"
          />
        </label>

        <label className="anp-field">
          <span>Sexo</span>
          <select value={candidate.sexo} onChange={handleField('sexo')}>
            <option value="">Selecciona</option>
            <option value="M">Hombre</option>
            <option value="F">Mujer</option>
          </select>
        </label>
      </div>

      <label className="anp-field">
        <span>Puesto (opcional)</span>
        <input
          type="text"
          value={candidate.puesto}
          onChange={handleField('puesto')}
          placeholder="Puesto al que aplica"
        />
      </label>

      {error && <p className="anp-form__error">{error}</p>}
    </div>
  );
}
