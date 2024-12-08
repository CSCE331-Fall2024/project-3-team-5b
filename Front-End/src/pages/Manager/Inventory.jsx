import React from 'react';
import InventoryReport from './InventoryReport';

/**
 * Inventory Component
 * Displays the main inventory page, including the inventory report.
 * 
 * @component
 * @returns {JSX.Element} The rendered Inventory page with the inventory report.
 */
function Inventory() {
  return (
    <div>
      <h1>Inventory Page</h1>
      <InventoryReport />
    </div>
  );
}

export default Inventory;
