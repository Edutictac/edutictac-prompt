import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { parsePromptBlocks, serializePromptBlocks, type PromptBlock } from './promptBlocks'

type Props = { value: string; onChange: (value: string) => void; t: Record<string, string> }

function AutoTextarea({ text, label, onChange }: { text: string; label: string; onChange: (value: string) => void }) {
  const ref = useRef<HTMLTextAreaElement>(null)
  useLayoutEffect(() => {
    const input = ref.current
    if (!input) return
    input.style.height = 'auto'
    input.style.height = `${input.scrollHeight}px`
  }, [text])
  useEffect(() => {
    const input = ref.current
    if (!input || typeof ResizeObserver === 'undefined') return
    let width = 0
    const observer = new ResizeObserver((entries) => {
      const nextWidth = entries[0]?.contentRect.width || 0
      if (!nextWidth || nextWidth === width) return
      width = nextWidth
      input.style.height = 'auto'
      input.style.height = `${input.scrollHeight}px`
    })
    observer.observe(input)
    return () => observer.disconnect()
  }, [])
  return (
    <textarea ref={ref} rows={1} aria-label={label} value={text} onChange={(event) => onChange(event.target.value)} />
  )
}

export function PromptEditor({ value, onChange, t }: Props) {
  const [mode, setMode] = useState<'visual' | 'source'>('visual')
  const [blocks, setBlocks] = useState<PromptBlock[] | null>(() => parsePromptBlocks(value))
  const lastSent = useRef(value)
  useEffect(() => {
    if (value !== lastSent.current) {
      lastSent.current = value
      setBlocks(parsePromptBlocks(value))
    }
  }, [value])
  const showSource = mode === 'source' || blocks === null || !value
  const update = (index: number, text: string) => {
    if (!blocks) return
    const next = blocks.map((block, i) => (i === index ? { ...block, text } : block))
    const result = serializePromptBlocks(next)
    lastSent.current = result
    setBlocks(next)
    onChange(result)
  }
  const changeList = (index: number, action: 'add' | 'remove') => {
    if (!blocks) return
    const current = blocks[index]
    const next = [...blocks]
    if (action === 'remove') next.splice(index, 1)
    else {
      const ending = current.ending || (value.includes('\r\n') ? '\r\n' : '\n')
      if (!current.ending) next[index] = { ...current, ending }
      const prefix =
        current.kind === 'numbered'
          ? current.prefix.replace(/\d+/, (number) => String(Number(number) + 1))
          : current.prefix
      next.splice(index + 1, 0, { ...current, prefix, text: '', ending: current.ending })
    }
    const result = serializePromptBlocks(next)
    lastSent.current = result
    setBlocks(next)
    onChange(result)
  }
  const switchToVisual = () => {
    const parsed = parsePromptBlocks(value)
    if (parsed === null) return
    lastSent.current = value
    setBlocks(parsed)
    setMode('visual')
  }
  return (
    <div className="prompt-edit-area">
      <div className="prompt-view-switch" role="group" aria-label={t.promptEditorMode}>
        <button
          type="button"
          className={!showSource ? 'active' : ''}
          aria-pressed={!showSource}
          disabled={blocks === null || !value}
          onClick={switchToVisual}
        >
          {t.promptVisual}
        </button>
        <button
          type="button"
          className={showSource ? 'active' : ''}
          aria-pressed={showSource}
          onClick={() => setMode('source')}
        >
          {t.promptSource}
        </button>
      </div>
      {blocks === null && (
        <p className="mode-hint" role="status">
          {t.promptComplexHint}
        </p>
      )}
      {showSource ? (
        <textarea
          className="prompt-editor"
          aria-label={t.preview}
          value={value}
          placeholder={t.empty}
          onChange={(event) => {
            setMode('source')
            onChange(event.target.value)
          }}
        />
      ) : (
        <>
          <p className="prompt-visual-hint">{t.promptVisualHint}</p>
          <div className="prompt-visual" aria-label={t.promptVisual}>
            {blocks!.map((block, index) =>
              block.kind === 'blank' ? (
                <div className="prompt-blank" key={index} aria-hidden="true" />
              ) : (
                <div className={`prompt-block prompt-block-${block.kind}`} key={index}>
                  {(block.kind === 'bullet' || block.kind === 'numbered') && (
                    <span className="prompt-bullet" aria-hidden="true">
                      {block.kind === 'numbered' ? block.prefix.trim() : '•'}
                    </span>
                  )}
                  <AutoTextarea
                    label={`${block.kind === 'heading' ? t.promptHeading : block.kind === 'bullet' || block.kind === 'numbered' ? t.promptListItem : t.promptParagraph} ${index + 1}`}
                    text={block.text}
                    onChange={(text) => update(index, text)}
                  />
                  {block.kind === 'bullet' && (
                    <div className="prompt-list-actions">
                      <button
                        type="button"
                        aria-label={`${t.promptAddItem} ${index + 1}`}
                        title={t.promptAddItem}
                        onClick={() => changeList(index, 'add')}
                      >
                        +
                      </button>
                      <button
                        type="button"
                        aria-label={`${t.promptRemoveItem} ${index + 1}`}
                        title={t.promptRemoveItem}
                        onClick={() => changeList(index, 'remove')}
                      >
                        ×
                      </button>
                    </div>
                  )}
                </div>
              ),
            )}
          </div>
        </>
      )}
    </div>
  )
}
