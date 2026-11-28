import { useEffect, useState } from 'react'
import type { ThemeMode } from '../app/usePreferences'
import { getFormatSyncStatus } from '../app/useDefaultFormatSync'
import { valencianProfiles } from '../curriculum'
import { aiTargets, explicitAiTarget, setPreferredAiTarget } from '../followUps'
import { localizeOption } from '../optionLocales'
import {
  availableDefaultFormats,
  readDefaultFormat,
  writeDefaultFormat,
  readDefaultCurriculum,
  writeDefaultCurriculum,
} from '../prompts/form/defaultFormat'
import type { Language } from '../types'

export function SettingsView({
  t,
  language,
  setLanguage,
  themeMode,
  setThemeMode,
  exportAll,
  importFile,
}: {
  t: Record<string, string>
  language: Language
  setLanguage: (value: Language) => void
  themeMode: ThemeMode
  setThemeMode: (value: ThemeMode) => void
  exportAll: () => void
  importFile: (file: File) => void
}) {
  const [format, setFormat] = useState(readDefaultFormat)
  const [profile, setProfile] = useState(readDefaultCurriculum)
  const [ai, setAi] = useState(explicitAiTarget)
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
        <label htmlFor="default-curriculum">{t.defaultCurriculum}</label>
        <p>{t.defaultCurriculumHint}</p>
        <select
          id="default-curriculum"
          value={profile}
          onChange={(event) => {
            setProfile(event.target.value)
            writeDefaultCurriculum(event.target.value)
          }}
        >
          <option value="">{t.general}</option>
          {valencianProfiles.map((item) => (
            <option key={item.id} value={item.id}>
              {item.labels[language]}
            </option>
          ))}
        </select>
        <label htmlFor="default-output-format">{t.defaultOutputFormat}</label>
        <p>{t.settingsFormatDescription}</p>
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
        <label htmlFor="preferred-ai">{t.preferredAi}</label>
        <p>{t.preferredAiHint}</p>
        <select
          id="preferred-ai"
          value={ai}
          onChange={(event) => {
            setAi(event.target.value)
            setPreferredAiTarget(event.target.value)
          }}
        >
          <option value="">{t.lastAiUsed}</option>
          {aiTargets.map((target) => (
            <option key={target.id} value={target.id}>
              {target.name}
            </option>
          ))}
        </select>
      </section>
      <section className="settings-panel" aria-labelledby="language-appearance">
        <h2 id="language-appearance">{t.languageAppearance}</h2>
        <label htmlFor="settings-language">{t.language}</label>
        <select
          id="settings-language"
          value={language}
          onChange={(event) => setLanguage(event.target.value as Language)}
        >
          <option value="es">Castellano</option>
          <option value="ca-valencia">Valencià</option>
          <option value="ca">Català</option>
          <option value="en">English</option>
        </select>
        <label htmlFor="settings-theme">{t.theme}</label>
        <select
          id="settings-theme"
          value={themeMode}
          onChange={(event) => setThemeMode(event.target.value as ThemeMode)}
        >
          <option value="system">{t.system}</option>
          <option value="light">{t.light}</option>
          <option value="dark">{t.dark}</option>
        </select>
      </section>
      <section className="settings-panel" aria-labelledby="library-data">
        <h2 id="library-data">{t.libraryData}</h2>
        <p>{t.libraryDataHint}</p>
        <div className="toolbar">
          <button type="button" className="secondary" onClick={exportAll}>
            {t.export} JSON
          </button>
          <label className="secondary file-label">
            {t.import}
            <input
              type="file"
              accept=".json,application/json"
              onChange={(event) => {
                const file = event.target.files?.[0]
                if (file) importFile(file)
                event.target.value = ''
              }}
            />
          </label>
        </div>
      </section>
    </main>
  )
}
