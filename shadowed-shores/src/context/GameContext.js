import React, { createContext, useContext, useState, useEffect } from 'react';
import gameScenes from '../data/gameScenes';

// Create context
const GameContext = createContext();

// Custom hook to use the game context
export const useGameContext = () => useContext(GameContext);

export const GameProvider = ({ children }) => {
  // Initial game state
  const [gameState, setGameState] = useState({
    currentScene: 'start',
    inventory: [],
    stats: {
      sanity: 75,
      trust: 50,
      clues: 0
    },
    flags: {
      metCaptain: false,
      foundLocket: false,
      investigatedLighthouse: false,
      talkedToShopkeeper: false
    },
    visited: ['start'],
    hasStarted: false,
    locations: {
      'harbor': { x: 25, y: 65 },
      'inn': { x: 40, y: 45 },
      'lighthouse_exterior': { x: 75, y: 20 },
      'blackwood_shop': { x: 55, y: 50 },
      'devils_teeth': { x: 15, y: 85 }
    }
  });

  const [settings, setSettings] = useState({
    textSize: 'medium',
    textSpeed: 'medium',
    soundEnabled: true,
    musicVolume: 70
  });

  // Initialize game from localStorage if available
  useEffect(() => {
    const savedGame = localStorage.getItem('shadowedShoresGame');
    if (savedGame) {
      try {
        const parsedGame = JSON.parse(savedGame);
        setGameState(prevState => ({
          ...prevState,
          ...parsedGame
        }));
      } catch (e) {
        console.error('Error loading saved game:', e);
      }
    }

    const savedSettings = localStorage.getItem('shadowedShoresSettings');
    if (savedSettings) {
      try {
        setSettings(JSON.parse(savedSettings));
      } catch (e) {
        console.error('Error loading settings:', e);
      }
    }
  }, []);

  // Save game state to localStorage when it changes
  useEffect(() => {
    if (gameState.hasStarted) {
      localStorage.setItem('shadowedShoresGame', JSON.stringify(gameState));
    }
  }, [gameState]);

  // Save settings when they change
  useEffect(() => {
    localStorage.setItem('shadowedShoresSettings', JSON.stringify(settings));
  }, [settings]);

  // Get current scene data
  const getCurrentScene = () => {
    return gameScenes[gameState.currentScene] || gameScenes.start;
  };

  // Navigate to a new scene
  const goToScene = (sceneId) => {
    // Get the choice that leads to this scene
    const currentScene = getCurrentScene();
    const choice = currentScene.choices.find(c => c.nextScene === sceneId);
    
    // Process stat changes if any
    if (choice && choice.action) {
      const { stat, change } = choice.action;
      const newStats = { ...gameState.stats };
      newStats[stat] = Math.max(0, Math.min(100, newStats[stat] + change));
      
      setGameState(prevState => ({
        ...prevState,
        stats: newStats
      }));
    }
    
    // Process flag changes if any
    if (choice && choice.setFlag) {
      const newFlags = { ...gameState.flags, ...choice.setFlag };
      setGameState(prevState => ({
        ...prevState,
        flags: newFlags
      }));
    }
    
    // Add to inventory if scene provides an item
    const scene = gameScenes[sceneId];
    if (scene && scene.addToInventory) {
      const newInventory = [...gameState.inventory];
      // Check if item already exists
      if (!newInventory.some(item => item.id === scene.addToInventory.id)) {
        newInventory.push(scene.addToInventory);
      }
      
      setGameState(prevState => ({
        ...prevState,
        inventory: newInventory
      }));
    }
    
    // Update visited locations
    const newVisited = [...gameState.visited];
    if (!newVisited.includes(sceneId)) {
      newVisited.push(sceneId);
    }
    
    // Update the game state with new scene
    setGameState(prevState => ({
      ...prevState,
      currentScene: sceneId,
      visited: newVisited,
      hasStarted: true
    }));
  };

  // Check if a choice is available based on flags
  const isChoiceAvailable = (choice) => {
    if (!choice.requireFlag) return true;
    return gameState.flags[choice.requireFlag];
  };

  // Save game
  const saveGame = () => {
    localStorage.setItem('shadowedShoresSavedGame', JSON.stringify(gameState));
    return true;
  };

  // Load game
  const loadGame = () => {
    const savedGame = localStorage.getItem('shadowedShoresSavedGame');
    if (savedGame) {
      try {
        const parsedGame = JSON.parse(savedGame);
        setGameState(parsedGame);
        return true;
      } catch (e) {
        console.error('Error loading saved game:', e);
        return false;
      }
    }
    return false;
  };

  // Update settings
  const updateSettings = (newSettings) => {
    setSettings(prevSettings => ({
      ...prevSettings,
      ...newSettings
    }));
  };

  // Value to be provided to consumers
  const value = {
    gameState,
    settings,
    getCurrentScene,
    goToScene,
    isChoiceAvailable,
    saveGame,
    loadGame,
    updateSettings
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};