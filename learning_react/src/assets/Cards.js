import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/cartSlice";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();

  return (
    <div className="product-card" style={{
      border: "1px solid #e0e0e0",
      borderRadius: "10px",
      background: "#fff",
      boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
      padding: "1rem",
      width: 240,
      textAlign: "center",
      margin: "1rem"
    }}>
      <img src={product.image} alt={product.name} style={{ width: 120, height: 120, objectFit: "contain" }} />
      <h3 style={{ fontSize: "1.1rem", margin: "0.5rem 0" }}>{product.name}</h3>
      <div style={{ color: "#888", fontSize: "0.95rem" }}>{product.brand}</div>
      <div style={{ fontWeight: "bold", fontSize: "1.1rem", margin: "0.5rem 0" }}>${product.price.toFixed(2)}</div>
      <button
        onClick={() => dispatch(addToCart({ ...product, quantity: 1 }))}
        style={{
          background: "#005eb8",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          padding: "0.5rem 1.2rem",
          fontWeight: "bold",
          cursor: "pointer"
        }}
      >
        Agregar al carrito
      </button>
    </div>
  );
}