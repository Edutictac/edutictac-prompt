import { useId } from 'react'
import type { Language } from '../types'
import { agentStages, type AgentDraft } from '../skills/agents'
import { languages } from '../skills/types'
import { skillLocales } from '../skills/locales'
import { agentLocales } from '../skills/agentLocales'
import { wizardLocales } from './locales'
import { basicLocales } from './basicLocales'
import { subjectSuggestions } from './presets'

export default function BasicAgentFields({
  draft,
  language,
  onChange,
}: {
  draft: AgentDraft
  language: Language
  onChange: <K extends keyof AgentDraft>(key: K, value: AgentDraft[K]) => void
}) {
  const b = basicLocales[language],
    w = wizardLocales[language],
    t = agentLocales[language]
  const id = useId()
  const audiences = [b.teacher, b.team, b.learners]
  return (
    <>
      <h3>{b.adapt}</h3>
      <div className="skill-fields">
        <label>
          {w.stage}
          <select
            value={draft.stage}
            onChange={(e) =>
              onChange('stage', e.target.value as AgentDraft['stage'])
            }
          >
            {agentStages.map((stage) => (
              <option key={stage} value={stage}>
                {w[`stage_${stage}`]}
              </option>
            ))}
          </select>
        </label>
        <label>
          {w.subject}
          <input
            list={id}
            value={draft.subject}
            maxLength={200}
            onChange={(e) => onChange('subject', e.target.value)}
          />
        </label>
        <datalist id={id}>
          {subjectSuggestions(draft.stage, language).map((subject) => (
            <option key={subject} value={subject} />
          ))}
        </datalist>
      </div>
      <label>
        {b.purpose}
        <textarea
          required
          rows={3}
          maxLength={2000}
          value={draft.purpose}
          onChange={(e) => onChange('purpose', e.target.value)}
        />
      </label>
      <label>
        {b.audience}
        <select
          value={draft.audience}
          onChange={(e) => onChange('audience', e.target.value)}
        >
          {!audiences.includes(draft.audience) && (
            <option value={draft.audience}>
              {draft.audience || b.customAudience}
            </option>
          )}
          {audiences.map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </select>
      </label>
      <label>
        {b.context}
        <small>{b.contextHint}</small>
        <textarea
          rows={2}
          maxLength={200}
          value={draft.course}
          onChange={(e) => onChange('course', e.target.value)}
        />
      </label>
      {draft.rubricApproach !== undefined && (
        <label>
          {b.curriculum}
          <small>{b.curriculumHint}</small>
          <select
            value={draft.rubricApproach}
            onChange={(e) =>
              onChange(
                'rubricApproach',
                e.target.value as AgentDraft['rubricApproach'],
              )
            }
          >
            <option value="curricular">{b.official}</option>
            <option value="draft">{b.draft}</option>
          </select>
        </label>
      )}
      <details>
        <summary>{b.optional}</summary>
        <label>
          {t.name}
          <input
            required
            maxLength={30}
            value={draft.name}
            onChange={(e) => onChange('name', e.target.value)}
          />
        </label>
        <label>
          {w.instructionLanguage}
          <select
            value={draft.instructionLanguage}
            onChange={(e) =>
              onChange('instructionLanguage', e.target.value as Language)
            }
          >
            {languages.map((l) => (
              <option key={l} value={l}>
                {skillLocales[language][`lang_${l}`]}
              </option>
            ))}
          </select>
        </label>
        <label>
          {t.responseLanguage}
          <select
            value={draft.responseLanguage}
            onChange={(e) =>
              onChange(
                'responseLanguage',
                e.target.value as AgentDraft['responseLanguage'],
              )
            }
          >
            <option value="auto">{w.autoLanguage}</option>
            {languages.map((l) => (
              <option key={l} value={l}>
                {skillLocales[language][`lang_${l}`]}
              </option>
            ))}
          </select>
        </label>
      </details>
      <p className="mode-hint">{b.preserved}</p>
      <p className="mode-hint">{b.reviewLearners}</p>
    </>
  )
}
