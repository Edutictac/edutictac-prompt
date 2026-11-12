import { localizeOption } from '../../optionLocales'
import type { Language } from '../../types'

const localizedKeys = new Set([
  'level',
  'methodology',
  'duration',
  'resources',
  'outputFormat',
  'activityType',
  'visualStyle',
  'includeLabels',
  'aspectRatio',
  'questionTypes',
  'videoStyle',
  'videoVariant',
  'videoFinish',
  'tone',
  'voice',
])

export type ValueReader = (key: string) => string

export function readValue(values: Record<string, string>, key: string, language: Language): string {
  const raw = values[key]?.trim() || ''
  return localizedKeys.has(key)
    ? raw
        .split(' · ')
        .map((item) => localizeOption(item, language))
        .join(' · ')
    : raw
}

export function readCurriculum(values: Record<string, string>, key: string): string {
  const raw = values[key]?.trim() || ''
  return raw
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean)
    .map((item) => `- ${item}`)
    .join('\n')
}

export const mechanicsFor = (value: ValueReader) => value('activityType').split(' · ').filter(Boolean)
