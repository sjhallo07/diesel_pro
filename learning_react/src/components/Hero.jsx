import React from "react";
import { addToCart } from "../store/cartSlice";

export default function Hero() {
  return (
    <section className="hero" id="inicio">
      <div className="container">
        <h2>Bujías y Repuestos Diesel</h2>
        <p>
          Bujías, precalentadores y todo lo que necesitas para motores diesel
        </p>
        <a href="#productos" className="btn">
          Ver Productos
        </a>
      </div>
    </section>
  );
}