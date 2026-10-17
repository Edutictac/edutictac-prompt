import type { AgentDraft, AgentConfiguration } from '../skills/agents'
import type { Skill } from '../skills/types'
export interface SavedAgent {
  id: string
  ownerId: string
  draft: AgentDraft
  configuration: AgentConfiguration
  sourceSkill?: Skill
  revision: number
  createdAt: string
  updatedAt: string
}
export interface AgentRevision {
  key: string
  agentId: string
  ownerId: string
  revision: number
  snapshot: SavedAgent
}
