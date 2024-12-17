export interface Player {
    id: number
    name: string
    vote: number | string | null
  }
  
  export interface GameSession {
    id: string
    players: Player[]
    revealed: boolean
  }