import { describe, expect, it } from 'vitest'
import { version } from '../../../package.json'
import { templates } from '../../templates'
import { generatePrompt } from '../../generator'
import { exampleValues } from '../../examples'
import type { Language } from '../../types'
import { initialValues } from '../form/values'
import { goldenHash } from './goldenHash'
import { goldenOutputs } from './outputs.golden'

const languages: Language[] = ['es', 'ca-valencia', 'ca', 'en']

describe('salidas completas del generador', () => {
  it('no cambian para ninguna plantilla, idioma ni variante', async () => {
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
    // «npm run golden:update» reescribe las huellas cuando un cambio en los
    // prompts es intencionado. Revisa antes el diff de outputs.golden.ts.
    const env = (globalThis as { process?: { env: Record<string, string | undefined> } }).process?.env
    if (env?.UPDATE_GOLDEN === '1') {
      // Módulo de Node cargado por nombre para no meter sus tipos en la app.
      const fs: { writeFileSync: (path: string, data: string) => void } = await import(
        /* @vite-ignore */ 'node:' + 'fs'
      )
      const lines = Object.entries(current).map(([key, hash]) => `  '${key}': '${hash}',`)
      fs.writeFileSync(
        new URL('./outputs.golden.ts', import.meta.url).pathname,
        `// Generado con «npm run golden:update» (versión ${version}). No editar a mano.\nexport const goldenOutputs: Record<string, string> = {\n${lines.join('\n')}\n}\n`,
      )
      return
    }
    const changed = Object.keys(goldenOutputs).filter((key) => current[key] !== goldenOutputs[key])
    const missing = Object.keys(goldenOutputs).filter((key) => !(key in current))
    const extra = Object.keys(current).filter((key) => !(key in goldenOutputs))
    expect({ changed, missing, extra }).toEqual({ changed: [], missing: [], extra: [] })
  })
})
