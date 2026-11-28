import { templates } from '../../templates'
import { initialValues } from './values'

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

export function writeDefaultFormat(format: string): void {
  try {
    if (availableDefaultFormats.includes(format)) localStorage.setItem(storageKey, format)
    else localStorage.removeItem(storageKey)
  } catch {
    // La aplicación sigue funcionando si el navegador bloquea el almacenamiento.
  }
}

export function preferredInitialValues(templateId: string): Record<string, string> {
  const values = initialValues(templateId)
  const formats = templates
    .find((template) => template.id === templateId)
    ?.fields.find((field) => field.id === 'outputFormat')?.options
  const preferred = readDefaultFormat()
  if (preferred && formats?.includes(preferred)) values.outputFormat = preferred
  return values
}
