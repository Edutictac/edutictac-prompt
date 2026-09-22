import { describe, expect, it } from 'vitest'
import { templates } from './templates'

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
})
