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
    const ownFormats: Record<string, string[]> = {
      scorm: ['SCORM 1.2'], h5p: ['H5P'], gift: ['GIFT'], qti: ['QTI 2.1'], 'common-cartridge': ['Common Cartridge']
    }
    for (const template of templates) {
      const last = template.fields[template.fields.length - 1]
      expect(last.id).toBe('outputFormat')
      if (ownFormats[template.id]) {
        expect(last.options).toEqual(ownFormats[template.id])
      } else {
        expect(last.options).toContain('PDF')
      }
    }
  })

  it('activa les categories d’adaptació, continguts i comunicació', () => {
    const ids = templates.map(template => template.id)
    expect(ids).toEqual(expect.arrayContaining([
      'feedback', 'three-levels', 'easy-reading', 'bias-check',
      'glossary-support', 'family-note', 'tutoring-script', 'scorm',
      'gift', 'qti', 'common-cartridge'
    ]))

    const categories = new Set(templates.map(template => template.category))
    expect(categories.has('adaptation')).toBe(true)
    expect(categories.has('content')).toBe(true)
    expect(categories.has('communication')).toBe(true)
  })

  it('activa la categoría visual con las plantillas de imagen', () => {
    const ids = templates.map(template => template.id)
    expect(ids).toEqual(expect.arrayContaining(['scientific-illustration', 'infographic', 'mind-map']))
    expect(new Set(templates.map(template => template.category)).has('visual')).toBe(true)
    expect(categoryIds).toContain('visual')
  })

  it('ofrece el selector de herramienta de IA y el refinamiento en todas las plantillas', () => {
    for (const template of templates) {
      const fieldIds = template.fields.map(field => field.id)
      expect(fieldIds, template.id).toContain('aiTool')
      expect(fieldIds, template.id).toContain('refinement')
    }
  })

  it('ofrece el DUA en las plantillas de diseño y las barreras también en evaluación y adaptación', () => {
    for (const template of templates) {
      const fieldIds = template.fields.map(field => field.id)
      const designs = ['planning', 'activities', 'content', 'digital'].includes(template.category)
      expect(fieldIds.includes('udl'), template.id).toBe(designs)
      expect(fieldIds.includes('barriers'), template.id).toBe(designs || ['assessment', 'adaptation'].includes(template.category))
    }
    expect(templates.map(template => template.id)).toEqual(expect.arrayContaining(['udl-review', 'udl-matrix']))
  })
})
