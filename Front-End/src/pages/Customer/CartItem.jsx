import React from 'react';
import PropTypes from 'prop-types';

/**
 * `CartItem` component renders the details of a single item in the shopping cart.
 * It displays the name of the menu item, and optionally displays the sides, entrees, drink, and appetizer associated with the item.
 * 
 * @component
 * @example
 * const item = {
 *   menuItem: { name: 'Burger' },
 *   side: [{ name: 'Fries' }, { name: 'Onion Rings' }],
 *   entrees: ['Chicken'],
 *   drink: ['Soda'],
 *   appetizer: ['Salad']
 * };
 * return <CartItem item={item} />;
 * 
 * @param {Object} item - The cart item object containing the menu item and optional sides, entrees, drink, and appetizer.
 * @param {Object} item.menuItem - The menu item object containing the name of the item.
 * @param {Array} [item.side] - A list of side items, either strings or objects containing a name.
 * @param {Array} [item.entrees] - A list of entree items.
 * @param {Array} [item.drink] - A list of drink items.
 * @param {Array} [item.appetizer] - A list of appetizer items.
 * 
 * @returns {JSX.Element} A JSX element representing the cart item and its details.
 */
const CartItem = ({ item }) => {
  /**
   * Helper function to render the list of items (sides, entrees, drinks, appetizers) as a comma-separated string.
   * 
   * @param {Array} items - An array of items to be rendered.
   * @returns {string|null} A comma-separated string of item names, or null if no items are provided.
   */
  const renderItems = (items) => {
    if (Array.isArray(items)) {
      return items.map(item => item.name).join(', ');
    }
    return null;
  };

  return (
    <div className="cart-item">
      <h4>{item.menuItem.name}</h4>
      {item.side && (
        <div className="sides">
          <strong>Sides: </strong>
          {renderItems(item.side)}
        </div>
      )}
      {item.entrees && (
        <div className="entrees">
          <strong>Entrees: </strong>{renderItems(item.entrees)}
        </div>
      )}
      {item.drink && (
        <div className="drink">
          <strong>Drink: </strong>{renderItems(item.drink)}
        </div>
      )}
      {item.appetizer && (
        <div className="appetizer">
          <strong>Appetizer: </strong>{renderItems(item.appetizer)}
        </div>
      )}
    </div>
  );
};

CartItem.propTypes = {
  /**
   * The cart item object containing menu item details and optional side, entree, drink, and appetizer arrays.
   */
  item: PropTypes.shape({
    menuItem: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    side: PropTypes.oneOfType([ 
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
      })),
    ]),
    entrees: PropTypes.arrayOf(PropTypes.string),
    drink: PropTypes.arrayOf(PropTypes.string),
    appetizer: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default CartItem;
