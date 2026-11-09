// @vitest-environment jsdom
import 'fake-indexeddb/auto'
import Dexie from 'dexie'
import { afterEach, describe, expect, it } from 'vitest'
import { db } from '../db'
import { builtinSkills } from '../skills/seeds'
import { makeAgent } from './fixtures'

afterEach(async () => {
  db.close()
  await db.delete()
  await db.open()
})

describe('conservación de datos entre versiones', () => {
  it('mantiene prompts, categorías, Skills e historiales al migrar de v2 a v3', async () => {
    db.close()
    await db.delete()
    const old = new Dexie('edutictac-prompt')
    old.version(2).stores({
      prompts: 'id,title,categoryId,templateId,language,updatedAt',
      categories: 'id,name',
      skills: 'id,ownerId,slug,updatedAt',
      skillRevisions: 'key,skillId,ownerId',
    })
    const skill = {
      ...builtinSkills('es')[0],
      id: 'skill-1',
      ownerId: 'oidc:one',
      source: 'personal' as const,
      revision: 1,
      createdAt: '2026-11-09T08:00:00.000Z',
      updatedAt: '2026-11-09T08:00:00.000Z',
    }
    await old.table('categories').put({ id: 'cat-1', name: 'Categoría', createdAt: '2026-11-09T08:00:00.000Z' })
    await old.table('prompts').put({
      id: 'prompt-1',
      title: 'Prompt antiguo',
      prompt: 'Texto original',
      categoryId: 'cat-1',
      version: 1,
    })
    await old.table('skills').put(skill)
    await old.table('skillRevisions').put({
      key: 'skill-1:1',
      skillId: 'skill-1',
      ownerId: 'oidc:one',
      revision: 1,
      snapshot: skill,
    })
    old.close()

    await db.open()
    expect(db.verno).toBe(3)
    expect((await db.prompts.get('prompt-1'))?.prompt).toBe('Texto original')
    expect((await db.categories.get('cat-1'))?.name).toBe('Categoría')
    expect((await db.skills.get('skill-1'))?.name).toBe('Crear rúbricas')
    expect(await db.skillRevisions.count()).toBe(1)
    expect(await db.agents.count()).toBe(0)
  })

  it('conserva agentes e historiales al reabrir con el esquema actual', async () => {
    const agent = makeAgent({ ownerId: 'oidc:one' })
    await db.agents.put(agent)
    await db.agentRevisions.put({
      key: `${agent.id}:1`,
      agentId: agent.id,
      ownerId: agent.ownerId,
      revision: 1,
      snapshot: agent,
    })

    db.close()
    await db.open()
    expect((await db.agents.get(agent.id))?.draft.name).toBe('Agente de prueba')
    expect(await db.agentRevisions.count()).toBe(1)
  })
})
