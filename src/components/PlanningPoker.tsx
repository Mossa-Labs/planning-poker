import React, { useState } from 'react';
import { Users, Vote, RefreshCw } from 'lucide-react';

const PlanningPoker = () => {
  const [playerName, setPlayerName] = useState('');
  const [sessionId, setSessionId] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [players, setPlayers] = useState([]);
  
  const planningCards = [1, 2, 3, 5, 8, 13, 21, '?'];
  
  const handleJoinSession = () => {
    if (!playerName || !sessionId) return;
    
    setPlayers(current => [...current, { 
      id: Date.now(), 
      name: playerName, 
      vote: null 
    }]);
    setIsLoggedIn(true);
  };

  const handleCreateSession = () => {
    if (!playerName) return;
    
    const newSessionId = Math.random().toString(36).substring(2, 8).toUpperCase();
    setSessionId(newSessionId);
    setPlayers([{ 
      id: Date.now(), 
      name: playerName, 
      vote: null 
    }]);
    setIsLoggedIn(true);
  };
  
  const handleVote = (value) => {
    setSelectedCard(value);
    const currentPlayer = players.find(p => p.name === playerName);
    if (currentPlayer) {
      setPlayers(current =>
        current.map(player =>
          player.id === currentPlayer.id
            ? { ...player, vote: value }
            : player
        )
      );
    }
  };
  
  const resetGame = () => {
    setSelectedCard(null);
    setRevealed(false);
    setPlayers(current =>
      current.map(player => ({ ...player, vote: null }))
    );
  };
  
  const calculateAverage = () => {
    const numericVotes = players
      .map(player => player.vote)
      .filter(vote => typeof vote === 'number' && !isNaN(vote));
    
    if (numericVotes.length === 0) return 0;
    return (numericVotes.reduce((a, b) => a + b, 0) / numericVotes.length).toFixed(1);
  };

  if (!isLoggedIn) {
    return (
      <div className="max-w-md mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8 text-center">Join Planning Poker</h1>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Your Name</label>
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Session ID (Optional)</label>
            <input
              type="text"
              value={sessionId}
              onChange={(e) => setSessionId(e.target.value.toUpperCase())}
              placeholder="Enter session ID to join existing game"
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="flex gap-4">
            <button
              onClick={handleCreateSession}
              disabled={!playerName}
              className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Create New Session
            </button>
            <button
              onClick={handleJoinSession}
              disabled={!playerName || !sessionId}
              className="flex-1 border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Join Session
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Planning Poker</h1>
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            <span className="font-medium">{players.length} Players</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium">Session: {sessionId}</span>
          </div>
        </div>
      </div>

      {/* Card Selection */}
      <div className="grid grid-cols-4 md:grid-cols-8 gap-4 mb-8">
        {planningCards.map((value) => (
          <button
            key={value}
            onClick={() => handleVote(value)}
            className={`aspect-[2/3] rounded-lg border-2 ${
              selectedCard === value
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            } flex items-center justify-center text-2xl font-bold transition-all`}
          >
            {value}
          </button>
        ))}
      </div>

      {/* Players and Votes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {players.map((player) => (
          <div 
            key={player.id}
            className="bg-white rounded-lg border shadow-sm p-4 flex items-center justify-between"
          >
            <div className="font-medium">
              {player.name}
              {player.name === playerName && " (You)"}
            </div>
            <div className="flex items-center gap-2">
              <Vote className="w-4 h-4" />
              {revealed || player.name === playerName ? (
                <span className="font-bold">{player.vote || '-'}</span>
              ) : player.vote ? (
                '🤔'
              ) : (
                '-'
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex justify-center gap-4">
        <button
          onClick={() => setRevealed(true)}
          disabled={!players.every((player) => player.vote !== null)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Reveal Votes
        </button>
        <button
          onClick={resetGame}
          className="border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50 flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Reset
        </button>
      </div>

      {/* Results */}
      {revealed && (
        <div className="mt-8 text-center">
          <h2 className="text-xl font-bold mb-2">Results</h2>
          <p className="text-gray-600">
            Average Score: <span className="font-bold">{calculateAverage()}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default PlanningPoker;