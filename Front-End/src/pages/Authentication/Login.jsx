import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import Navbar from './Navbar';

function Login() {
  const navigate = useNavigate();

  // Button handlers
  const onClickMenuBoardHandler = () => {
    navigate('/menu-board');
  };

  const onClickCashierHandler = () => {
    oauthSignInCashier();
    navigate('/cashier');
  };

  const onClickManagerHandler = () => {
    oauthSignInManager();
    navigate('/manage-stuff');
  };

  const onClickCustomerHandler = () => {
    navigate('/customer');
  };

  // OAuth sign-in for Manager
  function oauthSignInManager() {
    var oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';
    var form = document.createElement('form');
    form.setAttribute('method', 'GET');
    form.setAttribute('action', oauth2Endpoint);

    var params = {
      'client_id': '296008456961-qhf5m6rddmlddcp4fscadh9seos56jus.apps.googleusercontent.com',
      'redirect_uri': 'https://project-3-team-5b.onrender.com/manager',
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

  // OAuth sign-in for Cashier
  function oauthSignInCashier() {
    var oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';
    var form = document.createElement('form');
    form.setAttribute('method', 'GET');
    form.setAttribute('action', oauth2Endpoint);

    var params = {
      'client_id': '296008456961-qhf5m6rddmlddcp4fscadh9seos56jus.apps.googleusercontent.com',
      'redirect_uri': 'https://project-3-team-5b.onrender.com/cashier',
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
