import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CustomerHome from './pages/Customer/CustomerHome';
import ManagerHome from './pages/Manager/ManagerHome';
import Login from './pages/Authentication/Login';
import MenuPage from './pages/Customer/MenuPage';
import MenuBoard from './pages/MenuBoard';
import './App.css';

function App() {
  const [showSidebar, setShowSidebar] = useState(true);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<ManagerHome />} />
        <Route path="/customer" element={<CustomerHome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/menu" element={<MenuPage showSidebar={showSidebar} setShowSidebar={setShowSidebar} />} />
        <Route path="/menu-board" element={<MenuBoard />} />
      </Routes>
    </Router>
  );
}

export default App;
