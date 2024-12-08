import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CustomerHome from './pages/Customer/CustomerHome';
import ManagerHome from './pages/Manager/ManagerHome';
import Login from './pages/Authentication/Login';
import MenuPage from './pages/Customer/MenuPage';
import MenuBoard from './pages/MenuBoard';
import CashierHome from './pages/Cashier/CashierHome';
import Employee from './pages/Manager/Employee';
import './App.css';
import Cart from './pages/Customer/Cart';
import CashierMenuPage from './pages/Cashier/CashierOrderPage';
import ManageStuff from './pages/Manager/ManageStuff';
import Sales from './pages/Manager/Sales';
import Inventory from './pages/Manager/Inventory';
import { ManagerMenuHome } from './pages/Manager/menu/ManagerMenuHome';
import { ManagerMenuItems } from './pages/Manager/menu/ManagerMenuItems';
import InventoryManager from './pages/Manager/InventoryManager';
import ManagerMenuChoices from './pages/Manager/menu/ManagerMenuChoices';

/**
 * Main application content component.
 * Manages shared state such as the cart and handles route definitions.
 * 
 * @component
 * @returns {JSX.Element} The application's content including routes and shared state logic.
 */
function AppContent() {
  const [showSidebar, setShowSidebar] = useState(true);
  const [cartItems, setCartItems] = useState([]); // Shared cart state

  /**
   * Adds an item to the cart.
   * 
   * @function
   * @param {Object} item - The item to add to the cart.
   */
  const addToCart = (item) => {
    setCartItems((prevCartItems) => [...prevCartItems, item]);
  };

  /**
   * Removes an item from the cart by index.
   * 
   * @function
   * @param {number} index - The index of the item to remove.
   */
  const removeFromCart = (index) => {
    setCartItems((prevCartItems) => prevCartItems.filter((_, i) => i !== index));
  };

  /**
   * Clears all items from the cart.
   * 
   * @function
   */
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <div>
      <Routes>
        <Route path="/manager" element={<ManagerHome />} />
        <Route path="/customer" element={<CustomerHome />} />
        <Route path="/cashier" element={<CashierHome />} />
        <Route path="/" element={<Login />} />
        <Route 
          path="/menu" 
          element={<MenuPage addToCart={addToCart} />} // Pass addToCart function
        />
        <Route path="/menu-board" element={<MenuBoard />} />
        <Route 
          path="/cart" 
          element={
            <Cart 
              cartItems={cartItems} 
              removeFromCart={removeFromCart} 
              clearCart={clearCart} 
            />
          } // Pass cart state and management functions
        />
        <Route path="/cashier-order-page" element={<CashierMenuPage showSidebar={showSidebar} setShowSidebar={setShowSidebar} />} />
        <Route path='/manage-stuff/menu/menu-items' element={<ManagerMenuItems />} />
        <Route path='/manage-stuff/menu/menu-choices' element={<ManagerMenuChoices />} />
        <Route path='/manage-stuff/menu' element={<ManagerMenuHome />} />
        <Route path="/manage-stuff/employee" element={<Employee />} />
        <Route path="/manage-stuff" element={<ManageStuff />} />
        <Route path="/sales" element={<Sales />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/manage-stuff/inventory" element={<InventoryManager />} />
      </Routes>
    </div>
  );
}

/**
 * Main application component.
 * Wraps the application content in a Router.
 * 
 * @component
 * @returns {JSX.Element} The main application component with routing.
 */
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
