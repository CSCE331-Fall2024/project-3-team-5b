import React, { useContext } from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import './Navbar.css';
import { AccessibilityContext } from '../../../hooks/AccessibilityContext';
import { AccessibilityButton } from '../../components/Accessibility/AccessibilityButton';
import { Link } from 'react-router-dom';

/**
 * `Navbar` is a navigation bar component that includes an accessibility button and an optional back link.
 * It provides a way to toggle the accessibility panel and navigate to a previous page if `backLink` is provided.
 * 
 * @component
 * @example
 * return <Navbar backLink="/previous-page" />;
 * 
 * @param {Object} props - The properties for the `Navbar` component.
 * @param {string} [props.backLink] - The optional URL for the back link. If provided, a link to navigate back will be shown.
 * 
 * @returns {JSX.Element} A JSX element representing the navigation bar with an accessibility button and an optional back link.
 */
const Navbar = ({ backLink }) => {
  const { toggleAccessibilityPanel } = useContext(AccessibilityContext);

  return (
    <nav className="navbar">
      <ul>
        <li className="left">
          <AccessibilityButton />
        </li>
        {backLink && (
          <li className="navbar-item">
            <Link to={backLink} className="back-link">
              Back
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
