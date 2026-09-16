import Dexie, { type Table } from 'dexie'
import type { Category, SavedPrompt } from './types'
export class PromptDatabase extends Dexie { prompts!: Table<SavedPrompt,string>; categories!: Table<Category,string>; constructor(){ super('edutictac-prompt'); this.version(1).stores({prompts:'id,title,categoryId,templateId,language,updatedAt',categories:'id,name'}) } }
export const db = new PromptDatabase()
export const uid = () => crypto.randomUUID()
