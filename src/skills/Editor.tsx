import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import {
  categories,
  languages,
  parameterTypes,
  stages,
  type Parameter,
  type SkillDefinition,
  type Value,
} from './types'
import { slugify } from './model'
import { skillLocales } from './locales'
import type { Language } from '../types'
export function Markdown({ text }: { text: string }) {
  return (
    <div className="skill-markdown">
      <ReactMarkdown
        skipHtml
        components={{
          img: () => null,
          a: ({ children }) => <span>{children}</span>,
        }}
      >
        {text}
      </ReactMarkdown>
    </div>
  )
}
export default function Editor({
  initial,
  language,
  onSave,
  onCancel,
}: {
  initial: SkillDefinition
  language: Language
  onSave: (d: SkillDefinition) => Promise<void>
  onCancel: () => void
}) {
  const t = skillLocales[language],
    [d, setD] = useState(initial),
    [preview, setPreview] = useState(false),
    [busy, setBusy] = useState(false)
  const set = <K extends keyof SkillDefinition>(
    key: K,
    value: SkillDefinition[K],
  ) => setD({ ...d, [key]: value })
  const text = (
    key:
      | 'name'
      | 'slug'
      | 'description'
      | 'author'
      | 'license'
      | 'version'
      | 'instructions'
      | 'outputFormat'
      | 'requirements'
      | 'restrictions',
    area = false,
  ) => (
    <label>
      {t[key]}
      {area ? (
        <textarea
          required={['description', 'instructions'].includes(key)}
          rows={key === 'instructions' ? 12 : 3}
          value={d[key]}
          onChange={(e) => set(key, e.target.value)}
        />
      ) : (
        <input
          required={[
            'name',
            'slug',
            'license',
            'version',
            'outputFormat',
          ].includes(key)}
          value={d[key]}
          onChange={(e) =>
            setD({
              ...d,
              [key]: e.target.value,
              ...(key === 'name' && (!d.slug || d.slug === slugify(d.name))
                ? { slug: slugify(e.target.value) }
                : {}),
            })
          }
        />
      )}
    </label>
  )
  const updateParameter = (i: number, p: Parameter) =>
    set(
      'parameters',
      d.parameters.map((v, n) => (n === i ? p : v)),
    )
  const typeLabels = {
    text: t.shortText,
    textarea: t.longText,
    number: t.number,
    select: t.select,
    multiselect: t.multiselect,
    boolean: t.boolean,
  }
  return (
    <form
      className="skill-editor"
      onSubmit={async (e) => {
        e.preventDefault()
        setBusy(true)
        try {
          await onSave(d)
        } finally {
          setBusy(false)
        }
      }}
    >
      <div className="skill-fields">
        {text('name')}
        {text('slug')}
        {text('description', true)}
        <label>
          {t.category}
          <select
            value={d.category}
            onChange={(e) =>
              set('category', e.target.value as SkillDefinition['category'])
            }
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {t[`cat_${c}`]}
              </option>
            ))}
          </select>
        </label>
        <label>
          {t.tags}
          <input
            value={d.tags.join(', ')}
            onChange={(e) =>
              set(
                'tags',
                e.target.value.split(',').map((v) => v.trim()),
              )
            }
          />
        </label>
        <label>
          {t.language}
          <select
            value={d.language}
            onChange={(e) => set('language', e.target.value as Language)}
          >
            {languages.map((l) => (
              <option key={l} value={l}>
                {t[`lang_${l}`]}
              </option>
            ))}
          </select>
        </label>
        <label>
          {t.stage}
          <select
            value={d.stage}
            onChange={(e) =>
              set('stage', e.target.value as SkillDefinition['stage'])
            }
          >
            {stages.map((s) => (
              <option key={s} value={s}>
                {t[`stage_${s}`]}
              </option>
            ))}
          </select>
        </label>
        {text('author')}
        {text('license')}
        {text('version')}
      </div>
      <h2>{t.instructions}</h2>
      {text('instructions', true)}
      <button
        type="button"
        className="secondary"
        aria-expanded={preview}
        onClick={() => setPreview(!preview)}
      >
        {t.preview}
      </button>
      {preview && <Markdown text={d.instructions} />}
      <h2>{t.parameters}</h2>
      {d.parameters.map((p, i) => (
        <fieldset key={i}>
          <legend>{p.name || `${t.parameters} ${i + 1}`}</legend>
          <div className="skill-fields">
            <label>
              {t.name}
              <input
                required
                value={p.name}
                onChange={(e) =>
                  updateParameter(i, { ...p, name: e.target.value })
                }
              />
            </label>
            <label>
              {t.id}
              <input
                required
                pattern="[a-z][a-z0-9_]{0,39}"
                value={p.id}
                onChange={(e) =>
                  updateParameter(i, { ...p, id: e.target.value })
                }
              />
            </label>
            <label>
              {t.type}
              <select
                value={p.type}
                onChange={(e) =>
                  updateParameter(i, {
                    ...p,
                    type: e.target.value as Parameter['type'],
                    defaultValue: undefined,
                  })
                }
              >
                {parameterTypes.map((type) => (
                  <option key={type} value={type}>
                    {typeLabels[type]}
                  </option>
                ))}
              </select>
            </label>
            <label>
              {t.help}
              <input
                value={p.description}
                onChange={(e) =>
                  updateParameter(i, { ...p, description: e.target.value })
                }
              />
            </label>
          </div>
          <label className="check">
            <input
              type="checkbox"
              checked={p.required}
              onChange={(e) =>
                updateParameter(i, { ...p, required: e.target.checked })
              }
            />
            {t.mandatory}
          </label>
          {['select', 'multiselect'].includes(p.type) && (
            <label>
              {t.options}
              <textarea
                value={p.options.join('\n')}
                onChange={(e) =>
                  updateParameter(i, {
                    ...p,
                    options: e.target.value.split('\n'),
                  })
                }
              />
            </label>
          )}
          <ParameterInput
            parameter={{ ...p, name: t.defaultValue, required: false }}
            value={
              p.defaultValue ??
              (p.type === 'boolean'
                ? false
                : p.type === 'multiselect'
                  ? []
                  : '')
            }
            onChange={(value) =>
              updateParameter(i, {
                ...p,
                defaultValue: value === '' ? undefined : value,
              })
            }
          />
          <div className="skill-fields">
            {(p.type === 'number'
              ? (['min', 'max'] as const)
              : p.type === 'text' || p.type === 'textarea'
                ? (['maxLength'] as const)
                : []
            ).map((k) => (
              <label key={k}>
                {t[k]}
                <input
                  type="number"
                  value={p[k] ?? ''}
                  onChange={(e) =>
                    updateParameter(i, {
                      ...p,
                      [k]:
                        e.target.value === ''
                          ? undefined
                          : Number(e.target.value),
                    })
                  }
                />
              </label>
            ))}
          </div>
          <button
            type="button"
            onClick={() =>
              set(
                'parameters',
                d.parameters.filter((_, n) => n !== i),
              )
            }
          >
            {t.deleteItem}
          </button>
        </fieldset>
      ))}
      <button
        type="button"
        className="secondary"
        onClick={() =>
          set('parameters', [
            ...d.parameters,
            {
              id: `input_${d.parameters.length + 1}`,
              name: '',
              type: 'text',
              required: false,
              description: '',
              options: [],
            },
          ])
        }
      >
        {t.add} · {t.parameters}
      </button>
      <h2>{t.procedure}</h2>
      <label>
        {t.procedure}
        <textarea
          rows={5}
          value={d.procedure.join('\n')}
          onChange={(e) => set('procedure', e.target.value.split('\n'))}
        />
      </label>
      <h2>{t.resources}</h2>
      <p>{t.resourceHint}</p>
      {d.resources.map((r, i) => (
        <fieldset key={i}>
          <label>
            {t.path}
            <input
              required
              value={r.path}
              onChange={(e) =>
                set(
                  'resources',
                  d.resources.map((v, n) =>
                    n === i ? { ...v, path: e.target.value } : v,
                  ),
                )
              }
            />
          </label>
          <label>
            {t.content}
            <textarea
              rows={5}
              value={r.content}
              onChange={(e) =>
                set(
                  'resources',
                  d.resources.map((v, n) =>
                    n === i ? { ...v, content: e.target.value } : v,
                  ),
                )
              }
            />
          </label>
          <button
            type="button"
            onClick={() =>
              set(
                'resources',
                d.resources.filter((_, n) => n !== i),
              )
            }
          >
            {t.deleteItem}
          </button>
        </fieldset>
      ))}
      <button
        type="button"
        className="secondary"
        onClick={() =>
          set('resources', [
            ...d.resources,
            {
              path: `references/resource-${d.resources.length + 1}.md`,
              content: '',
            },
          ])
        }
      >
        {t.add} · {t.resources}
      </button>
      <h2>{t.examples}</h2>
      {d.examples.map((ex, i) => (
        <fieldset key={i}>
          <label>
            {t.language}
            <select
              value={ex.language}
              onChange={(e) =>
                set(
                  'examples',
                  d.examples.map((v, n) =>
                    n === i
                      ? { ...v, language: e.target.value as Language }
                      : v,
                  ),
                )
              }
            >
              {languages.map((l) => (
                <option value={l} key={l}>
                  {t[`lang_${l}`]}
                </option>
              ))}
            </select>
          </label>
          {(['input', 'output'] as const).map((k) => (
            <label key={k}>
              {t[k]}
              <textarea
                required
                rows={3}
                value={ex[k]}
                onChange={(e) =>
                  set(
                    'examples',
                    d.examples.map((v, n) =>
                      n === i ? { ...v, [k]: e.target.value } : v,
                    ),
                  )
                }
              />
            </label>
          ))}
          <button
            type="button"
            onClick={() =>
              set(
                'examples',
                d.examples.filter((_, n) => n !== i),
              )
            }
          >
            {t.deleteItem}
          </button>
        </fieldset>
      ))}
      <button
        type="button"
        className="secondary"
        onClick={() =>
          set('examples', [...d.examples, { language, input: '', output: '' }])
        }
      >
        {t.add} · {t.examples}
      </button>
      <h2>{t.outputFormat}</h2>
      {text('outputFormat')}
      <label>
        {t.mode}
        <select
          value={d.mode}
          onChange={(e) =>
            set('mode', e.target.value as SkillDefinition['mode'])
          }
        >
          <option value="instructions">{t.instructionsMode}</option>
          <option value="external">{t.externalMode}</option>
        </select>
      </label>
      {text('requirements')}
      {text('restrictions', true)}
      <div className="actions">
        <button className="primary" disabled={busy}>
          {busy ? t.busy : t.save}
        </button>
        <button type="button" className="secondary" onClick={onCancel}>
          {t.cancel}
        </button>
      </div>
    </form>
  )
}
export function ParameterInput({
  parameter: p,
  value,
  onChange,
}: {
  parameter: Parameter
  value: Value
  onChange: (v: Value) => void
}) {
  if (p.type === 'boolean')
    return (
      <label className="check">
        <input
          type="checkbox"
          checked={value === true}
          onChange={(e) => onChange(e.target.checked)}
        />
        {p.name}
        <small>{p.description}</small>
      </label>
    )
  if (p.type === 'multiselect')
    return (
      <fieldset>
        <legend>
          {p.name}
          {p.required ? ' *' : ''}
        </legend>
        <p>{p.description}</p>
        {p.options.map((o) => (
          <label className="check" key={o}>
            <input
              type="checkbox"
              checked={Array.isArray(value) && value.includes(o)}
              onChange={(e) =>
                onChange(
                  e.target.checked
                    ? [...(Array.isArray(value) ? value : []), o]
                    : (Array.isArray(value) ? value : []).filter(
                        (v) => v !== o,
                      ),
                )
              }
            />
            {o}
          </label>
        ))}
      </fieldset>
    )
  return (
    <label>
      {p.name}
      {p.required ? ' *' : ''}
      <small>{p.description}</small>
      {p.type === 'textarea' ? (
        <textarea
          required={p.required}
          maxLength={p.maxLength || 20000}
          value={String(value)}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : p.type === 'select' ? (
        <select
          required={p.required}
          value={String(value)}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="">—</option>
          {p.options.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      ) : (
        <input
          required={p.required}
          type={p.type === 'number' ? 'number' : 'text'}
          step={p.type === 'number' ? 'any' : undefined}
          min={p.min}
          max={p.max}
          maxLength={p.maxLength || 20000}
          value={String(value)}
          onChange={(e) =>
            onChange(
              p.type === 'number' && e.target.value !== ''
                ? Number(e.target.value)
                : e.target.value,
            )
          }
        />
      )}
    </label>
  )
}
