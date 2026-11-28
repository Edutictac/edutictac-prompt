import type { Language } from '../types'
import type { AgentDraft } from '../skills/agents'

type Guidance = {
  general: string[]
  rubric: string[]
  tutor: string[]
  dua: string[]
  planning: string[]
  usual: string
  missing: string
  outside: string
}
const texts: Record<Language, Guidance> = {
  es: {
    general: ['Documentos de referencia autorizados para la tarea', 'Un ejemplo revisado del resultado que esperas'],
    rubric: [
      'Criterios de evaluación oficiales aplicables y actualizados',
      'Descripción de la actividad o producto que se evaluará',
    ],
    tutor: ['Materiales del tema revisados por el docente', 'Ejercicios con soluciones comprobadas'],
    dua: [
      'Descripción anónima de la actividad y de sus posibles barreras',
      'Orientaciones DUA del centro o fuentes de referencia autorizadas',
    ],
    planning: ['Criterios y saberes oficiales aplicables', 'Contexto y recursos del centro sin datos personales'],
    usual: 'Ayúdame con esta tarea: {purpose}',
    missing: 'Necesito ayuda con mi clase.',
    outside: 'Explícame cómo ajustar los frenos de una bicicleta.',
  },
  'ca-valencia': {
    general: ['Documents de referència autoritzats per a la tasca', 'Un exemple revisat del resultat que esperes'],
    rubric: [
      'Criteris d’avaluació oficials aplicables i actualitzats',
      'Descripció de l’activitat o producte que s’avaluarà',
    ],
    tutor: ['Materials del tema revisats pel professorat', 'Exercicis amb solucions comprovades'],
    dua: [
      'Descripció anònima de l’activitat i de les possibles barreres',
      'Orientacions DUA del centre o fonts de referència autoritzades',
    ],
    planning: ['Criteris i sabers oficials aplicables', 'Context i recursos del centre sense dades personals'],
    usual: 'Ajuda’m amb esta tasca: {purpose}',
    missing: 'Necessite ajuda amb la meua classe.',
    outside: 'Explica’m com ajustar els frens d’una bicicleta.',
  },
  ca: {
    general: ['Documents de referència autoritzats per a la tasca', 'Un exemple revisat del resultat que esperes'],
    rubric: [
      'Criteris d’avaluació oficials aplicables i actualitzats',
      'Descripció de l’activitat o producte que s’avaluarà',
    ],
    tutor: ['Materials del tema revisats pel professorat', 'Exercicis amb solucions comprovades'],
    dua: [
      'Descripció anònima de l’activitat i de les possibles barreres',
      'Orientacions DUA del centre o fonts de referència autoritzades',
    ],
    planning: ['Criteris i sabers oficials aplicables', 'Context i recursos del centre sense dades personals'],
    usual: 'Ajuda’m amb aquesta tasca: {purpose}',
    missing: 'Necessito ajuda amb la meva classe.',
    outside: 'Explica’m com ajustar els frens d’una bicicleta.',
  },
  en: {
    general: ['Authorised reference documents for the task', 'A reviewed example of the desired result'],
    rubric: ['Current official assessment criteria that apply', 'Description of the activity or product to assess'],
    tutor: ['Teacher-reviewed materials for the topic', 'Exercises with checked solutions'],
    dua: [
      'Anonymous description of the activity and possible barriers',
      'The school’s UDL guidance or authorised reference sources',
    ],
    planning: ['Applicable official criteria and knowledge', 'School context and resources without personal data'],
    usual: 'Help me with this task: {purpose}',
    missing: 'I need help with my class.',
    outside: 'Explain how to adjust bicycle brakes.',
  },
}

export function suggestedMaterials(presetId: string, language: Language): string[] {
  const t = texts[language]
  if (presetId === 'crear-rubricas') return t.rubric
  if (presetId === 'tutor') return t.tutor
  if (presetId === 'adaptar-actividades-dua' || presetId === 'crear-materiales-accesibles') return t.dua
  if (presetId === 'disenar-situaciones-aprendizaje') return t.planning
  return t.general
}

export function agentTestCases(draft: AgentDraft, language: Language): string[] {
  const t = texts[language]
  return [t.usual.replace('{purpose}', draft.purpose.trim()), t.missing, t.outside]
}
