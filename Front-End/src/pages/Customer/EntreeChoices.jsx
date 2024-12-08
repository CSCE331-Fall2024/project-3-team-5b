import React from 'react';

/**
 * `EntreeChoices` is a component that allows the user to select entrees from a list.
 * It enforces a limit on the number of entrees that can be selected and enables or disables 
 * the continue button based on the number of selected entrees.
 * 
 * @component
 * @param {Object} props - The props for the component.
 * @param {string[]} props.entrees - An array of entree options that the user can select from.
 * @param {number} props.maxEntrees - The maximum number of entrees the user can select.
 * @param {string[]} props.selectedEntrees - An array of the currently selected entrees.
 * @param {Function} props.onSelectEntrees - A callback function to update the selected entrees.
 * @param {Function} props.onContinue - A callback function to proceed to the next step, such as continuing to the cart.
 * 
 * @example
 * return (
 *   <EntreeChoices 
 *     entrees={['Chicken', 'Beef', 'Vegetarian']} 
 *     maxEntrees={2} 
 *     selectedEntrees={['Chicken']} 
 *     onSelectEntrees={(newSelection) => console.log(newSelection)} 
 *     onContinue={() => console.log("Continuing to cart")} 
 *   />
 * )
 */
function EntreeChoices({ entrees, maxEntrees, selectedEntrees, onSelectEntrees, onContinue }) {
  /**
   * Handles the selection or removal of an entree based on the current selection.
   * Ensures the number of selected entrees does not exceed the maximum allowed.
   * 
   * @param {string} entree - The entree to be selected or removed.
   */
  const handleSelectEntree = (entree) => {
    if (selectedEntrees.includes(entree)) {
      onSelectEntrees(selectedEntrees.filter(item => item !== entree)); // Remove entree if it's already selected
    } else if (selectedEntrees.length < maxEntrees) {
      onSelectEntrees([...selectedEntrees, entree]); // Add entree if the limit is not reached
    }
  };

  return (
    <div className="entree-choices">
      <h2>Select Entrees</h2>
      <div className="entrees-list">
        {entrees.map((entree, index) => (
          <div
            key={index}
            className={`entree-item ${selectedEntrees.includes(entree) ? 'selected' : ''}`}
            onClick={() => handleSelectEntree(entree)}
          >
            <h3>{entree}</h3>
          </div>
        ))}
      </div>
      <button 
        onClick={onContinue} 
        disabled={selectedEntrees.length === 0}
        className="continue-button"
      >
        Continue to Cart
      </button>
    </div>
  );
}

export default EntreeChoices;
