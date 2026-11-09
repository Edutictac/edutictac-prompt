import { describe, expect, it } from 'vitest'
import { templates } from '../../templates'
import { generatePrompt } from '../../generator'
import { exampleValues } from '../../examples'
import type { Language } from '../../types'
import { initialValues } from '../form/values'
import { goldenHash } from './goldenHash'
import { goldenOutputs } from './outputs.golden'

const languages: Language[] = ['es', 'ca-valencia', 'ca', 'en']

describe('salidas completas del generador', () => {
  it('no cambian para ninguna plantilla, idioma ni variante', () => {
    const current: Record<string, string> = {}
    for (const template of templates) {
      for (const language of languages) {
        const variants: [string, Record<string, string>][] = [
          ['empty', initialValues(template.id)],
          ['example', exampleValues(template.id, language)],
        ]
        for (const [variant, values] of variants) {
          current[`${template.id}:${language}:${variant}`] = goldenHash(generatePrompt(template, values, language))
        }
      }
    }
    const changed = Object.keys(goldenOutputs).filter((key) => current[key] !== goldenOutputs[key])
    const missing = Object.keys(goldenOutputs).filter((key) => !(key in current))
    const extra = Object.keys(current).filter((key) => !(key in goldenOutputs))
    expect({ changed, missing, extra }).toEqual({ changed: [], missing: [], extra: [] })
  })
})
