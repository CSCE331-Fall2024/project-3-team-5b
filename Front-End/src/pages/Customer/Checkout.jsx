import React, { useState } from 'react';
import './Checkout.css'; // Add styles for your checkout screen

/**
 * `Checkout` component allows the user to review their order, select a payment method, 
 * and submit the payment for the order. The payment method can either be cash or card.
 * If the payment method is card, users are required to input card details.
 * 
 * @component
 * @example
 * const cartItems = [{ menuItem: { name: 'Burger' } }];
 * return <Checkout cartItems={cartItems} onBack={() => {}} />;
 * 
 * @param {Array} cartItems - List of items in the cart to be displayed in the order summary.
 * @param {Function} onBack - Function to navigate back to the cart.
 */
const Checkout = ({ cartItems, onBack }) => {
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [cardDetails, setCardDetails] = useState({
    name: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  /**
   * Handles changes in input fields for card details.
   * 
   * @param {Object} e - The event object for the input change.
   * @returns {void}
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  /**
   * Submits the payment and displays a confirmation message based on the selected payment method.
   * If paying with a card, the card number is displayed; otherwise, a message for cash payment is shown.
   * 
   * @returns {void}
   */
  const handlePaymentSubmit = () => {
    if (paymentMethod === 'cash') {
      alert('Order placed successfully! Paid with cash.');
    } else {
      alert(`Order placed successfully! Paid with card: ${cardDetails.cardNumber}`);
    }
  };

  return (
    <div className="checkout">
      <h2>Checkout</h2>
      <div className="cart-summary">
        <h3>Order Summary</h3>
        <ul>
          {cartItems.map((item, index) => (
            <li key={index}>{item.menuItem.name}</li>
          ))}
        </ul>
      </div>
      <div className="payment-methods">
        <h3>Select Payment Method</h3>
        <div>
          <label>
            <input
              type="radio"
              name="payment"
              value="cash"
              checked={paymentMethod === 'cash'}
              onChange={() => setPaymentMethod('cash')}
            />
            Cash
          </label>
          <label>
            <input
              type="radio"
              name="payment"
              value="card"
              checked={paymentMethod === 'card'}
              onChange={() => setPaymentMethod('card')}
            />
            Card
          </label>
        </div>
        {paymentMethod === 'card' && (
          <div className="card-details">
            <h4>Card Details</h4>
            <input
              type="text"
              name="name"
              placeholder="Name on Card"
              value={cardDetails.name}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="cardNumber"
              placeholder="Card Number"
              value={cardDetails.cardNumber}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="expiry"
              placeholder="Expiry (MM/YY)"
              value={cardDetails.expiry}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="cvv"
              placeholder="CVV"
              value={cardDetails.cvv}
              onChange={handleInputChange}
            />
          </div>
        )}
      </div>
      <div className="checkout-buttons">
        <button onClick={onBack}>Back to Cart</button>
        <button onClick={handlePaymentSubmit}>Place Order</button>
      </div>
    </div>
  );
};

export default Checkout;
