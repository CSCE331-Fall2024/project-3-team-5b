import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ContrastIcon from '@mui/icons-material/Contrast';
import TextIncreaseIcon from '@mui/icons-material/TextIncrease';
import GTranslateIcon from '@mui/icons-material/GTranslate';
import LandingPageButton from '../../components/Customer/LandingPageButton';
import './CashierHome.css';

/**
 * `CashierHome` is the home page for the cashier interface.
 * It provides options for starting an order, changing the user, and clocking in or out.
 * The page also allows toggling high contrast mode for better accessibility.
 * 
 * @component
 * @example
 * return <CashierHome />;
 * 
 * @returns {JSX.Element} A JSX element representing the cashier home page with options to start an order, change user, and toggle contrast mode.
 */
function CashierHome() {
  const navigate = useNavigate(); 
  const [style, setStyle] = useState({
    textColor: '#FFFFFF',
    buttonBackground: '#000000',
  });

  const [isHighContrastMode, setIsHighContrast] = useState(false);

  /**
   * Toggles high contrast mode to adjust the styling of the page.
   * This helps improve accessibility for users with visual impairments.
   */
  const toggleContrast = () => {
    setIsHighContrast(!isHighContrastMode);
    setStyle({
      textColor: isHighContrastMode ? '#FFFFFF' : '#1AEBFF',
      buttonBackground: isHighContrastMode ? '#000000' : '#FFFFFF', 
    });
  };

  /**
   * Navigates to the cashier order page to start a new order.
   */
  const handleStartOrder = () => {
    navigate('/cashier-order-page'); 
  };

  return (
    <div className="grid grid-cols-2 w-full h-[90vh] gap-4">
      <div className='flex justify-center items-center'>
        <button
          className={`start-order-button w-4/5 h-4/5 p-4 rounded-lg flex flex-col justify-center items-center gap-2`}
          onClick={handleStartOrder}
        >
          <AddShoppingCartIcon className="shopping-cart" />
          <h1>TAKE ORDER</h1>
        </button>
      </div>
      <div className='flex justify-center items-center '>
        <ul className='grid grid-cols-1 gap-10'>
            <li>
              <LandingPageButton label='Change User' onClick={() => {}} />
            </li>
            <li>
              <button
                className={`start-order-button w-4/5 h-4/5 p-4 rounded-lg flex flex-col justify-center items-center gap-2`}
              >
                <h1>Clock In/Out</h1>
              </button>
            </li>
          </ul>
      </div>
    </div>
  );
}

export default CashierHome;
