import type { Language } from './types'
import { ADULT_LEVEL } from './templates'

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
  barriers: {
    es: [
      'Textos largos o con vocabulario complejo',
      'Parte del alumnado aún no domina la lengua vehicular',
      'Dificultades de lectura o escritura',
      'Necesidad de anticipación y rutinas claras',
      'Ritmos de aprendizaje muy diversos',
      'Acceso limitado a dispositivos o conexión en casa'
    ],
    'ca-valencia': [
      'Textos llargs o amb vocabulari complex',
      'Part de l’alumnat encara no domina la llengua vehicular',
      'Dificultats de lectura o escriptura',
      'Necessitat d’anticipació i rutines clares',
      'Ritmes d’aprenentatge molt diversos',
      'Accés limitat a dispositius o connexió a casa'
    ],
    ca: [
      'Textos llargs o amb vocabulari complex',
      'Part de l’alumnat encara no domina la llengua vehicular',
      'Dificultats de lectura o escriptura',
      'Necessitat d’anticipació i rutines clares',
      'Ritmes d’aprenentatge molt diversos',
      'Accés limitat a dispositius o connexió a casa'
    ],
    en: [
      'Long texts or complex vocabulary',
      'Some students are still learning the language of instruction',
      'Reading or writing difficulties',
      'Need for advance notice and clear routines',
      'Very diverse learning paces',
      'Limited access to devices or internet at home'
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
      'Aplicar el que s’ha aprés a un cas real',
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

// Sugerencias propias de un nivel: se muestran antes de las generales cuando
// el nivel elegido coincide. Educación de personas adultas (FPA): contextos
// de la vida adulta, del trabajo y de la administración.
export const levelSuggestions: Record<string, Record<string, Record<Language, string[]>>> = {
  [ADULT_LEVEL]: {
    topic: {
      es: ['Leer una factura de la luz', 'Pedir cita médica por internet', 'Entender una nómina', 'Rellenar un formulario de la administración', 'Buscar empleo y preparar el currículum', 'Preparar la prueba de competencias clave o GES'],
      'ca-valencia': ['Llegir una factura de la llum', 'Demanar cita mèdica per internet', 'Entendre una nòmina', 'Emplenar un formulari de l’administració', 'Buscar faena i preparar el currículum', 'Preparar la prova de competències clau o GES'],
      ca: ['Llegir una factura de la llum', 'Demanar hora al metge per internet', 'Entendre una nòmina', 'Omplir un formulari de l’administració', 'Buscar feina i preparar el currículum', 'Preparar la prova de competències clau o GES'],
      en: ['Reading an electricity bill', 'Booking a doctor’s appointment online', 'Understanding a payslip', 'Filling in a public administration form', 'Job hunting and writing a CV', 'Preparing for the key competences or adult secondary exam']
    },
    context: {
      es: ['Grupo adulto heterogéneo en un centro de FPA', 'Buena parte del alumnado entra en Aules desde el móvil', 'Alumnado de otras lenguas que aprende castellano y valenciano', 'Alumnado que compagina el curso con trabajo y familia', 'Niveles de lectura y escritura muy diversos'],
      'ca-valencia': ['Grup adult heterogeni en un centre de FPA', 'Bona part de l’alumnat entra a Aules des del mòbil', 'Alumnat d’altres llengües que aprén valencià i castellà', 'Alumnat que compagina el curs amb faena i família', 'Nivells de lectura i escriptura molt diversos'],
      ca: ['Grup adult heterogeni en un centre de formació de persones adultes', 'Bona part de l’alumnat entra a l’aula virtual des del mòbil', 'Alumnat d’altres llengües que aprèn català i castellà', 'Alumnat que compagina el curs amb feina i família', 'Nivells de lectura i escriptura molt diversos'],
      en: ['Mixed-ability adult group in an adult education centre', 'Many learners access the virtual classroom from their phone', 'Learners with other home languages learning the local languages', 'Learners balancing the course with work and family', 'Very diverse reading and writing levels']
    },
    barriers: {
      es: ['Poca alfabetización digital', 'Poco tiempo de estudio fuera del aula', 'Dificultades con la lengua de instrucción', 'Inseguridad tras años sin estudiar', 'Asistencia irregular por motivos laborales'],
      'ca-valencia': ['Poca alfabetització digital', 'Poc temps d’estudi fora de l’aula', 'Dificultats amb la llengua d’instrucció', 'Inseguretat després d’anys sense estudiar', 'Assistència irregular per motius laborals'],
      ca: ['Poca alfabetització digital', 'Poc temps d’estudi fora de l’aula', 'Dificultats amb la llengua d’instrucció', 'Inseguretat després d’anys sense estudiar', 'Assistència irregular per motius laborals'],
      en: ['Low digital literacy', 'Little study time outside class', 'Difficulties with the language of instruction', 'Low confidence after years out of education', 'Irregular attendance due to work']
    },
    constraints: {
      es: ['Trato adulto, sin infantilizar', 'Situaciones reales de la vida adulta y del trabajo', 'Que se lea bien en el móvil', 'Frases cortas y vocabulario explicado', 'Cada sesión se entiende por sí sola'],
      'ca-valencia': ['Tracte adult, sense infantilitzar', 'Situacions reals de la vida adulta i de la faena', 'Que es llija bé en el mòbil', 'Frases curtes i vocabulari explicat', 'Cada sessió s’entén per si mateixa'],
      ca: ['Tracte adult, sense infantilitzar', 'Situacions reals de la vida adulta i de la feina', 'Que es llegeixi bé al mòbil', 'Frases curtes i vocabulari explicat', 'Cada sessió s’entén per si mateixa'],
      en: ['Adult tone, never talking down', 'Real situations from adult life and work', 'Easy to read on a phone', 'Short sentences and explained vocabulary', 'Each session stands on its own']
    },
    objectives: {
      es: ['Resolver una gestión real de forma autónoma', 'Comprender un documento de la vida cotidiana', 'Prepararse para la prueba de acceso o de graduado', 'Ganar confianza con el móvil y Aules'],
      'ca-valencia': ['Resoldre una gestió real de manera autònoma', 'Comprendre un document de la vida quotidiana', 'Preparar-se per a la prova d’accés o de graduat', 'Guanyar confiança amb el mòbil i Aules'],
      ca: ['Resoldre una gestió real de manera autònoma', 'Comprendre un document de la vida quotidiana', 'Preparar-se per a la prova d’accés o de graduat', 'Guanyar confiança amb el mòbil i l’aula virtual'],
      en: ['Handle a real-life task independently', 'Understand an everyday document', 'Prepare for an access or adult graduation exam', 'Gain confidence with the phone and the virtual classroom']
    }
  }
}

// Sugerencias de un campo para el nivel elegido: primero las del nivel.
export const suggestionsFor = (fieldId: string, language: Language, level = ''): string[] =>
  [...(levelSuggestions[level]?.[fieldId]?.[language] || []), ...(fieldSuggestions[fieldId]?.[language] || [])]
