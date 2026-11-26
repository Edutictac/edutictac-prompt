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
      for (const literal of ['OMML', '.docx', '.tex', 'LaTeX']) expect(prompt).toContain(literal)
      for (const editor of ['Word', 'Moodle/Aules', 'Overleaf']) expect(prompt).toContain(editor)
      expect(prompt).not.toContain('undefined')
    },
  )

  it('se encuentra por necesidad y por editor', () => {
    for (const query of ['latex', 'fórmulas', 'cálculos', 'overleaf'])
      expect(searchTemplates(query).map((item) => item.id)).toContain(template.id)
  })

  it('pide fórmulas renderizadas y ecuaciones editables en documentos, sin entregar código', () => {
    const prompt = generatePrompt(template, {}, 'es')
    expect(prompt).toContain('fórmulas renderizadas dentro del contenido')
    expect(prompt).toContain('No devuelvas código fuente LaTeX, bloques de código')
    expect(prompt).toContain('ecuaciones nativas editables (OMML)')
    expect(prompt).toContain('pasos intermedios')
    expect(prompt).toContain('Resuelve solo si se pide')
    expect(prompt).toContain('Si no puedes crear el archivo solicitado')
    expect(prompt).not.toContain('Entrega el código fuente literal')
    const formats = template.fields.find((field) => field.id === 'outputFormat')!.options!
    expect(formats).toEqual(expect.arrayContaining(['Markdown', 'PDF', 'ODT', 'DOCX']))
    expect(generatePrompt(template, { outputFormat: 'DOCX' }, 'es')).toContain('documento de Word (.docx) descargable')
  })
})
