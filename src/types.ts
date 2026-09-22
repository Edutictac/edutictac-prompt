export type Language = 'es' | 'ca-valencia' | 'ca' | 'en'
export type FieldType = 'text' | 'textarea' | 'select' | 'multiselect'
export interface TemplateField { id: string; type: FieldType; options?: string[] }
export interface PromptTemplate { id: string; category: string; icon: string; fields: TemplateField[] }
export interface SavedPrompt { id: string; title: string; prompt: string; templateId?: string; values?: Record<string,string>; language: Language; categoryId?: string; tags: string[]; notes?: string; favorite: boolean; createdAt: string; updatedAt: string; version: number; ownerId?: string; remoteId?: string; syncStatus?: 'local'|'synced'|'modified'|'conflict'; lastSyncedAt?: string }
export interface Category { id: string; name: string; createdAt: string }
export interface ExportData { format: 'edutictac-prompts'; version: 1; exportedAt: string; categories: Category[]; tags: string[]; prompts: SavedPrompt[] }
