import { useState } from 'react'
import type { Language } from '../types'
import { generateGift, type GiftQuestion } from './execution'
import { skillLocales } from './locales'
import { downloadSkillFile } from './files'
import type { Safe } from './safe'

export function GiftEditor({ language, safe }: { language: Language; safe: Safe }) {
  const t = skillLocales[language],
    blank = (): GiftQuestion => ({
      title: '',
      question: '',
      options: ['', '', '', ''],
      correct: 0,
      feedback: '',
    }),
    [questions, setQuestions] = useState<GiftQuestion[]>([blank()])
  const update = (i: number, q: GiftQuestion) => setQuestions(questions.map((v, n) => (n === i ? q : v)))
  return (
    <details>
      <summary>{t.gift}</summary>
      <p>{t.giftHint}</p>
      {questions.map((q, i) => (
        <fieldset key={i}>
          <legend>
            {t.question} {i + 1}
          </legend>
          {(['title', 'question', 'feedback'] as const).map((k) => (
            <label key={k}>
              {k === 'title' ? t.questionTitle : k === 'question' ? t.question : t.feedback}
              <input value={q[k]} onChange={(e) => update(i, { ...q, [k]: e.target.value })} />
            </label>
          ))}
          {q.options.map((o, n) => (
            <label key={n}>
              {t.answer} {n + 1}
              <input
                value={o}
                onChange={(e) =>
                  update(i, {
                    ...q,
                    options: q.options.map((v, x) => (x === n ? e.target.value : v)),
                  })
                }
              />
            </label>
          ))}
          <label>
            {t.correct}
            <select value={q.correct} onChange={(e) => update(i, { ...q, correct: Number(e.target.value) })}>
              {q.options.map((_, n) => (
                <option key={n} value={n}>
                  {t.answer} {n + 1}
                </option>
              ))}
            </select>
          </label>
          <button onClick={() => setQuestions(questions.filter((_, n) => n !== i))}>{t.deleteItem}</button>
        </fieldset>
      ))}
      <div className="toolbar">
        <button onClick={() => setQuestions([...questions, blank()])}>{t.add}</button>
        <button
          className="primary"
          onClick={() =>
            void safe(async () => downloadSkillFile('aules.gift', generateGift(questions), 'text/plain;charset=utf-8'))
          }
        >
          {t.downloadGift}
        </button>
      </div>
    </details>
  )
}
