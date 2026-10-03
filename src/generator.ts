import type { Language, PromptTemplate } from './types'
import { localizeOption } from './optionLocales'

type LabelKey = 'role'|'context'|'task'|'objectives'|'methodology'|'duration'|'resources'|'requirements'|'format'|'criteria'|'qualityCriteria'|'constraints'|'levels'|'activityType'|'specificCompetences'|'assessmentCriteria'|'basicKnowledge'|'sourceText'|'aiTool'|'refinement'|'udl'|'barriers'
type DefaultText = 'role'|'education'|'stage'|'design'|'rubric'|'checklist'|'h5p'|'interactive'|'topic'|'draft'|'clear'|'viable'|'verify'|'invent'|'structured'|'easyReading'|'biasCheck'|'glossary'|'roleComm'|'feedback'|'familyNote'|'tutoringScript'|'threeLevels'|'scorm'|'gift'|'qti'|'commonCartridge'|'workingWith'|'illustration'|'infographic'|'mindMap'
const labels: Record<Language, Record<LabelKey,string>> = {
  es:{udl:'Diseño Universal para el Aprendizaje (DUA)',barriers:'Barreras del contexto',role:'Rol',context:'Contexto',task:'Objetivo y tarea',objectives:'Objetivos',methodology:'Metodología',duration:'Duración',resources:'Recursos disponibles',requirements:'Revisión docente',format:'Formato de salida',aiTool:'Herramienta de IA',refinement:'Refinamiento y ajustes',criteria:'Criterios',qualityCriteria:'Criterios de calidad',constraints:'Restricciones y límites',levels:'Niveles de desempeño',activityType:'Tipo de actividad',specificCompetences:'Competencias específicas',assessmentCriteria:'Criterios de evaluación',basicKnowledge:'Saberes básicos',sourceText:'Texto de partida'},
  'ca-valencia':{udl:'Disseny Universal per a l’Aprenentatge (DUA)',barriers:'Barreres del context',role:'Rol',context:'Context',task:'Objectiu i tasca',objectives:'Objectius',methodology:'Metodologia',duration:'Duració',resources:'Recursos disponibles',requirements:'Revisió docent',format:'Format d’eixida',aiTool:'Ferramenta d’IA',refinement:'Refinament i ajustos',criteria:'Criteris',qualityCriteria:'Criteris de qualitat',constraints:'Restriccions i límits',levels:'Nivells de rendiment',activityType:'Tipus d’activitat',specificCompetences:'Competències específiques',assessmentCriteria:'Criteris d’avaluació',basicKnowledge:'Sabers bàsics',sourceText:'Text de partida'},
  ca:{udl:'Disseny Universal per a l’Aprenentatge (DUA)',barriers:'Barreres del context',role:'Rol',context:'Context',task:'Objectiu i tasca',objectives:'Objectius',methodology:'Metodologia',duration:'Durada',resources:'Recursos disponibles',requirements:'Revisió docent',format:'Format de sortida',aiTool:'Eina d’IA',refinement:'Refinament i ajustos',criteria:'Criteris',qualityCriteria:'Criteris de qualitat',constraints:'Restriccions i límits',levels:'Nivells de rendiment',activityType:'Tipus d’activitat',specificCompetences:'Competències específiques',assessmentCriteria:'Criteris d’avaluació',basicKnowledge:'Sabers bàsics',sourceText:'Text de partida'},
  en:{udl:'Universal Design for Learning (UDL)',barriers:'Contextual barriers',role:'Role',context:'Context',task:'Objective and task',objectives:'Objectives',methodology:'Methodology',duration:'Duration',resources:'Available resources',requirements:'Teacher review',format:'Output format',aiTool:'AI tool',refinement:'Refinement and tweaks',criteria:'Criteria',qualityCriteria:'Quality criteria',constraints:'Constraints and limits',levels:'Performance levels',activityType:'Activity type',specificCompetences:'Specific competences',assessmentCriteria:'Assessment criteria',basicKnowledge:'Basic knowledge',sourceText:'Source text'}
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
      'Revisa que els nivells de rendiment estiguen ben definits.',
      'Assenyala qualsevol dada, font o supòsit que hagi de verificar el docent.',
      'No inventis normativa, referències ni informació sobre l’alumnat.'
    ],
    adaptation: [
      'Mantín el mateix objectiu d’aprenentatge en totes les versions.',
      'Adapta l’accés (format, suports), no l’exigència.',
      'Revisa els exemples i els rols per a no reforçar estereotips.',
      'No inclogues dades personals de l’alumnat.',
      'Ofereix un primer esborrany revisable, no el presentis com a definitiu.'
    ],
    communication: [
      'Utilitza un llenguatge clar i proper per a les famílies.',
      'Revisa l’extensió i el to abans d’enviar-lo.',
      'No inclogues dades personals de l’alumnat.',
      'Mantín el criteri institucional del centre.',
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
      'No etiquetes ni incloges dades personals de l’alumnat.',
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
const udlTemplates = new Set(['udl-review','udl-matrix'])

export function generatePrompt(template: PromptTemplate, values: Record<string,string>, language: Language): string {
  const l=labels[language]
  const d=defaults[language]
  const u=udlTexts[language]
  const localizedKeys = new Set(['level', 'methodology', 'duration', 'resources', 'outputFormat', 'activityType', 'visualStyle', 'includeLabels', 'aspectRatio'])
  const value=(key:string)=>{const raw=values[key]?.trim()||'';return localizedKeys.has(key)?raw.split(' · ').map(item=>localizeOption(item,language)).join(' · '):raw}
  const lines:string[]=[]
  const level=[value('level'),value('course')].filter(Boolean).join(' ')
  const commTemplates = new Set(['family-note','tutoring-script'])
  const roleDefault = commTemplates.has(template.id) ? d.roleComm : `${d.role} ${value('subject')||d.education} ${level||d.stage}.`
  const rawTool=(values['aiTool']||'').trim()
  const tool=rawTool&&rawTool!=='Sin preferencia'?localizeOption(rawTool,language):''
  lines.push(`## ${l.role}\n${value('role')||roleDefault}${tool?`\n${l.aiTool}: ${tool}.`:''}`)
  if(value('context')||level||value('curriculumContext')) lines.push(`## ${l.context}\n${level?`${d.workingWith} ${level}.`:''}\n${value('curriculumContext')}\n${value('context')}`.trim())
  if(value('curriculumCompetences')) lines.push(`## ${l.specificCompetences}\n${value('curriculumCompetences')}`)
  const task = template.id==='rubric'?`${d.rubric} ${value('activity')||d.topic}.`:template.id==='checklist'?`${d.checklist} ${value('activity')||d.topic}.`:template.id==='h5p'?`${d.h5p} ${value('activityType')||d.interactive} ${language==='en'?'about':'sobre'} ${value('topic')||d.topic}.`:template.id==='easy-reading'?d.easyReading:template.id==='bias-check'?d.biasCheck:template.id==='glossary-support'?`${d.glossary} ${value('topic')||d.topic}.`:template.id==='feedback'?(value('task')||d.feedback):template.id==='family-note'?(value('task')||d.familyNote):template.id==='tutoring-script'?(value('task')||d.tutoringScript):template.id==='three-levels'?(value('task')||d.threeLevels):template.id==='scorm'?`${d.scorm} ${value('topic')||d.topic}.`:template.id==='gift'?`${d.gift} ${value('topic')||d.topic}.`:template.id==='qti'?`${d.qti} ${value('topic')||d.topic}.`:template.id==='common-cartridge'?`${d.commonCartridge} ${value('topic')||d.topic}.`:template.id==='scientific-illustration'?`${d.illustration} ${value('topic')||d.topic}.`:template.id==='infographic'?`${d.infographic} ${value('topic')||d.topic}.`:template.id==='mind-map'?`${d.mindMap} ${value('topic')||d.topic}.`:template.id==='udl-review'?u.review:template.id==='udl-matrix'?`${u.matrix} ${value('topic')||d.topic}. ${u.matrixFormat}`:value('task')||`${d.design} ${value('topic')||d.topic}.`
  lines.push(`## ${l.task}\n${task}`)
  if(value('sourceText')) lines.push(`## ${l.sourceText}\n${value('sourceText')}`)
  for(const key of ['objectives','criteria','methodology','duration','resources','levels','constraints','qualityCriteria']) if(value(key)) lines.push(`## ${l[key as LabelKey]}\n${value(key)}`)
  if(value('curriculumCriteria')) lines.push(`## ${l.assessmentCriteria}\n${value('curriculumCriteria')}`)
  if(value('curriculumKnowledge')) lines.push(`## ${l.basicKnowledge}\n${value('curriculumKnowledge')}`)
  // En la matriz DUA, si no se elige ningún principio, se trabajan los tres.
  const chosenPrinciples=(values['udl']||'').split(' · ').map(item=>item.trim()).filter(item=>item in u.principles)
  const principles=template.id==='udl-matrix'&&!chosenPrinciples.length?Object.keys(u.principles):chosenPrinciples
  if(principles.length) lines.push(`## ${l.udl}\n${u.intro}\n${principles.map(item=>`- ${u.principles[item]}`).join('\n')}`)
  if(value('barriers')) lines.push(`## ${l.barriers}\n${value('barriers')}\n${u.barriers}`)
  if(value('refinement')) lines.push(`## ${l.refinement}\n${value('refinement')}`)
  const returnText = language === 'en' ? 'Return the result in' : language === 'es' ? 'Devuelve el resultado en' : language === 'ca-valencia' ? 'Retorna el resultat en' : 'Retorna el resultat en'
  const review = udlTemplates.has(template.id) ? u.checks : principles.length ? [...reviews[language][reviewTypes[template.id]||'generic'], ...u.checks.slice(0,2)] : reviews[language][reviewTypes[template.id]||'generic']
  lines.push(`## ${l.requirements}\n${review.map(item=>`- ${item}`).join('\n')}`, `## ${l.format}\n${returnText} ${value('outputFormat')||d.structured}.`)
  return lines.join('\n\n')
}
