import { lazy, Suspense, useEffect, useState } from 'react'
import { translations } from './locales'
import type { SavedPrompt } from './types'
import { login, logout } from './api'
import { usePromptLibrary, type PromptLibraryEvent } from './prompts/usePromptLibrary'
import { useAuth } from './app/useAuth'
import { usePreferences } from './app/usePreferences'
import { useAccountChip } from './app/useAccountChip'
import { usePwaUpdate } from './app/usePwaUpdate'
import { AppHeader } from './components/AppHeader'
import { AppFooter } from './components/AppFooter'
import { HomeView } from './components/HomeView'
import { Library } from './components/Library'
import { HelpView } from './components/HelpView'
import { SaveModal } from './components/SaveModal'
import { CreateView } from './prompts/form/CreateView'
import { getTemplateName } from './prompts/form/labels'
import { usePromptDraft } from './prompts/form/usePromptDraft'
import type { Starter } from './starters'
const AgentsView = lazy(() => import('./agents/AgentsView'))
const eventNoticeKeys: Record<PromptLibraryEvent, string> = {
  saved: 'savedOk',
  updated: 'updatedOk',
  deleteFailed: 'deleteFailed',
  syncDownloaded: 'syncDownloaded',
  syncUploaded: 'syncUploaded',
  syncFailed: 'syncFailed',
  importOk: 'importOk',
  invalidFile: 'invalidFile',
}

export default function App() {
  const { lang, setLang, setThemeMode, darkMode } = usePreferences()
  const { user, central } = useAuth()
  const chipReady = useAccountChip()
  const { updateAvailable, applyUpdate } = usePwaUpdate()
  const t = translations[lang]
  const [view, setView] = useState<'home' | 'create' | 'library' | 'privacy' | 'help' | 'agents'>(() =>
    location.hash === '#agents' || location.hash === '#skills' ? 'agents' : location.hash === '#help' ? 'help' : 'home',
  )
  const draft = usePromptDraft(lang)
  const { selected, values, setValues, prompt, setPrompt, editingId } = draft
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [modal, setModal] = useState(false)
  const [notice, setNotice] = useState('')
  const library = usePromptLibrary({
    user,
    defaultCategories: [t.planning, t.assessment, t.activities, t.digital],
    onEvent: (event) => setNotice(t[eventNoticeKeys[event]]),
  })
  const { saved, categories, syncBusy } = library
  const editing = saved.find((p) => p.id === editingId)
  useEffect(() => {
    if (view === 'agents') history.replaceState(null, '', '#agents')
    else if (location.hash === '#agents' || location.hash === '#skills')
      history.replaceState(null, '', location.pathname + location.search + (view === 'help' ? '#help' : ''))
  }, [view])
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [view])
  const categoryLabel = (id: string) => t[id] || id
  const templateName = (id: string) => getTemplateName(id, t)
  function choose(id: string) {
    draft.choose(id)
    setView('create')
  }
  function startFrom(starter: Starter) {
    draft.startFrom(starter)
    setView('create')
  }
  function openSavedPrompt(item: SavedPrompt) {
    if (!draft.open(item)) {
      setNotice(t.noPrompts)
      return
    }
    setView('create')
  }
  function generate() {
    draft.generate()
    setNotice('')
  }
  async function copyPrompt(text: string) {
    if (!text) return false
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text)
        return true
      }
    } catch {
      /* Use the legacy fallback below. */
    }
    const area = document.createElement('textarea')
    area.value = text
    area.setAttribute('readonly', '')
    area.style.position = 'fixed'
    area.style.opacity = '0'
    area.style.pointerEvents = 'none'
    document.body.appendChild(area)
    area.focus()
    area.select()
    area.setSelectionRange(0, text.length)
    let copied = false
    try {
      copied = document.execCommand('copy')
    } catch {
      /* El comando antiguo no está disponible: se mantiene el valor inicial. */
    }
    document.body.removeChild(area)
    return copied
  }
  async function save(meta: {
    title: string
    categoryId?: string
    categoryName?: string
    tags: string[]
    notes: string
    favorite: boolean
  }) {
    const created = await library.create({
      title: meta.title || templateName(selected.id),
      prompt,
      templateId: selected.id,
      values,
      language: lang,
      categoryId: meta.categoryId,
      categoryName: meta.categoryName,
      tags: meta.tags,
      notes: meta.notes,
      favorite: meta.favorite,
    })
    draft.beginEditing(created.id)
    setModal(false)
  }
  // Sobrescribe el prompt de la biblioteca que se está editando en lugar de crear una copia.
  async function update() {
    if (!editing) return
    await library.update(editing, { prompt, templateId: selected.id, values, language: lang })
  }
  async function remove(id: string) {
    const item = saved.find((p) => p.id === id)
    if (!item) return
    const removed = await library.remove(item)
    if (removed && id === editingId) draft.stopEditing()
  }
  async function duplicate(item: SavedPrompt) {
    await library.duplicate(item, t.duplicateSuffix)
  }
  function download(name: string, data: string, type = 'application/json') {
    const a = document.createElement('a')
    a.href = URL.createObjectURL(new Blob([data], { type }))
    a.download = name
    a.click()
    URL.revokeObjectURL(a.href)
  }
  function exportAll() {
    download('edutictac-prompts.json', JSON.stringify(library.exportData(), null, 2))
  }
  function importFile(file: File) {
    void library.importFile(file)
  }
  return (
    <div className="app" data-theme={darkMode ? 'dark' : 'light'}>
      <AppHeader
        t={t}
        lang={lang}
        onLanguageChange={setLang}
        darkMode={darkMode}
        onToggleTheme={() => setThemeMode(darkMode ? 'light' : 'dark')}
        onNavigate={(next) => setView(next)}
        user={user}
        chipReady={chipReady}
        syncBusy={syncBusy}
        onSync={() => void library.syncLocal()}
        onLogin={login}
        onLogout={logout}
      />
      {notice && (
        <div className="notice" role="status">
          {notice}
          <button onClick={() => setNotice('')}>×</button>
        </div>
      )}
      {updateAvailable && (
        <div className="update-banner" role="alert">
          <span>{t.updateAvailable}</span>
          <button className="primary" onClick={applyUpdate}>
            {t.updateButton}
          </button>
        </div>
      )}
      {view === 'home' && (
        <HomeView
          t={t}
          lang={lang}
          search={search}
          setSearch={setSearch}
          category={category}
          setCategory={setCategory}
          onChoose={choose}
          onStart={startFrom}
          onCreate={() => setView('create')}
          templateName={templateName}
          categoryLabel={categoryLabel}
        />
      )}
      {view === 'create' && (
        <CreateView
          t={t}
          language={lang}
          selected={selected}
          values={values}
          setValues={setValues}
          prompt={prompt}
          setPrompt={setPrompt}
          generate={generate}
          setModal={setModal}
          choose={choose}
          copyPrompt={copyPrompt}
          clear={draft.clear}
          editingTitle={editing?.title}
          update={update}
        />
      )}
      {view === 'library' && (
        <Library
          t={t}
          saved={saved}
          templateName={templateName}
          search={search}
          setSearch={setSearch}
          remove={remove}
          duplicate={duplicate}
          exportAll={exportAll}
          importFile={importFile}
          openSavedPrompt={openSavedPrompt}
          copyPrompt={copyPrompt}
          user={user}
          syncBusy={syncBusy}
          onSync={library.syncLocal}
          onLogin={login}
          central={central}
        />
      )}
      {view === 'agents' && (
        <Suspense
          fallback={
            <main className="page" aria-busy="true">
              {t.agents}…
            </main>
          }
        >
          <AgentsView
            key={user?.sub || 'local'}
            language={lang}
            sub={user?.sub}
            prompts={saved}
            copy={copyPrompt}
            onSaveResult={async (title, text, language) => {
              await library.create({
                title,
                prompt: text,
                templateId: 'free',
                language,
                tags: ['skill-result'],
                notes: '',
                favorite: false,
              })
            }}
          />
        </Suspense>
      )}
      {view === 'help' && <HelpView t={t} language={lang} />}
      {view === 'privacy' && (
        <main className="page">
          <p className="eyebrow">{t.privacy}</p>
          <h1>{t.privacyTitle}</h1>
          <p>{t.privacyText}</p>
          <p>
            <a href="https://edutictac.es/privacitat.html" target="_blank" rel="noopener">
              {t.privacyPolicy}
            </a>
          </p>
          <h2>{t.privacyHeading}</h2>
          <p>{t.privacyBody}</p>
          <p className="callout">{t.warning}</p>
        </main>
      )}
      {modal && <SaveModal t={t} categories={categories} onCancel={() => setModal(false)} onSave={save} />}
      <AppFooter t={t} />
    </div>
  )
}
