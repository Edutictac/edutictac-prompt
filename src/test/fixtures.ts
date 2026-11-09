import type { Category, SavedPrompt } from '../types'
import type { AgentRevision, SavedAgent } from '../agents/types'
import type { Skill, SkillRevision } from '../skills/types'
import { buildAgentConfiguration, defaultAgentDraft } from '../skills/agents'
import { builtinSkills } from '../skills/seeds'
import type { PromptDatabase } from '../db'

// Datos ficticios para las pruebas de comportamiento. Se cargan siempre en la
// base IndexedDB simulada de cada archivo de test (fake-indexeddb), nunca en la
// base real del navegador. El propietario se mantiene explícito para poder
// probar la separación entre cuentas en las fases de sincronización.
export const FIXTURE_OWNER = 'fixture:owner'
export const FIXTURE_OTHER_OWNER = 'fixture:other'
export const FIXTURE_DATE = '2026-11-09T08:00:00.000Z'

export function makeCategory(overrides: Partial<Category> = {}): Category {
  return { id: crypto.randomUUID(), name: 'Categoría de prueba', createdAt: FIXTURE_DATE, ...overrides }
}

export function makePrompt(overrides: Partial<SavedPrompt> = {}): SavedPrompt {
  return {
    id: crypto.randomUUID(),
    title: 'Prompt de prueba',
    prompt: '## Rol\nDocente de prueba.\n\n## Objetivo y tarea\nTarea de prueba.',
    templateId: 'learning-situation',
    values: { level: 'Primaria', topic: 'Los ecosistemas', outputFormat: 'Markdown' },
    language: 'es',
    tags: ['fixture'],
    notes: '',
    favorite: false,
    version: 1,
    createdAt: FIXTURE_DATE,
    updatedAt: FIXTURE_DATE,
    syncStatus: 'local',
    ownerId: FIXTURE_OWNER,
    ...overrides,
  }
}

export function makeAgent(overrides: Partial<SavedAgent> = {}): SavedAgent {
  const draft = { ...defaultAgentDraft('es'), name: 'Agente de prueba', purpose: 'Preparar una actividad de prueba.' }
  return {
    id: crypto.randomUUID(),
    ownerId: FIXTURE_OWNER,
    draft,
    configuration: buildAgentConfiguration(draft),
    revision: 1,
    createdAt: FIXTURE_DATE,
    updatedAt: FIXTURE_DATE,
    ...overrides,
  }
}

export function makeSkill(overrides: Partial<Skill> = {}): Skill {
  const base = builtinSkills('es')[0]
  return {
    ...base,
    id: crypto.randomUUID(),
    ownerId: FIXTURE_OWNER,
    source: 'personal',
    status: 'ready',
    visibility: 'private',
    reviewed: true,
    revision: 1,
    createdAt: FIXTURE_DATE,
    updatedAt: FIXTURE_DATE,
    ...overrides,
  }
}

export interface FixtureSet {
  category: Category
  prompt: SavedPrompt
  oldPrompt: SavedPrompt
  agent: SavedAgent
  skill: Skill
}

export async function seedFixtures(db: PromptDatabase): Promise<FixtureSet> {
  const category = makeCategory()
  const prompt = makePrompt({ categoryId: category.id })
  // Prompt anterior al formulario actual: sin `values`, para comprobar que se
  // sigue abriendo y editando con los valores iniciales de la plantilla.
  const oldPrompt = makePrompt({
    title: 'Prompt antiguo',
    values: undefined,
    templateId: 'free',
    syncStatus: 'synced',
    remoteId: 'remote-old',
  })
  const agent = makeAgent()
  const skill = makeSkill()
  const agentRevision: AgentRevision = {
    key: `${agent.id}:${agent.revision}`,
    agentId: agent.id,
    ownerId: agent.ownerId,
    revision: agent.revision,
    snapshot: agent,
  }
  const skillRevision: SkillRevision = {
    key: `${skill.id}:${skill.revision}`,
    skillId: skill.id,
    ownerId: skill.ownerId,
    revision: skill.revision,
    snapshot: skill,
  }
  await db.transaction(
    'rw',
    [db.prompts, db.categories, db.agents, db.agentRevisions, db.skills, db.skillRevisions],
    async () => {
      await db.categories.put(category)
      await db.prompts.bulkPut([prompt, oldPrompt])
      await db.agents.put(agent)
      await db.agentRevisions.put(agentRevision)
      await db.skills.put(skill)
      await db.skillRevisions.put(skillRevision)
    },
  )
  return { category, prompt, oldPrompt, agent, skill }
}
