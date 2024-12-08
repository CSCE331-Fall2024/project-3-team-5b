import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "../../Authentication/Navbar";
import "./ManagerMenuHome.css";

/**
 * `ManagerMenuHome` is a component that allows the manager to choose a category for managing menu items and choices.
 * It provides navigation options to either manage menu items or menu choices.
 * This component also manages some styling adjustments on mount and unmount.
 * 
 * @component
 * @example
 * return (
 *   <ManagerMenuHome />
 * )
 */
export const ManagerMenuHome = () => {
    const navigate = useNavigate();

    /**
     * `useEffect` hook to add a custom class to the root element on mount and clean up on unmount.
     * This ensures the styling is applied when the component is active and removed after unmount.
     */
    useEffect(() => {
        const root = document.getElementById('root');
        if (root) {
            root.classList.add('manager-menu-home');
        }

        // Cleanup: Remove the class when the component unmounts
        return () => {
            if (root) {
                root.classList.remove('manager-menu-home');
            }
        };
    }, []);

    /**
     * Handles navigation when a button is clicked.
     * Redirects the user to the respective management pages: menu items or menu choices.
     * 
     * @param {string} path - The path to navigate to.
     */
    const handleNavigate = (path) => {
        navigate(path);
    };

    return (
        <>
            <Navbar backLink={"/manage-stuff"} />
            <div className="manager-menu-home-container">
                <h2 className="text-white text-7xl">Select menu item category you would like to manage:</h2>
                <div className="manager-menu-home-options flex gap-48 justify-center">
                    <button
                        className="bg-black text-white text-7xl p-10 rounded-lg hover:bg-lime-600 w-80 h-96"
                        onClick={() => handleNavigate("/manage-stuff/menu/menu-items")}
                    >
                        Menu Item
                    </button>
                    <button
                        className="bg-black text-white text-7xl p-10 rounded-lg hover:bg-lime-600 w-96 h-96"
                        onClick={() => handleNavigate("/manage-stuff/menu/menu-choices")}
                    >
                        Menu Choices
                    </button>
                </div>
            </div>
        </>
    );
};

export default ManagerMenuHome;
