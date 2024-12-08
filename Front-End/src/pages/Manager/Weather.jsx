import React from "react";
import PropTypes from "prop-types"; // Import PropTypes
import { useFetchWeatherData } from "../../api/useFetchWeatherData";
import './Weather.css';

/**
 * Capitalizes the first letter of each word in a sentence.
 *
 * @param {string} sentence - The sentence to capitalize.
 * @returns {string} The capitalized sentence.
 */
const capitalizeWords = (sentence) => {
    return sentence
        .split(" ") // Split the sentence into words
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize first letter
        .join(" "); // Join words back into a sentence
};

/**
 * Weather Component
 * Displays weather information for a given location.
 *
 * This component fetches weather data using the `useFetchWeatherData` hook and
 * displays temperature, weather description, and an icon representing the current weather.
 *
 * @component
 * @param {Object} props - React component props.
 * @param {Object} props.location - Location data with latitude and longitude.
 * @param {number} props.location.latitude - The latitude of the location.
 * @param {number} props.location.longitude - The longitude of the location.
 * @returns {JSX.Element} The rendered Weather component.
 */
export const Weather = ({ location }) => {
    const { data: weatherData, loading, error } = useFetchWeatherData(location.latitude, location.longitude);

    if (loading && !weatherData) {
        return <div className="weather-panel flex justify-center align-middle p-4">Loading Weather Data</div>;
    }
    if (error) {
        return <div className="weather-panel flex justify-center align-middle p-4">Error Loading Weather Data</div>;
    }

    console.log(weatherData); // Log weather data for debugging

    const weatherIconUrl = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;

    return (
        <div className="weather-panel flex justify-center align-middle p-4">
            <img src={weatherIconUrl} alt={weatherData.weather[0].description} />
            <div className="flex flex-col justify-center align-middle">
                <p>Temperature: {weatherData.main.temp}° F</p>
                <p>Weather: {capitalizeWords(weatherData.weather[0].description)}</p>
            </div>
        </div>
    );
};

// Add PropTypes validation
Weather.propTypes = {
    location: PropTypes.shape({
        latitude: PropTypes.number.isRequired,
        longitude: PropTypes.number.isRequired,
    }).isRequired,
};
