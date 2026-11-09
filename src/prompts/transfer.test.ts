// @vitest-environment jsdom
import 'fake-indexeddb/auto'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { db } from '../db'
import type { Category, ExportData, SavedPrompt } from '../types'
import { buildExportData, importExportData, parseExportData } from './transfer'

const prompt = (overrides: Partial<SavedPrompt> = {}): SavedPrompt => ({
  id: crypto.randomUUID(),
  title: 'Prompt',
  prompt: 'Texto',
  templateId: 'free',
  values: {},
  language: 'es',
  tags: ['fixture'],
  notes: '',
  favorite: false,
  createdAt: '2026-11-09T08:00:00.000Z',
  updatedAt: '2026-11-09T08:00:00.000Z',
  version: 1,
  syncStatus: 'synced',
  remoteId: 'remote-1',
  ownerId: 'user-a',
  ...overrides,
})

const category = { id: 'cat-1', name: 'Categoría', createdAt: '2026-11-09T08:00:00.000Z' }

afterEach(async () => {
  await Promise.all([db.prompts.clear(), db.categories.clear()])
  vi.restoreAllMocks()
})

describe('exportación e importación', () => {
  it('construye el JSON de exportación con formato y versión', () => {
    const data = buildExportData([prompt({ tags: ['a', 'b'] })], [category], '2026-11-09T09:00:00.000Z')
    expect(data).toMatchObject({ format: 'edutictac-prompts', version: 1, exportedAt: '2026-11-09T09:00:00.000Z' })
    expect(data.tags).toEqual(['a', 'b'])
  })

  it('rechaza archivos inválidos antes de escribir nada', async () => {
    expect(() => parseExportData({ format: 'otro' })).toThrow()
    expect(() => parseExportData({ format: 'edutictac-prompts', version: 1, prompts: [{}] })).toThrow()
    expect(await db.prompts.count()).toBe(0)
    expect(await db.categories.count()).toBe(0)
  })

  it('normaliza campos opcionales y asigna la cuenta actual sin copia remota', async () => {
    const data = parseExportData({
      format: 'edutictac-prompts',
      version: 1,
      categories: [category],
      prompts: [{ id: 'p1', title: 'Importado', prompt: 'Texto', unknown: true }],
    })

    expect(await importExportData(data, 'user-b')).toEqual({ categories: 1, prompts: 1 })
    const stored = await db.prompts.get('p1')
    expect(stored).toMatchObject({
      ownerId: 'user-b',
      syncStatus: 'local',
      language: 'es',
      favorite: false,
      version: 1,
    })
    expect(stored?.remoteId).toBeUndefined()
  })

  it('conserva los identificadores existentes y no sobrescribe', async () => {
    const existing = prompt({ id: 'p1' })
    await db.prompts.put(existing)
    const data = parseExportData({
      format: 'edutictac-prompts',
      version: 1,
      categories: [category],
      prompts: [
        { id: 'p1', title: 'Distinto', prompt: 'Distinto' },
        { id: 'p2', title: 'Nuevo', prompt: 'Nuevo' },
      ],
    })

    expect(await importExportData(data, 'user-a')).toEqual({ categories: 1, prompts: 1 })
    expect((await db.prompts.get('p1'))?.title).toBe('Prompt')
    expect(await db.prompts.get('p2')).toBeTruthy()
  })

  it('revierte la transacción si falla una escritura', async () => {
    const data: ExportData = {
      format: 'edutictac-prompts',
      version: 1,
      exportedAt: '2026-11-09T08:00:00.000Z',
      categories: [category, { id: 'cat-2', name: 'Otra', createdAt: '2026-11-09T08:00:00.000Z' }],
      tags: [],
      prompts: [prompt({ id: 'p1' })],
    }
    let calls = 0
    const original = db.categories.add.bind(db.categories)
    vi.spyOn(db.categories, 'add').mockImplementation(((item: Category) => {
      calls += 1
      if (calls === 2) return Promise.reject(new Error('fallo simulado'))
      return original(item)
    }) as typeof db.categories.add)

    await expect(importExportData(data, 'user-a')).rejects.toThrow('fallo simulado')
    expect(await db.categories.count()).toBe(0)
    expect(await db.prompts.count()).toBe(0)
  })
})
