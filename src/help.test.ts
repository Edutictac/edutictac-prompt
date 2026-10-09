import { describe, expect, it } from 'vitest'
import { helpGuide } from './help'
import type { Language } from './types'

const languages: Language[] = ['es', 'ca-valencia', 'ca', 'en']

describe('help guide', () => {
  it('has the same sections in every language', () => {
    const ids = helpGuide('es').sections.map(s => s.id)
    for (const language of languages) {
      const guide = helpGuide(language)
      expect(guide.sections.map(s => s.id)).toEqual(ids)
      expect(guide.sections.map(s => s.points?.length)).toEqual(helpGuide('es').sections.map(s => s.points?.length))
    }
  })

  it('has no empty text', () => {
    for (const language of languages) {
      const guide = helpGuide(language)
      for (const text of [guide.title, guide.lead, guide.contents, guide.beforeLabel, guide.afterLabel]) expect(text.trim()).not.toBe('')
      for (const s of guide.sections) {
        expect(s.title.trim()).not.toBe('')
        for (const [label, text] of s.points ?? []) {
          expect(label.trim()).not.toBe('')
          expect(text.trim()).not.toBe('')
        }
      }
    }
  })

  it('keeps central Catalan free of Valencian forms', () => {
    const text = JSON.stringify(helpGuide('ca'))
    for (const form of [' este ', ' esta ', 'Ací', 'eixida', 'Obri en', 'Guardar', 'afig', 'Compartix']) expect(text).not.toContain(form)
  })
})
