import { useEffect, useState } from 'react'
import type { Language, SavedPrompt } from '../types'
import { db } from '../db'
import { aiTargets, aiTargetUrl, rememberAiTarget } from '../followUps'
import { builtinSkills } from './seeds'
import {
  blankDefinition,
  defaultValues,
  SkillError,
  slugify,
  validateDefinition,
} from './model'
import {
  deleteSkill,
  duplicateSkill,
  importSkill,
  listSkills,
  revisions,
  saveSkill,
  skillOwner,
} from './repository'
import {
  categories,
  languages,
  stages,
  type Skill,
  type SkillDefinition,
  type SkillRevision,
  type Value,
} from './types'
import {
  exportPackage,
  importPackage,
  ZIP_LIMIT,
  type PackageTarget,
} from './packages'
import {
  assistedPrompt,
  generateGift,
  parseProposal,
  prepareExecution,
  type GiftQuestion,
} from './execution'
import {
  deleteRemoteSkill,
  getCapabilities,
  inferSkill,
  proposeSkill,
  putSkill,
  remoteSkills,
  type Provider,
} from './client'
import { skillLocales, type SkillTexts } from './locales'
import Editor, { Markdown, ParameterInput } from './Editor'
import './skills.css'
import { downloadSkillFile } from './files'
export default function SkillsView({
  language,
  sub,
  prompts,
  copy,
  onSaveResult,
  onPrepareAgent,
  embedded = false,
}: {
  language: Language
  onPrepareAgent?: (skill: Skill) => void
  embedded?: boolean
  sub?: string
  prompts: SavedPrompt[]
  copy: (v: string) => Promise<boolean>
  onSaveResult: (
    title: string,
    text: string,
    language: Language,
  ) => Promise<void>
}) {
  const t = skillLocales[language],
    owner = skillOwner(sub),
    [tab, setTab] = useState<'explore' | 'create' | 'mine' | 'transfer'>(
      'explore',
    ),
    [items, setItems] = useState<Skill[]>([]),
    [selected, setSelected] = useState<Skill | null>(null),
    [draft, setDraft] = useState<SkillDefinition | null>(null),
    [editorKey, setEditorKey] = useState(0),
    [editing, setEditing] = useState<Skill | undefined>(),
    [imported, setImported] = useState(false),
    [notice, setNotice] = useState(''),
    [query, setQuery] = useState(''),
    [category, setCategory] = useState('all'),
    [stage, setStage] = useState('all'),
    [definitionLanguage, setDefinitionLanguage] = useState('all'),
    [sort, setSort] = useState('alphabetical'),
    [history, setHistory] = useState<SkillRevision[]>([])
  const refresh = async () => setItems(await listSkills(owner))
  const safe = async (work: () => Promise<void>) => {
    setNotice('')
    try {
      await work()
    } catch (e) {
      setNotice(
        e instanceof SkillError
          ? `${t[e.code as keyof SkillTexts] || t.invalid}${e.field ? ` (${t[e.field as keyof SkillTexts] || e.field})` : ''}`
          : t.error,
      )
    }
  }
  useEffect(() => {
    void safe(refresh)
  }, [owner])
  const newDraft = (
    d: SkillDefinition,
    existing?: Skill,
    isImported = false,
  ) => {
    setSelected(null)
    setHistory([])
    setEditorKey((k) => k + 1)
    setDraft(d)
    setEditing(existing)
    setImported(isImported)
    setTab('create')
  }
  const changeTab = (next: typeof tab) => {
    setSelected(null)
    setDraft(null)
    setHistory([])
    setTab(next)
    if (next === 'create') newDraft(blankDefinition(language))
  }
  const exported = async (skill: Skill, target: PackageTarget) => {
    downloadSkillFile(
      `${skill.slug}-${target}.zip`,
      exportPackage(skill, target),
      'application/zip',
    )
  }
  const sync = async () => {
    // Explicit action only; never auto-upload imported or local-device skills.
    for (const skill of await listSkills(owner)) {
      await putSkill(skill)
      await db.skills.update(skill.id, { synced: true })
    }
    const incoming = (await remoteSkills()).skills
    for (const raw of incoming) {
      const d = validateDefinition(raw)
      if (raw.ownerId !== owner || raw.source === 'builtin')
        throw new SkillError('permission')
      const local = await db.skills.get(raw.id)
      if (local && local.ownerId !== owner) throw new SkillError('permission')
      if (!local || raw.revision > local.revision) {
        const next = { ...raw, ...d, synced: true }
        await db.transaction('rw', db.skills, db.skillRevisions, async () => {
          await db.skills.put(next)
          await db.skillRevisions.put({
            key: `${next.id}:${next.revision}`,
            skillId: next.id,
            ownerId: owner,
            revision: next.revision,
            snapshot: next,
          })
        })
      }
    }
    await refresh()
    setNotice(t.synced)
  }
  const all = tab === 'mine' ? items : [...builtinSkills(language), ...items],
    filtered = all
      .filter(
        (s) =>
          (category === 'all' || s.category === category) &&
          (stage === 'all' || s.stage === 'all' || s.stage === stage) &&
          (definitionLanguage === 'all' || s.language === definitionLanguage) &&
          `${s.name} ${s.description} ${s.tags.join(' ')}`
            .toLocaleLowerCase()
            .includes(query.toLocaleLowerCase()),
      )
      .sort((a, b) =>
        sort === 'recent'
          ? b.updatedAt.localeCompare(a.updatedAt)
          : a.name.localeCompare(b.name, language),
      )
  const Root = embedded ? 'section' : 'main'
  return (
    <Root className="page skills-page">
      <p className="eyebrow">EDUTICTAC PROMPT</p>
      <h2>Agent Skills</h2>
      <p className="lead">{t.intro}</p>
      <p className="mode-hint">{t.local}</p>
      <nav className="skill-tabs" aria-label="Skills">
        {(['explore', 'create', 'mine', 'transfer'] as const).map((v) => (
          <button
            key={v}
            aria-current={tab === v ? 'page' : undefined}
            className={tab === v ? 'active' : ''}
            onClick={() => changeTab(v)}
          >
            {t[v]}
          </button>
        ))}
      </nav>
      {notice && (
        <p className="callout" role="status">
          {notice}
        </p>
      )}
      {draft ? (
        <>
          <h2>{editing ? t.edit : t.create}</h2>
          {imported && <p className="warning">{t.reviewHint}</p>}
          <Editor
            key={editorKey}
            initial={draft}
            language={language}
            onCancel={() => changeTab('mine')}
            onSave={(d) =>
              safe(async () => {
                const normalized = {
                  ...d,
                  tags: d.tags.filter(Boolean),
                  procedure: d.procedure.filter((v) => v.trim()),
                }
                if (imported && !editing) await importSkill(normalized, owner)
                else
                  await saveSkill(
                    normalized,
                    owner,
                    editing,
                    editing?.reviewed ?? true,
                  )
                await refresh()
                changeTab('mine')
                setNotice(t.saved)
              })
            }
          />
          <details>
            <summary>{t.ai}</summary>
            <AiCreator
              language={language}
              copy={copy}
              safe={safe}
              open={(d) => newDraft(d)}
            />
          </details>
          <details>
            <summary>{t.fromPrompt}</summary>
            <label>
              {t.choosePrompt}
              <select
                defaultValue=""
                onChange={(e) => {
                  const p = prompts.find((p) => p.id === e.target.value)
                  if (p) {
                    newDraft({
                      ...blankDefinition(p.language),
                      slug: slugify(p.title),
                      name: p.title,
                      description: p.title,
                      instructions: p.prompt,
                    })
                    setNotice(t.converted)
                  }
                }}
              >
                <option value="">—</option>
                {prompts
                  .filter((p) => !p.ownerId || p.ownerId === sub)
                  .map((p) => (
                    <option value={p.id} key={p.id}>
                      {p.title}
                    </option>
                  ))}
              </select>
            </label>
          </details>
        </>
      ) : selected ? (
        <>
          <button className="secondary" onClick={() => setSelected(null)}>
            ← {t.back}
          </button>
          <h2>{selected.name}</h2>
          <p>{selected.description}</p>
          {onPrepareAgent && (
            <p>
              <button
                className="primary"
                disabled={
                  !selected.reviewed || selected.mode !== 'instructions'
                }
                onClick={() => {
                  onPrepareAgent?.(selected)
                }}
              >
                {language === 'en'
                  ? 'Prepare M365 agent'
                  : language === 'es'
                    ? 'Preparar agente M365'
                    : 'Preparar agent M365'}
              </button>
            </p>
          )}
          <p>
            {selected.author} · {selected.license} · {selected.version} ·{' '}
            {t[`lang_${selected.language}`]}
          </p>
          <Markdown text={selected.instructions} />
          <h3>{t.procedure}</h3>
          <ol>
            {selected.procedure.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ol>
          <h3>{t.restrictions}</h3>
          <p>{selected.restrictions}</p>
          <p>{selected.requirements}</p>
          <h3>{t.examples}</h3>
          {selected.examples.map((e, i) => (
            <section className="skill-example" key={i}>
              <strong>{t[`lang_${e.language}`]}</strong>
              <p>
                {t.input}: {e.input}
              </p>
              <p>
                {t.output}: {e.output}
              </p>
              <button
                className="secondary"
                onClick={() =>
                  window.dispatchEvent(
                    new CustomEvent('skill-example', {
                      detail: { skillId: selected.id, input: e.input },
                    }),
                  )
                }
              >
                {t.run}
              </button>
            </section>
          ))}
          {selected.resources.map((r) => (
            <details key={r.path}>
              <summary>{r.path}</summary>
              <pre>{r.content}</pre>
            </details>
          ))}
          <div className="toolbar">
            {selected.source !== 'builtin' && (
              <button onClick={() => newDraft(selected, selected)}>
                {t.edit}
              </button>
            )}
            <button
              onClick={() =>
                void safe(async () => {
                  await duplicateSkill(selected, owner)
                  await refresh()
                  changeTab('mine')
                  setNotice(t.saved)
                })
              }
            >
              {t.duplicate}
            </button>
            <button
              onClick={() => void safe(() => exported(selected, 'agents'))}
            >
              {t.exportAgents}
            </button>
            <button onClick={() => void safe(() => exported(selected, 'm365'))}>
              {t.exportM365}
            </button>
            {selected.source !== 'builtin' && (
              <>
                <button
                  onClick={() =>
                    void safe(async () =>
                      setHistory(await revisions(selected.id, owner)),
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
                        if (selected.synced)
                          await deleteRemoteSkill(selected.id)
                        await deleteSkill(selected.id, owner)
                        setSelected(null)
                        await refresh()
                        setNotice(t.deleted)
                      })
                  }}
                >
                  {t.remove}
                </button>
              </>
            )}
          </div>
          {history.map((r) => (
            <p key={r.key}>
              {t.revision} {r.revision} · {r.snapshot.version} ·{' '}
              {r.snapshot.updatedAt}{' '}
              <button
                onClick={() =>
                  void safe(async () => {
                    const next = await saveSkill(
                      r.snapshot,
                      owner,
                      selected,
                      r.snapshot.reviewed,
                    )
                    setSelected(next)
                    setHistory([])
                    await refresh()
                    setNotice(t.saved)
                  })
                }
              >
                {t.restore}
              </button>
            </p>
          ))}
          <Runner
            key={selected.id}
            skill={selected}
            language={language}
            copy={copy}
            safe={safe}
            onReview={async () => {
              if (selected.source !== 'builtin') {
                const next = await saveSkill(selected, owner, selected, true)
                setSelected(next)
                await refresh()
              }
            }}
            onSaveResult={onSaveResult}
          />
          {selected.slug === 'crear-cuestionarios-aules' && (
            <GiftEditor language={language} safe={safe} />
          )}
        </>
      ) : tab === 'transfer' ? (
        <>
          <h2>{t.transfer}</h2>
          <p>{t.importHint}</p>
          <label className="secondary file-label">
            {t.import}
            <input
              type="file"
              accept=".zip,application/zip"
              onChange={(e) => {
                const file = e.target.files?.[0]
                e.target.value = ''
                if (file)
                  void safe(async () => {
                    if (file.size > ZIP_LIMIT) throw new SkillError('size')
                    const d = importPackage(
                      new Uint8Array(await file.arrayBuffer()),
                    )
                    newDraft(d, undefined, true)
                  })
              }}
            />
          </label>
          <p>{t.exportHint}</p>
          <p className="callout">{t.copilotHint}</p>
          <div className="saved-list">
            {[...builtinSkills(language), ...items].map((s) => (
              <article className="saved-card" key={s.id}>
                <strong>{s.name}</strong>
                <div className="toolbar">
                  <button
                    onClick={() => void safe(() => exported(s, 'agents'))}
                  >
                    {t.exportAgents}
                  </button>
                  <button onClick={() => void safe(() => exported(s, 'm365'))}>
                    {t.exportM365}
                  </button>
                </div>
              </article>
            ))}
          </div>
        </>
      ) : (
        <>
          {tab === 'mine' && sub && (
            <>
              <button className="secondary" onClick={() => void safe(sync)}>
                {t.sync}
              </button>
              <p>{t.syncHint}</p>
            </>
          )}
          <div className="skill-filters">
            <label>
              {t.search}
              <input value={query} onChange={(e) => setQuery(e.target.value)} />
            </label>
            <label>
              {t.category}
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="all">{t.all}</option>
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {t[`cat_${c}`]}
                  </option>
                ))}
              </select>
            </label>
            <label>
              {t.stage}
              <select value={stage} onChange={(e) => setStage(e.target.value)}>
                {stages.map((s) => (
                  <option key={s} value={s}>
                    {t[`stage_${s}`]}
                  </option>
                ))}
              </select>
            </label>
            <label>
              {t.language}
              <select
                value={definitionLanguage}
                onChange={(e) => setDefinitionLanguage(e.target.value)}
              >
                <option value="all">{t.all}</option>
                {languages.map((l) => (
                  <option key={l} value={l}>
                    {t[`lang_${l}`]}
                  </option>
                ))}
              </select>
            </label>
            <label>
              {t.sort}
              <select value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="alphabetical">{t.alphabetical}</option>
                <option value="recent">{t.recent}</option>
              </select>
            </label>
          </div>
          {!filtered.length && <p>{t.empty}</p>}
          <div className="skill-cards">
            {filtered.map((s) => (
              <article className="tool-card" key={s.id}>
                <span className="tool-icon" aria-hidden="true">
                  🧩
                </span>
                <small>
                  {
                    t[
                      s.source === 'builtin'
                        ? 'builtin'
                        : s.source === 'imported'
                          ? 'imported'
                          : 'personal'
                    ]
                  }{' '}
                  · {t[`cat_${s.category}`]}
                </small>
                <h2>{s.name}</h2>
                <p>{s.description}</p>
                <small>
                  {s.author} · {t[`lang_${s.language}`]} · v{s.version} ·{' '}
                  {s.license}
                </small>
                <small>
                  {s.mode === 'instructions'
                    ? 'Codex · OpenCode · M365*'
                    : t.externalMode}
                </small>
                <button
                  className="primary"
                  onClick={() => {
                    setSelected(s)
                    setHistory([])
                  }}
                >
                  {t.details}
                </button>
              </article>
            ))}
          </div>
          <p className="mode-hint">* {t.copilotHint}</p>
        </>
      )}
    </Root>
  )
}
type Safe = (work: () => Promise<void>) => Promise<void>
function useProviders(language: Language) {
  const [providers, setProviders] = useState<Provider[]>([]),
    [provider, setProvider] = useState(''),
    [model, setModel] = useState('')
  useEffect(() => {
    let active = true
    void getCapabilities()
      .then((c) => {
        if (active) {
          setProviders(c.providers)
          setProvider(c.providers[0]?.id || '')
          setModel(c.providers[0]?.models[0] || '')
        }
      })
      .catch(() => {})
    return () => {
      active = false
    }
  }, [])
  return {
    providers,
    provider,
    model,
    select: (
      <>
        <label>
          {skillLocales[language].provider}
          <select
            aria-label={skillLocales[language].provider}
            value={`${provider}:${model}`}
            onChange={(e) => {
              const p = providers.find((p) =>
                p.models.some((m) => `${p.id}:${m}` === e.target.value),
              )
              if (p) {
                setProvider(p.id)
                setModel(
                  p.models.find((m) => `${p.id}:${m}` === e.target.value)!,
                )
              }
            }}
          >
            {providers.flatMap((p) =>
              p.models.map((m) => (
                <option key={`${p.id}:${m}`} value={`${p.id}:${m}`}>
                  {p.name} · {m}
                </option>
              )),
            )}
          </select>
        </label>
      </>
    ),
  }
}
function ExternalButtons({
  text,
  language,
  copy,
  safe,
}: {
  text: string
  language: Language
  copy: (v: string) => Promise<boolean>
  safe: Safe
}) {
  const t = skillLocales[language],
    [status, setStatus] = useState(''),
    [consent, setConsent] = useState(false)
  useEffect(() => setConsent(false), [text])
  return (
    <>
      <p>{t.externalHint}</p>
      <label className="check">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
        />
        {t.consent}
      </label>
      <div className="toolbar">
        <button
          disabled={!text}
          onClick={() =>
            void safe(async () =>
              setStatus((await copy(text)) ? t.copied : t.copyFailed),
            )
          }
        >
          {t.copy}
        </button>
        {aiTargets.map((target) => (
          <button
            key={target.id}
            disabled={!text || !consent}
            onClick={() => {
              const copying = copy(text)
              rememberAiTarget(target.id)
              window.open(aiTargetUrl(target, text), '_blank', 'noopener')
              void copying.then((ok) => setStatus(ok ? t.copied : t.copyFailed))
            }}
          >
            {t.open} {target.id === 'Copilot' ? 'Copilot M365' : target.name} ↗
          </button>
        ))}
      </div>
      {status && <p role="status">{status}</p>}
    </>
  )
}
function Runner({
  skill,
  language,
  copy,
  safe,
  onReview,
  onSaveResult,
}: {
  skill: Skill
  language: Language
  copy: (v: string) => Promise<boolean>
  safe: Safe
  onReview: () => Promise<void>
  onSaveResult: (title: string, text: string, l: Language) => Promise<void>
}) {
  const t = skillLocales[language],
    [values, setValues] = useState<Record<string, Value>>(defaultValues(skill)),
    [responseLanguage, setResponseLanguage] = useState(language),
    [prepared, setPrepared] = useState(''),
    [result, setResult] = useState(''),
    [consent, setConsent] = useState(false),
    [busy, setBusy] = useState(false),
    p = useProviders(language)
  useEffect(() => {
    const listener = (event: Event) => {
      const d = (event as CustomEvent).detail
      if (d.skillId === skill.id && skill.parameters[0]) {
        setValues({
          ...defaultValues(skill),
          [skill.parameters[0].id]: d.input,
        })
        setPrepared('')
        setConsent(false)
      }
    }
    window.addEventListener('skill-example', listener)
    return () => window.removeEventListener('skill-example', listener)
  }, [skill])
  const invalidate = () => {
    setPrepared('')
    setConsent(false)
    setResult('')
  }
  return (
    <section className="skill-runner">
      <h2>{t.run}</h2>
      {!skill.reviewed && (
        <>
          <p className="warning">{t.reviewHint}</p>
          <button onClick={() => void safe(onReview)}>{t.review}</button>
        </>
      )}
      {skill.mode === 'external' ? (
        <p className="warning">{t.external}</p>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault()
            void safe(async () => {
              setPrepared(prepareExecution(skill, values, responseLanguage))
              setConsent(false)
            })
          }}
        >
          {skill.parameters.map((parameter) => (
            <ParameterInput
              key={parameter.id}
              parameter={parameter}
              value={values[parameter.id] ?? ''}
              onChange={(value) => {
                setValues({ ...values, [parameter.id]: value })
                invalidate()
              }}
            />
          ))}
          <label>
            {t.responseLanguage}
            <select
              value={responseLanguage}
              onChange={(e) => {
                setResponseLanguage(e.target.value as Language)
                invalidate()
              }}
            >
              {languages.map((l) => (
                <option value={l} key={l}>
                  {t[`lang_${l}`]}
                </option>
              ))}
            </select>
          </label>
          <button className="primary" disabled={!skill.reviewed}>
            {t.run}
          </button>
        </form>
      )}
      {prepared && (
        <>
          <h3>{t.prepared}</h3>
          <textarea
            readOnly
            rows={12}
            aria-label={t.prepared}
            value={prepared}
          />
          <ExternalButtons
            text={prepared}
            language={language}
            copy={copy}
            safe={safe}
          />
          <p>{t.copilotHint}</p>
          <button
            onClick={() =>
              void safe(() =>
                onSaveResult(skill.name, prepared, responseLanguage),
              )
            }
          >
            {t.savePrepared}
          </button>
          {p.providers.length ? (
            <>
              {p.select}
              <label className="check">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                />
                {t.consent}
              </label>
              <button
                className="primary"
                disabled={!consent || busy}
                onClick={() =>
                  void safe(async () => {
                    setBusy(true)
                    try {
                      setResult(
                        (
                          await inferSkill(
                            skill,
                            values,
                            responseLanguage,
                            p.provider,
                            p.model,
                          )
                        ).text,
                      )
                    } finally {
                      setBusy(false)
                    }
                  })
                }
              >
                {busy ? t.busy : t.execute}
              </button>
            </>
          ) : (
            <p className="callout">{t.noProvider}</p>
          )}
          <label>
            {t.result}
            <textarea
              rows={10}
              maxLength={200000}
              value={result}
              onChange={(e) => setResult(e.target.value)}
            />
          </label>
          <Markdown text={result} />
          <div className="toolbar">
            <button
              disabled={!result.trim()}
              onClick={() =>
                void safe(() =>
                  onSaveResult(skill.name, result, responseLanguage),
                )
              }
            >
              {t.saveResult}
            </button>
            <button
              disabled={!result}
              onClick={() =>
                downloadSkillFile(
                  `${skill.slug}-result.md`,
                  result,
                  'text/markdown',
                )
              }
            >
              {t.download}
            </button>
            <button
              disabled={!result}
              onClick={() =>
                void safe(async () => {
                  if (!(await copy(result))) throw new Error('copy')
                })
              }
            >
              {t.copy}
            </button>
          </div>
        </>
      )}
    </section>
  )
}
function AiCreator({
  language,
  copy,
  safe,
  open,
}: {
  language: Language
  copy: (v: string) => Promise<boolean>
  safe: Safe
  open: (d: SkillDefinition) => void
}) {
  const t = skillLocales[language],
    [goal, setGoal] = useState(''),
    [text, setText] = useState(''),
    [proposal, setProposal] = useState(''),
    [consent, setConsent] = useState(false),
    [busy, setBusy] = useState(false),
    p = useProviders(language)
  return (
    <section>
      <p>{t.aiHint}</p>
      <label>
        {t.goal}
        <textarea
          value={goal}
          maxLength={10000}
          onChange={(e) => {
            setGoal(e.target.value)
            setText('')
            setConsent(false)
          }}
        />
      </label>
      <button
        className="secondary"
        onClick={() =>
          void safe(async () => setText(assistedPrompt(goal, language)))
        }
      >
        {t.prepareAi}
      </button>
      {text && (
        <>
          <label>
            {t.prepared}
            <textarea readOnly rows={6} value={text} />
          </label>
          <ExternalButtons
            text={text}
            language={language}
            copy={copy}
            safe={safe}
          />
          {p.providers.length > 0 && (
            <>
              {p.select}
              <label className="check">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                />
                {t.consent}
              </label>
              <button
                disabled={!consent || busy}
                onClick={() =>
                  void safe(async () => {
                    setBusy(true)
                    try {
                      const result = await proposeSkill(
                        goal,
                        language,
                        p.provider,
                        p.model,
                      )
                      open(parseProposal(result.text))
                    } finally {
                      setBusy(false)
                    }
                  })
                }
              >
                {busy ? t.busy : t.ai}
              </button>
            </>
          )}
        </>
      )}
      <label>
        {t.proposal}
        <textarea
          maxLength={200000}
          value={proposal}
          onChange={(e) => setProposal(e.target.value)}
          rows={6}
        />
      </label>
      <button
        className="secondary"
        disabled={!proposal}
        onClick={() => void safe(async () => open(parseProposal(proposal)))}
      >
        {t.applyProposal}
      </button>
    </section>
  )
}
function GiftEditor({ language, safe }: { language: Language; safe: Safe }) {
  const t = skillLocales[language],
    blank = (): GiftQuestion => ({
      title: '',
      question: '',
      options: ['', '', '', ''],
      correct: 0,
      feedback: '',
    }),
    [questions, setQuestions] = useState<GiftQuestion[]>([blank()])
  const update = (i: number, q: GiftQuestion) =>
    setQuestions(questions.map((v, n) => (n === i ? q : v)))
  return (
    <details>
      <summary>{t.gift}</summary>
      <p>{t.giftHint}</p>
      {questions.map((q, i) => (
        <fieldset key={i}>
          <legend>
            {t.question} {i + 1}
          </legend>
          {(['title', 'question', 'feedback'] as const).map((k) => (
            <label key={k}>
              {k === 'title'
                ? t.questionTitle
                : k === 'question'
                  ? t.question
                  : t.feedback}
              <input
                value={q[k]}
                onChange={(e) => update(i, { ...q, [k]: e.target.value })}
              />
            </label>
          ))}
          {q.options.map((o, n) => (
            <label key={n}>
              {t.answer} {n + 1}
              <input
                value={o}
                onChange={(e) =>
                  update(i, {
                    ...q,
                    options: q.options.map((v, x) =>
                      x === n ? e.target.value : v,
                    ),
                  })
                }
              />
            </label>
          ))}
          <label>
            {t.correct}
            <select
              value={q.correct}
              onChange={(e) =>
                update(i, { ...q, correct: Number(e.target.value) })
              }
            >
              {q.options.map((_, n) => (
                <option key={n} value={n}>
                  {t.answer} {n + 1}
                </option>
              ))}
            </select>
          </label>
          <button
            onClick={() => setQuestions(questions.filter((_, n) => n !== i))}
          >
            {t.deleteItem}
          </button>
        </fieldset>
      ))}
      <div className="toolbar">
        <button onClick={() => setQuestions([...questions, blank()])}>
          {t.add}
        </button>
        <button
          className="primary"
          onClick={() =>
            void safe(async () =>
              downloadSkillFile(
                'aules.gift',
                generateGift(questions),
                'text/plain;charset=utf-8',
              ),
            )
          }
        >
          {t.downloadGift}
        </button>
      </div>
    </details>
  )
}
