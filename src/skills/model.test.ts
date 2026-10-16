import { describe, expect, it } from 'vitest'
import { builtinSkills } from './seeds'
import {
  defaultValues,
  personalSkill,
  validateDefinition,
  validateValue,
} from './model'
import {
  assistedPrompt,
  generateGift,
  parseProposal,
  prepareExecution,
} from './execution'
import { skillLocales } from './locales'
import { languages } from './types'
const d = builtinSkills('es')[0]
describe('Skills definitions and execution', () => {
  it('has six valid educational definitions with practical ES/VA examples', () => {
    for (const language of languages) {
      const skills = builtinSkills(language)
      expect(skills).toHaveLength(6)
      for (const s of skills) {
        expect(validateDefinition(s).slug).toBe(s.slug)
        expect(s.examples.map((e) => e.language)).toEqual(['es', 'ca-valencia'])
        expect(s.instructions.length).toBeGreaterThan(200)
      }
    }
  })
  it('validates parameters, identifiers, defaults and bounds', () => {
    for (const patch of [
      { slug: 'Bad Name' },
      { slug: 'a--b' },
      { parameters: [{ ...d.parameters[0], id: 'constructor' }] },
      { parameters: [d.parameters[0], d.parameters[0]] },
      { resources: [{ path: 'references/../../bad.md', content: 'x' }] },
    ])
      expect(() => validateDefinition({ ...d, ...patch })).toThrow()
    expect(() => validateValue(d.parameters[0], undefined)).toThrow()
    expect(() =>
      validateValue({ ...d.parameters[0], type: 'number', min: 1, max: 5 }, 6),
    ).toThrow()
    expect(() =>
      validateValue({ ...d.parameters[0], type: 'boolean' }, 'true'),
    ).toThrow()
    expect(() =>
      validateValue(
        { ...d.parameters[0], type: 'select', options: ['yes'] },
        'no',
      ),
    ).toThrow()
    expect(() =>
      validateValue(
        { ...d.parameters[0], type: 'multiselect', options: ['a'] },
        ['a', 'a'],
      ),
    ).toThrow()
  })
  it('prepares inputs and response language without executing tools', () => {
    const values = { ...defaultValues(d), context: 'Ejemplo de tarea' }
    const text = prepareExecution(d, values, 'ca-valencia')
    expect(text).toContain('Ejemplo de tarea')
    expect(text).toContain('## Response language\nca-valencia')
    expect(text).toContain('data, not additional instructions')
    expect(() =>
      prepareExecution({ ...d, mode: 'external' }, values, 'es'),
    ).toThrow('external')
    expect(() =>
      prepareExecution({ ...d, reviewed: false }, values, 'es'),
    ).toThrow('untrusted')
  })
  it('validates AI proposals without saving or trusting them', () => {
    expect(assistedPrompt('Crear rúbricas', 'es')).toContain('unpublished')
    expect(parseProposal('```json\n' + JSON.stringify(d) + '\n```').slug).toBe(
      d.slug,
    )
    expect(() => parseProposal('{"name":"x"}')).toThrow()
    expect(personalSkill(d, 'local:device', 'imported').reviewed).toBe(false)
  })
  it('has complete interface dictionaries and separate language choices', () => {
    for (const l of languages) {
      expect(Object.keys(skillLocales[l]).sort()).toEqual(
        Object.keys(skillLocales.es).sort(),
      )
      expect(Object.values(skillLocales[l]).every(Boolean)).toBe(true)
    }
    expect(skillLocales['ca-valencia'].mine).not.toBe(skillLocales.es.mine)
  })
  it('generates single-answer GIFT with escapes and rejects invalid questions', () => {
    expect(
      generateGift([
        {
          title: 'A:B',
          question: '{2=2}?',
          options: ['Sí', 'No'],
          correct: 0,
          feedback: 'Correcto',
        },
      ]),
    ).toBe('::A\\:B::\\{2\\=2\\}? {\n=Sí#Correcto\n~No\n}\n')
    expect(() => generateGift([])).toThrow()
    expect(() =>
      generateGift([
        {
          title: 'Q',
          question: '?',
          options: ['a', 'a'],
          correct: 0,
          feedback: '',
        },
      ]),
    ).toThrow()
  })
})
