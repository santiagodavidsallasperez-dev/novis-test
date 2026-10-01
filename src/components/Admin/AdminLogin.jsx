import { useState } from 'react';
import Card from '../shared/Card.jsx';
import Button from '../shared/Button.jsx';
import BrandMark from '../shared/BrandMark.jsx';
import './Admin.css';

/**
 * Pantalla de acceso al modo administrador. La contrasena ya NO vive
 * en el codigo del frontend (antes cualquiera podia leerla en el
 * codigo fuente del navegador): ahora se verifica contra el backend,
 * que la compara con la variable de entorno ADMIN_PASSWORD del
 * servidor.
 */
export default function AdminLogin({ onSuccess, onCancel }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        setError('Contraseña incorrecta.');
        setIsSubmitting(false);
        return;
      }

      // Se envia la contrasena ya validada hacia arriba: App.jsx la
      // guarda en memoria (useAdminSession) para usarla como token
      // en las siguientes peticiones protegidas del historial.
      onSuccess(password);
    } catch (networkError) {
      console.error('Error al validar la contraseña de administrador:', networkError);
      setError('No se pudo conectar con el servidor. Verifica tu conexión e inténtalo de nuevo.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="anp-page">
      <Card>
        <BrandMark size="sm" />
        <h1 className="anp-admin-title">Acceso administrador</h1>
        <p className="anp-admin-lead">
          Ingresa la contraseña de administrador para ver el historial de aplicaciones y exportar
          resultados.
        </p>

        <form onSubmit={handleSubmit} className="anp-form">
          <label className="anp-field">
            <span>Contraseña</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Contraseña de administrador"
              autoFocus
            />
          </label>

          {error && <p className="anp-form__error">{error}</p>}

          <div className="anp-admin-actions" style={{ flexDirection: 'row' }}>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Verificando…' : 'Ingresar'}
            </Button>
            <Button variant="ghost" onClick={onCancel} type="button" disabled={isSubmitting}>
              Volver
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
