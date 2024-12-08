import React from 'react';
import './MenuItem.css';

/**
 * `MenuItem` is a component that displays a single menu item, including its name, description, and image.
 * It allows the item to be selected, and triggers a click event handler when clicked.
 * The component applies a different style when the item is selected.
 * 
 * @component
 * @param {Object} props - The props for the component.
 * @param {string} props.name - The name of the menu item.
 * @param {string} props.description - A brief description of the menu item.
 * @param {string} props.image - The URL of the image associated with the menu item.
 * @param {Function} props.onClick - The function to be called when the menu item is clicked.
 * @param {boolean} props.isSelected - A flag indicating whether the menu item is currently selected.
 * 
 * @example
 * return (
 *   <MenuItem 
 *     name="Burger" 
 *     description="A delicious beef burger with cheese." 
 *     image="https://example.com/burger.jpg" 
 *     onClick={() => console.log("Burger clicked!")} 
 *     isSelected={false} 
 *   />
 * )
 */
function MenuItem({ name, description, image, onClick, isSelected }) {
  return (
    <div
      className={`menu-item ${isSelected ? 'selected' : ''}`}
      onClick={onClick}
    >
      <img src={image} alt={`${name}`} className="menu-item-image" />
      <div className="menu-item-info">
        <h3 className="menu-item-name">{name}</h3>
        <p className="menu-item-description">{description}</p>
      </div>
    </div>
  );
}

export default MenuItem;
