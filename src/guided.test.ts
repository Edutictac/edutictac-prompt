import { describe, expect, it } from 'vitest'
import { templates } from './templates'
import { translations } from './locales'
import { guidedBlockIds, guidedSteps } from './guided'
import type { Language } from './types'

const languages: Language[] = ['es', 'ca-valencia', 'ca', 'en']
const blockKey = (block: string) => `guided${block[0].toUpperCase()}${block.slice(1)}`

describe('modo paso a paso', () => {
  it('reparte todos los campos de cada plantilla sin perder ni duplicar ninguno', () => {
    for (const template of templates) {
      const steps = guidedSteps(template)
      const seen = steps.flatMap(step => step.fields)
      expect([...seen].sort(), template.id).toEqual(template.fields.map(field => field.id).sort())
      expect(new Set(seen).size, template.id).toBe(template.fields.length)
    }
  })

  it('mantiene el formato de salida en el último paso', () => {
    for (const template of templates) {
      const steps = guidedSteps(template)
      expect(steps.at(-1)?.block, template.id).toBe('format')
    }
  })

  it('traduce el título y la ayuda de cada bloque en los cuatro idiomas', () => {
    for (const language of languages) {
      const t = translations[language]
      for (const block of guidedBlockIds) {
        expect(t[blockKey(block)], `${language}.${blockKey(block)}`).toBeTruthy()
        expect(t[`${blockKey(block)}Help`], `${language}.${blockKey(block)}Help`).toBeTruthy()
      }
    }
  })

  it('traduce la navegación y el resumen del modo guiado', () => {
    const keys = ['guidedMode', 'guidedModeHint', 'stepOf', 'stepsLeft', 'lastStep', 'next', 'back', 'skip', 'seeSummary', 'summaryTitle', 'summaryHelp', 'summaryEmpty', 'summaryMissing']
    for (const language of languages) for (const key of keys) {
      expect(translations[language][key], `${language}.${key}`).toBeTruthy()
    }
  })
})
