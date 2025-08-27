import React, { useState } from "react";
import Products from "./components/Products";
import CartSidebar from "./components/CartSidebar";
import Header from "./components/Header";
import ExcelUploader from "./components/ExcelUploader";
import "./App.css";

export default function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [products, setProducts] = useState([]);

  const isAdmin = true;

  const handleAddProducts = (newProducts) => {
    const withIds = newProducts.map((p, idx) => ({
      ...p,
      id: p.id || Date.now() + idx,
      image: p.image || "/vite.svg",
    }));
    setProducts([...products, ...withIds]);
  };

  return (
    <div>
      <Header onCartClick={() => setCartOpen(true)} />
      <ExcelUploader onAddProducts={handleAddProducts} isAdmin={isAdmin} />
      <Products products={products} />
      <CartSidebar visible={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
}
