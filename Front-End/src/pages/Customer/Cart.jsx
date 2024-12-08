import React from 'react';
import PropTypes from 'prop-types';
import './Cart.css'; 
import CartItem from './CartItem';

/**
 * `Cart` component displays a list of items in the shopping cart and provides options to proceed to checkout or clear the cart.
 * 
 * @component
 * @example
 * const cartItems = [
 *   { menuItem: { name: 'Burger' }, sides: ['Fries'], entrees: ['Chicken'], drink: ['Soda'], appetizer: ['Salad'] },
 *   { menuItem: { name: 'Pizza' }, sides: ['Garlic Bread'], drink: ['Juice'] }
 * ];
 * const onContinue = () => console.log('Proceeding to checkout...');
 * const clearCart = () => console.log('Clearing the cart...');
 * return <Cart cartItems={cartItems} onContinue={onContinue} clearCart={clearCart} />;
 * 
 * @param {Object[]} cartItems - The list of cart items to display.
 * @param {Function} onContinue - The function to call when the user wants to proceed to checkout.
 * @param {Function} clearCart - The function to call when the user wants to clear the cart.
 * 
 * @returns {JSX.Element} A JSX element representing the cart with a list of items and buttons to proceed to checkout or clear the cart.
 */
const Cart = ({ cartItems, onContinue, clearCart }) => {
  return (
    <div className="cart">
      <h2>Your Cart</h2>
      <div className="cart-items-list">
        <h3>Selected Items</h3>
        <ul>
          {cartItems && cartItems.length > 0 ? (
            cartItems.map((item, index) => (
              <li key={index}>
                <CartItem item={item} />
              </li>
            ))
          ) : (
            <li>No items in the cart</li>
          )}
        </ul>
      </div>
      <div className="cart-buttons">
        <button className="checkout-button" onClick={onContinue}>
          Proceed to Checkout
        </button>
        <button className="clear-cart-button" onClick={clearCart}>
          Clear Cart
        </button>
      </div>
    </div>
  );
};

Cart.propTypes = {
  /**
   * The list of items currently in the cart. Each item must contain a `menuItem` object with a `name`, and may also include optional `sides`, `entrees`, `drink`, and `appetizer` arrays.
   */
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      menuItem: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired,
      sides: PropTypes.oneOfType([ 
        PropTypes.arrayOf(PropTypes.string),
        PropTypes.arrayOf(PropTypes.shape({
          name: PropTypes.string,
        })),
      ]),
      entrees: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string,
        })
      ),
      drink: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string,
        })
      ),
      appetizer: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string,
        })
      ),
    })
  ).isRequired,
  
  /**
   * The function to call when the user wants to proceed to checkout.
   */
  onContinue: PropTypes.func,

  /**
   * The function to call when the user wants to clear the cart.
   */
  clearCart: PropTypes.func,
};

Cart.defaultProps = {
  /**
   * Default value for `cartItems` is an empty array.
   */
  cartItems: [],

  /**
   * Default no-op function for `onContinue`.
   */
  onContinue: () => {},

  /**
   * Default no-op function for `clearCart`.
   */
  clearCart: () => {},
};

export default Cart;
