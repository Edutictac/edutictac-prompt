import { examples1 } from './examples/catalog1'
import { examples2 } from './examples/catalog2'
import { examples3 } from './examples/catalog3'
import { examples4 } from './examples/catalog4'
import { examples5 } from './examples/catalog5'
import type { Language } from './types'

// Ejemplos para el botón «Cargar un ejemplo». Las opciones se guardan con el
// valor original (en castellano) y se traducen al mostrarlas. Los textos se
// escriben en castellano, valenciano e inglés; el catalán central usa el texto
// valenciano y sustituye en «ca» los campos con formas propias del valenciano.
type ExampleText = Record<string, string>
export type Example = {
  options?: Record<string, string>
  es: ExampleText
  va: ExampleText
  ca?: ExampleText
  en: ExampleText
}

export const examples: Record<string, Example> = {
  ...examples1,
  ...examples2,
  ...examples3,
  ...examples4,
  ...examples5,
}

export function exampleValues(templateId: string, language: Language): Record<string, string> {
  const example = examples[templateId]
  if (!example) return {}
  const text =
    language === 'en'
      ? example.en
      : language === 'es'
        ? example.es
        : language === 'ca'
          ? { ...example.va, ...example.ca }
          : example.va
  return { ...example.options, ...text }
}
