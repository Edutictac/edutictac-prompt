import { describe, expect, it } from 'vitest'
import { templates } from '../../templates'
import { generatePrompt } from '../../generator'
import { exampleValues } from '../../examples'
import { searchTemplates } from '../../search'
import type { Language } from '../../types'

const template = templates.find((item) => item.id === 'editable-latex')!

describe('LaTeX editable', () => {
  it.each<Language>(['es', 'ca-valencia', 'ca', 'en'])(
    'conserva el encargo, el original y el destino en %s',
    (language) => {
      const values = exampleValues(template.id, language)
      const prompt = generatePrompt(template, values, language)
      expect(prompt).toContain(values.task)
      expect(prompt).toContain(values.sourceText)
      expect(prompt).toContain(values.mathDestination)
      for (const literal of ['\\frac{a}{b}', 'x^{2}', 'x_{1}', '\\sqrt{x}', '\\approx', '.tex', 'amsmath'])
        expect(prompt).toContain(literal)
      for (const editor of ['Word', 'Moodle/Aules', 'Overleaf']) expect(prompt).toContain(editor)
      expect(prompt).toMatch(/latex/)
      expect(prompt).not.toContain('undefined')
    },
  )

  it('se encuentra por necesidad y por editor', () => {
    for (const query of ['latex', 'fórmulas', 'cálculos', 'overleaf'])
      expect(searchTemplates(query).map((item) => item.id)).toContain(template.id)
  })

  it('protege la fuente editable y diferencia conversión de resolución', () => {
    const prompt = generatePrompt(template, {}, 'es')
    expect(prompt).toContain('bloques de código etiquetados latex')
    expect(prompt).toContain('pasos intermedios')
    expect(prompt).toContain('Resuelve solo si se pide')
    expect(prompt).toContain('pregunta dónde se van a editar')
    expect(prompt).toContain('sin delimitadores ni entornos de documento')
    expect(prompt).toContain('Word admite un subconjunto de LaTeX')
    expect(template.fields.find((field) => field.id === 'outputFormat')!.options).toEqual(['Markdown', 'Texto'])
  })
})
