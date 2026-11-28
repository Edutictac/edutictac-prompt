import type { Example } from '../examples'

export const examples1: Record<string, Example> = {
  'learning-situation': {
    options: { level: 'Primaria', duration: 'Varias sesiones', methodology: 'Aprendizaje cooperativo · Investigación' },
    es: {
      course: '5.º',
      subject: 'Ciencias de la Naturaleza',
      topic: 'El ciclo del agua en nuestro municipio',
      objectives: 'Explicar las fases del ciclo del agua y proponer medidas para ahorrar agua en el centro.',
    },
    va: {
      course: '5é',
      subject: 'Ciències de la Naturalesa',
      topic: 'El cicle de l’aigua al nostre municipi',
      objectives: 'Explicar les fases del cicle de l’aigua i proposar mesures per a estalviar aigua al centre.',
    },
    en: {
      course: 'Year 5',
      subject: 'Natural Science',
      topic: 'The water cycle in our town',
      objectives: 'Explain the stages of the water cycle and suggest ways to save water at school.',
    },
  },
  lesson: {
    options: { level: 'ESO', duration: '55 minutos', resources: 'Proyector · Ordenadores' },
    es: {
      course: '2.º',
      subject: 'Matemáticas',
      topic: 'Proporcionalidad directa',
      objectives: 'Reconocer magnitudes directamente proporcionales y resolver problemas con la regla de tres.',
    },
    va: {
      course: '2n',
      subject: 'Matemàtiques',
      topic: 'Proporcionalitat directa',
      objectives: 'Reconéixer magnituds directament proporcionals i resoldre problemes amb la regla de tres.',
    },
    ca: { objectives: 'Reconèixer magnituds directament proporcionals i resoldre problemes amb la regla de tres.' },
    en: {
      course: 'Year 8',
      subject: 'Mathematics',
      topic: 'Direct proportion',
      objectives: 'Identify directly proportional quantities and solve problems using the unitary method.',
    },
  },
  sequence: {
    options: { level: 'Primaria', duration: 'Varias semanas', methodology: 'ABP · Cooperativo' },
    es: {
      subject: 'Lengua Castellana',
      topic: 'El texto descriptivo',
      objectives: 'Leer, planificar y escribir descripciones de lugares del barrio.',
    },
    va: {
      subject: 'Valencià: Llengua i Literatura',
      topic: 'El text descriptiu',
      objectives: 'Llegir, planificar i escriure descripcions de llocs del barri.',
    },
    en: {
      subject: 'English Language',
      topic: 'Descriptive writing',
      objectives: 'Read, plan and write descriptions of places in the neighbourhood.',
    },
  },
  'competency-activity': {
    options: { level: 'ESO', methodology: 'Cooperativo · Retos', resources: 'Ordenadores' },
    es: {
      subject: 'Geografía e Historia',
      topic: 'El turismo y su impacto en la costa',
      objectives: 'Analizar datos sobre turismo y proponer mejoras para un turismo sostenible.',
    },
    va: {
      subject: 'Geografia i Història',
      topic: 'El turisme i el seu impacte a la costa',
      objectives: 'Analitzar dades sobre turisme i proposar millores per a un turisme sostenible.',
    },
    en: {
      subject: 'Geography and History',
      topic: 'Tourism and its impact on the coast',
      objectives: 'Analyse tourism data and propose improvements for sustainable tourism.',
    },
  },
  project: {
    options: { level: 'Primaria', duration: 'Varias semanas', resources: 'Material manipulativo · Ordenadores' },
    es: {
      subject: 'Ciencias de la Naturaleza',
      topic: 'Un huerto escolar',
      objectives: 'Planificar, cultivar y documentar un huerto, relacionando las plantas con su entorno.',
    },
    va: {
      subject: 'Ciències de la Naturalesa',
      topic: 'Un hort escolar',
      objectives: 'Planificar, cultivar i documentar un hort, relacionant les plantes amb el seu entorn.',
    },
    en: {
      subject: 'Natural Science',
      topic: 'A school garden',
      objectives: 'Plan, grow and document a garden, linking plants to their environment.',
    },
  },
  challenge: {
    options: { level: 'ESO', methodology: 'Aprendizaje basado en problemas · Pensamiento crítico' },
    es: {
      subject: 'Tecnología',
      topic: 'Reducir el ruido en el comedor',
      objectives: 'Medir el ruido, identificar sus causas y diseñar una solución viable.',
    },
    va: {
      subject: 'Tecnologia',
      topic: 'Reduir el soroll al menjador',
      objectives: 'Mesurar el soroll, identificar-ne les causes i dissenyar una solució viable.',
    },
    en: {
      subject: 'Technology',
      topic: 'Reducing noise in the dining hall',
      objectives: 'Measure noise, identify its causes and design a workable solution.',
    },
  },
  rubric: {
    options: { level: 'ESO', levels: '4' },
    es: {
      subject: 'Lengua Castellana',
      activity: 'Una exposición oral sobre un libro leído',
      criteria: 'Contenido, organización, expresión oral, uso del tiempo',
    },
    va: {
      subject: 'Valencià: Llengua i Literatura',
      activity: 'Una exposició oral sobre un llibre llegit',
      criteria: 'Contingut, organització, expressió oral, ús del temps',
    },
    en: {
      subject: 'English Language',
      activity: 'An oral presentation about a book',
      criteria: 'Content, organisation, speaking, use of time',
    },
  },
  checklist: {
    options: { level: 'Primaria' },
    es: {
      subject: 'Ciencias de la Naturaleza',
      activity: 'Un experimento sobre la germinación',
      criteria: 'Sigue los pasos, anota observaciones, dibuja resultados, recoge el material',
    },
    va: {
      subject: 'Ciències de la Naturalesa',
      activity: 'Un experiment sobre la germinació',
      criteria: 'Seguix els passos, anota observacions, dibuixa resultats, recull el material',
    },
    ca: { criteria: 'Segueix els passos, anota observacions, dibuixa resultats, recull el material' },
    en: {
      subject: 'Natural Science',
      activity: 'A germination experiment',
      criteria: 'Follows the steps, records observations, draws results, tidies up',
    },
  },
  'rating-scale': {
    options: { level: 'ESO', levels: '4' },
    es: {
      subject: 'Educación Física',
      activity: 'Una coreografía en grupo',
      criteria: 'Coordinación, ritmo, creatividad, trabajo en equipo',
    },
    va: {
      subject: 'Educació Física',
      activity: 'Una coreografia en grup',
      criteria: 'Coordinació, ritme, creativitat, treball en equip',
    },
    en: {
      subject: 'Physical Education',
      activity: 'A group dance routine',
      criteria: 'Coordination, rhythm, creativity, teamwork',
    },
  },
  'systematic-observation': {
    options: { level: 'Infantil' },
    es: {
      subject: 'Comunicación y representación de la realidad',
      activity: 'El juego en los rincones',
      context: 'Grupo de 5 años, cuatro rincones, sesiones de 45 minutos.',
      criteria: 'Respeta turnos, comparte material, expresa lo que hace, termina la tarea',
    },
    va: {
      subject: 'Comunicació i representació de la realitat',
      activity: 'El joc als racons',
      context: 'Grup de 5 anys, quatre racons, sessions de 45 minuts.',
      criteria: 'Respecta els torns, compartix material, expressa el que fa, acaba la tasca',
    },
    ca: { criteria: 'Respecta els torns, comparteix material, expressa el que fa, acaba la tasca' },
    en: {
      subject: 'Communication and representation',
      activity: 'Play in learning corners',
      context: 'Group of 5-year-olds, four corners, 45-minute sessions.',
      criteria: 'Takes turns, shares materials, explains what they are doing, finishes the task',
    },
  },
  portfolio: {
    options: { level: 'Bachillerato' },
    es: {
      subject: 'Filosofía',
      activity: 'Un trimestre de debates y ensayos breves',
      criteria: 'Argumentación, uso de fuentes, reflexión sobre el propio progreso',
    },
    va: {
      subject: 'Filosofia',
      activity: 'Un trimestre de debats i assajos breus',
      criteria: 'Argumentació, ús de fonts, reflexió sobre el progrés propi',
    },
    en: {
      subject: 'Philosophy',
      activity: 'A term of debates and short essays',
      criteria: 'Argument, use of sources, reflection on own progress',
    },
  },
  production: {
    options: { level: 'Primaria' },
    es: {
      subject: 'Lengua Castellana',
      activity: 'Un cuento escrito por parejas',
      criteria: 'Estructura, vocabulario, ortografía, creatividad',
    },
    va: {
      subject: 'Valencià: Llengua i Literatura',
      activity: 'Un conte escrit per parelles',
      criteria: 'Estructura, vocabulari, ortografia, creativitat',
    },
    en: {
      subject: 'English Language',
      activity: 'A story written in pairs',
      criteria: 'Structure, vocabulary, spelling, creativity',
    },
  },
  'written-test': {
    options: { level: 'ESO', levels: '10' },
    es: {
      subject: 'Física y Química',
      activity: 'Los cambios de estado de la materia',
      criteria: 'Definir conceptos, interpretar gráficas, resolver un problema',
    },
    va: {
      subject: 'Física i Química',
      activity: 'Els canvis d’estat de la matèria',
      criteria: 'Definir conceptes, interpretar gràfiques, resoldre un problema',
    },
    en: {
      subject: 'Physics and Chemistry',
      activity: 'Changes of state of matter',
      criteria: 'Define concepts, interpret graphs, solve a problem',
    },
  },
  product: {
    options: { level: 'FP' },
    es: {
      subject: 'Sistemas Microinformáticos',
      activity: 'Montaje y configuración de un ordenador',
      context: 'Trabajo por parejas en el taller durante dos semanas.',
      criteria: 'Funcionamiento, seguridad, documentación, orden',
    },
    va: {
      subject: 'Sistemes Microinformàtics',
      activity: 'Muntatge i configuració d’un ordinador',
      context: 'Treball per parelles al taller durant dues setmanes.',
      criteria: 'Funcionament, seguretat, documentació, ordre',
    },
    en: {
      subject: 'Computer Systems',
      activity: 'Building and setting up a computer',
      context: 'Pair work in the workshop over two weeks.',
      criteria: 'Works correctly, safety, documentation, tidiness',
    },
  },
  presentation: {
    options: { level: 'ESO', duration: '5 minutos' },
    es: {
      subject: 'Biología y Geología',
      activity: 'Un animal en peligro de extinción',
      criteria: 'Contenido, claridad, apoyo visual, respuesta a preguntas',
    },
    va: {
      subject: 'Biologia i Geologia',
      activity: 'Un animal en perill d’extinció',
      criteria: 'Contingut, claredat, suport visual, resposta a preguntes',
    },
    en: {
      subject: 'Biology and Geology',
      activity: 'An endangered animal',
      criteria: 'Content, clarity, visual support, answering questions',
    },
  },
}
