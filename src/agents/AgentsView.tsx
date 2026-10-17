import { useEffect, useState } from 'react'
import type { Language, SavedPrompt } from '../types'
import type { Skill } from '../skills/types'
import AgentBuilder from '../skills/AgentBuilder'
import SkillLibrary from '../skills/SkillsView'
import { defaultAgentDraft, type AgentDraft } from '../skills/agents'
import { skillOwner } from '../skills/repository'
import { SkillError } from '../skills/model'
import { agentGuide } from '../skills/agents'
import { downloadSkillFile } from '../skills/files'
import { agentPresets } from './presets'
import { wizardLocales } from './locales'
import {
  agentHistory,
  deleteAgent,
  duplicateAgent,
  listAgents,
  saveAgent,
} from './repository'
import type { AgentRevision, SavedAgent } from './types'
import '../skills/skills.css'
export default function AgentsView({
  language,
  sub,
  prompts,
  copy,
  onSaveResult,
}: {
  language: Language
  sub?: string
  prompts: SavedPrompt[]
  copy: (text: string) => Promise<boolean>
  onSaveResult: (
    title: string,
    text: string,
    language: Language,
  ) => Promise<void>
}) {
  const t = wizardLocales[language],
    owner = skillOwner(sub),
    presets = agentPresets(language)
  const [tab, setTab] = useState<
      'design' | 'examples' | 'mine' | 'compatibility'
    >('design'),
    [items, setItems] = useState<SavedAgent[]>([]),
    [draft, setDraft] = useState<AgentDraft>(() => defaultAgentDraft(language)),
    [source, setSource] = useState<Skill | undefined>(),
    [editing, setEditing] = useState<SavedAgent | undefined>(),
    [editorKey, setEditorKey] = useState(0),
    [notice, setNotice] = useState(''),
    [search, setSearch] = useState(''),
    [history, setHistory] = useState<AgentRevision[]>([]),
    [presetId, setPresetId] = useState('custom')
  const refresh = async () => setItems(await listAgents(owner))
  const safe = async (work: () => Promise<void>) => {
    setNotice('')
    try {
      await work()
    } catch (error) {
      setNotice(
        error instanceof SkillError
          ? (t as Record<string, string>)[error.code] || t.invalid
          : t.invalid,
      )
    }
  }
  useEffect(() => {
    void safe(refresh)
  }, [owner])
  const open = (next: AgentDraft, existing?: SavedAgent, skill?: Skill) => {
    setDraft(structuredClone(next))
    setEditing(existing)
    setSource(skill)
    setEditorKey((k) => k + 1)
    setTab('design')
    setHistory([])
    setNotice('')
  }
  return (
    <main className="page skills-page agents-page">
      <p className="eyebrow">EDUTICTAC PROMPT</p>
      <h1>{t.section}</h1>
      <p className="lead">{t.intro}</p>
      <nav className="skill-tabs" aria-label={t.section}>
        {(['design', 'examples', 'mine', 'compatibility'] as const).map(
          (key) => (
            <button
              key={key}
              aria-current={tab === key ? 'page' : undefined}
              className={tab === key ? 'active' : ''}
              onClick={() => {
                setTab(key)
                setHistory([])
                setNotice('')
              }}
            >
              {t[key]}
            </button>
          ),
        )}
      </nav>
      {notice && (
        <p className="callout" role="status">
          {notice}
        </p>
      )}
      {tab === 'design' && (
        <>
          <p className="mode-hint">{t.local}</p>
          <label>
            {t.examples}
            <select
              aria-label={t.examples}
              value={presetId}
              onChange={(e) => {
                const preset = presets.find((p) => p.id === e.target.value)
                if (preset) {
                  setPresetId(preset.id)
                  open(preset.draft)
                }
              }}
            >
              {presets.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.title}
                </option>
              ))}
            </select>
          </label>
          <AgentBuilder
            key={editorKey}
            language={language}
            initialDraft={draft}
            onDraftChange={setDraft}
            initialSkill={source}
            skills={source ? [source] : []}
            editing={Boolean(editing)}
            copy={copy}
            onSave={async (next, skill, asNew) => {
              await saveAgent(next, owner, asNew ? undefined : editing, skill)
              await refresh()
              setTab('mine')
              setNotice(t.saved)
            }}
          />
        </>
      )}
      {tab === 'examples' && (
        <>
          <p>{t.exampleNote}</p>
          <div className="skill-cards">
            {presets.map((p) => (
              <article className="tool-card" key={p.id}>
                <h2>{p.title}</h2>
                <p>{p.description}</p>
                <small>
                  {t[`stage_${p.draft.stage}`]}
                  {p.draft.subject ? ` · ${p.draft.subject}` : ''}
                </small>
                <button
                  className="primary"
                  onClick={() => {
                    setPresetId(p.id)
                    open(p.draft)
                  }}
                >
                  {t.useExample}
                </button>
              </article>
            ))}
          </div>
        </>
      )}
      {tab === 'mine' && (
        <>
          <p>{t.local}</p>
          <label>
            {t.search}
            <input value={search} onChange={(e) => setSearch(e.target.value)} />
          </label>
          {items.length === 0 && <p>{t.empty}</p>}
          <div className="saved-list">
            {items
              .filter((a) =>
                `${a.draft.name} ${a.draft.subject} ${a.draft.purpose}`
                  .toLocaleLowerCase()
                  .includes(search.toLocaleLowerCase()),
              )
              .map((a) => (
                <article className="saved-card" key={a.id}>
                  <div>
                    <h2>{a.draft.name}</h2>
                    <p>{a.draft.description}</p>
                    <small>
                      {t[`stage_${a.draft.stage}`]} · {a.draft.subject} ·{' '}
                      {t.revision} {a.revision}
                    </small>
                    <div className="toolbar">
                      <button
                        className="primary"
                        onClick={() => {
                          setPresetId('custom')
                          open(a.draft, a, a.sourceSkill)
                        }}
                      >
                        {t.edit}
                      </button>
                      <button
                        className="secondary"
                        onClick={() =>
                          void safe(async () => {
                            await duplicateAgent(a, owner)
                            await refresh()
                            setNotice(t.saved)
                          })
                        }
                      >
                        {t.duplicate}
                      </button>
                      <button
                        className="secondary"
                        onClick={() =>
                          downloadSkillFile(
                            `${a.id}-m365.md`,
                            agentGuide(a.configuration, language),
                            'text/markdown;charset=utf-8',
                          )
                        }
                      >
                        {language === 'en'
                          ? 'Download guide'
                          : language === 'es'
                            ? 'Descargar guía'
                            : 'Descarregar guia'}
                      </button>
                      <button
                        onClick={() =>
                          void safe(async () =>
                            setHistory(await agentHistory(a.id, owner)),
                          )
                        }
                      >
                        {t.history}
                      </button>
                      <button
                        className="danger"
                        onClick={() => {
                          if (window.confirm(t.confirmDelete))
                            void safe(async () => {
                              await deleteAgent(a.id, owner)
                              await refresh()
                              setHistory([])
                            })
                        }}
                      >
                        {t.delete}
                      </button>
                    </div>
                  </div>
                </article>
              ))}
          </div>
          {history.map((r) => (
            <p key={r.key}>
              {r.snapshot.draft.name} · {t.revision} {r.revision}{' '}
              <button
                onClick={() =>
                  void safe(async () => {
                    const current = items.find((a) => a.id === r.agentId)
                    if (!current) throw new SkillError('permission')
                    await saveAgent(
                      r.snapshot.draft,
                      owner,
                      current,
                      r.snapshot.sourceSkill,
                    )
                    await refresh()
                    setHistory([])
                    setNotice(t.restoreDone)
                  })
                }
              >
                {t.restore}
              </button>
            </p>
          ))}
        </>
      )}
      {tab === 'compatibility' && (
        <>
          <h2>{t.compatibility}</h2>
          <p>{t.compatibilityHint}</p>
          <SkillLibrary
            embedded
            language={language}
            sub={sub}
            prompts={prompts}
            copy={copy}
            onSaveResult={onSaveResult}
            onPrepareAgent={(skill) =>
              open(defaultAgentDraft(language, skill), undefined, skill)
            }
          />
        </>
      )}
    </main>
  )
}
