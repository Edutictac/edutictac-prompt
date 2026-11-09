import { suggestionsFor } from '../../suggestions'
import { localizeOption } from '../../optionLocales'
import type { Language, TemplateField } from '../../types'
import { getFieldName, getFieldPlaceholder } from './labels'

export function FieldControl({
  field,
  t,
  language,
  values,
  setValues,
  templateId,
}: {
  field: TemplateField
  t: Record<string, string>
  language: Language
  values: Record<string, string>
  setValues: (v: Record<string, string>) => void
  templateId: string
}) {
  const Field = field.type === 'multiselect' ? 'div' : 'label'
  return (
    <Field className="form-field">
      {getFieldName(field.id, t)}
      {field.id === 'topic' && <small>{t.topicHint}</small>}
      {field.id === 'udl' && <small>{t.udlHint}</small>}
      {field.id === 'barriers' && <small>{t.barriersHint}</small>}
      {field.type === 'textarea' ? (
        <textarea
          value={values[field.id] || ''}
          placeholder={getFieldPlaceholder(field.id, t, templateId)}
          onChange={(e) => setValues({ ...values, [field.id]: e.target.value })}
          rows={3}
        />
      ) : field.type === 'multiselect' ? (
        <span className="chip-group" role="group" aria-label={getFieldName(field.id, t)}>
          {field.options?.map((o) => {
            const chosen = (values[field.id] || '').split(' · ').filter(Boolean)
            const on = chosen.includes(o)
            return (
              <button
                type="button"
                key={o}
                className={`chip${on ? ' active' : ''}`}
                aria-pressed={on}
                onClick={(e) => {
                  e.preventDefault()
                  const next = field.options!.filter((x) => (x === o ? !on : chosen.includes(x)))
                  setValues({ ...values, [field.id]: next.join(' · ') })
                }}
              >
                {on ? '✓ ' : ''}
                {localizeOption(o, language)}
              </button>
            )
          })}
        </span>
      ) : field.type === 'select' ? (
        <select value={values[field.id] || ''} onChange={(e) => setValues({ ...values, [field.id]: e.target.value })}>
          <option value="">—</option>
          {field.options?.map((o) => (
            <option key={o} value={o}>
              {localizeOption(o, language)}
            </option>
          ))}
        </select>
      ) : (
        <input
          value={values[field.id] || ''}
          placeholder={getFieldPlaceholder(field.id, t, templateId)}
          onChange={(e) => setValues({ ...values, [field.id]: e.target.value })}
        />
      )}
      {suggestionsFor(field.id, language, values.level).length > 0 && (
        <span className="suggestions">
          {suggestionsFor(field.id, language, values.level).map((sg) => (
            <button
              type="button"
              key={sg}
              onClick={(e) => {
                e.preventDefault()
                const cur = (values[field.id] || '').trim()
                setValues({ ...values, [field.id]: cur && field.id !== 'topic' ? `${cur}; ${sg}` : sg })
              }}
            >
              {sg}
            </button>
          ))}
        </span>
      )}
    </Field>
  )
}
