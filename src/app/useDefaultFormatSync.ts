import { useEffect } from 'react'
import { getPreferences, putPreferences } from '../api'
import { availableDefaultFormats, readDefaultFormat, writeDefaultFormat } from '../prompts/form/defaultFormat'

const ownerKey = 'edutictac-default-format-owner'
const pendingKey = (sub: string) => `edutictac-default-format-pending:${sub}`
let failed = false
export const getFormatSyncStatus = () => failed
const setFailed = (value: boolean) => {
  failed = value
  window.dispatchEvent(new Event('prompt:format-sync'))
}
const read = (key: string): string | null => {
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}
const write = (key: string, value: string | null) => {
  try {
    if (value === null) localStorage.removeItem(key)
    else localStorage.setItem(key, value)
  } catch {
    /* optional storage */
  }
}

export function useDefaultFormatSync(sub?: string) {
  useEffect(() => {
    if (!sub) {
      setFailed(false)
      return
    }
    let active = true
    let running = false
    let changed = false
    let queued: string | null = read(pendingKey(sub))
    const flush = async () => {
      if (!active || running || queued === null) return
      running = true
      while (active && queued !== null) {
        const value: string = queued
        try {
          await putPreferences(value)
          if (!active) break
          if (queued === value) {
            queued = null
            write(pendingKey(sub), null)
          }
          setFailed(false)
        } catch {
          if (active) setFailed(true)
          break
        }
      }
      running = false
    }
    const onChange = (event: Event) => {
      const detail = (event as CustomEvent<{ format: string; source: string }>).detail
      if (detail.source !== 'user') return
      changed = true
      queued = detail.format
      write(ownerKey, sub)
      write(pendingKey(sub), queued)
      void flush()
    }
    const onOnline = () => {
      if (queued !== null) void flush()
      else void load()
    }
    const load = async () => {
      try {
        const result = await getPreferences()
        if (!active || changed) return
        const pending = read(pendingKey(sub))
        const owner = read(ownerKey)
        const remote = result.defaultOutputFormat
        if (pending !== null) {
          queued = pending
          writeDefaultFormat(pending, 'remote')
          write(ownerKey, sub)
          void flush()
        } else if (remote !== null && (remote === '' || availableDefaultFormats.includes(remote))) {
          writeDefaultFormat(remote, 'remote')
          write(ownerKey, sub)
          setFailed(false)
        } else if (remote === null) {
          // Adoptar la preferencia anónima solo si no pertenece a otra cuenta.
          const local = !owner || owner === sub ? readDefaultFormat() : ''
          if (owner && owner !== sub) writeDefaultFormat('', 'remote')
          write(ownerKey, sub)
          if (local) {
            queued = local
            write(pendingKey(sub), local)
            void flush()
          } else setFailed(false)
        }
      } catch {
        if (active) setFailed(true)
      }
    }
    window.addEventListener('prompt:default-format', onChange)
    window.addEventListener('online', onOnline)
    void load()
    return () => {
      active = false
      window.removeEventListener('prompt:default-format', onChange)
      window.removeEventListener('online', onOnline)
    }
  }, [sub])
}
