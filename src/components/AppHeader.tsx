import type { AuthUser } from '../api'
import type { Language } from '../types'

export type NavView = 'home' | 'library' | 'agents' | 'help' | 'privacy'

export function AppHeader({
  t,
  lang,
  onLanguageChange,
  darkMode,
  onToggleTheme,
  onNavigate,
  user,
  chipReady,
  syncBusy,
  onSync,
  onLogin,
  onLogout,
}: {
  t: Record<string, string>
  lang: Language
  onLanguageChange: (lang: Language) => void
  darkMode: boolean
  onToggleTheme: () => void
  onNavigate: (view: NavView) => void
  user: AuthUser | null
  chipReady: boolean
  syncBusy: boolean
  onSync: () => void
  onLogin: () => void
  onLogout: () => void
}) {
  return (
    <header>
      <button className="brand" onClick={() => onNavigate('home')}>
        <span>TT</span>
        <strong>{t.app}</strong>
      </button>
      <nav className="app-nav">
        <button onClick={() => onNavigate('home')}>{t.home}</button>
        <button onClick={() => onNavigate('library')}>{t.library}</button>
        <button onClick={() => onNavigate('agents')}>🧩 {t.agents}</button>
        <button onClick={() => onNavigate('help')}>{t.help}</button>
        <button onClick={() => onNavigate('privacy')}>{t.privacy}</button>
      </nav>
      <div className="header-options">
        <edutictac-account className="site-account" data-base="https://commons.edutictac.es" data-density="compact" />
        {!chipReady && (
          <>
            {user ? (
              <>
                <button className="account-button" onClick={onSync} disabled={syncBusy}>
                  {syncBusy ? '…' : t.sync}
                </button>
                <button className="account-button" onClick={onLogout}>
                  {t.logout}
                </button>
              </>
            ) : (
              <button className="account-button" onClick={onLogin}>
                {t.login}
              </button>
            )}
            <select aria-label={t.language} value={lang} onChange={(e) => onLanguageChange(e.target.value as Language)}>
              <option value="es">ES</option>
              <option value="ca-valencia">VA</option>
              <option value="ca">CA</option>
              <option value="en">EN</option>
            </select>
            <button
              className="theme-toggle"
              aria-label={`${t.theme}: ${darkMode ? t.light : t.dark}`}
              title={darkMode ? t.light : t.dark}
              onClick={onToggleTheme}
            >
              {darkMode ? '☀' : '☾'}
            </button>
          </>
        )}
      </div>
    </header>
  )
}
