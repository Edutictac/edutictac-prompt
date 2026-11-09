import { getRemotePrompts, putRemotePrompt } from '../api'
import { belongsTo, getPrompt, pendingPrompts, putPrompt } from './repository'

// Una única subida por propietario. Las llamadas simultáneas se agrupan y, si
// llega otra mientras hay una en curso, se repite una pasada al terminar.
const inFlight = new Map<string, Promise<number>>()
const rerun = new Set<string>()

export async function downloadRemote(ownerId: string): Promise<number> {
  const remote = (await getRemotePrompts()).prompts
  let changed = 0
  for (const item of remote) {
    if (!item || typeof item.id !== 'string') continue
    const local = await getPrompt(item.id)
    // Nunca se pisa un prompt local de otra cuenta aunque coincida el id.
    if (local && !belongsTo(local, ownerId)) continue
    if (
      !local ||
      local.syncStatus === 'synced' ||
      (local.syncStatus !== 'modified' && item.updatedAt >= local.updatedAt)
    ) {
      await putPrompt({ ...item, ownerId, syncStatus: 'synced' })
      changed += 1
    }
  }
  return changed
}

export function uploadPending(ownerId: string): Promise<number> {
  const running = inFlight.get(ownerId)
  if (running) {
    rerun.add(ownerId)
    return running
  }
  const task = runUpload(ownerId).finally(() => {
    inFlight.delete(ownerId)
    rerun.delete(ownerId)
  })
  inFlight.set(ownerId, task)
  return task
}

async function runUpload(ownerId: string): Promise<number> {
  let uploaded = 0
  let again = true
  while (again) {
    again = false
    for (const item of await pendingPrompts(ownerId)) {
      const snapshot = item
      const synced = await putRemotePrompt(snapshot)
      const current = await getPrompt(snapshot.id)
      // Si el prompt cambió o se borró mientras se subía, la respuesta ya no vale:
      // se conserva la edición local y se reintenta en la siguiente pasada.
      if (
        current &&
        belongsTo(current, ownerId) &&
        current.updatedAt === snapshot.updatedAt &&
        current.version === snapshot.version
      ) {
        await putPrompt({ ...synced, ownerId, syncStatus: 'synced' })
        uploaded += 1
      }
      if (rerun.has(ownerId)) {
        rerun.delete(ownerId)
        again = true
      }
    }
    if (rerun.has(ownerId)) {
      rerun.delete(ownerId)
      again = true
    }
  }
  return uploaded
}
