import { describe, expect, it } from 'vitest'
import { templates } from '../../templates'
import { exampleValues } from '../../examples'
import { generatePrompt } from '../../generator'
import { RUBRIC_CSV_FORMAT } from '../generator/rubricCsv'
import type { Language } from '../../types'
import { parsePromptBlocks, serializePromptBlocks } from './promptBlocks'

describe('lossless visual prompt blocks', () => {
  it('preserves headings, bullets, numbering, whitespace and line endings', () => {
    const text = '## Rol\r\nDocente.  \r\n\r\n- Primera\r\n  * Segunda\r\n1. Tercera\r\n'
    const blocks = parsePromptBlocks(text)!
    expect(blocks.map((block) => block.kind)).toEqual(['heading', 'paragraph', 'blank', 'bullet', 'bullet', 'numbered'])
    expect(serializePromptBlocks(blocks)).toBe(text)
  })
  it.each([
    '```csv\na,b\n```',
    '| A | B |\n|---|---|',
    'Una **palabra** destacada',
    '[enlace](https://example.org)',
    '<div>Hola</div>',
    '    código',
  ])('uses original text for complex formatting: %s', (text) => {
    expect(parsePromptBlocks(text)).toBeNull()
  })
  it.each<Language>(['es', 'ca-valencia', 'ca', 'en'])('preserves the Aules CSV instructions in %s', (language) => {
    const rubric = templates.find((item) => item.id === 'rubric')!
    const original = generatePrompt(
      rubric,
      { outputFormat: RUBRIC_CSV_FORMAT, activity: 'Cartel', criteria: 'Argumenta' },
      language,
    )
    const blocks = parsePromptBlocks(original)
    if (blocks) expect(serializePromptBlocks(blocks)).toBe(original)
    else expect(parsePromptBlocks(original)).toBeNull()
    expect(original).toContain('criterion,level,level_description,score')
  })
  it('round-trips every supported generated prompt in all languages', () => {
    let supported = 0
    for (const template of templates)
      for (const language of ['es', 'ca-valencia', 'ca', 'en'] as Language[]) {
        for (const values of [{}, exampleValues(template.id, language)]) {
          const text = generatePrompt(template, values, language)
          const blocks = parsePromptBlocks(text)
          if (blocks) {
            supported++
            expect(serializePromptBlocks(blocks)).toBe(text)
          }
        }
      }
    expect(supported).toBeGreaterThan(300)
  })
})
