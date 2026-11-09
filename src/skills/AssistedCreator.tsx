import { useState } from 'react'
import type { Language } from '../types'
import { assistedPrompt, parseProposal } from './execution'
import { proposeSkill } from './client'
import { skillLocales } from './locales'
import { ExternalButtons, useProviders } from './aiHelpers'
import type { Safe } from './safe'
import type { SkillDefinition } from './types'

export function AiCreator({
  language,
  copy,
  safe,
  open,
}: {
  language: Language
  copy: (v: string) => Promise<boolean>
  safe: Safe
  open: (d: SkillDefinition) => void
}) {
  const t = skillLocales[language],
    [goal, setGoal] = useState(''),
    [text, setText] = useState(''),
    [proposal, setProposal] = useState(''),
    [consent, setConsent] = useState(false),
    [busy, setBusy] = useState(false),
    p = useProviders(language)
  return (
    <section>
      <p>{t.aiHint}</p>
      <label>
        {t.goal}
        <textarea
          value={goal}
          maxLength={10000}
          onChange={(e) => {
            setGoal(e.target.value)
            setText('')
            setConsent(false)
          }}
        />
      </label>
      <button className="secondary" onClick={() => void safe(async () => setText(assistedPrompt(goal, language)))}>
        {t.prepareAi}
      </button>
      {text && (
        <>
          <label>
            {t.prepared}
            <textarea readOnly rows={6} value={text} />
          </label>
          <ExternalButtons text={text} language={language} copy={copy} safe={safe} />
          {p.providers.length > 0 && (
            <>
              {p.select}
              <label className="check">
                <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
                {t.consent}
              </label>
              <button
                disabled={!consent || busy}
                onClick={() =>
                  void safe(async () => {
                    setBusy(true)
                    try {
                      const result = await proposeSkill(goal, language, p.provider, p.model)
                      open(parseProposal(result.text))
                    } finally {
                      setBusy(false)
                    }
                  })
                }
              >
                {busy ? t.busy : t.ai}
              </button>
            </>
          )}
        </>
      )}
      <label>
        {t.proposal}
        <textarea maxLength={200000} value={proposal} onChange={(e) => setProposal(e.target.value)} rows={6} />
      </label>
      <button
        className="secondary"
        disabled={!proposal}
        onClick={() => void safe(async () => open(parseProposal(proposal)))}
      >
        {t.applyProposal}
      </button>
    </section>
  )
}
