import { describe, expect, it } from 'vitest'
import { normalizeSearchText, searchTemplates } from './search'
import { templates } from './templates'

const ids = (query: string, category?: string) => searchTemplates(query, category).map((template) => template.id)

describe('buscador del catálogo', () => {
  it('ignora mayúsculas, acentos y signos', () => {
    expect(normalizeSearchText('Rúbrica')).toBe('rubrica')
    expect(normalizeSearchText('col·legi')).toBe('collegi')
    expect(normalizeSearchText('  Mapa   mental  ')).toBe('mapa mental')
  })

  it('busca sin acentos', () => {
    expect(ids('rubrica')).toContain('rubric')
  })

  it('busca por sinónimos y necesidades', () => {
    expect(ids('examen')).toContain('written-test')
    expect(ids('lectura facil')).toContain('easy-reading')
    expect(ids('mapa mental')).toContain('mind-map')
  })

  it('busca por categoría', () => {
    const results = ids('evaluacion')
    expect(results).toContain('rubric')
    expect(results).toContain('checklist')
    expect(results.every((id) => templates.find((template) => template.id === id)?.category === 'assessment')).toBe(
      true,
    )
  })

  it('busca por el nombre en otros idiomas', () => {
    expect(ids('learning situation')).toContain('learning-situation')
    expect(ids('situacio d aprenentatge')).toContain('learning-situation')
  })

  it('combina varios términos y el filtro de categoría', () => {
    expect(ids('banco preguntas')).toContain('gift')
    expect(ids('rubrica', 'planning')).not.toContain('rubric')
    expect(ids('rubrica', 'assessment')).toContain('rubric')
  })

  it('devuelve todo con una consulta vacía', () => {
    expect(searchTemplates('')).toHaveLength(templates.length)
    expect(searchTemplates('   ')).toHaveLength(templates.length)
  })

  it('no devuelve nada si no hay coincidencias', () => {
    expect(ids('zzzz-no-existe')).toEqual([])
  })
})
