import { useId, useState } from 'react'
import type { Language } from '../types'
import type { Skill } from './types'
import { languages } from './types'
import { skillLocales } from './locales'
import { agentLocales } from './agentLocales'
import {
  agentStages,
  agentGuide,
  agentLimits,
  buildAgentConfiguration,
  defaultAgentDraft,
  type AgentConfiguration,
  type AgentDraft,
} from './agents'
import { SkillError, slugify } from './model'
import { downloadSkillFile } from './files'
import { wizardLocales } from '../agents/locales'
import { subjectSuggestions } from '../agents/presets'
export default function AgentBuilder({
  language,
  skills = [],
  initialSkill,
  initialDraft,
  editing = false,
  onSave,
  onDraftChange,
  copy,
}: {
  language: Language
  skills?: Skill[]
  initialDraft?: AgentDraft
  editing?: boolean
  onDraftChange?: (draft: AgentDraft) => void
  onSave?: (draft: AgentDraft, skill?: Skill, asNew?: boolean) => Promise<void>
  initialSkill?: Skill
  copy: (text: string) => Promise<boolean>
}) {
  const t = agentLocales[language],
    labels = skillLocales[language],
    w = wizardLocales[language],
    subjectId = useId()
  const [draft, setDraft] = useState(() =>
      structuredClone(
        initialDraft || defaultAgentDraft(language, initialSkill),
      ),
    ),
    [skillId, setSkillId] = useState(initialSkill?.id || ''),
    [configuration, setConfiguration] = useState<AgentConfiguration | null>(
      null,
    ),
    [notice, setNotice] = useState(''),
    [saving, setSaving] = useState(false)
  const skill = skills.find((s) => s.id === skillId) || initialSkill
  const update = <K extends keyof AgentDraft>(
    field: K,
    value: AgentDraft[K],
  ) => {
    const next = { ...draft, [field]: value }
    setDraft(next)
    onDraftChange?.(next)
    setConfiguration(null)
    setNotice('')
  }
  const field = (
    key:
      | 'name'
      | 'description'
      | 'course'
      | 'purpose'
      | 'audience'
      | 'materials'
      | 'role'
      | 'subject'
      | 'criteria'
      | 'errors'
      | 'responseFormat'
      | 'tone'
      | 'restrictions',
    area = false,
  ) => {
    const limits = {
      ...agentLimits,
      course: 200,
      purpose: 2000,
      audience: 500,
      materials: 4000,
      role: 300,
      subject: 200,
      criteria: 2500,
      errors: 2000,
      responseFormat: 1500,
      tone: 500,
      restrictions: 2500,
    }
    return (
      <label>
        {key === 'course'
          ? w.context
          : key === 'restrictions'
            ? w.restrictions
            : ((w as Record<string, unknown>)[key] as string) ||
              t[key as 'name']}
        {[
          'course',
          'purpose',
          'audience',
          'materials',
          'role',
          'subject',
          'criteria',
          'errors',
          'responseFormat',
          'restrictions',
        ].includes(key) && (
          <small>
            {
              (
                {
                  course: t.courseHint,
                  role: w.roleHint,
                  subject: w.subjectHint,
                  criteria: w.criteriaHint,
                  errors: w.errorsHint,
                  responseFormat: w.responseHint,
                  restrictions: w.restrictionsHint,
                  purpose: t.purposeHint,
                  audience: t.audienceHint,
                  materials: t.materialsHint,
                } as Partial<Record<string, string>>
              )[key]
            }
          </small>
        )}
        {area ? (
          <textarea
            required={[
              'name',
              'description',
              'purpose',
              'audience',
              'role',
            ].includes(key)}
            maxLength={limits[key]}
            value={draft[key]}
            rows={key === 'materials' ? 4 : 3}
            onChange={(e) => update(key, e.target.value)}
          />
        ) : (
          <input
            required={[
              'name',
              'description',
              'purpose',
              'audience',
              'role',
            ].includes(key)}
            list={key === 'subject' ? subjectId : undefined}
            maxLength={limits[key]}
            value={draft[key]}
            onChange={(e) => update(key, e.target.value)}
          />
        )}
        <small>
          {draft[key].length} / {limits[key]}
        </small>
      </label>
    )
  }
  const copyField = async (text: string) => {
    try {
      setNotice((await copy(text)) ? t.copied : t.copyFailed)
    } catch {
      setNotice(t.copyFailed)
    }
  }
  return (
    <section className="agent-builder">
      <h2>{t.title}</h2>
      <p className="callout">{t.access}</p>
      <p>{t.limits}</p>
      <form
        onInvalid={(e) => {
          const details = (e.target as HTMLElement).closest('details')
          if (details) details.open = true
        }}
        onSubmit={(e) => {
          e.preventDefault()
          setNotice('')
          try {
            const normalized = {
              ...draft,
              starterPrompts: draft.starterPrompts
                .map((v) => v.trim())
                .filter(Boolean),
            }
            setDraft(normalized)
            onDraftChange?.(normalized)
            setConfiguration(buildAgentConfiguration(normalized, skill))
          } catch (error) {
            setConfiguration(null)
            setNotice(
              error instanceof SkillError
                ? `${(w as Record<string, unknown>)[error.code] || t[error.code as 'invalid'] || t.invalid}${error.field ? ` (${(w as Record<string, unknown>)[error.field] || t[error.field as 'name'] || error.field})` : ''}`
                : t.invalid,
            )
          }
        }}
      >
        <h3>{w.identity}</h3>
        {skills.length > 0 && (
          <>
            <label>
              {t.basis}
              <select
                value={skillId}
                onChange={(e) => {
                  const next = skills.find((s) => s.id === e.target.value)
                  setSkillId(e.target.value)
                  const defaults = defaultAgentDraft(language, next)
                  setDraft({
                    ...defaults,
                    course: draft.course,
                    audience: draft.audience,
                    responseLanguage: draft.responseLanguage,
                    materials: draft.materials || defaults.materials,
                  })
                  setConfiguration(null)
                  setNotice('')
                }}
              >
                <option value="">{t.courseOnly}</option>
                {skills.map((s) => (
                  <option
                    value={s.id}
                    key={s.id}
                    disabled={!s.reviewed || s.mode !== 'instructions'}
                  >
                    {s.name}
                    {!s.reviewed
                      ? ` · ${t.untrusted}`
                      : s.mode === 'external'
                        ? ` · ${labels.externalMode}`
                        : ''}
                  </option>
                ))}
              </select>
            </label>
          </>
        )}
        <div className="skill-fields">
          {field('name')}
          {field('description', true)}
          <label>
            {w.stage}
            <select
              value={draft.stage}
              onChange={(e) =>
                update('stage', e.target.value as AgentDraft['stage'])
              }
            >
              {agentStages.map((stage) => (
                <option key={stage} value={stage}>
                  {w[`stage_${stage}`]}
                </option>
              ))}
            </select>
          </label>
          {field('subject')}
          <datalist id={subjectId}>
            {subjectSuggestions(draft.stage, language).map((subject) => (
              <option key={subject} value={subject} />
            ))}
          </datalist>
          {field('course')}
          {field('audience')}
          {field('role')}
        </div>
        {field('purpose', true)}
        <h3>{w.behavior}</h3>
        <p>{w.modes}</p>
        {draft.modes.map((mode, i) => (
          <fieldset key={i}>
            <legend>{mode.name || `${w.modes} ${i + 1}`}</legend>
            {(['name', 'when', 'behavior'] as const).map((key) => (
              <label key={key}>
                {key === 'name'
                  ? w.modeName
                  : key === 'when'
                    ? w.modeWhen
                    : w.modeBehavior}
                <textarea
                  required
                  rows={key === 'behavior' ? 3 : 2}
                  maxLength={key === 'name' ? 80 : key === 'when' ? 400 : 1200}
                  value={mode[key]}
                  onChange={(e) =>
                    update(
                      'modes',
                      draft.modes.map((v, n) =>
                        n === i ? { ...v, [key]: e.target.value } : v,
                      ),
                    )
                  }
                />
              </label>
            ))}
            <button
              type="button"
              onClick={() =>
                update(
                  'modes',
                  draft.modes.filter((_, n) => n !== i),
                )
              }
            >
              {w.remove}
            </button>
          </fieldset>
        ))}
        <button
          className="secondary"
          type="button"
          disabled={draft.modes.length >= 6}
          onClick={() =>
            update('modes', [
              ...draft.modes,
              { name: '', when: '', behavior: '' },
            ])
          }
        >
          {w.addMode}
        </button>
        <h3>{w.quality}</h3>
        {field('criteria', true)}
        {field('errors', true)}
        {field('responseFormat', true)}
        <h3>{w.boundaries}</h3>
        {field('tone')}
        {field('restrictions', true)}
        <div className="skill-fields">
          <label>
            {w.maxQuestions}
            <input
              type="number"
              min={1}
              max={5}
              step={1}
              value={draft.maxQuestions}
              onChange={(e) => update('maxQuestions', Number(e.target.value))}
            />
          </label>
          <label>
            {w.instructionLanguage}
            <select
              value={draft.instructionLanguage}
              onChange={(e) =>
                update('instructionLanguage', e.target.value as Language)
              }
            >
              {languages.map((l) => (
                <option key={l} value={l}>
                  {labels[`lang_${l}`]}
                </option>
              ))}
            </select>
          </label>
        </div>
        <label className="check">
          <input
            type="checkbox"
            checked={draft.oneAtATime}
            onChange={(e) => update('oneAtATime', e.target.checked)}
          />
          {w.oneAtATime}
        </label>
        <details>
          <summary>{w.customExamples}</summary>
          <p>{w.noExamples}</p>
          {draft.examples.map((example, i) => (
            <fieldset key={i}>
              {(['input', 'output'] as const).map((key) => (
                <label key={key}>
                  {key === 'input' ? w.exampleInput : w.exampleOutput}
                  <textarea
                    required
                    maxLength={key === 'input' ? 1000 : 2000}
                    rows={3}
                    value={example[key]}
                    onChange={(e) =>
                      update(
                        'examples',
                        draft.examples.map((v, n) =>
                          n === i ? { ...v, [key]: e.target.value } : v,
                        ),
                      )
                    }
                  />
                </label>
              ))}
              <button
                type="button"
                onClick={() =>
                  update(
                    'examples',
                    draft.examples.filter((_, n) => n !== i),
                  )
                }
              >
                {w.remove}
              </button>
            </fieldset>
          ))}
          <button
            type="button"
            className="secondary"
            disabled={draft.examples.length >= 8}
            onClick={() =>
              update('examples', [...draft.examples, { input: '', output: '' }])
            }
          >
            {w.addExample}
          </button>
        </details>
        <label>
          {w.starterPrompts}
          <small>{w.starterHint}</small>
          <textarea
            value={draft.starterPrompts.join('\n')}
            rows={3}
            onChange={(e) =>
              update('starterPrompts', e.target.value.split('\n'))
            }
          />
        </label>
        {field('materials', true)}

        <label>
          {t.responseLanguage}
          <select
            value={draft.responseLanguage}
            onChange={(e) =>
              update(
                'responseLanguage',
                e.target.value as AgentDraft['responseLanguage'],
              )
            }
          >
            <option value="auto">{w.autoLanguage}</option>
            {languages.map((l) => (
              <option value={l} key={l}>
                {labels[`lang_${l}`]}
              </option>
            ))}
          </select>
        </label>
        <p className="warning">{t.privacy}</p>
        <button className="primary">{t.generate}</button>
      </form>
      {notice && (
        <p role="status" className="callout">
          {notice}
        </p>
      )}
      {configuration && (
        <section className="agent-configuration">
          {onSave && (
            <div className="toolbar">
              <button
                className="primary"
                disabled={saving}
                onClick={async () => {
                  setSaving(true)
                  try {
                    await onSave(draft, skill)
                  } catch (error) {
                    setNotice(
                      error instanceof SkillError
                        ? (w as Record<string, string>)[error.code] || w.invalid
                        : w.invalid,
                    )
                  } finally {
                    setSaving(false)
                  }
                }}
              >
                {saving ? labels.busy : w.save}
              </button>
              {editing && (
                <button
                  className="secondary"
                  disabled={saving}
                  onClick={async () => {
                    setSaving(true)
                    try {
                      await onSave(draft, skill, true)
                    } catch {
                      setNotice(w.invalid)
                    } finally {
                      setSaving(false)
                    }
                  }}
                >
                  {w.saveAsNew}
                </button>
              )}
            </div>
          )}
          <h3>{t.setup[1]}</h3>
          <p>
            <a
              className="secondary"
              href="https://m365.cloud.microsoft/chat"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.open} ↗
            </a>
          </p>
          {(['name', 'description', 'instructions'] as const).map((key) => (
            <div className="agent-copy-field" key={key}>
              <label>
                {t[key]}
                <textarea
                  aria-label={t[key]}
                  readOnly
                  rows={key === 'instructions' ? 14 : 2}
                  value={configuration[key]}
                />
                <small>
                  {configuration[key].length} / {agentLimits[key]}
                </small>
              </label>
              <button
                className="secondary"
                aria-label={`${t.copy}: ${t[key]}`}
                onClick={() => void copyField(configuration[key])}
              >
                {t.copy}
              </button>
            </div>
          ))}
          <h4>{t.starters}</h4>
          {configuration.starters.map((prompt, i) => (
            <div className="agent-copy-field" key={i}>
              <label>
                {prompt.name}
                <textarea readOnly rows={3} value={prompt.message} />
              </label>
              <button
                className="secondary"
                aria-label={`${t.copy}: ${prompt.name}`}
                onClick={() => void copyField(prompt.message)}
              >
                {t.copy}
              </button>
            </div>
          ))}
          <h3>{t.setup[2]}</h3>
          <h4>{t.documents}</h4>
          <p>{t.documentsHelp}</p>
          {configuration.materials.length > 0 && (
            <ul>
              {configuration.materials.map((m, i) => (
                <li key={i}>{m}</li>
              ))}
            </ul>
          )}
          {skill?.resources.map((r) => (
            <p key={r.path}>
              <button
                className="secondary"
                onClick={() =>
                  downloadSkillFile(
                    r.path.replace('/', '-') + '.txt',
                    r.content,
                    'text/plain;charset=utf-8',
                  )
                }
              >
                {labels.download}: {r.path} (.txt)
              </button>
            </p>
          ))}
          <h4>{t.test}</h4>
          <p>{t.testHelp}</p>
          <p className="callout">{t.complete}</p>
          <button
            className="secondary"
            onClick={() =>
              downloadSkillFile(
                `${slugify(configuration.name)}-m365.md`,
                agentGuide(configuration, language),
                'text/markdown;charset=utf-8',
              )
            }
          >
            {t.download}
          </button>
        </section>
      )}
      <p className="mode-hint">{t.savedSkills}</p>
    </section>
  )
}
