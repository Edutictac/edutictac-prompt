import { describe, expect, it } from 'vitest'
import { agentPresets } from './presets'
import { agentTestCases, suggestedMaterials } from './guidance'
import type { Language } from '../types'

describe('agent guidance', () => {
  it.each<Language>(['es', 'ca-valencia', 'ca', 'en'])(
    'provides distinct useful material suggestions and test questions in %s',
    (language) => {
      const tutor = agentPresets(language).find((preset) => preset.id === 'tutor')!
      const rubric = agentPresets(language).find((preset) => preset.id === 'crear-rubricas')!
      expect(suggestedMaterials('tutor', language)).not.toEqual(suggestedMaterials('crear-rubricas', language))
      expect(suggestedMaterials('custom', language)).toHaveLength(2)
      expect(agentTestCases(tutor.draft, language)[0]).toContain(tutor.draft.purpose)
      expect(agentTestCases(rubric.draft, language)).toHaveLength(3)
    },
  )
})
