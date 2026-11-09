import { useEffect, useState } from 'react'
import type { Language, SavedPrompt } from '../types'
import { db } from '../db'
import { builtinSkills } from './seeds'
import { blankDefinition, SkillError, slugify, validateDefinition } from './model'
import { deleteSkill, duplicateSkill, importSkill, listSkills, revisions, saveSkill, skillOwner } from './repository'
import { categories, languages, stages, type Skill, type SkillDefinition, type SkillRevision } from './types'
import { exportPackage, type PackageTarget } from './packages'
import { deleteRemoteSkill, putSkill, remoteSkills } from './client'
import { skillLocales, type SkillTexts } from './locales'
import Editor, { Markdown } from './Editor'
import { downloadSkillFile } from './files'
import { AiCreator } from './AssistedCreator'
import { GiftEditor } from './GiftEditor'
import { Runner } from './ExecutionPanel'
import { TransferPanel } from './TransferPanel'
import './skills.css'
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
  onSaveResult: (title: string, text: string, language: Language) => Promise<void>
}) {
  const t = skillLocales[language],
    owner = skillOwner(sub),
    [tab, setTab] = useState<'explore' | 'create' | 'mine' | 'transfer'>('explore'),
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
  const newDraft = (d: SkillDefinition, existing?: Skill, isImported = false) => {
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
    downloadSkillFile(`${skill.slug}-${target}.zip`, exportPackage(skill, target), 'application/zip')
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
      if (raw.ownerId !== owner || raw.source === 'builtin') throw new SkillError('permission')
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
          `${s.name} ${s.description} ${s.tags.join(' ')}`.toLocaleLowerCase().includes(query.toLocaleLowerCase()),
      )
      .sort((a, b) =>
        sort === 'recent' ? b.updatedAt.localeCompare(a.updatedAt) : a.name.localeCompare(b.name, language),
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
                else await saveSkill(normalized, owner, editing, editing?.reviewed ?? true)
                await refresh()
                changeTab('mine')
                setNotice(t.saved)
              })
            }
          />
          <details>
            <summary>{t.ai}</summary>
            <AiCreator language={language} copy={copy} safe={safe} open={(d) => newDraft(d)} />
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
                disabled={!selected.reviewed || selected.mode !== 'instructions'}
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
            {selected.author} · {selected.license} · {selected.version} · {t[`lang_${selected.language}`]}
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
            {selected.source !== 'builtin' && <button onClick={() => newDraft(selected, selected)}>{t.edit}</button>}
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
            <button onClick={() => void safe(() => exported(selected, 'agents'))}>{t.exportAgents}</button>
            <button onClick={() => void safe(() => exported(selected, 'm365'))}>{t.exportM365}</button>
            {selected.source !== 'builtin' && (
              <>
                <button onClick={() => void safe(async () => setHistory(await revisions(selected.id, owner)))}>
                  {t.history}
                </button>
                <button
                  className="danger"
                  onClick={() => {
                    if (window.confirm(t.confirmDelete))
                      void safe(async () => {
                        if (selected.synced) await deleteRemoteSkill(selected.id)
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
              {t.revision} {r.revision} · {r.snapshot.version} · {r.snapshot.updatedAt}{' '}
              <button
                onClick={() =>
                  void safe(async () => {
                    const next = await saveSkill(r.snapshot, owner, selected, r.snapshot.reviewed)
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
          {selected.slug === 'crear-cuestionarios-aules' && <GiftEditor language={language} safe={safe} />}
        </>
      ) : tab === 'transfer' ? (
        <TransferPanel
          t={t}
          language={language}
          items={items}
          safe={safe}
          onExport={exported}
          onImport={(definition) => newDraft(definition, undefined, true)}
        />
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
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
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
              <select value={definitionLanguage} onChange={(e) => setDefinitionLanguage(e.target.value)}>
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
                  {t[s.source === 'builtin' ? 'builtin' : s.source === 'imported' ? 'imported' : 'personal']} ·{' '}
                  {t[`cat_${s.category}`]}
                </small>
                <h2>{s.name}</h2>
                <p>{s.description}</p>
                <small>
                  {s.author} · {t[`lang_${s.language}`]} · v{s.version} · {s.license}
                </small>
                <small>{s.mode === 'instructions' ? 'Codex · OpenCode · M365*' : t.externalMode}</small>
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
