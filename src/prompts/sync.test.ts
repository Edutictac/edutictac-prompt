// @vitest-environment jsdom
import 'fake-indexeddb/auto'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { db } from '../db'
import { getRemotePrompts, putRemotePrompt } from '../api'
import type { SavedPrompt } from '../types'
import { belongsTo, getPrompt, putPrompt } from './repository'
import * as repository from './repository'
import { downloadRemote, uploadPending } from './sync'

vi.mock('../api', () => ({
  getRemotePrompts: vi.fn(),
  putRemotePrompt: vi.fn(),
}))

const remoteGet = vi.mocked(getRemotePrompts)
const remotePut = vi.mocked(putRemotePrompt)

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

describe('sincronización de la biblioteca', () => {
  beforeEach(async () => {
    await db.prompts.clear()
    await db.categories.clear()
    remoteGet.mockReset()
    remotePut.mockReset()
  })

  it('sube solo los prompts del propietario actual', async () => {
    const mine = prompt({ ownerId: 'user-a' })
    const other = prompt({ ownerId: 'user-b' })
    const anonymous = prompt({})
    await db.prompts.bulkPut([mine, other, anonymous])
    remotePut.mockImplementation(async (item) => ({ ...item, remoteId: item.id, syncStatus: 'synced' }))

    expect(await uploadPending('user-a')).toBe(1)
    expect(remotePut).toHaveBeenCalledTimes(1)
    expect(remotePut.mock.calls[0][0].id).toBe(mine.id)
    expect((await getPrompt(mine.id))?.syncStatus).toBe('synced')
    expect((await getPrompt(other.id))?.syncStatus).toBe('local')
    expect((await getPrompt(anonymous.id))?.syncStatus).toBe('local')
  })

  it('mantiene pendiente el prompt si falla la red', async () => {
    const mine = prompt({ ownerId: 'user-a' })
    await db.prompts.put(mine)
    remotePut.mockRejectedValue(new Error('offline'))

    await expect(uploadPending('user-a')).rejects.toThrow('offline')
    expect((await getPrompt(mine.id))?.syncStatus).toBe('local')
  })

  it('reintenta la subida pendiente después de un fallo de red', async () => {
    const mine = prompt({ ownerId: 'user-a' })
    await db.prompts.put(mine)
    remotePut.mockRejectedValueOnce(new Error('offline'))
    await expect(uploadPending('user-a')).rejects.toThrow('offline')
    remotePut.mockImplementation(async (item) => ({ ...item, remoteId: item.id, syncStatus: 'synced' }))

    expect(await uploadPending('user-a')).toBe(1)
    expect((await getPrompt(mine.id))?.syncStatus).toBe('synced')
  })

  it('no sobrescribe una edición local hecha durante la subida', async () => {
    const mine = prompt({ ownerId: 'user-a' })
    await db.prompts.put(mine)
    let resolveUpload: (item: SavedPrompt) => void = () => {}
    remotePut.mockReturnValue(
      new Promise((resolve) => {
        resolveUpload = resolve
      }),
    )

    const upload = uploadPending('user-a')
    await vi.waitFor(() => expect(remotePut).toHaveBeenCalledTimes(1))
    await putPrompt({
      ...mine,
      prompt: 'Editado',
      updatedAt: '2026-11-09T09:00:00.000Z',
      version: 2,
      syncStatus: 'modified',
    })
    resolveUpload({ ...mine, remoteId: mine.id, syncStatus: 'synced' })
    await upload

    const stored = await getPrompt(mine.id)
    expect(stored?.prompt).toBe('Editado')
    expect(stored?.version).toBe(2)
    expect(stored?.syncStatus).toBe('modified')
  })

  it('agrupa llamadas simultáneas en una sola subida', async () => {
    const mine = prompt({ ownerId: 'user-a' })
    await db.prompts.put(mine)
    let resolveUpload: (item: SavedPrompt) => void = () => {}
    remotePut.mockReturnValue(
      new Promise((resolve) => {
        resolveUpload = resolve
      }),
    )

    const first = uploadPending('user-a')
    const second = uploadPending('user-a')
    await vi.waitFor(() => expect(remotePut).toHaveBeenCalledTimes(1))
    resolveUpload({ ...mine, remoteId: mine.id, syncStatus: 'synced' })
    await Promise.all([first, second])
    expect(remotePut).toHaveBeenCalledTimes(1)
  })

  it('conserva un prompt local pendiente aunque el remoto sea más reciente', async () => {
    const local = prompt({ id: 'pending', ownerId: 'user-a', prompt: 'Mi trabajo' })
    await db.prompts.put(local)
    remoteGet.mockResolvedValue({
      prompts: [{ ...local, prompt: 'Remoto', syncStatus: 'synced', updatedAt: '2026-11-10T08:00:00.000Z' }],
    })

    expect(await downloadRemote('user-a')).toBe(0)
    expect(await getPrompt(local.id)).toEqual(local)
  })

  it('conserva una edición realizada mientras prepara la categoría de una descarga', async () => {
    const local = prompt({ id: 'race', ownerId: 'user-a', syncStatus: 'synced' })
    await db.prompts.put(local)
    remoteGet.mockResolvedValue({
      prompts: [{ ...local, prompt: 'Remoto', categoryId: 'category', categoryName: 'Ciencias' }],
    })
    const originalGet = repository.getCategory
    let release: () => void = () => {}
    const gate = new Promise<void>((resolve) => {
      release = resolve
    })
    const categoryGet = vi.spyOn(repository, 'getCategory').mockImplementation(async (...args) => {
      await gate
      return originalGet(...args)
    })
    try {
      const download = downloadRemote('user-a')
      await vi.waitFor(() => expect(categoryGet).toHaveBeenCalled())
      await putPrompt({ ...local, prompt: 'Editado', syncStatus: 'modified', version: 2 })
      release()
      expect(await download).toBe(0)
      expect((await getPrompt(local.id))?.prompt).toBe('Editado')
    } finally {
      release()
      categoryGet.mockRestore()
    }
  })

  it('descarga los prompts remotos sin pisar ediciones locales', async () => {
    const synced = prompt({
      id: 'synced',
      ownerId: 'user-a',
      syncStatus: 'synced',
      updatedAt: '2026-11-09T08:00:00.000Z',
    })
    const modified = prompt({
      id: 'modified',
      ownerId: 'user-a',
      syncStatus: 'modified',
      updatedAt: '2026-11-09T08:00:00.000Z',
    })
    const foreign = prompt({ id: 'foreign', ownerId: 'user-b', syncStatus: 'synced' })
    await db.prompts.bulkPut([synced, modified, foreign])
    remoteGet.mockResolvedValue({
      prompts: [
        { ...synced, prompt: 'Remoto nuevo', updatedAt: '2026-11-09T10:00:00.000Z' },
        { ...modified, prompt: 'Remoto viejo', updatedAt: '2026-11-09T10:00:00.000Z' },
        { ...foreign, prompt: 'De otra cuenta', ownerId: 'user-b', updatedAt: '2026-11-09T10:00:00.000Z' },
        prompt({
          id: 'new',
          ownerId: 'user-a',
          prompt: 'Nuevo remoto',
          updatedAt: '2026-11-09T10:00:00.000Z',
          syncStatus: 'synced',
        }),
      ],
    })

    expect(await downloadRemote('user-a')).toBe(2)
    expect((await getPrompt('synced'))?.prompt).toBe('Remoto nuevo')
    expect((await getPrompt('modified'))?.prompt).toBe('Texto')
    expect((await getPrompt('foreign'))?.prompt).toBe('Texto')
    expect((await getPrompt('new'))?.ownerId).toBe('user-a')
    expect(belongsTo((await getPrompt('new'))!, 'user-a')).toBe(true)
  })
})

it('restaura el nombre de categoría en otro dispositivo y conserva las categorías existentes', async () => {
  await db.categories.put({ id: 'local-collision', name: 'Otra', createdAt: '2026-01-01' })
  remoteGet.mockResolvedValue({
    prompts: [
      prompt({
        id: 'p-categoria',
        ownerId: 'user-a',
        remoteId: 'p-categoria',
        syncStatus: 'synced',
        categoryId: 'local-collision',
        categoryName: 'Ciencias',
      }),
    ],
  })
  await downloadRemote('user-a')
  const stored = await db.prompts.get('p-categoria')
  expect(stored?.categoryId).not.toBe('local-collision')
  expect((await db.categories.get(stored!.categoryId!))?.name).toBe('Ciencias')
  expect((await db.categories.get('local-collision'))?.name).toBe('Otra')
})

it('añade el nombre de categoría al sincronizar prompts anteriores que solo tienen el identificador', async () => {
  await db.categories.put({ id: 'c1', name: 'Ciencias', createdAt: '2026-01-01' })
  const item = prompt({ ownerId: 'user-a', categoryId: 'c1' })
  await db.prompts.put(item)
  remotePut.mockImplementation(async (sent) => ({ ...sent, remoteId: sent.id, syncStatus: 'synced' }))
  await uploadPending('user-a')
  expect(remotePut).toHaveBeenCalledWith(expect.objectContaining({ categoryName: 'Ciencias' }))
})
