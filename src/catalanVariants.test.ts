import { describe, expect, it } from 'vitest'
import { translations } from './locales'
import { templates } from './templates'
import { generatePrompt } from './generator'
import { exampleValues } from './examples'
import { initialValues } from './prompts/form/values'
import { localizeOption } from './optionLocales'
import { templateTips } from './templateTips'
import { helpGuide } from './help'
import { followUps } from './followUps'
import { fieldSuggestions, levelSuggestions } from './suggestions'
import { skillLocales } from './skills/locales'
import { agentLocales } from './skills/agentLocales'
import { wizardLocales } from './agents/locales'
import type { Language } from './types'

// El catalán central («ca») y el valenciano («ca-valencia») comparten muchos
// textos. Esta prueba recorre todo lo que ve la persona usuaria en las dos
// variantes (interfaz, opciones, pistas, ayuda, agentes y los prompts de todas
// las herramientas) y falla si aparece una forma exclusiva de la otra variante.
// Un texto compartido debe usar formas válidas en las dos.

// Formas solo valencianas: no pueden aparecer en «ca».
export const valencianOnly = [
  'este',
  'esta',
  'estos',
  'estes',
  'eixe',
  'eixa',
  'eixos',
  'eixes',
  'ferramenta',
  'ferramentes',
  'servici',
  'servicis',
  'meua',
  'teua',
  'seua',
  'meues',
  'teues',
  'seues',
  'haja',
  'hajen',
  'puga',
  'puguen',
  'siga',
  'siguen',
  'tinga',
  'tinguen',
  'depenga',
  'depenguen',
  'oferix',
  'oferixen',
  'aclarix',
  'compartix',
  'imprimix',
  'afegix',
  'servix',
  'permetix',
  'introduïx',
  'mantín',
  'aprén',
  'depén',
  'anglés',
  'francés',
  'estrés',
  'reforce',
  'distraguen',
  'genere',
  'veges',
  'entenguen',
  'faça',
  'facen',
  'isquen',
  'vullga',
  'vullguen',
  'càpiga',
  'càpiguen',
  'conega',
  'coneguen',
  'pertanga',
  'pertanguen',
  'convinga',
  'mostre',
  'ajude',
]
// Formas solo del catalán central: no pueden aparecer en «ca-valencia».
export const centralOnly = [
  'hagi',
  'hagin',
  'pugui',
  'puguin',
  'sigui',
  'siguin',
  'tingui',
  'tinguin',
  'depengui',
  'depenguin',
  'meva',
  'teva',
  'seva',
  'meves',
  'teves',
  'seves',
  'servei',
  'ofereix',
  'ofereixen',
  'aclareix',
  'comparteix',
  'imprimeix',
  'afegeix',
  'serveix',
  'introdueix',
  'aprèn',
  'depèn',
  'anglès',
  'francès',
  'estrès',
  'reforci',
  'distreguin',
  'generi',
  'vegis',
  'entenguin',
  'faci',
  'facin',
  'surtin',
  'vulgui',
  'vulguin',
  'càpiguin',
  'conegui',
  'coneguin',
  'pertanyi',
  'pertanyin',
  'convingui',
  'mostri',
  'mostrin',
  'ajudi',
  'ajudin',
]

const strings = (value: unknown, out: string[] = []): string[] => {
  if (typeof value === 'string') out.push(value)
  else if (typeof value === 'function') {
    try {
      strings((value as (...args: string[]) => unknown)('X', 'X', 'X'), out)
    } catch {
      /* Funciones que no son de texto. */
    }
  } else if (Array.isArray(value)) value.forEach((item) => strings(item, out))
  else if (value && typeof value === 'object') Object.values(value).forEach((item) => strings(item, out))
  return out
}

function textsFor(language: Language): string[] {
  const out: string[] = []
  strings(translations[language], out)
  strings(templateTips[language], out)
  strings(helpGuide(language), out)
  strings(skillLocales[language], out)
  strings(agentLocales[language], out)
  strings(wizardLocales[language], out)
  for (const field of Object.values(fieldSuggestions)) strings(field[language], out)
  for (const byLevel of Object.values(levelSuggestions))
    for (const field of Object.values(byLevel)) strings(field[language], out)
  for (const template of templates) {
    for (const field of template.fields)
      for (const option of field.options || []) out.push(localizeOption(option, language))
    out.push(generatePrompt(template, initialValues(template.id), language))
    out.push(
      generatePrompt(template, { ...initialValues(template.id), ...exampleValues(template.id, language) }, language),
    )
    strings(followUps(template.id, template.category, language), out)
  }
  return out
}

// Términos fijos que se escriben igual en las dos variantes (nombres oficiales).
const fixedTerms = [/aprenentatge[ -]servei/giu]

function findForms(texts: string[], forms: string[]) {
  texts = texts.map((text) => fixedTerms.reduce((clean, term) => clean.replace(term, ''), text))
  const pattern = new RegExp(`(?<![\\p{L}’'-])(${forms.join('|')})(?![\\p{L}’'])`, 'giu')
  const found = new Set<string>()
  for (const text of texts)
    for (const match of text.matchAll(pattern))
      found.add(
        `${match[1].toLowerCase()} → …${text.slice(Math.max(0, match.index! - 40), match.index! + 40).replace(/\s+/g, ' ')}…`,
      )
  return [...found]
}

describe('variantes del catalán', () => {
  it('el catalán central no usa formas exclusivas del valenciano', () => {
    expect(findForms(textsFor('ca'), valencianOnly)).toEqual([])
  })

  it('el valenciano no usa formas exclusivas del catalán central', () => {
    expect(findForms(textsFor('ca-valencia'), centralOnly)).toEqual([])
  })
})
