import { describe, expect, it } from 'vitest'
import { translations } from './locales'
import type { Language } from './types'

const languages: Language[] = ['es', 'ca-valencia', 'ca', 'en']

describe('traducciones de la interfaz', () => {
  it('mantiene las mismas claves en todos los idiomas', () => {
    const reference = Object.keys(translations.es).sort()

    for (const language of languages) {
      expect(Object.keys(translations[language]).sort(), language).toEqual(reference)
      for (const key of reference) {
        expect(translations[language][key].trim(), `${language}.${key}`).not.toBe('')
      }
    }
  })

  it('incluye las cadenas de las zonas de interfaz traducibles', () => {
    const requiredKeys = [
      'lead', 'catalog', 'toolsCount', 'privacyTitle', 'privacyHeading',
      'privacyBody', 'offline', 'topicHint', 'curriculumElements',
      'subjectsForStage', 'subjectHint', 'chooseSubject', 'invalidFile',
      'titlePlaceholder', 'newCategoryPlaceholder', 'tagsPlaceholder',
      'editableHint', 'fullscreen', 'exitFullscreen',
      'updateAvailable', 'updateButton',
      'edit',
      'placeholderCourse', 'placeholderSubject', 'placeholderTopic',
      'placeholderObjectives', 'placeholderContext', 'placeholderConstraints',
      'placeholderQualityCriteria', 'placeholderRole', 'placeholderTask',
      'placeholderActivity', 'placeholderCriteria',
      'templateLearningSituation', 'templateLesson', 'templateSequence',
      'templateCompetencyActivity', 'templateProject', 'templateChallenge',
      'templateRubric', 'templateChecklist', 'templateH5p', 'templateFree'
    ]

    for (const key of requiredKeys) {
      expect(translations.es[key], `falta la clave ${key}`).toBeTruthy()
    }
  })

  it('usa un nombre de perfil curricular sin «opcional» para el prompt', () => {
    for (const language of languages) {
      const value = translations[language].curriculumName
      expect(value, language).toBeTruthy()
      expect(value.toLowerCase(), language).not.toContain('opcional')
      expect(value.toLowerCase(), language).not.toContain('optional')
      expect(value, language).not.toContain('(')
    }
  })

  it('traduce los nombres que aparecen en las tarjetas del catálogo', () => {
    expect(translations['ca-valencia'].templateLearningSituation).toBe('Situació d’aprenentatge')
    expect(translations.ca.templateLesson).toBe('Sessió de classe')
    expect(translations.en.templateProject).toBe('PBL project')
    expect(translations.en.templateRubric).toBe('Rubric')
    expect(translations['ca-valencia'].templateChecklist).toBe('Llista de coteig')
  })

  it('no deja textos en valenciano en la interfaz en castellano', () => {
    const catalan = /[àèòç·’]/
    const leftovers = Object.entries(translations.es).filter(([, value]) => catalan.test(value)).map(([key]) => key)
    expect(leftovers).toEqual([])
    expect(translations.es.level).toBe('Nivel educativo')
    expect(translations.es.privacyHeading).toBe('Una herramienta al servicio del profesorado')
  })
})
