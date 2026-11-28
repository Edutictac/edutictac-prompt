import type { Language } from '../../../types'

export type LabelKey =
  | 'role'
  | 'context'
  | 'task'
  | 'objectives'
  | 'methodology'
  | 'duration'
  | 'resources'
  | 'requirements'
  | 'format'
  | 'criteria'
  | 'qualityCriteria'
  | 'constraints'
  | 'levels'
  | 'activityType'
  | 'specificCompetences'
  | 'assessmentCriteria'
  | 'basicKnowledge'
  | 'sourceText'
  | 'aiTool'
  | 'refinement'
  | 'udl'
  | 'barriers'
  | 'giftRules'
  | 'videoBrief'
export type DefaultText =
  | 'adultGuidance'
  | 'role'
  | 'education'
  | 'stage'
  | 'design'
  | 'rubric'
  | 'checklist'
  | 'h5p'
  | 'interactive'
  | 'topic'
  | 'draft'
  | 'clear'
  | 'viable'
  | 'verify'
  | 'invent'
  | 'askIfMissing'
  | 'structured'
  | 'easyReading'
  | 'biasCheck'
  | 'glossary'
  | 'roleComm'
  | 'feedback'
  | 'familyNote'
  | 'tutoringScript'
  | 'threeLevels'
  | 'scorm'
  | 'gift'
  | 'giftRules'
  | 'qti'
  | 'commonCartridge'
  | 'workingWith'
  | 'illustration'
  | 'infographic'
  | 'mindMap'
export const labels: Record<Language, Record<LabelKey, string>> = {
  es: {
    udl: 'Diseño Universal para el Aprendizaje (DUA)',
    barriers: 'Barreras del contexto',
    role: 'Rol',
    context: 'Contexto',
    task: 'Objetivo y tarea',
    objectives: 'Objetivos',
    methodology: 'Metodología',
    duration: 'Duración',
    resources: 'Recursos disponibles',
    requirements: 'Revisión docente',
    format: 'Formato de salida',
    giftRules: 'Reglas para una importación correcta en Aules y Moodle',
    videoBrief: 'Instrucciones de producción',
    aiTool: 'Herramienta de imagen',
    refinement: 'Refinamiento y ajustes',
    criteria: 'Criterios',
    qualityCriteria: 'Criterios de calidad',
    constraints: 'Restricciones y límites',
    levels: 'Niveles de desempeño',
    activityType: 'Tipo de actividad',
    specificCompetences: 'Competencias específicas',
    assessmentCriteria: 'Criterios de evaluación',
    basicKnowledge: 'Saberes básicos',
    sourceText: 'Texto de partida',
  },
  'ca-valencia': {
    udl: 'Disseny Universal per a l’Aprenentatge (DUA)',
    barriers: 'Barreres del context',
    role: 'Rol',
    context: 'Context',
    task: 'Objectiu i tasca',
    objectives: 'Objectius',
    methodology: 'Metodologia',
    duration: 'Duració',
    resources: 'Recursos disponibles',
    requirements: 'Revisió docent',
    format: 'Format d’eixida',
    giftRules: 'Regles per a una importació correcta a Aules i Moodle',
    videoBrief: 'Instruccions de producció',
    aiTool: 'Ferramenta d’imatge',
    refinement: 'Refinament i ajustos',
    criteria: 'Criteris',
    qualityCriteria: 'Criteris de qualitat',
    constraints: 'Restriccions i límits',
    levels: 'Nivells de rendiment',
    activityType: 'Tipus d’activitat',
    specificCompetences: 'Competències específiques',
    assessmentCriteria: 'Criteris d’avaluació',
    basicKnowledge: 'Sabers bàsics',
    sourceText: 'Text de partida',
  },
  ca: {
    udl: 'Disseny Universal per a l’Aprenentatge (DUA)',
    barriers: 'Barreres del context',
    role: 'Rol',
    context: 'Context',
    task: 'Objectiu i tasca',
    objectives: 'Objectius',
    methodology: 'Metodologia',
    duration: 'Durada',
    resources: 'Recursos disponibles',
    requirements: 'Revisió docent',
    format: 'Format de sortida',
    giftRules: 'Regles per a una importació correcta a Aules i Moodle',
    videoBrief: 'Instruccions de producció',
    aiTool: 'Eina d’imatge',
    refinement: 'Refinament i ajustos',
    criteria: 'Criteris',
    qualityCriteria: 'Criteris de qualitat',
    constraints: 'Restriccions i límits',
    levels: 'Nivells de rendiment',
    activityType: 'Tipus d’activitat',
    specificCompetences: 'Competències específiques',
    assessmentCriteria: 'Criteris d’avaluació',
    basicKnowledge: 'Sabers bàsics',
    sourceText: 'Text de partida',
  },
  en: {
    udl: 'Universal Design for Learning (UDL)',
    barriers: 'Contextual barriers',
    role: 'Role',
    context: 'Context',
    task: 'Objective and task',
    objectives: 'Objectives',
    methodology: 'Methodology',
    duration: 'Duration',
    resources: 'Available resources',
    requirements: 'Teacher review',
    format: 'Output format',
    giftRules: 'Rules for a clean import into Aules and Moodle',
    videoBrief: 'Production instructions',
    aiTool: 'Image tool',
    refinement: 'Refinement and tweaks',
    criteria: 'Criteria',
    qualityCriteria: 'Quality criteria',
    constraints: 'Constraints and limits',
    levels: 'Performance levels',
    activityType: 'Activity type',
    specificCompetences: 'Specific competences',
    assessmentCriteria: 'Assessment criteria',
    basicKnowledge: 'Basic knowledge',
    sourceText: 'Source text',
  },
}
export const defaults: Record<Language, Record<DefaultText, string>> = {
  es: {
    role: 'Actúa como docente especialista en',
    education: 'educación y diseño de actividades para alumnado de',
    stage: 'la etapa indicada',
    design: 'Diseña una actividad sobre',
    rubric: 'Crea una rúbrica para evaluar',
    checklist: 'Crea una lista de cotejo para',
    h5p: 'Diseña una actividad H5P de tipo',
    interactive: 'interactivo',
    topic: 'el tema indicado',
    draft: 'Entrega un primer borrador revisable, no lo presentes como definitivo.',
    illustration: 'Genera una ilustración educativa técnicamente precisa sobre',
    infographic: 'Genera una infografía educativa clara sobre',
    mindMap: 'Genera un mapa mental o esquema en Markdown (Mermaid) sobre',
    clear: 'Usa instrucciones claras, observables y adecuadas al nivel.',
    viable: 'Comprueba que la propuesta es viable con el tiempo y los recursos indicados.',
    verify: 'Señala cualquier dato, fuente o supuesto que deba verificar la persona docente.',
    invent: 'No inventes normativa, referencias ni información sobre el alumnado.',
    askIfMissing:
      'Si falta información imprescindible para hacerlo bien, pregúntame antes de continuar; no la inventes.',
    structured: 'texto estructurado',
    easyReading: 'Adapta a lectura fácil el siguiente texto.',
    biasCheck: 'Revisa posibles sesgos de género, cultura o capacidad en el siguiente texto.',
    glossary: 'Elabora un glosario de términos clave y apoyos visuales sobre',
    roleComm: 'Actúa como tutor/a o miembro del equipo directivo del centro.',
    feedback: 'Redacta un comentario de feedback formativo para el trabajo del alumnado.',
    familyNote: 'Redacta una comunicación breve y clara para las familias.',
    tutoringScript: 'Prepara un guion para una reunión o tutoría con una familia.',
    threeLevels: 'Crea tres versiones (apoyo, base y ampliación) con el mismo objetivo de aprendizaje.',
    scorm:
      'Genera los archivos de un paquete SCORM 1.2 compatible con Moodle y Aules (imsmanifest.xml, index.html interactivo, CSS/JS e instrucciones para comprimirlo en un .zip) sobre',
    gift: 'Genera un banco de preguntas en formato GIFT (Moodle/Aules) sobre',
    giftRules:
      'Entrega únicamente el código GIFT, sin texto de introducción, sin explicaciones, sin bloques de código y sin marcas Markdown.\n- Separa cada pregunta con una línea en blanco y usa un nombre corto en ASCII (SR01, SR02...).\n- Usa solo estos tipos compatibles con Aules y Moodle: opción múltiple con una única respuesta correcta, verdadero/falso y respuesta corta.\n- En opción múltiple, escribe cada opción en su propia línea con el prefijo = (correcta) o ~ (incorrecta). No omitas nunca ese prefijo y no dejes ninguna opción empezando por otra cosa.\n- No uses preguntas de emparejamiento con ->, de ordenación ni porcentajes de puntuación parcial (%): Aules las importa mal o falla.\n- En verdadero/falso escribe exactamente TRUE o FALSE entre llaves, sin añadir texto.\n- En respuesta corta escribe cada respuesta aceptada en una línea precedida de =, con un máximo de tres variantes equivalentes.\n- Revisa que no se haya perdido el primer carácter de ninguna respuesta ni el prefijo = o ~.\n- No incluyas HTML, etiquetas, imágenes, audio ni archivos externos. Usa UTF-8 y escapa los caracteres ~ = # { } : \\ con una barra invertida cuando aparezcan dentro de un texto.\n- No añadas comentarios // ni retroalimentación con #. No incluyas la revisión docente dentro del GIFT: entrégala aparte, solo si se pide.',
    qti: 'Genera un archivo de preguntas en formato QTI 2.1 (importable en Moodle/Aules) sobre',
    commonCartridge: 'Genera un paquete Common Cartridge (IMS CC en .imscc) con la actividad y sus recursos sobre',
    workingWith: 'Trabajo con alumnado de',
    adultGuidance:
      'Es alumnado adulto con experiencias, ritmos y niveles de partida muy diversos: usa un trato adulto que no infantilice, situaciones reales de la vida cotidiana, el trabajo y la administración, aprovecha su experiencia previa y prepara materiales breves que se lean bien en el móvil.',
  },
  'ca-valencia': {
    role: 'Actua com a docent especialista en',
    education: 'educació i disseny d’activitats per a alumnat de',
    stage: 'l’etapa indicada',
    design: 'Dissenya una activitat sobre',
    rubric: 'Crea una rúbrica per a avaluar',
    checklist: 'Crea una llista de verificació per a',
    h5p: 'Dissenya una activitat H5P de tipus',
    interactive: 'interactiu',
    topic: 'el tema indicat',
    draft: 'Entrega un primer esborrany revisable, no el presentes com a definitiu.',
    illustration: 'Genera una il·lustració educativa tècnicament precisa sobre',
    infographic: 'Genera una infografia educativa clara sobre',
    mindMap: 'Genera un mapa mental o esquema en Markdown (Mermaid) sobre',
    clear: 'Usa instruccions clares, observables i adequades al nivell.',
    viable: 'Comprova que la proposta és viable amb el temps i els recursos indicats.',
    verify: 'Assenyala qualsevol dada, font o supòsit que haja de verificar la persona docent.',
    invent: 'No inventes normativa, referències ni informació sobre l’alumnat.',
    askIfMissing: 'Si falta informació imprescindible per a fer-ho bé, pregunta’m abans de continuar; no la inventes.',
    structured: 'text estructurat',
    easyReading: 'Adapta a lectura fàcil el text següent.',
    biasCheck: 'Revisa els possibles biaixos de gènere, cultura o capacitat en el text següent.',
    glossary: 'Elabora un glossari de termes clau i suports visuals sobre',
    roleComm: 'Actua com a tutor/a o membre de l’equip directiu del centre.',
    feedback: 'Redacta un comentari de feedback formatiu per al treball de l’alumnat.',
    familyNote: 'Redacta una comunicació breu i clara per a les famílies.',
    tutoringScript: 'Prepara un guió per a una reunió o tutoria amb una família.',
    threeLevels: 'Crea tres versions (suport, base i ampliació) amb el mateix objectiu d’aprenentatge.',
    scorm:
      'Genera els fitxers d’un paquet SCORM 1.2 compatible amb Moodle i Aules (imsmanifest.xml, index.html interactiu, CSS/JS i instruccions per a comprimir-lo en un .zip) sobre',
    gift: 'Genera un banc de preguntes en format GIFT (Moodle/Aules) sobre',
    giftRules:
      'Entrega només el codi GIFT, sense text d’introducció, sense explicacions, sense blocs de codi i sense marques Markdown.\n- Separa cada pregunta amb una línia en blanc i usa un nom curt en ASCII (SR01, SR02...).\n- Usa només estos tipus compatibles amb Aules i Moodle: opció múltiple amb una única resposta correcta, vertader/fals i resposta curta.\n- En opció múltiple, escriu cada opció en la seua pròpia línia amb el prefix = (correcta) o ~ (incorrecta). No ometes mai eixe prefix i no deixes cap opció començant per una altra cosa.\n- No uses preguntes d’aparellament amb ->, d’ordenació ni percentatges de puntuació parcial (%): Aules les importa malament o falla.\n- En vertader/fals escriu exactament TRUE o FALSE entre claus, sense afegir text.\n- En resposta curta escriu cada resposta acceptada en una línia precedida de =, amb un màxim de tres variants equivalents.\n- Revisa que no s’haja perdut el primer caràcter de cap resposta ni el prefix = o ~.\n- No inclogues HTML, etiquetes, imatges, àudio ni fitxers externs. Usa UTF-8 i escapa els caràcters ~ = # { } : \\ amb una barra invertida quan apareguen dins d’un text.\n- No afegisques comentaris // ni retroacció amb #. No inclogues la revisió docent dins del GIFT: entrega-la a banda, només si es demana.',
    qti: 'Genera un fitxer de preguntes en format QTI 2.1 (importable en Moodle/Aules) sobre',
    commonCartridge: 'Genera un paquet Common Cartridge (IMS CC en .imscc) amb l’activitat i els seus recursos sobre',
    workingWith: 'Treball amb alumnat de',
    adultGuidance:
      'És alumnat adult amb experiències, ritmes i nivells de partida molt diversos: usa un tracte adult que no infantilitze, situacions reals de la vida quotidiana, la feina i l’administració, aprofita la seua experiència prèvia i prepara materials breus que es lligen bé en el mòbil.',
  },
  ca: {
    role: 'Actua com a docent especialista en',
    education: 'educació i disseny d’activitats per a alumnat de',
    stage: 'l’etapa indicada',
    design: 'Dissenya una activitat sobre',
    rubric: 'Crea una rúbrica per avaluar',
    checklist: 'Crea una llista de verificació per a',
    h5p: 'Dissenya una activitat H5P de tipus',
    interactive: 'interactiu',
    topic: 'el tema indicat',
    draft: 'Ofereix un primer esborrany revisable, no el presentis com a definitiu.',
    illustration: 'Genera una il·lustració educativa tècnicament precisa sobre',
    infographic: 'Genera una infografia educativa clara sobre',
    mindMap: 'Genera un mapa mental o esquema en Markdown (Mermaid) sobre',
    clear: 'Utilitza instruccions clares, observables i adequades al nivell.',
    viable: 'Comprova que la proposta és viable amb el temps i els recursos indicats.',
    verify: 'Assenyala qualsevol dada, font o supòsit que hagi de verificar el docent.',
    invent: 'No inventis normativa, referències ni informació sobre l’alumnat.',
    askIfMissing: 'Si falta informació imprescindible per fer-ho bé, pregunta’m abans de continuar; no la inventes.',
    structured: 'text estructurat',
    easyReading: 'Adapta a lectura fàcil el text següent.',
    biasCheck: 'Revisa els possibles biaixos de gènere, cultura o capacitat en el text següent.',
    glossary: 'Elabora un glossari de termes clau i suports visuals sobre',
    roleComm: 'Actua com a tutor/a o membre de l’equip directiu del centre.',
    feedback: 'Redacta un comentari de feedback formatiu per al treball de l’alumnat.',
    familyNote: 'Redacta una comunicació breu i clara per a les famílies.',
    tutoringScript: 'Prepara un guió per a una reunió o tutoria amb una família.',
    threeLevels: 'Crea tres versions (suport, base i ampliació) amb el mateix objectiu d’aprenentatge.',
    scorm:
      'Genera els fitxers d’un paquet SCORM 1.2 compatible amb Moodle i Aules (imsmanifest.xml, index.html interactiu, CSS/JS i instruccions per a comprimir-lo en un .zip) sobre',
    gift: 'Genera un banc de preguntes en format GIFT (Moodle/Aules) sobre',
    giftRules:
      'Entrega només el codi GIFT, sense text d’introducció, sense explicacions, sense blocs de codi i sense marques Markdown.\n- Separa cada pregunta amb una línia en blanc i usa un nom curt en ASCII (SR01, SR02...).\n- Usa només aquests tipus compatibles amb Aules i Moodle: opció múltiple amb una única resposta correcta, vertader/fals i resposta curta.\n- En opció múltiple, escriu cada opció a la seva pròpia línia amb el prefix = (correcta) o ~ (incorrecta). No ometis mai aquest prefix i no deixis cap opció començant per una altra cosa.\n- No usis preguntes d’aparellament amb ->, d’ordenació ni percentatges de puntuació parcial (%): Aules les importa malament o falla.\n- En vertader/fals escriu exactament TRUE o FALSE entre claus, sense afegir text.\n- En resposta curta escriu cada resposta acceptada en una línia precedida de =, amb un màxim de tres variants equivalents.\n- Revisa que no s’hagi perdut el primer caràcter de cap resposta ni el prefix = o ~.\n- No incloguis HTML, etiquetes, imatges, àudio ni fitxers externs. Usa UTF-8 i escapa els caràcters ~ = # { } : \\ amb una barra invertida quan apareguin dins d’un text.\n- No afegeixis comentaris // ni retroacció amb #. No incloguis la revisió docent dins del GIFT: entrega-la a part, només si es demana.',
    qti: 'Genera un fitxer de preguntes en format QTI 2.1 (importable en Moodle/Aules) sobre',
    commonCartridge: 'Genera un paquet Common Cartridge (IMS CC en .imscc) amb l’activitat i els seus recursos sobre',
    workingWith: 'Treball amb alumnat de',
    adultGuidance:
      'És alumnat adult amb experiències, ritmes i nivells de partida molt diversos: fes servir un tracte adult que no infantilitzi, situacions reals de la vida quotidiana, la feina i l’administració, aprofita la seva experiència prèvia i prepara materials breus que es llegeixin bé al mòbil.',
  },
  en: {
    role: 'Act as a teacher specialising in',
    education: 'education and activity design for learners at',
    stage: 'the stated educational stage',
    design: 'Design an activity about',
    rubric: 'Create a rubric to assess',
    checklist: 'Create a checklist for',
    h5p: 'Design an H5P activity of type',
    interactive: 'interactive',
    topic: 'the stated topic',
    draft: 'Deliver a reviewable first draft; do not present it as definitive.',
    illustration: 'Generate a technically accurate educational illustration about',
    infographic: 'Generate a clear educational infographic about',
    mindMap: 'Generate a mind map or diagram in Markdown (Mermaid) about',
    clear: 'Use clear, observable instructions appropriate to the level.',
    viable: 'Check that the proposal is feasible with the stated time and resources.',
    verify: 'Flag any data, source or assumption the teacher should verify.',
    invent: 'Do not invent regulations, references or information about learners.',
    askIfMissing: 'If essential information is missing to do this well, ask me before continuing; do not invent it.',
    structured: 'structured text',
    easyReading: 'Produce an easy-read version of the following text.',
    biasCheck: 'Review the following text for possible gender, cultural or ability bias.',
    glossary: 'Create a glossary of key terms and visual supports about',
    roleComm: 'Act as a tutor or a member of the school leadership team.',
    feedback: 'Write a formative feedback comment on the student’s work.',
    familyNote: 'Write a short, clear communication for families.',
    tutoringScript: 'Prepare a script for a meeting or tutoring session with a family.',
    threeLevels: 'Create three versions (support, core and extension) with the same learning objective.',
    scorm:
      'Generate the files of a SCORM 1.2 package compatible with Moodle and Aules (imsmanifest.xml, interactive index.html, CSS/JS and instructions to zip it) about',
    gift: 'Generate a question bank in GIFT format (Moodle/Aules) about',
    giftRules:
      'Output only the GIFT code: no introduction, no explanations, no code fences and no Markdown.\n- Separate questions with a blank line and use a short ASCII name (SR01, SR02...).\n- Use only these Aules- and Moodle-compatible types: single-answer multiple choice, true/false and short answer.\n- In multiple choice, put each option on its own line with the prefix = (correct) or ~ (incorrect). Never omit that prefix and never leave an option starting with anything else.\n- Do not use matching questions with ->, ordering or partial-credit percentages (%): Aules imports them wrongly or fails.\n- For true/false, write exactly TRUE or FALSE in braces, with no extra text.\n- For short answer, write each accepted answer on its own line preceded by =, with at most three equivalent variants.\n- Check that the first character of every answer and the = or ~ prefix have not been lost.\n- Do not include HTML, tags, images, audio or external files. Use UTF-8 and escape the characters ~ = # { } : \\ with a backslash when they appear inside a text.\n- Do not add // comments or # feedback. Do not include the teacher-review notes inside the GIFT: give them separately, only if asked.',
    qti: 'Generate a question file in QTI 2.1 format (importable into Moodle/Aules) about',
    commonCartridge: 'Generate a Common Cartridge package (IMS CC, .imscc) with the activity and its resources about',
    workingWith: 'Working with learners in',
    adultGuidance:
      'Learners are adults with very diverse experiences, paces and starting points: use an adult tone that never talks down, real situations from daily life, work and dealing with public services, build on their prior experience, and keep materials short and easy to read on a phone.',
  },
}

export type DefaultTexts = Record<DefaultText, string>
