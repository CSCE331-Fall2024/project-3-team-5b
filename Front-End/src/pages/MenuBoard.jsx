import React, { useMemo } from 'react';
import './MenuBoard.css';
import { useFetchData } from '../api/useFetchData';
import { CircularProgress } from '@mui/material';

const MenuBoard = () => {

  const { data: menuItems, loading: menuItemsLoading, error: menuItemsError } = useFetchData('menu-items');
  const { data: itemComponents, loading: itemComponentsLoading, error: itemComponentsError } = useFetchData('item-components');

  // Filtered menu items with images
  const displayOnlyMenuItems = useMemo(() => {
    if (menuItemsLoading) return [];
    return menuItems.filter((menuItem) => menuItem.image !== null);
  }, [menuItems, menuItemsLoading]);

  /**
   * Handles the click event for selecting a menu item.
   * @param {Object} item - The menu item that was clicked.
   */
  const addToFilteredMap = (map, category, item) => {
    const items = map.get(category) || [];
    map.set(category, [...items, item]);
  };

  /**
   * Memoized value to filter item components into categories.
   * @type {Map<string, Array>}
   */
  const displayOnlyItemComponents = useMemo(() => {
    if (itemComponentsLoading) return {};
    let filteredItemComponents = new Map();
    itemComponents.forEach((itemComponent) => {
      let category = itemComponent.category || 'other';
      if (category.includes("entree")) category = "entrees";
      addToFilteredMap(filteredItemComponents, category, itemComponent);
    });
    return filteredItemComponents;
  }, [itemComponents, itemComponentsLoading]);

  if (menuItemsLoading || itemComponentsLoading) {
    return (
      <div className='loading-container'>
        <CircularProgress style={{ color: "white", width: '300px', height: '300px' }} />
      </div>
    );
  }

  if (menuItemsError || itemComponentsError) {
    return <p>Error loading menu items or item components: {menuItemsError?.message || itemComponentsError?.message}</p>;
  }

  const entrees = displayOnlyItemComponents.get("entrees");

  const sides = displayOnlyItemComponents.get("side");

  const appetizers = displayOnlyItemComponents.get("appetizer");

  const drinks = displayOnlyItemComponents.get("drink");

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
                <h3 className="left">{item.name}</h3>
                <p className="justify">{item.description} starting from ${item.base_price}</p>
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
                <h3 className="left">{item.name}</h3>
                {item.extra_cost && parseFloat(item.extra_cost) > 0 ? <p className="left">Premium Extra Cost: ${item.extra_cost}</p> : null}
              </div>
            </div>
          ))}
        </div>

        <div className="column">
          <h2>Sides</h2>
          {sides.map((item, index) => (
            <div key={index} className="item">
              <img src={item.image} alt={item.name} />
              <h3 className="left">{item.name}</h3>
              {item.extra_cost && parseFloat(item.extra_cost) > 0 ? <p className="left">Premium Extra Cost: ${item.extra_cost}</p> : null}
            </div>
          ))}
        </div>

        <div className="column">
          <h2>Appetizers</h2>
          {appetizers.map((item, index) => (
            <div key={index} className="item">
              <img src={item.image} alt={item.name}/>
              <div>
                <h3 className="left">{item.name}</h3>
                {item.extra_cost && parseFloat(item.extra_cost) > 0 ? <p className="left">Premium Extra Cost: ${item.extra_cost}</p> : null}
              </div>
            </div>
          ))}
          <h2>Drinks</h2>
          {drinks.map((item, index) => (
            <div key={index} className="item">
              <img src={item.image} alt={item.name} />
              <div>
                <h3 className="left">{item.name}</h3>
                {item.extra_cost && parseFloat(item.extra_cost) > 0 ? <p className="left">Premium Extra Cost: ${item.extra_cost}</p> : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuBoard;
