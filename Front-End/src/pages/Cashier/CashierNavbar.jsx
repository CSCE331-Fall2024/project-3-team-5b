import React, { useState } from "react";
import Cart from "../Customer/Cart";  // Import the Cart component
import { Link } from "react-router-dom";

/**
 * `CashierNavbar` provides a navigation bar for the cashier interface with options to navigate 
 * back, view the menu board, and toggle the cart view.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Array} props.cartItems - List of items in the cart.
 * @param {Function} props.onContinue - Callback to handle the "continue" action from the cart.
 * @param {Function} props.clearCart - Callback to clear the cart.
 * 
 * @example
 * const cartItems = [{ id: 1, name: "Item1", price: 10 }];
 * const onContinue = () => { console.log("Continue clicked"); };
 * const clearCart = () => { console.log("Cart cleared"); };
 * return <CashierNavbar cartItems={cartItems} onContinue={onContinue} clearCart={clearCart} />;
 * 
 * @returns {JSX.Element} A navigation bar with a toggleable cart view.
 */
const CashierNavbar = ({ cartItems, onContinue, clearCart }) => {
  // State to toggle the cart view
  const [showCart, setShowCart] = useState(false);

  /**
   * Toggles the visibility of the cart.
   */
  const toggleCartView = () => {
    setShowCart((prevState) => !prevState);
  };

  return (
    <div>
      <nav className="navbar">
        <ul>
          {/* Link to go back to the cashier main page */}
          <li className="back">
            <Link to="/cashier">Back</Link>
          </li>
          {/* Link to navigate to the menu board */}
          <li className="left">
            <Link to="/menu-board">Menu Board</Link>
          </li>
          {/* Button to toggle the cart view */}
          <li className="right">
            <button onClick={toggleCartView}>Cart</button>
          </li>
        </ul>
      </nav>

      {/* Conditional rendering of the Cart component */}
      {showCart && (
        <div className="cart-view">
          <Cart cartItems={cartItems} onContinue={onContinue} clearCart={clearCart} />
        </div>
      )}
    </div>
  );
};

export default CashierNavbar;
