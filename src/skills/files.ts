export function downloadSkillFile(
  name: string,
  data: string | Uint8Array,
  type: string,
) {
  const blob = new Blob(
    [typeof data === 'string' ? data : Uint8Array.from(data).buffer],
    { type },
  )
  const url = URL.createObjectURL(blob),
    a = document.createElement('a')
  a.href = url
  a.download = name
  a.click()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}
