import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart, updateQuantity, selectCartTotal } from "../store/cartSlice";
import { toast } from "react-toastify";
import PaypalButton from "./PaypalButton";
import PagoMovilButton from "./PagoMovilButton";

export default function CartSidebar({ onClose, visible }) {
  const [showCheckout, setShowCheckout] = useState(false);
  const items = useSelector((state) => state.cart.items);
  const total = useSelector(selectCartTotal);
  const dispatch = useDispatch();

  const handleRemove = (id, name) => {
    dispatch(removeFromCart(id));
    toast.info(`${name} eliminado del carrito`);
  };

  const handleClear = () => {
    dispatch(clearCart());
    toast.warn("Carrito vaciado");
  };

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
          {items.length === 0 && <p>El carrito está vacío.</p>}
          {items.map((item) => (
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
                  onClick={() => handleRemove(item.id, item.name)}
                >
                  Quitar
                </button>
                <input
                  type="number"
                  value={item.qty}
                  min={1}
                  onChange={(e) =>
                    dispatch(
                      updateQuantity({
                        id: item.id,
                        qty: Number(e.target.value),
                      })
                    )
                  }
                />
              </div>
            </div>
          ))}
        </div>
        <div className="cart-total">
          <h4>
            Total: <span>${total.toFixed(2)}</span>
          </h4>
        </div>
        <button className="clear-cart btn" onClick={handleClear}>
          Vaciar Carrito
        </button>
        {items.length > 0 && (
          <div style={{ marginTop: "1rem" }}>
            <PagoMovilButton total={total} />
            <PaypalButton total={total} />
          </div>
        )}
      </div>
      <div className={`overlay${visible ? " active" : ""}`} onClick={onClose}></div>
      {showCheckout && (
        <div className="modal-overlay" onClick={() => setShowCheckout(false)}>
          <div
            className="modal"
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#fff",
              padding: "2em",
              borderRadius: "8px",
              maxWidth: "400px",
              margin: "10vh auto",
              boxShadow: "0 4px 24px rgba(0,0,0,0.18)",
              position: "relative",
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
                cursor: "pointer",
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