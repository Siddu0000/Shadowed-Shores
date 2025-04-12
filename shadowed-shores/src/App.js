import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainGame from './pages/MainGame';
import InventoryPage from './pages/InventoryPage';
import MapPage from './pages/MapPage';
import { useGameContext } from './context/GameContext';

function App() {
  const { gameState } = useGameContext();
  
  // If game hasn't started, always show main game (title screen)
  if (!gameState.hasStarted) {
    return <MainGame />;
  }

  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<MainGame />} />
        <Route path="/inventory" element={<InventoryPage />} />
        <Route path="/map" element={<MapPage />} />
      </Routes>
    </div>
  );
}

export default App;