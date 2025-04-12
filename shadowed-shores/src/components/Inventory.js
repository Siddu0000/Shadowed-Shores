import React, { useState } from 'react';
import { useGameContext } from '../context/GameContext';

const Inventory = ({ isModal = false, onClose = () => {} }) => {
  const { gameState } = useGameContext();
  const [selectedItem, setSelectedItem] = useState(null);
  
  const handleItemClick = (item) => {
    setSelectedItem(item);
  };
  
  const closeItemDetail = () => {
    setSelectedItem(null);
  };
  
  return (
    <div className={isModal ? "inventory-modal" : "inventory-panel"}>
      <div className="inventory-header">
        <h2>Inventory</h2>
        {isModal && <button className="btn close-btn" onClick={onClose}>Close</button>}
      </div>
      
      {gameState.inventory.length === 0 ? (
        <p>You have no items in your inventory.</p>
      ) : (
        <div className="inventory-grid">
          {gameState.inventory.map((item) => (
            <div 
              key={item.id} 
              className="inventory-item"
              onClick={() => handleItemClick(item)}
            >
              <h3 className="inventory-item-name">{item.name}</h3>
              <p className="inventory-item-desc">{item.description.substring(0, 70)}...</p>
            </div>
          ))}
        </div>
      )}
      
      {selectedItem && (
        <div className="item-detail-modal">
          <div className="item-detail-content">
            <h2>{selectedItem.name}</h2>
            <p>{selectedItem.description}</p>
            <button className="btn" onClick={closeItemDetail}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inventory;