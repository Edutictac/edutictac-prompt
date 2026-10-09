import { describe, expect, it } from 'vitest'
import { fieldSuggestions, levelSuggestions, suggestionsFor } from './suggestions'
import { ADULT_LEVEL, templates } from './templates'
import { generatePrompt } from './generator'
import type { Language } from './types'

const languages: Language[] = ['es', 'ca-valencia', 'ca', 'en']

describe('sugerencias de campo', () => {
  it('ofrece sugerencias no vacías en todos los idiomas', () => {
    for (const field of Object.keys(fieldSuggestions)) {
      for (const language of languages) {
        expect(fieldSuggestions[field][language]?.length, `${field}.${language}`).toBeGreaterThan(0)
      }
    }
  })

  it('da sugerencias propias de FPA en todos los idiomas y las pone primero', () => {
    for (const [field, byLanguage] of Object.entries(levelSuggestions[ADULT_LEVEL])) {
      for (const language of languages) {
        const own = byLanguage[language]
        expect(own?.length, `${field}.${language}`).toBeGreaterThan(0)
        expect(suggestionsFor(field, language, ADULT_LEVEL).slice(0, own.length)).toEqual(own)
      }
    }
    expect(suggestionsFor('topic', 'es', 'ESO')).toEqual([])
  })
})

describe('educación de personas adultas', () => {
  it('es un nivel de todas las plantillas con nivel', () => {
    for (const template of templates) {
      const options = template.fields.find(field => field.id === 'level')?.options
      if (options) expect(options, template.id).toContain(ADULT_LEVEL)
    }
  })

  it('añade la orientación para alumnado adulto al contexto', () => {
    const gift = templates.find(template => template.id === 'gift')!
    const values = { level: ADULT_LEVEL, topic: 'Leer una factura de la luz', outputFormat: gift.fields.find(field => field.id === 'outputFormat')!.options![0] }
    expect(generatePrompt(gift, values, 'es')).toContain('no infantilice')
    expect(generatePrompt(gift, values, 'ca-valencia')).toContain('Educació de persones adultes')
    expect(generatePrompt(gift, { ...values, level: 'ESO' }, 'es')).not.toContain('no infantilice')
  })
})
