import { Player } from './types'

export function calculateAverageVote(players: Player[]): string {
  const numericVotes = players
    .map(player => player.vote)
    .filter((vote): vote is number => 
      typeof vote === 'number' && !isNaN(vote)
    )
  
  if (numericVotes.length === 0) return '0'
  
  const average = numericVotes.reduce((a, b) => a + b, 0) / numericVotes.length
  return average.toFixed(1)
}

export function getVoteDistribution(players: Player[]): Record<string | number, number> {
  return players.reduce((acc, player) => {
    if (player.vote !== null) {
      acc[player.vote] = (acc[player.vote] || 0) + 1
    }
    return acc
  }, {} as Record<string | number, number>)
}
