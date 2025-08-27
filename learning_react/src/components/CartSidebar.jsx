import React, { useState } from "react";
import * as XLSX from "xlsx";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart } from "../store/cartSlice";

const INITIAL_PRODUCTS = [
  {
    id: 1,
    name: "Bujía Diesel A",
    type: "bujias",
    price: 25.0,
    stock: 10,
    img: "https://via.placeholder.com/250x200?text=Bujia+A",
  },
  {
    id: 2,
    name: "Precalentador B",
    type: "precalentadores",
    price: 30.0,
    stock: 5,
    img: "https://via.placeholder.com/250x200?text=Precalentador+B",
  },
  {
    id: 3,
    name: "Repuesto C",
    type: "repuestos",
    price: 15.0,
    stock: 0,
    img: "https://via.placeholder.com/250x200?text=Repuesto+C",
  },
];

export default function Products({ onAddToCart }) {
  const [filter, setFilter] = useState("all");
  const [products, setProducts] = useState(INITIAL_PRODUCTS);

  const filteredProducts =
    filter === "all"
      ? products
      : products.filter((p) => p.type === filter);

  // Lógica para importar productos desde Excel
  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const data = new Uint8Array(evt.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json(sheet);

      // Espera columnas: name, type, price, stock, img
      const imported = rows.map((row, idx) => ({
        id: products.length + idx + 1,
        name: row.name || `Producto ${products.length + idx + 1}`,
        type: row.type || "otros",
        price: Number(row.price) || 0,
        stock: Number(row.stock) || 0,
        img: row.img || "https://via.placeholder.com/250x200?text=Producto",
      }));
      setProducts((prev) => [...prev, ...imported]);
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <section className="products" id="productos">
      <div className="container">
        <h2>Nuestros Productos</h2>
        <div className="filter-options">
          <button
            className={`filter-btn${filter === "all" ? " active" : ""}`}
            onClick={() => setFilter("all")}
          >
            Todos
          </button>
          <button
            className={`filter-btn${filter === "bujias" ? " active" : ""}`}
            onClick={() => setFilter("bujias")}
          >
            Bujías
          </button>
          <button
            className={`filter-btn${filter === "precalentadores" ? " active" : ""}`}
            onClick={() => setFilter("precalentadores")}
          >
            Precalentadores
          </button>
          <button
            className={`filter-btn${filter === "repuestos" ? " active" : ""}`}
            onClick={() => setFilter("repuestos")}
          >
            Repuestos
          </button>
        </div>
        <div className="import-section" style={{ margin: "1em 0" }}>
          <input
            type="file"
            id="excel-file"
            accept=".xlsx, .xls, .xlsm, .xlsb"
            style={{ display: "none" }}
            onChange={handleImport}
          />
          <button
            className="btn"
            onClick={() => document.getElementById("excel-file").click()}
          >
            <i className="fas fa-file-excel"></i> Importar Inventario (Excel)
          </button>
        </div>
        <div className="product-grid" id="product-grid">
          {filteredProducts.map((product) => (
            <div className="product-card" key={product.id}>
              <div className="product-image">
                <img src={product.img} alt={product.name} />
              </div>
              <div className="product-info">
                <h3>{product.name}</h3>
                <div className="product-price">
                  <span className="price">${product.price.toFixed(2)}</span>
                  <button
                    className="add-to-cart"
                    disabled={product.stock === 0}
                    onClick={() => onAddToCart(product)}
                  >
                    Agregar
                  </button>
                </div>
                <div
                  className={`stock ${
                    product.stock === 0
                      ? "out-of-stock"
                      : product.stock < 5
                      ? "low-stock"
                      : "in-stock"
                  }`}
                >
                  {product.stock === 0
                    ? "Sin stock"
                    : product.stock < 5
                    ? "Pocas unidades"
                    : "En stock"}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart } from "../store/cartSlice";
import PaypalButton from "./PaypalButton";

export default function CartSidebar({ onClose, visible }) {
  const [showCheckout, setShowCheckout] = useState(false);
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <>
      <div className={`cart-sidebar${visible ? " active" : ""}`}>
        <div className="cart-header">
          <h3>Carrito de Compras</h3>
          <button className="close-cart" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="cart-items">
          {cart.length === 0 && <p>El carrito está vacío.</p>}
          {cart.map((item) => (
            <div className="cart-item" key={item.id}>
              <div className="cart-item-image">
                <img src={item.img} alt={item.name} />
              </div>
              <div className="cart-item-details">
                <h4>{item.name}</h4>
                <div className="cart-item-price">${item.price.toFixed(2)}</div>
                <div className="cart-item-quantity">
                  <span>Cantidad: {item.qty}</span>
                </div>
                <button
                  className="remove-item"
                  onClick={() => dispatch(removeFromCart(item.id))}
                >
                  Quitar
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="cart-total">
          <h4>
            Total: <span>${total.toFixed(2)}</span>
          </h4>
        </div>
        <button className="clear-cart btn" onClick={() => dispatch(clearCart())}>
          Vaciar Carrito
        </button>
        <button
          className="btn"
          style={{ marginTop: "1em", width: "100%" }}
          disabled={cart.length === 0}
          onClick={() => setShowCheckout(true)}
        >
          Checkout
        </button>
      </div>
      <div className={`overlay${visible ? " active" : ""}`} onClick={onClose}></div>
      {showCheckout && (
        <div className="modal-overlay" onClick={() => setShowCheckout(false)}>
          <div
            className="modal"
            onClick={e => e.stopPropagation()}
            style={{
              background: "#fff",
              padding: "2em",
              borderRadius: "8px",
              maxWidth: "400px",
              margin: "10vh auto",
              boxShadow: "0 4px 24px rgba(0,0,0,0.18)",
              position: "relative"
            }}
          >
            <button
              style={{
                position: "absolute",
                top: 10,
                right: 10,
                background: "none",
                border: "none",
                fontSize: "1.5em",
                cursor: "pointer"
              }}
              onClick={() => setShowCheckout(false)}
              aria-label="Cerrar"
            >
              &times;
            </button>
            <h2>Checkout</h2>
            <p>Paga de forma segura con PayPal:</p>
            <PaypalButton total={total} />
          </div>
        </div>
      )}
      <style>{`
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(44,62,80,0.25);
          z-index: 300;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </>
  );
}