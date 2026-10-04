import type { Language } from './types'

// Asistentes en los que se puede abrir el prompt. Los que aceptan el texto en
// el enlace lo reciben ya escrito; en el resto se copia y se abre la web para
// pegarlo. El prompt se copia siempre, por si el enlace llega recortado.
export type AiTarget = { id: string; name: string; url: string; acceptsQuery: boolean }
export const aiTargets: AiTarget[] = [
  { id: 'ChatGPT', name: 'ChatGPT', url: 'https://chatgpt.com/?q=', acceptsQuery: true },
  { id: 'Claude', name: 'Claude', url: 'https://claude.ai/new?q=', acceptsQuery: true },
  { id: 'Copilot', name: 'Copilot', url: 'https://m365.cloud.microsoft/chat', acceptsQuery: false },
  { id: 'Gemini', name: 'Gemini', url: 'https://gemini.google.com/app', acceptsQuery: false },
  { id: 'Perplexity', name: 'Perplexity', url: 'https://www.perplexity.ai/search?q=', acceptsQuery: true }
]
// Los navegadores y los asistentes recortan los enlaces muy largos.
const maxQueryLength = 6000

export function aiTargetUrl(target: AiTarget, prompt: string): string {
  const query = encodeURIComponent(prompt)
  return target.acceptsQuery && query.length <= maxQueryLength ? `${target.url}${query}` : target.url.replace(/[?&]q=$/, '')
}

// El asistente elegido en el formulario aparece en primer lugar.
export function orderedAiTargets(preferred: string): AiTarget[] {
  return [...aiTargets].sort((a, b) => Number(b.id === preferred) - Number(a.id === preferred))
}

// Peticiones de seguimiento para refinar el primer resultado en la misma
// conversación: unas comunes y otras según el tipo de plantilla.
type FollowUpGroup = 'common' | 'assessment' | 'adaptation' | 'communication' | 'visual' | 'game' | 'package' | 'planning'
const followUpTexts: Record<Language, Record<FollowUpGroup, string[]>> = {
  es: {
    common: ['Hazlo más breve y concreto, sin perder lo esencial.', 'Revisa tu respuesta: señala errores, datos dudosos y supuestos que deba comprobar.', 'Añade una versión con más apoyos visuales y lingüísticos para quien lo necesite.'],
    planning: ['Concreta la temporalización sesión a sesión.', 'Añade cómo evaluaré cada objetivo y con qué instrumento.'],
    assessment: ['Añade un ejemplo de evidencia para cada nivel.', 'Haz una versión para el alumnado, con lenguaje sencillo, para la autoevaluación.'],
    adaptation: ['Comprueba que todas las versiones mantienen el mismo objetivo.', 'Añade un glosario con las palabras más difíciles.'],
    communication: ['Hazlo más cercano y reduce la extensión a la mitad.', 'Prepara también la versión en valenciano.'],
    visual: ['Simplifica la composición y aumenta el contraste.', 'Propón tres variantes de estilo para elegir.'],
    game: ['El archivo no funciona bien: revisa los errores de JavaScript y devuélvelo completo.', 'Añade 10 elementos más con la misma estructura de datos.', 'Haz los botones más grandes para usarlo en pantalla táctil.'],
    package: ['Comprueba que el paquete cumple el estándar y explica cómo importarlo en Aules.', 'Añade 5 preguntas más de dificultad creciente.']
  },
  'ca-valencia': {
    common: ['Fes-ho més breu i concret, sense perdre l’essencial.', 'Revisa la resposta: assenyala errors, dades dubtoses i supòsits que haja de comprovar.', 'Afig una versió amb més suports visuals i lingüístics per a qui ho necessite.'],
    planning: ['Concreta la temporalització sessió a sessió.', 'Afig com avaluaré cada objectiu i amb quin instrument.'],
    assessment: ['Afig un exemple d’evidència per a cada nivell.', 'Fes una versió per a l’alumnat, amb llenguatge senzill, per a l’autoavaluació.'],
    adaptation: ['Comprova que totes les versions mantenen el mateix objectiu.', 'Afig un glossari amb les paraules més difícils.'],
    communication: ['Fes-ho més proper i reduïx l’extensió a la meitat.', 'Prepara també la versió en castellà.'],
    visual: ['Simplifica la composició i augmenta el contrast.', 'Proposa tres variants d’estil per a triar.'],
    game: ['El fitxer no funciona bé: revisa els errors de JavaScript i torna’l complet.', 'Afig 10 elements més amb la mateixa estructura de dades.', 'Fes els botons més grans per a usar-lo en pantalla tàctil.'],
    package: ['Comprova que el paquet complix l’estàndard i explica com importar-lo a Aules.', 'Afig 5 preguntes més de dificultat creixent.']
  },
  ca: {
    common: ['Fes-ho més breu i concret, sense perdre l’essencial.', 'Revisa la resposta: assenyala errors, dades dubtoses i supòsits que hagi de comprovar.', 'Afegeix una versió amb més suports visuals i lingüístics per a qui ho necessiti.'],
    planning: ['Concreta la temporització sessió a sessió.', 'Afegeix com avaluaré cada objectiu i amb quin instrument.'],
    assessment: ['Afegeix un exemple d’evidència per a cada nivell.', 'Fes una versió per a l’alumnat, amb llenguatge senzill, per a l’autoavaluació.'],
    adaptation: ['Comprova que totes les versions mantenen el mateix objectiu.', 'Afegeix un glossari amb les paraules més difícils.'],
    communication: ['Fes-ho més proper i redueix l’extensió a la meitat.', 'Prepara també la versió en castellà.'],
    visual: ['Simplifica la composició i augmenta el contrast.', 'Proposa tres variants d’estil per triar.'],
    game: ['El fitxer no funciona bé: revisa els errors de JavaScript i torna’l complet.', 'Afegeix 10 elements més amb la mateixa estructura de dades.', 'Fes els botons més grans per fer-lo servir en pantalla tàctil.'],
    package: ['Comprova que el paquet compleix l’estàndard i explica com importar-lo a Moodle.', 'Afegeix 5 preguntes més de dificultat creixent.']
  },
  en: {
    common: ['Make it shorter and more specific without losing the essentials.', 'Review your answer: point out errors, doubtful data and assumptions I should check.', 'Add a version with more visual and language support for those who need it.'],
    planning: ['Set out the timing session by session.', 'Add how I will assess each objective and with which tool.'],
    assessment: ['Add an example of evidence for each level.', 'Write a learner-friendly version in plain language for self-assessment.'],
    adaptation: ['Check that every version keeps the same objective.', 'Add a glossary with the hardest words.'],
    communication: ['Make it warmer and cut it to half the length.', 'Also prepare a Spanish version.'],
    visual: ['Simplify the composition and increase the contrast.', 'Suggest three style variants to choose from.'],
    game: ['The file does not work properly: check the JavaScript errors and return it in full.', 'Add 10 more items with the same data structure.', 'Make the buttons bigger for touch screens.'],
    package: ['Check that the package follows the standard and explain how to import it into Moodle.', 'Add 5 more questions of increasing difficulty.']
  }
}

const groupByCategory: Record<string, FollowUpGroup> = { planning: 'planning', activities: 'planning', assessment: 'assessment', adaptation: 'adaptation', content: 'adaptation', communication: 'communication', visual: 'visual', digital: 'package' }

export function followUps(templateId: string, category: string, language: Language): string[] {
  const texts = followUpTexts[language]
  const group: FollowUpGroup | undefined = templateId === 'html-game' ? 'game' : templateId === 'free' ? undefined : groupByCategory[category]
  return [...(group ? texts[group] : []), ...texts.common]
}
