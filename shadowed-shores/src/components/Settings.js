import React, { useState } from 'react';
import { useGameContext } from '../context/GameContext';

const Settings = ({ onClose }) => {
  const { settings, updateSettings, saveGame, loadGame } = useGameContext();
  
  const [localSettings, setLocalSettings] = useState({ ...settings });
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLocalSettings({
      ...localSettings,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  const handleSave = () => {
    updateSettings(localSettings);
    onClose();
  };
  
  const handleSaveGame = () => {
    const success = saveGame();
    if (success) {
      alert('Game saved successfully!');
    } else {
      alert('Error saving game.');
    }
  };
  
  const handleLoadGame = () => {
    const success = loadGame();
    if (success) {
      alert('Game loaded successfully!');
      onClose();
    } else {
      alert('No saved game found or error loading game.');
    }
  };
  
  return (
    <div className="settings-panel">
      <h2>Settings</h2>
      
      <div className="settings-option">
        <label htmlFor="textSize">Text Size</label>
        <select 
          id="textSize"
          name="textSize"
          value={localSettings.textSize}
          onChange={handleChange}
        >
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </select>
      </div>
      
      <div className="settings-option">
        <label htmlFor="textSpeed">Text Speed</label>
        <select 
          id="textSpeed"
          name="textSpeed"
          value={localSettings.textSpeed}
          onChange={handleChange}
        >
          <option value="slow">Slow</option>
          <option value="medium">Medium</option>
          <option value="fast">Fast</option>
          <option value="instant">Instant</option>
        </select>
      </div>
      
      <div className="settings-option">
        <label>
          <input 
            type="checkbox"
            name="soundEnabled"
            checked={localSettings.soundEnabled}
            onChange={handleChange}
          />
          Enable Sound Effects
        </label>
      </div>
      
      <div className="settings-option">
        <label htmlFor="musicVolume">Music Volume: {localSettings.musicVolume}%</label>
        <input 
          type="range"
          id="musicVolume"
          name="musicVolume"
          min="0"
          max="100"
          value={localSettings.musicVolume}
          onChange={handleChange}
        />
      </div>
      
      <div className="settings-actions">
        <button className="btn" onClick={handleSaveGame}>Save Game</button>
        <button className="btn" onClick={handleLoadGame}>Load Game</button>
        <button className="btn" onClick={handleSave}>Apply Settings</button>
        <button className="btn" onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default Settings;