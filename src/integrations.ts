const DEFAULT_EDUCREA_URL = 'https://educrea.edutictac.es'

export const EDUCEREA_URL = (import.meta.env.VITE_EDUCREA_URL || DEFAULT_EDUCREA_URL).replace(/\/$/, '')

export function eduCreaNewProjectUrl(base: string = EDUCEREA_URL): string {
  return `${base.replace(/\/$/, '')}/projects?nuevo=1&desde=eduprompt`
}
