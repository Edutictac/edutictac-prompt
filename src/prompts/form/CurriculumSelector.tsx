import { getCurriculumElements, joinCurriculumSelection, parseCurriculumSelection } from '../../curriculum'
import type { Language } from '../../types'

export function CurriculumElementsSelector({
  t,
  language,
  values,
  setValues,
}: {
  t: Record<string, string>
  language: Language
  values: Record<string, string>
  setValues: (v: Record<string, string>) => void
}) {
  const elements = getCurriculumElements(values.curriculumProfile || '', values.level, values.subject, language)
  if (!elements)
    return values.level && (values.curriculumProfile || values.subject) ? (
      <div className="curriculum-elements-group">
        <p className="eyebrow">{t.curriculumElements}</p>
        <small>{t.curriculumEmpty}</small>
      </div>
    ) : null
  const select = (
    key: 'curriculumCompetences' | 'curriculumCriteria' | 'curriculumKnowledge',
    label: string,
    options: string[],
  ) => {
    const selected = parseCurriculumSelection(values[key] || '', options)
    return (
      <fieldset className="curriculum-elements">
        <legend>{label}</legend>
        <div className="curriculum-options">
          {options.map((option) => (
            <label className="curriculum-option" key={option}>
              <input
                type="checkbox"
                checked={selected.includes(option)}
                onChange={(e) => {
                  const next = e.target.checked ? [...selected, option] : selected.filter((item) => item !== option)
                  setValues({ ...values, [key]: joinCurriculumSelection(next) })
                }}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </fieldset>
    )
  }
  return (
    <div className="curriculum-elements-group">
      <p className="eyebrow">{t.curriculumElements}</p>
      <small>{t.curriculumElementsHint}</small>
      {select('curriculumCompetences', t.specificCompetences, elements.specificCompetences)}
      {select('curriculumCriteria', t.assessmentCriteria, elements.assessmentCriteria)}
      {select('curriculumKnowledge', t.basicKnowledge, elements.basicKnowledge)}
    </div>
  )
}
