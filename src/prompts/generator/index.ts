import { ADULT_LEVEL } from '../../templates'
import type { Language, PromptTemplate } from '../../types'
import { fileFormatInstructionFor, returnTextFor } from './formats'
import { buildRoleDefault } from './roles'
import { buildTask } from './tasks'
import {
  assessmentTexts,
  defaults,
  extraLabels,
  gameTexts,
  imageToolTexts,
  labels,
  reviewTypes,
  reviews,
  udlTemplates,
  udlTexts,
  type LabelKey,
} from './texts'
import { mechanicsFor, readCurriculum, readValue } from './values'
import { videoBriefs } from './video'

export function generatePrompt(template: PromptTemplate, values: Record<string, string>, language: Language): string {
  const l = labels[language]
  const d = defaults[language]
  const u = udlTexts[language]
  const g = gameTexts[language]
  const a = assessmentTexts[language]
  const value = (key: string) => readValue(values, key, language)
  const curriculumValue = (key: string) => readCurriculum(values, key)
  const mechanics = mechanicsFor(value)
  const lines: string[] = []
  const level = [value('level'), value('course')].filter(Boolean).join(' ')
  const roleDefault = buildRoleDefault(template.id, language, value, d, level)
  lines.push(`## ${l.role}\n${value('role') || roleDefault}`)
  if (value('context') || level || value('curriculumContext'))
    lines.push(
      `## ${l.context}\n${level ? `${d.workingWith} ${level}.` : ''}${values.level === ADULT_LEVEL ? ` ${d.adultGuidance}` : ''}\n${value('curriculumContext')}\n${value('context')}`.trim(),
    )
  if (curriculumValue('curriculumCompetences'))
    lines.push(`## ${l.specificCompetences}\n${curriculumValue('curriculumCompetences')}`)
  // Encargo propio de cada plantilla; las que no tienen uno usan la tarea
  // escrita por el docente o el diseño de una actividad sobre el tema.
  const topic = value('topic') || d.topic
  const activity = value('activity') || d.topic
  const task = buildTask({ templateId: template.id, language, value, d, u, g, a, topic, activity, mechanics })
  lines.push(`## ${l.task}\n${task}`)
  if (value('sourceText')) lines.push(`## ${l.sourceText}\n${value('sourceText')}`)
  for (const key of [
    'objectives',
    'criteria',
    'methodology',
    'duration',
    'resources',
    'levels',
    'constraints',
    'qualityCriteria',
  ])
    if (value(key))
      lines.push(
        `## ${key === 'levels' && template.id === 'written-test' ? a.maxScore : l[key as LabelKey]}\n${value(key)}`,
      )
  if (curriculumValue('curriculumCriteria'))
    lines.push(`## ${l.assessmentCriteria}\n${curriculumValue('curriculumCriteria')}`)
  if (curriculumValue('curriculumKnowledge'))
    lines.push(`## ${l.basicKnowledge}\n${curriculumValue('curriculumKnowledge')}`)
  for (const key of Object.keys(extraLabels[language]))
    if (value(key)) lines.push(`## ${extraLabels[language][key]}\n${value(key)}`)
  if (template.id === 'html-game') {
    lines.push(`## ${g.items}\n${value('gameItems') ? `${value('gameItems')}\n${g.itemsNote}` : g.noItems}`)
    lines.push(`## ${g.tech}\n${g.techItems.map((item) => `- ${item}`).join('\n')}`)
    const features = (values['gameFeatures'] || '')
      .split(' · ')
      .map((item) => item.trim())
      .filter((item) => item in g.featureTexts)
    if (features.length)
      lines.push(`## ${g.features}\n${features.map((item) => `- ${g.featureTexts[item]}`).join('\n')}`)
  }
  // En la matriz DUA, si no se elige ningún principio, se trabajan los tres.
  const chosenPrinciples = (values['udl'] || '')
    .split(' · ')
    .map((item) => item.trim())
    .filter((item) => item in u.principles)
  const principles =
    template.id === 'udl-matrix' && !chosenPrinciples.length ? Object.keys(u.principles) : chosenPrinciples
  if (principles.length)
    lines.push(`## ${l.udl}\n${u.intro}\n${principles.map((item) => `- ${u.principles[item]}`).join('\n')}`)
  if (value('barriers')) lines.push(`## ${l.barriers}\n${value('barriers')}\n${u.barriers}`)
  // Solo las plantillas de imagen ofrecen el campo; se ignora en prompts antiguos
  // guardados con una herramienta en otras plantillas.
  const tool = template.fields.some((field) => field.id === 'aiTool') ? (values['aiTool'] || '').trim() : ''
  const toolText = imageToolTexts[language][tool]
  if (toolText)
    lines.push(
      `## ${l.aiTool}: ${tool}\n${toolText.replace('{ratio}', (values['aspectRatio'] || '1:1').split(' ')[0])}`,
    )
  if (value('refinement')) lines.push(`## ${l.refinement}\n${value('refinement')}`)
  if (template.id === 'explainer-video') lines.push(`## ${l.videoBrief}\n${videoBriefs[language]}`)
  const fileFormatInstruction = fileFormatInstructionFor(language, value('outputFormat'))
  const review = udlTemplates.has(template.id)
    ? u.checks
    : principles.length
      ? [...reviews[language][reviewTypes[template.id] || 'generic'], ...u.checks.slice(0, 2)]
      : reviews[language][reviewTypes[template.id] || 'generic']
  const checks = template.id === 'html-game' ? [...review, ...g.checks] : review
  lines.push(
    `## ${l.requirements}\n${checks.map((item) => `- ${item}`).join('\n')}`,
    `## ${l.format}\n${fileFormatInstruction || `${returnTextFor(language)} ${value('outputFormat') || d.structured}.`}`,
  )
  if (template.id === 'gift') lines.push(`## ${l.giftRules}\n${d.giftRules}`)
  return lines.join('\n\n')
}
