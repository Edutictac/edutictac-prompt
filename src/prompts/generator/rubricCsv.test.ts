import { describe, expect, it } from 'vitest'
import { generatePrompt } from '../../generator'
import { templates } from '../../templates'
import type { Language } from '../../types'
import { RUBRIC_CSV_FORMAT } from './rubricCsv'

const rubric = templates.find((t) => t.id === 'rubric')!
const values = {
  level: 'ESO',
  course: '1',
  subject: 'Geografía e Historia',
  activity: 'Un póster sobre el Palmeral de Elche',
  criteria: 'Explica el valor patrimonial y propone una medida de conservación.',
  levels: '3',
  outputFormat: RUBRIC_CSV_FORMAT,
}

describe('rúbrica CSV de Aules', () => {
  it.each<Language>(['es', 'ca-valencia', 'ca', 'en'])(
    'preserves supplied evidence and requests the documented import format in %s',
    (language) => {
      const prompt = generatePrompt(rubric, values, language)
      expect(prompt).toContain('criterion,level,level_description,score')
      expect(prompt).toContain('UTF-8')
      expect(prompt).toContain(values.activity)
      expect(prompt).toContain(values.criteria)
      expect(prompt).toContain('rubrica-aules.csv')
      expect(prompt).toContain('100')
      expect(prompt).not.toMatch(/\n3\n/)
    },
  )
  it('uses the chosen maximum in both allocation and checks instead of forcing 100', () => {
    const prompt = generatePrompt(rubric, { ...values, maxScore: '10,5' }, 'es')
    expect(prompt).toContain('exactamente 10.5 puntos')
    expect(prompt).toContain('suma de máximos sea exactamente 10.5')
    expect(prompt).not.toContain('100')
    expect(prompt).toContain('cuatro niveles por criterio')
    expect(prompt).toContain('Insuficiente · En proceso · Conseguido · Excelente')
    expect(prompt).toContain('resto al último')
    expect(prompt).toContain('No inventes criterios curriculares')
    expect(prompt).toContain('sin inventar enlaces de descarga')
  })
  it.each(['0', '-10', 'NaN', '10 puntos', 'Infinity', '0.0001'])(
    'asks to correct an unusable maximum %s before requesting an import file',
    (maxScore) => {
      const prompt = generatePrompt(rubric, { ...values, maxScore }, 'es')
      expect(prompt).toContain('No generes el CSV')
      expect(prompt).not.toContain('rubrica-aules.csv')
    },
  )
  it('keeps other rubric formats and other tools on their existing path', () => {
    const prompt = generatePrompt(rubric, { ...values, levels: '5', outputFormat: 'Tabla Markdown' }, 'es')
    expect(prompt).toContain('Tabla Markdown')
    expect(prompt).not.toContain('criterion,level,level_description,score')
    const checklist = templates.find((t) => t.id === 'checklist')!
    expect(generatePrompt(checklist, values, 'es')).not.toContain('rubrica-aules.csv')
  })
})
