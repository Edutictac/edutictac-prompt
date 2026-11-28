import type { Language } from '../types'
import type { Skill } from './types'
import type { AgentConfiguration, AgentDraft } from './agents'
import { agentGuide, agentLimits } from './agents'
import { agentLocales } from './agentLocales'
import { skillLocales } from './locales'
import { basicLocales } from '../agents/basicLocales'
import { agentTestCases } from '../agents/guidance'
import { slugify } from './model'
import { downloadSkillFile } from './files'

export default function AgentTransfer({
  language,
  basic,
  configuration,
  draft,
  skill,
  copyField,
}: {
  language: Language
  basic: boolean
  configuration: AgentConfiguration
  draft: AgentDraft
  skill?: Skill
  copyField: (text: string) => Promise<void>
}) {
  const b = basicLocales[language]
  const t = agentLocales[language]
  const labels = skillLocales[language]
  return (
    <details className="agent-transfer" open={!basic}>
      <summary>{basic ? b.transfer : t.setup[1]}</summary>
      <p>{b.transferHint}</p>
      <p className="mode-hint">{b.access}</p>
      <p className="warning">{t.privacy}</p>
      <p>
        <a
          className="secondary"
          href="https://m365.cloud.microsoft/agents/new"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t.open} ↗
        </a>
      </p>
      {(['name', 'description', 'instructions'] as const).map((key) => (
        <div className="agent-copy-field" key={key}>
          {key === 'instructions' && basic ? (
            <details>
              <summary>{b.preview}</summary>
              <label>
                {t[key]}
                <textarea aria-label={t[key]} readOnly rows={10} value={configuration[key]} />
              </label>
              <small>
                {configuration[key].length} / {agentLimits[key]}
              </small>
            </details>
          ) : (
            <label>
              {t[key]}
              <textarea
                aria-label={t[key]}
                readOnly
                rows={key === 'instructions' ? 14 : 2}
                value={configuration[key]}
              />
              <small>
                {configuration[key].length} / {agentLimits[key]}
              </small>
            </label>
          )}
          <button
            className="secondary"
            aria-label={`${t.copy}: ${t[key]}`}
            onClick={() => void copyField(configuration[key])}
          >
            {t.copy}
          </button>
        </div>
      ))}
      <h4>{t.starters}</h4>
      {configuration.starters.map((prompt, i) => (
        <div className="agent-copy-field" key={i}>
          <label>
            {prompt.name}
            <textarea readOnly rows={3} value={prompt.message} />
          </label>
          <button
            className="secondary"
            aria-label={`${t.copy}: ${prompt.name}`}
            onClick={() => void copyField(prompt.message)}
          >
            {t.copy}
          </button>
        </div>
      ))}
      <h3>{t.setup[2]}</h3>
      <h4>{t.documents}</h4>
      <p>{t.documentsHelp}</p>
      {configuration.materials.length > 0 && (
        <ul>
          {configuration.materials.map((m, i) => (
            <li key={i}>{m}</li>
          ))}
        </ul>
      )}
      {skill?.resources.map((r) => (
        <p key={r.path}>
          <button
            className="secondary"
            onClick={() => downloadSkillFile(r.path.replace('/', '-') + '.txt', r.content, 'text/plain;charset=utf-8')}
          >
            {labels.download}: {r.path} (.txt)
          </button>
        </p>
      ))}
      <h4>{basic ? b.tests : t.test}</h4>
      <p>{t.testHelp}</p>
      <div className="agent-tests">
        {agentTestCases(draft, language).map((question, index) => (
          <div className="agent-copy-field" key={index}>
            <p>{[b.testUsual, b.testMissing, b.testOutside][index]}</p>
            <label>
              {b.testPrompt}
              <textarea readOnly rows={2} value={question} />
            </label>
            <button
              className="secondary"
              aria-label={`${t.copy}: ${b.testPrompt} ${index + 1}`}
              onClick={() => void copyField(question)}
            >
              {t.copy}
            </button>
          </div>
        ))}
      </div>
      <p className="callout">{t.complete}</p>
      <button
        className="secondary"
        onClick={() =>
          downloadSkillFile(
            `${slugify(configuration.name)}-m365.md`,
            agentGuide(configuration, language),
            'text/markdown;charset=utf-8',
          )
        }
      >
        {t.download}
      </button>
    </details>
  )
}
