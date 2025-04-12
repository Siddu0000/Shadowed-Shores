import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameContext } from '../context/GameContext';

const MapPage = () => {
  const navigate = useNavigate();
  const { gameState, goToScene } = useGameContext();
  
  const goBack = () => {
    navigate('/');
  };
  
  const handleLocationClick = (locationId) => {
    // Only allow travel to previously visited locations
    if (gameState.visited.includes(locationId)) {
      goToScene(locationId);
      navigate('/');
    }
  };
  
  return (
    <div className="map-page page-transition">
      <div className="map-header">
        <h1>Ravenport Map</h1>
        <button className="btn" onClick={goBack}>Back to Game</button>
      </div>
      
      <div className="map-container">
        {/* This is a placeholder for the map background */}
        <div style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%',
          backgroundImage: 'url("/assets/images/map_background.jpg")',
          backgroundSize: 'cover',
          opacity: 0.7
        }}></div>
        
        {/* Map locations */}
        {Object.entries(gameState.locations).map(([locationId, position]) => {
          const isVisited = gameState.visited.includes(locationId);
          const isCurrent = gameState.currentScene === locationId;
          
          // Only show locations the player has discovered
          if (!isVisited) return null;
          
          return (
            <div 
              key={locationId}
              className={`map-location ${isVisited ? 'visited' : ''} ${isCurrent ? 'current' : ''}`}
              style={{ left: `${position.x}%`, top: `${position.y}%` }}
              onClick={() => handleLocationClick(locationId)}
              title={locationId.replace('_', ' ').charAt(0).toUpperCase() + locationId.replace('_', ' ').slice(1)}
            ></div>
          );
        })}
        
        {/* Legend */}
        <div style={{ 
          position: 'absolute', 
          bottom: 20, 
          right: 20, 
          background: 'rgba(0,0,0,0.7)',
          padding: 10,
          borderRadius: 5
        }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 5 }}>
            <div style={{ width: 15, height: 15, backgroundColor: '#9ab8c2', borderRadius: '50%', marginRight: 10 }}></div>
            <span>Visited Location</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ width: 15, height: 15, backgroundColor: '#c55', borderRadius: '50%', marginRight: 10 }}></div>
            <span>Current Location</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapPage;