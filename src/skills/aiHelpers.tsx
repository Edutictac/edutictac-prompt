import { useEffect, useState } from 'react'
import type { Language } from '../types'
import { aiTargets, aiTargetUrl, rememberAiTarget } from '../followUps'
import { getCapabilities, type Provider } from './client'
import { skillLocales } from './locales'
import type { Safe } from './safe'

export function useProviders(language: Language) {
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
              const p = providers.find((p) => p.models.some((m) => `${p.id}:${m}` === e.target.value))
              if (p) {
                setProvider(p.id)
                setModel(p.models.find((m) => `${p.id}:${m}` === e.target.value)!)
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
export function ExternalButtons({
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
        <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
        {t.consent}
      </label>
      <div className="toolbar">
        <button
          disabled={!text}
          onClick={() => void safe(async () => setStatus((await copy(text)) ? t.copied : t.copyFailed))}
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
