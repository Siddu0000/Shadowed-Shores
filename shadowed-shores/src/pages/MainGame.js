import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameContext } from '../context/GameContext';
import TitleScreen from '../components/TitleScreen';
import StoryScreen from '../components/StoryScreen';
import Settings from '../components/Settings';

const MainGame = () => {
  const { gameState, saveGame } = useGameContext();
  const [showSettings, setShowSettings] = useState(false);
  const navigate = useNavigate();
  
  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };
  
  const goToInventory = () => {
    navigate('/inventory');
  };
  
  const goToMap = () => {
    navigate('/map');
  };
  
  // If game hasn't started yet, show title screen
  if (!gameState.hasStarted) {
    return <TitleScreen />;
  }
  
  return (
    <div className="main-game">
      <StoryScreen />
      
      <div className="game-nav">
        <button className="btn" onClick={goToInventory}>Inventory</button>
        <button className="btn" onClick={goToMap}>Map</button>
        <button className="btn" onClick={saveGame}>Save</button>
        <button className="btn" onClick={toggleSettings}>Settings</button>
      </div>
      
      {showSettings && (
        <>
          <div className="overlay" onClick={toggleSettings}></div>
          <Settings onClose={toggleSettings} />
        </>
      )}
    </div>
  );
};

export default MainGame;