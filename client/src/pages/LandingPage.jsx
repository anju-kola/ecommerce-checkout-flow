
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const navigate = useNavigate();
  const [variant, setVariant] = useState("Red");
  const [quantity, setQuantity] = useState(1);

  const product = {
    name: "Converse Chuck Taylor",
    description: "Classic All Star II sneakers.",
    price: 60,
    image: "https://via.placeholder.com/300",
    variants: ["Red", "Black", "Blue"]
  };

  const handleBuyNow = () => {
    navigate("/checkout", {
      state: {
        product,
        variant,
        quantity
      }
    });
  };

  return (
    <div className="p-6">
      <img src={product.image} alt={product.name} className="w-64" />
      <h1 className="text-xl font-bold">{product.name}</h1>
      <p>{product.description}</p>
      <p className="text-lg font-semibold">${product.price}</p>
      <label>Variant:</label>
      <select value={variant} onChange={e => setVariant(e.target.value)}>
        {product.variants.map(v => <option key={v}>{v}</option>)}
      </select>
      <label>Quantity:</label>
      <input type="number" value={quantity} onChange={e => setQuantity(Number(e.target.value))} min="1" />
      <button className="bg-blue-500 text-white px-4 py-2" onClick={handleBuyNow}>Buy Now</button>
    </div>
  );
}
