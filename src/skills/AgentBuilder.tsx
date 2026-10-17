import { useState } from 'react'
import type { Language } from '../types'
import type { Skill } from './types'
import { languages } from './types'
import { skillLocales } from './locales'
import { agentLocales } from './agentLocales'
import {
  agentGuide,
  agentLimits,
  buildAgentConfiguration,
  defaultAgentDraft,
  type AgentConfiguration,
  type AgentDraft,
} from './agents'
import { SkillError, slugify } from './model'
import { downloadSkillFile } from './files'
export default function AgentBuilder({
  language,
  skills,
  initialSkill,
  copy,
}: {
  language: Language
  skills: Skill[]
  initialSkill?: Skill
  copy: (text: string) => Promise<boolean>
}) {
  const t = agentLocales[language],
    labels = skillLocales[language]
  const [draft, setDraft] = useState(() =>
      defaultAgentDraft(language, initialSkill),
    ),
    [skillId, setSkillId] = useState(initialSkill?.id || ''),
    [configuration, setConfiguration] = useState<AgentConfiguration | null>(
      null,
    ),
    [notice, setNotice] = useState('')
  const skill = skills.find((s) => s.id === skillId)
  const update = <K extends keyof AgentDraft>(
    field: K,
    value: AgentDraft[K],
  ) => {
    setDraft({ ...draft, [field]: value })
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
      | 'materials',
    area = false,
  ) => {
    const limits = {
      ...agentLimits,
      course: 200,
      purpose: 2000,
      audience: 500,
      materials: 4000,
    }
    return (
      <label>
        {t[key]}
        {['course', 'purpose', 'audience', 'materials'].includes(key) && (
          <small>
            {
              (
                {
                  course: t.courseHint,
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
            required={key !== 'materials'}
            maxLength={limits[key]}
            value={draft[key]}
            rows={key === 'materials' ? 4 : 3}
            onChange={(e) => update(key, e.target.value)}
          />
        ) : (
          <input
            required
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
        onSubmit={(e) => {
          e.preventDefault()
          setNotice('')
          try {
            setConfiguration(buildAgentConfiguration(draft, skill))
          } catch (error) {
            setConfiguration(null)
            setNotice(
              error instanceof SkillError
                ? `${t[error.code as 'invalid'] || t.invalid}${error.field ? ` (${t[error.field as 'name'] || error.field})` : ''}`
                : t.invalid,
            )
          }
        }}
      >
        <h3>{t.setup[0]}</h3>
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
        <div className="skill-fields">
          {field('course')}
          {field('audience')}
          {field('name')}
          {field('description', true)}
        </div>
        {field('purpose', true)}
        {field('materials', true)}
        <label>
          {t.responseLanguage}
          <select
            value={draft.responseLanguage}
            onChange={(e) =>
              update('responseLanguage', e.target.value as Language)
            }
          >
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
