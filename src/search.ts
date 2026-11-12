import { translations } from './locales'
import { getTemplateName } from './prompts/form/labels'
import { templates } from './templates'
import type { Language, PromptTemplate } from './types'

const languages: Language[] = ['es', 'ca-valencia', 'ca', 'en']

// Sinónimos y necesidades reales del profesorado que no aparecen en el nombre
// de la plantilla. Se mezclan los cuatro idiomas porque la búsqueda normaliza
// y compara todo el texto, sin importar el idioma activo de la interfaz.
const keywords: Record<string, string[]> = {
  'learning-situation': ['programacion', 'unidad didactica', 'situacion de aprendizaje', 'ud', 'lomloe'],
  lesson: ['sesion', 'clase', 'planificacion diaria', 'plan de clase'],
  sequence: ['secuencia', 'unidades', 'programacion', 'itinerario'],
  'competency-activity': ['competencial', 'competencias clave', 'tarea competencial'],
  project: ['abp', 'pbl', 'proyecto', 'interdisciplinar'],
  challenge: ['reto', 'problema', 'abp', 'pbl'],
  rubric: ['rubrica', 'evaluacion', 'criterios', 'niveles', 'desempeno'],
  checklist: ['lista de cotejo', 'verificacion', 'observacion', 'coteig'],
  'rating-scale': ['escala', 'valoracion', 'estimacion', 'niveles'],
  'systematic-observation': ['observacion', 'registro', 'seguimiento', 'aula'],
  portfolio: ['portafolio', 'carpeta', 'evidencias', 'aprendizaje'],
  production: ['produccion', 'tarea', 'alumnado', 'trabajo'],
  'written-test': ['examen', 'prueba escrita', 'control', 'evaluacion', 'test'],
  product: ['producto final', 'artefacto', 'elaboracion'],
  presentation: ['exposicion', 'presentacion oral', 'hablar en publico', 'oratoria'],
  h5p: ['h5p', 'interactivo', 'aules', 'moodle'],
  scorm: ['scorm', 'paquete', 'aules', 'moodle'],
  'html-game': ['juego', 'videojuego', 'gamificacion', 'html', 'interactivo'],
  gift: ['gift', 'banco de preguntas', 'aules', 'moodle', 'test', 'examen'],
  qti: ['qti', 'preguntas', 'estandar', 'aules'],
  'common-cartridge': ['common cartridge', 'imscc', 'ims', 'paquete', 'cartucho'],
  feedback: ['feedback', 'retroalimentacion', 'comentarios', 'formativas'],
  'three-levels': ['tres niveles', 'multinivel', 'diversidad', 'niveles'],
  'easy-reading': ['lectura facil', 'accesibilidad', 'simplificar', 'adaptar texto'],
  'bias-check': ['sesgos', 'genero', 'diversidad', 'revision critica'],
  'glossary-support': ['glosario', 'vocabulario', 'apoyos visuales', 'definiciones'],
  'family-note': ['familias', 'comunicacion', 'circular', 'nota informativa'],
  'tutoring-script': ['tutoria', 'guion', 'entrevista', 'familias'],
  free: ['constructor libre', 'personalizado', 'a medida', 'libre'],
  'scientific-illustration': ['ilustracion', 'cientifica', 'imagen', 'dibujo', 'esquema visual'],
  infographic: ['infografia', 'cartel', 'poster', 'visual'],
  'mind-map': ['mapa mental', 'esquema', 'mermaid', 'diagrama'],
  'explainer-video': [
    'video',
    'pelicula',
    'animacion',
    'pixel art',
    'acuarela',
    'storyboard',
    'guion',
    'explicativo',
    'documental',
  ],
  'udl-review': ['dua', 'revision', 'accesibilidad', 'actividad'],
  'udl-matrix': ['dua', 'matriz', 'principios', 'planificacion'],
  'student-tutor': ['tutor', 'alumno', 'acompanamiento', 'estudio'],
  analogies: ['analogias', 'metaforas', 'explicar', 'comparaciones'],
  participation: ['participacion', 'equitativa', 'turnos de palabra', 'aula'],
  'conflict-mediation': ['conflicto', 'mediacion', 'convivencia', 'resolucion'],
  'multiple-choice': ['test', 'tipo test', 'cuestionario', 'opcion multiple', 'examen'],
  'ethical-dilemma': ['dilema', 'etico', 'debate', 'valores'],
  'study-plan': ['plan de estudio', 'organizacion', 'habitos', 'estudiar'],
  'historical-interview': ['entrevista', 'personaje historico', 'historia', 'biografia'],
  'code-coach': ['codigo', 'programacion', 'revisar', 'errores', 'depurar'],
}

export function normalizeSearchText(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[·’'`]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
}

const languageText = (language: Language, key: string) => translations[language][key] || ''

export function templateSearchText(template: PromptTemplate): string {
  const names = languages.map((language) => getTemplateName(template.id, translations[language]))
  const categories = languages.map((language) => languageText(language, template.category))
  return normalizeSearchText([...names, ...categories, ...(keywords[template.id] || [])].join(' '))
}

export function searchTemplates(query: string, category = 'all'): PromptTemplate[] {
  const terms = normalizeSearchText(query).split(' ').filter(Boolean)
  return templates.filter((template) => {
    if (category !== 'all' && template.category !== category) return false
    if (terms.length === 0) return true
    const haystack = templateSearchText(template)
    return terms.every((term) => haystack.includes(term))
  })
}
