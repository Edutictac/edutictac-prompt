import { templates } from '../../templates'
import { initialValues } from './values'
import { valencianProfiles } from '../../curriculum'
import { translations } from '../../locales'
import type { Language } from '../../types'

const storageKey = 'edutictac-default-output-format'
export const availableDefaultFormats = [
  ...new Set(
    templates.flatMap((template) => template.fields.find((field) => field.id === 'outputFormat')?.options || []),
  ),
].sort((a, b) => a.localeCompare(b))

export function readDefaultFormat(): string {
  try {
    const stored = localStorage.getItem(storageKey) || ''
    return availableDefaultFormats.includes(stored) ? stored : ''
  } catch {
    return ''
  }
}

export function writeDefaultFormat(format: string, source: 'user' | 'remote' = 'user'): void {
  const previous = readDefaultFormat()
  try {
    if (availableDefaultFormats.includes(format)) localStorage.setItem(storageKey, format)
    else localStorage.removeItem(storageKey)
  } catch {
    // La aplicación sigue funcionando si el navegador bloquea el almacenamiento.
  }
  window.dispatchEvent(new CustomEvent('prompt:default-format', { detail: { format, source, previous } }))
}

const curriculumKey = 'edutictac-default-curriculum-profile'
export function readDefaultCurriculum(): string {
  try {
    const id = localStorage.getItem(curriculumKey) || ''
    return valencianProfiles.some((profile) => profile.id === id) ? id : ''
  } catch {
    return ''
  }
}
export function writeDefaultCurriculum(id: string): void {
  const previous = readDefaultCurriculum()
  try {
    if (valencianProfiles.some((profile) => profile.id === id)) localStorage.setItem(curriculumKey, id)
    else localStorage.removeItem(curriculumKey)
  } catch {
    /* El ajuste es opcional. */
  }
  window.dispatchEvent(new CustomEvent('prompt:default-curriculum', { detail: { previous } }))
}

export function preferredInitialValues(
  templateId: string,
  language: Language = 'es',
  profileId = readDefaultCurriculum(),
): Record<string, string> {
  const values = initialValues(templateId)
  const formats = templates
    .find((template) => template.id === templateId)
    ?.fields.find((field) => field.id === 'outputFormat')?.options
  const preferred = readDefaultFormat()
  if (preferred && formats?.includes(preferred)) values.outputFormat = preferred
  const template = templates.find((item) => item.id === templateId)
  const profile = valencianProfiles.find((item) => item.id === profileId)
  const levelField = template?.fields.find((field) => field.id === 'level')
  if (profile && levelField?.options?.includes(profile.level)) {
    values.curriculumProfile = profile.id
    values.curriculumContext = `${translations[language].curriculumName}: ${profile.labels[language]}.`
    values.level = profile.level
    if (profile.subject && template?.fields.some((field) => field.id === 'subject'))
      values.subject = profile.subjectLabels[language]
  }
  return values
}

// Evita mantener un perfil curricular y selecciones que no corresponden al
// nivel o materia que el docente acaba de cambiar en el formulario.
export function reconcileCurriculum(values: Record<string, string>): Record<string, string> {
  const profile = valencianProfiles.find((item) => item.id === values.curriculumProfile)
  if (!profile) return values
  const subject = (values.subject || '').trim().toLocaleLowerCase()
  const matchingSubjects = [profile.subject, ...Object.values(profile.subjectLabels)].map((item) =>
    item.trim().toLocaleLowerCase(),
  )
  if (
    (!values.level || values.level === profile.level) &&
    (!profile.subject || !subject || matchingSubjects.includes(subject))
  )
    return values
  return {
    ...values,
    curriculumProfile: '',
    curriculumContext: '',
    curriculumCompetences: '',
    curriculumCriteria: '',
    curriculumKnowledge: '',
  }
}
