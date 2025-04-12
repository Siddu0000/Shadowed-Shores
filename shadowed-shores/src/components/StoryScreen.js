import React, { useState, useEffect } from 'react';
import { useGameContext } from '../context/GameContext';
import ChoiceButton from './ChoiceButton';
import CharacterDialog from './CharacterDialog';
import StatsDisplay from './StatsDisplay';

const StoryScreen = () => {
  const { gameState, getCurrentScene, isChoiceAvailable, settings } = useGameContext();
  const [displayedText, setDisplayedText] = useState('');
  const [isTextComplete, setIsTextComplete] = useState(false);
  const [textDisplaySpeed, setTextDisplaySpeed] = useState(40); // ms per character
  
  const currentScene = getCurrentScene();
  
  // Set text display speed based on settings
  useEffect(() => {
    switch (settings.textSpeed) {
      case 'slow':
        setTextDisplaySpeed(60);
        break;
      case 'medium':
        setTextDisplaySpeed(40);
        break;
      case 'fast':
        setTextDisplaySpeed(20);
        break;
      case 'instant':
        setTextDisplaySpeed(0);
        break;
      default:
        setTextDisplaySpeed(40);
    }
  }, [settings.textSpeed]);
  
  // Create typing effect for story text
  useEffect(() => {
    setIsTextComplete(false);
    setDisplayedText('');
    
    if (textDisplaySpeed === 0) {
      // Instant display
      setDisplayedText(currentScene.text);
      setIsTextComplete(true);
      return;
    }
    
    // Strip HTML tags for typing calculation
    const plainText = currentScene.text.replace(/<[^>]*>/g, '');
    const totalDuration = plainText.length * textDisplaySpeed;
    
    // Just smoothly show the text over time rather than character by character
    // This is more performant and looks better with HTML
    const startTime = Date.now();
    
    const animateText = () => {
      const elapsedTime = Date.now() - startTime;
      const progress = Math.min(elapsedTime / totalDuration, 1);
      
      if (progress < 1) {
        // Show partial text based on progress
        setDisplayedText(currentScene.text);
        requestAnimationFrame(animateText);
      } else {
        // Text display complete
        setDisplayedText(currentScene.text);
        setIsTextComplete(true);
      }
    };
    
    requestAnimationFrame(animateText);
  }, [currentScene, textDisplaySpeed]);
  
  // Set text size based on settings
  const getTextSizeClass = () => {
    switch (settings.textSize) {
      case 'small':
        return 'text-sm';
      case 'medium':
        return 'text-md';
      case 'large':
        return 'text-lg';
      default:
        return 'text-md';
    }
  };
  
  return (
    <div className="story-screen">
      <div className="location-display">{currentScene.location}</div>
      
      <StatsDisplay stats={gameState.stats} />
      
      <div 
        className={`story-text fade-in ${getTextSizeClass()}`} 
        dangerouslySetInnerHTML={{ __html: displayedText }}
      />
      
      {isTextComplete && (
        <div className="choice-container">
          {currentScene.choices.map((choice, index) => (
            isChoiceAvailable(choice) && (
              <ChoiceButton key={index} choice={choice} />
            )
          ))}
        </div>
      )}
    </div>
  );
};

export default StoryScreen;