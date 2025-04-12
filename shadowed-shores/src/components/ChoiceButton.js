import React from 'react';
import { useGameContext } from '../context/GameContext';

const ChoiceButton = ({ choice }) => {
  const { goToScene } = useGameContext();
  
  const handleClick = () => {
    goToScene(choice.nextScene);
  };
  
  return (
    <button 
      className="choice-btn" 
      onClick={handleClick}
    >
      {choice.text}
    </button>
  );
};

export default ChoiceButton;