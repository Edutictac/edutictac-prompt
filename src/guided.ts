import type { PromptTemplate } from './types'

// Modo «Paso a paso»: agrupa los campos del formulario en bloques con sentido
// para no convertir la guía en una lista interminable de preguntas. El orden de
// los bloques sigue el orden de los campos de la plantilla y cualquier campo no
// previsto cae en un paso propio, de forma que nunca se pierde ninguno.
export type GuidedBlock = 'about' | 'topic' | 'task' | 'design' | 'support' | 'criteria' | 'limits' | 'format'

export const guidedBlockIds: GuidedBlock[] = [
  'about',
  'topic',
  'task',
  'design',
  'support',
  'criteria',
  'limits',
  'format',
]

const fieldBlocks: Record<string, GuidedBlock> = {
  level: 'about',
  course: 'about',
  subject: 'about',
  topic: 'topic',
  sourceText: 'topic',
  activity: 'topic',
  audience: 'about',
  role: 'task',
  context: 'task',
  task: 'task',
  objectives: 'task',
  methodology: 'design',
  duration: 'design',
  resources: 'design',
  activityType: 'design',
  questionCount: 'design',
  questionTypes: 'design',
  gameItems: 'design',
  gameFeatures: 'design',
  sections: 'design',
  branches: 'design',
  visualStyle: 'design',
  videoStyle: 'design',
  videoVariant: 'design',
  videoFinish: 'design',
  tone: 'design',
  brandColors: 'design',
  voice: 'design',
  includeLabels: 'design',
  aspectRatio: 'design',
  udl: 'support',
  barriers: 'support',
  criteria: 'criteria',
  qualityCriteria: 'criteria',
  mustShow: 'criteria',
  levels: 'criteria',
  constraints: 'limits',
  avoid: 'limits',
  refinement: 'limits',
  outputFormat: 'format',
}

export interface GuidedStep {
  id: string
  block?: GuidedBlock
  fields: string[]
}

export function guidedSteps(template: PromptTemplate): GuidedStep[] {
  const grouped = new Map<string, string[]>()
  const order: string[] = []
  for (const field of template.fields) {
    const key = fieldBlocks[field.id] || `field:${field.id}`
    if (!grouped.has(key)) {
      grouped.set(key, [])
      order.push(key)
    }
    grouped.get(key)!.push(field.id)
  }
  return order.map((key) => ({
    id: key,
    block: guidedBlockIds.includes(key as GuidedBlock) ? (key as GuidedBlock) : undefined,
    fields: grouped.get(key)!,
  }))
}
