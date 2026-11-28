import { describe, expect, it } from 'vitest'
import { generatePrompt } from '../../generator'
import { templates } from '../../templates'
import type { Language } from '../../types'
import { RUBRIC_CSV_FORMAT } from './rubricCsv'

const find = (id: string) => templates.find((template) => template.id === id)!

describe('optional educational instructions', () => {
  it.each<Language>(['es', 'ca-valencia', 'ca', 'en'])('adds only selected instructions in %s', (language) => {
    const template = find('lesson')
    const baseline = generatePrompt(template, {}, language)
    const selected = generatePrompt(template, { priorKnowledge: 'Sí', guidedQuestions: 'Sí' }, language)
    expect(selected.length).toBeGreaterThan(baseline.length)
    expect(selected).not.toBe(baseline)
    expect(generatePrompt(find('feedback'), { priorKnowledge: 'Sí' }, language)).toBe(
      generatePrompt(find('feedback'), {}, language),
    )
  })
  it('adds actionable peer assessment instructions to regular rubrics and checklists', () => {
    for (const id of ['rubric', 'checklist']) {
      const prompt = generatePrompt(find(id), { peerAssessment: 'Sí' }, 'es')
      expect(prompt).toContain('comentarios constructivos basados en evidencias')
      expect(prompt).toContain('El profesorado conserva la decisión de evaluación')
    }
  })
  it('keeps the Aules CSV constraints with optional peer assessment and clarification', () => {
    const prompt = generatePrompt(
      find('rubric'),
      { outputFormat: RUBRIC_CSV_FORMAT, peerAssessment: 'Sí', guidedQuestions: 'Sí' },
      'es',
    )
    expect(prompt).toContain('descriptores observables comprensibles')
    expect(prompt).toContain('espera la respuesta')
    expect(prompt).toContain('criterion,level,level_description,score')
    expect(prompt).toContain('No incluyas explicaciones ni una tabla Markdown dentro del archivo')
  })
})
