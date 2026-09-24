import { describe, expect, it } from 'vitest'
import { fieldSuggestions } from './suggestions'
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
})
