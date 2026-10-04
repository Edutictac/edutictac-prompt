import { describe, expect, it } from 'vitest'
import { templates } from './templates'
import { generatePrompt } from './generator'
import { translations } from './locales'
import { localizeOption } from './optionLocales'
import { examples, exampleValues } from './examples'
import type { Language } from './types'
import app from './App.tsx?raw'

// Revisión de conjunto: cualquier plantilla o campo nuevo debe llegar al
// prompt, estar traducido y tener nombre en la interfaz en los cuatro idiomas.
const languages: Language[] = ['es', 'ca-valencia', 'ca', 'en']
const formatOf = (id: string) => templates.find(template => template.id === id)!.fields.find(field => field.id === 'outputFormat')!.options![0]
// Opciones que se escriben igual en todos los idiomas.
const sameEverywhere = new Set(['Infantil', 'Ordenar', 'Quiz', 'Robots', 'Tablets', 'Fotorrealista', 'Maqueta artesanal', 'Markdown', 'Mermaid', 'Common Cartridge', 'ChatGPT', 'Gemini', 'Claude', 'Copilot', 'Perplexity', 'Midjourney', 'Canva', 'Clasificar', '9:16 vertical'])
// Campos que el generador transforma en lugar de copiar el valor.
const transformed = new Set(['udl', 'aiTool', 'gameFeatures'])

describe('cobertura de plantillas', () => {
  it('lleva cada campo y cada opción al prompt en todos los idiomas', () => {
    const missing: string[] = []
    for (const template of templates) for (const field of template.fields) {
      if (transformed.has(field.id)) continue
      for (const language of languages) for (const option of field.options || [`MARCA-${field.id}`]) {
        const values = { outputFormat: formatOf(template.id), [field.id]: option }
        const expected = field.options ? localizeOption(option, language) : option
        if (!generatePrompt(template, values, language).includes(expected)) missing.push(`${language} ${template.id}.${field.id}=${option}`)
      }
    }
    expect(missing).toEqual([])
  })

  it('traduce todas las opciones', () => {
    const untranslated: string[] = []
    for (const template of templates) for (const field of template.fields) for (const option of field.options || []) {
      for (const language of languages.filter(item => item !== 'es')) {
        if (localizeOption(option, language) === option && /[a-z]{3}/.test(option) && !sameEverywhere.has(option)) untranslated.push(`${language} ${option}`)
      }
    }
    expect([...new Set(untranslated)]).toEqual([])
  })

  it('da nombre a las plantillas, los campos y las categorías', () => {
    const map = (name: string) => Function(`return ${new RegExp(`const ${name}: Record<string,string> = (\\{.*?\\})\\n`, 's').exec(app)![1]}`)() as Record<string,string>
    const templateNames = map('templateNameKeys'), fieldNames = map('fieldNameKeys')
    const missing: string[] = []
    for (const language of languages) {
      const t = translations[language] as Record<string,string>
      for (const template of templates) {
        if (!t[templateNames[template.id]]) missing.push(`${language} plantilla ${template.id}`)
        if (!t[template.category]) missing.push(`${language} categoría ${template.category}`)
        for (const field of template.fields) if (!t[fieldNames[field.id]]) missing.push(`${language} campo ${field.id}`)
      }
    }
    expect([...new Set(missing)]).toEqual([])
  })

  it('tiene un ejemplo válido para cada plantilla', () => {
    const problems: string[] = []
    for (const template of templates) {
      const example = examples[template.id]
      if (!example) { problems.push(`sin ejemplo: ${template.id}`); continue }
      const textKeys = Object.keys(example.es).sort().join()
      if (Object.keys(example.va).sort().join() !== textKeys || Object.keys(example.en).sort().join() !== textKeys) problems.push(`${template.id}: los idiomas no tienen los mismos campos`)
      for (const key of Object.keys(example.ca || {})) if (!(key in example.va)) problems.push(`${template.id}: ca.${key} no existe en va`)
      for (const language of languages) for (const [key, value] of Object.entries(exampleValues(template.id, language))) {
        const field = template.fields.find(item => item.id === key)
        if (!field) { problems.push(`${template.id}: campo inexistente ${key}`); continue }
        if (field.options) for (const option of value.split(' · ')) if (!field.options.includes(option)) problems.push(`${template.id}.${key}: opción no válida ${option}`)
      }
    }
    expect([...new Set(problems)]).toEqual([])
  })
})
