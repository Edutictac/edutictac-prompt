import { localizeOption } from '../../optionLocales'
import type { GuidedStep } from '../../guided'
import type { Language, PromptTemplate } from '../../types'
import { getFieldName } from './labels'

const guidedKey = (block: string) => `guided${block[0].toUpperCase()}${block.slice(1)}`
export const stepTitle = (step: GuidedStep, t: Record<string, string>) =>
  step.block ? t[guidedKey(step.block)] || step.id : getFieldName(step.fields[0], t)
export const stepHelp = (step: GuidedStep, t: Record<string, string>) =>
  step.block ? t[`${guidedKey(step.block)}Help`] || '' : ''

export function GuidedSummary({
  t,
  language,
  selected,
  values,
  steps,
  onEdit,
}: {
  t: Record<string, string>
  language: Language
  selected: PromptTemplate
  values: Record<string, string>
  steps: GuidedStep[]
  onEdit: (index: number) => void
}) {
  const rows = steps.map((step, index) => ({
    step,
    index,
    items: step.fields.map((id) => {
      const field = selected.fields.find((item) => item.id === id)!
      const raw = (values[id] || '').trim()
      const value = !raw
        ? ''
        : field.options
          ? raw
              .split(' · ')
              .filter(Boolean)
              .map((option) => localizeOption(option, language))
              .join(' · ')
          : raw
      return { name: getFieldName(id, t), value }
    }),
  }))
  const missing: string[] = []
  if (selected.fields.some((field) => field.id === 'level') && !values.level) missing.push(getFieldName('level', t))
  if (selected.fields.some((field) => field.id === 'topic') && !values.topic) missing.push(getFieldName('topic', t))
  if (selected.fields.some((field) => field.id === 'task') && !values.task) missing.push(getFieldName('task', t))
  return (
    <section className="guided-step guided-summary">
      <h2 className="guided-title">{t.summaryTitle}</h2>
      <p className="guided-help">{t.summaryHelp}</p>
      {missing.length > 0 && (
        <p className="guided-missing">{t.summaryMissing.replace('{fields}', missing.join(', '))}</p>
      )}
      <div className="summary-list">
        {rows.map((row) => (
          <div className="summary-row" key={row.step.id}>
            <div className="summary-head">
              <strong>{stepTitle(row.step, t)}</strong>
              <button type="button" className="summary-edit" onClick={() => onEdit(row.index)}>
                {t.edit}
              </button>
            </div>
            {row.items.some((item) => item.value) ? (
              <dl>
                {row.items
                  .filter((item) => item.value)
                  .map((item) => (
                    <div key={item.name}>
                      <dt>{item.name}</dt>
                      <dd>{item.value}</dd>
                    </div>
                  ))}
              </dl>
            ) : (
              <p className="summary-empty">{t.summaryEmpty}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
