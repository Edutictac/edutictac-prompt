// Parte ligera del enlace compartido (sin el descompresor), para el arranque.
export const SHARE_PARAM = 'd'

// Separa «#template/<id>?d=…» en id y datos.
export function splitTemplateHash(hash: string): { rawId: string; data: string } {
  const [rawId, query = ''] = hash.split('?', 2)
  return { rawId, data: new URLSearchParams(query).get(SHARE_PARAM) || '' }
}
