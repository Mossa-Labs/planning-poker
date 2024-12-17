export function generateSessionId(): string {
    return Math.random().toString(36).substring(2, 8).toUpperCase()
  }
  
  export function validateSessionId(sessionId: string): boolean {
    return /^[A-Z0-9]{6}$/.test(sessionId)
  }