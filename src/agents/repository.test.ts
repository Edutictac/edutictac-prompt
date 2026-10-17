import 'fake-indexeddb/auto'
import Dexie from 'dexie'
import { afterEach, describe, expect, it } from 'vitest'
import { db } from '../db'
import { defaultAgentDraft } from '../skills/agents'
import { builtinSkills } from '../skills/seeds'
import {
  agentHistory,
  deleteAgent,
  duplicateAgent,
  listAgents,
  saveAgent,
} from './repository'
const draft = () => ({
  ...defaultAgentDraft('es'),
  stage: 'primary' as const,
  subject: 'Matemáticas',
})
afterEach(async () => {
  await db.agents.clear()
  await db.agentRevisions.clear()
  await db.prompts.clear()
  await db.skills.clear()
})
describe('saved agent designs', () => {
  it('saves, edits, duplicates, versions and deletes agents independently of Skills', async () => {
    const created = await saveAgent(draft(), 'one')
    const updated = await saveAgent(
      { ...created.draft, stage: 'adult', subject: 'Ciencias' },
      'one',
      created,
    )
    expect(updated.revision).toBe(2)
    expect(updated.configuration.instructions).toContain('Ciencias')
    expect(await agentHistory(created.id, 'one')).toHaveLength(2)
    const copy = await duplicateAgent(updated, 'one')
    expect(copy.id).not.toBe(created.id)
    expect(copy.draft.stage).toBe('adult')
    await deleteAgent(created.id, 'one')
    expect(await listAgents('one')).toHaveLength(1)
    expect(
      await db.agentRevisions.where('agentId').equals(created.id).count(),
    ).toBe(0)
    expect(await db.skills.count()).toBe(0)
  })
  it('isolates owners and rejects stale updates', async () => {
    const created = await saveAgent(draft(), 'one')
    expect(await listAgents('two')).toEqual([])
    await expect(saveAgent(created.draft, 'two', created)).rejects.toThrow(
      'permission',
    )
    await expect(duplicateAgent(created, 'two')).rejects.toThrow('permission')
    await expect(deleteAgent(created.id, 'two')).rejects.toThrow('permission')
    await expect(agentHistory(created.id, 'two')).rejects.toThrow('permission')
    await saveAgent({ ...created.draft, subject: 'Lengua' }, 'one', created)
    await expect(saveAgent(created.draft, 'one', created)).rejects.toThrow(
      'conflict',
    )
  })
  it('migrates v2 without losing prompts or personal Skills', async () => {
    db.close()
    await db.delete()
    const old = new Dexie('edutictac-prompt')
    old.version(2).stores({
      prompts: 'id,title,categoryId,templateId,language,updatedAt',
      categories: 'id,name',
      skills: 'id,ownerId,slug,updatedAt',
      skillRevisions: 'key,skillId,ownerId',
    })
    await old
      .table('prompts')
      .put({ id: 'p', title: 'Preservado', prompt: 'Texto original' })
    await old.table('skills').put({
      ...builtinSkills('es')[0],
      id: 's',
      ownerId: 'one',
      source: 'personal',
    })
    old.close()
    await db.open()
    expect(db.verno).toBe(3)
    expect((await db.prompts.get('p'))?.prompt).toBe('Texto original')
    expect((await db.skills.get('s'))?.name).toBe('Crear rúbricas')
    expect(await db.agents.count()).toBe(0)
  })
})
