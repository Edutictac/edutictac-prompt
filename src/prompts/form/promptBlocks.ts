export type PromptBlock = {
  kind: 'heading' | 'bullet' | 'numbered' | 'paragraph' | 'blank'
  prefix: string
  text: string
  ending: string
}

// Solo se edita visualmente el subconjunto que puede reconstruirse sin pérdida.
// Los marcadores y separadores originales se conservan incluso al editar otros bloques.
export function parsePromptBlocks(value: string): PromptBlock[] | null {
  if (!value) return []
  if (/\r(?!\n)/.test(value)) return null
  const lines = value.match(/[^\r\n]*(?:\r\n|\n|$)/g)?.filter((line) => line.length > 0) || []
  const blocks: PromptBlock[] = []
  for (const raw of lines) {
    const ending = raw.endsWith('\r\n') ? '\r\n' : raw.endsWith('\n') ? '\n' : ''
    const line = ending ? raw.slice(0, -ending.length) : raw
    // No convertir código, tablas, citas, reglas, enlaces ni formato en línea.
    if (
      /^\s*(?:```|~~~|\||>|---\s*$|___\s*$|\*\*\*\s*$)/.test(line) ||
      /\*\*|__|`|!?\[[^\]]*\]\([^)]*\)|<\/?[A-Za-z][^>]*>|(?:^|\s)\*[^*]+\*(?=$|\s|[.,;:])|(?:^|\s)_[^_]+_(?=$|\s|[.,;:])|\\(?:\*|_|#|\[|\])/.test(
        line,
      )
    )
      return null
    if (!line.trim()) {
      blocks.push({ kind: 'blank', prefix: '', text: line, ending })
      continue
    }
    const heading = /^(#{1,6}[ \t]+)(.*)$/.exec(line)
    if (heading) {
      blocks.push({ kind: 'heading', prefix: heading[1], text: heading[2], ending })
      continue
    }
    const bullet = /^([ \t]*[-*+][ \t]+)(.*)$/.exec(line)
    if (bullet) {
      blocks.push({ kind: 'bullet', prefix: bullet[1], text: bullet[2], ending })
      continue
    }
    const numbered = /^([ \t]*\d+[.)][ \t]+)(.*)$/.exec(line)
    if (numbered) {
      blocks.push({ kind: 'numbered', prefix: numbered[1], text: numbered[2], ending })
      continue
    }
    if (/^\s{4,}\S/.test(line) || /^\s*#{1,6}(?:$|\s*$)/.test(line) || /^\s*[^|]+\|[^|]+\|/.test(line)) return null
    blocks.push({ kind: 'paragraph', prefix: '', text: line, ending })
  }
  return blocks
}

export function serializePromptBlocks(blocks: PromptBlock[]): string {
  return blocks.map((block) => block.prefix + block.text + block.ending).join('')
}
