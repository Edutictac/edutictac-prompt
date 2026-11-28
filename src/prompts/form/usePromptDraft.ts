import { useEffect, useState } from 'react'
import { templates } from '../../templates'
import type { Language, SavedPrompt } from '../../types'
import { preferredInitialValues } from './defaultFormat'
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
  const [values, setValues] = useState<Record<string, string>>(() => ({
    ...preferredInitialValues(first.id),
    ...initialShared,
  }))
  const [prompt, setPrompt] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)

  useEffect(() => {
    const applyRemote = (event: Event) => {
      const detail = (event as CustomEvent<{ format: string; source: string; previous: string }>).detail
      if (detail.source !== 'remote' || editingId) return
      const formats = selected.fields.find((field) => field.id === 'outputFormat')?.options || []
      const oldDefault = formats.includes(detail.previous) ? detail.previous : initialValues(selected.id).outputFormat
      const nextDefault = formats.includes(detail.format) ? detail.format : initialValues(selected.id).outputFormat
      setValues((current) =>
        current.outputFormat === oldDefault ? { ...current, outputFormat: nextDefault } : current,
      )
    }
    window.addEventListener('prompt:default-format', applyRemote)
    return () => window.removeEventListener('prompt:default-format', applyRemote)
  }, [selected, editingId])

  const choose = (id: string, preset: Record<string, string> = {}) => {
    const template = templates.find((item) => item.id === id)!
    setSelected(template)
    setValues({ ...preferredInitialValues(template.id), ...preset })
    setPrompt('')
    setEditingId(null)
  }
  const restore = (snapshot: {
    templateId: string
    values: Record<string, string>
    prompt: string
    editingId: string | null
  }) => {
    const template = templates.find((item) => item.id === snapshot.templateId)
    if (!template) return
    setSelected(template)
    setValues(snapshot.values)
    setPrompt(snapshot.prompt)
    setEditingId(snapshot.editingId)
  }
  const open = (item: SavedPrompt) => {
    const template = templates.find((candidate) => candidate.id === item.templateId)
    if (!template) return false
    setSelected(template)
    setValues(item.values || preferredInitialValues(template.id))
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
    setValues(preferredInitialValues(selected.id))
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
    restore,
    open,
    generate,
    clear,
  }
}
