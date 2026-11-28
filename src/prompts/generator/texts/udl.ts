import type { Language } from '../../../types'

export type UdlTexts = {
  intro: string
  barriers: string
  review: string
  matrix: string
  matrixFormat: string
  principles: Record<string, string>
  checks: string[]
}
export const udlTexts: Record<Language, UdlTexts> = {
  es: {
    intro:
      'Diseña la propuesta según el Diseño Universal para el Aprendizaje (pautas CAST). Para cada principio, propón opciones concretas para todo el grupo, no solo para alumnado concreto, y explica qué barrera elimina cada una.',
    barriers: 'Anticipa estas barreras en el diseño sin etiquetar ni identificar a nadie.',
    review:
      'Revisa la siguiente actividad desde el Diseño Universal para el Aprendizaje (pautas CAST): identifica las barreras de acceso, participación y aprendizaje y propón mejoras para cada principio (implicación, representación, acción y expresión).',
    matrix: 'Elabora una matriz DUA (pautas CAST) para una situación de aprendizaje sobre',
    matrixFormat:
      'Organiza el resultado en una tabla con una fila por principio y columnas para opciones, recursos y evidencias de aprendizaje.',
    principles: {
      Implicación:
        'Implicación (el porqué): ofrece opciones para despertar el interés, mantener el esfuerzo y favorecer la autorregulación (elección, relevancia, colaboración, feedback frecuente).',
      Representación:
        'Representación (el qué): presenta la información en más de un formato (texto, visual, audio, manipulativo), aclara el vocabulario y los símbolos y activa los conocimientos previos.',
      'Acción y expresión':
        'Acción y expresión (el cómo): ofrece varias formas de responder y demostrar lo aprendido (oral, escrita, visual, digital, manipulativa) y apoyos para planificar y gestionar la tarea.',
    },
    checks: [
      'Mantén el mismo objetivo y nivel de exigencia para todo el grupo.',
      'Comprueba que hay al menos dos formas de acceder al contenido y de demostrar lo aprendido.',
      'Prioriza opciones viables con los recursos indicados, no listas teóricas.',
      'No etiquetes ni incluyas datos personales del alumnado.',
      'Entrega un primer borrador revisable, no lo presentes como definitivo.',
    ],
  },
  'ca-valencia': {
    intro:
      'Dissenya la proposta segons el Disseny Universal per a l’Aprenentatge (pautes CAST). Per a cada principi, proposa opcions concretes per a tot el grup, no sols per a alumnat concret, i explica quina barrera elimina cada una.',
    barriers: 'Anticipa estes barreres en el disseny sense etiquetar ni identificar ningú.',
    review:
      'Revisa l’activitat següent des del Disseny Universal per a l’Aprenentatge (pautes CAST): identifica les barreres d’accés, participació i aprenentatge i proposa millores per a cada principi (implicació, representació, acció i expressió).',
    matrix: 'Elabora una matriu DUA (pautes CAST) per a una situació d’aprenentatge sobre',
    matrixFormat:
      'Organitza el resultat en una taula amb una fila per principi i columnes per a opcions, recursos i evidències d’aprenentatge.',
    principles: {
      Implicación:
        'Implicació (el perquè): oferix opcions per a despertar l’interés, mantindre l’esforç i afavorir l’autoregulació (elecció, rellevància, col·laboració, feedback freqüent).',
      Representación:
        'Representació (el què): presenta la informació en més d’un format (text, visual, àudio, manipulatiu), aclarix el vocabulari i els símbols i activa els coneixements previs.',
      'Acción y expresión':
        'Acció i expressió (el com): oferix diverses maneres de respondre i demostrar el que s’ha aprés (oral, escrita, visual, digital, manipulativa) i suports per a planificar i gestionar la tasca.',
    },
    checks: [
      'Mantín el mateix objectiu i nivell d’exigència per a tot el grup.',
      'Comprova que hi ha almenys dues maneres d’accedir al contingut i de demostrar el que s’ha aprés.',
      'Prioritza opcions viables amb els recursos indicats, no llistes teòriques.',
      'No etiquetes ni inclogues dades personals de l’alumnat.',
      'Entrega un primer esborrany revisable, no el presentes com a definitiu.',
    ],
  },
  ca: {
    intro:
      'Dissenya la proposta segons el Disseny Universal per a l’Aprenentatge (pautes CAST). Per a cada principi, proposa opcions concretes per a tot el grup, no només per a alumnes concrets, i explica quina barrera elimina cadascuna.',
    barriers: 'Anticipa aquestes barreres en el disseny sense etiquetar ni identificar ningú.',
    review:
      'Revisa l’activitat següent des del Disseny Universal per a l’Aprenentatge (pautes CAST): identifica les barreres d’accés, participació i aprenentatge i proposa millores per a cada principi (implicació, representació, acció i expressió).',
    matrix: 'Elabora una matriu DUA (pautes CAST) per a una situació d’aprenentatge sobre',
    matrixFormat:
      'Organitza el resultat en una taula amb una fila per principi i columnes per a opcions, recursos i evidències d’aprenentatge.',
    principles: {
      Implicación:
        'Implicació (el perquè): ofereix opcions per despertar l’interès, mantenir l’esforç i afavorir l’autoregulació (elecció, rellevància, col·laboració, feedback freqüent).',
      Representación:
        'Representació (el què): presenta la informació en més d’un format (text, visual, àudio, manipulatiu), aclareix el vocabulari i els símbols i activa els coneixements previs.',
      'Acción y expresión':
        'Acció i expressió (el com): ofereix diverses maneres de respondre i demostrar el que s’ha après (oral, escrita, visual, digital, manipulativa) i suports per planificar i gestionar la tasca.',
    },
    checks: [
      'Mantén el mateix objectiu i nivell d’exigència per a tot el grup.',
      'Comprova que hi ha almenys dues maneres d’accedir al contingut i de demostrar el que s’ha après.',
      'Prioritza opcions viables amb els recursos indicats, no llistes teòriques.',
      'No etiquetis ni incloguis dades personals de l’alumnat.',
      'Ofereix un primer esborrany revisable, no el presentis com a definitiu.',
    ],
  },
  en: {
    intro:
      'Design the proposal following Universal Design for Learning (CAST guidelines). For each principle, propose concrete options for the whole group, not just for particular learners, and explain which barrier each one removes.',
    barriers: 'Anticipate these barriers in the design without labelling or identifying anyone.',
    review:
      'Review the following activity through Universal Design for Learning (CAST guidelines): identify barriers to access, participation and learning and propose improvements for each principle (engagement, representation, action and expression).',
    matrix: 'Build a UDL matrix (CAST guidelines) for a learning situation about',
    matrixFormat:
      'Organise the result as a table with one row per principle and columns for options, resources and evidence of learning.',
    principles: {
      Implicación:
        'Engagement (the why): offer options to spark interest, sustain effort and support self-regulation (choice, relevance, collaboration, frequent feedback).',
      Representación:
        'Representation (the what): present information in more than one format (text, visual, audio, hands-on), clarify vocabulary and symbols and activate prior knowledge.',
      'Acción y expresión':
        'Action and expression (the how): offer several ways to respond and show what has been learned (oral, written, visual, digital, hands-on) and supports to plan and manage the task.',
    },
    checks: [
      'Keep the same objective and level of demand for the whole group.',
      'Check there are at least two ways to access the content and to show what has been learned.',
      'Prioritise options that are feasible with the stated resources, not theoretical lists.',
      'Do not label learners or include their personal data.',
      'Deliver a reviewable first draft; do not present it as definitive.',
    ],
  },
}
// Juego HTML interactivo: un único archivo autocontenido que funciona sin
// conexión. Las funciones opcionales se indexan por el valor original de la
// opción (en castellano), igual que los principios DUA.
