import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CustomerHome from './pages/Customer/CustomerHome';
import ManagerHome from './pages/Manager/ManagerHome';
import Login from './pages/Authentication/Login';
import MenuPage from './pages/Customer/MenuPage';
import MenuBoard from './pages/MenuBoard';
import CashierHome from './pages/Cashier/CashierHome';
import './App.css';
import Cart from './pages/Customer/Cart';
import CashierMenuPage from './pages/Cashier/CashierOrderPage';
import ManageStuff from './pages/Manager/ManageStuff';
import Sales from './pages/Manager/Sales';
import GoogleTranslate from './pages/Translation/GoogleTranslate';

function App() {
  const [showSidebar, setShowSidebar] = useState(true);

  return (
    <Router>
      <GoogleTranslate/>
      <Routes>
        <Route path="/manager" element={<ManagerHome />} />
        <Route path="/customer" element={<CustomerHome />} />
        <Route path="/cashier" element={<CashierHome />} />
        <Route path="/" element={<Login />} />
        <Route path="/menu" element={<MenuPage/>} />
        <Route path="/menu-board" element={<MenuBoard />} />
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/cashier-order-page" element={<CashierMenuPage showSidebar={showSidebar} setShowSidebar={setShowSidebar} />}/>
        <Route path="/manage-stuff" element={<ManageStuff />} />
        <Route path="/sales" element={<Sales />} />
      </Routes>
    </Router>
  );
}

export default App;
