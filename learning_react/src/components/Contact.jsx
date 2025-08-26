import React from "react";
import { addToCart } from "../store/cartSlice";

export default function Contact() {
  return (
    <section className="contact" id="contacto">
      <div className="container">
        <h2>Contacto</h2>
        <form id="contact-form">
          <input type="text" placeholder="Nombre" required />
          <input type="email" placeholder="Email" required />
          <textarea placeholder="Mensaje" required></textarea>
          <button type="submit" className="btn">
            Enviar Mensaje
          </button>
        </form>
      </div>
    </section>
  );
}