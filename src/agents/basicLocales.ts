import type { Language } from '../types'

const es = {
  basic: 'Básico · Copilot M365',
  advanced: 'Avanzado',
  mode: 'Modo de edición',
  intro:
    'Prepara un asistente para tu trabajo docente. Elige un ejemplo, adáptalo y lleva su configuración a Copilot M365.',
  choose: '¿Para qué quieres ayuda?',
  more: 'Ver todos los ejemplos',
  create: 'Crear agente',
  adapt: 'Adáptalo a tu contexto',
  purpose: '¿En qué quieres que te ayude?',
  audience: '¿Para quién es?',
  context: '¿Qué debe tener en cuenta? (opcional)',
  contextHint:
    'Por ejemplo: el curso, el tipo de actividad o las necesidades del grupo. Sin datos personales.',
  teacher: 'Para mi trabajo docente',
  team: 'Para un equipo docente',
  learners: 'Para alumnado',
  customAudience: 'Destinatarios personalizados (se conservarán)',
  optional: 'Ajustar nombre e idiomas',
  prepare: 'Preparar mi agente',
  preserved:
    'Los ajustes de comportamiento se conservan. Puedes revisarlos en Avanzado.',
  replace:
    '¿Usar otro ejemplo? Sustituirá el diseño abierto. Guarda antes si quieres conservarlo.',
  summary: 'Tu agente está preparado',
  local: 'Guardar en Mis agentes',
  localHint:
    'Guarda en este navegador. No crea ni publica el agente en Microsoft.',
  transfer: 'Llevar a Copilot M365',
  transferHint:
    'En M365, abre Agentes → Crear agente → Configurar. Copia cada campo en su apartado. Las instrucciones se pegan en Instrucciones, no en el chat.',
  access:
    'Si no aparece Crear agente, consulta los permisos de tu cuenta del centro. EduTicTac no accede a tu cuenta ni instala el agente automáticamente.',
  preview: 'Ver las instrucciones completas',
  curriculum: '¿Cómo trabajará con los criterios de evaluación?',
  official: 'Usar mis criterios curriculares',
  draft: 'Proponer criterios docentes para revisar',
  curriculumHint:
    'Los criterios oficiales se aportan después en M365. Sin ellos, el agente los pedirá; un borrador docente no equivale a currículo oficial.',
  curricularRule:
    'Para rúbricas alineadas con el currículo, pide los criterios reales o una fuente accesible y verificable antes de afirmar alineación. No inventes criterios oficiales.',
  draftRule:
    'Si no se aportan criterios, ofrece criterios docentes observables como borrador para revisión, sin atribuirlos al currículo oficial. Identifica siempre la propuesta como borrador. Si se solicita alineación oficial, pide los criterios reales o una fuente verificable.',
  tests: 'Pruébalo en Copilot antes de compartirlo',
  testUsual:
    'Caso habitual: utiliza una pregunta inicial y comprueba que sigue su función.',
  testMissing:
    'Caso incompleto: omite un dato importante y comprueba que lo pide sin inventarlo.',
  testOutside:
    'Fuera de su función: pide algo ajeno a su finalidad y comprueba que explica sus límites.',
  reviewLearners:
    'Si lo utilizará alumnado, revisa las respuestas y los permisos del centro antes de compartirlo.',
  fixAdvanced: 'Si un ajuste personalizado no es válido, revísalo en Avanzado.',
}
type Texts = typeof es
const va: Texts = {
  basic: 'Bàsic · Copilot M365',
  advanced: 'Avançat',
  mode: 'Mode d’edició',
  intro:
    'Prepara un assistent per al teu treball docent. Tria un exemple, adapta’l i porta la configuració a Copilot M365.',
  choose: 'Per a què vols ajuda?',
  more: 'Vore tots els exemples',
  create: 'Crear agent',
  adapt: 'Adapta’l al teu context',
  purpose: 'En què vols que t’ajude?',
  audience: 'Per a qui és?',
  context: 'Què ha de tindre en compte? (opcional)',
  contextHint:
    'Per exemple: el curs, el tipus d’activitat o les necessitats del grup. Sense dades personals.',
  teacher: 'Per al meu treball docent',
  team: 'Per a un equip docent',
  learners: 'Per a alumnat',
  customAudience: 'Destinataris personalitzats (es conservaran)',
  optional: 'Ajustar nom i idiomes',
  prepare: 'Preparar el meu agent',
  preserved:
    'Els ajustos de comportament es conserven. Pots revisar-los en Avançat.',
  replace:
    'Vols usar un altre exemple? Substituirà el disseny obert. Guarda’l abans si vols conservar-lo.',
  summary: 'El teu agent està preparat',
  local: 'Guardar en Els meus agents',
  localHint:
    'Guarda en este navegador. No crea ni publica l’agent en Microsoft.',
  transfer: 'Portar a Copilot M365',
  transferHint:
    'En M365, obri Agents → Crear agent → Configurar. Copia cada camp en el seu apartat. Les instruccions es peguen en Instruccions, no en el xat.',
  access:
    'Si no apareix Crear agent, consulta els permisos del compte del centre. EduTicTac no accedix al teu compte ni instal·la l’agent automàticament.',
  preview: 'Vore les instruccions completes',
  curriculum: 'Com treballarà amb els criteris d’avaluació?',
  official: 'Usar els meus criteris curriculars',
  draft: 'Proposar criteris docents per a revisar',
  curriculumHint:
    'Els criteris oficials s’aporten després en M365. Sense estos, l’agent els demanarà; un esborrany docent no equival al currículum oficial.',
  curricularRule:
    'Per a rúbriques alineades amb el currículum, demana els criteris reals o una font accessible i verificable abans d’afirmar alineació. No inventes criteris oficials.',
  draftRule:
    'Si no s’aporten criteris, oferix criteris docents observables com a esborrany per a revisió, sense atribuir-los al currículum oficial. Identifica sempre la proposta com a esborrany. Si se sol·licita alineació oficial, demana els criteris reals o una font verificable.',
  tests: 'Prova’l en Copilot abans de compartir-lo',
  testUsual:
    'Cas habitual: usa una pregunta inicial i comprova que seguix la seua funció.',
  testMissing:
    'Cas incomplet: omet una dada important i comprova que la demana sense inventar-la.',
  testOutside:
    'Fora de la seua funció: demana alguna cosa aliena a la finalitat i comprova que explica els límits.',
  reviewLearners:
    'Si l’utilitzarà alumnat, revisa les respostes i els permisos del centre abans de compartir-lo.',
  fixAdvanced: 'Si un ajust personalitzat no és vàlid, revisa’l en Avançat.',
}
const en: Texts = {
  basic: 'Basic · Copilot M365',
  advanced: 'Advanced',
  mode: 'Editing mode',
  intro:
    'Prepare an assistant for your teaching. Choose an example, adapt it and take its configuration to Copilot M365.',
  choose: 'What would you like help with?',
  more: 'See all examples',
  create: 'Create agent',
  adapt: 'Adapt it to your context',
  purpose: 'What should it help you with?',
  audience: 'Who is it for?',
  context: 'What should it consider? (optional)',
  contextHint:
    'For example: the year group, activity or learning needs. No personal data.',
  teacher: 'For my teaching work',
  team: 'For a teaching team',
  learners: 'For learners',
  customAudience: 'Custom audience (preserved)',
  optional: 'Adjust name and languages',
  prepare: 'Prepare my agent',
  preserved: 'Behaviour settings are preserved. Review them in Advanced.',
  replace:
    'Use another example? This replaces the open design. Save first if you want to keep it.',
  summary: 'Your agent configuration is ready',
  local: 'Save in My agents',
  localHint:
    'Saves in this browser. Does not create or publish the agent in Microsoft.',
  transfer: 'Take to Copilot M365',
  transferHint:
    'In M365, open Agents → Create agent → Configure. Copy each field into its section. Paste instructions into Instructions, not into chat.',
  access:
    'If Create agent is missing, check your school account permissions. EduTicTac does not access your account or install the agent automatically.',
  preview: 'View full instructions',
  curriculum: 'How should it handle assessment criteria?',
  official: 'Use my curriculum criteria',
  draft: 'Suggest teacher criteria for review',
  curriculumHint:
    'Provide official criteria later in M365. Without them, the agent will ask; teacher drafts are not official curriculum.',
  curricularRule:
    'For curriculum-aligned rubrics, request actual criteria or an accessible, verifiable source before claiming alignment. Never invent official criteria.',
  draftRule:
    'When criteria are absent, offer observable teacher criteria as a draft for review, without claiming official curriculum alignment. Always label the proposal as a draft. If official alignment is requested, ask for actual criteria or a verifiable source.',
  tests: 'Test in Copilot before sharing',
  testUsual:
    'Typical case: use a starter prompt and check that it follows its purpose.',
  testMissing:
    'Incomplete case: omit an important fact and check that it asks without inventing it.',
  testOutside:
    'Outside its purpose: ask an unrelated question and check that it explains its limits.',
  reviewLearners:
    'Before sharing with learners, review responses and school permissions.',
  fixAdvanced: 'If a custom setting is invalid, review it in Advanced.',
}
export const basicLocales: Record<Language, Texts> = {
  es,
  'ca-valencia': va,
  ca: {
    ...va,
    more: 'Veure tots els exemples',
    context: 'Què ha de tenir en compte? (opcional)',
    preview: 'Veure les instruccions completes',
    local: 'Desar a Els meus agents',
    localHint:
      'Desa en aquest navegador. No crea ni publica l’agent a Microsoft.',
    prepare: 'Preparar el meu agent',
    teacher: 'Per a la meva feina docent',
    replace:
      'Vols fer servir un altre exemple? Substituirà el disseny obert. Desa’l abans si vols conservar-lo.',
    transferHint:
      'A M365, obre Agents → Crear agent → Configurar. Copia cada camp al seu apartat. Les instruccions s’enganxen a Instruccions, no al xat.',
    access:
      'Si no apareix Crear agent, consulta els permisos del compte del centre. EduTicTac no accedeix al teu compte ni instal·la l’agent automàticament.',
    draftRule:
      'Si no s’aporten criteris, ofereix criteris docents observables com a esborrany per a revisió, sense atribuir-los al currículum oficial. Identifica sempre la proposta com a esborrany. Si se sol·licita alineació oficial, demana els criteris reals o una font verificable.',
    testUsual:
      'Cas habitual: fes servir una pregunta inicial i comprova que segueix la seva funció.',
    testOutside:
      'Fora de la seva funció: demana alguna cosa aliena a la finalitat i comprova que explica els límits.',
  },
  en,
}
