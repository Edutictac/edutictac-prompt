import 'fake-indexeddb/auto'
import Dexie from 'dexie'
import { afterEach, describe, expect, it } from 'vitest'
import { db } from '../db'
import { builtinSkills } from './seeds'
import {
  deleteSkill,
  duplicateSkill,
  importSkill,
  listSkills,
  revisions,
  saveSkill,
} from './repository'
const definition = builtinSkills('es')[0],
  owner = 'oidc:one'
afterEach(async () => {
  await db.skills.clear()
  await db.skillRevisions.clear()
  await db.prompts.clear()
})
describe('private Skills persistence', () => {
  it('creates, edits, duplicates, versions, and deletes personal skills', async () => {
    const created = await saveSkill(definition, owner)
    const edited = await saveSkill(
      { ...created, name: 'Cambio', version: '1.1.0' },
      owner,
      created,
    )
    expect(edited.revision).toBe(2)
    expect(await revisions(created.id, owner)).toHaveLength(2)
    const copy = await duplicateSkill(edited, owner)
    expect(copy.id).not.toBe(created.id)
    expect(copy.revision).toBe(1)
    await deleteSkill(created.id, owner)
    expect((await listSkills(owner)).map((x) => x.id)).toEqual([copy.id])
    expect(
      await db.skillRevisions.where('skillId').equals(created.id).count(),
    ).toBe(0)
  })
  it('separates accounts and denies cross-owner writes, deletes and histories', async () => {
    const created = await saveSkill(definition, owner)
    expect(await listSkills('oidc:two')).toEqual([])
    await expect(saveSkill(created, 'oidc:two', created)).rejects.toThrow(
      'permission',
    )
    await expect(deleteSkill(created.id, 'oidc:two')).rejects.toThrow(
      'permission',
    )
    await expect(revisions(created.id, 'oidc:two')).rejects.toThrow(
      'permission',
    )
    await expect(duplicateSkill(created, 'oidc:two')).rejects.toThrow(
      'permission',
    )
    expect(await listSkills(owner)).toHaveLength(1)
  })
  it('requires review of imports and rejects stale revisions', async () => {
    const imported = await importSkill(definition, owner)
    expect(imported.reviewed).toBe(false)
    await saveSkill(imported, owner, imported, true)
    await expect(saveSkill(imported, owner, imported)).rejects.toThrow(
      'conflict',
    )
  })
  it('migrates v1 prompt data without loss', async () => {
    db.close()
    await db.delete()
    const old = new Dexie('edutictac-prompt')
    old.version(1).stores({
      prompts: 'id,title,categoryId,templateId,language,updatedAt',
      categories: 'id,name',
    })
    await old.table('prompts').put({
      id: 'original',
      title: 'Original',
      prompt: 'No cambiar',
      language: 'es',
      version: 1,
    })
    old.close()
    await db.open()
    expect((await db.prompts.get('original'))?.prompt).toBe('No cambiar')
    expect(db.verno).toBe(3)
    expect(await listSkills(owner)).toEqual([])
  })
})
