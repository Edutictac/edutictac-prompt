import type { Language } from '../types'
export const categories = [
  'planning',
  'assessment',
  'inclusion',
  'materials',
  'moodle',
  'digital',
  'ai',
  'management',
  'robotics',
  'other',
] as const
export type SkillCategory = (typeof categories)[number]
export const stages = [
  'all',
  'infant',
  'primary',
  'secondary',
  'bach',
  'fp',
  'adult',
] as const
export const parameterTypes = [
  'text',
  'textarea',
  'number',
  'select',
  'multiselect',
  'boolean',
] as const
export type Value = string | number | boolean | string[]
export interface Parameter {
  id: string
  name: string
  type: (typeof parameterTypes)[number]
  description: string
  required: boolean
  defaultValue?: Value
  options: string[]
  min?: number
  max?: number
  maxLength?: number
}
export interface Resource {
  path: string
  content: string
}
export interface Example {
  language: Language
  input: string
  output: string
}
export interface SkillDefinition {
  slug: string
  name: string
  description: string
  category: SkillCategory
  tags: string[]
  language: Language
  stage: (typeof stages)[number]
  author: string
  license: string
  version: string
  instructions: string
  parameters: Parameter[]
  procedure: string[]
  resources: Resource[]
  examples: Example[]
  outputFormat: string
  requirements: string
  restrictions: string
  mode: 'instructions' | 'external'
}
export interface Skill extends SkillDefinition {
  id: string
  ownerId: string
  source: 'builtin' | 'personal' | 'imported'
  status: 'draft' | 'ready'
  visibility: 'private'
  reviewed: boolean
  revision: number
  synced?: boolean
  createdAt: string
  updatedAt: string
}
export interface SkillRevision {
  key: string
  skillId: string
  ownerId: string
  revision: number
  snapshot: Skill
}
export const languages: Language[] = ['es', 'ca-valencia', 'ca', 'en']
