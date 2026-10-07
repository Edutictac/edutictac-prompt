import type { Language, PromptTemplate } from './types'
import { localizeOption } from './optionLocales'

type LabelKey = 'role'|'context'|'task'|'objectives'|'methodology'|'duration'|'resources'|'requirements'|'format'|'criteria'|'qualityCriteria'|'constraints'|'levels'|'activityType'|'specificCompetences'|'assessmentCriteria'|'basicKnowledge'|'sourceText'|'aiTool'|'refinement'|'udl'|'barriers'
type DefaultText = 'role'|'education'|'stage'|'design'|'rubric'|'checklist'|'h5p'|'interactive'|'topic'|'draft'|'clear'|'viable'|'verify'|'invent'|'structured'|'easyReading'|'biasCheck'|'glossary'|'roleComm'|'feedback'|'familyNote'|'tutoringScript'|'threeLevels'|'scorm'|'gift'|'qti'|'commonCartridge'|'workingWith'|'illustration'|'infographic'|'mindMap'
const labels: Record<Language, Record<LabelKey,string>> = {
  es:{udl:'Diseño Universal para el Aprendizaje (DUA)',barriers:'Barreras del contexto',role:'Rol',context:'Contexto',task:'Objetivo y tarea',objectives:'Objetivos',methodology:'Metodología',duration:'Duración',resources:'Recursos disponibles',requirements:'Revisión docente',format:'Formato de salida',aiTool:'Herramienta de imagen',refinement:'Refinamiento y ajustes',criteria:'Criterios',qualityCriteria:'Criterios de calidad',constraints:'Restricciones y límites',levels:'Niveles de desempeño',activityType:'Tipo de actividad',specificCompetences:'Competencias específicas',assessmentCriteria:'Criterios de evaluación',basicKnowledge:'Saberes básicos',sourceText:'Texto de partida'},
  'ca-valencia':{udl:'Disseny Universal per a l’Aprenentatge (DUA)',barriers:'Barreres del context',role:'Rol',context:'Context',task:'Objectiu i tasca',objectives:'Objectius',methodology:'Metodologia',duration:'Duració',resources:'Recursos disponibles',requirements:'Revisió docent',format:'Format d’eixida',aiTool:'Ferramenta d’imatge',refinement:'Refinament i ajustos',criteria:'Criteris',qualityCriteria:'Criteris de qualitat',constraints:'Restriccions i límits',levels:'Nivells de rendiment',activityType:'Tipus d’activitat',specificCompetences:'Competències específiques',assessmentCriteria:'Criteris d’avaluació',basicKnowledge:'Sabers bàsics',sourceText:'Text de partida'},
  ca:{udl:'Disseny Universal per a l’Aprenentatge (DUA)',barriers:'Barreres del context',role:'Rol',context:'Context',task:'Objectiu i tasca',objectives:'Objectius',methodology:'Metodologia',duration:'Durada',resources:'Recursos disponibles',requirements:'Revisió docent',format:'Format de sortida',aiTool:'Eina d’imatge',refinement:'Refinament i ajustos',criteria:'Criteris',qualityCriteria:'Criteris de qualitat',constraints:'Restriccions i límits',levels:'Nivells de rendiment',activityType:'Tipus d’activitat',specificCompetences:'Competències específiques',assessmentCriteria:'Criteris d’avaluació',basicKnowledge:'Sabers bàsics',sourceText:'Text de partida'},
  en:{udl:'Universal Design for Learning (UDL)',barriers:'Contextual barriers',role:'Role',context:'Context',task:'Objective and task',objectives:'Objectives',methodology:'Methodology',duration:'Duration',resources:'Available resources',requirements:'Teacher review',format:'Output format',aiTool:'Image tool',refinement:'Refinement and tweaks',criteria:'Criteria',qualityCriteria:'Quality criteria',constraints:'Constraints and limits',levels:'Performance levels',activityType:'Activity type',specificCompetences:'Specific competences',assessmentCriteria:'Assessment criteria',basicKnowledge:'Basic knowledge',sourceText:'Source text'}
}
const defaults: Record<Language, Record<DefaultText,string>> = {
  es:{role:'Actúa como docente especialista en',education:'educación y diseño de actividades para alumnado de',stage:'la etapa indicada',design:'Diseña una actividad sobre',rubric:'Crea una rúbrica para evaluar',checklist:'Crea una lista de cotejo para',h5p:'Diseña una actividad H5P de tipo',interactive:'interactivo',topic:'el tema indicado',draft:'Entrega un primer borrador revisable, no lo presentes como definitivo.',illustration:'Genera una ilustración educativa técnicamente precisa sobre',infographic:'Genera una infografía educativa clara sobre',mindMap:'Genera un mapa mental o esquema en Markdown (Mermaid) sobre',clear:'Usa instrucciones claras, observables y adecuadas al nivel.',viable:'Comprueba que la propuesta es viable con el tiempo y los recursos indicados.',verify:'Señala cualquier dato, fuente o supuesto que deba verificar la persona docente.',invent:'No inventes normativa, referencias ni información sobre el alumnado.',structured:'texto estructurado',easyReading:'Adapta a lectura fácil el siguiente texto.',biasCheck:'Revisa posibles sesgos de género, cultura o capacidad en el siguiente texto.',glossary:'Elabora un glosario de términos clave y apoyos visuales sobre',roleComm:'Actúa como tutor/a o miembro del equipo directivo del centro.',feedback:'Redacta un comentario de feedback formativo para el trabajo del alumnado.',familyNote:'Redacta una comunicación breve y clara para las familias.',tutoringScript:'Prepara un guion para una reunión o tutoría con una familia.',threeLevels:'Crea tres versiones (apoyo, base y ampliación) con el mismo objetivo de aprendizaje.',scorm:'Genera los archivos de un paquete SCORM 1.2 compatible con Moodle y Aules (imsmanifest.xml, index.html interactivo, CSS/JS e instrucciones para comprimirlo en un .zip) sobre',gift:'Genera un banco de preguntas en formato GIFT (Moodle/Aules) sobre',qti:'Genera un archivo de preguntas en formato QTI 2.1 (importable en Moodle/Aules) sobre',commonCartridge:'Genera un paquete Common Cartridge (IMS CC en .imscc) con la actividad y sus recursos sobre',workingWith:'Trabajo con alumnado de'},
  'ca-valencia':{role:'Actua com a docent especialista en',education:'educació i disseny d’activitats per a alumnat de',stage:'l’etapa indicada',design:'Dissenya una activitat sobre',rubric:'Crea una rúbrica per a avaluar',checklist:'Crea una llista de verificació per a',h5p:'Dissenya una activitat H5P de tipus',interactive:'interactiu',topic:'el tema indicat',draft:'Entrega un primer esborrany revisable, no el presentes com a definitiu.',illustration:'Genera una il·lustració educativa tècnicament precisa sobre',infographic:'Genera una infografia educativa clara sobre',mindMap:'Genera un mapa mental o esquema en Markdown (Mermaid) sobre',clear:'Usa instruccions clares, observables i adequades al nivell.',viable:'Comprova que la proposta és viable amb el temps i els recursos indicats.',verify:'Assenyala qualsevol dada, font o supòsit que haja de verificar la persona docent.',invent:'No inventes normativa, referències ni informació sobre l’alumnat.',structured:'text estructurat',easyReading:'Adapta a lectura fàcil el text següent.',biasCheck:'Revisa els possibles biaixos de gènere, cultura o capacitat en el text següent.',glossary:'Elabora un glossari de termes clau i suports visuals sobre',roleComm:'Actua com a tutor/a o membre de l’equip directiu del centre.',feedback:'Redacta un comentari de feedback formatiu per al treball de l’alumnat.',familyNote:'Redacta una comunicació breu i clara per a les famílies.',tutoringScript:'Prepara un guió per a una reunió o tutoria amb una família.',threeLevels:'Crea tres versions (suport, base i ampliació) amb el mateix objectiu d’aprenentatge.',scorm:'Genera els fitxers d’un paquet SCORM 1.2 compatible amb Moodle i Aules (imsmanifest.xml, index.html interactiu, CSS/JS i instruccions per a comprimir-lo en un .zip) sobre',gift:'Genera un banc de preguntes en format GIFT (Moodle/Aules) sobre',qti:'Genera un fitxer de preguntes en format QTI 2.1 (importable en Moodle/Aules) sobre',commonCartridge:'Genera un paquet Common Cartridge (IMS CC en .imscc) amb l’activitat i els seus recursos sobre',workingWith:'Treball amb alumnat de'},
  ca:{role:'Actua com a docent especialista en',education:'educació i disseny d’activitats per a alumnat de',stage:'l’etapa indicada',design:'Dissenya una activitat sobre',rubric:'Crea una rúbrica per avaluar',checklist:'Crea una llista de verificació per a',h5p:'Dissenya una activitat H5P de tipus',interactive:'interactiu',topic:'el tema indicat',draft:'Ofereix un primer esborrany revisable, no el presentis com a definitiu.',illustration:'Genera una il·lustració educativa tècnicament precisa sobre',infographic:'Genera una infografia educativa clara sobre',mindMap:'Genera un mapa mental o esquema en Markdown (Mermaid) sobre',clear:'Utilitza instruccions clares, observables i adequades al nivell.',viable:'Comprova que la proposta és viable amb el temps i els recursos indicats.',verify:'Assenyala qualsevol dada, font o supòsit que hagi de verificar el docent.',invent:'No inventis normativa, referències ni informació sobre l’alumnat.',structured:'text estructurat',easyReading:'Adapta a lectura fàcil el text següent.',biasCheck:'Revisa els possibles biaixos de gènere, cultura o capacitat en el text següent.',glossary:'Elabora un glossari de termes clau i suports visuals sobre',roleComm:'Actua com a tutor/a o membre de l’equip directiu del centre.',feedback:'Redacta un comentari de feedback formatiu per al treball de l’alumnat.',familyNote:'Redacta una comunicació breu i clara per a les famílies.',tutoringScript:'Prepara un guió per a una reunió o tutoria amb una família.',threeLevels:'Crea tres versions (suport, base i ampliació) amb el mateix objectiu d’aprenentatge.',scorm:'Genera els fitxers d’un paquet SCORM 1.2 compatible amb Moodle i Aules (imsmanifest.xml, index.html interactiu, CSS/JS i instruccions per a comprimir-lo en un .zip) sobre',gift:'Genera un banc de preguntes en format GIFT (Moodle/Aules) sobre',qti:'Genera un fitxer de preguntes en format QTI 2.1 (importable en Moodle/Aules) sobre',commonCartridge:'Genera un paquet Common Cartridge (IMS CC en .imscc) amb l’activitat i els seus recursos sobre',workingWith:'Treball amb alumnat de'},
  en:{role:'Act as a teacher specialising in',education:'education and activity design for learners at',stage:'the stated educational stage',design:'Design an activity about',rubric:'Create a rubric to assess',checklist:'Create a checklist for',h5p:'Design an H5P activity of type',interactive:'interactive',topic:'the stated topic',draft:'Deliver a reviewable first draft; do not present it as definitive.',illustration:'Generate a technically accurate educational illustration about',infographic:'Generate a clear educational infographic about',mindMap:'Generate a mind map or diagram in Markdown (Mermaid) about',clear:'Use clear, observable instructions appropriate to the level.',viable:'Check that the proposal is feasible with the stated time and resources.',verify:'Flag any data, source or assumption the teacher should verify.',invent:'Do not invent regulations, references or information about learners.',structured:'structured text',easyReading:'Produce an easy-read version of the following text.',biasCheck:'Review the following text for possible gender, cultural or ability bias.',glossary:'Create a glossary of key terms and visual supports about',roleComm:'Act as a tutor or a member of the school leadership team.',feedback:'Write a formative feedback comment on the student’s work.',familyNote:'Write a short, clear communication for families.',tutoringScript:'Prepare a script for a meeting or tutoring session with a family.',threeLevels:'Create three versions (support, core and extension) with the same learning objective.',scorm:'Generate the files of a SCORM 1.2 package compatible with Moodle and Aules (imsmanifest.xml, interactive index.html, CSS/JS and instructions to zip it) about',gift:'Generate a question bank in GIFT format (Moodle/Aules) about',qti:'Generate a question file in QTI 2.1 format (importable into Moodle/Aules) about',commonCartridge:'Generate a Common Cartridge package (IMS CC, .imscc) with the activity and its resources about',workingWith:'Working with learners in'}
}

type ReviewType = 'generic'|'assessment'|'adaptation'|'communication'
const reviewTypes: Record<string, ReviewType> = {
  rubric:'assessment', checklist:'assessment', 'rating-scale':'assessment',
  'systematic-observation':'assessment', portfolio:'assessment', production:'assessment',
  'written-test':'assessment', product:'assessment', presentation:'assessment', feedback:'assessment',
  'three-levels':'adaptation', 'easy-reading':'adaptation', 'bias-check':'adaptation',
  'family-note':'communication', 'tutoring-script':'communication'
}
const reviews: Record<Language, Record<ReviewType,string[]>> = {
  es: {
    generic: [
      'Entrega un primer borrador revisable, no lo presentes como definitivo.',
      'Usa instrucciones claras, observables y adecuadas al nivel.',
      'Comprueba que la propuesta es viable con el tiempo y los recursos indicados.',
      'Señala cualquier dato, fuente o supuesto que deba verificar la persona docente.',
      'No inventes normativa, referencias ni información sobre el alumnado.'
    ],
    assessment: [
      'Entrega un primer borrador revisable, no lo presentes como definitivo.',
      'Comprueba que los criterios son observables y no ambiguos.',
      'Revisa que los niveles de desempeño estén bien definidos.',
      'Señala cualquier dato, fuente o supuesto que deba verificar la persona docente.',
      'No inventes normativa, referencias ni información sobre el alumnado.'
    ],
    adaptation: [
      'Mantén el mismo objetivo de aprendizaje en todas las versiones.',
      'Adapta el acceso (formato, apoyos), no la exigencia.',
      'Revisa los ejemplos y los roles para no reforzar estereotipos.',
      'No incluyas datos personales del alumnado.',
      'Entrega un primer borrador revisable, no lo presentes como definitivo.'
    ],
    communication: [
      'Usa un lenguaje claro y cercano para las familias.',
      'Revisa la extensión y el tono antes de enviarlo.',
      'No incluyas datos personales del alumnado.',
      'Mantén el criterio institucional del centro.',
      'Entrega un primer borrador revisable, no lo presentes como definitivo.'
    ]
  },
  'ca-valencia': {
    generic: [
      'Oferix un primer esborrany revisable, no el presentes com a definitiu.',
      'Usa instruccions clares, observables i adequades al nivell.',
      'Comprova que la proposta és viable amb el temps i els recursos indicats.',
      'Assenyala qualsevol dada, font o supòsit que haja de verificar la persona docent.',
      'No inventes normativa, referències ni informació sobre l’alumnat.'
    ],
    assessment: [
      'Oferix un primer esborrany revisable, no el presentes com a definitiu.',
      'Comprova que els criteris són observables i no ambigus.',
      'Revisa que els nivells de rendiment estiguen ben definits.',
      'Assenyala qualsevol dada, font o supòsit que haja de verificar la persona docent.',
      'No inventes normativa, referències ni informació sobre l’alumnat.'
    ],
    adaptation: [
      'Mantín el mateix objectiu d’aprenentatge en totes les versions.',
      'Adapta l’accés (format, suports), no l’exigència.',
      'Revisa els exemples i els rols per a no reforçar estereotips.',
      'No inclogues dades personals de l’alumnat.',
      'Oferix un primer esborrany revisable, no el presentes com a definitiu.'
    ],
    communication: [
      'Usa un llenguatge clar i proper per a les famílies.',
      'Revisa l’extensió i el to abans d’enviar-lo.',
      'No inclogues dades personals de l’alumnat.',
      'Mantín el criteri institucional del centre.',
      'Oferix un primer esborrany revisable, no el presentes com a definitiu.'
    ]
  },
  ca: {
    generic: [
      'Ofereix un primer esborrany revisable, no el presentis com a definitiu.',
      'Utilitza instruccions clares, observables i adequades al nivell.',
      'Comprova que la proposta és viable amb el temps i els recursos indicats.',
      'Assenyala qualsevol dada, font o supòsit que hagi de verificar el docent.',
      'No inventis normativa, referències ni informació sobre l’alumnat.'
    ],
    assessment: [
      'Ofereix un primer esborrany revisable, no el presentis com a definitiu.',
      'Comprova que els criteris són observables i no ambigus.',
      'Revisa que els nivells de rendiment estiguin ben definits.',
      'Assenyala qualsevol dada, font o supòsit que hagi de verificar el docent.',
      'No inventis normativa, referències ni informació sobre l’alumnat.'
    ],
    adaptation: [
      'Mantén el mateix objectiu d’aprenentatge en totes les versions.',
      'Adapta l’accés (format, suports), no l’exigència.',
      'Revisa els exemples i els rols per no reforçar estereotips.',
      'No incloguis dades personals de l’alumnat.',
      'Ofereix un primer esborrany revisable, no el presentis com a definitiu.'
    ],
    communication: [
      'Utilitza un llenguatge clar i proper per a les famílies.',
      'Revisa l’extensió i el to abans d’enviar-lo.',
      'No incloguis dades personals de l’alumnat.',
      'Mantén el criteri institucional del centre.',
      'Ofereix un primer esborrany revisable, no el presentis com a definitiu.'
    ]
  },
  en: {
    generic: [
      'Deliver a reviewable first draft; do not present it as definitive.',
      'Use clear, observable instructions appropriate to the level.',
      'Check that the proposal is feasible with the stated time and resources.',
      'Flag any data, source or assumption the teacher should verify.',
      'Do not invent regulations, references or information about learners.'
    ],
    assessment: [
      'Deliver a reviewable first draft; do not present it as definitive.',
      'Check that the criteria are observable and unambiguous.',
      'Review that the performance levels are well defined.',
      'Flag any data, source or assumption the teacher should verify.',
      'Do not invent regulations, references or information about learners.'
    ],
    adaptation: [
      'Keep the same learning objective in all versions.',
      'Adapt access (format, supports), not the level of demand.',
      'Review the examples and roles so as not to reinforce stereotypes.',
      'Do not include students’ personal data.',
      'Deliver a reviewable first draft; do not present it as definitive.'
    ],
    communication: [
      'Use clear, friendly language for families.',
      'Review the length and tone before sending.',
      'Do not include students’ personal data.',
      'Keep the school’s institutional line.',
      'Deliver a reviewable first draft; do not present it as definitive.'
    ]
  }
}

// Textos del Diseño Universal para el Aprendizaje. Los principios se indexan
// por el valor original de la opción (en castellano), igual que se guardan.
type UdlTexts = { intro: string; barriers: string; review: string; matrix: string; matrixFormat: string; principles: Record<string,string>; checks: string[] }
const udlTexts: Record<Language, UdlTexts> = {
  es: {
    intro: 'Diseña la propuesta según el Diseño Universal para el Aprendizaje (pautas CAST). Para cada principio, propón opciones concretas para todo el grupo, no solo para alumnado concreto, y explica qué barrera elimina cada una.',
    barriers: 'Anticipa estas barreras en el diseño sin etiquetar ni identificar a nadie.',
    review: 'Revisa la siguiente actividad desde el Diseño Universal para el Aprendizaje (pautas CAST): identifica las barreras de acceso, participación y aprendizaje y propón mejoras para cada principio (implicación, representación, acción y expresión).',
    matrix: 'Elabora una matriz DUA (pautas CAST) para una situación de aprendizaje sobre',
    matrixFormat: 'Organiza el resultado en una tabla con una fila por principio y columnas para opciones, recursos y evidencias de aprendizaje.',
    principles: {
      'Implicación': 'Implicación (el porqué): ofrece opciones para despertar el interés, mantener el esfuerzo y favorecer la autorregulación (elección, relevancia, colaboración, feedback frecuente).',
      'Representación': 'Representación (el qué): presenta la información en más de un formato (texto, visual, audio, manipulativo), aclara el vocabulario y los símbolos y activa los conocimientos previos.',
      'Acción y expresión': 'Acción y expresión (el cómo): ofrece varias formas de responder y demostrar lo aprendido (oral, escrita, visual, digital, manipulativa) y apoyos para planificar y gestionar la tarea.'
    },
    checks: [
      'Mantén el mismo objetivo y nivel de exigencia para todo el grupo.',
      'Comprueba que hay al menos dos formas de acceder al contenido y de demostrar lo aprendido.',
      'Prioriza opciones viables con los recursos indicados, no listas teóricas.',
      'No etiquetes ni incluyas datos personales del alumnado.',
      'Entrega un primer borrador revisable, no lo presentes como definitivo.'
    ]
  },
  'ca-valencia': {
    intro: 'Dissenya la proposta segons el Disseny Universal per a l’Aprenentatge (pautes CAST). Per a cada principi, proposa opcions concretes per a tot el grup, no sols per a alumnat concret, i explica quina barrera elimina cada una.',
    barriers: 'Anticipa estes barreres en el disseny sense etiquetar ni identificar ningú.',
    review: 'Revisa l’activitat següent des del Disseny Universal per a l’Aprenentatge (pautes CAST): identifica les barreres d’accés, participació i aprenentatge i proposa millores per a cada principi (implicació, representació, acció i expressió).',
    matrix: 'Elabora una matriu DUA (pautes CAST) per a una situació d’aprenentatge sobre',
    matrixFormat: 'Organitza el resultat en una taula amb una fila per principi i columnes per a opcions, recursos i evidències d’aprenentatge.',
    principles: {
      'Implicación': 'Implicació (el perquè): oferix opcions per a despertar l’interés, mantindre l’esforç i afavorir l’autoregulació (elecció, rellevància, col·laboració, feedback freqüent).',
      'Representación': 'Representació (el què): presenta la informació en més d’un format (text, visual, àudio, manipulatiu), aclarix el vocabulari i els símbols i activa els coneixements previs.',
      'Acción y expresión': 'Acció i expressió (el com): oferix diverses maneres de respondre i demostrar el que s’ha aprés (oral, escrita, visual, digital, manipulativa) i suports per a planificar i gestionar la tasca.'
    },
    checks: [
      'Mantín el mateix objectiu i nivell d’exigència per a tot el grup.',
      'Comprova que hi ha almenys dues maneres d’accedir al contingut i de demostrar el que s’ha aprés.',
      'Prioritza opcions viables amb els recursos indicats, no llistes teòriques.',
      'No etiquetes ni inclogues dades personals de l’alumnat.',
      'Entrega un primer esborrany revisable, no el presentes com a definitiu.'
    ]
  },
  ca: {
    intro: 'Dissenya la proposta segons el Disseny Universal per a l’Aprenentatge (pautes CAST). Per a cada principi, proposa opcions concretes per a tot el grup, no només per a alumnes concrets, i explica quina barrera elimina cadascuna.',
    barriers: 'Anticipa aquestes barreres en el disseny sense etiquetar ni identificar ningú.',
    review: 'Revisa l’activitat següent des del Disseny Universal per a l’Aprenentatge (pautes CAST): identifica les barreres d’accés, participació i aprenentatge i proposa millores per a cada principi (implicació, representació, acció i expressió).',
    matrix: 'Elabora una matriu DUA (pautes CAST) per a una situació d’aprenentatge sobre',
    matrixFormat: 'Organitza el resultat en una taula amb una fila per principi i columnes per a opcions, recursos i evidències d’aprenentatge.',
    principles: {
      'Implicación': 'Implicació (el perquè): ofereix opcions per despertar l’interès, mantenir l’esforç i afavorir l’autoregulació (elecció, rellevància, col·laboració, feedback freqüent).',
      'Representación': 'Representació (el què): presenta la informació en més d’un format (text, visual, àudio, manipulatiu), aclareix el vocabulari i els símbols i activa els coneixements previs.',
      'Acción y expresión': 'Acció i expressió (el com): ofereix diverses maneres de respondre i demostrar el que s’ha après (oral, escrita, visual, digital, manipulativa) i suports per planificar i gestionar la tasca.'
    },
    checks: [
      'Mantén el mateix objectiu i nivell d’exigència per a tot el grup.',
      'Comprova que hi ha almenys dues maneres d’accedir al contingut i de demostrar el que s’ha après.',
      'Prioritza opcions viables amb els recursos indicats, no llistes teòriques.',
      'No etiquetis ni incloguis dades personals de l’alumnat.',
      'Ofereix un primer esborrany revisable, no el presentis com a definitiu.'
    ]
  },
  en: {
    intro: 'Design the proposal following Universal Design for Learning (CAST guidelines). For each principle, propose concrete options for the whole group, not just for particular learners, and explain which barrier each one removes.',
    barriers: 'Anticipate these barriers in the design without labelling or identifying anyone.',
    review: 'Review the following activity through Universal Design for Learning (CAST guidelines): identify barriers to access, participation and learning and propose improvements for each principle (engagement, representation, action and expression).',
    matrix: 'Build a UDL matrix (CAST guidelines) for a learning situation about',
    matrixFormat: 'Organise the result as a table with one row per principle and columns for options, resources and evidence of learning.',
    principles: {
      'Implicación': 'Engagement (the why): offer options to spark interest, sustain effort and support self-regulation (choice, relevance, collaboration, frequent feedback).',
      'Representación': 'Representation (the what): present information in more than one format (text, visual, audio, hands-on), clarify vocabulary and symbols and activate prior knowledge.',
      'Acción y expresión': 'Action and expression (the how): offer several ways to respond and show what has been learned (oral, written, visual, digital, hands-on) and supports to plan and manage the task.'
    },
    checks: [
      'Keep the same objective and level of demand for the whole group.',
      'Check there are at least two ways to access the content and to show what has been learned.',
      'Prioritise options that are feasible with the stated resources, not theoretical lists.',
      'Do not label learners or include their personal data.',
      'Deliver a reviewable first draft; do not present it as definitive.'
    ]
  }
}
// Juego HTML interactivo: un único archivo autocontenido que funciona sin
// conexión. Las funciones opcionales se indexan por el valor original de la
// opción (en castellano), igual que los principios DUA.
type GameTexts = { task: string; mechanic: string; mechanics: string; items: string; itemsNote: string; noItems: string; tech: string; techItems: string[]; features: string; featureTexts: Record<string,string>; checks: string[] }
const gameTexts: Record<Language, GameTexts> = {
  es: {
    task: 'Crea un único archivo HTML autocontenido (HTML, CSS y JavaScript en el mismo fichero) con ejercicios interactivos sobre',
    mechanic: 'Mecánica de juego:',
    mechanics: 'Mecánicas de juego (combínalas o altérnalas entre ejercicios):',
    items: 'Contenido de los ejercicios',
    itemsNote: 'Guarda estos datos en un array de objetos al principio del script, con un comentario que explique cómo añadir o cambiar elementos.',
    noItems: 'Propón 20 elementos adecuados al nivel y guárdalos en un array de objetos al principio del script, con un comentario que explique cómo añadir o cambiar elementos.',
    tech: 'Requisitos técnicos',
    techItems: [
      'Funciona sin conexión al abrir el archivo en un navegador moderno: sin servidor, dependencias externas, CDN ni imágenes externas; los iconos son emojis.',
      'Presenta un ejercicio cada vez, en orden aleatorio, con feedback inmediato (acierto en verde, error en rojo con una animación suave) y la posibilidad de reintentar.',
      'La pantalla del alumnado es limpia, con letra grande, colores vivos con buen contraste y diseño adaptable a móvil, tableta y ordenador.',
      'Se puede usar con teclado, ratón o pantalla táctil, y los controles tienen etiquetas accesibles.',
      'No recoge ni envía datos personales del alumnado.',
      'Usa ventanas modales para confirmar las acciones destructivas y avisos breves para confirmar el resto.',
      'El código está ordenado y comentado en castellano, e incluye un pie de página discreto que indica que es un recurso educativo creado con ayuda de IA.'
    ],
    features: 'Funciones del juego',
    featureTexts: {
      'Niveles y trofeos': 'Niveles y trofeos: cada 10 ejercicios completados se supera un nivel, con una pantalla de celebración (icono animado distinto por nivel, confeti en CSS y galería con los trofeos conseguidos) y una pantalla final al terminar todos los ejercicios.',
      'Ayuda para el alumnado': 'Ayuda para el alumnado: un botón «❓ ¿Cómo se juega?» despliega los pasos del juego con iconos y frases cortas, y se oculta al pulsarlo de nuevo.',
      'Menú docente oculto': 'Menú docente oculto: las opciones de gestión están en un menú lateral (botón ☰ en la esquina superior derecha) para no distraer al alumnado.',
      'Manual docente': 'Manual docente: una ventana modal explica el objetivo, la mecánica de juego, el formato de los datos y la gestión de las sesiones.',
      'Guardar sesión': 'Guardar sesión: guarda el progreso en localStorage y permite descargar y cargar un archivo JSON con la fecha en el nombre para continuar en otro dispositivo. «Nueva partida» solo reinicia el estado en memoria; borrar la sesión guardada es una acción explícita con confirmación.',
      'Cargar contenido CSV': 'Cargar contenido CSV: permite cargar ejercicios nuevos desde un CSV (las líneas con # son comentarios) y descargar un modelo; valida los datos antes de cargarlos, informa de las filas con errores y pide confirmación si hay una partida en curso.'
    },
    checks: [
      'Revisa que las respuestas correctas de los datos sean exactas y señala cualquier duda.',
      'Explica brevemente cómo abrir y probar el archivo en los navegadores y dispositivos del aula.'
    ]
  },
  'ca-valencia': {
    task: 'Crea un únic fitxer HTML autocontingut (HTML, CSS i JavaScript en el mateix fitxer) amb exercicis interactius sobre',
    mechanic: 'Mecànica de joc:',
    mechanics: 'Mecàniques de joc (combina-les o alterna-les entre exercicis):',
    items: 'Contingut dels exercicis',
    itemsNote: 'Guarda estes dades en un array d’objectes al principi de l’script, amb un comentari que explique com afegir o canviar elements.',
    noItems: 'Proposa 20 elements adequats al nivell i guarda’ls en un array d’objectes al principi de l’script, amb un comentari que explique com afegir o canviar elements.',
    tech: 'Requisits tècnics',
    techItems: [
      'Funciona sense connexió en obrir el fitxer en un navegador modern: sense servidor, dependències externes, CDN ni imatges externes; les icones són emojis.',
      'Presenta un exercici cada vegada, en orde aleatori, amb feedback immediat (encert en verd, error en roig amb una animació suau) i la possibilitat de tornar-ho a intentar.',
      'La pantalla de l’alumnat és neta, amb lletra gran, colors vius amb bon contrast i disseny adaptable a mòbil, tauleta i ordinador.',
      'Es pot usar amb teclat, ratolí o pantalla tàctil, i els controls tenen etiquetes accessibles.',
      'No recull ni envia dades personals de l’alumnat.',
      'Usa finestres modals per a confirmar les accions destructives i avisos breus per a confirmar la resta.',
      'El codi està ordenat i comentat en valencià, i inclou un peu de pàgina discret que indica que és un recurs educatiu creat amb ajuda d’IA.'
    ],
    features: 'Funcions del joc',
    featureTexts: {
      'Niveles y trofeos': 'Nivells i trofeus: cada 10 exercicis completats se supera un nivell, amb una pantalla de celebració (icona animada diferent per nivell, confeti en CSS i galeria amb els trofeus aconseguits) i una pantalla final en acabar tots els exercicis.',
      'Ayuda para el alumnado': 'Ajuda per a l’alumnat: un botó «❓ Com es juga?» desplega els passos del joc amb icones i frases curtes, i s’amaga en tornar a prémer-lo.',
      'Menú docente oculto': 'Menú docent amagat: les opcions de gestió estan en un menú lateral (botó ☰ en la cantonada superior dreta) per a no distraure l’alumnat.',
      'Manual docente': 'Manual docent: una finestra modal explica l’objectiu, la mecànica de joc, el format de les dades i la gestió de les sessions.',
      'Guardar sesión': 'Guardar la sessió: guarda el progrés en localStorage i permet descarregar i carregar un fitxer JSON amb la data en el nom per a continuar en un altre dispositiu. «Nova partida» només reinicia l’estat en memòria; esborrar la sessió guardada és una acció explícita amb confirmació.',
      'Cargar contenido CSV': 'Carregar contingut CSV: permet carregar exercicis nous des d’un CSV (les línies amb # són comentaris) i descarregar un model; valida les dades abans de carregar-les, informa de les files amb errors i demana confirmació si hi ha una partida en curs.'
    },
    checks: [
      'Revisa que les respostes correctes de les dades siguen exactes i assenyala qualsevol dubte.',
      'Explica breument com obrir i provar el fitxer en els navegadors i dispositius de l’aula.'
    ]
  },
  ca: {
    task: 'Crea un únic fitxer HTML autocontingut (HTML, CSS i JavaScript en el mateix fitxer) amb exercicis interactius sobre',
    mechanic: 'Mecànica de joc:',
    mechanics: 'Mecàniques de joc (combina-les o alterna-les entre exercicis):',
    items: 'Contingut dels exercicis',
    itemsNote: 'Desa aquestes dades en un array d’objectes al principi de l’script, amb un comentari que expliqui com afegir o canviar elements.',
    noItems: 'Proposa 20 elements adequats al nivell i desa’ls en un array d’objectes al principi de l’script, amb un comentari que expliqui com afegir o canviar elements.',
    tech: 'Requisits tècnics',
    techItems: [
      'Funciona sense connexió en obrir el fitxer en un navegador modern: sense servidor, dependències externes, CDN ni imatges externes; les icones són emojis.',
      'Presenta un exercici cada vegada, en ordre aleatori, amb feedback immediat (encert en verd, error en vermell amb una animació suau) i la possibilitat de tornar-ho a intentar.',
      'La pantalla de l’alumnat és neta, amb lletra gran, colors vius amb bon contrast i disseny adaptable a mòbil, tauleta i ordinador.',
      'Es pot fer servir amb teclat, ratolí o pantalla tàctil, i els controls tenen etiquetes accessibles.',
      'No recull ni envia dades personals de l’alumnat.',
      'Fa servir finestres modals per confirmar les accions destructives i avisos breus per confirmar la resta.',
      'El codi està ordenat i comentat en català, i inclou un peu de pàgina discret que indica que és un recurs educatiu creat amb ajuda d’IA.'
    ],
    features: 'Funcions del joc',
    featureTexts: {
      'Niveles y trofeos': 'Nivells i trofeus: cada 10 exercicis completats se supera un nivell, amb una pantalla de celebració (icona animada diferent per nivell, confeti en CSS i galeria amb els trofeus aconseguits) i una pantalla final en acabar tots els exercicis.',
      'Ayuda para el alumnado': 'Ajuda per a l’alumnat: un botó «❓ Com es juga?» desplega els passos del joc amb icones i frases curtes, i s’amaga en tornar-lo a prémer.',
      'Menú docente oculto': 'Menú docent amagat: les opcions de gestió són en un menú lateral (botó ☰ a la cantonada superior dreta) per no distreure l’alumnat.',
      'Manual docente': 'Manual docent: una finestra modal explica l’objectiu, la mecànica de joc, el format de les dades i la gestió de les sessions.',
      'Guardar sesión': 'Desar la sessió: desa el progrés a localStorage i permet descarregar i carregar un fitxer JSON amb la data al nom per continuar en un altre dispositiu. «Nova partida» només reinicia l’estat en memòria; esborrar la sessió desada és una acció explícita amb confirmació.',
      'Cargar contenido CSV': 'Carregar contingut CSV: permet carregar exercicis nous des d’un CSV (les línies amb # són comentaris) i descarregar un model; valida les dades abans de carregar-les, informa de les files amb errors i demana confirmació si hi ha una partida en curs.'
    },
    checks: [
      'Revisa que les respostes correctes de les dades siguin exactes i assenyala qualsevol dubte.',
      'Explica breument com obrir i provar el fitxer als navegadors i dispositius de l’aula.'
    ]
  },
  en: {
    task: 'Create a single self-contained HTML file (HTML, CSS and JavaScript in the same file) with interactive exercises about',
    mechanic: 'Game mechanic:',
    mechanics: 'Game mechanics (combine them or alternate them across exercises):',
    items: 'Exercise content',
    itemsNote: 'Store this data in an array of objects at the top of the script, with a comment explaining how to add or change items.',
    noItems: 'Propose 20 items suited to the level and store them in an array of objects at the top of the script, with a comment explaining how to add or change items.',
    tech: 'Technical requirements',
    techItems: [
      'Works offline when the file is opened in a modern browser: no server, external dependencies, CDNs or external images; icons are emojis.',
      'Shows one exercise at a time, in random order, with immediate feedback (correct in green, mistakes in red with a gentle animation) and the chance to try again.',
      'The learner screen is clean, with large type, bright colours with good contrast and a layout that adapts to phone, tablet and computer.',
      'It can be used with keyboard, mouse or touch screen, and controls have accessible labels.',
      'It does not collect or send learners’ personal data.',
      'Uses modal dialogs to confirm destructive actions and short notices to confirm the rest.',
      'The code is tidy and commented in English, and it includes a discreet footer stating it is an educational resource created with the help of AI.'
    ],
    features: 'Game features',
    featureTexts: {
      'Niveles y trofeos': 'Levels and trophies: every 10 completed exercises the learner moves up a level, with a celebration screen (a different animated icon per level, CSS confetti and a gallery of trophies earned) and a final screen when all exercises are done.',
      'Ayuda para el alumnado': 'Help for learners: a “❓ How to play” button reveals the game steps with icons and short sentences, and hides them when pressed again.',
      'Menú docente oculto': 'Hidden teacher menu: management options sit in a side menu (☰ button in the top-right corner) so they do not distract learners.',
      'Manual docente': 'Teacher guide: a modal dialog explains the aim, the game mechanic, the data format and session management.',
      'Guardar sesión': 'Save session: progress is saved to localStorage and can be downloaded and loaded as a dated JSON file to continue on another device. “New game” only resets the in-memory state; deleting the saved session is an explicit, confirmed action.',
      'Cargar contenido CSV': 'Load content from CSV: new exercises can be loaded from a CSV (lines starting with # are comments) and a template can be downloaded; data is validated before loading, rows with errors are reported and confirmation is requested if a game is in progress.'
    },
    checks: [
      'Check that the correct answers in the data are accurate and flag any doubts.',
      'Briefly explain how to open and test the file in the classroom browsers and devices.'
    ]
  }
}

// Encargos de los instrumentos de evaluación: se completan con la actividad
// que se evalúa. En la prueba escrita, «levels» es la puntuación máxima.
type AssessmentTexts = { tasks: Record<string,string>; topic: string; maxScore: string }
const assessmentTexts: Record<Language, AssessmentTexts> = {
  es: {
    tasks: {
      'rating-scale': 'Crea una escala de valoración para evaluar',
      'systematic-observation': 'Crea una ficha de observación sistemática, con indicadores observables y un registro por sesión, para',
      portfolio: 'Diseña un portafolio de aprendizaje, con las evidencias que se recogerán, la reflexión del alumnado y los criterios de valoración, para',
      production: 'Crea un instrumento para evaluar la producción del alumnado en',
      'written-test': 'Elabora una prueba escrita, con su clave de corrección y la puntuación de cada pregunta, para evaluar',
      product: 'Crea un instrumento para evaluar el producto final de',
      presentation: 'Crea un instrumento para evaluar la exposición oral de'
    },
    topic: 'Tema',
    maxScore: 'Puntuación máxima'
  },
  'ca-valencia': {
    tasks: {
      'rating-scale': 'Crea una escala de valoració per a avaluar',
      'systematic-observation': 'Crea una fitxa d’observació sistemàtica, amb indicadors observables i un registre per sessió, per a',
      portfolio: 'Dissenya un portafolis d’aprenentatge, amb les evidències que es recolliran, la reflexió de l’alumnat i els criteris de valoració, per a',
      production: 'Crea un instrument per a avaluar la producció de l’alumnat en',
      'written-test': 'Elabora una prova escrita, amb la clau de correcció i la puntuació de cada pregunta, per a avaluar',
      product: 'Crea un instrument per a avaluar el producte final de',
      presentation: 'Crea un instrument per a avaluar l’exposició oral de'
    },
    topic: 'Tema',
    maxScore: 'Puntuació màxima'
  },
  ca: {
    tasks: {
      'rating-scale': 'Crea una escala de valoració per avaluar',
      'systematic-observation': 'Crea una fitxa d’observació sistemàtica, amb indicadors observables i un registre per sessió, per a',
      portfolio: 'Dissenya un portafolis d’aprenentatge, amb les evidències que es recolliran, la reflexió de l’alumnat i els criteris de valoració, per a',
      production: 'Crea un instrument per avaluar la producció de l’alumnat en',
      'written-test': 'Elabora una prova escrita, amb la clau de correcció i la puntuació de cada pregunta, per avaluar',
      product: 'Crea un instrument per avaluar el producte final de',
      presentation: 'Crea un instrument per avaluar l’exposició oral de'
    },
    topic: 'Tema',
    maxScore: 'Puntuació màxima'
  },
  en: {
    tasks: {
      'rating-scale': 'Create a rating scale to assess',
      'systematic-observation': 'Create a systematic observation sheet, with observable indicators and a per-session record, for',
      portfolio: 'Design a learning portfolio, with the evidence to be collected, learner reflection and assessment criteria, for',
      production: 'Create a tool to assess learner work in',
      'written-test': 'Write a test, with an answer key and the marks for each question, to assess',
      product: 'Create a tool to assess the final product of',
      presentation: 'Create a tool to assess the oral presentation of'
    },
    topic: 'Topic',
    maxScore: 'Maximum score'
  }
}

// Etiquetas de los campos propios de las plantillas visuales.
// Indicaciones según la herramienta de imagen. ChatGPT, Gemini y Copilot generan
// la imagen a partir del propio prompt; Midjourney y Canva funcionan mejor con
// una descripción breve en una línea, así que se pide al asistente que la redacte.
// {ratio} se sustituye por la relación de aspecto elegida.
const imageToolTexts: Record<Language, Record<string,string>> = {
  es: {
    ChatGPT: 'Genera directamente la imagen. Si lleva texto, escríbelo exactamente igual que en las etiquetas indicadas y comprueba la ortografía.',
    Gemini: 'Genera directamente la imagen. Mantén las etiquetas cortas y, si alguna sale mal escrita, avísame para corregirla.',
    Copilot: 'Genera directamente la imagen con el creador de imágenes. Mantén las etiquetas cortas y, si alguna sale mal escrita, avísame para corregirla.',
    Midjourney: 'No generes la imagen: escribe un prompt para Midjourney que la genere. Redáctalo en inglés, en una sola línea de menos de 60 palabras, con sujeto, estilo, composición, iluminación y paleta de colores, y termínalo con el parámetro --ar {ratio}. Si la imagen no debe llevar texto, añade --no text. Devuelve solo ese prompt.',
    Canva: 'No generes la imagen: escribe un prompt para la IA de imágenes de Canva que la genere. Redáctalo como un único párrafo breve de menos de 300 caracteres, sin parámetros ni apartados, y sin texto dentro de la imagen: las etiquetas se añadirán después en Canva. Devuelve solo ese prompt.'
  },
  'ca-valencia': {
    ChatGPT: 'Genera directament la imatge. Si porta text, escriu-lo exactament igual que en les etiquetes indicades i comprova l’ortografia.',
    Gemini: 'Genera directament la imatge. Mantín les etiquetes curtes i, si alguna ix mal escrita, avisa’m per a corregir-la.',
    Copilot: 'Genera directament la imatge amb el creador d’imatges. Mantín les etiquetes curtes i, si alguna ix mal escrita, avisa’m per a corregir-la.',
    Midjourney: 'No generes la imatge: escriu un prompt per a Midjourney que la genere. Redacta’l en anglés, en una sola línia de menys de 60 paraules, amb subjecte, estil, composició, il·luminació i paleta de colors, i acaba’l amb el paràmetre --ar {ratio}. Si la imatge no ha de portar text, afig --no text. Torna només eixe prompt.',
    Canva: 'No generes la imatge: escriu un prompt per a la IA d’imatges de Canva que la genere. Redacta’l com un únic paràgraf breu de menys de 300 caràcters, sense paràmetres ni apartats, i sense text dins de la imatge: les etiquetes s’afegiran després en Canva. Torna només eixe prompt.'
  },
  ca: {
    ChatGPT: 'Genera directament la imatge. Si porta text, escriu-lo exactament igual que a les etiquetes indicades i comprova l’ortografia.',
    Gemini: 'Genera directament la imatge. Mantén les etiquetes curtes i, si alguna surt mal escrita, avisa’m per corregir-la.',
    Copilot: 'Genera directament la imatge amb el creador d’imatges. Mantén les etiquetes curtes i, si alguna surt mal escrita, avisa’m per corregir-la.',
    Midjourney: 'No generis la imatge: escriu un prompt per a Midjourney que la generi. Redacta’l en anglès, en una sola línia de menys de 60 paraules, amb subjecte, estil, composició, il·luminació i paleta de colors, i acaba’l amb el paràmetre --ar {ratio}. Si la imatge no ha de portar text, afegeix --no text. Retorna només aquest prompt.',
    Canva: 'No generis la imatge: escriu un prompt per a la IA d’imatges de Canva que la generi. Redacta’l com un únic paràgraf breu de menys de 300 caràcters, sense paràmetres ni apartats, i sense text dins de la imatge: les etiquetes s’afegiran després a Canva. Retorna només aquest prompt.'
  },
  en: {
    ChatGPT: 'Generate the image directly. If it includes text, write it exactly as in the labels given and check the spelling.',
    Gemini: 'Generate the image directly. Keep labels short and, if any come out misspelt, tell me so I can fix them.',
    Copilot: 'Generate the image directly with the image creator. Keep labels short and, if any come out misspelt, tell me so I can fix them.',
    Midjourney: 'Do not generate the image: write a Midjourney prompt that will generate it. Write it in English, on a single line of fewer than 60 words, covering subject, style, composition, lighting and colour palette, and end it with the parameter --ar {ratio}. If the image should have no text, add --no text. Return only that prompt.',
    Canva: 'Do not generate the image: write a prompt for Canva’s AI image generator that will create it. Write it as a single short paragraph of fewer than 300 characters, with no parameters or sections, and no text inside the image: labels will be added afterwards in Canva. Return only that prompt.'
  }
}

const extraLabels: Record<Language, Record<string,string>> = {
  es: {visualStyle:'Estilo visual', includeLabels:'Texto y etiquetas', aspectRatio:'Relación de aspecto', sections:'Apartados a incluir', branches:'Ramas principales'},
  'ca-valencia': {visualStyle:'Estil visual', includeLabels:'Text i etiquetes', aspectRatio:'Relació d’aspecte', sections:'Apartats a incloure', branches:'Branques principals'},
  ca: {visualStyle:'Estil visual', includeLabels:'Text i etiquetes', aspectRatio:'Relació d’aspecte', sections:'Apartats a incloure', branches:'Branques principals'},
  en: {visualStyle:'Visual style', includeLabels:'Text and labels', aspectRatio:'Aspect ratio', sections:'Sections to include', branches:'Main branches'}
}

const udlTemplates = new Set(['udl-review','udl-matrix'])

export function generatePrompt(template: PromptTemplate, values: Record<string,string>, language: Language): string {
  const l=labels[language]
  const d=defaults[language]
  const u=udlTexts[language]
  const g=gameTexts[language]
  const a=assessmentTexts[language]
  const localizedKeys = new Set(['level', 'methodology', 'duration', 'resources', 'outputFormat', 'activityType', 'visualStyle', 'includeLabels', 'aspectRatio'])
  const value=(key:string)=>{const raw=values[key]?.trim()||'';return localizedKeys.has(key)?raw.split(' · ').map(item=>localizeOption(item,language)).join(' · '):raw}
  const mechanics=value('activityType').split(' · ').filter(Boolean)
  const lines:string[]=[]
  const level=[value('level'),value('course')].filter(Boolean).join(' ')
  const catalan = language==='ca' || language==='ca-valencia'
  const commTemplates = new Set(['family-note','tutoring-script','conflict-mediation'])
  const roleDefault = template.id==='student-tutor'
    ? (language==='en'?`Act as a patient, Socratic tutor${value('subject')?` in ${value('subject')}`:''}.`:catalan?`Actua com a tutor/a pacient i socràtic/a${value('subject')?` de ${value('subject')}`:''}.`:`Actúa como tutor/a paciente y socrático/a${value('subject')?` de ${value('subject')}`:''}.`)
    : template.id==='historical-interview'
      ? (language==='en'?`Role-play as the historical figure requested${value('subject')?` in ${value('subject')}`:''}, grounded in verified facts.`:catalan?`Interpreta el personatge històric indicat${value('subject')?` de ${value('subject')}`:''} basant-te en fets verificables.`:`Interpreta al personaje histórico indicado${value('subject')?` de ${value('subject')}`:''} basándote en hechos verificables.`)
      : template.id==='code-coach'
        ? (language==='en'?`Act as a programming teacher${value('subject')?` for ${value('subject')}`:''} who helps the learner debug independently.`:catalan?`Actua com a docent de programació${value('subject')?` de ${value('subject')}`:''} i ajuda l’estudiant a depurar per si mateix.`:`Actúa como docente de programación${value('subject')?` de ${value('subject')}`:''} y ayuda al estudiante a depurar por sí mismo.`)
        : commTemplates.has(template.id) ? d.roleComm : `${d.role} ${value('subject')||d.education} ${level||d.stage}.`
  lines.push(`## ${l.role}\n${value('role')||roleDefault}`)
  if(value('context')||level||value('curriculumContext')) lines.push(`## ${l.context}\n${level?`${d.workingWith} ${level}.`:''}\n${value('curriculumContext')}\n${value('context')}`.trim())
  if(value('curriculumCompetences')) lines.push(`## ${l.specificCompetences}\n${value('curriculumCompetences')}`)
  // Encargo propio de cada plantilla; las que no tienen uno usan la tarea
  // escrita por el docente o el diseño de una actividad sobre el tema.
  const topic=value('topic')||d.topic
  const activity=value('activity')||d.topic
  const taskBuilders: Record<string,()=>string> = {
    ...Object.fromEntries(Object.keys(a.tasks).map(id=>[id,()=>`${a.tasks[id]} ${activity}.`])),
    'rubric': ()=>`${d.rubric} ${activity}.`,
    'checklist': ()=>`${d.checklist} ${activity}.`,
    'h5p': ()=>`${d.h5p} ${value('activityType')||d.interactive} ${language==='en'?'about':'sobre'} ${topic}.`,
    'easy-reading': ()=>`${d.easyReading}${value('topic')?` ${a.topic}: ${value('topic')}.`:''}`,
    'bias-check': ()=>`${d.biasCheck}${value('topic')?` ${a.topic}: ${value('topic')}.`:''}`,
    'glossary-support': ()=>`${d.glossary} ${topic}.`,
    'feedback': ()=>(value('task')||d.feedback),
    'family-note': ()=>(value('task')||d.familyNote),
    'tutoring-script': ()=>(value('task')||d.tutoringScript),
    'three-levels': ()=>(value('task')||d.threeLevels),
    'scorm': ()=>`${d.scorm} ${topic}.`,
    'gift': ()=>`${d.gift} ${topic}.`,
    'qti': ()=>`${d.qti} ${topic}.`,
    'common-cartridge': ()=>`${d.commonCartridge} ${topic}.`,
    'scientific-illustration': ()=>`${d.illustration} ${topic}.`,
    'infographic': ()=>`${d.infographic} ${topic}.`,
    'mind-map': ()=>`${d.mindMap} ${topic}.`,
    'html-game': ()=>`${g.task} ${topic}.${mechanics.length?` ${mechanics.length>1?g.mechanics:g.mechanic} ${mechanics.join(', ')}.`:''}`,
    'udl-review': ()=>u.review,
    'udl-matrix': ()=>`${u.matrix} ${topic}. ${u.matrixFormat}`
    ,'student-tutor': ()=>value('task')|| (language==='en'?`Help the learner understand ${topic}. Ask one question at a time, adapt to each answer, offer hints rather than the solution, and end with a brief reflection.`:catalan?`Ajuda l’estudiant a comprendre ${topic}. Fes una pregunta cada vegada, adapta el diàleg a cada resposta, ofereix pistes en lloc de donar la solució i acaba amb una breu reflexió.`:`Ayuda al estudiante a comprender ${topic}. Haz una pregunta cada vez, adapta el diálogo a cada respuesta, ofrece pistas en lugar de dar la solución y termina con una breve reflexión.`)
    ,analogies: ()=>value('task')|| (language==='en'?`Suggest five accurate, varied analogies to explain ${topic}. Connect them to learners’ everyday interests, explain what each analogy clarifies, and state where it stops being accurate.`:catalan?`Proposa cinc analogies variades i rigoroses per explicar ${topic}. Relaciona-les amb interessos quotidians de l’alumnat, explica què aclareix cadascuna i indica on deixa de ser vàlida.`:`Propón cinco analogías variadas y rigurosas para explicar ${topic}. Conéctalas con intereses cotidianos del alumnado, explica qué aclara cada una e indica dónde deja de ser válida.`)
    ,participation: ()=>language==='en'?`Suggest practical routines for equitable participation in work on ${topic}. Include quiet and written ways to contribute, clear turn-taking, thinking time, and a way to check whose voices are missing. Avoid putting learners on the spot.`:catalan?`Proposa rutines pràctiques per aconseguir una participació equitativa en el treball sobre ${topic}. Inclou maneres tranquil·les i escrites de contribuir, torns clars, temps per pensar i una manera de detectar quines veus falten. Evita posar l’alumnat en evidència.`:`Propón rutinas prácticas para lograr una participación equitativa en el trabajo sobre ${topic}. Incluye formas tranquilas y escritas de contribuir, turnos claros, tiempo para pensar y una manera de detectar qué voces faltan. Evita poner al alumnado en evidencia.`
    ,'conflict-mediation': ()=>value('task')|| (language==='en'?'Help me plan a calm, restorative response to the classroom situation described.':catalan?'Ajuda’m a preparar una resposta serena i restaurativa davant la situació d’aula descrita.':'Ayúdame a preparar una respuesta serena y restaurativa ante la situación de aula descrita.')
    ,'multiple-choice': ()=>language==='en'?`Create a multiple-choice quiz about ${topic}. For each question, provide one correct answer, three plausible distractors, and a short explanation of why each option is correct or reflects a common misconception. ${value('task')||'Ask for the number and difficulty of questions if not specified.'}`:catalan?`Crea un qüestionari de resposta múltiple sobre ${topic}. Per a cada pregunta, inclou una resposta correcta, tres distractors plausibles i una explicació breu de per què cada opció és correcta o reflecteix un error freqüent. ${value('task')||'Pregunta quantes preguntes i quin nivell de dificultat es volen si no s’indica.'}`:`Crea un cuestionario de opción múltiple sobre ${topic}. Para cada pregunta, incluye una respuesta correcta, tres distractores plausibles y una explicación breve de por qué cada opción es correcta o refleja un error frecuente. ${value('task')||'Pregunta cuántas preguntas y qué dificultad se desean si no se indica.'}`
    ,'ethical-dilemma': ()=>language==='en'?`Create three age-appropriate ethical dilemmas about ${topic}. Each should put two worthwhile values in tension, include perspectives from different stakeholders, and end with open questions rather than a single correct answer.`:catalan?`Crea tres dilemes ètics adequats al nivell sobre ${topic}. Cadascun ha d’enfrontar dos valors legítims, incloure perspectives de diferents persones implicades i acabar amb preguntes obertes, sense una única resposta correcta.`:`Crea tres dilemas éticos adecuados al nivel sobre ${topic}. Cada uno debe enfrentar dos valores legítimos, incluir perspectivas de distintas personas implicadas y terminar con preguntas abiertas, sin una única respuesta correcta.`
    ,'study-plan': ()=>language==='en'?`Create a realistic study plan for ${topic}. Use the available time and constraints in the context, alternate focused study with breaks and retrieval practice, and include a flexible catch-up block.`:catalan?`Crea un pla d’estudi realista per a ${topic}. Tingues en compte el temps disponible i les condicions del context, alterna estudi concentrat, descansos i pràctica de recuperació, i inclou un bloc flexible per als imprevistos.`:`Crea un plan de estudio realista para ${topic}. Ten en cuenta el tiempo disponible y las condiciones del contexto, alterna estudio concentrado, descansos y práctica de recuperación, e incluye un bloque flexible para imprevistos.`
    ,'historical-interview': ()=>`${language==='en'?`Role-play an interview with ${topic}. Answer in first person while distinguishing well-established facts from uncertainty; do not invent quotations or claim access to private thoughts. Invite the learner to ask the first question.`:catalan?`Interpreta una entrevista amb ${topic}. Respon en primera persona i diferencia els fets ben establerts de les incerteses; no inventes cites ni atribueixes pensaments privats. Convida l’estudiant a fer la primera pregunta.`:`Interpreta una entrevista con ${topic}. Responde en primera persona y distingue los hechos bien establecidos de las incertidumbres; no inventes citas ni atribuyas pensamientos privados. Invita al estudiante a hacer la primera pregunta.`}${value('task')?` ${value('task')}`:''}`
    ,'code-coach': ()=>`${language==='en'?`Review the code below for ${topic}. Explain the first issue and give a hint before showing a correction; adapt the explanation to the learner’s level.`:catalan?`Revisa el codi següent sobre ${topic}. Explica el primer problema i ofereix una pista abans de mostrar-ne la correcció; adapta l’explicació al nivell de l’estudiant.`:`Revisa el código siguiente sobre ${topic}. Explica el primer problema y ofrece una pista antes de mostrar una corrección; adapta la explicación al nivel del estudiante.`}${value('task')?` ${value('task')}`:''}`
  }
  const task = (taskBuilders[template.id]||(()=>value('task')||`${d.design} ${topic}.`))()
  lines.push(`## ${l.task}\n${task}`)
  if(value('sourceText')) lines.push(`## ${l.sourceText}\n${value('sourceText')}`)
  for(const key of ['objectives','criteria','methodology','duration','resources','levels','constraints','qualityCriteria']) if(value(key)) lines.push(`## ${key==='levels'&&template.id==='written-test'?a.maxScore:l[key as LabelKey]}\n${value(key)}`)
  if(value('curriculumCriteria')) lines.push(`## ${l.assessmentCriteria}\n${value('curriculumCriteria')}`)
  if(value('curriculumKnowledge')) lines.push(`## ${l.basicKnowledge}\n${value('curriculumKnowledge')}`)
  for(const key of Object.keys(extraLabels[language])) if(value(key)) lines.push(`## ${extraLabels[language][key]}\n${value(key)}`)
  if(template.id==='html-game'){
    lines.push(`## ${g.items}\n${value('gameItems')?`${value('gameItems')}\n${g.itemsNote}`:g.noItems}`)
    lines.push(`## ${g.tech}\n${g.techItems.map(item=>`- ${item}`).join('\n')}`)
    const features=(values['gameFeatures']||'').split(' · ').map(item=>item.trim()).filter(item=>item in g.featureTexts)
    if(features.length) lines.push(`## ${g.features}\n${features.map(item=>`- ${g.featureTexts[item]}`).join('\n')}`)
  }
  // En la matriz DUA, si no se elige ningún principio, se trabajan los tres.
  const chosenPrinciples=(values['udl']||'').split(' · ').map(item=>item.trim()).filter(item=>item in u.principles)
  const principles=template.id==='udl-matrix'&&!chosenPrinciples.length?Object.keys(u.principles):chosenPrinciples
  if(principles.length) lines.push(`## ${l.udl}\n${u.intro}\n${principles.map(item=>`- ${u.principles[item]}`).join('\n')}`)
  if(value('barriers')) lines.push(`## ${l.barriers}\n${value('barriers')}\n${u.barriers}`)
  // Solo las plantillas de imagen ofrecen el campo; se ignora en prompts antiguos
  // guardados con una herramienta en otras plantillas.
  const tool=template.fields.some(field=>field.id==='aiTool')?(values['aiTool']||'').trim():''
  const toolText=imageToolTexts[language][tool]
  if(toolText) lines.push(`## ${l.aiTool}: ${tool}\n${toolText.replace('{ratio}',(values['aspectRatio']||'1:1').split(' ')[0])}`)
  if(value('refinement')) lines.push(`## ${l.refinement}\n${value('refinement')}`)
  const returnText = language === 'en' ? 'Return the result in' : language === 'es' ? 'Devuelve el resultado en' : language === 'ca-valencia' ? 'Retorna el resultat en' : 'Retorna el resultat en'
  const review = udlTemplates.has(template.id) ? u.checks : principles.length ? [...reviews[language][reviewTypes[template.id]||'generic'], ...u.checks.slice(0,2)] : reviews[language][reviewTypes[template.id]||'generic']
  const checks = template.id==='html-game' ? [...review, ...g.checks] : review
  lines.push(`## ${l.requirements}\n${checks.map(item=>`- ${item}`).join('\n')}`, `## ${l.format}\n${returnText} ${value('outputFormat')||d.structured}.`)
  return lines.join('\n\n')
}
