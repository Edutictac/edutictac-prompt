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
  coachIdea: 'topic',
  coachSource: 'topic',
  lessonOpening: 'design',
  priorKnowledge: 'design',
  peerAssessment: 'criteria',
  guidedQuestions: 'limits',
  level: 'about',
  course: 'about',
  subject: 'about',
  topic: 'topic',
  sourceText: 'topic',
  activity: 'topic',
  audience: 'about',
  profile: 'about',
  documentType: 'task',
  facts: 'task',
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
  theme: 'design',
  themeElements: 'design',
  printFinish: 'design',
  sheetLanguage: 'about',
  sections: 'design',
  branches: 'design',
  visualStyle: 'design',
  videoStyle: 'design',
  codingTool: 'design',
  studentRole: 'design',
  activityIdea: 'design',
  videoVariant: 'design',
  videoFinish: 'design',
  tone: 'design',
  brandColors: 'design',
  voice: 'design',
  includeLabels: 'design',
  aspectRatio: 'design',
  udl: 'support',
  accessibility: 'support',
  supportVersions: 'support',
  supportChoices: 'support',
  barriers: 'support',
  strengths: 'support',
  criteria: 'criteria',
  qualityCriteria: 'criteria',
  mustShow: 'criteria',
  levels: 'criteria',
  constraints: 'limits',
  avoid: 'limits',
  refinement: 'limits',
  outputFormat: 'format',
  mathDestination: 'task',
  maxScore: 'format',
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

// Campos imprescindibles para generar un prompt útil: el nivel (si la
// herramienta lo tiene) y el primero que define el contenido. Cuando están
// rellenos, el modo «Paso a paso» ofrece «Generar ya» y el resto sirve para afinar.
const contentFields = ['coachIdea', 'topic', 'task', 'activity', 'sourceText']
export function essentialFields(template: PromptTemplate): string[] {
  const ids = template.fields.map((field) => field.id)
  const content = contentFields.find((id) => ids.includes(id))
  if (!content) return []
  return [...(ids.includes('level') ? ['level'] : []), content]
}
export const essentialsReady = (template: PromptTemplate, values: Record<string, string>) => {
  const essentials = essentialFields(template)
  return essentials.length > 0 && essentials.every((id) => (values[id] || '').trim())
}
