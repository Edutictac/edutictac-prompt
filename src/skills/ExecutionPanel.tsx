import { useEffect, useState } from 'react'
import type { Language } from '../types'
import { defaultValues } from './model'
import { prepareExecution } from './execution'
import { inferSkill } from './client'
import { skillLocales } from './locales'
import { Markdown, ParameterInput } from './Editor'
import { downloadSkillFile } from './files'
import { ExternalButtons, useProviders } from './aiHelpers'
import type { Safe } from './safe'
import { languages, type Skill, type Value } from './types'

export function Runner({
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
          <textarea readOnly rows={12} aria-label={t.prepared} value={prepared} />
          <ExternalButtons text={prepared} language={language} copy={copy} safe={safe} />
          <p>{t.copilotHint}</p>
          <button onClick={() => void safe(() => onSaveResult(skill.name, prepared, responseLanguage))}>
            {t.savePrepared}
          </button>
          {p.providers.length ? (
            <>
              {p.select}
              <label className="check">
                <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
                {t.consent}
              </label>
              <button
                className="primary"
                disabled={!consent || busy}
                onClick={() =>
                  void safe(async () => {
                    setBusy(true)
                    try {
                      setResult((await inferSkill(skill, values, responseLanguage, p.provider, p.model)).text)
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
            <textarea rows={10} maxLength={200000} value={result} onChange={(e) => setResult(e.target.value)} />
          </label>
          <Markdown text={result} />
          <div className="toolbar">
            <button
              disabled={!result.trim()}
              onClick={() => void safe(() => onSaveResult(skill.name, result, responseLanguage))}
            >
              {t.saveResult}
            </button>
            <button
              disabled={!result}
              onClick={() => downloadSkillFile(`${skill.slug}-result.md`, result, 'text/markdown')}
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
