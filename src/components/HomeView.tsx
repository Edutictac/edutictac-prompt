import { useMemo } from 'react'
import { categoryIds, templates } from '../templates'
import { searchTemplates } from '../search'
import { starters, starterTitle, type Starter } from '../starters'
import { localizeOption } from '../optionLocales'
import type { Language } from '../types'

export function HomeView({
  t,
  lang,
  search,
  setSearch,
  category,
  setCategory,
  onChoose,
  onStart,
  onCreate,
  templateName,
  categoryLabel,
}: {
  t: Record<string, string>
  lang: Language
  search: string
  setSearch: (value: string) => void
  category: string
  setCategory: (value: string) => void
  onChoose: (id: string) => void
  onStart: (starter: Starter) => void
  onCreate: () => void
  templateName: (id: string) => string
  categoryLabel: (id: string) => string
}) {
  const visibleTemplates = useMemo(() => searchTemplates(search, category), [search, category])
  const hasQuery = search.trim().length > 0
  return (
    <main>
      <section className="hero">
        <div>
          <p className="eyebrow">EDUTICTAC COMMONS · LOCAL-FIRST</p>
          <h1>{t.tagline}</h1>
          <p className="lead">{t.lead}</p>
          <button className="primary" onClick={onCreate}>
            {t.create} <span>→</span>
          </button>
          <a className="hero-shortcut" href="https://e.edutictac.es/prompt">
            <span>{t.shortLink}</span>
            <strong>e.edutictac.es/prompt</strong>
          </a>
        </div>
        <div className="hero-card">
          <span>✦</span>
          <h3>{t.choose}</h3>
          <p>
            {templates.length} {t.toolsCount}
          </p>
          <div className="mini-lines">
            <i />
            <i />
            <i />
          </div>
        </div>
      </section>
      <section className="catalog-search" role="search">
        <div className="search-box">
          <svg className="search-icon" viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-4.2-4.2" />
          </svg>
          <input
            id="tool-search"
            type="search"
            autoComplete="off"
            aria-label={t.search}
            placeholder={t.searchPlaceholder}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {hasQuery && (
            <button type="button" className="search-clear" aria-label={t.clear} onClick={() => setSearch('')}>
              ×
            </button>
          )}
        </div>
        <p className="search-hint">{t.searchHint}</p>
        {hasQuery && (
          <p className="search-count" role="status">
            {visibleTemplates.length === 0
              ? t.noSearchResults
              : t.searchResults.replace('{count}', String(visibleTemplates.length))}
          </p>
        )}
      </section>
      {!hasQuery && (
        <section className="starters">
          <p className="eyebrow">{t.startHere}</p>
          <h2>{t.startHereTitle}</h2>
          <p className="mode-hint">{t.startHereHint}</p>
          <div className="cards">
            {starters.map((starter) => (
              <button className="tool-card starter-card" key={starter.id} onClick={() => onStart(starter)}>
                <span className="tool-icon">{starter.icon}</span>
                <strong>{starterTitle(starter, lang)}</strong>
                <small>
                  {localizeOption(starter.level, lang)} · {templateName(starter.templateId)}
                </small>
              </button>
            ))}
          </div>
        </section>
      )}
      <section className="catalog" id="catalog">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{t.catalog}</p>
            <h2>{t.choose}</h2>
          </div>
        </div>
        <div className="filters">
          {categoryIds.map((id) => (
            <button className={category === id ? 'active' : ''} onClick={() => setCategory(id)} key={id}>
              {categoryLabel(id)}
            </button>
          ))}
        </div>
        {visibleTemplates.length === 0 ? (
          <p className="empty">{t.noSearchResults}</p>
        ) : (
          <div className="cards">
            {visibleTemplates.map((template) => (
              <button className="tool-card" key={template.id} onClick={() => onChoose(template.id)}>
                <span className="tool-icon">{template.icon}</span>
                <strong>{templateName(template.id)}</strong>
                <small>{categoryLabel(template.category)}</small>
              </button>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}
