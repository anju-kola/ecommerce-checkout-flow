
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

export default function ThankYouPage() {
  const { state } = useLocation();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      const res = await axios.get(`http://localhost:5000/api/orders/${state.orderId}`);
      setOrder(res.data);
    };
    fetchOrder();
  }, [state.orderId]);

  if (!order) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Thank You!</h1>
      <p>Order ID: {order._id}</p>
      <h2>Order Summary</h2>
      <p>{order.product.name} - {order.variant} x {order.quantity}</p>
      <p>Total: ${order.product.price * order.quantity}</p>
      <h2>Customer Info</h2>
      <p>{order.fullName}, {order.email}, {order.phone}</p>
      <p>{order.address}, {order.city}, {order.state}, {order.zip}</p>
    </div>
  );
}
