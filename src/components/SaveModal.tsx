import { useState } from 'react'
import { useDialogFocus } from './useDialogFocus'
import type { Category, SavedPrompt } from '../types'

export function SaveModal({
  t,
  categories,
  onCancel,
  onSave,
  initial,
  error,
}: {
  t: Record<string, string>
  categories: Category[]
  initial?: SavedPrompt
  error?: string
  onCancel: () => void
  onSave: (x: {
    title: string
    categoryId?: string
    categoryName?: string
    tags: string[]
    notes: string
    favorite: boolean
  }) => void
}) {
  const [title, setTitle] = useState(initial?.title || '')
  const [categoryId, setCategoryId] = useState(initial?.categoryId || '')
  const [categoryName, setCategoryName] = useState('')
  const [tags, setTags] = useState(initial?.tags.join(', ') || '')
  const [notes, setNotes] = useState(initial?.notes || '')
  const [favorite, setFavorite] = useState(initial?.favorite || false)
  const dialogRef = useDialogFocus<HTMLFormElement>(onCancel)
  return (
    <div className="modal-backdrop">
      <form
        ref={dialogRef}
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="save-dialog-title"
        onSubmit={(e) => {
          e.preventDefault()
          onSave({
            title,
            categoryId: categoryId || undefined,
            categoryName,
            tags: tags
              .split(',')
              .map((x) => x.trim())
              .filter(Boolean),
            notes,
            favorite,
          })
        }}
      >
        <div className="modal-head">
          <h2 id="save-dialog-title">{initial ? t.editDetails : t.save}</h2>
          <button type="button" onClick={onCancel} aria-label={t.close}>
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <label>
          {t.title}
          <input
            autoFocus
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={t.titlePlaceholder}
            required
          />
        </label>
        <label>
          {t.category}
          <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
            <option value="">—</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          <input
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder={t.newCategoryPlaceholder}
          />
        </label>
        <label>
          {t.tags}
          <input value={tags} onChange={(e) => setTags(e.target.value)} placeholder={t.tagsPlaceholder} />
        </label>
        <label>
          {t.notes}
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
        </label>
        <label className="check">
          <input type="checkbox" checked={favorite} onChange={(e) => setFavorite(e.target.checked)} />
          {t.favorite}
        </label>
        {error && (
          <p className="warning" role="alert">
            {error}
          </p>
        )}
        <div className="modal-actions">
          <button type="button" className="secondary" onClick={onCancel}>
            {t.cancel}
          </button>
          <button className="primary">{initial ? t.saveChanges : t.confirm}</button>
        </div>
      </form>
    </div>
  )
}
