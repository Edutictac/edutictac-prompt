import { db } from '../db'
import type { Category, ExportData, Language, SavedPrompt } from '../types'

const languages: Language[] = ['es', 'ca-valencia', 'ca', 'en']
const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

export function buildExportData(
  prompts: SavedPrompt[],
  categories: Category[],
  exportedAt = new Date().toISOString(),
): ExportData {
  return {
    format: 'edutictac-prompts',
    version: 1,
    exportedAt,
    categories,
    tags: [...new Set(prompts.flatMap((prompt) => prompt.tags))],
    prompts,
  }
}

// Valida el archivo completo antes de escribir nada. Así una importación
// inválida no deja categorías ni prompts a medias.
export function parseExportData(value: unknown): ExportData {
  if (!isRecord(value)) throw new Error('invalid')
  if (value.format !== 'edutictac-prompts' || value.version !== 1) throw new Error('invalid')
  if (!Array.isArray(value.prompts)) throw new Error('invalid')
  const categories = Array.isArray(value.categories) ? value.categories : []
  const parsedCategories: Category[] = categories.map((raw) => {
    if (!isRecord(raw) || typeof raw.id !== 'string' || !raw.id || typeof raw.name !== 'string' || !raw.name)
      throw new Error('invalid')
    return {
      id: raw.id,
      name: raw.name,
      createdAt: typeof raw.createdAt === 'string' ? raw.createdAt : new Date().toISOString(),
    }
  })
  const now = new Date().toISOString()
  const parsedPrompts: SavedPrompt[] = value.prompts.map((raw) => {
    if (!isRecord(raw) || typeof raw.id !== 'string' || !raw.id) throw new Error('invalid')
    if (typeof raw.title !== 'string' || typeof raw.prompt !== 'string') throw new Error('invalid')
    return {
      ...(raw as unknown as SavedPrompt),
      id: raw.id,
      title: raw.title,
      prompt: raw.prompt,
      language: languages.includes(raw.language as Language) ? (raw.language as Language) : 'es',
      tags: Array.isArray(raw.tags) ? raw.tags.filter((tag): tag is string => typeof tag === 'string') : [],
      favorite: raw.favorite === true,
      version: typeof raw.version === 'number' ? raw.version : 1,
      createdAt: typeof raw.createdAt === 'string' ? raw.createdAt : now,
      updatedAt: typeof raw.updatedAt === 'string' ? raw.updatedAt : now,
    }
  })
  return {
    format: 'edutictac-prompts',
    version: 1,
    exportedAt: typeof value.exportedAt === 'string' ? value.exportedAt : now,
    categories: parsedCategories,
    tags: Array.isArray(value.tags) ? value.tags.filter((tag): tag is string => typeof tag === 'string') : [],
    prompts: parsedPrompts,
  }
}

export interface ImportSummary {
  categories: number
  prompts: number
}

// La importación es una acción explícita: los prompts pasan a pertenecer a la
// cuenta o biblioteca actual y se desvinculan de cualquier copia remota anterior.
// Los identificadores ya existentes se conservan sin sobrescribir.
export async function importExportData(data: ExportData, ownerId: string): Promise<ImportSummary> {
  const summary: ImportSummary = { categories: 0, prompts: 0 }
  await db.transaction('rw', [db.categories, db.prompts], async () => {
    for (const category of data.categories) {
      if (await db.categories.get(category.id)) continue
      await db.categories.add(category)
      summary.categories += 1
    }
    for (const prompt of data.prompts) {
      if (await db.prompts.get(prompt.id)) continue
      await db.prompts.add({ ...prompt, ownerId, remoteId: undefined, syncStatus: 'local' })
      summary.prompts += 1
    }
  })
  return summary
}
