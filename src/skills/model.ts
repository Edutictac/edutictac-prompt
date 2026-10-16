import {
  categories,
  languages,
  parameterTypes,
  stages,
  type Parameter,
  type Skill,
  type SkillDefinition,
  type Value,
} from './types'
export class SkillError extends Error {
  constructor(
    public code: string,
    public field = '',
  ) {
    super(code)
  }
}
export const fail = (code: string, field = ''): never => {
  throw new SkillError(code, field)
}
export const slugify = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 64)
    .replace(/-$/, '')
export function validateSlug(value: unknown): asserts value is string {
  if (
    typeof value !== 'string' ||
    value.length > 64 ||
    value !== value.trim() ||
    !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(value)
  )
    fail('invalid', 'slug')
}
const text = (
  v: unknown,
  field: string,
  max: number,
  required = false,
): string => {
  if (
    typeof v !== 'string' ||
    v.length > max ||
    (required && !v.trim()) ||
    /\u0000/.test(v)
  )
    fail('invalid', field)
  return v as string
}
const list = (v: unknown, field: string, max: number): unknown[] => {
  if (!Array.isArray(v) || v.length > max) fail('invalid', field)
  return v as unknown[]
}
const obj = (v: unknown): Record<string, unknown> => {
  if (!v || typeof v !== 'object' || Array.isArray(v)) fail('invalid')
  return v as Record<string, unknown>
}
export function resourcePath(path: string) {
  if (
    path !== path.trim() ||
    !/^(references|assets)\/[a-zA-Z0-9_-]+\.(md|txt|csv|json)$/.test(path)
  )
    fail('unsafe', 'resources')
  return path
}
export function validateDefinition(input: unknown): SkillDefinition {
  const d = obj(input)
  validateSlug(d.slug)
  if (
    !categories.includes(d.category as never) ||
    !languages.includes(d.language as never) ||
    !stages.includes(d.stage as never) ||
    !['instructions', 'external'].includes(String(d.mode))
  )
    fail('invalid')
  const parameters = list(d.parameters, 'parameters', 30).map((raw) => {
    const p = obj(raw)
    if (
      typeof p.id !== 'string' ||
      p.id !== p.id.trim() ||
      !/^[a-z][a-z0-9_]{0,39}$/.test(p.id) ||
      ['__proto__', 'constructor', 'prototype'].includes(p.id)
    )
      fail('invalid', 'parameters')
    if (
      !parameterTypes.includes(p.type as never) ||
      typeof p.required !== 'boolean'
    )
      fail('invalid', 'parameters')
    const options = list(p.options, 'parameters', 100).map((o) =>
      text(o, 'parameters', 200, true),
    )
    if (
      (['select', 'multiselect'].includes(String(p.type)) && !options.length) ||
      new Set(options).size !== options.length
    )
      fail('invalid', 'parameters')
    const result: Parameter = {
      id: p.id as string,
      name: text(p.name, 'parameters', 120, true),
      description: text(p.description, 'parameters', 1000),
      type: p.type as Parameter['type'],
      required: p.required as boolean,
      options,
    }
    for (const k of ['min', 'max', 'maxLength'] as const)
      if (p[k] !== undefined) {
        if (
          typeof p[k] !== 'number' ||
          !Number.isFinite(p[k]) ||
          (k === 'maxLength' &&
            (!Number.isInteger(p[k]) ||
              (p[k] as number) < 1 ||
              (p[k] as number) > 20000))
        )
          fail('invalid', 'parameters')
        result[k] = p[k] as number
      }
    if (
      result.min !== undefined &&
      result.max !== undefined &&
      result.min > result.max
    )
      fail('invalid', 'parameters')
    if (p.defaultValue !== undefined) {
      validateValue(result, p.defaultValue, false)
      result.defaultValue = p.defaultValue as Value
    }
    return result
  })
  if (new Set(parameters.map((p) => p.id)).size !== parameters.length)
    fail('invalid', 'parameters')
  const resources = list(d.resources, 'resources', 30).map((raw) => {
    const r = obj(raw)
    return {
      path: resourcePath(text(r.path, 'resources', 150, true)),
      content: text(r.content, 'resources', 100000),
    }
  })
  if (
    new Set(resources.map((r) => r.path)).size !== resources.length ||
    resources.reduce(
      (a, r) => a + new TextEncoder().encode(r.content).length,
      0,
    ) > 1000000
  )
    fail('invalid', 'resources')
  return {
    slug: d.slug,
    name: text(d.name, 'name', 150, true),
    description: text(d.description, 'description', 1024, true),
    category: d.category as SkillDefinition['category'],
    language: d.language as SkillDefinition['language'],
    stage: d.stage as SkillDefinition['stage'],
    author: text(d.author, 'author', 150),
    license: text(d.license, 'license', 200, true),
    version: text(d.version, 'version', 40, true),
    tags: list(d.tags, 'tags', 30).map((v) => text(v, 'tags', 50, true)),
    instructions: text(d.instructions, 'instructions', 50000, true),
    parameters,
    procedure: list(d.procedure, 'procedure', 50).map((v) =>
      text(v, 'procedure', 2000, true),
    ),
    resources,
    examples: list(d.examples, 'examples', 30).map((raw) => {
      const e = obj(raw)
      if (!languages.includes(e.language as never)) fail('invalid', 'examples')
      return {
        language: e.language as SkillDefinition['language'],
        input: text(e.input, 'examples', 10000, true),
        output: text(e.output, 'examples', 10000, true),
      }
    }),
    outputFormat: text(d.outputFormat, 'outputFormat', 500, true),
    requirements: text(d.requirements, 'requirements', 500),
    restrictions: text(d.restrictions, 'restrictions', 5000),
    mode: d.mode as SkillDefinition['mode'],
  }
}
export function validateValue(
  p: Parameter,
  value: unknown,
  required = true,
): void {
  if (
    value === undefined ||
    value === '' ||
    (Array.isArray(value) && !value.length)
  ) {
    if (required && p.required) fail('required', p.name)
    return
  }
  const invalid = () => fail('parameter', p.name)
  if (p.type === 'number') {
    if (
      typeof value !== 'number' ||
      !Number.isFinite(value) ||
      (p.min !== undefined && value < p.min) ||
      (p.max !== undefined && value > p.max)
    )
      invalid()
  } else if (p.type === 'boolean') {
    if (typeof value !== 'boolean') invalid()
  } else if (p.type === 'multiselect') {
    if (
      !Array.isArray(value) ||
      value.some((v) => typeof v !== 'string' || !p.options.includes(v)) ||
      new Set(value).size !== value.length
    )
      invalid()
  } else {
    if (typeof value !== 'string' || value.length > (p.maxLength || 20000))
      invalid()
    if (p.type === 'select' && !p.options.includes(value as string)) invalid()
  }
}
export const defaultValues = (d: SkillDefinition): Record<string, Value> =>
  Object.fromEntries(
    d.parameters.map((p) => [
      p.id,
      p.defaultValue ??
        (p.type === 'boolean' ? false : p.type === 'multiselect' ? [] : ''),
    ]),
  )
export function blankDefinition(
  language: SkillDefinition['language'],
): SkillDefinition {
  return {
    slug: '',
    name: '',
    description: '',
    category: 'other',
    tags: [],
    language,
    stage: 'all',
    author: '',
    license: 'CC-BY-SA-4.0',
    version: '1.0.0',
    instructions: '',
    parameters: [],
    procedure: [],
    resources: [],
    examples: [],
    outputFormat: 'Markdown',
    requirements: '',
    restrictions: '',
    mode: 'instructions',
  }
}
export function personalSkill(
  d: SkillDefinition,
  ownerId: string,
  source: Skill['source'] = 'personal',
): Skill {
  return {
    ...validateDefinition(d),
    id: crypto.randomUUID(),
    ownerId,
    source,
    status: 'draft',
    visibility: 'private',
    reviewed: source !== 'imported',
    revision: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
}
