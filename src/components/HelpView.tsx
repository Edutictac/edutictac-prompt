import { helpGuide } from '../help'
import { practicalHelp } from '../helpPractical'
import type { Language } from '../types'

export function HelpView({
  t,
  language,
  onChoose,
}: {
  t: Record<string, string>
  language: Language
  onChoose: (id: string) => void
}) {
  const guide = helpGuide(language)
  const practical = practicalHelp[language]
  return (
    <main className="page help">
      <p className="eyebrow">{t.help}</p>
      <h1>{guide.title}</h1>
      <p className="help-lead">{guide.lead}</p>
      <section className="help-quick" aria-labelledby="help-practical-title">
        <h2 id="help-practical-title">{practical.heading}</h2>
        <p>{practical.intro}</p>
        <div className="help-actions">
          {practical.actions.map((action) => (
            <button type="button" key={action.templateId} onClick={() => onChoose(action.templateId)}>
              <strong>{action.label}</strong>
              <span>{action.description}</span>
            </button>
          ))}
        </div>
      </section>
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
