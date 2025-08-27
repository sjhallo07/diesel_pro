import React, { useState } from "react";
import { useSelector } from "react-redux";
import logo from "../assets/LOGOTIPOFONDONEGRO.png";

export default function Header({ onCartClick }) {
  const items = useSelector((state) => state.cart.items);
  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const [navActive, setNavActive] = useState(false);

  // Cierra el menú al hacer click en un enlace
  const handleNavClick = () => setNavActive(false);

  // Cambia el número por el tuyo en formato internacional sin "+"
  const whatsappNumber = "584121234567"; // Ejemplo: 584121234567 para Venezuela

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem 2rem",
        background: "#222",
        color: "#fff",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <img src={logo} alt="TurboBujias Logo" style={{ height: 50 }} />
        <div>
          <h1 style={{ margin: 0, fontSize: "1.6rem" }}>TurboBujias</h1>
          <a
            href="mailto:dieselpro@gmail.com"
            style={{
              color: "#ffc107",
              textDecoration: "none",
              fontSize: "1rem",
              fontWeight: "bold",
              display: "block",
            }}
          >
            dieselpro@gmail.com
          </a>
          <a
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#25D366",
              textDecoration: "none",
              fontSize: "1rem",
              fontWeight: "bold",
            }}
          >
            WhatsApp
          </a>
        </div>
      </div>
      <button
        onClick={onCartClick}
        style={{
          background: "#fff",
          color: "#222",
          border: "none",
          borderRadius: "4px",
          padding: "0.5rem 1rem",
          fontWeight: "bold",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          position: "relative",
        }}
        aria-label="Ver carrito"
      >
        <span style={{ fontSize: "1.5rem" }}>🛒</span>
        <span
          style={{
            background: "#e53935",
            color: "#fff",
            borderRadius: "50%",
            padding: "0.2rem 0.6rem",
            fontSize: "1rem",
            fontWeight: "bold",
            position: "absolute",
            top: "-8px",
            right: "-8px",
          }}
        >
          {totalCount}
        </span>
      </button>
    </header>
  );
}