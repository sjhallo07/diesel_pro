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