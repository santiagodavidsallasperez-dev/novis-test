import Card from '../shared/Card.jsx';
import Button from '../shared/Button.jsx';
import BrandMark from '../shared/BrandMark.jsx';
import './Admin.css';

/**
 * Panel de administrador: punto de entrada a las herramientas
 * internas (historial, exportacion) despues de iniciar sesion. No
 * muestra un conteo de resultados aqui a proposito -- el numero real
 * se carga siempre al entrar a Historial, para evitar mostrar un dato
 * desactualizado si otro computador de la empresa guardo un resultado
 * mientras tanto.
 */
export default function AdminScreen({ onShowHistory, onLogout }) {
  return (
    <div className="anp-page">
      <Card>
        <BrandMark size="sm" />
        <h1 className="anp-admin-title">Panel de administrador</h1>
        <p className="anp-admin-lead">Herramientas internas de Aconpiexpress para el test NOVIS.</p>

        <div className="anp-admin-actions">
          <button type="button" className="anp-admin-menu-item" onClick={onShowHistory}>
            <span className="anp-admin-menu-item__title">Historial de aplicaciones</span>
            <span className="anp-admin-menu-item__desc">Ver todos los resultados guardados · exportar a PDF</span>
          </button>
        </div>

        <div className="anp-admin-footer-row">
          <Button variant="ghost" onClick={onLogout}>
            Cerrar sesión de administrador
          </Button>
        </div>
      </Card>
    </div>
  );
}
