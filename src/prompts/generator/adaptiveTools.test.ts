import { describe, expect, it } from 'vitest'
import { templates } from '../../templates'
import { generatePrompt } from '../../generator'
import type { Language } from '../../types'
import { profileNote } from './profileAdaptation'
import { documentBrief } from './schoolDocument'

const languages: Language[] = ['es', 'ca-valencia', 'ca', 'en']
const optionsOf = (templateId: string, fieldId: string) =>
  templates.find((template) => template.id === templateId)!.fields.find((field) => field.id === fieldId)!.options!

describe('herramientas con catálogos propios', () => {
  it('tiene una orientación para cada perfil y cada tipo de documento en los cuatro idiomas', () => {
    const missing: string[] = []
    for (const language of languages) {
      for (const profile of optionsOf('profile-adaptation', 'profile'))
        if (!profileNote(language, profile).trim()) missing.push(`${language} perfil ${profile}`)
      for (const type of optionsOf('school-document', 'documentType'))
        if (!documentBrief(language, type).trim()) missing.push(`${language} documento ${type}`)
    }
    expect(missing).toEqual([])
  })

  it('lleva al prompt la orientación del perfil y del documento elegidos', () => {
    const adaptation = templates.find((template) => template.id === 'profile-adaptation')!
    const document = templates.find((template) => template.id === 'school-document')!
    for (const language of languages) {
      for (const profile of optionsOf('profile-adaptation', 'profile')) {
        const prompt = generatePrompt(adaptation, { level: 'ESO', profile, outputFormat: 'Texto' }, language)
        expect(prompt, `${language} ${profile}`).toContain(profileNote(language, profile))
      }
      for (const type of optionsOf('school-document', 'documentType')) {
        const prompt = generatePrompt(document, { documentType: type, outputFormat: 'Texto' }, language)
        expect(prompt, `${language} ${type}`).toContain(documentBrief(language, type))
      }
    }
  })
})
