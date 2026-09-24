import { describe, expect, it } from 'vitest'
import { categoryIds, simpleFieldIds, templates } from './templates'

describe('plantillas de prompts', () => {
  it('ofrece contexto, restricciones y criterios de calidad', () => {
    for (const template of templates) {
      const fieldIds = template.fields.map(field => field.id)

      expect(fieldIds).toContain('context')
      expect(fieldIds).toContain('constraints')
      expect(fieldIds).toContain('qualityCriteria')
    }
  })

  it('no duplica campos al preparar las plantillas', () => {
    for (const template of templates) {
      const fieldIds = template.fields.map(field => field.id)
      expect(new Set(fieldIds).size).toBe(fieldIds.length)
    }
  })

  it('no ofrece categorías sin herramientas', () => {
    const categoriesWithTemplates = new Set(templates.map(template => template.category))
    expect(categoryIds).toEqual(['all', ...categoriesWithTemplates])
    expect(categoryIds.slice(1).every(category => categoriesWithTemplates.has(category))).toBe(true)
  })

  it('inclou els instruments d’avaluació sol·licitats', () => {
    expect(templates.map(template => template.id)).toEqual(expect.arrayContaining([
      'rubric', 'rating-scale', 'checklist', 'systematic-observation', 'portfolio', 'production', 'written-test', 'product', 'presentation'
    ]))
  })

  it('define un modo sencillo con menos campos que el modo avanzado', () => {
    for (const template of templates) {
      expect(simpleFieldIds[template.id]?.length).toBeGreaterThan(0)
      expect(simpleFieldIds[template.id].length).toBeLessThan(template.fields.length)
    }
  })

  it('deja el formato de salida al final y admite PDF', () => {
    for (const template of templates) {
      const last = template.fields[template.fields.length - 1]
      expect(last.id).toBe('outputFormat')
      expect(last.options).toContain('PDF')
    }
  })

  it('activa les categories d’adaptació, continguts i comunicació', () => {
    const ids = templates.map(template => template.id)
    expect(ids).toEqual(expect.arrayContaining([
      'feedback', 'three-levels', 'easy-reading', 'bias-check',
      'glossary-support', 'family-note', 'tutoring-script', 'scorm'
    ]))

    const categories = new Set(templates.map(template => template.category))
    expect(categories.has('adaptation')).toBe(true)
    expect(categories.has('content')).toBe(true)
    expect(categories.has('communication')).toBe(true)
  })
})
