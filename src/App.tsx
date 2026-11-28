import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { templates } from './templates'
import { translations } from './locales'
import type { SavedPrompt } from './types'
import { login, logout } from './api'
import { usePromptLibrary, type PromptLibraryEvent } from './prompts/usePromptLibrary'
import { useAuth } from './app/useAuth'
import { usePreferences } from './app/usePreferences'
import { useDefaultFormatSync } from './app/useDefaultFormatSync'
import { useAccountChip } from './app/useAccountChip'
import { usePwaUpdate } from './app/usePwaUpdate'
import { AppHeader } from './components/AppHeader'
import { AppFooter } from './components/AppFooter'
import { HomeView } from './components/HomeView'
import { Library } from './components/Library'
import { SaveModal } from './components/SaveModal'
import { getTemplateName } from './prompts/form/labels'
import { usePromptDraft } from './prompts/form/usePromptDraft'
import { continuationValues } from './prompts/form/continueActivity'
import { splitTemplateHash } from './shareHash'
import { readRecentTools, rememberRecentTool } from './recentTools'
const AgentsView = lazy(() => import('./agents/AgentsView'))
const CreateView = lazy(() => import('./prompts/form/CreateView').then((module) => ({ default: module.CreateView })))
const HelpView = lazy(() => import('./components/HelpView').then((module) => ({ default: module.HelpView })))
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

const TEMPLATE_HASH = '#template/'
type View = 'home' | 'create' | 'library' | 'privacy' | 'help' | 'agents'
type NavigationState = {
  promptNavigation: true
  view: View
  draft: { templateId: string; values: Record<string, string>; prompt: string; editingId: string | null }
}

function viewFromHash(hash: string): View {
  if (templateIdFromHash(hash)) return 'create'
  if (hash === '#agents' || hash === '#skills') return 'agents'
  if (hash === '#library') return 'library'
  if (hash === '#privacy') return 'privacy'
  if (hash === '#help') return 'help'
  return 'home'
}

function hashForView(view: View, templateId: string): string {
  if (view === 'home') return ''
  if (view === 'create') return `#template/${templateId}`
  return `#${view}`
}

// Enlace directo a una plantilla: «#template/<id>». Un id desconocido se ignora.
export function templateIdFromHash(hash: string): string | undefined {
  if (!hash.startsWith(TEMPLATE_HASH)) return undefined
  let id = splitTemplateHash(hash).rawId.slice(TEMPLATE_HASH.length)
  try {
    id = decodeURIComponent(id)
  } catch {
    return undefined
  }
  return templates.some((template) => template.id === id) ? id : undefined
}

// Valores compartidos en «#template/<id>?d=…» (enlace con el formulario relleno).
// El descompresor solo se descarga cuando el enlace trae datos.
export async function sharedValuesFromHash(hash: string): Promise<Record<string, string>> {
  const id = templateIdFromHash(hash)
  const { data } = splitTemplateHash(hash)
  if (!id || !data) return {}
  const { decodeShareData } = await import('./shareLink')
  return decodeShareData(id, data)
}

export default function App() {
  const { lang, setLang, setThemeMode, darkMode } = usePreferences()
  const { user, central } = useAuth()
  useDefaultFormatSync(user?.sub)
  const chipReady = useAccountChip()
  const { updateAvailable, applyUpdate } = usePwaUpdate()
  const t = translations[lang]
  const [view, setView] = useState<View>(() => viewFromHash(location.hash))
  const [initialHash] = useState(() => location.hash)
  const draft = usePromptDraft(lang, templateIdFromHash(initialHash))
  const { selected, values, setValues, prompt, setPrompt, editingId } = draft
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [recentTools, setRecentTools] = useState(readRecentTools)
  const [modal, setModal] = useState(false)
  const [notice, setNotice] = useState('')
  const library = usePromptLibrary({
    user,
    defaultCategories: [t.planning, t.assessment, t.activities, t.digital],
    onEvent: (event) => setNotice(t[eventNoticeKeys[event]]),
  })
  const { saved, categories, syncBusy } = library
  const editing = saved.find((p) => p.id === editingId)
  const restoring = useRef(false)
  const lastLocation = useRef(location.href)
  const snapshot: NavigationState = {
    promptNavigation: true,
    view,
    draft: { templateId: selected.id, values, prompt, editingId },
  }
  const latestSnapshot = useRef(snapshot)
  latestSnapshot.current = snapshot

  // Actualizar la entrada actual sin borrar otras entradas del navegador.
  useEffect(() => {
    if (restoring.current) {
      restoring.current = false
      return
    }
    const hash = hashForView(view, selected.id)
    const url = location.pathname + location.search + hash
    history.replaceState(snapshot, '', url)
    lastLocation.current = location.href
  }, [view, selected.id, values, prompt, editingId])

  function navigate(next: View, templateId = selected.id) {
    const hash = hashForView(next, templateId)
    if (view === next && location.hash === hash) return
    history.replaceState(latestSnapshot.current, '', location.href)
    history.pushState(null, '', location.pathname + location.search + hash)
    lastLocation.current = location.href
    setView(next)
  }

  useEffect(() => {
    const id = templateIdFromHash(initialHash)
    if (id && splitTemplateHash(initialHash).data)
      void sharedValuesFromHash(initialHash).then((shared) => {
        if (Object.keys(shared).length) draft.choose(id, shared)
      })
  }, [])

  useEffect(() => {
    const onNavigation = (event: PopStateEvent | HashChangeEvent) => {
      // popstate y hashchange pueden llegar para el mismo movimiento.
      if (event.type === 'hashchange' && lastLocation.current === location.href) return
      lastLocation.current = location.href
      const state = history.state as NavigationState | null
      if (state?.promptNavigation) {
        restoring.current = true
        draft.restore(state.draft)
        setView(state.view)
        return
      }
      const hash = location.hash
      const id = templateIdFromHash(hash)
      if (id) {
        if (splitTemplateHash(hash).data) {
          void sharedValuesFromHash(hash).then((shared) => {
            if (location.hash === hash) draft.choose(id, shared)
          })
        } else if (latestSnapshot.current.draft.templateId !== id) draft.choose(id)
      }
      setView(viewFromHash(hash))
    }
    window.addEventListener('popstate', onNavigation)
    window.addEventListener('hashchange', onNavigation)
    return () => {
      window.removeEventListener('popstate', onNavigation)
      window.removeEventListener('hashchange', onNavigation)
    }
  }, [])
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [view])
  useEffect(() => {
    if (view === 'create' && selected.id !== 'free') setRecentTools(rememberRecentTool(selected.id))
  }, [view, selected.id])
  const categoryLabel = (id: string) => t[id] || id
  const templateName = (id: string) => getTemplateName(id, t)
  function choose(id: string) {
    navigate('create', id)
    draft.choose(id)
  }
  function continueWith(id: string) {
    const target = templates.find((template) => template.id === id)
    if (!target) return
    const preset = continuationValues(values, target)
    navigate('create', id)
    draft.choose(id, preset)
  }
  function openSavedPrompt(item: SavedPrompt) {
    if (!draft.open(item)) {
      setNotice(t.noPrompts)
      return
    }
    navigate('create', item.templateId)
  }
  async function generate() {
    setNotice('')
    await draft.generate()
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
        onNavigate={(next) => navigate(next)}
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
          recentTools={recentTools}
          onChoose={choose}
          onCreate={() => navigate('create')}
          templateName={templateName}
          categoryLabel={categoryLabel}
        />
      )}
      {view === 'create' && (
        <Suspense fallback={<main className="page" aria-busy="true" />}>
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
            goHome={() => {
              navigate('home')
              window.scrollTo(0, 0)
            }}
            copyPrompt={copyPrompt}
            clear={draft.clear}
            continueWith={continueWith}
            editingTitle={editing?.title}
            update={update}
          />
        </Suspense>
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
      {view === 'help' && (
        <Suspense
          fallback={
            <main className="page" aria-busy="true">
              {t.help}…
            </main>
          }
        >
          <HelpView t={t} language={lang} />
        </Suspense>
      )}
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
          <h2>{t.licenseHeading}</h2>
          <p>{t.licenseBody}</p>
          <p className="callout">{t.warning}</p>
        </main>
      )}
      {modal && <SaveModal t={t} categories={categories} onCancel={() => setModal(false)} onSave={save} />}
      <AppFooter t={t} />
    </div>
  )
}
