import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ContrastIcon from '@mui/icons-material/Contrast';
import TextIncreaseIcon from '@mui/icons-material/TextIncrease';
import GTranslateIcon from '@mui/icons-material/GTranslate';
import LandingPageButton from '../../components/Customer/LandingPageButton';
import './CustomerHome.css';
import Navbar from './Navbar';
import { AccessibilityContext } from '../../../hooks/AccessibilityContext';

/**
 * `CustomerHome` is the main landing page for the customer, featuring a button to start an order
 * and accessibility options like changing the language, enabling high-contrast mode, and enlarging text.
 * It utilizes context to determine if text should be magnified based on user preferences.
 * 
 * @component
 * @example
 * return <CustomerHome />
 */
function CustomerHome() {
  const navigate = useNavigate(); 
  const [style, setStyle] = useState({
    textColor: '#FFFFFF',
    buttonBackground: '#000000',
  });
  const { isMagnified } = useContext(AccessibilityContext);

  /**
   * Navigates to the menu page when the start order button is clicked.
   * 
   * @function
   * @returns {void}
   */
  const handleStartOrder = () => {
    navigate('/menu'); 
  };

  return (
    <div className={`grid grid-cols-2 w-full h-[90vh] gap-4 ${isMagnified ? 'magnified' : ''}`}>
        <div className="flex justify-center items-center">
          <button
            className={`start-order-button w-4/5 h-4/5 p-4 rounded-lg flex flex-col justify-center items-center gap-2`}
            onClick={handleStartOrder}
          >
            <AddShoppingCartIcon className="shopping-cart"/>
            <h1>START ORDER</h1>
          </button>
        </div>
        <div className="flex justify-center items-center">
          <ul className="grid grid-cols-1 gap-10">
            <li>
              <LandingPageButton label="Change Language" Icon={GTranslateIcon} style={style} onClick={() => {}} />
            </li>
            <li>
              <LandingPageButton label="High-contrast mode" Icon={ContrastIcon} style={style} onClick={() => {}} />
            </li>
            <li>
              <LandingPageButton label="Enlarge Text" Icon={TextIncreaseIcon} style={style} onClick={() => {}} />
            </li>
          </ul>
        </div>
      </div>
  );
}

export default CustomerHome;
