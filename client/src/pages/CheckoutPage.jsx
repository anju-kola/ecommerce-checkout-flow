
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { product, variant, quantity } = location.state || {};

  const [form, setForm] = useState({
    fullName: '', email: '', phone: '', address: '', city: '', state: '', zip: '',
    cardNumber: '', expiryDate: '', cvv: '', outcome: '1'
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/orders', {
        ...form, product, variant, quantity
      });
      navigate('/thankyou', { state: { orderId: res.data.orderId } });
    } catch (err) {
      alert('Error submitting order');
    }
  };

  const total = product.price * quantity;

  return (
    <form className="p-6" onSubmit={handleSubmit}>
      <h1 className="text-xl font-bold">Checkout</h1>
      <input name="fullName" placeholder="Full Name" onChange={handleChange} required /><br />
      <input name="email" type="email" placeholder="Email" onChange={handleChange} required /><br />
      <input name="phone" placeholder="Phone" onChange={handleChange} required /><br />
      <input name="address" placeholder="Address" onChange={handleChange} required /><br />
      <input name="city" placeholder="City" onChange={handleChange} required /><br />
      <input name="state" placeholder="State" onChange={handleChange} required /><br />
      <input name="zip" placeholder="Zip Code" onChange={handleChange} required /><br />
      <input name="cardNumber" placeholder="Card Number" onChange={handleChange} required /><br />
      <input name="expiryDate" type="month" onChange={handleChange} required /><br />
      <input name="cvv" placeholder="CVV" onChange={handleChange} required /><br />
      <label>Transaction Outcome:</label>
      <select name="outcome" onChange={handleChange}>
        <option value="1">Approved</option>
        <option value="2">Declined</option>
        <option value="3">Gateway Error</option>
      </select><br />
      <h2>Order Summary</h2>
      <p>{product.name} - {variant} x {quantity}</p>
      <p>Total: ${total}</p>
      <button type="submit" className="bg-green-500 text-white px-4 py-2">Submit</button>
    </form>
  );
}
