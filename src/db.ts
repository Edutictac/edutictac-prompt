import Dexie, { type Table } from 'dexie'
import type { Category, SavedPrompt } from './types'
import type { Skill, SkillRevision } from './skills/types'
export class PromptDatabase extends Dexie { prompts!: Table<SavedPrompt,string>; categories!: Table<Category,string>; skills!: Table<Skill,string>; skillRevisions!: Table<SkillRevision,string>; constructor(){ super('edutictac-prompt'); this.version(1).stores({prompts:'id,title,categoryId,templateId,language,updatedAt',categories:'id,name'}); this.version(2).stores({prompts:'id,title,categoryId,templateId,language,updatedAt',categories:'id,name',skills:'id,ownerId,slug,updatedAt',skillRevisions:'key,skillId,ownerId'}) } }
export const db = new PromptDatabase()
export const uid = () => crypto.randomUUID()
