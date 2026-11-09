// Hash FNV-1a de 64 bits para comparar salidas exactas sin guardar prompts
// completos. Solo se usa en las pruebas de referencia del generador.
export function goldenHash(value: string): string {
  let hash = 0xcbf29ce484222325n
  const prime = 0x100000001b3n
  const mask = 0xffffffffffffffffn
  for (let index = 0; index < value.length; index += 1) {
    hash ^= BigInt(value.charCodeAt(index))
    hash = (hash * prime) & mask
  }
  return hash.toString(16).padStart(16, '0')
}
