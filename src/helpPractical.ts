import type { Language } from './types'
import type { HelpSection } from './help'

export const practicalHelp: Record<
  Language,
  {
    heading: string
    intro: string
    actions: { label: string; description: string; templateId: string }[]
    editor: HelpSection
  }
> = {
  es: {
    heading: '¿Qué necesitas preparar?',
    intro: 'Elige una tarea para abrir la herramienta y adaptarla a tu aula.',
    actions: [
      {
        label: 'Empezar con una idea',
        description: 'Convierte una idea en un encargo para la IA.',
        templateId: 'prompt-coach',
      },
      {
        label: 'Preparar una actividad',
        description: 'Crea una ficha de trabajo para tu alumnado.',
        templateId: 'worksheet',
      },
      {
        label: 'Adaptar una actividad',
        description: 'Prepara versiones con distintos apoyos y un objetivo común.',
        templateId: 'three-levels',
      },
      {
        label: 'Evaluar un aprendizaje',
        description: 'Prepara una rúbrica a partir de tus criterios.',
        templateId: 'rubric',
      },
    ],
    editor: {
      id: 'editor-settings',
      title: 'Edita el prompt y ajusta tus preferencias',
      points: [
        [
          'Editor visual:',
          'Modifica títulos, párrafos y listas en la vista previa. Usa «Texto original» si prefieres editar el texto completo; los formatos complejos se mantienen en esa vista.',
        ],
        [
          'Configuración:',
          'Elige el perfil curricular, formato de salida e IA preferida. El formato predeterminado se aplica cuando la herramienta lo admite.',
        ],
        [
          'Al revisar la respuesta:',
          'Comprueba que la actividad es viable, conserva el objetivo y se adapta a tu grupo antes de usarla.',
        ],
      ],
    },
  },
  'ca-valencia': {
    heading: 'Què necessites preparar?',
    intro: 'Tria una tasca per a obrir l’eina i adaptar-la a la teua aula.',
    actions: [
      {
        label: 'Començar amb una idea',
        description: 'Convertix una idea en un encàrrec per a la IA.',
        templateId: 'prompt-coach',
      },
      {
        label: 'Preparar una activitat',
        description: 'Crea una fitxa de treball per al teu alumnat.',
        templateId: 'worksheet',
      },
      {
        label: 'Adaptar una activitat',
        description: 'Prepara versions amb diferents suports i un objectiu comú.',
        templateId: 'three-levels',
      },
      {
        label: 'Avaluar un aprenentatge',
        description: 'Prepara una rúbrica a partir dels teus criteris.',
        templateId: 'rubric',
      },
    ],
    editor: {
      id: 'editor-settings',
      title: 'Edita el prompt i ajusta les preferències',
      points: [
        [
          'Editor visual:',
          'Modifica títols, paràgrafs i llistes en la vista prèvia. Usa «Text original» si preferixes editar el text complet; els formats complexos es mantenen en eixa vista.',
        ],
        [
          'Configuració:',
          'Tria el perfil curricular, el format d’eixida i la IA preferida. El format predeterminat s’aplica quan l’eina l’admet.',
        ],
        [
          'En revisar la resposta:',
          'Comprova que l’activitat és viable, conserva l’objectiu i s’adapta al teu grup abans d’usar-la.',
        ],
      ],
    },
  },
  ca: {
    heading: 'Què necessites preparar?',
    intro: 'Tria una tasca per obrir l’eina i adaptar-la a la teva aula.',
    actions: [
      {
        label: 'Començar amb una idea',
        description: 'Converteix una idea en un encàrrec per a la IA.',
        templateId: 'prompt-coach',
      },
      {
        label: 'Preparar una activitat',
        description: 'Crea una fitxa de treball per al teu alumnat.',
        templateId: 'worksheet',
      },
      {
        label: 'Adaptar una activitat',
        description: 'Prepara versions amb diferents suports i un objectiu comú.',
        templateId: 'three-levels',
      },
      {
        label: 'Avaluar un aprenentatge',
        description: 'Prepara una rúbrica a partir dels teus criteris.',
        templateId: 'rubric',
      },
    ],
    editor: {
      id: 'editor-settings',
      title: 'Edita el prompt i ajusta les preferències',
      points: [
        [
          'Editor visual:',
          'Modifica títols, paràgrafs i llistes a la vista prèvia. Fes servir «Text original» si prefereixes editar el text complet; els formats complexos es mantenen en aquesta vista.',
        ],
        [
          'Configuració:',
          'Tria el perfil curricular, el format de sortida i la IA preferida. El format predeterminat s’aplica quan l’eina l’admet.',
        ],
        [
          'En revisar la resposta:',
          'Comprova que l’activitat és viable, conserva l’objectiu i s’adapta al teu grup abans de fer-la servir.',
        ],
      ],
    },
  },
  en: {
    heading: 'What do you need to prepare?',
    intro: 'Choose a task to open a tool and adapt it to your classroom.',
    actions: [
      { label: 'Start with an idea', description: 'Turn an idea into a request for AI.', templateId: 'prompt-coach' },
      { label: 'Prepare an activity', description: 'Create a worksheet for your learners.', templateId: 'worksheet' },
      {
        label: 'Adapt an activity',
        description: 'Prepare versions with different supports and a shared objective.',
        templateId: 'three-levels',
      },
      { label: 'Assess learning', description: 'Prepare a rubric based on your criteria.', templateId: 'rubric' },
    ],
    editor: {
      id: 'editor-settings',
      title: 'Edit the prompt and adjust your preferences',
      points: [
        [
          'Visual editor:',
          'Edit headings, paragraphs and lists in the preview. Choose “Original text” to edit the full text; complex formatting remains in that view.',
        ],
        [
          'Settings:',
          'Choose a curriculum profile, output format and preferred AI. The default format applies when the tool supports it.',
        ],
        [
          'When reviewing the response:',
          'Check that the activity is feasible, retains the objective and suits your group before using it.',
        ],
      ],
    },
  },
}
