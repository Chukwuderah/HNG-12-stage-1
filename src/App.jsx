import React, { useState, useEffect } from 'react';
import './App.css';

const COLORS = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD', '#D4A5A5',
  '#9B59B6', '#3498DB', '#E74C3C', '#2ECC71', '#F1C40F', '#1ABC9C'
];

const MAX_ROUNDS = 10;

const ColorGame = () => {
  const [targetColor, setTargetColor] = useState('');
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [status, setStatus] = useState('');
  const [isGameOver, setIsGameOver] = useState(false);

  const generateColors = () => {
    const shuffled = [...COLORS].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 6);
    const targetIndex = Math.floor(Math.random() * 6);
    setTargetColor(selected[targetIndex]);
    setOptions(selected);
    setStatus('');
  };

  const handleGuess = (color) => {
    if (color === targetColor) {
      setScore(prev => prev + 1);
      setStatus('Correct!');
    } else {
      setStatus('Wrong guess!');
    }

    if (round < MAX_ROUNDS) {
      setRound(prev => prev + 1);
      setTimeout(generateColors, 1000);
    } else {
      setIsGameOver(true);
    }
  };

  const startNewGame = () => {
    setScore(0);
    setRound(1);
    setIsGameOver(false);
    generateColors();
  };

  useEffect(() => {
    generateColors();
  }, []);

  return (
    <div className="container">
      <div className="game-wrapper">
        <h1 className="title">Color Guessing Game</h1>
        
        <p className="instructions">
          Can you guess which color matches the one shown below? Click on your choice!
        </p>

        <div className="target-color" style={{ backgroundColor: targetColor }} />

        <div className="score-round-container">
          <p className="score-round">Score: {score}</p>
          <p className="score-round">Round: {round}/{MAX_ROUNDS}</p>
        </div>

        {status && <p className="status">{status}</p>}

        <div className="color-grid">
          {options.map((color, index) => (
            <button
              key={index}
              className="color-option"
              style={{ backgroundColor: color }}
              onClick={() => handleGuess(color)}
              aria-label={`Color option ${index + 1}`}
            />
          ))}
        </div>

        <button className="new-game-button" onClick={startNewGame}>
          New Game
        </button>

        {isGameOver && (
          <div className="game-over-overlay">
            <div className="game-over-modal">
              <h2 className="game-over-title">Game Over</h2>
              <p className="game-over-score">Final Score: {score} out of {MAX_ROUNDS}</p>
              <button className="new-game-button" onClick={startNewGame}>
                Play Again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ColorGame;