import { db } from '../db'
import { buildAgentConfiguration, type AgentDraft } from '../skills/agents'
import { fail } from '../skills/model'
import type { Skill } from '../skills/types'
import type { SavedAgent } from './types'
export const listAgents = (ownerId: string) =>
  db.agents.where('ownerId').equals(ownerId).toArray()
export async function saveAgent(
  draft: AgentDraft,
  ownerId: string,
  existing?: SavedAgent,
  sourceSkill?: Skill,
): Promise<SavedAgent> {
  const configuration = buildAgentConfiguration(draft, sourceSkill)
  return db.transaction('rw', db.agents, db.agentRevisions, async () => {
    const stored = existing ? await db.agents.get(existing.id) : undefined
    if (existing && (!stored || stored.ownerId !== ownerId)) fail('permission')
    if (stored && stored.revision !== existing?.revision) fail('conflict')
    const now = new Date().toISOString(),
      next: SavedAgent = {
        id: stored?.id || crypto.randomUUID(),
        ownerId,
        draft: structuredClone(draft),
        configuration,
        sourceSkill: sourceSkill ? structuredClone(sourceSkill) : undefined,
        revision: (stored?.revision || 0) + 1,
        createdAt: stored?.createdAt || now,
        updatedAt: now,
      }
    await db.agents.put(next)
    await db.agentRevisions.put({
      key: `${next.id}:${next.revision}`,
      agentId: next.id,
      ownerId,
      revision: next.revision,
      snapshot: next,
    })
    return next
  })
}
export async function duplicateAgent(agent: SavedAgent, ownerId: string) {
  if (agent.ownerId !== ownerId) fail('permission')
  return saveAgent(agent.draft, ownerId, undefined, agent.sourceSkill)
}
export async function deleteAgent(id: string, ownerId: string) {
  return db.transaction('rw', db.agents, db.agentRevisions, async () => {
    const a = await db.agents.get(id)
    if (!a || a.ownerId !== ownerId) fail('permission')
    await db.agents.delete(id)
    await db.agentRevisions.where('agentId').equals(id).delete()
  })
}
export async function agentHistory(id: string, ownerId: string) {
  const a = await db.agents.get(id)
  if (!a || a.ownerId !== ownerId) fail('permission')
  return (await db.agentRevisions.where('agentId').equals(id).toArray())
    .filter((r) => r.ownerId === ownerId)
    .sort((a, b) => b.revision - a.revision)
}
