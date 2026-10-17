import type { Language } from '../types'
import { builtinSkills } from '../skills/seeds'
import {
  defaultAgentDraft,
  type AgentDraft,
  type AgentStage,
} from '../skills/agents'
import { wizardLocales } from './locales'
export interface AgentPreset {
  id: string
  title: string
  description: string
  draft: AgentDraft
}
export function agentPresets(language: Language): AgentPreset[] {
  const t = wizardLocales[language],
    va = language === 'ca-valencia' || language === 'ca',
    en = language === 'en'
  const base = defaultAgentDraft(language)
  const educational = builtinSkills(language).map((s) => ({
    id: s.slug,
    title: s.name,
    description: s.description,
    draft: {
      ...defaultAgentDraft(language),
      name:
        s.name.length <= 30
          ? s.name
          : en
            ? 'Learning designer'
            : va
              ? 'Disseny d’aprenentatge'
              : 'Diseño de aprendizaje',
      description: s.description,
      purpose: s.description,
      role: en
        ? 'Specialist teacher mentor'
        : va
          ? 'Mentor docent especialitzat'
          : 'Mentor docente especializado',
      criteria: s.instructions,
      restrictions: s.restrictions,
      responseFormat: s.procedure.join('\n'),
      examples: s.examples
        .filter((e) => e.language === (va ? 'ca-valencia' : 'es'))
        .map((e) => ({ input: e.input, output: e.output })),
      starterPrompts: [
        s.examples.find((e) => e.language === (va ? 'ca-valencia' : 'es'))!
          .input,
      ],
    },
  }))
  const smart = {
    ...base,
    name: t.smart,
    audience: en
      ? 'School management teams'
      : va
        ? 'Equips directius del centre'
        : 'Equipos directivos del centro',
    description: en
      ? 'Guides and reviews SMART objectives for school improvement.'
      : va
        ? 'Guia i revisa objectius SMART per a la millora del centre.'
        : 'Guía y revisa objetivos SMART para la mejora del centro.',
    role: en
      ? 'Demanding, constructive mentor of SMART educational improvement objectives'
      : va
        ? 'Mentor exigent i constructiu d’objectius SMART de millora educativa'
        : 'Mentor exigente y constructivo de objetivos SMART de mejora educativa',
    stage: 'music' as AgentStage,
    subject: en
      ? 'Music and dance conservatories'
      : va
        ? 'Conservatoris de música i dansa'
        : 'Conservatorios de música y danza',
    purpose: en
      ? 'Help management teams formulate and review measurable improvement objectives linked to their own diagnosis.'
      : va
        ? 'Ajudar els equips directius a formular i revisar objectius de millora mesurables vinculats al diagnòstic del centre.'
        : 'Ayudar a equipos directivos a formular y revisar objetivos de mejora medibles vinculados al diagnóstico del centro.',
    criteria: en
      ? 'S: specific action, group and scope.\nM: measurable indicator.\nA: achievable with resources controlled by the school.\nR: relevant to evidence from self-evaluation.\nT: start, review and end dates supplied by the team.\nSuggest at least one process indicator and one outcome indicator, each with baseline, target and verification source. Mark missing baselines as pending collection.'
      : va
        ? 'S: acció, col·lectiu i àmbit específics.\nM: indicador mesurable.\nA: assolible amb recursos que controla el centre.\nR: rellevant per a una evidència d’autoavaluació.\nT: inici, revisió i final aportats per l’equip.\nSuggerix almenys un indicador de procés i un de resultat, amb línia base, meta i font de verificació. Marca les línies base desconegudes com a pendents de recollir.'
        : 'S: acción, colectivo y ámbito específicos.\nM: indicador medible.\nA: alcanzable con recursos que controla el centro.\nR: relevante para una evidencia de autoevaluación.\nT: inicio, revisión y final aportados por el equipo.\nSugiere al menos un indicador de proceso y uno de resultado, con línea base, meta y fuente de verificación. Marca las líneas base desconocidas como pendientes de obtener.',
    errors: en
      ? 'Activity disguised as an objective.\nVariable outside school control.\nNo link to self-evaluation.\nNegative wording.\nIndicator that only repeats the objective.\nGeneric or vague objective.'
      : va
        ? 'Activitat disfressada d’objectiu.\nVariable que no controla el centre.\nFalta de vincle amb l’autoavaluació.\nFormulació en negatiu.\nIndicador que només repetix l’objectiu.\nObjectiu genèric o vague.'
        : 'Actividad disfrazada de objetivo.\nVariable que no controla el centro.\nFalta de vínculo con la autoevaluación.\nFormulación en negativo.\nIndicador que solo repite el objetivo.\nObjetivo genérico o vago.',
    restrictions: en
      ? 'Do not invent school data or baselines. Do not question the school’s strategic priorities. Do not assign owners or specific dates: request them from management. Do not process identifiable learner data.'
      : va
        ? 'No inventes dades del centre ni línies base. No qüestiones la prioritat estratègica del centre. No proposes responsables ni dates concretes: demana’ls a l’equip directiu. No tractes dades personals identificables de l’alumnat.'
        : 'No inventes datos del centro ni líneas base. No cuestiones la prioridad estratégica del centro. No propongas responsables ni fechas concretas: pídelos al equipo directivo. No trates datos personales identificables del alumnado.',
    starterPrompts: en
      ? [
          'Review this objective: improve department coordination.',
          'Help me formulate an objective to reduce dropout.',
        ]
      : va
        ? [
            'Revisa este objectiu: millorar la coordinació del departament.',
            'Ajuda’m a formular un objectiu per a reduir l’abandonament.',
          ]
        : [
            'Revisa este objetivo: mejorar la coordinación del departamento.',
            'Ayúdame a formular un objetivo para reducir el abandono.',
          ],
  }
  const tutor = {
    ...base,
    name: t.tutor,
    audience: en
      ? 'Learners at the selected education level'
      : va
        ? 'Alumnat del nivell educatiu seleccionat'
        : 'Alumnado del nivel educativo seleccionado',
    description: en
      ? 'Guides learning in a subject with questions and feedback.'
      : va
        ? 'Guia l’aprenentatge d’una matèria amb preguntes i retroacció.'
        : 'Guía el aprendizaje de una materia con preguntas y retroalimentación.',
    role: en
      ? 'Patient subject tutor'
      : va
        ? 'Tutor pacient d’una matèria'
        : 'Tutor paciente de una materia',
    stage: 'secondary' as AgentStage,
    subject: en ? 'Mathematics' : va ? 'Matemàtiques' : 'Matemáticas',
    purpose: en
      ? 'Help learners understand and explain their reasoning without doing their assessed work for them.'
      : va
        ? 'Ajudar l’alumnat a comprendre i explicar el raonament sense fer-li el treball avaluable.'
        : 'Ayudar al alumnado a comprender y explicar su razonamiento sin hacerle el trabajo evaluable.',
    criteria: en
      ? 'Ask what the learner has tried.\nOffer a hint before a complete solution.\nCheck understanding with a similar example.'
      : va
        ? 'Pregunta què ha intentat l’alumne.\nOferix una pista abans d’una solució completa.\nComprova la comprensió amb un exemple semblant.'
        : 'Pregunta qué ha intentado el alumno.\nOfrece una pista antes de una solución completa.\nComprueba la comprensión con un ejemplo similar.',
    maxQuestions: 2,
  }
  return [
    {
      id: 'custom',
      title: t.generic,
      description: base.description,
      draft: base,
    },
    {
      id: 'smart',
      title: t.smart,
      description: smart.description,
      draft: smart,
    },
    {
      id: 'tutor',
      title: t.tutor,
      description: tutor.description,
      draft: tutor,
    },
    ...educational,
  ]
}
export function subjectSuggestions(
  stage: AgentStage,
  language: Language,
): string[] {
  const en = language === 'en',
    va = language !== 'es' && !en
  if (stage === 'music')
    return en
      ? ['Piano', 'Singing', 'Musical language', 'Harmony']
      : va
        ? ['Piano', 'Cant', 'Llenguatge musical', 'Harmonia']
        : ['Piano', 'Canto', 'Lenguaje musical', 'Armonía']
  if (stage === 'dance')
    return en
      ? ['Classical dance', 'Contemporary dance', 'Body expression']
      : va
        ? ['Dansa clàssica', 'Dansa contemporània', 'Expressió corporal']
        : ['Danza clásica', 'Danza contemporánea', 'Expresión corporal']
  return en
    ? [
        'Mathematics',
        'Language',
        'Science',
        'Geography and history',
        'Technology',
        'Arts',
        'Physical education',
        'School management',
      ]
    : va
      ? [
          'Matemàtiques',
          'Llengua',
          'Ciències',
          'Geografia i història',
          'Tecnologia',
          'Educació artística',
          'Educació física',
          'Gestió del centre',
        ]
      : [
          'Matemáticas',
          'Lengua',
          'Ciencias',
          'Geografía e historia',
          'Tecnología',
          'Educación artística',
          'Educación física',
          'Gestión del centro',
        ]
}
