import { describe, expect, it } from 'vitest'
import { generatePrompt } from '../../generator'
import { templates } from '../../templates'
import { localizeOption } from '../../optionLocales'
import type { Language } from '../../types'

const template = templates.find((item) => item.id === 'three-levels')!
const languages: Language[] = ['es', 'ca-valencia', 'ca', 'en']

describe('un material, tres niveles', () => {
  it.each(languages)('incluye el encargo y la actividad en %s, también con datos guardados anteriores', (language) => {
    const prompt = generatePrompt(template, { task: 'ACTIVIDAD ORIGINAL', objectives: 'OBJETIVO COMÚN' }, language)
    expect(prompt).toContain('ACTIVIDAD ORIGINAL')
    expect(prompt).toContain('OBJETIVO COMÚN')
    for (const option of ['Con más apoyo', 'Actividad de referencia', 'Ampliación'])
      expect(prompt).toContain(localizeOption(option, language))
  })

  it.each(languages)('respeta las versiones y apoyos elegidos en %s', (language) => {
    const prompt = generatePrompt(
      template,
      {
        task: 'ACTIVIDAD ORIGINAL',
        supportVersions: 'Con más apoyo · Ampliación',
        supportChoices: 'Ejemplo resuelto · Opciones de respuesta',
        duration: '45 min',
      },
      language,
    )
    expect(prompt).toContain(localizeOption('Con más apoyo', language))
    expect(prompt).toContain(localizeOption('Ampliación', language))
    expect(prompt).not.toContain(localizeOption('Actividad de referencia', language))
    expect(prompt).toContain(localizeOption('Ejemplo resuelto', language))
    expect(prompt).toContain(localizeOption('Opciones de respuesta', language))
    expect(prompt).toContain('45 min')
  })

  it('pide mantener la exigencia y una evaluación equivalente', () => {
    const prompt = generatePrompt(template, { task: 'Una actividad' }, 'es')
    expect(prompt).toContain('Mantén el mismo objetivo de aprendizaje y la exigencia')
    expect(prompt).toContain('evaluación común o equivalente')
  })
})
