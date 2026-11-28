import { useEffect, useState } from 'react'
import { getFormatSyncStatus } from '../app/useDefaultFormatSync'
import { localizeOption } from '../optionLocales'
import { availableDefaultFormats, readDefaultFormat, writeDefaultFormat } from '../prompts/form/defaultFormat'
import type { Language } from '../types'

export function SettingsView({ t, language }: { t: Record<string, string>; language: Language }) {
  const [format, setFormat] = useState(readDefaultFormat)
  const [status, setStatus] = useState(getFormatSyncStatus)
  useEffect(() => {
    const refresh = () => setFormat(readDefaultFormat())
    const sync = () => setStatus(getFormatSyncStatus())
    window.addEventListener('prompt:default-format', refresh)
    window.addEventListener('prompt:format-sync', sync)
    return () => {
      window.removeEventListener('prompt:default-format', refresh)
      window.removeEventListener('prompt:format-sync', sync)
    }
  }, [])
  return (
    <main className="page settings-page">
      <h1>{t.settings}</h1>
      <section className="settings-panel" aria-labelledby="creation-preferences">
        <h2 id="creation-preferences">{t.creationPreferences}</h2>
        <p>{t.settingsFormatDescription}</p>
        <label htmlFor="default-output-format">{t.defaultOutputFormat}</label>
        <select
          id="default-output-format"
          value={format}
          onChange={(event) => {
            setFormat(event.target.value)
            writeDefaultFormat(event.target.value)
          }}
        >
          <option value="">{t.defaultOutputFormatNone}</option>
          {availableDefaultFormats.map((option) => (
            <option key={option} value={option}>
              {localizeOption(option, language)}
            </option>
          ))}
        </select>
        <p className="settings-status" role="status">
          {status === 'error'
            ? t.defaultFormatSyncFailed
            : status === 'syncing'
              ? t.defaultFormatSyncing
              : status === 'synced'
                ? t.defaultFormatAccount
                : t.defaultFormatLocal}
        </p>
      </section>
    </main>
  )
}
