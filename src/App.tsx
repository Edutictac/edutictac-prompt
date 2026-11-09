import { lazy, Suspense, useEffect, useState } from 'react'
import { templates, simpleFieldIds } from './templates'
import { suggestionsFor } from './suggestions'
import { translations } from './locales'
import { generatePrompt } from './generator'
import {
  getCurriculumElements,
  joinCurriculumSelection,
  parseCurriculumSelection,
  valencianProfiles,
} from './curriculum'
import { guidedSteps, type GuidedStep } from './guided'
import type { Language, PromptTemplate, SavedPrompt, TemplateField } from './types'
import { login, logout } from './api'
import { localizeOption } from './optionLocales'
import { exampleValues } from './examples'
import { starterValues, type Starter } from './starters'
import { followUps } from './followUps'
import { EDUCEREA_URL, eduCreaNewProjectUrl, eduCreaPromptUrl } from './integrations'
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
import { AiButtons } from './components/AiButtons'
const AgentsView = lazy(() => import('./agents/AgentsView'))

const templateNameKeys: Record<string, string> = {
  'learning-situation': 'templateLearningSituation',
  lesson: 'templateLesson',
  sequence: 'templateSequence',
  'competency-activity': 'templateCompetencyActivity',
  project: 'templateProject',
  challenge: 'templateChallenge',
  rubric: 'templateRubric',
  checklist: 'templateChecklist',
  'rating-scale': 'templateRatingScale',
  'systematic-observation': 'templateSystematicObservation',
  portfolio: 'templatePortfolio',
  production: 'templateProduction',
  'written-test': 'templateWrittenTest',
  product: 'templateProduct',
  presentation: 'templatePresentation',
  h5p: 'templateH5p',
  scorm: 'templateScorm',
  'html-game': 'templateHtmlGame',
  gift: 'templateGift',
  qti: 'templateQti',
  'common-cartridge': 'templateCommonCartridge',
  feedback: 'templateFeedback',
  'three-levels': 'templateThreeLevels',
  'easy-reading': 'templateEasyReading',
  'bias-check': 'templateBiasCheck',
  'glossary-support': 'templateGlossarySupport',
  'family-note': 'templateFamilyNote',
  'tutoring-script': 'templateTutoringScript',
  'scientific-illustration': 'templateScientificIllustration',
  infographic: 'templateInfographic',
  'mind-map': 'templateMindMap',
  'udl-review': 'templateUdlReview',
  'udl-matrix': 'templateUdlMatrix',
  'student-tutor': 'templateStudentTutor',
  analogies: 'templateAnalogies',
  participation: 'templateParticipation',
  'conflict-mediation': 'templateConflictMediation',
  'multiple-choice': 'templateMultipleChoice',
  'ethical-dilemma': 'templateEthicalDilemma',
  'study-plan': 'templateStudyPlan',
  'historical-interview': 'templateHistoricalInterview',
  'code-coach': 'templateCodeCoach',
  free: 'templateFree',
}
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
const fieldNameKeys: Record<string, string> = {
  level: 'level',
  course: 'course',
  subject: 'subject',
  topic: 'topic',
  objectives: 'objectives',
  methodology: 'methodology',
  duration: 'duration',
  resources: 'resources',
  outputFormat: 'format',
  activity: 'activity',
  criteria: 'criteria',
  levels: 'levels',
  activityType: 'activityType',
  questionCount: 'questionCount',
  questionTypes: 'questionTypes',
  role: 'role',
  context: 'context',
  task: 'task',
  constraints: 'constraints',
  qualityCriteria: 'qualityCriteria',
  sourceText: 'sourceText',
  aiTool: 'aiTool',
  refinement: 'refinement',
  visualStyle: 'visualStyle',
  includeLabels: 'includeLabels',
  aspectRatio: 'aspectRatio',
  sections: 'sections',
  branches: 'branches',
  gameItems: 'gameItems',
  gameFeatures: 'gameFeatures',
  udl: 'udl',
  barriers: 'barriers',
}
const getTemplateName = (id: string, t: Record<string, string>) => t[templateNameKeys[id]] || id
const getFieldName = (id: string, t: Record<string, string>) => t[fieldNameKeys[id]] || id
const getFieldPlaceholder = (id: string, t: Record<string, string>, templateId?: string) =>
  (templateId ? t[`placeholder${id.charAt(0).toUpperCase()}${id.slice(1)}-${templateId}`] : '') ||
  t[`placeholder${id.charAt(0).toUpperCase()}${id.slice(1)}`] ||
  ''
// Si la plantilla no admite Markdown (H5P, SCORM, juego HTML...), su único
// formato propio queda preseleccionado.
const initialValues = (id: string): Record<string, string> => {
  const values = baseValues(id)
  const formats = templates.find((x) => x.id === id)?.fields.find((field) => field.id === 'outputFormat')?.options
  if (formats?.length && !formats.includes(values.outputFormat)) values.outputFormat = formats[0]
  return values
}
const baseValues = (id: string): Record<string, string> =>
  id === 'free'
    ? {
        role: '',
        context: '',
        task: '',
        constraints: '',
        qualityCriteria: '',
        refinement: '',
        aiTool: '',
        udl: '',
        barriers: '',
        outputFormat: 'Markdown',
        curriculumProfile: '',
        curriculumContext: '',
        curriculumCompetences: '',
        curriculumCriteria: '',
        curriculumKnowledge: '',
      }
    : {
        level: '',
        course: '',
        subject: '',
        topic: '',
        objectives: '',
        methodology: '',
        duration: '',
        resources: '',
        visualStyle: '',
        includeLabels: '',
        aspectRatio: '',
        sections: '',
        branches: '',
        gameItems: '',
        gameFeatures: '',
        outputFormat: 'Markdown',
        context: '',
        constraints: '',
        qualityCriteria: '',
        refinement: '',
        aiTool: '',
        udl: '',
        barriers: '',
        curriculumProfile: '',
        curriculumContext: '',
        curriculumCompetences: '',
        curriculumCriteria: '',
        curriculumKnowledge: '',
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
  const [selected, setSelected] = useState(templates[0])
  const [values, setValues] = useState<Record<string, string>>(initialValues(templates[0].id))
  const [prompt, setPrompt] = useState('')
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [modal, setModal] = useState(false)
  const [notice, setNotice] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
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
    const temp = templates.find((x) => x.id === id)!
    setSelected(temp)
    setValues(initialValues(temp.id))
    setPrompt('')
    setEditingId(null)
    setView('create')
  }
  function startFrom(starter: Starter) {
    const temp = templates.find((x) => x.id === starter.templateId)!
    setSelected(temp)
    setValues({ ...initialValues(temp.id), ...starterValues(starter, lang) })
    setPrompt('')
    setEditingId(null)
    setView('create')
  }
  function openSavedPrompt(item: SavedPrompt) {
    const temp = templates.find((x) => x.id === item.templateId)
    if (!temp) {
      setNotice(t.noPrompts)
      return
    }
    setSelected(temp)
    setValues(item.values || initialValues(temp.id))
    setPrompt(item.prompt)
    setEditingId(item.id)
    setView('create')
  }
  function generate() {
    setPrompt(generatePrompt(selected, values, lang))
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
    setEditingId(created.id)
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
    if (removed && id === editingId) setEditingId(null)
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
          clear={() => {
            setValues(initialValues(selected.id))
            setPrompt('')
            setEditingId(null)
          }}
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

function FieldControl({
  field,
  t,
  language,
  values,
  setValues,
  templateId,
}: {
  field: TemplateField
  t: Record<string, string>
  language: Language
  values: Record<string, string>
  setValues: (v: Record<string, string>) => void
  templateId: string
}) {
  const Field = field.type === 'multiselect' ? 'div' : 'label'
  return (
    <Field className="form-field">
      {getFieldName(field.id, t)}
      {field.id === 'topic' && <small>{t.topicHint}</small>}
      {field.id === 'udl' && <small>{t.udlHint}</small>}
      {field.id === 'barriers' && <small>{t.barriersHint}</small>}
      {field.type === 'textarea' ? (
        <textarea
          value={values[field.id] || ''}
          placeholder={getFieldPlaceholder(field.id, t, templateId)}
          onChange={(e) => setValues({ ...values, [field.id]: e.target.value })}
          rows={3}
        />
      ) : field.type === 'multiselect' ? (
        <span className="chip-group" role="group" aria-label={getFieldName(field.id, t)}>
          {field.options?.map((o) => {
            const chosen = (values[field.id] || '').split(' · ').filter(Boolean)
            const on = chosen.includes(o)
            return (
              <button
                type="button"
                key={o}
                className={`chip${on ? ' active' : ''}`}
                aria-pressed={on}
                onClick={(e) => {
                  e.preventDefault()
                  const next = field.options!.filter((x) => (x === o ? !on : chosen.includes(x)))
                  setValues({ ...values, [field.id]: next.join(' · ') })
                }}
              >
                {on ? '✓ ' : ''}
                {localizeOption(o, language)}
              </button>
            )
          })}
        </span>
      ) : field.type === 'select' ? (
        <select value={values[field.id] || ''} onChange={(e) => setValues({ ...values, [field.id]: e.target.value })}>
          <option value="">—</option>
          {field.options?.map((o) => (
            <option key={o} value={o}>
              {localizeOption(o, language)}
            </option>
          ))}
        </select>
      ) : (
        <input
          value={values[field.id] || ''}
          placeholder={getFieldPlaceholder(field.id, t, templateId)}
          onChange={(e) => setValues({ ...values, [field.id]: e.target.value })}
        />
      )}
      {suggestionsFor(field.id, language, values.level).length > 0 && (
        <span className="suggestions">
          {suggestionsFor(field.id, language, values.level).map((sg) => (
            <button
              type="button"
              key={sg}
              onClick={(e) => {
                e.preventDefault()
                const cur = (values[field.id] || '').trim()
                setValues({ ...values, [field.id]: cur && field.id !== 'topic' ? `${cur}; ${sg}` : sg })
              }}
            >
              {sg}
            </button>
          ))}
        </span>
      )}
    </Field>
  )
}

const guidedKey = (block: string) => `guided${block[0].toUpperCase()}${block.slice(1)}`
const stepTitle = (step: GuidedStep, t: Record<string, string>) =>
  step.block ? t[guidedKey(step.block)] || step.id : getFieldName(step.fields[0], t)
const stepHelp = (step: GuidedStep, t: Record<string, string>) =>
  step.block ? t[`${guidedKey(step.block)}Help`] || '' : ''

function GuidedSummary({
  t,
  language,
  selected,
  values,
  steps,
  onEdit,
}: {
  t: Record<string, string>
  language: Language
  selected: PromptTemplate
  values: Record<string, string>
  steps: GuidedStep[]
  onEdit: (index: number) => void
}) {
  const rows = steps.map((step, index) => ({
    step,
    index,
    items: step.fields.map((id) => {
      const field = selected.fields.find((item) => item.id === id)!
      const raw = (values[id] || '').trim()
      const value = !raw
        ? ''
        : field.options
          ? raw
              .split(' · ')
              .filter(Boolean)
              .map((option) => localizeOption(option, language))
              .join(' · ')
          : raw
      return { name: getFieldName(id, t), value }
    }),
  }))
  const missing: string[] = []
  if (selected.fields.some((field) => field.id === 'level') && !values.level) missing.push(getFieldName('level', t))
  if (selected.fields.some((field) => field.id === 'topic') && !values.topic) missing.push(getFieldName('topic', t))
  if (selected.fields.some((field) => field.id === 'task') && !values.task) missing.push(getFieldName('task', t))
  return (
    <section className="guided-step guided-summary">
      <h2 className="guided-title">{t.summaryTitle}</h2>
      <p className="guided-help">{t.summaryHelp}</p>
      {missing.length > 0 && (
        <p className="guided-missing">{t.summaryMissing.replace('{fields}', missing.join(', '))}</p>
      )}
      <div className="summary-list">
        {rows.map((row) => (
          <div className="summary-row" key={row.step.id}>
            <div className="summary-head">
              <strong>{stepTitle(row.step, t)}</strong>
              <button type="button" className="summary-edit" onClick={() => onEdit(row.index)}>
                {t.edit}
              </button>
            </div>
            {row.items.some((item) => item.value) ? (
              <dl>
                {row.items
                  .filter((item) => item.value)
                  .map((item) => (
                    <div key={item.name}>
                      <dt>{item.name}</dt>
                      <dd>{item.value}</dd>
                    </div>
                  ))}
              </dl>
            ) : (
              <p className="summary-empty">{t.summaryEmpty}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

function CreateView({
  t,
  language,
  selected,
  values,
  setValues,
  prompt,
  setPrompt,
  generate,
  setModal,
  choose,
  copyPrompt,
  clear,
  editingTitle,
  update,
}: {
  t: Record<string, string>
  language: Language
  selected: (typeof templates)[number]
  values: Record<string, string>
  setValues: (v: Record<string, string>) => void
  prompt: string
  setPrompt: (v: string) => void
  generate: () => void
  setModal: (v: boolean) => void
  choose: (id: string) => void
  copyPrompt: (text: string) => Promise<boolean>
  clear: () => void
  editingTitle?: string
  update: () => void
}) {
  const [copyState, setCopyState] = useState('')
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [mode, setMode] = useState<'simple' | 'advanced' | 'guided'>(() => {
    const saved = localStorage.getItem('edutictac-form-mode')
    return saved === 'advanced' || saved === 'guided' ? saved : 'simple'
  })
  const [stepIndex, setStepIndex] = useState(0)
  const steps = guidedSteps(selected)
  const changeMode = (next: 'simple' | 'advanced' | 'guided') => {
    setMode(next)
    try {
      localStorage.setItem('edutictac-form-mode', next)
    } catch {
      /* El modo es solo una preferencia de interfaz. */
    }
  }
  useEffect(() => {
    setStepIndex(0)
  }, [selected.id])
  const isAdvanced = mode === 'advanced'
  const loadExample = () => {
    const filled = Object.entries(values).some(([key, value]) => key !== 'outputFormat' && value.trim())
    if (filled && !window.confirm(t.loadExampleConfirm)) return
    const example = exampleValues(selected.id, language)
    setValues({ ...initialValues(selected.id), ...example })
    if (mode === 'simple' && Object.keys(example).some((key) => !simpleFieldIds[selected.id]?.includes(key)))
      changeMode('advanced')
    setPrompt('')
  }
  const visibleFields = selected.fields.filter((field) => isAdvanced || simpleFieldIds[selected.id]?.includes(field.id))
  const totalSteps = steps.length
  const atSummary = stepIndex >= totalSteps
  const currentStep = steps[Math.min(stepIndex, totalSteps - 1)]
  const generateFromSummary = () => {
    generate()
    if (window.matchMedia?.('(max-width:800px)').matches)
      window.setTimeout(
        () => document.querySelector('.preview')?.scrollIntoView({ behavior: 'smooth', block: 'start' }),
        60,
      )
  }
  const openEduCrea = async () => {
    if (!prompt) return
    setCopyState('')
    const win = window.open('', '_blank')
    if (win) {
      try {
        win.opener = null
      } catch {
        /* Algunos navegadores no permiten modificar opener. */
      }
    }
    const url = await eduCreaPromptUrl(prompt, selected.id, EDUCEREA_URL, { language, level: values.level })
    if (url && win) {
      try {
        win.location.replace(url)
        setCopyState(t.useInEduCreaOpened)
        return
      } catch {
        /* Si no se puede abrir con el encargo, se copia al portapapeles. */
      }
    }
    if (win) {
      try {
        win.close()
      } catch {
        /* La ventana pudo cerrarse ya. */
      }
    }
    window.open(eduCreaNewProjectUrl(), '_blank', 'noopener')
    const copied = await copyPrompt(prompt)
    setCopyState(copied ? t.useInEduCreaCopied : t.useInEduCreaCopyFailed)
  }
  return (
    <main className="workspace">
      <aside className="form-panel">
        <button className="back" onClick={() => choose(selected.id)}>
          ← {t.choose}
        </button>
        <p className="eyebrow">{t.create}</p>
        <h1>{getTemplateName(selected.id, t)}</h1>
        <div className="mode-switch" role="group" aria-label={t.formMode}>
          <button className={mode === 'simple' ? 'active' : ''} onClick={() => changeMode('simple')}>
            {t.simpleMode}
          </button>
          <button className={mode === 'guided' ? 'active' : ''} onClick={() => changeMode('guided')}>
            {t.guidedMode}
          </button>
          <button className={mode === 'advanced' ? 'active' : ''} onClick={() => changeMode('advanced')}>
            {t.advancedMode}
          </button>
        </div>
        <p className="mode-hint">
          {mode === 'advanced' ? t.advancedModeHint : mode === 'guided' ? t.guidedModeHint : t.simpleModeHint}
        </p>
        <button type="button" className="example-button" onClick={loadExample}>
          💡 {t.loadExample}
        </button>
        {mode === 'guided' ? (
          atSummary ? (
            <GuidedSummary
              t={t}
              language={language}
              selected={selected}
              values={values}
              steps={steps}
              onEdit={setStepIndex}
            />
          ) : (
            <section className="guided-step">
              <div className="guided-progress">
                <div className="guided-progress-text">
                  <strong>
                    {t.stepOf.replace('{current}', String(stepIndex + 1)).replace('{total}', String(totalSteps))}
                  </strong>
                  <span>
                    {stepIndex + 1 === totalSteps
                      ? t.lastStep
                      : t.stepsLeft.replace('{count}', String(totalSteps - stepIndex - 1))}
                  </span>
                </div>
                <div
                  className="guided-bar"
                  role="progressbar"
                  aria-valuemin={1}
                  aria-valuemax={totalSteps}
                  aria-valuenow={stepIndex + 1}
                >
                  <i style={{ width: `${((stepIndex + 1) / totalSteps) * 100}%` }} />
                </div>
              </div>
              <h2 className="guided-title">{stepTitle(currentStep, t)}</h2>
              {stepHelp(currentStep, t) && <p className="guided-help">{stepHelp(currentStep, t)}</p>}
              {currentStep.fields.includes('level') && (
                <CurriculumSelector t={t} language={language} values={values} setValues={setValues} advanced />
              )}
              {currentStep.fields.map((id) => {
                const field = selected.fields.find((item) => item.id === id)!
                return (
                  <FieldControl
                    key={id}
                    field={field}
                    t={t}
                    language={language}
                    values={values}
                    setValues={setValues}
                    templateId={selected.id}
                  />
                )
              })}
            </section>
          )
        ) : (
          <>
            <CurriculumSelector t={t} language={language} values={values} setValues={setValues} advanced />
            {visibleFields.map((field) => (
              <FieldControl
                key={field.id}
                field={field}
                t={t}
                language={language}
                values={values}
                setValues={setValues}
                templateId={selected.id}
              />
            ))}
          </>
        )}
        <p className="warning">ⓘ {t.warning}</p>
        <div className="actions">
          {mode === 'guided' ? (
            atSummary ? (
              <>
                <button className="primary" onClick={generateFromSummary}>
                  {t.generate}
                </button>
                <button className="secondary" onClick={() => setStepIndex(totalSteps - 1)}>
                  {t.back}
                </button>
              </>
            ) : (
              <>
                <button className="primary" onClick={() => setStepIndex((index) => Math.min(index + 1, totalSteps))}>
                  {stepIndex + 1 === totalSteps ? t.seeSummary : t.next}
                </button>
                {stepIndex > 0 && (
                  <button className="secondary" onClick={() => setStepIndex((index) => index - 1)}>
                    {t.back}
                  </button>
                )}
                <button
                  type="button"
                  className="skip-link"
                  onClick={() => setStepIndex((index) => Math.min(index + 1, totalSteps))}
                >
                  {t.skip}
                </button>
              </>
            )
          ) : (
            <>
              <button className="primary" onClick={generate}>
                {t.generate}
              </button>
              <button className="secondary" onClick={clear}>
                {t.clear}
              </button>
            </>
          )}
        </div>
      </aside>
      <section className={`preview${isFullscreen ? ' is-fullscreen' : ''}`}>
        <div className="preview-head">
          <div>
            <p className="eyebrow">{t.preview}</p>
            <h2>{getTemplateName(selected.id, t)}</h2>
            <small>{t.editableHint}</small>
          </div>
          <div className="preview-tools">
            <span className="status-dot">{t.localStatus}</span>
            <button
              className="secondary"
              onClick={() => setIsFullscreen((value) => !value)}
              aria-label={isFullscreen ? t.exitFullscreen : t.fullscreen}
            >
              {isFullscreen ? '↙' : '↗'} {isFullscreen ? t.exitFullscreen : t.fullscreen}
            </button>
          </div>
        </div>
        <textarea
          className="prompt-editor"
          aria-label={t.preview}
          value={prompt}
          placeholder={t.empty}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <div className="preview-actions">
          <button
            className="secondary"
            onClick={async () => setCopyState((await copyPrompt(prompt)) ? t.copied : t.copyFailed)}
          >
            {t.copy}
          </button>
          <button className="secondary" onClick={openEduCrea} title={t.useInEduCreaHint} disabled={!prompt}>
            {t.useInEduCrea}
          </button>
          {copyState && (
            <span className="copy-status" role="status">
              {copyState}
            </span>
          )}
          {editingTitle ? (
            <>
              <button className="primary" disabled={!prompt} onClick={update}>
                {t.update}
              </button>
              <button className="secondary" disabled={!prompt} onClick={() => setModal(true)}>
                {t.saveAsNew}
              </button>
            </>
          ) : (
            <button className="primary" disabled={!prompt} onClick={() => setModal(true)}>
              {t.save}
            </button>
          )}
        </div>
        {editingTitle && (
          <p className="editing-label">
            {t.editing} <strong>{editingTitle}</strong>
          </p>
        )}
        {prompt && (
          <div className="after-prompt">
            <div className="ai-launch">
              <p className="eyebrow">{t.openIn}</p>
              <AiButtons t={t} prompt={prompt} aiTool={values.aiTool} copyPrompt={copyPrompt} onStatus={setCopyState} />
            </div>
            <div className="follow-ups">
              <p className="eyebrow">{t.followUps}</p>
              <small>{t.followUpsHint}</small>
              <div className="follow-up-list">
                {followUps(selected.id, selected.category, language).map((text) => (
                  <button
                    type="button"
                    key={text}
                    onClick={async () => setCopyState((await copyPrompt(text)) ? t.followUpCopied : t.copyFailed)}
                  >
                    {text}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  )
}

function CurriculumSelector({
  t,
  language,
  values,
  setValues,
  advanced,
}: {
  t: Record<string, string>
  language: Language
  values: Record<string, string>
  setValues: (v: Record<string, string>) => void
  advanced: boolean
}) {
  return (
    <>
      <label className="curriculum-selector">
        {t.curriculum}
        <small>{t.general}</small>
        <select
          value={values.curriculumProfile || ''}
          onChange={(e) => {
            const profile = valencianProfiles.find((item) => item.id === e.target.value)
            setValues({
              ...values,
              curriculumProfile: e.target.value,
              curriculumContext: profile ? `${t.curriculumName}: ${profile.labels[language]}.` : '',
              level: profile?.level || values.level,
              course: profile ? '' : values.course,
              subject: (profile?.subject && profile.subjectLabels[language]) || values.subject,
            })
          }}
        >
          <option value="">{t.general}</option>
          {valencianProfiles.map((profile) => (
            <option value={profile.id} key={profile.id}>
              {profile.labels[language]}
            </option>
          ))}
        </select>
      </label>
      {advanced && <CurriculumElementsSelector t={t} language={language} values={values} setValues={setValues} />}
    </>
  )
}

function CurriculumElementsSelector({
  t,
  language,
  values,
  setValues,
}: {
  t: Record<string, string>
  language: Language
  values: Record<string, string>
  setValues: (v: Record<string, string>) => void
}) {
  const elements = getCurriculumElements(values.curriculumProfile || '', values.level, values.subject, language)
  if (!elements)
    return values.level && (values.curriculumProfile || values.subject) ? (
      <div className="curriculum-elements-group">
        <p className="eyebrow">{t.curriculumElements}</p>
        <small>{t.curriculumEmpty}</small>
      </div>
    ) : null
  const select = (
    key: 'curriculumCompetences' | 'curriculumCriteria' | 'curriculumKnowledge',
    label: string,
    options: string[],
  ) => {
    const selected = parseCurriculumSelection(values[key] || '', options)
    return (
      <fieldset className="curriculum-elements">
        <legend>{label}</legend>
        <div className="curriculum-options">
          {options.map((option) => (
            <label className="curriculum-option" key={option}>
              <input
                type="checkbox"
                checked={selected.includes(option)}
                onChange={(e) => {
                  const next = e.target.checked ? [...selected, option] : selected.filter((item) => item !== option)
                  setValues({ ...values, [key]: joinCurriculumSelection(next) })
                }}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </fieldset>
    )
  }
  return (
    <div className="curriculum-elements-group">
      <p className="eyebrow">{t.curriculumElements}</p>
      <small>{t.curriculumElementsHint}</small>
      {select('curriculumCompetences', t.specificCompetences, elements.specificCompetences)}
      {select('curriculumCriteria', t.assessmentCriteria, elements.assessmentCriteria)}
      {select('curriculumKnowledge', t.basicKnowledge, elements.basicKnowledge)}
    </div>
  )
}
