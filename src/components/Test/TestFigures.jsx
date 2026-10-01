import fig5 from '../../assets/figures/fig5.jpg';
import fig18 from '../../assets/figures/fig18.jpg';
import fig39 from '../../assets/figures/fig39.jpg';
import fig54 from '../../assets/figures/fig54.jpg';
import fig66 from '../../assets/figures/fig66.png';
import fig78 from '../../assets/figures/fig78.png';

/**
 * Imagenes reales del manual NOVIS para los reactivos graficos
 * (5, 18, 39, 54, 66, 78, 79, 80 -- estas tres ultimas comparten
 * la misma figura del diagrama de circulo/triangulo/rectangulo).
 */
const IMAGES = { fig5, fig18, fig39, fig54, fig66, fig78 };

/**
 * Renderiza la imagen de la figura correspondiente a un reactivo.
 * Si la clave no existe en IMAGES, no renderiza nada (evita crashear).
 */
export function QuestionFigure({ figureKey }) {
  const src = IMAGES[figureKey];
  if (!src) return null;

  return (
    <img
      src={src}
      alt={`Figura del reactivo ${figureKey}`}
      style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '6px' }}
    />
  );
}
