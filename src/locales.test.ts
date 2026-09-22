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

  it('traduce los nombres que aparecen en las tarjetas del catálogo', () => {
    expect(translations['ca-valencia'].templateLearningSituation).toBe('Situació d’aprenentatge')
    expect(translations.ca.templateLesson).toBe('Sessió de classe')
    expect(translations.en.templateProject).toBe('PBL project')
    expect(translations.en.templateRubric).toBe('Rubric')
    expect(translations['ca-valencia'].templateChecklist).toBe('Llista de coteig')
  })
})
