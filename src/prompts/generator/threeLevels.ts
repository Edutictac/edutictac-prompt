import { localizeOption } from '../../optionLocales'
import type { Language } from '../../types'
import type { ValueReader } from './values'

const texts: Record<Language, { versions: string; supports: string; activity: string; instructions: string }> = {
  es: {
    versions: 'Prepara estas versiones',
    supports: 'Considera estos apoyos cuando sean pertinentes',
    activity: 'Actividad de partida',
    instructions:
      'Mantén el mismo objetivo de aprendizaje y la exigencia; adapta el acceso, las instrucciones y la forma de responder. Entrega cada versión lista para revisar y usar. Explica brevemente qué cambia y por qué, y propone una evaluación común o equivalente con indicadores observables. Usa los datos aportados sin inventarlos y pregunta si falta información imprescindible. No incluyas datos personales ni etiquetas del alumnado en los materiales.',
  },
  'ca-valencia': {
    versions: 'Prepara estes versions',
    supports: 'Considera estos suports quan siguen pertinents',
    activity: 'Activitat de partida',
    instructions:
      'Mantín el mateix objectiu d’aprenentatge i l’exigència; adapta l’accés, les instruccions i la manera de respondre. Entrega cada versió llesta per a revisar i usar. Explica breument què canvia i per què, i proposa una avaluació comuna o equivalent amb indicadors observables. Usa les dades aportades sense inventar-ne i pregunta si falta informació imprescindible. No inclogues dades personals ni etiquetes de l’alumnat en els materials.',
  },
  ca: {
    versions: 'Prepara aquestes versions',
    supports: 'Considera aquests suports quan siguin pertinents',
    activity: 'Activitat de partida',
    instructions:
      'Mantén el mateix objectiu d’aprenentatge i l’exigència; adapta l’accés, les instruccions i la manera de respondre. Lliura cada versió a punt per revisar i fer servir. Explica breument què canvia i per què, i proposa una avaluació comuna o equivalent amb indicadors observables. Fes servir les dades aportades sense inventar-ne i pregunta si falta informació imprescindible. No incloguis dades personals ni etiquetes de l’alumnat en els materials.',
  },
  en: {
    versions: 'Prepare these versions',
    supports: 'Consider these supports where appropriate',
    activity: 'Starting activity',
    instructions:
      'Keep the same learning objective and level of demand; adapt access, instructions and ways to respond. Provide each version ready to review and use. Briefly explain what changes and why, and propose a common or equivalent assessment with observable indicators. Use the information provided without inventing details and ask if essential information is missing. Do not include personal data or learner labels in the materials.',
  },
}

export function threeLevelsTask(language: Language, value: ValueReader, raw: Record<string, string>): string {
  const t = texts[language]
  const selected = (raw.supportVersions || '').split(' · ').filter(Boolean)
  const versions = selected.length ? selected : ['Con más apoyo', 'Actividad de referencia', 'Ampliación']
  const supports = (raw.supportChoices || '').split(' · ').filter(Boolean)
  const localize = (options: string[]) => options.map((option) => localizeOption(option, language)).join(', ')
  return [
    `${t.versions}: ${localize(versions)}.`,
    t.instructions,
    supports.length ? `${t.supports}: ${localize(supports)}.` : '',
    value('task') ? `${t.activity}:\n${value('task')}` : '',
  ]
    .filter(Boolean)
    .join('\n\n')
}
