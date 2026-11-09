// @vitest-environment jsdom
import 'fake-indexeddb/auto'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { act, renderHook, waitFor } from '@testing-library/react'
import { deleteRemotePrompt, getRemotePrompts, putRemotePrompt, type AuthUser } from '../api'
import { db } from '../db'
import type { SavedPrompt } from '../types'
import { usePromptLibrary } from './usePromptLibrary'

vi.mock('../api', () => ({
  getRemotePrompts: vi.fn(),
  putRemotePrompt: vi.fn(),
  deleteRemotePrompt: vi.fn(),
}))

const remoteGet = vi.mocked(getRemotePrompts)
const remotePut = vi.mocked(putRemotePrompt)
const remoteDelete = vi.mocked(deleteRemotePrompt)
const user: AuthUser = { sub: 'user-a', name: 'Docente' }

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
  ownerId: user.sub,
  ...overrides,
})

beforeEach(() => {
  remoteGet.mockResolvedValue({ prompts: [] })
  remotePut.mockImplementation(async (item) => ({ ...item, remoteId: item.id, syncStatus: 'synced' }))
  remoteDelete.mockResolvedValue(undefined)
})

afterEach(async () => {
  await Promise.all([db.prompts.clear(), db.categories.clear()])
  vi.clearAllMocks()
})

describe('estado de la biblioteca', () => {
  it('crea el prompt con el propietario de la sesión y lo sube', async () => {
    const onEvent = vi.fn()
    const { result } = renderHook(() => usePromptLibrary({ user, defaultCategories: ['A'], onEvent }))
    await waitFor(() => expect(result.current.categories).toHaveLength(1))

    let created: SavedPrompt | undefined
    await act(async () => {
      created = await result.current.create({
        title: 'Nuevo',
        prompt: 'Texto',
        templateId: 'free',
        language: 'es',
        tags: [],
        notes: '',
        favorite: false,
      })
    })

    expect(created?.ownerId).toBe('user-a')
    expect(onEvent).toHaveBeenCalledWith('saved')
    await waitFor(async () => expect((await db.prompts.get(created!.id))?.syncStatus).toBe('synced'))
  })

  it('conserva el prompt si falla el borrado remoto', async () => {
    const item = prompt({ remoteId: 'remote-1', syncStatus: 'synced' })
    await db.prompts.put(item)
    const onEvent = vi.fn()
    const { result } = renderHook(() => usePromptLibrary({ user, defaultCategories: ['A'], onEvent }))
    await waitFor(() => expect(result.current.saved).toHaveLength(1))
    remoteDelete.mockRejectedValue(new Error('offline'))

    let removed = true
    await act(async () => {
      removed = await result.current.remove(item)
    })

    expect(removed).toBe(false)
    expect(await db.prompts.get(item.id)).toBeTruthy()
    expect(onEvent).toHaveBeenCalledWith('deleteFailed')
  })

  it('cambia de biblioteca al cambiar de cuenta y al cerrar sesión', async () => {
    const fromA = prompt({ ownerId: 'user-a' })
    const fromB = prompt({ ownerId: 'user-b' })
    const anonymous = prompt({ ownerId: undefined })
    await db.prompts.bulkPut([fromA, fromB, anonymous])
    const { result, rerender } = renderHook(
      ({ current }: { current: AuthUser | null }) => usePromptLibrary({ user: current, defaultCategories: ['A'] }),
      { initialProps: { current: user as AuthUser | null } },
    )
    await waitFor(() => expect(result.current.saved.map((item) => item.id)).toEqual([fromA.id]))

    rerender({ current: { sub: 'user-b', name: 'Otra' } })
    await waitFor(() => expect(result.current.saved.map((item) => item.id)).toEqual([fromB.id]))

    rerender({ current: null })
    await waitFor(() => expect(result.current.saved.map((item) => item.id)).toEqual([anonymous.id]))
  })

  it('no muestra ni sube los prompts anónimos al haber sesión', async () => {
    const anonymous = prompt({ ownerId: undefined, syncStatus: 'local' })
    const mine = prompt({ ownerId: 'user-a', syncStatus: 'local' })
    await db.prompts.bulkPut([anonymous, mine])
    const { result } = renderHook(() => usePromptLibrary({ user, defaultCategories: ['A'] }))
    await waitFor(() => expect(result.current.saved).toHaveLength(1))

    await act(async () => {
      await result.current.syncLocal()
    })

    expect(result.current.saved.map((item) => item.id)).toEqual([mine.id])
    expect(remotePut.mock.calls.every(([item]) => item.id !== anonymous.id)).toBe(true)
    expect(remotePut).toHaveBeenCalled()
  })
})
