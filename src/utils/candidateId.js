/**
 * Genera un identificador unico y normalizado para un candidato,
 * combinando documento y nombre. Se usa tanto para guardar el
 * progreso en curso como para bloquear intentos repetidos.
 */
export function getCandidateId(candidate) {
  const documentoNormalizado = (candidate.documento ?? '')
    .trim()
    .toLowerCase()
    .replace(/[\s.\-]/g, '');
  const nombreNormalizado = (candidate.nombre ?? '').trim().toLowerCase().replace(/\s+/g, ' ');
  return `${documentoNormalizado}__${nombreNormalizado}`;
}
