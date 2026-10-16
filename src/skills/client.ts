import { apiRequest } from '../api'
import type { Language } from '../types'
import type { Skill, Value } from './types'
import { assistedPrompt, prepareExecution } from './execution'
export interface Provider {
  id: string
  name: string
  models: string[]
}
export const getCapabilities = () =>
  apiRequest<{ providers: Provider[] }>('/api/skills/capabilities')
export const inferSkill = (
  skill: Skill,
  values: Record<string, Value>,
  language: Language,
  provider: string,
  model: string,
) =>
  apiRequest<{ text: string }>('/api/skills/infer', {
    method: 'POST',
    body: JSON.stringify({
      task: 'execute',
      skill,
      values,
      language,
      provider,
      model,
      consent: true,
      prepared: prepareExecution(skill, values, language),
    }),
  })
export const proposeSkill = (
  goal: string,
  language: Language,
  provider: string,
  model: string,
) =>
  apiRequest<{ text: string }>('/api/skills/infer', {
    method: 'POST',
    body: JSON.stringify({
      task: 'create',
      goal,
      language,
      provider,
      model,
      consent: true,
      prepared: assistedPrompt(goal, language),
    }),
  })
export const remoteSkills = () => apiRequest<{ skills: Skill[] }>('/api/skills')
export const putSkill = (skill: Skill) =>
  apiRequest<Skill>(`/api/skills/${encodeURIComponent(skill.id)}`, {
    method: 'PUT',
    body: JSON.stringify(skill),
  })

export const deleteRemoteSkill = (id: string) =>
  apiRequest<void>(`/api/skills/${encodeURIComponent(id)}`, {
    method: 'DELETE',
  })
