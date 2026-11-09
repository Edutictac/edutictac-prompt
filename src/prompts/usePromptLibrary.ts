import { useCallback, useEffect, useRef, useState } from 'react'
import { uid } from '../db'
import type { AuthUser } from '../api'
import { deleteRemotePrompt } from '../api'
import type { Category, Language, SavedPrompt } from '../types'
import {
  addCategory,
  addPrompt,
  deletePrompt,
  findCategoryByName,
  ensureDefaultCategories,
  listCategories,
  listPrompts,
  promptOwner,
  putPrompt,
} from './repository'
import { downloadRemote, uploadPending } from './sync'
import { buildExportData, importExportData, parseExportData, type ImportSummary } from './transfer'

export type PromptLibraryEvent =
  'saved' | 'updated' | 'deleteFailed' | 'syncDownloaded' | 'syncUploaded' | 'syncFailed' | 'importOk' | 'invalidFile'

export interface PromptDraft {
  title: string
  prompt: string
  templateId?: string
  values?: Record<string, string>
  language: Language
  categoryId?: string
  categoryName?: string
  tags: string[]
  notes: string
  favorite: boolean
}

export interface PromptLibrary {
  saved: SavedPrompt[]
  categories: Category[]
  syncBusy: boolean
  create: (draft: PromptDraft) => Promise<SavedPrompt>
  update: (
    item: SavedPrompt,
    patch: Pick<SavedPrompt, 'prompt' | 'templateId' | 'values' | 'language'>,
  ) => Promise<SavedPrompt>
  remove: (item: SavedPrompt) => Promise<boolean>
  duplicate: (item: SavedPrompt, suffix: string) => Promise<SavedPrompt>
  exportData: () => ReturnType<typeof buildExportData>
  importFile: (file: File) => Promise<ImportSummary | undefined>
  syncLocal: () => Promise<void>
  refresh: () => Promise<void>
}

const readText = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result))
    reader.onerror = () => reject(reader.error)
    reader.readAsText(file)
  })

export function usePromptLibrary({
  user,
  defaultCategories,
  onEvent,
}: {
  user: AuthUser | null
  defaultCategories: string[]
  onEvent?: (event: PromptLibraryEvent) => void
}): PromptLibrary {
  const ownerId = promptOwner(user?.sub)
  const ownerRef = useRef(ownerId)
  const userRef = useRef(user)
  const emitRef = useRef(onEvent)
  ownerRef.current = ownerId
  userRef.current = user
  emitRef.current = onEvent
  const defaultsKey = defaultCategories.join('\u0000')
  const [saved, setSaved] = useState<SavedPrompt[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [syncBusy, setSyncBusy] = useState(false)
  const emit = useCallback((event: PromptLibraryEvent) => emitRef.current?.(event), [])

  const refresh = useCallback(async () => {
    setSaved(await listPrompts(ownerRef.current))
    setCategories(await listCategories())
  }, [])

  useEffect(() => {
    let active = true
    void (async () => {
      await ensureDefaultCategories(defaultCategories)
      if (active) await refresh()
    })()
    return () => {
      active = false
    }
  }, [ownerId, defaultsKey, refresh])

  // Subida en segundo plano tras guardar o duplicar. Si falla, el prompt queda
  // pendiente y se reintenta al reconectar o con el botón de sincronizar.
  const triggerUpload = useCallback(() => {
    if (!userRef.current) return
    const owner = ownerRef.current
    void uploadPending(owner)
      .then(() => {
        if (ownerRef.current === owner) void refresh()
      })
      .catch(() => {})
  }, [refresh])

  useEffect(() => {
    if (!user) return
    let active = true
    const run = async () => {
      setSyncBusy(true)
      let downloaded = false
      try {
        await downloadRemote(ownerId)
        downloaded = true
      } catch {
        if (active) emit('syncFailed')
      }
      try {
        await uploadPending(ownerId)
      } catch {
        /* Sin red: se reintenta al reconectar o al guardar de nuevo. */
      }
      if (active) {
        setSyncBusy(false)
        if (downloaded) emit('syncDownloaded')
      }
      await refresh()
    }
    void run()
    const retry = () => {
      void uploadPending(ownerId)
        .then(refresh)
        .catch(() => {})
    }
    window.addEventListener('online', retry)
    return () => {
      active = false
      window.removeEventListener('online', retry)
    }
  }, [ownerId, user, refresh, emit])

  const create = useCallback(
    async (draft: PromptDraft) => {
      let categoryId = draft.categoryId
      const categoryName = draft.categoryName?.trim()
      if (categoryName) {
        const existing = await findCategoryByName(categoryName)
        categoryId = existing?.id ?? (await addCategory(categoryName)).id
      }
      const now = new Date().toISOString()
      const item: SavedPrompt = {
        id: uid(),
        title: draft.title,
        prompt: draft.prompt,
        templateId: draft.templateId,
        values: draft.values,
        language: draft.language,
        categoryId,
        tags: draft.tags,
        notes: draft.notes,
        favorite: draft.favorite,
        createdAt: now,
        updatedAt: now,
        version: 1,
        syncStatus: 'local',
        ownerId: ownerRef.current,
      }
      await addPrompt(item)
      setSaved((current) => [item, ...current])
      setCategories(await listCategories())
      emit('saved')
      triggerUpload()
      return item
    },
    [emit, triggerUpload],
  )

  const update = useCallback(
    async (item: SavedPrompt, patch: Pick<SavedPrompt, 'prompt' | 'templateId' | 'values' | 'language'>) => {
      const next: SavedPrompt = {
        ...item,
        ...patch,
        updatedAt: new Date().toISOString(),
        version: item.version + 1,
        syncStatus: item.remoteId ? 'modified' : 'local',
      }
      await putPrompt(next)
      setSaved((current) => current.map((prompt) => (prompt.id === next.id ? next : prompt)))
      emit('updated')
      triggerUpload()
      return next
    },
    [emit, triggerUpload],
  )

  const remove = useCallback(
    async (item: SavedPrompt) => {
      // Si falla el borrado remoto no se borra en local: así una descarga
      // posterior no puede resucitar el prompt. No hay tombstones en esta fase.
      if (userRef.current && item.remoteId) {
        try {
          await deleteRemotePrompt(item.remoteId)
        } catch {
          emit('deleteFailed')
          return false
        }
      }
      const removed = await deletePrompt(item.id, ownerRef.current)
      if (removed) setSaved((current) => current.filter((prompt) => prompt.id !== item.id))
      return removed
    },
    [emit],
  )

  const duplicate = useCallback(
    async (item: SavedPrompt, suffix: string) => {
      const now = new Date().toISOString()
      const copy: SavedPrompt = {
        ...item,
        id: uid(),
        remoteId: undefined,
        ownerId: ownerRef.current,
        syncStatus: 'local',
        title: `${item.title}${suffix}`,
        createdAt: now,
        updatedAt: now,
        version: 1,
      }
      await addPrompt(copy)
      setSaved((current) => [copy, ...current])
      triggerUpload()
      return copy
    },
    [triggerUpload],
  )

  const exportData = useCallback(() => buildExportData(saved, categories), [saved, categories])

  const importFile = useCallback(
    async (file: File) => {
      try {
        const data = parseExportData(JSON.parse(await readText(file)))
        const summary = await importExportData(data, ownerRef.current)
        await refresh()
        emit('importOk')
        triggerUpload()
        return summary
      } catch {
        emit('invalidFile')
        return undefined
      }
    },
    [emit, refresh, triggerUpload],
  )

  const syncLocal = useCallback(async () => {
    if (!userRef.current) return
    setSyncBusy(true)
    try {
      await uploadPending(ownerRef.current)
      emit('syncUploaded')
    } catch {
      emit('syncFailed')
    } finally {
      setSyncBusy(false)
      await refresh()
    }
  }, [emit, refresh])

  return { saved, categories, syncBusy, create, update, remove, duplicate, exportData, importFile, syncLocal, refresh }
}
