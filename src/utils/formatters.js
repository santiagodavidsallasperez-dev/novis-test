/**
 * Obtiene las iniciales (hasta 2 letras) de un nombre completo.
 */
export function getInitials(fullName = '') {
  return fullName
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('');
}

/**
 * Formatea una fecha ISO al formato local de Colombia (es-CO).
 */
export function formatDate(isoString) {
  return new Date(isoString).toLocaleString('es-CO', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
}
