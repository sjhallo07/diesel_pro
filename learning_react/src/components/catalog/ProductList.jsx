import React from "react";
import ProductCard from "./ProductCard";

export default function ProductList({ products }) {
  return (
    <div className="products-list">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}