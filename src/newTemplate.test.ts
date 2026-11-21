import { describe, expect, it } from 'vitest'

// «npm run new-template» deja marcas TODO(new-template) donde falta texto.
// Mientras quede alguna, esta prueba falla y no se puede publicar.
const MARK = 'TODO(new-' + 'template)'
const sources = import.meta.glob<string>(['./**/*.ts', './**/*.tsx', '!./**/*.test.*'], {
  query: '?raw',
  import: 'default',
  eager: true,
})

describe('herramientas nuevas', () => {
  it('no quedan textos pendientes del esqueleto de una herramienta', () => {
    expect(Object.keys(sources).length).toBeGreaterThan(50)
    const pending = Object.entries(sources)
      .filter(([, source]) => source.includes(MARK))
      .map(([path]) => path)
    expect(pending).toEqual([])
  })
})
