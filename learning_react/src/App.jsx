import React, { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Products from "./components/Products";
import About from "./components/About";
import Contact from "./components/Contact";
import CartSidebar from "./components/CartSidebar";
import Footer from "./components/Footer";
import "./App.css";

export default function App() {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <>
      <Header onCartClick={() => setCartOpen(true)} />
      <Hero />
      <Products />
      <About />
      <Contact />
      <CartSidebar
        onClose={() => setCartOpen(false)}
        visible={cartOpen}
      />
      <Footer />
    </>
  );
}
