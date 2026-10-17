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
import { basicLocales } from './basicLocales'
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
  const b = basicLocales[language]
  const [basic, setBasic] = useState(true)
  const [dirty, setDirty] = useState(false)
  const t = wizardLocales[language],
    owner = skillOwner(sub),
    presets = agentPresets(language)
  const [tab, setTab] = useState<
      'design' | 'examples' | 'mine' | 'compatibility'
    >('design'),
    [items, setItems] = useState<SavedAgent[]>([]),
    [draft, setDraft] = useState<AgentDraft>(() =>
      structuredClone(presets.find((p) => p.id === 'crear-rubricas')!.draft),
    ),
    [source, setSource] = useState<Skill | undefined>(),
    [editing, setEditing] = useState<SavedAgent | undefined>(),
    [editorKey, setEditorKey] = useState(0),
    [notice, setNotice] = useState(''),
    [search, setSearch] = useState(''),
    [history, setHistory] = useState<AgentRevision[]>([]),
    [presetId, setPresetId] = useState('crear-rubricas')
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
    setDirty(false)
    if (existing || skill) setPresetId('custom')
    setEditing(existing)
    setSource(skill)
    setEditorKey((k) => k + 1)
    setTab('design')
    setHistory([])
    setNotice('')
  }
  const choosePreset = (id: string) => {
    if (id === presetId) return
    if ((dirty || editing) && !window.confirm(b.replace)) return
    const preset = presets.find((p) => p.id === id)
    if (preset) {
      setPresetId(id)
      open(preset.draft)
    }
  }
  return (
    <main className="page skills-page agents-page">
      <p className="eyebrow">EDUTICTAC PROMPT</p>
      <h1>{t.section}</h1>
      <p className="lead">{basic ? b.intro : t.intro}</p>
      <div className="mode-switch" role="group" aria-label={b.mode}>
        <button
          className={basic ? 'active' : ''}
          aria-pressed={basic}
          onClick={() => {
            setBasic(true)
            if (tab === 'compatibility' || tab === 'examples') setTab('design')
          }}
        >
          {b.basic}
        </button>
        <button
          className={!basic ? 'active' : ''}
          aria-pressed={!basic}
          onClick={() => setBasic(false)}
        >
          {b.advanced}
        </button>
      </div>
      <nav className="skill-tabs" aria-label={t.section}>
        {(basic
          ? (['design', 'mine'] as const)
          : (['design', 'examples', 'mine', 'compatibility'] as const)
        ).map((key) => (
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
            {basic && key === 'design' ? b.create : t[key]}
          </button>
        ))}
      </nav>
      {notice && (
        <p className="callout" role="status">
          {notice}
        </p>
      )}
      {tab === 'design' && (
        <>
          <p className="mode-hint">{t.local}</p>
          {basic ? (
            <section className="basic-presets" aria-label={b.choose}>
              <h2>{b.choose}</h2>
              <div className="basic-preset-grid">
                {[
                  'crear-rubricas',
                  'adaptar-actividades-dua',
                  'revisar-recursos-educativos',
                  'tutor',
                ].map((id) => {
                  const p = presets.find((p) => p.id === id)!
                  return (
                    <button
                      key={id}
                      className={presetId === id ? 'active' : ''}
                      aria-pressed={presetId === id}
                      onClick={() => choosePreset(id)}
                    >
                      {p.title}
                    </button>
                  )
                })}
              </div>
              <details>
                <summary>{b.more}</summary>
                <div className="skill-tabs">
                  {presets
                    .filter(
                      (p) =>
                        ![
                          'crear-rubricas',
                          'adaptar-actividades-dua',
                          'revisar-recursos-educativos',
                          'tutor',
                        ].includes(p.id),
                    )
                    .map((p) => (
                      <button
                        key={p.id}
                        aria-pressed={presetId === p.id}
                        onClick={() => choosePreset(p.id)}
                      >
                        {p.title}
                      </button>
                    ))}
                </div>
              </details>
              <p className="mode-hint">
                {presets.find((p) => p.id === presetId)?.description}
              </p>
            </section>
          ) : (
            <label>
              {t.examples}
              <select
                aria-label={t.examples}
                value={presetId}
                onChange={(e) => choosePreset(e.target.value)}
              >
                {presets.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.title}
                  </option>
                ))}
              </select>
            </label>
          )}
          <AgentBuilder
            key={editorKey}
            language={language}
            initialDraft={draft}
            basic={basic}
            onDraftChange={(next) => {
              setDraft(next)
              setDirty(true)
            }}
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
                    choosePreset(p.id)
                    setTab('design')
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
                      {!basic && (
                        <button
                          onClick={() =>
                            void safe(async () =>
                              setHistory(await agentHistory(a.id, owner)),
                            )
                          }
                        >
                          {t.history}
                        </button>
                      )}
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
