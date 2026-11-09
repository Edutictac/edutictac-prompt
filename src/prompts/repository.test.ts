// @vitest-environment jsdom
import 'fake-indexeddb/auto'
import { afterEach, describe, expect, it } from 'vitest'
import { db } from '../db'
import {
  addCategory,
  belongsTo,
  deletePrompt,
  ensureDefaultCategories,
  findCategoryByName,
  listPrompts,
  pendingPrompts,
  promptOwner,
} from './repository'
import type { SavedPrompt } from '../types'

const prompt = (overrides: Partial<SavedPrompt> = {}): SavedPrompt => ({
  id: crypto.randomUUID(),
  title: 'Prompt',
  prompt: 'Texto',
  templateId: 'free',
  values: {},
  language: 'es',
  tags: [],
  notes: '',
  favorite: false,
  createdAt: '2026-11-09T08:00:00.000Z',
  updatedAt: '2026-11-09T08:00:00.000Z',
  version: 1,
  syncStatus: 'local',
  ...overrides,
})

afterEach(async () => {
  await Promise.all([db.prompts.clear(), db.categories.clear()])
})

describe('repositorio local de prompts', () => {
  it('separa los prompts por propietario y trata los antiguos como anónimos', async () => {
    const mine = prompt({ ownerId: 'user-a' })
    const other = prompt({ ownerId: 'user-b' })
    const legacy = prompt({})
    await db.prompts.bulkPut([mine, other, legacy])

    expect((await listPrompts('user-a')).map((item) => item.id)).toEqual([mine.id])
    expect((await listPrompts(promptOwner())).map((item) => item.id)).toEqual([legacy.id])
    expect(belongsTo(legacy, promptOwner())).toBe(true)
  })

  it('solo considera pendientes los locales, modificados o sin copia remota', async () => {
    const local = prompt({ ownerId: 'user-a', syncStatus: 'local' })
    const modified = prompt({ ownerId: 'user-a', syncStatus: 'modified', remoteId: 'r1' })
    const synced = prompt({ ownerId: 'user-a', syncStatus: 'synced', remoteId: 'r2' })
    const withoutRemote = prompt({ ownerId: 'user-a', syncStatus: 'synced' })
    await db.prompts.bulkPut([local, modified, synced, withoutRemote])

    expect((await pendingPrompts('user-a')).map((item) => item.id).sort()).toEqual(
      [local.id, modified.id, withoutRemote.id].sort(),
    )
  })

  it('no permite borrar desde otra cuenta', async () => {
    const mine = prompt({ ownerId: 'user-a' })
    await db.prompts.put(mine)

    expect(await deletePrompt(mine.id, 'user-b')).toBe(false)
    expect(await db.prompts.get(mine.id)).toBeTruthy()
    expect(await deletePrompt(mine.id, 'user-a')).toBe(true)
    expect(await db.prompts.get(mine.id)).toBeUndefined()
  })

  it('crea las categorías iniciales solo cuando la base está vacía', async () => {
    expect((await ensureDefaultCategories(['A', 'B'])).map((item) => item.name).sort()).toEqual(['A', 'B'])
    expect((await ensureDefaultCategories(['C'])).map((item) => item.name).sort()).toEqual(['A', 'B'])
    const added = await addCategory('C')
    expect((await findCategoryByName('c'))?.id).toBe(added.id)
  })
})
