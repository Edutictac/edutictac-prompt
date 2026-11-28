import type { PromptTemplate } from '../../types'

export function continuationTargets(source: PromptTemplate): string[] {
  if (source.id === 'activity-evidence') return ['rubric']
  return source.category === 'planning' || source.category === 'activities' ? ['activity-evidence', 'rubric'] : []
}

// Se trasladan datos introducidos por el docente, no el prompt ni una respuesta
// de la IA que la aplicación no conoce. El texto sigue siendo editable.
export function continuationValues(source: Record<string, string>, target: PromptTemplate): Record<string, string> {
  const allowed = new Set(target.fields.map((field) => field.id))
  const result: Record<string, string> = {}
  for (const key of ['level', 'course', 'subject', 'objectives', 'criteria', 'context']) {
    if (allowed.has(key) && source[key]?.trim()) result[key] = source[key]
  }
  for (const key of [
    'curriculumProfile',
    'curriculumContext',
    'curriculumCompetences',
    'curriculumCriteria',
    'curriculumKnowledge',
  ]) {
    if (source[key]?.trim()) result[key] = source[key]
  }
  const activity = [source.activity, source.activityIdea, source.topic, source.task].find((value) => value?.trim())
  if (allowed.has('activity') && activity) result.activity = activity
  return result
}
