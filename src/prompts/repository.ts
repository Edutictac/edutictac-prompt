import { db, uid } from '../db'
import type { Category, SavedPrompt } from '../types'

// Propietario de la biblioteca. El servidor de prompts identifica al usuario con
// el `sub` de Authentik, sin prefijo; los prompts anónimos se quedan en el
// dispositivo y nunca se suben.
export const LOCAL_OWNER = 'local:device'
export const promptOwner = (sub?: string) => (sub ? sub : LOCAL_OWNER)
export const belongsTo = (prompt: SavedPrompt, ownerId: string) => (prompt.ownerId || LOCAL_OWNER) === ownerId

export async function listCategories(): Promise<Category[]> {
  return db.categories.toArray()
}

// Mantiene el comportamiento anterior: solo se crean las categorías iniciales si
// la base está vacía, para no reintroducirlas después de que el usuario las borre.
export async function ensureDefaultCategories(names: string[]): Promise<Category[]> {
  const existing = await db.categories.toArray()
  if (existing.length) return existing
  const created = names.map((name) => ({ id: uid(), name, createdAt: new Date().toISOString() }))
  await db.categories.bulkAdd(created)
  return created
}

export async function addCategory(name: string): Promise<Category> {
  const category: Category = { id: uid(), name, createdAt: new Date().toISOString() }
  await db.categories.add(category)
  return category
}

export async function findCategoryByName(name: string): Promise<Category | undefined> {
  const normalized = name.toLocaleLowerCase()
  return (await db.categories.toArray()).find((item) => item.name.toLocaleLowerCase() === normalized)
}

export async function listPrompts(ownerId: string): Promise<SavedPrompt[]> {
  return (await db.prompts.toArray()).filter((prompt) => belongsTo(prompt, ownerId))
}

export async function pendingPrompts(ownerId: string): Promise<SavedPrompt[]> {
  return (await listPrompts(ownerId)).filter(
    (prompt) => prompt.syncStatus === 'local' || prompt.syncStatus === 'modified' || !prompt.remoteId,
  )
}

export async function getPrompt(id: string): Promise<SavedPrompt | undefined> {
  return db.prompts.get(id)
}

export async function addPrompt(prompt: SavedPrompt): Promise<SavedPrompt> {
  await db.prompts.add(prompt)
  return prompt
}

export async function putPrompt(prompt: SavedPrompt): Promise<SavedPrompt> {
  await db.prompts.put(prompt)
  return prompt
}

export async function deletePrompt(id: string, ownerId: string): Promise<boolean> {
  const prompt = await db.prompts.get(id)
  if (!prompt || !belongsTo(prompt, ownerId)) return false
  await db.prompts.delete(id)
  return true
}
