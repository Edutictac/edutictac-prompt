import { helpGuide } from '../help'
import type { Language } from '../types'

export function HelpView({ t, language }: { t: Record<string, string>; language: Language }) {
  const guide = helpGuide(language)
  return (
    <main className="page help">
      <p className="eyebrow">{t.help}</p>
      <h1>{guide.title}</h1>
      <p className="help-lead">{guide.lead}</p>
      <nav className="help-toc" aria-label={guide.contents}>
        <strong>{guide.contents}</strong>
        <ol>
          {guide.sections.map((s) => (
            <li key={s.id}>
              <a
                href={`#help-${s.id}`}
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById(`help-${s.id}`)?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                {s.title}
              </a>
            </li>
          ))}
        </ol>
      </nav>
      {guide.sections.map((s) => (
        <section key={s.id} id={`help-${s.id}`} className="help-section">
          <h2>{s.title}</h2>
          {s.intro && <p>{s.intro}</p>}
          {s.points && (
            <ul className={s.id === 'faq' ? 'help-faq' : ''}>
              {s.points.map(([label, text]) => (
                <li key={label}>
                  <strong>{label}</strong> {text}
                </li>
              ))}
            </ul>
          )}
          {s.example && (
            <div className="help-example">
              <p>
                <span>{guide.beforeLabel}</span>
                {s.example.before}
              </p>
              <p>
                <span>{guide.afterLabel}</span>
                {s.example.after}
              </p>
            </div>
          )}
          {s.tip && <p className="callout">{s.tip}</p>}
        </section>
      ))}
    </main>
  )
}
