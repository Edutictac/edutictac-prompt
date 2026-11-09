import { useEffect, useState } from 'react'
import { simpleFieldIds } from '../../templates'
import { exampleValues } from '../../examples'
import { guidedSteps } from '../../guided'
import { followUps } from '../../followUps'
import { EDUCEREA_URL, eduCreaNewProjectUrl, eduCreaPromptUrl } from '../../integrations'
import { AiButtons } from '../../components/AiButtons'
import type { Language, PromptTemplate } from '../../types'
import { CurriculumSelector } from './CurriculumSelector'
import { FieldControl } from './FieldControl'
import { GuidedSummary, stepHelp, stepTitle } from './GuidedSummary'
import { getTemplateName } from './labels'
import { initialValues } from './values'

export function CreateView({
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
  selected: PromptTemplate
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
