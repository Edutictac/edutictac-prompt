import type { PromptTemplate, TemplateField } from './types'
export const templates: PromptTemplate[] = [
  { id: 'learning-situation', category: 'planning', icon: '◎', fields: [{id:'level',type:'select',options:['Infantil','Primaria','ESO','Bachillerato','Formación Profesional','Universidad','Otro']},{id:'course',type:'text'},{id:'subject',type:'text'},{id:'topic',type:'text'},{id:'objectives',type:'textarea'},{id:'methodology',type:'multiselect',options:['Aprendizaje basado en proyectos','Aprendizaje cooperativo','Aprendizaje basado en problemas','DUA','Investigación']},{id:'duration',type:'select',options:['15 minutos','30 minutos','45 minutos','55 minutos','Una sesión','Varias sesiones']},{id:'resources',type:'multiselect',options:['Ordenadores','Tablets','Proyector','Pizarra digital','Material manipulativo','Sin tecnología']},{id:'outputFormat',type:'select',options:['Texto','Markdown','Tabla']}] },
  { id: 'lesson', category: 'planning', icon: '◷', fields: [{id:'level',type:'select',options:['Infantil','Primaria','ESO','Bachillerato','FP','Universidad']},{id:'course',type:'text'},{id:'subject',type:'text'},{id:'topic',type:'text'},{id:'objectives',type:'textarea'},{id:'duration',type:'select',options:['15 minutos','30 minutos','45 minutos','55 minutos','Una sesión']},{id:'resources',type:'multiselect',options:['Ordenadores','Tablets','Proyector','Pizarra digital','Sin tecnología']},{id:'outputFormat',type:'select',options:['Texto','Markdown','Tabla']}] },
  { id: 'sequence', category: 'planning', icon: '☷', fields: [{id:'level',type:'select',options:['Infantil','Primaria','ESO','Bachillerato','FP','Universidad']},{id:'subject',type:'text'},{id:'topic',type:'text'},{id:'objectives',type:'textarea'},{id:'duration',type:'select',options:['Una sesión','Varias sesiones','Una semana','Varias semanas']},{id:'methodology',type:'multiselect',options:['ABP','Cooperativo','Gamificación','Investigación','Aprendizaje servicio']},{id:'outputFormat',type:'select',options:['Texto','Markdown','Tabla']}] },
  { id: 'competency-activity', category: 'activities', icon: '✦', fields: [{id:'level',type:'select',options:['Infantil','Primaria','ESO','Bachillerato','FP']},{id:'subject',type:'text'},{id:'topic',type:'text'},{id:'objectives',type:'textarea'},{id:'methodology',type:'multiselect',options:['Cooperativo','Retos','Gamificación','Trabajo individual']},{id:'resources',type:'multiselect',options:['Ordenadores','Material manipulativo','Sin tecnología']},{id:'outputFormat',type:'select',options:['Texto','Markdown','Tabla']}] },
  { id: 'project', category: 'activities', icon: '⌂', fields: [{id:'level',type:'select',options:['Infantil','Primaria','ESO','Bachillerato','FP']},{id:'subject',type:'text'},{id:'topic',type:'text'},{id:'objectives',type:'textarea'},{id:'duration',type:'select',options:['Una semana','Varias semanas']},{id:'resources',type:'multiselect',options:['Ordenadores','Robots','Laboratorio','Material manipulativo']},{id:'outputFormat',type:'select',options:['Texto','Markdown','Tabla']}] },
  { id: 'challenge', category: 'activities', icon: '◇', fields: [{id:'level',type:'select',options:['Infantil','Primaria','ESO','Bachillerato','FP']},{id:'subject',type:'text'},{id:'topic',type:'text'},{id:'objectives',type:'textarea'},{id:'methodology',type:'multiselect',options:['Aprendizaje basado en problemas','Retos','Pensamiento crítico']},{id:'outputFormat',type:'select',options:['Texto','Markdown']}] },
  { id: 'rubric', category: 'assessment', icon: '▤', fields: [{id:'level',type:'select',options:['Infantil','Primaria','ESO','Bachillerato','FP']},{id:'subject',type:'text'},{id:'activity',type:'text'},{id:'criteria',type:'textarea'},{id:'levels',type:'select',options:['3','4','5']},{id:'outputFormat',type:'select',options:['Tabla Markdown','Tabla HTML','Texto']}] },
  { id: 'checklist', category: 'assessment', icon: '☑', fields: [{id:'level',type:'select',options:['Infantil','Primaria','ESO','Bachillerato','FP']},{id:'subject',type:'text'},{id:'activity',type:'text'},{id:'criteria',type:'textarea'},{id:'outputFormat',type:'select',options:['Tabla Markdown','Lista']}] },
  { id: 'rating-scale', category: 'assessment', icon: '▥', fields: [{id:'level',type:'select',options:['Infantil','Primaria','ESO','Bachillerato','FP']},{id:'subject',type:'text'},{id:'activity',type:'text'},{id:'criteria',type:'textarea'},{id:'levels',type:'select',options:['3','4','5']},{id:'outputFormat',type:'select',options:['Tabla Markdown','Tabla HTML','Texto']}] },
  { id: 'systematic-observation', category: 'assessment', icon: '◉', fields: [{id:'level',type:'select',options:['Infantil','Primaria','ESO','Bachillerato','FP']},{id:'subject',type:'text'},{id:'activity',type:'text'},{id:'context',type:'textarea'},{id:'criteria',type:'textarea'},{id:'outputFormat',type:'select',options:['Tabla Markdown','Tabla HTML','Texto']}] },
  { id: 'portfolio', category: 'assessment', icon: '▰', fields: [{id:'level',type:'select',options:['Infantil','Primaria','ESO','Bachillerato','FP']},{id:'subject',type:'text'},{id:'activity',type:'text'},{id:'resources',type:'textarea'},{id:'criteria',type:'textarea'},{id:'qualityCriteria',type:'textarea'},{id:'outputFormat',type:'select',options:['Tabla Markdown','Texto']}] },
  { id: 'production', category: 'assessment', icon: '✚', fields: [{id:'level',type:'select',options:['Infantil','Primaria','ESO','Bachillerato','FP']},{id:'subject',type:'text'},{id:'activity',type:'text'},{id:'context',type:'textarea'},{id:'criteria',type:'textarea'},{id:'outputFormat',type:'select',options:['Tabla Markdown','Texto']}] },
  { id: 'written-test', category: 'assessment', icon: '▧', fields: [{id:'level',type:'select',options:['Infantil','Primaria','ESO','Bachillerato','FP']},{id:'subject',type:'text'},{id:'activity',type:'text'},{id:'criteria',type:'textarea'},{id:'levels',type:'select',options:['10','20','100']},{id:'outputFormat',type:'select',options:['Tabla Markdown','Texto']}] },
  { id: 'product', category: 'assessment', icon: '◆', fields: [{id:'level',type:'select',options:['Infantil','Primaria','ESO','Bachillerato','FP']},{id:'subject',type:'text'},{id:'activity',type:'text'},{id:'context',type:'textarea'},{id:'criteria',type:'textarea'},{id:'outputFormat',type:'select',options:['Tabla Markdown','Texto']}] },
  { id: 'presentation', category: 'assessment', icon: '▹', fields: [{id:'level',type:'select',options:['Infantil','Primaria','ESO','Bachillerato','FP']},{id:'subject',type:'text'},{id:'activity',type:'text'},{id:'duration',type:'select',options:['3 minutos','5 minutos','10 minutos','15 minutos']},{id:'criteria',type:'textarea'},{id:'outputFormat',type:'select',options:['Tabla Markdown','Texto']}] },
  { id: 'h5p', category: 'digital', icon: '▣', fields: [{id:'level',type:'select',options:['Infantil','Primaria','ESO','Bachillerato','FP']},{id:'subject',type:'text'},{id:'topic',type:'text'},{id:'objectives',type:'textarea'},{id:'activityType',type:'select',options:['Quiz','Arrastrar y soltar','Vídeo interactivo','Tarjetas']},{id:'outputFormat',type:'select',options:['H5P','Markdown']}] },
  { id: 'feedback', category: 'assessment', icon: '✍', fields: [{id:'level',type:'select',options:['Infantil','Primaria','ESO','Bachillerato','FP']},{id:'subject',type:'text'},{id:'task',type:'textarea'},{id:'criteria',type:'textarea'},{id:'outputFormat',type:'select',options:['Texto','Markdown']}] },
  { id: 'three-levels', category: 'adaptation', icon: '≣', fields: [{id:'level',type:'select',options:['Infantil','Primaria','ESO','Bachillerato','FP']},{id:'subject',type:'text'},{id:'task',type:'textarea'},{id:'objectives',type:'textarea'},{id:'outputFormat',type:'select',options:['Texto','Markdown','Tabla']}] },
  { id: 'family-note', category: 'communication', icon: '✉', fields: [{id:'role',type:'text'},{id:'context',type:'textarea'},{id:'task',type:'textarea'},{id:'constraints',type:'textarea'},{id:'outputFormat',type:'select',options:['Texto','Markdown']}] },
  { id: 'free', category: 'free', icon: '✎', fields: [{id:'role',type:'text'},{id:'context',type:'textarea'},{id:'task',type:'textarea'},{id:'constraints',type:'textarea'},{id:'outputFormat',type:'select',options:['Texto','Markdown','Tabla','JSON','HTML']}] }
]

// El curso de IA recomienda completar siempre que sea posible el contexto,
// las restricciones y los criterios con los que se revisará el resultado.
// Se añaden a las plantillas que aún no los tenían sin duplicar los campos
// del constructor libre.
const promptingFields: TemplateField[] = [
  {id:'context', type:'textarea'},
  {id:'constraints', type:'textarea'},
  {id:'qualityCriteria', type:'textarea'}
]

for (const template of templates) {
  for (const field of promptingFields) {
    if (!template.fields.some(existing => existing.id === field.id)) {
      template.fields.push({...field})
    }
  }
}

// Solo mostramos filtros que tienen al menos una herramienta publicada.
// Así el catálogo no ofrece categorías vacías mientras se preparan futuras plantillas.
export const categoryIds = ['all', ...new Set(templates.map(template => template.category))]

// Camps que ajuden a començar sense convertir el formulari inicial en una fitxa tècnica.
// El mode avançat continua mostrant tots els camps de la plantilla.
export const simpleFieldIds: Record<string, string[]> = {
  'learning-situation': ['level', 'course', 'subject', 'topic', 'objectives', 'duration', 'outputFormat'],
  lesson: ['level', 'course', 'subject', 'topic', 'objectives', 'duration', 'outputFormat'],
  sequence: ['level', 'subject', 'topic', 'objectives', 'duration', 'outputFormat'],
  'competency-activity': ['level', 'subject', 'topic', 'objectives', 'outputFormat'],
  project: ['level', 'subject', 'topic', 'objectives', 'duration', 'outputFormat'],
  challenge: ['level', 'subject', 'topic', 'objectives', 'outputFormat'],
  rubric: ['level', 'subject', 'activity', 'criteria', 'outputFormat'],
  checklist: ['level', 'subject', 'activity', 'criteria', 'outputFormat'],
  'rating-scale': ['level', 'subject', 'activity', 'criteria', 'levels', 'outputFormat'],
  'systematic-observation': ['level', 'subject', 'activity', 'criteria', 'outputFormat'],
  portfolio: ['level', 'subject', 'activity', 'criteria', 'outputFormat'],
  production: ['level', 'subject', 'activity', 'criteria', 'outputFormat'],
  'written-test': ['level', 'subject', 'activity', 'criteria', 'outputFormat'],
  product: ['level', 'subject', 'activity', 'criteria', 'outputFormat'],
  presentation: ['level', 'subject', 'activity', 'duration', 'criteria', 'outputFormat'],
  h5p: ['level', 'subject', 'topic', 'objectives', 'activityType', 'outputFormat'],
  feedback: ['level', 'subject', 'task', 'outputFormat'],
  'three-levels': ['level', 'subject', 'task', 'objectives', 'outputFormat'],
  'family-note': ['role', 'task', 'outputFormat'],
  free: ['role', 'task', 'outputFormat']
}
