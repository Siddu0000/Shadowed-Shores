import React from 'react';
import { useGameContext } from '../context/GameContext';

const TitleScreen = () => {
  const { gameState, goToScene } = useGameContext();
  
  const handleStartGame = () => {
    goToScene('start');
  };
  
  const handleContinueGame = () => {
    // This just starts from where they left off
    // The currentScene is already in gameState
    goToScene(gameState.currentScene);
  };
  
  return (
    <div className="title-screen">
      <h1>SHADOWED SHORES</h1>
      <p className="subtitle">Darkness lurks where the tide meets land</p>
      
      {!gameState.hasStarted ? (
        <button className="btn" onClick={handleStartGame}>Begin Your Journey</button>
      ) : (
        <>
          <button className="btn" onClick={handleStartGame}>New Game</button>
          <button className="btn" onClick={handleContinueGame}>Continue</button>
        </>
      )}
    </div>
  );
};

export default TitleScreen;