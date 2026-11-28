import { lazy, Suspense, useState } from 'react'
import type { AuthUser } from '../api'
import type { Category, SavedPrompt } from '../types'
import { AiButtons } from './AiButtons'
import { SaveModal } from './SaveModal'
import type { PromptMetadata } from '../prompts/usePromptLibrary'

const SessionPack = lazy(() => import('./SessionPack'))

export function Library({
  t,
  saved,
  categories,
  updateMetadata,
  templateName,
  search,
  setSearch,
  remove,
  duplicate,
  exportAll,
  importFile,
  openSavedPrompt,
  copyPrompt,
  user,
  syncBusy,
  onSync,
  onLogin,
  central,
}: {
  t: Record<string, string>
  saved: SavedPrompt[]
  categories: Category[]
  updateMetadata: (item: SavedPrompt, metadata: PromptMetadata) => Promise<void>
  templateName: (id: string) => string
  search: string
  setSearch: (v: string) => void
  remove: (id: string) => void
  duplicate: (p: SavedPrompt) => void
  exportAll: () => void
  importFile: (f: File) => void
  openSavedPrompt: (p: SavedPrompt) => void
  copyPrompt: (text: string) => Promise<boolean>
  user: AuthUser | null
  syncBusy: boolean
  onSync: () => void
  onLogin: () => void
  central: boolean
}) {
  const [metadataError, setMetadataError] = useState('')
  const [editDetails, setEditDetails] = useState<SavedPrompt | null>(null)
  const [onlyFavorites, setOnlyFavorites] = useState(false)
  const [categoryFilter, setCategoryFilter] = useState('')
  const [tagFilter, setTagFilter] = useState('')
  const [toolFilter, setToolFilter] = useState('')
  const [sortOrder, setSortOrder] = useState('updated')
  const [status, setStatus] = useState<{ id: string; text: string } | null>(null)
  const [sessionIds, setSessionIds] = useState<string[]>([])
  const [showSession, setShowSession] = useState(false)
  const toggleSession = (id: string) =>
    setSessionIds((ids) => (ids.includes(id) ? ids.filter((item) => item !== id) : [...ids, id]))
  // Se respeta el orden en que se han marcado: es el orden de la sesión.
  const sessionPrompts = sessionIds
    .map((id) => saved.find((item) => item.id === id))
    .filter((item): item is SavedPrompt => Boolean(item))
  if (showSession && sessionPrompts.length)
    return (
      <main className="page">
        <Suspense fallback={null}>
          <SessionPack
            t={t}
            saved={sessionPrompts}
            templateName={templateName}
            copyText={copyPrompt}
            onClose={() => setShowSession(false)}
          />
        </Suspense>
      </main>
    )
  const normalize = (value: string) =>
    value
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLocaleLowerCase()
  const tags = [...new Set(saved.flatMap((item) => item.tags))].sort((a, b) => a.localeCompare(b))
  const tools = [...new Set(saved.map((item) => item.templateId).filter((id): id is string => Boolean(id)))].sort(
    (a, b) => templateName(a).localeCompare(templateName(b)),
  )
  const filtered = saved
    .filter(
      (p) =>
        normalize(`${p.title} ${p.prompt} ${p.tags.join(' ')} ${p.notes || ''}`).includes(normalize(search.trim())) &&
        (!onlyFavorites || p.favorite) &&
        (!categoryFilter || p.categoryId === categoryFilter) &&
        (!tagFilter || p.tags.includes(tagFilter)) &&
        (!toolFilter || p.templateId === toolFilter),
    )
    .sort((a, b) =>
      sortOrder === 'title' ? a.title.localeCompare(b.title) : (b.updatedAt || '').localeCompare(a.updatedAt || ''),
    )
  const statusText = (p: SavedPrompt) =>
    !user
      ? t.libraryDeviceOnly
      : p.syncStatus === 'conflict'
        ? t.librarySyncConflict
        : p.syncStatus === 'synced' && p.remoteId
          ? t.librarySynced
          : t.libraryPending
  return (
    <main className="page library-page">
      <div className="library-title">
        <div>
          <p className="eyebrow">EDUTICTAC PROMPT</p>
          <h1>{t.library}</h1>
        </div>
        <div className="toolbar">
          <button className="secondary" onClick={exportAll}>
            {t.export} JSON
          </button>
          <label className="secondary file-label">
            {t.import}
            <input
              type="file"
              accept=".json,application/json"
              onChange={(e) => e.target.files?.[0] && importFile(e.target.files[0])}
            />
          </label>
        </div>
      </div>
      <div className="library-account">
        {user ? (
          <>
            <span>{t.signedInAs.replace('{name}', user.name || user.email || '')}</span>
            <button className="secondary" onClick={onSync} disabled={syncBusy}>
              {syncBusy ? '…' : t.sync}
            </button>
          </>
        ) : central ? (
          <span>{t.libraryLoginHint}</span>
        ) : (
          <>
            <span>{t.libraryLoginHintLocal}</span>
            <button className="primary" onClick={onLogin}>
              {t.login}
            </button>
          </>
        )}
      </div>
      {user && <p className="mode-hint">{t.ownerLibraryHint}</p>}
      <div className="session-bar">
        <p className="mode-hint">{t.sessionBarHint}</p>
        <button
          type="button"
          className="primary"
          disabled={!sessionPrompts.length}
          onClick={() => setShowSession(true)}
        >
          ▦ {t.sessionPrepare.replace('{count}', String(sessionPrompts.length))}
        </button>
      </div>
      <input
        className="library-search"
        placeholder={t.librarySearch}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="library-filters" aria-label={t.libraryFilters}>
        <label className="library-favorite-filter">
          <input type="checkbox" checked={onlyFavorites} onChange={(e) => setOnlyFavorites(e.target.checked)} />
          {t.favoritesOnly}
        </label>
        <label>
          {t.category}
          <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
            <option value="">{t.allCategories}</option>
            {categories.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          {t.libraryTag}
          <select value={tagFilter} onChange={(e) => setTagFilter(e.target.value)}>
            <option value="">{t.allTags}</option>
            {tags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </label>
        <label>
          {t.libraryTool}
          <select value={toolFilter} onChange={(e) => setToolFilter(e.target.value)}>
            <option value="">{t.allTools}</option>
            {tools.map((id) => (
              <option key={id} value={id}>
                {templateName(id)}
              </option>
            ))}
          </select>
        </label>
        <label>
          {t.librarySort}
          <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
            <option value="updated">{t.sortRecent}</option>
            <option value="title">{t.sortTitle}</option>
          </select>
        </label>
      </div>
      {filtered.length === 0 ? (
        <div className="empty">{saved.length ? t.libraryNoResults : t.noPrompts}</div>
      ) : (
        <div className="saved-list">
          {filtered.map((p) => (
            <article className="saved-card" key={p.id}>
              <div className="saved-main">
                <div className="saved-meta">
                  <button
                    type="button"
                    className="favorite-toggle"
                    aria-pressed={p.favorite}
                    aria-label={`${p.favorite ? t.removeFavorite : t.addFavorite}: ${p.title}`}
                    onClick={() =>
                      void updateMetadata(p, {
                        title: p.title,
                        tags: p.tags,
                        notes: p.notes || '',
                        categoryId: p.categoryId,
                        favorite: !p.favorite,
                      }).catch(() => setStatus({ id: p.id, text: t.libraryUpdateFailed }))
                    }
                  >
                    {p.favorite ? '★' : '☆'}
                  </button>
                  <small>
                    {p.language} · {p.templateId ? templateName(p.templateId) : t.app}
                  </small>
                </div>
                <h3>{p.title}</h3>
                <p className="library-item-meta">
                  {categories.find((item) => item.id === p.categoryId)?.name &&
                    `${categories.find((item) => item.id === p.categoryId)?.name} · `}
                  {statusText(p)}
                </p>
                {p.notes && <p className="library-item-notes">{p.notes}</p>}
                {p.templateId && (
                  <label className="session-check">
                    <input type="checkbox" checked={sessionIds.includes(p.id)} onChange={() => toggleSession(p.id)} />{' '}
                    {t.sessionAdd}
                    {sessionIds.includes(p.id) && <strong> · {sessionIds.indexOf(p.id) + 1}</strong>}
                  </label>
                )}
                <p>
                  {p.prompt.slice(0, 220)}
                  {p.prompt.length > 220 ? '…' : ''}
                </p>
                <div className="tag-row">
                  {p.tags.map((tag) => (
                    <span key={tag}>#{tag}</span>
                  ))}
                </div>
                <div className="ai-launch saved-ai">
                  <p className="eyebrow">{t.openIn}</p>
                  <AiButtons
                    t={t}
                    prompt={p.prompt}
                    aiTool={p.values?.aiTool}
                    copyPrompt={copyPrompt}
                    onStatus={(text) => setStatus({ id: p.id, text })}
                  />
                  {status?.id === p.id && (
                    <span className="copy-status" role="status">
                      {status.text}
                    </span>
                  )}
                </div>
              </div>
              <div className="saved-actions">
                <button onClick={() => openSavedPrompt(p)}>{t.edit}</button>
                <button
                  onClick={() => {
                    setMetadataError('')
                    setEditDetails(p)
                  }}
                >
                  {t.editDetails}
                </button>
                <button
                  onClick={async () =>
                    setStatus({ id: p.id, text: (await copyPrompt(p.prompt)) ? t.copied : t.copyFailed })
                  }
                >
                  {t.copy}
                </button>
                <button onClick={() => duplicate(p)}>{t.duplicate}</button>
                <button onClick={() => downloadMarkdown(p)}>{t.export} MD</button>
                <button className="danger" onClick={() => remove(p.id)}>
                  {t.delete}
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
      {editDetails && (
        <SaveModal
          t={t}
          categories={categories}
          initial={editDetails}
          error={metadataError}
          onCancel={() => setEditDetails(null)}
          onSave={(meta) => {
            setMetadataError('')
            void updateMetadata(editDetails, meta)
              .then(() => setEditDetails(null))
              .catch(() => setMetadataError(t.libraryUpdateFailed))
          }}
        />
      )}
    </main>
  )
}
// Botones que copian el prompt y abren la IA elegida; la preferida (la del formulario o la última usada) va primero.

function downloadMarkdown(p: SavedPrompt) {
  const blob = `# ${p.title}\n\n${p.prompt}\n\n${p.notes || ''}`
  const a = document.createElement('a')
  a.href = URL.createObjectURL(new Blob([blob], { type: 'text/markdown' }))
  a.download = `${p.title.replace(/\s+/g, '-').toLowerCase()}.md`
  a.click()
}
