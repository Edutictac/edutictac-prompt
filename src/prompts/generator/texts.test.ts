import { describe, expect, it } from 'vitest'
import type { Language } from '../../types'
import {
  assessmentTexts,
  defaults,
  extraLabels,
  gameTexts,
  imageToolTexts,
  labels,
  reviewTypes,
  reviews,
  udlTexts,
} from './texts'
import { videoBriefs } from './video'

const languages: Language[] = ['es', 'ca-valencia', 'ca', 'en']
const sameKeys = (record: Record<Language, object>, name: string) => {
  const reference = Object.keys(record.es).sort()
  for (const language of languages)
    expect(Object.keys(record[language]).sort(), `${name}.${language}`).toEqual(reference)
  return reference
}

describe('integridad de los textos del generador', () => {
  it('mantiene las mismas claves y textos no vacíos en los cuatro idiomas', () => {
    sameKeys(labels, 'labels')
    sameKeys(defaults, 'defaults')
    sameKeys(udlTexts, 'udlTexts')
    sameKeys(gameTexts, 'gameTexts')
    sameKeys(assessmentTexts, 'assessmentTexts')
    sameKeys(imageToolTexts, 'imageToolTexts')
    sameKeys(extraLabels, 'extraLabels')
    for (const language of languages) expect(videoBriefs[language].trim(), `videoBriefs.${language}`).not.toBe('')
    for (const language of languages) {
      for (const value of Object.values(labels[language])) expect(value.trim(), language).not.toBe('')
      for (const value of Object.values(defaults[language])) expect(value.trim(), language).not.toBe('')
      for (const value of Object.values(imageToolTexts[language])) expect(value.trim(), language).not.toBe('')
      for (const value of Object.values(extraLabels[language])) expect(value.trim(), language).not.toBe('')
    }
  })

  it('mantiene la misma estructura en los textos con listas', () => {
    for (const language of languages) {
      expect(Object.keys(udlTexts[language].principles).sort(), language).toEqual(
        Object.keys(udlTexts.es.principles).sort(),
      )
      expect(udlTexts[language].checks).toHaveLength(udlTexts.es.checks.length)
      expect(gameTexts[language].techItems).toHaveLength(gameTexts.es.techItems.length)
      expect(Object.keys(gameTexts[language].featureTexts).sort(), language).toEqual(
        Object.keys(gameTexts.es.featureTexts).sort(),
      )
      expect(Object.keys(assessmentTexts[language].tasks).sort(), language).toEqual(
        Object.keys(assessmentTexts.es.tasks).sort(),
      )
      expect(Object.keys(reviews[language]).sort(), language).toEqual(Object.keys(reviews.es).sort())
      for (const type of Object.keys(reviews.es) as (keyof typeof reviews.es)[])
        expect(reviews[language][type], `${language}.${type}`).toHaveLength(reviews.es[type].length)
    }
  })

  it('solo usa tipos de revisión conocidos', () => {
    for (const type of Object.values(reviewTypes))
      expect(['generic', 'assessment', 'adaptation', 'communication', 'video']).toContain(type)
  })
})
