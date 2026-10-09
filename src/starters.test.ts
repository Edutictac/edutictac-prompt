import { describe, expect, it } from 'vitest'
import { starters, starterTitle, starterValues } from './starters'
import { ADULT_LEVEL, templates } from './templates'
import type { Language } from './types'

const languages: Language[] = ['es', 'ca-valencia', 'ca', 'en']

describe('starters', () => {
  it('apunta a plantillas existentes y rellena solo campos de esa plantilla', () => {
    for (const starter of starters) {
      const template = templates.find(t => t.id === starter.templateId)
      expect(template, starter.id).toBeDefined()
      const fields = new Map(template!.fields.map(f => [f.id, f]))
      for (const language of languages) {
        const values = starterValues(starter, language)
        for (const [key, value] of Object.entries(values)) {
          const field = fields.get(key)
          expect(field, `${starter.id}.${key}`).toBeDefined()
          if (field!.type === 'select') expect(field!.options, `${starter.id}.${key}`).toContain(value)
          expect(value.trim(), `${starter.id}.${key} (${language})`).not.toBe('')
        }
        expect(starterTitle(starter, language)).not.toBe('')
      }
    }
  })

  it('ofrece un caso por etapa, de Infantil a personas adultas', () => {
    expect(starters.map(s => s.level)).toEqual(['Infantil', 'Primaria', 'ESO', 'FP', ADULT_LEVEL])
  })

  it('el catalán central no hereda formas valencianas en los títulos', () => {
    const quiz = starters.find(s => s.id === 'eso-cell-quiz')!
    expect(starterTitle(quiz, 'ca')).toContain('a Aules')
    expect(starterTitle(quiz, 'ca-valencia')).toContain('en Aules')
  })
})
