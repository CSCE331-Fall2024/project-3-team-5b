import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { AccessibilityButton } from '../../components/Accessibility/AccessibilityButton';

/**
 * `Navbar` is a navigation bar component that provides links to various pages such as:
 * - A link to the customer view
 * - A link to the menu board
 * - A link to the cart
 * It also includes an accessibility button for improved accessibility.
 * 
 * @component
 * @example
 * return (
 *   <Navbar />
 * )
 */
const Navbar = () => {
    return (
      <nav className="navbar">
        <ul>
          <li>
            <AccessibilityButton />
          </li>
          <li className="left">
              <Link to="/customer">Back</Link>
            </li>
            <li className="left">
              <Link to="/menu-board">Menu Board</Link>
            </li>
            <li className="right">
              <Link to="/cart">Cart</Link>
            </li>
        </ul>
      </nav>
    );
};

export default Navbar;
