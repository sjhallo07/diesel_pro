import React from "react";
import { useSelector } from "react-redux";
import { addToCart } from "../store/cartSlice";

export default function Header({ onCartClick }) {
  const cartCount = useSelector((state) =>
    state.cart.items.reduce((a, b) => a + b.qty, 0)
  );
  return (
    <header>
      <img
        src="https://i.postimg.cc/KYJCxC2Y/LOGOTIPOFONDOBLANCO.png"
        alt="Turbobujias"
      />
      <form
        action="https://www.paypal.com/cgi-bin/webscr"
        method="post"
        target="_top"
      >
        <input type="hidden" name="cmd" value="_s-xclick" />
        <input type="hidden" name="hosted_button_id" value="8NYMNJTYXLX5W" />
        <input type="hidden" name="currency_code" value="USD" />
        <input
          type="image"
          src="https://www.paypalobjects.com/en_US/i/btn/btn_buynowCC_LG.gif"
          border="0"
          name="submit"
          title="PayPal es una forma segura y fácil de pagar en línea."
          alt="Comprar ahora"
        />
      </form>
      <nav>
        <ul>
          <li>
            <a href="#inicio">Inicio</a>
          </li>
          <li>
            <a href="#productos">Productos</a>
          </li>
          <li>
            <a href="#nosotros">Nosotros</a>
          </li>
          <li>
            <a href="#contacto">Contacto</a>
          </li>
        </ul>
      </nav>
      <div className="cart-icon" onClick={onCartClick}>
        <i className="fas fa-shopping-cart"></i>
        <span className="cart-count">{cartCount}</span>
      </div>
      <div className="mobile-menu">
        <i className="fas fa-bars"></i>
      </div>
    </header>
  );
}