import { describe, expect, it } from 'vitest'
import {
  buildAgentConfiguration,
  defaultAgentDraft,
  agentStages,
} from '../skills/agents'
import { agentPresets, subjectSuggestions } from './presets'
import { wizardLocales } from './locales'
import { languages } from '../skills/types'
describe('educational agent designer', () => {
  it.each(languages)('validates all editable presets in %s', (l) => {
    const presets = agentPresets(l)
    expect(presets.length).toBeGreaterThanOrEqual(9)
    for (const preset of presets) {
      const configuration = buildAgentConfiguration(preset.draft)
      expect(configuration.instructions.length).toBeLessThanOrEqual(8000)
      expect(configuration.name.length).toBeLessThanOrEqual(30)
      expect(configuration.instructions).toContain(preset.draft.role)
    }
  })
  it('adapts levels and subjects while keeping the review and guide behaviors', () => {
    const source = agentPresets('es').find((p) => p.id === 'smart')!.draft
    const adapted = {
      ...source,
      stage: 'primary' as const,
      subject: 'Matemáticas',
      audience: 'Profesorado de Primaria',
    }
    const config = buildAgentConfiguration(adapted)
    expect(config.instructions).toContain('Educación Primaria')
    expect(config.instructions).toContain('Matemáticas')
    expect(config.instructions).toContain('Revisor')
    expect(config.instructions).toContain('Guía')
    expect(config.instructions).toContain('Actividad disfrazada de objetivo')
    expect(config.instructions).toContain('línea base')
    expect(config.instructions).toContain('una en una')
    expect(config.instructions).toContain('máximo 3 preguntas')
    expect(config.instructions).not.toContain('conservatorios')
  })
  it('supports auto response language and explicit language independently', () => {
    const d = defaultAgentDraft('es')
    expect(buildAgentConfiguration(d).instructions).toContain(
      wizardLocales.es.instructionAuto,
    )
    expect(
      buildAgentConfiguration({ ...d, responseLanguage: 'ca-valencia' })
        .instructions,
    ).toContain('Idioma habitual de resposta: ca-valencia')
  })
  it('validates new behavior fields and never silently truncates instructions', () => {
    const d = defaultAgentDraft('es')
    for (const change of [
      { maxQuestions: 0 },
      { maxQuestions: 2.5 },
      { modes: [{ name: 'x', when: '', behavior: 'x' }] },
      { stage: 'unknown' },
      { examples: [{ input: '', output: 'a' }] },
      { starterPrompts: [''] },
    ])
      expect(() =>
        buildAgentConfiguration({ ...d, ...change } as typeof d),
      ).toThrow()
    expect(() =>
      buildAgentConfiguration({
        ...d,
        criteria: 'x'.repeat(2500),
        errors: 'x'.repeat(2000),
        restrictions: 'x'.repeat(2500),
      }),
    ).toThrow('tooLong')
  })
  it('provides multilingual labels and free subject suggestions for all levels', () => {
    for (const l of languages) {
      expect(Object.keys(wizardLocales[l]).sort()).toEqual(
        Object.keys(wizardLocales.es).sort(),
      )
      for (const stage of agentStages)
        expect(subjectSuggestions(stage, l).length).toBeGreaterThan(0)
    }
  })
})
