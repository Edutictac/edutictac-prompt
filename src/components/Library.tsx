import { useState } from 'react'
import type { AuthUser } from '../api'
import type { SavedPrompt } from '../types'
import { AiButtons } from './AiButtons'

export function Library({
  t,
  saved,
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
  const [status, setStatus] = useState<{ id: string; text: string } | null>(null)
  const filtered = saved.filter((p) =>
    `${p.title} ${p.prompt} ${p.tags.join(' ')} ${p.notes || ''}`.toLowerCase().includes(search.toLowerCase()),
  )
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
      <input
        className="library-search"
        placeholder={t.librarySearch}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {filtered.length === 0 ? (
        <div className="empty">{t.noPrompts}</div>
      ) : (
        <div className="saved-list">
          {filtered.map((p) => (
            <article className="saved-card" key={p.id}>
              <div className="saved-main">
                <div className="saved-meta">
                  <span>{p.favorite ? '★' : '☆'}</span>
                  <small>
                    {p.language} · {p.templateId ? templateName(p.templateId) : t.app}
                  </small>
                </div>
                <h3>{p.title}</h3>
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
