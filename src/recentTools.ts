import { templates } from './templates'

// Herramientas usadas hace poco en este dispositivo, para la portada. Solo se
// guarda el id de la herramienta en localStorage (nunca datos del formulario).
const KEY = 'edutictac-prompt-recent-tools'
export const MAX_RECENT = 6

export function readRecentTools(): string[] {
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(KEY) || '[]')
    if (!Array.isArray(parsed)) return []
    return parsed
      .filter((id): id is string => typeof id === 'string' && templates.some((template) => template.id === id))
      .slice(0, MAX_RECENT)
  } catch {
    return []
  }
}

export function rememberRecentTool(id: string): string[] {
  const next = [id, ...readRecentTools().filter((item) => item !== id)].slice(0, MAX_RECENT)
  try {
    localStorage.setItem(KEY, JSON.stringify(next))
  } catch {
    /* Sin almacenamiento (modo privado): la portada simplemente no muestra recientes. */
  }
  return next
}
