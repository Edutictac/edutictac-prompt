import { useState } from 'react'
import type { Category } from '../types'

export function SaveModal({
  t,
  categories,
  onCancel,
  onSave,
}: {
  t: Record<string, string>
  categories: Category[]
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
  const [title, setTitle] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [categoryName, setCategoryName] = useState('')
  const [tags, setTags] = useState('')
  const [notes, setNotes] = useState('')
  const [favorite, setFavorite] = useState(false)
  return (
    <div className="modal-backdrop">
      <form
        className="modal"
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
          <h2>{t.save}</h2>
          <button type="button" onClick={onCancel}>
            ×
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
        <div className="modal-actions">
          <button type="button" className="secondary" onClick={onCancel}>
            {t.cancel}
          </button>
          <button className="primary">{t.confirm}</button>
        </div>
      </form>
    </div>
  )
}
