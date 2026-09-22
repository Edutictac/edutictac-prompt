import type { Language, PromptTemplate } from './types'

type LabelKey = 'role'|'context'|'task'|'objectives'|'methodology'|'duration'|'resources'|'requirements'|'format'|'criteria'|'qualityCriteria'|'constraints'|'levels'|'activityType'|'specificCompetences'|'assessmentCriteria'|'basicKnowledge'
const labels: Record<Language, Record<LabelKey,string>> = {
  es:{role:'Rol',context:'Contexto',task:'Objetivo y tarea',objectives:'Objetivos',methodology:'Metodología',duration:'Duración',resources:'Recursos disponibles',requirements:'Revisión docente',format:'Formato de salida',criteria:'Criterios',qualityCriteria:'Criterios de calidad',constraints:'Restricciones y límites',levels:'Niveles de desempeño',activityType:'Tipo de actividad',specificCompetences:'Competencias específicas',assessmentCriteria:'Criterios de evaluación',basicKnowledge:'Saberes básicos'},
  'ca-valencia':{role:'Rol',context:'Context',task:'Objectiu i tasca',objectives:'Objectius',methodology:'Metodologia',duration:'Duració',resources:'Recursos disponibles',requirements:'Revisió docent',format:'Format d’eixida',criteria:'Criteris',qualityCriteria:'Criteris de qualitat',constraints:'Restriccions i límits',levels:'Nivells de rendiment',activityType:'Tipus d’activitat',specificCompetences:'Competències específiques',assessmentCriteria:'Criteris d’avaluació',basicKnowledge:'Sabers bàsics'},
  ca:{role:'Rol',context:'Context',task:'Objectiu i tasca',objectives:'Objectius',methodology:'Metodologia',duration:'Durada',resources:'Recursos disponibles',requirements:'Revisió docent',format:'Format de sortida',criteria:'Criteris',qualityCriteria:'Criteris de qualitat',constraints:'Restriccions i límits',levels:'Nivells de rendiment',activityType:'Tipus d’activitat',specificCompetences:'Competències específiques',assessmentCriteria:'Criteris d’avaluació',basicKnowledge:'Sabers bàsics'},
  en:{role:'Role',context:'Context',task:'Objective and task',objectives:'Objectives',methodology:'Methodology',duration:'Duration',resources:'Available resources',requirements:'Teacher review',format:'Output format',criteria:'Criteria',qualityCriteria:'Quality criteria',constraints:'Constraints and limits',levels:'Performance levels',activityType:'Activity type',specificCompetences:'Specific competences',assessmentCriteria:'Assessment criteria',basicKnowledge:'Basic knowledge'}
}

export function generatePrompt(template: PromptTemplate, values: Record<string,string>, language: Language): string {
  const l=labels[language]
  const value=(key:string)=>values[key]?.trim()||''
  const lines:string[]=[]
  const level=[value('level'),value('course')].filter(Boolean).join(' ')
  lines.push(`## ${l.role}\n${value('role')||`Actúa como docente especialista en ${value('subject')||'educación'} y diseño de actividades para alumnado de ${level||'la etapa indicada'}.`}`)
  if(value('context')||level||value('curriculumContext')) lines.push(`## ${l.context}\n${level?`Trabajo con alumnado de ${level}.`:''}\n${value('curriculumContext')}\n${value('context')}`.trim())
  if(value('curriculumCompetences')) lines.push(`## ${l.specificCompetences}\n${value('curriculumCompetences')}`)
  const task = template.id==='rubric'?`Crea una rúbrica para evaluar ${value('activity')||'la actividad indicada'}.`:template.id==='checklist'?`Crea una lista de cotejo para ${value('activity')||'la actividad indicada'}.`:template.id==='h5p'?`Diseña una actividad H5P de tipo ${value('activityType')||'interactivo'} sobre ${value('topic')||'el tema indicado'}.`:value('task')||`Diseña una actividad sobre ${value('topic')||'el tema indicado'}.`
  lines.push(`## ${l.task}\n${task}`)
  for(const key of ['objectives','criteria','methodology','duration','resources','levels','constraints','qualityCriteria']) if(value(key)) lines.push(`## ${l[key as LabelKey]}\n${value(key)}`)
  if(value('curriculumCriteria')) lines.push(`## ${l.assessmentCriteria}\n${value('curriculumCriteria')}`)
  if(value('curriculumKnowledge')) lines.push(`## ${l.basicKnowledge}\n${value('curriculumKnowledge')}`)
  lines.push(`## ${l.requirements}\n- Entrega un primer borrador revisable, no lo presentes como definitivo.\n- Usa instrucciones claras, observables y adecuadas al nivel.\n- Comprueba que la propuesta es viable con el tiempo y los recursos indicados.\n- Señala cualquier dato, fuente o supuesto que deba verificar la persona docente.\n- No inventes normativa, referencias ni información sobre el alumnado.`, `## ${l.format}\nDevuelve el resultado en ${value('outputFormat')||'texto estructurado'}.`)
  return lines.join('\n\n')
}
