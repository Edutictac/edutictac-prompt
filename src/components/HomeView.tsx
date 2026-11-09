import { useMemo } from 'react'
import { categoryIds, templates } from '../templates'
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
  const visibleTemplates = useMemo(
    () =>
      templates.filter(
        (template) =>
          (category === 'all' || template.category === category) &&
          templateName(template.id).toLowerCase().includes(search.toLowerCase()),
      ),
    [search, category, lang],
  )
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
      <section className="catalog">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{t.catalog}</p>
            <h2>{t.choose}</h2>
          </div>
          <input
            aria-label={t.search}
            placeholder={t.search}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="filters">
          {categoryIds.map((id) => (
            <button className={category === id ? 'active' : ''} onClick={() => setCategory(id)} key={id}>
              {categoryLabel(id)}
            </button>
          ))}
        </div>
        <div className="cards">
          {visibleTemplates.map((template) => (
            <button className="tool-card" key={template.id} onClick={() => onChoose(template.id)}>
              <span className="tool-icon">{template.icon}</span>
              <strong>{templateName(template.id)}</strong>
              <small>{categoryLabel(template.category)}</small>
            </button>
          ))}
        </div>
      </section>
    </main>
  )
}
