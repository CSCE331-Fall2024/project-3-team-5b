import React, { useMemo } from 'react';
import './MenuBoard.css';
import { useFetchData } from '../api/useFetchData';
import { CircularProgress } from '@mui/material';

/**
 * MenuBoard Component
 * Displays a categorized menu board with menu items and item components fetched from the API.
 * Includes loading, error handling, and categorization logic for item components.
 *
 * @component
 * @returns {JSX.Element} The menu board UI.
 */
const MenuBoard = () => {
  // Fetch menu items and item components
  const { data: menuItems, loading: menuItemsLoading, error: menuItemsError } = useFetchData('menu-items');
  const { data: itemComponents, loading: itemComponentsLoading, error: itemComponentsError } = useFetchData('item-components');

  /**
   * Filters menu items to only include those with images.
   *
   * @type {Array<Object>}
   */
  const displayOnlyMenuItems = useMemo(() => {
    if (menuItemsLoading) return [];
    return menuItems.filter((menuItem) => menuItem.image !== null);
  }, [menuItems, menuItemsLoading]);

  /**
   * Adds an item to a map grouped by category.
   *
   * @param {Map<string, Array>} map - The map to update.
   * @param {string} category - The category key for the item.
   * @param {Object} item - The item to add.
   */
  const addToFilteredMap = (map, category, item) => {
    const items = map.get(category) || [];
    map.set(category, [...items, item]);
  };

  /**
   * Filters and groups item components by category.
   * Categories are normalized (e.g., "entree" -> "entrees").
   *
   * @type {Map<string, Array>}
   */
  const displayOnlyItemComponents = useMemo(() => {
    if (itemComponentsLoading) return new Map();
    let filteredItemComponents = new Map();
    itemComponents.forEach((itemComponent) => {
      let category = itemComponent.category || 'other';
      if (category.includes("entree")) category = "entrees";
      addToFilteredMap(filteredItemComponents, category, itemComponent);
    });
    return filteredItemComponents;
  }, [itemComponents, itemComponentsLoading]);

  // Handle loading state
  if (menuItemsLoading || itemComponentsLoading) {
    return (
      <div className='loading-container'>
        <CircularProgress style={{ color: "white", width: '300px', height: '300px' }} />
      </div>
    );
  }

  // Handle error state
  if (menuItemsError || itemComponentsError) {
    return <p>Error loading menu items or item components: {menuItemsError?.message || itemComponentsError?.message}</p>;
  }

  // Extract categorized items
  const entrees = displayOnlyItemComponents.get("entrees") || [];
  const sides = displayOnlyItemComponents.get("side") || [];
  const appetizers = displayOnlyItemComponents.get("appetizer") || [];
  const drinks = displayOnlyItemComponents.get("drink") || [];

  return (
    <div className="menu-board-container">
      <header>
        <button className="back-button" onClick={() => window.history.back()}>
          &#8592; Back
        </button>
      </header>

      <div className="menu-board">
        <div className="column">
          <h2>Menu Items</h2>
          {displayOnlyMenuItems.map((item, index) => (
            <div key={index} className="item">
              <img src={item.image} alt={item.name} />
              <div>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <p>Starting from ${item.base_price}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="column">
          <h2>Entrees</h2>
          {entrees.map((item, index) => (
            <div key={index} className="item">
              <img src={item.image} alt={item.name} />
              <div>
                <h3>{item.name}</h3>
                {item.extra_cost && parseFloat(item.extra_cost) > 0 ? (
                  <p>Premium Extra Cost: ${item.extra_cost}</p>
                ) : null}
              </div>
            </div>
          ))}
        </div>

        <div className="column">
          <h2>Sides</h2>
          {sides.map((item, index) => (
            <div key={index} className="item">
              <img src={item.image} alt={item.name} />
              <h3>{item.name}</h3>
              {item.extra_cost && parseFloat(item.extra_cost) > 0 ? (
                <p>Premium Extra Cost: ${item.extra_cost}</p>
              ) : null}
            </div>
          ))}
        </div>

        <div className="column">
          <h2>Appetizers</h2>
          {appetizers.map((item, index) => (
            <div key={index} className="item">
              <img src={item.image} alt={item.name} />
              <div>
                <h3>{item.name}</h3>
                {item.extra_cost && parseFloat(item.extra_cost) > 0 ? (
                  <p>Premium Extra Cost: ${item.extra_cost}</p>
                ) : null}
              </div>
            </div>
          ))}
          <h2>Drinks</h2>
          {drinks.map((item, index) => (
            <div key={index} className="item">
              <img src={item.image} alt={item.name} />
              <div>
                <h3>{item.name}</h3>
                {item.extra_cost && parseFloat(item.extra_cost) > 0 ? (
                  <p>Premium Extra Cost: ${item.extra_cost}</p>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuBoard;
