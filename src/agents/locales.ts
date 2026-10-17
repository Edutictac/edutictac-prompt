import type { Language } from '../types'
const es = {
  section: 'Agentes',
  design: 'Diseñar agente',
  examples: 'Ejemplos',
  mine: 'Mis agentes',
  compatibility: 'Compatibilidad',
  intro:
    'Diseña cómo ayudará tu agente: qué hace, qué revisa, cómo pregunta y qué límites respeta. Adáptalo a tu nivel educativo y materia y configura después sus instrucciones en Microsoft 365.',
  compatibilityHint:
    'Opciones avanzadas para intercambiar paquetes Agent Skills con Codex, OpenCode y entornos compatibles. Un paquete de habilidad y un agente configurado en Microsoft 365 son elementos diferentes.',
  identity: '1. Función y contexto educativo',
  behavior: '2. Cómo debe trabajar',
  quality: '3. Criterios y respuestas',
  boundaries: '4. Conversación y límites',
  role: '¿Qué papel tendrá el agente?',
  roleHint:
    'Por ejemplo: mentor de evaluación, tutor de Matemáticas o revisor de actividades.',
  stage: 'Nivel educativo',
  subject: 'Materia, ámbito o especialidad',
  subjectHint: 'Puedes elegir una sugerencia o escribir otra materia.',
  context: 'Contexto del centro o curso (opcional)',
  modes: 'Modos de trabajo',
  modeName: 'Nombre del modo',
  modeWhen: '¿Cuándo se activa?',
  modeBehavior: '¿Qué debe hacer?',
  addMode: 'Añadir modo',
  remove: 'Quitar',
  reviewMode: 'Revisor',
  guideMode: 'Guía',
  reviewWhen: 'Cuando la persona aporta una propuesta ya redactada.',
  guideWhen:
    'Cuando la persona parte de una idea o necesita construir una propuesta.',
  reviewBehavior:
    'Analiza con los criterios definidos, explica los problemas y ofrece mejoras concretas.',
  guideBehavior:
    'Acompaña paso a paso y pregunta solo lo necesario para construir una propuesta útil.',
  criteria: 'Criterios que aplicará',
  criteriaHint:
    'Un criterio por línea. Describe qué debe comprobar y cómo reconocer que se cumple.',
  errors: 'Errores que debe detectar',
  errorsHint: 'Un error por línea, con una breve explicación o ejemplo.',
  responseFormat: 'Estructura de la respuesta',
  responseHint:
    'Un apartado por línea, en el orden en que quieres que responda.',
  tone: 'Tono y trato',
  maxQuestions: 'Máximo de preguntas por turno',
  oneAtATime: 'Trabajar una sola propuesta cada vez',
  restrictions: 'Lo que no debe hacer',
  restrictionsHint:
    'Por ejemplo: no inventar datos ni normativa; no decidir por el equipo docente.',
  autoLanguage: 'El idioma en que le escriban',
  instructionLanguage: 'Idioma de las instrucciones',
  customExamples: 'Ejemplos para orientar al agente',
  exampleInput: 'Lo que escribe la persona',
  exampleOutput: 'Cómo debería responder el agente',
  addExample: 'Añadir ejemplo',
  starterPrompts: 'Preguntas iniciales sugeridas',
  starterHint: 'Una por línea. Ayudan a descubrir para qué sirve el agente.',
  save: 'Guardar diseño',
  saved: 'Diseño guardado en Mis agentes.',
  saveAsNew: 'Guardar como copia',
  edit: 'Editar y adaptar',
  duplicate: 'Duplicar',
  delete: 'Eliminar',
  confirmDelete: '¿Eliminar este diseño y sus revisiones de este navegador?',
  empty: 'Todavía no has guardado agentes. Diseña uno o parte de un ejemplo.',
  search: 'Buscar mis agentes',
  local:
    'Los diseños se guardan en este navegador, separados por cuenta. La creación y el uso del agente en M365 se gestionan allí.',
  revision: 'Revisión',
  history: 'Historial',
  restore: 'Restaurar como nueva revisión',
  back: 'Volver',
  useExample: 'Usar y adaptar',
  exampleNote:
    'Los ejemplos son puntos de partida editables. Cambia el nivel, la materia, los criterios y las situaciones para tu formación.',
  smart: 'Mentor de objetivos SMART',
  tutor: 'Tutor de una materia',
  generic: 'Agente personalizado',
  genericRole: 'Asistente educativo especializado',
  defaultTone:
    'Claro, constructivo y respetuoso. Explica los motivos y ofrece una alternativa concreta sin humillar.',
  defaultRestriction:
    'No inventes datos, normativa ni fuentes. No decidas por el profesorado ni por el equipo directivo. Pide los datos imprescindibles y marca los supuestos.',
  stage_all: 'Cualquier nivel',
  stage_infant: 'Educación Infantil',
  stage_primary: 'Educación Primaria',
  stage_secondary: 'ESO',
  stage_bach: 'Bachillerato',
  stage_fp: 'Formación Profesional',
  stage_adult: 'Educación de personas adultas',
  stage_music: 'Enseñanzas de Música',
  stage_dance: 'Enseñanzas de Danza',
  stage_university: 'Educación superior',
  stage_training: 'Formación del profesorado',
  instructionStage:
    'Adapta el lenguaje, la profundidad, los ejemplos y los apoyos al nivel y la materia indicados. Si falta información esencial del grupo, pregúntala sin solicitar datos personales. No atribuyas competencias o criterios oficiales sin una fuente aportada.',
  instructionModes:
    'Detecta el modo adecuado a partir del mensaje de la persona. Si hay ambigüedad, pregunta brevemente. Aplica el comportamiento del modo seleccionado.',
  instructionOne:
    'Si recibes varias propuestas, indica que las trabajarás de una en una. Analiza la primera y espera antes de pasar a la siguiente.',
  instructionQuestions:
    'Haz como máximo {n} preguntas por turno. Aprovecha las respuestas ya disponibles y evita cuestionarios largos.',
  instructionAuto:
    'Responde en el idioma en el que te escriba la persona; respeta cualquier cambio de idioma que solicite.',
  noExamples:
    'Puedes añadir un ejemplo de entrada y respuesta esperada para mostrar el criterio del agente.',
  defaultFormat:
    'Diagnóstico breve\nAnálisis con los criterios indicados\nErrores detectados y explicación\nPropuesta de mejora\nSiguiente paso o pregunta necesaria',
  permission: 'Este diseño pertenece a otra cuenta.',
  conflict: 'El diseño ha cambiado. Ábrelo de nuevo antes de guardar.',
  tooLong:
    'El contenido supera un límite. Reduce los campos indicados; las instrucciones no se recortan automáticamente.',
  invalid: 'Revisa los campos indicados.',
  restoreDone: 'Versión restaurada como una revisión nueva.',
  copyFailed: 'No se pudo copiar. Selecciona el texto y cópialo manualmente.',
}
const va: typeof es = {
  ...es,
  section: 'Agents',
  design: 'Dissenyar agent',
  examples: 'Exemples',
  mine: 'Els meus agents',
  compatibility: 'Compatibilitat',
  intro:
    'Dissenya com ajudarà el teu agent: què fa, què revisa, com pregunta i quins límits respecta. Adapta’l al nivell educatiu i la matèria i configura després les instruccions en Microsoft 365.',
  compatibilityHint:
    'Opcions avançades per a intercanviar paquets Agent Skills amb Codex, OpenCode i entorns compatibles. Un paquet d’habilitat i un agent configurat en Microsoft 365 són elements diferents.',
  identity: '1. Funció i context educatiu',
  behavior: '2. Com ha de treballar',
  quality: '3. Criteris i respostes',
  boundaries: '4. Conversa i límits',
  role: 'Quin paper tindrà l’agent?',
  roleHint:
    'Per exemple: mentor d’avaluació, tutor de Matemàtiques o revisor d’activitats.',
  stage: 'Nivell educatiu',
  subject: 'Matèria, àmbit o especialitat',
  subjectHint: 'Pots triar un suggeriment o escriure una altra matèria.',
  context: 'Context del centre o curs (opcional)',
  modes: 'Modes de treball',
  modeName: 'Nom del mode',
  modeWhen: 'Quan s’activa?',
  modeBehavior: 'Què ha de fer?',
  addMode: 'Afegir mode',
  remove: 'Llevar',
  reviewMode: 'Revisor',
  guideMode: 'Guia',
  reviewWhen: 'Quan la persona aporta una proposta ja redactada.',
  guideWhen:
    'Quan la persona partix d’una idea o necessita construir una proposta.',
  reviewBehavior:
    'Analitza amb els criteris definits, explica els problemes i oferix millores concretes.',
  guideBehavior:
    'Acompanya pas a pas i pregunta només el que cal per a construir una proposta útil.',
  criteria: 'Criteris que aplicarà',
  criteriaHint:
    'Un criteri per línia. Descriu què ha de comprovar i com reconéixer que es complix.',
  errors: 'Errors que ha de detectar',
  errorsHint: 'Un error per línia, amb explicació breu o exemple.',
  responseFormat: 'Estructura de la resposta',
  responseHint: 'Un apartat per línia, en l’ordre en què vols que responga.',
  tone: 'To i tracte',
  maxQuestions: 'Màxim de preguntes per torn',
  oneAtATime: 'Treballar una sola proposta cada vegada',
  restrictions: 'Què no ha de fer',
  restrictionsHint:
    'Per exemple: no inventar dades ni normativa; no decidir per l’equip docent.',
  autoLanguage: 'L’idioma en què li escriguen',
  instructionLanguage: 'Idioma de les instruccions',
  customExamples: 'Exemples per a orientar l’agent',
  exampleInput: 'Què escriu la persona',
  exampleOutput: 'Com hauria de respondre l’agent',
  addExample: 'Afegir exemple',
  starterPrompts: 'Preguntes inicials suggerides',
  starterHint: 'Una per línia. Ajuden a descobrir per a què servix l’agent.',
  save: 'Guardar disseny',
  saved: 'Disseny guardat en Els meus agents.',
  saveAsNew: 'Guardar com a còpia',
  edit: 'Editar i adaptar',
  duplicate: 'Duplicar',
  delete: 'Eliminar',
  confirmDelete: 'Vols eliminar este disseny i les revisions del navegador?',
  empty: 'Encara no has guardat agents. Dissenya’n un o partix d’un exemple.',
  search: 'Buscar els meus agents',
  local:
    'Els dissenys es guarden en este navegador, separats per compte. La creació i l’ús de l’agent en M365 es gestionen allí.',
  revision: 'Revisió',
  history: 'Historial',
  restore: 'Restaurar com a revisió nova',
  back: 'Tornar',
  useExample: 'Usar i adaptar',
  exampleNote:
    'Els exemples són punts de partida editables. Canvia nivell, matèria, criteris i situacions per a la formació.',
  smart: 'Mentor d’objectius SMART',
  tutor: 'Tutor d’una matèria',
  generic: 'Agent personalitzat',
  genericRole: 'Assistent educatiu especialitzat',
  defaultTone:
    'Clar, constructiu i respectuós. Explica els motius i oferix una alternativa concreta sense humiliar.',
  defaultRestriction:
    'No inventes dades, normativa ni fonts. No decidisques pel professorat ni per l’equip directiu. Demana les dades imprescindibles i assenyala els supòsits.',
  stage_all: 'Qualsevol nivell',
  stage_infant: 'Educació Infantil',
  stage_primary: 'Educació Primària',
  stage_secondary: 'ESO',
  stage_bach: 'Batxillerat',
  stage_fp: 'Formació Professional',
  stage_adult: 'Educació de persones adultes',
  stage_music: 'Ensenyaments de Música',
  stage_dance: 'Ensenyaments de Dansa',
  stage_university: 'Educació superior',
  stage_training: 'Formació del professorat',
  instructionStage:
    'Adapta llenguatge, profunditat, exemples i suports al nivell i la matèria indicats. Si falta informació essencial del grup, pregunta-la sense demanar dades personals. No atribuïsques competències o criteris oficials sense una font aportada.',
  instructionModes:
    'Detecta el mode adequat a partir del missatge de la persona. Si hi ha ambigüitat, pregunta breument. Aplica el comportament del mode seleccionat.',
  instructionOne:
    'Si reps diverses propostes, indica que les treballaràs d’una en una. Analitza la primera i espera abans de passar a la següent.',
  instructionQuestions:
    'Fes com a màxim {n} preguntes per torn. Aprofita les respostes disponibles i evita qüestionaris llargs.',
  instructionAuto:
    'Respon en l’idioma en què t’escriga la persona; respecta qualsevol canvi d’idioma que demane.',
  noExamples:
    'Pots afegir un exemple d’entrada i resposta esperada per a mostrar el criteri de l’agent.',
  defaultFormat:
    'Diagnòstic breu\nAnàlisi amb els criteris indicats\nErrors detectats i explicació\nProposta de millora\nPas següent o pregunta necessària',
  permission: 'Este disseny pertany a un altre compte.',
  conflict: 'El disseny ha canviat. Torna a obrir-lo abans de guardar.',
  tooLong:
    'El contingut supera un límit. Reduïx els camps indicats; les instruccions no es retallen automàticament.',
  invalid: 'Revisa els camps indicats.',
  restoreDone: 'Versió restaurada com a revisió nova.',
  copyFailed: 'No s’ha pogut copiar. Selecciona el text i copia’l manualment.',
}
const en: typeof es = {
  section: 'Agents',
  design: 'Design an agent',
  examples: 'Examples',
  mine: 'My agents',
  compatibility: 'Compatibility',
  intro:
    'Design how your agent helps: its tasks, checks, questions and boundaries. Adapt it to your education level and subject, then configure its instructions in Microsoft 365.',
  compatibilityHint:
    'Advanced options for exchanging Agent Skills packages with Codex, OpenCode and compatible environments. A skill package and an agent configured in Microsoft 365 are different items.',
  identity: '1. Role and education context',
  behavior: '2. How it should work',
  quality: '3. Criteria and responses',
  boundaries: '4. Conversation and limits',
  role: 'What role will the agent have?',
  roleHint:
    'For example: assessment mentor, mathematics tutor or activity reviewer.',
  stage: 'Education level',
  subject: 'Subject, area or specialty',
  subjectHint: 'Choose a suggestion or enter another subject.',
  context: 'School or course context (optional)',
  modes: 'Working modes',
  modeName: 'Mode name',
  modeWhen: 'When does it apply?',
  modeBehavior: 'What should it do?',
  addMode: 'Add mode',
  remove: 'Remove',
  reviewMode: 'Reviewer',
  guideMode: 'Guide',
  reviewWhen: 'When the user provides an existing draft.',
  guideWhen: 'When the user has an initial idea or needs to build a proposal.',
  reviewBehavior:
    'Apply the criteria, explain problems and offer concrete improvements.',
  guideBehavior:
    'Guide step by step and ask only what is needed to build a useful proposal.',
  criteria: 'Criteria to apply',
  criteriaHint:
    'One criterion per line. Describe what to check and how to recognize success.',
  errors: 'Errors to detect',
  errorsHint: 'One error per line, with a short explanation or example.',
  responseFormat: 'Response structure',
  responseHint: 'One section per line, in the desired response order.',
  tone: 'Tone and interaction',
  maxQuestions: 'Maximum questions per turn',
  oneAtATime: 'Work on one proposal at a time',
  restrictions: 'What it must not do',
  restrictionsHint:
    'For example: do not invent data or regulations, or decide on behalf of teachers.',
  autoLanguage: 'The language the user writes in',
  instructionLanguage: 'Instruction language',
  customExamples: 'Examples to guide the agent',
  exampleInput: 'What the user writes',
  exampleOutput: 'How the agent should respond',
  addExample: 'Add example',
  starterPrompts: 'Suggested starter prompts',
  starterHint: 'One per line. Show what the agent can help with.',
  save: 'Save design',
  saved: 'Design saved in My agents.',
  saveAsNew: 'Save as copy',
  edit: 'Edit and adapt',
  duplicate: 'Duplicate',
  delete: 'Delete',
  confirmDelete: 'Delete this design and its revisions from this browser?',
  empty: 'No saved agents yet. Design one or start from an example.',
  search: 'Search my agents',
  local:
    'Designs are stored in this browser, separated by account. Create and use the M365 agent inside Microsoft 365.',
  revision: 'Revision',
  history: 'History',
  restore: 'Restore as a new revision',
  back: 'Back',
  useExample: 'Use and adapt',
  exampleNote:
    'Examples are editable starting points. Change the education level, subject, criteria and situations for your training.',
  smart: 'SMART objectives mentor',
  tutor: 'Subject tutor',
  generic: 'Custom agent',
  genericRole: 'Specialist education assistant',
  defaultTone:
    'Clear, constructive and respectful. Explain the reasons and offer a concrete alternative without shaming.',
  defaultRestriction:
    'Do not invent data, regulations or sources. Do not decide on behalf of teachers or management. Request essential information and identify assumptions.',
  stage_all: 'Any level',
  stage_infant: 'Early years',
  stage_primary: 'Primary education',
  stage_secondary: 'Secondary education',
  stage_bach: 'Upper secondary',
  stage_fp: 'Vocational education',
  stage_adult: 'Adult education',
  stage_music: 'Music education',
  stage_dance: 'Dance education',
  stage_university: 'Higher education',
  stage_training: 'Teacher training',
  instructionStage:
    'Adapt language, depth, examples and support to the selected education level and subject. Ask for essential missing group context without requesting personal data. Do not claim official curriculum criteria without a supplied source.',
  instructionModes:
    'Detect the appropriate mode from the user message. If ambiguous, ask briefly. Apply the selected mode behavior.',
  instructionOne:
    'When given several proposals, explain you will work through them one at a time. Review the first and wait before continuing.',
  instructionQuestions:
    'Ask at most {n} questions per turn. Reuse information already available and avoid long questionnaires.',
  instructionAuto:
    'Respond in the language the user writes in and respect any requested language change.',
  noExamples:
    'Add an input and expected response example to demonstrate the agent’s judgment.',
  defaultFormat:
    'Brief diagnosis\nAnalysis against the criteria\nDetected errors and explanation\nImprovement proposal\nNext step or essential question',
  permission: 'This design belongs to another account.',
  conflict: 'The design has changed. Reopen it before saving.',
  tooLong:
    'A content limit has been exceeded. Shorten the indicated fields; instructions are never silently truncated.',
  invalid: 'Check the indicated fields.',
  restoreDone: 'Version restored as a new revision.',
  copyFailed: 'Could not copy. Select and copy the text manually.',
}
export const wizardLocales: Record<Language, typeof es> = {
  es,
  'ca-valencia': va,
  ca: {
    ...va,
    role: 'Quin paper tindrà l’agent?',
    subjectHint: 'Pots triar un suggeriment o escriure una altra matèria.',
    remove: 'Treure',
    guideWhen:
      'Quan la persona parteix d’una idea o necessita construir una proposta.',
    reviewBehavior:
      'Analitza amb els criteris definits, explica els problemes i ofereix millores concretes.',
    guideBehavior:
      'Acompanya pas a pas i pregunta només el que cal per construir una proposta útil.',
    criteriaHint:
      'Un criteri per línia. Descriu què ha de comprovar i com reconèixer que es compleix.',
    restrictionsHint:
      'Per exemple: no inventar dades ni normativa; no decidir per l’equip docent.',
    autoLanguage: 'L’idioma en què li escriguin',
    saved: 'Disseny desat a Els meus agents.',
    save: 'Desar disseny',
    saveAsNew: 'Desar com a còpia',
    empty: 'Encara no has desat agents. Dissenya’n un o parteix d’un exemple.',
    defaultTone:
      'Clar, constructiu i respectuós. Explica els motius i ofereix una alternativa concreta sense humiliar.',
    defaultRestriction:
      'No inventis dades, normativa ni fonts. No decideixis pel professorat ni per l’equip directiu. Demana les dades imprescindibles i assenyala els supòsits.',
    instructionStage:
      'Adapta llenguatge, profunditat, exemples i suports al nivell i la matèria indicats. Si falta informació essencial del grup, pregunta-la sense demanar dades personals. No atribueixis competències o criteris oficials sense una font aportada.',
    instructionOne:
      'Si reps diverses propostes, indica que les treballaràs d’una en una. Analitza la primera i espera abans de passar a la següent.',
    instructionAuto:
      'Respon en l’idioma en què t’escrigui la persona; respecta qualsevol canvi d’idioma que demani.',
  },
  en,
}
export type WizardTexts = typeof es
