import { useMemo } from 'react'
import { categoryIds, templates } from '../templates'
import { searchTemplates } from '../search'
import { changelogUrl, news, newsVersion } from '../news'
import type { Language } from '../types'

export function HomeView({
  t,
  lang,
  search,
  setSearch,
  category,
  setCategory,
  onChoose,
  recentTools = [],
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
  recentTools?: string[]
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
      {!hasQuery && recentTools.length > 0 && (
        <section className="recent" aria-labelledby="recent-title">
          <h2 id="recent-title">{t.recentTools}</h2>
          <div className="recent-list">
            {recentTools.map((id) => (
              <button type="button" className="recent-chip" key={id} onClick={() => onChoose(id)}>
                <span aria-hidden="true">{templates.find((template) => template.id === id)?.icon}</span>{' '}
                {templateName(id)}
              </button>
            ))}
          </div>
        </section>
      )}
      {!hasQuery && (
        <section className="news" aria-labelledby="news-title">
          <p className="eyebrow">
            {t.newsEyebrow} · v{newsVersion}
          </p>
          <h2 id="news-title">{t.newsTitle}</h2>
          <div className="cards">
            {news.map((item) => (
              <button className="tool-card news-card" key={item.templateId} onClick={() => onChoose(item.templateId)}>
                <span className="tool-icon">{templates.find((template) => template.id === item.templateId)?.icon}</span>
                <strong>{templateName(item.templateId)}</strong>
                <small>{item.text[lang]}</small>
              </button>
            ))}
          </div>
          <a className="news-more" href={changelogUrl} target="_blank" rel="noreferrer">
            {t.newsMore} →
          </a>
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
