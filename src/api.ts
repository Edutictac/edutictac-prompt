import type { SavedPrompt } from './types'

const API_URL = (import.meta.env.VITE_PROMPT_API_URL || '').replace(/\/$/, '')
const apiUrl = (path: string) => `${API_URL}${path}`

export interface AuthUser { sub: string; name?: string; email?: string }
export interface AuthState { authenticated: boolean; user: AuthUser | null }

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(apiUrl(path), { ...init, credentials: 'include', headers: { 'Content-Type': 'application/json', ...(init?.headers || {}) } })
  if (!response.ok) throw new Error(`API ${response.status}`)
  return response.status === 204 ? undefined as T : response.json() as Promise<T>
}

export const authMe = () => request<AuthState>('/api/auth/me')
export const login = () => { window.location.href = apiUrl(`/api/auth/login?next=${encodeURIComponent(window.location.href)}`) }
export const logout = () => { window.location.href = apiUrl('/api/auth/logout') }
export const getRemotePrompts = () => request<{ prompts: SavedPrompt[] }>('/api/prompts')
export const putRemotePrompt = (prompt: SavedPrompt) => request<SavedPrompt>(`/api/prompts/${encodeURIComponent(prompt.id)}`, { method: 'PUT', body: JSON.stringify(prompt) })
export const deleteRemotePrompt = (id: string) => request<void>(`/api/prompts/${encodeURIComponent(id)}`, { method: 'DELETE' })
