import React from 'react';

const StatsDisplay = ({ stats }) => {
  return (
    <div className="stats-display">
      <div className="stat">
        <span className="stat-name">Sanity</span>
        <span className="stat-value">{stats.sanity}</span>
      </div>
      <div className="stat">
        <span className="stat-name">Trust</span>
        <span className="stat-value">{stats.trust}</span>
      </div>
      <div className="stat">
        <span className="stat-name">Clues</span>
        <span className="stat-value">{stats.clues}</span>
      </div>
    </div>
  );
};

export default StatsDisplay;