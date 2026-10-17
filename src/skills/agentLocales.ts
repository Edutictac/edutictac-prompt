import type { Language } from '../types'
const es = {
  tab: 'Agentes M365',
  title: 'Prepara un agente para tu curso',
  lead: 'Configura una vez su función, materiales y forma de responder. Después úsalo desde Agentes en Microsoft 365 con tu cuenta educativa.',
  access:
    'Comprueba primero que tu cuenta edu.gva.es muestra Agentes → Crear agente → Configurar. Las funciones disponibles dependen de los permisos y la licencia de tu organización.',
  course: 'Curso o contexto de formación',
  courseHint:
    'Por ejemplo: evaluación formativa en Primaria, formación del profesorado.',
  purpose: '¿Para qué ayudará el agente?',
  purposeHint:
    'Por ejemplo: orientar al profesorado sobre los materiales del curso y ayudarle a diseñar una rúbrica.',
  audience: 'Personas destinatarias',
  audienceHint: 'Por ejemplo: profesorado participante en el curso.',
  materials: 'Materiales que añadirás en M365 (un nombre por línea)',
  materialsHint:
    'Por ejemplo: guía del curso, criterios de evaluación, ejemplos de actividades. Aquí solo anotamos sus nombres; los documentos se añaden después dentro de M365.',
  basis: 'Comportamiento reutilizable',
  courseOnly: 'Asistente general del curso',
  name: 'Nombre del agente',
  description: 'Descripción',
  responseLanguage: 'Idioma habitual de respuesta',
  generate: 'Preparar configuración',
  configure: 'Configurar en M365',
  copy: 'Copiar este campo',
  copied: 'Copiado.',
  copyFailed: 'No se pudo copiar. Selecciona el texto y cópialo manualmente.',
  instructions: 'Instrucciones del agente',
  starters: 'Preguntas iniciales',
  documents: 'Añadir conocimientos',
  documentsHelp:
    'En Configurar → Conocimientos, añade únicamente los materiales autorizados y comprueba sus permisos. Copiar los nombres de los documentos no incorpora su contenido. Usa las fuentes que ofrezca tu cuenta (archivos, SharePoint, OneDrive o webs permitidas).',
  limits:
    'Esta guía usa los campos habituales de Agent Builder. No requiere importar Skills en vista previa. El agente se crea dentro de M365; EduTicTac no accede a tu cuenta ni a tus cursos.',
  privacy:
    'Utiliza ejemplos sin datos personales del alumnado. Antes de compartir el agente, revisa quién podrá consultar los materiales que le añadas.',
  test: 'Probar antes de usar en el curso',
  testHelp:
    'En Probar, haz una pregunta cuya respuesta esté en tus materiales, una sin respuesta en ellos y una tarea práctica. Comprueba que cita la fuente, reconoce lo que falta y da una propuesta útil.',
  complete:
    'Cuando funcione, pulsa Crear en M365. En las siguientes sesiones abre ese agente y escribe solo la nueva tarea. Conserva esta configuración para repetir la práctica en tus cursos.',
  download: 'Descargar guía de configuración',
  open: 'Abrir Microsoft 365 Copilot',
  fromSkill: 'Preparar un agente M365 con esta Skill',
  localOnly:
    'El formulario y la guía se preparan en este navegador. Descarga la guía para conservarla; no se crea ni se publica ningún agente automáticamente.',
  tooLong:
    'La configuración supera el límite del campo. Reduce el texto o los ejemplos antes de copiarlo.',
  invalid: 'Completa los campos obligatorios y revisa los límites.',
  untrusted:
    'Revisa primero las instrucciones y recursos de la Skill importada.',
  external:
    'Esta Skill necesita herramientas externas; no se puede convertir en un agente de instrucciones con esta guía.',
  defaultName: 'Asistente del curso',
  defaultDescription:
    'Ayuda a comprender los materiales del curso y a aplicarlos en tareas docentes.',
  defaultPurpose:
    'Orientar sobre el curso y ayudar a producir recursos docentes prácticos a partir de sus materiales.',
  defaultAudience: 'Profesorado participante',
  setup: [
    '1. Define el agente',
    '2. Copia la configuración en M365',
    '3. Añade materiales y prueba',
  ],
  savedSkills:
    'Codex y OpenCode siguen disponibles mediante la exportación Agent Skills en Importar y exportar.',
}
const va: typeof es = {
  tab: 'Agents M365',
  title: 'Prepara un agent per al teu curs',
  lead: 'Configura una vegada la funció, els materials i la manera de respondre. Després usa’l des d’Agents en Microsoft 365 amb el teu compte educatiu.',
  access:
    'Comprova primer que el teu compte edu.gva.es mostra Agents → Crear agent → Configurar. Les funcions disponibles depenen dels permisos i la llicència de la teua organització.',
  course: 'Curs o context de formació',
  courseHint:
    'Per exemple: avaluació formativa en Primària, formació del professorat.',
  purpose: 'Per a què ajudarà l’agent?',
  purposeHint:
    'Per exemple: orientar el professorat sobre els materials del curs i ajudar-lo a dissenyar una rúbrica.',
  audience: 'Persones destinatàries',
  audienceHint: 'Per exemple: professorat participant en el curs.',
  materials: 'Materials que afegiràs en M365 (un nom per línia)',
  materialsHint:
    'Per exemple: guia del curs, criteris d’avaluació, exemples d’activitats. Ací només anotem els noms; els documents s’afigen després dins de M365.',
  basis: 'Comportament reutilitzable',
  courseOnly: 'Assistent general del curs',
  name: 'Nom de l’agent',
  description: 'Descripció',
  responseLanguage: 'Idioma habitual de resposta',
  generate: 'Preparar configuració',
  configure: 'Configurar en M365',
  copy: 'Copiar este camp',
  copied: 'Copiat.',
  copyFailed: 'No s’ha pogut copiar. Selecciona el text i copia’l manualment.',
  instructions: 'Instruccions de l’agent',
  starters: 'Preguntes inicials',
  documents: 'Afegir coneixements',
  documentsHelp:
    'En Configurar → Coneixements, afig només els materials autoritzats i comprova els permisos. Copiar els noms dels documents no n’incorpora el contingut. Usa les fonts que oferisca el teu compte (fitxers, SharePoint, OneDrive o webs permeses).',
  limits:
    'Esta guia usa els camps habituals d’Agent Builder. No requerix importar Skills en vista prèvia. L’agent es crea dins de M365; EduTicTac no accedix al teu compte ni als teus cursos.',
  privacy:
    'Utilitza exemples sense dades personals de l’alumnat. Abans de compartir l’agent, revisa qui podrà consultar els materials que hi afiges.',
  test: 'Provar abans d’usar en el curs',
  testHelp:
    'En Provar, fes una pregunta amb resposta en els materials, una sense resposta en estos i una tasca pràctica. Comprova que cita la font, reconeix què falta i dona una proposta útil.',
  complete:
    'Quan funcione, polsa Crear en M365. En les sessions següents obri eixe agent i escriu només la tasca nova. Conserva esta configuració per a repetir la pràctica en els cursos.',
  download: 'Descarregar guia de configuració',
  open: 'Obrir Microsoft 365 Copilot',
  fromSkill: 'Preparar un agent M365 amb esta Skill',
  localOnly:
    'El formulari i la guia es preparen en este navegador. Descarrega la guia per a conservar-la; no es crea ni publica cap agent automàticament.',
  tooLong:
    'La configuració supera el límit del camp. Reduïx el text o els exemples abans de copiar-lo.',
  invalid: 'Completa els camps obligatoris i revisa els límits.',
  untrusted:
    'Revisa primer les instruccions i els recursos de la Skill importada.',
  external:
    'Esta Skill necessita ferramentes externes; no es pot convertir en un agent d’instruccions amb esta guia.',
  defaultName: 'Assistent del curs',
  defaultDescription:
    'Ajuda a comprendre els materials del curs i a aplicar-los en tasques docents.',
  defaultPurpose:
    'Orientar sobre el curs i ajudar a produir recursos docents pràctics a partir dels materials.',
  defaultAudience: 'Professorat participant',
  setup: [
    '1. Definix l’agent',
    '2. Copia la configuració en M365',
    '3. Afig materials i prova',
  ],
  savedSkills:
    'Codex i OpenCode continuen disponibles mitjançant l’exportació Agent Skills en Importar i exportar.',
}
const en: typeof es = {
  tab: 'M365 agents',
  title: 'Prepare an agent for your course',
  lead: 'Configure its purpose, materials and response style once. Then use it in Microsoft 365 Agents with your education account.',
  access:
    'First check that your edu.gva.es account shows Agents → New agent → Configure. Available features depend on your organization’s permissions and license.',
  course: 'Course or training context',
  courseHint:
    'For example: formative assessment in primary education, teacher training.',
  purpose: 'What will the agent help with?',
  purposeHint:
    'For example: guide teachers through course materials and help them design a rubric.',
  audience: 'Intended users',
  audienceHint: 'For example: teachers attending the course.',
  materials: 'Materials you will add in M365 (one name per line)',
  materialsHint:
    'For example: course guide, assessment criteria, sample activities. Only names are recorded here; add the documents inside M365 later.',
  basis: 'Reusable behavior',
  courseOnly: 'General course assistant',
  name: 'Agent name',
  description: 'Description',
  responseLanguage: 'Default response language',
  generate: 'Prepare configuration',
  configure: 'Configure in M365',
  copy: 'Copy this field',
  copied: 'Copied.',
  copyFailed: 'Could not copy. Select the text and copy it manually.',
  instructions: 'Agent instructions',
  starters: 'Starter prompts',
  documents: 'Add knowledge',
  documentsHelp:
    'In Configure → Knowledge, add authorized materials and check permissions. Copying document names does not add their content. Use the sources available to your account (files, SharePoint, OneDrive or permitted websites).',
  limits:
    'This guide uses standard Agent Builder fields. It does not require preview Skill imports. Create the agent inside M365; EduTicTac does not access your account or courses.',
  privacy:
    'Use examples without learner personal data. Before sharing the agent, review who can access the materials you add.',
  test: 'Test before using in the course',
  testHelp:
    'In Try it, ask a question answered by your materials, one not covered by them and one practical task. Check source references, acknowledgement of missing information and useful output.',
  complete:
    'When it works, select Create in M365. In later sessions, open that agent and enter just the new task. Keep this configuration to repeat the exercise in your courses.',
  download: 'Download configuration guide',
  open: 'Open Microsoft 365 Copilot',
  fromSkill: 'Prepare an M365 agent with this Skill',
  localOnly:
    'The form and guide are prepared in this browser. Download the guide to keep it; no agent is created or published automatically.',
  tooLong:
    'The configuration exceeds a field limit. Shorten the text or examples before copying.',
  invalid: 'Complete the required fields and check the limits.',
  untrusted: 'Review the imported Skill’s instructions and resources first.',
  external:
    'This Skill requires external tools and cannot be converted into an instruction agent with this guide.',
  defaultName: 'Course assistant',
  defaultDescription:
    'Helps users understand course materials and apply them to teaching tasks.',
  defaultPurpose:
    'Guide participants through the course and help them produce practical teaching resources from its materials.',
  defaultAudience: 'Teachers attending the course',
  setup: [
    '1. Define the agent',
    '2. Copy the configuration into M365',
    '3. Add materials and test',
  ],
  savedSkills:
    'Codex and OpenCode remain available through Agent Skills export in Import and export.',
}
export const agentLocales: Record<Language, typeof es> = {
  es,
  'ca-valencia': va,
  ca: {
    ...va,
    lead: 'Configura una vegada la funció, els materials i la manera de respondre. Després utilitza’l des d’Agents en Microsoft 365 amb el teu compte educatiu.',
    access:
      'Comprova primer que el teu compte edu.gva.es mostra Agents → Crear agent → Configurar. Les funcions disponibles depenen dels permisos i la llicència de la teva organització.',
    materialsHint:
      'Per exemple: guia del curs, criteris d’avaluació, exemples d’activitats. Aquí només anotem els noms; els documents s’afegeixen després dins de M365.',
    copy: 'Copiar aquest camp',
    limits:
      'Aquesta guia usa els camps habituals d’Agent Builder. No requereix importar Skills en vista prèvia. L’agent es crea dins de M365; EduTicTac no accedeix al teu compte ni als teus cursos.',
    external:
      'Aquesta Skill necessita eines externes; no es pot convertir en un agent d’instruccions amb aquesta guia.',
    setup: [
      '1. Defineix l’agent',
      '2. Copia la configuració en M365',
      '3. Afegeix materials i prova',
    ],
  },
  en,
}
