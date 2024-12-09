import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CustomerHome from './pages/Customer/CustomerHome';
import Login from './pages/Authentication/Login';
import MenuPage from './pages/Customer/MenuPage';
import MenuBoard from './pages/MenuBoard';
import CashierHome from './pages/Cashier/CashierHome';
import Employee from './pages/Manager/Employee'
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

function AppContent() {
  const [showSidebar, setShowSidebar] = useState(true);
  const [cartItems, setCartItems] = useState([]); // Shared cart state

  // Function to add an item to the cart
  const addToCart = (item) => {
    setCartItems((prevCartItems) => [...prevCartItems, item]);
  };

  // Function to remove an item from the cart
  const removeFromCart = (index) => {
    setCartItems((prevCartItems) => prevCartItems.filter((_, i) => i !== index));
  };

  // Function to clear the cart
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <div> {/* Add a wrapper div here */}
      <Routes>
        
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
        <Route path='/manage-stuff/menu/menu-items' element={<ManagerMenuItems/>}/>
        <Route path='/manage-stuff/menu/menu-choices' element={<ManagerMenuChoices/>}/>
        <Route path='/manage-stuff/menu' element={<ManagerMenuHome/>}/>
        <Route path="/manage-stuff/employee" element={<Employee />} />
        <Route path="/manage-stuff" element={<ManageStuff />} />
        <Route path="/sales" element={<Sales />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/manage-stuff/inventory" element={<InventoryManager />} />
      </Routes>
    </div>
  );
}


function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
