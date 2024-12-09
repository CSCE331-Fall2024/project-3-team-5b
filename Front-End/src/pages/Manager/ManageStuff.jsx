import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ManageStuff.css';
import { Weather } from './Weather';

/**
 * ManageStuff Component
 * Provides a management dashboard with navigation buttons for managing inventory, sales, employees, menu, and ingredients.
 * Also includes weather information based on the user's location.
 *
 * @component
 * @returns {JSX.Element} The rendered ManageStuff component.
 */
function ManageStuff() {
  const navigate = useNavigate();
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [error, setError] = useState(null);

  /**
   * Fetches the user's location using the Geolocation API and updates the state.
   * Handles errors if the location cannot be fetched or if permissions are denied.
   */
  const fetchLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setError(null); // Clear any previous error
        },
        (error) => {
          setError(error.message);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    // Fetch location initially
    fetchLocation();

    // Monitor permission changes using the Permissions API
    if (navigator.permissions) {
      navigator.permissions
        .query({ name: 'geolocation' })
        .then((permissionStatus) => {
          // Listen for permission state changes
          permissionStatus.onchange = () => {
            if (permissionStatus.state === 'granted') {
              fetchLocation();
            } else if (permissionStatus.state === 'denied') {
              setError("Location access denied.");
              setLocation({ latitude: null, longitude: null });
            }
          };
        })
        .catch(() => {
          console.error("Permissions API is not supported.");
        });
    }
  }, []);

  return (
    <div className="manage-stuff-page">
      <h1>Manage Stuff</h1>

      
      <button onClick={() => navigate('/')} className="back-button">Back</button>

      {location.latitude && location.longitude ? (
        <Weather location={location} />
      ) : (
        <div className="weather-panel flex justify-center align-middle p-4">
          Location Access Required For Weather
        </div>
      )}

      <button className="manage-button" onClick={() => navigate('/inventory')}>
        Inventory
      </button>
      <button className="manage-button" onClick={() => navigate('/sales')}>
        Sales
      </button>
      <button className="manage-button" onClick={() => navigate('/manage-stuff/employee')}>
        Employees
      </button>
      <button className="manage-button" onClick={() => navigate('/manage-stuff/menu')}>
        Menu
      </button>
      <button className="manage-button" onClick={() => navigate('/manage-stuff/inventory')}>
        Ingredients
      </button>
    </div>
  );
}

export default ManageStuff;
