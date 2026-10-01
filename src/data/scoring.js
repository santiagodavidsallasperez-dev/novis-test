/**
 * Clave de calificacion oficial del manual NOVIS.
 * Los reactivos 23, 26 y 57 aceptan dos respuestas validas segun la
 * hoja de respuestas original.
 */
export const ANSWER_KEY = {
  1: ['c'], 2: ['c'], 3: ['d'], 4: ['d'], 5: ['c'], 6: ['e'], 7: ['c'], 8: ['a'], 9: ['d'], 10: ['c'],
  11: ['e'], 12: ['e'], 13: ['b'], 14: ['d'], 15: ['d'], 16: ['c'], 17: ['b'], 18: ['a'], 19: ['d'], 20: ['e'],
  21: ['d'], 22: ['e'], 23: ['c', 'd'], 24: ['c'], 25: ['d'], 26: ['d', 'e'], 27: ['b'], 28: ['e'], 29: ['e'], 30: ['c'],
  31: ['a'], 32: ['d'], 33: ['b'], 34: ['c'], 35: ['c'], 36: ['c'], 37: ['b'], 38: ['c'], 39: ['b'], 40: ['c'],
  41: ['c'], 42: ['d'], 43: ['e'], 44: ['b'], 45: ['a'], 46: ['c'], 47: ['d'], 48: ['a'], 49: ['c'], 50: ['c'],
  51: ['b'], 52: ['b'], 53: ['d'], 54: ['b'], 55: ['c'], 56: ['a'], 57: ['b', 'c'], 58: ['c'], 59: ['d'], 60: ['c'],
  61: ['c'], 62: ['d'], 63: ['b'], 64: ['c'], 65: ['c'], 66: ['d'], 67: ['c'], 68: ['b'], 69: ['d'], 70: ['d'],
  71: ['d'], 72: ['d'], 73: ['c'], 74: ['c'], 75: ['d'], 76: ['b'], 77: ['b'], 78: ['c'], 79: ['c'], 80: ['d'],
};

/**
 * Analisis cualitativo por area segun el manual del aplicador.
 */
export const AREAS = {
  verbal: {
    label: 'Razonamiento verbal',
    description: 'Dotación natural, riqueza de lenguaje y manejo de conceptos.',
    items: [6, 7, 9, 10, 12, 15, 20, 21, 23, 25, 26, 28, 29, 30, 32, 33, 35, 36, 40, 44, 45, 47, 49, 50, 59, 64, 68, 72, 74],
  },
  abstracto: {
    label: 'Razonamiento abstracto',
    description: 'Capacidad para relacionar hechos, abstraer y generalizar.',
    items: [1, 5, 14, 16, 17, 18, 19, 31, 38, 39, 52, 53, 54, 56, 57, 60, 63, 65, 66, 67, 69, 73, 75, 76, 77, 78, 79, 80],
  },
  logico: {
    label: 'Razonamiento lógico',
    description: 'Juicio lógico, sentido común y control de impulsos.',
    items: [2, 3, 4, 8, 11, 13, 22, 24, 27, 34, 37, 41, 42, 43, 46, 48, 51, 55, 58, 61, 62, 70, 71],
  },
};

/**
 * Tabla de rangos y diagnosticos segun el manual NOVIS.
 */
export const RANGE_TABLE = [
  { min: 121, max: Infinity, label: 'Superior', description: 'Potencial para actividades de la más alta calidad o directivas.' },
  { min: 111, max: 120, label: 'Superior al término medio', description: 'Puede tomar ventaja de oportunidades y progresar rápidamente.' },
  { min: 106, max: 110, label: 'Promedio término medio', description: 'Lleva a cabo una adecuada solución de problemas y planeación anticipada.' },
  { min: 100, max: 105, label: 'Inferior al término medio', description: 'Puede seguir direcciones si no son complejas.' },
  { min: -Infinity, max: 99, label: 'Deficiente', description: 'Dificultad para resolver problemas.' },
];

/**
 * Calcula el rango y su descripcion a partir del CI.
 */
export function getRange(ci) {
  return RANGE_TABLE.find((r) => ci >= r.min && ci <= r.max) ?? RANGE_TABLE[RANGE_TABLE.length - 1];
}

/**
 * Constantes de correccion estadistica del manual.
 */
export const CORRECTION = {
  M: 70, // hombres
  F: 75, // mujeres
};
