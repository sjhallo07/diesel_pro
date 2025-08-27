import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/cartSlice";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} width={120} />
      <h3>{product.name}</h3>
      <p>{product.brand}</p>
      <p>${product.price.toFixed(2)}</p>
      <button onClick={() => dispatch(addToCart({ ...product, quantity: 1 }))}>
        Agregar al carrito
      </button>
    </div>
  );
}