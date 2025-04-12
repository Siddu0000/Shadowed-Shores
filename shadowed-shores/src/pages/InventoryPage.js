import React from 'react';
import { useNavigate } from 'react-router-dom';
import Inventory from '../components/Inventory';

const InventoryPage = () => {
  const navigate = useNavigate();
  
  const goBack = () => {
    navigate('/');
  };
  
  return (
    <div className="inventory-page page-transition">
      <div className="inventory-header">
        <h1>Your Inventory</h1>
        <button className="btn" onClick={goBack}>Back to Game</button>
      </div>
      
      <Inventory isModal={true} onClose={goBack} />
    </div>
  );
};

export default InventoryPage;