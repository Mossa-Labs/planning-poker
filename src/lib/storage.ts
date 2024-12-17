import { LOCAL_STORAGE_KEYS } from './constants'

export function getStoredSessionId(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(LOCAL_STORAGE_KEYS.SESSION_ID)
}

export function setStoredSessionId(sessionId: string): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(LOCAL_STORAGE_KEYS.SESSION_ID, sessionId)
}

export function getStoredPlayerName(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(LOCAL_STORAGE_KEYS.PLAYER_NAME)
}

export function setStoredPlayerName(name: string): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(LOCAL_STORAGE_KEYS.PLAYER_NAME, name)
}
