import { describe, expect, it } from 'vitest'
import { generatePrompt } from '../../generator'
import { templates } from '../../templates'
import type { Language } from '../../types'

const cards = templates.find((template) => template.id === 'flashcards')!
const lesson = templates.find((template) => template.id === 'lesson')!

describe('flashcards and lesson openings', () => {
  it.each<Language>(['es', 'ca-valencia', 'ca', 'en'])('includes the supplied count and source in %s', (language) => {
    const prompt = generatePrompt(
      cards,
      { topic: 'Ecosystems', questionCount: '15', sourceText: 'SOURCE-42' },
      language,
    )
    expect(prompt).toContain('15')
    expect(prompt).toContain('SOURCE-42')
    expect(prompt).toContain('Ecosystems')
  })
  it('asks for matching fronts and backs without claiming a tested print layout', () => {
    const prompt = generatePrompt(cards, { topic: 'El agua' }, 'es')
    expect(prompt).toContain('el reverso con el mismo número')
    expect(prompt).toContain('sin inventar datos')
    expect(prompt).toContain('No afirmes que se ha probado la impresión')
  })
  it('adds optional openings only when selected', () => {
    expect(generatePrompt(lesson, {}, 'es')).not.toContain('dos o tres inicios breves')
    expect(generatePrompt(lesson, { lessonOpening: 'Sí' }, 'es')).toContain('dos o tres inicios breves')
  })
})
