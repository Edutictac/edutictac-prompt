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
  { id: 'h5p', category: 'digital', icon: '▣', fields: [{id:'level',type:'select',options:['Infantil','Primaria','ESO','Bachillerato','FP']},{id:'subject',type:'text'},{id:'topic',type:'text'},{id:'objectives',type:'textarea'},{id:'activityType',type:'select',options:['Quiz','Arrastrar y soltar','Vídeo interactivo','Tarjetas']},{id:'outputFormat',type:'select',options:['H5P']}] },
  { id: 'scorm', category: 'digital', icon: '⊞', fields: [{id:'level',type:'select',options:['Infantil','Primaria','ESO','Bachillerato','FP']},{id:'subject',type:'text'},{id:'topic',type:'text'},{id:'objectives',type:'textarea'},{id:'outputFormat',type:'select',options:['SCORM 1.2']}] },
  { id: 'html-game', category: 'digital', icon: '🎮', fields: [{id:'level',type:'select',options:['Infantil','Primaria','ESO','Bachillerato','FP']},{id:'subject',type:'text'},{id:'topic',type:'text'},{id:'objectives',type:'textarea'},{id:'activityType',type:'multiselect',options:['Completar huecos','Memorizar y escribir','Emparejar','Ordenar','Clasificar','Opción múltiple']},{id:'gameItems',type:'textarea'},{id:'gameFeatures',type:'multiselect',options:['Niveles y trofeos','Ayuda para el alumnado','Menú docente oculto','Manual docente','Guardar sesión','Cargar contenido CSV']},{id:'outputFormat',type:'select',options:['HTML']}] },

  { id: 'gift', category: 'digital', icon: '☰', fields: [{id:'level',type:'select',options:['Infantil','Primaria','ESO','Bachillerato','FP']},{id:'subject',type:'text'},{id:'topic',type:'text'},{id:'objectives',type:'textarea'},{id:'outputFormat',type:'select',options:['GIFT']}] },
  { id: 'qti', category: 'digital', icon: '◫', fields: [{id:'level',type:'select',options:['Infantil','Primaria','ESO','Bachillerato','FP']},{id:'subject',type:'text'},{id:'topic',type:'text'},{id:'objectives',type:'textarea'},{id:'outputFormat',type:'select',options:['QTI 2.1']}] },
  { id: 'common-cartridge', category: 'digital', icon: '❏', fields: [{id:'level',type:'select',options:['Infantil','Primaria','ESO','Bachillerato','FP']},{id:'subject',type:'text'},{id:'topic',type:'text'},{id:'objectives',type:'textarea'},{id:'outputFormat',type:'select',options:['Common Cartridge']}] },
  { id: 'feedback', category: 'assessment', icon: '✍', fields: [{id:'level',type:'select',options:['Infantil','Primaria','ESO','Bachillerato','FP']},{id:'subject',type:'text'},{id:'task',type:'textarea'},{id:'criteria',type:'textarea'},{id:'outputFormat',type:'select',options:['Texto','Markdown']}] },
  { id: 'three-levels', category: 'adaptation', icon: '≣', fields: [{id:'level',type:'select',options:['Infantil','Primaria','ESO','Bachillerato','FP']},{id:'subject',type:'text'},{id:'task',type:'textarea'},{id:'objectives',type:'textarea'},{id:'outputFormat',type:'select',options:['Texto','Markdown','Tabla']}] },
  { id: 'easy-reading', category: 'adaptation', icon: '¶', fields: [{id:'level',type:'select',options:['Infantil','Primaria','ESO','Bachillerato','FP']},{id:'subject',type:'text'},{id:'topic',type:'text'},{id:'sourceText',type:'textarea'},{id:'outputFormat',type:'select',options:['Texto','Markdown']}] },
  { id: 'bias-check', category: 'adaptation', icon: '⚖', fields: [{id:'level',type:'select',options:['Infantil','Primaria','ESO','Bachillerato','FP']},{id:'subject',type:'text'},{id:'topic',type:'text'},{id:'sourceText',type:'textarea'},{id:'criteria',type:'textarea'},{id:'outputFormat',type:'select',options:['Texto','Markdown']}] },
  { id: 'glossary-support', category: 'content', icon: '✧', fields: [{id:'level',type:'select',options:['Infantil','Primaria','ESO','Bachillerato','FP']},{id:'subject',type:'text'},{id:'topic',type:'text'},{id:'objectives',type:'textarea'},{id:'outputFormat',type:'select',options:['Texto','Markdown','Tabla']}] },
  { id: 'family-note', category: 'communication', icon: '✉', fields: [{id:'role',type:'text'},{id:'context',type:'textarea'},{id:'task',type:'textarea'},{id:'constraints',type:'textarea'},{id:'outputFormat',type:'select',options:['Texto','Markdown']}] },
  { id: 'tutoring-script', category: 'communication', icon: '☏', fields: [{id:'role',type:'text'},{id:'context',type:'textarea'},{id:'task',type:'textarea'},{id:'objectives',type:'textarea'},{id:'outputFormat',type:'select',options:['Texto','Markdown']}] },
  { id: 'free', category: 'free', icon: '✎', fields: [{id:'role',type:'text'},{id:'context',type:'textarea'},{id:'task',type:'textarea'},{id:'constraints',type:'textarea'},{id:'outputFormat',type:'select',options:['Texto','Markdown','Tabla','JSON','HTML']}] },
  { id: 'scientific-illustration', category: 'visual', icon: '🔬', fields: [{id:'level',type:'select',options:['Infantil','Primaria','ESO','Bachillerato','FP','Universidad']},{id:'subject',type:'text'},{id:'topic',type:'text'},{id:'visualStyle',type:'select',options:['Diagrama técnico 2D','Ilustración de libro de texto','Fotorrealista','Acuarela científica','Infografía plana']},{id:'includeLabels',type:'select',options:['Sin texto','Con etiquetas básicas']},{id:'aspectRatio',type:'select',options:['16:9 horizontal','9:16 vertical','1:1 cuadrado']},{id:'outputFormat',type:'select',options:['Texto','Markdown','PDF']}] },
  { id: 'infographic', category: 'visual', icon: '🧩', fields: [{id:'level',type:'select',options:['Infantil','Primaria','ESO','Bachillerato','FP','Universidad']},{id:'subject',type:'text'},{id:'topic',type:'text'},{id:'sections',type:'textarea'},{id:'visualStyle',type:'select',options:['Maqueta artesanal','Infografía plana','Isométrica','Cómic educativo']},{id:'aspectRatio',type:'select',options:['16:9 horizontal','9:16 vertical','1:1 cuadrado']},{id:'outputFormat',type:'select',options:['Texto','Markdown','PDF']}] },
  { id: 'mind-map', category: 'visual', icon: '🧠', fields: [{id:'level',type:'select',options:['Infantil','Primaria','ESO','Bachillerato','FP','Universidad']},{id:'subject',type:'text'},{id:'topic',type:'text'},{id:'objectives',type:'textarea'},{id:'branches',type:'textarea'},{id:'outputFormat',type:'select',options:['Markdown','Mermaid','Texto','PDF']}] },
  { id: 'udl-review', category: 'adaptation', icon: '◐', fields: [{id:'level',type:'select',options:['Infantil','Primaria','ESO','Bachillerato','FP']},{id:'subject',type:'text'},{id:'sourceText',type:'textarea'},{id:'objectives',type:'textarea'},{id:'outputFormat',type:'select',options:['Texto','Markdown','Tabla']}] },
  { id: 'udl-matrix', category: 'planning', icon: '▦', fields: [{id:'level',type:'select',options:['Infantil','Primaria','ESO','Bachillerato','FP']},{id:'course',type:'text'},{id:'subject',type:'text'},{id:'topic',type:'text'},{id:'objectives',type:'textarea'},{id:'duration',type:'select',options:['Una sesión','Varias sesiones','Una semana','Varias semanas']},{id:'outputFormat',type:'select',options:['Tabla','Markdown','Texto']}] },
  { id: 'student-tutor', category: 'content', icon: '💬', fields: [{id:'level',type:'select',options:['Primaria','ESO','Bachillerato','FP','Universidad']},{id:'subject',type:'text'},{id:'topic',type:'text'},{id:'task',type:'textarea'},{id:'outputFormat',type:'select',options:['Texto','Markdown']}] },
  { id: 'analogies', category: 'content', icon: '↔', fields: [{id:'level',type:'select',options:['Primaria','ESO','Bachillerato','FP','Universidad']},{id:'subject',type:'text'},{id:'topic',type:'text'},{id:'task',type:'textarea'},{id:'outputFormat',type:'select',options:['Texto','Markdown','Lista']}] },
  { id: 'participation', category: 'activities', icon: '◉', fields: [{id:'level',type:'select',options:['Infantil','Primaria','ESO','Bachillerato','FP']},{id:'subject',type:'text'},{id:'topic',type:'text'},{id:'context',type:'textarea'},{id:'duration',type:'select',options:['15 minutos','30 minutos','45 minutos','55 minutos','Una sesión']},{id:'outputFormat',type:'select',options:['Texto','Markdown','Lista']}] },
  { id: 'conflict-mediation', category: 'communication', icon: '🤝', fields: [{id:'level',type:'select',options:['Infantil','Primaria','ESO','Bachillerato','FP']},{id:'context',type:'textarea'},{id:'task',type:'textarea'},{id:'constraints',type:'textarea'},{id:'outputFormat',type:'select',options:['Texto','Markdown','Lista']}] },
  { id: 'multiple-choice', category: 'assessment', icon: '☷', fields: [{id:'level',type:'select',options:['Primaria','ESO','Bachillerato','FP']},{id:'subject',type:'text'},{id:'topic',type:'text'},{id:'objectives',type:'textarea'},{id:'task',type:'textarea'},{id:'outputFormat',type:'select',options:['Markdown','Tabla','Texto']}] },
  { id: 'ethical-dilemma', category: 'activities', icon: '⚖', fields: [{id:'level',type:'select',options:['Primaria','ESO','Bachillerato','FP']},{id:'subject',type:'text'},{id:'topic',type:'text'},{id:'objectives',type:'textarea'},{id:'outputFormat',type:'select',options:['Texto','Markdown','Lista']}] },
  { id: 'study-plan', category: 'planning', icon: '▦', fields: [{id:'level',type:'select',options:['ESO','Bachillerato','FP','Universidad']},{id:'subject',type:'text'},{id:'topic',type:'text'},{id:'context',type:'textarea'},{id:'duration',type:'select',options:['Una semana','Varias semanas']},{id:'outputFormat',type:'select',options:['Tabla','Markdown','Texto']}] },
  { id: 'historical-interview', category: 'content', icon: '◷', fields: [{id:'level',type:'select',options:['Primaria','ESO','Bachillerato','FP']},{id:'subject',type:'text'},{id:'topic',type:'text'},{id:'task',type:'textarea'},{id:'outputFormat',type:'select',options:['Texto','Markdown']}] },
  { id: 'code-coach', category: 'digital', icon: '⌘', fields: [{id:'level',type:'select',options:['Primaria','ESO','Bachillerato','FP','Universidad']},{id:'subject',type:'text'},{id:'topic',type:'text'},{id:'sourceText',type:'textarea'},{id:'task',type:'textarea'},{id:'outputFormat',type:'select',options:['Texto','Markdown']}] },
]

// El curso de IA recomienda completar siempre que sea posible el contexto,
// las restricciones y los criterios con los que se revisará el resultado.
// Se añaden a las plantillas que aún no los tenían sin duplicar los campos
// del constructor libre.
const promptingFields: TemplateField[] = [
  {id:'context', type:'textarea'},
  {id:'constraints', type:'textarea'},
  {id:'qualityCriteria', type:'textarea'},
  {id:'refinement', type:'textarea'}
]

// Herramienta de generación de imágenes: solo en las plantillas que producen una
// imagen, porque ahí cambia de verdad cómo debe redactarse el prompt. En las de
// texto no aporta nada y el orden de «Abrir en» ya recuerda la última IA usada.
// El primer valor equivale a no indicar ninguna y el generador lo omite.
export const imageToolTemplates = ['scientific-illustration','infographic']
const aiToolField: TemplateField = {id:'aiTool', type:'select', options:['Sin preferencia','ChatGPT','Gemini','Copilot','Midjourney','Canva']}

// Diseño Universal para el Aprendizaje: los principios de las pautas CAST se
// ofrecen en las plantillas que diseñan propuestas o materiales, y las
// barreras del contexto también en evaluación y adaptación. Se insertan antes
// de los campos de prompting para que queden junto al resto del diseño.
export const udlPrinciples = ['Implicación','Representación','Acción y expresión']
const udlField: TemplateField = {id:'udl', type:'multiselect', options:udlPrinciples}
const barriersField: TemplateField = {id:'barriers', type:'textarea'}
const udlCategories = ['planning','activities','content','digital']
const barrierCategories = [...udlCategories,'assessment','adaptation']

for (const template of templates) {
  if (udlCategories.includes(template.category) && !template.fields.some(existing => existing.id === udlField.id)) {
    template.fields.push({...udlField, options:[...udlPrinciples]})
  }
  if (barrierCategories.includes(template.category) && !template.fields.some(existing => existing.id === barriersField.id)) {
    template.fields.push({...barriersField})
  }
  if (imageToolTemplates.includes(template.id) && !template.fields.some(existing => existing.id === aiToolField.id)) {
    template.fields.unshift({...aiToolField})
  }
  for (const field of promptingFields) {
    if (!template.fields.some(existing => existing.id === field.id)) {
      template.fields.push({...field})
    }
  }
}

// Los formatos documentales se ofrecen en último lugar salvo en las plantillas
// que producen su propio paquete o formato (H5P, SCORM, GIFT, QTI, CC y HTML).
const ownFormatTemplates = ['h5p', 'scorm', 'gift', 'qti', 'common-cartridge', 'html-game']
const documentFormats = ['PDF', 'ODT', 'DOCX']
for (const template of templates) {
  const outputFormat = template.fields.find(field => field.id === 'outputFormat')
  if (!outputFormat) continue
  if (!ownFormatTemplates.includes(template.id) && outputFormat.options) {
    for (const format of documentFormats) if (!outputFormat.options.includes(format)) outputFormat.options.push(format)
  }
  template.fields = template.fields.filter(field => field.id !== 'outputFormat')
  template.fields.push(outputFormat)
}

// Solo mostramos filtros que tienen al menos una herramienta publicada.
// Así el catálogo no ofrece categorías vacías mientras se preparan futuras plantillas.
export const categoryIds = ['all', ...new Set(templates.map(template => template.category))]

// Camps que ajuden a començar sense convertir el formulari inicial en una fitxa tècnica.
// El mode avançat continua mostrant tots els camps de la plantilla.
export const simpleFieldIds: Record<string, string[]> = {
  'learning-situation': ['level', 'course', 'subject', 'topic', 'objectives', 'duration', 'udl', 'outputFormat'],
  lesson: ['level', 'course', 'subject', 'topic', 'objectives', 'duration', 'udl', 'outputFormat'],
  sequence: ['level', 'subject', 'topic', 'objectives', 'duration', 'udl', 'outputFormat'],
  'competency-activity': ['level', 'subject', 'topic', 'objectives', 'udl', 'outputFormat'],
  project: ['level', 'subject', 'topic', 'objectives', 'duration', 'udl', 'outputFormat'],
  challenge: ['level', 'subject', 'topic', 'objectives', 'udl', 'outputFormat'],
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
  scorm: ['level', 'subject', 'topic', 'objectives', 'outputFormat'],
  'html-game': ['level', 'subject', 'topic', 'activityType', 'gameItems', 'outputFormat'],
  gift: ['level', 'subject', 'topic', 'objectives', 'outputFormat'],
  qti: ['level', 'subject', 'topic', 'objectives', 'outputFormat'],
  'common-cartridge': ['level', 'subject', 'topic', 'objectives', 'outputFormat'],
  feedback: ['level', 'subject', 'task', 'outputFormat'],
  'three-levels': ['level', 'subject', 'task', 'objectives', 'outputFormat'],
  'easy-reading': ['level', 'subject', 'topic', 'sourceText', 'outputFormat'],
  'bias-check': ['level', 'subject', 'sourceText', 'outputFormat'],
  'glossary-support': ['level', 'subject', 'topic', 'outputFormat'],
  'family-note': ['role', 'task', 'outputFormat'],
  'tutoring-script': ['role', 'task', 'outputFormat'],
  'scientific-illustration': ['level', 'subject', 'topic', 'visualStyle', 'includeLabels', 'outputFormat'],
  infographic: ['level', 'subject', 'topic', 'sections', 'visualStyle', 'outputFormat'],
  'mind-map': ['level', 'subject', 'topic', 'objectives', 'outputFormat'],
  'udl-review': ['level', 'subject', 'sourceText', 'objectives', 'barriers', 'outputFormat'],
  'udl-matrix': ['level', 'subject', 'topic', 'objectives', 'udl', 'barriers', 'outputFormat'],
  'student-tutor': ['level','subject','topic','task','outputFormat'],
  analogies: ['level','subject','topic','task','outputFormat'],
  participation: ['level','subject','topic','duration','outputFormat'],
  'conflict-mediation': ['level','context','task','outputFormat'],
  'multiple-choice': ['level','subject','topic','objectives','task','outputFormat'],
  'ethical-dilemma': ['level','subject','topic','objectives','outputFormat'],
  'study-plan': ['level','subject','topic','context','duration','outputFormat'],
  'historical-interview': ['level','subject','topic','task','outputFormat'],
  'code-coach': ['level','subject','topic','sourceText','task','outputFormat'],
  free: ['role', 'task', 'outputFormat']
}
