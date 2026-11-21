import { useState } from 'react'
import { templates } from '../../templates'
import type { Language, SavedPrompt } from '../../types'
import { initialValues } from './values'

// Borrador compartido por Paso a paso y Avanzado: los modos cambian la
// presentación, nunca los valores ni el prompt generado.
export const loadGenerator = () => import('../../generator')

export function usePromptDraft(
  language: Language,
  initialTemplateId?: string,
  initialShared: Record<string, string> = {},
) {
  const first = templates.find((item) => item.id === initialTemplateId) ?? templates[0]
  const [selected, setSelected] = useState(first)
  const [values, setValues] = useState<Record<string, string>>(() => ({ ...initialValues(first.id), ...initialShared }))
  const [prompt, setPrompt] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)

  const choose = (id: string, preset: Record<string, string> = {}) => {
    const template = templates.find((item) => item.id === id)!
    setSelected(template)
    setValues({ ...initialValues(template.id), ...preset })
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
  // El generador (con todos sus textos) se carga aparte la primera vez; la
  // pantalla de crear lo precarga al abrirse, así que en la práctica es inmediato.
  const generate = async () => {
    const { generatePrompt } = await loadGenerator()
    setPrompt(generatePrompt(selected, values, language))
  }
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
    open,
    generate,
    clear,
  }
}
