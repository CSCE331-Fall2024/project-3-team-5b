import React from 'react';
import SalesReport from './SalesReport';

/**
 * Sales Component
 * A simple page that displays the `SalesReport` component.
 *
 * This component serves as a wrapper for the `SalesReport`, providing a title and container for sales data visualization.
 *
 * @component
 * @returns {JSX.Element} The rendered Sales component.
 */
function Sales() {
  return (
    <div>
      <h1>Sales Page</h1>
      <SalesReport />
    </div>
  );
}

export default Sales;
