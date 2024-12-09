import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import Navbar from './Navbar';

/**
 * `Login` component provides a page for users to choose between different views: 
 * Menu Board, Customer View, Manager login, or Cashier login.
 * The component includes OAuth sign-in for both the Manager and Cashier roles.
 * 
 * @component
 * @example
 * return <Login />;
 * 
 * @returns {JSX.Element} A JSX element representing the login page with buttons for navigation and login actions.
 */
function Login() {
  const navigate = useNavigate();

  // Button handlers
  /**
   * Handles navigation to the menu board page.
   */
  const onClickMenuBoardHandler = () => {
    navigate('/menu-board');
  };

  /**
   * Handles OAuth sign-in for the cashier role and navigates to the cashier page.
   */
  const onClickCashierHandler = () => {
    oauthSignInCashier();
    navigate('/cashier');
  };

  /**
   * Handles OAuth sign-in for the manager role and navigates to the manager page.
   */
  const onClickManagerHandler = () => {
    oauthSignInManager();
    navigate('/manager');
  };

  /**
   * Handles navigation to the customer view page.
   */
  const onClickCustomerHandler = () => {
    navigate('/customer');
  };

  /**
   * Initiates OAuth sign-in for the manager role.
   */
  function oauthSignInManager() {
    var oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';
    var form = document.createElement('form');
    form.setAttribute('method', 'GET');
    form.setAttribute('action', oauth2Endpoint);

    var params = {
      'client_id': '296008456961-qhf5m6rddmlddcp4fscadh9seos56jus.apps.googleusercontent.com',
      'redirect_uri': 'https://main.ddks64gk1t7cw.amplifyapp.com/manager',
      'response_type': 'token',
      'scope': 'https://www.googleapis.com/auth/drive.metadata.readonly',
      'include_granted_scopes': 'true',
      'state': 'pass-through value',
    };

    for (var p in params) {
      var input = document.createElement('input');
      input.setAttribute('type', 'hidden');
      input.setAttribute('name', p);
      input.setAttribute('value', params[p]);
      form.appendChild(input);
    }

    document.body.appendChild(form);
    form.submit();
  }

  /**
   * Initiates OAuth sign-in for the cashier role.
   */
  function oauthSignInCashier() {
    var oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';
    var form = document.createElement('form');
    form.setAttribute('method', 'GET');
    form.setAttribute('action', oauth2Endpoint);

    var params = {
      'client_id': '296008456961-qhf5m6rddmlddcp4fscadh9seos56jus.apps.googleusercontent.com',
      'redirect_uri': 'https://main.ddks64gk1t7cw.amplifyapp.com/cashier',
      'response_type': 'token',
      'scope': 'https://www.googleapis.com/auth/drive.metadata.readonly',
      'include_granted_scopes': 'true',
      'state': 'pass-through value',
    };

    for (var p in params) {
      var input = document.createElement('input');
      input.setAttribute('type', 'hidden');
      input.setAttribute('name', p);
      input.setAttribute('value', params[p]);
      form.appendChild(input);
    }

    document.body.appendChild(form);
    form.submit();
  }

  return (
    <>
      <Navbar />
      <div className="login-page">
        <div className="buttons-container">
          {/* Top row: Menu Board and Customer View */}
          <div className="top-row">
            <button className="login-button long" onClick={onClickMenuBoardHandler}>
              Menu Board
            </button>
            <button className="login-button long" onClick={onClickCustomerHandler}>
              Customer View
            </button>
          </div>
          {/* Bottom row: Manager and Cashier */}
          <div className="bottom-row">
            <button className="login-button short manager" onClick={onClickManagerHandler}>
              Login As Manager
            </button>
            <button className="login-button short cashier" onClick={onClickCashierHandler}>
              Login As Cashier
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
