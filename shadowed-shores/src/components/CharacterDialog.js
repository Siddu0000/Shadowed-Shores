import React from 'react';
import characters from '../data/characters';

const CharacterDialog = ({ characterId, dialog }) => {
  const character = characters[characterId] || {
    name: "Unknown",
    backgroundColor: "#333"
  };
  
  return (
    <div className="character-container">
      <div 
        className="character-portrait" 
        style={{ 
          backgroundImage: character.portrait ? `url(${character.portrait})` : 'none',
          backgroundColor: character.backgroundColor
        }}
      />
      <div>
        <p className="character-name">{character.name}</p>
        <div className="dialogue-container">
          <p>{dialog}</p>
        </div>
      </div>
    </div>
  );
};

export default CharacterDialog;