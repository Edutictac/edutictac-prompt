import { useState } from 'react'
import { templates } from '../../templates'
import { generatePrompt } from '../../generator'
import { starterValues, type Starter } from '../../starters'
import type { Language, SavedPrompt } from '../../types'
import { initialValues } from './values'

// Borrador compartido por Sencillo, Paso a paso y Avanzado: los modos cambian la
// presentación, nunca los valores ni el prompt generado.
export function usePromptDraft(language: Language) {
  const [selected, setSelected] = useState(templates[0])
  const [values, setValues] = useState<Record<string, string>>(() => initialValues(templates[0].id))
  const [prompt, setPrompt] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)

  const choose = (id: string) => {
    const template = templates.find((item) => item.id === id)!
    setSelected(template)
    setValues(initialValues(template.id))
    setPrompt('')
    setEditingId(null)
  }
  const startFrom = (starter: Starter) => {
    const template = templates.find((item) => item.id === starter.templateId)!
    setSelected(template)
    setValues({ ...initialValues(template.id), ...starterValues(starter, language) })
    setPrompt('')
    setEditingId(null)
  }
  const open = (item: SavedPrompt) => {
    const template = templates.find((candidate) => candidate.id === item.templateId)
    if (!template) return false
    setSelected(template)
    setValues(item.values || initialValues(template.id))
    setPrompt(item.prompt)
    setEditingId(item.id)
    return true
  }
  const generate = () => setPrompt(generatePrompt(selected, values, language))
  const clear = () => {
    setValues(initialValues(selected.id))
    setPrompt('')
    setEditingId(null)
  }
  const beginEditing = (id: string) => setEditingId(id)
  const stopEditing = () => setEditingId(null)

  return {
    selected,
    values,
    setValues,
    prompt,
    setPrompt,
    editingId,
    beginEditing,
    stopEditing,
    choose,
    startFrom,
    open,
    generate,
    clear,
  }
}
