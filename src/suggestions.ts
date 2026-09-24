import type { Language } from './types'

// Sugerencias pulsables para campos de escritura libre: al pulsar una se
// añade al valor del campo, para no tener que redactar desde cero.
export const fieldSuggestions: Record<string, Record<Language, string[]>> = {
  qualityCriteria: {
    es: [
      'Instrucciones claras, observables y adecuadas al nivel',
      'Incluye una adaptación de apoyo',
      'Fomenta la participación de todo el grupo',
      'Usa ejemplos cercanos y diversos',
      'No incluye datos personales'
    ],
    'ca-valencia': [
      'Instruccions clares, observables i adequades al nivell',
      'Inclou una adaptació de suport',
      'Fomenta la participació de tot el grup',
      'Usa exemples propers i diversos',
      'No inclou dades personals'
    ],
    ca: [
      'Instruccions clares, observables i adequades al nivell',
      'Inclou una adaptació de suport',
      'Fomenta la participació de tot el grup',
      'Usa exemples propers i diversos',
      'No inclou dades personals'
    ],
    en: [
      'Clear, observable instructions suited to the level',
      'Includes a support adaptation',
      'Encourages the whole group to take part',
      'Uses close, diverse examples',
      'No personal data'
    ]
  },
  constraints: {
    es: [
      'Una sesión de 45 minutos',
      'Sin dispositivos',
      'Con materiales cotidianos',
      'Sin datos personales',
      'Grupo heterogéneo'
    ],
    'ca-valencia': [
      'Una sessió de 45 minuts',
      'Sense dispositius',
      'Amb materials quotidians',
      'Sense dades personals',
      'Grup heterogeni'
    ],
    ca: [
      'Una sessió de 45 minuts',
      'Sense dispositius',
      'Amb materials quotidians',
      'Sense dades personals',
      'Grup heterogeni'
    ],
    en: [
      'One 45-minute session',
      'No devices',
      'Everyday materials',
      'No personal data',
      'Mixed-ability group'
    ]
  },
  context: {
    es: [
      'Grupo heterogéneo con distintos niveles',
      'Parte del alumnado necesita apoyo lector',
      'Aula con proyector y pizarra digital',
      'Centro con Aules y Microsoft 365'
    ],
    'ca-valencia': [
      'Grup heterogeni amb nivells diversos',
      'Part de l’alumnat necessita suport lector',
      'Aula amb projector i pissarra digital',
      'Centre amb Aules i Microsoft 365'
    ],
    ca: [
      'Grup heterogeni amb nivells diversos',
      'Part de l’alumnat necessita suport lector',
      'Aula amb projector i pissarra digital',
      'Centre amb Aules i Microsoft 365'
    ],
    en: [
      'Mixed-ability group',
      'Some students need reading support',
      'Classroom with projector and interactive whiteboard',
      'School uses Aules and Microsoft 365'
    ]
  },
  objectives: {
    es: [
      'Comprender las ideas clave',
      'Aplicar lo aprendido a un caso real',
      'Trabajar en equipo',
      'Comunicar conclusiones',
      'Desarrollar pensamiento crítico'
    ],
    'ca-valencia': [
      'Comprendre les idees clau',
      'Aplicar el que s’ha après a un cas real',
      'Treballar en equip',
      'Comunicar conclusions',
      'Desenvolupar pensament crític'
    ],
    ca: [
      'Comprendre les idees clau',
      'Aplicar el que s’ha après a un cas real',
      'Treballar en equip',
      'Comunicar conclusions',
      'Desenvolupar pensament crític'
    ],
    en: [
      'Understand the key ideas',
      'Apply learning to a real case',
      'Work as a team',
      'Communicate conclusions',
      'Develop critical thinking'
    ]
  }
}
