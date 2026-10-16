import { db } from '../db'
import { fail, personalSkill, validateDefinition } from './model'
import type { Skill, SkillDefinition } from './types'
export const skillOwner = (sub?: string) =>
  sub ? `oidc:${sub}` : 'local:device'
export async function listSkills(ownerId: string) {
  return db.skills.where('ownerId').equals(ownerId).toArray()
}
export async function saveSkill(
  definition: SkillDefinition,
  ownerId: string,
  existing?: Skill,
  reviewed = true,
): Promise<Skill> {
  const validated = validateDefinition(definition)
  return db.transaction('rw', db.skills, db.skillRevisions, async () => {
    const stored = existing ? await db.skills.get(existing.id) : undefined
    if (
      existing &&
      (!stored || stored.ownerId !== ownerId || stored.source === 'builtin')
    )
      fail('permission')
    if (existing && stored!.revision !== existing.revision) fail('conflict')
    const next: Skill = stored
      ? {
          ...stored,
          ...validated,
          reviewed,
          revision: stored.revision + 1,
          updatedAt: new Date().toISOString(),
        }
      : { ...personalSkill(validated, ownerId), reviewed }
    await db.skills.put(next)
    await db.skillRevisions.put({
      key: `${next.id}:${next.revision}`,
      skillId: next.id,
      ownerId,
      revision: next.revision,
      snapshot: next,
    })
    return next
  })
}
export async function importSkill(
  definition: SkillDefinition,
  ownerId: string,
) {
  const skill = personalSkill(definition, ownerId, 'imported')
  await db.transaction('rw', db.skills, db.skillRevisions, async () => {
    await db.skills.add(skill)
    await db.skillRevisions.add({
      key: `${skill.id}:1`,
      skillId: skill.id,
      ownerId,
      revision: 1,
      snapshot: skill,
    })
  })
  return skill
}
export async function duplicateSkill(skill: Skill, ownerId: string) {
  if (skill.source !== 'builtin' && skill.ownerId !== ownerId)
    fail('permission')
  return saveSkill({ ...skill }, ownerId, undefined, skill.reviewed)
}
export async function deleteSkill(id: string, ownerId: string) {
  await db.transaction('rw', db.skills, db.skillRevisions, async () => {
    const skill = await db.skills.get(id)
    if (!skill || skill.ownerId !== ownerId || skill.source === 'builtin')
      fail('permission')
    await db.skills.delete(id)
    await db.skillRevisions.where('skillId').equals(id).delete()
  })
}
export async function revisions(id: string, ownerId: string) {
  const skill = await db.skills.get(id)
  if (!skill || skill.ownerId !== ownerId) fail('permission')
  return (await db.skillRevisions.where('skillId').equals(id).toArray())
    .filter((r) => r.ownerId === ownerId)
    .sort((a, b) => b.revision - a.revision)
}
